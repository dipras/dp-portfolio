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
  return project ? { title: project.title, description: project.excerpt } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <main className="grow pt-28 pb-20">
      <article className="max-w-5xl mx-auto px-4 md:px-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          All projects
        </Link>
        <header className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-text-muted mb-5">
              <span className="px-3 py-1 rounded-full bg-primary-soft text-primary">{project.category}</span>
              <span>{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main leading-tight mb-5">
              {project.title}
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">{project.excerpt}</p>
          </div>
          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                className="px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/20"
              >
                Live demo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                className="px-6 py-3 rounded-full bg-slate-100 text-text-main font-bold"
              >
                Source
              </a>
            )}
          </div>
        </header>

        {project.image ? (
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 mb-12">
            <Image src={project.image} alt={project.imageAlt} fill priority className="object-cover" />
          </div>
        ) : (
          <div className="relative aspect-video rounded-3xl bg-slate-900 overflow-hidden flex items-center justify-center mb-12">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-size-[16px_16px]" />
            <span className="material-symbols-outlined text-8xl text-primary">terminal</span>
          </div>
        )}

        <div className="grid md:grid-cols-[1fr_15rem] gap-12 max-w-4xl mx-auto">
          <div className="text-lg text-slate-700 leading-8">
            <ContentBody blocks={project.content} />
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
