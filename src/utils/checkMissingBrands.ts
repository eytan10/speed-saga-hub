import { expandedBrands } from "@/data/expandedCarsDatabase";
import { massiveCarsDatabase } from "@/data/massiveCarsDatabase";

export function checkMissingBrands() {
  // רשימת כל ה-IDs של החברות
  const allBrandIds = expandedBrands.map(brand => brand.id);
  
  // רשימת החברות שיש להן דגמים
  const brandsWithCars = new Set(
    massiveCarsDatabase.map(car => 
      car.brand.toLowerCase().replace(/[^a-z]/g, '')
    )
  );
  
  // חברות שחסרות דגמים
  const missingBrands = allBrandIds.filter(brandId => {
    const normalizedBrandId = brandId.toLowerCase().replace(/[^a-z]/g, '');
    return !brandsWithCars.has(normalizedBrandId);
  });
  
  console.log(`נמצאו ${allBrandIds.length} חברות סה"כ`);
  console.log(`יש דגמים עבור ${brandsWithCars.size} חברות`);
  console.log(`חסרות דגמים עבור ${missingBrands.length} חברות:`);
  
  missingBrands.forEach(brand => {
    const brandInfo = expandedBrands.find(b => b.id === brand);
    console.log(`❌ ${brand} (${brandInfo?.name})`);
  });
  
  return {
    totalBrands: allBrandIds.length,
    brandsWithCars: brandsWithCars.size,
    missingBrands,
    brandsWithCarsArray: Array.from(brandsWithCars)
  };
}

// הפעל את הבדיקה אם הקובץ רץ ישירות
if (typeof window === 'undefined') {
  checkMissingBrands();
}