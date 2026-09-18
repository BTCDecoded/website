export const SITE_ORIGIN = "https://btcdecoded.org";
export const SITE_NAME = "BTCDecoded";
export const DEFAULT_TITLE = "BTCDecoded";
export const DEFAULT_DESCRIPTION =
  "Cited search over Bitcoin’s public coordination record. Lightning. MCP. BLVM is the node.";
export const OG_IMAGE = `${SITE_ORIGIN}/assets/og.jpg`;
export const ORG_LOGO = `${SITE_ORIGIN}/assets/logo-mark.png`;

const PAGES = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/intelligence": {
    title: "Intelligence · BTCDecoded",
    description:
      "Cited search over Bitcoin’s public coordination record. Lightning. MCP.",
  },
  "/pricing": {
    title: "Plans · BTCDecoded",
    description:
      "Intelligence plans: Trial, Researcher, and Developer. Pay with Lightning.",
  },
  "/subscribe": {
    title: "Checkout · BTCDecoded",
    description: "Subscribe to BTCDecoded Intelligence. Lightning checkout.",
  },
  "/account": {
    title: "Account · BTCDecoded",
    description: "Sign in, manage your Intelligence plan, and copy connector fields.",
  },
  "/problem": {
    title: "Problem · BTCDecoded",
    description:
      "Hard chain rules, soft process above them. Why BTCDecoded writes the spec and the governance.",
  },
  "/architecture": {
    title: "Architecture · BTCDecoded",
    description:
      "Orange Paper to blvm-consensus, protocol, node, SDK, and governance. The BLVM stack.",
  },
  "/orangepaper": {
    title: "Orange Paper · BTCDecoded",
    description:
      "The written Bitcoin consensus rules a second implementation can implement against.",
  },
  "/governance": {
    title: "Governance · BTCDecoded",
    description:
      "Published Bitcoin Commons rules, tiers, and live YAML for how BTCDecoded ships software.",
  },
  "/whyblvm": {
    title: "Why BLVM? · BTCDecoded",
    description:
      "A Bitcoin full node with consensus rules written down. Same chain as Bitcoin Core — not a new coin.",
  },
  "/install": {
    title: "Install · BTCDecoded",
    description:
      "Download BLVM: pre-built binaries and Linux packages from GitHub Releases, with checksums.",
  },
  "/plugandplay": {
    title: "Pre-built nodes · BTCDecoded",
    description:
      "Planned Start9, Umbrel, myNode, and Parmanode paths. Install from GitHub Releases today.",
  },
  "/faq": {
    title: "FAQ · BTCDecoded",
    description:
      "Running a BLVM node, staying on the Bitcoin chain, and how the software is checked.",
  },
  "/support": {
    title: "Support · BTCDecoded",
    description:
      "Contact BTCDecoded about Intelligence billing, keys, checkout, and node questions.",
  },
};

export function canonicalUrl(pathname) {
  const path = (pathname || "/").replace(/\/$/, "") || "";
  if (!path) return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}/`;
}

export function pageMeta(pathname) {
  const key = (pathname || "/").replace(/\/$/, "") || "/";
  const found = PAGES[key];
  return {
    title: found?.title || DEFAULT_TITLE,
    description: found?.description || DEFAULT_DESCRIPTION,
    url: canonicalUrl(pathname),
  };
}

export const SITEMAP_PATHS = Object.keys(PAGES);
