# Durum — Kuvvet ve Hareket

Son güncelleme: 8 Ekim 2026. 24 kısa dersin hepsi yazıldı ve ölçüldü (154 sahne); `denetle.js` temiz. Tablolu on sahnede 25 kelime sınırı kullanıcı kararıyla gevşetildi. 24 ders seslendirildi ve tema yayına alındı (8 Ekim 2026, kullanıcı isteğiyle; izleme yayından sonraya kaldı). Sıradaki adım: kullanıcı temayı sesli izler.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti |
| 2 Plan | bitti (7 Ekim 2026'da yeniden yazıldı: örnekler, yanılgılar, anlama denetimi) |
| 2b Ders kitabı | bitti (s. 50–129 okundu; `PLAN.md` bölüm 6b) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7); karar 1, 10 ve 22 kullanıcı tarafından onaylandı (7 Ekim 2026) |
| 4 Senaryolar | bitti: `senaryolar/` altında altı dosya; `node plan/fizik/kuvvet-ve-hareket/senaryo-denetle.cjs` temiz |
| 5 İskelet | bitti: `index.html`, `tema.js` (24 satır), `dersler/kit.js` |
| 6 Dersler | bitti: A1 ana oturumda, kalan 23 ders dokuz alt ajanda yazıldı; hepsi `olc.js` temiz |
| 7 Denetim | bitti: `denetle.js` temiz; tema sayfası görüntüsüne bakıldı; sahne numaraları `PLAN.md` tablosuna işlenmedi (senaryoların "Sayım ve kapsam" paragraflarında) |

Senaryo biçimi kimya Etkileşim temasındaki onaylı örnektir; biçim denetimi `senaryo-denetle.cjs` (oradaki betiğin kopyası). A ve B'yi ana oturum, C–F'yi beş alt ajan yazdı; ana oturum A, B, C4, C5, D1, D2, E3, E5, E6, E7, F1, F2'yi satır satır, ötekileri betik ve alt ajan raporuyla denetledi. Okunmayan dersler: C1, C2, C3, C6, C7, C8, C9, E1, E2, E4.

Kullanıcıya açık kalan notlar `PLAN.md` bölüm 8'de (uranyum kartı, s. 88 tablosu, E7'deki "10 saniye yeşil").

## İskelet adımı için: kite gerekecek çizim araçları (senaryolardan)

- Kareli düzlem: yön gülü, ölçek etiketi, kare köşesine oturan sürüklenebilir ok, üç renk rolü (birinci vektör, ikinci vektör, bileşke), kesikli bileşen oku, ok taşıma animasyonu (dönmeden kayar, soluk iz kalır), kare sayım çizgileri (C1–C9).
- Bir boyutta toplama şeridi ve iki boyutlu "oku uca oturt" (C4, C5); paralel çizme ve kaydırıcıya bağlı paralelkenar (C6); eksenli düzlem ve bileşen tablosu (C7, C8); üç panelli görünüm (C9).
- Kart–kutu sınıflandırma: adı sonradan beliren kutu, iki turlu kullanım, dört gözlü tablo, çoklu işaretleme tablosu (A2, B1, B2, D1, D2, E6, F1, F2).
- Eşleştirme (A1, C9, E7) ve satır satır açılan tablo (A1, A2, D2, E7).
- Sayı doğrusu koşucusu: sürüklenebilir duraklar, yol sayacı, yer değiştirme oku, kronometre, dört adım kutusu (E2, E4, E6).
- Kroki: kareli zemin, adlı yerler, taşınabilir referans halkası, konum oku (E1); yörünge çizici (E2–E4).
- Sürat göstergesi (E3, E5, E7); iki bölümlü yolculuk benzetimi (E3); saniye saniye hız şeridi ve hız/ivme okları (E4, E5).
- Otoyol şeridi ve veri tablosu; yeşil dalga benzetimi: ışıklar, kronometre, üç konumlu sürat kaydırıcısı (E7).
- Benzetimler: kanepe (B1, C4), halat çekme ve rafting botu (C4), gözü bağlı oyuncu (B1).
- Çekirdek şeması (proton, nötron, itme ve tutma okları) ve ölçeksiz etki mesafesi çizimi (D1, D2).
- Hareket animasyonu bileşeni: iz bırakan işaretli noktalar, sabit nokta, denge çizgisi, "yere göre / cisme göre" bakış değiştirme; yaklaşık yirmi hareket (F1, F2).

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 55 altyazı (54 anlatım + 1 yönerge) |
| A2 | bitti | bitti | temiz | |
| B1 | bitti | bitti | temiz | |
| B2 | bitti | bitti | temiz | |
| C1 | bitti | bitti | temiz | |
| C2 | bitti | bitti | temiz | |
| C3 | bitti | bitti | temiz | |
| C4 | bitti | bitti | temiz | |
| C5 | bitti | bitti | temiz | |
| C6 | bitti | bitti | temiz | |
| C7 | bitti | bitti | temiz | |
| C8 | bitti | bitti | temiz | |
| C9 | bitti | bitti | temiz | |
| D1 | bitti | bitti | temiz | |
| D2 | bitti | bitti | temiz | |
| E1 | bitti | bitti | temiz | |
| E2 | bitti | bitti | temiz | |
| E3 | bitti | bitti | temiz | Hikâye "İki kamera arası" işlendi ve 9. sahne olarak bağlandı (8 Ekim 2026) |
| E4 | bitti | bitti | temiz | |
| E5 | bitti | bitti | temiz | |
| E6 | bitti | bitti | temiz | |
| E7 | bitti | bitti | temiz | Yeşil dalganın işleyişi doğrulanamadı; örnek veri |
| F1 | bitti | bitti | temiz | |
| F2 | bitti | bitti | temiz | |

## Ölçüm (7 Ekim 2026, son tarama)

24 dersin hepsi `node araclar/olc.js kuvvet-ve-hareket/<kod>` ile 1366×657'de ölçüldü: sayfa kayması, sığmayan altyazı, yana taşan panel, üst üste yazı, tahtadan taşan yazı, 12 kelimeyi aşan altyazı ve 12 pikselden küçük punto sayaçlarının hepsi sıfır; konsol temiz; otomatik tamamlanamayan sahne yok. "Tahtada 25 kelime" sayacı 19 derste sıfır; beş derste yalnızca aşağıdaki tablolu sahnelerde aşıyor (kullanıcı kararı, `PLAN.md` karar 23). `node araclar/denetle.js fizik/kuvvet-ve-hareket`: "24 kısa ders, yayında değil. Sorun yok."

### Tablolu sahnelerde kabul edilen aşımlar (8 Ekim 2026)

Kullanıcı kararıyla tablolar bütün satırlarıyla birlikte görünüyor; bu sahnelerde 25 kelime sayacı aşıyor, öteki sayaçlar sıfır.

| Ders | Sahne | Tablo | Tahtada en çok kelime |
|---|---|---|---|
| C1 | S5 | Dokuz vektörün yön–büyüklük tablosu | 52 |
| C2 | S2, S4 | Aynı tablonun beş satırı | 35, 37 |
| C9 | S4, S6 | Üç çift × üç yöntem sonuç tablosu; yöntemlerin özeti | 40, 38 |
| D2 | S2, S3, S6 | Dört kuvvetin karşılaştırma tablosu; beş özellik tablosu | 29, 56, 27 |
| E7 | S4, S7 | Üç sürücü kartı; yedi satırlık genelleme tablosu | 35, 41 |

25'i aşan altyazı sayısı: C1 8/70, C2 20/64, C9 11/64, D2 16/60, E7 14/71. E7 S5 sınırın içinde kaldı (25). Ana oturum C1 S5, C9 S4, D2 S3 ve E7 S7'nin görüntüsüne baktı: yazılar okunuyor, üst üste binme yok.

Ana oturumun ekran görüntüsüne baktığı dersler: A1 (bütün sahneler), A2 S5, B1 S3, C5 S2, C9 S2, D1 S5, E7 S6, F1 S3 ve tema sayfası. Öteki sahnelerin görüntülerine dersi yazan alt ajan baktı.

## Kullanıcının izlerken bakması istenen sahneler (alt ajan raporlarından)

- Tam 25 kelimede duran, tek kelime eklenince bütçeyi aşacak sahneler: A2 S3–S4, C3 S4, E2 S3, E3 S3, E4 S6 ve S8, E6 S3, E7 S2 ve S5.
- Kaydırıcılı keşif adımları (ölçüm aracı kaydırıcıyı oynatmaz, yalnızca "Devam"a basar): C3 S5, C6 S5, C9 S4, E3 S6, E7 S6.
- Şematik kalan çizimler: A2 S1 (koşu bandı) ve S7 (amortisör), B1 S1 (ısıtıcı), C4 S3–S4 ve S7 (nehir ve bot), C6 S1–S2 (üstten figürler), D1 S1 (altı küçük canlandırma) ve S3 (gelgit), E4 S3 (bisikletli), F1 S4 (saksı), F2 S3 (atlıkarınca).
- Sıkışık yerler: C4 S4, S5, S7 (yarım kare aşağıdaki geri dönen ok), C9 S2 ve S4 (üç küçük panel), E7 S3 (200–220 km arasında iki otobüs üst üste).
- F1 S7 ve F2 S4: alıştırma kartlarında izler önce mor, doğru cevapla tür rengine dönüyor (renk cevabı ele vermesin diye; senaryodan ayrılma).
- Soru anında hareket animasyonları duruyor (F1, F2): hareket cümleyle birlikte ve sorudan hemen önce bir kez oynuyor, öğrenci düşünürken son kare ekranda kalıyor.

## Senaryodan ayrılmalar (özet)

- "Sürükle-bırak", "eşleştirme" ve "işaretleme" adımlarının hepsi art arda seçenekli sorularla kuruldu (motorun ve ölçüm aracının çalışma biçimi; onaylı kimya dersindeki gibi). Gerçek sürükleme yok.
- 25 kelime sınırı yüzünden çoğu tablo satır satır açılıp kapanıyor ya da kısa etiket kullanıyor; içerik atılmadı.
- Senaryonun geri bildirim yazmadığı dene maddelerinde yanlış şıkların ipuçlarını dersi yazan ajan yazdı.
- E2 S7'nin 2. cümlesi değişti ("Durakları sürükle…" → "Duraklar bayrakla işaretli; koşucu sırayla hepsine uğrayacak."); senaryo da güncellendi.
- Vektör adları tahtada üstü oklu (C1–C9); defter notlarında düz harf.

## Kit için birikenler (yapılmadı)

Alt ajanlar şu yardımcıları kendi ders dosyalarına kopyaladı; kite alınırsa tekrar azalır: üstü oklu harf ve eşitlik; okla taşınan etiket; sıfır boydan çizilen ok; yön çizgisi ("batı ← → doğu"); kronometre; kesir yazımı; eksenli düzlem ve bileşen tablosu; sayı doğrusu koşucusu ve dört adım kutusu; referans halkası; hareket bileşeni (iz, sabit nokta, denge çizgisi); onay ve çarpı işareti. Kitteki iki küçük pürüz: `yonGulu` tam adlarla doğu ve batı yazısını oka bindiriyor; `izgara.vektor` etiketi batıya ve güneye bakan oklarda ters tarafa düşüyor. Dersler bunların çevresinden dolaşarak yazıldı; kit değiştirilirse etkilenen dersler yeniden ölçülmeli.

## Seslendirme öncesi

`speak` metinlerinde harf okunuşları ajandan ajana elle yazıldı (A "a", B "be", K "ke", x "iks", SI "se i", Δx "delta iks"…). Seslendirmeden önce 24 derste tek liste hâlinde denetlenmeli (`node araclar/ses-uret.js <kod> --liste`).

## Seslendirme (8 Ekim 2026)

24 dersin hepsi seslendirildi: 1.472 klip, 89.388 karakter, 115,7 dakika, 57 MB (`fizik/kuvvet-ve-hareket/ses/`). Ses Gamze Özdemir, model `eleven_v4`, biçim `mp3_44100_64` (`plan/SESLENDIRME.md`). Kullanıcı kararıyla pilot atlandı; kullanıcı dersleri ve klipleri henüz dinlemedi.

Okunacak metni (`speak:`: rakam ve simgeler kelimeyle, harf okunuşları ortak tabloyla, yönergeler) altı Sonnet 5.5 alt ajanı hazırladı. Klipleri A1, A2, D1, D2, E1–E4, F1 ve F2 için alt ajanlar, kalan 14 ders için ana oturum üretti (alt ajanlarda ücretli komut izin denetiminde reddedildi). Yönergeler yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; toplam 144.

| Ders | Klip | Karakter | Yönerge | Süre (dk) | MB | Dizin ve dosyalar |
|---|---|---|---|---|---|---|
| A1 | 53 | 3174 | 5 | 4.1 | 2.01 | tam |
| A2 | 64 | 3768 | 6 | 4.9 | 2.36 | tam |
| B1 | 51 | 2884 | 6 | 3.6 | 1.75 | tam |
| B2 | 42 | 2428 | 5 | 3.1 | 1.52 | tam |
| C1 | 68 | 3860 | 6 | 5.0 | 2.44 | tam |
| C2 | 61 | 3444 | 7 | 4.7 | 2.28 | tam |
| C3 | 65 | 3874 | 6 | 5.2 | 2.54 | tam |
| C4 | 74 | 4341 | 6 | 5.6 | 2.72 | tam |
| C5 | 67 | 3915 | 7 | 5.1 | 2.48 | tam |
| C6 | 59 | 3591 | 6 | 4.7 | 2.28 | tam |
| C7 | 56 | 3244 | 6 | 4.4 | 2.12 | tam |
| C8 | 52 | 3095 | 6 | 4.2 | 2.06 | tam |
| C9 | 60 | 3320 | 5 | 4.4 | 2.16 | tam |
| D1 | 70 | 4456 | 7 | 5.4 | 2.64 | tam |
| D2 | 58 | 3749 | 6 | 4.7 | 2.31 | tam |
| E1 | 61 | 3957 | 6 | 5.0 | 2.43 | tam |
| E2 | 68 | 4416 | 7 | 5.7 | 2.76 | tam |
| E3 | 70 | 4304 | 7 | 5.6 | 2.74 | tam |
| E4 | 78 | 5035 | 7 | 6.5 | 3.17 | tam |
| E5 | 53 | 3250 | 5 | 4.3 | 2.09 | tam |
| E6 | 77 | 5062 | 7 | 6.7 | 3.24 | tam |
| E7 | 68 | 4174 | 6 | 5.3 | 2.58 | tam |
| F1 | 57 | 3652 | 5 | 4.5 | 2.18 | tam |
| F2 | 40 | 2395 | 4 | 3.0 | 1.46 | tam |

Doğrulama: her derste dizin, klip dosyaları ve döküm birbirini tutuyor; `--liste` 24 derste "Üretilecek: 0 klip"; 24 sayfa ses dizinine bağlı; `olc.js` konsol temiz; `denetle.js` temiz. Karakter başına süresi dersin ortancasından %30'dan fazla sapan 14 klip var, hepsi uzun yönde (kısa yönde, yani yutulmuş kelime kuşkusu taşıyan klip yok):

| Ders | Sahne | Klip | Süre (sn) | Sapma | Metin |
|---|---|---|---|---|---|
| E1 | 5 | `9e6f5451` | 5,7 | +%44 | Düz bir yolda dört nokta işaretli: a, be, ce ve de. |
| C2 | 5 | `7abfda8c` | 4,2 | +%41 | Yön aynı, boy farklı: ne eşit ne zıt. |
| B1 | 6 | `947c21bb` | 5,6 | +%40 | Skaler "ne kadar" der; [short pause] vektörel "ne kadar ve nereye". |
| C9 | 6 | `c3a794b3` | 2,2 | +%40 | Yol üç, bileşke tek. |
| A1 | 3 | `8c34cbb7` | 5,6 | +%39 | Her birimin bir de sembolü vardır: me, ka ge ve se. |
| A2 | 6 | `940e11d3` | 3,8 | +%37 | Bu uzun birime kısaca [short pause] newton denir. |
| C2 | 5 | `9a2d3296` | 3,8 | +%35 | Yön aynı, boy aynı: eşit vektörler. |
| E6 | 3 | `5cb08d7c` | 5,5 | +%35 | Toplam süre üç artı iki artı beş eşittir on saniye. |
| C2 | 5 | `9b7b22e7` | 3,7 | +%33 | Yön ters, boy aynı: zıt vektörler. |
| C6 | 6 | `625ab930` | 3,8 | +%33 | Bileşke, [short pause] paralelkenarın köşegenidir. |
| E3 | 5 | `623311e7` | 9,0 | +%33 | Toplam süre: sıfır virgül beş artı bir virgül beş artı üç artı bir eşittir altı saat. |
| D2 | 1 | `bdd0bc65` | 4,2 | +%32 | Masa, kalem, taş: hepsi atomlardan oluşur. |
| C9 | 4 | `571bdb34` | 6,9 | +%30 | Bileşenlerle: yatayda iki ile üç, düşeyde üç yukarı ile iki aşağı. |
| D2 | 2 | `ef81b27c` | 2,9 | +%30 | İkinci soru: kuvvet ne yapar? |

Kulakla doğrulanmamış okunuşlar (bütün derslerde aynı yazımla üretildi): SI "se i"; °C "derece selsiyus"; joule "jul"; pascal "paskal"; vektör ve nokta adları küçük harfle ("a vektörü", "be noktası", "ke aracı"); v "ve", x "iks", Δx "delta iks"; a (ivme sembolü) "a". Yanlış çıkan satır: `speak` metni düzeltilir, o klip yeniden üretilir.

Kötü çıkan klibi yenilemek: `ses/kuvvet-ve-hareket-<kod>/<klip>.mp3` silinir, `node araclar/ses-uret.js kuvvet-ve-hareket/<kod>` yeniden çalıştırılır.

## Hikâye bağlantısı ve süreler (8 Ekim 2026)

- "İki kamera arası" filmi işlendi (`hikaye/e3-iki-kamera/renders/e3-iki-kamera.mp4`, 71 sn, 17,6 MB) ve E3'ün 9. sahnesi olarak bağlandı; `tema.js` içine `hikayeler` satırı eklendi (tema sayfasında "Hikâyeler" kartı). `tema.js` E3 sahne sayısı 8 → 9. `olc.js kuvvet-ve-hareket/e3` ve `denetle.js` temiz.
- `sure.js` yeniden çalıştırıldı: 15 satır değişti. E3 dışındaki 14 dersin (B1, B2, C1–C9, E5–E7) süresi, klipleri üretilmeden önce ölçülmüş değerde kalmıştı; tema toplamı yaklaşık 4 sa 35 dk'dan 4 sa 53 dk'ya çıktı.
- Kullanıcı filmin 7–12. karelerini ve seslendirmesini işlemeden önce onaylamadı; izleyince değişiklik isterse film yeniden işlenir (dosya adı aynı kalır).
