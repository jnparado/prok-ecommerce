delete from public.products
where slug in ('almond', 'irish-cream', 'macadamia', 'caramel', 'vanilla');

update public.products
set name = 'Caramel'
where slug = 'caramel-2l-syrup';
