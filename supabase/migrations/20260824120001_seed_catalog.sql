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

insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
    ('Almond', 'almond', 'catcher-gourmet', 'flavour', '/images/syrup-almond.png', 'syrups'),
    ('Irish Cream', 'irish-cream', 'catcher-gourmet', 'flavour', '/images/syrup-irish-cream.png', 'syrups'),
    ('Macadamia', 'macadamia', 'catcher-gourmet', 'flavour', '/images/syrup-macadamia.png', 'syrups'),
    ('Caramel', 'caramel', 'catcher-gourmet', 'flavour', '/images/syrup-caramel.png', 'syrups'),
    ('Vanilla', 'vanilla', 'catcher-gourmet', 'flavour', '/images/syrup-vanilla.png', 'syrups'),
    ('Caramel Sauce', 'caramel-sauce', 'catcher-gourmet', 'flavour', '/images/flavour-sauce.png', 'sauce'),
    ('Chocolate Sauce', 'chocolate-sauce', 'catcher-gourmet', 'flavour', '/images/product-sauce-chocolate.png', 'sauce'),
    ('White Chocolate Mix', 'white-chocolate-mix', 'catcher-gourmet', 'flavour', '/images/flavour-powder.png', 'powder'),
    ('Mocha Mix', 'mocha-mix', 'catcher-gourmet', 'flavour', '/images/product-powder-mocha.png', 'powder')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do nothing;

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
