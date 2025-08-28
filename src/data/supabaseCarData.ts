import { supabase } from "@/integrations/supabase/client";
import { carPrices2025, getCarImage, getCarPrice } from "@/data/carPrices2025";

export interface SupabaseCarData {
  id: string;
  brand: string;
  name: string;
  year: number;
  price: string;
  image: string;
  type: string;
  rating: number;
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
    transmission: string;
    drivetrain: string;
    seating: number;
    fuelType: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
    };
    weight: string;
    trunkCapacity: string;
  };
  features: string[];
  colors: Array<{
    name: string;
    hex: string;
  }>;
  interiorColors: Array<{
    name: string;
    hex: string;
  }>;
  pros: string[];
  cons: string[];
  dealerships: Array<{
    name: string;
    address: string;
    phone: string;
    email: string;
  }>;
  isElectric: boolean;
  isNew: boolean;
  category: string;
}

// Cache for car data
let cachedCarData: SupabaseCarData[] | null = null;

export const loadCarDataFromSupabase = async (): Promise<SupabaseCarData[]> => {
  try {
    // Try to get data from Supabase Storage cars bucket
    const { data: files, error } = await supabase.storage
      .from('cars')
      .list('');

    if (error) {
      console.warn('Could not load from Supabase storage:', error);
      return getCarDataWithPrices();
    }

    // If we have files, try to load them
    if (files && files.length > 0) {
      const carDataPromises = files
        .filter(file => file.name.endsWith('.json'))
        .map(async (file) => {
          try {
            const { data, error } = await supabase.storage
              .from('cars')
              .download(file.name);

            if (error) throw error;

            const text = await data.text();
            return JSON.parse(text);
          } catch (err) {
            console.warn(`Error loading ${file.name}:`, err);
            return null;
          }
        });

      const loadedData = await Promise.all(carDataPromises);
      const validData = loadedData.filter(data => data !== null).flat();

      if (validData.length > 0) {
        cachedCarData = validData;
        return validData;
      }
    }

    // Fallback to local data with updated prices
    return getCarDataWithPrices();
  } catch (error) {
    console.warn('Error loading car data from Supabase:', error);
    return getCarDataWithPrices();
  }
};

// Fallback function that combines local car data with Israeli market prices
const getCarDataWithPrices = (): SupabaseCarData[] => {
  // Sample car data with Israeli market prices
  const sampleCars: SupabaseCarData[] = [
    {
      id: "tesla-model-3-2024",
      brand: "Tesla",
      name: "Model 3",
      year: 2024,
      price: "₪" + (getCarPrice("Tesla", "Model 3") || 280000).toLocaleString("he-IL"),
      image: getCarImage("Tesla", "Model 3") || "/api/placeholder/800/600",
      type: "סדאן חשמלי",
      rating: 4.8,
      description: "סדאן חשמלי מתקדם עם טכנולוגיה חדשנית ונהיגה אוטונומית חלקית",
      specs: {
        engine: "מנוע חשמלי",
        power: "325 כ״ס",
        acceleration: "5.8 שניות",
        topSpeed: "225 קמ״ה",
        fuelConsumption: "15 קוט״ש ל-100 ק״מ",
        transmission: "אוטומטי חד-מהירותי",
        drivetrain: "הנעה אחורית",
        seating: 5,
        fuelType: "חשמלי",
        dimensions: {
          length: "4.69 מ'",
          width: "1.85 מ'",
          height: "1.44 מ'",
          wheelbase: "2.88 מ'"
        },
        weight: "1,611 ק״ג",
        trunkCapacity: "425 ליטר"
      },
      features: [
        "נהיגה אוטונומית חלקית",
        "מסך מגע 15 אינץ'",
        "עדכוני תוכנה אלחוטיים",
        "טעינה מהירה",
        "מערכת קול פרימיום"
      ],
      colors: [
        { name: "לבן פנינה", hex: "#FFFFFF" },
        { name: "שחור מוצק", hex: "#171A20" },
        { name: "כחול כהה", hex: "#1E3A8A" },
        { name: "אדום רב-שכבתי", hex: "#DC143C" }
      ],
      interiorColors: [
        { name: "שחור", hex: "#000000" },
        { name: "לבן", hex: "#FFFFFF" }
      ],
      pros: [
        "טכנולוgia מתקדמת",
        "חסכוני מאוד בתחזוקה",
        "ביצועים מעולים",
        "עדכונים תוכנה מתמידים"
      ],
      cons: [
        "רשת שירות מוגבלת בישראל",
        "מחיר גבוה יחסית",
        "זמני טעינה ארוכים"
      ],
      dealerships: [
        {
          name: "טסלה ישראל - תל אביב",
          address: "רחוב הארבעה 34, תל אביב",
          phone: "03-6666777",
          email: "info@tesla.co.il"
        }
      ],
      isElectric: true,
      isNew: true,
      category: "חשמליים"
    },
    {
      id: "bmw-i4-m50-2024",
      brand: "BMW",
      name: "i4 M50",
      year: 2024,
      price: "₪" + (getCarPrice("BMW", "i4") || 420000).toLocaleString("he-IL"),
      image: getCarImage("BMW", "i4") || "/api/placeholder/800/600",
      type: "סדאן חשמלי ספורטיבי",
      rating: 4.7,
      description: "סדאן חשמלי ספורטיבי עם ביצועים גבוהים ועיצוב אלגנטי",
      specs: {
        engine: "מנוע חשמלי כפול",
        power: "536 כ״ס",
        acceleration: "3.9 שניות",
        topSpeed: "250 קמ״ה",
        fuelConsumption: "18 קוט״ש ל-100 ק״מ",
        transmission: "אוטומטי חד-מהירותי",
        drivetrain: "כל הגלגלים",
        seating: 5,
        fuelType: "חשמלי",
        dimensions: {
          length: "4.78 מ'",
          width: "1.85 מ'",
          height: "1.45 מ'",
          wheelbase: "2.86 מ'"
        },
        weight: "2,215 ק״ג",
        trunkCapacity: "470 ליטר"
      },
      features: [
        "מערכת iDrive 8",
        "תצוגה עילית",
        "מושבי ספורט M",
        "טעינה מהירה",
        "מערכת קול Harman Kardon"
      ],
      colors: [
        { name: "אפור סטורם", hex: "#6B7280" },
        { name: "שחור ספיר", hex: "#1F2937" },
        { name: "לבן אלפיני", hex: "#FFFFFF" },
        { name: "כחול מינרל", hex: "#2563EB" }
      ],
      interiorColors: [
        { name: "שחור", hex: "#000000" },
        { name: "קוניאק", hex: "#8B4513" }
      ],
      pros: [
        "ביצועים מרשימים",
        "איכות בנייה גבוהה",
        "טכנולוגיה מתקדמת",
        "נוחות נהיגה"
      ],
      cons: [
        "מחיר גבוה",
        "תחזוקה יקרה",
        "טווח נסיעה מוגבל"
      ],
      dealerships: [
        {
          name: "BMW ישראל - רמת השרון",
          address: "דרך השלום 15, רמת השרון",
          phone: "03-5556789",
          email: "service@bmw.co.il"
        }
      ],
      isElectric: true,
      isNew: true,
      category: "יוקרה"
    }
  ];

  return sampleCars;
};

// Export cached data or load from Supabase
export const getCarData = async (): Promise<SupabaseCarData[]> => {
  if (cachedCarData) {
    return cachedCarData;
  }
  return await loadCarDataFromSupabase();
};

// Clear cache function (useful for refreshing data)
export const clearCarDataCache = () => {
  cachedCarData = null;
};