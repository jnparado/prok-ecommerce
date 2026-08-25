insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
    ('Irish Cream', 'irish-cream-syrup', 'catcher-gourmet', 'flavour', '/images/syrup-irish-cream.jpg', 'syrups')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  flavour_tab = excluded.flavour_tab;
