import assert from "node:assert/strict";
import test from "node:test";
import {
  parseArguments,
  REQUIRED_ROUTES,
  routeUrl,
  verifyPublicationOnce
} from "../scripts/verify-intelligence-publication.mjs";

const canonical = new URL("https://akashic.egohygiene.io/");
const fallback = new URL("https://egohygiene.github.io/akashic/");

test("publication verifier accepts every canonical route and redirect-only fallback alias", async () => {
  const requests = [];
  const fetchImplementation = async (url, options) => {
    requests.push({ options, url });
    if (url.startsWith(canonical.toString())) {
      return {
        headers: new Headers(),
        ok: true,
        status: 200,
        url
      };
    }
    const route = url.slice(fallback.toString().length);
    return {
      headers: new Headers({ location: new URL(route, canonical).toString() }),
      ok: false,
      status: 301,
      url
    };
  };

  const result = await verifyPublicationOnce({ fallbackOrigin: fallback, origin: canonical }, fetchImplementation);
  assert.equal(result.routes.length, REQUIRED_ROUTES.length);
  assert.equal(result.aliases.length, REQUIRED_ROUTES.length);
  assert.equal(requests.length, REQUIRED_ROUTES.length * 2);
  assert.deepEqual(new Set(requests.map(({ options }) => options.redirect)), new Set(["follow", "manual"]));
});

test("publication verifier rejects a fallback redirect that escapes the canonical route", async () => {
  const fetchImplementation = async (url) => {
    if (url.startsWith(canonical.toString())) {
      return { headers: new Headers(), ok: true, status: 200, url };
    }
    return {
      headers: new Headers({ location: "https://example.com/" }),
      ok: false,
      status: 301,
      url
    };
  };

  await assert.rejects(
    verifyPublicationOnce({ fallbackOrigin: fallback, origin: canonical }, fetchImplementation),
    /redirect-only alias/
  );
});

test("publication verifier parses bounded public-safe workflow evidence arguments", () => {
  const options = parseArguments([
    "--origin", canonical.toString(),
    "--fallback-origin", fallback.toString(),
    "--represented-revision", "1".repeat(40),
    "--workflow-run-id", "123",
    "--workflow-run-attempt", "2",
    "--attempts", "12",
    "--delay-seconds", "10",
    "--output", ".akashic-local/repository-intelligence/live-verification.json"
  ]);
  assert.equal(options.attempts, 12);
  assert.equal(options.delayMilliseconds, 10_000);
  assert.equal(options.workflowRunId, 123);
  assert.equal(routeUrl(options.fallbackOrigin, "/intelligence/now/"), "https://egohygiene.github.io/akashic/intelligence/now/");
});

test("publication verifier rejects credentials, mutable revisions, and unsafe output paths", () => {
  const base = [
    "--origin", canonical.toString(),
    "--fallback-origin", fallback.toString(),
    "--represented-revision", "1".repeat(40),
    "--workflow-run-id", "123",
    "--workflow-run-attempt", "1",
    "--attempts", "1",
    "--delay-seconds", "1",
    "--output", "evidence/report.json"
  ];
  const withValue = (name, value) => base.map((item, index) => base[index - 1] === name ? value : item);
  assert.throws(() => parseArguments(withValue("--origin", "https://token@example.com/")), /credential-free HTTPS/);
  assert.throws(() => parseArguments(withValue("--represented-revision", "main")), /full SHA/);
  assert.throws(() => parseArguments(withValue("--output", "../report.json")), /canonical repository-relative path/);
});
