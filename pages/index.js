import Link from "next/link";
import { blvmDisplayTag } from "../lib/blvmReleaseMeta";
import IntelRecap from "../components/IntelRecap";

export default function IndexPage() {
  return (
    <>
      <section className="intel-feature intel-feature--home" aria-labelledby="intel-feature-heading">
        <div className="container">
          <article className="intel-hero">
            <div className="intel-hero__copy">
              <p className="intel-hero__kicker">The index</p>
              <h1 id="intel-feature-heading">Intelligence</h1>
              <p className="intel-hero__claim">
                Bitcoin’s public coordination record, searchable.
              </p>
              <p className="intel-hero__lede">
                Cited search over IRC, mailing lists, GitHub, project-repo
                discussions, Core announcements, podcast transcripts, source,
                and academic papers.
                Pay with Lightning.
              </p>
              <div className="home-ctas">
                <Link href="/subscribe/?plan=trial" className="btn btn-primary">
                  Start trial
                </Link>
                <Link href="/intelligence/" className="btn btn-secondary">
                  See Intelligence
                </Link>
                <a
                  href="https://docs.btcdecoded.org/intelligence/"
                  className="btn btn-outline"
                >
                  Docs
                </a>
              </div>
            </div>
            <IntelRecap />
            <ul className="intel-hero__facts" aria-label="Intelligence at a glance">
              <li>
                <span className="intel-hero__k">Sources</span>
                <span>IRC, lists, GitHub, project repos, Core announcements, papers, source</span>
              </li>
              <li>
                <span className="intel-hero__k">Pay</span>
                <span>Lightning</span>
              </li>
              <li>
                <span className="intel-hero__k">Access</span>
                <span>Trial through Developer</span>
              </li>
              <li>
                <span className="intel-hero__k">Connect</span>
                <span>Search and Model Context Protocol (MCP)</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="fund-feature" aria-labelledby="node-heading">
        <div className="container">
          <article className="fund-panel">
            <p className="fund-kicker">The node</p>
            <h2 id="node-heading">BLVM</h2>
            <p className="fund-lede">
              A Bitcoin full node with the consensus rules written down. Same
              chain as Bitcoin Core — not a new coin. Spec-lock, Orange Paper,
              verified downloads.
            </p>
            <div className="home-ctas">
              <Link href="/install/" className="btn btn-primary">
                Download {blvmDisplayTag}
              </Link>
              <Link href="/whyblvm/" className="btn btn-secondary">
                Why BLVM?
              </Link>
              <a
                href="https://docs.btcdecoded.org/blvm/"
                className="btn btn-outline"
              >
                Manual
              </a>
            </div>
            <p className="release-note">
              <span className="release-note__badge">{blvmDisplayTag}</span>
              <span>
                Latest release.{" "}
                <Link href="/install/">install →</Link>
              </span>
            </p>
          </article>
        </div>
      </section>

      <section className="fund-feature" aria-labelledby="fund-heading">
        <div className="container">
          <article className="fund-panel">
            <p className="fund-kicker">The Funding</p>
            <h2 id="fund-heading">Plebly</h2>
            <p className="fund-lede">
              Plebly lists public Bitcoin development work and takes donations
              into on-chain escrow — not a custodial tip jar. Fund a listed
              Commons proposal, or donate to Commons directly.
            </p>
            <div className="home-ctas">
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
