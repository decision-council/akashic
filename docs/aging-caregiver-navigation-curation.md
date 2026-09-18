# Aging and Caregiver Navigation Curation

This records the bounded U.S. edition for [#142](https://github.com/egohygiene/akashic/issues/142), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Canonical home and overlap decision

Recorded before list edits: extend `lists/family-caregiving-and-aging/README.md` with aging-in-place and adult-caregiver navigation. Preserve its childcare, parenting, kinship, foster-care, and adoption entries and anchors. The new guide prepares a conversation about the person's preferences, available support, and actual costs; it does not recommend a facility or establish authority to act for someone.

| Existing coverage | Ownership decision |
| --- | --- |
| Public Programs and Services | Keep Eldercare Locator canonical here; use it to find aging agencies and local services instead of adding another locator entry. |
| Health, Well-Being, and Accessibility | Keep the Alzheimer's Association helpline, DIAL, and assistive-technology gateways in place; link to them for dementia support and independent-living discovery. |
| Community Sharing and Material Resources | Keep Meals on Wheels America Find Meals canonical here; use it for local meal-service discovery. |
| Legal Help and Law | Retain elder rights, fiduciary guidance, NCEA, and the Long-Term Care Ombudsman Locator. Add the distinct DOJ Find Help or Report Abuse gateway here for actionable APS reporting discovery, with a return link to routine caregiver planning. |
| Health and Well-Being | Keep clinical care, appointment preparation, records/proxy access, and patient safety canonical here. Dementia caregiver education in Family complements clinical navigation. |
| Financial Relief and Assistance | Keep benefit screening, applications, health coverage, and transport assistance canonical here. Add Medicare's long-term-care coverage explanation to Family as a care-planning reference, not a second application route. |
| Housing and Personal Finance | Reuse existing home-adaptation guidance and long-term-care insurance education. Do not duplicate repair programs or insurance entries. |
| Atlas | Keep California aging/caregiver and Massachusetts MassOptions entries unchanged. No local provider lists or inferred applicability edges. |

Repository-wide URL, title, organization, and keyword searches found no existing entries for the four proposed Family education/reference pages or the DOJ reporting gateway. MedlinePlus's general hub remains in Abundance; the two new targeted NIH/NLM pages answer specific aging and dementia-caregiver tasks. No resource migration or legacy metadata backfill is planned. Preserve all existing identities, former-URL aliases, and entry points.

## Scope boundaries

Separate routine support, suspected abuse/neglect reporting, resident advocacy, and immediate emergency response. Preserve the older adult's participation and privacy; caregiving and diagnosis do not by themselves authorize medical, financial, or legal decisions. Link home modifications to the existing Housing guide from #135. Expanded independent-living (#144) and end-of-life (#143) guides are not available yet; use existing DIAL and elder-rights paths and defer those expanded cross-links without inventing anchors.

## Payload prerequisite

The merged baseline has 5,334 resources, 36 collections, 471 resource topic paths, and 147 Atlas resources, with only 998 raw bytes left under the 3,900,000-byte catalog-page bootstrap budget. Omit empty `aliases` arrays from serialized catalog JSON, following the existing optional-empty `accessLabels` convention. The parser retains arrays; consumers already default absent aliases to `[]`. All five populated alias arrays remain intact. This saves 69,277 bytes across 5,329 empty arrays before content additions. Full baseline JSON equality after restoring empty arrays verifies that no data changed.

Serializer regression coverage checks round-trip equality, retained aliases, unchanged input, deterministic output, and saved-resource migration by canonical URL, old URL, and ID. Generated-site validation checks serialized aliases against canonical Markdown. Do not raise budgets, alter search algorithms, or remove metadata. Updating the site checker also triggers Search research CI, so refresh and verify its existing catalog-dependent reports against the completed content; leave evaluation fixtures and judgments unchanged.

## Source observations and metadata

Public pages checked **September 18, 2026**. These are automated access/content observations, not human truth review, provider inspections, or verification of each directory listing. No accounts, personal records, location searches, intake submissions, or provider contacts were used.

| New resource and stable ID | Observed purpose and limits |
| --- | --- |
| [NIH MedlinePlus Magazine Supporting a Loved One Aging in Place](https://magazine.medlineplus.gov/article/home-sweet-home-supporting-a-loved-one-aging-in-place) — `nih-medlineplus-aging-in-place` | NLM's October 2024 article covers preferences, daily support, local aging services, and home adaptations. Public education; no individual assessment or funding promise. |
| [Family Caregiver Alliance Caregiving at Home](https://www.caregiver.org/resource/caregiving-home-guide-community-resources/) — `fca-caregiving-at-home` | Nonprofit orientation to community care, respite, support groups, and contact planning. The page includes older policy, fee, and organizational examples; retain only durable planning value, explicitly flag dated examples, and do not copy prices or assume coverage. |
| [MedlinePlus Alzheimer's Caregivers](https://medlineplus.gov/alzheimerscaregivers.html) — `medlineplus-alzheimers-caregivers` | NLM education on caregiver support and care settings, with linked NIH and nonprofit material. Both domain variants opened; use the page's explicitly stated non-`www` URL. Do not treat caregiving as authority to act for another person or turn the linked clinical material into a care plan. |
| [Medicare Long-Term Care Coverage](https://www.medicare.gov/coverage/long-term-care) — `medicare-long-term-care-coverage` | CMS distinguishes non-medical long-term care from skilled nursing facility care and identifies possible Medicaid/private-insurance routes. Preserve service-specific and state eligibility questions; no universal coverage claim. |
| [DOJ Find Help or Report Elder Abuse](https://www.justice.gov/elderjustice/find-support-elder-abuse) — `doj-report-elder-abuse` | Official reporting-discovery gateway links to NAPSA's APS contacts and a state/territory elder-abuse locator, separately from emergency help. The linked [NAPSA directory](https://www.napsa-now.org/help-in-your-area) also opened. DOJ's information page is not itself an intake or investigation. |

Existing [Eldercare Locator](https://eldercare.acl.gov/) opened its location-search service at `/home`; the existing root remains valid. [Alzheimer's Association Help and Support](https://www.alz.org/help-support) exposes caregiver education, care options, community support, and its helpline. [Consumer Voice Get Help](https://theconsumervoice.org/get-help/) provides state long-term-care ombuds contacts for resident advocacy in covered settings. [Meals on Wheels Find Meals](https://www.mealsonwheelsamerica.org/find-meals/) redirects to `/find-meals-and-services/`, where availability, provider-specific eligibility, and fees are qualified; retain the useful existing entry and identity. These are supporting observations, not a metadata backfill for legacy entries.

All five additions are English U.S.-focused web pages readable without an account. `access: ["free"]` and `account: "none"` refer to those pages, not actual care or linked services. Use `license: "unknown"` without assuming reuse rights. Record explicit IDs, purpose, authority, geography, platform, active status, sensitivity, and `linkStatus: "ok"` / `linkChecked: "2026-09-18"`. Use quarterly review and medium volatility, except monthly/high for coverage information. Do not set `reviewed` or infer benefit eligibility from an access check.

## Exclusions and observation limits

- The proposed NIA aging-in-place article presented a robot/JavaScript challenge. Use the independently readable NLM article instead; do not claim the NIA page was inspected.
- ARCH's proposed respite locator and root returned HTTP 410. Omit the addition; use FCA education and the existing Eldercare Locator for respite discovery. Tool failures alone do not establish that an organization has closed.
- NCEA's existing hub was inaccessible to the research tool. Keep its existing entry unchanged; the independently verified DOJ gateway supplies the practical APS reporting path without implying a refreshed NCEA review.
- FCA's article contains old fee ranges, program claims, affiliate references, and a broad suggestion to have identifiers ready. Do not reproduce those details or ask users to disclose identifiers before verifying necessity and the intake channel.
- Do not add commercial placement directories, provider endorsements, clinical dementia protocols, legal determinations, copied eligibility thresholds, or local-provider lists. No existing title, URL, ID, alias, metadata, topic, or Atlas association changes.
- Expanded end-of-life and independent-living paths remain for #143 and #144. Existing legal and disability routes work now; no future collection or anchor is fabricated.

## Counts and validation contract

Final parsed content: **5,339 resources, 36 collections, 474 resource topic paths, and 147 Atlas resources**. Family grows from seven to eleven resources and adds three resource topics; Legal grows from 345 to 346. Public Programs (43), Abundance Health (61), Housing (24), and the Abundance hub (885) retain their counts. Update the root ledger accordingly.

Use one existing `site-guide` block, native related links, and shared English/Russian guide generation. Run collection validation, dependency-free tests, affected-list Awesome Lint, changed-JavaScript syntax checks, build/site checks, relative-link and preserved-resource comparisons, guide parity, and both performance profiles. Refresh and reproduce the nine search reports required by the triggered workflow; keep algorithms, fixtures, judgments, and budgets fixed. Record exact results, search-result deltas, and browser limits in the draft PR.

## Recorded validation results

- Collection validation, all 163 dependency-free tests, five affected-list Awesome Lint runs, JavaScript syntax checks, build/site validation, and whitespace checks pass.
- Full comparison preserves all 5,334 pre-existing resources (ignoring source-line shifts and restoring omitted empty alias arrays), all former-URL aliases, and every old topic. All 286 relative Markdown links/anchors checked across changed documents resolve. The single 17,651-byte Family guide renders identically in English and Russian output, including both tables.
- Final catalog-page bootstrap: **3,845,095 raw / 664,873 gzip / 516,383 Brotli bytes**, within unchanged **3,900,000 / 675,000 / 525,000** budgets. Standard and `--jitless` timing profiles pass; these Node smoke measurements are not browser/device claims.
- All six evaluation checkpoints, two fusion decisions, the static performance checkpoint, and the search-license ledger reproduce. Committed checkpoints previously described 5,301 resources; refreshing them also incorporates already-merged content. Algorithms, fixtures, judgments, and acceptance gates are unchanged; both fusion decisions remain `keep-active-ranking`.
- To separate this PR from older checkpoint drift, compare the 33-case v2 suite against the merged 5,334-resource baseline. Active lexical top-10 recall, NDCG, zero-result counts, and judged-irrelevant counts are unchanged; the first judged wheelchair result shifts from rank 27 to 28, moving mean reciprocal rank from 0.4627 to 0.4626. The inactive fusion experiment shifts the VPN case's first judged result from 1 to 2 and the uninsured-doctor case from 12 to 13. Its measured changes are retained honestly; it is not promoted. The fixture's existing independent-assessor limitations remain visible.

Browser-rendering observations and exact commit CI links are recorded in the draft PR. Generated guide parity alone does not establish mobile, keyboard, or live portal interaction coverage.
