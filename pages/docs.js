import Head from "next/head";

const DEST = "https://docs.btcdecoded.org/intelligence/";

export default function DocsRedirect() {
  return (
    <>
      <Head>
        <title>Intelligence docs · BTCDecoded</title>
        <link rel="canonical" href={DEST} />
        <meta httpEquiv="refresh" content={`0; url=${DEST}`} />
      </Head>
      <section className="section">
        <div className="container">
          <h1>Intelligence docs</h1>
          <p>
            <a href={DEST}>Continue to the documentation site</a>
          </p>
        </div>
      </section>
    </>
  );
}
