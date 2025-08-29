import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CarCard from "./CarCard";
import { updatedIsraeliCarsDatabase } from "@/data/updatedCarsData";

const FeaturedCars = () => {
  // בחירת הרכבים המובילים מהנתונים החדשים
  const featuredCars = updatedIsraeliCarsDatabase.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            רכבים <span className="text-racing-red">מומלצים</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            גלה את הרכבים המבוקשים ביותר עם מחירים עדכניים מהשוק הישראלי
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car) => (
            <CarCard 
              key={car.id} 
              car={{
                ...car,
                horsepower: car.specs.power,
                topSpeed: car.specs.topSpeed
              }} 
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            className="btn-hero text-lg"
            onClick={() => window.location.href = '/cars'}
          >
            צפה בכל הרכבים
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;