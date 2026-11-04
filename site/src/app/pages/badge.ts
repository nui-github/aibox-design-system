import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({ imports: [NzBadgeModule, NzIconModule], /* ... */ })`;

@Component({
  selector: 'app-badge-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzBadgeModule, NzIconModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Badge (notification)">
      <ng-container sub>Figma node <code>1175:641</code> (Badge / Basic) · <code>nz-badge</code> แบบตัวเลข จุด และไอคอน ขนาด Small / Medium / Large</ng-container>
    </app-page-head>

    <app-demo title="Count" description="Small = nzSize=&quot;small&quot; (18px) · Medium = ค่าเริ่มต้น (22px) · Large = class aibox-badge-lg (26px)" [code]="count" [ts]="imports" stageBg="var(--aibox-color-bg-secondary)">
      <nz-badge [nzCount]="21" nzSize="small"><span class="box"></span></nz-badge>
      <nz-badge [nzCount]="21"><span class="box"></span></nz-badge>
      <nz-badge [nzCount]="21" class="aibox-badge-lg"><span class="box"></span></nz-badge>
      <nz-badge [nzCount]="120" [nzOverflowCount]="99"><span class="box"></span></nz-badge>
    </app-demo>

    <app-demo title="Dot" description="6 / 10 / 12px · สีแดงเป็นค่าเริ่มต้น nzColor=&quot;green&quot; เป็นสีเขียว" [code]="dot" [ts]="imports" stageBg="var(--aibox-color-bg-secondary)">
      <nz-badge nzDot nzSize="small"><span class="box"></span></nz-badge>
      <nz-badge nzDot><span class="box"></span></nz-badge>
      <nz-badge nzDot class="aibox-badge-lg"><span class="box"></span></nz-badge>
      <nz-badge nzDot nzColor="green"><span class="box"></span></nz-badge>
    </app-demo>

    <app-demo title="Icon" description="class aibox-badge-icon (+ aibox-badge-sm / aibox-badge-lg) และ [nzCount] เป็น template ที่มี element class ant-scroll-number-custom-component" [code]="icon" [ts]="imports" stageBg="var(--aibox-color-bg-secondary)">
      <ng-template #check><span nz-icon nzType="check" class="ant-scroll-number-custom-component"></span></ng-template>
      <nz-badge class="aibox-badge-icon aibox-badge-sm" [nzCount]="check"><span class="box"></span></nz-badge>
      <nz-badge class="aibox-badge-icon" [nzCount]="check"><span class="box"></span></nz-badge>
      <nz-badge class="aibox-badge-icon aibox-badge-lg" [nzCount]="check"><span class="box"></span></nz-badge>
    </app-demo>

    <app-demo title="Standalone" description="ไม่ครอบ element อื่น (nzStandalone)" [code]="standalone" [ts]="imports">
      <nz-badge nzStandalone [nzCount]="5" nzSize="small" />
      <nz-badge nzStandalone [nzCount]="25" />
      <nz-badge nzStandalone [nzCount]="109" class="aibox-badge-lg" />
    </app-demo>

    <app-css-panel id="badge" />
  `,
  styles: `.box { display: block; width: 40px; height: 40px; border-radius: var(--aibox-radius-2); background: var(--aibox-color-border-secondary); }`,
})
export class BadgePage {
  protected readonly imports = IMPORTS;
  protected readonly count = `<nz-badge [nzCount]="21" nzSize="small"><span class="box"></span></nz-badge>
<nz-badge [nzCount]="21"><span class="box"></span></nz-badge>
<nz-badge [nzCount]="21" class="aibox-badge-lg"><span class="box"></span></nz-badge>
<nz-badge [nzCount]="120" [nzOverflowCount]="99"><span class="box"></span></nz-badge>`;
  protected readonly dot = `<nz-badge nzDot nzSize="small"><span class="box"></span></nz-badge>
<nz-badge nzDot><span class="box"></span></nz-badge>
<nz-badge nzDot class="aibox-badge-lg"><span class="box"></span></nz-badge>
<nz-badge nzDot nzColor="green"><span class="box"></span></nz-badge>`;
  protected readonly icon = `<ng-template #check><span nz-icon nzType="check" class="ant-scroll-number-custom-component"></span></ng-template>

<nz-badge class="aibox-badge-icon aibox-badge-sm" [nzCount]="check"><span class="box"></span></nz-badge>
<nz-badge class="aibox-badge-icon" [nzCount]="check"><span class="box"></span></nz-badge>
<nz-badge class="aibox-badge-icon aibox-badge-lg" [nzCount]="check"><span class="box"></span></nz-badge>`;
  protected readonly standalone = `<nz-badge nzStandalone [nzCount]="5" nzSize="small" />
<nz-badge nzStandalone [nzCount]="25" />
<nz-badge nzStandalone [nzCount]="109" class="aibox-badge-lg" />`;
}
