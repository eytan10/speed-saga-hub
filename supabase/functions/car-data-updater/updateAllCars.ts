import { allCarsForUpdate, getCarDescription, getImageSearchTerms } from "./carDatabase.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// פונקציה לעדכון כל הרכבים
export async function updateAllCars(supabase: any, updateProgress: any) {
  console.log('Starting comprehensive car database update...');
  
  // Reset progress
  updateProgress.isUpdating = true;
  updateProgress.currentStep = 'מתחיל עדכון כל הרכבים...';
  updateProgress.progress = 0;
  updateProgress.totalCars = allCarsForUpdate.length;
  updateProgress.processedCars = 0;
  updateProgress.errors = [];
  updateProgress.completedCars = [];

  // Start background task for updating all cars
  const backgroundTask = async () => {
    try {
      const batchSize = 5; // עיבוד 5 רכבים בכל פעם
      
      for (let i = 0; i < allCarsForUpdate.length; i += batchSize) {
        const batch = allCarsForUpdate.slice(i, i + batchSize);
        
        updateProgress.currentStep = `מעבד רכבים ${i + 1}-${Math.min(i + batchSize, allCarsForUpdate.length)} מתוך ${allCarsForUpdate.length}`;
        
        // Process batch in parallel
        const batchPromises = batch.map(async (car, batchIndex) => {
          try {
            const globalIndex = i + batchIndex;
            
            // Generate high-quality image
            const imageSearchTerms = getImageSearchTerms(car.brand, car.model, car.category);
            const imageUrl = await generateCarImage(car.brand, car.model, imageSearchTerms);
            
            // Create comprehensive car data
            const carData = {
              id: `${car.brand.toLowerCase()}-${car.model.toLowerCase().replace(/\s+/g, '-')}`,
              brand: car.brand,
              model: car.model,
              year: 2024,
              category: car.category,
              price_ils: car.basePrice,
              image_url: imageUrl,
              description: getCarDescription(car.brand, car.model, car.category),
              specs: generateCarSpecs(car.brand, car.model, car.category, car.basePrice),
              updated_at: new Date().toISOString()
            };
            
            // Save to Supabase Storage
            const fileName = `${carData.id}-updated.json`;
            const { error: uploadError } = await supabase.storage
              .from('cars')
              .upload(`updated-cars/${fileName}`, JSON.stringify(carData, null, 2), {
                contentType: 'application/json',
                upsert: true
              });

            if (uploadError) throw uploadError;

            updateProgress.completedCars.push({
              brand: car.brand,
              model: car.model,
              status: 'completed',
              timestamp: new Date().toISOString()
            });

            updateProgress.processedCars++;
            updateProgress.progress = Math.round((updateProgress.processedCars / updateProgress.totalCars) * 100);
            
            console.log(`Updated: ${car.brand} ${car.model} (${updateProgress.processedCars}/${updateProgress.totalCars})`);
            
          } catch (error) {
            console.error(`Error updating ${car.brand} ${car.model}:`, error);
            updateProgress.errors.push({
              brand: car.brand,
              model: car.model,
              error: error.message,
              timestamp: new Date().toISOString()
            });
          }
        });

        await Promise.all(batchPromises);
        
        // Small delay between batches to avoid overloading
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Create summary file
      const summary = {
        total_cars: updateProgress.totalCars,
        processed_cars: updateProgress.processedCars,
        successful_updates: updateProgress.completedCars.length,
        errors: updateProgress.errors.length,
        completion_time: new Date().toISOString(),
        completed_cars: updateProgress.completedCars,
        errors_log: updateProgress.errors
      };

      await supabase.storage
        .from('cars')
        .upload(`summary/update-summary-${Date.now()}.json`, JSON.stringify(summary, null, 2), {
          contentType: 'application/json',
          upsert: true
        });

      updateProgress.currentStep = 'עדכון הושלם בהצלחה!';
      updateProgress.isUpdating = false;
      
      console.log('Car database update completed!');
      
    } catch (error) {
      console.error('Fatal error in car update process:', error);
      updateProgress.currentStep = 'שגיאה בעדכון';
      updateProgress.isUpdating = false;
      updateProgress.errors.push({
        type: 'fatal_error',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  };

  // Use waitUntil for background processing
  if (typeof EdgeRuntime !== 'undefined' && EdgeRuntime.waitUntil) {
    EdgeRuntime.waitUntil(backgroundTask());
  } else {
    // Fallback for local development
    backgroundTask();
  }

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: 'עדכון כל הרכבים החל בהצלחה',
      total_cars: allCarsForUpdate.length,
      estimated_time: `${Math.ceil(allCarsForUpdate.length / 5) * 2} דקות`
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

// Helper function to generate car images
async function generateCarImage(brand: string, model: string, searchTerms: string): Promise<string> {
  try {
    // In a real implementation, this would call an AI image generation service
    // For now, we'll use placeholder URLs with proper search terms
    const encodedSearch = encodeURIComponent(`${brand} ${model} professional car photography`);
    return `https://images.unsplash.com/search?q=${encodedSearch}&w=1200&h=675&fit=crop`;
    
  } catch (error) {
    console.error(`Error generating image for ${brand} ${model}:`, error);
    return `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=675&fit=crop`; // Fallback
  }
}

// Helper function to generate realistic car specs
function generateCarSpecs(brand: string, model: string, category: string, price: number) {
  const specs = {
    supercar: {
      power: 500 + Math.random() * 500,
      acceleration: '2.8-3.5',
      topSpeed: 280 + Math.random() * 50,
      fuelConsumption: 12 + Math.random() * 8
    },
    hypercar: {
      power: 800 + Math.random() * 400,
      acceleration: '2.2-2.8',
      topSpeed: 320 + Math.random() * 50,
      fuelConsumption: 15 + Math.random() * 10
    },
    electric_sedan: {
      power: 300 + Math.random() * 400,
      acceleration: '3.0-5.0',
      range: 400 + Math.random() * 200,
      chargingTime: '30-45 דקות (80%)'
    },
    luxury_sedan: {
      power: 200 + Math.random() * 200,
      acceleration: '5.0-7.0',
      topSpeed: 200 + Math.random() * 50,
      fuelConsumption: 7 + Math.random() * 4
    },
    compact_suv: {
      power: 150 + Math.random() * 100,
      acceleration: '7.0-10.0',
      topSpeed: 180 + Math.random() * 40,
      fuelConsumption: 6 + Math.random() * 3
    }
  };

  const categorySpecs = specs[category] || specs.luxury_sedan;
  
  return {
    power: Math.round(categorySpecs.power),
    acceleration: `0-100 קמ"ש תוך ${categorySpecs.acceleration?.split('-')[0] || '5.0'}-${categorySpecs.acceleration?.split('-')[1] || '7.0'} שניות`,
    topSpeed: categorySpecs.topSpeed ? `${Math.round(categorySpecs.topSpeed)} קמ"ש` : undefined,
    fuelConsumption: categorySpecs.fuelConsumption ? `${categorySpecs.fuelConsumption.toFixed(1)} ליטר/100 ק"מ` : undefined,
    range: categorySpecs.range ? `${Math.round(categorySpecs.range)} ק"מ טווח` : undefined,
    chargingTime: categorySpecs.chargingTime,
    drivetrain: Math.random() > 0.5 ? 'הנעה קדמית' : 'הנעה אחורית',
    transmission: Math.random() > 0.3 ? 'אוטומטי' : 'ידני',
    seating: category.includes('supercar') || category.includes('sports') ? 2 : (Math.random() > 0.7 ? 7 : 5),
    cargo: `${Math.round(200 + Math.random() * 600)} ליטר`
  };
}