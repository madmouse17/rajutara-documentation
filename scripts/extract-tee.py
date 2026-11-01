#!/usr/bin/env python3
"""Read the real outlines of the sample tee out of its marker plot, for the pattern-to-marker animation.

kaos-lengan-pendek-marker.plt is what Rajutara itself plotted for the sample marker: for each of the 20
placed pieces an outline, its notches, its grainline and a label, in HPGL/2 units (40 per mm). This script
turns every piece into an upright shape (grainline in the piece's own direction, origin at the grainline
start) plus the pose that carries it back to its place in the marker, so the page can draw the block, grade
it and slide the pieces onto the fabric with CSS transforms alone. Nothing here is invented geometry.

Coordinates in the output are millimetres in SVG orientation (y down), marker origin at the top-left of the
fabric. The native grain directions come from the piece list of the sample style: FRONT, BACK and SLEEVE
run up the page, NECK RIB runs to the right.

Plain Python, no dependencies.

    python3 scripts/extract-tee.py public/samples/kaos-lengan-pendek/kaos-lengan-pendek-marker.plt \
        src/data/tee-marker.json
"""

import argparse
import json
import math
import re
from pathlib import Path

UNITS_PER_MM = 40.0
FABRIC_X0 = 10400.0  # the header block sits left of the fabric; the fabric starts here
NATIVE_GRAIN = {"FRONT": -90.0, "BACK": -90.0, "SLEEVE": -90.0, "NECK RIB": 0.0}  # degrees, SVG orientation
SIZES = ["S", "M", "L", "XL"]
TOLERANCE_MM = 0.25


def parse_plt(text: str):
    """Statements of the plot: polylines and labels, in file order."""
    items, pos, i = [], (0.0, 0.0), 0
    while i < len(text):
        op = text[i : i + 2]
        if op == "LB":
            j = text.index("\x03", i)
            items.append(("LB", pos, text[i + 2 : j]))
            i = j + 1
            continue
        j = text.find(";", i)
        j = len(text) if j < 0 else j
        arg = text[i + 2 : j]
        if op == "PU" and arg:
            x, y = arg.split(",")
            pos = (float(x), float(y))
        elif op == "PD" and arg:
            nums = [float(v) for v in arg.split(",")]
            line = [pos] + [(nums[k], nums[k + 1]) for k in range(0, len(nums), 2)]
            items.append(("PD", line, None))
            pos = line[-1]
        i = j + 1
    return items


def douglas_peucker(points, eps):
    if len(points) < 3:
        return points
    (x0, y0), (x1, y1) = points[0], points[-1]
    dx, dy = x1 - x0, y1 - y0
    norm = math.hypot(dx, dy)
    best, at = -1.0, 0
    for k in range(1, len(points) - 1):
        px, py = points[k]
        d = abs(dy * (px - x0) - dx * (py - y0)) / norm if norm else math.hypot(px - x0, py - y0)
        if d > best:
            best, at = d, k
    if best <= eps:
        return [points[0], points[-1]]
    return douglas_peucker(points[: at + 1], eps)[:-1] + douglas_peucker(points[at:], eps)


def fmt(v: float) -> str:
    s = f"{v:.1f}"
    return "0" if s in ("-0.0", "0.0") else s.rstrip("0").rstrip(".") if "." in s else s


def path_d(points, close=False) -> str:
    d = "M" + " ".join(f"{fmt(x)} {fmt(y)}" for x, y in points[:1])
    d += "".join(f"L{fmt(x)} {fmt(y)}" for x, y in points[1:])
    return d + ("Z" if close else "")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("plt", type=Path)
    ap.add_argument("out", type=Path)
    args = ap.parse_args()

    text = args.plt.read_text()
    items = parse_plt(text)
    header = {k: v for _, _, lab in items if lab and ":" in lab for k, v in [lab.split(": ", 1)]}
    width_mm = float(re.match(r"[\d.]+", header["Width"])[0]) * 10
    length_mm = float(re.match(r"[\d.]+", header["Length"])[0]) * 10
    efficiency = float(re.match(r"[\d.]+", header["Efficiency"])[0])

    # A piece is every polyline up to its label; the first polyline is the outline, the last long 2-point
    # one is the grainline, everything else is a notch.
    blocks, current = [], []
    for kind, a, b in items:
        if kind == "PD":
            current.append(a)
        elif current and re.fullmatch(r"(FRONT|BACK|SLEEVE|NECK RIB) (S|M|L|XL) A", b):
            blocks.append((b, current))
            current = []
        else:
            current = []

    def to_svg(p):
        return ((p[0] - FABRIC_X0) / UNITS_PER_MM, width_mm - p[1] / UNITS_PER_MM)

    pieces, copies = [], {}
    for label, lines in blocks:
        name, size = re.fullmatch(r"(.+) (S|M|L|XL) A", label).groups()
        outline = [to_svg(p) for p in lines[0]]
        grain = [to_svg(p) for p in lines[-1]]
        notches = [[to_svg(p) for p in line] for line in lines[1:-1]]
        gx, gy = grain[0]
        angle = math.degrees(math.atan2(grain[1][1] - gy, grain[1][0] - gx))
        rot = (angle - NATIVE_GRAIN[name] + 180) % 360 - 180

        c, s = math.cos(math.radians(-rot)), math.sin(math.radians(-rot))

        def local(p):
            x, y = p[0] - gx, p[1] - gy
            return (x * c - y * s, x * s + y * c)

        lo = [local(p) for p in outline]
        simple = douglas_peucker(lo[:-1], TOLERANCE_MM)
        xs, ys = [p[0] for p in simple], [p[1] for p in simple]
        glen = math.hypot(grain[1][0] - gx, grain[1][1] - gy)
        copy = copies.get((name, size), 0)
        copies[(name, size)] = copy + 1
        pieces.append(
            {
                "name": name,
                "size": size,
                "copy": copy,
                "pose": {"x": round(gx, 1), "y": round(gy, 1), "rot": round(rot, 1)},
                "outline": path_d(simple, close=True),
                "notches": " ".join(path_d([local(p) for p in n]) for n in notches),
                "grain": round(glen, 1),
                "bbox": [round(min(xs), 1), round(min(ys), 1), round(max(xs), 1), round(max(ys), 1)],
            }
        )

    assert len(pieces) == 20, f"expected 20 placed pieces, found {len(pieces)}"
    data = {
        "marker": {"width": round(width_mm, 1), "length": round(length_mm, 1), "efficiency": efficiency},
        "sizes": SIZES,
        "pieces": pieces,
    }
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(data, separators=(",", ":")) + "\n")
    points = sum(p["outline"].count("L") + 1 for p in pieces)
    print(f"{args.out}: {len(pieces)} pieces, {points} outline points, {args.out.stat().st_size} bytes")


if __name__ == "__main__":
    main()
