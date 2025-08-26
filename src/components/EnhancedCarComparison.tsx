import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Search, RotateCcw } from "lucide-react";
import { massiveCarsDatabase, type ExtendedCarDetails } from "@/data/massiveCarsDatabase";
import { additionalCarModels } from "@/data/additionalCarModels";

interface EnhancedCarComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedCarComparison = ({ isOpen, onClose }: EnhancedCarComparisonProps) => {
  const [car1, setCar1] = useState<ExtendedCarDetails | null>(null);
  const [car2, setCar2] = useState<ExtendedCarDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSlot, setActiveSlot] = useState<1 | 2>(1);

  const allCars = [...massiveCarsDatabase, ...additionalCarModels];

  const filteredCars = allCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectCar = (car: ExtendedCarDetails) => {
    if (activeSlot === 1) {
      setCar1(car);
      if (!car2) setActiveSlot(2);
    } else {
      setCar2(car);
    }
    setSearchTerm("");
  };

  const removeCar = (slot: 1 | 2) => {
    if (slot === 1) {
      setCar1(null);
      setActiveSlot(1);
    } else {
      setCar2(null);
      setActiveSlot(2);
    }
  };

  const resetComparison = () => {
    setCar1(null);
    setCar2(null);
    setActiveSlot(1);
    setSearchTerm("");
  };

  const ComparisonRow = ({ 
    label, 
    value1, 
    value2, 
    isNumeric = false 
  }: { 
    label: string; 
    value1: string | number; 
    value2: string | number; 
    isNumeric?: boolean;
  }) => {
    const getBetterValue = () => {
      if (!isNumeric || !car1 || !car2) return null;
      
      const num1 = typeof value1 === 'string' ? parseFloat(value1.replace(/[^\d.]/g, '')) : value1;
      const num2 = typeof value2 === 'string' ? parseFloat(value2.replace(/[^\d.]/g, '')) : value2;
      
      if (label.includes('מחיר')) return num1 < num2 ? 1 : num1 > num2 ? 2 : null;
      if (label.includes('צריכה') || label.includes('זמן')) return num1 < num2 ? 1 : num1 > num2 ? 2 : null;
      
      return num1 > num2 ? 1 : num1 < num2 ? 2 : null;
    };

    const betterValue = getBetterValue();

    return (
      <tr className="border-b">
        <td className="py-3 px-4 font-medium text-right">{label}</td>
        <td className={`py-3 px-4 text-center ${betterValue === 1 ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
          {value1}
        </td>
        <td className={`py-3 px-4 text-center ${betterValue === 2 ? 'bg-green-100 text-green-800 font-bold' : ''}`}>
          {value2}
        </td>
      </tr>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">השוואת רכבים מתקדמת</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Car Selection Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car 1 Slot */}
            <Card className={`p-6 border-2 ${activeSlot === 1 ? 'border-primary' : 'border-gray-200'}`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-4">רכב ראשון</h3>
                {car1 ? (
                  <div>
                    <img src={car1.image} alt={car1.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h4 className="font-bold text-lg">{car1.brand} {car1.name}</h4>
                    <p className="text-lg text-primary font-bold">{car1.price}</p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveSlot(1)}
                        className="text-xs"
                      >
                        החלף
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeCar(1)}
                        className="text-xs"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-gray-400">
                    <Plus className="h-12 w-12 mb-2" />
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveSlot(1)}
                      className="mt-2"
                    >
                      בחר רכב ראשון
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Car 2 Slot */}
            <Card className={`p-6 border-2 ${activeSlot === 2 ? 'border-primary' : 'border-gray-200'}`}>
              <div className="text-center">
                <h3 className="text-lg font-bold mb-4">רכב שני</h3>
                {car2 ? (
                  <div>
                    <img src={car2.image} alt={car2.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h4 className="font-bold text-lg">{car2.brand} {car2.name}</h4>
                    <p className="text-lg text-primary font-bold">{car2.price}</p>
                    <div className="flex gap-2 justify-center mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setActiveSlot(2)}
                        className="text-xs"
                      >
                        החלף
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeCar(2)}
                        className="text-xs"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-gray-400">
                    <Plus className="h-12 w-12 mb-2" />
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveSlot(2)}
                      className="mt-2"
                    >
                      בחר רכב שני
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Search and Car Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`חפש רכב עבור ${activeSlot === 1 ? 'המקום הראשון' : 'המקום השני'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Badge variant="secondary">
                בוחר עבור: רכב {activeSlot === 1 ? 'ראשון' : 'שני'}
              </Badge>
            </div>

            {searchTerm && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                {filteredCars.slice(0, 12).map((car) => (
                  <Card 
                    key={car.id} 
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => selectCar(car)}
                  >
                    <img src={car.image} alt={car.name} className="w-full h-20 object-cover rounded mb-2" />
                    <h4 className="font-bold text-sm">{car.brand} {car.name}</h4>
                    <p className="text-sm text-primary">{car.price}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {car1 && car2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Button variant="outline" onClick={resetComparison}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  איפוס השוואה
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-right font-bold">מאפיין</th>
                      <th className="py-3 px-4 text-center font-bold">{car1.brand} {car1.name}</th>
                      <th className="py-3 px-4 text-center font-bold">{car2.brand} {car2.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ComparisonRow label="מחיר" value1={car1.price} value2={car2.price} isNumeric />
                    <ComparisonRow label="שנת ייצור" value1={car1.year} value2={car2.year} />
                    <ComparisonRow label="סוג רכב" value1={car1.type} value2={car2.type} />
                    <ComparisonRow label="כוח (כ״ס)" value1={car1.specs.power} value2={car2.specs.power} isNumeric />
                    <ComparisonRow label="מומנט" value1={car1.specs.torque} value2={car2.specs.torque} />
                    <ComparisonRow label="תיבת הילוכים" value1={car1.specs.transmission} value2={car2.specs.transmission} />
                    <ComparisonRow label="תאוצה" value1={car1.specs.acceleration} value2={car2.specs.acceleration} />
                    <ComparisonRow label="מהירות מרבית" value1={car1.specs.topSpeed} value2={car2.specs.topSpeed} />
                    <ComparisonRow label="צריכת דלק/טווח" value1={car1.specs.fuel} value2={car2.specs.fuel} />
                    <ComparisonRow label="משקל" value1={car1.specs.weight} value2={car2.specs.weight} />
                    <ComparisonRow label="מספר מושבים" value1={car1.specs.seating} value2={car2.specs.seating} />
                    <ComparisonRow label="נפח מטען" value1={car1.specs.cargo} value2={car2.specs.cargo} />
                    <ComparisonRow label="דירוג" value1={car1.rating.toFixed(1)} value2={car2.rating.toFixed(1)} isNumeric />
                  </tbody>
                </table>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-4">{car1.brand} {car1.name}</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">יתרונות:</h5>
                      <ul className="list-disc pr-5 space-y-1">
                        {car1.pros.map((pro, index) => (
                          <li key={index} className="text-sm">{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">חסרונות:</h5>
                      <ul className="list-disc pr-5 space-y-1">
                        {car1.cons.map((con, index) => (
                          <li key={index} className="text-sm">{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4">{car2.brand} {car2.name}</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">יתרונות:</h5>
                      <ul className="list-disc pr-5 space-y-1">
                        {car2.pros.map((pro, index) => (
                          <li key={index} className="text-sm">{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">חסרונות:</h5>
                      <ul className="list-disc pr-5 space-y-1">
                        {car2.cons.map((con, index) => (
                          <li key={index} className="text-sm">{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedCarComparison;