import assert from "node:assert/strict";
import test from "node:test";
import { collectionIdentity, parseRootCategories, serializeCatalog } from "../scripts/lib/catalog.mjs";
import { parseResourceEntry } from "../scripts/lib/resource-parser.mjs";

test("parses a root collection only when its visual identity is declared", () => {
  const markdown = "- [Business](lists/business/README.md) - Practical guidance. **1,234 resources.**";
  const identities = { business: { color: "#123abc", glyph: "◫" } };
  assert.deepEqual(parseRootCategories(markdown, identities), [{
    title: "Business",
    path: "lists/business/README.md",
    slug: "business",
    description: "Practical guidance.",
    declaredCount: 1234,
    color: "#123abc",
    glyph: "◫",
  }]);
  assert.throws(() => parseRootCategories(markdown, {}), /no declared identity/);
  assert.throws(() => collectionIdentity("business", { business: { color: "blue", glyph: "◫" } }), /invalid color/);
});

test("extracts structured access labels from the creative-tools convention", () => {
  const line = "- [AudioMass](https://audiomass.co/) - **Open · Browser.** Edits audio without installation.";
  assert.deepEqual(parseResourceEntry(line, { extractLeadingLabels: true }), {
    title: "AudioMass",
    url: "https://audiomass.co/",
    description: "Edits audio without installation.",
    accessLabels: ["Open", "Browser"],
    id: "audiomass-8691aee028",
    idOrigin: "derived",
    aliases: [],
    metadata: {},
  });
  assert.equal(parseResourceEntry(line).description, "**Open · Browser.** Edits audio without installation.");
  assert.equal(parseResourceEntry("not a resource"), null);
});

test("catalog serialization preserves resource data while omitting only empty display labels", () => {
  const plain = parseResourceEntry("- [Plain](https://example.org/) - Public guide.");
  const labeled = parseResourceEntry("- [Labeled](https://example.org/tool) - **Open · Browser.** A tool.", { extractLeadingLabels: true });
  const catalog = { schemaVersion: 2, resourceCount: 2, categories: [], resources: [plain, labeled] };
  const original = structuredClone(catalog);
  const serialized = serializeCatalog(catalog);
  const decoded = JSON.parse(serialized);
  assert.deepEqual(catalog, original);
  assert.equal(Object.hasOwn(decoded.resources[0], "accessLabels"), false);
  assert.deepEqual(decoded.resources[0].aliases, []);
  assert.deepEqual(decoded.resources[0].metadata, {});
  assert.deepEqual(decoded.resources[1].accessLabels, ["Open", "Browser"]);
  assert.deepEqual({ ...decoded, resources: decoded.resources.map((resource) => ({ ...resource, accessLabels: resource.accessLabels || [] })) }, original);
  assert.equal(serialized, serializeCatalog(catalog));
  assert.equal(Buffer.byteLength(`${JSON.stringify(catalog)}\n`) - Buffer.byteLength(serialized), 18);
  for (const accessLabels of [null, undefined, "Open", {}]) {
    assert.throws(() => serializeCatalog({ resources: [{ ...plain, accessLabels }] }), /Invalid access labels/);
  }
});
