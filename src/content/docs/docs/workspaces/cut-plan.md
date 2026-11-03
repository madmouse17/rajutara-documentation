---
title: Cut Plan
description: From an order of colours by sizes to markers, lays, fabric and cost, then the Cut Order with fabric rolls, remnants and missing fabric.
---

Cut Plan starts from an Order, the garments wanted per colour and size, and plans the Lays that cut it from one Material. A Lay is a marker with a ply count. The plan reports the fabric every lay uses and what the whole order costs. The Cut Order then puts the lays in spreading order and draws their plies from your fabric rolls.

![The Cut Plan workspace for order PO-100: the Plan pane on the left, the Results pane on the right with three markers, nine lays, the ordered, planned and difference table, and the totals.](../../../../assets/screens/full-cutplan.jpg)

## Create New

CutPlan, Create New… opens a wizard with the Optitex steps: Adding Style Files, Defining the Order Details, Adding Colors and Defining Quantity for each Size, Defining Material Properties and Defining the Marker. Back, Next, Finish and Cancel move through it; `Enter` goes on and `Esc` cancels. The first step offers the Style open in PDS before a Style file. The plan opens on Finish. An empty Plan, Results or Cut Order pane has a Create New… button too.

## The Plan pane

Every step of the wizard stays in the Plan pane, as a list of collapsible sections, so you can come back to any step and solve again.

| Section | Fields |
|---|---|
| Style | The style file, embedded in the plan, and the sizes to plan. |
| Order | Order name, client and operator. |
| Colours and quantities | One row per colour, one column per size, with totals. Ratio mode, deviation, and import from CSV. |
| Material | Name, width, ply mode, shrinkage, price per metre and weight. One material per plan. |
| Marker limits | Maximum marker length, minimum and maximum plies, maximum bundles per marker, the allowance at the end of each ply, and the waste limit in percent. |
| Cost and efficiency | The efficiency to assume before a marker is nested, the material's share of the production cost, and whether to nest the markers. |

**Ratio mode** takes a ratio per size and a total per colour and spreads the quantities with largest-remainder rounding, so each row adds up to its total. **Deviation** is the over-cut you accept, as a percent of the ordered quantity, per cell: under-cutting is never planned. **Import quantities** reads a CSV file with a header row, the colour in the first column and one column per size name.

## Viewing the Final Results

Press Viewing the Final Results (`F5`) to solve the plan. The solver is a deterministic greedy: for each colour, from the most plies down to the fewest, it picks the ratio of sizes per marker that cuts the most garments that are actually needed, prefers a ratio the plan already uses, and then the one with the least over-cut. Markers with the same ratio in different colours are merged, so there are fewer markers to make. The same inputs always give the same plan, and a plan for ten colours and twelve sizes takes a fraction of a second.

Main Algorithm with Nesting nests each planned marker with the same engine as the Marker workspace, so its real length and efficiency replace the estimate. A marker longer than the limit is flagged "too long", not hidden.

Both check the plan before any nesting. They refuse an ordered piece that is wider than the Material, and name it. A plan file with such a piece still opens, with a warning, so you can widen the Material. While you edit, the Plan pane and the wizard warn when a single Bundle is longer than the maximum marker length; that marker is still kept and flagged "too long".

## Results

| Table | What it shows |
|---|---|
| Markers | Marker, ratio such as `S1 M2 L1`, bundles, length, efficiency, plies per colour and the fabric it takes. |
| Lays | Lay number, colour, marker, ratio, plies, length per ply, garments and fabric. The plies are editable. |
| Ordered, planned, difference | Per size and colour. An over-cut is marked with a text badge as well as a colour. |
| Totals and cost | Garments ordered and planned, markers and lays, fabric per colour, fabric including waste, material cost, estimated production cost and cost per garment. |

Edit the plies of a lay or the ratio of a marker by hand and the difference table follows. The plan is then marked as edited, and solving again asks first. For the sample order PO-100, 590 garments in three colours come out as three markers and nine lays.

## Cut Order

The Cut Order tab turns a solved plan into work for the cutting room: the order in which the lays are spread, and the Fabric Rolls each lay draws its plies from.

1. **Sequence.** Lays are grouped by colour in the order of the Order, so each colour change swaps the roll on the spreader once. Within a colour the longest plies come first, since they need long unbroken stretches of fresh roll and the shorter ones can use the ends.
2. **Roll allocation.** Each ply is taken whole from a roll of the lay's colour that is at least as wide as the material. Rolls of one shade are preferred, so a lay does not mix shades unless no single shade can complete it. Among the rolls that fit, a roll already on the spreader is kept, and the roll whose leftover would be smallest wins.
3. **Remnants and missing fabric.** A roll's Remnant is what is left after the last ply. If no roll can give a ply, the Cut Order reports the lay, the number of plies and the length missing.

Enter the rolls in the Cut Order pane: code, colour, shade, width and length. A roll of another colour, or a roll narrower than the material, stays unused. Splicing a ply across two rolls is not planned, because whole plies never under-plan. The Cut Order never changes the lays or the markers.

## Reports

Generating a CutPlan Report (CSV) writes UTF-8 files, one per section, because CSV has no tabs: the plan's markers, its lays and so on. Generating a CutPlan Report (PDF) writes the same content on A4. Viewing the Production Report leaves out the costs and adds the garments per lay, for the cutting floor. A plan with rolls adds the Cut Order sections to both. The two CSV imports keep their names, Import quantities… and Import Fabric Rolls…, because Optitex has no import-from-CSV command.

## Not shipped yet

Spreading groups that mix materials, a fabric-room inventory shared between plans, roll groups by width and shrinkage with their own markers, several cutting tables per material and several styles in one plan are scheduled for Phase 3. Running a Cut Plan from the command line is not planned. See the [roadmap](../../roadmap/).
