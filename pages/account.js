import { useEffect, useState } from "react";
import Link from "next/link";
import { MCP_URL, WORKER_ORIGIN, activeSku, upgradeSkus } from "../lib/api";
import { mcpSnippets } from "../lib/mcpSnippets";
import AuthCard from "../components/AuthCard";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";
import {
  consumeSessionFromHash,
  fetchAccountKey,
  fetchMe,
  fetchReferral,
  loginWithNostr,
  logout,
  revokeReferral,
} from "../lib/auth";

const CONNECTOR_NAME = "BTCDecoded Intelligence";

function tierLabel(tier) {
  if (tier === "developer") return "Developer";
  if (tier === "trial") return "Trial";
  if (tier === "researcher") return "Researcher";
  return "";
}

function formatDate(iso) {
  const raw = String(iso || "");
  const parts = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  const d = parts
    ? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
    : new Date(Date.parse(raw));
  if (!Number.isFinite(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function expiryLabel(iso) {
  const date = formatDate(iso);
  if (!date) return "";
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return date;
  const left = ms - Date.now();
  if (left <= 0) return `ended ${date}`;
  const days = Math.max(1, Math.ceil(left / 86400000));
  const wait = days === 1 ? "1 day" : `${days} days`;
  return `until ${date} (${wait})`;
}

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState("");
  const [connector, setConnector] = useState(null);
  const [referral, setReferral] = useState(null);
  const [status, setStatus] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    try {
      const me = await fetchMe();
      setUser(me);
      if (me) {
        try {
          setReferral(await fetchReferral());
        } catch {
          setReferral(null);
        }
      } else {
        setReferral(null);
      }
    } catch {
      setUser(null);
      setReferral(null);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await consumeSessionFromHash();
      if (!cancelled) {
        await refresh();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!user?.has_key) {
      setConnector(null);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${WORKER_ORIGIN}/oauth/connector`);
        const data = await res.json();
        if (!cancelled && data.oauth_client_id) setConnector(data);
      } catch {
        /* reveal still has the fields */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.has_key]);

  async function onNostr() {
    setLoginErr("");
    setBusy(true);
    try {
      await loginWithNostr();
      await refresh();
    } catch (err) {
      setLoginErr(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  async function onReveal() {
    setStatus("");
    try {
      const data = await fetchAccountKey();
      setKey(data.key || "");
      if (data.oauth_client_id) setConnector(data);
      const until = formatDate(data.expires_at);
      setStatus(until ? `Expires ${until}` : "");
    } catch (err) {
      if (err.status === 404) {
        setStatus("No key on this profile yet.");
        return;
      }
      setStatus(err instanceof Error ? err.message : String(err));
    }
  }

  async function onLogout() {
    await logout();
    setKey("");
    setConnector(null);
    setReferral(null);
    setUser(null);
    setStatus("");
  }

  function referralShareUrl(code) {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://btcdecoded.org";
    return `${origin}/subscribe/?plan=trial&ref=${encodeURIComponent(code)}`;
  }

  async function onShareReferral() {
    const url = referral.code ? referralShareUrl(referral.code) : "";
    if (!url) return;
    setStatus("");
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "BTCDecoded Intelligence",
          text: "5,000 sats off your first Lightning invoice.",
          url,
        });
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied.");
    } catch {
      setStatus("Copy the link below.");
    }
  }

  async function onRevokeReferral() {
    setStatus("");
    try {
      const data = await revokeReferral();
      setReferral((cur) => ({
        ...(cur || { balance_sats: 0, ledger: [] }),
        code: data.code,
      }));
      setStatus("New referral code issued.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : String(err));
    }
  }

  const label =
    user?.github_name ||
    (user?.github ? `@${user.github}` : null) ||
    user?.nostr_name ||
    (user?.nostr ? `nostr:${user.nostr.slice(0, 8)}…` : null) ||
    user?.id;
  const initial = String(label || "A")
    .replace(/^@/, "")
    .slice(0, 1)
    .toUpperCase();
  const provider = user?.github ? "GitHub" : user?.nostr ? "Nostr" : "";
  const plan = tierLabel(user?.key_tier);
  const until = expiryLabel(user?.key_expires_at);
  const canUpgrade = user?.has_key ? upgradeSkus(activeSku(user)).length > 0 : false;
  const mcpUrl = connector?.mcp || MCP_URL;
  const clientId = connector?.oauth_client_id || "";
  const clientSecret = connector?.oauth_client_secret || "";
  const connectorName = connector?.connector_name || CONNECTOR_NAME;
  const snippets = mcpSnippets({ url: mcpUrl, key });

  return (
    <IntelChrome title={user ? "Account" : "Sign in"}>
      {user ? (
        <div className="intel-account">
          <div className="auth-session">
            <span className="auth-session__avatar" aria-hidden="true">
              {initial}
            </span>
            <div className="auth-session__who">
              <p className="auth-session__name">{label}</p>
              <p className="auth-session__meta">
                {provider}
                {user.has_key && plan ? ` · ${plan}` : ""}
                {user.has_key && until ? ` ${until}` : ""}
              </p>
            </div>
            <button
              type="button"
              className="auth-session__out"
              onClick={onLogout}
            >
              Sign out
            </button>
          </div>

          {user.has_key ? (
            <div className="intel-panel intel-panel--ok">
              <p className="intel-plan-badge">Active</p>
              <h3>Claude connector</h3>
              <p className="intel-plan-blurb">
                Claude asks for OAuth, not an API key. Settings → Connectors →
                Add custom connector, then paste these four fields.
              </p>
              {clientId ? (
                <>
                  <p className="intel-panel-label">Name</p>
                  <CopyField value={connectorName} label="Copy name" />
                  <p className="intel-panel-label">MCP server URL</p>
                  <CopyField value={mcpUrl} label="Copy URL" />
                  <p className="intel-panel-label">OAuth client ID</p>
                  <CopyField value={clientId} label="Copy client ID" />
                  <p className="intel-panel-label">OAuth client secret</p>
                  <CopyField value={clientSecret} label="Copy secret" />
                </>
              ) : (
                <p className="intel-status">Loading connector fields…</p>
              )}
              <p className="intel-plan-meta">
                After Connect, sign in on mcp.btcdecoded.org if asked, then Allow
                Claude.
              </p>
              {canUpgrade ? (
                <div className="hero-ctas intel-ctas">
                  <Link href="/pricing/" className="btn btn-secondary">
                    Upgrade plan
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="intel-panel">
              <h3>No subscription on this login</h3>
              <p className="intel-plan-blurb">
                Pay while signed in. The key stays on this account.
              </p>
              <div className="hero-ctas intel-ctas">
                <Link href="/pricing/" className="btn btn-primary">
                  See plans
                </Link>
              </div>
            </div>
          )}

          {referral?.code ? (
            <div className="intel-panel">
              <h3>Referral</h3>
              <p className="intel-plan-blurb">
                Send this link. First Lightning invoice gets 5,000 sats off.
                You get 5,000 sats of Intelligence credit when that invoice
                settles. Cannot combine with a coupon. Credit is not withdrawable.
              </p>
              <p className="intel-panel-label">Link</p>
              <CopyField
                value={referralShareUrl(referral.code)}
                label="Copy link"
              />
              <div className="hero-ctas intel-ctas">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onShareReferral}
                >
                  Share
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onRevokeReferral}
                >
                  Revoke and issue new code
                </button>
              </div>
              <p className="intel-panel-label">Code</p>
              <CopyField value={referral.code} label="Copy code" />
              <p className="intel-plan-meta">
                Credit {Number(referral.balance_sats || 0).toLocaleString()} sats
              </p>
              {Array.isArray(referral.ledger) && referral.ledger.length ? (
                <ul className="intel-plan-meta">
                  {referral.ledger.slice(0, 8).map((row, i) => (
                    <li key={`${row.created_at}-${i}`}>
                      {row.delta_sats > 0 ? "+" : ""}
                      {Number(row.delta_sats).toLocaleString()} · {row.reason}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {user.has_key ? (
            <div className="intel-panel">
              <details className="intel-recover">
                <summary>API key for other MCP clients</summary>
                <p>
                  Streamable HTTP at the URL above. Send{" "}
                  <code>Authorization: Bearer</code> plus this key. Claude.ai
                  uses OAuth, not this key. A model provider key (OpenAI,
                  Anthropic) is a different secret.
                </p>
                <div className="hero-ctas intel-ctas">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onReveal}
                  >
                    Show API key
                  </button>
                </div>
                {key ? (
                  <>
                    <p className="intel-panel-label">API key</p>
                    <CopyField value={key} label="Copy key" />
                  </>
                ) : (
                  <p className="intel-status">
                    Snippets below use YOUR_API_KEY until you reveal the key.
                  </p>
                )}
                {status ? <p className="intel-status">{status}</p> : null}
                {snippets.map((snip) => (
                  <details key={snip.id} className="intel-mcp-client">
                    <summary>
                      {snip.title}
                      <span className="intel-plan-meta"> · {snip.where}</span>
                    </summary>
                    <p>{snip.note}</p>
                    <CopyField
                      value={snip.body}
                      label="Copy config"
                      multiline
                    />
                  </details>
                ))}
              </details>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="intel-split">
          <article className="intel-plan">
            <h3>Your profile</h3>
            <p className="intel-plan-blurb">
              GitHub or Nostr. A paid key is stored on this account.
            </p>
          </article>
          <div className="intel-panel">
            <AuthCard
              title="Sign in"
              returnPath="/account/"
              onNostr={onNostr}
              error={loginErr}
              busy={busy}
            />
          </div>
        </div>
      )}
      <p className="intel-plan-meta">
        Support: <Link href="/support/">contact form</Link>
        . Security:{" "}
        <a href="mailto:security@thebitcoincommons.org">
          security@thebitcoincommons.org
        </a>
        .
      </p>
    </IntelChrome>
  );
}
