---
title: PDS, pattern design
description: Import or draft pieces, edit points, notches and seams, group pieces in Style Sets, check lengths and plot. The PDS workspace and its 101 tools.
---

PDS is where pieces come from. Import them from an ASTM or AAMA DXF, or draw them, then edit points, notches, seams and internal lines, check segment lengths, and plot the pieces at 1:1.

![The PDS workspace with the sample tee: the Pieces Window across the top, the Toolbox and Properties on the left, the FRONT piece with segment lengths in the Work Area, the Pieces Table below.](../../../../assets/screens/full-pds.jpg)

## The screen

The panes are dock tabs. Drag a tab to move it, and Tools, Reset Workspace Layout restores the default arrangement. The workspace remembers its own layout, and a layout saved by an earlier version keeps working.

Since 1.5.0 the default layout gives the Work Area most of the window: the Toolbox column on the left, the Work Area in the middle, Properties in its own column on the right, and one bottom panel with the Pieces Window as its first tab. At 1280×800 the Work Area is about 745×395 px. Selecting something no longer hides the Toolbox. With no document open, the Work Area shows New and Open… buttons.

| Pane | What it holds | Key |
|---|---|---|
| Work Area | The desk where the pieces lie. It cannot be closed. | |
| Pieces Window | First tab of the bottom panel. One thumbnail per piece, with name, quantity and `L/R` for a pair. Drag one onto the desk, or double-click it. | `1` |
| Toolbox | The tools, grouped as on the toolbars. | `3` |
| Properties | Its own column on the right. The fields of the selected piece, point, segment or notch. Several pieces edit at once. | `Ctrl+I` |
| View and Selection | What is shown and what can be picked. | `F10` |
| Grading Table | The grade rule of the selected point. | `2` |
| Pieces Table | Every piece in a grid: name, code, quantity, pair, material, rotation, flip, buffer, area, perimeter. | `6` |
| Compare Length | Two runs of a contour, measured against each other. | `5` |
| Style Set | The Style Sets of the Style and the rows of the selected set. | `4` |
| History | The undo history, shared with the other workspaces. | |
| Import Report | The issues of the last import. It opens when there are any. | |

The status bar toggles segment lengths (`F8`), the seam (`Ctrl+F6`), Non Grading Points (`Shift+0`), the graded sizes (`F4`), Snap (`F7`), Dynamic Input and Polar Tracking. Grade Points are always drawn; the Non Grading Points toggle adds the other points. Snap off turns snapping off for every tool. On the right the status bar shows `Protected` for a locked piece, `SEW` or `CUT` for the line being edited, the unit (click it to cycle centimetres, millimetres and inches) and the cursor position. Menus tick the toggles that are on, such as View › Snap, Fill with Color, Dynamic Input and Polar Tracking. Where pieces overlap, a click takes the piece drawn on top, as the hover mark shows.

## On the desk

- Each piece gets its own fill colour from a 12-colour palette: pastels in the light theme, deep tones in the dark one. A piece keeps its colour in every size and workspace. View, Fill with Color turns the fills off.
- Whatever a click would hit gets a red ring or outline, as Optitex shows its snap. The selection stays orange. A tool that takes a second point draws a dashed band from the first pick, with Length, Angle, dX and dY next to the pointer.
- **Piece Information Text.** View, Piece Information Text shows the label fields of each piece on the desk, one per line. The plot prints the same lines.
- A right-click selects the object under the pointer first, then the menu offers what applies to it. The piece and point menus have a Grading submenu (Sizes Table, Set Grading Tool, Copy Grading, Paste Grading). Internal lines, drill holes and annotations offer Copy Internal Object and Move Or Copy Internal Tool.
- With any tool armed and no button pressed, hold `Space` to move the piece under the pointer; `Ctrl+Space` moves the internal under the pointer. Releasing Space drops it as one undo step, and the armed tool stays armed. Space does not move a protected piece.
- `Enter` on a selection opens its properties: Point Properties for selected points, else Piece Properties. `Del` with Select deletes the selected sub-objects, or else removes the piece from the Work Area. `Shift+Del` deletes the piece.

A selected segment, or two adjacent selected points, shows a Segment section in Properties: its length, Sew or Cut, and Straight or Curve.

## Tools

There are 101 tools, in the groups the toolbars and menus use.

| Group | Examples |
|---|---|
| General | Select (`Z`), zoom and pan, guide lines, piece properties, lock piece (`F3`), cut, copy and paste pieces, merge a style file |
| Piece movement and rotation | Move, rotate (`R`), rotate to horizontal or vertical, flip, Save Placement and Restore Placement |
| Grainline and half symmetry | Set the grainline direction (`/`), set a half (`H`), open and close the half (`Shift+H`, `Ctrl+H`) |
| New pieces | Rectangle, polygon, circle, sector and arc pieces, spiral, pieces from the zones of a map |
| Drafting and points | Draft (`D`), arc (`A`), add a point on the contour (`O`), move a point (`M`), multi move (`Q`) |
| Contour | Align points, round corner, cut corner, smooth, points cleanup, Extend and Extend in Parallel, Wave Tool, Segment Editor, Equal Segments |
| Notches and internals | Notch (`N`), notch on a point, text, trim, extend, move and select internal lines, Deform Internals |
| Seams | Add seam (`S`), remove seam, reseam, show seam, switch between cut and sew, Set Basic Seam, the Custom seam corner |
| Split, join and fold | Cut, join pieces, join contours, build a piece, trace segments, Fold Line to Line |
| Darts, pleats and fullness | Dart (`Ctrl+Alt+D`), pleat (`L`), add fullness, gusset, Reopen Darts |
| Piece properties | Swap Piece Properties, a colour per piece, the one-line label, Spread and Gather Pieces, Fabric And Stripes, Track Lines |

Press `Ctrl+Shift+P` to find a tool by name instead of by key. A tool that needs several clicks shows the next step in the status bar, and `Esc` cancels it. Holding `Alt` while you click opens a dialog for exact values. Each tool has its own pointer: its icon on a crosshair, the move cross over a piece Move Piece would drag, and "not allowed" over a protected piece. From a display scale of 1.5× up, the pointers are drawn at 48 px instead of 32 px.

Every notch has a shape (V, T, I, L, U or Box), a depth and a width. I is the straight slit. A grainline is a directed line the marker uses to turn the piece along the fabric. The seam allowance has a width per segment: the cutting contour is the sewing contour plus the allowance.

The [parity checklist](../../parity-checklist/) lists all 101 tools one by one. Inside a submenu an item shows the Optitex caption where it differs from the tool name, for example Piece, Info or Contour, Smooth Segment; toolbars, tooltips, the command palette and right-click menus keep the full name.

## Drafting with typed values

Dynamic Input and Polar Tracking are two toggles in the status bar and in the View menu. Rajutara keeps both in the preferences.

- **Dynamic Input** (on by default). While Draft waits for its next point, type the Length, press `Tab` to switch to the Angle, and press `Enter` to place the point. `Shift+Enter` places a Curve Point. `Esc` clears what you typed. While Draft waits for numbers, the digit shortcuts stay quiet.
- **Polar Tracking** (off by default). A point near a 45° ray, or near the perpendicular to the last segment, lands on that ray. A dashed ray shows the angle.

The other tools keep their `Alt+click` dialogs.

## Points and notches

- **Add Point on Contour** (`O`) shows the spot, the distance from the previous point, the distance to the next point and the ratio before you click. For a point in the middle of a segment, `Alt+click` and choose Proportional 0.5. Add Point at Midpoint is gone, because Optitex has no such command.
- **Point Name.** The Add Point on Contour dialog has a Point Name field. Point Properties has a Name row for selected contour points and Internal Line points. The name is saved in the `.rjx`. It is not drawn and not written to DXF.
- To put a slit in the middle of a segment, arm the Notch Tool and `Alt+click` the segment. In Notch Properties choose Type I, a Depth, Direction Perpendicular and Relationship Proportional with 0.5. The plot, the DXF (layer 4) and the cut file carry it as a slit notch.
- **Notch presets.** The Notch Tool dialog and Notch Properties have Preset and Save as Preset…. A preset keeps the shape, depth, width, Top Width, reverse and command. View, Notch Presets… renames and deletes presets. They live in the preferences, so every Style sees the same list.
- **Top Width.** A Box notch has a Top Width, its width at the tip; empty means the same as the width. The Work Area, the plot, and the Marker plot and cut file draw it.
- You can select a notch in the seam allowance of a piece whose stored line is the sew line: a click tests the cutting line, so Select and Properties reach it. A notch that a point edit re-anchors keeps its place in every size.
- **Move Point and Move Point Along Contour** work by click, click or by press, drag and release. The new contour shows as a dashed outline while the old one dims.
- Drill holes and texts can differ per size. Drill Hole Properties, Appearance in sizes, has one check per size. Annotation Properties, Text in sizes, has one field per size; an empty field means the main text. The plot, the graded-nest DXF, the Marker and the Grading views follow each size. The Work Area marks a hole that is absent in the shown size with a small cross.

## Editing many pieces at once

- **Global Piece Info** (Piece menu) selects every piece on the desk. **Global Internal** selects every internal line of the selected pieces, or of all pieces when none is selected. The Properties pane then edits them together and shows "Different" where the values disagree. One edit is one undo step.
- **Set Basic Seam** (Tools, Seam) gives one seam width to the whole contour of every selected piece, in one undo step.
- **Change Multiple Internal Attributes** filters by Min and Max of notch depth, width and Top Width, and of drill-hole radius.
- **Swap Piece Properties Tool** (Piece, General) gives two selected pieces each other's name, code, description, quantity, pair, material, label and Marker rules. Their shapes stay where they are.
- With Preferences, PDS, Copied pieces set to Auto Renumber, Paste and Save Active as New give the copy the source's trailing `_n` plus one, or `_1`, and count on while that name is taken. Standard copy keeps the old naming. A paste between Styles with different Base Sizes keeps every size where it was.

## Seam corners

Seam Corner, the corner fields of the Seam Tool and Point Properties offer Intersect, Bevel, Square, Mirror and Custom. Custom asks for Depth A and Depth B, 5 mm at first.

Switch Cut/Sew and Switch Pieces to SEW/CUT say how many pieces change their stored line and ask you to Continue. Do not ask again turns the question off; Preferences, PDS, Confirm switching between sew and cut lines turns it back on. Convert Sew Internals To Seam moves darts, pleats and the mirror line onto the new sew line, or keeps them internal and says why.

## Contour and internal lines

- **Extend in Parallel** is on the Contour toolbar, next to Extend. After you pick the first and the last point of the edge, it asks for the distance: a positive value extends, a negative one trims. A neighbour it cannot reach is joined with a straight step, and the notice names the point.
- **Segment Length** has Moving end Both ends: each end moves half the change. Extend By Curve is refused with Both ends.
- **Extend Internal Object** opens on the amount field with "By an extension amount" chosen, so a typed length is used at once. A click on a contour segment is refused with a pointer to Extend in Parallel.
- **Wave Tool** (Insert toolbar, Design, Contour). Click the first and the last point, move the pointer for the height and click. It makes two waves by default; `Tab` adds one and `Shift+Tab` removes one. `Alt` on the third click opens the dialog: Waves, Internal Points On Wave, Height, Angle, and New Wave or Contour Change. Between two contour points of one piece it reshapes the contour; anywhere else it adds an internal line.
- **Deform Internals** (Design, Deform Internals) has Transform Circle To Contour, Transform Circle To Button and Transform Button To Circle, one undo step each.
- **Fold Line to Line Tool** (Piece, Modify) folds a piece so that one of its lines takes the direction of another.
- **Reopen Darts** (Tools, Darts) opens every dart that Close Dart shows closed.
- Grading follows the edit. Build Piece points on an Internal Line take the grading interpolated along it. Remove Excess Cloth turns the internal lines, drill holes and texts of the moved region with their Grade Rules. Pleat Lines keep their own geometry, since no public source describes Optitex's.

## Segment Editor

Tools, Segment Editor has a clipboard of its own. Copy (`Ctrl+G`) takes the selected run, or the whole contour when one point is selected. Flip X, Flip Y and Inverse turn the copy, and Use Grading and Use Notches choose what goes with it. Paste Proportional, Paste Between 2 Points, Paste Notches and Paste As Internal Contour each paste in one undo step, and show the fitted run under the pointer first. There is no Segment Editor pane and no Use Darts.

## Track Lines

Tools, Track Lines, Track Lines (`Ctrl+Alt+T`) remembers every piece. A piece you change then shows its old contour and internals as a thin dashed ghost, while Show Track Lines (`Ctrl+Shift+Alt+T`, also in View and Selection) is on. Restore By Track Line puts the old shape back in one undo step, and Clear Track Lines (`Ctrl+T`) starts again from the current shape. Track lines last for the session and are not saved.

## Equal Segments

Design, Equal Segments, Definition… (`Ctrl+Alt+Q`) groups two or more selected runs. A group keeps them equal in length only, or in shape too, proportionally if you ask, with Fix Last Point, Mirror, Inverse and a colour. After every edit the other runs follow the one you changed, in the same undo step. A run on a protected piece is skipped with a notice. Show With Color draws each group in its colour.

## Zones and map pieces

A map piece is a flat sketch of the garment whose areas become the real pieces. Design, Internal to Piece has Build Zone Tool, where you click inside an area, and Trace Zone Tool, where you click the runs round it. Create Pieces From Map makes one piece per zone. When the map changes, Correct All Pieces By Map rebuilds those pieces and keeps their properties.

## Fabric, stripes and spread pieces

- **Fabric And Stripes** (Piece, Fabric And Stripes). Fabric Pattern… stores the stripe repeat and gap of the fabric, and View Fabric draws the stripe grid. Set Stripes Group and Stripes Ungroup number the pieces that share one stripe match, and Relate Piece To Stripes marks the point of a piece that sits on a stripe. The Marker matches these pieces to its stripes with Stripe Adjust; see [Marker](../marker/).
- **Spread Pieces** (same menu) shows a copy beside a piece for each further quantity and pair, the pair copies mirrored, in the Work Area and in the plot. Arrange For Plot leaves room for them. Gather Pieces removes them.

## Placement, colour and label

- **Save Placement** (Piece, General) gives every piece on the desk Fixed Placement. **Restore Placement** moves the fixed pieces back where they were. It undoes moves, turns and flips, but not point edits, and takes the other pieces off the desk. Fixed Placement is also a check in Piece Properties.
- **Color** in Piece Properties picks a fill for the selected pieces in one undo step. Auto goes back to the palette colour.
- **One line** in Piece Properties prints the description on one line, joined by the Separator. The Work Area, the plot and the DXF label follow it. With the Text Tool, drag a piece's description to move it, or `Alt+click` it to set its height and angle.

## Style Sets

A Style Set is a named list of the Style's pieces, for example the pieces of one fabric or one variant. View, Style Set (`4`) opens its pane. Each row has its own Code, Description, Material, Quantity, Pair and X/Y Shrink, so the same piece can appear in two sets, or twice in one set, with different values.

The pane has a search field that ignores case and accents, and Create, Remove, Duplicate (named `@<name>`), Description, Add Pieces, Remove Pieces and Place. Place puts only the set's pieces on the desk and arranges them for plot. Each edit is one undo step. A set cannot be renamed once made.

New Marker, the Marker Creation Wizard and Cut Plan, Add Style… can embed one Style Set instead of the whole Style. Update from Style keeps the set.

## Walk with a support notch

Walk Options has Support Notch (on by default), its Type and its Command (Cut first). While walking, click the contour of a third piece to walk on along it, from its vertex nearest the junction. The moving piece gets a notch at the junction, in one undo step "Support notch". Reconnect and Grading Walking are not built.

## Import and export

File, Import From CAD/CAM Files reads ASTM D6673 and AAMA-292 DXF files, with the RUL file of a graded style. File, Export To CAD/CAM Files writes them back, with a choice between a rule file (the default) and a graded nest. Layer by layer, the DXF is described in [File formats](../../formats/). Rajutara never reads or writes the formats of Optitex itself.

File, Report to Excel writes an Excel workbook, `<style>.xlsx`, with the piece, code, size, quantity, material, area and the cut and sew perimeters.

File, Production Sheet… writes an A4 PDF for the sewing floor: the Style facts (Author, Date, Sizes, Base Size, Notes), the pieces table (Name, Code, Description, Quantity, Pair, Material, and Area and Perimeter at the Base Size), a drawing of the Base Size pieces and one table per Measurement Chart. The chart tables show the measured values only. The Date is the day of printing, in UTC.

## Backups

Every save keeps the previous file as a `.bak`. File, Open Backup opens the `.bak` of the open Style, or of a Style you pick, as a new unsaved document. Save then asks where to write, so the backup is not overwritten. The command is disabled, with the reason, when there is no backup.

## Plot

`Ctrl+L` opens the Plot dialog.

| Field | Choices |
|---|---|
| Pieces | All, on the desk, or selected. Selected if there is a selection, else on the desk. |
| Sizes | A check list of sizes, and whether to nest the sizes in one outline set. |
| Elements | Cut line, sew line, internal lines, notches, drill holes, grainline, mirror line, annotations, piece label. |
| Target | PDF as A4 tiles (the default), PDF on A0, an HPGL/2 file, or a DXF (release 12, millimetres, colours from the Plotter Setup pens). The dialog remembers the target used last. |
| Arrange first | Lays the pieces out on the sheet width before plotting. |
| Translate piece names | Prints each name through Tools, Piece Name Dictionary…. |

The cut line plots solid and the sew line dashed, notches are drawn as their shape on the cutting line, and the grainline has arrowheads. The piece label prints every label field in order, one per line. Arrange for Plot (`Ctrl+K`) does the layout by itself: pieces sorted by height, placed in rows left to right with a gap (10 mm by default), and rotated 90 degrees when a long piece would not fit the width. Plotting runs on a worker thread with progress and a Cancel button.

Tools, Piece Name Dictionary… is a Name → Translation table, for example English to Indonesian, with Add, Remove, Import and Export (`.csv` or `.xlsx`). It is stored in the preferences. With Translate piece names on, the PDS and Marker plots and the Marker's Export to CAD/CAM print the translation of a name that matches exactly.

## Not built

- The Segment Editor pane and its Use Darts.
- Snap To Track Lines, and a Track Lines toggle in the status bar.
- The Equal Segments group window and Equal Segments, Options.
- Swap Zone Segment Tool and Move Piece On Piece Tool: no public description says what they do.
- The Seam and Stitch Manager, which belongs to 3D.
- Custom special notch forms, and renaming a Style Set.

[Roadmap](../../roadmap/) has the full list.
