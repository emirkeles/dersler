# Konu C — Doğrusal fonksiyonlarla denklem ve eşitsizlik problemleri: kısa senaryolar

Dayanak `../MUFREDAT.md`, MAT.9.2.3 ve `../PLAN.md` (kararlar bölüm 7). Ortak görsel dil, renk rolleri ve yazım `A-dogrusal-fonksiyonlar.md` dosyasının başındadır: f mavi, g turuncu, mutlak değerli grafik turkuaz, kök ve kesişim sarı. Çözüm kümesi x ekseninde kalın sarı şerit olarak gösterilir; uçlarda dolu ya da boş nokta (1. tema B2).

Her derste aynı ritim vardır: önce grafikten bir yorum, sonra cebirsel çözüm, sonunda ikisinin karşılaştırılması. Programın saydığı biçimlerin dışına çıkılmaz: iki mutlak değerli denklem, çarpım ve bölüm eşitsizlikleri, iki bilinmeyenli sistem yöntemleri, parametreli sorular yok.

## Dizi

| # | Ders | Akılda kalıcı cümle |
|---|---|---|
| C1 | Problemi fonksiyona çevirmek | "Sözü fonksiyona, fonksiyonu grafiğe çevir." |
| C2 | f(x) = 0, f(x) < 0 ve f(x) > 0 | "Çözüm, fonksiyonun sıfırından ve işaretinden okunur." |
| C3 | f(x) = g(x): iki doğrunun kesişimi | "Doğruların kesiştiği yerde iki fonksiyon eşittir." |
| C4 | f(x) ≤ g(x) ve f(x) ≥ g(x) | "Eşitsizlik, hangi doğrunun üstte kaldığını sorar." |
| C5 | \|f(x)\| = k | "Mutlak değer k ise iki yol vardır; k negatifse yoktur." |
| C6 | \|f(x)\| < k ve \|f(x)\| > k | "Küçüktür tek aralık, büyüktür iki ayrı aralık verir." |
| C7 | \|f(x)\| = g(x) | "Önce işarete bak, iki yola ayrıl, sonunda yerine koy." |
| C8 | \|f(x)\| ≤ g(x) ve \|f(x)\| ≥ g(x) | "Önce eşitliği çöz, sonra hangi grafiğin üstte kaldığına bak." |
| C9 | Çözümü başka yoldan sınamak | "Bir yoldan bulduğunu başka bir yoldan sına." |
| C10 | Modelin sınırı | "Model, doğru olduğu aralıkta kullanılır." |

---

## C1 — Problemi fonksiyona çevirmek

**Dosya:** `c1-problemi-fonksiyona-cevirmek`
**Fikir:** Sözel bir problemdeki iki nicelik doğrusal fonksiyonlarla yazılır; cebirsel ve grafik temsil arasında geçilir ve her temsilin problemdeki anlamı söylenir.
**Açılış sorusu:** Bir kargo firması sabit 20 lira artı kilo başına 5 lira alıyorsa 4 kilonun ücretini nasıl, 10 kilonunkini nasıl bulursun?
**Ana görsel:** Solda kargo fişi (sabit ücret ve kilo ücreti iki satır), ortada kural, sağda kilo–ücret düzlemi.

| Sahne | Ne olur |
|---|---|
| 1. Sözden kurala | 4 kilo: 20 + 5 · 4 = 40. 10 kilo: 20 + 5 · 10 = 70. Tahmin: x kilo için kural hangisi? f(x) = 5x + 20. Kuralın parçaları adlandırılır: 20 sabit terim (kutu boşken ödenen), 5 katsayı (her kiloda eklenen). |
| 2. Kuraldan grafiğe | Tablo (0, 2, 4, 6 kilo → 20, 30, 40, 50) düzleme taşınır; doğru çizilir. Ağırlık negatif olmaz: grafik x = 0'dan başlar. y eksenini 20'de keser, her kiloda 5 yükselir. |
| 3. Grafiğin dili | Doğru üzerindeki (6, 50) noktası: "6 kilo, 50 lira". Tahmin: "60 lirayla kaç kilo gönderirim?" hangi denklem? 5x + 20 = 60. "En çok 60 lira harcarım" ise 5x + 20 ≤ 60. Soru, fonksiyon ile bir sayı arasındaki ilişkidir. |
| 4. Sıra sende | Kartlar: "tam 45 lira ödedim" · "en az 45 lira ödedim" · "45 liradan az ödedim" cümleleri denklem ya da eşitsizlikle eşleştirilir; her eşleşmede grafikte ilgili nokta ya da bölge yanar. |

**Hedeflenen yanılgı:** Sabit ücret ile kilo ücretinin yerini değiştirmek (20x + 5); "en çok" sözünü ≥ ile yazmak.
**Akılda kalıcı cümle:** "Sözü fonksiyona, fonksiyonu grafiğe çevir."
**Çıkış soruları:** Girişi 30 lira, saati 10 lira olan otoparkın x saatlik ücreti hangisidir? (10x + 30; çeldiriciler: 30x + 10, 40x) · f(x) = 5x + 20 kuralında 20 neyi anlatır? (ağırlıktan bağımsız sabit ücreti; çeldiriciler: kilo başına ücreti, en çok ağırlığı)
**Not:** Denklem ve eşitsizlik burada yalnızca kurulur; çözümü sonraki derslerde.

---

## C2 — f(x) = 0, f(x) < 0 ve f(x) > 0

**Dosya:** `c2-sifir-ve-isaretle-cozum`
**Fikir:** Fonksiyonun sıfırı denklemin, işaret tablosu eşitsizliğin çözümünü verir.
**Açılış sorusu:** 60 litrelik bir tank dakikada 5 litre boşalıyorsa kaç dakika sonra su kalmaz, kaç dakika boyunca su vardır?
**Ana görsel:** Solda boşalan tank; düzlemde f(x) = −5x + 60; altında işaret tablosu ve x ekseninde çözüm şeridi.

| Sahne | Ne olur |
|---|---|
| 1. f(x) = 0 | f(x) = −5x + 60. Tahmin: tank kaç dakikada boşalır? 12. Denklemin çözümü fonksiyonun sıfırıdır: **kök**, x = −b/a = 12. Grafikte x eksenini kestiği nokta. |
| 2. f(x) > 0 | "Su var" demek f(x) > 0 demek. Grafik kökün solunda eksenin üstünde: x < 12. İşaret tablosu (A11): +, 0, −. Tankta süre 0'dan başlar: 0 ≤ x < 12. |
| 3. f(x) < 0 | Tahmin: gerçek sayılarda f(x) < 0'ın çözümü hangisi? x > 12: (12, ∞). Tabloda eksi tarafı. Tank için anlamı yok; kural gerçek sayılarda çözülür, bağlam ayrıca yorumlanır. |
| 4. Sıra sende | Kartlar: 2x − 6 = 0'ın çözümü · 2x − 6 < 0'ın çözümü · −x + 4 > 0'ın çözümü. Her kartta doğru çizilir, çözüm x ekseninde şerit olarak yanar. |

**Hedeflenen yanılgı:** Eşitsizliği çözerken a'nın işaretine bakmadan hep "x > kök" yazmak; kökü çözüme dahil etmek.
**Akılda kalıcı cümle:** "Çözüm, fonksiyonun sıfırından ve işaretinden okunur."
**Çıkış soruları:** 3x − 12 > 0 eşitsizliğinin çözüm kümesi hangisidir? ((4, ∞); çeldiriciler: (−∞, 4), [4, ∞)) · f(x) = 0 denkleminin çözümü grafikte nerededir? (x eksenini kestiği yerde; çeldiriciler: y eksenini kestiği yerde, en yüksek noktada)
**Not:** İşaret tablosu A11'de kuruldu; burada kullanılır (karar 8).

---

## C3 — f(x) = g(x): iki doğrunun kesişimi

**Dosya:** `c3-iki-dogrunun-kesisimi`
**Fikir:** İki doğrusal fonksiyonun grafiklerinin kesişim noktası, f(x) = g(x) denkleminin çözümüdür.
**Açılış sorusu:** Fiyat arttıkça satıcı daha çok, alıcı daha az mal getiriyorsa ikisinin eşitlendiği fiyat nasıl bulunur?
**Ana görsel:** Miktar–fiyat düzleminde artan arz doğrusu (mavi) ve azalan talep doğrusu (turuncu); kesişim sarı.

| Sahne | Ne olur |
|---|---|
| 1. İki doğru | Miktar x bağımsız, fiyat bağımlı değişken. Arz: f(x) = x + 5. Talep: g(x) = −2x + 20. İkisi çizilir: biri artan, biri azalan. Tahmin: hangi miktarda buluşurlar? |
| 2. Kesişim, denklemin çözümü | Kesişimde iki fonksiyon aynı değeri verir: x + 5 = −2x + 20. 3x = 15, x = 5. Fiyat f(5) = 10. Grafikte (5, 10) yanar: **denge fiyatı** 10. Kontrol: g(5) = 10. |
| 3. Strateji | Grafik yaklaşık yeri gösterir, cebir kesin değeri verir. Tahmin: x + 5 = −2x + 20 hangi tek fonksiyonun sıfırını bulmaktır? 3x − 15 = 0: C2'deki iş. |
| 4. Dene | Kaydırıcı talep doğrusunun sabit terimini 14 ile 26 arasında değiştirir. Kesişim ve denge fiyatı güncellenir; altında denklem ve çözümü yazılır. |

**Hedeflenen yanılgı:** Kesişim noktasının yalnızca x'ini ya da yalnızca y'sini çözüm sanmak; kesişimi y eksenindeki kesişimlerle karıştırmak.
**Akılda kalıcı cümle:** "Doğruların kesiştiği yerde iki fonksiyon eşittir."
**Çıkış soruları:** f(x) = 2x + 1 ve g(x) = x + 4 için f(x) = g(x) denkleminin çözümü kaçtır? (3; çeldiriciler: 5, 7) · İki doğrunun kesişim noktası (3, 7) ise hangisi doğrudur? (f(3) = g(3) = 7; çeldiriciler: f(7) = g(7) = 3, f(3) = 7 ve g(7) = 3)
**Not:** Arz-talep program metnindeki kadarıyla (karar: arz-talep). Paralel doğrular, yerine koyma ve yok etme yöntemleri yok.

---

## C4 — f(x) ≤ g(x) ve f(x) ≥ g(x)

**Dosya:** `c4-hangi-dogru-ustte`
**Fikir:** Eşitsizliğin çözümü, bir doğrunun öbürünün altında ya da üstünde kaldığı aralıktır; f(x) < 0, g(x) = 0 olan özel bir hâldir.
**Açılış sorusu:** İki kargo firmasından hangisi kaç kilodan sonra daha ucuz olur?
**Ana görsel:** Kilo–ücret düzleminde iki doğru (A9'daki kargolar); kesişimin iki yanında altta kalan doğru parlak; x ekseninde çözüm şeridi.

| Sahne | Ne olur |
|---|---|
| 1. Grafikte | A firması f(x) = 10x + 40, B firması g(x) = 20x. Kesişim 4 kiloda. Tahmin: 6 kiloda hangisi ucuz? A. Kesişimin sağında f altta, solunda g altta. "A daha pahalı değil": f(x) ≤ g(x). |
| 2. Cebirle | 10x + 40 ≤ 20x. 40 ≤ 10x. x ≥ 4. Çözüm [4, ∞): eşitlik dahil, uçta dolu nokta. Grafikteki şeritle aynı. f(x) ≥ g(x) ise öbür yan: x ≤ 4 (ağırlık için 0 ≤ x ≤ 4). |
| 3. Özel hâl: g(x) = 0 | g doğrusu yatıklaşıp x ekseninin üstüne iner: g(x) = 0, her a için nokta (a, 0). Tahmin: f(x) < g(x) şimdi ne oldu? f(x) < 0. x ekseni de bir fonksiyonun grafiğidir; C2 bu dersin özel hâliydi. |
| 4. Dene | Kaydırıcı x (kilo): iki ücret yan yana yazılır, küçük olan yanar; x = 4'te eşit. |

**Hedeflenen yanılgı:** "Üstteki doğru daha ucuz" demek; ≤ ile <'ü ayırmamak (uç dahil mi?).
**Akılda kalıcı cümle:** "Eşitsizlik, hangi doğrunun üstte kaldığını sorar."
**Çıkış soruları:** f(x) = x + 6 ve g(x) = 3x için f(x) ≥ g(x) eşitsizliğinin çözümü hangisidir? (x ≤ 3; çeldiriciler: x ≥ 3, x ≤ 6) · f(x) < 0, f(x) < g(x) eşitsizliğinin özel hâlidir. Bu hâlde g(x) kaçtır? (0; çeldiriciler: x, 1)

---

## C5 — |f(x)| = k

**Dosya:** `c5-mutlak-deger-esittir-k`
**Fikir:** |f(x)| = k denklemi k > 0 iken iki, k = 0 iken bir çözüm verir, k < 0 iken çözümsüzdür.
**Açılış sorusu:** Bir makine 500 gram doldurmaya çalışıyor ve paket tam 10 gram sapıyorsa paket kaç gram olabilir?
**Ana görsel:** Düzlemde turkuaz V ve yukarı aşağı kayan yatay y = k çizgisi (turuncu); kesişimler sarı.

| Sahne | Ne olur |
|---|---|
| 1. İki yol | Sapma \|x − 500\|. Sayı doğrusunda 500'e uzaklığı 10 olan iki nokta: 490 ve 510. \|x − 500\| = 10 demek x − 500 = 10 ya da x − 500 = −10 demek. |
| 2. Grafikte | t(x) = \|2x − 6\| ve y = k. Kaydırıcı k: −2 ile 6. Tahmin (önce): k = 0 iken kaç çözüm? k > 0: iki kesişim. k = 0: tek kesişim, V'nin ucu: f'nin sıfırı, 3. k < 0: çizgi V'nin altında, kesişim yok. |
| 3. Cebirle | \|2x − 6\| = 4. 2x − 6 = 4 ise x = 5. 2x − 6 = −4 ise x = 1. Yerine koy: \|10 − 6\| = 4, \|2 − 6\| = 4. İki çözüm sıfırın (3) iki yanında eşit uzaklıkta. |
| 4. Sıra sende | Kartlar: \|x + 2\| = 0'ın çözümü ({−2}) · \|x − 1\| = −3'ün çözümü (∅) · \|x\| = 7'nin çözümü ({−7, 7}). |

**Hedeflenen yanılgı:** Yalnızca pozitif yolu çözmek; k < 0 iken de iki çözüm aramak.
**Akılda kalıcı cümle:** "Mutlak değer k ise iki yol vardır; k negatifse yoktur."
**Çıkış soruları:** \|x − 4\| = 6 denkleminin çözüm kümesi hangisidir? ({−2, 10}; çeldiriciler: {10}, {2, 10}) · \|3x + 1\| = −2 denkleminin kaç çözümü vardır? (0; çeldiriciler: 1, 2)

---

## C6 — |f(x)| < k ve |f(x)| > k

**Dosya:** `c6-mutlak-deger-esitsizlikleri`
**Fikir:** |f(x)| < k tek bir aralık, |f(x)| > k iki ayrı aralık verir.
**Açılış sorusu:** Bir ilaç dolabının sıcaklığı 4 °C'den 2 dereceden az sapmalıysa hangi sıcaklıklar uygundur?
**Ana görsel:** Düzlemde V (t(x) = \|x − 4\|) ve y = 2 çizgisi; çizginin altında ve üstünde kalan kollar ayrı renkte; x ekseninde çözüm şeridi.

| Sahne | Ne olur |
|---|---|
| 1. Küçüktür: altta kalan | \|x − 4\| < 2. V'nin y = 2 çizgisinin altında kalan kısmı yanar; x eksenindeki gölgesi tek parça: (2, 6). Uçlar boş nokta. Dolap için: 2 ile 6 derece arası. |
| 2. Büyüktür: üstte kalan | Tahmin: \|x − 4\| > 2'nin çözümü kaç parça? İki: (−∞, 2) ∪ (6, ∞). V'nin çizginin üstünde kalan iki kolu. |
| 3. Cebirle | \|x − 4\| < 2 ⇔ −2 < x − 4 < 2 ⇔ 2 < x < 6. \|2x − 6\| > 4 ⇔ 2x − 6 > 4 ya da 2x − 6 < −4 ⇔ x > 5 ya da x < 1. "Küçüktür" bir "ve", "büyüktür" bir "veya"dır (1. tema D2). |
| 4. k = 0 olunca | Tahmin: \|x − 4\| < 0'ın çözümü? Yok: mutlak değer negatif olmaz. Tahmin: \|x − 4\| > 0'ın çözümü? 4 dışındaki her sayı: ℝ ∖ {4}. |

**Hedeflenen yanılgı:** \|f(x)\| > k'yi tek aralık yazmak (−k > f(x) > k gibi); k = 0 hâllerini karıştırmak.
**Akılda kalıcı cümle:** "Küçüktür tek aralık, büyüktür iki ayrı aralık verir."
**Çıkış soruları:** \|x − 1\| < 3 eşitsizliğinin çözüm kümesi hangisidir? ((−2, 4); çeldiriciler: (−∞, −2) ∪ (4, ∞), (−4, 2)) · \|x + 5\| > 0 eşitsizliğinin çözüm kümesi hangisidir? (ℝ ∖ {−5}; çeldiriciler: ℝ, ∅)
**Not:** Program yalnızca < ve > yazıyor; ≤ ve ≥ bu derste yok (karar: eşitsizlik biçimleri). Aralık gösterimi ve ∪ 1. temadan bilinir.

---

## C7 — |f(x)| = g(x)

**Dosya:** `c7-mutlak-deger-esittir-dogru`
**Fikir:** |f(x)| = g(x) denklemi, f(x)'in işaretine göre iki duruma ayrılır; bulunan her çözüm denklemde denenir.
**Açılış sorusu:** Biri eve uzaklığa göre, öbürü sabit artışla ücret alan iki kurye hangi mesafede aynı ücreti ister?
**Ana görsel:** Düzlemde turkuaz V ve turuncu doğru; kesişimler sarı; yanında iki sütunlu çözüm (iki durum).

| Sahne | Ne olur |
|---|---|
| 1. Grafikte | \|x − 3\| ve g(x) = x/2 çizilir. Tahmin: kaç çözüm var? İki kesişim: (2, 1) ve (6, 3). |
| 2. İki duruma ayır | x ≥ 3 ise x − 3 = x/2, x = 6. x < 3 ise −x + 3 = x/2, x = 2. Her çözüm kendi durumunun koşulunu sağlıyor. Yerine koy: \|6 − 3\| = 3 = 6/2, \|2 − 3\| = 1 = 2/2. |
| 3. Sahte çözüm | \|x − 1\| = 2x + 4. İki durumdan x = −5 ve x = −1 çıkar. Tahmin: ikisi de çözüm mü? Grafikte tek kesişim var. Yerine koy: x = −5 için 6 ≠ −6. Çözüm kümesi {−1}. −5, x ≥ 1 koşulunu sağlamıyordu. |
| 4. Sıra sende | \|x − 2\| = x için kartlar: x ≥ 2 durumunda ne çıkar? (çözüm yok) · x < 2 durumunda? (x = 1) · yerine koyunca? (\|1 − 2\| = 1). |

**Hedeflenen yanılgı:** Bulunan her sayıyı çözüm saymak; durumun koşulunu (x ≥ 3) unutmak.
**Akılda kalıcı cümle:** "Önce işarete bak, iki yola ayrıl, sonunda yerine koy."
**Çıkış soruları:** \|x − 2\| = x denkleminin çözüm kümesi hangisidir? ({1}; çeldiriciler: {1, 2}, ∅) · Bulunan sayı neden denklemde denenir? (Durumun koşulunu sağlamayan sahte çözüm çıkabilir; çeldiriciler: Denklem her zaman iki çözümlüdür, Denemeye gerek yoktur)
**Not:** İki durum B6'daki parçalı gösterimdir. \|f(x)\| = \|g(x)\| biçimi yok.

---

## C8 — |f(x)| ≤ g(x) ve |f(x)| ≥ g(x)

**Dosya:** `c8-mutlak-deger-ile-dogru-esitsizligi`
**Fikir:** Eşitsizliğin çözümü, mutlak değerli grafiğin g'nin grafiğinin altında ya da üstünde kaldığı aralıktır.
**Açılış sorusu:** Hangi mesafelerde birinci kuryenin ücreti ikincisinden fazla olmaz?
**Ana görsel:** C7'deki V ve doğru; V'nin doğrunun altında kalan kısmı parlak; x ekseninde çözüm şeridi.

| Sahne | Ne olur |
|---|---|
| 1. Altta kalan | \|x − 3\| ≤ x/2. Kesişimler 2 ve 6 (C7). Tahmin: V hangi x'lerde doğrunun altında? Arada: [2, 6]. Uçlar dolu nokta. |
| 2. Üstte kalan | \|x − 3\| ≥ x/2: V'nin doğrunun üstünde kalan iki kolu. (−∞, 2] ∪ [6, ∞). |
| 3. Cebirle | Önce eşitlik: 2 ve 6. Bu iki sayı ekseni üç bölgeye ayırır; her bölgeden bir sayı denenir. x = 0: 3 ≤ 0 yanlış. x = 4: 1 ≤ 2 doğru. x = 8: 5 ≤ 4 yanlış. Çözüm ortadaki bölge. |
| 4. Sıra sende | \|x\| ≥ x + 2 için kartlar: grafikte kaç kesişim var? (bir: x = −1) · x = 0 sağlar mı? (hayır) · x = −3 sağlar mı? (evet) · çözüm kümesi? ((−∞, −1]). |

**Hedeflenen yanılgı:** Eşitsizliği doğrudan iki eşitsizliğe bölüp koşulları unutmak; uçları dahil etmeyi unutmak.
**Akılda kalıcı cümle:** "Önce eşitliği çöz, sonra hangi grafiğin üstte kaldığına bak."
**Çıkış soruları:** \|x − 3\| ile x/2 grafikleri 2 ve 6'da kesişiyor; x = 4 için \|x − 3\| ≤ x/2 doğru. Çözüm kümesi hangisidir? ([2, 6]; çeldiriciler: (−∞, 2] ∪ [6, ∞), (2, 6)) · V'nin doğrunun üstünde ya da üzerinde kaldığı yerler hangi eşitsizliğin çözümüdür? (\|f(x)\| ≥ g(x); çeldiriciler: \|f(x)\| ≤ g(x), \|f(x)\| = g(x))

---

## C9 — Çözümü başka yoldan sınamak

**Dosya:** `c9-cozumu-baska-yoldan-sinamak`
**Fikir:** Bulunan çözüm yerine koyma, grafik ya da başka bir stratejiyle sınanır; hata varsa düzeltilir.
**Açılış sorusu:** Bir kasiyer aynı hesabı iki farklı yoldan yapıp aynı sonucu bulursa ne anlar?
**Ana görsel:** Solda adım adım yazılmış (bir adımı hatalı) çözüm; sağda aynı problemi gösteren düzlem.

| Sahne | Ne olur |
|---|---|
| 1. Yerine koy | 3x − 5 = x + 7 için yazılı çözüm: 3x − x = 7 − 5, 2x = 2, x = 1. Yerine koy: sol −2, sağ 8. Tutmadı. Tahmin: hata hangi adımda? İlk adımda: −5 karşıya +5 olarak geçmeliydi. Doğrusu 2x = 12, x = 6; 13 = 13. |
| 2. Grafikle sına | İki doğru çizilir: (6, 13)'te kesişirler. x = 1'de aralarında 10 birim fark var. Grafik hem yanlışı hem doğruyu gösterir. |
| 3. Eşitsizlikte | −2x + 6 > 0 için yazılı çözüm: −2x > −6, x > 3. Tahmin: x = 4 sağlar mı? −2 > 0 yanlış. Negatifle bölünce yön dönmeliydi: x < 3. İşaret tablosu da aynı şeyi söyler: azalan, sıfırın solunda pozitif. |
| 4. Hangi yol? | Kartlar: "Tek bir sayıyı denetleyeceğim" (yerine koy) · "Bir aralığı denetleyeceğim" (grafik ya da işaret tablosu) · "Kesin değeri bulacağım" (cebir). Kapanış: aynı sonucu iki yoldan bulmak güveni artırır, farklı çıkarsa biri hatalıdır. |

**Hedeflenen yanılgı:** Yerine koymayı zaman kaybı saymak; eşitsizlikte tek bir sayının tutmasını çözümün tamamı için kanıt saymak.
**Akılda kalıcı cümle:** "Bir yoldan bulduğunu başka bir yoldan sına."
**Çıkış soruları:** 2x + 3 = 11 için x = 5 bulundu. Yerine koyunca ne görülür? (2 · 5 + 3 = 13: çözüm yanlış; çeldiriciler: çözüm doğru, karar verilemez) · −x + 2 < 0 için "x < 2" bulundu. Hangi deneme hatayı gösterir? (x = 0: çözümde sayılıyor ama 2 < 0 yanlış; çeldiriciler: x = 2: 0 < 0 yanlış, hiçbir deneme hatayı göstermez)

---

## C10 — Modelin sınırı

**Dosya:** `c10-modelin-siniri`
**Fikir:** Çözümden çıkan kural benzer problemler için bir model olur; her modelin güçlü ve zayıf yanı, geçerli olduğu sınır vardır.
**Açılış sorusu:** Bir gölde su her gün 2 cm çekiliyorsa bu kuralın 100 gün sonrası için de geçerli olduğuna güvenir misin?
**Ana görsel:** Gün–derinlik düzleminde azalan doğru; geçerli aralık parlak, dışı soluk ve kesik; yanında küçük göl kesiti.

| Sahne | Ne olur |
|---|---|
| 1. Kuraldan modele | Gölün derinliği 300 cm, her gün 2 cm azalıyor: h(x) = 300 − 2x. Tank (C2) ve hesap (A11) aynı kalıptaydı: başlangıç + günlük değişim · gün. Bu kalıp bir **model**dir. |
| 2. Modelin gücü | Tahmin: 40. günde derinlik? 220 cm. Tahmin: derinlik ne zaman 200 cm'nin altına iner? 300 − 2x < 200, x > 50. Model ölçmeden önceden söyler. |
| 3. Modelin sınırı | Tahmin: 200. günde model ne der? −100 cm. Olamaz: göl 150. günde kurur. Model 0 ≤ x ≤ 150 için anlamlı; doğrunun dışarıda kalan kısmı soluklaşır. Yağmur yağarsa "her gün 2 cm" de değişir. |
| 4. Sıra sende | Kartlar: "10. günde 280 cm" (güvenilir) · "200. günde −100 cm" (anlamsız: aralık dışı) · "Yağmurlu haftada da her gün 2 cm" (kuşkulu: koşul değişti). |

**Hedeflenen yanılgı:** Kuralın verdiği her sayıyı gerçek saymak; modelin tanım kümesini düşünmemek.
**Akılda kalıcı cümle:** "Model, doğru olduğu aralıkta kullanılır."
**Çıkış soruları:** h(x) = 300 − 2x modeli hangi x'ler için anlamlıdır? (0 ≤ x ≤ 150; çeldiriciler: her gerçek sayı, x ≥ 150) · Bu modelin zayıf yanı hangisidir? (Koşullar değişirse kural geçerliliğini yitirir; çeldiriciler: Grafiği çizilemez, Hiçbir günü doğru vermez)
**Not:** Ekoloji bağlamı programın önerdiği toplumsal fayda örneğidir. Modelleme süreci için ayrı terimler verilmez.

---

## Yazım sırasında senaryodan sapmalar (7 Ekim 2026)

Yukarıdaki senaryolarda eski hâli duruyorsa geçerli olan budur.

- **C1:** sahne 2'de tablo, noktalar düzleme taşınınca kalkar. Sahne 3'e "en çok 60 lira" için ikinci tahmin eklendi.
- **C2:** tank yalnızca sahne 1'de; işaret tablosu sağ sütunda. Kökün sayısı kökün yanına sarı yazılır.
- **C3:** sahne 3'te "grafik yaklaşık, cebir kesin" fikri için talep kısa süre g(x) = −2x + 22 olur (kesişim 17/3), sonra 20'ye döner. 3x − 15 doğrusu beyaz çizilir. Sahne 4 kaydırıcısı 3'er adımlı.
- **C4 sahne 3:** kargo doğrularıyla değil f(x) = −x + 3 ve g(x) = 2x ile kurulur. g(x) = 20x yatıklaşırken eğimi 10'dan geçer ve o anda f ile paralel olur; ayrıca f(x) = 10x + 40'ın sıfırı negatif ağırlıktır.
- **C5:** sahne 2'de tahmin k = 4'teki iki kesişimden sonra sorulur. Sahne 3'te düzlem yok: tam tahta cebir ve sonunda 1, 3, 5 sayı doğrusu.
- **C6:** sahne 2'nin sonuna k kaydırıcısı (1–3) eklendi. Sahne 3 üç ardışık tahta (küçüktür, büyüktür, karşılaştırma); "ve" ile "veya" sayı doğrusunda gösterilir.
- **C7:** açılmış denklem satırı aynı yerde çözüme dönüşür. Sahne 3'te sağ kolun kesik uzantısı ve (−5, −6)'daki boş kırmızı nokta sahte çözümün V'nin olmadığı yerde çıktığını gösterir.
- **C8:** sahne 2'nin sonuna x kaydırıcısı eklendi. Sahne 3 düzlemde değil sayı doğrusunda (üç bölge, üç deneme); "bölge içinde üstteki grafik değişmez, tek deneme yeter" cümlesi eklendi.
- **C9:** yerine koyma iki yanın değerini gösteren iki kutuyla yapılır. Sahne 2'ye x kaydırıcısı, sahne 3'e küçük bir grafik eklendi.
- **C10:** sahne 1'de kalıp "başlangıç ve her adımdaki değişim" diye yazılır. Sahne 3'ün sonuna gün kaydırıcısı (0–200) eklendi; yağmur etiketsiz kesik çizgidir.
