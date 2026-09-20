import Link from "next/link";

export default function SecurityPage() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">Legal</p>
          <h1>Security and safety</h1>
          <p className="page-lede">
            How the BTCDecoded Intelligence GitHub App is bounded. Last updated
            19 September 2026.
          </p>
        </header>

        <div className="content legal-content">
          <h2>What the App is</h2>
          <p>
            <a
              href="https://github.com/apps/btcdecoded-intelligence"
              target="_blank"
              rel="noopener noreferrer"
            >
              btcdecoded-intelligence
            </a>{" "}
            posts cited review comments and a{" "}
            <strong>neutral</strong> check on installed repositories. It does
            not approve, reject, or merge. Humans keep merge authority. MCP{" "}
            <code>analyze_pr</code> / <code>analyze_issue</code> stay on public
            GitHub URLs. MCP <code>analyze_submission</code> is advisory. An
            optional <code>github_pr</code> must be a public GitHub pull
            request. Private review is the App webhook path only.
          </p>

          <h2>Risk management</h2>
          <p>
            The App is inert until the installer GitHub login matches the
            signed-in account and that account has an unexpired Developer plan.
            Each armed run costs query quota. Unarmed or over cap: no issue
            comment. Checks, when written, are conclusion{" "}
            <code>neutral</code> only. The bot skips other bots, skip drafts on
            open, and only answers the command token <code>/btcdecoded</code>.
            Writes use the installation token. Org installs arm the installer,
            not the org login.
          </p>

          <h2>Data governance</h2>
          <p>
            Private patches and issue bodies are live-only: not stored in the
            public index, Vectorize, or R2, and not logged. A private draft may
            be sent to Cloudflare Workers AI for that review. Webhooks are
            HMAC-verified on the raw body; a failed signature is rejected.
            Duplicate deliveries are ignored. Uninstall the App on GitHub to
            stop new reads. Detail: <Link href="/privacy/">Privacy</Link> and{" "}
            <Link href="/third-party/">Third-party services</Link>.
          </p>

          <h2>Human oversight</h2>
          <p>
            Comments are suggestions with citations. They are not a required
            merge gate. A person still reviews and merges. The App never posts a
            merge verdict.
          </p>

          <h2>EU AI Act</h2>
          <p>
            This is a developer-tooling assistant. It is not an Annex III
            high-risk system under Article 6 (not biometrics, employment,
            essential private or public services, law enforcement, or the other
            listed high-risk areas). Articles 8–17 therefore are not claimed as
            a high-risk conformity set. Transparency: GitHub shows the App as a
            bot; comments are clearly from the App; a human remains in the merge
            loop.
          </p>

          <h2>Compliance and reports</h2>
          <p>
            No SOC 2, ISO/IEC 27001, GDPR certification, or EU AI Act
            conformity-assessment reports are published. There is no third-party
            audit PDF to link. Practices on this page are product controls, not
            a certification.
          </p>
          <p>
            Listing on GitHub Marketplace is under the GitHub Marketplace
            Developer Agreement. Product terms: <Link href="/terms/">Terms</Link>
            . Security reports:{" "}
            <a href="mailto:security@thebitcoincommons.org">
              security@thebitcoincommons.org
            </a>
            . Support: <Link href="/support/">Support</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
