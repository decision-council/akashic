# Digital access and everyday account safety curation

Issue: [#146](https://github.com/egohygiene/akashic/issues/146), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Scope and ownership decision

Recorded before implementation on September 18, 2026. Security owns the everyday account-safety entry point and links to a focused digital-access guide. The first edition is U.S.-focused for assistance and consumer escalation; provider documentation and general security practices have broader applicability. Public guidance does not promise individual eligibility, free equipment, or successful account recovery.

| Existing home | Decision |
| --- | --- |
| Security | Keep account defense and privacy here; add authoritative recovery, backup, and privacy references plus a short portal guide linking the full workflow. Preserve the existing safety note. |
| Abundance: Community Sharing and Material Resources | Keep the connectivity/device discovery routes. Refresh EveryoneOn and Human-I-T in place, retaining their IDs; move Human-I-T's unavailable programs URL to its current Get Connected page with a former-URL alias. Distinguish free discovery/training from paid devices and internet. |
| Abundance: Libraries and Local Access | Keep library discovery, equipment lending, and DigitalLearn. Refresh the two guide entry points with their existing IDs and current constraints; add a return link to the guide. No local provider is added outside Atlas. |
| Abundance: free software and education | Link existing password/authenticator tools and learning collections; no second software or course directory. |
| Financial Relief | Lifeline remains canonical here. The guide links the existing communications section rather than duplicating the benefit. |
| Personal Finance / Public Services / Abundance public programs | Preserve #136's consumer complaints, fraud reporting, and IdentityTheft.gov routes. |
| Abundance disability guide | Reuse #144 for accessibility requests, assistive technology, and human help. Official identity-document coverage in #149 remains planned. |
| Subscription Alternatives / developer collections | Add one navigator link; keep cancellation, replacements, hosting, and development tools in their existing homes. |

Only public help pages are inspected. No credentials, recovery forms, personal account evidence, support conversations, remote-access sessions, or submissions are collected. Public examples are blank planning aids. The guide separates technical recovery from appeals of an actual benefits or service decision and from authorized digital-legacy requests.

## Source observations

Checked September 18, 2026. Agent source observations are not human truth review; `reviewed` remains unset. Public pages were read without entering ZIP codes, household facts, credentials, or recovery evidence.

| Source | Observation and limit |
| --- | --- |
| [EveryoneOn offer finder](https://www.everyoneon.org/find-offers) | Free discovery by ZIP code and household eligibility. Do not repeat the locator's displayed income threshold as a universal provider rule or promise free service. No personalized offer search was submitted. |
| Human-I-T [Get Connected](https://www.human-i-t.org/get-connected/), [training](https://www.human-i-t.org/digital-training/), and [support](https://www.human-i-t.org/tech-support-overview/) | The old `/programs/` page could not be retrieved. The official home links Get Connected. Training is free, English/Spanish, and has an interest/signup route. Support has recipient/purchaser/partner conditions and a stated duration; device and connectivity offers may cost money. Old ACP testimonials are not evidence of a currently available benefit. No local Detroit location is added to the main catalog. |
| [USAGov libraries](https://www.usa.gov/libraries-and-archives) | Public-library discovery and computer/help services. Specific booking, printing, card, lending, language, and accessibility arrangements must be checked with the library. |
| [DigitalLearn](https://www.digitallearn.org/) | Text retrieval omitted the application; the rendered browser confirmed optional login, computer/email/account/privacy/video-call lessons, platform-specific course titles, and the content's CC BY-NC-SA 4.0 footer. No login or course-completion claim. |
| [Lifeline](https://www.lifelinesupport.org/) | Official U.S. benefit route; qualification, participating provider, and continuing eligibility are separate. Retain the existing Financial Relief entry and its metadata; no new discount amount or eligibility formula is reproduced. |
| [CISA Secure Our World](https://www.cisa.gov/secure-our-world) | Text retrieval returned 403; successful search identified the page and the rendered browser confirmed its four public safety topics and accessible-resource links. Metadata reflects the successful browser observation, not the failed text request. |
| FTC [account recovery](https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account), [phishing](https://consumer.ftc.gov/articles/how-recognize-avoid-phishing-scams), and [privacy](https://consumer.ftc.gov/articles/how-websites-and-apps-collect-and-use-your-information) | Recovery and privacy become distinct Security entries. Phishing is a supporting guide citation. Official provider recovery, post-recovery checks, independent contact verification, and limitations of private browsing support the workflow; older article publication dates are not new policy dates. |
| [NCSC backups](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/always-back-up-your-most-important-data) | UK authority's general backup education: separate copies, removable/cloud storage, security, and restoration. Its displayed review date is 2021; do not repeat old storage quotas or assume its downstream device instructions match a current OS. Follow current provider documentation. |
| [Google recovery](https://support.google.com/accounts/answer/7682439), [Microsoft recovery](https://support.microsoft.com/en-us/accounts-billing/manage/help-with-the-microsoft-account-recovery-form), and [Apple recovery](https://support.apple.com/en-us/118574) | Supporting provider examples, not additional catalog cards or tested recovery transactions. Preserve managed-account exceptions, Microsoft's two-step-verification limitation, Google's warning about third-party recovery, and Apple's wait/device-use rules. Microsoft redirected an older GUID URL to the linked route. |

## Metadata, exclusions, and compatibility

All three new entries and five materially refreshed entries have explicit stable IDs, access, authority, geography, platform, account, sensitivity, and freshness fields. Free access describes reading, discovery, or a specified free service; it does not guarantee downstream equipment or subscriptions. Licenses stay `unknown` except DigitalLearn's observed open-content terms. Monthly review applies to changing offers/programs; general guidance uses quarterly review. Recheck after provider URL, access, eligibility, or recovery-policy changes; this release adds no automated refresh.

Preserved IDs: `cisa-secure-our-world-c5b763ef75`, `digitallearn-9fa9e992f7`, `everyoneon-3e1ace9376`, `human-i-t-programs-c414e93c00`, and `usa-gov-libraries-and-archives-864189354e`. Human-I-T keeps its old URL as an alias. All existing headings remain; one non-resource guide heading is added. No resource moves between collections.

New IDs: `ftc-hacked-account-recovery`, `ftc-online-tracking-privacy`, and `ncsc-backing-up-your-data`. No competing password-manager roundup, paid recovery recommendation, retired ACP offer, local-provider record, login collection, recovery submission, or account-management application is introduced. GCFGlobal currently redirects to LearnFree; that broader learning entry is not relied on or changed by this edition. #149 remains explicitly planned, and #122/#123 retain their separate scopes.

## Counts and validation

| Parsed count | Before | After |
| --- | ---: | ---: |
| Security | 143 | 146 |
| Whole catalog | 5,355 | 5,358 |
| Top-level collections | 36 | 36 |
| Resource topic paths | 479 | 479 |
| Atlas resources | 147 | 147 |

Abundance child counts and aggregate are unchanged. The root Security count follows the validator's parsed total.

The first content build exceeded the unchanged gzip bootstrap budget by 802 bytes. Catalog serialization now places each resource's variable description after repeated catalog fields to improve compression while preserving every decoded value and all array order. Existing round-trip and favorite-migration tests protect that contract; search and generated-site checks cover consumers. There is no catalog schema, client, dependency, or budget change. Final exact-tree checks and browser limitations are recorded in the draft PR.
