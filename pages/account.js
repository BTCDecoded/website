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

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [key, setKey] = useState("");
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
      setStatus(data.expires_at ? `Expires ${data.expires_at}` : "");
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

  return (
    <IntelChrome title={user ? "Account" : "Sign in"}>
      <div className="intel-split">
        {user ? (
          <>
            <div className="auth-session">
              <span className="auth-session__avatar" aria-hidden="true">
                {initial}
              </span>
              <div className="auth-session__who">
                <p className="auth-session__name">{label}</p>
                <p className="auth-session__meta">{provider}</p>
              </div>
              <button
                type="button"
                className="auth-session__out"
                onClick={onLogout}
              >
                Sign out
              </button>
            </div>

            <div className="intel-panel">
              <p className="intel-panel-label">Intelligence key</p>
              <p>
                {user.has_key
                  ? "Reveal to copy the key and connector URL."
                  : "No key yet."}
              </p>
              <div className="hero-ctas intel-ctas">
                {user.has_key ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onReveal}
                  >
                    Show API key
                  </button>
                ) : (
                  <Link href="/pricing/" className="btn btn-primary">
                    See plans
                  </Link>
                )}
              </div>
              {key ? (
                <>
                  <p className="intel-panel-label">API key</p>
                  <CopyField value={key} label="Copy key" />
                  <p className="intel-panel-label">MCP URL</p>
                  <CopyField value={MCP_URL} label="Copy MCP URL" />
                </>
              ) : null}
              {status ? <p className="intel-status">{status}</p> : null}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {!user && key ? (
        <div className="intel-panel">
          <p className="intel-panel-label">API key</p>
          <CopyField value={key} label="Copy key" />
          <p className="intel-panel-label">MCP URL</p>
          <CopyField value={MCP_URL} label="Copy MCP URL" />
        </div>
      ) : null}
      {!user && status ? <p className="intel-status">{status}</p> : null}

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
    </IntelChrome>
  );
}
