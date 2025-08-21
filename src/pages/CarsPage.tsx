import { Search, Filter, Grid, List } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { massiveCarsDatabase, expandedBrands } from "@/data/massiveCarsDatabase";

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBrands = expandedBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore <span className="text-racing-red">Cars</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              גלה את המגוון הרחב של המותגים המובילים בעולם הרכב
            </p>
          </div>
        </section>

        {/* Search and Filter Bar */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חפש מותג או מודל..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  סינון
                </Button>
                
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">מותגי רכב מובילים</h2>
              <p className="text-muted-foreground">
                בחר מותג כדי לראות את כל הדגמים והמידע המלא
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredBrands.map((brand) => (
                <Card 
                  key={brand.id} 
                  className="p-6 hover:shadow-automotive hover:-translate-y-2 transition-smooth cursor-pointer group"
                  onClick={() => window.location.href = `/cars/${brand.id}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{brand.logo}</div>
                      <div>
                        <h3 className="text-2xl font-bold group-hover:text-racing-red transition-smooth">
                          {brand.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          נוסדה בשנת {brand.founded} • {brand.country}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">מותג יוקרה</Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {brand.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      מגוון דגמים זמין
                    </div>
                    <Button variant="ghost" className="text-racing-red hover:bg-racing-red hover:text-white">
                      צפה בדגמים
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו תוצאות</h3>
                <p className="text-muted-foreground">נסה לחפש במילים אחרות</p>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">150+</div>
                <div className="text-muted-foreground">מותגי רכב</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">2,500+</div>
                <div className="text-muted-foreground">דגמים זמינים</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racing-red mb-2">50k+</div>
                <div className="text-muted-foreground">ביקורות</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-electric-blue mb-2">24/7</div>
                <div className="text-muted-foreground">תמיכה</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CarsPage;