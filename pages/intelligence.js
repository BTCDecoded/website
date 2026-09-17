import { useEffect, useState } from "react";
import Link from "next/link";
import { CORPUS } from "../lib/api";
import IntelChrome from "../components/IntelChrome";
import { consumeSessionFromHash, fetchMe } from "../lib/auth";

export default function IntelligencePage() {
  const [user, setUser] = useState(null);
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
  const signedIn = Boolean(user);
  const hasKey = Boolean(user?.has_key);

  return (
    <IntelChrome title="Intelligence" heading={false}>
      <article className="intel-hero">
        <div className="intel-hero__copy">
          <h2>The Bitcoin review record, searchable</h2>
          <p className="intel-hero__claim">
            {CORPUS.headline} passages, cited.
          </p>
          <p className="intel-hero__lede">
            Ask Claude over IRC, Bitcointalk, and the curated corpus. Hits
            name the passage. Pay Lightning. Connect with Claude’s four
            fields — name, MCP URL, OAuth client id, client secret. There is
            no API-key slot.
          </p>
          <div className="hero-ctas">
            {hasKey ? (
              <>
                <Link href="/account/" className="btn btn-primary">
                  Open Account
                </Link>
                <Link href="/pricing/" className="btn btn-secondary">
                  See plans
                </Link>
              </>
            ) : signedIn ? (
              <>
                <Link href="/subscribe/" className="btn btn-primary">
                  Checkout
                </Link>
                <Link href="/pricing/" className="btn btn-secondary">
                  See plans
                </Link>
              </>
            ) : (
              <>
                <Link href="/pricing/" className="btn btn-primary">
                  See plans
                </Link>
                <Link href="/account/" className="btn btn-secondary">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
        <ul className="intel-hero__facts" aria-label="Corpus at a glance">
          <li>
            <span className="intel-hero__k">Indexed</span>
            <span>{CORPUS.headline} passages</span>
          </li>
          <li>
            <span className="intel-hero__k">IRC</span>
            <span>{CORPUS.irc} lines</span>
          </li>
          <li>
            <span className="intel-hero__k">Forums</span>
            <span>{CORPUS.bitcointalk} Bitcointalk posts</span>
          </li>
          <li>
            <span className="intel-hero__k">Connect</span>
            <span>Claude MCP</span>
          </li>
        </ul>
      </article>

      <div className="intel-uses">
        <article>
          <h3>Cited search</h3>
          <p>Answers point at a passage in the record, not a bare summary.</p>
        </article>
        <article>
          <h3>Primary first</h3>
          <p>
            Trial is the curated ~5k. Paid search is ~700k, primary first.
          </p>
        </article>
        <article>
          <h3>PR review</h3>
          <p>Developer adds analyze_pr on public GitHub pull requests.</p>
        </article>
      </div>

      <ol className="intel-flow">
        <li>
          <span className="intel-flow__n">1</span>
          <div>
            <strong>Sign in</strong>
            <p>GitHub or Nostr.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">2</span>
          <div>
            <strong>Pay Lightning</strong>
            <p>Checkout. Upgrades keep the same key and charge the difference.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">3</span>
          <div>
            <strong>Connect Claude</strong>
            <p>Account copies name, MCP URL, client id, and client secret.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">4</span>
          <div>
            <strong>Ask</strong>
            <p>Search the record. Citations come back with the answer.</p>
          </div>
        </li>
      </ol>
    </IntelChrome>
  );
}
