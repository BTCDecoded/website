import Link from "next/link";
import SiteBrand from "./SiteBrand";

const XIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SubstackIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <SiteBrand className="footer-brand" />

        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li>
                <Link href="/intelligence/">Intelligence</Link>
              </li>
              <li>
                <Link href="/install/">BLVM</Link>
              </li>
              <li>
                <a
                  href="https://commonspool.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Commons Pool
                </a>
              </li>
              <li>
                <a
                  href="https://plebly.fund/#projects"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plebly
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Site</h4>
            <ul>
              <li>
                <Link href="/pricing/">Plans</Link>
              </li>
              <li>
                <Link href="/account/">Account</Link>
              </li>
              <li>
                <a href="mailto:support@btcdecoded.org">Support</a>
              </li>
              <li>
                <a
                  href="https://docs.thebitcoincommons.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Docs
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow</h4>
            <ul>
              <li>
                <a
                  className="footer-social"
                  href="https://x.com/DecodeBitcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {XIcon}
                  <span>@DecodeBitcoin</span>
                </a>
              </li>
              <li>
                <a
                  className="footer-social"
                  href="https://github.com/BTCDecoded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {GitHubIcon}
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  className="footer-social"
                  href="https://btccommons.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SubstackIcon}
                  <span>Substack</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <p className="footer-bar">
          <span>© 2026 BTCDecoded</span>
          <a
            href="https://thebitcoincommons.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bitcoin Commons
          </a>
        </p>
      </div>
    </footer>
  );
}
