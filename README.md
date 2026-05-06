# BTCDecoded website

Static marketing site for [btcdecoded.org](https://btcdecoded.org), published to GitHub Pages from the `docs/` directory.

## What it is

- **Next.js 13** with `output: "export"` for a fully static build
- **Two entry paths** after load: **Developers** (problem, architecture, Orange Paper, governance) and **Nodes** (why BLVM, pre-built packages, desktop downloads, FAQ)
- **MathJax** on the Orange Paper page via `better-react-mathjax`
- **Assets** live under `public/` (e.g. `public/assets/images/spec-map.jpg`) and are served at `/assets/...` after export

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run export       # build → out/, copy to docs/, preserve CNAME + .nojekyll
npm run serve        # serve out/ on port 3000
npm run deploy       # export then gh-pages from docs/
```

## Deploy

The `export` script runs `next build`, copies `out/*` into `docs/`, copies `docs/CNAME` when present, and writes `docs/.nojekyll` for GitHub Pages. Push `docs/` on `main` (or your Pages branch) to publish.

## Related

- Umbrella project and spec hosting: [thebitcoincommons.org](https://thebitcoincommons.org)
- Technical docs: [docs.thebitcoincommons.org](https://docs.thebitcoincommons.org)
- Updates: [btccommons.substack.com](https://btccommons.substack.com)
