import { useEffect, useRef, useState } from "react";

const GOV_RAW =
  "https://raw.githubusercontent.com/BTCDecoded/governance/main";
/** Same files via jsDelivr; works when extensions block raw.githubusercontent.com (ERR_BLOCKED_BY_CLIENT). */
const GOV_CDN =
  "https://cdn.jsdelivr.net/gh/BTCDecoded/governance@main";
const GOV_BLOB = "https://github.com/BTCDecoded/governance/blob/main";

const GOV_SPECTRUM_SRC =
  "https://thebitcoincommons.org/node-charts/governance-spectrum-line.html?theme=light";

function GovernanceSpectrumLight() {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(200);

  useEffect(() => {
    function onMessage(e) {
      if (!e.data || e.data.type !== "btcc-gov-spectrum-height") return;
      const win = iframeRef.current?.contentWindow;
      if (!win || e.source !== win) return;
      const h = e.data.height;
      if (typeof h !== "number" || !isFinite(h) || h <= 0) return;
      setIframeHeight(Math.min(Math.max(Math.round(h + 4), 140), 380));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <figure className="governance-spectrum-figure">
      <div className="governance-spectrum-embed">
        <iframe
          ref={iframeRef}
          src={GOV_SPECTRUM_SRC}
          title="Governance spectrum: centralized to decentralized (Bank, Bitcoin now, Modular, Chaos)"
          style={{ height: iframeHeight }}
          loading="lazy"
        />
      </div>
      <figcaption className="diagram-caption">
        Same interactive spectrum as on{" "}
        <a
          href="https://thebitcoincommons.org/#why-title"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bitcoin Commons
        </a>{" "}
        (light theme for this page). The band marks modular governance: published
        rules and thresholds instead of informal discretion alone.
      </figcaption>
    </figure>
  );
}

/** All governance YAML consumed by tooling / docs (excludes .github/workflows). */
const YAML_FILES = [
  { path: ".governance.yml", label: "Meta-governance (.governance.yml)" },
  { path: "config/action-tiers.yml", label: "Action tiers" },
  { path: "config/commons-contributor-thresholds.yml", label: "Commons contributor thresholds" },
  { path: "config/cross-layer-rules.yml", label: "Cross-layer rules" },
  { path: "config/emergency-tiers.yml", label: "Emergency tiers" },
  { path: "config/governance-fork.yml", label: "Governance fork" },
  { path: "config/governance-review-policy.yml", label: "Governance review policy" },
  { path: "config/repository-layers.yml", label: "Repository layers" },
  { path: "config/ruleset-export-template.yml", label: "Ruleset export template" },
  {
    path: "config/ruleset-export-template-expanded.yml",
    label: "Ruleset export template (expanded)",
  },
  { path: "config/security-control-mapping.yml", label: "Security control mapping" },
  { path: "config/security-control-status.yml", label: "Security control status" },
  { path: "config/test-vectors.yml", label: "Test vectors" },
  { path: "config/tier-classification-rules.yml", label: "Tier classification rules" },
  { path: "config/version-manifest.yml", label: "Version manifest" },
  { path: "config/repos/blvm-consensus.yml", label: "Repo: blvm-consensus" },
  { path: "config/repos/blvm-node.yml", label: "Repo: blvm-node" },
  { path: "config/repos/blvm-protocol.yml", label: "Repo: blvm-protocol" },
  { path: "config/repos/blvm-sdk.yml", label: "Repo: blvm-sdk" },
  { path: "config/repos/blvm-spec.yml", label: "Repo: blvm-spec" },
  { path: "config/maintainers/emergency.yml", label: "Maintainers: emergency" },
  { path: "config/maintainers/layer-1-2.yml", label: "Maintainers: layer 1–2" },
  { path: "config/maintainers/layer-3.yml", label: "Maintainers: layer 3" },
  { path: "config/maintainers/layer-4.yml", label: "Maintainers: layer 4" },
];

async function fetchYamlText(path) {
  /* CDN first: many blockers allow cdn.jsdelivr.net but block raw.githubusercontent.com. */
  const sources = [`${GOV_CDN}/${path}`, `${GOV_RAW}/${path}`];
  let lastErr;
  for (const url of sources) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      return await res.text();
    } catch (e) {
      lastErr = e instanceof Error ? e : new Error(String(e));
    }
  }
  const hint =
    lastErr?.message === "Failed to fetch"
      ? " (privacy extensions often block raw.githubusercontent.com; this page should retry via jsDelivr — if both fail, allow the site or disable the blocker for this page.)"
      : "";
  throw new Error((lastErr?.message || "Failed to load YAML") + hint);
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** Array of similar objects → table; otherwise list. */
function YamlArray({ value }) {
  if (!Array.isArray(value) || value.length === 0) {
    return <span className="gov-yml-scalar">[]</span>;
  }

  const allObjects = value.every(
    (item) => isPlainObject(item) && item !== null
  );

  if (allObjects) {
    const keysPerRow = value.map((row) => Object.keys(row).length);
    const eachRowSingleKey = keysPerRow.every((n) => n === 1);

    /* e.g. process: [ { flag_a: true }, { flag_b: true } ] — table columns look broken */
    if (eachRowSingleKey) {
      return (
        <ul className="gov-yml-list gov-yml-list-singlekey">
          {value.map((row, i) => {
            const [k] = Object.keys(row);
            return (
              <li key={i}>
                <code className="gov-yml-singlekey-k">{k}</code>
                <span className="gov-yml-singlekey-sep">: </span>
                <YamlValue value={row[k]} inline />
              </li>
            );
          })}
        </ul>
      );
    }

    const keySet = new Set();
    value.forEach((row) => {
      Object.keys(row).forEach((k) => keySet.add(k));
    });
    const keys = Array.from(keySet);

    return (
      <div className="gov-yml-table-wrap">
        <table className="gov-yml-table">
          <thead>
            <tr>
              {keys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.map((row, i) => (
              <tr key={i}>
                {keys.map((k) => (
                  <td key={k}>
                    <YamlValue value={row[k]} inline />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <ul className="gov-yml-list">
      {value.map((item, i) => (
        <li key={i}>
          <YamlValue value={item} />
        </li>
      ))}
    </ul>
  );
}

function YamlObject({ value }) {
  const entries = Object.entries(value);
  if (entries.length === 0) {
    return <span className="gov-yml-scalar">{"{}"}</span>;
  }

  return (
    <dl className="gov-yml-dl">
      {entries.map(([k, v]) => (
        <div key={k} className="gov-yml-kv">
          <dt>
            <code>{k}</code>
          </dt>
          <dd>
            <YamlValue value={v} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function YamlValue({ value, inline }) {
  if (value === null || value === undefined) {
    return <span className="gov-yml-null">—</span>;
  }
  if (typeof value === "boolean") {
    return <span className="gov-yml-scalar">{value ? "true" : "false"}</span>;
  }
  if (typeof value === "number") {
    return <span className="gov-yml-scalar">{value}</span>;
  }
  if (typeof value === "string") {
    const s = value;
    if (inline && s.length > 120) {
      return (
        <span className="gov-yml-scalar gov-yml-str" title={s}>
          {s.slice(0, 120)}…
        </span>
      );
    }
    return <span className="gov-yml-scalar gov-yml-str">{s}</span>;
  }
  if (Array.isArray(value)) {
    return <YamlArray value={value} />;
  }
  if (isPlainObject(value)) {
    return <YamlObject value={value} />;
  }
  return <span className="gov-yml-scalar">{String(value)}</span>;
}

export default function GovernancePage() {
  const [loading, setLoading] = useState(true);
  const [fileResults, setFileResults] = useState({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      let next = null;
      try {
        const yaml = (await import("js-yaml")).default;
        const settled = await Promise.allSettled(
          YAML_FILES.map(async ({ path }) => {
            const text = await fetchYamlText(path);
            const data = yaml.load(text);
            return { path, data };
          })
        );

        if (cancelled) return;

        next = {};
        settled.forEach((result, i) => {
          const path = YAML_FILES[i].path;
          if (result.status === "fulfilled") {
            next[path] = { ok: true, data: result.value.data };
          } else {
            next[path] = {
              ok: false,
              error: result.reason?.message || String(result.reason),
            };
          }
        });
      } catch (e) {
        if (!cancelled) {
          const msg = e?.message || String(e);
          next = Object.fromEntries(
            YAML_FILES.map(({ path }) => [
              path,
              { ok: false, error: msg },
            ])
          );
        }
      } finally {
        if (!cancelled) {
          if (next) setFileResults(next);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const loadedCount = Object.values(fileResults).filter((r) => r.ok).length;
  const failCount = Object.values(fileResults).filter((r) => !r.ok).length;

  return (
    <section id="governance" className="section governance-page">
      <div className="container">
        <h2>Cryptographic commons governance</h2>
        <div className="governance-lead">
          <p>
            Forkable rules, multisig thresholds, and published processes for how
            BTCDecoded ships software under{" "}
            <a
              href="https://thebitcoincommons.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bitcoin Commons
            </a>
            . Below, every variable from the live YAML in the public{" "}
            <a
              href="https://github.com/BTCDecoded/governance"
              target="_blank"
              rel="noopener noreferrer"
            >
              governance
            </a>{" "}
            repository is loaded in your browser and rendered in full (same
            sources as CI and the governance designer).
          </p>
        </div>

        <GovernanceSpectrumLight />

        <div className="governance-cta-row">
          <a
            href="https://thebitcoincommons.org/governance-designer.html"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Design your own governance
          </a>
          <a
            href="https://docs.thebitcoincommons.org/governance/overview.html"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Governance documentation
          </a>
          <a
            href="https://github.com/BTCDecoded/governance"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository on GitHub
          </a>
        </div>

        <p className="governance-muted governance-note">
          {loading ? (
            <>
              Fetching {YAML_FILES.length} YAML files from GitHub. Each row
              shows the path, links, and load status; expand to see the parsed
              tree.
            </>
          ) : (
            <>
              Loaded {loadedCount} / {YAML_FILES.length} files
              {failCount > 0
                ? ` (${failCount} failed — expand the row for the error)`
                : ""}
              . Large files (e.g. test vectors, expanded template) start
              collapsed.
            </>
          )}
        </p>

        <h3 className="governance-subheading">Governance files (live YAML)</h3>
        <p className="governance-muted">
          Same sources as CI and the governance designer. Arrays of objects
          render as tables where it helps; single-key rows render as lists.
          Expand a file to inspect every field.
        </p>

        <div className="gov-yml-files">
          {YAML_FILES.map(({ path, label }, idx) => {
            const r = fileResults[path];

            return (
              <details
                key={path}
                className="gov-yml-details"
                open={idx === 0 && r?.ok}
              >
                <summary className="gov-yml-summary">
                  <div className="gov-yml-summary-inner">
                    <div className="gov-yml-summary-titleline">
                      <span className="gov-yml-summary-label">{label}</span>
                      <span className="gov-yml-summary-status" aria-live="polite">
                        {loading && !r && (
                          <span className="gov-yml-summary-pending">Loading…</span>
                        )}
                        {r?.ok === false && (
                          <span className="gov-yml-summary-err">Failed</span>
                        )}
                      </span>
                    </div>
                    <div className="gov-yml-summary-metarow">
                      <code className="gov-yml-summary-path">{path}</code>
                      <nav
                        className="gov-yml-summary-links"
                        aria-label={`Source links for ${label}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          className="gov-yml-src-btn"
                          href={`${GOV_BLOB}/${path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa-brands fa-github"
                            aria-hidden="true"
                          />
                          <span>GitHub</span>
                        </a>
                        <a
                          className="gov-yml-src-btn"
                          href={`${GOV_RAW}/${path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i
                            className="fa-solid fa-file-code"
                            aria-hidden="true"
                          />
                          <span>Raw</span>
                        </a>
                      </nav>
                    </div>
                  </div>
                </summary>
                <div className="gov-yml-body">
                  {!r && loading && (
                    <p className="governance-status">Fetching this file…</p>
                  )}
                  {!r && !loading && (
                    <p className="governance-status">No data (unexpected).</p>
                  )}
                  {r?.ok === false && (
                    <p className="governance-error" role="alert">
                      {r.error}
                    </p>
                  )}
                  {r?.ok && <YamlValue value={r.data} />}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
