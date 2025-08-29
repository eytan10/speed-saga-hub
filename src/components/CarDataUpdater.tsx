import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Database, Download, Image, DollarSign } from "lucide-react";
import { carDataUpdater } from "@/services/carDataUpdater";
import { toast } from "sonner";

const CarDataUpdater = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  useEffect(() => {
    checkUpdateStatus();
  }, []);

  const checkUpdateStatus = async () => {
    const status = await carDataUpdater.getUpdateStatus();
    setIsUpdating(status.isUpdating);
  };

  const handleFullUpdate = async () => {
    setIsUpdating(true);
    setProgress(0);
    
    try {
      // סימולציה של התקדמות
      const steps = [
        { name: "סריקת מחירים מ-iCar.co.il", progress: 25 },
        { name: "סריקת מחירים מ-Auto.co.il", progress: 50 },
        { name: "עדכון תמונות רכבים", progress: 75 },
        { name: "סנכרון נתונים", progress: 100 }
      ];

      for (const step of steps) {
        setCurrentStep(step.name);
        setProgress(step.progress);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      await carDataUpdater.startFullUpdate();
      
    } catch (error) {
      toast.error("שגיאה בעדכון נתוני הרכבים");
    } finally {
      setIsUpdating(false);
      setProgress(0);
      setCurrentStep("");
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <Database className="h-5 w-5 mr-2 text-primary" />
              מעדכן נתוני רכבים
            </h3>
            <p className="text-muted-foreground mt-1">
              עדכון שיטתי של מחירים ותמונות מהמקורות הישראליים
            </p>
          </div>
          <Badge variant={isUpdating ? "default" : "secondary"}>
            {isUpdating ? "פעיל" : "לא פעיל"}
          </Badge>
        </div>

        {/* Progress Section */}
        {isUpdating && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{currentStep}</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Data Sources */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <DollarSign className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium">iCar.co.il</span>
            <span className="text-xs text-muted-foreground">מחירים</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium">Auto.co.il</span>
            <span className="text-xs text-muted-foreground">מחירים</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <Image className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium">Auto-Data</span>
            <span className="text-xs text-muted-foreground">תמונות</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <Download className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium">Stanford</span>
            <span className="text-xs text-muted-foreground">Dataset</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleFullUpdate}
            disabled={isUpdating}
            className="flex-1"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isUpdating ? 'animate-spin' : ''}`} />
            {isUpdating ? "מעדכן..." : "התחל עדכון מלא"}
          </Button>
          
          <Button 
            variant="outline"
            onClick={checkUpdateStatus}
            disabled={isUpdating}
          >
            בדוק סטטוס
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground bg-secondary/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">כיצד פועל המערכת:</h4>
          <ul className="space-y-1 text-xs">
            <li>• סורק מחירים עדכניים מאתרי iCar ו-Auto.co.il</li>
            <li>• מוריד תמונות איכותיות של הרכבים</li>
            <li>• שומר הכל ב-Supabase Storage באופן מאורגן</li>
            <li>• מסנכרן עם הנתונים הקיימים באתר</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CarDataUpdater;