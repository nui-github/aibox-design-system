import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import { copyText } from './copy';

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);

@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzIconModule],
  template: `
    <div class="cb">
      <div class="cb-bar">
        <span class="cb-label">{{ label() }}</span>
        <button nz-button nzType="text" nzSize="small" class="aibox-btn-xs" type="button" (click)="copy()">
          <span nz-icon [nzType]="copied() ? 'check' : 'copy'"></span>
          {{ copied() ? 'Copied' : 'Copy' }}
        </button>
      </div>
      <pre [style.max-height]="maxHeight()"><code class="hljs" [innerHTML]="html()"></code></pre>
    </div>
  `,
  styles: `
    .cb { border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-primary); overflow: hidden; }
    .cb-bar { display: flex; align-items: center; justify-content: space-between; padding: var(--aibox-spacing-1) var(--aibox-spacing-2) var(--aibox-spacing-1) var(--aibox-spacing-3); background: var(--aibox-color-bg-secondary); border-bottom: 1px solid var(--aibox-color-border-primary); }
    .cb-label { font-size: var(--aibox-font-size-additional-xs); color: var(--aibox-color-text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }
    pre { margin: 0; padding: var(--aibox-spacing-3); overflow: auto; font-family: var(--doc-mono); font-size: 13px; line-height: 20px; tab-size: 2; }
    :host ::ng-deep .hljs-tag, :host ::ng-deep .hljs-selector-tag, :host ::ng-deep .hljs-keyword { color: var(--aibox-color-text-status-info-100); }
    :host ::ng-deep .hljs-name, :host ::ng-deep .hljs-selector-class, :host ::ng-deep .hljs-selector-id, :host ::ng-deep .hljs-title { color: var(--aibox-color-text-status-rework-100); }
    :host ::ng-deep .hljs-attr, :host ::ng-deep .hljs-attribute, :host ::ng-deep .hljs-property { color: var(--aibox-color-text-status-success-100); }
    :host ::ng-deep .hljs-string, :host ::ng-deep .hljs-number, :host ::ng-deep .hljs-built_in { color: var(--aibox-color-text-status-reject-100); }
    :host ::ng-deep .hljs-comment { color: var(--aibox-color-text-tertiary); font-style: italic; }
    :host ::ng-deep .hljs-variable, :host ::ng-deep .hljs-selector-pseudo { color: var(--aibox-color-text-status-error-100); }
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly lang = input<'xml' | 'css' | 'typescript'>('xml');
  readonly label = input('');
  readonly maxHeight = input('420px');
  protected readonly copied = signal(false);
  protected readonly html = computed(() => hljs.highlight(this.code(), { language: this.lang() }).value);

  protected async copy() {
    if (await copyText(this.code())) {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    }
  }
}
