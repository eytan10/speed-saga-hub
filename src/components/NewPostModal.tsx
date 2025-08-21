import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal = ({ isOpen, onClose }: NewPostModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    carBrand: "",
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState("");

  const categories = [
    "דיון כללי",
    "עזרה בבחירה", 
    "חוות דעת",
    "בעיות טכניות",
    "שאלות ותשובות",
    "חדשות ועדכונים"
  ];

  const carBrands = [
    "Tesla", "BMW", "Mercedes-Benz", "Audi", "Porsche", "Ferrari", 
    "McLaren", "Lamborghini", "Toyota", "Honda", "Ford", "Nissan", "אחר"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "שגיאה",
        description: "אנא מלא את כל השדות הנדרשים",
        variant: "destructive"
      });
      return;
    }

    // Here would be the actual post creation logic
    toast({
      title: "הפוסט נוצר בהצלחה!",
      description: "הפוסט שלך פורסם בקהילה",
    });
    
    // Reset form
    setFormData({
      title: "",
      content: "",
      category: "",
      carBrand: "",
      tags: []
    });
    setNewTag("");
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">יצירת פוסט חדש</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">כותרת הפוסט *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="כתב כותרת מעניינת לפוסט שלך..."
              className="text-right"
            />
          </div>

          {/* Category and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">קטגוריה *</label>
              <Select value={formData.category} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר קטגוריה" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">מותג רכב (אופציונלי)</label>
              <Select value={formData.carBrand} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, carBrand: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="בחר מותג" />
                </SelectTrigger>
                <SelectContent>
                  {carBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">תוכן הפוסט *</label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="שתף את המחשבות, השאלות או החוויות שלך עם הקהילה..."
              className="min-h-[120px] text-right"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">תגיות</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="הוסף תגית..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              ביטול
            </Button>
            <Button type="submit" className="flex-1 btn-racing">
              פרסם פוסט
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;