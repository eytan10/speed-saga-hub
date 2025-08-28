import carPricesData from "../../cursor_car_prices_il_2025/data/car_prices_il_2025.json";
import toyotaCorolla from "@/assets/toyota-corolla.jpg";
import hondaCivic from "@/assets/honda-civic-blue.jpg";
import fordFiesta from "@/assets/ford-fiesta.jpg";

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

const imageMap: Record<string, string> = {
  "Toyota Corolla": toyotaCorolla,
  "Honda Civic": hondaCivic,
  "Ford Fiesta": fordFiesta,
};

export const getCarImage = (make: string, model: string) => imageMap[`${make} ${model}`];
