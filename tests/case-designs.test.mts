import assert from "node:assert/strict";
import test from "node:test";

import { isCaseSlug, normalizeCaseSlug } from "../lib/case-designs.ts";

test("isCaseSlug only accepts configured own case slugs", () => {
  assert.equal(isCaseSlug("personal"), true);
  assert.equal(isCaseSlug("b2b"), true);
  assert.equal(isCaseSlug("sfc"), true);
  assert.equal(isCaseSlug("octo"), true);

  assert.equal(isCaseSlug("constructor"), false);
  assert.equal(isCaseSlug("__proto__"), false);
  assert.equal(isCaseSlug("toString"), false);
});

test("normalizeCaseSlug decodes valid slugs and rejects malformed encoded input", () => {
  assert.equal(normalizeCaseSlug(" PERSONAL "), "personal");
  assert.equal(normalizeCaseSlug("%6Fcto"), "octo");
  assert.equal(normalizeCaseSlug("%E0%A4%A"), null);
});
