import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CssPanel } from '../shared/css-panel';
import { Demo } from '../shared/demo';
import { PageHead } from '../shared/page-head';

const IMPORTS = `import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({ imports: [NzEmptyModule], /* ... */ })`;

@Component({
  selector: 'app-empty-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzEmptyModule, NzIconModule, Demo, CssPanel, PageHead],
  template: `
    <app-page-head title="Empty">
      <ng-container sub>Figma node <code>917:5774</code> (Empty, หน้า Empty State) · <code>nz-empty</code> แบบ default / image big / icon</ng-container>
    </app-page-head>

    <app-demo title="Default and image big" description="nzNotFoundImage=&quot;simple&quot; (ถาด 64×40) · เพิ่ม aibox-empty-lg ให้เป็น 128×80" [code]="sizes" [ts]="imports">
      <div class="row">
        <nz-empty nzNotFoundImage="simple" nzNotFoundContent="Empty" />
        <nz-empty class="aibox-empty-lg" nzNotFoundImage="simple" nzNotFoundContent="Empty" />
      </div>
    </app-demo>

    <app-demo title="Icon" description="ส่ง template ที่มีไอคอน 24px เป็น nzNotFoundImage" [code]="icon" [ts]="imports">
      <nz-empty [nzNotFoundImage]="iconTpl" nzNotFoundContent="Empty" />
      <ng-template #iconTpl><nz-icon nzType="question-circle" nzTheme="outline" /></ng-template>
    </app-demo>

    <app-css-panel id="empty" />
  `,
  styles: `.row { display: flex; align-items: flex-end; gap: var(--aibox-spacing-12); }`,
})
export class EmptyPage {
  protected readonly imports = IMPORTS;
  protected readonly sizes = `<nz-empty nzNotFoundImage="simple" nzNotFoundContent="Empty" />
<nz-empty class="aibox-empty-lg" nzNotFoundImage="simple" nzNotFoundContent="Empty" />`;
  protected readonly icon = `<nz-empty [nzNotFoundImage]="iconTpl" nzNotFoundContent="Empty" />
<ng-template #iconTpl><nz-icon nzType="question-circle" nzTheme="outline" /></ng-template>`;
}
