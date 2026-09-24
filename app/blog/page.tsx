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
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-xs text-white/50">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/20">/</li>
            <li className="font-semibold text-[#FFE525]">Blog & Tutorials</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-12 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/10 px-3.5 py-1 text-xs font-semibold text-[#FFE525] mb-4">
            <BookOpen className="h-3.5 w-3.5 text-[#FFE525]" />
            E-E-A-T Verified AI Guides & Tutorials
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            AI Photo Editing & Generation Guides
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Deep-dive tutorials, prompt engineering formulas, and objective head-to-head benchmarks written by the SeedPix Vision Lab.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#13131A] p-7 transition-all duration-300 hover:border-[#FFE525]/50 hover:shadow-[0_0_25px_rgba(255,229,37,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-white/50">
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-semibold text-[#FFE525]">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/40">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold leading-snug text-white hover:text-[#FFE525] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/60 line-clamp-3">
                  {post.tldr}
                </p>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 flex items-center justify-between">
                <div className="text-xs text-white/40">
                  <span className="font-semibold text-white/80">{post.author.name}</span>
                  <span className="mx-1.5">•</span>
                  <span>{post.publishedAt}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#FFE525] hover:underline"
                >
                  Read Guide <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl border border-[#FFE525]/30 bg-[#16161F] p-8 text-center sm:p-10 shadow-[0_0_50px_-10px_rgba(255,229,37,0.15)]">
          <Sparkles className="mx-auto h-8 w-8 text-[#FFE525] mb-3" />
          <h3 className="text-2xl font-bold text-white">
            Ready to test these techniques yourself?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
            Experience our instant, watermark-free AI photo editor and generator. No sign-up required, no credit card needed.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/erase-and-replace-ai"
              className="sparkpix-btn rounded-xl px-5 py-2.5 text-xs font-bold text-black"
            >
              Try Erase & Replace AI
            </Link>
            <Link
              href="/ai-image-generator-unlimited"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              Launch AI Image Generator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
