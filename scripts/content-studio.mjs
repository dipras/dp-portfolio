import http from "node:http";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const host = "127.0.0.1";
const port = Number(process.env.CONTENT_STUDIO_PORT || 4173);
const root = process.cwd();
const directories = {
  post: path.join(root, "content", "posts"),
  project: path.join(root, "content", "projects"),
};
const publicDirectory = path.join(root, "public");
const maxUploadBytes = 10 * 1024 * 1024;
const allowedImageTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/avif", ".avif"],
]);

const page = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Portfolio Content Studio</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, sans-serif; color: #0f172a; background: #f8fafc; }
    * { box-sizing: border-box; }
    body { margin: 0; }
    main { max-width: 1100px; margin: auto; padding: 40px 20px 80px; }
    header { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
    h1 { margin: 0 0 6px; font-size: clamp(28px, 5vw, 44px); }
    p { margin: 0; color: #64748b; }
    .layout { display: grid; grid-template-columns: 260px 1fr; gap: 24px; }
    .panel { background: white; border: 1px solid #e2e8f0; border-radius: 22px; padding: 20px; box-shadow: 0 12px 40px rgb(15 23 42 / .06); }
    .toolbar, .actions, .upload { display: flex; gap: 10px; align-items: center; }
    button, select, input, textarea { font: inherit; }
    button { border: 0; border-radius: 999px; padding: 10px 16px; font-weight: 700; cursor: pointer; }
    button.primary { background: #0369a1; color: white; }
    button.secondary { background: #e0f2fe; color: #0369a1; }
    #items { display: grid; gap: 8px; margin-top: 16px; }
    .item { width: 100%; text-align: left; border-radius: 12px; background: #f8fafc; color: #334155; }
    .item:hover { background: #e0f2fe; color: #0369a1; }
    form { display: grid; gap: 16px; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    label { display: grid; gap: 7px; color: #334155; font-size: 13px; font-weight: 700; }
    input, textarea, select { width: 100%; border: 1px solid #cbd5e1; border-radius: 12px; padding: 11px 13px; color: #0f172a; background: #fff; }
    input:focus, textarea:focus, select:focus { outline: 3px solid rgb(3 105 161 / .15); border-color: #0369a1; }
    input[type="file"] { padding: 8px; }
    textarea { min-height: 240px; resize: vertical; line-height: 1.6; }
    .field { display: grid; gap: 7px; }
    .field > span { color: #334155; font-size: 13px; font-weight: 700; }
    .upload { flex-wrap: wrap; padding: 12px; border-radius: 14px; background: #f8fafc; border: 1px dashed #cbd5e1; }
    .upload input[type="file"] { flex: 1 1 240px; }
    .upload input[type="text"] { flex: 1 1 180px; }
    #thumbnail-preview { width: 100%; max-height: 260px; object-fit: cover; border-radius: 14px; border: 1px solid #e2e8f0; }
    .hint { color: #64748b; font-size: 12px; font-weight: 500; }
    .checks { display: flex; gap: 20px; }
    .checks label { display: flex; align-items: center; gap: 8px; }
    .checks input { width: auto; }
    #status { min-height: 22px; color: #047857; font-weight: 700; }
    [hidden] { display: none !important; }
    @media (max-width: 760px) { .layout, .grid { grid-template-columns: 1fr; } header { align-items: start; flex-direction: column; } }
  </style>
</head>
<body>
<main>
  <header>
    <div><h1>Content Studio</h1><p>Writes versioned JSON. The public site stays fully static.</p></div>
    <div class="toolbar">
      <select id="kind"><option value="post">Posts</option><option value="project">Projects</option></select>
      <button class="secondary" id="new" type="button">New entry</button>
    </div>
  </header>
  <div class="layout">
    <aside class="panel"><strong>Existing entries</strong><div id="items"></div></aside>
    <section class="panel">
      <form id="form">
        <div class="grid">
          <label>Title<input name="title" required></label>
          <label>Slug<input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*"></label>
          <label>Category<input name="category" required></label>
          <label>Tags, comma separated<input name="tags"></label>
          <label class="post-only">Publish date<input name="date" type="date"></label>
          <label class="post-only">Reading time<input name="readTime" placeholder="6 min read"></label>
          <label class="project-only" hidden>Year<input name="year" type="number"></label>
          <label>Thumbnail URL<input name="image" placeholder="Optional for projects"></label>
          <label>Image alt text<input name="imageAlt"></label>
          <label class="project-only" hidden>Source URL<input name="sourceUrl" type="url"></label>
          <label class="project-only" hidden>Demo URL<input name="demoUrl" type="url"></label>
        </div>
        <div class="field">
          <span>Upload thumbnail</span>
          <div class="upload">
            <input id="thumbnail-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif">
            <button class="secondary" id="upload-thumbnail" type="button">Upload thumbnail</button>
          </div>
          <img id="thumbnail-preview" alt="Thumbnail preview" hidden>
          <span class="hint">JPEG, PNG, WebP, GIF, or AVIF. Maximum 10 MB.</span>
        </div>
        <label>Excerpt<textarea name="excerpt" required style="min-height:100px"></textarea></label>
        <label>Content blocks<textarea name="content" required placeholder="Separate paragraphs with one blank line. Uploaded images appear as ![alt](/uploads/...)."></textarea></label>
        <div class="field">
          <span>Insert image into content</span>
          <div class="upload">
            <input id="content-image-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif">
            <input id="content-image-alt" type="text" placeholder="Image description (alt text)">
            <button class="secondary" id="upload-content-image" type="button">Upload & insert</button>
          </div>
          <span class="hint">The image block is inserted at the current cursor position.</span>
        </div>
        <div class="checks">
          <label><input name="published" type="checkbox" checked> Published</label>
          <label><input name="featured" type="checkbox"> Featured</label>
        </div>
        <div class="actions"><button class="primary" type="submit">Save JSON</button><span id="status"></span></div>
      </form>
    </section>
  </div>
</main>
<script>
  const kind = document.querySelector("#kind");
  const form = document.querySelector("#form");
  const items = document.querySelector("#items");
  const status = document.querySelector("#status");
  const thumbnailPreview = document.querySelector("#thumbnail-preview");
  let collections = { post: [], project: [] };

  function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function serializeContent(blocks) {
    return (blocks || []).map((block) => {
      if (block.type === "image") return "![" + block.alt + "](" + block.src + ")";
      return block.text || "";
    }).join("\n\n");
  }

  function parseContent(value) {
    return value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean).map((part) => {
      const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      return image
        ? { type: "image", src: image[2], alt: image[1] || "Content image", caption: "" }
        : { type: "paragraph", text: part };
    });
  }

  function updateThumbnailPreview() {
    const source = form.elements.image.value.trim();
    thumbnailPreview.hidden = !source;
    if (source) thumbnailPreview.src = source;
  }

  function insertContentImage(source, alt) {
    const textarea = form.elements.content;
    const token = "![" + alt + "](" + source + ")";
    const before = textarea.value.slice(0, textarea.selectionStart).trimEnd();
    const after = textarea.value.slice(textarea.selectionEnd).trimStart();
    textarea.value = [before, token, after].filter(Boolean).join("\n\n");
    textarea.focus();
  }

  async function uploadImage(fileInput, slot) {
    const file = fileInput.files[0];
    const slug = form.elements.slug.value;
    if (!file) throw new Error("Choose an image first");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Set a valid slug before uploading");
    if (file.size > 10 * 1024 * 1024) throw new Error("Image must be 10 MB or smaller");

    const query = new URLSearchParams({ kind: kind.value, slug, slot });
    const response = await fetch("/api/upload?" + query, {
      method: "POST",
      headers: {
        "content-type": file.type,
        "x-file-name": encodeURIComponent(file.name)
      },
      body: file
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Upload failed");
    fileInput.value = "";
    return result.url;
  }

  function toggleFields() {
    document.querySelectorAll(".post-only").forEach((node) => node.hidden = kind.value !== "post");
    document.querySelectorAll(".project-only").forEach((node) => node.hidden = kind.value !== "project");
    form.elements.image.required = kind.value === "post";
    form.elements.date.required = kind.value === "post";
    form.elements.year.required = kind.value === "project";
    renderList();
  }

  function renderList() {
    items.replaceChildren();
    for (const entry of collections[kind.value]) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "item";
      button.textContent = entry.title;
      button.addEventListener("click", () => fill(entry));
      items.append(button);
    }
  }

  function fill(entry = {}) {
    form.reset();
    for (const element of form.elements) {
      if (!element.name) continue;
      if (element.type === "checkbox") element.checked = Boolean(entry[element.name]);
      else if (element.name === "tags") element.value = (entry.tags || []).join(", ");
      else if (element.name === "content") element.value = serializeContent(entry.content);
      else element.value = entry[element.name] ?? "";
    }
    if (!Object.keys(entry).length) form.elements.published.checked = true;
    updateThumbnailPreview();
    status.textContent = "";
  }

  async function load() {
    const response = await fetch("/api/content");
    collections = await response.json();
    renderList();
  }

  form.elements.title.addEventListener("blur", () => {
    if (!form.elements.slug.value) form.elements.slug.value = slugify(form.elements.title.value);
  });
  form.elements.image.addEventListener("input", updateThumbnailPreview);
  document.querySelector("#upload-thumbnail").addEventListener("click", async () => {
    try {
      status.textContent = "Uploading thumbnail…";
      form.elements.image.value = await uploadImage(document.querySelector("#thumbnail-file"), "thumbnail");
      updateThumbnailPreview();
      status.textContent = "Thumbnail uploaded. Save JSON to keep the reference.";
    } catch (error) {
      status.textContent = error.message;
    }
  });
  document.querySelector("#upload-content-image").addEventListener("click", async () => {
    try {
      status.textContent = "Uploading content image…";
      const input = document.querySelector("#content-image-file");
      const source = await uploadImage(input, "content");
      const altInput = document.querySelector("#content-image-alt");
      const alt = altInput.value.trim() || "Content image";
      insertContentImage(source, alt);
      altInput.value = "";
      status.textContent = "Image uploaded and inserted. Save JSON to keep the block.";
    } catch (error) {
      status.textContent = error.message;
    }
  });
  kind.addEventListener("change", () => { toggleFields(); fill(); });
  document.querySelector("#new").addEventListener("click", () => fill());
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Saving…";
    const data = Object.fromEntries(new FormData(form));
    data.kind = kind.value;
    data.tags = data.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    data.content = parseContent(data.content);
    data.published = form.elements.published.checked;
    data.featured = form.elements.featured.checked;
    if (kind.value === "project") data.year = Number(data.year);
    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) { status.textContent = result.error || "Could not save"; return; }
    status.textContent = "Saved to " + result.file;
    await load();
  });

  toggleFields();
  load().catch((error) => status.textContent = error.message);
</script>
</body>
</html>`;

function sendJson(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
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

async function saveUpload(request, searchParams) {
  const kind = searchParams.get("kind");
  const slug = searchParams.get("slug") ?? "";
  const slot = searchParams.get("slot");
  if (!(kind in directories)) throw new Error("Unknown content type");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
  if (!["thumbnail", "content"].includes(slot)) throw new Error("Invalid upload slot");

  const contentType = request.headers["content-type"]?.split(";")[0] ?? "";
  const extension = allowedImageTypes.get(contentType);
  if (!extension) throw new Error("Only JPEG, PNG, WebP, GIF, and AVIF images are allowed");

  const encodedName = request.headers["x-file-name"];
  if (!encodedName) throw new Error("Missing file name");
  const originalName = decodeURIComponent(encodedName);
  const stem =
    path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "image";
  const filename = `${stem}${extension}`;
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

  await mkdir(assetDirectory, { recursive: true });
  await writeFile(temporary, Buffer.concat(chunks));
  await rename(temporary, file);

  const url = `/uploads/${collection}/${slug}/${slot}/${filename}`;
  return { url, file: path.relative(root, file) };
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
  projects.sort((a, b) => b.year - a.year);
  return { post: posts, project: projects };
}

async function saveEntry(entry) {
  const kind = entry.kind;
  if (!(kind in directories)) throw new Error("Unknown content type");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug ?? "")) {
    throw new Error("Slug must use lowercase words separated by hyphens");
  }
  for (const field of ["title", "excerpt", "category"]) {
    if (!entry[field]?.trim()) throw new Error(`${field} is required`);
  }
  if (!Array.isArray(entry.content) || entry.content.length === 0) {
    throw new Error("At least one content block is required");
  }
  for (const block of entry.content) {
    if (block?.type === "paragraph" && block.text?.trim()) continue;
    if (block?.type === "image" && block.src?.trim() && block.alt?.trim()) continue;
    throw new Error("Content blocks must be valid paragraphs or images");
  }
  entry.tags = Array.isArray(entry.tags) ? entry.tags : [];
  if (kind === "post" && (!entry.date || !entry.image)) {
    throw new Error("Post date and image are required");
  }
  if (kind === "project" && !Number.isInteger(entry.year)) {
    throw new Error("Project year must be an integer");
  }

  const clean =
    kind === "post"
      ? {
          slug: entry.slug,
          title: entry.title.trim(),
          excerpt: entry.excerpt.trim(),
          date: entry.date,
          readTime: entry.readTime || "5 min read",
          category: entry.category.trim(),
          tags: entry.tags,
          image: entry.image || "",
          imageAlt: entry.imageAlt || entry.title,
          featured: entry.featured,
          published: entry.published,
          content: entry.content,
        }
      : {
          slug: entry.slug,
          title: entry.title.trim(),
          excerpt: entry.excerpt.trim(),
          year: entry.year,
          category: entry.category.trim(),
          tags: entry.tags,
          image: entry.image || "",
          imageAlt: entry.imageAlt || entry.title,
          featured: entry.featured,
          published: entry.published,
          sourceUrl: entry.sourceUrl || "",
          demoUrl: entry.demoUrl || "",
          content: entry.content,
        };

  const file = path.join(directories[kind], `${clean.slug}.json`);
  const temporary = `${file}.tmp`;
  await writeFile(temporary, `${JSON.stringify(clean, null, 2)}\n`, "utf8");
  await rename(temporary, file);
  return path.relative(root, file);
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://${host}:${port}`);

    if (request.method === "GET" && url.pathname === "/") {
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      response.end(page);
      return;
    }
    if (request.method === "GET" && url.pathname.startsWith("/uploads/")) {
      const file = safeAssetPath(url.pathname);
      const extension = path.extname(file).toLowerCase();
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
      response.end(await readFile(file));
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
        if (body.length > 1_000_000) throw new Error("Request is too large");
      }
      const file = await saveEntry(JSON.parse(body));
      sendJson(response, 200, { ok: true, file });
      return;
    }
    sendJson(response, 404, { error: "Not found" });
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : "Unknown error" });
  }
});

server.listen(port, host, () => {
  console.log(`Content Studio: http://${host}:${port}`);
  console.log("Press Ctrl+C to stop.");
});
