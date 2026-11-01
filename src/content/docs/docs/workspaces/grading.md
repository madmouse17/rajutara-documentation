---
title: Grading
description: "Rule-based grading: a size table with one base size, a grade rule on each grade point, the graded nest, and ASTM RUL exchange."
---

Rajutara grades by rule, the way the point-rule systems of other CAD suites do. A style has a Size Table with exactly one Base Size, and a Grade Rule, a dX and a dY per size, on each Grade Point. A size other than the base is never redrawn: it is derived from the base size by the rules. The base size is the one you draw.

![The Grading workspace with the sample tee: the Grading Table with dX and dY per size on the left, the graded nest of front, back, neck rib and sleeve in the Work Area.](../../../../assets/screens/full-grading.jpg)

## The screen

Grading is the same style and the same undo history as PDS, with other panes and toolbars. Switching tabs keeps the selection and the zoom.

| Pane | What it holds | Key |
|---|---|---|
| Work Area | The pieces, with the graded nest visible. | |
| Grading Table | The rule of the selected grade point: visible, colour, size, dX, dY and dd (the length of the move). | `2` |
| Rule Table | The numbered rules kept with the style. | `Ctrl+Shift+Alt+R` |
| Properties, Pieces Table, History | As in PDS. | `Ctrl+I`, `6` |

`F4` shows the base size only, and `Ctrl+Shift+F4` shows the small, big and base sizes.

## The size table

`Shift+F4` opens the Sizes Table. It is a dialog because a size edit touches every rule at once.

- Insert or append sizes. The new deltas continue the step of the nearest two sizes.
- Delete the current size, or all sizes but the base.
- Rename sizes and change their order. Names are free text with no whitespace and no meaning to the geometry.
- Set Base Size. Every point moves to its position in the chosen size and every rule is re-expressed from it.
- Mark break sizes, then Regrade By Break Size: the sizes between two breaks take the linear interpolation of the breaks.
- Give each size a colour and a line type. These change only how it is drawn.

Rajutara is built for one size dimension of up to 12 sizes. The program accepts up to 99, a cap that protects memory on 32-bit builds.

## The grading table

Select a grade point and its rule appears. Type dX and dY per size. The Absolute switch chooses between values counted from the base size, which is how they are stored, and steps from one size to the next. The Grade by angle selector shows the same numbers along the previous point, the next point or the tangent. Arrow keys move between cells, `Enter` commits one command and `Esc` reverts the cell.

A contour point without a rule of its own moves in proportion between its neighbouring grade points. `Alt+1` toggles a grade point, and removing one deletes its rule after a confirmation.

## The 29 grading tools

| Group | Tools |
|---|---|
| Copy and paste | Copy Grading (`Shift+C`), Paste Grading (`Shift+V`), Paste X (`Shift+X`), Paste Y (`Shift+Y`), Paste Relatively, Paste Grading Around |
| Set and clear | Set Grading, Flip Grading, Grade Equally, Clear Grading |
| Grade | Grade Along Line, Grade Proportional, Match Segment |
| Move one size | Move Point Size, Move Size Along, Move Size Proportional, Move Size by Rectangle, Move Size Parallel, Align Points Size, Align Vertical and Horizontal Size, Align Size by Line |
| Stack | Stack Point, Stack by Grainline, Restore Stack, Remove Grainline Grading |
| Rules | Rules Library, Apply Rule, Select Grade Points |
| Pieces | Create Piece for Selected Size, Graded Nest |

Stack Along Line is listed and disabled until Phase 3. Holding `Shift` while you move a point in one size also moves the larger sizes, and `Ctrl` the smaller ones.

## The graded nest

The Graded Nest view draws every size in its own colour, aligned at the Stack Point, and never changes geometry or rules. Graded Nest is also a tool: it builds one graded piece from separate per-size pieces, for a style that was imported with its sizes as separate pieces.

## Exchange

A graded style leaves as an ASTM D6673 DXF of the sample size plus an ASTM RUL file holding the rules, or as a graded nest with one block per size. Both are read back. The RUL syntax is shown in [File formats](../../formats/). Rule tables in Optitex's own format are not read or written.

Multi-dimensional size systems, cross grading by merging style files and measurement charts are Phase 3. See the [roadmap](../../roadmap/).
