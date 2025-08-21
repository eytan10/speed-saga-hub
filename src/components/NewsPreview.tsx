import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import teslaBatteryImage from "@/assets/news-tesla-battery.jpg";
import ferrariLemansImage from "@/assets/news-ferrari-lemans.jpg";
import porscheHybridImage from "@/assets/news-porsche-hybrid.jpg";

const NewsPreview = () => {
  const navigate = useNavigate();
  const news = [
    {
      id: 1,
      title: "Tesla Unveils Revolutionary Battery Technology",
      excerpt: "New 4680 battery cells promise 50% more range and faster charging capabilities for future electric vehicles.",
      category: "Electric",
      date: "2024-01-15",
      readTime: "5 min read",
      image: teslaBatteryImage
    },
    {
      id: 2,
      title: "Ferrari Announces Return to Le Mans",
      excerpt: "The Italian supercar manufacturer confirms their participation in the 2024 24 Hours of Le Mans race.",
      category: "Racing",
      date: "2024-01-14",
      readTime: "3 min read",
      image: ferrariLemansImage
    },
    {
      id: 3,
      title: "Porsche 911 Hybrid: The Future of Sports Cars",
      excerpt: "Porsche reveals details about their upcoming hybrid powertrain for the iconic 911 lineup.",
      category: "Technology",
      date: "2024-01-13",
      readTime: "4 min read",
      image: porscheHybridImage
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Latest <span className="text-racing-red">News</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Stay updated with the latest automotive news, reviews, and industry insights
            </p>
          </div>
          <Button 
            className="btn-hero mt-6 md:mt-0"
            onClick={() => navigate('/news')}
          >
            כל הכתבות
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Card 
              key={article.id} 
              className="overflow-hidden hover:shadow-automotive hover:-translate-y-2 transition-smooth group cursor-pointer"
              onClick={() => navigate(`/news/${article.id}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                  <Button 
                    variant="ghost" 
                    className="text-white border-white hover:bg-white hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/news/${article.id}`);
                    }}
                  >
                    קרא עוד
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs hover:bg-racing-red hover:text-white cursor-pointer transition-smooth"
                  >
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
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-racing-red group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;