import { useState } from "react";
import { X, Star, Camera, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal = ({ isOpen, onClose }: ReviewModalProps) => {
  const [formData, setFormData] = useState({
    carBrand: "",
    carModel: "",
    year: "",
    rating: 0,
    title: "",
    review: "",
    pros: "",
    cons: "",
    wouldRecommend: "",
    ownershipPeriod: ""
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "שגיאה",
        description: "אנא בחר דירוג לרכב",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    toast({
      title: "הביקורת נשלחה בהצלחה!",
      description: "תודה על שיתוף הביקורת שלך עם הקהילה",
    });
    
    // Reset form
    setFormData({
      carBrand: "",
      carModel: "",
      year: "",
      rating: 0,
      title: "",
      review: "",
      pros: "",
      cons: "",
      wouldRecommend: "",
      ownershipPeriod: ""
    });
    
    onClose();
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Car className="h-6 w-6 ml-2" />
            כתוב ביקורת על הרכב שלך
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Car Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="carBrand">יצרן הרכב</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, carBrand: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר יצרן" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tesla">Tesla</SelectItem>
                  <SelectItem value="bmw">BMW</SelectItem>
                  <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                  <SelectItem value="audi">Audi</SelectItem>
                  <SelectItem value="porsche">Porsche</SelectItem>
                  <SelectItem value="ferrari">Ferrari</SelectItem>
                  <SelectItem value="lamborghini">Lamborghini</SelectItem>
                  <SelectItem value="mclaren">McLaren</SelectItem>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="nissan">Nissan</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                  <SelectItem value="volkswagen">Volkswagen</SelectItem>
                  <SelectItem value="hyundai">Hyundai</SelectItem>
                  <SelectItem value="kia">Kia</SelectItem>
                  <SelectItem value="mazda">Mazda</SelectItem>
                  <SelectItem value="subaru">Subaru</SelectItem>
                  <SelectItem value="skoda">Skoda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="carModel">דגם הרכב</Label>
              <Input
                id="carModel"
                placeholder="לדוגמה: Model 3, 911, C-Class"
                value={formData.carModel}
                onChange={(e) => setFormData(prev => ({ ...prev, carModel: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="year">שנת ייצור</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                min="1990"
                max="2025"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label>דירוג כללי</Label>
            <div className="flex items-center gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    star <= (hoveredRating || formData.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
              <span className="text-sm text-muted-foreground mr-2">
                {formData.rating > 0 && `${formData.rating} מתוך 5`}
              </span>
            </div>
          </div>

          {/* Review Title */}
          <div>
            <Label htmlFor="title">כותרת הביקורת</Label>
            <Input
              id="title"
              placeholder="למשל: רכב מעולה לשימוש יומיומי"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              maxLength={100}
              required
            />
          </div>

          {/* Review Content */}
          <div>
            <Label htmlFor="review">הביקורת שלך</Label>
            <Textarea
              id="review"
              placeholder="ספר על הביצועים, הנוחות, איכות הבנייה, חסכון בדלק ועוד..."
              rows={6}
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              required
            />
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pros">יתרונות</Label>
              <Textarea
                id="pros"
                placeholder="מה מעולה ברכב? (פרד בפסיקים)"
                rows={4}
                value={formData.pros}
                onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="cons">חסרונות</Label>
              <Textarea
                id="cons"
                placeholder="מה פחות טוב? (פרד בפסיקים)"
                rows={4}
                value={formData.cons}
                onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ownershipPeriod">תקופת הבעלות</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, ownershipPeriod: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="כמה זמן יש לך את הרכב?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-6-months">פחות מ-6 חודשים</SelectItem>
                  <SelectItem value="6-months-1-year">6 חודשים - שנה</SelectItem>
                  <SelectItem value="1-2-years">1-2 שנים</SelectItem>
                  <SelectItem value="2-5-years">2-5 שנים</SelectItem>
                  <SelectItem value="more-than-5-years">יותר מ-5 שנים</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="wouldRecommend">האם תמליץ על הרכב?</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, wouldRecommend: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר תשובה" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="definitely">בהחלט כן</SelectItem>
                  <SelectItem value="probably">כנראה כן</SelectItem>
                  <SelectItem value="maybe">אולי</SelectItem>
                  <SelectItem value="probably-not">כנראה לא</SelectItem>
                  <SelectItem value="definitely-not">בהחלט לא</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              ביטול
            </Button>
            <Button type="submit" className="btn-racing">
              פרסם ביקורת
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;