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
    <main className="grow pt-28 pb-20">
      <article className="max-w-4xl mx-auto px-4 md:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          All articles
        </Link>
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted font-semibold mb-5">
            <span className="px-3 py-1 rounded-full bg-primary-soft text-primary">{post.category}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">{post.excerpt}</p>
        </header>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 mb-12">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            fetchPriority="high"
            className="object-cover"
          />
        </div>
        <div className="max-w-3xl mx-auto text-lg text-slate-700 leading-8">
          <ContentBody html={post.contentHtml} />
        </div>
        <footer className="max-w-3xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-2">
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
