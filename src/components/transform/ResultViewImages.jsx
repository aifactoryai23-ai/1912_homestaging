import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Check } from "lucide-react";
import BeforeAfterSlider from "../shared/BeforeAfterSlider";
import { useTranslation } from "react-i18next";

/**
 * Result view for Images (AI image generation)
 *
 * props:
 * - resultUrl: string (generated image)
 * - originalUrl: string (uploaded image)
 * - onStartOver: () => void
 */
export default function ResultViewImages({
  resultUrl,
  originalUrl,
  onStartOver,
}) {
  const { t } = useTranslation(["transform", "common"]);
  const resultTexts =
    t("result", { ns: "transform", returnObjects: true }) || {};

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = "generated-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Success message */}
      <Card className="p-6 bg-green-50 border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">
              {resultTexts.title || "Image generated"}
            </h3>
            <p className="text-sm text-green-700">
              {resultTexts.subtitle || "Your image is ready"}
            </p>
          </div>
        </div>
      </Card>

      {/* Before / After */}
      <Card className="overflow-hidden">
        <BeforeAfterSlider
          beforeImage={originalUrl}
          afterImage={resultUrl}
        />
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownload}
          size="lg"
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          <Download className="w-5 h-5 mr-2" />
          {resultTexts.download ||
            t("buttons.download", { ns: "common" })}
        </Button>

        <Button
          onClick={onStartOver}
          size="lg"
          variant="outline"
          className="flex-1"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          {resultTexts.again || "Generate again"}
        </Button>
      </div>
    </div>
  );
}
