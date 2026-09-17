import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CORPUS,
  INDEX_CURATED,
  INDEX_OUT,
  INDEX_RECORD,
} from "../lib/api";
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
          <p className="intel-hero__kicker">Governance Intelligence</p>
          <h1>Bitcoin’s public coordination record, searchable.</h1>
          <p className="intel-hero__claim">
            IRC, mailing lists, GitHub, Delving, Bitcointalk, Satoshi, BIPs, and
            Core source — about {CORPUS.record} contemporaneous passages — plus a
            curated layer of specs, maps, and research ({CORPUS.curated}). Every
            hit names the source. Weak match comes back empty.
          </p>
          <p className="intel-hero__lede">
            Not price data. Not chain analytics. Lightning is the payment rail.
            Any MCP (Model Context Protocol) client.
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
            <span className="intel-hero__k">Curated {CORPUS.curatedShort}</span>
            <span>specs, maps, findings</span>
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
            <span>MCP</span>
          </li>
        </ul>
      </article>

      <div className="intel-uses">
        <article>
          <h3>Passages</h3>
          <p>
            A hit names the document, channel, date, and speaker when known. Weak
            match, or none, comes back empty.
          </p>
        </article>
        <article>
          <h3>Two layers</h3>
          <p>
            Trial is a week in the curated {CORPUS.curatedShort}. Paid search opens
            the {CORPUS.recordShort} record. Maps are analysis. Logs, mails, PRs,
            and source files are evidence.
          </p>
        </article>
        <article>
          <h3>PR review</h3>
          <p>
            Developer plan reads public GitHub pull requests against that same
            record (<code>analyze_pr</code>).
          </p>
        </article>
      </div>

      <section className="intel-index" aria-labelledby="intel-index-heading">
        <h2 id="intel-index-heading">What’s in the index</h2>
        <p>
          Paid plans search the full record. The trial searches the curated layer
          only.
        </p>
        <div className="intel-index__grid">
          <article>
            <h3>Curated ({CORPUS.curatedShort})</h3>
            <ul>
              {INDEX_CURATED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Full record ({CORPUS.recordShort})</h3>
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
            <p>
              The answer, with the source attached. Analysis is labeled as
              analysis.
            </p>
          </div>
        </li>
      </ol>

      <section className="intel-who" aria-labelledby="intel-who-heading">
        <h2 id="intel-who-heading">Who this is for</h2>
        <ul>
          <li>
            Protocol and client developers checking a claim against the written
            and spoken public record
          </li>
          <li>
            Journalists and researchers reconstructing who said what, in which
            channel, on which date
          </li>
          <li>
            Reviewers comparing a public PR to prior objections and to spec text
          </li>
          <li>
            Historians and counsel who need contemporaneous sources, not recaps
          </li>
        </ul>
        <p>Not for: spot-price desks, ETF flow pieces, chain surveillance.</p>
      </section>

      <p className="intel-disclose">
        Built by BTCDecoded on the Bitcoin Commons stack. The full record is
        public primary material (IRC, lists, GitHub, forums, source, Satoshi,
        BIPs). Governance maps, findings, and argument assessments are research
        from that same project (see secsov.com / Bitcoin Governance Research).
        Treat them as analysis, not as the record.{" "}
        <a href="/intelligence/llms.txt">Agent spec</a>.
      </p>
    </IntelChrome>
  );
}
