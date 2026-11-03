import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({ imports: [FormsModule, NzFormModule, NzInputModule], /* ... */ })`;

@Component({
  selector: 'app-input-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzFormModule, NzInputModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Input">
      <ng-container sub>Figma node <code>1:7052</code> · <code>nz-input</code> และ form label ขนาดเริ่มต้น = Figma small, <code>nzSize="large"</code> = Figma large</ng-container>
    </app-page-head>

    <app-demo title="Sizes" [code]="sizes" [ts]="imports">
      <input nz-input placeholder="Default (small)" style="width: 240px" />
      <input nz-input nzSize="large" placeholder="Large" style="width: 240px" />
    </app-demo>

    <app-demo title="States" description="error ใช้ nzStatus (หรือ form control ที่ error) · disabled" [code]="states" [ts]="imports">
      <input nz-input nzStatus="error" placeholder="Error" style="width: 240px" />
      <input nz-input placeholder="Disabled" disabled style="width: 240px" />
    </app-demo>

    <app-demo title="Form label" [code]="label" [ts]="imports">
      <form nz-form nzLayout="vertical" style="width: 320px">
        <nz-form-item>
          <nz-form-label nzRequired nzFor="name">Name</nz-form-label>
          <nz-form-control nzExtra="Assistive text">
            <input nz-input id="name" name="name" placeholder="Enter your name" [(ngModel)]="name" />
          </nz-form-control>
        </nz-form-item>
      </form>
    </app-demo>

    <app-css-panel id="input" />
  `,
})
export class InputPage {
  protected name = '';
  protected readonly imports = IMPORTS;
  protected readonly sizes = `<input nz-input placeholder="Default (small)" />
<input nz-input nzSize="large" placeholder="Large" />`;
  protected readonly states = `<input nz-input nzStatus="error" placeholder="Error" />
<input nz-input placeholder="Disabled" disabled />`;
  protected readonly label = `<form nz-form nzLayout="vertical">
  <nz-form-item>
    <nz-form-label nzRequired nzFor="name">Name</nz-form-label>
    <nz-form-control nzExtra="Assistive text">
      <input nz-input id="name" name="name" placeholder="Enter your name" [(ngModel)]="name" />
    </nz-form-control>
  </nz-form-item>
</form>`;
}
