import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { STYLE_TOOLS, getCatalogItemBySlug } from "@/lib/catalog";

interface Props {
  params: Promise<{ style: string }>;
}

export function generateStaticParams() {
  return STYLE_TOOLS.map((s) => ({ style: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { style: slug } = await params;
  const item = getCatalogItemBySlug(slug) || STYLE_TOOLS.find((s) => s.slug === slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/styles/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.description,
      type: "website",
      url: `/styles/${item.slug}`,
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

export default async function StyleRoute({ params }: Props) {
  const { style: slug } = await params;
  const item = getCatalogItemBySlug(slug) || STYLE_TOOLS.find((s) => s.slug === slug);
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
        url: `https://seedpix.org/styles/${item.slug}`,
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
