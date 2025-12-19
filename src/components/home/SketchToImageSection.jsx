import React from "react";
import { useTranslation } from "react-i18next";

const SketchToImageSection = () => {
  const { t } = useTranslation("home");

  const handleScrollToTopAndFocusEmail = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      const emailInput = document.querySelector(".input_confirm_email");
      if (emailInput && typeof emailInput.focus === "function") {
        emailInput.focus();
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="sketch"
          className="text-3xl sm:text-4xl font-bold text-center mb-4 whitespace-nowrap"
        >
          {t("sketchFeature.title")}
        </h2>

        <p className="text-justify text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {t("sketchFeature.paragraph1")}
        </p>

        <div className="mt-12 flex flex-col gap-10">

          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Scroll to email field using sketch example before transformation"
              onClick={handleScrollToTopAndFocusEmail}
              className="shrink-0 focus:outline-none w-full max-w-[420px]"
            >
              <img
                loading="lazy"
                src="/sketch_1.webp"
                alt="Interior design sketch input (before)"
                width={420}
                height={280}
                className="rounded-2xl shadow-lg w-full h-auto cursor-pointer"
              />
            </button>

            <div className="text-4xl md:text-5xl font-bold text-gray-300" aria-hidden="true">
              →
            </div>

            <button
              type="button"
              aria-label="Scroll to email field using AI render example after transformation"
              onClick={handleScrollToTopAndFocusEmail}
              className="shrink-0 focus:outline-none w-full max-w-[420px]"
            >
              <img
                loading="lazy"
                src="/sketch_1_2.webp"
                alt="Photorealistic AI render of bedroom (after)"
                width={420}
                height={280}
                className="rounded-2xl shadow-lg w-full h-auto cursor-pointer"
              />
            </button>
          </div>

          <p className="mt-4 text-justify text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("sketchFeature.paragraph2")}
          </p>

          {/* Row 2 */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Scroll to email field using SketchUp input example before transformation"
              onClick={handleScrollToTopAndFocusEmail}
              className="shrink-0 focus:outline-none w-full max-w-[420px]"
            >
              <img
                loading="lazy"
                src="/sketch_2.webp"
                alt="SketchUp render input (before)"
                width={420}
                height={280}
                className="rounded-2xl shadow-lg w-full h-auto cursor-pointer"
              />
            </button>

            <div className="text-4xl md:text-5xl font-bold text-gray-300" aria-hidden="true">
              →
            </div>

            <button
              type="button"
              aria-label="Scroll to email field using AI render example after transformation"
              onClick={handleScrollToTopAndFocusEmail}
              className="shrink-0 focus:outline-none w-full max-w-[420px]"
            >
              <img
                loading="lazy"
                src="/sketch_2_2.webp"
                alt="Photorealistic AI render of living room (after)"
                width={420}
                height={280}
                className="rounded-2xl shadow-lg w-full h-auto cursor-pointer"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SketchToImageSection;
