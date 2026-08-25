-- Prokrate catalog: paste this entire file into the Supabase SQL Editor and click Run
-- Project: https://supabase.com/dashboard/project/xmehubjlmawiuaaaqqcm/sql/new

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

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'images',
  'images',
  true,
  15728640,
  array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read images" on storage.objects;
create policy "Public read images"
on storage.objects
for select
using (bucket_id = 'images');

insert into public.brands (name, slug, sort_order) values
  ('Catcher Gourmet', 'catcher-gourmet', 1),
  ('Casadio', 'casadio', 2),
  ('Eureka 1920', 'eureka-1920', 3),
  ('Slayer', 'slayer', 4),
  ('La Nuova Era', 'la-nuova-era', 5),
  ('Marcafé', 'marcafe', 6),
  ('puly CAFF', 'puly-caff', 7),
  ('didiesse', 'didiesse', 8),
  ('DOGE', 'doge', 9)
on conflict (slug) do nothing;

insert into public.hero_slides (title, brand, image_src, alt, fit, sort_order) values
  ('Premium Coffee Collection', 'SLAYER', '/images/hero-slayer-steam.png', 'White Slayer espresso machine on a café counter', 'cover', 1),
  ('Crafted for Flavor', 'SLAYER', '/images/hero-slayer-barista.png', 'Barista pulling espresso on a white Slayer machine beside a Ceado grinder', 'contain', 2),
  ('Built for Professionals', 'SLAYER', '/images/hero-slayer-workshop.png', 'Slayer espresso machine in a workshop', 'cover', 3),
  ('Precision Control', 'SLAYER', '/images/hero-slayer-display.png', 'Espresso machine digital brew display', 'cover', 4);

insert into public.products (
  name, slug, brand_id, category, price, image_src, is_new, is_featured, is_top_seller, groups, uses
)
select
  v.name, v.slug, b.id, v.category, v.price, v.image_src, v.is_new, v.is_featured, v.is_top_seller, v.groups, v.uses
from (
  values
    ('Doge Fenix', 'doge-fenix', 'doge', 'espresso_machine', 2392, '/images/product-doge-fenix.png', true, true, true, 2, array['cafe','restaurant','office']),
    ('Casadio Compact', 'casadio-compact', 'casadio', 'espresso_machine', 3425, '/images/product-casadio-compact.png', false, true, true, 1, array['home','office']),
    ('UNDICI WD 2G', 'undici-wd-2g', 'casadio', 'espresso_machine', 25667, '/images/product-undici-wd-2g.png', true, true, true, 2, array['cafe','restaurant','hotel']),
    ('Casadio A2 Plus', 'casadio-a2-plus', 'casadio', 'espresso_machine', null, '/images/product-casadio-a2.png', false, false, false, 2, array['cafe','hotel','restaurant']),
    ('Doge Uno', 'doge-uno', 'doge', 'espresso_machine', null, '/images/product-doge-uno.png', false, false, false, 1, array['home','office','cafe']),
    ('SLAYER EP', 'slayer-ep', 'slayer', 'espresso_machine', 21545, '/images/product-slayer-ep.png', false, true, true, 2, array['cafe','restaurant']),
    ('SLAYER SG', 'slayer-sg', 'slayer', 'espresso_machine', 65897, '/images/product-slayer-sg.png', false, true, false, 1, array['cafe','home']),
    ('STEAM-LP-standard-2GR', 'steam-lp-standard-2gr', 'slayer', 'espresso_machine', 78565, '/images/product-steam-lp-2gr.png', false, true, false, 2, array['cafe','restaurant','hotel'])
) as v(name, slug, brand_slug, category, price, image_src, is_new, is_featured, is_top_seller, groups, uses)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do nothing;

insert into public.products (
  name, slug, brand_id, category, price, image_src, is_featured, is_top_seller, series, uses
)
select
  v.name, v.slug, b.id, v.category, v.price, v.image_src, v.is_featured, v.is_top_seller, v.series, v.uses
from (
  values
    ('Bravo', 'bravo', 'eureka-1920', 'grinder', 34876, '/images/product-eureka-bravo.png', true, true, 'commercial', array['cafe','restaurant','hotel']),
    ('Firenze 75', 'firenze-75', 'eureka-1920', 'grinder', 23545, '/images/product-firenze-75.png', true, true, 'commercial', array['cafe','restaurant','hotel']),
    ('Helios 75', 'helios-75', 'eureka-1920', 'grinder', null, '/images/product-helios-75.png', false, false, 'commercial', array['cafe','restaurant','hotel','office']),
    ('Zenith', 'zenith', 'eureka-1920', 'grinder', null, '/images/product-eureka-zenith.png', false, false, 'commercial', array['cafe','office']),
    ('Mignon Specialita', 'mignon-specialita', 'eureka-1920', 'grinder', null, '/images/product-mignon-specialita.png', false, false, 'mignon', array['home','office','cafe']),
    ('Mignon Silenzio', 'mignon-silenzio', 'eureka-1920', 'grinder', null, '/images/product-mignon-silenzio.png', false, false, 'mignon', array['home','office']),
    ('Casadio On Demand', 'casadio-on-demand', 'casadio', 'grinder', null, '/images/product-casadio-grinder.png', false, false, 'commercial', array['cafe','restaurant','hotel','office'])
) as v(name, slug, brand_slug, category, price, image_src, is_featured, is_top_seller, series, uses)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do nothing;

insert into public.products (
  name, slug, brand_id, category, image_src, coffee_category, brews
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.coffee_category, v.brews
from (
  values
    ('Idillio', 'idillio', 'marcafe', 'coffee', '/images/product-marcafe-idillio.png', 'beans', array['espresso','manual']),
    ('Classico', 'classico', 'marcafe', 'coffee', '/images/product-marcafe-classico.png', 'beans', array['manual','drip','drip-packs']),
    ('Diamante', 'diamante', 'marcafe', 'coffee', '/images/product-marcafe-diamante.png', 'pods', array['espresso','cold-brew']),
    ('Espresso Capsules', 'espresso-capsules', 'marcafe', 'coffee', '/images/product-marcafe-capsules.png', 'pods', array['capsules'])
) as v(name, slug, brand_slug, category, image_src, coffee_category, brews)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do nothing;

delete from public.products
where slug in ('almond', 'irish-cream', 'macadamia', 'caramel', 'vanilla', 'mocha-mix');

insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
    ('Chocolate', 'chocolate-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-chocolate.png', 'syrups'),
    ('White Chocolate', 'white-chocolate-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-white-chocolate.png', 'syrups'),
    ('Hazelnut', 'hazelnut-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-hazelnut.jpg', 'syrups'),
    ('Caramel', 'caramel-2l-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-caramel-2l.jpg', 'syrups'),
    ('Matcha', 'matcha-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-matcha.jpg', 'syrups'),
    ('Salted Caramel', 'salted-caramel-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-salted-caramel.jpg', 'syrups'),
    ('Pistachio', 'pistachio-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-pistachio.jpg', 'syrups'),
    ('Earl Grey', 'earl-grey-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-earl-grey.jpg', 'syrups'),
    ('Irish Cream', 'irish-cream-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-irish-cream.jpg', 'syrups'),
    ('Almond', 'almond-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-almond.jpg', 'sauce'),
    ('Irish Cream', 'irish-cream-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-irish-cream.jpg', 'sauce'),
    ('Macadamia Nut', 'macadamia-nut-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-macadamia-nut.jpg', 'sauce'),
    ('Vanilla', 'vanilla-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-vanilla.jpg', 'sauce'),
    ('Caramel', 'caramel-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-caramel.jpg', 'sauce'),
    ('Peach Fruity Sauce', 'peach-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-peach.png', 'sauce'),
    ('Blackcurrant Fruity Sauce', 'blackcurrant-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-blackcurrant.png', 'sauce'),
    ('Blueberry Fruity Sauce', 'blueberry-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-blueberry.png', 'sauce'),
    ('Pink Guava Fruity Sauce', 'pink-guava-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-pink-guava.png', 'sauce'),
    ('Mango Fruity Sauce', 'mango-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-mango.png', 'sauce'),
    ('Strawberry Fruity Sauce', 'strawberry-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-strawberry.png', 'sauce'),
    ('Crème Smoothies', 'creme-smoothies', 'catcher-gourmet', 'flavour', '/images/powder-creme-smoothies.jpg', 'powder'),
    ('Matcha Latte', 'matcha-latte-mix', 'catcher-gourmet', 'flavour', '/images/powder-matcha-latte.jpg', 'powder'),
    ('Crème Chocolate', 'creme-chocolate', 'catcher-gourmet', 'flavour', '/images/powder-creme-chocolate.jpg', 'powder'),
    ('Crème Vanilla Mix', 'creme-vanilla-mix', 'catcher-gourmet', 'flavour', '/images/powder-creme-vanilla.jpg', 'powder'),
    ('Chai Tea Latte', 'chai-tea-latte', 'catcher-gourmet', 'flavour', '/images/powder-chai-tea-latte.jpg', 'powder'),
    ('Crème Frappe Mix', 'creme-frappe-mix', 'catcher-gourmet', 'flavour', '/images/powder-creme-frappe.jpg', 'powder'),
    ('White Chocolate Mix', 'white-chocolate-mix', 'catcher-gourmet', 'flavour', '/images/powder-white-chocolate.jpg', 'powder'),
    ('Crème Yogurt Mix', 'creme-yogurt-mix', 'catcher-gourmet', 'flavour', '/images/powder-creme-yogurt.jpg', 'powder'),
    ('Classic Chocolate', 'classic-chocolate', 'catcher-gourmet', 'flavour', '/images/powder-classic-chocolate.jpg', 'powder'),
    ('Bellagio Chocolate', 'bellagio-chocolate', 'catcher-gourmet', 'flavour', '/images/powder-bellagio-chocolate.jpg', 'powder')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  flavour_tab = excluded.flavour_tab;

insert into public.package_deals (
  id, brand_id, title, subtitle, image_src, image_alt, featured,
  machine_only, machine_before, price_before, price_after, grinder, freebies_worth, warranty, sort_order
)
select
  v.id, b.id, v.title, v.subtitle, v.image_src, v.image_alt, v.featured,
  v.machine_only, v.machine_before, v.price_before, v.price_after, v.grinder, v.freebies_worth, v.warranty, v.sort_order
from (
  values
    ('casadio-undici-a2', 'casadio', 'UNDICI A2 WOOD', 'Made in Italy · Machine + Eureka Grinder Packages', '/images/package-casadio-undici.png', 'Casadio Undici A2 Wood espresso machine package flyer', true, 259000, 269000, null, null, null, null, '1 Year Warranty', 1),
    ('lne-holiday-helios', 'la-nuova-era', 'Holiday Promo · Helios 65', 'White 2-group + Eureka Helios 65', '/images/package-lne-helios.png', 'La Nuova Era holiday promo with Eureka Helios 65 grinder', false, 272000, null, 342000, 337000, 'Eureka Helios 65', 15000, '1 Year Warranty', 2),
    ('lne-holiday-bravo-black', 'la-nuova-era', 'Holiday Promo · Bravo', 'Black 2-group + Eureka Mignon Bravo', '/images/package-lne-bravo-black.png', 'La Nuova Era black machine holiday promo with Eureka Mignon Bravo', false, 282000, null, 316000, 311000, 'Eureka Mignon Bravo', 15000, '1 Year Warranty', 3),
    ('lne-holiday-bravo-white', 'la-nuova-era', 'Holiday Promo · Bravo', 'White 2-group + Eureka Mignon Bravo', '/images/package-lne-bravo-white.png', 'La Nuova Era white machine holiday promo with Eureka Mignon Bravo', false, 272000, null, 306000, 301000, 'Eureka Mignon Bravo', 15000, '1 Year Warranty', 4)
) as v(id, brand_slug, title, subtitle, image_src, image_alt, featured, machine_only, machine_before, price_before, price_after, grinder, freebies_worth, warranty, sort_order)
join public.brands b on b.slug = v.brand_slug
on conflict (id) do nothing;

insert into public.package_options (package_id, kind, name, price, sort_order) values
  ('casadio-undici-a2', 'package', 'Helios 65', 319000, 1),
  ('casadio-undici-a2', 'package', 'Firenze 75', 306000, 2),
  ('casadio-undici-a2', 'package', 'Mignon Silenzio', 287000, 3),
  ('casadio-undici-a2', 'package', 'Mignon Crono', 277000, 4),
  ('casadio-undici-a2', 'addon', 'JTC OmniBlend', 19500, 5),
  ('casadio-undici-a2', 'addon', 'Eureka DISKO Tamper', 21500, 6);

insert into public.package_inclusions (package_id, label, sort_order) values
  ('casadio-undici-a2', '1–2 Days Basic Barista Training', 1),
  ('casadio-undici-a2', 'Free Consultation', 2),
  ('casadio-undici-a2', 'Coffee beans', 3),
  ('casadio-undici-a2', 'Gourmet syrups', 4),
  ('casadio-undici-a2', 'Tamper & knock box', 5),
  ('lne-holiday-helios', '1pc Eureka Helios 65 Grinder', 1),
  ('lne-holiday-helios', '1–2 Days Basic Barista Training', 2),
  ('lne-holiday-helios', 'Cafe Consultations', 3),
  ('lne-holiday-bravo-black', '1pc Eureka Mignon Bravo Grinder', 1),
  ('lne-holiday-bravo-black', '1–2 Days Basic Barista Training', 2),
  ('lne-holiday-bravo-black', 'Cafe Consultations', 3),
  ('lne-holiday-bravo-white', '1pc Eureka Mignon Bravo Grinder', 1),
  ('lne-holiday-bravo-white', '1–2 Days Basic Barista Training', 2),
  ('lne-holiday-bravo-white', 'Cafe Consultations', 3);

insert into public.news (title, tag, date_label, excerpt, href, image_src, alt, featured, sort_order) values
  ('WOFEX Mindanao 2025', 'Events', '2025', 'Prokrate International met café owners, chefs, and hotel buyers on the WOFEX floor — showing Slayer, La Nuova Era, and Marcafé in person, and talking through the machines that actually fit their bar.', '/#news', '/images/news-wofex-mindanao.png', 'Prokrate team at a coffee equipment trade expo', true, 1),
  ('Hands-on barista courses, from the first shot to service', 'Training', 'Academy', 'Barista 101 and 102 walk teams through extraction, milk, and the habits that hold up when the café is full.', '/training', '/images/training-hero.png', 'Barista training at an espresso bar', false, 2),
  ('Specialists trained by the people who build the machines', 'Service', 'Workshop', 'Our technicians take regular instruction from visiting principals, so diagnostics and preventive work stay true to each brand.', '/services', '/images/machine-services-hero.png', 'Espresso machine in a service workshop', false, 3);

insert into public.training_courses (title, description, image_src, sort_order) values
  ('Barista 101', 'Discussion and Insights', '/images/training-course-thumb.png', 1),
  ('Barista 102', 'Discussion and Insights', '/images/training-course-thumb.png', 2);
