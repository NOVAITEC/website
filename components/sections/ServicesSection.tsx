'use client';

import { motion } from 'framer-motion';
import { Bot, LayoutDashboard, BrainCircuit, ShieldCheck } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ServiceBlockProps {
  icon: LucideIcon;
  iconColor: string;
  text: string;
  className?: string;
  index: number;
}

function ServiceBlock({ icon: Icon, iconColor, text, className, index }: ServiceBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm',
        'border border-slate-700/50 rounded-xl p-8',
        'hover:border-teal/50 hover:shadow-lg hover:shadow-teal/10',
        'transition-all duration-300',
        'min-h-[200px] flex flex-col justify-center',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-6">
        <div
          className={cn(
            'w-14 h-14 rounded-lg flex items-center justify-center',
            'bg-gradient-to-br from-slate-700/50 to-slate-800/50',
            'group-hover:scale-110 transition-transform duration-300'
          )}
        >
          <Icon className={cn('w-7 h-7', iconColor)} strokeWidth={2} />
        </div>
      </div>

      {/* Text */}
      <p className="font-inter text-slate-300 leading-relaxed">{text}</p>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-teal/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

const services = [
  {
    icon: Bot,
    iconColor: 'text-teal',
    text: 'Repeterende taken? Die doen we niet meer zelf. Van factuurverwerking tot klantcommunicatie: als het een patroon heeft, automatiseren we het.',
    className: 'md:col-span-2', // Groot blok links
    featured: true,
  },
  {
    icon: LayoutDashboard,
    iconColor: 'text-amber',
    text: 'Stuur niet op onderbuikgevoel, maar op data. Al je cijfers in één helder overzicht.',
    className: 'md:col-span-1', // Rechtsboven
  },
  {
    icon: BrainCircuit,
    iconColor: 'text-teal',
    text: 'ChatGPT koppelen aan je mail? Documenten laten samenvatten? We maken je bedrijf slimmer.',
    className: 'md:col-span-1', // Rechtsonder
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-paper',
    text: 'We bouwen in n8n en standaard tools. Geen vendor lock-in. Jij blijft eigenaar van je eigen systeem.',
    className: 'md:col-span-3', // Breed onderaan
    featured: true,
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper className="bg-paper" id="oplossing">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
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
          className="font-montserrat font-bold text-4xl md:text-5xl text-midnight mb-6"
        >
          Van Chaos naar Controle.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-lg text-slate-text"
        >
          Geen pleisters plakken, maar het fundament herstellen. Dit is hoe we dat doen.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <ServiceBlock
            key={index}
            icon={service.icon}
            iconColor={service.iconColor}
            text={service.text}
            className={service.className}
            index={index}
          />
        ))}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber/5 rounded-full blur-3xl -z-10" />
    </SectionWrapper>
  );
}
