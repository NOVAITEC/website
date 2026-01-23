'use client';

import { motion } from 'framer-motion';
import { Flame, Moon, FileWarning } from 'lucide-react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { FeatureCard } from '@/components/ui/FeatureCard';

const problems = [
  {
    icon: Flame,
    iconColor: 'text-amber',
    title: "De 'Busy Work' Val",
    description:
      "Je bent drukker met data overtypen en mailtjes zoeken dan met écht ondernemen. Het vreet energie.",
  },
  {
    icon: Moon,
    iconColor: 'text-teal',
    title: 'De Avondploeg',
    description:
      "Overdag word je geleefd door de waan van de dag. Het echte werk verschuift naar je privé-tijd.",
  },
  {
    icon: FileWarning,
    iconColor: 'text-teal',
    title: 'Geen Overzicht',
    description:
      "Klantgegevens in WhatsApp, offertes in Excel en to-do's in je hoofd. Als jij uitvalt, staat alles stil.",
  },
];

export function ProblemSection() {
  return (
    <SectionWrapper className="bg-midnight" id="probleem">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montserrat font-bold text-4xl md:text-5xl text-paper mb-6"
        >
          Ondernemen is vrijheid. Toch?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-inter text-lg text-slate-400"
        >
          Of voelt het vaker als brandjes blussen en &apos;s avonds nog administratie doen?
        </motion.p>
      </div>

      {/* Problem Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
        {problems.map((problem, index) => (
          <FeatureCard
            key={problem.title}
            icon={problem.icon}
            iconColor={problem.iconColor}
            title={problem.title}
            description={problem.description}
            index={index}
          />
        ))}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber/5 rounded-full blur-3xl -z-10" />
    </SectionWrapper>
  );
}
