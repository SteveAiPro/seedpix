"use client";

import { useState } from "react";
import { Copy, Check, Sparkles, ArrowRight, Wand2 } from "lucide-react";

const VIRAL_PROMPTS = [
  {
    id: "couple-portrait",
    title: "Anup Sagar Aesthetic Couple Portrait",
    badge: "🔥 Trending #1 (+250%)",
    category: "Couple / Portrait",
    image: "/demos/after-relight-scene.webp",
    prompt:
      "Create a cinematic, photorealistic portrait of an aesthetic young couple standing together outdoors during sunset, golden hour soft rim lighting, shallow depth of field, 8k resolution, authentic photorealistic skin textures, Fujifilm cinematic color grading.",
  },
  {
    id: "retro-film",
    title: "Vintage 90s 35mm Disposable Film",
    badge: "✨ Viral Classic",
    category: "Retro / Aesthetic",
    image: "/demos/after-reframe-photo.webp",
    prompt:
      "Transform photo into a nostalgic 1990s 35mm disposable camera photograph, slight natural film grain, warm muted vintage tones, subtle flash reflection, candid street photography aesthetic.",
  },
  {
    id: "3d-avatar",
    title: "3D Stylized Pixar Animation Character",
    badge: "⚡ Viral Social Avatar",
    category: "3D / Avatar",
    image: "/demos/after-photo-to-ghibli.webp",
    prompt:
      "Cute 3D stylized character portrait in Pixar Disney animation style, smooth clay render, big expressive eyes, soft studio illumination, vibrant pastel background, ultra detailed.",
  },
  {
    id: "cyberpunk-neon",
    title: "Cyberpunk Neon Night City Re-lighting",
    badge: "🚀 High Visual Impact",
    category: "Sci-Fi / Moody",
    image: "/demos/after-turn-into-painting.webp",
    prompt:
      "Re-light portrait with cinematic cyberpunk night city lighting, vibrant blue and magenta neon reflections on skin and clothing, wet asphalt background with aesthetic bokeh blur.",
  },
  {
    id: "studio-headshot",
    title: "Luxury Editorial Magazine Headshot",
    badge: "💎 Professional",
    category: "Commercial / Clean",
    image: "/demos/after-linkedin-headshot.webp",
    prompt:
      "Professional clean studio headshot portrait, crisp neutral studio backdrop, Rembrandt softbox lighting, sharp focused eyes, high-end commercial editorial magazine look.",
  },
  {
    id: "photo-restoration",
    title: "Vintage Photo Restoration & Colorize",
    badge: "🪄 Restoration",
    category: "Restoration",
    image: "/demos/photo-restoration.webp",
    prompt:
      "Restore and colorize old damaged photograph, remove scratches and dust, reconstruct realistic skin tone, enhance sharp facial details, authentic period-accurate colors.",
  },
];

export default function RspPromptsGallery() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleUse(text: string) {
    // Scroll smoothly to editor and fill prompt if possible
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = text;
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      textarea.focus();
    } else {
      window.location.href = `/?prompt=${encodeURIComponent(text)}`;
    }
  }

  return (
    <div className="my-10">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/10 px-3 py-1 text-xs font-semibold text-[#FFE525]">
            <Sparkles className="h-3 w-3 text-[#FFE525]" /> Viral RSP Editing Prompts Library
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Trending TikTok & Instagram AI Prompts (With Visual Previews)
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Click to copy any viral prompt, or apply it directly to your photo in SeedPix with one click.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {VIRAL_PROMPTS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#13131A] shadow-lg transition duration-200 hover:-translate-y-1 hover:border-[#FFE525]/50 hover:shadow-[0_0_30px_-5px_rgba(255,229,37,0.15)]"
          >
            {/* 效果展示封面图 */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0F]">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13131A] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="rounded-md bg-black/70 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white border border-white/10">
                  {item.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="rounded-md bg-[#FFE525] px-2.5 py-0.5 text-[11px] font-bold text-black shadow-xs">
                  {item.badge}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-xs font-medium text-[#FFE525] line-clamp-1 drop-shadow-xs">
                  ✨ SeedPix Generated Preview
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-4.5">
              <h3 className="text-base font-bold text-white transition group-hover:text-[#FFE525]">
                {item.title}
              </h3>
              <div className="mt-3 rounded-lg bg-[#0F0F1A] p-3 font-mono text-xs leading-relaxed text-white/80 select-all border border-white/5">
                {item.prompt}
              </div>

              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => handleCopy(item.id, item.prompt)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#42FF41]" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-white/40" /> Copy Prompt
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleUse(item.prompt)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#FFE525] to-[#42FF41] px-3 py-2 text-xs font-bold text-black shadow-xs transition hover:opacity-90"
                >
                  <Wand2 className="h-3.5 w-3.5" /> Try in Editor
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
