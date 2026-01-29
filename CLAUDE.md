# CLAUDE.md - Project Context for AI Assistants

## Project Overview
NovaITec.nl - Next.js website for IT consulting/automation services.

## Tech Stack
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Lucide React for icons

## Project Structure
- `app/` - Next.js app router pages
- `components/sections/` - Page sections (HeroSection, AboutSection, ProblemSection, etc.)
- `components/ui/` - Reusable UI components
- `lib/` - Utility functions
- `public/` - Static assets

## Key Components

### ProblemSection
Located at `components/sections/ProblemSection.tsx`
- Uses stacking cards animation on scroll (both mobile and desktop)
- Contains 5 slides: Intro, Admin, Staff, Research, Transition
- All slides have uniform height: `min-h-[600px] lg:min-h-[700px]` to ensure consistent card sizes

## Recent Changes
- Fixed ProblemSection card heights to be uniform (min-h-[600px] lg:min-h-[700px])
- Fixed AboutSection image handling with Next.js Image component

## Development Commands
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Notes
- Uses Dutch language for content
- Brand colors: amber (accent), teal (secondary), midnight (dark background)
