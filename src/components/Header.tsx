import { Search, Menu, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b border-border z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-racing-red" />
          <span className="text-2xl font-bold">AutoHub</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground hover:text-racing-red transition-smooth">
            Cars
          </a>
          <a href="#" className="text-foreground hover:text-racing-red transition-smooth">
            Reviews
          </a>
          <a href="#" className="text-foreground hover:text-racing-red transition-smooth">
            News
          </a>
          <a href="#" className="text-foreground hover:text-racing-red transition-smooth">
            Community
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              className="pl-10 w-64"
            />
          </div>
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
                placeholder="Search cars..."
                className="pl-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <a href="#" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                Cars
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                Reviews
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                News
              </a>
              <a href="#" className="block py-2 text-foreground hover:text-racing-red transition-smooth">
                Community
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;