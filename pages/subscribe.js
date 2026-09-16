import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PACKAGES, WORKER_ORIGIN, planBySku } from "../lib/api";
import { usdApprox, useBtcUsd } from "../lib/btcUsd";
import AuthCard from "../components/AuthCard";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";
import InvoiceQr from "../components/InvoiceQr";
import {
  authFetch,
  consumeSessionFromHash,
  fetchMe,
  loginWithNostr,
} from "../lib/auth";

export default function SubscribePage() {
  const router = useRouter();
  const [pack, setPack] = useState("researcher");
  const [user, setUser] = useState(null);
  const [busy, setBusy] = useState("");
  const [invoice, setInvoice] = useState("");
  const [swapId, setSwapId] = useState("");
  const [paid, setPaid] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [status, setStatus] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [lnNote, setLnNote] = useState("");
  const [lnOk, setLnOk] = useState(null);
  const btcUsd = useBtcUsd();

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
    if (!swapId || paid) return undefined;
    const t = setInterval(() => {
      checkSwap(false);
    }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapId, paid]);

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
    if (!user) {
      setStatus("Sign in first.");
      return;
    }
    setBusy("invoice");
    setStatus("");
    setInvoice("");
    setPaid(false);
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
            : data.error === "login required"
              ? "Sign in first."
              : data.error || "Could not create invoice",
        );
        return;
      }
      setInvoice(data.invoice || "");
      setSwapId(data.swap_id || "");
      setStatus("Pay from a Lightning wallet.");
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
        setPaid(true);
        setStatus("");
      } else if (manual) {
        setStatus(data.status || data.error || "Not settled yet.");
      }
      if (data.recovery_code) setRecoveryCode(data.recovery_code);
    } finally {
      if (manual) setBusy("");
    }
  }

  const { plan, opt } = planBySku(pack);
  const usd = usdApprox(opt.sats, btcUsd);

  return (
    <IntelChrome title="Checkout">
      <div className="intel-split">
        <article className="intel-plan">
          <h3>{plan.label}</h3>
          <p className="intel-plan-blurb">{plan.blurb}</p>
          <p className="intel-plan-price">
            <span className="intel-plan-sats">{opt.sats.toLocaleString()}</span>
            <span className="intel-plan-unit"> sats</span>
          </p>
          <p className="intel-plan-meta">
            {opt.days} days{usd ? ` · ${usd}` : ""}
          </p>
          <p className="intel-plan-meta">
            <Link href="/pricing/">Change plan</Link>
          </p>
        </article>
        {!user ? (
          <div className="intel-panel">
            <AuthCard
              title="Sign in"
              returnPath={`/subscribe/?plan=${encodeURIComponent(pack)}`}
              onNostr={onNostr}
              error={loginErr}
            />
          </div>
        ) : paid ? (
          <div className="intel-panel intel-panel--ok">
            <h3>Paid</h3>
            <p>
              The key is on <Link href="/account/">Account</Link>.
            </p>
            {recoveryCode ? (
              <>
                <p className="intel-plan-meta">Store this recovery code</p>
                <CopyField value={recoveryCode} label="Copy recovery code" />
              </>
            ) : null}
            <div className="hero-ctas intel-ctas">
              <Link href="/account/" className="btn btn-primary">
                Open Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="intel-panel">
            <h3>Pay with Lightning</h3>
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
                <InvoiceQr value={invoice} />
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
            {status ? <p className="intel-status">{status}</p> : null}
          </div>
        )}
      </div>
    </IntelChrome>
  );
}
