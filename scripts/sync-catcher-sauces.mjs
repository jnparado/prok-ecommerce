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

const files = [
  "sauce-almond.jpg",
  "sauce-irish-cream.jpg",
  "sauce-macadamia-nut.jpg",
  "sauce-vanilla.jpg",
  "sauce-caramel.jpg",
];

for (const name of files) {
  const body = await readFile(join(root, "public/images", name));
  const response = await fetch(
    `${url}/storage/v1/object/images/${encodeURIComponent(name)}`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "image/jpeg",
        "x-upsert": "true",
        "cache-control": "max-age=31536000",
      },
      body,
    }
  );
  if (!response.ok) {
    throw new Error(`Upload ${name}: ${response.status} ${await response.text()}`);
  }
  console.log(`uploaded ${name}`);
}

const brandRes = await fetch(
  `${url}/rest/v1/brands?slug=eq.catcher-gourmet&select=id`,
  { headers: { ...headers, Accept: "application/json" } }
);
const brands = await brandRes.json();
const brandId = brands?.[0]?.id;
if (!brandId) throw new Error("Catcher Gourmet brand not found in Supabase");

const del = await fetch(`${url}/rest/v1/products?slug=eq.chocolate-sauce`, {
  method: "DELETE",
  headers,
});
if (!del.ok) {
  throw new Error(`Delete chocolate-sauce: ${del.status} ${await del.text()}`);
}

const products = [
  { name: "Almond", slug: "almond-sauce", image_src: "/images/sauce-almond.jpg" },
  { name: "Irish Cream", slug: "irish-cream-sauce", image_src: "/images/sauce-irish-cream.jpg" },
  { name: "Macadamia Nut", slug: "macadamia-nut-sauce", image_src: "/images/sauce-macadamia-nut.jpg" },
  { name: "Vanilla", slug: "vanilla-sauce", image_src: "/images/sauce-vanilla.jpg" },
  { name: "Caramel", slug: "caramel-sauce", image_src: "/images/sauce-caramel.jpg" },
].map((item) => ({
  ...item,
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
  body: JSON.stringify(products),
});
if (!upsert.ok) {
  throw new Error(`Upsert products: ${upsert.status} ${await upsert.text()}`);
}

const saved = await upsert.json();
console.log(`saved ${saved.length} sauce products`);
