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

function tagName(release) {
  return typeof release?.tag_name === "string" ? release.tag_name.trim() : "";
}

/** The 0.1 patch train. GitHub calls these latest. They are not the project release. */
export function isLegacyPatchTrain(tag) {
  return /^v?0\.1\.\d+$/.test(tag);
}

/** A beta, release candidate, or alpha. The GitHub checkbox is not the test. */
export function isProjectPreRelease(tag) {
  return /^v?\d+\.\d+\.\d+-(?:alpha|beta|rc)(?:\.|$)/i.test(tag);
}

/** A stable project tag, such as v0.3.0 or v1.0.0. The 0.1 line does not qualify. */
export function isRealProjectRelease(tag) {
  return /^v?\d+\.\d+\.\d+$/.test(tag) && !isLegacyPatchTrain(tag);
}

/**
 * Headline for the sites. With no real project release, the newest beta or
 * release candidate is the only version. After one exists, that tag is the
 * main release and the newest beta or candidate is shown beside it.
 * `releases` is newest first, as the GitHub API returns them.
 */
export function selectDisplayedReleases(releases) {
  const published = (Array.isArray(releases) ? releases : []).filter(
    (release) => release && release.draft !== true && tagName(release),
  );
  const real = published.find((release) => isRealProjectRelease(tagName(release))) ?? null;
  const pre = published.find((release) => isProjectPreRelease(tagName(release))) ?? null;
  if (real) {
    return {
      phase: "release",
      primary: real,
      secondary: pre && tagName(pre) !== tagName(real) ? pre : null,
    };
  }
  if (pre) return { phase: "pre-release", primary: pre, secondary: null };
  const fallback = published.find((release) => release.prerelease !== true) ?? published[0] ?? null;
  return { phase: "release", primary: fallback, secondary: null };
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
