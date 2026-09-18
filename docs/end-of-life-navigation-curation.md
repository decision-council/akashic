# End-of-Life Planning and Bereavement Navigation Curation

This records the respectful, bounded first U.S. edition for [#143](https://github.com/egohygiene/akashic/issues/143), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Canonical home and overlap decision

Recorded before list edits: extend `lists/family-caregiving-and-aging/README.md` with practical planning and bereavement administration. Use a short before / soon after / later guide, without treating grief as a task to finish. Respect the person's wishes, chosen relationships, culture, beliefs or absence of religious belief, privacy, and available support. Keep the existing childcare and aging paths intact.

| Coverage | Ownership decision |
| --- | --- |
| Family, Caregiving, and Aging | Own the practical checklist, funeral/disposition consumer orientation, general after-death navigator, digital legacy, and a wholly synthetic record example. Reuse the existing caregiver/respite guide. |
| Health and Well-Being | Add targeted palliative-versus-hospice education here. Retain Dougy Center, Refuge in Grief, What's Your Grief, pregnancy/infant-loss support, clinical care, and crisis routes; add return links to practical administration. |
| Legal Help and Law | Add CaringInfo's advance-directive education and state/territory form gateway in the existing older-adult/fiduciary section. Reuse legal aid and official court discovery for wills, estates, probate, and questions of authority. Do not publish a jurisdiction's forms as national instructions. |
| Public Services and Support | Add focused survivor-benefit and death-certificate routes. Keep existing government benefit gateways, unclaimed property, pension searches, and tax resources in place. Reporting a death, applying for survivor benefits, and claiming estate assets are different tasks. |
| Awesome Abundance | Keep the existing SSA eligibility screener and Veterans Benefits Administration entries. Do not duplicate them in the new guide. |
| Atlas | Retain California court/self-help and other place-specific resources. No local providers, funeral recommendations, or inferred applicability edges. |

Repository-wide title, URL, organization, and topic searches found related grief, fiduciary, court, benefit, and unclaimed-money coverage but no dedicated end-of-life, advance-directive, funeral, death-certificate, or digital-legacy entries. New targeted pages must answer a distinct task. No existing resource migration, URL replacement, identity change, or legacy metadata backfill is planned.

## Scope and access boundaries

The minimum useful edition distinguishes care options and advance-care planning, prepares questions about local forms and authority, covers funeral/disposition costs, certificates, notifications, survivor benefits, and estate/probate orientation, and offers private record organization and authorized digital-account routes. Free access describes reading the information, not care, certificates, funeral services, legal help, or benefits. Public vendor documentation may be readable without an account while setup or requests require authentication and evidence.

No personalized legal documents, universal deadlines, assumed inheritance or decision-making authority, promises of coverage, medical directives, fixed grief timetable, or instructions to use another person's passwords. A proxy, executor/personal representative, beneficiary, and helper have different roles. Ask the relevant professional or authority which role and documents apply. Platform access, data release, memorialization, and account deletion are separate processes.

## Baseline and delivery

Start from merged PR #162 on `main`: 5,339 resources, 36 collections, 474 resource topic paths, and 147 Atlas resources. The raw catalog-page bootstrap is 3,845,095 bytes under a 3,900,000-byte budget. Preserve the existing single Family `site-guide` block, all existing IDs/aliases/anchors, and shared portal rendering. No framework, parser, budget, or ranking change is planned. Record source observations, exclusions, final counts, and validation before handoff in one focused draft PR.

## Verified additions

Public pages opened **September 18, 2026**. These are automated access/content observations, not human truth review, professional advice, verification of every linked form, or provider inspection. No personal records, account setup, requests, benefit applications, or contact submissions were used.

| Canonical collection and resource | Stable ID | Observation and limit |
| --- | --- | --- |
| Family — [FTC Funeral Rule](https://consumer.ftc.gov/articles/ftc-funeral-rule) | `ftc-funeral-rule` | Official consumer choices, price disclosure, and written-cost guidance. Its coverage excludes some sellers and cemeteries; avoid universalizing local disposition rules. |
| Family — [USA.gov Agencies to Notify When Someone Dies](https://www.usa.gov/report-a-death) | `usagov-report-a-death` | Government and business notification map, with separate benefit routes. Use for contacts, not automatic cancellation, authority, or a promise that every listed program remains available. |
| Family — [Apple Legacy Contact](https://support.apple.com/en-us/102631) | `apple-legacy-contact` | Public vendor documentation about choosing a contact, keeping the access key, evidence requirements, and data exclusions. Setup and subsequent requests have separate account/device and review conditions. |
| Family — [Google Requests for a Deceased User's Account](https://support.google.com/accounts/troubleshooter/6357590) | `google-deceased-account-requests` | Official choices for closure, funds, or permitted data after review. No password release; closure prevents subsequent content-release requests. The linked inactivity-planning help was also opened. |
| Health — [CaringInfo Palliative Care and Hospice Care](https://www.caringinfo.org/types-of-care/what-is-the-difference-between-palliative-care-and-hospice-care/) | `caringinfo-palliative-hospice` | National Alliance for Care at Home patient education. Retain the distinction in care goals; ask clinicians and payers about the individual service and coverage. No clinical protocol or provider recommendation. |
| Legal — [CaringInfo Advance Directives](https://www.caringinfo.org/planning/advance-directives/) | `caringinfo-advance-directives` | Education, healthcare-agent questions, storage, and a state/territory forms route. The linked forms page opened, but each form was not individually validated. No copied forms or legal completion instructions. |
| Legal — [FTC Debts and Deceased Relatives](https://consumer.ftc.gov/articles/debts-and-deceased-relatives) | `ftc-debts-deceased-relatives` | Estate/representative and debt-collection orientation with exceptions to general personal-liability rules. Use qualified local help for the actual estate and any claim. |
| Public Services — [Social Security Survivor Benefits](https://www.ssa.gov/survivor) | `ssa-survivor-benefits` | Official eligibility, application, and death-reporting gateway. Its application link opened; neither a report nor reading the page establishes eligibility or starts a claim. |
| Public Services — [USA.gov Death Certificates](https://www.usa.gov/death-certificate) | `usagov-death-certificates` | Issuing-office discovery, certified-versus-other-copy questions, and U.S.-citizen death-abroad routes. Fees, permitted requesters, and accepted evidence require confirmation. |

Supporting checks: [CaringInfo's operator page](https://www.caringinfo.org/about/) identifies the National Alliance for Care at Home program; it is not a government agency. [Medicare's hospice coverage page](https://www.medicare.gov/coverage/hospice-care) confirms that coverage has election, eligibility, provider, and cost conditions; no dollar figures or universal treatment/coverage statements are copied. [CaringInfo's forms gateway](https://www.caringinfo.org/planning/advance-directives/by-state/) explains differing execution requirements and restricted copying permissions. [Google's Inactive Account Manager documentation](https://support.google.com/accounts/answer/3036546) distinguishes inactivity from a death-related request. The existing [Dougy Center](https://www.dougy.org/) exposes age-focused and advanced-serious-illness resources, and [USA.gov Courts](https://www.usa.gov/courts) remains the national court-discovery entry in Legal. Retain all legacy entries without claiming a new human review or backfilling their metadata.

## Metadata and exclusions

All nine additions have explicit IDs, purpose, authority, access, geography, language, platform, account, license, status, volatility/review cadence, sensitivity, and `linkStatus: "ok"` / `linkChecked: "2026-09-18"`. None has a fabricated `reviewed` date. Seven are U.S.-focused; Apple and Google documentation is marked global with regional/process limits, within a U.S.-focused guide. `authority: "official"` on vendor documentation means first-party instructions, not government authorship. CaringInfo is labeled nonprofit.

`access: ["free"]` and `account: "none"` describe public reading. Care, legal assistance, certificates, funeral services, and platform operations can have fees, eligibility, authentication, and evidence requirements. `license: "unknown"` avoids inferring reuse permission from public access. Use medium volatility/quarterly review, except high/monthly for the SSA and platform routes. Do not embed or redistribute forms, source-page text, or platform keys.

- The proposed MedlinePlus end-of-life URL was inaccessible to the research tool. Omit it and use the independently readable CaringInfo comparison; this is not a claim that MedlinePlus is unavailable generally.
- A guessed USA.gov path was inaccessible; follow the working death-certificate page to the actual after-death hub and its verified notification page. Use the narrower notification page as the catalog entry; do not add both it and the overlapping hub.
- Add the targeted SSA survivor route alongside the existing general eligibility screener and account page because application/reporting orientation is a distinct task. Do not repeat program amounts or broad family-eligibility assumptions.
- Do not reproduce the USA.gov notification page's passing reference to COVID burial reimbursement, or assume any assistance program is open. Current program availability must come from its administering agency.
- Keep hospice insurance details out of the guide beyond questions to ask; provider-association explanations do not determine an individual's Medicare or other coverage.
- No funeral marketplace, estate-document generator, paid planning package, platform bypass, blanket probate timeline, account impersonation, or public real-person example is added. No local-provider record or Atlas applicability changes.
- Existing curation notes for #141/#142 remain historical release records; the current Family guide now links aging/caregiver planning to this end-of-life edition. Independent-living expansion remains #144.

## Counts and verification contract

Parsed result: **5,348 resources, 36 collections, 478 resource topic paths, and 147 Atlas resources**. Family **11 → 15**, Health **174 → 175**, Legal **346 → 348**, Public Services **111 → 113**. Four new resource topics: two in Family, one in Health, and one in Public Services. Abundance counts and every existing resource/identity/alias remain unchanged.

Use the existing single Family guide block and shared English/Russian rendering. Required checks are collection validation, all dependency-free tests, pinned Awesome Lint for four affected lists, build/site validation, relative-link and preservation checks, guide parity, deterministic build, whitespace hygiene, and both search-performance profiles with unchanged limits. No JavaScript, algorithm, fixture, or search-checkpoint changes are needed for this content release. Record final measurements and browser/CI evidence in the draft PR.

## Recorded local results

Collection validation, all **163 dependency-free tests**, all **four affected-list Awesome Lint runs**, build/site checks, deterministic generation, and whitespace checks pass. The comparison preserves all **5,339 existing resources**, all former-URL aliases, and every old topic, ignoring only source-line shifts. All **329 relative Markdown links/anchors** checked across changed documents resolve. The single Family guide is **28,557 bytes** of identical English/Russian generated HTML; both navigation tables and all three stage headings render.

Catalog-page bootstrap is **3,866,228 raw / 669,405 gzip / 519,671 Brotli bytes**, within unchanged **3,900,000 / 675,000 / 525,000** limits. Both standard and `--jitless` search timing profiles pass; these are Node smoke measurements, not browser/device claims. No generated output or research checkpoints are committed. Exact-commit CI links, GitHub browser observations, and any live-portal preview limitation are recorded in the draft PR.
