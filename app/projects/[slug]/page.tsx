import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentBody from "@/components/ContentBody";
import { getProject, getProjects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const images = project.image
    ? [{ url: project.image, alt: project.imageAlt }]
    : undefined;

  return {
    title: project.title,
    description: project.excerpt,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "website",
      url: `/projects/${project.slug}`,
      title: project.title,
      description: project.excerpt,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.excerpt,
      images,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const hasDistinctDemo = Boolean(
    project.demoUrl && project.demoUrl !== project.sourceUrl,
  );
  const repositoryUrl = project.sourceUrl || (!hasDistinctDemo ? project.demoUrl : "");

  return (
    <main className="grow pt-24 pb-16 md:pt-28 md:pb-20">
      <article className="max-w-5xl mx-auto px-5 md:px-8">
        <Link
          href="/projects"
          className="mb-8 hidden items-center gap-1.5 text-sm font-bold text-primary md:inline-flex"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          All projects
        </Link>

        <div className="flex flex-col">
          <header className="order-1">
            <div className="mb-3 flex flex-wrap items-center gap-2.5 text-sm font-semibold text-text-muted md:mb-5">
              <span className="px-3 py-1 rounded-full bg-primary-soft text-primary">{project.category}</span>
              <span aria-hidden="true" className="text-slate-300">•</span>
              <span>{project.year}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-text-main md:text-6xl md:leading-tight">
              {project.title}
            </h1>
          </header>

          {project.image ? (
            <div className="relative order-2 mt-6 aspect-video overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50 md:order-3 md:mb-12 md:mt-10 md:rounded-3xl md:shadow-xl md:shadow-slate-200/60">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                fetchPriority="high"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative order-2 mt-6 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-slate-900 md:order-3 md:mb-12 md:mt-10 md:rounded-3xl">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-size-[16px_16px]" />
              <span className="material-symbols-outlined text-8xl text-primary">terminal</span>
            </div>
          )}

          <div className="order-3 mb-10 mt-6 flex flex-col gap-5 md:order-2 md:mb-0 md:mt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <p className="max-w-3xl text-lg leading-7 text-text-muted md:text-xl md:leading-relaxed">
              {project.excerpt}
            </p>
            <div className="flex w-full shrink-0 flex-wrap gap-3 sm:w-auto">
              {hasDistinctDemo && (
                <a
                  href={project.demoUrl}
                  className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-5 py-3 text-center font-bold text-white shadow-md shadow-primary/15 transition-colors hover:bg-primary-hover sm:flex-none md:px-6"
                >
                  Live demo
                </a>
              )}
              {repositoryUrl && (
                <a
                  href={repositoryUrl}
                  className={`flex min-h-12 flex-1 items-center justify-center rounded-full px-5 py-3 text-center font-bold transition-colors sm:flex-none md:px-6 ${
                    hasDistinctDemo
                      ? "bg-slate-100 text-text-main hover:bg-slate-200"
                      : "bg-primary text-white shadow-md shadow-primary/15 hover:bg-primary-hover"
                  }`}
                >
                  {hasDistinctDemo ? "Source code" : "View repository"}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1fr_15rem] md:gap-12">
          <div className="text-base leading-7 text-slate-700 md:text-lg md:leading-8">
            <ContentBody html={project.contentHtml} />
          </div>
          <aside>
            <h2 className="font-bold text-text-main mb-3">Built with</h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
