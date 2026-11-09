import { ChangeDetectionStrategy, Component, TemplateRef, inject, viewChild } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzMessageService } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({ imports: [NzAlertModule], /* ... */ })
export class Demo { private readonly message = inject(NzMessageService); }`;

type Status = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-message-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzAlertModule, NzButtonModule, NzIconModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Message (snackbar)">
      <ng-container sub>Figma nodes <code>1:10863</code> (snackbar) และ <code>6608:120690</code> (message bar, หน้า Message &amp; Snack Bar) · snackbar = <code>NzMessageService</code> · message bar = <code>nz-alert</code> + <code>aibox-alert-bar</code></ng-container>
    </app-page-head>

    <app-demo title="Snackbar" description="NzMessageService.success / info / warning / error · กดปุ่มเพื่อเรียก (อยู่นอก demo จึงไม่อยู่ใน Relevant CSS ของกล่องนี้)" [code]="snackbar" [ts]="imports">
      @for (s of statuses; track s) {
        <button nz-button (click)="show(s)">{{ s }}</button>
      }
    </app-demo>

    <app-demo title="With action and close" description="ส่ง template เป็นเนื้อหา · aibox-snackbar-action (ปุ่มข้อความ) และ aibox-snackbar-close (xmark 12px) ปิดด้วย message.remove()" [code]="action" [ts]="imports">
      <button nz-button (click)="showAction()">Snackbar + Button</button>
      <ng-template #tpl>
        <span>Message sent</span>
        <button type="button" class="aibox-snackbar-action" (click)="message.remove()">Undo</button>
        <button type="button" class="aibox-snackbar-close" aria-label="Close" (click)="message.remove()"><nz-icon nzType="close" /></button>
      </ng-template>
    </app-demo>

    <app-demo title="Message bar" description="nz-alert + aibox-alert-bar (ข้อความกลาง) · เพิ่ม aibox-alert-bar-left ให้ชิดซ้าย" [code]="bar" [ts]="imports">
      <div class="col">
        <nz-alert class="aibox-alert-bar" nzType="info" nzMessage="Message bar" nzShowIcon nzCloseable />
        <nz-alert class="aibox-alert-bar aibox-alert-bar-left" nzType="info" nzMessage="Message bar (Align left)" nzShowIcon nzCloseable />
      </div>
    </app-demo>

    <app-css-panel id="message" />
  `,
  styles: `.col { display: grid; gap: var(--aibox-spacing-4); width: 100%; }`,
})
export class MessagePage {
  protected readonly message = inject(NzMessageService);
  private readonly tpl = viewChild.required<TemplateRef<any>>('tpl');
  protected readonly imports = IMPORTS;
  protected readonly statuses: Status[] = ['success', 'info', 'warning', 'error'];
  protected readonly snackbar = `this.message.success('Snackbar message');
this.message.info('Snackbar message');
this.message.warning('Snackbar message');
this.message.error('Snackbar message');`;
  protected readonly action = `<ng-template #tpl>
  <span>Message sent</span>
  <button type="button" class="aibox-snackbar-action" (click)="message.remove()">Undo</button>
  <button type="button" class="aibox-snackbar-close" aria-label="Close" (click)="message.remove()"><nz-icon nzType="close" /></button>
</ng-template>

// this.message.info(this.tpl(), { nzDuration: 0 });`;
  protected readonly bar = `<nz-alert class="aibox-alert-bar" nzType="info" nzMessage="Message bar" nzShowIcon nzCloseable />
<nz-alert class="aibox-alert-bar aibox-alert-bar-left" nzType="info" nzMessage="Message bar (Align left)" nzShowIcon nzCloseable />`;

  protected show(s: Status): void {
    this.message.create(s, 'Snackbar message');
  }
  protected showAction(): void {
    this.message.info(this.tpl(), { nzDuration: 0 });
  }
}
