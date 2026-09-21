import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";
import { getLandingBySlug } from "@/lib/landings";

export async function generateMetadata(): Promise<Metadata> {
  const landing = getLandingBySlug("how-to-fix-grainy-photos");
  return {
    title: landing?.title,
    description: landing?.description,
    keywords: landing?.keywords,
    alternates: { canonical: "/how-to-fix-grainy-photos" },
    openGraph: {
      title: landing?.title,
      description: landing?.description,
      type: "website",
      url: "/how-to-fix-grainy-photos",
      siteName: "SeedPix",
      locale: "en_US",
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: landing?.title,
      description: landing?.description,
      images: ["/og-image.png"],
    },
  };
}

export default function HowToFixGrainyPhotosPage() {
  const landing = getLandingBySlug("how-to-fix-grainy-photos")!;
  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      <KeywordLanding landing={landing} />
    </>
  );
}
