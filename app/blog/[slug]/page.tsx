import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { Header } from "@/components/layout/Header";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Kyan Cordes"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const wordCount = post.content.split(/\s+/).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    wordCount,
    inLanguage: "nl-NL",
    image: `https://novaitec.nl/blog/${slug}/opengraph-image`,
    author: {
      "@type": "Person",
      name: "Kyan Cordes",
      url: "https://linkedin.com/in/kyancordes",
      jobTitle: "Oprichter",
      worksFor: {
        "@type": "Organization",
        name: "NOVAITEC",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "NOVAITEC",
      url: "https://novaitec.nl",
      logo: {
        "@type": "ImageObject",
        url: "https://novaitec.nl/images/novaitec_logo_transparant_kleur.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://novaitec.nl/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    isAccessibleForFree: true,
  };

  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar blog
          </Link>

          {/* Article Header */}
          <article>
            <header className="mb-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs font-mono bg-teal/10 text-teal px-2 py-1 rounded"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-slate-400 font-inter text-base sm:text-lg mb-6">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-slate-500 font-inter pb-8 border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} leestijd
                </span>
              </div>
            </header>

            {/* Content */}
            <div className="prose-novaitec">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>
          </article>

          {/* Author Box */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center">
                <span className="text-teal font-montserrat font-bold">KC</span>
              </div>
              <div>
                <p className="text-paper font-montserrat font-semibold">
                  Kyan Cordes
                </p>
                <p className="text-slate-500 text-sm font-inter">
                  Oprichter NOVAITEC
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
