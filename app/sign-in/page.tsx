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

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16">
      <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8">
        <h1 className="text-center text-2xl font-bold text-neutral-900">Welcome back</h1>
        <p className="mt-2 text-center text-sm text-neutral-500">
          Sign in to access your credits and saved edits.
        </p>

        {magicSent ? (
          <div className="mt-6 rounded-xl bg-green-50 px-4 py-4 text-center text-sm text-green-800">
            Check your email for the magic link! You can close this page.
          </div>
        ) : (
          <form onSubmit={handleEmailSignIn} className="mt-6 space-y-3">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        <div className="my-4 flex items-center gap-3 text-xs text-neutral-400">
          <div className="h-px flex-1 bg-neutral-200" /> or <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <button
          onClick={handleMagicLink}
          disabled={loading}
          className="w-full rounded-lg border border-neutral-300 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
        >
          Send Magic Link
        </button>

        <p className="mt-6 text-center text-xs text-neutral-400">
          {configured
            ? "New here? "
            : "Auth backend not configured yet. "}
          {configured ? (
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Create an account (get 5 free credits)
            </a>
          ) : (
            "Add Supabase keys to .env.local to enable."
          )}
        </p>
      </div>
    </div>
  );
}
