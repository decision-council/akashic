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

## COBRA and post-employment benefits extension

Issue [#112](https://github.com/egohygiene/akashic/issues/112) adds the [COBRA workflow](../lists/financial-relief-and-assistance/README.md#cobra-after-a-job-change), public continuation references, and a separate benefit-account section. Keep the initial qualifying-event election distinct from the plan's annual open enrollment. Continuing the same coverage does not lock the premium or employer contribution, and annual enrollment does not restart the continuation period. Active re-election versus automatic continuation must come from the participant's actual notice, not an administrator example applied to everyone.

The dependent workflow is an administrative checklist, not a determination of anyone's eligibility. A stale portal record, a request to end coverage, and a formal qualifying-event notice are different matters. Preserve independent qualified-beneficiary rights, ask which evidence and effective date the plan requires, and make deadlines visible while corrections are pending. The divorce example is entirely generalized; do not import a private case, employer, plan, dependent, medical detail, financial amount, or portal screenshot. A retirement QDRO is not a shortcut for deciding health coverage.

### Primary source map

Operational content checked **2026-09-17**. These links map claims to their primary source; canonical catalog entries live in the collection, with the existing EBSA, Marketplace, and regulator-directory entries cross-linked rather than duplicated.

| Source                                                                                                                                                                                                                      | Supports                                                                                                                                   | Boundary or recheck                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DOL Worker’s Guide to Health Benefits Under COBRA](https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/workers-guide-health-benefits-cobra)                                           | Covered plans; qualified beneficiaries; notices and elections; equal annual enrollment rights; premiums, duration, and extensions.         | Current page redirects from the former employee-guide URL. Follow the SPD and notice for plan choices and procedures; this guide cannot decide an individual's facts.                                          |
| [DOL Employer’s Guide to Group Health Continuation Coverage](https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/an-employers-guide-to-group-health-continuation-coverage-under-cobra) | Cross-check of administrator notices, monthly payments, grace periods, and termination.                                                    | Supporting evidence only; omitted as a second catalog entry because the worker guide serves this audience.                                                                                                     |
| [CMS COBRA Questions and Answers](https://www.cms.gov/cciio/programs-and-initiatives/other-insurance-protections/cobra_qna)                                                                                                 | CMS jurisdiction and contact route for state/local government plans; election and payment framework.                                       | Do not route every private-sector dispute to CMS or apply a simplified FAQ deadline without the applicable notice rules.                                                                                       |
| [HealthCare.gov COBRA and Marketplace coverage](https://www.healthcare.gov/unemployed/cobra-coverage/)                                                                                                                      | Loss-of-coverage enrollment, COBRA exhaustion, loss of employer contribution, voluntary cancellation/nonpayment, and coverage start dates. | Recheck the current exchange's enrollment dates and special-enrollment decision. A normal premium increase is not automatically loss of an employer subsidy.                                                   |
| [HealthCare.gov total costs](https://www.healthcare.gov/choose-a-plan/your-total-costs/)                                                                                                                                    | Premiums and cost sharing beyond the monthly price.                                                                                        | The comparison checklist also asks readers to verify providers, drugs, existing deductible credits, and continuity with the exact plans. No blanket ranking of COBRA or ACA coverage.                          |
| [IRS Publication 969](https://www.irs.gov/publications/p969)                                                                                                                                                                | HSA ownership/portability, contribution eligibility, qualified COBRA premiums, and health FSA/HRA distinctions.                            | Page is labeled 2025 tax-return edition when checked. Do not copy its annual limits into another year.                                                                                                         |
| [IRS Notice 2015-87, Part V, Q&A 21–25](https://www.irs.gov/irb/2015-52_IRB#NOT-2015-87)                                                                                                                                    | Health FSA COBRA and carryover conditions; continuing a health FSA is not identical to electing new payroll contributions.                 | Technical 2015 guidance, not a current allowance table. Historical dollar examples and expired temporary pandemic relief are excluded; verify current law and plan terms.                                      |
| [IRS Publication 15-B](https://www.irs.gov/publications/p15b)                                                                                                                                                               | Dependent-care and qualified transportation benefits have their own tax and employment rules.                                              | Checked 2026 edition, especially “Transportation (Commuting) Benefits.” The guide asks about claim deadlines, balances, and refunds without inventing universal plan rules.                                    |
| [New York DFS COBRA FAQ](https://www.dfs.ny.gov/consumers/health_insurance/cobra_faqs)                                                                                                                                      | A labeled state-continuation example, including small-employer and state duration provisions.                                              | New York only; confirm the insured/self-funded policy and relevant law with DFS. Public content was readable through web retrieval, but a direct HTTP request returned 403, so `linkStatus` remains `unknown`. |

### State overlays and exclusions

Route readers through the existing [NAIC state insurance department directory](../lists/business-and-entrepreneurship/README.md#contracts-insurance-and-legal-help). Ask the regulator about the policy's governing jurisdiction, employer size/type, insured versus self-funded status, covered benefits, notice/election windows, premium rules, and continuation duration. Residence or an employer's mailing address alone should not be used to decide applicability. New York is an illustrative reference, not a fifty-state survey or an Atlas association. Any future Atlas connection still requires explicit human-reviewed applicability provenance.

Do not add administrator sign-in portals, commercial insurance lead funnels, or a second generic Marketplace or EBSA entry. An inaccessible candidate Massachusetts mini-COBRA URL was omitted. The module copies no plan-specific prices, private notices, current Marketplace annual calendar, or annual IRS contribution limits. It does not treat all FSAs as ineligible for COBRA, an HSA as a payroll-only account, a visible commuter balance as refundable cash, or a support ticket as a deadline extension.

Keep the normal monthly review cadence and recheck sooner for a legal change, upcoming enrollment season, revised agency publication, broken notice route, or identified contradiction. Machine availability and `programChecked` stay separate from human `reviewed`. Reverify legal deadlines, premium percentages, continuation periods, and exchange switching conditions before a public derivative is published.

### Medium article angle

**Working title:** “COBRA Open Enrollment After You Leave a Job: What Actually Needs Your Attention?”

**Audience and promise:** someone who already elected COBRA and receives a confusing annual notice. Help them identify the next administrative action without promising coverage, savings, or an eligibility result.

**Opening situation:** a generic notice shows the same plan name alongside a new monthly price. Explain why plan selection, payment, and dependent records need separate checks; use no real employer or household details.

**Outline:**

1. Explain the original election versus the annual review; neither a new year nor a re-election restarts the COBRA clock.
2. Read the action/default language and rate sheet separately. Review medical, dental, and vision as separate entries on a private checklist.
3. Resolve a generic stale dependent record with the administrator; distinguish corrections, eligibility events, and independent continuation rights. Keep deadlines active while waiting.
4. Confirm the elected coverage, effective date, premium, paid-through status, and any employer subsidy end date.
5. Compare Marketplace timing, providers, deductible, medicines, continuity, and total cost. Explain why voluntary cancellation is different from exhaustion or loss of an employer contribution.
6. Close with the health FSA/HSA/commuter distinctions and a single next action: find the notice's deadline and verified administrator contact.

Link the source map and canonical checklist, show the source-check date, and recheck before publication. This is an article angle and outline, not individualized legal advice or a published Medium post.

### Pinterest brief

**Format:** one readable vertical checklist with five numbered steps, short supporting copy, strong contrast, and text equivalents for every icon. Avoid portal screenshots, insurance logos, personal data, price promises, or a crowded legal-deadline chart.

**Title:** “COBRA after a job change: five checks.”

| Step               | Supporting copy                                                                       |
| ------------------ | ------------------------------------------------------------------------------------- |
| Elect              | Compare options and follow the original election notice's deadline.                   |
| Verify             | Check active medical, dental, and vision coverage, people, and next-year rates.       |
| Correct Dependents | Ask the administrator to resolve stale records; keep deadlines active while waiting.  |
| Re-enroll          | Follow the annual notice: submit required elections or verify automatic continuation. |
| Confirm Payment    | Save confirmation; check the premium, paid-through date, and coverage effective date. |

**Caption:** “Elect → Verify → Correct Dependents → Re-enroll → Confirm Payment. Annual enrollment does not restart COBRA. Your plan notice controls the required action; use the linked checklist to compare coverage and costs.”

**Footer and destination:** “U.S. baseline · plan and state rules vary · sources checked September 17, 2026.” Link to the canonical COBRA checklist and recheck that date before publication.

**Alt text:** “Five COBRA checks: elect on time; verify plans, people, and rates; correct dependent records with the administrator; re-enroll or confirm automatic continuation as instructed; save confirmation and verify payment and effective dates.”

This change supplies the brief only; it does not create or publish a Pinterest asset.

## Massachusetts RESEA extension

Issue [#113](https://github.com/egohygiene/akashic/issues/113) adds the [collection's RESEA orientation](../lists/financial-relief-and-assistance/README.md#massachusetts-resea-recovery), a [one-action-at-a-time recovery guide](massachusetts-resea-recovery.md), and six distinct official references. Reuse the canonical MassHire JobQuest and Department of Career Services entries in Work and Learning; their IDs, metadata, and Atlas associations remain unchanged. The national DOL unemployment gateway remains the starting point for other states. No geography tag creates new Atlas applicability.

The public guide uses collapsible text steps and a synthetic Mermaid routing diagram. It contains no private case, claimant or JobSeeker ID, benefit amount, employer information, real log, household or health data, notice, or portal screenshot. Keep that boundary for all derivatives. Do not copy a historical example's dates into a general deadline rule.

### RESEA primary source map

Public operational content and HTTP destinations checked **2026-09-17**; all six added resources returned HTTP 200 at their canonical URLs. The policy manual inspected was labeled **Revised January 2026**. Keep this agent check separate from human `reviewed`; recheck monthly and before publication or reliance, especially portal labels, appeal timing, and completion-credit rules.

| Claim or action                                         | Primary source                                                                                                                                                                                                 | Review boundary                                                                                                                                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Selection, JobQuest, CCS video, two individual meetings | [Massachusetts RESEA claimant guide](https://www.mass.gov/info-details/reemployment-services-and-eligibility-assessment-resea)                                                                                 | The designated CCS video must be completed in full; verify recorded attendance and remaining tasks.                                                                                                  |
| Optional preparation videos and current staff materials | [MassHire RESEA Resources](https://www.mass.gov/info-details/masshire-resea-resources)                                                                                                                         | Staff reference, not an individualized claimant checklist. RESEA Unpacked and Initial RESEA videos are optional.                                                                                     |
| Interim service and subsequent review                   | [Official process overview PDF](https://www.mass.gov/doc/resea-process-a-visual-overview/download) and [CAP form PDF](https://www.mass.gov/doc/resea-career-action-plan-cap-form-0/download)                   | Verify each assigned goal and date with the center; completing a workshop alone is not full attainment.                                                                                              |
| Completion credit and sanction distinction              | [RESEA Policy and Procedures Manual PDF](https://www.mass.gov/doc/resea-policy-procedures-manual/download), printed pages 39, 49, and 90                                                                       | Full-video attendance is recorded in staff systems. CCS and RESEA Review sanctions differ; earlier affected weeks may require a hearing after later compliance. Other eligibility issues can remain. |
| Claim/payment status versus information requests        | [DUA claim status](https://www.mass.gov/how-to/check-your-unemployment-claim-status) and [responding to requests](https://www.mass.gov/how-to/respond-to-requests-for-information-as-an-unemployment-claimant) | Read the underlying notice and Action Center request; not every pending payment is caused by RESEA.                                                                                                  |
| Weekly certifications while pending and reporting       | [DUA weekly claims](https://www.mass.gov/how-to/file-your-weekly-unemployment-claim)                                                                                                                           | Continue truthful claims unless DUA explicitly directs otherwise; do not imply eligibility or invent work-search activity.                                                                           |
| Appeals and late-filing limits                          | [DUA claimant appeals](https://www.mass.gov/how-to/appeal-an-unemployment-decision-as-a-claimant)                                                                                                              | Current general deadline is 10 calendar days from the determination's mailing date. Read the actual notice; neither completion nor a correction automatically appeals it.                            |

Do not promise automatic reversal, retroactive benefits, or a payment date. Explain the separate jobs of MassHire (service and attendance records) and DUA (claim decisions and appeals). A rescheduling request does not by itself extend a deadline. Keep weekly claims and appeal deadlines active during correction/adjudication; do not declare an appeal unnecessary without reading the determination.

Old weekly-benefit and appeal URLs redirected to the new canonical routes and were not added as duplicate entries. An old work-search examples URL also redirected to the weekly-claim page. Unavailable policy-index and directory-detail candidates were excluded; the verified claimant and resource hubs plus existing career-center gateway cover those needs. Do not add extra PDF catalog entries when they only repeat the curated hub's supporting materials.

### RESEA Medium article angle

**Working title:** “Missed a RESEA Deadline? Read the Notice, Fix the Next Step, Keep the Paper Trail.”

**Audience and promise:** a Massachusetts claimant who feels stuck after a missed task or held payment. Help the reader identify one next action and the right office without promising a benefit outcome.

**Opening:** a synthetic situation: a task looks completed, but a payment is still pending. No invented personal dates, amounts, employer, or account screenshot. Explain why the notice, service record, and claim decision answer different questions.

**Outline:**

1. Find the newest notice and protect any appeal deadline immediately.
2. Translate JobQuest, CCS, Initial RESEA, RES, CAP, and the subsequent review into the reader's next assigned task.
3. Show the designated CCS video route; distinguish optional preparation videos and verify recorded completion.
4. Route missed-task recovery to MassHire and payment/decision questions to DUA; use both when the records intersect.
5. Separate correcting a record from disputing a determination. Explain why later compliance may leave earlier weeks unresolved.
6. Keep truthful weekly claims and a private paper trail going. End with the matching collapsible step in the canonical guide.

Link the source map and recovery guide, display the source-check date, and reverify before publication. This is an editorial angle and outline; it does not publish an article or decide an individual's claim.

### RESEA Pinterest brief

**Format:** a vertical, high-contrast five-step checklist with short text, readable type, and a text equivalent for icons. Use a simple synthetic diagram rather than a portal screenshot. Put the appeal-deadline note near the first step so readers do not wait until escalation to appeal.

**Title:** “Massachusetts RESEA: one next step.”

| Step               | Supporting copy                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Notice             | Read the current task and deadline. Protect appeal rights immediately if a determination is disputed. |
| Complete           | Ask MassHire for the next assigned task or appointment; finish the required step.                     |
| Verify             | Save confirmation and verify that completion is recorded.                                             |
| Keep Claiming      | File truthful weekly claims while pending unless DUA explicitly instructs otherwise.                  |
| Escalate If Needed | Ask MassHire about service records and DUA about claim decisions; use both when needed.               |

**Caption:** “Notice → Complete → Verify → Keep Claiming → Escalate If Needed. Your current notice controls the dates. A correction does not file an appeal, and completing RESEA does not guarantee retroactive payment. Open the linked guide for one action at a time.”

**Footer and destination:** “Massachusetts · sources checked September 17, 2026 · follow your current notice.” Link the canonical recovery guide and recheck before publication.

**Alt text:** “Five Massachusetts RESEA recovery steps: read the notice and protect appeal deadlines; complete the assigned task; verify its record; keep filing truthful weekly claims; contact MassHire or DUA for unresolved issues.”

This change supplies a brief only; it does not create or publish a Pinterest asset.

## Massachusetts health-coverage transition extension

Issue [#114](https://github.com/egohygiene/akashic/issues/114) adds the [collection orientation](../lists/financial-relief-and-assistance/README.md#massachusetts-health-coverage-transition), a [seven-step guide and private comparison worksheet](massachusetts-health-coverage-transition.md), and eight distinct Massachusetts references. It complements the existing COBRA module and reuses the canonical Health Connector gateway, MassHealth Application Help, and federal COBRA/total-cost references. Existing resource IDs and Atlas associations remain unchanged; a Massachusetts geography tag creates no new applicability assertion.

The guide is general public education. It uses a blank worksheet and a synthetic date example, with no private household, employer, income, address, member identifier, medical detail, or screenshot. Do not add lead-generation insurance brokers, account login pages, duplicate generic gateways, plan rankings, or personalized eligibility/price promises. The coverage confirmation sequence applies separately to medical, dental, and vision; cancellation timing, refunds, and deductible transfers must come from the actual plan/administrator.

### Massachusetts coverage source map

**Public content checked 2026-09-17.** Mass.gov application, eligibility, change-reporting, and federal-change pages were readable with direct HTTP 200 responses. Health Connector public content was readable through web retrieval on its official `betterhealthconnector.com` site, while direct HTTP checks returned 403, including equivalent `mahealthconnector.org` paths. The six added Connector entries therefore use `linkStatus: unknown`; this is not a claim of direct HTTP success. Preserve the existing gateway URL and ID. Agent `programChecked` and `linkChecked` dates do not populate human `reviewed`.

| Primary source | Supports | Freshness or boundary |
| --- | --- | --- |
| [MassHealth application](https://www.mass.gov/how-to/apply-for-masshealth-the-health-safety-net-or-the-childrens-medical-security-plan) and [eligibility](https://www.mass.gov/info-details/eligibility-for-health-care-benefits-for-masshealth-the-health-safety-net-and-childrens-medical-security-plan) | Application routes, household/MAGI assessment, written decision, and possible subsequent plan selection. | Use the appropriate application for age and long-term-care circumstances. The agency decides; the guide copies no income threshold. |
| [ConnectorCare](https://betterhealthconnector.com/learn/plan-information/connectorcare-plans) | Subsidized private plans, cost-sharing structure, and insurer/network differences. | Checked the 2026 program page. Do not carry the former expanded pilot's income range into current eligibility or promise every insurer covers the same providers. |
| [Connector income questions](https://betterhealthconnector.com/how-do-i-answer-questions-about-income) and [HealthCare.gov annual income](https://www.healthcare.gov/income-and-household-information/how-to-report/) | Application-month income, payment frequency, unemployment compensation, and good-faith full-year MAGI estimation. | Connector calculator/examples still refer to 2025. Use the actual coverage year and current instructions; do not reproduce old tax-line numbers or infer a certain future job. |
| [HealthCare.gov household](https://www.healthcare.gov/income-and-household-information/household-size/) | Tax-household baseline and exceptions; people sharing a home are not automatically one assistance household. | Federal marketplace explanation supplements the Massachusetts application. Do not apply it mechanically to every MassHealth eligibility category. |
| [Connector special enrollment](https://betterhealthconnector.com/get-started/special-enrollment-period) and [HealthCare.gov COBRA switching](https://www.healthcare.gov/unemployed/cobra-coverage/) | Event-based windows, MassHealth/ConnectorCare exceptions, COBRA exhaustion/contribution loss, and limits on voluntary cancellation. | Confirm the person's actual window and current Massachusetts calendar. Do not transplant the federal exchange's annual dates. |
| [Connector payment instructions](https://betterhealthconnector.com/how-to-pay) | First full premium, the current 23rd-of-prior-month cutoff, and enrollment completion. | Confirm current processing/receipt requirements and the actual effective date. Zero-premium enrollment and MassHealth require their own confirmation path. |
| [HealthCare.gov total costs](https://www.healthcare.gov/choose-a-plan/your-total-costs/), [network models](https://www.healthcare.gov/choose-a-plan/plan-types/), and [prescriptions](https://www.healthcare.gov/using-marketplace-coverage/prescription-medications/) | Costs beyond premiums, network distinctions, exact formulary/pharmacy checks, and exceptions. | Plan-year contracts, insurer/provider confirmation, and prescribing-team review decide specifics. No drug or provider names appear in public examples. |
| [Connector dental coverage](https://betterhealthconnector.com/learn/plan-information/dental-coverage) | Separate dental choices and plan comparisons. | Distinguish an insurer's annual benefit maximum from a member's out-of-pocket maximum; ask the actual plan about waiting periods and work in progress. |
| [Connector income updates](https://betterhealthconnector.com/help-center-answers/individuals-and-families/how-to-update-your-income-information) and [MassHealth change reporting](https://www.mass.gov/how-to/report-changes-to-masshealth) | Reporting and reassessment; MassHealth's as-soon-as-possible/no-later-than-10-days instruction. | Connector text and screenshots include different years. Avoid brittle screen labels; apply to the current coverage-year account and notice. Do not invent a shared deadline for both agencies. |
| [Connector policy updates](https://betterhealthconnector.com/updates) and [MassHealth federal changes](https://www.mass.gov/federal-changes-affecting-masshealth-medicaid-members) | Evolving 2026–2027 rules and excess advance-tax-credit repayment changes. | Distinguish coverage year, effective date, and tax-filing year. The repayment-cap change concerns tax year 2026 even though reconciliation generally happens in 2027. |
| [Medicare basics](https://www.medicare.gov/basics/get-started-with-medicare) | Medicare's separate program and eligibility framework. | The module does not decide Medicare enrollment timing or coordination of benefits. Refer those questions to the official guidance and qualified assistance. |

Review monthly and sooner when enrollment season, a legal change, an agency notice, or a plan-year revision affects the workflow. Recheck every deadline, income-year example, subsidy rule, and source before publishing a derivative. Keep the detailed worksheet outside the shared catalog guide; the portal's short orientation links to it without adding an application calculator or storing personal data.

### Massachusetts transition Medium article angle

**Working title:** “Leaving COBRA Without Losing Coverage: A Massachusetts Transition Map.”

**Audience and promise:** a Massachusetts resident facing a larger continuation bill after a job change. Give them one manageable administrative step at a time while preserving essential care. Do not promise eligibility or savings.

**Outline:**

1. Start with the current coverage, its last day, full COBRA premium, and any employer contribution ending.
2. Explain MassHealth, ConnectorCare, ordinary marketplace plans, and Medicare separately from HMO/PPO/EPO networks.
3. Apply with truthful current income, a documented good-faith annual projection, and the correct household; wait for the written determination.
4. Compare a generic Bronze option, Silver/Gold alternatives, and COBRA using the blank worksheet. Check providers, exact prescriptions, deductible progress, and total exposure privately.
5. Enroll, satisfy any first-payment requirement, and confirm the effective date. Only then request an aligned COBRA last covered day; check dental and vision separately.
6. Save both confirmations and update income, household, or available employer coverage when facts change.

Link the canonical guide and source map, include the check date, and reverify before publication. Use no private case, prices, provider/medication names, or portal screenshots. This is an editorial outline, not a published article.

### Massachusetts transition Pinterest brief

**Title and sequence:** “Apply → Compare → Verify → Pay → Confirm → Cancel COBRA”.

**Format:** one vertical checklist with six numbered steps, readable type, strong contrast, and a text equivalent for each icon. Make the confirmation condition visible at normal reading size; do not bury it in a footnote.

| Step | Supporting copy |
| --- | --- |
| Apply | Keep current coverage while applying; read the written eligibility result. |
| Compare | Check premiums, deductible progress, copays, prescriptions, network, and out-of-pocket maximum. |
| Verify | Confirm essential care with the exact plan, insurer, provider, and pharmacy. |
| Pay | Complete enrollment and any required first premium; zero-premium plans still need enrollment. |
| Confirm | Verify enrollment, payment requirements satisfied, and the replacement effective date. |
| Cancel COBRA | Only after confirmation: request the prior day as the last covered day, subject to administrator rules. Check dental and vision separately. |

**Caption:** “Apply → Compare → Verify → Pay → Confirm → Cancel COBRA. Read the eligibility result, protect the care you need, and confirm replacement enrollment, any required payment, and its start date before requesting termination. Save both confirmations and report later changes.”

**Footer and destination:** “Massachusetts · sources checked September 17, 2026 · current agency and plan rules apply.” Link to the canonical seven-step guide. Recheck before publication; use no personal data, screenshots, price guarantees, or insurer logos.

**Alt text:** “Six Massachusetts coverage-transition steps: apply and read the result; compare total costs; verify providers and prescriptions; enroll and satisfy any first premium; confirm the new start date; then request an aligned COBRA end date. Check medical, dental, and vision separately.”

This change supplies the brief only; it does not create or publish a Pinterest asset.
