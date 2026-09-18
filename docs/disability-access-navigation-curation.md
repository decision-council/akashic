# Disability Access and Independent-Living Navigation Curation

This records the bounded U.S. first edition for [#144](https://github.com/egohygiene/akashic/issues/144), under [#40](https://github.com/egohygiene/akashic/issues/40).

## Canonical home and overlap decision

Recorded before list edits: keep the existing collections. The inventory already supplies disability-service discovery, assistive technology, communication tools, legal advocacy, employment support, housing adaptations, and paratransit. A new collection would mostly duplicate or relocate these entry points. Add the practical navigation guide to the Awesome Abundance hub, alongside its access vocabulary, and link it from its Health/Well-Being/Accessibility child. The hub is the existing top-level portal guide surface; the child remains independently useful and retains all resources and headings. Use one contiguous `site-guide` block, without changing the renderer or creating a second authored guide.

| Coverage | Canonical home and action |
| --- | --- |
| Orientation and request / document / follow up / escalate | Awesome Abundance hub: a U.S. access path connected to existing child lists and specialist collections. |
| Independent living, device access, and communication services | Abundance's Health/Well-Being/Accessibility child: retain DIAL, AT3, JAN, ADA National Network, relay, equipment, and software entry points. Consider one direct CIL directory as an alternative to location search. |
| Rights, effective communication, complaints, and human advocacy | Legal: retain ADA complaint routing, ADA Information Line, NDRN, housing/work/education rights; add a targeted primary communication reference if distinct. |
| Transportation and paratransit | Travel and Mobility: reuse FTA rules and existing accessible-travel guidance; add a return path for daily access. |
| Housing and work | Preserve #135 adaptations and #140 career/accommodation ownership; use canonical links. Education-rights orientation stays in Legal; broader education remains #145. |
| Community supports and chosen assistance | Reuse DIAL/CIL discovery, with aging and caregiver support in Family. Do not equate disability with needing a caregiver. |
| Cash benefits and urgent gateways | Financial Relief owns SSI/SSDI and benefit applications. Public Services retains urgent/broad referrals and gains a routine-access link. |
| Local providers | Atlas retains California independent-living services, Massachusetts MassOptions, and Wilmington transit. No new local listings or inferred applicability. |

Searches covered titles, organizations, URL variants, disability/access headings, and Atlas records. Existing resources and generated IDs will be preserved. Newly discovered canonical URL changes must retain the old address as an alias.

## Access vocabulary and sensitive boundaries

Free information, free referral, eligibility-based equipment, a device loan, a financial loan, and a paid ongoing service are different. Directories do not guarantee capacity, certification, service delivery, or eligibility. Ask each provider about cost, geography, language, accessible formats, alternative contact methods, documentation, privacy, and response times. Record only verified contact channels, not presumed accessibility or confidentiality.

The reader chooses goals, communication, and whom to involve. Independent living includes directing one's own support; it does not require doing everything alone. No medical diagnosis, universal entitlement, inferred legal coverage, automatic caregiver authority, new software directory, or personally identifying case examples. Complaints and ordinary follow-up do not suspend separate deadlines.

## Minimum edition and baseline

Provide CIL and community-support discovery; device demonstration/loan/reuse questions; accessible communication; local transport/paratransit questions; housing/work/education/public-service links; the four-step checklist; and qualified human-help routes. Keep benefit eligibility separate. Add only verified missing resources and correct material stale facts in the routes used.

Baseline: merged #163, main `2adcba9b920b1ffc85c8417aee90fbb875846a72`; 5,348 resources, 36 collections, 478 topic paths, 147 Atlas resources. Preserve raw/gzip/Brotli bootstrap limits of 3,900,000 / 675,000 / 525,000 bytes. Record sources, exclusions, parsed counts, validation, and browser limitations before handoff.

## Source observations and identity preservation

Public primary pages opened September 18, 2026. These are automated content/link observations, not human truth review, provider inspection, or confirmation of every directory record. No services were contacted and no personal records, applications, or forms were submitted.

| Resource and canonical home | Evidence and limits |
| --- | --- |
| Abundance child — [Disability Information and Access Locator](https://dial.acl.gov/home) | ACL now presents DIAL as a location-search directory. Correct the old call/text/email description and title. Preserve `disability-information-and-access-line-c563b21307`; canonical URL becomes `/home`, retaining `https://dial.acl.gov/` as an alias. The current page does not verify the former hotline, so do not infer its availability or a closure date. |
| Abundance child — [AT3 Center](https://at3center.net/state-at-programs/) | State/territory listings expose phone/email contacts and separate demonstration, device-loan, reuse, and financing roles. Retain `at3-center-a4320d8e14`; describe free directory access, with service/device costs and eligibility confirmed locally. The [about page](https://at3center.net/about-at3-center/) identifies ACL funding without making the content government policy. |
| Abundance child — [Job Accommodation Network](https://askjan.org/) | Retain `job-accommodation-network-a7bb8dfa56`. Its [contact page](https://askjan.org/contact-us.cfm) publishes phone/email/web routes, confidentiality/storage information, and an option to limit identifying information. The web form still requires an email and message; do not promise anonymous web submission or zero data retention. Employer chat is labeled for employers, so do not advertise it as a universal channel. |
| Abundance child — [ADA National Network](https://adata.org/) | Retain `ada-national-network-6da717fc33`. The [contact page](https://adata.org/contact/) verifies voice/relay 800-949-4232 and a regional question form requiring email and state/territory. No blanket claim of confidentiality, language coverage, representation, or free training. |
| Abundance child — [ILRU Directory of Centers for Independent Living](https://www.ilru.org/cil-directory) | New `ilru-centers-for-independent-living`. A direct state/territory list provides an alternative to DIAL's location search. ILRU identifies itself as a TIRR Memorial Hermann program. A sampled [Massachusetts listing](https://www.ilru.org/cil-directory/ma) exposes service areas and multiple contact types but also a malformed website field; readers must confirm current contacts. No local entries are copied into the catalog or treated as verified provider recommendations. |
| Legal — [ADA Effective Communication](https://www.ada.gov/resources/effective-communication/) | New `ada-effective-communication`. DOJ guidance distinguishes communication formats, aids, interpreter contexts, and Title II/III duties and exceptions. It offers alternate formats and phone/TTY help. The guide prepares questions without extending this legal framework to every work, housing, education, or transport situation. |

Supporting observations: [ACL's CIL overview](https://acl.gov/programs/aging-and-disability-networks/centers-independent-living) supports the disability-led, nonresidential and self-direction framing, core services, and possible community supports. [FTA Part 37](https://www.transit.dot.gov/regulations-and-guidance/civil-rights-ada/part-37-transportation-services-individuals-disabilities) supports separate paratransit certification, accessible application, trip/service questions, and appeal orientation; retain its existing Travel entry rather than duplicating it or copying legal thresholds. [NDRN](https://www.ndrn.org/about/ndrn-member-agencies/), [ADA Information Line](https://www.ada.gov/infoline/), and [ADA complaint routing](https://www.ada.gov/file-a-complaint/) were opened to verify distinct human-help and escalation routes. Existing Housing, Work, Family, Financial Relief, and education-rights entries supply the cross-domain paths; this release does not re-review all their underlying programs.

## Metadata, exclusions, and boundaries

Both additions and all four materially updated entries have explicit stable IDs and applicable controlled metadata. `linkStatus: "ok"` and `linkChecked: "2026-09-18"` record successful reads of the final URLs; no human `reviewed` date is invented. DIAL's alias preserves the observed redirect and former identity. `access: ["free"]` / `account: "none"` describe public reading and discovery, not every downstream service or inquiry form. Keep `license: "unknown"`; free reading is not an open license. English metadata describes the verified pages, not a guarantee about all provider languages. Quarterly review and medium volatility apply to these guidance/directory routes.

`authority: "official"` on AT3, JAN, and the ADA National Network means their first-party program guidance or directory; it does not make a funded center a government agency or its explanations controlling law. ILRU is labeled nonprofit; ACL and DOJ are government sources. Legal/privacy sensitivity is explicit where applicable, with medical sensitivity for JAN inquiry information.

- The existing FCC relay page could not be opened by the research tool, although an official search result was available. Leave that legacy entry unchanged and do not assign a fresh successful-link observation. DOJ's successfully opened communication guide independently supports the general relay-versus-meeting-interpreter distinction. Do not copy detailed 711 or Spanish-service claims from search snippets.
- Do not duplicate DIAL as a new service, add another accessibility software list, or move existing resources between collections. Only DIAL's canonical address changes; all headings and useful old paths remain.
- Use ILRU for its direct state/territory navigation and listed contact alternatives, not as a second broad benefit navigator. Do not add NCIL or a separate ACL directory with the same task.
- Do not promise CIL service availability, entitlement to a particular accommodation, benefit eligibility, paratransit approval, zero cost, confidentiality across providers, or a single nationwide deadline. No legal-form templates, medical assessments, provider applications, or real-person examples.
- Keep #145 education, #146 digital access, and the existing benefits follow-ups open. No Atlas, schema, JavaScript, search ranking, research checkpoint, or performance-budget edits.

## Parsed counts and verification

Parsed total: **5,350 resources**. Abundance's accessibility child **61 → 62**, Abundance aggregate **885 → 886**, Legal **348 → 349**. Collections **36**, resource topic paths **478**, Atlas resources **147**, and all other resource counts remain unchanged. The guide is authored once in the hub and rendered by the existing shared mechanism in English and Russian; canonical English remains marked as such on the Russian route.

Final checks and exact-commit CI/browser evidence will be recorded in the draft PR. Required coverage includes all existing IDs/aliases/topics, relative links/anchors, generated-guide parity, deterministic generation, affected-list pinned lint, all dependency-free tests, build/site validation, whitespace, and both sequential search profiles. The cloud browser rejected the local branch URL with `ERR_BLOCKED_BY_CLIENT`; generated output and Node measurements do not establish live portal, mobile, keyboard, or assistive-technology coverage.

Local verification preserves all **5,348 existing resource IDs**, former URLs and aliases, ownership, topics, and affected-list headings; only the four documented entries change their descriptions/metadata. All new links resolve. Of **282 relative Markdown links/anchors** inspected, one unrelated, unchanged Travel link to Scientific Research's old `#geospatial-data-and-mapping` heading remains a baseline exception. Do not turn this focused release into unrelated navigation cleanup.

The **12,514-byte** generated Abundance guide matches exactly in English and Russian, including both tables and all four checklist steps. All **42 generated files** reproduce identically. The hub index is explicitly excluded from Awesome Lint by both existing CI workflows. An additional wrapper run on that hub finds only its **20 pre-existing index/related-link structural mismatches**, compared with 39 baseline diagnostics before padding the guide's reused access-key table; no new table or guide diagnostics remain. All **four affected resource lists** pass the unmodified pinned wrapper. No lint rules or workflow exclusions are added.

All **163 tests**, collection validation, build/site checks, and whitespace checks pass. Standard and JIT-disabled timing profiles pass. Catalog bootstrap measures **3,883,323 raw / 673,318 gzip / 522,515 Brotli bytes**, within unchanged limits, leaving **16,677 / 1,682 / 2,485 bytes** respectively. The next content release needs an early measurement; do not increase budgets to accommodate it. Exact-tree reruns, publication, rendered-Markdown observations, and live CI links belong in the PR handoff.
