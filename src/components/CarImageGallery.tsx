import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ZoomIn, Palette, Camera } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface CarImageGalleryProps {
  carName: string;
  mainImage: string;
  colors: Array<{ name: string; hex: string; }>;
  interiorColors: Array<{ name: string; hex: string; }>;
}

const CarImageGallery: React.FC<CarImageGalleryProps> = ({ 
  carName, 
  mainImage, 
  colors, 
  interiorColors 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || "#DC143C");
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(interiorColors[0]?.hex || "#1C1C1C");

  // Create multiple angle views (simulate different angles with filters/overlays)
  const imageViews = [
    { name: "מבט קדמי", image: mainImage, filter: "" },
    { name: "מבט צד", image: mainImage, filter: "hue-rotate(15deg)" },
    { name: "מבט אחורי", image: mainImage, filter: "hue-rotate(30deg)" },
    { name: "מבט פנים", image: mainImage, filter: "sepia(0.3) brightness(1.1)" }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageViews.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageViews.length) % imageViews.length);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="h-6 w-6 text-racing-red" />
        <h3 className="text-2xl font-bold">גלריית תמונות</h3>
        <Badge className="bg-racing-red text-white">אינטראקטיבי</Badge>
      </div>

      {/* Main Image Display */}
      <div className="relative mb-6">
        <div className="relative h-96 rounded-lg overflow-hidden shadow-automotive bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={imageViews[currentImageIndex].image}
            alt={`${carName} - ${imageViews[currentImageIndex].name}`}
            className="w-full h-full object-cover transition-all duration-500"
            style={{ 
              filter: imageViews[currentImageIndex].filter,
              borderColor: selectedColor,
              borderWidth: '4px',
              borderStyle: 'solid'
            }}
          />
          
          {/* Image overlay with color hint */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-multiply transition-all duration-300"
            style={{ backgroundColor: selectedColor }}
          />

          {/* Navigation Arrows */}
          <Button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white"
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Zoom Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white"
                size="icon"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <img
                src={imageViews[currentImageIndex].image}
                alt={`${carName} - ${imageViews[currentImageIndex].name}`}
                className="w-full h-auto rounded-lg"
                style={{ 
                  filter: imageViews[currentImageIndex].filter,
                  borderColor: selectedColor,
                  borderWidth: '4px',
                  borderStyle: 'solid'
                }}
              />
            </DialogContent>
          </Dialog>

          {/* Current View Label */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            {imageViews[currentImageIndex].name}
          </div>
        </div>

        {/* Image Thumbnails */}
        <div className="flex gap-2 mt-4 justify-center">
          {imageViews.map((view, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentImageIndex === index 
                  ? "border-racing-red shadow-lg scale-105" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={view.image}
                alt={view.name}
                className="w-full h-full object-cover"
                style={{ filter: view.filter }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Color Customization */}
      <div className="space-y-6">
        {/* Exterior Colors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-5 w-5 text-racing-red" />
            <h4 className="text-lg font-semibold">צבע גוף הרכב</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.hex}
                onClick={() => setSelectedColor(color.hex)}
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

        {/* Interior Colors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-5 w-5 text-electric-blue" />
            <h4 className="text-lg font-semibold">צבע פנים הרכב</h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {interiorColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => setSelectedInteriorColor(color.hex)}
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

        {/* Features */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>תמונות באיכות גבוהה</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-electric-blue rounded-full"></div>
              <span>מבטים מכל הזוויות</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-racing-red rounded-full"></div>
              <span>התאמת צבעים</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>זום מתקדם</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CarImageGallery;