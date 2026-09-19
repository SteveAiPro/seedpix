import Link from "next/link";
import PhotoEditor from "@/components/PhotoEditor";
import HomeSeoContent from "@/components/HomeSeoContent";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
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

  const homeFaqs = [
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
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/30 to-white">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-blue-400/15 to-purple-400/15 blur-3xl" />

        <div className="mx-auto max-w-6xl px-4 pt-12 pb-6 text-center md:pt-16">
          {/* 趋势胶囊徽章 */}
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 text-xs font-medium text-blue-800 shadow-xs backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>{dict.hero.trendBadge}</span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {dict.hero.titleMain}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {dict.hero.titleGradient}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
            {dict.hero.subtitle}
          </p>

          {/* 信任承诺背书 */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2.5 text-xs font-medium text-neutral-600">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-emerald-700 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> {dict.hero.badges.free}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-blue-700 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" /> {dict.hero.badges.noSignUp}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50/70 px-3 py-1 text-purple-700 shadow-2xs">
              <Zap className="h-3.5 w-3.5 text-purple-600" /> {dict.hero.badges.noWatermark}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 text-amber-700 shadow-2xs">
              <Wand2 className="h-3.5 w-3.5 text-amber-600" /> {dict.hero.badges.hd4k}
            </span>
            <span className="hidden sm:inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-neutral-500 shadow-2xs">
              {dict.hero.badges.credits}
            </span>
          </div>

          {/* 热门长尾功能快速直达条 */}
          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-xs">
            <span className="font-semibold text-neutral-400 uppercase tracking-wider text-[10px]">
              {dict.hero.popularLabel}
            </span>
            {dict.hero.popularTags.map((tag) => (
              <Link
                key={tag.href}
                href={tag.href}
                className="rounded-lg border border-neutral-200/80 bg-white/80 px-2.5 py-1 text-neutral-600 transition hover:border-blue-400 hover:bg-blue-50/60 hover:text-blue-700 shadow-2xs"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="mx-auto max-w-6xl px-4 pb-16">
          <PhotoEditor />
        </div>
      </section>

      {/* Models strip */}
      <section className="border-y border-neutral-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-neutral-400">
            Leading generators in one editor — switch with the model picker above
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-neutral-500">
            <span className="font-medium text-neutral-800">GPT Image 2</span>
            <span>NanoBanana 2</span>
            <span>NanoBanana Pro</span>
            <span>Seedream 5.0</span>
            <span>Flux</span>
            <span className="text-neutral-300">|</span>
            <span>Powered by leading AI models</span>
          </div>
        </div>
      </section>

      {/* Keyword landing entrances */}
      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h2 className="text-xl font-bold text-neutral-900">
              {dict.trendingSection.title}
            </h2>
          </div>
          <span className="text-xs text-neutral-400">{dict.trendingSection.badge}</span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {landings.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200/90 bg-white p-4.5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-900 transition group-hover:text-blue-600">
                  {l.title.split(" - ")[0]}
                </h3>
                <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
              </div>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500">
                {l.description}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-blue-600">
                <span>{dict.trendingSection.tryWorkflow}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {dict.featuresSection.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {dict.featuresSection.subtitle}
            </p>
          </div>
          <Link
            href="/ai-photo-tools"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
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
                className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-blue-300 hover:shadow-sm"
              >
                {cover ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                    <img
                      src={cover}
                      alt={`${tool.shortDescription} example`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 p-4">
                    <Wand2 className="h-4.5 w-4.5 text-blue-600" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-3">
                  <p className="text-sm font-semibold leading-snug text-neutral-900 group-hover:text-blue-700">
                    {tool.title.split(" - ")[0]}
                  </p>
                  <p className="mt-1 line-clamp-2 flex-1 text-xs text-neutral-500">
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
        <section className="border-t border-neutral-100 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-neutral-900">
                {dict.sliderSection.title}
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-500">
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
                      className="text-xs font-semibold text-neutral-800 hover:text-blue-600"
                    >
                      {tool.title.split(" - ")[0]}
                    </Link>
                    <Link
                      href={`/${tool.slug}`}
                      className="text-[11px] font-medium text-blue-600 hover:underline"
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
