---
title: Roadmap
description: What 2.0.0 ships, its known limits, what wave D holds, and what Rajutara will not do.
---

This page is the project plan in plain words: what 2.0.0 ships, its known limits, what the next wave holds, and what is not planned. The sources are `ROADMAP.md`, [`docs/spec/00-overview.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/00-overview.md) §8 and [`docs/spec/08-v2-roadmap.md`](https://github.com/madmouse17/rajutara/blob/main/docs/spec/08-v2-roadmap.md) §3 in the repository. The [parity checklist](../parity-checklist/) has the tool-by-tool view, and the [changelog](../changelog/) what changed in each release.

## Phases

| Phase | Delivers | Status in 2.0.0 |
|---|---|---|
| 0 Foundation | Workspace, CI, core model with undo, native format, docking shell, English and Indonesian, `--version` and `--smoke` | Shipped in 1.0.0 |
| 1a Import path | ASTM D6673 and AAMA-292 DXF and RUL import, Pieces panes, properties, seam allowance, plot to PDF (tiled A4, A0) and HPGL/2 | Shipped in 1.0.0 |
| 1b Grade to marker | The Grading workspace, graded-nest and RUL export, the Marker workspace with manual placement, auto-nesting, the report and the marker plot | Shipped in 1.0.0 |
| 1c Draw from scratch | Drafting, points, curves, darts, pleats, walk, trace, mirror, split and join, measure, text, internal lines | Shipped. 89 PDS tools in 1.0.0, 101 since 1.5.0: Segment Editor, Track Lines, Wave, Deform Internals, Equal Segments, Fold Line to Line, Swap Piece Properties, Zones, Spread and Gather Pieces, Fabric And Stripes, Save and Restore Placement, Reopen Darts |
| 2 Cut planning | The Cut Plan workspace, orders, lay planning, consumption and cost, reports, ply modes, the Cut Order | Shipped in 1.0.0 and 1.5.0. 2.0.0 adds Purchase Orders, several Styles and Materials per plan, Spreading Groups, Cutting Tables, roll grouping, the Fabric Room and Customize Report |
| 3 Production extras | Stripe and plaid matching, tilt, piece buffers by side, block fuse, flaws, cross grading, multi-material spreading | Shipped. Block fuse, flaws, Substitute Size and Single Piece Gap in 1.5.0; stripe and plaid matching, tilt, buffers by side, folded placement, size variations, Cross Grading, Measurement Charts and multi-material spreading in 2.0.0 |
| v2.0 | V1 to V9: nesting engine v2, Marker constraints, stripes, headless batch, Purchase Orders, Measurement Charts, per-size drill holes and texts, PDS refinements, DXF output options | Shipped in 2.0.0 (wave C) |
| v2.x | X1 to X14 | X1, X2, X5, X8 and X11 in 1.5.0; X3, X4, X6, X7, X9, X10, X13 and X14 in 2.0.0. X12 is partial: Fold Line to Line and Swap Piece Properties are built, multi-target 2D tools are not |
| Agent command layer | `rajutara batch`, `rajutara mcp`, playbooks, the knowledge index, assistant memory and prompt files | Shipped in 2.0.0, with no model call. The in-app assistant is wave D |
| 4 and later, 3D | 3D garment simulation, only after the decision to leave it out is replaced | Interface contract only |

## Known limits in 2.0.0

Platform and files:

- Windows builds are verified under Wine and by the import-table check only. The run on real Windows 7 hardware is pending. See [Windows 7](../windows-7/).
- Files saved by 2.0.0 are native format 3. Rajutara 1.5.x and older refuse them, so every PC that shares files must update at the same time. 2.0.0 opens older files.
- 3D is interface-only. Vendor cutter drivers are not included; the Marker writes one generic HPGL/2 cut file and a generic DXF.
- The Indonesian strings are unconfirmed: every English string has an Indonesian one, and CI checks that, but no Indonesian-speaking Operator has reviewed the wording.

PDS and Grading:

- The Segment Editor has no pane and no Use Darts. Track Lines last for the session and cannot be snapped to. Equal Segments has no group window and no Options. Swap Zone Segment and Move Piece On Piece are not built, because no public description says what they do.
- Dynamic Input works in Draft only, and Polar Tracking has fixed 45° steps. A Point Name is kept in the file but not drawn or written to DXF. Walk's Support Notch has no Reconnect and no Grading Walking.
- Pleat Lines follow Rajutara's own rules, since no public source gives their geometry. Custom special notch forms are not built. A Style Set cannot be renamed once made.
- The Production Sheet's chart tables show measured values only, and its Date is the day of printing.
- A size variation reaches Markers and Cut Plans only after Reshape Variation Grading. The Rule Table belongs to the main sizes.
- Preferences search matches the interface language and English, not the other interface language.

Marker:

- Advanced is the default Algorithm since the benchmark decision run of ADR-0019 passed, so a Marker nested again can come out different from 1.5.x. Choose Standard in Auto Nesting Setup, or `@NEST /AL=QUA`, for the 1.x engine.
- Auto Nesting never folds a piece by itself; Place Folded is manual. A folded pair is one shared shape, so it cannot be moved, shot or turned until it is unfolded.
- Only a lone piece snaps to the stripes; a selection or a cluster moves as dragged. Diagonal stripe measurements, variable stripe colours, Revise Pieces Placements and floral prints are not built.
- One piece buffer serves every size, and the buffered outline cannot be edited point by point.
- Additional Mixing, Optimize Last Bundles, Idle Time and the Nest++ engine names are not built. The Bundles Overlap fractions (5, 15 and 30 %) and the lane of each Bundle are Rajutara's own choices.
- Auto Save Of Markers names its files `<file>-1.rjm`, `<file>-2.rjm`, not Optitex's `MARKER-n`.
- Customize Excel Report changes the Excel and PDF reports, not the Report pane on screen.
- Still open from 1.5.0: a Cluster or Fuse Block only translates; the cut file cuts a Fuse Block as its border alone and has no tool or layer per sequence; Insert to Hole moves one piece per drag; Substitute Size takes the next size only; flaws are not plotted; bump and cut lines have no Lock or OpStop; the Marker Creation Wizard has no Overlay properties; the Text Tool has no Quality Text.

Cut Plan:

- All Purchase Orders share one Cut Order and one set of rolls, PO after PO. A marker never mixes Styles.
- A Fabric Room row is changed by removing it and adding it again. The first step of the Create New wizard offers no Material or Style Set choice.
- The Cut Order is worked out again on every frame, so a plan with a very large number of Fabric Rolls slows the pane.

Agent command layer:

- 2.0.0 makes no model call. Prompt assembly, redaction and the answer templates are built and tested, but nothing sends a prompt.
- MCP has no confirmation inside the client: outside an approved playbook checkpoint, a save, overwrite, delete or discard answers `confirmation_required` unless the server runs with `--yes`.
- `rajutara batch` prints its output at the end of the run; the `--log` file is written line by line.
- The 13 values of the workshop profile `profil-bengkel.toml` have no source yet and are reported as "perlu konfirmasi operator" until the shop fills them in.
- The knowledge index reads PDFs with a text layer only, loads the whole index on every call, and can lose one of two adds made at the same time.
- A playbook replay gives the same nesting result only with an iteration stop and one thread.

## Wave D

Each item needs its own design; wave C leaves only the hooks.

- An assistant pane in the window: threads, step and result cards with before and after thumbnails, approval cards, and a composer with attachments.
- A model that chooses a playbook, fills its parameters and handles issues.
- Quick-action buttons, a playbook runner and scenario comparison in the window.
- A role switch and role-aware menus in the window.
- Knowledge skills for pattern making, grading, markers, the cutting room, materials, QC and file exchange, built on the prompt files, memory and the knowledge index.
- A model runtime: a default model setting (off until set), Ollama detection, and constrained output through Ollama `format` and llama.cpp grammars.
- Token budget and cost display.
- A local GUI socket, with a token and off by default.
- A preview of every prompt before it goes to a cloud model.
- Memory review and learning triggers, feedback on answers, and assistant documentation pages.
- Voice input.
- Tracing a draft piece from a calibrated photo (experimental).
- An evaluation runner over an opt-in local folder of the owner's files.
- Confirmations inside the MCP client.

## Not planned

- Vendor cutter drivers, digitizer drivers and a cloud service.
- Reading or writing Optitex native formats. The project is clean-room, so no Optitex file is ever opened.
- Parametric garment templates and made-to-measure resizing.
- The batch commands `@CHNT` and `@CHBTN`, the Nest++ names, Idle Time and automatic folding (`/AF`): there is no public behaviour to follow.

Want to take an item? Open an issue first, as [Contributing](../contributing/) asks.
