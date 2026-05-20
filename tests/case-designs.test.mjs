import assert from "node:assert/strict";
import test from "node:test";

import { isCaseSlug, normalizeCaseSlugParam, resolveCaseSlugParam } from "../lib/case-designs.ts";

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

test("resolveCaseSlugParam treats rejected params as invalid", async () => {
  await assert.doesNotReject(resolveCaseSlugParam(Promise.reject(new URIError("bad slug"))));
  assert.equal(await resolveCaseSlugParam(Promise.reject(new URIError("bad slug"))), "");
});
