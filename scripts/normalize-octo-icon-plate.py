#!/usr/bin/env python3
"""Snap OCTO raster “plate” pixels to exact `#F2F2F2` so the icon melts into the card fill.

Keeps blacks and saturated reds/blues; collapses neutrals + tinted anti-alias halos that still read as a tile.

Requires Pillow: `pip install Pillow`
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

CARD_RGB = (242, 242, 242)


def main() -> None:
    repo = Path(__file__).resolve().parents[1]
    path = repo / "public/designs/cards-variant1/octo-app-icon.png"
    im = Image.open(path).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10:
                continue
            hi = max(r, g, b)
            lo = min(r, g, b)
            chroma = hi - lo

            # Protect blacks / QR / saturated artwork.
            if hi < 60:
                continue
            if chroma >= 42:
                continue
            if chroma >= 28 and lo < 90:
                continue

            snap = (
                (chroma <= 12 and lo >= 237)
                or (chroma <= 22 and lo >= 234 and hi >= 248)
                or (hi >= 253 and lo >= 231 and chroma <= 24)
                or (chroma <= 20 and lo >= 232 and 246 <= hi <= 252)
            )
            if snap:
                px[x, y] = (*CARD_RGB, a)

    im.save(path)


if __name__ == "__main__":
    main()
