import Link from "next/link";

export default function SiteBrand({ className = "", onClick }) {
  return (
    <Link
      href="/"
      className={`site-brand${className ? ` ${className}` : ""}`}
      aria-label="BTCDecoded"
      onClick={onClick}
    >
      <img
        src="/assets/logo-mark.png"
        alt=""
        className="site-brand__mark"
        width={276}
        height={276}
      />
      <span className="site-brand__word">Decoded</span>
    </Link>
  );
}
