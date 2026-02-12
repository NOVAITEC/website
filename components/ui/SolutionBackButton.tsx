"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SolutionBackButtonProps {
  hoverColor?: "teal" | "amber";
  className?: string;
}

export function SolutionBackButton({
  hoverColor = "teal",
  className = "mb-8",
}: SolutionBackButtonProps) {
  const [backHref, setBackHref] = useState("/#oplossing");

  useEffect(() => {
    try {
      const referrer = document.referrer;
      if (referrer) {
        const url = new URL(referrer);
        if (url.pathname === "/oplossingen" || url.pathname === "/oplossingen/") {
          setBackHref("/oplossingen");
        }
      }
    } catch {
      // ignore invalid referrer
    }
  }, []);

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
