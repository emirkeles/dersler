# Konu A — Doğrusal fonksiyonlar ve nitel özellikleri: kısa senaryolar

Dayanak `../MUFREDAT.md`, MAT.9.2.1 ve `../PLAN.md` (kararlar bölüm 7). Biçim `plan/KURALLAR.md`'deki gibi: tek fikir, 3–5 sahne, 2 çıkış sorusu. Aşağıdaki cümleler sahnede ne olduğunu anlatır; ekran metni değildir. Altyazı en çok 12 kelime olur.

## Tema boyunca ortak olanlar (A, B ve C için)

**Ana görsel:** koordinat düzlemi (`KIT.duzlem`). Doğrular, noktalar, eksenlere düşen izler, işaret bölgeleri hep aynı düzlemde çizilir. Yanında gerektiğinde küçük bir tablo (x ve çıktı satırı), işaret tablosu ya da parçalı yazım durur.

**Renk rolleri (tema boyunca sabit):**

| Kavram | Renk |
|---|---|
| Referans fonksiyon f(x) = x; denklemde birinci fonksiyon f | mavi (`--c1`) |
| Türetilen doğru g, h; denklemde ikinci fonksiyon g | turuncu (`--c2`) |
| Pozitif değerler, eksenin üstü | yeşil (`--c3`) |
| Negatif değerler, eksenin altı | mor (`--c4`) |
| Sıfır, kök, kesişim noktası, vurgulanan nokta | sarı (`--c5`) |
| Mutlak değerli grafik | turkuaz (`--c6`) |

**Yazım:** çarpma noktası "∙" yerine tahtada "·"; eksi işareti "−" (U+2212); ondalık ayırıcı virgül. Fonksiyon adları programdaki gibi: f referans, g dönüşmüş, h(x) = ax + b, n(x) = ±|x|, m ve t mutlak değerli. Sonsuz uçlu aralıklar 1. temadaki yazımla: (−∞, 3], ℝ ∖ {4}.

**Terimler:** kaydırma, dikleşme, katlama anlatım sözüdür. Öteleme, yansıma, simetri, örten, tek-çift fonksiyon, eğim formülü, y = mx + n kullanılmaz (`PLAN.md` bölüm 5).

**Son sahne:** her derste öğrencinin elinin değdiği bir sahne vardır: kaydırıcı ("Dene") ya da tahtada tek kartlık sorular ("Sıra sende", `KIT.soruTahtasi`).

## Dizi

| # | Ders | Akılda kalıcı cümle |
|---|---|---|
| A1 | Değişen iki nicelik | "Biri değişince öbürü nasıl değişiyor, fonksiyon onu söyler." |
| A2 | Girdi ve çıktı kümeleri | "Girebildiklerin tanım kümesi, çıkabildiklerin görüntü kümesidir." |
| A3 | Sıfır ve işaret: f(x) = x | "Sıfır, işaretin değiştiği yerdir." |
| A4 | Artanlık ve uç değerler: f(x) = x | "Artan fonksiyon sağa gittikçe yükselir." |
| A5 | Bire birlik: f(x) = x | "Bire birde iki farklı girdi aynı çıktıyı vermez." |
| A6 | Doğruyu kaydırmak: f(x) + k ve f(x ± r) | "Kaydırma doğrunun eğimini değil, yerini değiştirir." |
| A7 | Eğimi belirleyen a | "Eğimi belirleyen katsayıdır, a." |
| A8 | Sabit fonksiyon | "Girdi ne olursa olsun çıktı değişmiyorsa fonksiyon sabittir." |
| A9 | Katsayılardan grafiği okumak | "Eğim a'da, yer r ile k'de saklıdır." |
| A10 | Katsayı ve artanlık-azalanlık | "a pozitifse artar, negatifse azalır." |
| A11 | ax + b'nin işareti | "Fonksiyon sıfırın iki yanında işaret değiştirir." |
| A12 | Artanlığın ispatı | "x₁ < x₂ ile başla, h(x₁) < h(x₂)'ye var." |
| A13 | Bire birliğin ispatı | "Aynı çıktıyı veren iki girdi aslında aynı girdidir." |
| A14 | Grafik mi, cebir mi? | "Grafik gösterir, ispat garanti eder." |
| A15 | Bir aralıkta en büyük ve en küçük değer | "Uç aralığa dahil değilse o uçtaki değer alınamaz." |
| A16 | Parçalı gösterim | "Her aralığın kendi kuralı vardır." |

---

## A1 — Değişen iki nicelik

**Dosya:** `a1-degisen-iki-nicelik`
**Fikir:** Fonksiyon, bir nicelik değişince ona bağlı öbür niceliğin nasıl değiştiğini gösteren kuraldır; f(x) = x bunun en yalın hâlidir.
**Açılış sorusu:** Gün boyunca saat ilerledikçe termometredeki sayı değişir; hangisi hangisine bağlıdır?
**Ana görsel:** Bir musluk ve ölçekli kova (dakikada 1 litre); yanında tablo, sonra koordinat düzlemi.

| Sahne | Ne olur |
|---|---|
| 1. Hangisi hangisine bağlı? | Saat 6'dan 14'e ilerler, termometre 8 °C'den 20 °C'ye çıkar (beş nokta). Tahmin: hangisi öbürüne bağlı? Sıcaklık saate bağlıdır, tersi değil. İki ad: saat **bağımsız değişken**, sıcaklık **bağımlı değişken**. |
| 2. Aynı adımlarla değişim | Musluk dakikada 1 litre akıtır; kova dolar. Tablo: 0, 1, 2, 3 dakika → 0, 1, 2, 3 litre. Tahmin: 5. dakikada kaç litre? Her dakikada aynı artış: **doğrusal değişim**. |
| 3. Üç temsil | Tablodaki çiftler düzleme nokta olarak konur; aradaki her an için de bir nokta vardır, noktalar doğruya dönüşür. Doğrunun adı yazılır: f(x) = x. Tablo, grafik ve kural aynı fonksiyonu gösterir. Defter: doğrusal referans fonksiyon. |
| 4. Dene | Kaydırıcı x'i −4 ile 4 arasında gezdirir. Nokta doğru üzerinde yürür; f(x) = … satırı ve noktanın eksenlere izleri birlikte değişir. Negatif girdiler de var: f(−2) = −2. |

**Hedeflenen yanılgı:** Bağımlı ile bağımsız değişkeni yer değiştirmek; grafiği yalnızca tablodaki noktalardan ibaret sanmak.
**Akılda kalıcı cümle:** "Biri değişince öbürü nasıl değişiyor, fonksiyon onu söyler."
**Çıkış soruları:** Yürüdüğün süre arttıkça aldığın yol artıyor. Bağımsız değişken hangisi? (süre; çeldiriciler: yol, ikisi de) · f(x) = x için f(−4) kaçtır? (−4; çeldiriciler: 4, 0)

---

## A2 — Girdi ve çıktı kümeleri

**Dosya:** `a2-girdi-ve-cikti-kumeleri`
**Fikir:** Tanım kümesi girebileceğimiz x'lerin, görüntü kümesi çıkabilecek değerlerin kümesidir.
**Açılış sorusu:** Otomatın tuş takımında yalnızca 1'den 9'a kadar sayılar varsa hangi numaralar girilebilir?
**Ana görsel:** Düzlemde f(x) = x; doğrunun x eksenine ve y eksenine düşen gölgeleri (kalın şeritler).

| Sahne | Ne olur |
|---|---|
| 1. Girebildiklerin | Otomatın dokuz tuşu: girilebilenler {1, 2, …, 9}. Bir fonksiyona girebilen sayıların kümesi **tanım kümesi**dir. f(x) = x gerçek sayılarda tanımlı: her gerçek sayı girer. Doğrunun x eksenindeki gölgesi bütün eksendir: ℝ. |
| 2. Çıkabildiklerin | Doğru üzerindeki nokta y eksenine iz düşürür. Tahmin: f(x) = x'ten 2,5 çıkabilir mi? Evet, x = 2,5 için. Her gerçek sayı çıkar: **görüntü kümesi** ℝ. Gölge bu kez y ekseninde. |
| 3. Aralıkta tanımlıysa | Tanım kümesi [−2, 3] olur: doğrudan yalnızca bir parça kalır, uçları dolu nokta. x eksenindeki gölge [−2, 3]. Tahmin: görüntü kümesi hangisi? y eksenindeki gölge de [−2, 3]. |
| 4. Dene | İki kaydırıcı: sol uç ve sağ uç. Parça, iki gölge ve altındaki iki aralık yazımı birlikte değişir. |

**Hedeflenen yanılgı:** Tanım kümesini y ekseninde, görüntü kümesini x ekseninde aramak; görüntü kümesini her durumda ℝ sanmak.
**Akılda kalıcı cümle:** "Girebildiklerin tanım kümesi, çıkabildiklerin görüntü kümesidir."
**Çıkış soruları:** f(x) = x'in tanım kümesi [−1, 5] ise görüntü kümesi hangisidir? ([−1, 5]; çeldiriciler: ℝ, [0, 5]) · Grafikte tanım kümesi hangi eksende okunur? (x ekseni; çeldiriciler: y ekseni, ikisinde de)
**Not:** Örtenlik sözü ve tartışması yok (program sınırı).

---

## A3 — Sıfır ve işaret: f(x) = x

**Dosya:** `a3-sifir-ve-isaret`
**Fikir:** f(x) = x, x = 0'da sıfırdır; sıfırın bir yanında pozitif, öbür yanında negatiftir.
**Açılış sorusu:** Termometre 0'ın altına düştüğünde ne değişir, 0'ın üstünde ne farklıdır?
**Ana görsel:** Düzlemde f(x) = x; eksenin üstünde kalan kısım yeşil, altında kalan kısım mor; x ekseninin altında bir işaret şeridi (−, 0, +).

| Sahne | Ne olur |
|---|---|
| 1. Sıfır | Tahmin: f(x) = x hangi x için 0 değerini alır? Doğru x eksenini x = 0'da keser; nokta sarı yanar. **Fonksiyonun sıfırı:** f(x) = 0 yapan x. |
| 2. İşaret | Sıfırın sağında grafik eksenin üstünde: f pozitif (yeşil). Solunda eksenin altında: f negatif (mor). İşaret şeridi dolar: −, 0, +. Tahmin: f(0) pozitif mi, negatif mi? Hiçbiri. |
| 3. Aralık değişirse | Tanım kümesi [−2, 4]: negatif [−2, 0), pozitif (0, 4]. Tanım kümesi [1, 4]: tahmin, sıfırı var mı? Yok; fonksiyon bu aralıkta hep pozitif. İşaret tanım kümesine bağlıdır. |
| 4. Dene | Kaydırıcı sol ucu −4 ile 3 arasında gezdirir (sağ uç 4). Renkli bölgeler ve sağdaki özet (sıfırı, negatif olduğu yer, pozitif olduğu yer) değişir. |

**Hedeflenen yanılgı:** Sıfırı y eksenini kestiği yer sanmak; 0'ı pozitif saymak; işareti tanım kümesinden bağımsız sanmak.
**Akılda kalıcı cümle:** "Sıfır, işaretin değiştiği yerdir."
**Çıkış soruları:** f(x) = x, [−3, 2] aralığında tanımlı. f hangi x'lerde negatiftir? ([−3, 0); çeldiriciler: [−3, 0], (0, 2]) · Grafikte fonksiyonun sıfırı nerededir? (x eksenini kestiği yer; çeldiriciler: y eksenini kestiği yer, en alçak nokta)

---

## A4 — Artanlık ve uç değerler: f(x) = x

**Dosya:** `a4-artanlik-ve-uc-degerler`
**Fikir:** f(x) = x artandır; artan bir fonksiyon aralığın sağ ucunda en büyük, sol ucunda en küçük değerini alır.
**Açılış sorusu:** Asansörle yukarı çıktıkça kat numarası artar; en üst kata ulaşmadan önce en büyük numara hangisidir?
**Ana görsel:** Düzlemde f(x) = x üzerinde yürüyen nokta; uçlarda işaretlenen maksimum ve minimum noktaları.

| Sahne | Ne olur |
|---|---|
| 1. Artan | Tablo: x = −2, −1, 0, 1, 2 ve altında f(x). Nokta doğru üzerinde sağa yürür, her adımda yükselir. Tahmin: x büyürse f(x) ne olur? Ad: **artan** fonksiyon. |
| 2. ℝ'de en büyük değer | Tahmin: f(x) = x'in gerçek sayılarda en büyük değeri var mı? Nokta 3'e, 4'e çıkar; hangi değer söylense sağında daha büyüğü var. ℝ'de maksimum da minimum da yok. |
| 3. Kapalı aralıkta | Tanım kümesi [−2, 3]. Tahmin: en büyük değer hangi x'te? Sağ uç: **maksimum noktası** (3, 3), en büyük değer 3. Sol uç: **minimum noktası** (−2, −2). |
| 4. Dene | İki kaydırıcı uçları değiştirir; maksimum ve minimum noktaları uçları izler, değerleri yazılır. |

**Hedeflenen yanılgı:** Her fonksiyonun en büyük değeri olduğunu sanmak; maksimum değeri ile maksimumun alındığı x'i karıştırmak.
**Akılda kalıcı cümle:** "Artan fonksiyon sağa gittikçe yükselir."
**Çıkış soruları:** f(x) = x, [−4, 1] aralığında en büyük değerini kaç alır? (1; çeldiriciler: −4, 4) · f(x) = x için hangisi doğrudur? (x büyüdükçe f(x) de büyür; çeldiriciler: x büyüdükçe f(x) küçülür, f(x) değişmez)
**Not:** Açık aralık A15'te. Artanlığın x₁ < x₂ yazımı A12'de.

---

## A5 — Bire birlik: f(x) = x

**Dosya:** `a5-bire-birlik`
**Fikir:** f(x) = x'te iki farklı girdi hiçbir zaman aynı çıktıyı vermez; buna bire birlik denir.
**Açılış sorusu:** Okulda her öğrenci kendine ait bir numara taşır; iki öğrenci aynı numarayı taşıyabilir mi?
**Ana görsel:** Düzlemde f(x) = x ve yukarı aşağı kayan yatay bir çizgi; çizginin doğruyu kestiği nokta sayılır.

| Sahne | Ne olur |
|---|---|
| 1. Aynı numara olur mu? | Dört öğrenci, dört ayrı okul numarası: herkesin numarası kendine ait. Karşısında aynı dört öğrencinin doğduğu ay: ikisi "mart". Tahmin: hangisinde çıktıyı bilince kişiyi bulursun? Numarada. Farklı girdi, farklı çıktı: **bire bir**. |
| 2. Tabloda | f(x) = x tablosu: −2, −1, 0, 1, 2. Alt satırda hiçbir sayı iki kez geçmez. Tahmin: çıktı 3 ise girdi kaç olabilir? Yalnızca 3. |
| 3. Grafikte | Yatay çizgi bir çıktı değerini gösterir. Kaydırıcı çizgiyi −3 ile 3 arasında gezdirir; çizgi doğruyu her yükseklikte tek noktada keser. Sayaç: "bu çıktıyı veren girdi: 1 tane". |
| 4. Sembolle | Sözel tanım sembole çevrilir: x₁ ≠ x₂ ise f(x₁) ≠ f(x₂). f(x) = x için çıktı girdinin kendisidir; iki farklı sayı iki farklı çıktı verir. Defter. Sıra sende: iki kart (f(a) = f(b) = 7 ise a ile b; çıktı −2 ise girdi). |

**Hedeflenen yanılgı:** Bire birliği "her girdinin bir çıktısı var" ile karıştırmak.
**Akılda kalıcı cümle:** "Bire birde iki farklı girdi aynı çıktıyı vermez."
**Çıkış soruları:** f(x) = x için f(a) = 7 ve f(b) = 7 ise hangisi doğrudur? (a = b; çeldiriciler: a ≠ b olabilir, bilinemez) · Bire birliği hangisi anlatır? (Farklı girdiler farklı çıktı verir; çeldiriciler: Her girdinin bir çıktısı vardır, Çıktılar girdilerden büyüktür)
**Not:** Örtenlik anılmaz. "Yatay doğru testi" adı verilmez.

---

## A6 — Doğruyu kaydırmak: f(x) + k ve f(x ± r)

**Dosya:** `a6-dogruyu-kaydirmak`
**Fikir:** Çıktıya ya da girdiye bir sayı eklemek doğrunun yönünü değil yerini değiştirir.
**Açılış sorusu:** Bir otoparkın giriş ücreti 5 lira artarsa saat–ücret grafiği nasıl değişir?
**Ana görsel:** Düzlemde soluk mavi f(x) = x ve ondan kayarak ayrılan turuncu g; yanında iki satırlık tablo.

| Sahne | Ne olur |
|---|---|
| 1. Çıktıya ekle: f(x) + k | g(x) = f(x) + 2. Tabloda her çıktı 2 büyür. Tahmin: grafik nasıl değişir? Her nokta 2 birim yukarı çıkar; doğru yukarı kayar, eğimi aynı kalır. g(x) = x + 2. k = −3 için aşağı. |
| 2. Girdiye ekle: f(x − r) | g(x) = f(x − 2): g, f'nin 2 önceki girdiye verdiği çıktıyı verir. Tablo: g(2) = f(0) = 0, g(3) = f(1) = 1. Tahmin: grafik hangi yöne kayar? Sağa 2 birim; x eksenini 2'de keser. g(x) = x − 2. f(x + 2) sola kayar. |
| 3. İkisi birlikte | İki kaydırıcı: r ve k (−3 ile 3). Doğru kayar; altında kural güncellenir: g(x) = f(x − r) + k = x − r + k. Eğim hiç değişmez. r = 2, k = 2 iken doğru f'nin üstüne döner. |
| 4. Sıra sende | Tahtada kartlar: g(x) = f(x) − 4 grafiği f'ye göre nerede? · g(x) = f(x + 3) x eksenini nerede keser? · Yukarı 1 kaymış doğrunun kuralı hangisi? |

**Hedeflenen yanılgı:** f(x − 2)'nin sola kaydığını sanmak; kaydırınca eğimin değiştiğini sanmak.
**Akılda kalıcı cümle:** "Kaydırma doğrunun eğimini değil, yerini değiştirir."
**Çıkış soruları:** g(x) = f(x) − 4 grafiği f(x) = x grafiğine göre nasıldır? (4 birim aşağıda; çeldiriciler: 4 birim yukarıda, daha dik) · g(x) = f(x − 3) grafiği x eksenini hangi noktada keser? (x = 3; çeldiriciler: x = −3, x = 0)
**Not:** Program sırası: önce yalnızca k (r = 0), sonra yalnızca r (k = 0), sonra ikisi. "Öteleme" sözü yok.

---

## A7 — Eğimi belirleyen a

**Dosya:** `a7-egimi-belirleyen-a`
**Fikir:** f(x)'i a ile çarpmak doğrunun eğimini değiştirir; eğimi belirleyen katsayıdır.
**Açılış sorusu:** Aynı yolu iki kat hızla giden araç aynı sürede kaç kat yol alır?
**Ana görsel:** Orijin çevresinde dönen turuncu doğru ve üzerinde bir basamak: 1 sağa, a yukarı.

| Sahne | Ne olur |
|---|---|
| 1. İki katı | g(x) = 2 · f(x). Tabloda her çıktı iki katına çıkar. Tahmin: grafik nasıl değişir? Doğru orijinde kalır, dikleşir. Basamak: 1 sağa, 2 yukarı. g(x) = 2x. |
| 2. a değiştikçe | Kaydırıcı a: 0,5 ile 3 arası. Doğru döner, basamağın yüksekliği a olur. a = 1/2 iken yatıklaşır. Eğim = a. |
| 3. a negatifse | Tahmin: g(x) = −2 · f(x)'te 1 sağa gidince ne olur? 2 aşağı iner. Kaydırıcı −3'e kadar açılır; doğru aşağı eğilir. |
| 4. Sıra sende | Tahtada üç doğru çizili kartlar: hangisi a = 3, hangisi a = 1/2, hangisi a = −1? Her kartta doğrunun basamağı görünür. |

**Hedeflenen yanılgı:** a büyüyünce doğrunun yukarı kaydığını sanmak; negatif a'yı "daha az dik" sanmak.
**Akılda kalıcı cümle:** "Eğimi belirleyen katsayıdır, a."
**Çıkış soruları:** g(x) = 3 · f(x) için x 1 artınca g(x) kaç artar? (3; çeldiriciler: 1, 1/3) · Hangisinin grafiği en diktir? (g(x) = 4x; çeldiriciler: g(x) = x + 4, g(x) = x/4)
**Not:** Eğim ön bilgidir; iki noktadan eğim formülü yok. a = 0 sonraki derste.

---

## A8 — Sabit fonksiyon

**Dosya:** `a8-sabit-fonksiyon`
**Fikir:** a = 0 olunca girdi çıktıyı etkilemez; fonksiyon sabittir ve değeri sabit terimdir.
**Açılış sorusu:** Aylık sabit ücretli bir abonelikte kullanımı artırırsan fatura ne olur?
**Ana görsel:** g(x) = a · x + 3 doğrusu; a küçüldükçe yatıklaşır ve a = 0'da yatay çizgiye döner.

| Sahne | Ne olur |
|---|---|
| 1. Kullanım artar, fatura aynı | Abonelik: ayda 300 lira. Tablo: 0, 10, 20, 30 saat kullanım → 300, 300, 300, 300. Tahmin: 50 saat kullanınca fatura? Girdi çıktıyı etkilemiyor. |
| 2. a sıfıra inerken | g(x) = a · x + 3. Kaydırıcı a'yı 2'den 0'a indirir; doğru (0, 3) çevresinde yatıklaşır, a = 0'da yatay olur: g(x) = 3. Ad: **sabit fonksiyon**. Değeri, kuraldaki **sabit terim**dir. |
| 3. Farkı ne? | Sabit fonksiyon ile g(x) = x + 3 yan yana. Tahmin: g(x) = 3'ün görüntü kümesi hangisi? Tek sayı: {3}. Grafik yatay; ne artan ne azalan. |
| 4. Sıra sende | Kartlar: g(x) = 5 sabit mi? · g(x) = 5x? · g(x) = 0 · x − 2? · g(x) = 7 için g(100) kaç? |

**Hedeflenen yanılgı:** Sabit fonksiyonda g(100)'ü 100 ile hesaplamaya çalışmak; yatay doğruyu "fonksiyon değil" sanmak.
**Akılda kalıcı cümle:** "Girdi ne olursa olsun çıktı değişmiyorsa fonksiyon sabittir."
**Çıkış soruları:** g(x) = 7 için g(100) kaçtır? (7; çeldiriciler: 100, 700) · g(x) = ax + 4'te a = 0 olursa grafik nasıl olur? (4 yüksekliğinde yatay doğru; çeldiriciler: orijinden geçen doğru, dikey doğru)
**Not:** Sabit fonksiyonun bire bir olup olmadığı tartışılmaz (karar 5).

---

## A9 — Katsayılardan grafiği okumak

**Dosya:** `a9-katsayilardan-grafigi-okumak`
**Fikir:** g(x) = a · f(x ± r) ± k yazılışındaki sayılardan grafiğin eğimi, eksenleri kestiği noktalar ve iki doğrunun kesişimi tahmin edilir.
**Açılış sorusu:** İki kargo firmasının ücret doğrularını aynı grafiğe çizersek nerede kesişirler?
**Ana görsel:** Düzlemde f'den adım adım türeyen g; (r, k) noktası ve iki eksen kesişimi sarı.

| Sahne | Ne olur |
|---|---|
| 1. Üç sayı birlikte | g(x) = 2 · f(x − 3) + 2 adım adım kurulur: f dikleşir (2 ile çarp), 3 sağa kayar, 2 yukarı kayar. Orijin (3, 2) noktasına taşınmıştır: doğru (r, k)'dan geçer, eğimi a'dır. |
| 2. Eksenleri nerede keser? | Tahmin: y eksenini nerede keser? x = 0 koy: 2 · (0 − 3) + 2 = −4. Tahmin: x eksenini nerede keser? g(x) = 0: x = 2. Grafikte iki nokta yanar; g(x) = 2x − 4. |
| 3. İki doğru nerede buluşur? | İki kargo: A firması 40 lira + kilo başına 10 lira, B firması kilo başına 20 lira. Tahmin: kaç kiloda aynı ücret? İki doğru çizilir, 4 kiloda 80 lirada kesişir. Kontrol: 40 + 10 · 4 = 20 · 4. |
| 4. Sıra sende | g(x) = −f(x − 2) + 1 için üç kart: eğim (−1), y eksenini kestiği yer (3), x eksenini kestiği yer (3). Her cevaptan sonra grafik çizilerek kontrol edilir. |

**Hedeflenen yanılgı:** k'yı her zaman y eksenini kestiği yer sanmak (r ≠ 0 iken değil); r'nin işaretini ters okumak.
**Akılda kalıcı cümle:** "Eğim a'da, yer r ile k'de saklıdır."
**Çıkış soruları:** g(x) = 3 · f(x − 2) + 1 grafiğinin eğimi kaçtır? (3; çeldiriciler: 2, 1) · g(x) = 2 · f(x) − 6 grafiği x eksenini hangi noktada keser? (x = 3; çeldiriciler: x = −6, x = −3)
**Not:** Kesişim burada tahmin ve kontrol düzeyinde; denklem olarak çözümü C3'te.

---

## A10 — Katsayı ve artanlık-azalanlık

**Dosya:** `a10-katsayi-ve-artanlik`
**Fikir:** a > 0 ise doğrusal fonksiyon artan, a < 0 ise azalandır.
**Açılış sorusu:** Taksimetre açılışta 30 lira gösteriyorsa yol uzadıkça ücret hiç düşebilir mi?
**Ana görsel:** Düzlemde aynı anda dört doğru; artanlar ve azalanlar iki öbekte toplanır.

| Sahne | Ne olur |
|---|---|
| 1. Taksi | h(x) = 20x + 30: açılış 30 lira, kilometresi 20 lira. Tablo ve grafik: 0, 1, 2, 3 km → 30, 50, 70, 90. Tahmin: yol uzayınca ücret düşer mi? Artan. |
| 2. Örüntü ara | Dört kural sırayla çizilir: 2x + 1, x/2 − 3, −x + 2, −3x − 1. Her birinde nokta sağa yürür: ilk ikisinde yükselir, son ikisinde alçalır (**azalan**). Tahmin: farkı yaratan ne? a'nın işareti. Varsayım yazılır. |
| 3. Kontrol et | İki kaydırıcı: a ve b. a pozitifken doğru sağa yükselir, negatifken alçalır; b değişince yalnızca yer değişir. Varsayım yeni örneklerde de tutar. |
| 4. Önerme | Genelleme önerme olarak yazılır: "∀a > 0 için h(x) = ax + b artandır." ve "∀a < 0 için h(x) = ax + b azalandır." Taksiye dönüş: kilometre ücreti pozitif olduğu sürece ücret hiç düşmez. Defter. |

**Hedeflenen yanılgı:** b negatifse fonksiyonu azalan sanmak; eksenin altındaki doğruyu azalan sanmak.
**Akılda kalıcı cümle:** "a pozitifse artar, negatifse azalır."
**Çıkış soruları:** h(x) = −2x + 9 için hangisi doğrudur? (azalandır; çeldiriciler: artandır çünkü 9 pozitif, sabittir) · h(x) = ax − 5 artan ise a hangisi olabilir? (3; çeldiriciler: −3, 0)
**Not:** Bu derste doğrulama tablo ve grafikle; cebirsel ispat A12'de.

---

## A11 — ax + b'nin işareti

**Dosya:** `a11-ax-b-nin-isareti`
**Fikir:** ax + b, x = −b/a noktasında işaret değiştirir; işaret tablosu bunu özetler.
**Açılış sorusu:** Hesabındaki 100 lira her gün 20 lira azalıyorsa hangi günden sonra eksiye düşersin?
**Ana görsel:** Düzlemde doğru, üstü yeşil altı mor; altında işaret tablosu (`KIT.isaretTablosu`).

| Sahne | Ne olur |
|---|---|
| 1. Sıfırı bul | h(x) = −20x + 100. Tahmin: hangi gün hesap sıfırlanır? 5. gün. Genel: ax + b = 0 ise x = −b/a. Burada −100 / (−20) = 5. |
| 2. Grafikten işaret | x < 5'te doğru eksenin üstünde (yeşil): para var. x > 5'te altında (mor): eksi bakiye. İşaret sıfırda değişir. |
| 3. İşaret tablosu | Aynı bilgi tabloya dökülür: üst satırda x ve 5, alt satırda +, 0, −. Sonra artan bir örnek: h(x) = 2x − 6; tahmin, tablosu hangisi? −, 0, +. Artansa sağda pozitif, azalansa sağda negatif. |
| 4. Aralıkta ve sıra sende | Tanım kümesi [0, 4] olursa h(x) = −20x + 100 hep pozitif. Kartlar: h(x) = 3x + 6'nın sıfırı? · tablosu? · h(x) = −x + 3 hangi x'lerde pozitif? |

**Hedeflenen yanılgı:** Sıfırı b/a diye bulmak (eksiyi unutmak); tabloda işaretleri a'ya bakmadan hep "−, 0, +" yazmak.
**Akılda kalıcı cümle:** "Fonksiyon sıfırın iki yanında işaret değiştirir."
**Çıkış soruları:** h(x) = 2x − 8'in sıfırı kaçtır? (4; çeldiriciler: −4, 8) · h(x) = −x + 3 hangi x'lerde pozitiftir? (x < 3; çeldiriciler: x > 3, x > −3)

---

## A12 — Artanlığın ispatı

**Dosya:** `a12-artanligin-ispati`
**Fikir:** a > 0 iken h(x) = ax + b'nin artan olduğu, x₁ < x₂ varsayımından h(x₁) < h(x₂) sonucuna giderek ispatlanır.
**Açılış sorusu:** Bir taksi şirketi "yol uzadıkça ücret hiç azalmaz" diyorsa bunu her mesafe için nasıl güvenceye alırsın?
**Ana görsel:** Solda küçük düzlemde iki nokta (x₁ solda, x₂ sağda); sağda alt alta açılan ispat adımları (`KIT.adimlar`).

| Sahne | Ne olur |
|---|---|
| 1. Artan, sembolle | h(x) = 2x + 1 üzerinde iki nokta. Kaydırıcı x₂'yi gezdirir; x₁ < x₂ oldukça h(x₁) < h(x₂) kalır. Tanım yazılır: ∀x₁, x₂ ∈ ℝ için x₁ < x₂ iken h(x₁) < h(x₂). |
| 2. İspat: a > 0 | Hipotez x₁ < x₂. Tahmin: iki yan pozitif a ile çarpılınca eşitsizliğin yönü ne olur? Değişmez: ax₁ < ax₂. İki yana b eklenir: ax₁ + b < ax₂ + b. Hüküm: h(x₁) < h(x₂). Her adımın yanında gerekçesi. |
| 3. a < 0 olunca | Tahmin: hangi adım değişir? Çarpma adımı: negatifle çarpınca yön döner, ax₁ > ax₂. Sonuç h(x₁) > h(x₂): azalan. |
| 4. Sıra sende | Kartlar: ispat hangi cümleyle başlar? · a > 0 hangi adımda kullanıldı? · b eklemek yönü değiştirir mi? |

**Hedeflenen yanılgı:** İspatı örnek sayılarla yapılmış saymak; negatifle çarparken yönü çevirmeyi unutmak.
**Akılda kalıcı cümle:** "x₁ < x₂ ile başla, h(x₁) < h(x₂)'ye var."
**Çıkış soruları:** İspatta a > 0 bilgisi hangi adımda kullanılır? (iki yanı a ile çarparken; çeldiriciler: b eklerken, x₁ < x₂ derken) · a < 0 ve x₁ < x₂ ise hangisi doğrudur? (h(x₁) > h(x₂); çeldiriciler: h(x₁) < h(x₂), h(x₁) = h(x₂))
**Not:** Eşitsizliğin iki yanını aynı sayıyla çarpma ve aynı sayıyı ekleme ön bilgidir.

---

## A13 — Bire birliğin ispatı

**Dosya:** `a13-bire-birligin-ispati`
**Fikir:** a ≠ 0 iken h(x) = ax + b'nin bire bir olduğu, bire birliğin tanımından yola çıkarak cebirsel olarak ispatlanır.
**Açılış sorusu:** Bir mağaza her ürüne ayrı barkod verdiğini söylüyorsa bunu nasıl denetlersin?
**Ana görsel:** Sağda ispat adımları; solda düzlemde yatay çizgi ve tek kesişim.

| Sahne | Ne olur |
|---|---|
| 1. Tanımı çevir | Barkod: iki paket aynı barkodu okutuyorsa aynı üründür. A5'teki tanım (farklı girdi, farklı çıktı) öbür yanından okunur: çıktılar eşitse girdiler eşittir. h(x₁) = h(x₂) ise x₁ = x₂. Tahmin: ikisi aynı şeyi mi söyler? |
| 2. İspat | Hipotez: ax₁ + b = ax₂ + b. İki yandan b çıkar: ax₁ = ax₂. Tahmin: x₁ = x₂ demek için ne yapmalı? İki yanı a'ya böl; a ≠ 0 olduğu için bölünebilir. Hüküm: x₁ = x₂. |
| 3. Sayıyla dene | h(x) = 3x − 2. Kaydırıcı çıktıyı seçer (yatay çizgi); çizgi doğruyu tek noktada keser ve o girdi hesaplanır: çıktı 10 ise x = 4. Her çıktı için tek girdi. |

**Hedeflenen yanılgı:** İspata hükümle (x₁ = x₂) başlamak; a ≠ 0 koşulunu süs sanmak.
**Akılda kalıcı cümle:** "Aynı çıktıyı veren iki girdi aslında aynı girdidir."
**Çıkış soruları:** Bire birlik ispatı hangi varsayımla başlar? (h(x₁) = h(x₂); çeldiriciler: x₁ = x₂, x₁ < x₂) · ax₁ = ax₂ eşitliğinden x₁ = x₂ sonucuna geçmek için hangi koşul gerekir? (a ≠ 0; çeldiriciler: b ≠ 0, a > 0)
**Not:** a = 0 hâlinde ne olduğu tartışılmaz; yalnızca "sıfıra bölünmez" denir (karar 5). Örtenlik anılmaz.

---

## A14 — Grafik mi, cebir mi?

**Dosya:** `a14-grafik-mi-cebir-mi`
**Fikir:** Grafik ve tablo ile doğrulama hızlıdır ama örneğe dayanır; cebirsel ispat her durumu kapsar. Hangisinin ne zaman işe yaradığına karar verilir.
**Açılış sorusu:** Bir mağaza "indirim hiçbir ürünün fiyatını artırmaz" diyorsa bunu denetlemek için üç fişe mi bakarsın, kurala mı?
**Ana görsel:** Düzlemde üst üste gelen örnek doğrular ve sarı sıfırları; sonra tek satırlık ispat.

| Sahne | Ne olur |
|---|---|
| 1. Üç örnek, bir varsayım | Üç artan doğru çizilir: 2x + 4, x + 3, 3x + 3. Sıfırları −2, −3, −1: hepsi solda. Tahmin: "a > 0 ise sıfır hep negatiftir" doğru mu? Varsayım yazılır. |
| 2. Kontrol et | Dördüncü örnek: 2x − 4. Sıfırı 2, sağda. Varsayım düştü. Tahmin: üç örnekte ortak olup gözden kaçan neydi? Hepsinde b > 0. Varsayım düzeltilir: a > 0 ve b > 0 ise sıfır negatiftir. |
| 3. Cebirle ispat | Sıfır x = −b/a. a > 0 ve b > 0 ise b/a pozitif, −b/a negatif. Örnek gerekmedi: her a ve b için geçerli. |
| 4. Hangisi ne zaman? | Kartlar: "Bir örüntü arıyorum" (grafik ve tablo) · "Önermeyi çürütmek istiyorum" (tek karşı örnek) · "Her a için doğru olduğundan emin olmak istiyorum" (cebirsel ispat). Kapanış: grafik fikir verir ve hatayı yakalar, ispat genelleştirir. |

**Hedeflenen yanılgı:** Birkaç grafiğin önermeyi kanıtladığını sanmak (1. tema C5'in devamı).
**Akılda kalıcı cümle:** "Grafik gösterir, ispat garanti eder."
**Çıkış soruları:** Üç grafik bir önermeyi destekliyor. Bundan ne çıkar? (Önerme bu üç örnekte doğrudur; çeldiriciler: Önerme her zaman doğrudur, Önerme yanlıştır) · "∀a > 0 için …" diye başlayan bir önermeden emin olmanın yolu hangisidir? (cebirsel ispat; çeldiriciler: on grafik çizmek, büyük bir tablo yapmak)

---

## A15 — Bir aralıkta en büyük ve en küçük değer

**Dosya:** `a15-aralikta-en-buyuk-en-kucuk`
**Fikir:** Bir aralıkta tanımlı doğrusal fonksiyonun en büyük ve en küçük değeri aralığın uçlarındadır; uç aralığa dahil değilse o değer alınamaz.
**Açılış sorusu:** Çocuk bileti 12 yaşından küçüklere geçerliyse ve fiyat yaşla artıyorsa en pahalı çocuk bileti hangi yaşındır?
**Ana görsel:** Düzlemde doğru parçası; uçlarında dolu ya da boş nokta, y eksenine düşen iz.

| Sahne | Ne olur |
|---|---|
| 1. Artan, kapalı aralık | h(x) = 2x + 1, [−1, 3]. Tahmin: en büyük değer hangi uçta? Sağ uçta: h(3) = 7. En küçük sol uçta: h(−1) = −1. |
| 2. Azalan olunca | h(x) = −x + 4, [0, 3]. Tahmin: en büyük değer hangi uçta? Sol uçta: 4. En küçük sağ uçta: 1. Kural: artanda sağ uç, azalanda sol uç en büyüğü verir. |
| 3. Uç dahil değilse | h(x) = 2x + 1, [−1, 3). Sağ uç boş nokta. Nokta 3'e yaklaşır: 6,8 · 6,98 · 6,998; 7'ye varamaz. Tahmin: en büyük değer kaç? Yok. En küçük değer yine −1. |
| 4. Dene | Dört düğme: sol uç dahil / değil, sağ uç dahil / değil; bir de artan / azalan. Tahta "en büyük değer: … / yok", "en küçük değer: … / yok" yazar. |

**Hedeflenen yanılgı:** Açık uçta "en büyük değer 7" ya da "6,99" demek; azalan fonksiyonda da en büyüğü sağ uçta aramak.
**Akılda kalıcı cümle:** "Uç aralığa dahil değilse o uçtaki değer alınamaz."
**Çıkış soruları:** h(x) = 3x − 2, [0, 4] aralığında en büyük değerini kaç alır? (10; çeldiriciler: −2, 4) · h(x) = x + 1, (2, 5) aralığında en küçük değeri kaçtır? (yoktur; çeldiriciler: 3, 2)

---

## A16 — Parçalı gösterim

**Dosya:** `a16-parcali-gosterim`
**Fikir:** Gerçek sayıları aralıklara bölüp her aralıkta başka bir doğrusal fonksiyon kullanan fonksiyon, parçalı gösterimle yazılır.
**Açılış sorusu:** Buz kütlesini ısıtırken sıcaklık baştan sona aynı hızla mı yükselir?
**Ana görsel:** Zaman–sıcaklık düzleminde üç parçalı grafik; yanında süslü parantezli yazım (`KIT.parcali`).

| Sahne | Ne olur |
|---|---|
| 1. Veriler | Örnek deney verisi tabloda: 0, 1, 2, 4, 6, 7, 8. dakikalarda −20, −10, 0, 0, 0, 5, 10 °C. Noktalar düzleme konur. Tahmin: hepsi tek bir doğru üzerinde mi? Değil. |
| 2. Üç parça | Noktalar üç doğru parçasıyla birleşir: ilk 2 dakika yükselir, 2 ile 6 arası 0'da kalır, sonra daha yavaş yükselir. Her parçanın kuralı yazılır: 10t − 20 · 0 · 5t − 30. |
| 3. Tek yazım | Üç kural süslü parantezle alt alta, yanlarında aralıkları: 0 ≤ t < 2 · 2 ≤ t ≤ 6 · 6 < t ≤ 8. Ad: **parçalı gösterim**. Tahmin: T(7) hangi satırla bulunur? Üçüncü: 5 · 7 − 30 = 5. |
| 4. Dene | Kaydırıcı t: nokta grafikte yürür, hangi aralıktaysa o satır yanar, değer hesaplanır. |

**Hedeflenen yanılgı:** Parçalı gösterimi üç ayrı fonksiyon sanmak; bir t için birden çok satır kullanmak.
**Akılda kalıcı cümle:** "Her aralığın kendi kuralı vardır."
**Çıkış soruları:** p(x), x < 1 için x + 4, x ≥ 1 için 2x olsun. p(1) kaçtır? (2; çeldiriciler: 5, 7) · Parçalı gösterimde hangi kuralın kullanılacağını ne belirler? (x'in hangi aralıkta olduğu; çeldiriciler: çıktının işareti, hangisi kolaysa)
**Not:** Veriler örnektir; erimenin fiziği anlatılmaz (karar: ısıtılan buz). Orta parça sabit fonksiyondur (A8).

---

## Yazım sırasında senaryodan sapmalar (7 Ekim 2026)

Yukarıdaki senaryolarda eski hâli duruyorsa geçerli olan budur. Sapmaların çoğunun nedeni tahtadaki 25 kelime sınırıdır: ölçücü eksen sayılarını ve simgeleri de kelime sayar.

- **Genel:** düzlemlerde sayılar iki birimde bir yazılır; formül ağırlıklı sahnelerde eksen sayıları ya da eksen adları kapalıdır. Biten adım ya da tablo sonraki adım gelmeden kalkar. 1/2 her yerde "0,5" yazılır.
- **A3 sahne 3:** aralık [−2, 5] yerine [−2, 4] (düzlem −5…5; 5 kenarda kalıyordu).
- **A6:** sahne 1'de tablo üç sütun (−3, −1, 1); sahne 2'de tablo yok, "g(2) = f(0) = 0" satırı sırayla çıkar. y = x doğrusunda "2 yukarı" ile "2 sola" aynı doğruyu verdiği için ikisi aynı soruda şık olmaz.
- **A7:** sahne 3'te kaydırıcı −3…3 (a = 0'da "eğim = 0", ad verilmez) ve −2x'in yanında kesikli 2x ("aynı diklikte"). Sahne 4 soru tahtası yerine üç küçük düzlem (A, B, C).
- **A8:** sahne 2'de önce animasyon, sonra tahmin ("a = 0 olursa?"), kaydırıcı sonda. Sahne 3 iki ayrı küçük düzlem.
- **A9:** sahne 2'de doğru tahminlerden sonra çizilir; x eksenindeki kesişim denklem çözülerek değil g(2) = 0 yerine koyularak doğrulanır. A'nın kuralı "10x + 40" yazılır.
- **A10:** sahne 1'in sonunda "h(x) = ax + b" genel biçimi tanıtılır. Dört doğru da turuncu; yeşil ve mor yalnızca kuraldaki a sayısındadır (doğruyu boyamak "eksenin altındaki doğru azalandır" yanılgısını beslerdi).
- **A11:** sahne 2'ye tahmin ve gün kaydırıcısı eklendi. Sahne 4'ün üçüncü kartı h(x) = −2x + 8 (senaryodaki kart çıkış sorusuyla aynıydı).
- **A12:** "h(x) = ax + b" ispat sahnelerinde altyazıdadır; tahtada a > 0 (ya da a < 0) çarpma adımının gerekçesi olarak durur. Sahne 4'ün ilk kartı önermeyi gösterir.
- **A13:** ispat dört satır: önce h(x₁) = h(x₂) (hipotez), sonra kuralın yerine yazılması.
- **A14:** sahne 1'in tahmini "Üç örnek tuttu. Varsayım kesin doğru mu?" (doğru şık: henüz bilemeyiz). Sahne 3'ün sonunda a ve b pozitif değerlerde gezerken sıfırın solda kaldığı gösterilir.
- **A15:** sahne 4'te üç aç-kapa düğmesi (sol uç, sağ uç, artan/azalan); azalan örnek −x + 4, [−1, 3].
- **A16:** sahne 3 ve 4'te düzlem sayısız (parçalı yazım tek başına 24 kelime); T(7) hesabı altyazıda.
