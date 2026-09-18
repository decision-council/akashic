import { readFileSync } from "node:fs";

const schema = JSON.parse(readFileSync(new URL("../../research/financial-hardship/schemas/credit-card-hardship-v1.schema.json", import.meta.url), "utf8"));
export const HARDSHIP_SCHEMA_VERSION = 1;
export const HARDSHIP_STATUSES = Object.freeze([...schema.properties.assessment.properties.status.enum]);
const FIRST_PARTY = new Set(["issuer", "servicer", "brand"]);
const POLICY_AUTHORITY = new Set(["issuer", "servicer"]);
const RULES = {
  "published-program": ["defined-program", "first-party-public", "program"],
  "published-contact-path": ["contact-only", "first-party-public", "contact"],
  "case-by-case-reported": ["attributed-report", "reported-only", "report"],
  "no-public-evidence-found": ["bounded-search", "bounded-search", null],
  "confirmed-unavailable": ["explicit-product-denial", "first-party-public", "unavailability"],
  "unknown": ["insufficient-evidence", "unresolved", null],
};

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function validateDate(value, context) {
  requireCondition(typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value), `${context}: expected YYYY-MM-DD.`);
  const parsed = new Date(`${value}T00:00:00Z`);
  requireCondition(Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value, `${context}: invalid calendar date.`);
}

// Deliberately implements only this schema's vocabulary, rejecting new keywords
// until support is added. It is not a general-purpose JSON Schema implementation.
const KEYWORDS = new Set(["$schema", "$id", "$defs", "$ref", "title", "description", "type", "const", "enum", "properties", "required", "additionalProperties", "items", "minItems", "uniqueItems", "minLength", "pattern", "format"]);
function validateShape(value, definition, context) {
  for (const keyword of Object.keys(definition)) requireCondition(KEYWORDS.has(keyword), `Unsupported schema keyword: ${keyword}.`);
  if (definition.$ref) {
    const target = schema.$defs[definition.$ref.replace("#/$defs/", "")];
    requireCondition(target && definition.$ref.startsWith("#/$defs/"), "Unsupported schema reference.");
    return validateShape(value, target, context);
  }
  if ("const" in definition) requireCondition(value === definition.const, `${context}: incorrect constant.`);
  if (definition.enum) requireCondition(definition.enum.includes(value), `${context}: unsupported value.`);
  const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
  if (definition.type) requireCondition([definition.type].flat().includes(type), `${context}: incorrect type.`);
  if (type === "object") {
    for (const key of definition.required ?? []) requireCondition(Object.hasOwn(value, key), `${context}: missing ${key}.`);
    for (const key of Object.keys(value)) {
      requireCondition(definition.properties?.[key] || definition.additionalProperties !== false, `${context}: unexpected ${key}.`);
      if (definition.properties?.[key]) validateShape(value[key], definition.properties[key], `${context}.${key}`);
    }
  }
  if (type === "array") {
    requireCondition(value.length >= (definition.minItems ?? 0), `${context}: not enough items.`);
    if (definition.uniqueItems) requireCondition(new Set(value.map((item) => JSON.stringify(item))).size === value.length, `${context}: duplicate items.`);
    value.forEach((item, index) => validateShape(item, definition.items, `${context}[${index}]`));
  }
  if (type === "string") {
    requireCondition(value.trim() === value && value.length >= (definition.minLength ?? 0), `${context}: empty or padded text.`);
    if (definition.pattern) requireCondition(new RegExp(definition.pattern).test(value), `${context}: invalid pattern.`);
    if (definition.format === "date") validateDate(value, context);
    if (definition.format === "uri") {
      const url = new URL(value);
      requireCondition(url.protocol === "https:" && !url.username && !url.password, `${context}: expected an HTTPS URL without credentials.`);
    }
  }
}

export function validateHardshipRecord(record) {
  validateShape(record, schema, "Hardship record");
  const sources = new Map();
  for (const source of record.sources) {
    requireCondition(!sources.has(source.id), `Duplicate source ID: ${source.id}.`);
    requireCondition(source.checked_at === record.verified_at, "A complete verification must recheck every source; do not roll forward only the record date.");
    requireCondition(!source.published_at || source.published_at <= source.checked_at, "Source publication cannot follow its check date.");
    sources.set(source.id, source);
  }
  const resolve = (ids) => ids.map((id) => {
    requireCondition(sources.has(id), `Unknown source ID: ${id}.`);
    return sources.get(id);
  });
  const supports = (items, role, authorities = FIRST_PARTY) => items.some((source) => source.access === "available" && source.roles.includes(role) && authorities.has(source.source_type));
  for (const [name, fact] of Object.entries({ issuer: record.issuer, servicer: record.servicer, ...record.terms })) {
    const evidence = resolve(fact.source_ids);
    if (fact.text === null) requireCondition(evidence.length === 0, `${name}: unknown facts must not imply documented terms.`);
    else {
      const identity = name === "issuer" || name === "servicer";
      requireCondition(supports(evidence, identity ? "identity" : "program", identity ? FIRST_PARTY : POLICY_AUTHORITY), `${name}: documented facts need available first-party evidence of the correct role.`);
    }
  }
  const contactSources = resolve(record.contact.source_ids);
  if (record.contact.url === null) requireCondition(record.contact.instructions === null && contactSources.length === 0, "Unknown contact must remain entirely unknown.");
  else requireCondition(record.contact.instructions && contactSources.some((source) => source.url === record.contact.url && source.access === "available" && source.roles.includes("contact") && FIRST_PARTY.has(source.source_type)), "Contact needs a matching first-party contact source and instructions.");
  const [basis, confidence, role] = RULES[record.assessment.status];
  requireCondition(record.assessment.basis === basis && record.assessment.confidence === confidence, "Assessment basis/confidence cannot upgrade missing or reported evidence into policy.");
  const assessmentSources = resolve(record.assessment.source_ids);
  if (record.assessment.status === "unknown") requireCondition(!record.program_url, "Unknown assessments must not claim a program URL.");
  else if (record.assessment.status === "no-public-evidence-found") {
    const checked = resolve(record.search.source_ids);
    requireCondition(checked.length > 0 && checked.every((source) => source.access === "available") && checked.some((source) => FIRST_PARTY.has(source.source_type)), "A bounded search needs inspected first-party evidence; access failures are unknown.");
    requireCondition(!record.program_url, "No-public-evidence-found cannot claim a program URL.");
  } else if (record.assessment.status === "case-by-case-reported") {
    requireCondition(assessmentSources.some((source) => source.access === "available" && source.roles.includes("report")), "Reported assistance needs an attributed public report.");
  } else {
    const authorities = record.assessment.status === "published-contact-path" ? FIRST_PARTY : POLICY_AUTHORITY;
    requireCondition(supports(assessmentSources, role, authorities), "Assessment needs available evidence with the required authority and role.");
  }
  if (record.assessment.status === "published-contact-path") requireCondition(record.contact.url !== null, "Contact-only assessment needs a contact route.");
  if (record.assessment.status === "published-program") {
    requireCondition(record.program_url && assessmentSources.some((source) => source.url === record.program_url && source.access === "available" && source.roles.includes("program") && POLICY_AUTHORITY.has(source.source_type)), "Published program needs a matching program source URL.");
  } else requireCondition(record.program_url === null, "Only a published program can supply a program URL.");
  if (record.assessment.status === "confirmed-unavailable") {
    requireCondition(assessmentSources.some((source) => source.access === "available" && POLICY_AUTHORITY.has(source.source_type) && source.roles.includes("unavailability") && source.product_scope === "exact-product"), "Confirmed unavailability requires an explicit exact-product issuer/servicer statement.");
  }
  if (record.assessment.status !== "published-program") requireCondition(Object.values(record.terms).every((fact) => fact.text === null), "Unpublished terms must remain unknown; reports and silence are not policy.");
  resolve(record.search.source_ids);
  const interval = (Date.parse(record.next_review_at) - Date.parse(record.verified_at)) / 86400000;
  requireCondition(interval > 0 && interval <= 31, "Review must be scheduled within 31 days of verification.");
  requireCondition(!record.valid_as_of || record.valid_as_of <= record.verified_at, "Future terms cannot be presented as currently effective.");
  if (record.fixture) requireCondition(record.sources.every((source) => new URL(source.url).hostname === "example.com"), "Synthetic fixtures must use example.com sources.");
  else requireCondition(record.sources.every((source) => !/(^|\.)example\.(com|org|net)$/.test(new URL(source.url).hostname)), "Live records must not contain fictional sources.");
  return record;
}

export function assessHardshipFreshness(record, asOf) {
  validateHardshipRecord(record);
  validateDate(asOf, "asOf");
  const reasons = [...record.review_flags];
  if (asOf < record.verified_at) reasons.push("not-yet-verified");
  if (asOf >= record.next_review_at) reasons.push("review-due");
  if ((record.valid_as_of && asOf < record.valid_as_of) || record.sources.some((source) => source.valid_as_of && asOf < source.valid_as_of)) reasons.push("not-yet-effective");
  return {
    record_id: record.record_id,
    as_of: asOf,
    observed_status: record.assessment.status,
    effective_status: reasons.length ? "unknown" : record.assessment.status,
    confidence: reasons.length ? "unresolved" : record.assessment.confidence,
    reasons,
    next_review_at: record.next_review_at,
  };
}

export function validateHardshipRegistry(records) {
  const ids = new Set();
  for (const record of records) {
    validateHardshipRecord(record);
    requireCondition(!record.fixture, "Synthetic fixtures must not enter the public registry.");
    requireCondition(!ids.has(record.record_id), `Duplicate record ID: ${record.record_id}.`);
    ids.add(record.record_id);
  }
  requireCondition(records.length > 0, "Registry must contain at least one record.");
  return records;
}
