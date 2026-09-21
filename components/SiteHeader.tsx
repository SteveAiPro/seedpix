"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const configured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

export default function SiteHeader() {
  const router = useRouter();
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
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold text-neutral-900"
        >
          <span className="text-blue-600">✦</span> SeedPix
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-neutral-600 md:flex">
          <Link href="/" className="hover:text-neutral-900">
            AI Photo Editor
          </Link>
          <Link href="/ai-photo-tools" className="hover:text-neutral-900">
            Tools
          </Link>
          <Link href="/pricing" className="hover:text-neutral-900">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-neutral-900">
            Blog
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 hover:bg-purple-200"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2 text-sm">
          <LanguageSwitcher />
          {loading ? (
            <span className="px-3 py-1.5 text-neutral-400">…</span>
          ) : email ? (
            <>
              <span className="hidden text-xs text-neutral-500 sm:inline">
                {email.split("@")[0]}
                {typeof credits === "number" && (
                  <span className="ml-2 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                    {credits} credits
                  </span>
                )}
              </span>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-lg px-3 py-1.5 text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
              >
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-3 py-1.5 text-neutral-700 hover:bg-neutral-100"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-blue-600 px-3 py-1.5 font-medium text-white hover:bg-blue-700"
              >
                Get 5 Free Credits
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
