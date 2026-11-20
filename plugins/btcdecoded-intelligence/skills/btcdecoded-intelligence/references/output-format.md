# Output format

- Numbered footnotes from the tool text. Pass through `uri` and `layer`. Do not depend on `structuredContent` alone.
- `uri` is `intel://{layer}/{source}/{encodeURIComponent(doc)}?id=…`.
- Print `snapshot_id` and `as_of` when present. Verdict tools persist a snapshot. `search` / `find_*` only if `snapshot: true`.
- `get_snapshot { id }` is free. A new date is a new call of the original tool.
- `verify_claim` returns noul 0–1, `skipped` if the judge is down, or `no_passage`. The judge is not a source.
- `analyze_submission` `overall` is `met` | `not_met` | `ambiguous`. Empty or off-topic cite pack is `ambiguous`. Caller owns `requirements[]`.
- Wiki Status/Type/Layer and PR State/Merged are dump strings on the cite. Closed is not rejected.
