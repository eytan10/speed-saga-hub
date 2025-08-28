#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
car_images_builder.py
---------------------
בונה ספריית תמונות לרכבים מתוך קובץ CSV של הנתונים שלך, בשתי דרכים:
1) placeholder: מייצר תמונות דמה עם כיתוב (ללא אינטרנט/טוקנים).
2) wikipedia: מנסה למשוך תמונות מאנציקלופדיה ויקיפדיה (API חינמי ללא טוקן).
   * מומלץ לשימוש זהיר: בדוק רישיונות/ייחוס בקובץ images.csv שנוצר.

דוגמאות שימוש:
  python car_images_builder.py --csv data/car_prices_il_2025.csv --out-dir public/auto_galleries --mode placeholder --per-model 2
  python car_images_builder.py --csv data/car_prices_il_2025.csv --out-dir public/auto_galleries --mode wikipedia --per-model 1

תלויות:
  pip install -r requirements.txt
"""
import os
import re
import csv
import sys
import time
import json
import math
import argparse
from pathlib import Path
from typing import Dict, Any, List, Optional
from collections import defaultdict

# מצב placeholder לא דורש כלום; מצב wikipedia דורש requests
try:
    import requests  # noqa
except Exception:
    requests = None

try:
    from PIL import Image, ImageDraw, ImageFont
except Exception:
    Image = None

WIKI_API = "https://en.wikipedia.org/w/api.php"
UA = {"User-Agent": "car-images-builder/1.0 (+local script)"}

def read_csv_rows(csv_path: Path) -> List[Dict[str, Any]]:
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        return list(reader)

def slugify(s: str) -> str:
    s = re.sub(r"\s+", "_", s.strip())
    s = re.sub(r"[^0-9A-Za-z_\-]", "", s)
    return s or "x"

def ensure_dir(p: Path) -> None:
    p.mkdir(parents=True, exist_ok=True)

def select_models(rows: List[Dict[str, Any]], max_per_make: Optional[int] = None) -> Dict[str, List[Dict[str, Any]]]:
    """Organize by make -> list(rows) and optionally cap per make by model unique combos."""
    by = defaultdict(list)
    seen_pair = set()
    for r in rows:
        make = (r.get("make") or "").strip()
        model = (r.get("model") or "").strip()
        if not make or not model:
            continue
        key = (make, model)
        if key in seen_pair:
            continue
        seen_pair.add(key)
        by[make].append(r)
    if max_per_make:
        for m in list(by.keys()):
            by[m] = by[m][:max_per_make]
    return dict(by)

def _color_for_text(text: str):
    import hashlib
    h = hashlib.md5(text.encode("utf-8")).hexdigest()
    r = int(h[0:2], 16)
    g = int(h[2:4], 16)
    b = int(h[4:6], 16)
    return (128 + r//2, 128 + g//2, 128 + b//2)

def gen_placeholder_image(text: str, size=(960, 640)) -> "Image.Image":
    if Image is None:
        raise RuntimeError("Pillow (PIL) not installed. Run: pip install Pillow")
    W, H = size
    img = Image.new("RGB", size, _color_for_text(text))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("arial.ttf", 48)
    except Exception:
        font = ImageFont.load_default()
    # simple wrap
    lines = []
    line = ""
    for word in text.split():
        test = (line + " " + word).strip()
        if len(test) > 20:
            lines.append(line)
            line = word
        else:
            line = test
    if line:
        lines.append(line)
    y = H // 2 - (len(lines) * 28)
    for line in lines:
        w, h = draw.textsize(line, font=font)
        draw.rectangle([(W//2 - w//2 - 10, y - 6), (W//2 + w//2 + 10, y + h + 6)], fill=(0,0,0,90))
        draw.text((W//2 - w//2, y), line, fill=(255, 255, 255), font=font)
        y += h + 16
    return img

def run_placeholder(by_make, out_dir: Path, per_model: int = 2, delay: float = 0.0):
    results = []
    for make, entries in by_make.items():
        for r in entries:
            model = r["model"]
            year = r.get("year", 2025)
            for i in range(1, per_model + 1):
                rel = Path(slugify(make)) / slugify(model) / f"ph_{i:02d}.png"
                abs_path = out_dir / rel
                ensure_dir(abs_path.parent)
                text = f"{make} {model} {year}"
                img = gen_placeholder_image(text)
                img.save(abs_path, "PNG")
                results.append({
                    "make": make, "model": model, "year": year,
                    "source": "placeholder", "license": "N/A",
                    "url": "", "local_path": str(rel).replace("\\", "/"),
                    "artist": "", "credit": "", "file_title": ""
                })
            if delay: import time; time.sleep(delay)
    return results

def wiki_search_first_title(query: str):
    if requests is None:
        raise RuntimeError("requests not installed. Run: pip install requests")
    params = {"action":"query","list":"search","srsearch":query,"format":"json","srlimit":5,"srprop":""}
    r = requests.get(WIKI_API, params=params, headers={"User-Agent":"car-images-builder"}, timeout=20)
    r.raise_for_status()
    data = r.json()
    items = data.get("query", {}).get("search", [])
    if not items: return None
    return items[0].get("title")

def wiki_page_main_image(title: str):
    params = {"action":"query","prop":"pageimages","piprop":"original","titles":title,"format":"json","redirects":1}
    r = requests.get(WIKI_API, params=params, headers=UA, timeout=20)
    r.raise_for_status()
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    for _, p in pages.items():
        if "original" in p:
            return {"title": p.get("title"), "image_url": p["original"]["source"], "file_title": p.get("pageimage")}
    params = {"action":"query","prop":"pageimages","pithumbsize":1200,"titles":title,"format":"json","redirects":1}
    r = requests.get(WIKI_API, params=params, headers=UA, timeout=20)
    r.raise_for_status()
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    for _, p in pages.items():
        if "thumbnail" in p:
            return {"title": p.get("title"), "image_url": p["thumbnail"]["source"], "file_title": p.get("pageimage")}
    return {}

def wiki_image_license(file_title: str):
    if not file_title: return {}
    t = "File:" + file_title if not file_title.startswith("File:") else file_title
    params = {"action":"query","titles":t,"prop":"imageinfo","iiprop":"url|extmetadata","format":"json"}
    r = requests.get(WIKI_API, params=params, headers=UA, timeout=20)
    r.raise_for_status()
    data = r.json()
    pages = data.get("query", {}).get("pages", {})
    for _, p in pages.items():
        iis = p.get("imageinfo", [])
        if not iis: continue
        info = iis[0]
        ext = info.get("extmetadata", {})
        return {
            "license": ext.get("LicenseShortName", {}).get("value", "") or ext.get("License", {}).get("value", ""),
            "artist": ext.get("Artist", {}).get("value", ""),
            "credit": ext.get("Credit", {}).get("value", ""),
            "image_url": info.get("url", ""),
            "file_title": t
        }
    return {}

def download_binary(url: str, dest: Path):
    r = requests.get(url, headers=UA, stream=True, timeout=30)
    r.raise_for_status()
    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            if chunk: f.write(chunk)
    return True

def run_wikipedia(by_make, out_dir: Path, per_model: int = 1, delay: float = 0.2):
    results = []
    import time
    for make, entries in by_make.items():
        for r in entries:
            model = r["model"]
            year = r.get("year", 2025)
            candidates = [f"{make} {model} (car)", f"{make} {model}", f"{make} {model} car"]
            title = None
            for q in candidates:
                title = wiki_search_first_title(q)
                if title: break
            if not title:
                print(f"[WARN] no Wikipedia result for: {make} {model}", file=sys.stderr)
                continue
            info = wiki_page_main_image(title) or {}
            if not info.get("image_url"):
                print(f"[WARN] no main image for page: {title}", file=sys.stderr)
                continue
            lic = wiki_image_license(info.get("file_title") or "")
            img_url = lic.get("image_url") or info["image_url"]
            ext = ".jpg" if ".png" not in img_url.lower() else ".png"
            rel = Path(slugify(make)) / slugify(model) / f"wiki_01{ext}"
            abs_path = out_dir / rel
            try:
                download_binary(img_url, abs_path)
                results.append({
                    "make": make, "model": model, "year": year,
                    "source": f"Wikipedia:{title}", "license": lic.get("license",""),
                    "url": img_url, "local_path": str(rel).replace("\\","/"),
                    "artist": lic.get("artist",""), "credit": lic.get("credit",""),
                    "file_title": lic.get("file_title", info.get("file_title",""))
                })
            except Exception as e:
                print(f"[WARN] download failed: {img_url} -> {e}", file=sys.stderr)
            time.sleep(delay)
    return results

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True, help="נתיב ל-CSV של הרכבים (למשל data/car_prices_il_2025.csv)")
    ap.add_argument("--out-dir", default="public/auto_galleries", help="תיקייה ליצוא התמונות")
    ap.add_argument("--mode", choices=["placeholder", "wikipedia", "both"], default="placeholder", help="אופן יצירת התמונות")
    ap.add_argument("--per-model", type=int, default=1, help="כמה תמונות לכל דגם (placeholder בלבד)")
    ap.add_argument("--max-per-make", type=int, default=None, help="מספר דגמים מקס׳ לכל יצרן (כדי להגביל נפח)")
    ap.add_argument("--delay", type=float, default=0.2, help="השהייה בין בקשות (ויקיפדיה)")
    args = ap.parse_args()

    csv_path = Path(args.csv)
    out_dir = Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    rows = read_csv_rows(csv_path)
    by_make = select_models(rows, max_per_make=args.max_per_make)

    map_path = out_dir / "images.csv"
    with open(map_path, "w", newline="", encoding="utf-8") as fcsv:
        writer = csv.DictWriter(fcsv, fieldnames=["make","model","year","source","license","url","local_path","artist","credit","file_title"])
        writer.writeheader()

        total = 0
        if args.mode in ("placeholder","both"):
            ph = run_placeholder(by_make, out_dir, per_model=args.per_model, delay=0.0)
            for row in ph: writer.writerow(row)
            total += len(ph)
            print(f"[INFO] placeholder: wrote {len(ph)} images")

        if args.mode in ("wikipedia","both"):
            if requests is None:
                print("[ERROR] מצב wikipedia דורש: pip install requests", file=sys.stderr); sys.exit(2)
            wk = run_wikipedia(by_make, out_dir, per_model=1, delay=args.delay)
            for row in wk: writer.writerow(row)
            total += len(wk)
            print(f"[INFO] wikipedia: wrote {len(wk)} images")

    print(f"[DONE] Saved images & mapping at: {out_dir} (total rows: {total})")
    print(f"[INFO] images.csv: {map_path}")

if __name__ == "__main__":
    main()
