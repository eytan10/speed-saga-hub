import bugattiChiron from "@/assets/bugatti-chiron.jpg";
import koenigseggJesko from "@/assets/koenigsegg-jesko.jpg";
import paganiHuayra from "@/assets/pagani-huayra.jpg";
import mclarenMp412c from "@/assets/mclaren-mp4-12c.jpg";
import rollsRoycePhantom from "@/assets/rolls-royce-phantom.jpg";

import type { ExtendedCarDetails } from "./expandedCarsDatabase";

// Convert dollar prices to shekels
const formatPrice = (price: string): string => {
  if (price.includes("$")) {
    const usd = Number(price.replace(/[^0-9.]/g, ""));
    const ils = Math.round(usd * 3.6);
    return `₪${ils.toLocaleString("he-IL")}`;
  }
  return price;
};

// Helper function to create hypercar objects with enhanced details
const createHyperCar = (
  id: string,
  name: string,
  brand: string,
  type: string,
  price: string,
  power: number,
  year: number,
  image: string,
  accelerationTime: number,
  topSpeed: number,
  isElectric = false,
  isNew = false
): ExtendedCarDetails => {
  const normalizedPrice = formatPrice(price);
  return {
    id,
    name,
    brand,
    year,
    type,
    image,
    price: normalizedPrice,
    rating: 4.5 + Math.random() * 0.5,
    isElectric,
    isNew,
    description: `${brand} ${name} מייצג את שיא הטכנולוגיה והביצועים בעולם הרכב. היפרקאר זה משלב חדשנות מתקדמת עם עיצוב מרהיב.`,
    specs: {
      engine: isElectric ? "מנועים חשמליים מתקדמים" : "מנוע בנזין טורבו V8/V12",
      transmission: isElectric ? "חד-מהירותי" : "7-8 הילוכים DCT",
      acceleration: `${accelerationTime.toFixed(1)} שניות (0-100 קמ״ש)`,
      topSpeed: `${topSpeed} קמ״ש`,
      fuel: isElectric ? `${400 + Math.random() * 200} ק״מ טווח` : `${15 + Math.random() * 5} ליטר/100 ק״מ`,
      weight: `${1300 + Math.random() * 500} ק״ג`,
      power,
      torque: `${Math.round(power * 1.4)} נמ`,
      drivetrain: "הנעה כפולה AWD",
      seating: 2,
      cargo: `${150 + Math.random() * 100} ליטר`,
      price: normalizedPrice
    },
    features: [
      "מערכת בטיחות פעילה מתקדמת",
      "תא נהג מוכוון ביצועים",
      "מושבי פחמן ספורטיביים",
      "מערכת ניווט מתקדמת",
      "מערכת בלמים קרמיים",
      "מתלים אדפטיביים",
      "מערכת יציבות דינמית",
      "צג מידע על השמשה הקדמית"
    ],
    pros: [
      "ביצועים יוצאי דופן",
      "טכנולוגיה חדשנית",
      "עיצוב מרהיב וייחודי",
      "חוויית נהיגה בלתי נשכחת",
      "איכות בנייה מעולה"
    ],
    cons: [
      "מחיר גבוה מאוד",
      "עלויות תחזוקה יקרות",
      "זמינות חלפים מוגבלת",
      "צריכת דלק גבוהה",
      "נוחות יומיומית מוגבלת"
    ],
    colors: [
      { name: "שחור מבריק", hex: "#000000" },
      { name: "כסף מטאלי", hex: "#C0C0C0" },
      { name: "אדום מרקו", hex: "#8B0000" },
      { name: "כחול מטאלי", hex: "#003366" },
      { name: "פחמן גלוי", hex: "#2C2C2C" }
    ],
    interiorColors: [
      { name: "שחור אלקנטרה", hex: "#1C1C1C" },
      { name: "עור חום", hex: "#8B4513" },
      { name: "פחמן", hex: "#2C2C2C" }
    ],
    dealerships: [
      {
        name: `${brand} ישראל`,
        location: "תל אביב, ישראל",
        phone: "03-555-9999",
        website: `www.${brand.toLowerCase()}-israel.co.il`
      }
    ]
  };
};

// Hypercars Database - The most exclusive vehicles
export const hyperCarsDatabase: ExtendedCarDetails[] = [
  // Bugatti Models
  createHyperCar("bugatti-chiron", "Chiron", "Bugatti", "היפרקאר", "$3,000,000", 1479, 2024, bugattiChiron, 2.4, 420, false, true),
  createHyperCar("bugatti-veyron", "Veyron Super Sport", "Bugatti", "היפרקאר", "$2,400,000", 1200, 2023, bugattiChiron, 2.5, 408),
  createHyperCar("bugatti-divo", "Divo", "Bugatti", "היפרקאר מסלול", "$5,800,000", 1479, 2024, bugattiChiron, 2.4, 380, false, true),

  // Koenigsegg Models
  createHyperCar("koenigsegg-jesko", "Jesko", "Koenigsegg", "היפרקאר", "$3,000,000", 1600, 2024, koenigseggJesko, 2.5, 480, false, true),
  createHyperCar("koenigsegg-regera", "Regera", "Koenigsegg", "היפרקאר היברידי", "$1,900,000", 1500, 2023, koenigseggJesko, 2.8, 410),
  createHyperCar("koenigsegg-gemera", "Gemera", "Koenigsegg", "היפרקאר היברידי GT", "$1,700,000", 1700, 2024, koenigseggJesko, 1.9, 400, false, true),

  // Pagani Models
  createHyperCar("pagani-huayra", "Huayra", "Pagani", "היפרקאר", "$2,800,000", 730, 2024, paganiHuayra, 3.2, 383),
  createHyperCar("pagani-zonda", "Zonda R", "Pagani", "היפרקאר מסלול", "$1,850,000", 750, 2023, paganiHuayra, 2.7, 350),
  createHyperCar("pagani-utopia", "Utopia", "Pagani", "היפרקאר", "$3,100,000", 852, 2024, paganiHuayra, 3.1, 370, false, true),

  // McLaren Special Series
  createHyperCar("mclaren-p1", "P1", "McLaren", "היפרקאר היברידי", "$1,150,000", 903, 2023, mclarenMp412c, 2.8, 350),
  createHyperCar("mclaren-senna", "Senna", "McLaren", "היפרקאר מסלול", "$958,000", 789, 2024, mclarenMp412c, 2.8, 340),
  createHyperCar("mclaren-speedtail", "Speedtail", "McLaren", "היפרקאר GT", "$2,250,000", 1035, 2023, mclarenMp412c, 2.5, 403),

  // Rolls-Royce Cullinan Black Badge and other ultra-luxury
  createHyperCar("rolls-royce-phantom", "Phantom", "Rolls-Royce", "סדאן יוקרה עילית", "$450,000", 563, 2024, rollsRoycePhantom, 5.3, 250),
  createHyperCar("rolls-royce-cullinan-black-badge", "Cullinan Black Badge", "Rolls-Royce", "SUV יוקרה עילית", "$420,000", 591, 2024, rollsRoycePhantom, 4.9, 250, false, true),
  createHyperCar("rolls-royce-spectre", "Spectre", "Rolls-Royce", "קופה חשמלי יוקרה", "$400,000", 577, 2024, rollsRoycePhantom, 4.4, 250, true, true),
];

export default hyperCarsDatabase;