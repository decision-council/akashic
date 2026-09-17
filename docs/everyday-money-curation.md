# Everyday money navigation curation

Issue: [#136](https://github.com/egohygiene/akashic/issues/136), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Canonical home and bounded edition

Create [Personal Finance and Insurance](../lists/personal-finance-and-insurance/README.md) for everyday household money decisions. Financial Relief remains the place for assistance, urgent shortfalls, benefits, payment hardship, tax help, and student-loan relief. A person can use the new guide before or after a crisis without turning a benefits collection into a general product directory.

The first edition covers cash-flow timing, banking costs and deposit protection, credit reports and disputes, borrowing and nonprofit counseling, transfers, and consumer escalation. Three new CFPB entries supply reusable worksheets, a current dispute workflow, and transfer guidance. Eight existing entries move with their IDs and URLs intact. No provider rankings, affiliate links, account collection, local-provider records, or individualized recommendations are introduced.

The existing guide mechanism publishes a compact orientation and links to the complete Markdown checklist and resource sections. The detailed Markdown remains the source of truth. This keeps the release within the existing full-page budget without changing runtime behavior, serialization, dependencies, or budget limits. The new collection receives its required index, validator registration, and visual identity.

| Existing coverage | Decision |
| --- | --- |
| Public Services: CFPB Consumer Tools and Consumer.gov | Move these general educational gateways to Cash Flow and Bills. Keep the old headings with contextual pointers. |
| Public Services: Bank On, FDIC BankFind, NCUA locator | Move everyday account discovery and institution checks to Banking and Deposit Protection. |
| Public Programs: AnnualCreditReport.com | Move to Credit Reports and Disputes; leave a free-access pointer at the original tax/credit heading. |
| Public Services: NFCC and FCAA | Move the national nonprofit counseling networks to Borrowing and Counseling; distinguish agency fees from free discovery. |
| Public Services: ChexSystems, Early Warning, MyMoney.gov, OptOutPrescreen | Retain the specialized disclosure, broader education, and prescreening entry points; link directly to that section for bank-account denials. This bounded edition does not recurate every adjacent resource. |
| Public Services: individual counselors, NerdWallet, National Debt Relief | Keep the existing provider directory and link it with explicit distinctions between nonprofit counseling, commercial comparisons, paid services, and settlement. Do not add or rank providers. |
| Public Programs: CFPB complaint portal, IdentityTheft.gov, FTC Consumer Advice; Public Services: ReportFraud.ftc.gov | Keep the established free complaint, identity-recovery, and broad fraud routes. Contextual links tell readers which task each handles. |
| Legal: debt collection, Consumer Action, NCLC, USA.gov complaints, bankruptcy | Retain rights, regulator routing, court, and legal escalation here. Update its pointers to the moved report/counseling resources. A complaint is not a defense or deadline extension. |
| Tax filing/withholding/EITC, tax-debt help, benefits, student-loan hardship, urgent bills | Retain current homes in Public Services, Public Programs, and Financial Relief. Provide direct routes rather than duplicate entries. |
| Investing, retirement, long-term saving, general insurance | Leave FINRA, Investor.gov, my Social Security, and other existing entries for #137's broader audit. Property insurance stays in Housing. Issuer/product hardship details remain #121. |

## Sources and access evidence

Inspected **September 17, 2026**. These are source/link observations, not human truth review. No personal financial data, application, complaint, report request, or counseling intake was submitted.

| Primary source | Verification and limits |
| --- | --- |
| [CFPB Your Money, Your Goals toolkit](https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/) | Free individual PDFs include a bill calendar, cash-flow budget, debt log, and comparison tools. The full toolkit is labeled June 2020; it is an organizing aid, not a current statement of every law, program, or deadline. |
| [CFPB credit-report dispute instructions](https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-an-error-on-my-credit-report-en-314/) | Supports contacting the reporting company and information provider, using document copies, retaining proof, and routing identity theft separately. Exact legal response periods are not generalized. |
| [CFPB money transfers](https://www.consumerfinance.gov/consumer-tools/money-transfers/) | Provides remittance disclosures, cancellation/error pathways, and scam guidance. The guide asks comparison questions without promising identical protections for every payment method or recovery of a transfer. |
| [CFPB Consumer Tools](https://www.consumerfinance.gov/consumer-tools/) and [Consumer.gov](https://consumer.gov/) | Public financial education, not counseling enrollment or lending. CFPB now routes users to downloads/printing; do not promise mailed printed publications. |
| [Bank On certified accounts](https://joinbankon.org/accounts/) | CFE Fund's nonprofit directory lists certified bank/credit-union products by state. The directory is free; account fees, access conditions, and approval are provider-specific. No product was selected. |
| [FDIC BankFind](https://banks.data.fdic.gov/bankfind-suite/bankfind) and [NCUA locator](https://mapping.ncua.gov/) | Official application pages respond; text extraction does not expose their interactive results. A browser check confirmed BankFind's insured-bank search interface, institution-name/certificate/URL modes, and location controls. No bank, credit union, membership, or account coverage was verified; the NCUA locator is also linked from NCUA's accessible coverage guidance. |
| [NCUA share insurance coverage](https://ncua.gov/consumers/share-insurance-coverage) | Supports checking federal insurance, ownership categories, limits, and excluded investment products. It also points to the locator. Supporting explanation only, not another catalog entry. |
| [AnnualCreditReport.com](https://www.annualcreditreport.com/), [mission](https://www.annualcreditreport.com/ourmission.action), and [accessibility](https://www.annualcreditreport.com/accessibility.action) | Authorized industry-run free-report site; the root redirects to `index.action`. Phone/mail and accessible-format information are available. Identity verification is separate from a paid monitoring subscription. Keep the established root URL and ID; a redirect alone is not a resource migration. |
| [NFCC](https://www.nfcc.org/) and [FCAA](https://fcaa.org/) | National nonprofit counseling networks; readers should confirm agency service scope, fees, waivers, and creditor participation. Free directory access does not establish free ongoing debt-management services. The guessed `www.fcaa.org` host failed; the existing canonical `fcaa.org` loaded. |
| [FTC debt-options guide](https://consumer.ftc.gov/articles/how-get-out-debt) | Existing Financial Relief entry supports distinctions among counseling, debt management, settlement, fees, collection exposure, credit effects, and possible tax consequences. It remains the canonical resource. |
| [ChexSystems](https://www.chexsystems.com/request-reports/consumer-disclosure) and [Early Warning](https://www.earlywarning.com/consumer-information) | Existing specialized banking-history reports have free disclosure routes and identity requirements. ChexSystems describes online registration and phone/mail alternatives; Early Warning distinguishes its deposit score from a credit score. No request was made. |
| [CFPB complaint](https://www.consumerfinance.gov/complaint/), [FTC consumer advice](https://consumer.ftc.gov/), [IdentityTheft.gov](https://www.identitytheft.gov/), and [ReportFraud.ftc.gov](https://reportfraud.ftc.gov/) | Retain existing entries; guidance distinguishes complaints, fraud reports, and identity recovery. Application shells do not establish a successful submission or outcome. |

The FDIC deposit-insurance brochure returned HTTP 403 during source inspection and was not added as a resource. Its indexed summary is not treated as a successful live check; BankFind and the accessible NCUA explanation provide the narrower discovery/coverage context. No exact coverage dollar limit, interest rate, settlement savings claim, universal deadline, or current product price is copied into the guide.

Every new or moved entry has an explicit stable ID and access, authority, U.S. geography, language, platform, account, license, status, volatility, review cadence, sensitivity, and link metadata. Unknown licenses remain unknown. AnnualCreditReport.com is labeled commercial authority because it is industry-operated, despite its authorized free-report purpose. Counseling networks use both free and paid access to avoid hiding potential service fees. No `reviewed` date is invented.

## Identity and count ledger

| Migrated resource | Preserved ID | Former collection |
| --- | --- | --- |
| CFPB Consumer Tools | `cfpb-consumer-tools-4115564f24` | Public Services |
| Consumer.gov | `consumer-gov-6f94a91351` | Public Services |
| Bank On Certified Accounts | `bank-on-certified-accounts-7c44c2ec38` | Public Services |
| FDIC BankFind Suite | `fdic-bankfind-suite-2aeb85a62d` | Public Services |
| NCUA Credit Union Locator | `ncua-credit-union-locator-ca3eb9ff7d` | Public Services |
| AnnualCreditReport.com | `annualcreditreport-com-c6e66abc58` | Public Programs |
| Financial Counseling Association of America | `financial-counseling-association-of-america-6330d59355` | Public Services |
| National Foundation for Credit Counseling | `national-foundation-for-credit-counseling-126a2e0f79` | Public Services |

New IDs: `cfpb-your-money-your-goals-toolkit`, `cfpb-credit-report-disputes`, and `cfpb-money-transfers`.

| Count | Before | After |
| --- | ---: | ---: |
| Personal Finance and Insurance | 0 | 11 |
| Public Services and Support | 120 | 113 |
| Public Programs and Services | 44 | 43 |
| Awesome Abundance aggregate | 886 | 885 |
| Whole catalog | 5,289 | 5,292 |
| Top-level collections | 34 | 35 |
| Resource topic paths | 452 | 457 |
| Atlas resources | 147 | 147 |

All 5,289 baseline IDs and their URLs/aliases remain present. Old section headings stay intact; ordinary contextual pointers replace migrated entries. Financial Relief and Legal counts are unchanged. Only synthetic example details appear in the checklist; evidence and contact records belong in a reader's private storage and the verified provider's required channel.
