import Link from "next/link";
import type { Metadata } from "next";
import { tools, getCategories } from "@/lib/tools";
import { landings } from "@/lib/landings";
import { Wand2, ArrowRight, Layers } from "lucide-react";

// 站点基准 URL（与 app/layout.tsx 的 metadataBase 一致，用于 JSON-LD 的绝对 URL）
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  title: "100+ AI Photo Tools",
  // 注意：不要用撇号（SeedPix's）—— Next.js 会把 ' 转义成 &#x27; 出现在 HTML 里。
  // 长度控制在 160 字符以内，避免 SERP 截断。
  description:
    "Explore the full SeedPix collection of AI photo tools: remove objects and backgrounds, restore old photos, upscale to 4K, remove watermarks, edit text, and more.",
  alternates: { canonical: "/ai-photo-tools" },
  openGraph: {
    title: "100+ AI Photo Tools | SeedPix",
    description:
      "Explore the full SeedPix collection of AI photo tools: remove objects and backgrounds, restore old photos, upscale to 4K, remove watermarks, edit text, and more.",
    type: "website",
    url: "/ai-photo-tools",
    siteName: "SeedPix",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "100+ AI Photo Tools | SeedPix",
    description:
      "Explore the full SeedPix collection of AI photo tools: remove objects and backgrounds, restore old photos, upscale to 4K, remove watermarks, edit text, and more.",
    images: ["/og-image.png"],
  },
};

export default function ToolsPage() {
  const categories = getCategories();

  // BreadcrumbList JSON-LD：Home > AI Photo Tools
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "AI Photo Tools", item: `${SITE}/ai-photo-tools` },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
          100+ AI Photo Tools
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          Everything you can do to any photo — restore, enhance, clean up,
          restyle, and generate. All tools in one place, all free to start.
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
          <h2 className="mb-4 text-xl font-bold capitalize text-neutral-900">
            {cat} Tools
          </h2>
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
    </div>
  );
}
