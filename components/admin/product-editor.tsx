"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { MediaPicker } from "@/components/admin/media-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mediaPublicPath, slugify } from "@/lib/admin/utils";
import { createClient } from "@/lib/supabase/client";

type Brand = { id: string; name: string };
type Variant = {
  id?: string;
  name: string;
  sku: string;
  size: string;
  color: string;
  option_label: string;
  price: number | "";
  stock: number | "";
  image_src: string;
};
type ExtraImage = { id?: string; image_src: string; alt: string; is_primary: boolean };

const emptyVariant = (): Variant => ({
  name: "",
  sku: "",
  size: "",
  color: "",
  option_label: "",
  price: "",
  stock: 0,
  image_src: "",
});

export function ProductEditor({ productId }: { productId?: string }) {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "coffee",
    brand_id: "",
    sku: "",
    price: "" as number | "",
    sale_price: "" as number | "",
    stock: 0 as number | "",
    image_src: "",
    status: "published",
    is_featured: false,
    is_new: false,
    is_top_seller: false,
  });
  const [variants, setVariants] = useState<Variant[]>([]);
  const [images, setImages] = useState<ExtraImage[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    void supabase
      .from("brands")
      .select("id, name")
      .order("name")
      .then(({ data }) => setBrands((data as Brand[]) ?? []));
  }, []);

  useEffect(() => {
    if (!productId) return;
    const supabase = createClient();
    void (async () => {
      const { data, error: loadError } = await supabase.from("products").select("*").eq("id", productId).single();
      if (loadError) {
        setError(loadError.message);
        return;
      }
      setForm({
        name: data.name ?? "",
        slug: data.slug ?? "",
        description: data.description ?? "",
        category: data.category ?? "coffee",
        brand_id: data.brand_id ?? "",
        sku: data.sku ?? "",
        price: data.price ?? "",
        sale_price: data.sale_price ?? "",
        stock: data.stock ?? 0,
        image_src: data.image_src ?? "",
        status: data.status ?? "published",
        is_featured: Boolean(data.is_featured),
        is_new: Boolean(data.is_new),
        is_top_seller: Boolean(data.is_top_seller),
      });
      const extras = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order");
      const gallery = (extras.data as ExtraImage[]) ?? [];
      if (gallery.length) {
        setImages(gallery);
      } else if (data.image_src) {
        setImages([{ image_src: data.image_src, alt: data.name ?? "", is_primary: true }]);
      }
      const variantRows = await supabase
        .from("product_variants")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order");
      setVariants((variantRows.data as Variant[]) ?? []);
    })();
  }, [productId]);

  async function uploadFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    setUploading(true);
    setError("");
    const supabase = createClient();
    const added: ExtraImage[] = [];
    for (const file of Array.from(fileList)) {
      const safe = file.name.replace(/[^\w.\-]+/g, "-").toLowerCase();
      const path = `cms/${Date.now()}-${safe}`;
      const upload = await supabase.storage.from("images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (upload.error) {
        setError(upload.error.message);
        continue;
      }
      const src = mediaPublicPath(path);
      await supabase.from("media").insert({
        file_name: file.name,
        storage_path: path,
        assigned_to: "products",
        alt: file.name.replace(/\.[^.]+$/, ""),
      });
      added.push({
        image_src: src,
        alt: file.name.replace(/\.[^.]+$/, ""),
        is_primary: false,
      });
    }
    setImages((current) => {
      const next = [...current, ...added];
      if (next.length && !next.some((item) => item.is_primary)) {
        next[0] = { ...next[0], is_primary: true };
      }
      return next;
    });
    setUploading(false);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setError("");
    const supabase = createClient();
    const gallery = images.filter((item) => item.image_src);
    const primary = gallery.find((item) => item.is_primary) ?? gallery[0];
    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      description: form.description || null,
      category: form.category,
      brand_id: form.brand_id || null,
      sku: form.sku || null,
      price: form.price === "" ? null : Number(form.price),
      sale_price: form.sale_price === "" ? null : Number(form.sale_price),
      stock: form.stock === "" ? 0 : Number(form.stock),
      image_src: primary?.image_src || form.image_src || null,
      status: form.status,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_top_seller: form.is_top_seller,
    };

    let id = productId;
    if (id) {
      const { error: saveError } = await supabase.from("products").update(payload).eq("id", id);
      if (saveError) {
        setError(saveError.message);
        return;
      }
    } else {
      const { data, error: saveError } = await supabase.from("products").insert(payload).select("id").single();
      if (saveError || !data) {
        setError(saveError?.message ?? "Could not create product");
        return;
      }
      id = data.id;
    }

    await supabase.from("product_images").delete().eq("product_id", id);
    if (gallery.length) {
      await supabase.from("product_images").insert(
        gallery.map((item, index) => ({
          product_id: id,
          image_src: item.image_src,
          alt: item.alt,
          is_primary: item.is_primary || index === 0,
          sort_order: index,
        }))
      );
    }

    await supabase.from("product_variants").delete().eq("product_id", id);
    if (variants.length) {
      await supabase.from("product_variants").insert(
        variants
          .filter((item) => item.name)
          .map((item, index) => ({
            product_id: id,
            name: item.name,
            sku: item.sku || null,
            size: item.size || null,
            color: item.color || null,
            option_label: item.option_label || null,
            price: item.price === "" ? null : Number(item.price),
            stock: item.stock === "" ? 0 : Number(item.stock),
            image_src: item.image_src || null,
            sort_order: index,
          }))
      );
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={(event) => void save(event)} className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-[#3d2416]">{productId ? "Edit product" : "Add product"}</h1>
        <Button type="submit">Save product</Button>
      </div>
      {error ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}

      <section className="grid gap-4 rounded-xl border border-[#eadfce] bg-white p-5 md:grid-cols-2">
        <h2 className="md:col-span-2 font-serif text-xl">Details</h2>
        <label className="space-y-1.5">
          <Label>Product name</Label>
          <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label className="space-y-1.5">
          <Label>Slug</Label>
          <Input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
        </label>
        <label className="md:col-span-2 space-y-1.5">
          <Label>Description</Label>
          <textarea
            className="min-h-28 w-full rounded-lg border border-[#eadfce] px-3 py-2 text-sm"
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
          />
        </label>
        <label className="space-y-1.5">
          <Label>Category</Label>
          <select
            className="h-9 w-full rounded-lg border border-[#eadfce] bg-white px-2 text-sm"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
          >
            <option value="espresso_machine">Espresso Machines</option>
            <option value="grinder">Grinders</option>
            <option value="coffee">Coffee</option>
            <option value="flavour">Flavours</option>
          </select>
        </label>
        <label className="space-y-1.5">
          <Label>Brand</Label>
          <select
            className="h-9 w-full rounded-lg border border-[#eadfce] bg-white px-2 text-sm"
            value={form.brand_id}
            onChange={(event) => setForm({ ...form, brand_id: event.target.value })}
          >
            <option value="">None</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-1.5">
          <Label>SKU</Label>
          <Input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} />
        </label>
        <label className="space-y-1.5">
          <Label>Status</Label>
          <select
            className="h-9 w-full rounded-lg border border-[#eadfce] bg-white px-2 text-sm"
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value })}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label className="space-y-1.5">
          <Label>Regular price</Label>
          <Input type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value === "" ? "" : Number(event.target.value) })} />
        </label>
        <label className="space-y-1.5">
          <Label>Sale price</Label>
          <Input type="number" value={form.sale_price} onChange={(event) => setForm({ ...form, sale_price: event.target.value === "" ? "" : Number(event.target.value) })} />
        </label>
        <label className="space-y-1.5">
          <Label>Inventory / stock</Label>
          <Input type="number" value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value === "" ? "" : Number(event.target.value) })} />
        </label>
        <div className="flex flex-wrap gap-4 pt-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} />
            Featured product
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_new} onChange={(event) => setForm({ ...form, is_new: event.target.checked })} />
            New
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.is_top_seller} onChange={(event) => setForm({ ...form, is_top_seller: event.target.checked })} />
            Top seller
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-[#eadfce] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl">Product images</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Upload several photos at once. Mark one as primary for the catalog thumbnail.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex h-9 cursor-pointer items-center rounded-lg bg-[#82502a] px-3 text-sm text-white">
              {uploading ? "Uploading…" : "Upload images"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                disabled={uploading}
                onChange={(event) => {
                  void uploadFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setImages((value) => [...value, { image_src: "", alt: "", is_primary: false }])}
            >
              Add image slot
            </Button>
          </div>
        </div>
        {images.length === 0 ? (
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#be9f79] bg-[#faf6ef] px-4 text-center text-sm text-[#6b3e24]">
            <span className="font-medium">Drop or choose multiple images</span>
            <span className="mt-1 text-xs text-zinc-500">JPG, PNG, or WebP. First upload becomes the primary image.</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={(event) => {
                void uploadFiles(event.target.files);
                event.target.value = "";
              }}
            />
          </label>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {images.map((image, index) => (
              <div key={`${image.image_src}-${index}`} className="grid gap-3 rounded-lg border border-[#eadfce] p-3">
                <MediaPicker
                  label={image.is_primary ? `Image ${index + 1} (primary)` : `Image ${index + 1}`}
                  value={image.image_src}
                  assignedTo="products"
                  onChange={(image_src) =>
                    setImages((value) => value.map((item, i) => (i === index ? { ...item, image_src } : item)))
                  }
                />
                <label className="block space-y-1.5">
                  <Label>Alt text</Label>
                  <Input
                    value={image.alt}
                    onChange={(event) =>
                      setImages((value) => value.map((item, i) => (i === index ? { ...item, alt: event.target.value } : item)))
                    }
                  />
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="mr-auto flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={image.is_primary}
                      onChange={(event) =>
                        setImages((value) =>
                          value.map((item, i) => ({ ...item, is_primary: i === index ? event.target.checked : false }))
                        )
                      }
                    />
                    Primary image
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index === 0}
                    onClick={() =>
                      setImages((value) => {
                        const next = [...value];
                        [next[index - 1], next[index]] = [next[index], next[index - 1]];
                        return next;
                      })
                    }
                  >
                    Move up
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={index === images.length - 1}
                    onClick={() =>
                      setImages((value) => {
                        const next = [...value];
                        [next[index + 1], next[index]] = [next[index], next[index + 1]];
                        return next;
                      })
                    }
                  >
                    Move down
                  </Button>
                  <Button type="button" variant="destructive" size="sm" onClick={() => setImages((value) => value.filter((_, i) => i !== index))}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3 rounded-xl border border-[#eadfce] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl">Variants</h2>
          <Button type="button" variant="outline" onClick={() => setVariants((value) => [...value, emptyVariant()])}>
            Add variant
          </Button>
        </div>
        {variants.map((variant, index) => (
          <div key={index} className="grid gap-3 rounded-lg border border-[#eadfce] p-3 md:grid-cols-3">
            <Input placeholder="Variant name" value={variant.name} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, name: event.target.value } : item)))} />
            <Input placeholder="Variant SKU" value={variant.sku} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, sku: event.target.value } : item)))} />
            <Input placeholder="Size" value={variant.size} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, size: event.target.value } : item)))} />
            <Input placeholder="Color" value={variant.color} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, color: event.target.value } : item)))} />
            <Input placeholder="Other option" value={variant.option_label} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, option_label: event.target.value } : item)))} />
            <Input type="number" placeholder="Price" value={variant.price} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, price: event.target.value === "" ? "" : Number(event.target.value) } : item)))} />
            <Input type="number" placeholder="Stock" value={variant.stock} onChange={(event) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, stock: event.target.value === "" ? "" : Number(event.target.value) } : item)))} />
            <div className="md:col-span-3">
              <MediaPicker
                label="Variant image"
                value={variant.image_src}
                assignedTo="products"
                onChange={(image_src) => setVariants((value) => value.map((item, i) => (i === index ? { ...item, image_src } : item)))}
              />
            </div>
            <Button type="button" variant="destructive" size="sm" onClick={() => setVariants((value) => value.filter((_, i) => i !== index))}>
              Remove variant
            </Button>
          </div>
        ))}
      </section>
    </form>
  );
}
