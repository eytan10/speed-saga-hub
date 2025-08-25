import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ImageIcon, Palette, RotateCcw } from "lucide-react";

interface CarImageGalleryProps {
  carName: string;
  images: string[];
  colors: Array<{ name: string; hex: string; }>;
  interiorColors: Array<{ name: string; hex: string; }>;
  onColorChange?: (color: string) => void;
  onInteriorChange?: (color: string) => void;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ 
  carName, 
  images, 
  colors, 
  interiorColors, 
  onColorChange, 
  onInteriorChange 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || "#DC143C");
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(interiorColors[0]?.hex || "#1C1C1C");
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  const handleInteriorChange = (color: string) => {
    setSelectedInteriorColor(color);
    onInteriorChange?.(color);
  };

  const handleReset = () => {
    setCurrentImageIndex(0);
    setSelectedColor(colors[0]?.hex || "#DC143C");
    setSelectedInteriorColor(interiorColors[0]?.hex || "#1C1C1C");
    setIsAutoPlay(false);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="h-6 w-6 text-racing-red" />
        <h3 className="text-2xl font-bold">גלריית תמונות אינטראקטיבית</h3>
        <Badge className="bg-racing-red text-white">HD</Badge>
      </div>

      {/* תצוגת תמונות */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-automotive mb-6 group">
        <img
          src={images[currentImageIndex]}
          alt={`${carName} - תמונה ${currentImageIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        
        {/* כפתורי ניווט */}
        {images.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all"
              size="icon"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all"
              size="icon"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* אינדיקטור תמונה נוכחית */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* כפתור נגינה אוטומטית */}
        <Button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
          size="sm"
        >
          {isAutoPlay ? "⏸️ עצור" : "▶️ נגינה"}
        </Button>
      </div>

      {/* תמונות מוקטנות */}
      {images.length > 1 && (
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                currentImageIndex === index 
                  ? "border-racing-red shadow-lg" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={image}
                alt={`${carName} - תמונה מוקטנת ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* בחירת צבעים */}
      <div className="space-y-6">
        {/* צבע גוף הרכב */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-5 w-5 text-racing-red" />
            <h4 className="text-lg font-semibold">צבע גוף הרכב</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.hex}
                onClick={() => handleColorChange(color.hex)}
                className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                  selectedColor === color.hex 
                    ? "border-racing-red shadow-lg scale-110" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            צבע נבחר: {colors.find(c => c.hex === selectedColor)?.name}
          </p>
        </div>

        {/* צבע פנים */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-5 w-5 text-electric-blue" />
            <h4 className="text-lg font-semibold">צבע פנים הרכב</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {interiorColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => handleInteriorChange(color.hex)}
                className={`w-10 h-10 rounded-lg border-3 transition-all hover:scale-110 ${
                  selectedInteriorColor === color.hex 
                    ? "border-electric-blue shadow-lg scale-110" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            פנים נבחר: {interiorColors.find(c => c.hex === selectedInteriorColor)?.name}
          </p>
        </div>

        {/* כפתור איפוס */}
        <div className="pt-4 border-t border-border">
          <Button
            onClick={handleReset}
            variant="outline"
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            איפוס לברירת מחדל
          </Button>
        </div>
      </div>

      {/* מידע נוסף */}
      <div className="mt-6 p-4 bg-black/5 dark:bg-white/5 rounded-lg">
        <h4 className="font-semibold mb-2">טיפים לצפייה:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• לחץ על התמונות הקטנות למעבר מהיר</li>
          <li>• השתמש בחצי הניווט או בנגינה אוטומטית</li>
          <li>• בחר צבעים שונים לראות אפשרויות העיצוב</li>
          <li>• רחף מעל התמונה לזום קל</li>
        </ul>
      </div>
    </Card>
  );
};

export default CarImageGallery;