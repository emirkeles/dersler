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
- **Seslendirme:** yapıldı (8 Ekim 2026); aşağıdaki "Seslendirme" bölümü. Kullanıcı henüz dinlemedi.
- **C9, 2. sahne:** `olc.js` "tahtada > 25 kelime 1/19" diyor (27 kelime); ders yazımından kalma, seslendirmede dokunulmadı.
- **Hikâye videoları, commit:** yapılmadı; kullanıcı ayrıca ister.

## Seslendirme (8 Ekim 2026)

`plan/SESLENDIRME.md` adımları 1, 2, 4, 5 ve 6.1–6.3 uygulandı. Pilot (adım 3) atlandı; kullanıcı henüz dinlemedi (6.4 açık).

- **Okunuş.** Bütün altyazılar `KIT.soyle` üzerinden geçer; okunan metni `dersler/kit.js` içindeki `oku` üretir: rakam (ekleriyle), sıra sayısı, ondalık, `°C`, `km`, `cm`, `TL`, kesir, `f(x)`, `ax`, `|x|`, simgeler. Otomatik çevirinin yetmediği 102 satırda `{ speak }` elle yazıldı (aralık ve nokta yazımı, fonksiyon adına gelen ek, mutlak değerin bittiği yer, "V grafiği").
- **Yönergeler.** 83 adet: 42 `[short pause]` (`{ dur: true }`), 35 `[thoughtful]`, 6 `[curious]` (`{ ton }`). Seslendirilen satırlarda öğrenciye sorulan gerçek soru az; sorular çoğunlukla `noWait` satırlarında.
- **Toplam.** 32 ders, 526 klip, 36,1 dk, 16,83 MB, 26.807 karakter. Konu başına: A 238 klip, 15,5 dk; B 105 klip, 7,9 dk; C 183 klip, 12,8 dk.
- **Doğrulama.** Her derste dizin ile klip dosyaları birebir; `--liste` "Üretilecek: 0 klip"; 32 sayfada `ses/<ders-id>.js` satırı; `olc.js` çıkış kodu 0 ve konsol temiz; `denetle.js` "Sorun yok". Üretimde hata ya da yeniden deneme olmadı; hiçbir klip iki kez üretilmedi.
- **Model.** Metin denetimi Sonnet 5.5 (dört ajan), üretim ve doğrulama Haiku 5.5 (üç ajan), `oku` çeviricisi ve son okuma ana oturumda.

| Ders | Klip | Karakter | Süre | Yönerge | Durum |
|---|---|---|---|---|---|
| A1 | 12 | 576 | 45,4 sn | 3 | üretildi |
| A2 | 11 | 538 | 43,3 sn | 2 | üretildi |
| A3 | 11 | 521 | 42,2 sn | 2 | üretildi |
| A4 | 9 | 467 | 38,2 sn | 2 | üretildi |
| A5 | 9 | 499 | 40,2 sn | 2 | üretildi |
| A6 | 19 | 971 | 77,1 sn | 3 | üretildi |
| A7 | 16 | 772 | 62,8 sn | 3 | üretildi |
| A8 | 14 | 670 | 57,0 sn | 3 | üretildi |
| A9 | 20 | 955 | 79,9 sn | 2 | üretildi |
| A10 | 24 | 1140 | 92,2 sn | 3 | üretildi |
| A11 | 22 | 946 | 75,7 sn | 3 | üretildi |
| A12 | 14 | 678 | 59,0 sn | 2 | üretildi |
| A13 | 14 | 648 | 53,8 sn | 2 | üretildi |
| A14 | 16 | 764 | 60,4 sn | 2 | üretildi |
| A15 | 14 | 659 | 53,1 sn | 2 | üretildi |
| A16 | 13 | 650 | 50,6 sn | 2 | üretildi |
| B1 | 16 | 883 | 70,1 sn | 2 | üretildi |
| B2 | 14 | 813 | 63,8 sn | 3 | üretildi |
| B3 | 24 | 1328 | 103,7 sn | 3 | üretildi |
| B4 | 19 | 1091 | 87,0 sn | 3 | üretildi |
| B5 | 14 | 788 | 64,6 sn | 3 | üretildi |
| B6 | 18 | 986 | 82,0 sn | 2 | üretildi |
| C1 | 16 | 870 | 66,9 sn | 2 | üretildi |
| C2 | 17 | 946 | 79,0 sn | 3 | üretildi |
| C3 | 18 | 905 | 69,8 sn | 3 | üretildi |
| C4 | 17 | 947 | 80,2 sn | 3 | üretildi |
| C5 | 14 | 778 | 62,2 sn | 3 | üretildi |
| C6 | 24 | 1259 | 103,0 sn | 3 | üretildi |
| C7 | 23 | 1056 | 86,1 sn | 3 | üretildi |
| C8 | 20 | 1013 | 84,4 sn | 3 | üretildi |
| C9 | 17 | 864 | 70,1 sn | 3 | üretildi |
| C10 | 17 | 826 | 64,8 sn | 3 | üretildi |

Süre aykırıları (karakter başına süre, dersin ortancasından %30'dan fazla sapan). Kısa yönde aykırı yok; sekizi de uzun yönde, harf adı ve sayı sayan cümleler. Dinlenmeli:

| Ders | Sahne | Klip | Sapma | Süre | Okunan metin |
|---|---|---|---|---|---|
| A6 | 2 | `78136fca` | +%32 | 3,0 sn | g, x eksenini ikide kesiyor. |
| A10 | 1 | `6a986495` | +%35 | 4,3 sn | Burada a eşittir yirmi, b eşittir otuz. |
| A12 | 2 | `8fcc3642` | +%48 | 5,4 sn | h x eşittir a x artı b ve a pozitif olsun. |
| A13 | 2 | `bf1171c0` | +%51 | 6,3 sn | h x eşittir a x artı b ve a sıfırdan farklı olsun. |
| A16 | 3 | `05298ad0` | +%45 | 6,3 sn | t yerine yedi yaz: [short pause] beş çarpı yedi eksi otuz eşittir beş. |
| C8 | 3 | `9c126da2` | +%33 | 4,5 sn | Soldan sıfır: sol yan üç, sağ yan sıfır. |
| C8 | 3 | `54d210d2` | +%30 | 4,4 sn | Sağdan sekiz: sol yan beş, sağ yan dört. |
| C10 | 2 | `f7df2fba` | +%34 | 3,4 sn | [thoughtful] Çöz: negatife bölerken yön döner. |

Dinlerken bakılacak okunuşlar (ajanların kararsız kaldıkları): tek harfe gelen ekler ("x’e", "a’ya", "b’yi", "V’nin"), "h x bir / h x iki" (A12), "iki bir noktası" (B5), tırnaklı “ve” / “veya” (C6), "x numaralı kattasın" (B4).

## Ek çıkış soruları ve konu tekrarı (8 Ekim 2026; `plan/YURUTME.md` 2b)

Anlatım, altyazı ve klipler değişmedi. 32 dersin her birinde çıkış soruları 2'den 4'e çıktı (biri bilgiyi yeni bir duruma uygulatır, biri dersin yanılgısını sınar); her konuya tekrar dersi yazıldı: `a17-tekrar` (sekiz kural, on soru), `b7-tekrar` (altı kural, on soru), `c11-tekrar` (yedi kural, on soru). Tekrar dersleri seslendirilmedi (sayfalarında ses satırı yok). Bağlantılar: A16 → A17 → B1, B6 → B7 → C1, C10 → C11.

- Konu A ana oturumca yazıldı (örnek); B ve C birer Sonnet ajanıyla. Görev tanımı: `gorev/ek-soru-gorevi.md`.
- Ölçüm: `olc.js` A1–A17 (Haiku), B2, B3, B6, B7, C1, C5, C8, C11 temiz; `denetle.js` "35 kısa ders, yayında. Sorun yok."; `--kural` özeti: çıkış sorusu 4–5 değil 0/35, konu tekrarı yok 0/3.
- `sure.js`: tema 155:02 (A 69:32, B 32:28, C 53:02); önceki toplam 114 dakikaydı, artış ek sorulardan ve üç tekrar dersinden.
- İçerik denetimi (ana oturum): 64 ek sorunun ve 30 tekrar sorusunun hesapları elle doğrulandı; her soruda tek doğru şık var, sonraki dersin kavramına dayanan soru yok.
- Kalan (eski kurallardan, bu adımın işi değil): "Hatırla" sahnesi ve "Birlikte çöz" yok; `sure.js` 12 dersi "ilk sorudan önce en çok bir altyazı" diye not ediyor. Bunlar anlatımın yeniden yazımında ele alınır (`YURUTME.md` 4. adım, seslendirme gerektirir).
- Dinlenmesi gerekmez; sitede bakılacak: tekrar derslerinin sessiz olması yadırgatıyor mu (temanın öteki dersleri sesli).

