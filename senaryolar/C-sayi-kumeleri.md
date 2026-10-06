# Bölüm C — Sayı kümeleri: kısa senaryolar (onaylandı, 5 Ekim 2026)

Biçim `plan/PLAN.md`'deki gibi: tek fikir, 3–5 sahne, 2 çıkış sorusu. Altyazılar en çok 12 kelime olacak; aşağıdakiler sahnenin ne yaptığını anlatır, ekranda görünecek metin değildir.

C1–C3 mevcut Ders 03'ün bölünmesidir, C4–C5 yenidir. Sahne numaraları dersin bugünkü 12 sahnelik hâline göredir (S1 matruşka … S12 büyük sınıflandırma); `senaryolar/03-sayi-kumeleri.md` hâlâ eski 14 sahnelik numaralarla duruyor.

Plandan iki yerde ayrılıyor (onaylandı; `plan/PLAN.md` bölüm 4'teki C tablosu henüz eski dağılımı gösteriyor):

- **S12 (büyük sınıflandırma)** planda C5'e yazılı. C3'ün sonuna aldım: dört kutunun hepsi C3'te tamamlanıyor, C5'in fikri ise ispat.
- **S11 (asiler ve R)** planda bütünüyle C3'te. İkiye böldüm: "R = Q ∪ Q′" C3'te kalıyor; "√2 · √2 = 2" karşı örneği C5'in açılışı oluyor.

Ders 03'ün S5'i (işlem özellikleri) plandaki gibi D bölümüne devrediliyor; burada yok.

---

## C1 — Her kutu bir ihtiyaçtan doğdu

**Kaynak:** 03 S1–S4, S6.

**Fikir:** Bir işlemin sonucu kutunun dışına düşüyorsa küme o işlemde kapalı değildir; her yeni sayı kümesi bu yüzden açıldı.

**Açılış sorusu:** Cüzdanında 3 lira var, 5 liralık bir şey aldın. 3 − 5'in cevabı mı yok, yoksa cevabın koyulacağı kutu mu?

**Ana görsel:** İç içe matruşka kutuları ve kapalılık testi: iki sayı, bir işlem; sonuç kutuda kalırsa yeşil, dışına düşerse kırmızı.

| Sahne | Ne olur |
|---|---|
| 1. Kutular | Matruşka açılır: N ⊂ Z ⊂ Q ⊂ R. R soluk kalır (C3'te dolacak). Tahmin: 3 − 5 kaç eder? (−2 / 2 / yapılamaz) |
| 2. N: saymak | N = {0, 1, 2, …}. Test: 2 + 7 yeşil, 4 × 6 yeşil, 3 − 5 kırmızı. −2 kutunun çizgisine çarpar, dışarı düşer. |
| 3. Z: borç | Sayı doğrusu sıfırın soluna uzar; −2'ye yer açılır. Aynı test Z'de yeşil. Sonra 3 ÷ 4: kırmızı. |
| 4. Q: paylaşmak | 3 çikolata, 4 kişi: 3/4. Q = { a/b : b ≠ 0 }. 5 ve −3 de kutuya girer: 5 = 5/1. 5/0 girmez: tanımsız. |
| 5. Sıra sende | Kapalılık tablosu (N, Z, Q × dört işlem). Görev: üç kırmızıyı bul (N'de −, N'de ÷, Z'de ÷). Bulunan karşı örnek hücreye yazılır. |

**Hedeflenen yanılgı:** "3 − 5 yapılamaz" (yapılır, sonuç N'de değil); tek yeşil örnekle "kapalı" demek (8 ÷ 2 = 4 ama 3 ÷ 4 ∉ Z); tam sayıyı rasyonel saymamak.
**Akılda kalıcı cümle:** "Yapılamayan işlem yeni kutu açar."
**Çıkış soruları:** Hangi işlem N'de kapalı değildir? (çıkarma: 3 − 5 = −2 ∉ N) · −3 rasyonel midir? (evet: −3 = −3/1)
**Hikâye:** Yok (dersteki borç ve paylaşma örnekleri yeterince somut).
**Çıkarılan / devredilen:** S2'deki sepet ve etkisiz eleman ile S3'teki ters eleman bağı → D4. S4'teki "iki kesrin arası" parçası → C4. S6'daki "neden hep yeşil?" kartları ve kilitli R satırı çıkar; "yeşil örnek yetmez" fikri C5'in konusu. S1'deki √2 tahmini çıkar (C3'ün açılışı).

---

## C2 — Ondalık açılımın adresi

**Kaynak:** 03 S7–S8.

**Fikir:** Kesri bölerken kalan 0 olursa ondalık biter, kalan tekrar ederse devreder; üçüncü bir yol yoktur.

**Açılış sorusu:** 1/4 = 0,25 bitiyor. 1/3 = 0,333… hiç bitmiyor. Bitmeyen bir sayı hâlâ kesir midir?

**Ana görsel:** Uzun bölme ve yanında kalan defteri: her adımın kalanı alt alta yazılır; aynı kalan ikinci kez gelince okla ilkine bağlanır.

| Sahne | Ne olur |
|---|---|
| 1. Biten | 1 ÷ 4: kalanlar 2, sonra 0. Kalan 0 olunca bölme durur: 0,25. |
| 2. Devreden | 1 ÷ 3: kalan 1, yine 1. Aynı kalan aynı adımı getirir: 0,333… = 0,3̅. |
| 3. Neden başka yol yok | 1 ÷ 7. Tahmin: sıfırdan farklı kaç ayrı kalan çıkabilir? (6) Kalanlar 3, 2, 6, 4, 5, 1; altı kutucuk dolar, yedinci adım tekrar etmek zorunda: 0,142857… |
| 4. Sıra sende | Dört kesir "biter / devreder" kutularına sürüklenir: 1/8, 5/6, 2/5, 4/9. Yanlışta bölmenin ilk üç adımı oynar. |

**Hedeflenen yanılgı:** "Sonsuza giden ondalık irrasyoneldir"; "uzun görünen ondalık irrasyoneldir".
**Akılda kalıcı cümle:** "Biten ya da devreden: rasyonel."
**Çıkış soruları:** 3/8 biter mi, devreder mi? (biter: 0,375; kalanlar 6, 4, 0) · 0,8333… için hangisi doğrudur? (devreder, rasyoneldir: 5/6)
**Hikâye:** Yok.
**Çıkarılan:** S7'deki 3/8 ve 7/20 örnekleri ile "payda yalnızca 2 ve 5 çarpanlıysa biter" ipucu; S8'deki 1/17 şeridi. İkisi de dersin fikrine ikinci bir kural ekliyordu.

---

## C3 — Sayı doğrusundaki delik

**Kaynak:** 03 S9, S10, S11'in bir kısmı, S12.

**Fikir:** √2 sayı doğrusunda gerçek bir uzunluktur ama hiçbir kesre eşit değildir; ondalık açılımı ne biter ne devreder.

**Açılış sorusu:** Kenarı 1 olan karenin köşegenini cetvelle ölçebilirsin. Peki bu uzunluğu kesir olarak yazabilir misin?

**Ana görsel:** Karenin köşegeni pergelle sayı doğrusuna indirilir; indiği noktada kesirlerin hiçbirinin oturmadığı boş bir halka kalır.

| Sahne | Ne olur |
|---|---|
| 1. Köşegen | 2×2'lik karenin içine dönmüş kare çizilir: alanı 2, kenarı köşegenimiz. d · d = 2, d = √2. Pergel doğruya iner; 7/5 ve 3/2 yakına düşer, üstüne oturmaz. |
| 2. Ne biter ne devreder | A8'deki sıkıştırma: 1,4² = 1,96 ve 1,5² = 2,25; yakınlaş: 1,41 ile 1,42. Rakam şeridi akar, devir halkası kapanmaz. Üstünde karşılaştırma: 1/7'nin halkalı şeridi. |
| 3. Delikler dolar | Boş halkalar dolar, doğru kesintisiz olur: R = Q ∪ Q′. Alanı 1, 2, 3, 4 olan dört kare: kenarlar 1, √2, √3, 2. Kök içi tam kareyse sonuç rasyonel. |
| 4. Sıra sende | Sekiz kart en küçük kutusuna sürüklenir: 0, −7, 12/4, 0,25, 0,3̅, √9, √2, π. Kılık değiştirenler: 12/4 = 3, √9 = 3. |
| 5. Hikâye | "A4 kâğıdının sırrı" videosu (hikâye planında 8 numara). |

**Hedeflenen yanılgı:** "Kök içindeki her sayı irrasyoneldir" (√9 = 3); "√2 = 1,414" (yaklaşık değer, eşit değil).
**Akılda kalıcı cümle:** "Ne biter ne devreder: irrasyonel."
**Çıkış soruları:** Hangisi irrasyoneldir: 0,2727…, √16, √7, 3/8? (√7) · √4, √5, √9, √(1/4) sayılarından kaçı rasyoneldir? (3)
**Hikâye:** Var; videosu en son üretilir (hikâye listesinde son sırada). Video gelene kadar ders 4 sahneyle yayınlanır.
**Çıkarılan / devredilen:** S10'daki beş kesirlik "kesir avcıları" oyunu ve "√2 = 1,414 doğru mu?" kartı (A8 aynı şeyi yaptı). S11'deki Q′ kapalılık denemeleri → C5. S11'deki "rasyonel + irrasyonel = irrasyonel" ve √1…√20 sayımı çıkar. S12 on karttan sekize iner (22/7 ve −8/2 çıkar); bonus kartlar çıkar.

---

## C4 — Sıralama ve arada olma

**Fikir:** Sayı doğrusunda soldaki küçüktür; iki farklı kesrin arasında her zaman başka bir kesir vardır.

**Açılış sorusu:** 3'ten sonraki tam sayı 4. Peki 0,5'ten sonraki sayı hangisi?

**Ana görsel:** Sonsuz yakınlaşma. 3 ile 4'ün arasına yakınlaşınca tam sayı çıkmaz; 0,5 ile 0,6'nın arasına her yakınlaşmada yeni bir sayı çıkar.

| Sahne | Ne olur |
|---|---|
| 1. Bir sonraki sayı | Tahmin: 0,6 / 0,51 / 0,501 / yok. Hangisi seçilirse seçilsin araya yakınlaşılır ve daha yakın biri bulunur: 0,5 ile 0,51 arasında 0,505. |
| 2. Sıraya diz | Dört kart doğruya yerleştirilir: −1/2, −1/3, 0,3, 1/3. Sola giden küçülür: −1/2 < −1/3 < 0,3 < 1/3. İki sayıdan biri hep solda kalır. |
| 3. Tam sayıda boş, kesirde dolu | 3 ile 4 arası: boş. 1/3 ile 1/2 arası: tam ortası 5/12. Sonra 1/3 ile 5/12 arası, yine ortası. Kaydırıcıyla yakınlaşma sürer, bitmez. |
| 4. Sıra sende | İki sayı verilir, arasına düşen kart seçilir: 1/4 ile 1/2 (3/8); 0,3 ile 0,31 (0,305); −1 ile −1/2 (−3/4). |
| 5. Hikâye | "Fotofiniş" videosu (hikâye planında 2 numara). |

**Hedeflenen yanılgı:** "0,5'ten sonraki sayı 0,6'dır"; negatiflerde sıralamayı ters çevirmek (−1/2 > −1/3 sanmak).
**Akılda kalıcı cümle:** "Kesirlerde 'bir sonraki sayı' yoktur."
**Çıkış soruları:** −3/4 ile −2/3'ten hangisi küçüktür? (−3/4: −9/12 < −8/12) · 1/5 ile 1/3 arasında hangisi vardır? (4/15)
**Hikâye:** Var.
**Not:** Ders "her denediğimizde bulduk" diye biter; "her zaman bulunur" iddiasını kanıtlamaz. Kanıt C5'in üçüncü sahnesidir.

---

## C5 — İspat mı, karşı örnek mi?

**Kaynak:** yeni + 03 S11'in karşı örnek kısmı.

**Fikir:** "Her" diye başlayan bir iddiayı örnekler kanıtlamaz, tek karşı örnek çürütür; kanıtlamak için bütün durumları birden kapsayan bir ispat gerekir.

**Açılış sorusu:** C4'te denediğimiz her iki kesrin arasında yeni bir kesir bulduk. Kaç denemeden sonra "her zaman bulunur" diyebiliriz: 10, 1000, yoksa hiçbiri mi?

**Ana görsel:** Mahkeme. İddia kürsüde durur; örnekler tanık sırasına birer yeşil işaret olarak dizilir, karar çıkmaz. Tek kırmızı karşı örnek iddiayı düşürür. İspat mühürdür.

| Sahne | Ne olur |
|---|---|
| 1. Tanıklar yetmez | İddia: "İki irrasyonelin çarpımı irrasyoneldir." Tanıklar: √2 · √3 = √6, √2 · √5 = √10. Tahmin: iddia doğru mu? Sonra √2 · √2 = 2: tek karşı örnek, iddia düşer. |
| 2. Sıra sende | Üç iddia kartına karşı örnek sürüklenir: "N çıkarmada kapalıdır" (3 − 5), "Her karekök irrasyoneldir" (√9), "İki irrasyonelin toplamı irrasyoneldir" (√2 + (−√2) = 0). |
| 3. İspat | İddia: "İki rasyonelin arasında hep bir rasyonel vardır." Karşı örnek aranır, çıkmaz; bu da kanıt değildir. Verilen: a < b, ikisi rasyonel. Aday: (a + b)/2. Rasyonel mi: Q toplamada ve bölmede kapalı (C1). Arada mı: a + a < a + b < b + b. Kaydırıcıyla a ve b oynar, orta nokta hep arada kalır. |
| 4. Hikâye | "Siyah kuğu" videosu (hikâye planında 4 numara). |

**Hedeflenen yanılgı:** "Çok örnekte doğru çıktıysa kanıtlanmıştır"; "karşı örnek bulamadım, demek ki doğrudur".
**Akılda kalıcı cümle:** "Bin örnek kanıtlamaz, tek karşı örnek çürütür."
**Çıkış soruları:** "İki irrasyonelin toplamı hep irrasyoneldir" iddiasını hangisi çürütür? (√2 + (−√2) = 0) · a < b iki rasyonel sayıysa (a + b)/2 için hangisi her zaman doğrudur? (rasyoneldir ve a ile b'nin arasındadır)
**Hikâye:** Var.
**Not:** Programın terimleri tahtada iki etiket olarak geçer: "verilen (hipotez)" ve "gösterilecek (hüküm)". ∀ ve ∃ sembolleri kullanılmaz; onlar D1'in konusu.

---

## Mevcut 5 soruluk sınav nereye gitti

| Eski soru | Yeni yeri |
|---|---|
| 1 Kapalılık | C1 çıkış sorusu (sadeleşmiş) |
| 2 Hangisi irrasyonel | C3 çıkış sorusu (22/7 şıkkı 3/8 oldu) |
| 3 Biten / devreden | C2 çıkış sorusu |
| 4 Kök içi | C3 çıkış sorusu |
| 5 Ters eleman | D4'e devredilir |

## Kararlar (5 Ekim 2026)

1. **S11 ve S12'nin yeri.** Sınıflandırma oyunu (S12) C3'ün sonunda; S11'deki Q′ karşı örnekleri C5'in açılışında. Plandaki "C3: S9–11" ve "C5: + S12" dağılımı geçersiz.
2. **Çıkarılanlar.** Her dersin "Çıkarılan" satırındaki her şey gidiyor: C1'de "neden hep yeşil?" kartları; C2'de "payda 2 ve 5" ipucu ve 1/17 şeridi; C3'te "rasyonel + irrasyonel = irrasyonel", √1…√20 sayımı, kesir avcıları oyunu ve 22/7 kartı.
3. **Hikâye kapanış cümlesi.** Defterde her zaman dersin cümlesi durur. Video kapanış kartı:

   | Ders | Kapanış kartı |
   |---|---|
   | C3 | "Ne biter ne devreder: irrasyonel." (dersin cümlesi) |
   | C4 | "Kesirlerde 'bir sonraki sayı' yoktur." (dersin cümlesi) |
   | C5 | "Bin beyaz kuğu kanıtlamaz, tek siyah kuğu çürütür." (hikâyenin kendi imgesi; tek istisna) |

   `plan/HIKAYE-ANIMASYONLARI.md` bölüm 4'teki C3 ve C4 kapanış cümleleri buna göre güncellenecek.
4. **C3'te A4 hikâyesi.** Senaryoda kalıyor; videosu en son üretilir.
5. **C1 tek ders.** Beş sahneyle yazılır. `node araclar/olc.js` ölçümünde 6 dakikayı aşarsa 5. sahne (kapalılık tablosu) ayrı bir kısa derse bölünür ve bölüm 6 derse çıkar.
