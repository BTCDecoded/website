export default function WhyBLVM() {
  return (
    <section id="why-blvm" className="section">
      <div className="container">
        <h2>Why BLVM?</h2>
        <div className="content">
          <p className="section-lead">
            Bitcoin's consensus rules are scattered across hundreds of thousands
            of lines of C++. There's no single document that defines what "correct
            Bitcoin behavior" is — every alternative implementation rediscovers
            the rules by reading Core's source code and hoping they got it right.
            BLVM fixes that.
          </p>

          <div className="why-grid">
            <div className="why-card">
              <h3>One spec, many implementations</h3>
              <p>
                The Orange Paper is a formal mathematical specification of
                Bitcoin consensus extracted from Bitcoin Core. Instead of each
                node team guessing at the rules, they implement against the
                spec and prove compatibility. Divergence becomes detectable
                before it hits mainnet.
              </p>
            </div>

            <div className="why-card">
              <h3>Verified, not just tested</h3>
              <p>
                BLVM consensus code carries{" "}
                <code>#[spec_locked]</code> annotations that tie every
                consensus-critical function back to the Orange Paper section
                it implements. Z3 discharges proof obligations automatically.
                If the code drifts from the spec, CI catches it before
                merge.
              </p>
            </div>

            <div className="why-card">
              <h3>900,000+ blocks, zero divergence</h3>
              <p>
                BTCDecoded has been differentially tested against Bitcoin Core
                across the full mainnet history with no consensus divergence.
                Fuzzing in CI reaches edge cases that chain replay alone
                never exercises. That's the bar a second node needs to clear
                before it matters for network health.
              </p>
            </div>

            <div className="why-card">
              <h3>Governance you can fork</h3>
              <p>
                Bitcoin Commons governance publishes every rule: who can
                merge, what thresholds are required, how long review windows
                last. Cryptographic multisig enforces it. If you disagree
                with a rule you fork the governance, not the chain.
              </p>
            </div>

            <div className="why-card">
              <h3>Not a new coin</h3>
              <p>
                BLVM implements the same Bitcoin consensus rules as Bitcoin
                Core. Same chain, same UTXO set, same 21 million supply
                convergence — formally proven in Theorem 6.2.3. The goal
                is a safer, more diverse Bitcoin network, not a new one.
              </p>
            </div>

            <div className="why-card">
              <h3>Built for operators</h3>
              <p>
                Plug-and-play support for Start9, Umbrel, myNode, and
                Parmanode. Native desktop apps for Mac and Linux. The node
                path is designed so you don't need a Rust compiler to run
                a verified Bitcoin node.
              </p>
            </div>
          </div>

          <div className="why-ctas">
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
              Differential testing methodology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
