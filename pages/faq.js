import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    q: "Will I stay in consensus with the Bitcoin network?",
    a: "Yes. This node implements the same consensus rules as Bitcoin Core: same chain, same UTXO set. Consensus-critical functions are bound to the Orange Paper (spec-lock, Z3 in CI). Compatibility is checked in layers — property tests, libFuzzer on consensus/protocol/node, golden vectors from mainnet bytes and Core script fixtures, and a differential against Core / libbitcoinkernel — not by a single block-count slogan.",
  },
  {
    q: "How does this help decentralize Bitcoin?",
    a: "Bitcoin's network currently relies on one dominant implementation. A serious second full node with independent consensus coverage makes the network more resilient — bugs like CVE-2018-17144 stay in Core production for nearly two years before the fix; independent implementations surface that class of failure earlier. BLVM provides the shared formal spec that makes safe alternatives practical without each team reverse-engineering consensus rules from C++ source code.",
  },
  {
    q: "What if there is a bug in my node?",
    a: "Treat it like any other full node: review the software before you put real funds on it. Spec-lock runs in CI; the test suite includes property tests, fuzzing, golden vectors, and a Core differential. Report security issues to security@thebitcoincommons.org (see SECURITY.md in each repo). Coordinated releases for consensus bugs still go through the published governance process.",
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
    a: "Commons Pool is BTCDecoded's mining pool: no operator, no pool wallet, no KYC. Coinbase outputs pay miner addresses from a shared snapshot of work. It runs on BLVM (the first implementation of the Commons spec), not Bitcoin Core. Signet today; not on mainnet. Site: commonspool.org.",
  },
  {
    q: "How can I fund the project?",
    a: "Through Plebly (plebly.fund): on-chain escrow, not a custodial tip jar. Fund a listed Commons proposal, or donate to Commons directly. Plebly is the funding venue — not Commons and not the BLVM node.",
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
          Running a node, staying on the Bitcoin chain, and how the software is
          checked.{" "}
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
