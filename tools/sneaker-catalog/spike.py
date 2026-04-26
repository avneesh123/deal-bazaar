"""
Phase-1 spike: compare rembg models on the worst Batch-9 catalog inputs.

Outputs each variant + a side-by-side comparison vs the imgly result so we
can decide if the upgrade is worth the work.

Usage:
    source .venv/bin/activate
    python spike.py
"""

import os
from io import BytesIO
from pathlib import Path
from PIL import Image
from rembg import remove, new_session

ROOT = Path("/tmp/db-batch9")
OUT_ROOT = Path("/tmp/db-spike")
OUT_ROOT.mkdir(parents=True, exist_ok=True)

# Worst-quality B9 inputs (tissue paper / box artifacts in current pipeline)
TARGETS = [
    ("ua-kids-1942", ROOT / "b9-2-ua-kids-blue/IMG_1942.jpg"),
    ("aj6-1958", ROOT / "b9-5-aj6-red-oreo/IMG_1958.jpg"),
    ("topten-1938", ROOT / "b9-1-adidas-top-ten-hi/IMG_1938.jpg"),
]

# Models to try, in order of expected quality
MODELS = [
    ("isnet-general-use", "ISNet — strong default for products"),
    ("birefnet-general", "BiRefNet general — 2024 SOTA"),
    ("birefnet-portrait", "BiRefNet portrait variant — for comparison"),
]


def process(img_path: Path, model_name: str) -> Image.Image:
    session = new_session(model_name)
    with open(img_path, "rb") as f:
        raw = f.read()
    out = remove(raw, session=session, alpha_matting=False)
    return Image.open(BytesIO(out))


def composite_on_white(rgba: Image.Image) -> Image.Image:
    """Flatten transparent PNG onto a white canvas at native resolution."""
    if rgba.mode != "RGBA":
        rgba = rgba.convert("RGBA")
    bg = Image.new("RGB", rgba.size, (255, 255, 255))
    bg.paste(rgba, mask=rgba.split()[3])
    return bg


def main():
    for label, path in TARGETS:
        if not path.exists():
            print(f"  SKIP {label}: missing {path}")
            continue
        print(f"\n=== {label} ===")
        for model_name, desc in MODELS:
            print(f"  • {model_name} — {desc}")
            try:
                cutout = process(path, model_name)
                flat = composite_on_white(cutout)
                out_path = OUT_ROOT / f"{label}__{model_name}.jpg"
                flat.save(out_path, "JPEG", quality=88)
                print(f"    -> {out_path}")
            except Exception as e:
                print(f"    FAILED: {e}")


if __name__ == "__main__":
    main()
