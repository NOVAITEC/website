"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  FileText,
  Share2,
  Mail,
  BarChart3,
  TrendingUp,
  Workflow,
  Bot,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const categories = [
  {
    title: "Workflow Automatisering",
    subtitle: "Repetitieve processen volledig automatisch",
    icon: Workflow,
    color: "teal" as const,
    solutions: [
      {
        title: "Auto Import Adviseur",
        description: "Scrapet Duitse auto's, vergelijkt marktwaarden en berekent of import rendabel is.",
        icon: Car,
        href: "/oplossingen/auto-import",
      },
      {
        title: "Factuur & Offerte Automaat",
        description: "Genereert offertes, stuurt facturen en bewaakt betalingen automatisch.",
        icon: FileText,
        href: "/oplossingen/factuur-offerte",
      },
    ],
  },
  {
    title: "AI Agents",
    subtitle: "Slimme assistenten die taken overnemen",
    icon: Bot,
    color: "teal" as const,
    solutions: [
      {
        title: "Social Media Autopilot",
        description: "Scant nieuws, genereert content met afbeelding en publiceert automatisch.",
        icon: Share2,
        href: "/oplossingen/social-media",
      },
      {
        title: "Persoonlijke Email Assistent",
        description: "Leert jouw schrijfstijl, beantwoordt mails en plant follow-ups.",
        icon: Mail,
        href: "/oplossingen/email-assistent",
      },
    ],
  },
  {
    title: "Slimme Dashboards",
    subtitle: "Al je data op één plek, real-time inzicht",
    icon: LayoutDashboard,
    color: "amber" as const,
    solutions: [
      {
        title: "Business Intelligence",
        description: "Live omzet, cashflow forecast, klantanalyse en automatische alerts.",
        icon: BarChart3,
        href: "/oplossingen/business-intelligence",
      },
      {
        title: "Marketing Performance Hub",
        description: "ROI per kanaal, funnel analyse, A/B test resultaten en posting heatmap.",
        icon: TrendingUp,
        href: "/oplossingen/marketing-dashboard",
      },
    ],
  },
  {
    title: "Demo Applicaties",
    subtitle: "Interactieve voorbeelden van maatwerk software",
    icon: Smartphone,
    color: "teal" as const,
    solutions: [
      {
        title: "Boodschappen App",
        description: "Volledig werkende boodschappenlijst met categorieën, localStorage en dark mode.",
        icon: ShoppingCart,
        href: "/demo/boodschappen",
      },
    ],
  },
];

export default function OplossingenPage() {
  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar home
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper mb-4">
              Oplossingen
            </h1>
            <p className="text-slate-400 font-inter max-w-2xl mb-12">
              Bekijk interactieve demo&apos;s van wat ik bouw. Elke oplossing wordt op maat gemaakt
              voor jouw bedrijf &mdash; dit zijn voorbeelden van wat er mogelijk is.
            </p>
          </motion.div>

          <div className="space-y-12">
            {categories.map((cat, ci) => {
              const CatIcon = cat.icon;
              const isTeal = cat.color === "teal";

              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.15, duration: 0.5 }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${isTeal ? "bg-teal/10" : "bg-amber/10"}`}>
                      <CatIcon className={`w-5 h-5 ${isTeal ? "text-teal" : "text-amber"}`} />
                    </div>
                    <div>
                      <h2 className="font-montserrat font-bold text-white text-lg">{cat.title}</h2>
                      <p className="text-xs text-slate-500 font-inter">{cat.subtitle}</p>
                    </div>
                  </div>

                  {/* Solution cards */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cat.solutions.map((sol, si) => {
                      const SolIcon = sol.icon;
                      return (
                        <Link
                          key={sol.title}
                          href={sol.href}
                          className="group"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ci * 0.15 + si * 0.08 + 0.1 }}
                            className={`h-full rounded-xl border bg-white/[0.02] p-5 sm:p-6 transition-all duration-300 ${
                              isTeal
                                ? "border-white/10 hover:border-teal/40 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.2)]"
                                : "border-white/10 hover:border-amber/40 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.2)]"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                isTeal ? "bg-teal/10" : "bg-amber/10"
                              }`}>
                                <SolIcon className={`w-5 h-5 ${isTeal ? "text-teal" : "text-amber"}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-montserrat font-bold text-white text-sm mb-1.5">
                                  {sol.title}
                                </h3>
                                <p className="text-xs text-slate-400 font-inter leading-relaxed mb-4">
                                  {sol.description}
                                </p>
                                <span className={`inline-flex items-center gap-1.5 text-xs font-inter font-medium transition-colors ${
                                  isTeal ? "text-teal group-hover:text-cyan-300" : "text-amber group-hover:text-yellow-300"
                                }`}>
                                  Bekijk demo
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 font-inter mb-2 text-sm">
              Mis je een oplossing? Ik bouw het op maat.
            </p>
            <p className="text-slate-500 font-inter mb-6 text-xs">
              Van idee tot werkend product &mdash; vertel me wat je nodig hebt.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-shadow"
            >
              Neem contact op
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
