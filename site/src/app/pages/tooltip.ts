import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({ imports: [NzButtonModule, NzTooltipModule], /* ... */ })`;

@Component({
  selector: 'app-tooltip-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzTooltipModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Tooltip">
      <ng-container sub>Figma nodes <code>1145:1157</code> (tooltip, ทุก placement), <code>1145:1219</code> (tooltip-themed) · <code>nz-tooltip</code> พื้นเข้ม / ขาว / ฟ้า และขนาดเล็ก</ng-container>
    </app-page-head>

    <app-demo title="Default" description="วางเมาส์บนปุ่ม · ข้อความยาวจะตัดบรรทัดเอง" [code]="basic" [ts]="imports">
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips">Hover me</button>
      <button nz-button nz-tooltip nzTooltipTitle="Distinctively monetize cost effective networks for cross-media bandwidth" nzTooltipPlacement="right">Long text</button>
    </app-demo>

    <app-demo title="Themes and sizes" description="nzTooltipOverlayClassName: aibox-tooltip-light · aibox-tooltip-blue · aibox-tooltip-sm (padding 14) · aibox-tooltip-xs (12px)" [code]="themes" [ts]="imports">
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips">Dark</button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-light">Light</button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-blue">Blue</button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-sm">Small</button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-xs">X-small</button>
      <button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-blue aibox-tooltip-xs">Blue x-small</button>
    </app-demo>

    <app-demo title="Placement" description="ลูกศรห่างจากมุม 16px ตาม Figma" [code]="placements" [ts]="imports">
      <div class="grid">
        @for (p of places; track p) {
          <button nz-button nz-tooltip nzTooltipTitle="Tooltips" [nzTooltipPlacement]="p">{{ p }}</button>
        }
      </div>
    </app-demo>

    <app-css-panel id="tooltip" />
  `,
  styles: `.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--aibox-spacing-3); width: 100%; }`,
})
export class TooltipPage {
  protected readonly imports = IMPORTS;
  protected readonly places = ['topLeft', 'top', 'topRight', 'leftTop', 'left', 'leftBottom', 'rightTop', 'right', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight'];
  protected readonly basic = `<button nz-button nz-tooltip nzTooltipTitle="Tooltips">Hover me</button>
<button nz-button nz-tooltip nzTooltipTitle="Long text ..." nzTooltipPlacement="right">Long text</button>`;
  protected readonly themes = `<button nz-button nz-tooltip nzTooltipTitle="Tooltips">Dark</button>
<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-light">Light</button>
<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-blue">Blue</button>
<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-sm">Small</button>
<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-xs">X-small</button>
<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipOverlayClassName="aibox-tooltip-blue aibox-tooltip-xs">Blue x-small</button>`;
  protected readonly placements = `<button nz-button nz-tooltip nzTooltipTitle="Tooltips" nzTooltipPlacement="leftBottom">leftBottom</button>
<!-- topLeft top topRight leftTop left leftBottom rightTop right rightBottom bottomLeft bottom bottomRight -->`;
}
