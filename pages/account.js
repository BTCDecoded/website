import { useEffect, useState } from "react";
import Link from "next/link";
import { MCP_URL } from "../lib/api";
import SignetNotice from "../components/SignetNotice";
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
        setStatus("No key on this profile. Pay on Subscribe while logged in.");
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
    <section className="section">
      <div className="container">
        <h2>Account</h2>
        <div className="content">
          <SignetNotice />
          {user === undefined ? (
            <p>Loading…</p>
          ) : user ? (
            <>
              <p>
                Signed in as <strong>{label}</strong>
                {user.github ? " (GitHub)" : ""}
                {user.nostr ? " (Nostr)" : ""}.
              </p>
              <p>
                Connector: <code>{MCP_URL}</code>
              </p>
              <p>
                {user.has_key
                  ? "A paid key is stored on this profile."
                  : "No key yet. Pay on Subscribe with testnet Lightning (not mainnet)."}
              </p>
              <p>
                <button type="button" className="btn btn-primary" onClick={onReveal}>
                  Show API key
                </button>{" "}
                <Link href="/subscribe/" className="btn btn-secondary">
                  Subscribe
                </Link>{" "}
                <button type="button" className="btn btn-secondary" onClick={onLogout}>
                  Log out
                </button>
              </p>
              {key ? (
                <p style={{ wordBreak: "break-all" }}>
                  API key: <code>{key}</code>
                </p>
              ) : null}
            </>
          ) : (
            <>
              <p>
                Sign in with GitHub or a Nostr profile (NIP-07 extension such as
                Alby or nos2x). Signing in does not issue a key. After you pay
                on testnet, the key is stored on this page.
              </p>
              <p>
                <a className="btn btn-primary" href={githubLoginUrl("/account")}>
                  Continue with GitHub
                </a>{" "}
                <button type="button" className="btn btn-secondary" onClick={onNostr}>
                  Continue with Nostr
                </button>
              </p>
            </>
          )}
          {status ? <p>{status}</p> : null}
        </div>
      </div>
    </section>
  );
}
