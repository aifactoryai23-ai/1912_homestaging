// src/pages/Images/Images.jsx
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Heading } from "@radix-ui/themes";
import { useToast } from "@/components/ui/use-toast";
import { useUser, useAuth } from "@clerk/clerk-react";

import PromptBar from "./PromptBar.jsx";
import StyleCarousel from "./StyleCarousel.jsx";
import DiscoverList from "./DiscoverList.jsx";

import UploadZoneImages from "@/components/transform/UploadZoneImages.jsx";
import ProcessingViewImages from "@/components/transform/ProcessingViewImages.jsx";
import ResultViewImages from "@/components/transform/ResultViewImages.jsx";

import {
  SelectedPresetProvider,
  useSelectedPreset,
} from "./selectedPresetStore.jsx";
import {
  STYLE_ITEMS,
  DISCOVER_LEFT,
  DISCOVER_RIGHT,
} from "./data.withPresets.js";

import { useImagesOrchestrator } from "./useImagesOrchestrator.js";

function ImagesPageInner() {
  const { t } = useTranslation("common");
  const { toast } = useToast();
  const { user: clerkUser } = useUser();
  const { getToken } = useAuth();

  const [pendingPreset, setPendingPreset] = useState(null);
  const [pendingPrompt, setPendingPrompt] = useState("");
  const [promptValue, setPromptValue] = useState("");

  const { selectedPreset, setSelectedPreset } = useSelectedPreset();

  const {
    stage,
    uploadOpen,
    setUploadOpen,
    originalUrl,
    usedPrompt,
    resultUrl,
    busy,
    error,
    onGenerate,
    resetFlow,
  } = useImagesOrchestrator({
    clerkUserId: clerkUser?.id,
    getToken,
    parentId: null,
    toast,
    onNoCredits: () => {
      toast({
        title: t("images.noCreditsTitle", "No credits"),
        description: t(
          "images.noCreditsDescription",
          "You don't have enough credits to generate. Please upgrade or try later."
        ),
        variant: "destructive",
        duration: 8000,
      });
    },
  });

  const openPreset = (preset) => {
    const prompt =
      preset?.prompt ||
      preset?.title ||
      preset?.label ||
      preset?.name ||
      "";

    setPendingPreset(preset || null);
    setPendingPrompt(prompt);
    setPromptValue(prompt);
    setSelectedPreset(preset || null);
    setUploadOpen(true);
  };

  const handlePromptSubmit = () => {
    const prompt = promptValue.trim();
    if (!prompt) return;

    const inlinePreset = { key: "custom", prompt };
    setPendingPreset(inlinePreset);
    setPendingPrompt(prompt);
    setSelectedPreset(inlinePreset);
    setUploadOpen(true);
  };

  const startOver = () => {
    resetFlow();
    setSelectedPreset(null);
    setPendingPreset(null);
    setPendingPrompt("");
    setPromptValue("");
  };

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

      <div className="images-page text-white">
        <section className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="relative min-h-[calc(100vh-var(--app-header-h,7rem))] overflow-hidden bg-gradient-to-br from-[#4a2b72] via-[#2a1a3f] to-[#7a4a1f]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-white/5" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 pt-8 pb-16 sm:pb-20">
              {stage === "browse" && (
                <>
                  <Heading size="8" weight="medium" className="tracking-tight">
                    {t("images.ui.title", "Images")}
                  </Heading>

                  <div className="mt-8">
                    <PromptBar
                      value={promptValue}
                      onChange={setPromptValue}
                      onSubmit={handlePromptSubmit}
                      isSignedIn={Boolean(clerkUser)}
                    />
                  </div>

                  <div className="mt-14">
                    <StyleCarousel
                      items={STYLE_ITEMS}
                      onSelect={openPreset}
                      isSignedIn={Boolean(clerkUser)}
                    />
                  </div>

                  <div className="mt-14">
                    <DiscoverList
                      left={DISCOVER_LEFT}
                      right={DISCOVER_RIGHT}
                      onSelect={openPreset}
                      isSignedIn={Boolean(clerkUser)}
                    />
                  </div>

                  <UploadZoneImages
                    open={uploadOpen}
                    onOpenChange={setUploadOpen}
                    preset={pendingPreset || selectedPreset}
                    defaultPrompt={pendingPrompt || selectedPreset?.prompt || ""}
                    onGenerate={onGenerate}
                  />

                  {busy && (
                    <div className="mt-6 text-sm text-white/70">
                      {t("images.ui.busy", "Working...")}
                    </div>
                  )}
                  {error && (
                    <div className="mt-3 text-sm text-red-300">
                      {String(error)}
                    </div>
                  )}

                  <div className="h-36 sm:h-44" />
                </>
              )}

              {stage === "processing" && (
                <ProcessingViewImages
                  promptText={usedPrompt}
                  previewSrc={originalUrl}
                />
              )}

              {stage === "result" && (
                <ResultViewImages
                  originalUrl={originalUrl}
                  resultUrl={resultUrl}
                  onStartOver={startOver}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default function ImagesPage() {
  return (
    <SelectedPresetProvider>
      <ImagesPageInner />
    </SelectedPresetProvider>
  );
}
