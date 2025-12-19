// src/components/home/VideoFeatureBlock.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoPlayVideo from "@/components/shared/AutoPlayVideo";

export default function VideoFeatureBlock() {
  const { t } = useTranslation("home");
  const containerRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect(); // больше не следим, один раз достаточно
        }
      },
      {
        root: null,
        threshold: 0.2, // ~20% блока в кадре
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="feature-left">
        <h2 id="video" className="text-4xl font-bold mb-4">
          {t("videoFeature.title")}
        </h2>

        <p>
          {t("videoFeature.paragraph1")}
          <br />
          <br />
          {t("videoFeature.paragraph2")}
        </p>
      </div>

      <div className="feature-right feature-3d" ref={containerRef}>
        <div
          style={{ position: "relative", paddingTop: "66.66666666666666%" }}
          className="rounded-2xl shadow-lg overflow-hidden"
        >
          {shouldLoadVideo ? (
            <AutoPlayVideo
              src="/video_04122025.mp4"
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            />
          ) : (
            // Лёгкий плейсхолдер вместо видео до загрузки
            <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>
      </div>
    </>
  );
}
