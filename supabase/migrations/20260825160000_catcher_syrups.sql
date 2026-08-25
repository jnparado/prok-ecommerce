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
    ('Caramel 2L', 'caramel-2l-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-caramel-2l.jpg', 'syrups'),
    ('Matcha', 'matcha-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-matcha.jpg', 'syrups'),
    ('Salted Caramel', 'salted-caramel-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-salted-caramel.jpg', 'syrups'),
    ('Pistachio', 'pistachio-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-pistachio.jpg', 'syrups'),
    ('Earl Grey', 'earl-grey-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-earl-grey.jpg', 'syrups')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  flavour_tab = excluded.flavour_tab;
