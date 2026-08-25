delete from public.products
where slug = 'chocolate-sauce';

insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
    ('Almond', 'almond-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-almond.jpg', 'sauce'),
    ('Irish Cream', 'irish-cream-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-irish-cream.jpg', 'sauce'),
    ('Macadamia Nut', 'macadamia-nut-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-macadamia-nut.jpg', 'sauce'),
    ('Vanilla', 'vanilla-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-vanilla.jpg', 'sauce'),
    ('Caramel', 'caramel-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-caramel.jpg', 'sauce')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  flavour_tab = excluded.flavour_tab;
