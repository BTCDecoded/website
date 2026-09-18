import Link from "next/link";

export default function SiteBrand({ className = "", onClick }) {
  return (
    <Link
      href="/"
      className={`site-brand${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <img
        src="/assets/logo.png"
        alt="BTCDecoded"
        className="site-brand__img"
        width={870}
        height={285}
      />
    </Link>
  );
}
