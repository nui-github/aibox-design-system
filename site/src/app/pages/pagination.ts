import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({ imports: [NzPaginationModule], /* ... */ })`;

@Component({
  selector: 'app-pagination-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzPaginationModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Pagination">
      <ng-container sub>Figma node <code>3451:10970</code> · <code>nz-pagination</code> พร้อมข้อความรวม (<code>nzShowTotal</code>) และตัวเลือกจำนวนต่อหน้า (<code>nzShowSizeChanger</code>)</ng-container>
    </app-page-head>

    <app-demo title="Default" description="ลองกดเปลี่ยนหน้า · ข้อความรวมอยู่ซ้าย ปุ่มและตัวเลือกอยู่ขวา" [code]="basic" [ts]="imports">
      <ng-template #total let-total let-range="range">รายการ: {{ range[1] }} จาก {{ total }} รายการ</ng-template>
      <nz-pagination class="full" [(nzPageIndex)]="page" [nzTotal]="40" [nzPageSize]="size" (nzPageSizeChange)="size = $event" [nzShowTotal]="total" nzShowSizeChanger [nzPageSizeOptions]="[10, 20, 50]" />
    </app-demo>

    <app-demo title="First, middle and last page" description="ปุ่มก่อนหน้า/ถัดไปที่ใช้ไม่ได้เป็นสีเทา" [code]="states" [ts]="imports">
      <nz-pagination class="full" [nzPageIndex]="1" [nzTotal]="30" />
      <nz-pagination class="full" [nzPageIndex]="2" [nzTotal]="30" />
      <nz-pagination class="full" [nzPageIndex]="3" [nzTotal]="30" />
      <nz-pagination class="full" [nzPageIndex]="1" [nzTotal]="5" />
    </app-demo>

    <app-demo title="Many pages and disabled" [code]="many" [ts]="imports">
      <nz-pagination class="full" [nzPageIndex]="6" [nzTotal]="200" />
      <nz-pagination class="full" [nzPageIndex]="2" [nzTotal]="30" nzDisabled />
    </app-demo>

    <app-css-panel id="pagination" />
  `,
  styles: `.full { width: 100%; }`,
})
export class PaginationPage {
  protected page = 1;
  protected size = 10;
  protected readonly imports = IMPORTS;
  protected readonly basic = `<ng-template #total let-total let-range="range">รายการ: {{ range[1] }} จาก {{ total }} รายการ</ng-template>
<nz-pagination
  [(nzPageIndex)]="page"
  [nzTotal]="40"
  [nzPageSize]="size"
  (nzPageSizeChange)="size = $event"
  [nzShowTotal]="total"
  nzShowSizeChanger
  [nzPageSizeOptions]="[10, 20, 50]"
/>`;
  protected readonly states = `<nz-pagination [nzPageIndex]="1" [nzTotal]="30" />
<nz-pagination [nzPageIndex]="2" [nzTotal]="30" />
<nz-pagination [nzPageIndex]="3" [nzTotal]="30" />
<nz-pagination [nzPageIndex]="1" [nzTotal]="5" />`;
  protected readonly many = `<nz-pagination [nzPageIndex]="6" [nzTotal]="200" />
<nz-pagination [nzPageIndex]="2" [nzTotal]="30" nzDisabled />`;
}
