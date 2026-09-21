import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CORPUS,
  INDEX_CURATED,
  INDEX_OUT,
  INDEX_RECORD,
} from "../lib/api";
import IntelChrome from "../components/IntelChrome";
import IntelRecap from "../components/IntelRecap";
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
          <p className="intel-hero__kicker">BTCDecoded Intelligence</p>
          <h1>Bitcoin’s public coordination record, searchable.</h1>
          <p className="intel-hero__lede">
            Not a live price desk. Not chain analytics. Pay with Lightning.
            Connect over Model Context Protocol (MCP).
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
                <Link href="/docs/" className="btn btn-outline">
                  Docs
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
                <Link href="/docs/" className="btn btn-outline">
                  Docs
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
                <Link href="/docs/" className="btn btn-outline">
                  Docs
                </Link>
              </>
            )}
          </div>
        </div>
        <IntelRecap />
        <ul className="intel-hero__facts" aria-label="Corpus at a glance">
          <li>
            <span className="intel-hero__k">Curated {CORPUS.curatedShort}</span>
            <span>specs, maps, books, papers</span>
          </li>
          <li>
            <span className="intel-hero__k">Record {CORPUS.recordShort}</span>
            <span>IRC, lists, GitHub, forums, source</span>
          </li>
          <li>
            <span className="intel-hero__k">Pay</span>
            <span>Lightning</span>
          </li>
          <li>
            <span className="intel-hero__k">Connect</span>
            <span>Model Context Protocol (MCP)</span>
          </li>
        </ul>
      </article>

      <section className="intel-index" aria-labelledby="intel-index-heading">
        <h2 id="intel-index-heading">What’s in the index</h2>
        <p>
          Every plan searches both layers.{" "}
          <Link href="/pricing/">Plans</Link> differ by days, query cap,
          public-PR review, and Bearer automation tools.
        </p>
        <div className="intel-index__grid">
          <article>
            <h3>Curated ({CORPUS.curatedShort} passages)</h3>
            <ul>
              {INDEX_CURATED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Record ({CORPUS.recordShort} passages)</h3>
            <ul>
              {INDEX_RECORD.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <article className="intel-index__out">
          <h3>Not in the index</h3>
          <ul>
            {INDEX_OUT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

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
            <p>Sats in, access out. Same key on upgrade.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">3</span>
          <div>
            <strong>Connect</strong>
            <p>Model Context Protocol (MCP). Claude uses OAuth; others use a Bearer key.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">4</span>
          <div>
            <strong>Ask</strong>
            <p>The answer, with the source attached.</p>
          </div>
        </li>
      </ol>
    </IntelChrome>
  );
}
