import { ArrowRight, Zap, Users, Star, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroCarImage from "@/assets/hero-car.jpg";
import heroModernShowroom from "@/assets/hero-modern-showroom.jpg";
import heroElectricFuture from "@/assets/hero-electric-future.jpg";
import heroRacingTrack from "@/assets/hero-racing-track.jpg";

const Hero = () => {
  const navigate = useNavigate();
  
  const heroImages = [
    {
      src: heroCarImage,
      title: "Your Ultimate Automotive Hub",
      subtitle: "Discover Premium Vehicles",
      description: "Experience the world's most luxurious and powerful automobiles"
    },
    {
      src: heroModernShowroom,
      title: "Modern Luxury Redefined", 
      subtitle: "Premium Showroom Experience",
      description: "Step into the future of automotive excellence and innovation"
    },
    {
      src: heroElectricFuture,
      title: "Electric Revolution",
      subtitle: "Sustainable Performance",
      description: "Join the electric revolution with cutting-edge technology"
    },
    {
      src: heroRacingTrack,
      title: "Pure Performance",
      subtitle: "Track-Ready Supercars", 
      description: "Feel the adrenaline of professional racing machines"
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevImage = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentHero = heroImages[currentImageIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <div className={`w-full h-full transition-all duration-500 ${isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'}`}>
          <img
            src={currentHero.src}
            alt={currentHero.title}
            className="w-full h-full object-cover transition-transform duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        
        {/* Overlay patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,100,255,0.1),transparent_50%)]" />
      </div>

      {/* Navigation arrows */}
      <Button
        onClick={prevImage}
        variant="ghost"
        size="icon"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white border border-white/30 backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        onClick={nextImage}
        variant="ghost"
        size="icon"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white border border-white/30 backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Image indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-5xl mx-auto">
          {/* Animated title */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-racing-red/20 border border-racing-red/30 rounded-full text-sm font-medium text-racing-red backdrop-blur-sm">
              {currentHero.subtitle}
            </span>
          </div>
          
          <h1 className={`text-6xl md:text-8xl font-bold mb-6 leading-tight transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              {currentHero.title}
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed transition-all duration-500 delay-100 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            {currentHero.description}
          </p>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-500 delay-200 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <Button 
              onClick={() => navigate('/cars')}
              className="btn-racing text-lg px-8 py-4 shadow-2xl hover:shadow-racing-red/25 transform hover:scale-105 transition-all duration-300"
            >
              <Zap className="mr-3 h-5 w-5" />
              גלה רכבים
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate('/reviews')}
              className="text-lg px-8 py-4 bg-white/10 text-white border-2 border-white/30 hover:bg-white hover:text-black backdrop-blur-md shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-3 h-5 w-5" />
              צפה בביקורות
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-500 delay-300 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}>
            <div className="text-center group">
              <div className="flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-racing-red/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Star className="h-10 w-10 text-racing-red mr-3 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-4xl md:text-5xl font-bold relative z-10">2,500+</span>
              </div>
              <p className="text-gray-300 font-medium">ביקורות מקצועיות</p>
              <p className="text-sm text-gray-400">מבחני נהיגה מעמיקים</p>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-electric-blue/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Zap className="h-10 w-10 text-electric-blue mr-3 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-4xl md:text-5xl font-bold relative z-10">150+</span>
              </div>
              <p className="text-gray-300 font-medium">מותגי רכב עולמיים</p>
              <p className="text-sm text-gray-400">כל הדגמים החדישים</p>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center mb-3 relative">
                <div className="absolute inset-0 bg-racing-red/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                <Users className="h-10 w-10 text-racing-red mr-3 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <span className="text-4xl md:text-5xl font-bold relative z-10">50k+</span>
              </div>
              <p className="text-gray-300 font-medium">חברי קהילה פעילים</p>
              <p className="text-sm text-gray-400">מומחים ואנשי מקצוע</p>
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