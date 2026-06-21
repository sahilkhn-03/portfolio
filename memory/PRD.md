# Sahil — AI Engineer Portfolio (2026)

## Original Problem Statement
Two-phase brief from the user:
1. Completely redesign the existing portfolio into a premium AI Engineer site
   that looks like a funded 2026 AI startup. Remove all neon-green / hacker /
   cyberpunk / matrix effects, oversized cards, FAQ and timeline.
2. Match the layout pattern of https://www.icarus13.in/ (monumental stacked
   name, two-column section layout, "The stack." skills columns, numbered
   project list with + expand, terminal block in contact) but use a BLUE
   accent (#4F8CFF) instead of the inspiration site's green.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion 11 + Canvas particles.
- **Backend**: FastAPI placeholder (no UI dependency, untouched).
- **Routing**: Single-page portfolio (Hero / About / Skills / Education / Projects / Contact).

### Key files
- `frontend/src/App.js` — Loader → Portfolio crossfade.
- `frontend/src/components/Loader.jsx` — premium loading screen (~1.6s).
- `frontend/src/components/Portfolio.jsx` — page composition.
- `frontend/src/components/Background.jsx` — canvas particles + grid + mouse spotlight + noise.
- `frontend/src/components/Nav.jsx` — sticky glass navigation with scroll-spy.
- `frontend/src/components/Hero.jsx` — monumental stacked "SAHIL / KHAN." with aurora.
- `frontend/src/components/About.jsx` — section-tag left / narrative right.
- `frontend/src/components/Skills.jsx` — "The stack." with 4 categories.
- `frontend/src/components/Education.jsx` — B.Tech + NPTEL entries.
- `frontend/src/components/Projects.jsx` — numbered list with + expand, tech chips, Key Features.
- `frontend/src/components/Contact.jsx` — heading + paragraph + terminal block + email + 2 cards.
- `frontend/src/components/Footer.jsx` — credits row.
- `frontend/src/index.css` — design tokens, fonts (Manrope / Instrument Serif / JetBrains Mono), aurora animation, glass utilities.
- `frontend/craco.config.js` — patched to strip deprecated webpack-dev-server v4 options so dev server boots.

## User Persona
- Recruiter / AI hiring manager scanning for impact in <30s.
- Engineering peer verifying tech depth via expandable project details.

## Core Requirements (static)
- Dark palette only — #080B14 base with electric blue / ice blue / violet accents.
- No green / hacker / cyberpunk / matrix aesthetic.
- Two-column section layout (section tag left, content right).
- Compact, numbered project rows with expand-to-detail.
- Three premium contact channels — NO contact form.
- Premium loader, glass nav, particle background, mouse spotlight, scroll reveals.
- Recruiter-focused: Resume CTA always visible.

## Implemented (Jan 2026)
- Premium loader with animated logo + progress bar.
- Glass sticky navigation with smooth-scroll + scroll-spy active state.
- Hero with monumental stacked "SAHIL" / "KHAN." typography, blue period accent, eyebrow tag, role + location, bio, two CTAs, inline social links, Resume link, three-stat row.
- About — section tag + heading + two-paragraph bio + inline social links.
- Skills — "The stack." with 4 columns (Languages / AI · Agents / Infra · Data / ML · Research).
- Education — B.Tech (2022–2026 · 4th year) + NPTEL Machine Learning with Python (2024).
- Projects — 5 numbered rows:
  - P · 01 HackQuest25 — Intelligent Public Alert System (1st place · 24-hr hackathon)
  - P · 02 OrchestrateX — Multi-Model AI Orchestration Platform
  - P · 03 RAG AI Agent — Educational Video Intelligence System
  - P · 04 Lightweight Code Debugging SLM
  - P · 05 Network Security ML Pipeline (Phishing Detection)
  - Each row: GitHub icon button + `+` toggle that rotates to `×` on expand, tech chips, 2-column Key Features list, aria-expanded for a11y.
- Contact — heading, paragraph, location, terminal-style block with mac dots + zsh prompt + blinking cursor, mailto email, and two cards (Code on GitHub / Connect on LinkedIn).
- Footer — credits + copyright.
- Background — canvas particle system with mouse-reactive brightening, subtle grid, radial blue/violet glows, noise overlay, mouse-follow spotlight.
- Typography — Manrope display + Instrument Serif italic accents + JetBrains Mono tags.
- Frontend dev-server fix — patched `craco.config.js` to strip deprecated webpack-dev-server v4 options (`onBeforeSetupMiddleware`, `onAfterSetupMiddleware`, `https`, etc.) that react-scripts 5 injects, restoring boot under webpack-dev-server v5.

## Testing
- `testing_agent_v3` iteration 1 — frontend only — 100% pass (44/46 assertions; 2 false-negatives from CSS uppercase styling, verified manually). No bugs, no retest required.

## Prioritized Backlog
- P1 — Light/dark theme toggle (currently dark-first).
- P1 — Replace placeholder GitHub repos for projects 02–05 once real URLs are shared.
- P2 — Per-project case-study pages with metrics + media.
- P2 — Open-graph image + analytics + sitemap.
- P3 — Optional Three.js immersive background behind a feature flag.

## Next Tasks
- Capture real GitHub repository URLs for OrchestrateX / RAG / SLM / Network Security.
- Consider a downloadable resume PDF hosted locally rather than only on Google Drive.
- Decide if Experience section should be added once first internship begins.
