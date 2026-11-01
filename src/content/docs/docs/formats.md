---
title: File formats
description: ASTM D6673 and AAMA-292 DXF, ASTM RUL, HPGL/2, PDF, CSV and the native style, marker and cut plan files.
---

Rajutara exchanges patterns through open standards and keeps its own work in plain zip and JSON. It never reads or writes the file formats of Optitex.

| Format | Direction | Used for |
|---|---|---|
| ASTM D6673 and AAMA-292 DXF | Import and export | Patterns and graded nests |
| ASTM RUL | Import and export | Grade rules beside a graded-nest DXF |
| HPGL/2 | Export | Plotter files and the marker cut file |
| PDF | Export | A4 tiles, one A0 sheet or one A4 page; markers and reports |
| CSV | Import and export | Order quantities and fabric rolls in; marker and Cut Plan reports out |
| `.rjx`, `.rjm`, `.rjc` | Open and save | Style, Marker and Cut Plan: zip and JSON, format 2 |

The earlier extensions `.optx`, `.optm` and `.optc` open as well. The [gallery](/rajutara-documentation/gallery/) offers the sample tee in most of the formats above.

## Native files

A style, a marker and a cut plan are each one zip archive with two entries: `manifest.json`, which names the format and its version, and `document.json`, which holds the content. Lengths are millimetres. A marker embeds the styles it uses, so it opens without the style files. The same input and the same settings write byte-identical files. A file written by a newer format version is refused, never truncated. [Headless and scripting](../headless/) shows how to read one with a few lines of Python.

## ASTM D6673 and AAMA-292 DXF

Rajutara reads and writes the DXF of ASTM D6673-10, AutoCAD R13, with one block per piece and one style per file. The layers are numbered, not named.

| Layer | Holds | Layer | Holds |
|---|---|---|---|
| 1 | Piece boundary, and the system text of the style and of each piece | 9, 10 | Stripe and plaid reference lines |
| 2 | Turn points | 11 | Internal cutouts |
| 3 | Curve points | 13 | Drill holes, with the diameter |
| 4 | V and slit notches | 14 | Sew lines |
| 5 | Grade reference line | 15 | Annotation text |
| 6 | Mirror line | 80 to 83 | T, castle (Box), check (L) and U notches |
| 7 | Grain line | 84 to 87 | Quality validation curves for layers 1, 8, 11 and 14 |
| 8 | Internal lines, not cut | | |

The specification of AAMA-292 is not public, so Rajutara reads and writes it by the rules it shares with ASTM. Each import lists what it could not keep: nothing is dropped silently. On export, notch shapes that AAMA has no layer for are written as V or I with a warning.

A DXF carries the sample size and the grade points. The grade rules go in the RUL file, or the whole graded style goes out as a graded nest with one block per size. Both options are in the export dialog.

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

One plotter unit is 0.025 mm, so there are 40 to the millimetre. A marker plots with X along its length and Y across its width. The cut file uses pens as tools: 1 for labels and drawn lines, 2 for the knife, 3 for the drill. The pen numbers can be changed in the plotter setup.

## PDF

Pieces and markers plot as vector PDF. A sheet is A0, or A4 tiles for a desktop printer, and a plot longer than a sheet is tiled along its length. The first page of a tiled plot is a map of the tiles. The text uses the standard Helvetica of PDF, so files stay small, and Indonesian text is plain Latin and fits.

## CSV

Reports are UTF-8, with `.` as the decimal point and `,` between fields. Order quantities import from a CSV with a header row, the colour first and one column per size name. A marker report has sections for the general figures, the order, every piece and the notches. A Cut Plan report writes one file per section.
