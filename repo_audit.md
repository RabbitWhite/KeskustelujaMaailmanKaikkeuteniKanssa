# Repository Audit — KeskustelujaMaailmanKaikkeuteniKanssa

## 1. Build System

**Create React App (CRA)** via `react-scripts` v5.0.1.

- No custom build config files exist (`vite.config.js`, `webpack.config.js`, `babel.config.js`, `tsconfig.json` — none present).
- CRA manages webpack/babel internally; the project has **not been ejected**.
- JavaScript (not TypeScript).

## 2. package.json Scripts

Exact scripts as written:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

| Command | Purpose |
|---|---|
| `npm start` | Dev server |
| `npm run build` | Production build → `build/` folder |
| `npm run deploy` | Runs `predeploy` (build) then `gh-pages -d build` |

## 3. Deploy Setup

- **Method:** `gh-pages` npm package (v6.3.0, devDependency).
- **Target branch:** `gh-pages` (default for the gh-pages package — pushes `build/` contents to a `gh-pages` branch on origin).
- **Build output folder:** `build/` (CRA default, confirmed by `gh-pages -d build` and `.gitignore` entry `/build`).
- **Live URL:** `https://rabbitwhite.github.io/KeskustelujaMaailmanKaikkeuteniKanssa` (set via `"homepage"` field in `package.json`).
- **GitHub Actions:** None. No `.github/` directory exists.

## 4. Folder Structure

```
/
├── package.json
├── package-lock.json
├── README.md               # CRA boilerplate README
├── .gitignore
├── design_docs/            # Non-code design assets
│   ├── App_Structure.vsdx
│   ├── Flowchart.vsdx
│   └── UI_Design_Kolmikarki.xd
├── public/
│   ├── index.html          # HTML entry point (title: "Keskusteluja Maailman Kaikkeuteni Kanssa")
│   ├── manifest.json       # PWA manifest (still has CRA placeholder values)
│   └── robots.txt
└── src/
    ├── index.js            # React entry point
    ├── App.js              # Root component
    ├── App.css
    ├── App.test.js
    ├── reportWebVitals.js
    ├── setupTests.js
    ├── components/
    │   ├── kolmikarki_front_page.js
    │   ├── kolmikarki_contents_page.js
    │   ├── kolmikarki_poem_page.js
    │   └── poems.js
    ├── context/
    │   └── PoemsContext.js   # React Context for poem state
    ├── data/
    │   ├── Poems.json            (~112 KB)
    │   ├── PoemsKins.json        (~117 KB)
    │   ├── PoemsKinsStyled.json  (~126 KB)
    │   ├── assign_kin_poems.py
    │   └── restyle_poems_json.py
    └── images/
        ├── Eye_cursor.png / Eye_cursor_2.png
        ├── Eye_cursor_hover.png / Eye_cursor_hover_2.png
        ├── FishCursor.png / FishCursor_Hover.png
        ├── Kolmikarki_Background.png   (~1.4 MB)
        ├── Kolmikarki_Background.webp  (~129 KB)
        └── gude-2023-08-12.log         # stray log file
```

Notable observations:
- `src/components/` — 4 components, named with `kolmikarki_` prefix (snake_case).
- `src/context/` — single context file for poems state.
- `src/data/` — three large JSON files (~355 KB combined) bundled directly into the app; two Python helper scripts committed alongside them (not part of the build).
- `src/images/` — contains a stray `.log` file (`gude-2023-08-12.log`) that should probably be removed.
- `public/manifest.json` still has CRA placeholder values (`"name": "Create React App Sample"`).

## 5. Existing Config Files

| File | Location | Notes |
|---|---|---|
| `package.json` | root | Main config; `homepage` field drives gh-pages base path |
| `package-lock.json` | root | Lock file |
| `.gitignore` | root | Standard CRA `.gitignore`; `/build` and `.env.*` excluded |
| `public/manifest.json` | `public/` | PWA manifest with placeholder values |
| `public/robots.txt` | `public/` | Default allow-all |

**Not present:**
- `.env` / `.env.local` / `.env.example` — no environment variables in use
- `vite.config.*` — not a Vite project
- `craco.config.js` / `react-app-rewired` — CRA not customised
- `.github/workflows/` — no CI/CD
- `CNAME` — using default GitHub Pages subdomain

## Summary

A straightforward CRA + gh-pages setup. Deploy is fully manual (`npm run deploy`). No CI, no env vars, no custom build config. The main areas worth noting before any migration or upgrade work:

- Large JSON data files bundled via webpack (no code-splitting/lazy loading evident from structure).
- `manifest.json` has stale placeholder values.
- Stray `.log` file in `src/images/`.
- Python data scripts committed inside `src/data/` (not part of JS build, but present in source).
