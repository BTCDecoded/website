import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "Will I stay in consensus with the Bitcoin network?",
    a: "Yes. BTCDecoded implements the same Bitcoin consensus rules as Bitcoin Core, verified through differential testing against 900,000+ mainnet blocks with zero divergence. blvm-spec-lock ties every consensus-critical function back to the Orange Paper specification via Z3-checked contracts. Same chain, same UTXO set, same rules.",
  },
  {
    q: "How does this help decentralize Bitcoin?",
    a: "Bitcoin's network currently relies on one dominant implementation. A serious second full node with independent consensus coverage makes the network more resilient — bugs like CVE-2018-17144 stay in Core production for nearly two years before the fix; independent implementations surface that class of failure earlier. BLVM provides the shared formal spec that makes safe alternatives practical without each team reverse-engineering consensus rules from C++ source code.",
  },
  {
    q: "What if there is a bug in my node?",
    a: "BLVM ships with spec-lock verification in CI, extensive differential testing, and continuous fuzzing of consensus and protocol code. Security vulnerabilities follow the Bitcoin Commons responsible disclosure policy — see SECURITY.md in each repository. Critical consensus issues trigger a coordinated release process with cryptographic sign-off from the governance tier. If you find a bug, report it to security@thebitcoincommons.org.",
  },
  {
    q: "Is this a fork of Bitcoin?",
    a: "No. BTCDecoded does not fork Bitcoin's blockchain, change its consensus rules, or introduce a new coin. It implements the same rules, formally specified in the Orange Paper. The goal is a second reference-grade full node on the existing Bitcoin network.",
  },
  {
    q: "Do I need technical knowledge to run a node?",
    a: "No. Plug-and-play packages are available for Start9, Umbrel, myNode, and Parmanode — install through their app stores with no command line required. Desktop apps for Mac and Linux are available for direct installs. The technical path (building from source) is documented separately for developers.",
  },
  {
    q: "How does governance work?",
    a: "Bitcoin Commons governance is published, tiered, and cryptographically enforced. Every rule — who can merge, what signature thresholds are required, how long review windows last — is in a public repository. Multisig enforcement means no single maintainer can bypass the process. If you disagree with a rule you fork the governance document, not the chain. The governance designer at thebitcoincommons.org lets you explore what a fork would look like.",
  },
  {
    q: "What is Commons Pool?",
    a: "Commons Pool is BTCDecoded's mining pool: no operator, no pool wallet, no KYC. Coinbase outputs pay miner addresses from a shared snapshot of work. It runs on Bitcoin Commons (BLVM), not Bitcoin Core. Signet today; not on mainnet. Site: commonspool.org.",
  },
  {
    q: "Where do I get support?",
    a: "Documentation lives at docs.thebitcoincommons.org. For platform-specific help (Start9, Umbrel, myNode, Parmanode) see the plug-and-play page. For bugs and issues use the GitHub issue tracker at github.com/BTCDecoded. For project updates subscribe to btccommons.substack.com.",
  },
];

export default function FAQ() {
  return (
    <div style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Questions about running a BTCDecoded node.{" "}
          <a
            href="https://thebitcoincommons.org/#faq"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--bitcoin-orange)" }}
          >
            Commons-level FAQ here.
          </a>
        </p>
        {faqs.map((item, index) => (
          <Accordion key={index} style={{ marginBottom: "8px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq${index}-content`}
              id={`faq${index}-header`}
            >
              <Typography style={{ fontWeight: 600 }}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
              >
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
