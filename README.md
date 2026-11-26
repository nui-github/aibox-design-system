# aibox-design-system

Design tokens (from Figma) and ng-zorro-antd CSS overrides for Ai-BOX, served from jsDelivr.

## Use in a project
Load **after** ng-zorro-antd's own styles, and pin an exact version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.47.0/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.47.0/dist/ng-zorro-override.css">
```

Never use `@main` (cached ~12h, can change under you). Developed and tested against ng-zorro-antd 18.2.x (the Ai-BOX version); the docs site renders every component with 22.1.2, and 20.4.4 was checked too (see the sections at the end). 19.3.1 and 21.3.3 were checked too (see the last section). Other patch versions of 19.x, 20.x and 21.x are not tested.

## Docs site
Live previews, install guide and per-component code/CSS (copyable) live in [`site/`](site) (Angular + ng-zorro-antd, deployed on Vercel). See [site/README.md](site/README.md).

## Components

### Button (Figma node `1:3414`)
Use ng-zorro `nz-button` as usual; the override restyles it to match Figma.

| Figma | ng-zorro |
|---|---|
| type = outlined | `<button nz-button>` (no `nzType`) |
| type = contained | `nzType="primary"` |
| type = texted | `nzType="text"` (or `"link"`) |
| name = standard | (default) |
| name = danger | `nzDanger` |
| name = subsidiary | `class="aibox-btn-subsidiary"` (not in ng-zorro) |
| size = small / medium / large | `nzSize="small"` / (default) / `nzSize="large"` |
| size = xsmall | `class="aibox-btn-xs"` (not in ng-zorro) |
| state = hovered | `:hover` and `:active` (Figma "hovered" uses the `*-press` tokens) |
| state = disabled | `[disabled]` |

```html
<button nz-button nzType="primary">Save</button>
<button nz-button nzType="primary" nzDanger>Delete</button>
<button nz-button class="aibox-btn-subsidiary" nzSize="small">Cancel</button>
<button nz-button nzType="text" class="aibox-btn-xs">More</button>
```
Not covered yet: `contained-white`, `without padding`, dark mode, loading, round/circle. Sizes follow the Figma names, so the default ng-zorro button is **40px (Figma medium)**, not ng-zorro's usual 32px.

### Checkbox and Radio (Figma nodes `1:5323`, `1:5408`)
Use `nz-checkbox` / `nz-radio` as usual.

| Figma | ng-zorro |
|---|---|
| checkbox unselected / selected | `<label nz-checkbox>` (unchecked / checked) |
| checkbox indeterminate | `nzIndeterminate` (white box with a blue square) |
| checkbox type=multiple | `class="aibox-multiple"` on a **checked** checkbox (blue box, white dash) |
| radio unselected / selected | `<label nz-radio>` (selected = blue disc with a white dot) |
| size = small / medium / large | `class="aibox-sm"` / (default) / `class="aibox-lg"` on the label |
| state = error | `class="aibox-error"` on the label (Figma defines it for unselected only) |
| state = disabled | `nzDisabled` |

```html
<label nz-checkbox [(ngModel)]="a">Accept</label>
<label nz-checkbox class="aibox-lg aibox-error">Required</label>
<label nz-checkbox nzIndeterminate class="aibox-sm">Some</label>
<label nz-radio class="aibox-sm" nzValue="x">Option</label>
```
Figma has no hover/focus state for these; hover and focus use `color.state.form.hover`, and a radio's focus ring matches the Input's. Not covered: radio type=multiple (disc with a check), selection list / selection card, radio buttons (`nzButtonStyle`).
The Figma boxes are SVG icons, so the shapes were measured from a 1x render (box 14 / 17.5 / 21px, radio 16 / 20 / 24px, border 1.5 / 1.875 / 2.25px); the check mark is an approximation. Confirm with design before relying on pixel-exact output.

### Select (Figma nodes `1592:6210` select-search, `1:7137` select, `1:7626` content-list)
Use `nz-select` as usual. `nzMode="multiple"` / `"tags"` follow the Figma Tag Selection (`3959:10071`): the box grows with the tags (one row = the single-select height 40 / 48, two rows 72 / 80), tags wrap 8px apart; each tag is 24px, `bg/secondary`, radius 4, 12/16 medium `text/secondary` with a 12px ×. Disabled tags (white, `text/disable`) are not in Figma. The dropdown opens 2px from the field, below or above, on every ng-zorro version (18 / 19 used a 4px margin, 22 a 4px shift; both reset). Small list rows (Figma dropdown size=small: 40px, padding 8/16, 14/24): pass `[nzDropdownClassName]="'aibox-select-dropdown--small'"` on the `nz-select` (the overlay does not know the field's size). `aibox-select-scroll` stops the tag box at 420px (Figma: the column view is a 456px block = 32 label + 4 + 420 box; override with `--_select-max-h`). Not covered: the Tag Selection column / list views and the typing / suggestion panel.

Naming tags in a multiple Select (Figma Tag Selection "user selecting" / "user selected", node `3962:35682`): add `aibox-select-naming` to the `nz-select` and give it a `[nzCustomTemplate]` that renders the avatar and the name: `<span class="aibox-tag-avatar aibox-avatar-blue"><span nz-icon nzType="user"></span></span><span class="aibox-tag-name">{{ selected.nzLabel }}</span>`. The selected people are the Tag section's naming tags (pill, `bg/secondary`, name 14/24 medium `text/primary`, × `text/primary`, avatar flush left): 24px high in the default size (Figma small, box 40px), 30px with `nzSize="large"` (a three-row box of 585px is 130px high, as in Figma). Avatar colours: `aibox-avatar-blue` (default) / `-sea` / `-gray` / `-yellow` / `-red`. Tag Selection views (Figma column view `4475:1852`, list view `4476:2990`): the wrapping layout above is the column view; add `aibox-select-list` for the list view (one tag per row, full width, the name pushes the × to the right edge) and `aibox-select-scroll` to stop the box at 456px and scroll (4px `bg/secondary` track, `text/tertiary` thumb; change the height with `style="--_select-max-h: 340px"`). The view-toggle button in the Label row is not part of the select. Not covered: the dropdown rows with avatars (the suggestion panel).

| Figma | ng-zorro |
|---|---|
| Size = Large (box 48px) | `nzSize="large"` |
| Size = small (box 40px) | default size (`nzSize="small"` is styled the same) |
| state = default / selected (focus ring) | closed / open or focused; hover also shows the ring, as Figma's "Filled Hover" |
| state = error / error selected | `nzStatus="error"` (or a form control in error) |
| state = disabled | `nzDisabled` |
| select-search | `nzShowSearch` (the search icon replaces the arrow while open) |
| dropdown / content-list (hover, active, disabled) | the dropdown panel and its `nz-option` items |

```html
<nz-select nzSize="large" nzShowSearch nzAllowClear nzPlaceHolder="Placeholder"
           [nzOptionHeightPx]="50" [(ngModel)]="value">
  <nz-option nzValue="a" nzLabel="Option A"></nz-option>
</nz-select>
```
**Set `[nzOptionHeightPx]="50"`**: Figma option rows are 50px high and ng-zorro's virtual scroll otherwise still assumes 32px rows.
Not covered: multiple / tags mode, option groups, label size, hover on the arrow. The arrow and clear icons keep ng-zorro's glyphs (only size and colour change; Figma uses Font Awesome). The check on the selected option and the smile in the "not found" row are masks; the "not found" text is centred in the space beside the icon. An opened select highlights its selected option right away (ng-zorro marks it active).

### Switch (Figma nodes `1286:2284` switch-text-and-icon, `1:5516` switch)
Use `nz-switch` as usual; the colours and sizes are restyled.

| Figma | ng-zorro |
|---|---|
| switch-text-and-icon, Size = Desktop (44x22) | `<nz-switch>` (ng-zorro's default size is the same) |
| switch-text-and-icon, Size = Mobile (50x25) | `class="aibox-switch-mobile"` on `nz-switch` |
| switch (51x31, iOS style) | `class="aibox-switch-ios"` on `nz-switch` |
| check / cross icon inside the track | `class="aibox-switch-icons"` on `nz-switch` |
| Disable = yes | `nzDisabled` |

```html
<nz-switch [(ngModel)]="on"></nz-switch>
<nz-switch class="aibox-switch-icons" [(ngModel)]="on"></nz-switch>
<nz-switch class="aibox-switch-icons aibox-switch-mobile" nzDisabled></nz-switch>
<nz-switch class="aibox-switch-ios" [(ngModel)]="on"></nz-switch>
```
Colours: on = `text/main` (iOS: `state/form/active`), off = `text/disable` (iOS: `bg/quaternary`), disabled = `bg/disable` with `text/disable` icons. The icons only appear when no `nzCheckedChildren` / `nzUnCheckedChildren` are given. Not covered: `nzSize="small"` (colours only), `nzLoading`, `switch-with-text` (a segmented control, not a switch).

### Tag / status badge (Figma page `3579:12023`, badge node `1:10717`)

| `nz-tag` | Figma badge |
| --- | --- |
| no `nzColor` | draft (grey) |
| `nzColor="success"` / `"processing"` / `"warning"` / `"error"` | success / in progress (info) / warning / error |
| `nzColor="purple"` | rework |
| `nzColor="orange"` | reject |

Opt-in classes on `<nz-tag>`: `aibox-tag-solid` (solid fill, white text), `aibox-tag-square` (radius 4; default is pill), `aibox-tag-xs` (Figma 2xsmall, 12px). Not covered yet: pink "signer in progress", "form", disabled badge, chips and checkable tags.

Closable tag (Figma tag/closable, node `1:10102`): `<nz-tag nzMode="closeable">` with the same colours as the badge, plus `aibox-tag-black` (dark gray `state/gray/g-1`, white text). The default size is Figma small (14px, padding 8 12, 32px high); with `aibox-tag-xs` it is 2xsmall (12px, padding 4 8, 24px high); `aibox-tag-square` works too. The × and an optional leading icon (`<span nz-icon>` before the text) are 16px boxes with a 12px glyph. The blue closable tag uses `text/main` where the status badge uses info-200. Handle removal with `(nzOnClose)`. Naming tag (Figma tag/closable style=naming round / small / hug): add `aibox-tag-naming` to a `nz-tag` (usually `nzMode="closeable"`) and put the avatar first: `<span class="aibox-tag-avatar"><span nz-icon nzType="user"></span></span>` (or an initial letter). The avatar is a round 30px badge (`global/blue/200`, user icon `global/blue/700`) flush with the left edge, then 8px, the name 14/24 medium `text/primary`, the × in `text/primary`, 12px on the right; the tag is 30px high. `aibox-tag-naming-sm` is the small frame (24px avatar, 8px on the right). Wrap a long name in `<span class="aibox-tag-name">` to cut it with an ellipsis at 120px (the hug frame has no limit). Default colour only (Figma has no other). Not covered: a hover state on the × (not in Figma), a picture avatar (put an `<img>` in `aibox-tag-avatar` yourself).

### Chip / filter (Figma node `1:10199`)

`<nz-tag nzMode="checkable" [nzChecked]="...">`: unselected = light blue, hover = solid blue, pressed = darker blue, `nzChecked` = solid blue. Default size is Figma small (32px); add `aibox-tag-xs` (24px), `aibox-tag-md` or `aibox-tag-lg` (42px, larger text). `aibox-tag-disabled` gives the disabled look (it does not block clicks). A leading `<span nz-icon>` gets a 16x16 box with a 12px glyph (Figma tag/checkable; written from the Figma spec, not measured in a browser). Not covered: the red selected variant.

### Badge (Figma node `1175:641`, page Badge)

`nz-badge`: Number / Dot / Icon in three sizes. Small = `nzSize="small"` (18px count, 6px dot), Medium = default (22px, 10px), Large = class `aibox-badge-lg` (26px, 12px). Dot is red by default, `nzColor="green"` is green. Icon badge: class `aibox-badge-icon` with `[nzCount]` set to a template whose element has class `ant-scroll-number-custom-component` and holds an icon (sizes via `aibox-badge-sm` / default / `aibox-badge-lg`). Not covered: status badges, ribbons, other preset colours.

### Pagination (Figma node `3451:10970`, page Pagination)

`nz-pagination`: 32x32 page buttons (4px gap) with a soft shadow, active page blue, prev / next at the ends grey; `[nzShowTotal]` text on the left and `nzShowSizeChanger` (a borderless text button) on the right. `nzSize="small"` looks the same as the default. Hover is derived from the button tokens (not in Figma). The size changer text is the same width on every version (18 / 19 add a space around it, which the override removes). The size changer is a `nz-select`, so its dropdown follows the Select section and is at least 112px wide; keep the locale's `items_per_page` short ("/ หน้า"). Set the locale (ng-zorro defaults to Chinese): `provideNzI18n(th_TH)`. Not covered: the page-jump dropdown, quick jumper, simple mode.

### Tab (Figma page `4033:17725`: tab / Tab Button `4034:247`, Outline Tab `5342:5164`, Tab content `5264:730`)

`nz-tabs`: `nzType="card"` = raised tabs (Figma "tab"), default `line` = 4px rail with a 4px bar (Figma "Outline Tab"). Sizes: `nzSize="large"` / default / `"small"` (card and line 48 / 40 / 32px; card tabs are 4px apart, line tabs touch). Active tab blue, default grey, `[nzDisabled]` on `nz-tab` grey. Dot icon: `<span class="aibox-tab-icon"></span>` in the tab title (`aibox-tab-icon-error` / `aibox-tab-icon-success` for the status icons). `aibox-tabs-fill` on `nz-tabs` makes the tabs share the width. Hover (primary text) is not in Figma. Not covered: vertical / bottom tabs, closable / editable tabs, extra content.

### Tooltip (Figma page `1145:1134`: tooltip `1145:1157`, tooltip-themed `1145:1219`)

`nz-tooltip`: dark by default (14/24, padding 6 8, radius 4, arrow 16px from the corner). Themes via `nzTooltipOverlayClassName`: `aibox-tooltip-light` (white, radius 8, popover shadow) and `aibox-tooltip-blue` (light blue, radius 8); sizes `aibox-tooltip-sm` (padding 6 14) and `aibox-tooltip-xs` (12px text); the classes can be combined (`"aibox-tooltip-blue aibox-tooltip-xs"`). ng-zorro's `nzTooltipColor` presets and custom colours still work. The arrow is a rounded 16x8 triangle 12px from the trigger on every ng-zorro version (20+ draw it themselves; on 18 / 19, which draw a rotated square, the override redraws it, using `:has()`), and it follows the tooltip colour, presets included. Not covered: tooltip-bulletpoint and Tooltips Modal.

### Breadcrumb (Figma page `1115:14146`: breadcrumbs `1:11308`, breadcrumbs_lists `7762:53685`)

`nz-breadcrumb` with 2 to 5 `nz-breadcrumb-item`: 12/22 text in grey, hover (and pressed) darker grey on links, the last item medium weight in `text/primary` with no separator, a 12px chevron (drawn with CSS, replaces ng-zorro's "/") between items, 4px gaps. Leave `nzSeparator` at its default; a custom separator template is hidden. Not covered: dropdown items (`nzOverlay`).

### Divider (Figma page `1174:439`, divider node `1174:444`)

`nz-divider`: the default is the 1px "inline" line in `component/divider` (#f1f2f3; the vertical divider, the divider with text and the L band use it too) (ng-zorro's 24px margin stays), `nzDashed` is the 1px dashed line (`text/white-secondary`). Bands: `aibox-divider-s` (5px, margin 10), `aibox-divider-m` (5px, margin 18), `aibox-divider-m24` (5px, margin 24) and `aibox-divider-l` (10px, `bg/disable`, margin 18). The 5px band colour is the component token `--aibox-divider-band-color` (#f8f8f8, a literal in Figma). Vertical dividers and dividers with text only get the line colour. Bands are horizontal only.

### Alert (Figma page Message & Snack Bar `39:12064`, alert-bar `1:10675`)

`nz-alert` as a banner: statuses via `nzType` (success / info / warning / error), fill `bg/status/*-100`, 16/26 `text/primary`, padding 8 12, radius 4, no border, a 20px outlined status icon with `nzShowIcon` (drawn with CSS, replaces the filled ng-zorro glyph) and a 12px close icon with `nzCloseable`. `aibox-alert-shadow` raises the bar (shadow raise-modal, for bars that float over content), `aibox-alert-inset` keeps 16px on both sides (Figma "padding" type); they combine. Not covered: `nzDescription` layout, banner mode.

### Message / snackbar (Figma `1:10863`, message bar `6608:120690`)

`NzMessageService` toasts become snackbars: fill `bg/status/*-100` per status, padding 12 16, radius 4, gap 8, 16/26 text, raise shadow and a 20px outlined icon. Put `aibox-snackbar-action` (text button) and `aibox-snackbar-close` (12px xmark) inside a template passed as the content. Message bar: `<nz-alert class="aibox-alert-bar" nzType="info" nzShowIcon nzCloseable>` (grey `bg/secondary` strip, centred; add `aibox-alert-bar-left` to align left). Not covered: toast position/animation, loading type.

### Modal / dialog (Figma page Modal `3704:8903`, dialog `1:9994`, dialog-alert `1:9973`)

`nz-modal` / `NzModalService`: bg/primary, radius 8, shadow raise-modal, padding 32, gap 16, centred 16/24 medium title; footer buttons stretch 16px apart at the large size (the non-primary one drawn as contained subsidiary). Set `nzWidth` 800 or 400 and `nzClosable: false`; `aibox-modal-compact` (mobile padding 24 16 20) and `aibox-modal-cta-inset` (120px side inset for the 800px dialog) go in `nzClassName`. `confirm / success / info / warning / error` render as the dialog-alert (padding 32 48, 32px filled status icon, 16/26 secondary text). Needs `NzModalModule`. Not covered: loading status, other dialog-cta layouts, scrollbar, Password Protection overlay.

### Empty (Figma page Empty State `4064:1219`, Empty `917:5774`)

`nz-empty` with `nzNotFoundImage="simple"` (64x40 tray), 8px gap, label 16/26 `text/icon-default`, no outer margin. `aibox-empty-lg` = image big (128x80); pass a template with a 24px icon as `nzNotFoundImage` for the icon variant. Not covered: the Empty Content card (needs the Card override), dark theme.

### Dropdown menu (Figma page Popover `1345:521`, popover-submenu `1346:1358`)

`nz-dropdown` + `nz-menu`: bg/primary panel, radius 8, shadow popover, rows 14/24 with 32px side padding (first row 16px from the top, last 16px from the bottom), `nzSelected` row in `color/main`, `nz-menu-group nzTitle` section headers (12/22 medium, grey fill from `--aibox-dropdown-section-bg`). `nzArrow` gives the 16x8 arrow. The panel is as wide as its longest row on every ng-zorro version (Figma 214 / 265px): ng-zorro 18 and 19 make it as wide as the trigger button, so the override sets `.ant-dropdown { width: auto }`. The gap between the trigger and the panel is 4px on every version (ng-zorro 18 / 19 use a 6px margin, 20+ an overlay offset; the override gives 18 / 19 4px). `nzArrow` (ng-zorro 20+) adds the 8px arrow on top. The plain popover (`1346:1149`) is stock Ant Design and not overridden. Note: ng-zorro 18 exports `NzDropDownModule`, 22 exports `NzDropdownModule`. Not covered: nested submenus, icons in rows, danger/disabled rows.

**Actions look (`aibox-dropdown-actions`, Figma page Navigation `154:2044` > Dropdown Menu `10519:1870`, dropdown-menu `10519:1909`, menu-item `10519:1908`):** put the class on the `<ul nz-menu>` for a menu of actions (Figma: "opened from a button such as เพิ่มเติม, Ant Dropdown"). Panel: bg/primary, radius 4, raise-modal shadow, 16px top and bottom padding; rows 50px (padding 12 16, gap 8, 16/26 `text/primary`), hover `bg/secondary`, `nzDisabled` = `text/disable`, an optional leading icon in a 20px box (16px glyph, `text/icon-default`). No arrow, no section headers in this look. Without the class the menu keeps the popover-submenu look above (Figma has both designs; which one should be the default is open). Verified on 18.2.1, 19.3.1, 20.4.4, 21.3.3 and 22.1.2. Not covered: submenus (`nz-submenu`) and danger rows (Figma has neither).

### Scrollbar (Figma page Scrollbar `3745:12812`, vertical `6903:54`, horizontal `7024:6514`)

Opt-in class `aibox-scrollbar` on any scrolling element: 4px track (`bg/secondary`) and thumb (`text/tertiary`), radius 4, vertical and horizontal. Chromium/Safari use `::-webkit-scrollbar`; Firefox gets `scrollbar-width: thin` with the same colours. Not an ng-zorro component and not applied automatically to dialogs, dropdowns or selects. Checked on headless Chromium only.

### Drawer (Figma page Drawer / Bottom Sheet `3744:11632`, Drawer Header `3927:8405`)

`nz-drawer`: header 72px (padding 12 24) with a 1px bottom border, title 20/32 medium centred (offset 52px against the 40px close button), the default close button moved to the right with a 28px icon in `button/texted/subsidiary/text`. `nzPlacement="bottom"` gives the Bottom Sheet shape (16px top corners, `section-lg` shadow). Not covered: back and share buttons, the title tooltip/left icon, Drawer-list rows (product content), shadows of left/right/top drawers. Checked on placement right and bottom.

### Table (Figma page Table `1144:1086`, head cell `3631:1869`, row cell `8794:180479`)

`nz-table`: header cell fill `bg/secondary`, padding 12 8, 14/24 medium, 48px tall, no column dividers; the sort icon (16px, 8px after the label) is drawn with CSS: grey up-down when unsorted, a single `text/main` arrow when `nzSortOrder` is ascend (up) or descend (down). Row cells: `bg/primary`, padding 8, min height 58, 16/26 regular. Row hover fills with `--aibox-table-row-hover-bg` (= `color/bg/subtlest` #fbfbfd, as in Figma). The 1px row line is `border/primary`; the selection column is 52px; action buttons are texted `nzSize="small"` (32px) and touch each other (the older xsmall + `aibox-btn-nopad` 20px-apart pattern still works). `aibox-btn-nopad` = texted button without side padding (with `aibox-btn-xs`, 20px apart). Not covered: the required asterisk and info tooltip in the head cell, expand columns, fixed headers, bordered/small sizes.

### Upload (Figma page Upload `1516:11060`, drop zone `1516:11121`, upload-block `1516:11080`)

`nz-upload`: `nzType="drag"` is the drop zone (`bg/secondary`, 1px dashed `text/secondary`, radius 8, 148px tall, 28px file-arrow-up icon in `bg/main`, 16/26 medium text, 14/24 hint). File rows (`nzListType="text"` / `"picture"`) are 64px tall boxes (padding 14, radius 8, `border/secondary`) with a blue name, 16px file icon and a 32px delete button; `uploading` = dashed border and a spinner (progress bar hidden), `error` = red border/icon/name, picture = 36px thumbnail. Register `DeleteOutline`, `InboxOutline`, `PaperClipOutline`, `FileOutline`, `PictureOutline`, `LoadingOutline` and set `nzShowUploadList` to hide preview/download. `disabled` (`nzDisabled`) uses `text/disable` icon, `text/tertiary` title and hint in `text/icon/default`, cursor not-allowed. Add `aibox-upload-compact` on a wrapper for the reduce-height zone (98px box, the icon touching the title on one centred row, hint below). Add `aibox-upload-inline` to `nz-upload nzType="drag"` with `[nzFileList]` (status `uploading` / `error` / `done`) for the file under the zone as in Figma (state loading / error / completed): a plain row with no box, 10px under the zone, a 24px icon box (16px spinner / file icon), the name 16/26 medium in `color/main` (`text/status/error/100` on error) and the 32px delete button (`border/secondary`, red on error); pass `[nzShowUploadList]="{ showPreviewIcon: false, showRemoveIcon: true, showDownloadIcon: false }"` or ng-zorro adds a preview button to a done file. ng-zorro shows `file.message` only as a tooltip, so the reason for an error is an element you place under the `nz-upload`: `<div class="aibox-upload-error-text">message</div>` (circle-exclamation icon in a 24px box, 8px, 14/24 text, in `text/status/error/100`; it lines up with the file name). Figma draws the loading / completed icons 20px and the error icons 16px: all use 16px; the loading spinner sits in a 32px box (the name starts at 40px) and the file icons in a 24px box. Compact file states (Figma loading compact / completed compact / completed with download / reupload / validation error [with download]): add `aibox-upload-file` to a `nz-upload` **without** a drop zone and give it `[nzFileList]`: the file in a 480 x 69px box (72px on error) with a 1px solid `border/secondary` (`text/status/error/100` on error), radius 8, the file row 10px from the edges (icon box, name 16/26 medium in `color/main`, 8px between items) and the delete button; `showDownloadIcon: true` adds the 32px download button before it (register `DownloadOutline`). The reason for an error is `<div class="aibox-upload-error-text">` under the box (10px away). ng-zorro shows download only on a `done` file, never on `error`, so "validation error with download" is a `done` file with `aibox-upload-file-invalid` (red box, icon, name and buttons). "Reupload" has a texted small button ("อัปโหลดใหม่", `UploadOutline`) that is not part of ng-zorro's row: put a second `nz-upload` with `<button nz-button nzType="text" nzSize="small" class="aibox-upload-file-action">` next to the box inside `<div class="aibox-upload-file-reupload">` (it sits 8px before the delete button, so hide the download button in this state). One file array per `nz-upload`: ng-zorro keeps the download / preview flags on the file objects. Not covered: progress bar, picture-card, several files in one box.

### Date picker (Figma page DatePicker `1347:2036`, date-picker `1347:23603`, range `4558:7666`)

`nz-date-picker` / `nz-range-picker`: the field uses the Input box (1px `state/form/default`, radius 4, small 40px with 14/24 and the text 8px from the edge (large 12px, icon 10px / 14px from the right edge), `nzSize="large"` 48px with 16/26, 2px ring when focused, `nzStatus="error"` red, disabled grey). The calendar popup is 280 wide (`bg/primary`, radius 4, raise-modal shadow) with a 1px header line, 14/22 semibold title, 24x24 radius-4 day cells (other-month days `text/icon-default`, today bold `color/main`, selected filled `color/main`, range cells `bg/tertiary`). Use `[nzShowToday]="false"`. The popup is 2px from the field; the range popup has no arrow (Figma has none). ng-zorro 22 needs a date adapter provider (`provideNzNativeDateAdapter()`), ng-zorro 18 does not. Not covered: Buddhist-year title, month/year panels, week/quarter pickers, time, presets. Selected and hover cell fills are inferred.

### Time picker (Figma page TimePicker `1612:3564`, desktop `1612:3566`, menu cell `1613:9223`)

`nz-time-picker`: the field is the Date picker field (sizes, error, disabled). The popup is 125 x 290 with two columns (`bg/primary`, radius 4 from `--aibox-timepicker-menu-radius`, raise-modal shadow, 10px top padding) with 62.5 x 224 columns divided by 1px `rgba(0,0,0,.06)` lines (the Figma component colour; measured 125 x 290 on 22.1.2 with `nzNeedConfirm`, columns checked on 18-22), 28x28 radius-4 cells (hover `bg/tertiary`, selected `color/main` with white medium text) and, with `nzNeedConfirm`, a full-width outlined small button (padding 12, 56px footer, no line above). Figma writes "เลือก" on the button but ng-zorro takes the text from the locale ("ตกลง" in th_TH): set `provideNzConfig({ timePicker: { nzOkText: 'เลือก' } })` if you want Figma's word. The "now" link is hidden. Use `nzFormat="HH:mm"`. ng-zorro 22 needs a date adapter provider. Not covered: seconds / 12-hour columns, the mobile frames.

### Tree (Figma page Tree Select `4230:2618`, tree-selection-list `9718:69790`, base `4267:9343`)

`nz-tree` and the list in `nz-tree-select` (the dropdown list uses the same rows since v0.48.0; before it kept ng-zorro's 24 / 28px rows): 42px rows (padding 8 16 8 8) that touch, 42px apart on every ng-zorro version (21+ adds a 4px row margin, reset to 0), 20px caret box + 8px gap + checkbox (a 24px frame holding the 17.5px box, drawn like the Checkbox override) + 8px gap + 16/26 title (text starts at 68px with a checkbox, 36px without), 24px indent per level (32px for the first, so level 2 starts at 40px). Row hover fills the whole row with `bg/tertiary`; the selected node is `color/main` medium (both taken from the Folder-list frames). Register `CaretDownFill` and `CaretRightFill`. Not covered: the Folder-list pattern, search highlight, draggable / line / block-node trees.

### Cascader (Figma page Cascader `4268:9357`, dropdown `4268:12892`)

`nz-cascader`: the field is the Select field (`nzSize="large"`, `[nzShowSearch]="true"` for the search icon). The dropdown is `bg/primary`, radius 4, shadow `--aibox-cascader-menu-shadow`, no padding; one column per level divided by a 1px `border/primary` line; rows have padding 12 16, 16/26 text and a 1px line under them. Hover and the open path use `bg/tertiary` with `color/main` text (inferred). The two-line rows of the Figma frames (icon, title, description, 74px) use `nzOptionRender` with `aibox-option`, `aibox-option-icon`, `aibox-option-text`, `aibox-option-title`, `aibox-option-desc` (single-line rows stay 50px). Not covered: the notfound text, multiple / checkbox mode.

### Card (Figma Empty State page Card / Advanced `4065:7590`, Card page Card Menu `1295:3294`)

`nz-card`: 1px `border/primary`, radius 8, shadow `section-sm`, body padding 24 16 measured from the outer edge (Figma strokes sit inside, so the CSS padding is 23 15 next to the 1px border). `aibox-card-menu` on `nz-card` (with an icon and a `.title` inside) is the Card Menu shortcut tile: no border, white, shadow `--aibox-card-menu-shadow`, 164x154, 20px icon in `text/icon-default`, 16/26 medium `text/secondary` title. Head, actions, grid and meta stay ng-zorro's (the Figma Card page has no spec for them). Not covered: the file / E-Form selection cards (product components).

### Collapse (Figma Collapse page `1105:1930`)

`nz-collapse`: Basic (no frame: a 1px line under the 48px head, content list text 32px from the edge, 40px high), Borderless (`[nzBordered]="false"`: no line under the head, content padding 16, a 1px line closes the open body) and Ghost (`nzGhost`: no lines, head padding-left 12); head padding 12 16 with a 12px gap, title 14/24 (large 16/26 in 58px, small 40px), expanded = title and chevron in `--aibox-color-main`, collapsed = `text/tertiary`. `nzSize="small"` / `"large"` on ng-zorro 20+, the classes `aibox-collapse-small` / `aibox-collapse-large` on 18 / 19 (no `nzSize` there); `nzExpandIconPosition="end"` puts the chevron on the right; a disabled panel (`[nzDisabled]`, or `nzCollapsible="disabled"` which 22 requires) is `bg/disable` with `text/disable` (Ghost: only the text). Not covered: the Sub Navigation list (`1108:6694`), dark theme.

### Steps (Figma Steps page `1504:2619`)

`nz-steps`: the horizontal indicator is `nzSize="small" nzLabelPlacement="vertical"` (24px icons, a 3px line 4px from each icon, title 16/26 and description 14/24 centred under the icon, description max 140px) and the vertical indicator is `nzSize="small" nzDirection="vertical"` (icon left, 16px gap, rows 112px apart, 1px line). Without `nzSize` the icon is 32px (Basic Default); `nzProgressDot` gives the 8px dot (10px for the current step). Icons: finish = `bg/tertiary` with a `bg/main` check, process = `bg/main` with a white number, wait = `bg/disable`, error = status error with a white cross (title and description turn red too). The line is `bg/main` after a finished step and `bg/secondary` otherwise. Not covered: hovered state, the progress ring (`nzPercentage`), navigation type, dark theme. The vertical description sits 2px under the title with the text centred on the icon, and the line before an error step is half `bg/main`, half `bg/secondary` (v0.53.5).

### Spin (Figma Spin page `7075:39`)

`nz-spin`: standalone `<nz-spin nzSimple nzTip="Loading">` (spinner 14 / 20 / 32px for `nzSize` small / default / large, tip 14/22, padding 16, gap 8, centred: boxes 76 / 82 / 94px high) and `nz-spin` around content (ng-zorro's overlay, recoloured). The Figma Spin page is stock Ant Design (colour `#1677ff`, font SF Pro Text, not themed): the sizes are kept, the spinner and tip use `--aibox-color-main` and the Ai-BOX font. Not covered: `nzIndicator`, dark theme.

### Progress (Figma Progress page `7630:68366`)

`nz-progress`: Line (bar 8px, radius 100, gap 8, value 14/22; success / exception turn the value into a 16px icon; `[nzShowInfo]="false"` = Bare), Line-Mini (`nzSize="small"`: bar 6px, value 12/20), Multiple (`[nzSuccessPercent]`), Circle (`nzType="circle" [nzWidth]="120"`, Mini 80; ng-zorro's default width is 132), Steps (`[nzSteps]` with `nzStrokeColor="var(--aibox-color-main)"`: ng-zorro paints the finished items only through that input). The Figma Progress page is stock Ant Design (blue `#1890ff`, track `#f5f5f5`, success `#52c41a`, exception `#f5222d`, Roboto; only the Mini line uses `--aibox-color-main`): the sizes are kept and the colours / font are the Ai-BOX ones (bar `--aibox-color-main`, track `bg/secondary`, success `bg/status/success-200`, exception `text/status/error-100`). Not covered: gradient bars, the dashboard type, dark theme.

### Menu (Figma page Navigation `154:2044`, vertical menu `154:3272`)

`nz-menu` with `nzMode="inline"` (240px): group rows (`nz-submenu` title, padding 16, 14/24 `text/tertiary`, 1px bottom line and right line in `text/white/secondary`), open row (`nzOpen`) in `color/main` medium with a down chevron (closed = right chevron), sub items 208x32 (padding 4 16, radius 4, 8px apart, group bottom padding 24 including its 1px line, a closed group 56px; top-level rows are 56px high with the line inside and touch each other, no margin); a single top-level `nz-menu-item` takes the same hover / selected look as the group items on the whole 56px row (Figma has no spec for it): hover = `component/bg/bg-active` + `color/main` medium, selected (`nzSelected`) = `bg/main` + white medium. ng-zorro sets `padding-inline-start` inline per level, so those two rules use `!important`. Not covered: collapsed menu, row icons, horizontal / popup menus, dark theme, the Sidebar / Header / Menu Product app-shell frames of the same page.

### Input / form label (Figma node `1:7052`)
`<input nz-input>` (default size = Figma small, box 40px; `nzSize="large"` = Figma large, 48px), `nz-form-label`. `nzSize="small"` is drawn like the default.

Input options (Figma Input page: textarea `1:7232`, search `1:7587`, password box `6581:98500`, assistive text `1:7499`):
- **Textarea**: `<textarea nz-input>` starts 80px tall (`nzSize="large"` 96px) with a vertical resize handle, padding 8 / 12, 14/24 / 16/26. Giving `rows` yourself replaces the starting height (and keeps `nzAutosize` working: a CSS min-height on the textarea broke its row measuring). `nz-textarea-count [nzMaxCharacterCount]` shows the count under the box, right aligned.
- **Prefix / suffix**: the affix wrapper (ng-zorro 18 `nz-input-group [nzPrefix]` / `[nzSuffix]` / `nzPrefixIcon`; 22 `nz-input-wrapper` with `nzInputPrefix`, `nzAllowClear`) is drawn like the textfield (border, radius, hover / focus / error / disabled, large 48px). `nzBorderless` now works on Input.
- **Search**: add `aibox-search` to the wrapper with a `search` prefix icon: 40px box (`nzSize="large"` 48px, 16px icon). The inline ค้นหา button is a Button in the suffix (`aibox-btn-xs` in the small box, `nzSize="small"` in the large one). Register `SearchOutline`.
- **Password**: ng-zorro 22 `nz-input-password` / 18 `nz-input-group [nzSuffix]` with an eye icon (register `EyeOutline`, `EyeInvisibleOutline`), 16px, `state/gray/g-6`.
- **Label and assistive text**: the text size follows the field size, as in Figma: 12/22 by default (Figma small), 14/24 when the form item holds a large control (`nzSize="large"` Input / Select / Input number / Date picker; detected with `:has()`). `nzExtra` is `text/secondary`, `nzErrorTip` is `text/status/error-100` with a circle-exclamation icon. `aibox-form-small` / `aibox-form-large` on `nz-form-item` force one size (for a control `:has()` does not recognise). Before v0.35.0 the label and assistive text were always 14/24. A label above its field (`nzLayout="vertical"`) sits 4px from the box, as in Figma (ng-zorro: 8px; before v0.36.0), and the required asterisk comes after the label text, 4px away, in `text/status/error-100` at the label's size (it replaces the colon of a required label; before v0.53.5 it was Ant's red asterisk before the label). An Input in error uses `state/form/error` with the `error-outer` ring (v0.53.5: ng-zorro's own error colours had been winning).
- **Input number**: `nz-input-number` is drawn like the Input (box 40px, `nzSize="large"` 48px, border `state/form/default`, radius 4, 14/24 / 16/26, hover / focus / error / disabled / `nzBorderless`). Not in Figma: the step buttons keep ng-zorro's layout (22px wide, shown on hover) with the Ai-BOX line and icon colours.
Not covered (no Figma): input-number prefix / suffix / addon (`nz-input-number-group`), addon before / after, compact groups, OTP, `nzStatus="warning"` (Ant colours), count turning red past the limit, the forgot-password link row.

## Develop
```
npm install
npm test        # build dist/ + check tokens used by override exist, no hard-coded colors
```
`tokens/*.json` (W3C DTCG) -> `dist/tokens.css` (`--aibox-*`) and `dist/tokens.json`.
`src/ng-zorro-override.css` is hand-written and must only use `var(--aibox-*)`.
**Commit `dist/`** - jsDelivr serves it straight from git.

## Release
Releases are automatic. In the PR that changes `dist/`:
1. bump `version` in `package.json` and run `npm test` (commit `dist/`);
2. add `release-notes/vX.Y.Z.md`: line 1 is the release title, the rest is the release notes (the jsDelivr links are appended for you).

When the PR is merged into `main`, the `release` workflow creates the tag `vX.Y.Z` **at the merged commit** and the GitHub release (title and notes from that file). It refuses to publish when `package.json` does not match the tag, the notes file is missing, tests fail or `dist/` is stale, so a wrong tag cannot be created. If the version already has a release, nothing happens.

Fix or backfill a release from Actions -> release -> Run workflow: give `tag` (e.g. `v0.6.0`) and, for a tag that does not exist yet, the `commit` to tag; for an existing tag it only republishes the title and notes. Pushing a `vX.Y.Z` tag by hand works too.

Token value change = minor/patch; rename or remove a token = major.


## Verified on ng-zorro-antd 18.2.1
The overrides were rebuilt in a Angular 18.2 + ng-zorro-antd 18.2.1 copy of the docs site and measured in Chromium next to 22.1.2. Message, message bar, modal, empty, scrollbar, drawer, table, tree, card, upload (base, compact, disabled) and the cascader two-line row measure identically; date picker, time picker and cascader differ by 1-8px because the two versions' DOM differs. API differences to know in 18: `NzToolTipModule`, `NzDropDownModule`, `<nz-tabset>` / `nz-tab`, `<span nz-icon>` (no `<nz-icon>`), no `nzNeedConfirm` on the time picker, no `nzArrow` on dropdown (not verifiable), closed `nz-submenu` stays in the DOM at height 0 (fixed in v0.30.0), the tab button is a `<button>` (browser button padding and weight made tabs 131.9x50 instead of 121.1x48, fixed in v0.34.0), zone.js + `provideAnimations` + `provideHttpClient` (upload) + `registerLocaleData(th)` (date/time pickers) are needed. Not verified in the real Ai-BOX app.

## Verified on ng-zorro-antd 20.4.4
The docs site was rebuilt with Angular 20.3 + ng-zorro-antd 20.4.4 and compared with 22.1.2 in Chromium: every demo of the 29 component pages (element sizes, colours, borders, radius, fonts, padding) plus the overlay and state scripts (modal, message, dropdown, date / time picker, cascader, drawer, menu, tabs). The same sizes come out on both, apart from two things found and fixed in v0.34.0 (the tab `<button>` and a 2px margin on the cascader menus that made its panel 4px taller). Differences that are only DOM, not look: closed `nz-submenu` stays in the DOM at height 0 (as in 18), no `ant-*-outlined` / `ant-picker-dropdown-placement-*` classes. API to know in 20: `NzDropDownModule` (not `NzDropdownModule`), no `nzNeedConfirm` on the time picker, no `provideNzNativeDateAdapter` / `NZ_DATE_LOCALE` (use `registerLocaleData(th)` with `provideNzI18n(th_TH)`), `provideAnimationsAsync()` is needed for the menu to collapse, `provideHttpClient()` for upload, and either zone.js or `provideZonelessChangeDetection()`. `nz-input-wrapper` / `nz-input-password` exist in 20.4.4 as in 22. Not checked: hover / focus states of every component, 19.x and 21.x, the real Ai-BOX app.

## Verified on ng-zorro-antd 19.3.1 and 21.3.3
Both were rebuilt in Angular 19.2 / 21.2 copies of the docs site and compared with 22.1.2 in Chromium (tokens.css and the override of the same release).
- **21.3.3**: the whole docs site builds; every demo of the 27 component pages and 18 overlay / state scripts (modal, message, dropdown, date / time picker, cascader, drawer, menu, tabs, tooltip, ...) give identical sizes, colours, borders, radius, fonts and padding. Only the API differs: `nzBorderless` no longer works (use `nzVariant`).
- **19.3.1**: the same checks match, plus the Input / Textarea / Input number / Select audit page (identical to 18.2.1 and 21.3.3), and, since v0.45.0, the pagination size changer (3px wider on 18 / 19 because ng-zorro leaves a space around " 10 / page ") and the tooltip arrow (a 22px rotated square 14.3px from the trigger on 18 / 19) are locked to the 20+ look; a pixel comparison of all 12 tooltip placements on 18 / 19 / 20 / 21 against 22 differs only in anti-aliasing. The docs site itself does not run on 19 (`nz-tabs`, `nz-input-wrapper`, `nz-input-password` are missing), so the 19 copy used `nz-tabset`, `nz-input-group` and no `nzNeedConfirm`; closed `nz-submenu` stays in the DOM at height 0 as in 18 / 20; `NzDropDownModule` / `NzToolTipModule` (capital D / T).
- **Tree row spacing**: ng-zorro 21+ adds `margin-bottom: 4px` to tree rows (46px apart on 21 and 22, 42px on 18, 19 and 20). Since v0.42.0 the override resets the margin, so rows are 42px apart on every version. (This was missed when 20.4.4 was checked.)
- The multiple Select (naming tags, column / list / scrolling views) is identical on 18.2.1, 19.3.1, 20.4.4, 21.3.3 and 22.1.2.
