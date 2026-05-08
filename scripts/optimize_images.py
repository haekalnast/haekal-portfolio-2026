#!/usr/bin/env python3
"""
Losslessly-ish optimize public PNG assets for stable Lighthouse scores.

Requires Pillow:
  python3 -m pip install pillow

Usage:
  python3 scripts/optimize_images.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Iterable

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT / "public"

# Directory-specific resize targets (max width/height).
# Keep these conservative to avoid visual regressions while preventing giant assets.
MAX_DIMENSIONS: dict[Path, tuple[int, int]] = {
    PUBLIC_DIR / "home" / "dock": (132, 132),  # rendered ~66x66
    PUBLIC_DIR / "home" / "featured-bpr": (1024, 4096),  # large BPR section screenshot
}

SKIP_FILES = {
    "favicon.ico",
    "icon.png",
    "og-image.png",
    "og-about.png",
    "og-designs.png",
    "og-case-personal.png",
}


def iter_png_files() -> Iterable[Path]:
    for path in PUBLIC_DIR.rglob("*.png"):
        if path.name in SKIP_FILES:
            continue
        yield path


def choose_limit(path: Path) -> tuple[int, int]:
    for directory, max_size in MAX_DIMENSIONS.items():
        if directory in path.parents:
            return max_size
    # sensible default for most content images
    return (1600, 1600)


def optimize_png(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    max_w, max_h = choose_limit(path)

    with Image.open(path) as img:
        # Preserve alpha-aware mode where needed.
        working = img.convert("RGBA") if img.mode in ("RGBA", "LA", "P") else img.convert("RGB")

        # Downscale only if over limit.
        if working.width > max_w or working.height > max_h:
            ratio = min(max_w / working.width, max_h / working.height)
            target = (max(1, round(working.width * ratio)), max(1, round(working.height * ratio)))
            working = working.resize(target, Image.Resampling.LANCZOS)

        # Quantize to cut bytes aggressively while keeping UI image quality acceptable.
        quantized = working.quantize(
            colors=192,
            method=Image.Quantize.FASTOCTREE,
            dither=Image.Dither.FLOYDSTEINBERG,
        )
        quantized.save(path, optimize=True, compress_level=9)

    after = path.stat().st_size
    return before, after


def main() -> None:
    total_before = 0
    total_after = 0
    changed = 0

    for png in iter_png_files():
        before, after = optimize_png(png)
        total_before += before
        total_after += after
        if after != before:
            changed += 1
            rel = png.relative_to(ROOT)
            print(f"{rel}: {before} -> {after} bytes")

    print("\nOptimization summary")
    print(f"Files changed: {changed}")
    print(f"Total bytes: {total_before} -> {total_after}")
    print(f"Saved bytes: {max(0, total_before - total_after)}")


if __name__ == "__main__":
    main()
