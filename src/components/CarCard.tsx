import { Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
// import CarComparison from "./CarComparison";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

interface CarCardProps {
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
}

const CarCard = ({ car }: { car: CarCardProps }) => {
  // const [showComparison, setShowComparison] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const isCarFavorite = isFavorite(car.id);

  const handleFavoriteClick = () => {
    if (isCarFavorite) {
      removeFromFavorites(car.id);
      toast({
        title: "הוסר מהמועדפים",
        description: `${car.brand} ${car.name} הוסר מהמועדפים שלך`,
      });
    } else {
      // Convert CarCardProps to ExtendedCarDetails
      const extendedCar = {
        id: car.id,
        name: car.name,
        brand: car.brand,
        year: car.year,
        type: car.type,
        image: car.image,
        price: car.price,
        rating: car.rating,
        isElectric: car.isElectric,
        isNew: car.year >= 2023,
        description: `${car.brand} ${car.name} משלב ביצועים מעולים עם טכנולוגיה מתקדמת ועיצוב מרשים.`,
        specs: {
          engine: car.isElectric ? "מנוע חשמלי" : "2.0L-4.0L",
          transmission: car.isElectric ? "חד-מהירות" : "8-Speed Automatic",
          acceleration: `0-100 קמ״ש ב-${(3 + Math.random() * 4).toFixed(1)} שניות`,
          topSpeed: car.topSpeed,
          fuel: car.isElectric ? `${(80 + Math.random() * 40).toFixed(0)} MPGe` : `${(12 + Math.random() * 8).toFixed(0)}/${(18 + Math.random() * 10).toFixed(0)} mpg`,
          weight: `${(1200 + Math.random() * 800).toFixed(0)} ק״ג`,
          power: car.horsepower,
          torque: `${(300 + Math.random() * 400).toFixed(0)} lb-ft`,
          drivetrain: ["הנעה קדמית", "הנעה אחורית", "4X4"][Math.floor(Math.random() * 3)],
          seating: Math.ceil(2 + Math.random() * 6),
          cargo: `${(200 + Math.random() * 600).toFixed(0)} ליטר`,
          price: car.price
        },
        features: [
          "מערכת בטיחות מתקדמת",
          "מולטימדיה חכמה",
          "מזגן אוטומטי"
        ],
        pros: [
          "ביצועים מעולים",
          "איכות בנייה גבוהה", 
          "עיצוב אטרקטיבי"
        ],
        cons: [
          "מחיר גבוה",
          "עלויות תחזוקה",
          "צריכת דלק"
        ],
        colors: [
          { name: "שחור", hex: "#000000" },
          { name: "לבן", hex: "#FFFFFF" }
        ],
        interiorColors: [
          { name: "שחור", hex: "#1F2937" },
          { name: "חום", hex: "#8B4513" }
        ],
        dealerships: [
          {
            name: `${car.brand} תל אביב`,
            location: "תל אביב, ישראל",
            phone: "03-555-0123",
            website: `www.${car.brand.toLowerCase()}-telaviv.co.il`
          }
        ]
      };
      addToFavorites(extendedCar);
      toast({
        title: "נוסף למועדפים",
        description: `${car.brand} ${car.name} נוסף למועדפים שלך`,
      });
    }
  };

  return (
    <>
      <div className="car-card group">
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            className="car-image w-full h-64 object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {car.isElectric && (
              <Badge className="bg-electric-blue text-electric-blue-foreground">
                <Zap className="h-3 w-3 mr-1" />
                Electric
              </Badge>
            )}
            <Badge variant="secondary">{car.type}</Badge>
          </div>

          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white transition-all ${
              isCarFavorite ? 'text-racing-red scale-110' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }}
          >
            <Heart className={`h-4 w-4 transition-all ${isCarFavorite ? 'fill-racing-red animate-pulse' : ''}`} />
          </Button>

          {/* Overlay on hover */}
          <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
            <Button 
              className="btn-hero"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/car/${car.brand.toLowerCase().replace(/[^a-z]/g, '')}/${car.id}`;
              }}
            >
              צפה בפרטים
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground">
              {car.brand} {car.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              {car.rating}
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{car.year}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-muted-foreground">כוח</p>
              <p className="font-semibold">{car.horsepower} כ״ס</p>
            </div>
            <div>
              <p className="text-muted-foreground">מהירות מרבית</p>
              <p className="font-semibold">{car.topSpeed}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">מחיר התחלתי</p>
              <p className="text-xl font-bold text-racing-red">{car.price}</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default CarCard;