import { Search, Clock, TrendingUp } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SmartSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
}

const SmartSearch = ({ 
  placeholder = "חפש רכבים, מותגים או דגמים...", 
  className = "",
  onSearch 
}: SmartSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = useCallback((term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  }, [recentSearches]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(value.trim().length > 0 || recentSearches.length > 0);
  };

  // Handle search submit
  const handleSearch = useCallback((term?: string) => {
    const searchValue = term || searchTerm;
    if (searchValue.trim()) {
      saveRecentSearch(searchValue);
      if (onSearch) {
        onSearch(searchValue);
      } else {
        navigate(`/cars?search=${encodeURIComponent(searchValue)}`);
      }
      setShowDropdown(false);
      setSearchTerm("");
    }
  }, [searchTerm, onSearch, navigate, saveRecentSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  // Popular searches
  const popularSearches = [
    "טסלה", "BMW", "מרצדס", "אאודי", "טויוטה", "פורשה", "רכב חשמלי"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative w-full max-w-2xl ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
        <Input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="pl-6 pr-12 h-12 text-lg bg-background/95 backdrop-blur border-2 focus:border-primary transition-all duration-200"
          dir="rtl"
        />
        {searchTerm && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => {
              setSearchTerm("");
              setShowDropdown(false);
            }}
          >
            ×
          </Button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 shadow-lg border-2 z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                חיפושים אחרונים
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              חיפושים פופולריים
            </div>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleSearch(search)}
                >
                  {search}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SmartSearch;