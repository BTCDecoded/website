import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const skillFiles = [
  "public/skills/SKILL.md",
  "public/skills/btcdecoded-intelligence/SKILL.md",
  "public/intelligence/SKILL.md",
  "plugins/btcdecoded-intelligence/skills/btcdecoded-intelligence/SKILL.md",
];

test("skills page does not surface llms.txt", () => {
  const text = readFileSync(join(root, "pages/skills.js"), "utf8");
  assert.equal(text.includes("llms.txt"), false);
});

test("SKILL.md relative references exist on disk next to the file", () => {
  const re = /\]\((references\/[^)]+)\)/g;
  for (const rel of skillFiles) {
    const path = join(root, rel);
    const text = readFileSync(path, "utf8");
    const refs = [...text.matchAll(re)].map((m) => m[1]);
    assert.ok(refs.length > 0, `${rel} has no references/ links`);
    for (const ref of refs) {
      const target = join(dirname(path), ref);
      assert.equal(existsSync(target), true, `${rel} -> ${ref} missing at ${target}`);
    }
  }
});
