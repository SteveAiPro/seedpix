import Link from "next/link";
import PhotoEditor from "@/components/PhotoEditor";
import HomeSeoContent from "@/components/HomeSeoContent";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ModelShowcase from "@/components/ModelShowcase";
import { tools, getToolCover, getToolBeforeAfter } from "@/lib/tools";
import { landings } from "@/lib/landings";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import {
  Wand2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

interface LocalizedHomeProps {
  locale?: Locale;
}

export default function LocalizedHome({ locale = "en" }: LocalizedHomeProps) {
  const dict = getDictionary(locale);
  const featured = tools.slice(0, 8);

  const demoSlugs = [
    "remove-object-from-photo",
    "background-remover",
    "gemini-watermark-remover",
    "photo-restoration",
    "remove-person-from-photo",
    "ai-photo-enhancer",
    "filter-remover",
    "ai-photo-to-real",
  ];
  const demoPairs = demoSlugs
    .map((s) => {
      const t = tools.find((x) => x.slug === s);
      const pair = t ? getToolBeforeAfter(t) : undefined;
      return t && pair ? { tool: t, ...pair } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SeedPix",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: locale === "en" ? "https://seedpix.org/" : `https://seedpix.org/${locale}`,
    description: dict.seo.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const homeFaqs = dict.faqs || [
    {
      q: "Do I need to sign up to use the SeedPix AI photo editor?",
      a: "No. You can open the editor and try several edits without creating an account. Signing up simply unlocks your free daily credits and lets you save your work.",
    },
    {
      q: "What file formats does the AI photo editor accept?",
      a: "SeedPix accepts JPG, PNG, and WebP files up to 20 MB. PNG is best when you need a transparent background.",
    },
    {
      q: "Will my edited photo have a watermark?",
      a: "No. Every image you download from SeedPix is free of watermarks and can be used commercially, so you can use the results in products, listings, and marketing.",
    },
    {
      q: "Can I remove an object from a photo without Photoshop?",
      a: "Yes - that is one of the most popular SeedPix tools. Upload the photo, click Remove objects, and the AI erases the unwanted element and fills the gap with realistic background.",
    },
    {
      q: "How is SeedPix different from other AI photo editors?",
      a: "SeedPix combines a free-form text editor with over one hundred dedicated one-click tools in a single place, so you can remove objects, remove backgrounds, restore old photos, upscale to 4K, and remove AI filters without switching apps or paying multiple subscriptions.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0F]">
        <div className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#FFE525]/15 via-[#42FF41]/8 to-transparent blur-3xl" />

        <div className="mx-auto max-w-5xl px-4 pt-4 pb-3 sm:pt-6 sm:pb-4 text-center">
          {/* 趋势胶囊徽章 */}
          <div className="mx-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/10 px-3 py-0.5 text-[11px] font-semibold text-[#FFE525] shadow-[0_0_12px_rgba(255,229,37,0.15)]">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#FFE525] animate-pulse" />
            <span>{dict.hero.trendBadge}</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl leading-tight">
            <span>{dict.hero.titleMain}</span>{" "}
            <span className="bg-gradient-to-r from-[#FFE525] to-[#42FF41] bg-clip-text text-transparent">
              {dict.hero.titleGradient}
            </span>
          </h1>
          <p className="mx-auto mt-1 max-w-xl text-xs sm:text-sm text-white/70 leading-snug">
            {dict.hero.subtitle}
          </p>

          {/* 信任承诺背书与热门标签精简整合 */}
          <div className="mx-auto mt-2.5 flex max-w-2xl flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium text-white/80">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/80">
              <Zap className="h-3 w-3 text-[#FFE525]" /> {dict.hero.badges.free}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/80">
              <Sparkles className="h-3 w-3 text-[#42FF41]" /> {dict.hero.badges.noSignUp}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/80">
              <ShieldCheck className="h-3 w-3 text-[#FFE525]" /> {dict.hero.badges.noWatermark}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/80">
              <Wand2 className="h-3 w-3 text-[#42FF41]" /> {dict.hero.badges.hd4k}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/70">
              ✦ {dict.hero.badges.credits}
            </span>
            {dict.hero.popularTags.slice(0, 3).map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="hidden md:inline-flex rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-white/60 transition hover:border-[#FFE525]/50 hover:text-[#FFE525]"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="mx-auto max-w-4xl px-4 pb-8 sm:pb-12">
          <PhotoEditor />
        </div>
      </section>

      {/* Create Stunning Images with the Latest AI Models */}
      <ModelShowcase />

      {/* Keyword landing entrances */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE525]/15 text-[#FFE525]">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {dict.trendingSection.title}
            </h2>
          </div>
          <span className="text-xs text-white/40">{dict.trendingSection.badge}</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landings.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#13131A] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#FFE525]/50 hover:shadow-[0_0_25px_rgba(255,229,37,0.1)]"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white transition group-hover:text-[#FFE525]">
                  {l.title.split(" - ")[0]}
                </h3>
                <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#FFE525]" />
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/60">
                {l.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#FFE525]">
                <span>{dict.trendingSection.tryWorkflow}</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {dict.featuresSection.title}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              {dict.featuresSection.subtitle}
            </p>
          </div>
          <Link
            href="/ai-photo-tools"
            className="flex items-center gap-1 text-sm font-semibold text-[#FFE525] hover:underline"
          >
            {dict.featuresSection.moreFeatures} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((tool) => {
            const cover = getToolCover(tool);
            return (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#13131A] transition hover:border-[#FFE525]/50 hover:shadow-[0_0_25px_rgba(255,229,37,0.1)]"
              >
                {cover ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0F]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <img
                      src={cover}
                      alt={`${tool.shortDescription} example`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE525]/10 p-4">
                    <Wand2 className="h-4.5 w-4.5 text-[#FFE525]" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-sm font-bold leading-snug text-white group-hover:text-[#FFE525]">
                    {tool.title.split(" - ")[0]}
                  </p>
                  <p className="mt-1 line-clamp-2 flex-1 text-xs text-white/60">
                    {tool.shortDescription}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 真实效果演示：拖拽查看 before / after */}
      {demoPairs.length > 0 && (
        <section className="border-t border-white/5 bg-[#0C0C12]">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {dict.sliderSection.title}
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
                {dict.sliderSection.subtitle}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {demoPairs.map(({ tool, before, after }) => (
                <div key={tool.slug}>
                  <BeforeAfterSlider
                    beforeImage={before}
                    afterImage={after}
                    title={tool.title.split(" - ")[0]}
                    description={tool.shortDescription}
                    beforeLabel="Before"
                    afterLabel="After"
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href={`/${tool.slug}`}
                      className="text-xs font-semibold text-white/80 hover:text-[#FFE525]"
                    >
                      {tool.title.split(" - ")[0]}
                    </Link>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-[11px] font-bold text-[#FFE525] hover:underline"
                    >
                      Try it free →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <HomeSeoContent faqs={homeFaqs} />
    </>
  );
}
