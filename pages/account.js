import { useEffect, useState } from "react";
import Link from "next/link";
import { MCP_URL, WORKER_ORIGIN } from "../lib/api";
import AuthCard from "../components/AuthCard";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";
import {
  consumeSessionFromHash,
  fetchAccountKey,
  fetchMe,
  loginWithNostr,
  logout,
} from "../lib/auth";

const CONNECTOR_NAME = "BTCDecoded Intelligence";

function tierLabel(tier) {
  if (tier === "developer") return "Developer";
  if (tier === "trial") return "Trial";
  if (tier === "researcher") return "Researcher";
  return "";
}

function expiryLabel(iso) {
  if (!iso) return "";
  const day = String(iso).slice(0, 10);
  return day ? `until ${day}` : "";
}

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState("");
  const [connector, setConnector] = useState(null);
  const [status, setStatus] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [recoverInput, setRecoverInput] = useState("");
  const [recoverBusy, setRecoverBusy] = useState(false);

  async function refresh() {
    try {
      setUser(await fetchMe());
    } catch {
      setUser(null);
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
      setStatus(data.expires_at ? `Expires ${String(data.expires_at).slice(0, 10)}` : "");
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
    setUser(null);
    setStatus("");
  }

  async function recoverKey() {
    setRecoverBusy(true);
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
      setStatus("Recovered.");
    } catch {
      setStatus("Could not reach the Worker.");
    } finally {
      setRecoverBusy(false);
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
  const mcpUrl = connector?.mcp || MCP_URL;
  const clientId = connector?.oauth_client_id || "";
  const clientSecret = connector?.oauth_client_secret || "";
  const connectorName = connector?.connector_name || CONNECTOR_NAME;

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

          {user.has_key ? (
            <div className="intel-panel">
              <details className="intel-recover">
                <summary>API key for other MCP clients</summary>
                <p>
                  Cursor and raw HTTP use a Bearer key. Claude does not.
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
                ) : null}
                {status ? <p className="intel-status">{status}</p> : null}
              </details>
            </div>
          ) : null}

          <div className="intel-panel">
            <details className="intel-recover">
              <summary>Lost the key after paying?</summary>
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
                disabled={recoverBusy}
              >
                Recover API key
              </button>
            </details>
          </div>
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

      {!user && key ? (
        <div className="intel-panel">
          <p className="intel-panel-label">API key</p>
          <CopyField value={key} label="Copy key" />
          <p className="intel-panel-label">MCP URL</p>
          <CopyField value={MCP_URL} label="Copy MCP URL" />
        </div>
      ) : null}
      {!user && status ? <p className="intel-status">{status}</p> : null}
    </IntelChrome>
  );
}
