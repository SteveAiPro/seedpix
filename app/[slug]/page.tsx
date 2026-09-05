import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPage from "@/components/ToolPage";
import { tools, getToolBySlug } from "@/lib/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: `/${tool.slug}` },
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: "website",
      url: `/${tool.slug}`,
      siteName: "SeedPix",
      locale: "en_US",
    },
  };
}

export default async function ToolPageRoute({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  // FAQPage JSON-LD（页面可见 FAQ 区块，可支持）
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (tool.faqs || []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      {(tool.faqs?.length ?? 0) > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ToolPage tool={tool} />
    </>
  );
}
