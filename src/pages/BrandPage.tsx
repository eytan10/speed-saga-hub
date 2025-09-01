import { useParams, useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Star, Zap, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCarsByBrand, CarData } from "@/services/carService";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

const BrandPage = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();

  // Fetch cars for the brand
  useEffect(() => {
    const fetchBrandCars = async () => {
      if (!brand) return;
      
      setLoading(true);
      try {
        const result = await getCarsByBrand(brand, page, pageSize);
        setCars(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching brand cars:', error);
        toast({
          title: "שגיאה",
          description: "לא ניתן לטעון את הרכבים. נסה שוב מאוחר יותר.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBrandCars();
  }, [brand, page, pageSize, toast]);

  const filteredCars = cars.filter(car =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = (car: CarData, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCarFavorite = isFavorite(car.id);
    
    if (isCarFavorite) {
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

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">מותג לא נמצא</h1>
          <Button onClick={() => navigate('/cars')}>
            חזרה לרכבים
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Brand Hero */}
        <section className="py-16 bg-gradient-hero relative">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              className="text-white mb-6 hover:bg-white/20"
              onClick={() => navigate('/cars')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              חזרה לרכבים
            </Button>
            
            <div className="text-center text-white">
              <div className="mb-6">
                <img 
                  src="/default-car.jpg" 
                  alt={`${brand} logo`} 
                  className="h-24 w-24 object-contain mx-auto filter brightness-0 invert"
                />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {brand}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                גלה את מגוון הרכבים של {brand}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {total} דגמים זמינים
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`חפש דגמים של ${brand}...`}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              דגמי {brand}
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="p-6 animate-pulse">
                    <div className="h-48 bg-muted rounded mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </Card>
                ))}
              </div>
            ) : filteredCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCars.map((car) => (
                    <Card 
                      key={car.id} 
                      className="overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth group"
                    >
                      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                        <img
                          src="/default-car.jpg"
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-64 object-cover"
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

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold group-hover:text-racing-red transition-smooth">
                            {car.model}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            {car.year}
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">כוח</p>
                            <p className="font-semibold">{car.specs.horsepower} כ"ס</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">מהירות מרבית</p>
                            <p className="font-semibold">{car.specs.topSpeed}</p>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">מחיר החל מ</p>
                            <p className="text-xl font-bold text-racing-red">₪{car.price_ils.toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
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
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו דגמים</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? "נסה לחפש במילים אחרות" 
                    : `אין עדיין דגמים זמינים עבור ${brand}`
                  }
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm("")}>
                    נקה חיפוש
                  </Button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Brand Info */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">
                  {brand}
                </div>
                <div className="text-muted-foreground">מותג</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">
                  {total}
                </div>
                <div className="text-muted-foreground">דגמים זמינים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">
                  2024
                </div>
                <div className="text-muted-foreground">שנה</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BrandPage;