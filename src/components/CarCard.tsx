import { Heart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  return (
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
          className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <Button className="btn-hero">
            View Details
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
            <p className="text-muted-foreground">Power</p>
            <p className="font-semibold">{car.horsepower} HP</p>
          </div>
          <div>
            <p className="text-muted-foreground">Top Speed</p>
            <p className="font-semibold">{car.topSpeed}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting at</p>
            <p className="text-xl font-bold text-racing-red">{car.price}</p>
          </div>
          <Button variant="outline" size="sm">
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;