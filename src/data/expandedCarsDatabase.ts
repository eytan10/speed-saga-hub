import ferrariImage from "@/assets/ferrari-red.jpg";
import teslaImage from "@/assets/tesla-blue.jpg"; 
import porscheImage from "@/assets/porsche-black.jpg";
import bmwImage from "@/assets/bmw-m3.jpg";
import mercedesImage from "@/assets/mercedes-amg.jpg";
import audiImage from "@/assets/audi-rs6.jpg";
import mclarenImage from "@/assets/mclaren-720s.jpg";
import lamborghiniImage from "@/assets/lamborghini-huracan.jpg";

// Brand logos imports
import ferrariLogo from "@/assets/logos/ferrari-logo.png";
import teslaLogo from "@/assets/logos/tesla-logo.png";
import bmwLogo from "@/assets/logos/bmw-logo.png";
import mercedesLogo from "@/assets/logos/mercedes-logo.png";
import audiLogo from "@/assets/logos/audi-logo.png";
import porscheLogo from "@/assets/logos/porsche-logo.png";
import toyotaLogo from "@/assets/logos/toyota-logo.png";
import hondaLogo from "@/assets/logos/honda-logo.png";
import lamborghiniLogo from "@/assets/logos/lamborghini-logo.png";
import fordLogo from "@/assets/logos/ford-logo.png";
import nissanLogo from "@/assets/logos/nissan-logo.png";
import jaguarLogo from "@/assets/logos/jaguar-logo.png";
import volkswagenLogo from "@/assets/logos/volkswagen-logo.png";
import kiaLogo from "@/assets/logos/kia-logo.png";
import mazdaLogo from "@/assets/logos/mazda-logo.png";
import mclarenLogo from "@/assets/logos/mclaren-logo.png";
import hyundaiLogo from "@/assets/logos/hyundai-logo.png";
import subaruLogo from "@/assets/logos/subaru-logo.png";

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
  isElectric?: boolean;
  isNew?: boolean;
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

export const expandedBrands = [
  {
    id: "ferrari",
    name: "Ferrari",
    logo: ferrariLogo,
    description: "יצרנית מכוניות ספורט יוקרה איטלקית",
    founded: 1947,
    country: "איטליה",
    headquarters: "מרנלו, איטליה"
  },
  {
    id: "tesla", 
    name: "Tesla",
    logo: teslaLogo,
    description: "יצרנית רכבים חשמליים אמריקנית מובילה",
    founded: 2003,
    country: "ארצות הברית",
    headquarters: "אוסטין, טקסס"
  },
  {
    id: "porsche",
    name: "Porsche", 
    logo: porscheLogo,
    description: "יצרנית מכוניות ספורט יוקרה גרמנית",
    founded: 1931,
    country: "גרמניה",
    headquarters: "שטוטגרט, גרמניה"
  },
  {
    id: "bmw",
    name: "BMW",
    logo: bmwLogo,
    description: "יצרנית רכבי יוקרה גרמנית", 
    founded: 1916,
    country: "גרמניה",
    headquarters: "מינכן, גרמניה"
  },
  {
    id: "mercedes-benz",
    name: "Mercedes-Benz",
    logo: mercedesLogo,
    description: "יצרנית רכבי יוקרה גרמנית עולמית",
    founded: 1926,
    country: "גרמניה",
    headquarters: "שטוטגרט, גרמניה"
  },
  {
    id: "audi",
    name: "Audi",
    logo: audiLogo,
    description: "יצרנית רכבי יוקרה גרמנית",
    founded: 1909, 
    country: "גרמניה",
    headquarters: "אינגולשטאדט, גרמניה"
  },
  {
    id: "mclaren",
    name: "McLaren",
    logo: mclarenLogo,
    description: "יצרנית סופרקארים בריטית",
    founded: 1985,
    country: "בריטניה",
    headquarters: "וואקינג, בריטניה"
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: lamborghiniLogo,
    description: "יצרנית סופרקארים איטלקית",
    founded: 1963,
    country: "איטליה",
    headquarters: "סנט'אגטה בולוניזה, איטליה"
  },
  {
    id: "bugatti",
    name: "Bugatti",
    logo: "🔵",
    description: "יצרנית רכבי יוקרה עילית צרפתית",
    founded: 1909,
    country: "צרפת",
    headquarters: "מולסהיים, צרפת"
  },
  {
    id: "koenigsegg",
    name: "Koenigsegg",
    logo: "👑",
    description: "יצרנית סופרקארים שוודית",
    founded: 1994,
    country: "שוודיה",
    headquarters: "אנג'הולם, שוודיה"
  },
  {
    id: "toyota",
    name: "Toyota",
    logo: toyotaLogo,
    description: "יצרנית רכב יפנית מובילה עולמית",
    founded: 1937,
    country: "יפן",
    headquarters: "טויוטה, יפן"
  },
  {
    id: "honda",
    name: "Honda",
    logo: hondaLogo,
    description: "יצרנית רכב ואופנועים יפנית",
    founded: 1948,
    country: "יפן",
    headquarters: "טוקיו, יפן"
  },
  {
    id: "nissan",
    name: "Nissan",
    logo: nissanLogo,
    description: "יצרנית רכב יפנית גלובלית",
    founded: 1933,
    country: "יפן",
    headquarters: "יוקוהמה, יפן"
  },
  {
    id: "mazda",
    name: "Mazda",
    logo: mazdaLogo,
    description: "יצרנית רכב יפנית ייחודית",
    founded: 1920,
    country: "יפן",
    headquarters: "הירושימה, יפן"
  },
  {
    id: "lexus",
    name: "Lexus",
    logo: "💎",
    description: "מותג יוקרה של טויוטה",
    founded: 1989,
    country: "יפן",
    headquarters: "נגויה, יפן"
  },
  {
    id: "infiniti",
    name: "Infiniti",
    logo: "♾️",
    description: "מותג יוקרה של ניסאן",
    founded: 1989,
    country: "יפן",
    headquarters: "יוקוהמה, יפן"
  },
  {
    id: "acura",
    name: "Acura",
    logo: "🔺",
    description: "מותג יוקרה של הונדה",
    founded: 1986,
    country: "יפן",
    headquarters: "טוקיו, יפן"
  },
  {
    id: "ford",
    name: "Ford",
    logo: fordLogo,
    description: "יצרנית רכב אמריקנית היסטורית",
    founded: 1903,
    country: "ארצות הברית",
    headquarters: "דירבורן, מישיגן"
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    logo: "✖️",
    description: "מותג GM אמריקני פופולרי",
    founded: 1911,
    country: "ארצות הברית",
    headquarters: "דטרויט, מישיגן"
  },
  {
    id: "cadillac",
    name: "Cadillac",
    logo: "👑",
    description: "מותג יוקרה אמריקני של GM",
    founded: 1902,
    country: "ארצות הברית",
    headquarters: "דטרויט, מישיגן"
  },
  {
    id: "lincoln",
    name: "Lincoln",
    logo: "⭐",
    description: "מותג יוקרה של פורד",
    founded: 1917,
    country: "ארצות הברית",
    headquarters: "דירבורן, מישיגן"
  },
  {
    id: "jeep",
    name: "Jeep",
    logo: "🅙",
    description: "מותג רכבי שטח אמריקני",
    founded: 1941,
    country: "ארצות הברית",
    headquarters: "טולדו, אוהיו"
  },
  {
    id: "dodge",
    name: "Dodge",
    logo: "🐏",
    description: "מותג רכב אמריקני ספורטיבי",
    founded: 1900,
    country: "ארצות הברית",
    headquarters: "אובורן הילס, מישיגן"
  },
  {
    id: "chrysler",
    name: "Chrysler",
    logo: "🔱",
    description: "יצרנית רכב אמריקנית מסורתית",
    founded: 1925,
    country: "ארצות הברית",
    headquarters: "אובורן הילס, מישיגן"
  },
  {
    id: "ram",
    name: "Ram",
    logo: "🐏",
    description: "מותג משאיות אמריקני",
    founded: 2009,
    country: "ארצות הברית",
    headquarters: "אובורן הילס, מישיגן"
  },
  {
    id: "hyundai",
    name: "Hyundai",
    logo: hyundaiLogo,
    description: "יצרנית רכב דרום קוריאנית מובילה",
    founded: 1967,
    country: "דרום קוריאה",
    headquarters: "סיאול, דרום קוריאה"
  },
  {
    id: "kia",
    name: "Kia",
    logo: kiaLogo,
    description: "יצרנית רכב דרום קוריאנית",
    founded: 1944,
    country: "דרום קוריאה",
    headquarters: "סיאול, דרום קוריאה"
  },
  {
    id: "genesis",
    name: "Genesis",
    logo: "💎",
    description: "מותג יוקרה של יונדאי",
    founded: 2015,
    country: "דרום קוריאה",
    headquarters: "סיאול, דרום קוריאה"
  },
  {
    id: "volvo",
    name: "Volvo",
    logo: "♂️",
    description: "יצרנית רכב שוודית בטוחה",
    founded: 1927,
    country: "שוודיה",
    headquarters: "גטבורג, שוודיה"
  },
  {
    id: "saab",
    name: "Saab",
    logo: "✈️",
    description: "יצרנית רכב שוודית היסטורית",
    founded: 1945,
    country: "שוודיה",
    headquarters: "טרולהטן, שוודיה"
  },
  {
    id: "volkswagen",
    name: "Volkswagen",
    logo: volkswagenLogo,
    description: "יצרנית רכב גרמנית עממית",
    founded: 1937,
    country: "גרמניה",
    headquarters: "וולפסבורג, גרמניה"
  },
  {
    id: "land-rover",
    name: "Land Rover",
    logo: "🟢",
    description: "יצרנית רכבי שטח יוקרה בריטית",
    founded: 1948,
    country: "בריטניה",
    headquarters: "קובנטרי, בריטניה"
  },
  {
    id: "jaguar",
    name: "Jaguar",
    logo: jaguarLogo,
    description: "יצרנית רכבי יוקרה בריטית",
    founded: 1922,
    country: "בריטניה",
    headquarters: "קובנטרי, בריטניה"
  },
  {
    id: "bentley",
    name: "Bentley",
    logo: "🅱️",
    description: "יצרנית רכבי יוקרה עילית בריטית",
    founded: 1919,
    country: "בריטניה",
    headquarters: "קרו, בריטניה"
  },
  {
    id: "rolls-royce",
    name: "Rolls-Royce",
    logo: "👑",
    description: "יצרנית רכבי יוקרה עילית בריטית",
    founded: 1904,
    country: "בריטניה",
    headquarters: "גודווד, בריטניה"
  },
  {
    id: "aston-martin",
    name: "Aston Martin",
    logo: "🦅",
    description: "יצרנית רכבי ספורט יוקרה בריטית",
    founded: 1913,
    country: "בריטניה",
    headquarters: "גידון, בריטניה"
  },
  {
    id: "mini",
    name: "MINI",
    logo: "⚫",
    description: "מותג רכב קטן איקוני בריטי",
    founded: 1959,
    country: "בריטניה",
    headquarters: "אוקספורד, בריטניה"
  },
  {
    id: "lotus",
    name: "Lotus",
    logo: "🌸",
    description: "יצרנית רכבי ספורט בריטית",
    founded: 1948,
    country: "בריטניה",
    headquarters: "היתל, בריטניה"
  },
  {
    id: "subaru",
    name: "Subaru",
    logo: subaruLogo,
    description: "יצרנית רכב יפנית ייחודית",
    founded: 1953,
    country: "יפן",
    headquarters: "טוקיו, יפן"
  },
  {
    id: "mitsubishi",
    name: "Mitsubishi",
    logo: "🔺",
    description: "יצרנית רכב יפנית היסטורית",
    founded: 1970,
    country: "יפן",
    headquarters: "טוקיו, יפן"
  },
  {
    id: "suzuki",
    name: "Suzuki",
    logo: "🅂",
    description: "יצרנית רכב ואופנועים יפנית",
    founded: 1909,
    country: "יפן",
    headquarters: "המאמאצו, יפן"
  },
  {
    id: "isuzu",
    name: "Isuzu",
    logo: "🅸",
    description: "יצרנית משאיות ורכב מסחרי יפנית",
    founded: 1916,
    country: "יפן",
    headquarters: "טוקיו, יפן"
  },
  {
    id: "daihatsu",
    name: "Daihatsu",
    logo: "🔸",
    description: "יצרנית רכבי עיר יפנית",
    founded: 1907,
    country: "יפן",
    headquarters: "אוסקה, יפן"
  },
  {
    id: "geely",
    name: "Geely",
    logo: "🟡",
    description: "יצרנית רכב סינית מתפתחת",
    founded: 1986,
    country: "סין",
    headquarters: "הנגז'ו, סין"
  },
  {
    id: "byd",
    name: "BYD",
    logo: "🔋",
    description: "יצרנית רכבים חשמליים סינית מובילה",
    founded: 1995,
    country: "סין",
    headquarters: "שנזן, סין"
  },
  {
    id: "great-wall",
    name: "Great Wall",
    logo: "🏯",
    description: "יצרנית SUV וטנדרים סינית",
    founded: 1984,
    country: "סין",
    headquarters: "באודינג, סין"
  },
  {
    id: "maserati",
    name: "Maserati",
    logo: "🔱",
    description: "יצרנית רכבי יוקרה איטלקית",
    founded: 1914,
    country: "איטליה",
    headquarters: "מודנה, איטליה"
  },
  {
    id: "alfa-romeo",
    name: "Alfa Romeo",
    logo: "🐍",
    description: "יצרנית רכבי ספורט איטלקית",
    founded: 1910,
    country: "איטליה",
    headquarters: "טורין, איטליה"
  },
  {
    id: "polestar",
    name: "Polestar",
    logo: "⭐",
    description: "מותג רכבים חשמליים של וולוו",
    founded: 2017,
    country: "שוודיה",
    headquarters: "גטבורג, שוודיה"
  },
  {
    id: "peugeot",
    name: "Peugeot",
    logo: "🦁",
    description: "יצרנית רכב צרפתית היסטורית",
    founded: 1810,
    country: "צרפת",
    headquarters: "פריז, צרפת"
  },
  {
    id: "citroen",
    name: "Citroën",
    logo: "🔺",
    description: "יצרנית רכב צרפתית חדשנית",
    founded: 1919,
    country: "צרפת",
    headquarters: "פריז, צרפת"
  },
  {
    id: "renault",
    name: "Renault",
    logo: "💎",
    description: "יצרנית רכב צרפתית גלובלית",
    founded: 1899,
    country: "צרפת",
    headquarters: "בולון-ביאנקור, צרפת"
  },
  {
    id: "dacia",
    name: "Dacia",
    logo: "🛡️",
    description: "מותג רכב רומני של רנו",
    founded: 1966,
    country: "רומניה",
    headquarters: "מיובני, רומניה"
  },
  {
    id: "fiat",
    name: "Fiat",
    logo: "🔴",
    description: "יצרנית רכב איטלקית עממית",
    founded: 1899,
    country: "איטליה",
    headquarters: "טורין, איטליה"
  },
  {
    id: "opel",
    name: "Opel",
    logo: "⚡",
    description: "יצרנית רכב גרמנית של PSA",
    founded: 1862,
    country: "גרמניה",
    headquarters: "רוסלסהיים, גרמניה"
  },
  {
    id: "seat",
    name: "SEAT",
    logo: "🔺",
    description: "מותג רכב ספרדי של VW",
    founded: 1950,
    country: "ספרד",
    headquarters: "מרטורל, ספרד"
  },
  {
    id: "lada",
    name: "Lada",
    logo: "⛵",
    description: "יצרנית רכב רוסית",
    founded: 1966,
    country: "רוסיה",
    headquarters: "טוליאטי, רוסיה"
  },
  {
    id: "gmc",
    name: "GMC",
    logo: "🔷",
    description: "מותג משאיות ו-SUV של GM",
    founded: 1901,
    country: "ארצות הברית",
    headquarters: "דטרויט, מישיגן"
  },
  {
    id: "buick",
    name: "Buick",
    logo: "🔷",
    description: "מותג יוקרה אמריקני של GM",
    founded: 1903,
    country: "ארצות הברית",
    headquarters: "דטרויט, מישיגן"
  },
  {
    id: "rivian",
    name: "Rivian",
    logo: "🔋",
    description: "יצרנית רכבים חשמליים אמריקנית",
    founded: 2009,
    country: "ארצות הברית",
    headquarters: "פליסנט פריירי, איליניוס"
  },
  {
    id: "lucid",
    name: "Lucid Motors",
    logo: "💎",
    description: "יצרנית רכבי יוקרה חשמליים",
    founded: 2007,
    country: "ארצות הברית",
    headquarters: "נווארק, קליפורניה"
  },
  {
    id: "nio",
    name: "NIO",
    logo: "🔵",
    description: "יצרנית רכבים חשמליים סינית פרמיום",
    founded: 2014,
    country: "סין",
    headquarters: "שנגחאי, סין"
  },
  {
    id: "xpeng",
    name: "XPeng",
    logo: "❌",
    description: "יצרנית רכבים חשמליים חכמים סינית",
    founded: 2014,
    country: "סין",
    headquarters: "גואנגז'ו, סין"
  },
  {
    id: "haval",
    name: "Haval",
    logo: "🏔️",
    description: "מותג SUV של Great Wall Motors",
    founded: 2013,
    country: "סין",
    headquarters: "באודינג, סין"
  },
  {
    id: "chery",
    name: "Chery",
    logo: "🔴",
    description: "יצרנית רכב סינית גלובלית",
    founded: 1997,
    country: "סין",
    headquarters: "ווהו, סין"
  },
  {
    id: "mg",
    name: "MG",
    logo: "🏁",
    description: "מותג רכב בריטי-סיני",
    founded: 1924,
    country: "בריטניה/סין",
    headquarters: "לונדון, בריטניה"
  },
  {
    id: "tata",
    name: "Tata Motors",
    logo: "🔵",
    description: "יצרנית רכב הודית גדולה",
    founded: 1945,
    country: "הודו",
    headquarters: "מומבאי, הודו"
  },
  {
    id: "mahindra",
    name: "Mahindra",
    logo: "🔺",
    description: "יצרנית רכב ומשאיות הודית",
    founded: 1945,
    country: "הודו",
    headquarters: "מומבאי, הודו"
  }
];

export const expandedCarsDatabase: ExtendedCarDetails[] = [
  {
    id: "ferrari-488-gtb",
    name: "488 GTB",
    brand: "Ferrari",
    year: 2024,
    type: "מכונית ספורט",
    image: ferrariImage,
    price: "$280,000",
    rating: 4.8,
    isElectric: false,
    isNew: false,
    description: "פרארי 488 GTB מייצגת את פסגת ההנדסה האיטלקית, משלבת ביצועים עוצרי נשימה עם עיצוב מדהים.",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      acceleration: "0-100 קמ״ש ב-3.0 שניות",
      topSpeed: "330 קמ״ש",
      fuel: "16/22 mpg",
      weight: "1,475 ק״ג",
      power: 661,
      torque: "560 lb-ft",
      drivetrain: "הנעה אחורית",
      seating: 2,
      cargo: "230 ליטר",
      price: "₪1,036,000"
    },
    features: [
      "בקרת משיכה מתקדמת",
      "בולמים מגנטיים",
      "פאנלי מרכב מסיבי פחמן",
      "בלמי פחמן ברמבו",
      "פנים מאלקנטרה",
      "מערכת פרארי Dynamic Enhancer"
    ],
    pros: [
      "ביצועים ותאוצה מדהימים",
      "עיצוב איטלקי מרהיב", 
      "היגוי מדויק ומערכת הפעלה",
      "בלעדיות ויוקרת המותג"
    ],
    cons: [
      "מחיר גבוה מאוד לרכישה ותחזוקה",
      "פרקטיכות מוגבלת לשימוש יומיומי",
      "צריכת דלק גבוהה",
      "עלויות ביטוח יקרות"
    ],
    colors: [
      { name: "אדום פרארי", hex: "#DC143C" },
      { name: "שחור מטאלי", hex: "#2C2C2C" },
      { name: "לבן פרל", hex: "#F8F8FF" },
      { name: "כחול נייבי", hex: "#191970" },
      { name: "כסף מטאלי", hex: "#C0C0C0" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1C1C1C" },
      { name: "אדום", hex: "#8B0000" },
      { name: "חום", hex: "#8B4513" },
      { name: "בז׳", hex: "#F5F5DC" }
    ],
    dealerships: [
      {
        name: "פרארי תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-0123",
        website: "www.ferrari-telaviv.co.il"
      },
      {
        name: "פרארי חיפה",
        location: "חיפה, ישראל", 
        phone: "04-555-0456",
        website: "www.ferrari-haifa.co.il"
      }
    ]
  },
  {
    id: "tesla-model-s-plaid",
    name: "Model S Plaid",
    brand: "Tesla",
    year: 2024,
    type: "רכב חשמלי",
    image: teslaImage,
    price: "₪499,500",
    rating: 4.6,
    isElectric: true,
    isNew: true,
    description: "טסלה מודל S פלייד מגדירה מחדש את הביצועים החשמליים עם מערך שלושה מנועים וטכנולוגיה מהפכנית.",
    specs: {
      engine: "שלושה מנועים חשמליים",
      transmission: "חד-מהירות",
      acceleration: "0-100 קמ״ש ב-1.9 שניות",
      topSpeed: "320 קמ״ש",
      fuel: "120 MPGe",
      weight: "2,162 ק״ג", 
      power: 1020,
      torque: "1,050 lb-ft",
      drivetrain: "4X4",
      seating: 5,
      cargo: "793 ליטר",
      price: "₪499,500"
    },
    features: [
      "אוטופיילוט לנהיגה עצמית מלאה",
      "מסך מגע 17 אינץ׳",
      "מערכת שמע פרימיום",
      "עדכונים אוויריים",
      "גישה לרשת סופרצ׳ארג׳ר",
      "סינון אוויר HEPA"
    ],
    pros: [
      "תאוצה וביצועים מדהימים",
      "תכונות טכנולוגיה מתקדמות",
      "אפס פליטות",
      "עלויות תפעול נמוכות"
    ],
    cons: [
      "חוסר עקביות באיכות הבנייה",
      "רשת שירות מוגבלת",
      "תיקונים יקרים מחוץ לאחריות",
      "חרדת טווח בנסיעות ארוכות"
    ],
    colors: [
      { name: "לבן פרל", hex: "#FFFFFF" },
      { name: "שחור מוצק", hex: "#000000" },
      { name: "כחול עמוק", hex: "#1E3A8A" },
      { name: "אדום רב-שכבתי", hex: "#991B1B" },
      { name: "כסף מטאלי", hex: "#9CA3AF" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1F2937" },
      { name: "לבן", hex: "#F9FAFB" },
      { name: "קרם", hex: "#FEF3C7" }
    ],
    dealerships: [
      {
        name: "טסלה תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-0789",
        website: "www.tesla.com"
      },
      {
        name: "טסלה חיפה",
        location: "חיפה, ישראל",
        phone: "04-555-0321",
        website: "www.tesla.com"
      }
    ]
  },
  {
    id: "porsche-911-turbo-s",
    name: "911 Turbo S",
    brand: "Porsche",
    year: 2024,
    type: "מכונית ספורט", 
    image: porscheImage,
    price: "$230,000",
    rating: 4.9,
    isElectric: false,
    isNew: false,
    description: "פורשה 911 טורבו S ממשיכה את המורשת האיקונית של ה-911, מעניקה ביצועים יוצאי דופן ושימושיות יומיומית.",
    specs: {
      engine: "3.8L Twin-Turbo Flat-6",
      transmission: "8-Speed PDK",
      acceleration: "0-100 קמ״ש ב-2.6 שניות", 
      topSpeed: "330 קמ״ש",
      fuel: "18/24 mpg",
      weight: "1,650 ק״ג",
      power: 640,
      torque: "590 lb-ft",
      drivetrain: "4X4",
      seating: 4,
      cargo: "132 ליטר",
      price: "$230,000"
    },
    features: [
      "ניהול יציבות פורשה",
      "חבילת ספורט כרונו",
      "מתלים פעילים",
      "מערכת פליטה ספורטיבית",
      "פנסי LED מטריקס",
      "ניהול תקשורת פורשה"
    ],
    pros: [
      "איזון מושלם בין ביצועים ונוחות",
      "עיצוב ומורשת אייקוניים", 
      "איכות בנייה מעולה",
      "ערך מכירה חוזר חזק"
    ],
    cons: [
      "אופציות והתאמה אישית יקרות",
      "מקום מוגבל במושב האחורי",
      "עלויות תחזוקה גבוהות",
      "רעש דרך במהירויות כביש מהיר"
    ],
    colors: [
      { name: "שחור ג׳ט", hex: "#0F172A" },
      { name: "לבן קרח", hex: "#F8FAFC" },
      { name: "כסף GT", hex: "#64748B" },
      { name: "כחול ספיר", hex: "#1E40AF" },
      { name: "אדום קרמין", hex: "#DC2626" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1F2937" },
      { name: "אדום", hex: "#B91C1C" },
      { name: "חום סדל", hex: "#92400E" },
      { name: "בז׳", hex: "#A3A3A3" }
    ],
    dealerships: [
      {
        name: "פורשה תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-0654",
        website: "www.porsche-telaviv.co.il"
      },
      {
        name: "פורשה חיפה",
        location: "חיפה, ישראל",
        phone: "04-555-0987",
        website: "www.porsche-haifa.co.il"
      }
    ]
  },
  {
    id: "bmw-m3-competition",
    name: "M3 Competition",
    brand: "BMW",
    year: 2024,
    type: "רכב ספורט יוקרה",
    image: bmwImage,
    price: "$85,000",
    rating: 4.7,
    isElectric: false,
    isNew: true,
    description: "ב.מ.וו M3 קומפטישיון משלבת נהיגה ספורטיבית עם נוחות יומיומית ברמה הגבוהה ביותר.",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      transmission: "8-Speed Automatic",
      acceleration: "0-100 קמ״ש ב-3.9 שניות",
      topSpeed: "290 קמ״ש",
      fuel: "16/23 mpg",
      weight: "1,730 ק״ג",
      power: 503,
      torque: "479 lb-ft",
      drivetrain: "הנעה אחורית",
      seating: 5,
      cargo: "480 ליטר",
      price: "$85,000"
    },
    features: [
      "מתלי M אדפטיביים",
      "מערכת M דרייב",
      "בלמי M ספורט",
      "פנים M ספורט",
      "מערכת פליטה M",
      "צמיגי רכיבה ספורטיבית"
    ],
    pros: [
      "ביצועי נהיגה מרשימים",
      "איזון טוב בין ספורט לנוחות",
      "איכות בנייה גרמנית",
      "טכנולוגיה מתקדמת"
    ],
    cons: [
      "מחיר גבוה לאופציות",
      "צריכת דלק גבוהה",
      "עלויות תחזוקה",
      "קושיחות מתלים"
    ],
    colors: [
      { name: "לבן אלפיין", hex: "#FFFFFF" },
      { name: "שחור ספיר", hex: "#1A1A1A" },
      { name: "כחול M", hex: "#0066CC" },
      { name: "אפור מינרל", hex: "#808080" },
      { name: "אדום מלבורן", hex: "#8B0000" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#000000" },
      { name: "אדום M", hex: "#DC143C" },
      { name: "חום קוניאק", hex: "#8B4513" }
    ],
    dealerships: [
      {
        name: "ב.מ.וו תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-1234",
        website: "www.bmw-telaviv.co.il"
      }
    ]
  },
  {
    id: "mercedes-amg-gt-63s",
    name: "AMG GT 63 S",
    brand: "Mercedes-Benz",
    year: 2024,
    type: "קופה ספורטיבי יוקרה",
    image: mercedesImage,
    price: "$165,000",
    rating: 4.8,
    isElectric: false,
    isNew: true,
    description: "מרצדס AMG GT 63 S משלבת ביצועי סופרקאר עם יוקרה ונוחות של מרצדס.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      transmission: "9G-DCT AMG",
      acceleration: "0-100 קמ״ש ב-3.2 שניות",
      topSpeed: "315 קמ״ש",
      fuel: "15/21 mpg",
      weight: "1,855 ק״ג",
      power: 630,
      torque: "664 lb-ft",
      drivetrain: "4MATIC+",
      seating: 4,
      cargo: "350 ליטר",
      price: "$165,000"
    },
    features: [
      "מתלי AMG אדפטיביים",
      "מערכת AMG דיינמיק סלקט",
      "בלמי AMG ביצועים",
      "פנים AMG",
      "מערכת פליטה AMG",
      "MBUX עם AMG ספציפי"
    ],
    pros: [
      "ביצועים יוצאי דופן",
      "יוקרה ונוחות מרצדס",
      "איכות בנייה גבוהה",
      "עיצוב אגרסיבי ויפה"
    ],
    cons: [
      "מחיר גבוה מאוד",
      "צריכת דלק גבוהה",
      "רגישות לתנאי דרך",
      "מתלים קשיחים"
    ],
    colors: [
      { name: "כסף איריזיום", hex: "#C0C0C0" },
      { name: "שחור אובסידיאן", hex: "#36454F" },
      { name: "לבן פולר", hex: "#FFFFF0" },
      { name: "אדום יופיטר", hex: "#CC0000" },
      { name: "כחול בריליאנט", hex: "#0047AB" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#000000" },
      { name: "אדום", hex: "#8B0000" },
      { name: "חום אספרסו", hex: "#6F4E37" },
      { name: "בז׳ מגנוליה", hex: "#F8F4E6" }
    ],
    dealerships: [
      {
        name: "מרצדס-בנץ תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-5678",
        website: "www.mercedes-telaviv.co.il"
      }
    ]
  },
  {
    id: "audi-rs6-avant",
    name: "RS6 Avant",
    brand: "Audi",
    year: 2024,
    type: "סטיישן וואגון ביצועים",
    image: audiImage,
    price: "$125,000",
    rating: 4.6,
    isElectric: false,
    isNew: false,
    description: "אאודי RS6 אוונט מעניקה ביצועי סופרקאר עם פרקטיכות של רכב משפחתי.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      transmission: "8-Speed Tiptronic",
      acceleration: "0-100 קמ״ש ב-3.6 שניות",
      topSpeed: "305 קמ״ש",
      fuel: "17/24 mpg",
      weight: "2,065 ק״ג",
      power: 591,
      torque: "590 lb-ft",
      drivetrain: "Quattro AWD",
      seating: 5,
      cargo: "565 ליטר",
      price: "$125,000"
    },
    features: [
      "מתלים אוויריים אדפטיביים",
      "מערכת RS ספורט",
      "בלמי קרמיקה",
      "פנים RS ספורט",
      "מערכת פליטה RS",
      "Virtual Cockpit Plus"
    ],
    pros: [
      "שילב ייחודי של ביצועים ופרקטיכות",
      "איכות פנים גבוהה",
      "מערכת הנעה מעולה",
      "נוחות נסיעה טובה"
    ],
    cons: [
      "מחיר גבוה",
      "צריכת דלק גבוהה",
      "עלויות תחזוקה אאודי",
      "מורכבות טכנולוגיה"
    ],
    colors: [
      { name: "אפור נרדו", hex: "#686868" },
      { name: "שחור מיתוס", hex: "#0D1117" },
      { name: "לבן קרחוני", hex: "#F0F8FF" },
      { name: "כחול נוגארו", hex: "#1B4D72" },
      { name: "אדום טנגו", hex: "#FF4500" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#1C1C1C" },
      { name: "אדום", hex: "#B22222" },
      { name: "חום רוקה", hex: "#8B7355" }
    ],
    dealerships: [
      {
        name: "אאודי תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-9876",
        website: "www.audi-telaviv.co.il"
      }
    ]
  },
  {
    id: "mclaren-720s",
    name: "720S",
    brand: "McLaren",
    year: 2024,
    type: "סופרקאר",
    image: mclarenImage,
    price: "$315,000",
    rating: 4.9,
    isElectric: false,
    isNew: false,
    description: "מקלארן 720S מציעה ביצועים קיצוניים עם טכנולוגיה מתקדמת של פורמולה 1.",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      transmission: "7-Speed SSG",
      acceleration: "0-100 קמ״ש ב-2.9 שניות",
      topSpeed: "341 קמ״ש",
      fuel: "15/22 mpg",
      weight: "1,419 ק״ג",
      power: 710,
      torque: "568 lb-ft",
      drivetrain: "הנעה אחורית",
      seating: 2,
      cargo: "150 ליטר",
      price: "$315,000"
    },
    features: [
      "מתלי אדפטיביים פרואקטיב",
      "מערכת בקרת יציבות",
      "בלמי קרבון סרמיק",
      "דלתות דיהדרל",
      "מערכת פליטה פעילה",
      "מסך מידע נהג"
    ],
    pros: [
      "ביצועים מדהימים",
      "טכנולוגיה מתקדמת",
      "עיצוב עוצר נשימה",
      "חוויית נהיגה יוצאת דופן"
    ],
    cons: [
      "מחיר קיצוני",
      "אמינות בעייתית",
      "עלויות תחזוקה גבוהות מאוד",
      "פרקטיכות אפסית"
    ],
    colors: [
      { name: "כתום מקלארן", hex: "#FF8C00" },
      { name: "שחור ג׳ט", hex: "#343434" },
      { name: "כחל אטלנטיק", hex: "#1F4E79" },
      { name: "לבן יהלום", hex: "#F5F5F5" },
      { name: "אדום אדרנלין", hex: "#DC143C" }
    ],
    interiorColors: [
      { name: "שחור אלקנטרה", hex: "#2F2F2F" },
      { name: "כתום", hex: "#FF8C00" },
      { name: "חום קרבון", hex: "#654321" }
    ],
    dealerships: [
      {
        name: "מקלארן תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-2468",
        website: "www.mclaren-telaviv.co.il"
      }
    ]
  },
  {
    id: "lamborghini-huracan-evo",
    name: "Huracán EVO",
    brand: "Lamborghini", 
    year: 2024,
    type: "סופרקאר",
    image: lamborghiniImage,
    price: "$275,000",
    rating: 4.8,
    isElectric: false,
    isNew: true,
    description: "למבורגיני הוראקן EVO מציעה ביצועים דרמטיים עם עיצוב איטלקי מרהיב.",
    specs: {
      engine: "5.2L V10",
      transmission: "7-Speed Dual-Clutch",
      acceleration: "0-100 קמ״ש ב-2.9 שניות",
      topSpeed: "325 קמ״ש",
      fuel: "13/18 mpg",
      weight: "1,422 ק״ג",
      power: 631,
      torque: "443 lb-ft",
      drivetrain: "4X4",
      seating: 2,
      cargo: "100 ליטר",
      price: "$275,000"
    },
    features: [
      "מערכת LDVI",
      "בקרת יציבות למבו",
      "מתלי מגנט-ריאולוגיים",
      "בלמי קרבון-קרמיים",
      "מערכת פליטה מותאמת",
      "HMI עם Apple CarPlay"
    ],
    pros: [
      "קול מנוע V10 מדהים",
      "עיצוב אגרסיבי ויפה",
      "ביצועים יוצאי דופן",
      "חוויית נהיגה אמוציונלית"
    ],
    cons: [
      "מחיר גבוה מאוד",
      "פרקטיכות מוגבלת",
      "צריכת דלק גבוהה",
      "עלויות תחזוקה קיצוניות"
    ],
    colors: [
      { name: "ירק הוראקן", hex: "#228B22" },
      { name: "כתום ארנציו", hex: "#FF4500" },
      { name: "צהוב ג׳יאלו", hex: "#FFD700" },
      { name: "שחור נרו", hex: "#1C1C1C" },
      { name: "לבן ביאנקו", hex: "#FFFAFA" }
    ],
    interiorColors: [
      { name: "שחור", hex: "#000000" },
      { name: "אדום רוסו", hex: "#DC143C" },
      { name: "כתום", hex: "#FF8C00" },
      { name: "בז׳", hex: "#F5F5DC" }
    ],
    dealerships: [
      {
        name: "למבורגיני תל אביב",
        location: "תל אביב, ישראל",
        phone: "03-555-1357",
        website: "www.lamborghini-telaviv.co.il"
      }
    ]
  }
];

export const newsArticles = [
  {
    id: 1,
    title: "טסלה חושפת טכנולוגיית סוללות מהפכנית לשנת 2025",
    excerpt: "טכנולוגיית 4680 החדשה מבטיחה טווח של 50% יותר וטעינה מהירה יותר עבור הדור הבא של רכבים חשמליים",
    content: "בכנס המשקיעים השנתי של טסלה, חשפה החברה את הדור הבא של סוללות 4680 שיהפוך את הרכבים החשמליים ליעילים ונגישים יותר מאי פעם.",
    category: "חשמלי",
    date: "2024-01-20",
    readTime: "5 דקות קריאה",
    author: "מיכל רוזן",
    image: teslaImage,
    carBrand: "Tesla",
    trending: true
  },
  {
    id: 2,
    title: "פרארי מכריזה על חזרה למירוץ לה מאן 2024",
    excerpt: "יצרנית הסופרקארים האיטלקית מאשרת את השתתפותה במירוץ 24 השעות המפורסם אחרי הפסקה של 50 שנה",
    category: "מירוצים",
    date: "2024-01-18",
    readTime: "3 דקות קריאה",
    author: "דוד שטיין",
    image: ferrariImage,
    carBrand: "Ferrari"
  },
  {
    id: 3,
    title: "פורשה 911 היברידי: עתיד מכוניות הספורט",
    excerpt: "פורשה חושפת פרטים על מערכת ההנעה ההיברידית החדשה עבור סדרת ה-911 האיקונית",
    category: "טכנולוגיה", 
    date: "2024-01-16",
    readTime: "4 דקות קריאה",
    author: "שרון כהן",
    image: porscheImage,
    carBrand: "Porsche"
  },
  {
    id: 4,
    title: "ב.מ.וו מציגה את הדגמים החשמליים החדשים לשנת 2024",
    excerpt: "סדרת iX וi4 מקבלות שדרוגים משמעותיים בטווח, ביצועים וטכנולוגיית נהיגה אוטונומית",
    category: "חשמלי",
    date: "2024-01-14",
    readTime: "6 דקות קריאה", 
    author: "אלון נחמני",
    image: bmwImage,
    carBrand: "BMW"
  },
  {
    id: 5,
    title: "מקלארן 720S מקבלת עדכון מיוחד לשנת 2024",
    excerpt: "הסופרקאר הבריטי מקבל שדרוגים אירודינמיים ושיפורי ביצועים משמעותיים",
    category: "ביקורות",
    date: "2024-01-12",
    readTime: "4 דקות קריאה",
    author: "רונית לוי",
    image: mclarenImage,
    carBrand: "McLaren"
  }
];