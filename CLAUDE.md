# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run the production build
npm run lint     # next lint (ESLint, eslint-config-next)
```

There is no test suite/runner configured in this repo.

## Architecture

This is a single-page Next.js 14 (App Router) portfolio site. Everything renders on one
route, `src/app/page.tsx`, as stacked `<section>`s navigated via `#hash` anchors and
`scroll-behavior: smooth` — there is no client-side routing between pages beyond that.

### Content lives in `src/data/`, not in components

Each content area has a `src/data/<area>.ts` file (`experiences.ts`, `skills.ts`,
`projects.ts`, `education.ts`, `contact.ts`) paired with a type in `src/types/<area>.ts`.
Components (`WorkExperience.tsx`, `Proyects.tsx`, `About.tsx`, `studies-and-certificates.tsx`,
`Footer.tsx`) import from `@/data/*` and render it — they don't hardcode copy. When asked to
update site content (a new job, a new skill, project info, contact links), edit the relevant
`src/data/*.ts` file rather than the component.

Each of those section components renders its **own** top-level `<section id="...">`
(the `id`/`className` are props with defaults, e.g. `AboutMe({ id = "about" })`). Render them
directly in `page.tsx` and pass `className="scroll-mt-20"` if needed — do not wrap them in
another `<section id="...">` with the same id in `page.tsx`; that previously produced duplicate
DOM ids and broke anchor scrolling.

`WorkExperience` entries use `startDate`/`endDate`/`current` (see `src/types/experience.ts`);
duration badges (e.g. "1.1 years") are computed at render time in `timeline-node.tsx` from
those dates, not stored as text.

### UI layer

- shadcn/ui components (`new-york` style, `components.json`) live in `src/components/ui/` and
  are aliased through `@/components/ui`. Theme tokens are CSS variables (HSL triples) defined
  in `src/app/globals.css` and consumed via `tailwind.config.ts`'s `theme.extend.colors`.
- Dark/light mode is `next-themes` (`ThemeProvider` in `src/app/layout.tsx`); toggled by
  `theme-toggle.tsx`. `defaultTheme` is currently `"light"`.
- `tailwind.config.ts` declares `font-heading`/`font-body` families backed by
  `--font-heading`/`--font-body` CSS vars, but nothing ever sets those vars — the site only
  loads Inter (`next/font/google`, applied via `inter.className` in `layout.tsx`).
- Animation is `framer-motion` throughout (section enter transitions, expand/collapse panels).
  `src/components/animated-background.tsx` renders a canvas-based particle field
  (`AnimatedBackground`) plus blurred floating shapes (`FloatingShapes`); it watches the `dark`
  class on `<html>` via a `MutationObserver` to pick light/dark gradient and particle colors,
  and reacts to mouse position for particle attraction — keep both theme branches in sync if
  you touch its palette.
- Section scroll-spy / active nav highlighting is `src/hooks/use-active-section.ts`, consumed
  by `Header.tsx`.

### Assets

- Photos/images referenced from components live in `src/assets/` and are imported as ES
  modules (`import img from "@/assets/x.jpg"`) so `next/image` can statically optimize them.
- `public/` is for files that must be served at a fixed URL as-is (currently just
  `resume.pdf`, linked from the header/footer as `/resume.pdf`). Don't assume every image
  belongs here — most don't.

### Path aliases

`@/*` → `src/*` (tsconfig.json), plus shadcn's own aliases in `components.json`
(`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) which all resolve under `src/` too.
`tsconfig.json` also defines `@components/*` → `src/components/*` and `@assets/*` →
`src/assets/*`, but existing code consistently uses `@/*` — prefer that for new imports.
