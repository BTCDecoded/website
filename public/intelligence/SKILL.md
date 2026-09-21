---
name: btcdecoded-intelligence
description: >-
  Use BTCDecoded Intelligence MCP (https://mcp.btcdecoded.org/mcp) to resolve a
  Bitcoin actor, pull proposal precedent, score a spec-versus-submission with
  clause ids, and arm the GitHub App for a gated PR comment. Use when the user
  names Intelligence, MCP cites, analyze_submission, find_precedent,
  get_contributor_profile, get_snapshot, intel:// locators, or a Developer App
  review comment.
---

# BTCDecoded Intelligence

MCP: `POST https://mcp.btcdecoded.org/mcp` (Streamable HTTP). Never call TypeSafe/Jev. Never invent employment, merge verdicts, or disposition labels.

## Connect

1. Sign in at https://btcdecoded.org/account/ (GitHub or Nostr). Pay on Checkout so the key stays on that account.
2. Cursor and other Bearer clients: `Authorization: Bearer` plus the key from Account. Claude.ai uses OAuth fields from Account — do not paste the Bearer key there.
3. Trial/researcher cannot call `find_*` or `analyze_*`. Developer/internal can. `get_snapshot` is on the researcher set.

## Actor

1. `get_contributor_profile` with the GitHub login (or unique public GitHub name).
2. `found=false` means unknown. Do not search the index for a bio. Do not invent affiliation.

## Precedent

1. `find_precedent` with the proposal title, BIP number, or change description.
2. Gold is a heading or URL token already on a cite. There is no disposition field. Do not emit merged/rejected/stalled unless that string is already on the cite.

## Spec verdict

1. `analyze_submission` with `spec`, `submission`, and `requirements` as **caller clause-id strings** (e.g. `["BIP341-sighash"]`). Those strings become `req_N`. Do not regex headings for clause ids.
2. `overall` is `met` | `not_met` | `ambiguous`. Empty cite pack is `ambiguous`.
3. Pass through each cite's `uri` and `layer`. `get_passage` with `uri` (intel://) when you need the stored excerpt.

## PR comment

1. MCP `analyze_pr` / `analyze_issue` **do not post**. They return `comment_markdown` for a **public** PR/issue.
2. A GitHub comment is the **armed Developer App** only. Ask the human to install `btcdecoded-intelligence` and arm from Account. Private reviews are live-only and never snapshots.

## Locators

- `layer` is `primary` (curated) or `secondary` (record). Not `domain`.
- `uri` is `intel://{layer}/{source}/{encodeURIComponent(doc)}?id=…`. Reject `https:` / `javascript:` as cite URIs.
- Print `layer` and `uri` from the tool text. Do not depend on `structuredContent` alone.

## Replay

- Verdict tools persist a dated snapshot (`snapshot_id` in the text). `search` / `find_*` only if `snapshot: true`.
- `get_snapshot { id }` is free. Same `key_hash` (internal may read any).
- A new date is a **new call of the original tool** at that tool's cost (1 or 10). There is no `regenerate_snapshot`. Do not debit `credit_ledger`.
