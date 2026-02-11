"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Database,
  Send,
  Bell,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const steps = [
  {
    id: 0,
    title: "Projectdata ophalen",
    description: "Het systeem haalt automatisch projectgegevens op uit je CRM of projectmanagement tool.",
    icon: Database,
  },
  {
    id: 1,
    title: "Offerte genereren",
    description: "Een professionele offerte wordt automatisch opgesteld in jouw huisstijl.",
    icon: FileText,
  },
  {
    id: 2,
    title: "Factuur versturen",
    description: "Na goedkeuring wordt de factuur automatisch verstuurd naar de klant.",
    icon: Send,
  },
  {
    id: 3,
    title: "Herinneringen",
    description: "Bij openstaande facturen worden automatisch herinneringen verstuurd.",
    icon: Bell,
  },
  {
    id: 4,
    title: "Betaling & signalering",
    description: "Betalingen worden geboekt en late betalers worden gesignaleerd.",
    icon: CreditCard,
  },
];

const mockProject = {
  client: "Van der Berg B.V.",
  project: "Website redesign",
  hours: 42,
  rate: 95,
  invoiceNr: "2026-0047",
  date: "11 feb 2026",
  dueDate: "25 feb 2026",
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

export default function FactuurOffertePage() {
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

  const total = mockProject.hours * mockProject.rate;

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
                <FileText className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Factuur & Offerte Automaat
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Van projectdata tot betaling: zie hoe het hele facturatieproces volledig automatisch verloopt.
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
                    <span className={`font-mono text-xs ${isActive ? "text-teal" : "text-slate-600"}`}>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">CRM Data</h3>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                      {[
                        { label: "Klant", value: mockProject.client },
                        { label: "Project", value: mockProject.project },
                        { label: "Uren", value: `${mockProject.hours} uur` },
                        { label: "Uurtarief", value: `€ ${mockProject.rate}` },
                      ].map((field, i) => (
                        <motion.div
                          key={field.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-slate-500 font-mono uppercase">{field.label}</span>
                          <span className="text-sm text-white font-inter">{field.value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 flex items-center gap-2 text-teal text-xs font-mono"
                    >
                      <Database className="w-3 h-3 animate-pulse" />
                      Data opgehaald uit CRM...
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Offerte Preview</h3>
                    <div className="bg-white/[0.08] rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="font-montserrat font-bold text-teal text-xs uppercase tracking-wider">NOVAITEC</p>
                          <p className="text-xs text-slate-500 mt-1">Offerte #{mockProject.invoiceNr}</p>
                        </div>
                        <p className="text-xs text-slate-500">{mockProject.date}</p>
                      </div>
                      <div className="border-t border-white/10 pt-4 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Aan</span>
                          <span className="text-white">{mockProject.client}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Project</span>
                          <span className="text-white">{mockProject.project}</span>
                        </div>
                      </div>
                      <div className="border-t border-white/10 mt-4 pt-4">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-slate-400">{mockProject.hours} uur &times; &euro; {mockProject.rate}</span>
                          <span className="text-white">&euro; {total.toLocaleString("nl-NL")}</span>
                        </div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-slate-400">BTW 21%</span>
                          <span className="text-white">&euro; {Math.round(total * 0.21).toLocaleString("nl-NL")}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2">
                          <span className="text-teal text-sm">Totaal</span>
                          <span className="text-teal text-sm">
                            &euro; <AnimatedCounter target={Math.round(total * 1.21)} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-3 text-xs text-teal font-mono flex items-center gap-2"
                    >
                      <FileText className="w-3 h-3" />
                      Offerte gegenereerd in huisstijl
                    </motion.p>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 rounded-full bg-teal/20 border-2 border-teal/40 flex items-center justify-center mb-4"
                    >
                      <Send className="w-8 h-8 text-teal" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="font-montserrat font-bold text-white text-xl mb-2">Factuur verstuurd</h3>
                      <p className="text-sm text-slate-400 font-inter">
                        Automatisch verstuurd naar {mockProject.client}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          #{mockProject.invoiceNr}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Betaaltermijn: 14 dagen
                        </span>
                      </div>
                    </motion.div>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Herinnering Systeem</h3>
                    <div className="space-y-3">
                      {[
                        { day: "Dag 0", action: "Factuur verstuurd", status: "done", color: "text-teal" },
                        { day: "Dag 14", action: "Betaaltermijn verlopen", status: "warning", color: "text-amber" },
                        { day: "Dag 15", action: "1e herinnering verstuurd", status: "done", color: "text-teal" },
                        { day: "Dag 22", action: "2e herinnering verstuurd", status: "active", color: "text-amber" },
                        { day: "Dag 30", action: "Laatste aanmaning", status: "pending", color: "text-slate-500" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.day}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className={`flex items-center gap-4 p-3 rounded-lg ${
                            item.status === "active" ? "bg-amber/10 border border-amber/20" : "bg-white/5"
                          }`}
                        >
                          <span className="font-mono text-xs text-slate-500 w-12">{item.day}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            item.status === "done" ? "bg-teal" : item.status === "active" ? "bg-amber animate-pulse" : "bg-slate-600"
                          }`} />
                          <span className={`text-sm font-inter ${item.color}`}>{item.action}</span>
                          {item.status === "active" && (
                            <Bell className="w-3.5 h-3.5 text-amber ml-auto animate-bounce" />
                          )}
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Betaalstatus & Signalering</h3>
                    <div className="space-y-3">
                      {[
                        { client: "Jansen Media", invoice: "#2026-0044", amount: 2380, days: 0, status: "Betaald" },
                        { client: "De Groot ICT", invoice: "#2026-0045", amount: 4750, days: 3, status: "Betaald" },
                        { client: mockProject.client, invoice: `#${mockProject.invoiceNr}`, amount: Math.round(total * 1.21), days: 22, status: "Te laat" },
                      ].map((payment, i) => (
                        <motion.div
                          key={payment.invoice}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className={`p-4 rounded-lg border ${
                            payment.days > 14
                              ? "bg-red-500/5 border-red-500/20"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-white font-inter">{payment.client}</p>
                              <p className="text-xs text-slate-500 font-mono">{payment.invoice}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-white font-mono">&euro; {payment.amount.toLocaleString("nl-NL")}</p>
                              <p className={`text-xs font-mono ${
                                payment.days > 14 ? "text-red-400" : "text-emerald-400"
                              }`}>
                                {payment.status}
                                {payment.days > 14 && (
                                  <span className="ml-1">({payment.days}d)</span>
                                )}
                              </p>
                            </div>
                          </div>
                          {payment.days > 14 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="mt-2 flex items-center gap-2 text-xs text-amber"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Klant betaalt vaker te laat &mdash; risico gesignaleerd
                            </motion.div>
                          )}
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
              Nooit meer handmatig facturen versturen?
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
