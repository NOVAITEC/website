'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  iconColor = 'text-teal',
  title,
  description,
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        'group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-8',
        'hover:border-amber/50 transition-all duration-300',
        'backdrop-blur-sm',
        className
      )}
    >
      {/* Icon Container */}
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-slate-800/80 group-hover:bg-slate-800 transition-colors">
        <Icon className={cn('w-7 h-7', iconColor)} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <h3 className="font-montserrat font-bold text-xl text-paper mb-3">
        {title}
      </h3>
      <p className="font-inter text-slate-400 leading-relaxed">
        {description}
      </p>

      {/* Decorative gradient blur (subtle depth) */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-teal/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
