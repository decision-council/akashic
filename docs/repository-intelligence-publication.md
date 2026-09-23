# Repository Intelligence publication

Akashic owns the composition and deployment of its GitHub Pages site. Relay is an immutable, read-only artifact builder and provenance verifier; it never receives Pages or OpenID Connect write authority and never deploys Akashic.

## Publication contract

`.github/workflows/pages.yml` is the sole deployment workflow. It keeps the existing portal build, captures a byte-level baseline of consumer-owned files and routes, composes Relay's generated `/intelligence/` subtree, verifies that the baseline survived unchanged, and uploads the final `dist/` tree as the Pages artifact.

Akashic has file/directory prefix siblings such as `i18n.js` with `i18n/` and `search-lab.js` with `search/`. After Relay captures the baseline, the consumer workflow canonically sorts only the baseline's file records by their public relative paths. This semantics-preserving compatibility step satisfies Relay v1.6's closed verifier ordering without changing captured bytes, digests, routes, or deployed content.

The workflow uses Relay revision `9a6315978766c336566b9fa7139b800fa8789ba5` (v1.6.0). Every external action is pinned to a full commit SHA.

Pull requests run with read-only repository and Pages access. They build and validate the complete composed site and retain `akashic-composed-site-<revision>-<attempt>` plus `akashic-composition-evidence-<revision>-<attempt>` for 30 days. The deploy and live-verification jobs are structurally excluded from pull requests, including untrusted forks.

Pushes to `main` and manual `current` rebuilds use Akashic's existing `actions/deploy-pages` job. That privileged job contains only the pinned official deployment action and holds only `pages: write` and `id-token: write`. A subsequent job with read-only contents and Actions permissions downloads the exact provenance handoff produced in the same workflow run, records the separate receipt against the Pages action's reported public URL when available, and reasserts both results. Relay therefore never executes with Pages or OpenID Connect write authority.

## Evidence boundary

The deterministic bundle contains `dist/intelligence/build-manifest.json`. It binds the represented Akashic revision, immutable Relay revision and version, input/schema contracts, source epoch, enabled routes, payload file inventory, and bundle digest. Building the same declared inputs twice must reproduce the exact manifest and bundle digest.

Deployment-specific state is deliberately outside `dist/`:

- `.relay/repository-intelligence-deployment/consumer-route-baseline.json` inventories unrelated consumer-owned files and routes before composition.
- `.relay/repository-intelligence-deployment/composition-verification.json` binds the build manifest to the final composed-site digest and proves preserved consumer routes.
- `.relay/repository-intelligence-deployment/deployment-receipt.json` binds that verification to the workflow run and attempt, Pages environment, canonical public URL, deployment conclusion, published route inventory, local aliases, and rollback point.
- `.akashic-local/repository-intelligence/live-verification.json` records the canonical route responses and the redirect-only GitHub Pages fallback aliases after deployment.

These retained files contain only public repository identifiers, immutable revisions, tagged digests, route paths, run identifiers, timestamps, and public URLs. Tokens, headers, environment dumps, private payloads, commit messages, contributor identities, and runner filesystem roots are not included.

## Required routes and live origins

The composed site must retain `/` and all generated Repository Intelligence routes:

- `/intelligence/`
- `/intelligence/compare/`
- `/intelligence/dashboard/`
- `/intelligence/decisions/`
- `/intelligence/dependencies/`
- `/intelligence/health/`
- `/intelligence/journey/`
- `/intelligence/now/`
- `/intelligence/releases/`
- `/intelligence/roadmap/`
- `/intelligence/search/`
- `/intelligence/work/`

The canonical origin is `https://akashic.egohygiene.io/`. `https://egohygiene.github.io/akashic/` is a redirect-only fallback alias: every required route must redirect to its exact canonical counterpart rather than serving an independent mutable copy.

## Manual verification and controlled failure

Run **Deploy akashic** with `mode=current` to rebuild the represented default-branch revision and exercise the normal deployment and receipt path.

Run **Retain Repository Intelligence failure evidence** to supply the intentionally invalid Relay input `max-depth=21`. This dispatch-only workflow has read-only contents permission, a concurrency lane separate from Pages, and no build, Pages, OpenID Connect, secret, or deployment path. The reusable job must fail with `RIW-002`, upload no site, and retain its sanitized 30-day failure report. This red run is expected evidence, not a publication regression.

After any successful deployment, download and inspect these 30-day artifacts from the same run:

1. `repository-intelligence-*` for Relay's read-only workflow evidence.
2. `akashic-composed-site-*` for the reviewable final tree.
3. `akashic-composition-evidence-*` for the consumer baseline and non-clobber verification.
4. `akashic-deployment-receipt-*` for the separate deployment receipt.
5. `akashic-live-verification-*` for canonical and fallback observations.

## Recovery and rollback

The fixed rollback point is:

- Akashic revision: `cfa0cb3a948cf57eac9503604c5d19fa42178b2b`
- Relay v1.3 revision: `55587de4ff322931d401e964f5af0716633dd675`
- last known-good Pages run: `35400101977`
- composed-site digest: `sha256:969a3f82abf532ed936c2600fc73045f4df1775185d441168f74724754bcba28`

Relay v1.3 embeds the checkout directory basename in the repository tree payload. Reproduce this point in a directory named `akashic`; the workflow rejects other names. The digest is SHA-256 of newline-terminated compact JSON file records (`bytes`, relative `path`, tagged `sha256`) ordered by Python `Path` components, including `.nojekyll`. This historical ordering differs from the current provenance contract's relative-path string ordering. The original configured digest failed the live rollback gate in run `35812301720`; it was not evidence of a successful rollback.

Pull requests build both `current` and this fixed rollback point in a read-only matrix. Both retain review artifacts; neither configures Pages, uploads a Pages artifact, or deploys. Rollback verification retains a public file inventory and an allowlisted report with expected/actual digests, conclusion, immutable revisions, and run identity for 30 days, including on digest mismatch. A mismatch still fails the build before any Pages upload or deployment. A successful PR proof does not replace the post-merge deployment rehearsal.

To recover, manually run **Deploy akashic** with `mode=rollback-v1.3`. This mode deliberately skips the current Relay review job, so a defect in the current generator cannot block recovery. The workflow checks out the fixed Akashic revision, rebuilds with the fixed Relay v1.3 pin, verifies the exact composed-site digest, retains `akashic-rollback-evidence-*`, and deploys through the same Akashic-owned Pages job. It does not move a branch, rewrite history, change DNS, or grant Relay deployment authority. After service is restored, diagnose the current path and publish a normal forward fix through a reviewed pull request.

## Lifecycle evidence

Implementation is tracked in [Akashic #185](https://github.com/egohygiene/akashic/issues/185) under [Relay #33](https://github.com/egohygiene/relay/issues/33). Pull-request, exact-head Actions, deployment, manual-rebuild, retained failure, live-route, and rollback-run links are recorded on #185 as they become available. Default-branch, manual, controlled-failure, and live deployment evidence necessarily follow merge because GitHub runs the checked-in workflow from the default branch.
