# Senaryolar — Konu C · Açık hava basıncı

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.3.4, `../PLAN.md` bölüm 3 (C1–C3, 7 Ekim taslağı), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 2, 5, 8, 9, 16, 19, 20, 23, 24) ve bölüm 8 ("C" satırları). Biçim `A-basinc.md` ile aynıdır; okuma kılavuzu orada.

Bu konuya özgü notlar:

- Altyazı satırları (numaralı "Anlatım" satırları) tek cümle, en çok 12 kelimedir; rakam, simge ve birim de kelime sayılır. Okunuşlar ders yazılırken `speak` ile verilir: "P₀" → "pe sıfır", "cmHg" → "santimetre cıva", "°C" → "derece selsiyus", "10⁵" → "on üzeri beş", "h · d · g" → "h çarpı d çarpı g", "atm" → "atmosfer", "Pa" → "pascal".
- Renkler: kuvvet ve ağırlık oku turuncu, basınç oku sarı, sıvı (cıva dâhil) mavi, yüzey alanı turkuaz. **Hava soluk gri-mavi** çizilir (dolgu, tanecik, hava oku). Kitabın şemasındaki kırmızı oklar bu derslerde soluk gri-mavi ya da sarı çizilir; kırmızı kullanılmaz. Yeşil yalnızca doğru cevabın rengidir. Tahta koyudur: çizgiler açık renklidir, siyah çizgi yok.
- Hava tanecikleri yarıçapı 5 birim olan soluk gri-mavi noktalardır; sıvı tanecikleri aynı boyda mavi noktalardır. "Zemin" kahverengi çizgidir (kalınlık 6).
- C2 düz vektörle, yandan görünüşle çizilir; izometrik figür kullanılmaz (`PLAN.md` karar 20). Cıva da sıvı olduğu için mavidir; cam boru açık gri-mavi çizgidir (kalınlık 3).
- Sayılar: C1 ve C3'te sayı yok. C2'deki sayılar kitaptaki sabitlerdir (cıvanın yoğunluğu 13.600 kg/m³, g = 9,8 m/s², 76 cm); benzetim sayısı ("örnek veri") yok. Temadaki tek sayısal işlem C2 sahne 4'tür.
- Sınır: gazlarda kaldırma kuvveti (balonun neden yükseldiği) anlatılmaz; kapalı kaptaki gaz basıncı, barometre türleri, altimetre yok; basınç değeri (hPa, mbar) yazılmaz; "hız" yazılmaz, "sürat" yazılır.
- "Atmosfer basıncı" adı yalnızca açık hava basıncının yeryüzünde yerden yere değiştiği anlatılırken geçer (C3); öteki yerlerde "açık hava basıncı" yazılır (`PLAN.md` karar 23).

## C1 · Hava da bir akışkandır

- **Fikir:** Hava da sıvı gibi bir akışkandır ve ağırlığıyla basınç yapar; ama sıvıdan farklı olarak yoğunluğu her yerde aynı değildir, yükseldikçe azalır.
- **Giriş ekranı sorusu:** Dağa çıkan bir otobüste kulakların neden tıkanır?
- **Kaynak:** Ders kitabı s. 161 (dağcılarda kulak tıkanması, zor nefes; "yükseklikle değişen hava yoğunluğu"), s. 161–162 (4. Etkinlik, adım 1: sıvı basıncındaki etmenlere benzer durum hava için de var mı; adım 2: benzerlik ve farklılık tablosu), s. 164 (sıvı ve gaz karşılaştırması: sıvılar sıkıştırılamaz kabul edilir, gazlar sıkıştırılabilir; tanım: atmosferi oluşturan gazlar ağırlıkları nedeniyle yüzeylere basınç uygular, bu basınca açık hava basıncı denir; sıvıda derinlik, gazda yükseklik; üst katmanların yoğunluğu ve ağırlığı daha az), s. 165 ("Dünya yüzeyine yakın bölgelerde hava yoğunluğu daha fazladır"), s. 166 (Örnek: "Atmosferde havanın yoğunluğu homojendir" yanlıştır; açık hava basıncı yükseldikçe azalır, sıvı basıncı derinlikle artar). Kulak tıkanmasının nedeni kitapta yok; `PLAN.md` karar 9'a göre bu dersin ilkesinden (yükseklikle azalan basınç) kurulur: sahne 5.
- **Sınır:** Sayı ve formül yok. Havaya P = h·d·g uygulanmaz (yoğunluk her yerde aynı olmadığı için). Basınç değeri yok. Gazlarda kaldırma yok.
- **Güç kavramlar ve gösterimi:** (1) Havanın ağırlığı: sıvı panelinin yanında hava paneli, ikisinde de bir noktanın üstünde kesikli sütun ve aynı turuncu ağırlık oku. (2) Yoğunluğun yerel olmaması: aynı boyda iki pencere (200 × 60) hava kolonunun altında ve üstünde; içindeki tanecik sayısı 12'ye karşı 1. (3) Derinlik–yükseklik: iki panelde okların boyu, noktanın üstündeki sıvı ya da hava kalınlığıyla orantılı.
- **Hedeflenen yanılgı:** "Hava çok hafiftir, basınç yapmaz" ve "havanın yoğunluğu her yerde aynıdır".
- **Akılda kalıcı cümle:** Bir hava denizinin dibinde yaşıyoruz.

### Hatırla

Başlık "Hatırla" (`tag: 'Hatırla'`). Yanlışta doğru şık gösterilir.

1. (B, bir önceki konu) Sıvının içindeki bir noktada basınca ne neden olur? **Üstündeki sıvının ağırlığı** / Kabın şekli / Sıvının hareketi.
2. (A, daha eski) Bir yüzeye etki eden kuvvet iki katına çıkıyor, yüzey aynı kalıyor. Basınç nasıl değişir? **İki katına çıkar** / Yarıya iner / Değişmez.

### Sahne 1 · Hava da sıvı gibi basınç yapar

Tahta, sol bölme (sıvı): kap (açık gri çizgi) x 90–430, y 150–470; su (mavi dolgu) x 92–428, y 190–470 (yüzey y = 190). Sarı nokta (yarıçap 9) (260, 420). Noktanın üstünde kesikli çerçeve (açık mavi) x 230–290, y 190–420, içinde turuncu ok aşağı, 80 birim (y 330 → 410), yanında "ağırlık" (turuncu, 22 birim, x 300, y 370); çerçevenin yanında "üstteki sıvı" (x 300, y 250). Sağ bölme (hava): zemin x 520–940, y = 470; hava alanı (soluk gri-mavi dolgu, 0,25 saydamlık) x 520–940, y 90–470; üstte kesikli çizgi y = 90, altında "atmosferin üstü" (x 600, y 124). Sarı nokta (730, 455); üstünde kesikli çerçeve x 700–760, y 90–455 ve turuncu ok aşağı, 80 birim (y 365 → 445), yanında "ağırlık" (x 770, y 405) ve "üstteki hava" (x 770, y 250). İki ok aynı boydadır; sıvı ile havanın ağırlığı karşılaştırılmaz.

Hareket: 1. cümlede sol bölme 500 ms `out` ile belirir, sonra çerçeve ve ok 400 ms `out`. 2. cümlede hava alanı ve zemin 600 ms `out`. 3. cümlede "atmosferin üstü" çizgisi 400 ms `out`. Tahminden sonra sağ noktanın çerçevesi ve oku 400 ms `out` ile belirir. 5. cümlede "açık hava basıncı" (sarı, x 730, y 525) 400 ms `out`.

Anlatım:
1. Sıvının içindeki bir noktaya, üstündeki sıvının ağırlığı basınç yapar.
2. Hava da sıvı gibi bir akışkandır.
3. Atmosfer, azot, oksijen ve diğer gazlardan oluşan bir gaz tabakasıdır.

Tahmin (`tag: 'Tahmin et'`; hipotez, sıvıdan yola çıkarak): Yeryüzündeki bir noktanın üstünde, atmosferin tepesine kadar hava var. Bu hava noktaya ne yapar? **Ağırlığıyla bastırır; basınç yapar** / Hiçbir şey yapmaz; hava çok hafiftir / Yalnızca rüzgâr eserken bastırır. Dayandığı anlatım: 1–3. İpuçları: "Sıvıda basıncı yapan şey, üstteki sıvının ağırlığıydı." · "Havanın da üstünde atmosferin sonuna kadar uzanan bir sütun var."

Gör: sağ noktanın çerçevesi ve oku belirir.

Sonra:
4. Atmosferi oluşturan gazlar, ağırlıklarıyla yüzeylere basınç uygular.
5. Bu basınca açık hava basıncı denir.

Defter ("Açık hava basıncı"): **Atmosferin ağırlığı yüzeye basınç yapar.** Örnek: yerdeki her nokta.

### Sahne 2 · Sıvı sıkışmaz, hava sıkışır

Tahta: iki kolon. Sol kolon "sıvı": çerçeve x 130–330, y 100–470 (mavi çizgi); başlık "sıvı" (mavi, x 190, y 80). Tanecikler mavi, 6 sütun (x 160, 190, 220, 250, 280, 310) × 12 satır (y 130, 160, …, 460; satır aralığı 30) = 72 nokta. Sağ kolon "hava": çerçeve x 560–760, y 100–470 (soluk gri-mavi çizgi); başlık "hava" (x 620, y 80). Tanecikler soluk gri-mavi; satırlar alttan üste: y 460 → 6, y 428 → 6, y 392 → 5, y 350 → 4, y 300 → 4, y 240 → 3, y 170 → 2, y 100 → 1 tanecik; her satırda tanecikler x 590–740 arasında eşit aralıklıdır. Sağ kolonun yanında "seyrek" (x 780, y 130) ve "sık" (x 780, y 440).

Hareket: 1. cümlede sıvı kolonu çerçevesi 300 ms `out`, tanecikler alttan üste satır satır, satır arası 40 ms gecikmeyle, her satır 300 ms `out`. 3. cümlede hava kolonu çerçevesi 300 ms `out`; 4. ve 5. cümlelerde tanecikler alttan üste, satır arası 60 ms gecikmeyle, her satır 300 ms `out`. 5. cümlenin sonunda "sık" ve "seyrek" 400 ms `out`.

Anlatım:
1. Sıvıların molekülleri arasındaki boşluk azdır; sıvılar sıkıştırılamaz kabul edilir.
2. Sıvıda yoğunluk her derinlikte aynıdır.
3. Gazların molekülleri arasındaki mesafe büyüktür; gazlar sıkıştırılabilir.
4. Dünya yüzeyine yakın bölgelerde hava yoğunluğu daha fazladır.
5. Yükseldikçe hava seyrelir; yoğunluğu azalır.

Soru (`tag: 'Sıra sende'`): Bir dağın eteğindeki hava ile zirvesindeki hava karşılaştırılıyor. Hangisi doğrudur? **Eteğin yakınında hava yoğunluğu daha fazladır** / Zirvede hava yoğunluğu daha fazladır / İkisinde hava aynı yoğunluktadır. Dayandığı anlatım: 4–5. İpuçları: "Yeryüzüne yakın yerde hava daha sıkıdır." · "Yükseldikçe hava seyrelir."

Gör: iki kolonda da iki pencere (200 × 60, açık çerçeve) belirir: alt pencere y 412–472, üst pencere y 100–160 (400 ms `out`). Sıvı kolonunda iki pencerede de 12'şer tanecik; hava kolonunda alt pencerede 12, üst pencerede 1 tanecik. Pencerelerin içindeki tanecikler 0,3 saydamlık dışında tam görünür; çevresi 0,3 saydamlığa iner.

Sonra:
6. Sıvı her yerde aynı yoğunluktadır; hava değil.

### Sahne 3 · Derinlik ve yükseklik

Tahta, sol panel (sıvı): kap x 100–400, y 90–470; su (mavi) x 102–398, y 90–470 (yüzey y = 90). Sarı noktalar D1 (250, 200) ve D2 (250, 420). Oklar turuncu, aşağı: D1 için y 164 → 200 (36 birim), D2 için y 311 → 420 (109 birim); ok boyu = noktanın üstündeki sıvı kalınlığı × 0,33 (110 → 36, 330 → 109). Solda dikey "derinlik" yazısı (−90° döndürülmüş, x 60, y 270) ve yanında çift ok x 80, y 90 → 420. Sağ panel (hava): zemin x 540–900, y = 470; hava alanı x 540–900, y 90–470, soluk gri-mavi dolgu, saydamlık yukarıda 0,10, aşağıda 0,40 (seyrelme); üstte kesikli çizgi y = 90 ve "atmosferin üstü" (x 600, y 118). Dağ: çokgen (660, 470), (780, 230), (900, 470), kahverengi-gri dolgu. Sarı noktalar Y1 (590, 460) ve Y2 (780, 221). Oklar turuncu, aşağı: Y1 için y 368 → 460 (92 birim), Y2 için y 188 → 221 (33 birim); ok boyu = noktanın üstündeki hava kalınlığı × 0,25 (370 → 92, 131 → 33). Her panelde ok boyu yalnızca kendi içinde orantılıdır; paneller arası karşılaştırma yapılmaz. Sağda dikey "yükseklik" yazısı (−90°, x 930, y 350) ve çift ok x 920, y 470 → 221.

Hareket: 1. cümlede sol panel 500 ms `out`; D1 oku, 300 ms sonra D2 oku, her biri 400 ms `out`. 2. cümlede "derinlik" ölçüsü 400 ms `out`. 3. cümlede sağ panel, dağ, Y1, Y2 ve "yükseklik" ölçüsü 600 ms `out`; oklar yok. Tahminden sonra Y1 oku, 300 ms sonra Y2 oku 400 ms `out`.

Anlatım:
1. Sıvıda derinlik arttıkça üstteki sıvı çoğalır, basınç artar.
2. Derinlik, sıvının serbest yüzeyinden aşağıya doğru ölçülür.
3. Havada yükseklik, deniz seviyesinden yukarı doğru ölçülür.

Tahmin (`tag: 'Tahmin et'`; hipotez, sıvı benzetmesiyle): Ela Y1 noktasından dağın tepesindeki Y2 noktasına çıkıyor. Açık hava basıncı nasıl değişir? **Azalır; üstündeki hava azalır** / Artar; hava yükseldikçe çoğalır / Değişmez; hava her yerde aynı basıncı yapar. Dayandığı anlatım: sahne 1, 1–5; bu sahne 1–3. İpuçları: "Sıvıda üstteki sıvı azalınca basınç azalıyordu." · "Tepedeki bir noktanın üstünde, atmosferin sonuna kadar ne kadar hava var?"

Gör: iki ok belirir; Y2'nin oku Y1'inkinden kısadır.

Sonra:
4. Dağın tepesinde, atmosferin üstüne kadar olan hava daha azdır.
5. Üstteki hava azaldığı için açık hava basıncı da azalır.
6. Sıvıda derinlik arttıkça, havada yükseklik azaldıkça basınç artar.

### Sahne 4 · Yukarı çık, aşağı in

Tahta: solda dağ (çokgen (60, 470), (280, 150), (500, 470), kahverengi-gri dolgu); Ela beyaz nokta (yarıçap 10), başlangıçta (110, 397), yanında "Ela" (22 birim). Sağda üç sütunlu tablo (x 548–972, y 130; sütunlar "Ne değişti?" 192, "Üstteki hava" 132, "Basınç" 100; başlık satırı ve iki veri satırı, satır yüksekliği 60). 1. cümlede Ela, 1200 ms `inOut` ile (110, 397)'den (280, 140)'a çıkar. 2. cümlede ilk satır dolar: "yükseklik arttı · azaldı · azaldı". 3. cümlede ikinci satır "yükseklik azaldı · ? · ?" olarak açılır. Birlikte çöz'den sonra Ela 1200 ms `inOut` ile (280, 140)'tan (110, 397)'ye iner; ikinci satır dolar: "yükseklik azaldı · çoğaldı · arttı".

Anlatım:
1. Ela dağa tırmanırken yükseklik arttıkça üstündeki hava azalıyor.
2. Açık hava basıncı da azalıyor; sonucu tabloya yazalım.
3. Şimdi Ela tepeden vadiye iniyor: yükseklik azalıyor.

Birlikte çöz (`tag: 'Birlikte çöz'`): tablonun ikinci satırını sen tamamla. Yükseklik azalınca üstteki hava ve açık hava basıncı ne olur? **Hava çoğalır; basınç artar** / Hava çoğalır; basınç azalır / Hava azalır; basınç artar. Dayandığı anlatım: sahne 3, 4–6; bu sahne 1–2. İpuçları: "Vadide Ela'nın üstünde daha çok hava var." · "Üstteki hava çoğalınca basınç da çoğalır."

Gör: Ela vadiye iner, ikinci satır dolar.

Sonra:
4. Vadide Ela'nın üstündeki hava çoğalır; açık hava basıncı artar.

Soru (`tag: 'Sıra sende'`; yeni durum): Deniz kıyısında yüzen biri ile yüksek bir dağın zirvesinde duran biri karşılaştırılıyor. Hangisi daha büyük açık hava basıncı altındadır? **Deniz kıyısındaki** / Zirvedeki / İkisi aynı basınç altındadır. Dayandığı anlatım: sahne 3, 4–6; bu sahne 1–4. İpuçları: "Kimin üstünde daha çok hava var?" · "Yükseldikçe açık hava basıncı azalır."

Defter ("Yükseklik ve basınç"): **Yükseldikçe açık hava basıncı azalır.** Örnek: dağ zirvesi.

### Sahne 5 · Dağcının kulağı

Tahta: ortada kulak kutusu (yuvarlak köşeli, açık çizgi) x 360–640, y 220–340, içinde "kulağın içi" (22 birim, x 440, y 340 altına) ve soluk gri-mavi hava tanecikleri (12 nokta, 3 satır × 4 sütun, x 410–590, y 250–310). Kutunun dışında hava soluk gri-mavi dolgu (0,15 saydamlık) x 120–880, y 150–410. Sol duvarda iki sarı ok: dıştaki sağa, x 272 → 352, y 280 (80 birim); içteki sola, x 448 → 368, y 280 (80 birim). Sağ duvarda aynalı: dıştaki sola x 728 → 648, içteki sağa x 552 → 632. Sol üstte "vadi" (x 140, y 120). Dışarıdaki iki ok 700 ms `inOut` ile 80 → 30 birime kısalır, içerideki oklar 80 birimde kalır; "vadi" 300 ms `in` ile kaybolur, yerine "zirve" 300 ms `out` ile gelir.

Anlatım:
1. Vadide kulağın içindeki ve dışındaki basınç eşittir.
2. Dağcı tırmanınca dışarıdaki açık hava basıncı azalır.
3. Kulağın içindeki basınç hemen azalmaz; kulak tıkanır.
4. Dağa çıkan otobüste kulakların bu yüzden tıkanır.

Not: bu açıklama kitapta yok (`PLAN.md` karar 9); yalnızca bu dersin ilkesine (yükseldikçe açık hava basıncı azalır) dayanır.

### Sahne 6 · Sıvı ile hava: benzerlik ve fark

Tahta: üstte üç kutu başlığı (y 60–110): "Benzerlik" (x 25–325), "Yalnızca sıvıda" (x 350–650; mavi), "Yalnızca havada" (x 675–975; soluk gri-mavi). Kutuların içi y 130–520; yerleşen kartın adı kutuda alt alta yazılır (22 birim, satır aralığı 56; uzun kartlar iki satıra bölünür). Ortada (x 320–680, y 190–310) sıradaki kart. Kart yerine oturunca 500 ms `inOut` ile kutusuna küçülerek gider. Önce iki kart anlatımla yerleştirilir, sonra altısını öğrenci yerleştirir.

Anlatım:
1. Sıvı ile havayı yan yana koyup karşılaştıralım.
2. İkisi de akışkandır.
3. Sıvı sıkıştırılamaz kabul edilir.

(2. cümlede "Akışkandır" kartı "Benzerlik" kutusuna, 3. cümlede "Sıkıştırılamaz sayılır" kartı "Yalnızca sıvıda" kutusuna gider.)

Dene (`tag: 'Dene'`; kart başına seçim). Soru kalıbı: "<kart> sıvı ile hava için nasıldır?" Yanlışta ipucu: "Önce iki akışkanda da var mı diye bak; ikisinde de varsa 'Benzerlik'."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Ağırlığıyla basınç yapar | Benzerlik | Evet. Sıvı da hava da ağırlığıyla basınç yapar. |
| Yoğunluğu her yerde aynıdır | Yalnızca sıvıda | Evet. Sıvının yoğunluğu her derinlikte aynıdır. |
| Basınç derinlikle artar | Yalnızca sıvıda | Evet. Derinlik arttıkça üstteki sıvı çoğalır. |
| Sıkıştırılabilir | Yalnızca havada | Evet. Hava bir gazdır; sıkıştırılabilir. |
| Yoğunluğu yükseldikçe azalır | Yalnızca havada | Evet. Yükseldikçe hava seyrelir. |
| Basınç yükseldikçe azalır | Yalnızca havada | Evet. Yükseldikçe üstteki hava azalır. |

Sonra:
4. Sıvı ve hava, ağırlıklarıyla basınç yapan iki akışkandır.
5. Sıvıda derinlik, havada yükseklik basıncı değiştirir.
6. Bir hava denizinin dibinde yaşıyoruz.

### Çıkış soruları

1. (yanılgı) Ela "Hava çok hafif, bu yüzden bir yüzeye basınç yapmaz" diyor. Hangisi doğrudur? **Atmosferi oluşturan gazlar ağırlıklarıyla yüzeylere basınç yapar** / Hava yalnızca hareket ederken basınç yapar / Basıncı yalnızca sıvılar yapar. (sahne 1)
2. Hangisi sıvı ile hava arasındaki bir farktır? **Sıvı sıkıştırılamaz kabul edilir, hava sıkıştırılabilir** / Yalnızca sıvı ağırlığıyla basınç yapar / Yalnızca hava akışkandır. (sahne 2, 6)
3. (yeni durum) Deniz kıyısındaki bir kasaba ile yüksek bir yayla karşılaştırılıyor. Hangisi doğrudur? **Yaylada üstteki hava daha az olduğundan açık hava basıncı daha küçüktür** / Yaylada açık hava basıncı daha büyüktür / İkisinde de aynıdır; hava her yerde aynı yoğunluktadır. (sahne 3, 4)
4. (yeni durum) Bir dalgıç daha derine iniyor, bir dağcı daha yükseğe çıkıyor. Dalgıcın çevresindeki sıvı basıncı ve dağcının çevresindeki açık hava basıncı nasıl değişir? **Dalgıçta artar, dağcıda azalır** / İkisinde de artar / Dalgıçta azalır, dağcıda artar. (sahne 3, 4)
5. (yeni durum) Bir otobüs kıyıdan yüksek bir dağın tepesine çıkarken yolcuların kulakları tıkanıyor. Neden? **Dışarıdaki açık hava basıncı azalıyor** / Dışarıdaki açık hava basıncı artıyor / Otobüsün üstündeki hava çoğalıyor. (sahne 3, 5)

Özet: Hava da sıvı gibi bir akışkandır; ağırlığıyla basınç yapar. · Havanın yoğunluğu yükseldikçe azalır; sıvının yoğunluğu her yerde aynıdır. · Sıvıda derinlik arttıkça, havada yükseklik azaldıkça basınç artar. · **Bir hava denizinin dibinde yaşıyoruz.**

## C2 · Torricelli havayı nasıl tarttı?

- **Fikir:** Açık hava basıncı, dengelediği cıva sütunuyla ölçülür; bu ölçü atmosfer (atm) biriminin dayanağıdır.
- **Giriş ekranı sorusu:** Cıva dolu bir cam boruyu ters çevirip kaba daldırınca cıva neden hepsi boşalmaz?
- **Kaynak:** Ders kitabı s. 164 (Torricelli deneyi: deniz seviyesi, 0 °C, 1 m boyunda bir ucu kapalı cam boru, cıva dolu kap, 76 cm fark; "boşluk"; P₀ = P cıva; "borunun şekli, kesiti, sıvıdaki konumu ve duruşu cıva seviyesini değiştirmez" ve Görsel 3.16–3.17; h sıvının dikey yüksekliği; cıvanın yoğunluğu 13.600 kg/m³, g = 9,8 m/s²; P₀ = h · d · g = 0,76 · 13.600 · 9,8 = 101.300 Pa; "1 atmosfer"), s. 165 ("1 atm = 76 cmHg = 1,013 · 10⁵ Pa"), s. 167 (özet: P₀ simgesi, "cıva her zaman 76 cm'ye yükselir"; bu yalnızca 0 °C ve deniz seviyesi için doğrudur, derste koşulla birlikte söylenir). 76 cm'in metreye çevrilmesi kitapta yazılı değil, sonuçtaki 0,76'dan çıkarılır (sahne 4).
- **Sınır:** Temadaki tek sayısal işlem sahne 4'tür (`PLAN.md` karar 5); ara çarpımlar (10.336) tahtaya yazılmaz. Cıva yerine su ya da başka sıvıyla hesap yok. bar, mmHg, torr yok. Yıl yazılmaz. Tahtada aynı anda en çok üç satır işlem bulunur.
- **Güç kavramlar ve gösterimi:** (1) İki basıncın dengesi: borunun ağzında karşılıklı iki sarı ok (aşağı "P cıva", yukarı "P₀"), aynı boyda (64 birim). (2) Borunun şekli ve kesiti etkisizdir: üç boru yan yana, cıva üstleri aynı kesikli çizgide. (3) Eğimle yalnızca sütunun boyu uzar, dikey yükseklik sabittir: kaydırıcı.
- **Hedeflenen yanılgı:** "Kalın boruda ya da eğik boruda cıva daha yüksek durur".
- **Akılda kalıcı cümle:** Hava dışarıdan iter, cıva sütunu içeriden tartar; ikisi dengede durur.

### Hatırla

Başlık "Hatırla" (`tag: 'Hatırla'`).

1. (C1, bir önceki ders) Açık hava basıncı neden oluşur? **Atmosferi oluşturan gazların ağırlığından** / Havanın sıcaklığından / Rüzgârın esmesinden.
2. (B, daha eski) Durgun sıvının basıncını hangisi değiştirir? **Sıvının yoğunluğu** / Kabın şekli / Sıvının miktarı.

### Sahne 1 · Torricelli'nin düzeneği

Çizim ölçeği: 1 cm = 3,4 birim; boru 1 m = 340 birim, 76 cm = 258 birim. Tahta: kap (açık gri çizgi, üstü açık) x 180–640, y 380–520; kaptaki cıva (mavi dolgu) x 184–636, y 400–516 (yüzey y = 400), içinde "cıva" (x 200, y 470). Boru: cam boru (açık gri-mavi çizgi) x 390–430, üst ucu kapalı (yarım daire), alt ucu açık; son durumda y 100–440 (alt ucu cıvanın içinde, yüzeyin 40 birim altında). Borudaki cıva (mavi) x 393–427. Boşluk: cıvanın üstü, y 100–142, içi tahta rengi; yanında "boşluk" (x 440, y 128). Sol ölçü: çift ok x 360, y 100 → 440, yanında "1 m" (x 290, y 275). Sağ ölçü: kesikli yatay çizgiler y = 142 (x 430–560) ve y = 400 (x 430–560), çift ok x 540, y 142 → 400, yanında "76 cm" (x 556, y 282). Sol üstte "deniz seviyesi · 0 °C" (x 40, y 60).

Hareket: 1. cümlede kap ve cıvası 500 ms `out`. 2. cümlede sol üst yazı 400 ms `out`. 3. cümlede boru, dolu hâlde (cıva y 10–350) kabın 50 birim üstünde, 400 ms `out` ile belirir; "1 m" ölçüsü boruyla birlikte. 4. cümlede boru 800 ms `inOut` ile 90 birim aşağı iner (y 100–440). 5. cümlede borudaki cıvanın üst yüzeyi y = 100'den y = 142'ye 1000 ms `inOut` ile düşer. 6. cümlede kesikli çizgiler ve "76 cm" ölçüsü 400 ms `out`. 7. cümlede "boşluk" yazısı 400 ms `out`.

Anlatım:
1. Açık hava basıncını ilk kez Evangelista Torricelli ölçtü.
2. Deney deniz seviyesinde ve 0 °C sıcaklıkta yapıldı.
3. Bir ucu kapalı, 1 m boyunda cam boruyu cıvayla doldurdu.
4. Boruyu hava girmeden ters çevirip cıva dolu kaba daldırdı.
5. Borudaki cıva düştü, sonra bir yerde dengeye geldi.
6. Kaptaki yüzeyle borudaki yüzey arasındaki fark 76 cm oldu.
7. Cıvanın üstünde, borunun kapalı ucuna kadar bir boşluk kaldı.

### Sahne 2 · İki basınç dengede

Tahta: sahne 1'in son hâli. Eklenenler: kap yüzeyinde iki sarı ok aşağı, 66 birim (y 334 → 400): x 260 ve x 580; sol okun yanında "P₀" (x 215, y 360). Kesikli gri-mavi eğri ok, (260, 405)'ten kabın cıvası içinden borunun ağzına, (410, 500)'e (hava rengi, ucu yukarı bakar). Borunun ağzında karşılıklı iki sarı ok: aşağı ok boru içinde x 410, y 374 → 438 (64 birim), yanında "P cıva" (x 440, y 372); yukarı ok kabın cıvasında x 410, y 510 → 446 (64 birim), yanında "P₀" (x 440, y 490). Sağda "P₀ = P cıva" (30 birim, x 660, y 200). Sağ üstteki 76 cm ölçüsü ve "1 m" ölçüsü kalır; "deniz seviyesi · 0 °C" yazısı 0,45 saydamlığa iner.

Hareket: 1. cümlede iki okun ikisi 400 ms `out` ile belirir. 2. cümlede kesikli eğri ok 600 ms `out` ile çizilir. 3. cümlede "P cıva" oku 400 ms `out`, 300 ms sonra "P₀" oku 400 ms `out`; sonra ikisi 300 ms boyunca 0,6 → 1 parlaklığa vurgulanır. 6. cümlede "P₀ = P cıva" 400 ms `out`.

Anlatım:
1. Açık hava, kaptaki cıvanın yüzeyine P₀ basıncı yapar.
2. Bu basınç, kaptaki cıvadan borunun ağzına ulaşır.
3. Borudaki cıva sütunu da ağırlığıyla basınç yapar.
4. Bu iki basınç, borunun ağzında birbirini dengeler.
5. Cıva sütunu bu yüzden 76 cm'de durur.
6. Açık hava basıncı, 76 cm'lik cıva sütununun basıncına eşittir.
7. İkisi de ağırlıktan doğan basınçtır; burada birbirine eşittir.

Not: 2. cümle kitaptaki "açık hava basıncı cıva sütununun basıncına eşittir" cümlesinin neden böyle olduğunu bağlar; kitapta ayrıca yazılı değil, çizimdeki karşılıklı oklar bizim gösterimimizdir (`PLAN.md` C2 satırı).

Soru (`tag: 'Sıra sende'`): Cıva sütunu 76 cm'de dururken, kaptaki cıva yüzeyine bastıran açık hava basıncı için ne söylenir? **Cıva sütununun basıncına eşittir** / Cıva sütununun basıncından büyüktür / Cıva sütununun basıncından küçüktür. Dayandığı anlatım: 3–6. İpuçları: "Cıva ne yukarı çıkıyor ne düşüyor: dengede." · "Dengede iki basınç eşittir."

Defter ("Torricelli"): **Açık hava basıncı, dengelediği cıva sütunuyla ölçülür.** Örnek: 76 cmHg.

### Sahne 3 · Borunun şekli etkisiz

Tahta: kap x 120–880, y 380–520, cıva yüzeyi y = 400. Üç boru, hepsi dolu başlar. B1 dik, ince: x 210–240, y 100–440. B2 dik, kalın: x 380–470, y 100–440. B3 eğik, ince: alt ucu (686, 424), ekseni dikeyden 30° sağa yatık, boy 340 birim, üst ucu (856, 130). Üçünün üst uçları kapalıdır. Üstte "P cıva = h · d · g" (30 birim, x 40, y 60). Sağda kesikli çizgi y = 142 (x 150–900) ve çift ok x 905, y 142 → 400, yanında "76 cm" (x 915, y 290; 22 birim); çizgi ve ok tahminden sonra çizilir. Cıva üstleri: B1 ve B2 için y = 142; B3 için (849, 142), yani boy boyunca 326 birim, dikey yükseklik 258 birim.

Hareket: 1. cümlede kap ve formül 500 ms `out`. 2. cümlede üç boru 500 ms `out` (dolu, cıva y 100'de); bir "h" yazısı 76 cm ölçüsünün yanında sonra gelir. Tahminden sonra üç borudaki cıva birlikte 1000 ms `inOut` ile düşer (B1, B2: y 100 → 142; B3: boy boyunca 340 → 326 birim) ve kesikli çizgi ile ölçü 400 ms `out` ile çizilir; yanına "h" (22 birim) gelir.

Anlatım:
1. Cıva sütununun basıncı da sıvı basıncıdır: h · d · g.
2. Burada h, cıva sütununun dikey yüksekliğidir.

Tahmin (`tag: 'Tahmin et'`): Ela aynı kapta üç boru deniyor: ince dik, kalın dik ve eğik. Cıva sütunlarının dikey yüksekliği nasıl olur? **Üçünde de aynı: 76 cm** / Kalın boruda daha yüksek / Eğik boruda daha yüksek. Dayandığı anlatım: sahne 2, 1–7; bu sahne 1–2. İpuçları: "Basıncı h, d ve g belirler. Boru şekli bunlardan biri mi?" · "Aynı cıva, aynı yer: d ve g aynı."

Gör: cıva üç boruda da aynı çizgide durur.

Sonra:
3. Üç boruda da dikey yükseklik aynı: 76 cm.
4. Borunun şekli, kesiti ve eğimi cıva seviyesini değiştirmez.
5. Basıncı h, d ve g belirler; boru değil.

### Sahne 4 · 1 atm kaç pascal?

Tahta: sol yarıda düzenek 0,6 ölçekle küçülür ve sola kayar (600 ms `inOut`; dönüşüm x' = 0,6·x − 48, y' = 0,6·y + 120): kap x 60–336, y 348–432, boru x 186–210, y 180–384, cıva üstü y = 205; "76 cm" ölçüsü kalır, yazı boyu 22 birimde sabit kalır. Sağ yarıda (x 460–960) satırlar 30 birimle yazılır; aynı anda en çok üç satır görünür. Önce değer satırları (y 150, 210, 270): "h = 0,76 m" · "d = 13.600 kg/m³" · "g = 9,8 m/s²". 4. cümlede üçü 300 ms `in` ile kaybolur; yerine işlem satırları (y 180, 260, 340) sırayla 400 ms `out` ile gelir: "P₀ = h · d · g", sonra "= 0,76 · 13.600 · 9,8", sonra "≈ 101.300 Pa".

Anlatım:
1. 76 cm, metre cinsinden 0,76 m'dir.
2. Cıvanın yoğunluğu 13.600 kg/m³'tür.
3. Yer çekimi ivmesi g, 9,8 m/s²'dir.
4. P₀, h · d · g işlemiyle bulunur.

(1. cümlede "h = 0,76 m", 2. cümlede "d = 13.600 kg/m³", 3. cümlede "g = 9,8 m/s²" satırı 400 ms `out` ile gelir; 4. cümlede satırlar değişir ve "P₀ = h · d · g" belirir.)

Birlikte çöz (`tag: 'Birlikte çöz'`): ikinci satırı sen yaz. Değerleri yerine koyunca hangi satır doğru olur? **= 0,76 · 13.600 · 9,8** / = 76 · 13.600 · 9,8 / = 0,76 + 13.600 + 9,8. Dayandığı anlatım: 1–4. İpuçları: "h metre olmalı: 76 cm = 0,76 m." · "Formül bir çarpımdır: h · d · g."

Gör: doğru satır "= 0,76 · 13.600 · 9,8" belirir.

Sonra:
5. Çarpınca P₀ yaklaşık 101.300 pascal bulunur.
6. Bu değere 1 atmosfer, kısaca 1 atm denir.

Hesap: 0,76 · 13.600 = 10.336; 10.336 · 9,8 = 101.292,8 ≈ 101.300 Pa (kitap "yaklaşık 101.300" der). Birlikte çöz çeldiricileri: 76 · 13.600 · 9,8 = 10.129.280 (yüz kat büyük, cm'yi metreye çevirmeyi unutmak); toplama işleminin sonucu 13.610,56 olup basınç değildir.

### Sahne 5 · Basınç birimleri

Tahta: ortada y = 280'de üç kart yan yana, aralarında "=" (40 birim): "76 cmHg" (x 60–300, y 235–325), "1,013 · 10⁵ Pa" (x 370–630), "1 atm" (x 700–940). Kartlar 30 birimle yazılır, sarı çerçevelidir (basınç). Üstte (y 120) "deniz seviyesinde" (22 birim, x 380). Kartlar soldan sağa 400 ms `out` ile, 300 ms arayla gelir; "=" işaretleri kartlardan hemen sonra 300 ms `out`.

Anlatım:
1. Günlük hayatta farklı basınç birimleri kullanılır.
2. Deniz seviyesinde açık hava basıncı 76 cmHg'dir.
3. Aynı basınç, yaklaşık 1,013 · 10⁵ Pa'dır.
4. Bunların hepsi 1 atmosfere eşittir.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir istasyon, deniz seviyesinde açık hava basıncını 1 atm olarak veriyor. Ela bu basıncı Torricelli düzeneğiyle ölçse cıva sütunu kaç cm olur? **76 cm** / 7,6 cm / 760 cm. Dayandığı anlatım: sahne 5, 2–4; sahne 1, 6. İpuçları: "1 atm, deniz seviyesindeki açık hava basıncıdır." · "Sahne 1'deki fark 76 cm idi."

Defter ("Atmosfer"): **1 atm = 76 cmHg = 1,013 · 10⁵ Pa.**

### Sahne 6 · Boruyu eğ

Tahta: kap x 140–860, y 380–520, cıva yüzeyi y = 400. Tek boru (ince, boyu 340 birim, üst ucu kapalı): alt ucu (500, 424), eksen yönü (sin θ, −cos θ); θ kaydırıcıyla 0°'den 30°'ye değişir (kaydırıcıda derece yazılmaz; uçlarda "dik" ve "eğik"). Cıva sütunu alt uçtan dikey yüksekliği her zaman 282 birim (y 424 → 142) olacak biçimde uzar: boy 282 / cos θ (θ = 0° için 282, 15° için 292, 30° için 326 birim). Kesikli çizgiler y = 142 ve y = 400 (x 100–900), çift ok x 900, y 142 → 400, yanında "76 cm" (x 815, y 290). Sütunun yanında, boruyla paralel, gri çift ok ve "boy" (22 birim). Kaydırıcı: x 300–700, y 540; uçlarda "dik" (x 250) ve "eğik" (x 730). Kaydırıcı hareket ettikçe boru, alt ucu sabit, 300 ms `linear` ile yeni açıya döner, sütunun boyu ve "boy" oku eşzamanlı uzar; "76 cm" ölçüsü hiç değişmez.

Anlatım:
1. Şimdi tek bir boruyu eğerek deneyelim.

Dene (`tag: 'Dene'`; kaydırıcı, en az üç konum denenmeden soru açılmaz): Boruyu eğdikçe hangisi sabit kalır? **Cıvanın dikey yüksekliği** / Cıva sütununun boru boyunca uzunluğu / Boşluğun uzunluğu. Dayandığı anlatım: sahne 3, 3–5. İpuçları: "'76 cm' ölçüsüne bak: oynuyor mu?" · "Boy uzuyor; peki dikey yükseklik?"

Sonra:
2. Eğim arttıkça cıva sütunu boru boyunca uzar.
3. Cıvanın dikey yüksekliği 76 cm olarak kalır.
4. Açık hava basıncını belirleyen, dikey yüksekliktir.

### Çıkış soruları

1. (yanılgı) Ela "Kalın boruda daha çok cıva var, sütun daha yüksek durur" diyor. Doğru mu? **Yanlış; borunun kesiti cıva seviyesini değiştirmez** / Doğru; cıva çoğalınca ağırlık artar / Doğru, ama yalnızca eğik boruda. (sahne 3)
2. Sıvı basıncı ile açık hava basıncı Torricelli düzeneğinde nasıl karşılaştırılır? **İkisi de ağırlıktan doğar ve dengede eşittir** / Sıvı basıncı ağırlıktan, açık hava basıncı rüzgârdan doğar / Açık hava basıncı her zaman daha büyüktür. (sahne 2)
3. P₀ = h · d · g işleminde h, Torricelli düzeneğinde neyi gösterir? **Cıva sütununun dikey yüksekliğini** / Borunun toplam uzunluğunu / Kaptaki cıvanın derinliğini. (sahne 3, 4)
4. (yeni durum) Deniz seviyesinde, 0 °C'de bir Torricelli düzeneğinde cıva sütunu 76 cm'de duruyor. Bu basınç kaç atm'dir? **1 atm** / 76 atm / 0,76 atm. (sahne 5)
5. (yeni durum) Ela deneyi eğik boruyla yapıyor; cıvanın dikey yüksekliği 76 cm. Cıvanın boru boyunca ölçtüğü uzunluk için ne söylenir? **76 cm'den uzundur** / Tam 76 cm'dir / 76 cm'den kısadır. (sahne 6)

Özet: Açık hava basıncı, kaptaki cıvaya bastırır; cıva sütunu bunu dengeler. · P₀ = P cıva = h · d · g; boru şekli, kesiti ve eğimi etkisizdir. · 1 atm = 76 cmHg = 1,013 · 10⁵ Pa. · **Hava dışarıdan iter, cıva sütunu içeriden tartar; ikisi dengede durur.**

## C3 · Atmosfer basıncı her yerde aynı değil

- **Fikir:** Açık hava basıncı yeryüzünde yerden yere değişir (atmosfer basıncı); hava yüksek basınçtan alçak basınca yer değiştirir ve rüzgâr oluşur. Aynı ilke günlük durumlarda da işler.
- **Giriş ekranı sorusu:** Hava durumu haritasındaki "alçak basınç" yazısı yarın rüzgâr çıkacağını nasıl haber verir?
- **Kaynak:** Ders kitabı s. 165 (sıcaklık: hava molekülleri daha büyük süratle hareket eder, birbirinden uzaklaşır, hava genleşir, yoğunluğu azalır, hafifler ve yükselir, alçak basınç; soğuyan hava yoğunlaşır, yüksek basınç; hava yoğunluğu; Magdeburg bilgi notu), s. 162 ("Rüzgârın oluşumu" metni; "Yüksek ve alçak basınç alanları" şeması; "Rüzgâr enerjisi" metni; rüzgâr türbinleri), s. 163 (önerme örneği: "Gökyüzüne doğru yükselen balon patlar."), s. 161 (dağcılarda zor nefes, tırmanma programı), s. 166 (pipet alıştırması; Örnek III: deniz seviyesindeki açık hava basıncı her yerde aynı değildir), s. 164 (atmosfer basıncı adı). Kitap balon, dağcı ve pipeti açıklamasız bırakıyor; açıklamalar C1 ve C2'de öğretilen ilkeden kurulur (`PLAN.md` karar 9): sahne 6, 7, 9. Hava durumu haritası cümlesi coğrafya bağı içindir (program: "coğrafya disipliniyle ilişki kurulur").
- **Sınır:** Basınç değeri (hPa, mbar) yok. Dünya'nın dönüşünün yönü saptırması tek cümledir (sahne 3); rüzgârın süratini belirleyen etmenler, jet akımları, mevsim, okyanus akıntıları, atmosferin bileşimi yüzdeleri alınmaz (programda yok). Balonun neden yükseldiği anlatılmaz (gazlarda kaldırma yok). Vantuz, ters bardak, uçak yok. Magdeburg'da yıl ve at sayısı yok. Migren, eklem ağrısı, burun kanaması alınmaz (program istemiyor, ilkeden kurulamaz). Günlük hayattan eleştirel örnek verme (E3.10) `site dışı`.
- **Güç kavramlar ve gösterimi:** (1) Isınan havanın yükselmesi: aynı hava iki kutuda, ısınınca kutu 180 × 180'den 320 × 270'e genişler, tanecik sayısı aynı kalır. (2) Hava akışı: iki panelli şemada yüzeyde hava yüksek basınç alanından alçak basınç alanına ilerleyen oklar. (3) İçerideki ve dışarıdaki basınç: dıştaki oklar kısalırken içteki oklar aynı kalır (balon, Magdeburg, pipet).
- **Hedeflenen yanılgı:** "Hava alçak basınçtan yüksek basınca doğru akar" ve "açık hava basıncı her yerde aynıdır".
- **Akılda kalıcı cümle:** Hava, basıncın yüksek olduğu yerden alçak olduğu yere akar.

### Hatırla

Başlık "Hatırla" (`tag: 'Hatırla'`).

1. (C2, bir önceki ders) Torricelli düzeneğinde cıva sütunu 76 cm'de dururken, kaptaki cıva yüzeyine bastıran P₀ için ne söylenir? **Cıva sütununun basıncına eşittir** / Daha büyüktür / Daha küçüktür.
2. (C1, daha eski) Yükseldikçe havanın yoğunluğu ve açık hava basıncı nasıl değişir? **İkisi de azalır** / İkisi de artar / Yoğunluk azalır, basınç artar.

### Sahne 1 · Isınan hava genleşir

Tahta: iki kutu (açık çizgi). Sol kutu "soğuk hava": x 110–290, y 200–380; 16 tanecik (4 × 4, x 135, 175, 215, 255; y 225, 265, 305, 345). Sağ kutu "ısınan hava": başta aynı boy, x 400–580, y 200–380, aynı dizilimle 16 tanecik (x 425, 465, 505, 545; y 225, 265, 305, 345). Ortada beyaz ok x 300 → 390, y 290, üstünde "ısıt" (x 320, y 268). Kutuların altında adları (x 110 ve x 400, y 420). Tanecikler soluk gri-mavi; titreşimleri: sol kutuda ±3 birim, 450 ms periyot, `linear`; sağ kutuda başta aynı.

Hareket: 1. cümlede sağ kutudaki titreşim 300 ms içinde ±3'ten ±8 birime, periyot 450'den 150 ms'ye geçer ve sürer. 2. cümlede sağ kutu 1000 ms `inOut` ile x 400–720, y 130–400'e genişler; tanecikler aynı sürede 4 × 4 dizilimle x 440, 520, 600, 680 ve y 175, 245, 315, 385 konumlarına dağılır; "ısınan hava" yazısı y 430'a iner. 3. cümlede sağ kutunun üstüne "seyrek" (x 460, y 100), sol kutunun üstüne "sık" (x 150, y 170) 400 ms `out`. 4. cümlede sol kutunun titreşimi ±3'ten ±1,5 birime, periyot 450'den 600 ms'ye geçer (300 ms `inOut`).

Anlatım:
1. Sıcaklık arttığında hava molekülleri daha büyük süratle hareket eder.
2. Birbirinden uzaklaşırlar: hava genleşir.

Tahmin (`tag: 'Tahmin et'`): Aynı miktardaki hava ısınıp genleşince yoğunluğu nasıl olur? **Azalır; aynı hava daha büyük yere yayılır** / Artar; moleküllerin sürati artar / Değişmez. Dayandığı anlatım: 1–2 ve yoğunluk (ön bilgi). İpuçları: "Tanecik sayısı aynı, kutu büyüdü." · "Birim hacimde kaç tanecik var?"

Gör: "seyrek" ve "sık" yazıları belirir.

Sonra:
3. Genleşen havanın yoğunluğu azalır; hava daha hafif olur.
4. Soğuyan havanın molekülleri yavaşlar ve birbirine yaklaşır.
5. Soğuyan havanın yoğunluğu artar.

### Sahne 2 · Alçak ve yüksek basınç alanları

Tahta: iki panel. Sol panel "alçak basınç alanı": x 40–480, y 90–470; sağ panel "yüksek basınç alanı": x 520–960, y 90–470. Her panelin zemini kahverengi çizgi (kalınlık 6) y = 440. Sol panelde: yukarı ok (soluk gri-mavi, kalınlık 14) x 260, y 400 → 210 (190 birim); yüzeyde yanlardan merkeze iki ok (aynı renk, kalınlık 10): x 70 → 200 ve x 450 → 320, y = 420. Sağ panelde: aşağı ok x 740, y 120 → 330 (210 birim); yüzeyde merkezden yanlara iki ok: x 700 → 580 ve x 780 → 900, y = 420. Başlıklar zeminin altında (x 260 ve x 740, y 490, ortalı): "alçak basınç alanı", "yüksek basınç alanı". Kitaptaki kırmızı oklar bu renklerle çizilir.

Hareket: 1. cümlede sol paneldeki yukarı ok alt ucundan uzayarak 600 ms `out` ile çizilir. 2. cümlede yan oklar ve "alçak basınç alanı" 500 ms `out`. 3. cümlede sağ paneldeki aşağı ok üst ucundan uzayarak 600 ms `out`. 4. cümlede yan oklar ve "yüksek basınç alanı" 500 ms `out`. 5. cümlede "atmosfer basıncı" (sarı, 30 birim, x 500, y 540, ortalı) 400 ms `out`.

Anlatım:
1. Isınan hava genleşir, hafifler ve yükselir.
2. Yükselen hava yeryüzünde alçak basınç alanı oluşturur.
3. Soğuyan hava yoğunlaşır, aşağı iner.
4. Alçalan hava yeryüzünde yüksek basınç alanı oluşturur.
5. Yeryüzünde yerden yere değişen açık hava basıncına atmosfer basıncı denir.

Soru (`tag: 'Sıra sende'`): Bir bölgede yeryüzündeki hava ısınıp yükseliyor. Orada yeryüzünde nasıl bir basınç alanı oluşur? **Alçak basınç alanı** / Yüksek basınç alanı / Basınç aynı kalır. Dayandığı anlatım: 1–2. İpuçları: "Yükselen hava yeryüzünden ayrılıyor." · "Isınan hava alçak basınç alanı oluşturur."

### Sahne 3 · Rüzgâr

Tahta: sahne 2'nin son hâli (iki panel). "atmosfer basıncı" yazısı kalkar. Eklenen: y = 380'de, x 740'tan x 260'a doğru ilerleyen dört beyaz-gri ok başı (chevron, 24 birim genişlik), aralık 120 birim; sağ panelin altından sol panelin üstüne uzanan çizgi görünümünde. Yanında "rüzgâr" (22 birim, x 480, y 350).

Hareket: tahminden sonra dört ok başı soldaki konumlarına doğru 2400 ms boyunca `linear` ile ilerler ve baştan tekrarlar (3. cümleye kadar). "rüzgâr" yazısı 2. cümlede 400 ms `out`.

Tahmin (`tag: 'Tahmin et'`; sezgiyle): Yüksek ve alçak basınç alanları yan yana. Yeryüzüne yakın hava hangi yöne ilerler? **Yüksek basınç alanından alçak basınç alanına** / Alçak basınç alanından yüksek basınç alanına / Hiç ilerlemez. İpuçları: "Hava, basıncın büyük olduğu yerden küçük olduğu yere doğru iter." · "Şemadaki oklar yüzeyde hangi yöne bakıyor?"

Gör: ok başları sağdan sola ilerler.

Anlatım:
1. Hava, yüksek basınç alanından alçak basınç alanına doğru hareket eder.
2. Atmosferdeki bu hava hareketine rüzgâr denir.
3. Dünya'nın dönüşü rüzgârın yönünü saptırır.
4. Coğrafyadaki hava durumu haritaları bu alanları gösterir.
5. Alçak basınç yazılan yere doğru rüzgâr eser.

### Sahne 4 · Rüzgâr enerjisi

Tahta: sol yarıda rüzgâr: üç hava oku (soluk gri-mavi, kalınlık 10) x 60 → 350, y 200, 270 ve 340. Ortada rüzgâr türbini: kule (açık gri) x 520–540, y 270–440; gövde x 480–560, y 250–290; pervane: merkez (480, 270), üç kanat, uzunluk 100, kalınlık 10, 120° arayla; jeneratör gövdenin içinde x 500–555, y 255–285, üstünde "jeneratör" (22 birim, x 510, y 225). Sağda ok (beyaz) x 560 → 700, y 270 ve "elektrik" (x 720, y 270). Üstte (y 80) "yenilenebilir enerji" (x 300).

Hareket: 1. cümlede rüzgâr okları 500 ms `out`; "yenilenebilir enerji" 400 ms `out`. 2. cümlede türbin 500 ms `out`, ardından pervane 2000 ms'de bir tam tur, `linear`, sürekli döner. 3. cümlede "jeneratör" ve ok ile "elektrik" 400 ms `out`.

Anlatım:
1. Rüzgâr, yenilenebilir enerji kaynakları arasında önemli bir yere sahiptir.
2. Rüzgâr türbininin pervaneleri rüzgârın etkisiyle döner.
3. Bu hareket, jeneratörün elektrik üretmesini sağlar.
4. Rüzgâr enerjisi, alçak ve yüksek basınç alanları arasındaki hava hareketinden gelir.

### Sahne 5 · Alçak mı, yüksek mi?

Tahta: iki kutu: "Alçak basınç alanı" (x 60–480) ve "Yüksek basınç alanı" (x 520–940); başlıklar y 60–110, kutu içleri y 130–520. Yerleşen kartın metni kutuda alt alta yazılır (22 birim, satır aralığı 56; iki satıra bölünebilir). Ortada (x 280–720, y 190–310) sıradaki kart. Kart 500 ms `inOut` ile kutusuna küçülerek gider. Altı kartı da öğrenci yerleştirir.

Anlatım:
1. Alçak ve yüksek basınç hakkında önermeler kuralım.

Dene (`tag: 'Dene'`; kart başına seçim). Soru kalıbı: "<kart> hangi basınç alanı için doğrudur?" Yanlışta ipucu: "Önce havanın yükseldiğini mi, alçaldığını mı düşün."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Isınan hava genleşir | Alçak basınç alanı | Evet. Isınan hava yükselir; alçak basınç oluşur. |
| Soğuyan hava yoğunlaşır | Yüksek basınç alanı | Evet. Soğuyan hava alçalır; yüksek basınç oluşur. |
| Hava yükselir | Alçak basınç alanı | Evet. Yükselen hava alçak basınç alanı oluşturur. |
| Hava alçalır | Yüksek basınç alanı | Evet. Alçalan hava yüksek basınç alanı oluşturur. |
| Yüzeyde hava merkeze doğru gelir | Alçak basınç alanı | Evet. Hava alçak basınç alanına doğru akar. |
| Yüzeyde hava merkezden yanlara yayılır | Yüksek basınç alanı | Evet. Hava yüksek basınç alanından uzaklaşır. |

Sonra:
2. Alçak basınçta hava yükselir, yüksek basınçta alçalır.

### Sahne 6 · Yükselen balon

Tahta: zemin x 100–900, y = 470 (kahverengi çizgi). Balon: soluk gri-mavi çizgili daire, merkez (500, 400), yarıçap 40. Balonun solunda sağa bakan sarı ok, 30 birim (x 424 → 454), sağında sola bakan sarı ok (x 576 → 546): dış basınç. Balonun içinde iki sarı ok dışa bakar, 30 birim: solda x 496 → 466, sağda x 504 → 534 (uçları yüzeyin 6 birim içinde): iç basınç. Dış oklar için "dışarısı" (x 320, y 400), iç oklar için "içerisi" (ortalı, x 500, y 335; balonun içine ince çizgiyle bağlı) yazılır. Sağda dikey ölçü "yükseklik" (−90°, x 930, y 300) ve çift ok x 920, y 470 → 150.

Hareket: 1. cümlede balon ve oklar 500 ms `out`. Birlikte çöz'den sonra balon 1200 ms `inOut` ile (500, 400)'den (500, 150)'ye yükselir; aynı sürede yarıçapı 40'tan 84'e büyür; dış oklar 30'dan 10 birime kısalır, iç oklar 30'da kalır. 4. cümlede balon 100 ms `in` ile kaybolur ve yerinde 10 ışın (uzunluk 40, soluk gri-mavi çizgi) merkezden dışa 300 ms `out` ile yayılır.

Anlatım:
1. Balon yükseldikçe dışarıdaki açık hava basıncı azalır.
2. İçerideki hava, balonu dışarı doğru itmeye devam eder.

Birlikte çöz (`tag: 'Birlikte çöz'`): Dışarıdaki basınç azalıyor, içerideki itme sürüyor. Balon ne olur? **Şişer** / Büzülür / Değişmez. Dayandığı anlatım: bu sahne 1–2; C1 sahne 3. İpuçları: "İçeriden itme, dışarıdan itmeden büyük kaldı." · "Dışarıdaki itme küçülünce balonu kim tutar?"

Gör: balon yükselir ve büyür.

Sonra:
3. İçerideki basınç dışarıdakinden büyük olunca balon şişer.
4. Yeterince yükselirse balon patlar.

### Sahne 7 · Dağcının nefesi

Tahta: iki kutu, aynı boyda (220 × 220): "vadide" kutusu x 130–350, y 170–390; "zirvede" kutusu x 450–670, y 170–390; adları kutuların altında (y 430). Vadi kutusunda 24 tanecik (6 sütun × 4 satır, x 160, 196, 232, 268, 304, 340; y 210, 258, 306, 354), zirve kutusunda 6 tanecik (3 sütun × 2 satır, x 520, 560, 600; y 250, 330). Üstte "bir soluk" (x 300, y 130). Sağda merdiven (açık çizgi, 4 basamak, x 720–940, y 200–440; basamak 55 × 60) ve Ela beyaz nokta (yarıçap 10), başlangıçta (740, 430).

Hareket: 1. cümlede vadi kutusu 500 ms `out`. 2. cümlede zirve kutusu 500 ms `out`. 3. cümlede "bir soluk" yazısı 400 ms `out`. 4. cümlede merdiven 400 ms `out`; Ela her basamağa 500 ms `inOut` ile çıkar, basamaklar arasında 400 ms durur (toplam 4 çıkış, 3 durak).

Anlatım:
1. Dağcılar yükseldikçe daha zor nefes alır.
2. Yükseklerde havanın yoğunluğu azdır.
3. Aynı hacimdeki bir soluğa daha az hava girer.
4. Dağcılar, vücutları alışsın diye yavaş yavaş tırmanır.

Soru (`tag: 'Sıra sende'`): Ela kıyıdaki kentten yüksek bir kayak merkezine çıkıyor ve daha zor nefes alıyor. Neden? **Aynı hacimde daha az hava vardır** / Orada hava daha ağırdır / Açık hava basıncı artmıştır. Dayandığı anlatım: sahne 7, 1–3; C1 sahne 2, 4, 5. İpuçları: "Yükseldikçe havanın yoğunluğu nasıl değişir?" · "Bir soluk, hep aynı hacimdir."

### Sahne 8 · Magdeburg yarım küreleri

Tahta: iki metal yarım küre, birleşme çizgisi x = 500; sol yarım merkez (500, 280), yarıçap 100, sağ yarım aynı (açık gri dolgu, çizgi kalın 5). İçlerinde 12 soluk gri-mavi tanecik (3 satır × 4 sütun, x 440–560, y 235–325). Küreyi çevreleyen altı sarı ok kürenin yüzeyine bakar (uçları yüzeyden 8 birim uzakta, boy 50): üst (500, 172), alt (500, 388), ve köşegenlerde dört ok (±71 birim ofsetli). Küre içinde, yüzeyin hemen içinde aynı boyda altı ok dışa bakar. Sağda ve solda turuncu oklar: sol x 398 → 298, sağ x 602 → 702, y = 280 (100 birim), yanlarında "kuvvet" (turuncu, x 270 ve x 720, y 250).

Hareket: 1. cümlede iki yarım küre, soldan x −60'tan ve sağdan x +60'tan 600 ms `inOut` ile birleşme noktasına gelir; sonra çevredeki oklar ve iç oklar 400 ms `out`. 2. cümlede kürenin içindeki on iki tanecik ve altı iç ok 500 ms `in` ile kaybolur. 3. cümlede turuncu oklar 400 ms `out` ile belirir; küre 3 kez ±4 birim titreşir (her biri 100 ms, `linear`), yerinden ayrılmaz. 4. cümlede dış sarı oklar 300 ms boyunca 0,6 → 1 parlaklığa vurgulanır.

Anlatım:
1. Otto von Guericke iki metal yarım küreyi birleştirdi.
2. Pompayla kürelerin içindeki havayı boşalttı.
3. Yarım küreleri zıt yönlere çeken atlar onları ayıramadı.
4. İçeride hava kalmayınca dışarıdaki açık hava basıncı küreleri bir arada tuttu.

Soru (`tag: 'Sıra sende'`): Pompayla havayı boşaltmasaydı atlar çekince küreler ne olurdu? **Kolayca ayrılırdı; içerideki hava dışarıdakini dengelerdi** / Yine ayrılmazdı / Kendiliğinden birbirini iterdi. Dayandığı anlatım: sahne 8, 2–4; C2 sahne 2, 4 (iki basıncın dengesi). İpuçları: "İçeride hava kalmayınca dışarıdaki basınç tutuyordu." · "İçeride hava varsa içeriden de itiliyor."

### Sahne 9 · Pipetle içmek

Tahta: bardak x 340–560, y 260–470; içecek (mavi) x 342–558, y 300–470 (yüzey y = 300). Pipet (açık gri-mavi çizgi, genişlik 22) x 440–462, y 110–440, alt ucu içeceğin içinde; pipetin içinde içecek y 300–440, üstünde hava: 6 soluk gri-mavi tanecik (2 sütun × 3 satır, x 445 ve 457; y 150, 200, 250). Pipetin üst ucunda ağız (açık çizgi, 60 × 30, x 421–481, y 80–110). İçecek yüzeyinde iki sarı ok aşağı, 50 birim: x 370 ve x 530, y 250 → 298. Yanında "açık hava basıncı" (x 580, y 250). Pipetin yanında "az hava" (x 480, y 160), 3. cümleye kadar gizli.

Hareket: 1. cümlede pipetin içindeki 6 taneciğin 4'ü yukarı çıkıp ağızdan 500 ms `in` ile çıkar (2 tanecik kalır); "az hava" 400 ms `out` ile belirir. 3. cümlede pipetin içindeki içeceğin üst yüzeyi y 300'den y 170'e 1000 ms `inOut` ile yükselir; kalan 2 tanecik yukarı ağıza doğru itilir; dış oklar 300 ms boyunca 0,6 → 1 parlaklığa vurgulanır.

Anlatım:
1. Pipetle içerken ağzın pipetin içindeki havayı azaltır.
2. Pipetin içindeki basınç, dışarıdaki açık hava basıncından küçük olur.
3. Açık hava basıncı, bardaktaki sıvıyı pipette yukarı iter.
4. Torricelli'de de açık hava basıncı cıvayı boruda yukarıda tutuyordu.

Soru (`tag: 'Sıra sende'`): Pipetle içecek içilirken içecek pipette neden yükselir? **Pipetin içindeki basınç azalır; dışarıdaki açık hava basıncı içeceği yukarı iter** / Ağız içeceği çeker; açık hava bir şey yapmaz / İçecek pipetin içinde kendiliğinden yükselir. Dayandığı anlatım: sahne 9, 1–4; C2 sahne 2. İpuçları: "Pipetin içindeki basınç ile dışarıdaki basıncı karşılaştır." · "İçeceğin yüzeyine kim bastırıyor?"

### Çıkış soruları

1. (yanılgı) Ela "Rüzgâr, alçak basınç alanından yüksek basınç alanına doğru eser" diyor. Doğru mu? **Yanlış; hava yüksek basınçtan alçak basınca doğru hareket eder** / Doğru; hava basıncı küçük yerden büyük yere gider / Doğru; yön yalnızca Dünya'nın dönüşüne bağlıdır. (sahne 3)
2. (yeni durum) Bir bölgede hava soğuyor. Orada hava ve yeryüzündeki basınç için ne olur? **Hava yoğunlaşıp alçalır; yüksek basınç alanı oluşur** / Hava genleşip yükselir; alçak basınç alanı oluşur / Hava yükselir; yüksek basınç alanı oluşur. (sahne 1, 2)
3. (yeni durum) A kentinde alçak basınç, B kentinde yüksek basınç var. Rüzgâr nasıl eser? **B'den A'ya doğru** / A'dan B'ye doğru / Rüzgâr esmez. (sahne 3)
4. (yeni durum) Yeryüzünde şişirilip ağzı bağlanan bir balon yüksek bir dağın zirvesine çıkarılıyor. Balon için ne olur? **Dışarıdaki basınç azaldığı için şişer** / Dışarıdaki basınç arttığı için büzülür / Değişmez. (sahne 6)
5. (yeni durum) Pipetin üstünde küçük bir delik var. Ela emiyor ama içecek pipette yükselmiyor. Neden? **Delikten giren hava, pipetin içindeki basıncı dışarıdakine eşit tutar** / Delik içeceği ağırlaştırır / Açık hava basıncı delikte sıfır olur. (sahne 9)

Özet: Isınan hava yükselir ve alçak basınç oluşturur. · Soğuyan hava alçalır ve yüksek basınç oluşturur. · Rüzgâr, bu iki alan arasındaki hava hareketidir; türbinler onunla elektrik üretir. · **Hava, basıncın yüksek olduğu yerden alçak olduğu yere akar.**

## C4 · Konu tekrarı: Açık hava basıncı (`c4-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): yedi kural sırayla toplanır; her kural ortada (x 200–800, y 150–370) bir kartta küçük çizimiyle (çizim 160 × 120 çerçevede kartın solunda, yazı sağında) 400 ms `out` ile belirir; bir önceki kart 300 ms `inOut` ile 60 birim yukarı kayıp 0,45 saydamlığa iner, en eski iki kart 300 ms `in` ile kaybolur ve deftere düşer. Küçük çizimler: (1) hava sütunu ve turuncu ağırlık oku; (2) yan yana sık dizili mavi ve seyrelen gri-mavi tanecikler; (3) derinlik ve yükseklik ölçüsü; (4) Torricelli düzeneğinin küçük çizimi (karşılıklı iki ok); (5) "1 atm = 76 cmHg = 1,013 · 10⁵ Pa" yazısı; (6) yukarı ve aşağı ok; (7) yüzeyde sağdan sola ilerleyen oklar.

Anlatım:
1. Bu konuda öğrendiklerimizi yedi kuralda toplayalım.
2. Atmosferdeki gazlar, ağırlıkları nedeniyle yüzeylere açık hava basıncı uygular.
3. Sıvı sıkıştırılamaz kabul edilir; havanın yoğunluğu yükseldikçe azalır.
4. Sıvıda derinlikle basınç artar; havada yükseklikle basınç azalır.
5. Torricelli düzeneğinde açık hava basıncı, cıva sütununun basıncına eşittir.
6. 1 atm, 76 cmHg ve yaklaşık 1,013 · 10⁵ Pa'dır.
7. Isınan hava yükselir: alçak basınç; soğuyan hava alçalır: yüksek basınç.
8. Hava, yüksek basınçtan alçak basınca akar: rüzgâr oluşur.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Ela bir uçurumun dibinde, sonra tepesinde duruyor. Hangisinde açık hava basıncı daha büyüktür? **Uçurumun dibinde** / Tepesinde / İkisinde de eşittir. — C1
2. Havanın yoğunluğu için hangisi doğrudur? **Yeryüzüne yakın yerde daha fazladır** / Her yükseklikte aynıdır / Yükseldikçe artar. — C1
3. (yeni durum) Torricelli düzeneğinde, aynı koşullarda, bu kez kıvrımlı ve kalın bir boru kullanılıyor. Cıva sütununun dikey yüksekliği nasıl olur? **76 cm** / 76 cm'den büyük / 76 cm'den küçük. — C2
4. Torricelli düzeneğinde kaptaki cıva yüzeyine bastıran açık hava basıncı neye eşittir? **76 cm'lik cıva sütununun basıncına** / Borunun üstündeki boşluğun basıncına / Kaptaki cıvanın ağırlığına. — C2
5. Deniz seviyesinde açık hava basıncı 1,013 · 10⁵ Pa'dır. 76 cmHg ile ilişkisi nedir? **İkisi aynı basınçtır; ikisi de 1 atm'dir** / 76 cmHg daha büyüktür / 1,013 · 10⁵ Pa daha büyüktür. — C2
6. (yeni durum) Bir bölgede hava ısınıp yükseliyor. Hangisi doğrudur? **Yeryüzünde alçak basınç alanı oluşur** / Yeryüzünde yüksek basınç alanı oluşur / Basınç değişmez. — C3
7. (yeni durum) A kentinde yüksek basınç, B kentinde alçak basınç var. Rüzgâr nasıl eser? **A'dan B'ye doğru** / B'den A'ya doğru / Rüzgâr esmez. — C3
8. İçindeki hava boşaltılan iki yarım küreyi bir arada tutan nedir? **Dışarıdaki açık hava basıncı** / İçerideki basınç / Kürelerin birbirini çekmesi. — C3

Akılda kalıcı cümle: Basınç yükseldikçe azalır; hava yüksek basınçtan alçak basınca akar.

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.3.4) | Karşılığı |
|---|---|
| Sıvı içindeki basınca neden olan kuvvetin sıvının ağırlığından kaynaklandığı hatırlatılır | C1 Hatırla 1, sahne 1 (1. cümle) |
| Havanın da sıvı gibi bir akışkan olduğu, sıvı basıncına benzer durumun hava için de söz konusu olduğu (SDB1.1) | C1 sahne 1 (2.–5. cümle) |
| a) Sıvı basıncı bilgisinden yararlanarak açık hava basıncına yönelik hipotez kurar | C1 sahne 1 ve sahne 3 (seçenekli tahmin, `PLAN.md` karar 16) |
| Beyin fırtınası, düşüncelerin açık fikirlilikle ifade edilmesi (SDB2.1, E3.5) | `site dışı` |
| b) Sıvı basıncıyla açık hava basıncı arasındaki ilişkileri listeler | C1 sahne 6 (kart sınıflaması) |
| Açık havanın etkisiyle oluşan basınç ile sıvı basıncı arasındaki benzerlik ve farklılıklar | C1 sahne 6; C2 sahne 2 (7. cümle) |
| Sıvının homojen dağıldığı, havanın yoğunluğunun homojen olmadığı | C1 sahne 2 |
| Derinlik ile yüksekliğin basınçla ilişkilendirilmesi | C1 sahne 3, sahne 4 |
| Atmosferin en üst noktasından deniz seviyesine olan mesafe yükseklerde daha az, basınç daha az | C1 sahne 3 (4.–5. cümle) |
| Açık hava basıncının ilk kez Torricelli tarafından ölçüldüğü ve ölçme yöntemi | C2 sahne 1 |
| Cıva sütununun ağırlığı ile açık hava basıncının birbirini dengelemesi | C2 sahne 2 |
| c) Sıvı basıncıyla açık hava basıncını karşılaştırır | C2 sahne 2, sahne 3; C2 çıkış 2 |
| Atmosfer (atm) birimi, temel birimler cinsinden hesap | C2 sahne 4 (pascal hesabı), sahne 5 (atm) |
| Açık hava basıncının sıcaklık (genleşme) ve hava yoğunluğunun yerel değişmesine bağlı olarak yeryüzünde değişmesi; adı atmosfer basıncı | C3 sahne 1, sahne 2 (5. cümle) |
| Alçak ve yüksek basınç bölgeleri arasındaki hava yer değiştirmesi, rüzgâr; coğrafya ile ilişki | C3 sahne 2, sahne 3 (4. cümle: hava durumu haritaları) |
| Rüzgâr oluşumunun yenilenebilen enerji kaynakları sağlamadaki önemi (OB8) | C3 sahne 4 |
| ç) Açık hava basıncına ilişkin önermeler sunar; alçak ve yüksek basınç üzerinden önermeler | C3 sahne 5 (kart sınıflaması), sahne 6 (önerme örneği) |
| Günlük hayatta açık hava basıncına yönelik durumlara eleştirel bakarak örnekler verme (E3.10) | `site dışı` (C3 sahne 6–9 hazır durumlar sunar) |
| d) Bilgilerini farklı durumlarda değerlendirir | C3 sahne 6–9, C3 çıkış 4–5; C4 soru 3, 7, 8 |
| Köprü kurma: basınç ile günlük hayattaki olaylar | C3 sahne 6–9 |
| Sınır: yorumlama ile sınırlı; hesap yalnızca atm tanıtımında | C2 sahne 4 tek işlemdir; C1, C3 ve C4'te hesap yok |

Fazla olan: dağcının zor nefesi ve tırmanma programı (kitap s. 161, programda adıyla yok); Magdeburg yarım küreleri (kitap s. 165) ve pipet (kitap s. 166) programda adıyla yok, `PLAN.md` karar 9 ile alındı; kulak tıkanması, balonun şişmesi ve pipetin açıklamaları ile hava durumu haritası cümlesi kitap dışı, ilkeden kurulmuş; C2 sahne 2'deki "basınç kaptaki cıvadan borunun ağzına ulaşır" bağ cümlesi ve 76 cm → 0,76 m çevirisi kitapta yazılı değil. Eksik olan: yok (beyin fırtınası ve E3.10 `site dışı`). Hesaplanan sorular: C1'de sayı yok (tahta ölçüleri ve ok boyları hesaplandı); C2 birlikte çöz (0,76 · 13.600 · 9,8 = 101.292,8 ≈ 101.300; çeldiriciler 10.129.280 ve 13.610,56), C2 sıra sende (1 atm → 76 cm), çıkış 3, 4, 5 ve C4 5. soru hesaplandı; C3 ve C4'ün öteki soruları mantık sorularıdır, çeldiriciler tek tek denetlendi.
