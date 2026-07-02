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
