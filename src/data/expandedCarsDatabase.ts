import ferrariImage from "@/assets/ferrari-red.jpg";
import teslaImage from "@/assets/tesla-blue.jpg"; 
import porscheImage from "@/assets/porsche-black.jpg";
import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-amg.jpg";
import audiImage from "@/assets/audi-rs6.jpg";
import mclarenImage from "@/assets/mclaren-720s.jpg";
import lamborghiniImage from "@/assets/lamborghini-huracan.jpg";

// Define enhanced interfaces for the expanded car database
export interface ExtendedCarSpecs {
  engine: string;
  transmission: string;
  acceleration: string;
  topSpeed: string;
  fuel: string;
  weight: string;
  power: number;
  torque: string;
  drivetrain: string;
  seating: number;
  cargo: string;
  price: string;
}

export interface ExtendedCarDetails {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: string;
  image: string;
  price: string;
  rating: number;
  isElectric: boolean;
  isNew: boolean;
  description: string;
  specs: ExtendedCarSpecs;
  features: string[];
  pros: string[];
  cons: string[];
  colors: Array<{
    name: string;
    hex: string;
  }>;
  interiorColors: Array<{
    name: string;
    hex: string;
  }>;
  dealerships: Array<{
    name: string;
    location: string;
    phone: string;
    website: string;
  }>;
}

// Sample expanded car database with detailed specifications
export const expandedCarsDatabase: ExtendedCarDetails[] = [
  {
    id: "ferrari-488-gtb",
    name: "488 GTB",
    brand: "Ferrari",
    year: 2024,
    type: "קופה ספורטיבי יוקרה",
    image: ferrariImage,
    price: "₪1,300,000",
    rating: 4.8,
    isElectric: false,
    isNew: true,
    description: "פרארי 488 GTB היא מכונית ספורט איטלקית יוקרתית המציעה ביצועים מרהיבים בשילוב עם עיצוב מהמם וטכנולוגיה מתקדמת.",
    specs: {
      engine: "V8 3.9L טורבו כפול",
      transmission: "7 הילוכים DCT",
      acceleration: "0-100 קמ״ש תוך 3.0 שניות",
      topSpeed: "330 קמ״ש",
      fuel: "11.4 ליטר/100 קמ״ מעורב",
      weight: "1,370 קק״ג",
      power: 661,
      torque: "760 נמ",
      drivetrain: "הנעה אחורית",
      seating: 2,
      cargo: "230 ליטר",
      price: "₪1,300,000"
    },
    features: [
      "מערכת בקרת יציבות מתקדמת (ESC)",
      "בלמי קרמיקה פחמן",
      "מושבי ספורט מעור מיוחד",
      "מערכת אינטיינמנט עם מסך מגע",
      "מערכת ניווט GPS",
      "מערכת שמע פרמיום"
    ],
    pros: [
      "ביצועים מרהיבים ותאוצה מרשימה",
      "עיצוב חיצוני ופנימי מדהים",
      "הרגשת נהיגה ספורטיבית מקצועית",
      "טכנולוגיה ואירודינמיקה מתקדמת"
    ],
    cons: [
      "מחיר רכישה גבוה מאוד",
      "עלויות תחזוקה ושירות יקרות",
      "צריכת דלק גבוהה",
      "נוחות מוגבלת לנסיעות יומיומיות"
    ],
    colors: [
      { name: "אדום פרארי", hex: "#FF2800" },
      { name: "שחור מטאלי", hex: "#1C1C1C" },
      { name: "לבן פניני", hex: "#F8F8FF" },
      { name: "כחול ים", hex: "#006994" },
      { name: "צהוב מודנה", hex: "#FFD700" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1C1C1C" },
      { name: "אדום", hex: "#8B0000" },
      { name: "קרם", hex: "#F5F5DC" }
    ],
    dealerships: [
      {
        name: "פרארי תל אביב",
        location: "רח׳ יגאל אלון 98, תל אביב",
        phone: "03-555-0100",
        website: "www.ferrari-telaviv.co.il"
      },
      {
        name: "פרארי חיפה",
        location: "שדרות חנה סנש 53, חיפה",
        phone: "04-555-0200",
        website: "www.ferrari-haifa.co.il"
      }
    ]
  },
  {
    id: "tesla-model-s",
    name: "Model S",
    brand: "Tesla",
    year: 2024,
    type: "סדאן חשמלי יוקרה",
    image: teslaImage,
    price: "₪420,000",
    rating: 4.7,
    isElectric: true,
    isNew: true,
    description: "טסלה מודל S היא סדאן חשמלי יוקרתי המשלב ביצועים מרהיבים עם טכנולוגיה מתקדמת וטווח נסיעה ארוך.",
    specs: {
      engine: "מנוע חשמלי כפול",
      transmission: "חד-מהירותי",
      acceleration: "0-100 קמ״ש תוך 3.1 שניות",
      topSpeed: "250 קמ״ש",
      fuel: "450 קילומטרים טווח",
      weight: "2,190 קק״ג",
      power: 670,
      torque: "800 נמ מיידי",
      drivetrain: "הנעה כפולה",
      seating: 5,
      cargo: "894 ליטר",
      price: "₪420,000"
    },
    features: [
      "מסך מגע 17 אינץ' מרכזי",
      "Autopilot מתקדם",
      "עדכוני תוכנה אלחוטיים",
      "מערכת שמע פרמיום (17 רמקולים)",
      "גג זכוכית פנורמי",
      "מקלט סופרצ׳ארג׳ר"
    ],
    pros: [
      "ביצועים חשמליים מרהיבים",
      "טכנולוגיית נהיגה אוטונומית מתקדמת",
      "עלויות הפעלה נמוכות",
      "עדכוני תוכנה מתמידים"
    ],
    cons: [
      "רשת טעינה מוגבלת באזורים מסוימים",
      "איכות בנייה לא עקבית",
      "עלויות תיקון גבוהות",
      "זמני המתנה לשירות ארוכים"
    ],
    colors: [
      { name: "לבן פרל", hex: "#FFFFFF" },
      { name: "שחור מטאלי", hex: "#1C1C1C" },
      { name: "כחול עמוק", hex: "#000080" },
      { name: "אדום רב-שכבתי", hex: "#CC0000" },
      { name: "כסף מטאלי", hex: "#C0C0C0" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1C1C1C" },
      { name: "קרם", hex: "#F5F5DC" },
      { name: "לבן", hex: "#FFFFFF" }
    ],
    dealerships: [
      {
        name: "טסלה תל אביב",
        location: "רח׳ לבונטין 7, תל אביב",
        phone: "03-555-0300",
        website: "www.tesla.com/he_il"
      },
      {
        name: "טסלה רעננה",
        location: "פארק התעשיה רעננה",
        phone: "09-555-0400",
        website: "www.tesla.com/he_il"
      }
    ]
  }
];

// Brand information with logos
export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  founded: number;
  description: string;
}

export const expandedBrands: Brand[] = [
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "🏎️",
    country: "איטליה",
    founded: 1947,
    description: "יצרנית מכוניות ספורט יוקרתיות איטלקית הידועה בביצועים מעולים ועיצוב מרהיב."
  },
  {
    id: "tesla",
    name: "Tesla",
    logo: "⚡",
    country: "ארצות הברית",
    founded: 2003,
    description: "חברת רכבים חשמליים מובילה המתמחה בטכנולוגיות מתקדמות ונהיגה אוטונומית."
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    logo: "⭐",
    country: "גרמניה",
    founded: 1926,
    description: "יצרנית רכבי יוקרה גרמנית הידועה באיכות, בטיחות וחדשנות טכנולוגית."
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "🔵",
    country: "גרמניה",
    founded: 1916,
    description: "יצרנית רכבי יוקרה גרמנית המתמחה ברכבים ספורטיביים ובטכנולוגיות מתקדמות."
  },
  {
    id: "audi",
    name: "Audi",
    logo: "🔴",
    country: "גרמניה",
    founded: 1909,
    description: "יצרנית רכבי יוקרה גרמנית הידועה בעיצוב מתקדם וטכנולוגיית quattro."
  },
  {
    id: "porsche",
    name: "Porsche",
    logo: "🏇",
    country: "גרמניה",
    founded: 1931,
    description: "יצרנית מכוניות ספורט גרמנית יוקרתית הידועה במכוניות הספורט האגדיות שלה."
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "🐂",
    country: "איטליה",
    founded: 1963,
    description: "יצרנית סופרקאר איטלקית הידועה בעיצובים דרמטיים וביצועים קיצוניים."
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: "🏁",
    country: "בריטניה",
    founded: 1985,
    description: "יצרנית סופרקאר בריטית המשלבת טכנולוגיית פורמולה 1 במכוניות כביש."
  },
  {
    id: "toyota",
    name: "Toyota",
    logo: "🔰",
    country: "יפן",
    founded: 1937,
    description: "יצרנית הרכב הגדולה בעולם, הידועה באמינות, איכות וטכנולוגיות היברידיות."
  },
  {
    id: "honda",
    name: "Honda",
    logo: "🏮",
    country: "יפן",
    founded: 1948,
    description: "יצרנית רכבים יפנית הידועה בחדשנות, אמינות ומנועים יעילים."
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    logo: "🚗",
    country: "גרמניה",
    founded: 1937,
    description: "יצרנית רכב גרמנית המציעה מגוון רחב של רכבים איכותיים ונגישים."
  },
  {
    id: "ford",
    name: "Ford",
    logo: "🔵",
    country: "ארצות הברית",
    founded: 1903,
    description: "יצרנית רכב אמריקאית הידועה בחדשנות, איכות ומגוון רחב של דגמים."
  },
  {
    id: "nissan",
    name: "Nissan",
    logo: "🏯",
    country: "יפן",
    founded: 1933,
    description: "יצרנית רכבים יפנית הידועה בטכנולוגיות מתקדמות ורכבים חשמליים."
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logo: "🚙",
    country: "דרום קוריאה",
    founded: 1967,
    description: "יצרנית רכבים קוריאנית המציעה איכות גבוהה ויחס מחיר-ערך מעולה."
  },
  {
    id: "kia",
    name: "Kia",
    logo: "🚗",
    country: "דרום קוריאה",
    founded: 1944,
    description: "יצרנית רכבים קוריאנית הידועה בעיצוב מתקדם ובאחריות מקיפה."
  },
  {
    id: "mazda",
    name: "Mazda",
    logo: "🎌",
    country: "יפן",
    founded: 1920,
    description: "יצרנית רכבים יפנית הידועה בעיצוב ייחודי ובטכנולוגיית SkyActiv."
  },
  {
    id: "subaru",
    name: "Subaru",
    logo: "⭐",
    country: "יפן",
    founded: 1953,
    description: "יצרנית רכבים יפנית המתמחה ברכבי הנעה כפולה וביטחון גבוה."
  },
  {
    id: "skoda",
    name: "Škoda",
    logo: "🏰",
    country: "צ׳כיה",
    founded: 1895,
    description: "יצרנית רכב צ׳כית הידועה בפרקטיות, אמינות ויחס מחיר-ערך מעולה."
  },
  {
    id: "peugeot",
    name: "Peugeot",
    logo: "🦁",
    country: "צרפת",
    founded: 1810,
    description: "יצרנית רכב צרפתית ידועה בעיצוב אלגנטי וביעילות."
  },
  {
    id: "citroen",
    name: "Citroën",
    logo: "⚜️",
    country: "צרפת",
    founded: 1919,
    description: "יצרנית רכב צרפתית חדשנית עם דגמים נוחים ומעוצבים."
  }
];