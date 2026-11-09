import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({ imports: [NzTabsModule], /* ... */ })`;

@Component({
  selector: 'app-tab-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTabsModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Tab">
      <ng-container sub>Figma nodes <code>4034:247</code> (tab / Tab Button), <code>5342:5164</code> (Outline Tab), <code>5264:730</code> (Tab content) · <code>nz-tabs</code> แบบ card และ line ขนาด Large / Medium / Small</ng-container>
    </app-page-head>

    <ng-template #t1><span class="aibox-tab-icon"></span>Title</ng-template>
    <ng-template #t2><span class="aibox-tab-icon"></span>Title</ng-template>
    <ng-template #t3><span class="aibox-tab-icon"></span>Title</ng-template>
    <ng-template #ok><span class="aibox-tab-icon aibox-tab-icon-success"></span>Title</ng-template>
    <ng-template #err><span class="aibox-tab-icon aibox-tab-icon-error"></span>Title</ng-template>

    <app-demo title="Card (tab / Tab Button)" description="nzType=&quot;card&quot; · ขนาด nzSize=&quot;large&quot; (48) · ค่าเริ่มต้น (40) · nzSize=&quot;small&quot; (32) · ลองกดสลับแท็บ" [code]="card" [ts]="imports">
      <div class="col">
        <nz-tabs nzType="card" nzSize="large">
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="t2">Content 2</nz-tab>
          <nz-tab [nzTitle]="t3" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
        <nz-tabs nzType="card">
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="t2">Content 2</nz-tab>
          <nz-tab [nzTitle]="t3" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
        <nz-tabs nzType="card" nzSize="small">
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="t2">Content 2</nz-tab>
          <nz-tab [nzTitle]="t3" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
      </div>
    </app-demo>

    <app-demo title="Line (Outline Tab)" description="ค่าเริ่มต้น · รางและแถบ 4px · aibox-tabs-fill ให้แท็บแบ่งความกว้างเท่ากัน" [code]="line" [ts]="imports">
      <div class="col">
        <nz-tabs nzSize="large" class="aibox-tabs-fill">
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="t2">Content 2</nz-tab>
          <nz-tab [nzTitle]="t3" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
        <nz-tabs>
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="t2">Content 2</nz-tab>
          <nz-tab [nzTitle]="t3" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
        <nz-tabs nzSize="small">
          <nz-tab nzTitle="Title">Content 1</nz-tab>
          <nz-tab nzTitle="Title">Content 2</nz-tab>
          <nz-tab nzTitle="Title" nzDisabled>Content 3</nz-tab>
        </nz-tabs>
      </div>
    </app-demo>

    <app-demo title="Status icons" description="aibox-tab-icon-error / aibox-tab-icon-success ในหัวข้อแท็บ" [code]="status" [ts]="imports">
      <div class="col">
        <nz-tabs nzType="card" [nzSelectedIndex]="1">
          <nz-tab [nzTitle]="t1">Content 1</nz-tab>
          <nz-tab [nzTitle]="err">Content 2</nz-tab>
          <nz-tab [nzTitle]="ok">Content 3</nz-tab>
        </nz-tabs>
      </div>
    </app-demo>

    <app-css-panel id="tab" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-6); width: 100%; }`,
})
export class TabPage {
  protected readonly imports = IMPORTS;
  protected readonly card = `<ng-template #t1><span class="aibox-tab-icon"></span>Title</ng-template>

<nz-tabs nzType="card" nzSize="large">
  <nz-tab [nzTitle]="t1">Content 1</nz-tab>
  <nz-tab [nzTitle]="t1">Content 2</nz-tab>
  <nz-tab [nzTitle]="t1" nzDisabled>Content 3</nz-tab>
</nz-tabs>

<nz-tabs nzType="card"> ... </nz-tabs>
<nz-tabs nzType="card" nzSize="small"> ... </nz-tabs>`;
  protected readonly line = `<nz-tabs nzSize="large" class="aibox-tabs-fill">
  <nz-tab [nzTitle]="t1">Content 1</nz-tab>
  <nz-tab [nzTitle]="t1">Content 2</nz-tab>
  <nz-tab [nzTitle]="t1" nzDisabled>Content 3</nz-tab>
</nz-tabs>

<nz-tabs> ... </nz-tabs>
<nz-tabs nzSize="small"> ... </nz-tabs>`;
  protected readonly status = `<ng-template #err><span class="aibox-tab-icon aibox-tab-icon-error"></span>Title</ng-template>
<ng-template #ok><span class="aibox-tab-icon aibox-tab-icon-success"></span>Title</ng-template>

<nz-tabs nzType="card" [nzSelectedIndex]="1">
  <nz-tab [nzTitle]="t1">Content 1</nz-tab>
  <nz-tab [nzTitle]="err">Content 2</nz-tab>
  <nz-tab [nzTitle]="ok">Content 3</nz-tab>
</nz-tabs>`;
}
