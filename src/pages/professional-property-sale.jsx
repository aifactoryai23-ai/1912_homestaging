// src/pages/professional-property-sale.jsx
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

export default function ProfessionalPropertySale() {
  const { lang } = useParams();

  // i18next namespace: professionalPropertySale
  const { t, i18n } = useTranslation("professionalPropertySale");

  // язык для ссылок/каноникала берём из URL (или fallback)
  const currentLang = lang || i18n.language || FALLBACK_LANGUAGE;
  const languageForLinks = currentLang;
  const canonicalBase = `https://homedesignpro.ai/${languageForLinks}`;

  // ---- SAFE ARRAYS ----
  const stagesRaw = t("article.stages", { returnObjects: true });
  const stages = Array.isArray(stagesRaw) ? stagesRaw : [];

  const timelinesRaw = t("article.timelines", { returnObjects: true });
  const timelines = Array.isArray(timelinesRaw) ? timelinesRaw : [];

  const presentingBulletsRaw = t("article.presenting.bullets", { returnObjects: true });
  const presentingBullets = Array.isArray(presentingBulletsRaw) ? presentingBulletsRaw : [];

  const skillsRaw = t("article.negotiations.skills", { returnObjects: true });
  const skills = Array.isArray(skillsRaw) ? skillsRaw : [];

  const closingTasksRaw = t("article.closing.tasks", { returnObjects: true });
  const closingTasks = Array.isArray(closingTasksRaw) ? closingTasksRaw : [];

  const finalThoughtsBulletsRaw = t("article.finalThoughts.bullets", { returnObjects: true });
  const finalThoughtsBullets = Array.isArray(finalThoughtsBulletsRaw)
    ? finalThoughtsBulletsRaw
    : [];

  const aiListRaw = t("aiSection.list", { returnObjects: true });
  const aiList = Array.isArray(aiListRaw) ? aiListRaw : [];

  const howStepsRaw = t("howItWorks.steps", { returnObjects: true });
  const howSteps = Array.isArray(howStepsRaw) ? howStepsRaw : [];

  const testimonialsRaw = t("testimonials.items", { returnObjects: true });
  const testimonials = Array.isArray(testimonialsRaw) ? testimonialsRaw : [];
  // ---------------------

  return (
    <div className="container mx-auto leading-relaxed text-gray-800">
      {/* SEO META */}
      <Helmet>
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />
        <link rel="canonical" href={`${canonicalBase}/professional-property-sale`} />
        <meta property="og:title" content={t("seo.ogTitle")} />
        <meta property="og:description" content={t("seo.ogDescription")} />
        <meta property="og:url" content={`${canonicalBase}/professional-property-sale`} />
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
                alt={t("hero.heroImageAlt")}
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

        {/* ARTICLE */}
        <section className="section panel">
          <div className="max-w-3xl mx-auto panel__content">
            <article className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">{t("article.h2")}</h2>

              <p>{t("article.p1")}</p>
              <p className="whitespace-pre-line">{t("article.p2")}</p>
              <p className="whitespace-pre-line">{t("article.p3")}</p>

              <p>{t("article.p4")}</p>
              <ul className="list-disc list-inside space-y-1">
                {stages.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              <p className="whitespace-pre-line">{t("article.p5")}</p>

              {/* ВАЖНО: эти строки есть в EN JSON, раньше не выводились */}
              <p>
                {t("article.p6_beforeStrong")}<strong>{t("article.p6_strong")}</strong>
              </p>
              <p className="whitespace-pre-line">{t("article.p7")}</p>
              <p className="whitespace-pre-line">{t("article.p8")}</p>

              <ul className="list-disc list-inside space-y-1">
                {timelines.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              <p>{t("article.p9")}</p>

              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.evaluation.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.evaluation.p1")}</p>
              <p className="whitespace-pre-line">{t("article.evaluation.p2")}</p>
              <p className="whitespace-pre-line">{t("article.evaluation.p3")}</p>
              <p className="whitespace-pre-line">{t("article.evaluation.p4")}</p>

              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.packaging.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.packaging.p1")}</p>
              <p className="whitespace-pre-line">{t("article.packaging.p2")}</p>

              <p className="whitespace-pre-line">
                {t("article.packaging.p3_beforeLink")}{" "}
                <a
                  href="https://homedesignpro.ai"
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HomeDesignPro.ai
                </a>{" "}
                {t("article.packaging.p3_afterLink")}
              </p>

              <p className="whitespace-pre-line">{t("article.packaging.p4")}</p>
              <p className="whitespace-pre-line">{t("article.packaging.p5")}</p>

              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.presenting.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.presenting.p1")}</p>

              {/* bullets (Passive/Active) */}
              <ul className="list-disc list-inside space-y-1">
                {presentingBullets.map((b, idx) => (
                  <li key={idx}>
                    <strong>{b?.strong ?? ""}</strong>
                    {b?.text ?? ""}
                  </li>
                ))}
              </ul>

              <p className="whitespace-pre-line">{t("article.presenting.p2")}</p>
              <p className="whitespace-pre-line">{t("article.presenting.p3")}</p>
              <p className="whitespace-pre-line">{t("article.presenting.p4")}</p>
              <p className="whitespace-pre-line">{t("article.presenting.p5")}</p>
              <p className="whitespace-pre-line">{t("article.presenting.p6")}</p>

              <p className="italic whitespace-pre-line">{t("article.presenting.quoteItalic")}</p>
              <p className="whitespace-pre-line">{t("article.presenting.p7")}</p>

              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.negotiations.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.negotiations.p1")}</p>
              <p className="whitespace-pre-line">{t("article.negotiations.p2")}</p>
              <p className="whitespace-pre-line">{t("article.negotiations.p3")}</p>
              <p className="whitespace-pre-line">{t("article.negotiations.p4")}</p>
              <p>{t("article.negotiations.p5")}</p>

              <ul className="list-disc list-inside space-y-1">
                {skills.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>

              <p>{t("article.negotiations.p6")}</p>
              <p className="whitespace-pre-line">{t("article.negotiations.p7")}</p>

              <p className="italic">{t("article.negotiations.quoteLabel")}</p>
              <p className="border-l-4 border-gray-300 pl-4 italic whitespace-pre-line">
                {t("article.negotiations.quoteBlock")}
              </p>

              {/* ВАЖНО: здесь НЕ article.deal, а article.closing */}
              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.closing.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.closing.p1")}</p>
              <ul className="list-disc list-inside space-y-1">
                {closingTasks.map((x, idx) => (
                  <li key={idx}>{x}</li>
                ))}
              </ul>
              <p className="whitespace-pre-line">{t("article.closing.p2")}</p>

              {/* ВАЖНО: здесь НЕ article.summary, а article.finalThoughts */}
              <h3 className="text-2xl font-semibold mt-8 mb-3">
                {t("article.finalThoughts.title")}
              </h3>
              <p className="whitespace-pre-line">{t("article.finalThoughts.p1")}</p>
              <ul className="list-disc list-inside space-y-1">
                {finalThoughtsBullets.map((x, idx) => (
                  <li key={idx} className="whitespace-pre-line">
                    {x}
                  </li>
                ))}
              </ul>
              <p className="whitespace-pre-line">{t("article.finalThoughts.p2")}</p>
            </article>
          </div>
        </section>

        {/* AI SECTION */}
        <section className="section panel panel--no-overflow">
          <div className="split-h">
            <div>
              <div className="cover-image">
                <div className="relative rounded-2xl shadow-lg overflow-hidden">
                  <AutoPlayVideo src="/video_24112025.mp4" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="grid-center">
              <div className="panel__content">
                <h2 className="text-3xl font-bold mb-4">{t("aiSection.title")}</h2>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{t("aiSection.p1")}</p>

                <p className="font-semibold mb-2">{t("aiSection.usefulFor")}</p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {aiList.map((x, idx) => (
                    <li key={idx}>{x}</li>
                  ))}
                </ul>

                <p className="whitespace-pre-line">{t("aiSection.p2")}</p>
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
                      {t("howItWorks.ctaSignedOut")}
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <a
                    href={createPageUrl("transform", languageForLinks)}
                    className="inline-block mt-8 px-8 py-4 bg-black text-white rounded-lg"
                  >
                    {t("howItWorks.ctaSignedIn")}
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
                <p className="whitespace-pre-line">{item?.text ?? ""}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section text-center mt-24">
          <h2 className="text-3xl font-bold mb-4">{t("finalCta.title")}</h2>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{t("finalCta.description")}</p>

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
