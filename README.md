# aibox-design-system

Design tokens (from Figma) and ng-zorro-antd CSS overrides for Ai-BOX, served from jsDelivr.

## Use in a project
Load **after** ng-zorro-antd's own styles, and pin an exact version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.2.0/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.2.0/dist/ng-zorro-override.css">
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

Token values come from the Figma file `ChGoJaECyMvpm61vRILhJE` ("i-BOX Design System").

## Updating tokens from Figma (Professional plan, no Variables REST API)
1. In Figma, export tokens with the "Design Tokens" plugin (Lukas Oppermann) -> `design-tokens.tokens.json`.
2. Convert and split into `tokens/`:
   ```
   python3 -I scripts/figma-export-to-dtcg.py design-tokens.tokens.json /tmp/aibox-design-tokens.json
   ```
   then split the top-level keys into `tokens/<key>.json` (see the existing files). `tokens/component.json` is hand-written (values not stored as Figma variables).
3. `npm test`, commit with `dist/`, open a PR.

The converter drops the per-property `typography.*` duplicates and remaps aliases that point at the missing `i-box paltform` collection onto `color.global.*` (fix the collection name in Figma).
