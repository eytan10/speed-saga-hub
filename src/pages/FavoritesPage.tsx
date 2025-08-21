import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16 bg-background">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <Heart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
              <h1 className="text-4xl font-bold mb-4">המועדפים שלך</h1>
              <p className="text-xl text-muted-foreground mb-8">
                עדיין לא הוספת רכבים למועדפים
              </p>
              <Link to="/cars">
                <Button className="btn-hero">
                  עבור לרכבים
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16 bg-background">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <Heart className="inline h-12 w-12 text-racing-red ml-4" />
                המועדפים שלך
              </h1>
              <p className="text-xl text-muted-foreground">
                {favorites.length} רכבים שמורים במועדפים
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={clearFavorites}
              className="mt-4 md:mt-0"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              נקה הכל
            </Button>
          </div>

          {/* Favorites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((car) => (
              <Card key={car.id} className="car-card group overflow-hidden">
                {/* Image */}
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
                        Electric
                      </Badge>
                    )}
                    <Badge variant="secondary">{car.type}</Badge>
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 bg-black/20 hover:bg-red-500 text-white"
                    onClick={() => removeFromFavorites(car.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <Link to={`/car/${car.brand.toLowerCase().replace(/[^a-z]/g, '')}/${car.id}`}>
                      <Button className="btn-hero">
                        צפה בפרטים
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {car.brand} {car.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>⭐ {car.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{car.year}</p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">כוח</p>
                      <p className="font-semibold">{car.specs.power} כ״ס</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">מהירות מרבית</p>
                      <p className="font-semibold">{car.specs.topSpeed}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">מחיר התחלתי</p>
                    <p className="text-xl font-bold text-racing-red">{car.price}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FavoritesPage;