export default function GovernancePage() {
  return (
    <section id="governance" class="section">
      <div class="container">
        <h2>Cryptographic Commons</h2>
        <div class="content">
          <div class="commons-intro">
            <p>
              Forkable governance framework applying Ostrom's commons principles
              through cryptographic enforcement.{" "}
              <a
                href="https://thebitcoincommons.org"
                target="_blank"
                rel="noopener"
              >
                Learn about Bitcoin Commons
              </a>
              .
            </p>
            <div class="commons-cta">
              <a
                href="https://docs.thebitcoincommons.org/governance/overview.html"
                class="btn btn-outline"
                target="_blank"
                rel="noopener"
              >
                Governance Documentation
              </a>
              <a
                href="https://github.com/BTCDecoded/governance"
                class="btn btn-outline"
                target="_blank"
                rel="noopener"
              >
                View on GitHub
              </a>
            </div>
          </div>

          <div class="commons-chart-fullwidth">
            <div class="commons-chart-wrapper">
              <img
                src="https://thebitcoincommons.org/assets/images/centralized-vs-decentralized.png"
                alt="Centralized vs Decentralized Governance"
              />
            </div>
            <p class="diagram-caption">
              Decentralized, forkable governance prevents capture through exit
              competition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
