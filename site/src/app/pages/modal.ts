import { ChangeDetectionStrategy, Component, TemplateRef, inject, viewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({ imports: [NzModalModule], /* ... */ })
export class Demo { private readonly modal = inject(NzModalService); }`;

@Component({
  selector: 'app-modal-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzModalModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Modal (dialog)">
      <ng-container sub>Figma nodes <code>1:9994</code> (dialog), <code>1:9973</code> (dialog-alert), <code>1:10235</code> (status-icon), <code>1:10244</code> (dialog-cta, แบบ horizontal) · <code>NzModalService</code></ng-container>
    </app-page-head>

    <ng-template #body><div class="body">Content</div></ng-template>

    <app-demo title="Dialog" description="nzTitle + เนื้อหา + ปุ่มท้าย · nzWidth 800 หรือ 400 · nzClosable=false · aibox-modal-compact = padding มือถือ · aibox-modal-cta-inset = ปุ่มเว้นข้าง 120px (800px)" [code]="dialog" [ts]="imports">
      <button nz-button (click)="open(800, 'aibox-modal-cta-inset')">Base 800px</button>
      <button nz-button (click)="open(400, '')">Small 400px</button>
      <button nz-button (click)="open(400, 'aibox-modal-compact')">Small, compact padding</button>
    </app-demo>

    <app-demo title="Dialog alert" description="NzModalService.confirm / success / info / warning / error · 400px · ไอคอนสถานะ 32px" [code]="alerts" [ts]="imports">
      <button nz-button (click)="alert('confirm')">confirm</button>
      <button nz-button (click)="alert('success')">success</button>
      <button nz-button (click)="alert('info')">info</button>
      <button nz-button (click)="alert('warning')">warning</button>
      <button nz-button (click)="alert('error')">error</button>
    </app-demo>

    <app-css-panel id="modal" />
  `,
  styles: `.body { height: 280px; border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-disable); }`,
})
export class ModalPage {
  private readonly modal = inject(NzModalService);
  private readonly body = viewChild.required<TemplateRef<any>>('body');
  protected readonly imports = IMPORTS;
  protected readonly dialog = `this.modal.create({
  nzTitle: 'Title',
  nzContent: this.content(),          // TemplateRef or component
  nzWidth: 800,                       // 400 for the small dialog
  nzClosable: false,
  nzClassName: 'aibox-modal-cta-inset', // 'aibox-modal-compact' for mobile padding
  nzOkText: 'Button',
  nzCancelText: 'Button',
});`;
  protected readonly alerts = `this.modal.success({ nzTitle: 'Title', nzContent: 'Supporting text', nzWidth: 400 });
// confirm / info / warning / error work the same; confirm has Cancel + OK
this.modal.confirm({ nzTitle: 'Title', nzContent: 'Supporting text', nzWidth: 400, nzOkText: 'Button', nzCancelText: 'Button' });`;

  protected open(width: number, nzClassName: string): void {
    this.modal.create({ nzTitle: 'Title', nzContent: this.body(), nzWidth: width, nzClosable: false, nzClassName, nzOkText: 'Button', nzCancelText: 'Button' });
  }
  protected alert(type: 'confirm' | 'success' | 'info' | 'warning' | 'error'): void {
    const opts = { nzTitle: 'Title', nzContent: 'Supporting text', nzWidth: 400, nzOkText: 'Button', nzCancelText: 'Button' };
    if (type === 'confirm') this.modal.confirm(opts);
    else this.modal[type](opts);
  }
}
