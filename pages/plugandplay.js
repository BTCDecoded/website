import React from "react";
import Link from "next/link";

const platforms = [
  {
    name: "Start9",
    description:
      "A sovereign personal server with a built-in app store. Planned path: install Bitcoin Commons (blvm) from the Start9 marketplace, no command line.",
    steps: [
      "Open your Start9 dashboard and go to the Marketplace.",
      'Search for "Bitcoin Commons" and select the package.',
      "Install and follow the on-screen prompts.",
      "Configure the data directory and sync settings from the service panel.",
    ],
    supportLink: "https://docs.start9.com",
  },
  {
    name: "Umbrel",
    description:
      "App Store on a Raspberry Pi or any Linux machine. Planned path: one-click Bitcoin Commons (blvm) from the Umbrel store.",
    steps: [
      "Open your Umbrel dashboard and go to the App Store.",
      'Search for "Bitcoin Commons" and install.',
      "Wait for the initial sync on first run.",
      "Review node settings and RPC credentials from the app page.",
    ],
    supportLink: "https://community.getumbrel.com",
  },
  {
    name: "myNode",
    description:
      "A dedicated Bitcoin node device with a premium app store. Planned path: blvm as a managed service alongside Bitcoin Core.",
    steps: [
      "Log into your myNode dashboard.",
      'Find "Bitcoin Commons" under Apps.',
      "Enable the service.",
      "Review pre-configured RPC and P2P ports in app settings.",
    ],
    supportLink: "https://mynodebtc.com/support",
  },
  {
    name: "Parmanode",
    description:
      "A terminal-based node manager. Planned path: blvm as a selectable node implementation during setup.",
    steps: [
      "Run the Parmanode setup script on Linux.",
      "When prompted for a Bitcoin node, choose Bitcoin Commons (blvm).",
      "The installer handles dependencies, user creation, and the service.",
      "Monitor logs with the Parmanode log viewer.",
    ],
    supportLink: "https://parmanode.com",
  },
];

export default function PlugAndPlay() {
  const [selected, setSelected] = React.useState(0);
  const platform = platforms[selected];

  return (
    <section id="plug-and-play" className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">The node</p>
          <h1>Pre-built nodes</h1>
          <p className="page-lede">
            Marketplace installs for Start9, Umbrel, myNode, and Parmanode are
            not live yet. Use GitHub Releases today. The steps below are a
            preview of the planned paths.
          </p>
        </header>

        <div className="home-ctas home-ctas--block">
          <Link href="/install/" className="btn btn-primary">
            Install from GitHub
          </Link>
          <a
            href="https://docs.thebitcoincommons.org/getting-started/installation.html"
            className="btn btn-outline"
            target="_blank"
            rel="noopener"
          >
            Installation guide
          </a>
        </div>

        <div className="platform-tabs">
          {platforms.map((p, i) => (
            <button
              key={p.name}
              className={`platform-tab${i === selected ? " active" : ""}`}
              onClick={() => setSelected(i)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="platform-panel">
          <h3>{platform.name}</h3>
          <p className="page-lede">{platform.description}</p>

          <h4>Planned steps</h4>
          <ol className="install-steps">
            {platform.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="home-ctas why-ctas">
            <a
              href={platform.supportLink}
              className="btn btn-outline"
              target="_blank"
              rel="noopener"
            >
              {platform.name} support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
