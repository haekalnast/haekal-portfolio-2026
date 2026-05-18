import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

function loadCaseDesignsModule() {
  const sourcePath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../lib/case-designs.ts",
  );
  const source = readFileSync(sourcePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const module = { exports: {} };

  vm.runInNewContext(
    outputText,
    {
      exports: module.exports,
      module,
    },
    { filename: sourcePath },
  );

  return module.exports;
}

test("isCaseSlug only accepts configured own case slugs", () => {
  const { isCaseSlug } = loadCaseDesignsModule();

  assert.equal(isCaseSlug("personal"), true);
  assert.equal(isCaseSlug("b2b"), true);
  assert.equal(isCaseSlug("toString"), false);
  assert.equal(isCaseSlug("__proto__"), false);
});
