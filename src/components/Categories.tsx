import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { carCategories } from "@/data/cars";
import { useNavigate } from "react-router-dom";
import { expandedBrands, massiveCarsDatabase } from "@/data/massiveCarsDatabase";
import { additionalCarModels } from "@/data/additionalCarModels";
import { normalizeBrand } from "@/lib/utils";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === "Cars") {
      navigate("/cars");
    } else if (categoryName === "Reviews") {
      navigate("/reviews");
    } else if (categoryName === "News") {
      navigate("/news");
    } else if (categoryName === "Community") {
      navigate("/community");
    } else if (categoryName === "Sports Cars") {
      navigate("/category/sports-cars");
    } else if (categoryName === "Electric Vehicles") {
      navigate("/category/electric-vehicles");
    } else if (categoryName === "Luxury Sedans") {
      navigate("/category/luxury-sedans");
    } else if (categoryName === "SUVs") {
      navigate("/category/suvs");
    } else if (categoryName === "Supercars") {
      navigate("/category/supercars");
    } else if (categoryName === "Classic Cars") {
      navigate("/category/classic-cars");
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
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Back to Home Button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Home className="mr-2 h-4 w-4" />
            חזרה לעמוד הבית
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Browse by <span className="text-electric-blue">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find your perfect match from our extensive collection of vehicles
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {carCategories.map((category, index) => (
            <Card 
              key={category.name} 
              className="p-6 hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group bg-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-racing-red transition-smooth">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.count} vehicles available
                </p>
                <Button 
                  variant="ghost" 
                  className="text-racing-red hover:bg-racing-red hover:text-white transition-smooth"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Leading Brands Section */}
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-racing-red">מותגי רכב</span> מובילים
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            גלה את המותגים המובילים עם דגמים זמינים באתר שלנו
          </p>
        </div>

        {/* Leading Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
          {leadingBrands.map((brand) => (
            <Card 
              key={brand.id} 
              className="p-4 hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group bg-card text-center"
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="mb-2">
                {typeof brand.logo === 'string' && !brand.logo.includes('.png') ? (
                  <div className="text-3xl">{brand.logo}</div>
                ) : (
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="h-8 w-8 object-contain mx-auto"
                  />
                )}
              </div>
              <h4 className="font-bold text-sm group-hover:text-electric-blue transition-smooth">
                {brand.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {brand.country}
              </p>
              <div className="mt-2">
                <span className="text-xs bg-racing-red text-white px-2 py-1 rounded-full">
                  {brand.carCount} דגמים
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            className="btn-electric text-lg"
            onClick={() => navigate("/cars")}
          >
            View All Cars
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;