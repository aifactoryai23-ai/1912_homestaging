import React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation, Trans } from "react-i18next";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useHighlightEffect from "@/hooks/useHighlightEffect";
import "@/styles/highlight.css";
import "@/styles/shine-buttons.css";
import { FALLBACK_LANGUAGE } from "@/i18n";
import {
  ArrowRight,
  Wand,
  Zap,
  Image,
  Check,
  Brain,
  Sparkles,
  Spotlight,
} from "lucide-react";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

// ✅ Local images
import heroBg800 from "@/assets/images/background/hero-home-800.webp";
import heroBg1280 from "@/assets/images/background/hero-home-1280.webp";
import heroBg1920 from "@/assets/images/background/hero-home-1920.webp";
import beforeImg from "@/assets/images/before-after/before.jpg";
import afterImg from "@/assets/images/before-after/after.jpg";
import TrainingExampleBlock from "@/components/home/TrainingExampleBlock";
import VideoFeatureBlock from "@/components/home/VideoFeatureBlock";
import SketchToImageSection from "@/components/home/SketchToImageSection";
import SketchToImageSectionExterior from "@/components/home/SketchToImageSectionExterior";
import AiInteriorDesignerSection from "@/components/home/AiInteriorDesignerSection";
import FaqAccordion from "@/components/home/FaqAccordion";
import { interiorStyles } from "../styles/interiorStyles";

// ✅ Clerk
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export default function HomePage() {
  useHighlightEffect();
  const { lang } = useParams();
  const languageForLinks = lang || FALLBACK_LANGUAGE;
  const canonicalBase = `https://homedesignpro.ai/${languageForLinks}`;
  const { t } = useTranslation(["home", "common", "styles"]);

  const meta = t("meta", { ns: "home", returnObjects: true });
  const heroTitlePrefix = t("hero.titlePrefix", { ns: "home" });
  const heroTitleHighlight = t("hero.titleHighlight", { ns: "home" });
  const heroDescription = t("hero.description", { ns: "home" });
  const heroFree = t("hero.freeTransformations", { ns: "home" });
  const heroNoCard = t("hero.noCardRequired", { ns: "home" });

  const benefitIconMap = {
    zap: Zap,
    wand: Wand,
    spotlight: Spotlight,
  };

  const benefitsRaw = t("benefits.items", { ns: "home", returnObjects: true });
  const benefits = Array.isArray(benefitsRaw)
    ? benefitsRaw.map((item) => ({
        ...item,
        Icon: benefitIconMap[item.icon] || Sparkles,
      }))
    : [];

  const priceListItems = t("priceList.items", { ns: "home", returnObjects: true }) || [];
  const perfectForItems = t("perfectFor.items", { ns: "home", returnObjects: true }) || [];
  const transformation = t("transformation", { ns: "home", returnObjects: true });
  const cta = t("cta", { ns: "home", returnObjects: true });

  return (
    <div className="overflow-hidden">
      <Helmet>
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta name="keywords" content={meta?.keywords} />
        <link rel="canonical" href={canonicalBase} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-12 sm:pt-20">
        {/* 1. Фоновое изображение (LCP) — немного приглушаем */}
        <div className="absolute inset-0 -z-30">
          <img
            src={heroBg1920}
            srcSet={`${heroBg800} 800w, ${heroBg1280} 1280w, ${heroBg1920} 1920w`}
            sizes="100vw"
            alt="AI home staging and interior design background"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        {/* 2. Градиент поверх фото — как было, только явно выше по z-index */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70 -z-20" />

        {/* 3. (Опционально) ещё немного белого “тумана” */}
        {/* <div className="absolute inset-0 bg-white/30 -z-10" /> */}

        {/* Контент hero */}
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl space-y-6 transition-all">
            <h1 className="text-4xl md:text-7xl font-bold mb-3 leading-snug sm:leading-tight">
              {heroTitlePrefix}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {heroTitleHighlight}
              </span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 mb-4 sm:mb-8 max-w-2xl leading-relaxed sm:leading-normal">
              {heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start items-center text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SignedIn>
                  <Link to={createPageUrl("transform")}>
                    <Button
                      size="lg"
                      className="try-free-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 text-lg px-8"
                    >
                      {t("buttons.tryForFree", { ns: "common" })}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </SignedIn>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      className="try-free-button bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 text-lg px-8"
                    >
                      {t("buttons.tryForFree", { ns: "common" })}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </SignInButton>
                </SignedOut>

                <a href="#ai-transformation" className="no-underline">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    {t("buttons.viewExamples", { ns: "common" })}
                    <Image className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{heroFree}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{heroNoCard}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("benefits.title", { ns: "home" })}</h2>
            <p className="text-xl text-gray-600">
              <Trans ns="home" i18nKey="benefits.subtitle" components={{ mark: <mark /> }} />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto md:mx-0">
                  <benefit.Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TrainingExampleBlock Section */}
      <TrainingExampleBlock />

      {/* Video Feature Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <VideoFeatureBlock />
        </div>
      </section>

      {/* Sketch / SketchUp to photorealistic renders Section */}
      <SketchToImageSection />

      {/* Perfect For Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            {t("perfectFor.title", { ns: "home" })}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {perfectForItems.map((item, index) => (
              <Card key={item.id} className="p-6">
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-3">
                  <Trans
                    ns="home"
                    i18nKey={`perfectFor.items.${index}.desc1`}
                    components={{ mark: <mark /> }}
                  />
                </p>
                <p className="text-gray-600 text-justify leading-relaxed">
                  <Trans
                    ns="home"
                    i18nKey={`perfectFor.items.${index}.desc2`}
                    components={{ mark: <mark /> }}
                  />
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SketchToImageSectionExterior Section */}
      <SketchToImageSectionExterior />

      {/* High-Detail AI Interior Designer SEO Section */}
      <AiInteriorDesignerSection />

      {/* PRICE LIST */}
      <section className="py-8">
        <div className="flex justify-center">
          <div className="max-w-xl w-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-lg hover:shadow-blue-300/60 hover:scale-[1.02] transition-all duration-500 text-center shadow-blue-100/40">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg mx-auto">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("priceList.title", { ns: "home" })} <br />
              <span className="text-gray-600 text-base font-normal">
                <Trans ns="home" i18nKey="priceList.subtitle" components={{ mark: <mark /> }} />
              </span>
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed font-mono text-left bg-white/60 p-4 rounded-xl border border-gray-100 shadow-inner overflow-x-auto whitespace-pre">
              {priceListItems.map((item) => (
                <div key={item.id}>
                  {item.text}
                  {item.extra ? <span className="font-bold text-gray-800">{item.extra}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Style NEW */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t("styles.title", { ns: "home" })}</h2>
            <p className="text-xl text-gray-600">
              {t("styles.subtitle", { ns: "home" })}
              <br />
              <em>{t("styles.note", { ns: "home" })}</em>
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {interiorStyles.map((style) => {
              const name = t(`catalog.${style.id}.name`, { ns: "styles" });
              const description = t(`catalog.${style.id}.description`, { ns: "styles" });

              return (
                <div
                  key={style.id}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={style.image}
                    srcSet={style.srcSet}
                    sizes={style.sizes}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                    <h3 className="text-white text-2xl font-bold drop-shadow-md">{name}</h3>
                  </div>

                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-5">
                    <p className="text-sm sm:text-base text-white leading-relaxed max-h-full overflow-y-auto text-left">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqAccordion />

      {/* Before / After */}
      <section id="ai-transformation" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <BeforeAfterSlider beforeImage={beforeImg} afterImage={afterImg} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl transition-transform">
            <h2 className="text-4xl font-bold text-white mb-4">{cta?.title}</h2>
            <p className="text-xl text-blue-100 mb-8">{cta?.subtitle}</p>
      
            <SignedIn>
              <Link to={createPageUrl("transform")}>
                <Button size="lg" variant="cta" className="try-free-button px-8">
                  {t("buttons.tryForFree", { ns: "common" })}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </SignedIn>
      
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="lg" variant="cta" className="try-free-button px-8">
                  {t("buttons.tryForFree", { ns: "common" })}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}

