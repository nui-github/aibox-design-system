import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  BookOutline,
  CheckCircleFill,
  CheckOutline,
  ClockCircleOutline,
  CloseCircleFill,
  CloseOutline,
  CodeOutline,
  CopyOutline,
  DownOutline,
  GithubOutline,
  HeartFill,
  InfoCircleFill,
  LoadingOutline,
  MenuOutline,
  SearchOutline,
  SmileOutline,
} from '@ant-design/icons-angular/icons';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })),
    provideNzIcons([
      BookOutline, CheckCircleFill, CheckOutline, ClockCircleOutline, CloseCircleFill, CloseOutline, CodeOutline, CopyOutline,
      DownOutline, GithubOutline, HeartFill, InfoCircleFill, LoadingOutline, MenuOutline, SearchOutline, SmileOutline,
    ]),
  ],
};
