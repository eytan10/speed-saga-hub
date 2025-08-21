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
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Car className="h-8 w-8 text-racing-red" />
              <span className="text-2xl font-bold">AutoHub</span>
            </div>
            <p className="text-primary-foreground/80">
              האב הרכב שלך - גלה, חקור והתחבר לעולם הרכב המרהיב ביותר. כל מה שאתה צריך לדעת על רכבים במקום אחד.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
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
            <h3 className="text-lg font-semibold">קישורים מהירים</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><button onClick={() => navigate('/reviews')} className="hover:text-racing-red transition-smooth text-right">ביקורות רכב</button></li>
              <li><button onClick={() => navigate('/news')} className="hover:text-racing-red transition-smooth text-right">חדשות עדכניות</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-right">מדריכי קנייה</button></li>
              <li><button onClick={() => navigate('/cars')} className="hover:text-racing-red transition-smooth text-right">השוואות רכבים</button></li>
              <li><button onClick={() => navigate('/community')} className="hover:text-racing-red transition-smooth text-right">קהילה</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">קטגוריות</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><button onClick={() => navigate('/category/sports-cars')} className="hover:text-racing-red transition-smooth text-right">מכוניות ספורט</button></li>
              <li><button onClick={() => navigate('/category/electric-vehicles')} className="hover:text-racing-red transition-smooth text-right">רכבים חשמליים</button></li>
              <li><button onClick={() => navigate('/category/luxury-sedans')} className="hover:text-racing-red transition-smooth text-right">סדאנים יוקרתיים</button></li>
              <li><button onClick={() => navigate('/category/suvs')} className="hover:text-racing-red transition-smooth text-right">רכבי שטח</button></li>
              <li><button onClick={() => navigate('/category/classic-cars')} className="hover:text-racing-red transition-smooth text-right">רכבים קלאסיים</button></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">הישאר מעודכן</h3>
            <p className="text-primary-foreground/80">
              הירשם לניוזלטר שלנו וקבל את החדשות והביקורות האחרונות מעולם הרכב.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="כתובת המייל שלך"
                className="bg-primary-foreground text-primary text-right"
              />
              <Button className="w-full btn-racing">
                הירשם
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 rtl:sm:space-x-reverse text-primary-foreground/80">
              <div className="flex items-center">
                <Mail className="h-4 w-4 ml-2" />
                <span>contact@autohub.co.il</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                <span>03-555-0123</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 ml-2" />
                <span>תל אביב, ישראל</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-primary-foreground/80">
              <p>&copy; 2024 AutoHub. כל הזכויות שמורות.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;