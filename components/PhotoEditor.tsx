"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ImagePlus, Sparkles, Wand2, Upload, X, ChevronDown, Check } from "lucide-react";
import { useAuth, getAccessToken } from "@/lib/auth-client";

const MODELS = [
  { id: "gpt-image-2.5", name: "GPT Image 2.5", badge: "New" },
  { id: "gpt-image-2", name: "GPT Image 2", badge: "Best overall" },
  { id: "nanobanana-pro", name: "NanoBanana Pro", badge: "Pro" },
  { id: "nanobanana-2", name: "NanoBanana 2", badge: "4K" },
  { id: "seedream-5", name: "Seedream 5.0", badge: "Fast" },
  { id: "grok-imagine", name: "Grok Imagine", badge: "Creative" },
];

const RESOLUTIONS = [
  { id: "1K", name: "1K Standard", desc: "1024×1024 · Fast inference" },
  { id: "2K", name: "2K HD", desc: "2048×2048 · Balanced clarity (Default)" },
  { id: "4K", name: "4K Ultra-HD", desc: "4096×4096 · Crystal clear detail" },
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
  const [resolution, setResolution] = useState("2K");
  const [modelOpen, setModelOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
        setModelOpen(false);
      }
      if (resRef.current && !resRef.current.contains(event.target as Node)) {
        setResOpen(false);
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
        else if (selected === "seedpix-free") setModel("gpt-image-2");
        else setModel(selected);
      }
    }
    window.addEventListener("select-model", handleSelectModel);

    // 检查 URL 搜索参数中的 ?model=
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
          resolution,
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

  const currentModel = MODELS.find((m) => m.id === model) || MODELS[1];
  const currentRes = RESOLUTIONS.find((r) => r.id === resolution) || RESOLUTIONS[1];

  return (
    <div id="editor-section" className="mx-auto max-w-4xl scroll-mt-24">
      {/* Upload + Prompt + Model */}
      <div
        className="overflow-hidden rounded-2xl shadow-[0_0_50px_-10px_rgba(255,229,37,0.25)] backdrop-blur-xl"
        style={{
          border: "2px solid transparent",
          background: "linear-gradient(#16161F, #16161F) padding-box, linear-gradient(135deg, rgba(255,229,37,0.35), rgba(66,255,65,0.35)) border-box",
          borderRadius: "16px",
        }}
      >
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
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b border-dashed border-white/10 bg-[#0F0F1A] px-4 py-5 sm:py-6 text-center transition ${
              dragOver ? "border-[#FFE525] bg-[#FFE525]/5" : "hover:border-[#FFE525]/50 hover:bg-white/[0.02]"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE525]/10 text-[#FFE525] shadow-[0_0_15px_rgba(255,229,37,0.2)] transition group-hover:scale-105">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white sm:text-base">
                Drop photo here or <span className="text-[#FFE525] underline underline-offset-2">click to browse</span>
              </p>
              <p className="mt-0.5 text-[11px] text-white/50">
                JPG, PNG, WebP up to 20MB · Zero sign up · No watermark · 2s generation
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
              className="mx-auto max-h-52 sm:max-h-60 w-full object-contain"
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
        <div className="space-y-2.5 p-3 sm:p-4">
          {/* Model & Quality / Resolution Dropdowns (sparkpix.ai style) */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Model Dropdown */}
            <div className="relative" ref={modelRef}>
              <button
                type="button"
                onClick={() => {
                  setModelOpen((v) => !v);
                  setResOpen(false);
                }}
                className={`group flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition ${
                  modelOpen
                    ? "border-[#FFE525] bg-[#FFE525]/15 text-[#FFE525] shadow-[0_0_15px_rgba(255,229,37,0.2)]"
                    : "border-white/10 bg-[#0F0F1A] text-white/80 hover:border-[#FFE525]/50 hover:bg-[#FFE525]/5 hover:text-white"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">Model:</span>
                <span className="font-bold text-white">{currentModel.name}</span>
                {currentModel.badge && (
                  <span className="rounded-full border border-[#FFE525]/40 bg-[#FFE525]/20 px-1.5 py-0.2 text-[8px] font-bold text-[#FFE525]">
                    {currentModel.badge}
                  </span>
                )}
                <ChevronDown
                  className={`h-3 w-3 text-white/50 transition-transform duration-200 ${
                    modelOpen ? "rotate-180 text-[#FFE525]" : "group-hover:text-white"
                  }`}
                />
              </button>

              {modelOpen && (
                <div className="absolute left-0 top-full z-40 mt-1.5 w-60 rounded-2xl border border-white/10 bg-[#16161F] p-1.5 shadow-2xl backdrop-blur-2xl">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Select AI Model
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
                              ? "bg-[#FFE525]/15 font-bold text-[#FFE525]"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{m.name}</span>
                            {m.badge && (
                              <span
                                className={`rounded-full px-1.5 py-0.2 text-[8px] font-bold ${
                                  isSelected ? "bg-[#FFE525] text-black" : "bg-white/10 text-white/60"
                                }`}
                              >
                                {m.badge}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="h-3.5 w-3.5 text-[#FFE525]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Resolution / Quality Dropdown */}
            <div className="relative" ref={resRef}>
              <button
                type="button"
                onClick={() => {
                  setResOpen((v) => !v);
                  setModelOpen(false);
                }}
                className={`group flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-semibold transition ${
                  resOpen
                    ? "border-[#42FF41] bg-[#42FF41]/15 text-[#42FF41] shadow-[0_0_15px_rgba(66,255,65,0.2)]"
                    : "border-white/10 bg-[#0F0F1A] text-white/80 hover:border-[#42FF41]/50 hover:bg-[#42FF41]/5 hover:text-white"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">Quality:</span>
                <span className="font-bold text-white">{currentRes.name}</span>
                <ChevronDown
                  className={`h-3 w-3 text-white/50 transition-transform duration-200 ${
                    resOpen ? "rotate-180 text-[#42FF41]" : "group-hover:text-white"
                  }`}
                />
              </button>

              {resOpen && (
                <div className="absolute left-0 top-full z-40 mt-1.5 w-64 rounded-2xl border border-white/10 bg-[#16161F] p-1.5 shadow-2xl backdrop-blur-2xl">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Output Resolution
                  </div>
                  <div className="space-y-0.5">
                    {RESOLUTIONS.map((r) => {
                      const isSelected = resolution === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => {
                            setResolution(r.id);
                            setResOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs transition ${
                            isSelected
                              ? "bg-[#42FF41]/15 font-bold text-[#42FF41]"
                              : "text-white/80 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{r.name}</div>
                            <div className="text-[10px] font-normal text-white/40">{r.desc}</div>
                          </div>
                          {isSelected && <Check className="h-3.5 w-3.5 text-[#42FF41]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prompt input */}
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0F0F1A] p-1.5 focus-within:border-[#FFE525]/60 focus-within:ring-1 focus-within:ring-[#FFE525]/30 transition">
            <Wand2 className="ml-2 h-3.5 w-3.5 shrink-0 text-[#FFE525]" />
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleProcess()}
              placeholder="Describe edit in natural words... e.g. 'remove background' or 'restore face'"
              className="w-full bg-transparent py-1.5 text-xs sm:text-sm text-white outline-none placeholder:text-white/40"
            />
            <button
              onClick={handleProcess}
              disabled={!image || !prompt.trim() || processing}
              className="sparkpix-btn flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {processing ? (
                <>
                  <Sparkles className="h-3.5 w-3.5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  {prompt ? "Edit Photo" : "Type to Edit"}
                </>
              )}
            </button>
          </div>

          {/* Preset prompts */}
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[10px] text-white/40 mr-1">Presets:</span>
            {PRESET_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => setPrompt(p)}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/70 transition hover:border-[#FFE525]/40 hover:text-[#FFE525] hover:bg-white/[0.08]"
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
