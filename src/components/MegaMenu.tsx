import { useState } from "react";
import { ChevronDown, Car, Zap, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { expandedBrands } from "@/data/massiveCarsDatabase";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu = ({ isOpen, onClose }: MegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState("luxury");

  const categories = {
    luxury: {
      title: "מותגי יוקרה",
      icon: Star,
      brands: expandedBrands.filter(brand => 
        ["Ferrari", "Lamborghini", "McLaren", "Porsche", "Aston Martin", "Bentley"].includes(brand.name)
      )
    },
    electric: {
      title: "רכבים חשמליים", 
      icon: Zap,
      brands: expandedBrands.filter(brand =>
        ["Tesla", "BMW", "Mercedes-Benz", "Audi", "Polestar", "Lucid"].includes(brand.name)
      )
    },
    popular: {
      title: "מותגים פופולריים",
      icon: TrendingUp,
      brands: expandedBrands.filter(brand =>
        ["Toyota", "Honda", "Ford", "Volkswagen", "Hyundai", "Kia", "Nissan", "Mazda"].includes(brand.name)
      )
    },
    premium: {
      title: "פרימיום גרמני",
      icon: Car,
      brands: expandedBrands.filter(brand =>
        ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche"].includes(brand.name)
      )
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="absolute top-16 left-0 right-0 bg-background border-b border-border shadow-2xl">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Categories Sidebar */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold mb-4 text-racing-red">קטגוריות</h3>
              {Object.entries(categories).map(([key, category]) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-right transition-all duration-200 ${
                      activeCategory === key
                        ? 'bg-racing-red text-white shadow-lg'
                        : 'hover:bg-secondary/50 text-foreground'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="font-medium">{category.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Brands Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-xl font-bold">{categories[activeCategory as keyof typeof categories].title}</h3>
                <Badge variant="secondary" className="bg-racing-red text-white">
                  {categories[activeCategory as keyof typeof categories].brands.length} מותגים
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories[activeCategory as keyof typeof categories].brands.map((brand) => (
                  <Card 
                    key={brand.id}
                    className="p-4 hover:shadow-automotive hover:-translate-y-1 transition-smooth cursor-pointer group"
                    onClick={() => {
                      window.location.href = `/brand/${brand.id}`;
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl transform group-hover:scale-110 transition-transform">
                        {brand.logo}
                      </div>
                      <div>
                        <h4 className="font-bold group-hover:text-racing-red transition-colors">
                          {brand.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {brand.country} • {brand.founded}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        דגמים רבים
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-racing-red">
                        צפה →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={() => { window.location.href = '/cars'; onClose(); }}
                className="btn-racing"
              >
                צפה בכל הרכבים
              </Button>
              <Button 
                variant="outline"
                onClick={() => { window.location.href = '/reviews'; onClose(); }}
              >
                ביקורות מומלצות
              </Button>
              <Button 
                variant="outline"
                onClick={() => { window.location.href = '/news'; onClose(); }}
              >
                חדשות רכב
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;