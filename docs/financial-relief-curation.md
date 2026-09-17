# Financial relief curation contract

## Scope and canonical home

Issue [#110](https://github.com/egohygiene/akashic/issues/110) implements a focused part of the Personal Finance, Consumer Money, and Insurance domain in [#40](https://github.com/egohygiene/akashic/issues/40). Its canonical home is [`lists/financial-relief-and-assistance/README.md`](../lists/financial-relief-and-assistance/README.md). The first edition covers United States assistance discovery during income disruption; it is neither a comprehensive benefits database nor an eligibility calculator.

Organize by the expense or support need: benefits screening; food; housing; utilities; health; prescriptions; income; debt hardship; student loans; transportation; taxes and legal aid; local and disaster discovery. Keep the short start path and explanation of assistance types inside the existing portal guide markers.

Public Services and Support retains broad urgent gateways, 211, Findhelp, money recovery, and civic resources. Awesome Abundance retains broader no-cost public programs. Legal Help and Law owns legal aid, disputes, and rights. Cross-link those canonical entries rather than duplicating them. Local providers and future state overlays belong in Atlas only after an explicit applicability review; a `geography: ["us"]` tag never grants inheritance or universal eligibility.

When moving an existing resource, copy its generated ID before editing the title, URL, or location. Keep former URLs in `aliases`, update source-list navigation and counts, and preserve old section headings. New resources fill an actual assistance or application-route gap. Broad directories and program-specific application guidance may coexist only when their functions are distinct.

## Source and exclusion policy

Prefer administering agencies, authorized public-program operators, and established nonprofits. Check the actual program owner's eligibility, intake, fees, documentation, and renewal pages, following links from the primary landing page. A directory is a discovery aid; its listing cannot certify a provider. Disclose a commercial directory's operator and do not present it as government or nonprofit assistance.

Exclude paid access to government applications, referral funnels, guaranteed grants, predatory borrowing, debt-settlement sales leads, expired emergency funds represented as open, and offers whose operator or terms cannot be established. Do not copy income cutoffs, benefit amounts, or temporary repayment-plan availability when a direct current application route serves readers better. Never submit test applications or use personal financial, medical, household, or account data to curate this public list.

## Reusable Markdown and metadata profile

Use the existing [resource metadata schema](resource-metadata.md) and one-line Awesome format. The build already exports these entries to `dist/data/catalog.json`; do not create a second JSON catalog. The collection validator requires the common fields below for every entry.

| Issue requirement | Canonical representation |
| --- | --- |
| Name and application/contact route | Linked official resource name and canonical URL; description says whether to apply there or contact another administrator. |
| Administrator and intended audience | Description names the operating agency, organization, or directory owner and relevant household, age, work, or coverage group. |
| Geography | Visible `United States` label plus `geography`; description calls out local administration and exceptions. |
| Support category | Resource-bearing Markdown section. |
| Benefit or relief type | Visible label: `Direct assistance`, `Payment relief`, `Discount`, `Navigation`, or `Information only`; combinations are allowed. These are editorial labels, not new machine facets. |
| Eligibility | Concise descriptive conditions, `eligibility-based` access when relevant, and mandatory external verification in the guide. A program decides; Akashic does not. |
| Documents and renewal | Entry describes known requirements or tells readers which administrator must supply the checklist, deadline, or renewal rule. Do not imply a universal document list. |
| Cost and fees | Visible free-information/application qualification plus `access` and `costModel`. Distinguish the linked guide's cost from downstream care, bills, interest, or counseling fees. |
| Authority and access | `resourceType`, `role`, `authority`, `language`, `platform`, `account`, and `license`. `account` describes the linked public resource; separately disclose downstream application accounts when applicable. |
| Currency and sensitivity | `status`, `volatility`, `reviewTier`, `sensitive`, and `programChecked`; all entries in this edition are financially sensitive and scheduled for monthly review. |
| Availability evidence | Paired `linkStatus` and `linkChecked`, independently of `programChecked` and human `reviewed`. A shell or challenge page is not verified content. |
| Privacy and related paths | Guide safeguards, resource-specific restrictions where needed, and relative links to canonical collection sections. |

Keep stable IDs permanent. The existing `supportType` field describes open-source sustainability support; do not overload it with financial-relief labels. If a future navigator needs typed eligibility or assistance facets, extend and validate the shared schema, generator, consumers, and checks together. Do not infer them by treating prose as an eligibility rule engine.

## Recency and verification

1. Open every new or materially changed resource and verify the operator, purpose, canonical destination, audience, application/contact route, costs, and limits against primary content. For interactive-only public pages, inspect rendered content without entering personal data.
2. Record `programChecked` as the date operational content was inspected. It is not a human truth review, endorsement, or promise that a fund is accepting applications. Record successful HTTP checks separately; mark an inconclusive availability check `unknown` even when another primary source confirms the program.
3. Set `reviewTier: "monthly"` and recheck sooner after a policy change, moved URL, closed fund, scam report, or broken intake path. Recheck at use time for deadlines, intake, balances, funding, fees, and eligibility. The existing [freshness workflow](freshness.md) observes links; it cannot do the substantive monthly review for maintainers.
4. Human reviewers alone set `reviewed`. An overdue or missing review stays visible in the review queue; neither an HTTP 200 nor an agent's source-check date fills it in. State unknowns rather than inventing thresholds, renewal dates, or documentation requirements.
5. Record verification limitations, exclusions, and migrations in the PR. If the relevant content cannot be checked, leave the candidate out or retain its existing canonical entry without making new program claims. Keep public evidence free of personal applications and financial details.

## Validation and publication

Run collection validation, dependency-free tests, pinned Awesome Lint for affected lists, the site build and generated-site checks, and `git diff --check`. Check guide anchors and relative links, preserved resource IDs and aliases, generated counts, and collection discovery in the portal. Do not commit generated output.

The [financial stabilization framework](https://github.com/egohygiene/egohygiene/issues/469) remains a separate proposal. This collection supplies discovery routes, not an implemented obligation tracker or universal order for paying bills.

## SNAP, EBT, and health-plan OTC extension

Issue [#111](https://github.com/egohygiene/akashic/issues/111) adds federal SNAP references, a visibly separate Massachusetts reference section, and plan-specific OTC verification guidance. Keep the distinction between a benefit program, its payment system, and an insurer's allowance explicit. The existing DTA Connect entry remains canonical in Massachusetts Atlas; link to it without duplicating it or inferring new catalog applicability or inheritance from a geography tag.

Check the effective benefit year as well as the retrieval date. On 2026-09-17, USDA's recipient eligibility page labeled its table October 2025–September 2026 and flagged work/noncitizen guidance as still being updated after the 2025 law changes. Massachusetts' calculation explainer contained older dollar figures, so this edition uses the application, verification, reporting, and regulation sources without copying its amounts. Recheck before the October benefit-year boundary; monthly review is a minimum, not permission to leave a known transition unexamined.

The unemployment classification is supported by 7 CFR 273.9(b)(2)(ii) in the explicitly labeled 2025 annual edition and Massachusetts 106 CMR 363.220(B)(2). The federal annual edition is supporting evidence for that classification, not a substitute for current state eligibility guidance. Ordinary expenses are not deductions merely because they are necessary; preserve the conditions on earned income, care, medical costs, child support, and shelter calculations. A screen is not an application decision, and a missing document packet should not be portrayed as a bar to filing an initial Massachusetts application.

Treat an insurer's public OTC page as an example for its members, not a universal product list or a recommendation to switch coverage. Verify the exact plan year, membership, allowance, catalog, retailer/channel, reload, rollover, and expiration against the member's actual plan documentation. Do not record personal plan IDs, card numbers, balances, household finances, or health information in Akashic. `programChecked` records inspection of the public documentation; it cannot certify an individual's coverage.

A possible public derivative is **“SNAP, EBT, and OTC Cards Aren't the Same Thing.”** Reuse the three-way comparison, the distinction between permitted deductions and ordinary bills, and the plan-verification checklist. Keep it generic, date and link its primary sources, and recheck before publication; do not include a private case study, benefit amount, or implied eligibility result. No Medium or Pinterest publication is part of this change.
