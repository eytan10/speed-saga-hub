import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "./CarCard";
import { featuredCars } from "@/data/cars";

const FeaturedCars = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-racing-red">Vehicles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most sought-after cars that define excellence in automotive engineering
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            className="btn-hero text-lg"
            onClick={() => window.location.href = '/cars'}
          >
            View All Cars
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;