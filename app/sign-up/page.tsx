"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const configured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      setError("Auth not configured yet - add Supabase keys to .env.local");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    if (data.session) {
      // 已自动登录（未开邮箱验证时）
      router.push("/");
      router.refresh();
    } else {
      setDone(true);
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8">
        <h1 className="text-center text-2xl font-bold text-neutral-900">
          Get 5 Free Credits
        </h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Plus 1 free credit every day. No credit card needed.
        </p>

        {done ? (
          <div className="mt-6 rounded-xl bg-green-50 px-4 py-4 text-center text-sm text-green-800">
            Account created! Check your email to confirm, then sign in to get
            your 5 free credits.
          </div>
        ) : (
          <form onSubmit={handleSignUp} className="mt-6 space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up & Get 5 Credits"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          {configured ? (
            <>
              Already have an account?{" "}
              <a href="/sign-in" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </>
          ) : (
            "Auth backend not configured yet. Add Supabase keys to .env.local to enable."
          )}
        </p>
      </div>
    </div>
  );
}
