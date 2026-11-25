import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({ imports: [NzSpinModule], /* ... */ })`;

@Component({
  selector: 'app-spin-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzSpinModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Spin">
      <ng-container sub>Figma หน้า Spin (<code>7075:39</code>, Spin <code>7075:49</code>) · <code>nz-spin</code> · หน้า Figma เป็นสไตล์ Ant Design ดั้งเดิม (สี #1677ff, ฟอนต์ SF Pro) ที่นี่ใช้ขนาดตาม Figma แต่สีและฟอนต์เป็นของ Ai-BOX</ng-container>
    </app-page-head>

    <app-demo title="Size" description="nzSimple + nzTip · ตัวหมุน 14 / 20 / 32px ข้อความ 14/22 สีหลัก padding 16 ช่องว่าง 8 · กล่องสูง 76 / 82 / 94px" [code]="size" [ts]="imports">
      <div class="row">
        <nz-spin nzSimple nzSize="small" nzTip="Loading"></nz-spin>
        <nz-spin nzSimple nzTip="Loading"></nz-spin>
        <nz-spin nzSimple nzSize="large" nzTip="Loading"></nz-spin>
      </div>
    </app-demo>

    <app-demo title="ครอบเนื้อหา" description="nz-spin ที่ครอบเนื้อหา · ใช้ overlay ของ ng-zorro เปลี่ยนเฉพาะสีของตัวหมุนและข้อความ" [code]="wrap" [ts]="imports">
      <nz-spin nzTip="Loading" class="wrap">
        <div class="content">Content</div>
      </nz-spin>
    </app-demo>

    <app-css-panel id="spin" />
  `,
  styles: `.row { display: flex; flex-wrap: wrap; gap: 24px; min-width: 0; max-width: 100%; } .wrap { display: block; width: 320px; max-width: 100%; min-width: 0; } .content { height: 120px; padding: 16px; border: 1px solid var(--aibox-color-border-primary); border-radius: 8px; }`,
})
export class SpinPage {
  protected readonly imports = IMPORTS;
  protected readonly size = `<nz-spin nzSimple nzSize="small" nzTip="Loading"></nz-spin>
<nz-spin nzSimple nzTip="Loading"></nz-spin>
<nz-spin nzSimple nzSize="large" nzTip="Loading"></nz-spin>`;
  protected readonly wrap = `<nz-spin nzTip="Loading">
  <div>Content</div>
</nz-spin>`;
}
