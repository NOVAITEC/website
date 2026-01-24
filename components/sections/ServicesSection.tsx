'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Mail,
  Database,
  BrainCircuit,
  Send,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// HOOKS
// =============================================================================

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

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
// NETWORK ANIMATION (Slide 1 Background)
// =============================================================================

function NetworkAnimation() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full opacity-30">
        {/* Connecting lines between nearby nodes */}
        {nodes.map((node, i) =>
          nodes.slice(i + 1).map((other, j) => {
            const distance = Math.hypot(node.x - other.x, node.y - other.y);
            if (distance < 25) {
              return (
                <motion.line
                  key={`line-${i}-${j}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${other.x}%`}
                  y2={`${other.y}%`}
                  stroke="#06B6D4"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 2, delay: 0.5 + i * 0.05 }}
                />
              );
            }
            return null;
          })
        )}

        {/* Nodes with pulsating effect */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="#06B6D4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            }}
          />
        ))}
      </svg>

      {/* Gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(11,28,46,0.5) 50%, #0B1C2E 100%)'
        }}
      />
    </div>
  );
}

// =============================================================================
// WORKFLOW MOCKUP (Slide 2 Visual)
// =============================================================================

function WorkflowMockup() {
  const workflowNodes = [
    { id: 1, label: 'Trigger', Icon: Zap, x: 60, y: 80, color: 'amber' },
    { id: 2, label: 'Email', Icon: Mail, x: 180, y: 40, color: 'teal' },
    { id: 3, label: 'Database', Icon: Database, x: 180, y: 120, color: 'teal' },
    { id: 4, label: 'AI', Icon: BrainCircuit, x: 300, y: 80, color: 'teal' },
    { id: 5, label: 'Output', Icon: Send, x: 420, y: 80, color: 'amber' },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-xl mx-auto aspect-[16/10]">
      {/* Terminal header */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-amber/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <div className="absolute top-4 right-4 font-mono text-xs text-slate-500">
        workflow.n8n
      </div>

      <svg className="w-full h-full mt-6" viewBox="0 0 480 160">
        {/* Draw connections */}
        {connections.map(({ from, to }, i) => {
          const fromNode = workflowNodes.find((n) => n.id === from)!;
          const toNode = workflowNodes.find((n) => n.id === to)!;
          return (
            <motion.line
              key={`conn-${i}`}
              x1={fromNode.x + 30}
              y1={fromNode.y}
              x2={toNode.x - 30}
              y2={toNode.y}
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="6,4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            />
          );
        })}

        {/* Draw nodes */}
        {workflowNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 200 }}
          >
            <rect
              x={node.x - 30}
              y={node.y - 30}
              width="60"
              height="60"
              rx="12"
              fill={node.color === 'amber' ? '#F59E0B15' : '#06B6D415'}
              stroke={node.color === 'amber' ? '#F59E0B' : '#06B6D4'}
              strokeWidth="1.5"
            />
            <foreignObject x={node.x - 15} y={node.y - 15} width="30" height="30">
              <div className="flex items-center justify-center w-full h-full">
                <node.Icon
                  className={cn(
                    'w-5 h-5',
                    node.color === 'amber' ? 'text-amber' : 'text-teal'
                  )}
                  strokeWidth={1.5}
                />
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

// =============================================================================
// ANIMATED CHART (Slide 3 Visual)
// =============================================================================

function AnimatedChart() {
  const bars = [
    { height: 55, label: 'Jan' },
    { height: 78, label: 'Feb' },
    { height: 42, label: 'Mar' },
    { height: 88, label: 'Apr' },
    { height: 65, label: 'Mei' },
    { height: 95, label: 'Jun' },
  ];

  return (
    <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-xl mx-auto">
      {/* Dashboard header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="font-mono text-xs text-slate-500 uppercase tracking-wider">
            Maandelijkse Besparingen
          </p>
          <p className="font-montserrat font-bold text-2xl text-white">
            +127 uur
          </p>
        </div>
        <div className="flex items-center gap-2 bg-teal/10 px-3 py-1.5 rounded-full">
          <TrendingUp className="w-4 h-4 text-teal" />
          <span className="font-inter text-sm font-medium text-teal">+24%</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end justify-between gap-3 h-40">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <motion.div
              className="w-full bg-gradient-to-t from-teal/40 to-teal rounded-t-md"
              initial={{ height: 0 }}
              whileInView={{ height: `${bar.height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
            />
            <span className="font-mono text-xs text-slate-500">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 1: INTRO / DE BELOFTE
// =============================================================================

function SlideIntro() {
  return (
    <div className="relative flex-shrink-0 w-screen h-full flex items-center justify-center">
      {/* Network Animation Background */}
      <NetworkAnimation />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm uppercase tracking-wider text-teal mb-6"
        >
          DE OPLOSSING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-montserrat font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-6"
        >
          Wij bouwen jouw{' '}
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
            digitale motor.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter text-xl md:text-2xl text-slate-400 mb-14"
        >
          Stop met handmatig werk. Start met schalen.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 text-slate-500"
        >
          <span className="font-inter text-sm">Scroll om te ontdekken</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 2: WORKFLOW AUTOMATISERING
// =============================================================================

function SlideAutomation() {
  return (
    <div className="relative flex-shrink-0 w-screen h-full flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2">
            <Bot className="w-4 h-4 text-teal" />
            <span className="font-mono text-sm text-teal uppercase tracking-wide">
              Workflow Automatisering
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white">
            De &apos;Busy Work&apos;{' '}
            <span className="text-teal">Killer.</span>
          </h3>

          <p className="font-inter text-lg text-slate-400 leading-relaxed max-w-lg">
            Je typt data over. Je sleept bestanden. Je checkt mailtjes. Stop
            daarmee. Wij koppelen je systemen aan elkaar via API&apos;s. Van
            factuur tot CRM, volledig hands-off.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold px-6 py-3 rounded-xl hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] transition-shadow"
          >
            Bekijk Automation Cases
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Right: Workflow Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <WorkflowMockup />
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 3: SLIMME DASHBOARDS
// =============================================================================

function SlideDashboards() {
  return (
    <div className="relative flex-shrink-0 w-screen h-full flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Animated Chart Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <AnimatedChart />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-6 order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-2">
            <LayoutDashboard className="w-4 h-4 text-amber" />
            <span className="font-mono text-sm text-amber uppercase tracking-wide">
              Slimme Dashboards
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-white">
            Stuur op{' '}
            <span className="text-amber">Data</span>,{' '}
            <br className="hidden md:block" />
            niet op gevoel.
          </h3>

          <p className="font-inter text-lg text-slate-400 leading-relaxed max-w-lg">
            Geen maandelijkse rapportages in PDF, maar real-time inzichten. Zie
            direct hoeveel winst je vandaag hebt gemaakt. Wij bouwen custom
            dashboards die je écht begrijpt.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-amber text-amber font-inter font-semibold px-6 py-3 rounded-xl hover:bg-amber hover:text-midnight transition-all"
          >
            Zie Voorbeeld Dashboard
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 4: JOUW EIGENDOM
// =============================================================================

function SlideOwnership() {
  return (
    <div className="relative flex-shrink-0 w-screen h-full flex items-center justify-center">
      {/* Centered content */}
      <div className="text-center max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-amber/10 border border-amber/30">
            <ShieldCheck
              className="w-14 h-14 md:w-20 md:h-20 text-amber drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-montserrat font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6"
        >
          Geen{' '}
          <span className="text-amber">Gijzeling.</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Veel bureaus houden de sleutels. Wij niet. We bouwen in standaarden
          (n8n, SQL). Jij blijft 100% eigenaar van je systeem en data. Geen
          vendor lock-in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-semibold text-lg px-10 py-5 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.8)] transition-shadow"
          >
            Start Samenwerking
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE INDICATORS
// =============================================================================

function SlideIndicator({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  const backgroundColor = useTransform(
    scrollYProgress,
    [index * 0.25, (index + 0.5) * 0.25, (index + 1) * 0.25],
    ['#334155', '#06B6D4', '#334155']
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
      {[0, 1, 2, 3].map((i) => (
        <SlideIndicator key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// =============================================================================
// DESKTOP: CINEMA SCROLL
// =============================================================================

function ServicesSectionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Convert vertical scroll (0-1) to horizontal translation
  // 4 slides = 400vw total, translate from 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  // Smooth progress for the progress bar
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="oplossing"
      className="relative h-[300vh] bg-midnight"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Noise overlay */}
        <NoiseOverlay />

        {/* Pulsating background blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal/15 blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber/10 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Horizontal slide track */}
        <motion.div style={{ x }} className="flex h-full will-change-transform">
          <SlideIntro />
          <SlideAutomation />
          <SlideDashboards />
          <SlideOwnership />
        </motion.div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 max-w-xs h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-gradient-to-r from-teal to-cyan-400 origin-left"
          />
        </div>

        {/* Slide indicators */}
        <SlideIndicators scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

// =============================================================================
// MOBILE: VERTICAL STACK
// =============================================================================

function ServicesSectionMobile() {
  return (
    <section id="oplossing" className="relative bg-midnight py-20 overflow-hidden">
      {/* Noise overlay */}
      <NoiseOverlay />

      {/* Background blobs */}
      <motion.div
        className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-teal/15 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[250px] h-[250px] rounded-full bg-amber/10 blur-[80px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Mobile Slide 1: Intro */}
      <div className="relative z-10 container mx-auto px-6 text-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm uppercase tracking-wider text-teal mb-4"
        >
          DE OPLOSSING
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-4xl md:text-5xl text-white mb-4"
        >
          Wij bouwen jouw{' '}
          <span className="bg-gradient-to-r from-teal to-cyan-300 bg-clip-text text-transparent">
            digitale motor.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-lg text-slate-400"
        >
          Stop met handmatig werk. Start met schalen.
        </motion.p>
      </div>

      {/* Mobile Slide 2: Automation */}
      <div className="relative z-10 container mx-auto px-6 py-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-4 py-2">
            <Bot className="w-4 h-4 text-teal" />
            <span className="font-mono text-sm text-teal uppercase">
              Workflow Automatisering
            </span>
          </div>
          <h3 className="font-montserrat font-extrabold text-3xl text-white">
            De &apos;Busy Work&apos; <span className="text-teal">Killer.</span>
          </h3>
          <p className="font-inter text-slate-400 leading-relaxed">
            Je typt data over. Je sleept bestanden. Je checkt mailtjes. Stop
            daarmee. Wij koppelen je systemen aan elkaar via API&apos;s.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold px-5 py-2.5 rounded-xl"
          >
            Bekijk Cases
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <WorkflowMockup />
        </motion.div>
      </div>

      {/* Mobile Slide 3: Dashboards */}
      <div className="relative z-10 container mx-auto px-6 py-16 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-4 py-2">
            <LayoutDashboard className="w-4 h-4 text-amber" />
            <span className="font-mono text-sm text-amber uppercase">
              Slimme Dashboards
            </span>
          </div>
          <h3 className="font-montserrat font-extrabold text-3xl text-white">
            Stuur op <span className="text-amber">Data</span>, niet op gevoel.
          </h3>
          <p className="font-inter text-slate-400 leading-relaxed">
            Real-time inzichten. Zie direct hoeveel winst je vandaag hebt
            gemaakt. Custom dashboards die je écht begrijpt.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-amber text-amber font-inter font-semibold px-5 py-2.5 rounded-xl"
          >
            Zie Voorbeeld
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <AnimatedChart />
        </motion.div>
      </div>

      {/* Mobile Slide 4: Ownership */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber/10 border border-amber/30">
            <ShieldCheck
              className="w-12 h-12 text-amber drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-4xl text-white mb-4"
        >
          Geen <span className="text-amber">Gijzeling.</span>
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-inter text-slate-400 mb-8 max-w-md mx-auto"
        >
          We bouwen in standaarden (n8n, SQL). Jij blijft 100% eigenaar. Geen
          vendor lock-in.
        </motion.p>
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-teal text-midnight font-montserrat font-semibold px-8 py-4 rounded-xl shadow-[0_0_30px_-8px_rgba(6,182,212,0.5)]"
        >
          Start Samenwerking
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export function ServicesSection() {
  const isMobile = useIsMobile(1024);

  // Prevent hydration mismatch by rendering a placeholder on first render
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a minimal placeholder during SSR
    return (
      <section id="oplossing" className="bg-midnight h-screen" />
    );
  }

  if (isMobile) {
    return <ServicesSectionMobile />;
  }

  return <ServicesSectionDesktop />;
}
