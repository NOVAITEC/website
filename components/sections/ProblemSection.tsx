'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Clock,
  FileSpreadsheet,
  Users,
  UserX,
  Brain,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  Copy,
  RefreshCw,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// NOISE OVERLAY
// =============================================================================

function NoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}

// =============================================================================
// STAT CARD COMPONENT
// =============================================================================

interface StatCardProps {
  value: string;
  label: string;
  delay?: number;
}

function StatCard({ value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 text-center"
    >
      <p className="font-montserrat font-bold text-xl md:text-2xl lg:text-3xl text-amber mb-1">{value}</p>
      <p className="font-inter text-xs md:text-sm text-slate-400 leading-tight">{label}</p>
    </motion.div>
  );
}

// =============================================================================
// ADMIN MOCKUP
// =============================================================================

function AdminMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-amber/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto font-mono text-xs text-slate-500">handmatig-werk.xlsx</span>
      </div>

      <div className="space-y-2">
        {[1, 2, 3, 4].map((row, i) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center font-mono text-xs text-slate-500">
              {row}
            </div>
            <div className="flex-1 h-8 bg-slate-800 rounded flex items-center px-3 overflow-hidden">
              <span className="font-mono text-xs text-slate-400 truncate">
                {['Factuur #2024-0847...', 'Klant: TechBedrijf BV', 'Bedrag: €3.240,00', 'Status: In behandeling'][i]}
              </span>
            </div>
            <Copy className="w-4 h-4 text-amber/60 flex-shrink-0" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="mt-4 flex items-center justify-center gap-2 text-amber/80"
      >
        <RefreshCw className="w-4 h-4 text-amber/60" />
        <span className="font-mono text-xs">Kopieer... Plak... Herhaal...</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="absolute -bottom-3 -right-3 bg-amber/20 border border-amber/30 rounded-full px-3 py-1 flex items-center gap-2"
      >
        <Clock className="w-4 h-4 text-amber" />
        <span className="font-mono text-xs text-amber">3-5 uur/week</span>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// STAFF MOCKUP
// =============================================================================

function StaffMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Team Capaciteit</p>
          <p className="font-montserrat font-bold text-base md:text-lg text-white">Kritiek Niveau</p>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
          <span className="font-mono text-xs text-red-400">OVERBELAST</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {[
          { name: 'Jan', load: 95, status: 'overwerkt' },
          { name: 'Lisa', load: 88, status: 'druk' },
          { name: 'Ahmed', load: 110, status: 'burnout risico' },
        ].map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-500" />
                <span className="font-inter text-sm text-slate-300">{person.name}</span>
              </div>
              <span className="font-mono text-xs text-amber">{person.load}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(person.load, 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                className={cn(
                  'h-full rounded-full',
                  person.load > 100 ? 'bg-red-500' : person.load > 85 ? 'bg-amber' : 'bg-teal'
                )}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: 'spring' }}
        className="flex items-center justify-center gap-2 bg-amber/10 border border-amber/30 rounded-xl p-3"
      >
        <UserX className="w-5 h-5 text-amber flex-shrink-0" />
        <span className="font-inter text-xs md:text-sm text-amber text-center">2 vacatures al 3+ maanden open</span>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// OPPORTUNITY MOCKUP
// =============================================================================

function OpportunityMockup() {
  const tools = [
    { name: 'AI Chatbot', icon: Sparkles },
    { name: 'Automatisering', icon: RefreshCw },
    { name: 'Dashboard', icon: FileSpreadsheet },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center">
          <Brain className="w-5 h-5 text-amber" />
        </div>
        <div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Innovatie Backlog</p>
          <p className="font-montserrat font-bold text-base md:text-lg text-white">Gemiste Kansen</p>
        </div>
      </div>

      <div className="relative h-32 mb-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.4 + i * 0.15,
            }}
            className="absolute flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 md:px-4 py-2"
            style={{ top: `${10 + i * 35}%`, left: `${5 + i * 10}%` }}
          >
            <tool.icon className="w-4 h-4 text-teal flex-shrink-0" />
            <span className="font-inter text-xs md:text-sm text-teal whitespace-nowrap">{tool.name}</span>
            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-mono">
              GEMIST
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="bg-slate-800 rounded-xl p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="font-mono text-xs text-slate-500">Agenda deze week</span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {['Ma', 'Di', 'Wo', 'Do', 'Vr'].map((day) => (
            <div key={day} className="text-center">
              <span className="font-mono text-xs text-slate-600">{day}</span>
              <div className="mt-1 h-8 bg-amber/20 rounded flex items-center justify-center">
                <span className="font-mono text-xs text-amber">VOL</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, type: 'spring' }}
        className="absolute -top-2 -right-2 bg-slate-800 border border-white/10 rounded-xl px-3 py-2 shadow-lg"
      >
        <p className="font-inter text-xs text-slate-400 italic">&quot;Als ik tijd had...&quot;</p>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// SLIDE 1: INTRO
// =============================================================================

function SlideIntro() {
  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center rounded-3xl overflow-hidden bg-midnight py-12 sm:py-20">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber/10 blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-[120px]" />

      <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber mb-3 sm:mb-4"
        >
          HERKENBAAR?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-6 leading-tight"
        >
          Ondernemen is{' '}
          <span className="bg-gradient-to-r from-amber via-orange-400 to-amber bg-clip-text text-transparent">
            vrijheid.
          </span>{' '}
          <br className="hidden sm:block" />
          Toch?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          Of voelt het vaker als brandjes blussen, &apos;s avonds administratie doen,
          en nooit echt vooruit komen?
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 sm:gap-3 text-slate-500"
        >
          <span className="font-inter text-xs sm:text-sm">Scroll naar beneden</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 2: ADMINISTRATIE MOLEN
// =============================================================================

function SlideAdmin() {
  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center rounded-3xl overflow-hidden bg-slate-900 py-12 sm:py-20">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber/10 blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber" />
              <span className="font-mono text-xs sm:text-sm text-amber uppercase tracking-wide">Probleem 01</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              5 uur per week aan{' '}
              <span className="text-amber">copy-paste.</span>
            </h3>

            <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Data overtypen. Bestanden slepen. Handmatig controleren.
              Werk dat een computer in seconden doet.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-4">
              <StatCard value="3-5" label="uur/week verloren" delay={0.3} />
              <StatCard value="15%" label="foutenmarge" delay={0.4} />
              <StatCard value="€2.400+" label="per jaar aan fouten" delay={0.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full scale-90 sm:scale-100"
          >
            <AdminMockup />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 3: PERSONEEL DILEMMA
// =============================================================================

function SlideStaff() {
  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center py-12 sm:py-20 rounded-3xl overflow-hidden bg-slate-800">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[120px]" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber/10 blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full scale-90 sm:scale-100"
          >
            <StaffMockup />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber" />
              <span className="font-mono text-xs sm:text-sm text-amber uppercase tracking-wide">Probleem 02</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Te weinig mensen.{' '}
              <span className="text-amber">Te veel werk.</span>
            </h3>

            <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Vacatures blijven open. Je team is overbelast.
              En inhuren kost meer dan je kunt missen.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-4">
              <StatCard value="71%" label="personeelstekort" delay={0.3} />
              <StatCard value="53%" label="MKB onderbezet" delay={0.4} />
              <StatCard value="29%" label="meer werkdruk" delay={0.5} />
            </div>

            <p className="font-mono text-xs text-slate-500 pt-2">
              Bron: CBS 2024, MKB Servicedesk
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 4: RESEARCH GAP
// =============================================================================

function SlideResearch() {
  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center py-12 sm:py-20 rounded-3xl overflow-hidden bg-slate-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber/5 blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
              <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-amber" />
              <span className="font-mono text-xs sm:text-sm text-amber uppercase tracking-wide">Probleem 03</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Geen tijd om{' '}
              <span className="text-amber">slimmer te werken.</span>
            </h3>

            <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Je weet dat AI en automatisering kunnen helpen.
              Maar je agenda is vol. Elke week weer.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 sm:pt-4">
              <StatCard value="72%" label="gelooft in AI" delay={0.3} />
              <StatCard value="Weinig" label="heeft geautomatiseerd" delay={0.4} />
              <StatCard value="0 uur" label="voor innovatie" delay={0.5} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="w-full scale-90 sm:scale-100"
          >
            <OpportunityMockup />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 5: TRANSITION
// =============================================================================

function SlideTransition() {
  return (
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center py-12 sm:py-20 justify-center rounded-3xl overflow-hidden bg-slate-800">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal/20 to-transparent" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal/20 blur-[150px]" />

      <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-teal/10 border border-teal/30">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-teal" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-teal mb-3 sm:mb-4"
        >
          HERKENBAAR?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 leading-tight"
        >
          Dit hoeft{' '}
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
            niet zo.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-inter text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto"
        >
          Wat als je repetitieve taken automatiseert?{' '}
          <span className="text-white font-medium">Je wint uren terug. Elke week.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="#oplossing"
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px -10px rgba(6,182,212,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 sm:gap-3 bg-teal text-midnight font-montserrat font-bold text-sm sm:text-base md:text-lg px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-all"
          >
            Ontdek de Oplossing
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE COUNTER
// =============================================================================

const TOTAL_SLIDES = 5;

function SlideCounter({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const slideNumber = useTransform(scrollYProgress, (value) => {
    const slide = Math.min(Math.floor(value * TOTAL_SLIDES) + 1, TOTAL_SLIDES);
    return slide.toString().padStart(2, '0');
  });

  return (
    <div className="absolute bottom-8 left-8 font-mono text-sm flex items-baseline gap-1">
      <motion.span className="text-amber font-medium">{slideNumber}</motion.span>
      <span className="text-slate-600">/</span>
      <span className="text-slate-600">05</span>
    </div>
  );
}

// =============================================================================
// SLIDE INDICATORS
// =============================================================================

function SlideIndicator({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const interval = 1 / TOTAL_SLIDES;
  const backgroundColor = useTransform(
    scrollYProgress,
    [index * interval, (index + 0.5) * interval, (index + 1) * interval],
    ['#334155', '#F59E0B', '#334155']
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor }}
    />
  );
}

function SlideIndicators({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute bottom-8 right-8 flex gap-2">
      {[0, 1, 2, 3, 4].map((i) => (
        <SlideIndicator key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// =============================================================================
// DESKTOP: STACKING CARDS ANIMATION
// =============================================================================

interface StackingSlideProps {
  children: React.ReactNode;
  index: number;
  total: number;
}

function StackingSlide({ children, index, total }: StackingSlideProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Card is in view when it enters the viewport
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Each card stacks slightly lower than the previous for visual depth
  const topOffset = index * 20;

  return (
    <div
      ref={cardRef}
      className="sticky h-screen w-full flex items-center justify-center px-4 sm:px-6"
      style={{
        top: `${topOffset}px`,
        zIndex: 10 + index,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="w-full max-w-7xl"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProblemSectionDesktop() {
  const slides = [
    { component: <SlideIntro />, id: 'intro' },
    { component: <SlideAdmin />, id: 'admin' },
    { component: <SlideStaff />, id: 'staff' },
    { component: <SlideResearch />, id: 'research' },
    { component: <SlideTransition />, id: 'transition' },
  ];

  return (
    <section id="probleem" className="relative bg-midnight">
      {/* Background effects - use absolute to stay within section bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <NoiseOverlay />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber/15 blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Stacking slides */}
      {slides.map((slide, index) => (
        <StackingSlide key={slide.id} index={index} total={slides.length}>
          {slide.component}
        </StackingSlide>
      ))}

      {/* Extra spacing at the end */}
      <div className="h-screen" />
    </section>
  );
}

// =============================================================================
// MOBILE: STACKING CARDS ANIMATION (same as desktop but with smaller offsets)
// =============================================================================

interface StackingSlideMobileProps {
  children: React.ReactNode;
  index: number;
}

function StackingSlideMobile({ children, index }: StackingSlideMobileProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smaller offset for mobile screens
  const topOffset = index * 12;

  return (
    <div
      ref={cardRef}
      className="sticky h-[100svh] w-full flex items-center justify-center px-3"
      style={{
        top: `${topOffset}px`,
        zIndex: 10 + index,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="w-full max-w-7xl h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProblemSectionMobile() {
  const slides = [
    { component: <SlideIntro />, id: 'intro-mobile' },
    { component: <SlideAdmin />, id: 'admin-mobile' },
    { component: <SlideStaff />, id: 'staff-mobile' },
    { component: <SlideResearch />, id: 'research-mobile' },
    { component: <SlideTransition />, id: 'transition-mobile' },
  ];

  return (
    <section id="probleem" className="relative bg-midnight">
      {/* Background effects - static on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-amber/15 blur-[100px] opacity-15" />
      </div>

      {/* Stacking slides for mobile */}
      {slides.map((slide, index) => (
        <StackingSlideMobile key={slide.id} index={index}>
          {slide.component}
        </StackingSlideMobile>
      ))}

      {/* Extra spacing at the end */}
      <div className="h-[100svh]" />
    </section>
  );
}

// =============================================================================
// MAIN EXPORT - Responsive: Mobile vertical stack, Desktop stacking cards
// =============================================================================

export function ProblemSection() {
  return (
    <>
      {/* Mobile: Vertical stack layout (< 1024px) */}
      <div className="lg:hidden">
        <ProblemSectionMobile />
      </div>
      {/* Desktop: Stacking cards animation (>= 1024px) */}
      <div className="hidden lg:block">
        <ProblemSectionDesktop />
      </div>
    </>
  );
}
