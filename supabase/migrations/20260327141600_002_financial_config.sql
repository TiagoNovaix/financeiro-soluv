create table public.categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  type text not null,
  dre_group text not null,
  dre_subgroup text,
  is_operational_revenue boolean not null default false,
  is_extra_revenue boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint categories_type_check check (
    type in (
      'receita',
      'deducao',
      'custo_direto',
      'despesa_operacional',
      'imposto',
      'financeiro',
      'patrimonial'
    )
  ),
  constraint categories_company_name_unique unique (company_id, name)
);

create table public.bank_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  type text not null,
  institution text,
  initial_balance numeric(14,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint bank_accounts_type_check check (type in ('corrente', 'poupanca', 'caixa', 'investimento', 'outro')),
  constraint bank_accounts_company_name_unique unique (company_id, name)
);

create table public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  type text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  constraint payment_methods_type_check check (type in ('pix', 'boleto', 'ted', 'cartao', 'dinheiro', 'debito', 'credito', 'outro')),
  constraint payment_methods_company_name_unique unique (company_id, name)
);

create index categories_company_id_idx on public.categories (company_id);
create index categories_dre_group_idx on public.categories (company_id, dre_group);
create index bank_accounts_company_id_idx on public.bank_accounts (company_id);
create index payment_methods_company_id_idx on public.payment_methods (company_id);

create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();

create trigger set_bank_accounts_updated_at
before update on public.bank_accounts
for each row
execute function public.set_updated_at();

create trigger set_payment_methods_updated_at
before update on public.payment_methods
for each row
execute function public.set_updated_at();
