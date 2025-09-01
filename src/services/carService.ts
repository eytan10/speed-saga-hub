import { supabase } from '@/integrations/supabase/client';

// Type for the raw database row
type DatabaseRow = {
  [key: string]: any;
};

export interface CarData {
  id: string;
  brand: string;
  model: string;
  year: number;
  price_ils: number;
  price_usd: number;
  type: string;
  image_url: string;
  specs: {
    horsepower: number;
    torque: number;
    acceleration: string;
    topSpeed: string;
    engine: string;
    fuelType: string;
    seats: number;
    capacity: string;
  };
}

export interface CarFilters {
  brand?: string;
  type?: string;
  minYear?: number;
  maxYear?: number;
  search?: string;
}

export interface CarSearchResult {
  data: CarData[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Default placeholder image
const DEFAULT_CAR_IMAGE = '/placeholder.svg';

// Helper function to convert database row to CarData
function mapDatabaseRowToCar(row: any, index: number): CarData {
  const brand = row['Company Names'] || 'Unknown';
  const model = row['Cars Names'] || 'Unknown Model';
  
  return {
    id: `${brand.toLowerCase().replace(/\s+/g, '-')}-${model.toLowerCase().replace(/\s+/g, '-')}-${index}`,
    brand,
    model,
    year: 2024, // Default year since not in DB
    price_ils: Math.round((row['Price (USD)'] || 0) * 3.7), // Convert USD to ILS
    price_usd: row['Price (USD)'] || 0,
    type: row['Car Type'] || 'Unknown',
    image_url: DEFAULT_CAR_IMAGE, // Always use placeholder
    specs: {
      horsepower: row['HorsePower (hp)'] || 0,
      torque: row['Torque (Nm)'] || 0,
      acceleration: row['Performance(0 - 100 )KM/H'] || 'N/A',
      topSpeed: row['Total Speed'] || 'N/A',
      engine: row['Engines'] || 'N/A',
      fuelType: row['Fuel Types'] || 'N/A',
      seats: row['Seats (int)'] || 0,
      capacity: row['CC/Battery Capacity'] || 'N/A'
    }
  };
}

// Get all cars with filters and pagination
export async function getCars(
  filters: CarFilters = {},
  page: number = 1,
  pageSize: number = 12
): Promise<CarSearchResult> {
  try {
    let query = (supabase as any).from('cars_data').select('*', { count: 'exact' });

    // Apply filters
    if (filters.brand) {
      query = query.ilike('Company Names', `%${filters.brand}%`);
    }

    if (filters.type) {
      query = query.ilike('Car Type', `%${filters.type}%`);
    }

    if (filters.search) {
      query = query.or(`Company Names.ilike.%${filters.search}%,Cars Names.ilike.%${filters.search}%`);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }

    const cars = (data || []).map((row, index) => mapDatabaseRowToCar(row, from + index));
    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: cars,
      total,
      page,
      pageSize,
      totalPages
    };
  } catch (error) {
    console.error('Error in getCars:', error);
    throw error;
  }
}

// Get car by ID
export async function getCarById(id: string): Promise<CarData | null> {
  try {
    // Extract brand and model from ID format: brand-model-index
    const parts = id.split('-');
    if (parts.length < 2) return null;

    const brand = parts[0].replace(/-/g, ' ');
    const model = parts.slice(1, -1).join(' '); // Get model part excluding index

    const { data, error } = await (supabase as any)
      .from('cars_data')
      .select('*')
      .ilike('Company Names', `%${brand}%`)
      .ilike('Cars Names', `%${model}%`)
      .limit(1);

    if (error) {
      console.error('Error fetching car by ID:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return mapDatabaseRowToCar(data[0], 0);
  } catch (error) {
    console.error('Error in getCarById:', error);
    return null;
  }
}

// Get unique brands
export async function getBrands(): Promise<string[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('cars_data')
      .select('Company Names')
      .not('Company Names', 'is', null);

    if (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }

    const brands = [...new Set((data || []).map(row => row['Company Names']))];
    return brands.filter(Boolean).sort();
  } catch (error) {
    console.error('Error in getBrands:', error);
    return [];
  }
}

// Get unique car types/categories
export async function getCarTypes(): Promise<string[]> {
  try {
    const { data, error } = await (supabase as any)
      .from('cars_data')
      .select('Car Type')
      .not('Car Type', 'is', null);

    if (error) {
      console.error('Error fetching car types:', error);
      throw error;
    }

    const types = [...new Set((data || []).map(row => row['Car Type']))];
    return types.filter(Boolean).sort();
  } catch (error) {
    console.error('Error in getCarTypes:', error);
    return [];
  }
}

// Get cars by brand
export async function getCarsByBrand(brand: string, page: number = 1, pageSize: number = 12): Promise<CarSearchResult> {
  return getCars({ brand }, page, pageSize);
}

// Get cars by type/category
export async function getCarsByType(type: string, page: number = 1, pageSize: number = 12): Promise<CarSearchResult> {
  return getCars({ type }, page, pageSize);
}