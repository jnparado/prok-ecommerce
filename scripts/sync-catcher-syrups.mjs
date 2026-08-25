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
  { name: "Chocolate", slug: "chocolate-syrup", file: "syrup-chocolate.png" },
  { name: "White Chocolate", slug: "white-chocolate-syrup", file: "syrup-white-chocolate.png" },
  { name: "Hazelnut", slug: "hazelnut-syrup", file: "syrup-hazelnut.jpg" },
  { name: "Caramel", slug: "caramel-2l-syrup", file: "syrup-caramel-2l.jpg" },
  { name: "Matcha", slug: "matcha-syrup", file: "syrup-matcha.jpg" },
  { name: "Salted Caramel", slug: "salted-caramel-syrup", file: "syrup-salted-caramel.jpg" },
  { name: "Pistachio", slug: "pistachio-syrup", file: "syrup-pistachio.jpg" },
  { name: "Earl Grey", slug: "earl-grey-syrup", file: "syrup-earl-grey.jpg" },
  { name: "Irish Cream", slug: "irish-cream-syrup", file: "syrup-irish-cream.jpg" },
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

const oldSlugs = ["almond", "irish-cream", "macadamia", "caramel", "vanilla"];
const del = await fetch(
  `${url}/rest/v1/products?slug=in.(${oldSlugs.join(",")})`,
  { method: "DELETE", headers }
);
if (!del.ok) {
  throw new Error(`Delete old syrups: ${del.status} ${await del.text()}`);
}
console.log("removed old pump-bottle syrups");

const rows = products.map((item) => ({
  name: item.name,
  slug: item.slug,
  image_src: `/images/${item.file}`,
  brand_id: brandId,
  category: "flavour",
  flavour_tab: "syrups",
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
console.log(`saved ${saved.length} syrup products`);
