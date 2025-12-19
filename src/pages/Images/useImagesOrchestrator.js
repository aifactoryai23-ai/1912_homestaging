// src/pages/Images/useImagesOrchestrator.js
import { useCallback, useEffect, useRef, useState } from "react";
import { getSupabaseWithAuth } from "@/api/supabaseClient";

/**
 * Images Orchestrator — uses the SAME endpoints/contract as Transform.jsx
 *
 * Endpoints/contract:
 * - Upload BEFORE via GET /api/create-upload-url?userId=...&fileName=...
 * - Consume credit via Supabase RPC: consume_credit_if_active({ p_user_id })
 * - Generate via POST /api/transform with JSON: { prompt, beforePath, parentId }
 * - Upload AFTER via /api/create-upload-url (same as above)
 * - Save via POST /api/images/save with JSON: { beforePath, afterPath, prompt, parentId }
 *
 * UI stages:
 * - "browse" | "processing" | "result"
 */
export function useImagesOrchestrator({
  clerkUserId,
  getToken,
  parentId = null,
  onNoCredits,
  toast,
} = {}) {
  const [stage, setStage] = useState("browse");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const [originalUrl, setOriginalUrl] = useState("");
  const [usedPrompt, setUsedPrompt] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const previewObjectUrlRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewObjectUrlRef.current) {
        URL.revokeObjectURL(previewObjectUrlRef.current);
        previewObjectUrlRef.current = null;
      }
    };
  }, []);

  const openPreset = useCallback((preset) => {
    setSelectedPreset(preset || null);
    setUploadOpen(true);
  }, []);

  const resetFlow = useCallback(() => {
    setStage("browse");
    setBusy(false);
    setError(null);

    setUploadOpen(false);
    setSelectedPreset(null);

    setUsedPrompt("");
    setResultUrl("");

    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
    setOriginalUrl("");
  }, []);

  const consumeCreditIfActive = useCallback(async () => {
    try {
      const supabaseAdmin = await getSupabaseWithAuth(getToken);
      const { data: ok, error: rpcErr } = await supabaseAdmin.rpc(
        "consume_credit_if_active",
        { p_user_id: clerkUserId },
      );
      return !(rpcErr || !ok);
    } catch {
      return false;
    }
  }, [clerkUserId, getToken]);

  const uploadViaSignedUrl = useCallback(
    async (blobOrFile, fileName, contentType) => {
      const res = await fetch(
        `/api/create-upload-url?userId=${encodeURIComponent(
          clerkUserId,
        )}&fileName=${encodeURIComponent(fileName)}`,
      );
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(`Failed to get upload URL: ${msg || res.status}`);
      }

      const { signedUrl, path } = await res.json();

      const uploadResp = await fetch(signedUrl, {
        method: "PUT",
        headers: { "Content-Type": contentType || "image/jpeg" },
        body: blobOrFile,
      });
      if (!uploadResp.ok) throw new Error(`Upload failed: ${uploadResp.status}`);

      // Most backends return a full storage path, but we normalize just in case.
      const normalizedPath = path?.includes("/") ? path : `${clerkUserId}/${fileName}`;
      return normalizedPath;
    },
    [clerkUserId],
  );

  const onGenerate = useCallback(
    async (file, promptText) => {
      if (busy) return;
      if (!file?.type?.startsWith("image/")) return;

      if (!clerkUserId) {
        setError("Please sign in to generate images.");
        setStage("browse");
        return;
      }

      const prompt = String(promptText || "").trim();
      if (!prompt) {
        setError("Prompt is empty.");
        setStage("browse");
        return;
      }

      setBusy(true);
      setError(null);

      // local preview URL (for ProcessingViewImages + ResultViewImages)
      if (previewObjectUrlRef.current) URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = URL.createObjectURL(file);
      setOriginalUrl(previewObjectUrlRef.current);
      setUsedPrompt(prompt);

      // close modal + go processing immediately
      setUploadOpen(false);
      setStage("processing");

      try {
        // 1) Upload BEFORE
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const beforeFileName = `before-${Date.now()}.${ext}`;
        const beforePath = await uploadViaSignedUrl(
          file,
          beforeFileName,
          file.type || "image/jpeg",
        );

        // 2) Credit check / consume (same as Transform.jsx)
        const ok = await consumeCreditIfActive();
        if (!ok) {
          onNoCredits?.();
          setStage("browse");
          return;
        }

        // 3) Generate (same /api/transform contract)
        const res = await fetch("/api/transform", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, beforePath, parentId }),
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const message =
            data?.message ||
            data?.error ||
            data?.details ||
            "Something went wrong while generating your image.";
          toast?.({
            title: "⚠️ Generation failed",
            description: message,
            variant: "destructive",
            duration: 8000,
          });
          setStage("browse");
          return;
        }

        if (!data?.imageUrl) throw new Error("No output image returned.");

        // 4) Download output (Transform returns a data URL) -> blob
        const outputResp = await fetch(data.imageUrl);
        const outputBlob = await outputResp.blob();

        // 5) Upload AFTER
        const afterFileName = `after-${Date.now()}.jpg`;
        const afterPath = await uploadViaSignedUrl(outputBlob, afterFileName, "image/jpeg");

        // 6) Save (same /api/images/save contract as Transform.jsx)
        const saveResp = await fetch("/api/images/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": clerkUserId,
          },
          body: JSON.stringify({ beforePath, afterPath, prompt, parentId: parentId || null }),
        });

        if (!saveResp.ok) {
          const txt = await saveResp.text().catch(() => "");
          toast?.({
            title: "⚠️ Save failed",
            description: txt || "Image generated, but saving failed.",
            variant: "destructive",
            duration: 8000,
          });
        }

        // 7) UI result
        setResultUrl(data.imageUrl);
        setStage("result");
      } catch (e) {
        const msg =
          e?.message ||
          "Something went wrong while processing your image. Please try again.";
        setError(msg);
        toast?.({
          title: "❌ Generation Error",
          description: msg,
          variant: "destructive",
          duration: 8000,
        });
        setStage("browse");
      } finally {
        setBusy(false);
      }
    },
    [busy, clerkUserId, consumeCreditIfActive, parentId, onNoCredits, toast, uploadViaSignedUrl],
  );

  return {
    stage,
    uploadOpen,
    setUploadOpen,
    selectedPreset,
    setSelectedPreset,
    openPreset,

    originalUrl,
    usedPrompt,
    resultUrl,

    busy,
    error,

    onGenerate,
    resetFlow,
  };
}
