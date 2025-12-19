// src/components/shared/AutoPlayVideo.jsx
import React, { useRef } from "react";

export default function AutoPlayVideo({ src, poster, className }) {
  const ref = useRef(null);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onCanPlay={() => {
        // подстраховка как у Cloudflare
        ref.current?.play?.().catch(() => {});
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
