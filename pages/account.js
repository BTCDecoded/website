import { useEffect, useState } from "react";
import Link from "next/link";
import { MCP_URL } from "../lib/api";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";
import {
  consumeSessionFromHash,
  fetchAccountKey,
  fetchMe,
  githubLoginUrl,
  loginWithNostr,
  logout,
} from "../lib/auth";

export default function AccountPage() {
  const [user, setUser] = useState(undefined);
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("");

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
      if (!cancelled) await refresh();
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onNostr() {
    setStatus("");
    try {
      await loginWithNostr();
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : String(err));
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
  }

  const label =
    user?.github_name ||
    (user?.github ? `@${user.github}` : null) ||
    user?.nostr_name ||
    (user?.nostr ? `nostr:${user.nostr.slice(0, 8)}…` : null) ||
    user?.id;

  return (
    <IntelChrome
      title="Account"
      lede="Sign in to keep a paid key on this profile. Signing in does not issue a key by itself."
    >
      {user === undefined ? (
        <p>Loading…</p>
      ) : user ? (
        <div className="intel-panel">
          <p>
            Signed in as <strong>{label}</strong>
            {user.github ? " · GitHub" : ""}
            {user.nostr ? " · Nostr" : ""}.
          </p>
          <p className="intel-panel-label">MCP URL</p>
          <CopyField value={MCP_URL} />
          <p>
            {user.has_key
              ? "A paid key is stored on this profile."
              : "No key yet. Continue to checkout after you pick a plan."}
          </p>
          <div className="hero-ctas intel-ctas">
            <button type="button" className="btn btn-primary" onClick={onReveal}>
              Show API key
            </button>
            <Link href="/pricing/" className="btn btn-secondary">
              Pricing
            </Link>
            <button type="button" className="btn btn-secondary" onClick={onLogout}>
              Log out
            </button>
          </div>
          {key ? <CopyField value={key} label="Copy key" /> : null}
        </div>
      ) : (
        <div className="intel-panel">
          <p>
            GitHub or a Nostr extension (Alby, nos2x). Then choose a plan and
            pay on checkout.
          </p>
          <div className="hero-ctas intel-ctas">
            <a className="btn btn-primary" href={githubLoginUrl("/account/")}>
              Continue with GitHub
            </a>
            <button type="button" className="btn btn-secondary" onClick={onNostr}>
              Continue with Nostr
            </button>
          </div>
        </div>
      )}
      {status ? <p className="intel-status">{status}</p> : null}
    </IntelChrome>
  );
}
