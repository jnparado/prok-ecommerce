import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
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

const mime = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

const products = [
  {
    name: "Idillio",
    slug: "idillio",
    file: "product-marcafe-idillio.jpg",
    coffee_category: "beans",
    brews: ["espresso", "manual"],
  },
  {
    name: "Miscela Speciale",
    slug: "miscela-speciale",
    file: "product-marcafe-miscela-speciale.jpg",
    coffee_category: "beans",
    brews: ["espresso", "drip"],
  },
  {
    name: "Crema Bar Super",
    slug: "crema-bar-super",
    file: "product-marcafe-crema-bar-super.jpg",
    coffee_category: "beans",
    brews: ["espresso"],
  },
  {
    name: "Diamante",
    slug: "diamante",
    file: "product-marcafe-diamante.jpg",
    coffee_category: "beans",
    brews: ["espresso", "manual"],
  },
  {
    name: "Caffè Decaffeinato",
    slug: "caffe-decaffeinato",
    file: "product-marcafe-decaffeinato.jpg",
    coffee_category: "pods",
    brews: ["espresso"],
  },
  {
    name: "Perla Nera Special",
    slug: "perla-nera-special",
    file: "product-marcafe-perla-nera.jpg",
    coffee_category: "pods",
    brews: ["espresso"],
  },
  {
    name: "Cuor di Caffè",
    slug: "cuor-di-caffe",
    file: "product-marcafe-cuor-di-caffe.jpg",
    coffee_category: "pods",
    brews: ["espresso"],
  },
];

for (const item of products) {
  const body = await readFile(join(root, "public/images", item.file));
  const contentType = mime[extname(item.file).toLowerCase()];
  const response = await fetch(
    `${url}/storage/v1/object/images/${encodeURIComponent(item.file)}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": contentType,
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

const brandRes = await fetch(`${url}/rest/v1/brands?slug=eq.marcafe&select=id`, {
  headers: { ...headers, Accept: "application/json" },
});
const brands = await brandRes.json();
const brandId = brands?.[0]?.id;
if (!brandId) throw new Error("Marcafé brand not found in Supabase");

const del = await fetch(
  `${url}/rest/v1/products?slug=in.(classico,espresso-capsules)`,
  { method: "DELETE", headers }
);
if (!del.ok) {
  throw new Error(`Delete old coffee products: ${del.status} ${await del.text()}`);
}

const rows = products.map((item) => ({
  name: item.name,
  slug: item.slug,
  image_src: `/images/${item.file}`,
  brand_id: brandId,
  category: "coffee",
  coffee_category: item.coffee_category,
  brews: item.brews,
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
console.log(`saved ${saved.length} Marcafé coffee products`);
