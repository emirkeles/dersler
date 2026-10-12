# Durum — Fizik · Akışkanlar

Son güncelleme: 12 Ekim 2026 (birinci oturum; kullanıcı "devam et" dediği için 2a.3 ve 2a.4 de aynı oturumda yapıldı). Tema `plan/YURUTME.md` 3. adımın ikinci temasıdır (2a ile aynı düzen). Birinci oturumda 2a.1 ve 2a.2 bitti: ders kitabı (A bölümünü ana oturum, B–E bölümlerini dört Sonnet ajanı döküme çevirdi; ajan başına 75–100 bin token), `PLAN.md` kararları, konu A senaryosu, iskelet, kit, A1.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti (7 Ekim 2026) |
| 2 Plan | bitti (taslak 7 Ekim 2026; kararlardan sonraki ders listesi 12 Ekim 2026) |
| 2b Ders kitabı | bitti (s. 130–195; `PLAN.md` bölüm 8) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7, 24 karar) |
| 4 Senaryolar | bitti: A (ana oturum), B, C, D, E (dört Sonnet ajanı; 12 Ekim 2026) |
| 5 İskelet | bitti: `index.html`, `tema.js` (`kural: 2`), `dersler/kit.js`, `dersler/a-araclar.js` |
| 6 Dersler | Konu A bitti (A1, A2, A3 tekrar); 17 dosya bekliyor (13 kısa ders, 4 konu tekrarı) |
| 7 Denetim | bekliyor |

| Kısa ders | Senaryo | Ders | olc | Not |
|---|---|---|---|---|
| A1 | bitti | bitti | temiz | 6 sahne, 43 altyazı, 8:48; ana oturum yazdı; altı sahnenin son karesine ve üç ara kareye bakıldı |
| A2 | bitti | bitti | temiz | 7 sahne, 41 altyazı, 6:42; Sonnet (167 bin token, tek ölçüm turu); 4, 5, 6 ve 7. sahnelerin son karesine bakıldı; tablolu sahneler 26, 26 ve 58 kelime |
| A3 tekrar | bitti | bitti | temiz | 1 sahne + 8 soru, 6 altyazı, 3:55; Sonnet (109 bin token); iki kareye bakıldı; ilk çizim ve son kare ana oturumda düzeltildi (aşağıda) |
| B1 | bitti | bekliyor | | 7 sahne (Hatırla dahil) |
| B2 | bitti | bekliyor | | 11 sahne; sahne 8 ana oturumda orana çevrildi (aşağıda) |
| B3 | bitti | bekliyor | | 7 sahne; sayı yok |
| B4 | bitti | bekliyor | | 9 sahne; kaynak kartları ve kontrol listesi |
| B5 tekrar | bitti | bekliyor | | 1 sahne + 10 soru |
| C1 | bitti | bekliyor | | 6 sahne + Hatırla |
| C2 | bitti | bekliyor | | 6 sahne + Hatırla; temadaki tek sayısal hesap |
| C3 | bitti | bekliyor | | 9 sahne + Hatırla |
| C4 tekrar | bitti | bekliyor | | 1 sahne + 8 soru |
| D1 | bitti | bekliyor | | 10 sahne |
| D2 | bitti | bekliyor | | 10 sahne; hipotez sorusunda doğru şık yok (`tahminAl`) |
| D3 | bitti | bekliyor | | 10 sahne; sahne 6 ana oturumda sadeleşti (aşağıda) |
| D4 | bitti | bekliyor | | 12 sahne |
| D5 tekrar | bitti | bekliyor | | 1 sahne + 10 soru |
| E1 | bitti | bekliyor | | 10 sahne + Hatırla |
| E2 | bitti | bekliyor | | 9 sahne + Hatırla |
| E3 tekrar | bitti | bekliyor | | 1 sahne + 8 soru |

Ölçüm (12 Ekim 2026): A1, A2, A3 `olc.js` temiz. `sure.js`: A1 8:48, A2 6:42, A3 3:55; Konu A 19:25. `denetle.js` iki sorun gösteriyor, ikisi de beklenen: pilot sayfaları (`p1-…`, `p2-…`) `tema.js` içinde yok (karar 20).

## Senaryoların denetimi (12 Ekim 2026)

Dört senaryo ajanı 194–312 bin token harcadı (E 194, C 254, B 264, D 312; hedef 300: D aştı, beş dersli ve 850 satır). Dördü de dökümü ham metinden önce okudu. Ana oturum her senaryonun raporunu, ders başlıklarını, "Hatırla" sorularını ve işaretlenen sahneleri okudu; örnek verileri yeniden hesapladı (B2: 980, 1.960, 3.920, 2.940, 5.880 Pa; C2: 101.292,8 ≈ 101.300 Pa; D1: 0,98 N'luk dilimler, dinamometre 9,8 − F_k; D3: 980 ve 1.372 Pa, 9,8 ve 13,72 N, fark 3,92 N); kırmızı, siyah çizgi, "hız", kitap göndermesi taraması boş.

Ana oturumun düzeltmeleri:

- **B2 sahne 8** "Modelle hesap" değer yerine koyarak çarpma yaptırıyordu (0,5 · 1.000 · 9,8). Program bu modelde örnekleri değişkenlerin ilişkisini yorumlamakla sınırlıyor: sahne "Modelle çıkarım" oldu, çıkarım ölçülmüş değerden oranla yürüyor. B5'in 2. sorusu da orana çevrildi.
- **D3 sahne 6**: çarpma anlatan iki altyazı ("980 çarpı 0,01") sayının kendisini söyleyen cümleye çevrildi; sahne farkın D1'deki 3,92 N ile aynı çıktığını gösteriyor.
- **D1 sahne 2** (altın taç): hangisinin daha çok su taşırdığı kaynakta yok; iki kap aynı düzeyde çizilir, fark "≠" ile gösterilir.
- **A senaryosu**: A2 çıkış sorusu 2'nin şıkları açık yazıldı ("2P", "P", "P / 2").
- **A3 dersi**: ilk çizimde dar tabana 2, geniş tabana 4 ok konmuştu (basınç eşit görünüyordu); ikisi de 4 ok oldu. Sahnenin sonunda beş kural tam görünür hâle geliyor. İkisi de görev tanımına kural olarak yazıldı.

Olduğu gibi bırakılan, bakılacak yerler:

- C3 sahne 6 (yükselen balon), sahne 7 (dağcı) ve C1 sahne 5 (kulak): "içerideki basınç dışarıdakinden büyük kalır" karşılaştırmasıyla kurulu; gaz yasası ya da kapalı kap hesabı yok.
- E1 sahne 7 (saç kurutma makinesi ve top): yalnızca topun akımın içinde kalması açıklanıyor (kitap dışı, karar 15). E2 sahne 4 (sprey) kitabın s. 192'deki anlatımını esas alıyor. E2 sahne 5'te yelken çizimi kitapta yok; ajan kurdu.
- B2 sahne 5, 9, 10'da yan yüzeyde basınç okları var; kuvvet hesabı yok. B4'te kaynak kartlarındaki terimler uydurma örnektir; gerçek kurum, kişi, sayı yok.
- D1'de yer çekimi ivmesi ayrı sahne (kitap sayıyor, program anmıyor; karar 4). D2 sahne 8'de model tek satırla sayıya dökülüyor (0,0001 · 1.000 · 9,8 = 0,98), öğrenci hesap yapmıyor.
- Uzun dersler: B2 11, D1–D3 onar, D4 12, E1 10 + Hatırla, C3 9 + Hatırla sahne. `sure.js` 15 dakikayı aşan ders gösterirse iki fikir taşıyıp taşımadığı okunur.

## Kullanıcıya açık notlar

- Taslağa göre değişenler (`PLAN.md` bölüm 7): 15 kısa dersin sayısı ve sırası aynı; her konuya bir konu tekrarı eklendi (20 dosya). D2'nin başlığı "yer değiştiren sıvının ağırlığı" oldu. C2'nin açılış sorusu (ters bardak) kitapta olmadığı için senaryoda değişecek (karar 9).
- Ders kitabı dört deneyin hiçbirinde ölçüm vermiyor, benzetimleri açılamayan karekodlara bırakıyor. Benzetim düzenekleri (basınçölçer, dinamometre, taşırma kabı) ve sayıları kitap dışıdır, "örnek veri" olarak modelden hesaplanır (karar 19; `PLAN.md` bölüm 8'in son paragrafı).
- Su cenderesi Pascal Yasası'yla, nitel anlatılacak; F₁/A₁ = F₂/A₂ yazılmayacak (karar 6). Birleşik kaplar, U borusu, su kulesi kitapta var, programda yok: alınmadı.
- Yüzme, askıda kalma, batma D4'te adıyla geçecek (kitapta var, program yalnızca gemi, denizaltı ve yüzen atığı sayıyor; karar 13). Kullanıcı 12 Ekim 2026'da onayladı.
- Kitaptaki "kanadın üstünden geçen hava daha uzun yol kat eder" gerekçesi alınmadı (karar 15); uçak tek cümleyle geçecek.
- İzometrik figür pilotlarına dokunulmadı; C2 ve D2 temanın düz vektör kitiyle yazılacak (karar 20). Kullanıcı 12 Ekim 2026'da onayladı ("önerine göre devam et"): pilot dosyaları olduğu gibi, siteden bağlantısız kalır.
- A1'in iki hikâyesi `ortak/katalog.js` içindeki satırda duruyor; `tema.js` dosyasına taşımak ortak dosyayı değiştirmeyi gerektirir, tema yayına alınırken yapılır (karar 21).

## Sıradaki

`YURUTME.md` 3. adım, 2a.5: B–E dersleri ve konu tekrarları (17 dosya), ders başına bir Sonnet ajanı, aynı anda en çok dört; her konuda ilk ders araç dosyasıyla önce yazılır; sekiz ajanda bir oturum sınırı. Görev tanımı `gorev/ders-gorevi.md` (A2 ve A3'ten çıkan kurallar eklendi). Örnek ders A1 (satır aralıkları görev tanımında); "Hatırla" ve iki kaydırıcılı sahne için ek örnek `dersler/a2-olc-kaydet-model.js` satır 95–126 (Hatırla) ve 357–391 (Dene); tekrar dersi örneği `dersler/a3-tekrar.js` (146 satır, tamamı okunur).

Önerilen sıra. Oturum 1: B1 (`b-araclar.js` açar), C1 (`c-araclar.js`), D1 (`d-araclar.js`), E1 (`e-araclar.js`) birlikte; bitince B2, B3, C2, D2. Oturum 2: B4, B5 tekrar, C3, C4 tekrar, D3, D4, E2, E3 tekrar. Oturum 3: D5 tekrar ve tema denetimi (2a.7).

| Ders | Dosya adı | Senaryo (`senaryolar/`) | Kılavuz | Dersin satırları |
|---|---|---|---|---|
| B1 | `b1-derine-dalmak` | `B-sivilarda-basinc.md` | 1–17 | 18–164 |
| B2 | `b2-durgun-sivi-basinci` | aynı | 1–17 | 165–381 |
| B3 | `b3-sivi-basinciyla-calisan-sistemler` | aynı | 1–17 | 382–516 |
| B4 | `b4-merak-et-sor-dogrula` | aynı | 1–17 | 517–692 |
| B5 | `b5-tekrar` | aynı | 1–17 | 693–720 |
| C1 | `c1-hava-da-bir-akiskandir` | `C-acik-hava-basinci.md` | 1–14 | 15–161 |
| C2 | `c2-torricelli` | aynı | 1–14 | 162–293 |
| C3 | `c3-atmosfer-basinci-degisir` | aynı | 1–14 | 294–464 |
| C4 | `c4-tekrar` | aynı | 1–14 | 465–491 |
| D1 | `d1-kaldirma-kuvveti-deneyi` | `D-kaldirma-kuvveti.md` | 1–27 | 28–222 |
| D2 | `d2-arsimet-ilkesi` | aynı | 1–27 | 223–393 |
| D3 | `d3-kaldirma-kuvveti-nereden-gelir` | aynı | 1–27 | 394–561 |
| D4 | `d4-gemi-denizalti-cop-adasi` | aynı | 1–27 | 562–792 |
| D5 | `d5-tekrar` | aynı | 1–27 | 793–822 |
| E1 | `e1-dar-yerde-hizli` | `E-bernoulli-ilkesi.md` | 1–31 | 32–247 |
| E2 | `e2-bernoulli-her-yerde` | aynı | 1–31 | 248–417 |
| E3 | `e3-tekrar` | aynı | 1–31 | 418–442 |

Başlıklar `PLAN.md` "Kısa ders listesi (kararlardan sonra)" tablosundadır (görev iletisine tam yazılır). Renkler: B `#3cc8e8`, C `#6ea8ff`, D `#3ddc97`, E `#c792ff`. `kicker`: 'Konu B · Sıvılarda basınç', 'Konu C · Açık hava basıncı', 'Konu D · Kaldırma kuvveti', 'Konu E · Bernoulli İlkesi'. `nextLesson` etiketi "Sonraki: <başlık> ›"; tekrar için "Sonraki: Konu tekrarı ›". Satır aralıkları senaryo düzeltilirse kayar: görev iletisini yazmadan önce `grep -n '^## ' senaryolar/<dosya>` ile doğrula.

Ders ajanlarına görev iletisinde ayrıca söylenecekler:

- Senaryolarda "sürükle", "sırala", "eşleştir" diye geçen etkileşimler kart başına seçimle kurulur (motor notu görev tanımında); E1 sahne 9'daki sıralama ve D1'deki üç kutu böyledir.
- D2'deki hipotez sorusunda doğru şık yoktur: `KIT.tahminAl` kullanılır, seçime göre geri bildirim verilir.
- Tablolu, formüllü ve kaynak kartlı sahneler 25 kelimeyi aşabilir; ajan aşan sahneyi raporda adıyla yazar. Uzun derslerde (B2, D1–D4, E1, C3) ölçüm birkaç dakika sürer.
- Senaryodaki "Not (ana oturum…)" satırları bağlayıcıdır (B2 sahne 8, D3 sahne 6, D1 sahne 2).
- Konunun ilk dersini yazan ajan araç dosyasını açar; senaryo raporlarındaki araç listeleri (boru düzeneği, dinamometre düzeneği, sıvı kabı ve sonda, cam boru ve cıva kabı) o ajana ipucu olarak verilir. C2 ve D2 düz vektörle çizilir; pilot dosyaları okunmaz.
- Her sayıyı ajan yeniden hesaplar; tutmayanı düzeltmez, raporlar.

**Ders kitabı dosyaları.** Geçici klasör: `/private/tmp/claude-501/-Users-emirkeles-matematik-sayilar/253eaf9c-728b-408b-8f85-63125e4b77db/scratchpad` (`kitap/fizik9.pdf`, `metin/tum.txt` kitabın tamamı, `dokum/B.md` … `E.md`, `png/A` … `png/E` sayfa görüntüleri, `venv` içinde pymupdf, `betik/dok.py`, `betik/png.py`). Basılı sayfa numarası PDF sayfa numarasıyla aynıdır. Klasör silinmişse yeniden kurulur: yeni scratchpad'de `python3 -m venv venv && venv/bin/pip install pymupdf`; PDF bağlantısı <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi> sayfasındaki `/assets/pdf/….pdf` (54 MB); `venv/bin/python -I plan/fizik/akiskanlar/gorev/dok.py kitap/fizik9.pdf 1 272 metin/tum.txt` metni, `gorev/png.py` sayfa görüntüsünü üretir (PDF kendi boş klasöründe durur, betikler ayrı klasörde). Dökümler yeniden üretilemezse senaryo ajanı kitabın satırlarını doğrudan okur (yukarıdaki aralıklar aynı kalır). Ders ajanları kitabı okumaz.

**Açık sorunlar:** yok. Bu oturumun dosyaları kullanıcı isteğiyle iki commit hâlinde `main`'e gönderildi (12 Ekim 2026: `696a097` ve A2, A3, senaryolar için ikinci commit). İlk commit'in dosyaları: `fizik/akiskanlar/` altında `index.html`, `tema.js`, `a1-basinc-neye-bagli.html`, `dersler/kit.js`, `dersler/a-araclar.js`, `dersler/a1-basinc-neye-bagli.js`; `plan/fizik/akiskanlar/` altında `PLAN.md`, `DURUM.md`, `senaryolar/A-basinc.md`, `gorev/`; ayrıca `TASKS.md`, `plan/fizik/TEMALAR.md`, `plan/YURUTME.md`, `plan/YOL-HARITASI.md`, `plan/is-panosu.html`. Tema katalogda kapalıdır, seslendirilmedi.
