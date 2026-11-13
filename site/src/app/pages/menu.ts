import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({ imports: [NzMenuModule], /* ... */ })`;

@Component({
  selector: 'app-menu-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzMenuModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Menu">
      <ng-container sub>Figma node <code>154:3272</code> (เมนูแนวตั้ง 240px: Default / Menu Expand / Submenu, หน้า Navigation) · <code>nz-menu</code> แบบ <code>nzMode="inline"</code> · Sidebar, Header และ Menu Product ในหน้าเดียวกันเป็นโครงของแอป ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Inline menu" description="หัวข้อ 14/24 สีเทา · เมนูที่เปิดเป็นสีน้ำเงิน medium · รายการย่อย hover = พื้นฟ้าอ่อน, เลือก = พื้นน้ำเงิน" [code]="code" [ts]="imports">
      <ul nz-menu nzMode="inline" class="menu">
        <li nz-submenu nzTitle="Default">
          <ul>
            <li nz-menu-item>Default</li>
            <li nz-menu-item>Item</li>
          </ul>
        </li>
        <li nz-submenu nzTitle="Menu Expand" nzOpen>
          <ul>
            <li nz-menu-item>Default</li>
            <li nz-menu-item>Hover State</li>
            <li nz-menu-item nzSelected>FTP Log</li>
          </ul>
        </li>
      </ul>
    </app-demo>

    <app-css-panel id="menu" />
  `,
  styles: `.menu { width: 240px; }`,
})
export class MenuPage {
  protected readonly imports = IMPORTS;
  protected readonly code = `<ul nz-menu nzMode="inline">
  <li nz-submenu nzTitle="Menu Expand" nzOpen>
    <ul>
      <li nz-menu-item>Default</li>
      <li nz-menu-item>Hover State</li>
      <li nz-menu-item nzSelected>FTP Log</li>
    </ul>
  </li>
</ul>`;
}
