import { Search, Menu, Car, Heart, ChevronDown, ArrowLeftRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import MegaMenu from "./MegaMenu";
import SmartSearch from "./SmartSearch";
import EnhancedCarComparison from "./EnhancedCarComparison";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-racing-red" />
            <button 
              onClick={() => navigate("/")}
              className="text-2xl font-bold hover:text-racing-red transition-smooth cursor-pointer"
            >
              AutoHub
            </button>
          </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => navigate("/")}
            className="text-foreground hover:text-racing-red transition-smooth px-2"
          >
            בית
          </button>
          <div className="relative group">
            <button 
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="flex items-center gap-1 text-foreground hover:text-racing-red transition-smooth px-2"
            >
              רכבים
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <button 
            onClick={() => navigate("/reviews")}
            className="text-foreground hover:text-racing-red transition-smooth"
          >
            ביקורות
          </button>
          <button 
            onClick={() => navigate("/news")}
            className="text-foreground hover:text-racing-red transition-smooth"
          >
            חדשות
          </button>
          <button 
            onClick={() => navigate("/community")}
            className="text-foreground hover:text-racing-red transition-smooth"
          >
            קהילה
          </button>
        </div>

        {/* Search Bar, Comparison, Favorites & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <SmartSearch className="w-80" />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsComparisonOpen(true)}
            className="hover:bg-racing-red/10 hover:text-racing-red transition-smooth"
            title="השווה רכבים"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>
          <button
            onClick={() => navigate("/favorites")}
            className="relative"
          >
            <Button variant="ghost" size="icon" className="hover:bg-racing-red/10 hover:text-racing-red transition-smooth">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-racing-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Button>
          </button>
          <Button 
            variant="default"
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-racing-red hover:bg-racing-red/90 text-white"
          >
            <User className="h-4 w-4 ml-2" />
            התחבר / הירשם
          </Button>
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
            <SmartSearch />
            <div className="space-y-2">
              <button 
                onClick={() => navigate("/")}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                בית
              </button>
              <button 
                onClick={() => navigate("/cars")}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                רכבים
              </button>
              <button 
                onClick={() => navigate("/reviews")}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                ביקורות
              </button>
              <button 
                onClick={() => navigate("/news")}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                חדשות
              </button>
              <button 
                onClick={() => navigate("/community")}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                קהילה
              </button>
              <button 
                onClick={() => setIsComparisonOpen(true)}
                className="block py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                השווה רכבים
              </button>
              <button 
                onClick={() => navigate("/favorites")}
                className="flex items-center py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                <Heart className="h-4 w-4 ml-2" />
                מועדפים {favorites.length > 0 && `(${favorites.length})`}
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center py-2 text-foreground hover:text-racing-red transition-smooth w-full text-right"
              >
                <User className="h-4 w-4 ml-2" />
                התחבר / הירשם
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mega Menu */}
      <MegaMenu 
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />
      <EnhancedCarComparison 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;