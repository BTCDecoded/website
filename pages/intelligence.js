import Link from "next/link";
import { CORPUS } from "../lib/api";
import IntelChrome from "../components/IntelChrome";

export default function IntelligencePage() {
  return (
    <IntelChrome title="Intelligence" heading={false}>
      <article className="intel-hero">
        <div className="intel-hero__copy">
          <h2>The Bitcoin review record, searchable</h2>
          <p className="intel-hero__claim">
            {CORPUS.headline} passages from the public review history — cited,
            not dumped.
          </p>
          <p className="intel-hero__lede">
            Trial searches the curated ~5k. Researcher and Developer search
            nearly 700k, primary-first. You sign in, pay Lightning, then connect
            Claude with a key. Not a merge check. Not a download of the archives.
          </p>
          <div className="hero-ctas">
            <Link href="/pricing/" className="btn btn-primary">
              See plans
            </Link>
            <Link href="/account/" className="btn btn-secondary">
              Sign in
            </Link>
          </div>
        </div>
        <ul className="intel-hero__facts" aria-label="Corpus at a glance">
          <li>
            <span className="intel-hero__k">Indexed</span>
            <span>{CORPUS.headline} passages</span>
          </li>
          <li>
            <span className="intel-hero__k">IRC</span>
            <span>{CORPUS.irc} lines of review chat</span>
          </li>
          <li>
            <span className="intel-hero__k">Forums</span>
            <span>{CORPUS.bitcointalk} Bitcointalk posts</span>
          </li>
          <li>
            <span className="intel-hero__k">Pay</span>
            <span>Lightning, then a private key</span>
          </li>
        </ul>
      </article>

      <ol className="intel-flow">
        <li>
          <span className="intel-flow__n">1</span>
          <div>
            <strong>Sign in</strong>
            <p>
              GitHub or Nostr. A profile is required before an invoice. Signing
              in does not issue a key.
            </p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">2</span>
          <div>
            <strong>Pick a plan</strong>
            <p>
              Trial is the curated ~5k. Researcher is ~700k, primary-first.
              Developer adds an advisory PR scaffold.
            </p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">3</span>
          <div>
            <strong>Pay Lightning</strong>
            <p>On-chain checkout is off. The key is stored on your account.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">4</span>
          <div>
            <strong>Connect</strong>
            <p>
              Copy the key and connector URL from Account into Claude (or any
              Streamable HTTP client). The URL is not shown until you have a key.
            </p>
          </div>
        </li>
      </ol>
    </IntelChrome>
  );
}
