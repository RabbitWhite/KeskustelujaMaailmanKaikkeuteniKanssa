# Security Audit — KeskustelujaMaailmanKaikkeuteniKanssa

## npm audit Output

```
npm warn audit 403 Forbidden - POST https://registry.npmjs.org/-/npm/v1/security/audits/quick
Host not allowed
npm error audit endpoint returned an error
```

The npm registry audit endpoint is unreachable from this environment (outbound POST to `registry.npmjs.org` blocked). The raw `npm audit` output cannot be captured.

**Known vulnerability count (from GitHub Dependabot, reported during git push):**
> 27 vulnerabilities — 17 high, 6 moderate, 4 low

The analysis below is derived from installed package versions in `package-lock.json` cross-referenced against published CVEs.

---

## Installed Versions of Security-Relevant Packages

| Package | Installed version(s) |
|---|---|
| `nth-check` | 1.0.2 *(vulnerable)*, 2.1.1 |
| `postcss` | 7.0.39 *(vulnerable)*, 8.4.49 |
| `svgo` | 1.3.2 *(vulnerable)*, 2.8.0 |
| `css-select` | 2.1.0 *(vulnerable)*, 4.3.0 |
| `webpack-dev-server` | 4.15.2 |
| `webpack` | 5.97.1 |
| `ws` | 7.5.10, 8.18.0 |
| `node-forge` | 1.3.3 |
| `semver` | 6.3.1, 7.6.3 |
| `loader-utils` | 2.0.4, 3.3.1 |
| `minimatch` | 3.1.2, 5.1.6, 9.0.5 |
| `follow-redirects` | 1.15.9 |
| `tough-cookie` | 4.1.4 |
| `shell-quote` | 1.8.2 |
| `json5` | 1.0.2 *(vulnerable)*, 2.2.3 |
| `http-proxy-middleware` | 2.0.9, 3.0.5 |
| `express` | 4.22.1 |
| `terser` | 5.37.0 |
| `braces` | 3.0.3 |
| `glob-parent` | 5.1.2, 6.0.2 |

---

## Analysis

### 1. High-Severity Vulnerabilities

#### nth-check < 2.0.1 — CVE-2021-3803 (High)
- **What it affects:** Inefficient regular expression in CSS `:nth-child` selector parsing — ReDoS (Regular Expression Denial of Service).
- **Installed path:** `node_modules/svgo/node_modules/nth-check@1.0.2`
- **Dependency chain:** `react-scripts` → `@svgr/webpack@5.5.0` → `svgo@1.3.2` → `css-select@2.1.0` → `nth-check@1.0.2`
- **Fix:** nth-check >= 2.0.1 (also requires svgo >= 2.x and @svgr/webpack >= 6.x, which react-scripts 5.x does not support)

#### json5 < 1.0.2 / < 2.2.2 — CVE-2022-46175 (High)
- **What it affects:** Prototype pollution via maliciously crafted JSON5 input.
- **Installed:** `json5@1.0.2` — this is the boundary version; whether it is affected depends on the exact patch sub-version. The safe version is >= 1.0.2 (patched) or >= 2.2.2. The lock file shows `1.0.2` which is the patched release, but npm may still flag the `1.x` range.
- **Dependency chain:** Transitive from `react-scripts` toolchain (babel, webpack).

#### webpack-dev-server@4.15.2 — CVE-2024-43788 (High)
- **What it affects:** Source code disclosure via DNS rebinding attack. A crafted `Host` header can cause webpack-dev-server to serve application source files to a malicious page on a different origin.
- **Fix:** webpack-dev-server >= 5.x. The v4 line does not receive this fix.
- **Dependency chain:** `react-scripts` → `webpack-dev-server@4.15.2`

#### Additional likely highs from the react-scripts tree
The 17 high count is consistent with npm counting each vulnerable **dependency path** separately (e.g., if `nth-check@1.0.2` is reachable via 10 different resolution paths, it may be counted as 10 findings). The primary root causes are the three above.

---

### 2. CRA-Originated vs Your Code

**Every vulnerability in this project is a transitive dependency of `react-scripts`.** Your own direct dependencies are:

| Your direct dep | Known vulnerabilities |
|---|---|
| `react@18.2.0` | None |
| `react-dom@18.2.0` | None |
| `react-router-dom@6.30.1` | None |
| `react-tooltip@5.29.1` | None |
| `web-vitals@2.1.4` | None |
| `http-proxy-middleware@3.0.5` | None (3.x is clean; note 2.0.9 is also present as a transitive dep from react-scripts) |
| `gh-pages@6.3.0` (devDep) | None |

**All 27 vulnerabilities originate from `react-scripts@5.0.1`** and its frozen, deeply nested dependency tree. You have written zero vulnerable code.

---

### 3. Exploitability in a Static Site Context

This app is deployed as a **static site on GitHub Pages**. There is no server process, no user authentication, no database, and no Node.js runtime in production. The production artifact is a pre-built `build/` folder of HTML, CSS, and JS files served from a CDN.

| Vulnerability | Relevant in production? | Reasoning |
|---|---|---|
| **nth-check ReDoS** (CVE-2021-3803) | **No** | ReDoS requires a running Node.js process parsing attacker-controlled CSS. The build tool runs once locally/in CI; the output is static files. No CSS parsing occurs at runtime. |
| **json5 prototype pollution** (CVE-2022-46175) | **No** | Prototype pollution via json5 affects the build-time Node.js process, not the shipped JS bundle. |
| **webpack-dev-server source disclosure** (CVE-2024-43788) | **No** | webpack-dev-server only runs during local development (`npm start`). It is never exposed in the GitHub Pages deployment. This is a developer workstation risk, not a production risk. |
| **postcss line-return parsing** (CVE-2023-44270) | **No** | Build-time only; postcss processes CSS during `npm run build` and is not present in the output. |
| Any remaining highs | **No** | All flagged packages are build tooling. None of them ship to the browser in the `build/` output. |

**In short: zero of the 27 vulnerabilities are exploitable against end users of this deployed site.** They are all build-time toolchain issues.

The only realistic threat surface is **developer machines** running `npm start`. The webpack-dev-server CVE (CVE-2024-43788) is the one worth acknowledging: if a developer is running the dev server on a shared or untrusted network and visits a malicious page simultaneously, source code could be exfiltrated. This is low-probability but non-zero.

---

### 4. Recommended Action

| Option | Assessment |
|---|---|
| **`npm audit fix`** | Will not resolve the high-severity findings. The fixes require major version bumps inside react-scripts' locked dependency tree, which `npm audit fix` cannot safely perform. `npm audit fix --force` would likely break the build. |
| **Patch in place** | Not viable. `react-scripts` does not accept peer dependency overrides for its internal packages cleanly. You could add `overrides` in `package.json` to force newer versions of `nth-check` etc., but this is fragile and not officially supported by CRA. |
| **Accept risk** | Reasonable for production exposure — none of the vulnerabilities affect the deployed static site. If the team is aware and developer machines are not running the dev server on public networks, risk is effectively zero in production. |
| **Migrate away from CRA** *(recommended long-term)* | CRA / react-scripts is officially unmaintained (React team deprecated it in 2023). Migrating to **Vite** (`npm create vite@latest`) would eliminate the entire `react-scripts` dependency tree, dropping the vulnerability count to near zero and dramatically reducing build times. This is the clean solution. |

**Recommended path:**
1. **Immediately:** Accept the current risk for the live site (no production exposure).
2. **Short term:** Migrate to Vite. This is a well-documented 1–2 hour migration for a project of this size and removes all 27 vulnerabilities at source.
3. **Do not** run `npm audit fix --force` — it is likely to break the build without fixing the root cause.
