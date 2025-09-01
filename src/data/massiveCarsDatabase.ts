// Placeholder file - replaced by Supabase data
// This file exists only to prevent compilation errors during refactoring

export interface ExtendedCarDetails {
  id: string;
  brand: string;
  name: string;
  model: string;
  year: number;
  price: string;
  type: string;
  image: string;
  rating: number;
  isElectric: boolean;
  specs: {
    power: number;
    torque: string;
    acceleration: string;
    topSpeed: string;
    engine: string;
    transmission: string;
    drivetrain: string;
    fuel: string;
    weight: string;
    capacity: string;
  };
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  founded: number;
  description: string;
}

// Empty arrays - data now comes from Supabase
export const massiveCarsDatabase: ExtendedCarDetails[] = [];
export const expandedBrands: Brand[] = [];
