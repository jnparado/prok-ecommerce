-- Marcafé roasted coffee beans and pods
insert into public.products (
  name, slug, brand_id, category, image_src, coffee_category, brews
)
select
  v.name, v.slug, b.id, v.category, v.image_src, v.coffee_category, v.brews
from (
  values
    ('Idillio', 'idillio', 'marcafe', 'coffee', '/images/product-marcafe-idillio.jpg', 'beans', array['espresso','manual']),
    ('Miscela Speciale', 'miscela-speciale', 'marcafe', 'coffee', '/images/product-marcafe-miscela-speciale.jpg', 'beans', array['espresso','drip']),
    ('Crema Bar Super', 'crema-bar-super', 'marcafe', 'coffee', '/images/product-marcafe-crema-bar-super.jpg', 'beans', array['espresso']),
    ('Diamante', 'diamante', 'marcafe', 'coffee', '/images/product-marcafe-diamante.jpg', 'beans', array['espresso','manual']),
    ('Caffè Decaffeinato', 'caffe-decaffeinato', 'marcafe', 'coffee', '/images/product-marcafe-decaffeinato.jpg', 'pods', array['espresso']),
    ('Perla Nera Special', 'perla-nera-special', 'marcafe', 'coffee', '/images/product-marcafe-perla-nera.jpg', 'pods', array['espresso']),
    ('Cuor di Caffè', 'cuor-di-caffe', 'marcafe', 'coffee', '/images/product-marcafe-cuor-di-caffe.jpg', 'pods', array['espresso'])
) as v(name, slug, brand_slug, category, image_src, coffee_category, brews)
join public.brands b on b.slug = v.brand_slug
on conflict (slug) do update
set
  name = excluded.name,
  image_src = excluded.image_src,
  coffee_category = excluded.coffee_category,
  brews = excluded.brews;

delete from public.products
where slug in ('classico', 'espresso-capsules');
