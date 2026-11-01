#!/usr/bin/env python3
"""Cut the drawing areas out of the real application screenshots, for the "Made with Rajutara" strip.

The screenshots are 1280 px wide captures of the release build under Xvfb (src/assets/screens, copied from
docs/images in the application repository) and the poster of the demo clip. Each crop keeps the canvas and its
rulers and drops the panes around it. Needs Pillow.

    python3 scripts/crop-gallery.py
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

CROPS = [
    # name, source, (left, top, right, bottom)
    ("nest-300.jpg", ROOT / "src/assets/screens/full-nest.jpg", (309, 300, 1274, 668)),
    ("grading-nest.jpg", ROOT / "src/assets/screens/full-grading.jpg", (309, 280, 1165, 690)),
    ("tee-nested.jpg", ROOT / "public/media/rajutara-marker-demo-poster.jpg", (309, 100, 1275, 692)),
]

out = ROOT / "src/assets/gallery"
out.mkdir(parents=True, exist_ok=True)
for name, source, box in CROPS:
    crop = Image.open(source).convert("RGB").crop(box)
    crop.save(out / name, quality=88, optimize=True, progressive=True)
    print(f"{out / name}: {crop.width}x{crop.height}")
