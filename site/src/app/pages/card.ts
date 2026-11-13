import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzCardModule } from 'ng-zorro-antd/card';

@Component({ imports: [NzCardModule], /* ... */ })`;

@Component({
  selector: 'app-card-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzIconModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Card">
      <ng-container sub>Figma nodes <code>4065:7590</code> (Card / Advanced ในหน้า Empty State), <code>1295:3294</code> (Card Menu, หน้า Card) · <code>nz-card</code> · การ์ดเลือกไฟล์ / E-Form (<code>5315:90</code>, <code>8268:73590</code>) เป็นรูปแบบเฉพาะของ product ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Card" description="กรอบ 1px border/primary มุม 8px เงา section-sm · เนื้อหา padding 24×16" [code]="basic" [ts]="imports">
      <nz-card class="wide">Card content</nz-card>
    </app-demo>

    <app-demo title="Card menu" description="aibox-card-menu · ไอคอนกับข้อความกลางการ์ด ใช้เป็นทางลัดเมนู" [code]="menu" [ts]="imports">
      <nz-card class="aibox-card-menu menu">
        <nz-icon nzType="heart" nzTheme="fill" />
        <span class="title">Text</span>
      </nz-card>
    </app-demo>

    <app-css-panel id="card" />
  `,
  styles: `.wide { width: 480px; max-width: 100%; } .menu { width: 164px; }`,
})
export class CardPage {
  protected readonly imports = IMPORTS;
  protected readonly basic = `<nz-card>Card content</nz-card>`;
  protected readonly menu = `<nz-card class="aibox-card-menu">
  <nz-icon nzType="heart" nzTheme="fill" />
  <span class="title">Text</span>
</nz-card>`;
}
