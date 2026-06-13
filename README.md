# While They're Here

> _"Capturing the ordinary before it becomes extraordinary."_

A warm, minimalist single-page web application for the present-tense
appreciation of the people we love. Built as a production-grade React + TypeScript
+ Tailwind frontend, CI/CD-ready for automated deployment to GitHub Pages.

---

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 18 + TypeScript (strict)          |
| Build tool     | Vite 5                                  |
| Styling        | Tailwind CSS 3 (semantic design tokens) |
| Audio          | Web Audio API (synthesised, no assets)  |
| Lint           | ESLint (type-checked, `no-explicit-any`)|
| CI/CD          | GitHub Actions → GitHub Pages           |

---

## Architecture

The codebase enforces a strict **separation of concerns**: business logic lives
in hooks and a framework-agnostic audio engine; components are presentational;
content data and types are isolated and `readonly`.

```
while-theyre-here/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI: type-check, build, deploy to Pages
├── public/                     # (static passthrough assets, if any)
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Thin composition shell (no logic)
│   ├── index.css               # Tailwind layers + base/anti-aesthetic styles
│   │
│   ├── types/
│   │   └── index.ts            # Single source of truth for all data shapes
│   │
│   ├── data/
│   │   └── content.ts          # Brand-manual content (pillars, prompts, …)
│   │
│   ├── lib/
│   │   └── audioEngine.ts      # SensoryAudioEngine — pure Web Audio, no React
│   │
│   ├── hooks/
│   │   ├── useReveal.ts         # Scroll-reveal via IntersectionObserver
│   │   ├── useSensoryAudio.ts   # React adapter over SensoryAudioEngine
│   │   └── usePromptRoulette.ts # Non-repeating draw + swap state
│   │
│   └── components/
│       ├── layout/
│       │   ├── NavBar.tsx
│       │   └── Footer.tsx
│       ├── sections/
│       │   ├── Hero.tsx
│       │   ├── Pillars.tsx
│       │   ├── SoundscapeSection.tsx
│       │   ├── WeeklyLoop.tsx        # Accessible ARIA tablist
│       │   ├── ArchiveSection.tsx
│       │   └── CheckInSection.tsx
│       ├── ui/
│       │   ├── Button.tsx
│       │   ├── Reveal.tsx
│       │   ├── SectionHeading.tsx
│       │   └── icons.tsx
│       ├── SensoryDashboard.tsx     # Feature A (core)
│       ├── PromptRoulette.tsx       # Feature B (core)
│       ├── CaptureChecklist.tsx     # Feature B (checklist)
│       ├── DailyReminderForm.tsx    # Feature C (core)
│       └── NudgePhonePreview.tsx    # Feature C (preview mockup)
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Brand design tokens
├── tsconfig*.json              # Strict TS, no `any`
└── vite.config.ts
```

### The three core feature components

- **`SensoryDashboard`** — Feature A. The Proustian "VIP Neurological Highway":
  keyboard-navigable floating nodes that trigger live-synthesised ambient audio
  and reveal the manual's sensory-loss copy.
- **`PromptRoulette`** — Feature B. "Draw a Reflection" with non-repeating field
  directives, plus the interactive `CaptureChecklist` (SOP §5).
- **`DailyReminderForm`** — Feature C. The "Human Check-In" subscription with a
  finite-state union for submission and a live phone-notification preview.

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
