import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentBody from "@/components/ContentBody";
import { formatPostDate, getPost, getPosts } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  const images = [{ url: post.image, alt: post.imageAlt }];

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
      authors: ["Aldy Prastyo"],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="grow pt-24 pb-16 md:pt-28 md:pb-20">
      <article className="max-w-4xl mx-auto px-5 md:px-8">
        <Link
          href="/blog"
          className="mb-8 hidden items-center gap-1.5 text-sm font-bold text-primary md:inline-flex"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          All articles
        </Link>

        <div className="flex flex-col">
          <header className="order-1">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-text-muted sm:text-sm md:mb-5 md:gap-3">
              <span className="rounded-full bg-primary-soft px-3 py-1 text-primary">{post.category}</span>
              <span>{formatPostDate(post.date)}</span>
              <span aria-hidden="true" className="text-slate-300">•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-text-main md:text-6xl md:leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="relative order-2 mt-6 aspect-video overflow-hidden rounded-2xl shadow-lg shadow-slate-200/50 md:order-3 md:mb-12 md:mt-10 md:rounded-3xl md:shadow-xl md:shadow-slate-200/60">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              fetchPriority="high"
              className="object-cover"
            />
          </div>

          <p className="order-3 mb-10 mt-6 text-lg leading-7 text-text-muted md:order-2 md:mb-0 md:mt-5 md:text-xl md:leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-base leading-7 text-slate-700 md:text-lg md:leading-8">
          <ContentBody html={post.contentHtml} />
        </div>
        <footer className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2 border-t border-slate-200 pt-7 md:mt-12 md:pt-8">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">
              {tag}
            </span>
          ))}
        </footer>
      </article>
    </main>
  );
}
