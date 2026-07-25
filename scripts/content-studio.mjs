import http from "node:http";
import { access, mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import {
  contentHasMeaningfulValue,
  sanitizeContentHtml,
} from "./content-sanitizer.mjs";

const host = "127.0.0.1";
const port = Number(process.env.CONTENT_STUDIO_PORT || 4173);
const root = process.cwd();
const studioPageFile = path.join(root, "scripts", "content-studio.html");
const directories = {
  post: path.join(root, "content", "posts"),
  project: path.join(root, "content", "projects"),
};
const publicDirectory = path.join(root, "public");
const maxUploadBytes = 10 * 1024 * 1024;
const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

function sendJson(response, status, value) {
  const body = JSON.stringify(value);
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(body);
}

function safeAssetPath(urlPath) {
  const relative = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const file = path.resolve(publicDirectory, relative);
  const insidePublic = path.relative(publicDirectory, file);
  if (insidePublic.startsWith("..") || path.isAbsolute(insidePublic)) {
    throw new Error("Invalid asset path");
  }
  return file;
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function saveUpload(request, searchParams) {
  const kind = searchParams.get("kind");
  const slug = searchParams.get("slug") ?? "";
  const slot = searchParams.get("slot");
  if (!(kind in directories)) throw new Error("Unknown content type");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Set a valid slug before uploading");
  if (!["thumbnail", "content"].includes(slot)) throw new Error("Invalid upload slot");

  const contentType = request.headers["content-type"]?.split(";")[0] ?? "";
  if (!allowedImageTypes.has(contentType)) {
    throw new Error("Only JPEG, PNG, WebP, GIF, and AVIF images are allowed");
  }

  const filename = `${Date.now()}.webp`;
  const collection = kind === "post" ? "posts" : "projects";
  const assetDirectory = path.join(publicDirectory, "uploads", collection, slug, slot);
  const file = path.join(assetDirectory, filename);
  const temporary = `${file}.tmp`;

  const declaredSize = Number(request.headers["content-length"] || 0);
  if (declaredSize > maxUploadBytes) throw new Error("Image must be 10 MB or smaller");

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxUploadBytes) throw new Error("Image must be 10 MB or smaller");
    chunks.push(chunk);
  }
  if (size === 0) throw new Error("Uploaded image is empty");

  const original = Buffer.concat(chunks);
  let uploaded;
  try {
    if (contentType === "image/webp") {
      const metadata = await sharp(original, {
        animated: true,
        limitInputPixels: 40_000_000,
      }).metadata();
      if (metadata.format !== "webp") throw new Error("Invalid WebP image");
      uploaded = original;
    } else {
      uploaded = await sharp(original, {
        animated: true,
        limitInputPixels: 40_000_000,
      })
        .rotate()
        .webp({ quality: 84, effort: 4 })
        .toBuffer();
    }
  } catch {
    throw new Error("The uploaded file could not be decoded as an image");
  }

  await mkdir(assetDirectory, { recursive: true });
  await writeFile(temporary, uploaded);
  await rename(temporary, file);

  const url = `/uploads/${collection}/${slug}/${slot}/${filename}`;
  return {
    url,
    file: path.relative(root, file),
    originalBytes: original.length,
    uploadedBytes: uploaded.length,
  };
}

async function readCollections() {
  const load = async (directory) => {
    const filenames = (await readdir(directory)).filter((filename) => filename.endsWith(".json"));
    return Promise.all(
      filenames.map((filename) => readFile(path.join(directory, filename), "utf8").then(JSON.parse)),
    );
  };
  const [posts, projects] = await Promise.all([load(directories.post), load(directories.project)]);
  posts.sort((a, b) => b.date.localeCompare(a.date));
  projects.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  return { post: posts, project: projects };
}

function requireText(entry, field) {
  if (typeof entry[field] !== "string" || !entry[field].trim()) {
    throw new Error(`${field} is required`);
  }
}

async function saveEntry(entry) {
  const kind = entry.kind;
  if (!(kind in directories)) throw new Error("Unknown content type");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug ?? "")) {
    throw new Error("Slug must use lowercase words separated by hyphens");
  }
  if (entry.originalSlug && entry.originalSlug !== entry.slug) {
    throw new Error("Slug is locked after the first save");
  }

  for (const field of ["title", "excerpt", "category"]) requireText(entry, field);
  const contentHtml = kind === "post" ? sanitizeContentHtml(entry.contentHtml) : "";
  if (kind === "post" && !contentHasMeaningfulValue(contentHtml)) {
    throw new Error("Article content is required");
  }
  entry.tags = Array.isArray(entry.tags)
    ? entry.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : [];

  if (kind === "post" && (!entry.date || !entry.image)) {
    throw new Error("Post date and thumbnail are required");
  }
  if (kind === "project" && !Number.isInteger(entry.year)) {
    throw new Error("Project year must be an integer");
  }
  if (kind === "project") {
    requireText(entry, "sourceUrl");
    try {
      const source = new URL(entry.sourceUrl);
      const segments = source.pathname.split("/").filter(Boolean);
      if (
        !["github.com", "www.github.com"].includes(source.hostname.toLowerCase()) ||
        segments.length !== 2
      ) {
        throw new Error();
      }
    } catch {
      throw new Error("sourceUrl must point to a GitHub repository root");
    }
  }

  const clean =
    kind === "post"
      ? {
          slug: entry.slug,
          title: entry.title.trim(),
          excerpt: entry.excerpt.trim(),
          date: entry.date,
          readTime: entry.readTime?.trim() || "5 min read",
          category: entry.category.trim(),
          tags: entry.tags,
          image: entry.image || "",
          imageAlt: entry.imageAlt?.trim() || entry.title.trim(),
          featured: Boolean(entry.featured),
          published: Boolean(entry.published),
          contentHtml,
        }
      : {
          slug: entry.slug,
          title: entry.title.trim(),
          excerpt: entry.excerpt.trim(),
          year: entry.year,
          category: entry.category.trim(),
          tags: entry.tags,
          image: entry.image || "",
          imageAlt: entry.imageAlt?.trim() || entry.title.trim(),
          featured: Boolean(entry.featured),
          published: Boolean(entry.published),
          sourceUrl: entry.sourceUrl?.trim() || "",
          demoUrl: entry.demoUrl?.trim() || "",
        };

  const file = path.join(directories[kind], `${clean.slug}.json`);
  if (!entry.originalSlug && (await fileExists(file))) {
    throw new Error(`The slug "${clean.slug}" already exists`);
  }

  const temporary = `${file}.tmp`;
  await writeFile(temporary, `${JSON.stringify(clean, null, 2)}\n`, "utf8");
  await rename(temporary, file);
  return { file: path.relative(root, file), entry: clean };
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${host}:${port}`);

    if (request.method === "GET" && url.pathname === "/") {
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      response.end(await readFile(studioPageFile));
      return;
    }
    if (request.method === "GET" && url.pathname.startsWith("/uploads/")) {
      const file = safeAssetPath(url.pathname);
      const extension = path.extname(file).toLowerCase();
      const content = await readFile(file);
      const contentTypes = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".avif": "image/avif",
      };
      response.writeHead(200, {
        "content-type": contentTypes[extension] ?? "application/octet-stream",
        "cache-control": "no-cache",
      });
      response.end(content);
      return;
    }
    if (request.method === "GET" && url.pathname === "/api/content") {
      sendJson(response, 200, await readCollections());
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/upload") {
      sendJson(response, 200, await saveUpload(request, url.searchParams));
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/content") {
      let body = "";
      for await (const chunk of request) {
        body += chunk;
        if (body.length > 2_000_000) throw new Error("Request is too large");
      }
      const result = await saveEntry(JSON.parse(body));
      sendJson(response, 200, { ok: true, ...result });
      return;
    }
    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    if (response.headersSent || response.writableEnded) {
      console.error("Content Studio request failed after the response started:", error);
      if (!response.writableEnded) response.end();
      return;
    }

    const missingAsset = error?.code === "ENOENT";
    const status = missingAsset ? 404 : 400;
    sendJson(response, status, {
      error: missingAsset
        ? "Asset not found"
        : error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Content Studio is already running at http://${host}:${port}`);
    process.exit(1);
  }
  throw error;
});

server.listen(port, host, () => {
  console.log(`Content Studio: http://${host}:${port}`);
  console.log("Press Ctrl+C to stop.");
});
