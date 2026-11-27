const GATES = [
  ["Full chain", "met"],
  ["Spec lock", "met"],
  ["Tests", "met"],
  ["Genesis", "met"],
  ["Crash", "met"],
  ["Bounds", "met"],
  ["Artifacts", "met"],
  ["Soak", "open"],
  ["Security", "met"],
  ["Version", "met"],
  ["Minimal", "met"],
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
            <h3>The Orange Paper</h3>
            <p>
              The written consensus rules, extracted from how Bitcoin Core
              behaves. Implementations target that document.{" "}
              <a
                href="https://thebitcoincommons.org/orange-paper.html"
                target="_blank"
                rel="noopener"
              >
                Read the paper
              </a>
              {" · "}
              <a href="/orangepaper/">Supply proof on this site</a>
            </p>
          </div>

          <div className="why-card">
            <h3>Checked in layers</h3>
            <p>
              Property tests, libFuzzer, golden vectors, and a differential
              against Bitcoin Core / libbitcoinkernel. A passing Z3 check means
              the spec-lock prover and Z3 accepted that function’s contract.{" "}
              <a
                href="https://docs.btcdecoded.org/blvm/development/differential-testing.html"
                target="_blank"
                rel="noopener"
              >
                How testing is layered
              </a>
            </p>
          </div>

          <div className="why-card">
            <h3>Governance you can fork</h3>
            <p>
              Who can merge, which thresholds apply, and how long review
              windows last are in a public repository. Phase 1 is current.
              Enforcement is off and the keys are test keys. If you disagree
              with a rule you fork that repository, not the chain.{" "}
              <a href="/governance/">Governance</a>
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
          <a href="/architecture/" className="btn btn-outline">
            Stack
          </a>
        </div>
      </div>
    </section>
  );
}
