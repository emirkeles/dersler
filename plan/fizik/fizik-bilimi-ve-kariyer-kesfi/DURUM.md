# Durum — fizik-bilimi-ve-kariyer-kesfi

Başlangıç ve bitiş: 7 Ekim 2026. Çalışma klasörü paylaşıldığı için dal değiştirilmedi; tema ve seslendirmesi aynı gün doğrudan `main`'e commitlendi.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti (vardı) |
| 2 Plan | bitti (vardı) |
| 2b Ders kitabı | bitti (1. ünite, s. 12–49; `PLAN.md` bölüm 6b) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7; 16 soru kapandı) |
| 4 Senaryolar | A, B, C, D bitti; `GORSELLER.md` yazıldı |
| 5 İskelet | bitti |
| 6 Dersler | bitti (6 kısa ders, 26 sahne) |
| 7 Denetim | bitti: `denetle.js` temiz, tema sayfası 4 konu ve 6 dersi gösteriyor, denetim tablosu ve `plan/fizik/TEMALAR.md` güncel |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 5 sahne |
| B1 | bitti | bitti | temiz | 4 sahne; S4'te tahtada tam 25 kelime (sınırda); kutup ışıkları ve kristal için resim bekliyor (yerinde vektör çizim var) |
| B2 | bitti | bitti | temiz | 4 sahne |
| C1 | bitti | bitti | temiz | 4 sahne |
| D1 | bitti | bitti | temiz | 4 sahne |
| D2 | bitti | bitti | temiz | 5 sahne |

## Notlar

- Ders kitabı: <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi> sayfasındaki PDF (`fizik-dersi-9sinif-ders-kitabi_20261006_194425_076.pdf`, 272 sayfa), 7 Ekim 2026'da alındı. PDF sayfa numarası basılı sayfa numarasıyla aynı. Kitap proje klasörüne konmadı.
- Ölçüm (1366×657, kit'in son hâliyle): altı derste de sayfa kayması, sığmayan altyazı, yana taşan panel, taşan ya da üst üste yazı, 12 kelimeyi aşan altyazı, 25 kelimeyi aşan tahta, 12 pikselden küçük punto ve konsol hatası sıfır.
- Etkileşim: temada kaydırıcı ve sürükle-bırak yok. "Kartı kutuya gönder" adımı `dersler/kit.js` içindeki `sec` ve `sirayla` ile kuruldu: öğrenci yan sütundan seçer, kart tahtada kutusuna uçar. `sec`, `c.choice` ile aynı sınıfları kullandığı için `araclar/olc.js` dersi kendiliğinden oynatabiliyor.
- Kitapta birebir geçmeyen cümleler: yanlış ve doğru seçimlerde yan sütunda çıkan ipucu ve gerekçe cümlelerinin bir bölümü (örnek: "Kristal, düzenli yapılı bir katıdır.", "Devre kartındaki çipler yarı iletken katılardan yapılır.", "Aynada görüntü ışığın yansımasıyla oluşur.") kitabın dal açıklamalarına (s. 25–29) dayanılarak yazıldı; kitapta bu sözlerle geçmez. Tanım, ad, tarih, söz ve kurum bilgilerinin hepsi kitaptandır.
- Kitaptan çıkarımla yapılan eşlemeler (kitap cevap anahtarı vermiyor): A1 bilgi kartlarının disiplinleri; B1'de optik dışındaki yedi grubun görselleri; B2 S4'te "ışık" dışındaki terimlerin dalları. Dayanakları `PLAN.md` bölüm 6b'de.
- Senaryodan sapmalar (senaryo dosyaları derse göre düzeltildi): A1 S3'te matematik bağı ters ok yerine ayrı renkle gösterilir. B1 S1'de görseller 4×4 yerine 8×2 dizilir. D1 S2'de eşleşen cümle etiketin altında kalmaz; etiketin çerçevesi yeşile döner (kelime bütçesi). D2 S3'te uyuşan cümle deftere eklenmez; çerçevesi renk değiştirir.
- Motorda eksik görülenler (düzeltilmedi, `ortak/` altında): `c.choice` her doğru cevaptan sonra "Devam" ister, art arda sınıflandırma için hızlı bir biçimi yok; sınıflandırma, eşleştirme ve sıralama için hazır araç yok. Bu temanın `kit.js` dosyasındaki `sec`, `sirayla`, `kart`, `etiket`, `sar` tarih, coğrafya ve edebiyat temalarına da gerekecek; `ortak/` altına taşınması düşünülebilir.
- Kullanıcı geri bildirimi (7 Ekim 2026): dersler doğrudan soruyla başlıyordu. Altı dersin ilk sahnesine ilk sorudan önce 2–3 altyazılık bilgilendirme eklendi (`PLAN.md` karar 17); altısı yeniden ölçüldü, temiz. `KURALLAR.md` 3 hâlâ "kanca ≤ 15 sn" diyor; kural dosyası değiştirilmedi.
- Tel sesi (kullanıcı geri bildirimi, 7 Ekim 2026: "tel titriyor ama ses çıkmıyor"): A1 S1'de tel çekilip bırakılınca gitar teli sesi duyulur. Ses dosyası yok; `a1-fizik-baglarindan-taninir.js` içinde Karplus–Strong yöntemiyle üretilir (sol teli, 196 Hz). Teldeki salınımın genliği sesin zarfından okunur; vida teli gererken ses iki yarım ses incelir. "Ses kapalı" iken çalmaz, ders duraklatılınca söner, anlatım kliplerinin üstüne binmez. Başsız tarayıcıda çözümleyiciyle ölçüldü: 196 Hz, sönen ses, gerilirken yaklaşık 220 Hz'e yükseliyor, altyazı okunurken sessiz. Kulakla dinlenmedi. Altyazı metni değişmediği için klip yeniden üretilmedi.
- Yayın: 7 Ekim 2026'da kullanıcı istedi; `ortak/katalog.js` içinde `yayinda: true`. Ana sayfa Fizik altında temayı ve altı dersi gösteriyor, konsol temiz. Yayına alındığında klipler henüz dinlenmemişti, iki resim üretilmemişti.
- Yapılmayanlar: görsel üretimi, hikâye videosu.
- Geriye dönük düzeltme yok (kullanıcı kararı, 7 Ekim 2026): `KURALLAR.md` 3 aynı gün değişti (ders uzunluğu tavan değil, her sorudan önce gereken bilgi öğretilir) ve kullanıcı seslendirmede yönerge istedi. Bu tema yeni kurallara göre yeniden yazılmaz, klipleri yönerge eklemek için yeniden üretilmez; kurallar sonraki temalarda uygulanır.

## Seslendirme

7 Ekim 2026, kullanıcı istedi. Yordam: `../../SESLENDIRME.md`. Anlatıcı, model ve biçim Sayılar ile aynı (`eleven_v4`, `mp3_44100_64`).

| Ders | Satır | Karakter | Klip | Süre (sn) | Boyut (KB) | Yönerge | Durum |
|---|---|---|---|---|---|---|---|
| A1 | 16 | 738 | 16 | 58 | 455 | 0 | üretildi; dinlenmedi |
| B1 | 12 | 623 | 12 | 49 | 385 | 0 | üretildi; dinlenmedi |
| B2 | 11 | 539 | 11 | 44 | 348 | 0 | üretildi; dinlenmedi |
| C1 | 22 | 1.214 | 22 | 91 | 714 | 0 | üretildi; dinlenmedi |
| D1 | 16 | 852 | 16 | 63 | 497 | 0 | üretildi; dinlenmedi |
| D2 | 16 | 821 | 16 | 62 | 488 | 0 | üretildi; dinlenmedi |
| Toplam | 93 | 4.787 | 93 | 367 (6,1 dk) | 2.887 (2,8 MB) | 0 | |

- **Yordamdan sapma:** `SESLENDIRME.md` üretimden sonra fark edildi (başka bir oturum aynı gün yazmış). 3. adımdaki pilot atlandı: yalnızca A1 üretilip kullanıcıya dinletilmesi gerekirken altı dersin hepsi üretildi. Yanlış okunan bir kalıp çıkarsa o satırlar yeniden üretilir ve yeniden ücretlenir.
- Adım 2 (metin denetimi): okunan metinde rakam ve simge kalmadı. Okunuşu `speak:` ile verilenler, kitabın parantez içindeki okunuşlarıyla: CERN → "Sörn" (D1, üç satır); Isaac Newton → "Ayzek Nüvtın", Galileo Galilei → "Galileyo Galiley", Johannes Kepler → "Yuhannes Kepler", Einstein → "Aynştayn" (C1); 1900, 1905, 1915, 27 km ve 100 m yazıyla. Yönerge (`[curious]`, `[excited]`) eklenmedi; kullanıcı pilotu dinledikten sonra karar verilecek. Aday: D1 S3 "Metni okurken aklına bir şey takıldı mı?" (`[curious]`).
- Adım 5: altı ders sayfasına `ses/<ders-id>.js` satırı eklendi.
- Adım 6: her dersin dizini ile klip dosyaları birebir uyuşuyor; `--liste` altı derste de "Üretilecek: 0 klip" diyor; `olc.js` ve `denetle.js` kliplerle temiz. Süre, dersin ortancasından %30'dan fazla sapan iki klip var, ikisi de kısa cümle (+%32): B2 S2 `a1edfb38` "Dört raf, dört alt dal oldu." (2,9 sn) ve C1 S1 `dc98b88a` "İlk söz Ayzek Nüvtın'dan." (2,4 sn). Dinlenmeli.
- Kulakla dinlenmesi gerekenler: yukarıdaki iki klip; C1 S1 ve S3'teki yabancı adlar ve yıllar; D1 S1 ve S3'teki "Sörn"; D2 S1 "ASELSAN".
- Bir altyazının metni değişirse yalnızca o klip yeniden üretilir: `node araclar/ses-uret.js fizik-bilimi-ve-kariyer-kesfi/<kod>`.

## Yürütme planı 2b: sese dokunmayan ekler (9 Ekim 2026)

`plan/YURUTME.md` 2b. Anlatım, altyazı, sahne ve `speak` değişmedi; klip yeniden üretilmedi. Her derse iki çıkış sorusu (2'den 4'e; üç şıklı; biri yeni durum, biri yanılgı), her konunun sonuna konu tekrarı dersi (seslendirilmedi; sayfalarda `ses/…` satırı yok). Görev tanımı ve üç yardımcı araç `gorev/` altında: `ek-soru-gorevi.md`, `ders-ozeti.cjs`, `soru-ekle.cjs`, `sik-sirala.cjs` (Biyoloji Yaşam'dan kopyalandı, yalnızca klasör yolu değişti).

| Konu | Ek sorular | Konu tekrarı | Kim | Durum |
|---|---|---|---|---|
| A Fizik bilimi | A1, 2 soru | `a2-tekrar` (beş kural, altı soru) | ana oturum (örnek) | bitti |
| B Fizik biliminin alt dalları | B1–B2, 4 soru | `b3-tekrar` (altı kural, sekiz soru) | Sonnet | bitti |
| C Fizik bilimine yön verenler | C1, 2 soru | `c2-tekrar` (beş kural, altı soru) | Sonnet | bitti |
| D Fizik bilimi ile ilgili kariyer keşfi | D1–D2, 4 soru | `d3-tekrar` (altı kural, sekiz soru) | Sonnet | bitti |

Toplam: 6 derse 12 ek soru, dört tekrar dersinde 28 soru; tema 10 kısa ders.

Denetim: `olc.js` on derste (Haiku ajanı, sırayla) bütün yerleşim ve bütçe sayaçları 0, konsol temiz. `sure.js` tema 64:05 (A 10:20, B 21:30, C 11:39, D 20:36; tekrar dersleri 3:58–5:47). Eski altı dersin süresi 51–70 sn arttı (iki ek soru). `denetle.js`: "10 kısa ders, yayında. Sorun yok."; `--kural`: çıkış sorusu 4–5 değil 0/10, konu tekrarı yok 0/4. Karşılaştırmada altı ders dosyasında değişiklik yalnızca `quiz` dizisine ekleme ve dört konunun son dersinde `nextLesson` satırı (D2'de alan yoktu, eklendi). Dört tekrar dersinden dokuz görüntüye bakıldı.

Cevap yerleri (0/1/2): A1 1/2/1, `a2` 2/2/2; B1–B2 3/3/2, `b3` 3/3/2; C1 1/1/2, `c2` 2/2/2; D1–D2 3/3/2, `d3` 3/3/2.

Ana oturumun düzeltmeleri (ajan çıktısı):

- `c2-tekrar` soru 5: doğru şık yanlış yerdeydi (rapor 1 diyordu, dosyada 0; tekrar 3/1/2 oluyordu); `sik-sirala.cjs` ile 1'e alındı.
- B1 soru 4 geri bildirimi: "derste görsellerin hepsi aynı boydaydı" → "rafı nitelik belirler".
- `b3-tekrar` soru 1: "Bir mühendis" → "Bir teknisyen" (konuda üç soru aynı kişiyle başlıyordu).
- `d3-tekrar` soru 3: nottaki kaynak "(Ders kitabı, s. 41)" → "(kaynak: NASA’nın kendi sitesi)"; soru 1 geri bildiriminde derste geçmeyen "ikinci elden" sözü çıkarıldı.

Notlar:

- Tek dersli konularda (A, C) tekrar dersi dersin hemen ardından gelir: beş kural, altı soru (alt sınır). Kullanıcı gereksiz bulursa iki dosya ve `tema.js` satırı silinir, A1 ve C1'in `nextLesson` satırı eski hâline döner.
- Kullanıcının bakabileceği sorular: `a2-tekrar` soru 1 (bardaktaki kalemin kırık görünmesi: derste kırılma yalnızca gökkuşağıyla geçiyor), `b3-tekrar` soru 4 (salıncak ve kızak: "hareket ve kuvvet" eşlemesi derste bu örneklerle yok), `d3-tekrar` soru 1 (blog yazısının ilk elden olmadığı derste açıkça söylenmiyor), D1 soru 3 (yeni durum olarak zayıf: aynı ayrımı TÜBİTAK için soruyor).
- `c2-tekrar` tahtasında yedi unsurun hepsi yazıyor; "bilimsel erdem", "ilke" ve "laboratuvar deneyimi" için derste örnek yok, sorularda kullanılmadı.
- Dört tekrar dersi seslendirilmedi. `speak` hazır: `a2` 1 (LED), `c2` 3 (Newton, Galileo, Kepler, Einstein), `d3` 1 (CERN).
- Ajan başına bağlam: B 124, C 100, D 129 bin token; ölçüm (Haiku) 48 bin.

## Sıradaki

- Bu temada 2b bitti; commit `d143d1f` yerelde. Açık iş: push (9 Ekim 2026'da bu oturumdan yapılamadı: anahtarlık okunamadı, `gh` belirteci geçersiz). Sonraki oturum önce `git status -sb` ile `main`in `origin/main`den ileride olup olmadığına bakar.
- Yürütme sırası: `plan/YURUTME.md` 2b, sıradaki tema Kimya Etkileşim (`kimya/etkilesim/`, 8 konu, 18 ders: A 2, B 2, C 2, D 1, E 3, F 3, G 1, H 4; sekiz tekrar dersi). Ders dosyaları büyük (25–60 KB, 340–700 satır) ve çok satırlı; çıkış soruları üç şıklı; `dersler/kit.js` yalnızca 2,8 KB, ortak biçim `dersler/tema.css` içinde. Ajanlar ders dosyasını okumaz: bu temanın üç aracı (`plan/fizik/fizik-bilimi-ve-kariyer-kesfi/gorev/*.cjs`; içlerindeki klasör yolu değiştirilerek) ve görev tanımı kopyalanıp `plan/kimya/etkilesim/gorev/` altına uyarlanır. Önce `ders-ozeti.cjs` dökümünün bu temada çalıştığı doğrulanır (ders dosyaları `Ders.start` dışında başka küreseller kullanıyorsa araçtaki sahte ortam genişletilir).
- 2b.1: A konusu ana oturumda (örnek); 2b.2: kalan yedi konu, konu başına bir Sonnet ajanı (aynı anda en çok dört); ajanlar bittikten sonra `olc.js` Haiku ajanıyla sırayla (on ders altı dakika sürdü), sonra `sure.js` ve `denetle.js` ana oturumda.
- Görev iletisinde cevap yerleri sayıyla verilir; tek dersli konuda (D, G) tekrar dersi altı soru olur. Ajan raporundaki cevap yerlerine güvenilmez: `ders-ozeti.cjs --sorular <harf>` ile okunur.
