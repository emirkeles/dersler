# Plan — 9. Sınıf · 1. Tema: Sayılar

Dayanak: `ANALIZ.md`. Hedef: lise öğrencisinin dizüstü bilgisayarda, sıkılmadan, 5 dakikalık parçalarla izleyip hatırlayacağı bir dizi.

## Kararlar (5 Ekim 2026)

1. **Birincil cihaz dizüstü.** Tasarım 1366×768 dizüstünün tarayıcı penceresine (≈1366×657) göre yapılır; telefon yalnızca "bozulmasın" düzeyinde desteklenir.
2. **Kafa karıştıran hiçbir şey olmayacak.** Program dışı, "merak" türü yan konular derslere girmez. Ders 03'ten 0,999… = 1 ve π/22⁄7 sahneleri ile özetteki x² = −1 notu çıkarıldı.
3. **Ses ElevenLabs ile, gereken yerde.** Yalnızca tahtada bir şey olurken okunan açıklama altyazıları seslendirilir; yönergeler, sorular, geri bildirimler ve sınav seslendirilmez. Üretim en önemli dersten başlar, sonuca göre sürer.
4. **Arayüz "yapay zekâ işi" görünmeyecek.** Degrade, parlama, titreşen düğme, emoji, etiket hapı yok; tahta dışında her şey düz ve sessiz.
5. **Ses en sona.** Ses ve model beğenildi (Gamze Özdemir, `eleven_v4`). Önce tüm içerik işi biter, seslendirme en son tek seferde yapılır.
6. **Hikâye animasyonları.** Kritik fikirleri hayattan bir hikâyeyle anlatan, etkileşimsiz, 2D çizim tarzında kısa videolar eklenecek. Ayrı plan: `HIKAYE-ANIMASYONLARI.md`.
7. **A bölümü kapandı (5 Ekim 2026).** A5–A8 izlendi ve uygun bulundu. A1–A4 bugünkü hâliyle kalır; yazı bütçesi aşımı kabul edildi, yeni kısaltma turu yapılmaz. Bütçe B–D bölümlerinde yazılacak ve bölünecek dersler için bağlayıcıdır.
8. **Müfredat bağlayıcıdır (6 Ekim 2026).** Programın istemediği konu derse girmez, istediği konu eksik kalmaz. Program metni `MUFREDAT.md` dosyasında; her bölümün senaryosu ve dersleri ona göre denetlenir. Bölüm B bu denetimden geçti (dosyanın sonundaki tablo).
9. **Bölüm D sekiz ders (6 Ekim 2026).** Önerme dili üç derse bölündü; bölme, değişme ve birleşme sahnelerinden çıkarıldı (program yalnızca toplama, çıkarma ve çarpmayı sayıyor). Ayrıntı ve öteki kararlar: `senaryolar/D-islem-ozellikleri-ve-cebir.md`.

## Çalışma sırası (güncel)

Bölüm bölüm ilerlenir: bir bölümün mevcut dersleri düzenlenir, eksik dersleri eklenir, bölüm bitmeden sonrakine geçilmez. Böylece her bölüm bittiğinde öğrenciyle denenebilir.

| Sıra | Bölüm | Düzenlenecek (mevcut içerik) | Eklenecek (yeni) |
|---|---|---|---|
| 1 | **A — Üslü ve köklü** · **kapandı** | A1–A4: bölündü, yayında (Ders 01 dörde bölündü, altyazı ve defter kısaldı, her derse 2 çıkış sorusu). Yazı bütçesini aşıyor; bu hâliyle kabul edildi (karar 7) | A5 Rasyonel üs ve n. kök · A6 Eşlenik · A7 Bilimsel gösterim · A8 Yaklaşık değer: yazıldı, izlendi, onaylandı |
| 2 | **B — Aralıklar ve kümeler** · **yazıldı, izlemeniz bekleniyor** | B2–B5: Ders 02 dörde bölündü; altyazılar ve defter kısaldı, her derse 2 çıkış sorusu. Altyazı bütçesi tutuyor, tahtadaki 25 kelime sınırı eski sahnelerde yer yer aşılıyor (bölüm 6) | B1 Küme dili · B6 Fark ve tümleme · B7 Mutlak değerle aralık: yazıldı (senaryolar 5 Ekim 2026'da onaylandı: `senaryolar/B-araliklar-ve-kumeler.md`); ölçümde bütçe aşımı, taşma ve konsol hatası yok |
| 3 | **C — Sayı kümeleri** · **senaryolar onaylandı** (`senaryolar/C-sayi-kumeleri.md`) | C1–C3: Ders 03 üçe bölünür; işlem özellikleri sahnesi D'ye devredilir | C4 Sıralama ve arada olma · C5 İspat mı, karşı örnek mi? |
| 4 | **D — İşlem özellikleri ve cebir** · **yazıldı, izlemeniz bekleniyor** (`senaryolar/D-islem-ozellikleri-ve-cebir.md`) | D4–D6: Ders 04 üçe bölündü; altyazılar kısaldı, kaydırıcılı keşif bölümleri ve bölme çıktı; yutan eleman ve "hangi kutuda var" sahneleri eklendi | D1 Önerme · D2 Ve, veya, ya da · D3 İse, ancak ve ancak · D7 Özdeşlikler · D8 Çarpanlara ayırma ve sıfır çarpım: yazıldı; ölçümde bütçe aşımı (altyazı), taşma ve konsol hatası yok |
| 5 | **Akılda kalıcılık** | Ders başı hatırlama sorusu, bölüm sonu tekrar, tema finali, kopya kâğıdı | — |
| 6 | **Ses ve hikâyeler** | Tüm derslerin seslendirilmesi | Hikâye animasyonları (pilot A bölümünden sonra; ayrıntı `HIKAYE-ANIMASYONLARI.md`) |

Her mikro ders aynı dört adımdan geçer:

1. **Kısa senaryo** (yarım sayfa): kanca, ana görsel, 3–5 sahne, hedeflenen yanılgı, akılda kalıcı cümle, 2 çıkış sorusu. Yeni derslerde yazmadan önce onaya sunulur.
2. **Ders:** yazı bütçesine uygun yazılır (mevcut derslerde: bölünür ve kısaltılır).
3. **Denetim:** `node araclar/olc.js <no>` ve ekran görüntüleri; taşma, üst üste yazı, bütçe aşımı kalmaz.
4. **İzleme:** dersi izlersiniz, düzeltmeler yapılır.

Mevcut dersleri düzenlerken her sahnede yapılacaklar: altyazı ≤ 12 kelime · tahtada aynı anda ≤ ~25 kelime (yoğun sahneler adım adım açılır ya da ikiye bölünür) · defter kuralı = formül + tek örnek · 5 soruluk sınav yerine her mikro dersin sonunda 2 soruluk çıkış bileti · program dışı ayrıntı çıkarılır.

## 1. Format kararı: mikro ders

Bir ders = **bir fikir, 4–6 dakika, 3–5 sahne, 2 soruluk çıkış bileti.** Bugünkü 13 sahnelik dersler bölünür; tema dört bölüm, 28 mikro ders olur (14'ü mevcut içerikten, 14'ü yeni).

Her mikro dersin iskeleti aynı kalır, öğrenci ritmi öğrenir:

1. **Kanca** (≤ 15 sn): tek soru, tek görsel. Yazı yok ya da tek satır.
2. **Tahmin et:** öğrenci önce tahmin eder (mevcut `c.choice`, iyi çalışıyor).
3. **Gör:** animasyon cevabı gösterir. Bu sırada altyazı en fazla bir satır.
4. **Adlandır:** kural tek cümle + tek formül olarak ekrana büyük gelir, deftere düşer.
5. **Dene:** bir kaydırıcı ya da sürükle-bırak.
6. **Çıkış bileti:** 2 soru. Bir sonraki dersin başında öncekinden 1 hatırlama sorusu (aralıklı tekrar).

## 2. Yazı bütçesi (her sahne için bağlayıcı)

| Öğe | Şimdi | Hedef |
|---|---|---|
| Altyazı uzunluğu | ort. 12–18, en çok 33 kelime | **en çok 12 kelime, tek cümle** |
| Altyazı hızı | ≈19 kr/sn hesap | **≈12 kr/sn** (karakter başına 80 ms, en az 1,8 sn) |
| Animasyon oynarken altyazı | çoğu zaman eşzamanlı | **önce hareket, sonra cümle**; uzun cümle hareket durunca |
| Sahnede aynı anda yazı | 60–131 kelime | **en çok ~25 kelime / 12 öğe**; biten adım soluklaşır |
| Defterim kartı | ort. 25–45 kelime, hep açık | **formül + 1 örnek, en çok 12 kelime**; varsayılan kapalı çekmece |
| Giriş ekranı | 75–110 kelime | **kanca cümlesi + düğme**; kazanımlar "öğretmen için" katlanır |
| Sınav geri bildirimi | 2 paragrafa kadar | **en çok 2 cümle** + "sahneyi tekrar izle" bağlantısı |
| Ders süresi | 8–15 dk (alt sınır) | **4–6 dk** |

Yazım kuralları: rakam ve sembol cümleden iyidir (`üs −1 → değer ÷2` gibi); bir altyazıda tek yeni fikir; aynı bilgi iki kanalda tekrar edilmez (sahnede yazıyorsa altyazıda yazmaz). Sesli anlatım açıkken altyazı yalnızca anahtar ifadeyi gösterir.

## 3. Yol haritası

### Faz 0 — Motor: tek ekran (tamamlandı, 5 Ekim 2026)

İçeriğe dokunmadan dört dersi birden düzeltti. Dosyalar: `ortak/ders.js`, `ortak/ders.css`, `index.html`, ders HTML'leri.

- **Tek ekran:** dizüstünde sayfa kaymıyor. Solda tahta ve altında 3 satırlık altyazı, sağda yan sütun. 1366×657'de tahta 820×461 px (eskiden soru panelleri ekranın altında kalıyordu).
- **Sıra sende tahtanın yanında:** sorular ve kaydırıcılar yan sütunda açılıyor; öğrenci cevap verirken tahtayı görmeye devam ediyor.
- **Defter:** yalnızca son kural görünüyor, "Tümü" ile açılıyor, soru varken gizleniyor, tarayıcıda saklanıyor. Sayfayı kendi kendine kaydırma hatası giderildi.
- **Altyazı hızı:** 52 → 75 ms/karakter; elle verilen süreler de 60 ms/karakterin altına inemiyor.
- **Görsel dil:** nötr koyu zemin, tek renkli yüzey tahta; IBM Plex Sans (çizgisiz sıfır, ∅ ile karışmaz); degrade, parlama, titreşim, emoji kaldırıldı. Ana sayfa sade bir ders listesi.
- **Kayıtlı ses altyapısı:** klibi olan derste ses varsayılan açık; altyazı klibin bitmesini bekliyor; duraklat, hız ve sahne değişimiyle uyumlu. Tarayıcının robot sesi kaldırıldı.
- **Araçlar repoda:** `araclar/olc.js` (yerleşim + yazı bütçesi denetimi), `araclar/ses-uret.js` (ElevenLabs).
- **Hata düzeltmesi:** Ders 04'ün kimliği ana sayfadakiyle uyuşmuyordu, ilerleme görünmüyordu; düzeltildi.

Doğrulama: dört ders 1366×657'de baştan sona oynatıldı; sayfa kayması 0, sığmayan altyazı 0, yana taşan panel 0, konsol hatası 0, tamamlanamayan sahne 0. Sürükle-bırak oyunları gerçek fareyle ve gerçek Windows dizüstünde henüz denenmedi.

Telefonda: tahta, altyazı ve soru artık tek ekranda; ama tahtadaki yazılar hâlâ küçük. Karar gereği öncelik değil.

### Faz 1 — Mevcut dört dersi böl ve yazı diyetine sok

- Her ders aşağıdaki tabloya göre 3–4 mikro derse ayrılır; `index.html` dört bölüm ve altında kısa dersler gösterir.
- Tüm altyazılar bütçeye göre yeniden yazılır (≈5200 kelime → hedef ≈2500). Bugün derse göre altyazıların %40–83'ü 12 kelimeyi aşıyor; altyazı anlarının %50–80'inde tahtada 25'ten fazla kelime var (`node araclar/olc.js 01`).
- Yoğun sahneler adım adım açılır: Ders 01 S6 merdiveninde yalnızca etkin satır parlak, kutular sırayla gelir; Ders 01 S9, Ders 03 S5, Ders 04 S12 ikiye bölünür.
- Ders 03 S5 (işlem özellikleri) çıkarılır, D bölümüne bağlantı verilir.

### Faz 2 — Eksik konular (14 yeni mikro ders + 2 sahne)

Aşağıdaki tabloda **YENİ** işaretliler. Her biri için önce `senaryolar/` altında kısa senaryo (bütçeye uygun), sonra ders dosyası.

### Faz 3 — Akılda kalıcılık katmanı

- Ders başı 1 soruluk "dünden ne kaldı?" (önceki dersten).
- Bölüm sonu karışık tekrar oyunu; tema sonu 10 soruluk final.
- Her ders bir **akılda kalıcı cümle** ile biter (aşağıdaki tabloda), Defterim'de en üstte durur.
- Defterim'i tek sayfa "kopya kâğıdı" olarak yazdırma/indirme.

## 4. Yeni ders dizisi

`•` mevcut içerikten, **YENİ** eksik konu.

### Bölüm A — Üslü ve köklü gösterimler (MAT.9.1.1) · hikâye: viral video

| # | Ders | Kaynak | Ana görsel | Akılda kalıcı cümle |
|---|---|---|---|---|
| A1 | Üs bir sayaçtır | • 01 S1–5 | Yayılan ağaç, çarpan sayacı | "Üs, kaç tane çarpan olduğunu sayar." |
| A2 | Geri sar: a⁰ ve a⁻ⁿ | • 01 S6–7 | Merdiven: üs −1 → değer ÷2 | "Eksi üs negatif yapmaz, ters çevirir." |
| A3 | Kök = yarım üs | • 01 S8–9 | Yolun tam ortası | "Kök, sayacı ikiye böler." |
| A4 | Köklerle işlem | • 01 S10–13 | Çiftler dışarı; elma + armut | "Kök çarpmaya dağılır, toplamaya dağılmaz." |
| A5 | **YENİ** Rasyonel üs ve n. kök | — | Yolu n eşit adıma böl, m adım yürü: 8^(2/3) | "Payda kökü, pay kuvveti söyler." |
| A6 | **YENİ** Eşlenik | — | Alan modeli: (√3 − 1)(√3 + 1) = 3 − 1 | "Eşlenik, kökü yok eden ikizdir." |
| A7 | **YENİ** Bilimsel gösterim | — | Rakamlar durur, virgül kayar; her kayışta 10'un üssündeki sayaç değişir | "Virgül kayar, üs sayar." |
| A8 | **YENİ** Yaklaşık değer | — | Sayı doğrusunda sıkıştırma: 31² = 961, 32² = 1024; √1000 ≈ 31,6 | "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz." |

### Bölüm B — Aralıklar ve kümeler (MAT.9.1.2) · hikâye: lunapark

| # | Ders | Kaynak | Ana görsel | Akılda kalıcı cümle |
|---|---|---|---|---|
| B1 | **YENİ** Küme dili | — | Sayı kümeleri: A = {1, 3, 5, 7, 9}, 3 ∈ A, s(A); liste ve ortak özellik (3'ün katları, çift tam sayılar); alt küme, ∅, E. Çalma listesi yalnızca açılış sorusu | "Küme bir listedir; ya sayarsın ya kuralını söylersin." |
| B2 | Dolu nokta, boş nokta | • 02 S1–4 | Kapıdaki boy çubuğu | "Eşitlik varsa nokta dolu." |
| B3 | Parantez dili ve sonsuz | • 02 S5–7 | Dört kapı | "Köşeli dahil, yuvarlak hariç; sonsuz hep yuvarlak." |
| B4 | Dört dil, tek küme | • 02 S8 | Dörtlü çevirici | "Eşitsizlik, aralık, doğru, küme: aynı şey." |
| B5 | Kesişim ve birleşim | • 02 S9–11 + yeni açılış: listelenmiş sayı kümelerinde ∩ ve ∪ (S12 tamir atölyesi bölüm sonu tekrarına ayrıldı; iki ucu aynı aralıklar ve geçersiz yazımlar program dışı olduğu için çıkarıldı) | Üst üste binen şeritler | "∩ ve, ∪ veya." |
| B6 | **YENİ** Fark ve tümleme | — | Önce listelenmiş sayı kümelerinde (E = {1, …, 8}); sonra "A'ya binen ama B'ye binemeyen"; tümleyende renk ve uç noktalar tersine döner | "Tümleyende dolu boşalır, boş dolar." |
| B7 | **YENİ** Mutlak değerle aralık | — | Boy tahmini standı: tahmin 165, pay 3; şerit merkezden iki yana açılır. Kombi (22 °C ± 1) hikâye videosunda | "Mutlak değer, hedefe uzaklıktır." (deftere: \|x − a\| < r ⇔ a − r < x < a + r) |

### Bölüm C — Sayı kümeleri (MAT.9.1.3) · hikâye: matruşkalar

| # | Ders | Kaynak | Ana görsel | Akılda kalıcı cümle |
|---|---|---|---|---|
| C1 | Her kutu bir ihtiyaçtan doğdu | • 03 S1–4, S6 | Matruşka + kapalılık testi | "Yapılamayan işlem yeni kutu açar." |
| C2 | Ondalık açılımın adresi | • 03 S7–8 | Kalan defteri | "Biten ya da devreden: rasyonel." |
| C3 | Sayı doğrusundaki delik | • 03 S9, S10, S11'in bir kısmı, S12 | Karenin köşegeni | "Ne biter ne devreder: irrasyonel." |
| C4 | **YENİ** Sıralama ve arada olma | — | Sonsuz zoom: iki tam sayının arası boş, iki kesrin arası hep dolu | "Kesirlerde 'bir sonraki sayı' yoktur." |
| C5 | **YENİ** İspat mı, karşı örnek mi? | — (+ 03 S11'in karşı örnekleri) | Mahkeme: örnek tanıktır, ispat kesin delil; iki rasyonelin ortalaması | "Bin örnek kanıtlamaz, tek karşı örnek çürütür." |

### Bölüm D — İşlem özellikleri ve cebir (MAT.9.1.4) · hikâye: hesap makinesiz kasiyer

| # | Ders | Kaynak | Ana görsel | Akılda kalıcı cümle |
|---|---|---|---|---|
| D1 | **YENİ** Önerme: doğru ya da yanlış | — | İddia kartları, D / Y damgası; değil, ∀, ∃ | "'Her' için hepsi, 'bazı' için biri yeter." |
| D2 | **YENİ** Ve, veya, ya da | — | 1–12 sayıları, iki çerçeve (çiftler, 3'ün katları); ∧ ∨ ⊻ | "Ve ikisini ister, veya en az birini, ya da yalnızca birini." |
| D3 | **YENİ** İse, ancak ve ancak | — | Sayı doğrusunda iç içe iki şerit; tek başlı ve çift başlı ok | "İse tek yön, ancak ve ancak çift yön." |
| D4 | Değişme ve birleşme | • 04 S3–6 (bölme yarıları çıkar) | Yer değiştiren bloklar, kayan parantez | "Toplama ve çarpmada var, çıkarmada yok." |
| D5 | Dağılma | • 04 S1, S2, S7, S8, S11 | Alan modeli: 7 × (100 − 2) | "Dışarıdaki, içerideki herkesle çarpılır." |
| D6 | Birim, ters, yutan | • 04 S10 + **YENİ sahneler: yutan eleman, hangi kutuda var** | Geri alma düğmesi | "0 toplamada etkisiz, çarpmada yutan." |
| D7 | **YENİ** Özdeşlikler | — (+ 04 S9, S12'nin düzeneği) | Kareyi dört parçaya böl (unutulan iki dikdörtgen: 2ab); köşeden kare kes, döndür: a² − b² | "(a + b)² dört parçadır, iki değil." |
| D8 | **YENİ** Çarpanlara ayırma ve sıfır çarpım | — | Dağılmayı geri sar; alanı 0 olan dikdörtgenin bir kenarı 0; 51 · 49 ve 99² | "Çarpım 0 ise çarpanlardan en az biri 0'dır." |

Önerilen yapım sırası (Faz 2): B1 → B6 → B7 → A5 → A6 → A7 → A8 → C4 → C5 → D1 → D2 → D3 → D7 → D8. A6 (eşlenik), D7'deki iki kare farkını kullandığı için D7'de geri bağlantı verilir.

## 5. Ses (ElevenLabs)

- **Sıra önemli:** önce metin kısaltılır, sonra seslendirilir. Klip, metnin özetiyle eşleşir; metin değişince klip boşa gider. Bu yüzden dört dersin bugünkü hâlini topluca seslendirmek israf olur.
- **Bugünkü hacim:** dört derste yaklaşık 285 anlatım satırı, 29–30 bin karakter. Yazı diyetinden sonra bunun kabaca yarısı beklenir.
- **Üretim sırası:** en sonda, tüm içerik bittikten sonra, bütün dersler tek seferde.
- **Kurulum:** kökte `.env` dosyasına yalnızca `ELEVENLABS_API_KEY`. Ses ve model `araclar/ses-uret.js` içinde kayıtlı. Seçilen ses Gamze Özdemir (ana dili Türkçe; yabancı ses Will "pay/payda"yı yanlış okudu), model `eleven_v4`. Anahtar yalnızca seslendirme izinli olduğundan `--sesler` çalışmaz; adaylar `ses/ornekler/dinle.html` sayfasında.
- **Oyunculuk:** `eleven_v4` köşeli parantezli yönergeleri destekler. Derslerde yalnızca `[curious]` (soru) ve `[excited]` (sonuç) seyrek olarak, `speak:` metninde kullanılır; gülme ve ses efekti yok.
- **Durum:** Deneme olarak Ders 01 sahne 1–5 seslendirildi (18 klip, 190 sn). Bu sahnelerin metni yeniden değişirse klipleri sonda yenilenir.
- **Komutlar:** `node araclar/ses-uret.js a1 --liste` (ne kadar karakter), `node araclar/ses-uret.js a1` (üret).

## 6. Açık konular

0. **D1–D8 izlenecek.** Sekiz ders yazıldı (`d1-…html` – `d8-…html`). Altyazıların tamamı 12 kelimenin altında; tahtadaki 25 kelime sınırı altyazı anlarının yaklaşık yarısında aşılıyor (ifade panelleri; ölçücü matematik simgelerini de kelime sayıyor). D5'in ilk sahnesinde açılış animasyonu sırasında etiketler kısa süre üst üste biniyor. Kaydırıcılar ve seçimler yalnızca otomatik oynatmayla sınandı. D7'nin hikâye videosu (tepsi) yok. Eski `04-…html` sayfası kaldırıldı.
0. **B1–B7 izlenecek.** Yedi ders yazıldı (`b1-…html` – `b7-…html`); izleme ve düzeltme turu sizde. B2, B3 ve B5'te tahtadaki 25 kelime sınırı altyazı anlarının 7–13'ünde aşılıyor (eski sahnelerin çizimi; ölçücü matematik simgelerini de kelime sayıyor). Sürükle-bırak ve dokunma etkileşimleri yalnızca otomatik oynatmayla sınandı.
1. Windows dizüstünde (Chrome/Edge) bir tur gözle kontrol; sürükle-bırak oyunlarının gerçek fareyle denenmesi.
2. **Kapandı (7 Ekim 2026):** site Ders → Tema → Konu → Kısa ders yapısına geçti. Dersler `matematik/sayilar/` altına taşındı, ana sayfa ve tema sayfası `ortak/katalog.js` üzerinden çiziliyor, "Hikâyeler" tema sayfasında. Bu dosyadaki "bölüm" sözcüğü sitede "konu" olarak geçer. Öteki temaların planı: `../TEMALAR.md`.
3. Eski Ders 02'nin tamir atölyesi sahnesi (`dersler/02-…js`, `SC[13]`) hiçbir derste oynamıyor; bölüm sonu tekrar oyunu (Faz 3) için bekliyor.

Kapananlar (5 Ekim 2026): A5–A8 izlendi ve onaylandı. A1–A4'ün bütçe aşımı kabul edildi; son ölçüm (`node araclar/olc.js <no>`, 1366×657) kayıt için:

| Ders | Altyazı > 12 kelime | Tahtada > 25 kelime | Üst üste yazı | Defter (kelime / kural) |
|---|---|---|---|---|
| A1 | 7 / 22 | 12 / 22 | 1 | 79 / 5 |
| A2 | 2 / 9 | 7 / 9 | 2 | 40 / 2 |
| A3 | 3 / 9 | 9 / 9 | 0 | 33 / 2 |
| A4 | 7 / 23 | 16 / 23 | 3 | 68 / 4 |
