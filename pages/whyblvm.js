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
              BLVM consensus code carries <code>#[spec_locked]</code>{" "}
              annotations that tie every consensus-critical function back to
              the Orange Paper section it implements. Z3 discharges proof
              obligations automatically. If the code drifts from the spec, CI
              catches it before merge.
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
              Bitcoin Commons governance publishes every rule: who can merge,
              what thresholds are required, how long review windows last.
              Cryptographic multisig enforces it. If you disagree with a rule
              you fork the governance, not the chain.
            </p>
          </div>

          <div className="why-card">
            <h3>Not a new coin</h3>
            <p>
              BLVM implements the same Bitcoin consensus rules as Bitcoin
              Core. Same chain, same UTXO set, same 21 million supply
              convergence — formally proven in Theorem 6.2.3. The goal is a
              safer, more diverse Bitcoin network, not a new one.
            </p>
          </div>

          <div className="why-card">
            <h3>Built for operators</h3>
            <p>
              Packaged installs on GitHub Releases. Marketplace packages for
              Start9, Umbrel, myNode, and Parmanode are coming. You should not
              need a Rust compiler to run a verified Bitcoin node.
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
          <a
            href="https://docs.thebitcoincommons.org/development/differential-testing.html"
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
