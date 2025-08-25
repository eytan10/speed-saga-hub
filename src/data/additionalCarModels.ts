// Additional car models for brands that were missing from the main database
import toyotaCamry from "@/assets/toyota-camry-2024.jpg";
import toyotaCorolla from "@/assets/toyota-corolla.jpg";
import toyotaRav4 from "@/assets/toyota-rav4.jpg";
import toyotaHighlander from "@/assets/toyota-highlander.jpg";
import toyota4Runner from "@/assets/toyota-4runner.jpg";
import toyotaLandCruiser from "@/assets/toyota-land-cruiser.jpg";
import toyotaPrado from "@/assets/toyota-prado.jpg";
import toyotaHilux from "@/assets/toyota-hilux.jpg";
import toyotaTacoma from "@/assets/toyota-tacoma.jpg";
import toyotaTundra from "@/assets/toyota-tundra.jpg";
import toyotaSupra from "@/assets/toyota-supra.jpg";
import toyota86 from "@/assets/toyota-86.jpg";
import toyotaYaris from "@/assets/toyota-yaris.jpg";
import toyotaAvalon from "@/assets/toyota-avalon.jpg";
import toyotaPriusWhite from "@/assets/toyota-prius-white.jpg";
import hondaCivicBlue from "@/assets/honda-civic-blue.jpg";
import hondaAccord from "@/assets/honda-accord.jpg";
import hondaCrv from "@/assets/honda-crv.jpg";
import hondaPilot from "@/assets/honda-pilot.jpg";
import hondaPassport from "@/assets/honda-passport.jpg";
import hondaRidgeline from "@/assets/honda-ridgeline.jpg";
import hondaHrv from "@/assets/honda-hrv.jpg";
import hondaFit from "@/assets/honda-fit.jpg";
import hondaInsight from "@/assets/honda-insight.jpg";
import hondaNsx from "@/assets/honda-nsx.jpg";
import hondaS2000 from "@/assets/honda-s2000.jpg";
import hondaTypeR from "@/assets/honda-civic-type-r-2024.jpg";
import nissanAltima from "@/assets/nissan-altima.jpg";
import nissanSentra from "@/assets/nissan-sentra.jpg";
import nissanRogue from "@/assets/nissan-rogue.jpg";
import nissanMurano from "@/assets/nissan-murano.jpg";
import nissanPathfinder from "@/assets/nissan-pathfinder.jpg";
import nissanArmada from "@/assets/nissan-armada.jpg";
import nissanFrontier from "@/assets/nissan-frontier.jpg";
import nissanTitan from "@/assets/nissan-titan.jpg";
import nissan370z from "@/assets/nissan-370z.jpg";
import nissanGtrSilver from "@/assets/nissan-gtr-silver.jpg";
import subaruOutback from "@/assets/subaru-outback-green.jpg";
import mazdaCx5 from "@/assets/mazda-cx5-blue.jpg";

// Additional images for missing assets
import bmwM4 from "@/assets/bmw-m4.jpg";
import mclaren720sNew from "@/assets/mclaren-720s-new.jpg";
import mclaren720sOrange from "@/assets/mclaren-720s-orange.jpg";
import mclarenImage from "@/assets/mclaren-720s.jpg";

import type { ExtendedCarDetails } from "./massiveCarsDatabase";

// Helper function to create car objects with Israeli pricing
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
  description: `${brand} ${name} משלב ביצועים מרשימים עם עיצוב מתקדם ורמת נוחות גבוהה. רכב איכותי המתאים למגוון צרכים.`,
  specs: {
    engine: isElectric ? "מנוע חשמלי" : "מנוע בנזין",
    transmission: isElectric ? "חד-מהירותי" : "אוטומטי",
    acceleration: `0-100 קמ״ש תוך ${3 + Math.random() * 6} שניות`,
    topSpeed: `${180 + Math.random() * 80} קמ״ש`,
    fuel: isElectric ? `${400 + Math.random() * 200} ק״מ טווח` : `${6 + Math.random() * 4} ליטר/100 ק״מ`,
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
    "מערכת מולטימדיה",
    "מושבים מעור",
    "מיזוג אוטומטי",
    "מערכת ניווט GPS",
    "חיישני חניה",
    "מצלמת רוורס",
    "בקרת שיוט"
  ],
  pros: [
    "ביצועים מעולים",
    "עיצוב מושך",
    "רמת נוחות גבוהה",
    "טכנולוגיה מתקדמת",
    "חסכוני בדלק",
    "אמינות גבוהה"
  ],
  cons: [
    "מחיר גבוה יחסית",
    "עלויות תחזוקה",
    "זמינות חלפים",
    "תחזוקה במוסכים מורשים"
  ],
  colors: [
    { name: "שחור", hex: "#000000" },
    { name: "לבן פנינה", hex: "#F8F8FF" },
    { name: "כסף מתכתי", hex: "#C0C0C0" },
    { name: "אדום", hex: "#DC143C" },
    { name: "כחול כהה", hex: "#191970" },
    { name: "אפור גרפיט", hex: "#696969" }
  ],
  interiorColors: [
    { name: "שחור", hex: "#1C1C1C" },
    { name: "בז' בהיר", hex: "#F5F5DC" },
    { name: "חום עור", hex: "#8B4513" },
    { name: "אפור", hex: "#808080" }
  ],
  dealerships: [
    {
      name: `${brand} תל אביב`,
      location: "תל אביב, ישראל",
      phone: "03-555-0123",
      website: `${brand.toLowerCase()}-israel.co.il`
    },
    {
      name: `${brand} חיפה`,
      location: "חיפה, ישראל", 
      phone: "04-555-0456",
      website: `${brand.toLowerCase()}-haifa.co.il`
    },
    {
      name: `${brand} ירושלים`,
      location: "ירושלים, ישראל",
      phone: "02-555-0789",
      website: `${brand.toLowerCase()}-jerusalem.co.il`
    }
  ]
});

// Additional car models for missing brands and incomplete brands
export const additionalCarModels: ExtendedCarDetails[] = [
  // Toyota Models (15 models) - Converting USD to NIS with realistic Israeli prices
  createCar("toyota-camry", "Camry", "Toyota", "סדאן", "₪145,000", 203, 2024, toyotaCamry),
  createCar("toyota-corolla", "Corolla", "Toyota", "סדאן קומפקטי", "₪98,000", 139, 2024, toyotaCorolla),
  createCar("toyota-rav4", "RAV4", "Toyota", "SUV קומפקטי", "₪135,000", 203, 2024, toyotaRav4),
  createCar("toyota-highlander", "Highlander", "Toyota", "SUV גדול", "₪165,000", 295, 2024, toyotaHighlander),
  createCar("toyota-4runner", "4Runner", "Toyota", "SUV שטח", "₪155,000", 270, 2024, toyota4Runner),
  createCar("toyota-land-cruiser", "Land Cruiser", "Toyota", "SUV שטח יוקרה", "₪380,000", 381, 2024, toyotaLandCruiser),
  createCar("toyota-prado", "Land Cruiser Prado", "Toyota", "SUV שטח", "₪285,000", 163, 2024, toyotaPrado),
  createCar("toyota-hilux", "Hilux", "Toyota", "טנדר", "₪125,000", 204, 2024, toyotaHilux),
  createCar("toyota-tacoma", "Tacoma", "Toyota", "טנדר קומפקטי", "₪115,000", 278, 2024, toyotaTacoma),
  createCar("toyota-tundra", "Tundra", "Toyota", "טנדר גדול", "₪195,000", 389, 2024, toyotaTundra),
  createCar("toyota-supra", "Supra", "Toyota", "קופה ספורטיבי", "₪210,000", 382, 2024, toyotaSupra),
  createCar("toyota-86", "GR86", "Toyota", "קופה ספורטיבי", "₪125,000", 228, 2024, toyota86),
  createCar("toyota-yaris", "Yaris", "Toyota", "האצ׳בק קטן", "₪78,000", 106, 2024, toyotaYaris),
  createCar("toyota-avalon", "Avalon", "Toyota", "סדאן יוקרה", "₪155,000", 301, 2024, toyotaAvalon),
  createCar("toyota-prius", "Prius", "Toyota", "היברידי", "₪115,000", 121, 2024, toyotaPriusWhite),

  // Honda Models (12 models)
  createCar("honda-civic", "Civic", "Honda", "סדאן קומפקטי", "₪105,000", 158, 2024, hondaCivicBlue),
  createCar("honda-accord", "Accord", "Honda", "סדאן", "₪135,000", 192, 2024, hondaAccord),
  createCar("honda-cr-v", "CR-V", "Honda", "SUV קומפקטי", "₪128,000", 190, 2024, hondaCrv),
  createCar("honda-pilot", "Pilot", "Honda", "SUV גדול", "₪145,000", 280, 2024, hondaPilot),
  createCar("honda-passport", "Passport", "Honda", "SUV", "₪138,000", 280, 2024, hondaPassport),
  createCar("honda-ridgeline", "Ridgeline", "Honda", "טנדר", "₪145,000", 280, 2024, hondaRidgeline),
  createCar("honda-hr-v", "HR-V", "Honda", "SUV קטן", "₪92,000", 158, 2024, hondaHrv),
  createCar("honda-fit", "Fit", "Honda", "האצ׳בק קטן", "₪68,000", 130, 2024, hondaFit),
  createCar("honda-insight", "Insight", "Honda", "היברידי", "₪98,000", 151, 2024, hondaInsight),
  createCar("honda-nsx", "NSX", "Honda", "סופרקאר", "₪620,000", 573, 2024, hondaNsx),
  createCar("honda-s2000", "S2000", "Honda", "רודסטר ספורט", "₪185,000", 240, 2023, hondaS2000),
  createCar("honda-civic-type-r", "Civic Type R", "Honda", "האצ׳בק ספורט", "₪175,000", 315, 2024, hondaTypeR),

  // Nissan Models (10 models)
  createCar("nissan-altima", "Altima", "Nissan", "סדאן", "₪108,000", 188, 2024, nissanAltima),
  createCar("nissan-sentra", "Sentra", "Nissan", "סדאן קומפקטי", "₪85,000", 149, 2024, nissanSentra),
  createCar("nissan-rogue", "Rogue", "Nissan", "SUV קומפקטי", "₪115,000", 181, 2024, nissanRogue),
  createCar("nissan-murano", "Murano", "Nissan", "SUV", "₪145,000", 260, 2024, nissanMurano),
  createCar("nissan-pathfinder", "Pathfinder", "Nissan", "SUV גדול", "₪158,000", 284, 2024, nissanPathfinder),
  createCar("nissan-armada", "Armada", "Nissan", "SUV גדול", "₪195,000", 400, 2024, nissanArmada),
  createCar("nissan-frontier", "Frontier", "Nissan", "טנדר קומפקטי", "₪125,000", 310, 2024, nissanFrontier),
  createCar("nissan-titan", "Titan", "Nissan", "טנדר גדול", "₪165,000", 400, 2024, nissanTitan),
  createCar("nissan-370z", "370Z", "Nissan", "קופה ספורטיבי", "₪155,000", 332, 2024, nissan370z),
  createCar("nissan-gt-r", "GT-R", "Nissan", "סופרקאר", "₪485,000", 565, 2024, nissanGtrSilver),

  // Subaru Models (6 models)
  createCar("subaru-outback", "Outback", "Subaru", "סטיישן וואגון שטח", "₪145,000", 182, 2024, subaruOutback),
  createCar("subaru-forester", "Forester", "Subaru", "SUV קומפקטי", "₪115,000", 182, 2024, mazdaCx5),
  createCar("subaru-ascent", "Ascent", "Subaru", "SUV גדול", "₪145,000", 260, 2024, subaruOutback),
  createCar("subaru-impreza", "Impreza", "Subaru", "האצ׳בק", "₪95,000", 152, 2024, hondaCivicBlue),
  createCar("subaru-legacy", "Legacy", "Subaru", "סדאן", "₪105,000", 182, 2024, hondaAccord),
  createCar("subaru-wrx", "WRX", "Subaru", "סדאן ספורט", "₪145,000", 271, 2024, nissanAltima),

  // Mazda Models (8 models)
  createCar("mazda-cx-5", "CX-5", "Mazda", "SUV קומפקטי", "₪125,000", 187, 2024, mazdaCx5),
  createCar("mazda-cx-9", "CX-9", "Mazda", "SUV גדול", "₪155,000", 227, 2024, subaruOutback),
  createCar("mazda-3", "Mazda3", "Mazda", "האצ׳בק", "₪88,000", 186, 2024, hondaCivicBlue),
  createCar("mazda-6", "Mazda6", "Mazda", "סדאן", "₪115,000", 227, 2024, hondaAccord),
  createCar("mazda-cx-30", "CX-30", "Mazda", "SUV קטן", "₪98,000", 186, 2024, hondaHrv),
  createCar("mazda-cx-50", "CX-50", "Mazda", "SUV קומפקטי", "₪135,000", 227, 2024, mazdaCx5),
  createCar("mazda-mx-5", "MX-5 Miata", "Mazda", "רודסטר", "₪125,000", 181, 2024, bmwM4),
  createCar("mazda-rx-8", "RX-8", "Mazda", "קופה ספורט", "₪165,000", 232, 2023, hondaS2000),

  // McLaren Models (8 models) - Convert to NIS with luxury pricing
  createCar("mclaren-720s", "720S", "McLaren", "סופרקאר", "₪1,350,000", 710, 2024, mclaren720sNew),
  createCar("mclaren-750s", "750S", "McLaren", "סופרקאר", "₪1,450,000", 740, 2024, mclaren720sOrange, false, true),
  createCar("mclaren-artura", "Artura", "McLaren", "סופרקאר היברידי", "₪1,100,000", 671, 2024, mclarenImage),
  createCar("mclaren-gt", "GT", "McLaren", "GT יוקרה", "₪925,000", 612, 2024, mclaren720sNew),
  createCar("mclaren-765lt", "765LT", "McLaren", "מכונית מסלול", "₪1,650,000", 755, 2024, mclaren720sOrange),
  createCar("mclaren-p1", "P1", "McLaren", "היפרקאר", "₪4,800,000", 903, 2023, mclarenImage),
  createCar("mclaren-senna", "Senna", "McLaren", "מכונית מסלול", "₪3,850,000", 789, 2023, mclaren720sOrange),
  createCar("mclaren-speedtail", "Speedtail", "McLaren", "היפרקאר", "₪8,200,000", 1035, 2023, mclaren720sNew)
];

// Export brand information for the missing brands
export const additionalBrands = [
  {
    name: "Toyota",
    logo: "🚗", // Will be replaced with actual logo
    description: "יצרנית רכב יפנית מובילה, ידועה באמינות ובחדשנות בתחום הרכבים הידידותיים לסביבה.",
    established: 1937,
    country: "יפן",
    carsCount: 15
  },
  {
    name: "Honda", 
    logo: "🏎️",
    description: "יצרנית רכב יפנית איכותית המתמחה ברכבים אמינים וחסכוניים עם טכנולוגיה מתקדמת.",
    established: 1948,
    country: "יפן", 
    carsCount: 12
  },
  {
    name: "Nissan",
    logo: "⚡",
    description: "יצרנית רכב יפנית חדשנית, חלוצה בתחום הרכבים החשמליים ורכבי הספורט.",
    established: 1933,
    country: "יפן",
    carsCount: 10
  },
  {
    name: "Subaru",
    logo: "⭐",
    description: "יצרנית רכב יפנית המתמחה ברכבי שטח ובטכנולוגיית הנעה כל-גלגלית מתקדמת.",
    established: 1953,
    country: "יפן",
    carsCount: 6
  },
  {
    name: "Mazda",
    logo: "🌟",
    description: "יצרנית רכב יפנית איכותית הידועה בעיצוב מתקדם ובטכנולוגיית מנועים יעילה.",
    established: 1920,
    country: "יפן",
    carsCount: 8
  },
  {
    name: "McLaren",
    logo: "🏁",
    description: "יצרנית סופרקארים בריטית יוקרתית עם מורשת מרוצים עשירה וטכנולוגיה מתקדמת.",
    established: 1963,
    country: "בריטניה",
    carsCount: 8
  }
];