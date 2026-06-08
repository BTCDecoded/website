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
  packageGroups = [],
  docker,
  comingSoonNote = "",
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
    <button
      type="button"
      className={`install-pkg-card${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <i className={`${pkg.icon} install-pkg-icon`} aria-hidden="true" />
      <span className="install-pkg-label">{pkg.label}</span>
      {pkg.ext && pkg.ext !== "binary" ? (
        <span className="install-pkg-ext">{pkg.ext}</span>
      ) : null}
    </button>
  );
}

function groupPackages(allPackages, groups) {
  if (!groups?.length) {
    return [
      {
        title: null,
        items: allPackages.map((pkg, index) => ({ pkg, index })),
      },
    ];
  }

  const byGroup = new Map(
    groups.map((g) => [g.id, { title: g.title, items: [] }]),
  );
  const fallback = { title: "Other downloads", items: [] };

  allPackages.forEach((pkg, index) => {
    const bucket = pkg.group ? byGroup.get(pkg.group) : null;
    if (bucket) bucket.items.push({ pkg, index });
    else fallback.items.push({ pkg, index });
  });

  const ordered = groups
    .map((g) => byGroup.get(g.id))
    .filter((g) => g && g.items.length > 0);

  if (fallback.items.length > 0) ordered.push(fallback);
  return ordered;
}

function downloadLabel(ext) {
  if (!ext) return "Download";
  if (ext.startsWith(".")) return `Download ${ext}`;
  return `Download ${ext}`;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("copy failed");
}

function CopyCodeBlock({ label, code, className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await copyText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.alert("Could not copy to clipboard. Select the text and copy manually.");
    }
  }

  return (
    <div className={`install-code-block${className ? ` ${className}` : ""}`}>
      <div className="code-header">
        <span className="code-filename">{label}</span>
        <button
          type="button"
          className={`code-copy-btn${copied ? " copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? `${label} copied` : `Copy ${label} commands`}
        >
          <i
            className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`}
            aria-hidden="true"
          />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="install-code-pre">{code}</pre>
    </div>
  );
}

export default function Install() {
  const [activePkg, setActivePkg] = useState(0);
  const pkg = packages[activePkg];
  const groupedPackages = groupPackages(packages, packageGroups);

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

        <div className="install-pkg-sections">
          {groupedPackages.map((section) => (
            <div key={section.title ?? "default"} className="install-pkg-section">
              {section.title ? (
                <h3 className="install-pkg-section-title">{section.title}</h3>
              ) : null}
              <div
                className={`install-pkg-grid install-pkg-grid--${section.items.length}`}
              >
                {section.items.map(({ pkg: p, index }) => (
                  <PackageCard
                    key={p.id}
                    pkg={p}
                    active={index === activePkg}
                    onClick={() => setActivePkg(index)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="install-detail">
          <div className="install-detail-head">
            <div>
              <h3 className="install-detail-title">
                <i className={`${pkg.icon} install-detail-icon`} aria-hidden="true" />
                {pkg.label}
              </h3>
              <p className="install-detail-desc">{pkg.description}</p>
            </div>
            <a
              href={pkg.downloadUrl ?? blvmReleasesLatestUrl ?? release.releasesLatestUrl}
              className="btn btn-primary install-dl-btn"
              target="_blank"
              rel="noopener"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              {" "}{downloadLabel(pkg.ext)}
            </a>
          </div>

          {pkg.installCmd ? (
            <CopyCodeBlock
              key={`${pkg.id}-install`}
              label="Install"
              code={pkg.installCmd}
            />
          ) : null}

          <CopyCodeBlock
            key={`${pkg.id}-verify`}
            label="Verify checksum"
            code={pkg.verify}
            className="install-code-verify"
          />

          {pkg.runCmd ? (
            <CopyCodeBlock
              key={`${pkg.id}-run`}
              label="Run"
              code={pkg.runCmd}
              className="install-code-run"
            />
          ) : null}

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

        {docker ? (
          <div className="install-detail install-docker">
            <div className="install-detail-head">
              <div>
                <h3 className="install-detail-title">
                  <i className={`${docker.icon} install-detail-icon`} aria-hidden="true" />
                  {docker.title}
                </h3>
                <p className="install-detail-desc">{docker.description}</p>
              </div>
              <a
                href={docker.packageUrl}
                className="btn btn-outline install-dl-btn"
                target="_blank"
                rel="noopener"
              >
                {docker.packageLinkLabel}
              </a>
            </div>

            <CopyCodeBlock key="docker-pull" label="Pull" code={docker.pullCmd} />
            <CopyCodeBlock key="docker-run" label="Run" code={docker.runCmd} />

            {comingSoonNote ? (
              <p className="install-coming-soon">{comingSoonNote}</p>
            ) : null}
          </div>
        ) : null}

        {releaseHistory.length > 0 && (
          <div className="install-history">
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

        <div className="platform-note">
          <p>
            Need tarballs, zip archives, or another format?{" "}
            <a
              href={blvmReleasesLatestUrl || release.releasesLatestUrl}
              target="_blank"
              rel="noopener"
            >
              All artifacts on GitHub Releases →
            </a>
            {" · "}
            <a
              href={page.buildFromSourceUrl}
              target="_blank"
              rel="noopener"
            >
              Build from source →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
