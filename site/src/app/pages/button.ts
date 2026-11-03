import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({ imports: [NzButtonModule], /* ... */ })`;

@Component({
  selector: 'app-button-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzIconModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Button">
      <ng-container sub>Figma node <code>1:3414</code> · <code>nz-button</code> ทุก type, danger, subsidiary, 4 ขนาด และ disabled</ng-container>
    </app-page-head>

    <app-demo title="Types" description="outlined (ไม่ใส่ nzType) · contained (primary) · texted (text / link)" [code]="types" [ts]="imports">
      <button nz-button>Outlined</button>
      <button nz-button nzType="primary">Contained</button>
      <button nz-button nzType="text">Texted</button>
      <button nz-button nzType="link">Link</button>
    </app-demo>

    <app-demo title="Danger" description="nzDanger ใช้ได้กับทุก type" [code]="danger" [ts]="imports">
      <button nz-button nzDanger>Outlined</button>
      <button nz-button nzType="primary" nzDanger>Contained</button>
      <button nz-button nzType="text" nzDanger>Texted</button>
    </app-demo>

    <app-demo title="Subsidiary" description="ไม่มีใน ng-zorro ใช้ class aibox-btn-subsidiary" [code]="subsidiary" [ts]="imports">
      <button nz-button class="aibox-btn-subsidiary">Outlined</button>
      <button nz-button nzType="primary" class="aibox-btn-subsidiary">Contained</button>
      <button nz-button nzType="text" class="aibox-btn-subsidiary">Texted</button>
    </app-demo>

    <app-demo title="Sizes" description="xsmall 28 · small 32 · medium 40 (default) · large 48" [code]="sizes" [ts]="imports">
      <button nz-button nzType="primary" class="aibox-btn-xs">X-small</button>
      <button nz-button nzType="primary" nzSize="small">Small</button>
      <button nz-button nzType="primary">Medium</button>
      <button nz-button nzType="primary" nzSize="large">Large</button>
    </app-demo>

    <app-demo title="Disabled" [code]="disabled" [ts]="imports">
      <button nz-button disabled>Outlined</button>
      <button nz-button nzType="primary" disabled>Contained</button>
      <button nz-button nzType="text" disabled>Texted</button>
    </app-demo>

    <app-demo title="With icon" [code]="icon" [ts]="imports">
      <button nz-button nzType="primary"><span nz-icon nzType="check"></span>Confirm</button>
      <button nz-button><span nz-icon nzType="copy"></span>Copy</button>
    </app-demo>

    <app-css-panel id="button" />
  `,
})
export class ButtonPage {
  protected readonly imports = IMPORTS;
  protected readonly types = `<button nz-button>Outlined</button>
<button nz-button nzType="primary">Contained</button>
<button nz-button nzType="text">Texted</button>
<button nz-button nzType="link">Link</button>`;
  protected readonly danger = `<button nz-button nzDanger>Outlined</button>
<button nz-button nzType="primary" nzDanger>Contained</button>
<button nz-button nzType="text" nzDanger>Texted</button>`;
  protected readonly subsidiary = `<button nz-button class="aibox-btn-subsidiary">Outlined</button>
<button nz-button nzType="primary" class="aibox-btn-subsidiary">Contained</button>
<button nz-button nzType="text" class="aibox-btn-subsidiary">Texted</button>`;
  protected readonly sizes = `<button nz-button nzType="primary" class="aibox-btn-xs">X-small</button>
<button nz-button nzType="primary" nzSize="small">Small</button>
<button nz-button nzType="primary">Medium</button>
<button nz-button nzType="primary" nzSize="large">Large</button>`;
  protected readonly disabled = `<button nz-button disabled>Outlined</button>
<button nz-button nzType="primary" disabled>Contained</button>
<button nz-button nzType="text" disabled>Texted</button>`;
  protected readonly icon = `<button nz-button nzType="primary"><span nz-icon nzType="check"></span>Confirm</button>
<button nz-button><span nz-icon nzType="copy"></span>Copy</button>`;
}
