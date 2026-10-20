import Link from "next/link";

export default function ProblemContentPage() {
  return (
    <>
      <section id="problem" className="section">
        <div className="container">
          <header className="page-head">
            <p className="page-kicker">The project</p>
            <h1>Problem</h1>
            <p className="page-lede">
              Bitcoin’s chain rules are hard to change. How the dominant client
              is governed is mostly informal: a small group of maintainers,
              little cryptographic accountability, and a high social cost if
              you disagree.
            </p>
          </header>
          <div className="content problem-content">
            <p>
              Hard rules on the chain, soft process above it — that gap is
              what this project is for.
            </p>
            <p>
              Alternative implementations face two hard requirements. First,{" "}
              <strong>correctness</strong>: without a shared mathematical
              specification tied to code, consensus divergence is a matter of
              when, not if. Second, <strong>coordination</strong>: without
              governance you can fork and audit, informal power recentralizes
              around whichever client wins the narrative.
            </p>
            <p>
              <strong>BTCDecoded</strong> targets both: an Orange Paper
              specification, with spec-lock annotations on blvm-consensus
              checked by Z3 in CI, plus the{" "}
              <a
                href="https://thebitcoincommons.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bitcoin Commons
              </a>{" "}
              model: published tiers and multisig thresholds in a public
              repository. blvm-commons holds the GitHub App client. Merge
              enforcement is off. Same Bitcoin rules, with the process written
              down so it can be reviewed or forked.
            </p>
          </div>
        </div>
      </section>
      <section id="about-commons" className="section">
        <div className="container">
          <header className="page-head">
            <p className="page-kicker">The commons</p>
            <h2>Built on Bitcoin Commons</h2>
            <p className="page-lede">
              Forkable governance applying Ostrom’s commons principles through
              cryptographic enforcement.
            </p>
          </header>
          <div className="home-ctas">
            <Link href="/governance/" className="btn btn-primary">
              Governance
            </Link>
            <a
              href="https://thebitcoincommons.org"
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin Commons
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
