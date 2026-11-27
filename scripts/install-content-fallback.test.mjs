import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const dataDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");

test("the install fallback is the same snapshot as the install file", () => {
  const live = fs.readFileSync(path.join(dataDir, "install-content.json"), "utf8");
  const fallback = fs.readFileSync(path.join(dataDir, "install-content.fallback.json"), "utf8");
  assert.equal(
    fallback,
    live,
    "install-content.fallback.json drifted from install-content.json. Run node scripts/fetch-blvm-release.mjs and commit both files.",
  );
});
