---
title: Marker
description: Define the fabric, ask for bundles per size, place pieces by hand or let the nesting engine do it, read the efficiency, plot and report.
---

A marker is the arrangement of the pieces of one or more styles and sizes on a fabric of a given width, ready to plot or cut. In this workspace you define the fabric, ask for the garments you need, place the pieces, and read what the arrangement costs in fabric.

![The Marker workspace with the sample tee placed by hand: the Marker Table in the centre, the Piece Bar above, Marker Properties on the left, the Piece List below.](../../../../assets/screens/full-marker.jpg)

## The screen

| Pane | What it holds |
|---|---|
| Marker Table | The fabric band, in the centre. X runs along the marker length, which is the warp, and Y across the width. A line shows the used length with its value. A ruler marks every 10 cm. |
| Piece Bar | One thumbnail per style, piece and size, with the count still to place. Drag to reorder: the order seeds the nesting. |
| Piece List | One row per piece and size. Code, material, quantity, rotation, flip and buffer are editable; coordinates, area and perimeter are read-only. |
| Marker Properties | Name, material, width, length, plies, ply mode, margins, buffer, shrinkage, fabric weight and cost per metre. |
| Order | Bundles per size, and a direction for each size: One Way, Opposite or Any. |
| Report | The report before it is written. |

The Marker Table fills each piece with its size colour, hatches overlaps in red and outlines in orange a piece inside a margin.

The status bar keeps these fields live: cursor position, pieces placed of requested, bundles complete of requested, overlaps, efficiency, width, used length, length per garment, plies, and the progress of a nesting run.

## Set up

File, New Marker (`Ctrl+N`) opens Marker Properties. Then Marker, Add Style picks style files, or the style open in PDS; each is embedded in the marker, so the marker keeps working if the style file moves. If the style file changes later, the marker says so and offers Update from Style, which keeps the poses of the pieces that still exist.

In the Order pane, type the bundles per size. A bundle is the set of pieces that makes one garment of one size. The direction decides how pieces may turn by 180 degrees: One Way keeps every bundle the same, Opposite alternates between bundles, Any is free.

## Place by hand

| To | Do this |
|---|---|
| Place a piece | Drag a thumbnail onto the table, or double-click it. Double-click places it at the first free spot, bottom left. |
| Move it | Drag. Overlaps are allowed and shown. |
| Return it to the bar | Double-click the placed piece. |
| Rotate or flip | Right-click the piece. It steps to the next orientation its rules allow. |
| Shoot | Right-click and drag a direction, then release. The piece slides until it touches another piece, a margin or the fabric edge, keeping the buffer. |
| Nudge | Arrow keys, or the digits 2, 4, 6 and 8. The step is 1 mm unless Preferences say otherwise. |
| Place all | The toolbar button places every unplaced piece, bottom-left first. |
| Clear the marker | `Ctrl+C` returns every piece to the bar. `Ctrl+Z` brings them back. |

## Auto-nesting

Nesting, Start Auto Nesting (`F9`) places the pieces for you. The engine is Rajutara's own: it builds no-fit polygons by ring convolution, fills bottom-left, and improves the result by simulated annealing, following the published methods of Burke and others. It runs on worker threads, shows its progress in the status bar, and has a Cancel button. The document changes once, by one command, when the run ends.

| Setting | Default | Meaning |
|---|---|---|
| Time limit | 60 s | A hard wall-clock limit. |
| Efficiency limit | off | Stop early when the marker reaches it. |
| Unlimited marker length | on | Ignore the maximum length while nesting. |
| Keep placed pieces | on | Nest the unplaced pieces around the ones already placed. |
| Seed | 1 | Makes a run repeatable. |

A run that stops on the time limit depends on how fast the machine is. In the release benchmark, 300 pieces nest in 58 s at 90.1 % efficiency. The engine never leaves an overlap in its result, and a separate exact check confirms it.

![A 300-piece marker of shirt fronts on 150 cm fabric, nested by the engine, with no overlaps.](../../../../assets/screens/full-nest.jpg)

## What the numbers mean

- **Used length**: the largest X of any placed cutting line, plus the right margin.
- **Efficiency**: the area of the placed pieces divided by the width times the used length, in percent.
- **Waste area**: the width times the used length, minus the area placed.
- **Per garment**: the used length divided by the complete bundles placed.

The sample tee marker reads 253.03 cm used on 180 cm width, 84.10 % efficiency and 63.26 cm per garment.

## Report and plot

File, Report to Excel writes a UTF-8 CSV and File, Report writes a PDF, both with the same sections: general figures, the order, every piece, and the notches by shape. `Ctrl+L` plots: PDF on A0 sheets, tiled along the length when the marker is longer than a sheet, or an HPGL/2 file for a roll plotter, with a label on each piece and a header block with the marker name, material, width, length and efficiency. File, Export Cut File writes one generic HPGL/2 cut file: labels in pen 1, drill holes in pen 3, cut internals and the cutting line in pen 2, pieces in order of position.

## Not in 1.0

Cluster pieces, delete cluster, fix on marker, block fuse, substitute size and the nesting queue are Phase 3. Ply modes other than single, the text tool, cutting order, optimize cut order and bump or cut lines are not shipped in the Marker workspace. See the [roadmap](../../roadmap/).
