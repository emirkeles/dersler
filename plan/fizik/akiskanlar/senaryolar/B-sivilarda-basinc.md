# Senaryolar — Konu B · Sıvılarda basınç

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.3.2 ve FİZ.9.3.3, `../PLAN.md` bölüm 3 (B1–B4), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 2, 3, 6, 10, 11, 16, 19, 23, 24) ve bölüm 8 ("B" satırları, son paragraf). Biçim ve üslup `A-basinc.md` dosyasındaki gibidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("0,2 m" → "sıfır virgül iki metre", "1.960 Pa" → "bin dokuz yüz altmış pascal", "P = h·d·g" → "P eşittir h çarpı d çarpı g"). Çarpım tahtada ve altyazıda "·" ile bitişik yazılır (`h·d·g`); satırlar kelime sayımında boşluklu yazılmış gibi de 12'yi aşmaz.
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyi Ela yapar. Soru kartlarında ve kaynak kartlarında gerçek kurum, kişi, marka, sayı yoktur.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. "Hatırla" sahnesinin soruları `tag: 'Hatırla'` taşır.
- Renkler tema boyunca aynıdır: kuvvet turuncu, yüzey alanı turkuaz, basınç sarı, sıvı mavi (yoğun sıvı daha koyu mavi), kaldırma kuvveti mor (bu konuda yok). Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gri çizilir. Tahta koyudur: çizgiler açık renklidir; siyah çizgi yok. Hava soluk gri-mavi.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Yazı en az 22 birim. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` düzgün). Bir anda tek ana hareket olur; yazı okunurken yer değiştirmez.
- Sürat yazılır, hız yazılmaz. Kabın yan yüzeyine etki eden kuvvet hiçbir derste hesaplanmaz (program sınırı). Yan yüzeyde basınç oklarının görünmesi serbesttir.
- Sıvı içinde gezdirilen basınçölçer (yalnızca B2) kitap dışı bir düzenektir (`PLAN.md` karar 19); sayıları "Örnek veri"dir, `P = h·d·g` ile hesaplanır (g = 9,8 m/s², su 1.000 kg/m³). Başka sıvının yoğunluğu sayıyla yazılmaz: "d, 2d, 3d" oranıyla verilir. Her sayı senaryoda iki kez hesaplanmıştır (ikinci hesap parantez içindedir).
- Tablo sahnelerinde tahtadaki kelime sayısı 25'i aşabilir (`KURALLAR.md` 4, tablo istisnası); kaynak kartı ve kontrol listesi bu istisnaya girer.
- Ders motorunun düğmeleri dışında girdi yoktur: serbest metin girişi hiçbir derste bulunmaz.

## B1 · Derine dalmak neden zor?

- **Fikir:** Durgun bir sıvının içinde basınç her yerde aynı değildir; derinlikle artar ve üç şeye bağlıdır: derinliğe, sıvının yoğunluğuna, yer çekimi ivmesine.
- **Giriş ekranı sorusu:** Serbest dalışta rekor deneyen bir sporcu indikçe kulaklarındaki baskı neden artar?
- **Kaynak:** Ders kitabı s. 145 (serbest dalış metni: tek nefeste ip yardımıyla dalma, kulakta dolgunluk, çıkışta nefes tutmanın akciğere zararı, vurgun, basınç odası; turistik denizaltı ve pencereleri), s. 149 ("Sıvılar, ağırlıkları nedeniyle bulundukları yüzeye basınç uygular…"; sıvının tüm temas yüzeylerine basınç uygulaması; üç etmen; derinlik = serbest yüzeyden dik uzaklık), s. 150 (Örnek: tabandaki basıncı artırmak ve azaltmak: sıvı eklemek, tuz atmak, kutuplara ve Ekvator'a götürmek), s. 184 (dalgıçlar dalgıç elbisesi, dalış tüpü ve ağırlık takımı kullanır; yalnızca ad olarak).
- **Örnek veri:** yok; bu derste sayı kullanılmaz. Çizim oranları şematiktir ve tahtaya yazılmaz.
- **Sınır:** `P = h·d·g` ve sayı yok (B2). Kabın şekli, taban alanı ve sıvı miktarının etkisizliği yok (B2). Sporcu adı, derinlik, tarih yazılmaz. Teçhizatın nedeni (kaldırma kuvveti, gaz kabarcıklarının büyümesi) anlatılmaz: kitap cevap vermiyor, kaldırma kuvveti D konusu. Sağlık içeriği programın yazdığı kadar: kulakta dolgunluk, nefes tutmanın zararı, vurgun, basınç odası. Sporcunun duygusunu sorgulama (SDB1.1) `site dışı`.
- **Güç kavramlar ve gösterimi:** (1) Basıncın kaynağı üstteki sıvının ağırlığıdır: bir noktanın üstünden serbest yüzeye uzanan kesikli su sütunu, sütunun içinde turuncu ağırlık oku; derin noktada sütun yüksek, ok uzun, sarı basınç çubuğu uzun. (2) Üç etmen aynı sütun çiziminden okunur: sütun yükseldikçe (derinlik), sıvı yoğunlaştıkça, g büyüdükçe ağırlık oku uzar. (3) Dalgıç ya da balık yerine "nokta": basınç sıvının içinde her noktada vardır ve o noktanın derinliğine bağlıdır.
- **Hedeflenen yanılgı:** "Suyun içinde basınç her yerde aynıdır" ve "basıncı dalgıcın kendi ağırlığı belirler".
- **Akılda kalıcı cümle:** Sıvıda ne kadar derine inersen basınç o kadar büyür.

### Sahne 1 · Hatırla

İki soru, `tag: 'Hatırla'`; anlatım yok.

1. (A1) Aynı ağırlık daha geniş bir yüzeye yayılırsa basınç nasıl değişir? **Azalır** / Artar / Değişmez. İpuçları: "Aynı kuvvet geniş yüzeye yayılınca her yere daha azı düşer." · "Kar ayakkabısını düşün." Doğru geri bildirimi: "Evet. Aynı kuvvet, büyük yüzeyde daha küçük basınç yapar."
2. (A2) Yatay zeminde duran bir cismin zemine uyguladığı kuvvet nedir? **Cismin ağırlığı** / Cismin hacmi / Zeminin ağırlığı. İpuçları: "Zemini aşağı bastıran şey cismin kendisidir." · "Basınç P = G / A idi." Doğru geri bildirimi: "Evet. Yatay zeminde kuvvet, cismin ağırlığıdır: P = G / A."

Tahtada: soru kartı (x 120–880, y 150–330), şıklar altında üç düğme (x 120–880, y 360–500).

### Sahne 2 · Tek nefeste dalış

Tahta: deniz kesiti. Su mavi dolgu x 60–940, y 120–520 (yüzey y = 120); yüzeyin üstü soluk gri-mavi hava. İp: x 300'de dikey açık gri çizgi, y 120–480. Sporcu: ipin yanında, boyu 70 birim, genişliği 40 birim çizgi figür (baş r 14, gövde, kollar); başı x 322'de. Sporcu önce yüzeyde (baş y 100). Kulağın yanında küçük sarı oklar (kulağa doğru, her biri 30 birim). Sağda x 560–900'de büyük yazılar: "kulakta dolgunluk", "basınç" (sarı).

Anlatım:
1. Serbest dalış, tek nefeste ip yardımıyla suyun altına dalma sporudur.
2. Sporcu ipin boyunca aşağı iniyor.
3. İndikçe kulaklarında dolgunluk hissi oluşur.

Hareket: 2. cümlede sporcu 800 ms'de `inOut` ile baş y 100'den 200'e iner. 3. cümlede kulağın yanında 2 sarı ok belirir (400 ms, `out`) ve "kulakta dolgunluk" yazısı gelir (400 ms, `out`).

Tahmin (`tag: 'Tahmin et'`; sahne 2'nin 3. cümlesi): Sporcu daha derine inerse kulağındaki baskı nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: 2–3. İpuçları: "İndikçe dolgunluk hissi oluşuyordu." · "Daha derinde bu his sürer mi, yoksa azalır mı?"

Gör: sporcu 800 ms'de `inOut` ile baş y 200'den 420'ye iner; kulağın yanındaki sarı oklar 2'den 6'ya çıkar (6 ok, 400 ms, `out`); "basınç" yazısı belirir.

Sonra:
4. Sporcu daha derine inince kulaklarındaki baskı daha da büyür.
5. Sporcular bu sorunu çözmek için özel teknikler kullanır.

### Sahne 3 · Üstteki su ağırlığıyla basar

Tahta: su kütlesi (kap) x 110–890, y 150–520; kap duvarları gri 6 birim (x 110 ve 890, taban y 520); yüzey y = 150. Üç nokta: A (x 250, y 230), D (x 500, y 320), B (x 750, y 410). Her noktada 60 birimlik turkuaz yatay çizgi (küçük yüzey) ve harfi. Her noktanın üstünde yüzeye kadar 60 birim genişliğinde kesikli açık gri dikdörtgen: su sütunu (yükseklikleri A 80, D 170, B 260). Sütunun içinde turuncu ağırlık oku, ucu turkuaz çizgide biter (aşağı): A 40, D 85, B 130 birim. Her noktanın sağında (x + 60) sarı basınç çubuğu, 18 birim genişlikte, noktanın y'sinden yukarı: A 32, D 68, B 104 birim. A ve B önce gelir; D "Birlikte çöz" için bekler.

Anlatım:
1. Sıvılar, ağırlıkları nedeniyle bulundukları yüzeye basınç uygular.
2. Sıvı, değdiği her yüzeye basınç uygular; kulağa da.
3. A noktasının üstünde yüzeye kadar bir su sütunu var.
4. Bu sütunun ağırlığı, A noktasındaki küçük yüzeye biner.
5. B noktası daha derindedir; üstünde daha yüksek bir sütun var.
6. Yüksek sütun daha ağırdır; aynı yüzeye daha çok ağırlık biner.
7. Aynı yüzeye daha büyük ağırlık binerse basınç artar.
8. B noktasındaki basınç, A noktasındakinden büyüktür.

Hareket: 3. cümlede A'nın sütunu 500 ms'de `out` ile belirir; 4. cümlede A'nın turuncu oku (400 ms, `out`) ve sarı çubuğu (600 ms, `out`) gelir. 5. cümlede aynı sırayla B'nin sütunu, oku ve çubuğu belirir (B'nin çubuğu 600 ms'de `out` ile 104 birime uzar). Altta, 6–8. cümleler okunurken A'nın ve B'nin sütun yükseklikleri yan yana gösterilir: "alçak sütun · küçük basınç" (A'nın altında), "yüksek sütun · büyük basınç" (B'nin altında).

Birlikte çöz (`tag: 'Birlikte çöz'`): D noktası belirir (sütun, ok ve "?" yazısı; çubuk yok). D noktasındaki basınç nasıldır? **A'dan büyük, B'den küçük** / A'dan küçük / B'den büyük. Dayandığı anlatım: 3–8. İpuçları: "D'nin üstündeki sütun A'nınkinden yüksek, B'ninkinden alçak." · "Yüksek sütun, büyük ağırlık, büyük basınç."

Gör: D'nin sarı çubuğu 600 ms'de `out` ile 68 birime uzar (A'nınkiyle B'ninkinin arası); "?" yerine "orta" yazılır.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir gölde bir balık yüzeye yakın, bir balık dipte yüzüyor. Hangisine uygulanan basınç daha büyüktür? **Dipteki balığa** / Yüzeye yakın balığa / İkisine de aynı. Dayandığı anlatım: 3–8. İpuçları: "Hangisinin üstünde daha yüksek bir su sütunu var?" · "Yüksek sütun daha ağırdır."

Gör: üç noktanın (A, D, B) yanına göldeki iki balığın yerleri işaret edilir: yüzeye yakın balık A'nın hizasında, dipteki B'nin hizasında; balıkların yanında sarı çubuklar A ve B'ninkiyle aynı boyda.

### Sahne 4 · Basınç neye bağlı?

Tahta: üç panel yan yana: x 40–330, 355–645, 670–960; hepsi y 90–470. Panel başlıkları (22 birim, y 120): "derinlik (h)", "yoğunluk (d)", "yer çekimi ivmesi (g)". Her panelde iki dar kap yan yana (genişlik 80; tabanları y 400); her kabın altında turuncu ağırlık oku (sütunun ağırlığı) ve sarı basınç çubuğu (genişlik 16, tabandan yukarı).
- Panel 1: aynı sıvı, sıvı yüksekliği 80 ve 160; ağırlık okları 40 ve 80; çubuklar 30 ve 60 birim. Yükseklik yanında açık gri ölçü çizgisi ve "h".
- Panel 2: aynı yükseklik (120); sol kapta açık mavi sıvı ("d"), sağ kapta koyu mavi sıvı ("2d"); ağırlık okları 60 ve 120; çubuklar 45 ve 90.
- Panel 3: aynı yükseklik (120) ve aynı sıvı; sol kabın altında "Ekvator", sağ kabın altında "kutup"; ağırlık okları 60 ve 66; çubuklar 45 ve 50.
Paneller sırayla belirir (her biri 500 ms, `out`); önceki panel 0,45 saydamlığa iner.

Anlatım:
1. Sıvı basıncı üç şeye bağlıdır: derinliğe, yoğunluğa, yer çekimi ivmesine.
2. Derinlik, bir noktanın sıvının serbest yüzeyinden dik uzaklığıdır.
3. Derinlik (h) arttıkça sütun ağırlaşır, basınç artar.
4. Sıvının yoğunluğu (d) büyükse aynı sütun daha ağırdır.
5. Yer çekimi ivmesi (g) büyükse sütunun ağırlığı da büyür.
6. Kutuplarda g biraz büyüktür; Ekvator'da biraz küçüktür.
7. Derinlik, yoğunluk ya da g arttıkça sıvı basıncı artar.

Hareket: 2. cümlede panel 1'de sıvı yüzeyinden kabın içindeki bir noktaya inen açık gri dik çizgi belirir (400 ms, `out`), yanında "h". 3. cümlede panel 1'in okları ve çubukları 600 ms'de `out` ile uzar. 4. cümlede panel 2, 5–6. cümlede panel 3 aynı biçimde gelir.

Defter ("Sıvı basıncı"): **Basınç; derinliğe, yoğunluğa ve g'ye bağlıdır.** Örnek: derin dalış, büyük basınç.

### Sahne 5 · Vurgun ve sağlık

Tahta: solda (x 60–460) üç satırlık liste, her satır 400 × 60 birim çerçeve: "dalgıç elbisesi" (y 120–180), "dalış tüpü" (y 200–260), "ağırlık takımı" (y 280–340). Sağda (x 520–940) basınç odası: yatay silindir (x 540–920, y 150–290, gri çizgi), içinde üç yuvarlak pencere (r 22; x 620, 730, 840; y 220). Altında iki yazı (y 340 ve 380): "vurgun", "basınç odası".

Anlatım:
1. Derin dalış, derinliğe uygun teknik ve teçhizat ister.
2. Dalgıçlar dalgıç elbisesi, dalış tüpü ve ağırlık takımı kullanır.
3. Çıkarken nefes tutulursa akciğerler zarar görebilir.
4. Vurgun, ani basınç değişiminde vücutta gaz kabarcıkları oluşmasıdır.
5. Vurgun geçirenler hemen basınç odasında tedavi edilmelidir.
6. Tedavide yüksek basınçlı oksijen kullanılır.

Hareket: 2. cümlede üç çerçeve 300 ms arayla sırayla belirir (her biri 300 ms, `out`). 4. cümlede "vurgun" yazısı belirir (400 ms, `out`). 5. cümlede basınç odası 600 ms'de `out` ile belirir ve "basınç odası" yazısı gelir.

Soru (`tag: 'Sıra sende'`): Bir dalgıç yüzeye çıkarken nefesini tutuyor. Ne olabilir? **Akciğerleri zarar görebilir** / Hiçbir sorun olmaz; nefes tutmak güvenlidir / Dalış tüpü kendiliğinden patlar. Dayandığı anlatım: 3. İpuçları: "Çıkarken nefes tutulursa hangi organ zarar görür?" · "Nefes yollarındaki sorun akciğerleri etkiler."

### Sahne 6 · Denizaltının penceresi

Tahta: su (mavi) x 60–940, y 120–520. Turistik denizaltı yandan: gövde yatay elips (x 330–670, y 240–330, açık gri çizgi); üç yuvarlak pencere (r 18; x 410, 500, 590; y 285, açık çizgi). Pencerelere ve gövdeye doğru sarı oklar (her biri 30 birim). Denizaltı önce yüzeyin hemen altında (gövdenin üstü y 140). Sağ üstte "basınç" (sarı).

Anlatım:
1. Turistik denizaltının gövdesinde pencereler vardır.
2. Su, gövdenin değdiği her yüzeye, pencerelere de basınç uygular.
3. Denizaltı indikçe pencerelere uygulanan basınç artar.
4. Pencere sayısı çoksa, bu basınca dayanması gereken yer çoğalır.

Hareket: 3. cümlede denizaltı 1000 ms'de `inOut` ile gövde üstü y 140'tan 340'a iner; sarı oklar 3'ten 8'e çıkar (400 ms, `out`).

Soru (`tag: 'Sıra sende'`; yeni durum): Gövdesinde çok pencere bulunan bir turistik denizaltı daha derine iniyor. Pencerelere uygulanan basınç nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: sahne 3 anlatım 7–8; bu sahne 2–3. İpuçları: "Daha derin, üstünde daha yüksek bir su sütunu demek." · "Su pencerelere de basınç uygular."

### Sahne 7 · Artır mı, azalt mı?

Tahta: üstte iki kutu başlığı (x 80–480 "Basıncı artırır", x 520–920 "Basıncı azaltır"; y 60–110). Ortada (y 150–330) sıradaki kartın şematik çizimi (300 × 180 çerçeve içinde): iki kap, ortada oklar. Yerine oturan kartın adı kutusunun altına yazılır (22 birim, alt alta; kart 500 ms'de `inOut` ile kutusuna küçülerek gider). Önce iki örnek anlatımla yerleştirilir, sonra üç kartı öğrenci yerleştirir.

Anlatım:
1. Basıncı artırmak için derinliği, yoğunluğu ya da g'yi artırırız.
2. Kaba aynı sıvıdan eklemek derinliği artırır; basınç artar.
3. Suya tuz atmak yoğunluğu artırır; basınç artar.
4. Derinliği ya da yoğunluğu azaltınca basınç azalır.

Dene (`tag: 'Dene'`; kart başına seçim). Soru kalıbı: "<kart> kabın tabanındaki basıncı artırır mı, azaltır mı?" Yanlışta ipucu: "Derinlik, yoğunluk ya da g hangisi değişiyor?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Kaba aynı sıvıdan eklemek | artırır | Evet. Derinlik arttı; sütun ağırlaştı. |
| Sıvıya tuz atıp yoğunluğunu artırmak | artırır | Evet. Aynı sütun daha ağır oldu. |
| Kabı kutuplara götürmek | artırır | Evet. Kutuplarda g biraz büyüktür. |
| Kaptan sıvı alıp derinliği azaltmak | azaltır | Evet. Derinlik azaldı; sütun hafifledi. |
| Kabı Ekvator'a götürmek | azaltır | Evet. Ekvator'da g biraz küçüktür. |

Sonra:
5. Sıvıda ne kadar derine inersen basınç o kadar büyür.

### Çıkış soruları

1. (yeni durum) Bir gölde iki dalgıç var: biri 3 metrede, öteki göl tabanına yakın. Hangisi daha büyük basınç altındadır? **Göl tabanına yakın olan; üstünde daha yüksek sütun var** / 3 metredeki; çünkü yüzeye yakındır / İkisi de aynı basınç altındadır. (sahne 3)
2. (yeni durum) Aynı derinlikte, biri tatlı su dolu, öteki çok tuzlu su dolu iki gölün dibinde basınç ölçülüyor. Tuzlu suyun yoğunluğu daha büyüktür. Hangisinde basınç büyüktür? **Tuzlu gölde** / Tatlı gölde / İkisinde de aynıdır. (sahne 4)
3. (yanılgı) Biri ağır, biri hafif iki dalgıç aynı denizde aynı derinliğe iniyor. Kulaklarındaki basınç için hangisi doğrudur? **Aynıdır; sıvı basıncı derinliğe, yoğunluğa ve g'ye bağlıdır** / Ağır olanda daha büyüktür / Hafif olanda daha büyüktür. (sahne 3, 4)
4. Vurgun nedir? **Ani basınç değişiminde vücutta gaz kabarcıkları oluşmasıdır** / Kulakta dolgunluk hissi oluşmasıdır / Dalış sırasında nefesin tükenmesidir. (sahne 5)
5. (yeni durum) Aynı sıvı, aynı derinlik: kabın tabanındaki basınç Ekvator'da ve kutupta ölçülüyor. Hangisi doğrudur? **Kutupta biraz daha büyüktür** / Ekvator'da biraz daha büyüktür / İkisinde de tam aynıdır. (sahne 4)

Özet: Sıvıda derine inildikçe, üstteki su sütununun ağırlığı arttığı için basınç artar. · Basınç; derinliğe, sıvının yoğunluğuna ve yer çekimi ivmesine bağlıdır. · **Sıvıda ne kadar derine inersen basınç o kadar büyür.**

## B2 · Deneyle modele: durgun sıvının basıncı

- **Fikir:** Değişkenler teker teker değiştirilip ölçümler kaydedilince durgun sıvı basıncının matematiksel modeli bulunur; model P = h·d·g'dir ve onunla çıkarım yapılır.
- **Giriş ekranı sorusu:** Baraj duvarları neden aşağıya doğru kalınlaşır?
- **Kaynak:** Ders kitabı s. 147–148 (Etkinlik 2, basamak 7–13: hipotez, deney tasarımı, veri tablosu, model, çıkarım; kitap düzenek, malzeme ve ölçüm vermez), s. 149 (türetme P = G/A, V = A·h, m = d·V, G = m·g → P = h·d·g; birimler; "derinlikle doğru orantılı"; kabın şekline ve kesit alanına bağlı değil; Görsel 3.6), s. 150 (kabın yüzeylerine basınç; Örnek), s. 151 (5. Alıştırma: eşit basınç, hacimleri farklı üç özdeş silindir), s. 152 (6. Alıştırma: barajın alt duvarları daha kalın; Kontrol Noktası: şekle ve miktara bağlı değil, yan yüzeylere de basınç), s. 153 (2. Çalışma Yaprağı 1 ve 3: pet şişe), Suyun yoğunluğu 1.000 kg/m³ (s. 62), g = 9,8 m/s² (s. 164, 175).
- **Örnek veri:** Basınç `P = h·d·g` ile hesaplanır (g = 9,8 m/s², su 1.000 kg/m³); ikinci hesap parantezde.
  - Derinlik (su): h = 0,1 m → 0,1 · 1.000 · 9,8 = 980 Pa (0,1 · 9,8 = 0,98; · 1.000 = 980). h = 0,2 m → 1.960 Pa (0,2 · 9,8 = 1,96; · 1.000 = 1.960). h = 0,4 m → 3.920 Pa (0,4 · 9,8 = 3,92; · 1.000 = 3.920). Oranlar: 0,1 → 0,2 ikiye katlanır, 980 → 1.960 ikiye katlanır; 0,1 → 0,4 dörde katlanır, 980 → 3.920 dörde katlanır.
  - Sıvı türü (h = 0,2 m): su (d) 1.960 Pa; sıvı L (2d) 3.920 Pa (0,2 · 2.000 · 9,8 = 3.920; 2 · 1.960 = 3.920); sıvı M (3d) 5.880 Pa (0,2 · 3.000 · 9,8 = 5.880; 3 · 1.960 = 5.880). Yazıda yoğunluk "d, 2d, 3d" olarak kalır; 2.000 ve 3.000 yazılmaz.
  - Kabın şekli (su, h = 0,3 m): üç kapta da 2.940 Pa (0,3 · 1.000 · 9,8 = 2.940; 0,3 · 9,8 = 2,94; · 1.000 = 2.940).
  - Veri çözümlemesi: 980 ÷ (0,1 · 1.000) = 9,8; 1.960 ÷ (0,2 · 1.000) = 9,8; 3.920 ÷ (0,4 · 1.000) = 9,8.
  - Çıkarım örnekleri (oranla; değer yerine koyma yok): 0,1 m 980 Pa → 0,5 m 4.900 Pa (5 · 980; denetim 0,5 · 1.000 · 9,8 = 4.900). Birlikte çöz: 0,5 m, sıvı 2d → 9.800 Pa (2 · 4.900). Sıra sende: 0,4 m 3.920 Pa → 0,8 m 7.840 Pa (2 · 3.920).
  - Dene: P = h · k · 9.800 (k = 1, 2, 3 yoğunluk katı): 0,2 m, k = 1 → 1.960; 0,6 m, k = 1 → 5.880 (3 · 1.960 = 5.880); 0,4 m, kap fark etmez → 3.920; 0,2 m, k = 3 → 5.880.
- **Sınır:** Kabın yan yüzeylerine etki eden kuvvet hesaplanmaz; tabana etki eden kuvvet (F = P·A) de bu derste hesaplanmaz. Tek adımlı çarpmanın dışında hesap yok. g değiştirilmez; yalnızca anlatımda kutup ve Ekvator anılmaz (B1). Başka sıvının yoğunluğu sayıyla yazılmaz.
- **Düzenek (kitap dışı, `PLAN.md` karar 19b; `dersler/b-araclar.js`):** Ela'nın sıvı kabı ve gezdirilen basınçölçer. Kap iç x 80–480, sıvı yüzeyi y = 130, kap tabanı y = 550 (derinlik ölçeği: 1 m = 500 birim; 0,1 m = 50 birim). Ekran kabın üstünde x 80–480, y 30–90; okuma sarı, 36 birim ("980 Pa"). Sonda: sıvıya yüzeyin üstünden inen 2 birimlik açık gri çubuk (x 280); ucunda r 14 daire, sarı çerçeve. Sol kenarda derinlik cetveli (x 60, her 0,1 m'de 12 birimlik çentik; yalnızca kullanılan değerler yazılır, 22 birim). Sonda 700 ms'de `inOut` ile iner; ekran değeri sonda durunca 300 ms'de `out` ile belirir.
- **Güç kavramlar ve gösterimi:** (1) Değişken kontrolü: değişen etiket vurgulanır (beyaz çerçeve), sabit tutulanlar gri etiket "sabit". (2) Şekil ve miktar etkisizliği: üç farklı kap yan yana, aynı yükseklik çizgisi, üç ekranda aynı değer. (3) Model: veri tablosunun dördüncü sütunu hep 9,8 çıkar; sonra aynı sayının g olduğu ağırlıktan türetilir.
- **Hedeflenen yanılgı:** "Geniş kapta ya da çok sıvıda basınç daha büyüktür."
- **Akılda kalıcı cümle:** Bir değişkeni değiştir, ötekileri sabit tut; ilişki kendini gösterir.

### Sahne 1 · Hatırla

İki soru, `tag: 'Hatırla'`; anlatım yok.

1. (B1) Sıvıda derine inildikçe basınç nasıl değişir? **Artar** / Azalır / Değişmez. İpuçları: "Derindeki noktanın üstünde daha yüksek bir su sütunu var." · "Sporcu indikçe kulağındaki baskı artıyordu." Doğru geri bildirimi: "Evet. Yüksek sütun ağır, ağır sütun büyük basınç."
2. (A2) Yatay zeminde duran bir cismin zemine yaptığı basınç hangi bağıntıyla bulunur? **P = G / A** / P = G · A / P = A / G. İpuçları: "Basınç, kuvvetin yüzey alanına bölümüdür." · "Yatay zeminde kuvvet cismin ağırlığıdır." Doğru geri bildirimi: "Evet. Basınç, ağırlığın yüzey alanına bölümüdür."

### Sahne 2 · Deneyi tasarla

Tahta: Ela'nın kabı (düzenek). Sıvı su (mavi), ekran "— Pa" (gri). Sağda üç kart (x 560–940, her biri 380 × 70; y 140, 230, 320): "derinlik", "sıvının türü", "kabın şekli". Kartların altında iki kutu (x 560–740 ve 760–940, y 420–500): "Değişir", "Sabit kalır".

Anlatım:
1. Ela, durgun sıvının basıncına neyin etki ettiğini ölçmek istiyor.
2. Sıvıya daldırılan bir basınçölçer, o noktadaki basıncı gösterir.
3. Sondanın serbest yüzeyden dik uzaklığı, derinliktir.
4. Deneyde bir değişken değiştirilir, ötekiler sabit tutulur.
5. Böylece basıncın değişmesinin nedeni, değiştirilen değişkendir.
6. İlk deneyde Ela derinliği değiştiriyor.

Hareket: 2. cümlede sonda yüzeyin hemen altına, 0,1 m'ye iner (700 ms, `inOut`), ekran "980 Pa" gösterir. 3. cümlede sondadan yüzeye dik beyaz kesikli çizgi çıkar (400 ms, `out`), yanında "derinlik". 6. cümlede kartlar 300 ms arayla belirir.

Dene (`tag: 'Dene'`; kart başına seçim; deney: derinliğin etkisi). Soru kalıbı: "Ela derinliğin etkisini ölçüyor. '<kart>' deneyde değişir mi, sabit mi kalır?" Yanlışta ipucu: "Bir seferde yalnızca bir değişken değişir."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| derinlik | Değişir | Evet. Etkisi ölçülen değişken değişir. |
| sıvının türü | Sabit kalır | Evet. Hep aynı sıvıyla ölçülür. |
| kabın şekli | Sabit kalır | Evet. Hep aynı kapla ölçülür. |

Sonra:
7. Değişen tek şey derinlik olunca, ölçerdeki değişimin nedeni derinliktir.

### Sahne 3 · Derinlik ve basınç

Tahta: Ela'nın kabı (düzenek) solda. Sağda iki sütunlu tablo (x 560–900, y 130; sütunlar "Derinlik (m)" 170 ve "Basınç (Pa)" 170; başlık satırı 50, üç veri satırı 50 birim). Sonda üç derinlikte durur: 0,1 m (y 180), 0,2 m (y 230), 0,4 m (y 330).

Anlatım:
1. Ela sondayı yüzeyin 0,1 metre altına indiriyor.
2. Basınçölçer 980 pascal gösteriyor.

Tahmin (`tag: 'Tahmin et'`; hipotez): Sonda 0,2 metreye inerse ölçerin değeri nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: sahne 2 anlatım 2; B1 sahne 3 anlatım 7–8. İpuçları: "Daha derinde üstteki sütun daha yüksek." · "Yüksek sütun daha büyük basınç yapar."

Gör: sonda 700 ms'de `inOut` ile 0,2 m'ye iner (y 230); ekran "1.960 Pa" gösterir; sonra 0,4 m'ye iner (y 330); ekran "3.920 Pa" gösterir. Her duruşta tablo satırı 400 ms'de `out` ile dolar: "0,1 · 980", "0,2 · 1.960", "0,4 · 3.920". Sonda ve tablodaki "derinlik" sütunu beyaz çerçeveyle vurgulanır; "sıvı" ve "kap" yazıları gri "sabit" olarak tahtanın üst kenarında durur.

Sonra:
3. Derinlik iki katına çıkınca basınç da iki katına çıktı.
4. Derinlik dört katına çıkınca basınç da dört katına çıktı.
5. Basınç, derinlikle doğru orantılıdır.

Tahtada son satır (y 500): "derinlik ↑ → basınç ↑ (doğru orantı)" ("basınç" sarı).

### Sahne 4 · Sıvı türü ve basınç

Tahta: üç kap yan yana (iç x 80–300, 390–610, 700–920; yüzey y = 180, taban y = 480). Sıvılar: sol açık mavi "su · d", orta orta mavi "sıvı L · 2d", sağ koyu mavi "sıvı M · 3d" (etiketler 22 birim, kapların altında y 510). Her kapta sonda aynı derinlikte, 0,2 m'de (y 280); derinlik 0,2 m kesikli beyaz çizgiyle üç kapta aynı hizada gösterilir ("0,2 m" solda). Ekranlar kapların üstünde (y 60–120; 28 birim sarı). Önce yalnızca sol kap ve ekranı (1.960 Pa) görünür.

Anlatım:
1. Şimdi Ela derinliği 0,2 metrede sabit tutuyor, sıvıyı değiştiriyor.
2. Birinci kapta su var; yoğunluğu d.
3. İkinci kaptaki sıvının yoğunluğu 2d, üçüncününki 3d.
4. Ölçerler 1.960, 3.920 ve 5.880 pascal gösteriyor.
5. Yoğunluk iki katına çıkınca basınç da iki katına çıkıyor.
6. Yoğunluk üç katına çıkınca basınç da üç katına çıkıyor.
7. Basınç, yoğunlukla doğru orantılıdır.

Hareket: 3. cümlede orta ve sağ kap soldan sağa 500 ms'de `out` ile belirir. 4. cümlede üç ekran 300 ms arayla dolar. 5. cümlede sol ve orta ekran arasında "× 2" (beyaz, 22 birim; 400 ms, `out`), 6. cümlede sol ve sağ ekran arasında "× 3" belirir. Sıvı ve derinlik "sabit" etiketleri: derinlik gri "sabit", yoğunluk beyaz çerçeveli "değişir".

### Sahne 5 · Kabın şekli ve sıvı miktarı

Tahta: üç kap yan yana, tabanları y = 430 (iç genişlikler: sol kap tabanda 100 genişlikte x 90–190, üste doğru genişler, üstte 160 genişlik x 60–220; orta kap düz, x 290–490, genişlik 200; sağ kap tabanda 300 genişlikte x 590–890, üste doğru daralır, üstte 160 genişlik x 660–820). Kapların tabanları A, 2A, 3A (taban etiketleri turkuaz, 22 birim, y 470: "A", "2A", "3A"; taban çizgileri turkuaz kalın). Üç kapta su, aynı yükseklikte: yüzey y = 280 (h = 150 birim), yüzeyleri aynı hizada geçen kesikli beyaz çizgi ve solda "h = 0,3 m". Kapların altında "sıvı miktarı" yazıları (y 510): sol "az", orta "orta", sağ "çok". Ekranlar kapların üstünde (y 90–150; 28 birim sarı). Sondalar tabana yakın (y 420). Sıvı ve yoğunluk "sabit" etiketi.

Anlatım:
1. Ela şekilleri farklı üç kap alıyor; taban alanları A, 2A ve 3A.
2. Hepsine aynı sıvıdan, 0,3 metre yüksekliğe kadar dolduruyor.
3. Sağdaki kapta en çok sıvı, en geniş taban var.

Tahmin (`tag: 'Tahmin et'`; hedeflenen yanılgı): Ela basınçölçerleri kapların tabanına indiriyor. Tabandaki basınç nasıl olur? **Üç kapta da aynı** / Sağdaki kapta daha büyük / Soldaki kapta daha büyük. Dayandığı anlatım: sahne 3 anlatım 5; sahne 4 anlatım 7; B1 sahne 4 anlatım 1, 7. İpuçları: "Basınç hangi üç şeye bağlıydı?" · "Üç kapta derinlik, yoğunluk ve g aynı."

Gör: üç sonda 700 ms'de `inOut` ile tabana iner; üç ekran birlikte 300 ms'de `out` ile "2.940 Pa" gösterir.

Sonra:
4. Üç ölçer de tabanda 2.940 pascal gösteriyor.
5. Taban alanı ve sıvı miktarı değişti; basınç değişmedi.
6. Basınç, kabın şekline ve sıvının miktarına bağlı değildir.
7. Sıvı, kabın tabanına olduğu gibi yan yüzeylerine de basınç uygular.

Hareket: 7. cümlede orta kabın sol ve sağ duvarına, farklı derinliklerde yatay sarı oklar belirir (derinlik h'nin 0,25, 0,5 ve 0,75 katında; boylar 20, 40, 60 birim; 400 ms, `out`); yalnızca yön ve boy gösterilir, sayı yazılmaz.

### Sahne 6 · Verilerden modele

Tahta: tablo (x 190–810, y 90; sütunlar "h (m)" 130, "d (kg/m³)" 170, "P (Pa)" 140, "P ÷ (h·d)" 180; başlık satırı 60, üç veri satırı 60 birim). Satırlar: 0,1 · 1.000 · 980; 0,2 · 1.000 · 1.960; 0,4 · 1.000 · 3.920. Dördüncü sütun boştur. Tablonun altında (y 400) büyük yazı alanı.

Anlatım:
1. Suyun yoğunluğu 1.000 kilogram bölü metreküptür.
2. Her satırda basıncı, h ile d'nin çarpımına bölüyoruz.
3. Bölüm her satırda aynı çıkıyor: 9,8.
4. Demek ki basınç, derinlik ile yoğunluğun çarpımının 9,8 katıdır.

Hareket: 2. cümlede dördüncü sütunun başlığı belirir (400 ms, `out`). 3. cümlede üç hücre 300 ms arayla "9,8" ile dolar (400 ms, `out`; hücreler beyaz çerçeveli). 4. cümlede altta "P = 9,8 · h · d" yazısı belirir (500 ms, `out`; "P" sarı).

### Sahne 7 · Aynı model ağırlıktan çıkar

Tahta: solda silindirik kap (iç x 90–290, y 110–470); sıvı y 150–470 (h = 320 birim), mavi; taban çizgisi turkuaz kalın (x 90–290), etiket "A"; sol kenarda dikey beyaz ok x 70, y 150–470, etiket "h"; sıvının içinde "d". Sıvının üstünde turuncu ağırlık oku sıvının ortasında (aşağı, 80 birim) ve "G". Sağda adım listesi (x 380–940; satır aralığı 80; y 110, 190, 270, 350, 430): "P = G / A", "V = A·h", "m = d·V", "G = m·g", "P = h·d·g". Renkler: P sarı, G turuncu, A turkuaz, h ve d beyaz. Son satır sarı çerçeveli.

Anlatım:
1. Silindirik bir kapta sıvının ağırlığı, tabana bastırır.
2. Basınç, ağırlığın taban alanına bölümüdür: P = G / A.
3. Sıvının hacmi, taban alanı çarpı yüksekliktir: V = A·h.
4. Kütle, yoğunluk çarpı hacimdir: m = d·V.
5. Ağırlık, kütle çarpı g'dir: G = m·g.
6. Hepsini P = G / A içine yazınca A sadeleşir.
7. Sonuç: P = h·d·g.
8. Tablodaki 9,8, yer çekimi ivmesidir: g = 9,8 m/s².
9. h metre, d kg/m³, g m/s² olunca P pascal çıkar.

Hareket: her formül satırı ilgili cümlenin başında 400 ms'de `out` ile belirir. 6. cümlede önceki dört satır 0,45 saydamlığa iner; yeni satırda A üstü çizilir (400 ms, `out`). 7. cümlede son satırın çerçevesi sarı olur.

### Sahne 8 · Modelle çıkarım

Tahta: solda Ela'nın kabı (düzenek; yüzey y = 130, taban y = 550; derinlik ölçeği 500 birim/m); sağda üç satırlık çıkarım alanı (x 480–940; satırlar y 200, 290, 380; 28 birim). Sonda derinlikleri: 0,1 m (y 180), 0,5 m (y 380), 0,4 m (y 330), 0,8 m (y 530).

Anlatım (çözülmüş örnek):
1. Model elimizdeyken ölçmeden de çıkarım yapabiliriz.
2. Ela suda 0,1 metre derinlikte 980 pascal ölçmüştü.
3. Sonda 0,5 metreye iniyor: derinlik beş katına çıktı.
4. Sıvı da yer de aynı: d ile g değişmedi.
5. Basınç da beş katına çıkar: 4.900 pascal.

Hareket: sonda 0,1 m'de başlar, ekran "980 Pa" gösterir; 3. cümlede 0,5 m'ye iner (700 ms, `inOut`); satırlar sırayla belirir (her biri 400 ms, `out`): "P = h·d·g", "h × 5 (d ve g aynı)", "P × 5 = 4.900 Pa"; ekran "4.900 Pa" gösterir.

Birlikte çöz (`tag: 'Birlikte çöz'`): sonda yine 0,5 m'de; Ela kaptaki suyu, yoğunluğu suyun iki katı olan bir sıvıyla değiştiriyor (sıvının rengi koyulaşır, 500 ms). Tahtada "P = h·d·g" ve "d × 2 (h ve g aynı)" yazılıdır, üçüncü satır "P × ?". Basınç ne olur? **İki katına çıkar: 9.800 Pa** / Değişmez: 4.900 Pa / Dört katına çıkar: 19.600 Pa. Dayandığı anlatım: sahne 4; sahne 7 anlatım 7; bu sahne 1–5. İpuçları: "Modelde yalnızca d değişti; h ve g aynı." · "d iki katına çıktı; basınç da aynı oranda değişir."

Gör: ekran "9.800 Pa" gösterir; "P × ?" yerine "P × 2 = 9.800 Pa" yazılır.

Soru (`tag: 'Sıra sende'`): Kapta yine su var. Sonda 0,4 metre derinlikte 3.920 pascal gösteriyor. Ela sondayı 0,8 metreye indirirse ekran ne gösterir? **7.840 Pa** / 3.920 Pa / 1.960 Pa. Dayandığı anlatım: bu sahne 1–5. İpuçları: "Derinlik iki katına çıktı; sıvı aynı." · "Derine inince basınç azalmaz." (3.920 · 2 = 7.840; denetim: 0,8 · 1.000 · 9,8 = 7.840)

Gör: sonda 0,8 m'ye iner (y 530); ekran "7.840 Pa" gösterir.

Not: program modelle ilgili örnekleri "değişkenlerin ilişkilerine yönelik yorumlamalarla" sınırlar. Bu sahnede değer yerine koyarak hesap yapılmaz; çıkarım ölçülmüş bir değerden oranla yürür (ana oturum düzeltmesi, 12 Ekim 2026).

Defter ("Sıvı basıncı"): **P = h·d·g** Örnek: derinlik iki katı, basınç iki katı.

### Sahne 9 · Baraj duvarı

Tahta: solda baraj gölü, mavi (x 60–470, y 180–500; yüzey y = 180). Baraj duvarı: sol yüzü dik, x = 470 (y 180–500); sağ yüzü eğik, üstte x 530 (y 180), altta x 670 (y 500); duvar açık gri çizgi, içi 0,2 saydam gri dolgu. Suya değen yüzde (x 470) dört derinlikte sarı yatay oklar duvara doğru (ucu x 470'te): y 220 → 20 birim, y 300 → 60, y 380 → 100, y 460 → 140 birim; oklar derinliğin (yüzeyden uzaklık 40, 120, 200, 280) yarısı kadardır. Duvarın üstünde "baraj duvarı", gölün üstünde "su" (22 birim).

Anlatım:
1. Barajlar, nehrin akışını durdurup suyu bir gölde toplar.
2. Su, baraj duvarının suya değen yüzüne basınç uygular.
3. Derinlik arttıkça basınç artar; oklar aşağı doğru uzar.
4. Alt duvara üst duvardan daha büyük basınç biner.

Hareket: 2. cümlede ilk ok (y 220) belirir; 3. cümlede öteki üç ok sırayla aşağı doğru 300 ms arayla belirir (400 ms, `out`).

Tahmin (`tag: 'Tahmin et'`; çıkarım): Barajın alt duvarı üst duvarından daha kalın yapılır. Neden? **Alt duvara daha büyük basınç biner** / Alt duvara daha küçük basınç biner / Su yalnızca üst duvara basınç uygular. Dayandığı anlatım: 2–4; sahne 3 anlatım 5; sahne 5 anlatım 7. İpuçları: "Okların boyuna bak: aşağıda ne olmuş?" · "Daha büyük basınca dayanmak için duvar kalınlaşır."

Gör: duvarın altındaki kalınlık çizgisi (x 470–670, 200 birim) ve üstteki (x 470–530, 60 birim) açık gri çizgilerle gösterilir (400 ms, `out`).

Sonra:
5. Büyük basınca dayanmak için barajların alt duvarı daha kalın yapılır.

### Sahne 10 · Delikli şişe

Tahta: iki şişe yan yana, düz vektör, su mavi. Sol şişe (Şekil I): x 180–300, y 130–470, su yüzeyi y 150; yan yüzünde iki delik aynı seviyede (y 230; sol ve sağ yüz). Sağ şişe (Şekil II): x 640–760, y 130–470, su yüzeyi y 150; sağ yüzünde üç delik üst üste (A y 180, B y 230, C y 280). Zemin çizgisi y 470 (x 60–940). Sudan oluşan akıntılar mavi eğri: Şekil I'de iki akıntı zemine yatay 110 birim uzaklığa düşer (sol ve sağ); Şekil II'de A 75, B 111, C 126 birim uzağa düşer. Deliklerin yanında harfler (22 birim). Akıntılar önce yok; cümleyle birlikte çizilir (her biri 700 ms, `linear` çizim).

Anlatım:
1. Su dolu bir şişenin yan yüzünde delikler açılıyor.
2. Basınç, yan yüzeylerde de derinliğe bağlıdır.
3. Aynı seviyedeki deliklerde derinlik aynıdır; basınç da aynıdır.
4. Bu yüzden sular aynı uzaklığa düşer.
5. Düşey sıralı deliklerin derinlikleri farklıdır; basınçları da farklıdır.
6. Derindeki delikte basınç büyüktür; su daha uzağa fışkırır.

Hareket: 3–4. cümlelerde Şekil I'in iki akıntısı çizilir. 5–6. cümlelerde Şekil II'nin üç akıntısı A'dan C'ye 300 ms arayla çizilir; sarı oklar deliklerde, boylar A 15, B 40, C 65 birim (derinliğin yarısı kadar).

Soru (`tag: 'Sıra sende'`): Şekil II'de hangi delikte basınç en büyüktür? **C deliğinde** / A deliğinde / Üç delikte de aynıdır. Dayandığı anlatım: 2, 5. İpuçları: "Hangi delik serbest yüzeyden en uzak?" · "Derinlik arttıkça basınç artar."

### Sahne 11 · Kendin dene

Tahta: Ela'nın kabı (düzenek; kap genişliği seçilen kaba uyar). Sağda üç denetim (x 560–940): "derinlik" kaydırıcısı (y 160; 0,1–0,8 m, adım 0,1 m), "sıvı" düğmeleri (y 260; d · 2d · 3d), "kap" düğmeleri (y 360; K · L · M; Sahne 5'teki üç kabın küçük çizimleri). Ekranda basınç `P = h · k · 9.800` ile çıkar (k = 1, 2, 3; yazıda gösterilmez).

Anlatım:
1. Şimdi derinliği, sıvıyı ve kabı sen değiştir.
2. Her denemede bir değişkeni değiştir, ötekileri sabit tut.

Üç deneme (`tag: 'Dene'`; her biri tahmin → değiştir → gör):
1. Su, L kabı; derinliği 0,2 metreden 0,6 metreye çıkar (1.960 → 5.880 Pa). Basınç kaç katına çıkar? **3 katına** / 2 katına / 6 katına. İpucu: "0,6, 0,2'nin kaç katı?"
2. Su, 0,4 metre; kabı K'dan M'ye değiştir (3.920 Pa → 3.920 Pa). Basınç nasıl değişir? **Değişmez** / M'de artar / M'de azalır. İpucu: "Kabın şekli basıncı etkilemez."
3. L kabı, 0,2 metre; sıvıyı d'den 3d'ye değiştir (1.960 → 5.880 Pa). Basınç kaç katına çıkar? **3 katına** / 2 katına / Değişmez. İpucu: "Yoğunluk üç katına çıktı."

### Çıkış soruları

1. (yeni durum, yanılgı) Geniş bir gölle dar bir kuyu aynı derinlikte, ikisi de su dolu. Dipteki basınçlar için hangisi doğrudur? **Aynıdır; basınç şekle ve miktara bağlı değildir** / Gölde büyüktür; daha çok su var / Kuyuda büyüktür; su dar yerde sıkışır. (sahne 5)
2. (yeni durum) Aynı denizde bir dalgıç 5 metreden 15 metreye iniyor. Çevresindeki basınç nasıl değişir? **3 katına çıkar** / 2 katına çıkar / Değişmez. (sahne 3; 15 ÷ 5 = 3)
3. (yeni durum) Yoğunluğu d olan suyun 0,4 metre derinliğindeki basınç, yoğunluğu 2d olan bir sıvının kaç metre derinliğindeki basınca eşittir? **0,2 metre** / 0,4 metre / 0,8 metre. (sahne 3, 4; 0,2 · 2d = 0,4 · d)
4. Özdeş üç silindirin tabanlarındaki basınç eşit. K silindirinde sıvı en yüksek, M'de orta, L'de en alçak. Sıvıların yoğunlukları nasıl sıralanır? **L > M > K** / K > M > L / Hepsi eşit. (sahne 7; P eşit ve h·d sabit ⇒ h büyükse d küçük)
5. (yeni durum) Su dolu bir deponun yan duvarında biri üstte, biri altta iki delik açılıyor. Hangi delikte basınç daha büyüktür? **Alttaki** / Üstteki / İkisinde aynı. (sahne 10)

Özet: Değişkenler teker teker değiştirilince veriler modeli gösterir. · Durgun sıvının basıncı P = h·d·g'dir; kabın şekline ve sıvı miktarına bağlı değildir. · **Bir değişkeni değiştir, ötekileri sabit tut; ilişki kendini gösterir.**

## B3 · Sıvı basıncıyla çalışan sistemler

- **Fikir:** Kapalı kaptaki sıvıya uygulanan basınç her noktaya eşit iletilir (Pascal Yasası); su cendereleri ve hidrolik sistemler bu yüzden küçük bir kuvvetle büyük bir yükü taşır.
- **Giriş ekranı sorusu:** Oto tamircisi tek eliyle bir kola bastırıp koca bir arabayı nasıl kaldırır?
- **Kaynak:** Ders kitabı s. 156 (Pascal Yasası'nın ifadesi, sıkıştırılamazlık, Blaise Pascal'ın adı), s. 157 (su cenderesi: iki piston, boruyla bağlı, küçük pistona F, büyük pistonda aynı basınç, A₂ > A₁ olduğundan büyük kuvvet; Görsel 3.15), s. 158 (sistem şeması: hidrolik fren, hidrolik pres, hidrolik direksiyon; hidrolik lift, vinç, itfaiye merdiveni, kepçeler, damperli kamyon; hidrolik lift örneği ve çözümü), s. 160 (Kontrol Noktası: balon, "basınç değişiminin eşit olduğu", su cenderesi), s. 154 (hidrolik kriko, forklift), s. 154–155 (kepçe, damperli kamyon, hidrolik pres, itfaiye merdiveni, hastane yatağı, berber koltuğu görselleri), s. 150 (F = P·A), s. 146 (su cenderesi ve fren görselleri).
- **Örnek veri:** yok; bu derste sayı kullanılmaz (`PLAN.md` karar 6). Çizimlerdeki oklar ve genişlikler şematiktir; oranlar tahtaya yazılmaz.
- **Sınır:** F₁/A₁ = F₂/A₂ bağıntısı ve sayısal örnek yok. Büyük pistonun daha az yol aldığı, enerji ve iş yok (kitapta yok). Birleşik kaplar, U borusu, su kulesi, patlayan fıçı deneyi, arıtma tesisi, barometre ve basınç ölçme araçları, tulumba ve pompalar alınmaz (program anmıyor). Sistemler hesapsız, işleyişi Pascal Yasası'yla anlatılır.
- **Düzenek (`dersler/b-araclar.js`):** Su cenderesi, yandan görünüş: küçük silindir x 180–280, büyük silindir x 520–820, ikisi y 200–470; bağlantı borusu x 280–520, y 440–470. Sıvı mavi: pistonların altından y 395 – 470 ve boru. Pistonlar aynı seviyede, y 380–395 (gri). Pistonların alt kenarları turkuaz kalın çizgi (100 ve 300 birim), etiketleri "A₁" ve "A₂". Sıvıda pistonların hemen altında yukarı doğru sarı basınç okları, hepsi 30 birim boyunda (y 440 → 410): küçük pistonun altında 2 ok (x 205, 255), büyük pistonun altında 6 ok (x 545, 595, 645, 695, 745, 795).
- **Güç kavramlar ve gösterimi:** (1) Aynı basınç, farklı kuvvet: iki pistonda eşit boylu basınç okları, ama büyük pistonda 6, küçükte 2 tane; kuvvet okları (turuncu) basınç oklarının sayısıyla orantılı çizilir (F 50 birim, G 150 birim). (2) Eşit olan, basınçtaki artıştır: ölçerlerin ibreleri aynı kadar döner; derinlik farkı nedeniyle ibre başlangıçları farklıdır. (3) Sıvının rolü: bir uçtaki bastırmanın öbür uca sıvı yoluyla taşınması; ok zinciri pistondan piston.
- **Hedeflenen yanılgı:** "Büyük pistondaki basınç daha büyüktür" ve "sıvı kuvveti kendiliğinden büyütür".
- **Akılda kalıcı cümle:** Sıvı, bir uçtaki bastırmayı öbür uca taşır.

### Sahne 1 · Hatırla

İki soru, `tag: 'Hatırla'`; anlatım yok.

1. (B2) Sıvı, içinde bulunduğu kabın hangi yüzeylerine basınç uygular? **Temas ettiği bütün yüzeylerine** / Yalnızca tabanına / Yalnızca yan duvarlarına. İpuçları: "Sıvı tabana da yan yüzeylere de basar." · "Delikli şişede su yan yüzden fışkırıyordu." Doğru geri bildirimi: "Evet. Sıvı, değdiği her yüzeye basınç uygular."
2. (A2) Aynı kuvvet iki kat büyük bir yüzeye etki ederse basınç nasıl değişir? **Yarıya iner** / İki katına çıkar / Değişmez. İpuçları: "Basınç, kuvvetin yüzey alanına bölümüdür." · "Bölen büyüyünce bölüm küçülür." Doğru geri bildirimi: "Evet. P = F / A; A iki katına çıkınca P yarıya iner."

### Sahne 2 · Basınç her yöne iletilir

Tahta: kapalı kap, iç x 330–670, y 200–470, duvarlar açık gri 6 birim; tepesinde pistonu: x 340–660, y 200–220 (gri). Sıvı mavi, y 220–470. Pistonun üstünde turuncu kuvvet oku (aşağı, 70 birim, y 120–190, "kuvvet"; önce yok). Üç ibreli ölçer (daire r 24; ibre yukarıya bakar = 0°): tabanda (x 500, y 470), sol duvarda (x 330, y 345), sağ duvarda (x 670, y 345). Merkezde (500, 345) sekiz sarı ok, her biri 40 birim, sekiz yöne (önce yok).

Anlatım:
1. Kapalı bir kapta sıvı var; pistona bastırıyoruz.
2. Pistona uygulanan kuvvet, sıvının basıncını artırır.
3. Üç ölçerin ibresi de aynı kadar ilerliyor.
4. Kapalı kaptaki sıvıya dışarıdan basınç uygulandığında, bu basınç her yönde iletilir.
5. Basınç, sıvının her noktasına ve kabın iç yüzeyine eşit büyüklükte iletilir.
6. Eşit olan, basınçtaki artıştır.
7. Yasayı ilk olarak bilim insanı Blaise Pascal ortaya koymuştur.
8. Bu kurala Pascal Yasası denir.
9. Sıvılar sıkıştırılamaz kabul edilir.

Hareket: 2. cümlede turuncu ok 400 ms'de `out` ile belirir; sıvıdaki merkezden sekiz sarı ok 400 ms'de `out` ile belirir. 3. cümlede üç ibre 600 ms'de `inOut` ile 0°'den 30°'ye döner (pistonun sıvıya yaptığı basınç artışı üçünde de aynıdır; piston yerinde durur). 8. cümlede tahtanın üstünde "Pascal Yasası" yazısı belirir (400 ms, `out`).

Soru (`tag: 'Sıra sende'`; yeni durum): Tamamen su dolu, kapalı bir balonu parmağınla bir yerinden bastırıyorsun. Balonun içinde basınç artışı nasıl olur? **Her noktaya eşit iletilir** / Yalnızca bastırdığın yerde kalır / Yalnızca balonun altında görülür. Dayandığı anlatım: 4–6, 8. İpuçları: "Kapalı kaptaki sıvıya uygulanan basınç yönünü seçmez." · "Eşit olan basınçtaki artıştır."

Gör: tahta ortasında balon çizimi (daire r 90, merkez (500, 330), sıvı mavi); bastıran parmak soldan (x 370, y 330) 500 ms'de `inOut` ile 12 birim içeri girer; balonun içinde merkezden çevreye sekiz sarı ok 400 ms'de `out` ile belirir, hepsi 36 birim boyunda.

### Sahne 3 · Su cenderesi

Tahta: su cenderesi (düzenek). Önce yalnızca iki silindir, boru ve sıvı. Küçük pistonun üstünde turuncu F oku (aşağı, 50 birim, y 330–380; 3. cümlede). Büyük pistonun üstünde G oku (aşağı, 150 birim, y 230–380, turuncu; 8. cümlede). Pistonların alt kenarında turkuaz kalın çizgi ve "A₁", "A₂".

Anlatım:
1. Su cenderesinde iki piston, bir boruyla birbirine bağlıdır.
2. Borunun içinde sıvı vardır.
3. Küçük pistonu F kuvvetiyle bastırıyoruz.
4. Bu kuvvet sıvının basıncını artırır.
5. Pascal Yasası'na göre basınç sıvıyla büyük pistona da iletilir.

Hareket: 1. cümlede iki silindir ve boru 500 ms'de `out` ile belirir; 2. cümlede sıvı 600 ms'de `out` ile dolar. 3. cümlede F oku 400 ms'de `out` ile belirir. 4. cümlede küçük pistonun altındaki 2 sarı ok 400 ms'de `out` ile belirir. 5. cümlede sarı okların yolu: küçük pistonun altından boruya, boru boyunca büyük pistonun altına kadar tek sarı nokta 800 ms'de `inOut` ile gider.

Tahmin (`tag: 'Tahmin et'`; hedeflenen yanılgı): Büyük pistonun altındaki basınç, küçük pistonunkine göre nasıldır? **Aynıdır** / Daha büyüktür / Daha küçüktür. Dayandığı anlatım: sahne 2 anlatım 4–6, 8; bu sahne 5. İpuçları: "Pascal Yasası'nda basınç her noktaya eşit iletilir." · "İki piston aynı sıvıyla bağlı."

Gör: büyük pistonun altında 6 sarı ok, küçüğünkiyle aynı 30 birim boyunda belirir (600 ms, `out`); iki pistonun arasında "aynı basınç" yazısı (sarı) belirir.

Sonra:
6. Büyük pistonda da küçük pistondakiyle aynı basınç oluşur.
7. Kuvvet, basınç ile yüzey alanının çarpımıdır: F = P·A.
8. Büyük pistonun alanı daha büyüktür; aynı basınçla daha büyük kuvvet doğar.
9. Böylece küçük bir kuvvetle büyük bir yük taşınır.

Hareket: 7. cümlede küçük pistonun altındaki 2 ok ve büyük pistonun altındaki 6 ok bir an vurgulanır (400 ms, `inOut`, parlaklık). 8. cümlede G oku 600 ms'de `out` ile 150 birime uzar; F oku 50 birimde kalır. Okların yanında harfler (turuncu "F", "G").

Defter ("Pascal Yasası"): **Pascal Yasası: basınç sıvıyla her yöne eşit iletilir.** Örnek: su cenderesi.

### Sahne 4 · Hidrolik lift

Tahta: su cenderesi (düzenek). Büyük pistonun üstünde araba (gövde x 580–740, y 330–380; iki tekerlek r 18; açık gri çizgi). Küçük pistonun üstünde F₁ oku (turuncu, aşağı, 50 birim), arabaya F₂ oku (turuncu, yukarı, x 770, y 380 → 230; 150 birim). Pistonların alt kenarı turkuaz kalın çizgi ve "A₁", "A₂". Sıvıda sarı okların 2 ve 6 tanesi baştan vardır.

Anlatım (çözülmüş örnek):
1. Hidrolik lift, tamirhanede arabaları kaldıran bir su cenderesidir.
2. Küçük pistona uygulanan kuvvet bir basınç oluşturur.
3. Bu basınç, sıvı tarafından büyük pistona aynen iletilir.
4. Büyük pistonun kesit alanı daha büyüktür.
5. Bu yüzden araba, büyük bir kuvvetle yukarı itilir.
6. Küçük kuvvetle büyük bir yük kaldırılır.

Hareket: 2. cümlede F₁ oku 400 ms'de `out` ile belirir. 3. cümlede sarı nokta küçük pistondan büyük pistona 800 ms'de `inOut` ile gider. 4. cümlede büyük pistonun turkuaz çizgisi 400 ms'de `out` ile vurgulanır. 5. cümlede F₂ oku 600 ms'de `out` ile uzar. 6. cümlede "küçük kuvvet" ve "büyük yük" yazıları iki yanda belirir (400 ms, `out`).

### Sahne 5 · Hidrolik pres

Tahta: solda su cenderesi, küçültülmüş (küçük silindir x 80–150, büyük silindir x 300–510, ikisi y 240–470; bağlantı borusu x 150–300, y 440–470; pistonlar y 380–395); büyük pistonun üstünde sıkışan nesne (ahşap blok, x 345–465, y 300–380) ve onun üstünde sabit gri plaka (x 300–510, y 280–300). Sağda tablo (x 640–940, y 140; sütunlar: satır başlığı 100, "Küçük" 100, "Büyük" 100; başlık satırı 50, üç veri satırı 60 birim): "Alan · küçük · büyük", "Basınç · P · ?", "Kuvvet · F · ?".

Anlatım:
1. Hidrolik pres de bir su cenderesidir.
2. Küçük pistona uygulanan kuvvet, sıvıda basınç oluşturur.
3. Büyük piston, nesneyi plakaya doğru sıkıştırır.

Birlikte çöz (`tag: 'Birlikte çöz'`): tablonun son iki satırını sen tamamla. Büyük pistonda basınç ve kuvvet, küçük pistona göre nasıldır? **Basınç aynı; kuvvet daha büyük** / Basınç daha büyük; kuvvet aynı / Basınç da kuvvet de aynı. Dayandığı anlatım: sahne 3 anlatım 6–8; bu sahne 2. İpuçları: "Pascal Yasası: basınç her noktaya eşit iletilir." · "F = P·A: alan büyükse aynı basınç daha büyük kuvvet yapar."

Gör: tablonun hücreleri 400 ms'de `out` ile dolar: "Basınç · P · P", "Kuvvet · F · daha büyük". Büyük pistonun altındaki 6 ok ve küçüğünkindeki 2 ok 30 birim boyunda belirir.

Soru (`tag: 'Sıra sende'`; yeni durum): Ela, hidrolik presin büyük pistonunu daha geniş bir pistonla değiştiriyor; küçük pistona aynı kuvveti uyguluyor. Büyük pistondaki kuvvet nasıl değişir? **Artar; aynı basınç daha büyük yüzeye etki eder** / Azalır; yüzey büyüdü / Değişmez; basınç aynı. Dayandığı anlatım: sahne 3 anlatım 6–8. İpuçları: "Basınç aynı kalıyor, değişen yüzey alanı." · "F = P·A."

Gör: büyük silindir 600 ms'de `inOut` ile genişler (genişlik 210 → 280; sağ kenar x 510 → 580); altındaki ok sayısı 6'dan 8'e çıkar (400 ms, `out`); kuvvet oku 150'den 200 birime uzar.

### Sahne 6 · Çevremizdeki sistemler

Tahta: altı kart (3 × 2), her kart 280 × 150: x 60–340, 360–640, 660–940; y 110–260 ve 290–440. Her kartta üstte basit çizgi simgesi, altta ad (22 birim): "hidrolik pres", "kepçe", "damperli kamyon", "itfaiye merdiveni", "hastane yatağı", "berber koltuğu". Altta (y 480) ince bir çizgide "hidrolik kriko" ve "forklift" adları (22 birim). Kartlar 300 ms arayla sırayla belirir (300 ms, `out`).

Anlatım:
1. Hidrolik kriko arabayı, forklift ağır yükleri kaldırır.
2. Kepçe ve damperli kamyon da sıvı basıncıyla çalışır.
3. Hidrolik pres, itfaiye merdiveni, hastane yatağı ve berber koltuğu da öyle.
4. Hepsinde sıvı, bir uçtaki basıncı öbür uca taşır.

Hareket: 4. cümlede altı kartın hepsinde küçük sarı bir ok zinciri (iki nokta arası, 400 ms, `out`) belirir.

### Sahne 7 · Kendin dene

Tahta: su cenderesi (düzenek). Büyük pistonun genişliği kaydırıcıyla değişir: dört kademe (genişlik 100, 150, 200, 300; sol kenar x 520'de sabit). Altında kaydırıcı (x 300–700, y 520; yalnızca "büyük pistonun alanı" yazısı). Basınç okları alanla orantılı: kademeye göre 2, 3, 4, 6 ok (hepsi 30 birim); G oku kademeye göre 50, 75, 100, 150 birim.

Anlatım:
1. Şimdi büyük pistonun alanını sen değiştir.
2. Küçük pistona uygulanan kuvvet aynı kalıyor.

Dene (`tag: 'Dene'`; kaydırıcı; her kademede tahmin): Kaydırıcıyı büyüttükçe büyük pistondaki kuvvet nasıl değişir? **Artar** / Azalır / Değişmez. İpuçları: "Basınç aynı, yüzey alanı büyüyor." · "F = P·A." Alanlar eşit olduğunda (birinci kademe) geri bildirim: "İki piston eşit alanlıyken kuvvetler de eşit."

Sonra:
3. Alanlar eşitken kuvvetler de eşittir.
4. Büyük pistonun alanı büyüdükçe kuvvet artar.
5. Sıvı, bir uçtaki bastırmayı öbür uca taşır.

### Çıkış soruları

1. Hangisi Pascal Yasası'dır? **Kapalı kaptaki sıvıya uygulanan basınç, sıvının her noktasına eşit iletilir** / Sıvı basıncı derinlikle artar / Basınç, kuvvetin yüzey alanına bölümüdür. (sahne 2)
2. (yanılgı) Bir su cenderesi için hangisi doğrudur? **Basınç iki pistonda aynıdır; kuvvet büyük pistonda daha büyüktür** / Basınç büyük pistonda daha büyüktür; kuvvet aynıdır / Basınç da kuvvet de iki pistonda aynıdır. (sahne 3)
3. (yeni durum) Ağzı sıkıca kapatılmış, tamamen su dolu bir plastik şişeyi bir yerinden sıkıyorsun. Şişenin içindeki basınç artışı için hangisi doğrudur? **Her noktaya eşit büyüklükte iletilir** / Yalnızca sıktığın yerde kalır / Yalnızca kapakta görülür. (sahne 2)
4. (yeni durum) Bir hidrolik krikoda küçük pistona uygulanan kuvvetle araba kaldırılabiliyor. Neden? **Aynı basınç, alanı büyük olan pistonda daha büyük kuvvet oluşturur** / Sıvı kuvveti kendiliğinden büyütür / Büyük pistondaki basınç küçük pistondakinden büyüktür. (sahne 3, 4)
5. Sıvılar için "sıkıştırılamaz kabul edilir" ne demektir? **Basınç altında hacimleri ihmal edilebilecek kadar az değişir** / Basınç altında hacimleri yarıya iner / Basınç altında hacimleri artar. (sahne 2)

Özet: Kapalı kaptaki sıvıya uygulanan basınç, her noktaya eşit iletilir: Pascal Yasası. · Su cenderesinde iki pistonda basınç aynıdır; alanı büyük pistonda kuvvet büyüktür. · **Sıvı, bir uçtaki bastırmayı öbür uca taşır.**

## B4 · Merak et, sor, doğrula

- **Fikir:** Merak edilen bir sistem hakkında soru sorulur, bilgi toplanır, bilginin doğruluğu sınanır ve ancak ondan sonra çıkarım yapılır. Ders tek bir sistem üzerinde ilerler: hidrolik fren.
- **Giriş ekranı sorusu:** İnternette "hidrolik fren asla bozulmaz" diye bir yazı gördün; doğru olduğunu nasıl anlarsın?
- **Kaynak:** Ders kitabı s. 146 (4. basamak: fren pedalı, fren ana silindiri, fren hidroliği, fren pistonu, fren diski, fren balatası etiketli çizim), s. 154–155 (3. Etkinlik basamak 6–12: sistem görselleri; soru hazırlama; yöntem ve kaynak belirleme; sistematik bilgi toplama, "Elde Edilen Bilgi · Araştırma Kaynağı" tablosu; "doğruluk, güvenilirlik, amaca uygunluk ve açıklık ilkelerine göre" kontrol; beş soruluk kontrol listesi: kaynak ihtiyacınız olan bilgiyi içeriyor mu, bilgiler güvenilir mi, araştırılan konu ile ilişkili mi, anlaşılır mı, güncel mi; "Hayır" birden fazlaysa kaynak gözden geçirilir; güvenilirlik tespiti; çıkarım), s. 156–157 (Pascal Yasası), s. 158 (hidrolik fren: sıkıştırma sistemleri). Kitap ilkelerin tanımını vermez; beş soruyla ilkeler arasındaki eşleme kitapta yoktur (aşağıdaki eşleme bizimdir). "Doğruluk" ilkesi için "bilgi ikinci bir kaynakla tutuyor mu" sorusu kitap dışıdır (`PLAN.md` bölüm 8, son paragraf). Kaynak kartlarının içeriği bu senaryoda yazılmıştır; gerçek kurum, kişi, marka ve sayı içermez, yalnızca tür adı taşır.
- **Örnek veri:** yok; bu derste sayı kullanılmaz.
- **Sınır:** Serbest metin girişi yok: öğrenci yalnızca şıklara ve motorun Evet/Hayır, sınıflama ve sıralama düğmelerine basar. Soru yazma, kaynak arama, poster ve sunum `site dışı` (`PLAN.md` karar 10, 16). Hidrolik freni bir sistem olarak anlatır; fren hidroliğinin bakımı, bozulması, marka ya da parça bilgisi yazılmaz. Kaynak kartlarındaki cümleler yalnızca bu derste öğretilen Pascal Yasası'na (B3) ve "asla bozulmaz" iddiasına dayanır.
- **Güç kavram ve gösterimi:** Bilginin sınanması: her kaynak kartı bir kontrol listesiyle (beş satır, Evet/Hayır) yan yana durur; Hayır sayısı sayaçla (beyaz sayı, 36 birim) gösterilir; birden fazla Hayır varsa kartın çerçevesi gri olur ("gözden geçirilir"); doğrulanan bilgi aynı cümleyle iki kartta yan yana görünür ve üçüncü kartta karşılığı olmayan iddia boş bırakılır. Eşleme (bizim): güvenilirlik → 2. soru; amaca uygunluk → 1. ve 3. soru; açıklık → 4. soru; doğruluk → ikinci kaynakla tutma.
- **Hedeflenen yanılgı:** "İnternette ya da bir yazıda yazılan bilgi doğrudur; ilk bulduğum bilgiden çıkarım yaparım."
- **Akılda kalıcı cümle:** Önce bilgiyi sına, sonra sonuç çıkar.

### Sahne 1 · Hatırla

İki soru, `tag: 'Hatırla'`; anlatım yok.

1. (B3) Pascal Yasası'na göre kapalı kaptaki sıvıya uygulanan basınç nasıl iletilir? **Her noktaya eşit büyüklükte** / Yalnızca bastırılan noktaya / Yalnızca kabın tabanına. İpuçları: "Basınç artışı sıvının her yerine ulaşır." · "Balon örneğini düşün." Doğru geri bildirimi: "Evet. Basınç, sıvının her noktasına eşit iletilir."
2. (B2) Hangisi durgun sıvının basıncını etkilemez? **Kabın şekli** / Derinlik / Sıvının yoğunluğu. İpuçları: "Basınç P = h·d·g idi." · "Formülde kabın şekli yok." Doğru geri bildirimi: "Evet. Basınç, kabın şekline bağlı değildir."

### Sahne 2 · Hidrolik fren

Tahta (yandan şematik çizim, açık çizgi): fren pedalı: eğik çubuk, x 90–170, y 330–420; fren ana silindiri: dikdörtgen x 210–330, y 340–400, içinde mavi sıvı ve ince piston (x 222–230); fren hidroliği: x 330–620 boyunca boru, y 365–375, içi mavi; fren pistonu: dikdörtgen x 620–660, y 330–410; fren balatası: x 672–696, y 330–410; fren diski: dikey disk x 700–712, y 250–490. Etiketler (22 birim, ince açık gri çizgiyle parçaya bağlı): "fren pedalı" (x 60–230, y 480), "fren ana silindiri" (x 150–390, y 280), "fren hidroliği" (x 420–590, y 440), "fren pistonu" (x 540–720, y 280), "fren balatası" (x 650–900, y 520), "fren diski" (x 730–900, y 220). Etiketler ilgili cümleyle belirir (400 ms, `out`).

Anlatım:
1. Hidrolik frende, pedalın uyguladığı basınç sıvıyla taşınır.
2. Sürücü fren pedalına basar.
3. Pedalın kuvveti, fren ana silindirindeki fren hidroliğine basınç uygular.
4. Pascal Yasası'na göre bu basınç, hidrolikle fren pistonuna iletilir.
5. Fren pistonu, balatayı diske bastırır ve araç yavaşlar.

Hareket: 2. cümlede pedal ve ana silindir ile birlikte turuncu kuvvet oku (aşağı, 50 birim) belirir (400 ms, `out`); pedal 300 ms'de `inOut` ile 10° döner. 3. cümlede ana silindirin içinde 2 sarı basınç oku belirir (400 ms, `out`). 4. cümlede sarı bir nokta boru boyunca x 330'dan x 620'ye 800 ms'de `inOut` ile gider; pistonun içinde 2 sarı ok belirir. 5. cümlede balata 300 ms'de `inOut` ile 8 birim sağa kayıp diske değer.

Soru (`tag: 'Sıra sende'`): Pedalın uyguladığı basıncı fren pistonuna taşıyan nedir? **Fren hidroliği** / Fren diski / Fren balatası. Dayandığı anlatım: 3–4. İpuçları: "Basınç sıvıyla iletilir." · "Borunun içinde ne var?"

### Sahne 3 · Merak et, soru sor

Tahta: üstte altı sistem adı iki satırda (22 birim; y 90 ve 130): "hidrolik fren · kepçe · damperli kamyon", "itfaiye merdiveni · hastane yatağı · berber koltuğu". "hidrolik fren" beyaz çerçeveyle seçilir (300 ms, `out`). Altında (y 200–260) ortada sıradaki soru kartı (600 × 70; 22 birim); iki kutu başlığı (x 80–480 "Konuyla ilgili", x 520–920 "Konu dışı"; y 330–380). Kart kutusuna 500 ms'de `inOut` ile küçülerek gider; yerleşen kartın adı kutunun altına alt alta yazılır.

Anlatım:
1. Ela, altı sistem arasından hidrolik freni merak ediyor.
2. Merak ettiği konuda sorular hazırlıyor.
3. Soru, merak edilen konuyla ilgili olmalıdır.

Dene (`tag: 'Dene'`; kart başına seçim; kutular "Konuyla ilgili" / "Konu dışı"). Soru kalıbı: "Ela'nın bu sorusu hidrolik fren ve sıvı basıncıyla ilgili mi?" Yanlışta ipucu: "Soru, sıvı basıncının frendeki rolünü soruyor mu?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Pedaldaki kuvvet fren pistonuna nasıl iletilir? | Konuyla ilgili | Evet. İletimi soruyor. |
| Fren hidroliğinde sıvı basıncının rolü nedir? | Konuyla ilgili | Evet. Sıvı basıncının rolünü soruyor. |
| Pedala basınca basınç sıvının her noktasına ulaşır mı? | Konuyla ilgili | Evet. Pascal Yasası'yla ilgili. |
| Hangi otomobilin freni daha güzel görünür? | Konu dışı | Evet. Görünüş, sıvı basıncıyla ilgili değil. |
| Fren pedalı hangi renkte olmalı? | Konu dışı | Evet. Renk, sıvı basıncıyla ilgili değil. |
| En pahalı otomobil hangisidir? | Konu dışı | Evet. Fiyat, sıvı basıncıyla ilgili değil. |

### Sahne 4 · Bilgi topla

Tahta: dört kart (2 × 2), her kart 400 × 120: x 80–480 ve 520–920; y 120–240 ve 280–400. Kart başlıkları (22 birim): "Kaynak 1 · kılavuz", "Kaynak 2 · ders notu", "Kaynak 3 · forum yazısı", "Kaynak 4 · reklam afişi". Kartlar 300 ms arayla sırayla belirir (300 ms, `out`).

Anlatım:
1. Soruların cevabı için bilgi toplamak gerekir.
2. Bilgi, tek bir yerden değil, farklı kaynaklardan toplanır.
3. Ela dört kaynak topluyor: kılavuz, ders notu, forum yazısı ve reklam afişi.

Soru (`tag: 'Sıra sende'`; araç kararı): Ela soruların cevabını bulmak için nasıl bir yol izlemeli? **Birkaç farklı kaynaktan bilgi toplamalı** / İlk bulduğu yazıyı almalı / Yalnızca bir arkadaşına sormalı. Dayandığı anlatım: 1–3. İpuçları: "Bilgi tek bir yerden mi toplanıyor?" · "Farklı kaynaklar birbirini sınamaya yarar."

Gör: kartlar sırayla küçülür (her biri 400 ms, `inOut`; dördü de x 80–920 arasında tek sıraya dizilir, her biri 190 × 50) ve altta "Elde Edilen Bilgi · Kaynak" başlıklı boş iki sütunlu tablo belirir (x 80–920, y 440; sütunlar 560 ve 280; başlık 50, bir satır).

### Sahne 5 · Kaynağı sına: kılavuz

Tahta: solda kaynak kartı (x 60–500, y 110–330): başlık "Kaynak 1 · Bir otomobil üreticisinin kullanım kılavuzu"; içerik: "Pedala basılınca fren hidroliğindeki basınç artar. Hidrolik, basıncı fren pistonuna iletir. Yayım tarihi: bu yıl." Sağda kontrol listesi (x 540–940, y 110; başlık satırı 50 birim, beş satır 50 birim; sütunlar: soru 220, "Evet" 90, "Hayır" 90): "İçeriyor mu?", "Güvenilir mi?", "İlişkili mi?", "Anlaşılır mı?", "Güncel mi?". Tablonun altında "Hayır sayısı" ve sayaç (y 440). Tablo satır satır belirir.

Anlatım:
1. Bir kaynağı beş soruyla sınarız; cevaplar Evet ya da Hayır.
2. Birincisi: kaynak, ihtiyacımız olan bilgiyi içeriyor mu?
3. İkincisi: kaynaktaki bilgiler güvenilir mi?
4. Üçüncüsü: kaynaktaki bilgiler araştırılan konuyla ilişkili mi?
5. Dördüncüsü: kaynaktaki bilgiler anlaşılır mı?
6. Beşincisi: kaynaktaki bilgiler güncel mi?
7. Birden fazla Hayır varsa, kaynak gözden geçirilir.

Hareket: 2–6. cümlelerde ilgili satır 400 ms'de `out` ile belirir. 7. cümlede "Hayır sayısı" yazısı ve sayaç (0) belirir (400 ms, `out`).

Anlatım (çözülmüş örnek):
8. Kılavuz, pedaldan pistona basıncın iletilmesini anlatıyor: birinciye Evet.
9. Hazırlayanı belli, konuyu bilen bir kuruluş: ikinciye Evet.
10. Fren sistemini anlatıyor: üçüncüye Evet.
11. Cümleleri kısa ve açık: dördüncüye Evet.
12. Yayım tarihi bu yıl: beşinciye Evet.
13. Hiç Hayır yok; kaynak kullanılabilir.

Hareket: her cümlede ilgili satırın "Evet" hücresine beyaz bir tik 300 ms'de `out` ile gelir; 13. cümlede sayaç 0'da kalır, kartın çerçevesi beyaz kalın olur.

### Sahne 6 · Kaynağı sına: ders notu

Tahta: kaynak kartı (düzenek: sahne 5): başlık "Kaynak 2 · Bir üniversitenin mühendislik bölümünün ders notları"; içerik: "Pedaldaki basıncın pistona iletilmesi, BİH ve ŞAD terimleriyle anlatılır; terimler açıklanmamıştır. Yayım tarihi: bu yıl." Kontrol listesi sağda; ilk üç satır dolu geliyor (Evet), son iki satır boş.

Anlatım:
1. İkinci kaynak, bir üniversitenin mühendislik ders notları.
2. Bilgiyi içeriyor, hazırlayanı belli, konusu fren: ilk üçüne Evet.
3. Dördüncü ve beşinci soruyu sen işaretle.

Birlikte çöz (`tag: 'Birlikte çöz'`; iki satırın Evet/Hayır düğmeleri, sırayla):
- Dördüncü satır: Kaynaktaki bilgiler anlaşılır mı? **Hayır** / Evet. Dayandığı anlatım: sahne 5 anlatım 5; bu sahne. İpuçları: "Metindeki terimlerin anlamı yazıyor mu?" · "Açıklanmamış terimler anlamayı zorlaştırır."
- Beşinci satır: Kaynaktaki bilgiler güncel mi? **Evet** / Hayır. Dayandığı anlatım: sahne 5 anlatım 6. İpuçları: "Yayım tarihine bak." · "Tarih bu yıl."

Gör: iki hücre dolar (dördüncü "Hayır", beşinci "Evet"); sayaç 0'dan 1'e geçer (300 ms, `out`).

Sonra:
4. Tek Hayır var; kaynak kullanılabilir.
5. Anlaşılmayan yerler başka bir kaynakla desteklenir.

### Sahne 7 · Kaynağı sına: forum yazısı

Tahta: kaynak kartı (düzenek: sahne 5): başlık "Kaynak 3 · İmzasız bir forum yazısı"; içerik: "Hidrolik fren asla bozulmaz. Yazan: imzasız. Tarih: yok. Dayanak: yok." Kontrol listesi sağda, bütün satırlar boş.

Anlatım:
1. Üçüncü kaynak, imzasız bir forum yazısı.
2. Yazı, hidrolik frenin asla bozulmadığını söylüyor.
3. Beş soruyu bu kaynak için sen işaretle.

Sıra sende (`tag: 'Sıra sende'`; beş satırın Evet/Hayır düğmeleri, sırayla):
- Birinci satır: Kaynak ihtiyacımız olan bilgiyi içeriyor mu? **Hayır** / Evet. Dayandığı anlatım: sahne 5 anlatım 2, 8. İpuçları: "Yazı, basıncın pedaldan pistona nasıl iletildiğini anlatıyor mu?" · "Sorumuz iletimle ilgiliydi."
- İkinci satır: Kaynaktaki bilgiler güvenilir mi? **Hayır** / Evet. Dayandığı anlatım: sahne 5 anlatım 3, 9. İpuçları: "Yazanın adı ve dayanağı var mı?" · "İmzasız ve dayanaksız yazı güvenilmez."
- Üçüncü satır: Bilgiler araştırılan konuyla ilişkili mi? **Evet** / Hayır. Dayandığı anlatım: sahne 5 anlatım 4, 10. İpuçları: "Yazı hangi konuda?" · "Konu fren sistemi."
- Dördüncü satır: Bilgiler anlaşılır mı? **Evet** / Hayır. Dayandığı anlatım: sahne 5 anlatım 5, 11. İpuçları: "Cümleler kısa mı?" · "Terim yok."
- Beşinci satır: Bilgiler güncel mi? **Hayır** / Evet. Dayandığı anlatım: sahne 5 anlatım 6, 12. İpuçları: "Yayım tarihine bak." · "Tarih yok; güncel olup olmadığı bilinmez."

Gör: sayaç 3'e çıkar (her Hayır'da 300 ms, `out`); kartın çerçevesi gri olur; kartın altında "gözden geçirilir" yazısı (beyaz) belirir.

Sonra:
4. Üç Hayır var; bu kaynak gözden geçirilir.
5. Gözden geçirilen kaynaktaki iddiaya hemen güvenilmez.

### Sahne 8 · Doğrula ve çıkarım yap

Tahta: üç mini kart yan yana (x 60–330, 365–635, 670–940; y 110–250): "Kaynak 1 · hidrolik basıncı fren pistonuna iletir", "Kaynak 2 · basınç pistona iletilir", "Kaynak 3 · asla bozulmaz". Kaynak 3'ün çerçevesi gri. İlk iki kartın arasında beyaz "=" işareti (22 birim). Altta (y 290–430) eşleme tablosu (iki sütun: "Soru" 300, "İlke" 400; x 150–850; dört satır 50 birim): "2. soru · güvenilirlik", "1. ve 3. soru · amaca uygunluk", "4. soru · açıklık", "ikinci kaynak · doğruluk". Satırlar sırayla belirir.

Anlatım:
1. Kılavuz ile ders notu aynı şeyi söylüyor: basınç, sıvıyla pistona iletilir.
2. Bilgi ikinci bir kaynakla tutuyorsa doğruluğuna güvenebiliriz.
3. "Asla bozulmaz" iddiası başka hiçbir kaynakta yok.
4. Üstelik forum yazısı kontrol listesinde üç Hayır aldı.
5. Bu iddia doğrulanmadı; ona dayanarak sonuç çıkarılmaz.
6. Beş soru güvenilirliği, amaca uygunluğu ve açıklığı yoklar.
7. İkinci kaynakla karşılaştırma ise doğruluğu yoklar.
8. Doğrulanan bilgiler üzerinden çıkarım yapılır.
9. Çıkarım bir şema, resim ya da tabloyla desteklenir.

Hareket: 1. cümlede "=" işareti 400 ms'de `out` ile gelir. 3. cümlede Kaynak 3 kartının altında boş bir "?" belirir (400 ms, `out`). 6–7. cümlelerde eşleme tablosunun satırları 400 ms arayla gelir.

Soru (`tag: 'Sıra sende'`; çıkarım): Doğrulanmış bilgilere göre hangi çıkarım yapılabilir? **Pedala uygulanan basınç, sıvı yoluyla fren pistonuna iletilir** / Hidrolik fren asla bozulmaz / Fren hidroliği olmasa da fren çalışır. Dayandığı anlatım: 1–5, 8. İpuçları: "Hangi bilgi iki kaynakta da var?" · "Doğrulanmayan iddiadan çıkarım yapılmaz."

Soru (`tag: 'Sıra sende'`; destek): Çıkarımı hangi görsel en iyi destekler? **Pedaldan fren pistonuna giden basıncı oklarla gösteren bir şema** / Fren pedalının renkli bir resmi / Bir atölyenin indirim afişi. Dayandığı anlatım: 8–9; sahne 2. İpuçları: "Görsel çıkarımın söylediğini göstermeli." · "Çıkarım basıncın iletimiyle ilgili."

Gör: seçilen şema belirir (sahne 2'nin çizimi, küçültülmüş: x 60–520, y 100–340); pedaldan pistona turuncu → sarı ok zinciri (800 ms, `inOut`); yanında çıkarım cümlesi (22 birim): "basınç sıvıyla pistona iletilir".

Defter ("Sorgulama"): **Önce bilgiyi sına, sonra sonuç çıkar.** Örnek: forum yazısı üç Hayır aldı.

### Sahne 9 · Sorgulamanın adımları

Tahta: beş kart karışık sırada (x 100–900, her biri 300 × 60; iki sütun, 22 birim): "çıkarım yap", "sorular sor", "bilgilerin doğruluğunu kontrol et", "merak edilen konuyu belirle", "kaynaklardan bilgi topla". Altta beş numaralı boş yuva (x 100–900, y 440–500).

Anlatım:
1. Bir sorgulama beş adımda ilerler.

Dene (`tag: 'Dene'`; sıralama): kartları sırayla yuvalara dokunarak diz. Doğru sıra: merak edilen konuyu belirle → sorular sor → kaynaklardan bilgi topla → bilgilerin doğruluğunu kontrol et → çıkarım yap. Yanlış sırada ipucu: "Çıkarım, bilginin sınanmasından sonra gelir." Doğru geri bildirimi: "Evet. Önce bilgiyi sına, sonra sonuç çıkar."

### Çıkış soruları

1. (yeni durum) Bir su cenderesi hakkında, imzasız ve tarihsiz bir blog yazısı buldun. Kontrol listesinde "güvenilir mi" ve "güncel mi" sorularına Hayır dedin. Ne yaparsın? **Kaynağı gözden geçirir, bilgiyi başka kaynakla da sınarım** / Yazıyı olduğu gibi kabul ederim / Başka kaynağa bakmadan çıkarım yaparım. (sahne 5, 7)
2. (yeni durum) Kaynak 4, bir atölyenin reklam afişi: "Fren onarımı, en uygun fiyat! Hemen arayın. Yayım tarihi: bu ay." Kontrol listesinde hangi soruya Hayır dersin? **Kaynak ihtiyacımız olan bilgiyi içeriyor mu?** / Bilgiler güncel mi? / Bilgiler anlaşılır mı? (sahne 5)
3. (yanılgı) Bir yazıda "hidrolik kepçe asla yağ kaçırmaz" yazıyor. İlk bulduğun bu yazıdan çıkarım yapmak için ne gerekir? **Önce bilginin doğruluğunu başka kaynakla sınamak** / Yazıdaki cümleyi aynen kopyalamak / Yazının kaç kişi tarafından okunduğuna bakmak. (sahne 8)
4. (yeni durum) Üç ayrı güvenilir kaynak, damperli kamyonun kasasını kaldıran pistona basıncın sıvıyla iletildiğini yazıyor. Hangi çıkarım doğrulanmış bilgiye dayanır? **Pistona basınç sıvı yoluyla iletilir** / Sistemin sıvısı hiç bitmez / Sistem sıvısız da çalışır. (sahne 8)
5. (yeni durum) Bir kaynağın yayım tarihi yok ve yazanı belli değil. Kontrol listesinde hangi iki soruya Hayır dersin? **Güvenilir mi? ve Güncel mi?** / İçeriyor mu? ve Anlaşılır mı? / İlişkili mi? ve Anlaşılır mı? (sahne 5, 7)

Özet: Merak edilen konuda sorular sorulur, farklı kaynaklardan bilgi toplanır. · Her kaynak beş soruyla sınanır; birden fazla Hayır varsa kaynak gözden geçirilir; bilgi ikinci bir kaynakla da tutmalıdır. · **Önce bilgiyi sına, sonra sonuç çıkar.**

## B5 · Konu tekrarı: Sıvılarda basınç (`b5-tekrar.html`, 1 sahne + 10 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle ve deftere düşer. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner. Tahta metinleri (toplam 23 kelime): 1 "derinlik ↑ → basınç ↑" (derin ve sığ iki nokta, üstlerinde kesikli sütunlar; turuncu oklar 40 ve 120 birim), 2 "P = h·d·g" (silindirik kap), 3 "bir değişken değişir" (iki tablo satırı: sabit · değişir), 4 "her yöne eşit iletilir" (kapalı kap ve sekiz sarı ok), 5 "aynı P, büyük F" (su cenderesi, 2 ve 6 ok), 6 "önce sına, sonra çıkar" (kaynak kartı ve kontrol listesi).

Anlatım:
1. Bu konunun kurallarını altı satırda toplayalım.
2. Sıvıda derine inildikçe basınç artar.
3. Basınç P = h·d·g'dir; kabın şekline bağlı değildir.
4. Deneyde bir değişken değişir, ötekiler sabit tutulur.
5. Pascal Yasası: kapalı kaptaki basınç her yöne eşit iletilir.
6. Su cenderesinde basınç aynıdır; büyük pistonda kuvvet büyüktür.
7. Bilgi önce sınanır, sonra ondan çıkarım yapılır.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Bir gölde dalgıç 2 metre derinlikten 6 metre derinliğe iniyor. Çevresindeki basınç nasıl değişir? **3 katına çıkar** / 2 katına çıkar / Değişmez. — B2 (6 ÷ 2 = 3)
2. Bir sonda suda 0,1 metre derinlikte 980 Pa ölçüyor. Aynı suda 0,9 metre derinlikte basınç kaç pascal olur? **8.820 Pa** / 980 Pa / 109 Pa. — B2 (derinlik 9 katı, basınç 9 katı: 9 · 980 = 8.820; denetim 0,9 · 1.000 · 9,8 = 8.820; 980 ÷ 9 ≈ 109)
3. (yeni durum) Aynı derinlikte, biri yoğunluğu d, öteki 3d olan iki sıvının içinde basınç ölçülüyor. Hangisi doğrudur? **3d olan sıvıda basınç 3 katıdır** / İkisinde basınç aynıdır / 3d olan sıvıda basınç üçte biridir. — B2 (P ∝ d)
4. Üç noktanın durumu: A, suyun 0,2 metre derinliğinde; B, yoğunluğu 2d olan sıvının 0,2 metre derinliğinde; C, suyun 0,4 metre derinliğinde. Basınçlar nasıl sıralanır? **B = C > A** / A = B = C / C > B > A. — B2 (A: 0,2·d·g; B: 0,2·2d·g = 0,4·d·g; C: 0,4·d·g)
5. (yanılgı) Taban alanı 3A olan geniş bir kap ile taban alanı A olan dar bir kap aynı sıvıyla aynı yüksekliğe kadar dolu. Tabandaki basınçlar için hangisi doğrudur? **Eşittir** / Geniş kapta büyüktür / Dar kapta büyüktür. — B2
6. (yeni durum) Kapalı bir kaptaki sıvıya pistonla basınç uygulanıyor. Kabın iç yüzeyindeki her noktaya iletilen basınç artışı için hangisi doğrudur? **Eşit büyüklüktedir** / Pistona yakın noktada daha büyüktür / Tabanda daha büyüktür. — B3
7. Su cenderesinin büyük pistonunun alanı küçük pistonunkinden büyüktür. Hangisi doğrudur? **Basınç aynıdır; büyük pistonda kuvvet daha büyüktür** / Basınç büyük pistonda daha büyüktür; kuvvet aynıdır / Basınç büyük pistonda daha küçüktür; kuvvet daha büyüktür. — B3
8. (yeni durum) Su dolu bir deponun yan duvarında biri üstte, biri altta iki delik var. Hangi delikte basınç daha büyüktür? **Alttaki delikte** / Üstteki delikte / İkisinde de aynıdır. — B2
9. (yeni durum) Bir kaynağın yayım tarihi yok, yazanı belli değil ve iddiası başka bir kaynakta yer almıyor. Ne yaparsın? **İddiaya güvenmeyip başka kaynaklarla sınarım** / İddiayı doğru kabul ederim / İddiayı doğrulanmış diye başkalarına anlatırım. — B4
10. (yeni durum) Serbest dalıştan çıkarken nefes tutulursa ne olabilir? **Akciğerler zarar görebilir** / Hiçbir sorun olmaz / Kulaktaki dolgunluk hissi tamamen geçer. — B1

Akılda kalıcı cümle: Sıvı basıncı derinlikle büyür, kapalı kapta her yöne iletilir.

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.3.2, FİZ.9.3.3) | Karşılığı |
|---|---|
| Serbest dalış görüntüsü üzerinden suda derine dalmanın zor olmasının nedenleri | B1 sahne 2–3 (benzetim ve anlatım; görüntü yerine çizim) |
| Dalış yapan sporcunun yerinde duygularını sorgulama (SDB1.1) | `site dışı` |
| Dalınan derinliğe uygun teknik ve teçhizat | B1 sahne 5 (anlatım 1–2) |
| Uygun olmayan koşullarda dalmanın vücutta oluşturabileceği sorunlar, vurgun | B1 sahne 5 (anlatım 3–6), çıkış 4 |
| Su altı sporlarında sağlık riskleri (D13.2) | B1 sahne 5 |
| a) Durgun sıvılarda basınca etki eden etmenleri tanımlar | B1 sahne 3–4, 7; B2 sahne 3–5 |
| Etmenleri dijital ya da görsel içerikten tanımlama | B1 sahne 3–4 (su sütunu ve üç panel çizimi), B2 sahne 11 (benzetim) |
| Deney tasarlama (değişken belirleme) ve deneyi yapma | B2 sahne 2 (değişen, sabit), sahne 3–5 (benzetimde deney) |
| b) Topladığı verileri kaydeder | B2 sahne 3–5 (üç tablo) |
| Verileri analiz ederek matematiksel modeli oluşturur | B2 sahne 6–7 (P ÷ (h·d) = 9,8; P = G/A'dan P = h·d·g) |
| c) Matematiksel modelle durgun sıvılarda basınca ilişkin çıkarım yapar | B2 sahne 8–11; çıkış 1–5; B5 |
| Köprü kurma: baraj duvarları | B2 sahne 9 |
| Hipotez kurma | B2 sahne 3 (Tahmin et), sahne 5 (Tahmin et); seçenekli tahminle karşılanır (karar 16) |
| Sınır: değişkenlerin ilişkilerine yönelik yorumlama; kabın yan yüzeylerine etki eden kuvvete ilişkin işlemlerden kaçınma | B2: orantı yorumları, tek çarpım; yan yüzeyde yalnızca basınç okları (sahne 5, 9, 10); kuvvet hesabı yok |
| Açık uçlu sorulardan oluşan test | `site dışı` (çıkış soruları ve B5 seçenekli) |
| Sıvı basıncı ile çalışan sistemlerin görselleri ve işleyişleri | B3 sahne 2–6; B4 sahne 2 (hidrolik fren) |
| Su cendereleri, hidrolik sistemler örnekleri | B3 sahne 3–5 (su cenderesi, lift, pres); sahne 6 (altı sistem) |
| Sıvı basıncının rolü | B3 sahne 2, 4, 6–7; B4 sahne 2 |
| a) Merak ettiği konuyu belirler | B4 sahne 3 (hidrolik fren, altı sistem arasından) |
| b) Sorular sorar | B4 sahne 3 (soru kartları: ilgili / dışı) |
| c) Bilgi toplar; araçlara karar verme, sistematik bilgi toplama | B4 sahne 4 (araç kararı, kaynak kartları, tablo) |
| ç) Topladığı bilgilerin doğru olup olmadığını değerlendirir (doğruluk, güvenilirlik, amaca uygunluk, açıklık) | B4 sahne 5–8 (beş soruluk kontrol listesi; ikinci kaynakla tutma) |
| d) Topladığı bilgiler üzerinden çıkarımda bulunur | B4 sahne 8 (çıkarım ve destekleyen görsel), sahne 9 |
| Çıkarımı fotoğraf, resim, tablo, şekil ya da grafikle destekleme | B4 sahne 8 (şema seçimi) |
| Köprü kurma: yoğunluk ve kaldırma kuvveti ilişkisi | B konusunda yok (D konusu) |
| Grup çalışması, tartışma, metin yazma, afiş, poster, slayt, paylaşım (KB2.6), görev paylaşımı | `site dışı` |

Fazla olan: programın istemediği ama kitapta bulunan "sıvı yan yüzeylere de basınç uygular" (B2 sahne 5; kitap s. 149, 152), kapalı kapta "eşit olan basınçtaki artıştır" (B3 sahne 2; kitap s. 160), "Blaise Pascal" adı (B3; kitap s. 156), turistik denizaltının pencereleri (B1 sahne 6; kitap s. 145: program anmıyor, kitabın konu girişi) ve delikli şişe (B2 sahne 10; kitap s. 153). Kitap dışı olan: sıvı içinde gezdirilen basınçölçer düzeneği (B2), "bilgi ikinci bir kaynakla tutuyor mu" sorusu ve kaynak kartlarının içeriği (B4), beş soru ile dört ilke arasındaki eşleme (B4), fren pistonunun balatayı diske bastırdığı cümlesi (B4 sahne 2), delikli şişede "derindeki delikte su daha uzağa fışkırır" cümlesi (B2 sahne 10), denizaltıda "pencere sayısı çoksa dayanması gereken yer çoğalır" cümlesi (B1 sahne 6). Eksik olan: yok; hipotez kurma seçenekli tahminle, açık uçlu test ve sunumlar `site dışı`. Hesaplanan sorular: B1'de sayı yok; B2'de çözülmüş örnek, birlikte çöz, sıra sende (0,5; 0,8; 0,7 metre), üç veri tablosu, 9,8 çözümlemesi, Dene'nin dört değeri, çıkış 2 ve 3; B3'te sayı yok; B4'te sayı yok; B5'te 1, 2, 3 ve 4. sorular hesaplandı.
