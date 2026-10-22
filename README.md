# aibox-design-system

Design tokens (from Figma) and ng-zorro-antd CSS overrides for Ai-BOX, served from jsDelivr.

## Use in a project
Load **after** ng-zorro-antd's own styles, and pin an exact version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.1.0/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.1.0/dist/ng-zorro-override.css">
```

Never use `@main` (cached ~12h, can change under you). Supports ng-zorro-antd 18.x.

## Develop
```
npm install
npm test        # build dist/ + check tokens used by override exist, no hard-coded colors
```
`tokens/*.json` (W3C DTCG) -> `dist/tokens.css` (`--aibox-*`) and `dist/tokens.json`.
`src/ng-zorro-override.css` is hand-written and must only use `var(--aibox-*)`.
**Commit `dist/`** - jsDelivr serves it straight from git.

## Release
Bump `version` in package.json, `npm test`, commit (with dist), tag `vX.Y.Z`, push the tag.
Token value change = minor/patch; rename or remove a token = major.

Token values are synced from Figma file `ChGoJaECyMvpm61vRILhJE` (textfield node 1:7052). Only tokens used by textfield exist so far; add more as components are read.
