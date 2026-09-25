"use client";

import { useState } from "react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ShowcaseItem {
  id: string;
  title: string;
  tag: string;
  before: string;
  after: string;
  prompt: string;
  toolUrl: string;
}

// 采用全部本地已搬运的实测 Demo 原图
const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "linkedin",
    title: "Professional LinkedIn Headshot",
    tag: "Headshots",
    before: "/showcase/before-linkedin-headshot.webp",
    after: "/showcase/after-linkedin-headshot.webp",
    prompt: "Transform casual photo into a studio corporate headshot, dark blazer, soft background",
    toolUrl: "/ai-linkedin-headshot-generator",
  },
  {
    id: "photobomber",
    title: "Remove Photobombers & People",
    tag: "Clean Up",
    before: "/showcase/before-remove-photobombers.webp",
    after: "/showcase/after-remove-photobombers.webp",
    prompt: "Remove tourists and photobombers in background, seamless natural scenery",
    toolUrl: "/remove-person-from-photo",
  },
  {
    id: "dating-male",
    title: "Dating Profile Enhancer",
    tag: "Portrait",
    before: "/showcase/before-profile-dating-male.webp",
    after: "/showcase/after-profile-dating-male.webp",
    prompt: "Warm golden-hour natural lighting, confident smile, aesthetic depth of field",
    toolUrl: "/dating-profile-photo",
  },
  {
    id: "dating-female",
    title: "Aesthetic Portrait & Retouch",
    tag: "Portrait",
    before: "/showcase/before-profile-dating-female.webp",
    after: "/showcase/after-profile-dating-female.webp",
    prompt: "Enhance facial details, cinematic glow, stylish outdoor photography vibes",
    toolUrl: "/ai-headshot-generator",
  },
  {
    id: "passport",
    title: "Official Passport & ID Photo",
    tag: "Compliance",
    before: "/showcase/before-passport-photo.webp",
    after: "/showcase/after-passport-photo.webp",
    prompt: "Pure white background, compliant lighting, neutral facial expression, 2x2 standard",
    toolUrl: "/passport-photo-maker",
  },
  {
    id: "watermark",
    title: "Remove Watermark & Logos",
    tag: "Object Remover",
    before: "/showcase/before-remove-watermark.webp",
    after: "/showcase/after-remove-watermark.webp",
    prompt: "Erase watermark and reconstruct fine texture underneath seamlessly",
    toolUrl: "/remove-text-from-photo",
  },
  {
    id: "save-blink",
    title: "Fix Blink & Open Closed Eyes",
    tag: "Face Retouch",
    before: "/showcase/before-save-blink-photo.webp",
    after: "/showcase/after-save-blink-photo.webp",
    prompt: "Open closed eyes naturally, match iris color and gaze direction",
    toolUrl: "/open-closed-eyes-ai",
  },
  {
    id: "try-new-look",
    title: "Virtual Outfit & Style Changer",
    tag: "Fashion AI",
    before: "/showcase/before-try-new-look.webp",
    after: "/showcase/after-try-new-look.webp",
    prompt: "Change casual clothes to a tailored luxury evening jacket and modern hairstyle",
    toolUrl: "/change-outfit-ai",
  },
  {
    id: "remove-ex",
    title: "Remove Ex From Photo",
    tag: "Clean Up",
    before: "/showcase/before-remove-ex-from-photo.webp",
    after: "/showcase/after-remove-ex-from-photo.webp",
    prompt: "Erase person standing on the right, reconstruct natural background scenery",
    toolUrl: "/remove-person-from-photo",
  },
  {
    id: "relight",
    title: "Studio Relighting & Golden Hour",
    tag: "Portrait",
    before: "/showcase/before-relight-scene.webp",
    after: "/showcase/after-relight-scene.webp",
    prompt: "Add warm cinematic golden hour sunlight streaming from side",
    toolUrl: "/photo-enhancer",
  },
  {
    id: "swap-background",
    title: "Seamless Background Swap",
    tag: "Clean Up",
    before: "/showcase/before-swap-background.webp",
    after: "/showcase/after-swap-background.webp",
    prompt: "Replace messy room with minimalist modern loft with large sunny windows",
    toolUrl: "/change-background-ai",
  },
  {
    id: "old-photo-restore",
    title: "Damaged Photo Restoration",
    tag: "Restoration",
    before: "/showcases/scrathed-photo.webp",
    after: "/showcases/photo-restoration.webp",
    prompt: "Remove scratches, tears, paper cracks and restore crystal clarity",
    toolUrl: "/photo-restoration",
  }
];

export default function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems =
    activeTab === "all"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.tag.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 标题 */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE525]/10 border border-[#FFE525]/20 text-[#FFE525] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real Photo Editing Examples</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Real Photo Editing Examples (100% Interactive)
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/60">
          Drag the interactive slider to compare real unedited photos with AI-processed results.
        </p>

        {/* 标签过滤 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {["all", "Headshots", "Clean Up", "Portrait", "Compliance", "Face Retouch", "Restoration"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#FFE525] to-[#42FF41] text-black shadow-md font-bold"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab === "all" ? "All Examples" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Showcase 网格展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-[#12121A] border border-white/10 overflow-hidden flex flex-col hover:border-[#FFE525]/40 transition-all duration-300 shadow-xl"
          >
            {/* 顶栏信息 */}
            <div className="p-3.5 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
              <span className="text-xs font-bold text-white truncate max-w-[170px]">
                {item.title}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-[#FFE525]">
                {item.tag}
              </span>
            </div>

            {/* 对比滑块主体 */}
            <div className="relative aspect-[4/5] w-full bg-black/40 overflow-hidden">
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                beforeAlt={`${item.title} Before`}
                afterAlt={`${item.title} After`}
              />
            </div>

            {/* 底部 prompt 与前往试用 */}
            <div className="p-3.5 flex-1 flex flex-col justify-between bg-[#12121A]">
              <p className="text-[11px] text-white/50 line-clamp-2 italic mb-3">
                &ldquo;{item.prompt}&rdquo;
              </p>
              <Link
                href={item.toolUrl}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#FFE525]/20 hover:text-[#FFE525] text-xs font-semibold text-white/80 transition-colors"
              >
                <span>Try this tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
