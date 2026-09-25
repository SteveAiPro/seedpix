"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";

interface ModelItem {
  id: string;
  name: string;
  desc: string;
  badge: string;
  coverImage: string;
  href?: string;
  recommendedPrompt?: string;
}

const MODELS_LIST: ModelItem[] = [
  {
    id: "gpt-image-2.5",
    name: "GPT Image 2.5",
    desc: "Change one part of a photo and the rest stays put. Real transparent PNG.",
    badge: "New",
    coverImage: "/model-covers/gpt-image-2-5.webp",
    href: "/gpt-image-2-5",
    recommendedPrompt: "Edit photo and keep background transparent",
  },
  {
    id: "gpt-image-2",
    name: "GPT Image 2",
    desc: "Create high-quality images, text-rich visuals, and product photography.",
    badge: "Hot",
    coverImage: "/model-covers/gpt-image-2.webp",
    href: "/gpt-image-2",
    recommendedPrompt: "High quality realistic portrait with cinematic lighting",
  },
  {
    id: "nanobanana-pro",
    name: "NanoBanana Pro",
    desc: "Gemini 3 Pro Image — top-tier photorealism detail and accurate in-image text.",
    badge: "Pro",
    coverImage: "/model-covers/nanobanana-pro.webp",
    href: "/nanobanana-pro",
    recommendedPrompt: "Ultra-detailed 4K studio lighting with natural skin texture",
  },
  {
    id: "nanobanana-2",
    name: "NanoBanana 2",
    desc: "Google's next-gen multimodal vision model for instant professional creativity.",
    badge: "Fast",
    coverImage: "/model-covers/nanobanana-2.webp",
    href: "/nanobanana-2",
    recommendedPrompt: "Remove unwanted objects and enhance image quality",
  },
  {
    id: "seedream-5",
    name: "Seedream 5.0 Pro",
    desc: "Edit a photo with one sentence, or generate photorealistic art from scratch.",
    badge: "Ultra",
    coverImage: "/model-covers/seedream-5-pro.webp",
    href: "/seedream-5",
    recommendedPrompt: "Transform into an elegant photorealistic scene",
  },
  {
    id: "seedream-5-lite",
    name: "Seedream 5.0 Lite",
    desc: "The 4K tier — half the credits of Pro, twice the resolution.",
    badge: "4K",
    coverImage: "/model-covers/seedream-5.webp",
    href: "/seedream-5-lite",
    recommendedPrompt: "Upscale and sharpen fine details to 4K resolution",
  },
  {
    id: "grok-imagine",
    name: "Grok Imagine",
    desc: "Create high-resolution images from text with xAI's Aurora creative engine.",
    badge: "Creative",
    coverImage: "/model-covers/grok-imagine.webp",
    href: "/grok-imagine",
    recommendedPrompt: "Futuristic artistic composition with vivid neon accents",
  },
  {
    id: "seedpix-free",
    name: "SeedPix Free",
    desc: "Free text-to-image generation — zero credits, zero sign-up to try.",
    badge: "Free",
    coverImage: "/model-covers/sparkpix.webp",
    href: "/ai-photo-editor-free",
    recommendedPrompt: "Remove background and clean up image",
  },
];

export default function ModelShowcase() {
  const [activeModel, setActiveModel] = useState<string | null>(null);

  function handleSelect(model: ModelItem) {
    setActiveModel(model.id);

    const el = document.getElementById("editor-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    window.dispatchEvent(new CustomEvent("select-model", { detail: model.id }));
  }

  return (
    <section id="models" className="border-y border-white/5 bg-[#0C0C12] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE525]/10 border border-[#FFE525]/20 text-[#FFE525] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>State of the Art Models</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Create Stunning Images with the Latest AI Models
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Leading generators in one editor — click any card below to launch in the editor or explore its features.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MODELS_LIST.map((m) => (
            <div
              key={m.id}
              className={`group flex flex-col justify-between rounded-2xl border overflow-hidden transition-all duration-300 shadow-xl ${
                activeModel === m.id
                  ? "border-[#FFE525] bg-[#161622] shadow-[0_0_35px_rgba(255,229,37,0.3)] scale-[1.02]"
                  : "border-white/10 bg-[#13131A] hover:-translate-y-1 hover:border-[#FFE525]/60 hover:shadow-[0_0_25px_rgba(255,229,37,0.15)]"
              }`}
            >
              {/* 模型真实封面图 */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/50">
                <img
                  src={m.coverImage}
                  alt={`${m.name} preview`}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="rounded-md bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[10px] font-bold text-[#FFE525] uppercase tracking-wide">
                    {m.badge}
                  </span>
                </div>
              </div>

              {/* 描述与试用 */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFE525] transition-colors mb-1.5">
                    {m.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/60 line-clamp-2">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleSelect(m)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#FFE525] hover:text-white transition-colors cursor-pointer"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    <span>Try in Editor</span>
                  </button>
                  {m.href && (
                    <Link
                      href={m.href}
                      className="text-[11px] text-white/40 hover:text-white transition-colors"
                    >
                      Learn more →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
