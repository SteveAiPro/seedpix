"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const configured =
  !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes("YOUR-PROJECT");

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) {
      setError("Auth not configured yet - add Supabase keys to .env.local");
      return;
    }
    setLoading(true);
    setError(null);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setLoading(true);
    setError(null);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setMagicSent(true);
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    if (!configured) return;
    setLoading(true);
    setError(null);
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-16 text-white">
      <div className="w-full rounded-3xl border border-white/10 bg-[#13131A] p-8 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
        <h1 className="text-center text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-white/60">
          Sign in to access your credits and saved edits.
        </p>

        {magicSent ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-4 py-4 text-center text-sm text-emerald-300">
            Check your email for the magic link! You can close this page.
          </div>
        ) : (
          <form onSubmit={handleEmailSignIn} className="mt-6 space-y-3.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl border border-white/10 bg-[#0F0F1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#FFE525]/60 transition"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-[#0F0F1A] px-4 py-2.5 text-sm text-white outline-none focus:border-[#FFE525]/60 transition"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="sparkpix-btn w-full rounded-xl py-2.5 text-sm font-bold text-black disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        <div className="my-5 flex items-center gap-3 text-xs text-white/40">
          <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <button
          onClick={handleMagicLink}
          disabled={loading}
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
        >
          Send Magic Link
        </button>

        <p className="mt-6 text-center text-xs text-white/40">
          {configured
            ? "New here? "
            : "Auth backend not configured yet. "}
          {configured ? (
            <a href="/sign-up" className="text-[#FFE525] hover:underline font-semibold">
              Create an account (get 10 free credits)
            </a>
          ) : (
            "Add Supabase keys to .env.local to enable."
          )}
        </p>
      </div>
    </div>
  );
}
