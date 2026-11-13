import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule, NzTableSortFn } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

interface Row { id: number; name: string; status: string; }

const IMPORTS = `import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({ imports: [NzTableModule, NzTagModule, NzButtonModule], /* ... */ })`;

@Component({
  selector: 'app-table-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzTableModule, NzTagModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Table">
      <ng-container sub>Figma nodes <code>3631:1869</code> (table head cell), <code>8794:180479</code> (table row cell, หน้า Table) · <code>nz-table</code> หัวคอลัมน์ มีไอคอนเรียงลำดับ แถวข้อความ / badge / ปุ่ม</ng-container>
    </app-page-head>

    <app-demo title="Head and row cells" description="คลิกหัวคอลัมน์เพื่อเรียง (ไอคอนเทา = ยังไม่เรียง, สีน้ำเงินลูกศรเดียว = เรียงอยู่) · ปุ่มท้ายแถวใช้ aibox-btn-xs aibox-btn-nopad (texted ไม่มี padding)" [code]="code" [ts]="imports">
      <nz-table #table [nzData]="rows" nzFrontPagination="false" nzShowPagination="false" class="tbl">
        <thead>
          <tr>
            <th [nzSortFn]="byName">ชื่อเอกสาร</th>
            <th>สถานะ</th>
            <th>การทำงาน</th>
          </tr>
        </thead>
        <tbody>
          @for (row of table.data; track row.id) {
            <tr>
              <td>{{ row.name }}</td>
              <td><nz-tag nzColor="processing">{{ row.status }}</nz-tag></td>
              <td>
                <button nz-button nzType="text" class="aibox-btn-xs aibox-btn-nopad">ดู</button>
                <button nz-button nzType="text" class="aibox-btn-xs aibox-btn-nopad">แก้ไข</button>
                <button nz-button nzType="text" class="aibox-btn-xs aibox-btn-nopad">ลบ</button>
              </td>
            </tr>
          }
        </tbody>
      </nz-table>
    </app-demo>

    <app-css-panel id="table" />
  `,
  styles: `.tbl { width: 100%; }`,
})
export class TablePage {
  protected readonly imports = IMPORTS;
  protected readonly rows: Row[] = [
    { id: 1, name: 'แบบสอบถามประเมินความเสี่ยง', status: 'กำลังดำเนินการ' },
    { id: 2, name: 'สัญญาจ้างงาน', status: 'กำลังดำเนินการ' },
    { id: 3, name: 'ใบเสนอราคา', status: 'กำลังดำเนินการ' },
  ];
  protected readonly byName: NzTableSortFn<Row> = (a, b) => a.name.localeCompare(b.name);
  protected readonly code = `<nz-table #table [nzData]="rows" nzShowPagination="false">
  <thead>
    <tr>
      <th [nzSortFn]="byName">ชื่อเอกสาร</th>
      <th>สถานะ</th>
      <th>การทำงาน</th>
    </tr>
  </thead>
  <tbody>
    @for (row of table.data; track row.id) {
      <tr>
        <td>{{ row.name }}</td>
        <td><nz-tag nzColor="processing">{{ row.status }}</nz-tag></td>
        <td>
          <button nz-button nzType="text" class="aibox-btn-xs aibox-btn-nopad">ดู</button>
          <button nz-button nzType="text" class="aibox-btn-xs aibox-btn-nopad">แก้ไข</button>
        </td>
      </tr>
    }
  </tbody>
</nz-table>`;
}
