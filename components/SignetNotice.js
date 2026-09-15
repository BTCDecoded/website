import { BITCOIN_NETWORK } from "../lib/api";

export default function SignetNotice() {
  const mainnet = BITCOIN_NETWORK === "mainnet" || BITCOIN_NETWORK === "bitcoin";
  if (mainnet) return null;
  const lnOff = BITCOIN_NETWORK === "signet";
  return (
    <p className="network-warning" role="status">
      <strong>{BITCOIN_NETWORK.toUpperCase()}</strong> — not Bitcoin mainnet.
      {lnOff
        ? " Lightning pay is off. Do not send real bitcoin. MCP search works with a staging key; a paid key is not for sale on this network."
        : " Lightning invoices are Bitcoin testnet3 (tBTC), not TestNet4 and not mainnet. Do not send real bitcoin. Use Researcher (50k sats) or larger — Trial is below the Boltz minimum."}
    </p>
  );
}
