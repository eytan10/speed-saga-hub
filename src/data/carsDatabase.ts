import ferrariImage from "@/assets/ferrari-red.jpg";
import teslaImage from "@/assets/tesla-blue.jpg";
import porscheImage from "@/assets/porsche-black.jpg";

export interface CarSpecs {
  engine: string;
  transmission: string;
  acceleration: string;
  topSpeed: string;
  fuel: string;
  weight: string;
  power: number;
  torque: string;
  drivetrain: string;
}

export interface CarDetails {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: string;
  image: string;
  price: string;
  rating: number;
  isElectric?: boolean;
  description: string;
  specs: CarSpecs;
  features: string[];
  pros: string[];
  cons: string[];
  dealerships: Array<{
    name: string;
    location: string;
    phone: string;
    website: string;
  }>;
}

export const brands = [
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "🏎️",
    description: "Italian luxury sports car manufacturer",
    founded: 1947,
    country: "Italy"
  },
  {
    id: "tesla", 
    name: "Tesla",
    logo: "⚡",
    description: "American electric vehicle manufacturer",
    founded: 2003,
    country: "USA"
  },
  {
    id: "porsche",
    name: "Porsche", 
    logo: "🚗",
    description: "German luxury sports car manufacturer",
    founded: 1931,
    country: "Germany"
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "🔷",
    description: "German luxury vehicle manufacturer", 
    founded: 1916,
    country: "Germany"
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "⭐",
    description: "German luxury vehicle manufacturer",
    founded: 1926,
    country: "Germany"
  },
  {
    id: "audi",
    name: "Audi",
    logo: "🔴",
    description: "German luxury vehicle manufacturer",
    founded: 1909, 
    country: "Germany"
  }
];

export const allCars: CarDetails[] = [
  {
    id: "ferrari-488-gtb",
    name: "488 GTB",
    brand: "Ferrari",
    year: 2024,
    type: "Sports Car",
    image: ferrariImage,
    price: "₪1,036,000",
    rating: 4.8,
    isElectric: false,
    description: "The Ferrari 488 GTB represents the pinnacle of Italian engineering, combining breathtaking performance with stunning design. This mid-engine masterpiece delivers an unparalleled driving experience with its twin-turbocharged V8 engine and advanced aerodynamics.",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      acceleration: "0-60 mph in 3.0s",
      topSpeed: "205 mph",
      fuel: "16/22 mpg",
      weight: "3,252 lbs",
      power: 661,
      torque: "560 lb-ft",
      drivetrain: "RWD"
    },
    features: [
      "Advanced Traction Control",
      "Magnetic Dampers",
      "Carbon Fiber Body Panels",
      "Brembo Carbon Brakes",
      "Alcantara Interior",
      "Ferrari Dynamic Enhancer"
    ],
    pros: [
      "Incredible performance and acceleration",
      "Stunning Italian design", 
      "Precise handling and steering",
      "Exclusivity and brand prestige"
    ],
    cons: [
      "Very expensive to purchase and maintain",
      "Limited practicality for daily use",
      "High fuel consumption",
      "Expensive insurance costs"
    ],
    dealerships: [
      {
        name: "Ferrari Beverly Hills",
        location: "Beverly Hills, CA",
        phone: "(310) 555-0123",
        website: "www.ferraribeverlyhills.com"
      },
      {
        name: "Ferrari Manhattan",
        location: "New York, NY", 
        phone: "(212) 555-0456",
        website: "www.ferrarimanhattan.com"
      }
    ]
  },
  {
    id: "tesla-model-s-plaid",
    name: "Model S Plaid",
    brand: "Tesla",
    year: 2024,
    type: "Electric Sedan",
    image: teslaImage,
    price: "₪499,500",
    rating: 4.6,
    isElectric: true,
    description: "The Tesla Model S Plaid redefines electric performance with its tri-motor setup and revolutionary technology. This flagship sedan combines luxury, technology, and sustainability in one incredible package.",
    specs: {
      engine: "Tri-Motor Electric",
      transmission: "Single-Speed",
      acceleration: "0-60 mph in 1.9s",
      topSpeed: "200 mph",
      fuel: "120 MPGe",
      weight: "4,766 lbs", 
      power: 1020,
      torque: "1,050 lb-ft",
      drivetrain: "AWD"
    },
    features: [
      "Autopilot Full Self-Driving",
      "17-inch Touchscreen",
      "Premium Audio System",
      "Over-the-Air Updates",
      "Supercharger Network Access",
      "HEPA Air Filtration"
    ],
    pros: [
      "Incredible acceleration and performance",
      "Advanced technology features",
      "Zero emissions",
      "Low operating costs"
    ],
    cons: [
      "Build quality inconsistencies",
      "Limited service network",
      "Expensive repairs outside warranty",
      "Range anxiety on long trips"
    ],
    dealerships: [
      {
        name: "Tesla Los Angeles",
        location: "Los Angeles, CA",
        phone: "(424) 555-0789",
        website: "www.tesla.com"
      },
      {
        name: "Tesla Miami",
        location: "Miami, FL",
        phone: "(305) 555-0321",
        website: "www.tesla.com"
      }
    ]
  },
  {
    id: "porsche-911-turbo-s",
    name: "911 Turbo S",
    brand: "Porsche",
    year: 2024,
    type: "Sports Car", 
    image: porscheImage,
    price: "₪851,000",
    rating: 4.9,
    isElectric: false,
    description: "The Porsche 911 Turbo S continues the legacy of the iconic 911, delivering exceptional performance and daily usability. This is the ultimate expression of the 911 philosophy.",
    specs: {
      engine: "3.8L Twin-Turbo Flat-6",
      transmission: "8-Speed PDK",
      acceleration: "0-60 mph in 2.6s", 
      topSpeed: "205 mph",
      fuel: "18/24 mpg",
      weight: "3,640 lbs",
      power: 640,
      torque: "590 lb-ft",
      drivetrain: "AWD"
    },
    features: [
      "Porsche Stability Management",
      "Sport Chrono Package",
      "Active Suspension",
      "Sport Exhaust System",
      "LED Matrix Headlights",
      "Porsche Communication Management"
    ],
    pros: [
      "Perfect balance of performance and comfort",
      "Iconic design and heritage", 
      "Excellent build quality",
      "Strong resale value"
    ],
    cons: [
      "Expensive options and customization",
      "Limited rear seat space",
      "High maintenance costs",
      "Road noise at highway speeds"
    ],
    dealerships: [
      {
        name: "Porsche West Los Angeles",
        location: "West LA, CA",
        phone: "(310) 555-0654",
        website: "www.porschewestla.com"
      },
      {
        name: "Porsche Manhattan",
        location: "New York, NY",
        phone: "(212) 555-0987",
        website: "www.porscheny.com"
      }
    ]
  }
];