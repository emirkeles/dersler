# Bölüm D — İşlem özellikleri ve cebir: kısa senaryolar (onaylandı, 6 Ekim 2026)

Biçim `plan/PLAN.md`'deki gibi: tek fikir, 3–5 sahne, 2 çıkış sorusu. Altyazılar en çok 12 kelime olacak; aşağıdakiler sahnenin ne yaptığını anlatır, ekranda görünecek metin değildir.

Bölümün hikâyesi hesap makinesiz kasiyer. Dayanak `plan/MUFREDAT.md`, MAT.9.1.4. D4–D6 mevcut Ders 04'ün bölünmesidir, D1–D3 ve D7–D8 yenidir. Sahne numaraları (S1–S12) `senaryolar/04-islem-ozellikleri-cebirsel.md` ve `dersler/04-islem-ozellikleri-cebirsel.js` ile aynıdır.

## Kararlar (onaylandı, 6 Ekim 2026)

İlk plandaki D tablosundan beş yerde ayrılır. Hepsinin gerekçesi program metni ya da yazı bütçesi.

1. **Önerme dili üç derse bölünür; bölüm 6 değil 8 ders olur.** İlk planda tek ders (D1) vardı. Program bu derse önerme, değil, iki niceleyici ve beş bağlaç yüklüyor: sekiz yeni kavram, yedi yeni simge. Tek fikir kuralına sığmaz. Öneri: D1 önerme, değil, her, bazı · D2 ve, veya, ya da · D3 ise, ancak ve ancak. Sonraki dersler birer kayar (eski D2 → D4 … eski D6 → D8). Tema 26 yerine 28 ders olur.
2. **Bölme, değişme ve birleşme sahnelerinden çıkar.** Program özellikleri "toplama, çıkarma ve çarpma" için sayıyor; bölmeyi saymıyor. S4 ve S6'nın bölme yarıları ile S12'deki a ÷ (b + c) iddiası gider. Dersin cümlesi "Toplama ve çarpmada var, çıkarmada yok." olur. Bölme yalnızca D6'da tek satır kalır: bölme, tersiyle çarpmaktır.
3. **S9, S11 ve S12'nin yeri.** S9 ((a + b)(c + d), dört parça) dağılmadan özdeşliklere taşınır, çünkü (a + b)² onun özel hâli. S11 (hile ustası) planda etkisiz ve ters elemanla aynı derste; kullandığı araçlar değişme, birleşme ve dağılma olduğu için dağılma dersinin "sıra sende" sahnesi olur. S12'nin "sayı koy, dene" düzeneği özdeşlikler dersinde "özdeşlik nedir" sahnesine dönüşür.
4. **Semboller ve terimler.** Değil için p′, "ya da" için ⊻ (program bu ikisinin simgesini vermiyor; ders kitabı farklıysa çevrilir). Program "birim eleman" diyor, mevcut ders "etkisiz eleman"; defterde "birim (etkisiz) eleman" yazılır, anlatımda "etkisiz" kalır.
5. **Hikâye.** Yalnızca D7'de var (tepsi, hikâye planında 6 numara). Kapanış kartına dersin cümlesi yazılır: "(a + b)² dört parçadır, iki değil." Hikâye planındaki "Kenar iki katına çıkınca alan dört katına çıkar." cümlesi anlatımda geçer. D1–D3'te hikâye yok: "ve / veya" farkını B5'in alışveriş filtresi zaten taşıyor.

**Yazım sırasında senaryodan sapmalar (6 Ekim 2026).** Aşağıdaki senaryolarda eski hâli duruyorsa geçerli olan budur:

- **D1 sahne 2:** değil sorusu "5 > 3" yerine "3 > 3" ile soruluyor (yanlış bir önerme; değili doğru olmalı: 3 ≤ 3). "5 > 3"te iki şık da yanlış çıkıyor, ayırt etmiyordu.
- **D1 sahne 5, D2 sahne 5, D3 sahne 4, D8 sahne 4:** sürükle-bırak yerine tek kartlık soru tahtası; kartlar sırayla gelir, cevap tahtanın yanında seçilir.
- **D2:** çerçeve yerine her sayının üstünde p, altında q işareti var (çiftler ve 3'ün katları ardışık değil, çerçeveye sığmıyor). Sahne 4'te iki önerme izleniyor ("ve" ile orta aralık, "veya" ile iki parça); "ya da" ışığı yok.
- **D5 beş sahne:** kasiyer açılışı (S1) ve alan modeli (S2) ayrı sahneler.
- **D6:** "geri alma düğmesi" çizilmedi; eski sahnenin sayı doğrusu ve çeyrek çubukları kullanıldı. Sahne 1'de hesap makinesi sorusu var.
- **D7:** hikâye videosu gelene kadar 4 sahne.

Derslere bilerek almadıklarım (programda yok; karar 2, "kafa karıştıran hiçbir şey olmayacak"): doğruluk tabloları, p ⇒ q ≡ p′ ∨ q, karşıt ve karşıt ters, De Morgan kuralının genel yazımı, totoloji ve çelişki, "açık önerme" terimi, hipotezi yanlış olan "ise" önermeleri, çıkarmanın birim elemanı, x² + bx + c türü üç terimlileri çarpanlara ayırma, gruplandırma, küp özdeşlikleri. Programda varsa söyleyin, ilgili derse eklerim.

## Yeni dizi

| # | Ders | Kaynak | Akılda kalıcı cümle |
|---|---|---|---|
| D1 | **YENİ** Önerme: doğru ya da yanlış | — | "'Her' için hepsi, 'bazı' için biri yeter." |
| D2 | **YENİ** Ve, veya, ya da | — | "Ve ikisini ister, veya en az birini, ya da yalnızca birini." |
| D3 | **YENİ** İse, ancak ve ancak | — | "İse tek yön, ancak ve ancak çift yön." |
| D4 | Değişme ve birleşme | 04 S3–S6 | "Toplama ve çarpmada var, çıkarmada yok." |
| D5 | Dağılma | 04 S1, S2, S7, S8, S11 | "Dışarıdaki, içerideki herkesle çarpılır." |
| D6 | Birim, ters, yutan | 04 S10 + yeni | "0 toplamada etkisiz, çarpmada yutan." |
| D7 | **YENİ** Özdeşlikler | 04 S9, S12'nin düzeneği + yeni | "(a + b)² dört parçadır, iki değil." |
| D8 | **YENİ** Çarpanlara ayırma ve sıfır çarpım | — | "Çarpım 0 ise çarpanlardan en az biri 0'dır." |

---

## D1 — Önerme: doğru ya da yanlış (YENİ)

**Fikir:** Önerme, doğru ya da yanlış olduğu kesin olan cümledir. "Her" diyen önerme tek istisnayla düşer, "bazı" diyen tek örnekle ayakta kalır.

**Açılış sorusu:** "Her asal sayı tektir." Bu cümleyi yanlış çıkarmak için kaç sayı göstermen gerekir?

**Ana görsel:** İddia kartları. Her kartın altına D ya da Y damgası basılır; karar verilemeyen kart kenara ayrılır.

| Sahne | Ne olur |
|---|---|
| 1. Önerme mi? | Dört kart: "2 + 3 = 5" (D), "7 çift sayıdır" (Y), "√2 rasyoneldir" (Y), "x + 2 = 5". İlk üçü damga alır: yanlış cümle de önermedir. Dördüncüsü kenara ayrılır: x bilinmeden karar verilemez. |
| 2. Değil | p: "7 çift sayıdır" (Y). p′: "7 çift sayı değildir" (D). Damga ters döner. Tahmin: "5 > 3"ün değili hangisi? (5 < 3 / 5 ≤ 3). Sayı doğrusunda 3'ün sağı boyalı; değili geri kalan her yer, 3'ün kendisi dahil (B6'daki tümleyen). |
| 3. Her: ∀ | "Her gerçek sayının karesi pozitiftir": ∀x ∈ ℝ, x² > 0. Tahmin: doğru mu? Örnekler yeşil dizilir (3, −2, 1/2); sonra x = 0: 0 > 0 değil. Tek istisna önermeyi düşürür. |
| 4. Bazı: ∃ | "Bazı tam sayıların karesi kendisine eşittir": ∃x ∈ ℤ, x² = x. Tek örnek yeter: 1. "Bazı", en az bir demektir. Yanlış çıkan "her"in yerine doğrusu yazılır: "Bazı gerçek sayıların karesi pozitif değildir." |
| 5. Sıra sende | Dört sembolik önerme sözel karşılığıyla eşleştirilir, sonra D ya da Y'ye sürüklenir: ∀x ∈ ℕ, x ≥ 0 (D) · ∃x ∈ ℕ, x + 3 = 1 (Y) · ∃x ∈ ℤ, x + 3 = 1 (D: −2) · ∀x ∈ ℝ, x² ≥ x (Y: 1/2). |

**Hedeflenen yanılgı:** "Yanlış cümle önerme değildir"; "> işaretinin değili < işaretidir"; "birkaç örnek 'her'i doğrular" (C5'in tekrarı).
**Akılda kalıcı cümle:** "'Her' için hepsi, 'bazı' için biri yeter."
**Çıkış soruları:** Hangisi önerme değildir? (x + 4 = 9; çeldiriciler: 3 + 4 = 9, "9 asal sayıdır", "Her tam sayı rasyoneldir") · "∀x ∈ ℝ, x² > 0" önermesini hangisi yanlış çıkarır? (x = 0)
**Hikâye:** Yok.
**Not:** Sahne 5'teki ikinci ve üçüncü kart aynı cümlenin iki kümede sınanmasıdır; "x hangi kümeden" sorusu sonucu değiştirir (C1'in kapalılık fikri). "Her"in değilinin "bazı … değil" oluşu sahne 4'te tek örnekle gösterilir, genel kural olarak yazılmaz.

---

## D2 — Ve, veya, ya da (YENİ)

**Fikir:** "Ve" iki koşulu birden ister, "veya" en az birini, "ya da" yalnızca birini.

**Açılış sorusu:** 6 hem çift hem 3'ün katı. Peki 6 için "çift veya 3'ün katı" demek doğru olur mu?

**Ana görsel:** 1'den 12'ye sayılar ve iki çerçeve: çift sayılar, 3'ün katları (B1 ve B5'teki listeler). Bağlaç seçilince koşulu sağlayan sayılar yanar.

| Sahne | Ne olur |
|---|---|
| 1. Ve: ∧ | p: "n çifttir", q: "n 3'ün katıdır". p ∧ q: yalnızca iki çerçevenin ortak yeri yanar: 6 ve 12. İkisi birden doğru olmalı. Kesişimle aynı yer (B5). |
| 2. Veya: ∨ | Tahmin: 6 yanar mı? p ∨ q: 2, 3, 4, 6, 8, 9, 10, 12. En az biri doğruysa yeter; ikisi birden doğruysa da doğru. Birleşimle aynı yer. |
| 3. Ya da: ⊻ | p ⊻ q: 6 ve 12 söner. Yalnızca biri doğru olmalı. Gündelik dildeki "çay ya da kahve" budur; matematikteki "veya" ikisine birden izin verir. |
| 4. Aralıklarda | Bildiğin yazım aslında bir "ve": 2 < x < 6 ⇔ x > 2 ∧ x < 6. İki parçalı küme "veya": x < 2 ∨ x > 6. Nokta sayı doğrusunda kaydırılır, üç bağlacın ışığı ayrı ayrı yanar. |
| 5. Sıra sende | n = 15 için dört kart D ya da Y'ye sürüklenir: tek ∧ 5'in katı (D) · çift ∨ 3'ün katı (D) · 3'ün katı ⊻ 5'in katı (Y: ikisi birden) · çift ∧ 3'ün katı (Y). |

**Hedeflenen yanılgı:** "Veya"yı gündelik anlamıyla dışlayıcı sanmak (ikisi birden doğruysa yanlış demek); "ve" ile "veya"yı karıştırmak.
**Akılda kalıcı cümle:** "Ve ikisini ister, veya en az birini, ya da yalnızca birini."
**Çıkış soruları:** n = 6 için hangisi yanlıştır? ("n çift ⊻ n 3'ün katı"; çeldiriciler aynı iki önermenin ∧ ve ∨ ile bağlanmışı ve "n tek ∨ n çift") · "2 < x < 6" hangi önermeyle aynıdır? (x > 2 ∧ x < 6; çeldiriciler: x > 2 ∨ x < 6, x < 2 ∨ x > 6, x < 2 ∧ x > 6)
**Hikâye:** Yok (B5'in alışveriş filtresi aynı fikri taşıyor).
**Not:** Doğruluk tablosu çizilmez; her bağlaç sayıların yanıp sönmesiyle öğrenilir.

---

## D3 — İse, ancak ve ancak (YENİ)

**Fikir:** "p ise q" p'den q'ya giden tek yönlü yoldur; dönüş yolu da varsa "ancak ve ancak" denir.

**Açılış sorusu:** "x > 5 ise x > 3" doğru. Tersten okuyalım: "x > 3 ise x > 5." Bu da doğru mu?

**Ana görsel:** Sayı doğrusunda iç içe iki şerit: (5, ∞) şeridi (3, ∞) şeridinin içinde. İçteki şeride basan her nokta dıştakine de basar; tersi olmaz.

| Sahne | Ne olur |
|---|---|
| 1. Tek yön: ⇒ | x > 5 ⇒ x > 3. Nokta kaydırılır: iç şeritteyken dış şeritte de. Tersini dene: x = 4 dış şeritte, içte değil. Tek karşı örnek, ters yön yanlış. Ok tek başlı çizilir. |
| 2. Çift yön: ⇔ | İki nokta, a ve b. a < b ⇒ b − a > 0: b sağdaysa aradaki fark pozitif. Tersi: b − a > 0 ⇒ a < b: o da doğru. İki ok birleşir: a < b ⇔ b − a > 0. Kaydırıcıyla a ve b oynar; b sola geçince ikisi birlikte yanlış olur. |
| 3. Verilen ve gösterilecek | C5'teki ispat yeniden yazılır: "a ve b rasyonel ⇒ (a + b)/2 rasyonel." Okun solu verilen (hipotez), sağı gösterilecek (hüküm). İspat, soldan sağa giden yoldur. |
| 4. Sıra sende | Üç kartta ok seçilir, ⇒ mi ⇔ mi; ters yön yanlışsa karşı örneği yazılır: "n 4'ün katı … n çift" (⇒; 6) · "x = 3 … x² = 9" (⇒; −3) · "x > 0 … −x < 0" (⇔). |

**Hedeflenen yanılgı:** "p ise q" doğruysa "q ise p" de doğrudur sanmak.
**Akılda kalıcı cümle:** "İse tek yön, ancak ve ancak çift yön."
**Çıkış soruları:** "x > 3 ise x > 5" önermesini hangi x çürütür? (4; çeldiriciler: 2, 6, 7) · Hangisinde ⇒ yerine ⇔ yazılabilir? ("x − 2 = 0 ⇒ x = 2"; çeldiriciler: "x = 3 ⇒ x² = 9", "n 4'ün katı ⇒ n çift", "x > 5 ⇒ x > 3")
**Hikâye:** Yok.
**Not:** Sahne 2'deki önerme programın kendi örneği. Hipotezi yanlış olan "ise" önermelerine girilmez.

---

## D4 — Değişme ve birleşme (Ders 04, S3–S6)

**Kaynak:** 04 S3, S4, S5, S6.

**Fikir:** Toplama ve çarpmada sayıların yeri ve parantezin yeri sonucu değiştirmez; çıkarmada değiştirir.

**Açılış sorusu:** Kasada üç ürün var: 17, 28 ve 12 lira. Kasiyer önce hangi ikisini toplar?

**Ana görsel:** Yer değiştiren bloklar ve iki bloğun üstünde kayan parantez kapsülü; alttaki toplam çubuğu oynamaz.

| Sahne | Ne olur |
|---|---|
| 1. Değişme | S3: bloklar yer değiştirir, toplam çubuğu aynı; dikdörtgen döner, alan aynı. Önce örnek, sonra harf: ∀a, b ∈ ℝ, a + b = b + a ve a · b = b · a. D1'in simgesi ilk kez iş görür. |
| 2. Çıkarmada yok | S4'ün çıkarma yarısı: 5 − 3 = 2, 3 − 5 = −2. Tek karşı örnek yeter (C5). |
| 3. Birleşme | S5: parantez kapsülü kayar, (2 + 3) + 4 = 2 + (3 + 4) = 9; küp kutusu 2 · 3 · 4 iki yoldan 24. Harfle yazım. Açılışın cevabı: 17 + (28 + 12) = 17 + 40. |
| 4. Çıkarmada o da yok | S6'nın çıkarma yarısı: (10 − 5) − 2 = 3, 10 − (5 − 2) = 7. |
| 5. Sıra sende | Kasiyer: 4 · 17 · 25. Kartlar sıraya dizilir: (4 · 25) · 17 = 1700. Sonra iki önerme D ya da Y: "∀a, b ∈ ℤ, a − b = b − a" (Y) · "∀a, b ∈ ℕ, a · b = b · a" (D). |

**Hedeflenen yanılgı:** "Her işlemde yer değiştirilebilir"; "parantez her işlemde kaydırılabilir" (eski Y3, Y4).
**Akılda kalıcı cümle:** "Toplama ve çarpmada var, çıkarmada yok."
**Çıkış soruları:** Hangisi her a ve b için doğrudur? (a + b = b + a; çeldiriciler: a − b = b − a, (a − b) − c = a − (b − c), a − b = b + a) · 4 · 17 · 25 işlemini zihinden en kolay hangisi verir? ((4 · 25) · 17 = 1700)
**Hikâye:** Yok (bölümün tamamı kasiyerle kurulu).
**Çıkarılan / devredilen:** S1 (kasiyer, 7 × 98) → D5'in açılışı. S4 ve S6'nın bölme yarıları çıkar (karar 2). S5'teki a, b, c kaydırıcıları ve çarpma anahtarı çıkar; parantez kapsülünü sürüklemek kalır.

---

## D5 — Dağılma (Ders 04, S1, S2, S7, S8, S11)

**Kaynak:** 04 S1, S2, S7, S8, S11'in iki meydan okuması.

**Fikir:** Parantezin dışındaki çarpan, içerideki her terimle ayrı ayrı çarpılır.

**Açılış sorusu:** Tanesi 98 lira olan 7 ürün. Kasiyer hesap makinesinden önce "686" diyor. Nasıl?

**Ana görsel:** Alan modeli: 7 × 100'lük dikdörtgenden 7 × 2'lik şerit kesilir.

| Sahne | Ne olur |
|---|---|
| 1. Kasiyerin sırrı | S1'in kısası ve S2: 7 × 98 dikdörtgeni 100'e tamamlanır. Tahmin: kesilen şeridin alanı kaç? (2 / 7 / 9 / 14). 700 − 14 = 686. Yanlış yol 700 − 2 çizilip silinir. |
| 2. a · (b + c) | S7: iki dikdörtgen ortak kenardan birleşir. Önce sayı, sonra harf: ∀a, b, c ∈ ℝ, a · (b + c) = a · b + a · c. |
| 3. Çıkarmayla, ve eksi | S8: a · (b − c) = a · b − a · c, "fazlayı kes". Sonra a − (b + c) = a − b − c: eksi de içerideki herkese ulaşır. |
| 4. Sıra sende: hile ustası | S11'den iki meydan okuma. 25 × 36: (25 · 4) · 9 (birleşme) ya da 25 · (30 + 6) (dağılma); tuzak kart 25 · 30 + 6. 99 × 13: 13 · (100 − 1); tuzak kart 13 · 100 − 1. |

**Hedeflenen yanılgı:** a · (b + c) = a · b + c; a − (b + c) = a − b + c (eski Y1, Y2).
**Akılda kalıcı cümle:** "Dışarıdaki, içerideki herkesle çarpılır."
**Çıkış soruları:** 12 · 99'u zihinden hangisi doğru verir? (12 · (100 − 1) = 1200 − 12 = 1188; çeldirici: 12 · 100 − 1 = 1199) · a − (b + c) açılımı hangisidir? (a − b − c)
**Hikâye:** Yok.
**Çıkarılan / devredilen:** S9 → D7. S11'in üçüncü meydan okuması (17 × 12), yıldızlar ve serbest mod çıkar. S7 ve S8'in kaydırıcıları tek kaydırıcıya iner.

---

## D6 — Birim, ters, yutan (Ders 04, S10 + yeni)

**Kaynak:** 04 S10; C1'den devredilen etkisiz ve ters eleman bağı; yeni yutan eleman sahnesi.

**Fikir:** Birim eleman sayıyı değiştirmez, ters eleman işlemi geri alır, yutan eleman her şeyi kendine çevirir.

**Açılış sorusu:** Hesap makinesinde ekranda 5 var. "+" tuşundan sonra hangi sayıya basarsan ekran değişmez? Ya "×" tuşundan sonra?

**Ana görsel:** Geri alma düğmesi: bir işlem yapılır, tersi onu başa döndürür. 0 ile çarpınca düğme söner.

| Sahne | Ne olur |
|---|---|
| 1. Birim eleman | S10 üst şerit: a + 0 = a, a · 1 = a. Toplamada 0, çarpmada 1. |
| 2. Ters eleman | S10 orta ve alt şerit: 5 + (−5) = 0, sayı doğrusunda git ve dön; 4 · (1/4) = 1. Sembolle: ∀a ∈ ℝ, a ≠ 0 için ∃b ∈ ℝ, a · b = 1. Yan not: çıkarma, tersiyle toplamaktır; bölme, tersiyle çarpmaktır. |
| 3. Yutan eleman (YENİ) | 7 · 0, 123 · 0, (−4) · 0: hepsi 0. ∀a ∈ ℝ, a · 0 = 0. Geri al düğmesi söner: 0 · ? = 1 olmaz, 0'ın çarpmaya göre tersi yoktur. Toplamada yutan eleman yoktur. |
| 4. Hangi kutuda var? | C1'in matruşkası döner. 3'ün toplamaya göre tersi −3: ℕ'de yok, ℤ'de var. 2'nin çarpmaya göre tersi 1/2: ℤ'de yok, ℚ'da var. Birim elemanlar 0 ve 1 her kutuda var. |
| 5. Sıra sende | S10'un boşluk doldurması, dört soru: 5 + ? = 0 · 5 · ? = 1 · ? · 7 = 0 · x + 7 = 7 ise x = ? |

**Hedeflenen yanılgı:** "Etkisiz eleman her işlemde 0'dır"; "0'ın da çarpmaya göre tersi vardır" (eski Y8); "her sayı kümesinde her sayının tersi vardır".
**Akılda kalıcı cümle:** "0 toplamada etkisiz, çarpmada yutan."
**Çıkış soruları:** Hangi gerçek sayının çarpmaya göre tersi yoktur? (0) · "Her tam sayının çarpmaya göre tersi yine bir tam sayıdır" önermesini hangisi çürütür? (2: tersi 1/2 ∉ ℤ; çeldiriciler: 1, −1, "çürütülemez")
**Hikâye:** Yok.
**Not:** Sahne 4, programın "özelliklerin sayı kümelerinde olup olmadığına dair önermeler" isteğini karşılar. Eski Ders 03 sınavından devredilen ters eleman sorusu ikinci çıkış sorusu olarak yeniden yazıldı.

---

## D7 — Özdeşlikler (YENİ)

**Kaynak:** yeni + 04 S9 ve S12'nin düzeneği.

**Fikir:** Özdeşlik, harflerin her değeri için doğru olan eşitliktir. (a + b)² dört parçadan oluşur; ortadaki iki dikdörtgen unutulur.

**Açılış sorusu:** (3 + 4)² ile 3² + 4² eşit mi? Değilse aradaki fark nereden geliyor?

**Ana görsel:** Kenarı a + b olan kare dört parçaya bölünür: a², b² ve iki tane a · b dikdörtgeni.

| Sahne | Ne olur |
|---|---|
| 1. Dört parça | S9'un harfli modeli, c = a ve d = b ile: kare dörde bölünür. Tahmin: kaç parça? a = 3, b = 4: 9 + 12 + 12 + 16 = 49. Yalnızca iki kare boyanırsa 25; eksik 24 iki dikdörtgendir. (a + b)² = a² + 2ab + b². |
| 2. Özdeşlik nedir? | S12'nin düzeneği. İddia: (a + b)² = a² + b². a = 1, b = 0 için tutar; a = 3, b = 4 için 49 ≠ 25. Tek karşı örnek: özdeşlik değil. Doğrusu kaydırıcıyla denenir, hep eşit çıkar; kanıtı örnekler değil, sahne 1'deki karedir. ∀a, b ∈ ℝ. |
| 3. Farkın karesi | Kenarı a olan kareden iki şerit kesilir (her biri a · b). Köşedeki b² iki kez kesilmiştir, biri geri eklenir: (a − b)² = a² − 2ab + b². |
| 4. İki kare farkı | a²'nin köşesinden b² kesilir. Kalan L biçimi ikiye ayrılır, bir parça döndürülüp yana eklenir: kenarları a − b ve a + b olan dikdörtgen. a² − b² = (a − b)(a + b). A6'ya geri bağlantı: (√3 − 1)(√3 + 1) = 3 − 1. |
| 5. Hikâye | "Bir büyük tepsi mi, iki küçük mü?" videosu (hikâye planında 6 numara). |

**Hedeflenen yanılgı:** (a + b)² = a² + b² (eski Y6); (a − b)² = a² − b²; "birkaç değerde tuttu, özdeşliktir" (eski Y7).
**Akılda kalıcı cümle:** "(a + b)² dört parçadır, iki değil."
**Çıkış soruları:** (x + 3)² açılımı hangisidir? (x² + 6x + 9; çeldiriciler: x² + 9, x² + 3x + 9, x² + 6x + 6) · a² − b² hangisine eşittir? ((a − b)(a + b); çeldiriciler: (a − b)², (a + b)², a² − 2ab + b²)
**Hikâye:** Var; videosu içerik bittikten sonra üretilir. Video gelene kadar ders 4 sahneyle yayınlanır.
**Çıkarılan:** S9'un sayısal örneği (13 × 12) ve a, b, c, d kaydırıcıları. S12'den a ÷ (b + c) iddiası (karar 2); öteki iddialar D5'in yanılgıları olarak zaten işlendi.

---

## D8 — Çarpanlara ayırma ve sıfır çarpım (YENİ)

**Fikir:** Çarpanlara ayırmak, dağılmayı ve özdeşlikleri geriye doğru okumaktır. Bir çarpım 0 ise çarpanlardan en az biri 0'dır.

**Açılış sorusu:** Kasiyer 51 × 49'u da zihinden söylüyor: 2499. Bu kez hangi yolu kullandı?

**Ana görsel:** Geri sarma: iki dikdörtgen ortak kenarından birleşip tek dikdörtgen olur. Sonra alanı 0 olan dikdörtgen: bir kenarı 0'a iner.

| Sahne | Ne olur |
|---|---|
| 1. Dağılmayı geri sar | D5'in filmi tersten oynar: 7 · 100 − 7 · 2 = 7 · (100 − 2). Harfle: a · b + a · c = a · (b + c). Örnek: 6x + 9 = 3 · (2x + 3); ortak kenar 3. |
| 2. Özdeşliği geri sar | x² − 9 = (x − 3)(x + 3). Kasiyer: 51 · 49 = (50 + 1)(50 − 1) = 2500 − 1. 99² = (100 − 1)² = 10 000 − 200 + 1 = 9801. Köklülerde: (√5 + √2)(√5 − √2) = 5 − 2 = 3. |
| 3. Sıfır çarpım | Kenarları a ve b olan dikdörtgen; kaydırıcıyla alan 0 yapılmaya çalışılır. Ancak bir kenar 0'a inince olur. a · b = 0 ⇔ a = 0 ∨ b = 0. Değili: a · b ≠ 0 ⇔ a ≠ 0 ∧ b ≠ 0. D6'daki yutan elemanın tersten okunuşu. |
| 4. Sıra sende | (x − 2)(x + 5) = 0 ise x hangi sayılar olabilir? (2 veya −5) · x · (x − 4) = 0 ise? (0 veya 4) · Üç ifade çarpanlarıyla eşleştirilir: 5x + 10, x² − 16, x² + 2x + 1. |

**Hedeflenen yanılgı:** "Çarpım 0 ise iki çarpan da 0'dır" (veya yerine ve); (x − 2)(x + 5) = 0'dan x = −2 ve x = 5 okumak; ortak çarpanı yalnızca ilk terimden çıkarmak (6x + 9 = 3 · (2x + 9)).
**Akılda kalıcı cümle:** "Çarpım 0 ise çarpanlardan en az biri 0'dır."
**Çıkış soruları:** x² − 25 hangi çarpıma eşittir? ((x − 5)(x + 5); çeldiriciler: (x − 5)², (x − 25)(x + 1), x · (x − 25)) · (x − 2)(x + 5) = 0 için hangisi doğrudur? (x = 2 ∨ x = −5; çeldiriciler: x = 2 ∧ x = −5, x = −2 ∨ x = 5, x = 0)
**Hikâye:** Yok (işlem tekniği; hikâye zorlama olur).
**Not:** Sıfır çarpım bir çıkarım olarak verilir, denklem çözme yöntemi olarak değil: çarpanlar hep hazır verilir, öğrenciden ifadeyi çarpanlarına ayırıp denklem çözmesi istenmez. Sahne 2'deki köklü örnek programın "üslü veya köklü gösterimlerle işlemlerde özdeşliklerden yararlanma" isteğini karşılar.

---

## Müfredat denetimi (MAT.9.1.4)

| Programın istediği | Nerede |
|---|---|
| Önerme kavramı, matematiksel örneklerle | D1 sahne 1 |
| Sözelden sembole, sembolden sözele çeviri | D1 sahne 5; D4–D6'da her kural önce sözle, sonra ∀ ile |
| Niceleyiciler: her, bazı | D1 sahne 3–4 |
| Önermenin değili | D1 sahne 2 ve 4; D8 sahne 3 |
| Bağlaçlar: ve, veya, ya da | D2 |
| Bağlaçlar: ise, ancak ve ancak | D3 |
| Sayı kümeleri veya aralıklarına ilişkin önermeler | D1 sahne 5 (ℕ, ℤ, ℝ); D2 sahne 4 (aralıklar); D6 sahne 4 |
| Değişme, birleşme: toplama, çıkarma, çarpma | D4 |
| Dağılma | D5 |
| Birim eleman, ters eleman, yutan eleman; hangi kümede var | D6 |
| Program örneği: ∀a, b ∈ ℝ için a + b = b + a | D4 sahne 1 |
| Program örneği: ∀a ∈ ℝ, a ≠ 0 için ∃b ∈ ℝ, a · b = 1 | D6 sahne 2 |
| Program örneği: a < b ⇒ b − a > 0 | D3 sahne 2 |
| Program örneği: a · b = 0 ⇔ a = 0 ∨ b = 0 ve a · b ≠ 0 ⇔ a ≠ 0 ∧ b ≠ 0 | D8 sahne 3 |
| İşlemler arasında kurulan ilişkiler | D6 sahne 2 (çıkarma ve bölme, tersle) |
| Sayılardaki özelliğin cebirsel ifadedeki karşılığı | D4–D6: her sahnede önce sayı, sonra harf |
| Özdeşlikler: toplamın karesi, farkın karesi, iki kare farkı; geometrik modelle | D7 sahne 1, 3, 4 |
| Çarpım sıfırsa çarpanlardan en az biri sıfırdır | D8 sahne 3–4 |
| Çarpanlara ayırma, işlem özelliklerinin uygulaması olarak | D8 sahne 1–2 |
| Üslü ve köklü işlemlerde özdeşliklerden yararlanma | D7 sahne 4 (A6), D8 sahne 2 |

Ön bilgi sayılanlar (program: rasyonel sayılarda değişme, birleşme, birim, yutan, dağılma biliniyor kabul edilir): D4–D6'nın sayısal kısmı tekrar niteliğindedir; yeni olan, aynı kuralların harfle ve önerme diliyle yazılmasıdır.

## Mevcut 5 soruluk sınav nereye gitti

| Eski soru | Yeni yeri |
|---|---|
| 1 8 · (50 + 3) | Çıkar (soru 2 aynı beceriyi ölçüyor) |
| 2 12 · 99 | D5 çıkış sorusu |
| 3 Her a, b için doğru olan | D4 çıkış sorusu (bölme şıkkı değişti) |
| 4 Ayşe'nin denemesi | Çıkar; fikri D7 sahne 2'de işleniyor |
| 5 a − (b + c) | D5 çıkış sorusu |

## Yapım sırası (öneri)

D4 → D5 → D6 (mevcut dersin bölünmesi; `dersler/04-…js` Bölüm C'deki gibi `window.DERS_PARCA` ile parçalanır) → D1 → D2 → D3 → D7 → D8. Yayın sırası D1'den D8'e; D4–D6'daki ∀ satırları D1 yazılmadan da eklenebilir.
