// Fails if override CSS references a token that does not exist, or hard-codes colors.
import { readFile } from 'node:fs/promises';

const tokens = await readFile('dist/tokens.css', 'utf8');
const override = await readFile('dist/ng-zorro-override.css', 'utf8');
const defined = new Set([...tokens.matchAll(/(--aibox-[\w-]+)\s*:/g)].map(m => m[1]));
const used = new Set([...override.matchAll(/var\((--aibox-[\w-]+)/g)].map(m => m[1]));
const errors = [];
for (const v of used) if (!defined.has(v)) errors.push(`undefined token: ${v}`);
const stripped = override.replace(/\/\*[\s\S]*?\*\//g, '');
if (/#[0-9a-fA-F]{3,8}\b/.test(stripped)) errors.push('hard-coded color in ng-zorro-override.css');

// Docs site stays in step with the override: every component section ("Source: Figma" header) must be
// registered in site/scripts/gen-data.mjs and have a page + route + menu entry.
const sectionCount = (await readFile('src/ng-zorro-override.css', 'utf8')).match(/Source: Figma/g)?.length ?? 0;
const gen = await readFile('site/scripts/gen-data.mjs', 'utf8');
const ids = [...gen.matchAll(/^\s*\['([a-z-]+)', \//gm)].map(m => m[1]);
if (ids.length !== sectionCount) errors.push(`site: override has ${sectionCount} "Source: Figma" sections but site/scripts/gen-data.mjs registers ${ids.length}; add the new section to the site (see CLAUDE.md)`);
const routes = await readFile('site/src/app/app.routes.ts', 'utf8');
const nav = await readFile('site/src/app/nav.ts', 'utf8');
for (const id of ids) {
  const page = await readFile(`site/src/app/pages/${id}.ts`, 'utf8').catch(() => null);
  if (page === null) errors.push(`site: missing page site/src/app/pages/${id}.ts`);
  else if (!page.includes(`<app-css-panel id="${id}"`)) errors.push(`site: page ${id}.ts must render <app-css-panel id="${id}" />`);
  if (!routes.includes(`path: '${id}'`)) errors.push(`site: no route for "${id}" in site/src/app/app.routes.ts`);
  if (!nav.includes(`path: '${id}'`)) errors.push(`site: no menu entry for "${id}" in site/src/app/nav.ts`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`ok: ${defined.size} tokens, ${used.size} used by override`);
