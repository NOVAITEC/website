"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Users,
  Target,
  Clock,
  CheckCircle2,
  Calendar,
  MousePointer,
  Eye,
  UserPlus,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1500 }: { target: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{prefix}{count.toLocaleString("nl-NL")}{suffix}</>;
}

const steps = [
  { id: 0, title: "ROI per kanaal", description: "Zie direct welk marketing kanaal het meest oplevert.", icon: BarChart3 },
  { id: 1, title: "Customer journey funnel", description: "Van eerste bezoek tot betalende klant: de hele reis in beeld.", icon: Users },
  { id: 2, title: "Kosten per acquisitie", description: "Exact weten wat het kost om een nieuwe klant te werven.", icon: Target },
  { id: 3, title: "Best posting times", description: "Data-gedreven inzicht in wanneer je het beste kunt posten.", icon: Clock },
  { id: 4, title: "Test resultaten", description: "A/B test resultaten direct zichtbaar en vergelijkbaar.", icon: TrendingUp },
];

const heatmapData = [
  [3, 2, 1, 1, 2, 4, 5],
  [4, 3, 2, 2, 3, 5, 6],
  [5, 4, 3, 3, 4, 6, 7],
  [6, 5, 4, 3, 5, 7, 8],
  [7, 6, 5, 4, 6, 8, 9],
  [8, 7, 6, 5, 7, 9, 10],
  [6, 5, 4, 4, 5, 7, 8],
  [5, 4, 3, 3, 4, 6, 7],
  [4, 3, 2, 2, 3, 5, 6],
  [3, 2, 2, 1, 2, 4, 5],
];

const days = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const hours = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17"];

function getHeatColor(value: number): string {
  if (value >= 9) return "bg-amber";
  if (value >= 7) return "bg-amber/70";
  if (value >= 5) return "bg-amber/40";
  if (value >= 3) return "bg-amber/20";
  return "bg-amber/10";
}

export default function MarketingDashboardPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsAutoPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

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
              href="/#oplossing"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber transition-colors mb-8 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-amber/10 border border-amber/20">
                <TrendingUp className="w-6 h-6 text-amber" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Marketing Performance Hub
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Al je marketing data op één plek. Van ROI per kanaal tot de complete customer journey en de beste posting tijden.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12">
            {/* Steps */}
            <div className="space-y-3">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeStep;
                const isCompleted = i < activeStep;

                return (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      setActiveStep(i);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? "bg-amber/10 border-amber/40 shadow-[0_0_30px_-10px_rgba(245,158,11,0.3)]"
                        : isCompleted
                        ? "bg-amber/5 border-amber/20"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-amber/20 text-amber" : isCompleted ? "bg-amber/10 text-amber/60" : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-montserrat font-bold text-sm ${isActive ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-400"}`}>
                        {step.title}
                      </p>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-xs text-slate-400 font-inter mt-1"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </div>
                    <span className={`font-mono text-xs ${isActive ? "text-amber" : "text-slate-600"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveStep(0);
                    setIsAutoPlaying(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber/10 border border-amber/20 text-amber text-xs font-inter hover:bg-amber/20 transition-colors"
                >
                  Opnieuw afspelen
                </button>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber rounded-full"
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Visual Panel */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8"
                  >
                    <h3 className="font-montserrat font-bold text-white mb-4">ROI per Kanaal</h3>
                    <div className="space-y-4">
                      {[
                        { channel: "Google Ads", spend: 2400, revenue: 8900, roi: 271 },
                        { channel: "LinkedIn", spend: 1800, revenue: 5200, roi: 189 },
                        { channel: "Email marketing", spend: 300, revenue: 4100, roi: 1267 },
                        { channel: "Social organic", spend: 0, revenue: 2800, roi: null },
                      ].map((item, i) => (
                        <motion.div
                          key={item.channel}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="bg-white/5 rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white font-inter">{item.channel}</span>
                            <span className={`text-sm font-mono font-bold ${
                              (item.roi ?? 0) > 500 ? "text-emerald-400" : (item.roi ?? 0) > 200 ? "text-amber" : "text-teal"
                            }`}>
                              {item.roi !== null ? `${item.roi}% ROI` : "Gratis"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
                            <span>Spend: &euro; {item.spend.toLocaleString("nl-NL")}</span>
                            <ArrowRight className="w-3 h-3" />
                            <span className="text-emerald-400">Revenue: &euro; {item.revenue.toLocaleString("nl-NL")}</span>
                          </div>
                          <div className="mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((item.revenue / 9000) * 100, 100)}%` }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                              className={`h-full rounded-full ${
                                (item.roi ?? 0) > 500 ? "bg-emerald-500" : (item.roi ?? 0) > 200 ? "bg-amber" : "bg-teal"
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8"
                  >
                    <h3 className="font-montserrat font-bold text-white mb-6">Customer Journey Funnel</h3>
                    <div className="space-y-3">
                      {[
                        { stage: "Bezoekers", count: 12480, icon: Eye, width: "100%", color: "bg-amber/30" },
                        { stage: "Leads", count: 842, icon: MousePointer, width: "67%", color: "bg-amber/50" },
                        { stage: "Prospects", count: 186, icon: UserPlus, width: "40%", color: "bg-amber/70" },
                        { stage: "Klanten", count: 34, icon: Users, width: "20%", color: "bg-amber" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.stage}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.2 }}
                          className="relative"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.width }}
                            transition={{ delay: 0.3 + i * 0.2, duration: 0.8 }}
                            className={`h-16 ${item.color} rounded-lg mx-auto flex items-center justify-between px-4`}
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="w-4 h-4 text-white/80" />
                              <span className="text-sm text-white font-inter font-medium">{item.stage}</span>
                            </div>
                            <span className="font-mono text-white font-bold">
                              {item.count.toLocaleString("nl-NL")}
                            </span>
                          </motion.div>
                          {i < 3 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 + i * 0.2 }}
                              className="text-center text-[10px] text-slate-500 font-mono py-1"
                            >
                              {(([ 842/12480, 186/842, 34/186 ][i]) * 100).toFixed(1)}% conversie
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8"
                  >
                    <h3 className="font-montserrat font-bold text-white mb-4">Kosten per Acquisitie (CPA)</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 text-center"
                      >
                        <p className="text-xs text-slate-500 font-mono uppercase mb-1">Gem. CPA</p>
                        <p className="font-montserrat font-bold text-2xl text-amber">
                          &euro; <AnimatedCounter target={132} />
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 text-center"
                      >
                        <p className="text-xs text-slate-500 font-mono uppercase mb-1">CLV</p>
                        <p className="font-montserrat font-bold text-2xl text-emerald-400">
                          &euro; <AnimatedCounter target={2840} />
                        </p>
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { channel: "Email", cpa: 43, clv: 3200, ratio: "74x" },
                        { channel: "Google Ads", cpa: 156, clv: 2600, ratio: "17x" },
                        { channel: "LinkedIn", cpa: 210, clv: 3100, ratio: "15x" },
                        { channel: "Events", cpa: 380, clv: 4500, ratio: "12x" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.channel}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div>
                            <span className="text-sm text-white font-inter">{item.channel}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-slate-500 font-mono">CPA: &euro; {item.cpa}</span>
                              <span className="text-[10px] text-slate-500 font-mono">CLV: &euro; {item.clv.toLocaleString("nl-NL")}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-emerald-400">
                            <ArrowUpRight className="w-3 h-3" />
                            <span className="font-mono text-sm font-bold">{item.ratio}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8"
                  >
                    <h3 className="font-montserrat font-bold text-white mb-4">Beste Posting Tijden</h3>
                    <div className="overflow-x-auto">
                      <div className="min-w-[300px]">
                        {/* Header */}
                        <div className="flex gap-1 mb-1">
                          <div className="w-8" />
                          {days.map((day) => (
                            <div key={day} className="flex-1 text-center text-[10px] text-slate-500 font-mono">
                              {day}
                            </div>
                          ))}
                        </div>
                        {/* Grid */}
                        {heatmapData.map((row, ri) => (
                          <div key={ri} className="flex gap-1 mb-1">
                            <div className="w-8 text-[10px] text-slate-500 font-mono flex items-center">
                              {hours[ri]}
                            </div>
                            {row.map((value, ci) => (
                              <motion.div
                                key={ci}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (ri * 7 + ci) * 0.008 }}
                                className={`flex-1 h-6 rounded-sm ${getHeatColor(value)} transition-colors`}
                                title={`${days[ci]} ${hours[ri]}:00 - Score: ${value}`}
                              />
                            ))}
                          </div>
                        ))}
                        <div className="flex items-center justify-end gap-2 mt-3">
                          <span className="text-[10px] text-slate-500">Laag</span>
                          <div className="flex gap-0.5">
                            {["bg-amber/10", "bg-amber/20", "bg-amber/40", "bg-amber/70", "bg-amber"].map((c, i) => (
                              <div key={i} className={`w-4 h-3 rounded-sm ${c}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-500">Hoog</span>
                        </div>
                      </div>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="mt-3 text-xs text-amber font-inter text-center"
                    >
                      Optimale posting: <span className="font-bold">Dinsdag &amp; Donderdag 12:00-14:00</span>
                    </motion.p>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8"
                  >
                    <h3 className="font-montserrat font-bold text-white mb-4">A/B Test Resultaten</h3>
                    <div className="space-y-4">
                      {[
                        {
                          test: "Landing page headline",
                          variantA: { label: "Variant A: \"Automatiseer je bedrijf\"", conversion: 3.2 },
                          variantB: { label: "Variant B: \"Bespaar 20 uur per week\"", conversion: 5.1 },
                          winner: "B",
                          confidence: 96,
                        },
                        {
                          test: "CTA button kleur",
                          variantA: { label: "Variant A: Teal", conversion: 4.8 },
                          variantB: { label: "Variant B: Amber", conversion: 4.2 },
                          winner: "A",
                          confidence: 82,
                        },
                      ].map((test, i) => (
                        <motion.div
                          key={test.test}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.3 }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <p className="text-sm text-white font-montserrat font-bold mb-3">{test.test}</p>
                          <div className="space-y-2">
                            {[test.variantA, test.variantB].map((variant, vi) => {
                              const isWinner = (vi === 0 && test.winner === "A") || (vi === 1 && test.winner === "B");
                              return (
                                <div
                                  key={variant.label}
                                  className={`p-3 rounded-lg ${isWinner ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-white/[0.02]"}`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 font-inter">{variant.label}</span>
                                    <div className="flex items-center gap-2">
                                      <span className={`font-mono text-sm font-bold ${isWinner ? "text-emerald-400" : "text-slate-400"}`}>
                                        {variant.conversion}%
                                      </span>
                                      {isWinner && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                                    </div>
                                  </div>
                                  <div className="mt-1.5 h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(variant.conversion / 6) * 100}%` }}
                                      transition={{ delay: 0.8 + i * 0.3, duration: 0.8 }}
                                      className={`h-full rounded-full ${isWinner ? "bg-emerald-500" : "bg-slate-600"}`}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-[10px] text-slate-500 font-mono mt-2">
                            Betrouwbaarheid: {test.confidence}% &bull; Winnaar: Variant {test.winner}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 font-inter mb-4">
              Al je marketing data op één plek?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-amber text-midnight font-montserrat font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] transition-shadow"
            >
              <Calendar className="w-5 h-5" />
              Plan een gesprek
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
