import assert from "node:assert/strict";
import test from "node:test";
import { parseRelatedPaths, parseSiteGuide, prepareGuideTemplates, renderGuideMarkdown } from "../scripts/lib/guide.mjs";

test("collection guides render a safe, useful Markdown subset", () => {
  const html = renderGuideMarkdown(`
> **Safety:** Verify the controlling source.

## Orient First

### A system map

| Layer | Question |
| --- | --- |
| Access | What is required? |

1. Preserve the notice.
2. [Read the source](https://example.org/).

<script>alert("no")</script>
`, "lists/example/README.md");
  assert.match(html, /class="guide-warning"/);
  assert.match(html, /<h3>Orient First<\/h3>/);
  assert.match(html, /<table>/);
  assert.match(html, /href="https:\/\/example\.org\/"/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});

test("site-guide markers are optional but strict when present", () => {
  assert.equal(parseSiteGuide("# Example\n", "lists/example/README.md"), null);
  const guide = parseSiteGuide(`
<!-- site-guide:start -->
> Safety first.
## Contents
- [Orient First](#orient-first)
## Orient First
Use the map.
<!-- site-guide:end -->
`, "lists/example/README.md");
  assert.equal(guide.source, "lists/example/README.md");
  assert.doesNotMatch(guide.html, /Contents/);
  assert.match(guide.html, /Orient First/);
  assert.throws(() => parseSiteGuide("<!-- site-guide:start -->", "lists/example/README.md"), /unbalanced/);
});

test("related Akashic links become stable native path references", () => {
  const related = parseRelatedPaths(`
## Related Akashic Collections

Use [Business](../business-and-entrepreneurship/README.md), [Creative Tools](../awesome-abundance/creative-tools-and-production/README.md#music-production), and [an external site](https://example.org/README.md).
`, "lists/legal-help-and-law/README.md");
  assert.deepEqual(related, [
    { title: "Business", categorySlug: "business-and-entrepreneurship", groupSlug: "", sectionHash: "" },
    { title: "Creative Tools", categorySlug: "awesome-abundance", groupSlug: "creative-tools-and-production", sectionHash: "music-production" },
  ]);
});

test("guide templates preserve complete safe content and leave a source fallback in the catalog", () => {
  const guide = parseSiteGuide(`
<!-- site-guide:start -->
> Verify notices.
## Start Here
[A source](https://example.org/)
<script>unsafe()</script>
</template><img src=x onerror=unsafe()>
<!-- site-guide:end -->
`, "lists/example/README.md");
  const categories = [{ slug: "example", guide }, { slug: "no-guide", guide: null }];
  const prepared = prepareGuideTemplates(categories);
  assert.equal(categories[0].guide, guide);
  assert.equal(prepared.html, `<template id="collection-guide-example" lang="en">${guide.html}</template>`);
  assert.equal(prepared.categories[0].guide.templateId, "collection-guide-example");
  assert.equal(prepared.categories[0].guide.source, guide.source);
  assert.match(prepared.categories[0].guide.html, /https:\/\/github.com\/egohygiene\/akashic\/blob\/main\/lists\/example\/README.md/);
  assert.doesNotMatch(prepared.categories[0].guide.html, /unsafe\(\)/);
  assert.doesNotMatch(prepared.html, /<script>/);
  assert.doesNotMatch(prepared.html, /<img/);
  assert.equal(prepared.html.split("</template>").length, 2);
  assert.equal(prepared.categories[1], categories[1]);
  assert.throws(() => prepareGuideTemplates([categories[0], categories[0]]), /Duplicate guide/);
  assert.throws(() => prepareGuideTemplates([{ slug: 'bad"id', guide }]), /Unsafe guide/);
});
