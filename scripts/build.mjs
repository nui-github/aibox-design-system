import StyleDictionary from 'style-dictionary';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';

const PREFIX = 'aibox';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: 'dist/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true, selector: ':root' },
      }],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{ destination: 'tokens.json', format: 'json/nested' }],
    },
  },
});

await sd.buildAllPlatforms();

// CSS `font` shorthand cannot carry letter-spacing, so also emit each typography
// style's properties as separate variables: --aibox-typography-<path>-<property>.
const kebab = (k) => k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const typoLines = [];
const tokenFiles = await readdir('tokens');
for (const f of tokenFiles.filter((f) => f.endsWith('.json')).sort()) {
  const walk = (node, path) => {
    if (node && node.$type === 'typography' && typeof node.$value === 'object') {
      for (const [prop, val] of Object.entries(node.$value)) {
        typoLines.push(`  --${PREFIX}-${path.join('-')}-${kebab(prop)}: ${val};`);
      }
      return;
    }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) if (!k.startsWith('$')) walk(v, [...path, k]);
    }
  };
  walk(JSON.parse(await readFile(`tokens/${f}`, 'utf8')), []);
}
const css = await readFile('dist/tokens.css', 'utf8');
await writeFile('dist/tokens.css', `${css}\n/* typography properties */\n:root {\n${typoLines.join('\n')}\n}\n`);

// ng-zorro override is hand-written; copy it into dist with a version banner.
const { version } = JSON.parse(await readFile('package.json', 'utf8'));
const override = await readFile('src/ng-zorro-override.css', 'utf8');
await mkdir('dist', { recursive: true });
await writeFile('dist/ng-zorro-override.css', `/* aibox-design-system v${version} - requires tokens.css; load after ng-zorro-antd styles */\n${override}`);
console.log('built dist/');
