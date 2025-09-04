import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, ArrowLeft, Search as SearchIcon, Home, ArrowRight } from "lucide-react";
import { massiveCarsDatabase, expandedBrands } from "@/data/massiveCarsDatabase";
import { updatedCarCategories } from "@/data/updatedCarsData";
import { additionalCarModels } from "@/data/additionalCarModels";
import { normalizeBrand } from "@/lib/utils";

const Categories = () => {
  const navigate = useNavigate();

  // Define categories in Hebrew
  const categories = [
    { name: "סדאן", icon: "🚗", description: "רכבים משפחתיים נוחים" },
    { name: "SUV", icon: "🚙", description: "רכבי שטח מרווחים" },
    { name: "הצ'בק", icon: "🚘", description: "רכבים קומפקטיים" },
    { name: "קופה", icon: "🏎️", description: "רכבי ספורט אלגנטיים" },
    { name: "רכבים חשמליים", icon: "⚡", description: "טכנולוגיה ירוקה" },
    { name: "רכבי יוקרה", icon: "✨", description: "מותגי פרימיום" },
    { name: "פיקאפ", icon: "🛻", description: "רכבי עבודה חזקים" },
    { name: "ספורט", icon: "🏁", description: "ביצועים גבוהים" }
  ];

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "רכבים חשמליים") {
      navigate("/category/electric-vehicles");
    } else if (categoryName === "רכבי יוקרה") {
      navigate("/category/luxury-cars");
    } else if (categoryName === "ספורט") {
      navigate("/category/sports-cars");
    } else if (categoryName === "SUV") {
      navigate("/category/suvs");
    } else if (categoryName === "סדאן") {
      navigate("/category/sedans");
    } else if (categoryName === "הצ'בק") {
      navigate("/category/hatchbacks");
    } else if (categoryName === "קופה") {
      navigate("/category/coupes");
    } else if (categoryName === "פיקאפ") {
      navigate("/category/pickups");
    } else {
      navigate("/cars");
    }
  };

  const handleBrandClick = (brandId: string) => {
    navigate(`/brand/${brandId}`);
  };

  // Get brands that actually have cars in the database with their count
  const getBrandsWithCarCount = () => {
    const allCars = [...massiveCarsDatabase, ...additionalCarModels];
    const brandCounts = allCars.reduce<Map<string, number>>((acc, { brand }) => {
      if (!brand) return acc;
      const id = normalizeBrand(brand);
      acc.set(id, (acc.get(id) ?? 0) + 1);
      return acc;
    }, new Map());

    return expandedBrands
      .filter(brand => brandCounts.has(normalizeBrand(brand.id)))
      .map(brand => ({
        ...brand,
        carCount: brandCounts.get(normalizeBrand(brand.id)) ?? 0
      }))
      .sort((a, b) => b.carCount - a.carCount);
  };

  const leadingBrands = getBrandsWithCarCount();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">גלה את הרכב המושלם עבורך</h1>
          <p className="text-xl text-muted-foreground">חפש לפי קטגוריה, מותג או השתמש בחיפוש המתקדם</p>
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
                key={category.name}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-racing-red transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leading Brands Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">מותגים מובילים</h2>
            <p className="text-muted-foreground text-lg">מותגי הרכב הפופולריים ביותר עם המגוון הרחב ביותר</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leadingBrands.map((brand) => (
              <Card 
                key={brand.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-0 shadow-lg"
                onClick={() => handleBrandClick(brand.id)}
              >
                <CardHeader className="text-center pb-2">
                  {brand.logo && (
                    typeof brand.logo === "string" && (brand.logo.includes(".") || brand.logo.startsWith("/")) ? (
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="w-16 h-16 mx-auto mb-4 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {brand.logo}
                      </div>
                    )
                  )}
                  <CardTitle className="text-xl group-hover:text-racing-red transition-colors">
                    {brand.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mb-2">
                      {brand.country}
                    </Badge>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4" />
                        <span>{brand.carCount} דגמים</span>
                      </div>
                    </div>
                  </div>
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
    </div>
  );
};

export default Categories;