import Link from "next/link";

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-head">
          <p className="page-kicker">Legal</p>
          <h1>Terms</h1>
          <p className="page-lede">
            Paying for Intelligence or signing in to use it is agreeing to this
            page. Last updated 18 September 2026.
          </p>
        </header>

        <div className="content legal-content">
          <h2>What this covers</h2>
          <p>
            These terms are for{" "}
            <Link href="/intelligence/">BTCDecoded Intelligence</Link> and this
            website. Intelligence is cited search over a public Bitcoin
            coordination record. It is not a live price desk, chain analytics,
            a wallet, or financial, legal, or investment advice.
          </p>
          <p>
            <Link href="/install/">BLVM</Link> is separate software you run
            yourself. GitHub holds its license. Bitcoin Commons governance and
            the Orange Paper are published on{" "}
            <a
              href="https://thebitcoincommons.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              thebitcoincommons.org
            </a>
            .
          </p>

          <h2>Account</h2>
          <p>
            Sign in with GitHub or Nostr. A paid key is stored on that login.
            Keep the OAuth fields and API key private. Anyone with the key can
            use your query quota.
          </p>

          <h2>Plans and Lightning</h2>
          <p>
            Plans are prepaid: a number of days and a daily query cap, as listed
            on <Link href="/pricing/">Plans</Link>. Checkout is a Bitcoin
            Lightning invoice. Once that invoice settles, the payment is on
            Bitcoin and we cannot reverse it.
          </p>
          <p>
            If a settled invoice does not activate a key, use{" "}
            <Link href="/support/">Support</Link>. Upgrades keep the same key
            and charge the sat difference. Referral credit is Intelligence
            credit only. It is not withdrawable. A coupon and a referral code
            cannot be combined.
          </p>

          <h2>Use of the service</h2>
          <p>
            Use the MCP connector and the key for your own research and tools,
            within the daily cap. Do not share, sell, or rotate keys around a
            cap; do not attack the service; do not use it to break other
            people’s systems. Developer <code>analyze_pr</code> is for public
            GitHub pull requests only.
          </p>
          <p>
            We can suspend a login that is abusing the service or the referral
            program.
          </p>

          <h2>The index</h2>
          <p>
            The corpus is an index of public sources with citations. It can be
            incomplete or wrong. Read the original. Third-party copyright stays
            with those authors.
          </p>

          <h2 id="privacy">Privacy</h2>
          <p>
            We keep what the product needs: GitHub or Nostr identity, plan and
            key metadata, Lightning payment data used to credit that login, and
            support mail you send. Query counts enforce the daily cap. We do
            not sell that.
          </p>
          <p>
            Sign out from <Link href="/account/">Account</Link>. To close a
            login, email{" "}
            <a href="mailto:support@btcdecoded.org">support@btcdecoded.org</a>.
          </p>

          <h2>No warranty</h2>
          <p>
            The site, the index, and MCP are provided as-is. They can be down
            or wrong. You run a BLVM node at your own risk.
          </p>

          <h2>Contact</h2>
          <p>
            Billing, keys, and checkout:{" "}
            <Link href="/support/">Support</Link> or{" "}
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
