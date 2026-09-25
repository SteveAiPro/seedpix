"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useRef } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Maximize2,
  Focus,
  ScanFace,
  Layers,
  Clapperboard,
  Briefcase,
  Heart,
  Shirt,
  Camera,
  Frame,
  WandSparkles,
  Cloud,
  Smile,
  Paintbrush,
  Droplets,
  History,
  Wrench,
  ImagePlus,
  ArrowRight,
} from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const configured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
}

interface NavCategory {
  name: string;
  badge?: string;
  href: string;
  items: NavItem[];
  seeAll?: { text: string; href: string };
}

// 6 大分类菜单定义（100% 一致 sparkpix.ai 结构）
const NAV_CATEGORIES: NavCategory[] = [
  {
    name: "GPT Image 2.5",
    badge: "New",
    href: "/gpt-image-2-5",
    items: [
      { name: "GPT Image 2.5", href: "/gpt-image-2-5", icon: ImagePlus, badge: "New" },
      { name: "GPT Image 2", href: "/gpt-image-2", icon: ImagePlus },
      { name: "Nanobanana Pro", href: "/nanobanana-pro", icon: Sparkles },
      { name: "Seedream 5", href: "/seedream-5", icon: Sparkles },
    ],
  },
  {
    name: "Enhance & Upscale",
    href: "/aitools/photo-upscaler",
    items: [
      { name: "Photo Upscaler", href: "/aitools/photo-upscaler", icon: Maximize2 },
      { name: "Upscale to 4K", href: "/aitools/upscale-image-to-4k", icon: Maximize2 },
      { name: "Unblur Image", href: "/unblur-image", icon: Focus },
      { name: "Fix Blurry Photos", href: "/aitools/fix-blurry-photos", icon: Focus },
      { name: "Photo Enhancer", href: "/photo-enhancer", icon: Sparkles },
      { name: "Face Enhancer", href: "/aitools/gfpgan-face-enhancement", icon: ScanFace },
      { name: "Batch HD Upscaler", href: "/aitools/batch-hd-upscaler", icon: Layers },
      { name: "Video Upscaler", href: "/aitools/video-upscaler", icon: Clapperboard },
    ],
    seeAll: { text: "See all enhance & upscale tools →", href: "/aitools/photo-upscaler" },
  },
  {
    name: "Professional Headshots",
    href: "/ai-headshot-generator",
    items: [
      { name: "AI Headshot Generator", href: "/ai-headshot-generator", icon: Briefcase },
      { name: "LinkedIn Headshot", href: "/ai-linkedin-headshot-generator", icon: Briefcase },
      { name: "Dating Photos", href: "/dating-profile-photo", icon: Heart },
      { name: "Business Attire", href: "/change-outfit-ai", icon: Shirt },
      { name: "Studio Background", href: "/change-background-ai", icon: Camera },
      { name: "Change Hair", href: "/ai-hairstyle-changer", icon: Sparkles },
      { name: "Open Closed Eyes", href: "/open-closed-eyes-ai", icon: ScanFace },
      { name: "Passport & ID Photo", href: "/passport-photo-maker", icon: Frame },
    ],
    seeAll: { text: "All headshot tools →", href: "/ai-headshot-generator" },
  },
  {
    name: "AI to Real",
    href: "/ai-image-humanizer",
    items: [
      { name: "AI Image Humanizer", href: "/ai-image-humanizer", icon: Camera },
      { name: "AI to Real Image Converter", href: "/ai-to-real-image-converter", icon: WandSparkles },
      { name: "Make AI Photo Realistic", href: "/aitools/make-ai-photo-realistic", icon: Camera },
      { name: "Remove AI Look", href: "/aitools/remove-ai-look", icon: WandSparkles },
      { name: "Game Screenshot to Real", href: "/game-screenshot-to-real-photo", icon: WandSparkles },
    ],
    seeAll: { text: "All realism tools →", href: "/ai-image-humanizer" },
  },
  {
    name: "Style Transfer",
    href: "/styles/photo-to-ghibli",
    items: [
      { name: "Photo to Ghibli", href: "/styles/photo-to-ghibli", icon: Cloud },
      { name: "Photo to Anime", href: "/styles/photo-to-anime", icon: Sparkles },
      { name: "Photo to Cartoon", href: "/styles/photo-to-cartoon", icon: Smile },
      { name: "Photo to Oil Painting", href: "/styles/photo-to-oil-painting", icon: Paintbrush },
      { name: "Photo to Watercolor", href: "/styles/photo-to-watercolor", icon: Droplets },
      { name: "Vintage Effect", href: "/styles/photo-to-vintage", icon: Camera },
    ],
    seeAll: { text: "See all 20+ style effects →", href: "/styles/photo-to-ghibli" },
  },
  {
    name: "Photo Restoration",
    href: "/photo-restoration",
    items: [
      { name: "Restore Old Photos", href: "/photo-restoration", icon: History },
      { name: "Colorize Photo", href: "/aitools/colorize-photo", icon: Droplets },
      { name: "Fix Scratches", href: "/aitools/fix-scratched-photos", icon: Wrench },
      { name: "Fix Creased Photos", href: "/aitools/fix-creased-photos", icon: Wrench },
      { name: "Fix Water Damage", href: "/aitools/fix-water-damaged-photos", icon: Wrench },
      { name: "Fix Yellowed Photos", href: "/aitools/fix-yellowed-photos", icon: Wrench },
    ],
    seeAll: { text: "See all restoration tools →", href: "/photo-restoration" },
  },
];

export default function SiteHeader() {
  const router = useRouter();
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
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  // 菜单交互状态
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 监听路由变化自动关闭菜单
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setEmail(user.email ?? null);
      const { data: profile } = await supabase
        .from("users")
        .select("credits")
        .eq("id", user.id)
        .single();
      if (profile) {
        setCredits(typeof profile.credits === "number" ? profile.credits : null);
      }
      try {
        const { data: session } = await supabase.auth.getSession();
        const token = session?.session?.access_token;
        if (token) {
          const res = await fetch("/api/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const me = await res.json();
            if (typeof me.is_admin === "boolean") setIsAdmin(me.is_admin);
          }
        }
      } catch {
        // 静默失败
      }
      setLoading(false);
    }
    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session?.user) {
        setEmail(null);
        setIsAdmin(false);
        setCredits(null);
      } else {
        setEmail(session.user.email ?? null);
        load();
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    await supabase.auth.signOut();
    setEmail(null);
    setIsAdmin(false);
    setCredits(null);
    setSigningOut(false);
    router.push("/");
    router.refresh();
  }

  const localizedHomeHref = currentLocale === "en" ? "/" : `/${currentLocale}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[72px] bg-[#0A0A0F]/70 backdrop-blur-2xl backdrop-saturate-150 z-50 border-b border-white/5">
        <div className="w-full h-full flex items-center px-4 sm:px-6 lg:px-10 justify-between">
          
          {/* 左侧：移动端汉堡按钮 & Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 -ml-2 rounded-lg text-white/70 hover:text-[#FFE525] hover:bg-white/5 transition-all mr-1"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href={localizedHomeHref} className="flex-shrink-0 flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#FFE525] to-[#42FF41] p-[2px] shadow-[0_0_20px_rgba(255,229,37,0.35)] flex items-center justify-center">
                <div className="w-full h-full bg-[#0A0A0F] rounded-[10px] flex items-center justify-center">
                  <span className="bg-gradient-to-r from-[#FFE525] to-[#42FF41] bg-clip-text text-transparent font-black text-xl leading-none">
                    ✦
                  </span>
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                SeedPix
                <span className="text-[#FFE525] text-xs ml-1 font-bold">.org</span>
              </span>
            </Link>
          </div>

          {/* 中间：桌面端 6 大分类导航 (支持 hover/click 优雅展开) */}
          <nav ref={navRef} className="hidden xl:flex flex-1 items-center justify-center gap-0.5 px-4">
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(cat.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={cat.href}
                  className="px-2.5 py-2 rounded-lg text-[14px] font-bold whitespace-nowrap transition-colors flex items-center gap-1 text-white/70 hover:text-white hover:bg-white/5"
                >
                  <span>{cat.name}</span>
                  {cat.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-[#42FF41]/15 text-[#42FF41] text-[10px] font-bold uppercase tracking-wide leading-none">
                      {cat.badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                      openDropdown === cat.name ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* 下拉面板 */}
                {openDropdown === cat.name && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50">
                    <div className="bg-[#12121A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                      {cat.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-[13px] text-white/80 hover:text-white hover:bg-white/5 transition-all group"
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon className="w-4 h-4 text-white/40 group-hover:text-[#FFE525] transition-colors" />
                              <span className="font-medium">{item.name}</span>
                            </span>
                            {item.badge && (
                              <span className="px-1.5 py-0.2 rounded bg-[#42FF41]/15 text-[#42FF41] text-[9px] font-bold uppercase">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                      {cat.seeAll && (
                        <div className="pt-1.5 mt-1 border-t border-white/5">
                          <Link
                            href={cat.seeAll.href}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold text-[#FFE525] hover:text-[#42FF41] transition-colors"
                          >
                            <span>{cat.seeAll.text}</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/pricing"
              className="px-3 py-2 rounded-lg text-[14px] font-bold whitespace-nowrap transition-colors text-white/70 hover:text-white hover:bg-white/5"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 rounded-lg text-[14px] font-bold whitespace-nowrap transition-colors text-white/70 hover:text-white hover:bg-white/5"
            >
              Blog
            </Link>
          </nav>

          {/* 右侧：多语言切换 & 登录 / 注册 / 用户点数 */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <LanguageSwitcher />

            {loading ? (
              <div className="w-20 h-9 rounded-xl bg-white/5 animate-pulse" />
            ) : email ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 border border-white/10">
                  <span className="text-xs font-semibold text-white/80 max-w-[120px] truncate hidden sm:inline">
                    {email.split("@")[0]}
                  </span>
                  {typeof credits === "number" && (
                    <span className="rounded-full bg-gradient-to-r from-[#FFE525]/20 to-[#42FF41]/20 border border-[#FFE525]/30 px-2 py-0.5 text-[11px] font-bold text-[#FFE525]">
                      {credits} credits
                    </span>
                  )}
                </div>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden sm:inline-block rounded-lg border border-purple-800/60 bg-purple-950/60 px-2 py-1 text-xs font-semibold text-purple-300"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
                >
                  {signingOut ? "..." : dict.nav.signOut}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Link
                    href="/sign-in"
                    className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white hover:bg-gray-100 rounded-xl transition-colors shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800">Sign In</span>
                  </Link>
                  <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-[9px] font-black rounded-full shadow-md z-10 leading-none">
                    FREE
                  </div>
                </div>

                <Link
                  href="/sign-up"
                  className="hidden md:flex items-center gap-1.5 sparkpix-btn rounded-xl px-3.5 py-2 text-xs font-black text-black"
                >
                  <span>{dict.nav.getCredits}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 移动端侧滑抽屉（Drawer） */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* 背景遮罩 */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* 抽屉容器 */}
        <aside
          className={`absolute left-0 top-0 bottom-0 w-[290px] bg-[#0D0D14] border-r border-white/10 flex flex-col transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* 抽屉头部 */}
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <Link
              href={localizedHomeHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#FFE525] to-[#42FF41] p-[2px]">
                <div className="w-full h-full bg-[#0A0A0F] rounded-[6px] flex items-center justify-center">
                  <span className="text-[#FFE525] font-black text-sm">✦</span>
                </div>
              </div>
              <span className="text-lg font-black text-white">SeedPix.org</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 抽屉内容列表：可折叠手风琴 */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {NAV_CATEGORIES.map((cat) => {
              const isExpanded = expandedMobile === cat.name;
              return (
                <div key={cat.name} className="border-b border-white/5 pb-1">
                  <button
                    onClick={() => setExpandedMobile(isExpanded ? null : cat.name)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-bold">
                      {cat.name}
                      {cat.badge && (
                        <span className="px-1.5 py-0.5 rounded bg-[#42FF41]/15 text-[#42FF41] text-[10px] font-bold">
                          {cat.badge}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 opacity-60 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pl-3 pr-1 py-1 space-y-0.5">
                      {cat.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Icon className="w-3.5 h-3.5 text-white/40" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                      {cat.seeAll && (
                        <Link
                          href={cat.seeAll.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold text-[#FFE525] hover:text-[#42FF41]"
                        >
                          <span>{cat.seeAll.text}</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[15px] font-bold text-white/80 hover:text-white hover:bg-white/5"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[15px] font-bold text-white/80 hover:text-white hover:bg-white/5"
            >
              Blog
            </Link>
          </nav>

          {/* 抽屉底部 */}
          <div className="p-4 border-t border-white/10">
            {!email ? (
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm shadow-md"
              >
                <span>Sign In (5 Free Credits)</span>
              </Link>
            ) : (
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>{email.split("@")[0]}</span>
                <span className="text-[#FFE525] font-bold">{credits ?? 0} credits</span>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* 预留 72px 避免顶栏遮挡 */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
