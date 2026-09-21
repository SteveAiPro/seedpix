import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// GA4 Measurement ID（在 .env.local / Vercel 环境变量配置 NEXT_PUBLIC_GA_ID）
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// 站点基准 URL（用于把相对 canonical 解析为绝对 URL，统一 https://seedpix.org）
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seedpix.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SeedPix - Free AI Photo Editor Online (No Sign Up & No Watermark)",
    template: "%s | SeedPix",
  },
  description:
    "100% free AI photo editor online with no sign up. Remove objects, erase watermarks, upscale to 4K & edit images by typing. Try it free in your browser!",
  keywords: [
    "ai photo editor free",
    "ai photo editor no sign up",
    "ai photo editor no restrictions",
    "free ai photo editor online",
    "gemini ai photo editor",
    "remove object from photo",
    "remove background free",
    "photo restoration online",
    "4k image upscaler",
    "filter remover ai",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: `${SITE_URL}/`,
      es: `${SITE_URL}/es`,
      pt: `${SITE_URL}/pt`,
      ja: `${SITE_URL}/ja`,
      zh: `${SITE_URL}/zh`,
      "x-default": `${SITE_URL}/`,
    },
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%232563eb'/%3E%3Ctext x='16' y='23' font-size='18' font-weight='bold' text-anchor='middle' fill='white' font-family='sans-serif'%3ES%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "SeedPix - Free AI Photo Editor Online (No Sign Up & No Watermark)",
    description:
      "100% free AI photo editor online with no sign up. Remove objects, erase watermarks, upscale to 4K & edit images by typing. Try it free in your browser!",
    type: "website",
    url: "/",
    siteName: "SeedPix",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SeedPix Free AI Photo Editor" }],
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
        <SiteFooter />
      </body>
    </html>
  );
}
