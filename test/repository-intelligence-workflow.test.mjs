import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import test from "node:test";

const workflow = await readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8");
const failureWorkflow = await readFile(new URL("../.github/workflows/repository-intelligence-failure-evidence.yml", import.meta.url), "utf8");
const relayRevision = "9a6315978766c336566b9fa7139b800fa8789ba5";
const rollbackRelayRevision = "55587de4ff322931d401e964f5af0716633dd675";
const rollbackRevision = "cfa0cb3a948cf57eac9503604c5d19fa42178b2b";
const rollbackDigest = "sha256:969a3f82abf532ed936c2600fc73045f4df1775185d441168f74724754bcba28";

test("Pages workflow pins every external action and keeps one consumer-owned deployer", () => {
  const uses = [...`${workflow}\n${failureWorkflow}`.matchAll(/^\s*uses:\s*([^\s]+)\s*$/gm)].map((match) => match[1]);
  assert.ok(uses.length > 0);
  for (const reference of uses) {
    assert.match(reference, /@[0-9a-f]{40}$/);
  }
  assert.equal(uses.filter((reference) => reference.startsWith("actions/deploy-pages@")).length, 1);
  assert.ok(uses.includes(`egohygiene/relay/.github/workflows/repository-intelligence.yml@${relayRevision}`));
  assert.ok(uses.includes(`egohygiene/relay/actions/repository-intelligence@${relayRevision}`));
  assert.ok(uses.includes(`egohygiene/relay/actions/repository-intelligence@${rollbackRelayRevision}`));
});

test("pull requests retain a complete review artifact without entering the deployment path", () => {
  assert.match(workflow, /Retain composed-site review artifact/);
  assert.match(workflow, /name: "akashic-composed-site-/);
  assert.match(workflow, /Retain composition and non-clobber evidence/);
  assert.match(workflow, /name: "akashic-composition-evidence-/);
  assert.match(workflow, /deploy:\n\s+name: Deploy through Akashic GitHub Pages\n\s+if: github\.event_name != 'pull_request'/);
  assert.match(workflow, /verify-live:\n\s+name: Verify canonical and fallback publication routes\n\s+if: github\.event_name != 'pull_request'/);
  assert.match(workflow, /permissions:\n\s+contents: read\n\nconcurrency:/);
});

test("current publication binds deterministic build, non-clobber proof, receipt, and live routes", () => {
  for (const operation of ["capture-baseline", "verify-composition", "record-receipt"]) {
    assert.match(workflow, new RegExp(`operation: ${operation}`));
  }
  assert.match(workflow, /Canonicalize consumer baseline inventory/);
  assert.match(workflow, /sorted\(files, key=lambda item: item\.get\("path", ""\)\)/);
  assert.match(workflow, /Prove deterministic bundle reproduction/);
  assert.match(workflow, /cmp "\$\{RUNNER_TEMP\}\/build-manifest-one\.json"/);
  assert.match(workflow, /deployment-environment: github-pages/);
  assert.match(workflow, /needs\.deploy\.outputs\.deployment-url \|\| 'https:\/\/akashic\.egohygiene\.io\/'/);
  assert.match(workflow, /verify-intelligence-publication\.mjs/);
  assert.match(workflow, /FALLBACK_ORIGIN: "https:\/\/egohygiene\.github\.io\/akashic\/"/);
  assert.match(workflow, /\.relay\/repository-intelligence-deployment\/deployment-receipt\.json/);
});

test("Relay receipt verification never inherits Pages or OIDC write authority", () => {
  const deployStart = workflow.indexOf("\n  deploy:");
  const finalizeStart = workflow.indexOf("\n  finalize-deployment:");
  const liveStart = workflow.indexOf("\n  verify-live:");
  assert.ok(deployStart > 0 && finalizeStart > deployStart && liveStart > finalizeStart);
  const deployJob = workflow.slice(deployStart, finalizeStart);
  const finalizeJob = workflow.slice(finalizeStart, liveStart);
  assert.match(deployJob, /pages: write/);
  assert.match(deployJob, /id-token: write/);
  assert.equal((deployJob.match(/^\s*uses:/gm) || []).length, 1);
  assert.match(deployJob, /uses: actions\/deploy-pages@[0-9a-f]{40}/);
  assert.match(deployJob, /deployment-url: "\$\{\{ steps\.deployment\.outputs\.page_url \}\}"/);
  assert.doesNotMatch(deployJob, /egohygiene\/relay|download-artifact|contents: read|actions: read/);
  assert.match(finalizeJob, /actions: read/);
  assert.match(finalizeJob, /contents: read/);
  assert.doesNotMatch(finalizeJob, /pages: write|id-token: write|deploy-pages/);
  assert.match(finalizeJob, /operation: record-receipt/);
  assert.match(finalizeJob, /needs\.deploy\.outputs\.deployment-url/);
});

test("controlled failure evidence is isolated from every deployment lane", () => {
  assert.doesNotMatch(workflow, /failure-evidence/);
  assert.match(failureWorkflow, /on:\n\s+workflow_dispatch:/);
  assert.match(failureWorkflow, /permissions:\n\s+contents: read/);
  assert.match(failureWorkflow, new RegExp(`repository-intelligence\\.yml@${relayRevision}`));
  assert.match(failureWorkflow, /max-depth: "21"/);
  assert.doesNotMatch(failureWorkflow, /deploy-pages|pages: write|id-token: write|pull_request|push:/);
  assert.match(failureWorkflow, /cancel-in-progress: false/);
});

test("rollback remains an explicit bounded manual mode", () => {
  assert.match(workflow, /- rollback-v1\.3/);
  assert.match(workflow, new RegExp(`ROLLBACK_RELAY_REVISION: "${rollbackRelayRevision}"`));
  assert.match(workflow, new RegExp(`ROLLBACK_REVISION: "${rollbackRevision}"`));
  assert.ok(workflow.includes(`ROLLBACK_SITE_DIGEST: "${rollbackDigest}"`));
  assert.match(workflow, /last_known_good_run":? 35400101977/);
  assert.match(workflow, /inputs\.mode != 'rollback-v1\.3'/);
  assert.match(workflow, /needs\.intelligence-review\.result == 'skipped'/);
});


test("PRs prove rollback in the read-only build matrix and retain mismatch diagnostics", () => {
  const build = workflow.slice(workflow.indexOf("\n  build:"), workflow.indexOf("\n  deploy:"));
  assert.match(build, /github.event_name == 'pull_request' && fromJSON\('\["current","rollback-v1\.3"\]'\)/);
  assert.match(build, /fail-fast: false/);
  assert.match(build, /REQUESTED_MODE: "\$\{\{ matrix.mode \}\}"/);
  assert.match(build, /\[\[ "\$\{PWD##\*\/\}" == "akashic" \]\]/);
  assert.doesNotMatch(build, /pages: write|id-token: write|secrets[.:]|pull_request_target/);
  for (const label of ["Configure GitHub Pages", "Upload GitHub Pages artifact"]) {
    assert.ok(build.includes(`- name: ${label}\n        if: github.event_name != 'pull_request'`));
  }
  assert.match(build, /always\(\) && \(steps.rollback_digest.outcome == 'success' \|\| steps.rollback_digest.outcome == 'failure'\)/);
});

test("rollback digest gate retains public diagnostics, rejects changed bytes and symlinks", async () => {
  const step = workflow.split("      - name: Verify fixed rollback site digest\n")[1].split("\n      - name:")[0];
  const script = step.split("        run: |\n")[1].split("\n").map((line) => line.replace(/^ {10}/, "")).join("\n");
  const root = await mkdtemp(path.join(tmpdir(), "akashic-rollback-test-"));
  const sha = (bytes) => `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
  try {
    await mkdir(path.join(root, "dist", "i18n"), { recursive: true });
    const files = [[".nojekyll", ""], ["i18n/en.json", "{}\n"], ["i18n.js", "// fixture\n"]];
    for (const [name, bytes] of files) await writeFile(path.join(root, "dist", name), bytes);
    // Path component order intentionally puts i18n/en.json before i18n.js.
    const inventory = files.map(([name, bytes]) => ({ bytes: Buffer.byteLength(bytes), path: name, sha256: sha(bytes) }));
    const digest = sha(`${JSON.stringify(inventory)}\n`);
    const env = { ...process.env, RUNNER_TEMP: root, ROLLBACK_SITE_DIGEST: digest,
      GITHUB_RUN_ID: "123", GITHUB_RUN_ATTEMPT: "2", PRIVATE_SENTINEL: "do-not-retain-this-value" };
    const execute = () => spawnSync("bash", ["-c", script], { cwd: root, env, encoding: "utf8" });
    const success = execute();
    assert.equal(success.status, 0, success.stderr);
    const reportPath = path.join(root, "akashic-rollback-evidence", "rollback.json");
    const successReport = JSON.parse(await readFile(reportPath, "utf8"));
    assert.equal(successReport.conclusion, "success");
    assert.equal(successReport.site_digest, digest);
    assert.deepEqual(successReport.recovery_run, { id: 123, attempt: 2 });
    assert.equal(await readFile(path.join(root, "akashic-rollback-evidence", "site-inventory.json"), "utf8"), `${JSON.stringify(inventory)}\n`);
    await writeFile(path.join(root, "dist", "i18n.js"), "changed\n");
    const failure = execute();
    assert.notEqual(failure.status, 0);
    const failureText = await readFile(reportPath, "utf8");
    const failureReport = JSON.parse(failureText);
    assert.equal(failureReport.conclusion, "failure");
    assert.equal(failureReport.expected_site_digest, digest);
    assert.notEqual(failureReport.site_digest, digest);
    assert.doesNotMatch(failureText + failure.stdout + failure.stderr, /do-not-retain-this-value|PRIVATE_SENTINEL/);
    assert.ok(!failureText.includes(root));
    await symlink("i18n.js", path.join(root, "dist", "linked.js"));
    const unsafe = execute();
    assert.notEqual(unsafe.status, 0);
    assert.match(unsafe.stderr, /symbolic link/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
