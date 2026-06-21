# Sahil — AI Engineer Portfolio (2026)

## Original Problem Statement
Three-phase brief:
1. Premium AI-startup-grade dark portfolio (replace any hacker/neon/matrix
   look). Sections: Hero / About / Projects / Contact.
2. Match the layout pattern of https://www.icarus13.in/ (monumental stacked
   name, two-column section layout, "The stack." skills columns, numbered
   project list with + expand, terminal block in contact) but use a BLUE
   accent instead of green.
3. Polish pass — switch palette to #3B82F6 / #60A5FA / #0B1120 / #F8FAFC,
   reduce hero by 30%, increase information density, add a horizontal Stats
   row, an Achievements section, an Education card for Adi Shankara Institute
   of Engineering and Technology (2023–2027), refined Projects with new
   GitHub repos, and chip-style Skills.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion 11 + Canvas particles.
- **Backend**: FastAPI placeholder (untouched, no UI dependency).
- **Routing**: Single-page portfolio.

### Section order
Hero → Stats → About → Skills → Projects → Achievements → Education → Contact

### Key files
- `frontend/src/App.js`
- `frontend/src/components/Loader.jsx`
- `frontend/src/components/Portfolio.jsx`
- `frontend/src/components/Background.jsx`
- `frontend/src/components/Nav.jsx`
- `frontend/src/components/Hero.jsx`
- `frontend/src/components/Stats.jsx`
- `frontend/src/components/About.jsx`
- `frontend/src/components/Skills.jsx`
- `frontend/src/components/Projects.jsx`
- `frontend/src/components/Achievements.jsx`
- `frontend/src/components/Education.jsx`
- `frontend/src/components/Contact.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/index.css`
- `frontend/craco.config.js` — patched to strip deprecated webpack-dev-server v4 options injected by react-scripts 5.

## User Persona
- Recruiter / AI hiring manager scanning for impact in <30s.
- Engineering peer verifying tech depth via expandable project details.

## Core Requirements (static)
- Strict blue palette only — #3B82F6 (electric blue), #60A5FA (azure glow), #0B1120 (deep navy), #F8FAFC (soft white).
- Compact, dense layout (no oversized cards, no FAQ, no timeline).
- 5 numbered projects with `+` expand → tech chips + Key Features.
- 3 contact channels — email, GitHub, LinkedIn. No contact form.
- Premium loader, glass nav, particle background, mouse spotlight, scroll reveals.
- Resume CTA always visible.

## Implemented (Jan 2026)
- Premium loader with animated logo + progress bar in blue palette.
- Glass sticky navigation with smooth-scroll + scroll-spy active state.
- Hero (~78vh) with monumental `SAHIL.` (electric-blue period), subtitle "AI Engineer • Machine Learning Developer", "India • Remote Friendly", CTAs, inline social/resume links.
- Stats horizontal glass card with 4 cells (5+ AI / ML Projects, 🏆 HackQuest 2025 Winner, 1 NPTEL Certified, 3+ Years Building Projects).
- About with section tag + heading + 2-paragraph bio mentioning RAG, orchestration, lightweight LMs.
- Skills (`The stack.`) — 4 chip-style rows: Languages / Machine Learning / Backend / Cloud.
- Projects — 5 numbered rows (P · 01–05) with title + badge + summary + GitHub icon + `+` toggle → tech chips and 2-column Key Features list:
  - 01 HackQuest25 — Public Alert System → https://github.com/sahilkhn-03/HackQuest25
  - 02 OrchestrateX → https://github.com/sahilkhn-03/OrchestrateX
  - 03 RAG AI Agent → https://github.com/sahilkhn-03/Rag-Ai-Agent
  - 04 Efficient Code Debugging & Simplification → https://github.com/sahilkhn-03/Mini-Project
  - 05 Phishing Website Detection → https://github.com/sahilkhn-03/networksecurity
- Achievements — 3 cards (HackQuest Winner, NPTEL Certified, Multiple AI / ML projects shipped).
- Education — single card: B.Tech Computer Science (AI), Adi Shankara Institute of Engineering and Technology, 2023 – 2027.
- Contact — heading, paragraph, location, terminal-style block with mac dots + zsh prompt + blinking blue cursor, mailto, two cards (Code on GitHub / Connect on LinkedIn).
- Background — canvas particles tinted in blue family + subtle grid + radial blue glows + noise + mouse-follow spotlight.
- Typography — Manrope display, Instrument Serif italic accents, JetBrains Mono tags.
- Frontend dev-server compatibility fix in `craco.config.js`.

## Testing
- `testing_agent_v3` iteration 1 — 100% pass.
- `testing_agent_v3` iteration 2 (post-polish) — 120/121 raw assertions pass (the single fail is a macOS traffic-light dot color check, intentional).

## Prioritized Backlog
- P1 — Light/dark theme toggle (currently dark-first).
- P1 — Local PDF hosting of the resume in addition to the Google Drive link.
- P2 — Per-project case-study pages with metrics + media.
- P2 — Open-graph image, analytics, sitemap.
- P3 — Optional Three.js immersive background behind a feature flag.

## Next Tasks
- Capture per-project hero screenshots/GIFs.
- Add a small "GitHub recent activity" widget under the hero.
- Once first internship begins, add an Experience section.
