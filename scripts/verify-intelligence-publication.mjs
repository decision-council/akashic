import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const REQUIRED_ROUTES = Object.freeze([
  "/",
  "/intelligence/",
  "/intelligence/compare/",
  "/intelligence/dashboard/",
  "/intelligence/decisions/",
  "/intelligence/dependencies/",
  "/intelligence/health/",
  "/intelligence/journey/",
  "/intelligence/now/",
  "/intelligence/releases/",
  "/intelligence/roadmap/",
  "/intelligence/search/",
  "/intelligence/work/"
]);

const REDIRECT_STATUSES = new Set([301, 302, 307, 308]);
const FULL_SHA = /^[0-9a-f]{40}$/;
const POSITIVE_INTEGER = /^[1-9][0-9]*$/;

function fail(message) {
  throw new Error(`Repository Intelligence publication verification failed: ${message}`);
}

export function normalizeOrigin(value, label) {
  let origin;
  try {
    origin = new URL(value);
  } catch {
    fail(`${label} must be an absolute URL`);
  }
  if (
    origin.protocol !== "https:"
    || origin.username
    || origin.password
    || origin.search
    || origin.hash
    || !origin.hostname
    || !origin.pathname.endsWith("/")
  ) {
    fail(`${label} must be a credential-free HTTPS directory URL`);
  }
  return origin;
}

export function routeUrl(origin, route) {
  const relative = route === "/" ? "" : route.slice(1);
  return new URL(relative, origin).toString();
}

function parsePositiveInteger(value, label, maximum) {
  if (!POSITIVE_INTEGER.test(value || "")) fail(`${label} must be a positive integer`);
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed > maximum) fail(`${label} exceeds ${maximum}`);
  return parsed;
}

export function parseArguments(arguments_) {
  const values = new Map();
  for (let index = 0; index < arguments_.length; index += 2) {
    const key = arguments_[index];
    const value = arguments_[index + 1];
    if (!key?.startsWith("--") || value === undefined || values.has(key)) {
      fail("arguments must be unique --name value pairs");
    }
    values.set(key, value);
  }
  const allowed = new Set([
    "--attempts",
    "--delay-seconds",
    "--fallback-origin",
    "--origin",
    "--output",
    "--represented-revision",
    "--workflow-run-attempt",
    "--workflow-run-id"
  ]);
  for (const key of values.keys()) {
    if (!allowed.has(key)) fail(`unsupported argument ${key}`);
  }
  for (const required of allowed) {
    if (!values.has(required)) fail(`missing ${required}`);
  }
  const representedRevision = values.get("--represented-revision");
  if (!FULL_SHA.test(representedRevision || "")) fail("represented revision must be a full SHA");
  const output = values.get("--output");
  if (
    !/^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/.test(output || "")
    || output.split("/").some((segment) => segment === "." || segment === "..")
  ) {
    fail("output must be a canonical repository-relative path");
  }
  return {
    attempts: parsePositiveInteger(values.get("--attempts"), "attempts", 30),
    delayMilliseconds: parsePositiveInteger(values.get("--delay-seconds"), "delay seconds", 60) * 1000,
    fallbackOrigin: normalizeOrigin(values.get("--fallback-origin"), "fallback origin"),
    origin: normalizeOrigin(values.get("--origin"), "canonical origin"),
    output,
    representedRevision,
    workflowRunAttempt: parsePositiveInteger(values.get("--workflow-run-attempt"), "workflow run attempt", Number.MAX_SAFE_INTEGER),
    workflowRunId: parsePositiveInteger(values.get("--workflow-run-id"), "workflow run ID", Number.MAX_SAFE_INTEGER)
  };
}

async function boundedFetch(url, options, fetchImplementation) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    return await fetchImplementation(url, {
      ...options,
      headers: { "user-agent": "egohygiene-akashic-publication-verifier/1" },
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function verifyPublicationOnce({ fallbackOrigin, origin }, fetchImplementation = fetch) {
  const routes = [];
  const aliases = [];
  for (const route of REQUIRED_ROUTES) {
    const expectedUrl = routeUrl(origin, route);
    const response = await boundedFetch(expectedUrl, { redirect: "follow" }, fetchImplementation);
    if (!response.ok || response.url !== expectedUrl) {
      fail(`canonical route ${route} returned ${response.status} at ${response.url}`);
    }
    routes.push({ route, status: response.status, url: response.url });

    const fallbackUrl = routeUrl(fallbackOrigin, route);
    const fallbackResponse = await boundedFetch(fallbackUrl, { redirect: "manual" }, fetchImplementation);
    const location = fallbackResponse.headers.get("location");
    if (!REDIRECT_STATUSES.has(fallbackResponse.status) || location !== expectedUrl) {
      fail(`fallback route ${route} is not a redirect-only alias to the canonical origin`);
    }
    aliases.push({
      location,
      route,
      status: fallbackResponse.status,
      url: fallbackUrl
    });
  }
  return { aliases, routes };
}

async function verifyWithRetries(options) {
  let lastError;
  for (let attempt = 1; attempt <= options.attempts; attempt += 1) {
    try {
      return { attempt, evidence: await verifyPublicationOnce(options) };
    } catch (error) {
      lastError = error;
      if (attempt < options.attempts) {
        await new Promise((resolve) => setTimeout(resolve, options.delayMilliseconds));
      }
    }
  }
  throw lastError;
}

export async function main(arguments_ = process.argv.slice(2)) {
  const options = parseArguments(arguments_);
  if (options.origin.hostname === options.fallbackOrigin.hostname) {
    fail("canonical and fallback origins must be distinct");
  }
  const { attempt, evidence } = await verifyWithRetries(options);
  const report = {
    schema: "egohygiene.akashic.repository-intelligence-live-verification/v1",
    schema_version: 1,
    repository: "egohygiene/akashic",
    represented_revision: options.representedRevision,
    workflow: {
      run_attempt: options.workflowRunAttempt,
      run_id: options.workflowRunId
    },
    observed_at: new Date().toISOString(),
    canonical_origin: options.origin.toString(),
    fallback_origin: options.fallbackOrigin.toString(),
    attempt,
    conclusion: "success",
    routes: evidence.routes,
    redirect_only_aliases: evidence.aliases
  };
  await mkdir(path.dirname(options.output), { recursive: true });
  await writeFile(options.output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(`Verified ${evidence.routes.length} canonical routes and redirect-only aliases.`);
  return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
