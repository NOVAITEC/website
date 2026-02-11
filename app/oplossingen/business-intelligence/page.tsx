"use client";

import { useState, useEffect } from "react";
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
  PieChart,
  Bell,
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

function BarChartAnimated({ data }: { data: { label: string; value: number; max: number }[] }) {
  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-slate-400 font-inter">{item.label}</span>
            <span className="text-xs text-white font-mono">&euro; {item.value.toLocaleString("nl-NL")}</span>
          </div>
          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / item.max) * 100}%` }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${i === 0 ? "bg-teal" : i === 1 ? "bg-cyan-400" : i === 2 ? "bg-amber" : "bg-teal/60"}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const steps = [
  { id: 0, title: "Live KPI's", description: "Real-time omzet, winst en cashflow op één plek.", icon: Activity },
  { id: 1, title: "Omzet per klant", description: "Zie direct welke klanten het meeste opleveren.", icon: Users },
  { id: 2, title: "Cashflow forecast", description: "Voorspelling van de cashflow voor de komende 3 maanden.", icon: TrendingUp },
  { id: 3, title: "Alerts bij afwijkingen", description: "Automatisch een melding bij onverwachte schommelingen.", icon: Bell },
  { id: 4, title: "Vergelijking met vorig jaar", description: "Eenvoudig vergelijken met vorige periodes.", icon: PieChart },
];

export default function BusinessIntelligencePage() {
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
                <BarChart3 className="w-6 h-6 text-amber" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Real-time Business Intelligence
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Al je bedrijfsdata op één dashboard. Live inzichten, automatische alerts en forecasts die je helpen betere beslissingen te nemen.
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Live Dashboard</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Omzet vandaag", value: 4280, prefix: "€ ", icon: DollarSign, trend: "+12%", up: true },
                        { label: "Winst MTD", value: 18450, prefix: "€ ", icon: TrendingUp, trend: "+8%", up: true },
                        { label: "Cashflow", value: 34200, prefix: "€ ", icon: Activity, trend: "-3%", up: false },
                        { label: "Actieve projecten", value: 12, prefix: "", icon: BarChart3, trend: "+2", up: true },
                      ].map((kpi, i) => (
                        <motion.div
                          key={kpi.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15 }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <kpi.icon className="w-4 h-4 text-amber" />
                            <span className={`text-[10px] font-mono flex items-center gap-0.5 ${kpi.up ? "text-emerald-400" : "text-red-400"}`}>
                              {kpi.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                              {kpi.trend}
                            </span>
                          </div>
                          <p className="font-montserrat font-bold text-xl text-white">
                            <AnimatedCounter target={kpi.value} prefix={kpi.prefix} duration={1200 + i * 200} />
                          </p>
                          <p className="text-[10px] text-slate-500 font-inter mt-1">{kpi.label}</p>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Omzet per Klant</h3>
                    <BarChartAnimated
                      data={[
                        { label: "Van der Berg B.V.", value: 24500, max: 25000 },
                        { label: "Jansen Media", value: 18200, max: 25000 },
                        { label: "De Groot ICT", value: 15800, max: 25000 },
                        { label: "Bakker & Zn.", value: 9400, max: 25000 },
                      ]}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="mt-4 p-3 rounded-lg bg-amber/5 border border-amber/20"
                    >
                      <p className="text-xs text-amber font-inter">
                        Top 3 klanten genereren <span className="font-bold">86%</span> van de totale omzet
                      </p>
                    </motion.div>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Cashflow Forecast</h3>
                    <div className="space-y-4">
                      {[
                        { month: "Februari", income: 28500, expenses: 19200, balance: 9300 },
                        { month: "Maart", income: 32000, expenses: 21500, balance: 10500 },
                        { month: "April", income: 26800, expenses: 20100, balance: 6700 },
                      ].map((item, i) => (
                        <motion.div
                          key={item.month}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-montserrat font-bold text-sm text-white">{item.month}</span>
                            <span className={`font-mono text-sm font-bold ${item.balance > 8000 ? "text-emerald-400" : "text-amber"}`}>
                              &euro; {item.balance.toLocaleString("nl-NL")}
                            </span>
                          </div>
                          <div className="flex gap-2 h-4">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.income / 35000) * 100}%` }}
                              transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                              className="h-full bg-emerald-500/40 rounded"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.expenses / 35000) * 100}%` }}
                              transition={{ delay: 0.7 + i * 0.2, duration: 0.6 }}
                              className="h-full bg-red-500/40 rounded"
                            />
                          </div>
                          <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                            <span>Inkomsten: &euro; {item.income.toLocaleString("nl-NL")}</span>
                            <span>Uitgaven: &euro; {item.expenses.toLocaleString("nl-NL")}</span>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Automatische Alerts</h3>
                    <div className="space-y-3">
                      {[
                        {
                          type: "warning",
                          title: "Omzet daling gedetecteerd",
                          message: "Omzet deze week 18% lager dan gemiddeld. Klant 'De Groot ICT' heeft geen nieuwe opdrachten.",
                          time: "2 uur geleden",
                        },
                        {
                          type: "info",
                          title: "Cashflow voorspelling bijgesteld",
                          message: "April forecast aangepast van € 8.200 naar € 6.700 door vertraagde betaling.",
                          time: "5 uur geleden",
                        },
                        {
                          type: "success",
                          title: "Maanddoel behaald",
                          message: "Omzetdoel februari (€ 25.000) bereikt op dag 11. Je loopt 8% voor op schema.",
                          time: "Vandaag 09:00",
                        },
                      ].map((alert, i) => (
                        <motion.div
                          key={alert.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className={`p-4 rounded-lg border ${
                            alert.type === "warning"
                              ? "bg-amber/5 border-amber/20"
                              : alert.type === "success"
                              ? "bg-emerald-500/5 border-emerald-500/20"
                              : "bg-blue-500/5 border-blue-500/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 mt-0.5 ${
                              alert.type === "warning" ? "text-amber" : alert.type === "success" ? "text-emerald-400" : "text-blue-400"
                            }`}>
                              {alert.type === "warning" ? (
                                <AlertTriangle className="w-4 h-4" />
                              ) : alert.type === "success" ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <Bell className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white font-inter font-medium">{alert.title}</p>
                              <p className="text-xs text-slate-400 font-inter mt-1">{alert.message}</p>
                              <p className="text-[10px] text-slate-600 font-mono mt-2">{alert.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Jaar Vergelijking</h3>
                    <div className="space-y-4">
                      {[
                        { metric: "Omzet", current: 187500, previous: 162000, unit: "€" },
                        { metric: "Winst", current: 68200, previous: 54800, unit: "€" },
                        { metric: "Klanten", current: 24, previous: 19, unit: "" },
                        { metric: "Gem. projectwaarde", current: 7812, previous: 8526, unit: "€" },
                      ].map((item, i) => {
                        const change = ((item.current - item.previous) / item.previous) * 100;
                        const isUp = change > 0;
                        return (
                          <motion.div
                            key={item.metric}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div>
                              <p className="text-sm text-white font-inter">{item.metric}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-slate-500 font-mono">
                                  2025: {item.unit} {item.previous.toLocaleString("nl-NL")}
                                </span>
                                <ArrowRight className="w-3 h-3 text-slate-600" />
                                <span className="text-xs text-white font-mono font-bold">
                                  2026: {item.unit} {item.current.toLocaleString("nl-NL")}
                                </span>
                              </div>
                            </div>
                            <span className={`text-sm font-mono font-bold ${isUp ? "text-emerald-400" : "text-red-400"}`}>
                              {isUp ? "+" : ""}{change.toFixed(0)}%
                            </span>
                          </motion.div>
                        );
                      })}
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
              Wil je sturen op data in plaats van gevoel?
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
