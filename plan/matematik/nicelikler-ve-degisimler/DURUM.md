# Durum — nicelikler-ve-degisimler

Dal: `tema/nicelikler-ve-degisimler`. İşleme alma 7 Ekim 2026'da başladı.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti |
| 2 Plan | bitti |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7) |
| 4 Senaryolar | bitti (A, B, C; program metniyle karşılaştırıldı) |
| 5 İskelet | bitti (`index.html`, `tema.js`, `dersler/kit.js`) |
| 6 Dersler | bitti (32 kısa ders; A1–A5 ana oturum, kalanı beş alt ajan) |
| 7 Denetim | bitti: `denetle.js` “Sorun yok” (32 kısa ders); 32 dersin hepsi ana oturumda yeniden ölçüldü ve ekran görüntülerine bakıldı; denetim tablosuna sahneler işlendi |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | |
| A2 | bitti | bitti | temiz | |
| A3 | bitti | bitti | temiz | Sahne 3 aralığı [−2, 4] (düzlem −5…5; 5 kenarda kalıyordu) |
| A4 | bitti | bitti | temiz | |
| A5 | bitti | bitti | temiz | |
| A6 | bitti | bitti | temiz | S1 tablo 3 sütun, S2 tablosuz (25 kelime sınırı); S3 kaydırıcı uçlarına gözle bak |
| A7 | bitti | bitti | temiz | 1/2 yerine 0,5; S4 üç küçük düzlem + seçim |
| A8 | bitti | bitti | temiz | S3 iki küçük düzlem |
| A9 | bitti | bitti | temiz | S2 doğru tahminden sonra çiziliyor; x kesişimi yerine koyarak doğrulanıyor |
| A10 | bitti | bitti | temiz | S2 tahtada tam 25 kelime; x/2 yerine 0,5x |
| A11 | bitti | bitti | temiz | S1 ve S2 tam 25 kelime; S4 üçüncü kart −2x + 8 (çıkış sorusuyla aynıydı) |
| A12 | bitti | bitti | temiz | S2 ve S3 tam 25 kelime; “h(x) = ax + b” altyazıda; S1 kaydırıcısına gözle bak |
| A13 | bitti | bitti | temiz | İspat dört satır: önce h(x₁) = h(x₂), sonra kural |
| A14 | bitti | bitti | temiz | S1 tahmini “kesin doğru mu?” (doğru şık: henüz bilemeyiz) |
| A15 | bitti | bitti | temiz | S4 üç aç-kapa düğmesi (ölçücü basmıyor; ajan beş durumu ayrıca denetledi) |
| A16 | bitti | bitti | temiz | S3 ve S4 tam 25 kelime; düzlem sayısız (parçalı yazım tek başına 24 kelime); T(7) hesabı altyazıda |
| B1 | bitti | bitti | temiz | S3 tam 25 kelime; S2 noktalar iki adımda, tablo katlamadan önce kalkıyor |
| B2 | bitti | bitti | temiz | Düzlem −8…8; S1 ve S2’ye tahmin eklendi |
| B3 | bitti | bitti | temiz | S1 özellik listesi iki sayfa (yedi satır 26 kelime); −|x| S3’te, sıra sende S4’te |
| B4 | bitti | bitti | temiz | S3 tam 25 kelime; oklu karşılaştırma tablosu; kırılma noktası kesirle (5/3) |
| B5 | bitti | bitti | temiz | c kaydırıcısı 0,5 adımlı; c turuncu |
| B6 | bitti | bitti | temiz | S2 düzlemsiz cebir; koşullar “ise”siz; S3 sol parça çift eksiyle açılıyor; S4 tam 25 kelime |
| C1 | bitti | bitti | temiz | S2 tablo noktalar taşınınca kalkıyor; S3’e “en çok” tahmini eklendi |
| C2 | bitti | bitti | temiz | S1 tahtada tam 25 kelime; işaret tablosu sağ sütunda |
| C3 | bitti | bitti | temiz | S3’e ara örnek eklendi (g(x) = −2x + 22, kesişim 17/3); beyaz 3x − 15 doğrusu x = 6,3’te kesildi |
| C4 | bitti | bitti | temiz | S3 kargo yerine f(x) = −x + 3, g(x) = 2x (kargo doğruları yatıklaşırken paralel oluyordu) |
| C5 | bitti | bitti | temiz | S3 düzlemsiz: tam tahta cebir + sayı doğrusu (25 kelime sınırı) |
| C6 | bitti | bitti | temiz | S2 sonuna k kaydırıcısı eklendi; S3 üç ardışık tahta (tam 25 kelime) |
| C7 | bitti | bitti | temiz | S2 ve S3 tam 25 kelime; S3’te sahte çözüm kesik uzantıda boş nokta |
| C8 | bitti | bitti | temiz | S3 düzlem yerine sayı doğrusu; S2 sonuna x kaydırıcısı |
| C9 | bitti | bitti | temiz | Yerine koyma iki kutuyla; S2’ye x kaydırıcısı |
| C10 | bitti | bitti | temiz | S3 sonuna gün kaydırıcısı; yağmur etiketsiz kesik çizgi, gözle bak |

## Kalanlar (işleme almanın dışında ya da sonraya bırakılan)

- **Kite taşınacak yerel araçlar.** Alt ajanlar kiti değiştiremediği için aynı araç birkaç derste yerel işlev olarak duruyor: yalnızca x eksenine inen kesik iz (C3–C8, C10), sayı doğrusu (B2, C5, C6, C8), yazıyı yerinde değiştirme (B6, C7, C9), eğim basamağı (A7, A9, A10), iki nokta arasında ok (A6, A7, A9), aç-kapa düğmesi (A15). Dersler çalışıyor; birleştirme ayrı bir temizlik işi.
- **Ölçücünün görmedikleri.** `olc.js` kaydırıcıları ve A15'in düğmelerini oynatmaz; uç değerler alt ajanlarca ayrı betikle denendi, ana oturumda yalnızca başlangıç durumları görüldü. Elle bakmaya değer: A6 S3, A7 S2–S3, A12 S1, A15 S4, B4 S2, B5 S2–S3, C5 S2, C10 S3.
- **Defter kuralları.** Sembol ağırlıklı birkaç kural 12 kelimeyi 1–3 kelime aşıyor (ölçücü simgeleri kelime sayıyor; uyarı vermiyor).
- **Seslendirme öncesi.** `KIT.oku` “|x|’in” ve “−b/a” gibi ifadeleri düzgün çevirmiyor; ses üretilmeden önce `--liste` çıktısına bakılmalı.
- **Yayın, seslendirme, hikâye videoları, commit:** yapılmadı; kullanıcı ayrıca ister.
