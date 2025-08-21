import { ArrowRight, Zap, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCarImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroCarImage}
          alt="Luxury sports car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Ultimate
            <span className="block bg-gradient-to-r from-racing-red to-electric-blue bg-clip-text text-transparent">
              Automotive Hub
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Discover, explore, and connect with the world's most extraordinary vehicles. 
            From classic legends to cutting-edge supercars.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button className="btn-racing text-lg">
              Explore Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-lg border-white text-white hover:bg-white hover:text-black">
              Latest Reviews
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-8 w-8 text-racing-red mr-2" />
                <span className="text-3xl font-bold">2,500+</span>
              </div>
              <p className="text-gray-300">Car Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-8 w-8 text-electric-blue mr-2" />
                <span className="text-3xl font-bold">150+</span>
              </div>
              <p className="text-gray-300">Car Brands</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-racing-red mr-2" />
                <span className="text-3xl font-bold">50k+</span>
              </div>
              <p className="text-gray-300">Community Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;