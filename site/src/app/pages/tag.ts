import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({ imports: [NzIconModule, NzTagModule], /* ... */ })`;

const CHIP_IMPORTS = `import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({ imports: [NzTagModule], /* ... */ })
export class Example {
  checked = signal(false);
}`;

@Component({
  selector: 'app-tag-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzIconModule, NzTagModule, Demo, CssPanel, PageHead],
  styles: `
    h2 { margin-top: var(--aibox-spacing-6); scroll-margin-top: 88px; }
    .note { color: var(--aibox-color-text-secondary); margin-bottom: var(--aibox-spacing-3); }
  `,
  template: `
    <app-page-head title="Tag">
      <ng-container sub><code>nz-tag</code> · แท็กสถานะ / แท็กมีปุ่ม close / แท็กชื่อคน (Figma badge <code>1:10717</code>, tag/closable <code>1:10102</code>) และ chip ตัวกรอง (<code>nzMode="checkable"</code>, Figma <code>1:10199</code>) · page Chip &amp; Tag <code>3579:12023</code></ng-container>
      <a routerLink="/tag" fragment="chip">ไปที่ Chip (filter)</a>
    </app-page-head>

    <h2 id="tag-status">Tag / status badge</h2>

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

    <app-demo title="Naming: avatar colours" description="aibox-avatar-blue (ค่าเริ่มต้น) / -sea / -gray / -yellow / -red บน aibox-tag-avatar" [code]="avatars" [ts]="imports">
      <nz-tag nzMode="closeable" class="aibox-tag-naming"><span class="aibox-tag-avatar aibox-avatar-blue"><span nz-icon nzType="user"></span></span>Blue</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming"><span class="aibox-tag-avatar aibox-avatar-sea"><span nz-icon nzType="user"></span></span>Sea</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming"><span class="aibox-tag-avatar aibox-avatar-gray"><span nz-icon nzType="user"></span></span>Gray</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming"><span class="aibox-tag-avatar aibox-avatar-yellow"><span nz-icon nzType="user"></span></span>Yellow</nz-tag>
      <nz-tag nzMode="closeable" class="aibox-tag-naming"><span class="aibox-tag-avatar aibox-avatar-red"><span nz-icon nzType="user"></span></span>Red</nz-tag>
    </app-demo>

    <app-css-panel id="tag" />

    <h2 id="chip">Chip / filter</h2>
    <p class="note">Figma node <code>1:10199</code> · <code>nz-tag nzMode="checkable"</code> (selected = <code>nzChecked</code>) · ใช้กฎของ Tag ด้านบนเป็นฐาน</p>

    <app-demo title="States" description="ลองคลิก / hover / กดค้าง · disabled ใช้ class aibox-tag-disabled (กันคลิกเองในโค้ด)" [code]="basic" [ts]="chipImports">
      <nz-tag nzMode="checkable" [nzChecked]="a()" (nzCheckedChange)="a.set($event)">Filter</nz-tag>
      <nz-tag nzMode="checkable" [nzChecked]="true">Selected</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-disabled">Disabled</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-disabled" [nzChecked]="true">Disabled selected</nz-tag>
    </app-demo>

    <app-demo title="Sizes" description="default 32 · aibox-tag-xs 24 · aibox-tag-md 42 (16px) · aibox-tag-lg 42 (18px)" [code]="sizes" [ts]="chipImports">
      <nz-tag nzMode="checkable" class="aibox-tag-xs" [nzChecked]="true">X-small</nz-tag>
      <nz-tag nzMode="checkable" [nzChecked]="true">Small</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-md" [nzChecked]="true">Medium</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-lg" [nzChecked]="true">Large</nz-tag>
    </app-demo>

    <app-demo title="Filter group" [code]="group" [ts]="chipImports">
      @for (f of filters; track f) {
        <nz-tag nzMode="checkable" [nzChecked]="selected().includes(f)" (nzCheckedChange)="toggle(f, $event)">{{ f }}</nz-tag>
      }
    </app-demo>

    <app-css-panel id="chip-filter" />
  `,
})
export class TagPage {
  protected readonly imports = IMPORTS;
  protected readonly chipImports = CHIP_IMPORTS;
  protected readonly a = signal(false);
  protected readonly filters = ['All', 'Draft', 'In progress', 'Approved'];
  protected readonly selected = signal<string[]>(['All']);
  protected toggle(f: string, on: boolean) {
    this.selected.update((s) => (on ? [...s, f] : s.filter((x) => x !== f)));
  }
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
  protected readonly basic = `<nz-tag nzMode="checkable" [nzChecked]="checked()" (nzCheckedChange)="checked.set($event)">Filter</nz-tag>
<nz-tag nzMode="checkable" [nzChecked]="true">Selected</nz-tag>
<nz-tag nzMode="checkable" class="aibox-tag-disabled">Disabled</nz-tag>`;
  protected readonly sizes = `<nz-tag nzMode="checkable" class="aibox-tag-xs" [nzChecked]="true">X-small</nz-tag>
<nz-tag nzMode="checkable" [nzChecked]="true">Small</nz-tag>
<nz-tag nzMode="checkable" class="aibox-tag-md" [nzChecked]="true">Medium</nz-tag>
<nz-tag nzMode="checkable" class="aibox-tag-lg" [nzChecked]="true">Large</nz-tag>`;
  protected readonly group = `@for (f of filters; track f) {
  <nz-tag nzMode="checkable" [nzChecked]="selected().includes(f)" (nzCheckedChange)="toggle(f, $event)">{{ f }}</nz-tag>
}`;
  protected readonly avatars = `<nz-tag nzMode="closeable" class="aibox-tag-naming">
  <span class="aibox-tag-avatar aibox-avatar-sea"><span nz-icon nzType="user"></span></span>Sea
</nz-tag>
<!-- aibox-avatar-blue | -sea | -gray | -yellow | -red -->`;
}
