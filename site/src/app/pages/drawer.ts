import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({ imports: [NzDrawerModule], /* ... */ })
export class Demo { protected readonly open = signal(false); }`;

@Component({
  selector: 'app-drawer-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzDrawerModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Drawer">
      <ng-container sub>Figma nodes <code>3927:8405</code> (Drawer Header), <code>3745:12936</code> (รูปทรง Bottom Sheet, หน้า Drawer / Bottom Sheet) · <code>nz-drawer</code> · รายการเมนูใน bottom sheet (Drawer-list) เป็นเนื้อหาของ product ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Drawer with header" description="nzTitle + ปุ่มปิดชิดขวา · หัวสูง 72px เส้นล่าง 1px · กดปุ่มเพื่อเปิด" [code]="side" [ts]="imports">
      <button nz-button (click)="right.set(true)">Open drawer</button>
      <nz-drawer [nzVisible]="right()" nzTitle="Title" [nzWidth]="375" (nzOnClose)="right.set(false)">
        <ng-container *nzDrawerContent>Content</ng-container>
      </nz-drawer>
    </app-demo>

    <app-demo title="Bottom sheet" description="nzPlacement=&quot;bottom&quot; · มุมบน 16px เงา section-lg" [code]="bottom" [ts]="imports">
      <button nz-button (click)="sheet.set(true)">Open bottom sheet</button>
      <nz-drawer [nzVisible]="sheet()" nzPlacement="bottom" nzTitle="Title" [nzHeight]="320" (nzOnClose)="sheet.set(false)">
        <ng-container *nzDrawerContent>Content</ng-container>
      </nz-drawer>
    </app-demo>

    <app-css-panel id="drawer" />
  `,
})
export class DrawerPage {
  protected readonly right = signal(false);
  protected readonly sheet = signal(false);
  protected readonly imports = IMPORTS;
  protected readonly side = `<nz-drawer [nzVisible]="open()" nzTitle="Title" [nzWidth]="375" (nzOnClose)="open.set(false)">
  <ng-container *nzDrawerContent>Content</ng-container>
</nz-drawer>`;
  protected readonly bottom = `<nz-drawer [nzVisible]="open()" nzPlacement="bottom" nzTitle="Title" [nzHeight]="320" (nzOnClose)="open.set(false)">
  <ng-container *nzDrawerContent>Content</ng-container>
</nz-drawer>`;
}
