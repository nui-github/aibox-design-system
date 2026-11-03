import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({ imports: [FormsModule, NzSelectModule], /* ... */ })
export class Example {
  value: string | null = null;
}`;

@Component({
  selector: 'app-select-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzSelectModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Select">
      <ng-container sub>Figma nodes <code>1592:6210</code> (select-search), <code>1:7137</code> (select), <code>1:7626</code> (content-list)</ng-container>
      <p class="note">ใส่ <code>[nzOptionHeightPx]="50"</code> เสมอ เพราะ option แถวละ 50px ใน Figma (ค่าเริ่มต้นของ ng-zorro คือ 32px)</p>
    </app-page-head>

    <app-demo title="Sizes" description="default = Figma small (40px) · nzSize=&quot;large&quot; = 48px" [code]="sizes" [ts]="imports">
      <nz-select [(ngModel)]="a" nzPlaceHolder="Select" [nzOptionHeightPx]="50" style="width: 240px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
      <nz-select [(ngModel)]="b" nzSize="large" nzPlaceHolder="Select" [nzOptionHeightPx]="50" style="width: 240px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
    </app-demo>

    <app-demo title="Search and clear" description="nzShowSearch (ไอคอน search แทนลูกศรตอนเปิด) · nzAllowClear" [code]="search" [ts]="imports">
      <nz-select [(ngModel)]="c" nzShowSearch nzAllowClear nzPlaceHolder="Search" [nzOptionHeightPx]="50" style="width: 240px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
    </app-demo>

    <app-demo title="States" description="error · disabled" [code]="states" [ts]="imports">
      <nz-select nzStatus="error" nzPlaceHolder="Error" [nzOptionHeightPx]="50" style="width: 240px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
      <nz-select nzDisabled nzPlaceHolder="Disabled" style="width: 240px"></nz-select>
    </app-demo>

    <app-css-panel id="select" />
  `,
  styles: `.note { margin-top: var(--aibox-spacing-2); }`,
})
export class SelectPage {
  protected a: string | null = null;
  protected b: string | null = null;
  protected c: string | null = null;
  protected readonly options = ['Draft', 'In progress', 'Approved', 'Rejected'];
  protected readonly imports = IMPORTS;
  protected readonly sizes = `<nz-select [(ngModel)]="value" nzPlaceHolder="Select" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>

<nz-select [(ngModel)]="value" nzSize="large" nzPlaceHolder="Select" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>`;
  protected readonly search = `<nz-select [(ngModel)]="value" nzShowSearch nzAllowClear nzPlaceHolder="Search" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>`;
  protected readonly states = `<nz-select nzStatus="error" nzPlaceHolder="Error" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>
<nz-select nzDisabled nzPlaceHolder="Disabled"></nz-select>`;
}
