import Link from "next/link";
import type { Metadata } from "next";
import { tools, getCategories } from "@/lib/tools";
import { landings } from "@/lib/landings";
import { Wand2, ArrowRight, Layers } from "lucide-react";

// 站点基准 URL（与 app/layout.tsx 的 metadataBase 一致，用于 JSON-LD 的绝对 URL）
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  title: "Free AI Photo Tools Online - No Sign Up (All-in-One)",
  description:
    "Explore the complete suite of free AI photo tools online with no sign up: remove objects & text, erase watermarks, upscale to 4K, restore old pictures, and unblur instantly.",
  alternates: { canonical: "/ai-photo-tools" },
  openGraph: {
    title: "Free AI Photo Tools Online - No Sign Up (All-in-One) | SeedPix",
    description:
      "Explore the complete suite of free AI photo tools online with no sign up: remove objects & text, erase watermarks, upscale to 4K, restore old pictures, and unblur instantly.",
    type: "website",
    url: "/ai-photo-tools",
    siteName: "SeedPix",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Photo Tools Online - No Sign Up (All-in-One) | SeedPix",
    description:
      "Explore the complete suite of free AI photo tools online with no sign up: remove objects & text, erase watermarks, upscale to 4K, restore old pictures, and unblur instantly.",
    images: ["/og-image.png"],
  },
};

export default function ToolsPage() {
  const categories = getCategories();

  // 每个分类补一段说明文字（原本分类区块只有标题 + 卡片，正文量极低）
  const categoryBlurb: Record<string, string> = {
    remove:
      "Cut things out of a photo — objects, people, backgrounds, text, watermarks and AI filters — and rebuild what was behind them from the surrounding scene, rather than leaving a blurred patch.",
    enhance:
      "Repair and sharpen. Restore damaged or faded prints, recover detail in blurry shots, and upscale small images to 4K without the soft, averaged look that plain resizing produces.",
    edit:
      "Change what a photo shows or says — rewrite text on a sign, swap a background, or turn an AI-generated image into something that reads as photographed.",
    watermark:
      "Remove watermarks and logos laid over an image. The covered pixels are regenerated from the surrounding image instead of being smudged away.",
    generate:
      "Create new images from a text description: photorealistic scenes, product mockups and portraits, with several leading models available behind one input so you can compare results.",
  };

  // 这一页的 FAQ（可见区块与 FAQPage JSON-LD 共用同一份数据）
  const toolsFaqs = [
    {
      question: "Are all the SeedPix tools free?",
      answer:
        "Every tool costs a flat 10 credits per edit, and the free credits you get at signup cover your first edit in full. New accounts get 10 free credits on signup plus 1 free credit every day. Credit packs start at $9.99 for 350 credits, and there is no subscription at any point.",
    },
    {
      question: "Do I need to install anything to use these tools?",
      answer:
        "No. Everything runs in the browser on desktop, tablet or phone. You upload a photo, the edit is processed on our servers, and you download the result — there is no plugin, extension or desktop application.",
    },
    {
      question: "Which tool should I use if I am not sure what I need?",
      answer:
        "Start with the editor on the homepage. Describe the change in plain English — remove the cup on the table, make the sky brighter — and SeedPix picks the right model for that edit. The dedicated tools here are better when you already know exactly what should change and want a repeatable result.",
    },
    {
      question: "Do the tools keep my photo's original composition?",
      answer:
        "Yes. The models are instructed to preserve the subject, pose, framing and crop, and to re-render only the pixels the edit touches. You should not need to re-crop or re-frame anything afterwards.",
    },
    {
      question: "Can I use the results commercially?",
      answer:
        "Yes. Images you edit or generate with SeedPix are licensed for commercial use — in products, listings, ads and client work. Nothing you download carries a watermark.",
    },
    {
      question: "What file formats and sizes are supported?",
      answer:
        "JPG, PNG and WebP up to 20MB. PNG is the better choice when you need transparency, and downloads keep your original aspect ratio. For the best results, upload the highest-resolution original you have.",
    },
  ];

  // BreadcrumbList JSON-LD：Home > AI Photo Tools
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "AI Photo Tools", item: `${SITE}/ai-photo-tools` },
    ],
  };

  // FAQPage JSON-LD（与页面下方可见 FAQ 完全一致）
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: toolsFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 可见面包屑（与上面的 BreadcrumbList JSON-LD 一致） */}
      <nav aria-label="Breadcrumb" className="mb-2">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
          <li>
            <Link href="/" className="hover:text-neutral-900">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-neutral-300">
            /
          </li>
          <li aria-current="page" className="font-medium text-neutral-700">
            AI Photo Tools
          </li>
        </ol>
      </nav>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          Free AI Photo Tools Online — No Sign Up
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          Everything you can do to any photo: restore, enhance, clean up,
          restyle, and generate. All tools in one place, 100% free to start with zero watermarks.
        </p>
      </div>

      {/* Intro：给这一页补足正文（原本只有一句，是站内最薄的一页） */}
      <div className="mx-auto mb-12 max-w-3xl space-y-3 text-sm leading-relaxed text-neutral-600">
        <p>
          The list below is the full SeedPix tool set, grouped by what you are
          trying to do rather than by how the model works. Every tool runs in
          the browser, needs nothing installed, and keeps the subject, pose,
          framing and crop of your original photo while it re-renders the
          detail — so a result never looks like a different photograph.
        </p>
        <p>
          If you are not sure which tool you need, start with the editor on the
          homepage instead: describe the change in plain English and SeedPix
          routes it to whichever model handles that edit best. The dedicated
          tools below are for the opposite case — when you already know exactly
          what should change and want a repeatable, one-click result with its
          own prompt template.
        </p>
        <p>
          Every tool costs a flat 10 credits per image. New accounts start with
          10 free credits plus 1 free credit every day, and credit packs begin at
          $9.99 with no subscription. Outputs carry no watermark and are
          licensed for commercial use.
        </p>
      </div>

      {/* Keyword landing entrances */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-600" />
          <h2 className="text-lg font-bold text-neutral-900">
            Popular ways to create
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {landings.map((l) => (
            <Link
              key={l.slug}
              href={`/${l.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold leading-snug text-neutral-900 group-hover:text-blue-700">
                  {l.title.split(" - ")[0]}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
                  {l.keywords[0]}
                </p>
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
                Explore <ArrowRight className="h-3 w-3" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="mb-2 text-xl font-bold capitalize text-neutral-900">
            {cat} Tools
          </h2>
          {categoryBlurb[cat] && (
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-neutral-600">
              {categoryBlurb[cat]}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tools
              .filter((t) => t.category === cat)
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Wand2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-neutral-900 group-hover:text-blue-700">
                    {tool.title.split(" - ")[0]}
                  </p>
                  <p className="mt-1 line-clamp-2 flex-1 text-xs text-neutral-500">
                    {tool.shortDescription}
                  </p>
                  <p className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
                    Use tool <ArrowRight className="h-3 w-3" />
                  </p>
                </Link>
              ))}
          </div>
        </section>
      ))}

      {/* FAQ（可见区块，与上面的 FAQPage JSON-LD 同源） */}
      <section className="mt-4 border-t border-neutral-100 pt-10">
        <h2 className="text-xl font-bold text-neutral-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-3">
          {toolsFaqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-neutral-200 bg-white"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-neutral-900">
                {faq.question}
                <span className="ml-2 text-neutral-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="border-t border-neutral-100 px-5 py-4 text-sm leading-relaxed text-neutral-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
