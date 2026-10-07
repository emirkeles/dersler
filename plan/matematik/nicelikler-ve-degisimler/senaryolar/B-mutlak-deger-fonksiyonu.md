# Konu B — Mutlak değer fonksiyonu ve nitel özellikleri: kısa senaryolar

Dayanak `../MUFREDAT.md`, MAT.9.2.2 ve `../PLAN.md` (kararlar bölüm 7). Ortak görsel dil, renk rolleri ve yazım `A-dogrusal-fonksiyonlar.md` dosyasının başındadır: f(x) = x ve içteki doğru h mavi, mutlak değerli grafik turkuaz, sıfır ve kırılma noktası sarı.

Konunun ana hareketi **katlama**dır: doğrunun x ekseninin altında kalan kısmı eksenin üstüne katlanır ve V oluşur. Programın biçim sınırı m(x) = ± |ax ± b| ± c'dir; dışarıda çarpanı olan (3|x − 1| gibi) ya da birden çok mutlak değer içeren ifade hiçbir sahnede geçmez.

## Dizi

| # | Ders | Akılda kalıcı cümle |
|---|---|---|
| B1 | \|x\| ile f(x) = x | "Mutlak değer işareti atar, uzaklığı bırakır." |
| B2 | \|x\|'in parçalı gösterimi | "\|x\|, x negatifse −x, değilse x'tir." |
| B3 | ±\|x\|'in nitel özellikleri | "\|x\|'in en küçük değeri 0, −\|x\|'in en büyük değeri 0'dır." |
| B4 | \|ax + b\|'nin sıfırı | "\|ax + b\|'nin sıfırı ax + b'nin sıfırıdır; grafik orada kırılır." |
| B5 | c ile yukarı aşağı: ±\|h(x)\| ± c | "c grafiği taşır; sıfırların sayısı da değişir." |
| B6 | Mutlak değerli fonksiyonun parçalı gösterimi | "Mutlak değeri açmak, işarete göre iki yol çizmektir." |

---

## B1 — |x| ile f(x) = x

**Dosya:** `b1-mutlak-deger-ile-x`
**Fikir:** n(x) = |x|, f(x) = x ile x ≥ 0'da aynıdır, x < 0'da ise girdinin işaretini atar.
**Açılış sorusu:** Evden 3 km doğudaki ve 3 km batıdaki iki yer, evden uzaklık olarak neden aynı sayıdır?
**Ana görsel:** Üstte sayı doğrusunda ev (0) ve iki yer; altta düzlemde mavi f(x) = x ve ondan katlanarak çıkan turkuaz V.

| Sahne | Ne olur |
|---|---|
| 1. Uzaklık | Sayı doğrusunda ev 0'da; doğuda 3, batıda −3. İkisinin eve uzaklığı 3. Kural: n(x) = \|x\|. Tablo: −3, −2, −1, 0, 1, 2, 3 → 3, 2, 1, 0, 1, 2, 3. |
| 2. Katla | Tablodaki noktalar düzleme konur. Tahmin: x < 0'da grafik nereye gider? f(x) = x çizilir; eksenin altında kalan yarısı yukarı katlanır. Sağ yarı yerinde kalır. V oluşur. |
| 3. Aynı ve farklı | İki grafik üst üste. x ≥ 0'da çakışırlar; x < 0'da ayrılırlar. Tahmin: \|x\| hangi değerleri hiç almaz? Negatifleri: görüntü kümesi [0, ∞). Tanım kümesi ikisinde de ℝ. |
| 4. Dene | Kaydırıcı x: iki grafikte iki nokta birlikte yürür; f(x) ve \|x\| değerleri yan yana yazılır. x negatifken iki nokta eksene göre karşılıklı durur. |

**Hedeflenen yanılgı:** \|x\| grafiğini x < 0'da da aşağı inen bir doğru sanmak; \|x\|'i "hep pozitif" sanmak (0'da 0).
**Akılda kalıcı cümle:** "Mutlak değer işareti atar, uzaklığı bırakır."
**Çıkış soruları:** n(x) = \|x\| ile f(x) = x hangi x'lerde aynı değeri verir? (x ≥ 0; çeldiriciler: x ≤ 0, hiçbir x'te) · n(−5) kaçtır? (5; çeldiriciler: −5, 0)
**Not:** Mutlak değerin uzaklık anlamı ön bilgidir; tek cümleyle hatırlatılır.

---

## B2 — |x|'in parçalı gösterimi

**Dosya:** `b2-mutlak-degerin-parcali-gosterimi`
**Fikir:** |x|, x ≥ 0 için x, x < 0 için −x olarak iki parçalı yazılır.
**Açılış sorusu:** Hesabında −40 lira varsa borcun kaç liradır?
**Ana görsel:** Düzlemde V; iki kolu uzatan soluk kesik doğrular (y = x ve y = −x); yanında süslü parantezli yazım.

| Sahne | Ne olur |
|---|---|
| 1. Eksi x pozitif olur mu? | Hesap −40, borç 40: −(−40) = 40. Tahmin: x negatifken −x'in işareti nedir? Pozitif. Negatif x için \|x\| = −x. |
| 2. İki doğru, birer yarısı | V'nin sağ kolu y = x doğrusunun, sol kolu y = −x doğrusunun üzerindedir. İki doğru tam çizilir; kullanılan yarılar parlak, kullanılmayanlar soluk ve kesik kalır. |
| 3. Parçalı yazım | \|x\| = { x, x ≥ 0 ise · −x, x < 0 ise }. Tahmin: \|−7\| hangi satırla bulunur? İkinci: −(−7) = 7. A16'daki gibi: her aralığın kendi kuralı. |
| 4. Dene | Kaydırıcı x: nokta V üzerinde yürür; hangi yarıdaysa o satır yanar ve hesap yazılır. |

**Hedeflenen yanılgı:** "−x negatiftir" demek; iki parçayı iki ayrı fonksiyon sanmak.
**Akılda kalıcı cümle:** "|x|, x negatifse −x, değilse x'tir."
**Çıkış soruları:** x = −7 için \|x\| hangi kuralla bulunur? (−x = 7; çeldiriciler: x = −7, x = 7) · \|x\|'in parçalı gösteriminde iki parça hangi x'te ayrılır? (x = 0; çeldiriciler: x = 1, x = −1)

---

## B3 — ±|x|'in nitel özellikleri

**Dosya:** `b3-mutlak-degerin-nitel-ozellikleri`
**Fikir:** |x| tepe noktasında en küçük, −|x| en büyük değerini alır; ikisinin de sıfırı 0'dır.
**Açılış sorusu:** Ev ile okul arasındaki yolda eve uzaklığın en az olduğu yer neresidir?
**Ana görsel:** Düzlemde V; yanında satır satır açılan özellik listesi. Açılan her satır grafikte gösterilir, sonra soluklaşır.

| Sahne | Ne olur |
|---|---|
| 1. \|x\|'in özellikleri | Sırayla ve grafikte gösterilerek: tanım kümesi ℝ · görüntü kümesi [0, ∞) · sıfırı 0 · x ≠ 0 için pozitif · x < 0'da azalan, x > 0'da artan. Tahmin: en küçük değeri kaç? 0; minimum noktası (0, 0), maksimumu yok. |
| 2. f(x) = x'ten farkı | İki grafik yan yana. Aynı kalan: tanım kümesi, sıfır. Değişen: görüntü kümesi, işaret, artanlık, minimum. Yatay çizgi V'yi iki noktada keser: \|−3\| = \|3\|. Tahmin: \|x\| bire bir mi? Değil. |
| 3. Eksi koy: −\|x\| | Her çıktının işareti değişir: V ters döner. Tahmin: −\|x\|'in en büyük değeri kaç? 0; maksimum noktası (0, 0), minimumu yok. Görüntü kümesi (−∞, 0]. |
| 4. Sıra sende | −\|x\| için kartlar: nerede artan? (x < 0) · hangi x'lerde negatif? (x ≠ 0) · sıfırı? (0). Cevaplar sözel önerme olarak tahtada kalır. |

**Hedeflenen yanılgı:** V'yi baştan sona artan ya da azalan saymak; −\|x\|'i \|−x\| ile karıştırmak.
**Akılda kalıcı cümle:** "|x|'in en küçük değeri 0, −|x|'in en büyük değeri 0'dır."
**Çıkış soruları:** n(x) = −\|x\| fonksiyonunun görüntü kümesi hangisidir? ((−∞, 0]; çeldiriciler: [0, ∞), ℝ) · n(x) = \|x\| hangi x'lerde azalandır? (x < 0; çeldiriciler: x > 0, hiçbir x'te)
**Not:** Özellik listesi MAT.9.2.1 a'daki listedir (karar 3). Örtenlik, teklik-çiftlik yok. −\|x\|'in parçalı yazımı tek satır olarak sahne 3'te görünür.

---

## B4 — |ax + b|'nin sıfırı

**Dosya:** `b4-mutlak-degerli-dogrunun-sifiri`
**Fikir:** h doğrusal iken ±|h(x)|'in sıfırı h'nin sıfırıdır ve grafik tam orada kırılır.
**Açılış sorusu:** Asansör 3. kattayken hangi kata gidersen kat farkı sıfır olur?
**Ana görsel:** Düzlemde mavi h doğrusu; eksenin altındaki kısmı katlanınca turkuaz V; kırılma noktası sarı.

| Sahne | Ne olur |
|---|---|
| 1. Kat farkı | Asansör 3. katta; x. kata uzaklık \|x − 3\|. Önce h(x) = x − 3 çizilir, sıfırı 3. Tahmin: \|x − 3\| nerede sıfır olur? Eksenin altındaki kısım katlanır; V'nin ucu tam 3'te. |
| 2. a ve b değişirse | t(x) = \|ax + b\|. İki kaydırıcı: a (1, 2, 3) ve b (−6 ile 6). Soluk h doğrusu ve V birlikte değişir; kırılma noktası hep h'nin sıfırında, x = −b/a'da durur. |
| 3. h'den farkı | h ile \|h\| yan yana. h işaret değiştirir, \|h\| hiç negatif olmaz. h artandır, \|h\| sıfırın solunda azalan sağında artandır. h'nin minimumu yok, \|h\|'in en küçük değeri 0. |
| 4. Eksi ve sıra sende | −\|ax + b\|: ters V, tepesi aynı sıfırda. Kartlar: \|3x − 6\| nerede kırılır? (2) · −\|x + 1\| en büyük değerini hangi x'te alır? (−1) · \|2x + 4\|'ün sıfırı? (−2). |

**Hedeflenen yanılgı:** \|x − 3\|'ün kırılma noktasını −3'te aramak; \|h\|'in iki sıfırı olduğunu sanmak.
**Akılda kalıcı cümle:** "|ax + b|'nin sıfırı ax + b'nin sıfırıdır; grafik orada kırılır."
**Çıkış soruları:** t(x) = \|2x − 10\| fonksiyonunun sıfırı kaçtır? (5; çeldiriciler: −5, 10) · \|h(x)\| grafiği h grafiğinden nasıl elde edilir? (x ekseninin altındaki kısım yukarı katlanır; çeldiriciler: tamamı yukarı kayar, hiç değişmez)

---

## B5 — c ile yukarı aşağı: ±|h(x)| ± c

**Dosya:** `b5-c-ile-yukari-asagi`
**Fikir:** c, grafiği yukarı ya da aşağı taşır; sıfırların sayısını ve en büyük ya da en küçük değeri değiştirir.
**Açılış sorusu:** Paketleme makinesinin sapması hiçbir zaman 0 olmuyorsa en küçük sapma neye eşittir?
**Ana görsel:** Düzlemde yukarı aşağı kayan V; x eksenini kestiği noktalar sarı; köşede "sıfır sayısı" sayacı.

| Sahne | Ne olur |
|---|---|
| 1. Yukarı taşı | m(x) = \|x − 2\| + 1. \|x − 2\|'nin V'si 1 birim yukarı kayar. Tahmin: m(x) sıfır olur mu? Olmaz: en küçük değeri 1. Sıfırı yok. |
| 2. c değiştikçe | Kaydırıcı c: −3 ile 3. V kayar; en küçük değer c olur. c > 0: sıfır yok. c = 0: bir sıfır. c < 0: iki sıfır. Sayaç ve sarı noktalar değişir. |
| 3. Ters V'de | m(x) = −\|x − 2\| + c. Tahmin: c = 2 iken kaç sıfır var? İki. En büyük değer c; c > 0'da iki sıfır, c = 0'da bir, c < 0'da yok. V'dekinin tersi. |
| 4. Sıra sende | m(x) = \|x + 1\| − 3 için kartlar: en küçük değeri? (−3) · kaç sıfırı var? (2) · görüntü kümesi? ([−3, ∞)). |

**Hedeflenen yanılgı:** c'nin kırılma noktasını sağa sola kaydırdığını sanmak; mutlak değerli fonksiyonun hiç negatif değer almadığını sanmak (c < 0 iken alır).
**Akılda kalıcı cümle:** "c grafiği taşır; sıfırların sayısı da değişir."
**Çıkış soruları:** m(x) = \|x − 4\| + 3 fonksiyonunun en küçük değeri kaçtır? (3; çeldiriciler: 4, 0) · m(x) = −\|x\| + 2 fonksiyonunun kaç sıfırı vardır? (2; çeldiriciler: 1, 0)

---

## B6 — Mutlak değerli fonksiyonun parçalı gösterimi

**Dosya:** `b6-mutlak-degerli-fonksiyonun-parcali-gosterimi`
**Fikir:** m(x) = ± |ax ± b| ± c, iki doğrusal fonksiyonun tek ifadede birleşmiş hâlidir; iki parça ax ± b'nin sıfırında ayrılır.
**Açılış sorusu:** Eve uzaklığa göre ücret alan bir kurye, evin iki yanında da aynı tarifeyi tek kuralla nasıl yazar?
**Ana görsel:** Düzlemde V ve iki kolunu uzatan kesik doğrular; yanında adım adım açılan parçalı yazım.

| Sahne | Ne olur |
|---|---|
| 1. V'de iki doğru | m(x) = \|2x − 4\| + 1. Tahmin: V kaç doğrusal fonksiyonun parçasından oluşur? İki. Kollar uzatılır: sağ kol 2x − 3, sol kol −2x + 5 doğrusu üzerindedir. Ayrıldıkları yer x = 2: içteki 2x − 4'ün sıfırı. |
| 2. Mutlak değeri aç | x ≥ 2 iken 2x − 4 ≥ 0: mutlak değer aynen çıkar, (2x − 4) + 1 = 2x − 3. x < 2 iken 2x − 4 < 0: eksiyle çıkar, −(2x − 4) + 1 = −2x + 5. Parçalı yazım tamamlanır. |
| 3. Eksi ve c ile | m(x) = −\|x + 1\| + 3. Tahmin: parçalar hangi x'te ayrılır? −1. x ≥ −1: −(x + 1) + 3 = −x + 2. x < −1: (x + 1) + 3 = x + 4. Grafikle karşılaştırılır. |
| 4. Dene | Kaydırıcı x, m(x) = \|2x − 4\| + 1 üzerinde: nokta hangi koldaysa o satır yanar. Sol parça azalan, sağ parça artan: en küçük değer ikisinin birleştiği yerde, 1. |

**Hedeflenen yanılgı:** Mutlak değeri açarken yalnızca ilk terimin işaretini çevirmek (−2x − 4 yazmak); c'yi de eksiyle çarpmak.
**Akılda kalıcı cümle:** "Mutlak değeri açmak, işarete göre iki yol çizmektir."
**Çıkış soruları:** m(x) = \|x − 3\| + 2 fonksiyonu x < 3 için hangi kuralla yazılır? (−x + 5; çeldiriciler: x − 1, −x − 1) · \|3x + 6\| ifadesinin parçalı gösteriminde parçalar hangi x'te ayrılır? (x = −2; çeldiriciler: x = 2, x = 6)

---

## Yazım sırasında senaryodan sapmalar (7 Ekim 2026)

Yukarıdaki senaryolarda eski hâli duruyorsa geçerli olan budur.

- **B1:** sahne 1'e tahmin eklendi. Sahne 2'de noktalar iki adımda konur (önce x ≥ 0, tahminden sonra x < 0); tablo katlamadan önce kalkar.
- **B2:** düzlem −8…8; sahne 1 ve 2'ye birer tahmin eklendi. y = x yarısı mavi, y = −x yarısı turuncu.
- **B3:** sahne 1'de özellik listesi iki sayfa (yedi satır 26 kelime ediyordu). Sahne 2'de sağda değerler değil "aynı" ve "farklı" başlıkları altında özellik adları var. Sahne 3 "−|3| kaçtır?" tahminiyle açılır.
- **B4:** sahne 1 küçük bir bina görseliyle açılır. Tam sayı olmayan kırılma noktası kesirle yazılır (x = 5/3). Sahne 3 üç satırlık karşılaştırma tablosu; artanlık hücreleri çizilmiş ok.
- **B5:** paketleme makinesi yalnızca iki altyazıda. c kaydırıcısı 0,5 adımlı; c ve uç değer turuncu. Sahne 2'ye "uç sağa sola gitmedi" adımı eklendi.
- **B6:** sahne 2'de düzlem yok: parçalı yazım, 2x − 4'ün işaret şeridi ve yerinde değişen tek işlem satırı. Koşullar "ise"siz yazılır. Sahne 3'te sol parça çift eksiyle açılır: −(−(x + 1)) + 3. Kurye yalnızca tek altyazıdır: ücret "2 · uzaklık + 1" diye açılırsa 2|x − 2| + 1 olur ve bu biçim programın kalıbında yok.
