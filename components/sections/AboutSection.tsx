"use client";

import { motion } from "framer-motion";
import { Clock, MessageCircle, Heart } from "lucide-react";

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
    icon: Clock,
    title: "Resultaat boven uren",
    color: "text-teal",
  },
  {
    icon: MessageCircle,
    title: "Tech-savvy, maar overzichtelijk",
    color: "text-teal",
  },
  {
    icon: Heart,
    title: "Menselijke connectie",
    color: "text-amber",
  },
];

export default function AboutSection() {
  return (
    <section
      id="over"
      className="relative bg-midnight overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32"
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
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
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
              <p className="font-mono text-sm text-teal tracking-wide uppercase">
                Waarom ik doe wat ik doe
              </p>
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-paper leading-tight">
                De mens achter de techniek.
              </h2>
            </div>

            {/* Body Paragraphs */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <p className="font-inter text-base sm:text-lg text-slate-300 leading-relaxed">
                Ik zie ondernemers elke dag worstelen met hun tijd. Facturen die
                stapelen, handmatige taken die energie vreten, en avonden die
                opgaan aan administratie in plaats van gezin of hobby.
              </p>

              <p className="font-inter text-base sm:text-lg text-slate-300 leading-relaxed">
                Techniek vind ik mooi, maar het gaat er niet om wat ik kan bouwen.
                Het gaat erom dat het <span className="text-teal">jou</span> helpt.
                Ik sta naast je, niet boven je. Net zoals ik al jaren als coach op
                het sportveld sta: samen kijken wat werkt, en dan gewoon doen.
              </p>

              <p className="font-inter text-base sm:text-lg text-slate-300 leading-relaxed">
                Geen ingewikkelde verhalen, geen uurtje-factuurtje. Gewoon eerlijk
                kijken naar wat jouw dag lichter maakt, en dat bouwen.
              </p>
            </motion.div>

            {/* Core Values - Icon Grid */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-6 pt-4"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center flex-shrink-0 ${value.color}`}
                  >
                    <value.icon className="w-5 h-5" />
                  </div>
                  <span className="font-inter text-slate-200 text-sm">
                    {value.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Photo */}
          <motion.div variants={fadeInRight} className="flex justify-center lg:justify-end">
            {/* Kyan Cordes Portrait - Portrait aspect ratio */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm aspect-[3/4] rounded-xl overflow-hidden"
            >
              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/kyan-cordes.jpg"
                alt="Kyan Cordes - Founder NOVAITEC"
                className="object-cover w-full h-full"
              />

              {/* Subtle overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/30 via-transparent to-transparent" />

              {/* Subtle corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-teal/30 rounded-tr-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
