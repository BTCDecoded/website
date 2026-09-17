import Head from "next/head";
import { useRouter } from "next/router";
import {
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
  pageMeta,
} from "../lib/pageMeta";

export default function SiteHead() {
  const router = useRouter();
  const meta = pageMeta(router.pathname);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_ORIGIN,
        logo: OG_IMAGE,
        sameAs: [
          "https://x.com/DecodeBitcoin",
          "https://github.com/BTCDecoded",
        ],
      },
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_ORIGIN,
      },
    ],
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={SITE_NAME} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@DecodeBitcoin" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
