#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import pandas as pd

def load(csv_path="../data/car_prices_il_2025.csv"):
    return pd.read_csv(csv_path, encoding="utf-8-sig")

def filter_2025(df, body_type=None, fuel_type=None, price_min=None, price_max=None, make=None, model=None):
    q = df[df["year"] == 2025].copy()
    if body_type:
        q = q[q["body_type"] == body_type]
    if fuel_type:
        q = q[q["fuel_type"] == fuel_type]
    if price_min is not None:
        q = q[q["price_ils"] >= price_min]
    if price_max is not None:
        q = q[q["price_ils"] <= price_max]
    if make:
        q = q[q["make"].str.contains(make, case=False, na=False)]
    if model:
        q = q[q["model"].str.contains(model, case=False, na=False)]
    return q.sort_values(["price_ils","make","model"]).reset_index(drop=True)

if __name__ == "__main__":
    df = load()
    demo = filter_2025(df, body_type="SUV", fuel_type="היברידי", price_min=160000, price_max=250000)
    print(demo.head(20).to_string(index=False))
