# TTtest commit

# hello are you there?

# Next.js + HashRouter SPA test

##

This repository contains a minimal Next.js app that demonstrates:

- Client-side navigation using React Router's `HashRouter` (hash-based routes)
- SEO-friendly static pages rendered by Next.js for crawlers (`/about`, `/contact`)

How it works:

- The `Layout` component keeps normal hrefs (e.g. `/about`) so crawlers can discover pages
- Clicks are intercepted in the browser and converted to hash navigation (e.g. `/#/about`) so the SPA uses `HashRouter` for client navigation
- Next.js pages `pages/about.js` and `pages/contact.js` are static pages that will be exported to `out/about/index.html` and `out/contact/index.html` for SEO/static hosting

Quick start

```bash
# install
npm install

# run dev server (serves at localhost:3000/test/)
npm run dev

# build and export static site to `out/`
npm run export
```

The dev server respects the `basePath: '/test'` configuration in `next.config.js`, so you can access the app at:

- **Home**: http://localhost:3000/test/
- **About**: http://localhost:3000/test/#/about
- **Contact**: http://localhost:3000/test/#/contact

This matches the GitHub Pages deployment structure.

Test the exported build locally

Before deploying, test the static build locally:

```bash
npm run export
npm run serve
```

Then visit: http://localhost:3000/test/

This serves the exact same `out/` directory that GitHub Actions will publish.

Deploy to GitHub Pages (simple):

1. Run `npm run export` — this creates an `out/` directory with static files.
2. Publish the contents of `out/` to your GitHub Pages target (e.g. push to `gh-pages` branch or to the repository `docs/` folder).

Example using the `gh-pages` package:

```bash
# install once
npm install --save-dev gh-pages

# add a package.json script:
#   "deploy": "npm run export && gh-pages -d out"

# then deploy
npm run deploy
```

Notes

- Client-side navigation uses hash locations (e.g. `/#/about`) so the site works from static hosting like GitHub Pages.
- The plain `/about` and `/contact` pages are present so crawlers that don't execute JavaScript can still index page content.

Deploy script

I added a `deploy` script that uses the `gh-pages` package to publish the exported `out/` directory to GitHub Pages.

Install the dev dependency and deploy with:

```bash
npm install --save-dev gh-pages
npm install
npm run deploy
```

Or simply run `npm install` once (it will install `gh-pages` from `devDependencies`) and then:

```bash
npm run deploy
```
