# PR review layout

Source of truth in the Worker: `src/lib/review/comment.ts` `renderReviewComment` (`layout: "github"` for the App, `layout: "mcp"` for `analyze_pr`). Job: `src/lib/github-job.ts` `runPullReview`.

## GitHub App comment (`layout: "github"`)

1. Disclaimer: `*BTCDecoded Intelligence (bot). Not a merge check. Cite the originals.*`
2. `as_of: <ISO> · Index, not a live crawl.`
3. `**PR:** owner/repo#n` (or `**Issue:**`)
4. `### Surface` — `checkOutputTitle`: first consensus-adjacent path (`src/consensus`, `src/validation`, `src/script`, `src/kernel`, `src/primitives`, `blvm-consensus/`), else `surface: <class>`, else `non-consensus surface`. Issues: `Issue thread. Not a patch review.`
5. Cite sections, only if non-empty, exclusive, cap 8 total, 3 per bucket: Incident (CVE in title/body), Spec (`spec`, `core_src`), Precedent (`bips`), Map (`synthesis`), Discourse (github, mail, irc, delving), Record (remainder).
6. `### Category` plus scaffold category string.

The App may append `### Analysis` when the model text has no `/btcdecoded` command token.

Neutral check title uses the same Surface string. Synchronize updates the check only; opened and ready_for_review post the comment.

## MCP `analyze_pr` (`layout: "mcp"`)

Same disclaimer and `as_of`. Then `## Review (REVIEW_INTELLIGENCE)`, Category, Flags (scaffold steps), then Cites (flat list, cap 8). Still does not post.

When writing for a human from MCP, prefer the App section order so a later App comment cannot contradict you.
