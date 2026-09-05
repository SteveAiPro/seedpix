"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAdminGate } from "./use-admin-gate";

interface UserRow {
  id: string;
  email: string;
  credits: number;
  is_admin: boolean;
  created_at: string;
  last_daily_claim: string | null;
  edit_count: number;
}

interface Txn {
  id: number;
  amount: number;
  type: string;
  created_at: string;
  ref_id?: string | null;
}

interface UserDetail {
  profile: UserRow;
  transactions: Txn[];
  edits: { id: number; prompt: string; model?: string; created_at: string }[];
}

export default function AdminPage() {
  const { checking } = useAdminGate();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<UserDetail | null>(null);
  const [detailUserId, setDetailUserId] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [adjustId, setAdjustId] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustReason, setAdjustReason] = useState("");

  const token = useCallback(async () => {
    const supabase = (await import("@supabase/supabase-js")).createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const tk = await token();
      const res = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${tk}` } });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "load failed");
      setUsers(j.users || []);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (checking) return;
    loadUsers();
  }, [checking, loadUsers]);

  const openDetail = async (id: string) => {
    setDetailUserId(id);
    setDetail(null);
    try {
      const tk = await token();
      const res = await fetch(`/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${tk}` } });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "load failed");
      setDetail(j);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  const doAdjust = async (id: string) => {
    const amount = parseInt(adjustAmount, 10);
    if (!Number.isInteger(amount) || amount === 0) {
      setErr("请输入非零整数积分");
      return;
    }
    try {
      const tk = await token();
      const res = await fetch(`/api/admin/users/${id}/credits`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${tk}` },
        body: JSON.stringify({ amount, reason: adjustReason || undefined }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "adjust failed");
      setAdjustId(null);
      setAdjustAmount("");
      setAdjustReason("");
      await loadUsers();
      if (detailUserId === id) await openDetail(id);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  };

  if (checking) {
    return <div className="py-20 text-center text-neutral-400">Checking...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage users, credits and activity</p>
        </div>
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
          ← Back to site
        </Link>
      </div>

      {err && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</div>
      )}

      {/* 概要统计 */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs text-neutral-400">Total users</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{users.length}</p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs text-neutral-400">Admins</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">
            {users.filter((u) => u.is_admin).length}
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-xs text-neutral-400">Total edits</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">
            {users.reduce((s, u) => s + u.edit_count, 0)}
          </p>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-500">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Credits</th>
              <th className="px-4 py-3 font-medium">Edits</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Registered</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-neutral-400">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-neutral-400">No users yet</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-3 font-medium text-neutral-900">{u.email || "(no email)"}</td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {u.credits}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{u.edit_count}</td>
                  <td className="px-4 py-3">
                    {u.is_admin ? (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">admin</span>
                    ) : (
                      <span className="text-xs text-neutral-400">user</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-500">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openDetail(u.id)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700"
                      >
                        Detail
                      </button>
                      {adjustId === u.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(e.target.value)}
                            placeholder="+/- credits"
                            className="w-24 rounded border border-neutral-300 px-2 py-0.5 text-xs"
                          />
                          <input
                            value={adjustReason}
                            onChange={(e) => setAdjustReason(e.target.value)}
                            placeholder="reason"
                            className="w-28 rounded border border-neutral-300 px-2 py-0.5 text-xs"
                          />
                          <button
                            onClick={() => doAdjust(u.id)}
                            className="text-xs font-medium text-green-600 hover:text-green-700"
                          >
                            OK
                          </button>
                          <button
                            onClick={() => setAdjustId(null)}
                            className="text-xs text-neutral-400"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setAdjustId(u.id); setAdjustAmount(""); setAdjustReason(""); }}
                          className="text-xs font-medium text-green-600 hover:text-green-700"
                        >
                          Adjust
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 用户详情抽屉 */}
      {detail && (
        <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">
              {detail.profile.email || "(no email)"}
            </h2>
            <button onClick={() => setDetail(null)} className="text-sm text-neutral-400 hover:text-neutral-600">
              Close ✕
            </button>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-xs text-neutral-400">Credits</p>
              <p className="mt-1 text-lg font-bold text-blue-700">{detail.profile.credits}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Total edits</p>
              <p className="mt-1 text-lg font-bold">{detail.edits.length}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400">Transactions</p>
              <p className="mt-1 text-lg font-bold">{detail.transactions.length}</p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* 积分流水 */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Credit history</h3>
              <div className="max-h-80 space-y-1 overflow-y-auto text-xs">
                {detail.transactions.length === 0 && <p className="text-neutral-400">None</p>}
                {detail.transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-2">
                    <div>
                      <span className="font-medium text-neutral-700">{t.type}</span>
                      {t.ref_id && <span className="ml-2 text-neutral-400">{t.ref_id.replace("admin:", "")}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={t.amount >= 0 ? "text-green-600" : "text-red-600"}>
                        {t.amount >= 0 ? "+" : ""}{t.amount}
                      </span>
                      <span className="text-neutral-400">{new Date(t.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 编辑历史 */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-900">Edit history</h3>
              <div className="max-h-80 space-y-1 overflow-y-auto text-xs">
                {detail.edits.length === 0 && <p className="text-neutral-400">None</p>}
                {detail.edits.map((e) => (
                  <div key={e.id} className="rounded-lg bg-neutral-50 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-neutral-700">{e.model || "edit"}</span>
                      <span className="text-neutral-400">{new Date(e.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-neutral-500">{e.prompt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
