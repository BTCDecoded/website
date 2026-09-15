import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MCP_URL, PACKAGES, PLANS, WORKER_ORIGIN, planBySku } from "../lib/api";
import {
  authFetch,
  consumeSessionFromHash,
  fetchMe,
  githubLoginUrl,
  loginWithNostr,
} from "../lib/auth";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";

export default function SubscribePage() {
  const router = useRouter();
  const [pack, setPack] = useState("researcher");
  const [user, setUser] = useState(undefined);
  const [busy, setBusy] = useState("");
  const [invoice, setInvoice] = useState("");
  const [swapId, setSwapId] = useState("");
  const [key, setKey] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoverInput, setRecoverInput] = useState("");
  const [status, setStatus] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [lnNote, setLnNote] = useState("");
  const [lnOk, setLnOk] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const q = String(router.query.plan || "");
    if (PACKAGES.some((p) => p.id === q)) setPack(q);
  }, [router.isReady, router.query.plan]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await consumeSessionFromHash();
      try {
        const me = await fetchMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${WORKER_ORIGIN}/lightning/status`);
        const data = await res.json();
        if (cancelled) return;
        if (data.enabled) {
          setLnOk(true);
          setLnNote("");
          return;
        }
        setLnOk(false);
        const reason = String(data.reason || "");
        setLnNote(
          /fixture/i.test(reason)
            ? "Lightning invoices are not available on this network."
            : reason || "Lightning invoices are not available right now.",
        );
      } catch {
        if (!cancelled) {
          setLnOk(false);
          setLnNote("Could not reach Lightning status.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!swapId || key) return undefined;
    const t = setInterval(() => {
      checkSwap(false);
    }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapId, key]);

  async function onNostr() {
    setLoginErr("");
    try {
      await loginWithNostr();
      setUser(await fetchMe());
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : String(err));
    }
  }

  async function startPay() {
    setBusy("invoice");
    setStatus("");
    setInvoice("");
    setKey("");
    setRecoveryCode("");
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
      setStatus("Pay this invoice from a testnet Lightning wallet, then wait — we poll for settlement.");
    } catch {
      setStatus("Could not reach the Worker.");
    } finally {
      setBusy("");
    }
  }

  async function checkSwap(manual = true) {
    if (!swapId) return;
    if (manual) setBusy("check");
    try {
      const res = await authFetch(`${WORKER_ORIGIN}/lightning/swap/${swapId}`);
      const data = await res.json();
      if (data.key) {
        setKey(data.key);
        setStatus("Paid. Copy the API key now. It is also on Account if you were signed in.");
      } else if (manual) {
        setStatus(data.status || data.error || "Not settled yet.");
      }
      if (data.recovery_code) setRecoveryCode(data.recovery_code);
    } finally {
      if (manual) setBusy("");
    }
  }

  async function recoverKey() {
    setBusy("recover");
    setStatus("");
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
      setStatus("Could not reach the Worker.");
    } finally {
      setBusy("");
    }
  }

  const { plan, opt } = planBySku(pack);
  const step = key ? 4 : invoice ? 3 : user ? 2 : 1;

  return (
    <IntelChrome
      title="Checkout"
      lede="Sign in, pick a plan, pay a testnet invoice, copy the key. Mainnet bitcoin will not credit this subscription."
    >
      <ol className="intel-progress" aria-label="Checkout steps">
        {["Sign in", "Plan", "Pay", "Key"].map((label, i) => {
          const n = i + 1;
          const cls = step > n ? "is-done" : step === n ? "is-current" : "";
          return (
            <li key={label} className={cls}>
              {n}. {label}
            </li>
          );
        })}
      </ol>

      <div className="intel-panel">
        <h3>1. Sign in</h3>
        {user === undefined ? (
          <p>Checking session…</p>
        ) : user ? (
          <p>
            Signed in. The key will be stored on{" "}
            <Link href="/account/">Account</Link> after payment.
          </p>
        ) : (
          <>
            <p>
              Recommended so you can show the key again. Paying logged out still
              works — keep the recovery code.
            </p>
            <div className="hero-ctas intel-ctas">
              <a className="btn btn-primary" href={githubLoginUrl("/subscribe/")}>
                Continue with GitHub
              </a>
              <button type="button" className="btn btn-secondary" onClick={onNostr}>
                Continue with Nostr
              </button>
            </div>
            {loginErr ? <p className="intel-status">{loginErr}</p> : null}
          </>
        )}
      </div>

      <div className="intel-panel">
        <h3>2. Plan</h3>
        <div className="intel-sku-grid">
          {PLANS.map((p) =>
            p.options.map((o) => {
              const id = o.id;
              const on = pack === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`intel-sku${on ? " is-on" : ""}`}
                  onClick={() => setPack(id)}
                >
                  <strong>
                    {p.label} · {o.days}d
                  </strong>
                  <span>{o.sats.toLocaleString()} sats</span>
                </button>
              );
            }),
          )}
        </div>
        <p className="intel-plan-meta">
          {plan.label} — {opt.days} days — {opt.sats.toLocaleString()} sats (
          {opt.usd} reference)
        </p>
      </div>

      <div className="intel-panel">
        <h3>3. Pay with testnet Lightning</h3>
        <p>
          {plan.label} · {opt.days} days · {opt.sats.toLocaleString()} sats.
          Pay from a testnet Lightning wallet. Mainnet bitcoin will not credit
          this subscription.
        </p>
        {lnNote ? <p className="intel-status">{lnNote}</p> : null}
        <button
          type="button"
          className="btn btn-primary"
          onClick={startPay}
          disabled={busy === "invoice" || lnOk === false}
        >
          {busy === "invoice" ? "Creating invoice…" : "Create invoice"}
        </button>
        {invoice ? (
          <div className="intel-invoice">
            <CopyField value={invoice} label="Copy invoice" />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => checkSwap(true)}
              disabled={busy === "check"}
            >
              {busy === "check" ? "Checking…" : "I’ve paid — check now"}
            </button>
          </div>
        ) : null}
      </div>

      {key ? (
        <div className="intel-panel intel-panel--ok">
          <h3>4. Your API key</h3>
          <CopyField value={key} label="Copy key" />
          {recoveryCode ? (
            <>
              <p className="intel-plan-meta">Recovery code (keep this if you paid logged out)</p>
              <CopyField value={recoveryCode} label="Copy recovery code" />
            </>
          ) : null}
          <p>
            Add this URL in Claude (or any Streamable HTTP MCP client) with the
            key as a Bearer token.
          </p>
          <CopyField value={MCP_URL} label="Copy MCP URL" />
          <p>
            You can also reveal the key later on <Link href="/account/">Account</Link>.
          </p>
        </div>
      ) : null}

      {status ? <p className="intel-status">{status}</p> : null}

      <details className="intel-recover">
        <summary>Already paid and lost the key?</summary>
        <p>Paste the recovery code shown at purchase.</p>
        <input
          className="intel-input"
          type="text"
          value={recoverInput}
          onChange={(e) => setRecoverInput(e.target.value)}
          placeholder="bdi_rec_…"
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={recoverKey}
          disabled={busy === "recover"}
        >
          Recover API key
        </button>
      </details>
    </IntelChrome>
  );
}
