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
| **Nesting** | The act of placing pieces on a marker, by hand or by algorithm, to minimise fabric length. | Packing, layout, optimisation |
| **Lay** | A stack of fabric plies cut together under one marker. | Spread, ply stack |
| **Order** | The quantities of a style per size and colour that cut planning must satisfy. | Job, production order, PO |
| **Base Size** | The one size in a Size Table whose piece geometry is drawn; every other size is derived from it by Grade Rules. | Master size, sample size, reference size |
| **Ply** | One layer of fabric in a Lay. | Layer, sheet |
| **Plot** | Output of a marker or pieces at 1:1 scale to a plotter (HPGL/2) or to PDF, including tiled PDF for small printers. | Print, export drawing |
| **Operator** | The person using Rajutara in a garment workshop: a pattern maker, grader or marker maker trained on Optitex. | User, designer, admin |
| **Turn Point** | A contour point where the line may change direction sharply. Two Turn Points with no Curve Point between them are joined by a straight line. | Corner point, anchor, node |
| **Curve Point** | A contour point that a smooth curve passes through; consecutive Curve Points shape one curve. | Spline point, control point, handle |
| **Grade Point** | A point of a piece that carries its own Grade Rule. Contour points without one move in proportion to the neighbouring Grade Points. | Rule point, cardinal point |
| **Internal Line** | A line inside a piece that is drawn, cut or sewn but is not part of its contour. | Internal, inner line, drawing line |
| **Drill Hole** | A point inside a piece that is punched or marked when the piece is cut, optionally with a diameter. | Punch, hole, button |
| **Annotation** | Text placed on a piece and plotted with it. | Label, comment, note |
| **Mirror Line** | The straight edge of a half piece about which it unfolds into the full, symmetric piece. | Fold line, symmetry line, half line |
| **Dart** | A wedge of fabric taken out of a piece, defined by two legs on the contour and a tip. | Tuck, suppression |
| **Pleat** | A fold of fabric set into a piece from the contour, defined by its fold lines, type (knife, box, axe) and depth. | Tuck, fold |
| **Material** | A named fabric that pieces are cut from. A Marker is made on one Material, which supplies its width, ply mode, shrinkage and cost. | Fabric type, cloth, textile |
| **Ply Mode** | How each Ply of a Material lies on the table: single (open), tubular, faced (face to face) or folded. | Layout mode, spread type, fabric layout |
| **Bundle** | The set of pieces that makes one garment of one size of a style. A Marker asks for a number of Bundles per size. | Set, kit, garment |
| **Buffer** | Extra space kept clear around a piece in a Marker. | Gap, clearance, spacing |
| **Efficiency** | The area of the placed pieces divided by the Marker width times its used length, in percent. | Utilisation, yield, usage |
| **Graded Nest** | All sizes of a piece shown or exported together, aligned at a Stack Point. | Size stack, nest |
| **Stack Point** | The point or grainline at which the sizes of a Graded Nest are aligned for display. Choosing it never changes geometry or Grade Rules. | Anchor point, reference point |
| **Rule Table** | A numbered set of Grade Rules kept with a Style, copied onto Grade Points and exchanged as an ASTM RUL file. | Rules library, rule file, RUL |
| **Cut Plan** | The Lays, each a Marker with a ply count, that together cut an Order from one Material, with the fabric length and cost they consume. | Cutting plan, spreading plan |
| **Cut Order** | The sequence in which the Lays of a Cut Plan are spread and cut, with the Fabric Rolls each Lay draws its Plies from. Optitex calls a whole plan a "cut order"; in Rajutara that is the Cut Plan. | Spreading order, cutting sequence, roll plan |
| **Fabric Roll** | One roll of a Material in one Order colour as it comes from the fabric room, with its code, Shade, width and length. Each Ply is drawn whole from one Fabric Roll. | Bolt, piece goods, roll stock |
| **Shade** | The tone class a Fabric Roll is graded into at inspection (Optitex "Shade": A, B, C, …). The Plies of one Lay come from one Shade whenever the rolls allow. | Lot, dye lot, tone |
| **Remnant** | The fabric left on a Fabric Roll after the Cut Order has drawn its Plies from it; it goes back to the fabric room. | Roll end, end bit, leftover, offcut |
