# AGENTS.md — KeskustelujaMaailmanKaikkeuteniKanssa (Poem Book)

**Local path:** ~/Workspace/KeskustelujaMaailmanKaikkeuteniKanssa
**GitHub repo:** github.com/RabbitWhite/KeskustelujaMaailmanKaikkeuteniKanssa
**Deployed at:** https://rabbitwhite.github.io/KeskustelujaMaailmanKaikkeuteniKanssa

## Project Overview
React web app (Vite, JavaScript).
A poem book / literary web experience.
Hosted on GitHub Pages via gh-pages npm package.
Live URL: https://rabbitwhite.github.io/KeskustelujaMaailmanKaikkeuteniKanssa

## Stack
- React, built with Vite
- JavaScript (no TypeScript)
- React Context for poem state (src/context/PoemsContext.js)
- Poem data in JSON files (src/data/) — three large files, ~355 KB total
- Vitest for tests

## Commands
| Action     | Command                  |
|------------|--------------------------|
| Dev server | npm start                |
| Build      | npm run build            |
| Test       | npm test -- --run        |
| Deploy     | npm run deploy           |

Deploy runs predeploy (build) automatically before pushing to gh-pages branch.
Never push the build/ folder to main — gh-pages package handles deployment.

## Repository Structure
src/
  components/   — UI components
  context/      — PoemsContext.js (global poem state)
  data/         — JSON poem data files + Python utility scripts
  images/       — cursors, background images

## Data Pipeline
`src/data/Poems.json` is the editing source — typo and content fixes go
here first. It is not what the app bundles.
Two derived files, generated in order:
1. `PoemsKins.json` — adds embedding-based `kinpoems` from `Poems.json`
   via `assign_kin_poems.py`. Only re-run this when kin assignments
   should deliberately change — it is not part of routine content
   fixes and will reshuffle every poem's `kinpoems`.
2. `PoemsKinsStyled.json` — adds title-span HTML styling from
   `PoemsKins.json` via `restyle_poems_json.py`. This is what
   `PoemsContext`/the app actually renders.
When `Poems.json` content is fixed, run `npm run sync-poems`
(wraps `src/data/sync_poems.py`) to propagate `content`/`name` into
`PoemsKins.json` and regenerate `PoemsKinsStyled.json` in one step —
`kinpoems` and `id` are never touched. The script refuses to run
(nonzero exit, no writes) if the id sets of `Poems.json`,
`PoemsKins.json`, and `PoemsKinsStyled.json` ever disagree, since that
means a poem was added or removed, which it does not handle.

## Naming Conventions
New components use PascalCase (e.g. PoemCard.js, NavigationBar.js).
Existing components use the legacy kolmikarki_* prefix — do not rename
these until a dedicated cleanup mission is approved. Do not use
kolmikarki_* for any new files.

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
- Legacy kolmikarki_* component naming pending cleanup

## Coding Standards
- JavaScript only — do not introduce TypeScript
- PascalCase for all new components and files
- React Context is the state layer — do not introduce Redux or Zustand
  without explicit approval
- Data lives in src/data/ JSON files — no hardcoded content in components

## Discord MCP Missions
These rules apply to any task that uses the Discord MCP server tools.

### Capability Check — Run Before Any Other Steps
- Call discord_list_servers to confirm the bot is connected and retrieve the guild ID. The guild ID is also available in the DISCORD_GUILD_ID environment variable.
- Call discord_get_server_info to verify the bot has the permissions required for the planned operations. Check the following before proceeding:
  - Creating, editing, or deleting channels: requires Manage Channels
  - Managing roles: requires Manage Roles
  - Sending or managing messages: requires Send Messages and View Channel
  - Creating or managing webhooks: requires Manage Webhooks
- List the available MCP tools and confirm every tool the mission requires is present in the manifest. If any required tool is missing, stop and report — do not attempt workarounds such as delete-and-recreate in place of a rename.
- If any capability check fails, stop immediately and report what is missing. Do not proceed with partial execution.

### Safety Rules
- Never delete an existing channel, message, role, or webhook unless the brief explicitly instructs it and explicitly acknowledges that the action is irreversible and may result in permanent loss of message history or configuration.
- Never rename a channel via delete-and-recreate without explicit instruction acknowledging history loss. A true rename (preserving history) requires the edit_channel tool — if that tool is not available, stop and report rather than substituting delete-and-recreate.
- Do one operation at a time. Confirm success of each operation before proceeding to the next.
- Do not modify any channel, role, or permission that is not explicitly listed in the mission brief.

### Common Guild Information
- Bot name: DevHub Agent#0197
- Guild ID: available in DISCORD_GUILD_ID environment variable
- Server name: My Dev Hub

## MISSION TIERS

Every mission is classified before work starts. When in doubt, it is Tier 1.

Tier 1 — full architect loop. A brief is drafted and approved in the planning conversation before Claude Code begins. Applies to: anything touching build, deploy, or CI configuration including GitHub Actions and Pages; cross-file structural changes or refactors; renames of files, namespaces, or identifiers used across files; anything touching authentication or OAuth; Unity scene or prefab wiring; Unreal Engine physics or input; database or storage schema changes; anything the mission itself describes as an audit.

Tier 2 — direct with plan approval. No separate brief. Claude Code is invoked directly in plan mode, presents its plan in-session, and proceeds only after explicit approval. Applies to: single-file bug fixes; dependency version bumps; documentation, lore, and other content-only text changes; adding tests without changing implementation; changes to standalone tooling scripts.

Escalation rule: if a Tier 2 mission turns out to require touching build or deploy configuration, more than three files, or anything on the Tier 1 list, stop immediately, report, and reclassify as Tier 1.

Both tiers: work on an agent/claude branch from main, open a PR targeting main, never merge without human review.
