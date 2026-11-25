import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({ imports: [NzStepsModule], /* ... */ })`;

@Component({
  selector: 'app-steps-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzStepsModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Steps">
      <ng-container sub>Figma หน้า Steps (<code>1504:2619</code>) · <code>steps-indicator-horizontal</code> <code>1504:4345</code>, <code>steps-indicator-vertical</code> <code>8528:8912</code> · <code>nz-steps</code></ng-container>
    </app-page-head>

    <app-demo title="Horizontal indicator" description="nzSize=&quot;small&quot; + nzLabelPlacement=&quot;vertical&quot; · ไอคอน 24px เส้น 3px ห่างไอคอน 4px หัวข้อ 16/26 คำอธิบาย 14/24 อยู่ใต้ไอคอน · เส้นหลังขั้นที่เสร็จเป็นสีหลัก ที่เหลือ bg/secondary" [code]="horizontal" [ts]="imports">
      <div class="box">
        <nz-steps nzSize="small" nzLabelPlacement="vertical" [nzCurrent]="1">
          <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
        </nz-steps>
      </div>
    </app-demo>

    <app-demo title="Error" description="nzStatus=&quot;error&quot; · ไอคอนแดงกากบาทขาว หัวข้อและคำอธิบายสีแดง" [code]="error" [ts]="imports">
      <div class="box">
        <nz-steps nzSize="small" nzLabelPlacement="vertical" [nzCurrent]="1">
          <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="Error" nzDescription="This is a description." nzStatus="error"></nz-step>
          <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
        </nz-steps>
      </div>
    </app-demo>

    <app-demo title="Vertical indicator" description="nzDirection=&quot;vertical&quot; · ไอคอนซ้าย ห่างข้อความ 16px แถวละ 112px เส้น 1px" [code]="vertical" [ts]="imports">
      <div class="box narrow">
        <nz-steps nzSize="small" nzDirection="vertical" [nzCurrent]="1">
          <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
        </nz-steps>
      </div>
    </app-demo>

    <app-demo title="Size และ Dot" description="ไม่ใส่ nzSize = ไอคอน 32px (Basic Default) · nzProgressDot = จุด 8px (ขั้นปัจจุบัน 10px)" [code]="size" [ts]="imports">
      <div class="box stack">
        <nz-steps nzLabelPlacement="vertical" [nzCurrent]="1">
          <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
        </nz-steps>
        <nz-steps nzProgressDot nzLabelPlacement="vertical" [nzCurrent]="1">
          <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
          <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
        </nz-steps>
      </div>
    </app-demo>

    <app-css-panel id="steps" />
  `,
  styles: `.box { width: 720px; max-width: 100%; min-width: 0; } .narrow { width: 320px; } .stack { display: flex; flex-direction: column; gap: 32px; }`,
})
export class StepsPage {
  protected readonly imports = IMPORTS;
  protected readonly horizontal = `<nz-steps nzSize="small" nzLabelPlacement="vertical" [nzCurrent]="1">
  <nz-step nzTitle="Finished" nzDescription="This is a description."></nz-step>
  <nz-step nzTitle="In Progress" nzDescription="This is a description."></nz-step>
  <nz-step nzTitle="Waiting" nzDescription="This is a description."></nz-step>
</nz-steps>`;
  protected readonly error = `<nz-step nzTitle="Error" nzDescription="..." nzStatus="error"></nz-step>`;
  protected readonly vertical = `<nz-steps nzSize="small" nzDirection="vertical" [nzCurrent]="1">...</nz-steps>`;
  protected readonly size = `<!-- 32px icons -->
<nz-steps nzLabelPlacement="vertical" [nzCurrent]="1">...</nz-steps>

<!-- dots -->
<nz-steps nzProgressDot nzLabelPlacement="vertical" [nzCurrent]="1">...</nz-steps>`;
}
