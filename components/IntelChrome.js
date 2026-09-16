import Head from "next/head";
import SignetNotice from "./SignetNotice";
import IntelSubnav from "./IntelSubnav";

export default function IntelChrome({
  title,
  kicker = "Intelligence",
  lede,
  heading = true,
  children,
}) {
  return (
    <section className="section intel-page">
      <Head>
        <title>{`${title} · BTCDecoded`}</title>
      </Head>
      <div className="container">
        <p className="fund-kicker">{kicker}</p>
        <IntelSubnav />
        {heading ? (
          <>
            <h2>{title}</h2>
            {lede ? <p className="intel-lede">{lede}</p> : null}
          </>
        ) : null}
        <SignetNotice />
        {children}
      </div>
    </section>
  );
}
