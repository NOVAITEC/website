"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Search,
  BarChart3,
  Calculator,
  CheckCircle2,
  XCircle,
  Globe,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const steps = [
  {
    id: 0,
    title: "Duitse listing gevonden",
    description: "Het systeem scrapet automatisch auto's van Duitse platforms op basis van jouw zoekcriteria.",
    icon: Globe,
  },
  {
    id: 1,
    title: "Marktwaarde onderzoek",
    description: "De Nederlandse marktwaarde wordt automatisch opgezocht en vergeleken.",
    icon: Search,
  },
  {
    id: 2,
    title: "Specificaties vergelijken",
    description: "Km-stand, bouwjaar, opties en prijshistorie worden naast elkaar gelegd.",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Importkosten berekenen",
    description: "BPM, transport, APK-keuring en overige kosten worden automatisch berekend.",
    icon: Calculator,
  },
  {
    id: 4,
    title: "Advies & marge",
    description: "Het systeem geeft een helder advies: importeren of niet, met verwachte winstmarge.",
    icon: TrendingUp,
  },
];

const mockCar = {
  title: "BMW 320d Touring",
  year: 2021,
  km: "67.432 km",
  fuel: "Diesel",
  power: "190 pk",
  priceDE: 24950,
  priceNL: 31500,
  bpm: 2847,
  transport: 650,
  keuring: 180,
};

function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
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

  return <>{count.toLocaleString("nl-NL")}</>;
}

export default function AutoImportPage() {
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
    }, 3000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const totalCost = mockCar.priceDE + mockCar.bpm + mockCar.transport + mockCar.keuring;
  const margin = mockCar.priceNL - totalCost;
  const isProfit = margin > 0;

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
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <Car className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Auto Import Adviseur
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Zie hoe het systeem automatisch een Duitse auto analyseert, de Nederlandse marktwaarde opzoekt en een import-advies geeft.
            </p>
          </motion.div>

          {/* Interactive Demo */}
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-8 lg:gap-12">
            {/* Left: Step Navigation */}
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
                        ? "bg-teal/10 border-teal/40 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]"
                        : isCompleted
                        ? "bg-teal/5 border-teal/20"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-teal/20 text-teal"
                          : isCompleted
                          ? "bg-teal/10 text-teal/60"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-montserrat font-bold text-sm ${
                          isActive ? "text-white" : isCompleted ? "text-slate-300" : "text-slate-400"
                        }`}
                      >
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
                    <span
                      className={`font-mono text-xs ${
                        isActive ? "text-teal" : "text-slate-600"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}

              {/* Controls */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveStep(0);
                    setIsAutoPlaying(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-teal/10 border border-teal/20 text-teal text-xs font-inter hover:bg-teal/20 transition-colors"
                >
                  Opnieuw afspelen
                </button>
                <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-teal rounded-full"
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Visual Panel */}
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
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs text-slate-500 font-mono">mobile.de</span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-18 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
                          <Car className="w-10 h-10 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-montserrat font-bold text-white text-lg">{mockCar.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {[mockCar.year, mockCar.km, mockCar.fuel, mockCar.power].map((tag) => (
                              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-xs text-slate-400 font-mono">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 font-montserrat font-bold text-2xl text-teal">
                            &euro; {mockCar.priceDE.toLocaleString("nl-NL")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 flex items-center gap-2 text-teal text-xs font-mono"
                    >
                      <Search className="w-3 h-3 animate-pulse" />
                      Listing gevonden en gescraped...
                    </motion.div>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Marktwaarde Analyse</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-xs text-slate-500 font-mono uppercase mb-1">Duitsland</p>
                        <p className="font-montserrat font-bold text-2xl text-white">
                          &euro; <AnimatedCounter target={mockCar.priceDE} />
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Vraagprijs mobile.de</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-teal/20">
                        <p className="text-xs text-teal font-mono uppercase mb-1">Nederland</p>
                        <p className="font-montserrat font-bold text-2xl text-teal">
                          &euro; <AnimatedCounter target={mockCar.priceNL} />
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Marktwaarde AutoTrack</p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="mt-4 h-2 bg-gradient-to-r from-teal/20 via-teal to-teal/20 rounded-full origin-left"
                    />
                    <p className="text-xs text-slate-400 font-inter mt-2">
                      Prijsverschil: <span className="text-teal font-bold">&euro; {(mockCar.priceNL - mockCar.priceDE).toLocaleString("nl-NL")}</span> bruto marge potentieel
                    </p>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Specificatie Vergelijking</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Kilometerstand", value: mockCar.km, status: "Onder gemiddeld", good: true },
                        { label: "Bouwjaar", value: String(mockCar.year), status: "Recent", good: true },
                        { label: "Vermogen", value: mockCar.power, status: "Populaire motorisering", good: true },
                        { label: "Brandstof", value: mockCar.fuel, status: "Hogere BPM", good: false },
                        { label: "Prijshistorie", value: "3 maanden online", status: "Ruimte voor onderhandeling", good: true },
                      ].map((spec, i) => (
                        <motion.div
                          key={spec.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div>
                            <p className="text-sm text-white font-inter">{spec.label}</p>
                            <p className="text-xs text-slate-500">{spec.value}</p>
                          </div>
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${spec.good ? "text-emerald-400" : "text-amber"}`}>
                            {spec.good ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                            {spec.status}
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Kostenberekening</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Aankoopprijs (DE)", amount: mockCar.priceDE },
                        { label: "BPM", amount: mockCar.bpm },
                        { label: "Transport", amount: mockCar.transport },
                        { label: "APK-keuring", amount: mockCar.keuring },
                      ].map((cost, i) => (
                        <motion.div
                          key={cost.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                        >
                          <span className="text-sm text-slate-300 font-inter">{cost.label}</span>
                          <span className="font-mono text-white">
                            &euro; <AnimatedCounter target={cost.amount} duration={800 + i * 200} />
                          </span>
                        </motion.div>
                      ))}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-teal/10 border border-teal/30"
                      >
                        <span className="text-sm text-teal font-montserrat font-bold">Totale kosten</span>
                        <span className="font-mono text-teal font-bold text-lg">
                          &euro; <AnimatedCounter target={totalCost} duration={1200} />
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[350px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                        isProfit ? "bg-emerald-500/20 border-2 border-emerald-500/40" : "bg-red-500/20 border-2 border-red-500/40"
                      }`}
                    >
                      {isProfit ? (
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                      ) : (
                        <XCircle className="w-10 h-10 text-red-400" />
                      )}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className={`font-montserrat font-extrabold text-3xl mb-2 ${
                        isProfit ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {isProfit ? "Rendabel!" : "Niet rendabel"}
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center space-y-2"
                    >
                      <p className="text-slate-400 font-inter text-sm">Verwachte marge:</p>
                      <p className={`font-mono font-bold text-4xl ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                        &euro; <AnimatedCounter target={Math.abs(margin)} />
                      </p>
                      <p className="text-xs text-slate-500 font-inter mt-4">
                        Verkoopprijs NL &euro; {mockCar.priceNL.toLocaleString("nl-NL")} &minus; Totale kosten &euro; {totalCost.toLocaleString("nl-NL")}
                      </p>
                    </motion.div>
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
              Wil je dit voor jouw autobedrijf laten bouwen?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-sm px-8 py-4 rounded-xl hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-shadow"
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
