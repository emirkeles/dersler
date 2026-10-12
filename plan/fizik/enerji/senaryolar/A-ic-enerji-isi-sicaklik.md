# Senaryolar — Konu A · İç enerji, ısı, sıcaklık

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.1, `../PLAN.md` bölüm 3 (A1, A2), "Kısa ders listesi (kararlardan sonra)", bölüm 7 (karar 2, 15, 16, 19) ve bölüm 8 ("A" satırları). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Bu dosya öteki konu senaryolarının örneğidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("20 °C" → "yirmi derece", "700 g" → "yedi yüz gram", "J" → "joule").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: kapları Ela hazırlar.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla (temanın ilk dersi dışında) → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu.
- Renkler tema boyunca aynıdır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle (madde miktarı) turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz. Tahta koyudur: çizgiler açık renklidir.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren).
- Bu konuda izometrik figür yoktur; çizimler düz vektördür (`dersler/a-araclar.js`):
  - **Kap:** 150 × 170 birimlik beher (açık renkli 3 birim çizgi), içinde mavi yarı saydam su; altında etiket ("500 g · 20 °C": kütle turkuaz, sıcaklık sarı).
  - **Tanecik penceresi:** kabın yanında ya da altında 150 birim çaplı daire, kaba iki ince çizgiyle bağlı; içinde tanecikler (yarıçapı 9 birim, açık mavi daire). Tanecik yerinde titreşir.
  - **Tanecik sayısı madde miktarını gösterir:** 100 g su için 2 tanecik (200 g → 4, 300 g → 6, 500 g → 10, 700 g → 14). Sayı şematiktir; tahtaya "tanecik sayısı" diye rakam yazılmaz.
  - **Titreşim sıcaklığı gösterir:** genlik 10 °C'ta 3, 20 °C'ta 5, 60 °C'ta 10, 80 °C'ta 13 birim; bir salınım 10 °C'ta 700, 20 °C'ta 600, 60 °C'ta 420, 80 °C'ta 350 ms. Titreşim sahne boyunca tek bir `c.tween` döngüsüyle sürer; her taneciğin başlangıç evresi farklıdır (sabit tohumlu), yön taneciğe göre değişir.
  - **Termometre:** 26 birim genişliğinde düz cam boru, sarı sütun; üstünde okunan değer sarı yazıyla.
  - **İç enerji çubuğu:** mor yatay çubuk. Boyu yalnızca sıralamayı gösterir (tanecik sayısı × genlik ile orantılı çizilir); yanına sayı ve birim yazılmaz, çünkü iç enerjinin sayısal değeri bu konuda yok.
  - **Isı oku:** turuncu, 7 birim kalın ok; sıcak cisimden soğuk cisme çizilir, üstünde "ısı" yazar.
- İç enerjinin bileşenleri yalnızca A1 sahne 3'te, tek cümleyle geçer. Kinetik enerji "hareket enerjisi" diye söylenir; formül, sembol ve iç enerjinin birimi yok.
- "Isı alan maddenin sıcaklığı artmayabilir" cümlesi bu konuda kurulmaz (Konu C'nin işi). Bu konudaki bütün örneklerde ısı alan maddenin sıcaklığı artar; kural cümlesi yalnızca iç enerjiyi söyler.

## A1 · Isı, sıcaklık, iç enerji: üç ayrı şey

- **Fikir:** Isı, sıcaklık ve iç enerji günlük dilde birbirinin yerine kullanılır ama üç ayrı kavramdır: sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.
- **Giriş ekranı sorusu:** Hava durumu sunucusu "yarın ısı 30 derece olacak" dedi; bu cümlede yanlış olan ne?
- **Kaynak:** Ders kitabı s. 209 (medya metinleri), s. 210 (tanecikler ve hareketleri), s. 211–212 (çay bardağı ve el; boşluk doldurma cümleleri), s. 213 (üç tanım, ısının yönü, Görsel 4.1 ve 4.2, bardak ve kova), s. 214 (doğru–yanlış ifadeler, Kontrol Noktası). Kitap etkinlik ve alıştırmaların cevabını vermez; doğru–yanlış ayrımı kitabın tanımlarından çıkarılır.
- **Sınır:** İç enerjinin neye bağlı olduğu (kütle ve sıcaklık birlikte) ve ısı alınca nasıl değiştiği A2'dedir; A1 yalnızca tanımları ayırır. Formül, kalorimetre kabı, kelvin–santigrat dönüşümü yok. Kelvin ve joule yalnızca birim adı olarak geçer.
- **Güç kavramlar ve gösterimi:** (1) Sıcaklık bir toplam değil, tanecik başına bir ölçüdür: tanecik penceresinde titreşimin genliği ve hızı değişir, tanecik sayısı değişmez. (2) İç enerji toplamdır: aynı titreşimle çok tanecik; mor çubuk uzar. (3) "Maddenin ısısı olmaz": ısı yalnızca iki cisim arasında, turuncu ok olarak görünür; ok bitince tahtada "ısı" diye bir şey kalmaz, kalan cisimlerin içindeki mor çubuklardır.
- **Hedeflenen yanılgı:** Isı ile sıcaklık aynı şeydir ("vücut ısısı 39 derece"); soğuk bir cisim sıcak cisme "soğukluk" verir.
- **Akılda kalıcı cümle:** Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.

### Sahne 1 · "Yarın ısı 30 derece"

Tahta: solda bir televizyon ekranı çerçevesi (x 90–470, y 90–330), içinde güneş simgesi ve "30 °C"; altında konuşma kartı (x 90–470, y 360–440): "Yarın ısı 30 derece olacak." Sağda alt alta üç boş kart (x 560–920; y 110, 220, 330; her biri 90 yüksek): adım adım "sıcaklık" (sarı), "ısı" (turuncu), "iç enerji" (mor) yazılır. Anlatım 6'da ekran ve kartlar 0,3 saydamlığa iner; ortada bir bardak su (kap, x 425–575) ve tanecik penceresi (merkez 500, 390) belirir; tanecikler 20 °C titreşimiyle titreşir.

Anlatım:
1. Hava durumunda sık sık şu cümleyi duyarsın.
2. Günlük dilde ısı ile sıcaklığı birbirinin yerine kullanırız.
3. Fizikte bunlar ayrı kavramlardır; yanlarında bir üçüncüsü daha var.
4. Sıcaklık, ısı ve iç enerji: üç kelime, üç ayrı şey.
5. Üçünü ayırmak için maddenin içine bakmamız gerekiyor.
6. Bütün maddeler gözle görülmeyen taneciklerden oluşur.
7. Bu tanecikler hiç durmaz; sürekli hareket eder.
8. Hareket eden her taneciğin bir hareket enerjisi vardır.

Soru yok (temanın ilk sahnesi; bağlam ve tanecik modeli kurulur). Sahne `c.cont('Devam ›')` ile biter.

### Sahne 2 · Sıcaklık: tanecikler ne kadar hareketli?

Tahta: iki kap yan yana, ikisi de 500 g (10 tanecik). Sol kap (x 170–320, y 110–280) "soğuk su · 10 °C", sağ kap (x 680–830) "sıcak su · 80 °C"; her kabın içinde termometre. Kapların altında tanecik pencereleri (merkez 245, 420 ve 755, 420). Önce yalnızca sol kap ve penceresi; anlatım 3'te sağ kap belirir. Anlatım 5'te iki pencerenin arasına (x 500, y 420) "aynı sayıda tanecik, farklı hareket" yazılır. Anlatım 7'de üstte (y 60) tanım satırı: "sıcaklık → taneciklerin ne kadar hareketli olduğu" ("sıcaklık" sarı).

Anlatım:
1. Ela bir kaba soğuk su koyuyor: termometre 10 °C gösteriyor.
2. Taneciklere yakından bakalım: yerlerinde yavaşça titreşiyorlar.
3. İkinci kapta aynı miktarda sıcak su var: 80 °C.
4. Buradaki tanecikler çok daha hızlı hareket ediyor.
5. İki kapta tanecik sayısı aynı; değişen yalnızca hareketleri.
6. Tanecik ne kadar hareketliyse hareket enerjisi o kadar büyüktür.
7. Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.
8. Sıcaklığı termometreyle ölçeriz; günlük birimi derece santigrattır.
9. Bilimde kullanılan uluslararası birimi ise kelvindir.

Sor (`c.choice`, `tag: 'Sor'`): tahta temizlenir (`c.clearSay()`); iki yeni kap (x 170–320 ve 680–830), etiketleri "P" ve "R", termometreler gizli; ikisinde 6 tanecik; P'de 60 °C titreşimi, R'de 20 °C titreşimi. Soru: "P ve R kaplarında aynı miktarda su var. Hangisinin sıcaklığı daha yüksek?" **P; tanecikleri daha hareketli** / R; tanecikleri daha sakin / İkisi aynı; tanecik sayıları eşit. Dayandığı anlatım: 4–7. İpuçları: "Sıcaklık, taneciklerin hareketliliğini gösterir; hangisi daha hızlı titreşiyor?" · "Tanecik sayısı sıcaklığı belirlemez; harekete bak."

Gör: termometreler belirir (400 ms, `out`): P 60 °C, R 20 °C.

Sonra:
10. Termometre de aynısını söylüyor: P kabı daha sıcak.

Defter (`Sıcaklık`): "Taneciklerin ortalama hareket enerjisinin göstergesi. Termometreyle ölçülür."

### Sahne 3 · İç enerji: hepsinin toplamı

Tahta: solda bir bardak su (kap yarı boyda: 100 × 110, x 150–250, y 170–280; etiket "bardak · 20 °C"), sağda bir kova (260 × 200, x 600–860, y 80–280; etiket "kova · 20 °C"). Altlarında tanecik pencereleri: bardakta 4 tanecik (merkez 200, 420), kovada 24 tanecik (pencere çapı 220; merkez 730, 430); hepsi 20 °C titreşiminde. Anlatım 4'te her pencerenin yanında mor iç enerji çubuğu belirir (bardak: x 290, y 420, boy 40; kova: x 290, y 480, boy 240; çubukların solunda "bardak", "kova" etiketi). Anlatım 7'de üstte tanım satırı: "iç enerji → bütün taneciklerin toplam enerjisi" ("iç enerji" mor).

Anlatım:
1. Şimdi aynı sıcaklıkta bir bardak ve bir kova su düşün.
2. Sıcaklık aynı: iki kapta da tanecikler aynı hareketlilikte.
3. Ama kovada çok daha fazla tanecik var.

Tahmin (`tag: 'Tahmin et'`; durum tanıtıldı, sezgiyle): "Bütün taneciklerin enerjisini toplasak hangisinde toplam daha büyük çıkar?" **Kovada; tanecik sayısı çok daha fazla** / Bardakta; su daha az / İkisinde eşit; sıcaklıkları aynı. Dayandığı anlatım: 1–3. İpuçları: "Su az olunca toplanacak tanecik de azalır." · "Sıcaklık tanecik başına hareketi söyler; toplam için tanecik sayısı da gerekir."

Gör: iki mor çubuk büyür (bardak 0 → 40, kova 0 → 240 birim; 900 ms, `out`).

Sonra:
4. Toplam, kovada çok daha büyük çıkıyor.
5. Bir maddedeki bütün taneciklerin toplam enerjisine iç enerji denir.
6. Bu toplama taneciklerin hareket enerjisi girer.
7. Taneciklerin birbirini çekip itmesinden gelen enerji de girer.
8. Sıcak ya da soğuk, her maddenin bir iç enerjisi vardır.

Defter (`İç enerji`): "Bütün taneciklerin toplam enerjisi. Her maddenin iç enerjisi vardır."

### Sahne 4 · Isı: yoldaki enerji

Tahta: solda sıcak çay bardağı (kap 110 × 130, x 250–360, y 180–310; içi öteki kaplardaki su rengiyle; etiket "çay · 70 °C"), sağda eli gösteren yuvarlatılmış kutu (x 560–760, y 180–310; etiket "el · 33 °C"; el çizilmez). İkisinin altında tanecik pencereleri (merkez 305, 440 ve 660, 440): çayda 8 tanecik, 70 °C titreşimi (genlik 11, salınım 380 ms); elde 8 tanecik, 33 °C titreşimi (genlik 6, salınım 560 ms). Anlatım 2'de kutu çaya yaklaşır (x 560 → 380; 700 ms, `inOut`) ve bardağa değer. Anlatım 4'te çaydan ele turuncu ısı oku (y 245, x 365 → 455; 500 ms, `out`). Anlatım 5–6 sırasında 1.500 ms içinde çayın genliği 11 → 10, elin genliği 6 → 7 olur. Anlatım 9'da ok söner (400 ms, `in`); üstte tanım satırı: "ısı → sıcaklık farkı yüzünden aktarılan enerji" ("ısı" turuncu).

Anlatım:
1. Ela soğuk bir günde sıcak çay bardağını avucuna alıyor.
2. Çay 70 °C, Ela’nın eli yaklaşık 33 °C.
3. İkisi birbirine değiyor ve sıcaklıkları farklı.
4. Bu durumda sıcak olandan soğuk olana enerji aktarılır.
5. Çayın tanecikleri biraz yavaşlıyor.
6. Elin tanecikleri biraz hızlanıyor.
7. Sıcaklık farkı yüzünden aktarılan bu enerjiye ısı denir.
8. Isı hep sıcaklığı yüksek olandan düşük olana aktarılır.
9. Isı bir maddenin içinde durmaz; yalnızca aktarılırken vardır.
10. Bu yüzden “çayın ısısı” denmez; çayın sıcaklığı ve iç enerjisi vardır.
11. Isı bir enerji olduğu için birimi joule’dür.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): solda soğuk meyve suyu kutusu ("kutu · 5 °C"), sağda el ("el · 33 °C"), birbirine değiyor; ok yok. Soru: "Ela buzdolabından çıkan 5 °C’luk kutuyu tutuyor. Isı hangi yönde aktarılır?" **Elden kutuya** / Kutudan ele / Hiçbir yöne; kutu soğuk olduğu için ısı aktarılmaz. Dayandığı anlatım: 4, 8. İpuçları: "Isı, sıcaklığı yüksek olandan düşük olana aktarılır; hangisi daha sıcak?" · "Kutu soğuktur ama elden daha soğuktur: sıcaklık farkı var."

Gör: turuncu ok elden kutuya çizilir (500 ms, `out`); elin genliği 6 → 5, kutunun genliği 3 → 4.

Sonra:
12. El ısı verdiği için kutu “soğuk” hissedilir.

Tahmin (`KIT.tahminAl`, `tag: 'Tahmin et'`; doğru şık aranmaz, seçim kaydedilir): "Çaydan ısı alan elin iç enerjisi sence nasıl değişti?" Arttı / Azaldı / Değişmedi. Seçimden sonra tek cümle:
13. Bu tahmini aklında tut; cevabını bir sonraki derste bulacağız.

Defter (`Isı`): "Sıcaklık farkı yüzünden aktarılan enerji. Sıcaktan soğuğa; birimi joule."

### Sahne 5 · Üç kelime yan yana

Tahta: üç sütunlu özet tablosu (`KIT.tablo`; x 110, y 90; sütunlar 240 / 300 / 240; satır yüksekliği 60; yazı 22). Başlık: "Kavram · Ne? · Nasıl bilinir?". Satırlar anlatımla tek tek açılır: "sıcaklık · taneciklerin hareketliliği · termometre, °C" (sarı) · "iç enerji · bütün taneciklerin toplam enerjisi · ölçülmez, karşılaştırılır" (mor) · "ısı · aktarılan enerji · joule" (turuncu). Tablonun altında (y 400–470) örnek cümle kartı.

Anlatım:
1. Üç kavramı yan yana koyalım.
2. Sıcaklık, taneciklerin ne kadar hareketli olduğunu söyler.
3. İç enerji, bütün taneciklerin toplam enerjisidir.
4. Isı ise bir cisimden ötekine aktarılan enerjidir.
5. Şimdi bu üç kelimeyi cümlelerde doğru yere koyalım.

Çözülmüş örnek (kart: "Tost makinesi uzun süre çalışınca mutfağın …… yükseldi."):
6. Mutfakta yükselen şey termometrenin gösterdiği değerdir.
7. O hâlde boşluğa “sıcaklığı” yazılır.

Kartta boşluk sarı "sıcaklığı" ile dolar (300 ms, `out`); kart 0,45'e iner.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "Sıcak çayı tutunca çaydan elime **ısı** geçti ve elimin …… arttı."; ilk boşluk turuncu "ısı" ile dolu gelir): "İkinci boşluğa hangisi yazılır?" **sıcaklığı** / ısısı / soğukluğu. Dayandığı anlatım: sahne 4, 4–10; bu sahne 2–4. İpuçları: "Isı aktarılır; bir cismin ‘ısısı’ artmaz. Elde artan, termometrenin göstereceği şeydir." · "Soğukluk diye bir şey aktarılmaz ve artmaz; aktarılan enerji ısıdır."

Sonra:
8. Çaydan ele geçen ısıdır; elde artan sıcaklıktır.

Defter (`Üç kavram`): "Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir."

### Sahne 6 · Doğru mu, yanlış mı?

Tahta: üstte iki kutu (y 70–250): "Doğru kullanım" (x 90–480) ve "Yanlış kullanım" (x 520–910). Altta (y 300–420, x 150–850) sırayla gelen cümle kartı. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir. Yanlış kullanımda kartın doğrusu, kutudaki kısa adın altına 20 birimle yazılmaz (kelime bütçesi); doğrusu geri bildirimde söylenir.

Anlatım:
1. Şimdi günlük hayattan altı cümleye bakalım.
2. Her biri için karar ver: kelime doğru mu kullanılmış?

Kartlar (soru: "Bu cümlede kavram doğru mu kullanılmış?"; kutudaki kısa ad parantezde):
1. "Yarın İstanbul’da hava sıcaklığının artması bekleniyor." (hava sıcaklığı) → **Doğru**. Neden: "Evet. Hava için termometrenin gösterdiği değer sıcaklıktır." İpucu: "Havada ölçülen şey sıcaklıktır; cümle bunu söylüyor."
2. "Çocuğun vücut ısısı 39 °C olmuş." (vücut ısısı) → **Yanlış**. Neden: "Evet. Dereceyle ölçülen sıcaklıktır: ‘vücut sıcaklığı 39 °C’." İpucu: "39 °C termometreden okunur; termometre neyi ölçer?"
3. "Soba yanınca çevresine ısı verir." (sobanın verdiği ısı) → **Doğru**. Neden: "Evet. Sıcak sobadan soğuk odaya aktarılan enerji ısıdır." İpucu: "Sobadan odaya bir şey aktarılıyor; aktarılan enerjinin adı ne?"
4. "Isı termometreyle ölçülür." (termometre) → **Yanlış**. Neden: "Evet. Termometre sıcaklığı ölçer." İpucu: "Termometre taneciklerin hareketliliğini gösterir; bu hangi kavram?"
5. "Pencereyi açınca asfaltın sıcaklığı içeri girdi." (asfalt) → **Yanlış**. Neden: "Evet. İçeri giren, aktarılan enerjidir: ısı." İpucu: "Bir yerden bir yere geçen şey sıcaklık olabilir mi?"
6. "Öğle güneşinde balkon demirinin ısısı havanınkinden fazlaydı." (balkon demiri) → **Yanlış**. Neden: "Evet. Maddenin ısısı olmaz; demirin sıcaklığı havanınkinden yüksekti." İpucu: "Isı bir maddenin içinde durmaz; karşılaştırılan şey ne olmalı?"

Sonra (kutular 0,45'e iner; ortada sahne 1'deki konuşma kartı yeniden belirir, "ısı" kelimesinin üstü çizilir, yerine sarı "sıcaklık" yazılır; 500 ms, `out`):
3. Sunucunun cümlesine dönelim.
4. Otuz derece termometreden okunur: yanlış kelime “ısı”dır.
5. Doğrusu şudur: yarın sıcaklık 30 derece olacak.
6. Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir.

### Çıkış soruları

1. (yeni durum) Fırından çıkan tepsi mutfak tezgâhına konuyor. Hangisi doğrudur? **Tepsiden tezgâha ısı aktarılır** / Tezgâhtan tepsiye soğukluk aktarılır / Tepsinin ısısı tezgâhın ısısından fazladır. (sahne 4)
2. (yanılgı) "Bugün hava çok ısılı, ısı 35 derece" diyen biri hangi kelimeyi kullanmalıydı? **Sıcaklık; dereceyle ölçülen odur** / İç enerji; hava çok sıcak / Kelimesi doğru; ısı dereceyle ölçülür. (sahne 6)
3. (yeni durum) Aynı sıcaklıkta bir damla su ile bir sürahi su var. Hangisi doğrudur? **Sürahinin iç enerjisi daha büyüktür; taneciği daha çoktur** / İç enerjileri eşittir; sıcaklıkları aynıdır / Damlanın iç enerjisi yoktur; çok küçüktür. (sahne 3)
4. Bir kaptaki suyun tanecikleri eskisinden daha hızlı hareket ediyorsa ne değişmiştir? **Suyun sıcaklığı artmıştır** / Sudaki tanecik sayısı artmıştır / Suyun ısısı artmıştır. (sahne 2)
5. (yanılgı) Hangi cümlede kavram doğru kullanılmıştır? **Sıcak çorbadan kaşığa ısı aktarıldı** / Çorbanın ısısı 60 derece / Kaşık çorbadan sıcaklık aldı. (sahne 4, 5)

## A2 · İç enerji ısıyla değişir, sıcaklıkla izlenir

- **Fikir:** Bir maddenin iç enerjisi iki şeyle büyür: madde miktarıyla (daha çok tanecik) ve sıcaklıkla (daha hareketli tanecik). Isı alan maddenin iç enerjisi artar, ısı verenin azalır.
- **Giriş ekranı sorusu:** Bir fincan sıcak çay mı, yoksa ılık suyla dolu bir küvet mi daha çok iç enerji taşır?
- **Kaynak:** Ders kitabı s. 210 (dört kap: 700 g 80 °C; 500 g 20 °C; 700 g 20 °C; 500 g 10 °C), s. 211 (çaydanlık ocakta 60 °C'a ısıtılır, bardak elle tutulur; karşılaştırma tablosu kalıbı), s. 213 ("ısı alan ya da veren maddenin iç enerjisi kesinlikle değişir"; "iç enerji madde miktarına ve sıcaklığa bağlı"; bardak ve kova; çözümlü örnek K, L, M: L > K > M), s. 214 (yedinci ifade: kütlesi büyük olanın sıcaklığı fazladır). Fincan ve küvet kitap dışı bir durumdur; ilkesi s. 213'tedir ve sayı verilmez.
- **Sınır:** İç enerji sayıyla hesaplanmaz, yalnızca karşılaştırılır. Karşılaştırmalar aynı maddeyle (su) yapılır; maddenin cinsinin etkisi yalnızca defter satırında "aynı madde için" kaydıyla geçer. Biri daha sıcak öteki daha kütleli olan iki kap karşılaştırılmaz (kitap da karşılaştırmaz); tek istisna uç durumdur: fincan ve küvet. Öz ısı, Q = m · c · ΔT ve hâl değişimi yok.
- **Güç kavramlar ve gösterimi:** (1) İki etmenin ayrılması: her karşılaştırmada yalnızca biri değişir; değişen etiket renkle vurgulanır (kütle turkuaz, sıcaklık sarı), tanecik penceresinde ya sayı ya titreşim değişir. (2) Isının iç enerjiyi değiştirmesi: turuncu ok girerken alan cismin mor çubuğu uzar, veren cisminki kısalır; aynı anda. (3) Sıcaklığı yüksek olanın iç enerjisi her zaman büyük değildir: fincan ve küvet.
- **Hedeflenen yanılgı:** Sıcak olan cismin iç enerjisi her zaman daha büyüktür; kütlesi büyük olan cisim daha sıcaktır.
- **Akılda kalıcı cümle:** Isı alan maddenin iç enerjisi artar; iç enerji sıcaklığa ve madde miktarına bağlıdır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Sıcak çay bardağını tutan elde ısı hangi yönde aktarılır? **Çaydan ele** / Elden çaya / İki yöne eşit. (A1) Yanlışta: "Isı, sıcaklığı yüksek olandan düşük olana aktarılır."
2. İç enerji nedir? **Bir maddedeki bütün taneciklerin toplam enerjisi** / Taneciklerin ne kadar hareketli olduğunun göstergesi / Bir cisimden ötekine aktarılan enerji. (A1) Yanlışta: "İç enerji toplamdır: bütün taneciklerin enerjisi."

Tahta: birinci soruda çay bardağı ve el yan yana (ok yok; cevaptan sonra turuncu ok belirir); ikinci soruda bir kap ve tanecik penceresi.

Sonra: "Bugün iç enerjinin neye göre büyüyüp küçüldüğüne bakacağız."

### Sahne 2 · Aynı sıcaklık, farklı miktar

Tahta: iki kap (x 170–320 ve 680–830, y 100–270). Sol "500 g · 20 °C", sağ "700 g · 20 °C"; sağ kapta su düzeyi daha yüksek (500 g: su yüksekliği 100; 700 g: 140). Altlarında tanecik pencereleri: 10 ve 14 tanecik, ikisi de 20 °C titreşiminde. Anlatım 3'te kütle etiketleri turkuaz parlar (ölçek 1 → 1,15 → 1; 400 ms). Anlatım 5'te pencerelerin altında mor çubuklar (y 520; sol boy 100, sağ boy 140).

Anlatım:
1. Ela iki kaba su koyuyor; ikisi de 20 °C.
2. Sıcaklık aynı: tanecikler iki kapta da aynı hareketlilikte.
3. Fark miktarda: birinde 500, ötekinde 700 gram su var.
4. Su çoğaldıkça toplanacak tanecik de çoğalır.
5. O yüzden 700 gramlık suyun iç enerjisi daha büyüktür.
6. Sıcaklık aynıysa, miktarı fazla olanın iç enerjisi büyüktür.

Tahtada son satır (y 60): "madde miktarı arttı → iç enerji arttı" ("madde miktarı" turkuaz, "iç enerji" mor).

### Sahne 3 · Aynı miktar, farklı sıcaklık

Tahta: iki kap, ikisi de 700 g (14 tanecik, su yüksekliği 140). Sol "700 g · 20 °C", sağ "700 g · 80 °C". Pencerelerde titreşim 20 °C ve 80 °C. Anlatım 3'te sıcaklık etiketleri sarı parlar. Anlatım 5'te mor çubuklar (sol boy 140, sağ boy 364; sağ çubuk x 560'tan başlar ve tahtaya sığar).

Anlatım:
1. Şimdi miktarı eşitleyelim: iki kapta da 700 gram su var.
2. Tanecik sayısı aynı.
3. Bu kez sıcaklık farklı: biri 20, öteki 80 °C.
4. Sıcak suda her tanecik daha çok hareket enerjisi taşır.
5. Toplam da büyür: sıcak suyun iç enerjisi daha fazladır.
6. Miktar aynıysa, sıcaklığı yüksek olanın iç enerjisi büyüktür.

Tahtada son satır (y 60): "sıcaklık arttı → iç enerji arttı" ("sıcaklık" sarı, "iç enerji" mor).

Sor (`c.choice`, `tag: 'Sor'`; yeni kaplar): tahta değişir (`c.clearSay()`): "500 g · 20 °C" ve "500 g · 10 °C"; çubuklar gizli. Soru: "Bu iki kaptan hangisindeki suyun iç enerjisi daha büyüktür?" **20 °C’taki; miktar aynı, sıcaklığı yüksek** / 10 °C’taki; soğuk su daha yoğundur / Eşittir; ikisi de 500 gram. Dayandığı anlatım: 4–6. İpuçları: "Miktar aynı; taneciklerin hareketliliğine bak." · "Kütle eşit olsa da tanecik başına enerji farklı: sıcaklıklar aynı değil."

Gör: mor çubuklar belirir (boy 100 ve 60; 700 ms, `out`).

Sonra:
7. Aynı miktarda suda sıcak olan daha çok iç enerji taşır.

### Sahne 4 · Üç kabı sırala

Tahta: üç kap yan yana (x 130–280, 425–575, 720–870; y 110–280), harfleri üstlerinde: K "300 g · 20 °C", L "300 g · 60 °C", M "200 g · 20 °C" (6, 6 ve 4 tanecik; pencereler kapların altında, çap 130). Çözüm adım adım: önce K ile L çerçevelenir, sonra K ile M; altta (y 530) sıralama satırı parça parça yazılır: "L > K", sonra "K > M", sonra "L > K > M" (mor).

Anlatım:
1. Ela’nın masasında bu kez üç kap var: K, L ve M.
2. Hepsinde su var; iç enerjilerini sıralayalım.
3. Önce K ile L: miktarları aynı, 300 gram.
4. L daha sıcak; öyleyse L’nin iç enerjisi K’ninkinden büyük.
5. Şimdi K ile M: sıcaklıkları aynı, 20 °C.
6. K’de daha çok su var; K’nin iç enerjisi M’ninkinden büyük.
7. Sıralama tamam: en büyük L, sonra K, sonra M.
8. Her adımda yalnızca tek bir şeyin değiştiği çifti karşılaştırdık.

Sor (`c.choice`, `tag: 'Sor'`; yanılgı): tahtada K ve M kalır, L söner. Soru: "K’de M’den daha çok su var. K’nin sıcaklığı için ne söylenir?" **M ile aynıdır; ikisi de 20 °C** / Daha yüksektir; suyu fazla olan daha sıcaktır / Daha düşüktür; ısı daha çok suya dağılır. Dayandığı anlatım: 5–6 ve sahne 2. İpuçları: "Miktar iç enerjiyi büyütür; sıcaklığı termometre söyler. Etiketlere bak." · "Suyun çok olması onu soğutmaz; iki kabın etiketi de 20 °C."

Sonra:
9. Miktarı fazla olanın iç enerjisi büyüktür, sıcaklığı değil.

### Sahne 5 · Isı gelince iç enerji değişir

Tahta: solda ocak (x 120–300, y 380–420, düz koyu gri levha) ve üstünde su dolu kap ("1 litre su"; x 135–285, y 210–380), kabın içinde termometre; sağda (x 620–880, y 150–330) kabın tanecik penceresi (çap 200, 20 tanecik) ve altında mor çubuk (x 620, y 480, boy 120). Başta termometre 20 °C, titreşim 20 °C. Anlatım 3'te ocaktan kaba üç kısa turuncu ısı oku (y 372 → 352). Anlatım 4–6 boyunca (3.000 ms, `linear`) termometre 20 → 60 °C, titreşim 20 °C → 60 °C değerlerine, mor çubuk 120 → 200 birime çıkar. Anlatım 7'de oklar söner.

Anlatım:
1. Ela bir litre suyu ocağa koyuyor; su 20 °C.
2. Ocak sudan çok daha sıcak.
3. Öyleyse ocaktan suya ısı aktarılır.
4. Isı alan suyun tanecikleri hızlanıyor.
5. Tanecikler hızlanınca suyun iç enerjisi artıyor.
6. Termometre de yükseliyor: su 60 °C oldu.
7. Kural şu: ısı alan maddenin iç enerjisi artar.

İkinci durum (`c.clearSay()`; tahta: solda sıcak su dolu bardak "60 °C", sağda el "33 °C", birbirine değiyor; her birinin altında mor çubuk: bardak boy 170, el boy 100; aralarında turuncu ok bardaktan ele):
8. Ela bu sudan bir bardak doldurup avucuna alıyor.
9. Şimdi ısı sudan ele aktarılıyor.

Sor (`c.choice`, `tag: 'Sor'`): "Isı veren sudaki iç enerji nasıl değişir?" **Azalır; enerjinin bir bölümü ele aktarılır** / Artar; su hâlâ elden sıcaktır / Değişmez; ısı yalnızca eli etkiler. Dayandığı anlatım: 3–7 ve A1 sahne 4. İpuçları: "Su daha sıcak olabilir ama enerji veriyor; veren tarafın toplamı ne olur?" · "Aktarılan enerji bir yerden gelir: sudaki toplamdan."

Gör: 1.200 ms, `inOut`: bardağın mor çubuğu 170 → 150, elin çubuğu 100 → 120 (aynı anda; çubuklar eşitlenmez: iç enerjilerin eşit olduğu söylenmiyor).

Sonra:
10. Suyun iç enerjisi azaldı, elinki arttı.
11. Isı veren maddenin iç enerjisi azalır, alanınki artar.
12. Geçen dersteki tahminin cevabı da bu: elin iç enerjisi arttı.

Defter (`Isı ve iç enerji`): "Isı alan maddenin iç enerjisi artar, ısı verenin azalır."

### Sahne 6 · Genelle: sınıflama tablosu

Tahta: üç sütunlu tablo (`KIT.tablo`; x 110, y 90; sütunlar 330 / 220 / 230; satır 58; yazı 22). Başlık: "Durum · Değişen · İç enerji". Dört satır: "sıcaklık aynı, miktar fazla · madde miktarı · büyük" (dolu gelir) · "miktar aynı, sıcaklık yüksek · sıcaklık · büyük" (dolu gelir) · "madde ısı aldı · ısı · ?" · "madde ısı verdi · ısı · ?". "?" hücreleri öğrencinin seçimiyle dolar.

Anlatım:
1. Gördüklerimizi tek tabloda toplayalım.
2. Miktar fazlaysa iç enerji büyük; ilk satır bunu söylüyor.
3. Sıcaklık yüksekse iç enerji yine büyük; bu da ikinci satır.

Birlikte çöz (`tag: 'Birlikte çöz'`; iki seçim arka arkaya, ikisi de aynı etiketle):
- "Üçüncü satır: madde ısı aldı. İç enerjisi için ne yazılır?" **artar** / azalır / değişmez. İpuçları: "Isı aktarılan enerjidir; alan tarafın toplamı ne olur?" (iki yanlış şıkta aynı).
- "Dördüncü satır: madde ısı verdi. İç enerjisi için ne yazılır?" **azalır** / artar / değişmez. İpuçları: "Enerji veren tarafın toplamı küçülür." (iki yanlış şıkta aynı).

Dayandığı anlatım: sahne 5, 7 ve 11.

Sonra (tablo 0,45'e iner; altta, y 430–520, iki küçük çizim yan yana: bir fincan "sıcak çay", yanında çok daha geniş bir küvet "ılık su"; fincanın penceresinde 3 tanecik 80 °C titreşiminde, küvetin penceresinde 40 tanecik 33 °C titreşiminde; mor çubuklar: fincan boy 30, küvet boy 300):
4. Şimdi baştaki soruya dönelim: fincan mı, küvet mi?
5. Çayın tanecikleri daha hareketli; çay daha sıcak.
6. Ama küvetteki su, fincandakinin yüzlerce katıdır.
7. Toplanınca küvetin iç enerjisi çok daha büyük çıkar.
8. Sıcaklığı yüksek olanın iç enerjisi her zaman büyük değildir.

Defter (`İç enerji neye bağlı?`): "Aynı madde için: miktar ve sıcaklık arttıkça iç enerji büyür."

### Sahne 7 · Dene: miktar ve sıcaklık

Tahta: ortada tek kap (x 425–575, y 90–260) ve altında tanecik penceresi (çap 200; merkez 500, 400); sağda yatay mor iç enerji çubuğu (x 680, y 300; en çok 280 birim). İki kaydırıcı: "su miktarı" (200, 400, 600, 800 g; `step` 200) ve "sıcaklık" (10, 20, 40, 60, 80 °C beş konum; kaydırıcı 0–4 sıra numarasıyla kurulur). Miktar değişince su düzeyi ve tanecik sayısı (4, 8, 12, 16), sıcaklık değişince termometre ve titreşim (40 °C: genlik 8, salınım 500 ms) değişir; çubuk boyu = tanecik sayısı × genlik × 1,3 (en çok 16 × 13 × 1,3 = 270; tahtaya sığar). Yanına sayı yazılmaz.

Yönerge (`noWait`): "Su miktarını ve sıcaklığı değiştir; mor çubuğu izle."

Kaydırıcıdan sonra `c.cont('Devam ›')`; ardından:
1. Miktarı artırınca tanecik çoğaldı; iç enerji büyüdü.
2. Sıcaklığı artırınca tanecikler hızlandı; iç enerji yine büyüdü.
3. Isı alan maddenin iç enerjisi artar; iç enerji sıcaklığa ve miktara bağlıdır.

### Çıkış soruları

1. (yeni durum) Aynı sıcaklıkta bir çay kaşığı çorba ile bir tencere çorba var. Hangisi doğrudur? **Tenceredeki çorbanın iç enerjisi daha büyüktür** / Sıcaklıkları aynı olduğu için iç enerjileri eşittir / Kaşıktaki çorba daha çabuk soğuduğu için iç enerjisi büyüktür. (sahne 2)
2. (yanılgı) Aynı odada duran aynı cins iki demir bilyeden büyüğü için ne söylenir? **İç enerjisi daha büyüktür, sıcaklığı küçüğününkiyle aynıdır** / Hem sıcaklığı hem iç enerjisi daha büyüktür / Sıcaklığı daha büyüktür, iç enerjisi aynıdır. (sahne 4)
3. (yeni durum) Sıcak çorbaya soğuk bir kaşık daldırılıyor. İç enerjiler nasıl değişir? **Kaşığınki artar, çorbanınki azalır** / İkisininki de artar / Kaşığınki artar, çorbanınki değişmez. (sahne 5)
4. İki bardakta eşit miktarda su var; biri 15 °C, öteki 45 °C. Hangisi doğrudur? **45 °C’taki suyun iç enerjisi daha büyüktür** / 15 °C’taki suyun iç enerjisi daha büyüktür / Miktarlar eşit olduğu için iç enerjiler eşittir. (sahne 3)
5. (yanılgı) "Sıcaklığı yüksek olan cismin iç enerjisi her zaman daha büyüktür." Bu cümle için ne söylenir? **Yanlıştır; iç enerji madde miktarına da bağlıdır** / Doğrudur; sıcaklık iç enerjinin ölçüsüdür / Doğrudur; sıcak cisim her zaman daha çok ısı içerir. (sahne 6)

## A3 · Konu tekrarı: İç enerji, ısı, sıcaklık (`a3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (hızlı ve yavaş titreşen iki tanecik · tanecik dolu bir pencere ve mor çubuk · iki cisim arasında turuncu ok · sıcak ve soğuk cisim, ok sıcaktan soğuğa · boyu büyüyen iki mor çubuk "miktar", "sıcaklık" · ok alan cisimde uzayan, veren cisimde kısalan çubuk) ve deftere düşer. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner; sahnenin sonunda hepsi yeniden tam görünür olur.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Sıcaklık, taneciklerin ortalama hareket enerjisinin göstergesidir.
3. İç enerji, bütün taneciklerin toplam enerjisidir.
4. Isı, sıcaklık farkı yüzünden aktarılan enerjidir.
5. Isı hep sıcak olandan soğuk olana aktarılır.
6. İç enerji, madde miktarı ve sıcaklık arttıkça büyür.
7. Isı alan maddenin iç enerjisi artar, verenin azalır.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Kışın dışarıdan gelen Ela ellerini kalorifer peteğine yaklaştırıyor. Hangisi doğrudur? **Petekten ellere ısı aktarılır; ellerin iç enerjisi artar** / Ellerden peteğe soğukluk aktarılır / Peteğin ısısı ellerin ısısından büyüktür. (A1 sahne 4, A2 sahne 5)
2. (yanılgı) Bir haberde "Bugün ölçülen en yüksek ısı 41 derece" yazıyor. Doğrusu hangisidir? **En yüksek sıcaklık 41 derece** / En yüksek iç enerji 41 derece / Cümle doğrudur. (A1 sahne 6)
3. Aynı miktarda iki sudan birinin tanecikleri daha hızlı hareket ediyor. Bu su için ne söylenir? **Sıcaklığı ve iç enerjisi daha büyüktür** / Yalnızca sıcaklığı daha büyüktür; iç enerjiler eşittir / Isısı daha büyüktür. (A1 sahne 2, A2 sahne 3)
4. (yeni durum) Bir havuzdaki su ile o havuzdan doldurulan bir kova su için hangisi doğrudur? **Sıcaklıkları aynı, havuzun iç enerjisi büyüktür** / İç enerjileri aynı, havuzun sıcaklığı büyüktür / Sıcaklıkları da iç enerjileri de aynıdır. (A2 sahne 2)
5. Üç kapta su var: X 400 g · 30 °C, Y 400 g · 50 °C, Z 250 g · 30 °C. İç enerjilerin sıralaması hangisidir? **Y > X > Z** / X > Y > Z / Z > X > Y. (A2 sahne 4)
6. (yanılgı) Dondurmayı tutan el üşüyor. Bunun nedeni hangisidir? **Elden dondurmaya ısı aktarılır** / Dondurmadan ele soğukluk aktarılır / Dondurmanın iç enerjisi yoktur. (A1 sahne 4)
7. (yeni durum) Ütü prizden çekilip odada bırakılıyor. Bir süre boyunca ne olur? **Ütü ısı verir; iç enerjisi azalır** / Ütü ısı alır; iç enerjisi artar / Odanın iç enerjisi azalır. (A2 sahne 5)
8. Hangisi bir maddenin içinde bulunmaz, yalnızca aktarılırken vardır? **Isı** / İç enerji / Taneciklerin hareket enerjisi. (A1 sahne 4)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.1) | Karşılığı |
|---|---|
| a) Isı, sıcaklık ve iç enerji ile ilgili görselleri inceler | A1 sahne 2, 3, 4 (kaplar, tanecik pencereleri, ısı oku) |
| Uygulama: kavramları mevcut bilgiyle ilişkilendirerek tartışma | A1 sahne 1, 5 |
| Uygulama: iç enerjinin ısı ve sıcaklıkla ilişkisine yönelik tahmin | A1 sahne 3 ve 4 (tahminler); cevap A2 sahne 5 |
| Ön değerlendirme: medyada ısı ve sıcaklığın doğru ve yanlış kullanımı | A1 sahne 1, 6; çıkış soruları 2 ve 5 |
| b) İç enerjinin ısı ve sıcaklık ile ilişkisini bulur | A2 sahne 2, 3, 4 (sıcaklık ve miktar), sahne 5 (ısı) |
| c) İlişkiyi geneller | A2 sahne 6 (tablo ve defter), sahne 7 |
| Uygulama: anlam çözümleme ya da sınıflama tablosu | A2 sahne 6 |
| Anahtar kavramlar: ısı, sıcaklık, iç enerji | A1 sahne 2, 3, 4; A3 |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık | Ayrı ders yok; A1 sahne 1 hatırlatır |

Fazlalık denetimi: iç enerjinin bileşenleri A1 sahne 3'te iki cümle (kitap s. 213 kadar); kelvin ve joule yalnızca ad olarak; fincan ve küvet sayısız. Programda olmayan öz ısı, hesap, hâl değişimi ve kalorimetre kabı bu konuda yok.
