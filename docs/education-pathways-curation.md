# Education pathways and credential verification curation

Issue: [#145](https://github.com/egohygiene/akashic/issues/145), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Scope and ownership decision

Recorded before implementation on September 18, 2026. Extend Work and Learning with a U.S. first edition covering adult/basic education and equivalency, community college, degree study, vocational credentials, and recognition of prior or foreign learning. Use its existing marked guide for orientation and a five-step checklist; keep the longer comparison worksheet in a linked Markdown document. This follows the existing TOP document pattern and keeps the shared portal payload bounded.

| Existing coverage | Decision |
| --- | --- |
| Work and Learning: CareerOneStop, career research, apprenticeships, and TOP | Keep every resource and heading. Reuse CareerOneStop's training and licensing tools; add explicit metadata only if its entry is materially updated. Extend the current guide without replacing its career paths. |
| Awesome Abundance: Education and Learning | Retain free learning libraries; add a return link to credential and enrollment guidance. No course megadirectory. |
| Awesome Abundance: Public Programs and Services | Retain Federal Student Aid, American Job Centers, WIOA training discovery, apprenticeships, and Massachusetts free community college. Link these canonical resources rather than duplicating them. |
| Financial Relief: student loans and Massachusetts TOP | Keep repayment/relief and benefit approval there. Education approval, tuition funding, admission, and benefit approval remain separate decisions. |
| Abundance disability guide and Legal education rights | Reuse learner accommodations and qualified rights/complaint help. Do not repeat #144 or infer that earlier school accommodations transfer automatically. |
| Atlas | Place-specific providers remain there; no local listings or inferred service coverage are added. |

The minimum useful edition compares routes, verifies institutions/programs, checks total cost and aid, prepares an application, and confirms recognition with the actual receiving institution, employer, or licensing board before commitment. Distinguish course certificates, professional certifications, occupational licenses, and accredited degrees. No rankings, guaranteed outcomes, immigration determinations, personal eligibility decisions, fixed aid amounts, or promises of transferable credit.

Public reading/search is distinguished from enrollment, assessments, credentials, and paid evaluations. Keep transcripts, immigration or identity documents, financial records, and real applicant cases private. Readers choose which accommodations or human support to request. Source observations will record actual access limits; no human review date will be invented.

## Primary-source observations

Inspected **September 18, 2026**. Public reading and search interfaces were checked; no applicant, school, or credential was endorsed, no private account was opened, and no application, inquiry, evaluation, or complaint was submitted. These are source/link observations, not human truth review.

| Source | Evidence and limits |
| --- | --- |
| [DAPIP](https://ope.ed.gov/dapip/) | Text retrieval returned an empty application shell; browser inspection exposed public search, agency-list/download routes, and its disclaimer. Reports come from recognized agencies, are unaudited, and may be incomplete or stale. ED recognizes accrediting agencies, not individual colleges. Coverage excludes foreign institutions. No individual accreditation determination was made. |
| ED [College Accreditation](https://www.ed.gov/laws-and-policy/higher-education-laws-and-policy/college-accreditation) and [Diploma Mills and Accreditation](https://www.ed.gov/laws-and-policy/higher-education-laws-and-policy/college-accreditation/diploma-mills-and-accreditation) | Supporting references for institutional/program accreditation and limits of the federal list. Absence alone is not proof of fraud. The receiving institution's transfer policy remains a separate check. |
| [College Scorecard](https://collegescorecard.ed.gov/) and [data documentation](https://collegescorecard.ed.gov/data/data-documentation/) | Public college/field-of-study comparisons expose costs, completion, debt, and earnings. Documentation distinguishes institution and field data and provides cohort/timing maps and errata. The guide treats aggregate measures as context, not rankings or personal forecasts; missing values are not assumed to be zero. |
| [ACE National Guide](https://www.acenet.edu/National-Guide/Pages/default.aspx) and [learner guidance](https://www.acenet.edu/National-Guide/Pages/Seeking-Credit.aspx) | Public search showed evaluated courses/exams and recommendation dates. Learner guidance explicitly leaves credit decisions to the receiving college. ACE is a nonprofit membership organization, not a licensing agency or universal transfer authority. No transcript was ordered. |
| [ED Recognition of Foreign Qualifications](https://www.ed.gov/about/initiatives/international-affairs/recognition-of-foreign-qualifications) | Routes readers to the recipient that will use the qualification. Evaluations can cost money and require translations; the recipient may specify the evaluator. ED neither evaluates credentials nor endorses individual evaluation services. No evaluator ranking or immigration instructions are added. |
| [FTC Choosing a Vocational School or Certificate Program](https://consumer.ftc.gov/articles/choosing-vocational-school-or-certificate-program) | Public page initially loaded through web retrieval, later timed out; browser inspection verified the full article. It supports independent school-licensing checks, written contracts, cost comparison, and complaints. The article is dated May 2021; linked legacy reporting endpoints and figures are not copied as current instructions. |
| [CareerOneStop](https://www.careeronestop.org/) and [Find Training](https://www.careeronestop.org/FindTraining/find-training.aspx) | Browser confirmed public navigation and optional login, Department of Labor sponsorship, training types, local training, certification, and license discovery. Keep the existing root URL/ID and update its description instead of adding another overlapping hub. |
| CareerOneStop [Adult Basic Education](https://www.careeronestop.org/FindTraining/Types/adult-basic-education.aspx), [high school equivalency](https://www.careeronestop.org/FindTraining/Types/high-school-equivalency.aspx), [certifications](https://www.careeronestop.org/FindTraining/Types/certifications.aspx), and [License Finder](https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx) | Web search found the relevant pages, but direct text retrieval failed. Browser verified basic-skills/English and local-help routes, state equivalency links, certification terminology, and licensing-agency discovery by occupation/location. The equivalency page says “three” exams while displaying two; no exam count or nationwide equivalency rule is repeated. Local eligibility and accepted tests require state/provider confirmation. |
| FSA [Comparing School Financial Aid Offers](https://studentaid.gov/complete-aid-process/comparing-aid-offers) | JavaScript-only text response; browser verified the full public guide, costs beyond tuition, grants versus loans, written offers, and aid-office help. This is a supporting deep link to the existing Federal Student Aid resource, not another catalog entry. No current award amounts, rates, or universal deadlines are asserted. |

The credential glossary, comparison questions, and blank worksheet are editorial aids, not agency application forms. For authorization, the FTC route identifies the school's responsible state agency; readers verify with that agency. For professional practice, CareerOneStop locates occupational regulators; readers verify with the actual board. A listing in either discovery tool is not permission to enroll, practice, or receive funding.

### Exclusions and reuse

- Retain the existing WIOA, TOP, Federal Student Aid, apprenticeship, free-community-college, and course-library entries and their owners. No resource migration or old URL change is needed.
- Do not add College Navigator alongside Scorecard for this small edition; additional college directories are unnecessary to its comparison task.
- Omit paid evaluator recommendations, school rankings, recruiter funnels, and claims of automatic admission, transfer, licensure, employment, or benefit approval.
- Do not copy the FTC article's dated downstream complaint endpoints or CareerOneStop's inconsistent exam count. No new entry claims those pages were independently validated.
- No local-provider records, schema, UI, search algorithm, research checkpoint, dependency, or budget changes. #146 and the existing benefits follow-ups retain their scopes.

All five new entries have explicit stable IDs and applicable authority, access, geography, language, account, license, status, review cadence, and sensitivity metadata. CareerOneStop preserves derived ID `careeronestop-29557d020b` as an explicit ID. Public information is free; paid downstream services are distinguished in the reader-facing section. Unverified licenses remain `unknown`; `linkChecked` does not populate `reviewed`.

## Counts and compatibility

| Count | Before | After |
| --- | ---: | ---: |
| Work and Learning | 189 | 194 |
| Whole catalog | 5,350 | 5,355 |
| Top-level collections | 36 | 36 |
| Resource topic paths | 478 | 479 |
| Atlas resources | 147 | 147 |

New IDs: `ace-national-guide`, `college-scorecard`, `ed-accredited-postsecondary-institutions-programs`, `ed-recognition-foreign-qualifications`, and `ftc-choosing-vocational-school-certificate-program`. The only new resource topic is Education Verification. Existing headings, source ownership, URLs, aliases, and resource IDs are preserved.

## Validation

Validation results are recorded in the draft PR against its published tree. The edition uses a short addition to the existing portal guide plus a linked full Markdown worksheet; the initial draft exceeded the unchanged gzip bootstrap budget by 191 bytes. Editing only the new summaries and removing the duplicate route table from the portal resolved that growth without changing limits or infrastructure. The route table remains in the full worksheet.
