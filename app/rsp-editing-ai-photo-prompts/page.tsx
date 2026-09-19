import type { Metadata } from "next";
import KeywordLanding from "@/components/KeywordLanding";
import RspPromptsGallery from "@/components/RspPromptsGallery";
import { getLandingBySlug } from "@/lib/landings";

export async function generateMetadata(): Promise<Metadata> {
  const landing = getLandingBySlug("rsp-editing-ai-photo-prompts");
  return {
    title: landing?.title,
    description: landing?.description,
    keywords: landing?.keywords,
    alternates: { canonical: "/rsp-editing-ai-photo-prompts" },
    openGraph: {
      title: landing?.title,
      description: landing?.description,
      type: "website",
      url: "/rsp-editing-ai-photo-prompts",
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

export default function RspEditingPage() {
  const landing = getLandingBySlug("rsp-editing-ai-photo-prompts")!;
  return (
    <>
      <a id="top" className="scroll-mt-14" />
      <div id="faq" />
      {/* 渲染标准词族页面结构（包含面包屑、Hero、SEO长文、FAQ及结构化数据） */}
      <div className="relative">
        <KeywordLanding landing={landing} />
        {/* 核心爆款提示词互动卡片库 */}
        <div className="mx-auto -mt-8 max-w-6xl px-4 pb-12">
          <RspPromptsGallery />
        </div>
      </div>
    </>
  );
}
