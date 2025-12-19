// src/pages/ai-interior-design.jsx
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AutoPlayVideo from "@/components/shared/AutoPlayVideo";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";
import "@/styles/scroll-animations.css";

import { createPageUrl } from "@/utils";
import { FALLBACK_LANGUAGE } from "@/i18n";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

// Images for BEFORE / AFTER blocks
import livingRoomBefore from "@/assets/images/before-after/livingRoomBefore.jpg";
import livingRoomAfter from "@/assets/images/before-after/livingRoomAfter.jpg";
import bedroomBefore from "@/assets/images/before-after/bedroomBefore.jpg";
import bedroomAfter from "@/assets/images/before-after/bedroomAfter.jpg";
import beforeAfterBefore from "@/assets/images/before-after/before.jpg";
import beforeAfterAfter from "@/assets/images/before-after/after.jpg";

export default function AiInteriorDesign() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation("aiInteriorDesign");

  const currentLang = lang || i18n.language || FALLBACK_LANGUAGE;
  const languageForLinks = currentLang;
  const canonicalBase = `https://homedesignpro.ai/${languageForLinks}`;

  const perfectForRaw = t("whatIs.list", { returnObjects: true });
  const perfectFor = Array.isArray(perfectForRaw) ? perfectForRaw : [];

  const howStepsRaw = t("howItWorks.steps", { returnObjects: true });
  const howSteps = Array.isArray(howStepsRaw) ? howStepsRaw : [];

  const testimonialsRaw = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(testimonialsRaw) ? testimonialsRaw : [];

  return (
    <div className="container mx-auto leading-relaxed text-gray-800">
      {/* SEO META */}
      <Helmet>
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />
        <link rel="canonical" href={`${canonicalBase}/ai-interior-design`} />
        <meta property="og:title" content={t("seo.ogTitle")} />
        <meta property="og:description" content={t("seo.ogDescription")} />
        <meta property="og:url" content={`${canonicalBase}/ai-interior-design`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section
        className="hero mb-20"
        style={{ paddingTop: "calc(5rem + env(safe-area-inset-top, 0px))" }}
      >
        <h1 className="hero__title">{t("hero.title")}</h1>

        <p className="hero__payoff max-w-2xl mx-auto">{t("hero.payoff")}</p>

        <SignedOut>
          <SignInButton mode="modal">
            <button
              type="button"
              className="px-8 py-4 bg-black text-white rounded-lg text-lg font-medium shadow-lg hover:bg-gray-900 transition"
            >
              {t("hero.cta")}
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <a
            href={createPageUrl("transform", languageForLinks)}
            className="px-8 py-4 bg-black text-white rounded-lg text-lg font-medium shadow-lg hover:bg-gray-900 transition"
          >
            {t("hero.cta")}
          </a>
        </SignedIn>

        <p className="mt-3 text-sm text-gray-500">{t("hero.note")}</p>
      </section>

      {/* MAIN WRAPPER */}
      <div className="divider-v">
        {/* HERO IMAGE */}
        <section className="section">
          <div className="calendar-container">
            <div className="calendar-wide">
              <img
                src="/styles/luxury-desktop.webp"
                alt={t("heroImage.alt")}
                loading="lazy"
                width={1200}
                height={600}
                className="calendar-image mx-auto"
                style={{ borderRadius: "12px" }}
                srcSet="
                  /styles/luxury-mobile.webp 800w,
                  /styles/luxury-desktop.webp 1200w
                "
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="section panel text-center">
          <div className="split-h">
            {/* TEXT */}
            <div className="grid-center">
              <div className="panel__content">
                <h2 className="text-3xl font-bold mb-6">{t("value.title")}</h2>

                <p className="text-gray-700 mb-4">{t("value.p1")}</p>
                <p className="text-gray-700 mb-4">{t("value.p2")}</p>

                <p className="text-gray-700 mb-4 text-justify whitespace-pre-line">
                  {t("value.long")}
                </p>
              </div>
            </div>

            {/* IMAGE CARDS */}
            <div className="cards hidden md:block">
              <div className="card">
                <img
                  src="/styles/sketch-600.webp"
                  alt={t("cards.sketchAlt")}
                  loading="lazy"
                  srcSet="/styles/sketch-300.webp 300w, /styles/sketch-600.webp 600w"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
                />
              </div>

              <div className="card">
                <img
                  src="/styles/bohemian-600.webp"
                  alt={t("cards.bohemianAlt")}
                  loading="lazy"
                  srcSet="/styles/bohemian-300.webp 300w, /styles/bohemian-600.webp 600w"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
                />
              </div>

              <div className="card">
                <img
                  src="/styles/modern-600.webp"
                  alt={t("cards.modernAlt")}
                  loading="lazy"
                  srcSet="/styles/modern-300.webp 300w, /styles/modern-600.webp 600w"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
                />
              </div>

              <div className="card">
                <img
                  src="/styles/modern-boho-600.webp"
                  alt={t("cards.modernBohoAlt")}
                  loading="lazy"
                  srcSet="/styles/modern-boho-300.webp 300w, /styles/modern-boho-600.webp 600w"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS AI INTERIOR DESIGN */}
        <section className="section panel panel--no-overflow">
          <div className="split-h">
            {/* VIDEO */}
            <div>
              <div className="cover-image">
                <div className="relative rounded-2xl shadow-lg overflow-hidden">
                  <AutoPlayVideo
                    src="/video_24112025.mp4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* TEXT */}
            <div className="grid-center">
              <div className="panel__content">
                <h2 className="text-3xl font-bold mb-4">{t("whatIs.title")}</h2>
                <p className="text-gray-700 mb-4">{t("whatIs.p1")}</p>

                <p className="font-semibold mb-2">{t("whatIs.perfectFor")}</p>

                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {perfectFor.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>

                <p>{t("whatIs.p2")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section panel">
          <div className="split-h">
            <div className="panel__content">
              <h2 className="text-3xl font-bold mb-6 text-center">{t("howItWorks.title")}</h2>

              <div className="flex flex-col items-center">
                <ol className="space-y-6 text-gray-700 text-center">
                  {howSteps.map((x, idx) => (
                    <li key={idx}>
                      <strong>{x}</strong>
                    </li>
                  ))}
                </ol>

                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="inline-block mt-8 px-8 py-4 bg-black text-white rounded-lg"
                    >
                      {t("howItWorks.cta")}
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <a
                    href={createPageUrl("transform", languageForLinks)}
                    className="inline-block mt-8 px-8 py-4 bg-black text-white rounded-lg"
                  >
                    {t("howItWorks.cta")}
                  </a>
                </SignedIn>
              </div>
            </div>

            <div className="grid-center">
              <div className="spinner spinner--large">
                <div className="spinner__progress"></div>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE & AFTER */}
        <section className="section panel panel--no-overflow">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("beforeAfter.title")}</h2>
            <p className="text-gray-600 mb-8">{t("beforeAfter.description")}</p>
          </div>

          <div className="mb-16">
            <div className="relative rounded-2xl shadow-lg overflow-hidden w-full lg:w-1/2 mx-auto">
              <BeforeAfterSlider beforeImage={livingRoomBefore} afterImage={livingRoomAfter} />
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg mb-2">{t("beforeAfter.livingRoom.title")}</h3>
              <p className="text-gray-600">{t("beforeAfter.livingRoom.description")}</p>
            </div>
          </div>

          <div className="mb-16">
            <div className="relative rounded-2xl shadow-lg overflow-hidden w-full lg:w-1/2 mx-auto">
              <BeforeAfterSlider beforeImage={bedroomBefore} afterImage={bedroomAfter} />
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg mb-2">{t("beforeAfter.bedroom.title")}</h3>
              <p className="text-gray-600">{t("beforeAfter.bedroom.description")}</p>
            </div>
          </div>

          <div className="mb-16">
            <div className="relative rounded-2xl shadow-lg overflow-hidden w-full lg:w-1/2 mx-auto">
              <BeforeAfterSlider beforeImage={beforeAfterBefore} afterImage={beforeAfterAfter} />
            </div>
            <div className="text-center mt-4">
              <h3 className="font-semibold text-lg mb-2">{t("beforeAfter.lobby.title")}</h3>
              <p className="text-gray-600">{t("beforeAfter.lobby.description")}</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="section">
          <h2 className="section__title text-3xl font-bold text-center">{t("testimonials.title")}</h2>

          <div className="popup-container">
            {testimonials.map((item, idx) => (
              <div className="review" key={idx}>
                <h3 className="font-semibold text-lg mb-2">{item?.role ?? ""}</h3>
                <p>{item?.text ?? ""}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section text-center mt-24">
          <h2 className="text-3xl font-bold mb-4">{t("finalCta.title")}</h2>
          <p className="text-gray-700 mb-6">{t("finalCta.description")}</p>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="px-10 py-4 bg-black text-white rounded-lg text-lg shadow hover:bg-gray-900 transition"
              >
                {t("finalCta.button")}
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <a
              href={createPageUrl("transform", languageForLinks)}
              className="px-10 py-4 bg-black text-white rounded-lg text-lg shadow hover:bg-gray-900 transition"
            >
              {t("finalCta.button")}
            </a>
          </SignedIn>
        </section>
      </div>
    </div>
  );
}
