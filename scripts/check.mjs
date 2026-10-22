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
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`ok: ${defined.size} tokens, ${used.size} used by override`);
