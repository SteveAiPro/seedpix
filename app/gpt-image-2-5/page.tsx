import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "GPT Image 2.5 - Next-Gen AI Image Editor & Generator Free | SeedPix",
  description: "Experience GPT Image 2.5 online free. Create and edit hyper-realistic images with natural language instructions, photorealistic textures, and zero watermarks.",
  alternates: { canonical: "/gpt-image-2-5" },
  openGraph: {
    title: "GPT Image 2.5 - Next-Gen AI Image Editor & Generator Free",
    description: "Experience GPT Image 2.5 online free. Create and edit hyper-realistic images with natural language instructions, photorealistic textures, and zero watermarks.",
    url: "/gpt-image-2-5",
    siteName: "SeedPix",
    images: ["/showcase/after-try-new-look.webp"],
  },
};

export default function GptImage25Page() {
  const item = getCatalogItemBySlug("gpt-image-2-5");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
