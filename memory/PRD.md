# Sahil — AI Engineer Portfolio (2026)

## Original Problem Statement
Completely redesign the existing portfolio into a premium AI Engineer site that
looks like a funded 2026 AI startup (Apple / Linear / Arc / Vercel / Stripe /
Perplexity aesthetic). Removed all neon-green / hacker / cyberpunk / matrix
effects, oversized cards, FAQ and timeline. Replaced with a deep dark theme
(#080B14) using electric blue (#4F8CFF), ice blue (#7DD3FC) and soft violet
(#A78BFA).

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion 11 + custom Canvas particles.
- **Backend**: FastAPI (untouched — placeholder Hello World, no UI dependency).
- **Routing**: Single-page portfolio (Hero / About / Projects / Contact).

### Key files
- `frontend/src/App.js` — loader → portfolio transition.
- `frontend/src/components/Loader.jsx` — premium loading screen (~1.6s).
- `frontend/src/components/Portfolio.jsx` — main page composition.
- `frontend/src/components/Background.jsx` — canvas particles, mouse spotlight, grid, noise.
- `frontend/src/components/Nav.jsx` — sticky glass navigation with scroll-spy.
- `frontend/src/components/Hero.jsx` — gradient headline + aurora layer.
- `frontend/src/components/About.jsx` — animated stat cards + narrative.
- `frontend/src/components/Projects.jsx` — 5 compact cards with tilt-on-hover, gradient border, expandable Key Features.
- `frontend/src/components/Contact.jsx` — 3 premium cards (Email / GitHub / LinkedIn). No form.
- `frontend/src/components/Footer.jsx`
- `frontend/src/index.css` — design tokens, fonts, aurora animation, glass utilities.

## User Persona
- **Recruiter / AI hiring manager** scanning for impact in <30s.
- **Engineering peer** verifying tech depth via expandable project details.

## Core Requirements (static)
- Dark palette only (no neon green).
- Compact, premium project cards with expand-to-detail.
- 3 contact cards (no form).
- Premium loader + glass nav + particle bg + mouse spotlight + scroll reveals.
- Recruiter-focused: Resume CTA always visible.

## Implemented (Jun 2026)
- Premium loader with animated logo + progress bar.
- Glass sticky navigation with smooth-scroll + scroll-spy active state.
- Hero with section tag, gradient + serif-italic headline, three CTAs, aurora glow, tech rail.
- About: 4 count-up stat cards (5+ projects, 1 Hackathon win, 1 NPTEL, 4th year B.Tech AI) + HackQuest 2025 trophy callout + narrative + quick-facts list.
- Projects: 5 detailed cards
  - 01 HackQuest25 — Intelligent Public Alert System (Winner)
  - 02 OrchestrateX — Multi-Model AI Orchestration Platform
  - 03 RAG AI Agent — Educational Video Intelligence System
  - 04 Lightweight Code Debugging SLM
  - 05 Network Security ML Pipeline (Phishing Detection)
  - Tilt-on-hover, gradient conic border, GitHub icon button, expandable Key Features in 2-column list.
- Contact: 3 cards — Email (mailto), GitHub, LinkedIn.
- Footer with credits + copyright.
- Canvas particle system with mouse-reactive brightening + spotlight glow.
- Animated subtle grid background + radial blue/violet glows + noise overlay.
- Manrope + Instrument Serif + JetBrains Mono typography.
- Resolved react-scripts 5 vs webpack-dev-server 5 incompatibility in `craco.config.js`.

## Prioritized Backlog
- P1 — Add light/dark theme toggle (designed for dark first).
- P1 — Wire the LinkedIn URL through proper UTF-8 encoded slug check.
- P2 — Replace placeholder GitHub repos for projects 02-05 once user shares actual URLs.
- P2 — Add per-project case-study pages.
- P3 — Three.js immersive background option behind a feature flag.

## Next Tasks
- User can rate or share specific tweaks (colors, spacing, copy).
- Add real GitHub URLs for OrchestrateX / RAG / SLM / Network Security when available.
- Optional analytics + open-graph image.
