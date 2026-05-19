import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Module } from "node:module";
import { test } from "node:test";
import ts from "typescript";

function loadCaseDesignsModule() {
  const filename = new URL("../lib/case-designs.ts", import.meta.url);
  const source = readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename.pathname,
  });

  const module = new Module(filename.pathname);
  module.filename = filename.pathname;
  module.paths = Module._nodeModulePaths(new URL("..", import.meta.url).pathname);
  module._compile(outputText, filename.pathname);
  return module.exports;
}

const { CASE_DESIGNS, isCaseSlug } = loadCaseDesignsModule();

test("isCaseSlug accepts configured case slugs", () => {
  for (const slug of Object.keys(CASE_DESIGNS)) {
    assert.equal(isCaseSlug(slug), true);
  }
});

test("isCaseSlug rejects inherited object properties", () => {
  assert.equal(isCaseSlug("toString"), false);
  assert.equal(isCaseSlug("__proto__"), false);
  assert.equal(isCaseSlug("constructor"), false);
});
