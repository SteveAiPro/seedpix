import Link from "next/link";
import type { ToolPageData } from "@/lib/types";
import PhotoEditor from "@/components/PhotoEditor";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { tools } from "@/lib/tools";
import { getToolExtraContent } from "@/lib/toolContent";
import {
  Check,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ToolPage({ tool }: { tool: ToolPageData }) {
  const extra = getToolExtraContent(tool.slug);

  // 步骤优先用 lib/tools.ts 里的，其次用 lib/toolContent.ts 补的。
  // 原先直接渲染 tool.steps ?? []，而 15/16 个工具没有 steps —— 页面上的
  //「How It Works」区块因此只有标题、内容为空。
  const steps = tool.steps ?? extra?.steps ?? [];
  // FAQ = 原有 FAQ + 补充 FAQ（补充的也会进 FAQPage JSON-LD）
  const allFaqs = [...tool.faqs, ...(extra?.extraFaqs ?? [])];

  const related = tools
    .filter((t) => t.slug !== tool.slug)
    .sort((a, b) => (a.category === tool.category ? -1 : 1) - (b.category === tool.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 text-white">
      {/* 可见面包屑 —— 必须与 app/[slug]/page.tsx 里的 BreadcrumbList JSON-LD 一致
          （Google 要求结构化数据对应页面上真实可见的内容）。 */}
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
            {tool.title.split(" - ")[0]}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="py-10 text-center md:py-14">
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-white md:text-5xl">
          {tool.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          {tool.description}
        </p>
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-white/80">
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            <Check className="h-3.5 w-3.5 text-emerald-400" /> 1-Click · No Prompt Needed
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/10 px-3 py-1 text-[#FFE525]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFE525]" /> ~2s Processing
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#42FF41]" /> Cost: {tool.credits} credits
          </span>
        </div>
      </section>

      {/* Editor */}
      <section className="pb-12">
        <PhotoEditor />
      </section>

      {/* Before/After demos */}
      {tool.demos && tool.demos.length > 0 && (
        <section className="border-t border-white/5 py-14">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              See It in Action
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Drag the slider to compare before and after
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {tool.demos.map((demo, i) => (
              <BeforeAfterSlider
                key={i}
                beforeImage={demo.beforeImage}
                afterImage={demo.afterImage}
                image={demo.image}
                beforeFilter={demo.beforeFilter}
                afterFilter={demo.afterFilter}
                title={demo.title}
                description={demo.description}
              />
            ))}
          </div>
        </section>
      )}

      {/* How it works */}
      {steps.length > 0 && (
        <section className="py-12">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">
            How It Works
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#13131A] p-6 transition hover:border-[#FFE525]/40">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFE525] text-sm font-black text-black">
                  {i + 1}
                </div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Content sections */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Why use SeedPix for this?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {extra?.whyUse ??
                `${tool.description} Our AI runs on state-of-the-art image editing models with a purpose-built instruction baked in. The model keeps the exact subject, pose, framing, and composition while re-rendering natural detail. You upload, click once, and download a photo that looks like it was never edited.`}
            </p>
          </div>

          {/* 具体使用场景（每页内容不同） */}
          {extra?.useCases && extra.useCases.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                When to use {tool.title.split(" - ")[0]}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                The situations this tool is actually built for.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {extra.useCases.map((u, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-[#13131A] p-5"
                  >
                    <h3 className="text-sm font-bold text-white">
                      {u.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/60">
                      {u.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison table */}
          {tool.comparison && (
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {tool.title.split(" - ")[0]} vs. the Alternatives
              </h2>
              <p className="mt-1 text-sm text-white/60">
                Compared honestly, so you know what you&apos;re getting.
              </p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#13131A]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#16161F]">
                      <th className="px-4 py-3 font-medium text-white/50"></th>
                      <th className="px-4 py-3 font-bold text-[#FFE525]">
                        SeedPix {tool.title.split(" - ")[0]}
                      </th>
                      {tool.comparison.slice(1).map((c, i) => (
                        <th key={i} className="px-4 py-3 font-medium text-white/70">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/70">
                    {tool.comparison[0].rows.map((_, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className={rowIdx % 2 === 0 ? "hover:bg-white/[0.02]" : "bg-white/[0.01] hover:bg-white/[0.02]"}
                      >
                        <td className="px-4 py-3 text-white/50">
                          {["What you need", "Time per photo", "Keeps pose & framing", "Cost"][rowIdx] ?? ""}
                        </td>
                        {tool.comparison!.map((c, i) => (
                          <td
                            key={i}
                            className={
                              i === 0
                                ? "px-4 py-3 font-semibold text-[#FFE525]"
                                : "px-4 py-3 text-white/70"
                            }
                          >
                            {c.rows[rowIdx]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {allFaqs.map((faq, i) => (
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
            Ready to {tool.shortDescription.toLowerCase()}?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/70">
            Upload your photo above and get results in one click. No prompt
            writing, no original file needed.
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

      {/* Related tools */}
      <section className="py-10">
        <h2 className="text-lg font-bold text-white">Related Tools</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-[#13131A] px-4 py-3.5 text-sm font-semibold text-white/80 transition hover:border-[#FFE525]/50 hover:text-[#FFE525]"
            >
              {t.shortDescription}
              <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#FFE525]" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
