import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { assessHardshipFreshness, HARDSHIP_SCHEMA_VERSION, HARDSHIP_STATUSES, validateHardshipRecord, validateHardshipRegistry } from "../scripts/lib/credit-card-hardship.mjs";

const directory = new URL("../research/financial-hardship/records/", import.meta.url);
const records = await Promise.all((await readdir(directory)).filter((name) => name.endsWith(".json")).sort().map(async (name) => JSON.parse(await readFile(new URL(name, directory), "utf8"))));

// Entirely fictional institution, product, and evidence. These never enter the registry.
function fixture(status = "no-public-evidence-found") {
  const record = structuredClone(records[1]);
  Object.assign(record, {
    record_id: "fictional-card", fixture: true, brand: "Fictional Brand", product: "Fictional Card",
    scope: "Synthetic evidence-contract test; no real product or offer.",
    issuer: { text: "Fictional Issuer", source_ids: ["synthetic-source"] },
    servicer: { text: null, source_ids: [] },
    contact: { url: "https://example.com/contact", instructions: "Fictional contact only.", source_ids: ["synthetic-source"] },
    search: { scope: "Synthetic bounded review of the fictional issuer page.", source_ids: ["synthetic-source"], limitations: "No real search or consumer data." },
    sources: [{ id: "synthetic-source", url: "https://example.com/contact", publisher: "Fictional Issuer", source_type: "issuer", roles: ["identity", "contact", "search"], product_scope: "exact-product", checked_at: "2026-09-18", published_at: null, valid_as_of: null, access: "available", note: "Synthetic source, not a retrieved page." }],
    unresolved_questions: ["Synthetic question; not advice."],
  });
  const mapping = {
    "published-program": ["defined-program", "first-party-public", "program"],
    "published-contact-path": ["contact-only", "first-party-public", "contact"],
    "case-by-case-reported": ["attributed-report", "reported-only", "report"],
    "no-public-evidence-found": ["bounded-search", "bounded-search", "search"],
    "confirmed-unavailable": ["explicit-product-denial", "first-party-public", "unavailability"],
    "unknown": ["insufficient-evidence", "unresolved", "search"],
  };
  const [basis, confidence, role] = mapping[status];
  record.sources[0].roles = [...new Set([...record.sources[0].roles, role])];
  record.assessment = { status, basis, confidence, source_ids: ["synthetic-source"], explanation: "Fictional evidence demonstrates a state; no real availability claim." };
  if (status === "published-program") record.program_url = record.sources[0].url;
  return record;
}

test("validates all public hardship records and keeps synthetic examples outside the registry", () => {
  assert.ok(records.length >= 2);
  assert.equal(validateHardshipRegistry(records), records);
  assert.ok(records.every((record) => record.schemaVersion === HARDSHIP_SCHEMA_VERSION));
  for (const status of HARDSHIP_STATUSES) assert.equal(validateHardshipRecord(fixture(status)).assessment.status, status);
  assert.throws(() => validateHardshipRegistry([fixture()]), /Synthetic fixtures/);
  assert.throws(() => validateHardshipRegistry([records[0], records[0]]), /Duplicate record ID/);
});

test("missing public evidence cannot become confirmed unavailability without an explicit scoped source", () => {
  const record = fixture();
  record.assessment.status = "confirmed-unavailable";
  assert.throws(() => validateHardshipRecord(record), /basis\/confidence/);
  record.assessment.basis = "explicit-product-denial";
  record.assessment.confidence = "first-party-public";
  assert.throws(() => validateHardshipRecord(record), /authority and role/);
  record.sources[0].roles.push("unavailability");
  record.sources[0].product_scope = "issuer-program";
  assert.throws(() => validateHardshipRecord(record), /exact-product/);
  record.sources[0].product_scope = "exact-product";
  assert.equal(validateHardshipRecord(record).assessment.status, "confirmed-unavailable");
});

test("secondary anecdotes stay reports and cannot supply hardship terms or issuer denial", () => {
  const record = fixture("case-by-case-reported");
  record.sources.push({ ...record.sources[0], id: "public-report", url: "https://example.com/report", source_type: "secondary", roles: ["report"] });
  record.assessment.source_ids = ["public-report"];
  assert.equal(validateHardshipRecord(record).assessment.confidence, "reported-only");
  record.terms.apr = { text: "Fictional claimed concession.", source_ids: ["public-report"] };
  assert.throws(() => validateHardshipRecord(record), /first-party evidence/);
  record.terms.apr = { text: null, source_ids: [] };
  record.assessment = { ...record.assessment, status: "confirmed-unavailable", basis: "explicit-product-denial", confidence: "first-party-public" };
  record.sources[1].roles = ["unavailability"];
  assert.throws(() => validateHardshipRecord(record), /authority and role/);
});

test("source references, role, access, and explicit unknown facts constrain claims", () => {
  const record = fixture("published-program");
  record.terms.apr = { text: "Fictional rate term.", source_ids: ["missing"] };
  assert.throws(() => validateHardshipRecord(record), /Unknown source ID/);
  record.terms.apr.source_ids = ["synthetic-source"];
  assert.doesNotThrow(() => validateHardshipRecord(record));
  record.sources[0].access = "unavailable";
  assert.throws(() => validateHardshipRecord(record), /first-party evidence/);
  record.sources[0].access = "available";
  record.terms.apr.text = null;
  assert.throws(() => validateHardshipRecord(record), /unknown facts/);
  record.terms.apr = { text: null, source_ids: [] };
  record.program_url = "https://example.com/unrelated";
  assert.throws(() => validateHardshipRecord(record), /matching program source/);
});

test("inaccessible pages cannot establish a bounded absence finding", () => {
  const record = fixture();
  record.issuer = { text: null, source_ids: [] };
  record.contact = { url: null, instructions: null, source_ids: [] };
  record.sources[0].access = "unavailable";
  assert.throws(() => validateHardshipRecord(record), /access failures are unknown/);
  record.assessment = { ...record.assessment, status: "unknown", basis: "insufficient-evidence", confidence: "unresolved" };
  assert.equal(validateHardshipRecord(record).assessment.status, "unknown");
});

test("an unrelated first-party citation cannot authorize a secondary contact URL", () => {
  const record = fixture("published-contact-path");
  record.sources.push({ ...record.sources[0], id: "secondary-contact", url: "https://example.com/unverified-contact", source_type: "secondary" });
  record.contact.url = "https://example.com/unverified-contact";
  record.contact.source_ids.push("secondary-contact");
  assert.throws(() => validateHardshipRecord(record), /matching first-party contact source/);
});

test("review-due and invalidated evidence becomes unknown without rewriting the observed state", () => {
  for (const status of HARDSHIP_STATUSES) {
    const record = fixture(status);
    const before = JSON.stringify(record);
    assert.equal(assessHardshipFreshness(record, "2026-10-17").effective_status, status);
    const due = assessHardshipFreshness(record, "2026-10-18");
    assert.equal(due.effective_status, "unknown");
    assert.equal(due.observed_status, status);
    assert.deepEqual(due.reasons, ["review-due"]);
    assert.equal(JSON.stringify(record), before);
    assert.equal(assessHardshipFreshness(record, "2026-09-17").effective_status, "unknown");
    record.review_flags = ["source-conflict", "issuer-change"];
    assert.equal(assessHardshipFreshness(record, "2026-09-18").confidence, "unresolved");
  }
});

test("calendar checks prevent impossible dates, unscheduled reviews, and partial refreshes", () => {
  const record = fixture();
  record.next_review_at = "2026-02-30";
  assert.throws(() => validateHardshipRecord(record), /invalid calendar date/);
  record.next_review_at = "2026-12-18";
  assert.throws(() => validateHardshipRecord(record), /within 31 days/);
  record.next_review_at = "2026-10-18";
  record.verified_at = "2026-09-19";
  assert.throws(() => validateHardshipRecord(record), /recheck every source/);
});

test("schema rejects undeclared account data, unsafe URLs, and missing term fields", () => {
  const record = fixture();
  record.account_number = "synthetic-only";
  assert.throws(() => validateHardshipRecord(record), /unexpected account_number/);
  delete record.account_number;
  record.sources[0].url = "https://username:password@example.com/contact";
  assert.throws(() => validateHardshipRecord(record), /without credentials/);
  record.sources[0].url = "javascript:alert(1)";
  assert.throws(() => validateHardshipRecord(record), /invalid pattern/);
  record.sources[0].url = "https://example.com/contact";
  delete record.terms.required_documents;
  assert.throws(() => validateHardshipRecord(record), /missing required_documents/);
});
