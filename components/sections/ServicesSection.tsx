'use client';

import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDown,
  Bot,
  LayoutDashboard,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Car,
  Share2,
  FileText,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// CASE DATA
// =============================================================================

interface CaseExample {
  title: string;
  subtitle: string;
  Icon: React.ElementType;
  features: string[];
  accentColor: 'teal' | 'amber';
}

const workflowCases: CaseExample[] = [
  {
    title: 'Auto Import Adviseur',
    subtitle: 'Voor autobedrijven die Duitse occasions importeren',
    Icon: Car,
    accentColor: 'teal',
    features: [
      'Scrapet auto\'s van Duitse platforms op basis van een link',
      'Onderzoekt automatisch de Nederlandse marktwaarde',
      'Vergelijkt specificaties, km-stand en prijshistorie',
      'Berekent totale importkosten (BPM, transport, keuring)',
      'Adviseert of de import rendabel is met verwachte marge',
    ],
  },
  {
    title: 'Factuur & Offerte Automaat',
    subtitle: 'Complete administratie automatisering',
    Icon: FileText,
    accentColor: 'teal',
    features: [
      'Haalt projectdata uit je CRM of projecttool',
      'Genereert offertes automatisch in jouw huisstijl',
      'Stuurt herinneringen bij openstaande facturen',
      'Boekt betalingen automatisch in je boekhouding',
      'Signaleert klanten die vaak te laat betalen',
    ],
  },
];

const aiAgentCases: CaseExample[] = [
  {
    title: 'Social Media Autopilot',
    subtitle: 'Een agent die je hele social media overneemt',
    Icon: Share2,
    accentColor: 'teal',
    features: [
      'Scant dagelijks nieuws in jouw branche',
      'Checkt het weer, feestdagen en speciale dagen',
      'Doet diepgaand onderzoek naar trending topics',
      'Genereert afbeelding in jouw huisstijl',
      'Plant en publiceert automatisch',
    ],
  },
  {
    title: 'Persoonlijke Email Assistent',
    subtitle: 'AI die jouw inbox afhandelt',
    Icon: Mail,
    accentColor: 'teal',
    features: [
      'Leert jouw schrijfstijl en voorkeuren',
      'Beantwoordt standaard vragen automatisch',
      'Maakt concept-antwoorden voor complexe mails',
      'Plant follow-ups in bij geen reactie',
      'Sorteert en prioriteert inkomende mail',
    ],
  },
];

const dashboardCases: CaseExample[] = [
  {
    title: 'Real-time Business Intelligence',
    subtitle: 'Dashboard dat al je data verbindt',
    Icon: BarChart3,
    accentColor: 'amber',
    features: [
      'Live omzet per klant, project en medewerker',
      'Voorspelling cashflow komende 3 maanden',
      'Winstgevendheid per dienst berekend',
      'Automatische alerts bij afwijkingen',
      'Vergelijking met vorig jaar/kwartaal',
    ],
  },
  {
    title: 'Marketing Performance Centrum',
    subtitle: 'Al je marketing data op één plek',
    Icon: TrendingUp,
    accentColor: 'amber',
    features: [
      'ROI per campagne en kanaal',
      'Customer acquisition cost berekening',
      'Conversie funnel visualisatie',
      'A/B test resultaten real-time',
      'Voorspelling beste posting tijden',
    ],
  },
];

// =============================================================================
// EXPANDABLE CARD
// =============================================================================

function ExpandableCard({ example, delay = 0 }: { example: CaseExample; delay?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { title, subtitle, Icon, features, accentColor } = example;

  const colors = {
    teal: {
      bg: 'bg-teal/5',
      border: 'border-teal/20',
      iconBg: 'bg-teal/10',
      iconColor: 'text-teal',
      hoverBorder: 'hover:border-teal/40',
      chevron: 'text-teal',
      bullet: 'bg-teal',
    },
    amber: {
      bg: 'bg-amber/5',
      border: 'border-amber/20',
      iconBg: 'bg-amber/10',
      iconColor: 'text-amber',
      hoverBorder: 'hover:border-amber/40',
      chevron: 'text-amber',
      bullet: 'bg-amber',
    },
  }[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300',
        colors.bg,
        colors.border,
        colors.hoverBorder
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center gap-3 p-4">
        <div className={cn('flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center', colors.iconBg)}>
          <Icon className={cn('w-5 h-5', colors.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-montserrat font-bold text-sm sm:text-base text-white truncate">{title}</h4>
          <p className="font-inter text-xs sm:text-sm text-slate-400 truncate">{subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={colors.chevron}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4 pt-1">
          <div className="border-t border-white/5 pt-3">
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', colors.bullet)} />
                  <span className="font-inter text-xs sm:text-sm text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// SLIDES (memoized to prevent unnecessary re-renders)
// =============================================================================

const SlideIntro = memo(function SlideIntro() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-5xl">
        {/* Background glow */}
        <div className="absolute -inset-32 bg-teal/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative font-mono text-xs sm:text-sm uppercase tracking-wider text-teal mb-4"
        >
          DE OPLOSSING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white mb-4 leading-tight"
        >
          Ik bouw jouw{' '}
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
            digitale motor.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative font-inter text-base sm:text-xl text-slate-400 mb-4"
        >
          Stop met handmatig werk. Start met schalen.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative font-inter text-sm text-slate-500 mb-12 max-w-2xl mx-auto"
        >
          Door de kracht van AI bouw ik complete software oplossingen — tegen een fractie van de traditionele kosten.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="relative flex items-center justify-center gap-2 text-slate-500"
        >
          <span className="font-inter text-sm hidden lg:inline">Scroll om te ontdekken</span>
          <span className="font-inter text-sm lg:hidden">Swipe om te ontdekken</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="hidden lg:block"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="lg:hidden"
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

const SlideAutomation = memo(function SlideAutomation() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5">
              <Bot className="w-4 h-4 text-teal" />
              <span className="font-mono text-xs text-teal uppercase tracking-wide">Workflow Automatisering</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
              <span className="text-teal">Slimme</span> Workflows.
            </h3>

            <p className="font-inter text-sm lg:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
              Je typt data over. Je sleept bestanden. Je checkt mailtjes. Stop daarmee. Ik koppel je systemen aan elkaar via API&apos;s.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm px-5 py-2.5 rounded-xl"
            >
              Bekijk Cases
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md lg:max-w-lg space-y-3"
          >
            {workflowCases.map((example, i) => (
              <ExpandableCard key={example.title} example={example} delay={0.3 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
});

const SlideAIAgents = memo(function SlideAIAgents() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5">
              <MessageSquare className="w-4 h-4 text-teal" />
              <span className="font-mono text-xs text-teal uppercase tracking-wide">AI Agents</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Jouw{' '}
              <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
                Tweede Brein.
              </span>
            </h3>

            <p className="font-inter text-sm lg:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
              AI die met je meedenkt. Mailtjes beantwoorden, offertes voorbereiden of samenvattingen maken.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm px-5 py-2.5 rounded-xl"
            >
              Ontdek AI
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md lg:max-w-lg space-y-3"
          >
            {aiAgentCases.map((example, i) => (
              <ExpandableCard key={example.title} example={example} delay={0.3 + i * 0.1} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
});

const SlideDashboards = memo(function SlideDashboards() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md lg:max-w-lg space-y-3"
          >
            {dashboardCases.map((example, i) => (
              <ExpandableCard key={example.title} example={example} delay={0.3 + i * 0.1} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5">
              <LayoutDashboard className="w-4 h-4 text-amber" />
              <span className="font-mono text-xs text-amber uppercase tracking-wide">Slimme Dashboards</span>
            </div>

            <h3 className="font-montserrat font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Stuur op <span className="text-amber">Data</span>, niet op gevoel.
            </h3>

            <p className="font-inter text-sm lg:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
              Real-time inzichten. Zie direct hoeveel winst je vandaag hebt gemaakt. Custom dashboards die je écht begrijpt.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 border-2 border-amber text-amber font-inter font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-amber hover:text-midnight transition-all"
            >
              Zie Voorbeeld
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

const SlideOwnership = memo(function SlideOwnership() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-amber/10 border border-amber/30">
            <ShieldCheck className="w-10 h-10 sm:w-14 sm:h-14 text-amber" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white mb-4 leading-tight"
        >
          Geen <span className="text-amber">Gijzeling.</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-sm sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Ik bouw in open standaarden. Jij blijft 100% eigenaar. Geen vendor lock-in.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-teal text-midnight font-montserrat font-semibold text-sm sm:text-base px-6 py-3 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)]"
        >
          Start Samenwerking
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </div>
  );
});

const SlideFinale = memo(function SlideFinale() {
  return (
    <div className="snap-center flex-shrink-0 w-screen h-full flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15)_0%,transparent_60%)]" />

      <div className="relative z-10 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-teal mb-4"
        >
          READY?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white mb-4 leading-tight"
        >
          Genoeg{' '}
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
            gezien?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-base sm:text-xl text-slate-400 mb-10"
        >
          Je weet nu wat er kan. De enige vraag is:{' '}
          <span className="text-white font-medium">wanneer start jij?</span>
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)]"
        >
          <Calendar className="w-5 h-5" />
          Plan je Strategie Sessie
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </div>
  );
});

// =============================================================================
// MAIN COMPONENT - DESKTOP WITH TUNNEL SCROLL
// =============================================================================

const TOTAL_SLIDES = 6;
const SCROLL_THRESHOLD = 400; // Pixels of scroll needed to change slide

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInTunnel, setIsInTunnel] = useState(false);
  const wheelAccumRef = useRef(0);
  const cooldownRef = useRef(false);

  // Navigate to specific slide with cooldown
  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, TOTAL_SLIDES - 1));
    setCurrentSlide(clamped);

    // Start cooldown - ignore scroll for 600ms after slide change
    cooldownRef.current = true;
    wheelAccumRef.current = 0;
    setTimeout(() => {
      cooldownRef.current = false;
      wheelAccumRef.current = 0; // Double reset after cooldown
    }, 600);
  }, []);

  // Tunnel scroll behavior for desktop
  useEffect(() => {
    // Only on desktop
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Lock as soon as section touches viewport edges
      const sectionCentered = rect.top <= 0 && rect.bottom >= window.innerHeight;

      // Not in view - let normal scroll happen
      if (!sectionCentered) {
        if (isInTunnel) {
          setIsInTunnel(false);
          window.lenis?.start();
        }
        wheelAccumRef.current = 0;
        return;
      }

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const atFirstSlide = currentSlide === 0;
      const atLastSlide = currentSlide === TOTAL_SLIDES - 1;

      // Allow exit at boundaries
      if ((atFirstSlide && scrollingUp) || (atLastSlide && scrollingDown)) {
        setIsInTunnel(false);
        window.lenis?.start();
        wheelAccumRef.current = 0;
        return;
      }

      // We're in the tunnel - capture scroll
      e.preventDefault();
      setIsInTunnel(true);
      window.lenis?.stop();

      // Skip if in cooldown period
      if (cooldownRef.current) return;

      // Accumulate scroll
      wheelAccumRef.current += e.deltaY;

      // Change slide when threshold reached
      if (Math.abs(wheelAccumRef.current) >= SCROLL_THRESHOLD) {
        if (wheelAccumRef.current > 0 && !atLastSlide) {
          goToSlide(currentSlide + 1);
        } else if (wheelAccumRef.current < 0 && !atFirstSlide) {
          goToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.lenis?.start();
    };
  }, [currentSlide, isInTunnel, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInTunnel) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isInTunnel, goToSlide]);

  return (
    <section ref={sectionRef} id="oplossing" className="relative bg-midnight">
      {/* Desktop: Horizontal carousel with tunnel scroll */}
      <div className="hidden lg:block h-screen overflow-hidden">
        {/* Ambient background */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal/10 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />

        {/* Slides container - animated with transform */}
        <div
          className="h-full flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
        >
          <SlideIntro />
          <SlideAutomation />
          <SlideAIAgents />
          <SlideDashboards />
          <SlideOwnership />
          <SlideFinale />
        </div>

        {/* Progress indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentSlide ? 'bg-teal w-6' : 'bg-white/20 hover:bg-white/40 w-2'
              )}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 left-8 font-mono text-sm z-10">
          <span className="text-teal font-medium">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-600">{String(TOTAL_SLIDES).padStart(2, '0')}</span>
        </div>
      </div>

      {/* Mobile: Vertical stack */}
      <div className="lg:hidden">
        <div className="py-20 px-4 flex flex-col items-center justify-center min-h-[80vh]">
          <SlideIntro />
        </div>
        <div className="py-16 px-4">
          <SlideAutomation />
        </div>
        <div className="py-16 px-4">
          <SlideAIAgents />
        </div>
        <div className="py-16 px-4">
          <SlideDashboards />
        </div>
        <div className="py-16 px-4">
          <SlideOwnership />
        </div>
        <div className="py-20 px-4 min-h-[60vh] flex items-center justify-center">
          <SlideFinale />
        </div>
      </div>
    </section>
  );
}
