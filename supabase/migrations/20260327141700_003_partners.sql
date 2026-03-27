create table public.partners (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  ownership_percentage numeric(5,2) not null,
  pro_labore_amount numeric(14,2) not null default 0,
  distribution_rule text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint partners_ownership_percentage_check check (ownership_percentage >= 0 and ownership_percentage <= 100),
  constraint partners_pro_labore_amount_check check (pro_labore_amount >= 0)
);

create table public.partner_changes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  partner_id uuid not null references public.partners (id) on delete cascade,
  change_type text not null,
  old_data jsonb not null default '{}'::jsonb,
  new_data jsonb not null default '{}'::jsonb,
  changed_by uuid not null references public.profiles (id) on delete restrict,
  created_at timestamptz not null default timezone('utc'::text, now()),
  constraint partner_changes_change_type_check check (change_type in ('percentual', 'pro_labore', 'status', 'regra', 'cadastro'))
);

create index partners_company_id_idx on public.partners (company_id);
create index partners_company_active_idx on public.partners (company_id, is_active);
create index partner_changes_company_id_idx on public.partner_changes (company_id);
create index partner_changes_partner_id_idx on public.partner_changes (partner_id);

create trigger set_partners_updated_at
before update on public.partners
for each row
execute function public.set_updated_at();
