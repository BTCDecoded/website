import Link from "next/link";

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">Legal</p>
          <h1>Privacy</h1>
          <p className="page-lede">
            How BTCDecoded Intelligence and the GitHub App handle account and
            repository data. Last updated 19 September 2026.
          </p>
        </header>

        <div className="content legal-content">
          <h2>Who this is</h2>
          <p>
            BTCDecoded runs Intelligence at{" "}
            <a href="https://btcdecoded.org">btcdecoded.org</a> and the GitHub
            App{" "}
            <a
              href="https://github.com/apps/btcdecoded-intelligence"
              target="_blank"
              rel="noopener noreferrer"
            >
              btcdecoded-intelligence
            </a>
            . This page is the privacy policy for those products.{" "}
            <Link href="/terms/">Terms</Link> cover payment and use.{" "}
            <Link href="/third-party/">Third-party services</Link> lists who
            else can see data.{" "}
            <Link href="/security/">Security and safety</Link> is the GitHub
            Marketplace overview.
          </p>

          <h2>What we keep</h2>
          <p>
            GitHub or Nostr identity for the login. Plan, key, and query-count
            metadata so the daily cap works. Lightning payment data used to
            credit that login. GitHub App installation id, installer login, and
            whether the install is armed. Support mail you send. A session
            token in this browser’s session storage, and a session cookie on
            mcp.btcdecoded.org.
          </p>
          <p>We do not sell that.</p>

          <h2>GitHub App</h2>
          <p>
            On installed repositories the App may read issues and pull requests,
            including private ones, to write one cited review comment and a
            neutral check. It does not post a merge verdict. MCP{" "}
            <code>analyze_pr</code> and <code>analyze_issue</code> stay on
            public GitHub URLs. MCP <code>analyze_submission</code> may pack an
            optional public GitHub PR; it does not fetch arbitrary URLs.
          </p>
          <p>
            Private review is live-only. We do not put those patches or issue
            bodies in the public index, Vectorize, or R2, and we do not log
            them. A private draft may be sent to Cloudflare Workers AI for that
            review. Uninstall the App on GitHub to stop new reads.
          </p>

          <h2>MCP and clients</h2>
          <p>
            Queries you send to{" "}
            <code>https://mcp.btcdecoded.org/mcp</code> are processed to answer
            you and to count against the daily cap. If you paste the connector
            into Claude or another client, that client’s vendor also sees what
            you send there. That is their product, not ours.
          </p>

          <h2>Your choices</h2>
          <p>
            Sign out from <Link href="/account/">Account</Link>. To close a
            login, email{" "}
            <a href="mailto:support@btcdecoded.org">support@btcdecoded.org</a>.
            Security:{" "}
            <a href="mailto:security@thebitcoincommons.org">
              security@thebitcoincommons.org
            </a>
            .
          </p>
          <p>
            We can change this page. The date above is the current version.
          </p>
        </div>
      </div>
    </section>
  );
}
