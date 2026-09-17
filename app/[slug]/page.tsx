import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolPage from "@/components/ToolPage";
import { tools, getToolBySlug, getToolCover } from "@/lib/tools";

interface Props {
  params: Promise<{ slug: string }>;
}

// 站点基准 URL（与 app/layout.tsx 的 metadataBase 保持一致，用于 JSON-LD 的绝对 URL）
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

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
      // 社交分享预览图：优先用该工具的 before/after 示例图，没有则回退站点通用图。
      // metadataBase 已设为 https://seedpix.org，相对路径会被自动补成绝对 URL。
      images: [getToolCover(tool) ?? "/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      images: [getToolCover(tool) ?? "/og-image.png"],
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

  // BreadcrumbList JSON-LD：Home > AI Photo Tools > 本工具
  // 注意：结构化数据应与页面可见内容一致，理想情况下页面上也放一条可见面包屑。
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "AI Photo Tools", item: `${SITE}/ai-photo-tools` },
      { "@type": "ListItem", position: 3, name: tool.title, item: `${SITE}/${tool.slug}` },
    ],
  };

  // SoftwareApplication JSON-LD
  // ⚠️ 刻意不加 aggregateRating：站上没有真实评价数据，
  // 编造评分违反 Google 结构化数据政策，会被判作弊。
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    url: `${SITE}/${tool.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <ToolPage tool={tool} />
    </>
  );
}
