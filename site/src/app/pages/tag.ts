import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({ imports: [NzIconModule, NzTagModule], /* ... */ })`;

@Component({
  selector: 'app-tag-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzTagModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Tag (status badge)">
      <ng-container sub>Figma badge node <code>1:10717</code> (page Chip &amp; Tag <code>3579:12023</code>) · map สถานะของ Figma กับ <code>nzColor</code></ng-container>
    </app-page-head>

    <app-demo title="Status (light, pill)" description="draft = ไม่ใส่ nzColor · in progress = processing · rework = purple · reject = orange" [code]="light" [ts]="imports">
      <nz-tag>Draft</nz-tag>
      <nz-tag nzColor="processing">In progress</nz-tag>
      <nz-tag nzColor="success">Success</nz-tag>
      <nz-tag nzColor="warning">Warning</nz-tag>
      <nz-tag nzColor="error">Error</nz-tag>
      <nz-tag nzColor="purple">Rework</nz-tag>
      <nz-tag nzColor="orange">Reject</nz-tag>
    </app-demo>

    <app-demo title="Solid" description="class aibox-tag-solid" [code]="solid" [ts]="imports">
      <nz-tag class="aibox-tag-solid">Draft</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="processing">In progress</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="success">Success</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="warning">Warning</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="error">Error</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="purple">Rework</nz-tag>
      <nz-tag class="aibox-tag-solid" nzColor="orange">Reject</nz-tag>
    </app-demo>

    <app-demo title="Square and X-small" description="aibox-tag-square (radius 4) · aibox-tag-xs (12px)" [code]="square" [ts]="imports">
      <nz-tag class="aibox-tag-square" nzColor="success">Square</nz-tag>
      <nz-tag class="aibox-tag-xs" nzColor="success">X-small</nz-tag>
      <nz-tag class="aibox-tag-square aibox-tag-xs" nzColor="success">Square x-small</nz-tag>
    </app-demo>

    <app-demo title="Closable" description="nzMode=&quot;closeable&quot; (Figma tag/closable) · ขนาดปกติ = Figma small (14px, สูง 32px) · aibox-tag-xs = 2xsmall (12px, สูง 24px) · สีเหมือน badge + aibox-tag-black" [code]="closable" [ts]="imports">
      <nz-tag nzMode="closeable">Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="processing">Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="success">Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="error">Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="warning">Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="purple">Tag</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-black">Tag</nz-tag>
    </app-demo>

    <app-demo title="Closable: x-small, square, icon" description="aibox-tag-xs · aibox-tag-square · ไอคอนนำหน้า 12px" [code]="closableMore" [ts]="imports">
      <nz-tag nzMode="closeable" class="aibox-tag-xs">Tag</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-xs" nzColor="processing">Tag</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-xs aibox-tag-black">Tag</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-square">Square</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-square aibox-tag-xs" nzColor="success">Square</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-xs"><span nz-icon nzType="heart" nzTheme="fill"></span>Tag</nz-tag>
      <nz-tag nzMode="closeable" nzColor="error"><span nz-icon nzType="heart" nzTheme="fill"></span>Tag</nz-tag>
    </app-demo>

    <app-demo title="Naming (avatar)" description="class aibox-tag-naming = แท็กชื่อคน (Figma naming round): avatar กลม 30px ชิดซ้าย ชื่อ 14/24 · aibox-tag-naming-sm = avatar 24px · ครอบชื่อยาวด้วย aibox-tag-name (ตัดด้วย … ที่ 120px)" [code]="naming" [ts]="imports">
      <nz-tag nzMode="closeable" class="aibox-tag-naming">
        <span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>
        Somchai
      </nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming aibox-tag-naming-sm">
        <span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>
        Somchai
      </nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming">
        <span class="aibox-tag-avatar">S</span>
        <span class="aibox-tag-name">Somchai Jaidee-Wongsakul Senior Manager</span>
      </nz-tag>
      <nz-tag class="aibox-tag-naming">
        <span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>
        Somchai
      </nz-tag>
    </app-demo>

    <app-css-panel id="tag" />
  `,
})
export class TagPage {
  protected readonly imports = IMPORTS;
  protected readonly light = `<nz-tag>Draft</nz-tag>
<nz-tag nzColor="processing">In progress</nz-tag>
<nz-tag nzColor="success">Success</nz-tag>
<nz-tag nzColor="warning">Warning</nz-tag>
<nz-tag nzColor="error">Error</nz-tag>
<nz-tag nzColor="purple">Rework</nz-tag>
<nz-tag nzColor="orange">Reject</nz-tag>`;
  protected readonly solid = `<nz-tag class="aibox-tag-solid" nzColor="success">Success</nz-tag>
<nz-tag class="aibox-tag-solid" nzColor="error">Error</nz-tag>`;
  protected readonly square = `<nz-tag class="aibox-tag-square" nzColor="success">Square</nz-tag>
<nz-tag class="aibox-tag-xs" nzColor="success">X-small</nz-tag>
<nz-tag class="aibox-tag-square aibox-tag-xs" nzColor="success">Square x-small</nz-tag>`;
  protected readonly closable = `<nz-tag nzMode="closeable">Tag</nz-tag>
<nz-tag nzMode="closeable" nzColor="processing">Tag</nz-tag>
<nz-tag nzMode="closeable" nzColor="success">Tag</nz-tag>
<nz-tag nzMode="closeable" nzColor="error">Tag</nz-tag>
<nz-tag nzMode="closeable" nzColor="warning">Tag</nz-tag>
<nz-tag nzMode="closeable" nzColor="purple">Tag</nz-tag>
<nz-tag nzMode="closeable" class="aibox-tag-black">Tag</nz-tag>`;
  protected readonly closableMore = `<nz-tag nzMode="closeable" class="aibox-tag-xs">Tag</nz-tag>
<nz-tag nzMode="closeable" class="aibox-tag-square">Square</nz-tag>
<nz-tag nzMode="closeable" class="aibox-tag-xs">
  <span nz-icon nzType="heart" nzTheme="fill"></span>Tag
</nz-tag>
<!-- (nzOnClose)="..." removes the tag; ng-zorro hides it by itself unless you cancel the event -->`;
  protected readonly naming = `<nz-tag nzMode="closeable" class="aibox-tag-naming">
  <span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>
  Somchai
</nz-tag>

<!-- small avatar (24px) -->
<nz-tag nzMode="closeable" class="aibox-tag-naming aibox-tag-naming-sm">
  <span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>
  Somchai
</nz-tag>

<!-- a letter instead of the icon, and a long name cut with an ellipsis at 120px -->
<nz-tag nzMode="closeable" class="aibox-tag-naming">
  <span class="aibox-tag-avatar">S</span>
  <span class="aibox-tag-name">Somchai Jaidee-Wongsakul Senior Manager</span>
</nz-tag>`;
}
