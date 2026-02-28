export default function ProblemContentPage() {
  return (
    <>
      <section id="problem" class="section">
        <div class="container">
          <h2>Bitcoin Consensus, Decoded</h2>
          <div class="content">
            <p>
              Formally verified Bitcoin implementation. Every critical function
              is mathematically proven against the Orange Paper specification
              using Z3 SMT solver.
            </p>
          </div>
        </div>
      </section>
      {/* <!-- About Bitcoin Commons Section --> */}
      <section id="about-commons" class="section">
        <div class="container">
          <h2>Built on Bitcoin Commons</h2>
          <div class="content">
            <p>
              Forkable governance framework applying Ostrom's commons principles
              through cryptographic enforcement.
            </p>

            <a
              href="https://thebitcoincommons.org"
              class="btn btn-outline"
              target="_blank"
              rel="noopener"
            >
              Learn About the Framework
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
