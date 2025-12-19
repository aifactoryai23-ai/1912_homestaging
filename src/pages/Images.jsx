import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Image as ImageIcon, Mic, ArrowUp } from "lucide-react";

import HorizontalRail from "@/components/images/HorizontalRail.jsx";
import { styles, discoverLeft, discoverRight } from "@/data/images-page.js";

export default function Images() {
  const { t } = useTranslation("common");

  return (
    <>
      <Helmet>
        <title>{t("images.meta.title", "Images | HomeDesign Pro")}</title>
        <meta
          name="description"
          content={t(
            "images.meta.description",
            "Generate and style images with presets and trending prompts."
          )}
        />
      </Helmet>

      {/* Full-bleed dark gradient section inside light Layout */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-black text-white">
          {/* Gradient background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4a2b72] via-[#18101d] to-[#7a4a1f] opacity-80" />
            <div className="absolute inset-0 bg-black/55" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-14">
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              {t("images.ui.title", "Images")}
            </h1>

            {/* Prompt bar */}
            <div className="mt-8">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <ImageIcon className="h-5 w-5 text-white/80" />
                </div>

                <input
                  className="flex-1 bg-transparent text-base text-white/90 placeholder:text-white/50 outline-none"
                  placeholder={t("images.ui.placeholder", "Describe a new image")}
                />

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
                  aria-label="Voice"
                >
                  <Mic className="h-5 w-5 text-white/80" />
                </button>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10 hover:bg-white/20"
                  aria-label="Send"
                >
                  <ArrowUp className="h-5 w-5 text-white/90" />
                </button>
              </div>
            </div>

            {/* Try a style (horizontal) */}
            <div className="mt-12">
              <HorizontalRail title={t("images.ui.tryStyle", "Try a style on an image")}>
                <div className="flex flex-nowrap gap-6 pb-3">
                  {styles.map((card) => (
                    <div key={card.key} className="w-[160px] sm:w-[190px] shrink-0">
                      <div className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                        <div className="aspect-[3/4] w-full">
                          <img
                            src={card.src}
                            alt={card.title}
                            className="h-full w-full object-cover block"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="mt-3 text-center text-sm text-white/70">
                        {t(`images.styles.${card.key}`, card.title)}
                      </div>
                    </div>
                  ))}
                </div>
              </HorizontalRail>
            </div>

            {/* Discover (two rails like ChatGPT) */}
            <div className="mt-14">
              <HorizontalRail
                title={t("images.ui.discover", "Discover something new")}
                scrollStep={520}
              >
                <div className="flex flex-nowrap gap-10 pb-3">
                  {/* левая колонка как отдельный “поток” */}
                  <div className="flex flex-col gap-7 shrink-0 w-[520px] max-w-[85vw]">
                    {discoverLeft.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className="group flex w-full items-center gap-4 text-left"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10 block"
                          loading="lazy"
                        />
                        <span className="text-base text-white/70 group-hover:text-white transition-colors">
                          {t(`images.discover.${item.key}`, item.title)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* правая колонка как отдельный “поток” */}
                  <div className="flex flex-col gap-7 shrink-0 w-[520px] max-w-[85vw]">
                    {discoverRight.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className="group flex w-full items-center gap-4 text-left"
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10 block"
                          loading="lazy"
                        />
                        <span className="text-base text-white/70 group-hover:text-white transition-colors">
                          {t(`images.discover.${item.key}`, item.title)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </HorizontalRail>

              <div className="h-10" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
