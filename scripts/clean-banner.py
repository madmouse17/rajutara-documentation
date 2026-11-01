#!/usr/bin/env python3
"""Remove the baked-in "Loading... please wait" caption and progress bar from rajutara-banner-wide.jpg.

The owner's wide banner doubles as the splash art, so it carries a loader under the tagline. On a web page
that reads as a page stuck loading. This repaints that strip as plain blueprint paper: a smooth background
(harmonic fill from the strip's border) plus the horizontal grid lines read off the paper beside it. Nothing else
in the artwork is touched.

Needs Pillow and numpy.

    python3 scripts/clean-banner.py ../rajutara/assets/logo/rajutara-banner-wide.jpg \
        src/assets/brand/rajutara-banner.jpg --og public/og.jpg
"""

import argparse
from pathlib import Path

import numpy as np
from PIL import Image

# The loader strip in the 1600x656 original: caption at y 349-370, bar at y 379-401, x 606-971.
MASK = (598, 342, 990, 406)  # x0, y0, x1, y1 (exclusive)
# Left of the strip the paper is clean except for one ruler line (rows 392-398), so its rows show where the
# horizontal grid lines run. The vertical lines are too faint near the strip to be worth redrawing.
FLANK = (566, 596)
RULER_ROWS = (392, 399)


def row_pattern(arr: np.ndarray, y0: int, y1: int) -> np.ndarray:
    """Deviation of each row from its paper, per channel, read off the clean flank left of the strip."""
    rows = arr[y0 - 8 : y1 + 8, FLANK[0] : FLANK[1]].mean(axis=1)
    dev = np.zeros_like(rows)
    for i in range(rows.shape[0]):
        lo, hi = max(0, i - 6), min(rows.shape[0], i + 7)
        dev[i] = rows[i] - np.median(rows[lo:hi], axis=0)
    dev = dev[8:-8]
    dev[RULER_ROWS[0] - y0 : RULER_ROWS[1] - y0] = 0.0
    return np.clip(dev, -4.0, 40.0)


def harmonic_fill(img: np.ndarray, box: tuple[int, int, int, int], iterations: int = 4000) -> np.ndarray:
    """Fill `box` with the smooth interpolation of its border (Laplace equation, Jacobi iterations)."""
    x0, y0, x1, y1 = box
    out = img.copy()
    sub = out[y0 - 1 : y1 + 1, x0 - 1 : x1 + 1].copy()
    # Seed the interior with the mean of the surrounding ring so the iteration converges quickly.
    sub[1:-1, 1:-1] = np.mean([sub[0], sub[-1]], axis=(0, 1))
    for _ in range(iterations):
        sub[1:-1, 1:-1] = 0.25 * (sub[:-2, 1:-1] + sub[2:, 1:-1] + sub[1:-1, :-2] + sub[1:-1, 2:])
    out[y0:y1, x0:x1] = sub[1:-1, 1:-1]
    return out


def clean(img: Image.Image) -> Image.Image:
    arr = np.asarray(img.convert("RGB"), dtype=np.float64)
    x0, y0, x1, y1 = MASK
    lines = row_pattern(arr, y0, y1)
    # Take the grid lines out of the border before interpolating it, then put the same rows back inside.
    flat = arr.copy()
    ring_rows = slice(y0, y1)
    flat[ring_rows, x0 - 1] -= lines
    flat[ring_rows, x1] -= lines
    paper = harmonic_fill(flat, MASK)
    paper[y0:y1, x0:x1] += lines[:, None, :]
    # Match the JPEG grain of the surrounding paper so the repaint does not look airbrushed.
    rng = np.random.default_rng(1600656)
    grain = float(np.std(arr[y0 - 8 : y0 - 2, x0:x1] - arr[y0 - 8 : y0 - 2, x0:x1].mean(axis=1, keepdims=True)))
    paper[y0:y1, x0:x1] += rng.normal(0, min(grain, 1.6), size=(y1 - y0, x1 - x0, 3))
    return Image.fromarray(np.clip(paper, 0, 255).round().astype("uint8"))


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("banner", type=Path)
    ap.add_argument("out", type=Path)
    ap.add_argument("--og", type=Path, help="also write the 1200x492 social card, the same art scaled by 0.75")
    args = ap.parse_args()

    cleaned = clean(Image.open(args.banner))
    args.out.parent.mkdir(parents=True, exist_ok=True)
    cleaned.save(args.out, quality=92, optimize=True, progressive=True)
    print(f"{args.out}: {cleaned.width}x{cleaned.height}")
    if args.og:
        og = cleaned.resize((1200, 492), Image.LANCZOS)
        args.og.parent.mkdir(parents=True, exist_ok=True)
        og.save(args.og, quality=88, optimize=True, progressive=True)
        print(f"{args.og}: {og.width}x{og.height}")


if __name__ == "__main__":
    main()
