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
    <footer className="border-t border-white/5 bg-[#07070A] text-white/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 md:grid-cols-6">
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-base font-extrabold text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#FFE525]/15 text-[#FFE525] text-xs">✦</span>
            <span>SeedPix</span>
          </div>
          <p className="text-xs leading-relaxed text-white/50">
            {dict.footer.tagline}
          </p>
          <ul className="mt-4 space-y-2 text-xs text-white/60">
            <li>
              <Link href="/about" className="hover:text-[#FFE525] transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#FFE525] transition-colors">
                {dict.nav.blog}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#FFE525] transition-colors">
                {dict.nav.pricing}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#FFE525] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#FFE525] transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">{dict.footer.trending}</p>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <Link
                href="/rsp-editing-ai-photo-prompts"
                className="font-semibold text-[#FFE525] hover:underline"
              >
                🔥 RSP Viral Prompts
              </Link>
            </li>
            <li>
              <Link href="/how-to-fix-grainy-photos" className="font-semibold text-[#42FF41] hover:underline">
                ✨ Fix Grainy Photos
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-no-sign-up" className="hover:text-[#FFE525] transition-colors">
                No Sign Up Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-no-restrictions" className="hover:text-[#FFE525] transition-colors">
                No Restrictions
              </Link>
            </li>
            <li>
              <Link href="/gemini-ai-photo-editor" className="hover:text-[#FFE525] transition-colors">
                Gemini Photo Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-editor-free" className="hover:text-[#FFE525] transition-colors">
                Free AI Editor
              </Link>
            </li>
            <li>
              <Link href="/ai-image-generator-unlimited" className="hover:text-[#FFE525] transition-colors">
                Unlimited Generator
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">{dict.footer.editTools}</p>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <Link href="/erase-and-replace-ai" className="font-semibold text-[#FFE525] hover:underline">
                ✨ Erase and Replace AI
              </Link>
            </li>
            <li>
              <Link href="/remove-text-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Text from Photo
              </Link>
            </li>
            <li>
              <Link href="/remove-object-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Object
              </Link>
            </li>
            <li>
              <Link href="/remove-tattoo-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Tattoo
              </Link>
            </li>
            <li>
              <Link href="/background-remover" className="hover:text-[#FFE525] transition-colors">
                Background Remover
              </Link>
            </li>
            <li>
              <Link href="/filter-remover" className="hover:text-[#FFE525] transition-colors">
                Filter Remover
              </Link>
            </li>
            <li>
              <Link href="/edit-text-in-image" className="hover:text-[#FFE525] transition-colors">
                Edit Text in Image
              </Link>
            </li>
            <li>
              <Link href="/photo-text-editor" className="hover:text-[#FFE525] transition-colors">
                Photo Text Editor
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">{dict.footer.enhanceTools}</p>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <Link href="/ai-image-humanizer" className="hover:text-[#FFE525] transition-colors">
                AI Image Humanizer
              </Link>
            </li>
            <li>
              <Link href="/remove-ai-look" className="hover:text-[#FFE525] transition-colors">
                Remove AI Look
              </Link>
            </li>
            <li>
              <Link href="/4k-image-upscaler" className="hover:text-[#FFE525] transition-colors">
                4K Image Upscaler
              </Link>
            </li>
            <li>
              <Link href="/unblur-image" className="hover:text-[#FFE525] transition-colors">
                Unblur Image
              </Link>
            </li>
            <li>
              <Link href="/photo-restoration" className="hover:text-[#FFE525] transition-colors">
                Photo Restoration
              </Link>
            </li>
            <li>
              <Link href="/fix-creased-photos" className="hover:text-[#FFE525] transition-colors">
                Fix Creased Photos
              </Link>
            </li>
            <li>
              <Link href="/gfpgan-face-enhancement" className="hover:text-[#FFE525] transition-colors">
                GFPGAN Face Enhancer
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-enhancer" className="hover:text-[#FFE525] transition-colors">
                AI Photo Enhancer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">{dict.footer.watermark}</p>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <Link href="/gemini-watermark-remover" className="hover:text-[#FFE525] transition-colors">
                Gemini Watermark
              </Link>
            </li>
            <li>
              <Link href="/remove-person-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Person
              </Link>
            </li>
            <li>
              <Link href="/remove-shadow-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Shadow
              </Link>
            </li>
            <li>
              <Link href="/remove-emoji-from-photo" className="hover:text-[#FFE525] transition-colors">
                Remove Emoji
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-to-real" className="hover:text-[#FFE525] transition-colors">
                AI Photo to Real
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold text-white">{dict.footer.generateTools}</p>
          <ul className="space-y-2 text-xs text-white/60">
            <li>
              <Link href="/text-to-image" className="hover:text-[#FFE525] transition-colors">
                Text to Image
              </Link>
            </li>
            <li>
              <Link href="/ai-photo-generator" className="hover:text-[#FFE525] transition-colors">
                AI Photo Generator
              </Link>
            </li>
            <li>
              <Link href="/ai-portrait-generator" className="hover:text-[#FFE525] transition-colors">
                AI Portrait Generator
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
          <p>© {new Date().getFullYear()} SeedPix. {dict.footer.rights}</p>
          <div className="flex space-x-5">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/blog" className="hover:text-white transition-colors">
              {dict.nav.blog}
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              {dict.nav.pricing}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
