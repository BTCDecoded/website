import Link from "next/link";
import { blvmDisplayTag } from "../lib/blvmReleaseMeta";
import { CORPUS } from "../lib/api";

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
            A Bitcoin full node with the consensus rules written down
          </p>
          <p className="hero-lead">
            Same chain as Bitcoin Core — not a new coin.{" "}
            <a
              href="https://thebitcoincommons.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin Commons
            </a>{" "}
            is the written rules (Orange Paper + CONSENSUS_SPEC) and forkable
            governance. BLVM is the first implementation of those rules, shipped
            by BTCDecoded — not part of Commons itself. You can run the node,
            read the spec, or fork the published governance.
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
            <Link href="/intelligence/" className="btn btn-outline">
              Intelligence
            </Link>
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

      <section className="fund-feature" aria-labelledby="fund-heading">
        <div className="container">
          <article className="fund-panel">
            <p className="fund-kicker">Fund the work</p>
            <h2 id="fund-heading">Donate through Plebly</h2>
            <p className="fund-lede">
              Plebly lists public Bitcoin development work and takes donations
              into on-chain escrow — not a custodial tip jar. Fund a listed
              Commons proposal, or donate to Commons directly.
            </p>
            <div className="fund-ctas">
              <a
                href="https://plebly.fund/#projects"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fund a listed proposal
              </a>
              <a
                href="https://plebly.fund/?type=direct#projects"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Donate to Commons
              </a>
              <a
                href="https://plebly.fund/about"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                How Plebly works
              </a>
            </div>
          </article>
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

      <section className="intel-feature" aria-labelledby="intel-feature-heading">
        <div className="container">
          <article className="intel-hero">
            <div className="intel-hero__copy">
              <p className="intel-hero__kicker">BTCDecoded Intelligence</p>
              <h2 id="intel-feature-heading">
                {CORPUS.headline} passages of Bitcoin review history
              </h2>
              <p className="intel-hero__lede">
                Sign in, pay Lightning, connect Claude.
              </p>
              <div className="hero-ctas">
                <Link href="/intelligence/" className="btn btn-primary">
                  See Intelligence
                </Link>
                <Link href="/pricing/" className="btn btn-secondary">
                  Plans
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
                <span>{CORPUS.irc} review-chat lines</span>
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
        </div>
      </section>
    </>
  );
}
