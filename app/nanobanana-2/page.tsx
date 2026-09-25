import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "NanoBanana 2 - Lightweight Fast AI Photo Editing | SeedPix",
  description: "NanoBanana 2 delivers lightning-fast photo editing and retouching in under 2 seconds. Lightweight, efficient, and precise.",
  alternates: { canonical: "/nanobanana-2" },
};

export default function NanoBanana2Page() {
  const item = getCatalogItemBySlug("nanobanana-2");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
