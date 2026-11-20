import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#f7931a" />
        <meta name="color-scheme" content="only light" />
        {/* Chrome Auto Dark inverts canvas, not images. Probe canvas with
            `only light` — `color-scheme:light` is already dark on a dark OS
            even when this page is not inverted, which painted a white pancake
            on a white chip. https://developer.chrome.com/blog/auto-dark-theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.createElement("div");d.style.cssText="position:absolute;left:-9999px;width:8px;height:8px;background-color:canvas;color-scheme:only light";document.documentElement.appendChild(d);var c=getComputedStyle(d).backgroundColor.replace(/ /g,"");d.remove();if(c&&c!=="rgb(255,255,255)"&&c!=="#ffffff"&&c!=="white")document.documentElement.classList.add("auto-dark");}catch(e){}})();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
