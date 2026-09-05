import Link from "next/link";
import PhotoEditor from "@/components/PhotoEditor";
import HomeSeoContent from "@/components/HomeSeoContent";
import { tools } from "@/lib/tools";
import { landings } from "@/lib/landings";
import {
  Wand2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const featured = tools.slice(0, 8);

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SeedPix",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: "https://seedpix.org/",
    description:
      "Free AI photo editor. Edit photos by typing - remove objects, restore old photos, remove watermarks, upscale to 4K, and more.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  // 首页 FAQ（单一数据源：同时驱动可见 FAQ 渲染与 FAQPage JSON-LD）
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
      {/* 首页 SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      {/* 首页 FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center md:py-20">
          <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-neutral-900 md:text-5xl">
            AI Photo Editor —{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Photos Online Free
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-600 md:text-lg">
            Edit photos seamlessly just by typing — no Photoshop skills needed.
            Remove objects, restore old photos, remove watermarks, upscale to 4K,
            and give your images a fresh new look.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> No Watermark
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5 text-amber-500" /> 2s Generation
            </span>
            <span className="flex items-center gap-1">
              <Wand2 className="h-3.5 w-3.5 text-blue-600" /> Seamless Edit
            </span>
            <span>5 Free Credits to Start</span>
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
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-blue-600" />
          <h2 className="text-lg font-bold text-neutral-900">
            Start here — the most popular ways to create
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {landings.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              {l.title.split(" - ")[0]}
              <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Hot Features — the tools people reach for most
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Pick one to start editing. 100+ AI tools, all in one place.
            </p>
          </div>
          <Link
            href="/ai-photo-tools"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            More features <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Wand2 className="h-4.5 w-4.5 text-blue-600" />
              </div>
              <p className="text-sm font-medium leading-snug text-neutral-900 group-hover:text-blue-700">
                {tool.shortDescription}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-neutral-400">
                {tool.keywords[0]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold text-neutral-900">
            How to Edit a Photo — Three Steps, About One Minute
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "STEP 1",
                title: "Upload your photo",
                desc: "JPG, PNG, or WebP, up to 20 MB. Drag & drop, or click to browse.",
              },
              {
                step: "STEP 2",
                title: "Describe your edit",
                desc: "Type what you want changed, or pick an AI tool. It's as easy as texting a friend.",
              },
              {
                step: "STEP 3",
                title: "Download the result",
                desc: "Your edited photo is ready in seconds. No watermark, commercial use allowed.",
              },
            ].map((s) => (
              <div key={s.step} className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {s.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO 正文区 —— 补足首页内容到 1200+ 词 */}
      <HomeSeoContent faqs={homeFaqs} />
    </>
  );
}
