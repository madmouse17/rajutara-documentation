---
title: Workflows
description: "Five paths through Rajutara: import a DXF and plot it, draft and grade a block, nest a marker, plan a cut, and run it all from a script."
---

Each path below is a short list of steps in the order an Operator takes them. Menu names are the ones in the program, keys are the defaults, and each path ends with the guide that explains the details. All four workspaces work on the same open Style, so the pieces you import or draw in one are the pieces you grade, nest and plan in the next.

## 1. Import a DXF and plot every size

1. In PDS, choose File, Import From CAD/CAM Files and pick the DXF. Rajutara reads ASTM D6673 and AAMA-292 files. For a graded style it also reads the RUL file that the DXF names in its `Grade Rule Table:` line, from the same folder.
2. If the import had issues, the Import Report tab opens. Read it before you trust the pieces: each issue names a piece or an entity.
3. Check the pieces in the Pieces Window and the Pieces Table: name, quantity, material, rotation, area.
4. Press `Ctrl+Shift+2` for Grading. The Graded Nest view draws every size in its own colour, and `Shift+F4` opens the Sizes Table with the Base Size.
5. Back in PDS, press `Ctrl+L` to plot. Choose the pieces and sizes, then a target: PDF as A4 tiles for a desktop printer, PDF on A0, or an HPGL/2 file. Leave Arrange first on and Rajutara lays the pieces out on the sheet width.

Guides: [PDS](../workspaces/pds/), [File formats](../formats/).

## 2. Draft a block and grade it

1. Start a new Style. The first size is the Base Size, named `M` by default; Preferences, Sizes System changes the name.
2. Draw with the Draft tool (`D`): click points, hold `Shift` for a curve point, finish with `Z` or a double right-click. A closed outline drawn outside a piece becomes a new piece. `A` bends a segment into an arc, `O` adds a point on the contour, `M` moves a point.
3. Add the seam allowance (`S`), notches (`N`), the grainline (`/`), darts (`Ctrl+Alt+D`) and pleats (`L`). For a symmetric piece, draw one half and use `H` to set the mirror line, then `Shift+H` to see it open.
4. Press `F8` to show segment lengths, and compare them with your measurements. The Compare Length pane (`5`) checks two runs against each other.
5. Press `Ctrl+Shift+2` for Grading. In the Sizes Table (`Shift+F4`) append the sizes you need. Select a grade point and type dX and dY per size in the Grading Table, or copy a rule from one point (`Shift+C`) and paste it on others (`Shift+V`).
6. Keep the rules you reuse in the Rule Table (`Ctrl+Shift+Alt+R`) and apply a numbered rule to any selected points.
7. Save with `Ctrl+S`. To hand the graded style to another CAD, export a DXF with the RUL file, or as a graded nest.

Guides: [PDS](../workspaces/pds/), [Grading](../workspaces/grading/).

## 3. Nest a marker and read the numbers

1. In Marker, choose File, New Marker (`Ctrl+N`). Set the Material, the fabric width, the buffer between pieces and any margins.
2. Choose Marker, Add Style and pick the style, or take the one open in PDS. Open the Order pane and type the bundles you need per size, with a direction for each: One Way, Opposite or Any.
3. Place pieces. Drag them from the Piece Bar, double-click a thumbnail, or press Place All. To let the engine do it, choose Nesting, Start Auto Nesting (`F9`). The setup asks for a time limit (60 s by default), an optional efficiency limit, whether the length is unlimited, whether to keep the pieces already placed, and a seed that makes a run repeatable.
4. Read the status bar: pieces, bundles, overlaps, efficiency, width, used length and length per garment. Overlaps are hatched red on the table. Piece, Rotate and Flip, a right-click on a piece, and the arrow keys fine-tune a placement.
5. Write the report with File, Report to Excel (a CSV) or File, Report (a PDF).
6. Plot with `Ctrl+L`: PDF on A0 sheets, or an HPGL/2 file for a roll plotter. File, Export Cut File writes the generic HPGL/2 cut file.

`Ctrl+C` clears the marker, and `Ctrl+Z` brings every piece back.

Guide: [Marker](../workspaces/marker/).

## 4. Plan the cut from an order

1. In Cut Plan, work down the Plan pane. Style: the style file and the sizes to plan. Order: its name, the client and the operator.
2. Colours and quantities: one row per colour, one column per size. Switch on the ratio mode to give a ratio and a total per colour, set a deviation for the over-cut you accept, or import the quantities from a CSV file.
3. Material: name, width, ply mode, shrinkage, price per metre. Marker limits: minimum and maximum plies, bundles per marker, marker length, the allowance at each end of a ply and the waste limit.
4. Press Solve (`F5`). The Results tab lists the markers with their ratio, length and efficiency, the lays with their plies and fabric, a table of ordered, planned and difference per size and colour, and the totals with cost.
5. Edit the plies of a lay or the ratio of a marker by hand if the floor needs it. The plan is then marked as edited.
6. Open the Cut Order tab. Enter your fabric rolls with code, colour, shade, width and length. Rajutara sequences the lays, takes whole plies from rolls, and reports the remnants and any missing fabric.
7. Write the reports as CSV or PDF, and the Production Report for the cutting floor.

Guide: [Cut Plan](../workspaces/cut-plan/).

## 5. Run it without a window

1. Check a build: `rajutara --smoke` opens the real window, renders 60 frames, prints one JSON line and exits 0, or non-zero on any window or OpenGL failure.
2. Draft, grade, nest and write every output of the workflow with the headless examples: the same code the program runs, with no window.
3. Read or write documents with any zip library: a native file is a zip archive holding JSON.

Guide: [Headless and agents](../headless/).
