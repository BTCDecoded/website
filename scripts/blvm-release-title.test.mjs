import assert from "node:assert/strict";
import test from "node:test";
import { blvmHistoryEntry, blvmReleaseTitle } from "./blvm-release-title.mjs";

test("a versioned release is titled blvm plus the tag", () => {
  assert.equal(blvmReleaseTitle("v0.1.62"), "blvm v0.1.62");
  assert.equal(blvmReleaseTitle("  v0.1.63  "), "blvm v0.1.63");
});

test("a missing tag stays the product name", () => {
  assert.equal(blvmReleaseTitle(""), "blvm");
  assert.equal(blvmReleaseTitle(null), "blvm");
});

test("the install history ignores a Bitcoin Commons GitHub title", () => {
  const row = blvmHistoryEntry({
    tag_name: "v0.1.62",
    name: "Bitcoin Commons v0.1.62",
    html_url: "https://github.com/BTCDecoded/blvm/releases/tag/v0.1.62",
    published_at: "2026-10-19T02:20:28Z",
  });
  assert.deepEqual(row, {
    tag: "v0.1.62",
    name: "blvm v0.1.62",
    url: "https://github.com/BTCDecoded/blvm/releases/tag/v0.1.62",
    publishedAt: "2026-10-19T02:20:28Z",
  });
});
