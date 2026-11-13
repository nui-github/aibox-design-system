# aibox-design-system

Design tokens (from Figma) and ng-zorro-antd CSS overrides for Ai-BOX, served from jsDelivr.

## Use in a project
Load **after** ng-zorro-antd's own styles, and pin an exact version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.23.0/dist/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/nui-github/aibox-design-system@0.23.0/dist/ng-zorro-override.css">
```

Never use `@main` (cached ~12h, can change under you). Developed and tested against ng-zorro-antd 18.2.x (the Ai-BOX version); the docs site renders every component with 22.1.2 and the same automated checks pass there.

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
Use `nz-select` as usual.

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

### Chip / filter (Figma node `1:10199`)

`<nz-tag nzMode="checkable" [nzChecked]="...">`: unselected = light blue, hover = solid blue, pressed = darker blue, `nzChecked` = solid blue. Default size is Figma small (32px); add `aibox-tag-xs` (24px), `aibox-tag-md` or `aibox-tag-lg` (42px, larger text). `aibox-tag-disabled` gives the disabled look (it does not block clicks). Not covered: the leading icon and the red selected variant.

### Badge (Figma node `1175:641`, page Badge)

`nz-badge`: Number / Dot / Icon in three sizes. Small = `nzSize="small"` (18px count, 6px dot), Medium = default (22px, 10px), Large = class `aibox-badge-lg` (26px, 12px). Dot is red by default, `nzColor="green"` is green. Icon badge: class `aibox-badge-icon` with `[nzCount]` set to a template whose element has class `ant-scroll-number-custom-component` and holds an icon (sizes via `aibox-badge-sm` / default / `aibox-badge-lg`). Not covered: status badges, ribbons, other preset colours.

### Pagination (Figma node `3451:10970`, page Pagination)

`nz-pagination`: 32x32 page buttons (4px gap) with a soft shadow, active page blue, prev / next at the ends grey; `[nzShowTotal]` text on the left and `nzShowSizeChanger` (a borderless text button) on the right. `nzSize="small"` looks the same as the default. Hover is derived from the button tokens (not in Figma). The size changer is a `nz-select`, so its dropdown follows the Select section and is at least 112px wide; keep the locale's `items_per_page` short ("/ หน้า"). Set the locale (ng-zorro defaults to Chinese): `provideNzI18n(th_TH)`. Not covered: the page-jump dropdown, quick jumper, simple mode.

### Tab (Figma page `4033:17725`: tab / Tab Button `4034:247`, Outline Tab `5342:5164`, Tab content `5264:730`)

`nz-tabs`: `nzType="card"` = raised tabs (Figma "tab"), default `line` = 4px rail with a 4px bar (Figma "Outline Tab"). Sizes: `nzSize="large"` / default / `"small"` (card 48 / 40 / 32px, line 56 / 40 / 40px). Active tab blue, default grey, `[nzDisabled]` on `nz-tab` grey. Dot icon: `<span class="aibox-tab-icon"></span>` in the tab title (`aibox-tab-icon-error` / `aibox-tab-icon-success` for the status icons). `aibox-tabs-fill` on `nz-tabs` makes the tabs share the width. Hover (primary text) is not in Figma; line-style Small (40px) is inferred. Not covered: vertical / bottom tabs, closable / editable tabs, extra content.

### Tooltip (Figma page `1145:1134`: tooltip `1145:1157`, tooltip-themed `1145:1219`)

`nz-tooltip`: dark by default (14/24, padding 6 8, radius 4, arrow 16px from the corner). Themes via `nzTooltipOverlayClassName`: `aibox-tooltip-light` (white, radius 8, popover shadow) and `aibox-tooltip-blue` (light blue, radius 8); sizes `aibox-tooltip-sm` (padding 6 14) and `aibox-tooltip-xs` (12px text); the classes can be combined (`"aibox-tooltip-blue aibox-tooltip-xs"`). ng-zorro's `nzTooltipColor` presets and custom colours still work. The arrow shape is ng-zorro's (16x8 triangle on 22.x, rotated square on 18.x); only its colour is set. Not covered: tooltip-bulletpoint and Tooltips Modal.

### Breadcrumb (Figma page `1115:14146`: breadcrumbs `1:11308`, breadcrumbs_lists `7762:53685`)

`nz-breadcrumb` with 2 to 5 `nz-breadcrumb-item`: 12/22 text in grey, hover (and pressed) darker grey on links, the last item medium weight in `text/primary` with no separator, a 12px chevron (drawn with CSS, replaces ng-zorro's "/") between items, 4px gaps. Leave `nzSeparator` at its default; a custom separator template is hidden. Not covered: dropdown items (`nzOverlay`).

### Divider (Figma page `1174:439`, divider node `1174:444`)

`nz-divider`: the default is the 1px "inline" line in `border/primary` (ng-zorro's 24px margin stays), `nzDashed` is the 1px dashed line (`text/white-secondary`). Bands: `aibox-divider-s` (5px, margin 10), `aibox-divider-m` (5px, margin 18), `aibox-divider-m24` (5px, margin 24) and `aibox-divider-l` (10px, `bg/disable`, margin 18). The 5px band colour is the component token `--aibox-divider-band-color` (#f8f8f8, a literal in Figma). Vertical dividers and dividers with text only get the line colour. Bands are horizontal only.

### Alert (Figma page Message & Snack Bar `39:12064`, alert-bar `1:10675`)

`nz-alert` as a banner: statuses via `nzType` (success / info / warning / error), fill `bg/status/*-100`, 16/26 `text/primary`, padding 8 12, radius 4, no border, a 20px outlined status icon with `nzShowIcon` (drawn with CSS, replaces the filled ng-zorro glyph) and a 12px close icon with `nzCloseable`. `aibox-alert-shadow` raises the bar (shadow raise-modal, for bars that float over content), `aibox-alert-inset` keeps 16px on both sides (Figma "padding" type); they combine. Not covered: `nzDescription` layout, banner mode.

### Message / snackbar (Figma `1:10863`, message bar `6608:120690`)

`NzMessageService` toasts become snackbars: fill `bg/status/*-100` per status, padding 12 16, radius 4, gap 8, 16/26 text, raise shadow and a 20px outlined icon. Put `aibox-snackbar-action` (text button) and `aibox-snackbar-close` (12px xmark) inside a template passed as the content. Message bar: `<nz-alert class="aibox-alert-bar" nzType="info" nzShowIcon nzCloseable>` (grey `bg/secondary` strip, centred; add `aibox-alert-bar-left` to align left). Not covered: toast position/animation, loading type.

### Modal / dialog (Figma page Modal `3704:8903`, dialog `1:9994`, dialog-alert `1:9973`)

`nz-modal` / `NzModalService`: bg/primary, radius 8, shadow raise-modal, padding 32, gap 16, centred 16/24 medium title; footer buttons stretch 16px apart at the large size (the non-primary one drawn as contained subsidiary). Set `nzWidth` 800 or 400 and `nzClosable: false`; `aibox-modal-compact` (mobile padding 24 16 20) and `aibox-modal-cta-inset` (120px side inset for the 800px dialog) go in `nzClassName`. `confirm / success / info / warning / error` render as the dialog-alert (padding 32 48, 32px filled status icon, 16/26 secondary text). Needs `NzModalModule`. Not covered: loading status, other dialog-cta layouts, scrollbar, Password Protection overlay.

### Empty (Figma page Empty State `4064:1219`, Empty `917:5774`)

`nz-empty` with `nzNotFoundImage="simple"` (64x40 tray), 8px gap, label 16/26 `text/icon-default`, no outer margin. `aibox-empty-lg` = image big (128x80); pass a template with a 24px icon as `nzNotFoundImage` for the icon variant. Not covered: the Empty Content card (needs the Card override), dark theme.

### Dropdown menu (Figma page Popover `1345:521`, popover-submenu `1346:1358`)

`nz-dropdown` + `nz-menu`: bg/primary panel, radius 8, shadow popover, rows 14/24 with 32px side padding (first row 16px from the top, last 16px from the bottom), `nzSelected` row in `color/main`, `nz-menu-group nzTitle` section headers (12/22 medium, grey fill from `--aibox-dropdown-section-bg`). `nzArrow` gives the 16x8 arrow. The plain popover (`1346:1149`) is stock Ant Design and not overridden. Note: ng-zorro 18 exports `NzDropDownModule`, 22 exports `NzDropdownModule`. Not covered: nested submenus, icons in rows, danger/disabled rows.

### Scrollbar (Figma page Scrollbar `3745:12812`, vertical `6903:54`, horizontal `7024:6514`)

Opt-in class `aibox-scrollbar` on any scrolling element: 4px track (`bg/secondary`) and thumb (`text/tertiary`), radius 4, vertical and horizontal. Chromium/Safari use `::-webkit-scrollbar`; Firefox gets `scrollbar-width: thin` with the same colours. Not an ng-zorro component and not applied automatically to dialogs, dropdowns or selects. Checked on headless Chromium only.

### Drawer (Figma page Drawer / Bottom Sheet `3744:11632`, Drawer Header `3927:8405`)

`nz-drawer`: header 72px (padding 12 24) with a 1px bottom border, title 20/32 medium centred (offset 52px against the 40px close button), the default close button moved to the right with a 28px icon in `button/texted/subsidiary/text`. `nzPlacement="bottom"` gives the Bottom Sheet shape (16px top corners, `section-lg` shadow). Not covered: back and share buttons, the title tooltip/left icon, Drawer-list rows (product content), shadows of left/right/top drawers. Checked on placement right and bottom.

### Table (Figma page Table `1144:1086`, head cell `3631:1869`, row cell `8794:180479`)

`nz-table`: header cell fill `bg/secondary`, padding 12 8, 14/24 medium, 48px tall, no column dividers; the sort icon (16px, 8px after the label) is drawn with CSS: grey up-down when unsorted, a single `text/main` arrow when `nzSortOrder` is ascend (up) or descend (down). Row cells: `bg/primary`, padding 8, min height 58, 16/26 regular, no hover fill. `aibox-btn-nopad` = texted button without side padding (use with `aibox-btn-xs` for the action cell, 20px apart). The 1px row separator is an addition (not in Figma). Not covered: the required asterisk and info tooltip in the head cell, selection/expand columns, fixed headers, bordered/small sizes.

### Upload (Figma page Upload `1516:11060`, drop zone `1516:11121`, upload-block `1516:11080`)

`nz-upload`: `nzType="drag"` is the drop zone (`bg/secondary`, 1px dashed `text/secondary`, radius 8, 148px tall, 28px file-arrow-up icon in `bg/main`, 16/26 medium text, 14/24 hint). File rows (`nzListType="text"` / `"picture"`) are 64px tall boxes (padding 14, radius 8, `border/secondary`) with a blue name, 16px file icon and a 32px delete button; `uploading` = dashed border and a spinner (progress bar hidden), `error` = red border/icon/name, picture = 36px thumbnail. Register `DeleteOutline`, `InboxOutline`, `PaperClipOutline`, `FileOutline`, `PictureOutline`, `LoadingOutline` and set `nzShowUploadList` to hide preview/download. Not covered: disabled / reduce-height / compact / reupload / validation-error states, inline error reason, progress bar, picture-card.

### Input / form label (Figma node `1:7052`)
`<input nz-input>` (default size = Figma small, `nzSize="large"` = Figma large), `nz-form-label`.

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
