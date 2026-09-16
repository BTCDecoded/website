import { useEffect, useState } from "react";
import Link from "next/link";
import { MCP_URL } from "../lib/api";
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
    <IntelChrome
      title={user ? "Account" : "Sign in"}
      lede={
        user
          ? "A paid key lives on this profile after checkout."
          : "Sign in, then buy a plan. Signing in does not issue a key."
      }
      narrow
    >
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
                ? "A paid key is stored on this profile. Reveal it to copy the key and connector URL."
                : "No key yet. Pick a plan and pay with Lightning."}
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
        <AuthCard title="" returnPath="/account/" onNostr={onNostr} error={loginErr} busy={busy} />
      )}
    </IntelChrome>
  );
}
