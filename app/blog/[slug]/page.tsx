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
    <div className="min-h-screen bg-white text-neutral-900">
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
          <ol className="flex flex-wrap items-center space-x-2 text-xs text-neutral-500">
            <li>
              <Link href="/" className="hover:text-neutral-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-neutral-900">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-neutral-800 line-clamp-1 max-w-xs sm:max-w-md">
              {post.title}
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-10 border-b border-neutral-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-neutral-500 mb-4">
            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 border border-blue-100">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              Updated {post.updatedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            {post.description}
          </p>

          {/* Author & E-E-A-T Signal Box */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold text-sm">
                SP
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">{post.author.name}</p>
                <p className="text-[11px] text-neutral-500">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-600">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-600" /> Fact-Checked & Peer Reviewed
              </span>
              <span className="hidden sm:inline text-neutral-300">|</span>
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-amber-500" /> 2026 Live Tested
              </span>
            </div>
          </div>
        </header>

        {/* 1. TL;DR / Executive Summary Box (Mandatory 4-Piece Element) */}
        <section className="mb-10 rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            Executive Summary / TL;DR
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-blue-950 font-normal">
            {post.tldr}
          </p>
        </section>

        {/* Article Body Sections */}
        <div className="space-y-12 text-neutral-800">
          {post.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-14">
              <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-2xl mb-4">
                {sec.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-neutral-700">
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tips Callouts */}
              {sec.tips && sec.tips.length > 0 && (
                <div className="mt-5 space-y-2.5 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Pro Execution Steps
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                    {sec.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neutral-400 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Code / Prompt Formula Boxes */}
              {sec.codeOrPrompts && sec.codeOrPrompts.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Tested Prompt Formulas (Copy & Run)
                  </p>
                  <div className="space-y-3">
                    {sec.codeOrPrompts.map((cp, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white font-mono text-xs"
                      >
                        <p className="text-neutral-400 mb-1 text-[11px] font-sans font-semibold">
                          {cp.title}
                        </p>
                        <p className="text-emerald-400 select-all leading-relaxed">
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

        {/* 2. Objective Comparison Table (Mandatory 4-Piece Element) */}
        {post.comparisonTable && (
          <section className="mt-14 scroll-mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-blue-600" />
              {post.comparisonTable.title}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-200 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-neutral-100 text-neutral-800 font-semibold border-b border-neutral-200">
                  <tr>
                    {post.comparisonTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 sm:px-6 sm:py-3.5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {post.comparisonTable.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? "bg-neutral-50/50" : ""}>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 font-medium text-neutral-900">
                        {row.feature}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 font-bold text-blue-700 bg-blue-50/30">
                        {row.seedpix}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-neutral-600">
                        {row.competitor1}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-neutral-600">
                        {row.competitor2}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-3.5 text-neutral-600">
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
        <section className="mt-16 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">
                Direct Tools & Workflows Mentioned in This Guide
              </h3>
              <p className="text-xs text-neutral-500">
                Launch any tool immediately with free credits — zero account required.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {post.relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-blue-400 hover:shadow-sm"
              >
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 flex items-center justify-between">
                    {tool.name}
                    <ArrowRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Frequently Asked Questions (FAQ Section - 4-Piece Element) */}
        <section className="mt-16 border-t border-neutral-200 pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-neutral-700" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {post.faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-xs"
              >
                <h3 className="text-sm sm:text-base font-bold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-neutral-900 p-8 text-center text-white sm:p-10">
          <h3 className="text-2xl font-bold tracking-tight">
            Try SeedPix Free Without Registration
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-neutral-300">
            Generate and edit photos online with state-of-the-art AI. Download clean, full-resolution results with zero watermarks.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-100"
            >
              Open Online Photo Editor
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-neutral-700 px-5 py-2.5 text-xs font-semibold text-neutral-200 hover:bg-neutral-800"
            >
              View Free Credits & Pricing
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
