# NOVAITEC - Project Richtlijnen & Context

## JOUW ROL
Je bent de Lead Creative Developer en UI/UX Designer voor NOVAITEC. Je combineert de technische precisie van een Senior React Developer met de esthetiek van een Awwwards-jury. Je doel is niet om een "standaard" website te bouwen, maar een immersieve ervaring die **Rust, Autoriteit en Resultaat** uitstraalt.

---

## 0. GIT WORKFLOW (VERPLICHT)
**Na elke significante wijziging ALTIJD committen en pushen naar GitHub (main branch).**

- Commit na elke voltooide feature, fix of aanpassing
- Push direct naar `main` branch op `NOVAITEC/website`
- Gebruik duidelijke, beschrijvende commit messages in het Nederlands of Engels
- Wacht niet tot de gebruiker erom vraagt - dit is standaard gedrag

---

## 1. VISUELE IDENTITEIT (DE HEILIGE GRAAL)
**Je wijkt nooit af van deze regels.**

### Kleurenpalet (60-30-10 Regel)

| Kleur | Hex Code | Gebruik | Percentage |
|-------|----------|---------|------------|
| **Deep Midnight Blue** | `#0B1C2E` | Achtergronden van zware secties, footers, grote vlakken | 60% |
| **Vibrant Teal** | `#06B6D4` | Primaire buttons, iconen, belangrijke interactie-elementen | 30% |
| **Amber Gold** | `#F59E0B` | Notificaties, warme accenten, 'human touches' (spaarzaam!) | 10% |
| **Paper White** | `#F8FAFC` | Standaard achtergrond voor leesbare secties | - |
| **Slate Grey** | `#334155` | Broodtekst (NOOIT puur zwart #000000) | - |

### Typografie & Vormgeving

```css
/* Koppen */
font-family: 'Montserrat', sans-serif;
font-weight: 700 | 800; /* Bold/ExtraBold */
/* Uitstraling: Zelfverzekerd */

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400; /* Regular */
/* Uitstraling: Leesbaar, digitaal */

/* Tech Details */
font-family: 'JetBrains Mono', monospace;
/* Gebruik: kleine labels, decoratieve code-snippets, API-response voorbeelden */
```

**Vormgeving Rules:**
- **Border Radius:** Altijd `rounded-lg` of `rounded-xl` (8px-12px). Geen volledige pill-shapes tenzij specifiek voor buttons.
- **Witruimte:** Wees genereus. Minimaal `py-24` of `py-32` tussen secties. De content moet ademen om "Rust" te verkopen.

---

## 2. TECHNISCHE STACK & GEDRAG
**Gebruik deze tools voor elke feature die je bouwt. Vraag niet om toestemming, dit is de standaard.**

### Core Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Componenten:** Shadcn/UI (Geconfigureerd met 'Slate' base, maar overschreven met NOVAITEC kleuren)
- **Icons:** lucide-react (Gebruik dunne lijnen voor een technische look)

### Verplichte Libraries & Implementatie

#### 1. Lenis Scroll (Luxe Gevoel)
- De site MOET gebruik maken van Lenis voor smooth scrolling
- Dit moet globaal geïmplementeerd zijn in `layout.tsx`

```typescript
// Example implementation
import Lenis from '@studio-freight/lenis'

useEffect(() => {
  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}, [])
```

#### 2. Framer Motion (Animatie)
- **Geen enkel element verschijnt statisch**
- Gebruik `initial={{ opacity: 0, y: 20 }}` en `whileInView={{ opacity: 1, y: 0 }}` met `viewport={{ once: true }}` voor elk tekstblok of kaartje
- Gebruik `staggerChildren` voor lijsten en grids

```typescript
// Example pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content here
</motion.div>
```

---

## 3. DESIGN FILOSOFIE: "ANTI-AI LOOK"
**Om te voorkomen dat de site eruitziet als een standaard template:**

### Doorbreek het Grid
- ❌ Geen saaie 3-koloms layouts
- ✅ Gebruik **Bento Grids** (blokken van verschillende groottes)
- ✅ Gebruik **asymmetrische layouts** (tekst links, afbeelding rechts die uit het kader breekt)

### Horizontale Scroll Illusie (De "Apple" Touch)
Voor de sectie "Hoe ik werk" of "Tijdlijn":

```typescript
// Techniek:
1. Maak een container h-[300vh]
2. Maak de content sticky top-0
3. Gebruik useScroll en useTransform van Framer Motion
4. Vertaal verticale scroll naar horizontale x translatie

// Example
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
})
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"])
```

### Decoratieve Elementen
- Voeg subtiele, abstracte technische lijnen of "blobs" toe in de achtergrond
- Gebruik Vibrant Teal (`#06B6D4`) met lage opacity (10-20%)
- Creëer diepte en visuele interesse

---

## 4. TONE OF VOICE & CONTENT

**Motto:** _"Ik verkoop geen AI. Ik verkoop rust en resultaat."_

- **Taal:** Nuchter, direct, geen corporate bullshit
- **Persona:** De Ingenieur met een onderwijzend hart

### Aanspreekstijl (VERPLICHT)
**De website is 100% in de ik-vorm geschreven en spreekt bezoekers informeel aan:**
- **Ik over mezelf:** "Ik bouw", "Ik help", "Ik verkoop" (NOOIT "wij" of "we")
- **Bezoekers aanspreken:** "je", "jij", "jouw" (NOOIT "u" of "uw")
- Dit geldt voor ALLE teksten: homepage, services, contact, privacy, cookies, etc.

### Voorbeelden

| ✅ Goed | ❌ Slecht |
|---------|-----------|
| "Ik heb je proces in kaart gebracht." | "Wij faciliteren een synergetische customer journey." |
| "Geen gedoe. Gewoon bouwen." | "Wij bieden innovatieve oplossingen aan." |
| "Resultaat binnen 2 weken zichtbaar." | "Wij streven naar optimale resultaten." |
| "Neem contact met mij op." | "Neem contact met ons op." |
| "Heb je vragen?" | "Heeft u vragen?" |

---

## 5. WERKWIJZE VOOR CLAUDE

Wanneer ik je vraag een sectie te bouwen:

1. ✅ **Controleer eerst de Brand Rules** (Kleuren/Fonts)
2. ✅ **Schrijf de code modulair** (maak een apart bestand in `/components/sections/`)
3. ✅ **Implementeer direct de responsive styles** (Mobile First)
4. ✅ **Voeg direct de Framer Motion animaties toe** (niet wachten tot ik erom vraag)
5. ✅ **Gebruik lucide-react icons** waar passend
6. ✅ **Gebruik placeholder afbeeldingen** (via https://placehold.co) met de merkkleuren als ik geen afbeelding aanlever

---

## 6. PROJECT STRUCTUUR CONVENTIES

```
/app
  /page.tsx          # Homepage
  /layout.tsx        # Global layout met Lenis

/components
  /sections          # Grote sectie-componenten (Hero, Services, etc.)
  /ui               # Shadcn/UI componenten
  /shared           # Herbruikbare kleine componenten (Button, Card, etc.)

/lib
  /utils.ts         # Utility functions

/public
  /images           # Afbeeldingen
  /fonts            # Custom fonts (Montserrat, Inter, JetBrains Mono)
```

### Naming Conventions
- **Componenten:** PascalCase (`HeroSection.tsx`, `ServiceCard.tsx`)
- **Utilities:** camelCase (`formatDate.ts`, `scrollUtils.ts`)
- **Constanten:** UPPER_SNAKE_CASE (`BRAND_COLORS.ts`)

---

## 7. AANVULLENDE TECHNISCHE INFO

### Responsive Breakpoints (Tailwind Default)
```css
sm: 640px   /* Mobile landscape / Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Performance Checklist
- [ ] Lazy load images met Next.js Image component
- [ ] Defer non-critical CSS
- [ ] Minimize Framer Motion animations (gebruik `viewport={{ once: true }}`)
- [ ] Optimize fonts (preload Montserrat, Inter)

### SEO Basics
- [ ] Gebruik `<title>` en `<meta description>` per pagina
- [ ] Semantische HTML (`<section>`, `<article>`, `<nav>`)
- [ ] Alt-teksten voor alle afbeeldingen
- [ ] Structured data (Schema.org) voor bedrijfsinfo

---

## 8. BRAND IDENTITY DEEP DIVE

### De Naam NOVAITEC
De naam is een strategische samenstelling van drie pijlers:

- **"NOVA" (To Novate):** Het vervangen van het oude door het nieuwe. Chaos door structuur.
- **"I" (AI Signalering):** De letter 'I' signaleert dat het werk wordt aangedreven door Kunstmatige Intelligentie.
- **"C" (Cordes):** Mijn achternaam. De persoonlijke kwaliteitsgarantie.

> _"Het vervangen van het oude door het nieuwe, aangedreven door AI, met een persoonlijke signatuur."_

### De NOVAITEC Waarden

#### 1. Resultaat boven Uren (Zwart)
- Ik heb een hekel aan het klassieke uurtje-factuurtje model
- Ik werk op basis van **Waarde**
- Je betaalt voor de oplossing en de rust, niet voor de tijd
- Duidelijke afspraken vooraf zorgen voor vertrouwen

#### 2. Tech-Savvy, maar Overzichtelijk (Teal)
- Ik straal expertise uit
- Ik weet wat er speelt in AI en Tech
- Maar naar de klant toe: **Jip-en-Janneke taal**
- Geen black boxes, maar heldere dashboards
- De klant moet zich nooit dom voelen, maar juist 'empowered'

#### 3. Menselijke Connectie (Amber)
- Technologie is koud, maar mijn service is warm
- Als ZZP'er bied ik persoonlijkheid
- Door menselijk contact creëer ik een échte band
- Ik ben geen anonieme helpdesk, maar een betrokken partner

### Brand Archetypes
**De Ingenieur, De Gids & De Coach**

- Innovatief, maar met beide benen op de grond (Brabants nuchter)
- Digitaal & Efficiënt
- Persoonlijk & Betrokken
- Een kennisbron (Educatief)
- Analytisch
- Toegankelijk & Begrijpelijk

### Code of Conduct (Ethische Principes)

1. **Data Privacy First:** Nooit PII naar publieke AI-modellen zonder anonimisering
2. **Human-in-the-Loop:** Kritieke acties hebben altijd menselijke goedkeuring nodig
3. **Geen Vendor Lock-in:** Workflows in standaarden (JSON/n8n) die overdraagbaar zijn
4. **Security by Design:** Nooit hardcoded wachtwoorden, altijd Environment Variables

### Content Strategie (LinkedIn & Online)

**Pijler 1: Kennis Delen & Educatie**
- "Wist je dat je facturen automatisch kunt laten inlezen?"
- Uitleg over nieuwe tools (n8n, ChatGPT updates) in begrijpelijke taal
- Het demystificeren van AI: het is geen magie, het is techniek

**Pijler 2: Successen Vieren**
- Echte cases delen (geanonimiseerd indien nodig)
- "Vandaag een klant 4 uur per week bespaard met deze workflow"
- Screenshots van dashboards die op 'groen' staan
- De menselijke kant: een blije ondernemer die weer tijd heeft

**NO GO Areas:**
- ❌ Politieke meningen
- ❌ Negativiteit over concurrenten
- ❌ Te diepe technische code-dumps zonder context

### Logo Assets Beschikbaar

In de project folder:
- `novaitec_logo_transparant_kleur.png` (Primair logo - kleur)
- `novaitec_logo_transparant_kleur_tekst-wit.png` (Voor donkere achtergronden)
- `novaitec_logo_transparant_wit_tekst-wit.png` (Volledig wit - voor midnight backgrounds)
- `novaitec_beeldmerk_transparant_kleur.svg` (Beeldmerk alleen - voor kleine formaten)

**Logo Guidelines:**
- Minimale afmetingen: 40px digitaal, 15mm print
- Clear space = hoogte van de letter 'N'
- NOOIT vervormen, kleuren aanpassen, of schaduwen toevoegen

---

## 9. PROJECT REQUIREMENTS & SPECIFICATIES

### Homepage Structuur
✅ **Bevestigd door klant:**

1. **Hero** - Opening statement met impact
2. **Over Mij** - Persoonlijke introductie, de mens achter NOVAITEC
3. **Het Probleem** - Pain points van de doelgroep (MKB ondernemers)
4. **De Oplossing + Services** - Wat ik doe en hoe ik help
5. **Contact** - Formulier naar kyan@novaitec.nl
6. **Footer** - Links naar LinkedIn & email

### Functionaliteiten

#### Contactformulier
- ✅ Verplicht
- ✅ Verzenden naar: `kyan@novaitec.nl`
- Velden: Naam, Email, Bedrijf (optioneel), Bericht
- Validatie: Email format check
- Success state: Duidelijke bevestiging na verzenden

#### Blog Sectie
- ✅ Gewenst (MVP: basis structuur + 2-3 placeholder posts)
- Focus: Trending topics in AI & Automation
- Tone: Educatief, toegankelijk, geen jargon
- Layout: Card-based grid met featured image, excerpt, read time

#### Case Studies
- ✅ Gewenst (MVP: basis structuur + 1-2 placeholder cases)
- Focus: Projectverhalen en klantresultaten
- Elementen: Voor/Na, Tijdsbesparing, Tools gebruikt
- Geanonimiseerd indien nodig

#### Content Beheer
- ✅ **Hard-coded via Claude** (geen CMS)
- Content updates rechtstreeks in code
- Markdown-based voor blog posts (optioneel: MDX)

### Technische Setup

#### Hosting & Deployment
- ✅ **Vercel** (met GitHub integration)
- Automatische deploys bij push naar main branch
- Preview deploys voor pull requests

#### Domein
- ✅ `novaitec.nl`
- DNS configuratie via domein registrar
- Vercel custom domain setup

#### Analytics
- ✅ **Google Analytics 4** gewenst
- Privacy-friendly implementatie
- Event tracking voor contactformulier submissions
- Page view tracking

#### GDPR & Privacy
- ✅ **Cookie Consent verplicht**
- Implementatie: Clean, niet-storend design
- Functionele cookies: Altijd toegestaan
- Analytics cookies: Opt-in
- Cookie policy pagina nodig

### Timeline & MVP Scope

**Deadline:** Lancering voor **1 februari 2025** (volgende week!)

**MVP (Minimum Viable Product):**
- ✅ Volledige homepage (Hero → Footer)
- ✅ Contactformulier werkend
- ✅ Blog pagina met structuur + 2-3 placeholder posts
- ✅ Case Studies pagina met structuur + 1-2 placeholder cases
- ✅ Responsive design (mobile-first)
- ✅ Google Analytics geïmplementeerd
- ✅ Cookie consent banner
- ✅ SEO basics (meta tags, sitemap)

**Post-MVP (Na lancering):**
- Meer blog content schrijven
- Echte case studies toevoegen
- Extra pagina's (bijv. Over, Services detail)
- Newsletter integratie (optioneel)

### Beeldmateriaal Strategie

**Huidige Status:**
- Logo's: ✅ Beschikbaar (multiple versies)
- Foto's: ❌ Nog te verzamelen

**Benodigde Foto's (Prioriteit voor Hero/About):**
1. **Professionele portretfoto** van Kyan Cordes
   - Stijl: Professioneel maar toegankelijk
   - Setting: Clean achtergrond, goede belichting
   - Gebruik: Hero sectie, About sectie, Author bij blog posts

2. **Werkplek foto** (optioneel voor About)
   - Stijl: Tech setup, clean, modern
   - Gebruik: "De mens achter NOVAITEC" sectie

3. **Abstracte tech visuals** voor secties
   - Stijl: Circuits, data flows, abstracte tech patterns
   - Alternatief: Kan ik genereren met placeholders of SVG illustraties

**Fallback Strategie:**
- Gebruik placeholder images met NOVAITEC kleuren
- Abstracte gradiënten in Teal/Midnight Blue
- SVG illustraties (iconen en decoratieve elementen)
- Focus op typografie en witruimte totdat foto's beschikbaar zijn

---

## 10. VRAGEN VOOR DE KLANT (AFGEVINKT)

### Content & Copy
- [x] Welke secties moeten er op de homepage komen?
- [x] Heb je al copy/teksten klaar, of moet ik die schrijven?
- [x] Heb je beeldmateriaal (foto's, logo's, iconen)?

### Functionaliteiten
- [x] Moet er een contactformulier komen?
- [x] Heb je een CMS nodig of is alles hard-coded?
- [x] Moet er een blog/nieuwssectie komen?

### Technisch
- [x] Waar wordt de site gehost?
- [x] Heb je al een domein?
- [x] Analytics/tracking gewenst?
- [x] GDPR/Cookie consent nodig?

### Timeline & Prioriteit
- [x] Wat is de deadline voor de lancering?
- [x] Wat moet er minimaal af zijn voor de eerste release (MVP)?

---

## 11. QUICK REFERENCE: BRAND COLORS IN TAILWIND

Voeg dit toe aan `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        'midnight': '#0B1C2E',
        'teal': '#06B6D4',
        'amber': '#F59E0B',
        'paper': '#F8FAFC',
        'slate-text': '#334155',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

Gebruik in code:
```tsx
<div className="bg-midnight text-paper">
  <h1 className="font-montserrat font-bold text-teal">Title</h1>
  <p className="font-inter text-slate-text">Body text</p>
</div>
```

---

## 12. DEVELOPMENT ROADMAP (WEEK 1 - Launch)

### Fase 1: Foundation Setup (Dag 1)
- [ ] Next.js 14 project opzetten met App Router
- [ ] Tailwind CSS configureren met NOVAITEC kleuren
- [ ] Shadcn/UI installeren en basisconfiguratie
- [ ] Lenis Scroll global implementeren
- [ ] Framer Motion installeren
- [ ] Font setup (Montserrat, Inter, JetBrains Mono)
- [ ] Logo's toevoegen aan /public/images/

### Fase 2: Core Components (Dag 2-3)
- [ ] Layout component met header & navigation
- [ ] Hero sectie met impactvolle opening
- [ ] Over Mij sectie met persoonlijke touch
- [ ] Het Probleem sectie (pain points)
- [ ] De Oplossing + Services sectie (bento grid layout)
- [ ] Footer met social links

### Fase 3: Functionaliteiten (Dag 4-5)
- [ ] Contactformulier component
- [ ] Email verzending setup (kyan@novaitec.nl)
- [ ] Form validatie & error states
- [ ] Success feedback na verzenden
- [ ] Blog listing pagina
- [ ] Blog post template (2-3 placeholder posts)
- [ ] Case Studies listing pagina
- [ ] Case Study template (1-2 placeholder cases)

### Fase 4: Analytics & GDPR (Dag 6)
- [ ] Google Analytics 4 implementeren
- [ ] Cookie consent banner (clean design)
- [ ] Privacy policy pagina
- [ ] Cookie policy pagina
- [ ] GDPR compliant analytics opt-in

### Fase 5: Polish & Launch (Dag 7)
- [ ] SEO: Meta tags, Open Graph, sitemap.xml
- [ ] Performance optimalisatie
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Vercel deployment setup
- [ ] Custom domain configuratie (novaitec.nl)
- [ ] Final QA & launch! 🚀

### Development Priorities

**MUST HAVE (Week 1):**
- Homepage volledig functioneel
- Contactformulier werkend
- Blog + Case Studies structuur
- Google Analytics + Cookie consent
- Responsive design

**NICE TO HAVE (Post-launch):**
- Newsletter signup
- Advanced animations
- 3D elements
- Interactive demos
- Meer content

---

**Laatste update:** 2026-01-23
**Status:** Ready to Build 🚀
**Deadline:** 1 februari 2025
