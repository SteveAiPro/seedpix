"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** 共享：把当前登录用户是否 admin 提出来，非 admin 直接弹回首页 */
export function useAdminGate() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function check() {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/sign-in");
        return;
      }
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      try {
        const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
        const me = await res.json();
        if (!me.is_admin) {
          router.replace("/");
          return;
        }
        setIsAdmin(true);
      } catch {
        router.replace("/");
      }
      setChecking(false);
    }
    check();
  }, [router]);

  return { checking, isAdmin };
}
