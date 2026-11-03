---
title: Roadmap
description: What 1.5.0 ships, what the specifications schedule and have not delivered, what Rajutara will not do, and the plan for v2.
---

This page is the project plan in plain words. It has what 1.5.0 ships, what the specifications schedule and have not delivered, what is not planned, and the plan for v2, which was drawn up by measuring 1.0 against the features Optitex has added since release 15. The sources are `ROADMAP.md` and `docs/spec/08-v2-roadmap.md` in the repository, and the [parity checklist](../parity-checklist/) has the tool-by-tool view. What changed in each release is in the [changelog](../changelog/).

## Phases

| Phase | Delivers | In 1.5.0 |
|---|---|---|
| 0 Foundation | Workspace, CI, core model with undo, native format, docking shell, English and Indonesian, `--version` and `--smoke` | Shipped |
| 1a Import path | ASTM D6673 and AAMA-292 DXF and RUL import, Pieces panes, properties, seam allowance, plot to PDF (tiled A4, A0) and HPGL/2 | Shipped |
| 1b Grade to marker | The Grading workspace, graded-nest and RUL export, the Marker workspace with manual placement, auto-nesting, the report and the marker plot | Shipped |
| 1c Draw from scratch | Drafting, points, curves, darts, pleats, walk, trace, mirror, split and join, measure, text, internal lines | Shipped. The 89 PDS tools of 1.0 include the ones the specification tagged Phase 3: spiral, fullness, gusset, pleat lines, fold, remove excess cloth and extend in parallel. 1.5.0 brings the count to 101: Segment Editor, Track Lines, Wave, Deform Internals, Equal Segments, Fold Line to Line, Swap Piece Properties, Zones, Spread and Gather Pieces, Fabric And Stripes, Save and Restore Placement, Reopen Darts |
| 2 Cut planning | The Cut Plan workspace, orders, lay planning, consumption and cost, reports, ply modes, the Cut Order | Shipped in the Cut Plan workspace, with Cut Order and fabric rolls. 1.5.0 adds to the Marker workspace the Cutting Order and Optimize Cut Order, the Tubular, Faced and Folded ply modes, the text tool and bump and cut lines |
| 3 Production extras | Stripe and plaid matching, tilt, piece buffers by side, block fuse, flaws, cross grading, multi-material spreading | Started early. Shipped in 1.5.0: block fuse with Cluster Pieces, Insert to Hole, the Auto Nest Queue, flaws, Substitute Size, Single Piece Gap, Stack Along Line and the Custom seam corner. Open: stripe and plaid matching (PDS already stores the stripe data), tilt, buffers by side, cross grading, multi-material spreading |
| 4 and later, 3D | 3D garment simulation, only after the decision to leave it out is replaced | Interface contract only |

## Known limits in 1.5.0

- Windows 7 builds are verified under Wine and by the import-table check only. The run on real Windows 7 hardware is pending. See [Windows 7](../windows-7/).
- 3D is interface-only. There is no 3D window.
- Vendor cutter drivers are not included. The marker writes one generic HPGL/2 cut file.
- The Indonesian strings are unconfirmed: every English string has an Indonesian one, and CI checks that, but no Indonesian-speaking Operator has reviewed the wording.
- Marker: a Cluster or Fuse Block only translates, so turning or flipping one is refused, and waiting pieces cannot be clustered. The cut file cuts a Fuse Block as its border alone, with no second file for the block contents, no tool or layer per sequence and no overlap. Insert to Hole moves one piece per drag. The Auto Nest Queue has one engine, no queue files and no headless run.
- PDS: Dynamic Input works in Draft only, and Polar Tracking has fixed 45° steps. A Point Name is kept in the file but not drawn or written to DXF. Walk's Support Notch has no Reconnect and no Grading Walking.
- PDS: the Segment Editor has no pane and no Use Darts. Track lines last for the session and cannot be snapped to. Equal Segments has no group window and no Options. Fabric And Stripes stores and draws the stripe data, but nothing is matched yet. Swap Zone Segment and Move Piece On Piece are not built, because no public description says what they do. A spread piece turned by Arrange For Plot lays its copies in its turned frame.
- Marker: half pieces are nested unfolded in Tubular and Folded. Substitute Size takes the next size only. Flaws are not plotted. Bump and cut lines have no Lock or OpStop. The Marker Creation Wizard has no Overlay properties. Marker plot labels do not follow the PDS one-line label layout.
- Files stay at format version 2. A 1.4.0 build opens a file with any of the 1.5.0 content (clusters, Fuse Blocks, a cutting order, point names, Equal Segments Groups, zones, bump or cut lines, flaws, marker texts) but drops it, and it does not open a Style that uses Stack Along Line.

## Scheduled by the specifications, not delivered

- **Marker.** Tilt, stripe and plaid matching and piece buffers by side (Phase 3), and placing half pieces on the fold edge in Tubular and Folded (v2). A choice of nesting engine waits for a second engine, and bundle grouping for the shading groups of v2. Auto Save of Markers, which splits one order over several markers, waits for the batch work of v2.
- **Grading.** Multi-dimensional size systems, cross grading by merging style files and measurement charts are Phase 3.
- **PDS.** The Segment Editor pane and Use Darts, Snap To Track Lines, and the Equal Segments Options and group window are deferred. The Seam and Stitch Manager belongs to 3D.
- **Cut Plan.** Spreading groups that mix materials, a fabric-room inventory shared between plans, roll groups by width and shrinkage with their own markers, several cutting tables per material and several styles in one plan.

## Not planned

- Vendor cutter drivers, digitizer drivers, a cloud service and the batch scripting of Optitex.
- Reading or writing Optitex native formats. The project is clean-room, so no Optitex file is ever opened.
- Running a Cut Plan from the command line.

## v2

The plan for the release after 1.0 was drawn up on 2026-11-01. It ranks work by what an Operator gains in daily PDS, grading, marker and cut-plan work, and by whether it fits the constraints: egui with the `glow` renderer, Linux first, the Windows 7 floor and the memory budgets. Nothing in it needs more than OpenGL 2.1, and nothing in it drops Windows 7. Several later Optitex features build on features of Optitex 15 that 1.0 deferred, such as buffers per side, shading groups, flaws and stripe and plaid matching, so v2 takes each prerequisite together with the feature that needs it.

### v2.0, the must items

| Item | What it is | Value | Size |
|---|---|---|---|
| Nesting engine v2 | The published overlap-minimisation search on top of the existing engine, a live efficiency log as CSV, and interim marker saves. It becomes the default only if it beats 1.0 on the benchmark within the time limit and the 32-bit memory cap. | High | Large |
| Marker constraints | Buffers per edge, bundle grouping, shading groups and table areas. | High | Large |
| Stripe and plaid matching | Match points, fabric repeat and tilt on the marker. It starts after the marker constraints. | High | Extra large |
| Headless batch | `rajutara batch SCRIPT` runs a script of commands, one per line, with no window: import, export, nesting queue, report, plot. A closed command list, with no variables or loops. | High | Medium |
| Cut Plan per purchase order | Several purchase orders per plan, each with its own quantities, markers and plies, shown side by side. | High | Medium |
| Measurement chart | Points of measure per size taken from the pattern, a buyer's spec imported from CSV and an out-of-spec report. It checks; it does not resize. | High | Medium |
| Per-size drill holes and text | Fewer buttons on the small sizes of a shirt. This brings native format version 3. | Medium | Medium |
| PDS refinements | Notch presets with a top width, filters by dimension, automatically renumbered copies, segment length from both ends, and a warning before switching between sew and cut. | Medium | Medium |
| Output options | True L-notch geometry in DXF as an option, and a generic DXF export of the marker with the piece names and one colour per bundle. | Medium | Small |

Marker constraints, the nesting engine and the batch commands share work and run first; the Cut Plan, measurement chart and per-size items are independent. The three items that change the native model share one bump to format version 3, with a migration from format 2, and newer files are refused rather than truncated.

### v2.x, the should items

Several materials and styles per Cut Plan, with a shared fabric-room inventory. A production sheet PDF with the annotated layout and tech-pack basics. A column chooser for reports. Preferences search. A piece-name dictionary for plot labels, for example English to Indonesian. Style sets and search. Multi-target 2D tools. Parent references kept on new grade points. XLSX import for the measurement chart and orders.

Shipped early, in 1.5.0: flaws with a flaw-list import and Remove Pieces Hitting Flaws, bump and cut lines, the Marker Creation Wizard, track lines, the piece label layout in PDS, Fold Line to Line and Swap Piece Properties, and Report to Excel as an `.xlsx` workbook. The batch commands for flaws and bump lines wait for headless batch.

### Out of scope for v2

Cloth simulation, rendering, animation and avatars. A 3D preview: it would reproduce none of what Operators use 3D for and could not judge fit, and it needs a frame rate on OpenGL 2.1 that has not been measured. Cloud sync and hosted features. PLM connectors. Converters for Lectra, Gerber or Optitex native files. Adobe Illustrator plug-ins. Print and cut end to end. Vendor cutter and projector dictionaries. The operating system's own file dialogs.

### Decisions the owner has to make

Headless batch reverses two earlier statements, that batch scripting is not mirrored and that Cut Plan has no command line, so it needs a recorded decision with a closed command list. A generic DXF export of the marker goes beyond the PDF and HPGL/2 that markers write today. The native format version 3 is one bump for all v2 model changes. The nesting engine is the project's own code of the published method, unless it fails the benchmark gate.

Want to take an item? Open an issue first, as [Contributing](../contributing/) asks.
