"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-midnight min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
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
                <Shield className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Privacy Policy
              </h1>
            </div>

            <p className="text-slate-400 font-inter mb-12">
              Laatst bijgewerkt: januari 2025
            </p>

            {/* Content */}
            <div className="space-y-10 text-slate-300 font-inter">
              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  1. Inleiding
                </h2>
                <p className="leading-relaxed">
                  NOVAITEC, gevestigd in Nederland en ingeschreven bij de Kamer van Koophandel
                  onder nummer 99541807, respecteert de privacy van alle bezoekers van deze website.
                  Ik draag er zorg voor dat de persoonlijke informatie die u mij verschaft
                  vertrouwelijk wordt behandeld.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  2. Welke gegevens verzamel ik?
                </h2>
                <p className="leading-relaxed mb-4">
                  Ik verzamel alleen gegevens die u zelf aan mij verstrekt via het contactformulier:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  <li>Naam</li>
                  <li>E-mailadres</li>
                  <li>Bedrijfsnaam (optioneel)</li>
                  <li>Uw bericht of vraag</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  3. Doel van gegevensverwerking
                </h2>
                <p className="leading-relaxed">
                  Ik gebruik uw gegevens uitsluitend om:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400 mt-4">
                  <li>Te reageren op uw contactverzoek of vraag</li>
                  <li>U te informeren over onze diensten indien u daarom heeft gevraagd</li>
                  <li>De overeenkomst die ik met u sluit uit te voeren</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  4. Google Analytics
                </h2>
                <p className="leading-relaxed">
                  Deze website maakt gebruik van Google Analytics om inzicht te krijgen in
                  bezoekersgedrag. Hierbij worden geanonimiseerde gegevens verzameld over
                  uw websitebezoek. IP-adressen worden geanonimiseerd voordat ze worden
                  opgeslagen. Deze gegevens worden niet gedeeld met derden en kunnen niet
                  worden herleid tot individuele personen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  5. Bewaartermijn
                </h2>
                <p className="leading-relaxed">
                  Ik bewaar uw persoonsgegevens niet langer dan strikt noodzakelijk is om
                  de doelen te realiseren waarvoor uw gegevens worden verzameld. Contactgegevens
                  worden maximaal 2 jaar bewaard na het laatste contact, tenzij er een actieve
                  klantrelatie bestaat.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  6. Uw rechten
                </h2>
                <p className="leading-relaxed mb-4">
                  Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                  <li><strong className="text-slate-300">Recht op inzage:</strong> U kunt opvragen welke gegevens ik van u heb</li>
                  <li><strong className="text-slate-300">Recht op correctie:</strong> U kunt onjuiste gegevens laten aanpassen</li>
                  <li><strong className="text-slate-300">Recht op verwijdering:</strong> U kunt verzoeken uw gegevens te verwijderen</li>
                  <li><strong className="text-slate-300">Recht op bezwaar:</strong> U kunt bezwaar maken tegen de verwerking van uw gegevens</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  7. Beveiliging
                </h2>
                <p className="leading-relaxed">
                  Ik neem passende technische en organisatorische maatregelen om uw
                  persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of
                  diefstal. Onze website maakt gebruik van een SSL-certificaat voor een
                  beveiligde verbinding.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-montserrat font-semibold text-paper mb-4">
                  8. Contact
                </h2>
                <p className="leading-relaxed">
                  Heeft u vragen over deze privacyverklaring of wilt u een beroep doen op
                  een van uw rechten? Neem dan contact met ons op via{" "}
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
