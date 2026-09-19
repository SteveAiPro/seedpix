"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { LOCALES } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 检测当前语言
  const currentLocale: Locale = (function () {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    if (first && (first === "es" || first === "pt" || first === "ja" || first === "zh")) {
      return first;
    }
    return "en";
  })();

  const currentInfo = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(locale: Locale) {
    setIsOpen(false);
    if (locale === currentLocale) return;

    // 计算目标 URL
    if (locale === "en") {
      // 切换到英语根路径
      router.push("/");
    } else {
      // 切换到指定语言路径
      router.push(`/${locale}`);
    }
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-lg border border-neutral-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-neutral-700 shadow-2xs transition hover:border-neutral-300 hover:bg-neutral-50 focus:outline-none"
        aria-label="Switch Language"
      >
        <Globe className="h-3.5 w-3.5 text-neutral-500" />
        <span className="hidden sm:inline-block">{currentInfo.nativeName}</span>
        <span className="sm:hidden">{currentInfo.flag}</span>
        <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-40 origin-top-right rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
          <div className="space-y-0.5">
            {LOCALES.map((locale) => {
              const active = locale.code === currentLocale;
              return (
                <button
                  key={locale.code}
                  onClick={() => handleSelect(locale.code)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                    active
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{locale.flag}</span>
                    <span>{locale.nativeName}</span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
