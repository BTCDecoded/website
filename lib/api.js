/** Public connector only. No Worker internals. */
export const MCP_URL = "https://mcp.btcdecoded.org/mcp";
export const WORKER_ORIGIN = "https://mcp.btcdecoded.org";
/** Must match Worker wrangler BITCOIN_NETWORK. */
export const BITCOIN_NETWORK = "mainnet";

/**
 * Indexed Vectorize chunks after primary + secondary ingest (HUMAN.md):
 * 4,935 primary + 683,718 secondary (IRC 370,901 + Bitcointalk 158,917).
 */
export const CORPUS = {
  passages: 688_653,
  headline: "Nearly 700,000",
  irc: "371k",
  bitcointalk: "159k",
};

/** Round BTC/USD for display only. Invoices are sats. Spot ~$75.7k on 2026-09-16. */
export const BTC_USD_REF = 76_000;

export function usdRef(sats) {
  const n = Math.round((sats / 100_000_000) * BTC_USD_REF);
  return `~$${n.toLocaleString()}`;
}

/** Checkout SKUs. Trial is offered; OpenNode LN max is 5 BTC. */
export const PLANS = [
  {
    id: "trial",
    label: "Trial",
    blurb: "A week on the curated ~5k primary index. Not IRC or the full dumps.",
    includes: [
      "Search the curated ~5k (findings, maps, specs)",
      "Argument assessment on that index",
      "Contributor profiles from primary cites",
      "20 queries per day",
    ],
    options: [{ id: "trial", days: 7, sats: 15_000 }],
  },
  {
    id: "researcher",
    label: "Researcher",
    blurb: "Nearly 700k passages, primary-first: curated hits stay on top, dumps fill the rest.",
    includes: [
      "Search ~700k (primary first, then IRC/GitHub/lists)",
      "Argument assessment",
      "Contributor profiles",
      "100 queries per day",
    ],
    options: [
      { id: "researcher", days: 30, sats: 50_000 },
      { id: "researcher_90", days: 90, sats: 130_000 },
    ],
  },
  {
    id: "developer",
    label: "Developer",
    blurb: "Everything in Researcher, plus an advisory PR scaffold. Not a merge check.",
    includes: [
      "Everything in Researcher",
      "analyze_pr on public GitHub PRs",
      "Advisory comment markdown",
      "500 queries per day",
    ],
    featured: true,
    options: [
      { id: "developer", days: 30, sats: 100_000 },
      { id: "developer_90", days: 90, sats: 270_000 },
    ],
  },
];

export const PACKAGES = PLANS.flatMap((plan) =>
  plan.options.map((opt) => ({
    id: opt.id,
    label: `${plan.label}${opt.days === 90 ? " 90d" : ""}`,
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

export const USD_NOTE = `USD is a snapshot at $${(BTC_USD_REF / 1000).toFixed(0)}k / BTC, rounded. You pay sats.`;
