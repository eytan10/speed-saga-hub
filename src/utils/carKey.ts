/**
 * Utility for generating consistent car_key for reviews and favorites
 * Uses car.id if available, otherwise creates slug from brand-model-year
 */

export interface CarKeyInput {
  id?: string;
  brand: string;
  name: string;
  year: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

export function getCarKey(car: CarKeyInput): string {
  // If car has an id, use it directly
  if (car.id && typeof car.id === 'string') {
    return car.id;
  }
  
  // Otherwise, create deterministic key from brand-model-year
  return slugify(`${car.brand}-${car.name}-${car.year}`);
}

export function getCarKeyFromRoute(params: { brand?: string; model?: string; year?: string }): string | null {
  if (!params.brand || !params.model || !params.year) {
    return null;
  }
  
  return slugify(`${params.brand}-${params.model}-${params.year}`);
}
