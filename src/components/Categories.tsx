import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, ArrowLeft, Search as SearchIcon, Home, ArrowRight } from "lucide-react";
import { getCarTypes } from "@/services/carService";
import AdvancedSearch from "./AdvancedSearch";
import { useState, useEffect } from "react";

const Categories = () => {
  const navigate = useNavigate();
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories from Supabase
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

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName}`);
  };


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-racing-red via-racing-red/90 to-racing-red/80 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-white hover:bg-white/20 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                חזרה לעמוד הבית
              </Button>
              <h1 className="text-4xl font-bold mb-2">גלה את הרכב המושלם עבורך</h1>
              <p className="text-xl opacity-90">חפש לפי קטגוריה, מותג או השתמש בחיפוש המתקדם</p>
            </div>
            <div className="hidden md:block">
              <Button 
                onClick={() => setIsAdvancedSearchOpen(true)}
                className="bg-white text-racing-red hover:bg-white/90"
                size="lg"
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                חיפוש מתקדם
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Advanced Search Button */}
        <div className="md:hidden mb-6">
          <Button 
            onClick={() => setIsAdvancedSearchOpen(true)}
            className="w-full bg-racing-red hover:bg-racing-red/90"
            size="lg"
          >
            <SearchIcon className="h-5 w-5 mr-2" />
            חיפוש מתקדם
          </Button>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">עיין לפי קטגוריה</h2>
            <p className="text-muted-foreground text-lg">בחר את סוג הרכב המתאים לצרכים שלך</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card 
                key={category}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.charAt(0)}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-racing-red transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {`רכב מתאים לקטגוריה ${category}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>



        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-racing-red via-racing-red/90 to-racing-red/80 text-white border-0 shadow-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">מוכן למצוא את הרכב הבא שלך?</h3>
              <p className="text-lg mb-6 opacity-90">עיין במגוון הרחב של הרכבים שלנו וקבל את המידע המלא על כל דגם</p>
              <Button 
                onClick={() => navigate("/cars")}
                size="lg"
                className="bg-white text-racing-red hover:bg-white/90 text-lg px-8 py-3"
              >
                <Car className="h-5 w-5 mr-2" />
                צפה בכל הרכבים
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Search Modal */}
      <AdvancedSearch 
        isOpen={isAdvancedSearchOpen}
        onClose={() => setIsAdvancedSearchOpen(false)}
      />
    </div>
  );
};

export default Categories;