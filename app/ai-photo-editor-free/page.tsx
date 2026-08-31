import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";
import { getLandingBySlug } from "@/lib/landings";

export async function generateMetadata(): Promise<Metadata> {
  const landing = getLandingBySlug("ai-photo-editor-free");
  return {
    title: landing?.title,
    description: landing?.description,
    keywords: landing?.keywords,
    alternates: { canonical: "/ai-photo-editor-free" },
  };
}

export default function AIPhotoEditorFreePage() {
  const landing = getLandingBySlug("ai-photo-editor-free")!;
  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      <KeywordLanding landing={landing} />
    </>
  );
}
