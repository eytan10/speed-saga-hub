import { Search, Filter, Grid, List } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchAndFilter from "@/components/SearchAndFilter";
import { massiveCarsDatabase, expandedBrands } from "@/data/massiveCarsDatabase";

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<any>({});
  
  // Get search term from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []);

  const filteredBrands = expandedBrands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrandFilter = !filters.brand || brand.name === filters.brand;
    
    return matchesSearch && matchesBrandFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container mx-auto px-4 text-center text-white relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              גלה את <span className="text-racing-red">עולם הרכב</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
              מותגים מובילים, טכנולוגיה מתקדמת וחוויות נהיגה בלתי נשכחות
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-racing-red mb-2">50+</div>
                <div className="text-gray-300">מותגי יוקרה</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">1,000+</div>
                <div className="text-gray-300">דגמים</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-racing-red mb-2">24/7</div>
                <div className="text-gray-300">תמיכה</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-electric-blue mb-2">VIP</div>
                <div className="text-gray-300">שירות</div>
              </div>
            </div>
          </div>
          
          {/* Floating car logos */}
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-pulse">🚗</div>
          <div className="absolute bottom-20 right-10 text-8xl opacity-10 animate-bounce">⚡</div>
          <div className="absolute top-40 right-20 text-5xl opacity-15 animate-pulse delay-300">🏎️</div>
        </section>

        {/* Enhanced Search and Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <SearchAndFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFiltersChange={setFilters}
              totalResults={filteredBrands.length}
            />
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">מותגי רכב מובילים</h2>
              <p className="text-muted-foreground">
                בחר מותג כדי לראות את כל הדגמים והמידע המלא
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredBrands.map((brand) => (
                <Card 
                  key={brand.id} 
                  className="relative overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group"
                  onClick={() => window.location.href = `/brand/${brand.id}`}
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20 group-hover:to-primary/10 transition-smooth"></div>
                  
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="relative">
                          {typeof brand.logo === 'string' && (brand.logo.includes('.') || brand.logo.startsWith('/')) ? (
                            <img 
                              src={brand.logo} 
                              alt={`${brand.name} logo`}
                              className="w-16 h-16 object-contain transform group-hover:scale-110 transition-smooth"
                            />
                          ) : (
                            <div className="text-5xl transform group-hover:scale-110 transition-smooth">{brand.logo}</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-racing-red/20 to-electric-blue/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-smooth"></div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold group-hover:text-racing-red transition-smooth">
                            {brand.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-racing-red"></span>
                            נוסדה {brand.founded} • {brand.country}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-gradient-to-r from-racing-red to-electric-blue text-white border-0">
                          מותג יוקרה
                        </Badge>
                        <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth">
                          ⭐ דירוג 4.8/5
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {brand.description}
                    </p>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  🚗 <span className="font-medium">דגמים רבים</span>
                </span>
                <span className="flex items-center gap-1">
                  ⚡ <span className="font-medium">חדשנות</span>
                </span>
              </div>
              <Button 
                variant="ghost" 
                className="text-racing-red hover:bg-racing-red hover:text-white transform group-hover:scale-105 transition-smooth"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/brand/${brand.id}`;
                }}
              >
                עיין בדגמים →
              </Button>
            </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-racing-red/10 to-electric-blue/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-smooth"></div>
                  <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-tr from-electric-blue/10 to-racing-red/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-smooth delay-100"></div>
                </Card>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו תוצאות</h3>
                <p className="text-muted-foreground">נסה לחפש במילים אחרות</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">150+</div>
                <div className="text-muted-foreground">מותגי רכב</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">2,500+</div>
                <div className="text-muted-foreground">דגמים זמינים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">50k+</div>
                <div className="text-muted-foreground">ביקורות</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">24/7</div>
                <div className="text-muted-foreground">תמיכה</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarsPage;