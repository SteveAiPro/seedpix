-- =====================================================
-- 2026-09-19 注册赠送额度修复
--
-- 执行方式：Supabase Dashboard > SQL Editor > 粘贴本文件全文 > Run
-- 幂等：可重复执行，不会重复补发
--
-- 【问题】
--   旧触发器 handle_new_user() 给新用户赠送 5 积分，
--   但单次编辑消耗 10 积分（lib/credits.ts 的 CREDIT_PRICES.PER_EDIT）。
--   app/api/edit/route.ts 的校验是 credits < 10 → 402，
--   所以每个新用户第一次点生成必定失败，从未有人完成过一次编辑。
--
--   观察到的事实完全吻合：9 个注册用户、0 次编辑、
--   所有 credits 停在 5、last_daily_claim 全为 null。
--
-- 【本文件做两件事】
--   1. 新用户赠送额度 5 -> 10（正好 1 次完整编辑）
--   2. 存量用户补发差额（幂等）
-- =====================================================


-- -----------------------------------------------------
-- 1. 修正新用户注册赠送：5 -> 10
-- -----------------------------------------------------
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

-- 函数体已被上面替换；这里只是确保触发器挂在 auth.users 上
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- -----------------------------------------------------
-- 2. 存量用户补发差额
--    幂等保护：靠 credit_transactions.ref_id 标记，
--    已补发过的用户在 where not exists 里被排除。
-- -----------------------------------------------------
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


-- -----------------------------------------------------
-- 3. 验证
-- -----------------------------------------------------
-- 3a. 触发器是否已更新（应返回 10）
select
  pg_get_functiondef(p.oid) like '%values (new.id, new.email, 10)%' as 触发器已更新为10
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where p.proname = 'handle_new_user'
  and n.nspname = 'public';

-- 3b. 用户积分分布（「仍然卡住」应为 0）
select
  count(*)                                      as 用户总数,
  count(*) filter (where credits >= 10)         as 可完成一次编辑,
  count(*) filter (where credits < 10)          as 仍然卡住,
  min(credits)                                  as 最低积分,
  max(credits)                                  as 最高积分
from public.users;

-- 3c. 最近用户明细
select id, email, credits, last_daily_claim, created_at
from public.users
order by created_at desc
limit 20;
