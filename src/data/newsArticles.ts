import newsFerrariLemans from "@/assets/news-ferrari-lemans.jpg";
import newsPorscheHybrid from "@/assets/news-porsche-hybrid.jpg";
import newsTeslaBattery from "@/assets/news-tesla-battery.jpg";
import ferrari488New from "@/assets/ferrari-f8-tributo-red.jpg";
import bmwM3New from "@/assets/bmw-m3-competition.jpg";
import teslaModelSNew from "@/assets/tesla-model-s-new.jpg";
import mercedesAmgNew from "@/assets/mercedes-amg-c63s-performance.jpg";
import porsche911New from "@/assets/porsche-911-turbo-s.jpg";
import audiRs6New from "@/assets/audi-rs6-new.jpg";
import mclaren720sNew from "@/assets/mclaren-720s-new.jpg";
import lamborghiniHuracanEvoYellow from "@/assets/lamborghini-huracan-evo-yellow.jpg";
import fordMustangGt from "@/assets/ford-mustang-gt-2024.jpg";
import volkswagenGolfGti2024 from "@/assets/volkswagen-golf-gti-2024.jpg";
import hyundaiTucson2024 from "@/assets/hyundai-tucson-2024.jpg";
import toyotaCamry from "@/assets/toyota-camry-2024.jpg";
import hondaTypeR from "@/assets/honda-civic-type-r-2024.jpg";
import nissanGtrSilver from "@/assets/nissan-gtr-silver.jpg";
import teslaRoadster from "@/assets/tesla-roadster.jpg";
import kiaEV6 from "@/assets/kia-ev6.jpg";
import hyundaiIoniq5 from "@/assets/hyundai-ioniq5.jpg";
import newsBackground from "@/assets/news-background.jpg";
import electricVehiclesFuture from "@/assets/electric-vehicles-future.jpg";
import autonomousDrivingTech from "@/assets/autonomous-driving-technology.jpg";
import luxuryCarShowroom from "@/assets/luxury-car-showroom.jpg";
import japaneseCarManufacturing from "@/assets/japanese-car-manufacturing.jpg";
import winterDrivingSafety from "@/assets/winter-driving-safety.jpg";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  publishDate: string;
  category: string;
  readTime: number;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "tesla-battery-breakthrough",
    title: "טסלה מכריזה על פריצת דרך בטכנולוגיית סוללות",
    summary: "החברה פיתחה סוללה חדשה שמגדילה את הטווח ב-40% ומקצרת את זמן הטעינה משמעותית",
    content: "טסלה הכריזה היום על פיתוח טכנולוגיית סוללות מהפכנית שתשנה את פני התחבורה החשמלית. הסוללה החדשה, שתימצא ברכבי החברה החל מ-2025, תאפשר טווח נסיעה של עד 800 ק״מ בטעינה אחת ותתמוך בטעינה מהירה של 10-80% תוך 15 דקות בלבד. החדשנות מבוססת על שימוש בחומרים חדשים ובארכיטקטורת סוללה מתקדמת שפותחה במשך השנים האחרונות במעבדות החברה.",
    image: ferrari488New,
    author: "רון כהן",
    publishDate: "2024-01-15",
    category: "חדשנות",
    readTime: 3
  },
  {
    id: "porsche-hybrid-announcement",
    title: "פורשה מציגה את הגט היברידי החדש",
    summary: "דגם 911 החדש יכלול מערכת היברידית מתקדמת הממזגת ביצועים וחיסכון בדלק",
    content: "פורשה חשפה את התוכניות שלה לדגם 911 היברידי החדש, שישלב מנוע בנזין V6 עם מנוע חשמלי לביצועים מרהיבים. המכונית החדשה תפיק כוח כולל של 650 כ״ס ותאפשר תאוצה מ-0 ל-100 קמ״ש תוך 3.2 שניות בלבד. במקביל, המכונית תציע חיסכון בדלק משופר של 40% לעומת דגמים קודמים. הדגם החדש צפוי להגיע לשוק בסוף 2024 במחיר התחלתי של כ-150,000 יורו.",
    image: porsche911New,
    author: "מיכל לוי",
    publishDate: "2024-01-12",
    category: "מוצר חדש",
    readTime: 4
  },
  {
    id: "ferrari-le-mans-victory",
    title: "פרארי חוזרת ל-Le Mans עם מכונית מירוץ חדשה",
    summary: "לאחר שנים של היעדרות, פרארי מכריזה על חזרתה לתחרות האגדית עם מכונית מירוץ מהפכנית",
    content: "פרארי הודיעה רשמית על החזרה שלה לתחרות 24 שעות של לה מאן לאחר היעדרות של יותר מ-50 שנים. החברה פיתחה מכונית מירוץ חדשה לחלוטין, ה-499P, המבוססת על הפלטפורמה של מכוניות הכביש של החברה. המכונית משלבת מנוע V6 טורבו היברידי המפיק למעלה מ-680 כ״ס. צוות פרארי כולל נהגי עלית בינלאומיים ומטרתו לזכות בתחרות המרכזית של עולם ספורט המנועים.",
    image: newsFerrariLemans,
    author: "דני שמיר",
    publishDate: "2024-01-10",
    category: "ספורט מנועים",
    readTime: 5
  },
  {
    id: "tomcar-india-deal",
    title: "בלעדי: תומקאר בדרך לייצר אלפי רכבי שטח לצבא הודו",
    summary: "החברה הישראלית מנהלת משא ומתן להספקת רכבי שטח צבאיים מתקדמים",
    content: "תומקאר, החברה הישראלית המייצרת רכבי שטח צבאיים ואזרחיים, מנהלת משא ומתן מתקדם עם צבא הודו להספקת אלפי יחידות של רכבי השטח שלה. העסקה, שעשויה להגיע לכמה מיליארדי שקלים, תכלול גם העברת טכנולוגיה וייצור מקומי בהודו. רכבי תומקאר ידועים בעמידותם הגבוהה ובהתאמתם לשטחים קשים.",
    image: newsBackground,
    author: "יוסי גרינברג",
    publishDate: "2024-01-18",
    category: "עסקים",
    readTime: 4
  },
  {
    id: "electric-vehicle-sales-2024",
    title: "מכירות רכבים חשמליים בישראל עלו ב-150% השנה",
    summary: "נתונים חדשים מראים גידול דרמטי ברכישת רכבים חשמליים בישראל",
    content: "לפי נתונים שפורסמו על ידי איגוד יבואני הרכב, מכירות הרכבים החשמליים בישראל עלו השנה ב-150% לעומת השנה הקודמת. הגידול מיוחס בעיקר לירידה במחירי הסוללות, הרחבת רשת עמדות הטעינה ולמדיניות ממשלתית מעודדת. דגמים פופולריים כוללים את טסלה מודל 3, יונדאי אייוניק 5 וקיה EV6.",
    image: electricVehiclesFuture,
    author: "שרה כהן",
    publishDate: "2024-01-16",
    category: "שוק",
    readTime: 3
  },
  {
    id: "autonomous-driving-update",
    title: "משרד התחבורה מאשר ניסויים ברכבים אוטונומיים",
    summary: "ישראל מצטרפת למדינות החלוצות בתחום הרכבים האוטונומיים",
    content: "משרד התחבורה הישראלי אישר השקת תוכנית ניסוי לרכבים אוטונומיים על כבישים ציבוריים נבחרים. הניסויים יתבצעו בשיתוף עם חברות הטכנולוגיה המובילות בתחום, כולל מובילאיי ואינטל. המטרה היא לבחן את הבטיחות והיעילות של טכנולוגיות נהיגה אוטונומית בתנאים ישראליים ייחודיים.",
    image: autonomousDrivingTech,
    author: "אמיר לוי",
    publishDate: "2024-01-14",
    category: "טכנולוגיה",
    readTime: 4
  },
  {
    id: "luxury-car-trends-2024",
    title: "מגמות בשוק רכבי היוקרה: מה קונים הישראלים?",
    summary: "סקירה של מגמות הקנייה בשוק רכבי היוקרה הישראלי",
    content: "בשוק רכבי היוקרה הישראלי ניתן לזהות מגמות מעניינות: עלייה ברכישת רכבי יוקרה חשמליים, גידול בביקוש לרכבי שטח יוקרתיים ועדיפות לדגמים עם טכנולוגיות בטיחות מתקדמות. מרצדס, BMW ואאודי ממשיכים להוביל בפלח זה, עם כניסה מתחזקת של מותגים כמו גנסיס ופולסטאר.",
    image: luxuryCarShowroom,
    author: "דנה אברהם",
    publishDate: "2024-01-13",
    category: "יוקרה",
    readTime: 5
  },
  {
    id: "japanese-cars-popularity",
    title: "למה רכבים יפניים כל כך פופולריים בישראל?",
    summary: "ניתוח הסיבות לפופולריות הגבוהה של רכבים יפניים בשוק הישראלי",
    content: "רכבים יפניים כמו טויוטה, הונדה וניסאן ממשיכים להוביל את השוק הישראלי. הסיבות כוללות אמינות גבוהה, עלויות תחזוקה נמוכות, רשת שירות נרחבת וערך שייר מעולה. דגמים כמו טויוטה קורולה, הונדה סיוויק וניסאן מיקרה נחשבים לבחירות הבטוחות של הקונים הישראליים.",
    image: japaneseCarManufacturing,
    author: "מיכאל כהן",
    publishDate: "2024-01-11",
    category: "ניתוח",
    readTime: 4
  },
  {
    id: "car-insurance-tips-2024",
    title: "טיפים לחיסכון בביטוח רכב לשנת 2024",
    summary: "מדריך מעודכן לחיסכון בעלויות הביטוח השנתיות",
    content: "עם עליית עלויות הביטוח, חשוב לדעת איך לחסוך. המלצות עיקריות: השוואת מחירים בין חברות ביטוח שונות, בדיקת זכאות להנחות (נהג צעיר, משפחות רבות ילדים), התקנת מערכות אבטחה מתקדמות והעלאת גובה ההשתתפות העצמית. ניתן לחסוך עד 30% בעלויות הביטוח השנתיות.",
    image: "/assets/happy-customer.jpg",
    author: "רחל שמיר",
    publishDate: "2024-01-09",
    category: "כלכלה",
    readTime: 3
  },
  {
    id: "winter-driving-safety",
    title: "נהיגה בטוחה בחורף: מדריך מעודכן",
    summary: "טיפים חיוניים לנהיגה בטוחה בתנאי מזג אוויר קשים",
    content: "עם הגעת החורף, חשוב להיערך לנהיגה בתנאים קשים. המלצות עיקריות: בדיקת מצב הצמיגים והחלפה לצמיגי חורף במידת הצורך, בדיקת מערכת החימום והמזגן, החלפת נוזל שמשות, בדיקת סוללה ומערכת הבלמים. בנהיגה עצמה - הקפדה על מרחק בטיחות מוגדל והימנעות מתמרונים פתאומיים.",
    image: winterDrivingSafety,
    author: "גיא אורן",
    publishDate: "2024-01-08",
    category: "בטיחות",
    readTime: 4
  }
];