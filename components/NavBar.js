import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function isActivePath(pathname, href) {
  const path = (pathname || "/").replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return path === target;
}

export default function NavBar({ navLinks }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`nav${open ? " is-open" : ""}`} aria-label="Primary">
      <div className="nav-bar">
        <div className="nav-logo">
          <Link href="/" onClick={() => setOpen(false)}>
            BTCDecoded
          </Link>
        </div>

        <button
          type="button"
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-controls="site-nav-links"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-toggle__bars" aria-hidden="true" />
          <span className="visually-hidden">
            {open ? "Close menu" : "Open menu"}
          </span>
        </button>

        <div
          id="site-nav-links"
          className={`nav-links${open ? " is-open" : ""}`}
        >
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  isActivePath(router.pathname, link.href) ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            )
          )}
        </div>
      </div>
      <button
        type="button"
        className={`nav-backdrop${open ? " is-open" : ""}`}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      />
    </nav>
  );
}
