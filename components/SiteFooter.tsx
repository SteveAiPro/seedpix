"use client";

import { SPARKPIX_FOOTER_HTML } from "@/lib/sparkpixSectionsHtml";

export default function SiteFooter() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: SPARKPIX_FOOTER_HTML }}
    />
  );
}
