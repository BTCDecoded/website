import React from "react";

const platforms = [
  {
    name: "Start9",
    logo: null,
    description:
      "Install BTCDecoded directly from the Start9 marketplace. Start9 provides a sovereign personal server with a built-in app store — no command line required.",
    steps: [
      "Open your Start9 dashboard and navigate to the Marketplace.",
      'Search for "BTCDecoded" and select the package.',
      "Click Install and follow the on-screen prompts.",
      "Once installed, configure your data directory and sync settings from the service properties panel.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/start9.html",
    supportLink: "https://docs.start9.com",
  },
  {
    name: "Umbrel",
    logo: null,
    description:
      "Available in the Umbrel App Store. Umbrel runs on a Raspberry Pi or any Linux machine and gives you a one-click node stack.",
    steps: [
      "Open your Umbrel dashboard and go to the App Store.",
      'Search for "BTCDecoded" and click Install.',
      "Wait for the initial sync to complete — this may take several hours on first run.",
      "Access node settings and RPC credentials from the app detail page.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/umbrel.html",
    supportLink: "https://community.getumbrel.com",
  },
  {
    name: "myNode",
    logo: null,
    description:
      "myNode is a dedicated Bitcoin node device with a premium app store. BTCDecoded runs as a managed service alongside Bitcoin Core so you can compare both side by side.",
    steps: [
      "Log into your myNode dashboard.",
      'Navigate to Apps and find "BTCDecoded".',
      "Click Enable to install the service.",
      "RPC and P2P ports are pre-configured; review them under the app settings.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/mynode.html",
    supportLink: "https://mynodebtc.com/support",
  },
  {
    name: "Parmanode",
    logo: null,
    description:
      "Parmanode is a terminal-based node manager. BTCDecoded integrates as a selectable node implementation during setup.",
    steps: [
      "Run the Parmanode setup script on your Linux machine.",
      "When prompted to select a Bitcoin node, choose BTCDecoded.",
      "The installer handles dependencies, user creation, and service registration automatically.",
      "Monitor logs with the built-in Parmanode log viewer.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/parmanode.html",
    supportLink: "https://parmanode.com",
  },
];

export default function PlugAndPlay() {
  const [selected, setSelected] = React.useState(0);
  const platform = platforms[selected];

  return (
    <section id="plug-and-play" className="section">
      <div className="container">
        <h2>Pre-Built Node Packages</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Run a verified Bitcoin node without compiling code. Pick your
          platform below.
        </p>

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
          <p style={{ color: "var(--text-secondary)" }}>{platform.description}</p>

          <h4 style={{ marginTop: "1.5rem" }}>Installation steps</h4>
          <ol className="install-steps">
            {platform.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <div className="platform-links">
            <a
              href={platform.docsLink}
              className="btn btn-primary"
              target="_blank"
              rel="noopener"
            >
              Full documentation
            </a>
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

        <div className="platform-note">
          <p>
            Don&apos;t see your platform?{" "}
            <a
              href="https://docs.thebitcoincommons.org/nodes/manual.html"
              target="_blank"
              rel="noopener"
            >
              Manual install instructions
            </a>{" "}
            cover any Linux system. For Mac and Windows, see{" "}
            <a href="/desktop/">the desktop app</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
