import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CSS_SECTIONS } from '../../generated/data';
import { CodeBlock } from './code-block';
import { relevantCss } from './css-rules';

/** A live preview with an expandable Angular snippet (copyable). */
@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzIconModule, CodeBlock],
  template: `
    <section class="demo">
      <header class="demo-head">
        <div>
          <h3>{{ title() }}</h3>
          @if (description()) {
            <p>{{ description() }}</p>
          }
        </div>
        <button nz-button nzType="text" type="button" (click)="toggle()" [attr.aria-expanded]="open()">
          <span nz-icon nzType="code"></span>
          {{ open() ? 'Hide code' : 'Show code' }}
        </button>
      </header>
      <div #stage class="demo-stage" [style.background]="stageBg()">
        <ng-content />
      </div>
      @if (open()) {
        <div class="demo-code">
          <app-code-block [code]="code()" lang="xml" label="Angular template" />
          @if (ts()) {
            <app-code-block [code]="ts()" lang="typescript" label="Component" />
          }
          @if (css()) {
            <app-code-block [code]="css()" lang="css" label="Relevant CSS · ng-zorro-override.css" maxHeight="320px" />
          }
          @if (hasSection) {
            <p class="demo-note">
              {{ css() ? 'แสดงเฉพาะกฎที่ตรงกับ demo นี้ · ' : '' }}CSS ทั้งหมดของ component และ tokens ที่ใช้อยู่ท้ายหน้า
              <button nz-button nzType="link" class="aibox-btn-xs" type="button" (click)="toCss()">ไปที่ CSS ทั้งหมด ↓</button>
            </p>
          }
        </div>
      }
    </section>
  `,
  styles: `
    .demo { background: var(--aibox-color-bg-primary); border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); margin-bottom: var(--aibox-spacing-4); overflow: hidden; }
    .demo-head { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--aibox-spacing-3); padding: var(--aibox-spacing-3) var(--aibox-spacing-4); border-bottom: 1px solid var(--aibox-color-border-primary); }
    .demo-head p { color: var(--aibox-color-text-secondary); margin-top: var(--aibox-spacing-1); }
    .demo-stage { padding: var(--aibox-spacing-5) var(--aibox-spacing-4); display: flex; flex-wrap: wrap; align-items: center; gap: var(--aibox-spacing-3); }
    .demo-note { margin: 0; color: var(--aibox-color-text-secondary); display: flex; align-items: center; flex-wrap: wrap; gap: var(--aibox-spacing-2); }
    .demo-code { display: grid; gap: var(--aibox-spacing-3); padding: var(--aibox-spacing-3) var(--aibox-spacing-4) var(--aibox-spacing-4); border-top: 1px solid var(--aibox-color-border-primary); background: var(--aibox-color-bg-secondary); }
  `,
})
export class Demo {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly code = input.required<string>();
  readonly ts = input('');
  readonly stageBg = input('');
  protected readonly open = signal(false);
  protected readonly css = signal('');
  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  /** Route path doubles as the CSS section id (same as the page's app-css-panel). */
  private readonly sectionId = inject(ActivatedRoute).snapshot.routeConfig?.path ?? '';
  protected readonly hasSection = this.sectionId in CSS_SECTIONS;

  protected toggle() {
    const next = !this.open();
    // Match against the live preview each time it opens, so the CSS follows what is actually rendered.
    if (next && this.hasSection) this.css.set(relevantCss(CSS_SECTIONS[this.sectionId].css, this.stage().nativeElement));
    this.open.set(next);
  }

  protected toCss() {
    document.getElementById('override-css')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
