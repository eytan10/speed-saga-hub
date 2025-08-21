import { useParams } from "react-router-dom";
import { ArrowLeft, Star, Zap, Phone, MapPin, ExternalLink, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allCars } from "@/data/carsDatabase";

const CarDetailsPage = () => {
  const { brand, model } = useParams();
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

        {/* Car Hero */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
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
                  <Badge variant="secondary">{car.type}</Badge>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    {car.brand} <span className="text-racing-red">{car.name}</span>
                  </h1>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
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

                <Button className="btn-racing text-lg w-full md:w-auto">
                  צור קשר עם סוכן
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Info Tabs */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specs" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="specs">מפרטים</TabsTrigger>
                <TabsTrigger value="features">תכונות</TabsTrigger>
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