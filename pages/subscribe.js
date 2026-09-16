import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PACKAGES, WORKER_ORIGIN, planBySku, activeSku, isUpgradeSku, upgradeSats, upgradeSkus } from "../lib/api";
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
  const [coupon, setCoupon] = useState("");
  const [preview, setPreview] = useState(null);
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

  function applyPaid(data) {
    setPaid(true);
    setInvoice("");
    setStatus("");
    if (data.recovery_code) setRecoveryCode(data.recovery_code);
  }

  function applyInvoice(data) {
    setPaid(false);
    setInvoice(data.invoice || "");
    setSwapId(data.swap_id || "");
    if (PACKAGES.some((p) => p.id === data.package)) setPack(data.package);
    setStatus("Waiting for payment.");
  }

  useEffect(() => {
    if (!router.isReady) return;
    if (invoice || paid) return;
    const q = String(router.query.plan || "");
    if (PACKAGES.some((p) => p.id === q)) setPack(q);
    const c = String(router.query.coupon || "").trim();
    if (c) setCoupon(c);
  }, [router.isReady, router.query.plan, router.query.coupon, invoice, paid]);

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
    if (!user) return undefined;
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`${WORKER_ORIGIN}/lightning/pending`);
        if (cancelled || res.status === 404) return;
        const data = await res.json();
        if (cancelled) return;
        if (data.paid || data.key) applyPaid(data);
        else if (data.invoice) applyInvoice(data);
      } catch {
        /* none */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!swapId || paid) return undefined;
    checkSwap();
    const t = setInterval(() => {
      checkSwap();
    }, 3000);
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

  async function applyCoupon() {
    if (!user || !coupon.trim()) return;
    setBusy("coupon");
    setStatus("");
    try {
      const res = await authFetch(`${WORKER_ORIGIN}/lightning/coupon`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          coupon: coupon.trim(),
          package: pack,
          preview: true,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPreview(null);
        setStatus(
          data.error === "already_active"
            ? `You already have ${data.tier || "a plan"} until ${String(data.expires_at || "").slice(0, 10) || "it expires"}. Pick an upgrade.`
            : data.error === "login required"
              ? "Sign in first."
              : data.error || "Could not apply coupon",
        );
        return;
      }
      setPreview(data);
      if (PACKAGES.some((p) => p.id === data.package)) setPack(data.package);
      setStatus("");
    } catch {
      setStatus("Could not reach the Worker.");
    } finally {
      setBusy("");
    }
  }

  async function startPay() {
    if (!user || invoice) return;
    setBusy("invoice");
    setStatus("");
    try {
      const grant = Boolean(preview?.grant);
      const res = await authFetch(
        `${WORKER_ORIGIN}/lightning/${grant ? "coupon" : "invoice"}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            package: pack,
            coupon: coupon.trim() || undefined,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setStatus(
          data.error === "lightning disabled"
            ? "Lightning is off on this network. Do not send bitcoin."
            : data.error === "login required"
              ? "Sign in first."
              : data.error === "already_active"
                ? `You already have ${data.tier || "a plan"} until ${String(data.expires_at || "").slice(0, 10) || "it expires"}. Pick an upgrade.`
                : data.error === "invoice_open"
                  ? "Pay or wait out the open invoice first."
                  : data.error || "Could not create invoice",
        );
        return;
      }
      if (data.paid || data.key || data.grant) applyPaid(data);
      else applyInvoice(data);
    } catch {
      setStatus("Could not reach the Worker.");
    } finally {
      setBusy("");
    }
  }

  async function checkSwap() {
    if (!swapId) return;
    try {
      const res = await fetch(`${WORKER_ORIGIN}/lightning/swap/${swapId}`);
      const data = await res.json();
      if (data.paid || data.key) applyPaid(data);
      else if (data.recovery_code) setRecoveryCode(data.recovery_code);
    } catch {
      /* next poll */
    }
  }

  const { plan, opt } = planBySku(pack);
  const current = activeSku(user);
  const upgrading = Boolean(current && isUpgradeSku(current, pack));
  const blocked = Boolean(current && !upgrading && !invoice && !paid && !preview?.grant);
  const listSats = upgrading ? upgradeSats(current, pack) : opt.sats;
  const chargeSats =
    preview && Number.isFinite(preview.charged_sats) ? preview.charged_sats : listSats;
  const usd = usdApprox(chargeSats, btcUsd);
  const nextUp = current ? upgradeSkus(current) : [];
  const canGrant = Boolean(preview?.grant);
  const payDisabled =
    Boolean(busy) || (!canGrant && lnOk === false);

  return (
    <IntelChrome title="Checkout">
      <div className="intel-split">
        <article className="intel-plan">
          <h3>{plan.label}</h3>
          <p className="intel-plan-blurb">{plan.blurb}</p>
          <p className="intel-plan-price">
            <span className="intel-plan-sats">{chargeSats.toLocaleString()}</span>
            <span className="intel-plan-unit"> sats</span>
          </p>
          <p className="intel-plan-meta">
            {opt.days} days{usd ? ` · ${usd}` : ""}
            {upgrading ? " · upgrade" : ""}
            {preview && preview.list_sats !== preview.charged_sats
              ? ` · list ${Number(preview.list_sats).toLocaleString()}`
              : ""}
          </p>
          {current && !invoice ? (
            <p className="intel-plan-meta">
              You have {planBySku(current).plan.label} until{" "}
              {String(user.key_expires_at || "").slice(0, 10) || "expiry"}.
            </p>
          ) : null}
          {invoice ? null : (
            <p className="intel-plan-meta">
              <Link href="/pricing/">Change plan</Link>
            </p>
          )}
        </article>
        {!user ? (
          <div className="intel-panel">
            <AuthCard
              title="Sign in"
              returnPath={`/subscribe/?plan=${encodeURIComponent(pack)}${
                coupon.trim() ? `&coupon=${encodeURIComponent(coupon.trim())}` : ""
              }`}
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
            <h3>{blocked ? "Already on this plan" : "Pay with Lightning"}</h3>
            {lnNote && !canGrant ? <p className="intel-status">{lnNote}</p> : null}
            {invoice ? null : (
              <div className="intel-coupon">
                <label className="intel-panel-label" htmlFor="intel-coupon">
                  Coupon
                </label>
                <input
                  id="intel-coupon"
                  className="intel-input"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setPreview(null);
                  }}
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={applyCoupon}
                  disabled={Boolean(busy) || !coupon.trim()}
                >
                  {busy === "coupon" ? "Checking…" : "Apply"}
                </button>
              </div>
            )}
            {blocked ? (
              <>
                <p>
                  The key is on <Link href="/account/">Account</Link>.
                  {nextUp.length ? " A higher plan is an upgrade, not a second copy." : ""}
                </p>
                <div className="hero-ctas intel-ctas">
                  <Link href="/account/" className="btn btn-primary">
                    Open Account
                  </Link>
                  {nextUp.length ? (
                    <Link href="/pricing/" className="btn btn-secondary">
                      See upgrades
                    </Link>
                  ) : null}
                </div>
              </>
            ) : invoice ? (
              <div className="intel-invoice">
                <InvoiceQr value={invoice} />
                <CopyField value={invoice} label="Copy invoice" />
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={startPay}
                disabled={payDisabled}
              >
                {busy === "invoice"
                  ? canGrant
                    ? "Redeeming…"
                    : "Creating invoice…"
                  : canGrant
                    ? `Redeem ${plan.label}`
                    : upgrading
                      ? `Upgrade to ${plan.label}`
                      : "Create invoice"}
              </button>
            )}
            {status ? <p className="intel-status">{status}</p> : null}
          </div>
        )}
      </div>
    </IntelChrome>
  );
}
