import { useState } from "react";
import Link from "next/link";
import { MCP_URL, PACKAGES, WORKER_ORIGIN } from "../lib/api";
import { authFetch } from "../lib/auth";
import SignetNotice from "../components/SignetNotice";

export default function SubscribePage() {
  const [pack, setPack] = useState("researcher");
  const [status, setStatus] = useState("");
  const [invoice, setInvoice] = useState("");
  const [swapId, setSwapId] = useState("");
  const [key, setKey] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoverInput, setRecoverInput] = useState("");

  async function startPay() {
    setStatus("Requesting invoice…");
    setInvoice("");
    setKey("");
    try {
      const res = await authFetch(`${WORKER_ORIGIN}/lightning/invoice`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ package: pack }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(
          data.error === "lightning disabled"
            ? "Lightning is off on this network. Do not send bitcoin."
            : data.error || "Could not create invoice",
        );
        return;
      }
      setInvoice(data.invoice || "");
      setSwapId(data.swap_id || "");
      setStatus("Pay the invoice, then check status.");
    } catch {
      setStatus("Worker not reachable yet.");
    }
  }

  async function checkSwap() {
    if (!swapId) return;
    const res = await authFetch(`${WORKER_ORIGIN}/lightning/swap/${swapId}`);
    const data = await res.json();
    setStatus(data.status || data.error || "");
    if (data.key) setKey(data.key);
    if (data.recovery_code) setRecoveryCode(data.recovery_code);
  }

  async function recoverKey() {
    setStatus("Recovering…");
    try {
      const res = await fetch(`${WORKER_ORIGIN}/lightning/recover`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ recovery_code: recoverInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "Could not recover");
        return;
      }
      setKey(data.key || "");
      setStatus("Recovered. Store the API key again.");
    } catch {
      setStatus("Worker not reachable yet.");
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2>Subscribe</h2>
        <div className="content">
          <SignetNotice />
          <p>
            <Link href="/account/">Log in</Link> with GitHub or Nostr first so
            the key is saved on your account. After payment you still see the
            key once on this page. If you paid while logged out, keep the
            recovery code. Pay with a <strong>testnet</strong> Lightning
            wallet. Do not pay a mainnet invoice. Connector:{" "}
            <code>{MCP_URL}</code>
          </p>
          <label htmlFor="pkg">Package</label>
          <select
            id="pkg"
            value={pack}
            onChange={(e) => setPack(e.target.value)}
            style={{ display: "block", margin: "0.5rem 0 1rem", padding: "0.4rem" }}
          >
            {PACKAGES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} — {p.sats.toLocaleString()} sats / {p.days}d
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-primary" onClick={startPay}>
            Request Lightning invoice
          </button>
          {invoice ? (
            <p style={{ marginTop: "1rem", wordBreak: "break-all" }}>
              <code>{invoice}</code>
            </p>
          ) : null}
          {swapId ? (
            <p>
              <button type="button" className="btn btn-secondary" onClick={checkSwap}>
                Check payment
              </button>
            </p>
          ) : null}
          {status ? <p>{status}</p> : null}
          {key ? (
            <p>
              API key: <code>{key}</code>
            </p>
          ) : null}
          {recoveryCode ? (
            <p>
              Recovery code (keep this): <code>{recoveryCode}</code>
            </p>
          ) : null}
          <hr style={{ margin: "2rem 0" }} />
          <h3>Lost the API key?</h3>
          <p>Paste the recovery code you saved at purchase.</p>
          <input
            type="text"
            value={recoverInput}
            onChange={(e) => setRecoverInput(e.target.value)}
            placeholder="bdi_rec_…"
            style={{ display: "block", width: "100%", margin: "0.5rem 0 1rem", padding: "0.4rem" }}
          />
          <button type="button" className="btn btn-secondary" onClick={recoverKey}>
            Recover API key
          </button>
        </div>
      </div>
    </section>
  );
}
