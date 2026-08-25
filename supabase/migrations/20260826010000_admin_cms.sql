-- Admin CMS: media library, extended catalog, services, events, orders
create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create or replace function public.claim_first_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return false;
  end if;
  if exists (select 1 from public.admin_users) then
    return exists (select 1 from public.admin_users where user_id = auth.uid());
  end if;
  insert into public.admin_users (user_id, email)
  select id, coalesce(email, '') from auth.users where id = auth.uid();
  return true;
end;
$$;

grant execute on function public.is_admin() to anon, authenticated, service_role;
grant execute on function public.claim_first_admin() to authenticated, service_role;

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  alt text,
  assigned_to text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users (id) on delete set null
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  kind text not null default 'product',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.brands add column if not exists description text;
alter table public.brands add column if not exists status text not null default 'published';
alter table public.brands add column if not exists featured boolean not null default false;
alter table public.brands add column if not exists media_id uuid references public.media (id) on delete set null;

alter table public.products drop constraint if exists products_category_check;
alter table public.products alter column image_src drop not null;
alter table public.products add column if not exists description text;
alter table public.products add column if not exists sku text;
alter table public.products add column if not exists sale_price numeric(12, 2);
alter table public.products add column if not exists stock integer not null default 0;
alter table public.products add column if not exists status text not null default 'published';
alter table public.products add column if not exists media_id uuid references public.media (id) on delete set null;

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  media_id uuid references public.media (id) on delete set null,
  image_src text not null,
  alt text,
  is_primary boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  name text not null,
  sku text,
  size text,
  color text,
  option_label text,
  price numeric(12, 2),
  stock integer not null default 0,
  image_src text,
  sort_order integer not null default 0
);

alter table public.hero_slides add column if not exists subtitle text;
alter table public.hero_slides add column if not exists button_label text default 'Shop Now';
alter table public.hero_slides add column if not exists button_href text default '/espresso-machines';
alter table public.hero_slides add column if not exists enabled boolean not null default true;
alter table public.hero_slides add column if not exists media_id uuid references public.media (id) on delete set null;

create table if not exists public.homepage_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text,
  description text,
  button_label text,
  button_href text,
  image_src text,
  media_id uuid references public.media (id) on delete set null,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(12, 2),
  image_src text,
  media_id uuid references public.media (id) on delete set null,
  category text,
  status text not null default 'published',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.training_courses add column if not exists category text;
alter table public.training_courses add column if not exists price numeric(12, 2);
alter table public.training_courses add column if not exists duration text;
alter table public.training_courses add column if not exists schedule text;
alter table public.training_courses add column if not exists instructor text;
alter table public.training_courses add column if not exists location text;
alter table public.training_courses add column if not exists status text not null default 'published';
alter table public.training_courses add column if not exists featured boolean not null default false;
alter table public.training_courses add column if not exists overview text;
alter table public.training_courses add column if not exists requirements text;
alter table public.training_courses add column if not exists learning_outcomes text;
alter table public.training_courses add column if not exists enrollment_href text;
alter table public.training_courses add column if not exists contact_info text;
alter table public.training_courses add column if not exists media_id uuid references public.media (id) on delete set null;

alter table public.news add column if not exists content text;
alter table public.news add column if not exists category text;
alter table public.news add column if not exists author text;
alter table public.news add column if not exists published_at date;
alter table public.news add column if not exists status text not null default 'published';
alter table public.news add column if not exists media_id uuid references public.media (id) on delete set null;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_src text,
  media_id uuid references public.media (id) on delete set null,
  event_date date,
  start_time text,
  end_time text,
  location text,
  category text,
  registration_href text,
  status text not null default 'published',
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  status text not null default 'pending',
  total numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  name text not null,
  quantity integer not null default 1,
  price numeric(12, 2) not null default 0
);

insert into public.categories (name, slug, kind, sort_order)
values
  ('Espresso Machines', 'espresso_machine', 'product', 1),
  ('Grinders', 'grinder', 'product', 2),
  ('Coffee', 'coffee', 'product', 3),
  ('Flavours', 'flavour', 'product', 4)
on conflict (slug) do nothing;

insert into public.homepage_sections (slug, title, description, button_label, button_href, image_src, enabled, sort_order)
values
  ('featured', 'Featured', 'Audience tiles and featured machines', '', '', null, true, 1),
  ('gallery', 'Product Gallery', 'Featured products on the homepage', '', '', null, true, 2),
  ('new-arrival', 'New Arrival', 'Our most loved selections by coffee connoisseurs', '', '', null, true, 3),
  ('value-props', 'Value Props', 'Why customers choose Prokrate', '', '', '/images/training-hero.png', true, 4),
  ('packages', 'Package Deals', 'Machine, grinder, training, and freebies', '', '/#packages', null, true, 5),
  ('top-seller', 'Top Seller', 'Best-selling products', '', '', null, true, 6),
  ('services', 'Machine Services', 'Internationally trained specialists for espresso machines and grinders', 'View services', '/services', '/images/machine-services-hero.png', true, 7),
  ('news', 'News & Events', 'Latest news on the homepage', '', '/news-events', null, true, 8),
  ('brands', 'Brands', 'Brand logos on the homepage', '', '/brands', null, true, 9)
on conflict (slug) do nothing;

insert into public.services (name, slug, description, image_src, category, status, featured, sort_order)
values
  ('Diagnostics & Troubleshooting', 'diagnostics', 'Comprehensive diagnostics and systematic troubleshooting for reported machine issues.', '/images/service-diagnostics.png', 'workshop', 'published', true, 1),
  ('Preventive Maintenance', 'preventive-maintenance', 'Scheduled servicing and genuine parts to keep espresso machines and grinders running with less downtime.', '/images/service-maintenance.png', 'workshop', 'published', true, 2)
on conflict (slug) do nothing;

insert into public.events (title, description, image_src, event_date, location, category, status, featured, sort_order)
select 'WOFEX Mindanao 2025',
  'Prokrate International met café owners, chefs, and hotel buyers on the WOFEX floor.',
  '/images/news-wofex-mindanao.png',
  '2025-01-01',
  'Mindanao',
  'Trade Show',
  'published',
  true,
  1
where not exists (select 1 from public.events where title = 'WOFEX Mindanao 2025');

alter table public.admin_users enable row level security;
alter table public.media enable row level security;
alter table public.categories enable row level security;
alter table public.product_images enable row level security;
alter table public.product_variants enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Admins read admin users" on public.admin_users;
create policy "Admins read admin users" on public.admin_users
for select to authenticated using (public.is_admin() or user_id = auth.uid());

drop policy if exists "Admins write admin users" on public.admin_users;
create policy "Admins write admin users" on public.admin_users
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read media" on public.media;
create policy "Public read media" on public.media for select using (true);
drop policy if exists "Admins write media" on public.media;
create policy "Admins write media" on public.media
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories" on public.categories for select using (true);
drop policy if exists "Admins write categories" on public.categories;
create policy "Admins write categories" on public.categories
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read product images" on public.product_images;
create policy "Public read product images" on public.product_images for select using (true);
drop policy if exists "Admins write product images" on public.product_images;
create policy "Admins write product images" on public.product_images
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read product variants" on public.product_variants;
create policy "Public read product variants" on public.product_variants for select using (true);
drop policy if exists "Admins write product variants" on public.product_variants;
create policy "Admins write product variants" on public.product_variants
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read homepage sections" on public.homepage_sections;
create policy "Public read homepage sections" on public.homepage_sections for select using (true);
drop policy if exists "Admins write homepage sections" on public.homepage_sections;
create policy "Admins write homepage sections" on public.homepage_sections
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read services" on public.services;
create policy "Public read services" on public.services for select using (true);
drop policy if exists "Admins write services" on public.services;
create policy "Admins write services" on public.services
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Public read events" on public.events;
create policy "Public read events" on public.events for select using (true);
drop policy if exists "Admins write events" on public.events;
create policy "Admins write events" on public.events
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read customers" on public.customers;
create policy "Admins read customers" on public.customers
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read orders" on public.orders;
create policy "Admins read orders" on public.orders
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins read order items" on public.order_items;
create policy "Admins read order items" on public.order_items
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins write brands" on public.brands;
create policy "Admins write brands" on public.brands
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins write products" on public.products;
create policy "Admins write products" on public.products
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins write hero slides" on public.hero_slides;
create policy "Admins write hero slides" on public.hero_slides
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins write news" on public.news;
create policy "Admins write news" on public.news
for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins write training" on public.training_courses;
create policy "Admins write training" on public.training_courses
for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select, insert, update, delete on table
  public.admin_users,
  public.media,
  public.categories,
  public.product_images,
  public.product_variants,
  public.homepage_sections,
  public.services,
  public.events,
  public.customers,
  public.orders,
  public.order_items
to authenticated, service_role;

grant select on table
  public.media,
  public.categories,
  public.product_images,
  public.product_variants,
  public.homepage_sections,
  public.services,
  public.events
to anon;

grant insert, update, delete on table
  public.brands,
  public.products,
  public.hero_slides,
  public.news,
  public.training_courses
to authenticated, service_role;

drop policy if exists "Admins upload images" on storage.objects;
create policy "Admins upload images"
on storage.objects
for insert to authenticated
with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "Admins update images" on storage.objects;
create policy "Admins update images"
on storage.objects
for update to authenticated
using (bucket_id = 'images' and public.is_admin())
with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "Admins delete images" on storage.objects;
create policy "Admins delete images"
on storage.objects
for delete to authenticated
using (bucket_id = 'images' and public.is_admin());
