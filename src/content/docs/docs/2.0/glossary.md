---
title: Glossary
description: "The vocabulary of Rajutara: style, piece, contour, grade rule, marker, lay and the rest."
---

The words of Rajutara. They are also the names of its types and modules, so a term here is the term in the code, the menus and these pages. The third column lists words that mean something else in this project or are easy to confuse with the term.

| Term | Meaning | Avoid |
|---|---|---|
| **Style** | A garment design as a set of pattern pieces plus its size table and grade rules. The unit a document saves. | Model, design file, project |
| **Piece** | One pattern component of a style, bounded by a closed cutting contour, carrying its notches, grainline, internal lines and annotations. | Panel, part, pattern |
| **Contour** | The closed outline of a piece: an ordered sequence of segments (line, cubic Bézier, arc). The cutting contour is the outermost; the sewing contour is the cutting contour minus seam allowance. | Outline, boundary, path, polygon |
| **Seam Allowance** | The band between sewing contour and cutting contour, with a width per segment. | Margin, offset, SA |
| **Notch** | A mark on the contour that aligns pieces during sewing. Has a shape (V, T, I, L (check), U, Box), depth and width. Box is the ASTM D6673 "castle" notch (layer 81). | Clip, snip, mark, castle |
| **Grainline** | The directed line on a piece that must align with the fabric warp during marker placement. | Grain, arrow, warp line |
| **Size Table** | The ordered list of sizes a style is graded to, with one base size. | Size range, size set |
| **Grade Rule** | The X/Y displacement of one point of a piece (contour, internal, drill hole or grainline end) from the base size to each other size. | Grading increment, growth, delta table |
| **Marker** | The arrangement of pieces of one or more styles and sizes on a fabric of given width, ready to plot or cut. | Layout, nest, lay plan |
| **Marker Table** | The canvas of the Marker workspace: the fabric band of the Marker's Material width on which pieces are placed. X runs along the marker length (the warp), Y across the width. | Canvas, desk, work area |
| **Piece Bar** | The strip of the Marker workspace that holds the piece instances still waiting to be placed: one thumbnail per Style, piece and size with the remaining count. Its order seeds Nesting. | Piece tray, palette, queue |
| **Piece List** | The Marker workspace table with one row per piece and size of the embedded Styles, where Marker-only properties (code, material, quantity, rotation, flip, buffer) are edited on the embedded copy. | Pieces Table (the PDS pane), parts list |
| **Cluster** | Two or more placed pieces of a Marker that keep their arrangement and are moved, shot and nested as one piece. While they wait, the Piece Bar shows them as one thumbnail. | Group, bundle (a Bundle is the pieces of one size request), assembly |
| **Fuse Block** | A Cluster with a border (a rectangle round the pieces or a contour that follows them, at a set gap) that Export Cut File cuts instead of the pieces, so the block can be fused before the pieces are cut. | Fusing zone, interlining block |
| **Cutting Order** | The order in which a Marker's pieces go to the cutter, with the start point and the direction of each cut. Not the Cut Order of a Cut Plan. | Cut sequence, plot order, Cut Order (that is the Cut Plan's) |
| **Bump Line** | A vertical or horizontal wall of a Marker that pieces do not cross during Nesting and Shoot. A Bump Line may also be a Cut Line, or a No Bump line that pieces may cross. | Wall, barrier, stop line |
| **Cut Line** | A Bump Line that Export Cut File writes as a cut across the fabric, with an overcut at each end and a shortest segment kept. | Cross cut, split line |
| **Flaw** | A rectangle of the fabric, marked on the Marker, that no piece may overlap. A Flaw may span the whole marker length or the whole Material width. | Defect, hole, damage |
| **Nesting** | The act of placing pieces on a marker, by hand or by algorithm, to minimise fabric length. | Packing, layout, optimisation |
| **Lay** | A stack of fabric plies cut together under one marker. | Spread, ply stack |
| **Order** | The quantities of a style per size and colour that cut planning must satisfy. | Job, production order |
| **Base Size** | The one size in a Size Table whose piece geometry is drawn; every other size is derived from it by Grade Rules. | Master size, sample size, reference size |
| **Ply** | One layer of fabric in a Lay. | Layer, sheet |
| **Plot** | Output of a marker or pieces at 1:1 scale to a plotter (HPGL/2) or to PDF, including tiled PDF for small printers. | Print, export drawing |
| **Operator** | The person using rajutara in a garment workshop: a pattern maker, grader or marker maker trained on Optitex. | User, designer, admin |
| **Turn Point** | A contour point where the line may change direction sharply. Two Turn Points with no Curve Point between them are joined by a straight line. | Corner point, anchor, node |
| **Curve Point** | A contour point that a smooth curve passes through; consecutive Curve Points shape one curve. | Spline point, control point, handle |
| **Grade Point** | A point of a piece that carries its own Grade Rule. Contour points without one move in proportion to the neighbouring Grade Points. | Rule point, cardinal point |
| **Internal Line** | A line inside a piece that is drawn, cut or sewn but is not part of its contour. | Internal, inner line, drawing line |
| **Drill Hole** | A point inside a piece that is punched or marked when the piece is cut, optionally with a diameter. | Punch, hole, button |
| **Annotation** | Text placed on a piece and plotted with it. | Label, comment, note |
| **Mirror Line** | The straight edge of a half piece about which it unfolds into the full, symmetric piece. | Fold line, symmetry line, half line |
| **Dart** | A wedge of fabric taken out of a piece, defined by two legs on the contour and a tip. | Tuck, suppression |
| **Pleat** | A fold of fabric set into a piece from the contour, defined by its fold lines, type (knife, box, axe) and depth. | Tuck, fold |
| **Track Line** | The thin dashed ghost of a Piece as it was when Track Lines was switched on, base size only, with its internals. It lives for the session and is not saved. Restore By Track Line puts the remembered shape back. | Trace, history line, undo ghost |
| **Zone** | An area of a Map Piece marked by clicking inside it (Build Zone) or by tracing the runs that confine it (Trace Zone). Create Pieces From Map turns each Zone into a Piece. | Region, area, section |
| **Map Piece** | A Piece that holds Zones: a flat sketch of the garment whose areas become the real Pieces. Pieces made from it remember their Zone, so Correct All Pieces By Map can rebuild them. | Block, master piece, base pattern |
| **Equal Segments Group** | Runs of contours or Internal Lines of one Style that stay equal while the Operator edits: in length only, or in shape as well. The first run edited leads and the others follow. | Linked segments, match group, sibling lines |
| **Stripe Group** | A number given to Pieces that share one stripe or check match in a Marker. Relate Piece To Stripes marks the point of a Piece that sits on a stripe line. | Match group, pattern group |
| **Spread Pieces** | A Piece flagged so that the Work Area and the Plot show one derived copy for each further Quantity and Pair beside it. Gather Pieces clears the flag. Not the spreading of a Lay. | Duplicate, copy pieces, array |
| **Material** | A named fabric that pieces are cut from. A Marker is made on one Material, which supplies its width, ply mode, shrinkage and cost. | Fabric type, cloth, textile |
| **Ply Mode** | How each Ply of a Material lies on the table: single (open), tubular, faced (face to face) or folded. | Layout mode, spread type, fabric layout |
| **Bundle** | The set of pieces that makes one garment of one size of a style. A Marker asks for a number of Bundles per size. | Set, kit, garment |
| **Buffer** | Extra space kept clear around a piece in a Marker. | Gap, clearance, spacing |
| **Efficiency** | The area of the placed pieces divided by the Marker width times its used length, in percent. | Utilisation, yield, usage |
| **Graded Nest** | All sizes of a piece shown or exported together, aligned at a Stack Point. | Size stack, nest |
| **Stack Point** | The point or grainline at which the sizes of a Graded Nest are aligned for display. Choosing it never changes geometry or Grade Rules. | Anchor point, reference point |
| **Rule Table** | A numbered set of Grade Rules kept with a Style, copied onto Grade Points and exchanged as an ASTM RUL file. | Rules library, rule file, RUL |
| **Cut Plan** | The Lays, each a Marker with a ply count, that together cut the Order of each of its Purchase Orders from its Materials, with the fabric length and cost they consume. | Cutting plan, spreading plan |
| **Cut Order** | The sequence in which the Lays of a Cut Plan are spread and cut, with the Fabric Rolls each Lay draws its Plies from. Optitex calls a whole plan a "cut order"; in rajutara that is the Cut Plan. | Spreading order, cutting sequence, roll plan |
| **Fabric Roll** | One roll of a Material in one Order colour as it comes from the Fabric Room, with its code, Shade, width and length. Each Ply is drawn whole from one Fabric Roll. | Bolt, piece goods, roll stock |
| **Shade** | The tone class a Fabric Roll is graded into at inspection (Optitex "Shade": A, B, C, …). The Plies of one Lay come from one Shade whenever the rolls allow. | Lot, dye lot, tone |
| **Remnant** | The fabric left on a Fabric Roll after the Cut Order has drawn its Plies from it; it goes back to the Fabric Room. | Roll end, end bit, leftover, offcut |
| **Purchase Order** | A buyer's order inside a Cut Plan: its Order (the quantities), its own markers and its own Lays. A Cut Plan holds one or more, each planned apart and compared side by side. Written PO in the interface. | Order (that is the quantities alone), job, batch |
| **Spreading Group** | Materials of a Cut Plan that are cut from one fabric together. The first Material gives the width, shrinkage and cost, and a marker holds the pieces of all of them. | Fabric group, material set |
| **Cutting Table** | A table a Cut Plan can cut on: a length, a fewest and a most Plies, and optionally the one Material or Spreading Group it serves. | Spreading table, cutting bed, Marker Table (that is the canvas) |
| **Roll Group** | Fabric Rolls of one Material planned together because they share a width step, a shrinkage or a Shade. Each group has markers of its own. | Roll batch, fabric lot |
| **Fabric Room** | The workshop's inventory of Fabric Rolls as a CSV or Excel file. A Cut Plan takes rolls from it and writes the Remnants back after the Operator confirms. | Warehouse, stock list, roll database |
| **Style Set** | A named list of pieces of one Style, each row with its own name, code, description, Material, quantity, pair and shrink. A Marker or Cut Plan can embed a Style Set instead of the whole Style. | Piece group, kit, collection |
| **Measurement Chart** | The measures a buyer specifies for a Style, each the sum of parts taken between two points of a piece in every size, with a buyer value and a tolerance per size. Rajutara checks the pieces against it and never changes a piece to meet it. | Size chart, spec sheet, POM table |
| **Size Variation** | A further set of sizes with its own grading, kept beside the main Size Table (for example Short, Regular and Long). Reshape Variation Grading merges them into one Size Table. | Size group, size run, fit |
| **Merged Base Size** | The Base Size of a Style that Cross Grading merged into another, marked `*` in the size tables. Its pieces keep their geometry at that size and their own deltas. | Second base, extra base |
| **Notch Preset** | A saved notch: shape, depth, width, Top Width, Reverse and command, chosen by name in the Notch Tool and Notch Properties. Every Style uses the same list. | Notch template, favourite notch |
| **Stripe Definition** | The stripe or plaid lines of the fabric on the Marker Table: where they start, the distance between vertical and between horizontal stripes, and their angles. | Check pattern, fabric grid |
| **Folded Piece** | A pair placed folded on the Marker Table as the half on the table side of its fold line, along an edge or as a quarter in a corner. | Half piece (that is the stored half of a Mirror Line), mirrored piece |
| **Side Buffer** | Extra Buffer on one side of a Piece (Up, Down, Left or Right of its grain frame), with the options Convex and Round Corners. A Buffer Chain gives one run of the contour its own Buffer. | Edge buffer, offset |
| **Lane** | One of up to six bands across the Material width in which Auto Nesting keeps whole Bundles. | Column, strip, horizontal group |
| **Cut Elsewhere** | A piece of an order that another Marker of the same order cuts (Auto Save Of Markers). The Marker hides it, never nests it and does not count it missing. | Excluded piece, hidden piece |
| **Command Layer** | The one set of typed tools that batch scripts, the MCP server and Playbooks use to read and change documents. Each tool has a name, a JSON schema, a Tool Tier and the Roles that may run it, and every change goes through Undo. | API, plugin interface, scripting layer |
| **Tool Tier** | The grade of a Command Layer tool: basic, standard or advanced. A session sets the highest tier it may call. | Level, permission |
| **Role** | Who a Command Layer session acts as: Designer, Grader, Marker maker, Cutter or Supervisor. Supervisor is the default and runs everything. | User level, account, permission |
| **Approval Policy** | Ask or Yolo. With Ask, the default, a tool that saves, overwrites, deletes or discards waits for the Operator. Yolo skips the questions but always keeps backups, the trash and the action log. | Auto-approve, trust mode, autopilot |
| **Untrusted Text** | Text that came from a file (piece names, DXF text, sheet cells, buyer and PO names). It reaches the caller only in a field of its own and never becomes an instruction. | User input, external text |
| **Playbook** | A TOML recipe of named stages with parameters, checks and Approval Checkpoints, run through the Command Layer. Its state is saved after every stage, and every run writes a Run Record. | Macro, workflow, script |
| **Approval Checkpoint** | A point in a Playbook where the run stops and asks the Operator to continue, choose or stop. | Confirmation, gate |
| **Quick Action** | A named start of a Playbook with its parameters filled in. | Shortcut, preset, macro |
| **Run Record** | The file a Playbook run writes: app, Playbook, Workshop Profile and Prompt File versions and hashes, the model id and the nesting seeds. Replaying it repeats the run. | Log, audit trail, history |
| **Workshop Profile** | One TOML file of the workshop's standards, labelled in Indonesian. Playbooks read it, and a value without a source is reported as needing the Operator's confirmation. | Settings, factory config, template |
| **Assistant Memory** | Lessons, preferences, facts and corrections kept on this PC between sessions. Document and tool results outrank the Workshop Profile, which outranks memory. | History, chat log, cache |
| **Knowledge Index** | A local BM25 search index over the workshop's own SOPs and buyer manuals. The files are read and never changed. | Library, wiki, vector store |
| **Prompt File** | A versioned text that tells a model who Rajutara is and how to answer: a core file and one per Role. A managed copy in the config folder wins over the shipped file. | System prompt, template |
| **Action Contract** | The rule that a model answers with exactly one JSON action per turn: a tool with its arguments, a sentence, or a question with two to six choices. | Output format, protocol |
