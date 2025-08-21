import { Search, MessageCircle, ThumbsUp, Users, Star, Plus, Filter } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CommunityPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const communityStats = {
    totalMembers: 52834,
    activePosts: 1247,
    expertsOnline: 89,
    questionsAnswered: 3521
  };

  const discussions = [
    {
      id: 1,
      title: "איך לבחור בין טסלה מודל S לפורשה טייקאן?",
      content: "אני מתלבט בין שני הרכבים החשמליים האלה. יש לי תקציב של עד 150,000$ ואני מחפש רכב שיהיה מהיר אבל גם נוח לנסיעות יומיומיות. מה הדעה שלכם?",
      author: {
        name: "יוסי כהן", 
        avatar: "/api/placeholder/40/40",
        reputation: 342,
        badge: "מומחה חשמלי"
      },
      category: "עזרה בבחירה",
      carBrand: "Tesla",
      replies: 23,
      likes: 45,
      views: 156,
      date: "2024-01-20",
      tags: ["חשמלי", "יוקרה", "ביצועים"]
    },
    {
      id: 2,
      title: "חוויית הנהיגה שלי עם פרארי F8 Tributo",
      content: "אחרי שנה שלמה עם הרכב הזה, חשבתי לשתף את החוויות שלי. הביצועים מדהימים, אבל יש כמה דברים שכדאי לדעת לפני הרכישה...",
      author: {
        name: "דנה רוזן",
        avatar: "/api/placeholder/40/40", 
        reputation: 891,
        badge: "בעלת סופרקאר"
      },
      category: "חוות דעת",
      carBrand: "Ferrari",
      replies: 34,
      likes: 78,
      views: 234,
      date: "2024-01-18",
      tags: ["פרארי", "חוויה", "סופרקאר"]
    },
    {
      id: 3,
      title: "בעיות בתיבת הילוכים PDK של פורשה - מישהו חווה?",
      content: "יש לי פורשה 911 מ2022 ולאחרונה אני מרגיש רעידות מוזרות בתיבת ההילוכים. מישהו חווה משהו דומה? האם זה נושא ידוע?",
      author: {
        name: "מיכאל לוי",
        avatar: "/api/placeholder/40/40",
        reputation: 156,
        badge: "חבר קהילה"
      },
      category: "בעיות טכניות", 
      carBrand: "Porsche",
      replies: 12,
      likes: 8,
      views: 89,
      date: "2024-01-17",
      tags: ["פורשה", "תיבת הילוכים", "בעיה טכנית"]
    }
  ];

  const topContributors = [
    {
      name: "אלון שמיר",
      avatar: "/api/placeholder/40/40",
      reputation: 2847,
      badge: "מומחה פרימיום",
      speciality: "רכבים חשמליים",
      contributions: 234
    },
    {
      name: "שרון כהן", 
      avatar: "/api/placeholder/40/40",
      reputation: 1923,
      badge: "מכונאי מוסמך",
      speciality: "מנועי בנזין",
      contributions: 189
    },
    {
      name: "דוד אברהם",
      avatar: "/api/placeholder/40/40", 
      reputation: 1654,
      badge: "אספן רכבים",
      speciality: "רכבים קלאסיים",
      contributions: 167
    }
  ];

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.includes(searchTerm) ||
    discussion.content.includes(searchTerm) ||
    discussion.author.name.includes(searchTerm) ||
    discussion.carBrand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-racing-red">קהילת</span> חובבי הרכב
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
              הצטרף לקהילה הגדולה ביותר של חובבי רכב בישראל
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">{communityStats.totalMembers.toLocaleString()}</div>
                <div className="text-gray-300">חברי קהילה</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{communityStats.activePosts}</div>
                <div className="text-gray-300">פוסטים פעילים</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{communityStats.expertsOnline}</div>
                <div className="text-gray-300">מומחים אונליין</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{communityStats.questionsAnswered}</div>
                <div className="text-gray-300">שאלות נענו</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="discussions" className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <TabsList className="mb-4 md:mb-0">
                    <TabsTrigger value="discussions">דיונים</TabsTrigger>
                    <TabsTrigger value="questions">שאלות ותשובות</TabsTrigger>
                    <TabsTrigger value="reviews">חוות דעת</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex gap-4">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="חפש בקהילה..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button className="btn-racing">
                      <Plus className="h-4 w-4 mr-2" />
                      פוסט חדש
                    </Button>
                  </div>
                </div>

                <TabsContent value="discussions" className="space-y-6">
                  {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="p-6 hover:shadow-automotive transition-smooth">
                      {/* Discussion Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={discussion.author.avatar} />
                            <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{discussion.author.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {discussion.author.badge}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{discussion.author.reputation} נקודות מוניטין</span>
                              <span>{new Date(discussion.date).toLocaleDateString('he-IL')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{discussion.category}</Badge>
                          <Badge className="bg-racing-red text-white">{discussion.carBrand}</Badge>
                        </div>
                      </div>

                      {/* Discussion Content */}
                      <h3 className="text-xl font-bold mb-3 hover:text-racing-red transition-smooth cursor-pointer">
                        {discussion.title}
                      </h3>
                      
                      <p className="text-foreground mb-4 line-clamp-3">
                        {discussion.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {discussion.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Discussion Stats */}
                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center space-x-6 rtl:space-x-reverse">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse text-muted-foreground">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {discussion.views} צפיות
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          הצטרף לדיון
                        </Button>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="questions">
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold mb-4">שאלות ותשובות</h3>
                    <p className="text-muted-foreground mb-6">
                      כאן תוכל למצוא תשובות לשאלות הטכניות שלך
                    </p>
                    <Button className="btn-electric">
                      שאל שאלה
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-bold mb-4">חוות דעת מהקהילה</h3>
                    <p className="text-muted-foreground mb-6">
                      קרא ביקורות אמיתיות מבעלי רכבים
                    </p>
                    <Button className="btn-racing">
                      כתוב ביקורת
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Top Contributors */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Star className="h-5 w-5 text-racing-red mr-2" />
                  תורמים מובילים
                </h3>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1">
                          <h4 className="font-medium text-sm">{contributor.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {contributor.badge}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{contributor.speciality}</p>
                        <p className="text-xs text-racing-red font-medium">
                          {contributor.contributions} תרומות
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">פעולות מהירות</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    שאל שאלה
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    התחל דיון
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    כתוב ביקורת
                  </Button>
                </div>
              </Card>

              {/* Community Guidelines */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">כללי הקהילה</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• התנהג בכבוד כלפי חברי הקהילה</p>
                  <p>• שתף מידע מדויק ומועיל</p>
                  <p>• אל תפרסם תוכן פרסומי</p>
                  <p>• עזור לאחרים ותקבל עזרה בחזרה</p>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  קרא עוד
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;