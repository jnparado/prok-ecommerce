-- Prokrate catalog schema
create extension if not exists "pgcrypto";

create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  logo_src text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid references public.brands (id) on delete set null,
  category text not null check (
    category in ('espresso_machine', 'grinder', 'coffee', 'flavour')
  ),
  price numeric(12, 2),
  image_src text not null,
  is_new boolean not null default false,
  is_featured boolean not null default false,
  is_top_seller boolean not null default false,
  groups integer,
  series text,
  flavour_tab text,
  coffee_category text,
  uses text[] not null default '{}',
  brews text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand text not null,
  image_src text not null,
  alt text not null,
  fit text not null default 'cover' check (fit in ('cover', 'contain')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.package_deals (
  id text primary key,
  brand_id uuid references public.brands (id) on delete set null,
  title text not null,
  subtitle text,
  image_src text not null,
  image_alt text,
  featured boolean not null default false,
  machine_only numeric(12, 2),
  machine_before numeric(12, 2),
  price_before numeric(12, 2),
  price_after numeric(12, 2),
  grinder text,
  freebies_worth numeric(12, 2),
  warranty text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.package_options (
  id uuid primary key default gen_random_uuid(),
  package_id text not null references public.package_deals (id) on delete cascade,
  kind text not null check (kind in ('package', 'addon')),
  name text not null,
  price numeric(12, 2) not null,
  sort_order integer not null default 0
);

create table if not exists public.package_inclusions (
  id uuid primary key default gen_random_uuid(),
  package_id text not null references public.package_deals (id) on delete cascade,
  label text not null,
  sort_order integer not null default 0
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,
  date_label text,
  excerpt text,
  href text,
  image_src text,
  alt text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.training_courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_src text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  message text not null,
  package_id text references public.package_deals (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_brand_idx on public.products (brand_id);
create index if not exists package_options_package_idx on public.package_options (package_id);

alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.hero_slides enable row level security;
alter table public.package_deals enable row level security;
alter table public.package_options enable row level security;
alter table public.package_inclusions enable row level security;
alter table public.news enable row level security;
alter table public.training_courses enable row level security;
alter table public.inquiries enable row level security;

drop policy if exists "Public read brands" on public.brands;
create policy "Public read brands" on public.brands for select using (true);

drop policy if exists "Public read products" on public.products;
create policy "Public read products" on public.products for select using (true);

drop policy if exists "Public read hero slides" on public.hero_slides;
create policy "Public read hero slides" on public.hero_slides for select using (true);

drop policy if exists "Public read package deals" on public.package_deals;
create policy "Public read package deals" on public.package_deals for select using (true);

drop policy if exists "Public read package options" on public.package_options;
create policy "Public read package options" on public.package_options for select using (true);

drop policy if exists "Public read package inclusions" on public.package_inclusions;
create policy "Public read package inclusions" on public.package_inclusions for select using (true);

drop policy if exists "Public read news" on public.news;
create policy "Public read news" on public.news for select using (true);

drop policy if exists "Public read training courses" on public.training_courses;
create policy "Public read training courses" on public.training_courses for select using (true);

drop policy if exists "Anyone can submit inquiries" on public.inquiries;
create policy "Anyone can submit inquiries" on public.inquiries for insert with check (true);

grant usage on schema public to anon, authenticated, service_role;

grant select on table
  public.brands,
  public.products,
  public.hero_slides,
  public.package_deals,
  public.package_options,
  public.package_inclusions,
  public.news,
  public.training_courses
to anon, authenticated, service_role;

grant insert on table public.inquiries to anon, authenticated, service_role;
grant select, update, delete on table public.inquiries to service_role;
