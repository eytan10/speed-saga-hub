import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  trending?: boolean;
}

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute left-0 top-0 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-2xl font-bold pr-8">{article.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Article Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            {article.trending && (
              <Badge className="absolute top-4 right-4 bg-racing-red text-white">
                טרנדי
              </Badge>
            )}
          </div>

          {/* Article Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(article.date).toLocaleDateString('he-IL')}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-6">
              {article.excerpt}
            </p>
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Author */}
          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">
              מאת <span className="font-semibold">{article.author}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;