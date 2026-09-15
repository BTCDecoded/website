import { BITCOIN_NETWORK } from "../lib/api";

export default function SignetNotice() {
  const mainnet = BITCOIN_NETWORK === "mainnet" || BITCOIN_NETWORK === "bitcoin";
  if (mainnet) return null;
  const lnOff = BITCOIN_NETWORK === "signet";
  return (
    <p className="network-warning" role="status">
      <strong>{BITCOIN_NETWORK.toUpperCase()}</strong>
      {lnOff
        ? " — not Bitcoin mainnet. Lightning is off. Do not send real bitcoin."
        : " — Bitcoin testnet3 (tBTC), not TestNet4 and not mainnet. Do not send real bitcoin."}
    </p>
  );
}
