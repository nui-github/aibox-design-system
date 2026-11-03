# Docs site

Documentation and live previews for the Ai-BOX design system, written in Angular + ng-zorro-antd and styled with the design system itself.

- Every component page renders real ng-zorro-antd components with `dist/ng-zorro-override.css` applied, shows the Angular snippet per demo, and the component's own slice of the override CSS + the tokens it uses (each copyable).
- `scripts/gen-data.mjs` (runs before `start` / `build`) reads `../dist/*.css` and `../src` output, so the site always shows the committed `dist/`. Run `npm test` in the repo root first if you changed tokens or the override.

## Run

```
cd site
npm ci
npm start        # http://localhost:4200
npm run build    # -> dist/site/browser
```

Needs Node >= 22.22.3 (Angular 22); Vercel uses 24.x from `engines`.

## Deploy to Vercel

Import the GitHub repo and set **Root Directory = `site`** (keep "Include source files outside of the Root Directory" on, the build reads `../dist`). `vercel.json` sets the build command, output directory and the SPA rewrite. Framework preset: Angular.

## Add a component page

1. Add the section's start marker in `scripts/gen-data.mjs` (`starts`) and, if it builds on another section, `requires`.
2. Add `src/app/pages/<name>.ts` (copy an existing page), a route in `src/app/app.routes.ts` and an entry in `src/app/nav.ts`.
