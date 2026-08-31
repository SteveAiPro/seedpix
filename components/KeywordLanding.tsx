import Link from "next/link";
import type { KeywordLandingData } from "@/lib/landings";
import { landings } from "@/lib/landings";
import { tools } from "@/lib/tools";
import PhotoEditor from "@/components/PhotoEditor";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function KeywordLanding({ landing }: { landing: KeywordLandingData }) {
  const linkedTools = tools.filter((t) => landing.toolSlugs.includes(t.slug));
  const otherLandings = landings.filter((l) => l.slug !== landing.slug);

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Hero */}
      <section className="py-10 text-center md:py-14">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
          {landing.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 md:text-base">
          {landing.description}
        </p>
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> No Watermark
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> ~30s Processing
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5 text-blue-600" /> 5 Free Credits to Start
          </span>
        </div>
      </section>

      {/* Editor */}
      <section className="pb-10">
        <PhotoEditor />
      </section>

      {/* Tool grid */}
      <section className="py-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Everything you need, one click away
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Pick a tool below to get started - all of them work inside the editor above
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {linkedTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-blue-300 hover:text-blue-700"
            >
              {tool.shortDescription}
              <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl space-y-10">
          {landing.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-neutral-900">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              {landing.faqs.map((faq, i) => (
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
            Start creating for free
          </h2>
          <p className="mt-2 text-sm text-blue-100">
            No signup required to try it. Type your idea in the editor above and
            get results in one click.
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

      {/* Related landing pages */}
      {otherLandings.length > 0 && (
        <section className="py-10">
          <h2 className="text-lg font-bold text-neutral-900">
            More ways to create with SeedPix
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {otherLandings.map((l) => (
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
      )}
    </div>
  );
}
