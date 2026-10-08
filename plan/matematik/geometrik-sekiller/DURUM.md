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

## Pilot: yeni anlatım kuralları, A konusu (8 Ekim 2026)

`plan/KURALLAR.md` 3–3.4 ilk kez burada deneniyor; sıra ve sonrası `plan/YOL-HARITASI.md`. Senaryo: `senaryolar/A-acilar-ve-ispat.md`, "Pilot" bölümü. Tema yayında olduğu için pilot onaya kadar commit edilmez; dersler dosyadan açılarak izlenir. A1–A5 sayfalarından `ses/<id>.js` satırı çıkarıldı (eski klipler yeni metinle uyuşmuyor); onaydan sonra yeniden seslendirilir. `tema.js` içine `kural: 2` yazılmadı, çünkü B ve C konuları eski kurallarla duruyor.

| Ders | Yazan | Sahne | Çıkış sorusu | olc | Not |
|---|---|---|---|---|---|
| A1 Ölçmek ispat değildir | ana oturum | 4 | 4 | temiz | 22 altyazı; iki kavram (genelleme, doğrulama) ilk sorudan önce adlandırılıyor; "Birlikte çöz" üç cümlelik tablo |
| A2 İspat doğru bilgilerin üstüne kurulur | alt ajan | 6 | 4 | temiz | 37 altyazı; "Hatırla" iki kartlı; taş sahnesinde üç bilgi önce anlatılıyor, altlarına yazısız küçük çizimler eklendi; "Birlikte çöz" üç satırlı tablo. İlk üç sahnenin görüntüsüne ana oturum baktı. Açık: "bir noktadan tek paralel" ve "doğru açı 180°" duvarda "başka bilgilere dayanan" taşlar olarak duruyor (eski içerik) |
| A3 İç açıların toplamı 180°dir | alt ajan | 7 | 4 | temiz | 54 altyazı; "Tek paralel"de tahmin kalktı, önce gösterim sonra P noktasıyla uygulama sorusu; ispatın son adımı "Birlikte çöz"; "Sıra sende" tam çözülmüş örnek → yarısı çözülmüş → tek başına. "İspatı tamamla" tahtası tam 25 kelimede. İspat ve son sahnenin görüntüsüne ana oturum baktı; 65°/45° çıkış sorusunun `scene` değeri 6 yapıldı |
| A4 Dış açıların toplamı 360°dir | alt ajan | 6 | 4 | temiz | 39 altyazı; "Dış açı" sahnesi önce tanımı, 70° → 110° örneğini ve yanılgıyı (kırmızı 290° bölge) gösteriyor, tahmin ondan sonra; Yol 2'deki boşluk "Birlikte çöz"; "Sıra sende" örnek → yarısı çözülmüş → iki soru tek başına. Senaryoda olmayan küçük soru (iç 60° → dış 120°) korundu. Örnek ve "Sıra sende" görüntüsüne ana oturum baktı |
| A5 Dış açı, uzaktaki iki iç açının toplamıdır | alt ajan | 6 | 4 | temiz | 43 altyazı; "Hangi açılar?" önce komşu ve uzak iç açıları adlandırıyor; ispatın ikinci gerekçesi "Birlikte çöz"; ikinci yola iç ters ve yöndeş açı hatırlatması eklendi; "İkinci yol" tahtasında 13–15 yazı öğesi var (kelime 23), "İspat" tam 25 kelimede. Çıkış sorusu 2'nin henüz öğretilmemiş çeldiricileri (üçgen eşitsizliği, en uzun kenar) ana oturumda değiştirildi. İki sahnenin görüntüsüne ana oturum baktı |
| A6 Konu tekrarı (`a6-tekrar.html`, yeni) | ana oturum | 1 | 8 | temiz | beş kural tek sahnede, sekiz karışık soru |

Pilot denetimi (8 Ekim 2026): altı derste `olc.js` temiz; `sure.js` A konusunu 37:21 ölçtü (eski beş ders 24:30; A1 4:56, A2 7:00, A3 8:01, A4 6:43, A5 7:21, A6 3:20; seslendirme olmadığı için okuma hızıyla); `denetle.js` temada temiz (13 kısa ders). `kural: 2` geçici olarak işaretlenip denetlendiğinde A konusunun altı dersinde sorun ve not çıkmadı; işaret geri alındı. `sure.js --kural`: altı derste soruyla açılan sahne 0, ilk sorudan önce 3–7 altyazı.

Kullanıcı onayı (8 Ekim 2026): A konusunu izledi, "bunları beğendim". "Hatırla" sahneleri aynı cümleyle açılacak biçimde eşitlendi ("Başlamadan önce iki şeyi hatırlayalım."); `olc.js` A2, A3, A5'te yeniden temiz, A konusu 37:25. Seslendirme dökümü (`ses-uret.js --liste`, API çağrısı yok): A1 17, A2 12, A3 41, A4 24 klip üretilecek (toplam 5.095 karakter; metni değişmeyen cümlelerin eski klipleri yeniden kullanılır); A5'in dökümü araçta takıldı, sayılamadı.

Kullanıcının bakması gerekenler: A2'de "bir noktadan tek paralel" ve "doğru açı 180°" taşlarının "başka bilgilere dayanan" bilgi olarak durması (eski içerik); "Hatırla" sahnelerinin açılış cümleleri dersten derse farklı (A2 "Önce geçen dersten iki soru.", A5 "Önce hatırla: …"); A4'te senaryoda olmayan küçük soru; A5 "İkinci yol" tahtasındaki öğe sayısı.

## Pilotun seslendirilmesi ve yayını (8 Ekim 2026, `plan/YURUTME.md` adım 1)

İzin: kullanıcı, "seslendirme, commit ve yayına geçebilirsin." Pilot dinleme adımı atlandı (ses ve yönergeler bu temada onaylıydı). Yukarıdaki "Seslendirme" tablosunda A1–A5 satırları eski metne aittir; A konusunun geçerli sayıları aşağıdadır.

- **Metin denetimi (1.1, iki Sonnet ajanı).** A1 ve A2'de değişiklik gerekmedi; A3'te 4, A4'te 1, A5'te 4, A6'da 1 `speak` eklendi ya da düzeltildi (x'e gelen ekler "x terimlerini", "x değerine"; "C’deki" → "C köşesindeki", "B’ye" → "B köşesine"; "x eşittir kırk sekiz derece"; iki `[thoughtful]`, bir `[short pause]`). "Sahne otomatik tamamlanamadı" uyarısı yok; A5 dökümü bu kez takılmadı.
- **Tarama (1.2, ana oturum).** Altı dökümde rakam ve simge yok; yönergeler yalnızca üç izinli etiket; başlangıç kopyasıyla karşılaştırmada yalnızca `speak` değişmiş, altyazılar aynı. Ders başına üç yönerge sınırı için klibi olmayan dört satırdan yönerge alındı (A1 bir `[thoughtful]`; A2 bir `[curious]`, bir `[thoughtful]`; A4 bir `[short pause]`). A3'te "A B kenarı" → "AB kenarı" (öteki derslerle aynı yazım).
- **Üretim (1.3, iki Haiku ajanı).** 131 yeni klip, 7.027 karakter; hata ve yeniden deneme yok; hiçbir klip iki kez üretilmedi. Metni değişmeyen 68 cümlenin eski klibi yeniden kullanıldı; metni artık derste geçmeyen eski klipleri araç sildi.
- **Sayfalar (1.4).** Altı sayfada `ses/<ders-id>.js` satırı.
- **Doğrulama (1.5).** Altı derste dizin, klip dosyaları ve döküm birebir; `--liste` "Üretilecek: 0 klip"; `olc.js` altı derste temiz; `denetle.js` "Sorun yok" (13 kısa ders); `sure.js` yeniden çalıştırıldı: A konusu 40:21, tema 76:36.

| Ders | Satır | Karakter | Klip (yeni) | Süre | Yönerge | Tahmini ders süresi |
|---|---|---|---|---|---|---|
| A1 | 21 | 1.175 | 21 (17) | 90,2 sn | 3 | 5:10 |
| A2 | 37 | 1.995 | 37 (12) | 150,4 sn | 3 | 7:19 |
| A3 | 54 | 2.908 | 54 (41) | 232,8 sn | 3 | 9:05 |
| A4 | 38 | 2.069 | 38 (24) | 161,7 sn | 3 | 7:27 |
| A5 | 41 | 2.119 | 41 (29) | 171,6 sn | 3 | 7:54 |
| A6 | 8 | 434 | 8 (8) | 33,1 sn | 1 | 3:26 |
| **A konusu** | **199** | **10.700** | **199 (131)** | **839,8 sn (14,0 dk), 6,83 MB** | **16** | **40:21** |

Tema toplamı: 327 klip, 23,2 dk, 11,3 MB (B ve C değişmedi: 128 klip).

Süre aykırısı (karakter başına süre, dersin ortancasından %30'dan fazla): yalnızca A3 sahne 7, `4bc30c58.mp3`, 4,16 sn, +%38, "Bir üçgenin açıları x, iki x ve üç x." (harf sayan satır; beklenen türden). Kısa yönde aykırı yok.

Dinlenmesi gerekenler (kullanıcı):

- "x" içeren satırlar (A3 sahne 7, A4 sahne 6): model "iks" diyor mu.
- Eski seslendirmeden kalan, tek harfe ek gelen dört klip (yeniden üretilmedi, ücretlenmesin diye): A3 sahne 5 "A’daki beta ve gama…" (`704b5818`), A4 sahne 2 "…C’den öteye uzatıyoruz" (`5582d0ff`), A5 sahne 4 "Önce A’daki açı: AC keseni boyunca C’ye taşınıyor" (`2db1b3e1`) ve "Şimdi B’deki açı: BC keseni boyunca C’ye kayıyor" (`d3cb4374`).
- İki harfli adlar bitişik yazıldı ("AB kenarı", "AC keseni", "BC doğrusunu").

Açık içerik sorusu: A2'de "bir noktadan tek paralel" ve "doğru açı 180°dir" taşları "başka bilgilere dayanan" bilgi olarak duruyor (eski içerik).

## Yürütme planı 2b: B ve C konularına sese dokunmayan ekler (8 Ekim 2026)

`plan/YURUTME.md` 2b. Anlatım, altyazı, sahne ve `speak` değişmedi; klip yeniden üretilmedi. Görev tanımı: `plan/matematik/geometrik-sekiller/gorev/ek-soru-gorevi.md`. A konusu pilotta yeniden yazıldığı için bu işin dışında.

| Konu | Ek sorular | Konu tekrarı | Kim | Durum |
|---|---|---|---|---|
| B Kenarlar ve açılar | B1–B4, 8 soru (üç şıklı) | `b5-tekrar` (altı kural, sekiz soru; üç kural çizimle) | ana oturum (örnek) | bitti |
| C Doğrulamayı sınamak ve kullanmak | C1–C3, 6 soru | `c4-tekrar` (altı kural, sekiz soru; kural 3 bumerang çizimiyle) | Sonnet | bitti |

Denetim (8 Ekim 2026): `olc.js` B1–B5 ve C1–C4'te bütün yerleşim ve bütçe sayaçları 0, konsol temiz (Haiku ajanı; ajanlar bittikten sonra sırayla). `sure.js` tema 90:39 (A 40:21, B 26:54, C 23:24; B5 4:05, C4 4:24). `denetle.js`: "15 kısa ders, yayında. Sorun yok." Karşılaştırmada B ve C derslerinde yalnızca `quiz` dizileri ile B4 ve C3'ün `nextLesson` satırı değişti. İki tekrar dersinden altı görüntüye bakıldı.

Notlar:

- Ana oturumun düzeltmeleri (C, Sonnet çıktısı): C3'ün yeni durum sorusu 6 m ve 10 m kullanıyordu (B4'ün çıkış sorusuyla ve C3'ün çatı makasıyla aynı sayılar), 8 m ve 15 m oldu; "iletki" → "açıölçer" (tema bu sözcüğü kullanıyor); C4'te "55°’e" → "55°’ye" ve bir geri bildirim cümlesi.
- Doğru şıkkın yeri: C'nin eski altı sorusunun beşinde cevap ortadaydı; eklenen altı sorunun yalnızca biri ortada. B'de eklenenler 1, 2 · 0, 2 · 2, 1 · 2, 1.
- İki tekrar dersi seslendirilmedi (sayfalarda `ses/…` satırı yok); `a6-tekrar` seslidir. Rakamlı altyazılarda `speak` hazır: seslendirme istenirse B5 13, C4 15 altyazı.
- Tekrar derslerinin defter notları derslerdeki notların kimliğini kullanır (`gs-en-uzun-kenar` gibi); yeni kimlikler: `gs-ortak-kenar`, `gs-ozel-ucgen`, `gs-ispatli-bilgi`.
- Kullanıcının bakabileceği sorular: C4 soru 6 (dikdörtgen adımı; C1'in sahne içi sorusuna yakın), C4 soru 5 ("kesinlikle olamaz": iç nokta önermesi derste ölçerek doğrulandı, ispatlanmadı), C3'ün yanılgı sorusu (hesap 70°, açıölçer 72°: "ölçüm hatası" sözü derste açıkça geçmiyor).

## Sıradaki

- Bu temada 2b bitti ve yayında (`990d78c`, 8 Ekim 2026). Aynı push ile `ef5629e` (Kimya Çeşitlilik; seslendirilmemiş, katalogda kapalı) da `origin/main`e gitti. Açık iş yok.
- Yürütme sırası: `plan/YURUTME.md` 2b, sıradaki tema Biyoloji Yaşam (`biyoloji/yasam/`, 8 konu: A–H). Önce derslerin dosya düzenine, şık sayısına ve kit olup olmadığına bakılır (`ls biyoloji/yasam biyoloji/yasam/dersler`, bir dersin `quiz` dizisi); görev tanımı bu temanınkinden (`plan/matematik/geometrik-sekiller/gorev/ek-soru-gorevi.md`: ders başına dosya ve kit düzeni) ya da Sayılar'ınkinden (bölüm dosyası düzeni) kopyalanıp `plan/biyoloji/yasam/gorev/` altına uyarlanır.
- 2b.1: A konusu ana oturumda (örnek); 2b.2: B–H konuları, konu başına bir Sonnet ajanı (aynı anda en çok dört); ajanlar bittikten sonra `olc.js` Haiku ajanıyla sırayla (ajanlar çalışırken toplu ölçüm boş dönüyor), sonra `sure.js` ve `denetle.js` ana oturumda.
- Sözel temada da geçerli iki kural: şıkta ve geri bildirimde sonraki dersin terimi geçmez (`grep -ln` ile doğrula); bir konuda eklenen soruların doğru şıkkı aynı yerde toplanmaz. Ajan çıktısında var olan sorularla ya da başka dersin örneğiyle aynı sayı ve bağlam aranır.

