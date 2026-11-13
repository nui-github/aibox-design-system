import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzFormatEmitEvent, NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({ imports: [NzTreeModule], /* ... */ })`;

@Component({
  selector: 'app-tree-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTreeModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Tree">
      <ng-container sub>Figma nodes <code>9718:69790</code> (tree-selection-list), <code>4267:9343</code> (_base_tree-content-list, หน้า Tree Select) · <code>nz-tree</code> (ใช้ใน <code>nz-tree-select</code> ด้วย) แบบมี checkbox · รายการ Folder list (ไอคอนโฟลเดอร์ + chevron) เป็นรูปแบบเฉพาะของ product ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Checkable tree" description="nzCheckable · ลูกศร + checkbox + ชื่อ 16/26 · แถวสูง 42px · hover พื้น bg/tertiary" [code]="code" [ts]="imports">
      <div class="tree">
        <nz-tree [nzData]="nodes" nzCheckable nzExpandAll (nzClick)="noop($event)" />
      </div>
    </app-demo>

    <app-css-panel id="tree" />
  `,
  styles: `.tree { width: 492px; max-width: 100%; }`,
})
export class TreePage {
  protected readonly imports = IMPORTS;
  protected readonly nodes: NzTreeNodeOptions[] = [
    {
      title: 'ชื่อบริษัท 1', key: '1',
      children: [
        { title: 'ชื่อบริษัท 2', key: '1-1', children: [
          { title: 'ชื่อบริษัท 3', key: '1-1-1', isLeaf: true },
          { title: 'ชื่อบริษัท 3', key: '1-1-2', isLeaf: true },
        ] },
        { title: 'ชื่อบริษัท 2', key: '1-2', isLeaf: true },
      ],
    },
    { title: 'ชื่อบริษัท 1', key: '2', isLeaf: true },
  ];
  protected noop(_: NzFormatEmitEvent): void {}
  protected readonly code = `<nz-tree [nzData]="nodes" nzCheckable nzExpandAll />`;
}
