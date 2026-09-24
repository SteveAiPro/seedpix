"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Upload } from "lucide-react";
import { useAuth, getAccessToken } from "@/lib/auth-client";

const MODELS = [
  { id: "nanobanana-2", name: "NanoBanana2", badge: "New" },
  { id: "gpt-image-2.5", name: "GPT Image 2.5", badge: "Pro" },
  { id: "gpt-image-2", name: "GPT Image 2", badge: "Best" },
  { id: "nanobanana-pro", name: "NanoBanana Pro", badge: "Ultra" },
  { id: "seedream-5", name: "Seedream 5.0", badge: "Fast" },
  { id: "grok-imagine", name: "Grok Imagine", badge: "Creative" },
];

const RATIOS = [
  { id: "Auto", label: "Auto" },
  { id: "1:1", label: "1:1" },
  { id: "16:9", label: "16:9" },
  { id: "9:16", label: "9:16" },
  { id: "4:3", label: "4:3" },
  { id: "3:4", label: "3:4" },
  { id: "3:2", label: "3:2" },
  { id: "2:3", label: "2:3" },
  { id: "2:1", label: "2:1" },
  { id: "1:2", label: "1:2" },
];

const TOP_PILLS = [
  "No Watermark",
  "2s Generation",
  "Seamless Edit",
  "800k+ Users",
  "10M+ Images",
];

const PRESET_PROMPTS = [
  "Remove background",
  "Restore old photo",
  "Cyberpunk neon portrait",
  "Anime studio ghibli style",
  "Enhance 4K ultra detail",
];

export default function PhotoEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("nanobanana-2");
  const [ratio, setRatio] = useState("Auto");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [ratioOpen, setRatioOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const ratioRef = useRef<HTMLDivElement>(null);

  const { user, loading: authLoading, configured: authConfigured } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setModelOpen(false);
      }
      if (ratioRef.current && !ratioRef.current.contains(event.target as Node)) {
        setRatioOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // 监听全局模型选择事件或 URL 参数
    function handleSelectModel(e: any) {
      const selected = e.detail;
      if (selected) {
        if (selected === "seedream-5-lite") setModel("seedream-5");
        else if (selected === "seedpix-free") setModel("nanobanana-2");
        else setModel(selected);
      }
    }
    window.addEventListener("select-model", handleSelectModel);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlModel = params.get("model");
      if (urlModel) {
        if (urlModel === "seedream-5-lite") setModel("seedream-5");
        else setModel(urlModel);
      }
    }

    return () => window.removeEventListener("select-model", handleSelectModel);
  }, []);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result;
      if (typeof res === "string") setImage(res);
    };
    reader.readAsDataURL(file);
  }

  async function handleProcess() {
    if (!prompt.trim() && !image) return;

    if (!user && authConfigured) {
      window.location.href = "/sign-in";
      return;
    }

    setProcessing(true);
    setError(null);

    const effectivePrompt = enhancePrompt
      ? `${prompt.trim()}${prompt.trim() ? ", " : ""}high quality, highly detailed, masterwork`
      : prompt.trim();

    try {
      const token = await getAccessToken();
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          prompt: effectivePrompt || "Masterpiece photograph, ultra detailed, photorealistic",
          imageBase64: image,
          model,
          aspectRatio: ratio === "Auto" ? undefined : ratio,
        }),
      });

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
          setError("Please sign in to generate or edit photos");
        } else if (res.status === 402) {
          setError(
            `Not enough credits - you have ${data.credits ?? 0}, this costs ${data.required ?? 10}.`
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

  const currentModel = MODELS.find((m) => m.id === model) || MODELS[0];

  return (
    <div id="editor-section" className="mx-auto max-w-4xl scroll-mt-24">
      {/* Top badges (sparkpix style) */}
      <div className="mb-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {TOP_PILLS.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/5 bg-[#171722] px-3 py-0.5 text-[11px] font-medium text-white/70 shadow-sm"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Editor Card with Neon Green/Yellow Border */}
      <div
        className="relative rounded-2xl p-3 sm:p-4 shadow-[0_0_50px_-15px_rgba(66,255,65,0.2)] backdrop-blur-xl"
        style={{
          border: "2px solid rgba(82, 250, 52, 0.45)",
          background: "linear-gradient(180deg, #151520 0%, #101018 100%)",
        }}
      >
        {/* Top Input Row: Image Upload Box + Textarea */}
        <div className="flex items-start gap-3">
          {/* Upload Square */}
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
            className={`relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed transition ${
              dragOver
                ? "border-[#FFE525] bg-[#FFE525]/10"
                : image
                ? "border-white/30 bg-black/50"
                : "border-white/15 bg-white/[0.03] hover:border-[#FFE525]/60 hover:bg-[#FFE525]/5"
            }`}
          >
            {image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Uploaded"
                  className="h-full w-full rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setFileName("");
                    setResult(null);
                  }}
                  className="absolute -top-1.5 -right-1.5 rounded-full bg-black/90 p-0.5 text-white/80 hover:bg-black hover:text-white transition"
                  title="Remove photo"
                >
                  <X className="h-3 w-3" />
                </button>
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.2 text-[8px] font-mono text-white/90">
                  1/5
                </span>
              </>
            ) : (
              <>
                <span className="text-xl font-light text-white/40 leading-none mb-0.5">+</span>
                <span className="text-[10px] text-white/40 font-mono">0/5</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>

          {/* Textarea */}
          <div className="flex-1">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleProcess();
                }
              }}
              placeholder="Describe the image you want to generate or edit..."
              rows={2}
              className="w-full resize-none bg-transparent pt-1 text-xs sm:text-sm text-white placeholder-white/30 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-2.5">
          {/* Left Controls: Model, Ratio, Enhance Prompt */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Model Pill */}
            <div className="relative" ref={modelRef}>
              <button
                type="button"
                onClick={() => {
                  setModelOpen((v) => !v);
                  setRatioOpen(false);
                }}
                className="flex items-center gap-1.5 rounded-full bg-[#1F202C] border border-white/5 px-3 py-1.5 text-xs transition hover:border-white/20"
              >
                <span className="text-white/40">Model</span>
                <span className="font-semibold text-[#FFE525]">{currentModel.name}</span>
              </button>

              {/* Model Dropdown Menu */}
              {modelOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 w-52 rounded-2xl border border-white/10 bg-[#161622]/95 p-1.5 shadow-2xl backdrop-blur-2xl">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Select Model
                  </div>
                  <div className="space-y-0.5">
                    {MODELS.map((m) => {
                      const isSelected = model === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setModel(m.id);
                            setModelOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-xs transition ${
                            isSelected
                              ? "bg-[#FFE525] text-black font-bold"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          <span>{m.name}</span>
                          {m.badge && (
                            <span
                              className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold ${
                                isSelected ? "bg-black text-[#FFE525]" : "bg-white/10 text-white/60"
                              }`}
                            >
                              {m.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Ratio Pill */}
            <div className="relative" ref={ratioRef}>
              <button
                type="button"
                onClick={() => {
                  setRatioOpen((v) => !v);
                  setModelOpen(false);
                }}
                className="flex items-center gap-1.5 rounded-full bg-[#1F202C] border border-white/5 px-3 py-1.5 text-xs transition hover:border-white/20"
              >
                <span className="text-white/40">Ratio</span>
                <span className="font-semibold text-[#FFE525]">{ratio}</span>
              </button>

              {/* Ratio Dropdown 2-Column Popover (exact sparkpix match) */}
              {ratioOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 w-44 sm:w-48 rounded-2xl border border-white/10 bg-[#161622]/95 p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="grid grid-cols-2 gap-1.5">
                    {RATIOS.map((r) => {
                      const isSelected = ratio === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            setRatio(r.id);
                            setRatioOpen(false);
                          }}
                          className={`py-1.5 text-center text-xs font-semibold rounded-lg transition ${
                            isSelected
                              ? "bg-[#FFE525] text-black shadow-sm"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          {r.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Enhance Prompt Toggle Pill */}
            <button
              type="button"
              onClick={() => setEnhancePrompt((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-[#1F202C] border border-white/5 px-3 py-1.5 text-xs transition hover:border-white/20 cursor-pointer"
            >
              <span className="font-medium text-[#FFE525]">Enhance Prompt</span>
              <div
                className={`relative h-4 w-7 rounded-full transition-colors ${
                  enhancePrompt ? "bg-[#FFE525]" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-3 w-3 rounded-full bg-black transition-transform duration-200 ${
                    enhancePrompt ? "left-3.5" : "left-0.5"
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Right Action CTA Button */}
          <button
            onClick={handleProcess}
            disabled={processing || (!prompt.trim() && !image)}
            className="rounded-full bg-gradient-to-r from-[#9aff47] to-[#42FF41] px-5 sm:px-6 py-2 text-xs sm:text-sm font-bold text-black shadow-lg shadow-[#42FF41]/20 transition hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 animate-spin" />
                Generating...
              </span>
            ) : !user && authConfigured ? (
              "Sign in"
            ) : image ? (
              "Edit Photo"
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Presets row */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1 pt-1">
          <span className="text-[10px] text-white/30 mr-1">Presets:</span>
          {PRESET_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="rounded-full border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/60 transition hover:border-[#FFE525]/30 hover:text-[#FFE525] hover:bg-white/[0.06]"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-2.5 flex items-center justify-between rounded-xl border border-red-800/60 bg-red-950/40 px-3.5 py-2 text-xs text-red-300">
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

        {/* Result view */}
        {result && (
          <div className="mt-3 space-y-3">
            <div className="overflow-hidden rounded-xl border border-emerald-500/40 bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={result}
                alt="Generated result"
                className="mx-auto max-h-96 w-full object-contain"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300">
                <Sparkles className="h-4 w-4 text-[#FFE525]" />
                Image ready!
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
                  className="rounded-lg bg-[#42FF41] px-3.5 py-1.5 text-xs font-bold text-black hover:brightness-110 transition"
                >
                  Download HD
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  New Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
