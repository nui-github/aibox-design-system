import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzCascaderModule } from 'ng-zorro-antd/cascader';

@Component({ imports: [NzCascaderModule, FormsModule], /* ... */ })`;

@Component({
  selector: 'app-cascader-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzCascaderModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Cascader">
      <ng-container sub>Figma nodes <code>4268:12892</code> (Cascader Dropdown), <code>4268:13151</code> (Cascader Containment, หน้า Cascader) · <code>nz-cascader</code> · ช่องใช้สไตล์ Select · แถวไอคอน + คำอธิบายสองบรรทัดของ Figma ไม่มีใน <code>nz-cascader</code> (ทำเองด้วย <code>nzOptionRender</code>)</ng-container>
    </app-page-head>

    <app-demo title="Dropdown" description="nzSize=&quot;large&quot; nzShowSearch · คลิกช่องแล้วเลือกตามระดับ · แถว padding 12×16, 16/26, คอลัมน์คั่น 1px" [code]="code" [ts]="imports">
      <div class="field">
        <nz-cascader nzSize="large" [nzShowSearch]="true" nzPlaceHolder="Placeholder" [nzOptions]="options" [(ngModel)]="value" />
      </div>
    </app-demo>

    <app-css-panel id="cascader" />
  `,
  styles: `.field { width: 368px; max-width: 100%; }`,
})
export class CascaderPage {
  protected readonly imports = IMPORTS;
  protected value: string[] | null = null;
  protected readonly options: NzCascaderOption[] = [
    { value: 'a', label: 'ตัวเลือก 1', children: [
      { value: 'a1', label: 'ตัวเลือก 1.1', children: [{ value: 'a11', label: 'ตัวเลือก 1.1.1', isLeaf: true }, { value: 'a12', label: 'ตัวเลือก 1.1.2', isLeaf: true }] },
      { value: 'a2', label: 'ตัวเลือก 1.2', isLeaf: true },
    ] },
    { value: 'b', label: 'ตัวเลือก 2', children: [{ value: 'b1', label: 'ตัวเลือก 2.1', isLeaf: true }] },
    { value: 'c', label: 'ตัวเลือก 3 (ปิด)', disabled: true, isLeaf: true },
  ];
  protected readonly code = `<nz-cascader nzSize="large" [nzShowSearch]="true" nzPlaceHolder="Placeholder" [nzOptions]="options" [(ngModel)]="value" />`;
}
