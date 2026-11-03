import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({ imports: [FormsModule, NzSwitchModule], /* ... */ })`;

@Component({
  selector: 'app-switch-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzSwitchModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Switch">
      <ng-container sub>Figma nodes <code>1286:2284</code> (switch-text-and-icon), <code>1:5516</code> (switch iOS)</ng-container>
    </app-page-head>

    <app-demo title="Desktop (44×22)" description="ค่าเริ่มต้น ตรงกับ Figma" [code]="desktop" [ts]="imports">
      <nz-switch [ngModel]="false" />
      <nz-switch [ngModel]="true" />
      <nz-switch nzDisabled [ngModel]="false" />
      <nz-switch nzDisabled [ngModel]="true" />
    </app-demo>

    <app-demo title="Mobile (50×25)" description="class aibox-switch-mobile บน nz-switch" [code]="mobile" [ts]="imports">
      <nz-switch class="aibox-switch-mobile" [ngModel]="false" />
      <nz-switch class="aibox-switch-mobile" [ngModel]="true" />
    </app-demo>

    <app-demo title="iOS (51×31)" description="class aibox-switch-ios บน nz-switch" [code]="ios" [ts]="imports">
      <nz-switch class="aibox-switch-ios" [ngModel]="false" />
      <nz-switch class="aibox-switch-ios" [ngModel]="true" />
      <nz-switch class="aibox-switch-ios" nzDisabled [ngModel]="true" />
    </app-demo>

    <app-demo title="Icons in the track" description="class aibox-switch-icons (ใช้เมื่อไม่ใส่ nzCheckedChildren / nzUnCheckedChildren)" [code]="icons" [ts]="imports">
      <nz-switch class="aibox-switch-icons" [ngModel]="false" />
      <nz-switch class="aibox-switch-icons" [ngModel]="true" />
      <nz-switch class="aibox-switch-icons aibox-switch-mobile" [ngModel]="true" />
    </app-demo>

    <app-demo title="Text children" [code]="text" [ts]="imports">
      <nz-switch nzCheckedChildren="On" nzUnCheckedChildren="Off" [ngModel]="true" />
      <nz-switch nzCheckedChildren="On" nzUnCheckedChildren="Off" [ngModel]="false" />
    </app-demo>

    <app-css-panel id="switch" />
  `,
})
export class SwitchPage {
  protected readonly imports = IMPORTS;
  protected readonly desktop = `<nz-switch [(ngModel)]="on" />
<nz-switch nzDisabled [ngModel]="true" />`;
  protected readonly mobile = `<nz-switch class="aibox-switch-mobile" [(ngModel)]="on" />`;
  protected readonly ios = `<nz-switch class="aibox-switch-ios" [(ngModel)]="on" />`;
  protected readonly icons = `<nz-switch class="aibox-switch-icons" [(ngModel)]="on" />
<nz-switch class="aibox-switch-icons aibox-switch-mobile" [(ngModel)]="on" />`;
  protected readonly text = `<nz-switch nzCheckedChildren="On" nzUnCheckedChildren="Off" [(ngModel)]="on" />`;
}
