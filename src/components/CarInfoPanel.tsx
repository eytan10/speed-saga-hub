import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Car, MapPin, Calendar, Fuel, Gauge } from "lucide-react";
import { ExtendedCarDetails } from "@/data/massiveCarsDatabase";

interface CarInfoPanelProps {
  car: ExtendedCarDetails;
}

const CarInfoPanel = ({ car }: CarInfoPanelProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Car className="h-5 w-5 mr-2 text-racing-red" />
        מידע על הרכב
      </h3>
      
      <div className="space-y-4">
        {/* Basic Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center mb-1">
              <MapPin className="h-3 w-3 mr-1" />
              יצרן
            </p>
            <p className="font-semibold">{car.brand}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">דגם</p>
            <p className="font-semibold">{car.name}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground flex items-center mb-1">
              <Calendar className="h-3 w-3 mr-1" />
              שנה
            </p>
            <p className="font-semibold">{car.year}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">סוג רכב</p>
            <p className="font-semibold">{car.type}</p>
          </div>
        </div>

        {/* Price Section */}
        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground mb-1">מחיר החל מ-</p>
          <p className="text-2xl font-bold text-racing-red">{car.price}</p>
        </div>

        {/* Performance Highlights */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <Gauge className="h-4 w-4 mr-2" />
            ביצועים עיקריים
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">כוח: </span>
              <span className="font-medium">{car.specs.power}</span>
            </div>
            <div>
              <span className="text-muted-foreground">תאוצה: </span>
              <span className="font-medium">{car.specs.acceleration}</span>
            </div>
            <div>
              <span className="text-muted-foreground">מהירות מרבית: </span>
              <span className="font-medium">{car.specs.topSpeed}</span>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center">
                <Fuel className="h-3 w-3 mr-1" />
                צריכה: 
              </span>
              <span className="font-medium">{car.specs.fuel}</span>
            </div>
          </div>
        </div>

        {/* Special Features */}
        <div className="border-t pt-4 flex flex-wrap gap-2">
          {car.isElectric && (
            <Badge className="bg-electric-blue text-white">
              <Zap className="h-3 w-3 mr-1" />
              חשמלי
            </Badge>
          )}
          {car.isNew && (
            <Badge className="bg-success text-white">
              חדש לשנת {new Date().getFullYear()}
            </Badge>
          )}
          <Badge variant="outline">{car.specs.seating} מושבים</Badge>
          <Badge variant="secondary">{car.type}</Badge>
        </div>

        {/* Quick Stats */}
        <div className="bg-secondary/20 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">דירוג:</span>
            <span className="font-semibold">⭐ {car.rating}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">משקל:</span>
            <span className="font-medium">{car.specs.weight}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">נפח מטען:</span>
            <span className="font-medium">{car.specs.cargo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CarInfoPanel;