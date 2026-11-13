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
  { path: 'drawer', title: 'Drawer', figma: '3927:8405, 3745:12936' },
  { path: 'table', title: 'Table', figma: '3631:1869, 8794:180479' },
  { path: 'upload', title: 'Upload', figma: '1516:11121, 1516:11080' },
  { path: 'date-picker', title: 'Date picker', figma: '1347:23603, 4558:7666' },
  { path: 'time-picker', title: 'Time picker', figma: '1612:3566, 1613:9223' },
  { path: 'tree', title: 'Tree', figma: '9718:69790, 4267:9343' },
  { path: 'cascader', title: 'Cascader', figma: '4268:12892, 4268:13151' },
  { path: 'badge', title: 'Badge (notification)', figma: '1175:641' },
];
