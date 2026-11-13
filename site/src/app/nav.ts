export interface NavItem {
  path: string;
  title: string;
  /** Figma node(s) the override was built from. */
  figma?: string;
}

export const REPO_URL = 'https://github.com/nui-github/aibox-design-system';

export const COMPONENTS: NavItem[] = [
  { path: 'button', title: 'Button', figma: '1:3414' },
  { path: 'input', title: 'Input', figma: '1:7052' },
  { path: 'checkbox-radio', title: 'Checkbox & Radio', figma: '1:5323, 1:5408' },
  { path: 'select', title: 'Select', figma: '1592:6210, 1:7137, 1:7626' },
  { path: 'switch', title: 'Switch', figma: '1286:2284, 1:5516' },
  { path: 'tag', title: 'Tag (status badge)', figma: '1:10717' },
  { path: 'chip-filter', title: 'Chip (filter)', figma: '1:10199' },
  { path: 'pagination', title: 'Pagination', figma: '3451:10970' },
  { path: 'tab', title: 'Tab', figma: '4033:17725' },
  { path: 'tooltip', title: 'Tooltip', figma: '1145:1157, 1145:1219' },
  { path: 'breadcrumb', title: 'Breadcrumb', figma: '1:11308, 7762:53685' },
  { path: 'divider', title: 'Divider', figma: '1174:444' },
  { path: 'alert', title: 'Alert', figma: '1:10675' },
  { path: 'message', title: 'Message (snackbar)', figma: '1:10863, 6608:120690' },
  { path: 'modal', title: 'Modal (dialog)', figma: '1:9994, 1:9973' },
  { path: 'empty', title: 'Empty', figma: '917:5774' },
  { path: 'dropdown', title: 'Dropdown menu', figma: '1346:1358, 5728:10508' },
  { path: 'scrollbar', title: 'Scrollbar', figma: '6903:54, 7024:6514' },
  { path: 'badge', title: 'Badge (notification)', figma: '1175:641' },
];
