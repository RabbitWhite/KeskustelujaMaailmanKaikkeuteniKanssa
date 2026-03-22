
# AGENTS.md — KeskustelujaMaailmanKaikkeuteniKanssa (Poem Book)
## Project Overview
React web app (Create React App, JavaScript).
A poem book / literary web experience.
Hosted on GitHub Pages via gh-pages npm package.
Live URL: https://rabbitwhite.github.io/KeskustelujaMaailmanKaikkeuteniKanssa
## Stack
- React (CRA, react-scripts v5.0.1) — do NOT eject
- JavaScript (no TypeScript)
- React Context for poem state (src/context/PoemsContext.js)
- Poem data in JSON files (src/data/) — three large files, ~355 KB total
- Components use kolmikarki_* naming convention (snake_case)
## Commands
| Action      | Command                  |
|-------------|--------------------------|
| Dev server  | npm start                |
| Build       | npm run build            |
| Deploy      | npm run deploy           |
Deploy runs predeploy (build) automatically before pushing to gh-pages branch.
Never push the build/ folder to main — gh-pages package handles deployment.
## Repository Structure
src/
  components/   — UI components, kolmikarki_* naming
  context/      — PoemsContext.js (global poem state)
  data/         — JSON poem data files + Python utility scripts
  images/       — cursors, background images
## Agentic Workflow
Always follow Architect → Implementer → Reviewer cycle.
Never skip the Architect phase for structural changes.
Always show diff and wait for approval before applying changes.
### Role Switching
- Architect mode: planning only, no file modifications
- Implementer mode: one file or subsystem at a time
- Reviewer mode: flag issues as HIGH/MEDIUM/LOW
- Refactorer mode: improve structure, never change behavior
### Key Rules
- Plan before implementing: "Create plan, list risks, wait."
- Small diffs — one subsystem at a time
- Never run npm run deploy without explicit instruction
- Never modify src/data/ JSON files without understanding
  the full data shape first — read PoemsContext.js first
## Known Issues (from initial audit)
- manifest.json contains CRA placeholder values — needs update
- Stray log file: src/images/gude-2023-08-12.log — safe to delete
- Large JSON files (~355 KB) loaded without code-splitting
  — flag before any performance work
## Coding Standards
- JavaScript only — do not introduce TypeScript
- Follow existing kolmikarki_* component naming
- React Context is the state layer — do not introduce Redux or Zustand
  without explicit approval
- Data lives in src/data/ JSON files — no hardcoded content in components
