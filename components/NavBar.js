import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar({ navLinks }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <nav className="nav">
      {isMobile && 
      <div className="nav-container-mobile">
        <div className="nav-logo">
          <Link href="/" style={{ marginRight: 12 }}>
            BTCDecoded
          </Link>
        </div>
        <div className="nav-links nav-links-mobile">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} style={{ marginRight: 12 }}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      }
      {!isMobile &&
      <div className="nav-container">
        <div className="nav-logo">
          <Link href="/" style={{ marginRight: 12 }}>
            BTCDecoded
          </Link>
        </div>
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <Link key={index} href={link.href} style={{ marginRight: 12 }}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      }
    </nav>
  );
}
