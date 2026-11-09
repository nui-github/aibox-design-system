// Turns release-notes/vX.Y.Z.md into the data behind the Changelog page.
// Format: first line "# vX.Y.Z – Title", optional "วันที่: YYYY-MM-DD" line, then "## Section" headings with bullets, tables, code fences and paragraphs.
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inline markdown: `code`, **bold**, [text](url). Everything else is escaped text. */
function inline(text) {
  return text
    .split(/(`[^`]*`)/)
    .map((part) =>
      part.startsWith('`') && part.endsWith('`') && part.length > 1
        ? `<code>${esc(part.slice(1, -1))}</code>`
        : esc(part)
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" rel="noopener">$1</a>'),
    )
    .join('');
}

const cells = (line) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

/** Block markdown for one section body. */
function blocks(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
    } else if (line.startsWith('```')) {
      const body = [];
      for (i++; i < lines.length && !lines[i].startsWith('```'); i++) body.push(lines[i]);
      i++;
      out.push(`<pre><code>${esc(body.join('\n'))}</code></pre>`);
    } else if (line.trim().startsWith('|')) {
      const rows = [];
      for (; i < lines.length && lines[i].trim().startsWith('|'); i++) rows.push(lines[i]);
      const [head, , ...body] = rows;
      out.push(
        `<div class="table-wrap"><table><thead><tr>${cells(head).map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` +
          `<tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
      );
    } else if (/^\s*[-*] /.test(line)) {
      const items = [];
      for (; i < lines.length && lines[i].trim(); i++) {
        const m = /^(\s*)[-*] (.*)$/.exec(lines[i]);
        if (m) items.push({ depth: Math.floor(m[1].length / 2), text: m[2] });
        else if (items.length) items[items.length - 1].text += ' ' + lines[i].trim();
        else break;
      }
      out.push(list(items));
    } else {
      const para = [];
      for (; i < lines.length && lines[i].trim() && !/^(\s*[-*] |```|\|)/.test(lines[i]); i++) para.push(lines[i].trim());
      out.push(`<p>${inline(para.join(' '))}</p>`);
    }
  }
  return out.join('\n');
}

/** Nested <ul> from a flat list of {depth, text}. */
function list(items) {
  let html = '';
  let depth = -1;
  for (const item of items) {
    const d = Math.min(item.depth, depth + 1);
    if (depth < 0 || d > depth) {
      html += '<ul>';
      depth++;
    } else {
      for (; depth > d; depth--) html += '</li></ul>';
      html += '</li>';
    }
    html += `<li>${inline(item.text)}`;
  }
  for (; depth >= 0; depth--) html += '</li></ul>';
  return html;
}

/** What a section is about, so the page can colour it. */
function kindOf(title) {
  if (title.startsWith('เพิ่มใหม่')) return 'new';
  if (title.startsWith('แก้ไข')) return 'fix';
  if (title.startsWith('ที่ต้องรู้ก่อนอัปเกรด')) return 'upgrade';
  if (title.startsWith('ยังไม่ครอบคลุม')) return 'gap';
  return 'other';
}

/** ISO date the release note was first committed, or '' when git history is unavailable or truncated (shallow clone). */
function dateOf(root, file) {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  try {
    if (git('rev-parse', '--is-shallow-repository') !== 'false') return '';
    return git('log', '--diff-filter=A', '--format=%as', '--', `release-notes/${file}`).split('\n').pop() ?? '';
  } catch {
    return '';
  }
}

const semver = (v) => v.split('.').map(Number);
const byVersionDesc = (a, b) => {
  const [x, y] = [semver(a.version), semver(b.version)];
  return y[0] - x[0] || y[1] - x[1] || y[2] - x[2];
};

export function buildChangelog(root) {
  const dir = join(root, 'release-notes');
  const releases = [];
  for (const file of readdirSync(dir).filter((f) => /^v\d+\.\d+\.\d+\.md$/.test(f))) {
    const lines = readFileSync(join(dir, file), 'utf8').split('\n');
    const head = /^#\s+v(\d+\.\d+\.\d+)\s*[–—-]?\s*(.*)$/.exec(lines[0]);
    if (!head) throw new Error(`changelog: ${file} must start with "# vX.Y.Z – Title"`);
    const sections = [];
    const intro = [];
    let cur = null;
    let fenced = false;
    for (const line of lines.slice(1)) {
      if (line.startsWith('```')) fenced = !fenced;
      const h = !fenced && /^##\s+(.*)$/.exec(line);
      if (h) {
        cur = { title: h[1].trim(), lines: [] };
        sections.push(cur);
      } else (cur ? cur.lines : intro).push(line);
    }
    // "วันที่: YYYY-MM-DD" in the note wins; git is the fallback for notes without it.
    let date = '';
    const dateAt = intro.findIndex((l) => l.startsWith('วันที่:'));
    if (dateAt >= 0) {
      const m = /^วันที่:\s*(\d{4}-\d{2}-\d{2})\s*$/.exec(intro[dateAt]);
      if (!m || Number.isNaN(Date.parse(m[1]))) throw new Error(`changelog: ${file} date line must be "วันที่: YYYY-MM-DD"`);
      date = m[1];
      intro.splice(dateAt, 1);
    }
    releases.push({
      version: head[1],
      title: head[2].trim(),
      date: date || dateOf(root, file),
      intro: blocks(intro),
      sections: sections.map((s) => ({ title: s.title, kind: kindOf(s.title), html: blocks(s.lines) })),
    });
  }
  return releases.sort(byVersionDesc);
}
