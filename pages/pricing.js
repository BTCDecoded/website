import Link from "next/link";
import { PACKAGES } from "../lib/api";
import SignetNotice from "../components/SignetNotice";

export default function PricingPage() {
  return (
    <section className="section">
      <div className="container">
        <h2>Intelligence pricing</h2>
        <div className="content">
          <SignetNotice />
          <p>
            Planned packages in sats (USD at $100k BTC is only a reference).
            Checkout is Bitcoin <strong>testnet3</strong>, not mainnet.
            Researcher covers search, argument maps, and contributor profiles.
            Developer adds a public-PR scaffold (spec + history + selected
            source). Results are advisory — not live governance and not a merge
            check.
          </p>
          <table className="governance-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Sats</th>
                <th>Days</th>
                <th>What you get</th>
              </tr>
            </thead>
            <tbody>
              {PACKAGES.map((p) => (
                <tr key={p.id}>
                  <td>{p.label}</td>
                  <td>{p.sats.toLocaleString()}</td>
                  <td>{p.days}</td>
                  <td>{p.tools}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: "1.5rem" }}>
            What you buy: joined findings + maps + Core history + selected
            source + informal channels. What you can already get free: one
            GitHub PR, Core <code>doc/</code>, published articles.
          </p>
          <Link href="/subscribe/" className="btn btn-primary">
            Subscribe
          </Link>
        </div>
      </div>
    </section>
  );
}
