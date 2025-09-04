import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Star, Fuel, Zap, Gauge, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, clearFavorites, loading } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Show sign-in prompt for unauthenticated users
  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <Heart className="h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Favorites
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                Please sign in to view and manage your favorite cars
              </p>
              <Button 
                onClick={() => navigate('/auth')}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-[400px]">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <Heart className="h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                My Favorites
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-md">
                You haven't added any cars to your favorites yet
              </p>
              <Link to="/cars">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Browse Cars
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-20 px-4">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Favorites
            </h1>
            <p className="text-xl text-muted-foreground">
              {favorites.length} cars saved
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={clearFavorites}
            className="mt-4 md:mt-0"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <Card key={car.id} className="group overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {car.isElectric && (
                    <Badge className="bg-green-100 text-green-800">
                      Electric
                    </Badge>
                  )}
                  <Badge variant="secondary">{car.type}</Badge>
                </div>

                {/* Remove Button */}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-black/20 hover:bg-red-500 text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromFavorites(car.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link to={`/car/${car.brand.toLowerCase().replace(/[^a-z]/g, '')}/${car.id}`}>
                    <Button>
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {car.brand} {car.name}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                    <span>{car.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{car.year}</p>

                 {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Power</p>
                      <p className="font-semibold">{car.specs?.power || 0} HP</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Gauge className="w-4 h-4 mr-2 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Top Speed</p>
                      <p className="font-semibold">{car.specs?.topSpeed || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Starting Price</p>
                  <p className="text-xl font-bold text-primary">{car.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
         </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;