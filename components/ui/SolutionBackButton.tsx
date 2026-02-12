"use client";

import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SolutionBackButtonProps {
  hoverColor?: "teal" | "amber";
  className?: string;
}

function SolutionBackButtonInner({
  hoverColor = "teal",
  className = "mb-8",
}: SolutionBackButtonProps) {
  const searchParams = useSearchParams();
  const fromOverview = searchParams.get("from") === "overview";
  const backHref = fromOverview ? "/oplossingen" : "/#oplossing";

  const hoverClass =
    hoverColor === "amber" ? "hover:text-amber" : "hover:text-teal";

  return (
    <Link
      href={backHref}
      className={`inline-flex items-center gap-2 text-slate-400 ${hoverClass} transition-colors ${className} font-inter text-sm`}
    >
      <ArrowLeft className="w-4 h-4" />
      Terug naar oplossingen
    </Link>
  );
}

export function SolutionBackButton(props: SolutionBackButtonProps) {
  return (
    <Suspense
      fallback={
        <Link
          href="/#oplossing"
          className={`inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors ${props.className ?? "mb-8"} font-inter text-sm`}
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar oplossingen
        </Link>
      }
    >
      <SolutionBackButtonInner {...props} />
    </Suspense>
  );
}
