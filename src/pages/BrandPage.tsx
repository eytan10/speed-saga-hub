import { useParams } from "react-router-dom";
import { Search, ArrowLeft, Star, Zap, Heart } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { massiveCarsDatabase, expandedBrands } from "@/data/massiveCarsDatabase";
import { additionalCarModels } from "@/data/additionalCarModels";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

const BrandPage = () => {
  const { brand } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  const currentBrand = expandedBrands.find(b => b.id === brand);
  // Combine cars from both databases
  const allCars = [...massiveCarsDatabase, ...additionalCarModels];

  const normalizeBrand = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');
  const brandId = normalizeBrand(brand || '');
  const brandCars = allCars.filter(car => normalizeBrand(car.brand) === brandId);
  
  const filteredCars = brandCars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = (car: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCarFavorite = isFavorite(car.id);
    
    if (isCarFavorite) {
      removeFromFavorites(car.id);
      toast({
        title: "הוסר מהמועדפים",
        description: `${car.brand} ${car.name} הוסר מהמועדפים שלך`,
      });
    } else {
      addToFavorites(car);
      toast({
        title: "נוסף למועדפים",
        description: `${car.brand} ${car.name} נוסף למועדפים שלך`,
      });
    }
  };

  if (!currentBrand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">מותג לא נמצא</h1>
          <Button onClick={() => window.location.href = '/cars'}>
            חזרה למותגים
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
              onClick={() => window.location.href = '/cars'}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              חזרה למותגים
            </Button>
            
            <div className="text-center text-white">
              <div className="mb-6">
                {typeof currentBrand.logo === 'string' && !currentBrand.logo.includes('.png') ? (
                  <div className="text-8xl">{currentBrand.logo}</div>
                ) : (
                  <img 
                    src={currentBrand.logo} 
                    alt={`${currentBrand.name} logo`} 
                    className="h-24 w-24 object-contain mx-auto filter brightness-0 invert"
                  />
                )}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {currentBrand.name}
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                {currentBrand.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  נוסד בשנת {currentBrand.founded}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {currentBrand.country}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {brandCars.length} דגמים זמינים
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
                placeholder={`חפש דגמים של ${currentBrand.name}...`}
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
              דגמי {currentBrand.name}
            </h2>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                  <Card 
                    key={car.id} 
                    className="overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth group"
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.name}`}
                        className="car-image w-full h-64 object-cover"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        {car.isElectric && (
                          <Badge className="bg-electric-blue text-electric-blue-foreground">
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
                          {car.name}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {car.rating}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{car.year}</p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">כוח</p>
                          <p className="font-semibold">{car.specs.power} כ"ס</p>
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
                          <p className="text-xl font-bold text-racing-red">{car.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `/car/${brand}/${car.id}`;
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
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו דגמים</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm 
                    ? "נסה לחפש במילים אחרות" 
                    : `אין עדיין דגמים זמינים עבור ${currentBrand.name}`
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
                  {currentBrand.founded}
                </div>
                <div className="text-muted-foreground">שנת הקמה</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">
                  {brandCars.length}
                </div>
                <div className="text-muted-foreground">דגמים זמינים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">
                  {currentBrand.country}
                </div>
                <div className="text-muted-foreground">מדינת מוצא</div>
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