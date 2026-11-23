import { ViewportScroller } from '@angular/common';
import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { NavigationError, PreloadAllModules, provideRouter, withInMemoryScrolling, withNavigationErrorHandler, withPreloading } from '@angular/router';
import { NZ_DATE_LOCALE, provideNzNativeDateAdapter } from 'ng-zorro-antd/core/time';
import { provideNzI18n, th_TH } from 'ng-zorro-antd/i18n';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  BookOutline,
  CaretDownFill,
  CaretRightFill,
  CheckCircleFill,
  CheckOutline,
  CalendarOutline,
  ClockCircleOutline,
  CloseCircleFill,
  CloseOutline,
  CodeOutline,
  CopyOutline,
  DeleteOutline, DownloadOutline, UploadOutline, EyeInvisibleOutline, EyeOutline,
  DoubleLeftOutline,
  DoubleRightOutline,
  LeftOutline,
  RightOutline,
  DownOutline,
  ExclamationCircleFill,
  GithubOutline,
  HeartFill,
  UserOutline,
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

/**
 * After a new deploy the page chunks get new file names, so a tab that is still open on the old build cannot load a page
 * ("Failed to fetch dynamically imported module") and the menu looks dead until a refresh. Reload to the clicked page once;
 * the guard stops a reload loop when the chunk is really missing.
 */
const CHUNK_ERROR = /dynamically imported module|importing a module script failed|unable to preload css/i;
const RELOAD_KEY = 'aibox-chunk-reload';
function reloadOnStaleChunk(e: NavigationError): void {
  if (CHUNK_ERROR.test(String((e.error as Error | undefined)?.message ?? e.error))) {
    try {
      const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
      if (Date.now() - last > 10_000) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        location.assign(e.url);
        return;
      }
    } catch {
      // sessionStorage blocked: fall through and report the error instead of risking a reload loop.
    }
  }
  throw e.error;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // anchor links (#chip) should stop below the sticky header
    provideAppInitializer(() => inject(ViewportScroller).setOffset([0, 80])),
    // Every page is a lazy chunk; fetch them in the background after the first page so a menu click does not wait for the network.
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }), withPreloading(PreloadAllModules), withNavigationErrorHandler(reloadOnStaleChunk)),
    // ng-zorro defaults to zh_CN (Chinese labels); the docs are Thai.
    provideNzI18n(th_TH),
    // ng-zorro 22 needs a date adapter for the date and time pickers (18.x used date-fns built in).
    provideNzNativeDateAdapter(),
    { provide: NZ_DATE_LOCALE, useValue: 'th-TH' },
    provideNzIcons([
      BookOutline, CaretDownFill, CaretRightFill, CalendarOutline, DoubleLeftOutline, DoubleRightOutline, LeftOutline, RightOutline, CheckCircleFill, CheckOutline, ClockCircleOutline, CloseCircleFill, CloseOutline, CodeOutline, CopyOutline,
      DeleteOutline, DownloadOutline, UploadOutline, EyeInvisibleOutline, EyeOutline, DownOutline, ExclamationCircleFill, GithubOutline, HeartFill, UserOutline, InboxOutline, InfoCircleFill, LoadingOutline, FileOutline, MenuOutline, PaperClipOutline, PictureOutline, QuestionCircleFill, QuestionCircleOutline, SearchOutline, SmileOutline,
    ]),
  ],
};
