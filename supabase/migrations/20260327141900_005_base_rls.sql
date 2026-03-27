alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.users_companies enable row level security;
alter table public.categories enable row level security;
alter table public.bank_accounts enable row level security;
alter table public.payment_methods enable row level security;
alter table public.partners enable row level security;
alter table public.partner_changes enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "companies_select_member"
on public.companies
for select
to authenticated
using (public.is_company_member(id));

create policy "users_companies_select_admin_or_self"
on public.users_companies
for select
to authenticated
using (
  user_id = auth.uid()
  or public.is_company_admin(company_id)
);

create policy "users_companies_insert_admin"
on public.users_companies
for insert
to authenticated
with check (public.is_company_admin(company_id));

create policy "users_companies_update_admin"
on public.users_companies
for update
to authenticated
using (public.is_company_admin(company_id))
with check (public.is_company_admin(company_id));

create policy "categories_select_member"
on public.categories
for select
to authenticated
using (public.is_company_member(company_id));

create policy "categories_insert_manager"
on public.categories
for insert
to authenticated
with check (public.can_manage_company_data(company_id));

create policy "categories_update_manager"
on public.categories
for update
to authenticated
using (public.can_manage_company_data(company_id))
with check (public.can_manage_company_data(company_id));

create policy "bank_accounts_select_member"
on public.bank_accounts
for select
to authenticated
using (public.is_company_member(company_id));

create policy "bank_accounts_insert_manager"
on public.bank_accounts
for insert
to authenticated
with check (public.can_manage_company_data(company_id));

create policy "bank_accounts_update_manager"
on public.bank_accounts
for update
to authenticated
using (public.can_manage_company_data(company_id))
with check (public.can_manage_company_data(company_id));

create policy "payment_methods_select_member"
on public.payment_methods
for select
to authenticated
using (public.is_company_member(company_id));

create policy "payment_methods_insert_manager"
on public.payment_methods
for insert
to authenticated
with check (public.can_manage_company_data(company_id));

create policy "payment_methods_update_manager"
on public.payment_methods
for update
to authenticated
using (public.can_manage_company_data(company_id))
with check (public.can_manage_company_data(company_id));

create policy "partners_select_member"
on public.partners
for select
to authenticated
using (public.is_company_member(company_id));

create policy "partners_insert_manager"
on public.partners
for insert
to authenticated
with check (public.can_manage_company_data(company_id));

create policy "partners_update_manager"
on public.partners
for update
to authenticated
using (public.can_manage_company_data(company_id))
with check (public.can_manage_company_data(company_id));

create policy "partner_changes_select_member"
on public.partner_changes
for select
to authenticated
using (public.is_company_member(company_id));

create policy "partner_changes_insert_manager"
on public.partner_changes
for insert
to authenticated
with check (
  public.can_manage_company_data(company_id)
  and changed_by = auth.uid()
);
