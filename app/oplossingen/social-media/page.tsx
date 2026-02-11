"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Newspaper,
  CloudSun,
  Search,
  Pen,
  ImageIcon,
  CalendarCheck,
  CheckCircle2,
  Calendar,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const steps = [
  {
    id: 0,
    title: "Nieuws scannen",
    description: "Scant dagelijks de nieuwste ontwikkelingen in jouw branche.",
    icon: Newspaper,
  },
  {
    id: 1,
    title: "Context checken",
    description: "Controleert weer, feestdagen en speciale gelegenheden voor relevantie.",
    icon: CloudSun,
  },
  {
    id: 2,
    title: "Onderzoek & schrijven",
    description: "Doet diepgaand onderzoek en schrijft een post die past bij jouw stem.",
    icon: Pen,
  },
  {
    id: 3,
    title: "Afbeelding genereren",
    description: "Maakt een unieke afbeelding in jouw huisstijl met AI.",
    icon: ImageIcon,
  },
  {
    id: 4,
    title: "Plannen & publiceren",
    description: "Plant de post op het optimale moment en publiceert automatisch.",
    icon: CalendarCheck,
  },
];

const mockNews = [
  { source: "Tweakers", title: "EU keurt nieuwe AI-regelgeving goed", relevance: 95 },
  { source: "FD", title: "MKB investeert fors in automatisering", relevance: 88 },
  { source: "Emerce", title: "Social commerce groeit met 340%", relevance: 72 },
];

const mockTypingText = "De EU heeft nieuwe AI-regelgeving goedgekeurd die direct impact heeft op het MKB. Wat betekent dit voor jouw bedrijf? 🧵";

export default function SocialMediaPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [typedText, setTypedText] = useState("");

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

  // Typing effect for step 2
  useEffect(() => {
    if (activeStep !== 2) {
      setTypedText("");
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      if (i < mockTypingText.length) {
        setTypedText(mockTypingText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [activeStep]);

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
                <Share2 className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Social Media Autopilot
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Van nieuwsscan tot publicatie: zie hoe de AI agent jouw hele social media strategie automatisch uitvoert.
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
                        isActive ? "bg-teal/20 text-teal" : isCompleted ? "bg-teal/10 text-teal/60" : "bg-white/5 text-slate-500"
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Branche Nieuws Scanner</h3>
                    <div className="space-y-3">
                      {mockNews.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className={`p-4 rounded-lg border ${
                            i === 0 ? "bg-teal/10 border-teal/30" : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-mono text-slate-500 uppercase">{item.source}</span>
                              <p className="text-sm text-white font-inter mt-0.5">{item.title}</p>
                            </div>
                            <div className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-mono ${
                              item.relevance > 90 ? "bg-teal/20 text-teal" : item.relevance > 80 ? "bg-amber/20 text-amber" : "bg-white/10 text-slate-400"
                            }`}>
                              {item.relevance}%
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 text-xs text-teal font-mono flex items-center gap-2"
                    >
                      <Search className="w-3 h-3 animate-pulse" />
                      Meest relevante topic geselecteerd...
                    </motion.p>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Context Check</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Weer", value: "12°C, Bewolkt", icon: "☁️", note: "Geen impact op post" },
                        { label: "Dag", value: "Dinsdag", icon: "📅", note: "Optimaal voor B2B" },
                        { label: "Feestdag", value: "Geen", icon: "🎉", note: "Normale posting" },
                        { label: "Trending", value: "#AIregulering", icon: "📈", note: "Hoge engagement verwacht" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.15 }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <p className="text-xs text-slate-500 font-mono uppercase">{item.label}</p>
                          <p className="text-sm text-white font-inter mt-0.5">{item.value}</p>
                          <p className="text-[10px] text-teal mt-1">{item.note}</p>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Content Creatie</h3>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 min-h-[120px]">
                      <p className="text-sm text-white font-inter leading-relaxed">
                        {typedText}
                        <span className="inline-block w-0.5 h-4 bg-teal ml-0.5 animate-pulse" />
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["#AI", "#MKB", "#Regelgeving", "#Automatisering", "#Europa"].map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + i * 0.1 }}
                          className="px-2 py-0.5 rounded bg-teal/10 text-teal text-xs font-mono"
                        >
                          {tag}
                        </motion.span>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Afbeelding Genereren</h3>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal/20 via-midnight to-cyan-900/30" />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-6"
                      >
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-3">
                          <span className="font-montserrat font-bold text-teal text-xs">NIT</span>
                        </div>
                        <p className="font-montserrat font-bold text-white text-center text-lg leading-tight">
                          Nieuwe EU AI-regelgeving:
                        </p>
                        <p className="font-montserrat font-bold text-teal text-center text-lg">
                          Wat het MKB moet weten
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-midnight origin-right"
                      />
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-3 text-xs text-teal font-mono flex items-center gap-2"
                    >
                      <ImageIcon className="w-3 h-3" />
                      Afbeelding gegenereerd in huisstijl (1200x630)
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Gepubliceerd!</h3>
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                      {/* Mock social post */}
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                            <span className="font-montserrat font-bold text-teal text-xs">NIT</span>
                          </div>
                          <div>
                            <p className="text-sm text-white font-inter font-medium">NOVAITEC</p>
                            <p className="text-[10px] text-slate-500">Zojuist &bull; LinkedIn</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 font-inter leading-relaxed mb-3">
                          {mockTypingText}
                        </p>
                        <div className="aspect-video rounded-lg bg-gradient-to-br from-teal/20 via-midnight to-cyan-900/30 flex items-center justify-center">
                          <p className="font-montserrat font-bold text-white text-sm text-center px-4">
                            Nieuwe EU AI-regelgeving: <span className="text-teal">Wat het MKB moet weten</span>
                          </p>
                        </div>
                      </div>
                      {/* Engagement */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="px-4 py-3 border-t border-white/10 flex items-center gap-6"
                      >
                        {[
                          { icon: Heart, count: 47, color: "text-red-400" },
                          { icon: MessageCircle, count: 12, color: "text-teal" },
                          { icon: Repeat2, count: 8, color: "text-emerald-400" },
                        ].map((action, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                            className={`flex items-center gap-1.5 ${action.color}`}
                          >
                            <action.icon className="w-4 h-4" />
                            <span className="text-xs font-mono">{action.count}</span>
                          </motion.div>
                        ))}
                      </motion.div>
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
              Nooit meer nadenken over social media content?
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
