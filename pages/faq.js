import Link from "next/link";

const faqs = [
  {
    q: "Will I stay in consensus with the Bitcoin network?",
    a: "Yes. This node implements the same consensus rules as Bitcoin Core: same chain, same UTXO set. Consensus-critical functions are bound to the Orange Paper (spec-lock, Z3 in CI). Compatibility is checked in layers — property tests, libFuzzer, golden vectors, and a differential against Core / libbitcoinkernel — not by a single block-count slogan.",
  },
  {
    q: "How does this help decentralize Bitcoin?",
    a: "Bitcoin’s network currently relies on one dominant implementation. A serious second full node with independent consensus coverage makes the network more resilient. BLVM provides the shared formal spec that makes safe alternatives practical without each team reverse-engineering consensus rules from C++.",
  },
  {
    q: "What if there is a bug in my node?",
    a: "Treat it like any other full node: review the software before you put real funds on it. Spec-lock runs in CI; the test suite includes property tests, fuzzing, golden vectors, and a Core differential. Report security issues to security@thebitcoincommons.org. Coordinated releases for consensus bugs still go through the published governance process.",
  },
  {
    q: "Is this a fork of Bitcoin?",
    a: "No. BTCDecoded does not fork Bitcoin’s blockchain, change its consensus rules, or introduce a new coin. It implements the same rules, formally specified in the Orange Paper. The goal is a second reference-grade full node on the existing Bitcoin network.",
  },
  {
    q: "Do I need technical knowledge to run a node?",
    a: "Not necessarily. Current packages are on the Install page (GitHub Releases, with checksums). Marketplace installs for Start9, Umbrel, myNode, and Parmanode are coming. Building from source is documented separately for developers.",
  },
  {
    q: "How does governance work?",
    a: "Bitcoin Commons governance is published, tiered, and cryptographically enforced. Every rule — who can merge, what signature thresholds are required, how long review windows last — is in a public repository. If you disagree with a rule you fork the governance document, not the chain.",
  },
  {
    q: "What is Commons Pool?",
    a: "Commons Pool is BTCDecoded’s mining pool: no operator, no pool wallet, no KYC. Coinbase outputs pay miner addresses from a shared snapshot of work. It runs on BLVM. Signet today; not on mainnet. Site: commonspool.org.",
  },
  {
    q: "How can I fund the project?",
    a: "Through Plebly (plebly.fund): on-chain escrow, not a custodial tip jar. Fund a listed Commons proposal, or donate to Commons directly.",
  },
  {
    q: "Where do I get support?",
    a: (
      <>
        The{" "}
        <Link href="/support/">Support</Link> form for Intelligence billing,
        keys, and checkout, and for node questions that are not a security
        report. Security issues go to{" "}
        <a href="mailto:security@thebitcoincommons.org">
          security@thebitcoincommons.org
        </a>
        . Node docs: docs.thebitcoincommons.org.
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">The node</p>
          <h1>FAQ</h1>
          <p className="page-lede">
            Running a node, staying on the Bitcoin chain, and how the software
            is checked.{" "}
            <a
              href="https://thebitcoincommons.org/#faq"
              target="_blank"
              rel="noopener"
            >
              Commons-level FAQ
            </a>
            .
          </p>
        </header>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="home-ctas why-ctas">
          <Link href="/install/" className="btn btn-primary">
            Install
          </Link>
          <Link href="/whyblvm/" className="btn btn-outline">
            Why BLVM?
          </Link>
        </div>
      </div>
    </section>
  );
}
