import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({ imports: [FormsModule, NzCheckboxModule, NzRadioModule], /* ... */ })`;

@Component({
  selector: 'app-checkbox-radio-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzCheckboxModule, NzRadioModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Checkbox & Radio">
      <ng-container sub>Figma nodes <code>1:5323</code> (checkbox), <code>1:5408</code> (radio) · ขนาดวัดจาก render 1x ของ Figma</ng-container>
    </app-page-head>

    <app-demo title="Checkbox" description="unselected · selected · indeterminate · multiple (class aibox-multiple) · disabled" [code]="cb" [ts]="imports">
      <label nz-checkbox>Unselected</label>
      <label nz-checkbox [ngModel]="true">Selected</label>
      <label nz-checkbox nzIndeterminate>Indeterminate</label>
      <label nz-checkbox class="aibox-multiple" [ngModel]="true">Multiple</label>
      <label nz-checkbox nzDisabled>Disabled</label>
      <label nz-checkbox nzDisabled [ngModel]="true">Disabled selected</label>
    </app-demo>

    <app-demo title="Checkbox sizes and error" description="aibox-sm · default · aibox-lg · aibox-error" [code]="cbSizes" [ts]="imports">
      <label nz-checkbox class="aibox-sm" [ngModel]="true">Small</label>
      <label nz-checkbox [ngModel]="true">Medium</label>
      <label nz-checkbox class="aibox-lg" [ngModel]="true">Large</label>
      <label nz-checkbox class="aibox-error">Error</label>
    </app-demo>

    <app-demo title="Radio" [code]="rd" [ts]="imports">
      <label nz-radio>Unselected</label>
      <label nz-radio [ngModel]="true">Selected</label>
      <label nz-radio nzDisabled>Disabled</label>
      <label nz-radio nzDisabled [ngModel]="true">Disabled selected</label>
      <label nz-radio class="aibox-error">Error</label>
    </app-demo>

    <app-demo title="Radio sizes" [code]="rdSizes" [ts]="imports">
      <label nz-radio class="aibox-sm" [ngModel]="true">Small</label>
      <label nz-radio [ngModel]="true">Medium</label>
      <label nz-radio class="aibox-lg" [ngModel]="true">Large</label>
    </app-demo>

    <app-demo title="Radio group" [code]="group" [ts]="imports">
      <nz-radio-group [(ngModel)]="choice">
        <label nz-radio nzValue="a">Option A</label>
        <label nz-radio nzValue="b">Option B</label>
        <label nz-radio nzValue="c">Option C</label>
      </nz-radio-group>
    </app-demo>

    <app-css-panel id="checkbox-radio" />
  `,
})
export class CheckboxRadioPage {
  protected choice = 'a';
  protected readonly imports = IMPORTS;
  protected readonly cb = `<label nz-checkbox>Unselected</label>
<label nz-checkbox [ngModel]="true">Selected</label>
<label nz-checkbox nzIndeterminate>Indeterminate</label>
<label nz-checkbox class="aibox-multiple" [ngModel]="true">Multiple</label>
<label nz-checkbox nzDisabled>Disabled</label>
<label nz-checkbox nzDisabled [ngModel]="true">Disabled selected</label>`;
  protected readonly cbSizes = `<label nz-checkbox class="aibox-sm" [ngModel]="true">Small</label>
<label nz-checkbox [ngModel]="true">Medium</label>
<label nz-checkbox class="aibox-lg" [ngModel]="true">Large</label>
<label nz-checkbox class="aibox-error">Error</label>`;
  protected readonly rd = `<label nz-radio>Unselected</label>
<label nz-radio [ngModel]="true">Selected</label>
<label nz-radio nzDisabled>Disabled</label>
<label nz-radio nzDisabled [ngModel]="true">Disabled selected</label>
<label nz-radio class="aibox-error">Error</label>`;
  protected readonly rdSizes = `<label nz-radio class="aibox-sm" [ngModel]="true">Small</label>
<label nz-radio [ngModel]="true">Medium</label>
<label nz-radio class="aibox-lg" [ngModel]="true">Large</label>`;
  protected readonly group = `<nz-radio-group [(ngModel)]="choice">
  <label nz-radio nzValue="a">Option A</label>
  <label nz-radio nzValue="b">Option B</label>
  <label nz-radio nzValue="c">Option C</label>
</nz-radio-group>`;
}
