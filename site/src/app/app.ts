import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationSkipped, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { META } from '../generated/meta';
import { SearchBox } from './shared/search';
import { COMPONENTS, DOC_URL } from './nav';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, NzLayoutModule, NzMenuModule, NzIconModule, NzButtonModule, NzTagModule, SearchBox],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly meta = META;
  protected readonly components = COMPONENTS;
  protected readonly docUrl = DOC_URL;
  protected readonly collapsed = signal(true);
  /**
   * The menu item that was just clicked. nzMatchRouter only marks an item selected once the navigation ends (after the page's
   * chunk has loaded), so the clicked item is shown as active straight away and cleared when the navigation finishes.
   */
  protected readonly pending = signal<string | null>(null);

  private readonly router = inject(Router);

  /** Called on a menu click. Clicking the page that is already open does not navigate, so there is nothing to wait for. */
  protected go(path: string) {
    if (this.router.url.split(/[?#]/)[0] !== path) this.pending.set(path);
  }

  constructor() {
    const sub = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError || e instanceof NavigationSkipped) {
        this.pending.set(null);
      }
    });
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }
}
