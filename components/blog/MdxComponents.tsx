import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2
      className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mt-10 mb-4"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-lg sm:text-xl font-montserrat font-semibold text-paper mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-slate-300 font-inter text-sm sm:text-base leading-relaxed mb-4"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-400 mb-4 ml-2"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-400 mb-4 ml-2"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-slate-400 font-inter" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-slate-200 font-semibold" {...props}>
      {children}
    </strong>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href || "#"} className="text-teal hover:underline" {...props}>
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-teal/50 pl-4 my-6 text-slate-400 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-slate-800 text-teal px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  hr: () => <hr className="border-slate-800 my-8" />,
};
