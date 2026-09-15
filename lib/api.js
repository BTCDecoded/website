/** Public connector only. No Worker internals. */
export const MCP_URL = "https://mcp.btcdecoded.org/mcp";
export const WORKER_ORIGIN = "https://mcp.btcdecoded.org";
/** Must match Worker wrangler BITCOIN_NETWORK. Not mainnet. */
export const BITCOIN_NETWORK = "testnet";
export const PACKAGES = [
  { id: "trial", label: "Trial", sats: 15000, days: 7, tools: "search, assess, profiles" },
  { id: "researcher", label: "Researcher", sats: 50000, days: 30, tools: "search, assess, profiles · 100 q/day" },
  { id: "researcher_90", label: "Researcher 90d", sats: 130000, days: 90, tools: "same as Researcher" },
  { id: "developer", label: "Developer", sats: 100000, days: 30, tools: "Researcher + analyze_pr · 500 q/day" },
  { id: "developer_90", label: "Developer 90d", sats: 270000, days: 90, tools: "same as Developer" },
];
