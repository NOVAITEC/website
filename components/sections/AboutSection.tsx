"use client";

import { motion } from "framer-motion";
import { Target, MessageCircle, Heart, User } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const coreValues = [
  {
    icon: Target,
    title: "Resultaat boven Uren",
    color: "text-teal",
  },
  {
    icon: MessageCircle,
    title: "Jip-en-Janneke taal",
    color: "text-teal",
  },
  {
    icon: Heart,
    title: "Menselijke Connectie",
    color: "text-amber",
  },
];

export default function AboutSection() {
  return (
    <section
      id="over"
      className="relative bg-midnight overflow-hidden py-24 md:py-32"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div
        className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Content */}
          <motion.div variants={fadeInLeft} className="space-y-8">
            {/* Heading */}
            <div className="space-y-4">
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-paper leading-tight">
                De <span className="text-teal">Ingenieur</span>, De{" "}
                <span className="text-teal">Gids</span> & De{" "}
                <span className="text-amber">Coach</span>.
              </h2>
              <p className="font-inter text-xl md:text-2xl text-slate-300 leading-relaxed">
                Ik zie een gat tussen wat{" "}
                <span className="text-teal">technisch kan</span>, en wat{" "}
                <span className="text-amber">MKB-ondernemers</span> dagelijks
                doen.
              </p>
            </div>

            {/* Body Paragraphs */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="font-inter text-lg text-slate-200 leading-relaxed">
                De wereld verandert snel. Nieuwe{" "}
                <span className="text-teal">AI-modellen</span> en{" "}
                <span className="text-teal">agents</span> schieten uit de grond.
                Maar als ik naar de realiteit kijk, zie ik{" "}
                <span className="text-amber">ondernemers</span> vooral brandjes
                blussen en &apos;s avonds administratie doen.
              </p>

              <p className="font-inter text-lg text-slate-200 leading-relaxed">
                <span className="text-teal font-semibold">NOVAITEC</span> vult
                dat gat. Net zoals ik al 4 jaar als{" "}
                <span className="text-amber">coach</span> op het trainingsveld
                sta, neem ik ondernemers digitaal bij de hand. Niet met
                ingewikkelde code, maar met{" "}
                <span className="text-amber">Jip-en-Janneke taal</span>.
              </p>

              <p className="font-inter text-lg text-slate-200 leading-relaxed">
                Mijn belofte? Geen{" "}
                <span className="line-through text-slate-400">
                  uurtje-factuurtje
                </span>{" "}
                en geen vage adviezen. Je betaalt voor de{" "}
                <span className="text-teal font-semibold">oplossing</span>, de{" "}
                <span className="text-amber font-semibold">rust</span> en het{" "}
                <span className="text-teal font-semibold">resultaat</span>.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual + Stats */}
          <motion.div variants={fadeInRight} className="space-y-8">
            {/* Photo Placeholder */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="relative aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden lg:-rotate-2 transition-transform"
            >
              {/* Base layer */}
              <div className="absolute inset-0 bg-slate-800/50 border-2 border-amber/20 rounded-xl" />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent" />

              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-teal/10 flex items-center justify-center">
                  <User className="w-12 h-12 text-teal/50" />
                </div>
                <p className="font-mono text-sm text-slate-400">
                  Foto Kyan Cordes
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber/30 rounded-tr-lg" />
            </motion.div>

            {/* Stats/Kenmerken Block */}
            <motion.div
              variants={fadeInUp}
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 space-y-4"
            >
              <h3 className="font-montserrat font-bold text-lg text-paper mb-4">
                Kernwaarden
              </h3>
              <div className="space-y-4">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-midnight/50 flex items-center justify-center flex-shrink-0 ${value.color}`}
                    >
                      <value.icon className="w-5 h-5" />
                    </div>
                    <span className="font-inter text-slate-200 text-sm">
                      {value.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
