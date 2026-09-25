"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, getAccessToken } from "@/lib/auth-client";
import {
  CreditCard,
  PackageCheck,
  Clock,
  Sparkles,
  History,
  ChevronRight,
  Copy,
  Check,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface OrderItem {
  id: number;
  planName: string;
  credits: number;
  price: string;
  status: string;
  stripeSessionId: string | null;
  createdAt: string;
}

interface TransactionItem {
  id: number;
  amount: number;
  type: string;
  ref_id?: string | null;
  created_at: string;
}

interface EditItem {
  id: number;
  prompt: string;
  model?: string;
  cost_credits: number;
  result_url?: string;
  created_at: string;
}

interface AccountData {
  user: {
    id: string;
    email: string;
    credits: number;
    createdAt?: string;
  };
  orders: OrderItem[];
  transactions: TransactionItem[];
  edits: EditItem[];
}

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "transactions" | "edits">("orders");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in?redirect=/account");
      return;
    }

    if (user) {
      loadAccountData();
    }
  }, [user, authLoading, router]);

  async function loadAccountData() {
    try {
      setLoading(true);
      const token = await getAccessToken();
      const res = await fetch("/api/user/orders", {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error("Failed to load account data", e);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (authLoading || (loading && !data)) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-[#FFE525] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/60 text-sm">Loading account details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          <span className="text-white/90">User Center &amp; Orders</span>
        </div>

        {/* User Profile & Balance Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16161F]/80 backdrop-blur-xl p-6 sm:p-8 mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFE525]/10 via-[#42FF41]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFE525] to-[#42FF41] flex items-center justify-center text-black font-extrabold text-2xl shadow-lg shadow-[#FFE525]/20">
                {(data?.user.email?.[0] || "U").toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {data?.user.email || user?.email}
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[11px] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-1">
                  User ID: <span className="font-mono text-xs text-white/70">{data?.user.id || user?.id}</span>
                </p>
              </div>
            </div>

            {/* Credits Balance & Top up */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shrink-0">
              <div>
                <div className="text-xs text-white/50 font-medium">Available Balance</div>
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#FFE525] to-[#42FF41] bg-clip-text text-transparent flex items-center gap-1.5 mt-0.5">
                  <Zap className="w-6 h-6 text-[#FFE525] fill-[#FFE525]/20" />
                  {data?.user.credits ?? 0}
                  <span className="text-xs font-semibold text-white/60 ml-1">Credits</span>
                </div>
              </div>
              <Link
                href="/pricing"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE525] to-[#42FF41] text-black font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-1 shadow-md shadow-[#FFE525]/10 whitespace-nowrap ml-2"
              >
                Buy Credits
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 mb-6 gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3.5 px-3 text-sm font-semibold transition-all relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === "orders"
                ? "text-[#FFE525] border-b-2 border-[#FFE525]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Order History ({data?.orders.length ?? 0})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-3.5 px-3 text-sm font-semibold transition-all relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === "transactions"
                ? "text-[#FFE525] border-b-2 border-[#FFE525]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <History className="w-4 h-4" />
            Credit Activity ({data?.transactions.length ?? 0})
          </button>
          <button
            onClick={() => setActiveTab("edits")}
            className={`pb-3.5 px-3 text-sm font-semibold transition-all relative whitespace-nowrap flex items-center gap-2 ${
              activeTab === "edits"
                ? "text-[#FFE525] border-b-2 border-[#FFE525]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Creation History ({data?.edits.length ?? 0})
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="rounded-2xl border border-white/10 bg-[#16161F]/60 backdrop-blur-xl overflow-hidden shadow-xl">
            {(!data?.orders || data.orders.length === 0) ? (
              <div className="py-16 px-4 text-center">
                <PackageCheck className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No purchase orders yet</h3>
                <p className="text-sm text-white/50 max-w-sm mx-auto mt-1 mb-6">
                  You haven&apos;t purchased any credit packages. Top up your account to generate and edit ultra-high-resolution images.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE525] to-[#42FF41] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  View Packages
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/80">
                  <thead className="bg-white/[0.03] text-xs font-semibold uppercase text-white/50 border-b border-white/10">
                    <tr>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Item / Package</th>
                      <th className="py-4 px-6">Credits Added</th>
                      <th className="py-4 px-6">Amount</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Reference ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap text-white/70">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-4 px-6 font-semibold text-white">
                          {order.planName}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#42FF41]">
                          +{order.credits}
                        </td>
                        <td className="py-4 px-6 font-semibold text-white">
                          {order.price}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <Check className="w-3 h-3" />
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-white/50">
                          {order.stripeSessionId ? (
                            <div className="flex items-center gap-1.5">
                              <span className="truncate max-w-[140px]" title={order.stripeSessionId}>
                                {order.stripeSessionId}
                              </span>
                              <button
                                onClick={() => handleCopy(order.stripeSessionId!)}
                                className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
                                title="Copy Session ID"
                              >
                                {copiedId === order.stripeSessionId ? (
                                  <Check className="w-3.5 h-3.5 text-green-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Credit Transactions */}
        {activeTab === "transactions" && (
          <div className="rounded-2xl border border-white/10 bg-[#16161F]/60 backdrop-blur-xl overflow-hidden shadow-xl">
            {(!data?.transactions || data.transactions.length === 0) ? (
              <div className="py-16 px-4 text-center">
                <History className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No activity yet</h3>
                <p className="text-sm text-white/50 max-w-sm mx-auto mt-1">
                  Your credit balance changes will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-white/80">
                  <thead className="bg-white/[0.03] text-xs font-semibold uppercase text-white/50 border-b border-white/10">
                    <tr>
                      <th className="py-4 px-6">Time</th>
                      <th className="py-4 px-6">Event Type</th>
                      <th className="py-4 px-6">Credits Change</th>
                      <th className="py-4 px-6">Reference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {data.transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6 whitespace-nowrap text-white/70">
                          {new Date(tx.created_at).toLocaleDateString()} {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-4 px-6 font-medium capitalize text-white">
                          {tx.type === "signup"
                            ? "Sign Up Bonus"
                            : tx.type === "daily"
                            ? "Daily Claim Bonus"
                            : tx.type === "purchase"
                            ? "Package Purchase"
                            : tx.type === "edit"
                            ? "Image Generation / Edit"
                            : tx.type}
                        </td>
                        <td className="py-4 px-6 font-bold">
                          {tx.amount > 0 ? (
                            <span className="text-[#42FF41]">+{tx.amount}</span>
                          ) : (
                            <span className="text-red-400">{tx.amount}</span>
                          )}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-white/50 truncate max-w-[200px]">
                          {tx.ref_id || "System"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Creation History */}
        {activeTab === "edits" && (
          <div className="rounded-2xl border border-white/10 bg-[#16161F]/60 backdrop-blur-xl p-6 shadow-xl">
            {(!data?.edits || data.edits.length === 0) ? (
              <div className="py-16 text-center">
                <Sparkles className="w-12 h-12 text-white/20 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No creations yet</h3>
                <p className="text-sm text-white/50 max-w-sm mx-auto mt-1 mb-6">
                  Ready to create your first masterpiece? Try editing or generating images with AI.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFE525] to-[#42FF41] text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Open Photo Editor
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.edits.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col justify-between"
                  >
                    <div>
                      {item.result_url && (
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-black/60">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.result_url}
                            alt={item.prompt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm text-white font-medium line-clamp-2 mb-2">
                        &quot;{item.prompt}&quot;
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/50 border-t border-white/5 pt-2 mt-2">
                      <span>{item.model || "SeedPix"}</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
