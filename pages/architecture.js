export default function ArchitecturePage() {
  return (
    <section id="architecture" class="section">
      <div class="container">
        <h2>Architecture</h2>
        <div class="content">
          <div class="architecture-with-diagram">
            <div class="architecture-content">
              <p>
                6-tier architecture: Orange Paper → blvm-consensus (formally
                verified with blvm-spec-lock) → blvm-protocol → blvm-node →
                blvm-sdk → governance.{" "}
                <a
                  href="https://docs.thebitcoincommons.org/architecture/system-overview.html"
                  target="_blank"
                  rel="noopener"
                >
                  See architecture docs
                </a>{" "}
                for details.
              </p>

              <div class="architecture">
                <div class="layer layer-foundation">
                  <div class="layer-number">1</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://thebitcoincommons.org/orange-paper.html"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-spec
                      </a>
                    </h3>
                    <p class="layer-type">Mathematical Specification</p>
                    <p>
                      Complete mathematical specification of Bitcoin consensus
                      extracted from Bitcoin Core. Includes the 21 million
                      supply convergence proof (Theorem 6.1).
                    </p>
                  </div>
                </div>

                <div class="layer layer-core">
                  <div class="layer-number">2</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-consensus"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-consensus
                      </a>
                    </h3>
                    <p class="layer-type">Formally Verified Implementation</p>
                    <p>
                      Pure Rust implementation of Orange Paper functions with{" "}
                      <strong>blvm-spec-lock</strong> formal verification (Z3
                      SMT solver). All consensus decisions are mathematically
                      proven. UTXO set operations verified for consistency and
                      double-spend prevention.
                    </p>
                    <p class="tech-detail">
                      <strong>Formal Verification:</strong> blvm-spec-lock
                      proofs link code to Orange Paper specifications. Chain
                      selection, block subsidy (21M limit proof), proof-of-work,
                      transaction validation all verified with Z3.
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">3</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-protocol"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-protocol
                      </a>
                    </h3>
                    <p class="layer-type">Protocol Abstraction</p>
                    <p>
                      Bitcoin variant abstraction (mainnet, testnet, regtest)
                      built on blvm-consensus. All consensus calls go through
                      the formally verified layer.
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">4</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-node"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-node
                      </a>
                    </h3>
                    <p class="layer-type">Full Node Library</p>
                    <p>
                      Complete Bitcoin node library using blvm-protocol and
                      blvm-consensus. Adds storage, networking, and RPC.{" "}
                      <strong>Optional features:</strong> Iroh QUIC transport
                      (NAT traversal), Quinn QUIC transport, UTXO commitments
                      (faster initial sync).
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">5</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm
                      </a>
                    </h3>
                    <p class="layer-type">Binary Wrapper</p>
                    <p>
                      Standalone binary executable that wraps blvm-node.
                      Provides command-line interface for running a full Bitcoin
                      node. Depends on blvm-node library.
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">6</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-sdk"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-sdk
                      </a>
                    </h3>
                    <p class="layer-type">Developer Toolkit</p>
                    <p>
                      Developer toolkit for building alternative Bitcoin
                      implementations. Provides module composition framework for
                      declaratively assembling custom Bitcoin nodes, plus
                      governance cryptographic primitives.
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">7</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/governance"
                        target="_blank"
                        rel="noopener"
                      >
                        governance
                      </a>
                    </h3>
                    <p class="layer-type">Governance Configuration</p>
                    <p>
                      Central source of truth for governance rules, layer
                      hierarchy, and emergency tier system. Defines who can
                      merge what, and when.
                    </p>
                  </div>
                </div>

                <div class="layer">
                  <div class="layer-number">8</div>
                  <div class="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-commons"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-commons
                      </a>
                    </h3>
                    <p class="layer-type">Cryptographic Enforcement</p>
                    <p>
                      GitHub App enforcing governance rules through signature
                      verification and review periods. Uses blvm-sdk for
                      cryptographic operations. <strong>Phase 1:</strong>{" "}
                      Infrastructure complete, enforcement not yet activated.
                    </p>
                  </div>
                </div>
              </div>

              <div class="architecture-note">
                <p>
                  <strong>
                    All consensus decisions flow through the formally verified
                    blvm-consensus layer.
                  </strong>
                </p>
              </div>
            </div>

            <div class="architecture-diagram">
              <img
                src="https://thebitcoincommons.org/assets/images/stack.png"
                alt="BLVM Stack Architecture"
              />
              <p class="diagram-caption">
                Orange Paper foundation → blvm-consensus (formally verified) →
                dependent components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
