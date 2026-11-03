---
title: Marker
description: Define the fabric, ask for bundles per size, place pieces by hand or let the nesting engine do it, read the efficiency, plot, cut and report.
---

A marker is the arrangement of the pieces of one or more styles and sizes on a fabric of a given width, ready to plot or cut. In this workspace you define the fabric, ask for the garments you need, place the pieces, and read what the arrangement costs in fabric.

![The Marker workspace with the sample tee placed by hand: the Marker Table in the centre, the Piece Bar above, Marker Properties on the left, the Piece List below.](../../../../assets/screens/full-marker.jpg)

## The screen

| Pane | What it holds |
|---|---|
| Marker Table | The fabric band, in the centre. X runs along the marker length, which is the warp, and Y across the width. A line shows the used length with its value. A ruler marks every 10 cm. |
| Pieces | View, Pieces, the first tab on the left. A table per Style with `placed/total` for every piece and size, and a Total row. |
| Piece Bar | The first tab of the bottom panel. One thumbnail per style, piece and size, labelled with the piece name and the count still to place; the tooltip gives piece, Style and size. Drag to reorder: the order seeds the nesting. |
| Piece List | One row per piece and size. Code, material, quantity, rotation, flip and buffer are editable; coordinates, area and perimeter are read-only. |
| Marker Definitions | Name, material, width, length, plies, ply mode, margins, buffer, shrinkage, fabric weight, cost per metre and the Total Pieces Area. |
| Order | Bundles per size, and a direction for each size: One Way, Opposite or Any. |
| Report | The report before it is written. Marker, Report… shows it again after you close it. |

The Marker Table fills each piece solidly in its size colour, hatches overlaps in red and outlines in orange a piece inside a margin. A fixed piece shows a pin. A new or opened Marker fits the fabric width in view.

The status bar keeps these fields live: cursor position, pieces placed of requested, bundles complete of requested, overlaps, efficiency, width, used length, length per garment, plies, and the progress of a nesting run. It also has the Cut/Plot Order toggle.

## Set up

File, New Marker (`Ctrl+N`) opens one dialog with the Marker Definitions, the Style (the one open in PDS, or a file with Browse), the Material with the pieces one Bundle takes of each, and the Bundles and direction per size. Create stays blocked, with its reason, until a Style is chosen and something is ordered.

Marker, Add Style… (`Shift+O`) adds more style files. Each style is embedded in the marker, so the marker keeps working if the style file moves. If the style file changes later, the marker says so and offers Update from Style, which keeps the poses of the pieces that still exist. Marker, Marker Definitions… (`Ctrl+M`) changes the fabric and the limits as one undo step.

A bundle is the set of pieces that makes one garment of one size. Type the bundles per size in the Order pane. The direction decides how pieces may turn by 180 degrees: One Way keeps every bundle the same, Opposite alternates between bundles, Any is free.

**Ply mode.** Marker Definitions, New Marker and the wizard offer Single, Tubular, Faced and Folded. Faced and Folded hold a pair piece once, since the opposite ply gives its mirror. A half piece is still nested unfolded in Tubular and Folded, and the pane says so.

## Marker Creation Wizard

File, Marker Creation Wizard… makes several Markers in one go. Its steps are Select Style Files, Define Marker Files, Define Quantities (Bundles per Marker and size), Define Table Properties, Define Global Properties (with the buffer), Define Piece Properties (rotation, flip and buffer of each piece) and Finish. Create Markers opens one unsaved Marker per row. The piece settings go to each Marker's own copy of the Style, never to the Style open in PDS.

## Place by hand

| To | Do this |
|---|---|
| Place a piece | Drag a thumbnail onto the table, or double-click it for the first free spot, bottom left. A click on a thumbnail or a Pieces cell arms placing: the next copy hangs under the pointer as a ghost, hatched red where it would overlap, and each click on the table places it. `Esc` stops. |
| Place many | `P` arms the Place Tool, `Shift+P` places the selected bundles, and Place All places every unplaced piece, bottom-left first. |
| Move it | Drag. Overlaps are allowed and shown. |
| Return it to the bar | Double-click the placed piece, or select it and press `Del`. |
| Rotate | `Shift+R` steps to the next orientation its rules allow, as a right-click does. `F3` or `=` rotates 90°, `F4` or `-` rotates 180°. |
| Flip | Flip X (`Shift+X`) and Flip Y (`Shift+Y`). |
| Shoot | Right-click and drag a direction, then release, or press `Shift+Arrow`. The piece slides until it touches another piece, a margin or the fabric edge, keeping the buffer. |
| Nudge | Arrow keys, or the digits 2, 4, 6 and 8. The step is 1 mm unless Preferences say otherwise. |
| Select a bundle | `Ctrl+K` selects the whole bundle of the selected piece. |
| Fix a piece | Piece, Fix on Marker pins it: it refuses drags, Shoot, nudges and turns, and Auto Nesting leaves it where it is. Unfix Selected and Unfix All free it. |
| Clear the marker | `Ctrl+C` returns every piece to the bar. `Ctrl+Z` brings them back. |

`Z` arms Select.

## Insert to Hole

Piece, Insert to Hole arms a mode beside Select, Shoot and Rotate Piece. Drag a placed piece over a hole with the left or the right button. It takes the nearest free spot where it fits, and turns to any orientation its rules allow if it must. Then it bumps along the drag, like Shoot. The move is one undo step. A fixed piece, a cluster member and a drop with no fitting hole in reach are refused with a notice. One piece goes per drag.

## Clusters and Fuse Blocks

Grouping, Cluster Pieces freezes the arrangement of two or more placed pieces. A Cluster is selected, dragged, nudged, shot, fixed, returned, placed and nested as one piece. While it waits, the Piece Bar shows it as one thumbnail "Cluster n", placed by double-click or drag. A cluster only translates: turning or flipping a member is refused with a notice. Grouping, Delete Cluster releases the pieces where they lie.

Grouping, Optimum Block Fuse… and Rectangular Block Fuse… ask for the gap around the pieces (0 to 1000 mm, 10 mm first). They make a Fuse Block: a cluster with a border, either a contour that follows the pieces or a rectangle. Auto Nesting keeps other pieces out of the border, the plot draws it, and the cut file cuts the border instead of the pieces, so the block can be fused before the pieces are cut. The second cut file with the block contents and Thrifty Block Fuse are not built.

## Bump and Cut lines

A Bump Line is a vertical or horizontal wall that pieces do not cross during Auto Nesting, the Place commands and Shoot. A Cut Line is a Bump Line that the cut file cuts across the fabric.

- Drag a line out of a table edge, drag it to move it, and right-click it for its menu. Marker, Add Bumpline at Current Marker End adds one at the used length.
- Marker, Bump/ Cut Lines… lists the lines with Coordinate, Line Direction, Hide, Fixed, Cut and No Bump. It also holds the Marker Top and Bottom overcut, Show Bump Lines Description, Minimal Cut Line Segment, and an option that adds a vertical line at the marker end after each Auto Nesting.
- The cut file cuts the Cut lines and leaves out what lies inside the pieces. The plot draws cut lines solid and bump lines dashed.

## Flaws

A Flaw is a rectangle of the fabric that no piece may overlap. Marker, Flaws has:

- **Mark Flaw on the Marker**: drag a rectangle, or give Left, Right, Top and Bottom. Whole Length Flaw and Whole Width Flaw span the marker or the Material.
- **Import Flaws…** from a CSV list with one `x_from,y_from,x_to,y_to` line per flaw, in millimetres. A bad line refuses the file and is named.
- **Remove Pieces Hitting Flaws** and **Delete All Flaws**.

Auto Nesting and the Place commands keep pieces off flaws. Flaws are drawn hatched on the table and are not plotted.

## Texts on the marker

Piece, Internal Text arms the Text Tool. Click the table or a placed piece to add a text, with its Size, Angle and X and Y Position. A text on a piece moves and turns with it, and Apply To All Sizes puts it on every placed copy of the piece. Click a text to edit it, Remove it or Remove All, and drag it to move it. Texts are plotted, never cut.

## Substitute Size and Single Piece Gap

- **Substitute Size For Selected Pieces** (Grouping, Bundles) swaps each selected placed piece with a waiting copy of the same piece in the next size, in one undo step, and the order counts stay right. In the last size, or with no waiting copy, the piece stays where it is and a warning says why.
- **Single Piece Gap** (Tools menu). With a Shoot gap set in Preferences, Marker, Shoot stops that much further from the other pieces, the margins and the bump lines.

## Auto-nesting

Nesting, Start AutoNesting (`Shift+N`) places the pieces for you. The engine is Rajutara's own: it builds no-fit polygons by ring convolution, fills bottom-left, and improves the result by simulated annealing, following the published methods of Burke and others. It runs on worker threads. Its dialog shows the elapsed time against the Time limit, the best length and Efficiency so far and the pieces placed, with Stop (`Esc`, or `Ctrl+Shift+N`), then a summary. The document changes once, by one command, when the run ends.

Nesting, Auto Nesting Setup… (`Ctrl+Shift+Alt+N`) holds the settings, and Save keeps them.

| Setting | Default | Meaning |
|---|---|---|
| Time limit | 60 s | A hard wall-clock limit. |
| Efficiency limit | off | Stop early when the marker reaches it. |
| Unlimited marker length | on | Ignore the maximum length while nesting. |
| Keep placed pieces | on | Nest the unplaced pieces around the ones already placed. Fixed pieces stay put even when this is off. |
| Seed | 1 | Makes a run repeatable. |

A run that stops on the time limit depends on how fast the machine is. In the release benchmark, 300 pieces nest in 58 s at 90.1 % efficiency. The engine never leaves an overlap in its result, and a separate exact check confirms it.

![A 300-piece marker of shirt fronts on 150 cm fabric, nested by the engine, with no overlaps.](../../../../assets/screens/full-nest.jpg)

## Auto Nest Queue

Nesting, Auto Nest Queue… nests several `.rjm` files one after another on one background job, with no Marker open. Add the files with Add Markers…, then give each row its mode in the Advanced column, a maximum time and an efficiency limit, and press Run. Regular nests every piece again; Continue keeps the placed pieces and nests the waiting ones around them. Each result goes to `<stem>-nested.rjm` beside its input, and the input is never written. A file that fails shows its reason and the queue goes on. Stop saves the running row and leaves the others Pending. Closing the dialog keeps the job running, with a strip that names the row. There is one engine, so the queue has no algorithm choice, and no queue files are written.

## What the numbers mean

- **Used length**: the largest X of any placed cutting line, plus the right margin.
- **Efficiency**: the area of the placed pieces divided by the width times the used length, in percent.
- **Waste area**: the width times the used length, minus the area placed.
- **Per garment**: the used length divided by the complete bundles placed, counting the garments that the ply mode cuts.

Flaws and bump lines block placement, but they never add to the used length or change the Efficiency.

The sample tee marker reads 253.03 cm used on 180 cm width, 84.10 % efficiency and 63.26 cm per garment.

## Cutting order

The Cutting Order is the order in which the pieces go to the cutter, with the start point and the knife direction of each cut. It is not the Cut Order of a Cut Plan.

- **Marker, Selected Piece Cut Order…** sets one piece's place in the cutting sequence, its start point and its direction (Clockwise or Counter-clockwise). Set to all the same placed pieces applies it to every placed piece of the same kind.
- **Marker, Optimize Cut Order…** orders the cuts nearest-neighbour from the table corner, or from the top of the marker, and can choose each start point.
- **View, Cut/Plot Order**, also a status-bar toggle, numbers the pieces and marks each start.

Without a Cutting Order, every cut runs clockwise from the lowest-left point of the piece.

## Report, plot and cut

File, Report to Excel… (`Ctrl+R`) writes an Excel workbook (`.xlsx`) with one worksheet per section, and File, Print… (`Ctrl+P`) writes a PDF. Both have the same sections: general figures, the order, every piece, and the notches by shape.

File, Plot/Cut… (`Ctrl+L`) offers PDF as A4 tiles, PDF on A0 sheets (tiled along the length when the marker is longer than a sheet), HPGL/2 for a roll plotter, and the cut file. Plots carry a label on each piece, the marker texts and a header block with the marker name, material, width, length and efficiency. The cut file is one generic HPGL/2 file with a pen per element; pen 0 skips an element. It follows the Cutting Order, the start points and the directions, cuts a Fuse Block as its border alone, and adds the Cut lines. File, Plotter Setup… holds the paper width, offset and calibration.

## Not built

- Tilt, stripe and plaid matching, and piece buffers by side.
- Placing a half piece on the fold edge in Tubular and Folded.
- A choice of nesting engine, and bundle grouping in Auto Nesting Setup.
- A size picker for Substitute Size: it takes the next size only.
- Quality Text and Exclusive View for the Text Tool, Lock and OpStop for bump lines, and Overlay properties in the wizard.

See the [roadmap](../../roadmap/).
