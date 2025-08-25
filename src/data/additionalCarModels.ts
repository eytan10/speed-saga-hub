import { ExtendedCarDetails } from "./massiveCarsDatabase";

// תמונות זמניות לחברות חסרות
import teslaImage from "@/assets/tesla-blue.jpg";
import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-amg.jpg";
import audiImage from "@/assets/audi-rs6.jpg";
import fordImage from "@/assets/ford-mustang-gt-2024.jpg";
import toyotaImage from "@/assets/toyota-camry-2024.jpg";
import hondaImage from "@/assets/honda-civic-blue.jpg";
import volkswagenImage from "@/assets/volkswagen-golf-gti-2024.jpg";

// Helper function to create car objects
const createCar = (
  id: string,
  name: string,
  brand: string,
  type: string,
  price: string,
  power: number,
  year: number,
  image: string,
  isElectric = false,
  isNew = false
): ExtendedCarDetails => ({
  id,
  name,
  brand,
  year,
  type,
  image,
  price,
  rating: 4.0 + Math.random() * 1.0,
  isElectric,
  isNew,
  description: `${brand} ${name} משלב ביצועים מרשימים עם עיצוב מתקדם ברמה הגבוהה ביותר.`,
  specs: {
    engine: isElectric ? "מנוע חשמלי" : "מנוע בנזין טורבו",
    transmission: isElectric ? "חד-מהירותי" : "אוטומטי 8 הילוכים",
    acceleration: `0-100 קמ״ש תוך ${3 + Math.random() * 4} שניות`,
    topSpeed: `${200 + Math.random() * 100} קמ״ש`,
    fuel: isElectric ? `${300 + Math.random() * 200} ק״מ טווח` : `${6 + Math.random() * 4} ליטר/100 ק״מ`,
    weight: `${1200 + Math.random() * 800} ק״ג`,
    power,
    torque: `${Math.round(power * 1.35)} נמ`,
    drivetrain: Math.random() > 0.5 ? "הנעה קדמית" : "הנעה אחורית",
    seating: Math.random() > 0.7 ? 7 : Math.random() > 0.3 ? 5 : 2,
    cargo: `${300 + Math.random() * 500} ליטר`,
    price
  },
  features: [
    "מערכת בטיחות מתקדמת",
    "מערכת מולטימדיה חכמה",
    "מושבים מעור איכותי",
    "מיזוג אוטומטי דו-אזורי",
    "מערכת ניווט מתקדמת",
    "חיישני חניה ומצלמת רוורס"
  ],
  pros: [
    "ביצועים מעולים וחסכוניים",
    "עיצוב מודרני ואלגנטי",
    "רמת נוחות גבוהה",
    "טכנולוגיה מתקדמת",
    "מהימנות גבוהה"
  ],
  cons: [
    "מחיר גבוה יחסית",
    "עלויות תחזוקה",
    "זמינות חלפים מוגבלת",
    "צריכת דלק בעירוני"
  ],
  colors: [
    { name: "שחור מטאלי", hex: "#1C1C1C" },
    { name: "לבן פרל", hex: "#F8F8FF" },
    { name: "כסף מטאלי", hex: "#C0C0C0" },
    { name: "כחול מטאלי", hex: "#1E3A8A" },
    { name: "אדום מטאלי", hex: "#DC2626" }
  ],
  interiorColors: [
    { name: "שחור", hex: "#1C1C1C" },
    { name: "בז'", hex: "#F5F5DC" },
    { name: "חום", hex: "#8B4513" }
  ],
  dealerships: [
    {
      name: `${brand} תל אביב`,
      location: "תל אביב, ישראל",
      phone: "03-555-0123",
      website: `www.${brand.toLowerCase()}-telaviv.co.il`
    },
    {
      name: `${brand} חיפה`,
      location: "חיפה, ישראל",
      phone: "04-555-0456", 
      website: `www.${brand.toLowerCase()}-haifa.co.il`
    }
  ]
});

// חברות שחסרות דגמים - רכבים נוספים
export const additionalCarModels: ExtendedCarDetails[] = [
  // Bugatti
  createCar("bugatti-chiron", "Chiron", "Bugatti", "היפרקאר", "₪12,500,000", 1479, 2024, teslaImage),
  createCar("bugatti-veyron", "Veyron", "Bugatti", "היפרקאר", "₪8,900,000", 1001, 2023, teslaImage),
  createCar("bugatti-divo", "Divo", "Bugatti", "היפרקאר מסלול", "₪21,000,000", 1479, 2024, teslaImage, false, true),

  // Koenigsegg
  createCar("koenigsegg-jesko", "Jesko", "Koenigsegg", "היפרקאר", "₪12,800,000", 1600, 2024, bmwImage, false, true),
  createCar("koenigsegg-regera", "Regera", "Koenigsegg", "היפרקאר היברידי", "₪9,500,000", 1500, 2023, bmwImage),
  createCar("koenigsegg-gemera", "Gemera", "Koenigsegg", "GT היברידי", "₪7,200,000", 1700, 2024, bmwImage, false, true),

  // Lexus
  createCar("lexus-lx", "LX", "Lexus", "SUV יוקרה", "₪420,000", 409, 2024, toyotaImage),
  createCar("lexus-ls", "LS", "Lexus", "סדאן יוקרה", "₪380,000", 416, 2024, toyotaImage),
  createCar("lexus-lc", "LC", "Lexus", "קופה יוקרה", "₪460,000", 471, 2024, toyotaImage),
  createCar("lexus-nx", "NX", "Lexus", "SUV קומפקטי יוקרה", "₪195,000", 275, 2024, toyotaImage),
  createCar("lexus-rx", "RX", "Lexus", "SUV יוקרה", "₪285,000", 295, 2024, toyotaImage),

  // Infiniti
  createCar("infiniti-qx80", "QX80", "Infiniti", "SUV יוקרה גדול", "₪365,000", 400, 2024, hondaImage),
  createCar("infiniti-q50", "Q50", "Infiniti", "סדאן ספורט", "₪185,000", 300, 2024, hondaImage),
  createCar("infiniti-qx60", "QX60", "Infiniti", "SUV משפחתי", "₪225,000", 295, 2024, hondaImage),

  // Acura
  createCar("acura-mdx", "MDX", "Acura", "SUV יוקרה", "₪245,000", 355, 2024, hondaImage),
  createCar("acura-tlx", "TLX", "Acura", "סדאן ספורט", "₪175,000", 272, 2024, hondaImage),
  createCar("acura-nsx", "NSX", "Acura", "סופרקאר היברידי", "₪680,000", 573, 2024, hondaImage),

  // Chevrolet
  createCar("chevrolet-corvette", "Corvette", "Chevrolet", "מכונית ספורט", "₪385,000", 495, 2024, fordImage),
  createCar("chevrolet-camaro", "Camaro", "Chevrolet", "מכונית ספורט", "₪195,000", 455, 2024, fordImage),
  createCar("chevrolet-tahoe", "Tahoe", "Chevrolet", "SUV גדול", "₪285,000", 355, 2024, fordImage),
  createCar("chevrolet-silverado", "Silverado", "Chevrolet", "טנדר", "₪245,000", 355, 2024, fordImage),

  // Cadillac
  createCar("cadillac-escalade", "Escalade", "Cadillac", "SUV יוקרה גדול", "₪485,000", 420, 2024, fordImage),
  createCar("cadillac-ct5", "CT5", "Cadillac", "סדאן יוקרה", "₪225,000", 335, 2024, fordImage),
  createCar("cadillac-xt6", "XT6", "Cadillac", "SUV יוקרה", "₪315,000", 310, 2024, fordImage),

  // Lincoln
  createCar("lincoln-navigator", "Navigator", "Lincoln", "SUV יוקרה גדול", "₪465,000", 440, 2024, fordImage),
  createCar("lincoln-aviator", "Aviator", "Lincoln", "SUV יוקרה", "₪285,000", 400, 2024, fordImage),
  createCar("lincoln-corsair", "Corsair", "Lincoln", "SUV קומפקטי יוקרה", "₪195,000", 250, 2024, fordImage),

  // Jeep
  createCar("jeep-grand-cherokee", "Grand Cherokee", "Jeep", "SUV", "₪175,000", 293, 2024, fordImage),
  createCar("jeep-wrangler", "Wrangler", "Jeep", "SUV שטח", "₪165,000", 285, 2024, fordImage),
  createCar("jeep-compass", "Compass", "Jeep", "SUV קומפקטי", "₪125,000", 180, 2024, fordImage),

  // Dodge
  createCar("dodge-challenger", "Challenger", "Dodge", "מכונית ספורט", "₪225,000", 717, 2024, fordImage),
  createCar("dodge-charger", "Charger", "Dodge", "סדאן ספורט", "₪195,000", 485, 2024, fordImage),
  createCar("dodge-durango", "Durango", "Dodge", "SUV ספורט", "₪235,000", 475, 2024, fordImage),

  // Volvo
  createCar("volvo-xc90", "XC90", "Volvo", "SUV יוקרה", "₪285,000", 316, 2024, volkswagenImage),
  createCar("volvo-xc60", "XC60", "Volvo", "SUV קומפקטי", "₪225,000", 316, 2024, volkswagenImage),
  createCar("volvo-s90", "S90", "Volvo", "סדאן יוקרה", "₪245,000", 316, 2024, volkswagenImage),
  createCar("volvo-xc40", "XC40", "Volvo", "SUV קומפקטי", "₪165,000", 190, 2024, volkswagenImage),

  // Land Rover
  createCar("land-rover-range-rover", "Range Rover", "Land Rover", "SUV יוקרה", "₪485,000", 518, 2024, audiImage),
  createCar("land-rover-discovery", "Discovery", "Land Rover", "SUV משפחתי", "₪285,000", 340, 2024, audiImage),
  createCar("land-rover-defender", "Defender", "Land Rover", "SUV שטח", "₪345,000", 400, 2024, audiImage),

  // MINI
  createCar("mini-cooper", "Cooper", "MINI", "האצ'בק קטן", "₪145,000", 136, 2024, volkswagenImage),
  createCar("mini-countryman", "Countryman", "MINI", "SUV קטן", "₪175,000", 192, 2024, volkswagenImage),
  createCar("mini-clubman", "Clubman", "MINI", "סטיישן וואגון קטן", "₪165,000", 192, 2024, volkswagenImage),

  // Lotus
  createCar("lotus-evija", "Evija", "Lotus", "היפרקאר חשמלי", "₪8,500,000", 2000, 2024, teslaImage, true, true),
  createCar("lotus-emira", "Emira", "Lotus", "מכונית ספורט", "₪385,000", 400, 2024, teslaImage),
  createCar("lotus-eletre", "Eletre", "Lotus", "SUV חשמלי", "₪485,000", 905, 2024, teslaImage, true, true),

  // Genesis
  createCar("genesis-gv80", "GV80", "Genesis", "SUV יוקרה", "₪285,000", 375, 2024, mercedesImage),
  createCar("genesis-g90", "G90", "Genesis", "סדאן יוקרה", "₪385,000", 429, 2024, mercedesImage),
  createCar("genesis-g80", "G80", "Genesis", "סדאן יוקרה", "₪245,000", 300, 2024, mercedesImage),

  // Mitsubishi
  createCar("mitsubishi-outlander", "Outlander", "Mitsubishi", "SUV", "₪145,000", 181, 2024, hondaImage),
  createCar("mitsubishi-eclipse-cross", "Eclipse Cross", "Mitsubishi", "SUV קומפקטי", "₪125,000", 152, 2024, hondaImage),
  createCar("mitsubishi-pajero", "Pajero", "Mitsubishi", "SUV שטח", "₪185,000", 200, 2024, hondaImage),

  // Suzuki
  createCar("suzuki-vitara", "Vitara", "Suzuki", "SUV קומפקטי", "₪95,000", 129, 2024, hondaImage),
  createCar("suzuki-swift", "Swift", "Suzuki", "האצ'בק קטן", "₪75,000", 83, 2024, hondaImage),
  createCar("suzuki-jimny", "Jimny", "Suzuki", "SUV שטח קטן", "₪85,000", 102, 2024, hondaImage)
];

export default additionalCarModels;