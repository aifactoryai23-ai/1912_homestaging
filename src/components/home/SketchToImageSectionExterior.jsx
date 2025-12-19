// src/components/home/SketchToImageSection.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import AutoPlayVideo from "@/components/shared/AutoPlayVideo";

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
        {/* Общий заголовок секции */}
        <h2
          id="sketch"
          className="text-3xl sm:text-4xl font-bold text-center mb-4"
        >
          {t("gardenStagingSection.title")}
        </h2>

        {/* Блоки с примерами */}
        <div className="mt-8 flex flex-col gap-14">
          {/* Ряд 1: текст + фото ДО → видео ПОСЛЕ */}
          <div className="flex flex-col gap-6">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line max-w-3xl mx-auto text-justify">
              {t("gardenStagingSection.block1.intro")}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleScrollToTopAndFocusEmail}
                className="shrink-0 focus:outline-none"
                aria-label="Scroll to email field using garden before redesign image"
              >
                <img
                  loading="lazy"
                  src="/garden_1.png"
                  alt="Garden or terrace before AI redesign"
                  width={420}
                  height={280}
                  className="rounded-2xl shadow-lg w-full max-w-[420px] h-auto cursor-pointer"
                />
              </button>

              <div
                className="text-4xl md:text-5xl font-bold text-gray-300"
                aria-hidden="true"
              >
                →
              </div>

              <button
                type="button"
                onClick={handleScrollToTopAndFocusEmail}
                className="shrink-0 focus:outline-none w-full max-w-[420px]"
                aria-label="Scroll to email field using garden staging transformation video"
              >
                <div
                  style={{
                    position: "relative",
                    paddingTop: "66.66666666666666%",
                  }}
                  className="rounded-2xl shadow-lg overflow-hidden"
                >
                  <AutoPlayVideo
                    src="/garden_video2.mp4"
                    className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Ряд 2: заголовок + текст + фото ДО → фото ПОСЛЕ */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {t("gardenStagingSection.block2.title")}
            </h2>

            <p className="text-gray-600 leading-relaxed whitespace-pre-line max-w-3xl mx-auto text-justify">
              {t("gardenStagingSection.block2.intro")}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button
                type="button"
                onClick={handleScrollToTopAndFocusEmail}
                className="shrink-0 focus:outline-none"
                aria-label="Scroll to email field using empty property before staging image"
              >
                <img
                  loading="lazy"
                  src="/empty_1.png"
                  alt="Empty property before AI virtual staging"
                  width={420}
                  height={280}
                  className="rounded-2xl shadow-lg w-full max-w-[420px] h-auto cursor-pointer"
                />
              </button>

              <div
                className="text-4xl md:text-5xl font-bold text-gray-300"
                aria-hidden="true"
              >
                →
              </div>

              <button
                type="button"
                onClick={handleScrollToTopAndFocusEmail}
                className="shrink-0 focus:outline-none"
                aria-label="Scroll to email field using virtually staged property image"
              >
                <img
                  loading="lazy"
                  src="/empty_2.png"
                  alt="Virtually staged property after using AI"
                  width={420}
                  height={280}
                  className="rounded-2xl shadow-lg w-full max-w-[420px] h-auto cursor-pointer"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SketchToImageSection;
