---
title: Changelog
description: What changed in each Rajutara release.
---

All notable changes to rajutara. Format: [Keep a Changelog](https://keepachangelog.com/), versions: [SemVer](https://semver.org/).

## [Unreleased]

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
