import Head from "next/head";
import { useRouter } from "next/router";
import {
  OG_IMAGE,
  ORG_LOGO,
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
        logo: ORG_LOGO,
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
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@DecodeBitcoin" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={SITE_NAME} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
