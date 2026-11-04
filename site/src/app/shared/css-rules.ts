/** Picks the rules of an override CSS slice that apply to elements inside a rendered demo. */

interface Rule {
  /** Comment block directly above the rule, kept so the source reads the same. */
  comment: string;
  prelude: string;
  body: string;
}

const STATE = /::[\w-]+(\([^)]*\))?|:(hover|focus|focus-visible|focus-within|active|checked|disabled|enabled|indeterminate|placeholder-shown|read-only|visited|-moz-[\w-]+|-webkit-[\w-]+)/g;

/** Splits css into top-level rules (brace matching), remembering the comment above each one. */
function parse(css: string): Rule[] {
  const rules: Rule[] = [];
  let i = 0;
  let comment = '';
  while (i < css.length) {
    const rest = css.slice(i);
    const ws = /^\s+/.exec(rest);
    if (ws) {
      i += ws[0].length;
      continue;
    }
    if (rest.startsWith('/*')) {
      const end = css.indexOf('*/', i + 2);
      const stop = end < 0 ? css.length : end + 2;
      // A comment separated from the next rule by a blank line is a section heading, not a rule note.
      comment = css.slice(i, stop);
      i = stop;
      if (/^\s*\n\s*\n/.test(css.slice(i))) comment = '';
      continue;
    }
    const open = css.indexOf('{', i);
    if (open < 0) break;
    let depth = 1;
    let j = open + 1;
    while (j < css.length && depth) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }
    rules.push({ comment, prelude: css.slice(i, open).trim(), body: css.slice(open + 1, j - 1), });
    comment = '';
    i = j;
  }
  return rules;
}

/** Splits a selector list on top-level commas. */
function selectors(prelude: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of prelude) {
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && !depth) {
      out.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function matches(root: Element, selector: string): boolean {
  // State pseudo-classes/elements never match a static preview, so drop them and test the element itself.
  const sel = selector.replace(STATE, '').trim();
  if (!sel) return false;
  try {
    return root.matches(sel) || !!root.querySelector(sel);
  } catch {
    return false;
  }
}

function filter(rules: Rule[], root: Element): string[] {
  const out: string[] = [];
  for (const r of rules) {
    if (r.prelude.startsWith('@')) {
      const inner = filter(parse(r.body), root);
      if (inner.length) out.push(`${r.comment}${r.comment ? '\n' : ''}${r.prelude} {\n${inner.join('\n').replace(/^/gm, '  ')}\n}`);
    } else if (selectors(r.prelude).some((s) => matches(root, s))) {
      out.push(`${r.comment}${r.comment ? '\n' : ''}${r.prelude} {${r.body}}`);
    }
  }
  return out;
}

/** The rules of `css` that match something inside `root`, in source order. Empty string when none do. */
export function relevantCss(css: string, root: Element): string {
  const out = filter(parse(css), root);
  return out.length ? out.join('\n\n') + '\n' : '';
}
