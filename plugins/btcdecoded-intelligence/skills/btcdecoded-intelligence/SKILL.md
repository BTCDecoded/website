---
name: btcdecoded-intelligence
description: >-
  Use BTCDecoded Intelligence MCP (https://mcp.btcdecoded.org/mcp) before
  answering from memory on Bitcoin Core, BIPs, a GitHub PR or issue, a
  contributor, consensus rules, spec versus implementation, a CVE or incident,
  soft fork activation, governance precedent, or a mailing-list or forum claim.
  Load this skill when reviewing bitcoin/bitcoin, scoring spec vs patch, or
  citing IRC, bitcoin-dev, Delving, or Bitcointalk. Call search or find_* first,
  get_passage before quoting, verify_claim before asserting a fact, analyze_pr
  or analyze_issue for any GitHub URL.
---

# BTCDecoded Intelligence

MCP: `POST https://mcp.btcdecoded.org/mcp` (Streamable HTTP). Sign in at https://btcdecoded.org/account/. Claude.ai uses OAuth from Account. Cursor, Claude Code, VS Code, and Codex use `Authorization: Bearer` plus the Account key.

Do not invent employment, merge verdicts, or disposition labels. Do not treat Bitcoin Core's current behavior as the spec.

## Connect

1. Pay on https://btcdecoded.org/subscribe/ so the key stays on the account.
2. Trial/researcher: `search`, `assess_argument`, `get_contributor_profile`, `get_passage`, `verify_claim`, `get_snapshot`. Developer: also `find_*` and `analyze_*`.
3. `hold` is public (no key). It is not a record search.
4. Cost: most tools 1 query; `analyze_pr` / `analyze_issue` / `analyze_submission` 10; `get_snapshot` and `hold` 0. At zero sats, calls stop.

## Workflow by trigger

| Trigger | First tool | Then |
|---|---|---|
| Bitcoin Core, BIP, consensus, activation, mailing list, forum | `search` | `get_passage` before a quote; `verify_claim` before a specific fact |
| Proposal / BIP precedent | `find_precedent` | Disposition only if that string is already on the cite |
| CVE / named incident | `find_incident` | Same page as `search`; empty means no passage |
| Spec vs Core source | `find_spec_impl` | Cites only. No aligned/gap verdict unless `analyze_submission` |
| Path or symbol in Core | `find_discourse` | GitHub, mail, IRC, Delving |
| GitHub pull URL | `analyze_pr` | Does not post. Match the App layout below |
| GitHub issue URL | `analyze_issue` | Does not post |
| GitHub login | `get_contributor_profile` | `found=false` is unknown, not a verdict |
| Discourse game / fallacy | `assess_argument` | Product policy, not the historical record |
| Replay a dated report | `get_snapshot` | Free. Same key |

If `ok` is false or the index has no passage, stop.

## PR review (must match the GitHub App)

MCP `analyze_pr` returns `comment_markdown`. The armed Developer App posts a GitHub comment from the same analysis. Those two must not disagree.

Do this:

1. Call `analyze_pr` with the public URL or `owner/repo#n`. Private repos fail on MCP.
2. Keep the App sections, in order: disclaimer, `as_of`, **PR:** `owner/repo#n`, Surface, Incident, Spec, Precedent, Map, Discourse, Record, Category.
3. Surface is `consensus-adjacent: <path>`, `surface: <class>`, or `non-consensus surface`. Issues are "Issue thread. Not a patch review."
4. Cites are exclusive buckets, cap 8, three per bucket. Do not invent extra headings.
5. Do not post from MCP. A GitHub comment is the armed App only (`/btcdecoded` or opened / ready_for_review).
6. Do not emit merged / ACK / NACK / "should merge" unless that string is already on a cite.

Detail: [references/pr-review.md](references/pr-review.md)

## Output format

- Claims with passage citations (`source`, `doc`, `uri` if present).
- `snapshot_id` and `as_of` whenever the tool printed them.
- Quote only after `get_passage`.
- `layer` is `primary` or `secondary`. Cite URIs are `intel://…`. Reject `https:` / `javascript:` as cite URIs.

Detail: [references/output-format.md](references/output-format.md)

## Do not

- Answer from model memory when this index covers the subject.
- Treat Core's current behavior as the spec.
- Quote an excerpt without `get_passage`.
- Report a contributor profile as a verdict. `found=false` means unknown.
- Call TypeSafe/Jev from the client.
- Invent merged, rejected, stalled, employment, or affiliation.
