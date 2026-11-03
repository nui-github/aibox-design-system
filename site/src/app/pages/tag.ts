import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({ imports: [NzTagModule], /* ... */ })`;

@Component({
  selector: 'app-tag-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTagModule, Demo, CssPanel, PageHead],
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
}
