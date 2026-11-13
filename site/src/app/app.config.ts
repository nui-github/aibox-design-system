import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { NZ_DATE_LOCALE, provideNzNativeDateAdapter } from 'ng-zorro-antd/core/time';
import { provideNzI18n, th_TH } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  BookOutline,
  CheckCircleFill,
  CheckOutline,
  CalendarOutline,
  ClockCircleOutline,
  CloseCircleFill,
  CloseOutline,
  CodeOutline,
  CopyOutline,
  DeleteOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  LeftOutline,
  RightOutline,
  DownOutline,
  ExclamationCircleFill,
  GithubOutline,
  HeartFill,
  InboxOutline,
  InfoCircleFill,
  LoadingOutline,
  FileOutline,
  MenuOutline,
  PaperClipOutline,
  PictureOutline,
  QuestionCircleFill,
  QuestionCircleOutline,
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
    // ng-zorro 22 needs a date adapter for the date and time pickers (18.x used date-fns built in).
    provideNzNativeDateAdapter(),
    { provide: NZ_DATE_LOCALE, useValue: 'th-TH' },
    provideNzIcons([
      BookOutline, CalendarOutline, DoubleLeftOutline, DoubleRightOutline, LeftOutline, RightOutline, CheckCircleFill, CheckOutline, ClockCircleOutline, CloseCircleFill, CloseOutline, CodeOutline, CopyOutline,
      DeleteOutline, DownOutline, ExclamationCircleFill, GithubOutline, HeartFill, InboxOutline, InfoCircleFill, LoadingOutline, FileOutline, MenuOutline, PaperClipOutline, PictureOutline, QuestionCircleFill, QuestionCircleOutline, SearchOutline, SmileOutline,
    ]),
  ],
};
