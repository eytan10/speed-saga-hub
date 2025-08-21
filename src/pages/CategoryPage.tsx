import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Home, Search, Grid3X3, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { massiveCarsDatabase } from "@/data/massiveCarsDatabase";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");
  
  // Define category mappings
  const categoryMappings: Record<string, string[]> = {
    "sports-cars": ["מכונית ספורט", "סופרקאר", "קופה ספורט", "רודסטר ספורט", "האצ׳בק ספורט"],
    "suvs": ["SUV", "SUV קומפקטי", "SUV יוקרה", "SUV גדול", "SUV שטח", "SUV סופר ספורט", "SUV מסלול", "SUV חשמלי"],
    "electric-vehicles": [],
    "luxury-sedans": ["סדאן יוקרה", "סדאן יוקרה עילית", "סדאן"],
    "supercars": ["סופרקאר", "היפרקאר", "סופרקאר מסלול", "סופרקאר ספורט", "היפרקאר היברידי"],
    "classic-cars": ["סופרקאר קלאסי", "סופרקאר היסטורי", "סופרקאר אייקוני"]
  };

  // Get category title
  const getCategoryTitle = (cat: string | undefined) => {
    switch (cat) {
      case "sports-cars": return "רכבי ספורט";
      case "suvs": return "רכבי שטח";
      case "electric-vehicles": return "רכבים חשמליים";
      case "luxury-sedans": return "סדאנים יוקרתיים";
      case "supercars": return "סופרקארים";
      case "classic-cars": return "רכבים קלאסיים";
      default: return "רכבים";
    }
  };

  // Filter cars by category
  const filteredCars = massiveCarsDatabase.filter(car => {
    // Category filter
    let matchesCategory = false;
    if (category === "electric-vehicles") {
      matchesCategory = car.isElectric === true;
    } else if (category && categoryMappings[category]) {
      matchesCategory = categoryMappings[category].includes(car.type);
    } else {
      matchesCategory = true;
    }

    // Search filter
    const matchesSearch = searchTerm ? 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case "price":
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      case "rating":
        return b.rating - a.rating;
      case "power":
        return b.specs.power - a.specs.power;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleCarClick = (car: typeof massiveCarsDatabase[0]) => {
    navigate(`/car/${car.brand.toLowerCase()}/${car.id}`);
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
            <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
              {filteredCars.length} רכבים זמינים
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
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}>
                {filteredCars.map((car) => (
                  <Card 
                    key={car.id} 
                    className={`overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    onClick={() => handleCarClick(car)}
                  >
                    <div className={viewMode === "list" ? "w-1/3" : ""}>
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className={`w-full object-cover ${
                          viewMode === "list" ? "h-48" : "h-48"
                        }`}
                      />
                    </div>
                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{car.type}</Badge>
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-sm">{car.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-electric-blue transition-smooth">
                        {car.brand} {car.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                        {car.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>כוח:</span>
                          <span>{car.specs.power} כ״ס</span>
                        </div>
                        <div className="flex justify-between">
                          <span>שנה:</span>
                          <span>{car.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-bold text-racing-red">
                          {car.price}
                        </span>
                        <Button variant="outline" size="sm">
                          פרטים
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;