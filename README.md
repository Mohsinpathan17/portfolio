# Mohsin Pathan — Portfolio

**[Visit the live portfolio](https://mohsinpathan.vercel.app)** · [NEXYRAL](https://nexyral.online) · [NEXYRAL source](https://github.com/Mohsinpathan17/nexus-ai-platform)

A React + TypeScript portfolio focused on project evidence, thoughtful interfaces and applied engineering. It includes an interactive 3D assembly, a recruiter profile snapshot, a NEXYRAL case study, selected work, experience, research and direct contact links.

## Run locally

Node **24.19+** and npm are required.

```sh
npm ci
npm run dev
```

The development server starts on port 5173 by default. To avoid another app using that port, use `npm run dev -- --port 5174 --strictPort`.

```sh
npm run lint
npm run typecheck
npm run build
npm run test:ui
```

Browser tests use system Chromium when available. Otherwise install the Playwright browser with `npx playwright install chromium`. You can set `PORTFOLIO_CHROMIUM_PATH` to another Chromium executable. The tests start a production preview on port 4191.

For visual checks and résumé generation:

```sh
npm run preview -- --port 4190 --strictPort
# In a second terminal:
npm run check:visual
npm run resume
```

`PORTFOLIO_URL` changes the visual-check destination. `PORTFOLIO_LOCAL_URL` changes the résumé generator’s font/server origin. Production checks use verified HTTPS responses through Node’s configured proxy/trust settings; they do not replace responses with fixture content or disable TLS verification.

## Content and assets

- `src/lib/content.ts`: contact details, links and experience.
- `src/pages/Home.tsx`: portfolio content and selected work.
- `src/pages/NexyralCase.tsx`: flagship case study.
- `src/components/scene/`: lazy-loaded React Three Fiber scene, controls and fallback.
- `src/styles/`: reusable colors, typography, layouts and responsive styles.
- `scripts/generate-resume.mjs`: editable résumé layout/content.
- `public/Mohsin_Pathan_Resume.pdf`: updated downloadable résumé with NEXYRAL.
- `Mohsin_Pathan_Resume.pdf`: preserved original résumé.

Manrope and Space Grotesk are served locally; their OFL licenses are in `public/fonts`. Project screenshots are from the user’s live NEXYRAL website. The Websites With Punch and KrishiSetu graphics are editorial illustrations, not analytics or claimed measured results.

## Deployment

The existing Vercel project `mohsinpathan` uses this repository’s `main` branch. `vercel.json` configures Vite, the `dist` output, SPA routes and basic response headers. The contact section opens an email composer or copies the public address; it does not pretend to submit or deliver email through a backend. No API keys or environment variables are needed to build the portfolio.

The old Express contact handler was removed: its local JSON-file storage did not provide durable inbox delivery on Vercel. No server-side personal messages or credentials are included in this repository.

See [the redesign report](docs/REDESIGN_REPORT.md) for validation, release details and remaining limitations.
