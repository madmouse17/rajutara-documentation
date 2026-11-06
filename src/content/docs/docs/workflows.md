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
2. Draw with the Draft tool (`D`): click points, hold `Shift` for a curve point, finish with `Z` or a double right-click. With Dynamic Input on, type a Length, `Tab` to the Angle and press `Enter` to place a point at exact values. A closed outline drawn outside a piece becomes a new piece. `A` bends a segment into an arc, `O` adds a point on the contour, `M` moves a point.
3. Add the seam allowance (`S`), notches (`N`), the grainline (`/`), darts (`Ctrl+Alt+D`) and pleats (`L`). For a symmetric piece, draw one half and use `H` to set the mirror line, then `Shift+H` to see it open.
4. Press `F8` to show segment lengths, and compare them with your measurements. The Compare Length pane (`5`) checks two runs against each other.
5. Press `Ctrl+Shift+2` for Grading. In the Sizes Table (`Shift+F4`) append the sizes you need. Select a grade point and type dX and dY per size in the Grading Table, or copy a rule from one point (`Shift+C`) and paste it on others (`Shift+V`). The table shows steps from size to size until you tick Absolute.
6. Keep the rules you reuse in the Rule Table (`Ctrl+Shift+Alt+R`) and apply a numbered rule to any selected points.
7. Save with `Ctrl+S`. To hand the graded style to another CAD, export a DXF with the RUL file, or as a graded nest.

Guides: [PDS](../workspaces/pds/), [Grading](../workspaces/grading/).

## 3. Nest a marker and read the numbers

1. In Marker, choose File, New Marker (`Ctrl+N`). In the one dialog, set the Marker Definitions (fabric width, buffer, margins), take the Style open in PDS or browse for a file, check the Material and type the Bundles per size, with a direction for each: One Way, Opposite or Any. Create stays blocked until something is ordered.
2. Place pieces. Drag them from the Piece Bar, double-click a thumbnail, click a thumbnail and then the table, or press Place All. To let the engine do it, choose Nesting, Start AutoNesting (`Shift+N`). Its dialog shows the time, the best length and the efficiency as it runs, and Stop (`Esc`) keeps the best result so far. Nesting, Auto Nesting Setup… sets the Algorithm (Standard by default), the time limit (60 s by default), an optional efficiency limit, whether the length is unlimited, whether to keep the pieces already placed, a seed that makes a run repeatable, and how Bundles are grouped.
3. Read the status bar: pieces, bundles, overlaps, efficiency, width, used length and length per garment. Overlaps are hatched red on the table. Fine-tune with Rotate (`Shift+R`), Flip X and Flip Y (`Shift+X`, `Shift+Y`), Shoot (`Shift+Arrow`) and the arrow keys. Piece, Fix on Marker pins a piece, and Grouping, Cluster Pieces keeps several pieces together.
4. To set the knife's path, choose Marker, Optimize Cut Order…, and switch on View, Cut/Plot Order to see the numbers.
5. Write the report with File, Report to Excel… (`Ctrl+R`, an `.xlsx` workbook) or File, Print… (`Ctrl+P`, a PDF).
6. Plot with File, Plot/Cut… (`Ctrl+L`): PDF as A4 tiles or on A0 sheets, an HPGL/2 file for a roll plotter, or the generic HPGL/2 cut file.

`Ctrl+C` clears the marker, and `Ctrl+Z` brings every piece back. To nest several saved markers in one go, use Nesting, Auto Nest Queue….

Guide: [Marker](../workspaces/marker/).

## 4. Plan the cut from an order

1. In Cut Plan, choose Cut Plan, Create New…. The wizard walks the steps in order: Adding Style Files (the style open in PDS, or a file), Defining the Order Details (name, client, operator), Adding Colors and Defining Quantity for each Size, Defining Material Properties and Defining the Marker. Every step stays in the Plan pane afterwards. Add more Purchase Orders, Styles or Materials there if the order needs them.
2. Colours and quantities: one row per colour, one column per size. Switch on the ratio mode to give a ratio and a total per colour, set a deviation for the over-cut you accept, or import the quantities from a `.csv`, `.xlsx` or `.ods` file.
3. Material: name, width, ply mode, shrinkage, price per metre. Marker limits: minimum and maximum plies, bundles per marker, marker length, the allowance at each end of a ply and the waste limit. A Bundle longer than the maximum marker length is warned about while you type.
4. Press Viewing the Final Results (`F5`). The Results tab lists the markers with their ratio, length and efficiency, the lays with their plies and fabric, a table of ordered, planned and difference per size and colour, and the totals with cost. A piece wider than the Material stops the solve with its name.
5. Edit the plies of a lay or the ratio of a marker by hand if the floor needs it. The plan is then marked as edited.
6. Open the Cut Order tab. Enter your fabric rolls with code, colour, shade, width and length, or take them from the Fabric Room. Rajutara sequences the lays, takes whole plies from rolls, and reports the remnants and any missing fabric. Return Remnants writes what is left back to the Fabric Room.
7. Write the reports with Generating a Cut Plan Report (CSV) or (PDF), and Viewing the Production Report for the cutting floor.

Guide: [Cut Plan](../workspaces/cut-plan/).

## 5. Run it without a window

1. Check a build: `rajutara --smoke` opens the real window, renders 60 frames, prints one JSON line and exits 0, or non-zero on any window or OpenGL failure.
2. Run the same job on many orders with `rajutara batch SCRIPT`: one `@COMMAND /KEY=VALUE` per line opens a marker, nests it, writes the plot and the report, solves a Cut Plan or exports a graded nest.
3. Repeat a whole procedure, such as importing and checking a pattern or optimising a marker, with `rajutara playbook`. Each run keeps a record, so `replay` repeats it.
4. Give an MCP client the same tools with `rajutara mcp`.
5. Read or write documents with any zip library: a native file is a zip archive holding JSON.

Guide: [Headless and scripting](../headless/).
