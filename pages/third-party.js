import Link from "next/link";

export default function ThirdPartyPage() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">Legal</p>
          <h1>Third-party services</h1>
          <p className="page-lede">
            Who besides BTCDecoded can receive data from Intelligence or the
            GitHub App. Last updated 19 September 2026.{" "}
            <Link href="/privacy/">Privacy</Link>.
          </p>
        </header>

        <div className="content legal-content">
          <h2>GitHub</h2>
          <p>
            OAuth sign-in and the{" "}
            <a
              href="https://github.com/apps/btcdecoded-intelligence"
              target="_blank"
              rel="noopener noreferrer"
            >
              btcdecoded-intelligence
            </a>{" "}
            App. GitHub sees logins, installs, webhooks, and repository access
            you grant.
          </p>
          <p>
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub privacy
            </a>
            .{" "}
            <a
              href="https://docs.github.com/en/site-policy/github-terms/github-terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub terms
            </a>
            .
          </p>

          <h2>Cloudflare</h2>
          <p>
            mcp.btcdecoded.org runs on Cloudflare Workers, with D1, KV, R2, and
            Vectorize for the public index and accounts. Cloudflare Workers AI
            may receive a private pull-request or issue draft for a live App
            review. We do not add that draft to the public index.
          </p>
          <p>
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare privacy
            </a>
            .{" "}
            <a
              href="https://www.cloudflare.com/website-terms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloudflare terms
            </a>
            .{" "}
            <a
              href="https://developers.cloudflare.com/workers-ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Workers AI
            </a>
            .
          </p>

          <h2>Bitcoin Lightning</h2>
          <p>
            Checkout is a Lightning invoice. Once it settles, the payment is on
            Bitcoin. Routing nodes on the path can see invoice payment data the
            same way any Lightning payment works. We cannot reverse a settled
            invoice.
          </p>

          <h2>Nostr</h2>
          <p>
            If you sign in with Nostr, a NIP-07 signer in your browser signs a
            login event. We keep the public key on the account. We do not hold
            your nsec.
          </p>

          <h2>MCP clients</h2>
          <p>
            Claude, Cursor, and other clients you connect to{" "}
            <code>https://mcp.btcdecoded.org/mcp</code> receive whatever you
            send them. We do not send your GitHub private drafts to those
            vendors unless you do.
          </p>
          <p>
            <a
              href="https://www.anthropic.com/legal/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anthropic privacy
            </a>
            .
          </p>

          <h2>Site assets</h2>
          <p>
            This website loads Font Awesome from cdnjs and, on the Orange
            Paper page, MathJax from a public CDN. Those hosts see ordinary
            page-load requests, not GitHub App payloads.
          </p>
        </div>
      </div>
    </section>
  );
}
