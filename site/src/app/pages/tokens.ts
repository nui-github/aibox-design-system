import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TOKENS } from '../../generated/data';
import { copyText } from '../shared/copy';
import { PageHead } from '../shared/page-head';

interface Group {
  id: string;
  title: string;
  test: (n: string) => boolean;
  colour?: boolean;
}

const GROUPS: Group[] = [
  { id: 'semantic', title: 'Colour', colour: true, test: (n) => n.startsWith('--aibox-color-') && !n.startsWith('--aibox-color-global-') },
  { id: 'global', title: 'Colour palette', colour: true, test: (n) => n.startsWith('--aibox-color-global-') },
  { id: 'spacing', title: 'Spacing', test: (n) => n.startsWith('--aibox-spacing-') },
  { id: 'radius', title: 'Radius', test: (n) => n.startsWith('--aibox-radius-') },
  { id: 'border', title: 'Border', test: (n) => n.startsWith('--aibox-border-') },
  { id: 'shadow', title: 'Shadow', test: (n) => n.startsWith('--aibox-shadow-') },
  { id: 'type', title: 'Typography', test: (n) => n.startsWith('--aibox-typography-') || n.startsWith('--aibox-font-') },
  { id: 'other', title: 'Other', test: () => true },
];

@Component({
  selector: 'app-tokens-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzInputModule, NzTabsModule, NzIconModule, PageHead],
  template: `
    <app-page-head title="Tokens">
      <ng-container sub>ตัวแปร CSS <code>--aibox-*</code> ทั้งหมดใน <code>tokens.css</code> ({{ total }} ตัว) คลิกแถวเพื่อคัดลอก <code>var(--aibox-…)</code></ng-container>
    </app-page-head>

    <input nz-input class="search" placeholder="Search token name or value" [ngModel]="q()" (ngModelChange)="q.set($event)" />

    <nz-tabs>
      @for (g of groups(); track g.id) {
        <nz-tab [nzTitle]="g.title + ' (' + g.items.length + ')'">
          <ng-template nz-tab>
            <div class="list">
              @for (t of g.items; track t.name) {
                <button class="row" type="button" (click)="copy(t.name)" [title]="t.description">
                  @if (g.colour) {
                    <span class="sw" [style.background]="'var(' + t.name + ')'"></span>
                  }
                  <span class="name">{{ t.name }}</span>
                  <span class="val">{{ resolve(t.name) || t.value }}</span>
                  <span class="cp">{{ copied() === t.name ? 'Copied' : '' }}</span>
                </button>
              } @empty {
                <p class="empty">No tokens match.</p>
              }
            </div>
          </ng-template>
        </nz-tab>
      }
    </nz-tabs>
  `,
  styles: `
    .search { max-width: 360px; margin-bottom: var(--aibox-spacing-3); }
    .list { background: var(--aibox-color-bg-primary); border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); }
    .row { display: flex; align-items: center; gap: var(--aibox-spacing-3); width: 100%; padding: var(--aibox-spacing-2) var(--aibox-spacing-3); border: 0; border-bottom: 1px solid var(--aibox-color-border-primary); background: none; text-align: left; cursor: pointer; font: inherit; color: inherit; }
    .row:last-child { border-bottom: 0; }
    .row:hover { background: var(--aibox-color-bg-tertiary); }
    .sw { flex: none; width: 24px; height: 24px; border-radius: var(--aibox-radius-2); box-shadow: inset 0 0 0 1px var(--aibox-color-border-primary); }
    .name { font-family: var(--doc-mono); font-size: 13px; flex: 1; min-width: 0; overflow-wrap: anywhere; }
    .val { font-family: var(--doc-mono); font-size: 13px; color: var(--aibox-color-text-secondary); text-align: right; max-width: 40%; overflow-wrap: anywhere; }
    .cp { width: 52px; color: var(--aibox-color-text-main); font-size: var(--aibox-font-size-additional-xs); }
    .empty { padding: var(--aibox-spacing-4); color: var(--aibox-color-text-secondary); }
  `,
})
export class Tokens {
  protected readonly total = TOKENS.length;
  protected readonly q = signal('');
  protected readonly copied = signal('');
  private readonly cache = new Map<string, string>();

  protected readonly groups = computed(() => {
    const q = this.q().trim().toLowerCase();
    const filtered = q ? TOKENS.filter((t) => t.name.includes(q) || t.value.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) : TOKENS;
    const left = new Set(filtered.map((t) => t.name));
    return GROUPS.map((g) => {
      const items = filtered.filter((t) => left.has(t.name) && g.test(t.name));
      items.forEach((t) => left.delete(t.name));
      return { ...g, items };
    }).filter((g) => g.items.length || !q);
  });

  protected resolve(name: string): string {
    let v = this.cache.get(name);
    if (v === undefined) {
      v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      this.cache.set(name, v);
    }
    return v;
  }

  protected async copy(name: string) {
    if (await copyText(`var(${name})`)) {
      this.copied.set(name);
      setTimeout(() => this.copied() === name && this.copied.set(''), 1400);
    }
  }
}
