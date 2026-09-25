import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "GPT Image 2 - High Fidelity AI Image Generation | SeedPix",
  description: "Generate breathtaking images with GPT Image 2. Exceptional prompt comprehension, vivid color dynamics, and crystal-clear image editing.",
  alternates: { canonical: "/gpt-image-2" },
};

export default function GptImage2Page() {
  const item = getCatalogItemBySlug("gpt-image-2");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
