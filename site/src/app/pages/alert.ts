import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({ imports: [NzAlertModule], /* ... */ })`;

@Component({
  selector: 'app-alert-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAlertModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Alert">
      <ng-container sub>Figma node <code>1:10675</code> (alert-bar, หน้า Message &amp; Snack Bar) · <code>nz-alert</code> 4 สถานะ มี/ไม่มีไอคอนและปุ่มปิด เงา และแบบมีระยะขอบ</ng-container>
    </app-page-head>

    <app-demo title="Statuses" description="nzType success / info / warning / error พร้อม nzShowIcon" [code]="statuses" [ts]="imports">
      <div class="col">
        <nz-alert nzType="success" nzMessage="Alert msg" nzShowIcon />
        <nz-alert nzType="info" nzMessage="Alert msg" nzShowIcon />
        <nz-alert nzType="warning" nzMessage="Alert msg" nzShowIcon />
        <nz-alert nzType="error" nzMessage="Alert msg" nzShowIcon />
      </div>
    </app-demo>

    <app-demo title="Closable" description="nzCloseable · ลองกดปิด" [code]="closable" [ts]="imports">
      <div class="col">
        <nz-alert nzType="success" nzMessage="Alert msg" nzShowIcon nzCloseable />
        <nz-alert nzType="error" nzMessage="Alert msg" nzShowIcon nzCloseable />
      </div>
    </app-demo>

    <app-demo title="Raised and inset" description="aibox-alert-shadow (ลอยเหนือเนื้อหา) · aibox-alert-inset (ห่างขอบ 16px) · ใช้ร่วมกันได้" [code]="variants" [ts]="imports">
      <div class="col">
        <nz-alert class="aibox-alert-shadow" nzType="info" nzMessage="Alert msg" nzShowIcon nzCloseable />
        <nz-alert class="aibox-alert-inset" nzType="warning" nzMessage="Alert msg" nzShowIcon />
        <nz-alert class="aibox-alert-inset aibox-alert-shadow" nzType="error" nzMessage="Alert msg" nzShowIcon nzCloseable />
      </div>
    </app-demo>

    <app-css-panel id="alert" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-4); width: 100%; }`,
})
export class AlertPage {
  protected readonly imports = IMPORTS;
  protected readonly statuses = `<nz-alert nzType="success" nzMessage="Alert msg" nzShowIcon />
<nz-alert nzType="info" nzMessage="Alert msg" nzShowIcon />
<nz-alert nzType="warning" nzMessage="Alert msg" nzShowIcon />
<nz-alert nzType="error" nzMessage="Alert msg" nzShowIcon />`;
  protected readonly closable = `<nz-alert nzType="success" nzMessage="Alert msg" nzShowIcon nzCloseable />`;
  protected readonly variants = `<nz-alert class="aibox-alert-shadow" nzType="info" nzMessage="Alert msg" nzShowIcon nzCloseable />
<nz-alert class="aibox-alert-inset" nzType="warning" nzMessage="Alert msg" nzShowIcon />
<nz-alert class="aibox-alert-inset aibox-alert-shadow" nzType="error" nzMessage="Alert msg" nzShowIcon nzCloseable />`;
}
