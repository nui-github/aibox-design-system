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
      <p class="p">ใส่ลิงก์ของ release ที่ต้องการ <strong>ระบุเวอร์ชันตายตัวเสมอ</strong> (ห้ามใช้ <code>&#64;main</code> หรือ <code>&#64;latest</code> เพราะ cache นานและเปลี่ยนใต้เท้าได้)</p>
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
    ['aibox-tag-xs / -md / -lg', 'nz-tag', 'ขนาด 2xsmall / medium / large'],
    ['aibox-tag-disabled', 'nz-tag nzMode="checkable"', 'หน้าตา disabled (ต้องกันคลิกเอง)'],
  ];
  protected readonly compat: string[][] = [
    ['18.2.x', 'เวอร์ชันที่ Ai-BOX ใช้ และที่ override ถูกพัฒนา/ทดสอบด้วย (automated computed-style tests)'],
    [META.nzVersion, 'เวอร์ชันล่าสุด ณ ตอนนี้ — เว็บนี้ render ด้วยเวอร์ชันนี้ และ automated tests ชุดเดียวกันผ่าน'],
  ];
}
