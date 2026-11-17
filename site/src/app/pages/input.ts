import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({ imports: [FormsModule, NzFormModule, NzIconModule, NzInputModule, NzInputNumberModule], /* ... */ })`;

@Component({
  selector: 'app-input-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NzFormModule, NzIconModule, NzInputModule, NzInputNumberModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Input">
      <ng-container sub>Figma nodes <code>1:7052</code> (textfield), <code>1:7232</code> (textarea), <code>1:7587</code> (search), <code>6581:98500</code> (password), <code>1:7499</code> (assistive text) · <code>nz-input</code> และ form label ขนาดเริ่มต้น = Figma small (กล่องสูง 40px), <code>nzSize="large"</code> = Figma large (48px)</ng-container>
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

    <app-demo title="Textarea" description="textarea nz-input · เริ่มสูง 80px (nzSize=&quot;large&quot; = 96px) ลากขยายแนวตั้งได้ · ถ้าใส่ rows เอง ความสูงจะเป็นไปตาม rows" [code]="textarea" [ts]="imports">
      <textarea nz-input placeholder="Textarea" style="width: 240px"></textarea>
      <textarea nz-input nzSize="large" placeholder="Large" style="width: 240px"></textarea>
      <textarea nz-input nzStatus="error" placeholder="Error" style="width: 240px"></textarea>
      <textarea nz-input placeholder="Disabled" disabled style="width: 240px"></textarea>
    </app-demo>

    <app-demo title="Textarea with count" description="nz-textarea-count แสดงตัวนับใต้กล่อง ชิดขวา" [code]="count" [ts]="imports">
      <nz-textarea-count [nzMaxCharacterCount]="50" style="width: 320px">
        <textarea nz-input placeholder="Reason" [(ngModel)]="reason"></textarea>
      </nz-textarea-count>
    </app-demo>

    <app-demo title="Prefix and clear" description="nz-input-wrapper: กรอบเดียวกับ Input (ขอบ, มุม, สถานะ hover / focus / error / disabled)" [code]="affix" [ts]="imports">
      <nz-input-wrapper nzAllowClear style="width: 240px">
        <span nzInputPrefix nz-icon nzType="heart" nzTheme="fill"></span>
        <input nz-input placeholder="With icon" [(ngModel)]="clearValue" />
      </nz-input-wrapper>
      <nz-input-wrapper nzAllowClear style="width: 240px">
        <span nzInputPrefix nz-icon nzType="heart" nzTheme="fill"></span>
        <input nz-input nzSize="large" placeholder="Large" />
      </nz-input-wrapper>
      <nz-input-wrapper style="width: 240px">
        <span nzInputPrefix nz-icon nzType="heart" nzTheme="fill"></span>
        <input nz-input nzStatus="error" placeholder="Error" />
      </nz-input-wrapper>
      <nz-input-wrapper style="width: 240px">
        <span nzInputPrefix nz-icon nzType="heart" nzTheme="fill"></span>
        <input nz-input placeholder="Disabled" disabled />
      </nz-input-wrapper>
    </app-demo>

    <app-demo title="Search" description="class aibox-search บน nz-input-wrapper = กล่อง 40px (nzSize=&quot;large&quot; = 48px) ไอคอน search 16px · ปุ่ม ค้นหา เป็นปุ่มจาก Button override (aibox-btn-xs / nzSize=&quot;small&quot;)" [code]="search" [ts]="imports">
      <nz-input-wrapper class="aibox-search" nzAllowClear style="width: 320px">
        <span nzInputPrefix nz-icon nzType="search"></span>
        <input nz-input placeholder="Search" [(ngModel)]="searchValue" />
      </nz-input-wrapper>
      <nz-input-wrapper class="aibox-search" style="width: 320px">
        <span nzInputPrefix nz-icon nzType="search"></span>
        <input nz-input nzSize="large" placeholder="Large" />
      </nz-input-wrapper>
      <nz-input-wrapper class="aibox-search" style="width: 320px">
        <span nzInputPrefix nz-icon nzType="search"></span>
        <input nz-input placeholder="Disabled" disabled />
      </nz-input-wrapper>
    </app-demo>

    <app-demo title="Password" description="nz-input-password · ไอคอนตาอยู่ท้ายกล่อง กด เพื่อแสดง / ซ่อน" [code]="password" [ts]="imports">
      <nz-input-password style="width: 320px">
        <input nz-input nzSize="large" placeholder="Password" />
      </nz-input-password>
      <nz-input-password style="width: 320px">
        <input nz-input nzSize="large" nzStatus="error" placeholder="Error" />
      </nz-input-password>
    </app-demo>

    <app-demo title="Input number" description="nz-input-number ใช้กรอบเดียวกับ Input (สูง 40px, nzSize=&quot;large&quot; = 48px, ขอบ มุม สถานะ) · ปุ่มเพิ่ม/ลดเป็นของ ng-zorro (ไม่มีใน Figma)" [code]="number" [ts]="imports">
      <nz-input-number [(ngModel)]="n1" [nzMin]="0" [nzMax]="99" style="width: 160px" />
      <nz-input-number [(ngModel)]="n2" nzSize="large" style="width: 160px" />
      <nz-input-number [ngModel]="3" nzStatus="error" style="width: 160px" />
      <nz-input-number [ngModel]="3" nzDisabled style="width: 160px" />
    </app-demo>

    <app-demo title="Assistive text" description="nzExtra = ข้อความช่วยใต้ช่อง · nzErrorTip = ข้อความ error มีไอคอนนำหน้า · class aibox-form-small บน nz-form-item = ตัวอักษร 12/22 (Figma size small)" [code]="assistive" [ts]="imports">
      <form nz-form nzLayout="vertical" style="width: 320px">
        <nz-form-item>
          <nz-form-label>Label</nz-form-label>
          <nz-form-control nzExtra="Assistive text">
            <input nz-input placeholder="Placeholder" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label>Label</nz-form-label>
          <nz-form-control nzValidateStatus="error" nzErrorTip="Assistive text">
            <input nz-input placeholder="Placeholder" />
          </nz-form-control>
        </nz-form-item>
        <nz-form-item class="aibox-form-small">
          <nz-form-label>Label</nz-form-label>
          <nz-form-control nzValidateStatus="error" nzErrorTip="Assistive text">
            <input nz-input placeholder="Placeholder" />
          </nz-form-control>
        </nz-form-item>
      </form>
    </app-demo>

    <app-css-panel id="input" />
  `,
})
export class InputPage {
  protected name = '';
  protected reason = 'hello';
  protected n1 = 3;
  protected n2 = 10;
  protected clearValue = 'Clear me';
  protected searchValue = 'Placeholder';
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
  protected readonly textarea = `<textarea nz-input placeholder="Textarea"></textarea>
<textarea nz-input nzSize="large" placeholder="Large"></textarea>
<textarea nz-input nzStatus="error" placeholder="Error"></textarea>
<textarea nz-input placeholder="Disabled" disabled></textarea>`;
  protected readonly count = `<nz-textarea-count [nzMaxCharacterCount]="50">
  <textarea nz-input placeholder="Reason" [(ngModel)]="reason"></textarea>
</nz-textarea-count>`;
  protected readonly affix = `<!-- ng-zorro 22. In 18: <nz-input-group nzPrefixIcon="heart"> with [nzSuffix] for the clear icon -->
<nz-input-wrapper nzAllowClear>
  <span nzInputPrefix nz-icon nzType="heart" nzTheme="fill"></span>
  <input nz-input placeholder="With icon" />
</nz-input-wrapper>`;
  protected readonly search = `<!-- ng-zorro 22. In 18: <nz-input-group class="aibox-search" nzPrefixIcon="search" [nzSuffix]="clear"> (register SearchOutline) -->
<nz-input-wrapper class="aibox-search" nzAllowClear>
  <span nzInputPrefix nz-icon nzType="search"></span>
  <input nz-input placeholder="Search" />
</nz-input-wrapper>
<nz-input-wrapper class="aibox-search">
  <span nzInputPrefix nz-icon nzType="search"></span>
  <input nz-input nzSize="large" placeholder="Large" />
</nz-input-wrapper>`;
  protected readonly password = `<!-- ng-zorro 22. In 18: <nz-input-group nzSize="large" [nzSuffix]="eye"> with an eye / eye-invisible icon (register EyeOutline, EyeInvisibleOutline) -->
<nz-input-password>
  <input nz-input nzSize="large" placeholder="Password" />
</nz-input-password>`;
  protected readonly number = `<nz-input-number [(ngModel)]="value" [nzMin]="0" [nzMax]="99" />
<nz-input-number [(ngModel)]="value" nzSize="large" />
<nz-input-number [ngModel]="3" nzStatus="error" />
<nz-input-number [ngModel]="3" nzDisabled />`;
  protected readonly assistive = `<form nz-form nzLayout="vertical">
  <nz-form-item>
    <nz-form-label>Label</nz-form-label>
    <nz-form-control nzExtra="Assistive text"><input nz-input /></nz-form-control>
  </nz-form-item>
  <nz-form-item>
    <nz-form-label>Label</nz-form-label>
    <nz-form-control nzValidateStatus="error" nzErrorTip="Assistive text"><input nz-input /></nz-form-control>
  </nz-form-item>
  <nz-form-item class="aibox-form-small"> <!-- 12/22 text -->
    ...
  </nz-form-item>
</form>`;
}
