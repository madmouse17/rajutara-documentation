---
title: Parity checklist
description: What an Operator trained on Optitex 15 finds in Rajutara 1.0.0, module by module.
---

What an Operator trained on Optitex 15 finds in Rajutara 1.0.0, module by module. Rajutara mirrors the module split, tool names and workflows of Optitex 15 ([`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §3); it does not copy any Optitex file or format ([ADR-0001](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0001-clean-room-no-reverse-engineering.md)).

The rows come from the coverage tables at the end of the implementation plans ([`04-pds-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/04-pds-part2.md), [`05-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/05-grading.md), [`06-marker-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/06-marker-part2.md), [`07-cutplan.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/07-cutplan.md)), from the "not mirrored" tables of the specs, and from the code: an action registered as disabled, or a control drawn disabled, is not counted as shipped. The 117 PDS action ids of the PDS coverage table all exist in `crates/rajutara-pds`. Tool numbers (`T01`, `G01`) are those of the specs ([`02-pds.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/02-pds.md) §5, [`03-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/03-grading.md) §6). What Optitex added after version 15 is in [`08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md).

| Status | Meaning |
|---|---|
| Yes | In 1.0.0 and enabled. |
| Partial | In 1.0.0 with a documented gap: a part is disabled, approximated or reachable another way. The note says which. |
| No | Not in 1.0.0. The note says whether the specs schedule it (Phase 3) or rule it out. |

## Summary

| Module | Yes | Partial | No |
|---|---|---|---|
| PDS | 95 | 1 | 4 |
| Grading | 33 | 0 | 4 |
| Marker | 23 | 4 | 9 |
| Cut Plan | 16 | 1 | 6 |
| Interchange, shell and platform | 8 | 3 | 6 |

## PDS (pattern design)

All 89 tools T01 to T89. Optitex "Baseline" is "Grainline" and "Button" is "Drill Hole" in Rajutara ([`GLOSSARY.md`](https://github.com/madmouse17/rajutara/blob/main/GLOSSARY.md)).

### General: selection, view, files and reports

| Optitex 15 tool | Status | Note |
|---|---|---|
| T01 Select Tool | Yes | |
| T02 Zoom By Rectangle, Zoom In, Zoom Out, Zoom All, Zoom Real, Zoom Selection | Yes | Keypad shortcuts are remapped: egui cannot tell keypad keys from main-row keys. |
| T03 Pan | Yes | |
| T04 Guide Lines, Guideline Through | Yes | |
| T05 Piece Info, Piece Properties | Yes | |
| T06 Lock Piece | Yes | |
| T19 Cut, Copy and Paste pieces | Yes | Pasting into a Style with another Size Table opens a size-mapping dialog. |
| T20 Delete Piece | Yes | |
| T21 Piece Update, Save Active as New | Yes | |
| T22 Merge Style File | Yes | |
| T23 Arrange For Plot | Yes | |
| T24 Style Area And Perimeter | Yes | |
| T65 Select Internals Tool | Yes | |
| T69 Text Tool | Yes | |
| T79 Measure Tool | Yes | |
| T80 Compare Length window | Yes | |

### Piece movement and rotation

| Optitex 15 tool | Status | Note |
|---|---|---|
| T07 Move Piece Tool | Yes | |
| T08 Rotate Piece Tool | Yes | |
| T09 Rotate Clockwise, Rotate Counter Clockwise | Yes | |
| T10 Rotate To Horizontal, Rotate To Vertical | Yes | |
| T11 Flip Horizontal, Flip Vertical | Yes | |
| T12 Flip Along Line Tool | Yes | |
| T13 Scale | Yes | |

### Grainline and half symmetry

| Optitex 15 tool | Status | Note |
|---|---|---|
| T14 Set Baseline Direction, New Baseline, Rotate To Initial Baseline, Baseline Parallel to Segment | Yes | |
| T15 Set Half Tool, Set Mirror Line Tool | Yes | |
| T16 Open Half, Close Half | Yes | |

### New pieces

| Optitex 15 tool | Status | Note |
|---|---|---|
| T17 Create A Rectangular, Polygonal, Circular, Sector, Arc Piece | Yes | |
| T18 Create A Spiral Piece | Yes | |
| T74 Build Piece Tool | Yes | |
| T75 Trace Segments Tool | Yes | |

### Drafting and points

| Optitex 15 tool | Status | Note |
|---|---|---|
| T25 Draft Tool | Yes | |
| T26 Arc | Yes | |
| T27 Add Point On Contour Tool | Yes | |
| T28 Point Tool | Yes | |
| T29 Move Point Tool | Yes | |
| T30 Move Point Along Contour | Yes | |
| T31 Move Points Proportionally Tool | Yes | |
| T32 Move Points Parallelly | Yes | |
| T33 Multi Move Tool | Yes | |
| T34 Toggle Grade Point, Toggle Curve Point | Yes | Shortcuts are remapped like the keypad keys above. |
| T35 Contour Point Properties | Yes | |
| T36 Delete Tool | Yes | |

### Contour

| Optitex 15 tool | Status | Note |
|---|---|---|
| T37 Align Points (Horizontal, Vertical, By Line) | Yes | |
| T38 Round Corner Tool | Yes | |
| T39 Cut Corner Tool | Yes | |
| T40 Smooth Tool | Yes | |
| T41 Points Cleanup | Yes | |
| T42 Add Spline Support Points | Yes | |
| T43 Segment Length | Yes | |
| T44 Create Parallel | Yes | |
| T45 Extend in Parallel | Yes | |
| T46 Create By Offsets | Yes | |
| T47 Create Point Connection, Add Points and Create Connection | Yes | |

### Notches and internals

| Optitex 15 tool | Status | Note |
|---|---|---|
| T48 Notch Tool | Yes | |
| T49 Notch On Point | Yes | |
| T50 Add Points To All Notches | Yes | |
| T51 Change Multiple Internal Attributes | Yes | |
| T60 Circle Tool, Circle By Three Points | Yes | |
| T61 Button Tool | Yes | Called Drill Hole. |
| T62 Add Several Buttons | Yes | Called Several Drill Holes. |
| T63 Add Several Lines | Yes | |
| T64 Move Or Copy Internal Tool | Yes | |
| T66 Join Internal Contours Tool | Yes | |
| T67 Trim Tool | Yes | |
| T68 Extend Internal Object | Yes | |
| T70 Copy, Paste Internal Object | Yes | |

### Seams

| Optitex 15 tool | Status | Note |
|---|---|---|
| T52 Add Seam, Seam Tool | Yes | |
| T53 Remove Seam, Remove Seam On Segment | Yes | |
| T54 Switch to Cut, Switch to Sew, Switch Pieces to SEW, Switch Pieces to CUT | Yes | |
| T55 Reseam | Yes | Kept for habit: the second line is always derived from the Seam Allowance, so there is no stale seam. |
| T56 Copy Seam, Paste Seam | Yes | |
| T57 Convert Seam To Internal | Yes | |
| T58 Convert Sew Internals To Seam | Yes | |
| T59 Cut Seam Angle Tool (Seam Corner) | Partial | Intersect, Bevel, Square and Mirror work. The Custom corner is a disabled button until Phase 3. |

### Split, join and fold

| Optitex 15 tool | Status | Note |
|---|---|---|
| T71 Cut Tool (Cut a Piece) | Yes | |
| T72 Cut Along Internal | Yes | |
| T73 Join Pieces Tool | Yes | |
| T76 Fold In Tool, Fold Out | Yes | |
| T77 Fold onto Point Tool (Point To Point Fold) | Yes | |
| T78 Walk Tool | Yes | |

### Darts, pleats and fullness

| Optitex 15 tool | Status | Note |
|---|---|---|
| T81 Dart Tool | Yes | |
| T82 Close Dart | Yes | |
| T83 Change Darts Overlap | Yes | |
| T84 Rotate Dart | Yes | Same action as T81, as in Optitex. |
| T85 Add Fullness Tool | Yes | |
| T86 Pleat Tool | Yes | |
| T87 Pleat Line Tool | Yes | |
| T88 Removing Excess Cloth Tool | Yes | |
| T89 Gusset Tool | Yes | |

### Panes, view and menus

| Optitex 15 feature | Status | Note |
|---|---|---|
| Pieces Window and Pieces Table | Yes | |
| Properties pane for pieces, points and notches | Yes | |
| View and Selection, History, Import Report and Compare Length panes | Yes | |
| Toolbox with folding categories | Yes | |
| Rulers, grid, guide lines and snapping | Yes | |
| Status bar toggles: segment length, seam, non-grade points, snap | Yes | |
| Working units: centimetre, millimetre, inch | Yes | |
| Digitizer, Data Exchange, Batch, Test Alternative Start Points, Printer Setup, Customize Excel Report | No | Hardware drivers, batch scripting and cutter start points are out of scope; OS dialogs replace Printer Setup. |
| Cutting Order, Fabric and Stripes, Spread/Gather Pieces | No | Cutter output is out of scope; stripe matching is Phase 3. |
| Wave, Deform Internals, Zones (Build, Trace, Swap Zone), Equal Segments | No | Phase 3, or zone features outside scope. |
| Segment Editor, Track Lines, Theme Settings, Seam and Stitch Manager | No | Phase 3. The theme lives in the View menu; the Seam and Stitch Manager belongs to 3D. |

## Grading

| Optitex 15 feature | Status | Note |
|---|---|---|
| G01 Set Grading Tool | Yes | |
| G02 Copy Grading | Yes | |
| G03 Paste Grading, Paste X Grading, Paste Y Grading | Yes | |
| G04 Paste Relatively | Yes | |
| G05 Paste Grading Around | Yes | |
| G06 Flip X Grading, Flip Y Grading | Yes | |
| G07 Equal X Grading, Equal Y Grading (Grade Equally) | Yes | |
| G08 Zero Grading, Zero X, Zero Y (Clear Grading) | Yes | |
| G09 Grade Along Line | Yes | |
| G10 Grade Proportional Tool | Yes | |
| G11 Move Point Size | Yes | |
| G12 Move Size Along | Yes | |
| G13 Move Size Proportional | Yes | |
| G14 Move Size by Rectangle | Yes | |
| G15 Move Size Parallel | Yes | |
| G16 Align Points Size | Yes | |
| G17 Align Vertical Size, Align Horizontal Size | Yes | |
| G18 Align Size by Line | Yes | |
| G19 Match Segment | Yes | |
| G20 Stack Point | Yes | |
| G21 Stack by Baseline | Yes | |
| G22 Stack Along Line | No | Listed in the Grading menu and disabled, with its reason, until Phase 3: it needs a stack mode the model does not have yet. |
| G23 Restore Stack | Yes | |
| G24 Remove Baseline Grading | Yes | |
| G25 Create Piece for Selected Size | Yes | |
| G26 Rules Library (Rule Table) | Yes | |
| G27 Apply Rule | Yes | |
| G28 Select Grade Points | Yes | |
| G29 Graded Nest Tool | Yes | |
| Sizes Table: insert, append, delete, delete all, rename, order, set Base Size, break sizes, Regrade By Break, up to 99 sizes | Yes | |
| Grading Table pane: per-size dX, dY, dd, absolute or incremental, previous and next grading point | Yes | |
| Graded Nest display, Stack Point display, Base Size only, Show Non Grade Points | Yes | |
| Export of graded nests and RUL files, import of graded nests | Yes | |
| Update Seam Grading, Reseam Segment (Keep Grading), Keep Grading In Auto Reseam | Yes | Not needed: seams are derived at every size. |
| Multi-dimensional size systems (variations), Cross Grading by merging Style files | No | Phase 3. |
| Measurement Charts, Dynamic Measurement Chart, made-to-measure | No | Measurement Charts are Phase 3. Parametric resizing is excluded by [ADR-0004](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0004-rule-based-grading-not-parametric.md). |
| Optitex rule-table files | No | Excluded by ADR-0001. The open ASTM RUL format is read and written instead ([ADR-0013](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0013-astm-rul-is-open-format.md)). |

## Marker

### Setup and panes

| Optitex 15 feature | Status | Note |
|---|---|---|
| New Marker with Marker Properties: width, length, margins, buffer, shrinkage, fabric weight, cost per metre | Yes | |
| Material and Ply Mode: Single | Yes | |
| Ply Mode Tubular, Faced, Folded | Partial | Drawn disabled in Marker Properties. The Cut Plan plans these modes. |
| Add Style from files or from the Style open in PDS | Yes | |
| Update from Style, "style changed on disk" notice | Yes | |
| Order: Bundles and direction per size (One Way, Opposite, Any) | Yes | |
| Marker Table: fabric band, margins, used-length line, rulers, overlap hatching | Yes | |
| Piece Bar: thumbnails with remaining count, reorder, multi-select, double-click to place | Yes | |
| Piece List, Marker Properties, Order and Report panes | Yes | |
| Status bar: pieces, bundles, overlaps, efficiency, width, length, per garment, plies | Yes | |

### Manual placement

| Optitex 15 feature | Status | Note |
|---|---|---|
| Place from the Piece Bar by drag or double-click | Yes | |
| Move by drag, overlaps allowed and highlighted | Yes | |
| Return to the Piece Bar | Yes | |
| Rotate and flip: right-click, `R`, `Shift+R`, `F` | Yes | |
| Rotate tool, free rotation for Any, snap to 90° within 8° | Yes | |
| Shoot: right-drag, Shoot tool, `Ctrl+Arrow` | Yes | |
| Nudge by the Manual Moving Step | Yes | |
| Place Selected Bundles, Place All, Place One Bundle | Yes | |
| Select Whole Bundle, multi-select by `Ctrl`, `Shift` and rectangle | Yes | |
| Clear Marker | Yes | |
| Text Tool (marker annotations) | No | Scheduled for Phase 2; not shipped. |
| Cutting Order, Optimize Cut Order, Bump/Cut Lines | No | Scheduled for Phase 2; not shipped. |
| Tilt, Insert To Hole | No | Phase 3. The Tilt Step preference is kept. |
| Cluster Pieces, Delete Cluster, Fix On Marker | No | Phase 3. |
| Optimum Block Fuse, Rectangular Block Fuse | No | Phase 3. |
| Substitute Size | No | Phase 3. |
| Stripe and plaid matching, flaws, piece buffers by side | No | Phase 3. |

### Auto nesting, reports and output

| Optitex 15 feature | Status | Note |
|---|---|---|
| Start Auto Nesting with live progress and Cancel | Yes | Own engine (no-fit polygon, bottom-left fill, annealing); Optitex runs third-party engines. |
| Auto Nesting Setup: time limit, efficiency limit, unlimited length, keep placed pieces, seed | Partial | Optitex also offers a choice of engines, bundle grouping and block options; those are not mirrored. |
| Nesting Queue | No | Phase 3. |
| Marker metrics: used length, efficiency, waste, cutting length, per garment, weight per bundle | Yes | |
| Report to Excel | Partial | Written as CSV, not as an Excel file: General, Order, Pieces and Notches sections. |
| Report as PDF | Yes | |
| Plot to PDF (A4 tiles, A0) and HPGL/2, Plotter Setup | Yes | |
| Cut file | Partial | One generic HPGL/2 cut file. Vendor cutter formats are not written. |
| Time Calculation, Label Text Order, Opstop, Auto Save of Markers | No | Cutter-driver and Optitex automation features, out of scope. |

## Cut Plan

| Optitex 15 feature | Status | Note |
|---|---|---|
| Style and order details: Order Name, Client, Operator | Yes | |
| Colours and quantities per size, with totals | Yes | |
| Use Sizes Ratio, largest-remainder rounding | Yes | |
| Deviation per cell, no under-cutting | Yes | |
| CSV import of quantities | Yes | |
| Material: name, width, ply mode (Single, Tubular, Faced, Folded), shrinkage, cost per metre, weight | Yes | |
| Marker limits: maximum length, minimum and maximum plies, maximum bundles, waste limit, end allowance | Yes | |
| Estimated efficiency, material cost share | Yes | |
| Lay planning: markers, plies and ratios | Yes | Deterministic greedy solver; Optitex does not publish its own. |
| Nest Markers: real nested lengths replace estimates, markers saved as `.optm` | Yes | |
| Results: markers, lays, ordered, planned and difference, totals and cost | Yes | |
| Manual edit of plies and ratios | Yes | |
| Cut Plan report (CSV, PDF) and Production Report | Yes | |
| Cut Order: lay sequence | Yes | |
| Fabric Rolls: code, colour, shade, width, length, CSV import | Yes | |
| Roll allocation, Remnants, Missing fabric | Yes | Whole Plies per roll; splicing a Ply across two rolls is not planned. |
| Validation: sizes, quantities, limits, widths | Partial | A maximum length below the longest single Bundle is flagged, not refused. A piece wider than the Material is caught when nesting, not when estimating. |
| Spreading groups that mix Materials | No | Phase 3. |
| Fabric room inventory shared between plans, roll list export | No | Phase 3. Rolls live in each plan. |
| Roll groups by width and shrinkage, each with its own markers | No | Phase 3. |
| Several cutting tables per Material | No | Phase 3. |
| Several Styles in one Cut Plan | No | Phase 3. |
| Command-line execution | No | Not planned. |

## Interchange, shell and platform

| Optitex 15 feature | Status | Note |
|---|---|---|
| ASTM D6673 DXF import and export | Yes | ASCII DXF only; a binary DXF is refused with a message. Every skipped or approximated entity is listed in the Import Report. |
| AAMA-292 DXF import and export | Partial | AAMA-292 itself is not public. Layers follow ASTM D6673's carry-over; the export writes an R12 header and layers 1 to 15 only. |
| Graded nests and ASTM RUL grade-rule files | Yes | |
| Plot to PDF (A4 tiles, A0, A4 fit) and HPGL/2 | Yes | |
| CSV reports and quantity lists | Yes | |
| Style, Marker and Cut Plan documents | Yes | Rajutara's own `.optx`, `.optm` and `.optc` (zip and JSON). Save is atomic and keeps a `.bak`. |
| Undo and redo | Yes | |
| Autosave and crash recovery | Yes | |
| Dockable panes, one window for PDS, Grading, Marker and Cut Plan | Yes | Optitex ships these as separate programs. |
| Menus, toolbars and default shortcuts of Optitex 15 | Partial | Keypad shortcuts are remapped because egui cannot tell keypad keys from main-row keys. |
| Windows 7 and newer, 32-bit and 64-bit | Partial | Built and checked under Wine and by the import-table gate; not yet run on real Windows 7 hardware. |
| macOS | No | Untested, not excluded. |
| Optitex native files (`.pds`, `.mrk`, `.dsn`, `.ord`) | No | Never read or written (ADR-0001). |
| Vendor cutter drivers | No | Out of scope; the output is HPGL/2. |
| 3D garment simulation (PDS 3D window, 3D Runway) | No | Interface contract only ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |
| O/Cloud | No | Not mirrored. |
| Optitex Shell batch scripting | No | Not mirrored. |
