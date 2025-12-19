import React from "react";
import { useTranslation } from "react-i18next";
import { Slot } from "@radix-ui/react-slot";
import { SignInButton } from "@clerk/clerk-react";
import { ImagesIcon } from "@/components/icons/ImagesIcon";
import { Mic, ArrowUp } from "lucide-react";

export default function PromptBar({ value, onChange, onSubmit, isSignedIn }) {
  const { t } = useTranslation("common");

  const handleSubmit = () => {
    onSubmit?.();
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
        <Slot>
          <ImagesIcon className="h-5 w-5 text-white/80" />
        </Slot>
      </div>

      <input
        aria-label={t("images.ui.placeholder", "Describe a new image")}
        placeholder={t("images.ui.placeholder", "Describe a new image")}
        className="flex-1 bg-transparent text-base text-white/90 placeholder:text-white/50 outline-none"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
        aria-label={t("images.ui.voice", "Voice input")}
      >
        <Mic className="h-5 w-5 text-white/80" />
      </button>

      {isSignedIn ? (
        <button
          type="button"
          onClick={handleSubmit}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10 hover:bg-white/20"
          aria-label={t("images.ui.send", "Send")}
        >
          <ArrowUp className="h-5 w-5 text-white/90" />
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/10 hover:bg-white/20"
            aria-label={t("images.ui.send", "Send")}
          >
            <ArrowUp className="h-5 w-5 text-white/90" />
          </button>
        </SignInButton>
      )}
    </div>
  );
}
