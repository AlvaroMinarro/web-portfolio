# Portfolio refresh: technical design guide

**Decision:** use an editorial retroindustrial direction rooted in Álvaro Miñarro Gil's Solitude Pine theme. Present a versatile software engineer with a strong love of Android and Kotlin Multiplatform (KMP), not an IoT-only profile.
**Next action:** review this guide and choose the first visual variant: A, B, or C. This is the agreed planning baseline; it does not approve UI implementation or all three variants.

## Quick path and boundaries

1. Review the identity, factual content, palette, and asset policy below.
2. Choose one first variant and authorize its narrow implementation surfaces.
3. Implement that variant, then run the technical checks and actual browser review separately.
4. Collect feedback; authorize the next scoped iteration only if needed.
5. Select and refine the strongest direction before considering delivery.

This task creates only this Markdown guide. No UI, dependency installation, SDD state, commit, or deployment is included.
Preserve the existing `.gitignore` changes, `New/`, and `.codegraph/`; do not move or overwrite source assets.
Future work should reuse the current single-page architecture: no new backend, routing, or build/deployment changes by default.

## Identity and content baseline

Use the full name **Álvaro Miñarro Gil** prominently with the positioning **Software engineer · Android & Kotlin Multiplatform**.
Suggested English introduction: “I build software across mobile, web, and connected systems. Android and Kotlin Multiplatform are where I especially enjoy creating products.”
Keep career direction open: current IoT work demonstrates breadth, not a permanent specialization. Do not imply active job seeking or immediate availability without confirmation.

### Factual inventory for both ES and EN

| Item | Approved facts | Publishing guardrail |
| --- | --- | --- |
| Education | Computer Engineering, Software Engineering specialization, Universidad de Murcia; September 2021–May 2026. | **9.8/10 is the final degree project (TFG) grade**, not the degree average. |
| LoL Esports Tracker | January 2024–present; Android in production; KMP migration complete, with shared logic and UI; iOS ready but not released. | Do not say migration is ongoing or imply an iOS store release. |
| Mobile product evidence | Ktor backend; Firebase authentication and notifications; 1,300+ organic downloads and 400 active installs. | Label counts as a CV snapshot, not live analytics; do not invent a measurement date. |
| NaviLens | Full-stack and Android, February–September 2025, eight months; 14 NaviLens GO UI components; Angular, React, Node.js, TypeScript, AWS S3. | Past employment; do not append “present” or publish private product/client material. |
| Freelance web | January 2024–present; PHP migration, WordPress and custom websites, GDPR-related work. | Do not invent clients or imply certified legal compliance. |
| Llamas | IoT & Automation Engineer, full-time, September 2026–present; Murcia, on-site. | User-confirmed role; do not hard-code “two months” or infer an employer legal name. |

Describe Llamas work through verified responsibilities: design, configuration, and integration for homes and industrial systems; Home Assistant, Shelly, and smart devices; lighting/load automation; local mini-PCs or dedicated hardware; communications, automation logic, and troubleshooting.
Do not invent protocols, savings, client cases, deployment counts, or business outcomes.

**Sources:** the supplied extraction of `New/AlvaroMinarroGil_CV_07_2026.pdf` plus direct user statements. The PDF filename says July 2026; its internal update says August 2026. Llamas comes from the newer user confirmation, not that CV.
LinkedIn is an existing contact link, not a fresh evidence source: public fetching returned 999. This guide does not claim independent CV extraction or rendered reference inspection.

## Content hierarchy and semantic structure

Keep one `<main>`, a single descriptive `<h1>`, and named `<section>` elements with `<h2>` headings. Visual asymmetry must not disrupt DOM reading order.

| Reading order | Purpose and content | Anchor contract |
| --- | --- | --- |
| 1. Identity + portrait | Full name, versatile positioning, Android/KMP emphasis; project, CV, and contact actions. | Keep `home`. |
| 2. Flagship mobile work | LoL Esports Tracker: product purpose, ownership, shipped Android, completed KMP, evidence, honest imagery. | Propose `projects`; this is a new coordinated contract. |
| 3. Versatility + current work | Short personal narrative connecting mobile, web, and Llamas IoT responsibilities. | Keep `about`. |
| 4. Experience + education | Employment chronology, clearly separate personal/freelance work, degree and TFG result. | Keep `experience`; education can have an internal heading. |
| 5. Capabilities | Mobile first, followed by web/backend and connected systems; tie skills to work examples. | Keep `technologies`; visible label can become “Capabilities.” |
| 6. Contact | Existing email, GitHub, LinkedIn, and CV access; concise closing invitation. | Keep `contact`. |

Avoid repeating the entire flagship case study in the experience timeline. Use a short linked summary there.
Replace unsupported percentage bars, stars, and “expert” ratings with evidence-backed capability groups. Completed KMP work must not remain labeled merely “studying.”
Keep copy data-driven rather than embedding separate Spanish/English paragraphs in components.

## Visual system: Solitude Pine

The user designed Solitude Pine and explicitly requested related colors. Values below were verified from local `colors.toml` in prior context; they are not sampled from reference websites.
Use semantic CSS variables in `src/styles/index.css`, exposed through `tailwind.config.js`; avoid scattering hex literals across components.
These are proposed **dark-theme** aliases, not implemented tokens or measured contrast results.

| Proposed token | Value | Practical use |
| --- | --- | --- |
| `--color-canvas` | `#101315` | Main page background. |
| `--color-surface` | `#0C0E10` | Quiet inset product/experience regions. |
| `--color-depth` | `#080A0B` | Deep framing and sparse dark separators. |
| `--color-text` | `#CACCCC` | Default body text. |
| `--color-heading` | `#CBC2BE` | Warm large headings and editorial emphasis. |
| `--color-text-secondary` | `#A5AEB4` | Supporting copy and metadata, subject to contrast checks. |
| `--color-muted` | `#4B4E55` | Decorative rules and nonessential texture; **not body text**. |
| `--color-selection` | `#343D41` | Selected text background with a readable foreground. |
| `--color-accent` | `#459A88` | Primary action surfaces and sparse brand accents. |
| `--color-accent-bright` | `#63AD9E` | Hover/active emphasis, subject to pairwise checks. |
| `--color-foam` | `#9CCFD8` | Focus indicators, links, and restrained secondary highlights. |
| `--color-iris` | `#C4A7E7` | Optional rare tertiary detail; never a competing brand color. |

Keep most of the page neutral; accents should identify actions and selected evidence, not color every section.
For filled accent buttons, start by evaluating a dark label rather than assuming white text is readable. Essential control outlines cannot rely on the decorative muted token.
Retain the theme toggle and stored/system preferences. Propose a light mapping using pale foreground colors as surfaces and dark colors as text; validate every accent pairing separately, not by blindly inverting the page.
**Accessibility gate:** measure final text/background and interaction-state pairs for WCAG AA: at least 4.5:1 for small text and 3:1 for large text and essential UI graphics. No contrast validation has been performed here.
Do not use yellow as the portfolio brand accent. Preserve Llamas' black/yellow logo; no recoloring without permission.

### Composition and typography

- Use oversized, solid-color typography, asymmetric columns, editorial spacing, fine rules, and mostly square geometry.
- Keep the portrait rectangular and natural; no circular avatar, heavy tint, face-obscuring overlay, or forced distortion.
- Create the restrained artistic atmosphere through proportion, negative space, and dark surfaces—not a generic gradient/rounded-card SaaS layout or terminal imitation.
- Start with a 12-column desktop grid; collapse to a logical single-column mobile flow. Avoid fixed heights that crop translated content.
- Proposal: display type using **Barlow Condensed or Oswald**, with **Inter or system sans** for body text. These are candidates, not approved or installed fonts.
- Validate licenses, redistribution, ES/EN accented glyphs, and loading cost. Prefer local WOFF2 subsets and `font-display: swap`; use only necessary families and weights, with `ui-sans-serif, system-ui, sans-serif` fallback.
- Starting ranges: fluid display type around `clamp(3rem, 8vw, 7rem)`, body text 16–18px with 1.5–1.7 line height, and reading columns near 60–70 characters. Adjust after mobile review.
- Use compact technical labels in the body family; do not add a third monospace family merely to look technical.

## Asset preparation: future work only

| Existing input | Proposed public copy/use | Rules |
| --- | --- | --- |
| `New/fotoPerfil.png` | `public/portfolio-portrait.webp` | Optimize a copy, retain natural crop, provide useful alt text and intrinsic dimensions. |
| `New/llamas.jpg` | `public/llamas-logo.webp` | Preserve logo colors and proportions; contain rather than crop the mark. |
| `New/AlvaroMinarroGil_CV_07_2026.pdf` | Review before updating `public/AlvaroMinarro-CV.pdf`. | Keep the existing download URL; confirm the public document and any personal details first. |
| `public/lolesportstracker.png`, `public/navilens.jpg` | Existing logos for identification. | These are not app screenshots and must not be presented as such. |

Preserve every original in `New/`. No asset conversion or CV replacement is authorized by this document task.
Produce only useful responsive image sizes, avoid upscaling, set width/height to prevent layout shift, and lazy-load below-the-fold imagery. Review the hero image's loading priority after measuring.
For a product gallery, request genuine approved captures. Until then, use clearly labeled logos and factual text; do not fabricate screenshots or expose client information.
Keep `import.meta.env.BASE_URL` asset construction used by current data and CV links, so subpath hosting still works.
Retain `mailto:amglorca@gmail.com`, `https://github.com/AlvaroMinarro`, and `https://www.linkedin.com/in/alvaro-minarro-gil/`. Do not automatically expose a phone number.

## Implementation map for the chosen iteration

Current stack: React 18, TypeScript, Vite 5, Tailwind 3, Framer Motion, and Lucide. React Router is installed, but `src/App.tsx` currently composes a single page without route definitions.
Current order is Header → Hero → About → Technologies → Experience → Contact → Footer. The hierarchy above proposes a reordered composition and a flagship section, not a rewrite.

**Candidate surfaces below are planning references, not blanket edit authorization.** The next bounded task must explicitly approve only the paths required for its selected variant.

| Candidate paths | Intended responsibility |
| --- | --- |
| `src/App.tsx` | Compose the selected order; respect reduced motion instead of forcing smooth scroll. |
| `src/data/portfolio.ts`, `src/types/index.ts` | Stable content IDs, project/employment distinction, explicit date ranges, evidence notes, localized experience fields or translation keys; remove rating fields if unused. |
| `src/i18n/translations.ts` | Complete ES/EN copy, including roles, periods, descriptions, achievements, navigation, and accessibility labels. |
| `src/components/sections/Hero.tsx`, `src/components/sections/About.tsx`, `src/components/sections/Experience.tsx`, `src/components/sections/Technologies.tsx`, `src/components/sections/Contact.tsx` | Render the factual hierarchy; preserve CV/contact behavior and useful expand/collapse interactions. |
| Proposed `src/components/sections/Projects.tsx`; `src/components/sections/index.ts` | Add/export a focused flagship section only if approved. |
| `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx` | Coherent navigation, controls, and footer identity. |
| `src/hooks/useActiveSection.ts`, `src/types/index.ts` | Coordinate any new section ID with observation, scrolling, and the `Section` union. |
| `src/hooks/useLanguage.tsx`, `src/hooks/useTheme.ts` | Preserve language/theme persistence; change only if a selected behavior requires it. |
| `src/components/ui/Section.tsx`, `src/components/ui/Button.tsx` | Shared section geometry, semantic controls, and focus treatment if needed. |
| `src/styles/index.css`, `tailwind.config.js` | Semantic tokens, type scale, layout utilities, and reduced-motion styling. |
| The proposed public copies above; approved local font files under `public/fonts/` | Asset preparation only after approval and license/privacy review. |

`Header.tsx`, `useActiveSection.ts`, and the `Section` type currently share `home`, `about`, `technologies`, `experience`, `contact`. Adding `projects` requires updating all three, its DOM ID, translated navigation, and any CTA targets together.
The hook uses an 80px scroll offset and fixed observer margins: review them against the chosen header height so headings remain visible.
Experience data currently contains Spanish-only roles/descriptions/achievements; translating just section headings is insufficient. Replace automatic “present” suffixes with explicit localized start/end dates so NaviLens stays historical.
Remove stale NaviLens/KMP claims in both `portfolio.ts` and `translations.ts`; update hard-coded skill percentages in `About.tsx` and level/expert badges in `Technologies.tsx` and hero copy.
Keep ES/EN switching, the document language, localStorage preferences, responsive navigation, keyboard access, downloads, and existing external/mail links. Contact currently uses links, not a working form/backend; do not introduce fictional submission behavior.

## Three future visual alternatives

All variants share the same factual content, semantic tokens, approved assets, ES/EN support, and functional contracts. Implement **one at a time in the same worktree**, never three competing versions simultaneously.

| Variant | Specific variables to change | Main review question |
| --- | --- | --- |
| **A — Editorial asymmetry** | Off-center name block, portrait-to-copy ratio, column offsets, wide whitespace, project placement and type scale. | Does the first screen feel unmistakably personal while leading naturally to mobile work? |
| **B — Technical systems grid** | More regular grid, thinner rules, modular evidence blocks, restrained schematic connectors and technical labels. | Does structure communicate versatility without resembling a terminal or invented system diagram? |
| **C — Bold type / product gallery** | Larger typographic rhythm, product-image area, gallery density, portrait position, caption and project-detail balance. | Do genuine product visuals strengthen Android/KMP prominence without overshadowing Álvaro? |

C remains logo/text-led until genuine screenshots are approved; never manufacture gallery evidence. B's motifs are decorative, not claims about actual client architectures, and should be hidden from assistive technology.
**Fixed invariants:** name/positioning, truthful dates and metrics, mobile-first emphasis, IoT as breadth, Solitude Pine palette, asset/privacy rules, semantic reading order, localization, theme persistence, and accessible controls.
Score each reviewed iteration from 1–5 for **personal recognition**, **mobile prominence**, **versatility**, **readability/mobile/accessibility**, and **distinctive composition**. Record one evidence-based strength and weakness per criterion; do not let total score excuse an accessibility failure.
The sequence is guide review → first variant selection → bounded implementation → technical/browser review → feedback → next scoped iteration → final selection/refinement. No implementation of any variant is authorized yet.

## Verification for future implementation

These commands match current `package.json` scripts; they are **not run or reported as passing for this documentation-only task**.

| Command | What it establishes |
| --- | --- |
| `npm run type-check` | Runs `tsc --noEmit`; catches TypeScript errors, not visual defects. |
| `npm run build` | Runs `tsc && vite build`; checks production compilation/bundling. |
| `npm run lint` | ESLint on TS/TSX with zero warnings allowed; capture baseline separately. |
| `npm run dev` | Starts Vite for an actual browser review; not an automated acceptance test. |
| `npm run preview` | Serves an already built output for production-output review. |

Potential baseline issue: `.eslintrc.cjs` extends the nonstandard `@typescript-eslint/recommended` rather than the usual plugin-prefixed form. This was observed in configuration, not validated by executing lint; do not repair ESLint in this doc task or hide later failures.
No test script/framework is declared in `package.json`; scoped discovery found no conventional test/spec files or common test-runner configurations. Do not claim test coverage or install a framework without separate approval.
Do not use source-mutating `npm run lint:fix` or `npm run format` as validation, and do not run deploy commands. Browser tooling availability has not been established.

### Actual browser review and acceptance

- [ ] Review 320–390px mobile widths, tablet, and desktop; no horizontal overflow, cropped names, or obscured headings; check both languages and themes.
- [ ] Confirm the flagship appears before long capability lists; identity remains versatile and current IoT is visible but not dominant.
- [ ] Verify factual copy, CV-snapshot metrics, completed KMP/iOS status, historical NaviLens dates, Llamas responsibilities, and TFG labeling in ES/EN.
- [ ] Keyboard-test navigation, menu, toggles, expand/collapse, CV, and contact; keep visible focus, sensible focus order, menu state labels, and comfortable touch targets.
- [ ] Measure contrast for final states; verify headings, alt text, zoom/reflow, and non-color-only interactive cues.
- [ ] Enable reduced motion: disable unnecessary Framer transforms/loops and smooth scrolling, including App inline styles and hook-triggered scrolling—not only CSS transitions.
- [ ] Inspect real image crops, logo fidelity, missing-image behavior, download contents, loading/layout shift, and font fallback in an actual browser.
- [ ] Record automated outcomes separately from visual evidence and user feedback; no build success can substitute for rendered review.

## Inspiration and next decision

References are inspiration only: [Decathlon Yestalgia](https://decathlonyestalgia.com/es/), [Nothing offers](https://es.nothing.tech/offers), [Omarchy](https://omarchy.org/), and [t3.codes](https://t3.codes/).
Rendered visuals have not been verified; the earlier Nothing JavaScript-dependent fetch failed. Do not present inferred layouts, colors, animation, or typography from these references as observed facts.

**Next action for Álvaro:** review this baseline and select **A, B, or C** as the first iteration. Then approve a narrow implementation task; visual feedback, further variants, and delivery remain separate decisions.
