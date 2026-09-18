// Keep the legacy resource property order so decoded catalogs also retain their
// deterministic research fingerprints. Null is reserved for an absent optional
// array; it never replaces a resource value or a value inside metadata.
export const CATALOG_RESOURCE_FIELDS = Object.freeze([
  "title", "url", "accessLabels", "metadata", "id", "idOrigin", "aliases",
  "domain", "category", "categorySlug", "section", "groupSlug", "groupTitle",
  "source", "sourceLine", "description",
]);

const OPTIONAL_ARRAY_FIELDS = new Set(["accessLabels", "aliases"]);

export function decodeCatalog(catalog) {
  if (catalog?.schemaVersion === 2) return catalog;
  if (catalog?.schemaVersion !== 3) throw new Error("Unsupported catalog schema.");
  const { resourceCount, categories, resourceColumns } = catalog;
  if (!Number.isSafeInteger(resourceCount) || resourceCount < 0 || !Array.isArray(categories)) throw new Error("Invalid compact catalog header.");
  if (!resourceColumns || typeof resourceColumns !== "object" || Array.isArray(resourceColumns)
    || Object.keys(resourceColumns).length !== CATALOG_RESOURCE_FIELDS.length
    || CATALOG_RESOURCE_FIELDS.some((field) => !Object.hasOwn(resourceColumns, field))) throw new Error("Invalid compact catalog columns.");

  for (const field of CATALOG_RESOURCE_FIELDS) {
    const values = resourceColumns[field];
    if (!Array.isArray(values) || values.length !== resourceCount) throw new Error(`Invalid compact catalog column length: ${field}`);
  }
  const resources = Array.from({ length: resourceCount }, () => ({}));
  for (const field of CATALOG_RESOURCE_FIELDS) {
    const values = resourceColumns[field];
    for (let index = 0; index < resourceCount; index += 1) {
      const value = values[index];
      if (OPTIONAL_ARRAY_FIELDS.has(field)) {
        if (value === null) continue;
        if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) throw new Error(`Invalid compact catalog array: ${field}`);
      } else if (field === "metadata") {
        if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid compact catalog metadata.");
      } else if (field === "sourceLine") {
        if (!Number.isSafeInteger(value) || value < 1) throw new Error("Invalid compact catalog source line.");
      } else if (typeof value !== "string") {
        throw new Error(`Invalid compact catalog value: ${field}`);
      }
      resources[index][field] = value;
    }
  }
  return { schemaVersion: 2, resourceCount, categories, resources };
}
