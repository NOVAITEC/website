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
  ChevronDown,
  Megaphone,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

// =============================================================================
// DATA
// =============================================================================

type Tab = "kanalen" | "funnel" | "cpa" | "posting" | "abtests";

const channels = [
  { name: "Google Ads", spend: 2400, revenue: 8900, clicks: 3420, conversions: 28, roi: 271, color: "bg-blue-500" },
  { name: "LinkedIn Ads", spend: 1800, revenue: 5200, clicks: 1890, conversions: 16, roi: 189, color: "bg-sky-500" },
  { name: "Email marketing", spend: 300, revenue: 4100, clicks: 2100, conversions: 42, roi: 1267, color: "bg-emerald-500" },
  { name: "Social organic", spend: 0, revenue: 2800, clicks: 4200, conversions: 18, roi: 0, color: "bg-purple-500" },
  { name: "Referrals", spend: 0, revenue: 3400, clicks: 680, conversions: 22, roi: 0, color: "bg-amber" },
];

const funnelStages = [
  { stage: "Bezoekers", count: 12480, icon: Eye, pct: 100 },
  { stage: "Leads", count: 842, icon: MousePointer, pct: 6.7 },
  { stage: "Prospects", count: 186, icon: UserPlus, pct: 22.1 },
  { stage: "Klanten", count: 34, icon: Users, pct: 18.3 },
];

const cpaData = [
  { channel: "Email", cpa: 43, clv: 3200, ltv_ratio: 74.4 },
  { channel: "Referrals", cpa: 68, clv: 4100, ltv_ratio: 60.3 },
  { channel: "Google Ads", cpa: 156, clv: 2600, ltv_ratio: 16.7 },
  { channel: "LinkedIn", cpa: 210, clv: 3100, ltv_ratio: 14.8 },
  { channel: "Events", cpa: 380, clv: 4500, ltv_ratio: 11.8 },
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

const abTests = [
  {
    name: "Landing page headline",
    status: "Afgerond",
    variantA: { label: "\"Automatiseer je bedrijf\"", visitors: 2840, conversions: 91, rate: 3.2 },
    variantB: { label: "\"Bespaar 20 uur per week\"", visitors: 2860, conversions: 146, rate: 5.1 },
    winner: "B" as const,
    confidence: 96,
    improvement: 59,
  },
  {
    name: "CTA button kleur",
    status: "Afgerond",
    variantA: { label: "Teal (#06B6D4)", visitors: 1920, conversions: 92, rate: 4.8 },
    variantB: { label: "Amber (#F59E0B)", visitors: 1880, conversions: 79, rate: 4.2 },
    winner: "A" as const,
    confidence: 82,
    improvement: 14,
  },
  {
    name: "Email subject line",
    status: "Actief",
    variantA: { label: "\"Jouw wekelijkse update\"", visitors: 640, conversions: 128, rate: 20.0 },
    variantB: { label: "\"3 tips die je mist\"", visitors: 620, conversions: 155, rate: 25.0 },
    winner: null,
    confidence: 71,
    improvement: 25,
  },
];

// =============================================================================
// COMPONENTS
// =============================================================================

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return <>{prefix}{display.toLocaleString("nl-NL")}{suffix}</>;
}

function getHeatColor(value: number): string {
  if (value >= 9) return "bg-amber";
  if (value >= 7) return "bg-amber/70";
  if (value >= 5) return "bg-amber/40";
  if (value >= 3) return "bg-amber/20";
  return "bg-amber/10";
}

// =============================================================================
// MAIN
// =============================================================================

export default function MarketingDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("kanalen");
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const totalSpend = channels.reduce((s, c) => s + c.spend, 0);
  const totalRevenue = channels.reduce((s, c) => s + c.revenue, 0);
  const totalConversions = channels.reduce((s, c) => s + c.conversions, 0);
  const avgROI = Math.round(((totalRevenue - totalSpend) / totalSpend) * 100);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "kanalen", label: "Kanalen", icon: Megaphone },
    { id: "funnel", label: "Funnel", icon: Users },
    { id: "cpa", label: "CPA & CLV", icon: Target },
    { id: "posting", label: "Posting Times", icon: Clock },
    { id: "abtests", label: "A/B Tests", icon: Zap },
  ];

  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/#oplossing"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber transition-colors mb-6 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber/10 border border-amber/20">
                <TrendingUp className="w-5 h-5 text-amber" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-montserrat font-bold text-paper">
                  Marketing Performance Hub
                </h1>
                <p className="text-xs text-slate-500 font-inter">Live demo dashboard</p>
              </div>
            </div>
          </motion.div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Totale spend", value: totalSpend, prefix: "€ ", icon: Target, trend: "-8%", up: false },
              { label: "Totale revenue", value: totalRevenue, prefix: "€ ", icon: TrendingUp, trend: "+22%", up: true },
              { label: "Conversies", value: totalConversions, prefix: "", icon: Users, trend: "+15%", up: true },
              { label: "Gem. ROI", value: avgROI, prefix: "", suffix: "%", icon: BarChart3, trend: "+34%", up: true },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/[0.03] rounded-xl p-4 sm:p-5 border border-white/10 hover:border-amber/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
                    <kpi.icon className="w-4 h-4 text-amber" />
                  </div>
                  <span className={`text-xs font-mono flex items-center gap-0.5 ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                    {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    {kpi.trend}
                  </span>
                </div>
                <p className="font-montserrat font-bold text-xl sm:text-2xl text-white">
                  <AnimatedNumber value={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} />
                </p>
                <p className="text-xs text-slate-500 font-inter mt-1">{kpi.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-inter whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-amber/10 text-amber border border-amber/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {/* ============ KANALEN ============ */}
            {activeTab === "kanalen" && (
              <motion.div
                key="kanalen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-montserrat font-bold text-white text-sm">Performance per Kanaal</h3>
                    <span className="text-xs text-slate-500 font-mono">{channels.length} kanalen actief</span>
                  </div>

                  {/* Table header desktop */}
                  <div className="hidden lg:grid lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2 px-4 py-2 border-b border-white/5 text-[10px] text-slate-600 font-mono uppercase">
                    <span>Kanaal</span>
                    <span className="text-right">Spend</span>
                    <span className="text-right">Revenue</span>
                    <span className="text-right">Clicks</span>
                    <span className="text-right">Conversies</span>
                    <span className="text-right">ROI</span>
                  </div>

                  {channels.map((ch, i) => (
                    <motion.button
                      key={ch.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedChannel(selectedChannel === ch.name ? null : ch.name)}
                      className={`w-full text-left px-4 py-3.5 border-b border-white/5 transition-colors ${
                        selectedChannel === ch.name ? "bg-amber/5" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Mobile */}
                      <div className="lg:hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2.5 h-2.5 rounded-full ${ch.color}`} />
                            <span className="text-sm text-white font-inter">{ch.name}</span>
                          </div>
                          <span className={`text-sm font-mono font-bold ${ch.roi > 500 ? "text-emerald-400" : ch.roi > 100 ? "text-amber" : "text-teal"}`}>
                            {ch.roi > 0 ? `${ch.roi}%` : "Gratis"}
                          </span>
                        </div>
                        <div className="flex gap-3 mt-1 text-[10px] text-slate-500 font-mono">
                          <span>Spend: &euro; {ch.spend.toLocaleString("nl-NL")}</span>
                          <span>Rev: &euro; {ch.revenue.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div className="hidden lg:grid lg:grid-cols-[2fr,1fr,1fr,1fr,1fr,1fr] gap-2 items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full ${ch.color}`} />
                          <span className="text-sm text-white font-inter">{ch.name}</span>
                        </div>
                        <span className="text-sm text-slate-400 font-mono text-right">
                          {ch.spend > 0 ? `€ ${ch.spend.toLocaleString("nl-NL")}` : "—"}
                        </span>
                        <span className="text-sm text-emerald-400 font-mono text-right">&euro; {ch.revenue.toLocaleString("nl-NL")}</span>
                        <span className="text-sm text-slate-400 font-mono text-right">{ch.clicks.toLocaleString("nl-NL")}</span>
                        <span className="text-sm text-white font-mono text-right">{ch.conversions}</span>
                        <span className={`text-sm font-mono font-bold text-right ${ch.roi > 500 ? "text-emerald-400" : ch.roi > 100 ? "text-amber" : "text-teal"}`}>
                          {ch.roi > 0 ? `${ch.roi}%` : "Gratis"}
                        </span>
                      </div>

                      {/* Expanded */}
                      <AnimatePresence>
                        {selectedChannel === ch.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Kosten/click</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">
                                  {ch.spend > 0 ? `€ ${(ch.spend / ch.clicks).toFixed(2)}` : "€ 0"}
                                </p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Conversie %</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">
                                  {((ch.conversions / ch.clicks) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Rev/conversie</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">
                                  &euro; {Math.round(ch.revenue / ch.conversions).toLocaleString("nl-NL")}
                                </p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">% van budget</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">
                                  {totalSpend > 0 ? `${((ch.spend / totalSpend) * 100).toFixed(0)}%` : "0%"}
                                </p>
                              </div>
                            </div>
                            {/* Revenue bar */}
                            <div className="mt-3">
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(ch.revenue / 9000) * 100}%` }}
                                  transition={{ duration: 0.6 }}
                                  className={`h-full rounded-full ${ch.color}`}
                                />
                              </div>
                              <p className="text-[10px] text-slate-600 font-mono mt-1">
                                {((ch.revenue / totalRevenue) * 100).toFixed(1)}% van totale revenue
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============ FUNNEL ============ */}
            {activeTab === "funnel" && (
              <motion.div
                key="funnel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                  <h3 className="font-montserrat font-bold text-white text-sm mb-8">Customer Journey Funnel</h3>
                  <div className="max-w-2xl mx-auto space-y-2">
                    {funnelStages.map((stage, i) => {
                      const Icon = stage.icon;
                      const widthPct = 100 - (i * 20);
                      const prevCount = i > 0 ? funnelStages[i - 1].count : null;
                      const convRate = prevCount ? ((stage.count / prevCount) * 100).toFixed(1) : null;

                      return (
                        <div key={stage.stage}>
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            style={{ width: `${widthPct}%` }}
                            className={`mx-auto h-20 rounded-xl flex items-center justify-between px-5 ${
                              i === 0 ? "bg-amber/20" : i === 1 ? "bg-amber/35" : i === 2 ? "bg-amber/55" : "bg-amber"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-5 h-5 ${i === 3 ? "text-midnight" : "text-white/80"}`} />
                              <div>
                                <p className={`font-inter font-medium text-sm ${i === 3 ? "text-midnight" : "text-white"}`}>{stage.stage}</p>
                                <p className={`text-[10px] font-mono ${i === 3 ? "text-midnight/60" : "text-white/60"}`}>
                                  {stage.pct}% van totaal
                                </p>
                              </div>
                            </div>
                            <p className={`font-mono font-bold text-lg ${i === 3 ? "text-midnight" : "text-white"}`}>
                              {stage.count.toLocaleString("nl-NL")}
                            </p>
                          </motion.div>
                          {i < funnelStages.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + i * 0.15 }}
                              className="text-center py-1"
                            >
                              <span className="text-xs text-slate-500 font-mono">
                                {((funnelStages[i + 1].count / stage.count) * 100).toFixed(1)}% conversie ↓
                              </span>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 grid grid-cols-3 gap-3 max-w-lg mx-auto"
                  >
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">Totaal conversie</p>
                      <p className="text-lg text-amber font-mono font-bold mt-1">0.27%</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">Kosten/klant</p>
                      <p className="text-lg text-amber font-mono font-bold mt-1">&euro; 132</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5">
                      <p className="text-[10px] text-slate-500 font-mono uppercase">CLV</p>
                      <p className="text-lg text-emerald-400 font-mono font-bold mt-1">&euro; 2.840</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ============ CPA & CLV ============ */}
            {activeTab === "cpa" && (
              <motion.div
                key="cpa"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Summary cards */}
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                    <p className="text-xs text-slate-500 font-mono uppercase mb-1">Gem. CPA</p>
                    <p className="font-montserrat font-bold text-3xl text-amber">
                      &euro; <AnimatedNumber value={132} />
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Kosten per nieuwe klant</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                    <p className="text-xs text-slate-500 font-mono uppercase mb-1">Gem. CLV</p>
                    <p className="font-montserrat font-bold text-3xl text-emerald-400">
                      &euro; <AnimatedNumber value={2840} />
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">Customer lifetime value</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-center">
                    <p className="text-xs text-slate-500 font-mono uppercase mb-1">LTV:CAC Ratio</p>
                    <p className="font-montserrat font-bold text-3xl text-white">
                      <AnimatedNumber value={21} suffix="x" />
                    </p>
                    <p className="text-[10px] text-emerald-400 mt-1">Uitstekend (&gt; 3x is gezond)</p>
                  </div>
                </div>

                {/* Per channel */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="font-montserrat font-bold text-white text-sm">CPA per Kanaal</h3>
                  </div>
                  {cpaData.map((item, i) => (
                    <motion.div
                      key={item.channel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="px-4 py-3.5 border-b border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white font-inter">{item.channel}</span>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ArrowUpRight className="w-3 h-3" />
                          <span className="font-mono text-sm font-bold">{item.ltv_ratio.toFixed(0)}x</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-red-400/80 font-mono">CPA</span>
                            <span className="text-xs text-white font-mono">&euro; {item.cpa}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.cpa / 400) * 100}%` }}
                              transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                              className="h-full bg-red-500/50 rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-emerald-400/80 font-mono">CLV</span>
                            <span className="text-xs text-white font-mono">&euro; {item.clv.toLocaleString("nl-NL")}</span>
                          </div>
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.clv / 5000) * 100}%` }}
                              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                              className="h-full bg-emerald-500/50 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ============ POSTING TIMES ============ */}
            {activeTab === "posting" && (
              <motion.div
                key="posting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-montserrat font-bold text-white text-sm">Engagement Heatmap</h3>
                    <span className="text-xs text-slate-500 font-inter">Klik op een cel voor details</span>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[340px]">
                      {/* Day headers */}
                      <div className="flex gap-1 mb-1">
                        <div className="w-10" />
                        {days.map((day) => (
                          <div key={day} className="flex-1 text-center text-xs text-slate-500 font-mono">
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Grid */}
                      {heatmapData.map((row, ri) => (
                        <div key={ri} className="flex gap-1 mb-1">
                          <div className="w-10 text-xs text-slate-500 font-mono flex items-center">
                            {hours[ri]}:00
                          </div>
                          {row.map((value, ci) => {
                            const isHovered = hoveredCell?.row === ri && hoveredCell?.col === ci;
                            return (
                              <motion.button
                                key={ci}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (ri * 7 + ci) * 0.006 }}
                                onMouseEnter={() => setHoveredCell({ row: ri, col: ci })}
                                onMouseLeave={() => setHoveredCell(null)}
                                className={`flex-1 h-8 rounded-sm transition-all relative ${getHeatColor(value)} ${
                                  isHovered ? "ring-2 ring-white/40 z-10 scale-110" : ""
                                }`}
                              >
                                {isHovered && (
                                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0d2035] border border-white/20 rounded-lg px-3 py-1.5 whitespace-nowrap z-20 pointer-events-none">
                                    <p className="text-[10px] text-white font-mono">
                                      {days[ci]} {hours[ri]}:00
                                    </p>
                                    <p className="text-[10px] text-amber font-mono font-bold">
                                      Score: {value}/10
                                    </p>
                                  </div>
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}

                      {/* Legend */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Laag</span>
                          <div className="flex gap-0.5">
                            {["bg-amber/10", "bg-amber/20", "bg-amber/40", "bg-amber/70", "bg-amber"].map((c, i) => (
                              <div key={i} className={`w-6 h-4 rounded-sm ${c}`} />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">Hoog</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insights */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 grid sm:grid-cols-2 gap-3"
                  >
                    <div className="p-4 rounded-lg bg-amber/5 border border-amber/20">
                      <p className="text-xs text-amber font-montserrat font-bold mb-1">Beste tijden</p>
                      <p className="text-sm text-white font-inter">Dinsdag &amp; Donderdag, 12:00 - 14:00</p>
                      <p className="text-[10px] text-slate-500 mt-1">3.2x meer engagement dan gemiddeld</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs text-slate-400 font-montserrat font-bold mb-1">Vermijd</p>
                      <p className="text-sm text-white font-inter">Woensdag &amp; Donderdag ochtend</p>
                      <p className="text-[10px] text-slate-500 mt-1">Laagste engagement van de week</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* ============ A/B TESTS ============ */}
            {activeTab === "abtests" && (
              <motion.div
                key="abtests"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {abTests.map((test, i) => (
                  <motion.div
                    key={test.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                  >
                    <button
                      onClick={() => setSelectedTest(selectedTest === i ? null : i)}
                      className="w-full text-left p-5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Zap className={`w-4 h-4 ${test.status === "Actief" ? "text-amber" : "text-emerald-400"}`} />
                        <div>
                          <p className="text-sm text-white font-montserrat font-bold">{test.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {test.status} &bull; Betrouwbaarheid: {test.confidence}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {test.winner && (
                          <span className="text-xs text-emerald-400 font-mono font-bold">
                            +{test.improvement}% verbetering
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          test.status === "Actief" ? "bg-amber/10 text-amber" : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          {test.status}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${selectedTest === i ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {selectedTest === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 space-y-3">
                            {[test.variantA, test.variantB].map((variant, vi) => {
                              const letter = vi === 0 ? "A" : "B";
                              const isWinner = test.winner === letter;
                              return (
                                <div
                                  key={letter}
                                  className={`p-4 rounded-lg ${
                                    isWinner ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-white/[0.03] border border-white/5"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono font-bold ${
                                        isWinner ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-400"
                                      }`}>
                                        {letter}
                                      </span>
                                      <span className="text-sm text-white font-inter">{variant.label}</span>
                                      {isWinner && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                    </div>
                                    <span className={`font-mono text-lg font-bold ${isWinner ? "text-emerald-400" : "text-slate-400"}`}>
                                      {variant.rate}%
                                    </span>
                                  </div>
                                  <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-2">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(variant.rate / 30) * 100}%` }}
                                      transition={{ duration: 0.6 }}
                                      className={`h-full rounded-full ${isWinner ? "bg-emerald-500" : "bg-slate-600"}`}
                                    />
                                  </div>
                                  <div className="flex gap-4 text-[10px] text-slate-500 font-mono">
                                    <span>{variant.visitors.toLocaleString("nl-NL")} bezoekers</span>
                                    <span>{variant.conversions} conversies</span>
                                    <span>{variant.rate}% conversie</span>
                                  </div>
                                </div>
                              );
                            })}
                            <div className="flex items-center justify-between pt-2 text-[10px] text-slate-500 font-mono">
                              <span>Betrouwbaarheid: {test.confidence}%</span>
                              {test.winner && (
                                <span className="text-emerald-400">Winnaar: Variant {test.winner} (+{test.improvement}%)</span>
                              )}
                              {!test.winner && (
                                <span className="text-amber">Nog onvoldoende data voor conclusie</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 font-inter mb-4 text-sm">
              Dit is een demo. Jouw dashboard wordt op maat gemaakt met jouw echte marketing data.
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
