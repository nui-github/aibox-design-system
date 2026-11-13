import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({ imports: [NzTimePickerModule, FormsModule], /* ... */ })`;

@Component({
  selector: 'app-time-picker-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzTimePickerModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Time picker">
      <ng-container sub>Figma nodes <code>1612:3566</code> (time-picker-desktop), <code>1613:9223</code> (menu cell, หน้า TimePicker) · <code>nz-time-picker</code> · ช่องใช้สไตล์เดียวกับ Date picker</ng-container>
    </app-page-head>

    <app-demo title="Sizes and states" description="nzFormat=&quot;HH:mm&quot; · nzNeedConfirm = ปุ่ม &quot;เลือก&quot; ท้ายแผง · nzStatus / nzDisabled · กดช่องเพื่อเปิดแผง" [code]="code" [ts]="imports">
      <div class="col">
        <nz-time-picker nzFormat="HH:mm" nzPlaceHolder="Placeholder" [nzNeedConfirm]="true" />
        <nz-time-picker nzFormat="HH:mm" nzSize="large" nzPlaceHolder="Placeholder" [nzNeedConfirm]="true" />
        <nz-time-picker nzFormat="HH:mm" nzSize="large" [ngModel]="value" [nzNeedConfirm]="true" />
        <nz-time-picker nzFormat="HH:mm" nzSize="large" nzStatus="error" nzPlaceHolder="Placeholder" />
        <nz-time-picker nzFormat="HH:mm" nzSize="large" nzDisabled nzPlaceHolder="Placeholder" />
      </div>
    </app-demo>

    <app-css-panel id="time-picker" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-4); width: 309px; max-width: 100%; }`,
})
export class TimePickerPage {
  protected readonly imports = IMPORTS;
  protected readonly value = new Date(2024, 0, 1, 2, 30);
  protected readonly code = `<nz-time-picker nzFormat="HH:mm" nzPlaceHolder="Placeholder" [nzNeedConfirm]="true" />
<nz-time-picker nzFormat="HH:mm" nzSize="large" nzPlaceHolder="Placeholder" [nzNeedConfirm]="true" />
<nz-time-picker nzFormat="HH:mm" nzSize="large" nzStatus="error" />
<nz-time-picker nzFormat="HH:mm" nzSize="large" nzDisabled />`;
}
