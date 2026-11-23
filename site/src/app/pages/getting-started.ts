import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { META } from '../../generated/meta';
import { COMPONENTS, REPO_URL } from '../nav';
import { CodeBlock } from '../shared/code-block';
import { PageHead } from '../shared/page-head';

const CDN = `https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@${META.dsVersion}/dist`;

@Component({
  selector: 'app-getting-started',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzButtonModule, NzIconModule, NzTableModule, CodeBlock, PageHead],
  template: `
    <app-page-head title="Ai-BOX Design System">
      <ng-container sub>
        design token จาก Figma และ CSS override ของ ng-zorro-antd ที่ทำให้ component หน้าตาตรงกับ design system ส่งผ่าน CDN (jsDelivr) —
        โปรเจ็คแค่ใส่ลิงก์ 2 บรรทัด ไม่ต้อง copy CSS เข้า repo
      </ng-container>
      <a nz-button nzType="primary" [href]="repo" target="_blank" rel="noopener"><span nz-icon nzType="github"></span>GitHub repository</a>
      <a nz-button [href]="repo + '/releases'" target="_blank" rel="noopener"><span nz-icon nzType="book"></span>Releases</a>
    </app-page-head>

    <section id="install">
      <h2>1. ติดตั้ง</h2>
      <p class="p">ใส่ลิงก์ของ release ที่ต้องการ <strong>ระบุเวอร์ชันตายตัวเสมอ</strong> (ห้ามใช้ <code>&#64;main</code> หรือ <code>&#64;latest</code> เพราะ CDN เก็บ cache ไว้นาน และไฟล์ที่ลิงก์ชี้อยู่จะเปลี่ยนตามเวอร์ชันใหม่โดยไม่แจ้ง ทำให้หน้าตาในแอปเปลี่ยนเองโดยไม่รู้ตัว)</p>
      <app-code-block [code]="cdnLinks" lang="xml" label="HTML" maxHeight="none" />
    </section>

    <section id="order">
      <h2>2. ลำดับการโหลด</h2>
      <p class="p">
        override ต้องโหลด <strong>หลัง</strong> CSS ของ ng-zorro-antd เสมอ ใน Angular CLI ไฟล์ styles จาก <code>angular.json</code> จะถูกแทรกไว้ท้าย <code>&lt;head&gt;</code>
        ดังนั้นให้วางลิงก์ไว้ท้าย <code>&lt;body&gt;</code> ของ <code>src/index.html</code>:
      </p>
      <app-code-block [code]="indexHtml" lang="xml" label="src/index.html" maxHeight="none" />
      <p class="p">
        ถ้าไม่ต้องการพึ่ง CDN (offline / build เอง) ให้ดาวน์โหลด 2 ไฟล์ไปไว้ใน repo แล้วใส่ใน <code>styles</code> ต่อจาก ng-zorro:
      </p>
      <app-code-block [code]="angularJson" lang="typescript" label="angular.json" maxHeight="none" />
    </section>

    <section id="font">
      <h2>3. ฟอนต์</h2>
      <p class="p">token ใช้ฟอนต์ <code>IBM Plex Sans Thai</code> (<code>--aibox-font-family-heading-and-body</code>) โปรเจ็คต้องโหลดฟอนต์เอง:</p>
      <app-code-block [code]="font" lang="xml" label="HTML" maxHeight="none" />
    </section>

    <section id="usage">
      <h2>4. ใช้งาน</h2>
      <p class="p">
        ใช้ component ของ ng-zorro-antd ตามปกติ ไม่ต้องเปลี่ยนโค้ด — หน้าตาจะถูก override อัตโนมัติ ส่วนที่ ng-zorro ไม่มีให้ (เช่น ปุ่ม subsidiary, switch แบบ iOS)
        ใช้ <strong>class เสริม</strong> ที่ขึ้นต้นด้วย <code>aibox-</code> ดูตัวอย่างและโค้ดของแต่ละ component ในเมนูด้านซ้าย
      </p>
      <app-code-block [code]="usage" lang="xml" label="Angular template" maxHeight="none" />
      <p class="p">token ทุกตัวใช้ได้ในสไตล์ของโปรเจ็คเอง: <code>color: var(--aibox-color-text-main)</code> — ดูรายการทั้งหมดที่ <a routerLink="/tokens">Tokens</a></p>
    </section>

    <section id="classes">
      <h2>Class เสริม (opt-in)</h2>
      <nz-table #t [nzData]="classes" nzSize="small" [nzShowPagination]="false" [nzFrontPagination]="false">
        <thead><tr><th>Class</th><th>ใช้กับ</th><th>ผล</th></tr></thead>
        <tbody>
          @for (c of t.data; track c[0]) {
            <tr><td><code>{{ c[0] }}</code></td><td>{{ c[1] }}</td><td>{{ c[2] }}</td></tr>
          }
        </tbody>
      </nz-table>
    </section>

    <section id="compat">
      <h2>เวอร์ชันที่รองรับ</h2>
      <nz-table [nzData]="compat" nzSize="small" [nzShowPagination]="false" [nzFrontPagination]="false">
        <thead><tr><th>ng-zorro-antd</th><th>สถานะ</th></tr></thead>
        <tbody>
          @for (c of compat; track c[0]) {
            <tr><td><code>{{ c[0] }}</code></td><td>{{ c[1] }}</td></tr>
          }
        </tbody>
      </nz-table>
    </section>

    <section id="components">
      <h2>Components</h2>
      <ul class="list">
        @for (c of components; track c.path) {
          <li><a [routerLink]="'/' + c.path">{{ c.title }}</a> <span class="fg">Figma {{ c.figma }}</span></li>
        }
      </ul>
    </section>
  `,
  styles: `
    section { margin-top: var(--aibox-spacing-8); }
    section h2 { margin-bottom: var(--aibox-spacing-3); }
    .p { margin-bottom: var(--aibox-spacing-3); max-width: 760px; }
    .list { padding-left: var(--aibox-spacing-5); display: grid; gap: var(--aibox-spacing-1); }
    .fg { color: var(--aibox-color-text-secondary); font-size: var(--aibox-font-size-additional-xs); margin-left: var(--aibox-spacing-2); }
  `,
})
export class GettingStarted {
  protected readonly repo = REPO_URL;
  protected readonly components = COMPONENTS;
  protected readonly cdnLinks = `<link rel="stylesheet" href="${CDN}/tokens.css">
<link rel="stylesheet" href="${CDN}/ng-zorro-override.css">`;
  protected readonly indexHtml = `<body>
  <app-root></app-root>

  <!-- after ng-zorro-antd's styles (Angular puts them at the end of <head>) -->
  <link rel="stylesheet" href="${CDN}/tokens.css">
  <link rel="stylesheet" href="${CDN}/ng-zorro-override.css">
</body>`;
  protected readonly angularJson = `"styles": [
  "node_modules/ng-zorro-antd/ng-zorro-antd.min.css",
  "src/styles/aibox/tokens.css",
  "src/styles/aibox/ng-zorro-override.css",
  "src/styles.css"
]`;
  protected readonly font = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap" rel="stylesheet">`;
  protected readonly usage = `<button nz-button nzType="primary">Save</button>
<button nz-button class="aibox-btn-subsidiary">Cancel</button>
<nz-switch class="aibox-switch-ios" [(ngModel)]="enabled" />
<nz-tag nzColor="success">Approved</nz-tag>`;
  protected readonly classes: string[][] = [
    ['aibox-btn-subsidiary', 'nz-button', 'ปุ่ม subsidiary (ทุก type)'],
    ['aibox-btn-xs', 'nz-button', 'ขนาด xsmall (24px)'],
    ['aibox-sm / aibox-lg', 'nz-checkbox, nz-radio (label)', 'ขนาด small / large'],
    ['aibox-error', 'nz-checkbox, nz-radio (label)', 'สถานะ error'],
    ['aibox-multiple', 'nz-checkbox ที่ checked', 'กล่องน้ำเงินมีขีดกลาง'],
    ['aibox-switch-mobile', 'nz-switch', 'ขนาด 50×25'],
    ['aibox-switch-ios', 'nz-switch', 'สไตล์ iOS 51×31'],
    ['aibox-switch-icons', 'nz-switch', 'ไอคอน ✓ / ✕ ในราง'],
    ['aibox-tag-solid', 'nz-tag', 'พื้นเข้ม ตัวอักษรขาว'],
    ['aibox-tag-square', 'nz-tag', 'มุม 4px (ค่าเริ่มต้นเป็นแคปซูล)'],
    ['aibox-tag-black', 'nz-tag', 'สีเทาเข้ม ตัวอักษรขาว (Figma tag/closable color=black) ใช้กับ nzMode="closeable" ได้'],
    ['aibox-tag-naming (-sm)', 'nz-tag (มักใช้กับ nzMode="closeable")', 'แท็กชื่อคน: avatar กลมชิดซ้าย (aibox-tag-avatar) 30px หรือ 24px กับ -sm และชื่อที่ครอบด้วย aibox-tag-name ตัดที่ 120px'],
    ['aibox-avatar-blue / -sea / -gray / -yellow / -red', 'aibox-tag-avatar (ใน nz-tag หรือ nz-select)', 'สีของ avatar กลมตาม Figma Avatar (ค่าเริ่มต้นเป็นน้ำเงิน)'],
    ['aibox-select-naming', 'nz-select nzMode="multiple" + [nzCustomTemplate]', 'แท็กชื่อคน (avatar + ชื่อ) ใน Select หลายค่า: สูง 24px ขนาดปกติ, 30px กับ nzSize="large"'],
    ['aibox-select-list', 'nz-select + aibox-select-naming', 'มุมมองรายการของ Tag Selection: หนึ่งแท็กต่อบรรทัด กว้างเต็มกล่อง ชื่อดันปุ่ม × ไปชิดขวา (ไม่ใส่ = มุมมองคอลัมน์ แท็กเรียงต่อกัน)'],
    ['aibox-select-scroll', 'nz-select nzMode="multiple"', 'กล่องสูงสุด 456px แล้วเลื่อน (scrollbar 4px ตาม Figma) ปรับความสูงด้วย style="--_select-max-h: 340px"'],
    ['aibox-tag-xs / -md / -lg', 'nz-tag', 'ขนาด 2xsmall / medium / large'],
    ['aibox-badge-sm / aibox-badge-lg', 'nz-badge', 'ขนาด small / large (Medium เป็นค่าเริ่มต้น)'],
    ['aibox-badge-icon', 'nz-badge', 'badge ไอคอนวงกลมสีน้ำเงิน (ใช้กับ [nzCount] เป็น template)'],
    ['aibox-tabs-fill', 'nz-tabs', 'แท็บแบ่งความกว้างเท่ากัน'],
    ['aibox-tab-icon (+ -error / -success)', 'element ในหัวข้อแท็บ', 'ไอคอนจุด 12px / ไอคอนสถานะ error, success'],
    ['aibox-tooltip-light / -blue', 'nzTooltipOverlayClassName', 'tooltip สีขาว / ฟ้าอ่อน (มุม 8px)'],
    ['aibox-tooltip-sm / -xs', 'nzTooltipOverlayClassName', 'ขนาด small (padding 14) / xsmall (ตัวอักษร 12px)'],
    ['aibox-divider-s / -m / -m24 / -l', 'nz-divider', 'แถบหนา 5px (margin 10 / 18 / 24) และแถบ 10px สีเทา (margin 18)'],
    ['aibox-alert-shadow / -inset', 'nz-alert', 'เงายกลอย / ระยะห่างขอบ 16px (ใช้ร่วมกันได้)'],
    ['aibox-snackbar-action / -close', 'ปุ่มใน template ของ NzMessageService', 'ปุ่มข้อความ / ปุ่มปิด (xmark 12px) ท้าย snackbar'],
    ['aibox-alert-bar / -bar-left', 'nz-alert', 'message bar แถบเทา ข้อความกลาง / ชิดซ้าย'],
    ['aibox-modal-compact / aibox-modal-cta-inset', 'nz-modal (nzClassName)', 'padding แบบมือถือ (24 16 20) / ปุ่มท้าย dialog เว้นข้าง 120px (dialog 800px)'],
    ['aibox-empty-lg', 'nz-empty', 'ถาดใหญ่ 128×80 (image big)'],
    ['aibox-scrollbar', 'element ที่เลื่อนได้ (overflow: auto)', 'scrollbar 4px สี i-BOX (Chromium / Safari; Firefox ได้แบบ thin สีเดียวกัน)'],
    ['aibox-btn-nopad', 'nz-button', 'ไม่มี padding ซ้าย-ขวา (texted "without padding" ที่ใช้ในแถวของตาราง)'],
    ['aibox-card-menu', 'nz-card', 'การ์ดทางลัดเมนู: ไอคอน + ข้อความ จัดกลางการ์ด'],
    ['aibox-upload-compact', 'nz-upload (nzType="drag")', 'drop zone ความสูง 100px (Figma reduce-height): ไอคอนติดหัวข้อในแถวเดียวกัน (ไม่มีช่องว่าง) อยู่กึ่งกลางกล่อง คำอธิบายอยู่ใต้แถวนั้น'],
    ['aibox-upload-inline', 'nz-upload nzType="drag" + [nzFileList]', 'แถวไฟล์ใต้ drop zone แบบไม่มีกรอบ (Figma state loading / error / completed): ห่างโซน 10px, ไอคอน + ชื่อ 16/26 + ปุ่มลบ 32px, สีฟ้า (แดงเมื่อ error) · ปิดปุ่ม preview ด้วย [nzShowUploadList]="{ showPreviewIcon: false }"'],
    ['aibox-upload-error-text', 'element ใต้ nz-upload', 'บรรทัดข้อความผิดพลาดของไฟล์ (ไอคอนวงกลมอัศเจรีย์ + ข้อความ 14/24 สีแดง) ng-zorro แสดง file.message เป็น tooltip เท่านั้น จึงวางเอง'],
    ['aibox-upload-file', 'nz-upload ไม่มี drop zone + [nzFileList]', 'ไฟล์ในกล่อง compact (Figma loading compact / completed compact / completed with download / validation error): กล่อง 480 x 69px (error 72px) กรอบ 1px, แถวไฟล์ข้างใน, ปุ่มดาวน์โหลดด้วย showDownloadIcon'],
    ['aibox-upload-file-invalid', 'nz-upload.aibox-upload-file ที่ไฟล์ done', 'สไตล์ error (กรอบ ไอคอน ชื่อ ปุ่มสีแดง สูง 72px) สำหรับไฟล์ที่อัปโหลดแล้วแต่ไม่ผ่านการตรวจ และยังมีปุ่มดาวน์โหลด (validation error with download)'],
    ['aibox-upload-file-reupload / aibox-upload-file-action', 'div ครอบ nz-upload.aibox-upload-file + nz-upload ตัวที่สองที่เป็นปุ่ม', 'state reupload: ปุ่ม texted "อัปโหลดใหม่" อยู่ก่อนปุ่มลบ (ng-zorro ไม่มีปุ่มนี้ในแถวไฟล์)'],
    ['aibox-search', 'nz-input-wrapper (22) / nz-input-group (18) with a search prefix icon', 'ช่องค้นหา: กล่อง 40px (nzSize="large" = 48px) ไอคอน 16px'],
    ['aibox-form-small', 'nz-form-item', 'บังคับ label, ข้อความช่วย และตัวนับของ textarea เป็น 12/22 (ค่าเริ่มต้นของช่องขนาดปกติอยู่แล้ว)'],
    ['aibox-form-large', 'nz-form-item', 'บังคับ label, ข้อความช่วย และตัวนับของ textarea เป็น 14/24 (ปกติเป็นเองเมื่อมีช่อง nzSize="large")'],
    ['aibox-option (-icon / -text / -title / -desc)', 'nzOptionRender ของ nz-cascader', 'แถวสองบรรทัด: ไอคอนซ้าย หัวข้อ และคำอธิบาย (สูง 74px)'],
    ['aibox-tag-disabled', 'nz-tag nzMode="checkable"', 'หน้าตา disabled (ต้องกันคลิกเอง)'],
  ];
  protected readonly compat: string[][] = [
    ['18.2.x', 'เวอร์ชันที่ Ai-BOX ใช้ และที่ override ถูกพัฒนา/ทดสอบด้วย (automated computed-style tests)'],
    ['19.3.1', 'ตรวจแล้ว: วัดขนาด สี ขอบ ตัวอักษรของทุก component เทียบกับ 22 ได้ค่าเท่ากัน · เว็บนี้รันบน 19 ไม่ได้ (ใช้ nz-tabs / nz-input-wrapper / nz-input-password)'],
    ['20.4.4', 'ตรวจแล้ว: วัดขนาด สี ขอบ ตัวอักษรของทุก demo เทียบกับ 22 ได้ค่าเท่ากัน (แก้ Tab และ Cascader ใน v0.34.0) · 20.x อื่นยังไม่ได้ตรวจ'],
    ['21.3.3', 'ตรวจแล้ว: วัดขนาด สี ขอบ ตัวอักษรของทุก demo เทียบกับ 22 ได้ค่าเท่ากันทุกหน้า (แตกต่างเฉพาะ API: nzBorderless ใช้ไม่ได้แล้ว ต้องใช้ nzVariant)'],
    [META.nzVersion, 'เวอร์ชันล่าสุด ณ ตอนนี้ — เว็บนี้ render ด้วยเวอร์ชันนี้ และ automated tests ชุดเดียวกันผ่าน'],
  ];
}
