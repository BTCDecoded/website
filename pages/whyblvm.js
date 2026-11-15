const GATES = [
  ["Full chain", "unknown"],
  ["Spec lock", "met"],
  ["Tests", "met"],
  ["Genesis", "met"],
  ["Crash", "met"],
  ["Bounds", "open"],
  ["Artifacts", "met"],
  ["Soak", "open"],
  ["Security", "open"],
  ["Version", "open"],
  ["Minimal", "open"],
];

const GATE_WORD = { met: "Cleared", open: "Open", unknown: "Unknown" };

export default function WhyBLVM() {
  return (
    <section id="why-blvm" className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">The node</p>
          <h1>Why BLVM?</h1>
          <p className="page-lede">
            Bitcoin’s consensus rules are scattered across hundreds of thousands
            of lines of C++. There is no single document for “correct Bitcoin
            behavior.” Every alternative rediscovers the rules from Core’s
            source and hopes they got it right. BLVM fixes that.
          </p>
        </header>

        <div className="gate-board">
          <p className="gate-kicker">The beta run</p>
          <p className="gate-lede">
            Eleven gates. Cleared means the proof is in.
          </p>
          <ol className="gate-track">
            {GATES.map(([name, state], index) => (
              <li key={name} data-state={state}>
                <span className="gate-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="gate-name">{name}</span>
                <span className="gate-state">{GATE_WORD[state]}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <h3>One spec, many implementations</h3>
            <p>
              The Orange Paper is a formal mathematical specification of
              Bitcoin consensus extracted from Bitcoin Core. Instead of each
              node team guessing at the rules, they implement against the spec
              and prove compatibility. Divergence becomes detectable before it
              hits mainnet.
            </p>
          </div>

          <div className="why-card">
            <h3>Verified, not just tested</h3>
            <p>
              Annotated consensus functions carry <code>#[spec_locked]</code>{" "}
              ties to Orange Paper sections. CI runs Z3 on those annotations.
            </p>
          </div>

          <div className="why-card">
            <h3>Checked against Core, in layers</h3>
            <p>
              A single chain replay is not enough. Compatibility is exercised
              by property tests, libFuzzer on consensus, protocol, and node,
              golden vectors from mainnet wire bytes and Core script fixtures,
              and a differential against Bitcoin Core / libbitcoinkernel. Each
              layer is meant to catch a different class of mistake.
            </p>
          </div>

          <div className="why-card">
            <h3>Governance you can fork</h3>
            <p>
              Bitcoin Commons publishes who can merge, which thresholds apply,
              and how long review windows last. The rules are in a public
              repository. If you disagree with a rule you fork that repository,
              not the chain.
            </p>
          </div>

          <div className="why-card">
            <h3>Not a new coin</h3>
            <p>
              BLVM implements the same Bitcoin consensus rules as Bitcoin
              Core. Same chain, same UTXO set. Theorem 6.2.3 in the Orange
              Paper states supply convergence. The goal is another
              implementation of Bitcoin, not a new coin.
            </p>
          </div>

          <div className="why-card">
            <h3>Built for operators</h3>
            <p>
              Packaged installs on GitHub Releases. Marketplace packages for
              Start9, Umbrel, myNode, and Parmanode are coming. You should not
              need a Rust compiler to run this node.
            </p>
          </div>
        </div>

        <div className="home-ctas why-ctas">
          <a
            href="https://thebitcoincommons.org/orange-paper.html"
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
          >
            Read the Orange Paper
          </a>
          <a href="/install/" className="btn btn-outline">
            Install
          </a>
          <a
            href="https://docs.btcdecoded.org/blvm/development/differential-testing.html"
            className="btn btn-outline"
            target="_blank"
            rel="noopener"
          >
            How testing is layered
          </a>
        </div>
      </div>
    </section>
  );
}
