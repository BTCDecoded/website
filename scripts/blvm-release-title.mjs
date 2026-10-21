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
  };
}
