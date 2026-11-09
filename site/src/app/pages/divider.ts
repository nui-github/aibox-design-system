import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({ imports: [NzDividerModule], /* ... */ })`;

@Component({
  selector: 'app-divider-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDividerModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Divider">
      <ng-container sub>Figma node <code>1174:444</code> (divider) · <code>nz-divider</code> เส้น 1px (inline), เส้นประ และแถบหนา S / M / M24 / L</ng-container>
    </app-page-head>

    <app-demo title="Line" description="ค่าเริ่มต้น = inline (1px border/primary) · nzDashed = Dash Secondary" [code]="line" [ts]="imports">
      <div class="col">
        <p>Content above</p>
        <nz-divider />
        <p>Content below</p>
        <nz-divider nzDashed />
        <p>Dashed</p>
        <nz-divider nzText="Title" />
        <p>With text</p>
        <p>Vertical <nz-divider nzType="vertical" /> divider <nz-divider nzType="vertical" /> inline</p>
      </div>
    </app-demo>

    <app-demo title="Bands" description="class aibox-divider-s (margin 10) · -m (18) · -m24 (24) แถบหนา 5px · -l แถบ 10px (margin 18)" [code]="bands" [ts]="imports">
      <div class="col">
        <p>Section</p><nz-divider class="aibox-divider-s" /><p>S 10</p>
        <nz-divider class="aibox-divider-m" /><p>M 18</p>
        <nz-divider class="aibox-divider-m24" /><p>M 24</p>
        <nz-divider class="aibox-divider-l" /><p>L (space 18)</p>
      </div>
    </app-demo>

    <app-css-panel id="divider" />
  `,
  styles: `.col { width: 100%; } .col p { margin: 0; }`,
})
export class DividerPage {
  protected readonly imports = IMPORTS;
  protected readonly line = `<nz-divider />
<nz-divider nzDashed />
<nz-divider nzText="Title" />
Vertical <nz-divider nzType="vertical" /> divider`;
  protected readonly bands = `<nz-divider class="aibox-divider-s" />
<nz-divider class="aibox-divider-m" />
<nz-divider class="aibox-divider-m24" />
<nz-divider class="aibox-divider-l" />`;
}
