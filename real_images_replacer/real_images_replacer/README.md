# real_images_replacer – החלפת Placeholders בתמונות אמיתיות (2025)

הכלי הזה יביא **תמונות אמיתיות מוויקיפדיה/ויקימדיה** לכל make/model לשנת 2025 (למעט משאיות/טנדרים שהוחרגו), ויכתוב אותן על גבי קבצי ה-placeholder (`ph_01.png`). בנוסף, הוא יצור `images.csv` חדש עם `license/artist/credit/url` לכל תמונה.

## התקנה
```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## שימוש בסיסי
```bash
python real_images_replacer.py --csv data/car_prices_il_2025.csv --root public/auto_galleries
```
- יביא תמונה אחת לכל דגם, ימיר ל-PNG, וישמור כ-`ph_01.png` באותה תיקיית דגם:
  `public/auto_galleries/<Make>/<Model>/ph_01.png`  
- יכתוב `public/auto_galleries/images.csv` עם מקור/רישיון/קישור/קרדיט.

## דגלים שימושיים
- `--only-missing` — יבצע הורדה רק לדגמים שחסר להם קובץ יעד (משאיר placeholders ללא שינוי).
- `--max-per-make 3` — מגביל מספר דגמים לכל יצרן (להרצות ניסוי/בדיקות).
- `--delay 0.2` — השהייה בין קריאות API (ברירת מחדל 0.2ש').
- `--lang en|he|multi` — 'multi' ינסה אנגלית ואז עברית (ברירת מחדל).

## דוגמה להרצה מלאה
```bash
python real_images_replacer.py --csv data/car_prices_il_2025.csv --root public/auto_galleries --max-per-make 10 --delay 0.2 --lang multi
```

## הערות רישוי
- רוב התמונות בוויקימדיה ברישיונות חופשיים (CC BY/CC BY-SA וכו'). יש לתת קרדיט כנדרש.
- הרישיון ופרטי הקרדיט נרשמים בעמודות `license/artist/credit/file_title` של `images.csv`.
- לפני שימוש מסחרי, אשר/עדכן קרדיטים וטקסטי ייחוס לפי תנאי הרישיון של כל תמונה.

## טיפ
אם יש לך כבר `images.csv` אחר — אתה יכול לשלב מידע קיים/למזג לפי `make,model` לאחר ההורדה.
