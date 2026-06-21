# Sahil — AI Engineer Portfolio (2026)

## Original Problem Statement
Recruiter-grade AI/ML engineer portfolio. Indigo/violet premium aesthetic, no
hacker/cyber/neon, no green, no blue dominance, no cards in Achievements, no
contact form, interactive monumental name, Problem/Solution/Impact project
storytelling.

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion 11 + Canvas particles.
- **Backend**: FastAPI placeholder (untouched).
- **Routing**: Single-page portfolio.

### Section order
Hero → About → Skills → Projects → Achievements → Education → Contact

### Key files
- `frontend/src/App.js`
- `frontend/src/components/Loader.jsx`
- `frontend/src/components/Portfolio.jsx`
- `frontend/src/components/Background.jsx`
- `frontend/src/components/Nav.jsx`
- `frontend/src/components/Hero.jsx` — interactive `SAHIL` letters
- `frontend/src/components/About.jsx`
- `frontend/src/components/Skills.jsx` — chip rows
- `frontend/src/components/Projects.jsx` — Problem/Solution/Impact + expand
- `frontend/src/components/Achievements.jsx` — timeline list (no cards)
- `frontend/src/components/Education.jsx` — vertical timeline w/ 2 entries
- `frontend/src/components/Contact.jsx` — 4-row list (Email/GitHub/LinkedIn/Resume)
- `frontend/src/components/Footer.jsx`
- `frontend/src/index.css`
- `frontend/craco.config.js` — patched for webpack-dev-server v5 compatibility.

## Palette
- Primary: #4F46E5 (indigo)
- Secondary: #8B5CF6 (violet)
- Accent: #A78BFA (light violet)
- Background: #09090B (deep zinc)
- Surface: #111827
- Text: #F8FAFC
- Muted: #94A3B8

## Implemented (Jan 2026)
- Premium loader, glass nav with scroll-spy, smooth scroll.
- Hero (~60vh) with monumental interactive `SAHIL.` (cursor-distance letter
  glow + subtle translate + wave), eyebrow, subtitle, location, five buttons
  (Explore Projects, Get In Touch, Resume, GitHub, LinkedIn).
- About (4-line bio, "I am a 4th-year B.Tech...").
- Skills as four chip rows — Languages / AI · ML / Backend / Cloud.
- Projects — five P · 01–05 rows with Problem / Solution / Impact and a
  Project Details toggle that reveals Key Features + Tech chips. GitHub
  buttons link to the correct repo per project.
- Achievements rendered as a clean `<ul>` timeline with small icon + divider
  (no cards, no boxes).
- Education vertical timeline with violet dots and gradient line — 2 entries:
  B.Tech AISIET (2023 – 2027) and RHSS Vadavucode Higher Secondary
  (2020 – 2022).
- Contact as a 4-row list: Email (mailto), GitHub, LinkedIn, Resume
  (Download PDF). No form, no terminal block.
- Background — canvas particles (indigo/violet hues), grid, radial glows,
  mouse-follow spotlight.
- Typography — Space Grotesk display + Inter body + Instrument Serif italic
  accents + JetBrains Mono labels.
- Stats.jsx removed.

## Testing
- iteration_1.json — icarus blue layout — 100% pass.
- iteration_2.json — electric-blue polish with Stats — 120/121.
- iteration_3.json — indigo/violet polish, Problem/Solution/Impact, list-style
  Achievements — **100% pass**, no bugs.

## Prioritized Backlog
- P1 — Light/dark theme toggle.
- P1 — Host the resume PDF locally instead of Google Drive only.
- P2 — Per-project case-study pages with screenshots and metrics.
- P2 — Open-graph image, analytics, sitemap.
- P3 — Three.js immersive background behind a feature flag.

## Next Tasks
- Capture per-project demo media (GIFs / screenshots).
- Consider adding a "currently shipping" GitHub-activity strip.
- Add an Experience section once first internship begins.
