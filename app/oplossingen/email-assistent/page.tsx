"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Brain,
  Reply,
  PenLine,
  Clock,
  Inbox,
  CheckCircle2,
  Calendar,
  Star,
  AlertCircle,
  Archive,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

const steps = [
  {
    id: 0,
    title: "Inbox analyseren",
    description: "AI scant en categoriseert inkomende mails op urgentie en type.",
    icon: Inbox,
  },
  {
    id: 1,
    title: "Schrijfstijl leren",
    description: "Het systeem kent jouw toon, voorkeuren en veelgebruikte zinnen.",
    icon: Brain,
  },
  {
    id: 2,
    title: "Auto-reply standaard",
    description: "Standaard vragen worden automatisch beantwoord in jouw stijl.",
    icon: Reply,
  },
  {
    id: 3,
    title: "Concepten voor complexe mails",
    description: "Voor moeilijke mails wordt een concept klaargelegd ter review.",
    icon: PenLine,
  },
  {
    id: 4,
    title: "Follow-up planning",
    description: "Geen reactie? Het systeem plant automatisch een follow-up in.",
    icon: Clock,
  },
];

const mockEmails = [
  {
    from: "Jan de Vries",
    subject: "Prijsopgave website redesign",
    preview: "Hoi, kunnen jullie een indicatie geven van de kosten voor...",
    time: "09:14",
    category: "standaard",
    priority: "medium",
  },
  {
    from: "Lisa Bakker",
    subject: "URGENT: Server is down",
    preview: "Het hele systeem ligt plat sinds vanmorgen 8:00...",
    time: "08:42",
    category: "urgent",
    priority: "high",
  },
  {
    from: "Mark Jansen",
    subject: "Notulen meeting gisteren",
    preview: "Hierbij de notulen van ons overleg. Kun je even...",
    time: "08:15",
    category: "info",
    priority: "low",
  },
  {
    from: "Sophie van Dijk",
    subject: "Factuur #2026-0039 betaald",
    preview: "Ter bevestiging: we hebben de factuur zojuist voldaan...",
    time: "07:55",
    category: "admin",
    priority: "low",
  },
  {
    from: "Newsletter",
    subject: "Uw wekelijks tech nieuws digest",
    preview: "De belangrijkste tech ontwikkelingen van deze week...",
    time: "06:00",
    category: "newsletter",
    priority: "none",
  },
];

const categoryColors: Record<string, { bg: string; text: string; label: string }> = {
  urgent: { bg: "bg-red-500/20", text: "text-red-400", label: "Urgent" },
  standaard: { bg: "bg-teal/20", text: "text-teal", label: "Standaard" },
  info: { bg: "bg-blue-500/20", text: "text-blue-400", label: "Info" },
  admin: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Admin" },
  newsletter: { bg: "bg-slate-500/20", text: "text-slate-400", label: "Archiveer" },
};

export default function EmailAssistentPage() {
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
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar oplossingen
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <Mail className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Persoonlijke Email Assistent
              </h1>
            </div>
            <p className="text-slate-400 font-inter mb-12 max-w-2xl">
              Zie hoe AI jouw inbox overneemt: van sorteren en prioriteren tot automatisch beantwoorden in jouw schrijfstijl.
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
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-montserrat font-bold text-white">Inbox</h3>
                      <span className="text-xs text-slate-500 font-mono">5 nieuwe mails</span>
                    </div>
                    <div className="space-y-2">
                      {mockEmails.map((email, i) => {
                        const cat = categoryColors[email.category];
                        return (
                          <motion.div
                            key={email.subject}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {email.priority === "high" ? (
                                <AlertCircle className="w-4 h-4 text-red-400" />
                              ) : email.priority === "medium" ? (
                                <Star className="w-4 h-4 text-amber" />
                              ) : (
                                <Mail className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className="text-sm text-white font-inter font-medium truncate">{email.from}</p>
                                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{email.time}</span>
                              </div>
                              <p className="text-xs text-slate-300 truncate">{email.subject}</p>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">{email.preview}</p>
                            </div>
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-mono ${cat.bg} ${cat.text}`}
                            >
                              {cat.label}
                            </motion.span>
                          </motion.div>
                        );
                      })}
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Jouw Schrijfprofiel</h3>
                    <div className="bg-white/5 rounded-xl p-5 border border-white/10 space-y-4">
                      {[
                        { label: "Toon", value: "Professioneel & vriendelijk", pct: 92 },
                        { label: "Begroeting", value: "\"Hoi [naam],\" of \"Beste [naam],\"", pct: 88 },
                        { label: "Afsluiting", value: "\"Met vriendelijke groet\" of \"Groeten\"", pct: 95 },
                        { label: "Lengte", value: "Kort & bondig (gem. 3-5 zinnen)", pct: 85 },
                        { label: "Reactietijd", value: "Binnen 2 uur op werkdagen", pct: 78 },
                      ].map((trait, i) => (
                        <motion.div
                          key={trait.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500 font-mono">{trait.label}</span>
                            <span className="text-xs text-teal font-mono">{trait.pct}% match</span>
                          </div>
                          <p className="text-sm text-white font-inter">{trait.value}</p>
                          <div className="mt-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${trait.pct}%` }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                              className="h-full bg-teal/50 rounded-full"
                            />
                          </div>
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
                    <h3 className="font-montserrat font-bold text-white mb-1">Auto-reply</h3>
                    <p className="text-xs text-slate-500 font-inter mb-4">Standaard vraag automatisch beantwoord</p>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-xs text-slate-400 font-inter">Van: Jan de Vries</span>
                      </div>
                      <p className="text-sm text-slate-300 font-inter italic">
                        &ldquo;Kunnen jullie een indicatie geven van de kosten voor een website redesign?&rdquo;
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-teal/5 rounded-xl p-4 border border-teal/20"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Reply className="w-3.5 h-3.5 text-teal" />
                        <span className="text-xs text-teal font-inter">AI Reply (jouw stijl)</span>
                      </div>
                      <p className="text-sm text-white font-inter leading-relaxed">
                        Hoi Jan,<br /><br />
                        Leuk dat je interesse hebt! Een website redesign hangt af van een paar factoren, zoals scope en functionaliteit. Ik stuur je graag een vrijblijvende offerte op maat.<br /><br />
                        Heb je even tijd voor een kort belletje deze week?<br /><br />
                        Groeten,<br />
                        Kyan
                      </p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-3 flex items-center gap-2 text-xs text-emerald-400 font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Automatisch verstuurd
                      </motion.div>
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
                    <h3 className="font-montserrat font-bold text-white mb-1">Concept voor Review</h3>
                    <p className="text-xs text-slate-500 font-inter mb-4">Complexe mail &mdash; wacht op jouw goedkeuring</p>

                    <div className="bg-red-500/5 rounded-xl p-4 border border-red-500/20 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400 font-inter">URGENT &mdash; Lisa Bakker</span>
                      </div>
                      <p className="text-sm text-slate-300 font-inter italic">
                        &ldquo;Het hele systeem ligt plat sinds vanmorgen 8:00. Kunnen jullie direct kijken?&rdquo;
                      </p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-amber/5 rounded-xl p-4 border border-amber/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PenLine className="w-3.5 h-3.5 text-amber" />
                          <span className="text-xs text-amber font-inter">Concept antwoord</span>
                        </div>
                        <span className="text-[10px] text-amber/60 font-mono">WACHT OP REVIEW</span>
                      </div>
                      <p className="text-sm text-white font-inter leading-relaxed">
                        Hoi Lisa,<br /><br />
                        Vervelend om te horen. Ik ga hier direct naar kijken. Kun je me de exacte foutmelding doorsturen? Dan kan ik sneller schakelen.<br /><br />
                        Ik bel je zodra ik meer weet.<br /><br />
                        Groeten,<br />
                        Kyan
                      </p>
                      <div className="mt-3 flex gap-2">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 }}
                          className="px-3 py-1.5 rounded-lg bg-teal/20 text-teal text-xs font-inter"
                        >
                          Versturen
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs font-inter"
                        >
                          Bewerken
                        </motion.button>
                      </div>
                    </motion.div>
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
                    <h3 className="font-montserrat font-bold text-white mb-4">Follow-up Planning</h3>
                    <div className="space-y-3">
                      {[
                        { contact: "Jan de Vries", subject: "Prijsopgave", sentDate: "11 feb", followUp: "14 feb", status: "Gepland" },
                        { contact: "Pieter Smit", subject: "Samenwerking voorstel", sentDate: "8 feb", followUp: "12 feb", status: "Morgen" },
                        { contact: "Anne Mulder", subject: "Project update", sentDate: "5 feb", followUp: "10 feb", status: "Verstuurd" },
                      ].map((item, i) => (
                        <motion.div
                          key={item.contact}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className={`p-4 rounded-lg border ${
                            item.status === "Morgen"
                              ? "bg-amber/10 border-amber/20"
                              : item.status === "Verstuurd"
                              ? "bg-teal/5 border-teal/20"
                              : "bg-white/5 border-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-white font-inter font-medium">{item.contact}</p>
                              <p className="text-xs text-slate-500">{item.subject}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-xs font-mono ${
                                item.status === "Morgen" ? "text-amber" : item.status === "Verstuurd" ? "text-teal" : "text-slate-400"
                              }`}>
                                {item.status}
                              </p>
                              <p className="text-[10px] text-slate-600 font-mono">{item.followUp}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-4 text-[10px] text-slate-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-2.5 h-2.5" />
                              Verstuurd {item.sentDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              Follow-up {item.followUp}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 text-xs text-slate-500 font-inter text-center"
                    >
                      Automatische follow-ups zorgen dat geen enkele lead verloren gaat
                    </motion.p>
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
              Klaar om je inbox te automatiseren?
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
