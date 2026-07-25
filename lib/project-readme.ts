import path from "node:path";
import { Marked, Renderer } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Project } from "@/lib/content";

type GitHubRepository = {
  owner: string;
  repository: string;
};

function parseGitHubRepository(sourceUrl: string): GitHubRepository {
  let url: URL;

  try {
    url = new URL(sourceUrl);
  } catch {
    throw new Error(`Invalid GitHub source URL: ${sourceUrl}`);
  }

  if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) {
    throw new Error(`Project source must be a GitHub repository: ${sourceUrl}`);
  }

  const [owner, repositoryPart, ...rest] = url.pathname.split("/").filter(Boolean);
  const repository = repositoryPart?.replace(/\.git$/i, "");
  if (!owner || !repository || rest.length > 0) {
    throw new Error(`Project source must point to a GitHub repository root: ${sourceUrl}`);
  }

  return { owner, repository };
}

function normalizeRepositoryPath(value: string) {
  const [pathname, suffix = ""] = value.split(/(?=[?#])/u, 2);
  const normalized = path.posix.normalize(`/${pathname.replace(/^\.?\//u, "")}`).slice(1);
  return `${normalized}${suffix}`;
}

function resolveReadmeUrl(
  value: string | undefined,
  repository: GitHubRepository,
  kind: "image" | "link",
) {
  const url = value?.trim();
  if (!url) return "";
  if (kind === "link" && url.startsWith("#")) return url;
  if (url.startsWith("//")) return `https:${url}`;

  try {
    const absolute = new URL(url);
    if (["http:", "https:"].includes(absolute.protocol)) return absolute.href;
    if (kind === "link" && absolute.protocol === "mailto:") return absolute.href;
    return "";
  } catch {
    // Relative README references are resolved against the repository root below.
  }

  const repositoryPath = normalizeRepositoryPath(url);
  const encodedOwner = encodeURIComponent(repository.owner);
  const encodedRepository = encodeURIComponent(repository.repository);

  return kind === "image"
    ? `https://raw.githubusercontent.com/${encodedOwner}/${encodedRepository}/HEAD/${repositoryPath}`
    : `https://github.com/${encodedOwner}/${encodedRepository}/blob/HEAD/${repositoryPath}`;
}

function markdownToSafeHtml(markdown: string, repository: GitHubRepository) {
  const renderer = new Renderer();
  const marked = new Marked({ gfm: true, renderer });
  const rendered = marked.parse(markdown, { async: false }) as string;

  // The project page already owns the document h1, so README headings start at h2.
  const shiftedHeadings = rendered.replace(
    /<(\/?)h([1-6])(\s|>)/giu,
    (_match, closing: string, depth: string, ending: string) =>
      `<${closing}h${Math.min(Number(depth) + 1, 6)}${ending}`,
  );

  return sanitizeHtml(shiftedHeadings, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "strong",
      "em",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "figure",
      "img",
      "figcaption",
      "br",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "details",
      "summary",
      "input",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      th: ["align"],
      td: ["align"],
      details: ["open"],
      input: ["type", "checked", "disabled"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    transformTags: {
      a: (_tagName, attributes) => {
        const href = resolveReadmeUrl(attributes.href, repository, "link");
        const external = href.startsWith("http");

        return {
          tagName: "a",
          attribs: {
            ...(href ? { href } : {}),
            ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
          },
        };
      },
      img: (_tagName, attributes) => {
        const src = resolveReadmeUrl(attributes.src, repository, "image");

        return {
          tagName: "img",
          attribs: {
            ...(src ? { src } : {}),
            alt: attributes.alt?.trim() || "Project screenshot",
            loading: "lazy",
            ...(attributes.width ? { width: attributes.width } : {}),
            ...(attributes.height ? { height: attributes.height } : {}),
          },
        };
      },
      input: (_tagName, attributes) => ({
        tagName: "input",
        attribs: {
          type: "checkbox",
          disabled: "",
          ...(attributes.checked !== undefined ? { checked: "" } : {}),
        },
      }),
    },
  }).trim();
}

export async function getProjectReadmeHtml(project: Project) {
  const repository = parseGitHubRepository(project.sourceUrl);
  const encodedOwner = encodeURIComponent(repository.owner);
  const encodedRepository = encodeURIComponent(repository.repository);
  const readmeUrl =
    `https://raw.githubusercontent.com/${encodedOwner}/${encodedRepository}/HEAD/README.md`;

  let response: Response;
  try {
    response = await fetch(readmeUrl, {
      cache: "force-cache",
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    throw new Error(`Could not fetch README for ${project.title} (${readmeUrl})`, {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new Error(
      `Could not fetch README for ${project.title}: GitHub returned ${response.status}`,
    );
  }

  const markdown = await response.text();
  const html = markdownToSafeHtml(markdown, repository);
  if (!html) throw new Error(`README for ${project.title} did not contain renderable content`);

  return html;
}
