import { Search, Filter, Star, ThumbsUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewModal from "@/components/ReviewModal";

const ReviewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const reviews = [
    {
      id: 1,
      carBrand: "Ferrari",
      carModel: "488 GTB",
      carType: "Sports Car",
      rating: 4.8,
      title: "ביצועים מדהימים ועיצוב מושלם",
      content: "נהיגה ברכב הזה זה חלום שהתגשם. המנוע V8 טורבו מעניק תחושה בלתי נשכחת, והעיצוב פשוט מרהיב. המחיר גבוה אבל מוצדק לחלוטין עבור הטכנולוgia והביצועים שמקבלים.",
      author: {
        name: "דוד כהן",
        avatar: "/api/placeholder/40/40",
        verified: true
      },
      date: "2024-01-15",
      likes: 45,
      comments: 12,
      helpful: 38
    },
    {
      id: 2,
      carBrand: "Tesla",
      carModel: "Model S Plaid",
      carType: "Electric Sedan",
      rating: 4.6,
      title: "המדהים ביותר ברכבים חשמליים",
      content: "התאוצה של הרכב הזה פשוט מטורפת. 0-100 בפחות מ-2 שניות זה משהו שצריך לחוות כדי להאמין. הטכנולוגיה מתקדמת מאוד אבל לפעמים יכולה להיות מבלבלת. איכות הבנייה השתפרה משמעותית.",
      author: {
        name: "שרה לוי",
        avatar: "/api/placeholder/40/40",
        verified: true
      },
      date: "2024-01-12",
      likes: 32,
      comments: 8,
      helpful: 29
    },
    {
      id: 3,
      carBrand: "Porsche",
      carModel: "911 Turbo S",
      carType: "Sports Car",
      rating: 4.9,
      title: "האיזון המושלם בין ביצועים ונוחות",
      content: "פורשה 911 זה המוטו האולטימטיבי עבורי. הביצועים מרשימים מאוד, אבל בניגוד לסופרקארים אחרים, אפשר להשתמש בו גם כרכב יומיומי. איכות הבנייה ברמה הגבוהה ביותר.",
      author: {
        name: "מיכאל אברהם",
        avatar: "/api/placeholder/40/40",
        verified: false
      },
      date: "2024-01-10",
      likes: 56,
      comments: 15,
      helpful: 42
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.carBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.includes(searchTerm) ||
      review.content.includes(searchTerm);
    
    const matchesFilter = 
      filterType === "all" || 
      review.carType.toLowerCase().replace(" ", "").includes(filterType);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-racing-red">ביקורות</span> רכבים
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              קרא ביקורות מפורטות מבעלי רכבים אמיתיים וקבל החלטה מושכלת
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חפש ביקורות..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("all")}
                >
                  הכל
                </Button>
                <Button
                  variant={filterType === "sportscar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("sportscar")}
                >
                  מכוניות ספורט
                </Button>
                <Button
                  variant={filterType === "electricsedan" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("electricsedan")}
                >
                  רכבים חשמליים
                </Button>
                <Button
                  variant={filterType === "luxury" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType("luxury")}
                >
                  יוקרה
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">ביקורות מאומתות</h2>
              <p className="text-muted-foreground">
                {filteredReviews.length} ביקורות נמצאו
              </p>
            </div>

            <div className="space-y-8">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="p-8 hover:shadow-automotive transition-smooth">
                  {/* Review Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 md:mb-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.author.avatar} />
                        <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.author.name}</h4>
                          {review.author.verified && (
                            <Badge variant="secondary" className="text-xs">
                              מאומת
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString('he-IL')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{review.carType}</Badge>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-bold">{review.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-racing-red mb-2">
                      {review.carBrand} {review.carModel}
                    </h3>
                    <h4 className="text-xl font-semibold mb-2">{review.title}</h4>
                  </div>

                  {/* Review Content */}
                  <div className="mb-6">
                    <p className="text-foreground leading-relaxed">
                      {review.content}
                    </p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-racing-red transition-smooth">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-racing-red transition-smooth">
                        <MessageCircle className="h-4 w-4" />
                        <span>{review.comments}</span>
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.helpful} אנשים מצאו את זה מועיל
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו ביקורות</h3>
                <p className="text-muted-foreground mb-6">
                  נסה לחפש במילים אחרות או לשנות את הסינון
                </p>
                <Button onClick={() => { setSearchTerm(""); setFilterType("all"); }}>
                  אפס חיפוש
                </Button>
              </div>
            )}

            {/* Write Review CTA */}
            <div className="text-center mt-16 pt-16 border-t border-border">
              <h3 className="text-2xl font-bold mb-4">יש לך רכב לבקר?</h3>
              <p className="text-muted-foreground mb-6">
                שתף את החוויה שלך ועזור לאחרים לקבל החלטה מושכלת
              </p>
              <Button 
                className="btn-racing text-lg"
                onClick={() => setIsReviewModalOpen(true)}
              >
                כתוב ביקורת
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};

export default ReviewsPage;