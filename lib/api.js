/** Public connector only. No Worker internals. */
export const MCP_URL = "https://mcp.btcdecoded.org/mcp";
export const WORKER_ORIGIN = "https://mcp.btcdecoded.org";
/** Must match Worker wrangler BITCOIN_NETWORK. Not mainnet. */
export const BITCOIN_NETWORK = "mainnet";

/** Checkout SKUs. Trial is offered; OpenNode LN max is 5 BTC, not Boltz 50k. */
export const PLANS = [
  {
    id: "trial",
    label: "Trial",
    blurb: "A week of corpus search to see if the product is useful.",
    includes: [
      "Semantic search with citations",
      "Argument assessment",
      "Contributor profiles",
      "100 queries per day",
    ],
    options: [{ id: "trial", days: 7, sats: 15_000, usd: "$15" }],
  },
  {
    id: "researcher",
    label: "Researcher",
    blurb: "Search the corpus, classify arguments, and look up public-record contributor facts.",
    includes: [
      "Semantic search with citations",
      "Argument assessment",
      "Contributor profiles",
      "100 queries per day",
    ],
    options: [
      { id: "researcher", days: 30, sats: 50_000, usd: "$50" },
      { id: "researcher_90", days: 90, sats: 130_000, usd: "$130" },
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
      { id: "developer", days: 30, sats: 100_000, usd: "$100" },
      { id: "developer_90", days: 90, sats: 270_000, usd: "$270" },
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

export const USD_NOTE = "USD is a reference at $100k / BTC, not an invoice currency.";
