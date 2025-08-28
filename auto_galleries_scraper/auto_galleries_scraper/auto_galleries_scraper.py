#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
auto_galleries_scraper.py
Downloads images from https://www.auto.co.il/galleries and related gallery pages into a local folder.
Also writes a CSV mapping file of gallery_url, image_url, and local_path.

Usage (examples):
  python auto_galleries_scraper.py --out-dir data/auto_galleries --max-galleries 50
  python auto_galleries_scraper.py --seed https://www.auto.co.il/archivegalleries --out-dir data/auto_galleries

Notes:
- This script uses simple HTTP requests and HTML parsing. The site may load content via JavaScript,
  so we also search for gallery links & image URLs via regex fallbacks.
- Please respect the website's Terms of Use and copyright. Use the images only for personal/testing
  purposes unless you have permission.
"""
import os
import re
import csv
import sys
import time
import argparse
import pathlib
from urllib.parse import urljoin, urlparse
from typing import Iterable, List, Set, Tuple

import requests
from bs4 import BeautifulSoup

DEFAULT_SEEDS = [
    "https://www.auto.co.il/galleries",
    "https://www.auto.co.il/Galleries",
    "https://www.auto.co.il/archivegalleries",
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
}

IMG_EXTS = (".jpg", ".jpeg", ".png", ".webp", ".gif")
TIMEOUT = 20


def fetch(url: str) -> str:
    try:
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"[WARN] fetch failed: {url} -> {e}", file=sys.stderr)
        return ""


def absolutize(base: str, href: str) -> str:
    if not href:
        return ""
    # handle srcset "url size, url size"
    href = href.strip()
    if " " in href and "," not in href and href.split(" ", 1)[0].startswith("http"):
        href = href.split(" ", 1)[0]
    return urljoin(base, href)


def unique(seq: Iterable[str]) -> List[str]:
    seen = set()
    out = []
    for x in seq:
        if x and x not in seen:
            seen.add(x)
            out.append(x)
    return out


def extract_gallery_links(html: str, base_url: str) -> List[str]:
    links = []
    soup = BeautifulSoup(html, "lxml")
    # a) standard <a href>
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if "/gallery/" in href or "/Gallery/" in href:
            links.append(absolutize(base_url, href))
    # b) regex fallback
    for m in re.finditer(r'href=["\']([^"\']+/gallery/[^"\']+)["\']', html, re.I):
        links.append(absolutize(base_url, m.group(1)))
    for m in re.finditer(r'https?://www\.auto\.co\.il/(?:gallery|Gallery)/[^\s"\'<>]+', html):
        links.append(m.group(0))
    return unique(links)


def extract_image_urls(html: str, base_url: str) -> List[str]:
    urls = []
    soup = BeautifulSoup(html, "lxml")

    # a) <img> tags: src, data-src, data-original, srcset
    for img in soup.find_all("img"):
        for attr in ("src", "data-src", "data-original"):
            u = img.get(attr)
            if u:
                urls.append(absolutize(base_url, u))
        srcset = img.get("srcset")
        if srcset:
            # take each URL (before space size)
            parts = [p.strip().split(" ")[0] for p in srcset.split(",")]
            for p in parts:
                urls.append(absolutize(base_url, p))

    # b) Inline styles: background-image:url(...)
    for tag in soup.find_all(style=True):
        style = tag["style"]
        for m in re.finditer(r'url\(([^)]+)\)', style):
            u = m.group(1).strip('\'"')
            urls.append(absolutize(base_url, u))

    # c) regex fallback for common image extensions
    for m in re.finditer(r'https?://[^"\')\s]+?\.(?:jpg|jpeg|png|webp|gif)(?:\?[^"\')\s]*)?', html, re.I):
        urls.append(m.group(0))

    # filter to auto.co.il domain and image extensions
    final = []
    for u in unique(urls):
        parsed = urlparse(u)
        if not parsed.scheme.startswith("http"):
            continue
        if "auto.co.il" not in parsed.netloc:
            # include external too? keep them but you can toggle this
            pass
        if any(parsed.path.lower().endswith(ext) for ext in IMG_EXTS):
            final.append(u)
    return unique(final)


def slugify(text: str) -> str:
    text = re.sub(r"[^0-9a-zA-Z\-_.]+", "_", text).strip("_")
    return text[:80] if text else "gallery"


def download(url: str, dest_path: pathlib.Path) -> bool:
    try:
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        with requests.get(url, headers=HEADERS, stream=True, timeout=TIMEOUT) as r:
            r.raise_for_status()
            with open(dest_path, "wb") as f:
                for chunk in r.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
        return True
    except Exception as e:
        print(f"[WARN] download failed: {url} -> {e}", file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--seed", action="append", help="Seed URL(s) to discover gallery links")
    parser.add_argument("--out-dir", default="data/auto_galleries", help="Output directory for images")
    parser.add_argument("--max-galleries", type=int, default=30, help="Max number of gallery pages to crawl")
    parser.add_argument("--max-images-per-gallery", type=int, default=200, help="Limit images per gallery (0 = no limit)")
    parser.add_argument("--delay", type=float, default=0.2, help="Delay between requests (seconds)")
    args = parser.parse_args()

    seeds = args.seed if args.seed else DEFAULT_SEEDS
    out_dir = pathlib.Path(args.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    csv_path = out_dir / "images.csv"

    # 1) Discover gallery links from seeds
    gallery_links: List[str] = []
    for s in seeds:
        html = fetch(s)
        gallery_links.extend(extract_gallery_links(html, s))
        time.sleep(args.delay)
    # keep unique and trim
    gallery_links = unique(gallery_links)[: args.max-galleries if args.max_galleries > 0 else None]

    if not gallery_links:
        print("[WARN] No gallery links found. Try different seeds or increase --max-galleries.")
        return

    print(f"[INFO] Discovered {len(gallery_links)} gallery pages")

    # 2) Open CSV
    with open(csv_path, "w", newline="", encoding="utf-8") as fcsv:
        writer = csv.writer(fcsv)
        writer.writerow(["gallery_url", "image_url", "local_path"])

        # 3) Crawl each gallery and download images
        for idx, g_url in enumerate(gallery_links, 1):
            print(f"[INFO] ({idx}/{len(gallery_links)}) {g_url}")
            html = fetch(g_url)
            if not html:
                continue

            # derive a folder name from gallery URL
            gid = g_url.rstrip("/").split("/")[-1]
            gid = slugify(gid) or f"gallery_{idx:03d}"
            g_folder = out_dir / gid

            img_urls = extract_image_urls(html, g_url)
            if args.max_images_per_gallery > 0:
                img_urls = img_urls[: args.max_images_per_gallery]

            print(f"[INFO]   Found {len(img_urls)} images")
            for j, img_url in enumerate(img_urls, 1):
                ext = os.path.splitext(urlparse(img_url).path)[1]
                if not ext or len(ext) > 6:
                    ext = ".jpg"
                fname = f"img_{j:04d}{ext}"
                dest = g_folder / fname
                ok = download(img_url, dest)
                if ok:
                    writer.writerow([g_url, img_url, str(dest.relative_to(out_dir))])
                time.sleep(args.delay)

    print(f"[DONE] Images and CSV saved under: {out_dir}")
    print(f"[INFO] CSV mapping: {csv_path}")


if __name__ == "__main__":
    main()
