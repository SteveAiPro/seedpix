import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

// GA4 Measurement ID（在 .env.local / Vercel 环境变量配置 NEXT_PUBLIC_GA_ID）
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// 站点基准 URL（用于把相对 canonical 解析为绝对 URL，统一 https://seedpix.org）
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SeedPix - AI Photo Editor | Edit Photos Online Free",
    template: "%s | SeedPix",
  },
  description:
    "Free AI photo editor online. Remove objects, restore old photos, remove watermarks, upscale to 4K — edit by typing, no Photoshop needed.",
  keywords: [
    "ai photo editor",
    "ai image editor",
    "remove object from photo",
    "remove background",
    "photo restoration",
    "image upscaler",
    "filter remover",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%232563eb'/%3E%3Ctext x='16' y='23' font-size='18' font-weight='bold' text-anchor='middle' fill='white' font-family='sans-serif'%3ES%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "SeedPix - AI Photo Editor | Edit Photos Online Free",
    description:
      "Free AI photo editor online. Remove objects, restore old photos, remove watermarks, upscale to 4K — edit by typing, no Photoshop needed.",
    type: "website",
    url: "/",
    siteName: "SeedPix",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SeedPix AI Photo Editor" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* 全站 JSON-LD：WebSite + Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "SeedPix",
                  description:
                    "Free AI photo editor. Edit photos by typing - remove objects, restore, upscale, remove watermarks.",
                  inLanguage: "en",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "SeedPix",
                  url: SITE_URL,
                },
              ],
            }),
          }}
        />
        <SiteHeader />
        <main>{children}</main>
        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">SeedPix</p>
              <p className="text-xs leading-relaxed text-neutral-500">
                Free AI photo editor. Edit photos by typing - no Photoshop skills needed.
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Edit Tools</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/filter-remover" className="hover:text-neutral-900">AI Filter Remover</Link></li>
                <li><Link href="/remove-object-from-photo" className="hover:text-neutral-900">Remove Objects</Link></li>
                <li><Link href="/background-remover" className="hover:text-neutral-900">Background Remover</Link></li>
                <li><Link href="/edit-text-in-image" className="hover:text-neutral-900">Edit Text in Image</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Enhance Tools</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/4k-image-upscaler" className="hover:text-neutral-900">4K Image Upscaler</Link></li>
                <li><Link href="/unblur-image" className="hover:text-neutral-900">Unblur Image</Link></li>
                <li><Link href="/photo-restoration" className="hover:text-neutral-900">Photo Restoration</Link></li>
                <li><Link href="/ai-photo-enhancer" className="hover:text-neutral-900">AI Photo Enhancer</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Watermark</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/gemini-watermark-remover" className="hover:text-neutral-900">Gemini Watermark Remover</Link></li>
                <li><Link href="/remove-person-from-photo" className="hover:text-neutral-900">Remove Person from Photo</Link></li>
                <li><Link href="/ai-photo-to-real" className="hover:text-neutral-900">AI Photo to Real</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} SeedPix. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
