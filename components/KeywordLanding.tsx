import Link from "next/link";
import type { KeywordLandingData } from "@/lib/landings";
import { landings } from "@/lib/landings";
import { tools } from "@/lib/tools";
import PhotoEditor from "@/components/PhotoEditor";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

// 站点基准 URL（与 app/layout.tsx 的 metadataBase 一致，用于 JSON-LD 的绝对 URL）
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export default function KeywordLanding({ landing }: { landing: KeywordLandingData }) {
  const linkedTools = tools.filter((t) => landing.toolSlugs.includes(t.slug));
  const otherLandings = landings.filter((l) => l.slug !== landing.slug);

  // FAQPage JSON-LD（页面真实渲染 FAQ 区块，与内容一致）
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // BreadcrumbList JSON-LD：Home > AI Photo Tools > 本页
  // 名称用短名，与页面上可见的面包屑一致。
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "AI Photo Tools", item: `${SITE}/ai-photo-tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: landing.title.split(" - ")[0],
        item: `${SITE}/${landing.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 text-white">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 可见面包屑（与上面的 BreadcrumbList JSON-LD 一致） */}
      <nav aria-label="Breadcrumb" className="pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-white/20">
            /
          </li>
          <li>
            <Link href="/ai-photo-tools" className="hover:text-white transition-colors">
              AI Photo Tools
            </Link>
          </li>
          <li aria-hidden="true" className="text-white/20">
            /
          </li>
          <li aria-current="page" className="font-semibold text-[#FFE525]">
            {landing.title.split(" - ")[0]}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-10 text-center md:py-14">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {landing.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {landing.description}
        </p>
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/80">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> No Watermark
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/10 px-3 py-1 text-[#FFE525]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFE525]" /> ~2s Processing
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            <Check className="h-3.5 w-3.5 text-[#42FF41]" /> 10 Free Credits to Start
          </span>
        </div>
      </section>

      {/* Editor */}
      <section className="pb-12">
        <PhotoEditor />
      </section>

      {/* Tool grid */}
      <section className="py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Everything you need, one click away
          </h2>
          <p className="mt-1 text-sm text-white/60">
            Pick a tool below to get started - all of them work inside the editor above
          </p>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {linkedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#13131A] px-4.5 py-4 text-sm font-semibold text-white/90 transition hover:border-[#FFE525]/50 hover:text-[#FFE525] hover:shadow-[0_0_20px_rgba(255,229,37,0.1)]"
            >
              <span>{tool.shortDescription}</span>
              <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#FFE525]" />
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl space-y-12">
          {landing.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-white/70">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 space-y-3">
              {landing.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-white/10 bg-[#13131A] transition hover:border-white/20"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-white hover:text-[#FFE525] transition-colors">
                    {faq.question}
                    <span className="ml-2 text-white/40 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-white/70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#FFE525]/30 bg-[#16161F] p-10 shadow-[0_0_50px_-10px_rgba(255,229,37,0.18)]">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            Start creating for free
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
            No signup required to try it. Type your idea in the editor above and
            get results in one click.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="sparkpix-btn rounded-xl px-6 py-2.5 text-sm font-bold text-black"
            >
              Try It Free Now
            </a>
            <a
              href="#faq"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* Related landing pages */}
      {otherLandings.length > 0 && (
        <section className="py-10">
          <h2 className="text-lg font-bold text-white">
            More ways to create with SeedPix
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {otherLandings.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#13131A] px-4.5 py-3.5 text-sm font-semibold text-white/80 transition hover:border-[#FFE525]/50 hover:text-[#FFE525]"
              >
                {l.title.split(" - ")[0]}
                <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-1 group-hover:text-[#FFE525]" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
