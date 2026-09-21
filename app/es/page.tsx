import type { Metadata } from "next";
import LocalizedHome from "@/components/LocalizedHome";
import { getDictionary } from "@/lib/i18n/dictionaries";

const dict = getDictionary("es");
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  title: {
    absolute: dict.seo.title,
  },
  description: dict.seo.description,
  keywords: dict.seo.keywords,
  alternates: {
    canonical: "/es",
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
    url: "/es",
    siteName: "SeedPix",
    locale: "es_ES",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: dict.seo.title }],
  },
};

export default function SpanishHomePage() {
  return <LocalizedHome locale="es" />;
}
