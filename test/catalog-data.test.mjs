import assert from "node:assert/strict";
import test from "node:test";
import { serializeCatalog, serializeCompactCatalog } from "../scripts/lib/catalog.mjs";
import { parseResourceEntry } from "../scripts/lib/resource-parser.mjs";
import { CATALOG_RESOURCE_FIELDS, decodeCatalog } from "../site/catalog-data.js";
import { migrateFavoriteTokens } from "../site/favorites.js";

function fixture() {
  const entries = [
    parseResourceEntry("- [Plain](https://example.org/) - Public guide."),
    parseResourceEntry("- [Labeled](https://example.org/tool) - **Open · Browser.** A tool.", { extractLeadingLabels: true }),
    parseResourceEntry('- [Moved](https://example.org/new) - Moved guide. <!-- akashic-meta: {"id":"moved-guide","aliases":["http://example.org/old"],"language":["en"],"reviewed":"2026-01-02"} -->'),
  ];
  const resources = entries.map((entry, index) => ({
    ...entry,
    domain: "example.org",
    category: "Example collection",
    categorySlug: "example-collection",
    section: "Example topic",
    groupSlug: "",
    groupTitle: "Example collection",
    source: "lists/example-collection/README.md",
    sourceLine: index + 10,
  }));
  return { schemaVersion: 2, resourceCount: resources.length, categories: [{ title: "Example collection", slug: "example-collection", count: resources.length }], resources };
}

test("compact catalog restores exact legacy values, property order, missing arrays, and favorites", () => {
  const source = fixture();
  const original = structuredClone(source);
  const legacyText = serializeCatalog(source);
  const compactText = serializeCompactCatalog(source);
  const compact = JSON.parse(compactText);
  const decoded = decodeCatalog(compact);
  assert.equal(`${JSON.stringify(decoded)}\n`, legacyText);
  assert.deepEqual(decoded, JSON.parse(legacyText));
  assert.deepEqual(source, original);
  assert.equal(compactText, serializeCompactCatalog(source));
  assert.deepEqual(Object.keys(compact.resourceColumns), CATALOG_RESOURCE_FIELDS);
  assert.deepEqual(compact.resourceColumns.accessLabels, [null, ["Open", "Browser"], null]);
  assert.deepEqual(compact.resourceColumns.aliases, [null, null, ["http://example.org/old"]]);
  assert.equal(Object.hasOwn(decoded.resources[0], "accessLabels"), false);
  assert.equal(Object.hasOwn(decoded.resources[0], "aliases"), false);
  assert.deepEqual([...migrateFavoriteTokens(decoded.resources, [source.resources[0].url, source.resources[1].id, "http://example.org/old"])], source.resources.map((resource) => resource.id));
  const legacy = JSON.parse(legacyText);
  assert.equal(decodeCatalog(legacy), legacy);
});

test("compact catalog preserves nested metadata values and prototype-like names as data", () => {
  const source = fixture();
  source.resources[0].title = "__proto__";
  source.resources[0].id = "constructor";
  source.resources[0].metadata = JSON.parse('{"__proto__":{"polluted":true},"constructor":"prototype","nested":{"unknown":null,"values":["",null,0,false]}}');
  const decoded = decodeCatalog(JSON.parse(serializeCompactCatalog(source)));
  assert.equal(`${JSON.stringify(decoded)}\n`, serializeCatalog(source));
  assert.equal(Object.getPrototypeOf(decoded.resources[0]), Object.prototype);
  assert.equal(Object.getPrototypeOf(decoded.resources[0].metadata), Object.prototype);
  assert.equal({}.polluted, undefined);
});

test("compact catalog handles an empty catalog without inventing rows", () => {
  const source = { schemaVersion: 2, resourceCount: 0, categories: [], resources: [] };
  const decoded = decodeCatalog(JSON.parse(serializeCompactCatalog(source)));
  assert.deepEqual(decoded, source);
});

test("compact catalog rejects invalid versions, headers, columns, and required values", () => {
  const valid = JSON.parse(serializeCompactCatalog(fixture()));
  for (const value of [null, {}, { schemaVersion: 1 }, { ...valid, schemaVersion: 4 }]) assert.throws(() => decodeCatalog(value), /Unsupported catalog schema/);
  for (const resourceCount of [-1, 1.5, "3"]) assert.throws(() => decodeCatalog({ ...valid, resourceCount }), /Invalid compact catalog header/);
  assert.throws(() => decodeCatalog({ ...valid, categories: {} }), /Invalid compact catalog header/);
  for (const columns of [null, [], {}, { ...valid.resourceColumns, unexpected: [] }]) assert.throws(() => decodeCatalog({ ...valid, resourceColumns: columns }), /Invalid compact catalog columns/);
  const inherited = Object.create(valid.resourceColumns);
  assert.throws(() => decodeCatalog({ ...valid, resourceColumns: inherited }), /Invalid compact catalog columns/);
  for (const field of CATALOG_RESOURCE_FIELDS) {
    const absent = structuredClone(valid);
    delete absent.resourceColumns[field];
    assert.throws(() => decodeCatalog(absent), /Invalid compact catalog columns/);
    for (const column of [{}, [], valid.resourceColumns[field].slice(1)]) {
      assert.throws(() => decodeCatalog({ ...valid, resourceColumns: { ...valid.resourceColumns, [field]: column } }), /Invalid compact catalog column length/);
    }
    if (!["accessLabels", "aliases"].includes(field)) {
      const missing = structuredClone(valid);
      missing.resourceColumns[field][0] = null;
      assert.throws(() => decodeCatalog(missing), /Invalid compact catalog/);
    }
  }
  for (const field of ["accessLabels", "aliases"]) {
    for (const value of ["text", {}, [1]]) {
      const malformed = structuredClone(valid);
      malformed.resourceColumns[field][0] = value;
      assert.throws(() => decodeCatalog(malformed), /Invalid compact catalog array/);
    }
  }
});

test("compact serializer rejects unrepresented fields and inconsistent resource counts", () => {
  const source = fixture();
  source.resources[0].futureField = "must not disappear";
  assert.throws(() => serializeCompactCatalog(source), /Unsupported compact catalog field/);
  delete source.resources[0].futureField;
  source.resourceCount += 1;
  assert.throws(() => serializeCompactCatalog(source), /Invalid source catalog/);
});

test("compact catalog rejects an inflated count before allocating resource objects", () => {
  const compact = JSON.parse(serializeCompactCatalog(fixture()));
  compact.resourceCount = Number.MAX_SAFE_INTEGER;
  assert.throws(() => decodeCatalog(compact), /Invalid compact catalog column length/);
});
