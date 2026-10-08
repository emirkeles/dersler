# Durum — geometrik-sekiller

Başlangıç: 7 Ekim 2026 (9 kısa ders, 37 sahne). Genişletme: 8 Ekim 2026 (12 kısa ders, 57 sahne); gerekçe `ANALIZ.md`, kararlar `PLAN.md` bölüm 7 (10–14).

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti |
| 2 Plan | bitti; 8 Ekim'de genişletildi |
| 2b Ders kitabı | bitti (8 Ekim; Matematik 9, 1. Kitap, s. 170–195; alınanlar `PLAN.md` bölüm 8) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7; 8 Ekim kararları 10–14) |
| 4 Senaryolar | A, B, C bitti; 8 Ekim ekleri işlendi |
| 5 İskelet | bitti; `kit.js` içine `mentese`, `tepe`, `cevapla` ve `tepeKontrol` etiket seçeneği eklendi |
| 6 Dersler | bitti (12 kısa ders, 57 sahne) |
| 7 Denetim | bitti: süreler yazıldı (`sure.js`, tema 57 dk), `denetle.js` temiz, tema sayfası 12 dersi gösteriyor, denetim tablosu ve `TEMALAR.md` güncel |

| Kısa ders | Sahne | 8 Ekim'de değişen | olc | Tahtada en çok kelime (sahne sırasıyla) | Not |
|---|---|---|---|---|---|
| A1 | 4 | — | temiz | 16 · 16 · 18 · 12 | |
| A2 | 5 | S3 yeni (zaman şeridi), S4 ilk altyazı, S5 yeniden yazıldı (terim eşleştirme) | temiz | 15 · 17 · 15 · 6 · 25 | S5 sınırda (25) |
| A3 | 6 | S3 başına açı çiftleri hatırlatması, S6 yeni (sıra sende) | temiz | 0 · 6 · 9 · 25 · 14 · 9 | S4 sınırda (25; 7 Ekim'den beri) |
| A4 | 5 | S5 yeni (sıra sende) | temiz | 0 · 13 · 22 · 15 · 4 | |
| A5 | 5 | S3 yeni (ikinci ispat); Dene S4, Sıra sende S5 oldu | temiz | 7 · 25 · 23 · 13 · 6 | S2 sınırda (25; 7 Ekim'den beri) |
| B1 | 4 | S2'ye orantı adımı; menteşe kite taşındı | temiz | 3 · 11 · 11 · 9 | |
| B2 | 5 | yeni ders | temiz | 19 · 16 · 9 · 14 · 8 | |
| B3 | 4 | eski B2; yalnızca ad, kimlik, bağlantı | temiz | 16 · 15 · 21 · 13 | |
| B4 | 5 | yeni ders | temiz | 10 · 14 · 17 · 10 · 18 | |
| C1 | 4 | yalnızca "sonraki ders" bağlantısı | temiz | 14 · 14 · 20 · 14 | |
| C2 | 4 | yeni ders | temiz | 9 · 24 · 15 · 14 | S2 sınıra yakın (24) |
| C3 | 6 | eski C2; S4 yeni (adım adım), S5'e dördüncü kart, S6 yeni (beş önerme) | temiz | 4 · 9 · 6 · 20 · 15 · 17 | |

## Notlar

- Ölçüm (1366×657): on iki derste de sayfa kayması, sığmayan altyazı, yana taşan panel, taşan ya da üst üste yazı, 12 kelimeyi aşan altyazı, 25 kelimeyi aşan tahta, 12 pikselden küçük punto ve konsol hatası sıfır.
- Kodlar kaydı: eski B2 → B3 (`b3-ucgen-esitsizligi`), eski C2 → C3 (`c3-onermeler-is-gorur`). Tarayıcıda eski kimlikle (`geometrik-sekiller-b2`, `-c2`) saklı ilerleme artık yeni B2 ve C2 derslerine görünür; tema yayında olmadığı için önemsenmedi.
- Senaryodan sapmalar (7 Ekim): A2'de son sahnenin adında "bu topraklardan" ifadesi kullanılmadı (programda yok). A4'te tahmin sahne 1'de alınır, cevabı sahne 2'de verilir (`tahminAl`). C3 sahne 5'te defter notu "verilene bak, önermeyi seç" kuralıdır.
- Senaryodan sapmalar (8 Ekim):
  - A2 S3 sorusunun doğru şıkkı "pratik ölçme kurallarından kuramsal bir yapıya"; ders kitabı *Elemanlar*'ın ispatlı olduğunu açıkça yazmadığı için "ispatlı yapı" denmedi.
  - A3 S6'da x'li etiketler ("x + 10°" gibi) kenarlara bindiği için elle yerleştirildi.
  - C2 S2'de yazı bütçesi için E'deki açıya e adı verildi (e = a + b, x = e + c); son adımda iki satırın yerini x = a + b + c alır.
  - C2 S4'te D'nin gezdiği kutu üçgenin içinde kalsın diye D, A'ya sürüklenemez; A'ya bir animasyon taşır, soru gözleme dayanır.
  - C3 S4'te |AB| = |AC| çentikleri konmadı (D, AC üstünde olduğu için yanıltıyordu); eşitlik altyazıda söylenir.
  - C3 S6'da sıralama önermesi "a > b > c ise α > β > γ" diye yazıldı (⇔ simgesi yazı tipinde yok). Özet dört satır.
  - B2 S2'de açılar satırda bir ondalıkla yazılır, üçgenin üstünde ölçü yoktur (tam sayıya yuvarlama iki satırı çeliştirebiliyordu); iki kenar 0,05 birimden yakınsa eşit sayılır.
- α, β, γ harfleri `ortak/fonts/` içindeki Plex alt kümelerinde yok; tarayıcının yedek yazı tipiyle çiziliyor. Paralellik `d // BC` biçiminde yazıldı (∥ simgesi yedek yazı tipinde okunmuyordu).
- `HIKAYE-ANIMASYONLARI.md` 7 Ekim'deki ders kodlarını kullanıyor; güncellenmedi (hikâye videoları işleme almanın dışında).
- Yayına alındı (8 Ekim 2026): `ortak/katalog.js` içinde `yayinda: true`; `denetle.js` temiz, ana sayfa temayı 12 dersiyle konsol hatasız yüklüyor.
- Yapılmayanlar (işleme almanın dışında): seslendirme, hikâye videosu.
