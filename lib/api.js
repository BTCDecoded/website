/** Public connector only. No Worker internals. */
export const MCP_URL = "https://mcp.btcdecoded.org/mcp";
export const WORKER_ORIGIN = "https://mcp.btcdecoded.org";
/** Must match Worker wrangler BITCOIN_NETWORK. */
export const BITCOIN_NETWORK = "mainnet";

/**
 * Intelligence marketing counts from ingest (HUMAN.md):
 * 4,935 curated + 683,718 record (IRC 370,901 + Bitcointalk 158,917).
 */
export const CORPUS = {
  curated: "~5,000",
  curatedShort: "~5k",
  record: "~684,000",
  recordShort: "~684k",
  total: "nearly 700,000",
  irc: "~371k",
  bitcointalk: "~159k",
};

export const INDEX_CURATED = [
  "Research findings and data",
  "Canonical maintainer data",
  "Training corpus: Bitcoin domain, epistemology, ops files, discourse games, argument map",
  "Bitcoin Commons book chapters",
  "Secsovereign articles and BIPs pages",
  "BLVM spec and Orange Paper pointer",
  "BLVM docs",
  "Bitcoin Commons whitepaper",
  "Bitcoin whitepaper",
  "Commons ecosystem vision",
  "Commons Pool docs",
  "Topic syntheses (blocksize, Erlay, consensus vs policy, …)",
  "Review intelligence and expectations",
];

export const INDEX_RECORD = [
  "GitHub: PRs, issues, commits, merged-by map",
  "Bitcoin-dev and cryptography mailing lists",
  "Delving Bitcoin posts and topics",
  "Satoshi communications archive",
  "BIP texts, BIP PRs and issues",
  "Release tags and signers",
  "Bitcoin Core source code: consensus, policy, script, validation, net, mempool, miner",
  "Bitcointalk forum posts (~159k)",
  "IRC review channel logs (~371k)",
];

export const INDEX_OUT = [
  "Price, ETF, or derivatives data",
  "On-chain analytics / wallet tracing / exchange flows",
  "Private Slack, Telegram, Signal, or unpublished meetings",
  "Non-review IRC networks that were not ingested",
  "Anything not in the two lists above",
];

/** Checkout SKUs. */
export const PLANS = [
  {
    id: "trial",
    label: "Trial",
    blurb: "A week on the full record.",
    includes: [
      "Full ~684k record + curated ~5k",
      "IRC, mailing lists, GitHub, Delving, Bitcointalk, Satoshi, BIPs, Core source",
      "Argument assessment",
      "Contributor profiles",
      "20 queries per day",
    ],
    options: [{ id: "trial", days: 7, sats: 15_000 }],
  },
  {
    id: "researcher",
    label: "Researcher",
    blurb: "The same corpus, more days and more queries.",
    includes: [
      "Same full corpus as Trial",
      "IRC review logs (~371k), Bitcointalk (~159k), bitcoin-dev and cryptography lists, GitHub PRs/issues/commits, Delving, Satoshi archive, BIP texts and BIP PRs/issues, release tags and signers, Bitcoin Core source (consensus, policy, script, validation, net, mempool, miner)",
      "Argument assessment",
      "Contributor profiles",
      "100 queries per day",
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
    blurb: "The record, plus PR review.",
    includes: [
      "Everything in Researcher",
      "analyze_pr on public GitHub PRs against that record",
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