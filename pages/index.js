import Link from "next/link";
import {
  blvmDisplayTag,
} from "../lib/blvmReleaseMeta";

export default function IndexPage() {
  return (
    <>
      <div className="release-banner">
        <span className="release-banner-badge">{blvmDisplayTag}</span>
        <span className="release-banner-text">
          Latest release.{" "}
          <a
            href="https://btcdecoded.org/install/"
          >
            install →
          </a>
        </span>
      </div>

      <section id="hero" className="hero">
        <div className="container">
          <h1>BTCDecoded</h1>
          <p className="tagline">
            Bitcoin Decoded: shared specification, verified consensus, forkable
            governance
          </p>
          <p className="hero-lead">
            First full implementation of{" "}
            <a
              href="https://thebitcoincommons.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin Commons
            </a>
            : the Orange Paper (blvm-spec), formally checked consensus
            (blvm-consensus + blvm-spec-lock), a node and SDK path, and
            governance rules you can inspect or fork. Not a new coin: a new way
            to build and coordinate on Bitcoin.
          </p>

          <div className="hero-ctas">
            <a
              href="https://btcdecoded.org/install/"
              className="btn btn-primary"
            >
              Download {blvmDisplayTag}
            </a>
            <a
              href="https://docs.thebitcoincommons.org"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <Link href="/architecture/" className="btn btn-secondary">
              Explore Repositories
            </Link>
            <a
              href="https://thebitcoincommons.org/orange-paper.html"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the Orange Paper
            </a>
          </div>

          <div className="hero-subscribe">
            <p className="hero-subscribe-label">
              Get release notes and updates:
            </p>
            <iframe
              src="https://btccommons.substack.com/embed"
              width="100%"
              height="150"
              style={{ border: "none", background: "transparent" }}
              frameBorder="0"
              scrolling="no"
              title="Subscribe to Bitcoin Commons on Substack"
            />
          </div>
        </div>
      </section>

      <section className="cp-feature" aria-labelledby="cp-feature-heading">
        <div className="container">
          <article className="cp-panel">
            <div className="cp-panel__copy">
              <p className="cp-kicker">Built by BTCDecoded</p>
              <h2 id="cp-feature-heading">Commons Pool</h2>
              <p className="cp-claim">Mine without handing anyone your coins.</p>
              <p className="cp-lede">
                When the pool finds a block, the coinbase already pays your
                address. No pool wallet. No KYC. Same Bitcoin — on the BLVM
                stack.
              </p>
              <div className="cp-ctas">
                <a
                  href="https://commonspool.org"
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the pool
                </a>
                <a
                  href="https://commonspool.org/architecture.html"
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How it works
                </a>
              </div>
            </div>
            <ul className="cp-facts" aria-label="Commons Pool at a glance">
              <li>
                <span className="cp-facts__k">Payouts</span>
                <span>Straight from the coinbase</span>
              </li>
              <li>
                <span className="cp-facts__k">Custody</span>
                <span>None. Ever.</span>
              </li>
              <li>
                <span className="cp-facts__k">Network</span>
                <span>Signet today</span>
              </li>
              <li>
                <span className="cp-facts__k">Stack</span>
                <span>BLVM and Bitcoin Commons</span>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
