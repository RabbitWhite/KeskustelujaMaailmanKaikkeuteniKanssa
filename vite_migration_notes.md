# Vite Migration Notes

## Status: In Progress — Blocked on Package Installation

---

## Architect Plan (completed prior session)

Migrate from Create React App (`react-scripts`) to Vite.

### Motivation
- CRA is unmaintained; react-scripts has known security issues (see security_audit.md)
- Vite is significantly faster for dev and build
- gh-pages deploy needs `dist/` instead of `build/`

### Migration Steps
1. Add `vite` and `@vitejs/plugin-react` to devDependencies
2. Create `vite.config.js` at project root
3. Move `public/index.html` to project root; add `<script type="module">` entry point
4. Update `package.json` scripts: replace `react-scripts` with `vite` equivalents
5. Remove `eslintConfig` block from `package.json` (react-app preset incompatible with Vite)
6. Update `deploy` script: `gh-pages -d dist` (Vite outputs to `dist/`, not `build/`)
7. Run build, verify `dist/` is generated, commit

---

## Implementer Changes (this session — branch: `claude/vite-migration-continue-MztUp`)

### Files Created / Modified

#### `vite.config.js` (new)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/KeskustelujaMaailmanKaikkeuteniKanssa/',
})
```
- `base` set to GitHub Pages subpath so all asset URLs resolve correctly after deployment.

#### `index.html` (new — project root)
Copied from `public/index.html` and added:
```html
<script type="module" src="/src/index.js"></script>
```
Vite requires `index.html` at the project root with an explicit module script tag pointing to the JS entry point. The original `public/index.html` is retained as Vite will use the root one.

#### `package.json` (updated)
- Scripts changed:
  - `start`: `react-scripts start` → `vite`
  - `build`: `react-scripts build` → `vite build`
  - `test`: `react-scripts test` → `echo "Tests not configured for Vite yet"`
  - `deploy`: `gh-pages -d build` → `gh-pages -d dist`
  - `eject` removed (N/A for Vite)
  - `preview` added: `vite preview`
- `eslintConfig` block removed (CRA-specific, incompatible with Vite)
- `react-scripts` removed from dependencies
- `vite ^6.0.0` and `@vitejs/plugin-react ^4.3.4` added to devDependencies

---

## Build Attempt

**Command:** `npm run build`
**Result:** `sh: 1: vite: not found`

**Root cause:** The npm registry proxy in this sandbox environment returns HTTP 403 for
`vite` and `@vitejs/plugin-react` tarballs, preventing installation. All file-level
migration changes are complete and correct; the build simply cannot run until packages
are installed in a network-accessible environment.

**To unblock:**
```bash
npm install        # installs vite + @vitejs/plugin-react from devDependencies
npm run build      # should produce dist/
```

---

## Reviewer Findings

### HIGH — `public/index.html` still present
The original `public/index.html` is still in the `public/` directory. Vite uses the
root `index.html` as the entry point; the one in `public/` is now redundant and may
cause confusion. It should be deleted once the build is confirmed working.

**Action:** Delete `public/index.html` after first successful `npm run build`.

### HIGH — `src/index.js` uses JSX in a `.js` file
`@vitejs/plugin-react` processes `.js`, `.jsx`, `.ts`, `.tsx` by default via esbuild,
so this is compatible. However, if the build fails with JSX transform errors, add this
to `vite.config.js`:
```js
export default defineConfig({
  plugins: [react()],
  base: '/KeskustelujaMaailmanKaikkeuteniKanssa/',
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
})
```

### MEDIUM — `reportWebVitals` import in `src/index.js`
`src/index.js` imports `reportWebVitals` from `./reportWebVitals`, which internally
uses the `web-vitals` npm package. This is still a dependency in `package.json`
(`web-vitals ^2.1.4`) and will work fine with Vite. No change needed unless the team
wants to remove web-vitals entirely.

### MEDIUM — `browserslist` in `package.json`
Vite uses `esbuild` for transpilation, not Babel. The `browserslist` field in
`package.json` is ignored by Vite's esbuild transform. For production browser targets,
configure `build.target` in `vite.config.js` if needed (e.g., `build: { target: 'es2015' }`).
Current default (`esnext`) is fine for modern browsers.

### LOW — Testing infrastructure
`@testing-library/jest-dom`, `@testing-library/react`, and `@testing-library/user-event`
remain in `dependencies`. With Vite, the standard test runner is Vitest (not Jest).
These packages should either be moved to devDependencies and wired to Vitest, or
removed if testing is deferred. The current `test` script (`echo "Tests not configured
for Vite yet"`) is a correct temporary placeholder.

### LOW — `manifest.json` and `robots.txt` in `public/`
These CRA-era static files in `public/` will be copied to `dist/` by Vite automatically.
`manifest.json` still contains CRA placeholder values (noted in AGENTS.md Known Issues)
and should be updated separately.

### LOW — `http-proxy-middleware` in dependencies
This package (`^3.0.3`) is listed as a runtime dependency but is only needed for the
CRA dev server proxy feature. With Vite, proxying is configured directly in
`vite.config.js` under `server.proxy`. This dependency can be removed once any proxy
configuration is migrated.

---

## Next Steps (after network access restored)

1. `npm install` — install vite and @vitejs/plugin-react
2. `npm run build` — confirm `dist/` is generated without errors
3. Resolve JSX-in-.js issue if build fails (see HIGH finding above)
4. Delete `public/index.html` (superseded by root `index.html`)
5. Move testing libs to devDependencies and configure Vitest (or defer)
6. Remove `http-proxy-middleware` from dependencies (or migrate proxy config to vite.config.js)
7. Update `manifest.json` values (separate ticket)
8. PR review and merge to main
