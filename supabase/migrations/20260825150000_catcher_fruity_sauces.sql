insert into public.products (
  name, slug, brand_id, category, image_src, flavour_tab
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.flavour_tab
from (
  values
    ('Peach Fruity Sauce', 'peach-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-peach.png', 'sauce'),
    ('Blackcurrant Fruity Sauce', 'blackcurrant-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-blackcurrant.png', 'sauce'),
    ('Blueberry Fruity Sauce', 'blueberry-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-blueberry.png', 'sauce'),
    ('Pink Guava Fruity Sauce', 'pink-guava-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-pink-guava.png', 'sauce'),
    ('Mango Fruity Sauce', 'mango-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-mango.png', 'sauce'),
    ('Strawberry Fruity Sauce', 'strawberry-fruity-sauce', 'catcher-gourmet', 'flavour', '/images/sauce-fruity-strawberry.png', 'sauce')
) as v(name, slug, brand_slug, category, image_src, flavour_tab)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  flavour_tab = excluded.flavour_tab;
