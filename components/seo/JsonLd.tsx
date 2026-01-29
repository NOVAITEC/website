import Script from "next/script";

// JSON-LD Structured Data voor NOVAITEC
// Deze schemas helpen Google en AI-systemen je bedrijf te begrijpen

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://novaitec.nl/#organization",
  name: "NOVAITEC",
  alternateName: "NOVAITEC AI-Driven Automation",
  url: "https://novaitec.nl",
  logo: {
    "@type": "ImageObject",
    url: "https://novaitec.nl/images/novaitec_logo_transparant_kleur.png",
    width: 512,
    height: 512,
  },
  image: "https://novaitec.nl/images/og-image.jpg",
  description:
    "NOVAITEC helpt MKB-ondernemers met AI-gedreven automatisering. Wij verkopen geen AI, wij verkopen rust en resultaat. Workflow automatisering, AI agents en slimme dashboards.",
  slogan: "AI-Driven Automation",
  foundingDate: "2025",
  founder: {
    "@id": "https://novaitec.nl/#kyan-cordes",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
    addressRegion: "Noord-Brabant",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "kyan@novaitec.nl",
    contactType: "customer service",
    availableLanguage: ["Dutch", "English"],
  },
  sameAs: ["https://www.linkedin.com/in/kyancordes"],
  knowsAbout: [
    "AI Automation",
    "Workflow Automation",
    "n8n",
    "Business Process Automation",
    "AI Agents",
    "Dashboard Development",
    "API Integration",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://novaitec.nl/#kyan-cordes",
  name: "Kyan Cordes",
  jobTitle: "Process Engineer & AI Automation Specialist",
  description:
    "Founder van NOVAITEC. Helpt MKB-ondernemers met AI-gedreven automatisering. Combineert technische expertise met een coachende aanpak.",
  url: "https://novaitec.nl",
  image: "https://novaitec.nl/images/kyan-cordes.JPG",
  worksFor: {
    "@id": "https://novaitec.nl/#organization",
  },
  sameAs: ["https://www.linkedin.com/in/kyancordes"],
  knowsAbout: [
    "AI Automation",
    "n8n Workflow Automation",
    "Business Process Optimization",
    "AI Agents",
    "Dashboard Development",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://novaitec.nl/#services",
  name: "AI-Driven Automation Services",
  description:
    "NOVAITEC biedt AI-gedreven automatiseringsdiensten voor MKB-ondernemers: workflow automatisering, AI agents, en slimme dashboards.",
  provider: {
    "@id": "https://novaitec.nl/#organization",
  },
  serviceType: "Business Automation",
  areaServed: {
    "@type": "Country",
    name: "Netherlands",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "NOVAITEC Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Workflow Automatisering",
          description:
            "Koppel je systemen aan elkaar via API's. Stop met handmatig data overtypen, bestanden slepen en mailtjes checken. Ik bouw geautomatiseerde workflows met n8n.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Agents",
          description:
            "AI die met je meedenkt. Mailtjes beantwoorden, offertes voorbereiden of samenvattingen maken. Jouw tweede brein dat 24/7 doorwerkt.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Slimme Dashboards",
          description:
            "Stuur op data, niet op gevoel. Real-time inzichten met custom dashboards die je écht begrijpt. Zie direct hoeveel winst je vandaag hebt gemaakt.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://novaitec.nl/#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wat doet NOVAITEC precies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NOVAITEC helpt MKB-ondernemers met AI-gedreven automatisering. Ik bouw geautomatiseerde workflows, AI agents en slimme dashboards. Het doel? Jouw 'busy work' elimineren zodat je je kunt focussen op werk dat er echt toe doet.",
      },
    },
    {
      "@type": "Question",
      name: "Voor wie is NOVAITEC geschikt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NOVAITEC is ideaal voor MKB-ondernemers die tijd verliezen aan handmatige taken zoals administratie, data overtypen, en repetitief mailverkeer. Als je 's avonds nog administratie doet in plaats van bij je gezin zit, kan ik je helpen.",
      },
    },
    {
      "@type": "Question",
      name: "Wat kost AI automatisering bij NOVAITEC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ik werk niet op basis van uurtje-factuurtje, maar op basis van waarde. Je betaalt voor de oplossing en de rust, niet voor de tijd. Na een gratis strategie sessie krijg je een helder voorstel met vaste prijs - geen verrassingen achteraf.",
      },
    },
    {
      "@type": "Question",
      name: "Wat is n8n en waarom gebruikt NOVAITEC dat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "n8n is een open-source workflow automatiseringstool. Ik kies voor n8n omdat het geen vendor lock-in heeft - jij blijft 100% eigenaar van je workflows. Als je ooit weg wilt, krijg je gewoon de sleutels mee.",
      },
    },
    {
      "@type": "Question",
      name: "Kan ik mijn automatisering zelf beheren na oplevering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dat is het hele punt. Ik bouw in standaarden (n8n, SQL) die overdraagbaar zijn. Je krijgt uitleg hoe alles werkt en kunt zelf aanpassingen maken. Natuurlijk sta ik ook klaar voor ondersteuning als je dat nodig hebt.",
      },
    },
    {
      "@type": "Question",
      name: "Hoe zit het met de privacy van mijn bedrijfsdata?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Data Privacy staat voorop. Ik stuur nooit persoonsgegevens naar publieke AI-modellen zonder anonimisering. Je data blijft van jou. Daarnaast werk ik met 'human-in-the-loop': kritieke acties hebben altijd menselijke goedkeuring nodig.",
      },
    },
    {
      "@type": "Question",
      name: "Hoelang duurt het om een automatisering te bouwen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dat hangt af van de complexiteit. Een simpele workflow kan binnen een week live staan. Grotere projecten met meerdere integraties nemen meer tijd. Na de strategie sessie geef ik je een realistische planning.",
      },
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://novaitec.nl/#website",
  url: "https://novaitec.nl",
  name: "NOVAITEC",
  description: "AI-Driven Automation voor MKB-ondernemers",
  publisher: {
    "@id": "https://novaitec.nl/#organization",
  },
  inLanguage: "nl-NL",
};

// Gecombineerde schema's in één graph
const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    personSchema,
    serviceSchema,
    faqSchema,
    webSiteSchema,
  ],
};

// Gecombineerde component voor alle schemas
export function AllSchemas() {
  return (
    <Script
      id="json-ld-schemas"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}
