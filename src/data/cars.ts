import ferrariImage from "@/assets/ferrari-488-gtb-new.jpg";
import teslaImage from "@/assets/tesla-model-s-plaid-new.jpg";
import porscheImage from "@/assets/porsche-911-turbo-s-new.jpg";

export interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  type: string;
  image: string;
  price: string;
  horsepower: number;
  topSpeed: string;
  rating: number;
  isElectric?: boolean;
  description: string;
  specs: {
    engine: string;
    transmission: string;
    acceleration: string;
    fuel: string;
    weight: string;
  };
}

export const featuredCars: Car[] = [
  {
    id: "ferrari-488",
    name: "488 GTB",
    brand: "Ferrari",
    year: 2024,
    type: "Sports Car",
    image: ferrariImage,
    price: "₪1,280,000",
    horsepower: 661,
    topSpeed: "205 mph",
    rating: 4.8,
    isElectric: false,
    description: "The Ferrari 488 GTB represents the pinnacle of Italian engineering, combining breathtaking performance with stunning design.",
    specs: {
      engine: "3.9L Twin-Turbo V8",
      transmission: "7-Speed Dual-Clutch",
      acceleration: "0-60 mph in 3.0s",
      fuel: "16/22 mpg",
      weight: "3,252 lbs"
    }
  },
  {
    id: "tesla-model-s",
    name: "Model S Plaid",
    brand: "Tesla",
    year: 2024,
    type: "Electric Sedan",
    image: teslaImage,
    price: "₪420,000",
    horsepower: 1020,
    topSpeed: "200 mph",
    rating: 4.6,
    isElectric: true,
    description: "The Tesla Model S Plaid redefines electric performance with its tri-motor setup and revolutionary technology.",
    specs: {
      engine: "Tri-Motor Electric",
      transmission: "Single-Speed",
      acceleration: "0-60 mph in 1.9s",
      fuel: "120 MPGe",
      weight: "4,766 lbs"
    }
  },
  {
    id: "porsche-911",
    name: "911 Turbo S",
    brand: "Porsche",
    year: 2024,
    type: "Sports Car",
    image: porscheImage,
    price: "₪765,000",
    horsepower: 640,
    topSpeed: "205 mph",
    rating: 4.9,
    isElectric: false,
    description: "The Porsche 911 Turbo S continues the legacy of the iconic 911, delivering exceptional performance and daily usability.",
    specs: {
      engine: "3.8L Twin-Turbo Flat-6",
      transmission: "8-Speed PDK",
      acceleration: "0-60 mph in 2.6s",
      fuel: "18/24 mpg",
      weight: "3,640 lbs"
    }
  }
];

export const carCategories = [
  { name: "Sports Cars", count: 85, icon: "🏎️" },
  { name: "Electric Vehicles", count: 24, icon: "⚡" },
  { name: "Luxury Sedans", count: 18, icon: "🚗" },
  { name: "SUVs", count: 42, icon: "🚙" },
  { name: "Supercars", count: 38, icon: "🏁" },
  { name: "Classic Cars", count: 12, icon: "🚘" }
];