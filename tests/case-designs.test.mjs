import assert from "node:assert/strict";
import test from "node:test";

import { isCaseSlug, normalizeCaseSlugParam } from "../lib/case-designs.ts";

test("isCaseSlug only accepts configured own keys", () => {
  assert.equal(isCaseSlug("personal"), true);
  assert.equal(isCaseSlug("b2b"), true);
  assert.equal(isCaseSlug("toString"), false);
  assert.equal(isCaseSlug("constructor"), false);
  assert.equal(isCaseSlug("__proto__"), false);
});

test("normalizeCaseSlugParam rejects malformed percent encodings", () => {
  assert.equal(normalizeCaseSlugParam("Personal"), "personal");
  assert.equal(normalizeCaseSlugParam(" personal "), "personal");
  assert.equal(normalizeCaseSlugParam("%"), null);
  assert.equal(normalizeCaseSlugParam("%E0%A4%A"), null);
});
