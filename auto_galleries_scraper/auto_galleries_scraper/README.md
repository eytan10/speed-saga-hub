# auto_galleries_scraper

סקריפט שמוריד תמונות מ-[auto.co.il/galleries](https://www.auto.co.il/galleries) לתיקייה מקומית,
ויוצר קובץ `images.csv` שממפה בין כתובת הגלריה, כתובת התמונה, והנתיב המקומי לכל קובץ.

## התקנה
1. צרו וירטואל־אנב (אופציונלי) והתקינו דרישות:
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## שימוש
להורדה ברירת־מחדל (עד 30 גלריות, עד 200 תמונות לכל גלריה):
```bash
python auto_galleries_scraper.py --out-dir data/auto_galleries
```

להרחיב/להקטין היקף:
```bash
python auto_galleries_scraper.py --out-dir data/auto_galleries --max-galleries 80 --max-images-per-gallery 500
```

להשתמש ב-seed אחר (כמו ארכיון הגלריות):
```bash
python auto_galleries_scraper.py --seed https://www.auto.co.il/archivegalleries --out-dir data/auto_galleries
```

> טיפ: לאחר ההורדה, אפשר להכניס את כל התיקייה `data/auto_galleries` ל-Cursor בפרויקט, ולצרף את `images.csv` כמטא־דאטה.

## הערות משפטיות
- אנא בדוק את תנאי השימוש/זכויות יוצרים של האתר. השתמש בתמונות לשימוש פרטי/פיתוח בלבד, או השג אישור מתאים.
- הסקריפט אינו עוקף מערכות גישה/תשלום ואינו מריץ Javascript — ייתכן שיהיו דפים נטענים-דינמית שלא יזוהו. במידת הצורך, אפשר לשלב Selenium.
