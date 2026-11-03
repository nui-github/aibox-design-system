import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({ imports: [NzTagModule], /* ... */ })
export class Example {
  checked = signal(false);
}`;

@Component({
  selector: 'app-chip-filter-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTagModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Chip (filter)">
      <ng-container sub>Figma node <code>1:10199</code> · <code>nz-tag nzMode="checkable"</code> (selected = <code>nzChecked</code>)</ng-container>
    </app-page-head>

    <app-demo title="States" description="ลองคลิก / hover / กดค้าง · disabled ใช้ class aibox-tag-disabled (กันคลิกเองในโค้ด)" [code]="basic" [ts]="imports">
      <nz-tag nzMode="checkable" [nzChecked]="a()" (nzCheckedChange)="a.set($event)">Filter</nz-tag>
      <nz-tag nzMode="checkable" [nzChecked]="true">Selected</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-disabled">Disabled</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-disabled" [nzChecked]="true">Disabled selected</nz-tag>
    </app-demo>

    <app-demo title="Sizes" description="default 32 · aibox-tag-xs 24 · aibox-tag-md 42 (16px) · aibox-tag-lg 42 (18px)" [code]="sizes" [ts]="imports">
      <nz-tag nzMode="checkable" class="aibox-tag-xs" [nzChecked]="true">X-small</nz-tag>
      <nz-tag nzMode="checkable" [nzChecked]="true">Small</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-md" [nzChecked]="true">Medium</nz-tag>
      <nz-tag nzMode="checkable" class="aibox-tag-lg" [nzChecked]="true">Large</nz-tag>
    </app-demo>

    <app-demo title="Filter group" [code]="group" [ts]="imports">
      @for (f of filters; track f) {
        <nz-tag nzMode="checkable" [nzChecked]="selected().includes(f)" (nzCheckedChange)="toggle(f, $event)">{{ f }}</nz-tag>
      }
    </app-demo>

    <app-css-panel id="chip-filter" />
  `,
})
export class ChipFilterPage {
  protected readonly a = signal(false);
  protected readonly filters = ['All', 'Draft', 'In progress', 'Approved'];
  protected readonly selected = signal<string[]>(['All']);
  protected toggle(f: string, on: boolean) {
    this.selected.update((s) => (on ? [...s, f] : s.filter((x) => x !== f)));
  }
  protected readonly imports = IMPORTS;
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
}
