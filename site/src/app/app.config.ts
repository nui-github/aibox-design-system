import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideNzI18n, th_TH } from 'ng-zorro-antd/i18n';
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
  ExclamationCircleFill,
  GithubOutline,
  HeartFill,
  InfoCircleFill,
  LoadingOutline,
  MenuOutline,
  QuestionCircleFill,
  SearchOutline,
  SmileOutline,
} from '@ant-design/icons-angular/icons';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })),
    // ng-zorro defaults to zh_CN (Chinese labels); the docs are Thai.
    provideNzI18n(th_TH),
    provideNzIcons([
      BookOutline, CheckCircleFill, CheckOutline, ClockCircleOutline, CloseCircleFill, CloseOutline, CodeOutline, CopyOutline,
      DownOutline, ExclamationCircleFill, GithubOutline, HeartFill, InfoCircleFill, LoadingOutline, MenuOutline, QuestionCircleFill, SearchOutline, SmileOutline,
    ]),
  ],
};
