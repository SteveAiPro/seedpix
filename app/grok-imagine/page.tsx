import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Grok Imagine - Unfiltered Creative AI Generation | SeedPix",
  description: "Unleash your visual imagination with Grok Imagine. Uncapped creative perspectives, bold artistic choices, and rapid text-to-image synthesis.",
  alternates: { canonical: "/grok-imagine" },
};

export default function GrokImaginePage() {
  const item = getCatalogItemBySlug("grok-imagine");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
