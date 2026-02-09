import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-teal/30 transition-all duration-300"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono bg-teal/10 text-teal px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-xl font-montserrat font-bold text-paper mb-3 group-hover:text-teal transition-colors">
        {post.title}
      </h2>

      {/* Description */}
      <p className="text-slate-400 font-inter text-sm leading-relaxed mb-4">
        {post.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500 font-inter">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} leestijd
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
