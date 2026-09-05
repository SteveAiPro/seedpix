-- =====================================================
-- SeedPix: 管理员角色 & RLS 策略
-- 在 Supabase Dashboard > SQL Editor 中执行本文件
-- =====================================================

-- 1. 加 is_admin 字段
alter table public.users
  add column if not exists is_admin boolean not null default false;

-- 2. 索引方便管理员查询
create index if not exists idx_users_admin on public.users(is_admin) where is_admin = true;
create index if not exists idx_users_created on public.users(created_at desc);

-- 3. 管理员 RLS 策略：admin 可查所有 users / credit_transactions / edits
drop policy if exists "users_select_all_for_admin" on public.users;
create policy "users_select_all_for_admin"
  on public.users for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.is_admin = true
    )
  );

drop policy if exists "users_update_all_for_admin" on public.users;
create policy "users_update_all_for_admin"
  on public.users for update
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.is_admin = true
    )
  );

drop policy if exists "tx_select_all_for_admin" on public.credit_transactions;
create policy "tx_select_all_for_admin"
  on public.credit_transactions for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.is_admin = true
    )
  );

drop policy if exists "edits_select_all_for_admin" on public.edits;
create policy "edits_select_all_for_admin"
  on public.edits for select
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.is_admin = true
    )
  );

-- 4. 自助：第一个 admin 标记（通过 service role / SQL 直接设置）
-- 示例：update public.users set is_admin = true where email = 'your-admin@email.com';
