import { useEffect, useRef } from "react";
import Link from "next/link";

const BLVM_FLOW_EMBED_SRC =
  "https://thebitcoincommons.org/node-charts/bllvm-dependency-flow.html?embed=1&theme=light";
const SUNBURST_EMBED_SRC =
  "https://thebitcoincommons.org/spec-viz/sunburst.html?embed=1";

function bindEmbedHeight(frame, type) {
  function onMessage(e) {
    if (!e.data || e.data.type !== type) return;
    if (!frame || e.source !== frame.contentWindow) return;
    const h = e.data.height;
    if (typeof h !== "number" || !isFinite(h) || h <= 0) return;
    const cap = Math.round(window.innerHeight * 0.92);
    const slack = 2;
    const next = Math.min(
      Math.max(Math.round(h + slack), 200),
      Math.max(cap, 200)
    );
    frame.style.height = `${next}px`;
  }
  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}

export default function ArchitecturePage() {
  const blvmFlowRef = useRef(null);
  const sunburstRef = useRef(null);

  useEffect(() => {
    const unbindFlow = bindEmbedHeight(
      blvmFlowRef.current,
      "btcc-bllvm-embed-height"
    );
    const unbindSunburst = bindEmbedHeight(
      sunburstRef.current,
      "btcc-sunburst-embed-height"
    );
    return () => {
      unbindFlow();
      unbindSunburst();
    };
  }, []);

  return (
    <section
      id="architecture"
      className="section"
      aria-labelledby="architecture-heading"
    >
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">The stack</p>
          <h1 id="architecture-heading">Stack</h1>
          <p className="page-lede">
            Write Bitcoin’s rules, implement them, run a node, and publish who
            can change the software. Orange Paper → blvm-consensus (spec-lock) →
            blvm-protocol → blvm-node → blvm → blvm-sdk → governance.{" "}
            <a
              href="https://docs.btcdecoded.org/blvm/architecture/system-overview.html"
              target="_blank"
              rel="noopener"
            >
              Architecture docs
            </a>
            {" · "}
            <Link href="/governance/">Governance</Link>
            {" · "}
            <Link href="/problem/">Problem</Link>
          </p>
        </header>
        <div className="content">
          <div className="architecture-with-diagram">
            <div className="architecture-content">

              <div className="architecture">
                <div className="layer layer-foundation">
                  <div className="layer-number">1</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://thebitcoincommons.org/orange-paper.html"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-spec
                      </a>
                    </h3>
                    <p className="layer-type">Mathematical Specification</p>
                    <p>
                      Mathematical specification of Bitcoin consensus extracted
                      from Bitcoin Core. Includes the 21 million supply
                      convergence proof (Theorem 6.2.3).{" "}
                      <a
                        href="https://thebitcoincommons.org/orange-paper.html"
                        target="_blank"
                        rel="noopener"
                      >
                        Orange Paper
                      </a>
                      {" · "}
                      <a
                        href="https://thebitcoincommons.org/spec.html"
                        target="_blank"
                        rel="noopener"
                      >
                        Consensus register
                      </a>
                      {" · "}
                      <a
                        href="https://thebitcoincommons.org/architecture.html"
                        target="_blank"
                        rel="noopener"
                      >
                        ARCHITECTURE.md
                      </a>
                      {" · "}
                      <Link href="/orangepaper/" className="architecture-inline-spec-link">
                        Supply proof on this site
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="layer layer-core">
                  <div className="layer-number">2</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-consensus"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-consensus
                      </a>
                    </h3>
                    <p className="layer-type">Consensus implementation</p>
                    <p>
                      Rust implementation of the Orange Paper functions.{" "}
                      <strong>blvm-spec-lock</strong> binds those functions to
                      numbered spec sections. CI runs Z3 on those annotations.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">3</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-protocol"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-protocol
                      </a>
                    </h3>
                    <p className="layer-type">Protocol Abstraction</p>
                    <p>
                      Bitcoin variant abstraction (mainnet, testnet, regtest)
                      built on blvm-consensus. Consensus calls go through that
                      crate.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">4</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-node"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-node
                      </a>
                    </h3>
                    <p className="layer-type">Full Node Library</p>
                    <p>
                      Bitcoin node library on blvm-protocol and blvm-consensus.
                      Adds storage, networking, and RPC. Optional features:
                      Iroh QUIC transport (NAT traversal), Quinn QUIC transport,
                      and UTXO commitments.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">5</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm
                      </a>
                    </h3>
                    <p className="layer-type">Binary Wrapper</p>
                    <p>
                      Standalone binary executable that wraps blvm-node.
                      Provides command-line interface for running a full Bitcoin
                      node. Depends on blvm-node library.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">6</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-sdk"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-sdk
                      </a>
                    </h3>
                    <p className="layer-type">Developer Toolkit</p>
                    <p>
                      Developer toolkit for building alternative Bitcoin
                      implementations. Provides module composition framework for
                      declaratively assembling custom Bitcoin nodes, plus
                      governance cryptographic primitives.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">7</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/governance"
                        target="_blank"
                        rel="noopener"
                      >
                        governance
                      </a>
                    </h3>
                    <p className="layer-type">Governance Configuration</p>
                    <p>
                      Central source of truth for governance rules, layer
                      hierarchy, and emergency tier system. Defines who can
                      merge what, and when.
                    </p>
                  </div>
                </div>

                <div className="layer">
                  <div className="layer-number">8</div>
                  <div className="layer-content">
                    <h3>
                      <a
                        href="https://github.com/BTCDecoded/blvm-commons"
                        target="_blank"
                        rel="noopener"
                      >
                        blvm-commons
                      </a>
                    </h3>
                    <p className="layer-type">Governance App, Designed</p>
                    <p>
                      One host for a quorum of governance nodes. The quorum is
                      Designed and is not Running. The client posts checks. It
                      does not reverse a non-conforming action.{" "}
                      <strong>Phase 1:</strong> enforcement is off, and the keys
                      in use are test keys.
                    </p>
                  </div>
                </div>
              </div>

              <div className="architecture-note">
                <p>
                  <strong>
                    Consensus decisions are made in blvm-consensus. Annotated
                    functions there are checked with spec-lock.
                  </strong>
                </p>
              </div>

            </div>

            <div className="architecture-diagram">
              <iframe
                ref={blvmFlowRef}
                title="BLVM dependency flow: Orange Paper to consensus and dependents"
                src={BLVM_FLOW_EMBED_SRC}
                loading="lazy"
                height={360}
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="diagram-caption">
                Orange Paper → blvm-consensus (spec-lock + tests) → protocol,
                node, SDK, governance.
              </p>
              <iframe
                ref={sunburstRef}
                title="Orange Paper specification map"
                src={SUNBURST_EMBED_SRC}
                loading="lazy"
                height={360}
                referrerPolicy="no-referrer-when-downgrade"
              />
              <p className="diagram-caption">
                Orange Paper sections.{" "}
                <a
                  href="https://thebitcoincommons.org/orange-paper.html"
                  target="_blank"
                  rel="noopener"
                >
                  Open the paper
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
