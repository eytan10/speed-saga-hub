#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
real_images_replacer.py
-----------------------
משתמש ב-Wikipedia/Wikimedia כדי להביא תמונות אמיתיות לכל make/model משנת 2025,
ומחליף את קבצי ה-placeholder הקיימים `ph_01.png` בתיקייה שלך.
בנוסף, כותב/מעדכן קובץ `images.csv` עם פרטי רישיון/קרדיט/קישור למקור.

שימוש:
  python real_images_replacer.py --csv data/car_prices_il_2025.csv --root public/auto_galleries --max-per-make 5 --delay 0.2

דגלים חשובים:
  --only-missing         רק למלא דגמים שאין להם קובץ אמיתי (משאיר placeholders אם קיימים).
  --dry-run              לא כותב קבצים, רק מציג מה היה משתנה.
  --max-per-make N       מגביל כמה דגמים לכל יצרן (להימנע מעומס).
  --delay SECONDS        השהייה בין בקשות API לוויקיפדיה (ברירת מחדל 0.2ש').
  --lang en|he|multi     באיזה שפה לחפש. 'multi' ינסה אנגלית ואז עברית.

תלויות:
  pip install -r requirements.txt
"""
import os
import csv
import re
import sys
import time
import argparse
from pathlib import Path
from typing import Dict, Any, List, Optional
from collections import defaultdict

import requests
from PIL import Image
from io import BytesIO

UA = {"User-Agent": "real-images-replacer/1.0 (+local script)"}
WIKI_API = "https://{lang}.wikipedia.org/w/api.php"

TRUCKY_MODELS = {"L200","Hilux","Ranger","Navara","D-Max","Silverado","F-150","Amarok"}

def read_csv_rows(csv_path: Path) -> List[Dict[str, Any]]:
    with open(csv_path, "r", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))

def slugify(s: str) -> str:
    s = re.sub(r"\s+", "_", (s or "").strip())
    s = re.sub(r"[^0-9A-Za-z_\-]", "", s)
    return s or "x"

def unique_models_2025(rows: List[Dict[str, Any]]) -> Dict[str, List[str]]:
    by = defaultdict(list)
    seen = set()
    for r in rows:
        if str(r.get("year","")).strip() != "2025":
            continue
        make = (r.get("make") or "").strip()
        model = (r.get("model") or "").strip()
        if not make or not model:
            continue
        if model in TRUCKY_MODELS:
            continue
        key = (make, model)
        if key in seen:
            continue
        seen.add(key)
        by[make].append(model)
    return dict(by)

def wiki_search_first_title(make: str, model: str, lang: str) -> Optional[str]:
    api = WIKI_API.format(lang=lang)
    for q in [f"{make} {model} (car)", f"{make} {model}", f"{make} {model} car"]:
        r = requests.get(api, params={
            "action":"query", "list":"search", "srsearch": q, "format":"json", "srlimit":5, "srprop":""
        }, headers=UA, timeout=20)
        r.raise_for_status()
        items = (r.json().get("query") or {}).get("search", [])
        if items:
            return items[0].get("title")
    return None

def wiki_page_main_image(title: str, lang: str) -> Dict[str, str]:
    api = WIKI_API.format(lang=lang)
    # Try original
    r = requests.get(api, params={
        "action":"query", "prop":"pageimages", "piprop":"original", "titles":title, "format":"json", "redirects":1
    }, headers=UA, timeout=20)
    r.raise_for_status()
    pages = (r.json().get("query") or {}).get("pages", {})
    for _, p in pages.items():
        if "original" in p:
            return {"title": p.get("title",""), "image_url": p["original"]["source"], "file_title": p.get("pageimage","")}
    # Fallback thumbnail
    r = requests.get(api, params={
        "action":"query", "prop":"pageimages", "pithumbsize":1200, "titles":title, "format":"json", "redirects":1
    }, headers=UA, timeout=20)
    r.raise_for_status()
    pages = (r.json().get("query") or {}).get("pages", {})
    for _, p in pages.items():
        if "thumbnail" in p:
            return {"title": p.get("title",""), "image_url": p["thumbnail"]["source"], "file_title": p.get("pageimage","")}
    return {}

def wiki_image_license(file_title: str, lang: str) -> Dict[str, str]:
    # license metadata generally lives on Commons; API language less critical here
    if not file_title:
        return {}
    api = WIKI_API.format(lang=lang)
    t = "File:" + file_title if not file_title.startswith("File:") else file_title
    r = requests.get(api, params={
        "action":"query", "titles": t, "prop":"imageinfo", "iiprop":"url|extmetadata", "format":"json"
    }, headers=UA, timeout=20)
    r.raise_for_status()
    pages = (r.json().get("query") or {}).get("pages", {})
    for _, p in pages.items():
        info = (p.get("imageinfo") or [{}])[0]
        ext = info.get("extmetadata", {})
        return {
            "license": (ext.get("LicenseShortName", {}) or {}).get("value","") or (ext.get("License", {}) or {}).get("value",""),
            "artist": (ext.get("Artist", {}) or {}).get("value",""),
            "credit": (ext.get("Credit", {}) or {}).get("value",""),
            "image_url": info.get("url",""),
            "file_title": t
        }
    return {}

def download_to_png(url: str) -> Image.Image:
    r = requests.get(url, headers=UA, timeout=30)
    r.raise_for_status()
    return Image.open(BytesIO(r.content)).convert("RGB")

def replace_image(make: str, model: str, root: Path, img: Image.Image, dry: bool=False) -> str:
    rel = Path(slugify(make)) / slugify(model) / "ph_01.png"  # overwrite placeholder path
    abs_path = root / rel
    if not dry:
        abs_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(abs_path, "PNG")  # normalize to PNG
    return str(rel).replace("\\","/")

def process_one(make: str, model: str, root: Path, only_missing: bool, lang: str, delay: float, dry: bool=False) -> Dict[str,str]:
    target = root / Path(slugify(make)) / slugify(model) / "ph_01.png"
    if only_missing and target.exists():
        # Already has some image at target; skip
        return {}
    # Try language(s)
    langs = [lang] if lang in ("en","he") else ["en","he"]
    info = {}
    for L in langs:
        title = wiki_search_first_title(make, model, L)
        if not title:
            continue
        page = wiki_page_main_image(title, L) or {}
        if not page.get("image_url"):
            continue
        lic = wiki_image_license(page.get("file_title",""), L) or {}
        img_url = lic.get("image_url") or page["image_url"]
        try:
            pil = download_to_png(img_url)
        except Exception as e:
            print(f"[WARN] download failed: {make} {model} -> {e}", file=sys.stderr)
            continue
        local_path = replace_image(make, model, root, pil, dry=dry)
        info = {
            "make": make, "model": model, "year": "2025",
            "source": f"Wikipedia:{page.get('title','')}", "license": lic.get("license",""),
            "url": img_url, "local_path": local_path, "artist": lic.get("artist",""), "credit": lic.get("credit",""),
            "file_title": lic.get("file_title","")
        }
        break
    time.sleep(delay)
    return info

def write_images_csv(root: Path, rows: List[Dict[str,str]], dry: bool=False):
    path = root / "images.csv"
    if dry:
        print(f"[DRY] would write {len(rows)} rows to {path}")
        return
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["make","model","year","source","license","url","local_path","artist","credit","file_title"])
        w.writeheader()
        for r in rows:
            w.writerow(r)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", required=True, help="נתיב ל-CSV (data/car_prices_il_2025.csv)")
    ap.add_argument("--root", required=True, help="שורש תיקיית התמונות (למשל public/auto_galleries)")
    ap.add_argument("--only-missing", action="store_true", help="ממלא רק דגמים שחסרים (אם יש ph_01.png לא מחליף)")
    ap.add_argument("--dry-run", action="store_true", help="לא כותב קבצים, רק מדפיס מה היה משתנה")
    ap.add_argument("--max-per-make", type=int, default=None, help="כמה דגמים לכל יצרן (לצורך הגבלת נפח)")
    ap.add_argument("--delay", type=float, default=0.2, help="השהייה בין קריאות API")
    ap.add_argument("--lang", choices=["en","he","multi"], default="multi", help="שפת חיפוש ויקיפדיה")
    args = ap.parse_args()

    csv_path = Path(args.csv)
    root = Path(args.root)

    rows = read_csv_rows(csv_path)
    by = unique_models_2025(rows)
    # apply max-per-make
    if args.max_per_make:
        for m in list(by.keys()):
            by[m] = by[m][:args.max_per_make]

    results = []
    for make, models in by.items():
        for model in models:
            info = process_one(make, model, root, args.only_missing, args.lang, args.delay, dry=args.dry_run)
            if info:
                results.append(info)

    # keep placeholders for models we didn't fetch? Optionally, merge from existing images.csv if exists.
    # For simplicity: write only fetched rows (real images). If you want to include placeholders too,
    # re-run in `--only-missing`=False and the script will overwrite them to real images.

    write_images_csv(root, results, dry=args.dry_run)
    print(f"[DONE] fetched {len(results)} real images. images.csv written at {root / 'images.csv'}")

if __name__ == "__main__":
    main()
