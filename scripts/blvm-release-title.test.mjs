import assert from "node:assert/strict";
import test from "node:test";
import { blvmHistoryEntry, blvmReleaseTitle, latestPrerelease } from "./blvm-release-title.mjs";

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
    prerelease: false,
  });
});

test("a pre-release stays in the history beside the stable tags", () => {
  const row = blvmHistoryEntry({
    tag_name: "v0.2.0-beta.2",
    prerelease: true,
    html_url: "https://github.com/BTCDecoded/blvm/releases/tag/v0.2.0-beta.2",
    published_at: "2026-11-17T21:43:57Z",
  });
  assert.equal(row.prerelease, true);
  assert.equal(row.tag, "v0.2.0-beta.2");
});

test("the newest pre-release is the first published pre-release in the list", () => {
  const picked = latestPrerelease([
    { tag_name: "v0.2.0-beta.2", prerelease: true, draft: false, html_url: "https://example.test/beta" },
    { tag_name: "v0.1.81", prerelease: false, draft: false },
    { tag_name: "v0.1.62", prerelease: true, draft: false },
    { tag_name: "v9.9.9", prerelease: true, draft: true },
  ]);
  assert.deepEqual(picked, {
    tag: "v0.2.0-beta.2",
    name: "blvm v0.2.0-beta.2",
    url: "https://example.test/beta",
    publishedAt: "",
  });
  assert.equal(latestPrerelease([{ tag_name: "v0.1.81", prerelease: false }]), null);
});
