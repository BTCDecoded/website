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

/** Checkout SKUs. */
export const PLANS = [
  {
    id: "trial",
    label: "Trial",
    blurb: "Curated ~5k for a week.",
    includes: [
      "Curated ~5k (findings, maps, specs)",
      "Argument assessment",
      "Contributor profiles",
      "20 queries per day",
    ],
    options: [{ id: "trial", days: 7, sats: 15_000 }],
  },
  {
    id: "researcher",
    label: "Researcher",
    blurb: "~700k passages, primary first.",
    includes: [
      "Search ~700k (primary first)",
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
    blurb: "Researcher plus PR review.",
    includes: [
      "Everything in Researcher",
      "analyze_pr on public GitHub PRs",
      "PR review markdown",
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