import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CSS_SECTIONS } from '../../generated/data';
import { CodeBlock } from './code-block';

/** The component's slice of ng-zorro-override.css plus the tokens it needs, each copyable. */
@Component({
  selector: 'app-css-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTabsModule, CodeBlock],
  template: `
    <section class="panel">
      <h2>CSS</h2>
      <p class="lead">
        ส่วนของ <code>ng-zorro-override.css</code> ที่ใช้กับ component นี้ ใช้ร่วมกับ <code>tokens.css</code> (หรือคัดลอกเฉพาะ token ที่ใช้จากแท็บ Tokens)
        — {{ lines() }} lines, {{ tokenCount() }} tokens
      </p>
      @if (section().requires?.length) {
        <p class="lead">ส่วนนี้ใช้ต่อยอดจากกฎของ <strong>{{ section().requires!.join(', ') }}</strong> จึงรวมไว้ในโค้ดด้านล่างแล้ว</p>
      }
      <nz-tabs>
        <nz-tab nzTitle="Override CSS">
          <ng-template nz-tab>
            <app-code-block [code]="section().css" lang="css" label="ng-zorro-override.css (this component)" maxHeight="520px" />
          </ng-template>
        </nz-tab>
        <nz-tab nzTitle="Tokens used">
          <ng-template nz-tab>
            <app-code-block [code]="section().tokensCss" lang="css" label="tokens.css (only what this component uses)" maxHeight="520px" />
          </ng-template>
        </nz-tab>
      </nz-tabs>
    </section>
  `,
  styles: `
    .panel { margin-top: var(--aibox-spacing-6); }
    .lead { color: var(--aibox-color-text-secondary); margin: var(--aibox-spacing-1) 0 var(--aibox-spacing-3); }
  `,
})
export class CssPanel {
  readonly id = input.required<string>();
  protected readonly section = computed(() => CSS_SECTIONS[this.id()]);
  protected readonly lines = computed(() => this.section().css.split('\n').length - 1);
  protected readonly tokenCount = computed(() => this.section().tokenNames.length);
}
