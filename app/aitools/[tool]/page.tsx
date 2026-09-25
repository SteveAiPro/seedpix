import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { AI_TOOLS, getCatalogItemBySlug } from "@/lib/catalog";

interface Props {
  params: Promise<{ tool: string }>;
}

export function generateStaticParams() {
  return AI_TOOLS.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const item = getCatalogItemBySlug(slug) || AI_TOOLS.find((t) => t.slug === slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/aitools/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      type: "website",
      url: `/aitools/${item.slug}`,
      siteName: "SeedPix",
      images: [item.afterImage || "/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [item.afterImage || "/og-image.png"],
    },
  };
}

export default async function AiToolRoute({ params }: Props) {
  const { tool: slug } = await params;
  const item = getCatalogItemBySlug(slug) || AI_TOOLS.find((t) => t.slug === slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `SeedPix ${item.title.split(" - ")[0]}`,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description: item.description,
        url: `https://seedpix.org/aitools/${item.slug}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: item.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CatalogPage item={item} />
    </>
  );
}
