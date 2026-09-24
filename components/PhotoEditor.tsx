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

      // 网关或上游可能返回非 JSON（如 502 HTML 页），先兜住再解析
      const raw = await res.text();
      let data: {
        error?: string;
        credits?: number;
        required?: number;
        resultUrls?: string[];
        creditsRemaining?: number;
      } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        setError(`Server returned an unexpected response (${res.status})`);
        setProcessing(false);
        return;
      }

      if (!res.ok) {
        if (res.status === 401) {
          setError("Please sign in to edit photos");
        } else if (res.status === 402) {
          setError(
            `Not enough credits - you have ${data.credits ?? 0}, this edit costs ${data.required ?? 10}.`
          );
        } else {
          setError(data.error || `Something went wrong (${res.status})`);
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
      <div className="overflow-hidden rounded-2xl border border-[#FFE525]/30 bg-[#16161F] shadow-[0_0_50px_-10px_rgba(255,229,37,0.15)] backdrop-blur-xl">
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
            className={`flex cursor-pointer flex-col items-center justify-center gap-3.5 border-b border-dashed border-white/10 bg-[#0F0F1A] px-6 py-14 text-center transition ${
              dragOver ? "border-[#FFE525] bg-[#FFE525]/5" : "hover:border-[#FFE525]/50 hover:bg-white/[0.02]"
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFE525]/10 text-[#FFE525] shadow-[0_0_20px_rgba(255,229,37,0.25)] transition group-hover:scale-105">
              <ImagePlus className="h-7 w-7" />
            </div>
            <div>
              <p className="text-base font-semibold text-white">
                Drop your photo here or <span className="text-[#FFE525] underline underline-offset-2">click to browse</span>
              </p>
              <p className="mt-1 text-xs text-white/50">
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
          <div className="relative border-b border-white/10 bg-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Uploaded"
              className="mx-auto max-h-80 w-full object-contain"
            />
            <button
              onClick={() => {
                setImage(null);
                setFileName("");
                setResult(null);
              }}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-1.5 text-white/80 hover:bg-black hover:text-white transition"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Prompt + Model */}
        <div className="space-y-4 p-5">
          {/* Model selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40 mr-1">
              Model:
            </span>
            {MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModel(m.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  model === m.id
                    ? "border border-[#FFE525]/60 bg-[#FFE525]/15 text-[#FFE525] shadow-[0_0_12px_rgba(255,229,37,0.2)]"
                    : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {m.name}
                {m.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                      model === m.id ? "bg-[#FFE525] text-black" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {m.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Prompt input */}
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0F0F1A] p-2 focus-within:border-[#FFE525]/60 focus-within:ring-1 focus-within:ring-[#FFE525]/30 transition">
            <Wand2 className="ml-2.5 h-4 w-4 shrink-0 text-[#FFE525]" />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProcess()}
              placeholder="Describe the edit... e.g. 'remove the background' or 'restore faces'"
              className="w-full bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              onClick={handleProcess}
              disabled={!image || !prompt.trim() || processing}
              className="sparkpix-btn flex shrink-0 items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {processing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
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
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-white/40 mr-1">Presets:</span>
            {PRESET_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:border-[#FFE525]/40 hover:text-[#FFE525] hover:bg-white/[0.08]"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Auth notice */}
          {!authLoading && !user && (
            <div className="flex items-center justify-between rounded-xl border border-[#FFE525]/20 bg-[#FFE525]/10 px-4 py-2.5 text-xs text-[#FFE525]">
              <span>
                {authConfigured
                  ? "⚡ Sign in to get 10 free credits — enough for your first edit"
                  : "Auth not configured yet - backend coming soon"}
              </span>
              {authConfigured && (
                <Link
                  href="/sign-up"
                  className="ml-3 shrink-0 rounded-lg bg-[#FFE525] px-3 py-1 font-bold text-black hover:opacity-90 transition"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center justify-between rounded-xl border border-red-800/60 bg-red-950/40 px-4 py-2.5 text-xs text-red-300">
              <span>{error}</span>
              {error.includes("credits") && (
                <Link
                  href="/pricing"
                  className="ml-3 shrink-0 rounded-lg bg-red-600 px-3 py-1 font-bold text-white hover:bg-red-700"
                >
                  Get Credits
                </Link>
              )}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-3 space-y-3">
              <div className="overflow-hidden rounded-xl border border-emerald-500/40 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result}
                  alt="Edited result"
                  className="mx-auto max-h-96 w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <Sparkles className="h-4 w-4 text-[#FFE525]" />
                  Your edited photo is ready
                  {credits !== null && (
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-900/60 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
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
                    className="sparkpix-btn rounded-lg px-3.5 py-1.5 text-xs font-bold text-black"
                  >
                    Open Full Size
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
                  >
                    Edit again
                  </button>
                </div>
              </div>
            </div>
          )}

          {image && (
            <p className="flex items-center gap-1.5 text-xs text-white/40 pt-1">
              <Upload className="h-3 w-3 text-[#FFE525]" />
              {fileName || "image uploaded"} · Cost: 10 credits
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
