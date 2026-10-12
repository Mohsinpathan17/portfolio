# Portfolio evidence refinement — 12 October 2026

## What changed

Strengthened the NEXYRAL case study with a working local recovery example, a concrete concurrency tradeoff, recorded-revision source links and an explicit description of the AI-assisted implementation workflow. The homepage links directly to the example. Case-study contents navigation helps readers choose between the overview, interaction, tradeoff and source evidence.

The recovery workshop is a prepared engineering example, not an AI inference request or a connection to a private project. Visitors can use its task board, change a title/color, save, simulate a failed update, reject an obsolete write and restore a prior source snapshot. The local source snapshot covers title/color; task state is separate. Restore saves the replaced source, revisions increase monotonically, and history is bounded to ten entries. State lives in the current page only.

The example’s pure TypeScript guard is separated from the React interface. The real NEXYRAL implementation and tests are linked at source revision `5b426f0d1f6a21c6921a0fcbe36ceae8608cd054`; all four evidence URLs returned HTTP200. This illustrates the versioning pattern without claiming the local example proves the production backend is secure or that a provider request ran.

The case-study route is now lazy-loaded, preserving anchor navigation when its module finishes loading. Initial JavaScript decreased from approximately 297KB / 94KB gzip to 291KB / 92KB gzip. The case-study module is approximately 18KB / 6KB gzip. The existing lazy 3D size advisory remains.

## Validation

- Lint and production build passed, including strict TypeScript.
- Four logic tests passed: racing writers, recoverable restore, bounded/pruned history, and invalid-source protection.
- Nine browser tests passed, including the previous portfolio workflow and new recovery scenarios at 390/1440px. No tests skipped.
- Local visual/function checks passed at 375/390/430/768/1024/1440px, with no page overflow or observed console/page errors.
- Workshop screenshots inspected on mobile and desktop; mobile form inputs use 16px type to avoid small-input zoom behavior.
- No dependencies added. The pinned source links were verified; no testimonials, user-growth figures, hiring guarantees or numerical product ratings were invented.

## Files

Created: `src/lib/change-guard.ts`, `src/components/evidence/RecoveryWorkshop.tsx`, `src/components/evidence/EngineeringEvidence.tsx`, `src/styles/evidence.css`, `tests/change-guard.test.ts`, this report.

Modified: `src/App.tsx`, `src/main.tsx`, `src/pages/Home.tsx`, `src/pages/NexyralCase.tsx`, `tests/portfolio.spec.ts`, `tsconfig.json`, `package.json`, README and the generated social-preview asset.

## Remaining evidence

Real user feedback, independently audited credentials/security and physical-device performance remain unmeasured. A subjective 90+ assessment cannot be guaranteed by interface work or automated tests. Publication and real public interaction checks are recorded after deployment below.
