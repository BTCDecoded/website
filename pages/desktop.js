import React from "react";

export default function Desktop() {
  return (
    <section id="desktop" className="section">
      <div className="container">
        <h2>Desktop App</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          Native desktop packages for Mac and Linux. Each release is signed and
          includes a SHA-256 checksum so you can verify the download before
          running it.
        </p>

        <div className="release-notice">
          <span className="release-badge">v1.0 releasing now</span>
          <p>
            Desktop packages are being published with the v1.0 release.{" "}
            <a
              href="https://github.com/BTCDecoded/blvm-node/releases/latest"
              target="_blank"
              rel="noopener"
            >
              Check the GitHub releases page
            </a>{" "}
            for the latest signed binaries and checksums.
          </p>
        </div>

        <h3 style={{ marginTop: "2.5rem" }}>Verifying your download</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          Every release ships with a <code>.sha256</code> checksum file and a
          detached GPG signature. Verify before running:
        </p>
        <div className="code-container" style={{ marginTop: "1rem" }}>
          <div className="code-header">
            <span className="code-filename">Verify (Linux / Mac)</span>
          </div>
          <pre>
            <code className="language-bash">{`# Check the checksum
sha256sum --check btcdecoded-linux-x86_64.tar.gz.sha256

# Verify the GPG signature
gpg --verify btcdecoded-linux-x86_64.tar.gz.sig btcdecoded-linux-x86_64.tar.gz`}</code>
          </pre>
        </div>

        <div className="platform-links" style={{ marginTop: "2rem" }}>
          <a
            href="https://github.com/BTCDecoded/blvm-node/releases/latest"
            className="btn btn-primary"
            target="_blank"
            rel="noopener"
          >
            Download latest release
          </a>
          <a
            href="https://docs.thebitcoincommons.org/nodes/desktop.html"
            className="btn btn-outline"
            target="_blank"
            rel="noopener"
          >
            Installation guide
          </a>
        </div>

        <p style={{ color: "var(--text-muted)", marginTop: "2rem", fontSize: "0.9rem" }}>
          Looking for plug-and-play node hardware (Start9, Umbrel, myNode,
          Parmanode)?{" "}
          <a href="/plugandplay/">See the pre-built node packages page.</a>
        </p>
      </div>
    </section>
  );
}
