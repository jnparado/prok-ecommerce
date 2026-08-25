import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));

function loadEnv(text) {
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv(await readFile(join(root, ".env.local"), "utf8"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !serviceKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const headers = {
  Authorization: `Bearer ${serviceKey}`,
  apikey: serviceKey,
};

const products = [
  { name: "Peach Fruity Sauce", slug: "peach-fruity-sauce", file: "sauce-fruity-peach.png" },
  { name: "Blackcurrant Fruity Sauce", slug: "blackcurrant-fruity-sauce", file: "sauce-fruity-blackcurrant.png" },
  { name: "Blueberry Fruity Sauce", slug: "blueberry-fruity-sauce", file: "sauce-fruity-blueberry.png" },
  { name: "Pink Guava Fruity Sauce", slug: "pink-guava-fruity-sauce", file: "sauce-fruity-pink-guava.png" },
  { name: "Mango Fruity Sauce", slug: "mango-fruity-sauce", file: "sauce-fruity-mango.png" },
  { name: "Strawberry Fruity Sauce", slug: "strawberry-fruity-sauce", file: "sauce-fruity-strawberry.png" },
];

for (const item of products) {
  const body = await readFile(join(root, "public/images", item.file));
  const response = await fetch(
    `${url}/storage/v1/object/images/${encodeURIComponent(item.file)}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "image/png",
        "x-upsert": "true",
        "cache-control": "max-age=31536000",
      },
      body,
    }
  );
  if (!response.ok) {
    throw new Error(`Upload ${item.file}: ${response.status} ${await response.text()}`);
  }
  console.log(`uploaded ${item.file}`);
}

const brandRes = await fetch(
  `${url}/rest/v1/brands?slug=eq.catcher-gourmet&select=id`,
  { headers: { ...headers, Accept: "application/json" } }
);
const brands = await brandRes.json();
const brandId = brands?.[0]?.id;
if (!brandId) throw new Error("Catcher Gourmet brand not found in Supabase");

const rows = products.map((item) => ({
  name: item.name,
  slug: item.slug,
  image_src: `/images/${item.file}`,
  brand_id: brandId,
  category: "flavour",
  flavour_tab: "sauce",
}));

const upsert = await fetch(`${url}/rest/v1/products?on_conflict=slug`, {
  method: "POST",
  headers: {
    ...headers,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify(rows),
});
if (!upsert.ok) {
  throw new Error(`Upsert products: ${upsert.status} ${await upsert.text()}`);
}

const saved = await upsert.json();
console.log(`saved ${saved.length} fruity sauce products`);
