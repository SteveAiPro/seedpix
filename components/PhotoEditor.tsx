"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ImagePlus, Sparkles, Wand2, Upload, X } from "lucide-react";
import { useAuth, getAccessToken } from "@/lib/auth-client";

const MODELS = [
  { id: "gpt-image-2", name: "GPT Image 2", badge: "Best overall" },
  { id: "nanobanana-2", name: "NanoBanana 2", badge: "4K editing" },
  { id: "seedream-5", name: "Seedream 5.0", badge: "Fast" },
  { id: "grok-imagine", name: "Grok Imagine", badge: "High-res" },
];

const PRESET_PROMPTS = [
  "Remove the background",
  "Restore this old photo",
  "Remove the person on the left",
  "Turn me into anime style",
  "Enhance to 4K quality",
];

export default function PhotoEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-image-2");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, loading: authLoading, configured: authConfigured } = useAuth();

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") setImage(result);
    };
    reader.readAsDataURL(file);
  }

  async function handleProcess() {
    if (!image || !prompt.trim()) return;
    setProcessing(true);
    setError(null);

    try {
      const token = await getAccessToken();
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageBase64: image,
          model,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setError("Please sign in to edit photos");
        } else if (res.status === 402) {
          setError("Insufficient credits - get more credits to continue");
        } else {
          setError(data.error || "Something went wrong");
        }
        setProcessing(false);
        return;
      }

      setResult(data.resultUrls?.[0] ?? null);
      setCredits(data.creditsRemaining ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Upload + Prompt + Model */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {/* Upload area */}
        {!image ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 border-b border-dashed border-neutral-200 px-6 py-14 text-center transition ${
              dragOver ? "bg-blue-50" : "hover:bg-neutral-50"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
              <ImagePlus className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Drop your photo here or click to browse
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                JPG, PNG, WebP up to 20MB · No watermark · 2s generation
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        ) : (
          <div className="relative border-b border-neutral-200 bg-neutral-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Uploaded"
              className="mx-auto max-h-72 w-full object-contain"
            />
            <button
              onClick={() => {
                setImage(null);
                setFileName("");
                setResult(null);
              }}
              className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Prompt + Model */}
        <div className="space-y-3 p-4">
          {/* Model selector */}
          <div className="flex flex-wrap gap-2">
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  model === m.id
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {m.name}
                {m.badge && (
                  <span
                    className={`rounded px-1 py-0.5 text-[10px] ${
                      model === m.id ? "bg-blue-600 text-white" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {m.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Prompt input */}
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white p-1.5 focus-within:border-blue-500">
            <Wand2 className="ml-2 h-4 w-4 shrink-0 text-neutral-400" />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProcess()}
              placeholder="Describe the edit... e.g. 'remove the background'"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-neutral-400"
            />
            <button
              onClick={handleProcess}
              disabled={!image || !prompt.trim() || processing}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {prompt ? "Edit Photo" : "Type to Edit"}
                </>
              )}
            </button>
          </div>

          {/* Preset prompts */}
          <div className="flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-500 transition hover:border-blue-300 hover:text-blue-600"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Auth notice */}
          {!authLoading && !user && (
            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
              <span>
                {authConfigured
                  ? "Sign in to get 5 free credits and save your edits"
                  : "Auth not configured yet - backend coming soon"}
              </span>
              {authConfigured && (
                <Link
                  href="/sign-up"
                  className="ml-3 shrink-0 rounded-md bg-amber-600 px-3 py-1 font-medium text-white hover:bg-amber-700"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-2.5 text-xs text-red-700">
              <span>{error}</span>
              {error.includes("credits") && (
                <Link
                  href="/pricing"
                  className="ml-3 shrink-0 rounded-md bg-red-600 px-3 py-1 font-medium text-white hover:bg-red-700"
                >
                  Get Credits
                </Link>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-2 space-y-3">
              <div className="overflow-hidden rounded-xl border border-green-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result}
                  alt="Edited result"
                  className="w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-green-50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-green-800">
                  <Sparkles className="h-4 w-4" />
                  Your edited photo is ready
                  {credits !== null && (
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium">
                      {credits} credits left
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = result;
                      a.target = "_blank";
                      a.rel = "noopener";
                      a.click();
                    }}
                    className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700"
                  >
                    Open Full Size
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="rounded-lg border border-green-300 px-3 py-1.5 text-xs text-green-700 hover:bg-green-100"
                  >
                    Edit again
                  </button>
                </div>
              </div>
            </div>
          )}

          {image && (
            <p className="flex items-center gap-1 text-xs text-neutral-400">
              <Upload className="h-3 w-3" />
              {fileName || "image uploaded"} · Cost: 10 credits
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
