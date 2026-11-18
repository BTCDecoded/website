/** Display name for one blvm GitHub release. The tag is the only input. */
export function blvmReleaseTitle(tag) {
  const t = typeof tag === "string" ? tag.trim() : "";
  if (!t) return "blvm";
  return `blvm ${t}`;
}

/** Install-history row. The GitHub release title is not used. */
export function blvmHistoryEntry(release) {
  const tag = typeof release?.tag_name === "string" ? release.tag_name : "";
  return {
    tag,
    name: blvmReleaseTitle(tag),
    url: release?.html_url,
    publishedAt: release?.published_at,
    prerelease: release?.prerelease === true,
  };
}

/** Newest published pre-release in a GitHub releases list (newest first). */
export function latestPrerelease(releases) {
  if (!Array.isArray(releases)) return null;
  const hit = releases.find(
    (release) =>
      release &&
      release.draft !== true &&
      release.prerelease === true &&
      typeof release.tag_name === "string" &&
      release.tag_name.trim(),
  );
  if (!hit) return null;
  const tag = hit.tag_name.trim();
  return {
    tag,
    name: blvmReleaseTitle(tag),
    url: typeof hit.html_url === "string" ? hit.html_url : "",
    publishedAt: hit.published_at ?? "",
  };
}
