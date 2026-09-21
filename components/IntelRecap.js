export default function IntelRecap() {
  return (
    <figure className="intel-hero__media">
      <video
        controls
        playsInline
        preload="none"
        poster="/assets/intelligence-recap.jpg"
        width={1280}
        height={720}
        aria-label="BTCDecoded Intelligence"
      >
        <source src="/assets/intelligence-recap.mp4" type="video/mp4" />
      </video>
      <figcaption className="visually-hidden">BTCDecoded Intelligence</figcaption>
    </figure>
  );
}
