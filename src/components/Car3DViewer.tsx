import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Palette, Car } from "lucide-react";
import * as THREE from "three";

interface Car3DViewerProps {
  carName: string;
  colors: Array<{ name: string; hex: string; }>;
  interiorColors: Array<{ name: string; hex: string; }>;
  onColorChange?: (color: string) => void;
  onInteriorChange?: (color: string) => void;
}

// רכיב הרכב התלת מימדי
const CarModel = ({ color, interiorColor }: { color: string; interiorColor: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group>
      {/* גוף הרכב הראשי */}
      <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[4, 1.2, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* גג הרכב */}
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.5, 0.8, 1.5]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* גלגלים */}
      <mesh position={[1.3, -0.8, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.3, -0.8, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.3, -0.8, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.3, -0.8, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* חלונות */}
      <mesh position={[0.8, 0.8, 0.75]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.6, 0.05]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.8, 0.8, -0.75]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.6, 0.05]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
      </mesh>

      {/* פנסים קדמיים */}
      <mesh position={[1.8, 0, 0.6]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color="#F0F0F0" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.8, 0, -0.6]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.15, 8, 6]} />
        <meshStandardMaterial color="#F0F0F0" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </mesh>

      {/* פנסים אחוריים */}
      <mesh position={[-1.8, 0, 0.6]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.8, 0, -0.6]} rotation={[0, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.2} />
      </mesh>

      {/* פנים הרכב */}
      <mesh position={[0, 0.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[3.5, 0.8, 1.3]} />
        <meshStandardMaterial color={interiorColor} />
      </mesh>
    </group>
  );
};

const Car3DViewer: React.FC<Car3DViewerProps> = ({ 
  carName, 
  colors, 
  interiorColors, 
  onColorChange, 
  onInteriorChange 
}) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.hex || "#DC143C");
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(interiorColors[0]?.hex || "#1C1C1C");
  const [isRotating, setIsRotating] = useState(true);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  const handleInteriorChange = (color: string) => {
    setSelectedInteriorColor(color);
    onInteriorChange?.(color);
  };

  const handleReset = () => {
    setSelectedColor(colors[0]?.hex || "#DC143C");
    setSelectedInteriorColor(interiorColors[0]?.hex || "#1C1C1C");
    setIsRotating(true);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <Car className="h-6 w-6 text-racing-red" />
        <h3 className="text-2xl font-bold">תצוגת תלת מימד</h3>
        <Badge className="bg-racing-red text-white">אינטראקטיבי</Badge>
      </div>

      {/* תצוגת תלת מימד */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-automotive mb-6">
        <Canvas>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[5, 2, 5]} />
            <OrbitControls 
              enablePan={true} 
              enableZoom={true} 
              enableRotate={true}
              autoRotate={isRotating}
              autoRotateSpeed={2}
            />
            
            {/* תאורה */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />
            
            {/* רקע */}
            <Environment preset="sunset" />
            
            {/* מודל הרכב */}
            <CarModel color={selectedColor} interiorColor={selectedInteriorColor} />
          </Suspense>
        </Canvas>

        {/* הוראות שימוש */}
        <div className="absolute top-4 left-4 bg-black/70 text-white p-3 rounded-lg text-sm">
          <p>🖱️ גרור לסיבוב</p>
          <p>🔄 גלגל עכבר לזום</p>
          <p>⏸️ לחץ להפסקת סיבוב</p>
        </div>

        {/* כפתור עצירת/הפעלת סיבוב */}
        <Button
          onClick={() => setIsRotating(!isRotating)}
          className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white"
          size="sm"
        >
          {isRotating ? "⏸️ עצור" : "▶️ הפעל"}
        </Button>
      </div>

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
            <Car className="h-5 w-5 text-electric-blue" />
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
    </Card>
  );
};

export default Car3DViewer;