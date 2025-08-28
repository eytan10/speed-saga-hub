import carPricesData from "../../cursor_car_prices_il_2025/data/car_prices_il_2025.json";
 codex/add-price-folders-and-images-to-site-lyw6et

const images = import.meta.glob("@/assets/*.{png,jpg,jpeg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
=======
import toyotaCorolla from "@/assets/toyota-corolla.jpg";
import hondaCivic from "@/assets/honda-civic-blue.jpg";
import fordFiesta from "@/assets/ford-fiesta.jpg";
 main

export interface CarPrice {
  make: string;
  model: string;
  year: number;
  trim: string;
  body_type: string;
  fuel_type: string;
  transmission: string;
  doors: number;
  seats: number;
  price_ils: number;
  currency: string;
  price_source: string;
  last_updated: string;
  notes: string;
}

export const carPrices2025 = carPricesData as CarPrice[];

 codex/add-price-folders-and-images-to-site-lyw6et
const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/-(\d)/g, "$1")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export const normalizeKey = (make: string, model: string) =>
  `${normalize(make)} ${normalize(model)}`;

const imageFor = (make: string, model: string) => {
  const base = `${normalize(make)}-${normalize(model)}`;
  const match = Object.entries(images).find(([path]) =>
    path.includes(`/src/assets/${base}`)
  );
  return match ? match[1] : undefined;
};

const carPriceMap: Record<string, CarPrice[]> = carPrices2025.reduce(
  (acc, car) => {
    const key = normalizeKey(car.make, car.model);
    (acc[key] ||= []).push(car);
    return acc;
  },
  {} as Record<string, CarPrice[]>
);

export const getCarImage = (make: string, model: string) => imageFor(make, model);
export const getCarPrice = (make: string, model: string) => {
  const list = carPriceMap[normalizeKey(make, model)];
  if (!list) return undefined;
  const avg = list.reduce((sum, c) => sum + c.price_ils, 0) / list.length;
  return Math.round(avg);
};
=======
const imageMap: Record<string, string> = {
  "Toyota Corolla": toyotaCorolla,
  "Honda Civic": hondaCivic,
  "Ford Fiesta": fordFiesta,
};

export const getCarImage = (make: string, model: string) => imageMap[`${make} ${model}`];
 main
