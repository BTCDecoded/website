import { useEffect, useState } from "react";

function qrPayload(bolt11) {
  const s = String(bolt11 || "").trim();
  if (!s) return "";
  const uri = /^lightning:/i.test(s) ? s : `lightning:${s}`;
  return uri.toUpperCase();
}

export default function InvoiceQr({ value }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    const payload = qrPayload(value);
    if (!payload) {
      setSrc("");
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const mod = await import("qrcode");
        const QRCode = mod.default || mod;
        const url = await QRCode.toDataURL(payload, {
          width: 220,
          margin: 1,
          errorCorrectionLevel: "L",
          color: { dark: "#000000", light: "#ffffff" },
        });
        if (!cancelled) setSrc(url);
      } catch {
        if (!cancelled) setSrc("");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [value]);

  if (!src) return null;
  return (
    <div className="intel-qr">
      <img src={src} alt="Lightning invoice QR code" width={220} height={220} />
    </div>
  );
}
