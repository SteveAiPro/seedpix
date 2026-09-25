import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Seedream 5.0 Lite - Quick Fashion & Avatar Generator | SeedPix",
  description: "Fast-loading lightweight edition of Seedream 5.0. Quick avatar transformations and instant outfit changes.",
  alternates: { canonical: "/seedream-5-lite" },
};

export default function Seedream5LitePage() {
  const item = getCatalogItemBySlug("seedream-5-lite");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
