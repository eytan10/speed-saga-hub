import { Search, Clock, TrendingUp, Car } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { massiveCarsDatabase, expandedBrands } from "@/data/massiveCarsDatabase";

interface SmartSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
}

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  type: string;
  category: "car" | "brand";
  image?: string;
  price?: string;
}

const SmartSearch = ({ 
  placeholder = "חפש רכבים, מותגים או דגמים...", 
  className = "",
  onSearch 
}: SmartSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Perform search
  const performSearch = (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const searchLower = term.toLowerCase();
    
    // Search cars
    const carResults: SearchResult[] = massiveCarsDatabase
      .filter(car => 
        car.name.toLowerCase().includes(searchLower) ||
        car.brand.toLowerCase().includes(searchLower) ||
        car.type.toLowerCase().includes(searchLower)
      )
      .slice(0, 6)
      .map(car => ({
        id: car.id,
        name: car.name,
        brand: car.brand,
        type: car.type,
        category: "car" as const,
        image: car.image,
        price: car.price
      }));

    // Search brands
    const brandResults: SearchResult[] = expandedBrands
      .filter(brand => 
        brand.name.toLowerCase().includes(searchLower) ||
        brand.description.toLowerCase().includes(searchLower) ||
        brand.country.toLowerCase().includes(searchLower)
      )
      .slice(0, 4)
      .map(brand => ({
        id: brand.id,
        name: brand.name,
        brand: brand.name,
        type: brand.country,
        category: "brand" as const
      }));

    setResults([...carResults, ...brandResults]);
    setIsLoading(false);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Debounce search
    setTimeout(() => {
      if (value === searchTerm) {
        performSearch(value);
      }
    }, 300);
  };

  // Handle search submission
  const handleSearch = (term: string = searchTerm) => {
    if (!term.trim()) return;
    
    saveRecentSearch(term);
    setIsOpen(false);
    
    if (onSearch) {
      onSearch(term);
    } else {
      navigate(`/cars?search=${encodeURIComponent(term)}`);
    }
  };

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    setSearchTerm("");
    
    if (result.category === "car") {
      navigate(`/car/${result.brand.toLowerCase().replace(/[^a-z]/g, '')}/${result.id}`);
    } else {
      navigate(`/brand/${result.id}`);
    }
  };

  // Handle recent search click
  const handleRecentSearchClick = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  // Popular searches
  const popularSearches = [
    "Tesla Model 3", "BMW M3", "Mercedes AMG", "Porsche 911", "Ferrari F8", "Audi RS6"
  ];

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            placeholder={placeholder}
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-2xl border-0 bg-background/95 backdrop-blur-md">
          <div className="p-4">
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin h-6 w-6 border-2 border-racing-red border-t-transparent rounded-full"></div>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && results.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">תוצאות חיפוש</h3>
                {results.map((result) => (
                  <div
                    key={`${result.category}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-lg cursor-pointer transition-smooth group"
                  >
                    {result.image ? (
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium group-hover:text-racing-red transition-colors">
                        {result.brand} {result.name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {result.category === "car" ? "רכב" : "מותג"}
                        </Badge>
                        {result.type}
                        {result.price && (
                          <span className="text-racing-red font-medium">{result.price}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && searchTerm && results.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">לא נמצאו תוצאות עבור "{searchTerm}"</p>
                <Button 
                  variant="ghost" 
                  className="mt-2"
                  onClick={() => handleSearch()}
                >
                  חפש בכל האתר
                </Button>
              </div>
            )}

            {/* Recent Searches */}
            {!searchTerm && recentSearches.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  חיפושים אחרונים
                </h3>
                {recentSearches.map((term, index) => (
                  <div
                    key={index}
                    onClick={() => handleRecentSearchClick(term)}
                    className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-lg cursor-pointer transition-smooth"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!searchTerm && recentSearches.length === 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  חיפושים פופולריים
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-racing-red hover:text-white transition-smooth"
                      onClick={() => handleRecentSearchClick(term)}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SmartSearch;