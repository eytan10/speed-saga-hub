export interface IcarVehicle {
  id: number;
  manufacturer: string;
  model: string;
  price: number;
}

const ICAR_PRICE_API = "https://www.icar.co.il/odata/PriceList";

export async function fetchIcarPriceList(): Promise<IcarVehicle[]> {
  const response = await fetch(ICAR_PRICE_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch price list: ${response.status}`);
  }
  const data = (await response.json()) as { value?: Record<string, unknown>[] };
  return (data.value ?? []).map((item) => ({
    id: Number(item["Id"] ?? 0),
    manufacturer: String(item["Manufacturer"] ?? ""),
    model: String(item["Model"] ?? ""),
    price: Number(item["Price"] ?? 0),
  }));
}
