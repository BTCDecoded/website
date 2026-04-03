import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <main style={{ padding: "12px" }}>{children}</main>
    </div>
  );
}
