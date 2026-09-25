"use client";

import { useState } from "react";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Sparkles, CheckCircle2, ArrowRight, Wand2, Shield, Zap, ChevronRight } from "lucide-react";
import type { CatalogItem } from "@/lib/catalog";

interface CatalogPageProps {
  item: CatalogItem;
}

export default function CatalogPage({ item }: CatalogPageProps) {
  const [prompt, setPrompt] = useState(item.examplePrompt);
  const [image, setImage] = useState<string | null>(null);

  const fallbackBefore = item.beforeImage || "/showcase/before-try-new-look.webp";
  const fallbackAfter = item.afterImage || "/showcase/after-try-new-look.webp";

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* 顶部面包屑 */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-white/50">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="capitalize">{item.category === "aitool" ? "AI Tools" : item.category === "style" ? "Style Transfer" : "AI Models"}</span>
          <ChevronRight className="w-3 h-3 opacity-40" />
          <span className="text-white font-medium">{item.title.split(" - ")[0]}</span>
        </nav>
      </div>

      {/* Hero 区域 */}
      <section className="relative pt-6 pb-16 px-4 max-w-6xl mx-auto text-center overflow-hidden">
        {/* 背景微光 */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 -z-10 h-[450px] w-[800px] rounded-full bg-gradient-to-tr from-[#FFE525]/15 via-[#42FF41]/10 to-transparent blur-3xl" />

        {item.badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE525]/10 border border-[#FFE525]/30 text-[#FFE525] text-xs font-bold mb-4 shadow-[0_0_15px_rgba(255,229,37,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{item.badge} Release</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          <span className="text-white block">{item.title.split(" - ")[0]}</span>
          <span className="bg-gradient-to-r from-[#FFE525] to-[#42FF41] bg-clip-text text-transparent block mt-1">
            Free Online With No Watermark
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          {item.description}
        </p>

        {/* 核心价值药丸 */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/80">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Zap className="w-3.5 h-3.5 text-[#FFE525]" /> 5 Free Daily Credits
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Shield className="w-3.5 h-3.5 text-[#42FF41]" /> No Sign Up Required
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFE525]" /> Commercial Rights
          </span>
        </div>

        {/* 在线交互试用区 (Last-Click Product Experience) */}
        <div className="mt-10 max-w-4xl mx-auto bg-[#13131A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 左侧：输入 Prompt & 控制 */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  1. Instruction Prompt (Type to Edit)
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to edit or generate..."
                    className="w-full bg-[#0A0A0F] border border-white/10 rounded-2xl p-3.5 text-sm text-white placeholder-white/40 focus:border-[#FFE525] focus:outline-none focus:ring-1 focus:ring-[#FFE525] transition-all resize-none"
                  />
                </div>
              </div>

              {/* 推荐 prompt */}
              <div>
                <span className="text-[11px] text-white/50 block mb-1.5 font-medium">Try example instruction:</span>
                <button
                  type="button"
                  onClick={() => setPrompt(item.examplePrompt)}
                  className="text-left text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-white/80 transition-colors w-full line-clamp-2"
                >
                  ✦ &ldquo;{item.examplePrompt}&rdquo;
                </button>
              </div>

              <div className="pt-2">
                <Link
                  href={`/?prompt=${encodeURIComponent(prompt)}`}
                  className="w-full sparkpix-btn py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 font-black text-sm text-black shadow-lg"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Start Editing with {item.title.split(" - ")[0]}</span>
                </Link>
                <p className="text-[11px] text-center text-white/40 mt-2">
                  Instant processing • High resolution output • Zero lag
                </p>
              </div>
            </div>

            {/* 右侧：实测交互对比滑块 */}
            <div className="w-full md:w-80 flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                2. Live Interactive Preview
              </span>
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <BeforeAfterSlider
                  beforeImage={fallbackBefore}
                  afterImage={fallbackAfter}
                  beforeAlt="Original input"
                  afterAlt="Result"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能特性 3 栏 */}
      <section className="py-16 px-4 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Why Choose SeedPix for {item.title.split(" - ")[0]}?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/60">{item.tagline}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {item.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#12121A] border border-white/10 hover:border-[#FFE525]/40 transition-all duration-200"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[#FFE525]/20 to-[#42FF41]/20 flex items-center justify-center text-[#FFE525] mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature}</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Engineered with deep neural pipelines to preserve genuine textures, sharp contours, and lifelike realism with no distortion.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 步使用教程 (Step-by-step How-to) */}
      <section className="py-16 px-4 max-w-5xl mx-auto border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12">
          How to Use {item.title.split(" - ")[0]} in 3 Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#12121A]/60 border border-white/5">
            <div className="h-12 w-12 rounded-2xl bg-[#FFE525]/15 text-[#FFE525] font-black text-lg flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="text-base font-bold text-white mb-2">Upload Your Photo</h3>
            <p className="text-xs text-white/60">
              Drag and drop any JPG, PNG, or WebP image. No login or installation needed.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#12121A]/60 border border-white/5">
            <div className="h-12 w-12 rounded-2xl bg-[#42FF41]/15 text-[#42FF41] font-black text-lg flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="text-base font-bold text-white mb-2">Type Your Instruction</h3>
            <p className="text-xs text-white/60">
              Enter your editing prompt or choose one of our intelligent one-click presets.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#12121A]/60 border border-white/5">
            <div className="h-12 w-12 rounded-2xl bg-[#FFE525]/15 text-[#FFE525] font-black text-lg flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="text-base font-bold text-white mb-2">Download in HD</h3>
            <p className="text-xs text-white/60">
              Preview before and after with the interactive slider, then export with zero watermark.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ 问答区块 (E-E-A-T & FAQPage Schema) */}
      <section className="py-16 px-4 max-w-4xl mx-auto border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {item.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#12121A] border border-white/10"
            >
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-[#FFE525]">Q:</span>
                {faq.question}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 底部全宽 CTA */}
      <section className="py-16 px-4 text-center max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#161622] to-[#0E0E17] border border-white/10 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-radial from-[#FFE525]/10 via-transparent to-transparent" />
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Ready to Try {item.title.split(" - ")[0]}?
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-xl mx-auto">
            Experience next-generation AI image editing today. 5 free credits on sign up with zero watermark.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/"
              className="sparkpix-btn py-3.5 px-8 rounded-2xl font-black text-sm text-black flex items-center gap-2 shadow-xl"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
