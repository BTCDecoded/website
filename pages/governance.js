import { useEffect, useState } from "react";

const GOV_RAW =
  "https://raw.githubusercontent.com/BTCDecoded/governance/main";
const GOV_BLOB = "https://github.com/BTCDecoded/governance/blob/main";

/** All governance YAML consumed by tooling / docs (excludes .github/workflows). */
const YAML_FILES = [
  { path: "fork-registry.yml", label: "Fork registry" },
  { path: "implementations-registry.yml", label: "Implementations registry" },
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
  const res = await fetch(`${GOV_RAW}/${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
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
              Fetching {YAML_FILES.length} YAML files from GitHub — each file is
              listed below; open a row to view YAML after load completes.
            </>
          ) : (
            <>
              Loaded {loadedCount} / {YAML_FILES.length} files
              {failCount > 0
                ? ` (${failCount} failed — expand to see errors)`
                : ""}
              . Large files (e.g. test vectors, expanded template) start
              collapsed.
            </>
          )}
        </p>

        <h3 className="governance-subheading">Live YAML (full structure)</h3>
        <p className="governance-muted">
          Arrays of objects are shown as tables. Nested objects use key/value
          lists. Open a section to inspect every field.
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
                  <span className="gov-yml-summary-label">{label}</span>
                  <code className="gov-yml-summary-path">{path}</code>
                  {loading && !r && (
                    <span className="gov-yml-summary-pending">Loading…</span>
                  )}
                  {r?.ok === false && (
                    <span className="gov-yml-summary-err">Failed</span>
                  )}
                </summary>
                <div className="gov-yml-body">
                  <div className="gov-yml-file-links">
                    <a
                      href={`${GOV_BLOB}/${path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GitHub
                    </a>
                    <a
                      href={`${GOV_RAW}/${path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Raw
                    </a>
                  </div>
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

        <h3 className="governance-subheading">Quick links</h3>
        <ul className="governance-file-grid">
          {YAML_FILES.map((f) => (
            <li key={f.path} className="governance-file-card">
              <div className="governance-file-title">{f.label}</div>
              <div className="governance-file-path">
                <code>{f.path}</code>
              </div>
              <div className="governance-file-links">
                <a
                  href={`${GOV_BLOB}/${f.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={`${GOV_RAW}/${f.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Raw
                </a>
              </div>
            </li>
          ))}
        </ul>

        <div className="commons-chart-fullwidth governance-diagram">
          <div className="commons-chart-wrapper">
            <img
              src="https://thebitcoincommons.org/assets/images/centralized-vs-decentralized.png"
              alt="Centralized vs decentralized governance comparison"
            />
          </div>
          <p className="diagram-caption">
            Decentralized, forkable governance reduces capture through exit
            competition.
          </p>
        </div>
      </div>
    </section>
  );
}
