import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const collections = [
  {
    name: "posts",
    directory: path.join(root, "content", "posts"),
    required: ["slug", "title", "excerpt", "date", "readTime", "category", "tags", "image", "imageAlt", "content"],
  },
  {
    name: "projects",
    directory: path.join(root, "content", "projects"),
    required: ["slug", "title", "excerpt", "year", "category", "tags", "imageAlt", "content"],
  },
];

let hasErrors = false;

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
    if (!Array.isArray(item.content) || item.content.some((paragraph) => typeof paragraph !== "string")) {
      console.error(`${label}: content must be an array of paragraphs`);
      hasErrors = true;
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
  }
}

if (hasErrors) process.exit(1);
console.log("Content JSON is valid.");
