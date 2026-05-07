import React, { useState } from "react";

const RELEASE_TAG = "v0.1.0";
const GITHUB_RELEASES = "https://github.com/BTCDecoded/blvm-node/releases/latest";
const GITHUB_RELEASES_TAG = `https://github.com/BTCDecoded/blvm-node/releases/tag/${RELEASE_TAG}`;

const PACKAGES = [
  {
    id: "deb",
    label: "Debian / Ubuntu",
    ext: ".deb",
    icon: "fa-brands fa-linux",
    filename: `btcdecoded_0.1.0_amd64.deb`,
    description: "Ubuntu 22.04+, Debian 11+, and any dpkg-based distro.",
    installCmd: `sudo dpkg -i btcdecoded_0.1.0_amd64.deb
sudo apt-get install -f    # pull in any missing deps`,
    verify: `sha256sum --check btcdecoded_0.1.0_amd64.deb.sha256`,
  },
  {
    id: "rpm",
    label: "Fedora / RHEL",
    ext: ".rpm",
    icon: "fa-brands fa-linux",
    filename: `btcdecoded-0.1.0-1.x86_64.rpm`,
    description: "Fedora 38+, RHEL 9, CentOS Stream 9, and RPM-based distros.",
    installCmd: `sudo rpm -i btcdecoded-0.1.0-1.x86_64.rpm
# or via dnf:
sudo dnf install ./btcdecoded-0.1.0-1.x86_64.rpm`,
    verify: `sha256sum --check btcdecoded-0.1.0-1.x86_64.rpm.sha256`,
  },
  {
    id: "exe",
    label: "Windows",
    ext: ".exe",
    icon: "fa-brands fa-windows",
    filename: `BTCDecoded-Setup-0.1.0.exe`,
    description: "Windows 10 / 11 (64-bit). Signed installer, no admin account required for the node data directory.",
    installCmd: `# Run the installer, accept the UAC prompt, choose your data directory.
# BTCDecoded registers itself as a background service via the Windows Service Manager.`,
    verify: `# PowerShell checksum verify:
(Get-FileHash BTCDecoded-Setup-0.1.0.exe -Algorithm SHA256).Hash`,
  },
];

const PLATFORMS = [
  {
    name: "Start9",
    description:
      "Install directly from the Start9 marketplace. Sovereign personal server with a built-in app store — no command line required.",
    steps: [
      "Open your Start9 dashboard and navigate to Marketplace.",
      'Search for "BTCDecoded" and select the package.',
      "Click Install and follow the on-screen prompts.",
      "Configure your data directory and sync settings from the service properties panel.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/start9.html",
    supportLink: "https://docs.start9.com",
  },
  {
    name: "Umbrel",
    description:
      "Available in the Umbrel App Store. Runs on a Raspberry Pi or any Linux machine with a one-click node stack.",
    steps: [
      "Open your Umbrel dashboard and go to the App Store.",
      'Search for "BTCDecoded" and click Install.',
      "Wait for initial sync to complete — this may take several hours.",
      "Access node settings and RPC credentials from the app detail page.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/umbrel.html",
    supportLink: "https://community.getumbrel.com",
  },
  {
    name: "myNode",
    description:
      "Dedicated Bitcoin node device with a premium app store. Runs alongside Bitcoin Core so you can compare both side by side.",
    steps: [
      "Log into your myNode dashboard.",
      'Navigate to Apps and find "BTCDecoded".',
      "Click Enable to install the service.",
      "RPC and P2P ports are pre-configured; review them under app settings.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/mynode.html",
    supportLink: "https://mynodebtc.com/support",
  },
  {
    name: "Parmanode",
    description:
      "Terminal-based node manager. BTCDecoded integrates as a selectable node implementation during setup.",
    steps: [
      "Run the Parmanode setup script on your Linux machine.",
      "When prompted to select a Bitcoin node, choose BTCDecoded.",
      "The installer handles dependencies, user creation, and service registration.",
      "Monitor logs with the built-in Parmanode log viewer.",
    ],
    docsLink: "https://docs.thebitcoincommons.org/nodes/parmanode.html",
    supportLink: "https://parmanode.com",
  },
];

function PackageCard({ pkg, active, onClick }) {
  return (
    <div
      className={`install-pkg-card${active ? " active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <span className="install-pkg-ext">{pkg.ext}</span>
      <i className={`${pkg.icon} install-pkg-icon`} aria-hidden="true" />
      <span className="install-pkg-label">{pkg.label}</span>
    </div>
  );
}

export default function Install() {
  const [activePkg, setActivePkg] = useState(0);
  const [activePlat, setActivePlat] = useState(0);
  const pkg = PACKAGES[activePkg];
  const platform = PLATFORMS[activePlat];

  return (
    <section id="install" className="section">
      <div className="container">

        {/* ── Header ── */}
        <div className="install-header">
          <h2>Install BTCDecoded</h2>
          <p className="install-lead">
            Pre-built packages for Linux and Windows. Each release ships with a
            SHA-256 checksum and a detached GPG signature — verify before
            running. Current release:{" "}
            <a href={GITHUB_RELEASES_TAG} target="_blank" rel="noopener">
              {RELEASE_TAG} on GitHub →
            </a>
          </p>
        </div>

        {/* ── Package picker ── */}
        <div className="install-pkg-grid">
          {PACKAGES.map((p, i) => (
            <PackageCard
              key={p.id}
              pkg={p}
              active={i === activePkg}
              onClick={() => setActivePkg(i)}
            />
          ))}
        </div>

        {/* ── Selected package detail ── */}
        <div className="install-detail">
          <div className="install-detail-head">
            <div>
              <h3 className="install-detail-title">{pkg.label}</h3>
              <p className="install-detail-desc">{pkg.description}</p>
            </div>
            <a
              href={GITHUB_RELEASES}
              className="btn btn-primary install-dl-btn"
              target="_blank"
              rel="noopener"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              {" "}Download {pkg.ext}
            </a>
          </div>

          <div className="install-code-block">
            <div className="code-header">
              <span className="code-filename">Install</span>
            </div>
            <pre><code>{pkg.installCmd}</code></pre>
          </div>

          <div className="install-code-block install-code-verify">
            <div className="code-header">
              <span className="code-filename">Verify checksum</span>
            </div>
            <pre><code>{pkg.verify}</code></pre>
          </div>

          <p className="install-gpg-note">
            Every release also ships a detached GPG signature ({pkg.filename}.sig).{" "}
            <a
              href="https://docs.thebitcoincommons.org/nodes/verification.html"
              target="_blank"
              rel="noopener"
            >
              Signature verification guide →
            </a>
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="install-section-divider">
          <span>Pre-built node appliances</span>
        </div>

        {/* ── Plug-and-play tabs ── */}
        <p className="install-plat-intro">
          Running a dedicated node box? BTCDecoded is available as a managed
          package on the major sovereign node platforms.
        </p>

        <div className="platform-tabs">
          {PLATFORMS.map((p, i) => (
            <button
              key={p.name}
              className={`platform-tab${i === activePlat ? " active" : ""}`}
              onClick={() => setActivePlat(i)}
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

        {/* ── Footer note ── */}
        <div className="platform-note">
          <p>
            Building from source or need a different architecture?{" "}
            <a
              href="https://docs.thebitcoincommons.org/nodes/build.html"
              target="_blank"
              rel="noopener"
            >
              Build instructions →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
