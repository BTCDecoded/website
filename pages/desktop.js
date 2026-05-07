import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Desktop() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/install");
  }, [router]);
  return null;
}
