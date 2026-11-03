import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-head',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="ph">
      <h1>{{ title() }}</h1>
      <p class="sub"><ng-content select="[sub]" /></p>
      <div class="meta"><ng-content /></div>
    </header>
  `,
  styles: `
    .ph { margin-bottom: var(--aibox-spacing-5); }
    .sub { color: var(--aibox-color-text-secondary); margin-top: var(--aibox-spacing-2); max-width: 760px; }
    .meta { margin-top: var(--aibox-spacing-3); display: flex; flex-wrap: wrap; gap: var(--aibox-spacing-2); align-items: center; }
  `,
})
export class PageHead {
  readonly title = input.required<string>();
}
