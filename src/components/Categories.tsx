import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { carCategories } from "@/data/cars";

const Categories = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {carCategories.map((category, index) => (
            <Card 
              key={category.name} 
              className="p-6 hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group bg-card"
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

        {/* CTA */}
        <div className="text-center">
          <Button className="btn-electric text-lg">
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;