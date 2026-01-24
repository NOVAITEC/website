'use client';

import { motion } from 'framer-motion';
import { Bot, LayoutDashboard, BrainCircuit, ShieldCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ServiceBlockProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  text: string;
  className?: string;
  index: number;
  isGuarantee?: boolean;
}

function ServiceBlock({
  icon: Icon,
  iconColor,
  title,
  text,
  className,
  index,
  isGuarantee = false,
}: ServiceBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        'group relative overflow-hidden',
        // Glassmorphism base
        'bg-slate-900/40 backdrop-blur-md',
        // Border with subtle gradient effect
        'border border-white/10 rounded-2xl p-8',
        // Hover glow effect
        'hover:border-teal/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
        'transition-all duration-500',
        'min-h-[220px] flex flex-col',
        // Special guarantee card styling
        isGuarantee && 'bg-gradient-to-r from-slate-900/60 to-amber/5',
        className
      )}
    >
      {/* Tech corner accents */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-600 opacity-50">
        [
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] text-slate-600 opacity-50">
        ]
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-600 opacity-50 group-hover:text-teal/50 transition-colors">
        +
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-slate-600 opacity-50 group-hover:text-teal/50 transition-colors">
        +
      </div>

      {/* Floating Icon */}
      <motion.div
        className="mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Icon
          className={cn('w-10 h-10', iconColor, 'drop-shadow-lg')}
          strokeWidth={1.5}
        />
      </motion.div>

      {/* Title */}
      <h3 className="font-montserrat font-bold text-xl text-white mb-3">
        {title}
      </h3>

      {/* Text */}
      <p className="font-inter text-slate-400 leading-relaxed flex-grow">
        {text}
      </p>

      {/* Inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

const services = [
  {
    icon: Bot,
    iconColor: 'text-teal',
    title: 'Workflow Automatisering',
    text: 'Repeterende taken? Die doen we niet meer zelf. Van factuurverwerking tot klantcommunicatie: als het een patroon heeft, automatiseren we het.',
    className: 'md:col-span-2',
  },
  {
    icon: LayoutDashboard,
    iconColor: 'text-amber',
    title: 'Slimme Dashboards',
    text: 'Stuur niet op onderbuikgevoel, maar op data. Al je cijfers in één helder overzicht.',
    className: 'md:col-span-1',
  },
  {
    icon: BrainCircuit,
    iconColor: 'text-teal',
    title: 'AI Integraties',
    text: 'ChatGPT koppelen aan je mail? Documenten laten samenvatten? We maken je bedrijf slimmer.',
    className: 'md:col-span-1',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-amber',
    title: 'Jouw Systeem, Jouw Eigendom',
    text: 'We bouwen in n8n en standaard tools. Geen vendor lock-in. Jij blijft eigenaar van je eigen systeem.',
    className: 'md:col-span-2',
    isGuarantee: true,
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper className="bg-midnight" id="oplossing">
      {/* === THE STAGE: Background Effects === */}

      {/* Pulsating Teal Spotlight */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-teal/20 blur-[120px] -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Pulsating Amber Spotlight */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-amber/10 blur-[100px] -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid Overlay Pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm uppercase tracking-wider text-teal mb-4"
        >
          DE OPLOSSING
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montserrat font-extrabold text-5xl md:text-6xl lg:text-7xl mb-6"
        >
          <span className="text-white">Van Chaos naar </span>
          <span className="bg-gradient-to-r from-teal via-cyan-300 to-white bg-clip-text text-transparent">
            Controle.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-lg md:text-xl text-slate-400"
        >
          Geen pleisters plakken, maar het fundament herstellen. Dit is hoe we
          dat doen.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceBlock
            key={index}
            icon={service.icon}
            iconColor={service.iconColor}
            title={service.title}
            text={service.text}
            className={service.className}
            index={index}
            isGuarantee={service.isGuarantee}
          />
        ))}
      </div>

      {/* Bottom fade line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-teal/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </SectionWrapper>
  );
}
