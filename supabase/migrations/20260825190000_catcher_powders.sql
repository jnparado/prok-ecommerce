delete from public.products
where slug = 'mocha-mix';

insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
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
