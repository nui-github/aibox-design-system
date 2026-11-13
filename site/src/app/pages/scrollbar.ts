import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

@Component({
  selector: 'app-scrollbar-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Scrollbar">
      <ng-container sub>Figma nodes <code>6903:54</code> (vertical), <code>7024:6514</code> (horizontal, หน้า Scrollbar) · ไม่ใช่ component ของ ng-zorro: ใส่คลาส <code>aibox-scrollbar</code> ที่ element ที่เลื่อนได้</ng-container>
    </app-page-head>

    <app-demo title="Vertical and horizontal" description="ราง 4px (bg/secondary) กับแถบเลื่อน (text/tertiary) มุม 4px · เลื่อนในกล่องเพื่อดู (Firefox ตั้งความกว้างไม่ได้ จึงได้แบบ thin สีเดียวกัน)" [code]="html">
      <div class="row">
        <div class="aibox-scrollbar box">
          @for (n of rows; track n) { <p>Row {{ n }}</p> }
        </div>
        <div class="aibox-scrollbar box wide">
          <p class="long">Conveniently initiate viral synergy without multi functional platforms. Conveniently initiate viral synergy without multi functional platforms.</p>
        </div>
      </div>
    </app-demo>

    <app-css-panel id="scrollbar" />
  `,
  styles: `
    .row { display: flex; gap: var(--aibox-spacing-8); flex-wrap: wrap; }
    .box { width: 240px; height: 160px; overflow: auto; padding: var(--aibox-spacing-2); background: var(--aibox-color-bg-primary); border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); }
    .box p { margin: 0 0 var(--aibox-spacing-2); }
    .wide { height: 60px; overflow-y: hidden; }
    .long { white-space: nowrap; }
  `,
})
export class ScrollbarPage {
  protected readonly rows = Array.from({ length: 20 }, (_, i) => i + 1);
  protected readonly html = `<div class="aibox-scrollbar" style="height: 160px; overflow: auto">
  ...content taller than the box...
</div>`;
}
