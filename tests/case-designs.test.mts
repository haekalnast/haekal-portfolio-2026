import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  hasMalformedPercentEncoding,
  isCaseSlug,
  normalizeCaseSlugParam,
} from "../lib/case-designs.ts";

describe("case slug validation", () => {
  it("accepts only configured case slugs", () => {
    assert.equal(isCaseSlug("personal"), true);
    assert.equal(isCaseSlug("b2b"), true);
    assert.equal(isCaseSlug("sfc"), true);
    assert.equal(isCaseSlug("octo"), true);
  });

  it("rejects inherited object keys", () => {
    assert.equal(isCaseSlug("constructor"), false);
    assert.equal(isCaseSlug("__proto__"), false);
    assert.equal(isCaseSlug("toString"), false);
  });

  it("normalizes valid encoded slugs", () => {
    assert.equal(normalizeCaseSlugParam(" PERSONAL "), "personal");
    assert.equal(normalizeCaseSlugParam("B2B"), "b2b");
    assert.equal(normalizeCaseSlugParam("%73%66%63"), "sfc");
  });

  it("turns malformed percent encoding into an invalid slug", () => {
    assert.equal(normalizeCaseSlugParam("%"), "");
    assert.equal(normalizeCaseSlugParam("%ZZ"), "");
    assert.equal(normalizeCaseSlugParam("%E0%A4%A"), "");
    assert.equal(normalizeCaseSlugParam("100%"), "");
  });

  it("detects malformed request paths before route matching", () => {
    assert.equal(hasMalformedPercentEncoding("/designs/case/personal"), false);
    assert.equal(hasMalformedPercentEncoding("/designs/case/%E0%A4%A"), true);
  });
});
