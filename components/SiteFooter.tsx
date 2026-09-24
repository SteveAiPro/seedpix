"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

export default function SiteFooter() {
  const pathname = usePathname() || "/";

  // 检测当前语言
  const currentLocale: Locale = (function () {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    if (first && (first === "es" || first === "pt" || first === "ja" || first === "zh")) {
      return first;
    }
    return "en";
  })();

  const dict = getDictionary(currentLocale);

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 md:grid-cols-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">SeedPix</p>
          <p className="text-xs leading-relaxed text-neutral-500">
            {dict.footer.tagline}
          </p>
          <ul className="mt-3 space-y-1 text-xs text-neutral-500">
            <li>
              <Link href="/about" className="hover:text-neutral-900">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-neutral-900">
                {dict.nav.blog}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-neutral-900">
                {dict.nav.pricing}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-neutral-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-neutral-900">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">{dict.footer.trending}</p>
          <ul className="space-y-1.5 text-xs text-neutral-500">
            <li>
              <Link
                href="/rsp-editing-ai-photo-prompts"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                🔥 RSP Viral Prompts
              </Link>
            </li>
            <li>
              <Link href="/how-to-fix-grainy-photos" className="font-medium text-emerald-600 hover:text-emerald-700">
                ✨ Fix Grainy Photos
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-no-sign-up" className="hover:text-neutral-900">
                No Sign Up Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-no-restrictions" className="hover:text-neutral-900">
                No Restrictions
              </Link>
            </li>
            <li>
              <Link href="/gemini-ai-photo-editor" className="hover:text-neutral-900">
                Gemini Photo Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-free" className="hover:text-neutral-900">
                Free AI Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-image-generator-unlimited" className="hover:text-neutral-900">
                Unlimited Generator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">{dict.footer.editTools}</p>
          <ul className="space-y-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/erase-and-replace-ai" className="font-medium text-blue-600 hover:text-blue-700">
                ✨ Erase and Replace AI
              </Link>
            </li>
            <li>
              <Link href="/remove-text-from-photo" className="hover:text-neutral-900">
                Remove Text from Photo
              </Link>
            </li>
            <li>
              <Link href="/remove-object-from-photo" className="hover:text-neutral-900">
                Remove Object
              </Link>
            </li>
            <li>
              <Link href="/remove-tattoo-from-photo" className="hover:text-neutral-900">
                Remove Tattoo
              </Link>
            </li>
            <li>
              <Link href="/background-remover" className="hover:text-neutral-900">
                Background Remover
              </Link>
            </li>
            <li>
              <Link href="/filter-remover" className="hover:text-neutral-900">
                Filter Remover
              </Link>
            </li>
            <li>
              <Link href="/edit-text-in-image" className="hover:text-neutral-900">
                Edit Text in Image
              </Link>
            </li>
            <li>
              <Link href="/photo-text-editor" className="hover:text-neutral-900">
                Photo Text Editor
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">{dict.footer.enhanceTools}</p>
          <ul className="space-y-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/ai-image-humanizer" className="hover:text-neutral-900">
                AI Image Humanizer
              </Link>
            </li>
            <li>
              <Link href="/remove-ai-look" className="hover:text-neutral-900">
                Remove AI Look
              </Link>
            </li>
            <li>
              <Link href="/4k-image-upscaler" className="hover:text-neutral-900">
                4K Image Upscaler
              </Link>
            </li>
            <li>
              <Link href="/unblur-image" className="hover:text-neutral-900">
                Unblur Image
              </Link>
            </li>
            <li>
              <Link href="/photo-restoration" className="hover:text-neutral-900">
                Photo Restoration
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-enhancer" className="hover:text-neutral-900">
                AI Photo Enhancer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">{dict.footer.watermark}</p>
          <ul className="space-y-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/gemini-watermark-remover" className="hover:text-neutral-900">
                Gemini Watermark
              </Link>
            </li>
            <li>
              <Link href="/remove-person-from-photo" className="hover:text-neutral-900">
                Remove Person
              </Link>
            </li>
            <li>
              <Link href="/remove-shadow-from-photo" className="hover:text-neutral-900">
                Remove Shadow
              </Link>
            </li>
            <li>
              <Link href="/remove-emoji-from-photo" className="hover:text-neutral-900">
                Remove Emoji
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-to-real" className="hover:text-neutral-900">
                AI Photo to Real
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-900">{dict.footer.generateTools}</p>
          <ul className="space-y-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/text-to-image" className="hover:text-neutral-900">
                Text to Image
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-generator" className="hover:text-neutral-900">
                AI Photo Generator
              </Link>
            </li>
            <li>
              <Link href="/ai-portrait-generator" className="hover:text-neutral-900">
                AI Portrait Generator
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
          <p>© {new Date().getFullYear()} SeedPix. {dict.footer.rights}</p>
          <div className="flex space-x-4">
            <Link href="/about" className="hover:text-neutral-600">
              About
            </Link>
            <Link href="/blog" className="hover:text-neutral-600">
              {dict.nav.blog}
            </Link>
            <Link href="/privacy" className="hover:text-neutral-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-600">
              Terms of Service
            </Link>
            <Link href="/pricing" className="hover:text-neutral-600">
              {dict.nav.pricing}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
