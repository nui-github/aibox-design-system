import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({ imports: [NzUploadModule], /* ... */ })`;

const THUMB = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='72' height='72'><rect width='72' height='72' fill='%23a0a3ac'/><circle cx='24' cy='26' r='8' fill='%23f1f2f3'/><path d='M0 72l26-28 14 14 12-10 20 24z' fill='%236b707b'/></svg>";

@Component({
  selector: 'app-upload-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzUploadModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Upload">
      <ng-container sub>Figma nodes <code>1516:11121</code> (drop zone), <code>1516:11080</code> (upload-block, หน้า Upload) · <code>nz-upload</code> แบบ drag และรายการไฟล์ loading / error / uploaded / thumbnail</ng-container>
    </app-page-head>

    <app-demo title="Drop zone" description="nzType=&quot;drag&quot; · ใส่ .ant-upload-drag-icon, .ant-upload-text และ .ant-upload-hint" [code]="drag" [ts]="imports">
      <div class="w480">
        <nz-upload nzType="drag" [nzBeforeUpload]="never">
          <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
          <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
          <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
        </nz-upload>
      </div>
    </app-demo>

    <app-demo title="Compact and disabled" description="aibox-upload-compact = ไอคอนกับหัวข้ออยู่แถวเดียวกัน สูง 100px · nzDisabled = ไอคอนและข้อความสีจาง" [code]="states" [ts]="imports">
      <div class="w480 stack">
        <nz-upload class="aibox-upload-compact" nzType="drag" [nzBeforeUpload]="never">
          <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
          <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
          <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
        </nz-upload>
        <nz-upload nzType="drag" nzDisabled [nzBeforeUpload]="never">
          <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
          <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
          <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
        </nz-upload>
      </div>
    </app-demo>

    <app-demo title="File status under the zone" description="aibox-upload-inline บน nz-upload nzType=&quot;drag&quot; + [nzFileList] (Figma state loading / error / completed) · แถวไฟล์ไม่มีกรอบ ห่างโซน 10px · ข้อความผิดพลาดวาง .aibox-upload-error-text ใต้ nz-upload เอง (ng-zorro แสดง file.message เป็น tooltip เท่านั้น) · ปิดปุ่ม preview ด้วย nzShowUploadList" [code]="inline" [ts]="imports">
      <div class="w480 stack">
        <nz-upload class="aibox-upload-inline" nzType="drag" [nzBeforeUpload]="never" [nzFileList]="inlineUploading" [nzShowUploadList]="listOptions">
          <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
          <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
          <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
        </nz-upload>
        <div>
          <nz-upload class="aibox-upload-inline" nzType="drag" [nzBeforeUpload]="never" [nzFileList]="inlineError" [nzShowUploadList]="listOptions">
            <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
            <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
            <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
          </nz-upload>
          <div class="aibox-upload-error-text">{{ errorMessage }}</div>
        </div>
        <nz-upload class="aibox-upload-inline" nzType="drag" [nzBeforeUpload]="never" [nzFileList]="inlineDone" [nzShowUploadList]="listOptions">
          <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
          <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
          <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
        </nz-upload>
      </div>
    </app-demo>

    <app-demo title="File list" description="สถานะ uploading / error / done · nzListType=&quot;picture&quot; แสดง thumbnail" [code]="list" [ts]="imports">
      <div class="w380">
        <nz-upload nzListType="text" [nzFileList]="textList" [nzBeforeUpload]="never" [nzShowUploadList]="listOptions" />
        <nz-upload nzListType="picture" [nzFileList]="pictureList" [nzBeforeUpload]="never" [nzShowUploadList]="listOptions" />
      </div>
    </app-demo>

    <app-css-panel id="upload" />
  `,
  styles: `.w480 { width: 480px; max-width: 100%; } .stack { display: grid; gap: var(--aibox-spacing-4); } .w380 { width: 380px; max-width: 100%; display: grid; gap: var(--aibox-spacing-4); }`,
})
export class UploadPage {
  protected readonly imports = IMPORTS;
  protected readonly never = (): boolean => false;
  protected readonly listOptions = { showPreviewIcon: false, showDownloadIcon: false, showRemoveIcon: true };
  protected readonly textList: NzUploadFile[] = [
    { uid: '1', name: 'filename.png', status: 'uploading', percent: 40 },
    { uid: '2', name: 'filename.jpg', status: 'error', message: 'ขนาดไฟล์ต้องไม่เกิน 10 MB' },
    { uid: '3', name: 'filename.pdf', status: 'done' },
  ];
  protected readonly inlineUploading: NzUploadFile[] = [{ uid: '5', name: 'filename.png', status: 'uploading', percent: 40 }];
  protected readonly inlineError: NzUploadFile[] = [{ uid: '6', name: 'filename.png', status: 'error', message: 'ขนาดไฟล์ต้องไม่เกิน 10 MB' }];
  protected readonly errorMessage = 'ขนาดไฟล์ต้องไม่เกิน 10 MB';
  protected readonly inlineDone: NzUploadFile[] = [{ uid: '7', name: 'filename.png', status: 'done' }];
  protected readonly pictureList: NzUploadFile[] = [
    { uid: '4', name: 'filename.pdf', status: 'done', thumbUrl: THUMB },
  ];
  protected readonly drag = `<nz-upload nzType="drag" [nzBeforeUpload]="beforeUpload">
  <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
  <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
  <p class="ant-upload-hint">รองรับ .pdf, .jpg ,.png จำนวนสูงสุด 20 ไฟล์ และแต่ละไฟล์ต้องไม่เกิน 10MB</p>
</nz-upload>`;
  protected readonly inline = `<nz-upload class="aibox-upload-inline" nzType="drag" [nzBeforeUpload]="beforeUpload"
  [nzFileList]="files" [nzShowUploadList]="{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }">
  <p class="ant-upload-drag-icon"><nz-icon nzType="inbox" /></p>
  <p class="ant-upload-text">คลิกหรือลากไฟล์มาที่นี่</p>
  <p class="ant-upload-hint">...</p>
</nz-upload>
<!-- files = [{ uid, name, status: 'uploading' | 'error' | 'done', message? }] -->

<!-- the reason for an error: ng-zorro shows file.message only as a tooltip, so add this under the nz-upload -->
@if (files[0]?.status === 'error') {
  <div class="aibox-upload-error-text">{{ files[0].message }}</div>
}`;
  protected readonly states = `<nz-upload class="aibox-upload-compact" nzType="drag" [nzBeforeUpload]="beforeUpload">...</nz-upload>
<nz-upload nzType="drag" nzDisabled [nzBeforeUpload]="beforeUpload">...</nz-upload>`;
  protected readonly list = `<nz-upload nzListType="text" [nzFileList]="files" [nzBeforeUpload]="beforeUpload" [nzShowUploadList]="{ showPreviewIcon: false, showDownloadIcon: false }" />
<nz-upload nzListType="picture" [nzFileList]="pictures" [nzBeforeUpload]="beforeUpload" [nzShowUploadList]="{ showPreviewIcon: false, showDownloadIcon: false }" />`;
}
