import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFiltersChange: (filters: any) => void;
  totalResults?: number;
}

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  onFiltersChange,
  totalResults = 0 
}: SearchAndFilterProps) => {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    fuelType: "",
    priceRange: [0, 200000],
    horsepowerRange: [0, 1000],
    year: "",
    bodyType: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const brands = [
    "Tesla", "BMW", "Mercedes-Benz", "Audi", "Porsche", "Ferrari", 
    "McLaren", "Lamborghini", "Toyota", "Honda", "Ford", "Volkswagen",
    "Hyundai", "Kia", "Nissan", "Mazda", "Subaru", "Skoda"
  ];

  const categories = [
    "סדאן", "SUV", "האצ׳בק", "קופה", "רודסטר", "טנדר", "סופרקאר", "היברידי", "חשמלי"
  ];

  const bodyTypes = [
    "סדאן", "SUV", "האצ׳בק", "קופה", "רודסטר", "טנדר", "סטיישן וואגון", "מיניוואן"
  ];

  const fuelTypes = [
    "בנזין", "דיזל", "היברידי", "חשמלי", "מימן"
  ];

  const years = [
    "2024", "2023", "2022", "2021", "2020", "2019", "2018"
  ];

  const updateFilters = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update active filters for display
    const newActiveFilters = [];
    if (newFilters.brand) newActiveFilters.push(`מותג: ${newFilters.brand}`);
    if (newFilters.category) newActiveFilters.push(`קטגוריה: ${newFilters.category}`);
    if (newFilters.fuelType) newActiveFilters.push(`דלק: ${newFilters.fuelType}`);
    if (newFilters.year) newActiveFilters.push(`שנה: ${newFilters.year}`);
    if (newFilters.bodyType) newActiveFilters.push(`סוג מרכב: ${newFilters.bodyType}`);
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 200000) {
      newActiveFilters.push(`מחיר: $${newFilters.priceRange[0].toLocaleString()}-$${newFilters.priceRange[1].toLocaleString()}`);
    }
    if (newFilters.horsepowerRange[0] > 0 || newFilters.horsepowerRange[1] < 1000) {
      newActiveFilters.push(`כוח: ${newFilters.horsepowerRange[0]}-${newFilters.horsepowerRange[1]} כ"ס`);
    }
    
    setActiveFilters(newActiveFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      brand: "",
      category: "",
      fuelType: "",
      priceRange: [0, 200000],
      horsepowerRange: [0, 1000],
      year: "",
      bodyType: ""
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onFiltersChange(resetFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">מותג</label>
        <Select value={filters.brand} onValueChange={(value) => updateFilters("brand", value)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר מותג" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">כל המותגים</SelectItem>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">קטגוריה</label>
        <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר קטגוריה" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">כל הקטגוריות</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Body Type Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">סוג מרכב</label>
        <Select value={filters.bodyType} onValueChange={(value) => updateFilters("bodyType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר סוג מרכב" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">כל הסוגים</SelectItem>
            {bodyTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fuel Type Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">סוג דלק</label>
        <Select value={filters.fuelType} onValueChange={(value) => updateFilters("fuelType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר סוג דלק" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">כל סוגי הדלק</SelectItem>
            {fuelTypes.map(fuel => (
              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Year Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">שנת ייצור</label>
        <Select value={filters.year} onValueChange={(value) => updateFilters("year", value)}>
          <SelectTrigger>
            <SelectValue placeholder="בחר שנה" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">כל השנים</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          טווח מחירים: ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilters("priceRange", value)}
          max={200000}
          min={0}
          step={5000}
          className="w-full"
        />
      </div>

      {/* Horsepower Range */}
      <div>
        <label className="block text-sm font-medium mb-2">
          טווח כוח: {filters.horsepowerRange[0]} - {filters.horsepowerRange[1]} כ"ס
        </label>
        <Slider
          value={filters.horsepowerRange}
          onValueChange={(value) => updateFilters("horsepowerRange", value)}
          max={1000}
          min={0}
          step={10}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      {activeFilters.length > 0 && (
        <Button variant="outline" onClick={clearAllFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          נקה כל המסננים
        </Button>
      )}
    </div>
  );

  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="חפש רכבים, מותגים או דגמים..."
            className="pl-10 text-right"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          {totalResults} תוצאות נמצאו
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:flex items-center gap-4">
          <Select value={filters.brand} onValueChange={(value) => updateFilters("brand", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="מותג" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">כל המותגים</SelectItem>
              {brands.slice(0, 8).map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => updateFilters("category", value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="קטגוריה" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">כל הקטגוריות</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile Filter Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              מסננים
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>מסננים מתקדמים</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>

        {/* Advanced Filters Button for Desktop */}
        <div className="hidden lg:block">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                מסננים מתקדמים
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>מסננים מתקדמים</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="bg-racing-red/10 text-racing-red">
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SearchAndFilter;