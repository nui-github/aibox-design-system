import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({ imports: [NzDropdownModule, NzMenuModule], /* ... */ })`;

@Component({
  selector: 'app-dropdown-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzDropdownModule, NzIconModule, NzMenuModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Dropdown menu">
      <ng-container sub>Figma nodes <code>1346:1358</code>, <code>5728:10508</code> (popover-submenu, หน้า Popover) · <code>nz-dropdown</code> + <code>nz-menu</code> · popover ธรรมดา (<code>1346:1149</code>) เป็น Ant Design มาตรฐาน ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Without sections" description="รายการเรียบ · nzSelected = ตัวอักษรสีน้ำเงิน · nzArrow = ลูกศร 16×8 · กดปุ่มเพื่อเปิด" [code]="plain" [ts]="imports">
      <button nz-button nz-dropdown nzTrigger="click" nzArrow [nzDropdownMenu]="plainMenu">Open menu</button>
      <nz-dropdown-menu #plainMenu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-item nzSelected>Title</li>
          <li nz-menu-item>Title</li>
          <li nz-menu-item>Title</li>
          <li nz-menu-item>Title</li>
        </ul>
      </nz-dropdown-menu>
    </app-demo>

    <app-demo title="With sections" description="nz-menu-group nzTitle = หัวข้อสีเทา แถบพื้น #f7f7f7" [code]="sections" [ts]="imports">
      <button nz-button nz-dropdown nzTrigger="click" nzArrow nzPlacement="bottomLeft" [nzDropdownMenu]="sectionMenu">Open menu with sections</button>
      <nz-dropdown-menu #sectionMenu="nzDropdownMenu">
        <ul nz-menu>
          <li nz-menu-group nzTitle="จัดการเอกสาร">
            <ul>
              <li nz-menu-item nzSelected>จัดการเอกสาร</li>
              <li nz-menu-item>จัดการเทมเพลต</li>
              <li nz-menu-item>จัดการแบบฟอร์ม</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="ลงนาม">
            <ul>
              <li nz-menu-item>ดูเอกสารที่รอลงนาม</li>
            </ul>
          </li>
        </ul>
      </nz-dropdown-menu>
    </app-demo>

    <app-demo title="Actions menu" description="class aibox-dropdown-actions บน ul nz-menu · เมนูของการกระทำ (Figma Navigation > Dropdown Menu): แถวสูง 50px, hover พื้น bg/secondary, ไอคอน 20px นำหน้า, nzDisabled = ตัวอักษรเทา · ไม่มีหัวข้อ / ลูกศร" [code]="actions" [ts]="imports">
      <button nz-button nz-dropdown nzTrigger="click" [nzDropdownMenu]="actionsMenu">Actions</button>
      <nz-dropdown-menu #actionsMenu="nzDropdownMenu">
        <ul nz-menu class="aibox-dropdown-actions">
          <li nz-menu-item><span nz-icon nzType="copy"></span>คัดลอก</li>
          <li nz-menu-item><span nz-icon nzType="download"></span>ดาวน์โหลด</li>
          <li nz-menu-item nzDisabled><span nz-icon nzType="delete"></span>ลบ</li>
        </ul>
      </nz-dropdown-menu>
    </app-demo>

    <app-css-panel id="dropdown" />
  `,
})
export class DropdownPage {
  protected readonly imports = IMPORTS;
  protected readonly plain = `<button nz-button nz-dropdown nzTrigger="click" nzArrow [nzDropdownMenu]="menu">Open menu</button>
<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item nzSelected>Title</li>
    <li nz-menu-item>Title</li>
  </ul>
</nz-dropdown-menu>`;
  protected readonly actions = `<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu class="aibox-dropdown-actions">
    <li nz-menu-item><span nz-icon nzType="copy"></span>คัดลอก</li>
    <li nz-menu-item nzDisabled><span nz-icon nzType="delete"></span>ลบ</li>
  </ul>
</nz-dropdown-menu>`;
  protected readonly sections = `<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-group nzTitle="จัดการเอกสาร">
      <ul>
        <li nz-menu-item nzSelected>จัดการเอกสาร</li>
        <li nz-menu-item>จัดการเทมเพลต</li>
      </ul>
    </li>
    <li nz-menu-group nzTitle="ลงนาม">
      <ul><li nz-menu-item>ดูเอกสารที่รอลงนาม</li></ul>
    </li>
  </ul>
</nz-dropdown-menu>`;
}
