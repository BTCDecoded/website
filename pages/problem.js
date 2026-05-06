import Link from "next/link";

export default function ProblemContentPage() {
  return (
    <>
      <section id="problem" className="section">
        <div className="container">
          <h2>The Problem</h2>
          <div className="content problem-content">
            <p>
              Bitcoin proof-of-work consensus is one of the strongest systems
              ever deployed. Development governance for the dominant client has
              remained largely informal: concentrated maintainer discretion,
              limited cryptographic accountability, and high social cost if you
              disagree. That asymmetry (hard rules at the chain layer, soft
              process above it) is what Commons-style projects aim to address.
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
              <strong>BTCDecoded</strong> targets both: an Orange Paper-grade
              specification with a formally verified consensus path (Z3-backed
              spec-lock on blvm-consensus), plus the{" "}
              <a
                href="https://thebitcoincommons.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bitcoin Commons
              </a>{" "}
              model: published tiers, multisig thresholds, and enforcement
              tooling (blvm-commons) that users and operators can review or
              fork. Same Bitcoin rules; clearer rules for how the software that
              enforces them evolves.
            </p>
          </div>
        </div>
      </section>
      <section id="about-commons" className="section">
        <div className="container">
          <h2>Built on Bitcoin Commons</h2>
          <div className="content">
            <p>
              Forkable governance framework applying Ostrom&apos;s commons
              principles through cryptographic enforcement.
            </p>

            <div className="commons-cta">
              <Link href="/governance/" className="btn btn-primary">
                Our Governance
              </Link>
              <a
                href="https://thebitcoincommons.org"
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn About the Framework
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
