import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { META } from '../generated/meta';
import { COMPONENTS, REPO_URL } from './nav';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, NzLayoutModule, NzMenuModule, NzIconModule, NzButtonModule, NzTagModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly meta = META;
  protected readonly components = COMPONENTS;
  protected readonly repoUrl = REPO_URL;
  protected readonly releaseUrl = `${REPO_URL}/releases/tag/v${META.dsVersion}`;
  protected readonly collapsed = signal(true);
}
