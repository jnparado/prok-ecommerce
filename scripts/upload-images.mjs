import { readdir, readFile } from "node:fs/promises";
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
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
}

const mimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

const bucket = "images";
const imagesDir = join(root, "public/images");
const files = (await readdir(imagesDir)).filter((name) => mimeTypes[extname(name).toLowerCase()]);

const headers = {
  Authorization: `Bearer ${serviceKey}`,
  apikey: serviceKey,
};

async function storageFetch(path, init = {}) {
  const response = await fetch(`${url}/storage/v1${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { message: text };
  }
  if (!response.ok) {
    const message = json?.message || json?.error || text || response.statusText;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return json;
}

const buckets = await storageFetch("/bucket");
const exists = Array.isArray(buckets) && buckets.some((item) => item.id === bucket);
if (!exists) {
  await storageFetch("/bucket", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: bucket,
      name: bucket,
      public: true,
      file_size_limit: 15728640,
      allowed_mime_types: [...new Set(Object.values(mimeTypes))],
    }),
  });
  console.log(`Created public bucket: ${bucket}`);
} else {
  console.log(`Using existing bucket: ${bucket}`);
}

const concurrency = 6;
let uploaded = 0;
let failed = 0;
const errors = [];

async function uploadOne(name) {
  const body = await readFile(join(imagesDir, name));
  const contentType = mimeTypes[extname(name).toLowerCase()];
  try {
    const response = await fetch(
      `${url}/storage/v1/object/${bucket}/${encodeURIComponent(name)}`,
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
      const text = await response.text();
      throw new Error(text || response.statusText);
    }
    uploaded += 1;
  } catch (error) {
    failed += 1;
    errors.push(`${name}: ${error.message}`);
  }
}

for (let i = 0; i < files.length; i += concurrency) {
  await Promise.all(files.slice(i, i + concurrency).map(uploadOne));
  process.stdout.write(`\rUploaded ${Math.min(i + concurrency, files.length)}/${files.length}`);
}

process.stdout.write("\n");
console.log(`Done. uploaded=${uploaded} failed=${failed} total=${files.length}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Public URL example:\n${url}/storage/v1/object/public/${bucket}/${files[0]}`
);
