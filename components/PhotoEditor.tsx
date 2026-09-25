"use client";

import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-client";

const MODELS = [
  { id: "gpt-image-2", name: "GPT Image 2", time: "~60s" },
  { id: "nanobanana-2", name: "NanoBanana2", time: "~30s" },
  { id: "grok-imagine", name: "Grok-Imagine", time: "~20s" },
  { id: "seedpix-free", name: "SeedPix", time: "~2s" },
];

const RATIOS = [
  "Auto",
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
  "3:2",
  "2:3",
  "2:1",
  "1:2",
];

export default function PhotoEditor() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("nanobanana-2");
  const [ratio, setRatio] = useState("Auto");
  const [enhancePrompt, setEnhancePrompt] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [ratioOpen, setRatioOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const ratioRef = useRef<HTMLDivElement>(null);

  const { user, configured: authConfigured } = useAuth();

  // Close dropdowns when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Listen to model select events from model cards
  useEffect(() => {
    function handleSelectModel(e: any) {
      const selected = e.detail;
      if (selected) {
        if (selected === "seedream-5-lite") setModel("seedpix-free");
        else if (selected === "sparkpix" || selected === "seedpix") setModel("seedpix-free");
        else setModel(selected);
      }
    }
    window.addEventListener("select-model", handleSelectModel);
    return () => window.removeEventListener("select-model", handleSelectModel);
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target?.result;
      if (typeof res === "string") setImage(res);
    };
    reader.readAsDataURL(file);
  }

  function handleProcess() {
    if (!prompt.trim() && !image) return;
    if (!user && authConfigured) {
      window.location.href = "/sign-in";
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      alert("Ready to generate!");
    }, 1500);
  }

  const currentModelObj = MODELS.find((m) => m.id === model) || MODELS[1];

  return (
    <div className="w-full">
      <div className="w-full lg:w-[80%] xl:w-[70%] mx-auto">
        <div
          className="rounded-2xl overflow-visible relative"
          style={{
            border: "2px solid transparent",
            background:
              "linear-gradient(rgb(22, 22, 31), rgb(22, 22, 31)) padding-box padding-box, linear-gradient(135deg, rgba(255, 229, 37, 0.5), rgba(66, 255, 65, 0.5)) border-box border-box",
            borderRadius: "16px",
          }}
        >
          {/* Upload Row */}
          <div className="flex items-center gap-3 px-4 sm:px-5 pt-4 pb-2 overflow-x-auto">
            {image ? (
              <div className="relative flex-shrink-0 w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-xl overflow-hidden border border-white/20 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Uploaded preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black text-xs"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                role="presentation"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 w-[80px] h-[80px] sm:w-[88px] sm:h-[88px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors border-gray-600 hover:border-[#FFE525]/40 bg-[#0f0f1a]"
              >
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  tabIndex={-1}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-2xl text-white/40 leading-none">+</span>
                <span className="mt-0.5 text-[10px] text-white/40">0/5</span>
              </div>
            )}
          </div>

          {/* Textarea Row */}
          <div className="px-4 sm:px-5 py-3">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleProcess();
                }
              }}
              placeholder="Describe the image you want to generate..."
              className="w-full h-[72px] bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none text-sm leading-relaxed"
              maxLength={2000}
            />
          </div>

          {/* Toolbar Controls */}
          <div className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 border-t border-white/5">
            <div className="relative flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Model Picker */}
              <div className="static sm:relative" ref={modelRef}>
                <button
                  type="button"
                  onClick={() => {
                    setModelOpen((v) => !v);
                    setRatioOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/8 hover:bg-white/12 text-[14px] font-medium transition-colors h-9 whitespace-nowrap"
                >
                  <span className="text-white/40">Model</span>
                  <span className="text-[#FFE525] font-semibold">{currentModelObj.name}</span>
                </button>

                {modelOpen && (
                  <div className="absolute top-full left-0 z-50 w-[170px] max-w-[calc(100vw-2rem)] pt-2">
                    <div className="backdrop-blur-2xl bg-[#16161F]/90 rounded-xl shadow-2xl shadow-black/50 p-2 border border-white/10 space-y-1">
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setModel(m.id);
                            setModelOpen(false);
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-[14px] font-medium transition-all text-left ${
                            model === m.id
                              ? "bg-[#FFE525] text-black font-semibold"
                              : "text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {m.name} {m.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ratio Picker */}
              <div className="static sm:relative" ref={ratioRef}>
                <button
                  type="button"
                  onClick={() => {
                    setRatioOpen((v) => !v);
                    setModelOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/8 hover:bg-white/12 text-[14px] font-medium transition-colors h-9 whitespace-nowrap"
                >
                  <span className="text-white/40">Ratio</span>
                  <span className="text-[#FFE525] font-semibold">{ratio}</span>
                </button>

                {ratioOpen && (
                  <div className="absolute top-full left-0 z-50 w-[200px] max-w-[calc(100vw-2rem)] pt-2">
                    <div className="backdrop-blur-2xl bg-[#16161F]/90 rounded-xl shadow-2xl shadow-black/50 p-2.5 border border-white/10">
                      <div className="grid grid-cols-2 gap-1.5">
                        {RATIOS.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setRatio(r);
                              setRatioOpen(false);
                            }}
                            className={`px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                              ratio === r
                                ? "bg-[#FFE525] text-black font-semibold"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhance Prompt Toggle */}
              <button
                type="button"
                onClick={() => setEnhancePrompt((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[14px] font-medium transition-all h-9 whitespace-nowrap bg-[#FFE525]/15 text-[#FFE525]"
              >
                <span>Enhance Prompt</span>
                <div className="w-7 h-3.5 rounded-full transition-all relative bg-[#FFE525]">
                  <div
                    className={`absolute top-0.5 w-2.5 h-2.5 rounded-full bg-white transition-all ${
                      enhancePrompt ? "left-3.5" : "left-0.5 bg-black/60"
                    }`}
                  />
                </div>
              </button>
            </div>

            <div className="hidden sm:block flex-1" />

            {/* Submit Action */}
            <button
              type="button"
              onClick={handleProcess}
              disabled={processing}
              className="w-full sm:w-auto px-5 py-2.5 sm:py-2 h-11 sm:h-9 rounded-full bg-gradient-to-r from-[#FFE525] to-[#42FF41] text-black text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap shrink-0"
            >
              {processing ? (
                <span>Generating...</span>
              ) : !user && authConfigured ? (
                <span>Sign in</span>
              ) : image ? (
                <span>Edit Photo</span>
              ) : (
                <span>Generate</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
