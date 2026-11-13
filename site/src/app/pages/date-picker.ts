import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({ imports: [NzDatePickerModule, FormsModule], /* ... */ })`;

@Component({
  selector: 'app-date-picker-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzDatePickerModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Date picker">
      <ng-container sub>Figma nodes <code>1347:23603</code> (date-picker), <code>4558:7666</code> (date-picker-range, หน้า DatePicker) · <code>nz-date-picker</code> และ <code>nz-range-picker</code></ng-container>
    </app-page-head>

    <app-demo title="Sizes and states" description="nzSize default (small) / large · nzStatus=&quot;error&quot; · disabled · กดช่องเพื่อเปิดปฏิทิน" [code]="single" [ts]="imports">
      <div class="col">
        <nz-date-picker nzPlaceHolder="Placeholder" [nzShowToday]="false" />
        <nz-date-picker nzSize="large" nzPlaceHolder="Placeholder" [nzShowToday]="false" />
        <nz-date-picker nzSize="large" [ngModel]="selected" [nzShowToday]="false" />
        <nz-date-picker nzSize="large" nzStatus="error" nzPlaceHolder="Placeholder" />
        <nz-date-picker nzSize="large" nzDisabled nzPlaceHolder="Placeholder" />
      </div>
    </app-demo>

    <app-demo title="Range picker" description="nz-range-picker · ช่วงวันที่พื้น bg/tertiary" [code]="range" [ts]="imports">
      <div class="col">
        <nz-range-picker nzSize="large" [nzShowToday]="false" />
      </div>
    </app-demo>

    <app-css-panel id="date-picker" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-4); width: 360px; max-width: 100%; }`,
})
export class DatePickerPage {
  protected readonly imports = IMPORTS;
  protected readonly selected = new Date(1994, 0, 2);
  protected readonly single = `<nz-date-picker nzPlaceHolder="Placeholder" />
<nz-date-picker nzSize="large" nzPlaceHolder="Placeholder" />
<nz-date-picker nzSize="large" nzStatus="error" nzPlaceHolder="Placeholder" />
<nz-date-picker nzSize="large" nzDisabled nzPlaceHolder="Placeholder" />`;
  protected readonly range = `<nz-range-picker nzSize="large" />`;
}
