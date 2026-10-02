/** Public connector only. No Worker internals. */
export const MCP_URL = "https://mcp.btcdecoded.org/mcp";
export const WORKER_ORIGIN = "https://mcp.btcdecoded.org";
/** Must match Worker wrangler BITCOIN_NETWORK. */
export const BITCOIN_NETWORK = "mainnet";

/**
 * Intelligence marketing counts from ingest manifests
 * (2026-10-02: 30,232 curated passages + 902,812 record).
 * Academic papers: 828 in the index (876 keep files on disk).
 * Spec/docs expansion (NIPs, SV2, LN, tooling): incremental primary.
 * IRC 370,901 + GitHub 167,112 + Bitcointalk 157,708 + project repos 47,878.
 */
export const CORPUS = {
  curated: "~30,000",
  curatedShort: "~30k",
  record: "~903,000",
  recordShort: "~903k",
  total: "about 933,000",
  irc: "~371k",
  bitcointalk: "~159k",
};

export const INDEX_CURATED = [
  "Specs, maps, findings",
  "Articles and whitepapers",
  "Academic papers (protocol/security)",
  "Nostr NIPs, Stratum V2, BOLTs, BLIPs, LNURL, LSP",
  "BDK, HWI, LDK, LND/CLN, Sparrow, SeedSigner, Bitkey, Passport docs",
  "Select open-source books",
  "Commons book and project docs",
  "Topic syntheses",
];

export const INDEX_RECORD = [
  "IRC review logs (~371k)",
  "Bitcoin-dev and cryptography mailing lists",
  "GitHub PRs, issues, commits, review threads",
  "Project-repo discussions (~48k): secp256k1, BDK, LDK, LND, CLN, Eclair, BOLTs, HWI, rust-bitcoin, rust-miniscript, Sparrow, SeedSigner, Passport, Stratum and its spec, maintainer tools",
  "Delving, Bitcointalk (~159k)",
  "Podcast transcripts",
  "Historical BTC/USD every daily close",
];

export const INDEX_OUT = [
  "Live spot, ETF, or chain analytics",
  "Private chat or unpublished meetings",
];

/** Checkout SKUs. */
export const PLANS = [
  {
    id: "trial",
    label: "Trial",
    blurb: "A week on the full record.",
    includes: [
      "Full ~903k record passages + ~30k curated passages",
      "IRC, mailing lists, GitHub, project-repo discussions, forums, podcast transcripts, source; articles, whitepapers, academic papers, NIPs, Sparrow, SeedSigner, Bitkey, Passport, select open-source books",
      "Argument assessment",
      "Contributor profiles",
      "50 queries per day",
    ],
    options: [{ id: "trial", days: 7, sats: 15_000 }],
  },
  {
    id: "researcher",
    label: "Researcher",
    blurb: "The same corpus, more days and more queries.",
    includes: [
      "Same full corpus as Trial",
      "Argument assessment",
      "Contributor profiles",
      "250 queries per day",
    ],
    options: [
      { id: "researcher", days: 30, sats: 50_000 },
      { id: "researcher_90", days: 90, sats: 128_000 },
      { id: "researcher_180", days: 180, sats: 240_000 },
      { id: "researcher_365", days: 365, sats: 456_000 },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    blurb: "The record, plus public GitHub review and Bearer automation.",
    includes: [
      "Everything in Researcher",
      "analyze_pr / analyze_issue on public GitHub URLs (MCP; private repos fail; 10 queries each)",
      "analyze_submission: advisory spec-versus-submission over Bearer MCP (met / not_met / ambiguous; 10 queries; optional public GitHub PR only)",
      "App comments on installed repos (including private; live-only; 10 queries each)",
      "Discourse, precedent, incident, and spec↔source retrieval",
      "PR review markdown",
      "500 queries per day",
    ],
    featured: true,
    options: [
      { id: "developer", days: 30, sats: 100_000 },
      { id: "developer_90", days: 90, sats: 255_000 },
      { id: "developer_180", days: 180, sats: 480_000 },
      { id: "developer_365", days: 365, sats: 913_000 },
    ],
  },
];

export const PACKAGES = PLANS.flatMap((plan) =>
  plan.options.map((opt) => ({
    id: opt.id,
    label:
      plan.id === "trial" || opt.days === 30
        ? plan.label
        : `${plan.label} ${opt.days}d`,
    sats: opt.sats,
    days: opt.days,
    tools: plan.blurb,
    planId: plan.id,
  })),
);

export function planBySku(sku) {
  for (const plan of PLANS) {
    const opt = plan.options.find((o) => o.id === sku);
    if (opt) return { plan, opt };
  }
  return { plan: PLANS[0], opt: PLANS[0].options[0] };
}

const TIER_RANK = { trial: 0, researcher: 1, developer: 2 };

export function skuForTier(tier) {
  if (tier === "developer") return "developer";
  if (tier === "trial") return "trial";
  return "researcher";
}

export function activeSku(user) {
  if (!user?.has_key) return null;
  if (user.key_package && PACKAGES.some((p) => p.id === user.key_package)) {
    return user.key_package;
  }
  if (user.key_tier) return skuForTier(user.key_tier);
  return skuForTier("researcher");
}

export function isUpgradeSku(fromId, toId) {
  const from = PACKAGES.find((p) => p.id === fromId);
  const to = PACKAGES.find((p) => p.id === toId);
  if (!from || !to) return true;
  const delta = (TIER_RANK[to.planId] ?? 0) - (TIER_RANK[from.planId] ?? 0);
  if (delta > 0) return true;
  if (delta < 0) return false;
  return to.days > from.days;
}

export function upgradeSats(fromId, toId) {
  const from = PACKAGES.find((p) => p.id === fromId);
  const to = PACKAGES.find((p) => p.id === toId);
  if (!to) return 0;
  if (!from) return to.sats;
  return Math.max(1, to.sats - from.sats);
}

export function upgradeSkus(fromId) {
  return PACKAGES.filter((p) => isUpgradeSku(fromId, p.id));
}

export async function sendSupport({ email, message, name, company }) {
  const res = await fetch(`${WORKER_ORIGIN}/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, message, name, company }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(body.error || "send_failed");
    err.status = res.status;
    throw err;
  }
  return body;
}