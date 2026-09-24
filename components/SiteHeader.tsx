"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const configured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

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
      // 普通 anon 查询只查 credits（自己读自己，RLS 允许）
      const { data: profile } = await supabase
        .from("users")
        .select("credits")
        .eq("id", user.id)
        .single();
      if (profile) {
        setCredits(typeof profile.credits === "number" ? profile.credits : null);
      }
      // is_admin 走服务端 API 拿（避开 RLS 循环）
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
        // 静默失败：is_admin 默认 false
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0A0A0F]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          href={currentLocale === "en" ? "/" : `/${currentLocale}`}
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE525]/15 text-[#FFE525] font-black text-sm shadow-[0_0_12px_rgba(255,229,37,0.3)]">
            ✦
          </span>
          <span>SeedPix</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <Link href={currentLocale === "en" ? "/" : `/${currentLocale}`} className="transition hover:text-white">
            {dict.nav.editor}
          </Link>
          <Link href="/ai-photo-tools" className="transition hover:text-white">
            {dict.nav.tools}
          </Link>
          <Link href="/pricing" className="transition hover:text-white">
            {dict.nav.pricing}
          </Link>
          <Link href="/blog" className="transition hover:text-white">
            {dict.nav.blog}
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded-md border border-purple-800/60 bg-purple-950/60 px-2 py-0.5 text-xs font-semibold text-purple-300 hover:bg-purple-900/80"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <LanguageSwitcher />
          {loading ? (
            <span className="px-3 py-1.5 text-white/40">…</span>
          ) : email ? (
            <>
              <span className="hidden text-xs text-white/60 sm:inline">
                {email.split("@")[0]}
                {typeof credits === "number" && (
                  <span className="ml-2 rounded-full border border-[#FFE525]/30 bg-[#FFE525]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#FFE525]">
                    {credits} credits
                  </span>
                )}
              </span>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
              >
                {signingOut ? "..." : dict.nav.signOut}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {dict.nav.signIn}
              </Link>
              <Link
                href="/sign-up"
                className="sparkpix-btn rounded-xl px-3.5 py-1.5 text-xs font-bold text-black flex items-center gap-1.5"
              >
                <span>{dict.nav.getCredits}</span>
                <span className="rounded-full bg-black/20 px-1 py-0.2 text-[9px] font-black uppercase">
                  FREE
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
