'use client';

import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';

// Hook to detect if we should reduce animations (mobile/low-power)
function useReducedAnimations() {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                     'ontouchstart' in window;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldReduce(isMobile || prefersReduced);
  }, []);

  return shouldReduce;
}
import {
  ArrowRight,
  ArrowDown,
  Bot,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  Mail,
  Database,
  BrainCircuit,
  Send,
  TrendingUp,
  MessageSquare,
  Calendar,
  User,
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
// NETWORK ANIMATION (Slide 1 Background)
// =============================================================================

function NetworkAnimation() {
  const reduceAnimations = useReducedAnimations();

  // Fewer nodes on mobile for better performance
  const nodeCount = reduceAnimations ? 8 : 20;

  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => ({
        id: i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    [nodeCount]
  );

  // On mobile, just show static nodes without infinite animations
  if (reduceAnimations) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-20">
          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((other, j) => {
              const distance = Math.hypot(node.x - other.x, node.y - other.y);
              if (distance < 30) {
                return (
                  <line
                    key={`line-${i}-${j}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${other.x}%`}
                    y2={`${other.y}%`}
                    stroke="#06B6D4"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                );
              }
              return null;
            })
          )}
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size}
              fill="#06B6D4"
              opacity="0.5"
            />
          ))}
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(11,28,46,0.5) 50%, #0B1C2E 100%)'
          }}
        />
      </div>
    );
  }

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
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
            />
          );
        })}

        {/* Draw nodes */}
        {workflowNodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200 }}
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
              animate={{ height: `${bar.height}%` }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
            />
            <span className="font-mono text-xs text-slate-500">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// CHAT MOCKUP (Slide AI Agents Visual)
// =============================================================================

function ChatMockup() {
  const messages = [
    {
      id: 1,
      type: 'user' as const,
      text: 'Kun je de offertes van vandaag samenvatten?',
    },
    {
      id: 2,
      type: 'ai' as const,
      text: 'Natuurlijk! Vandaag zijn er 3 offertes binnengekomen met een totaalwaarde van €12.450. De hoogste (€7.200) is van TechBedrijf BV voor een dashboard project.',
    },
  ];

  return (
    <div className="relative bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 w-full max-w-xl mx-auto">
      {/* Terminal header */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-amber/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
      </div>
      <div className="absolute top-4 right-4 font-mono text-xs text-slate-500">
        ai-assistant.chat
      </div>

      {/* Chat messages */}
      <div className="mt-8 space-y-4">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.4, duration: 0.5 }}
            className={cn(
              'flex gap-3',
              msg.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {msg.type === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-teal" />
              </div>
            )}
            <div
              className={cn(
                'max-w-[80%] px-4 py-3 rounded-2xl text-sm',
                msg.type === 'user'
                  ? 'bg-slate-700/50 text-slate-200 rounded-br-md'
                  : 'bg-teal/10 border border-teal/20 text-slate-300 rounded-bl-md'
              )}
            >
              {msg.text}
            </div>
            {msg.type === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700/50 border border-slate-600 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex gap-3"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-teal/20 border border-teal/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-teal" />
          </div>
          <div className="bg-teal/10 border border-teal/20 rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-teal/60"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-teal/60"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-teal/60"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 1: INTRO / DE BELOFTE
// =============================================================================

function SlideIntro() {
  return (
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center justify-center rounded-3xl overflow-hidden">
      {/* Network Animation Background */}
      <NetworkAnimation />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-teal mb-3 sm:mb-6"
        >
          DE OPLOSSING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-3 sm:mb-6 leading-tight"
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter text-sm sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-14"
        >
          Stop met handmatig werk. Start met schalen.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 sm:gap-3 text-slate-500"
        >
          <span className="font-inter text-xs sm:text-sm">Scroll om te ontdekken</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center rounded-3xl overflow-hidden bg-midnight/50">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3 sm:space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
            <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-teal" />
            <span className="font-mono text-xs sm:text-sm text-teal uppercase tracking-wide">
              Workflow Automatisering
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            De &apos;Busy Work&apos;{' '}
            <span className="text-teal">Killer.</span>
          </h3>

          <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Je typt data over. Je sleept bestanden. Je checkt mailtjes. Stop
            daarmee. Ik koppel je systemen aan elkaar via API&apos;s.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] transition-shadow"
          >
            Bekijk Cases
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </motion.div>

        {/* Right: Workflow Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full max-w-md lg:max-w-xl scale-75 sm:scale-90 lg:scale-100"
        >
          <WorkflowMockup />
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 3: AI AGENTS (NEW)
// =============================================================================

function SlideAIAgents() {
  return (
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center rounded-3xl overflow-hidden bg-midnight/50">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-3 sm:space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-teal" />
            <span className="font-mono text-xs sm:text-sm text-teal uppercase tracking-wide">
              AI Agents
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Jouw{' '}
            <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
              Tweede Brein.
            </span>
          </h3>

          <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            AI die met je meedenkt. Mailtjes beantwoorden, offertes voorbereiden
            of samenvattingen maken.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] transition-shadow"
          >
            Ontdek AI
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.a>
        </motion.div>

        {/* Right: Chat Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="w-full max-w-md lg:max-w-xl scale-75 sm:scale-90 lg:scale-100"
        >
          <ChatMockup />
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 4: SLIMME DASHBOARDS
// =============================================================================

function SlideDashboards() {
  return (
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center rounded-3xl overflow-hidden bg-midnight/50">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
        {/* Left: Animated Chart Visual */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md lg:max-w-xl scale-75 sm:scale-90 lg:scale-100"
        >
          <AnimatedChart />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-3 sm:space-y-6 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
            <LayoutDashboard className="w-3 h-3 sm:w-4 sm:h-4 text-amber" />
            <span className="font-mono text-xs sm:text-sm text-amber uppercase tracking-wide">
              Slimme Dashboards
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Stuur op{' '}
            <span className="text-amber">Data</span>,{' '}
            niet op gevoel.
          </h3>

          <p className="font-inter text-sm sm:text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Real-time inzichten. Zie direct hoeveel winst je vandaag hebt
            gemaakt. Custom dashboards die je écht begrijpt.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-transparent border-2 border-amber text-amber font-inter font-semibold text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-xl hover:bg-amber hover:text-midnight transition-all"
          >
            Zie Voorbeeld
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center justify-center rounded-3xl overflow-hidden bg-midnight/50">
      {/* Centered content */}
      <div className="text-center max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-4 sm:mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full bg-amber/10 border border-amber/30">
            <ShieldCheck
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 text-amber drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-3 sm:mb-6 leading-tight"
        >
          Geen{' '}
          <span className="text-amber">Gijzeling.</span>
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter text-sm sm:text-base md:text-lg text-slate-400 mb-6 sm:mb-10 max-w-2xl mx-auto"
        >
          Ik bouw in standaarden (n8n, SQL). Jij blijft 100% eigenaar. Geen vendor lock-in.
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
            className="inline-flex items-center gap-2 sm:gap-3 bg-teal text-midnight font-montserrat font-semibold text-sm sm:text-base md:text-lg px-6 py-3 sm:px-10 sm:py-5 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.8)] transition-shadow"
          >
            Start Samenwerking
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE 6: GRAND FINALE (NEW)
// =============================================================================

function SlideGrandFinale() {
  return (
    <div className="relative flex-shrink-0 w-[92vw] md:w-[90vw] lg:w-[88vw] h-full flex items-center justify-center rounded-3xl overflow-hidden bg-midnight/50">
      {/* Radial glow background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(6,182,212,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs sm:text-sm uppercase tracking-wider text-teal mb-3 sm:mb-6"
        >
          READY?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-montserrat font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl text-white mb-3 sm:mb-6 leading-tight"
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-inter text-sm sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-14 max-w-2xl mx-auto"
        >
          Je weet nu wat er kan. De enige vraag is:{' '}
          <span className="text-white font-medium">wanneer start jij?</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 80px -10px rgba(6,182,212,0.8)' }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 sm:gap-4 bg-teal text-midnight font-montserrat font-bold text-sm sm:text-base md:text-lg px-6 py-3 sm:px-10 sm:py-5 md:px-14 md:py-6 rounded-xl sm:rounded-2xl shadow-[0_0_60px_-10px_rgba(6,182,212,0.6)] transition-all"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Plan je Strategie Sessie</span>
            <span className="sm:hidden">Plan Sessie</span>
            <motion.div
              className="transition-transform"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// SLIDE COUNTER (NEW)
// =============================================================================

const TOTAL_SLIDES = 6;

function SlideCounter({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Map scroll progress to current slide number (1-6)
  const slideNumber = useTransform(scrollYProgress, (value) => {
    const slide = Math.min(Math.floor(value * TOTAL_SLIDES) + 1, TOTAL_SLIDES);
    return slide.toString().padStart(2, '0');
  });

  return (
    <div className="absolute bottom-8 left-8 font-mono text-sm flex items-baseline gap-1">
      <motion.span className="text-teal font-medium">{slideNumber}</motion.span>
      <span className="text-slate-600">/</span>
      <span className="text-slate-600">06</span>
    </div>
  );
}

// =============================================================================
// SLIDE INDICATORS
// =============================================================================

function SlideIndicator({ index, scrollYProgress }: { index: number; scrollYProgress: MotionValue<number> }) {
  // 6 slides: each takes 1/6 (0.167) of the progress
  const interval = 1 / TOTAL_SLIDES;
  const backgroundColor = useTransform(
    scrollYProgress,
    [index * interval, (index + 0.5) * interval, (index + 1) * interval],
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
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <SlideIndicator key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

// =============================================================================
// DESKTOP: HORIZONTAL CINEMA SCROLL
// =============================================================================

function ServicesSectionDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
      scrollYProgress.set(progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress]);

  // Direct 1:1 mapping - no spring for immediate response to scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-82%']);

  // Only use spring for the progress bar indicator (subtle smoothing)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      id="oplossing"
      className="relative h-[600vh] bg-midnight"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden gpu-accelerated">
        <NoiseOverlay />

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

        <motion.div
          style={{ x }}
          className="flex h-full w-max will-change-transform gap-12 md:gap-16 lg:gap-20 xl:gap-24"
        >
          <SlideIntro />
          <SlideAutomation />
          <SlideAIAgents />
          <SlideDashboards />
          <SlideOwnership />
          <SlideGrandFinale />
        </motion.div>

        <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 max-w-xs h-1 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full bg-gradient-to-r from-teal to-cyan-400 origin-left"
          />
        </div>

        <div className="hidden md:block">
          <SlideCounter scrollYProgress={scrollYProgress} />
        </div>

        <div className="hidden md:block">
          <SlideIndicators scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// MOBILE: VERTICAL STACK LAYOUT (simpler, more natural scrolling)
// =============================================================================

function MobileSlideIntro({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full min-h-[80vh] flex items-center justify-center py-20 px-4">
      {/* Gradient background - neutral start */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/[0.02] to-teal/[0.03]" />

      {/* Simplified network background for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-teal/20 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] rounded-full bg-teal/10 blur-[60px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-wider text-teal mb-4"
        >
          DE OPLOSSING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-3xl sm:text-4xl text-white mb-4 leading-tight"
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
          className="font-inter text-base text-slate-400 mb-8"
        >
          Stop met handmatig werk. Start met schalen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 text-slate-500"
        >
          <span className="font-inter text-sm">Scroll om te ontdekken</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function MobileSlideAutomation({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full py-14 px-4">
      {/* Gradient background - teal hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal/[0.03] via-teal/[0.04] to-teal/[0.02]" />

      {/* Subtle container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5">
            <Bot className="w-4 h-4 text-teal" />
            <span className="font-mono text-xs text-teal uppercase tracking-wide">
              Workflow Automatisering
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white leading-tight">
            De &apos;Busy Work&apos; <span className="text-teal">Killer.</span>
          </h3>

          <p className="font-inter text-sm text-slate-400 leading-relaxed">
            Je typt data over. Je sleept bestanden. Je checkt mailtjes. Stop daarmee.
            Ik koppel je systemen aan elkaar via API&apos;s.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <WorkflowMockup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm px-5 py-2.5 rounded-xl"
          >
            Bekijk Cases
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileSlideAIAgents({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full py-14 px-4">
      {/* Gradient background - teal to amber transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal/[0.02] via-teal/[0.02] to-amber/[0.02]" />

      {/* Subtle container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-full px-3 py-1.5">
            <MessageSquare className="w-4 h-4 text-teal" />
            <span className="font-mono text-xs text-teal uppercase tracking-wide">
              AI Agents
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white leading-tight">
            Jouw{' '}
            <span className="bg-gradient-to-r from-teal via-cyan-300 to-teal bg-clip-text text-transparent">
              Tweede Brein.
            </span>
          </h3>

          <p className="font-inter text-sm text-slate-400 leading-relaxed">
            AI die met je meedenkt. Mailtjes beantwoorden, offertes voorbereiden of samenvattingen maken.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <ChatMockup />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-teal text-midnight font-inter font-semibold text-sm px-5 py-2.5 rounded-xl"
          >
            Ontdek AI
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileSlideDashboards({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full py-14 px-4">
      {/* Gradient background - amber hint */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber/[0.02] via-amber/[0.03] to-amber/[0.02]" />

      {/* Subtle container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-4 text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-amber/10 border border-amber/30 rounded-full px-3 py-1.5">
            <LayoutDashboard className="w-4 h-4 text-amber" />
            <span className="font-mono text-xs text-amber uppercase tracking-wide">
              Slimme Dashboards
            </span>
          </div>

          <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white leading-tight">
            Stuur op <span className="text-amber">Data</span>, niet op gevoel.
          </h3>

          <p className="font-inter text-sm text-slate-400 leading-relaxed">
            Real-time inzichten. Zie direct hoeveel winst je vandaag hebt gemaakt. Custom dashboards die je écht begrijpt.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <AnimatedChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-amber text-amber font-inter font-semibold text-sm px-5 py-2.5 rounded-xl"
          >
            Zie Voorbeeld
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileSlideOwnership({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full py-14 px-4">
      {/* Gradient background - amber fading out */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber/[0.02] via-amber/[0.01] to-transparent" />

      {/* Subtle container */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative max-w-lg mx-auto bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] rounded-2xl p-5"
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber/10 border border-amber/30">
              <ShieldCheck className="w-10 h-10 text-amber" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-montserrat font-extrabold text-2xl sm:text-3xl text-white mb-4 leading-tight"
          >
            Geen <span className="text-amber">Gijzeling.</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-inter text-sm text-slate-400"
          >
            Ik bouw in standaarden (n8n, SQL). Jij blijft 100% eigenaar. Geen vendor lock-in.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function MobileSlideGrandFinale({ onInView }: { onInView?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !onInView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onInView(); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <div ref={ref} className="relative w-full min-h-[60vh] flex items-center justify-center py-16 px-4">
      {/* Gradient background - CTA highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal/[0.03] to-teal/[0.04]" />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-wider text-teal mb-4"
        >
          READY?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-montserrat font-extrabold text-3xl sm:text-4xl text-white mb-4 leading-tight"
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
          className="font-inter text-base text-slate-400 mb-8"
        >
          Je weet nu wat er kan. De enige vraag is:{' '}
          <span className="text-white font-medium">wanneer start jij?</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-teal text-midnight font-montserrat font-bold text-base px-6 py-4 rounded-xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]"
          >
            <Calendar className="w-5 h-5" />
            Plan Sessie
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// MOBILE PROGRESS DOTS
// =============================================================================

function MobileProgressDots({ activeSlide }: { activeSlide: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed left-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            activeSlide === i
              ? 'bg-teal scale-125 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
              : 'bg-white/20'
          )}
          animate={{
            scale: activeSlide === i ? 1.25 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
    </motion.div>
  );
}

function ServicesSectionMobile() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showDots, setShowDots] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Show/hide dots based on section visibility
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowDots(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSlideInView = useCallback((index: number) => () => {
    setActiveSlide(index);
  }, []);

  return (
    <section ref={sectionRef} id="oplossing" className="relative bg-midnight overflow-hidden">
      {/* Progress dots */}
      {showDots && <MobileProgressDots activeSlide={activeSlide} />}

      {/* Simple vertical stack of slides */}
      <MobileSlideIntro onInView={handleSlideInView(0)} />
      <MobileSlideAutomation onInView={handleSlideInView(1)} />
      <MobileSlideAIAgents onInView={handleSlideInView(2)} />
      <MobileSlideDashboards onInView={handleSlideInView(3)} />
      <MobileSlideOwnership onInView={handleSlideInView(4)} />
      <MobileSlideGrandFinale onInView={handleSlideInView(5)} />
    </section>
  );
}

// =============================================================================
// MAIN EXPORT - Responsive: Mobile vertical stack, Desktop horizontal scroll
// =============================================================================

export function ServicesSection() {
  return (
    <>
      {/* Mobile: Vertical stack layout (< 1024px) */}
      <div className="lg:hidden">
        <ServicesSectionMobile />
      </div>
      {/* Desktop: Horizontal cinema scroll (>= 1024px) */}
      <div className="hidden lg:block">
        <ServicesSectionDesktop />
      </div>
    </>
  );
}
