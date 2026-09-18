import Link from "next/link";

export default function SiteBrand({ className = "", onClick }) {
  return (
    <Link
      href="/"
      className={`site-brand${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <picture>
        <source
          srcSet="/assets/logo-white.png"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/assets/logo.png"
          alt="BTCDecoded"
          className="site-brand__img"
          width={870}
          height={285}
        />
      </picture>
    </Link>
  );
}
