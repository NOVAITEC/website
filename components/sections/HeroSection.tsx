"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-midnight">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Blob 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-teal/20 rounded-full blur-3xl"
        />

        {/* Main Gradient Blob 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-teal/15 rounded-full blur-3xl"
        />

        {/* Accent Gradient Blob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-amber/10 rounded-full blur-3xl"
        />

        {/* Decorative Tech Lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-slate-800/80 border border-teal/30 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="w-4 h-4 text-teal" />
            <span className="text-teal text-sm font-inter font-medium">
              AI-gedreven Automatisering voor MKB
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-montserrat font-extrabold text-white mb-6 sm:mb-8 leading-tight"
          >
            De <span className="text-teal">motor</span> achter
            <br />
            jouw ambitie.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-paper/80 font-inter mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Terwijl jij bouwt aan je visie, zorg ik dat alles blijft draaien.
            Slimme automatisering die ruimte schept — voor groei, niet voor gedoe.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="#contact"
              className="group inline-flex items-center space-x-2 bg-teal text-midnight px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-inter font-semibold text-base sm:text-lg hover:bg-teal/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-teal/20 w-full sm:w-auto justify-center"
            >
              <span>Start je automatisering</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#oplossing"
              className="group inline-flex items-center space-x-2 bg-paper/5 border-2 border-paper/20 text-paper px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-inter font-semibold text-base sm:text-lg hover:bg-paper/10 hover:border-teal/50 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Zap className="w-5 h-5 text-teal" />
              <span>Bekijk wat ik doe</span>
            </Link>
          </motion.div>

          {/* Trust Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-paper/10"
          >
            <p className="text-paper/50 text-sm font-inter mb-4">
              Vertrouwd door ondernemers die hun tijd terug willen
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-paper/70 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-montserrat font-bold text-teal">
                  4 uur
                </p>
                <p className="text-sm font-inter">per week bespaard</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-montserrat font-bold text-teal">
                  2 weken
                </p>
                <p className="text-sm font-inter">eerste resultaat</p>
              </div>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-montserrat font-bold text-teal">
                  100%
                </p>
                <p className="text-sm font-inter">persoonlijke service</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile for performance */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <div className="w-6 h-10 border-2 border-paper/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-teal rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
