# Senaryolar — Konu C · Hâl değişimi

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.3, `../PLAN.md` bölüm 3 (C1, C2, C3), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 4, 7, 9, 15, 16, 19) ve bölüm 8 ("C" satırları). Biçim örneği: `A-ic-enerji-isi-sicaklik.md`. Taslak (bölüm 3) ile kararlardan sonraki liste çelişirse liste ve kararlar geçerlidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("33.400 J" → "otuz üç bin dört yüz joule", "0 °C" → "sıfır derece", "334 J/g" → "gram başına üç yüz otuz dört joule").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyi Ela yapar.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir. Her sorunun iki çeldiricisi vardır.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster (çözülmüş örnek) → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Sorulardan önce anlatım gelir; "Tahmin et" soruları (`tag: 'Tahmin et'`) durum tanıtıldıktan sonra sezgiyle sorulur, cevabı hemen ardından gösterilir.
- Renkler tema boyunca aynıdır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle (madde miktarı) turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir. Tahta koyudur: çizgiler açık renklidir.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Yazı en az 22 birimdir. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız).
- **Figür Ş2 (`ISITMA`, ikiz ısıtma düzeneği; `IZOMETRIK.md` bölüm 6b).** Bu konuda üç derste de kullanılır (C3'te yalnızca hazır pozla). Ayarlar: `icerik` (`'buz'`, `'mum'`, `'su'`, `'bos'`), `seviye` (kabın doluluğu), `sicaklik` (termometre sütunu, –20…120 °C), `alev` (0 kapalı, 1 kısık, 2 açık), `kati` (erimemiş oran), `f.sure(sn)` (süreölçer; bir tur 60 sn), `f.goster(ist, 0…1)`. Figürde yazı yoktur: etiket, sayı ve sayaç düz katmandadır ve `nokta(ad)`'a bağlanır.
  - Kütle `seviye` ile gösterilir: 100 g → 0,25; 200 g → 0,45; 300 g → 0,65; 400 g → 0,85 (kural: 0,05 + 0,2 × kütle/100). Bu konuda yalnız `seviye` kütle için kullanılır.
  - Bal mumunun erime sıcaklığı için sayı yoktur; `'mum'` istasyonunda `sicaklik` sütun yüksekliği olarak 40 verilir. Bu yalnızca görsel ayardır: bal mumunda tahtaya sıcaklık yazısı konmaz. Buzda sütun 0 °C'tadır ve yanında sarı "0 °C" yazar.
  - Isıtıcının yanması `alev: 2`, kapalı hâli `alev: 0`'dır. Her istasyonda `alev` kapanınca ısıtıcı durur; kapalı ısıtıcıda sayaç ve `kati` değişmez.
- **Isıtıcı ve örnek veri (üç ders için ortak).** Kitabın etkinliği ölçüm vermez; sayılar Q = m · L ile hesaplanan örnek veridir (buz L = 334 J/g, bal mumu L = 168 J/g; kitabın "deneyden beklenen sonuç" bilgisi ve Tablo 4.1). Ela'nın özdeş ısıtıcıları saniyede 200 J (dakikada 12.000 J) verir; kitabın notu gereği verilen ısı süreyle doğru orantılıdır (Q = 200 · süre). Erime süreleri:

  | Madde | Kütle | Q = m · L | Süre (Q ÷ 200 J/sn) |
  |---|---|---|---|
  | buz | 100 g | 100 · 334 = 33.400 J | 167 sn |
  | buz | 200 g | 200 · 334 = 66.800 J | 334 sn |
  | bal mumu | 100 g | 100 · 168 = 16.800 J | 84 sn |
  | bal mumu | 200 g | 200 · 168 = 33.600 J | 168 sn |

  Buz, "ilk sıcaklığı 0 °C'a getirilmiş" olarak başlar (kitap, hâl değiştirme sıcaklığındaki madde ister). Kapta erime bitince ısıtıcı kapatılır; bu konuda suyun 0 °C'tan sonraki ısınması yalnızca C2'de, kitabın öz ısı değerleriyle (buz 2,1 J/g · °C; su 4,18 J/g · °C) vardır.
- **Düz vektör çizim araçları (`dersler/c-araclar.js`)**; hepsi tahtada, figürün yanındadır:
  - **Isı sayacı:** turuncu yazı, 26 birim, "33.400 J" biçiminde; binlik nokta. Sayaç sayarken tam sayıya yuvarlanır ve ısıtıcı kapanınca durur. Yeri: ilgili `etiket` noktasının 34 birim altı.
  - **Kütle etiketi:** turkuaz, 24 birim ("100 g buz"); `etiket` noktasının altında.
  - **Kayıt tablosu:** `KIT.tablo`, satır yüksekliği 52, yazı 24. Başlıkta birim yazılmaz; birim hücrededir ("200 g", "33.400 J"). Sütun genişliği en uzun hücreye göre.
  - **Isı–sıcaklık grafiği (C2, C3):** eksenler açık renkli 3 birim. Başlangıç noktası (440, 410). Isı x'e, sıcaklık y'ye: `x(Q) = 440 + Q / 650`, `y(T) = 370 − 2 · T` (–20 °C → 410; 0 °C → 370; 100 °C → 170; 120 °C → 130). Eksenler: y ekseni (440, 110)–(440, 410); x ekseni (440, 410)–(945, 410). x çentikleri 0, 100.000, 200.000, 300.000 J (x 440, 594, 748, 901; yazı y 442); y çentikleri –20, 0, 100, 120 (yazı eksenin solunda, x 385–432). 0 °C ve 100 °C düzeylerinde eksenden 945'e 0,35 saydam kesikli çizgi. Eksen başlıkları: "Isı (J)" turuncu, (945, 478) sağa dayalı; "Sıcaklık (°C)" sarı, (440, 95). Eğri sarı, 4 birim. Köşeler (100 g buz, –20 °C'tan başlar): (440, 410) → (446,5; 370) → (497,8; 370) → (562,2; 170) → (909,8; 170) → kesikli (940, 130). Ölçek gerçektir: kaynama basamağı erimeninkinden 6,8 kat uzundur (226.000 J ÷ 33.400 J).
  - **Mini grafik:** 220 × 150 birimlik küçük çerçeve; yalnızca sıcaklık ekseni oku ve ısı ekseni oku vardır, çentik yazısı yoktur.
  - **Tanecik penceresi** (C2 sahne 5): 150 birim çaplı daire, 6 tanecik (yarıçap 9, açık mavi), yerinde titreşir; genlik 0 °C'ta 5 birim, salınım 600 ms.
- Bu konuda hiçbir yerde ısıl denge, ısı aktarım yolları, süblimleşme, kırağılaşma, buharlaşma–kaynama farkı ve termometre ölçekleri arası dönüşüm yoktur.

## C1 · Erimeyi ne belirler?

- **Fikir:** Hâl değiştirme sıcaklığındaki bir madde ısı almadan hâl değiştirmez; tamamının hâl değiştirmesi için gereken ısı maddenin kütlesine ve cinsine bağlıdır. Saflık ve basınç hâl değişim sıcaklığını değiştirir.
- **Giriş ekranı sorusu:** Bir buz küpü dakikalar içinde erir; aynı güneşin altındaki buzul neden yıllarca dayanır?
- **Kaynak:** Ders kitabı s. 226 (Konuya Başlarken: yüzey sıcaklığının 1,48 °C artması buzulların erimesine neden olur), s. 227–229 (3. Etkinlik: özdeş ısıtıcılar, 100 g ve 200 g buz, 100 g ve 200 g bal mumu, 30 saniyede bir ölçüm; kitabın notu: ısıtıcının ısı verme süresi ile verilen ısı doğru orantılıdır), s. 228 (hâl değişiminde etkili nitelikleri tespit etme olayları), s. 230 ("deneyden beklenen sonuç": buzun 1 g'ı için yaklaşık 334 J, bal mumunun 1 g'ı için yaklaşık 168 J; 200 g, 100 g'ın iki katı; 100 g buzla 200 g bal mumu), s. 231 (saflık: buza tuz; basınç), s. 232 (kütle ve cins; düdüklü tencere), s. 236 (Kontrol Noktası: "hâl değiştirme sıcaklığında olan maddenin tamamen hâl değiştirmesi için gereken ısı").
- **Örnek veri:** Yukarıdaki ısıtıcı ve süre tablosu. Dersin sayıları: 100 g buz 33.400 J (167 sn); 200 g buz 66.800 J (334 sn); 100 g bal mumu 16.800 J (84 sn); 200 g bal mumu 33.600 J (168 sn). 100 g buz ile 200 g bal mumu: 33.400 J ve 33.600 J ("yaklaşık eşit", kitabın "yaklaşık 2 g" bilgisi).
- **Sınır:** Basınç ve saflık tek sahnedir: adlarıyla ve kitabın birer örneğiyle (buzlu yola tuz; düdüklü tencere); neden değiştirdiği, sayısal değişim (120 °C, –2 °C gibi) ve başka örnek yoktur. Çıktı saf maddeyle sınırlıdır; sonraki sahnelerde madde saf, basınç sabittir. Erime, donma, kaynama adları ön bilgidir, tanımlanmaz. Bal mumunun erime sıcaklığı ve "L" kavramı bu derste yoktur (Q = m · L C3'tedir); kütle ve cins etkisi yalnızca "iki katı" ve "yarısı" düzeyinde, orantıyla bulunur. Termometrenin erime boyunca sabit kalması burada gözlenir, nedeni ve grafiği C2'dedir.
- **Güç kavramlar ve gösterimi:** (1) Erime sıcaklığına gelmiş madde ısı almadan erimez: ısıtıcı kapalıyken buz olduğu gibi durur (`kati` 1, sayaç 0 J); ısıtıcı yanınca sayaç ilerler ve buz azalır. (2) Kütle etkisi: yan yana 100 g ve 200 g buz; sayaçlar aynı hızla ilerler, sağdaki buz iki kat geç biter, sayacı iki kat yüksektir. (3) Cins etkisi: aynı kütlede buz, bal mumundan iki kat uzun sürer; sayacı iki kat yüksektir.
- **Hedeflenen yanılgı:** Erime sıcaklığına gelen madde kendiliğinden erir; eşit kütledeki her madde aynı ısıyla erir.
- **Akılda kalıcı cümle:** Kütle büyüdükçe erimek için gereken ısı da büyür.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Aynı maddeden bir cismin kütlesi iki katına çıkıyor. Sıcaklığı aynı kadar artırmak için gereken ısı ne olur? **İki katına çıkar** / Yarıya iner / Değişmez. (B4) Yanlışta: "Q = m · c · ΔT: kütle iki katına çıkınca ısı da iki katına çıkar."
2. Isı alan maddenin iç enerjisi nasıl değişir? **Artar** / Azalır / Değişmez. (A2) Yanlışta: "Isı alan maddenin iç enerjisi artar; ısı verenin azalır."

Tahta: birinci soruda iki özdeş bakır görünümlü blok (140 × 90, x 250–390 ve 610–750, y 220–310; etiketler "m" ve "2m", turkuaz; ikincisi iki kat uzun), ikisinin ortasında ısı etiketi yok. İkinci soruda bir kap ve altında mor iç enerji çubuğu (boy 120).

Sonra: "Bugün bir maddenin hâl değiştirmesi için ne kadar ısı gerektiğine bakacağız."

### Sahne 2 · Buz küpü ve buzul

Tahta: üstte güneş (sarı daire, yarıçap 34, merkez 500, 80; sekiz ışın çizgisi 22 birim). Solda buz küpü (açık mavi kare 110 × 110, x 140–250, y 250–360; altında "buz küpü" y 400), sağda buzul (mavi-beyaz çokgen blok, x 470–880, y 170–360; altında "buzul" y 400). Önce yalnızca güneş ve buz küpü; anlatım 2'de buzul belirir.

Anlatım:
1. Güneşin altında bir buz küpü dakikalar içinde erir.
2. Aynı güneşin altındaki buzul yıllarca dayanır.
3. Dünyanın ortalama sıcaklığı arttıkça buzullar eriyor.
4. Erimek için maddeye ısı verilmesi gerekir.
5. Buz küpü ile buzul arasındaki fark ne olabilir?

Tahmin (`tag: 'Tahmin et'`; durum tanıtıldı, sezgiyle): "Buzulun tamamı erirken, buz küpünün tamamı erirken aldığından …… ısı alır." **çok daha fazla** / çok daha az / aynı miktarda. Dayandığı anlatım: 1–4. İpuçları: "Buzulun büyüklüğünü buz küpününkiyle karşılaştır." · "Erimek için ısı gerekir; çok madde varsa ısı da çok gerekir mi?" Cevap kaydedilir; sahne 4'te gösterilir.

Anlatım: (cevaptan sonra)
6. Bunu Ela'nın deneyiyle sınayalım.

Gör: güneş ve ışınlar 0,3 saydamlığa iner (400 ms, `out`); buz küpü ve buzul yerinde kalır.

### Sahne 3 · Erime sıcaklığındaki buz ısı almadan erimez

Tahta: Figür: x 30, y 110, h 300 (genişlik 435); başlangıç ayarları: sol istasyon `icerik: 'buz', seviye: 0,25, sicaklik: 0, alev: 0, kati: 1`; sağ istasyon `f.goster('sag', 0)` (gizli); `f.sure(0)`; kadraj `sol`. `sol.etiket` noktasının altında "100 g buz" (turkuaz, 24); onun 34 birim altında sayaç "0 J" (turuncu, 26); `sol.termometre` noktasının sağında "0 °C" (sarı, 24). Sağ yarıda (x 520–960) başta boş; anlatım 9'da kayıt tablosu (x 520, y 120; sütunlar 140 / 110 / 160; başlıklar "Madde", "Kütle", "Gereken ısı"; ilk satır "buz · 100 g · 33.400 J").

Anlatım:
1. Ela 100 g buzu bir behere koyuyor.
2. Buz erime sıcaklığında; termometre 0 °C gösteriyor.
3. Isıtıcı kapalıyken buza ısı girmiyor.
4. Buz olduğu gibi duruyor; hiçbir parçası erimiyor.

Gör (anlatım 4 sırasında): süreölçer 0 sn'de sabit, sayaç 0 J, `kati` 1; 1.200 ms beklenir. Sonra:

5. Ela ısıtıcıyı açıyor: saniyede 200 joule veriyor.
6. Isı girdikçe sayaç ilerliyor, buz azalıyor.

Gör (anlatım 5'ten itibaren): `alev` 0 → 2 (300 ms, `out`); ardından tek ana hareket 5.000 ms `linear`: süreölçer 0 → 167 sn (`f.sure`), `kati` 1 → 0, sayaç 0 → 33.400 J; termometre 0 °C'ta kalır. Hareketin sonunda `alev` 2 → 0 (300 ms, `in`).

Sonra:
7. Buzun tamamı 167 saniyede erimiş oldu.
8. 100 g buzu eritmek için 33.400 joule gerekti.
9. Termometre hep 0 °C'ta kaldı; nedenini sonraki derste göreceğiz.

Kayıt tablosu satırı belirir (400 ms, `out`).

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta aynı kalır, ısıtıcı kapalı. Soru: "Ela erime sıcaklığındaki bir buz parçasına hiç ısı vermiyor. Ne olur?" **Buz olduğu gibi kalır** / Buz yavaş yavaş erir / Buzun sıcaklığı yükselir. Dayandığı anlatım: 3–4, 6. İpuçları: "Erimesi için buza ısı girmesi gerekir; burada giren ısı var mı?" · "Isıtıcı kapalıyken sayaç 0 J'da duruyordu; buz da yerindeydi."

Defter (`Erime için ısı`): "Erime sıcaklığındaki buz, ısı almadan erimez."

### Sahne 4 · Kütle: iki kat buz, iki kat ısı

Tahta: Figür: x 30, y 100, h 300 (genişlik 435); ayarlar: sol `icerik: 'buz', seviye: 0,25, sicaklik: 0, alev: 0, kati: 1`; sağ `icerik: 'buz', seviye: 0,45, sicaklik: 0, alev: 0, kati: 1`; `f.sure(0)`; kadraj `tum`. `sol.etiket` altında "100 g buz", `sag.etiket` altında "200 g buz" (turkuaz); her birinin 34 birim altında sayaç "0 J" (turuncu). Üst orta (x 500, y 60) boş. Figürün sağında (x 520–930) kayıt tablosu anlatım 6'dan sonra belirir (x 520, y 120; satır yüksekliği 52); sahne 3'teki "buz · 100 g · 33.400 J" satırıyla başlar.

Anlatım:
1. Ela şimdi iki beherle çalışıyor: 100 g ve 200 g buz.
2. İkisi de erime sıcaklığında.
3. Isıtıcılar özdeş; saniyede aynı ısıyı veriyorlar.

Tahmin (`tag: 'Tahmin et'`): "Hangi beherdeki buz önce tamamen erir?" **100 g olan** / 200 g olan / İkisi aynı anda. Dayandığı anlatım: 3; sahne 3, 6–8. İpuçları: "Sayaçlar aynı hızla ilerleyecek; hangi buzun daha az ısıya ihtiyacı var?" · "Büyük buzu eritmek için daha çok ısı gerekir mi?"

Gör: iki `alev` 0 → 2 (300 ms, `out`). Sonra tek ana hareket 8.000 ms `linear`: süreölçer 0 → 334 sn; sol `kati` 1 → 0 ilk 4.000 ms içinde, sol sayaç 0 → 33.400 J; 4.000 ms'de sol `alev` 2 → 0 (300 ms, `in`) ve sol sayaç 33.400 J'da durur. Sağ `kati` 1 → 0 tam 8.000 ms'de, sağ sayaç 0 → 66.800 J. Termometreler 0 °C'ta kalır.

Sonra:
4. 100 g buz 167 saniyede eridi; sayaç 33.400 J'da durdu.
5. 200 g buz 334 saniye sürdü; sayaç 66.800 J oldu.
6. Kütle iki katına çıkınca gereken ısı da iki katına çıktı.

Kayıt tablosuna ikinci satır eklenir: "buz · 200 g · 66.800 J" (400 ms, `out`).

Çözülmüş örnek (aynı tahta; 100 g'lık turkuaz üç kare yan yana belirir, x 520–800, y 300; 300 ms aralıkla): 
7. Üç tane 100 g'lık parça 300 g eder.
8. Her parça 33.400 joule isterse, 300 g buz üç katı ister.

Birlikte çöz (`tag: 'Birlikte çöz'`; kare sayısı iki, birinin üstünde "?" belirir): "50 g buzu eritmek için gereken ısı, 100 g buzunkinin kaçta kaçıdır?" **Yarısı** / İki katı / Dörtte biri. Dayandığı anlatım: 6–8. İpuçları: "50 g, 100 g'ın yarısıdır; ısı da aynı oranda değişir." · "Kütle küçülünce gereken ısı da küçülür."

Sor (`c.choice`, `tag: 'Sor'`; tek başına): "400 g buzu eritmek için gereken ısı, 100 g buzunkinin kaç katıdır?" **4 katı** / 2 katı / 400 katı. Dayandığı anlatım: 6–8. İpuçları: "400 g, 100 g'ın kaç katı?" · "Kütle kaç katına çıkarsa gereken ısı da o kadar katına çıkar."

Defter (`Kütle`): "Kütle büyüdükçe erimek için gereken ısı da büyür."

### Sahne 5 · Cins: buz ve bal mumu

Tahta: Figür: x 30, y 100, h 300; ayarlar: sol `icerik: 'buz', seviye: 0,25, sicaklik: 0, alev: 0, kati: 1`; sağ `icerik: 'mum', seviye: 0,25, sicaklik: 40, alev: 0, kati: 1`; `f.sure(0)`; kadraj `tum`. `sol.etiket` altında "100 g buz", `sag.etiket` altında "100 g bal mumu" (turkuaz); altlarında sayaçlar "0 J" (turuncu). Bal mumunun yanında sıcaklık yazısı yoktur. Sağda (x 520–960, y 100–300) kayıt tablosu dört satıra kadar büyür.

Anlatım:
1. Şimdi aynı kütlede iki farklı madde var.
2. Biri 100 g buz, öteki 100 g bal mumu.
3. İkisi de erime sıcaklığında; ısıtıcılar özdeş.

Tahmin (`tag: 'Tahmin et'`): "Aynı ısıtıcıyla hangisi daha geç erir?" **Buz** / Bal mumu / İkisi aynı anda. Dayandığı anlatım: 1–3. İpuçları: "Hangi maddenin tamamını eritmek daha çok ısı ister?" · "Sayaçlar aynı hızla ilerler; daha çok ısı isteyen daha geç biter."

Gör: iki `alev` 0 → 2 (300 ms, `out`); tek ana hareket 5.000 ms `linear`: süreölçer 0 → 167 sn; sağ `kati` 1 → 0 tam 2.515 ms'de (84 sn), sağ sayaç 0 → 16.800 J, sonra sağ `alev` 2 → 0 (300 ms, `in`); sol `kati` 1 → 0 tam 5.000 ms'de, sol sayaç 0 → 33.400 J; sonra sol `alev` 2 → 0.

Sonra:
4. Bal mumu 84 saniyede eridi: 16.800 joule.
5. Buz 167 saniyede eridi: 33.400 joule.
6. Aynı kütlede buz, bal mumunun yaklaşık iki katı ısı istedi.
7. Gereken ısı maddenin cinsine de bağlıdır.

Kayıt tablosuna satır eklenir: "bal mumu · 100 g · 16.800 J" (400 ms, `out`).

Defter (`Cins`): "Aynı kütlede gereken ısı, maddenin cinsine göre değişir."

Anlatım (karşılaştırma; aynı tahta; sol istasyon 100 g buz, sağ istasyon `icerik: 'mum', seviye: 0,45` yani 200 g bal mumu; sayaçlar 0 J, `kati` 1, `alev` 0):
8. Ela şimdi 100 g buzu 200 g bal mumuyla karşılaştırıyor.
9. Buzun bir gramı, bal mumunun yaklaşık iki gramı kadar ısı ister.

Sor (`c.choice`, `tag: 'Sor'`): "Ela 100 g buzu eriten ısıyı bal mumuna veriyor. Bu ısıyla kaç gram bal mumu erir?" **Yaklaşık 200 g** / Yaklaşık 100 g / Yaklaşık 50 g. Dayandığı anlatım: 4–6, 9. İpuçları: "Buz, aynı kütlede bal mumunun iki katı ısı ister; verilen ısıyla kaç katı bal mumu erir?" · "Bal mumu daha az ısı istiyorsa aynı ısı daha çok bal mumunu eritir."

Gör: iki `alev` 0 → 2 (300 ms, `out`); tek ana hareket 5.000 ms `linear`: süreölçer 0 → 168 sn; sol `kati` 1 → 0 ve sağ `kati` 1 → 0 neredeyse birlikte biter (167 sn ve 168 sn; farkı gösterme); sayaçlar 33.400 J ve 33.600 J; ardından iki `alev` 0.

Sonra:
10. Aynı ısı, 100 g buzu ya da 200 g bal mumunu eritir.

Kayıt tablosuna son satır eklenir: "bal mumu · 200 g · 33.600 J" (400 ms, `out`).

### Sahne 6 · Başka iki etmen: saflık ve basınç

Tahta: iki kart yan yana (x 80–470 ve 530–920, y 120–420, yuvarlatılmış çerçeve, 3 birim). Sol kartın başlığı "saflık" (y 160, 28); altında buz parçası (açık mavi, 120 × 80, merkez 275, 280) ve üstüne serpilen beyaz noktalar (8 nokta, yarıçap 4). Sağ kartın başlığı "basınç"; altında kapağı sıkı kapalı düdüklü tencere (gövde 150 × 110, kapak 170 × 22, üstte valf; merkez 725, 290; içinde mavi su). Anlatım 2'de sol kart, anlatım 4'te sağ kart belirir (400 ms, `out`).

Anlatım:
1. Hâl değişimini etkileyen iki etmen daha var.
2. Saf maddeye başka bir madde karışırsa saflığı bozulur.
3. Buzlu yola tuz atılınca buz daha düşük sıcaklıkta erir.
4. Maddenin üzerine etkiyen basınç da hâl değişimini etkiler.
5. Düdüklü tencerede basınç yüksektir; su daha yüksek sıcaklıkta kaynar.
6. Saflık ve basınç, hâl değişim sıcaklığını değiştirir.
7. Deneylerimizde madde saf, basınç da hep aynı olacak.

Defter (`Saflık ve basınç`): "Saflık ve basınç, hâl değişim sıcaklığını değiştirir."

### Sahne 7 · Hangi etmen?

Tahta: üstte dört kutu yan yana (y 70–150; her biri 200 geniş, x 60, 290, 520, 750): "kütle" (turkuaz), "cins", "saflık", "basınç". Altta (y 230–360, x 150–850) sırayla gelen olay kartı. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir.

Anlatım:
1. Şimdi günlük hayattan dört olaya bakalım.
2. Her olayda hâl değişimini etkileyen etmeni bul.

Kartlar (soru: "Bu olayda hâl değişimini hangi etmen etkiliyor?"; kutudaki kısa ad parantezde):
1. "İri buz parçaları, küçük olanlara göre daha uzun süre erimeden kalır." (iri buz) → **kütle**. Neden: "Evet. Büyük parçayı eritmek için daha çok ısı gerekir." İpucu: "Parçaların büyüklüğü, yani kütleleri farklı."
2. "Yeterince sıcak ortamda tereyağı, eşit kütledeki buzdan daha çabuk erir." (tereyağı) → **cins**. Neden: "Evet. Kütle eşit; madde farklı." İpucu: "İkisinin kütlesi eşit. Değişen şey ne?"
3. "Kışın buzlu yollara tuz serpilir." (yola tuz) → **saflık**. Neden: "Evet. Tuz buzun saflığını bozar, erime sıcaklığını düşürür." İpucu: "Buza başka bir madde karışıyor."
4. "Düdüklü tencerede su 100 °C’ta kaynamaz; daha yüksek sıcaklıkta kaynar." (düdüklü tencere) → **basınç**. Neden: "Evet. Düdüklü tencerenin içinde basınç yüksektir." İpucu: "Kapağı sıkıca kapalı tencerenin içinde ne artar?" (12 Ekim 2026 düzeltmesi: önceki kart "kapağı kapatılan tencerede su daha geç kaynar" diyordu; sıradan kapak için doğru değildir ve kitapta yoktur.)

Sonra (kutular 0,45'e iner; anlatım 3'te bir tablo yerine dört kısa ad kutularda kalır):
3. Kütle ve cins, gereken ısıyı belirler.
4. Saflık ve basınç, hâl değişim sıcaklığını değiştirir.

### Sahne 8 · Dene: kütleyi ve maddeyi seç

Tahta: Figür: x 30, y 110, h 280; yalnız sol istasyon (`f.goster('sag', 0)`), kadraj `sol`; başlangıç `icerik: 'buz', seviye: 0,25, sicaklik: 0, alev: 0, kati: 1`. Sağda (x 500–960): üstte düğme çifti "buz" · "bal mumu" (`KIT.secim`, her biri 150 × 50, x 520 ve 700, y 90); altında kütle kaydırıcısı (`KIT.kaydirici`; x 520–900, y 190; 100, 200, 300, 400 g; adım 100; sarı olmayan turkuaz tutamaç); kaydırıcının altında turuncu ısı çubuğu (x 520, y 260, yükseklik 36; boy = ısı ÷ 400 birim) ve yanında sayı; çubuğun altında "gereken süre" (sn).

Veri (sabit, örnek veri tablosundan): buz 100 g 33.400 J (167 sn); 200 g 66.800 J (334 sn); 300 g 100.200 J (501 sn); 400 g 133.600 J (668 sn). Bal mumu 100 g 16.800 J (84 sn); 200 g 33.600 J (168 sn); 300 g 50.400 J (252 sn); 400 g 67.200 J (336 sn).

Anlatım:
1. Kütleyi ve maddeyi sen seç; gereken ısıyı çubuk gösterir.
2. Önce bal mumuyla 200 g'ı seç.
3. Şimdi aynı çubuk boyunu buzla yakala.

Dene (`tag: 'Dene'`): kaydırıcı ya da düğme her değiştiğinde `seviye` kütleye göre (kural: 0,05 + 0,2 × kütle/100) 500 ms `inOut` ile, çubuk ve sayı 500 ms `out` ile değişir. Görev: "Bal mumu 200 g'ın çubuğuyla aynı boyda bir buz ayarı bul." Doğru ayar: buz 100 g (33.400 J ≈ 33.600 J); doğru bulununca çubuklar yan yana çizilir (iki çubuk, 400 ms, `out`) ve yeşil işaret çıkar. İkinci görev: "Buzun 200 g çubuğuna yakın bal mumu ayarını bul." Doğru: bal mumu 400 g (67.200 J ≈ 66.800 J).
Geri bildirim (yanlış ayarda): "Çubuk boyları yaklaşık aynı olmalı."

Sonra:
4. Buzun bir gramı, bal mumunun iki gramı kadar ısı istiyor.

### Sahne 9 · Buzula dönelim

Tahta: sahne 2'nin düzeni yeniden belirir (500 ms, `out`): güneş, buz küpü, buzul. Buz küpünün üstünde turuncu küçük ısı sayacı etiketi "az ısı", buzulun üstünde büyük turuncu çubuk "çok ısı" (çubuk boyları: küçük 50, büyük 350 birim; yalnızca sıralama).

Anlatım:
1. Buz küpünün kütlesi küçüktür; az ısıyla tamamen erir.
2. Buzulun kütlesi çok büyüktür; erimesi için çok ısı gerekir.
3. Bu yüzden buzul, aynı güneşin altında yıllarca dayanır.

### Çıkış soruları

1. (yeni durum) Ela özdeş ısıtıcılarla erime sıcaklığındaki 500 g ve 100 g buzu eritiyor. Hangisi doğrudur? **500 g buz, 100 g buzdan beş kat ısı ister** / İkisi de aynı ısıyı ister; ikisi de 0 °C'tadır / 100 g buz daha çok ısı ister; çünkü daha hızlı erir. (sahne 4)
2. (yanılgı) "Erime sıcaklığına gelen buz, ısı almadan kendiliğinden erir." Bu cümle için ne söylenir? **Yanlıştır; erimesi için ısı girmesi gerekir** / Doğrudur; erime sıcaklığı yeterlidir / Doğrudur; yalnızca büyük parçalar için. (sahne 3)
3. (yeni durum) Aynı kütlede bal mumu ve buz, erime sıcaklığında özdeş ısıtıcılarla ısıtılıyor. Hangisi önce tamamen erir? **Bal mumu; daha az ısı ister** / Buz; daha az ısı ister / İkisi aynı anda erir. (sahne 5)
4. (yeni durum) 100 g bal mumunu eriten ısı, buzun yaklaşık kaç gramını eritir? **Yaklaşık 50 g** / Yaklaşık 100 g / Yaklaşık 200 g. (sahne 5)
5. Buzlu yollara tuz serpilmesinin nedeni hangisidir? **Tuz, buzun erime sıcaklığını düşürür** / Tuz, buza ısı verir / Tuz, buzun kütlesini azaltır. (sahne 6)

## C2 · Isı veriyorsun, sıcaklık yerinde sayıyor

- **Fikir:** Sıcaklığın verilen ısıyla değişimini gösteren grafikte hâl değişimi düz bir basamak olarak görünür: madde hâl değiştirirken ısı alır ama sıcaklığı değişmez. Kütle ya da madde değişince basamağın boyu (ve yüksekliği) değişir.
- **Giriş ekranı sorusu:** İçinde buz olan suyu ocağa koydun; buz bitene kadar termometre ne gösterir?
- **Kaynak:** Ders kitabı s. 229 (etkinlik adım 8: sıcaklığın zamana bağlı grafiği; ısıtıcının ısı verme süresi ile verilen ısı doğru orantılı), s. 233 ("Hâl değiştirirken saf maddelerin sıcaklığı sabit kalır"; Görsel 4.16: –20 °C buzdan 120 °C gaza, beş bölge: katı, katı + sıvı, sıvı, sıvı + gaz, gaz; "hâl değişiminin yaşandığı bölgeler yatay düz çizgilerle belirtilmiştir"; Görsel 4.15: erirken ve kaynarken kinetik enerji sabit, potansiyel enerji artıyor; ısınırken kinetik enerji artıyor, potansiyel enerji sabit), s. 235 (Alıştırma 8: hâl değişimi basamakları, madde miktarı artınca basamakların uzaması), s. 219 (buzun öz ısısı 2.100 J/kg · °C), s. 222 (suyun öz ısısı 4,18 J/g · °C), s. 232 (Tablo 4.1: buzun erime ısısı 334 kJ/kg, suyun buharlaşma ısısı 2.260 kJ/kg; saf madde için hâl değişim sıcaklığı ayırt edici), s. 213 (iç enerji: hareket enerjisi ve taneciklerin birbirini çekip itmesinden gelen enerji). Kitap bu konuda sayılı grafik vermez; grafik örnek veridir.
- **Örnek veri:** 100 g buz, –20 °C'tan başlar; ısıtıcı saniyede 200 J. Bölge bölge ısı (Q) ve süre (Q ÷ 200 J/sn):
  1. Katı ısınır (–20 → 0 °C): Q = m · c · ΔT = 100 · 2,1 · 20 = 4.200 J; 21 sn.
  2. Erime (0 °C): Q = m · L = 100 · 334 = 33.400 J; 167 sn. Toplam 37.600 J.
  3. Sıvı ısınır (0 → 100 °C): Q = 100 · 4,18 · 100 = 41.800 J; 209 sn. Toplam 79.400 J.
  4. Kaynama (100 °C): Q = 100 · 2.260 = 226.000 J (Tablo 4.1'deki 2.260 kJ/kg = 2.260 J/g); 1.130 sn. Toplam 305.400 J.
  5. Gaz ısınır (100 → 120 °C): kitapta buharın öz ısısı yok; bu parça sayısız, yalnızca yönüyle (kesikli) çizilir.
  200 g buz için: 8.400 J (katı), 66.800 J (erime), 83.600 J (sıvı); toplamlar 8.400, 75.200, 158.800 J. Grafik koordinatları okuma kılavuzundaki formülle verilir: 100 g için Q₁ → x 446,5; Q₂ → 497,8; Q₃ → 562,2; Q₄ → 909,8; 200 g için Q₁ → 452,9; Q₂ → 555,7; Q₃ → 684,3.
- **Sınır:** Öz ısı ile hâl değişimini birlikte hesaplayan örnek kitapta yoktur; burada hesap öğrenciye gösterilmez, yalnızca ısı sayacı ve grafik görünür (sayılar yazarın örnek verisidir). Grafikte hâl değişimi basamağının uzunluğu ısıyı, yüksekliği hâl değişim sıcaklığını gösterir; "L" ve "Q = m · L" C3'tedir. Bal mumunun erime sıcaklığı kitapta yoktur: bal mumu basamağı farklı bir yükseklikte çizilir, sıcaklık yazılmaz. Buharın öz ısısı olmadığından gaz parçası ölçeksiz kesiklidir. Isıl denge, buharlaşma–kaynama farkı yoktur.
- **Güç kavram ve gösterimi:** Isı girerken sıcaklığın sabit kalması: termometre sütunu 0 °C'ta dururken ısı sayacı akar, buz azalır ve grafik yatay çizilir; basamak bitince sütun yeniden yükselir. Üçüncü gösterim: basamakta tanecikler hızlanmaz (titreşim aynı), iç enerji yine de artar (mor çubuğun "birbirine göre" parçası uzar).
- **Hedeflenen yanılgı:** Isı verilen maddenin sıcaklığı her zaman yükselir; sıcaklık sabitse ısı girmiyordur ya da iç enerji değişmiyordur.
- **Akılda kalıcı cümle:** Hâl değişirken ısı girer, sıcaklık bekler.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Erime sıcaklığındaki 200 g buzu eritmek için gereken ısı, 100 g buzunkine göre nasıldır? **İki katıdır** / Yarısıdır / Aynıdır. (C1) Yanlışta: "Kütle büyüdükçe erimek için gereken ısı da büyür: 200 g için iki katı."
2. Aynı suyun sıcaklık artışı iki katına çıkarsa gereken ısı ne olur? **İki katına çıkar** / Yarıya iner / Değişmez. (B3, B4) Yanlışta: "Q = m · c · ΔT: sıcaklık farkı iki katına çıkınca ısı da iki katına çıkar."

Tahta: birinci soruda yan yana iki turkuaz kütle etiketi "100 g", "200 g" ve altlarında turuncu çubuklar (boy 100 ve 200, yükseklik 30; sayı yok). İkinci soruda bir beher (150 × 170) ve iki sarı termometre sütunu (boy 60 ve 120; sayı yok).

Sonra: "Bugün ısıtılan bir maddenin sıcaklığının neden bazen yerinde saydığına bakacağız."

### Sahne 2 · Buzu –20 °C'tan başlatıyoruz

Tahta: Figür: x 30, y 130, h 240 (genişlik 348); ayarlar: sol `icerik: 'buz', seviye: 0,25, sicaklik: –20, alev: 0, kati: 1`; sağ `f.goster('sag', 0)`; `f.sure(0)`; kadraj `sol`. `sol.etiket` altında "100 g buz" (turkuaz, 24); onun 34 birim altında sayaç "0 J" (turuncu, 26); `sol.termometre` noktasının sağında "–20 °C" (sarı, 24). Sağda boş eksenler (okuma kılavuzundaki ısı–sıcaklık grafiği; yalnızca eksenler, çentikler ve başlıklar; 600 ms, `out`).

Anlatım:
1. Ela bu kez 100 g buzu –20 °C'tan başlatıyor.
2. Isıtıcı saniyede 200 joule veriyor.
3. Ela verilen ısıyı ve sıcaklığı grafiğe işleyecek.
4. Yatay eksende ısı, dikey eksende sıcaklık var.
5. Isıtıcı buzu 100 °C'a kadar ısıtacak.

Tahmin (`tag: 'Tahmin et'`; seçenekler 140 × 90'lık küçük çizimlerdir, `KIT.cizimliSecim`): "Sıcaklık–ısı grafiği nasıl görünür?" Çizimler: A düz eğik tek çizgi; **B eğik, sonra yatay, sonra yine eğik**; C yatay, sonra eğik. Dayandığı anlatım: 3–5; ayrıca C1'de buz erirken termometrenin 0 °C'ta kalması. İpuçları: "Buz erirken termometre ne gösteriyordu? Çizgi o sırada nasıl olmalı?" · "Buz bitince su ısınmaya devam eder; çizgi yeniden yükselir."

Anlatım: (cevaptan sonra)
6. Deneyi başlatıp grafiğin nasıl çizildiğine bakalım.

### Sahne 3 · Katı, erime, sıvı

Tahta: sahne 2'nin düzeni (figür, sayaç, boş eksenler). Eğri, ısı sayacıyla birlikte çizilir; ucunda 12 birimlik sarı nokta eğrinin ucunu izler.

Gör (anlatım 1'den başlayarak, üç bölge ard arda, aralarında 400 ms bekleme; `alev` 0 → 2, 300 ms `out`):
- Bölge 1, 600 ms `linear`: sayaç 0 → 4.200 J; `sol.sicaklik` –20 → 0; yazı "–20 °C" → "0 °C" sayarak; eğri (440, 410) → (446,5; 370).
- Bölge 2, 3.000 ms `linear`: sayaç 4.200 → 37.600 J; `kati` 1 → 0; sıcaklık 0 °C'ta kalır; eğri (446,5; 370) → (497,8; 370); basamak 0,35'te turuncu ince bir bant olarak vurgulanır (yükseklik 10, y 365–375).
- Bölge 3, 3.000 ms `linear`: bölge 2'nin sonunda `icerik` 'buz' → 'su' (kap aynı seviyede, `kati: 0`); sayaç 37.600 → 79.400 J; `sol.sicaklik` 0 → 100; eğri (497,8; 370) → (562,2; 170).

Anlatım:
1. Isı verdikçe termometre yükseliyor; grafik yukarı eğiliyor.
2. Termometre 0 °C'a geldi; buz erimeye başlıyor.
3. Isı girmeye devam ediyor ama termometre yerinde sayıyor.
4. Grafikte bu bölge yatay bir basamak.
5. Basamak boyunca buz azalıyor; sıcaklık hep 0 °C.
6. Buz bitince basamak da bitiyor.
7. Isı şimdi suyu ısıtıyor; grafik yeniden eğiliyor.
8. Su 100 °C'a kadar ısınıyor.

(Anlatım 1 bölge 1'de; 2–5 bölge 2'de; 6–8 bölge 3'te söylenir.)

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): Ela deneyi tekrarlıyor ve basamağın tam ortasında durup bakıyor: `kati` 0,5, sütun 0 °C'ta, grafikte eğri basamağın ortasında (x 472; 400 ms, `out`). Soru: "Buzun yarısı erimiş. Termometre kaç °C gösterir?" **0 °C** / –20 °C / 50 °C. Dayandığı anlatım: 2–5. İpuçları: "Buz tamamen erimeden sıcaklık değişmez; basamak boyunca sıcaklık kaç °C?" · "Basamak yatay: sıcaklık hep aynı."

Gör: sütun 0 °C'ta kalır; sarı nokta basamağın üstünde yanıp söner (2 kez, 300 ms, `inOut`).

### Sahne 4 · Kaynama: ikinci basamak

Tahta: sahne 3'ün sonu (su 100 °C, grafik (562,2; 170)'te); sayaç "79.400 J".

Anlatım:
1. Su 100 °C'a geldi; ısıtıcı yanmaya devam ediyor.

Tahmin (`tag: 'Tahmin et'`): "Su kaynarken termometre ne gösterir?" **100 °C'ta kalır** / 100 °C'tan yükselmeye devam eder / 100 °C'tan düşer. Dayandığı anlatım: sahne 3, 3–6. İpuçları: "Buz erirken sıcaklık nasıl davranmıştı? Hâl değişiminde yine öyle olabilir." · "Hâl değişirken ısı girer ama sıcaklık değişmiyordu."

Gör: `alev` 2'de kalır; sonra tek ana hareket 5.600 ms `linear`: sayaç 79.400 → 305.400 J; `sol.seviye` 0,25 → 0 (kap boşalır; su kaynadıkça azalır); sıcaklık 100 °C'ta kalır; eğri (562,2; 170) → (909,8; 170); basamak turuncu bantla vurgulanır (yükseklik 10, y 165–175). Hareketin sonunda `icerik: 'bos'`; 700 ms `linear` içinde `sol.sicaklik` 100 → 120; sayaç 300 ms'de söner (`in`); kesikli eğri (909,8; 170) → (940, 130).

Anlatım:
2. Su kaynıyor ve seviyesi azalıyor.
3. Isı giriyor ama termometre 100 °C'ta duruyor.
4. Grafikte ikinci bir yatay basamak oluşuyor.
5. Kaynama basamağı çok daha uzun: sayaç 305.400 J'a çıkıyor.
6. Su bitince buhar ısınır; sıcaklık yeniden yükselir.

(Anlatım 2–3 hareket sırasında, 4 hareketin sonunda, 5 hareketin sonunda, 6 kesikli parça çizilirken söylenir.)

### Sahne 5 · Isı nereye gidiyor?

Tahta: figür 0,2 saydamlığa iner (400 ms, `in`). Solda tanecik penceresi (merkez 230, 250; çap 200; 6 tanecik; yüzey çizgisi yok). Pencerenin yanında küçük sarı termometre (26 × 120, x 360–386, y 190–310). Pencerenin altında (y 380) turuncu ısı oku (x 130 → 330, kalınlık 7, "ısı" yazılı; girdiği yönde pencereye doğru). Sağda iç enerji çubuğu (x 500, y 250, yükseklik 40): iki parçalı; açık mor "hareket" parçası ve koyu mor "birbirine göre" parçası ardışık; altlarında etiket "hareket", "birbirine göre" (22). Başlangıç boyları: hareket 120, birbirine göre 100 (sıralama, sayı yok).

Gör (anlatım 2 sırasında, durum 1 "eğik parça"): 1.500 ms `linear`: titreşim genliği 3 → 7 birim (salınım 700 → 450 ms); termometre sütunu 60 → 100 yüksekliğe; "hareket" parçası 120 → 190; "birbirine göre" 100 sabit.
Gör (anlatım 4 sırasında, durum 2 "basamak"): 1.500 ms `linear`: genlik 7'de sabit; termometre sütunu 100'de sabit; "hareket" 190 sabit; "birbirine göre" 100 → 170.

Anlatım:
1. Basamakta ısı giriyor; peki bu ısı nereye gidiyor?
2. Eğik parçada ısı, taneciklerin hareketini artırıyor.
3. Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.
4. Basamakta sıcaklık sabit; tanecikler hızlanmıyor.
5. Isı alan maddenin iç enerjisi yine de artar.
6. Artan, taneciklerin birbirini çekip itmesinden gelen enerjidir.

Sor (`c.choice`, `tag: 'Sor'`; yanılgı): "Basamak sırasında termometre sabit. Maddenin iç enerjisi için ne söylenir?" **Artar; ısı alıyor** / Sabit kalır; sıcaklık değişmiyor / Azalır; tanecikler yavaşlıyor. Dayandığı anlatım: 4–6. İpuçları: "Isı alan maddenin iç enerjisi artar; bu her zaman sıcaklıkla görünmez." · "Basamakta ısı giriyor; iç enerji sabit kalabilir mi?"

Gör: "birbirine göre" parçası 400 ms daha uzar (170 → 190, `out`) ve çubuğun toplamı mor parlar.

### Sahne 6 · Grafiği oku

Tahta: figür 400 ms'de tamamen kaybolur (`in`). Tam grafik (okuma kılavuzundaki köşelerle), sol-alt yazılar yok. Bölge adları 22 birim, açık gri: "Katı" (452, 150) ve ince dikey çizgisi x 447'de y 158 → 366; "Katı +" ve "sıvı" iki satır (452, 190 ve 452, 214), çizgisi x 475'te y 222 → 366; "Sıvı" (575, 280); "Sıvı + gaz" (700, 150); "Gaz" (900, 108). Adlar anlatım 1'de tek tek belirir (300 ms, `out`, 250 ms aralıkla). İki basamak turuncu bantla vurgulanır.

Anlatım:
1. Grafikte beş bölge var; adlarını sırayla okuyalım.
2. Eğik parçalarda madde tek hâlde; sıcaklık yükseliyor.
3. Yatay parçalarda madde hâl değiştiriyor; sıcaklık sabit kalıyor.

Çözülmüş örnek (0 °C'taki yatay parça işaretlenir; sarı halka):
4. Bu parçada buz eriyor; madde hem katı hem sıvıdır.
5. Sıcaklık 0 °C'ta sabit, çünkü madde hâl değiştiriyor.

Birlikte çöz (`tag: 'Birlikte çöz'`; 100 °C'taki yatay parça işaretlenir): "Bu parçada madde hangi hâllerde birlikte bulunur?" **Sıvı ve gaz** / Katı ve sıvı / Yalnızca gaz. Dayandığı anlatım: 1, 3, 5; sahne 4. İpuçları: "Yatay parçada madde hâl değiştiriyor; su kaynıyor." · "Kaynarken hem su hem buhar vardır."

Sor (`c.choice`, `tag: 'Sor'`; tek başına; eğik sıvı parçasında 40 °C'ta bir nokta işaretlenir, x 480... ): "Grafikte işaretli noktada madde hangi hâldedir?" **Sıvı** / Katı + sıvı / Gaz. Dayandığı anlatım: 1–2. İpuçları: "İşaretli nokta eğik parçada; eğik parçada madde tek hâldedir." · "Bu parça iki basamağın arasında; hangi hâl?"

Defter (`Hâl değişimi ve sıcaklık`): "Hâl değişirken ısı girer, sıcaklık sabit kalır."

### Sahne 7 · Kütle ve madde değişince grafik

Tahta: Figür: x 30, y 130, h 240 geri gelir (400 ms, `out`); `sol` istasyonda `icerik: 'buz', seviye: 0,25`. Grafik 100 g için çizilmiş kalır ama 562,2'den sonrası silinir (400 ms, `in`); 100 °C kesikli çizgisi yerinde.

Anlatım:
1. Ela şimdi 200 g buzla aynı deneyi yapıyor.

Gör (`seviye` 0,25 → 0,45, 500 ms `inOut`; sonra 4.000 ms `linear`: sayaç 0 → 158.800 J, bölgeler orantılı geçer, `sol.sicaklik` ve `kati` buna göre; açık sarı ikinci eğri çizilir (440, 410) → (452,9; 370) → (555,7; 370) → (684,3; 170); etiketler "100 g" (eğrinin 100 g basamağı üstü, x 520, y 350) ve "200 g" (x 620, y 350), turkuaz).

Anlatım:
2. Basamak aynı yükseklikte: erime sıcaklığı değişmedi.
3. Ama basamak iki kat uzun: gereken ısı iki katına çıktı.
4. Kütle büyüyünce basamak uzar, yüksekliği değişmez.

Sor (`c.choice`, `tag: 'Sor'`): "50 g buzla aynı deney yapılsa 0 °C'taki basamak nasıl olur?" **Daha kısa, aynı yükseklikte** / Daha uzun, aynı yükseklikte / Aynı uzunlukta, daha aşağıda. Dayandığı anlatım: 2–4. İpuçları: "Kütle küçülünce gereken ısı da küçülür; basamağın boyu ısıdır." · "Erime sıcaklığı değişmez; basamak yine 0 °C'ta."

Gör: 50 g'lık eğri açık mavi kesikli çizilir (800 ms, `linear`): (440, 410) → (443,2; 370) → (468,9; 370) → (501,1; 170).

Sonra, madde karşılaştırması (grafik 0,3 saydamlığa iner; figür kaybolur; yerine iki mini grafik, x 140–360 ve x 600–820, y 160–310, ortak ölçek 250 J = 1 birim; her mini grafikte basamak ve iki yanında 20 birimlik eğik parça; sıcaklık ekseninde çentik yazısı yok). Sol mini grafik "100 g buz": basamak yüksekliği tabandan 45, uzunluk 133,6; sağ mini grafik "100 g bal mumu": basamak yüksekliği tabandan 95, uzunluk 67,2. Başlıklar turkuaz.

Anlatım:
5. Şimdi aynı kütlede iki farklı madde var: buz ve bal mumu.
6. Her saf maddenin basamağı kendi hâl değişim sıcaklığında olur.
7. Bal mumunun basamağı, buzunkinin yarısı kadar uzun.
8. Madde değişince basamağın yüksekliği ve uzunluğu değişir.

### Sahne 8 · Dene: kütleyi seç, basamağı ölç

Tahta: tam grafik (100 g buz eğrisi gri, 100 °C'a kadar; kaynama kısmı yok). Altta kütle kaydırıcısı (`KIT.kaydirici`; x 520–900, y 470; 50, 100, 150, 200 g; adım 50). Seçilen kütlenin eğrisi sarıdır; 100 °C'a kadar çizilir. Köşeler: 50 g (440, 410) → (443,2; 370) → (468,9; 370) → (501,1; 170); 150 g (440, 410) → (449,7; 370) → (526,8; 370) → (623,2; 170); 100 g ve 200 g yukarıdaki gibi. Eğri her değişimde 500 ms `inOut` ile yeni köşelere geçer. Sağ üstte (x 640, y 140) görev kartı.

Anlatım:
1. Kütleyi sen seç; basamağın boyu ona göre değişir.
2. Önce gri basamağın yarısı kadar uzun olanı bul.

Dene (`tag: 'Dene'`): görev 1: "Basamağı gri basamağın yarısı kadar olan kütleyi bul." Doğru: 50 g. Görev 2: "Basamağı gri basamağın iki katı olan kütleyi bul." Doğru: 200 g. Doğru bulununca basamak yeşil bantla vurgulanır (300 ms, `out`). Yanlışta geri bildirim: "Basamağın boyu ısıyı gösterir; kütle ile birlikte değişir."

### Çıkış soruları

1. (yeni durum) Ela buz–su karışımını ısıtıyor; buzun yarısı erimiş, termometre 0 °C. Isıtmaya devam edilirse buz tamamen erimeden termometre ne gösterir? **0 °C'ta kalır** / Yavaş yavaş yükselir / –20 °C'a düşer. (sahne 3)
2. (yanılgı) "Isı verilen bir maddenin sıcaklığı her zaman yükselir." Bu cümle için ne söylenir? **Yanlıştır; hâl değişirken sıcaklık sabit kalır** / Doğrudur; ısı hep sıcaklığı yükseltir / Doğrudur; yalnızca sıvılar için. (sahne 3, 4, 6)
3. (yeni durum) Bir maddenin sıcaklık–ısı grafiğinde iki yatay parça var. Bu ne anlama gelir? **Madde iki kez hâl değiştirmiştir** / Madde iki kez ısınmıştır / Isıtıcı iki kez kapanmıştır. (sahne 6)
4. (yeni durum) Aynı maddeden 100 g ve 300 g, erime sıcaklığına kadar getirilip ısıtılıyor. 300 g'ın erime basamağı 100 g'ınkine göre nasıldır? **Aynı yükseklikte, üç kat uzun** / Üç kat yüksekte, aynı uzunlukta / Aynı yükseklikte, aynı uzunlukta. (sahne 7)
5. (yanılgı) "Kaynayan suyun termometresi 100 °C'ta duruyor; demek ki suya ısı girmiyor." Bu cümle için ne söylenir? **Yanlıştır; ısı giriyor, su hâl değiştiriyor** / Doğrudur; sıcaklık değişmiyorsa ısı girmez / Doğrudur; ısı yalnızca ısıtıcıda kalır. (sahne 4, 5)

## C3 · Hâl değişimi için gereken ısı

- **Fikir:** Hâl değiştirme sıcaklığındaki saf bir maddenin tamamının hâl değiştirmesi için alınan ya da verilen ısı Q = m · L modeliyle hesaplanır; L maddeye ve hâl değişimine göre değişir. Model grafikteki düz parçanın boyunu okur.
- **Giriş ekranı sorusu:** 0 °C'taki 1 kilogram buzu eritmek ile 2 kilogram buzu eritmek arasında ısı bakımından ne fark var?
- **Kaynak:** Ders kitabı s. 230 (etkinlik adım 9–10: ısı, kütle ve cins ilişkisi, matematiksel model; buzun 1 g'ı için yaklaşık 334 J, bal mumunun 1 g'ı için yaklaşık 168 J), s. 232 (hâl değişim ısısı tanımı ve L simgesi, birimi J/kg, ayırt edici özellik; Tablo 4.1), s. 233 (erime ısısı = donma ısısı, buharlaşma ısısı = yoğuşma ısısı; Q = m · L ve sembolleri), s. 234 (Örnek 1: kar yağarken hava sıcaklığı; Örnek 2: K ve L maddeleri, sıcaklık–zaman grafiği, erime ısıları oranı 2/3; Örnek 3: 4 kg buz ve 1 kg su), s. 236 (Kontrol Noktası).
- **Örnek veri ve hesaplar:** C1'deki dört ölçüm (100 g buz 33.400 J; 200 g buz 66.800 J; 100 g bal mumu 16.800 J; 200 g bal mumu 33.600 J). Derste bölme: 33.400 ÷ 100 = 334; 66.800 ÷ 200 = 334; 16.800 ÷ 100 = 168; 33.600 ÷ 200 = 168 (J/g). Hesaplar: 250 · 334 = 83.500 J; 150 · 168 = 25.200 J; 300 · 334 = 100.200 J; 100 g suyun donması 100 · 334 = 33.400 J; kitabın Örnek 3'ü: 4 · 334 = 1.336 kJ, 1 · 2.260 = 2.260 kJ, 1.336 < 2.260; grafik: 100 · 334 = 33.400 J ve 100 · 2.260 = 226.000 J (226.000 ÷ 33.400 ≈ 6,8); Dene: 700 · 334 = 233.800 J > 226.000 J, 600 · 334 = 200.400 J < 226.000 J.
- **Sınır:** Yalnızca Q = m · L ve hâl değişimleri (erime, donma, buharlaşma, yoğuşma); öz ısıyla birlikte hesap, toplam ısı (–20 °C buzdan 120 °C buhara) ve ısıl denge yoktur. Birim: tanım SI yazımıyla bir kez (J/kg); hesaplar J ve g ile (kitabın etkinlikteki yazımı), Tablo 4.1 ve Örnek 3'te kJ/kg ve kg. "Gizli ısı" adı kullanılmaz. Tablodaki alt indisli yazımlar (L_K, L_L) yalnızca Örnek 2'de, karşılaştırma için geçer.
- **Güç kavram ve gösterimi:** L'nin maddeye ve hâl değişimine göre değişmesi ve düz parçanın boyunun Q = m · L olması: aynı kütlede erime basamağı ve kaynama basamağı yan yana, boylar gerçek oranda (1 : 6,8) çizilir; boyun altında bir parantez ve ısı sayısı.
- **Hedeflenen yanılgı:** Hâl değişim ısısı kütleye bağlıdır; kaynarken su ısı almaz (sıcaklığı değişmediği için); her madde erimek için aynı ısıyı ister.
- **Akılda kalıcı cümle:** Q = m · L.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Bir maddenin sıcaklık–ısı grafiğindeki yatay parçada ne olur? **Madde hâl değiştirir; ısı girer, sıcaklık sabit kalır** / Madde ısınır; sıcaklık yükselir / Isı girmez; madde soğur. (C2) Yanlışta: "Hâl değişirken ısı girer, sıcaklık sabit kalır."
2. 100 g buzu eritmek 33.400 J ister. 200 g buz için gereken ısı kaç J'dur? **66.800 J** / 33.400 J / 16.700 J. (C1) Yanlışta: "Kütle iki katına çıkınca gereken ısı da iki katına çıkar."

Tahta: birinci soruda C2'nin grafiği, 0 °C'taki basamak turuncu bantla (0,6 saydamlık); ikinci soruda 100 g ve 200 g turkuaz etiketler, altlarında turuncu çubuklar (boy 100 ve 200).

Sonra: "Bugün bu ısıyı hesaplayan modeli bulacağız."

### Sahne 2 · Buzun verisi: gram başına ısı

Tahta: üstte başlık "buz · 0 °C" (y 70, 28). Ortada üç sütunlu kayıt tablosu (`KIT.tablo`; x 250, y 130; sütunlar 140 / 170 / 220; satır yüksekliği 52; yazı 24): başlıklar "Kütle", "Isı", "Isı ÷ kütle"; satırlar "100 g · 33.400 J · ?" ve "200 g · 66.800 J · ?". Anlatım 3'te ilk "?" yerine "334 J/g" yazılır (400 ms, `out`); anlatım 4'te ikincisi; anlatım 5'te iki hücre turuncu çerçevelenir (300 ms, `out`). Anlatım 7'de başlığın yanında "L" harfi turuncu belirir (x 520, y 70; ölçek 1 → 1,2 → 1, 400 ms).

Anlatım:
1. Ela'nın buz deneyindeki ısı verilerine yeniden bakalım.
2. 100 g buz için 33.400 J, 200 g için 66.800 J gerekti.
3. Isıyı kütleye bölelim: 33.400 bölü 100, 334 J/g.
4. 66.800 bölü 200 de 334 J/g çıkıyor.
5. Kütle değişse de her gram buz 334 J istiyor.
6. Buzun bir gramı için gereken ısı hep aynıdır.
7. Bu sayı buzun hâl değişim ısısıdır; L ile gösterilir.
8. Hâl değişim ısısı, bir gramın tamamen hâl değiştirmesi için gereken ısıdır.

### Sahne 3 · Bal mumunun verisi: L maddeye göre değişir

Tahta: sahne 2'nin tablosu 0,35 saydamlığa iner ve sola kayar (x 250 → 90; 500 ms, `inOut`); sağında ikinci tablo belirir (x 540, y 130; sütunlar 140 / 170 / 220; üstünde başlık "bal mumu", y 70); satırlar "100 g · 16.800 J · 168 J/g" (dolu) ve "200 g · 33.600 J · ?".

Anlatım:
1. Bal mumuyla aynı hesabı yapalım.
2. 100 g bal mumu için 16.800 J gerekmişti.
3. 16.800 bölü 100: bal mumunun L'si 168 J/g.
4. Buz 334 J/g istiyor; bal mumu 168 J/g.
5. Hâl değişim ısısı maddeye göre değişir.
6. Bu yüzden maddeler için ayırt edici bir özelliktir.

Birlikte çöz (`tag: 'Birlikte çöz'`; ikinci satırın "?" hücresi vurgulanır): "200 g bal mumu için ısıyı kütleye bölünce kaç J/g çıkar?" **168 J/g** / 336 J/g / 33.600 J/g. Dayandığı anlatım: sahne 2, 5–6; bu sahne 3–5. İpuçları: "L kütleye bağlı değildir; 100 g'da kaç çıkmıştı?" · "33.600 ÷ 200 işlemini yap."

Gör: "?" yerine "168 J/g" yazılır (400 ms, `out`); iki L turuncu parlar.

Defter (`Hâl değişim ısısı`): "L: bir gramın tamamen hâl değiştirmesi için gereken ısı."

### Sahne 4 · Model: Q = m · L

Tahta: ortada büyük formül kartı "Q = m · L" (yazı 64, merkez 500, 150); formülün altında üç satır (x 330, y 250, 300, 350; yazı 26): "Q — ısı (J)" (turuncu), "m — kütle (g)" (turkuaz), "L — hâl değişim ısısı (J/g)". Satırlar anlatım 3'te tek tek belirir (350 ms aralıkla, `out`). Formül anlatım 2'de belirir (500 ms, `out`; ölçek 0,8 → 1).

Anlatım:
1. Bir gram L isterse, m gram m katı ister.
2. Gereken ısı: kütle çarpı L. Q = m · L.
3. Q ısıdır; m kütledir; L hâl değişim ısısıdır.
4. Uluslararası birimi J/kg'dır; biz burada J/g kullanıyoruz.
5. Tabloda 334 kJ/kg yazar; bu, 334 J/g demektir.

Çözülmüş örnek (formül kartı yukarı kayar, y 150 → 90, 500 ms `inOut`; altında hesap satırı belirir, y 200, yazı 30):
6. 250 g buz için Q = 250 · 334 = 83.500 J.

Birlikte çöz (`tag: 'Birlikte çöz'`; satır "150 g bal mumu: Q = 150 · 168 = ?"): "Sonuç kaç J'dur?" **25.200 J** / 2.520 J / 318 J. Dayandığı anlatım: 2–3, 6. İpuçları: "Q = m · L: kütle ile 168'i çarp." · "318, iki sayıyı toplayınca çıkar; model çarpımdır."

Sor (`c.choice`, `tag: 'Sor'`; tek başına): "Ela 300 g buzu erime sıcaklığında eritecek. Kaç J ısı gerekir?" **100.200 J** / 10.020 J / 634 J. Dayandığı anlatım: 2–3, 6. İpuçları: "Buz için L = 334 J/g; kütleyle çarp." · "634, toplamadan çıkar; model çarpımdır."

Gör: hesap satırı "300 · 334 = 100.200 J" yazılır (400 ms, `out`).

Defter (`Hâl değişimi için ısı`): "Q = m · L. Örnek: 100 g buz, 33.400 J."

### Sahne 5 · L maddeye ve hâl değişimine göre değişir

Tahta: dört satırlı, üç sütunlu tablo (`KIT.tablo`; x 150, y 110; sütunlar 170 / 240 / 300; satır yüksekliği 56; yazı 24): başlıklar "Madde", "Erime ısısı (kJ/kg)", "Buharlaşma ısısı (kJ/kg)"; satırlar "Etil alkol · 104 · 854", "Demir · 289 · 6.340", "Alüminyum · 399 · 10.500". Satırlar anlatım 1–2'de teker teker belirir (300 ms aralıkla, `out`).

Anlatım:
1. Hâl değişim ısıları bir tabloda toplanmıştır.
2. Her madde için iki L var: erime ve buharlaşma.
3. Demirde buharlaşma ısısı, erime ısısından çok büyüktür.
4. Erime ısısı alüminyumda 399, etil alkolde 104 kJ/kg.

Sor (`c.choice`, `tag: 'Sor'`): "Aynı kütlede hangisini tamamen eritmek en çok ısı ister?" **Alüminyum** / Demir / Etil alkol. Dayandığı anlatım: 2, 4; tablo. İpuçları: "Erime ısısı sütununa bak; en büyük sayı hangisi?" · "L büyüdükçe aynı kütle için gereken ısı da büyür."

Gör: "399" hücresi turuncu çerçevelenir (300 ms, `out`); satır tabloda parlar.

Sonra:
5. Aynı madde için bile erime ve buharlaşma farklı ısı ister.

### Sahne 6 · Donarken ısı verilir

Tahta: solda bulut (açık gri, 200 × 80, x 120–320, y 90–170) ve altında üç yağmur damlası (mavi, yarıçap 8; x 150, 220, 290; y 240) ile aynı yerlerde belirecek üç kar tanesi (altı kollu, yarıçap 14). Sağda sarı termometre sütunu (26 × 140, x 640–666, y 150–290; üstünde "hava" yazısı). Ok, kar tanelerinden termometreye doğru turuncu (7 birim, "ısı" yazılı). Anlatım 6'da damlalar kara dönüşür (600 ms, `inOut`); anlatım 7'de ok belirir (500 ms, `out`) ve sarı sütun 12 birim yükselir (800 ms, `inOut`).

Anlatım:
1. Erime ısısı, donma ısısına eşittir.
2. 0 °C'ta 1 kg buzu eritmek için 334 kJ ısı gerekir.
3. Aynı sıcaklıkta 1 kg suyu dondurmak için ondan 334 kJ ısı alınır.
4. Buharlaşma ısısı da yoğuşma ısısına eşittir.
5. Maddeler hâl değiştirirken ortamdan ısı alır ya da ortama ısı verir.
6. Yağmur damlaları kara dönüşürken havaya ısı verir.
7. Isı alan havanın sıcaklığı artar; kar yağarken hava ısınır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta temizlenir; ortada bir bardak, içinde 100 g su (etiket "100 g su · 0 °C"). Soru: "100 g su 0 °C'ta tamamen donuyor. Çevresine ne olur?" **Çevresine 33.400 J ısı verir** / Çevresinden 33.400 J ısı alır / Çevresiyle ısı alışverişi yapmaz. Dayandığı anlatım: 1, 3, 5; sahne 2, 4. İpuçları: "Donma ısısı erime ısısına eşittir: 100 · 334." · "Madde hâl değiştirirken ortamla ısı alışverişi yapar; donarken alır mı, verir mi?"

Gör: turuncu ok sudan dışarıya doğru çizilir (500 ms, `out`); yanında "33.400 J".

### Sahne 7 · Grafikte düz parçanın boyu

Tahta: Figür (hazır poz; hareket yok): x 30, y 120, h 250 (genişlik 362); sol `icerik: 'buz', seviye: 0,25, sicaklik: 0, alev: 2, kati: 0,5`; sağ `icerik: 'su', seviye: 0,25, sicaklik: 100, alev: 2`; `f.sure(0)`; kadraj `tum`. `sol.etiket` altında "100 g buz" ve `sag.etiket` altında "100 g su" (turkuaz, 24). Sağında (x 440–945) C2'nin grafiği, ama yalnızca iki basamak ve aralarındaki eğik parça: köşeler (440, 410) → (446,5; 370) → (497,8; 370) → (562,2; 170) → (909,8; 170); eğik parçalar 0,45 saydam, iki basamak sarı 4 birim; kesikli son parça yok. Basamakların altında parantez (turuncu, y 430–440): erime basamağı x 446,5 → 497,8 (uzunluk 51,3) altında "33.400 J"; kaynama basamağı x 562,2 → 909,8 (uzunluk 347,6) altında "226.000 J" (yazı 24). Parantezler anlatım 2 ve 3'te sırayla belirir (400 ms, `out`).

Anlatım:
1. Düz parçanın boyu, hâl değişimi için gereken ısıdır.
2. 100 g buzun erimesi: Q = 100 · 334 = 33.400 J.
3. 100 g suyun buharlaşması: Q = 100 · 2.260 = 226.000 J.
4. Kaynama basamağı, erime basamağından yaklaşık yedi kat uzun.
5. Çünkü suyun buharlaşma ısısı, buzun erime ısısından çok büyük.

Sor (`c.choice`, `tag: 'Sor'`): "Kaynama basamağı, erime basamağının yaklaşık kaç katı uzunluktadır?" **Yaklaşık 7 katı** / Yaklaşık 2 katı / Aynı uzunluktadır. Dayandığı anlatım: 2–5. İpuçları: "Basamağın boyu ısıdır: 226.000 ÷ 33.400 işlemine bak." · "İki L eşit değil: 2.260 ile 334."

Gör: erime basamağının boyu 7 kez ard arda kaynama basamağının altına dizilir (kopyalar 350 ms aralıkla, `out`; ilk altısı tam, yedincisi 0,8 boyda).

### Sahne 8 · Bu ısı yeter mi?

Tahta: solda dört turkuaz buz bloğu (her biri 70 × 70, x 90–370, y 200–270) ve altında "4 kg buz · 0 °C"; sağda kap ve 1 kg su (kap 150 × 170, x 640–790, y 150–320; mavi su) ve altında "1 kg su · 100 °C". İkisinin ortasında "?" (60). Hesap satırları anlatım 4'ten itibaren kapların altında belirir (y 400, 450; yazı 30).

Anlatım:
1. Erime sıcaklığındaki 4 kg buzu eritmek için ısı veriliyor.
2. Bu ısı, 100 °C'taki 1 kg suyu buharlaştırmaya yeter mi?
3. Buzun erime ısısı 334 kJ/kg; suyun buharlaşma ısısı 2.260 kJ/kg.
4. Buz için Q = 4 · 334 = 1.336 kJ gerekir.

Birlikte çöz (`tag: 'Birlikte çöz'`; ikinci satır "Su için Q = 1 · 2.260 = ?"): "1 kg suyu buharlaştırmak için kaç kJ gerekir?" **2.260 kJ** / 226 kJ / 2.594 kJ. Dayandığı anlatım: 3. İpuçları: "Kütle 1 kg; L = 2.260 kJ/kg. Çarp." · "2.594, iki L'yi toplamakla çıkar; model çarpımdır."

Gör: ikinci satır "Su için Q = 1 · 2.260 = 2.260 kJ" yazılır (400 ms, `out`).

Sor (`c.choice`, `tag: 'Sor'`): "Buzu eriten 1.336 kJ ile 1 kg su buharlaşır mı?" **Hayır; 1.336 kJ, 2.260 kJ'den küçüktür** / Evet; buzun kütlesi daha büyüktür / Evet; iki ısı eşittir. Dayandığı anlatım: 4; birlikte çöz sonucu. İpuçları: "Gereken ısıyı eldeki ısıyla karşılaştır." · "Kütlenin büyük olması ısının büyük olduğu anlamına gelmez."

Gör: iki sayı alt alta çizilir; "1.336 < 2.260" turuncu belirir (400 ms, `out`).

### Sahne 9 · Grafikten ısı oranı

Tahta: Figür (hazır poz): x 30, y 120, h 230 (genişlik 334); sol `icerik: 'mum', seviye: 0,25, sicaklik: 40, alev: 2, kati: 1`; sağ `icerik: 'mum', seviye: 0,45, sicaklik: 40, alev: 2, kati: 1`; kadraj `tum`. `sol.etiket` altında "K · m", `sag.etiket` altında "L · 2m" (turkuaz). Sağında sıcaklık–zaman grafiği (düz vektör): y ekseni (440, 110)–(440, 410) ve x ekseni (440, 410)–(940, 410); x çentikleri 0, t, 2t, 4t (x 440, 530, 620, 800; t = 90 birim; yazı y 442); y çentikleri T (y 380) ve 5T (y 140). K (sarı): (440, 380) → (530, 140) → (620, 140) → (700, 100); L (açık sarı): (440, 380) → (530, 260) → (800, 260) → (880, 200). Yatay parçalar kendi renginde kalın (6 birim). Yatay parça boyları: K t (90 birim), L 3t (270 birim).

Anlatım:
1. Özdeş ısıtıcılar K ve L katılarını ısıtıyor: kütleleri m ve 2m.
2. Isıtıcılar özdeş olduğundan süre, verilen ısıyla orantılıdır.
3. K'nin erimesi t sürer; verilen ısı Q olsun.
4. L'nin erimesi 3t sürer; verilen ısı 3Q olur.
5. K için Q = m · L_K yazılır.
6. L için 3Q = 2m · L_L yazılır.
7. İkisini oranlayınca L_K / L_L = 2/3 çıkar.

(Anlatım 3–4'te yatay parçalar sırayla kalınlaşır ve altlarına turuncu parantez; 5–7'de denklemler grafiğin altında, y 470–520'de birer birer belirir, 350 ms aralık, `out`.)

Birlikte çöz (`tag: 'Birlikte çöz'`; yeni grafik: K (m) yatay parçası t, M (3m) yatay parçası 6t sürüyor; denklemler "Q = m · L_K" ve "6Q = 3m · L_M"): "L_K / L_M oranı kaçtır?" **1/2** / 2 / 1/3. Dayandığı anlatım: 2–7. İpuçları: "İki denklemi birbirine böl: 3m · L_M, m · L_K'nin kaç katı?" · "Kütle 3 katı, ısı 6 katı olduğundan M'nin L'si K'ninkinden büyüktür."

Sor (`c.choice`, `tag: 'Sor'`; tek başına): kütleleri eşit X ve Y maddeleri özdeş ısıtıcılarla ısıtılıyor; X'in yatay parçası 2t, Y'ninki 5t sürüyor. Soru: "L_X / L_Y oranı kaçtır?" **2/5** / 5/2 / 1. Dayandığı anlatım: 2–7. İpuçları: "Kütleler eşit; ısı yalnızca süreye bağlı." · "X daha kısa sürdüyse X'in L'si Y'ninkinden küçüktür."

Gör: denklem satırları belirir (350 ms aralıkla).

### Sahne 10 · Dene: buzun basamağı kaynama basamağını geçer mi?

Tahta: Figür kaybolur. Üstte sabit mavi referans çubuğu (yükseklik 36, x 200–426, y 130; boy 226 birim; üstünde "100 g su kaynarken: 226.000 J" mavi, 24). Altında buz çubuğu (turuncu, yükseklik 36, x 200, y 230; boy = ısı ÷ 1.000 birim) ve yanında sayı. Kütle kaydırıcısı (`KIT.kaydirici`; x 200–800, y 360; 100, 200, …, 800 g; adım 100; turkuaz tutamaç); kaydırıcının üstünde "buz kütlesi". Çubuk her değişimde 500 ms `inOut` ile yeni boya geçer.

Veri: 100 g 33.400 J; 200 g 66.800 J; 300 g 100.200 J; 400 g 133.600 J; 500 g 167.000 J; 600 g 200.400 J; 700 g 233.800 J; 800 g 267.200 J.

Anlatım:
1. Kütleyi sen seç; buzun çubuğu ısıyı gösterir.
2. Buzun çubuğu, suyun kaynama çubuğunu aşabilir mi?

Dene (`tag: 'Dene'`): görev: "Buz çubuğunu referans çubuğundan uzun yapan en küçük kütleyi bul." Doğru: 700 g. Doğru bulununca çubuk yeşile döner (300 ms, `out`) ve iki çubuğun farkı turuncu parantezle gösterilir.
Geri bildirim (yanlış ayarda): "Buz çubuğunun sağ ucu, referansın sağ ucunu geçmeli."

Sonra:
3. 700 g buzu eritmek, 100 g suyu kaynatmaktan daha çok ısı ister.

### Çıkış soruları

1. (yeni durum) Erime sıcaklığındaki 400 g bal mumu eritilecek (L = 168 J/g). Kaç J ısı gerekir? **67.200 J** / 168 J / 568 J. (sahne 4)
2. (yeni durum) Ela kaynama sıcaklığındaki 2 kg suyu tamamen buharlaştıracak (L = 2.260 kJ/kg). Kaç kJ ısı gerekir? **4.520 kJ** / 2.260 kJ / 1.130 kJ. (sahne 8)
3. (yanılgı) "Aynı kütledeki her madde, erimek için aynı ısıyı ister." Bu cümle için ne söylenir? **Yanlıştır; L maddeye göre değişir** / Doğrudur; hâl değişimi her maddede aynıdır / Doğrudur; yalnızca saf maddeler için. (sahne 3, 5)
4. (yeni durum) Kütleleri eşit P ve R maddeleri özdeş ısıtıcılarla ısıtılıyor. P'nin erime basamağı 3t, R'ninki 6t sürüyor. Hangisi doğrudur? **R'nin erime ısısı, P'ninkinin iki katıdır** / P'nin erime ısısı, R'ninkinin iki katıdır / İki maddenin erime ısısı eşittir. (sahne 9)
5. (yanılgı) "Kaynayan suyun sıcaklığı değişmiyor; o hâlde su ısı almıyor." Bu cümle için ne söylenir? **Yanlıştır; su ısı alır, bu ısı Q = m · L ile hesaplanır** / Doğrudur; sıcaklık değişmiyorsa ısı alınmaz / Doğrudur; ısı yalnızca ısınmada alınır. (sahne 7)

## C4 · Konu tekrarı: Hâl değişimi (`c4-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle ve deftere düşen satırıyla. Tahta: 3 × 2 kart ızgarası (kart 290 × 200; x 40, 355, 670; y 70 ve 300; yuvarlatılmış çerçeve, 3 birim); her kartta çizim ve en çok dört kelimelik başlık (24). Her kart 400 ms'de `out` ile belirir (ölçek 0,9 → 1); bir önceki 0,45 saydamlığa iner; sahnenin sonunda altısı yeniden tam görünür olur (500 ms, `out`). Figür kullanılmaz.

Kartlar ve çizimleri:
1. "Isı almadan erimez": erime sıcaklığındaki buz küpü (açık mavi kare 60 × 60), yanında kapalı ısıtıcı ve turuncu "0 J" sayacı.
2. "Kütle": 100 g ve 200 g turkuaz bloklar (40 × 40 ve 80 × 40), altlarında turuncu çubuklar (boy 60 ve 120).
3. "Cins": aynı kütlede iki blok; "buz" altında uzun, "bal mumu" altında yarı uzun turuncu çubuk (boy 120 ve 60).
4. "Saflık ve basınç": solda tuz serpilmiş buz (8 beyaz nokta), sağda kapaklı tencere; ikisinin arasında sarı küçük termometre.
5. "Yatay basamak": küçük ısı–sıcaklık grafiği (eğik–yatay–eğik–yatay; mini grafik, 220 × 150), basamaklar turuncu.
6. "Q = m · L": formül (yazı 40) ve altında "L: maddeye göre" (22).

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Erime sıcaklığındaki madde, ısı almadan hâl değiştirmez.
3. Kütle büyüdükçe hâl değişimi için gereken ısı da büyür.
4. Gereken ısı maddenin cinsine göre değişir.
5. Saflık ve basınç, hâl değişim sıcaklığını değiştirir.
6. Hâl değişirken ısı girer, sıcaklık sabit kalır; grafikte yatay basamak.
7. Hâl değişimi için gereken ısı Q = m · L ile hesaplanır.
8. Erime ısısı donma ısısına, buharlaşma ısısı yoğuşma ısısına eşittir.

(Anlatım 2 kart 1'de, 3 kart 2'de, 4 kart 3'te, 5 kart 4'te, 6 kart 5'te, 7–8 kart 6'da söylenir.)

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Ela erime sıcaklığındaki 500 g buzu eritecek (L = 334 J/g). Kaç J ısı gerekir? **167.000 J** / 334 J / 66.800 J. (C3 sahne 4)
2. (yeni durum) Kaynama sıcaklığındaki 3 kg su tamamen buharlaştırılacak (L = 2.260 kJ/kg). Kaç kJ ısı gerekir? **6.780 kJ** / 2.260 kJ / 2.263 kJ. (C3 sahne 8)
3. Düdüklü tencerede suyun kaynama sıcaklığı 100 °C'tan yüksektir. Bunun nedeni hangisidir? **İçerideki basıncın yüksek olması** / Suyun saf olmaması / Suyun kütlesinin çok olması. (C1 sahne 6)
4. (yeni durum) Kütleleri eşit iki katı erime sıcaklığında, özdeş ısıtıcılarla ısıtılıyor. X, Y'den önce tamamen eriyor. Hangisi doğrudur? **X'in erime ısısı, Y'ninkinden küçüktür** / X'in erime ısısı, Y'ninkinden büyüktür / İki maddenin erime ısısı eşittir. (C1 sahne 5, C3 sahne 3 ve 9)
5. (yanılgı) "Hâl değiştirirken saf bir maddenin sıcaklığı yükselir." Bu cümle için ne söylenir? **Yanlıştır; sıcaklık sabit kalır** / Doğrudur; ısı hep sıcaklığı yükseltir / Doğrudur; yalnızca erimede. (C2 sahne 3, 6)
6. (yeni durum) Eşit zaman aralıklarında eşit ısı veren bir kaynakla katı bir madde ısıtılıyor. Sıcaklık–zaman grafiğinde erime için yatay parça 2t–3t, buharlaşma için 6t–9t arasında. Buharlaşma için gereken ısı, erime için gerekenin kaç katıdır? **3 katı** / 2 katı / 9 katı. (C3 sahne 9) Tahta: grafik; x çentikleri 0, 2t, 3t, 6t, 9t; y çentikleri 3T ve 7T; eğri 2t'de 3T'ye, 3t'e kadar yatay, 6t'de 7T'ye, 9t'a kadar yatay.
7. (yeni durum) Soğuk bir gece göldeki su donarken çevredeki havaya ne olur? **Hava ısı alır; sıcaklığı bir miktar artar** / Hava ısı verir; sıcaklığı düşer / Havayla ısı alışverişi olmaz. (C3 sahne 6)
8. (yeni durum) Erime sıcaklığındaki 2 kg buzu eriten ısı, kaynama sıcaklığındaki 0,5 kg suyu buharlaştırmaya yeter mi? (Buzun erime ısısı 334 kJ/kg; suyun buharlaşma ısısı 2.260 kJ/kg.) **Yetmez; 668 kJ, 1.130 kJ'den küçüktür** / Yeter; buzun kütlesi daha büyüktür / Yeter; iki ısı eşittir. (C3 sahne 8)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.3) | Karşılığı |
|---|---|
| Çıktı: hâl değiştirme sıcaklığındaki saf maddenin hâl değiştirmesi için alınan ya da verilen ısının bağlı olduğu değişkenler hakkında bilimsel çıkarım | C1 (kütle, cins), C3 (Q = m · L; alınan ve verilen: sahne 6) |
| a) Hâl değişimini etkileyen nitelikleri tespit eder | C1 sahne 6 (saflık, basınç), sahne 7 (olaylardan nitelik tespiti), sahne 4–5 (kütle, cins) |
| b) Hâl değişimini etkileyen niteliklerle ilgili veri toplayıp kaydeder | C1 sahne 3–5 (kayıt tablosu: kütle, madde, gereken ısı); C2 sahne 3–4 (sıcaklık ve ısı sayacı grafiğe işlenir) |
| c) Verileri yorumlayıp matematiksel modelle değerlendirir | C3 sahne 2–4 (veriden L ve Q = m · L), sahne 8–9 (modelle değerlendirme) |
| Uygulama: buzulların erimesi (video, haber) üzerine düşünme | C1 sahne 2 ve 9 yalnızca bağlam olarak; video ve haber site dışı |
| Uygulama: buzulların erimesinin çevreye etkileri ve çözüm yolları tartışması | Site dışı (`PLAN.md` bölüm 5); C1 yalnızca bağlamı ve kütle–erime süresi tahminini alır |
| Uygulama: beyin fırtınası, altı şapka ile değişkenleri belirleme | Yöntem site dışı; sonucu (değişkenler: kütle, cins, saflık, basınç) C1 sahne 7'de sınıflama |
| Uygulama: buz kütlesinin büyüklüğü ile erime süresi arasındaki ilişki için tahmin | C1 sahne 2 (buz küpü ve buzul), sahne 4 (100 g ve 200 g buz: tahmin ve gözlem) |
| Uygulama: hâl değişimini etkileyen değişkenler (basınç, saflık vb.) üzerine tartışma | C1 sahne 6 (adlarıyla ve birer örnekle), sahne 7 (sınıflama) |
| Uygulama: günlük hayattaki hâl değişimi olaylarından nitelikleri tespit | C1 sahne 7 (iri buz, tereyağı, yola tuz, düdüklü tencere) |
| Uygulama: deney tasarlama ya da simülasyon/animasyon kullanma | Benzetim: C1 sahne 3–5, 8; C2 sahne 3–4, 7, 8; deneyi öğrencinin tasarlaması site dışı (karar 9) |
| Uygulama: deney süresince sıcaklığı ölçerek kütle ve cinsin etkisini gözlemleme | C1 sahne 3–5 (termometre ve süreölçer figürde), C2 sahne 7 |
| Uygulama: sıcaklığın verilen ısıyla değişimini gösteren grafik çizme | C2 sahne 3–4 (grafik benzetimle çizilir), sahne 8 (kütleyi seçerek eğrinin değişimi); öğrencinin kâğıtta çizmesi site dışı |
| Uygulama: grafik üzerinden hâl değişimi ve sıcaklık ilişkisini açıklama | C2 sahne 5–6 |
| Uygulama: hâl değişimiyle ilgili matematiksel modeli keşfetme | C3 sahne 2–4 |
| Uygulama: modeli kullanarak grafik üzerinden hesaplama | C3 sahne 7 (düz parçanın boyu), 9 (zaman grafiğinden oran), 10 (dene); C4 soru 6 |
| Anahtar kavramlar: hâl değişimi, hâl değişim ısısı | C1 (hâl değişimi), C3 sahne 2–5 (hâl değişim ısısı, L) |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık | Ayrı ders yok; C1 sahne 1 ve C2 sahne 1 hatırlatır |
| Köprü kurma: hâl değişimi ile iklim değişikliği | C1 sahne 2 ve 9 (buzul); C3 sahne 6 (kar yağarken hava ısınır) |

Fazlalık denetimi: C2 sahne 5 (ısı nereye gidiyor) programda ve `PLAN.md` C2 satırında yok; yalnızca kitabın Görsel 4.15'indeki hareket enerjisi–potansiyel enerji etiketleriyle ve A1–A2'deki cümlelerle kurulur, atılırsa C2'nin geri kalanı bozulmaz. Kitabın Örnek 1 (kar yağarken hava ısınır) ve Örnek 3 (4 kg buz ve 1 kg su) C3'e "alınan veya verilen ısı" çıktısı için girer. Öz ısıyla hâl değişimini birlikte hesaplama, ısıl denge, ısı aktarım yolları, süblimleşme ve kırağılaşma, buharlaşma–kaynama farkı, basıncın ve saflığın etkisinin nedeni ve sayıları bu konuda yoktur.
Eksik olan: deneyi öğrencinin tasarlaması ve grafiği kâğıtta çizmesi (site dışı); "hâl değişimi süresince kütle korunur" (Kontrol Noktası) ayrı sahne olarak alınmadı (programda ve `PLAN.md` kısa derslerinde yok).
