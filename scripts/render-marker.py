#!/usr/bin/env python3
"""Stitch the A0 tiles of a optirust marker plot PDF into one image of the whole marker.

optirust writes a marker bigger than one sheet as a tiled PDF: page 1 is the assembly map, the other pages
are tiles laid edge to edge inside a 10 mm frame (docs/spec/02-pds.md 9.3 in the optirust repository).
This reads the tile grid from the map page, crops every tile to its frame, joins them and drops the
header block that sits left of the fabric. Lines are drawn in the brand navy on white.

Needs Pillow, numpy and `pdftoppm` (poppler-utils).

    python3 scripts/render-marker.py samples/kaos-lengan-pendek/kaos-lengan-pendek-marker.pdf \
        src/assets/gallery/tee-marker.png --header-mm 260 --width 2400
"""

import argparse
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

DPI = 60
MARGIN_MM = 10
A0_MM = (841.0, 1189.0)
INK = (0x11, 0x1C, 0x2E)


def map_text(pdf: Path) -> str:
    return subprocess.run(
        ["pdftotext", "-f", "1", "-l", "1", "-raw", str(pdf), "-"],
        check=True,
        capture_output=True,
        text=True,
    ).stdout


def tile_grid(text: str) -> tuple[float, float, int, int]:
    """Plot size in mm and the tile grid, from the 'Plot W x H mm: N tiles (R rows x C columns)' line."""
    m = re.search(r"Plot (\d+(?:\.\d+)?) x (\d+(?:\.\d+)?) mm: \d+ tiles \((\d+) rows x (\d+) columns\)", text)
    if not m:
        sys.exit("page 1 is not an optirust tile map")
    return float(m[1]), float(m[2]), int(m[3]), int(m[4])


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pdf", type=Path)
    ap.add_argument("out", type=Path)
    ap.add_argument("--header-mm", type=float, default=0.0, help="width of the header block to cut off the left")
    ap.add_argument("--width", type=int, default=2400, help="output width in pixels")
    args = ap.parse_args()

    plot_w, plot_h, rows, cols = tile_grid(map_text(args.pdf))
    px_per_mm = DPI / 25.4
    frame_w = A0_MM[0] - 2 * MARGIN_MM
    frame_h = A0_MM[1] - 2 * MARGIN_MM
    col_mm = [min(frame_w, plot_w - c * frame_w) for c in range(cols)]
    row_mm = [min(frame_h, plot_h - r * frame_h) for r in range(rows)]

    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["pdftoppm", "-r", str(DPI), "-f", "2", "-png", str(args.pdf), f"{tmp}/t"], check=True)
        pages = sorted(Path(tmp).glob("t-*.png"), key=lambda p: int(p.stem.split("-")[1]))
        if len(pages) != rows * cols:
            sys.exit(f"expected {rows * cols} tile pages, found {len(pages)}")

        inset = round(MARGIN_MM * px_per_mm)
        sheet = Image.new("L", (round(plot_w * px_per_mm), round(plot_h * px_per_mm)), 255)
        y = 0
        for r in range(rows):
            x = 0
            h = round(row_mm[r] * px_per_mm)
            for c in range(cols):
                w = round(col_mm[c] * px_per_mm)
                tile = Image.open(pages[r * cols + c]).convert("L")
                # One pixel inside the frame, so the frame line itself never shows at a seam.
                sheet.paste(tile.crop((inset + 1, inset + 1, inset + w, inset + h)), (x + 1, y + 1))
                x += w
            y += h

    marker = sheet.crop((round(args.header_mm * px_per_mm), 0, sheet.width, sheet.height))
    # Binarise, then thicken: a 0.35 mm plot line would otherwise fade to grey when the image is shrunk.
    ink = Image.fromarray(np.where(np.array(marker) < 225, 0, 255).astype("uint8")).filter(ImageFilter.MinFilter(3))
    small = ink.resize((args.width, round(args.width * marker.height / marker.width)), Image.LANCZOS)
    t = np.array(small).astype(np.float32)[:, :, None] / 255.0
    rgb = 255 * t + np.array(INK, dtype=np.float32)[None, None, :] * (1 - t)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgb.clip(0, 255).astype("uint8")).save(args.out, optimize=True)
    print(f"{args.out}: {small.width}x{small.height}")


if __name__ == "__main__":
    main()
