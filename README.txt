# اعوان ہومیوپیتھک کلینک — Patient Manager

## اس پیکیج میں
- `index.html`: دو لسانی مریض مینجمنٹ ایپ؛ IndexedDB میں مقامی ریکارڈ، مریض/وزٹ ایڈیٹنگ، سرچ، تصاویر و رپورٹس، پرنٹ ایڈیٹر۔
- `sw.js` اور `manifest.json`: آف لائن کیش اور PWA انسٹالیشن کی بنیادی فائلیں۔
- `Code.gs`: Google Apps Script سنک اور روزانہ Google Sheets بیک اپ۔

## اہم تنصیب
1. ZIP نکالیں۔
2. `index.html` کو پہلے آن لائن ویب ہوسٹنگ (مثلاً GitHub Pages یا اپنی HTTPS ہوسٹنگ) پر رکھیں۔ PWA اور Service Worker کے لیے HTTPS ضروری ہے۔ صرف فائل کو Drive میں اپ لوڈ کرنا خودکار Sync/Service Worker ہوسٹنگ نہیں بناتا۔
3. clinic Google account `aslamfaheemfj@gmail.com` میں Google Sheet بنائیں، Extensions > Apps Script کھولیں، `Code.gs` کا کوڈ پیسٹ کریں اور Save کریں۔
4. Deploy > New deployment > Web app؛ Execute as: Me؛ رسائی اپنی ضرورت کے مطابق محدود رکھیں۔ Deploy URL ایپ کے Settings میں درج کریں۔
5. Apps Script میں `createDailyBackupTrigger` ایک بار دستی طور پر Run کریں اور اجازت دیں۔ یہ روزانہ شیٹ کی کاپی Drive کے `Awan Clinic Automatic Backups` فولڈر میں بنائے گا۔
6. ایپ پہلی مرتبہ انٹرنیٹ کے ساتھ کھولیں، پھر براؤزر کے Install/Add to Home Screen آپشن سے انسٹال کریں۔ بعد میں بنیادی ریکارڈنگ آف لائن بھی چل سکتی ہے۔

## ڈیٹا اور احتیاط
- مقامی ڈیٹا اسی براؤزر/ڈیوائس میں رہتا ہے؛ دوسرے ڈیوائس پر خودبخود نہیں آئے گا جب تک کامیاب کلاؤڈ Sync نہ ہو۔
- موجودہ نمونہ Sync کلاؤڈ شیٹ میں مریض ریکارڈ اپ لوڈ کرتا ہے۔ اس ابتدائی ورژن میں کلاؤڈ سے دوسرے ڈیوائس پر واپس ڈاؤن لوڈ/دو طرفہ conflict resolution، حذف شدہ ریکارڈ کی tombstone، اور attachment فائلوں کی علیحدہ Drive فائل اسٹوریج ابھی شامل نہیں۔
- مریضوں کی تصاویر اور رپورٹس حساس طبی معلومات ہیں۔ Apps Script کی رسائی غیر ضروری طور پر Public نہ کریں؛ محفوظ Google account، مضبوط پاس ورڈ اور باقاعدہ JSON بیک اپ استعمال کریں۔
- `JSON بیک اپ ڈاؤن لوڈ` سے مقامی ریکارڈ کی اضافی کاپی بنائیں۔
