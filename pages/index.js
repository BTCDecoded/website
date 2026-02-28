import Layout from "../components/Layout";
import Link from "next/link";

export default function IndexPage() {
  return (
    <section id="hero" class="hero">
      <div class="container">
        <h1>BTCDecoded</h1>
        <p class="tagline">
          Bitcoin Decoded: Bitcoin LLVM and Cryptographic Commons
        </p>

        <div class="hero-ctas">
          {/* <a href="#book" class="btn btn-primary">Read the Book</a>  */}
          <a
            href="https://docs.thebitcoincommons.org"
            class="btn btn-secondary"
            target="_blank"
            rel="noopener"
          >
            Documentation
          </a>
          <a
            href="https://btccommons.substack.com"
            class="btn btn-secondary"
            target="_blank"
            rel="noopener"
          >
            Subscribe on Substack
          </a>
          <a href="#repositories" class="btn btn-secondary">
            Explore Repositories
          </a>
          <a
            href="https://thebitcoincommons.org/orange-paper.html"
            class="btn btn-outline"
            target="_blank"
            rel="noopener"
          >
            Read the Orange Paper
          </a>
        </div>
      </div>
    </section>
  );
}
