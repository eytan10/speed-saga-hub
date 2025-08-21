import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-racing-red" />
              <span className="text-2xl font-bold">AutoHub</span>
            </div>
            <p className="text-primary-foreground/80">
              Your ultimate destination for everything automotive. Discover, explore, and connect with the world's most extraordinary vehicles.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-racing-red">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-racing-red">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-racing-red">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:text-racing-red">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><button onClick={() => navigate('/reviews')} className="hover:text-racing-red transition-smooth text-left">Car Reviews</button></li>
              <li><button onClick={() => navigate('/news')} className="hover:text-racing-red transition-smooth text-left">Latest News</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Buying Guides</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Car Comparisons</button></li>
              <li><button onClick={() => navigate('/community')} className="hover:text-racing-red transition-smooth text-left">Community</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Sports Cars</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Electric Vehicles</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Luxury Sedans</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">SUVs</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-left">Classic Cars</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-primary-foreground/80">
              Subscribe to our newsletter for the latest automotive news and reviews.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground text-primary"
              />
              <Button className="w-full btn-racing">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-primary-foreground/80">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@autohub.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Los Angeles, CA</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-primary-foreground/80">
              <p>&copy; 2024 AutoHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;