"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";

export default function VoorwaardenPage() {
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
                <FileText className="w-6 h-6 text-teal" strokeWidth={1.5} />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-paper">
                Algemene Voorwaarden
              </h1>
            </div>

            <p className="text-slate-400 font-inter mb-12">
              Laatst bijgewerkt: februari 2026
            </p>

            {/* Content */}
            <div className="space-y-10 text-slate-300 font-inter">
              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 1 - Definities
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-4">
                  In deze algemene voorwaarden wordt verstaan onder:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-400">
                  <li><strong className="text-slate-300">NOVAITEC:</strong> De eenmanszaak NOVAITEC, ingeschreven bij de KvK onder nummer 99541807, hierna te noemen &quot;Opdrachtnemer&quot;.</li>
                  <li><strong className="text-slate-300">Opdrachtgever:</strong> De natuurlijke of rechtspersoon die met NOVAITEC een overeenkomst aangaat.</li>
                  <li><strong className="text-slate-300">Overeenkomst:</strong> De overeenkomst tussen Opdrachtgever en NOVAITEC.</li>
                  <li><strong className="text-slate-300">Diensten:</strong> Alle werkzaamheden waartoe opdracht is gegeven, of die voortvloeien uit, dan wel direct verband houden met de opdracht, waaronder advies, consultancy, automatisering en AI-implementaties.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 2 - Toepasselijkheid
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, werkzaamheden, overeenkomsten en leveringen van diensten door NOVAITEC.</li>
                  <li>Afwijkingen van deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.</li>
                  <li>De toepasselijkheid van eventuele inkoop- of andere voorwaarden van Opdrachtgever wordt uitdrukkelijk van de hand gewezen.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 3 - Offertes en Aanbiedingen
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Alle offertes en aanbiedingen van NOVAITEC zijn vrijblijvend, tenzij uitdrukkelijk anders is vermeld.</li>
                  <li>Een offerte is geldig gedurende 30 dagen na dagtekening, tenzij anders aangegeven.</li>
                  <li>NOVAITEC kan niet aan zijn offertes worden gehouden indien de Opdrachtgever redelijkerwijs kan begrijpen dat de offerte een kennelijke vergissing of verschrijving bevat.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 4 - Uitvoering van de Overeenkomst
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>NOVAITEC zal de overeenkomst naar beste inzicht en vermogen uitvoeren.</li>
                  <li>NOVAITEC heeft een inspanningsverplichting en geen resultaatsverplichting, tenzij uitdrukkelijk anders is overeengekomen.</li>
                  <li>Opdrachtgever draagt er zorg voor dat alle gegevens en materialen die noodzakelijk zijn voor het uitvoeren van de opdracht tijdig aan NOVAITEC worden verstrekt.</li>
                  <li>NOVAITEC is gerechtigd derden in te schakelen bij de uitvoering van de overeenkomst.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 5 - Facturering en Betaling
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Betaling dient te geschieden binnen 14 dagen na factuurdatum, tenzij schriftelijk anders is overeengekomen.</li>
                  <li>Bij projecten kan NOVAITEC vooraf een aanbetaling verlangen van maximaal 50% van het offertebedrag.</li>
                  <li>Bij overschrijding van de betalingstermijn is Opdrachtgever van rechtswege in verzuim en is een rente verschuldigd van 1% per maand over het openstaande bedrag.</li>
                  <li>Alle door NOVAITEC gemaakte kosten voor het innen van de vordering komen voor rekening van Opdrachtgever.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 6 - Intellectueel Eigendom
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Na volledige betaling van het overeengekomen bedrag gaan alle rechten van intellectuele eigendom op de door NOVAITEC ontwikkelde producten, waaronder software, documentatie en werkprocessen, over naar Opdrachtgever.</li>
                  <li>Opdrachtgever verkrijgt na volledige betaling het volledige eigendomsrecht op de geleverde producten, inclusief broncode, data en documentatie. Opdrachtgever mag de producten vrij gebruiken, aanpassen, vermenigvuldigen en overdragen.</li>
                  <li>NOVAITEC behoudt het recht om algemene kennis, technieken en ervaring die zijn opgedaan tijdens de uitvoering van de opdracht te gebruiken voor andere projecten, mits hierbij geen vertrouwelijke informatie van Opdrachtgever wordt gedeeld.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 7 - Aansprakelijkheid
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>NOVAITEC is uitsluitend aansprakelijk voor directe schade die het rechtstreekse gevolg is van een toerekenbare tekortkoming in de nakoming van de overeenkomst.</li>
                  <li>De aansprakelijkheid van NOVAITEC is beperkt tot het bedrag dat in het desbetreffende geval door de aansprakelijkheidsverzekering wordt uitbetaald, of bij gebreke daarvan tot maximaal het factuurbedrag van de betreffende opdracht.</li>
                  <li>NOVAITEC is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 8 - Overmacht
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>In geval van overmacht is NOVAITEC niet gehouden tot het nakomen van enige verplichting.</li>
                  <li>Onder overmacht wordt verstaan: elke omstandigheid buiten de wil van NOVAITEC, waardoor de nakoming van verplichtingen geheel of gedeeltelijk wordt verhinderd, waaronder storingen in de dienstverlening van derden, ziekte en technische storingen.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 9 - Geheimhouding
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Beide partijen zijn verplicht tot geheimhouding van alle vertrouwelijke informatie die zij in het kader van de overeenkomst van elkaar hebben verkregen.</li>
                  <li>Deze geheimhoudingsplicht geldt ook na beëindiging van de overeenkomst.</li>
                </ol>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-montserrat font-semibold text-paper mb-4">
                  Artikel 10 - Toepasselijk Recht en Geschillen
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-slate-400">
                  <li>Op alle overeenkomsten tussen NOVAITEC en Opdrachtgever is Nederlands recht van toepassing.</li>
                  <li>Geschillen zullen bij uitsluiting worden voorgelegd aan de bevoegde rechter in het arrondissement waar NOVAITEC is gevestigd.</li>
                  <li>Partijen zullen pas een beroep op de rechter doen nadat zij zich tot het uiterste hebben ingespannen een geschil in onderling overleg te beslechten.</li>
                </ol>
              </section>

              <section className="pt-8 border-t border-slate-800">
                <p className="text-sm text-slate-500">
                  NOVAITEC<br />
                  KVK: 99541807<br />
                  BTW: NL005394359B21<br />
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
