import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";
import { getDictionary } from "@/lib/i18n/dictionaries";

const dict = getDictionary("pt");
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  title: dict.seo.title,
  description: dict.seo.description,
  keywords: dict.seo.keywords,
  alternates: {
    canonical: "/pt",
    languages: {
      en: `${SITE}/`,
      es: `${SITE}/es`,
      pt: `${SITE}/pt`,
      ja: `${SITE}/ja`,
      zh: `${SITE}/zh`,
      "x-default": `${SITE}/`,
    },
  },
  openGraph: {
    title: dict.seo.title,
    description: dict.seo.description,
    type: "website",
    url: "/pt",
    siteName: "SeedPix",
    locale: "pt_BR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: dict.seo.title }],
  },
};

export default function PortugueseHomePage() {
  return <LocalizedHome locale="pt" />;
}
