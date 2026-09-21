import Link from "next/link";
import { MCP_URL } from "../lib/api";
import IntelChrome from "../components/IntelChrome";

const APP_INSTALL =
  "https://github.com/apps/btcdecoded-intelligence/installations/new";

const SEARCH_TOOLS = [
  ["search", "Cited passages. If the reply says the index had no passage, stop there."],
  ["assess_argument", "Named game, numbered claim, or monopoly fallacy from stored policy docs."],
  ["get_contributor_profile", "Public-record facts for a GitHub login. Unknown logins are not found."],
  ["get_passage", "The stored excerpt for a cite. Not a live crawl."],
  ["get_snapshot", "Replay a dated report. Free. A new date is a new tool call."],
  ["verify_claim", "Whether a stored excerpt supports a claim."],
];

const DEV_TOOLS = [
  ["analyze_pr", "Public GitHub pull request. Does not post."],
  ["analyze_issue", "Public GitHub issue. Does not post."],
  ["analyze_submission", "Advisory spec versus submission. Not a merge or payout."],
  ["find_discourse", "Cited discussion for a path or symbol."],
  ["find_precedent", "Cited precedent. No new disposition label."],
  ["find_incident", "Cited incident or CVE."],
  ["find_spec_impl", "Cited spec and implementation. Cites only."],
];

export default function IntelligenceDocsPage() {
  return (
    <IntelChrome
      title="Docs"
      lede="Pay with Lightning. Call MCP. Account holds the key."
    >
      <nav className="intel-docs-toc" aria-label="On this page">
        <a href="#connect">Connect</a>
        <a href="#tools">Tools</a>
        <a href="#app">GitHub App</a>
      </nav>

      <div className="intel-docs">
        <section id="connect" className="intel-docs-block">
          <h2>Connect</h2>
          <div className="intel-uses">
            <article>
              <h3>Endpoint</h3>
              <p>
                <code>{MCP_URL}</code>
                <br />
                Streamable HTTP. JSON-RPC.
              </p>
            </article>
            <article>
              <h3>Key</h3>
              <p>
                Sign in on <Link href="/account/">Account</Link>, pay on{" "}
                <Link href="/subscribe/">Checkout</Link>. The key stays on
                that login. Anyone with it can use your quota.
              </p>
            </article>
            <article>
              <h3>Clients</h3>
              <p>
                Claude.ai uses OAuth fields from Account. Cursor and other
                clients send <code>Authorization: Bearer</code>. Snippets are
                on Account after you reveal the key.
              </p>
            </article>
          </div>
          <p>
            <code>tools/list</code> is public. <code>tools/call</code> needs
            the key. Agents: fetch{" "}
            <a href="/intelligence/SKILL.md">/intelligence/SKILL.md</a>.
          </p>
          <pre className="intel-docs-pre">{`curl -s ${MCP_URL} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search","arguments":{"query":"taproot activation"}}}'`}</pre>
        </section>

        <section id="tools" className="intel-docs-block">
          <h2>Tools</h2>
          <p>
            Use <code>tools/list</code> for the live catalog. Developer tools
            need a Developer plan. Analyze calls use more of the daily cap.
          </p>
          <div className="intel-index__grid">
            <article>
              <h3>Every plan</h3>
              <dl className="intel-docs-dl">
                {SEARCH_TOOLS.map(([name, what]) => (
                  <div key={name}>
                    <dt>
                      <code>{name}</code>
                    </dt>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
            </article>
            <article>
              <h3>Developer</h3>
              <dl className="intel-docs-dl">
                {DEV_TOOLS.map(([name, what]) => (
                  <div key={name}>
                    <dt>
                      <code>{name}</code>
                    </dt>
                    <dd>{what}</dd>
                  </div>
                ))}
              </dl>
              <p>
                <code>analyze_pr</code> and <code>analyze_issue</code> take a
                public GitHub URL. <code>analyze_submission</code> takes{" "}
                <code>spec</code> and <code>submission</code>. An optional{" "}
                <code>github_pr</code> must be public. It does not fetch
                arbitrary URLs. Labels are <code>met</code>,{" "}
                <code>not_met</code>, or <code>ambiguous</code>, with cites.
              </p>
            </article>
          </div>
        </section>

        <section id="app" className="intel-docs-block">
          <h2>GitHub App</h2>
          <p>
            On an armed Developer install the bot can comment and post a
            neutral check, including on private repos. MCP review stays
            public-only and does not post. Private review is not added to the
            public index. The App does not merge.
          </p>
          <div className="home-ctas intel-ctas">
            <a
              className="btn btn-primary"
              href={APP_INSTALL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Install on GitHub
            </a>
            <Link href="/account/" className="btn btn-secondary">
              Arm from Account
            </Link>
            <Link href="/pricing/" className="btn btn-outline">
              Plans
            </Link>
          </div>
        </section>
      </div>
    </IntelChrome>
  );
}
