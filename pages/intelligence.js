import Link from "next/link";
import { MCP_URL } from "../lib/api";
import CopyField from "../components/CopyField";
import IntelChrome from "../components/IntelChrome";

export default function IntelligencePage() {
  return (
    <IntelChrome
      title="Answers with citations"
      lede="A private MCP connector over Bitcoin review history and the informal record. You get a URL and a key — not a dump of the archives."
    >
      <div className="why-grid intel-grid">
        <article className="why-card">
          <h3>What you query</h3>
          <p>
            Published findings, argument maps, Core docs and selected{" "}
            <code>src/</code>, plus PRs, lists, IRC, Delving, and Bitcointalk.
            Each hit is cited. Staleness is labeled.
          </p>
        </article>
        <article className="why-card">
          <h3>How you connect</h3>
          <p>
            Add the HTTPS MCP URL in Claude (or any Streamable HTTP client) with
            your key as a Bearer token. Search and assess work on every plan.
            Developer adds an advisory PR scaffold.
          </p>
        </article>
        <article className="why-card">
          <h3>What it is not</h3>
          <p>
            Not a merge check. Not live governance. Not a download of the
            underlying corpus. Results are advisory.
          </p>
        </article>
      </div>

      <div className="intel-panel">
        <p className="intel-panel-label">MCP URL</p>
        <CopyField value={MCP_URL} />
      </div>

      <ol className="intel-steps">
        <li>
          <Link href="/account/">Sign in</Link> with GitHub or Nostr so a paid
          key is saved to your profile.
        </li>
        <li>
          Choose a plan on <Link href="/pricing/">Pricing</Link>.
        </li>
        <li>
          Pay a testnet Lightning invoice on{" "}
          <Link href="/subscribe/">Checkout</Link>, then copy the key.
        </li>
      </ol>

      <div className="hero-ctas intel-ctas">
        <Link href="/pricing/" className="btn btn-primary">
          See pricing
        </Link>
        <Link href="/account/" className="btn btn-secondary">
          Sign in
        </Link>
      </div>
    </IntelChrome>
  );
}
