import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getPostBySlug } from "@/lib/blogPosts";
import {
  Clock,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | SeedPix`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: "SeedPix",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // FAQPage Schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // BlogPosting Schema
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE}/blog/${post.slug}`,
    },
    author: {
      "@type": "Organization",
      name: post.author.name,
      url: `${SITE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "SeedPix",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/logo.png`,
      },
    },
    image: `${SITE}/og-image.png`,
  };

  // BreadcrumbList Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center space-x-2 text-xs text-white/50">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li className="text-white/20">/</li>
            <li>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li className="text-white/20">/</li>
            <li className="font-semibold text-[#FFE525] line-clamp-1 max-w-xs sm:max-w-md">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-10 border-b border-white/5 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/60 mb-4">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-[#FFE525] font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-white/50">
              <Calendar className="h-3.5 w-3.5" />
              Updated {post.updatedAt}
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-white/70 leading-relaxed">
            {post.description}
          </p>

          {/* Author & E-E-A-T Signal Box */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#13131A] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFE525]/15 text-[#FFE525] font-black text-sm">
                SP
              </div>
              <div>
                <p className="text-xs font-bold text-white">{post.author.name}</p>
                <p className="text-[11px] text-white/50">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#42FF41]" /> Fact-Checked & Peer Reviewed
              </span>
              <span className="hidden sm:inline text-white/20">|</span>
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-[#FFE525]" /> 2026 Live Tested
              </span>
            </div>
          </div>
        </header>

        {/* 1. TL;DR / Executive Summary Box */}
        <section className="mb-12 rounded-3xl border border-[#FFE525]/30 bg-[#16161F] p-6 sm:p-7 shadow-[0_0_35px_-5px_rgba(255,229,37,0.15)]">
          <div className="flex items-center gap-2 text-sm font-bold text-[#FFE525] mb-2">
            <Sparkles className="h-4 w-4 text-[#FFE525]" />
            Executive Summary / TL;DR
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-white/90 font-normal">
            {post.tldr}
          </p>
        </section>

        {/* Article Body Sections */}
        <div className="space-y-12 text-white/80">
          {post.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-16">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-4">
                {sec.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/70">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tips Callouts */}
              {sec.tips && sec.tips.length > 0 && (
                <div className="mt-6 space-y-2.5 rounded-2xl border border-white/10 bg-[#13131A] p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#42FF41] flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#42FF41]" />
                    Pro Execution Steps
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                    {sec.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#FFE525] mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code / Prompt Formula Boxes */}
              {sec.codeOrPrompts && sec.codeOrPrompts.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Tested Prompt Formulas (Copy & Run)
                  </p>
                  <div className="space-y-3">
                    {sec.codeOrPrompts.map((cp, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/10 bg-[#0F0F1A] p-4 text-white font-mono text-xs"
                      >
                        <p className="text-[#FFE525] mb-1.5 text-xs font-sans font-bold">
                          {cp.title}
                        </p>
                        <p className="text-[#42FF41] select-all leading-relaxed">
                          &quot;{cp.prompt}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* 2. Objective Comparison Table */}
        {post.comparisonTable && (
          <section className="mt-16 scroll-mt-16">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#FFE525]" />
              {post.comparisonTable.title}
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#13131A]">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#16161F] text-white font-semibold border-b border-white/10">
                  <tr>
                    {post.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 sm:px-6 sm:py-3.5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/70">
                  {post.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? "bg-white/[0.01]" : ""}>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium text-white">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 font-bold text-[#FFE525] bg-[#FFE525]/5">
                        {row.seedpix}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-white/60">
                        {row.competitor1}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-white/60">
                        {row.competitor2}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-white/60">
                        {row.competitor3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 3. Internal Linking Mesh: Recommended Tools Grid */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-[#13131A] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-bold text-white">
                Direct Tools & Workflows Mentioned in This Guide
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Launch any tool immediately with free credits — zero account required.
              </p>
            </div>
          </div>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {post.relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#16161F] p-4.5 transition-all hover:border-[#FFE525]/50 hover:shadow-[0_0_20px_rgba(255,229,37,0.1)]"
              >
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#FFE525] flex items-center justify-between">
                    {tool.name}
                    <ArrowRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-[#FFE525]" />
                  </h4>
                  <p className="mt-1 text-xs text-white/60 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Frequently Asked Questions */}
        <section className="mt-16 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#FFE525]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {post.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#13131A] p-5"
              >
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-[#FFE525]/30 bg-[#16161F] p-8 text-center text-white sm:p-10 shadow-[0_0_50px_-10px_rgba(255,229,37,0.18)]">
          <h3 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            Try SeedPix Free Without Registration
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-white/70">
            Generate and edit photos online with state-of-the-art AI. Download clean, full-resolution results with zero watermarks.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="sparkpix-btn rounded-xl px-6 py-2.5 text-xs font-bold text-black"
            >
              Open Online Photo Editor
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              View Free Credits & Pricing
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
