import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, ThumbsUp, Heart, Share2, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
    badge: string;
  };
  category: string;
  carBrand: string;
  replies: number;
  likes: number;
  views: number;
  date: string;
  tags: string[];
}

interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  date: string;
  likes: number;
}

interface DiscussionModalProps {
  discussion: Discussion | null;
  isOpen: boolean;
  onClose: () => void;
}

const DiscussionModal = ({ discussion, isOpen, onClose }: DiscussionModalProps) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: "אני גם עברתי על הבחירה הזו. בסופו של דבר בחרתי בטסלה בגלל הטעינה המהירה יותר והרשת הנרחבת של טסלה בארץ.",
      author: {
        name: "רון דוד",
        avatar: "/api/placeholder/40/40",
        reputation: 445
      },
      date: "2024-01-20",
      likes: 12
    },
    {
      id: 2,
      content: "פורשה טייקאן יותר מעניינת מבחינת הנהיגה, אבל טסלה יותר פרקטית לשימוש יומיומי. תלוי מה חשוב לך יותר.",
      author: {
        name: "מיכל שר",
        avatar: "/api/placeholder/40/40",
        reputation: 678
      },
      date: "2024-01-20",
      likes: 8
    }
  ]);
  const { toast } = useToast();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        content: newComment,
        author: {
          name: "משתמש אנונימי",
          avatar: "/api/placeholder/40/40",
          reputation: 100
        },
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "התגובה נוספה בהצלחה",
        description: "התגובה שלך נוספה לדיון"
      });
    }
  };

  if (!discussion) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">דיון קהילתי</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Original Discussion */}
          <div className="border-b pb-6">
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

            <h3 className="text-xl font-bold mb-3">
              {discussion.title}
            </h3>
            
            <p className="text-foreground mb-4">
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

            {/* Action buttons */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <ThumbsUp className="h-4 w-4 mr-1" />
                {discussion.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Heart className="h-4 w-4 mr-1" />
                שמור
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-1" />
                שתף
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">תגובות ({comments.length})</h4>
            
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-2 border-primary/20 pl-4 py-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {comment.author.reputation} נקודות
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.date).toLocaleDateString('he-IL')}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{comment.content}</p>
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="border-t pt-4">
            <h5 className="font-medium mb-3">הוסף תגובה</h5>
            <div className="space-y-3">
              <Textarea
                placeholder="כתוב את התגובה שלך כאן..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="btn-racing"
                >
                  <Send className="h-4 w-4 mr-2" />
                  פרסם תגובה
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiscussionModal;