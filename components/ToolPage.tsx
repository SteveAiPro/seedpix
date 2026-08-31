import Link from "next/link";
import type { ToolPageData } from "@/lib/types";
import PhotoEditor from "@/components/PhotoEditor";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { tools } from "@/lib/tools";
import {
  Check,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ToolPage({ tool }: { tool: ToolPageData }) {
  const related = tools
    .filter((t) => t.slug !== tool.slug)
    .sort((a, b) => (a.category === tool.category ? -1 : 1) - (b.category === tool.category ? -1 : 1))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-10 text-center md:py-14">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
          {tool.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          {tool.description}
        </p>
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-green-600" /> 1-Click · No Prompt Needed
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> ~30s Processing
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> Cost: {tool.credits} credits
          </span>
        </div>
      </section>

      {/* Editor */}
      <section className="pb-10">
        <PhotoEditor />
      </section>

      {/* Before/After demos */}
      {tool.demos && tool.demos.length > 0 && (
        <section className="border-t border-neutral-100 py-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              See It in Action
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
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
      <section className="py-10">
        <h2 className="text-center text-2xl font-bold text-neutral-900">
          How It Works
        </h2>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-3">
          {(tool.steps ?? []).map((step, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Content sections */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Why use SeedPix for this?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {tool.description} Our AI runs on state-of-the-art image editing
              models with a purpose-built instruction baked in. The model keeps
              the exact subject, pose, framing, and composition while
              re-rendering natural detail. You upload, click once, and download
              a photo that looks like it was never edited.
            </p>
          </div>

          {/* Comparison table */}
          {tool.comparison && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                {tool.title.split(" - ")[0]} vs. the Alternatives
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Compared honestly, so you know what you&apos;re getting.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-500"></th>
                      <th className="px-4 py-3 font-semibold text-blue-700">
                        SeedPix {tool.title.split(" - ")[0]}
                      </th>
                      {tool.comparison.slice(1).map((c, i) => (
                        <th key={i} className="px-4 py-3 font-medium text-neutral-600">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tool.comparison[0].rows.map((_, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className={rowIdx % 2 === 0 ? "" : "bg-neutral-50/50"}
                      >
                        <td className="px-4 py-3 text-neutral-500">
                          {["What you need", "Time per photo", "Keeps pose & framing", "Cost"][rowIdx] ?? ""}
                        </td>
                        {tool.comparison!.map((c, i) => (
                          <td
                            key={i}
                            className={
                              i === 0
                                ? "px-4 py-3 font-medium text-neutral-900"
                                : "px-4 py-3 text-neutral-600"
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
            <h2 className="text-xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {tool.faqs.map((faq, i) => (
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
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8">
          <h2 className="text-2xl font-bold text-white">
            Ready to {tool.shortDescription.toLowerCase()}?
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            Upload your photo above and get results in one click. No prompt
            writing, no original file needed.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#top"
              className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Try It Free Now
            </a>
            <a
              href="#faq"
              className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              Read the FAQ
            </a>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="py-10">
        <h2 className="text-lg font-bold text-neutral-900">Related Tools</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              {t.shortDescription}
              <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
