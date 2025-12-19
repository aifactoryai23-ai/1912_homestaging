import React, { useRef } from "react";
import { Dialog, Heading, Text } from "@radix-ui/themes";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Dark upload modal for Images page:
 * - preset title + subtitle
 * - editable prompt (pre-filled from preset)
 * - choose photo / drag&drop
 * - as soon as a photo is picked -> calls onGenerate(file, promptText)
 */
export default function UploadZoneImages({
  open,
  onOpenChange,
  preset,
  defaultPrompt = "",
  onGenerate, // async (file, promptText) => void
}) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [promptText, setPromptText] = React.useState(defaultPrompt || "");
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setPromptText(defaultPrompt || "");
    setBusy(false);
  }, [open, defaultPrompt]);

  const handleChoose = () => {
    if (busy) return;
    fileInputRef.current?.click();
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) handleFile(file);
  };

  const handleFile = async (file) => {
    if (!file?.type?.startsWith("image/")) return;
    try {
      setBusy(true);
      await onGenerate?.(file, promptText);
      onOpenChange?.(false);
    } finally {
      setBusy(false);
    }
  };

  const title = preset?.title || "Style";
  const subtitle = preset?.subtitle || "Try a style on an image";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} forceMount>
      <Dialog.Content
        maxWidth="720px"
        className={
          "z-[999999] !p-0 !overflow-hidden !rounded-[28px] !bg-[#1f1f1f] !ring-1 !ring-white/10 shadow-2xl" +
          (dragActive ? " outline outline-2 outline-white/30" : "")
        }
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="px-10 pt-10 pb-8 text-center">
          <Heading size="9" weight="bold" className="!text-white !tracking-tight">
            {title}
          </Heading>

          <Text size="4" className="mt-3 block text-white/70">
            {subtitle}
          </Text>

          <div className="mt-10 text-left">
            <Label className="font-semibold text-white/80">
              Add Custom Instructions (your text prompt).
            </Label>
            <Textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={6}
              className="mt-2 min-h-[140px] bg-white/5 text-white placeholder:text-white/40 border border-white/10 focus-visible:ring-white/20"
              placeholder="Write your prompt here..."
              disabled={busy}
            />
          </div>

          <div className="mt-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              disabled={busy}
            />

            <button
              type="button"
              onClick={handleChoose}
              disabled={busy}
              className="w-full rounded-full bg-white px-8 py-5 text-[18px] font-medium text-black shadow-sm hover:bg-white/95 active:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? "Generating..." : "Choose a new photo"}
            </button>
          </div>

          <div className="mt-8">
            <Dialog.Close>
              <button
                type="button"
                disabled={busy}
                className="text-white/80 underline underline-offset-4 hover:text-white disabled:opacity-60"
              >
                Cancel
              </button>
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
