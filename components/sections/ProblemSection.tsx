'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
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
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// STACKING CARD WRAPPER
// =============================================================================

interface StackingCardProps {
  children: React.ReactNode;
  index: number;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

function StackingCard({ children, index, isFirst, isLast, className }: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track this card's scroll progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  // Cards get a slight scale up as they scroll into view
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <div
      ref={cardRef}
      className={cn('sticky top-0 h-screen w-full', className)}
      style={{ zIndex: 10 + index * 10 }}
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
        }}
        className={cn(
          'relative h-full w-full overflow-hidden',
          !isFirst && 'rounded-t-[2rem] md:rounded-t-[3rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.7)]'
        )}
      >
        {children}
      </motion.div>
    </div>
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
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
    >
      <p className="font-montserrat font-bold text-2xl md:text-3xl text-amber mb-1">{value}</p>
      <p className="font-inter text-xs md:text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}

// =============================================================================
// ADMIN MOCKUP - Animated spreadsheet/data entry visualization
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
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-amber/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto font-mono text-xs text-slate-500">handmatig-werk.xlsx</span>
      </div>

      {/* Spreadsheet rows */}
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
            <div className="flex-1 h-8 bg-slate-800/50 rounded flex items-center px-3 overflow-hidden">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="font-mono text-xs text-slate-400 truncate"
              >
                {['Factuur #2024-0847...', 'Klant: TechBedrijf BV', 'Bedrag: €3.240,00', 'Status: In behandeling'][i]}
              </motion.span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <Copy className="w-4 h-4 text-amber/60" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Copy-paste indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="mt-4 flex items-center justify-center gap-2 text-amber/80"
      >
        <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
        <span className="font-mono text-xs">Kopieer... Plak... Herhaal...</span>
      </motion.div>

      {/* Time indicator */}
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
// STAFF MOCKUP - Personnel dilemma visualization
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Team Capaciteit</p>
          <p className="font-montserrat font-bold text-lg text-white">Kritiek Niveau</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1"
        >
          <span className="font-mono text-xs text-red-400">OVERBELAST</span>
        </motion.div>
      </div>

      {/* Workload bars */}
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

      {/* Vacancy badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, type: 'spring' }}
        className="flex items-center justify-center gap-2 bg-amber/10 border border-amber/30 rounded-xl p-3"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <UserX className="w-5 h-5 text-amber" />
        </motion.div>
        <span className="font-inter text-sm text-amber">2 vacatures al 3+ maanden open</span>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// OPPORTUNITY MOCKUP - Research gap visualization
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center">
          <Brain className="w-5 h-5 text-amber" />
        </div>
        <div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">Innovatie Backlog</p>
          <p className="font-montserrat font-bold text-lg text-white">Gemiste Kansen</p>
        </div>
      </div>

      {/* Floating tools that pass by */}
      <div className="relative h-32 mb-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ x: '100%', opacity: 0 }}
            whileInView={{ x: '-100%', opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 4,
              delay: 0.8 + i * 0.8,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2"
            style={{ top: `${20 + i * 35}%` }}
          >
            <tool.icon className="w-4 h-4 text-teal" />
            <span className="font-inter text-sm text-teal whitespace-nowrap">{tool.name}</span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-mono"
            >
              GEMIST
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Full calendar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        className="bg-slate-800/50 rounded-xl p-3"
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

      {/* Thought bubble */}
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
    <div className="relative h-full w-full bg-midnight flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber/10 blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm uppercase tracking-wider text-amber mb-4"
        >
          HERKENBAAR?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
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
          className="font-inter text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto"
        >
          Of voelt het vaker als brandjes blussen, &apos;s avonds administratie doen,
          en nooit echt vooruit komen?
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 text-slate-500"
        >
          <span className="font-inter text-sm">Scroll om je uitdagingen te zien</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 2: DE ADMINISTRATIE MOLEN
// =============================================================================

function SlideAdmin() {
  return (
    <div className="relative h-full w-full bg-slate-900 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber/10 blur-[120px]" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-2">
              <AlertTriangle className="w-4 h-4 text-amber" />
              <span className="font-mono text-sm text-amber uppercase tracking-wide">Probleem 01</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              De Administratie{' '}
              <span className="text-amber">Molen.</span>
            </h3>

            <p className="font-inter text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
              Je typt data over. Je sleept bestanden. Je controleert handmatig.
              Ondertussen loopt je echte werk achter.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <StatCard value="3-5" label="uur/week verloren" delay={0.3} />
              <StatCard value="15%" label="foutenmarge" delay={0.4} />
              <StatCard value="€2.400+" label="per jaar aan fouten" delay={0.5} />
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <div className="lg:pl-8">
            <AdminMockup />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 3: HET PERSONEEL DILEMMA
// =============================================================================

function SlideStaff() {
  return (
    <div className="relative h-full w-full bg-slate-900 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[120px]" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber/10 blur-[100px]" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Mockup (reversed order on desktop) */}
          <div className="order-2 lg:order-1 lg:pr-8">
            <StaffMockup />
          </div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-2">
              <Users className="w-4 h-4 text-amber" />
              <span className="font-mono text-sm text-amber uppercase tracking-wide">Probleem 02</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Het Personeel{' '}
              <span className="text-amber">Dilemma.</span>
            </h3>

            <p className="font-inter text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
              Te weinig handen. Te veel werk. En je huidige team? Die werkt liever
              op de vertrouwde manier - ook al bestaan er snellere oplossingen.
            </p>

            {/* Stats - CBS 2024 */}
            <div className="grid grid-cols-3 gap-3 pt-4">
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
// SLIDE 4: DE RESEARCH GAP
// =============================================================================

function SlideResearch() {
  return (
    <div className="relative h-full w-full bg-slate-800 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber/5 blur-[150px]" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-2">
              <Lightbulb className="w-4 h-4 text-amber" />
              <span className="font-mono text-sm text-amber uppercase tracking-wide">Probleem 03</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              De Research{' '}
              <span className="text-amber">Gap.</span>
            </h3>

            <p className="font-inter text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
              Je weet dat AI en automatisering je kunnen helpen. Maar wanneer heb je
              voor het laatst tijd gehad om het uit te zoeken?
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <StatCard value="72%" label="gelooft in AI" delay={0.3} />
              <StatCard value="Weinig" label="heeft geautomatiseerd" delay={0.4} />
              <StatCard value="0 uur" label="voor innovatie" delay={0.5} />
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <div className="lg:pl-8">
            <OpportunityMockup />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 5: TRANSITIE
// =============================================================================

function SlideTransition() {
  return (
    <div className="relative h-full w-full bg-slate-800 flex items-center justify-center overflow-hidden">
      {/* Background transition from amber to teal */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-amber/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal/20 to-transparent" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal/20 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-teal/10 border border-teal/30">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-teal" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-sm uppercase tracking-wider text-teal mb-4"
        >
          HERKENBAAR?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
        >
          Je bent{' '}
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
            niet alleen.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-inter text-lg md:text-xl text-slate-400 mb-10 max-w-xl mx-auto"
        >
          Duizenden ondernemers zitten in dezelfde situatie. Het goede nieuws?{' '}
          <span className="text-white font-medium">Er is een uitweg.</span>
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
            className="group inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-base md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] transition-all"
          >
            Ontdek de Oplossing
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function ProblemSection() {
  return (
    <section id="probleem" className="relative bg-midnight">
      {/* Card 1: Intro */}
      <StackingCard index={0} isFirst>
        <SlideIntro />
      </StackingCard>

      {/* Card 2: Admin */}
      <StackingCard index={1}>
        <SlideAdmin />
      </StackingCard>

      {/* Card 3: Staff */}
      <StackingCard index={2}>
        <SlideStaff />
      </StackingCard>

      {/* Card 4: Research */}
      <StackingCard index={3}>
        <SlideResearch />
      </StackingCard>

      {/* Card 5: Transition */}
      <StackingCard index={4} isLast>
        <SlideTransition />
      </StackingCard>
    </section>
  );
}
