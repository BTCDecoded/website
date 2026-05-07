import React, { useState } from "react";
import installContent from "../data/install-content.json";
import {
  blvmDisplayTag,
  blvmReleasesLatestUrl,
  blvmReleasesTagUrl,
} from "../lib/blvmReleaseMeta";

const {
  page,
  release,
  packages,
  managed,
  platforms,
  releaseHistory = [],
} = installContent;

function formatReleaseDate(iso) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return String(iso).slice(0, 10);
  }
}

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
  const pkg = packages[activePkg];
  const platform = platforms[activePlat];

  return (
    <section id="install" className="section">
      <div className="container">

        <div className="install-header">
          <h2>{page.title}</h2>
          <p className="install-lead">
            {page.lead} Current release:{" "}
            <a
              href={blvmReleasesTagUrl || release.releasesTagUrl}
              target="_blank"
              rel="noopener"
            >
              {blvmDisplayTag} on GitHub →
            </a>
          </p>
        </div>

        <div className="install-pkg-grid">
          {packages.map((p, i) => (
            <PackageCard
              key={p.id}
              pkg={p}
              active={i === activePkg}
              onClick={() => setActivePkg(i)}
            />
          ))}
        </div>

        <div className="install-detail">
          <div className="install-detail-head">
            <div>
              <h3 className="install-detail-title">{pkg.label}</h3>
              <p className="install-detail-desc">{pkg.description}</p>
            </div>
            <a
              href={pkg.downloadUrl ?? blvmReleasesLatestUrl ?? release.releasesLatestUrl}
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
            Releases may publish a detached GPG signature beside each artifact (often{" "}
            <code>{pkg.filename}.sig</code>).{" "}
            <a
              href={page.verificationGuideUrl}
              target="_blank"
              rel="noopener"
            >
              Signature verification guide →
            </a>
          </p>
        </div>

        <details className="install-managed-details">
          <summary className="install-managed-summary">
            <span className="install-managed-summary-title">{managed.summaryTitle}</span>
            <span className="install-managed-badge">{managed.badge}</span>
            <span className="install-managed-summary-hint">
              {managed.summaryHint}
            </span>
          </summary>
          <div className="install-managed-inner">
            <p className="install-managed-banner" role="status">
              {managed.banner}
            </p>
            <p className="install-plat-intro">
              {managed.intro}
            </p>

            <div className="platform-tabs">
              {platforms.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  className={`platform-tab${i === activePlat ? " active" : ""}`}
                  onClick={() => setActivePlat(i)}
                >
                  <i className={`${p.icon} platform-tab-icon`} aria-hidden="true" />
                  {" "}{p.name}
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
                  {platform.supportLinkLabel}
                </a>
              </div>
            </div>

            {releaseHistory.length > 0 && (
              <div className="install-history install-history-in-managed">
                <h3 className="install-history-heading">Recent releases</h3>
                <ul className="install-history-list">
                  {releaseHistory.map((r) => (
                    <li key={r.tag}>
                      <a href={r.url} target="_blank" rel="noopener">
                        <span className="install-history-tag">{r.tag}</span>
                        <span className="install-history-name">{r.name}</span>
                        {r.publishedAt ? (
                          <span className="install-history-date">
                            {formatReleaseDate(r.publishedAt)}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </details>

        <div className="platform-note">
          <p>
            Building from source or need a different architecture?{" "}
            <a
              href={page.buildFromSourceUrl}
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
