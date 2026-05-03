# Rename Audit — kolmikarki_* Components

**Status:** Pre-approval audit — no files modified.

---

## 1. Files Matching `kolmikarki_*` in `src/components/`

| Current filename | Proposed filename | Notes |
|---|---|---|
| `kolmikarki_front_page.js` | `FrontPage.js` | strip prefix, PascalCase remainder |
| `kolmikarki_poem_page.js` | `PoemPage.js` | strip prefix, PascalCase remainder |
| `kolmikarki_contents_page.js` | `ContentsPage.js` | strip prefix, PascalCase remainder |

Three files total. No other `kolmikarki_*` files exist anywhere under `src/`.

---

## 2. All `kolmikarki_` String Occurrences in `src/`

### `src/App.js` — the only file that references these components

| Line | Type | Current text |
|---|---|---|
| 2 | import path | `import Kolmikarki_front_page from './components/kolmikarki_front_page.js';` |
| 3 | import path | `import Kolmikarki_poem_page from './components/kolmikarki_poem_page';` |
| 4 | import path | `import Kolmikarki_contents_page from './components/kolmikarki_contents_page';` |
| 19 | JSX usage | `element={<Kolmikarki_front_page />}` |
| 20 | JSX usage | `element={<Kolmikarki_poem_page />}` |
| 21 | JSX usage | `element={<Kolmikarki_poem_page isRerun />}` |
| 22 | JSX usage | `element={<Kolmikarki_contents_page />}` |

### `src/components/` — internal function/component names

These are the **exported names** inside the component files, not the filenames:

| File | Line | Exported name |
|---|---|---|
| `kolmikarki_front_page.js` | 8 | `export default function KolmikarkiFrontPage(props)` |
| `kolmikarki_poem_page.js` | 26 | `const KolmikarkiPoemPage = ({ isRerun = false }) =>` |
| `kolmikarki_poem_page.js` | 122 | `export default KolmikarkiPoemPage;` |
| `kolmikarki_contents_page.js` | 6 | `export default function KolmikarkiContentsPage()` |

> **Note:** The exported function names already follow PascalCase and include "Kolmikarki" as a namespace prefix (`KolmikarkiFrontPage`, etc.). They are **separate from** the filenames and import aliases. Whether to rename these function names too is a follow-on decision (see §6 below).

### All other `src/` files — zero occurrences

Searched: `App.css`, `App.test.jsx`, `index.js`, `reportWebVitals.js`, `setupTests.js`,
`context/PoemsContext.js`, `data/*.json`, `components/poems.js`.

- **CSS classes:** None contain `kolmikarki_`. All class names are generic (`.frontpage-background`, `.poemlink`, `.contents-list`, etc.).
- **`document.title`:** Not set anywhere in `src/`.
- **`data-testid` / `aria-*`:** None present.
- **Dynamic `import()` / `require()`:** None. All three components are imported statically in `App.js`.
- **String literals / comments in component files:** None reference `kolmikarki_` filenames.

---

## 3. Import Tree Confirmation

```
index.js
  └── App.js  (static imports only)
        ├── ./components/kolmikarki_front_page.js  ← filename ref, line 2
        ├── ./components/kolmikarki_poem_page       ← filename ref, line 3
        └── ./components/kolmikarki_contents_page   ← filename ref, line 4
```

All three imports are **static** (no `import()`, no `require()`, no `React.lazy()`).
`index.js` imports only `App` — zero direct `kolmikarki_` references there.

**Minor pre-existing inconsistency (not blocking):** line 2 uses the `.js` extension in the path; lines 3–4 omit it. This can be harmonised at rename time.

---

## 4. Collision Check

Proposed names checked against the full `src/` file tree:

| Proposed name | Collision? |
|---|---|
| `FrontPage.js` | ✅ None |
| `PoemPage.js` | ✅ None |
| `ContentsPage.js` | ✅ None |

No existing file in `src/` or `src/components/` would conflict with any proposed name.

---

## 5. Smoke Test Safety — `src/App.test.jsx`

```jsx
test('renders without crashing', () => {
  const src = readFileSync(resolve('./src/App.js'), 'utf-8')
  expect(src).toContain('function App()')
  expect(src).toContain('export default App')
})
```

The test reads `src/App.js` and checks for two strings:

| Assertion | After rename? |
|---|---|
| `'function App()'` | ✅ Unchanged — `App.js` keeps its `App` function |
| `'export default App'` | ✅ Unchanged — `App.js` keeps its export |

The test contains **no hardcoded `kolmikarki_` strings** and no references to component filenames. It will pass without modification after the rename.

---

## 6. Proposed Rename Mapping Table

### A. File renames (3 files)

| Old path | New path |
|---|---|
| `src/components/kolmikarki_front_page.js` | `src/components/FrontPage.js` |
| `src/components/kolmikarki_poem_page.js` | `src/components/PoemPage.js` |
| `src/components/kolmikarki_contents_page.js` | `src/components/ContentsPage.js` |

### B. `src/App.js` — import paths (3 lines)

| Line | Old | New |
|---|---|---|
| 2 | `'./components/kolmikarki_front_page.js'` | `'./components/FrontPage.js'` |
| 3 | `'./components/kolmikarki_poem_page'` | `'./components/PoemPage'` |
| 4 | `'./components/kolmikarki_contents_page'` | `'./components/ContentsPage'` |

### C. `src/App.js` — import aliases + JSX tags (7 occurrences)

The current aliases (`Kolmikarki_front_page`, etc.) are non-standard (underscore in identifier).
Two clean options for the new aliases:

**Option 1 — Match new filename (shorter, idiomatic):**

| Old alias | New alias |
|---|---|
| `Kolmikarki_front_page` | `FrontPage` |
| `Kolmikarki_poem_page` | `PoemPage` |
| `Kolmikarki_contents_page` | `ContentsPage` |

**Option 2 — Match exported function name inside the file (more explicit):**

| Old alias | New alias |
|---|---|
| `Kolmikarki_front_page` | `KolmikarkiFrontPage` |
| `Kolmikarki_poem_page` | `KolmikarkiPoemPage` |
| `Kolmikarki_contents_page` | `KolmikarkiContentsPage` |

Both options are valid React. Option 1 reduces redundancy. Option 2 preserves the
namespace visible in the component definition.

### D. (Optional) Internal exported names — 3 lines across 3 files

The exported function names inside the component files currently include "Kolmikarki"
as a namespace prefix. These do **not** need to change for the rename to succeed —
default exports are re-bound by the import alias in App.js. However, aligning them
with the new filenames improves consistency:

| File | Old export name | Proposed (if desired) |
|---|---|---|
| `FrontPage.js` | `KolmikarkiFrontPage` | `FrontPage` |
| `PoemPage.js` | `KolmikarkiPoemPage` | `PoemPage` |
| `ContentsPage.js` | `KolmikarkiContentsPage` | `ContentsPage` |

**This is a separate decision** — it has no effect on the build or tests and can be
deferred or skipped.

---

## 7. Ambiguities and Flags

| # | Flag | Severity |
|---|---|---|
| 1 | `FrontPage`, `PoemPage`, `ContentsPage` are generic names — if more pages are added later (e.g. a different app's `FrontPage`) they could collide. Consider retaining `Kolmikarki` in the filename (e.g. `KolmikarkiFrontPage.js`) if multi-app expansion is planned. | Low |
| 2 | Import alias option (§6-C) is unresolved — **approval should specify Option 1 or Option 2**. | Medium |
| 3 | Import path inconsistency (line 2 uses `.js`, lines 3–4 don't). Recommend harmonising to no-extension during the rename. | Low |
| 4 | `description` field in `public/manifest.json` ("Kolmikarki — suomalainen runoelmakokoelma") was inferred; no authoritative source was available. Unrelated to this rename but flagged from prior audit. | Low |

---

## 8. Total Touch Count (if proceeding)

| File | Changes needed |
|---|---|
| `src/components/kolmikarki_front_page.js` | Rename file (+ optional: rename exported function) |
| `src/components/kolmikarki_poem_page.js` | Rename file (+ optional: rename exported function ×2) |
| `src/components/kolmikarki_contents_page.js` | Rename file (+ optional: rename exported function) |
| `src/App.js` | Update 3 import paths + 3 import aliases + 4 JSX usages (7 edits) |
| `src/App.test.jsx` | **No changes required** |
| All other `src/` files | **No changes required** |

**Minimum required edits:** 3 file renames + 7 lines in `App.js`.

---

*Audit complete. Awaiting approval before proceeding.*
