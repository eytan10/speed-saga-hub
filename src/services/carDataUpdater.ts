import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CarUpdateData {
  brand: string;
  model: string;
  year: number;
  price_ils?: number;
  image_url?: string;
  specs?: any;
}

class CarDataUpdater {
  private isUpdating = false;

  async startFullUpdate(): Promise<void> {
    if (this.isUpdating) {
      toast.error("עדכון כבר מתבצע, אנא המתן...");
      return;
    }

    this.isUpdating = true;
    toast.info("מתחיל עדכון שיטתי של כל נתוני הרכבים...");

    try {
      // שלב 1: סריקת מחירים מ-iCar
      await this.scrapePricesFromIcar();
      
      // שלב 2: סריקת מחירים מ-Auto.co.il
      await this.scrapePricesFromAuto();
      
      // שלב 3: עדכון תמונות רכבים
      await this.updateCarImages();
      
      // שלב 4: סנכרון עם הנתונים הקיימים
      await this.synchronizeCarData();
      
      toast.success("עדכון כל נתוני הרכבים הושלם בהצלחה!");
      
    } catch (error) {
      console.error("Error during full update:", error);
      toast.error("שגיאה בעדכון נתוני הרכבים");
    } finally {
      this.isUpdating = false;
    }
  }

  private async scrapePricesFromIcar(): Promise<void> {
    toast.info("סורק מחירים מ-iCar.co.il...");
    
    try {
      const { data, error } = await supabase.functions.invoke('car-data-updater', {
        body: { action: 'scrape_icar_prices' }
      });

      if (error) throw error;
      
      toast.success(`נמצאו ${data.results_count} מחירים ב-iCar`);
      
    } catch (error) {
      console.error("Error scraping iCar:", error);
      toast.warning("בעיה בסריקת מחירים מ-iCar");
    }
  }

  private async scrapePricesFromAuto(): Promise<void> {
    toast.info("סורק מחירים מ-Auto.co.il...");
    
    try {
      const { data, error } = await supabase.functions.invoke('car-data-updater', {
        body: { action: 'scrape_auto_prices' }
      });

      if (error) throw error;
      
      toast.success(`נמצאו ${data.results_count} מחירים ב-Auto.co.il`);
      
    } catch (error) {
      console.error("Error scraping Auto.co.il:", error);
      toast.warning("בעיה בסריקת מחירים מ-Auto.co.il");
    }
  }

  private async updateCarImages(): Promise<void> {
    toast.info("מעדכן תמונות רכבים...");
    
    try {
      const { data, error } = await supabase.functions.invoke('car-data-updater', {
        body: { action: 'update_car_images' }
      });

      if (error) throw error;
      
      const successfulUpdates = data.updates.filter((u: any) => u.uploaded).length;
      toast.success(`עודכנו ${successfulUpdates} תמונות רכבים`);
      
    } catch (error) {
      console.error("Error updating car images:", error);
      toast.warning("בעיה בעדכון תמונות הרכבים");
    }
  }

  private async synchronizeCarData(): Promise<void> {
    toast.info("מסנכרן נתוני רכבים...");
    
    try {
      // קבלת כל הקבצים מה-Storage
      const { data: files, error } = await supabase.storage
        .from('cars')
        .list('scraped-prices');

      if (error) throw error;

      // עיבוד קבצי המחירים החדשים
      const priceUpdates = new Map();
      
      for (const file of files) {
        if (file.name.endsWith('.json')) {
          const { data: fileData, error: downloadError } = await supabase.storage
            .from('cars')
            .download(`scraped-prices/${file.name}`);

          if (!downloadError && fileData) {
            const text = await fileData.text();
            const prices = JSON.parse(text);
            
            prices.forEach((priceData: any) => {
              const key = `${priceData.brand}-${priceData.model || priceData.car_info}`;
              if (!priceUpdates.has(key) || priceUpdates.get(key).price_ils < priceData.price_ils) {
                priceUpdates.set(key, priceData);
              }
            });
          }
        }
      }

      // יצירת קובץ מחירים מאוחד
      const unifiedPrices = Array.from(priceUpdates.values());
      
      const { error: uploadError } = await supabase.storage
        .from('cars')
        .upload(
          `unified-prices-${Date.now()}.json`,
          JSON.stringify(unifiedPrices, null, 2),
          { 
            contentType: 'application/json',
            upsert: true 
          }
        );

      if (uploadError) throw uploadError;

      toast.success("סנכרון נתונים הושלם בהצלחה");
      
    } catch (error) {
      console.error("Error synchronizing data:", error);
      toast.error("שגיאה בסנכרון הנתונים");
    }
  }

  async updateSingleCar(carData: CarUpdateData): Promise<void> {
    try {
      const { data, error } = await supabase.functions.invoke('car-data-updater', {
        body: { 
          action: 'update_single_car',
          carData 
        }
      });

      if (error) throw error;
      
      toast.success(`רכב ${carData.brand} ${carData.model} עודכן בהצלחה`);
      
    } catch (error) {
      console.error("Error updating single car:", error);
      toast.error(`שגיאה בעדכון הרכב ${carData.brand} ${carData.model}`);
    }
  }

  async getUpdateStatus(): Promise<{ isUpdating: boolean }> {
    return { isUpdating: this.isUpdating };
  }
}

export const carDataUpdater = new CarDataUpdater();