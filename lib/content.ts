import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

export type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  published: boolean;
  content: ContentBlock[];
};

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  year: number;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  featured: boolean;
  published: boolean;
  sourceUrl: string;
  demoUrl: string;
  content: ContentBlock[];
};

function loadCollection<T>(directory: "posts" | "projects") {
  const contentDirectory = path.join(process.cwd(), "content", directory);

  return readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => {
      const file = path.join(contentDirectory, entry.name);
      return JSON.parse(readFileSync(file, "utf8")) as T;
    });
}

export function getPosts() {
  return loadCollection<Post>("posts")
    .filter((post) => post.published)
    .toSorted((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function getProjects() {
  return loadCollection<Project>("projects")
    .filter((project) => project.published)
    .toSorted((a, b) => b.year - a.year);
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
