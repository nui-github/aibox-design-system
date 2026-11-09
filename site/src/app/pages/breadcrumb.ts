import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({ imports: [NzBreadCrumbModule], /* ... */ })`;

@Component({
  selector: 'app-breadcrumb-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzBreadCrumbModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Breadcrumb">
      <ng-container sub>Figma nodes <code>1:11308</code> (breadcrumbs), <code>7762:53685</code> (breadcrumbs_lists) · <code>nz-breadcrumb</code> 2 ถึง 5 ระดับ ลูกศร chevron ระหว่างรายการ รายการสุดท้ายตัวหนา</ng-container>
    </app-page-head>

    <app-demo title="Levels" description="ลอง hover ที่ลิงก์ · ใช้ nz-breadcrumb-item ตามจำนวนระดับ (2 ถึง 5)" [code]="levels" [ts]="imports">
      <div class="col">
        <nz-breadcrumb>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item>Menu</nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-breadcrumb>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item>Menu</nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-breadcrumb>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item>Menu</nz-breadcrumb-item>
        </nz-breadcrumb>
        <nz-breadcrumb>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
          <nz-breadcrumb-item>Menu</nz-breadcrumb-item>
        </nz-breadcrumb>
      </div>
    </app-demo>

    <app-css-panel id="breadcrumb" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-4); }`,
})
export class BreadcrumbPage {
  protected readonly imports = IMPORTS;
  protected readonly levels = `<nz-breadcrumb>
  <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
  <nz-breadcrumb-item><a href="#">Menu</a></nz-breadcrumb-item>
  <nz-breadcrumb-item>Menu</nz-breadcrumb-item>
</nz-breadcrumb>`;
}
