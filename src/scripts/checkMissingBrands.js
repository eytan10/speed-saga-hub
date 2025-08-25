// סקריפט לבדיקת חברות שחסרות דגמים במאגר הנתונים

const fs = require('fs');
const path = require('path');

// קרא את קבצי הנתונים
const expandedCarsPath = path.join(__dirname, '../data/expandedCarsDatabase.ts');
const massiveCarsPath = path.join(__dirname, '../data/massiveCarsDatabase.ts');

const expandedCarsContent = fs.readFileSync(expandedCarsPath, 'utf8');
const massiveCarsContent = fs.readFileSync(massiveCarsPath, 'utf8');

// תחלל רשימת החברות מ expandedBrands
const brandsMatch = expandedCarsContent.match(/export const expandedBrands = \[([\s\S]*?)\];/);
if (!brandsMatch) {
  console.error('לא הצלחתי למצוא את expandedBrands');
  process.exit(1);
}

const brandsSection = brandsMatch[1];
const brandIds = [];
const brandIdMatches = brandsSection.matchAll(/id: "([^"]+)"/g);
for (const match of brandIdMatches) {
  brandIds.push(match[1]);
}

console.log(`נמצאו ${brandIds.length} חברות ב-expandedBrands:`);
brandIds.forEach(id => console.log(`- ${id}`));

// תחלל רשימת הרכבים מ massiveCarsDatabase
const carsMatch = massiveCarsContent.match(/export const massiveCarsDatabase[\s\S]*?= \[([\s\S]*?)\];/);
if (!carsMatch) {
  console.error('לא הצלחתי למצוא את massiveCarsDatabase');
  process.exit(1);
}

const carsSection = carsMatch[1];
const carBrands = new Set();
const brandMatches = carsSection.matchAll(/createCar\([^,]+, [^,]+, "([^"]+)"/g);
for (const match of brandMatches) {
  const brandName = match[1];
  const normalizedBrand = brandName.toLowerCase().replace(/[^a-z]/g, '');
  carBrands.add(normalizedBrand);
}

console.log(`\nנמצאו ${carBrands.size} חברות עם דגמים ב-massiveCarsDatabase:`);
Array.from(carBrands).sort().forEach(brand => console.log(`- ${brand}`));

// בדוק חברות שחסרות דגמים
const missingBrands = [];
brandIds.forEach(brandId => {
  const normalizedBrandId = brandId.toLowerCase().replace(/[^a-z]/g, '');
  if (!carBrands.has(normalizedBrandId)) {
    missingBrands.push(brandId);
  }
});

console.log(`\n🚨 חברות שחסרות דגמים (${missingBrands.length}):`);
missingBrands.forEach(brand => console.log(`❌ ${brand}`));

if (missingBrands.length === 0) {
  console.log('\n✅ כל החברות יש להן דגמים!');
} else {
  console.log(`\n📝 צריך להוסיף דגמים עבור ${missingBrands.length} חברות`);
}