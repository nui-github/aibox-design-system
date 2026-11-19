import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { COMPONENTS } from '../nav';

interface Hit {
  group: 'page' | 'class' | 'token';
  label: string;
  hint: string;
  path: string;
  fragment?: string;
  queryParams?: Record<string, string>;
  /** Lower comes first. */
  rank: number;
}

interface Entry {
  label: string;
  path: string;
  fragment?: string;
  keywords: string;
}

const OVERVIEW: Entry[] = [
  { label: 'Getting started', path: '/getting-started', keywords: 'ติดตั้ง install cdn jsdelivr เวอร์ชัน version รองรับ' },
  { label: 'Tokens', path: '/tokens', keywords: 'token สี color spacing radius border shadow blur typography ฟอนต์' },
  { label: 'Changelog', path: '/changelog', keywords: 'release notes เวอร์ชัน ประวัติ' },
];

/** Words people may type for a component that its title does not contain. */
const KEYWORDS: Record<string, string> = {
  button: 'ปุ่ม link',
  input: 'ช่องกรอก textfield number textarea password search label assistive',
  'checkbox-radio': 'ตัวเลือก เช็คบ็อกซ์',
  select: 'dropdown multiple naming ตัวเลือก',
  switch: 'toggle สวิตช์',
  tag: 'chip filter naming avatar closable status label',
  pagination: 'หน้า pager',
  tab: 'tabs แท็บ',
  tooltip: 'popover คำอธิบาย',
  breadcrumb: 'เส้นทาง',
  divider: 'เส้นคั่น line',
  alert: 'banner แจ้งเตือน',
  message: 'snackbar toast',
  modal: 'dialog popup',
  empty: 'ไม่มีข้อมูล no data',
  dropdown: 'menu popover submenu',
  scrollbar: 'เลื่อน scroll',
  drawer: 'panel side sheet',
  table: 'ตาราง grid',
  upload: 'ไฟล์ file drag',
  'date-picker': 'ปฏิทิน calendar วันที่',
  'time-picker': 'เวลา time',
  tree: 'ต้นไม้ checkable',
  cascader: 'เลือกซ้อน',
  card: 'การ์ด',
  menu: 'เมนู navigation sider',
  badge: 'notification count จุด dot',
};

const PAGES: Entry[] = [
  ...OVERVIEW,
  ...COMPONENTS.map((c) => ({ label: c.title, path: '/' + c.path, keywords: KEYWORDS[c.path] ?? '' })),
  { label: 'Chip / filter', path: '/tag', fragment: 'chip', keywords: 'tag filter selected' },
];

/** Compare without case, spaces, dashes or punctuation: "datepicker", "date-picker" and "Date picker" all match. */
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9฀-๿]/g, '');

/**
 * Header search: finds pages (by title and common words) and the aibox-* classes of each override section,
 * and hands anything else over to the Tokens page search. Press / or Ctrl/⌘ + K to focus it.
 */
@Component({
  selector: 'app-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzInputModule],
  host: { '(document:keydown)': 'onGlobalKey($event)' },
  template: `
    <nz-input-wrapper class="box">
      <span nzInputPrefix nz-icon nzType="search" aria-hidden="true"></span>
      <input
        #field
        nz-input
        type="text"
        role="combobox"
        aria-label="Search"
        aria-autocomplete="list"
        aria-controls="search-list"
        autocomplete="off"
        spellcheck="false"
        placeholder="Search"
        [attr.aria-expanded]="showPanel()"
        [attr.aria-activedescendant]="showPanel() ? 'search-hit-' + active() : null"
        [value]="q()"
        (input)="onInput($any($event.target).value)"
        (focus)="onFocus()"
        (blur)="open.set(false)"
        (keydown)="onKey($event)"
      />
      @if (!q() && !focused()) {
        <kbd nzInputSuffix class="key" aria-hidden="true">/</kbd>
      }
    </nz-input-wrapper>
    @if (showPanel()) {
      <div class="panel" id="search-list" role="listbox">
        @for (h of hits(); track h.group + h.path + h.label + (h.fragment ?? ''); let i = $index) {
          @if (i === 0 || hits()[i - 1].group !== h.group) {
            <div class="group">{{ groupTitle(h.group) }}</div>
          }
          <button
            type="button"
            role="option"
            class="hit"
            [class.active]="i === active()"
            [id]="'search-hit-' + i"
            [attr.aria-selected]="i === active()"
            (mousedown)="$event.preventDefault()"
            (mouseenter)="active.set(i)"
            (click)="go(h)"
          >
            <span class="label">@for (s of segments(h.label); track $index) {<span [class.m]="s.hit">{{ s.text }}</span>}</span>
            <span class="hint">{{ h.hint }}</span>
          </button>
        }
        @if (!hasPageOrClass()) {
          <p class="none">ไม่พบหน้าหรือ class ที่ตรงกับ "{{ q().trim() }}"</p>
        }
      </div>
    }
  `,
  styles: `
    :host { position: relative; display: block; }
    .box { width: 100%; }
    .key {
      font-family: var(--doc-mono); font-size: 12px; line-height: 20px; min-width: 22px; text-align: center;
      padding: 0 var(--aibox-spacing-1); color: var(--aibox-color-text-secondary);
      border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-secondary);
    }
    .panel {
      position: absolute; top: calc(100% + 4px); left: 0; z-index: 50; width: max(100%, 380px); max-width: calc(100vw - 2 * var(--aibox-spacing-4));
      max-height: min(70vh, 520px); overflow: auto; padding: var(--aibox-spacing-1);
      background: var(--aibox-color-bg-primary); border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2);
      box-shadow: var(--aibox-shadow-base-raise-modal);
      scrollbar-width: thin;
    }
    .group { padding: var(--aibox-spacing-2) var(--aibox-spacing-3) var(--aibox-spacing-1); font-size: 12px; color: var(--aibox-color-text-secondary); }
    .hit {
      display: flex; align-items: center; justify-content: space-between; gap: var(--aibox-spacing-3); width: 100%;
      padding: var(--aibox-spacing-2) var(--aibox-spacing-3); border: 0; border-radius: var(--aibox-radius-2);
      background: transparent; color: var(--aibox-color-text-primary); font: inherit; text-align: left; cursor: pointer;
    }
    .hit.active { background: var(--aibox-color-bg-tertiary); }
    .label { min-width: 0; overflow-wrap: anywhere; }
    .hint { flex: none; font-size: 12px; color: var(--aibox-color-text-secondary); }
    .m { color: var(--aibox-color-text-main); font-weight: 600; }
    .none { margin: 0; padding: var(--aibox-spacing-2) var(--aibox-spacing-3); color: var(--aibox-color-text-secondary); }
    @media (max-width: 900px) {
      .key { display: none; }
      /* On a phone the results use the full width under the header instead of hanging off the small search box. */
      .panel { position: fixed; top: 60px; left: var(--aibox-spacing-4); right: var(--aibox-spacing-4); width: auto; max-width: none; }
    }
  `,
})
export class SearchBox {
  private readonly router = inject(Router);
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  protected readonly q = signal('');
  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly active = signal(0);
  /** aibox-* classes per override section; loaded on first focus so the CSS data stays out of the first download. */
  private readonly classes = signal<Entry[]>([]);
  private loading = false;
  private swallowSlash = false;

  protected readonly hits = computed<Hit[]>(() => {
    const query = norm(this.q());
    if (!query) return [];
    const pages: Hit[] = [];
    for (const p of PAGES) {
      const title = norm(p.label);
      const rank = title === query ? 0 : title.startsWith(query) ? 1 : title.includes(query) ? 2 : norm(p.keywords).includes(query) ? 3 : -1;
      if (rank >= 0) pages.push({ group: 'page', label: p.label, hint: p.path === '/tag' && p.fragment ? 'Tag' : OVERVIEW.includes(p) ? 'Overview' : 'Component', path: p.path, fragment: p.fragment, rank });
    }
    const classes: Hit[] = this.classes()
      .filter((c) => norm(c.label).includes(query))
      .slice(0, 8)
      .map((c) => ({ group: 'class', label: c.label, hint: c.keywords, path: c.path, fragment: c.fragment, rank: 4 }));
    const tokens: Hit = { group: 'token', label: `ค้นหา "${this.q().trim()}" ใน Tokens`, hint: 'Tokens', path: '/tokens', queryParams: { q: this.q().trim() }, rank: 9 };
    return [...pages.sort((a, b) => a.rank - b.rank).slice(0, 8), ...classes, tokens];
  });
  protected readonly showPanel = computed(() => this.open() && this.q().trim().length > 0);
  protected readonly hasPageOrClass = computed(() => this.hits().some((h) => h.group !== 'token'));

  protected groupTitle(g: Hit['group']): string {
    return g === 'page' ? 'หน้า' : g === 'class' ? 'Class' : 'Tokens';
  }

  /** Splits a label around the typed text so the match can be bold. */
  protected segments(label: string): { text: string; hit: boolean }[] {
    const needle = this.q().trim().toLowerCase();
    const at = needle ? label.toLowerCase().indexOf(needle) : -1;
    if (at < 0) return [{ text: label, hit: false }];
    return [
      { text: label.slice(0, at), hit: false },
      { text: label.slice(at, at + needle.length), hit: true },
      { text: label.slice(at + needle.length), hit: false },
    ].filter((s) => s.text);
  }

  protected onFocus() {
    this.focused.set(true);
    this.open.set(true);
    void this.loadClasses();
  }

  protected onInput(value: string) {
    // The "/" that focused the box must not end up in it (some input paths still deliver the character).
    if (this.swallowSlash && value.endsWith('/')) {
      value = value.slice(0, -1);
      this.field().nativeElement.value = value;
    }
    this.q.set(value);
    this.active.set(0);
    this.open.set(true);
  }

  protected onKey(e: KeyboardEvent) {
    const n = this.hits().length;
    if (e.key === 'ArrowDown' && n) {
      e.preventDefault();
      this.open.set(true);
      this.active.update((i) => (i + 1) % n);
    } else if (e.key === 'ArrowUp' && n) {
      e.preventDefault();
      this.active.update((i) => (i - 1 + n) % n);
    } else if (e.key === 'Enter' && this.showPanel()) {
      e.preventDefault();
      const h = this.hits()[this.active()];
      if (h) this.go(h);
    } else if (e.key === 'Escape') {
      if (this.q()) this.q.set('');
      else this.field().nativeElement.blur();
    }
  }

  protected onGlobalKey(e: KeyboardEvent) {
    const t = e.target as HTMLElement | null;
    const typing = !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
    if ((e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      if (e.key === '/') {
        this.swallowSlash = true;
        setTimeout(() => (this.swallowSlash = false), 100);
      }
      const el = this.field().nativeElement;
      el.focus();
      el.select();
    }
  }

  protected go(h: Hit) {
    this.q.set('');
    this.open.set(false);
    this.field().nativeElement.blur();
    void this.router.navigate([h.path], { fragment: h.fragment, queryParams: h.queryParams });
  }

  private async loadClasses() {
    if (this.loading) return;
    this.loading = true;
    try {
      const { CSS_SECTIONS } = await import('../../generated/data');
      const title = (id: string) => PAGES.find((p) => p.path === '/' + id)?.label ?? id;
      const seen = new Set<string>();
      const out: Entry[] = [];
      for (const [id, s] of Object.entries(CSS_SECTIONS)) {
        for (const m of s.css.matchAll(/\.(aibox-[a-z0-9-]+)/g)) {
          if (seen.has(m[1])) continue;
          seen.add(m[1]);
          // The Chip rules live on the Tag page (#chip).
          out.push(id === 'chip-filter' ? { label: m[1], path: '/tag', fragment: 'chip', keywords: 'Tag' } : { label: m[1], path: '/' + id, keywords: title(id) });
        }
      }
      this.classes.set(out);
    } catch {
      this.loading = false;
    }
  }
}
