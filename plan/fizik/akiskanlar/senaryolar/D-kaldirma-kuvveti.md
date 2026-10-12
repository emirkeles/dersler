# Senaryolar — Konu D · Kaldırma kuvveti

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.3.5 ve FİZ.9.3.6, `../PLAN.md` bölüm 3 (D1–D5), "Kısa ders listesi (kararlardan sonra)", bölüm 5, bölüm 7 (karar 2, 4, 7, 12, 13, 19, 20, 22, 23, 24) ve bölüm 8 ("D" satırları, son paragraf). Biçim örneği: `A-basinc.md`. 12 Ekim 2026: D4 bölündü (`PLAN.md` karar 25); veri ve önerme değerlendirmesi D5 oldu, konu tekrarı D6.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("9,8 N" → "dokuz virgül sekiz newton", "F_k = V_b · d_s · g" → "F k eşittir V b çarpı d s çarpı g", "m³" → "metreküp", "−" → "eksi", "·" → "çarpı", "g" → "ge").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyi Ela yapar.
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir. `tag: 'Hipotez kur'` sorusunda doğru şık yoktur (aşağıda D2 sahne 2).
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu.
- Renkler tema boyunca aynıdır: kuvvet (ağırlık) turuncu, yüzey alanı turkuaz, basınç sarı, sıvı mavi, kaldırma kuvveti mor; hava soluk gri-mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir. Tahta koyudur: çizgiler ve yazılar açık renklidir. Cisim açık gridir; X sıvısı sudan koyu mavidir (0,6 saydamlık; su 0,35).
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Yazı en az 22 birim. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız).
- Düzenekler yandan görünüşle, düz vektörle çizilir; izometrik figür kullanılmaz (karar 20). Kit dışı düzenekler (dinamometre, taşırma kabı, tartı) kitap dışıdır; sayılar örnek veridir ve F_k = V_b · d_s · g ile hesaplanmıştır (karar 19). g = 9,8 m/s²; su 1.000 kg/m³. Başka sıvının yoğunluğu sayıyla yazılmaz: su "d", X sıvısı "2d".
- Tablo sahnelerinde tahtadaki kelime sayısı 25'i aşabilir (A senaryosundaki istisna gibi); öteki sahnelerde 25 kelime ve 12 öğeyi aşmaz. Sayılar ve simgeler kelime sayılır.
- Program modeli orantısal ilişkilerle sınırlar: sorular "ne artarsa ne olur", sıralama ve oran sorularıdır. Dinamometre farkı (havada okunan − sıvıda okunan) ve D3'teki gösterim hesapları öğrenciye hesaplatılmaz, gösterilir; tek istisna tek çıkarma işlemidir (D1 sahne 6 Birlikte çöz ve çıkış 1; D2 sahne 4 Birlikte çöz; D3 çıkış 1; D5 çıkış 5; D6 soru 1).

**Dinamometre düzeneği (D1 ve D2 ortak, `dersler/d-araclar.js`)**

- Kap: x 250–650, üst kenar y 240, taban y 540, kap çizgisi açık gri. Su yüzeyi y = 280; su kabın içinde y 280–540 aralığındadır (mavi, 0,35 saydamlık).
- Dinamometre: gövde 60 × 80 (x 420–480), yaylı aygıt; gövdenin sağında (x 500) okunan değer, turuncu, 30 birim, "N" birimiyle. Gövde ölçeği 0–10 N; ibre okuma azalınca 600 ms'de `inOut` ile 6 birim/N oranıyla yukarı çıkar.
- İp: x = 450, gövdenin altından cismin üstüne, 100 birim, açık gri.
- Cisim: 70 × 80 (x 415–485), açık gri, dört eşit dilim (her biri 20 birim, çizgilerle ayrılır). Her dilim 0,0001 m³; cismin hacmi 0,0004 m³; havada ağırlığı 9,8 N.
- Hareket: dinamometre, ip ve cisim birlikte iner. n dilim batıkken inme miktarı Δ = 20·n birimdir: gövde y (20 + Δ)–(100 + Δ), ip y (100 + Δ)–(200 + Δ), cisim y (200 + Δ)–(280 + Δ). n = 0 iken cismin alt kenarı su yüzeyine değer. Dört dilimden sonra cisim tamamen batıktır (Δ = 80). İniş 900 ms, `inOut`.
- Derinlik: kabın sol iç duvarında cetvel, 300 birim = 1 m; çentikler su yüzeyinden 30, 60, 90 birim aşağıda (0,1; 0,2; 0,3 m; y 310, 340, 370). Cismin üst kenarı bu çentiklerde iken Δ = 110, 140, 170 olur (dinamometre gövdesi her zaman su yüzeyinin üstünde kalır: y en çok 270).
- Oklar: ölçek 10 birim = 1 N, kökleri cismin yan yüzünün orta yüksekliğinde. Ağırlık oku (turuncu, aşağı) cismin sağında x = 520; kaldırma kuvveti oku (mor, yukarı) solunda x = 380. Ağırlık oku 98 birimdir; kaldırma kuvveti oku F_k kadar (0,98 N → 10, 1,96 → 20, 2,94 → 29, 3,92 → 39, 7,84 → 78).
- Tablo sahnelerinde düzenek 190 birim sola kaydırılır (x değerlerinden 190 çıkar; kap x 60–460, ip x = 260); tablo sağda x 500–960 aralığına konur.

## D1 · Kaldırma kuvveti neye bağlı? Deneyi kur

- **Fikir:** Kaldırma kuvvetinin hangi değişkenlere bağlı olduğu, her seferinde tek değişkeni değiştiren bir deneyle bulunur.
- **Giriş ekranı sorusu:** Denizde bir arkadaşını kucağına almak karadakinden neden çok daha kolaydır?
- **Kaynak:** Ders kitabı s. 170 (Arşimet ve Kral Hiero'nun Altın Tacı öyküsü; 5. Etkinlik: değişkenleri belirleyecek deneyi tasarla, ölç, tabloya yaz, analiz et), s. 172 (kaldırma kuvvetinin tanımı), s. 173 (Görsel 3.19; özdeş iki gemi: yüklü daha çok batar), s. 174 (top ve tuzlu su), s. 175 (yer çekimi ivmesi 9,8 m/s², arttıkça kaldırma kuvveti artar), s. 180 (tamamı batmış cismin kaldırma kuvveti derinliğe bağlı değildir). Hatırla soruları B ve C konularındandır. Kitap düzenek ve ölçüm vermez; dinamometre düzeneği ve sayılar kitap dışıdır (karar 19, 20). "Tuzlu su daha yoğundur" cümlesi kitapta açık yazmaz, s. 173–175 ve s. 174 Şekil IV'ten çıkarımdır.
- **Sınır:** Formül yok (D2). Taşırma kabı yok (D2). İp gerilmesi problemi yok; kaldırma kuvveti yalnızca "dinamometre okumasının azalması" olarak ölçülür. Cismin kütlesi ve şekli değişken olarak sunulmaz (karar 4). Derinlik yalnızca tamamen batmış cisimde sınanır. Gaz ortamı yok.
- **Örnek veri (F_k = V_b · d_s · g ile hesaplandı):** cisim havada 9,8 N, hacmi 0,0004 m³ (dört dilim, her biri 0,0001 m³). Tablo 1 (su, d): 0 dilim → dinamometre 9,8 N, F_k 0; 1 dilim → 8,82 N, 0,98 N; 2 dilim → 7,84 N, 1,96 N; 3 dilim → 6,86 N, 2,94 N; 4 dilim → 5,88 N, 3,92 N. Tablo 2 (cisim tamamen batık): su (d) → 5,88 N, 3,92 N; X sıvısı (2d) → 1,96 N, 7,84 N. Tablo 3 (su, tamamen batık): 0,1 m, 0,2 m, 0,3 m derinlikte hep 5,88 N ve 3,92 N. Kaydırıcı ızgarası (su; X): 0–4 dilim için F_k su 0 · 0,98 · 1,96 · 2,94 · 3,92 N, X 0 · 1,96 · 3,92 · 5,88 · 7,84 N; dinamometre su 9,8 · 8,82 · 7,84 · 6,86 · 5,88 N, X 9,8 · 7,84 · 5,88 · 3,92 · 1,96 N.
- **Güç kavramlar ve gösterimi:** (1) Görünmeyen yukarı kuvvet: cisim sıvıya girince dinamometre ibresi yukarı çıkar, okuma azalır; azalma kadar mor ok belirir. (2) Tek değişkeni değiştirmek: üç kutu (değiştirilen · ölçülen · sabit tutulan); kartlar kutulara oturur, her deneyde kutular yeniden dolar. (3) Orantı: tabloda yan yana iki sütun, satırlar arasına "× 2" işareti.
- **Hedeflenen yanılgı:** "Derine inildikçe kaldırma kuvveti artar" (basınç derinlikle arttığı için) ve "ağır cisme daha büyük kaldırma kuvveti etki eder".
- **Akılda kalıcı cümle:** Tek değişkeni değiştir, kaldırma kuvvetine bak.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Bir dağcı yükseğe çıkıyor. Açık hava basıncı nasıl değişir? **Azalır** / Artar / Değişmez. (C) Yanlışta: "Yükseldikçe üstteki hava sütunu kısalır; açık hava basıncı azalır."
2. Bir dalgıç durgun suda daha derine iniyor. Üzerine etki eden sıvı basıncı nasıl değişir? **Artar; üstündeki sıvının ağırlığı artar** / Azalır / Değişmez. (B) Yanlışta: "Derinlik arttıkça P = h · d · g büyür."

Tahta: birinci soruda iki dağcı (alçakta ve yüksekte), üstlerinde hava sütunu (soluk gri-mavi sütun; alçakta 160, yüksekte 90 birim); ikinci soruda iki dalgıç (sığda ve derinde), üstlerinde mavi su sütunu (60 ve 150 birim), sarı basınç okları (kısa ve uzun).

Sonra: "Bugün sıvının cisme uyguladığı yukarı yönlü bir kuvveti sınayacağız."

### Sahne 2 · Altın taç

Tahta (üç kare sırayla belirir; yeni kare belirirken öncekiler 300 ms'de `in` ile kaybolur). (a) 1. cümlede külçe (krem dikdörtgen, x 120–280, y 330–400) 400 ms `out`; 2. cümlede sağında taç (krem, x 480–640, y 320–400, üstünde beş sivri uç) 400 ms `out`; 3. cümlede tacın üstünde "?" (36 birim) 300 ms `out`. (b) 5.–6. cümlede küvet (x 300–700, y 300–460, açık gri çizgi; mavi su y 330–460); içinde Arşimet: daire baş (r 26, merkez x 500, y 318) ve omuz çizgisi; 5. cümlede küvetin sağ kenarından (x 700) üç mavi damla 140 birim aşağı düşer (700 ms, `in`), üstte "Eureka!" (40 birim) belirir (300 ms, `out`). (c) 7.–9. cümlede iki küçük kap (sol x 160–330, sağ x 560–730; y 360–460; mavi su; solda kabın üstünde külçe, sağda taç, ikisi de küçültülmüş, 90 birim geniş); 7. cümlede sol kapta, 8. cümlede sağ kapta su seviyesi 500 ms `out` ile belirir (seviyeler küçük bir farkla farklı çizilir: 20 birim; hangisinin fazla olduğu yazıyla belirtilmez); 9. cümlede kapların ortasında "≠" (44 birim) belirir.

Anlatım:
1. Sirakuza Kralı Hiero, kuyumcuya bir külçe altın veriyor.
2. Kral, külçenin tamamından bir taç yapılmasını istiyor.
3. Taç gelince Kral, içine başka madde katıldığından şüpheleniyor.
4. Arşimet'ten tacı bozmadan hileyi bulması isteniyor.
5. Arşimet, küvetten taşan suyu görünce "Eureka!" diye bağırıyor.
6. Taşan su ile kendi ağırlığı arasında bir ilişki fark ediyor.
7. Önce külçe altını daldırıp taşan suyun ağırlığını ölçüyor.
8. Sonra tacı daldırıp taşan suyun ağırlığını ölçüyor.
9. İki taşan suyun ağırlığı aynı çıkmıyor; kuyumcu Kral'ı aldatmış.

Not (ana oturum, 12 Ekim 2026): hangisinin daha çok su taşırdığı kaynakta yazmıyor. İki toplama kabındaki su aynı düzeyde çizilir; fark yalnızca iki kabın arasındaki "≠" işaretiyle gösterilir.

Sonra:
10. Suya batan her cisim, kendi hacmi kadar suyu yerinden eder.

### Sahne 3 · Kaldırma kuvveti ve dinamometre

Tahta: dinamometre düzeneği (okuma kılavuzu), cisim n = 0 konumunda; okuma "9,8 N". 2. cümlede ağırlık oku (turuncu, aşağı, 98 birim) 400 ms `out` ile belirir, yanında "ağırlık". 4. cümlede cisim 900 ms `inOut` ile 80 birim iner (n = 4), okuma 600 ms `out` ile 9,8'den 5,88'e sayarak iner, ibre yukarı çıkar. 5. cümlede kaldırma kuvveti oku (mor, yukarı, 39 birim) 400 ms `out` ile belirir, yanında "kaldırma kuvveti".

Anlatım:
1. Dinamometre, kuvveti newton cinsinden ölçen yaylı bir aygıttır.
2. Ela cismi havada tartıyor: dinamometre 9,8 newton gösteriyor.
3. Bu değer cismin ağırlığıdır; aşağı yönlü bir kuvvettir.
4. Ela cismi tamamen suya batırıyor: dinamometre 5,88 newton gösteriyor.
5. Okunan değer küçüldü: su cismi yukarı doğru itiyor.
6. Sıvının cisme uyguladığı bu yukarı kuvvete kaldırma kuvveti denir.
7. Kaldırma kuvveti, ağırlığa zıt yönlüdür.
8. Bu yüzden denizde bir arkadaşını kaldırmak karadakinden kolaydır.

### Sahne 4 · Kaldırma kuvvetini ölçme (çözülmüş örnek)

Tahta: aynı düzenek, n = 0 ile başlar; 2. cümlede cismin üstünde "dört eşit dilim" yazısı belirir (300 ms, `out`) ve kaybolur (4. cümlede, 300 ms, `in`). 2. cümlede cisim 600 ms `inOut` ile 40 birim iner (n = 2); okuma 9,8'den 7,84'e 600 ms `out` ile sayarak iner. Ağırlık oku 98 birim, kaldırma kuvveti oku 20 birim (mor). Sağda hesap satırı (x 560, y 130, 32 birim) 5. cümlede parça parça belirir (her parça 300 ms, `out`): "9,8" (turuncu) · "−" · "7,84" (turuncu) · "=" · "1,96 N" (mor).

Anlatım:
1. Cismin dört eşit dilimi var; her dilim aynı hacimdedir.
2. Ela cismi iki dilimi batacak kadar indiriyor.
3. Dinamometre 9,8 yerine 7,84 newton gösteriyor.
4. Okumadaki azalma, kaldırma kuvvetinin büyüklüğüdür.
5. Kaldırma kuvveti: 9,8 eksi 7,84, yani 1,96 newton.

### Sahne 5 · Hangi değişkenler?

Tahta: solda iki gemi yan yana (özdeş gövde, 150 geniş, 100 yüksek; su yüzeyi y = 340; mavi su x 60–470, y 340–500): sol "yüklü" (gövdenin üstünde üç konteyner kutusu, her biri 30 × 20; alt kenar su yüzeyinin 40 birim altında, x 100–250), sağ "boş" (alt kenar 20 birim altında, x 290–440). Sağda iki kap (mavi su, kap x 540–720 ve 780–960; su yüzeyi y = 340): solda "su"da bir top (daire r 36; 40 birim batık), sağda "tuzlu su"da aynı top (28 birim batık; tuzlu su 0,6 saydamlık). Gemiler 1. cümlede, kaplar 2. cümlede 500 ms `out` ile belirir. 5. cümlede altta üç etiket sırayla 300 ms `out`: "batan hacim" (mor), "sıvının yoğunluğu" (mavi), "derinlik" (açık gri); aralarında 40 birim. 1. cümleden sonra gemilerin altında mor ok (yukarı) belirir: yüklü gemide 60, boş gemide 30 birim (ağırlık oku yok).

Anlatım:
1. Yüklü gemi daha derine batar; batan hacmi daha büyüktür.
2. Top, tuzlu suda sudakinden daha az batar.
3. Tuzlu su, sudan daha yoğundur.
4. Derinlikle basınç artıyordu; derinliğin de etkisi olabilir.
5. Üç aday değişken: batan hacim, sıvının yoğunluğu, derinlik.
6. Hangisinin etkisi olduğunu yalnızca deney gösterir.
7. Deneyde her seferinde yalnızca bir değişken değiştirilir.
8. Ölçülen değer kaldırma kuvvetidir; geri kalan her şey sabit kalır.

### Sahne 6 · Deney 1: batan hacim

Tahta (a) (tasarım): üstte üç kutu başlığı (y 60–110): x 60–330 "Değiştirilen", x 365–635 "Ölçülen", x 670–940 "Sabit tutulan". Ortada (y 200–280) sırayla dört kart (240 × 80): "batan hacim", "kaldırma kuvveti", "sıvı", "cisim". 2. cümlede "batan hacim" kartı 500 ms `inOut` ile "Değiştirilen" kutusunun altına gider; 3. cümlede "kaldırma kuvveti" kartı "Ölçülen" kutusuna gider. Birlikte çöz'ün cevabından sonra "sıvı" ve "cisim" kartları 500 ms `inOut` ile "Sabit tutulan" kutusuna gider (alt alta, 22 birim yazı).

Anlatım (a):
1. İlk deneyde kaldırma kuvvetinin batan hacme bağlı olup olmadığına bakıyoruz.
2. Değiştirilen değişken batan hacimdir: dilimleri sırayla batıracağız.
3. Ölçülen değişken, her seferinde kaldırma kuvvetidir.

Birlikte çöz (`tag: 'Birlikte çöz'`): kartlardan ikisi yerine oturdu. Sıvı ve cisim nereye gider? **Sabit tutulan** / Değiştirilen / Ölçülen. Dayandığı anlatım: sahne 5, 7–8; bu sahne 2–3. İpuçları: "Yalnızca bir değişken değişecek." · "Batan hacim dışındaki her şey aynı kalmalı."

Sonra:
4. Sıvı ve cisim aynı kalır; yalnızca batan hacim değişir.

Tahta (b) (ölçüm; düzenek 190 birim sola kaydırılmış, tablo 1 sağda x 500–940, y 130): sütunlar "Batan hacim (dilim)" 150, "Dinamometre (N)" 130 (turuncu), "Kaldırma kuvveti (N)" 160 (mor); beş satır. İlk satır 5. cümlede "0 · 9,8 · 0" olarak açılır; ikinci satır 7. cümlede "1 · 8,82 · 0,98"; üçüncü satır "2 · 7,84 · 1,96" 8. cümlede. Dördüncü satır Birlikte çöz'den sonra "3 · 6,86 · 2,94"; beşinci satır "4 · 5,88 · 3,92". Cisim her satırda 600 ms `inOut` ile 20 birim iner, okuma 400 ms `out` ile sayar. Satırlar arasında kaldırma kuvveti sütununun yanında "× 2", "× 3", "× 4" işaretleri (mor, 22 birim; birinci satıra göre).

Anlatım (b):
5. Ela cismi önce havada tartıyor: 9,8 newton.
6. Bir dilim batınca dinamometre 8,82 newton gösteriyor.
7. Kaldırma kuvveti 9,8 eksi 8,82, yani 0,98 newton.
8. İki dilimde kaldırma kuvveti 1,96 newton bulmuştuk.

Birlikte çöz (`tag: 'Birlikte çöz'`): üç dilim batınca dinamometre 6,86 N gösteriyor. Kaldırma kuvveti kaç N? **2,94 N** / 6,86 N / 1,96 N. Dayandığı anlatım: sahne 4; bu sahne 5–8. İpuçları: "Havadaki değerden sudaki değeri çıkar." · "Kaldırma kuvveti, okumadaki azalmadır."

Gör: dört ve beşinci satırlar dolar; "× 2", "× 3", "× 4" işaretleri belirir.

Sonra:
9. Her dilim, kaldırma kuvvetine 0,98 newton ekliyor.
10. Batan hacim iki katına çıkınca kaldırma kuvveti iki katına çıkıyor.
11. Batan hacim arttıkça kaldırma kuvveti artar.

Soru (`tag: 'Sıra sende'`; yeni durum): Özdeş iki gemiden biri tam yüklü, biri boş. Hangisine etki eden kaldırma kuvveti daha büyüktür? **Yüklü gemiye; batan hacmi daha büyük** / Boş gemiye / İkisine eşit. Dayandığı anlatım: sahne 5, 1; bu sahne 9–11. İpuçları: "Daha derine batan geminin batan hacmi daha büyüktür." · "Batan hacim arttıkça kaldırma kuvveti artıyordu."

Gör: sahne 5'teki gemiler küçültülmüş belirir; yüklü geminin altındaki mor ok (60 birim) boş geminin okunun (30 birim) iki katıdır.

### Sahne 7 · Deney 2: sıvının yoğunluğu

Tahta: düzenek 190 birim sola kaydırılmış, cisim tamamen batık (n = 4; okuma 5,88 N, kaldırma oku 39 birim). Sağda tablo 2 (x 500–940, y 130): sütunlar "Sıvı" 100, "Dinamometre (N)" 150 (turuncu), "Kaldırma kuvveti (N)" 190 (mor); iki satır. Kapta su; ilk satır "su (d) · 5,88 · 3,92" 5. cümlede açılır (300 ms, `out`). Tahminden sonra kaptaki su 600 ms `inOut` ile X sıvısına dönüşür (mavi koyulaşır, 0,35 → 0,6 saydamlık); cisim 400 ms `inOut` ile havaya çıkıp yeniden iner (Δ 80 → 0 → 80, 900 ms); okuma 1,96'ya iner, kaldırma kuvveti oku 78 birim olur; ikinci satır "X sıvısı (2d) · 1,96 · 7,84" açılır. Kaldırma kuvveti sütunu için "× 2" (mor) belirir; sıvı sütununun yanında "× 2" (mavi).

Anlatım:
1. İkinci deneyde yalnızca sıvıyı değiştiriyoruz.
2. Cisim iki sıvıda da tamamen batıyor; batan hacim aynı.
3. Birinci sıvı su; yoğunluğuna d diyelim.
4. İkinci sıvı X; yoğunluğu suyunkinin iki katı, yani 2d.
5. Suda dinamometre 5,88 newton; kaldırma kuvveti 3,92 newton.

Tahmin (`tag: 'Tahmin et'`): Cisim X sıvısına tamamen batırılınca kaldırma kuvveti suyunkine göre nasıl olur? **İki katı olur** / Aynı kalır / Yarısı olur. Dayandığı anlatım: sahne 5, 2–3; bu sahne 3–5. İpuçları: "Yoğun tuzlu suda top daha az batıyordu: sıvı fark yaratıyor." · "Yoğunluk iki katına çıktı; kaldırma kuvvetinin bu orana göre değişip değişmediğine bak."

Gör: X sıvısında okuma 1,96 N, kaldırma kuvveti 7,84 N.

Sonra:
6. Sıvının yoğunluğu iki katına çıktı; kaldırma kuvveti de iki katına çıktı.
7. Sıvının yoğunluğu arttıkça kaldırma kuvveti artar.

### Sahne 8 · Deney 3: derinlik

Tahta: düzenek 190 birim sola kaydırılmış, cetvelle (kabın sol iç duvarı; çentikler "0,1", "0,2", "0,3" m, 22 birim, açık gri). Cisim tamamen batık, üst kenarı 0,1 m çentiğinde (Δ = 110; okuma 5,88 N). Sağda tablo 3 (x 500–940, y 130): sütunlar "Derinlik (m)" 120, "Dinamometre (N)" 150 (turuncu), "Kaldırma kuvveti (N)" 190 (mor); üç satır. İlk satır "0,1 · 5,88 · 3,92" 3. cümleden sonra açılır. Tahminden sonra cisim 700 ms `inOut` ile 30 birim iner (Δ 110 → 140; 0,2 m), ikinci satır açılır; 700 ms sonra yine 30 birim iner (Δ 170; 0,3 m), üçüncü satır açılır. Okuma her seferinde 5,88'de kalır; ibre yerinde durur; kaldırma kuvveti oku 39 birimde kalır.

Anlatım:
1. Üçüncü deneyde cismi tamamen batmış hâlde derine indiriyoruz.
2. Cismin üst yüzeyi başlangıçta suyun 0,1 metre altında.
3. Batan hacim ve sıvı aynı; yalnızca derinlik değişiyor.

Tahmin (`tag: 'Tahmin et'`; hedeflenen yanılgı): Cisim 0,2 metre derine indirilirse kaldırma kuvveti ne olur? **Değişmez** / Artar / Azalır. Dayandığı anlatım: sahne 5, 4; bu sahne 3. İpuçları: "Batan hacim ve sıvı aynı kaldı." · "Dinamometre ibresinin yerinde durup durmadığına bak."

Gör: cisim 0,2 ve 0,3 metreye iner; okuma hep 5,88 N.

Sonra:
4. 0,2 ve 0,3 metrede de dinamometre 5,88 newton gösteriyor.
5. Kaldırma kuvveti her derinlikte 3,92 newton.
6. Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.
7. Derinlikle basınç artsa da kaldırma kuvveti artmıyor.

### Sahne 9 · Yer çekimi ivmesi

Tahta: altta Dünya (açık gri daire, merkez x 500, y 560, r 260; yalnızca üst yarısı görünür). Üstünde küçük bir cisim (30 × 30, açık gri, x 485–515, y 220–250); cisimden Dünya'ya turuncu ok (aşağı, 80 birim) ve yanında "g" (turuncu, 36 birim). 3. cümlede ok yanında "9,8 m/s²" belirir (300 ms, `out`). 4. cümlede sağda "g ↑ → kaldırma kuvveti ↑" (mor, 28 birim) belirir.

Anlatım:
1. Yer çekimi kuvveti, Dünya'nın cisimleri kendine çeken kuvvettir.
2. Yer çekimi ivmesinin büyüklüğü g ile gösterilir.
3. Dünya'nın yüzeyinde g yaklaşık 9,8 metre bölü saniye kare.
4. Yer çekimi ivmesi arttıkça kaldırma kuvveti artar.
5. Ela g'yi değiştiremez; deneyleri hep aynı yerde yapıyor.

Soru (`tag: 'Sıra sende'`; yeni durum): Aynı sıvıda aynı hacim batarken, yer çekimi ivmesi daha büyük bir yerde kaldırma kuvveti nasıl olur? **Daha büyük olur** / Aynı kalır / Daha küçük olur. Dayandığı anlatım: 4. İpuçları: "Yer çekimi ivmesi arttıkça kaldırma kuvvetinin ne yaptığını hatırla." · "Sıvı ve batan hacim aynı; değişen yalnızca g."

Defter ("Kaldırma kuvveti"): **Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve g'ye bağlıdır.** Örnek: derinlik etkisiz.

### Sahne 10 · Dene

Dene 1 (`tag: 'Dene'`; kaydırıcı). Tahta: düzenek 190 birim sola kaydırılmış. Sağda üç denetim (x 520–940): (a) "Batan hacim" kaydırıcısı (y 120; 0, 1, 2, 3, 4 dilim; adım 1; cisim kaydırıcıyla birlikte 300 ms `inOut` ile iner); (b) "Sıvı" anahtarı (y 220; "su (d)" ve "X sıvısı (2d)"; seçilince sıvı rengi 400 ms `inOut` ile değişir); (c) "Derinlik" kaydırıcısı (y 320; 0,1 / 0,2 / 0,3 m; yalnızca dört dilim batıkken etkin, öbür hâllerde 0,35 saydamlıkta). Altta iki canlı sayı (y 430): "dinamometre" (turuncu) ve "kaldırma kuvveti" (mor); değerler okuma kılavuzundaki örnek veri ızgarasındandır. Görev (üstte, y 60): "Kaldırma kuvvetini 3,92 N yap. Kaç yol bulabilirsin?" İki yol vardır: su + 4 dilim; X sıvısı + 2 dilim. Her yol bulununca kendi satırı belirir; ikisi bulunca geri bildirim: "İkisi de olur: yoğunluk iki katına çıkınca batan hacim yarıya inebilir." Derinlik kaydırıcısı oynatılınca sayı değişmez; geri bildirim: "Derinlik kaldırma kuvvetini değiştirmedi."

Dene 2 (`tag: 'Dene'`; sınıflandırma). Kutular "Kaldırma kuvvetini etkiler" / "Kaldırma kuvvetini etkilemez". Soru kalıbı: "<değişken> kaldırma kuvvetini etkiler mi?" Yanlışta ipucu: "Deneyde bu değişken değişince dinamometre okuması ne yaptı?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Batan hacim | etkiler | Evet. Hacim büyüdükçe kaldırma kuvveti arttı. |
| Sıvının yoğunluğu | etkiler | Evet. Yoğunluk iki katına çıkınca kuvvet iki katına çıktı. |
| Derinlik (tamamen batmış cisim) | etkilemez | Evet. Dinamometre her derinlikte aynı değeri gösterdi. |
| Yer çekimi ivmesi | etkiler | Evet. g arttıkça kaldırma kuvveti artar. |

Sonra:
1. Tek değişkeni değiştirince hangisinin etkili olduğu anlaşılır.

### Çıkış soruları

1. (yeni durum) Ela başka bir cismi havada tartınca 6 N, suya tamamen batırınca 4 N okuyor. Kaldırma kuvveti kaç N'dur? **2 N** / 4 N / 10 N. (sahne 4)
2. (yanılgı) Tamamen batmış bir cisim havuzda 1 m derinlikten 2 m derinliğe indiriliyor. Dinamometre okuması nasıl değişir? **Değişmez; kaldırma kuvveti derinliğe bağlı değildir** / Azalır; derinde kaldırma kuvveti artar / Artar; derinde cisim ağırlaşır. (sahne 8)
3. (yeni durum) Aynı cisim önce suya, sonra yoğunluğu suyun üç katı olan bir sıvıya tamamen batırılıyor. Hangisinde kaldırma kuvveti büyüktür? **Yoğunluğu büyük olan sıvıda** / Suda / İkisinde de aynı. (sahne 7)
4. (orantı) Aynı sıvıda bir cismin batan hacmi iki dilimden dört dilime çıkıyor. Kaldırma kuvveti nasıl değişir? **İki katına çıkar** / Aynı kalır / Yarıya iner. (sahne 6)
5. Kaldırma kuvvetinin sıvının yoğunluğuna bağlı olup olmadığı sınanıyor. Hangisi sabit tutulmalıdır? **Cismin batan hacmi** / Sıvının yoğunluğu / Kaldırma kuvveti. (sahne 6, 7)

Özet: Sıvı, içindeki cismi yukarı iter: buna kaldırma kuvveti denir. · Kaldırma kuvveti batan hacim ve sıvının yoğunluğu arttıkça artar; tamamen batmış cismin derinliğine bağlı değildir. · **Tek değişkeni değiştir, kaldırma kuvvetine bak.**

## D2 · Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır

- **Fikir:** Kaldırma kuvvetinin büyüklüğü, cismin yerini değiştirdiği sıvının ağırlığına eşittir (Arşimet İlkesi); bu eşitlik modeli verir: F_k = V_b · d_s · g.
- **Giriş ekranı sorusu:** Ağzına kadar dolu küvete girince taşan su ile hafiflemen arasında bir bağ var mı?
- **Kaynak:** Ders kitabı s. 170 (öyküde taşan suyun ağırlığı; Performans Görevi'nde "yoğunluk, batan hacim" yöntemi), s. 173 ve 175 (batan hacim büyüdükçe yeri değişen akışkan artar), s. 176–177 (6. Etkinlik: hipotez kur, matematiksel modeli oluştur), s. 180 (Arşimet İlkesi cümlesi; F_k = V_b · d_s · g; birim newton), s. 183 (model ve birimler: N, m³, kg/m³, m/s²), s. 62 (suyun yoğunluğu 1.000 kg/m³; karar 19), s. 175 (g = 9,8 m/s²). Kitap taşırma kabı ve ölçüm vermez: düzenek ve sayılar kitap dışıdır. İlkeden modele geçiş (m = d · V, G = m · g) yerleşik ders bilgisidir; kitap modeli basınç kuvvetlerinden türetir (D3). İlke cümlesinde kitabın "akışkan" sözcüğü sıvı sınırı için "sıvı" yazılır.
- **Sınır:** Modeldeki nicelikler arasındaki orantılar. Sayısal işlem öğrenciye hesaplatılmaz; model yalnızca veriyle sınanır. Cismin ağırlığı modelde yoktur. Taşırma kabında ip gerilmesi, tabana tepki gibi problemler yok. Gaz ortamı yok.
- **Örnek veri (F_k = V_b · d_s · g ile hesaplandı):** D1'deki cisim (havada 9,8 N, hacmi 0,0004 m³, dilim başına 0,0001 m³). Su (d = 1.000 kg/m³): 0,0001 m³ → 0,98 N; 0,0002 m³ → 1,96 N; 0,0003 m³ → 2,94 N; 0,0004 m³ → 3,92 N; dinamometre 8,82 · 7,84 · 6,86 · 5,88 N; taşan suyun ağırlığı aynı sayılardır (tartı N cinsinden gösterir). X sıvısı (2d), 0,0004 m³ → 7,84 N; dinamometre 1,96 N; taşan sıvının ağırlığı 7,84 N. Karşılaştırma cisimleri (hacimleri 0,0004 m³, suya tamamen batık): A havada 9,8 N → dinamometre 5,88 N; B havada 7,84 N → dinamometre 3,92 N; ikisinde F_k 3,92 N.
- **Güç kavramlar ve gösterimi:** (1) Yer değiştiren sıvı: cisim girerken kaptan taşan su, cismin batan kısmı boyunda mavi kesikli bir "su parçası" olarak gösterilir; bu parça borudan toplama kabına akar. (2) Eşitliğin ölçümle görülmesi: kaldırma kuvveti (mor) ve taşan suyun ağırlığı (turuncu) yan yana, aralarında "=" . (3) Modelin ilkeden çıkması: dört adım alt alta (hacim → kütle → ağırlık → F_k). (4) Cismin ağırlığının etkisizliği: iki farklı ağırlıklı cismin aynı mor okla gösterilmesi.
- **Hedeflenen yanılgı:** "Ağır cisme daha büyük kaldırma kuvveti etki eder" ve "kaldırma kuvveti cismin ağırlığına eşittir" (yüzme dışında).
- **Akılda kalıcı cümle:** Cisim ne kadar sıvıyı yerinden ederse o kadar kaldırılır.

**Taşırma düzeneği (D2; D1'in dinamometre düzeneği 180 birim sola kaydırılmış)**

- Taşırma kabı: x 120–420, üst kenar y 240, taban y 540; su yüzeyi y = 280 (borunun ağzı hizası). Boru: kabın sağ duvarından (x 420, y 280) x 520, y 310'a kadar eğimli, 14 birim kalınlık.
- Dinamometre, ip ve cisim D1'dekiyle aynı ölçülerdedir, yalnızca x'ten 180 çıkarılır (ip x = 270, cisim x 235–305, gövde x 240–300, okuma x 320). Δ = 20·n kuralı aynıdır.
- Toplama kabı: x 470–590, y 400–500, üstü açık; boru ucu (x 520) kabın üstündedir. Tartı: gövde x 450–610, y 500–540; ekran x 480–580 içinde okuma (turuncu, 26 birim, "N"), üstünde "taşan su" etiketi. Toplama kabındaki su yüksekliği dilim başına 15 birimdir (4 dilimde 60). Cisim n dilim batarken boru ucundan her dilim için bir mavi damla (400 ms, `in`) 90 birim düşer; tartı okuması 600 ms `out` ile sayarak n · 0,98 N olur.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Tamamen batmış bir cisim daha derine indirilirse kaldırma kuvveti nasıl değişir? **Değişmez** / Artar / Azalır. (D1) Yanlışta: "Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir."
2. Aynı derinlikte, bir sıvının yoğunluğu ötekinin iki katı. Basınç nasıl karşılaştırılır? **Yoğun sıvıda iki katı** / Aynı / Yoğun sıvıda yarısı. (B) Yanlışta: "P = h · d · g: yoğunluk iki katına çıkarsa basınç da iki katına çıkar."

Tahta: birinci soruda dinamometre düzeneğinin tamamen batık hâli (D1 sahne 8'in son karesi, küçültülmüş); ikinci soruda iki kap yan yana (aynı derinlik, sarı oklar 40 ve 80 birim).

Sonra: "Bugün kaldırma kuvvetini taşan suyla karşılaştıracağız."

### Sahne 2 · Taşırma kabı ve hipotez

Tahta: taşırma düzeneği (okuma kılavuzu). 1. cümlede taşırma kabı ve su 500 ms `out` ile belirir; 2. cümlede boru ve toplama kabı ile tartı (500 ms, `out`); 3. cümlede tartı ekranı "0 N" yanıp söner (iki kez, 200 ms açık/kapalı). 4. cümlede cisim ve dinamometre belirir; cisim 600 ms `inOut` ile iki dilim iner (Δ = 40); iki damla düşer; tartı 0'dan 1,96'ya sayar. 5. cümlede cismin batan kısmı boyunda mavi kesikli bir dikdörtgen (70 × 40) belirir ve 600 ms `inOut` ile boru ucuna kayar; yanında "yeri değişen su" (mavi, 22 birim). 6. cümlede cisim 600 ms `inOut` ile dört dilime iner, dört damla düşer, tartı 3,92'ye sayar. 7. cümlede ek görsel yok.

Anlatım:
1. Ela, ağzına kadar dolu bir taşırma kabı hazırlıyor.
2. Borunun altına, tartının üstüne bir kap koyuyor.
3. Tartı, kaptaki suyun ağırlığını newton olarak gösteriyor.
4. Cisim suya girince kendi hacmi kadar su taşar.
5. Taşan su, cismin yerini değiştirdiği sıvıdır.
6. Cisim ne kadar çok batarsa o kadar çok su taşar.
7. Arşimet de taşan suyun ağırlığını ölçmüştü.

Hipotez (`tag: 'Hipotez kur'`; doğru şık yoktur, hepsi hipotezdir): Kaldırma kuvvetinin büyüklüğü ile taşan suyun ağırlığı arasında nasıl bir ilişki bekliyorsun? Kaldırma kuvveti, taşan suyun ağırlığına eşit olmalı / Kaldırma kuvveti, taşan suyun ağırlığından büyük olmalı / İkisi arasında bir ilişki yok. Seçilen hipotez sahne 4'ün sonundaki "Gör"de sınanır. Dayandığı anlatım: 4–6; D1 sahne 6, 11 (batan hacim arttıkça kaldırma kuvveti artar).

### Sahne 3 · Bir ölçüm (çözülmüş örnek)

Tahta: taşırma düzeneği, kap yeniden ağzına kadar dolu, toplama kabı boş, tartı "0 N". Cisim n = 0'dadır; okuma "9,8 N" (1. cümlede). 2. cümlede cisim 600 ms `inOut` ile iki dilim iner; damlalar düşer; okuma 7,84'e, tartı 1,96'ya sayar (600 ms, `out`). Sağda (x 640–960) satırlar: 3. cümlede "kaldırma kuvveti: 1,96 N" (mor, y 150, 30 birim); 4. cümlede "taşan suyun ağırlığı: 1,96 N" (turuncu, y 240); 5. cümlede iki satırın arasında "=" (44 birim, y 195) belirir (300 ms, `out`).

Anlatım:
1. Ela cismi havada tartıyor: dinamometre 9,8 newton gösteriyor.
2. Her dilimin hacmi 0,0001 metreküp; iki dilim batık.
3. Dinamometre 7,84 newton gösteriyor; kaldırma kuvveti 1,96 newton.
4. Tartı, taşan suyun ağırlığını 1,96 newton gösteriyor.
5. Kaldırma kuvveti ile taşan suyun ağırlığı eşit çıktı.

Gör: seçilen hipoteze göre geri bildirim. Eşit seçildiyse: "Hipotezin ilk ölçümde tuttu." Öteki seçimlerde: "Hipotezin tutmadı: iki değer eşit çıktı." İlişki yok seçildiyse ayrıca: "İkisi de batan hacimle birlikte arttı."

### Sahne 4 · Ölçümü yinele

Tahta: tablo (x 70–930, y 120; sütunlar "Batan hacim (m³)" 200, "Dinamometre (N)" 190 turuncu, "Kaldırma kuvveti (N)" 230 mor, "Taşan suyun ağırlığı (N)" 240 turuncu; beş satır, sütun başlıkları 22 birim). Satırlar 400 ms `out` ile açılır: 3. cümlede "0,0001 · 8,82 · 0,98 · 0,98"; 4. cümlede "0,0002 · 7,84 · 1,96 · 1,96"; Birlikte çöz'den sonra "0,0003 · 6,86 · 2,94 · 2,94" ve "0,0004 · 5,88 · 3,92 · 3,92". Soru sonrası beşinci satır "0,0004 (X sıvısı) · 1,96 · 7,84 · 7,84" açılır. Son iki sütunun arasında her satırda "=" (22 birim) 5. cümlede 300 ms `out` ile belirir.

Anlatım:
1. Ela ölçümü dört farklı batan hacimle yineliyor.
2. Her satırda dinamometre okuması, kaldırma kuvveti ve taşan suyun ağırlığı var.
3. Bir dilimde kaldırma kuvveti de taşan su da 0,98 newton.
4. İki dilimde ikisi de 1,96 newton çıkıyor.

Birlikte çöz (`tag: 'Birlikte çöz'`): üç dilim (0,0003 m³) batınca dinamometre 6,86 N gösteriyor. Kaldırma kuvveti ve taşan suyun ağırlığı ne olur? **İkisi de 2,94 N** / İkisi de 6,86 N / Kaldırma kuvveti 2,94 N, taşan su 6,86 N. Dayandığı anlatım: sahne 3, 3–5; bu sahne 3–4. İpuçları: "Önce havadaki ve sudaki okumanın farkını bul." · "Önceki satırlarda iki değer hep eşit çıktı."

Gör: üçüncü ve dördüncü satırlar dolar.

Sonra:
5. Her satırda kaldırma kuvveti, taşan suyun ağırlığına eşit.
6. Sıvının yoğunluğu iki katına çıkınca kaldırma kuvveti iki katına çıkmıştı.

Soru (`tag: 'Sıra sende'`; yeni durum): Aynı cisim, yoğunluğu suyun iki katı olan X sıvısıyla ağzına kadar dolu taşırma kabına tamamen batırılıyor. Taşan sıvının ağırlığı, suda taşan suyun ağırlığına göre nasıl olur? **İki katı olur** / Aynı olur / Yarısı olur. Dayandığı anlatım: bu sahne 5–6. İpuçları: "Kaldırma kuvveti iki katına çıkar." · "Taşan sıvının ağırlığı, kaldırma kuvvetine eşittir."

Gör: beşinci satır dolar (X sıvısı: dinamometre 1,96 N, kaldırma kuvveti 7,84 N, taşan sıvı 7,84 N); su ile tamamen batmış satırın (0,0004; 3,92) yanında "× 2" (mor, 22 birim) belirir.

### Sahne 5 · Arşimet İlkesi

Tahta: düzenek ve tablo kaybolur (300 ms, `in`). Ortada (x 100–900, y 150–400, 28 birim) kitabın ilke cümlesi 700 ms `out` ile belirir; üstünde "Arşimet İlkesi" (mor, 40 birim, y 110). Başka öğe yok: toplam 23 kelime.

İlke metni: "Bir kısmı veya tamamı durgun sıvıya batan cisme sıvı tarafından uygulanan kaldırma kuvveti, cisim tarafından yeri değiştirilen sıvının ağırlığına eşit büyüklüktedir."

Anlatım:
1. Ölçümlerimiz bir ilkeyi gösteriyor: Arşimet İlkesi.
2. Kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.
3. Cismin bir kısmı da batsa, tamamı da batsa ilke geçerlidir.

### Sahne 6 · İlkeden modele

Tahta: solda dört satır (x 140, y 150, 230, 310, 390; 32 birim; her biri 400 ms `out` ile açılır, yeni satır açılınca öncekiler 0,45 saydamlığa iner): (1) "yeri değişen sıvının hacmi = V_b" ("V_b" açık gri) · (2) "kütlesi: m = d_s · V_b" ("d_s" mavi) · (3) "ağırlığı: G = m · g" ("g" turuncu) · (4) "F_k = V_b · d_s · g" (mor, 44 birim, çerçeveli; 600 ms `out`). Toplam 25 kelime.

Anlatım:
1. İlkeye göre kaldırma kuvveti, yeri değişen sıvının ağırlığıdır.
2. Yeri değişen sıvının hacmi, cismin batan hacmi V_b'dir.
3. Sıvının kütlesi, yoğunluğu ile hacminin çarpımıdır: m = d_s · V_b.
4. Ağırlık, kütle çarpı g'dir: G = m · g.
5. Hepsini birleştirince: F_k = V_b · d_s · g.

Defter ("Arşimet İlkesi"): **F_k = V_b · d_s · g**; hacim ikiye, kuvvet ikiye.

### Sahne 7 · Modelin nicelikleri

Tahta: dört satırlı tablo (x 120–880, y 130; sütunlar "Simge" 140, "Anlamı" 340, "Birimi" 280; 28 birim). Satırlar 400 ms `out` ile sırayla açılır: "F_k · kaldırma kuvveti · N (newton)"; "V_b · batan hacim · m³"; "d_s · sıvının yoğunluğu · kg/m³"; "g · yer çekimi ivmesi · m/s²". 6. cümlede tablonun altında "Modelde cismin ağırlığı yok." (mor, 30 birim, y 400) belirir.

Anlatım:
1. Modelde dört nicelik var; her birinin birimi bellidir.
2. F_k kaldırma kuvvetidir; birimi newton.
3. V_b batan hacimdir; birimi metreküp.
4. d_s sıvının yoğunluğudur; birimi kilogram bölü metreküp.
5. g yer çekimi ivmesidir; birimi metre bölü saniye kare.
6. Modelde cismin ağırlığı yok.

### Sahne 8 · Model veriyle sınanır

Tahta: tablo (x 120–880, y 120; sütunlar "Batan hacim (m³)" 190, "Sıvı" 120, "V_b · d_s · g (N)" 250 mor, "Ölçülen F_k (N)" 200 mor; beş satır, 24 birim). Satırlar 400 ms `out` ile açılır: "0,0001 · su · 0,98 · 0,98"; "0,0002 · su · 1,96 · 1,96"; "0,0003 · su · 2,94 · 2,94"; "0,0004 · su · 3,92 · 3,92"; "0,0004 · X (2d) · 7,84 · 7,84". Son iki sütun arasında "=" (22 birim) belirir.

Anlatım:
1. Su için d_s = 1.000 kg/m³ ve g = 9,8 m/s² alıyoruz.
2. 0,0001 · 1.000 · 9,8 işlemi 0,98 newton verir.
3. Ölçülen değer de 0,98 newton: model tutuyor.
4. Dört satırın hepsinde model ile ölçüm aynı çıkıyor.
5. X sıvısında 2d alınınca 7,84 newton çıkıyor; ölçüm de aynı.
6. Model, ölçüm yapmadan kaldırma kuvvetini önceden söyler.

### Sahne 9 · Cismin ağırlığı modelde yok

Tahta: iki kap yan yana (sol x 90–410, sağ x 590–910; üst kenar y 220, taban y 520; su yüzeyi y = 260, mavi, 0,35 saydamlık). Her kapta tamamen batık cisim (70 × 80; A x 215–285, y 330–410; B x 715–785, y 330–410); cisimlerin üstünde dinamometre gövdesi (60 × 60; y 40–100), ip (y 100–330). Cisimlerin yanında harfler "A", "B". Gövdelerin yanında "havada 9,8 N" ve "havada 7,84 N" (turuncu). 4. cümleden sonra ağırlık okları (turuncu, aşağı; A'da 98, B'de 78 birim; x 320 ve 820) ve kaldırma kuvveti okları (mor, yukarı; ikisinde 39 birim; x 180 ve 680) 400 ms `out` ile belirir; okumalar "5,88 N" ve "3,92 N".

Anlatım:
1. Ela, hacimleri aynı iki cisim seçiyor: A ve B.
2. A'nın ağırlığı 9,8 newton, B'nin ağırlığı 7,84 newton.
3. İkisini de aynı suya tamamen batırıyor.
4. İkisinin de batan hacmi 0,0004 metreküp.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Hangi cisme etki eden kaldırma kuvveti daha büyüktür? **İkisine eşit** / A cismine; daha ağır / B cismine; daha hafif. Dayandığı anlatım: sahne 7, 6; bu sahne 3–4. İpuçları: "Modelde cismin ağırlığı yok." · "İkisinin batan hacmi ve sıvısı aynı."

Gör: oklar belirir; mor oklar eşit boydadır; dinamometre okumaları A'da 5,88 N, B'de 3,92 N.

Sonra:
5. Hacim ve sıvı aynı; kaldırma kuvveti aynı, dinamometre okumaları farklı.
6. Kaldırma kuvveti cismin ağırlığına bağlı değildir.

### Sahne 10 · Dene

Dene 1 (`tag: 'Dene'`; kaydırıcı). Tahta: taşırma düzeneği. Sağda iki denetim (x 640–960): "Batan hacim" kaydırıcısı (y 130; 1, 2, 3, 4 dilim; cisim 300 ms `inOut` ile iner) ve "Sıvı" anahtarı (y 230; "su (d)", "X sıvısı (2d)"). Altta üç canlı sayı (y 340–440): "kaldırma kuvveti" (mor), "taşan suyun ağırlığı" (turuncu) ve "V_b · d_s · g" (mor, model satırı); üçü her ayarda aynı değeri gösterir (örnek veri). Başlangıç: su, iki dilim (1,96 N). Görev (y 60): "Kaldırma kuvvetini iki katına çıkar. Kaç yol bulabilirsin?" İki yol vardır: su ile dört dilim; X sıvısı ile iki dilim (ikisi de 3,92 N). Her yol bulununca kendi satırı belirir; ikisi bulununca geri bildirim: "İkisi de iki katı: batan hacmi ya da sıvının yoğunluğunu iki katına çıkar."

Dene 2 (`tag: 'Dene'`; sınıflandırma). Kutular "Kaldırma kuvvetini değiştirir" / "Kaldırma kuvvetini değiştirmez". Yanlışta ipucu: "Modelde F_k = V_b · d_s · g: bu değişken modelin içinde mi?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Batan hacmi iki katına çıkarmak | değiştirir | Evet. V_b iki katına çıkınca F_k iki katına çıkar. |
| Sıvıyı iki kat yoğun yapmak | değiştirir | Evet. d_s iki katına çıkınca F_k iki katına çıkar. |
| Aynı hacimli cismi daha ağır yapmak | değiştirmez | Evet. Modelde cismin ağırlığı yok. |
| Tamamen batmış cismi daha derine indirmek | değiştirmez | Evet. Derinlik modelde yok. |
| Batan hacmi yarıya indirmek | değiştirir | Evet. V_b yarıya inince F_k yarıya iner. |

Sonra:
1. Kaldırma kuvvetini yalnızca batan hacim, sıvının yoğunluğu ve g değiştirir.

### Çıkış soruları

1. (yeni durum) Bir cisim taşırma kabına batırılınca ağırlığı 3 N olan su taşıyor. Cisme etki eden kaldırma kuvveti kaç N'dur? **3 N** / 6 N / Cismin ağırlığı kadar. (sahne 3, 5)
2. (orantı) Aynı sıvıda bir cismin batan hacmi yarıya iniyor. Kaldırma kuvveti nasıl değişir? **Yarıya iner** / Aynı kalır / İki katına çıkar. (sahne 6, 7)
3. (yanılgı) Hacimleri aynı iki cisimden biri ötekinin iki katı ağırlıkta; ikisi de aynı sıvıya tamamen batırılıyor. Kaldırma kuvvetleri için hangisi doğrudur? **İkisi eşittir** / Ağır olanda iki katıdır / Hafif olanda iki katıdır. (sahne 9)
4. (yeni durum) Aynı cisim önce suya, sonra yoğunluğu suyun yarısı olan bir sıvıya tamamen batırılıyor. İkinci sıvıda kaldırma kuvveti suya göre nasıl olur? **Yarısı olur** / İki katı olur / Aynı olur. (sahne 6, 7)
5. (yeni durum; sıralama) Aynı sıvıda üç cismin batan hacimleri: A cismi 2V, B cismi V, C cismi 3V. Kaldırma kuvvetlerini büyükten küçüğe sıralayın. **C, A, B** / A, B, C / B, A, C. (sahne 6, 7)

Özet: Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir. · Model: F_k = V_b · d_s · g; cismin ağırlığı modelde yoktur. · **Cisim ne kadar sıvıyı yerinden ederse o kadar kaldırılır.**

## D3 · Kaldırma kuvveti nereden gelir?

- **Fikir:** Sıvı, cismin alt yüzeyine üst yüzeyinden daha büyük bir kuvvetle bastırır; kaldırma kuvveti bu farktır. Bu fark, sıvı basıncının modelinden kaldırma kuvvetinin modelini verir.
- **Giriş ekranı sorusu:** Suya batırdığın topu alttan yukarı iten şey nedir?
- **Kaynak:** Ders kitabı s. 176 (giriş: kaldırma kuvveti ile basıncı oluşturan kuvvet arasındaki ilişki), s. 177 (6. Etkinlik adım 4–5: sıvı basıncı ve kaldırma kuvvetinin modellerini karşılaştır, önerme kur; sıvı dolu kapta küpün her yüzeyine basınç okları), s. 179 (tanılayıcı ağaç: alt yüzeydeki basınç üsttekinden büyüktür; yan yüzeylerdeki kuvvetler dengelenir), s. 180 (Görsel 3.23: silindir, taban alanı A, yükseklik h; F₁ = h₁ · d_s · g · A, F₂ = h₂ · d_s · g · A; yan kuvvetler dengelenir; F_k = F₂ − F₁; V_b = h · A; F_k = V_b · d_s · g; derinlikten bağımsızlık), s. 183 ("Kaldırma kuvveti, cismin yüzeylerine etki eden kuvvetlerin bileşkesidir."). F = P · A (s. 150) ve P = h · d · g (s. 149) B konusundandır. Kitap F₁ ve F₂'yi doğrudan yazar; tahtadaki "P₁ = h₁ · d_s · g" ara adımı B'den gelir. Sayılar örnek veridir (karar 19).
- **Sınır:** Karşılaştırma yalnızca sıvılar için; gazlarda kaldırma kuvveti, balon yok. Yan yüzeylerdeki kuvvetlerle işlem yok (yalnızca "eşit ve zıt, dengelenir"). Sayılar gösterilir; öğrenci hesap yapmaz, yalnızca ne artarsa ne olur sorularını yanıtlar (çıkış 1'deki tek çıkarma dışında).
- **Örnek veri (F = h · d_s · g · A ile hesaplandı):** silindirin taban alanı A = 0,01 m², yüksekliği h = 0,04 m (V_b = 0,0004 m³, D1'deki cisim), su d_s = 1.000 kg/m³, g = 9,8 m/s². Üst yüzey h₁ = 0,1 m: P₁ = 0,1 · 1.000 · 9,8 = 980 Pa, F₁ = 980 · 0,01 = 9,8 N; alt yüzey h₂ = 0,14 m: P₂ = 1.372 Pa, F₂ = 13,72 N; F_k = 13,72 − 9,8 = 3,92 N. h₁ = 0,2 m: F₁ = 19,6 N, F₂ = 23,52 N, fark 3,92 N. h₁ = 0,3 m: F₁ = 29,4 N, F₂ = 33,32 N, fark 3,92 N. Kaydırıcı ızgarası (A = 0,01 m²; F = derinlik · 98 N/m): h₁ = 0,1 / 0,2 / 0,3 m için F₁ = 9,8 / 19,6 / 29,4 N; h = 0,02 / 0,04 / 0,06 m için F_k = 1,96 / 3,92 / 5,88 N; F₂ = F₁ + F_k: h₁ 0,1 m → 11,76 · 13,72 · 15,68 N; h₁ 0,2 m → 21,56 · 23,52 · 25,48 N; h₁ 0,3 m → 31,36 · 33,32 · 35,28 N.
- **Güç kavramlar ve gösterimi:** (1) Basınç farkı: kabın duvarında derinlikle uzayan sarı oklar; silindirin üst yüzeyinde kısa, alt yüzeyinde uzun oklar. (2) Kuvvetlerin yönü: F₁ aşağı, F₂ yukarı, ikisi de turuncu; farkı mor ok olarak ayrıca gösterilir. (3) Derinlikten bağımsızlık: silindir iner, iki turuncu ok birlikte uzar, aralarındaki fark (mor ok) aynı boyda kalır. (4) İki modelin yan yana konması: iki kart, ortak simgeler mavi köprüyle bağlanır.
- **Hedeflenen yanılgı:** "Derine inince basınç arttığı için kaldırma kuvveti de artar" ve "yan yüzeylerdeki kuvvetler de cismi yukarı iter".
- **Akılda kalıcı cümle:** Sıvı alttan daha çok bastırır; kaldırma kuvveti bu farktır.

**Silindir düzeneği (D3, `dersler/d-araclar.js`)**

- Kap: x 120–880, üst kenar y 30, taban y 540; su yüzeyi y = 60 (mavi su y 60–540, 0,35 saydamlık). Derinlik ölçeği 1.000 birim = 1 m.
- Silindir: yandan dikdörtgen, 100 × 40 birim (x 450–550; h = 0,04 m), açık gri. Üst yüzeyi y = 60 + 1.000 · h₁ (h₁ = 0,1 m → y 160; alt yüzeyi y 200). Taban alanı etiketi "A" turkuaz.
- Sarı basınç okları: kabın sol iç duvarında 0,1 · 0,2 · 0,3 · 0,4 m derinliklerde (y 160, 260, 360, 460); duvara doğru; uzunluk 1 birim = 20 Pa: 49 · 98 · 147 · 196.
- Kuvvet okları (turuncu): ölçek 8 birim = 1 N (sahne 3–7). Üst yüzeye F₁ aşağı yönlü (9,8 N → 78 birim; kökü y 82, ucu y 160, x 500); alt yüzeye F₂ yukarı yönlü (13,72 N → 110 birim; kökü y 310, ucu y 200, x 500). Fark oku F_k (mor, yukarı, 3,92 N → 31 birim) silindirin sağında x = 600, kökü y 200, ucu y 169. Yan kuvvetler F₃ (sol yüzeyde x 420 → 450) ve F₄ (sağ yüzeyde x 580 → 550), turuncu, 30 birim, y 180. Sahne 8 ve Dene'de ölçek 3 birim = 1 N'dir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Aynı sıvıda bir cismin batan hacmi üç katına çıkıyor. Kaldırma kuvveti nasıl değişir? **Üç katına çıkar** / Aynı kalır / Üçte birine iner. (D2) Yanlışta: "F_k = V_b · d_s · g: batan hacim üç katına çıkarsa kaldırma kuvveti de üç katına çıkar."
2. Durgun suda derinlik iki katına çıkıyor. Basınç nasıl değişir? **İki katına çıkar** / Aynı kalır / Yarıya iner. (B) Yanlışta: "P = h · d · g: derinlik iki katına çıkarsa basınç da iki katına çıkar."

Tahta: birinci soruda iki dilim ve altı dilim batık cisim (D1'in cismi, küçültülmüş); ikinci soruda kapta iki derinlikte sarı oklar (49 ve 98 birim).

Sonra: "Bugün kaldırma kuvvetinin sıvı basıncından nasıl doğduğuna bakacağız."

### Sahne 2 · Sıvı cisme nasıl bastırır?

Tahta: silindir düzeneği (okuma kılavuzu); silindir h₁ = 0,1 m derinlikte. 1. cümlede kap, su ve silindir 500 ms `out` ile belirir; silindirin her yüzeyinde küçük sarı oklar (üst yüzeyde üç ok 14 birim aşağı yönlü, alt yüzeyde üç ok 20 birim yukarı yönlü, her yan yüzeyde iki ok 17 birim) 400 ms `out`. 2. cümlede duvar okları sırayla (200 ms arayla, her biri 400 ms `out`) belirir. 3. cümlede silindirin üst ve alt yüzeylerinden sol duvara açık gri kesikli çizgiler (y 160 ve y 200) 400 ms `out` ile çizilir; yanlarında "üst yüzey" ve "alt yüzey" (açık gri, 22 birim). 4. cümlede alt yüzeydeki oklar 600 ms `inOut` ile parlaklaşır (0,5 → 1 saydamlık); yanında "daha büyük" (sarı, 22 birim).

Anlatım:
1. Sıvı, içindeki cismin her yüzeyine basınç uygular.
2. Sıvının basıncı derinlikle artar: duvardaki oklar uzuyor.
3. Cismin alt yüzeyi, üst yüzeyinden daha derindedir.
4. Bu yüzden alt yüzeye daha büyük basınç etki eder.

### Sahne 3 · Üst yüzey

Tahta: silindir ve duvar okları (duvar okları 0,35 saydamlığa iner). 1. cümlede silindirin tabanında "A" (turkuaz) ve sağında yükseklik ölçüsü "h" (açık gri; dikey çizgi x 580, y 160–200) belirir. 2. cümlede su yüzeyinden silindirin üstüne kesikli dikey çizgi (x 420, y 60–160) ve etiketi "h₁"; alt yüzeye (x 400, y 60–200) "h₂" (açık gri). 3. cümlede sağ üstte (x 620, y 120) "F = P · A" (28 birim) belirir; 4. cümlede "F = P · A" kaybolur (300 ms, `in`), yerine "P₁ = h₁ · d_s · g" (y 120) gelir. 5. cümlede altında (y 170) "F₁ = h₁ · d_s · g · A" belirir ve silindirin üstünde turuncu F₁ oku (78 birim) 500 ms `out` ile aşağı doğru uzar.

Anlatım:
1. Silindirin taban alanı A, yüksekliği h olsun.
2. Üst yüzey su yüzeyinin h₁ altında; alt yüzey h₂ altında.
3. Basınçtan kuvvete geçelim: F = P · A.
4. Üst yüzeydeki basınç P₁ = h₁ · d_s · g'dir.
5. F₁ = h₁ · d_s · g · A; aşağı yönlü.

### Sahne 4 · Alt yüzey

Tahta: sahne 3'ün çizimi; "P₁" satırı kaybolur, "F₁ = h₁ · d_s · g · A" (y 120) kalır. 1. cümlede alt yüzeyin altında (y 250) "P₂ = h₂ · d_s · g" belirir ve 2. cümlede kaybolur; yerine (y 170) "F₂ = h₂ · d_s · g · A" belirir; silindirin altında turuncu F₂ oku (110 birim) 500 ms `out` ile yukarı doğru uzar. Soruda "?" yanıp söner. Sorudan sonra (y 220) "F₂ > F₁" (30 birim) belirir ve ikisinin farkını gösteren mor ok (31 birim, x 600) 500 ms `out` ile çıkar.

Anlatım:
1. Alt yüzeydeki basınç P₂ = h₂ · d_s · g'dir.
2. F₂ = h₂ · d_s · g · A; yukarı yönlü.
3. h₂, h₁'den büyüktür.

Soru (`tag: 'Sıra sende'`): F₂ ile F₁ nasıl karşılaştırılır? **F₂ daha büyüktür; alt yüzey daha derindedir** / F₁ daha büyüktür / İkisi eşittir. Dayandığı anlatım: sahne 2, 2–4; bu sahne 1–3. İpuçları: "Basınç derinlikle artar." · "Alt yüzey, üst yüzeyden daha derinde."

Sonra:
4. F₂, F₁'den büyüktür; bileşkeleri yukarı yönlüdür.
5. Bu yukarı yönlü fark, kaldırma kuvvetidir.

### Sahne 5 · Yan yüzeyler

Tahta: silindir ve okları (F₁, F₂ 0,35 saydamlıkta). 2. cümlede silindirin sol ve sağ yüzeyinde F₃ ve F₄ oku (turuncu, 30 birim) 400 ms `out` ile belirir; yanlarında "F₃" ve "F₄". Birlikte çöz'den sonra iki ok 600 ms `inOut` ile silindirin ortasında birleşir gibi 0,35 saydamlığa iner ve silindirin yanında "dengelenir" (22 birim, açık gri) belirir.

Anlatım:
1. Aynı derinlikteki noktalarda basınç eşittir.
2. Silindirin sol ve sağ yüzeylerinde F₃ ve F₄ etki eder.
3. İkisi aynı derinliktedir: büyüklükleri eşit, yönleri zıttır.

Birlikte çöz (`tag: 'Birlikte çöz'`; hedeflenen yanılgı): F₃ ve F₄'ün bileşkesi nedir? **Sıfırdır; birbirini dengeler** / Cismi sağa iter / Cismi yukarı iter. Dayandığı anlatım: bu sahne 1–3. İpuçları: "Eşit büyüklükte ve zıt yönlü iki kuvvet birbirini götürür." · "Yatay kuvvetler cismi yukarı itemez."

Sonra:
4. Yan kuvvetler dengelenir; alt ve üst kuvvetler kalır.

### Sahne 6 · Bileşke (sayılarla)

Tahta: silindir ve kuvvet okları (ölçek 8 birim = 1 N, F₃ ve F₄ yok). Sağda (x 620–960) etiketler, her biri 300 ms `out` ile açılır: 1. cümlede "A = 0,01 m²" ve "h = 0,04 m"; 2. cümlede "P₁ 980 Pa"; 3. cümlede "F₁ 9,8 N" (turuncu; F₁ oku 78 birim uzar); 4. cümlede "P₂ 1.372 Pa"; 5. cümlede "F₂ 13,72 N" (turuncu; F₂ oku 110 birim uzar); 6. cümlede mor F_k oku (31 birim) 500 ms `out` ile çıkar ve yanında "F_k 3,92 N" (mor) belirir. Toplam 23 kelime.

Anlatım:
1. Ela'nın silindirinde A = 0,01 metrekare, h = 0,04 metre.
2. Üst yüzey 0,1 metre derinde: basınç 980 pascal.
3. Su, üst yüzeyi 9,8 newtonluk kuvvetle aşağı itiyor.
4. Alt yüzey 0,14 metre derinde: basınç 1.372 pascal.
5. Su, alt yüzeyi 13,72 newtonluk kuvvetle yukarı itiyor.
6. Yukarı kuvvet aşağı kuvvetten büyüktür; fark kaldırma kuvvetidir.

Sonra:
7. F_k = F₂ − F₁ = 13,72 − 9,8 = 3,92 newton.

Not (ana oturum, 12 Ekim 2026): bu sahnede çarpma anlatılmaz ve öğrenciye hesap yaptırılmaz; sayılar benzetimin gösterdiği değerlerdir (F = P·A ile hesaplandı: 980 · 0,01 = 9,8; 1.372 · 0,01 = 13,72). Program modeli orantısal ilişkilerle sınırlar; sahnenin işi, farkın D1'de ölçülen 3,92 N ile aynı çıktığını göstermektir.
8. Hacim 0,0004 metreküp; ilk deneydeki sonuçla aynı.

### Sahne 7 · Modele ulaşmak

Tahta: silindir ve oklar sola alınır (400 ms, `inOut`; 0,6 ölçek, x 60–380; F₁, F₂ ve F_k okları kalır). Sağda (x 420–960, y 150 ve 230; 30 birim) en çok iki satır bulunur; yeni satır gelince eski satırlar 300 ms `in` ile kaybolur, satırlar 400 ms `out` ile açılır: (a) 1. cümlede "F_k = F₂ − F₁" · (b) 3. cümlede "F_k = (h₂ − h₁) · d_s · g · A" · (c) 4. cümlede "h = h₂ − h₁" (b ile birlikte) · (d) 5. cümlede "F_k = h · d_s · g · A" · (e) 6. cümlede "V_b = h · A" (d ile birlikte) · (f) 7. cümlede "F_k = V_b · d_s · g" (mor, 40 birim, çerçeveli; 600 ms `out`; (d) kalır).

Anlatım:
1. Kaldırma kuvveti, F₂ ile F₁ arasındaki farktır.
2. Değerleri yerine koyalım.
3. F_k = (h₂ − h₁) · d_s · g · A
4. h₂ − h₁ farkı, silindirin yüksekliği h'dir.
5. Böylece F_k = h · d_s · g · A olur.
6. h · A çarpımı, cismin batan hacmi V_b'dir.
7. Sonuç: F_k = V_b · d_s · g.
8. Aynı model, taşan suyun ağırlığından da çıkmıştı.

### Sahne 8 · Derinlik

Tahta: silindir düzeneği (okuma kılavuzu), ok ölçeği 3 birim = 1 N; silindir h₁ = 0,1 m'de (F₁ oku 29, F₂ oku 41, mor fark oku 12 birim). Silindir ve oklar sırayla 700 ms `inOut` ile 100 birim aşağı iner (h₁ 0,2 m, sonra 0,3 m); oklar 700 ms'de `inOut` ile uzar: F₁ 59 → 88, F₂ 71 → 100 birim; mor fark oku 12 birimde kalır. Sağda etiketler: "F₁ 19,6 N", "F₂ 23,52 N", "F₂ − F₁ = 3,92 N"; ikinci iniş sonrası "F₁ 29,4 N", "F₂ 33,32 N", "F₂ − F₁ = 3,92 N" (etiketler 300 ms `out`; eskiler kaybolur).

Anlatım:
1. Silindiri 0,2 metre derine indiriyoruz: F₁ ve F₂ ikisi de büyür.
2. F₁ = 19,6 newton; F₂ = 23,52 newton oldu.
3. Fark yine 3,92 newton: 23,52 eksi 19,6.
4. 0,3 metrede F₁ 29,4, F₂ 33,32 newton; fark yine 3,92.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Silindir daha derine indirilirse F₂ ile F₁ arasındaki fark ne olur? **Değişmez** / Artar / Azalır. Dayandığı anlatım: bu sahne 1–4. İpuçları: "Her iki kuvvet de aynı miktar büyüyor." · "Farkı hesapladığımız satırlara bak: hep 3,92 newton."

Gör: üç konumda da mor fark oku 12 birimde, etiket "3,92 N"de kalır.

Sonra:
5. Derinlik arttıkça iki kuvvet büyür, ama farkları değişmez.
6. Bu yüzden tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.

### Sahne 9 · İki model yan yana

Tahta: iki kart (y 140–280): sol x 80–470 başlık "Sıvı basıncı" (sarı, 32 birim) ve altında "P = h · d · g" (sarı, 44 birim); sağ x 530–920 başlık "Kaldırma kuvveti" (mor) ve altında "F_k = V_b · d_s · g" (mor, 44 birim). 1. cümlede sol, 2. cümlede sağ kart 500 ms `out` ile belirir. 3. cümlede iki karttaki "d" ile "d_s" ve "g" ile "g" mavi vurgulanır (0 → 1 saydamlık, 400 ms) ve aralarında mavi köprü çizgisi (y 320 ve y 360; 400 ms, `out`) çizilir. 4. cümlede soldaki "h" sarı, sağdaki "V_b" mor çerçevelenir. 5. cümlede iki köprüde "d" ve "g" mavi yanıp söner (iki kez, 200 ms açık/kapalı). 6. cümlede ek görsel yok.

Anlatım:
1. Sıvı basıncının modeli: P = h · d · g.
2. Kaldırma kuvvetinin modeli: F_k = V_b · d_s · g.
3. İkisinde de sıvının yoğunluğu ve yer çekimi ivmesi var.
4. Basınçta derinlik h, kaldırma kuvvetinde batan hacim V_b var.
5. Sıvının yoğunluğu iki katına çıkarsa ikisi de iki katına çıkar.
6. Çünkü kaldırma kuvveti, sıvı basıncından doğar.

Soru (`tag: 'Sıra sende'`; yeni durum): Sıvının yoğunluğu yarıya iniyor. Aynı derinlikteki basınç ve aynı cisme etki eden kaldırma kuvveti nasıl değişir? **İkisi de yarıya iner** / Basınç yarıya iner, kaldırma kuvveti aynı kalır / İkisi de aynı kalır. Dayandığı anlatım: bu sahne 1–5. İpuçları: "Yoğunluk iki modelin de içinde." · "Yoğunluk yarıya inince iki model de yarıya iner."

Defter ("Kaldırma kuvveti ve basınç"): **F_k = F₂ − F₁**; alt yüzeyde basınç büyüktür.

### Sahne 10 · Dene

Dene 1 (`tag: 'Dene'`; kaydırıcı). Tahta: silindir düzeneği, ok ölçeği 3 birim = 1 N. Sağda iki kaydırıcı (x 640–960): "h₁ (derinlik)" (y 130; 0,1 · 0,2 · 0,3 m; silindir 300 ms `inOut` ile iner) ve "h (silindirin yüksekliği)" (y 230; 0,02 · 0,04 · 0,06 m; silindir boyu 300 ms `inOut` ile değişir). Altta üç canlı sayı (y 340–440): "F₁" ve "F₂" (turuncu) ile "F₂ − F₁" (mor); değerler okuma kılavuzundaki ızgaradandır. Görev (y 60): "F₂ − F₁ farkını değiştiren kaydırıcıyı bul." Her kaydırıcı denenince geri bildirim: h₁ için "F₁ ve F₂ değişti, farkları değişmedi."; h için "Fark değişti: yükseklik arttıkça kaldırma kuvveti arttı." İkisi denenince: "Kaldırma kuvveti silindirin yüksekliğine, yani batan hacmine bağlı; derinliğe bağlı değil."

Dene 2 (`tag: 'Dene'`; önerme). Kutular "Doğru" / "Yanlış". Kart başına önerme gösterilir; yanlışta ipucu: "Silindirin alt ve üst yüzeyine etki eden kuvvetlere bak."

| Kart (önerme) | Kutu | Doğru geri bildirimi |
|---|---|---|
| Alt yüzeydeki basınç, üst yüzeydeki basınçtan büyüktür. | Doğru | Evet. Alt yüzey daha derinde. |
| Kaldırma kuvveti, alt ve üst yüzeylere etki eden kuvvetlerin farkından doğar. | Doğru | Evet. F_k = F₂ − F₁. |
| Yan yüzeylere etki eden kuvvetler cismi yukarı iter. | Yanlış | Yan kuvvetler eşit ve zıt: dengelenir. |
| Cisim derine inince alt ve üst kuvvetlerin farkı artar. | Yanlış | Fark aynı kalır: h₂ − h₁ = h. |

### Çıkış soruları

1. (yeni durum) Sıvıdaki bir cismin alt yüzeyine etki eden kuvvet 12 N, üst yüzeyine etki eden kuvvet 9 N. Kaldırma kuvveti kaç N'dur? **3 N** / 21 N / 9 N. (sahne 7)
2. (yanılgı) Sıvıdaki bir cismin yan yüzeylerine etki eden kuvvetler için hangisi doğrudur? **Eşit ve zıt yönlüdür; birbirini dengeler** / Cismi yukarı iter / Cismi aşağı çeker. (sahne 5)
3. (yeni durum) Tamamen batmış bir cisim daha derine indiriliyor. Alt ve üst yüzeylere etki eden kuvvetler nasıl değişir? **İkisi de artar; farkları değişmez** / İkisi de artar; fark da artar / İkisi de değişmez. (sahne 8)
4. (yeni durum) Aynı silindir önce suya, sonra yoğunluğu suyun iki katı olan bir sıvıya tamamen batırılıyor. Alt ve üst yüzeydeki kuvvetlerin farkı nasıl değişir? **İki katına çıkar** / Aynı kalır / Yarıya iner. (sahne 9)
5. Kaldırma kuvvetinin yönü yukarıdır. Bunun nedeni hangisidir? **Alt yüzeydeki basınç daha büyüktür** / Üst yüzeyin alanı daha geniştir / Yan yüzeylerdeki kuvvet daha büyüktür. (sahne 4, 7)

Özet: Sıvı alt yüzeye üst yüzeyden daha büyük kuvvetle bastırır. · Yan yüzeylerdeki kuvvetler dengelenir; kaldırma kuvveti alt ve üst kuvvetlerin farkıdır: F_k = V_b · d_s · g. · **Sıvı alttan daha çok bastırır; kaldırma kuvveti bu farktır.**

## D4 · Gemi, denizaltı, çöp adası

- **Fikir:** Arşimet İlkesi, gemilerin, denizaltıların ve yüzen plastik atıkların davranışını açıklar.
- **Giriş ekranı sorusu:** Çelik bir çivi batarken binlerce ton çelikten yapılmış gemi nasıl yüzer?
- **Kaynak:** Ders kitabı s. 169 (denizaltı ve safra tankları: dalmak için tanklara su alınır, yoğunluk artar; yükselmek için hava pompalanır, yoğunluk azalır), s. 173 (Görsel 3.19; özdeş yüklü ve boş gemi), s. 174 (top ve tuzlu su), s. 175 (çelik gemi çoğunlukla havayla doludur, ortalama yoğunluğu suyunkinden küçüktür; 1–2–3 numaralı özdeş gemiler), s. 177–178 (TCG Anadolu (L-400) çok amaçlı amfibi hücum gemisi, TCG İstanbul (F-515) İ sınıfı fırkateyn, ADA sınıfı korvetler, Yeni Tip Denizaltı Projesi, Gölcük Tersanesi; çöp adaları: yılda yaklaşık bir trilyon plastik poşet, adalar Türkiye'nin yüz ölçümünden büyük; üç öneri), s. 180 (Arşimet İlkesi), s. 181 (yüzme, askıda kalma, batma; çelik bilye ve gemi), s. 182 (turistik denizaltı 30 m, araştırma denizaltısı 3.000 m), s. 183 (özet tablo: yüzme F_k = G, d_c < d_s; askıda kalma F_k = G, d_c = d_s; batma F_k < G, d_c > d_s). Kitap dışı: plastiğin yüzeyde toplanması fikri (`PLAN.md` bölüm 8, son paragraf).
- **Sınır:** Yüzme, askıda kalma, batma kitabın verdiği kadar (yoğunluk karşılaştırması ve F_k ile G ilişkisi); bunlara dair problem yok. Tonaj, boyut, yıl yok (karar 12). Gaz ortamı, balon, zeplin yok. Denizaltının gövde malzemesi yok (kitap açıklamıyor). Plastiğin yoğunluğu için sayı yok. Dalış derinlikleri kitaptaki iki sayıdır.
- **Güç kavramlar ve gösterimi:** (1) Ortalama yoğunluk: aynı çelik bilye kalıbından geniş, içi boş bir kaba dönüşür; kütle aynı (etiket), cismin tüm hacmini gösteren kesikli dış çizgi büyür. (2) Yüzme, askıda kalma, batma: üç kapta yan yana turuncu ağırlık oku ve mor kaldırma kuvveti oku; ilk ikisinde eşit boy, üçüncüde kaldırma oku kısa. (3) Yüzen cisim kendi ağırlığı kadar sıvıyı yerinden eder: cismin batan kısmı kadar mavi kesikli parça yanında aynı boyda turuncu ok. (4) Safra tankı: denizaltı kesitinde tank mavi (su) ya da soluk gri-mavi (hava) dolgu.
- **Hedeflenen yanılgı:** "Çelik her zaman batar" ve "yük artınca kaldırma kuvveti değişmez".
- **Akılda kalıcı cümle:** Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Sıvıdaki bir cisme etki eden kaldırma kuvveti nereden doğar? **Alt ve üst yüzeylere etki eden kuvvetlerin farkından** / Yan yüzeylere etki eden kuvvetlerden / Cismin kendi ağırlığından. (D3) Yanlışta: "F_k = F₂ − F₁: alt yüzeye üsttekinden büyük kuvvet etki eder."
2. Arşimet İlkesi'ne göre kaldırma kuvveti neye eşittir? **Yeri değişen sıvının ağırlığına** / Cismin ağırlığına / Cismin hacmine. (D2) Yanlışta: "Kaldırma kuvveti, cismin yerini değiştirdiği sıvının ağırlığına eşittir."

Tahta: birinci soruda silindir ve F₁, F₂ okları (D3 sahne 4'ün son karesi, küçültülmüş); ikinci soruda taşırma kabı ve taşan su (D2 sahne 3'ün son karesi, küçültülmüş).

Sonra: "Bugün bu ilkenin gemilerde, denizaltılarda ve çöp adalarında nasıl çalıştığına bakacağız."

### Sahne 2 · Çelik bilye ve gemi

Tahta (a) (1.–3. cümle): solda kap (x 60–460, su yüzeyi y = 200, taban y = 500; mavi su) ve içinde çelik bilye (daire r 30, açık gri); sağda kap (x 540–940, aynı seviyeler) ve içinde gemi (yandan görünüş: gövde yamuk, üstte 240 geniş x 620–860, altta 180 geniş, 70 yüksek; alt kenarı su yüzeyinin 30 birim altında, y 230; içinde soluk gri-mavi hava boşluğu, x 650–830, y 170–215). Etiketler "bilye", "gemi" (22 birim). 1. cümlede kap ve bilye 500 ms `out` ile belirir, bilye su yüzeyinden y 130'dan tabana (merkez y 470) 900 ms `in` ile düşer; 2. cümlede sağ kap ve gemi belirir, gemi 700 ms `out` ile y 130'dan yerine oturur; 3. cümlede hava boşluğu 400 ms `out` ile belirir ve yanında "hava" (soluk gri-mavi, 22 birim).

Anlatım (a):
1. İçi dolu çelik bir bilye suya bırakılınca dibe batar.
2. Çelikten yapılmış devasa gemiler ise yüklerle birlikte yüzer.
3. Çelik bir gemi çoğunlukla havayla doludur.

Tahta (b) (4.–9. cümle): kaplar kaybolur (300 ms, `in`). Solda çelik blok (60 × 60, x 120–180, y 300–360, açık gri); 6. cümlede blok 900 ms `inOut` ile ortada (x 300–500, y 320–360) üstü açık geniş bir kaba dönüşür; çevresinde cismin tüm hacmini gösteren kesikli dış çizgi (x 300–500, y 290–360) 600 ms `out` ile belirir. Altta üç yazı: "kütle aynı" (6. cümlede), "hacim artar" (7. cümlede), "ortalama yoğunluk azalır" (7. cümlede), 22 birim. 5. cümlede üstte "ortalama yoğunluk = kütle / hacim" (28 birim) belirir.

Anlatım (b):
4. Gemi ve içindeki hava birlikte tek bir cisim sayılır.
5. Ortalama yoğunluk, toplam kütlenin toplam hacme bölümüdür.
6. Aynı çelik geniş ve içi boş yapılırsa kütle aynı kalır.

Birlikte çöz (`tag: 'Birlikte çöz'`): bir geminin kütlesi aynı kalırken hacmi iki katına çıkıyor. Ortalama yoğunluğu nasıl değişir? **Yarıya iner** / İki katına çıkar / Değişmez. Dayandığı anlatım: 5–6. İpuçları: "Yoğunluk, kütlenin hacme bölümüdür." · "Kütle aynı, hacim iki katı: bölüm yarıya iner."

Sonra:
7. Hacim artar; ortalama yoğunluk azalır.
8. Ortalama yoğunluk suyunkinden küçükse gemi yüzer.
9. Gemi su alırsa havanın yerine su girer; yoğunluk artar, gemi batar.

### Sahne 3 · Yüzme, askıda kalma, batma

Tahta: üç kap yan yana (x 40–320, 360–640, 680–960; üst kenar y 140, su yüzeyi y = 190, taban y = 440; mavi su). Cisimler 70 × 70, açık gri: yüzen (x 145–215, y 155–225; 35 birim batık), askıda (x 465–535, y 265–335), batan (x 785–855, y 370–440; tabanda). Kaplar 1. cümlede 500 ms `out` ile belirir; cisimler 2. cümleden itibaren sırayla, her biri 700 ms `inOut` ile yerine gider (yüzen cisim y 120'den, askıda cisim y 120'den, batan cisim y 120'den). Her cisimde ağırlık oku (turuncu, aşağı, 80 birim; cismin merkezinden x + 20) ve kaldırma kuvveti oku (mor, yukarı; yüzen ve askıda 80, batan 50 birim; x − 20) cisim yerine oturunca 400 ms `out` ile belirir. Kapların altında (y 480, 510, 540; 22 birim): "yüzer" · "askıda kalır" · "batar"; altında "d_c < d_s" · "d_c = d_s" · "d_c > d_s"; en altta "F_k = G" · "F_k = G" · "F_k < G". İlk cismin yanında "G" ve "F_k". Toplam 24 kelime.

Anlatım:
1. Sıvıya tamamen batırılıp bırakılan cisim üç şeyden birini yapar.
2. Cismin yoğunluğuna d_c, sıvının yoğunluğuna d_s diyelim.
3. Yoğunluğu sıvınınkinden küçük cisim yüzeye çıkar ve yüzer.
4. Yüzen cisimde kaldırma kuvveti ile ağırlık eşittir.
5. Yoğunluğu sıvınınkine eşit cisim, bırakıldığı yerde askıda kalır.
6. Askıda kalan cisimde de kaldırma kuvveti ağırlığa eşittir.
7. Yoğunluğu sıvınınkinden büyük cisim kap tabanına batar.
8. Batan cisimde kaldırma kuvveti ağırlıktan küçüktür.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir cisim sıvıya bırakılınca kap tabanına batıyor. Kaldırma kuvveti ve yoğunluk için ne söylenebilir? **Kaldırma kuvveti ağırlıktan küçüktür; d_c > d_s** / Kaldırma kuvveti ağırlığa eşittir; d_c = d_s / Kaldırma kuvveti ağırlıktan büyüktür; d_c < d_s. Dayandığı anlatım: 7–8. İpuçları: "Tabana batan cismin yoğunluğu sıvınınkinden büyüktür." · "Batan cisimde kaldırma kuvveti ağırlığı dengeleyemez."

Gör: üç kap küçülüp sola kayar (500 ms, `inOut`); yüzen cismin batan kısmı kadar mavi kesikli parça (70 × 35) cismin yanına çıkar; yanında turuncu ok (80 birim) ve "= G" (turuncu, 28 birim).

Sonra:
9. Yüzen cismin kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.
10. Demek ki yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.

### Sahne 4 · Yüklü ve boş gemi

Tahta: üç özdeş gemi (merkezler x 170, 500, 830; gövde 200 geniş, 100 yüksek, yandan görünüş; su yüzeyi y = 300, mavi su y 300–520). Batan derinlik gemi 1'de 20, gemi 2'de 40, gemi 3'te 60 birimdir (gövdenin alt kenarı y 320, 340, 360). Güvertede 0, 2 ve 4 konteyner kutusu (30 × 20). Her gemide ağırlık oku (turuncu, aşağı; x merkez + 25) ve kaldırma kuvveti oku (mor, yukarı; x merkez − 25), ikisi eşit boyda: 40, 70, 100 birim; kökleri su yüzeyinde (y 300). Altta "1", "2", "3" (y 540, 28 birim). Gemiler 1. cümlede 500 ms `out` ile belirir; yükler ve okları 2.–5. cümlelerde sırayla belirir (400 ms, `out`). Sağ üstte okların açıklaması: "ağırlık" (turuncu), "kaldırma kuvveti" (mor).

Anlatım:
1. Özdeş üç gemiden 1 numara boş, 3 numara en çok yüklü.
2. Yük arttıkça gemi daha derine batar.
3. Daha derine batan geminin batan hacmi daha büyüktür.
4. Batan hacim büyüdükçe kaldırma kuvveti artar.
5. Her gemide kaldırma kuvveti, geminin ağırlığına eşittir.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Bir gemiye yük yükleniyor ve gemi biraz daha derine batıyor. Kaldırma kuvveti nasıl değişir? **Artar; geminin yeni ağırlığına eşit olur** / Aynı kalır / Azalır. Dayandığı anlatım: 1–5. İpuçları: "Daha derine batan geminin batan hacmi artar." · "Yüzen gemide kaldırma kuvveti ağırlığa eşittir."

Gör: gemi 2 yeniden 3'ün yüküyle yüklenir: 4 kutu, 600 ms `inOut` ile 20 birim batar; oklar 70'ten 100 birime uzar.

### Sahne 5 · Top ve tuzlu su

Tahta: iki kap (x 80–440 ve x 560–920; su yüzeyi y = 280, taban y = 500; sağ kapta tuzlu su, 0,6 saydamlık). Her kapta top (daire r 36, açık gri): solda 40 birim batık (merkez y 284), sağda 28 birim batık (merkez y 272). Her topta ağırlık oku (turuncu, aşağı, 60 birim; x + 25) ve kaldırma kuvveti oku (mor, yukarı, 60 birim; x − 25). Altında "su" ve "tuzlu su" (22 birim, y 530), üstünde iki "F_k = G" (y 150). Birlikte çöz'de kapların arasında üç satır (x 380–620, y 320–420; 22 birim) belirir: "kaldırma kuvveti: aynı" · "sıvının yoğunluğu: arttı" · "batan hacim: ?". Cevaptan sonra "?" yerine "azaldı" yazılır.

Anlatım:
1. Top, suda yüzüyor: kaldırma kuvveti ağırlığına eşit.
2. Tuzlu suda da yüzüyor; kaldırma kuvveti yine ağırlığına eşit.
3. Ağırlık aynı kaldığı için kaldırma kuvveti de aynı kalır.

Birlikte çöz (`tag: 'Birlikte çöz'`): top tuzlu suda su yüzeyine daha yakın yüzer. Batan hacmi nasıl değişmiştir? **Azalmıştır** / Artmıştır / Değişmemiştir. Dayandığı anlatım: bu sahne 1–3; D1 sahne 5, 3; D2 sahne 6, 5. İpuçları: "F_k = V_b · d_s · g ve F_k aynı kalıyor." · "d_s arttı; çarpımın aynı kalması için V_b ne olmalı?"

Sonra:
4. Sıvı daha yoğunsa aynı kaldırma kuvveti için daha az hacim yeter.
5. Yüzen cisimde sıvının yoğunluğu arttıkça batan hacim azalır.

### Sahne 6 · Denizaltı

Tahta: su yüzeyi y = 200 (mavi su y 200–540). Denizaltı yandan kesit: kapsül gövde 400 × 60 (x 300–700, uçları yuvarlak), üstünde kule 50 × 30 (x 475–525); gövde içinde iki safra tankı (100 × 40; x 330–430 ve x 570–670; gövdenin alt yarısında). Başlangıç: gövde y 170–230 (yarı batık), tanklar hava (soluk gri-mavi). 1. cümlede denizaltı 500 ms `out` ile belirir, tanklardan birine "safra tankı" (açık gri, 22 birim) işaretçisi (kısa çizgi) bağlanır. 2. cümlede tanklar alttan yukarı 700 ms `inOut` ile mavi su dolgusuyla dolar; 3. cümlede denizaltı 1.000 ms `inOut` ile 150 birim iner (gövde y 320–380). 4. cümlede tanklarda su dolgusu 700 ms `inOut` ile azalır (alttan boşalır, yerine soluk gri-mavi hava); 5. cümlede denizaltı 1.000 ms `inOut` ile yüzeye çıkar (y 170–230). Tankların yanında içerdiğine göre "su" ya da "hava" (22 birim) yazısı belirir.

Anlatım:
1. Denizaltılarda safra tankları bulunur; içlerinde hava ve su vardır.
2. Dalmak için safra tanklarına su alınır.
3. Tanklara su girince denizaltının yoğunluğu artar; denizaltı batar.
4. Yükselmek için tanklardaki su boşaltılıp hava pompalanır.
5. Tanklar havayla dolunca yoğunluk azalır; denizaltı yüzeye çıkar.
6. Denizaltı, yoğunluğunu ayarlayarak yüzer, askıda kalır ya da batar.

Soru (`tag: 'Sıra sende'`; yeni durum): Yüzeydeki bir denizaltı dalmak istiyor. Safra tanklarıyla ne yapmalıdır? **Tanklara su almalı; yoğunluğu artar** / Tanklara hava pompalamalı / Tankları boş bırakmalı. Dayandığı anlatım: 2–3. İpuçları: "Batmak için yoğunluk artmalı." · "Tanka su girince yoğunluk artar."

### Sahne 7 · Derin dalış

Tahta: dikey su sütunu (x 120–880, su yüzeyi y = 90, taban y = 540; mavi su). İki denizaltı (küçültülmüş, 0,6 ölçek): solda turistik (x 220–400, merkez y 170), sağda araştırma (x 600–780, merkez y 470). Yanlarında derinlik etiketleri "30 m" ve "3.000 m" (turuncu değil; açık gri, 24 birim) ve "turistik", "araştırma" (22 birim). Her denizaltının üstünde kendi gövdesine inen sarı basınç okları (üç ok): solda 12 birim, sağda 160 birim (oklar şematiktir; oran yazıyla verilir). Denizaltılar 500 ms `out`, oklar 400 ms `out` ile belirir.

Anlatım:
1. Turistik denizaltı genellikle 30 metre derinliğe iner.
2. Araştırma denizaltısı 3.000 metre derinliğe kadar inebilir.
3. Sıvı basıncı derinlikle artar; iki denizaltı da bunun etkisindedir.
4. Basınç derinlikle orantılıdır: P = h · d · g.
5. Araştırma denizaltısının gövdesi çok daha büyük basınca dayanmalıdır.

Soru (`tag: 'Sıra sende'`; yeni durum): 3.000 metre derinlikte araştırma denizaltısına etki eden sıvı basıncı, 30 metredeki turistik denizaltıya etki edenin kaç katıdır? **100 katı** / 10 katı / Aynıdır. Dayandığı anlatım: 1–4. İpuçları: "Derinlik kaç katına çıkarsa basınç da o kadar katına çıkar." · "3.000 metre, 30 metrenin kaç katıdır?"

### Sahne 8 · Türkiye'nin deniz araçları

Tahta: dört kart, 2 × 2 (x 60–480 ve 520–940; y 120–260 ve 290–430), her kartın solunda çizgi silüet (açık gri; gemiler su çizgisi üstünde, denizaltı su çizgisi altında, 120 birim geniş), sağında ad (22 birim): "TCG Anadolu (L-400) çok amaçlı amfibi hücum gemisi" · "TCG İstanbul (F-515) İ sınıfı fırkateyn" · "ADA sınıfı korvetler" · "Yeni Tip Denizaltı Projesi". Kartlar 3.–6. cümlelerde sırayla 400 ms `out` ile belirir; 6. cümlede denizaltı kartında "Gölcük Tersanesi" (22 birim) eklenir. Toplam 23 kelime.

Anlatım:
1. Türkiye, millî çıkarları doğrultusunda kendi deniz araçlarını geliştiriyor.
2. Bu yatırımlar ekonomik kalkınma ve tasarruf stratejilerinin parçasıdır.
3. TCG Anadolu, çok amaçlı amfibi hücum gemisidir.
4. TCG İstanbul, İ sınıfı bir fırkateyndir.
5. ADA sınıfı korvetler de Deniz Kuvvetlerine teslim edildi.
6. Yeni Tip Denizaltı Projesi, Gölcük Tersanesi'nde yerli imkânlarla sürüyor.

Sonra:
7. Gemiler, ortalama yoğunlukları suyunkinden küçük olduğu için yüzer.
8. Denizaltı, yoğunluğunu safra tanklarıyla ayarlar.

### Sahne 9 · Çöp adaları

Tahta: su yüzeyi y = 300 (mavi su y 300–540). 1. cümlede yüzeyde on dört küçük plastik parça (24–40 birim, açık gri; x 150–850 arasında dağınık, y 285–300) 100 ms arayla, her biri 300 ms `out` ile belirir. 2. cümlede parçalar x 500 çevresine 800 ms `inOut` ile kümelenir (küme x 380–620, y 275–300). Üstte "her yıl yaklaşık bir trilyon plastik poşet" (24 birim, y 80, 1. cümlede) ve 3. cümlede "Türkiye'nin yüz ölçümünden büyük" (24 birim, y 130). 4. cümlede kümeden bir parça seçilir (parlaklık 0,5 → 1, 300 ms) ve yanında turuncu ağırlık oku (aşağı, 40 birim) ile mor kaldırma kuvveti oku (yukarı, 40 birim) 400 ms `out` ile belirir; "F_k = G" (28 birim). 6. cümlede küme üstünde gri bir toplama ağı (kesikli yay, x 330–670, y 250–300) 500 ms `out` ile belirir.

Anlatım:
1. Her yıl yaklaşık bir trilyon plastik poşet çöpe atılıyor.
2. Bu atıklar okyanuslarda rüzgârla ve akıntılarla birleşip çöp adaları oluşturuyor.
3. Çöp adaları, Türkiye'nin yüz ölçümünden büyük boyutlara ulaştı.
4. Plastik atıklar suyun yüzeyinde yüzer.
5. Yüzen cisme etki eden kaldırma kuvveti, ağırlığına eşittir.
6. Plastik atıkları yüzeyde tutan, kaldırma kuvvetidir.
7. Atıklar yüzeyde kaldığı için yüzeyden toplanabilirler.

Soru (`tag: 'Sıra sende'`; yeni durum, çözüm üretme): Plastikler suyun yüzeyinde yüzdüğüne göre kaldırma kuvvetinden yararlanan bir çözüm hangisidir? **Yüzeyde yüzen atıkları ağlarla yüzeyden toplamak** / Atıkları dibe batırmak / Denizin dibini taramak. Dayandığı anlatım: 4–7. İpuçları: "Atıklar suyun yüzeyinde duruyor." · "Yüzen atık yüzeyden toplanabilir."

### Sahne 10 · Dene

Dene 1 (`tag: 'Dene'`; sınıflandırma). Kutular "Yüzer" / "Askıda kalır" / "Batar". Altı kart, soru kalıbı: "<durum> cisim ne yapar?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Yoğunluğu sıvınınkinden küçük cisim | yüzer | Evet. d_c < d_s ise cisim yüzer. |
| Yoğunluğu sıvınınkine eşit cisim | askıda kalır | Evet. d_c = d_s ise bırakıldığı yerde kalır. |
| Yoğunluğu sıvınınkinden büyük cisim | batar | Evet. d_c > d_s ise cisim tabana batar. |
| Kaldırma kuvveti ağırlığından küçük olan cisim | batar | Evet. F_k < G ise cisim batar. |
| Kaldırma kuvveti ağırlığına eşit, bir kısmı sıvı dışında kalan cisim | yüzer | Evet. Yüzen cisimde F_k = G. |
| Kaldırma kuvveti ağırlığına eşit, tamamen batmış ve dengede cisim | askıda kalır | Evet. Askıda kalan cisimde F_k = G. |

Dene 2 (`tag: 'Dene'`; sınıflandırma, çöp adaları). Kutular "Atığın oluşmasını azaltır" / "Oluşmuş atığı toplar". Yanlışta ipucu: "Çözüm atığı mı azaltıyor, yoksa var olanı mı topluyor?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Yeniden kullanılabilir ürünleri tercih etmek | oluşmasını azaltır | Evet. Tek kullanımlık plastik azalır. |
| Toplumu plastik atıkların zararları konusunda bilgilendirmek | oluşmasını azaltır | Evet. Bilinçli tüketici daha az atık bırakır. |
| Çevre temizliği için kampanyalar düzenlemek | toplar | Evet. Var olan atık toplanır. |
| Yüzeyde yüzen plastikleri yüzeyden toplamak | toplar | Evet. Plastik, kaldırma kuvveti sayesinde yüzeyde kalır. |

Dene 3 (`tag: 'Dene'`; eşleştirme). Soldaki dört ad sağdaki dört türe eşleştirilir: TCG Anadolu (L-400) ↔ çok amaçlı amfibi hücum gemisi; TCG İstanbul (F-515) ↔ İ sınıfı fırkateyn; ADA sınıfı ↔ korvet; Yeni Tip Denizaltı Projesi ↔ denizaltı (Gölcük Tersanesi). Yanlışta ipucu: "Adın yanındaki sınıfa bak."

### Çıkış soruları

1. (yeni durum) Aynı kütlede çelikten yapılmış içi boş bir kutu suda yüzüyor, katı bir küre batıyor. Neden? **Kutunun ortalama yoğunluğu suyunkinden küçüktür** / Kutunun kütlesi daha küçüktür / Kutuya etki eden kaldırma kuvveti ağırlığından küçüktür. (sahne 2)
2. (yeni durum) Bir tahta blok sıvıda yüzüyor. Blok hangisini yerinden eder? **Kendi ağırlığı kadar sıvıyı** / Kendi ağırlığının iki katı kadar sıvıyı / Hacminin tamamı kadar sıvıyı. (sahne 3)
3. (yanılgı) Yüklü bir gemi yükünün bir kısmını boşaltıyor. Hangisi doğrudur? **Gemi daha az batar; kaldırma kuvveti azalır** / Gemi aynı batar; kaldırma kuvveti değişmez / Gemi daha az batar; kaldırma kuvveti aynı kalır. (sahne 4)
4. (yeni durum) Yüzen bir tahta blok sudan tuzlu suya aktarılıyor. Batan hacmi nasıl değişir? **Azalır** / Artar / Değişmez. (sahne 5)
5. (yeni durum) Su altında askıda duran bir denizaltı yükselmek istiyor. Ne yapar? **Safra tanklarındaki suyu boşaltıp hava pompalar** / Safra tanklarına su alır / Safra tanklarını olduğu gibi bırakır. (sahne 6)

Özet: Gemi içi boş yapısı sayesinde ortalama yoğunluğu suyunkinden küçüktür; yüzer. · Yüzen ve askıda kalan cisimde F_k = G; batan cisimde F_k < G. · **Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.**

## D5 · Ölçümü de önermeyi de ilkeyle sına

- **Fikir:** Arşimet İlkesi bir ölçüttür: deney verisi ve kaldırma kuvvetiyle ilgili bir önerme, ilkeyle ve F_k = F₂ − F₁ ilişkisiyle karşılaştırılarak değerlendirilir.
- **Giriş ekranı sorusu:** Bir ölçümün hatalı olduğunu, deneyi yeniden yapmadan anlayabilir misin?
- **Kaynak:** Ders kitabı s. 179 (tanılayıcı ağaç: kaldırma kuvveti ve basınç üzerine doğru–yanlış önermeler), s. 180 (Arşimet İlkesi; F_k = V_b · d_s · g), s. 176–177 (alt ve üst yüzeydeki kuvvetler; yan yüzeylerdeki kuvvetler dengelenir), s. 183 (yüzme F_k = G, batma F_k < G). Kitap dışı: veri tablosu (karar 19). Bu ders 12 Ekim 2026'da D4'ten ayrıldı (`PLAN.md` karar 25): eski D4 sahne 10 ve 11'in içeriği, önüne çözülmüş örnekler konarak.
- **Sınır:** Yeni bilgi verilmez; D1–D4'te öğretilen ilişkiler ölçüm ve önerme değerlendirmek için kullanılır. Öğrenci hesap yapmaz: satırdaki iki değeri karşılaştırır, "iki katı" gibi oranları yorumlar; tek istisna çıkış 5'teki tek çıkarmadır. Ölçümün neden hatalı çıktığı (düzenek hatası, okuma hatası) anlatılmaz; uyumsuz ölçüm yinelenir. Gaz ortamı yok.
- **Örnek veri (F_k = V_b · d_s · g ile hesaplandı; g = 9,8 m/s², su 1.000 kg/m³, X sıvısı 2d):** Ela'nın sekiz ölçümü. A: 0,0002 m³ su → F_k 1,96 N, taşan su 1,96 N. B: 0,0001 m³ su → 0,98 N, taşan su 1,96 N (uyumsuz). C: 0,0004 m³ su → 3,92 N, 3,92 N. D: 0,0004 m³ X sıvısı → 7,84 N, 7,84 N. E (B'nin yinelenmesi): 0,0001 m³ su → 0,98 N, 0,98 N. F: 0,0003 m³ su → 2,94 N, 2,94 N. G: 0,0003 m³ X sıvısı → 5,88 N, taşan sıvı 2,94 N (uyumsuz). H: 0,0002 m³ X sıvısı → 3,92 N, 3,92 N. Silindir (D3 sahne 8'in sayıları; taban alanı 0,01 m²): üst yüzey 0,1 m derinde F₁ 9,8 N, F₂ 13,72 N; 0,3 m derinde F₁ 29,4 N, F₂ 33,32 N; fark ikisinde 3,92 N.
- **Güç kavramlar ve gösterimi:** (1) İlkenin ölçüt olması: her satırda mor kaldırma kuvveti ile turuncu taşan sıvı ağırlığı yan yana, aralarında "=" ya da gri "≠". (2) Ölçümlerin birbiriyle tutarlılığı: iki satırın kaldırma kuvveti hücreleri arasında mor "× 2". (3) Önermenin sınanması: silindir iki derinlikte; F₁ ve F₂ okları birlikte uzar, mor kaldırma kuvveti oku aynı boyda kalır.
- **Hedeflenen yanılgı:** "İlkeye uymayan tek ölçüm ilkeyi çürütür" ve "derindeki cisme daha büyük kaldırma kuvveti etki eder".
- **Akılda kalıcı cümle:** Ölçümü de önermeyi de ilkeyle sına.

**Ölçüm tablosu (sahne 3–5).** x 70–930, y 120; sütunlar "Ölçüm" 100, "Batan hacim (m³)" 200, "Sıvı" 130, "Kaldırma kuvveti (N)" 230 mor, "Taşan sıvının ağırlığı (N)" 200 turuncu; başlıklar iki satır, 22 birim; satır yazıları 22 birim. Satırlar 400 ms `out` ile belirir. Tablo sahnelerinde tahtadaki kelime sayısı 25'i aşar (tablo istisnası).

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Batan bir cisimde kaldırma kuvveti ile cismin ağırlığı arasındaki ilişki nedir? **Kaldırma kuvveti ağırlıktan küçüktür** / Kaldırma kuvveti ağırlığa eşittir / Kaldırma kuvveti ağırlıktan büyüktür. (D4) Yanlışta: "Yüzen ve askıda kalan cisimde F_k = G, batan cisimde F_k < G'dir."
2. Kaldırma kuvveti dinamometreyle nasıl ölçülür? **Havadaki okumadan sıvıdaki okuma çıkarılır** / Havadaki ve sıvıdaki okuma toplanır / Yalnızca sıvıdaki okuma alınır. (D1) Yanlışta: "Cisim sıvıya girince dinamometre daha az gösterir; aradaki fark kaldırma kuvvetidir."

Tahta: birinci soruda bir kap ve tabana oturmuş cisim (cevaptan sonra uzun turuncu ağırlık oku ve kısa mor kaldırma kuvveti oku belirir); ikinci soruda dinamometre düzeneği (`KIT_D.duzenek`, iki dilim batık, okuma "7,84 N").

Sonra: "Bugün ölçümleri ve önermeleri Arşimet İlkesi'yle sınayacağız."

### Sahne 2 · İlke bir ölçüttür

Tahta: solda dinamometre düzeneği (190 birim sola kaydırılmış; kap x 60–460), cisim iki dilim batık, okuma "7,84 N". 2. cümlede cismin solunda mor kaldırma kuvveti oku (20 birim; 300 ms, `out`) ve kabın sağ üst köşesinden çıkan kısa boru ile altında küçük toplama kabı (x 470–560, y 440–520; içinde 30 birim yüksekliğinde mavi su) belirir (400 ms, `out`). Sağda (x 600–960) satırlar: 2. cümlede "kaldırma kuvveti" (mor, y 180, 28 birim) ve "taşan sıvının ağırlığı" (turuncu, y 320, 28 birim); 3. cümlede aralarında "=" (44 birim, y 250; 300 ms, `out`).

Anlatım:
1. Ela deneyini bitirdi; şimdi ölçümlerine güvenip güvenemeyeceğini soruyor.
2. Her ölçümde iki değer kaydetti: kaldırma kuvveti ve taşan sıvının ağırlığı.
3. Arşimet İlkesi'ne göre bu iki değer eşit olmalı.
4. İlke, bir ölçümün tutarlı olup olmadığını sınamanın ölçütüdür.

### Sahne 3 · İki ölçüm (çözülmüş örnek)

Tahta: ölçüm tablosu, başlık satırı 1. cümlede belirir. 2. cümlede A satırı: "A · 0,0002 · su · 1,96 · 1,96". 4. cümlede A satırının son iki hücresi arasında "=" (22 birim; 300 ms, `out`). 5. cümlede B satırı: "B · 0,0001 · su · 0,98 · 1,96". 7. cümlede B satırının son iki hücresi arasında gri "≠". 8. cümlede B satırı 0,45 saydamlığa iner (300 ms, `in`).

Anlatım:
1. Ela her ölçümü tablonun bir satırına yazıyor.
2. A ölçümünde cismin 0,0002 metreküpü suya batık.
3. Kaldırma kuvveti 1,96 newton; taşan suyun ağırlığı da 1,96 newton.
4. İki değer eşit: A ölçümü ilkeyle uyumlu.
5. B ölçümünde kaldırma kuvveti 0,98 newton çıkmış.
6. Taşan suyun ağırlığı ise 1,96 newton yazılmış.
7. İki değer eşit değil: B ölçümü ilkeyle uyumsuz.
8. İlkeyle uyuşmayan ölçüm yinelenir.

### Sahne 4 · Ölçümler birbirini tutuyor mu?

Tahta: ölçüm tablosu; A satırı tam, B satırı soluk (0,45). 3. cümlede C satırının ilk üç hücresi belirir: "C · 0,0004 · su"; son iki hücre Birlikte çöz'den sonra dolar.

Anlatım:
1. Tutarlı ölçümler birbirini de tutar: bunu model söyler.
2. Modelde kaldırma kuvveti, batan hacimle doğru orantılıdır.
3. C ölçümünde batan hacim 0,0004 metreküp: A'dakinin iki katı.

Birlikte çöz (`tag: 'Birlikte çöz'`): C ölçümünde sıvı yine su, batan hacim A ölçümündekinin iki katı. Tutarlı bir ölçümde kaldırma kuvveti A'dakine göre nasıl olmalı? **İki katı olmalı** / Aynı olmalı / Yarısı olmalı. Dayandığı anlatım: bu sahne 1–3. İpuçları: "Sıvı aynıysa kaldırma kuvveti yalnızca batan hacimle değişir." · "Batan hacim iki katına çıkınca kaldırma kuvveti de iki katına çıkar."

Gör: C satırı dolar: "3,92 · 3,92"; A satırının kaldırma kuvveti hücresinden C satırınınkine inen mor ince çizginin yanında "× 2" (mor, 22 birim; 300 ms, `out`).

Sonra:
4. C'de kaldırma kuvveti 3,92 newton: 1,96'nın iki katı.
5. Taşan suyun ağırlığı da 3,92 newton: C ölçümü tutarlı.
6. D ölçümünde batan hacim aynı, sıvı ise X sıvısı.
7. X sıvısının yoğunluğu suyun iki katıdır.

Tahta (7. cümleden sonra): D satırı bütünüyle belirir: "D · 0,0004 · X (2d) · 7,84 · 7,84".

Soru (`tag: 'Sıra sende'`; yeni durum): D ölçümü tutarlı mı? **Evet: iki değer eşit, kaldırma kuvveti de C'dekinin iki katı** / Hayır: kaldırma kuvveti C'dekiyle aynı olmalıydı / Hayır: yoğunluk artınca kaldırma kuvveti azalmalıydı. Dayandığı anlatım: sahne 3, 4; bu sahne 2, 6–7. İpuçları: "Önce satırdaki iki değeri karşılaştır." · "Modelde kaldırma kuvveti sıvının yoğunluğuyla doğru orantılıdır."

Gör: C satırının kaldırma kuvveti hücresinden D satırınınkine ikinci mor "× 2".

Sonra:
8. Yoğunluk iki katına çıktı; kaldırma kuvveti de iki katına çıktı.

### Sahne 5 · Yeni ölçümleri değerlendir

Tahta: ölçüm tablosu boşalır (başlık kalır); dört yeni satır 3. cümlede birlikte belirir: "E · 0,0001 · su · 0,98 · 0,98"; "F · 0,0003 · su · 2,94 · 2,94"; "G · 0,0003 · X (2d) · 5,88 · 2,94"; "H · 0,0002 · X (2d) · 3,92 · 3,92". Tablonun altında iki kutu: "İlkeyle uyumlu", "İlkeyle uyumsuz". Değerlendirilen satır vurgulanır; karar verilince satırın sonuna "=" ya da gri "≠" konur ve satırın adı kutusunda belirir.

Anlatım:
1. Ela ertesi gün dört ölçüm daha yapıyor.
2. İlk işi, uyumsuz çıkan B ölçümünü yinelemek: E satırı.
3. Her satırda iki değeri karşılaştır.

Dene (`tag: 'Dene'`; sınıflandırma). Kutular "İlkeyle uyumlu" / "İlkeyle uyumsuz"; her satır bir kart. Yanlışta ipucu: "İlkeye göre iki değer eşit olmalı."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| E satırı | uyumlu | Evet. 0,98 N ile 0,98 N eşit: yinelenen ölçüm tuttu. |
| F satırı | uyumlu | Evet. 2,94 N ile 2,94 N eşit. |
| G satırı | uyumsuz | Evet. 5,88 N ile 2,94 N eşit değil: ölçüm yinelenmeli. |
| H satırı | uyumlu | Evet. 3,92 N ile 3,92 N eşit. |

Sonra:
4. Sekiz ölçümün altısı ilkeyle uyumlu çıktı.
5. Tutarlı ölçümler ilkeyi destekler; uyumsuz olanlar yinelenir.

Defter (başlık "Veriyi sına"): Uyumlu ölçümde **F_k**, taşan sıvının ağırlığına eşittir.

### Sahne 6 · Bir önermeyi sına (çözülmüş örnek)

Tahta: sıvı kabı x 80–460, üst kenar y 80, taban y 540; su yüzeyi y 100 (mavi, 0,35 saydamlık). Sol iç duvarda iki çentik ve yazısı: "0,1 m" (y 200), "0,3 m" (y 400). Silindir yandan görünüşle dikdörtgen, 120 × 40 (x 230–350; 1.000 birim = 1 m, silindirin boyu 0,04 m), açık gri; üst kenarı y 200'de başlar. Oklar turuncu, ölçek 2,5 birim = 1 N: F₁ üst yüzeye yukarıdan aşağı (25 birim), F₂ alt yüzeye aşağıdan yukarı (34 birim). Silindirin solunda (x 190) mor kaldırma kuvveti oku, şematik 40 birim, yukarı. Sağ üstte önerme kartı (x 500–960, y 90–190; 22 birim, iki satır): "Batmış cisim derine indikçe kaldırma kuvveti artar." Kartın altında etiketler (x 520, 24 birim): 4. cümlede "F₁ 9,8 N" (y 300), "F₂ 13,72 N" (y 350), "fark 3,92 N" (mor, y 400). 5. cümlede silindir ve oklar 900 ms `inOut` ile 200 birim iner (üst kenar y 400); oklar aynı sürede uzar (F₁ 74, F₂ 83 birim); mor ok aynı boyda kalır. 6. cümlede etiketler değişir (eskiler 200 ms `in` ile kaybolur, yeniler 300 ms `out` ile belirir): "F₁ 29,4 N", "F₂ 33,32 N", "fark 3,92 N". 7. cümlede önerme kartı 0,45 saydamlığa iner, altında gri "yanlış" yazısı belirir (24 birim).

Anlatım:
1. Bir önerme de ölçüm gibi sınanır.
2. Önerme şu: batmış cisim derine indikçe kaldırma kuvveti artar.
3. Kaldırma kuvveti, alt ve üst yüzeydeki kuvvetlerin farkıdır.
4. 0,1 metrede F₁ 9,8, F₂ 13,72 newton: fark 3,92.
5. Silindir 0,3 metreye iniyor: iki kuvvet de büyüyor.
6. F₁ 29,4, F₂ 33,32 newton oldu: fark yine 3,92.
7. Fark değişmedi: kaldırma kuvveti artmadı, önerme yanlış.

### Sahne 7 · Doğru mu, yanlış mı?

Tahta: ortada tek kart (x 120–880, y 200–300, 28 birim; en çok 12 kelime); altında iki kutu "Doğru" (x 120–470) ve "Yanlış" (x 530–880; y 400–470). Kart seçilince yerinde küçülüp söner (`scale` 1 → 0,6, 400 ms, `in`), kutusunda bir işaret belirir.

Anlatım:
1. Şimdi beş önermeyi aynı yolla değerlendir.

Dene (`tag: 'Dene'`; doğru–yanlış). Yanlışta ipucu: "Silindir çiziminde alt ve üst yüzeye etki eden kuvvetleri düşün."

| Kart (önerme) | Kutu | Doğru geri bildirimi |
|---|---|---|
| Kaldırma kuvvetinin varlığı ilk kez Pascal tarafından kanıtlanmıştır. | Yanlış | Evet. Bunu ilk kanıtlayan Arşimet. |
| Basıncı oluşturan kuvvetlerin bileşkesi yukarı yönlüdür ve kaldırma kuvvetine eşittir. | Doğru | Evet. F_k = F₂ − F₁. |
| Kuvvetlerin farkı cismin ağırlığından küçükse cisim batar. | Doğru | Evet. F_k < G ise cisim batar. |
| Yan yüzeylere etki eden kuvvetler kaldırma kuvvetini büyütür. | Yanlış | Evet. Yan yüzeylerdeki kuvvetler birbirini dengeler. |
| Yüzen cisimde kaldırma kuvveti, cismin ağırlığına eşittir. | Doğru | Evet. F_k = G. |

Sonra:
2. Kaldırma kuvveti, sıvının cisme uyguladığı basınç kuvvetlerinin bileşkesidir.
3. Ölçümü de önermeyi de ilkeyle sına.

Defter: yalnızca akılda kalıcı cümle (3. cümle).

### Çıkış soruları

1. (yanılgı) Bir ölçümde kaldırma kuvveti 2,94 N, taşan suyun ağırlığı 1,96 N kaydedilmiş. Ne yapılmalı? **Ölçüm yinelenmeli: iki değer eşit çıkmalıydı** / Ölçüm kabul edilmeli: iki değer birbirine yakın / Arşimet İlkesi yanlış sayılmalı. (sahne 3)
2. (yeni durum) Aynı sıvıda batan hacim üç katına çıkarılıyor. Tutarlı ölçümlerde taşan sıvının ağırlığı nasıl değişir? **Üç katına çıkar** / Aynı kalır / Üçte birine iner. (sahne 4)
3. (yeni durum) İki ölçümde batan hacim aynı; ikinci sıvının yoğunluğu ilkinin yarısı. Ölçümler tutarlıysa ikinci ölçümde kaldırma kuvveti nasıl olur? **İlkinin yarısı olur** / İlkinin iki katı olur / İlkiyle aynı olur. (sahne 4)
4. (yanılgı) "Daha derindeki cisme daha büyük kaldırma kuvveti etki eder." Tamamen batmış bir cisim için bu önerme neden yanlıştır? **Alt ve üst yüzeydeki kuvvetler aynı kadar artar; farkları değişmez** / Derine inildikçe sıvının basıncı azalır / Derinde yalnızca üst yüzeydeki kuvvet artar. (sahne 6)
5. (yeni durum) Sıvıdaki bir cismin alt yüzeyine 12 N, üst yüzeyine 8 N kuvvet etki ediyor; cismin ağırlığı 6 N. Hangisi doğrudur? **Kaldırma kuvveti 4 N'dur; cisim batar** / Kaldırma kuvveti 4 N'dur; cisim yüzer / Kaldırma kuvveti 20 N'dur; cisim yüzer. (sahne 6, 7; 12 − 8 = 4, 4 < 6)

Özet: Uyumlu ölçümde kaldırma kuvveti, taşan sıvının ağırlığına eşittir. · Tutarlı ölçümler modelin orantılarına da uyar. · **Ölçümü de önermeyi de ilkeyle sına.**

## D6 · Konu tekrarı: Kaldırma kuvveti (`d6-tekrar.html`, 1 sahne + 10 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural, 3 × 2 kart olarak tahtada sırayla toplanır (kartlar x 60–340, 360–640, 660–940; y 110–290 ve 310–490), her biri küçük çizimiyle (kutu içinde 100 × 80) ve deftere düşer. Her kart 400 ms'de `out` ile belirir; bir öncekinin saydamlığı 0,45'e iner. Kartlar: (1) kapta cisim ve mor yukarı ok (yazı yok) · (2) "V_b, d_s, g" (üç küçük etiket: mor, mavi, turuncu) · (3) iki derinlikte aynı boyda mor ok, "derinlik etkisiz" · (4) taşırma kabı ve taşan damla, "F_k = V_b · d_s · g" · (5) silindir ve F₁, F₂ okları, "F_k = F₂ − F₁" · (6) üç küçük kap (yüzen, askıda, batan), "F_k = G · F_k < G". Kart yazıları toplam 24 kelimedir. Bu sahnede kural satırları kısadır; tablo istisnası gerekmez.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Sıvının cisme uyguladığı yukarı kuvvete kaldırma kuvveti denir.
3. Kaldırma kuvveti batan hacme, sıvının yoğunluğuna ve g'ye bağlıdır.
4. Tamamen batmış cismin kaldırma kuvveti derinliğe bağlı değildir.
5. Arşimet İlkesi: kaldırma kuvveti, yeri değişen sıvının ağırlığına eşittir.
6. Modeli: F_k = V_b · d_s · g.
7. Kaldırma kuvveti, alt ve üst yüzeydeki kuvvetlerin farkından doğar.
8. Yüzen ve askıda kalan cisimde F_k = G'dir.
9. Batan cisimde F_k, G'den küçüktür.

Sorular (`quiz`, karışık sırada):

1. Bir cisim havada 8 N, suya tamamen batırılınca dinamometre 5 N gösteriyor. Kaldırma kuvveti kaç N'dur? **3 N** / 5 N / 13 N. — D1 (8 − 5 = 3)
2. Tamamen batmış bir cisim havuzda 0,5 m derinlikten 1 m derinliğe iniyor. Kaldırma kuvveti nasıl değişir? **Değişmez** / İki katına çıkar / Yarıya iner. — D1, D3
3. Bir ölçümde kaldırma kuvveti 1,96 N, taşan suyun ağırlığı 0,98 N kaydedilmiş. Bu ölçüm için hangisi söylenir? **Arşimet İlkesi'yle uyumsuzdur; yinelenmelidir** / Arşimet İlkesi'yle uyumludur / Arşimet İlkesi'nin yanlış olduğunu gösterir. — D5
4. Aynı cisim sırayla yoğunlukları d, 3d ve 2d olan üç sıvıya tamamen batırılıyor. Kaldırma kuvvetlerini büyükten küçüğe sıralayın. **3d, 2d, d** / d, 2d, 3d / 2d, 3d, d. — D2 (F_k, d_s ile doğru orantılı)
5. Bir cisim taşırma kabına batırılınca ağırlığı 5 N olan su taşıyor. Aynı cisim aynı kadar batacak biçimde, yoğunluğu suyun iki katı olan sıvıyla dolu kaba batırılırsa taşan sıvının ağırlığı kaç N olur? **10 N** / 5 N / 2,5 N. — D2 (2 · 5 = 10)
6. Hacimleri aynı iki cisimden biri ötekinden ağır; ikisi de aynı sıvıya tamamen batıyor. Hangisi doğrudur? **Kaldırma kuvvetleri eşittir** / Ağır olana daha büyük kaldırma kuvveti etki eder / Hafif olana daha büyük kaldırma kuvveti etki eder. — D2
7. Sıvıdaki bir cismin alt yüzeyine etki eden kuvvet, üst yüzeyine etki edenden büyüktür. Bu iki kuvvetin farkı hangi kuvvettir? **Kaldırma kuvveti** / Cismin ağırlığı / Yan yüzeylerdeki kuvvet. — D3
8. Askıda kalan bir cisim için hangisi doğrudur? **Kaldırma kuvveti ağırlığa eşittir; cismin yoğunluğu sıvınınkine eşittir** / Kaldırma kuvveti ağırlıktan küçüktür; cismin yoğunluğu sıvınınkinden büyüktür / Kaldırma kuvveti ağırlığa eşittir; cismin yoğunluğu sıvınınkinden küçüktür. — D4
9. Çelik bir bilye suda batarken çelikten yapılmış bir gemi yüzüyor. Gemi için hangisi doğrudur? **Ortalama yoğunluğu suyunkinden küçüktür** / Ortalama yoğunluğu suyunkinden büyüktür / Kaldırma kuvveti ağırlığından küçüktür. — D4
10. Denizlerdeki plastik atıklar neden suyun yüzeyinde kalır? **Yüzen atığa etki eden kaldırma kuvveti ağırlığına eşittir** / Atığa etki eden kaldırma kuvveti ağırlığından küçüktür / Atıklara kaldırma kuvveti etki etmez. — D4

Akılda kalıcı cümle: Kaldırma kuvveti, yerinden edilen sıvının ağırlığıdır.

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.3.5, FİZ.9.3.6 ve uygulama metni) | Karşılığı |
|---|---|
| FİZ.9.3.5 a) Kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik bir deney tasarlar | D1 sahne 5 (aday değişkenler), sahne 6 (değiştirilen · ölçülen · sabit tutulan; Birlikte çöz), sahne 7–8 (ikinci ve üçüncü deney) |
| FİZ.9.3.5 b) Deney düzeneğinden veri toplayarak değişkenleri analiz eder | D1 sahne 6–8 (üç tablo), sahne 10 (Dene: kaydırıcı ve sınıflandırma) |
| Arşimet ve Kral Hiero'nun Altın Tacı öyküsü, görsel içerikle | D1 sahne 2; "tarih disiplini ile ilişki" yalnızca öykünün anlatılmasıyla karşılanır |
| Öyküdekine benzer deney düzeneği tasarlama; deney tasarlama ve ölçüm yapma (SDB1.2) | D1 sahne 3–8 (dinamometre düzeneği benzetimi); grup çalışması `site dışı` |
| Araştırma raporu hazırlama ve sunma | `site dışı` |
| FİZ.9.3.6 a) Yer değiştiren sıvının ağırlığı ile ilişkiye dair hipotez kurar | D2 sahne 2 (Hipotez kur), sahne 3–4 (sınama) |
| FİZ.9.3.6 b) Deney verilerinden matematiksel modeli bulur | D2 sahne 4 (veri), sahne 5–6 (ilke ve model), sahne 8 (modelin veriyle sınanması) |
| Matematiksel model pekiştirilirken orantısal ilişkilerle sınırlı kalınır | D2 sahne 7–10 (orantı yorumları, "modelde cismin ağırlığı yok"); D2 çıkış 2, 4, 5; D5 sahne 4, çıkış 2, 3; D6 soru 4, 5 |
| Sıvı basıncı ve kaldırma kuvveti arasındaki ilişkiyi fark edebilecekleri görsel içerik | D3 sahne 2–8 (basınç okları, silindir, F₁ ve F₂) |
| FİZ.9.3.6 c) Kaldırma kuvveti ve sıvı basıncı modellerini karşılaştırır; sıvılardaki kaldırma kuvveti ile sınırlı | D3 sahne 9 (iki model yan yana); gaz, balon yok |
| FİZ.9.3.6 ç) Kaldırma kuvveti ve basınca neden olan kuvvet arasındaki ilişkiye dair önermede bulunur | D3 sahne 9 (neden–sonuç cümlesi, Sıra sende, defter), sahne 10 (Dene 2: önermeler); seçenekli önermeyle karşılanır (karar 16) |
| FİZ.9.3.6 d) İlişkiye dair değerlendirme yapar | D5 sahne 6 (çözülmüş örnek), sahne 7 (önermelerin değerlendirilmesi), çıkış 4, 5 |
| Deney verilerini Arşimet İlkesi kapsamında değerlendirme | D5 sahne 2–5 (ölçüt, çözülmüş örnek, Birlikte çöz, sınıflandırma), çıkış 1–3; D6 soru 3 |
| Gemi, denizaltı gibi deniz araçları üzerinden uygulamalar; Türkiye'nin millî çıkarları doğrultusunda geliştirdiği araçlar | D4 sahne 2–4, 6, 8 |
| Araçların ekonomik kalkınma, tasarruf ve yatırım stratejileri kapsamında geliştirildiğinin belirtilmesi | D4 sahne 8 (2. cümle) |
| Çöp adaları, görsel ögelerle bilgi; plastiğin yüzeyde kaldırma kuvvetiyle yüzdüğünün vurgulanması | D4 sahne 9 |
| Beyin fırtınasıyla kaldırma kuvvetinden yararlanan çözüm üretme | D4 sahne 9 (seçenekli çözüm sorusu), sahne 10 (Dene 2: sınıflandırma); beyin fırtınası etkinliği `site dışı` |
| Köprü kurma: yoğunluk ve kaldırma kuvvetinin günlük hayatla ilişkisi (gemiler, denizaltılar, plastik adaları) | D4 sahne 2–9 |
| Temel kabul: yoğunluk kavramı ve sıvıların özellikleri | D2 sahne 6 ve D4 sahne 2'de kullanılır, yeniden anlatılmaz |
| Çalışma yaprağı, grup çalışması, öz değerlendirme | `site dışı` |

Fazla olan: (1) dinamometre farkıyla ölçüm (D1 sahne 3–4) ve taşırma kabı ile tartı (D2): programın "deney tasarla ve ölçüm yap" ve "yer değiştiren sıvının ağırlığı" bentlerini benzetimde karşılamak için kurulan kitap dışı düzenekler (karar 19). (2) Yer çekimi ivmesi (D1 sahne 9): program metni anmaz; kitap sayar (s. 172, 175) ve karar 4 değişken sayar. (3) Yüzme, askıda kalma, batma ve ortalama yoğunluk (D4 sahne 2–5): program gemi, denizaltı ve yüzen atığı sayar, "yoğunluk ve kaldırma kuvveti" köprüsünü ister; üçlü sınıflama kitaptadır (s. 181, 183), karar 13. (4) Derin dalışta 100 katı sorusu (D4 sahne 7): B konusuna geri bağlanan tek oran; kitabın iki sayısıyla (s. 182). (5) D1 ve D2'de çıkarma işlemi, D3'te F₁ ve F₂ sayısal gösterimi: öğrenciye hesaplatılmaz, yalnızca gösterilir (çıkış 1'deki tek çıkarma, D5 çıkış 5 ve D6 soru 1 hariç). Eksik olan: yok; yalnızca sınıf içi etkinlikler (grup çalışması, rapor, beyin fırtınası, çalışma yaprağı) `site dışı`.

Hesaplanan örnek veri ve sorular: D1 tablo 1 (5 satır), tablo 2 (2 satır), tablo 3 (3 satır), kaydırıcı ızgarası (10 durum), sahne 4 örneği, sahne 6 Birlikte çöz, çıkış 1; D2 sahne 3 örneği, tablo (5 satır), model tablosu (5 satır), A ve B cisimleri (2 durum), Birlikte çöz, çıkış 1–5; D3 sahne 6 (P₁, P₂, F₁, F₂, F_k), sahne 8 (iki derinlik), kaydırıcı ızgarası (9 durum), çıkış 1, 3, 4; D4 sahne 7 (3.000 / 30 = 100), çıkış 1–5; D5 sekiz ölçüm (A–H), sahne 6 (iki derinlik, D3 sahne 8'in sayıları), çıkış 1–5; D6 soru 1, 3, 4, 5.
