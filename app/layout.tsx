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
        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-6">
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">SeedPix</p>
              <p className="text-xs leading-relaxed text-neutral-500">
                100% Free AI photo editor online. Edit photos by typing — no Photoshop skills needed.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-neutral-500">
                <li><Link href="/about" className="hover:text-neutral-900">About Us</Link></li>
                <li><Link href="/pricing" className="hover:text-neutral-900">Pricing & Credits</Link></li>
                <li><Link href="/privacy" className="hover:text-neutral-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-neutral-900">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Trending</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/rsp-editing-ai-photo-prompts" className="font-medium text-blue-600 hover:text-blue-700">🔥 RSP Viral Prompts</Link></li>
                <li><Link href="/ai-photo-editor-no-sign-up" className="hover:text-neutral-900">No Sign Up Editor</Link></li>
                <li><Link href="/ai-photo-editor-no-restrictions" className="hover:text-neutral-900">No Restrictions</Link></li>
                <li><Link href="/gemini-ai-photo-editor" className="hover:text-neutral-900">Gemini Photo Editor</Link></li>
                <li><Link href="/ai-photo-editor-free" className="hover:text-neutral-900">Free AI Editor</Link></li>
                <li><Link href="/ai-image-generator-unlimited" className="hover:text-neutral-900">Unlimited Generator</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Edit Tools</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/filter-remover" className="hover:text-neutral-900">AI Filter Remover</Link></li>
                <li><Link href="/remove-object-from-photo" className="hover:text-neutral-900">Remove Objects</Link></li>
                <li><Link href="/background-remover" className="hover:text-neutral-900">Background Remover</Link></li>
                <li><Link href="/edit-text-in-image" className="hover:text-neutral-900">Edit Text in Image</Link></li>
                <li><Link href="/photo-text-editor" className="hover:text-neutral-900">Photo Text Editor</Link></li>
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
                <li><Link href="/gemini-watermark-remover" className="hover:text-neutral-900">Gemini Watermark</Link></li>
                <li><Link href="/remove-person-from-photo" className="hover:text-neutral-900">Remove Person</Link></li>
                <li><Link href="/ai-photo-to-real" className="hover:text-neutral-900">AI Photo to Real</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-neutral-900">Generate Tools</p>
              <ul className="space-y-1.5 text-xs text-neutral-500">
                <li><Link href="/text-to-image" className="hover:text-neutral-900">Text to Image</Link></li>
                <li><Link href="/ai-photo-generator" className="hover:text-neutral-900">AI Photo Generator</Link></li>
                <li><Link href="/ai-portrait-generator" className="hover:text-neutral-900">AI Portrait Generator</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-400">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
              <p>© {new Date().getFullYear()} SeedPix. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/about" className="hover:text-neutral-600">About</Link>
                <Link href="/privacy" className="hover:text-neutral-600">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-neutral-600">Terms of Service</Link>
                <Link href="/pricing" className="hover:text-neutral-600">Pricing</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
