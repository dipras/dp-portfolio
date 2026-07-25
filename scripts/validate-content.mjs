import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import {
  contentHasMeaningfulValue,
  extractImageSources,
  sanitizeContentHtml,
} from "./content-sanitizer.mjs";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const collections = [
  {
    name: "posts",
    directory: path.join(root, "content", "posts"),
    required: ["slug", "title", "excerpt", "date", "readTime", "category", "tags", "image", "imageAlt", "contentHtml"],
  },
  {
    name: "projects",
    directory: path.join(root, "content", "projects"),
    required: ["slug", "title", "excerpt", "year", "category", "tags", "imageAlt", "sourceUrl"],
  },
];

let hasErrors = false;

async function validateLocalAsset(label, value) {
  if (typeof value !== "string" || !value.startsWith("/")) return;

  const file = path.resolve(publicDirectory, value.replace(/^\/+/, ""));
  const relative = path.relative(publicDirectory, file);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    console.error(`${label}: asset path escapes the public directory`);
    hasErrors = true;
    return;
  }

  try {
    await access(file);
  } catch {
    console.error(`${label}: referenced asset does not exist (${value})`);
    hasErrors = true;
  }
}

for (const collection of collections) {
  let filenames;
  try {
    filenames = (await readdir(collection.directory)).filter((filename) => filename.endsWith(".json"));
  } catch (error) {
    console.error(`${collection.name}: cannot read directory (${error.message})`);
    hasErrors = true;
    continue;
  }

  const slugs = new Set();
  for (const filename of filenames) {
    const file = path.join(collection.directory, filename);
    const label = path.relative(root, file);
    let item;

    try {
      item = JSON.parse(await readFile(file, "utf8"));
    } catch (error) {
      console.error(`${label}: invalid JSON (${error.message})`);
      hasErrors = true;
      continue;
    }

    if (!item || Array.isArray(item) || typeof item !== "object") {
      console.error(`${label}: root value must be one JSON object`);
      hasErrors = true;
      continue;
    }

    for (const field of collection.required) {
      if (item[field] === undefined || item[field] === "") {
        console.error(`${label}: "${field}" is required`);
        hasErrors = true;
      }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug ?? "")) {
      console.error(`${label}: slug must use lowercase words separated by hyphens`);
      hasErrors = true;
    }
    if (path.basename(filename, ".json") !== item.slug) {
      console.error(`${label}: filename must match slug "${item.slug}.json"`);
      hasErrors = true;
    }
    if (slugs.has(item.slug)) {
      console.error(`${label}: duplicate slug "${item.slug}"`);
      hasErrors = true;
    }
    slugs.add(item.slug);
    if (collection.name === "posts") {
      if (typeof item.contentHtml !== "string" || !contentHasMeaningfulValue(item.contentHtml)) {
        console.error(`${label}: contentHtml must contain text or an image`);
        hasErrors = true;
      } else {
        const sanitized = sanitizeContentHtml(item.contentHtml);
        if (sanitized !== item.contentHtml.trim()) {
          console.error(`${label}: contentHtml contains unsupported or unsafe markup; save it through Content Studio`);
          hasErrors = true;
        }
        for (const source of extractImageSources(sanitized)) {
          await validateLocalAsset(`${label}: content image`, source);
        }
      }
    }
    if (!Array.isArray(item.tags)) {
      console.error(`${label}: tags must be an array`);
      hasErrors = true;
    }
    if (collection.name === "posts" && !/^\d{4}-\d{2}-\d{2}$/.test(item.date ?? "")) {
      console.error(`${label}: date must use YYYY-MM-DD`);
      hasErrors = true;
    }
    if (collection.name === "projects" && !Number.isInteger(item.year)) {
      console.error(`${label}: year must be an integer`);
      hasErrors = true;
    }
    if (collection.name === "projects") {
      try {
        const source = new URL(item.sourceUrl);
        const segments = source.pathname.split("/").filter(Boolean);
        if (
          !["github.com", "www.github.com"].includes(source.hostname.toLowerCase()) ||
          segments.length !== 2
        ) {
          throw new Error();
        }
      } catch {
        console.error(`${label}: sourceUrl must point to a GitHub repository root`);
        hasErrors = true;
      }
    }
    await validateLocalAsset(`${label}: thumbnail`, item.image);
  }
}

if (hasErrors) process.exit(1);
console.log("Content JSON is valid.");
