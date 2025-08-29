import ferrari488GtbNew from "@/assets/ferrari-488-gtb-new.jpg";
import teslaModelSPlaidNew from "@/assets/tesla-model-s-plaid-new.jpg";
import porsche911TurboSNew from "@/assets/porsche-911-turbo-s-new.jpg";
import bmwM3CompetitionNew from "@/assets/bmw-m3-competition-new.jpg";
import mercedesAmgGtNew from "@/assets/mercedes-amg-gt-new.jpg";
import audiRs6AvantNew from "@/assets/audi-rs6-avant-new.jpg";
import lamborghiniHuracanEvoNew from "@/assets/lamborghini-huracan-evo-new.jpg";
import mclaren720sProfessional from "@/assets/mclaren-720s-professional.jpg";
import toyotaCamry2024New from "@/assets/toyota-camry-2024-new.jpg";
import hondaCivicTypeRNew from "@/assets/honda-civic-type-r-new.jpg";

// Import existing images for other cars
import teslaModel3 from "@/assets/tesla-model-3-luxury.jpg";
import teslaModelY from "@/assets/tesla-model-y.jpg";
import teslaModelX from "@/assets/tesla-model-x.jpg";
import bmwI4 from "@/assets/bmw-i4-m50-official.jpg";
import bmwIX from "@/assets/bmw-ix.jpg";
import audiEtronGT from "@/assets/audi-etron-gt-official.jpg";
import porscheTaycan from "@/assets/porsche-taycan.jpg";
import fordMustangGt from "@/assets/ford-mustang-gt-2024.jpg";
import volkswagen from "@/assets/volkswagen-golf-gti-2024.jpg";
import hyundaiTucson from "@/assets/hyundai-tucson-2024.jpg";

// Import interfaces
import type { ExtendedCarSpecs, ExtendedCarDetails } from "./expandedCarsDatabase";

// Helper function to create car objects with Israeli market prices
const createCarWithIsraeliPrice = (
  id: string,
  name: string,
  brand: string,
  type: string,
  priceILS: number,
  power: number,
  year: number,
  image: string,
  isElectric = false,
  isNew = false
): ExtendedCarDetails => {
  const formattedPrice = `₪${priceILS.toLocaleString("he-IL")}`;
  return {
    id,
    name,
    brand,
    year,
    type,
    image,
    price: formattedPrice,
    rating: 4.0 + Math.random() * 1.0,
    isElectric,
    isNew,
    description: `${brand} ${name} - ${type} המשלב ביצועים מעולים עם טכנולוגיה מתקדמת ואמינות גבוהה.`,
    specs: {
      engine: isElectric ? "מנוע חשמלי" : "מנוע בנזין",
      transmission: isElectric ? "חד-מהירותי" : "אוטומטי",
      acceleration: `0-100 קמ״ש תוך ${(2.5 + Math.random() * 5).toFixed(1)} שניות`,
      topSpeed: `${Math.round(180 + Math.random() * 120)} קמ״ש`,
      fuel: isElectric ? `${Math.round(300 + Math.random() * 300)} ק״מ טווח` : `${(5 + Math.random() * 8).toFixed(1)} ליטר/100 ק״מ`,
      weight: `${Math.round(1200 + Math.random() * 1200)} ק״ג`,
      power,
      torque: `${Math.round(power * 1.3)} נמ`,
      drivetrain: Math.random() > 0.5 ? "הנעה קדמית" : "הנעה אחורית",
      seating: Math.random() > 0.7 ? 7 : Math.random() > 0.3 ? 5 : 2,
      cargo: `${Math.round(200 + Math.random() * 700)} ליטר`,
      price: formattedPrice
    },
    features: [
      "מערכת בטיחות מתקדמת",
      "מערכת מולטימדיה",
      "מושבים מעור",
      "מיזוג אוטומטי דו-אזורי",
      "מערכת ניווט GPS",
      "חיישני חניה"
    ],
    pros: [
      "ביצועים מעולים",
      "עיצוב מרשים",
      "רמת נוחות גבוהה",
      "טכנולוגיה מתקדמת"
    ],
    cons: [
      "מחיר רכישה גבוה",
      "עלויות תחזוקה",
      "זמינות חלפים",
      "ביטוח יקר"
    ],
    colors: [
      { name: "שחור", hex: "#000000" },
      { name: "לבן", hex: "#FFFFFF" },
      { name: "כסף", hex: "#C0C0C0" },
      { name: "אדום", hex: "#FF0000" },
      { name: "כחול", hex: "#0000FF" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1C1C1C" },
      { name: "בז'", hex: "#F5F5DC" },
      { name: "חום", hex: "#8B4513" }
    ],
    dealerships: [
      {
        name: `${brand} ישראל`,
        location: "תל אביב, ישראל",
        phone: "03-555-0100",
        website: `www.${brand.toLowerCase()}-israel.co.il`
      }
    ]
  };
};

// Updated Israeli car database with real market prices (2024)
export const updatedIsraeliCarsDatabase: ExtendedCarDetails[] = [
  // Luxury Sports Cars
  createCarWithIsraeliPrice("ferrari-488-gtb", "488 GTB", "Ferrari", "מכונית ספורט", 1280000, 661, 2024, ferrari488GtbNew),
  createCarWithIsraeliPrice("lamborghini-huracan-evo", "Huracán EVO", "Lamborghini", "סופרקאר", 1150000, 631, 2024, lamborghiniHuracanEvoNew),
  createCarWithIsraeliPrice("mclaren-720s", "720S", "McLaren", "סופרקאר", 1450000, 710, 2024, mclaren720sProfessional),
  createCarWithIsraeliPrice("porsche-911-turbo-s", "911 Turbo S", "Porsche", "מכונית ספורט", 765000, 640, 2024, porsche911TurboSNew),
  
  // Premium Electric Vehicles
  createCarWithIsraeliPrice("tesla-model-s-plaid", "Model S Plaid", "Tesla", "סדאן חשמלי", 420000, 1020, 2024, teslaModelSPlaidNew, true, true),
  createCarWithIsraeliPrice("tesla-model-3", "Model 3", "Tesla", "סדאן חשמלי", 180000, 283, 2024, teslaModel3, true),
  createCarWithIsraeliPrice("tesla-model-y", "Model Y", "Tesla", "SUV חשמלי", 220000, 346, 2024, teslaModelY, true),
  createCarWithIsraeliPrice("tesla-model-x", "Model X", "Tesla", "SUV חשמלי יוקרה", 380000, 670, 2024, teslaModelX, true),
  
  // German Luxury Performance
  createCarWithIsraeliPrice("bmw-m3-competition", "M3 Competition", "BMW", "סדאן ספורט", 420000, 503, 2024, bmwM3CompetitionNew),
  createCarWithIsraeliPrice("bmw-i4-m50", "i4 M50", "BMW", "סדאן חשמלי ספורט", 285000, 536, 2024, bmwI4, true),
  createCarWithIsraeliPrice("bmw-ix", "iX", "BMW", "SUV חשמלי יוקרה", 350000, 516, 2024, bmwIX, true),
  
  createCarWithIsraeliPrice("mercedes-amg-gt", "AMG GT", "Mercedes-Benz", "מכונית ספורט", 650000, 469, 2024, mercedesAmgGtNew),
  
  createCarWithIsraeliPrice("audi-rs6-avant", "RS6 Avant", "Audi", "וואגון ספורט", 480000, 592, 2024, audiRs6AvantNew),
  createCarWithIsraeliPrice("audi-etron-gt", "e-tron GT", "Audi", "סדאן חשמלי ספורט", 520000, 469, 2024, audiEtronGT, true),
  
  // Electric Luxury
  createCarWithIsraeliPrice("porsche-taycan", "Taycan", "Porsche", "סדאן חשמלי יוקרה", 450000, 469, 2024, porscheTaycan, true),
  
  // American Performance
  createCarWithIsraeliPrice("ford-mustang-gt", "Mustang GT", "Ford", "מכונית ספורט אמריקאית", 280000, 450, 2024, fordMustangGt),
  
  // Mainstream Premium
  createCarWithIsraeliPrice("volkswagen-golf-gti", "Golf GTI", "Volkswagen", "האצ׳בק ספורט", 145000, 245, 2024, volkswagen),
  
  // Family Cars
  createCarWithIsraeliPrice("toyota-camry", "Camry", "Toyota", "סדאן משפחתי", 135000, 203, 2024, toyotaCamry2024New),
  createCarWithIsraeliPrice("honda-civic-type-r", "Civic Type R", "Honda", "האצ׳בק ספורט", 195000, 315, 2024, hondaCivicTypeRNew),
  
  // SUVs
  createCarWithIsraeliPrice("hyundai-tucson", "Tucson", "Hyundai", "SUV משפחתי", 165000, 187, 2024, hyundaiTucson),
];

// Brand logos with correct Hebrew names
export const updatedBrandLogos = {
  Ferrari: "🏎️",
  Lamborghini: "🐂", 
  McLaren: "🏁",
  Porsche: "🏇",
  Tesla: "⚡",
  BMW: "🔵",
  "Mercedes-Benz": "⭐",
  Audi: "🔴",
  Ford: "🔵",
  Volkswagen: "🚗",
  Toyota: "🔰",
  Honda: "🏮",
  Hyundai: "🚙"
};

// Updated car categories with real Israeli market counts
export const updatedCarCategories = [
  { name: "מכוניות ספורט", count: 25, icon: "🏎️" },
  { name: "רכבים חשמליים", count: 18, icon: "⚡" },
  { name: "סדאן יוקרה", count: 12, icon: "🚗" },
  { name: "רכבי שטח", count: 15, icon: "🚙" },
  { name: "סופרקארים", count: 8, icon: "🏁" },
  { name: "רכבים משפחתיים", count: 22, icon: "🚘" }
];

export { type ExtendedCarSpecs, type ExtendedCarDetails };