import { useState } from "react";
import { X, Star, Zap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { massiveCarsDatabase, ExtendedCarDetails } from "@/data/massiveCarsDatabase";

interface CarComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  initialCar?: ExtendedCarDetails;
}

const CarComparison = ({ isOpen, onClose, initialCar }: CarComparisonProps) => {
  const [car1, setCar1] = useState<ExtendedCarDetails | null>(initialCar || null);
  const [car2, setCar2] = useState<ExtendedCarDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const availableCars = massiveCarsDatabase.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectCar = (car: ExtendedCarDetails) => {
    if (!car1) {
      setCar1(car);
    } else if (!car2) {
      setCar2(car);
    } else {
      // Replace car2 with new selection
      setCar2(car);
    }
    setSearchTerm("");
  };

  const removeCar = (carToRemove: 1 | 2) => {
    if (carToRemove === 1) {
      setCar1(car2);
      setCar2(null);
    } else {
      setCar2(null);
    }
  };

  const resetComparison = () => {
    setCar1(null);
    setCar2(null);
    setSearchTerm("");
  };

  const ComparisonRow = ({ label, value1, value2, isHigherBetter = false }: {
    label: string;
    value1: string | number;
    value2: string | number;
    isHigherBetter?: boolean;
  }) => {
    let winner = null;
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      winner = isHigherBetter 
        ? (value1 > value2 ? 1 : value1 < value2 ? 2 : null)
        : (value1 < value2 ? 1 : value1 > value2 ? 2 : null);
    }

    return (
      <div className="grid grid-cols-3 gap-4 py-3 border-b border-border">
        <div className="text-muted-foreground font-medium">{label}</div>
        <div className={`text-center ${winner === 1 ? 'text-green-600 font-bold' : ''}`}>
          {value1}
        </div>
        <div className={`text-center ${winner === 2 ? 'text-green-600 font-bold' : ''}`}>
          {value2}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">השוואת רכבים</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Car Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car 1 Slot */}
            <Card className="p-4">
              {car1 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{car1.brand} {car1.name}</h3>
                      <p className="text-muted-foreground">{car1.year}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeCar(1)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <img 
                    src={car1.image} 
                    alt={`${car1.brand} ${car1.name}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {car1.rating.toFixed(1)}
                    </div>
                    <Badge variant="secondary">{car1.type}</Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">בחר רכב ראשון להשוואה</p>
                </div>
              )}
            </Card>

            {/* Car 2 Slot */}
            <Card className="p-4">
              {car2 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{car2.brand} {car2.name}</h3>
                      <p className="text-muted-foreground">{car2.year}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeCar(2)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <img 
                    src={car2.image} 
                    alt={`${car2.brand} ${car2.name}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {car2.rating.toFixed(1)}
                    </div>
                    <Badge variant="secondary">{car2.type}</Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">בחר רכב שני להשוואה</p>
                </div>
              )}
            </Card>
          </div>

          {/* Search Bar */}
          <div className="space-y-4">
            <Input
              placeholder="חפש רכב להשוואה..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
                {availableCars.slice(0, 6).map((car) => (
                  <Card 
                    key={car.id}
                    className="p-3 cursor-pointer hover:shadow-md transition-smooth"
                    onClick={() => selectCar(car)}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={car.image} 
                        alt={`${car.brand} ${car.name}`}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{car.brand} {car.name}</p>
                        <p className="text-xs text-muted-foreground">{car.price}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {car1 && car2 && (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-center mb-6">השוואה מפורטת</h3>
                
                {/* Headers */}
                <div className="grid grid-cols-3 gap-4 pb-4 border-b-2 border-border font-bold">
                  <div>מפרט</div>
                  <div className="text-center">{car1.brand} {car1.name}</div>
                  <div className="text-center">{car2.brand} {car2.name}</div>
                </div>

                {/* Price */}
                <ComparisonRow 
                  label="מחיר"
                  value1={car1.price}
                  value2={car2.price}
                />

                {/* Power */}
                <ComparisonRow 
                  label="כוח (כ״ס)"
                  value1={car1.specs.power}
                  value2={car2.specs.power}
                  isHigherBetter
                />

                {/* Engine */}
                <ComparisonRow 
                  label="מנוע"
                  value1={car1.specs.engine}
                  value2={car2.specs.engine}
                />

                {/* Acceleration */}
                <ComparisonRow 
                  label="תאוצה"
                  value1={car1.specs.acceleration}
                  value2={car2.specs.acceleration}
                />

                {/* Top Speed */}
                <ComparisonRow 
                  label="מהירות מרבית"
                  value1={car1.specs.topSpeed}
                  value2={car2.specs.topSpeed}
                />

                {/* Transmission */}
                <ComparisonRow 
                  label="תיבת הילוכים"
                  value1={car1.specs.transmission}
                  value2={car2.specs.transmission}
                />

                {/* Drivetrain */}
                <ComparisonRow 
                  label="הנעה"
                  value1={car1.specs.drivetrain}
                  value2={car2.specs.drivetrain}
                />

                {/* Seating */}
                <ComparisonRow 
                  label="מקומות ישיבה"
                  value1={car1.specs.seating}
                  value2={car2.specs.seating}
                  isHigherBetter
                />

                {/* Rating */}
                <ComparisonRow 
                  label="דירוג"
                  value1={car1.rating.toFixed(1)}
                  value2={car2.rating.toFixed(1)}
                  isHigherBetter
                />
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-bold text-green-600 mb-3">{car1.brand} {car1.name} - יתרונות</h4>
                  <ul className="space-y-1 text-sm">
                    {car1.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold text-red-600 mb-3 mt-6">חסרונות</h4>
                  <ul className="space-y-1 text-sm">
                    {car1.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-green-600 mb-3">{car2.brand} {car2.name} - יתרונות</h4>
                  <ul className="space-y-1 text-sm">
                    {car2.pros.map((pro, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-bold text-red-600 mb-3 mt-6">חסרונות</h4>
                  <ul className="space-y-1 text-sm">
                    {car2.cons.map((con, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={resetComparison}>
              איפוס השוואה
            </Button>
            <Button onClick={onClose}>
              סגור
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarComparison;