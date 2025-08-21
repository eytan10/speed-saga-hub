import { Search, Calendar, Clock, ArrowRight, TrendingUp, Zap } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsArticles } from "@/data/expandedCarsDatabase";
import ArticleModal from "@/components/ArticleModal";
import newsBackground from "@/assets/news-background.jpg";
import newsTeslaBattery from "@/assets/news-tesla-battery.jpg";

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  const categories = [
    { id: "all", name: "הכל", icon: "📰" },
    { id: "electric", name: "רכבים חשמליים", icon: "⚡" },
    { id: "racing", name: "מירוצים", icon: "🏎️" },
    { id: "technology", name: "טכנולוגיה", icon: "🔧" },
    { id: "reviews", name: "ביקורות", icon: "⭐" },
    { id: "industry", name: "תעשייה", icon: "🏭" }
  ];

  const featuredNews = {
    id: 1,
    title: "טסלה חושפת טכנולוגיית סוללות מהפכנית לשנת 2025",
    excerpt: "טכנולוגיית 4680 החדשה מבטיחה טווח של 50% יותר וטעינה מהירה יותר עבור הדור הבא של רכבים חשמליים",
    content: "בכנס המשקיעים השנתי של טסלה, חשפה החברה את הדור הבא של סוללות 4680 שיהפוך את הרכבים החשמליים ליעילים ונגישים יותר מאי פעם. הטכנולוגיה החדשה כוללת שיפורים בצפיפות האנרגיה, זמני הטעינה ומחזור החיים של הסוללות.",
    category: "Electric",
    date: "2024-01-20",
    readTime: "5 דקות קריאה",
    author: "מיכל רוזן",
    image: newsTeslaBattery,
    trending: true
  };

  const allNews = newsArticles;

  const filteredNews = allNews.filter(article => {
    const matchesSearch = 
      article.title.includes(searchTerm) ||
      article.excerpt.includes(searchTerm) ||
      article.author.includes(searchTerm);
    
    const matchesCategory = 
      selectedCategory === "all" || 
      article.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section 
          className="py-16 bg-gradient-hero relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${newsBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              חדשות <span className="text-racing-red">רכב</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              הישאר מעודכן עם החדשות האחרונות מעולם הרכב והטכנולוגיה
            </p>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-racing-red" />
                <h2 className="text-2xl font-bold">כתבה מובילה</h2>
              </div>
            </div>

            <Card className="overflow-hidden mb-16 hover:shadow-automotive transition-smooth">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  {featuredNews.trending && (
                    <Badge className="absolute top-4 right-4 bg-racing-red text-white">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      טרנדי
                    </Badge>
                  )}
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="secondary">{featuredNews.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 hover:text-racing-red transition-smooth">
                    {featuredNews.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredNews.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(featuredNews.date).toLocaleDateString('he-IL')}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      מאת {featuredNews.author}
                    </span>
                  </div>

                  <Button 
                    className="btn-racing self-start"
                    onClick={() => handleArticleClick(featuredNews)}
                  >
                    קרא עוד
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Search and Categories */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="חפש חדשות..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center gap-1"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">חדשות אחרונות</h2>
              <p className="text-muted-foreground">
                {filteredNews.length} כתבות נמצאו
              </p>
            </div>

            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map((article) => (
                  <Card 
                    key={article.id} 
                    className="overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth group cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                        <Button 
                          variant="ghost" 
                          className="text-white border-white hover:bg-white hover:text-black"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArticleClick(article);
                          }}
                        >
                          קרא עוד
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-racing-red transition-smooth line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(article.date).toLocaleDateString('he-IL')}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {article.author}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-bold mb-4">לא נמצאו כתבות</h3>
                <p className="text-muted-foreground mb-6">
                  נסה לחפש במילים אחרות או לבחור קטגוריה אחרת
                </p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
                  אפס חיפוש
                </Button>
              </div>
            )}

            {/* Newsletter Signup */}
            <div className="text-center mt-16 pt-16 border-t border-border">
              <div className="max-w-md mx-auto">
                <Zap className="h-12 w-12 text-racing-red mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">הישאר מעודכן</h3>
                <p className="text-muted-foreground mb-6">
                  קבל את החדשות האחרונות מעולם הרכב ישירות למייל
                </p>
                <div className="flex gap-2">
                  <Input placeholder="כתובת מייל" className="flex-1" />
                  <Button className="btn-racing">
                    הרשם
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <ArticleModal 
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={() => {
          setIsArticleModalOpen(false);
          setSelectedArticle(null);
        }}
      />
    </div>
  );
};

export default NewsPage;