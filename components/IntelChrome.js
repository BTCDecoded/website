import Head from "next/head";
import SignetNotice from "./SignetNotice";

export default function IntelChrome({
  title,
  kicker = "Intelligence",
  lede,
  children,
}) {
  return (
    <section className="section intel-page">
      <Head>
        <title>{title} · BTCDecoded</title>
      </Head>
      <div className="container">
        <p className="fund-kicker">{kicker}</p>
        <h2>{title}</h2>
        {lede ? <p className="intel-lede">{lede}</p> : null}
        <SignetNotice />
        {children}
      </div>
    </section>
  );
}
