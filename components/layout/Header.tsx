"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Over mij", href: "#over" },
  { name: "Services", href: "#oplossing" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
          isScrolled
            ? "bg-midnight/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <Image
                  src="/images/novaitec_beeldmerk_transparant_wit.png"
                  alt="NOVAITEC Icon"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 56px"
                />
                <span className="text-xl sm:text-2xl md:text-3xl font-montserrat font-bold text-paper tracking-tight">
                  NOVAITEC<span className="text-teal">.</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={link.href}
                    className="text-paper/80 hover:text-teal transition-colors duration-200 font-inter font-medium"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <Button asChild className="hover:scale-105 transition-transform">
                  <Link href="#contact">
                    Start gesprek
                  </Link>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-paper p-2 hover:bg-paper/10 rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? "Sluit menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - CSS transitions instead of Framer Motion */}
      <div
        className={`fixed inset-0 bg-midnight/95 backdrop-blur-lg z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      {/* Menu Content */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-midnight z-50 md:hidden shadow-2xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigatie menu"
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-paper p-2 hover:bg-paper/10 rounded-lg transition-colors"
              aria-label="Sluit menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-5"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 0.1}s` : "0s" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-paper text-xl font-inter font-medium py-3 px-4 rounded-lg hover:bg-teal/20 hover:text-teal transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div
              className={`mt-8 transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? "0.4s" : "0s" }}
            >
              <Button asChild className="w-full">
                <Link
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start gesprek
                </Link>
              </Button>
            </div>
          </nav>

          {/* Footer Info */}
          <div className="p-6 border-t border-paper/10">
            <p className="text-paper/60 text-sm font-inter">
              NOVAITEC © 2026
            </p>
            <p className="text-paper/40 text-xs font-inter mt-1">
              AI-gedreven Automatisering
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
