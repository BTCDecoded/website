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
          <h2>The Bitcoin review record, on call</h2>
          <p className="intel-hero__claim">
            Curated findings first. {CORPUS.headline} passages behind them.
          </p>
          <p className="intel-hero__lede">
            Specs, maps, and the arguments that got written down — indexed so
            a hit names the passage. Paid search opens the rest of the archive.
            Lightning. Any MCP client.
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
                <Link href="/subscribe/?plan=trial" className="btn btn-primary">
                  Start trial
                </Link>
                <Link href="/pricing/" className="btn btn-secondary">
                  See plans
                </Link>
              </>
            )}
          </div>
        </div>
        <ul className="intel-hero__facts" aria-label="Corpus at a glance">
          <li>
            <span className="intel-hero__k">Curated</span>
            <span>Findings, specs, maps</span>
          </li>
          <li>
            <span className="intel-hero__k">Indexed</span>
            <span>{CORPUS.headline} passages</span>
          </li>
          <li>
            <span className="intel-hero__k">Pay</span>
            <span>Lightning</span>
          </li>
          <li>
            <span className="intel-hero__k">Connect</span>
            <span>MCP</span>
          </li>
        </ul>
      </article>

      <div className="intel-uses">
        <article>
          <h3>Passages</h3>
          <p>A hit names the document in the index. Weak match, or none, comes back empty.</p>
        </article>
        <article>
          <h3>Primary first</h3>
          <p>
            Trial is a week in the curated ~5k. Paid is ~700k, written record first.
          </p>
        </article>
        <article>
          <h3>PR review</h3>
          <p>Developer reads public GitHub pull requests against that same record.</p>
        </article>
      </div>

      <ol className="intel-flow">
        <li>
          <span className="intel-flow__n">1</span>
          <div>
            <strong>Sign in</strong>
            <p>GitHub or Nostr. One login owns the key.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">2</span>
          <div>
            <strong>Pay Lightning</strong>
            <p>Sats in, access out. Upgrades keep the same key.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">3</span>
          <div>
            <strong>Connect</strong>
            <p>MCP. Claude uses OAuth; Cursor and others use a Bearer key.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">4</span>
          <div>
            <strong>Ask</strong>
            <p>The written argument, with the passage attached.</p>
          </div>
        </li>
      </ol>
    </IntelChrome>
  );
}
