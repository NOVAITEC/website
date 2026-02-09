import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktische tips over AI-automatisering, workflow optimalisatie en slimmer werken voor MKB-ondernemers.",
  openGraph: {
    title: "Blog | NOVAITEC",
    description:
      "Praktische tips over AI-automatisering, workflow optimalisatie en slimmer werken voor MKB-ondernemers.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Terug naar home
          </Link>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
              <BookOpen className="w-6 h-6 text-teal" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
              Blog
            </h1>
          </div>

          <p className="text-slate-400 font-inter mb-12 max-w-2xl">
            Praktische inzichten over automatisering, AI en slimmer werken.
            Geschreven voor ondernemers die hun tijd terug willen.
          </p>

          {/* Posts */}
          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-slate-500 font-inter">
              Binnenkort verschijnen hier de eerste artikelen.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
