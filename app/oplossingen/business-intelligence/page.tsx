"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Activity,
  Bell,
  ArrowUpRight,
  ChevronDown,
  Briefcase,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

// =============================================================================
// DATA
// =============================================================================

type Period = "vandaag" | "week" | "maand" | "kwartaal" | "jaar";

const periodLabels: Record<Period, string> = {
  vandaag: "Vandaag",
  week: "Deze week",
  maand: "Deze maand",
  kwartaal: "Dit kwartaal",
  jaar: "Dit jaar",
};

const kpiData: Record<Period, { omzet: number; winst: number; cashflow: number; projecten: number; omzetTrend: number; winstTrend: number; cashflowTrend: number; projectenTrend: number }> = {
  vandaag: { omzet: 4280, winst: 1840, cashflow: 34200, projecten: 12, omzetTrend: 12, winstTrend: 8, cashflowTrend: -3, projectenTrend: 2 },
  week: { omzet: 18650, winst: 7420, cashflow: 34200, projecten: 12, omzetTrend: 6, winstTrend: 4, cashflowTrend: -3, projectenTrend: 1 },
  maand: { omzet: 47200, winst: 18450, cashflow: 34200, projecten: 14, omzetTrend: 15, winstTrend: 11, cashflowTrend: 5, projectenTrend: 3 },
  kwartaal: { omzet: 128500, winst: 52300, cashflow: 34200, projecten: 18, omzetTrend: 22, winstTrend: 18, cashflowTrend: 12, projectenTrend: 5 },
  jaar: { omzet: 487500, winst: 187200, cashflow: 34200, projecten: 32, omzetTrend: 28, winstTrend: 24, cashflowTrend: 15, projectenTrend: 8 },
};

const clients = [
  { name: "Van der Berg B.V.", revenue: 24500, projects: 4, avgProject: 6125, trend: 18, status: "actief" },
  { name: "Jansen Media", revenue: 18200, projects: 3, avgProject: 6067, trend: 12, status: "actief" },
  { name: "De Groot ICT", revenue: 15800, projects: 2, avgProject: 7900, trend: -5, status: "aandacht" },
  { name: "Bakker & Zn.", revenue: 9400, projects: 2, avgProject: 4700, trend: 34, status: "actief" },
  { name: "Visser Transport", revenue: 7200, projects: 1, avgProject: 7200, trend: 0, status: "nieuw" },
  { name: "Smit Consultancy", revenue: 5600, projects: 1, avgProject: 5600, trend: -12, status: "aandacht" },
];

const cashflowMonths = [
  { month: "Jan", income: 24200, expenses: 16800 },
  { month: "Feb", income: 28500, expenses: 19200 },
  { month: "Mrt", income: 32000, expenses: 21500 },
  { month: "Apr", income: 26800, expenses: 20100 },
  { month: "Mei", income: 31200, expenses: 19800 },
  { month: "Jun", income: 35500, expenses: 22400 },
];

const alerts = [
  { type: "warning" as const, title: "Omzet daling gedetecteerd", message: "Omzet deze week 18% lager dan gemiddeld. Klant 'De Groot ICT' heeft geen nieuwe opdrachten.", time: "2 uur geleden", read: false },
  { type: "info" as const, title: "Cashflow forecast bijgesteld", message: "April forecast aangepast van € 8.200 naar € 6.700 door vertraagde betaling.", time: "5 uur geleden", read: false },
  { type: "success" as const, title: "Maanddoel behaald", message: "Omzetdoel februari (€ 25.000) bereikt op dag 11. Je loopt 8% voor op schema.", time: "Vandaag 09:00", read: true },
  { type: "info" as const, title: "Nieuwe klant geregistreerd", message: "Visser Transport is toegevoegd aan het CRM systeem.", time: "Gisteren", read: true },
  { type: "warning" as const, title: "Betaling te laat", message: "Factuur #2026-0039 van Smit Consultancy is 14 dagen over de betaaltermijn.", time: "Gisteren", read: false },
];

const yearComparison = [
  { metric: "Omzet", current: 187500, previous: 162000, unit: "€" },
  { metric: "Winst", current: 68200, previous: 54800, unit: "€" },
  { metric: "Klanten", current: 24, previous: 19, unit: "" },
  { metric: "Gem. projectwaarde", current: 7812, previous: 8526, unit: "€" },
  { metric: "Retentie", current: 89, previous: 82, unit: "%" },
];

// =============================================================================
// COMPONENTS
// =============================================================================

type Tab = "overzicht" | "klanten" | "cashflow" | "alerts" | "vergelijking";

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

function KPICard({ label, value, prefix, trend, icon: Icon, delay }: {
  label: string; value: number; prefix: string; trend: number; icon: React.ElementType; delay: number;
}) {
  const isUp = trend >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white/[0.03] rounded-xl p-4 sm:p-5 border border-white/10 hover:border-amber/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-amber" />
        </div>
        <span className={`text-xs font-mono flex items-center gap-0.5 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isUp ? "+" : ""}{trend}%
        </span>
      </div>
      <p className="font-montserrat font-bold text-xl sm:text-2xl text-white">
        <AnimatedNumber value={value} prefix={prefix} />
      </p>
      <p className="text-xs text-slate-500 font-inter mt-1">{label}</p>
    </motion.div>
  );
}

// =============================================================================
// MAIN
// =============================================================================

export default function BusinessIntelligencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("overzicht");
  const [period, setPeriod] = useState<Period>("maand");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<number>>(new Set());

  const kpi = kpiData[period];

  const dismissAlert = useCallback((index: number) => {
    setDismissedAlerts(prev => new Set(prev).add(index));
  }, []);

  const unreadAlerts = alerts.filter((a, i) => !a.read && !dismissedAlerts.has(i)).length;

  const tabs: { id: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overzicht", label: "Overzicht", icon: Activity },
    { id: "klanten", label: "Klanten", icon: Users },
    { id: "cashflow", label: "Cashflow", icon: TrendingUp },
    { id: "alerts", label: "Alerts", icon: Bell, badge: unreadAlerts },
    { id: "vergelijking", label: "Jaar vergelijking", icon: BarChart3 },
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber/10 border border-amber/20">
                  <BarChart3 className="w-5 h-5 text-amber" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-montserrat font-bold text-paper">
                    Business Intelligence
                  </h1>
                  <p className="text-xs text-slate-500 font-inter">Live demo dashboard</p>
                </div>
              </div>

              {/* Period selector */}
              <div className="relative z-30">
                <button
                  onClick={() => setPeriodOpen(!periodOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-amber/30 transition-colors text-sm text-white font-inter"
                >
                  <Calendar className="w-4 h-4 text-amber" />
                  {periodLabels[period]}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${periodOpen ? "rotate-180" : ""}`} />
                </button>
                {periodOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setPeriodOpen(false)}
                  />
                )}
                <AnimatePresence>
                  {periodOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 mt-1 w-44 bg-[#0d2035] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      {(Object.keys(periodLabels) as Period[]).map((p) => (
                        <button
                          key={p}
                          onClick={(e) => { e.stopPropagation(); setPeriod(p); setPeriodOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-inter transition-colors ${
                            p === period ? "bg-amber/10 text-amber" : "text-slate-300 hover:bg-white/5"
                          }`}
                        >
                          {periodLabels[p]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <KPICard label="Omzet" value={kpi.omzet} prefix="€ " trend={kpi.omzetTrend} icon={DollarSign} delay={0.05} />
            <KPICard label="Winst" value={kpi.winst} prefix="€ " trend={kpi.winstTrend} icon={TrendingUp} delay={0.1} />
            <KPICard label="Cashflow" value={kpi.cashflow} prefix="€ " trend={kpi.cashflowTrend} icon={Activity} delay={0.15} />
            <KPICard label="Projecten" value={kpi.projecten} prefix="" trend={kpi.projectenTrend} icon={Briefcase} delay={0.2} />
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
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {/* ============ OVERZICHT ============ */}
            {activeTab === "overzicht" && (
              <motion.div
                key="overzicht"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-4"
              >
                {/* Top klanten */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat font-bold text-white text-sm">Top Klanten</h3>
                    <button onClick={() => setActiveTab("klanten")} className="text-xs text-amber font-inter hover:underline">
                      Bekijk alles
                    </button>
                  </div>
                  <div className="space-y-3">
                    {clients.slice(0, 4).map((client, i) => (
                      <div key={client.name} className="flex items-center gap-3">
                        <span className="w-5 text-xs text-slate-600 font-mono">{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-white font-inter">{client.name}</span>
                            <span className="text-xs text-white font-mono">&euro; {client.revenue.toLocaleString("nl-NL")}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(client.revenue / 25000) * 100}%` }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                              className="h-full bg-amber rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cashflow mini */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat font-bold text-white text-sm">Cashflow Overzicht</h3>
                    <button onClick={() => setActiveTab("cashflow")} className="text-xs text-amber font-inter hover:underline">
                      Details
                    </button>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {cashflowMonths.map((m, i) => {
                      const maxVal = 36000;
                      const incomeH = (m.income / maxVal) * 100;
                      const expenseH = (m.expenses / maxVal) * 100;
                      return (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex gap-0.5 items-end" style={{ height: "100px" }}>
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${incomeH}%` }}
                              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                              className="flex-1 bg-emerald-500/40 rounded-t"
                            />
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${expenseH}%` }}
                              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                              className="flex-1 bg-red-500/30 rounded-t"
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono">{m.month}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <div className="w-2 h-2 rounded-sm bg-emerald-500/40" /> Inkomsten
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                      <div className="w-2 h-2 rounded-sm bg-red-500/30" /> Uitgaven
                    </span>
                  </div>
                </div>

                {/* Recent alerts */}
                <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat font-bold text-white text-sm">Recente Alerts</h3>
                    <button onClick={() => setActiveTab("alerts")} className="text-xs text-amber font-inter hover:underline">
                      Alle alerts ({alerts.length})
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {alerts.slice(0, 3).map((alert, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border ${
                          alert.type === "warning" ? "bg-amber/5 border-amber/20"
                          : alert.type === "success" ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-blue-500/5 border-blue-500/20"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {alert.type === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-amber flex-shrink-0 mt-0.5" />
                          : alert.type === "success" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          : <Bell className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />}
                          <div>
                            <p className="text-xs text-white font-inter font-medium">{alert.title}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-1">{alert.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ KLANTEN ============ */}
            {activeTab === "klanten" && (
              <motion.div
                key="klanten"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-montserrat font-bold text-white text-sm">Klantoverzicht</h3>
                    <span className="text-xs text-slate-500 font-mono">{clients.length} klanten</span>
                  </div>

                  {/* Table header */}
                  <div className="hidden sm:grid sm:grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 px-4 py-2 border-b border-white/5 text-[10px] text-slate-600 font-mono uppercase">
                    <span>Klant</span>
                    <span className="text-right">Omzet</span>
                    <span className="text-right">Projecten</span>
                    <span className="text-right">Gem. waarde</span>
                    <span className="text-right">Trend</span>
                  </div>

                  {/* Rows */}
                  {clients.map((client, i) => (
                    <motion.button
                      key={client.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedClient(selectedClient === client.name ? null : client.name)}
                      className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
                        selectedClient === client.name ? "bg-amber/5" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Mobile */}
                      <div className="sm:hidden">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              client.status === "actief" ? "bg-emerald-400" : client.status === "aandacht" ? "bg-amber" : "bg-blue-400"
                            }`} />
                            <span className="text-sm text-white font-inter">{client.name}</span>
                          </div>
                          <span className="text-sm text-white font-mono">&euro; {client.revenue.toLocaleString("nl-NL")}</span>
                        </div>
                      </div>

                      {/* Desktop */}
                      <div className="hidden sm:grid sm:grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-2 items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            client.status === "actief" ? "bg-emerald-400" : client.status === "aandacht" ? "bg-amber" : "bg-blue-400"
                          }`} />
                          <span className="text-sm text-white font-inter">{client.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                            client.status === "actief" ? "bg-emerald-500/10 text-emerald-400"
                            : client.status === "aandacht" ? "bg-amber/10 text-amber"
                            : "bg-blue-500/10 text-blue-400"
                          }`}>
                            {client.status}
                          </span>
                        </div>
                        <span className="text-sm text-white font-mono text-right">&euro; {client.revenue.toLocaleString("nl-NL")}</span>
                        <span className="text-sm text-slate-400 font-mono text-right">{client.projects}</span>
                        <span className="text-sm text-slate-400 font-mono text-right">&euro; {client.avgProject.toLocaleString("nl-NL")}</span>
                        <span className={`text-sm font-mono text-right ${client.trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {client.trend >= 0 ? "+" : ""}{client.trend}%
                        </span>
                      </div>

                      {/* Expanded detail */}
                      <AnimatePresence>
                        {selectedClient === client.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Totale omzet</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">&euro; {client.revenue.toLocaleString("nl-NL")}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Projecten</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">{client.projects} actief</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Gem. waarde</p>
                                <p className="text-sm text-white font-mono font-bold mt-1">&euro; {client.avgProject.toLocaleString("nl-NL")}</p>
                              </div>
                              <div className="bg-white/5 rounded-lg p-3">
                                <p className="text-[10px] text-slate-500 font-mono uppercase">Groei</p>
                                <p className={`text-sm font-mono font-bold mt-1 ${client.trend >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                  {client.trend >= 0 ? "+" : ""}{client.trend}%
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(client.revenue / clients[0].revenue) * 100}%` }}
                                  transition={{ duration: 0.6 }}
                                  className="h-full bg-amber rounded-full"
                                />
                              </div>
                              <p className="text-[10px] text-slate-600 font-mono mt-1">
                                {((client.revenue / clients.reduce((s, c) => s + c.revenue, 0)) * 100).toFixed(1)}% van totale omzet
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

            {/* ============ CASHFLOW ============ */}
            {activeTab === "cashflow" && (
              <motion.div
                key="cashflow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Forecast cards */}
                <div className="grid sm:grid-cols-3 gap-3">
                  {cashflowMonths.slice(1, 4).map((m, i) => {
                    const balance = m.income - m.expenses;
                    return (
                      <motion.div
                        key={m.month}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-montserrat font-bold text-white">{m.month}</span>
                          <span className={`text-sm font-mono font-bold ${balance > 8000 ? "text-emerald-400" : "text-amber"}`}>
                            &euro; {balance.toLocaleString("nl-NL")}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-emerald-400/80 font-inter">Inkomsten</span>
                              <span className="text-xs text-white font-mono">&euro; {m.income.toLocaleString("nl-NL")}</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(m.income / 36000) * 100}%` }}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                className="h-full bg-emerald-500/50 rounded-full"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-red-400/80 font-inter">Uitgaven</span>
                              <span className="text-xs text-white font-mono">&euro; {m.expenses.toLocaleString("nl-NL")}</span>
                            </div>
                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(m.expenses / 36000) * 100}%` }}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                                className="h-full bg-red-500/40 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Full chart */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="font-montserrat font-bold text-white text-sm mb-4">Cashflow 6 Maanden</h3>
                  <div className="flex items-end gap-3 h-48">
                    {cashflowMonths.map((m, i) => {
                      const maxVal = 36000;
                      const incomeH = (m.income / maxVal) * 100;
                      const expenseH = (m.expenses / maxVal) * 100;
                      const balance = m.income - m.expenses;
                      return (
                        <div key={m.month} className="flex-1 group relative">
                          <div className="flex gap-1 items-end h-40">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${incomeH}%` }}
                              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                              className="flex-1 bg-emerald-500/40 rounded-t hover:bg-emerald-500/60 transition-colors cursor-default"
                            />
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${expenseH}%` }}
                              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                              className="flex-1 bg-red-500/30 rounded-t hover:bg-red-500/50 transition-colors cursor-default"
                            />
                          </div>
                          <div className="text-center mt-2">
                            <p className="text-xs text-slate-400 font-mono">{m.month}</p>
                            <p className={`text-[10px] font-mono ${balance > 8000 ? "text-emerald-400" : "text-amber"}`}>
                              +{balance.toLocaleString("nl-NL")}
                            </p>
                          </div>
                          {/* Tooltip on hover */}
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0d2035] border border-white/10 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-36">
                            <p className="text-[10px] text-white font-mono">In: &euro; {m.income.toLocaleString("nl-NL")}</p>
                            <p className="text-[10px] text-white font-mono">Uit: &euro; {m.expenses.toLocaleString("nl-NL")}</p>
                            <p className="text-[10px] text-emerald-400 font-mono font-bold">Saldo: &euro; {balance.toLocaleString("nl-NL")}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-white/5">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <div className="w-3 h-3 rounded-sm bg-emerald-500/40" /> Inkomsten
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <div className="w-3 h-3 rounded-sm bg-red-500/30" /> Uitgaven
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ ALERTS ============ */}
            {activeTab === "alerts" && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-montserrat font-bold text-white text-sm">Alle Meldingen</h3>
                    <span className="text-xs text-slate-500 font-mono">{unreadAlerts} ongelezen</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {alerts.map((alert, i) => {
                      if (dismissedAlerts.has(i)) return null;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className={`p-4 flex items-start gap-3 ${!alert.read ? "bg-white/[0.02]" : ""}`}
                        >
                          <div className={`flex-shrink-0 mt-0.5 ${
                            alert.type === "warning" ? "text-amber" : alert.type === "success" ? "text-emerald-400" : "text-blue-400"
                          }`}>
                            {alert.type === "warning" ? <AlertTriangle className="w-4 h-4" />
                            : alert.type === "success" ? <CheckCircle2 className="w-4 h-4" />
                            : <Bell className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-white font-inter font-medium">{alert.title}</p>
                              {!alert.read && <div className="w-1.5 h-1.5 rounded-full bg-amber" />}
                            </div>
                            <p className="text-xs text-slate-400 font-inter mt-1">{alert.message}</p>
                            <p className="text-[10px] text-slate-600 font-mono mt-2 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {alert.time}
                            </p>
                          </div>
                          <button
                            onClick={() => dismissAlert(i)}
                            className="flex-shrink-0 p-1 rounded hover:bg-white/5 text-slate-600 hover:text-slate-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ============ VERGELIJKING ============ */}
            {activeTab === "vergelijking" && (
              <motion.div
                key="vergelijking"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-montserrat font-bold text-white text-sm">2025 vs 2026</h3>
                    <span className="text-xs text-slate-500 font-mono">Jaar-op-jaar</span>
                  </div>
                  <div className="space-y-4">
                    {yearComparison.map((item, i) => {
                      const change = ((item.current - item.previous) / item.previous) * 100;
                      const isUp = change > 0;
                      const maxVal = Math.max(item.current, item.previous);
                      return (
                        <motion.div
                          key={item.metric}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white font-inter">{item.metric}</span>
                            <span className={`text-sm font-mono font-bold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                              {isUp ? "+" : ""}{change.toFixed(0)}%
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-slate-500 font-mono w-10">2025</span>
                              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.previous / maxVal) * 100}%` }}
                                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                                  className="h-full bg-slate-600 rounded-full"
                                />
                              </div>
                              <span className="text-xs text-slate-400 font-mono w-20 text-right">
                                {item.unit === "%" ? "" : item.unit + " "}{item.previous.toLocaleString("nl-NL")}{item.unit === "%" ? "%" : ""}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] text-amber font-mono w-10">2026</span>
                              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(item.current / maxVal) * 100}%` }}
                                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                                  className="h-full bg-amber rounded-full"
                                />
                              </div>
                              <span className="text-xs text-white font-mono font-bold w-20 text-right">
                                {item.unit === "%" ? "" : item.unit + " "}{item.current.toLocaleString("nl-NL")}{item.unit === "%" ? "%" : ""}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
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
              Dit is een demo. Jouw dashboard wordt op maat gemaakt met jouw echte data.
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
