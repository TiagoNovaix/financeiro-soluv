create or replace function public.is_company_member(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users_companies uc
    where uc.company_id = target_company_id
      and uc.user_id = auth.uid()
      and uc.is_active = true
  );
$$;

create or replace function public.company_user_role(target_company_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select uc.role
  from public.users_companies uc
  where uc.company_id = target_company_id
    and uc.user_id = auth.uid()
    and uc.is_active = true
  limit 1;
$$;

create or replace function public.can_manage_company_data(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.company_user_role(target_company_id) in ('admin', 'operador'), false);
$$;

create or replace function public.is_company_admin(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.company_user_role(target_company_id) = 'admin', false);
$$;

revoke all on function public.is_company_member(uuid) from public;
revoke all on function public.company_user_role(uuid) from public;
revoke all on function public.can_manage_company_data(uuid) from public;
revoke all on function public.is_company_admin(uuid) from public;

grant execute on function public.is_company_member(uuid) to authenticated;
grant execute on function public.company_user_role(uuid) to authenticated;
grant execute on function public.can_manage_company_data(uuid) to authenticated;
grant execute on function public.is_company_admin(uuid) to authenticated;
