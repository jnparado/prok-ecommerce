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
  { name: "Crème Smoothies", slug: "creme-smoothies", file: "powder-creme-smoothies.jpg" },
  { name: "Matcha Latte", slug: "matcha-latte-mix", file: "powder-matcha-latte.jpg" },
  { name: "Crème Chocolate", slug: "creme-chocolate", file: "powder-creme-chocolate.jpg" },
  { name: "Crème Vanilla Mix", slug: "creme-vanilla-mix", file: "powder-creme-vanilla.jpg" },
  { name: "Chai Tea Latte", slug: "chai-tea-latte", file: "powder-chai-tea-latte.jpg" },
  { name: "Crème Frappe Mix", slug: "creme-frappe-mix", file: "powder-creme-frappe.jpg" },
  { name: "White Chocolate Mix", slug: "white-chocolate-mix", file: "powder-white-chocolate.jpg" },
  { name: "Crème Yogurt Mix", slug: "creme-yogurt-mix", file: "powder-creme-yogurt.jpg" },
  { name: "Classic Chocolate", slug: "classic-chocolate", file: "powder-classic-chocolate.jpg" },
  { name: "Bellagio Chocolate", slug: "bellagio-chocolate", file: "powder-bellagio-chocolate.jpg" },
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

const brandRes = await fetch(
  `${url}/rest/v1/brands?slug=eq.catcher-gourmet&select=id`,
  { headers: { ...headers, Accept: "application/json" } }
);
const brands = await brandRes.json();
const brandId = brands?.[0]?.id;
if (!brandId) throw new Error("Catcher Gourmet brand not found in Supabase");

const existingRes = await fetch(
  `${url}/rest/v1/products?flavour_tab=eq.powder&select=slug,name`,
  { headers: { ...headers, Accept: "application/json" } }
);
if (!existingRes.ok) {
  throw new Error(`Fetch powder products: ${existingRes.status} ${await existingRes.text()}`);
}
const existing = await existingRes.json();
const existingSlugs = new Set(existing.map((row) => row.slug));

const fresh = products.filter((item) => !existingSlugs.has(item.slug));
if (fresh.length === 0) {
  console.log(`skipped ${products.length} powder mixes already in Supabase`);
  process.exit(0);
}

const rows = fresh.map((item) => ({
  name: item.name,
  slug: item.slug,
  image_src: `/images/${item.file}`,
  brand_id: brandId,
  category: "flavour",
  flavour_tab: "powder",
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
console.log(`saved ${saved.length} new powder mix products; skipped ${products.length - fresh.length} duplicates`);
