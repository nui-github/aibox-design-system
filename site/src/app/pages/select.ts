import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({ imports: [FormsModule, NzIconModule, NzSelectModule], /* ... */ })
export class Example {
  value: string | null = null;
}`;

@Component({
  selector: 'app-select-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzIconModule, NzSelectModule, Demo, CssPanel, PageHead],
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

    <app-demo title="Multiple and tags" description="nzMode=&quot;multiple&quot; / &quot;tags&quot; (Figma Tag Selection) · กล่องสูงขึ้นตามจำนวนแท็ก แท็กขึ้นบรรทัดใหม่ห่างกัน 8px" [code]="multiple" [ts]="imports">
      <nz-select [(ngModel)]="m1" nzMode="multiple" nzPlaceHolder="Select" [nzOptionHeightPx]="50" style="width: 360px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
      <nz-select [(ngModel)]="m2" nzMode="multiple" nzSize="large" nzPlaceHolder="Large" [nzOptionHeightPx]="50" style="width: 360px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
      <nz-select [(ngModel)]="m3" nzMode="tags" nzPlaceHolder="Type and press Enter" style="width: 360px"></nz-select>
      <nz-select [ngModel]="options" nzMode="multiple" nzDisabled style="width: 360px">
        @for (o of options; track o) { <nz-option [nzValue]="o" [nzLabel]="o" /> }
      </nz-select>
    </app-demo>

    <app-demo title="Multiple with names" description="class aibox-select-naming + [nzCustomTemplate] (Figma Tag Selection: user selecting / selected) · แท็กชื่อคนสูง 24px ขนาดปกติ, 30px กับ nzSize=&quot;large&quot; · สี avatar ใช้ aibox-avatar-blue / -sea / -gray / -yellow / -red" [code]="naming" [ts]="imports">
      <nz-select [(ngModel)]="p1" class="aibox-select-naming" nzMode="multiple" nzPlaceHolder="Select people" [nzCustomTemplate]="person" [nzOptionHeightPx]="50" style="width: 460px">
        @for (o of people; track o.value) { <nz-option [nzValue]="o.value" [nzLabel]="o.label" /> }
      </nz-select>
      <nz-select [(ngModel)]="p2" class="aibox-select-naming" nzSize="large" nzMode="multiple" nzPlaceHolder="Select people" [nzCustomTemplate]="person" [nzOptionHeightPx]="50" style="width: 585px">
        @for (o of people; track o.value) { <nz-option [nzValue]="o.value" [nzLabel]="o.label" /> }
      </nz-select>
      <ng-template #person let-selected>
        <span class="aibox-tag-avatar aibox-avatar-{{ color(selected.nzValue) }}"><span nz-icon nzType="user"></span></span>
        <span class="aibox-tag-name">{{ selected.nzLabel }}</span>
      </ng-template>
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
  protected readonly people = [
    { value: '1', label: 'กนกพร รักประเทศไทย', color: 'blue' },
    { value: '2', label: 'กาญจนาพร เอี่ยมศีมงคลชัย', color: 'sea' },
    { value: '3', label: 'กุลชัย สมาธิสติภาวนา', color: 'gray' },
    { value: '4', label: 'กุลวดี แซ่เลี้ยว', color: 'yellow' },
    { value: '5', label: 'ขจรศักดิ์ รุ่งเรืองโรจนะ', color: 'red' },
  ];
  protected p1: string[] = ['1', '2'];
  protected p2: string[] = ['1', '2', '3', '4', '5'];
  protected color(v: string) {
    return this.people.find((x) => x.value === v)?.color ?? 'blue';
  }
  protected m1: string[] = ['Draft', 'Approved'];
  protected m2: string[] = ['Draft', 'In progress', 'Approved', 'Rejected'];
  protected m3: string[] = ['one', 'two'];
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
  protected readonly multiple = `<nz-select [(ngModel)]="value" nzMode="multiple" nzPlaceHolder="Select" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>

<nz-select [(ngModel)]="tags" nzMode="tags" nzPlaceHolder="Type and press Enter" />`;
  protected readonly naming = `<nz-select [(ngModel)]="value" class="aibox-select-naming" nzMode="multiple"
  nzPlaceHolder="Select people" [nzCustomTemplate]="person" [nzOptionHeightPx]="50">
  @for (o of people; track o.value) {
    <nz-option [nzValue]="o.value" [nzLabel]="o.label" />
  }
</nz-select>

<!-- the selected item: avatar (blue / sea / gray / yellow / red) + name; nzSize="large" makes it 30px -->
<ng-template #person let-selected>
  <span class="aibox-tag-avatar aibox-avatar-{{ color(selected.nzValue) }}"><span nz-icon nzType="user"></span></span>
  <span class="aibox-tag-name">{{ selected.nzLabel }}</span>
</ng-template>`;
  protected readonly states = `<nz-select nzStatus="error" nzPlaceHolder="Error" [nzOptionHeightPx]="50">
  @for (o of options; track o) {
    <nz-option [nzValue]="o" [nzLabel]="o" />
  }
</nz-select>
<nz-select nzDisabled nzPlaceHolder="Disabled"></nz-select>`;
}
