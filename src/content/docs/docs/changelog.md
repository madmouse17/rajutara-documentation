---
title: Changelog
description: What changed in each Rajutara release.
---

All notable changes to rajutara. Format: [Keep a Changelog](https://keepachangelog.com/), versions: [SemVer](https://semver.org/).

## [Unreleased]

## [1.4.0] - 2026-11-02

### Added
- **Sizes Table: line thickness per size, Insert and Append continue the step everywhere, Regrade by Break Size covers all pieces** (`docs/spec/03-grading.md` §3). A Thickness column sets each size's line in the Graded Nest (0.05 to 5 mm, default 0.25; the Base Size is drawn 0.10 mm thicker); files without it load with the default and the native format gains `thickness_mm` on each size. Insert and Append Sizes continue the step of the two nearest sizes in the middle of the table too, not only at the ends. Regrade by Break Size in the dialog regrades every unprotected piece, whatever is selected.
- **A pointer for every tool** (`docs/spec/07-ui-shell.md` §4.3). The armed tool's icon sits on a crosshair; Select shows the move cross over a piece it would drag and a crosshair over a point, notch or internal line; Move Piece shows the move cross, Text an I-beam over a piece; every tool that edits shows "not allowed" over a protected piece (Select, Measure and the other read-only tools keep their pointer). The canvas's own gestures win: grab while panning or holding `Shift`, resize arrows over the ruler bands and on guide lines, a zoom pointer for zoom by rectangle.
- **Selection, active and hover marks.** A selected piece has a heavier outline and a tint, the active piece a heavier outline, a stronger tint and four corner ticks, a selected vertex a larger filled glyph, a selected segment a thick stroke. Hovering shows what a click would hit: a ring round a vertex, a heavier notch or internal line, the outline of a piece not selected yet.
- **Piece Information Text on the desk and in the plot** (View › Piece Information Text, on by default; also a check in View and Selection). Each piece shows its label fields, one per line, at its label anchor and turned with it. The plot prints the same lines.
- **Rubber bands and live readouts** for every tool that takes a second point (`docs/spec/02-pds.md` §6.1). From the first pick a dashed band follows the pointer to the point the next click would use, with Length, Angle, dX and dY or the tool's own numbers (radius of Arc and Circle, depth of a Dart, distance along the contour, length of a run). Rectangle selections draw a marquee.
- **The armed tool is marked** on its toolbar button, its Toolbox button and in the status bar, which names it before the prompt (`Move Point: Click the point to move…`). Marker marks its mode the same way.
- **Design › Add › Add Point at Midpoint** (`Alt+O`, Insert toolbar, `docs/spec/02-pds.md` §6.6). A point goes at half the arc length of each selected segment, or of the segment between two selected adjacent points, and the new points become the selection; one undo step names each piece once. A locked piece among the targets refuses it with a notice. With nothing selected it arms Add Point on Contour in midpoint-only mode: each click splits the segment under it, `Esc` leaves.
- **Add Point on Contour previews its spot** with the distances from the previous and to the next point and the ratio, and snaps to the middle of a segment within the snap radius (`Ctrl` or Snap off turns that off).
- **Move Point and Move Point Along Contour work by dragging** (T29, T30): press the point, drag, release. Click, click still works. A press becomes a drag after 4 px at any zoom, so short drags at high zoom are no longer lost, and `Esc` during a held press ends the gesture, not the tool.
- **Extend in Parallel asks for the distance in a dialog** once the first and the last point of the edge are picked (positive extends, negative trims), as Create Parallel does. Cancelling the dialog leaves nothing picked; the old third click that set the distance is gone.
- **Marker: New Marker is one modal** with the Marker Definitions, the Style (the one open in PDS, or a file with Browse), the Material (with the pieces one Bundle takes of each) and the Bundles and direction per size. Create is blocked with its reason until a Style is chosen and something is ordered.
- **Marker: Pieces pane** (View › Pieces, first tab on the left): a table per Style with `placed/total` for every piece and size and a Total row. Click selects a cell's placed pieces and arms placing, double-click places the next copy, drag places at the drop point, right-click places or returns a whole size.
- **Marker: place by click.** A click on a Piece Bar thumbnail or a Pieces cell arms placing; the next copy hangs under the pointer as a ghost in its Size colour, hatched red where it would overlap, and each click on the table places it. `Esc` or a click on bare bar space stops. An empty Piece Bar now says whether there is no Style or nothing ordered. Each placed piece shows its plot label inside it.
- **Marker: Auto Nesting runs in its dialog.** Start shows elapsed time against the Time limit, the best length and Efficiency so far and the pieces placed, with **Stop** (`Esc`); a summary follows. Auto Nesting Setup has **Save**.
- **Right-click menus in the Work Area** (`docs/spec/02-pds.md` §6.7). The object under the pointer is selected first, then a menu offers what applies to it: on a segment Add Point at Midpoint, Add Point on Contour, Notch, Segment Length, Add Seam, Rotate to Horizontal and Baseline Parallel to Segment; on a point its properties, Toggle Grade/Curve Point, Notch on Point, Move Point and Delete; on a piece Piece Info, Lock, rotate, flip, copy, cut, remove and delete; on the bare desk Select, Paste, Select All, All to Desk, Zoom All and the Piece Information Text and Guide Lines checks. A Draft in progress keeps the right button for its arc.
- **Properties follows the pick** (`docs/spec/02-pds.md` §4.3). A pick on the canvas brings the Properties tab to the front of its panel without taking the keys from the canvas, the section of the object picked last comes first, and a point, notch or line pick folds the Piece section into one `Piece: <name>` line. Preferences › Tools › Show Properties when picking turns it off.
- **Edit › Undo and Redo name the command** they act on (`Undo: Move piece`), in the menu and in the toolbar tooltips.
- **Tool pop-ups match Optitex** (`docs/spec/02-pds.md` §4.3): Alt+click with the Dart tool asks Width, Depth, Overlap, Drill Distance and Drill Radius and adds the dart there; the Seam dialog has Start and End Corner and Set Last Width; Walk Options has Skip Open Pleats in the Optitex order; Notch Properties has Reverse (L notch); Add Point on Contour has Distance According To Grading Points and Move Along Contour; Alt+click with Create Parallel on a segment asks the distance for that segment; Piece Properties has Task Pieces (Selected or All) and an Adjust button for the label; Marker Properties shows the Total Pieces Area.
- **Notches plot and preview in their real shape** (I, V, T, Box, U and L with Reverse) instead of one depth line.
- **Marker: Fix on Marker** (Piece › Fix on Marker, Unfix Selected, Unfix All, and the Pieces cell menu; `docs/spec/04-marker.md` §5). A fixed piece shows a pin, refuses drags, Shoot, nudges and turns with a notice, and stays where it is during Auto Nesting even when Keep placed pieces is off. Returning it to the Piece Bar frees it; one Undo puts it back fixed. Files written before 1.4.0 load with nothing fixed.
- **Marker: Marker › Marker Definitions…** opens the Marker Properties fields as a dialog; OK applies them as one undo step. **Marker › Report…** shows the Report pane, also when it was closed.

### Changed
- The keypad shortcuts are back (`docs/spec/07-ui-shell.md` §6.2): `Num+` zooms in, `Ctrl+Num+` zooms by rectangle, `Ctrl+Shift+Num+` toggles the rulers and `Shift+=` flips horizontally, told apart from the main-row keys by the physical key. `Plus`, `F7`, `Ctrl+Shift+=` and `Alt+=` keep working.
- Toolbar and Toolbox tooltips read `Name  · shortcut`. The Optitex name is no longer in them; the command palette and the Toolbox search still match it.
- Tool, command and menu names follow Optitex (`docs/spec/02-pds.md` §5): about 80 PDS labels, the Marker and Grading actions and the prompts now read as in Optitex 15 (Select Tool, Button Tool for the Drill Hole, Baseline for the grainline, Fix on Marker, Start AutoNesting…). The Indonesian labels translate the new names. The menu opener of the docked pane is now Marker Properties; Marker Definitions… is the dialog.
- A piece dragged from the Pieces Window onto the canvas lands with its centre on the drop point.
- Sizes Table: Change Size Order moves the colour, line type, thickness and visibility with the size name.
- Move Point Along Contour slides a vertex from Grade Point to Grade Point, passing the Turn and Curve Points between them and taking its new place in the contour; it used to stop at its two neighbours. A piece with fewer than two other Grade Points stops at Turn Points instead. On a circle the vertex slides between its two neighbours, with a single stop it may go round the whole outline, and a click off that stretch keeps the vertex picked up.
- The plot's piece label prints every label field in order, one per line; it printed the piece name and the size only.
- Marker: File › New Marker no longer opens Marker Properties alone and leaves the Style and the order for later.
- Marker: returning a piece to the Piece Bar or Clear Marker also unfixes it.

### Fixed
- Grade Points were hidden until selected while **Show Non Grade Points** was off. They are always drawn now; the toggle adds the other points.

## [1.3.0] - 2026-11-01

### Added
- Opening, dropping or choosing a `.pds`, `.mrk`, `.dsn` or `.ord` file shows an "Optitex file not supported" dialog (English and Indonesian) that points to Optitex's DXF export (AAMA/ASTM, with grading) and has an **Import DXF…** button. Detected by extension only; the file is never read, and the extensions are in no file dialog filter (ADR-0001).
- **Select now moves pieces by drag** (`docs/spec/02-pds.md` T01). Press a piece (its cutting line or inside it) and drag: all selected pieces move, or the pressed piece alone when it was not selected, in one `cmd-move-piece` edit on release with the same snap, axis lock and Grade Rule behaviour as Move Piece. Dragging from empty desk still draws a selection rectangle, pressing a point, notch or internal still picks it, Shift and Ctrl drags keep their meaning and Esc cancels. Turn it off in Preferences › Tools (`tools.select_drag_moves`, default on).
- Example `line_25cm`: a 25 cm straight line on a sheet

### Fixed
- Showing a hidden pane again recreates its panel in the default place (top, left or bottom) instead of adding a tab to the Work Area; **View › Reset Layout** is the same action as Tools › Reset Workspace Layout.
- The Select tool is armed when a document opens; a tool that is already armed is kept.
- The dock layout can no longer end up stuck as one panel. Closing the side and bottom panels and showing a pane again put its tab into the Work Area's tab bar, and that layout was saved and loaded for good. A saved layout whose panes sit in fewer panels than the default gives them, or that neither shows nor hides a default pane, is now replaced by the default (logged) and the file written over; hidden panes are recorded in the file (`hidden`), so hiding one still persists. The dock is drawn only when the window leaves it at least 400 × 300 points (the splash window never does), and a layout is written only for a workspace whose dock was drawn at that size and only when it differs from what the file holds.

## [1.2.0] - 2026-11-01

### Added
- **DXF import wizard** (`docs/spec/02-pds.md` §8.1). File › File Utilities › Import From CAD/CAM Files… opens three steps: **File** (the DXF and an optional `.rul`; a `.rul` with the DXF's name is filled in), **Preview** (read on a background job that Back or Esc stops: format, units, pieces, sizes, drawing size, error and warning counts, the layers in the file, the issues and a thumbnail of the outlines) and **Options** (line mode Sew or Cut, units, which sizes, and the old Import Setup fields under More options). A file that cannot be imported, a path that does not exist and a field that does not parse block the way on with the reason. Esc closes the wizard at every step. Opening, dropping or choosing a recent `.dxf` starts it already reading the file; an import with the options of the preview opens the Style the preview read instead of reading the file again.
- **First-run tour** (`docs/spec/07-ui-shell.md` §2). The first start shows five steps over the window, each with a ring around the part it explains (start card, Toolbox, Grading, Marker and Cut Plan tabs), Next, Back, Skip Tour and Esc. It never shows again once finished or skipped; Help › Show Tour opens it again. A preferences file written before this version counts as already seen.
- `rajutara-io`: `DxfImportOptions::line_mode` (`Sew` keeps the old behaviour, `Cut` keeps the boundary as the cutting line and layer 14 as an internal Sew line), `import_dxf_with_rul_cancellable` (an explicit rule file) and `DxfFileInfo` (units, dialect and entities per layer).

### Fixed
- The import options never appeared while no document was open (the welcome card's **Import DXF…**): the PDS workspace now draws its windows through the new `Module::dialogs` hook.

## [1.1.0] - 2026-11-01

Renamed from Rajutara to **Rajutara** (*rajut* = knit, *tara* = balanced). Native files are now `.rjx` / `.rjm` / `.rjc`; the old files still open.

### Added
- Start-up splash like LibreOffice's: a small (640 × 262), centred, borderless window with the owner's artwork, a real progress bar and a status line (language, icons, modules, layout, each file argument), shown at least 600 ms. It then becomes the workspace window in one frame (decorations on, no fade). The workspace opens **maximized** on first run; after that the size, position and maximized state of the last quit are restored from `window.json` in the config directory. `--smoke` still opens one fixed 1280 × 800 window with no waiting, so `first_frame_ms` still measures the time to a usable canvas.
- Help › About credits the artwork to the project owner.
- History pane: hover a row to preview that step on the canvas (read only, nothing is undone), piece names and a relative time ("2 min ago") on each row, a disk mark on the row where the document was last saved, and a session-only "Compare with before" toggle that draws the pieces the last command touched as dashed grey ghosts of the previous step. `History::peek`, `History::entries`, `History::saved_generation` and `Command::touched` are new in `rajutara-core` (additive); `Document::mark_saved` now records the saved generation in the `History`.
- **Theme mode.** The theme can now follow the operating system: `System` is the new default next to `Dark` and `Light`, applied every frame so an OS change shows at once (dark where the system does not say; Windows 7 reports light). A three-button control (System, Dark, Light) sits at the far right of the menu bar; View › Theme and Preferences › Appearance stay in step with it. Preferences are now version 2; a saved `Light` or `Dark` is kept, and a 1.0 build refuses the newer file instead of misreading it.
- **Update check and self-update** (`docs/spec/07-ui-shell.md` §14, ADR-0015). Once a day at start-up, silently, Rajutara asks GitHub for the latest release (`update.repo`, default `madmouse17/rajutara`; Preferences › General switches it off). While a newer release exists an orange **Update available · v1.x** button appears left of the theme control and opens a dialog with the release notes and **Download and Install**; Help › Check for Updates… checks on request and always answers. Linux replaces the AppImage atomically and offers **Restart Now**; Windows runs the `.msi` through `msiexec` after **Install and Close**. New dependency `ureq` 3 (`rustls`, `json`; no OpenSSL, no async runtime); `deny.toml` and `about.toml` allow `CDLA-Permissive-2.0` (the `webpki-roots` data) and skip the duplicate `getrandom` 0.2. Debug builds honour `RAJUTARA_FAKE_UPDATE=1.9.9` to show the button without a request.
- **Welcome screen.** While PDS or Grading has no document, the Work Area shows a card with the logo, **New Style**, **Open…**, **Import DXF…**, **Open sample "Kaos Lengan Pendek"** and the five newest recent files. The sample is compiled into the program and written to `samples/` in the config directory each time it is opened.
- **File › Close** (`Ctrl+Shift+W`) closes the active document. A document with unsaved changes asks Save / Don't Save / Cancel first (`Esc` is Cancel); its autosave file goes with it. Quitting and the window's close button ask the same way.
- **File › Open Recent** keeps the newest 10 files of each kind (Style, DXF, Marker, Cut Plan), groups them by kind, moves a file to the front on every open and save, and greys out files that are gone. It was a single list of 8.
- **Drag and drop:** files dropped on the window open by extension (`.rjx`, `.rjm`, `.rjc`, `.dxf`); any other file gets a notice.
- **Toolbox search** (View › Search Tools): filters the tools live by English, Indonesian or Optitex name; `Enter` runs the first match, `Esc` clears; `/` while the Toolbox pane is focused, or typing with keyboard focus on a tool button, starts the search. It has no chord: `Ctrl+Shift+F` stays Optitex's Fold Out.
- **Renamed from Rajutara.** Files with the old `.optx`, `.optm` and `.optc` extensions still open (File › Open, drag and drop, command line; the open dialog lists them under "Legacy Rajutara files"); they open untitled and Save writes `.rjx`, `.rjm` or `.rjc`. On the first run the old `Rajutara` config directory (preferences, layouts, window) is copied into `rajutara` once. The AppImage registers MIME types for all six extensions.
- Toolbar and Toolbox tooltips read `Name  · shortcut  · Optitex: name`.
- `Ctrl` + wheel pans the canvas horizontally and `Shift` + wheel vertically; the wheel map is in `docs/spec/07-ui-shell.md` §4.1. Ctrl + wheel no longer zooms; pinch still does.

## [1.0.0] - 2026-11-01

First release. Clean-room apparel CAD for Linux (reference) and Windows 7+ (cross-built), see `docs/adr/`.

### Added
- **PDS** workspace: 89 pattern tools (drafting, points, notches, seams, darts, pleats, walk, mirror, split/join, fullness, spiral, gusset), Pieces/Properties/History panes, Plot (tiled A4, A0, HPGL/2).
- **Grading** workspace: Size Table, Grade Rules, Rule Table, Graded Nest view, 29 grading tools, ASTM graded-nest + RUL export.
- **Marker** workspace: manual placement (drag, rotate, flip, bump, Shoot), automatic nesting engine (no-fit polygons by ring convolution, bottom-left fill, simulated annealing; deterministic by seed; `Stop::Time` is a hard wall-clock limit), marker report, HPGL/2 plot and cut file.
- **Cut Plan** workspace: orders (ratio mode, CSV import), lay planning solver, nesting, consumption and cost, Cut Order with Fabric Rolls (sequence, roll allocation, remnants), CSV/PDF reports.
- Interchange: ASTM D6673 / AAMA-292 DXF import and export, RUL grade-rule files; native `.rjx` / `.rjm` / `.rjc` (zip + JSON, format 2).
- Shell: dockable panes, command palette, keyboard shortcuts, light/dark theme, English and Indonesian UI, autosave with crash recovery, `--smoke` self-check.
- Packaging: Linux AppImage; Windows x64/x86 `.zip` (portable) and `.msi` (installer) with optional Mesa software OpenGL, Windows 7 SP1 through Windows 11.

### Known limits
- Windows builds are verified under Wine and the import gate only; real-hardware run pending.
- 3D (Runway equivalent) is interface-only (ADR-0005).
- Vendor cutter drivers are not included; the cut file is generic HPGL/2 only.
