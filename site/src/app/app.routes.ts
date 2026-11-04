import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'getting-started' },
  { path: 'getting-started', title: 'Getting started · Ai-BOX Design System', loadComponent: () => import('./pages/getting-started').then((m) => m.GettingStarted) },
  { path: 'tokens', title: 'Tokens · Ai-BOX Design System', loadComponent: () => import('./pages/tokens').then((m) => m.Tokens) },
  { path: 'button', title: 'Button · Ai-BOX Design System', loadComponent: () => import('./pages/button').then((m) => m.ButtonPage) },
  { path: 'input', title: 'Input · Ai-BOX Design System', loadComponent: () => import('./pages/input').then((m) => m.InputPage) },
  { path: 'checkbox-radio', title: 'Checkbox & Radio · Ai-BOX Design System', loadComponent: () => import('./pages/checkbox-radio').then((m) => m.CheckboxRadioPage) },
  { path: 'select', title: 'Select · Ai-BOX Design System', loadComponent: () => import('./pages/select').then((m) => m.SelectPage) },
  { path: 'switch', title: 'Switch · Ai-BOX Design System', loadComponent: () => import('./pages/switch').then((m) => m.SwitchPage) },
  { path: 'tag', title: 'Tag · Ai-BOX Design System', loadComponent: () => import('./pages/tag').then((m) => m.TagPage) },
  { path: 'chip-filter', title: 'Chip (filter) · Ai-BOX Design System', loadComponent: () => import('./pages/chip-filter').then((m) => m.ChipFilterPage) },
  { path: 'badge', title: 'Badge · Ai-BOX Design System', loadComponent: () => import('./pages/badge').then((m) => m.BadgePage) },
  { path: 'pagination', title: 'Pagination · Ai-BOX Design System', loadComponent: () => import('./pages/pagination').then((m) => m.PaginationPage) },
  { path: '**', redirectTo: 'getting-started' },
];
