// Script disabled - static data replaced with Supabase
// This script has been disabled as part of refactoring to use Supabase as single source of truth
/*
// Script to check which brands have logos but no car models
import { massiveCarsDatabase } from '../data/massiveCarsDatabase.js';

// Brands that should have logos based on the assets/logos folder
const logosBrands = [
  'ferrari', 'tesla', 'bmw', 'mercedes-benz', 'audi', 'porsche', 'toyota', 
  'honda', 'lamborghini', 'ford', 'nissan', 'jaguar', 'volkswagen', 'kia', 
  'mazda', 'mclaren', 'hyundai', 'subaru'
];

// Get unique brands from the database
const databaseBrands = [...new Set(massiveCarsDatabase.map(car => car.brand.toLowerCase().replace('-', '')))];

console.log('Brands with logos:', logosBrands);
console.log('Brands in database:', databaseBrands);

// Find brands with logos but no models
const missingBrands = logosBrands.filter(brand => {
  const normalizedBrand = brand.replace('-', '');
  return !databaseBrands.some(dbBrand => 
    dbBrand.includes(normalizedBrand) || normalizedBrand.includes(dbBrand)
  );
});

console.log('Brands missing models:', missingBrands);

// Count models per brand
const brandCounts = {};
massiveCarsDatabase.forEach(car => {
  const brand = car.brand;
  brandCounts[brand] = (brandCounts[brand] || 0) + 1;
});

console.log('Models per brand:', brandCounts);
*/