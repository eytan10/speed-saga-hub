// מסד נתונים מלא של כל הרכבים הקיימים שצריכים עדכון
export const allCarsForUpdate = [
  // יוקרה וספורט
  { brand: "Ferrari", model: "488 GTB", category: "supercar", basePrice: 1280000 },
  { brand: "Ferrari", model: "F8 Tributo", category: "supercar", basePrice: 1260000 },
  { brand: "Ferrari", model: "SF90 Stradale", category: "hypercar", basePrice: 2320000 },
  { brand: "Ferrari", model: "Roma", category: "luxury_gt", basePrice: 1110000 },
  { brand: "Ferrari", model: "Portofino M", category: "convertible", basePrice: 1050000 },
  
  { brand: "Lamborghini", model: "Huracán EVO", category: "supercar", basePrice: 1150000 },
  { brand: "Lamborghini", model: "Aventador", category: "supercar", basePrice: 1800000 },
  { brand: "Lamborghini", model: "Urus", category: "luxury_suv", basePrice: 990000 },
  { brand: "Lamborghini", model: "Revuelto", category: "hypercar", basePrice: 2780000 },
  
  { brand: "McLaren", model: "720S", category: "supercar", basePrice: 1450000 },
  { brand: "McLaren", model: "Artura", category: "hybrid_sports", basePrice: 1180000 },
  { brand: "McLaren", model: "P1", category: "hypercar", basePrice: 5500000 },
  
  { brand: "Porsche", model: "911 Turbo S", category: "sports_car", basePrice: 765000 },
  { brand: "Porsche", model: "Cayenne", category: "luxury_suv", basePrice: 385000 },
  { brand: "Porsche", model: "Taycan", category: "electric_luxury", basePrice: 450000 },
  { brand: "Porsche", model: "Panamera", category: "luxury_sedan", basePrice: 520000 },
  { brand: "Porsche", model: "Macan", category: "compact_suv", basePrice: 285000 },
  
  // טסלה
  { brand: "Tesla", model: "Model S Plaid", category: "electric_luxury", basePrice: 420000 },
  { brand: "Tesla", model: "Model 3", category: "electric_sedan", basePrice: 180000 },
  { brand: "Tesla", model: "Model Y", category: "electric_suv", basePrice: 220000 },
  { brand: "Tesla", model: "Model X", category: "electric_luxury_suv", basePrice: 380000 },
  { brand: "Tesla", model: "Cybertruck", category: "electric_truck", basePrice: 450000 },
  
  // BMW
  { brand: "BMW", model: "M3 Competition", category: "sports_sedan", basePrice: 420000 },
  { brand: "BMW", model: "M5", category: "luxury_sports_sedan", basePrice: 580000 },
  { brand: "BMW", model: "X5", category: "luxury_suv", basePrice: 320000 },
  { brand: "BMW", model: "X3", category: "compact_suv", basePrice: 245000 },
  { brand: "BMW", model: "i4", category: "electric_sedan", basePrice: 285000 },
  { brand: "BMW", model: "iX", category: "electric_suv", basePrice: 350000 },
  { brand: "BMW", model: "320i", category: "luxury_sedan", basePrice: 195000 },
  { brand: "BMW", model: "530i", category: "executive_sedan", basePrice: 265000 },
  
  // Mercedes-Benz
  { brand: "Mercedes-Benz", model: "AMG GT", category: "sports_car", basePrice: 650000 },
  { brand: "Mercedes-Benz", model: "C-Class", category: "luxury_sedan", basePrice: 195000 },
  { brand: "Mercedes-Benz", model: "E-Class", category: "executive_sedan", basePrice: 285000 },
  { brand: "Mercedes-Benz", model: "S-Class", category: "luxury_flagship", basePrice: 650000 },
  { brand: "Mercedes-Benz", model: "GLE", category: "luxury_suv", basePrice: 320000 },
  { brand: "Mercedes-Benz", model: "GLS", category: "full_size_suv", basePrice: 420000 },
  { brand: "Mercedes-Benz", model: "EQS", category: "electric_luxury", basePrice: 520000 },
  { brand: "Mercedes-Benz", model: "AMG C63", category: "sports_sedan", basePrice: 385000 },
  
  // Audi
  { brand: "Audi", model: "RS6 Avant", category: "sports_wagon", basePrice: 480000 },
  { brand: "Audi", model: "A4", category: "luxury_sedan", basePrice: 185000 },
  { brand: "Audi", model: "A6", category: "executive_sedan", basePrice: 265000 },
  { brand: "Audi", model: "Q5", category: "compact_suv", basePrice: 245000 },
  { brand: "Audi", model: "Q7", category: "luxury_suv", basePrice: 315000 },
  { brand: "Audi", model: "e-tron GT", category: "electric_sports", basePrice: 520000 },
  { brand: "Audi", model: "RS3", category: "hot_hatch", basePrice: 285000 },
  
  // Toyota
  { brand: "Toyota", model: "Camry", category: "midsize_sedan", basePrice: 135000 },
  { brand: "Toyota", model: "Corolla", category: "compact_sedan", basePrice: 95000 },
  { brand: "Toyota", model: "RAV4", category: "compact_suv", basePrice: 145000 },
  { brand: "Toyota", model: "Highlander", category: "midsize_suv", basePrice: 185000 },
  { brand: "Toyota", model: "Prius", category: "hybrid", basePrice: 115000 },
  { brand: "Toyota", model: "Land Cruiser", category: "full_size_suv", basePrice: 285000 },
  { brand: "Toyota", model: "Supra", category: "sports_car", basePrice: 245000 },
  
  // Honda
  { brand: "Honda", model: "Civic", category: "compact_sedan", basePrice: 125000 },
  { brand: "Honda", model: "Accord", category: "midsize_sedan", basePrice: 155000 },
  { brand: "Honda", model: "CR-V", category: "compact_suv", basePrice: 165000 },
  { brand: "Honda", model: "Pilot", category: "midsize_suv", basePrice: 195000 },
  { brand: "Honda", model: "Civic Type R", category: "hot_hatch", basePrice: 195000 },
  
  // Hyundai
  { brand: "Hyundai", model: "Elantra", category: "compact_sedan", basePrice: 98000 },
  { brand: "Hyundai", model: "Tucson", category: "compact_suv", basePrice: 165000 },
  { brand: "Hyundai", model: "Santa Fe", category: "midsize_suv", basePrice: 195000 },
  { brand: "Hyundai", model: "IONIQ 5", category: "electric_suv", basePrice: 185000 },
  
  // Kia
  { brand: "Kia", model: "Forte", category: "compact_sedan", basePrice: 95000 },
  { brand: "Kia", model: "Sportage", category: "compact_suv", basePrice: 155000 },
  { brand: "Kia", model: "Sorento", category: "midsize_suv", basePrice: 175000 },
  { brand: "Kia", model: "EV6", category: "electric_suv", basePrice: 195000 },
  
  // Volkswagen
  { brand: "Volkswagen", model: "Golf", category: "compact_hatchback", basePrice: 125000 },
  { brand: "Volkswagen", model: "Passat", category: "midsize_sedan", basePrice: 155000 },
  { brand: "Volkswagen", model: "Tiguan", category: "compact_suv", basePrice: 165000 },
  { brand: "Volkswagen", model: "ID.4", category: "electric_suv", basePrice: 185000 },
  
  // Ford
  { brand: "Ford", model: "Mustang GT", category: "sports_car", basePrice: 280000 },
  { brand: "Ford", model: "F-150", category: "pickup_truck", basePrice: 185000 },
  { brand: "Ford", model: "Explorer", category: "midsize_suv", basePrice: 175000 },
  { brand: "Ford", model: "Focus", category: "compact_hatchback", basePrice: 115000 },
  { brand: "Ford", model: "Bronco", category: "off_road_suv", basePrice: 195000 },
  
  // Nissan
  { brand: "Nissan", model: "Altima", category: "midsize_sedan", basePrice: 125000 },
  { brand: "Nissan", model: "Sentra", category: "compact_sedan", basePrice: 105000 },
  { brand: "Nissan", model: "Rogue", category: "compact_suv", basePrice: 145000 },
  { brand: "Nissan", model: "Pathfinder", category: "midsize_suv", basePrice: 185000 },
  { brand: "Nissan", model: "GT-R", category: "sports_car", basePrice: 680000 },
  
  // Mazda
  { brand: "Mazda", model: "CX-5", category: "compact_suv", basePrice: 145000 },
  { brand: "Mazda", model: "Mazda3", category: "compact_sedan", basePrice: 115000 },
  { brand: "Mazda", model: "CX-9", category: "midsize_suv", basePrice: 185000 },
  { brand: "Mazda", model: "MX-5 Miata", category: "roadster", basePrice: 165000 },
  
  // Subaru
  { brand: "Subaru", model: "Outback", category: "crossover_wagon", basePrice: 155000 },
  { brand: "Subaru", model: "Forester", category: "compact_suv", basePrice: 145000 },
  { brand: "Subaru", model: "WRX", category: "sports_sedan", basePrice: 185000 },
  { brand: "Subaru", model: "Ascent", category: "midsize_suv", basePrice: 175000 },
];

// פונקציה ליצירת תיאור בעברית לכל רכב
export function getCarDescription(brand: string, model: string, category: string): string {
  const descriptions = {
    supercar: `${brand} ${model} - סופרקאר מרהיב המשלב ביצועים קיצוניים עם עיצוב עוצר נשימה`,
    hypercar: `${brand} ${model} - היפרקאר נדיר ומתקדם הממצה את גבולות הטכנולוגיה והביצועים`,
    sports_car: `${brand} ${model} - מכונית ספורט מעולה המציעה חוויית נהיגה מרגשת`,
    luxury_sedan: `${brand} ${model} - סדאן יוקרתי המשלב נוחות גבוהה עם טכנולוגיה מתקדמת`,
    electric_sedan: `${brand} ${model} - סדאן חשמלי חדשני עם ביצועים מרשימים וטווח ארוך`,
    compact_suv: `${brand} ${model} - רכב שטח קומפקטי מעשי ויעיל לנסיעות יומיומיות`,
    luxury_suv: `${brand} ${model} - רכב שטח יוקרתי המציע שילוב מושלם של נוחות וביצועים`,
    midsize_sedan: `${brand} ${model} - סדאן בגודל בינוני אמין ונוח למשפחות`,
    compact_sedan: `${brand} ${model} - סדאן קומפקטי כלכלי ומעשי לנהיגה עירונית`,
    hot_hatch: `${brand} ${model} - האצ'בק ספורטיבי עם ביצועים גבוהים ופרקטיות יומיומית`
  };
  
  return descriptions[category] || `${brand} ${model} - רכב איכותי ואמין`;
}

// פונקציה ליצירת מילות מפתח לחיפוש תמונות
export function getImageSearchTerms(brand: string, model: string, category: string): string {
  const brandLower = brand.toLowerCase();
  const modelLower = model.toLowerCase().replace(/\s+/g, '-');
  
  const categoryTerms = {
    supercar: 'supercar sports car luxury',
    hypercar: 'hypercar ultimate performance',
    sports_car: 'sports car performance',
    luxury_sedan: 'luxury sedan premium',
    electric_sedan: 'electric sedan tesla style',
    compact_suv: 'compact SUV crossover',
    luxury_suv: 'luxury SUV premium',
    midsize_sedan: 'midsize sedan family',
    compact_sedan: 'compact sedan economy',
    hot_hatch: 'hot hatch performance'
  };
  
  const terms = categoryTerms[category] || 'automobile car';
  return `${brandLower} ${modelLower} ${terms} professional photography studio`;
}