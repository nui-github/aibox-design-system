# aibox-design-system

Figma tokens -> `dist/tokens.css`, hand-written `src/ng-zorro-override.css` -> `dist/ng-zorro-override.css`, served by jsDelivr from git tags. `site/` is the Angular docs site (Vercel). See README.md.

## Adding or changing a component override (the usual task)
One PR does all of this:
1. Read the Figma node, edit `src/ng-zorro-override.css` (only `var(--aibox-*)`, header comment with Figma node, mapping and "Not covered").
2. Update the docs site so it never lags behind:
   - new component: copy an existing page in `site/src/app/pages/`, add its route (`site/src/app/app.routes.ts`), menu entry (`site/src/app/nav.ts`) and section marker (`starts` in `site/scripts/gen-data.mjs`; use `requires` if it builds on another section);
   - new variant or class: add a demo (with snippet) to the existing page, and add any new `aibox-*` class to the table in `site/src/app/pages/getting-started.ts`.
3. Bump `package.json` version, add `release-notes/vX.Y.Z.md`, run `npm test` (rebuilds and commits `dist/`), and build the site (`cd site && npm ci && npm run build`, Node >= 22.22.3).
4. Open the PR. Merge only when the user says so and CI (`build` + `site`) is green; merging creates the tag and release automatically.

`npm test` fails if an override section ("Source: Figma" header) has no registered site page, route or menu entry.

## Two places work on this repo
- Cloud sessions: Figma -> override -> release, plus the minimal `site/` additions above (new page files, new demos).
- The user's own computer (Claude Code in `~/Desktop/aibox-design-system`): look and feel of `site/` (layout, styles, copy).
Everything moves through GitHub PRs. Run `git fetch` / `git pull` on `main` before starting, never edit the same files in both places at once, and push before stopping (a cloud container can expire).

## Verification notes
- Override was developed and tested against ng-zorro-antd 18.2.x (the Ai-BOX version); the site renders with the latest version and the same checks pass there. Say which version a claim was checked on.
- jsDelivr, Figma's asset host and Google Fonts are not reachable from the cloud sandbox; real fonts and CDN links must be checked by the user.
