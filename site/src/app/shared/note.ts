import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A boxed aside with a label, for extra remarks that sit apart from the page text (for example ng-zorro 18 / 19 differences). */
@Component({
  selector: 'app-note',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <strong class="label">{{ label() }}</strong>
    <div class="body"><ng-content /></div>
  `,
  styles: `
    :host {
      display: block;
      flex: 1 1 100%;
      max-width: 760px;
      padding: var(--aibox-spacing-3) var(--aibox-spacing-4);
      background: var(--aibox-color-bg-primary);
      border: 1px solid var(--aibox-color-border-primary);
      border-left: 4px solid var(--aibox-color-bg-main);
      border-radius: var(--aibox-radius-2);
    }
    .label { display: block; margin-bottom: var(--aibox-spacing-1); color: var(--aibox-color-text-main); }
    .body { color: var(--aibox-color-text-primary); }
  `,
})
export class Note {
  readonly label = input('หมายเหตุเพิ่มเติม');
}
