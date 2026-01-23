# NOVAITEC Website

Website voor NOVAITEC - AI-gedreven Automatisering voor MKB

## Setup Instructies

### 1. Installeer Node.js

Download en installeer Node.js vanaf [nodejs.org](https://nodejs.org/).
Kies de LTS versie (Long Term Support).

Controleer na installatie of Node.js correct is geïnstalleerd:

```bash
node --version
npm --version
```

### 2. Installeer Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Project Structuur

```
/app                    # Next.js App Router
  /layout.tsx          # Root layout met Lenis smooth scroll
  /page.tsx            # Homepage
  /globals.css         # Global styles

/components
  /layout              # Layout componenten (Header, Footer)
  /sections            # Grote sectie componenten (Hero, Services, etc.)
  /ui                  # Shadcn/UI componenten

/lib                   # Utility functions
/public/images         # Statische afbeeldingen
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animaties:** Framer Motion
- **Smooth Scroll:** Lenis
- **Icons:** Lucide React
- **Language:** TypeScript

## NOVAITEC Brand Kleuren

- **Deep Midnight Blue:** `#0B1C2E` (60% - achtergronden)
- **Vibrant Teal:** `#06B6D4` (30% - primaire acties)
- **Amber Gold:** `#F59E0B` (10% - accenten)
- **Paper White:** `#F8FAFC` (achtergronden)
- **Slate Grey:** `#334155` (tekst)

## Typografie

- **Koppen:** Montserrat (Bold/ExtraBold)
- **Body:** Inter (Regular)
- **Tech Details:** JetBrains Mono

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build voor productie
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

De website wordt gehost op Vercel met automatische deploys vanuit GitHub.

## Contact

Kyan Cordes - kyan@novaitec.nl
