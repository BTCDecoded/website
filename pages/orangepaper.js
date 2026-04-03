import { useState, useEffect } from "react";
import { MathJax } from "better-react-mathjax";

export default function OrangePaperContentPage() {
  const [activeTab, setActiveTab] = useState("math");
  const [isAutoSwitching, setIsAutoSwitching] = useState(true);

  useEffect(() => {
    if (!isAutoSwitching) return;

    const interval = setInterval(() => {
      setActiveTab((prevTab) => (prevTab === "math" ? "formal" : "math"));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSwitching]);

  const handleTabClick = (tab) => {
    setIsAutoSwitching(false);
    setActiveTab(tab);
  };

  return (
    <section id="orange-paper" className="section">
      <div className="container">
        <h2>The Orange Paper (blvm-spec)</h2>
        <div className="content">
          <div className="orange-paper-with-diagram">
            <div className="orange-paper-content">
              <p>
                Complete mathematical specification of Bitcoin consensus,
                extracted from Bitcoin Core.{" "}
                <a
                  href="https://thebitcoincommons.org/orange-paper.html"
                  target="_blank"
                  rel="noopener"
                >
                  Read the Orange Paper
                </a>
                .
              </p>

              <div className="excerpt proof-showcase">
                <h4>Supply Convergence Proof</h4>

                <div className="proof-tabs">
                  <button
                    className={`proof-tab ${activeTab === "math" ? "active" : ""}`}
                    data-tab="math"
                    onClick={() => handleTabClick("math")}
                  >
                    Math Proof
                  </button>
                  <button
                    className={`proof-tab ${activeTab === "formal" ? "active" : ""}`}
                    data-tab="formal"
                    onClick={() => handleTabClick("formal")}
                  >
                    Formal Proof
                  </button>
                </div>

                <div className="proof-content">
                  <div
                    className="proof-panel"
                    data-panel="math"
                    style={{ display: activeTab === "math" ? "block" : "none" }}
                  >
                    <p>
                      <strong>Theorem 6.2.3</strong> (Supply Convergence): The
                      total supply converges to exactly 21 million BTC.
                    </p>

                    <div>
                      <p>
                        <em>Proof:</em> The total supply can be expressed as a
                        sum of geometric series. For each halving period{" "}
                        <MathJax inline>{`\\(k\\)`}</MathJax> {"("}where{" "}
                        <MathJax inline>
                          {`\\(   k = \\lfloor h/H \\rfloor \\)`}
                        </MathJax>
                        {")"}, the subsidy is{" "}
                        <MathJax
                          inline
                        >{`\\(50 \\times C \\times 2^{-k}\\)`}</MathJax>{" "}
                        for <MathJax inline>{`\\(H\\)`}</MathJax> consecutive
                        blocks.
                      </p>

                      <MathJax>
                        {`
                                        \\[
                                        \\lim_{h \\to \\infty} \\text{TotalSupply}(h)
                                        = 21 \\times 10^6 \\times C
                                        \\]
                                        `}
                      </MathJax>

                      <p>The total supply is:</p>

                      <MathJax>
                        {`
                                        \\[
                                        \\text{TotalSupply}(\\infty)
                                        = \\sum_{k=0}^{63} H \\times 50 \\times C \\times 2^{-k} 
                                        = H \\times 50 \\times C \\times \\sum_{k=0}^{63}2^{-k}
                                        
                                        \\]
                                        `}
                      </MathJax>

                      <p>
                        Since{" "}
                        <MathJax
                          inline
                        >{`\\(\\sum_{k=0}^{63} 2^{-k} = 2 - 2^{-63} \\approx 2\\)`}</MathJax>{" "}
                        for large <MathJax inline>{`\\(k\\)`}</MathJax>:
                      </p>

                      <MathJax>
                        {`
                                        \\[
                                        \\text{TotalSupply}(\\infty)
                                        \\approx H \\times 50 \\times C \\times 2
                                        = 210{,}000 \\times 50 \\times 10^{8} \\times 2
                                        = 21 \\times 10^6 \\times 10^{8}
                                        \\]
                                        `}
                      </MathJax>
                    </div>

                    <p className="proof-source">
                      Source:{" "}
                      <a
                        href="https://github.com/BTCDecoded/blvm-spec/blob/main/THE_ORANGE_PAPER.md#theorem-623-supply-convergence"
                        target="_blank"
                        rel="noopener"
                      >
                        Orange Paper, Theorem 6.2.3 (GitHub)
                      </a>
                    </p>
                  </div>

                  <div
                    className="proof-panel"
                    data-panel="formal"
                    style={{ display: activeTab === "formal" ? "block" : "none" }}
                  >
                    <p className="formal-proof-description">
                      This Rust code is formally verified using blvm-spec-lock
                      with Z3 to prove the supply convergence property.
                    </p>
                    <div className="code-container">
                      <div className="code-header">
                        <span className="code-filename">
                          blvm-consensus/src/economic.rs
                        </span>
                        <a
                          href="https://github.com/BTCDecoded/blvm-consensus/blob/main/src/economic.rs#L55"
                          target="_blank"
                          rel="noopener"
                          className="code-link"
                        >
                          View on GitHub →
                        </a>
                      </div>
                      <pre>
                        <code className="language-rust">
                          {`/// TotalSupply: ℕ → ℤ
///
/// Calculate the total Bitcoin supply at a given height.
/// This is the sum of all block subsidies up to that height.
#[spec_locked("6.2")]
pub fn total_supply(height: Natural) -> Integer {
    // Implementation verified with blvm-spec-lock and Z3
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://thebitcoincommons.org/orange-paper.html"
                className="btn btn-primary"
                target="_blank"
                rel="noopener"
              >
                Read the Orange Paper
              </a>
              <a
                href="https://github.com/BTCDecoded/blvm-spec"
                className="btn btn-outline"
                target="_blank"
                rel="noopener"
              >
                View Source on GitHub
              </a>
            </div>

            <div className="coverage-diagram">
              <img
                src="https://thebitcoincommons.org/assets/images/Consensus-Coverage-Comparison.png"
                alt="Consensus Coverage Comparison"
              />
              <p className="diagram-caption">
                Comparison of consensus coverage between Bitcoin Core
                (testing-based) and Bitcoin Commons (formal verification plus
                testing).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
