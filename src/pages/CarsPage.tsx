import { Search, Filter, Grid, List, Heart, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchAndFilter from "@/components/SearchAndFilter";
import { getCars, CarData, CarFilters } from "@/services/carService";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<CarFilters>({});
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  // Get search term from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []);

  // Fetch cars when filters, search term, or page changes
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const result = await getCars(
          { 
            ...filters, 
            search: searchTerm || undefined 
          }, 
          page, 
          pageSize
        );
        setCars(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast({
          title: "שגיאה",
          description: "לא ניתן לטעון את הרכבים. נסה שוב מאוחר יותר.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchTerm, filters, page, pageSize, toast]);

  const handleFavoriteClick = (car: CarData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
      toast({
        title: "הוסר מהמועדפים",
        description: `${car.brand} ${car.model} הוסר מהמועדפים שלך`,
      });
    } else {
      addToFavorites(car);
      toast({
        title: "נוסף למועדפים",
        description: `${car.brand} ${car.model} נוסף למועדפים שלך`,
      });
    }
  };

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
              totalResults={total}
            />
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">רכבים זמינים</h2>
                <p className="text-muted-foreground">
                  נמצאו {total} רכבים מתאימים
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-48 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
                }`}>
                  {cars.map((car) => (
                    <Card 
                      key={car.id} 
                      className={`overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                      onClick={() => navigate(`/car/${car.id}`)}
                    >
                      <div className={viewMode === "list" ? "w-1/3 relative" : "relative"}>
                        <img 
                          src="/default-car.jpg" 
                          alt={`${car.brand} ${car.model}`}
                          className={`w-full object-cover ${
                            viewMode === "list" ? "h-full" : "h-48"
                          }`}
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {car.specs.fuelType === 'Electric' && (
                            <Badge className="bg-electric-blue text-white">
                              <Zap className="h-3 w-3 mr-1" />
                              חשמלי
                            </Badge>
                          )}
                          <Badge variant="secondary">{car.type}</Badge>
                        </div>

                        {/* Favorite Button */}
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white ${
                            isFavorite(car.id) ? 'text-racing-red' : ''
                          }`}
                          onClick={(e) => handleFavoriteClick(car, e)}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite(car.id) ? 'fill-racing-red' : ''}`} />
                        </Button>
                      </div>

                      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold group-hover:text-racing-red transition-smooth">
                            {car.brand} {car.model}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            {car.year}
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span>כוח:</span>
                            <span>{car.specs.horsepower} כ"ס</span>
                          </div>
                          <div className="flex justify-between">
                            <span>מנוע:</span>
                            <span>{car.specs.engine}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>מושבים:</span>
                            <span>{car.specs.seats}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-racing-red">
                            ₪{car.price_ils.toLocaleString()}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/car/${car.id}`);
                            }}
                          >
                            פרטים
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {total > pageSize && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      הקודם
                    </Button>
                    
                    {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
                      <Button
                        key={i + 1}
                        variant={page === i + 1 ? "default" : "outline"}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(Math.ceil(total / pageSize), p + 1))}
                      disabled={page === Math.ceil(total / pageSize)}
                    >
                      הבא
                    </Button>
                  </div>
                )}

                {cars.length === 0 && !loading && (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold mb-4">לא נמצאו רכבים</h3>
                    <p className="text-muted-foreground">נסה לשנות את מילות החיפוש או הסינון</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">{total}+</div>
                <div className="text-muted-foreground">רכבים זמינים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">100+</div>
                <div className="text-muted-foreground">מותגים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">50+</div>
                <div className="text-muted-foreground">קטגוריות</div>
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