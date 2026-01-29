"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Wat doet NOVAITEC precies?",
    answer:
      "NOVAITEC helpt MKB-ondernemers met AI-gedreven automatisering. Ik bouw geautomatiseerde workflows, AI agents en slimme dashboards. Het doel? Jouw 'busy work' elimineren zodat je je kunt focussen op werk dat er echt toe doet.",
  },
  {
    question: "Voor wie is NOVAITEC geschikt?",
    answer:
      "NOVAITEC is ideaal voor MKB-ondernemers die tijd verliezen aan handmatige taken zoals administratie, data overtypen, en repetitief mailverkeer. Als je 's avonds nog administratie doet in plaats van bij je gezin zit, kan ik je helpen.",
  },
  {
    question: "Wat kost AI automatisering bij NOVAITEC?",
    answer:
      "Ik werk niet op basis van uurtje-factuurtje, maar op basis van waarde. Je betaalt voor de oplossing en de rust, niet voor de tijd. Na een gratis strategie sessie krijg je een helder voorstel met vaste prijs - geen verrassingen achteraf.",
  },
  {
    question: "Wat is n8n en waarom gebruik je dat?",
    answer:
      "n8n is een open-source workflow automatiseringstool. Ik kies voor n8n omdat het geen vendor lock-in heeft - jij blijft 100% eigenaar van je workflows. Als je ooit weg wilt, krijg je gewoon de sleutels mee.",
  },
  {
    question: "Kan ik mijn automatisering zelf beheren na oplevering?",
    answer:
      "Ja, dat is het hele punt. Ik bouw in standaarden (n8n, SQL) die overdraagbaar zijn. Je krijgt uitleg hoe alles werkt en kunt zelf aanpassingen maken. Natuurlijk sta ik ook klaar voor ondersteuning als je dat nodig hebt.",
  },
  {
    question: "Hoe zit het met de privacy van mijn bedrijfsdata?",
    answer:
      "Data Privacy staat voorop. Ik stuur nooit persoonsgegevens naar publieke AI-modellen zonder anonimisering. Je data blijft van jou. Daarnaast werk ik met 'human-in-the-loop': kritieke acties hebben altijd menselijke goedkeuring nodig.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-b border-slate-800 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-montserrat font-semibold text-lg text-paper group-hover:text-teal transition-colors pr-8">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
            isOpen
              ? "bg-teal/20 text-teal"
              : "bg-slate-800 text-slate-400 group-hover:bg-teal/10 group-hover:text-teal"
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 font-inter leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal/5 rounded-bl-[100px] blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-teal/10 border border-teal/20 rounded-full px-4 py-2 mb-6">
              <HelpCircle className="w-4 h-4 text-teal" />
              <span className="font-mono text-sm text-teal uppercase tracking-wide">
                Veelgestelde Vragen
              </span>
            </div>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-midnight mb-4">
              Heb je nog vragen?
            </h2>
            <p className="font-inter text-slate-text text-lg">
              Hier vind je antwoorden op de meest gestelde vragen over NOVAITEC.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <div className="bg-midnight rounded-2xl p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="font-inter text-slate-text mb-4">
              Staat je vraag er niet tussen?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-inter font-semibold text-teal hover:text-teal/80 transition-colors"
            >
              Neem contact op
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
