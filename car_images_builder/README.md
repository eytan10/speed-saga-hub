# בונה תיקיית תמונות לרכבים (Placeholder / Wikipedia)

הסקריפט `car_images_builder.py` בונה עבורך תיקיית תמונות שתוכל להוסיף לפרויקט ואז ל-Cursor.

## מצבים נתמכים
1. **placeholder** – מייצר תמונות דמה (ללא אינטרנט/טוקנים) עם טקסט: `Make Model Year`.
2. **wikipedia** – מנסה להוריד תמונת שער של הדגם מוויקיפדיה (API חינמי). שומר גם **רישיון/קרדיט** אם זמינים.

> ⚠️ וודא שימוש בהתאם לרישיון. העמודות `license/artist/credit/file_title` ב-`images.csv` יעזרו לייחוס.

## התקנה
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## שימוש
### Placeholder בלבד (מהיר וללא אינטרנט)
```bash
python car_images_builder.py --csv data/car_prices_il_2025.csv --out-dir public/auto_galleries --mode placeholder --per-model 2
```

### Wikipedia (ללא טוקן)
```bash
python car_images_builder.py --csv data/car_prices_il_2025.csv --out-dir public/auto_galleries --mode wikipedia --max-per-make 2
```

### שילוב
```bash
python car_images_builder.py --csv data/car_prices_il_2025.csv --out-dir public/auto_galleries --mode both --per-model 1 --max-per-make 2
```

## פלט
טבלת `images.csv` עם העמודות:  
`make,model,year,source,license,url,local_path,artist,credit,file_title`

ב-Next.js: כל מה שב-`public/` יהיה נגיש סטטית, למשל: `/auto_galleries/Toyota/Corolla/ph_01.png`.
