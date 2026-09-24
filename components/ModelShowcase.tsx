"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";

interface ModelItem {
  id: string;
  name: string;
  desc: string;
  badge: string;
  href?: string;
  recommendedPrompt?: string;
}

const MODELS_LIST: ModelItem[] = [
  {
    id: "gpt-image-2.5",
    name: "GPT Image 2.5",
    desc: "Change one part of a photo and the rest stays put. Real transparent PNG.",
    badge: "New",
    recommendedPrompt: "Edit photo and keep background transparent",
  },
  {
    id: "gpt-image-2",
    name: "GPT Image 2",
    desc: "Create high-quality images, text-rich visuals, and product photography.",
    badge: "Hot",
    recommendedPrompt: "High quality realistic portrait with cinematic lighting",
  },
  {
    id: "nanobanana-pro",
    name: "NanoBanana Pro",
    desc: "Gemini 3 Pro Image — top-tier photorealism detail and accurate in-image text.",
    badge: "Pro",
    href: "/gemini-ai-photo-editor",
    recommendedPrompt: "Ultra-detailed 4K studio lighting with natural skin texture",
  },
  {
    id: "nanobanana-2",
    name: "NanoBanana 2",
    desc: "Google's next-gen multimodal vision model for instant professional creativity.",
    badge: "Fast",
    recommendedPrompt: "Remove unwanted objects and enhance image quality",
  },
  {
    id: "seedream-5",
    name: "Seedream 5.0 Pro",
    desc: "Edit a photo with one sentence, or generate photorealistic art from scratch.",
    badge: "Ultra",
    recommendedPrompt: "Transform into an elegant photorealistic scene",
  },
  {
    id: "seedream-5-lite",
    name: "Seedream 5.0 Lite",
    desc: "The 4K tier — half the credits of Pro, twice the resolution.",
    badge: "4K",
    recommendedPrompt: "Upscale and sharpen fine details to 4K resolution",
  },
  {
    id: "grok-imagine",
    name: "Grok Imagine",
    desc: "Create high-resolution images from text with xAI's Aurora creative engine.",
    badge: "Creative",
    href: "/ai-image-generator",
    recommendedPrompt: "Futuristic artistic composition with vivid neon accents",
  },
  {
    id: "seedpix-free",
    name: "SeedPix Free",
    desc: "Free text-to-image generation — zero credits, zero sign-up to try.",
    badge: "Free",
    href: "/ai-photo-editor-free",
    recommendedPrompt: "Remove background and clean up image",
  },
];

export default function ModelShowcase() {
  const [activeModel, setActiveModel] = useState<string | null>(null);

  function handleSelect(model: ModelItem) {
    setActiveModel(model.id);

    // 平滑滚动至编辑器
    const el = document.getElementById("editor-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // 触发全局模型切换事件
    window.dispatchEvent(new CustomEvent("select-model", { detail: model.id }));
  }

  return (
    <section id="models" className="border-y border-white/5 bg-[#0C0C12] py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Create Stunning Images with the Latest AI Models
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Leading generators in one editor — click any card below to launch in the editor or explore its features.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {MODELS_LIST.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleSelect(m)}
              className={`group flex flex-col justify-between text-left rounded-2xl border p-4.5 transition-all duration-200 cursor-pointer ${
                activeModel === m.id
                  ? "border-[#FFE525] bg-[#16161F] shadow-[0_0_30px_rgba(255,229,37,0.25)] scale-[1.02]"
                  : "border-white/10 bg-[#13131A] hover:-translate-y-1 hover:border-[#FFE525]/60 hover:shadow-[0_0_25px_rgba(255,229,37,0.15)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-sm font-bold text-white group-hover:text-[#FFE525] transition-colors">
                    {m.name}
                  </span>
                  <span className="rounded-md bg-[#FFE525]/15 px-2 py-0.5 text-[10px] font-bold text-[#FFE525] uppercase tracking-wide">
                    {m.badge}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                  {m.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#FFE525]">
                <span className="flex items-center gap-1.5">
                  <Wand2 className="h-3 w-3" /> Try in Editor
                </span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
