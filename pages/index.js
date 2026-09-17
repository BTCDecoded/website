import Link from "next/link";
import { blvmDisplayTag } from "../lib/blvmReleaseMeta";

export default function IndexPage() {
  return (
    <>
      <div className="release-banner">
        <span className="release-banner-badge">{blvmDisplayTag}</span>
        <span className="release-banner-text">
          Latest release.{" "}
          <a href="https://btcdecoded.org/install/">install →</a>
        </span>
      </div>

      <section className="intel-feature intel-feature--home" aria-labelledby="intel-feature-heading">
        <div className="container">
          <article className="intel-hero">
            <div className="intel-hero__copy">
              <p className="intel-hero__kicker">BTCDecoded Intelligence</p>
              <h1 id="intel-feature-heading">
                Bitcoin’s public coordination record, searchable.
              </h1>
              <p className="intel-hero__lede">
                Cited search over IRC, mailing lists, GitHub, and source. Pay
                with Lightning.
              </p>
              <div className="hero-ctas">
                <Link href="/subscribe/?plan=trial" className="btn btn-primary">
                  Start trial
                </Link>
                <Link href="/intelligence/" className="btn btn-secondary">
                  See Intelligence
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="fund-feature" aria-labelledby="node-heading">
        <div className="container">
          <article className="fund-panel">
            <p className="fund-kicker">The node</p>
            <h2 id="node-heading">BLVM still ships here</h2>
            <p className="fund-lede">
              A Bitcoin full node with the consensus rules written down. Same
              chain as Bitcoin Core — not a new coin. Spec-lock, Orange Paper,
              verified downloads.
            </p>
            <div className="fund-ctas">
              <a
                href="https://btcdecoded.org/install/"
                className="btn btn-primary"
              >
                Download {blvmDisplayTag}
              </a>
              <Link href="/whyblvm/" className="btn btn-secondary">
                Why BLVM?
              </Link>
              <a
                href="https://thebitcoincommons.org/orange-paper.html"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Orange Paper
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="cp-feature" aria-labelledby="cp-feature-heading">
        <div className="container">
          <article className="cp-panel">
            <div className="cp-panel__copy">
              <p className="cp-kicker">Also from BTCDecoded</p>
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
    </>
  );
}
