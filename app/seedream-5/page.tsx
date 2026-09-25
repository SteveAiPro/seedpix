import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogPage from "@/components/CatalogPage";
import { getCatalogItemBySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Seedream 5.0 - Next-Gen E-commerce & Portrait AI | SeedPix",
  description: "Seedream 5.0 is the premier engine for fashion shoots, product photography, and realistic portrait creation.",
  alternates: { canonical: "/seedream-5" },
};

export default function Seedream5Page() {
  const item = getCatalogItemBySlug("seedream-5");
  if (!item) notFound();
  return <CatalogPage item={item} />;
}
