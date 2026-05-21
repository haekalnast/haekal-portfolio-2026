import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isCaseSlug, normalizeCaseSlug } from "../lib/case-designs.ts";
import { hasMalformedPercentEncoding } from "../lib/url-encoding.ts";

describe("case design slug handling", () => {
  it("normalizes valid case slugs", () => {
    assert.equal(normalizeCaseSlug(" Personal "), "personal");
    assert.equal(normalizeCaseSlug("B2B"), "b2b");
    assert.equal(normalizeCaseSlug("sfc%20"), "sfc");
  });

  it("converts malformed encoded slugs into invalid slugs instead of throwing", () => {
    assert.doesNotThrow(() => normalizeCaseSlug("%"));
    assert.equal(normalizeCaseSlug("%"), "");
    assert.equal(normalizeCaseSlug("%GG"), "");
  });

  it("only accepts own case design keys", () => {
    assert.equal(isCaseSlug("personal"), true);
    assert.equal(isCaseSlug("toString"), false);
    assert.equal(isCaseSlug("constructor"), false);
  });

  it("detects raw malformed percent encoding before route matching", () => {
    assert.equal(hasMalformedPercentEncoding("/designs/case/%"), true);
    assert.equal(hasMalformedPercentEncoding("/designs/case/%GG"), true);
    assert.equal(hasMalformedPercentEncoding("/designs/case/%25"), false);
    assert.equal(hasMalformedPercentEncoding("/designs/case/personal"), false);
  });
});
