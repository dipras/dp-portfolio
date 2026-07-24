import Image from "next/image";
import Link from "next/link";
import { getProjects, type Project } from "@/lib/content";

function ProjectVisual({ project, featured = false }: { project: Project; featured?: boolean }) {
  if (project.image) {
    return (
      <div className={`relative overflow-hidden ${featured ? "min-h-80 h-full" : "h-56"}`}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative bg-slate-900 flex items-center justify-center overflow-hidden ${
        featured ? "min-h-80 h-full" : "h-56"
      }`}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] bg-size-[16px_16px]" />
      <span className="material-symbols-outlined text-7xl text-slate-700 group-hover:text-primary transition-colors duration-500">
        terminal
      </span>
    </div>
  );
}

export default function Projects() {
  const projects = getProjects();
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.slug !== featured?.slug);
  const categories = [...new Set(projects.map((project) => project.category))];

  return (
    <main className="grow pt-28 pb-20">
      <div className="max-w-300 mx-auto px-4 md:px-10 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider mb-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main">Selected Works</h1>
            <p className="text-text-muted text-lg md:text-xl font-medium leading-relaxed max-w-lg">
              Exploring the intersection of web, mobile, and low-level systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {["All", ...categories].map((category, index) => (
              <span
                key={category}
                className={`h-10 px-6 rounded-full text-sm font-semibold inline-flex items-center ${
                  index === 0
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white border border-border text-text-muted"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {featured && (
          <article className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-card shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 gap-6 order-2 md:order-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wide">
                  Featured Project
                </span>
                <span className="text-xs font-semibold text-text-muted">{featured.year}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-text-muted text-base leading-relaxed">{featured.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${featured.slug}`}
                className="w-fit flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-text-main text-white font-semibold text-sm hover:bg-primary transition-colors shadow-lg shadow-slate-900/10"
              >
                View Case Study
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <ProjectVisual project={featured} featured />
            </div>
          </article>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              <ProjectVisual project={project} />
              <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h2>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-3">{project.excerpt}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    View Project
                    <span className="material-symbols-outlined text-base">arrow_outward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
