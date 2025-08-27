import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { massiveCarsDatabase, expandedBrands, type ExtendedCarDetails } from "@/data/massiveCarsDatabase";
import { useNavigate } from "react-router-dom";
import { normalizeBrand } from "@/lib/utils";

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedSearch = ({ isOpen, onClose }: AdvancedSearchProps) => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    keyword: "",
    brand: "",
    category: "",
    minPrice: 0,
    maxPrice: 2000000,
    minYear: 2015,
    maxYear: 2024,
    fuelType: "",
    transmission: "",
    minRating: 0
  });

  const [searchResults, setSearchResults] = useState<ExtendedCarDetails[]>([]);

  const categories = [
    "כל הקטגוריות",
    "סדאן",
    "SUV", 
    "הצ'בק",
    "קופה",
    "קבריולט",
    "וגן",
    "פיקאפ",
    "ספורט"
  ];

  const fuelTypes = [
    "כל סוגי הדלק",
    "בנזין",
    "דיזל", 
    "חשמלי",
    "היברידי",
    "פלאג-אין היברידי"
  ];

  const transmissionTypes = [
    "כל תיבות ההילוכים",
    "אוטומטית",
    "ידנית",
    "CVT",
    "דו-מצמד"
  ];

  const handleSearch = () => {
    const results = massiveCarsDatabase.filter(car => {
      const priceNum = parseFloat(car.price.replace(/[^\d]/g, ''));
      
      return (
        (!searchCriteria.keyword || 
         car.name.toLowerCase().includes(searchCriteria.keyword.toLowerCase()) ||
         car.brand.toLowerCase().includes(searchCriteria.keyword.toLowerCase())) &&
        (!searchCriteria.brand || car.brand === searchCriteria.brand) &&
        (!searchCriteria.category || searchCriteria.category === "כל הקטגוריות" || car.type === searchCriteria.category) &&
        (priceNum >= searchCriteria.minPrice && priceNum <= searchCriteria.maxPrice) &&
        (car.year >= searchCriteria.minYear && car.year <= searchCriteria.maxYear) &&
        (!searchCriteria.fuelType || searchCriteria.fuelType === "כל סוגי הדלק" || 
         (searchCriteria.fuelType === "חשמלי" && car.isElectric) ||
         (searchCriteria.fuelType === "היברידי" && car.specs.engine.includes("היברידי")) ||
         (searchCriteria.fuelType === "בנזין" && !car.isElectric && !car.specs.engine.includes("היברידי")) ||
         (searchCriteria.fuelType === "דיזל" && car.specs.engine.includes("דיזל"))) &&
        (!searchCriteria.transmission || searchCriteria.transmission === "כל תיבות ההילוכים" || 
         car.specs.transmission.includes(searchCriteria.transmission)) &&
        (car.rating >= searchCriteria.minRating)
      );
    });

    setSearchResults(results.slice(0, 20));
  };

  const resetFilters = () => {
    setSearchCriteria({
      keyword: "",
      brand: "",
      category: "",
      minPrice: 0,
      maxPrice: 2000000,
      minYear: 2015,
      maxYear: 2024,
      fuelType: "",
      transmission: "",
      minRating: 0
    });
    setSearchResults([]);
  };

  const handleCarClick = (car: ExtendedCarDetails) => {
    navigate(`/car/${normalizeBrand(car.brand)}/${car.id}`);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <SlidersHorizontal className="h-6 w-6" />
            חיפוש מתקדם
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-4">
              <h3 className="font-bold text-lg mb-4">מסנני חיפוש</h3>
              
              {/* Keyword Search */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="keyword">מילת מפתח</Label>
                <Input
                  id="keyword"
                  placeholder="חפש דגם, מותג או תכונה..."
                  value={searchCriteria.keyword}
                  onChange={(e) => setSearchCriteria({...searchCriteria, keyword: e.target.value})}
                />
              </div>

              {/* Brand Filter */}
              <div className="space-y-2 mb-4">
                <Label>מותג</Label>
                <Select value={searchCriteria.brand} onValueChange={(value) => setSearchCriteria({...searchCriteria, brand: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר מותג" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">כל המותגים</SelectItem>
                    {expandedBrands.map(brand => (
                      <SelectItem key={brand.id} value={brand.name}>{brand.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2 mb-4">
                <Label>קטגוריה</Label>
                <Select value={searchCriteria.category} onValueChange={(value) => setSearchCriteria({...searchCriteria, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 mb-4">
                <Label>טווח מחירים (₪)</Label>
                <div className="px-2">
                  <Slider
                    value={[searchCriteria.minPrice, searchCriteria.maxPrice]}
                    min={0}
                    max={2000000}
                    step={10000}
                    onValueChange={([min, max]) => setSearchCriteria({...searchCriteria, minPrice: min, maxPrice: max})}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{searchCriteria.minPrice.toLocaleString()} ₪</span>
                    <span>{searchCriteria.maxPrice.toLocaleString()} ₪</span>
                  </div>
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-2 mb-4">
                <Label>טווח שנים</Label>
                <div className="px-2">
                  <Slider
                    value={[searchCriteria.minYear, searchCriteria.maxYear]}
                    min={2010}
                    max={2024}
                    step={1}
                    onValueChange={([min, max]) => setSearchCriteria({...searchCriteria, minYear: min, maxYear: max})}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>{searchCriteria.minYear}</span>
                    <span>{searchCriteria.maxYear}</span>
                  </div>
                </div>
              </div>

              {/* Fuel Type */}
              <div className="space-y-2 mb-4">
                <Label>סוג דלק</Label>
                <Select value={searchCriteria.fuelType} onValueChange={(value) => setSearchCriteria({...searchCriteria, fuelType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר סוג דלק" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map(fuel => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission */}
              <div className="space-y-2 mb-4">
                <Label>תיבת הילוכים</Label>
                <Select value={searchCriteria.transmission} onValueChange={(value) => setSearchCriteria({...searchCriteria, transmission: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="בחר תיבת הילוכים" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionTypes.map(trans => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div className="space-y-2 mb-4">
                <Label>דירוג מינימלי</Label>
                <div className="px-2">
                  <Slider
                    value={[searchCriteria.minRating]}
                    min={0}
                    max={5}
                    step={0.5}
                    onValueChange={([value]) => setSearchCriteria({...searchCriteria, minRating: value})}
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    {searchCriteria.minRating} כוכבים ומעלה
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  חפש
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="font-bold text-lg">תוצאות חיפוש ({searchResults.length})</h3>
            </div>

            {searchResults.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">השתמש במסננים כדי לחפש רכבים</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((car) => (
                <Card key={car.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCarClick(car)}>
                  <CardContent className="p-4">
                    <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                    <h4 className="font-bold text-lg">{car.brand} {car.name}</h4>
                    <p className="text-lg text-racing-red font-bold">{car.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{car.type}</Badge>
                      <Badge variant="outline">{car.year}</Badge>
                      {car.isElectric && <Badge className="bg-green-100 text-green-800">חשמלי</Badge>}
                    </div>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-muted-foreground">דירוג: {car.rating}/5</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedSearch;

