import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";
import { getLandingBySlug } from "@/lib/landings";

export async function generateMetadata(): Promise<Metadata> {
  const landing = getLandingBySlug("ai-image-generator-unlimited");
  return {
    title: landing?.title,
    description: landing?.description,
    keywords: landing?.keywords,
    alternates: { canonical: "/ai-image-generator-unlimited" },
  };
}

export default function UnlimitedGeneratorPage() {
  const landing = getLandingBySlug("ai-image-generator-unlimited")!;
  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      <KeywordLanding landing={landing} />
    </>
  );
}
