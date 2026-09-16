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
            {CORPUS.headline} passages, cited.
          </p>
          <p className="intel-hero__lede">
            Sign in, pay Lightning, connect Claude.
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
            <span>{CORPUS.irc} lines</span>
          </li>
          <li>
            <span className="intel-hero__k">Forums</span>
            <span>{CORPUS.bitcointalk} Bitcointalk posts</span>
          </li>
          <li>
            <span className="intel-hero__k">Pay</span>
            <span>Lightning</span>
          </li>
        </ul>
      </article>

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
            <strong>Pick a plan</strong>
            <p>Trial ~5k. Researcher ~700k. Developer adds PR review.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">3</span>
          <div>
            <strong>Pay Lightning</strong>
            <p>The key is stored on your account.</p>
          </div>
        </li>
        <li>
          <span className="intel-flow__n">4</span>
          <div>
            <strong>Connect</strong>
            <p>Paste the key into Claude from Account.</p>
          </div>
        </li>
      </ol>
    </IntelChrome>
  );
}
