import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Home, Search, Grid3X3, List, Filter, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCarsByType, getCarTypes, CarData } from "@/services/carService";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

// Map URL slugs to DB car type values
const slugToType: Record<string, string> = {
  "sports-car": "Sports Car",
  "classic-car": "Classic Car",
  "electric-car": "Electric Car"
};

// Map DB car type values to slugs
const typeToSlug: Record<string, string> = {
  "Sports Car": "sports-car",
  "Classic Car": "classic-car",
  "Electric Car": "electric-car"
};

// Map DB car type values to display names (optional, for Hebrew)
const typeDisplayNames: Record<string, string> = {
  "Sports Car": "רכב ספורט",
  "Classic Car": "רכב קלאסי",
  "Electric Car": "רכב חשמלי"
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  const [cars, setCars] = useState<CarData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();

  // Always map the slug to the DB value
  const dbType = category && slugToType[category] ? slugToType[category] : category;
  console.log('CategoryPage dbType:', dbType); // DEBUG: log the mapped DB value

  // Fetch cars for the category
  useEffect(() => {
    const fetchCategoryCars = async () => {
      if (!dbType) return;
      setLoading(true);
      try {
        const result = await getCarsByType(dbType, page, pageSize); // <--- use dbType here!
        setCars(result.data);
        setTotal(result.total);
      } catch (error) {
        console.error('Error fetching category cars:', error);
        toast({
          title: "שגיאה",
          description: "לא ניתן לטעון את הרכבים. נסה שוב מאוחר יותר.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryCars();
  }, [dbType, page, pageSize, toast]);

  // Fetch all categories for navigation
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const types = await getCarTypes();
        setCategories(types);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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
  
  // Get category title for display
  const getCategoryTitle = (cat: string | undefined) => {
    if (!cat) return "רכבים";
    const dbType = slugToType[cat] ? slugToType[cat] : cat;
    return typeDisplayNames[dbType] || dbType;
  };

  // Filter and sort cars
  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.type.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price_ils - b.price_ils;
      case "rating":
        return b.price_ils - a.price_ils; // Sort by price for now since rating might not exist
      case "power":
        return b.specs.horsepower - a.specs.horsepower;
      default:
        return (a.brand + " " + a.model).localeCompare(b.brand + " " + b.model);
    }
  });

  const handleCarClick = (car: CarData) => {
    navigate(`/car/${car.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="container mx-auto px-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="mb-8 hover:bg-primary hover:text-primary-foreground"
            >
              <Home className="mr-2 h-4 w-4" />
              חזרה לעמוד הבית
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {getCategoryTitle(category)}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              גלה את מגוון {getCategoryTitle(category)} המרשים שלנו
            </p>
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={dbType === cat ? "default" : "secondary"}
                  className="cursor-pointer text-lg px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => navigate(`/category/${typeToSlug[cat] || cat}`)}
                >
                  {typeDisplayNames[cat] || cat}
                </Badge>
              ))}
            </div>
            <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
              {total} רכבים זמינים
            </Badge>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="חפש רכבים..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 items-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="מיין לפי" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">שם</SelectItem>
                    <SelectItem value="price">מחיר</SelectItem>
                    <SelectItem value="rating">דירוג</SelectItem>
                    <SelectItem value="power">כוח</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid/List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredCars.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו רכבים</h3>
                <p className="text-muted-foreground mb-8">נסה לשנות את מילות החיפוש או הסינון</p>
                <Button onClick={() => setSearchTerm("")}>
                  נקה חיפוש
                </Button>
              </div>
            ) : loading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
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
                {filteredCars.map((car) => (
                  <Card 
                    key={car.id} 
                    className={`overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group relative ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    onClick={() => handleCarClick(car)}
                  >
                    <div className={viewMode === "list" ? "w-1/3 relative" : "relative"}>
                      <img 
                        src="/default-car.jpg" // Always use default placeholder image
                        alt={`${car.brand} ${car.model}`}
                        className={`w-full object-cover ${
                          viewMode === "list" ? "h-48" : "h-48"
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
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">{car.price_ils ? (car.price_ils / 100000).toFixed(1) : 'N/A'}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-electric-blue transition-smooth">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                        {car.specs.engine || "אין תיאור זמין."}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>כוח:</span>
                          <span>{car.specs.horsepower || 'N/A'} כ״ס</span>
                        </div>
                        <div className="flex justify-between">
                          <span>שנה:</span>
                          <span>{car.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-racing-red">
                          ₪{car.price_ils?.toLocaleString()}
                        </span>
                        <Button variant="outline" size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/car/${car.id}`);
                          }}
                        >
                          פרטים
                          <ArrowRight className="ml-2 h-4 w-4" />
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
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;