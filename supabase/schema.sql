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

-- 5. 新用户注册时自动建行 + 送 10 积分
-- 注意：赠送额必须 >= CREDIT_PRICES.PER_EDIT，否则新用户第一次编辑必定失败
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.users (id, email, credits)
  values (new.id, new.email, 10);

  insert into public.credit_transactions (user_id, amount, type)
  values (new.id, 10, 'signup');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. 存量用户补发（一次性，可重复执行不会重复发放）
-- 背景：早期注册送 5 积分 < 单次编辑 10 积分，老用户永远无法完成第一次编辑。
-- 幂等保护：靠 credit_transactions 里的 ref_id 标记，已补发过的不再补。
do $$
declare
  r record;
begin
  for r in
    select u.id, u.credits
    from public.users u
    where not exists (
      select 1 from public.credit_transactions t
      where t.user_id = u.id
        and t.type = 'refund'
        and t.ref_id = 'backfill:signup-bonus-2026-09-19'
    )
  loop
    update public.users
    set credits = r.credits + (10 - 5)
    where id = r.id;

    insert into public.credit_transactions (user_id, amount, type, ref_id)
    values (r.id, 10 - 5, 'refund', 'backfill:signup-bonus-2026-09-19');
  end loop;
end;
$$;

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
