/**
 * Marketing-site blvm version labels — sourced from install-content.json, which
 * scripts/fetch-blvm-release.mjs refreshes before each Next.js build.
 */
import installContent from "../data/install-content.json";

const release = installContent.release ?? {};

function normalizeTag(tag) {
  if (typeof tag !== "string") return "";
  const t = tag.trim();
  return t || "";
}

function normalizeSemver(semver, tag) {
  if (typeof semver === "string" && semver.trim()) return semver.trim();
  const t = normalizeTag(tag);
  if (!t) return "";
  return t.startsWith("v") ? t.slice(1) : t;
}

const tag = normalizeTag(release.tag);
const semver = normalizeSemver(release.semver, release.tag);

/** GitHub-style tag for badges and CTAs, e.g. v0.1.5 */
export const blvmDisplayTag = tag || (semver ? `v${semver}` : "Latest");

/** Stripped semver for copy that omits the “v”, e.g. Docker tags */
export const blvmSemver = semver || (tag.startsWith("v") ? tag.slice(1) : tag) || "";

export const blvmReleasesLatestUrl =
  typeof release.releasesLatestUrl === "string" ? release.releasesLatestUrl.trim() : "";

export const blvmReleasesTagUrl =
  typeof release.releasesTagUrl === "string" ? release.releasesTagUrl.trim() : "";
