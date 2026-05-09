# BTCDecoded website

Static marketing site for [btcdecoded.org](https://btcdecoded.org), published to GitHub Pages from the `docs/` directory.

## What it is

- **Next.js 13** with `output: "export"` for a fully static build
- **Two entry paths** after load: **Developers** (problem, architecture, Orange Paper, governance) and **Nodes** (why BLVM, pre-built packages, desktop downloads, FAQ)
- **MathJax** on the Orange Paper page via `better-react-mathjax`
- **Assets** live under `public/` (e.g. `public/assets/images/spec-map.jpg`) and are served at `/assets/...` after export

## Install page (`/install`)

Structured fields (packages, managed-install previews, release links) come from **`data/install-content.json`**, consumed by `pages/install.js` (do not hand-edit release-driven values in JS).

**Default build path:** **`prebuild`** runs **`scripts/fetch-blvm-release.mjs`**, which refreshes **`data/install-content.json`** from the **[`blvm` GitHub Releases](https://github.com/BTCDecoded/blvm/releases)** API (optional `GITHUB_TOKEN`; static/fallback if fetch is skipped). This keeps the marketing **`/install`** page aligned with **shipped binaries**, not only the mdBook chapter.

**Optional:** **`npm run sync-install`** runs **`scripts/sync-install-data.mjs`** to copy **[`blvm-docs` `src/install/install-content.json`](https://github.com/BTCDecoded/blvm-docs/blob/main/src/install/install-content.json)** into `data/` when you have a sibling **`../blvm-docs`** checkout—useful to preview **book-generated** install JSON locally. After editing that JSON in **blvm-docs**, run `node scripts/render-installation.mjs` there and sync before rebuilding this site.

## Commands

```bash
npm install
npm run fetch-blvm-release  # optional: same as prebuild — refresh data from GitHub releases
npm run sync-install        # optional: copy install JSON from sibling ../blvm-docs
npm run dev            # http://localhost:3000
npm run export         # build → out/, copy to docs/, preserve CNAME + .nojekyll
npm run serve          # serve out/ on port 3000
npm run deploy         # export then gh-pages from docs/
```

## Deploy

The `export` script runs `next build`, copies `out/*` into `docs/`, copies `docs/CNAME` when present, and writes `docs/.nojekyll` for GitHub Pages. Push `docs/` on `main` (or your Pages branch) to publish.

## Related

- Umbrella project and spec hosting: [thebitcoincommons.org](https://thebitcoincommons.org)
- Technical docs: [docs.thebitcoincommons.org](https://docs.thebitcoincommons.org)
- Updates: [btccommons.substack.com](https://btccommons.substack.com)
