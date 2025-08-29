import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CarData {
  brand: string;
  model: string;
  year: number;
  price_ils?: number;
  image_url?: string;
  specs?: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, carData } = await req.json();

    switch (action) {
      case 'scrape_icar_prices':
        return await scrapeIcarPrices(supabase);
      case 'scrape_auto_prices':
        return await scrapeAutoPrices(supabase);
      case 'update_car_images':
        return await updateCarImages(supabase);
      case 'update_single_car':
        return await updateSingleCar(supabase, carData);
      default:
        throw new Error('Unknown action');
    }

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function scrapeIcarPrices(supabase: any) {
  console.log('Starting iCar price scraping...');
  
  // סריקת מחירים מ-icar.co.il
  const icarBaseUrl = 'https://www.icar.co.il';
  
  // רשימת יצרנים עיקריים לסריקה
  const mainBrands = [
    'tesla', 'bmw', 'mercedes', 'audi', 'toyota', 'honda', 'nissan', 'ford',
    'volkswagen', 'hyundai', 'kia', 'mazda', 'subaru', 'lexus', 'porsche'
  ];

  const results = [];

  for (const brand of mainBrands) {
    try {
      // מנסה לגשת לדף היצרן ב-iCar
      const response = await fetch(`${icarBaseUrl}/search?make=${brand}`);
      const html = await response.text();
      
      // חילוץ מחירים בסיסי מה-HTML
      const priceMatches = html.match(/₪[\d,]+/g) || [];
      const modelMatches = html.match(new RegExp(`${brand}[\\s-]+[\\w\\s]+`, 'gi')) || [];
      
      for (let i = 0; i < Math.min(priceMatches.length, modelMatches.length); i++) {
        const priceText = priceMatches[i].replace('₪', '').replace(/,/g, '');
        const price = parseInt(priceText);
        
        if (price > 50000 && price < 2000000) { // מסנן מחירים סבירים
          results.push({
            brand: brand,
            model: modelMatches[i].trim(),
            price_ils: price,
            source: 'icar.co.il',
            scraped_at: new Date().toISOString()
          });
        }
      }
      
      // המתנה קצרה בין בקשות
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error scraping ${brand} from iCar:`, error);
    }
  }

  // שמירת התוצאות ב-Supabase Storage
  const { data, error } = await supabase.storage
    .from('cars')
    .upload(
      `scraped-prices/icar-${Date.now()}.json`,
      JSON.stringify(results, null, 2),
      { contentType: 'application/json' }
    );

  if (error) throw error;

  return new Response(
    JSON.stringify({ 
      success: true, 
      results_count: results.length,
      message: 'iCar prices scraped successfully',
      file_path: data.path 
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

async function scrapeAutoPrices(supabase: any) {
  console.log('Starting Auto.co.il price scraping...');
  
  const autoBaseUrl = 'https://www.auto.co.il';
  const results = [];

  try {
    // סריקת העמוד הראשי של auto.co.il
    const response = await fetch(autoBaseUrl);
    const html = await response.text();
    
    // חיפוש מחירים ודגמים
    const priceMatches = html.match(/₪[\d,]+/g) || [];
    const carMatches = html.match(/[א-ת\s]+([\w\s]+)/g) || [];
    
    // עיבוד הנתונים שנמצאו
    for (let i = 0; i < Math.min(priceMatches.length, carMatches.length); i++) {
      const priceText = priceMatches[i].replace('₪', '').replace(/,/g, '');
      const price = parseInt(priceText);
      
      if (price > 50000 && price < 2000000) {
        results.push({
          car_info: carMatches[i].trim(),
          price_ils: price,
          source: 'auto.co.il',
          scraped_at: new Date().toISOString()
        });
      }
    }

  } catch (error) {
    console.error('Error scraping auto.co.il:', error);
  }

  // שמירה ב-Supabase
  const { data, error } = await supabase.storage
    .from('cars')
    .upload(
      `scraped-prices/auto-${Date.now()}.json`,
      JSON.stringify(results, null, 2),
      { contentType: 'application/json' }
    );

  if (error) throw error;

  return new Response(
    JSON.stringify({ 
      success: true, 
      results_count: results.length,
      message: 'Auto.co.il prices scraped successfully',
      file_path: data.path 
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

async function updateCarImages(supabase: any) {
  console.log('Starting car images update...');
  
  // רשימת תמונות רכבים איכותיות
  const carImageSources = {
    'tesla': {
      'model-3': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/c82315a6-ac99-464a-a753-c26688481335/bvlatuR/std/1200x0/MS-Hero-Desktop-LHD',
      'model-s': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/3304be3c-bd6d-4fec-b878-5cd8f8b8a218/bvlatuR/std/1200x0/Model-S-Hero-Desktop-LHD',
      'model-x': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/8bdb1af4-2766-4cea-ac67-47c0c43975af/bvlatuR/std/1200x0/Model-X-Hero-Desktop-LHD',
      'model-y': 'https://tesla-cdn.thron.com/delivery/public/image/tesla/53cab0a1-b4c1-4570-8f02-33d69daa36c6/bvlatuR/std/1200x0/Model-Y-Hero-Desktop-Global-LHD'
    },
    'bmw': {
      'i4': 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545xM4x12_cosy_cos%5D/default/i/G26/bimmer_i4_hero.jpg',
      'ix': 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545xM4x12_cosy_cos%5D/default/i/I20/hero_ix.jpg',
      'm3': 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-2545xM4x12_cosy_cos%5D/default/g/G80/m3_hero.jpg'
    }
  };

  const updateResults = [];
  
  for (const [brand, models] of Object.entries(carImageSources)) {
    for (const [model, imageUrl] of Object.entries(models)) {
      try {
        // הורדת התמונה
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        
        // העלאה ל-Supabase Storage
        const fileName = `${brand}-${model}-${Date.now()}.jpg`;
        const { data, error } = await supabase.storage
          .from('cars')
          .upload(`images/${fileName}`, imageBlob, {
            contentType: 'image/jpeg',
            cacheControl: '31536000'
          });

        if (error) throw error;

        updateResults.push({
          brand,
          model,
          fileName,
          uploaded: true,
          path: data.path
        });

      } catch (error) {
        console.error(`Error uploading image for ${brand} ${model}:`, error);
        updateResults.push({
          brand,
          model,
          uploaded: false,
          error: error.message
        });
      }
    }
  }

  return new Response(
    JSON.stringify({ 
      success: true,
      updates: updateResults,
      message: 'Car images update completed'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}

async function updateSingleCar(supabase: any, carData: CarData) {
  console.log(`Updating car: ${carData.brand} ${carData.model}`);
  
  // עדכון מידע רכב יחיד
  const fileName = `${carData.brand.toLowerCase()}-${carData.model.toLowerCase().replace(/\s+/g, '-')}.json`;
  
  const { data, error } = await supabase.storage
    .from('cars')
    .upload(
      `updated-cars/${fileName}`,
      JSON.stringify(carData, null, 2),
      { 
        contentType: 'application/json',
        upsert: true 
      }
    );

  if (error) throw error;

  return new Response(
    JSON.stringify({ 
      success: true, 
      message: `Car ${carData.brand} ${carData.model} updated successfully`,
      file_path: data.path
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}