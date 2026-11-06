---
title: File formats
description: ASTM D6673 and AAMA-292 DXF, ASTM RUL, HPGL/2, PDF, CSV, Excel and OpenDocument workbooks and the native style, marker and cut plan files.
---

Rajutara exchanges patterns through open standards and keeps its own work in plain zip and JSON. It never reads or writes the file formats of Optitex.

| Format | Direction | Used for |
|---|---|---|
| ASTM D6673 and AAMA-292 DXF | Import and export | Patterns and graded nests |
| DXF release 12 | Export | The PDS plot and the Marker plot content (Export to CAD/CAM Files) |
| ASTM RUL | Import and export | Grade rules beside a graded-nest DXF |
| HPGL/2 | Export | Plotter files and the marker cut file |
| PDF | Export | A4 tiles, one A0 sheet or one A4 page; markers, reports and the Production Sheet |
| CSV | Import and export | Order quantities, fabric rolls, the Fabric Room, measurement specs, the Piece Name Dictionary and marker flaw lists in; reports out |
| Excel workbook (`.xlsx`) | Import and export | Report to Excel, Measurement Chart reports, the Fabric Room and the Piece Name Dictionary out; quantities, fabric rolls, the Fabric Room, measurement specs and the Piece Name Dictionary in |
| OpenDocument spreadsheet (`.ods`) | Import | Quantities, fabric rolls, the Fabric Room, measurement specs and the Piece Name Dictionary |
| `.rjx`, `.rjm`, `.rjc` | Open and save | Style, Marker and Cut Plan: zip and JSON, format 3 |

The earlier extensions `.optx`, `.optm` and `.optc` open as well. The [gallery](/rajutara-documentation/gallery/) offers the sample tee in most of the formats above.

## Native files

A style, a marker and a cut plan are each one zip archive with two entries: `manifest.json`, which names the format and its version, and `document.json`, which holds the content. Lengths are millimetres. A marker embeds the styles it uses, so it opens without the style files. The same input and the same settings write byte-identical files. A file written by a newer format version is refused, never truncated. Save is atomic and keeps the previous file as a `.bak`. [Headless and scripting](../headless/) shows how to read one with a few lines of Python.

Rajutara 2.0.0 writes native format 3 ([ADR-0018](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0018-native-format-3.md)). It opens files of format 2 and older and migrates them as they load: a Style or a Marker keeps its content, and a Cut Plan becomes a plan with one Purchase Order that holds the old order, markers and Lays. Rajutara 1.5.x and older refuse a format 3 file with "made by a newer rajutara (format version 3; this build reads up to 2)". If several PCs share files, update them together.

Within format 2, releases 1.4.0 and 1.5.0 added optional keys. A file without them loads as before:

| Key | Since | Holds |
|---|---|---|
| `thickness_mm` on each size | 1.4.0 | The line thickness of the size in the Graded Nest. |
| `clusters`, `cut_order` in a `.rjm` | 1.5.0 | The Clusters and Fuse Blocks, and the Cutting Order: sequence, start vertex and direction per piece. |
| `bump_lines`, `cut_lines`, `flaws`, `texts` in a `.rjm` | 1.5.0 | Bump and Cut lines with their settings, flaws and marker texts. |
| `name` on a vertex of a `.rjx` | 1.5.0 | The Point Name. |
| `equal_segments`, `fabric` on a `.rjx` Style | 1.5.0 | Equal Segments Groups and the Fabric Pattern. |
| `placement`, `spread`, `zones`, `from_zone`, `color` on a piece | 1.5.0 | Fixed Placement, Spread Pieces, the zones of a map piece and the zone a piece came from, and the piece's own colour. |
| `stripe_group`, `stripe_point` in the cut rules of a piece | 1.5.0 | The Stripe Group and the stripe point. |
| `one_line`, `separator` in a piece label | 1.5.0 | The one-line label layout. |

A 1.4.0 build opens a 1.5 file but drops that content, so saving there loses it, and it refuses a Style whose Graded Nest uses Stack Along Line.

## ASTM D6673 and AAMA-292 DXF

Rajutara reads and writes the DXF of ASTM D6673-10, AutoCAD R13, with one block per piece and one style per file. The layers are numbered, not named.

| Layer | Holds | Layer | Holds |
|---|---|---|---|
| 1 | Piece boundary, and the system text of the style and of each piece | 9, 10 | Stripe and plaid reference lines |
| 2 | Turn points | 11 | Internal cutouts |
| 3 | Curve points | 13 | Drill holes, with the diameter |
| 4 | V and slit (I) notches | 14 | Sew lines |
| 5 | Grade reference line | 15 | Annotation text |
| 6 | Mirror line | 80 to 83 | T, castle (Box), check (L) and U notches |
| 7 | Grain line | 84 to 87 | Quality validation curves for layers 1, 8, 11 and 14 |
| 8 | Internal lines, not cut | | |

The specification of AAMA-292 is not public, so Rajutara reads and writes it by the rules it shares with ASTM. Each import lists what it could not keep: nothing is dropped silently. On export, notch shapes that AAMA has no layer for are written as V or I with a warning. Export Graded Nest has the option L-notches as L shapes, off by default: an L notch then also writes its L-shaped outline as a polyline beside its point.

A DXF carries the sample size and the grade points. The grade rules go in the RUL file, or the whole graded style goes out as a graded nest with one block per size. Both options are in the export dialog. A drill hole or a text that exists only in some sizes is written per size in a graded nest; a Base Size DXF with a rule file cannot hold this, so it writes every hole and the main text and says so in the export notes.

## Plot DXF

The PDS Plot dialog has a DXF target, and the Marker has File, Export to CAD/CAM Files…. Both write DXF release 12 in millimetres from the same content as the plot: cutting lines, internal lines, notches, drill holes, grainlines and the labels as text, plus the table frame for a Marker. There is one layer per kind of element. A Marker export gives each Bundle its own colour; the PDS plot takes its colours from the Plotter Setup pens. With Translate piece names on, the labels print the Piece Name Dictionary's translation of each name ([ADR-0017](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0017-marker-dxf-output.md)).

## ASTM RUL

The grade rule table is an ASCII text file. Each rule is a line of `x,y` pairs, one pair per size in the order of the size list, with the sample size at `0.00,0.00`.

```text
ASTM/D13 PROPOSAL 1 VERSION: D6673-10
AUTHOR: Rajutara
PRODUCT: Rajutara
VERSION: 1.0.0
CREATION DATE: 01-11-2026
CREATION TIME: 04:56
UNITS: METRIC
GRADE RULE TABLE: kaos-lengan-pendek
NUMBER OF SIZES: 4
SIZE LIST: S M L XL
SAMPLE SIZE: M
RULE: DELTA 1
-10.00,15.00 0.00,0.00 10.00,-15.00 20.00,-30.00
RULE: DELTA 2
10.00,15.00 0.00,0.00 -10.00,-15.00 -20.00,-30.00
END
```

Reading is tolerant about separators and line endings and strict about numbers: a rule with the wrong number of pairs is reported and skipped, and the rest of the file still loads.

## HPGL/2

One plotter unit is 0.025 mm, so there are 40 to the millimetre. A marker plots with X along its length and Y across its width. The cut file uses pens as tools: 1 for labels and drawn lines, 2 for the knife, 3 for the drill. The pen numbers can be changed in the plotter setup. The knife runs clockwise round each piece, from its lowest-left vertex, unless the marker's Cutting Order sets another start or direction; the pieces are cut in that order. A Fuse Block is cut as its border alone.

## PDF

Pieces and markers plot as vector PDF. A sheet is A0, or A4 tiles for a desktop printer, and a plot longer than a sheet is tiled along its length. The first page of a tiled plot is a map of the tiles. The text uses the standard Helvetica of PDF, so files stay small, and Indonesian text is plain Latin and fits.

## CSV

Reports and lists are UTF-8, with `.` as the decimal point and `,` between fields. Order quantities import from a CSV with a header row, the colour first and one column per size name. A marker flaw list has one `x_from,y_from,x_to,y_to` line per flaw, in millimetres. A Cut Plan report writes one file per section; with several Purchase Orders the files are named `<stem>-<po>-<part>.csv`. The Marker's Auto Nesting can also write an efficiency log, `<stem>-nesting.csv`, with `time_s,length_mm,efficiency_pct,placed`.

## Excel and OpenDocument workbooks

Report to Excel writes an `.xlsx` workbook. The PDS report has one worksheet with the piece, code, size, quantity, material, area and the cut and sew perimeters. The Marker report has one worksheet per section, General, Order, Pieces and Notches, with numbers as number cells; File, Customize Excel Report… chooses and orders its columns. Rajutara writes the workbook itself.

Cut Plan quantities and Fabric Rolls, the Fabric Room, Measurement Chart specs and the Piece Name Dictionary read `.xlsx` and `.ods` as well as `.csv`. Only the first sheet is read, with the `calamine` library. Reading has fixed bounds: a file over 20 MB, a workbook that unpacks to more than 256 MB, an `.xlsx` that declares more than 1 000 000 shared strings, or a cell beyond row 100 000 or column 1 000 is refused, and at most 1 000 000 cells are read. Old `.xls` workbooks are not read at all; save them as `.xlsx` or `.csv`.
