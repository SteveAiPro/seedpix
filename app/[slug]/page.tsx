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
  };
}

export default async function ToolPageRoute({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      <ToolPage tool={tool} />
    </>
  );
}
