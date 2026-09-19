import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";
import { getLandingBySlug } from "@/lib/landings";

export async function generateMetadata(): Promise<Metadata> {
  const landing = getLandingBySlug("gemini-ai-photo-editor");
  return {
    title: landing?.title,
    description: landing?.description,
    keywords: landing?.keywords,
    alternates: { canonical: "/gemini-ai-photo-editor" },
    openGraph: {
      title: landing?.title,
      description: landing?.description,
      type: "website",
      url: "/gemini-ai-photo-editor",
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

export default function GeminiAIPhotoEditorPage() {
  const landing = getLandingBySlug("gemini-ai-photo-editor")!;
  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      <KeywordLanding landing={landing} />
    </>
  );
}
