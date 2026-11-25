import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({ imports: [NzCollapseModule], /* ... */ })`;

@Component({
  selector: 'app-collapse-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCollapseModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Collapse">
      <ng-container sub>Figma หน้า Collapse (<code>1105:1930</code>) · <code>nz-collapse</code> · Sub Navigation (<code>1108:6694</code>) ไม่ได้ override</ng-container>
    </app-page-head>

    <app-demo title="Basic" description="กรอบ 1px มุม 8px · หัวข้อ padding 12×16 ช่องว่าง 12 · เปิด = ตัวหนังสือและลูกศรสีหลัก, ปิด = text/tertiary · เนื้อหา padding 16" [code]="basic" [ts]="imports">
      <nz-collapse class="wide">
        <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        <nz-collapse-panel nzHeader="This is panel header"><p>OCR Service</p></nz-collapse-panel>
      </nz-collapse>
    </app-demo>

    <app-demo title="Borderless" description="[nzBordered]=&quot;false&quot; · ไม่มีกรอบ แต่ละแถวคั่นด้วยเส้น 1px" [code]="borderless" [ts]="imports">
      <nz-collapse class="wide" [nzBordered]="false">
        <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        <nz-collapse-panel nzHeader="This is panel header"><p>OCR Service</p></nz-collapse-panel>
      </nz-collapse>
    </app-demo>

    <app-demo title="Ghost" description="nzGhost · ไม่มีกรอบและพื้น หัวข้อ padding ซ้าย 12" [code]="ghost" [ts]="imports">
      <nz-collapse class="wide" nzGhost>
        <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        <nz-collapse-panel nzHeader="This is panel header"><p>OCR Service</p></nz-collapse-panel>
      </nz-collapse>
    </app-demo>

    <app-demo title="Size" description="nzSize small (8 ซ้าย 12 ขวา) / large (16 ซ้าย 24 ขวา ตัวอักษร 16/26) · ng-zorro 18 / 19 ไม่มี nzSize ใช้ class aibox-collapse-small / aibox-collapse-large แทน" [code]="size" [ts]="imports">
      <div class="stack">
        <nz-collapse class="wide aibox-collapse-small" nzSize="small">
          <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        </nz-collapse>
        <nz-collapse class="wide aibox-collapse-large" nzSize="large">
          <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        </nz-collapse>
      </div>
    </app-demo>

    <app-demo title="Icon ขวา และ Disabled" description="nzExpandIconPosition=&quot;end&quot; · แถว disabled พื้น bg/disable ตัวอักษร text/disable (ng-zorro 22 ใช้ nzCollapsible=&quot;disabled&quot; แทน nzDisabled)" [code]="end" [ts]="imports">
      <div class="stack">
        <nz-collapse class="wide" nzExpandIconPosition="end">
          <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true"><p>OCR Service</p></nz-collapse-panel>
        </nz-collapse>
        <nz-collapse class="wide">
          <nz-collapse-panel nzHeader="This is panel header" nzCollapsible="disabled"><p>OCR Service</p></nz-collapse-panel>
        </nz-collapse>
      </div>
    </app-demo>

    <app-css-panel id="collapse" />
  `,
  styles: `.wide { width: 548px; max-width: 100%; } .stack { display: flex; flex-direction: column; gap: 16px; } p { margin: 0; }`,
})
export class CollapsePage {
  protected readonly imports = IMPORTS;
  protected readonly basic = `<nz-collapse>
  <nz-collapse-panel nzHeader="This is panel header" [nzActive]="true">
    <p>OCR Service</p>
  </nz-collapse-panel>
</nz-collapse>`;
  protected readonly borderless = `<nz-collapse [nzBordered]="false">...</nz-collapse>`;
  protected readonly ghost = `<nz-collapse nzGhost>...</nz-collapse>`;
  protected readonly size = `<nz-collapse nzSize="small">...</nz-collapse>
<nz-collapse nzSize="large">...</nz-collapse>

<!-- ng-zorro 18 / 19: no nzSize -->
<nz-collapse class="aibox-collapse-small">...</nz-collapse>`;
  protected readonly end = `<nz-collapse nzExpandIconPosition="end">...</nz-collapse>

<!-- disabled: [nzDisabled] on 18 to 21, nzCollapsible="disabled" on 20+ (needed on 22) -->
<nz-collapse-panel nzHeader="..." nzCollapsible="disabled">...</nz-collapse-panel>`;
}
