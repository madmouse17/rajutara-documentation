---
title: Parity checklist
description: What an Operator trained on Optitex 15 finds in Rajutara 1.5.0, module by module.
---

What an Operator trained on Optitex 15 finds in Rajutara 1.5.0, module by module. rajutara mirrors the module split, tool names and workflows of Optitex 15 ([`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §3); it does not copy any Optitex file or format ([ADR-0001](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0001-clean-room-no-reverse-engineering.md)).

The rows come from the coverage tables at the end of the implementation plans ([`04-pds-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/04-pds-part2.md), [`05-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/05-grading.md), [`06-marker-part2.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/06-marker-part2.md), [`07-cutplan.md`](https://github.com/madmouse17/rajutara/blob/main/docs/plans/07-cutplan.md)), from the "not mirrored" tables of the specs, and from the code: an action registered as disabled, or a control drawn disabled, is not counted as shipped. The 117 PDS action ids of the PDS coverage table all exist in `crates/rajutara-pds`. Tool numbers (`T01`, `G01`) are those of the specs ([`02-pds.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/02-pds.md) §5, [`03-grading.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/03-grading.md) §6). A version in a note, such as (1.4.0) or (1.5.0), names the release that changed the row. What Optitex added after version 15 is in [`08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md).

| Status | Meaning |
|---|---|
| Yes | Built and enabled. |
| Partial | Built with a documented gap: a part is disabled, approximated or reachable another way. The note says which. |
| No | Not built. The note says whether the specs schedule it or rule it out, and why. |

## Summary

| Module | Yes | Partial | No |
|---|---|---|---|
| PDS | 111 | 4 | 5 |
| Grading | 35 | 0 | 3 |
| Marker | 37 | 4 | 5 |
| Cut Plan | 17 | 0 | 6 |
| Interchange, shell and platform | 9 | 3 | 6 |

Not built, by decision (wave B): Seam and Stitch Manager (3D), Swap Zone Segment Tool and Move Piece On Piece Tool (no public behaviour); deferred: Segment Editor pane and Use Darts, Snap To Track Lines, Equal Segments Options and group window, Marker Quality Text, fold-edge placement of half pieces (V2), Auto Nesting engine choice (V1) and bundle grouping (V2).

## PDS (pattern design)

All 101 tools T01 to T101. Optitex "Baseline" is "Grainline" and "Button" is "Drill Hole" in rajutara ([`GLOSSARY.md`](https://github.com/madmouse17/rajutara/blob/main/GLOSSARY.md)).

### General: selection, view, files and reports

| Optitex 15 tool | Status | Note |
|---|---|---|
| T01 Select Tool | Yes | |
| T02 Zoom By Rectangle, Zoom In, Zoom Out, Zoom All, Zoom Real, Zoom Selection | Yes | `Num+`, `Ctrl+Num+` and `Ctrl+Shift+Num+` work as in Optitex (1.4.0): egui reports the keypad `+` and `Shift+=` as the same key, so the physical key tells them apart. `Num-` is still `Ctrl+-`. |
| T03 Pan | Yes | |
| T04 Guide Lines, Guideline Through | Yes | |
| T05 Piece Info, Piece Properties | Yes | (1.5.0) Piece Properties gain Color (a fill of the piece's own, or Auto), One line and Separator for the Description Text, and Fixed Placement (`02-pds.md` §4.3). In the Piece menu the item reads "Info", as Optitex's submenu does. |
| T06 Lock Piece | Yes | |
| T19 Cut, Copy and Paste pieces | Yes | Pasting into a Style with another Size Table opens a size-mapping dialog. |
| T20 Delete Piece | Yes | |
| T21 Piece Update, Save Active as New | Yes | |
| T22 Merge Style File | Yes | |
| T23 Arrange For Plot | Yes | |
| T24 Style Area And Perimeter | Yes | |
| T65 Select Internals Tool | Yes | |
| T69 Text Tool | Yes | (1.5.0) Press on a piece's description block and drag it to move it; `Alt+click` on the block edits its height and angle (O/25 label layout). |
| T79 Measure Tool | Yes | |
| T80 Compare Length window | Yes | |
| Report to Excel | Yes | (1.5.0) Writes an Excel workbook `.xlsx` (one worksheet); before, a CSV. |

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
| T25 Draft Tool | Yes | (1.5.0) Dynamic Input: type the Length, `Tab` to the Angle, `Enter` places the point. Polar Tracking lands a point on a 45° or perpendicular ray. Both toggle in the status bar and in View (`02-pds.md` §2.3, §6.1). Advanced Snap and Interactive Guide Lines are not built. |
| T26 Arc | Yes | |
| T27 Add Point On Contour Tool | Yes | (1.4.0, 1.5.0) The spot and its distances show before the click; `Alt+click` and Proportional 0.5 puts the point at the middle, as in Optitex. Point Name is a field of the dialog and of Point Properties; the name is kept in the file, not drawn. |
| T28 Point Tool | Yes | |
| T29 Move Point Tool | Yes | (1.4.0) Works by press, drag and release as well as click, click. |
| T30 Move Point Along Contour | Yes | (1.4.0) Slides from Grade Point to Grade Point, by click or by drag. |
| T31 Move Points Proportionally Tool | Yes | |
| T32 Move Points Parallelly | Yes | |
| T33 Multi Move Tool | Yes | |
| T34 Toggle Grade Point, Toggle Curve Point | Yes | `Alt+1` and `Alt+2` replace the keypad digits, which egui cannot tell from the main row. |
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
| T45 Extend in Parallel | Yes | (1.4.0) Asks the distance in a dialog once the first and the last point are picked. |
| T46 Create By Offsets | Yes | |
| T47 Create Point Connection, Add Points and Create Connection | Yes | |

### Notches and internals

| Optitex 15 tool | Status | Note |
|---|---|---|
| T48 Notch Tool | Yes | (1.5.0) Type I (Optitex's straight slit), Depth and Relationship Proportional 0.5 cut a slit in the middle of a segment. |
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
| T68 Extend Internal Object | Yes | (1.5.0) The typed amount is the default reach; a contour segment is refused with a pointer to Extend in Parallel. |
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
| T59 Cut Seam Angle Tool (Seam Corner) | Yes | (1.5.0) Intersect, Bevel, Square, Mirror and Custom; Custom asks Depth A and Depth B (5 mm first) in the Seam Corner dialog, the Seam Tool corner fields and Point Properties. |

### Split, join and fold

| Optitex 15 tool | Status | Note |
|---|---|---|
| T71 Cut Tool (Cut a Piece) | Yes | |
| T72 Cut Along Internal | Yes | |
| T73 Join Pieces Tool | Yes | |
| T76 Fold In Tool, Fold Out | Yes | |
| T77 Fold onto Point Tool (Point To Point Fold) | Yes | |
| T78 Walk Tool | Yes | (1.5.0) Support Notch: click the contour of a third piece to walk on along it; the moving piece gets a notch at the junction with the Type and Command of Walk Options. Reconnect and Grading Walking are not built. |

### Darts, pleats and fullness

| Optitex 15 tool | Status | Note |
|---|---|---|
| T81 Dart Tool | Yes | |
| T82 Close Dart | Yes | (1.5.0) Tools › Darts › Reopen Darts (T101) opens every closed dart again. |
| T83 Change Darts Overlap | Yes | |
| T84 Rotate Dart | Yes | Same action as T81, as in Optitex. |
| T85 Add Fullness Tool | Yes | |
| T86 Pleat Tool | Yes | |
| T87 Pleat Line Tool | Yes | |
| T88 Removing Excess Cloth Tool | Yes | |
| T89 Gusset Tool | Yes | |

### Wave B tools (T90–T101)

| Optitex 15 tool | Status | Note |
|---|---|---|
| T90 Segment Editor (Copy, Flip X/Y, Inverse, Use Grading, Use Notches, Paste Proportional, Paste Notches, Paste Between 2 Points, Paste As Internal Contour) | Partial | (1.5.0) Tools › Segment Editor, `Ctrl+G` copies. No Segment Editor pane ("Show"): the paste tools draw the copied run under the pointer instead; Use Darts is deferred. |
| T91 Track Lines, Show Track Lines, Restore By Track Line, Clear Track Lines | Partial | (1.5.0) Ghosts of contour and internals (O/22), Base Size, for the session only. Snap To Track Lines is deferred (snap engine change, low value). |
| T92 Wave Tool | Yes | (1.5.0) Insert toolbar and Design › Contour; New Wave or Contour Change; `Tab` / `Shift+Tab` add and remove waves. |
| T93 Deform Internals (Transform Circle To Contour, Circle To Button, Button To Circle) | Yes | (1.5.0) Design › Deform Internals. |
| T94 Equal Segments (Definition, Show With Color) | Partial | (1.5.0) Groups of runs stay equal in length or shape after every edit, in the same undo step. No group list window; Equal Segments › Options (groups made after Cut) is deferred. |
| T95 Fold Line to Line Tool | Yes | (1.5.0) Piece › Modify; folds the whole piece, as Flip Along Line does. |
| T96 Swap Piece Properties Tool | Yes | (1.5.0) Piece › General; two selected pieces trade their properties, not their shape. |
| T97 Build Zone Tool, Trace Zone Tool, Create Pieces From Map, Correct All Pieces By Map | Yes | (1.5.0) Design › Internal to Piece. Zone preferences are fixed defaults (internals included, grainline kept). |
| Swap Zone Segment Tool | No | Out: the only public page gives its icon and location, no behaviour. |
| T98 Spread Pieces, Gather Pieces | Yes | (1.5.0) Piece › Fabric And Stripes; the Work Area and the plot draw the derived copies, Arrange For Plot leaves room for them. |
| T99 Fabric Pattern, View Fabric, Set Stripes Group, Stripes Ungroup, Relate Piece To Stripes | Partial | (1.5.0) The stripe data is stored and drawn; nothing is matched yet: stripe and plaid matching in the Marker is wave C (V3, `08-v2-roadmap.md`). |
| T100 Save Placement, Restore Placement, Fixed Placement | Yes | (1.5.0) Piece › General and Piece Properties. |
| T101 Reopen Darts | Yes | (1.5.0) Tools › Darts. |
| Move Piece On Piece Tool | No | Out: the only public page gives its icon and location (Edit toolbar, Toolbox Movement), no behaviour. |

### Panes, view and menus

| Optitex 15 feature | Status | Note |
|---|---|---|
| Pieces Window and Pieces Table | Yes | |
| Properties pane for pieces, points and notches | Yes | |
| View and Selection, History, Import Report and Compare Length panes | Yes | (1.5.0) View and Selection gains Show Track Lines and View Fabric. |
| Toolbox with folding categories | Yes | |
| Rulers, grid, guide lines and snapping | Yes | |
| Status bar toggles: segment length, seam, non-grade points, snap | Yes | (1.4.0) Grade Points are always drawn; the Non Grade Points toggle adds the other points. A Track Lines toggle in the status bar (O/17) is not built. |
| Tool pointers, rubber bands and live readouts | Yes | (1.4.0) Each tool has its pointer (its icon on a crosshair, the move cross, not-allowed over a protected piece); every two-point tool shows a band and a readout from its first pick. |
| Selected, active and hovered objects marked | Yes | (1.4.0) Tint, heavier outline, corner ticks on the active piece, rings and heavier strokes on what a click would hit. |
| Piece Information Text on the desk | Yes | (1.4.0, 1.5.0) View › Piece Information Text; the same lines go to the plot and the DXF; One line and Separator join them. |
| Armed tool marked on the toolbar, the Toolbox and the status bar | Yes | (1.4.0) |
| Submenu captions that differ from the tool name (Piece › Info, Contour › Smooth Segment, Equal Segments › Definition…) | Yes | (1.5.0) Fluent `.menu` captions in menus; toolbars, tooltips, the palette and right-click menus keep the full name (`07-ui-shell.md` §9). |
| Theme Settings (Tools menu) | Yes | (1.5.0) Tools › Theme Settings › System / Dark / Light, the same as View › Theme. |
| Working units: centimetre, millimetre, inch | Yes | |
| Digitizer, Data Exchange, Batch, Test Alternative Start Points, Printer Setup, Customize Excel Report | No | Hardware drivers, batch scripting and cutter start points are out of scope; OS dialogs replace Printer Setup. |
| Piece › Cutting Order (PDS) | No | Cutter output is out of scope. The Marker has its own Cutting Order (see Marker below). |
| Seam and Stitch Manager | No | Belongs to 3D ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |

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
| G22 Stack Along Line | Yes | (1.5.0) Select one contour segment, then Grading › Stack › Stack Along Line: every size's run is centred on the Base Size's at its arc-length midpoint and turned parallel to it. Display only; Restore Stack clears it. Disabled, with its reason, unless exactly one contour segment is selected. |
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
| Check Grading view | Yes | Not a gap: the public 2013 menu tree has no such item; the topic is covered by the Graded Nest (G29), Stack (G20–G23) and Compare Length (T80). |
| Export of graded nests and RUL files, import of graded nests | Yes | |
| Update Seam Grading, Reseam Segment (Keep Grading), Keep Grading In Auto Reseam | Yes | Not needed: seams are derived at every size. |
| Multi-dimensional size systems (variations), Cross Grading by merging Style files | No | Phase 3. |
| Measurement Charts, Dynamic Measurement Chart, made-to-measure | No | Measurement Charts are Phase 3. Parametric resizing is excluded by [ADR-0004](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0004-rule-based-grading-not-parametric.md). |
| Optitex rule-table files | No | Excluded by ADR-0001. The open ASTM RUL format is read and written instead ([ADR-0013](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0013-astm-rul-is-open-format.md)). |

## Marker

### Setup and panes

| Optitex 15 feature | Status | Note |
|---|---|---|
| New Marker with Marker Properties: width, length, margins, buffer, shrinkage, fabric weight, cost per metre | Yes | (1.4.0) One modal with the Style (open in PDS or a file), the Material and the Bundles per size. |
| Material and Ply Mode: Single | Yes | |
| Ply Mode Tubular, Faced, Folded | Partial | (1.5.0) Enabled in Marker Properties, Marker Definitions, New Marker and the Marker Creation Wizard. Faced and Folded instance a pair piece once (the opposite ply gives the mirror); per garment uses the garments of each mode (`04-marker.md` §4, §8.1). Placing a half piece on the fold edge is not built (V2): half pieces are nested unfolded, and the pane says so. |
| Marker Creation Wizard (with buffer fields) | Yes | (1.5.0) File › Marker Creation Wizard…: Style files, Marker files, quantities, table, global properties with the buffer, piece properties with rotation, flip and buffer, then one unsaved Marker per row (`04-marker.md` §1.1). Overlay properties are not built. |
| Add Style from files or from the Style open in PDS | Yes | |
| Update from Style, "style changed on disk" notice | Yes | |
| Order: Bundles and direction per size (One Way, Opposite, Any) | Yes | |
| Marker Table: fabric band, margins, used-length line, rulers, overlap hatching | Yes | |
| Piece Bar: thumbnails with remaining count, reorder, multi-select, double-click to place | Yes | |
| Piece List, Marker Properties, Order and Report panes | Yes | |
| Pieces pane: placed and total per piece and size | Yes | (1.4.0) |
| Status bar: pieces, bundles, overlaps, efficiency, width, length, per garment, plies | Yes | |

### Manual placement

| Optitex 15 feature | Status | Note |
|---|---|---|
| Place from the Piece Bar by drag or double-click | Yes | |
| Place by click, with a ghost of the piece under the pointer | Yes | (1.4.0) From the Piece Bar or the Pieces pane. |
| Move by drag, overlaps allowed and highlighted | Yes | |
| Return to the Piece Bar | Yes | |
| Rotate and flip: right-click, `Shift+R`, `F3` or `=` (90°), `F4` or `-` (180°), `Shift+X`, `Shift+Y` | Yes | (1.5.0) Keys follow the Optitex Marker list; the rajutara-only `R`, `F` and `F9` are gone. |
| Rotate tool, free rotation for Any, snap to 90° within 8° | Yes | |
| Shoot: right-drag, Shoot tool, `Shift+Arrow` | Yes | (1.5.0) `Shift+Arrow` replaces the rajutara-only `Ctrl+Arrow`. Shoot stops at bump lines. |
| Single Piece Gap | Yes | (1.5.0) Tools › Single Piece Gap with the shoot gap of Preferences › Marker: Shoot stops that much further from the other pieces, the margins and the bump lines (`04-marker.md` §5.7). |
| Nudge by the Manual Moving Step | Yes | |
| Place Selected Bundles, Place All, Place One Bundle | Yes | |
| Select Whole Bundle, multi-select by `Ctrl`, `Shift` and rectangle | Yes | |
| Clear Marker | Yes | |
| Text Tool (marker annotations) | Yes | (1.5.0) Piece › Text Tool (menu caption "Internal Text"): texts on the table or on a placed piece, which they follow; Apply To All Sizes; Remove and Remove All; plotted, never cut (`04-marker.md` §5.3). Quality Text and Exclusive View are not built. |
| Cutting Order (Selected Piece Cut Order), Optimize Cut Order, Cut/Plot Order | Yes | (1.5.0) The cut file follows the order, each cut's start vertex and its direction, clockwise by default (`04-marker.md` §9.2). Tool or layer per sequence, overlap and Use Frame are cutter control and not built. |
| Bump/Cut Lines | Yes | (1.5.0) Marker › Bump/ Cut Lines… and Add Bumpline at Current Marker End; drag a line out of a table edge; right-click menu. Lines block Auto Nesting, the Place commands and Shoot; Cut lines go to the cut file with overcut and minimal segment; the O/26 automatic end line is a setting (`04-marker.md` §5.4). Lock and OpStop are cutter control and not built. |
| Insert To Hole | Yes | (1.5.0) Piece › Insert to Hole: drag a piece over a hole and it takes the nearest spot where it fits, turning if it must (`04-marker.md` §5). Several pieces per drag, Adjust and Adjust Rotate are not built. |
| Tilt | No | Phase 3. The Tilt Step preference is kept. |
| Fix On Marker (Fix on Marker, Unfix Selected, Unfix All) | Yes | Pin glyph, refused moves, kept by Auto Nesting (04 §5). |
| Cluster Pieces, Delete Cluster | Yes | (1.5.0) A cluster is placed, moved, shot, nested and returned as one piece. It only translates: turning or flipping a member is refused with a notice (`04-marker.md` §5.1). |
| Optimum Block Fuse, Rectangular Block Fuse | Yes | (1.5.0) A Fuse Block is a cluster with a border at a set gap; the cut file cuts the border, not the pieces (`04-marker.md` §5.2). The second cut file with the block contents and Thrifty Block Fuse (Optitex 8 only) are not built. |
| Substitute Size For Selected Pieces | Partial | (1.5.0) Grouping › Bundles: each selected piece swaps with a waiting copy in the next size, one undo step (`04-marker.md` §5.6). Only the next size; a dialog that picks the size is not built. |
| Flaws: Mark Flaw on the Marker, flaw list import, Remove Pieces Hitting Flaws | Yes | (1.5.0) Marker › Flaws; Auto Nesting and the Place commands keep pieces off flaws, which never add to the used length; the flaw list is rajutara's own CSV layout (`04-marker.md` §5.5). Flaws are drawn hatched but not plotted. |
| Stripe and plaid matching | No | Wave C (V3, `08-v2-roadmap.md`). PDS already stores the Fabric Pattern, Stripe Groups and stripe points (T99). |
| Piece buffers by side | No | V2 (`08-v2-roadmap.md`). |

### Auto nesting, reports and output

| Optitex 15 feature | Status | Note |
|---|---|---|
| Start Auto Nesting with live progress and Stop | Yes | (1.4.0) One modal: Start, progress, Stop and a summary. Own engine (no-fit polygon, bottom-left fill, annealing); Optitex runs third-party engines. |
| Auto Nesting Setup: time limit, efficiency limit, unlimited length, keep placed pieces, seed | Partial | Engine choice: rajutara has one engine; a choice appears when V1 ships a second. Bundle grouping needs grouping constraints in the engine and comes with the shading groups of V2 (`08-v2-roadmap.md` §3.2). Block options of the setup dialog are not mirrored (block fuse by hand is built). |
| Nesting Queue | Yes | (1.5.0) Nesting › Auto Nest Queue…: several Marker files nested one after another, each saved beside its input as `<stem>-nested.rjm` (`04-marker.md` §6.7). One engine, so no Algorithm or Renest choice; no queue files. |
| Marker metrics: used length, efficiency, waste, cutting length, per garment, weight per bundle | Yes | (1.5.0) Per garment counts the garments of the ply mode; flaws and bump lines never add to the used length. |
| Report to Excel | Yes | (1.5.0) An Excel workbook `.xlsx` with one worksheet per section: General, Order, Pieces and Notches (`04-marker.md` §8.2). Before, a CSV. Customize Excel Report is not built. |
| Report as PDF (Print) | Yes | |
| Plot to PDF (A4 tiles, A0) and HPGL/2, Plotter Setup | Yes | |
| Cut file | Partial | One generic HPGL/2 cut file, with the Cut lines of the Marker (1.5.0). Vendor cutter formats are not written. |
| Time Calculation, Label Text Order, Opstop | No | Cutter-driver and Optitex automation features, out of scope. |
| Auto Save of Markers | No | Wave C (V4 batch, `08-v2-roadmap.md`): Optitex splits one order into several Markers when one is full, which needs lay planning or batch work. The NST (cncKad) file is out of scope. The interval autosave of Preferences › Save already covers Markers. |

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
| Nest Markers: real nested lengths replace estimates, markers saved as `.rjm` | Yes | |
| Results: markers, lays, ordered, planned and difference, totals and cost | Yes | |
| Manual edit of plies and ratios | Yes | |
| Cut Plan report (CSV, PDF) and Production Report | Yes | |
| Cut Order: lay sequence | Yes | |
| Fabric Rolls: code, colour, shade, width, length, CSV import | Yes | |
| Roll allocation, Remnants, Missing fabric | Yes | Whole Plies per roll; splicing a Ply across two rolls is not planned. |
| Validation: sizes, quantities, limits, widths | Yes | (1.5.0) A piece wider than the Material is refused by Solve and Nest Markers, by name, before any nesting; the file still opens, with a warning, so the width can be fixed (`05-cutplan.md` §6). A maximum length below the longest single Bundle stays a warning: the Bundle can still be cut, and its marker is flagged "too long". |
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
| CSV reports and quantity lists | Yes | Cut Plan reports, quantity lists, Fabric Rolls and the Marker flaw list. |
| Excel workbook reports (`.xlsx`) | Yes | (1.5.0) Report to Excel in PDS and Marker; rajutara's own minimal writer, no new dependency. |
| Style, Marker and Cut Plan documents | Yes | rajutara's own `.rjx`, `.rjm` and `.rjc` (zip and JSON). Save is atomic and keeps a `.bak`. |
| Undo and redo | Yes | |
| Autosave and crash recovery | Yes | |
| Dockable panes, one window for PDS, Grading, Marker and Cut Plan | Yes | Optitex ships these as separate programs. |
| Menus, toolbars and default shortcuts of Optitex 15 | Partial | Keypad shortcuts are remapped because egui cannot tell keypad keys from main-row keys. (1.5.0) Submenus show the Optitex captions where they differ from the tool name. |
| Windows 7 and newer, 32-bit and 64-bit | Partial | Built and checked under Wine and by the import-table gate; not yet run on real Windows 7 hardware. |
| macOS | No | Untested, not excluded. |
| Optitex native files (`.pds`, `.mrk`, `.dsn`, `.ord`) | No | Never read or written (ADR-0001). |
| Vendor cutter drivers | No | Out of scope; the output is HPGL/2. |
| 3D garment simulation (PDS 3D window, 3D Runway) | No | Interface contract only ([ADR-0005](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0005-3d-out-of-implementation-scope.md)). |
| O/Cloud | No | Not mirrored. |
| Optitex Shell batch scripting | No | Not mirrored. |
