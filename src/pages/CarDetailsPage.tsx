import { useParams } from "react-router-dom";
import { ArrowLeft, Star, Zap, Phone, MapPin, ExternalLink, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
import { massiveCarsDatabase } from "@/data/massiveCarsDatabase";
import additionalCarModels from "@/data/additionalCarModels";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";

const CarDetailsPage = () => {
  const { brand, model } = useParams();
  // Combine all car databases
  const allCars = [...massiveCarsDatabase, ...additionalCarModels];
  const car = allCars.find(c => c.id === model);

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">רכב לא נמצא</h1>
          <Button onClick={() => window.location.href = '/cars'}>
            חזרה לרכבים
          </Button>
        </div>
      </div>
    );
  }

  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  const isCarFavorite = isFavorite(car.id);

  const handleFavoriteClick = () => {
    if (isCarFavorite) {
      removeFromFavorites(car.id);
      toast({
        title: "הוסר מהמועדפים",
        description: `${car.brand} ${car.name} הוסר מהמועדפים שלך`,
      });
    } else {
      addToFavorites(car);
      toast({
        title: "נוסף למועדפים",
        description: `${car.brand} ${car.name} נוסף למועדפים שלך`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Breadcrumb */}
        <section className="py-4 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = `/cars/${brand}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              חזרה ל{car.brand}
            </Button>
          </div>
        </section>

        {/* Car Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Left Side - Traditional Info */}
              <div>
                {/* Main Image */}
                <div className="relative mb-8">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    className="w-full h-96 object-cover rounded-lg shadow-automotive"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.isElectric && (
                      <Badge className="bg-electric-blue text-electric-blue-foreground">
                        <Zap className="h-3 w-3 mr-1" />
                        חשמלי
                      </Badge>
                    )}
                    {car.isNew && (
                      <Badge className="bg-success text-white">
                        חדש
                      </Badge>
                    )}
                    <Badge variant="secondary">{car.type}</Badge>
                  </div>
                </div>

                {/* Car Info */}
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {car.brand} <span className="text-racing-red">{car.name}</span>
                  </h1>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      className={`${isCarFavorite ? 'text-racing-red' : ''}`}
                      onClick={handleFavoriteClick}
                    >
                      <Heart className={`h-4 w-4 ${isCarFavorite ? 'fill-racing-red' : ''}`} />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{car.rating}</span>
                  </div>
                  <Badge variant="secondary">{car.year}</Badge>
                  <Badge variant="outline">{car.specs.seating} מושבים</Badge>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  {car.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">מחיר החל מ</p>
                    <p className="text-3xl font-bold text-racing-red">{car.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">כוח מנוע</p>
                    <p className="text-2xl font-bold">{car.specs.power} כ"ס</p>
                  </div>
                </div>

                <Button className="btn-racing text-lg w-full">
                  צור קשר עם סוכן
                </Button>
              </div>

              {/* Right Side - Image Gallery */}
              <div>
                <CarImageGallery 
                  carName={`${car.brand} ${car.name}`}
                  images={[car.image]} // We can add more images here later
                  colors={car.colors}
                  interiorColors={car.interiorColors}
                  onColorChange={(color) => console.log('Color changed to:', color)}
                  onInteriorChange={(color) => console.log('Interior color changed to:', color)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info Tabs */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="specs">מפרטים</TabsTrigger>
                <TabsTrigger value="features">תכונות</TabsTrigger>
                <TabsTrigger value="colors">צבעים</TabsTrigger>
                <TabsTrigger value="pros-cons">יתרונות וחסרונות</TabsTrigger>
                <TabsTrigger value="dealers">נציגויות</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">מפרטים טכניים</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">מנוע</p>
                        <p className="font-semibold">{car.specs.engine}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">תיבת הילוכים</p>
                        <p className="font-semibold">{car.specs.transmission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">הנעה</p>
                        <p className="font-semibold">{car.specs.drivetrain}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">מושבים</p>
                        <p className="font-semibold">{car.specs.seating}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">תאוצה 0-100</p>
                        <p className="font-semibold">{car.specs.acceleration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">מהירות מרבית</p>
                        <p className="font-semibold">{car.specs.topSpeed}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">משקל</p>
                        <p className="font-semibold">{car.specs.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">נפח תא מטען</p>
                        <p className="font-semibold">{car.specs.cargo}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">כוח</p>
                        <p className="font-semibold">{car.specs.power} כ"ס</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">מומנט</p>
                        <p className="font-semibold">{car.specs.torque}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">צריכת דלק</p>
                        <p className="font-semibold">{car.specs.fuel}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-8">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-6">תכונות מרכזיות</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-racing-red rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="colors" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6">צבעי גוף הרכב</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {car.colors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-gray-200"
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-sm font-medium">{color.name}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6">צבעי פנים הרכב</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {car.interiorColors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-16 h-16 rounded-lg mx-auto mb-2 border-4 border-gray-200"
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-sm font-medium">{color.name}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pros-cons" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-success">יתרונות</h3>
                    <div className="space-y-3">
                      {car.pros.map((pro, index) => (
                        <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                          <span>{pro}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  <Card className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-destructive">חסרונות</h3>
                    <div className="space-y-3">
                      {car.cons.map((con, index) => (
                        <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="dealers" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {car.dealerships.map((dealer, index) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-bold mb-4">{dealer.name}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{dealer.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${dealer.phone}`} className="hover:text-racing-red">
                            {dealer.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          <a 
                            href={`https://${dealer.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-racing-red"
                          >
                            {dealer.website}
                          </a>
                        </div>
                      </div>
                      <Button className="w-full mt-4 btn-hero">
                        צור קשר
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetailsPage;