# Portfolio redesign — 12 October 2026

## Purpose and design

Rebuilt the original static HTML/Express portfolio as a React + TypeScript + Vite application. The design uses warm paper surfaces, graphite type, cobalt accents, locally hosted fonts and a real 3D assembly representing interface, logic and system layers. The scene has explicit exploration and pause controls, pointer response, reduced-motion handling, controlled DPR, offscreen/background suspension and a fallback when WebGL is unavailable.

The homepage now presents a clear professional focus, a quick profile for hiring teams, a NEXYRAL flagship project with live/source links, KrishiSetu, collaborative Websites With Punch work, and the correctly linked Flask student-management repository. The NEXYRAL case study explains the user flow, architecture decisions, recovery/ownership boundaries and inspectable implementation evidence. Experience, research, contact details and education were taken from the existing portfolio and résumé. No employer endorsements, hiring guarantees, invented revenue, client counts or accuracy scores were added.

The downloadable one-page résumé now includes NEXYRAL and clickable live/profile links. Its original version remains at the repository root. The new PDF has a proper title, tagged structure and locally loaded fonts.

## Engineering and contact

The website uses React components throughout; the small root HTML file is Vite’s entry document. Source, content, scene, styles and tests are separated. No runtime API keys are required. The old Express contact backend was removed because local JSON storage is unsuitable for durable inbox delivery on Vercel. The new contact path uses mailto and clipboard actions; no fake “message sent” state is presented.

Production routing handles direct access to `/work/nexyral`, résumé/assets and a useful missing-page view. Legacy `#summary`, `#skills` and `#projects` links map to the corresponding current sections.

## Checks completed locally

- Frozen install, lint, strict TypeScript and production build: results recorded before release below.
- Seven browser tests passed, covering navigation and case-route reloads at 375/390/768/1440px, recruiter dialog focus, mobile navigation, 3D movement/pause/layer exploration, reduced motion, actual PDF download, clipboard copying, direct contact, route recovery and simulated WebGL failure.
- Visual/functional checks passed at 375/390/430/768/1024/1440px. Homepage and case study had no horizontal page overflow and no observed browser console/page errors.
- Screenshots inspected on desktop/mobile, plus résumé rendering and case-page layouts.
- Updated PDF was confirmed as one page with embedded text and correct title.
- NEXYRAL and Websites With Punch public URLs returned HTTP 200; linked repositories were found under the user’s GitHub account.

## Limitations

The 3D dependency chunk is lazy-loaded but still triggers Vite’s existing size advisory (about 913KB / 242KB gzip); the initial application chunk is about 297KB / 94KB gzip. Physical-device frame rates and accessibility with human assistive-technology users were not measured. Automated checks are evidence of tested behavior, not a hiring guarantee. Supplied professional and publication facts were preserved; their external credential records were not independently audited.

## Release and environment

Deployment verification, GitHub commit and reusable environment setup are recorded after completion. GitHub source publication, Vercel website deployment and saving a cloud-environment draft are separate actions.

Release preparation: clean `npm ci --cache /tmp/portfolio-npm-cache`, lint, strict TypeScript, production build and the final seven-test browser run all passed. Development server startup on strict port5174 returned HTTP200 for homepage and case route; production preview checks were exercised on4190/4191. Reusable install/start instructions were appended to the cloud-environment draft while preserving the prior NEXYRAL instructions and existing credential requirements; the draft was saved for review, not published as an environment snapshot.

The existing `mohsinpathan` Vercel project was verified as linked to `portfolio/main`, then updated to Vite with `npm ci`, `npm run build` and `dist`. Its public hostname remains `mohsinpathan.vercel.app`. No NEXYRAL, AWS or other Vercel project was deployed or modified.

## Published release

Source commit `4fadb51342ea872186952b7ba2b788f836e843af` was pushed to the user’s public `portfolio/main` repository. Vercel’s linked production deployment `dpl_2SVvZRGVQpX6U1UviSBE8UWoaac1` reached READY and serves **https://mohsinpathan.vercel.app**.

Actual public-site checks passed at 375/390/430/768/1024/1440px: the 3D assembly rendered and changed on layer exploration, homepage/case views remained within the viewport, and no console/page errors were observed. Homepage and direct `/work/nexyral` requests returned HTTP200. The résumé returned application/pdf, matched the local file’s SHA-256 and contains the NEXYRAL project. The social preview returned image/png. These checks use real HTTPS responses with verified TLS, not mocked production content.

Changed-file inventory: React entry/config and dependency files, removed legacy Express server, homepage/case/UI/scene components, content module, global/scene/case styles, public fonts/licenses/images/favicon/updated résumé, browser tests and visual/résumé scripts, README and this report. The original root résumé was preserved. No credentials or generated test artifacts were committed.
