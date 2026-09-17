import React, { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import "../components/styles.css";
import Splash from "../components/Splash";
import { MathJaxContext } from "better-react-mathjax";
import Footer from "../components/Footer";

const mathJaxconfig = {
  loader: { load: ["input/tex", "output/chtml"] },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
  },
  output: {
    font: "mathjax-stix2",
  },
};

export const Workflow = {
  Nodes: "Nodes",
  Developers: "Developers",
  Splash: "Splash",
};

export default function MyApp({ Component, pageProps }) {
  const [selectedWorkflow, setSelectedWorkflow] = useState(Workflow.Developers);

  return (
    <MathJaxContext config={mathJaxconfig}>
      <Head>
        <title>BTCDecoded</title>
        <meta
          name="description"
          content="BTCDecoded Intelligence: cited search over Bitcoin’s public coordination record. Lightning. MCP. BLVM is the node."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="describedby" href="/llms.txt" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Layout>
        <NavBar />
        {selectedWorkflow === Workflow.Splash && (
          <Splash
            setSelectedWorkflow={setSelectedWorkflow}
            Workflow={Workflow}
          />
        )}

        {selectedWorkflow !== Workflow.Splash && <Component {...pageProps} />}
        <Footer />
      </Layout>
    </MathJaxContext>
  );
}
