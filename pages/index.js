import Link from "next/link";

export default function IndexPage() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <h1>BTCDecoded</h1>
        <p className="tagline">
          Bitcoin Decoded — shared specification, verified consensus, forkable
          governance
        </p>
        <p className="hero-lead">
          First full implementation of{" "}
          <a
            href="https://thebitcoincommons.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bitcoin Commons
          </a>
          : the Orange Paper (blvm-spec), formally checked consensus
          (blvm-consensus + blvm-spec-lock), a node and SDK path, and governance
          rules you can inspect or fork—not a new coin, a new way to build and
          coordinate on Bitcoin.
        </p>

        <div className="hero-ctas">
          <a
            href="https://docs.thebitcoincommons.org"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
          <a
            href="https://btccommons.substack.com"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe on Substack
          </a>
          <Link href="/architecture/" className="btn btn-secondary">
            Explore Repositories
          </Link>
          <a
            href="https://thebitcoincommons.org/orange-paper.html"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the Orange Paper
          </a>
        </div>
      </div>
    </section>
  );
}
