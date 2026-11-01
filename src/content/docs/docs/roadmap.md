---
title: Roadmap
description: What 1.0.0 ships, what the specifications schedule and have not delivered, what Rajutara will not do, and the plan for v2.
---

This page is the project plan in plain words. It has what 1.0.0 ships, what the specifications schedule and have not delivered, what is not planned, and the plan for v2, which was drawn up by measuring 1.0 against the features Optitex has added since release 15. The sources are `ROADMAP.md` and `docs/spec/08-v2-roadmap.md` in the repository, and the [parity checklist](../parity-checklist/) has the tool-by-tool view.

## Phases

| Phase | Delivers | In 1.0.0 |
|---|---|---|
| 0 Foundation | Workspace, CI, core model with undo, native format, docking shell, English and Indonesian, `--version` and `--smoke` | Shipped |
| 1a Import path | ASTM D6673 and AAMA-292 DXF and RUL import, Pieces panes, properties, seam allowance, plot to PDF (tiled A4, A0) and HPGL/2 | Shipped |
| 1b Grade to marker | The Grading workspace, graded-nest and RUL export, the Marker workspace with manual placement, auto-nesting, the report and the marker plot | Shipped |
| 1c Draw from scratch | Drafting, points, curves, darts, pleats, walk, trace, mirror, split and join, measure, text, internal lines | Shipped. The 89 PDS tools include the ones the specification tagged Phase 3: spiral, fullness, gusset, pleat lines, fold, remove excess cloth and extend in parallel |
| 2 Cut planning | The Cut Plan workspace, orders, lay planning, consumption and cost, reports, ply modes, the Cut Order | Shipped in the Cut Plan workspace, with Cut Order and fabric rolls. Not shipped in the Marker workspace: ply modes other than single, the text tool, cutting order, optimize cut order, bump and cut lines |
| 3 Production extras | Stripe and plaid matching, tilt, piece buffers by side, block fuse, flaws, cross grading, multi-material spreading | Not started |
| 4 and later, 3D | 3D garment simulation, only after the decision to leave it out is replaced | Interface contract only |

## Known limits in 1.0.0

- Windows 7 builds are verified under Wine and by the import-table check only. The run on real Windows 7 hardware is pending. See [Windows 7](../windows-7/).
- 3D is interface-only. There is no 3D window.
- Vendor cutter drivers are not included. The marker writes one generic HPGL/2 cut file.
- The Indonesian strings are unconfirmed: every English string has an Indonesian one, and CI checks that, but no Indonesian-speaking Operator has reviewed the wording.

## Scheduled by the specifications, not delivered

- **Marker.** Cluster pieces, delete cluster, fix on marker, optimum and rectangular block fuse, substitute size and the nesting queue, plus the Phase 2 and 3 items in the table above.
- **Grading.** Stack Along Line is listed and disabled until Phase 3. Multi-dimensional size systems, cross grading by merging style files and measurement charts are Phase 3.
- **PDS.** The Custom seam corner is a disabled button until Phase 3. Wave, Deform Internals, Zones, Equal Segments, Track Lines and the Segment Editor are not mirrored.
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

Flaws, with a flaw-list import and a command that removes pieces that hit a flaw. Bump and cut lines. Several materials and styles per Cut Plan, with a shared fabric-room inventory. A production sheet PDF with the annotated layout and tech-pack basics. A marker creation wizard. A column chooser for reports. Preferences search. Track lines. A piece-name dictionary for plot labels, for example English to Indonesian. Style sets and search. Piece label layout. Fold line to line, swap piece properties and multi-target 2D tools. Parent references kept on new grade points. XLSX import for the measurement chart and orders.

### Out of scope for v2

Cloth simulation, rendering, animation and avatars. A 3D preview: it would reproduce none of what Operators use 3D for and could not judge fit, and it needs a frame rate on OpenGL 2.1 that has not been measured. Cloud sync and hosted features. PLM connectors. Converters for Lectra, Gerber or Optitex native files. Adobe Illustrator plug-ins. Print and cut end to end. Vendor cutter and projector dictionaries. The operating system's own file dialogs.

### Decisions the owner has to make

Headless batch reverses two earlier statements, that batch scripting is not mirrored and that Cut Plan has no command line, so it needs a recorded decision with a closed command list. A generic DXF export of the marker goes beyond the PDF and HPGL/2 that markers write today. The native format version 3 is one bump for all v2 model changes. The nesting engine is the project's own code of the published method, unless it fails the benchmark gate.

Want to take an item? Open an issue first, as [Contributing](../contributing/) asks.
