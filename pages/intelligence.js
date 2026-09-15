import Link from "next/link";
import { MCP_URL } from "../lib/api";
import SignetNotice from "../components/SignetNotice";

export default function IntelligencePage() {
  return (
    <section className="section">
      <div className="container">
        <h2>Intelligence</h2>
        <div className="content">
          <SignetNotice />
          <p>
            Paid answers about Bitcoin’s review history and informal record,
            with citations. You get an HTTPS MCP URL and a key. You do not get
            a download of the underlying archives.
          </p>
          <p>
            Connector:{" "}
            <code>{MCP_URL}</code>
          </p>
          <p>
            Add that URL in Claude (or any Streamable HTTP MCP client) with your
            key as a Bearer token. Search across findings, Core history, and
            selected source. Developer keys can scaffold a public PR. Results
            are advisory. This is not a merge check and not live governance.
          </p>
          <p>
            What you can query: published findings, argument maps, Core docs and
            selected <code>src/</code>, plus the informal record (PRs, lists,
            IRC, Delving, Bitcointalk). Staleness is labeled on each result.
          </p>
          <div className="hero-ctas" style={{ marginTop: "1.5rem" }}>
            <Link href="/pricing/" className="btn btn-primary">
              Pricing
            </Link>
            <Link href="/account/" className="btn btn-secondary">
              Account
            </Link>
            <Link href="/subscribe/" className="btn btn-secondary">
              Get a key
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
