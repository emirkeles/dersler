# 9. sınıf dersleri

Etkileşimli kısa derslerden oluşan, bağımlılıksız statik bir site (saf HTML, CSS, JS, SVG). Derleme adımı yok; sayfalar dosyadan açılır.

## Yapı

```
index.html                    ana sayfa
<ders>/<ünite>/               bir ünitenin içeriği: index.html, unite.js, a1-….html, dersler/, ses/, hikaye/
ortak/                        ders motoru (ders.js, ders.css), katalog.js, site.js, site.css, API.md
ortak/sablon/                 yeni ünite için çalışan şablon (ünite sayfası, unite.js, kit.js, örnek kısa ders)
araclar/                      olc.js, denetle.js, ses-uret.js, hikaye-ses.js (yalnızca geliştirme)
plan/KURALLAR.md              bütün üniteler için bağlayıcı kurallar
plan/ISLEME.md                bir üniteyi baştan sona işleme alma adımları
plan/<ders>/UNITELER.md       dersin üniteleri ve durumları
plan/<ders>/<ünite>/          MUFREDAT.md, PLAN.md, senaryolar/
```

Adlar: Ders (Matematik) → Ünite (Sayılar; MEB "tema" der) → Konu (A) → Kısa ders (A1). Örnek ünite: `matematik/sayilar/`.

## "Şu üniteyi işleme al"

Kullanıcı bir üniteyi işleme almanı isterse (örnek: "geometrik-sekiller ünitesini işleme al") `plan/ISLEME.md` dosyasını baştan sona uygula: açık soruları oradaki kurallarla kapat, senaryoları yaz, ünitenin sayfasını ve kısa derslerini yaz, denetle, raporla. Adımlar arasında onay bekleme, soru sorma; kararlarını `PLAN.md` içine yaz ve sür. Kaldığın yeri `plan/<ders>/<ünite>/DURUM.md` dosyasında tut; dosya varsa oradan devam et. Ünite adı ile klasörü `plan/<ders>/UNITELER.md` içinde eşleşir.

## Önce oku

- `plan/KURALLAR.md`: müfredat kuralı, kısa ders biçimi, yazı bütçesi, paralel çalışma.
- `plan/ISLEME.md`: yazım adımları ve her adımın bitiş ölçütü.
- `ortak/API.md`: ders motorunun API'si, ders ve ünite iskeleti, araçlar.
- Üzerinde çalıştığın ünitenin `plan/<ders>/<ünite>/MUFREDAT.md` ve `PLAN.md` dosyaları.

## Bir ünite üzerinde çalışırken

- Yalnızca `<ders>/<ünite>/` ve `plan/<ders>/<ünite>/` altına yaz. `ortak/`, `araclar/`, `index.html` ve öteki ünitelere dokunma; eksik görürsen raporla.
- Müfredat bağlayıcıdır: programda olmayan konu ekleme, olanı atlama.
- Kısa dersin `id` alanı `<ünite kimliği>-<kod>` olur ve `unite.js` içindeki satırıyla uyuşur.
- Üniteyi yayına alma (`ortak/katalog.js` içindeki `yayinda: true`), seslendirme üretme, commit ve push yapma; kullanıcı ayrıca ister.

## Denetim

```
cd araclar && npm install                      # ilk kullanımda
node araclar/olc.js <ünite>/<kod>              # bir kısa ders: taşma, üst üste yazı, yazı bütçesi
node araclar/denetle.js <ders>/<ünite>         # ünite: katalog, kimlikler, sahne sayıları, kırık bağlantı
```

Komutlar proje kökünden çalıştırılır. Chrome kendiliğinden bulunur (kurulu Chrome ya da HyperFrames'in başsız Chrome'u); başka bir yol `CHROME_PATH` ile verilir. İş bitti demeden önce ikisi de temiz olmalı.

## Working Style

- When a step doesn't need my input, keep going. Stop only when you can't continue without me, or before anything destructive.
- For multi-step work, keep a checklist in `TASKS.md`; tick items as you finish them and add anything new you discover.
- End every long run with three headings: **Blocked on me**, **Changed**, **Found**.
- For research, mark anything you couldn't confirm and say where you looked.
