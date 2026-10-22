import StyleDictionary from 'style-dictionary';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

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

// ng-zorro override is hand-written; copy it into dist with a version banner.
const { version } = JSON.parse(await readFile('package.json', 'utf8'));
const override = await readFile('src/ng-zorro-override.css', 'utf8');
await mkdir('dist', { recursive: true });
await writeFile('dist/ng-zorro-override.css', `/* aibox-design-system v${version} - requires tokens.css; load after ng-zorro-antd styles */\n${override}`);
console.log('built dist/');
