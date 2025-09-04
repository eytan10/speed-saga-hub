import { useParams } from "react-router-dom";
import { ArrowLeft, Star, Zap, Phone, MapPin, ExternalLink, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarImageGallery from "@/components/CarImageGallery";
import CarInfoPanel from "@/components/CarInfoPanel";
import { massiveCarsDatabase } from "@/data/massiveCarsDatabase";
import { additionalCarModels } from "@/data/additionalCarModels";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useToast } from "@/hooks/use-toast";
import { getCarKey } from "@/utils/carKey";
import { ReviewsSection } from "@/components/Reviews/ReviewsSection";

const CarDetailsPage = () => {
  const { brand, model } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { toast } = useToast();
  
  // Combine cars from both databases
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

  const carKey = getCarKey({ id: car.id, brand: car.brand, name: car.name, year: car.year });
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
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={async () => {
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: `${car.brand} ${car.name}`,
                              text: `בדוק את הרכב המדהים הזה - ${car.brand} ${car.name}`,
                              url: window.location.href,
                            });
                          } catch (err) {
                            console.log('Error sharing:', err);
                          }
                        } else {
                          await navigator.clipboard.writeText(window.location.href);
                          toast({
                            title: "הקישור הועתק!",
                            description: "הקישור הועתק ללוח",
                          });
                        }
                      }}
                    >
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

                             {/* Right Side - Technical Specifications */}
               <div>
                 <Card className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mb-6 shadow-2xl">
                   <div className="text-center mb-8">
                     <h3 className="text-3xl font-bold mb-2">מפרטים טכניים</h3>
                     <div className="w-24 h-1 bg-gradient-to-r from-racing-red to-red-600 mx-auto rounded-full"></div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Column 1 - Engine & Performance */}
                     <div className="space-y-4">
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">מנוע</p>
                         <p className="font-bold text-lg">{car.specs.engine}</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">תיבת הילוכים</p>
                         <p className="font-bold text-lg">{car.specs.transmission}</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">הנעה</p>
                         <p className="font-bold text-lg">{car.specs.drivetrain}</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">מושבים</p>
                         <p className="font-bold text-lg">{car.specs.seating}</p>
                       </div>
                     </div>
                     
                     {/* Column 2 - Performance */}
                     <div className="space-y-4">
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">תאוצה 0-100</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.acceleration).toFixed(3)} שניות</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">מהירות מרבית</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.topSpeed).toFixed(3)} קמ"ש</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">משקל</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.weight).toFixed(3)} ק"ג</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">נפח תא מטען</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.cargo).toFixed(3)} ליטר</p>
                       </div>
                     </div>
                     
                     {/* Column 3 - Power & Fuel */}
                     <div className="space-y-4">
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">כוח</p>
                         <p className="font-bold text-lg text-racing-red">{Number(car.specs.power).toFixed(3)} כ"ס</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">מומנט</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.torque).toFixed(3)} נמ</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">צריכת דלק</p>
                         <p className="font-bold text-lg">{parseFloat(car.specs.fuel).toFixed(3)} ליטר/100 ק"מ</p>
                       </div>
                       <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 p-4 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all hover:scale-105">
                         <p className="text-gray-300 text-sm mb-1 font-medium">דירוג</p>
                         <p className="font-bold text-lg text-racing-red">{Number(car.rating).toFixed(3)} ⭐</p>
                       </div>
                     </div>
                   </div>
                 </Card>

                {/* Car Info Card */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">מידע על הרכב</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">יצרן</p>
                        <p className="font-semibold">{car.brand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">דגם</p>
                        <p className="font-semibold">{car.name}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">שנה</p>
                        <p className="font-semibold">{car.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">סוג רכב</p>
                        <p className="font-semibold">{car.type}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">מחיר החל מ-</p>
                      <p className="text-2xl font-bold text-racing-red">{car.price}</p>
                    </div>
                    {car.isElectric && (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-electric-blue" />
                        <span className="text-sm text-electric-blue font-medium">רכב חשמלי</span>
                      </div>
                    )}
                    {car.isNew && (
                      <Badge className="bg-success text-white">חדש לשנת {new Date().getFullYear()}</Badge>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info Tabs */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
                         <Tabs defaultValue="features" className="w-full">
               <TabsList className="grid w-full grid-cols-3">
                 <TabsTrigger value="features">תכונות</TabsTrigger>
                 <TabsTrigger value="pros-cons">יתרונות וחסרונות</TabsTrigger>
                 <TabsTrigger value="dealers">נציגויות</TabsTrigger>
               </TabsList>

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

        {/* Reviews Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ReviewsSection carKey={carKey} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetailsPage;