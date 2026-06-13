# While They're Here

> _"Capturing the ordinary before it becomes extraordinary."_

A hyper-minimalist, distraction-free single-page web application built around
three tabs: a daily grounding reminder, a perspective-shift on neuroplasticity,
and a private open letter to yourself. Built as a production-grade React +
TypeScript + Tailwind frontend, CI/CD-ready for automated deployment to GitHub
Pages.

---

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 18 + TypeScript (strict)          |
| Build tool     | Vite 5                                  |
| Styling        | Tailwind CSS 3 (semantic design tokens) |
| Persistence    | `localStorage` only (no backend)        |
| Lint           | ESLint (type-checked, `no-explicit-any`)|
| CI/CD          | GitHub Actions → GitHub Pages           |

---

## Architecture

The codebase enforces a strict **separation of concerns**: state lives in
hooks, components are presentational, and content data and types are isolated
and `readonly`.

```
while-theyre-here/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI: type-check, build, deploy to Pages
├── public/                     # (static passthrough assets, if any)
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Thin composition shell — tab state only
│   ├── index.css               # Tailwind layers + font-face + base styles
│   │
│   ├── types/
│   │   └── index.ts            # Single source of truth for all data shapes
│   │
│   ├── data/
│   │   └── content.ts          # Workbook-derived copy for all three tabs
│   │
│   ├── hooks/
│   │   └── useLocalStorage.ts  # `useState` backed by localStorage
│   │
│   └── components/
│       ├── TabNav.tsx          # ARIA tablist, arrow-key navigation
│       ├── tabs/
│       │   ├── ReminderTab.tsx   # Tab 1 — morning/evening reminder + log
│       │   ├── IdeaTab.tsx       # Tab 2 — neuroplasticity + how-to accordion
│       │   └── OpenLetterTab.tsx # Tab 3 — reflection + "Email to me"
│       └── ui/
│           ├── Button.tsx
│           └── Accordion.tsx
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Brand design tokens (cream/sage/clay/walnut/mist/charcoal)
├── tsconfig*.json              # Strict TS, no `any`
└── vite.config.ts
```

### The three tabs

- **The Reminder** — auto-detects morning vs. evening (with a manual override)
  and shows either a present-tense grounding prompt or an end-of-day gratitude
  prompt. Entries are saved locally via `useLocalStorage`.
- **The Idea** — the neuroplasticity reframe ("seek discomfort to change
  perspective") plus an accessible accordion of practical how-to's drawn from
  the workbook's capture protocols.
- **The Open Letter** — a distraction-free textarea (auto-saved locally) with
  an "Email to me" action that opens the user's mail client with the letter
  pre-filled, addressed by them to themselves.

### Typography

The app uses a single typeface, **FOT-Seurat Pro B**, declared via `@font-face`
in `src/index.css`. This is a licensed commercial font and is **not** bundled —
drop `FOT-SeuratPro-B.woff2`/`.woff` into `public/fonts/` to activate it.
Without those files, the app falls back to Inter, then the system sans-serif
stack.

### Accessibility

Semantic landmarks (`<main>`, `<section>`, `<article>`, `<footer>`), an ARIA
tablist with arrow-key navigation, ARIA checkboxes/progressbar, visible
keyboard focus rings, `aria-live` regions, and full `prefers-reduced-motion`
support (animations and audio are suppressed).

---

## Local development

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint     # ESLint (type-checked)
```

---

## Deployment (GitHub Pages, automated)

Deployment is fully automated by `.github/workflows/deploy.yml` on every push to
`main`. See the step-by-step terminal manual below.

### One-time GitHub setup

1. Create an **empty** repository on GitHub (no README/license).
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub
   Actions**.

### Step-by-step terminal manual

```bash
# 0. Move into the project directory
cd while-theyre-here

# 1. Initialise a local git repository
git init
git branch -M main

# 2. Stage and commit everything (.gitignore keeps node_modules/dist/secrets out)
git add .
git commit -m "feat: initial production build of While They're Here"

# 3. Link the local repo to your remote GitHub URL
#    (replace USERNAME and REPO with your own)
git remote add origin https://github.com/USERNAME/REPO.git

# 4. Push main — this triggers the CI/CD workflow and the live deployment
git push -u origin main
```

After the push, open the **Actions** tab to watch the build & deploy run. Once
it finishes, your site is live at:

```
https://USERNAME.github.io/REPO/
```

> The workflow sets `VITE_BASE=/REPO/` automatically so asset paths resolve on a
> project Pages site. No manual config needed.

### Deploying to Vercel or Netlify instead

The app is a standard Vite SPA, so no code changes are required:

- **Vercel** — Import the repo. Build command `npm run build`, output `dist`.
  Leave `VITE_BASE` unset (defaults to `/`). Remove `deploy.yml` if you don't
  also want the Pages deploy.
- **Netlify** — Build command `npm run build`, publish directory `dist`.

---

## License

UNLICENSED — private project for "While They're Here".
