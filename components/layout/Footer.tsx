"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Over Mij", href: "/#over" },
  { name: "Services", href: "/#oplossing" },
  { name: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Algemene Voorwaarden", href: "/voorwaarden" },
  { name: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/in/kyancordes", icon: Linkedin },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Footer() {
  return (
    <footer className="bg-[#050f1a] border-t border-slate-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20"
      >
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/novaitec_logo_transparant_wit_tekst-wit.png"
                alt="NOVAITEC Logo"
                width={384}
                height={96}
                className="h-20 sm:h-24 w-auto"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 font-inter">
              AI-Driven Automation
            </p>
          </motion.div>

          {/* Column 2: Menu */}
          <motion.div variants={itemVariants}>
            <h3 className="text-paper font-semibold font-montserrat mb-4">
              Menu
            </h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-teal transition-colors duration-200 font-inter"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-paper font-semibold font-montserrat mb-4">
              Juridisch
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-400 hover:text-teal transition-colors duration-200 font-inter"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <span className="text-sm text-slate-500 font-mono">
                  KVK: 99541807
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Socials */}
          <motion.div variants={itemVariants}>
            <h3 className="text-paper font-semibold font-montserrat mb-4">
              Volg NOVAITEC
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-400 hover:text-teal transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-slate-800/50"
        >
          <p className="text-center text-sm text-slate-600 font-inter">
            &copy; {new Date().getFullYear()} NOVAITEC. Alle rechten voorbehouden.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
