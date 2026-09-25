import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "NanoBanana Pro - Professional Resolution AI Photo Suite | SeedPix",
  description: "NanoBanana Pro offers 4K ultra-definition generation and deep neural retouching for professional creators and e-commerce stores.",
  alternates: { canonical: "/nanobanana-pro" },
};

export default function NanoBananaProPage() {
  const item = getCatalogItemBySlug("nanobanana-pro");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
