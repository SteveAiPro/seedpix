"use client";

import PhotoEditor from "@/components/PhotoEditor";
import ShowcaseTiers from "@/components/ShowcaseTiers";
import {
  SPARKPIX_HERO_HEAD,
  SPARKPIX_S2_S3,
  SPARKPIX_SECTIONS_BOTTOM,
} from "@/lib/sparkpixSectionsHtml";

export default function SparkpixExactBody() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* 1. 原版 SparkPix Hero 标头与卖点徽章 */}
      <div dangerouslySetInnerHTML={{ __html: SPARKPIX_HERO_HEAD }} />

      {/* 2. 1:1 原版精细复刻 Type to Edit 编辑器（包含 Model 与 Ratio 下拉弹窗） */}
      <section id="editor-section" className="relative pt-3 sm:pt-[30px] pb-16 scroll-mt-20">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <PhotoEditor />
        </div>
      </section>

      {/* 3. Section 2 (Latest AI Models 封面展厅) + Section 3 (Hot Features 热门功能) */}
      <div dangerouslySetInnerHTML={{ __html: SPARKPIX_S2_S3 }} />

      {/* 4. 原版 6 大核心 Showcase Demos（万能修图 PIP、职业头像 Before/After 滑条、风格转换、老照片修复、趣味创意 Hover、旅行与活动滑条） */}
      <ShowcaseTiers />

      {/* 5. 原版全部底部深度 SEO & 转化 Sections (真实案例、原理解释、工作流、定价、FAQ、文字编辑) */}
      <div dangerouslySetInnerHTML={{ __html: SPARKPIX_SECTIONS_BOTTOM }} />
    </div>
  );
}
