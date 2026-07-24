import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPosts } from "@/lib/content";

export default function Blog() {
  const posts = getPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = posts.filter((post) => post.slug !== featured?.slug);
  const topics = [...new Set(posts.flatMap((post) => [post.category, ...post.tags]))];

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-28 pb-20 lg:px-8">
      {featured && (
        <section className="mb-16">
          <Link
            href={`/blog/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative min-h-75 overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 gap-5 bg-white">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wide shadow-sm shadow-primary/20">
                    FEATURED
                  </span>
                  <span className="text-text-muted text-xs font-semibold">
                    {formatPostDate(featured.date)}
                  </span>
                  <span className="text-text-muted text-xs font-semibold">•</span>
                  <span className="text-text-muted text-xs font-semibold">{featured.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-text-main">
                  {featured.title}
                </h1>
                <p className="text-text-muted text-lg leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                  Read Full Article
                  <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">new_releases</span>
              Latest Articles
            </h2>
          </div>
          {latest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latest.map((post) => (
                <article
                  key={post.slug}
                  className="group card-hover flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden"
                >
                  <Link href={`/blog/${post.slug}`} className="h-52 overflow-hidden relative">
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm text-text-main text-xs font-bold rounded-full shadow-sm">
                      {post.category}
                    </span>
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  <div className="flex flex-col flex-1 p-6 gap-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-muted font-medium">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {post.tags[0] ?? post.category}
                      </span>
                      <span>•</span>
                      <span>{formatPostDate(post.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-text-main group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-auto pt-4 flex items-center text-primary text-sm font-bold"
                    >
                      Read More
                      <span className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">More articles are coming soon.</p>
          )}
        </section>

        <aside className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tag</span>
              Explore Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-text-muted"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden bg-primary rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <span className="material-symbols-outlined mb-3">terminal</span>
              <h3 className="text-lg font-bold mb-2">Build-time content</h3>
              <p className="text-sm text-sky-100 leading-relaxed">
                Every article on this page is generated from versioned JSON during the static build.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
