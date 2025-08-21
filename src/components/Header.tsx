import { Search, Menu, Car, Heart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useFavorites } from "@/contexts/FavoritesContext";
import MegaMenu from "./MegaMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-racing-red" />
          <a href="/" className="text-2xl font-bold hover:text-racing-red transition-smooth cursor-pointer">AutoHub</a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-foreground hover:text-racing-red transition-smooth">
            בית
          </a>
          <div className="relative group">
            <button 
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-1 text-foreground hover:text-racing-red transition-smooth"
            >
              רכבים
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <a href="/reviews" className="text-foreground hover:text-racing-red transition-smooth">
            ביקורות
          </a>
          <a href="/news" className="text-foreground hover:text-racing-red transition-smooth">
            חדשות
          </a>
          <a href="/community" className="text-foreground hover:text-racing-red transition-smooth">
            קהילה
          </a>
        </div>

        {/* Search Bar & Favorites */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="חפש רכבים..."
              className="pl-10 w-64"
            />
          </div>
          <a href="/favorites" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-racing-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חפש רכבים..."
                className="pl-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <a href="/" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                בית
              </a>
              <a href="/cars" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                רכבים
              </a>
              <a href="/reviews" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                ביקורות
              </a>
              <a href="/news" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                חדשות
              </a>
              <a href="/community" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                קהילה
              </a>
              <a href="/favorites" className="flex items-center py-2 text-foreground hover:text-racing-red transition-smooth">
                <Heart className="h-4 w-4 ml-2" />
                מועדפים {favorites.length > 0 && `(${favorites.length})`}
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Mega Menu */}
      <MegaMenu 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;