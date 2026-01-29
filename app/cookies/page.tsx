"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-teal transition-colors mb-8 font-inter text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Terug naar home
            </Link>

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-teal/10 border border-teal/20">
                <Cookie className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Cookie Policy
              </h1>
            </div>

            <p className="text-slate-400 font-inter mb-12">
              Laatst bijgewerkt: januari 2025
            </p>

            {/* Content */}
            <div className="space-y-10 text-slate-300 font-inter">
              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Wat zijn cookies?
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Cookies zijn kleine tekstbestanden die door websites op je computer, tablet
                  of telefoon worden geplaatst. Deze bestanden bevatten informatie die bij
                  een volgend bezoek aan de website weer kan worden uitgelezen. Cookies zorgen
                  ervoor dat de website goed functioneert en onthouden bijvoorbeeld je voorkeuren.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Welke cookies gebruik ik?
                </h2>
                <p className="leading-relaxed mb-6">
                  NOVAITEC maakt gebruik van de volgende categorieën cookies:
                </p>

                {/* Functionele Cookies */}
                <div className="bg-slate-900/50 rounded-xl p-6 mb-4 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-montserrat font-semibold text-paper">
                      Functionele Cookies
                    </h3>
                    <span className="text-xs font-mono bg-teal/20 text-teal px-2 py-1 rounded">
                      Altijd actief
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Deze cookies zijn noodzakelijk voor het functioneren van de website.
                    Zonder deze cookies werkt de website niet naar behoren.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-2 text-slate-400 font-medium">Cookie</th>
                          <th className="text-left py-2 text-slate-400 font-medium">Doel</th>
                          <th className="text-left py-2 text-slate-400 font-medium">Bewaartermijn</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-slate-800">
                          <td className="py-2 font-mono text-xs">cookie_consent</td>
                          <td className="py-2">Onthoudt je cookievoorkeuren</td>
                          <td className="py-2">1 jaar</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytische Cookies */}
                <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-montserrat font-semibold text-paper">
                      Analytische Cookies
                    </h3>
                    <span className="text-xs font-mono bg-amber/20 text-amber px-2 py-1 rounded">
                      Opt-in vereist
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">
                    Deze cookies verzamelen geanonimiseerde informatie over hoe bezoekers
                    de website gebruiken. Hiermee kan ik de website verbeteren.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-2 text-slate-400 font-medium">Cookie</th>
                          <th className="text-left py-2 text-slate-400 font-medium">Doel</th>
                          <th className="text-left py-2 text-slate-400 font-medium">Bewaartermijn</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        <tr className="border-b border-slate-800">
                          <td className="py-2 font-mono text-xs">_ga</td>
                          <td className="py-2">Google Analytics - Onderscheidt unieke bezoekers</td>
                          <td className="py-2">2 jaar</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="py-2 font-mono text-xs">_ga_*</td>
                          <td className="py-2">Google Analytics - Behoudt sessiestatus</td>
                          <td className="py-2">2 jaar</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Jouw toestemming
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Bij je eerste bezoek aan de website vraag ik je toestemming voor het
                  plaatsen van analytische cookies. Functionele cookies worden altijd geplaatst
                  omdat deze noodzakelijk zijn voor het functioneren van de website. Je kunt
                  je toestemming voor analytische cookies op elk moment intrekken.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Voorkeuren wijzigen
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-4">
                  Je kunt je cookievoorkeuren op de volgende manieren wijzigen:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-400">
                  <li>Via de cookie-banner die verschijnt bij je bezoek aan de website</li>
                  <li>Door de cookies in je browser te verwijderen (zie de helpfunctie van je browser)</li>
                  <li>Door je browserinstellingen aan te passen om cookies te blokkeren</li>
                </ul>
                <p className="leading-relaxed mt-4 text-slate-400">
                  Let op: het blokkeren van functionele cookies kan invloed hebben op de werking
                  van de website.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Cookies van derden
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  De analytische cookies van Google Analytics worden geplaatst door Google LLC.
                  Google kan deze informatie aan derden verstrekken indien Google hiertoe
                  wettelijk wordt verplicht, of voor zover derden de informatie namens Google
                  verwerken. Ik heb hier geen invloed op. Lees het{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal hover:underline"
                  >
                    privacybeleid van Google
                  </a>{" "}
                  voor meer informatie.
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Contact
                </h2>
                <p className="text-sm sm:text-base leading-relaxed">
                  Heeft u vragen over ons cookiebeleid? Neem dan contact met ons op via{" "}
                  <a
                    href="mailto:kyan@novaitec.nl"
                    className="text-teal hover:underline"
                  >
                    kyan@novaitec.nl
                  </a>.
                </p>
              </section>

              <section className="pt-8 border-t border-slate-800">
                <p className="text-sm text-slate-500">
                  NOVAITEC<br />
                  KVK: 99541807<br />
                  E-mail: kyan@novaitec.nl
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
