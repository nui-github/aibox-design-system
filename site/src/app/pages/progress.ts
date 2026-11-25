import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({ imports: [NzProgressModule], /* ... */ })`;

@Component({
  selector: 'app-progress-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzProgressModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Progress">
      <ng-container sub>Figma หน้า Progress (<code>7630:68366</code>) · <code>nz-progress</code> · หน้า Figma เป็นสไตล์ Ant Design ดั้งเดิม (สีฟ้า #1890ff, ฟอนต์ Roboto) ที่นี่ใช้ขนาดตาม Figma แต่สีและฟอนต์เป็นของ Ai-BOX</ng-container>
    </app-page-head>

    <app-demo title="Line" description="แถบสูง 8px มุมกลม ช่องว่างถึงตัวเลข 8px ตัวเลข 14/22 · สถานะ success / exception เปลี่ยนตัวเลขเป็นไอคอน 16px · [nzShowInfo]=&quot;false&quot; = Bare" [code]="line" [ts]="imports">
      <div class="stack">
        <nz-progress [nzPercent]="75"></nz-progress>
        <nz-progress [nzPercent]="100"></nz-progress>
        <nz-progress [nzPercent]="60" nzStatus="exception"></nz-progress>
        <nz-progress [nzPercent]="60" [nzShowInfo]="false"></nz-progress>
      </div>
    </app-demo>

    <app-demo title="Line mini และ Multiple" description="nzSize=&quot;small&quot; = แถบ 6px ตัวเลข 12/20 · [nzSuccessPercent] = ช่วงสีเขียวทับบนแถบ" [code]="mini" [ts]="imports">
      <div class="stack narrow">
        <nz-progress [nzPercent]="95" nzSize="small"></nz-progress>
        <nz-progress [nzPercent]="60" [nzSuccessPercent]="30"></nz-progress>
      </div>
    </app-demo>

    <app-demo title="Circle" description="nzType=&quot;circle&quot; [nzWidth]=&quot;120&quot; (ค่าเริ่มต้นของ ng-zorro คือ 132) · Mini = [nzWidth]=&quot;80&quot;" [code]="circle" [ts]="imports">
      <div class="row">
        <nz-progress nzType="circle" [nzPercent]="75" [nzWidth]="120"></nz-progress>
        <nz-progress nzType="circle" [nzPercent]="100" [nzWidth]="120"></nz-progress>
        <nz-progress nzType="circle" [nzPercent]="60" nzStatus="exception" [nzWidth]="120"></nz-progress>
        <nz-progress nzType="circle" [nzPercent]="75" [nzWidth]="80"></nz-progress>
      </div>
    </app-demo>

    <app-demo title="Steps" description="[nzSteps] + nzStrokeColor=&quot;var(--aibox-color-main)&quot; · ช่อง 14×8 ห่าง 2px (small = 2×6) · ng-zorro ลงสีช่องที่เสร็จผ่าน nzStrokeColor เท่านั้น จึงต้องส่งค่านี้" [code]="steps" [ts]="imports">
      <div class="stack">
        <nz-progress [nzPercent]="50" [nzSteps]="3" nzStrokeColor="var(--aibox-color-main)"></nz-progress>
        <nz-progress [nzPercent]="100" [nzSteps]="5" nzSize="small" nzStrokeColor="var(--aibox-color-main)"></nz-progress>
      </div>
    </app-demo>

    <app-css-panel id="progress" />
  `,
  styles: `.stack { display: flex; flex-direction: column; gap: 16px; width: 400px; max-width: 100%; min-width: 0; } .narrow { width: 174px; } .row { display: flex; flex-wrap: wrap; gap: 24px; min-width: 0; max-width: 100%; }`,
})
export class ProgressPage {
  protected readonly imports = IMPORTS;
  protected readonly line = `<nz-progress [nzPercent]="75"></nz-progress>
<nz-progress [nzPercent]="100"></nz-progress>
<nz-progress [nzPercent]="60" nzStatus="exception"></nz-progress>
<nz-progress [nzPercent]="60" [nzShowInfo]="false"></nz-progress>`;
  protected readonly mini = `<nz-progress [nzPercent]="95" nzSize="small"></nz-progress>
<nz-progress [nzPercent]="60" [nzSuccessPercent]="30"></nz-progress>`;
  protected readonly circle = `<nz-progress nzType="circle" [nzPercent]="75" [nzWidth]="120"></nz-progress>
<nz-progress nzType="circle" [nzPercent]="75" [nzWidth]="80"></nz-progress>`;
  protected readonly steps = `<nz-progress [nzPercent]="50" [nzSteps]="3" nzStrokeColor="var(--aibox-color-main)"></nz-progress>`;
}
