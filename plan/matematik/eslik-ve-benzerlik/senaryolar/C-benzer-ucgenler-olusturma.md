# Senaryolar — Konu C · Benzer üçgenler oluşturma

Yazıldı: 9 Ekim 2026. Dayanak: `../MUFREDAT.md` MAT.9.4.3, `../PLAN.md` bölüm 3 (C1–C4), bölüm 5, bölüm 7 (karar 6 ve 9) ve bölüm 8 ("C" satırları). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-geometrik-donusumler.md` dosyasındaki gibidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Okunuşlar ders yazılırken `speak` ile verilir: "~" "benzerdir" (ADE ~ ABC "A D E, A B C'ye benzerdir"); "∥" "paraleldir"; |AB| "A B uzunluğu"; |AD|/|AB| "A D uzunluğu bölü A B uzunluğu"; kesirler 1/3 "üçte bir", 2/5 "beşte iki", 3/4 "dörtte üç", 7/5 "beşte yedi"; "×" "çarpı"; "ADE açısı" yazılır, "∠" kullanılmaz.
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı hiçbir yerde görmez.
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" hangi cümleler olduğunu söyler. Kalın şık doğru cevaptır; derste şıkların sırası karıştırılır. Çıkış sorularında sondaki parantez dayandığı sahneyi gösterir.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor (`tag: 'Sıra sende'`) → gör → adlandır (defter) → dene → 4–5 çıkış sorusu.
- Renkler tema boyunca aynıdır: şekil mavi, görüntüsü turuncu, yansıma doğrusu mor, dönme merkezi ve açısı sarı, öteleme oku yeşil. Bu konuda B konusundaki gibi karşılıklı açılar ve karşılarındaki kenarlar aynı renktedir: ortak köşe A ve onun açısı mavi, B ve karşılığı turuncu, C ve karşılığı yeşil. Dik üçgende (C3) dik açı ve karşısındaki hipotenüs mavi, a açısı ve karşısındaki kenar turuncu, b açısı ve karşısındaki kenar yeşildir. Paralel doğrular mor (kesikli), yükseklik sarıdır. Benzer olmayan üçgen gri çizilir, açı işareti taşımaz; benzer olan üçgen kendi renklerini sonradan alır.
- Çizimler birim kareli zemindedir ve ölçeklidir. "(sütun, satır)" çiftleri yalnızca dersi yazan içindir (zeminin sol üst köşesi (0, 0), satır aşağı doğru artar); tahtaya koordinat yazılmaz. Zemin 16 sütun, 11 satırdır. Tahtada yazılan uzunluk etiketleri çizimle orantılıdır; ölçek "Tahta" satırında yazılmadıysa 1 birim = 1 m'dir. Açı değerleri (63°, 72° …) yalnızca çizim ve denetim içindir; yalnızca "tahtaya yazılır" denen açılar görünür.
- Kenarlar uzatılırken uzantı kesikli çizilir. Paralel çizgiyi çizmek bir animasyondur: çizgi köşeden başlayıp kayarak yerine gelir.
- Bu konuda Tales, temel orantı, orta taban, Öklid ve Pisagor adları ve kuralları anılmaz; bunlar D konusundadır (`PLAN.md` karar 6).

## C1 · İki kenarı aynı oranda böl

- **Fikir:** Üçgenin iki kenarı üzerinde, ortak köşeden aynı oranda alınan iki nokta birleştirilirse küçük üçgen büyüğüne benzer; rastgele alınan iki nokta çoğu zaman benzer üçgen vermez.
- **Giriş ekranı sorusu:** Üçgen bir havuzu tek bir düz bölmeyle ayırıp aynı biçimde küçük bir havuz elde edebilir misin?
- **Kaynak:** Ders kitabı s. 53 ("Konuya Başlarken": üçgen havuz, K ∈ [AB], L ∈ [AC], AKL ile ABC'nin benzerliği; 8. uygulama: 4 ve 6 eşit aralığa bölünmüş kenarlar, hangi nokta çiftleri, hangi koşul, LR ∥ BC nedeni), s. 54 (8. uygulamanın soruları; 14. örnek: tarladaki 16 direk, |AM| = 108 m, |CJ| = 72 m), s. 58 (Kontrol Noktası: iki kenar üzerindeki noktalarda ortak köşeyi oluşturan kenarlar orantılıysa Kenar-Açı-Kenar). Kenar-Açı-Kenar benzerliği B5'te öğretilmiştir (kitap s. 49), burada yalnızca kullanılır. "|BC| = 12 m", Sıra sende ve çıkış sorularındaki sayılar örnek veridir.
- **Sınır:** Orta taban teoremi adıyla işlenmez; oran 1/2 yalnızca S3'teki L–R çiftinde geçer. Tales, temel orantı ve ters teoremleri anılmaz. S3 sonundaki "LR, BC'ye paraleldir" gözlemi yalnızca bu çizime özgüdür (kitabın 8. uygulama 3. sorusu), kural olarak verilmez. Kenar-Açı-Kenar ispatlanmaz. K'nin B'ye, L'nin C'ye karşılık geldiği eşleme dışındaki eşleşmeler (ters eşleme) işlenmez; S3–S4'teki üçgen bu yüzden seçilmiştir: 4 ve 6 parçalı noktalar arasında yalnızca L–R çifti benzer üçgen verir (her çift hesaplandı).
- **Güç kavramlar ve gösterimi:** (1) "Aynı oran": bir noktanın kenar üzerindeki yeri A'dan uzaklığının kenara oranıdır; iki kenar üzerinde kayan iki nokta, yerleri kesirle yan yana yazılır; kesirler eşitlenince küçük üçgen renk alır (A mavi, ikinci köşe turuncu, üçüncü yeşil). (2) Benzemeyen çift: küçük üçgen gri kalır, açıları ölçülür ve ABC'ninkilerle yan yana yazılır. (3) Kesir karşılaştırma: 4/6 sadeleştirilip 2/3 yazılır; karşılaştırılan iki kesir tahtada alt alta durur.
- **Hedeflenen yanılgı:** "İki kenar üstünde alınan her iki nokta benzer üçgen verir."
- **Akılda kalıcı cümle:** Aynı oranda böl, benzer üçgen çıksın.

Ana havuz (S3, S4): ABC: A (2, 9), B (6, 1), C (14, 9). |AC| = 12 birim (yatay), |AB| = √80 ≈ 8,94 birim, |BC| = 8√2 ≈ 11,31 birim; açılar A ≈ 63,4°, B ≈ 71,6°, C = 45°. AB dört eşit parça: K (3, 7), L (4, 5), M (5, 3). AC altı eşit parça: N (4, 9), P (6, 9), R (8, 9), S (10, 9), T (12, 9).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (B5) ABC ve DEF üçgenlerinde |DE|/|AB| = |DF|/|AC| ve A açısı ile D açısı eşit. Üçgenler hangi koşula göre benzerdir? **Kenar-Açı-Kenar** / Açı-Açı / Kenar-Kenar-Kenar. Yanlışta: "İki kenar orantılı ve aralarındaki açı eşitse üçgenler Kenar-Açı-Kenar ile benzerdir."
2. (B3) Benzer iki üçgenin karşılıklı kenarlarının oranı 3. Küçüğün bir kenarı 4 cm ise büyüğün karşılık gelen kenarı kaç cm'dir? **12 cm** / 7 cm / 8 cm. Yanlışta: "Kenarlar aynı çarpanla büyür: 4 × 3 = 12. Aradaki fark aynı kalmaz."

### Sahne 2 · Havuza bölme koy

Tahta: mavi ABC (havuz). AB üzerinde D (5, 3), AC üzerinde E (11, 9) belirir; DE turuncu çizilir. A köşesindeki açı iki üçgende de mavi yayla işaretlenir. Sonra "3/4" ve "3/4" yazılır (D ve E'nin yeri), ADE renk alır (A mavi, D turuncu, E yeşil). Sağ altta "|BC| = 12 m", sonra "|DE| = 9 m". (|AD|/|AB| = 3/4; |AE|/|AC| = 9/12 = 3/4; |DE|/|BC| = 3/4.)

Anlatım:
1. Üçgen biçiminde bir balık havuzu var: ABC.
2. Yavrular için aynı biçimde küçük bir bölme yapılacak.
3. AB kenarında D, AC kenarında E noktası seçilir.
4. DE çizgisi küçük bir üçgen ayırır: ADE.
5. İki üçgenin benzer olması için bir koşul gerekir.
6. A açısı iki üçgende ortak; bu açı zaten eşit.
7. Kenar-Açı-Kenar için A'yı çevreleyen kenarlar orantılı olmalı.
8. |AD|/|AB| ile |AE|/|AC| eşit olmalı.
9. D, AB'nin dörtte üçünde: |AD|/|AB| = 3/4.
10. E, AC'nin dörtte üçünde: |AE|/|AC| = 3/4.
11. İki oran eşit, A açısı ortak: ADE ~ ABC.
12. Benzerlik oranı 3/4: |DE|/|BC| = 3/4.
13. |BC| = 12 m ise |DE| = 3/4 × 12 = 9.

Birlikte çöz (`tag: 'Birlikte çöz'`; aynı havuz, D (3,33; 6,33), E (6, 9); tahtada "|AD|/|AB| = 1/3", "|AE|/|AC| = 1/3", "ADE ~ ABC", "|BC| = 18 m", "|DE| = ?"): |DE| kaç metredir? **6 m** / 15 m / 54 m. Dayandığı anlatım: 11–13. İpuçları: "Benzerlik oranı 1/3: |DE|, |BC|'nin üçte biridir." · "Fark değil çarpan: 18 × 1/3."

Sonra:
14. Önce iki oranı yaz, eşit olup olmadığına bak.

Soru (`tag: 'Sıra sende'`; yeni durum; ölçek 1 birim = 1 m; dik üçgen ABC: A (1, 10), B (1, 1), C (13, 10); D (1, 7), E (5, 10); tahtada |AB| = 9 m, |AD| = 3 m, |AC| = 12 m, |AE| = 4 m, |BC| = 15 m): |DE| kaç metredir? **5 m** / 12 m / 45 m. Dayandığı anlatım: 8–13. İpuçları: "Önce iki oranı yaz: 3/9 ve 4/12." · "İkisi de 1/3; |DE|, |BC|'nin üçte biri." Gör: DE ölçeklenir: 1/3 × 15 = 5 m.

Defter ("Aynı oran"): **Aynı oran:** |AD|/|AB| = |AE|/|AC| ise ADE ~ ABC.

### Sahne 3 · Bölünmüş kenarlar

Tahta: mavi ABC (ana havuz). AB üzerinde K, L, M; AC üzerinde N, P, R, S, T noktaları harfleriyle görünür. Sağda iki satırlı tablo: "AB: K 1/4 · L 2/4 · M 3/4" ve "AC: N 1/6 · P 2/6 · R ? · S 4/6 · T 5/6" (R'nin hücresi boş; Birlikte çöz'den sonra dolar). Gör: L ile R birleştirilir; ALR renk alır (A mavi, L turuncu, R yeşil).

Anlatım:
1. Başka bir havuzun AB kenarı 4, AC kenarı 6 eşit parçaya bölünmüş.
2. AB'de K, L, M; AC'de N, P, R, S, T noktaları var.
3. Bir noktanın yeri, A'dan uzaklığının kenar boyuna oranıdır.
4. K için |AK|/|AB| = 1/4; L için 2/4; M için 3/4.
5. AC'de N için 1/6 başlar, T için 5/6 biter.
6. Benzer üçgen için iki kesrin eşit olması gerekir.

Birlikte çöz (`tag: 'Birlikte çöz'`; tabloda R'nin hücresi boş): R, AC'nin 6 parçasından 3'ünde. R'nin yeri kaçtır? **3/6** / 3/4 / 1/3. Dayandığı anlatım: 3 ve 5. İpuçları: "R, N'den sonra üçüncü nokta; altı parçadan üçü." · "Pay üçüncü noktayı, payda parça sayısını gösterir: 6."

Soru (`tag: 'Sıra sende'`; tablo tamamlanmış): Tabloya bak. Hangi iki nokta aynı yeri gösterir? **L ve R** / M ve S / K ve N. Dayandığı anlatım: 3–6 ve tablo. İpuçları: "L için 2/4 = 1/2. AC'de 1/2 hangi noktada?" · "3/4 ile 4/6 aynı değil; 1/4 ile 1/6 da değil."

Sonra:
7. L, AB'nin yarısında; R, AC'nin yarısında.
8. İki oran eşit, A açısı ortak: ALR ~ ABC.
9. Benzer üçgenlerde karşılıklı açılar eşit: ALR açısı ABC açısına eşit.
10. Eşit yöndeş açılar: LR çizgisi BC'ye paralel çıkar.

Defter ("Hangi çift?"): **Hangi çift?** Kesirleri yaz; eşit olanları birleştir.

### Sahne 4 · Her çift olmaz mı?

Tahta: ABC ve noktalar. K (3, 7) ile S (10, 9) birleştirilir; AKS gri kalır. Sağda iki kutu: "AKS: 63°, 101°, 16°" ve "ABC: 63°, 72°, 45°" (açılar yaklaşık: AKS 63,4° · 100,6° · 15,9°; ABC 63,4° · 71,6° · 45°). Dene bölümünde: aynı çizim, AB'de sabit bir nokta, AC'de kayan X noktası.

Anlatım:
1. Başka bir çift deneyelim: K ve S.
2. |AK|/|AB| = 1/4; |AS|/|AC| = 4/6 = 2/3.
3. İki kesir eşit değil.
4. AKS'nin açıları yaklaşık 63°, 101° ve 16°.
5. ABC'nin açıları yaklaşık 63°, 72° ve 45°.
6. Benzer üçgenlerin açıları karşılıklı eşit olur.
7. Bu açılar tutmuyor: AKS, ABC'ye benzemez.
8. İki nokta rastgele seçilince çoğu zaman benzer üçgen çıkmaz.

Soru (`tag: 'Sıra sende'`): K ve S çizgisi neden benzer üçgen vermedi? **İki oran eşit değil: 1/4 ile 2/3** / A açısı iki üçgende ortak değil / K ve S köşe noktası değil. Dayandığı anlatım: 2–7 ve sahne 2, 6–8. İpuçları: "Hangi koşula bakıyorduk? İki kesri karşılaştır." · "A açısı iki üçgende de aynı açıdır."

Defter ("Rastgele iki nokta"): **Rastgele iki nokta** çoğu zaman benzer üçgen vermez; oranlar eşit olmalı.

Dene (`c.slider`, "AC üzerindeki X noktası", 1–5 (N, P, R, S, T), adım 1; `noWait` yönerge: "X'i kaydır; küçük üçgenin renk aldığı yeri bul."): AB'de L sabit (1/2). Tahtada "|AL|/|AB| = 1/2", "|AX|/|AC| = i/6" ve "L açısı" ile "B açısı = 72°" (L açısı: N 27°, P 53°, R 72°, S 83°, T 90°). Yalnızca R'de (3/6) iki kesir eşit olur, L açısı 72° olur ve ALX renk alır; öteki noktalarda gri kalır. "Devam" ile ikinci bölüm: AB'de M sabit (3/4); X yine 1–5; "M açısı" N 17°, P 36°, R 53°, S 66°, T 76°; hiçbir noktada renk almaz (kesirler 3/4 ile hiç eşit olmaz). "Devam" ile biter.

Soru (`tag: 'Sıra sende'`; yeni durum): AB'de M noktasını (dörtte üç) seçtin. AC'de hangi nokta benzer üçgen verir? **Hiçbiri; 3/4, AC'deki kesirlerden hiçbirine eşit değil** / R / S. Dayandığı anlatım: sahne 3, 4–6 ve Dene. İpuçları: "AC'deki kesirler 1/6'dan 5/6'ya: 1/6, 2/6, 3/6, 4/6, 5/6. 3/4 hangisine eşit?" · "4/6 = 2/3 ve 5/6; ikisi de 3/4'ten farklı."

Sonra:
9. Her nokta için eşit oranlı bir eş bulunmaz.
10. Eş bulunursa küçük üçgen büyüğüne benzer.

### Sahne 5 · Tarladaki direkler

Tahta: dik üçgen biçimli tarla. A (1, 3), F (1, 9), M (10, 9); AF kenarında F'den yukarı doğru sırayla 6 aralık (B (1, 4), C (1, 5), Ç (1, 6), D (1, 7), E (1, 8)), FM kenarında F'den sağa doğru 9 aralık (G (2, 9), Ğ (3, 9), H (4, 9), I (5, 9), İ (6, 9), J (7, 9), K (8, 9), L (9, 9)); 16 direk küçük nokta olarak görünür, yalnızca A, C, F, J, M harflidir. AF yanında "6 aralık", FM yanında "9 aralık", AM üzerinde "108 m". Ölçek: |AM| = √117 ≈ 10,82 birim = 108 m. CJ turuncu çizilir (C (1, 5), J (7, 9); |CJ| = √52 ≈ 7,21 birim = 72 m).

Anlatım:
1. Üçgen biçimli bir tarlanın kenarlarına 16 direk dikilmiş.
2. Direkler eşit aralıklı: AF kenarında 6, FM kenarında 9 aralık.
3. A ile M direkleri arası 108 m.
4. Mühendis iki direk seçip aralarına tel çekecek.
5. Teli ölçmeden hesaplamak istiyor.
6. C direği F'den 4, J direği F'den 6 aralık uzakta.
7. F'deki dik açı ortak: |CF|/|AF| = 4/6 ve |FJ|/|FM| = 6/9.
8. İki oran da 2/3: CFJ ~ AFM.
9. |CJ|/|AM| = 2/3 olduğundan |CJ| = 2/3 × 108.
10. |CJ| = 72 m: tel ölçmeden bulundu.

Birlikte çöz (`tag: 'Birlikte çöz'`; D (1, 7) ve H (4, 9) işaretli; tahtada "|DF|/|AF| = 2/6 = 1/3", "|FH|/|FM| = 3/9 = 1/3", "DFH ~ AFM", "|DH| = ?"): D direği F'den 2, H direği F'den 3 aralıkta. D ile H arasındaki tel kaç metredir? **36 m** / 72 m / 54 m. Dayandığı anlatım: 7–10. İpuçları: "İki oran da 1/3: tel, 108'in üçte biri." · "72 m, 2/3 oranının sonucuydu."

Soru (`tag: 'Sıra sende'`; yeni durum; yeni tarla: A (1, 2), F (1, 10), M (13, 10); AF 8 aralık, FM 12 aralık; |AM| = √208 ≈ 14,42 birim = 52 m; D (1, 4) ve H (10, 10) işaretli; tahtada "|AM| = 52 m"): Bu tarlada F'den 6 aralıktaki direk ile F'den 9 aralıktaki direk arasına tel çekiliyor. Tel kaç metredir? **39 m** / 13 m / 46 m. Dayandığı anlatım: 7–10. İpuçları: "Önce oranlar: 6/8 ve 9/12." · "İkisi de 3/4; tel |AM|'nin dörtte üçü." Gör: DH ölçeklenir; 3/4 × 52 = 39.

Sonra:
11. Bölme noktalarını aynı oranda seçince ölçmeye gerek kalmaz.

Defter ("Küçük kenar"): **Küçük kenar = oran × büyük kenar.** 2/3 × 108 = 72.

### Çıkış soruları

1. (yanılgı) Ali, AB üzerinde bir D, AC üzerinde bir E noktası seçip birleştirdi ve "iki nokta da kenar üzerinde, o hâlde ADE üçgeni ABC'ye benzerdir" dedi. Ali için hangisi doğrudur? **Yanlış; |AD|/|AB| ile |AE|/|AC| eşit olmalı** / Doğru; A açısı iki üçgende ortak / Doğru; iki nokta farklı kenarlarda olması yeter. (sahne 2, 4)
2. (yeni durum; ölçek 1 birim = 2 cm; dik üçgen ABC: A (2, 9), B (2, 3), C (10, 9); D (2, 4,5), E (8, 9); tahtada |AB| = 12 cm, |AD| = 9 cm, |AC| = 16 cm, |AE| = 12 cm, |BC| = 20 cm) |DE| kaç cm'dir? **15 cm** / 11 cm / 27 cm. (sahne 2)
3. (yeni durum) Bir üçgenin AB kenarı 5 eşit, AC kenarı 10 eşit parçaya bölünmüş. AB üzerinde A'dan 2. nokta ile AC üzerinde A'dan kaçıncı nokta birleştirilirse benzer üçgen oluşur? **4. nokta** / 2. nokta / 5. nokta. (sahne 3)
4. (yeni durum; ölçek 1 birim = 5 m; A (1, 1), F (1, 10), M (13, 10); AF 9 aralık, FM 12 aralık; D (1, 4), H (9, 10); tahtada |AM| = 75 m) Bir tarlada AF kenarı 9, FM kenarı 12 eşit aralığa bölünmüş, |AM| = 75 m. F'den 6 aralıktaki direk ile F'den 8 aralıktaki direk arasındaki tel kaç metredir? **50 m** / 25 m / 69 m. (sahne 5)
5. |AD|/|AB| = |AE|/|AC| ve A açısı ortak olduğuna göre ADE ile ABC hangi koşula göre benzerdir? **Kenar-Açı-Kenar** / Açı-Açı / Kenar-Kenar-Kenar. (sahne 2)

Özet: İki kenarda aynı oranda alınan noktalar küçük bir benzer üçgen verir. · Rastgele alınan noktalar çoğu zaman vermez. · **Aynı oranda böl, benzer üçgen çıksın.** · Küçük kenar, oran çarpı büyük kenardır.

## C2 · Kenara paralel çiz

- **Fikir:** Üçgenin bir kenarına paralel çizilen doğru, üçgenin içinde, dışında ya da köşenin öbür yanında ona benzer bir üçgen oluşturur.
- **Giriş ekranı sorusu:** Bir çatı makasına kirişe paralel bir ara çubuk takılınca üstte kalan küçük üçgen çatıya benzer mi?
- **Kaynak:** Ders kitabı s. 55 (9. uygulama "Paralel Çizme": kenarlara paralel çizip benzerlik koşulunu ve oranları bulma; 11. Sıra Sizde), s. 56 (16. örnek: D'den AB'ye paralel çizip |AD| = |DC|, |AB| = 6, |BE| = 10, |EC| = 4, m(ABC) = 70° iken m(DEC) = 125°), s. 57 (17. örnek: paralel çizip A.A. ile benzer üçgen), s. 58 (Kontrol Noktası: d1 ∥ d2 ise ADE ~ ABC (A.A.), |AD|/|AB| = |AE|/|AC| = |DE|/|BC|), s. 59 (alıştırma 4: 15 basamaklı merdiven, 4 m yükseklik), s. 64 (kenar notu: iki paralel arasındaki ters yerleşmiş üçgenler; yalnızca şekil olarak). Yöndeş, iç ters ve ters açılar ön bilgidir (3. tema; kitap B konusunda da kullanır, s. 46–49). Çatı, Sıra sende ve çıkış sorularındaki sayılar örnek veridir; merdivenin "15 basamak" ölçüsü kitapta ilk basamağın yerini belirtmediği için burada ayağın bir aralık yukarısı ve 15. basamak uçta olacak biçimde tanımlanmıştır.
- **Sınır:** Tales, temel orantı ve orta taban adı anılmaz. |AD|/|DB| = |AE|/|EC| (kenarları aynı oranda bölme) bu derste çıkarılmaz (D1'in işidir); yalnızca benzer üçgenlerin karşılıklı kenar oranları yazılır. Yöndeş, iç ters ve ters açılar kural olarak anlatılmaz, şekille hatırlatılır. Kenar notundaki a/d = b/c = e/f kural olarak alınmaz; S5'te yalnızca benzer üçgenin kenar oranı yazılır.
- **Güç kavramlar ve gösterimi:** (1) Paralel çizgi köşeden uzaklaşırken içteki üçgen büyür, kirişin üstüne gelince üçgenle çakışır (oran 1, eş), aşağı inince büyük benzer üçgen olur; açı işaretleri hiç değişmez (S4 kaydırıcı). (2) Eşit açılar aynı renkte işaretlenir: yöndeş ve iç ters açı çiftleri önce iki doğru ve bir keseni gösteren küçük bir "Z" ya da "F" çizimiyle hatırlatılır, sonra üçgene taşınır. (3) Oranı parçalarla değil bütün kenarla kurmak: |AD| ile |AB| aynı renkte (karşılıklı kenarlar), |DB| soluk.
- **Hedeflenen yanılgı:** Oranı |AD|/|DB| = |DE|/|BC| diye, parçayı kenarla eşleyerek kurmak.
- **Akılda kalıcı cümle:** Kenara paralel çizersen benzer üçgen çıkar.

Çatı (S2–S4): ABC: A (8, 2), B (3, 7), C (13, 7); AB ve AC birer eşit kenar (A açısı 90°, B ve C 45°; çizim için); |BC| = 10 birim = 10 m. D, AB'nin 2/5'inde: D (6, 4); E (10, 4); |DE| = 4 m. AB beş eşit parçaya ayrılır (D ikinci bölme noktası).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (C1) ABC'de D, AB üzerinde; E, AC üzerinde; |AD|/|AB| = |AE|/|AC| = 1/3. |BC| = 12 m ise |DE| kaç metredir? **4 m** / 9 m / 36 m. Yanlışta: "Benzerlik oranı 1/3: |DE| = 1/3 × 12 = 4."
2. (B4) Bir üçgenin iki açısı 50° ve 60°; başka bir üçgenin iki açısı 60° ve 70°. İki üçgen için hangisi doğrudur? **Benzerdir; ikisinin de açıları 50°, 60°, 70°** / Benzer değildir; açıları farklıdır / Bilinemez; kenarlar verilmedi. Yanlışta: "İki açı eşitse üçüncü de eşittir: 180° − 110° = 70° ve 180° − 130° = 50°."

### Sahne 2 · Çatıya ara çubuk

Tahta: mavi çatı ABC (A tepede, BC yatay kiriş "10 m"). Ara çubuk DE mor kesikli çizgiyle köşeden kayarak yerine gelir (D (6, 4), E (10, 4); "4 m"). Önce iki doğru ve bir keseni gösteren küçük "F" şekli (yöndeş açılar eşit işaretli); sonra aynı işaretler çatıya taşınır: ADE ile ABC turuncu, AED ile ACB yeşil, A açısı mavi.

Anlatım:
1. Bir çatı makasında BC kirişi yatay.
2. Usta kirişe paralel bir ara çubuk takıyor: DE.
3. İki paralel doğruyu bir doğru keserse yöndeş açılar eşittir. (ön bilgi)
4. AB doğrusu keser: ADE açısı ile ABC açısı yöndeş.
5. AC doğrusu da keser: AED açısı ile ACB açısı yöndeş.
6. Böylece ADE açısı ABC açısına, AED açısı ACB açısına eşit.
7. A açısı iki üçgende ortak.
8. İki açı eşit: ADE ~ ABC (Açı-Açı).
9. Benzer üçgenlerde karşılıklı kenarlar orantılıdır.
10. |AD|/|AB| = |AE|/|AC| = |DE|/|BC|.
11. D, AB'nin beş eşit parçasından ikisinde: |AD|/|AB| = 2/5.
12. |BC| = 10 m ise |DE| = 2/5 × 10 = 4.

Birlikte çöz (`tag: 'Birlikte çöz'`; aynı çatı, ara çubuk aşağı kaymış: D (5, 5), E (11, 5); tahtada "DE ∥ BC", "ADE ~ ABC (A.A.)", "|AD|/|AB| = 3/5", "|BC| = 10 m", "|DE| = ?"): |DE| kaç metredir? **6 m** / 7 m / 16 m. Dayandığı anlatım: 8–12. İpuçları: "Benzerlik oranı 3/5: |DE|, |BC|'nin beşte üçü." · "Çıkarma değil çarpma: 3/5 × 10."

Soru (`tag: 'Sıra sende'`; yeni durum; B (3, 9), C (12, 9), A (5,72; 1,52); D (4,63; 4,51), E (8,23; 4,51); DE ∥ BC; tahtada "A açısı 60°", "ADE açısı 70°"; ABC ve ACB açıları gösterilmez): DE ∥ BC çizildi. A açısı 60°, ADE açısı 70°. ACB açısı kaç derecedir? **50°** / 60° / 70°. Dayandığı anlatım: 3–8 ve sahne 1 (2. soru). İpuçları: "Yöndeş açılar eşit: ABC açısı da 70°." · "ABC'de iç açılar toplamı 180°: 180° − 60° − 70°." Gör: ABC'nin açıları 60°, 70°, 50°; ADE'nin açıları aynı.

Defter ("Paralel çizgi"): **Paralel çizgi:** ADE ~ ABC (Açı-Açı); |AD|/|AB| = |DE|/|BC|.

### Sahne 3 · Hangi kenar hangisi?

Tahta: dik üçgen ABC: A (2, 1), B (2, 9), C (14, 9); D (2, 7), E (11, 7); DE ∥ BC. Yan kutuda iki üçgen, karşılıklı kenarlar aynı renkte: AD ile AB yeşil, AE ile AC turuncu, DE ile BC mavi; DB soluk. "|AD| = 6", "|DB| = 2", "|BC| = 12".

Anlatım:
1. ADE ile ABC benzer: ADE küçük, ABC büyük üçgendir.
2. Oran kurarken küçük üçgenin kenarı büyüğündeki karşılığıyla eşlenir.
3. AD, ADE'nin kenarı; karşılığı ABC'de AB'dir.
4. DB, AB'nin ADE'nin dışında kalan parçasıdır; karşılığı yoktur.
5. Doğru oran: |AD|/|AB| = |DE|/|BC|.
6. |AD| = 6, |DB| = 2 ise |AB| = 8.
7. Oran |AD|/|AB| = 6/8 = 3/4.
8. |BC| = 12 m ise |DE| = 3/4 × 12 = 9.

Soru (`tag: 'Sıra sende'`; yeni durum; A (2, 1), B (2, 9), C (10, 9); D (2, 4), E (5, 4); tahtada "|AD| = 3", "|DB| = 5", "|DE| = 3"; BC gösterilmez): |BC| kaç metredir? **8 m** / 5 m / 15 m. Dayandığı anlatım: 2–8. İpuçları: "Önce |AB|'yi bul: 3 + 5. Sonra |AD|/|AB| = |DE|/|BC|." · "|AD|/|DB| ile oran kurmak yanlış: DB'nin karşılığı yok." Gör: AB = 8, oran 3/8, 3/8 = 3/|BC|, |BC| = 8.

Defter ("Oranı kenarla kur"): **Oranı kenarla kur:** |AD|/|AB| = |DE|/|BC|. DB kullanılmaz.

### Sahne 4 · Kirişin altına inerse

Tahta: aynı çatı. AB ve AC kesikli olarak B ve C'nin ötesine uzatılır; P (1, 9) ve Q (15, 9). PQ mor, BC'ye paralel. "|AB|" beş parça, "|AP|" yedi parça gösterilir; yöndeş açılar işaretlenir (APQ turuncu, AQP yeşil). Dene: ara çubuk tek bir çizgi olarak kayar.

Anlatım:
1. Kenarlar uzatılırsa kirişin altında yeni bir paralel çizilebilir.
2. AB'yi P'ye, AC'yi Q'ya kadar uzatalım; PQ ∥ BC.
3. Yöndeş açılar yine eşit: APQ açısı ABC açısına eşit.
4. AQP açısı ACB açısına eşit; A açısı ortak.
5. İki açı eşit: APQ ~ ABC; bu kez büyük üçgen.
6. AB beş parçadır; AP aynı parçalardan yedi tanedir.
7. |AP|/|AB| = 7/5: oran 1'den büyük.
8. |PQ| = 7/5 × |BC| = 7/5 × 10 = 14.

Soru (`tag: 'Sıra sende'`; yeni durum; ölçek 1 birim = 1 m; A (2, 1), B (2, 7), C (10, 7), P (2, 10), Q (14, 10); tahtada "|AB| = 6", "|AP| = 9", "|BC| = 8"; PQ ∥ BC): |PQ| kaç metredir? **12 m** / 11 m / 16 m. Dayandığı anlatım: 5–8. İpuçları: "Oran |AP|/|AB| = 9/6 = 3/2: büyük üçgen." · "Toplama değil çarpma: 3/2 × 8." Gör: PQ ölçeklenir; 3/2 × 8 = 12.

Dene (`c.slider`, "Ara çubuğun yeri", çizginin satırı r = 3 → 9, adım 1; `noWait` yönerge: "Çubuğu kaydır; açılara ve oranlara bak."): D ve E yer değiştirir (D (10 − r, r), E (6 + r, r)). Tahtada |AD|/|AB| = (r − 2)/5 ve |DE| (m): r = 3 → 1/5 ve 2; 4 → 2/5 ve 4; 5 → 3/5 ve 6; 6 → 4/5 ve 8; 7 → 1 ve 10; 8 → 6/5 ve 12; 9 → 7/5 ve 14. Açı işaretleri sabittir (A 90°, 45°, 45°; ADE ve ABC'de eşit işaretler). r = 7'de ADE, ABC ile çakışır ve "oran 1: eş" yazılır; r = 8, 9'da büyük üçgen belirir.

Sonra:
9. Çubuk nerede olursa olsun açılar hiç değişmedi.
10. Çubuk kirişe gelince oran 1 oldu: üçgenler eş.
11. Kirişin altında üçgen büyür, üstünde küçülür.

Defter ("Dışta paralel"): **Dışta da çalışır:** APQ ~ ABC; |AP|/|AB| = |PQ|/|BC|.

### Sahne 5 · Köşenin öbür yanında

Tahta: ABC: B (3, 9), C (13, 9), A (8, 4). BA ve CA, A'nın ötesine kesikli uzatılır; D (10, 2) (BA uzantısında), E (6, 2) (CA uzantısında); DE mor, BC'ye paralel. "Kelebek" biçimi: iki üçgen A köşesinde tepe tepeye. İç ters açılar Z biçimli çizgiyle işaretlenir: ADE ile ABC turuncu, AED ile ACB yeşil; DAE ile BAC mavi (ters açılar).

Anlatım:
1. Paralel çizgi köşenin öbür yanından da geçebilir.
2. BA'yı A'nın ötesinde D'ye, CA'yı E'ye uzatalım.
3. DE, BC'ye paralel olsun.
4. DAE açısı ile BAC açısı ters açılardır; eşittir. (ön bilgi)
5. DE ∥ BC: ADE açısı ile ABC açısı iç ters açılardır.
6. İç ters açılar eşittir; AED açısı ile ACB açısı da öyle.
7. İki açı eşit: ADE ~ ABC; D, B'ye; E, C'ye karşılık gelir.
8. Üçgen karşı yana geçmiş görünür, ama benzerdir.
9. |AD|/|AB| = |AE|/|AC| = |DE|/|BC|.
10. AD, AB'nin beşte ikisi: |AD|/|AB| = 2/5.
11. |BC| = 10 m ise |DE| = 2/5 × 10 = 4.

Soru (`tag: 'Sıra sende'`; yeni durum; B (4, 9), A (4, 3), C (13, 9), D (4, 1), E (1, 1); tahtada "|AB| = 6", "|AD| = 2", "|DE| = 3"; BC gösterilmez; D, A, B doğrusal; E, A, C doğrusal): DE ∥ BC. |BC| kaç metredir? **9 m** / 8 m / 1 m. Dayandığı anlatım: 7–11. İpuçları: "Oran |AD|/|AB| = 2/6 = 1/3; DE, BC'nin üçte biri." · "Küçük üçgen 3 m ise büyük üçgen 3 × 3 m." Gör: |AD|/|AB| = 1/3 yazılır; |BC| = 3 × 3 = 9.

Defter ("Öbür yan"): **Öbür yanda:** iç ters açılar eşit; yine ADE ~ ABC.

### Sahne 6 · Paralel çiz, benzerlik kur

Tahta: ABC: B (1, 7), C (15, 7), A (3,05; 1,36); D (9,03; 4,18) (AC'nin orta noktası, DC ve AD'de aynı çentik); E (11, 7). Etiketler: "|AB| = 6", "|BE| = 10", "|EC| = 4", B'de "70°". "DEC açısı = ?" Sonra D'den AB'ye paralel kesikli çizgi inip BC'yi K'de (8, 7) keser (|CK| = 7); DK ve AB'de aynı açı işaretleri.

Anlatım:
1. |AD| = |DC|, |AB| = 6, |BE| = 10, |EC| = 4.
2. B açısı 70°. DEC açısı kaç derecedir?
3. Bu açı hiçbir üçgende doğrudan bulunamıyor.
4. D'den AB'ye paralel çizelim; BC'yi K'de kessin.
5. DK ∥ AB: DKC açısı ile ABC açısı yöndeş; DKC = 70°.
6. C açısı CDK ve CAB üçgenlerinde ortak.
7. İki açı eşit: CDK ~ CAB.
8. D, AC'nin ortası: |DC|/|AC| = 1/2.
9. Öyleyse |CK|/|CB| = |DK|/|AB| = 1/2.
10. |CB| = 14 olduğundan |CK| = 7.
11. |AB| = 6 olduğundan |DK| = 3.

### Sahne 7 · Açıyı bul

Tahta: aynı şekil; K (8, 7) işaretli; DK ile KE'de aynı çentik; DKE üçgeni sarı çerçeve (taban açıları soluk). Sağda satır satır: "|KE| = 7 − 4 = 3", "DKE ikizkenar", "70°", "55° ve 55°", "DEC = 125°".

Anlatım:
1. |CE| = 4 olduğundan |KE| = 7 − 4 = 3.
2. |DK| = |KE| = 3: DKE ikizkenar üçgen.
3. DKE açısı, DKC açısıyla aynı: 70°.
4. İkizkenarın taban açıları (180° − 70°) ÷ 2 = 55°.
5. DEK açısı 55°.
6. K, E, C doğrusal: DEC = 180° − 55° = 125°.

Soru (`tag: 'Sıra sende'`; yeni durum; B (1, 7), C (13, 7), A (1,69; 3,06); D (7,35; 5,03); K (7, 7), E (9, 7); tahtada "|AD| = |DC|", "|AB| = 4", "|BE| = 8", "|EC| = 4", "B açısı 80°"): Başka bir çizimde |AD| = |DC|, |AB| = 4, |BE| = 8, |EC| = 4 ve B açısı 80°. DEC açısı kaç derecedir? **130°** / 50° / 100°. Dayandığı anlatım: sahne 6 (4–11) ve bu sahne (1–6). İpuçları: "Yine D'den AB'ye paralel çiz: |DK| = 2 ve |CK| = 6." · "|KE| = 6 − 4 = 2; DKE ikizkenar, tepe açısı 80°." Gör: DKE'nin taban açıları 50° görünür; DEC = 130°.

Defter ("Açı bulmak için"): **Yeni üçgen gerekirse** bir kenara paralel çiz.

### Çıkış soruları

1. (yanılgı) DE ∥ BC; D, AB üzerinde; E, AC üzerinde. Hangi eşitlik doğrudur? **|AD|/|AB| = |DE|/|BC|** / |AD|/|DB| = |DE|/|BC| / |AD|/|BC| = |DE|/|AB|. (sahne 3)
2. (yeni durum; ölçek 1 birim = 2 m; A (2, 2), B (2, 4), P (2, 7), C (5, 4), Q (9,5; 7); P, B, A doğrusal; PQ ∥ BC; tahtada |AB| = 4 m, |AP| = 10 m, |BC| = 6 m) |PQ| kaç metredir? **15 m** / 12 m / 2,4 m. (sahne 4)
3. (yeni durum; ölçek 1 birim = 2 m; B (3, 10), A (3, 4), C (13, 10), D (3; 2,5), E (0,5; 2,5); D, A, B doğrusal; E, A, C doğrusal; DE ∥ BC; tahtada |AD| = 3 m, |AB| = 12 m, |DE| = 5 m) |BC| kaç metredir? **20 m** / 14 m / 1,25 m. (sahne 5)
4. DE ∥ BC çizilince ADE üçgeni ile ABC üçgeni hangi koşula göre benzerdir? **Açı-Açı** / Kenar-Açı-Kenar / Kenar-Kenar-Kenar. (sahne 2)
5. (yeni durum; ölçek 1 birim = 1 m; W (3, 10), T (3, 4), G (11, 10); basamak S (7,27; 7,2), dikmenin ayağı F (7,27; 10)) Bir merdivenin ayağı yerde G'de, ucu duvarda T'dedir; T yerden 6 m yüksekte, G duvardan 8 m uzakta, merdivenin boyu 10 m. Merdivende G'den başlayıp uçta biten 15 eşit aralıklı basamak var; 7. basamak ayaktan 7 aralık yukarıda. 7. basamaktan yere duvara paralel bir dikme iniyor. Basamak yerden kaç metre yüksekte? **2,8 m** / 3,2 m / 7 m. (sahne 2; paralel çizip benzer üçgen)

Özet: Bir kenara paralel çizilen doğru benzer bir üçgen verir: içte, dışta ya da köşenin öbür yanında. · Benzerlik Açı-Açı ile kurulur. · Oran bütün kenarla kurulur. · **Kenara paralel çizersen benzer üçgen çıkar.**

## C3 · Dik köşeden inen yükseklik üç benzer üçgen verir

- **Fikir:** Dik üçgende dik köşeden hipotenüse yükseklik çizilince oluşan iki dik üçgen birbirine ve ilk üçgene benzerdir.
- **Giriş ekranı sorusu:** Bir gönyeyi dik köşesinden karşı kenara dik bir çizgiyle kesersen çıkan iki parça gönyeyle aynı biçimde midir?
- **Kaynak:** Ders kitabı s. 58 (18. örnek: köprü halatları; |PR| ⊥ |PS|, |PH| ⊥ |RG|, |RH| = 40 m; Açı-Açı ile PRH, SPH ve SRP benzerliği, a + b = 90°, |PH| = 60 m; Kontrol Noktası 2. madde), s. 59 (alıştırma 5: |AD| = 3, |DC| = 12 olan dik üçgende yükseklik). Kitap |HS| = 90 m'nin nereden geldiğini yazmaz; kitabın verileriyle çıkar (PRS ≅ TGS ve |HK| = 180 m ise S, HK'nın ortasıdır, |HS| = 90). Ders bunu "H ile S arası 90 m" diye verir. 18. örneğin (c) şıkkı (|PR| ≈ 72, |PS| ≈ 108 m, kareköklü) alınmaz. Birlikte çöz, Sıra sende ve çıkış sorularındaki sayılar örnek veridir.
- **Sınır:** Bu derste yalnızca üç benzer üçgen kurulur ve her soruda oran o anda yazılıp çözülür; |PH|² = |RH| · |HS| türünden genel bağıntı kural olarak yazılmaz ve Öklid adı anılmaz (D3–D4'ün işi). Pisagor, kosinüs ve trigonometri kullanılmaz; kareköklü sonuçlar çıkmaz (sayılar tam kare seçilmiştir).
- **Güç kavramlar ve gösterimi:** Üç üçgen iç içe olduğu için kenar eşleştirmesi güçtür. İki küçük üçgen kesilir, her biri ters çevrilip döndürülür (iki küçük üçgen büyük üçgenin ayna görüntüsü gibi durur) ve büyük üçgenle aynı duruşa getirilir: hipotenüs altta, a açısı solda, b açısı sağda, dik açı üstte. Her kenar karşısındaki açının rengini alır (mavi hipotenüs, turuncu a'nın karşısı, yeşil b'nin karşısı); eşleşme renge göre okunur. PH'nin bir üçgende turuncu, ötekinde yeşil olması ayrıca gösterilir.
- **Hedeflenen yanılgı:** "Küçük üçgenler birbirine eştir" ve harf sırasına bakmadan kenar eşlemek.
- **Akılda kalıcı cümle:** Dik köşeden inen yükseklik üç benzer üçgen verir.

Ana şekil: dik üçgen PRS (P'de dik). R (1, 10), S (14, 10), P (5, 4); yükseklik ayağı H (5, 10). |RH| = 4, |HS| = 9, |PH| = 6, |RS| = 13, |PR| = √52 ≈ 7,21, |PS| = √117 ≈ 10,82 birim. R açısı a ≈ 56,3°, S açısı b ≈ 33,7°; a + b = 90°. Köprü örneğinde 1 birim = 10 m (|RH| = 40 m, |HS| = 90 m, |PH| = 60 m). Üç üçgenin yan yana gösterildiği çizimde ölçek 0,4'tür (hipotenüsler 5,2 · 2,9 · 4,3 birim).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (C2) DE ∥ BC çizilince ADE üçgeni ABC üçgenine benzer çıktı. Bu benzerlik hangi koşula dayanır? **Açı-Açı** / Kenar-Açı-Kenar / Kenar-Kenar-Kenar. Yanlışta: "Yöndeş açılar eşit ve A açısı ortak: iki açı eşit, Açı-Açı."
2. (B4) Bir dik üçgende dar açılardan biri 25°. Öbür dar açı kaç derecedir? **65°** / 75° / 155°. Yanlışta: "İç açılar toplamı 180°: 180° − 90° − 25° = 65°."

### Sahne 2 · Gönyeyi kes

Tahta: mavi dik üçgen (gönye) PRS; P'de dik açı işareti (mavi). Sonra P'den RS'ye sarı dik çizgi iner: PH, H'de dik açı işareti. PRS iki küçük üçgene ayrılır: PRH ve PHS. R açısı turuncu "a", S açısı yeşil "b" yaylarıyla işaretlenir. Sağda "a + b = 90°".

Anlatım:
1. Bir gönyenin dik köşesi P; karşısındaki kenar RS, hipotenüs.
2. P'den RS'ye dik bir çizgi indirelim: PH.
3. PH bir yüksekliktir; H, RS üzerindedir.
4. PH gönyeyi iki küçük dik üçgene ayırdı: PRH ve PHS.
5. PRS'de R açısına a, S açısına b diyelim.
6. Dik üçgende iki dar açının toplamı 90°: a + b = 90°.

Birlikte çöz (`tag: 'Birlikte çöz'`; PRH vurgulanır; tahtada "R açısı = a", "H açısı = 90°", "RPH açısı = ?"): PRH üçgeninde R açısı a, H açısı 90°. RPH açısı kaçtır? **b** / a / 90°. Dayandığı anlatım: 5–6. İpuçları: "İç açılar toplamı 180°: a + 90° + ? = 180°." · "a + b = 90° olduğundan 90° − a = b."

Soru (`tag: 'Sıra sende'`; PHS vurgulanır; tahtada "S açısı = b", "H açısı = 90°", "HPS açısı = ?"): PHS üçgeninde S açısı b, H açısı 90°. HPS açısı kaçtır? **a** / b / 90°. Dayandığı anlatım: 5–6 ve Birlikte çöz. İpuçları: "Yine iç açılar toplamı: b + 90° + ? = 180°." · "90° − b = a, çünkü a + b = 90°." Gör: üç üçgende a (turuncu), b (yeşil) ve 90° (mavi) işaretleri belirir.

Sonra:
7. Üç üçgenin açıları da a, b ve 90°.

### Sahne 3 · Üç benzer üçgen

Tahta: üç üçgen yan yana (ölçek 0,4; PRS: hipotenüs 5,2; PRH: hipotenüs 2,9; PHS: hipotenüs 4,3 birim). İki küçük üçgen kesilir, ters çevrilir ve büyükle aynı duruşa döndürülür: hipotenüs altta, a açısı solda (turuncu), b açısı sağda (yeşil), dik açı üstte (mavi). Her kenar karşısındaki açının rengini alır. Altta tablo (hücreler Birlikte çöz ve Sıra sende'de dolar): PRS: mavi RS · turuncu PS · yeşil PR; PRH: mavi PR · turuncu PH · yeşil RH; PHS: mavi PS · turuncu HS · yeşil PH.

Anlatım:
1. İki açısı eşit olan üçgenler benzerdir: Açı-Açı.
2. Üç üçgenin açıları a, b ve 90°: üçü de benzer.
3. Küçük iki üçgeni kesip ters çevirelim ve büyükle aynı duruşa getirelim.
4. Hepsinde a solda, b sağda, dik açı üstte.
5. Benzerliği yazarken eşit açılar aynı sırada yazılır.
6. PRS ~ HRP: P–H, R–R, S–P karşılıklıdır.
7. Her kenar karşısındaki açının rengini alır.
8. Hipotenüs dik açının karşısında: mavi.
9. a'nın karşısındaki kenar turuncu, b'nin karşısındaki yeşil.

Birlikte çöz (`tag: 'Birlikte çöz'`; tabloda PRH satırının yeşil hücresi boş): PRH'de yeşil kenar hangisidir? **RH** / PH / PR. Dayandığı anlatım: 7–9. İpuçları: "PRH'de b açısı P köşesinde; karşısındaki kenarı bul." · "PR hipotenüs (mavi), PH turuncu; geriye RH kalır."

Soru (`tag: 'Sıra sende'`; tabloda PHS satırının yeşil hücresi boş): PHS'de yeşil kenar hangisidir? **PH** / HS / PS. Dayandığı anlatım: 7–9 ve tablo. İpuçları: "PHS'de b açısı S köşesinde; karşısı hangi kenar?" · "PS hipotenüs (mavi), HS turuncu." Gör: PH iki üçgende de belirir: PRH'de turuncu, PHS'de yeşil.

Sonra:
10. PH, bir üçgende turuncu, ötekinde yeşildir.
11. Benzer üçgenlerde aynı renkli kenarlar karşılıklıdır.
12. Böylece üç benzerliği yazarız: PRS ~ HRP ~ HPS.

Defter ("Üç benzer üçgen"): **Dik köşeden inen yükseklik:** üç benzer üçgen. PRS ~ HRP ~ HPS.

### Sahne 4 · Köprü halatları

Tahta: köprünün yandan görünüşü (ölçek 1 birim = 10 m). R (1, 10), H (5, 10), S (14, 10) zemin çizgisi üzerinde; P (5, 4) kule başı. PR ve PS halat (kalın çizgi); PH sarı dikme; P'de dik açı işareti. "40 m" (RH), "90 m" (HS), "PH = ?". Renkler: PRH'de PH turuncu, RH yeşil; PHS'de HS turuncu, PH yeşil.

Anlatım:
1. Bir köprünün iki halatı P noktasında dik açı yapar.
2. Halatlar PR ve PS; P'den yere inen dikme PH.
3. R ile H arası 40 m, H ile S arası 90 m.
4. PRS bir dik üçgen, PH de yüksekliğidir.
5. Öyleyse PRH ile PHS benzerdir.
6. PRH'de PH turuncu, RH yeşildir.
7. PHS'de HS turuncu, PH yeşildir.
8. Turuncu bölü yeşil oranı iki üçgende eşittir.
9. |PH|/|RH| = |HS|/|PH|; yani |PH|/40 = 90/|PH|.
10. |PH| × |PH| = 40 × 90 = 3600.
11. 60 × 60 = 3600: |PH| = 60 m.

Birlikte çöz (`tag: 'Birlikte çöz'`; ölçek 1 birim = 1 m; K (1, 9), N (2, 9), M (11, 9), L (2, 6); KLM dik üçgeni L'de dik, LN yükseklik; tahtada "KLN: turuncu LN, yeşil KN", "LNM: turuncu NM, yeşil LN", "|LN|/|KN| = |NM|/|LN|", "|LN|/1 = 9/|LN|", "|LN| × |LN| = 9"): |KN| = 1 m ve |NM| = 9 m. |LN| kaç metredir? **3 m** / 5 m / 9 m. Dayandığı anlatım: 6–11. İpuçları: "Hangi sayıyı kendisiyle çarpınca 9 olur?" · "5, 1 ile 9'un ortası; burada çarpım aranıyor."

Soru (`tag: 'Sıra sende'`; yeni durum; ölçek 1 birim = 1 m; R (2, 9), H (4, 9), S (12, 9), P (4, 5); tahtada "|RH| = 2 m", "|PH| = 4 m", "|HS| = ?"): Başka bir köprüde |RH| = 2 m ve |PH| = 4 m. |HS| kaç metredir? **8 m** / 6 m / 2 m. Dayandığı anlatım: 6–10. İpuçları: "Turuncu bölü yeşil: PRH'de 4/2, PHS'de |HS|/4." · "4/2 = |HS|/4 olduğundan |HS| = 2 × 4." Gör: oranlar yazılır: 4/2 = 8/4 = 2.

Sonra:
12. Üç benzer üçgen, bilinmeyen uzunluğu bulmamızı sağlar.

Defter ("Oran kur"): **Turuncu/yeşil eşit:** |PH|/40 = 90/|PH|; |PH| = 60.

### Sahne 5 · a değişirse

Tahta: ana şekil, hipotenüs RS (R (1, 10), S (14, 10)) sabit; P, a açısına göre yer değiştirir: P = (1 + 13 cos²a, 10 − 13 sin a cos a), H = (P'nin sütunu, 10). Alt kısımda üç üçgen yan yana, hep aynı duruşta; her birinde a, 90° − a ve 90° işaretli. Sağda |RH| = 13 cos²a ve |HS| = 13 sin²a (birim, bir ondalık: a = 20° için 11,5 ve 1,5; 30° için 9,8 ve 3,3; 45° için 6,5 ve 6,5; 60° için 3,3 ve 9,8; 70° için 1,5 ve 11,5).

Anlatım:
1. Dik açı yerinde kalsın, a açısını değiştirelim.
2. Yükseklik yine hipotenüse iner.
3. Üç üçgenin açılarına ve küçük iki üçgenin boyuna bakalım.

Dene (`c.slider`, "a açısı", 20°–70°, adım 5°; `noWait` yönerge: "a'yı değiştir; açılara ve küçük üçgenlerin boyuna bak."): üç üçgenin açıları a, 90° − a, 90° olarak güncellenir; |RH| ve |HS| değişir. a = 45° olunca |RH| = |HS|, iki küçük üçgen üst üste oturur ve "eş" yazılır; başka değerlerde "eş değil" yazılır. "Devam" ile biter.

Sonra:
4. a açısı ne olursa olsun üç üçgen benzerdir.
5. Yalnızca a = 45° iken küçük üçgenler eştir.
6. Başka açılarda küçük üçgenler benzerdir, eş değildir.

Soru (`tag: 'Sıra sende'`; yanılgı; köprü şekli, |RH| = 40 m, |HS| = 90 m, |PH| = 60 m): Köprüde |RH| = 40 m, |HS| = 90 m ve |PH| = 60 m. PRH ile PHS için hangisi doğrudur? **Benzerdir; eş değildir** / Eştir; PH ortak kenardır / Benzer değildir; kenarları farklıdır. Dayandığı anlatım: sahne 3, 4–6. İpuçları: "Açıları aynı: benzerdir. Kenarlar 40 ile 90, 60 ile 40: aynı değil." · "Ortak kenar tek başına eşlik vermez; benzerlik oranı 3/2." Gör: PRH, PHS'nin üstüne yerleştirilir; taşan kısım gösterilir; "oran 3/2" yazılır.

Defter ("Küçük üçgenler"): **Küçük üçgenler** benzerdir; eş olmaları gerekmez.

### Çıkış soruları

1. (yanılgı) Dik üçgende dik köşeden hipotenüse yükseklik çizildi. Oluşan iki küçük dik üçgen için hangisi doğrudur? **Birbirine ve ilk üçgene benzerdir** / Birbirine eştir / Yalnızca ilk üçgene benzerdir. (sahne 3, 5)
2. (yeni durum) Bir dik üçgenin dar açılarından biri 35°. Yüksekliğin ayırdığı iki küçük üçgenin dar açıları kaç derecedir? **35° ve 55°** / 35° ve 35° / 45° ve 45°. (sahne 2)
3. (yeni durum) PRS ~ HRP yazılmıştır. RS kenarının karşılığı hangisidir? **RP** / HR / HP. (sahne 3)
4. (yeni durum; ölçek 1 birim = 1 cm; K (3, 9), N (4, 9), M (8, 9), L (4, 7)) KLM dik üçgeninde L'de dik açı var; LN, KM'ye dik; |KN| = 1 cm, |NM| = 4 cm. |LN| kaç cm'dir? **2 cm** / 2,5 cm / 4 cm. (sahne 4)
5. (yeni durum; ana şekil, ölçek 1 birim = 1 cm; R (1, 10), H (5, 10), P (5, 4); S gösterilmez) Bir dik üçgende yükseklik 6 cm ve hipotenüsün parçalarından biri 4 cm. Öteki parça kaç cm'dir? **9 cm** / 2 cm / 10 cm. (sahne 4)

Özet: Dik üçgende dik köşeden inen yükseklik, ilk üçgenle birlikte üç dik üçgen oluşturur. · Üçünün de açıları a, b ve 90°'dir; üçü benzerdir. · **Dik köşeden inen yükseklik üç benzer üçgen verir.** · Küçük iki üçgen benzerdir; eş olmaları gerekmez.

## C4 · Konu tekrarı: Benzer üçgenler oluşturma (`c4-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (iki kenarda aynı oranda noktalar · bir kenara paralel çizgi · paralel çizginin içte, dışta ve köşenin öbür yanında üç yeri · dik üçgende yükseklik ve üç üçgen · iki üçgende aynı renkli karşılıklı kenarlar · bir benzerlik oranı ve bilinmeyen kenar) ve deftere düşer. Biten kural soluklaşır.

Anlatım:
1. Bir üçgene benzer üçgen oluşturmanın yollarını toplayalım.
2. İki kenarda aynı oranda nokta alıp birleştirmek: Kenar-Açı-Kenar.
3. Bir kenara paralel çizmek: Açı-Açı.
4. Paralel içte, dışta ya da köşenin öbür yanında olabilir.
5. Dik üçgende dik köşeden yükseklik çizmek: üç benzer üçgen.
6. Oran, karşılıklı kenarlar arasında kurulur; parça ile bütün karıştırılmaz.
7. Oranı kurup bilinmeyen uzunluğu buluruz.

Defter ("Benzer üçgen yolları"): **Üç yol:** aynı oran, paralel çizgi, dik köşeden yükseklik.

Sorular (`quiz`, karışık sırada):

1. (ölçek 1 birim = 1,5 cm; A (1, 3), B (1, 9), C (15, 9), D (1, 5), E (5,67; 5)) DE ∥ BC; D, AB üzerinde; E, AC üzerinde; |AD| = 3 cm, |DB| = 6 cm, |BC| = 21 cm. |DE| kaç cm'dir? **7 cm** / 10,5 cm / 18 cm. — C2 (10,5 = 3/6 × 21; 18 = 21 − 3)
2. AB'nin 8, AC'nin 12 eşit parçaya bölündüğü bir üçgende AB üzerinde A'dan 6. nokta ile AC üzerinde A'dan kaçıncı nokta birleştirilirse benzer üçgen oluşur? **9. nokta** / 6. nokta / 8. nokta. — C1
3. (ölçek 1 birim = 2 cm; R (1, 10), H (5,5; 10), P (5,5; 4), S (13,5; 10); S gösterilmez) Dik üçgende dik köşeden inen yükseklik 12 cm ve hipotenüsün parçalarından biri 9 cm. Öteki parça kaç cm'dir? **16 cm** / 15 cm / 21 cm. — C3 (12/9 = x/12)
4. (A (1, 10), B (5, 4), C (14, 10), D (5, 10); B'de dik; BD ⊥ AC) ABC üçgeninde B'de dik açı var, BD, AC'ye dik. Hangisi doğrudur? **ABC ~ ADB** / ABC ~ ABD / ABC ~ BAD. — C3
5. (ölçek 1 birim = 2 cm; B (3, 8), A (3, 4), C (9, 8), D (3, 3), E (1,5; 3)) D, A, B doğrusal; E, A, C doğrusal; DE ∥ BC; |AD| = 2 cm, |AB| = 8 cm, |BC| = 12 cm. |DE| kaç cm'dir? **3 cm** / 6 cm / 4 cm. — C2
6. ABC üçgeninde D, AB üzerinde; E, AC üzerinde. Hangisi tek başına ADE ~ ABC olduğunu garanti etmez? **|AD|/|AB| = 1/3 ve |AE|/|AC| = 1/2** / DE ∥ BC / |AD|/|AB| = |AE|/|AC| = 2/5. — C1, C2
7. (B (3, 9), C (11, 9), A (6,57; 1,33); D (4,79; 5,17), E (8,79; 5,17)) DE ∥ BC; A açısı 55°, ADE açısı 65°. ACB açısı kaç derecedir? **60°** / 55° / 65°. — C2
8. Bir tarlada AF kenarı 8, FM kenarı 12 eşit aralığa bölünmüş. F'den hangi iki uzaklıktaki direkler arasına çekilen telin boyu benzer üçgenle hesaplanabilir? **6 ve 9 aralık** / 6 ve 6 aralık / 5 ve 8 aralık. — C1

Akılda kalıcı cümle: Benzer üçgen üç yoldan çıkar: aynı oran, paralel çizgi, dik köşeden yükseklik.

## Program metniyle karşılaştırma (9 Ekim 2026)

| Programın istediği (MAT.9.4.3) | Karşılığı |
|---|---|
| Bir üçgene benzer üçgenler oluştururken eşlik ve benzerlik deneyimlerini gözden geçirme (a) | C1 sahne 1, 2 (Kenar-Açı-Kenar'ı kullanma); C2 sahne 1, 2; C3 sahne 1, 3; C4 sahne 1 |
| Benzer üçgen oluşturmak için hangi çizimlerin nasıl yapılacağı; çizim ile benzerlik koşulu arasında ilişki (uygulama metni) | C1 sahne 2–3 (aynı oranlı noktalar ↔ Kenar-Açı-Kenar); C2 sahne 2, 4, 5 (paralel ↔ Açı-Açı); C3 sahne 2–3 (yükseklik ↔ Açı-Açı). Fikirlerin sınıfta paylaşılması `site dışı` |
| Farklı çizimlerin yapılıp yapılamayacağı; seçilen tüm yolların denenmesi; deneyimlere dayalı çıkarım (b) | benzetim: C1 sahne 3–4 (hangi çift, kaydırıcıda yalnızca eşit oranlı nokta); C2 sahne 4 (kaydırıcı: içte, kirişte, dışta); C3 sahne 5 (kaydırıcı: a açısı) |
| Bir üçgene benzer üçgen oluşturan tüm durumlar hakkında çıkarım | C4 sahne 1 (üç yol); C1 sahne 4, C2 sahne 4–5, C3 sahne 5'in sonuç cümleleri |
| Kenara paralel çizerek üçgenin içinde veya dışında benzer üçgen | C2 sahne 2, 4 (içte, dışta); sahne 5 (köşenin öbür yanında) |
| Dik üçgende dik açıdan yükseklikle oluşan üçgenler birbirine ve ilk üçgene benzer | C3 sahne 2–3 |
| Çıkarımları farklı problem durumlarında kullanma (c) | C1 sahne 2, 5 (havuz, tarla); C2 sahne 3, 6–7, çıkış 5 (çatı, açı bulma, merdiven); C3 sahne 4 (köprü); C4 |
| Çıkarımları teoremlerin doğrulanmasında ve ispatında kullanma | Hazırlık: C3 sahne 4 (oran kurup uzunluk bulma), C2 sahne 4–5; ispatlar D1–D5'tedir |
| Verilen görselden yeni görsel oluşturma (OB4) | C1–C3 çizim animasyonları: noktaları birleştirme, paralel çizgi ve uzatma, yükseklik indirme, üçgenleri ayırıp aynı duruşa getirme |
| Yansıtma için çalışma kâğıdı; benzerliklerin hangi özelliklere göre kurgulandığını gösteren performans görevi | `site dışı` |
| Konu tekrarı | C4 |

Fazla olan: C1 sahne 3 sonundaki "LR, BC'ye paraleldir" gözlemi (kitabın 8. uygulama 3. sorusudur; eşit yöndeş açılardan paralellik, Tales'in tersine yaklaşır, bu yüzden yalnızca bu çizime özgü bırakıldı; dersi kodlayan ajan ya da ana oturum isterse sahne 3'ün 9–10. satırlarıyla birlikte atılabilir). C2 sahne 2 ve 5'teki yöndeş, iç ters ve ters açı hatırlatmaları programda yok, ön bilgidir; çıkarım için gereklidir. C2 sahne 6–7 (16. örnek) programın "paralel çizerek benzer üçgen oluşturma" fikrinin uzun bir problemde kullanımıdır. Eksik olan: yok (site dışı kalanlar tabloda).

