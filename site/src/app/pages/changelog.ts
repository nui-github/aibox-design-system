import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RELEASES } from '../../generated/changelog';
import { REPO_URL } from '../nav';
import { PageHead } from '../shared/page-head';

@Component({
  selector: 'app-changelog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NzButtonModule, NzIconModule, NzTagModule, PageHead],
  template: `
    <app-page-head title="Changelog">
      <ng-container sub>สิ่งที่เปลี่ยนในแต่ละเวอร์ชันของ design system อ่านจาก <code>release-notes/</code> ใน repo</ng-container>
      <a nz-button [href]="repoUrl + '/releases'" target="_blank" rel="noopener"><span nz-icon nzType="book"></span>Releases บน GitHub</a>
    </app-page-head>

    <ol class="timeline">
      @for (r of releases; track r.version; let first = $first) {
        <li class="entry" [id]="'v' + r.version">
          <div class="rail">
            <a class="ver" [routerLink]="[]" [fragment]="'v' + r.version">v{{ r.version }}</a>
            @if (r.date) {
              <time class="date" [attr.datetime]="r.date">{{ formatDate(r.date) }}</time>
            }
          </div>
          <article class="card">
            <header class="card-head">
              <h2>{{ r.title }}</h2>
              @if (first) {
                <nz-tag nzColor="success" class="aibox-tag-square">ล่าสุด</nz-tag>
              }
            </header>
            @if (r.intro) {
              <div class="body" [innerHTML]="r.intro"></div>
            }
            @for (s of r.sections; track s.title) {
              <section class="sec">
                <h3 class="pill" [attr.data-kind]="s.kind">{{ s.title }}</h3>
                <div class="body" [innerHTML]="s.html"></div>
              </section>
            }
          </article>
        </li>
      }
    </ol>
  `,
  styles: `
    .timeline { list-style: none; margin: 0; padding: 0; }
    .entry { display: grid; grid-template-columns: 148px minmax(0, 1fr); gap: var(--aibox-spacing-5); scroll-margin-top: 72px; }
    .entry + .entry { margin-top: var(--aibox-spacing-6); }

    /* Left rail: version, date, and the line that joins the releases. */
    .rail { position: relative; display: flex; flex-direction: column; align-items: flex-end; gap: var(--aibox-spacing-1); padding-top: var(--aibox-spacing-4); }
    .rail::before { content: ''; position: absolute; top: 0; bottom: calc(-1 * var(--aibox-spacing-6)); right: calc(-1 * var(--aibox-spacing-3) - 1px); width: 1px; background: var(--aibox-color-border-primary); }
    .entry:last-child .rail::before { bottom: 0; }
    .rail::after { content: ''; position: absolute; top: calc(var(--aibox-spacing-4) + 9px); right: calc(-1 * var(--aibox-spacing-3) - 5px); width: 9px; height: 9px; border-radius: 50%; background: var(--aibox-color-bg-primary); border: 2px solid var(--aibox-color-bg-main); }
    .entry:first-child .rail::after { background: var(--aibox-color-bg-main); }
    .ver { padding: 1px var(--aibox-spacing-2); border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-tertiary); color: var(--aibox-color-text-main); font-family: var(--doc-mono); font-size: var(--aibox-font-size-additional-xs); font-weight: 500; text-decoration: none; }
    .ver:hover { background: var(--aibox-color-bg-status-info-100); }
    .date { color: var(--aibox-color-text-secondary); font-size: var(--aibox-font-size-additional-xs); }

    .card { border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-primary); padding: var(--aibox-spacing-4) var(--aibox-spacing-5) var(--aibox-spacing-5); }
    .card-head { display: flex; align-items: center; gap: var(--aibox-spacing-2); margin-bottom: var(--aibox-spacing-3); }
    .card-head nz-tag { margin-inline-end: 0; }

    .sec { margin-top: var(--aibox-spacing-4); }
    .pill { display: inline-block; margin-bottom: var(--aibox-spacing-2); padding: 2px var(--aibox-spacing-3); border-radius: 999px; font-size: var(--aibox-font-size-additional-sm); line-height: 20px; font-weight: 500; background: var(--aibox-color-bg-tertiary); color: var(--aibox-color-text-secondary); }
    .pill[data-kind='new'] { background: var(--aibox-color-bg-status-success-100); color: var(--aibox-color-text-status-success-100); }
    .pill[data-kind='fix'] { background: var(--aibox-color-bg-status-info-100); color: var(--aibox-color-text-status-info-100); }
    .pill[data-kind='upgrade'] { background: var(--aibox-color-bg-status-warning-100); color: var(--aibox-color-text-status-warning-100); }

    /* Markdown rendered from release-notes. */
    .body { overflow-wrap: anywhere; }
    :host ::ng-deep .body :is(ul, ol) { margin: 0; padding-left: var(--aibox-spacing-5); }
    :host ::ng-deep .body li { margin-top: var(--aibox-spacing-1); }
    :host ::ng-deep .body li > ul { margin-top: var(--aibox-spacing-1); }
    :host ::ng-deep .body :is(p + p, p + ul, ul + p) { margin-top: var(--aibox-spacing-2); }
    :host ::ng-deep .body .table-wrap { overflow-x: auto; margin-top: var(--aibox-spacing-2); }
    :host ::ng-deep .body table { border-collapse: collapse; min-width: 100%; font-size: var(--aibox-font-size-additional-sm); }
    :host ::ng-deep .body :is(th, td) { padding: var(--aibox-spacing-2) var(--aibox-spacing-3); border: 1px solid var(--aibox-color-border-primary); text-align: left; vertical-align: top; }
    :host ::ng-deep .body th { background: var(--aibox-color-bg-secondary); font-weight: 500; }
    :host ::ng-deep .body pre { margin: var(--aibox-spacing-3) 0 0; padding: var(--aibox-spacing-3); overflow: auto; border: 1px solid var(--aibox-color-border-primary); border-radius: var(--aibox-radius-2); background: var(--aibox-color-bg-secondary); font-family: var(--doc-mono); font-size: 13px; line-height: 20px; }

    @media (max-width: 700px) {
      .entry { grid-template-columns: minmax(0, 1fr); gap: var(--aibox-spacing-2); }
      .rail { flex-direction: row; align-items: center; gap: var(--aibox-spacing-2); padding-top: 0; }
      .rail::before, .rail::after { display: none; }
      .card { padding: var(--aibox-spacing-3) var(--aibox-spacing-4) var(--aibox-spacing-4); }
    }
  `,
})
export class ChangelogPage {
  protected readonly releases = RELEASES;
  protected readonly repoUrl = REPO_URL;

  protected formatDate(iso: string): string {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('th-TH-u-ca-gregory', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
