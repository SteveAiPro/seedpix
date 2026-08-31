-- =====================================================
-- SeedPix 数据库结构
-- 在 Supabase Dashboard > SQL Editor 中执行本文件
-- =====================================================

-- 1. users 表（积分余额 + 每日签到）
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  credits integer not null default 0,
  last_daily_claim date,
  created_at timestamptz not null default now()
);

-- 2. 积分交易流水
create table if not exists public.credit_transactions (
  id bigserial primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  amount integer not null, -- 正数=增加，负数=消耗
  type text not null check (type in ('signup','daily','purchase','refund','edit')),
  ref_id text, -- 关联 Stripe session / 编辑记录
  created_at timestamptz not null default now()
);
create index if not exists idx_credit_tx_user on public.credit_transactions(user_id, created_at desc);

-- 3. 编辑历史
create table if not exists public.edits (
  id bigserial primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  prompt text not null,
  model text,
  cost_credits integer not null default 10,
  result_url text,
  created_at timestamptz not null default now()
);
create index if not exists idx_edits_user on public.edits(user_id, created_at desc);

-- 4. 原子扣积分函数（防止并发扣成负数）
create or replace function public.decrement(row_id uuid, amount integer)
returns integer
language plpgsql
security definer
as $$
declare
  new_val integer;
begin
  update public.users
  set credits = credits - amount
  where id = row_id and credits >= amount
  returning credits into new_val;

  if new_val is null then
    raise exception 'Insufficient credits';
  end if;

  return new_val;
end;
$$;

-- 5. 新用户注册时自动建行 + 送 5 积分
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, credits)
  values (new.id, new.email, 5);

  insert into public.credit_transactions (user_id, amount, type)
  values (new.id, 5, 'signup');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================
-- RLS 策略
-- =====================================================
alter table public.users enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.edits enable row level security;

-- users：只能看自己
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
  on public.users for select
  using (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
  on public.users for update
  using (auth.uid() = id);

-- credit_transactions：只能看自己
drop policy if exists "tx_select_own" on public.credit_transactions;
create policy "tx_select_own"
  on public.credit_transactions for select
  using (auth.uid() = user_id);

-- edits：只能看自己
drop policy if exists "edits_select_own" on public.edits;
create policy "edits_select_own"
  on public.edits for select
  using (auth.uid() = user_id);

-- 注意：所有 insert/update 由服务端 service role 完成（绕过 RLS），
-- 客户端不需要 insert 权限
