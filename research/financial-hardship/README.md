# Credit-card hardship evidence registry v1

This directory holds public issuer/product evidence for [the hardship navigation guide](../../docs/credit-card-hardship.md). It is a small research registry, not a second resource catalog, customer-account database, eligibility engine, or enrollment service. Resource discovery remains canonical in [Financial Relief](../../lists/financial-relief-and-assistance/README.md#debt-and-payment-hardship).

## Files and contract

- [JSON Schema v1](schemas/credit-card-hardship-v1.schema.json): required structure, types, six statuses, explicit unknowns, source metadata, and dates.
- [American Express product record](records/amex-blue-cash-everyday-us.json) and [Apple Card record](records/apple-card-us.json): first public examples, checked September 18, 2026; review due October 18, 2026.
- [Validator](../../scripts/lib/credit-card-hardship.mjs): schema structure plus source references, authority, claim roles, status evidence, privacy-field boundaries, and freshness assessment.
- [Tests](../../test/credit-card-hardship.test.mjs): validate every public record and use fictional `example.com` evidence to exercise all six states and prohibited upgrades. Fixtures cannot enter the live registry.

Every record has a stable `record_id` and `schemaVersion: 1`. Keep IDs stable when URLs change. A change in issuer or product scope requires a new evidence review, not an automatic carryover of the old policy. Retain history through Git. Make breaking vocabulary/meaning changes in a new schema version; do not silently reinterpret old records.

The `$schema` URI identifies the published schema; validation loads the checked-in schema locally and performs no network access. The validator intentionally supports only the vocabulary used by this schema and rejects unsupported additions. JSON Schema alone cannot check source-reference integrity, semantic evidence requirements, or whether a human-authored summary faithfully reflects a source.

| Fields | Meaning and rule |
| --- | --- |
| `brand`, `product`, `product_type`, `jurisdiction`, `scope` | Identify the exact product and geographic/evidence boundary. A network name or issuer-wide page is not individual product approval. |
| `issuer`, `servicer` | Separate sourced identity facts; describe limited service-provider roles accurately. Use `null` when the legal servicing identity is not documented. |
| `program_url`, `contact` | Program URL requires program evidence. A contact gateway is kept separate from a program/offer. Contact URLs must match their cited first-party source. |
| `assessment` | Observed status, evidence basis, confidence category, references, and explanation. It does not encode consumer eligibility. |
| `terms` | Assistance, eligibility, payment, APR, fees, card use, reporting, duration, termination, required documents, and arrears. Every field is present, even when unknown. |
| A fact's `text` / `source_ids` | Documented text requires available, correctly scoped first-party evidence. Unknown is exactly `{"text": null, "source_ids": []}`; never infer zero, none, or a concession from silence. |
| `sources` | Public URL, publisher, issuer/servicer/brand/regulator/secondary role, claim roles, product scope, availability, checked date, publication date, explicit effective/as-of date if known, and limits. |
| `search` | Which first-party materials were inspected, referenced sources, and limitations. A bounded absence finding requires inspected first-party evidence; blocked pages cannot establish absence. |
| `verified_at` | Date the whole record's public evidence was inspected. This is an agent observation, not human truth review, enrollment, or a policy effective date. |
| `valid_as_of` | Explicit policy applicability date when supported; `null` when not established. A page's publication date is stored separately and is not automatically the policy's effective date. |
| `next_review_at`, `refresh_triggers` | Scheduled review within 31 days, plus immediate review before reliance/publication and after relevant changes. These are editorial maintenance dates, not lender deadlines. |
| `review_flags` | Known post-verification access failure, conflict, issuer change, or terms change. These invalidate the effective status without destroying the historical observation. |
| `unresolved_questions` | Remaining product, identity, eligibility, or term questions. Do not fill them with guesses. |

## Evidence and confidence

Prefer current issuer and legal servicer material for program rules. Use first-party brand documentation for product identity or support routing when it establishes those roles. Regulator sources explain consumer rights and escalation; general regulator advice does not establish a particular issuer's offer. Secondary reports are attributed leads only and cannot supply documented program terms or confirmed unavailability.

| Observed status | Required basis / confidence | Minimum evidence |
| --- | --- | --- |
| `published-program` | `defined-program` / `first-party-public` | Available issuer/servicer program source and matching program URL; preserve issuer-wide vs exact-product scope. |
| `published-contact-path` | `contact-only` / `first-party-public` | Available first-party contact source and matching contact route. No inference that additional published terms do not exist. |
| `case-by-case-reported` | `attributed-report` / `reported-only` | Attributed public report. Keep hardship terms unknown and require direct confirmation. |
| `no-public-evidence-found` | `bounded-search` / `bounded-search` | Recorded inspected scope, first-party sources, and limitations. No program URL or inferred terms. |
| `confirmed-unavailable` | `explicit-product-denial` / `first-party-public` | Available issuer/servicer statement explicitly covering unavailability for the exact product. Ordinary agreements, missing pages, secondary anecdotes, and individual denials cannot supply this evidence. |
| `unknown` | `insufficient-evidence` / `unresolved` | Insufficient evidence, or a runtime freshness downgrade. Preserve the reason. |

Confidence describes the **kind of evidence**, not probability of approval. All non-program records keep hardship-term fields unknown. General card pricing must not be mistaken for hardship pricing. Keep account-specific written offers and direct-support confirmations privately; public additions need independently public policy evidence. A bare assertion with a source URL is not enough: reviewers must inspect the actual statement and its scope.

## Check and refresh

Run the offline structural/evidence check and date-sensitive report:

```sh
node scripts/check-credit-card-hardship.mjs
node scripts/check-credit-card-hardship.mjs --as-of "2026-10-18"
node --test test/credit-card-hardship.test.mjs
```

The first command uses today's UTC date. The report preserves `observed_status` and sets `effective_status` to `unknown` on the review-due date, before verification/effective dates, or when `review_flags` are present. It also sets confidence to `unresolved`. Overdue review does not become confirmed unavailability, delete evidence, or renew dates. Consumers must use the effective status and show its reasons before displaying terms as current. The Markdown guide is explicitly a dated snapshot, not a live status dashboard.

The check is read-only, offline, and performs no automatic policy refresh. `node --test` in existing CI validates the checked-in records and tests future/stale states deterministically; it does not claim to inspect live sources. Maintainers have an explicit review date and triggers; no new scheduled crawler, external reminder, or enrollment automation is created.

At a scheduled or triggered review:

1. Match product, jurisdiction, legal issuer, and servicing roles to current first-party material and the relevant agreement version.
2. Open the current program/support pages and inspect actual terms. Record access failures and conflicting evidence; do not treat a search snippet or HTTP success as verified policy.
3. If a source becomes unreadable or a material conflict/change appears, set the relevant `review_flags` immediately. Keep the last verified evidence as historical; flagging is not a fresh verification. If there has never been usable evidence, record `unknown` and the unavailable source.
4. Recheck all cited sources before advancing `verified_at` and each `checked_at`. Keep page publication and explicit effective dates separate. Do not advance dates solely because links respond.
5. Reassess each fact and the status within its scope; clear flags only after resolving them. Schedule the next review within 31 days, update the guide's dated summaries alongside the records, and run validation.
6. Commit a focused diff documenting changed evidence and remaining unknowns. Do not publish customer identifiers, financial details, medical facts, support transcripts, or completed forms. Strict fields catch undeclared data fields, but cannot replace privacy review of free text.
