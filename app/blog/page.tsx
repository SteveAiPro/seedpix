import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { Sparkles, Clock, ArrowRight, BookOpen } from "lucide-react";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  title: "AI Photo Editing & Generation Guides & Benchmarks — SeedPix Blog",
  description:
    "Expert tutorials, objective tool benchmarks, prompt formulas, and comprehensive guides on erase and replace AI, inpainting, and free AI image generators with no sign-up.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "AI Photo Editing & Generation Guides — SeedPix Blog",
    description:
      "Expert tutorials, objective tool benchmarks, prompt formulas, and comprehensive guides on erase and replace AI, inpainting, and free AI image generators with no sign-up.",
    type: "website",
    url: "/blog",
    siteName: "SeedPix",
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Photo Editing & Generation Guides — SeedPix Blog",
    description:
      "Expert tutorials, objective tool benchmarks, prompt formulas, and comprehensive guides on erase and replace AI, inpainting, and free AI image generators with no sign-up.",
    images: ["/og-image.png"],
  },
};

export default function BlogIndexPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-neutral-500">
            <li>
              <Link href="/" className="hover:text-neutral-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-neutral-800">Blog & Tutorials</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 border-b border-neutral-200 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 mb-4">
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            E-E-A-T Verified AI Guides & Tutorials
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            AI Photo Editing & Generation Guides
          </h1>
          <p className="mt-3 max-w-2xl text-base text-neutral-600">
            Deep-dive tutorials, prompt engineering formulas, and objective head-to-head benchmarks written by the SeedPix Vision Lab.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 transition-all hover:border-neutral-300 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="rounded-md bg-neutral-200/70 px-2 py-0.5 font-medium text-neutral-700">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold leading-snug text-neutral-900 hover:text-blue-600">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-3">
                  {post.tldr}
                </p>
              </div>

              <div className="mt-6 border-t border-neutral-200 pt-4 flex items-center justify-between">
                <div className="text-xs text-neutral-500">
                  <span className="font-medium text-neutral-700">{post.author.name}</span>
                  <span className="mx-1.5">•</span>
                  <span>{post.publishedAt}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read Guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl border border-blue-100 bg-blue-50/50 p-8 text-center sm:p-10">
          <Sparkles className="mx-auto h-8 w-8 text-blue-600 mb-3" />
          <h3 className="text-xl font-bold text-neutral-900">
            Ready to test these techniques yourself?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-600">
            Experience our instant, watermark-free AI photo editor and generator. No sign-up required, no credit card needed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/erase-and-replace-ai"
              className="rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-neutral-800"
            >
              Try Erase & Replace AI
            </Link>
            <Link
              href="/ai-image-generator-unlimited"
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Launch AI Image Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
