import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import pencilArrow from "@/assets/images/pencil-arrow-180px.webp";

export default function TrainingExampleBlock() {
  const { t } = useTranslation("home");
  const title = t("trainingExample.title");

  const handleClick = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const input = document.querySelector(".input_confirm_email");
    if (input) input.focus();
  }, []);

  return (
    <section className="bg-[#f7fafc] py-16 md:py-24 pb-28 md:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4 md:mb-6">
          {title}
        </h2>

        <div
          className="frontpage_training_example flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          style={{ minHeight: "1100px" }}
        >
          {/* LEFT: BEFORE */}
          <div className="frontpage_training_example_input">
            <a href="#" onClick={handleClick}>
              <img
                src="/before_1-320.webp"
                srcSet="/before_1-320.webp 320w, /before_1-640.webp 640w"
                sizes="(max-width: 767px) 320px, (min-width: 768px) 411px"
                loading="lazy"
                decoding="async"
                width={411}
                height={274}
                alt="Before"
                style={{
                  borderRadius: "18px",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.16)",
                  display: "block",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </a>
          </div>

          {/* CENTER: стрелка */}
          <div
            className="flex justify-center items-center"
            style={{ minWidth: "110px" }}
          >
            <a href="#" onClick={handleClick} className="relative z-50 block">
              <img
                src={pencilArrow}
                alt="Pointer for editing"
                width={90}
                height={90}
                loading="lazy"
                className="block md:translate-y-2"
                style={{
                  width: "90px",
                  height: "auto",
                  display: "block",
                  transform: "rotate(-40deg)",
                  transformOrigin: "center",
                  filter:
                    "brightness(0) saturate(100%) drop-shadow(0 2px 6px rgba(0,0,0,0.45))",
                }}
              />
            </a>
          </div>

          {/* RIGHT: AFTER STACK */}
          <div
            className="frontpage_training_example_output"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              height: "900px",
            }}
          >
            <a href="#" onClick={handleClick}>
              {/* After 1 */}
              <img
                src="/MidCenturyModern-320.webp"
                srcSet="/MidCenturyModern-320.webp 320w, /MidCenturyModern-512.webp 512w"
                sizes="(max-width: 767px) 320px, (min-width: 768px) 384px"
                alt="After 1"
                width={320}
                height={213}
                loading="lazy"
                decoding="async"
                className="block w-full max-w-xs sm:max-w-sm h-auto"
                style={{
                  transform: "rotate(-6deg)",
                  marginLeft: "-17px",
                  marginBottom: "-28px",
                  borderRadius: "18px",
                  backgroundColor: "#ffffff",
                  padding: "4px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.20)",
                }}
              />

              {/* After 2 */}
              <img
                src="/Boho-320.webp"
                srcSet="/Boho-320.webp 320w, /Boho-512.webp 512w"
                sizes="(max-width: 767px) 320px, (min-width: 768px) 384px"
                alt="After 2"
                width={320}
                height={213}
                loading="lazy"
                decoding="async"
                className="block w-full max-w-xs sm:max-w-sm h-auto"
                style={{
                  transform: "rotate(5deg)",
                  position: "relative",
                  zIndex: 2,
                  marginBottom: "5px",
                  borderRadius: "18px",
                  backgroundColor: "#ffffff",
                  padding: "4px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.20)",
                }}
              />

              {/* After 3 */}
              <img
                src="/japandi-320.webp"
                srcSet="/japandi-320.webp 320w, /japandi-512.webp 512w"
                sizes="(max-width: 767px) 320px, (min-width: 768px) 384px"
                alt="After 3"
                width={320}
                height={213}
                loading="lazy"
                decoding="async"
                className="block w-full max-w-xs sm:max-w-sm h-auto"
                style={{
                  position: "relative",
                  zIndex: 3,
                  transform: "rotate(13deg)",
                  marginLeft: "-48px",
                  marginTop: "-20px",
                  borderRadius: "18px",
                  backgroundColor: "#ffffff",
                  padding: "4px",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.20)",
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
