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

## Seslendirme (8 Ekim 2026)

`plan/SESLENDIRME.md` adımları 1–6.3 uygulandı: 12 ders, 222 klip. Pilot A1'di; kullanıcı dinleyip onayladı ("onaylıyorum uygula"), ardından A2–A5 üretildi. B ve C pilottan önce üretilmişti. Kullanıcı öteki dersleri henüz dinlemedi (6.4 açık).

- **Döküm.** İlk döküm 222 satır, 11.048 karakter; metin denetiminden sonra 222 satır, 11.675 karakter. "Sahne otomatik tamamlanamadı" uyarısı yok.
- **Okunuş.** Rakam, derece ve Yunan harfleri önceki oturumda büyük ölçüde `speak` ile yazılmıştı. Bu turda 52 `speak` eklendi ya da düzeltildi: kalan rakamlar (A4 "Yol 1/Yol 2", B3 ve C3 metre ölçüleri, C2 "a + b", "x = a + b + c"), iki harfli ada gelen ekler ("BC’yi" → "BC doğrusunu", "AB’ye" → "AB kenarına", "AC’nin" → "AC kenarının"), C derslerinde tek harfe gelen ekler ("A’dan" → "A noktasından"), üç harfli üçgen adları harf harf ("A B E", "D E C", "A B C"). Altyazılar değişmedi (HEAD ile karşılaştırıldı). B2'de sahne 2 ve 5'teki aynı cümle tek klibi paylaşır.
- **Yönergeler.** 28 adet: 14 `[short pause]`, 13 `[thoughtful]`, 1 `[curious]`. Öğrenciye sorulan sorular `c.choice`, `tahminAl` ve `noWait` satırlarında olduğu için `[curious]` yalnızca A2'de.
- **Toplam.** 222 klip, 11.675 karakter, 940,2 sn (15,7 dk), 7,64 MB. Konu başına: A 94 klip, 6,4 dk; B 70 klip, 4,9 dk; C 58 klip, 4,3 dk.
- **Doğrulama.** Her derste dizin ile klip dosyaları birebir; `--liste` "Üretilecek: 0 klip"; 12 sayfada `ses/<ders-id>.js` satırı; `olc.js` 12 derste temiz; `denetle.js` "Sorun yok". Üretimde hata ya da yeniden deneme olmadı; hiçbir klip iki kez üretilmedi. `sure.js` yeniden çalıştırıldı: tema 60:45 (A 24:30, B 19:50, C 16:25).
- **Model.** Metin denetimi Sonnet 5.5 (üç ajan), üretim ve doğrulama Haiku 5.5 (dört üretim, iki doğrulama ajanı).

| Ders | Klip | Karakter | Süre | Yönerge | Durum |
|---|---|---|---|---|---|
| A1 | 10 | 502 | 39,8 sn | 2 | üretildi; pilot, kullanıcı dinledi |
| A2 | 26 | 1.443 | 105,9 sn | 3 | üretildi |
| A3 | 23 | 1.187 | 97,3 sn | 2 | üretildi |
| A4 | 17 | 880 | 69,0 sn | 2 | üretildi |
| A5 | 18 | 910 | 73,9 sn | 2 | üretildi |
| B1 | 14 | 693 | 56,1 sn | 2 | üretildi |
| B2 | 20 | 1.066 | 87,9 sn | 3 | üretildi |
| B3 | 13 | 693 | 52,8 sn | 2 | üretildi |
| B4 | 23 | 1.211 | 97,6 sn | 3 | üretildi |
| C1 | 14 | 793 | 63,1 sn | 2 | üretildi |
| C2 | 20 | 1.012 | 89,4 sn | 2 | üretildi |
| C3 | 24 | 1.285 | 107,4 sn | 3 | üretildi |

Süre aykırıları (karakter başına süre, dersin ortancasından %30'dan fazla; hepsi uzun yönde, kısa yönde yok; A konusunda aykırı yok). Dinlenmedi:

| Ders | Sahne | Klip | Süre | Sapma | Metin |
|---|---|---|---|---|---|
| B1 | 4 | `cca6bb01.mp3` | 4,32 sn | +%30 | En uzun kenarın karşısı, [short pause] en geniş açıdır. |
| B2 | 1 | `87663831.mp3` | 4,64 sn | +%75 | Boyları: a dokuz, b yedi, c beş. |
| B4 | 3 | `3eb1b55d.mp3` | 4,72 sn | +%32 | Önce a için yazıyoruz: a, on sekizden küçük. |
| C2 | 1 | `dccdb993.mp3` | 5,12 sn | +%87 | İki üçgen çıktı: A B E ve D E C. |
| C2 | 3 | `515feab4.mp3` | 6,08 sn | +%39 | D nereye giderse gitsin: [short pause] x eşittir a artı b artı c. |
| C3 | 4 | `af22e52e.mp3` | 6,32 sn | +%39 | D noktası AC kenarı üstünde; BD ile BC eşit uzunlukta. |
| C3 | 6 | `14dc59c7.mp3` | 4,24 sn | +%37 | Üç dış açı birlikte [short pause] bir tam tur eder. |

Harf sayan iki satır (B2 S1, C2 S1) beklenen türden: harfler tek tek okununca karakter başına süre uzar. Öbürleri `[short pause]` ya da harf adı içeriyor.

Açık bulgular:

- **Dallanan altyazı (kapandı, 8 Ekim 2026).** A4 S2 ve C2 S2'de altyazı öğrencinin tahminine göre değişiyordu; `ses-uret.js` dersi tek yoldan oynattığı için "Tahminin tuttu…" kolunun klibi yoktu. Kullanıcı kararıyla derste çözüldü: okunan metin iki kolda aynı (var olan klip çalar, yeni üretim yok), tahmini tutan öğrencide altyazının başına yalnızca ekranda "Tahminin tuttu." eklenir. Otomatik oynatma yanlış tahmin kolundan geçtiği için uzun altyazı `olc.js` ile ölçülmedi (10 ve 9 kelime; sınır 12).
- **Okunuşu dinlenmesi gerekenler.** İki harfli adlar ("AB", "BC", "AC", "BD" bitişik yazıldı), harf harf yazılan üçgen adları ("A B E"), küçük harfli tek değişkenler ("x", "a", "b", "c", "e"), tek harfe gelen ekler ("A’daki", "B’de", "C’ye"; A ve B derslerinde olduğu gibi bırakıldı). A1'de bu türden satır yok; pilot bunları sınamadı.
