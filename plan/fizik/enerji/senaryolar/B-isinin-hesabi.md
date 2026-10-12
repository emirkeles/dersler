# Senaryolar — Konu B · Isının hesabı

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.2, `../PLAN.md` bölüm 3 (B1–B4), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 1, 3, 9, 11, 15, 16, 17, 19) ve bölüm 8 ("B" satırları); `../IZOMETRIK.md` bölüm 6b (Ş1, Ş2). Biçim örneği: `A-ic-enerji-isi-sicaklik.md`.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime (rakam, birim ve simge de kelimedir); hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("4,18 J/g · °C" → "dört virgül on sekiz joule bölü gram çarpı derece", "ΔT" → "delta T", "Q" → "kü", "m · c · ΔT" → "em çarpı ce çarpı delta T").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyleri Ela yapar.
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir. Hesap isteyen her soruda "Hesap:" satırı yazarın denetimi içindir, öğrenciye gösterilmez; çeldiriciler yaygın bir hatanın sonucudur ve satırda belirtilmiştir.
- Sıra her derste aynıdır: hatırla → anlat → baştan sona çözülmüş örnek → birlikte çöz (`tag: 'Birlikte çöz'`) → tek başına soru → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. B1'de hesap yoktur: çözülmüş örnek, birlikte çöz ve tek başına soru "ortama göre termometre seçmek" üzerinedir.
- Renkler tema boyunca aynıdır: ısı (Q, aktarılan enerji) turuncu, sıcaklık (ΔT dâhil) sarı, iç enerji mor, kütle turkuaz, soğuk ve su mavi. Öz ısı c ile ısı sığası C madde ya da cisim özelliğidir: yeni renk yok, açık gri (tahtanın yazı rengi) yazılır. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir. Tahta koyudur.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Yazı en az 22 birim. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız).
- **Tablo** (`KIT.tablo`): satırlar `goster` ile tek tek açılır; tablo tek öğe sayılır. Birim taşıyan başlıkta ("Süre (dk)", "Su (°C)") sütun 200 birimdir; birimi başlıkta olmayan sütun hücre yazısına göre (en uzun hücre × 13 birim) seçilir. Başlıktaki birim yazılınca hücrelerde birim yazılmaz.
- **Figür** kullanan sahnede "Tahta" paragrafının ilk satırı `Figür:` ile başlar. Figürde yazı yoktur; etiket, sayı, ok, ölçü çizgisi düz katmandadır ve figürün noktalarına bağlanır (`f.nokta('sol.etiket')` gibi). Figürün yanında kalan alan tablo, grafik ve yazı içindir; yazı figürün üstüne gelmez. Süreölçer yalnızca zamanın aktığını gösterir (`f.sure(dk × 60)`, ibre dakikada bir tur); okunan süre düz katmandaki "5. dk" gibi yazıdır. Deneyde gerçek 5 dakika 1.600 ms'ye sıkıştırılır.
- Bu konuda iki izometrik figür vardır: **Ş1 `TERMO`** (B1) ve **Ş2 `ISITMA`** (B2, B3, B4). B4'te Ş2 yalnızca hazır pozla kullanılır: ayar sahne boyunca değişmez, değişim düz katmandaki ok ve çubukla gösterilir. Konu tekrarında (B5) figür yok.
- Düz vektör araçları (`dersler/b-araclar.js`; `a-araclar.js` içindekilerin üstüne):
  - **Beher:** 140 × 140 birimlik açık renkli 3 birim çizgili kap; içi mavi yarı saydam su; "donan su" için üç açık mavi buz parçası (yüzer, 30 × 30), "kaynayan su" için dört beyaz kabarcık (yarıçap 6; kabın dibinden 700 ms'de yükselen, `linear`, döngü) ve üstünde üç buhar çizgisi.
  - **Çözüm kartı:** satırlar alt alta gelir (`out`, 300 ms); aynı anda en çok üç satır görünür, yeni satır gelince en eski satır kaybolur (300 ms, `in`). Formül satırı 7 kelimeyi aşmaz; yazı 26 birim, formül sarı–turuncu–turkuaz renklenmiş ("Q" turuncu, "m" turkuaz, "ΔT" sarı, "c" ve "C" açık gri).
  - **Doğru grafiği:** eksenler 2 birim açık gri çizgi, orijinde buluşur; veri noktaları 8 birim yarıçaplı sarı daire; doğru 4 birim turuncu çizgi, orijinden çıkar ve noktaları 800 ms'de (`out`) soldan sağa çizilir.
  - **Çubuk** (`KIT.cubuk`): yatay, 22 birim kalın; ısı çubuğu turuncu, ΔT çubuğu sarı; çubuğun ucunda değer yazısı. Boyu verilen ölçekle orantılıdır; "yalnızca sıralama" denen çubuklar orantılı çizilmez.
  - **Kaydırıcı** (yalnızca B4 sahne 6): 400 birim uzun iz, 28 birim yuvarlak tutamak; adımlar sahne metninde yazılıdır.
  - **Düz termometre** (B1 hatırla ve B3, B4'teki küçük göstergeler): `a-araclar.js` termometresi.
- Hesap sözleşmesi (bu konuda hesap yapılan dersler B2, B3, B4, B5): ısı joule (J), kütle gram (g), sıcaklık °C; suyun öz ısısı 4,18 J/g · °C; ΔT = son sıcaklık − ilk sıcaklık; kalori kullanılmaz; bakırın öz ısısı sayıyla yazılmaz; çarpım "·"; ondalık virgül, binlik nokta. Öz ısının SI yazımı (J/kg · °C) yalnızca B2 sahne 4'te bir kez gösterilir.
- Bu konuda kapalı olanlar: termometre ölçekleri arasında dönüşüm işlemi, formülü ve sorusu yok; yalnızca iki sabit nokta. Isıl denge, hâl değişimi ve ısı aktarım yolları anlatılmaz. Isı alan maddenin sıcaklığının artmadığı durumlar (hâl değişimi) bu konunun dışındadır: bütün örneklerde madde hâl değiştirmez.

## B1 · Üç ölçek, tek sıcaklık

- **Fikir:** Sıcaklık Celsius, Fahrenheit ve Kelvin ölçekleriyle ölçülür; üçü de suyun donma ve kaynama sıcaklığına dayanır, farklı biçimde bölmelenmiştir ve farklı amaçlarla kullanılır. Termometreler de kullanım amacına göre beş türdür.
- **Giriş ekranı sorusu:** Bir yabancı dizide hava "70 derece" deniyor ve herkes tişörtle geziyor; nasıl olur?
- **Kaynak:** Ders kitabı s. 215 (termometre tanımı), s. 216–217 (beş tür ve kullanım yerleri), s. 218 (ölçeklendirme, Görsel 4.9, ölçeklerin kullanım amaçları, 2. Alıştırma'nın tablo başlıkları). Kitap 2. Alıştırma'nın cevabını vermez; ortam–tür eşleşmeleri kitabın "kullanım yeri" cümlelerinden çıkarılır. Dizi sahnesindeki "Fahrenheit ölçekli termometre" hikâyedir, kitapta yoktur.
- **Sınır:** Yalnızca Kelvin, Celsius ve Fahrenheit. Ölçekler arası dönüşüm işlemi ve formülü yok; "bu kaç °C eder?" sorusu yok. Bölme sayıları sayıyla yazılmaz (kitapta yok; yalnızca "Fahrenheit termometresinin bölme sayısı daha fazladır" denir). Mutlak sıfır adı ve 0 K'nin karşılığı yok. `TERMO.olcek(...)` yalnızca iki sabit noktanın (suyun donma ve kaynama sıcaklığı) yerini göstermek için çağrılır.
- **Güç kavram ve gösterimi:** Ölçek bir bölmelemedir; sıcaklık ölçeğe bağlı değildir. Tek sütun, yan yana üç cetvel: aynı yükseklikte durur, üç ayrı sayı okunur (donma: 0 °C, 32 °F, 273 K; kaynama: 100 °C, 212 °F, 373 K).
- **Hedeflenen yanılgı:** Sayı aynıysa sıcaklık da aynıdır ("70 derece" her yerde aynı hava); sayısı büyük olan ölçek daha sıcak ölçer.
- **Akılda kalıcı cümle:** Sıcaklık aynı, ölçek farklı.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. İki kapta aynı sıcaklıkta su var: X kabında 400 g, Y kabında 250 g. Hangisinin iç enerjisi daha büyüktür? **X'in; madde miktarı daha çok** / Y'nin; madde miktarı daha az / Eşit; sıcaklıkları aynı. (A2) Yanlışta: "İç enerji madde miktarı ve sıcaklık arttıkça büyür."
2. Hangisi termometreyle ölçülür? **Sıcaklık** / Isı / İç enerji. (A1) Yanlışta: "Sıcaklık ölçülür, ısı aktarılır, iç enerji maddenin içindedir."

Tahta: birinci soruda iki beher yan yana (x 250–400 ve 600–750; y 150–320), ikisinde "30 °C" (sarı), altlarında "400 g", "250 g" (turkuaz), kap içi su yüksekliği 170 × 400/400 ve 170 × 250/400 birim; ikinci soruda ortada düz termometre (x 480, y 120–400) ve yanında üç kart (x 580–900; y 150, 240, 330): "sıcaklık", "ısı", "iç enerji".

Sonra: "Bugün sıcaklığın nasıl sayıya dökülüp ölçeklendiğine bakacağız."

### Sahne 2 · "Yetmiş derece"

Figür: `TERMO.kur(c, svg, { x: 640, y: 90, h: 400 })` (genişlik 300; x 640–940); başlangıç `sicaklik(70)`, `goster({ c: 1, f: 0, k: 0 })`; kadraj `tum`.

Tahta: solda dizi ekranı çerçevesi (x 60–480, y 90–300), içinde "Bugün hava 70 derece" yazısı ve ekranın önünde tişört simgesi (120 × 110, x 210–330, y 170–280; açık gri çizgi). Ekranın altında konuşma kartı (x 60–480, y 330–420): "Dizideki herkes tişörtle." Sağda figür; `sutun` noktasının 28 birim üstünde sarı "70 °C". Anlatım 3'te ekran ve kart 0,45 saydamlığa iner, figürün solunda çay bardağı simgesi (90 × 100, x 520–610, y 250–350; üstünde üç buhar çizgisi) belirir (400 ms, `out`). Anlatım 6'da figür ile bardak 0,45'e iner; ortada üç yazı satırı belirir.

Anlatım:
1. Ela yabancı bir dizi izliyor: "Bugün hava 70 derece."
2. Dizide herkes tişörtle dolaşıyor.
3. Ela'nın termometresinde 70 derece, bir bardak sıcak çay demektir.
4. Aynı sayı, birbirine hiç benzemeyen iki durum anlatıyor.
5. Sıcaklık sayıyla söylenir; sayının anlamı ölçeğe bağlıdır.
6. Önce termometrenin ne olduğuna bakalım.
7. Sıcaklığı değişen maddede boyut, basınç, direnç gibi özellikler de değişir.
8. Bu değişimi algılayıp sıcaklığı ölçen araca termometre denir.

Soru yok (dersin bağlamı ve termometre tanımı kurulur). Sahne `c.cont('Devam ›')` ile biter.

Defter (`Termometre`): "Sıcaklığı ölçen araç. Sıcaklıkla değişen bir özellikten yararlanır."

### Sahne 3 · Ölçek nereden gelir? İki sabit nokta

Figür: `TERMO.kur(c, svg, { x: 60, y: 100, h: 400 })` (genişlik 300; x 60–360); başlangıç `sicaklik(20)`, `goster({ c: 1, f: 0, k: 0 })`; kadraj `tum`.

Tahta: sağda iki beher: "donan su" (x 560–700, y 290–430; üç buz parçası) ve "kaynayan su" (x 780–920, y 290–430; kabarcıklar ve buhar); altlarında "donan su", "kaynayan su" (y 470, 24 birim). Beherler 0,45 saydamlıkta başlar, sıra gelen tam görünür olur. Anlatım 4'te `sicaklik` 20 → 0 °C (1.000 ms, `inOut`); donan su beheri tam görünür; bitince `sutun` noktasından x 470'e açık gri kesik çizgi (2 birim) ve çizginin ucunda (x 480, çizginin 12 birim üstünde) "donma" (sarı, 24 birim). Anlatım 6'da `sicaklik` 0 → 100 °C (1.200 ms, `inOut`); kaynayan su beheri tam, donan su 0,45; `sutun` noktasından aynı biçimde ikinci çizgi ve "kaynama". Çizgilerin ikisi de kalır.

Anlatım:
1. Termometredeki sayılar bir ölçeğe aittir.
2. Ölçek, termometrenin yanındaki bölmelenmiş cetveldir.
3. Cetveli yapmak için önce iki sıcaklığı sabit tutarız.
4. Termometre donmakta olan suya batırılınca sütun bir yerde durur.
5. Bu yer, suyun deniz seviyesindeki donma sıcaklığıdır.
6. Sonra termometre kaynayan suya geçer; sütun yükselip yeni bir yerde durur.
7. Bu yer, suyun deniz seviyesindeki kaynama sıcaklığıdır.
8. Donma ve kaynama arasındaki aralık bölmelere ayrılarak ölçek yapılır.
9. Her ölçek bu iki noktaya kendi sayısını verir.

Sor (`c.choice`, `tag: 'Sor'`; tahta temizlenir, `c.clearSay()`; ortada dört kart sırayla): "Ölçek yapmak için hangi iki sıcaklık temel alınır?" **Suyun donma ve kaynama sıcaklığı** / Oda sıcaklığı ve vücut sıcaklığı / En düşük ve en yüksek hava sıcaklığı. Dayandığı anlatım: 3–7. İpuçları: "Termometre önce donan suya, sonra kaynayan suya batırıldı." · "Bu iki sıcaklık her yerde, deniz seviyesinde aynıdır; ölçek bunlara dayanır."

Defter (`Ölçek`): "Suyun donma ve kaynama sıcaklığı temel alınır; aralık bölmelenir."

### Sahne 4 · Üç ölçek, aynı sütun

Figür: `TERMO.kur(c, svg, { x: 60, y: 100, h: 400 })` (genişlik 300; x 60–360); başlangıç `sicaklik(0)`, `goster({ c: 0, f: 0, k: 0 })`; kadraj `tum`.

Tahta: Anlatım 2'de `goster({ c: 1 })` (500 ms, `out`); `olcek('c', 0)` noktasından x 470'e 2 birim açık gri çizgi, ucunda "0 °C" (sarı, 30 birim, x 480, çizginin 40 birim üstünde). Anlatım 3'te `goster({ f: 1 })`; `olcek('f', 32)` noktasından aynı x 470'e çizgi, ucunda "32 °F" (çizginin hizasında). Anlatım 4'te `goster({ k: 1 })`; `olcek('k', 273)` çizgisi, ucunda "273 K" (çizginin 40 birim altında). Üç yazı birbirinden 40 birim ayrıdır, sütun kıpırdamaz. Anlatım 5'te üç yazı ve çizgi söner (300 ms, `in`); `sicaklik` 0 → 100 °C (1.200 ms, `inOut`); aynı üç çizgi `olcek('c', 100)`, `olcek('f', 212)`, `olcek('k', 373)` noktalarından çizilir; yazılar "100 °C", "212 °F", "373 K". Anlatım 6'da yazılar ve çizgiler söner; sağda `KIT.tablo` (x 460, y 130; sütunlar 160 / 140 / 140; satır 3; satır yüksekliği 46; başlık: "Ölçek · Donma · Kaynama"): "Celsius · 0 °C · 100 °C", "Fahrenheit · 32 °F · 212 °F", "Kelvin · 273 K · 373 K"; satırlar 350 ms arayla açılır.

Anlatım:
1. Termometre yine donmakta olan suyun içinde; sütun aynı yerde duruyor.
2. Celsius cetvelinde bu yükseklik 0 °C olarak yazılır.
3. Fahrenheit cetvelinde aynı yükseklik 32 °F yazılır.
4. Kelvin cetvelinde aynı yükseklik 273 K yazılır.
5. Kaynayan suda yükseklik değişir: 100 °C, 212 °F, 373 K.
6. Üç ölçek, aynı iki sıcaklığa kendi sayılarını verir.
7. Sıcaklık tek; yazılışı ölçeğe göre üç ayrı sayıdır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta temizlenir; ortada sarı sütunlu düz termometre (x 480, y 130–420) ve yanında "kaynayan su" beheri (x 560–700); soru: "Ela Kelvin termometresini deniz seviyesinde kaynayan suya batırıyor. Termometre kaç gösterir?" **373 K** / 100 K / 212 K. Dayandığı anlatım: 5, 6. İpuçları: "Kaynama sıcaklığı Kelvin cetvelinde başka bir sayıdır; sütunun yüksekliği aynı kalır." · "100 Celsius cetvelindeki, 212 Fahrenheit cetvelindeki sayıdır."

Gör: düz termometrenin yanında üç küçük kart belirir (400 ms, `out`): "100 °C", "212 °F", "373 K"; 373 K kartı yeşil çerçeveli.

Defter (`Donma`): "Suyun donma sıcaklığı: 0 °C, 32 °F, 273 K."
Defter (`Kaynama`): "Suyun kaynama sıcaklığı: 100 °C, 212 °F, 373 K."

### Sahne 5 · Hangi ölçek nerede? Dizideki sayı

Tahta: üstte üç kart (x 60–340, 360–640, 660–940; y 90–200; kart başına iki satır, 26 birim): "Celsius · ortam sıcaklığı", "Fahrenheit · sağlık", "Kelvin · bilimsel çalışma". Kartların altında (y 260–330) üç yatay cetvel şeridi (genişlik 240; x 80, 380, 680): Celsius ve Kelvin şeritlerinde her 30 birimde bir çentik, Fahrenheit şeridinde her 17 birimde bir çentik (çizgi 2 birim, açık gri); çentik sayısı yazılmaz; Fahrenheit şeridinin altında "daha çok bölme" (24 birim). Kartlar anlatımla tek tek belirir (400 ms, `out`). Anlatım 6'da kartlar ve şeritler 0,45'e iner; ortada iki kutu belirir: solda "70 °C" (x 150–450, y 390–490; çay bardağı simgesi yanında), sağda "70 °F" (x 550–850, y 390–490; küçük dizi ekranı simgesi yanında); aralarında "≠" (48 birim, açık gri).

Anlatım:
1. Dünyada ortam sıcaklığını ölçerken çoğunlukla Celsius kullanılır.
2. Fahrenheit termometresinin bölme sayısı daha fazladır.
3. Bölme sayısı fazla olunca ölçüm daha hassas yapılabilir.
4. Bu yüzden bazı ülkeler sağlıkta Fahrenheit termometresi kullanır.
5. Bilimsel çalışmalarda ise Kelvin ölçeği tercih edilir.

Sor (`c.choice`, `tag: 'Sor'`; tahta üstteki kartlar ve şeritler aynen kalır): "Bazı ülkeler sağlıkta Fahrenheit termometresi kullanıyor. Neden?" **Bölme sayısı fazla olduğu için daha hassas ölçüm yapılır** / Suyun donma sıcaklığı Fahrenheit'te daha küçük olduğu için / Fahrenheit'le ölçülen vücut gerçekten daha sıcak olduğu için. Dayandığı anlatım: 2, 3, 4; sahne 4, 2–4 ("Fahrenheit'te donma 32'dir, 0'dan küçük değil"). İpuçları: "Bölme sayısı ile hassaslık arasındaki bağı düşün." · "Ölçek, sıcaklığı değiştirmez; yalnızca sayıyı değiştirir."

Sonra:
6. Şimdi dizi sahnesine dönelim.
7. Dizideki termometre Fahrenheit ölçeklidir: 70 °F.
8. Ela'nın çayı ise 70 °C'tır.
9. Sayı aynı, ölçek farklı olunca sıcaklıklar da farklıdır.
10. Bir sayıyı yorumlamak için ölçeği bilmek gerekir.
11. Aynı sıcaklık üç ölçekte üç sayıdır; aynı sayı üç ölçekte üç sıcaklık. (Tahtada: "Önce ölçek, sonra sayı." 12 Ekim 2026 düzeltmesi: bu sahnede iki ayrı sıcaklık dururken "Sıcaklık aynı, ölçek farklı" yazısı çelişkili okunuyordu; o cümle defterde ve özette kalır.)

Defter (`Ölçeklerin amacı`): "Celsius ortam, Fahrenheit sağlık, Kelvin bilim için kullanılır."
Defter (`Üç ölçek`): "Sıcaklık aynı, ölçek farklı."

### Sahne 6 · Beş termometre, beş amaç

Tahta: `KIT.tablo` (x 90, y 90; sütunlar 220 / 600; satır 5; satır yüksekliği 66; yazı 24; başlık "Tür · Nerede kullanılır"); her satırın solunda 50 × 50 birimlik açık gri çizgili simge (satırla birlikte belirir): sıvılı → ince cam boru ve alt ucunda hazne, içinde sarı sütun; metal → yuvarlak kadran ve uzun ince sap; gazlı → yuvarlak kadran ve yanından çıkan kısa düz sap; kızılötesi → tabanca biçimli gövde ve ucundan çıkan üç kısa ışın çizgisi; dijital → ince çubuk ve ortasında küçük dikdörtgen ekran. Satır içeriği: "Sıvılı · vücut, ortam", "Metal · fırın, termostat", "Gazlı · laboratuvar, çok düşük", "Kızılötesi · dokunmadan, tehlikeli yer", "Dijital · vücut sıcaklığı". Her satır ilgili anlatım satırında 350 ms'de açılır; bir önceki satır 0,45'e iner.

Anlatım:
1. Kullanım amacına göre termometreler beş gruba ayrılır.
2. Sıvılı, metal ve gazlı termometreler maddenin genleşmesinden yararlanır.
3. Sıvılı termometre vücut ve ortam sıcaklığını ölçmek için kullanılır.
4. Yalnızca yapımındaki sıvının donma ve kaynama sıcaklıkları arasında ölçer.
5. Metal termometre, erime sıcaklığı yüksek metalden yapılır.
6. Fırınlarda ve termostatlarda kullanılır; çok düşük sıcaklıkta hassas ölçemez.
7. Gazlı termometre hassastır; 1 K gibi çok düşük sıcaklığı ölçebilir.
8. Laboratuvarlarda ve hassas ölçümlerde kullanılır.
9. Kızılötesi termometre, cisme dokunmadan ışınları algılayarak ölçer.
10. Tehlikeli ortamlarda, sağlık kurumlarında ve gıda tesislerinde kullanılır.
11. Dijital termometre günlük hayatta vücut sıcaklığı ölçmek için kullanılır.
12. Tepki süresi uzundur; ani sıcaklık değişimini yakalayamaz.
13. Kızılötesi ve dijital termometreler, ilk üçünden çok daha hassastır.

Defter (`Beş tür`): "Sıvılı, metal, gazlı, kızılötesi, dijital: amaca göre seçilir."

### Sahne 7 · Doğru termometreyi seç

Tahta: üstte beş küçük kart (x 60, 245, 430, 615, 800; y 80–150; genişlik 170; sahne 6'daki simgeler ve tür adları) sürekli görünür; altta orta bölümde (y 190–470) çözüm kartı. Seçilen kartın çerçevesi doğru cevapta yeşil olur (300 ms, `out`).

Çözülmüş örnek (kart: "Bir fırının içindeki sıcaklık sürekli izlenecek. Hangi termometre?"):
14. Fırın içi çok sıcak bir ortamdır.
15. Metal termometre, yüksek sıcaklıkta fırınlarda ve termostatlarda çalışır.
16. O hâlde fırın için metal termometre seçilir.

Metal kartı yeşil çerçeveye girer; kartta "metal" yazısı belirir.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "Sıcaklığı nedeniyle yanına yaklaşılamayan bir ortamın sıcaklığı ölçülecek. Ölçüm cisme **dokunmadan** yapılmalı."; ilk satır dolu gelir: "Dokunmadan ölçen tür:" ve boşluk): "Boşluğa hangi tür yazılır?" **Kızılötesi** / Sıvılı / Metal. Dayandığı anlatım: sahne 6, 9, 10. İpuçları: "Dokunmadan ölçmek için cisimden yayılan ışınları algılayan türü düşün." · "Bu iki tür cisme temas ederek ölçer; kitaptaki dokunmadan ölçen tür başkadır."

Sonra:
17. Dokunmadan ölçmek gerekince kızılötesi termometre seçilir.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; tek başına): kart: "Bir laboratuvarda 1 K gibi çok düşük bir sıcaklık hassas biçimde ölçülecek." Soru: "Hangi termometre seçilir?" **Gazlı** / Metal / Dijital. Dayandığı anlatım: sahne 6, 6, 7, 8. İpuçları: "Çok düşük sıcaklığı ölçebildiği söylenen türü düşün." · "Metal termometre çok düşük sıcaklıkta hassas ölçüm yapamaz."

Gör: gazlı kartı yeşil çerçeveye girer; altında "1 K gibi çok düşük sıcaklık" yazısı belirir (400 ms, `out`).

### Sahne 8 · Hangi tür hangi özelliğe sahip?

Tahta: beş kutu (`KIT.sinifla` kutuları; ad: "Sıvılı", "Metal", "Gazlı", "Kızılötesi", "Dijital"), sahne 7'deki küçük kartlarla aynı yerde; altta sırayla gelen özellik kartı (x 150–850, y 300–420; `scale` 1 → 0,6, 400 ms, `in` ile kutusuna gider).

Anlatım:
1. Şimdi her türü çalışma ilkesiyle eşleştirelim.

Dene (`KIT.sinifla`, `tag: 'Dene'`; her karta soru: "Bu özellik hangi türe aittir?"):
1. "Yapımındaki sıvının donma ve kaynama sıcaklıkları arasında ölçer." → **Sıvılı**. Neden: "Evet. Sıvının cinsine göre ölçüm aralığı değişir." İpucu: "Sıvının donma ve kaynama sıcaklıkları hangi türün yapımında anılıyordu?"
2. "Sıcaklığı artan metalin genleşmesine dayanır." → **Metal**. Neden: "Evet. Metalin genleşmesi sıcaklığı gösterir." İpucu: "Genleşen ve erime sıcaklığı yüksek olan madde nedir?"
3. "Sabit hacimdeki gazın basıncının sıcaklıkla değişimine dayanır." → **Gazlı**. Neden: "Evet. Gazın basıncı sıcaklıkla değişir." İpucu: "Basınçla çalışan tür hangisi?"
4. "Cismin yüzeyinden yayılan kızılötesi ışınları algılar." → **Kızılötesi**. Neden: "Evet. Işınları algıladığı için dokunmadan ölçer." İpucu: "Işın algılayarak çalışan tür hangisi?"
5. "Direnci sıcaklıkla değişen devre elemanları kullanır." → **Dijital**. Neden: "Evet. Direnç değişimi sıcaklığı gösterir." İpucu: "Elektrik direnciyle çalışan tür hangisi?"

Sonra:
2. Her tür, ölçeceği ortama göre seçilir.
3. Hangi ölçeği kullanırsak kullanalım sıcaklık aynıdır.

### Çıkış soruları

1. (yanılgı) Ela iki termometreyi deniz seviyesinde aynı kaynayan suya batırıyor. Biri 100, öteki 212 gösteriyor. Neden? **Biri Celsius, öteki Fahrenheit ölçeklidir** / Termometrelerden biri bozuktur / Suyun iki yanı farklı sıcaklıktadır. (sahne 4)
2. (yeni durum) Bir fizik laboratuvarı sonuçlarını bilimsel bir raporda yayımlayacak. Sıcaklıkları hangi ölçeğe göre yazması beklenir? **Kelvin** / Fahrenheit / Hangisi olursa olsun. (sahne 5, 5)
3. (yeni durum) Bir müzenin girişinde ziyaretçilerin ateşi, onlara dokunmadan ölçülecek. Hangi termometre uygundur? **Kızılötesi** / Sıvılı / Gazlı. (sahne 6, 9–10)
4. Hangisi doğrudur? **Suyun donma sıcaklığı 0 °C, 32 °F ve 273 K'dır** / Suyun donma sıcaklığı Celsius'ta 32'dir / Suyun kaynama sıcaklığı üç ölçekte de 100'dür. (sahne 4)
5. (yanılgı) Bir termometre 70 gösteriyor; ölçeği bilinmiyor. Hangisi söylenebilir? **Sıcaklığı yorumlamak için ölçeği bilmek gerekir** / Sayı aynıysa sıcaklık da aynıdır / Sayı büyükse ölçek ne olursa olsun sıcaklık yüksektir. (sahne 5, 8–10; sahne 4)

## B2 · Öz ısı ve ısı sığası

- **Fikir:** Aynı ısıyı alan maddelerin sıcaklığı aynı kadar artmaz. Bunu maddeye ait öz ısı ve cisme ait ısı sığası anlatır; ısı sığası kütle ile öz ısının çarpımıdır.
- **Giriş ekranı sorusu:** Yaz günü öğlen kumsalda kum ayağını yakarken deniz neden hâlâ serin?
- **Kaynak:** Ders kitabı s. 219 (öz ısı ve ısı sığası tanımları, C = m · c, Görsel 4.10 ve 4.11, giriş: su ve zeytinyağı, cezve ve tencere), s. 222 (Örnek 1: K ve L grafiği), s. 223 (3. ve 4. Alıştırma), s. 224 (6. Alıştırma: deniz suyu). Kitap alıştırmaların cevabını vermez; cevaplar kitabın tanımlarından çıkarılır. Kum örneği `PLAN.md` kısa ders listesinden gelir, kitapta yoktur: yalnızca "kum daha çok ısınır" denir, sayı yok.
- **Sınır:** Isı sığası yerine "ısı kapasitesi" de denebileceği söylenir. Su için 4,18 J/g · °C (kitabın s. 222 yazımı); SI yazımı (4.186 J/kg · °C ve buz için 2.100 J/kg · °C) yalnızca sahne 4'te bir kez görünür. Bakırın öz ısısı sayıyla yazılmaz (karar 17); 1 kg ve 2 kg bakır "C" ve "2 C" ile gösterilir. Kitabın cal ile verdiği değerler (demir 0,115; bakır 0,1; su 1) yalnızca sıralama için kullanılır, sayısı yazılmaz. Q = m · c · ΔT ve ısı ile ΔT'nin orantısı B3'tedir; burada yalnızca "ısı sığası, 1 °C için gereken ısıdır" ve "aynı ısıyla ısı sığası büyük cisim az ısınır" denir.
- **Güç kavram ve gösterimi:** Aynı ısı, farklı sıcaklık artışı: özdeş ısıtıcıda iki termometre (sahne 3). Öz ısı maddenin, ısı sığası cismin özelliğidir: 1 kg ve 2 kg bakır blokta öz ısı aynı kalır, ısı sığası iki katına çıkar (sahne 5).
- **Hedeflenen yanılgı:** Aynı maddeden yapılan cisimlerin ısı sığası eşittir (kütle önemsizdir); ısı sığası maddeyi ayırt eder; deniz geç ısınıp geç soğuduğu için "ısı tutmaz".
- **Akılda kalıcı cümle:** Öz ısı maddenin, ısı sığası cismin özelliğidir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Ela aynı kaynayan suyu bir Celsius ve bir Kelvin termometresiyle ölçüyor. Hangisi doğrudur? **Sıcaklık aynı, sayılar farklı** / Sıcaklıklar farklı, sayılar farklı / Sayılar aynı, sıcaklık farklı. (B1) Yanlışta: "Sıcaklık aynı, ölçek farklı: 100 °C ile 373 K aynı sıcaklıktır."
2. Isı alan bir maddenin iç enerjisi nasıl değişir? **Artar** / Azalır / Değişmez. (A2) Yanlışta: "Isı alan maddenin iç enerjisi artar, ısı verenin azalır."

Tahta: birinci soruda kaynayan su beheri (x 430–570, y 150–290) ve iki düz termometre (x 330 ve 670; y 130–330) üstlerinde "100 °C", "373 K" (sarı); ikinci soruda bir beher (x 430–570) ve ona soldan değen turuncu ısı oku (x 250 → 420; y 220; "ısı").

Sonra: "Bugün aynı ısıyı alan maddelerin sıcaklığı neden aynı kadar artmıyor, ona bakacağız."

### Sahne 2 · Kum ve deniz

Tahta: üstte Güneş (turuncu daire, yarıçap 34, merkez 500, 85; çevresinde beş kısa ışın çizgisi); altında solda kum yığını (açık gri çizgi, yamuk x 130–390, y 340–430, içinde noktalar) ve sağda deniz (mavi yarı saydam dikdörtgen x 610–870, y 340–430, üstünde iki dalga çizgisi). Güneş'ten kuma ve denize eşit iki turuncu ok (7 birim kalın; x 260 ve x 740; y 150 → 320; yanlarında "ısı"). Kumun ve denizin arasında iki düz termometre (x 450 ve 550; y 290–430; sütun sarı); ikisinin de sütunu 40 birim yükseklikte başlar. Anlatım 3'te oklar belirir (500 ms, `out`). Anlatım 4'te kum termometresinin sütunu 40 → 120 birim, deniz termometresinin sütunu 40 → 70 birim yükselir (1.500 ms, `linear`). Altlarında "kum", "deniz" (24 birim).

Anlatım:
1. Yaz günü öğlen kumsala gidiyorsun.
2. Kum ayağını yakar; deniz ise serindir.
3. Güneş, ikisine de aynı süre ısı veriyor.
4. Ama kumun sıcaklığı, suyunkinden çok daha fazla artıyor.
5. Aynı ısıyı alan maddelerin sıcaklığı aynı kadar artmaz.
6. Sıcaklık değişimi, maddenin kütlesine ve cinsine bağlıdır.

Soru yok (bağlam ve sorun kurulur). Sahne `c.cont('Devam ›')` ile biter.

### Sahne 3 · Aynı ısı, aynı kütle, iki madde

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 250 })` (genişlik 362; x 14–376); başlangıç `ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 24, alev: 0 })`, `ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 24, alev: 0 })`; kadraj `tum`.

Tahta: `sol.etiket` noktasının altında "su", `sag.etiket` noktasının altında "zeytinyağı" (22 birim); iki etiketin altında (y 430) ortada turkuaz "aynı kütle" ve turuncu "aynı ısı". Sağda (x 410–980) iki yatay ΔT çubuğu: "su" yazısı (x 420, y 200), "zeytinyağı" yazısı (x 420, y 270); çubuklar x 600'den başlar, sarı, 22 birim kalın; başlangıçta boyları 0. Anlatım 3'te iki kabın alevi 0 → 2 (anında). Anlatım 5'te sol termometre 24 → 27 °C, sağ termometre 24 → 30 °C (1.600 ms, `linear`); süreölçer 0 → 300 sn (1.600 ms, `linear`); bitince `sureolcer` noktasının altında "5. dk" (24 birim). Anlatım 6'da çubuklar uzar: su 0 → 120 birim ("3 °C"), zeytinyağı 0 → 240 birim ("6 °C"); 600 ms, `out`; değerler çubuk ucunun 12 birim sağında.

Anlatım:
1. Ela iki özdeş kaba eşit kütlede su ve zeytinyağı koyuyor.
2. İkisinin sıcaklığı da 24 °C.
3. İki özdeş ısıtıcıyı aynı anda açıyor.
4. Özdeş ısıtıcılar eşit sürede eşit ısı verir.

Tahmin (`KIT.tahminAl`, `tag: 'Tahmin et'`; doğru şık aranmaz, seçim kaydedilir): "Sence beş dakika sonra hangi termometre daha yüksekte olur?" Su / Zeytinyağı / İkisi aynı. Seçimden sonra: Anlatım 5'e geçilir.

Sonra:
5. Beş dakika sonra su 27 °C, zeytinyağı 30 °C gösteriyor.
6. Su 3 °C, zeytinyağı 6 °C ısındı.
7. Kütle de ısı da aynı; yine de artışlar farklı.
8. Demek ki sıcaklık artışı maddenin cinsine de bağlıdır.

### Sahne 4 · Öz ısı: bir kilogram, bir derece

Tahta: üst yarıda (y 80–400) iki parça. Solda "1 kg su": mavi yarı saydam beher (x 190–330, y 190–330) ve altında turkuaz "1 kg su" (y 370); sağda "1 kg buz": üç açık mavi buz parçası (30 × 30; x 540–630, y 250–330) ve altında turkuaz "1 kg buz". İkisinin üstünde turuncu ok (y 100 → 170): su için 8 birim kalın (x 260), buz için 4 birim kalın (x 585); okların yanında "4.186 J" ve "2.100 J" (turuncu, 26 birim); okların altında, kaplarla ok arasında, sarı kısa çubuk (40 × 22) ve yanında "1 °C". Anlatım 3'te sol grup, 4'te sağ grup belirir (500 ms, `out`; çubuk yazısı okla birlikte). Anlatım 8'de bütün grup söner (300 ms, `in`); yerine sıralama paneli gelir: üç yatay açık gri çubuk (x 300; y 160, 240, 320; 22 birim kalın); boyları 400, 120, 100 birim (yalnızca sıralamayı gösterir; sayı yazılmaz); solda "su", "demir", "bakır" (x 90, 26 birim); üstte "öz ısı sıralaması" (y 100, 24 birim). Çubuklar anlatım 8–9 sırasında soldan sağa 600 ms'de (`out`) uzar.

Anlatım:
1. Her madde, aynı ısıyla aynı kadar ısınmaz.
2. Bunu anlatan sayı, maddeye ait bir özelliktir.
3. 1 kg suyun sıcaklığını 1 °C artırmak için 4.186 J gerekir.
4. 1 kg buzun sıcaklığını 1 °C artırmak 2.100 J ister.
5. Birim kütlenin sıcaklığını 1 °C değiştiren ısıya öz ısı denir.
6. Öz ısı c ile gösterilir; maddeyi ayırt eden bir özelliktir.
7. Hesaplarda gram kullanacağız: suyun öz ısısı 4,18 J/g · °C alınır.
8. Su, demir ve bakır arasında en büyük öz ısı suyundur.
9. Bakırın öz ısısı üçünün en küçüğüdür.
10. Aynı kütlede öz ısısı küçük madde, aynı ısıyla daha çok ısınır.
11. Zeytinyağının öz ısısı suyunkinden küçüktür; bu yüzden daha çok ısındı.

Sor (`c.choice`, `tag: 'Sor'`; tek başına; sahne 4'ün sıralama paneli üstte kalır, altta üç küçük kap kartı "demir", "bakır", "su", hepsinde "aynı kütle" ve "özdeş ısıtıcı, eşit süre"): "Aynı kütledeki demir, bakır ve su özdeş ısıtıcılarla eşit süre ısıtılıyor. Hangisinin sıcaklığı en çok artar?" **Bakır** / Demir / Su. Dayandığı anlatım: 8, 9, 10. İpuçları: "Eşit ısıda öz ısısı en küçük olan en çok ısınır; sıralamaya bak." · "Su, üçünün öz ısısı en büyük olanıdır; en az o ısınır."

Gör: bakır kartı yeşil çerçeveye girer; sıralama panelinde bakır çubuğunun yanında sarı "en çok ısınır" yazısı belirir (400 ms, `out`).

Defter (`Öz ısı`): "Birim kütlenin sıcaklığını 1 °C değiştiren ısı. Maddeye özgüdür."

### Sahne 5 · Isı sığası: cismin ısı sığası

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 250 })` (genişlik 362; x 14–376); başlangıç `ayar('sol', { icerik: 'su', seviye: 0.3, sicaklik: 20, alev: 2 })` (cezve), `ayar('sag', { icerik: 'su', seviye: 0.9, sicaklik: 20, alev: 2 })` (tencere); kadraj `tum`. Anlatım 7'de iki istasyon da 300 ms'de saydamlık 1 → 0 → 1 ile değişir: `ayar('sol', { icerik: 'blok', seviye: 0.5, sicaklik: 20, alev: 1 })`, `ayar('sag', { icerik: 'blok', seviye: 1, sicaklik: 20, alev: 2 })` (sağ blok soldakinin iki katı yüksek).

Tahta: anlatım 1'de `sol.etiket` altında "cezve", `sag.etiket` altında "tencere". Anlatım 2'de sol termometre 20 → 60 °C, sağ termometre 20 → 35 °C (1.600 ms, `linear`; sütun boyları yalnızca gösterir, yanında sayı yazılmaz). Anlatım 7'de etiketler "1 kg bakır", "2 kg bakır" (turkuaz) olur. Sağ bölmede (x 410–980) anlatım 8'den itibaren iki satır: üst satır (y 160): "Q" yazısı (turuncu, x 430) ve ardından turuncu ok (7 birim kalın; x 480 → 580), sonra sarı çubuk (40 × 22, x 610) ve "1 °C", sonra "C" (açık gri, x 740); alt satır (y 270): "2 Q", turuncu ok (14 birim kalın; x 480 → 580), aynı sarı çubuk ve "1 °C", "2 C". Üst satır anlatım 8'de, alt satır anlatım 9'da belirir (ok 500 ms soldan sağa `out`, sonra çubuk ve yazılar 300 ms).

Anlatım:
1. Bir cezve ve bir tencere dolusu su, özdeş ısıtıcılarla ısıtılıyor.
2. Eşit süre sonra cezvedeki suyun sıcaklığı daha çok artıyor.
3. Aynı ısıyla sıcaklık artışını, cismin kütlesi de belirler.
4. Cismin sıcaklığını 1 °C değiştirmek için gereken ısıya ısı sığası denir.
5. Isı sığası C ile gösterilir; ısı kapasitesi de denir.
6. Birimi J/°C'tur.
7. Şimdi 1 kg ve 2 kg bakır blokları birer derece ısıtalım.
8. Bir kilogramlık blok için gereken ısıya Q diyelim; ısı sığası C olsun.
9. İki kilogramlık blok 2 Q ister; ısı sığası 2 C olur.
10. Kütle iki katına çıkınca ısı sığası da iki katına çıkar.
11. Isı sığası, kütle ile öz ısının çarpımıdır: C = m · c.
12. Isı sığası kütleye bağlıdır; maddeyi ayırt eden özellik değildir.
13. Öz ısı ise maddeyi ayırt eden özelliktir.
14. Isı sığası büyük cismin sıcaklığı, aynı ısıyla daha az değişir.

Sor (`c.choice`, `tag: 'Sor'`; tek başına; tahta temizlenir, yan yana iki blok kartı "1 kg bakır", "2 kg bakır", altlarında "özdeş ısıtıcı, eşit süre"): "Özdeş ısıtıcılarla eşit süre ısıtılan 1 kg ve 2 kg bakır bloklardan hangisinin sıcaklığı daha çok artar?" **1 kg'lık; ısı sığası daha küçük** / 2 kg'lık; kütlesi daha büyük / İkisi eşit; ikisi de bakır. Dayandığı anlatım: 10, 14. İpuçları: "Eşit ısıyı alan iki cisimden ısı sığası küçük olan daha çok ısınır." · "İkisi de bakır, yani öz ısıları eşit; ısı sığaları ise kütleleri kadar farklıdır."

Defter (`Isı sığası`): "C = m · c. Cisme aittir; kütle arttıkça büyür."

### Sahne 6 · Isı sığasını hesapla

Tahta: solda mavi yarı saydam beher (x 60–200, y 160–300) ve altında "250 g su" (turkuaz kütle, "su" mavi; y 340); sağda çözüm kartı (x 280–940, y 140–340; üç satır, 26 birim): "C = m · c", "C = 250 · 4,18", "C = 1.045 J/°C". Satırlar anlatım 3, 4, 5'te belirir. Yeni satır gelince eski satır 0,45'e iner (üç satır birlikte görünür).

Anlatım:
1. Ela 250 g suyun ısı sığasını hesaplıyor.
2. Suyun öz ısısı 4,18 J/g · °C'tır.
3. C = m · c olduğundan 250 · 4,18 yazılır.
4. Çarpım 1.045 eder.
5. Isı sığası 1.045 J/°C'tır.
6. Bu su, 1 °C ısınmak için 1.045 J ister.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "400 g su: C = m · c", ilk satır dolu gelir: "C = 400 · 4,18", ikinci satırda "C = …… J/°C"; beher etiketi "400 g su"): "C kaç J/°C'tır?" **1.672** / 16.720 / 167,2. Dayandığı anlatım: sahne 4, 7; bu sahne 2–5. Hesap: 400 · 4,18 = 1.672. Çeldiriciler: 16.720 (bir sıfır fazla), 167,2 (virgül kayması). İpuçları: "400 · 4 = 1.600 ve 400 · 0,18 = 72; ikisini topla." · "Sonuç, 4,18'in yaklaşık 400 katı olmalı."

Sonra:
7. 400 g su 1 °C ısınmak için 1.672 J ister.
8. Kütle arttıkça aynı maddenin ısı sığası da büyür.

### Sahne 7 · K ve L: hangisi daha çok ısı ister?

Tahta: solda grafik: yatay eksen (x 110 → 560, y 430; altında "Kütle (g)"), dikey eksen (x 110, y 430 → 110; yanında "Isı sığası (J/°C)"; ikisi de 2 birim açık gri, eksen yazısı 22 birim); eksenlerde sayı yok. Orijinden iki doğru: K (4 birim, turuncu açık ton) (110, 430) → (560, 160); L (4 birim, açık mavi) (110, 430) → (560, 300); uçlarında "K", "L" (26 birim). Doğrular 800 ms'de çizilir (`out`). Anlatım 3'te kütle ekseninde x 330'da bir "m" işareti (turkuaz) ve oradan yukarı kesik çizgi; doğruları kestiği noktalardan (330, 298) ve (330, 366) dikey eksene yatay kesik çizgiler çizilir (500 ms, `out`). Sağda (x 620–960) anlatım 5'ten itibaren iki satır: "K: daha çok ısı" (sarı K) ve "c büyük: K" (açık gri).

Anlatım:
1. Grafikte K ve L maddelerinin ısı sığası, kütleyle çizilmiş.
2. Kütle ekseninde bir m değeri seçelim; ikisi eşit kütleli olsun.
3. Eşit kütlede K'nin ısı sığası, L'ninkinden büyüktür.
4. Isı sığası, 1 °C için gereken ısıdır.
5. Demek ki K'yi 1 °C ısıtmak daha çok ısı ister.
6. Kütle eşitse C büyük olanın öz ısısı da büyüktür.
7. K'nin öz ısısı, L'ninkinden büyüktür.

Soru yok (çözülmüş örnek; tahta K ve L doğrularıyla kalır).

### Sahne 8 · Öz ısı mı, ısı sığası mı?

Tahta: iki kutu (`KIT.sinifla`; "Öz ısı" x 90–480, "Isı sığası" x 520–910; y 70–250); altta sırayla gelen özellik kartı (x 150–850, y 300–420). Kart doğru kutusuna gider (`scale` 1 → 0,6; 400 ms, `in`).

Anlatım:
1. Şimdi özellikleri doğru kavramla eşleştirelim.

Dene (`KIT.sinifla`, `tag: 'Dene'`; her karta soru: "Bu özellik hangisine aittir?"):
1. "Maddenin cinsine bağlıdır; maddeyi tanıtır." → **Öz ısı**. Neden: "Evet. Öz ısı maddeyi ayırt eden özelliktir." İpucu: "Maddeyi ayırt eden hangisiydi?"
2. "Cismin kütlesine bağlıdır." → **Isı sığası**. Neden: "Evet. C = m · c; kütle arttıkça C artar." İpucu: "Kütleyle birlikte büyüyen hangisiydi?"
3. "Birimi J/g · °C'tır." → **Öz ısı**. Neden: "Evet. Birim kütle başına ısıdır." İpucu: "Gram başına ısı hangisinin birimine girer?"
4. "Birimi J/°C'tır." → **Isı sığası**. Neden: "Evet. Cismin 1 °C değişimi için gereken ısıdır." İpucu: "Kütle birimi içermeyen birim hangisinin?"
5. "1 kg bakırda ve 2 kg bakırda aynıdır." → **Öz ısı**. Neden: "Evet. İkisi de bakır; öz ısı değişmez." İpucu: "Madde aynıysa değişmeyen hangisi?"
6. "2 kg bakırda, 1 kg bakırdakinin iki katıdır." → **Isı sığası**. Neden: "Evet. Kütle iki katına çıkınca C de iki katına çıkar." İpucu: "Kütleyle iki katına çıkan hangisi?"

Sonra:
2. Öz ısı maddenin, ısı sığası cismin özelliğidir.

### Çıkış soruları

1. (yanılgı) 1 kg bakır ve 2 kg bakır için hangisi doğrudur? **Öz ısıları eşit; 2 kg'ın ısı sığası iki katıdır** / Isı sığaları eşit; 2 kg'ın öz ısısı iki katıdır / İkisi de 2 kg'da iki katıdır. (sahne 5)
2. (yeni durum) Ela 500 g suyun ısı sığasını hesaplıyor. Suyun öz ısısı 4,18 J/g · °C ise C kaç J/°C'tır? **2.090** / 209 / 20.900. Hesap: C = 500 · 4,18 = 2.090. Çeldiriciler: 209 (virgül kayması), 20.900 (bir sıfır fazla). (sahne 6)
3. (yeni durum) Özdeş ısıtıcılarla eşit süre ısıtılan eşit kütleli A ve B maddelerinden A'nın sıcaklığı daha çok arttı. Hangisi doğrudur? **A'nın öz ısısı B'ninkinden küçüktür** / A'nın öz ısısı B'ninkinden büyüktür / Öz ısıları eşittir. (sahne 3, 4)
4. (yeni durum) Ekim ayında hava soğurken deniz suyu hâlâ yaz kadar sıcak. Neden? **Denizin ısı sığası büyük; sıcaklığı yavaş değişir** / Denizin ısı sığası küçük; sıcaklığı hızla değişir / Denizin kütlesi küçük olduğu için ısı sığası büyüktür. (sahne 5, 14; sahne 4)
5. Hangisi bir maddeyi ayırt eden özelliktir? **Öz ısı** / Isı sığası / Kütle. (sahne 4, 6; sahne 5, 12–13)

## B3 · Deneyle modele: ısı, kütle, madde, sıcaklık farkı

- **Fikir:** Her seferinde yalnızca bir değişkenin değiştirildiği üç ısıtma ve soğutma deneyinin verisinden, ısı ile ısı sığası, öz ısı, kütle ve sıcaklık değişimi arasındaki model bulunur: Q = C · ΔT ve C = m · c ise Q = m · c · ΔT.
- **Giriş ekranı sorusu:** Aynı ocakta bir bardak su mu, bir tencere su mu önce kaynar; peki iki katı su iki katı süre mi ister?
- **Kaynak:** Ders kitabı s. 220–221 (2. Etkinlik: amaç, dört deney, basamaklar), s. 221–222 (Görsel 4.12: sıcaklık değişimi verilen ısıyla doğru orantılıdır; C = Q/ΔT, Q = C · ΔT, Q = m · c · ΔT), s. 219 (C = m · c), s. 224–225 (1. Çalışma Yaprağı, soru 1: üç düzenek, bütün sıcaklıklar kitabın ölçümüdür). Kitap etkinlikte ölçüm vermez; Çalışma Yaprağı'ndaki üç düzeneğin tabloları bu dersin verisidir (I: m ve 2 m limonata; II: su ve zeytinyağı; III: iki ısıtıcı). Zeytinyağının öz ısısı için kitap "suyunki 1, zeytinyağınınki 0,5 (cal/g · °C)" der; derste yalnızca oran ("yarısı") kullanılır, kalori yazılmaz.
- **Sınır:** Dört deneyden (kitabın 2. Etkinlik'i) üçü alınır: ısı (III. düzenek), kütle (I), madde (II); öz ısının "ayırt edici" olması B2'de görüldü. Çalışma Yaprağı soru 2'nin sayıları kalorili olduğundan alınmadı. Isıtıcı, kap ve termometre için kitap tür söylemez: "ısıtıcı", "özdeş kap", "termometre". Isıtıcılar sabit hızla ısı verir ("özdeş ısıtıcılar eşit sürede eşit ısı verir"); sayıyla Q verilmez, "birinci ısıtıcının beş dakikada verdiği ısıya Q" denir. Öğrencinin deney tasarlaması site dışıdır; tek değişken kuralı sahne 2'de verilir.
- **Kitapta yazmayan, deneyin kurgusundan gelen kabul:** I. düzenekte (buzdolabı) iki bardak "aynı rafta, eşit sürede eşit ısı verir" diye sunulur. Kitap bunu yazmaz; tablonun (3, 6, 9 °C ve 1,5, 3, 4,5 °C) tek tutarlı okunuşu budur. Raporda belirtilmiştir.
- **Güç kavram ve gösterimi:** Tek değişkeni değiştirmek: yan yana iki kap, her seferinde yalnızca biri farklı; tablo satır satır dolar, sütun boyları ΔT çubuğuna dönüşür. Üç deneyin üç ilişkisi tek formülde birleşir.
- **Hedeflenen yanılgı:** Aynı ısıyı alan her madde aynı kadar ısınır; kütle iki katına çıkınca sıcaklık değişimi de iki katına çıkar; zeytinyağı "daha çok ısı aldığı için" daha çok ısınır.
- **Akılda kalıcı cümle:** Q = m · c · ΔT.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Aynı maddeden 1 kg ve 2 kg iki cisimden hangisinin ısı sığası daha büyüktür? **2 kg'lık olanın** / 1 kg'lık olanın / İkisi eşit. (B2) Yanlışta: "Isı sığası kütleyle birlikte artar: C = m · c."
2. Isının birimi nedir? **Joule** / Derece / Kelvin. (A1) Yanlışta: "Isı bir enerjidir; birimi joule."

Tahta: birinci soruda iki turkuaz blok yan yana (x 330–430, y 200–300 ve x 540–680, y 130–300; ikincisi iki kat yüksek), altlarında "1 kg", "2 kg"; ikinci soruda ortada iki cisim arasında turuncu ısı oku ve üstünde "ısı".

Sonra: "Bugün bu kavramların arasındaki bağıntıyı deneylerden çıkaracağız."

### Sahne 2 · Tek değişken kuralı

Tahta: ortada sarı "ΔT" kutusu (x 400–600, y 230–310; yazı 34 birim); çevresinde üç kart: solda "ısı" (turuncu; x 90–290, y 230–310), üstte "kütle" (turkuaz; x 400–600, y 80–160), sağda "madde" (açık gri; x 710–910, y 230–310). Kartlardan kutuya üçer 4 birimlik açık gri ok (400 ms, `out`; anlatım 3'te). Anlatım 5'te kartlar sırayla vurgulanır: tam görünür olan kart 600 ms'de (`inOut`) ısı → kütle → madde sırasıyla değişir, ötekiler 0,45'e iner; her vurguda kartın altında "yalnızca bu değişir" (22 birim) belirir ve söner.

Anlatım:
1. Ela, sıcaklığın neye bağlı değiştiğini deneyle bulmak istiyor.
2. Sıcaklık değişimini ΔT ile gösteriyoruz: son eksi ilk sıcaklık.
3. Etkili olabilecek üç şey var: ısı, kütle ve madde.
4. Üçünü birden değiştirirsek hangisinin etkili olduğunu anlayamayız.
5. Bu yüzden her deneyde yalnızca biri değişir; ötekiler aynı kalır.
6. Özdeş ısıtıcılar, eşit sürede eşit ısı verir.
7. Isıyı değiştirmek için ısıtıcıyı ya da süreyi değiştiririz.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; tahta temizlenir): "Ela kütlenin etkisini görmek istiyor. Hangi deneyi kurmalı?" **Madde, ısıtıcı ve süre aynı; yalnızca kütle farklı** / Kütle ve madde birlikte farklı / Kütle aynı; ısıtıcı farklı. Dayandığı anlatım: 3, 4, 5. İpuçları: "Yalnızca bir şey değişecekse ötekiler ne olmalı?" · "İki şey birden değişirse hangisinin etkisi olduğu anlaşılmaz."

### Sahne 3 · Birinci deney: ısı değişince

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 240 })` (genişlik 348; x 14–362); başlangıç `ayar('sol', { icerik: 'yag', seviye: 0.5, sicaklik: 25, alev: 0 })`, `ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 25, alev: 0 })`; kadraj `tum`.

Tahta: `sol.etiket` noktasının altında "1. ısıtıcı", `sag.etiket` noktasının altında "2. ısıtıcı" (22 birim); ikisinin altında (y 430, x 190) "zeytinyağı · eşit kütle" ("eşit kütle" turkuaz). Sağda `KIT.tablo` (x 378, y 110; sütunlar 200 / 200 / 200; satır 4; satır yüksekliği 46; başlık: "Süre (dk) · 1. ısıtıcı (°C) · 2. ısıtıcı (°C)"); 0. satır "0 · 25 · 25" tablo açılırken görünür. Anlatım 3'te sol kabın alevi 0 → 2, sağ kabın alevi 0 → 1 (anında). Tahminden sonra üç dilim art arda oynar; her dilim: iki termometre `linear` 1.600 ms ve süreölçer 1.600 ms'de 300 sn ilerler; dilimin sonunda satır `goster` ile açılır (350 ms) ve 400 ms durulur. Dilim 1: sol 25 → 32, sağ 25 → 28; satır "5 · 32 · 28". Dilim 2: sol 32 → 39, sağ 28 → 31; satır "10 · 39 · 31". Dilim 3: sol 39 → 46, sağ 31 → 34; satır "15 · 46 · 34". Anlatım 5 ve 6 ilgili satırlar dolarken okunur. Anlatım 7'den sonra tablo söner (300 ms, `in`) ve grafik gelir: yatay eksen (x 500 → 940, y 400), dikey eksen (x 500, y 400 → 110), 2 birim açık gri; yatay eksen yazısı "Verilen ısı" (x 720, y 450); dikey eksen yazısı "ΔT (°C)" (x 470, y 100); yatay çentik yazıları "Q" (x 620), "2 Q" (x 740), "3 Q" (x 860) (y 428); sarı noktalar (620, 307), (740, 213), (860, 120), yanlarında "7", "14", "21" (noktanın 24 birim solunda). Noktalar anlatım 10'da sırayla belirir (300 ms, `out`); turuncu doğru anlatım 11'de orijinden (500, 400) üçüncü noktaya 800 ms'de çizilir (`out`). Etiket grupları (yatay çentikler, dikey değerler) birer öğe sayılır.

Anlatım:
1. İlk deneyde yalnızca ısı değişiyor: ısıtıcılar farklı.
2. İki özdeş kapta, aynı sıcaklıkta, eşit kütlede zeytinyağı var.
3. Birinci ısıtıcı, birim sürede ikinciden daha çok ısı verir.

Tahmin (`KIT.tahminAl`, `tag: 'Tahmin et'`; doğru şık aranmaz): "Sence beş dakika sonra hangi kapta sıcaklık daha çok artar?" Birinci kapta / İkinci kapta / İkisinde aynı.

Sonra:
4. Ela her beş dakikada iki termometreyi okuyor.
5. Beş dakikada birinci yağ 7 °C, ikincisi 3 °C ısındı.
6. On beşinci dakikada ΔT birincide 21 °C, ikincide 9 °C.
7. Aynı sürede daha çok ısı veren ısıtıcıda sıcaklık daha çok artar.
8. Birinci ısıtıcının beş dakikada verdiği ısıya Q diyelim.
9. Isıtıcı sabit hızla ısı verir.
10. 10 dakikada 2 Q, 15'te 3 Q verir; ΔT 14, 21.
11. Isı iki katına çıkınca ΔT de iki katına çıkıyor.
12. Sıcaklık değişimi, verilen ısıyla doğru orantılıdır.
13. Isıyı ΔT'ye bölünce ısı sığası bulunur: C = Q / ΔT.
14. Buradan verilen ısı bulunur: Q = C · ΔT.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; tahta temizlenir, ortada tek kap ve yanında "1. ısıtıcı, 5 dk: ΔT = 7 °C"): "Aynı ısıtıcı aynı kapta 20 dakika çalışırsa ΔT kaç °C olur?" **28 °C** / 14 °C / 35 °C. Dayandığı anlatım: 9–12. Hesap: 20 dk = 4 × 5 dk → ısı 4 Q → ΔT = 4 · 7 = 28. Çeldiriciler: 14 (10 dakika), 35 (beş katı). İpuçları: "20 dakika, 5 dakikanın kaç katı? Isı da o kadar katı olur." · "ΔT, ısıyla doğru orantılıdır; ısı 4 katına çıkarsa ΔT de çıkar."

Defter (`Isı ve ΔT`): "ΔT, verilen ısıyla doğru orantılıdır: Q = C · ΔT."

### Sahne 4 · İkinci deney: kütle değişince

Tahta: solda buzdolabı (yuvarlatılmış dikdörtgen x 40–250, y 90–430; açık gri 3 birim çizgi; kapı çizgisi x 60'ta dikey); içinde raf (x 60–230, y 270, 3 birim) ve rafta iki özdeş bardak (60 × 110; x 70–130 ve x 150–210; y 160–270). Sol bardakta mavi yarı saydam su yüksekliği 55 (y 215–270), sağ bardakta 110 (y 160–270). Raf altında "m" (x 100, y 305) ve "2 m" (x 180, y 305), turkuaz 22 birim; buzdolabının altında (y 470, x 145) "aynı raf". Sağda `KIT.tablo` (x 290, y 90; sütunlar 200 / 220 / 240; satır 4; satır yüksekliği 46; başlık: "Süre (dk) · m kütleli (°C) · 2 m kütleli (°C)"); 0. satır "0 · 23 · 23" görünür; öteki satırlar anlatım 5–6'da 350 ms'de açılır: "5 · 20 · 21,5", "10 · 17 · 20", "15 · 14 · 18,5". Anlatım 6'dan sonra tablonun altında (y 360–470) iki sarı çubuk belirir (600 ms, `out`; 30 birim/°C): "m" için 270 birim ve "9 °C", "2 m" için 135 birim ve "4,5 °C"; çubuklar x 420'den başlar, solda "m", "2 m" (turkuaz).

Anlatım:
1. İkinci deneyde yalnızca kütle değişiyor.
2. İki özdeş bardakta aynı limonata var: biri m, öteki 2 m kütleli.
3. İkisi buzdolabının aynı rafında; eşit sürede eşit ısı verir.

Tahmin (`KIT.tahminAl`, `tag: 'Tahmin et'`): "Sence 2 m kütleli limonatanın sıcaklığı m kütleliye göre nasıl düşer?" Daha çok / Daha az / Aynı.

Sonra:
4. Ela beş dakikada bir iki bardağı da ölçüyor.
5. Beş dakikada m kütleli 3 °C, 2 m kütleli 1,5 °C soğudu.
6. On beşinci dakikada soğuma 9 °C ve 4,5 °C oldu.
7. Kütle iki katına çıkınca sıcaklık değişimi yarıya indi.
8. Eşit ısıda ΔT, kütleyle ters orantılıdır.
9. Q aynı, ΔT yarıya indi; öyleyse C iki katına çıktı.
10. Isı sığası, kütleyle doğru orantılıdır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; tahta temizlenir, üç özdeş bardak raf üzerinde: "m", "2 m", "3 m"; yalnızca üçüncüsü ışıklı): "Aynı limonatadan 3 m kütleli bardak da aynı rafta 15 dakika kalıyor. Sıcaklığı kaç °C düşer?" **3 °C** / 27 °C / 4,5 °C. Dayandığı anlatım: 7, 8. Hesap: eşit ısıda ΔT ile kütle çarpımı sabit: m için 9; 3 m için 9 / 3 = 3. Çeldiriciler: 27 (kütleyle çarpmak), 4,5 (2 m kütlenin değeri). İpuçları: "Kütle üç katına çıkınca ΔT nasıl değişir? Tabloda iki katı için ne olmuştu?" · "Kütle arttıkça ΔT azalır."

Defter (`Kütle ve ΔT`): "Eşit ısıda ΔT, kütleyle ters orantılıdır; C kütleyle doğru."

### Sahne 5 · Üçüncü deney: madde değişince

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 240 })` (genişlik 348; x 14–362); başlangıç `ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 24, alev: 0 })`, `ayar('sag', { icerik: 'yag', seviye: 0.5, sicaklik: 24, alev: 0 })`; kadraj `tum`.

Tahta: `sol.etiket` noktasının altında "su", `sag.etiket` noktasının altında "zeytinyağı"; ikisinin altında (y 430, x 190) "eşit kütle" (turkuaz) ve "özdeş ısıtıcı" (turuncu). Sağda `KIT.tablo` (x 378, y 110; sütunlar 200 / 200 / 200; satır 4; satır yüksekliği 46; başlık: "Süre (dk) · Su (°C) · Zeytinyağı (°C)"); 0. satır "0 · 24 · 24". Anlatım 3'te iki alev 0 → 2 (anında). Tahminden sonra üç dilim art arda oynar (her dilim 1.600 ms `linear` + 350 ms satır + 400 ms duraklama; süreölçer 300 sn ilerler): dilim 1: sol 24 → 27, sağ 24 → 30, satır "5 · 27 · 30"; dilim 2: sol 27 → 30, sağ 30 → 36, satır "10 · 30 · 36"; dilim 3: sol 30 → 33, sağ 36 → 42, satır "15 · 33 · 42". Anlatım 6'da tablonun altında (y 380–470) iki sarı çubuk (20 birim/°C; x 520'den): su 180 birim ("9 °C"), zeytinyağı 360 birim ("18 °C"), 600 ms, `out`; solda "su", "zeytinyağı".

Anlatım:
1. Üçüncü deneyde yalnızca madde değişiyor.
2. Özdeş iki kapta eşit kütlede su ve zeytinyağı var.
3. İki özdeş ısıtıcı aynı anda açılıyor.

Tahmin (`KIT.tahminAl`, `tag: 'Tahmin et'`): "Sence on beş dakika sonra hangisi daha çok ısınır?" Su / Zeytinyağı / İkisi aynı.

Sonra:
4. Beş dakikada su 3 °C, zeytinyağı 6 °C ısındı.
5. On beşinci dakikada ΔT su için 9 °C, zeytinyağı için 18 °C.
6. Aynı ısıyla zeytinyağının ΔT'si, suyunkinin iki katı oldu.
7. Zeytinyağının öz ısısı suyunkinin yarısıdır.
8. Öz ısı yarıya inince, aynı ısıyla ΔT iki katına çıkıyor.
9. Eşit ısıda ΔT, öz ısıyla ters orantılıdır.
10. Q aynı, ΔT iki katı; öyleyse zeytinyağının ısı sığası yarıdır.
11. Kütle aynıysa ısı sığası, öz ısıyla doğru orantılıdır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; tahta temizlenir, iki özdeş kap: "su", "başka sıvı"; "başka sıvının öz ısısı suyunkinin dörtte biri"; "eşit kütle, özdeş ısıtıcı, eşit süre"): "Aynı ısıyla başka sıvının ΔT'si, suyun ΔT'sinin kaç katı olur?" **4 katı** / Dörtte biri / 2 katı. Dayandığı anlatım: 7, 8, 9. Hesap: eşit ısıda ΔT ile öz ısının çarpımı sabit; öz ısı 1/4 ise ΔT 4 katı. Çeldiriciler: 1/4 (ters), 2 (yarım yamalak). İpuçları: "Öz ısı küçülünce aynı ısıyla ΔT nasıl değişir? Zeytinyağında ne olmuştu?" · "Öz ısı dörtte birine inerse ΔT 4 katına çıkar."

Defter (`Madde ve ΔT`): "Eşit ısıda ΔT, öz ısıyla ters orantılıdır."

### Sahne 6 · Üç ilişki, tek model

Tahta: üstte üç kart (x 60–340, 360–640, 660–940; y 90–170; 24 birim): "ısı: ΔT artar" (turuncu "ısı"), "kütle: ΔT azalır" (turkuaz "kütle"), "öz ısı: ΔT azalır" (açık gri "öz ısı"); kartlar anlatım 2'de belirir (400 ms, `out`) ve anlatım 4'te söner (300 ms, `in`). Altta (x 140–860, y 230–400) çözüm kartı: anlatım 4'te "C = m · c", anlatım 5'te "Q = C · ΔT", anlatım 7'de "Q = m · c · ΔT" (34 birim; renkli: "Q" turuncu, "m" turkuaz, "c" ve "C" açık gri, "ΔT" sarı); anlatım 9'da formülün sembollerinin altında birimler belirir: "J", "g", "J/g · °C", "°C" (22 birim, 300 ms, `out`). Önceki iki formül anlatım 7'de söner (300 ms, `in`).

Anlatım:
1. Üç deneyin sonucunu birleştirelim.
2. ΔT, ısıyla doğru; kütleyle ve öz ısıyla ters orantılıdır.
3. Isı sığası, kütleyle ve öz ısıyla doğru orantılıdır.
4. Bu yüzden C = m · c yazılır.
5. Isı, ısı sığası ile ΔT'nin çarpımıdır: Q = C · ΔT.
6. C yerine m · c yazınca model tamamlanır.
7. Q = m · c · ΔT.
8. Isı joule, kütle gram, sıcaklık değişimi °C ile yazılır.
9. Öz ısının birimi böylece J/g · °C olur.
10. Suyun öz ısısı 4,18 J/g · °C alınır.

Defter (`Model`): "Q = m · c · ΔT. ΔT ısıyla artar, kütleyle azalır."
Defter (`Isı sığasıyla`): "Q = C · ΔT; C = m · c."

### Sahne 7 · Model deneyle uyuşuyor mu?

Tahta: üstte başlık satırı "Q = m · c · ΔT" (renkli; y 90). Altta çözüm kartı (x 140–860, y 150–330; satır 26 birim; aynı anda en çok üç satır). Sahne 5'teki kap kartları yok.

Çözülmüş örnek (II. düzenek, on beşinci dakika):
1. Modeli sınayalım: özdeş ısıtıcılar eşit ısı vermişti.
2. Su için on beş dakikada ΔT 9 °C'tı.
3. Zeytinyağının öz ısısı c'nin yarısı, ΔT ise 18 °C'tı.
4. Su için yazılır: m · c · 9.
5. Zeytinyağı için yazılır: m · c/2 · 18.
6. 18'in yarısı 9'dur; ikisi de m · c · 9 eder.
7. Isılar eşit çıktı; model deneyle uyuşuyor.

Kartta satırlar sırayla belirir: "Su: m · c · 9", "Yağ: m · c/2 · 18", "Yağ: m · c · 9"; son satırda "eşit" kelimesi 300 ms'de beliren sarı çerçeveyle iki satırı birleştirir.

Birlikte çöz (`tag: 'Birlikte çöz'`; I. düzenek, on beşinci dakika; kart: "m kütleli: m · c · 9", "2 m kütleli: 2 m · c · ΔT", "Q aynı: 2 m · c · ΔT = m · c · 9"; ilk iki satır dolu gelir): "ΔT kaç °C olur?" **4,5** / 9 / 18. Dayandığı anlatım: bu sahne 1–7; sahne 6, 7. Hesap: 2 m · c · ΔT = m · c · 9 → ΔT = 9 / 2 = 4,5 (tabloda 23 → 18,5 ile uyumlu). Çeldiriciler: 9 (kütleyi hesaba katmamak), 18 (bölmek yerine çarpmak). İpuçları: "Her iki yanda m · c var; sadeleşince 2 · ΔT = 9 kalır." · "Kütle iki katıysa ΔT yarısı olmalı."

Sonra:
8. Model kütle için de uyuşuyor: 2 m için ΔT yarıya iniyor.

Sor (`c.choice`, `tag: 'Sor'`; tek başına; III. düzenek; kart: "Aynı kap, aynı yağ: birinci ısıtıcı 15 dakikada ΔT = 21 °C, ikinci ısıtıcı ΔT = 9 °C"): "Birinci ısıtıcı on beş dakikada, ikincinin aynı sürede verdiği ısının kaç katını verdi?" **7/3 katını** / 3/7 katını / 2 katını. Dayandığı anlatım: sahne 3, 12–14; sahne 6, 5. Hesap: kap ve yağ aynı → m ve c aynı; Q₁ / Q₂ = (m · c · 21) / (m · c · 9) = 21 / 9 = 7 / 3. Çeldiriciler: 3/7 (ters oran), 2 (yaklaşık okuma). İpuçları: "Kütle ve öz ısı aynı; ısı oranı ΔT oranına eşit olur." · "Büyük ΔT'yi küçüğüne böl."

Gör: iki turuncu çubuk (`KIT.cubuk`; 10 birim/ΔT-birimi; x 300'den): "ikinci" 90 birim ("m · c · 9"), "birinci" 210 birim ("m · c · 21"); 600 ms, `out`.

### Sahne 8 · Hangi düzenek hangi ilişkiyi arıyor?

Tahta: üç kutu (`KIT.sinifla`; "Isı – ΔT" x 60–340, "Kütle – ΔT" x 360–640, "Öz ısı – ΔT" x 660–940; y 70–230); altta sırayla gelen düzenek kartı (x 150–850, y 290–420). Kart doğru kutusuna gider (`scale` 1 → 0,6; 400 ms, `in`).

Anlatım:
1. Her düzenekte bir ilişki aranıyor.
2. Hangi şey değişiyorsa ilişki onunla ΔT arasındadır.

Dene (`KIT.sinifla`, `tag: 'Dene'`; her karta soru: "Bu düzenekte hangi ilişki araştırılıyor?"):
1. "Özdeş bardaklarda m ve 2 m kütleli limonata, buzdolabının aynı rafında." → **Kütle – ΔT**. Neden: "Evet. Yalnızca kütle değişiyor." İpucu: "Bu düzenekte neyi değiştirdik?"
2. "Özdeş iki kapta eşit kütlede su ve zeytinyağı, özdeş ısıtıcılar." → **Öz ısı – ΔT**. Neden: "Evet. Madde değişince öz ısı değişir." İpucu: "Değişen şey madde; maddeye ait özellik hangisi?"
3. "Özdeş iki kapta eşit kütlede zeytinyağı, birim sürede farklı ısı veren iki ısıtıcı." → **Isı – ΔT**. Neden: "Evet. Yalnızca verilen ısı değişiyor." İpucu: "İki ısıtıcının farkı ne?"
4. "Özdeş iki kapta eşit kütlede su; biri 5, öteki 10 dakika ısıtılıyor." → **Isı – ΔT**. Neden: "Evet. Süre arttıkça verilen ısı artıyor." İpucu: "Süre değişince değişen şey ne?"
5. "Özdeş iki kapta 100 g ve 300 g su, özdeş ısıtıcıda eşit süre." → **Kütle – ΔT**. Neden: "Evet. Yalnızca kütle değişiyor." İpucu: "Hangi nicelik 100 g ve 300 g?"

### Çıkış soruları

1. (yeni durum) Ela özdeş iki kaba eşit kütlede su koyuyor; özdeş ısıtıcılarla birini 5, ötekini 10 dakika ısıtıyor. 10 dakika ısıtılan kapta ΔT, ötekinin kaç katıdır? **2 katı** / Yarısı / Aynı. (sahne 3, 9–12)
2. (yeni durum) Aynı ısıtıcıyla aynı süre ısıtılan, aynı maddeden 3 m kütleli cismin ΔT'si m kütleli olanın kaç katıdır? **Üçte biri** / 3 katı / Aynı. Hesap: Q eşit, m ve c'de 3 m için ΔT = ΔT₀ / 3. (sahne 4, 8; sahne 6)
3. (yanılgı) Eşit kütlede su ve zeytinyağına eşit ısı verildi; zeytinyağı daha çok ısındı. Neden? **Zeytinyağının öz ısısı suyunkinden küçüktür** / Zeytinyağına daha çok ısı verildi / Zeytinyağının kütlesi daha küçüktü. (sahne 5, 7–9)
4. Q = m · c · ΔT bağıntısında c neyi gösterir? **Öz ısıyı** / Isı sığasını / Sıcaklık değişimini. (sahne 6)
5. (yeni durum) Ela, ısının sıcaklık değişimine etkisini ölçecek. Hangi kurgu uygundur? **Kütle ve madde aynı; yalnızca verilen ısı farklı** / Kütle ve ısı birlikte farklı / Madde ve ısı birlikte farklı. (sahne 2)

## B4 · Modelle hesap

- **Fikir:** Bulunan model, kütle, madde ya da sıcaklık değiştiğinde alınan ya da verilen ısıyı hesaplar; hesaplar etmenler arasındaki ilişkiyi geneller (hangisi artınca ne artar).
- **Giriş ekranı sorusu:** Bir bardak çay suyunu kaynatmak için ne kadar ısı gerekir; bardak iki katına çıkarsa?
- **Kaynak:** Ders kitabı s. 222 (Örnek 2: 500 g su, 20 °C, 10.450 J → 25 °C; sayılar kitabındır, adı Betül yerine Ela), s. 223 (3. Alıştırma: A ve B maddeleri, cA = 900, cB = 450 J/kg · °C; derste g ile 0,9 ve 0,45 J/g · °C yazılır), s. 221 (Etkinlik soru 9, soru 2: 2 m kütleli cisme 2 Q → T; aynı maddeden m kütleliye 8 Q → ?; kitap cevap vermez, yazar hesapladı: 8 T). Öteki sayılar bu dersin yeni hesap sayılarıdır; hepsi kitabın modelinden ve suyun 4,18 J/g · °C değerinden hesaplanmıştır.
- **Sınır:** Yalnızca Q = m · c · ΔT ve ısı sığasıyla yazılışı. Kalori, bakırın öz ısısı sayısı, ısıl denge, hâl değişimi yok. Su dışında yalnızca kitabın A ve B maddeleri kullanılır (zeytinyağı için kitap J cinsinden sayı vermez). Şekil: Ş2 yalnızca hazır pozla (ayar sahne boyunca değişmez).
- **Güç kavram ve gösterimi:** Üç çarpanın ayrı ayrı etkisi: kütle, madde ve ΔT'den biri değişirken ötekiler sabit kalır; ısı çubuğu orantıyla uzar. Kaydırıcıyla üçünü birlikte değiştirmek (sahne 6).
- **Hedeflenen yanılgı:** ΔT yerine son sıcaklığı yazmak; kütle iki katına çıkınca ısının değişmeyeceğini sanmak ("sıcaklık aynıysa ısı aynıdır"); eşit ısı verilen iki cismin ΔT'sinin de eşit olacağını sanmak.
- **Akılda kalıcı cümle:** Kütle, madde ve sıcaklık farkı belliyse ısı hesaplanır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Aynı maddeden iki cisme eşit ısı verilirken kütle iki katına çıkarsa ΔT nasıl değişir? **Yarıya iner** / İki katına çıkar / Değişmez. (B3) Yanlışta: "Eşit ısıda ΔT, kütleyle ters orantılıdır."
2. 1 kg bakırın ısı sığası C ise 2 kg bakırın ısı sığası kaçtır? **2 C** / C / C / 2. (B2) Yanlışta: "Kütle iki katına çıkınca ısı sığası da iki katına çıkar."

Tahta: birinci soruda iki turkuaz cisim (x 330–430 ve x 540–680, ikincisi iki kat yüksek; altlarında "m", "2 m") ve her birine soldan eşit turuncu ok ("ısı"); ikinci soruda iki bakır blok (1 kg: x 330–430, y 200–300; 2 kg: x 540–680, y 130–300; açık turuncu dolgu) ve altlarında "1 kg", "2 kg".

Sonra: "Bugün bu modelle gerçek hesaplar yapacağız."

### Sahne 2 · Çözülmüş örnek: Ela'nın 500 g suyu

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 240 })` (genişlik 348; x 14–362), hazır poz: `ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 20, alev: 2 })`, `goster('sag', 0)`; kadraj `sol`. Poz sahne boyunca değişmez.

Tahta: `sol.etiket` noktasının altında "500 g su" ("500 g" turkuaz). Anlatım 8'de `sol.termometre` noktasından yukarı 40 birimlik sarı ok belirir (400 ms, `out`; uzunluk ölçeksizdir) ve yanında "+5 °C" (sarı, 24 birim). Sağda çözüm kartı (x 400–980; üç yuva: y 150, 220, 290; satır 26 birim; en çok üç satır). Birinci bölüm: yuva 1'de anlatım 3'te "Q = m · c · ΔT"; yuva 2'de anlatım 5'te "10.450 = 500 · 4,18 · ΔT"; yuva 3'te anlatım 7'de "ΔT = 5 °C"; anlatım 9–10'da yuva 1'deki ilk satır söner (300 ms, `in`) ve aynı yuvada "20 + 5 = 25 °C" belirir (300 ms, `out`). Anlatım 11'de üç satır birden söner (300 ms, `in`); ikinci bölüm: yuva 1'de anlatım 12'de "C = 500 · 4,18 = 2.090 J/°C"; yuva 2'de anlatım 13'te "ΔT = 10.450 / 2.090 = 5 °C". Formüllerde renkler: "Q" ve "10.450" turuncu, "m" ve "500" turkuaz, "ΔT" ve sıcaklık değerleri sarı, "c", "C" ve "4,18" açık gri.

Anlatım:
1. Ela 500 g suya 10.450 J ısı veriyor; su 20 °C'ta.
2. Suyun son sıcaklığını modelle bulacağız.
3. Model: Q = m · c · ΔT.
4. Suyun öz ısısı 4,18 J/g · °C alınır.
5. Değerleri yazalım: 10.450 = 500 · 4,18 · ΔT.
6. 500 ile 4,18'in çarpımı 2.090 eder.
7. ΔT, 10.450'nin 2.090'a bölümüdür: 5 °C.
8. Su 5 °C ısındı.
9. Son sıcaklık, ilk sıcaklığa ΔT eklenerek bulunur.
10. 20 + 5 = 25 °C.
11. Aynı sonucu ısı sığasıyla da bulabiliriz.
12. Önce ısı sığası: C = 2.090 J/°C.
13. ΔT = Q / C = 10.450 / 2.090 = 5 °C.
14. İki yol da aynı sonucu verdi.

Hesap: 500 · 4,18 = 2.090; 10.450 / 2.090 = 5 (2.090 · 5 = 10.450); 20 + 5 = 25.

Soru yok (çözülmüş örnek). Sahne `c.cont('Devam ›')` ile biter.

### Sahne 3 · Kütle değişirse ısı nasıl değişir?

Tahta: üstte "su · ΔT = 5 °C" (x 90, y 100; "su" mavi, "ΔT = 5 °C" sarı, 26 birim). Üç yatay ısı çubuğu (turuncu, 22 birim kalın; x 220'den; 1 birim = 52,25 J): "250 g" (y 180) 100 birim, "500 g" (y 260) 200 birim, "1.000 g" (y 340) 400 birim; solda kütle etiketleri (turkuaz, 26 birim, x 90), çubuk ucunun 12 birim sağında değerler: "5.225 J", "10.450 J", "20.900 J" (turuncu). Çubuklar boşken başlar; 500 g çubuğu anlatım 1'de (sahne 2'den tanıdık) 600 ms'de (`out`) uzar. Alt satırda (x 90, y 440; en çok bir satır, 26 birim) çözüm: anlatım 2'de "1.000 · 4,18 · 5 = 20.900". 1.000 g çubuğu anlatım 3'te uzar. 250 g çubuğu birlikte çözümden sonra uzar.

Anlatım:
1. Şimdi kütleyi değiştirelim; madde su, ΔT yine 5 °C.
2. 1.000 g su için hesap tahtada.
3. Isı 20.900 J bulunur.
4. Kütle iki katına çıkınca gereken ısı da iki katına çıktı.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart üç satır dolu gelir: "Q = m · c · ΔT", "Q = 250 · 4,18 · 5", "250 · 4,18 = 1.045"; dördüncü satır "Q = 1.045 · 5 = ……"): "250 g su için Q kaç J'dür?" **5.225** / 1.045 / 10.450. Dayandığı anlatım: sahne 2, 3–7; bu sahne 1–4. Hesap: 250 · 4,18 = 1.045; 1.045 · 5 = 5.225. Çeldiriciler: 1.045 (ΔT'yi unutmak), 10.450 (500 g'ın değeri). İpuçları: "1.045'i ΔT ile çarpmayı unutma." · "Kütle 500 g'ın yarısı; ısı 10.450 J'ün yarısı olmalı."

Gör: 250 g çubuğu 0 → 100 birim uzar (600 ms, `out`), "5.225 J" yazısı belirir.

Sonra:
5. Kütle yarıya inince ısı da yarıya indi.
6. Madde ve ΔT aynıysa Q, kütleyle doğru orantılıdır.

### Sahne 4 · Madde değişirse ısı nasıl değişir?

Tahta: üstte "500 g · ΔT = 5 °C" (x 90, y 100; "500 g" turkuaz, "ΔT = 5 °C" sarı) ve y 140'ta başlık "c (J/g · °C)" (açık gri, 22 birim). Üç yatay ısı çubuğu (turuncu, 22 birim; x 300'den; 1 birim = 26,125 J): su 400 birim ("10.450 J"), A 86 birim ("2.250 J"), B 43 birim ("1.125 J"); solda satır etiketleri "su 4,18", "A 0,9", "B 0,45" (y 200, 280, 360; x 80). Su çubuğu sahne açılırken 600 ms'de (`out`) uzar; A anlatım 3'te, B birlikte çözümden sonra uzar. Alt satırda (x 90, y 440) çözüm satırı: anlatım 3'te "500 · 0,9 · 5 = 2.250".

Anlatım:
1. Şimdi maddeyi değiştirelim: 500 g, ΔT yine 5 °C.
2. A maddesinin öz ısısı 0,9 J/g · °C'tır.
3. Q = 500 · 0,9 · 5 = 2.250 J bulunur.

Birlikte çöz (`tag: 'Birlikte çöz'`; B maddesi, öz ısı 0,45 J/g · °C; kart: "Q = m · c · ΔT", "Q = 500 · 0,45 · 5", "500 · 0,45 = 225", "Q = 225 · 5 = ……"): "B maddesi için Q kaç J'dür?" **1.125** / 225 / 2.250. Dayandığı anlatım: sahne 2, 3–5; bu sahne 1–3. Hesap: 500 · 0,45 = 225; 225 · 5 = 1.125. Çeldiriciler: 225 (ΔT'yi unutmak), 2.250 (A'nın değeri). İpuçları: "225'i ΔT ile çarpmak kaldı." · "B'nin öz ısısı A'nın yarısı; ısı da yarısı olmalı."

Gör: B çubuğu 0 → 43 birim uzar (600 ms, `out`), "1.125 J" yazısı belirir.

Sonra:
4. B'nin öz ısısı A'nın yarısı; gereken ısı da yarısıdır.
5. Su için gereken ısı, ikisinden de çok daha büyük.
6. Kütle ve ΔT aynıysa Q, öz ısıyla doğru orantılıdır.

Sor (`c.choice`, `tag: 'Sor'`; tek başına; tahta temizlenir, iki özdeş kap "A" ve "B", altlarında "1.000 g", yanlarında "4.500 J" turuncu ok): "1.000 g A ve 1.000 g B maddesine eşit 4.500 J ısı veriliyor. Hangisinin ΔT'si daha büyük ve kaç °C'tır?" **B; ΔT = 10 °C** / A; ΔT = 10 °C / İkisinin ΔT'si de 5 °C. Dayandığı anlatım: sahne 2, 7, 12–13; bu sahne 2, 4–6. Hesap: ΔT = Q / (m · c); A: 4.500 / (1.000 · 0,9) = 4.500 / 900 = 5; B: 4.500 / (1.000 · 0,45) = 4.500 / 450 = 10. Çeldiriciler: "A; 10 °C" (yön ters), "ikisi de 5 °C" (eşit ısıda ΔT eşit sanmak). İpuçları: "ΔT = Q / (m · c); B'nin c'si daha küçük, paydası da küçük." · "Isı eşit olsa bile ΔT öz ısıya bağlıdır."

Gör: iki kabın yanında sarı ΔT çubukları (20 birim/°C): A 100 birim ("5 °C"), B 200 birim ("10 °C"), 600 ms, `out`.

### Sahne 5 · Sıcaklık değişimi değişirse ısı nasıl değişir?

Figür: `ISITMA.kur(c, svg, { x: 14, y: 110, h: 240 })` (genişlik 348; x 14–362), hazır poz: `ayar('sol', { icerik: 'su', seviye: 0.5, sicaklik: 20, alev: 2 })`, `goster('sag', 0)`; kadraj `sol`. Poz sahne boyunca değişmez.

Tahta: `sol.etiket` noktasının altında "500 g su". Sağda üç yatay ısı çubuğu (turuncu; x 560'tan; 1 birim = 110 J): "ΔT = 5 °C" (y 160) 95 birim ("10.450 J"), "ΔT = 10 °C" (y 240) 190 birim ("20.900 J"), "ΔT = 15 °C" (y 320) 285 birim ("31.350 J"); etiketler x 400'de sarı, 24 birim; değerler çubuk ucunun 12 birim sağında. İlk çubuk anlatım 1'de, ikincisi anlatım 4'te uzar (600 ms, `out`); üçüncüsü tek başına sorudan sonra. Alt satırda (x 400, y 440) çözüm satırı: anlatım 4'te "500 · 4,18 · 10 = 20.900".

Anlatım:
1. Şimdi ΔT'yi değiştirelim: yine 500 g su.
2. Ela suyu 20 °C'tan 30 °C'a ısıtıyor.
3. ΔT, 30 eksi 20; yani 10 °C.
4. Q = 500 · 4,18 · 10 = 20.900 J bulunur.
5. ΔT iki katına çıkınca gereken ısı da iki katına çıktı.
6. Kütle ve madde aynıysa Q, ΔT ile doğru orantılıdır.

Sor (`c.choice`, `tag: 'Sor'`; tek başına; yeni sayılar; tahta aynen kalır, üçüncü çubuk gizli): "Ela aynı 500 g suyu 20 °C'tan 35 °C'a ısıtıyor. Gereken ısı kaç J'dür?" **31.350** / 73.150 / 2.090. Dayandığı anlatım: sahne 2, 3–7; bu sahne 3–6. Hesap: ΔT = 35 − 20 = 15; Q = 500 · 4,18 · 15 = 2.090 · 15 = 31.350. Çeldiriciler: 73.150 (ΔT yerine son sıcaklık: 2.090 · 35), 2.090 (ΔT'yi unutmak). İpuçları: "Formülde ΔT var; son sıcaklık değil, sıcaklık değişimi." · "ΔT = 35 − 20 = 15 °C; 2.090 ile çarp."

Gör: üçüncü çubuk 0 → 285 birim uzar (600 ms, `out`), "31.350 J" yazısı belirir.

Defter (`Hesap adımları`): "Q = m · c · ΔT: ΔT, son eksi ilk sıcaklıktır."

### Sahne 6 · Üçünü birlikte değiştir

Tahta: solda üç kaydırıcı (iz x 60 → 460; tutamak yarıçapı 14; satır başlıkları y 110, 230, 350; iz y 140, 260, 380). Birinci: "kütle (g)" (turkuaz), 100 → 1.000 g, adım 50, başlangıç 500, değer iz üstünde tutamağın yanında. İkinci: "madde" (açık gri), üç durak "su", "A", "B" (c = 4,18; 0,9; 0,45 J/g · °C; tutamak duraklara oturur), başlangıç su. Üçüncü: "ΔT (°C)" (sarı), 1 → 20, adım 1, başlangıç 5. Sağda (x 520–980) ısı çubuğu (turuncu, 26 birim kalın, y 250; 1 birim = 220 J; en çok 380 birim), ucunda değer yazısı ("10.450 J" başlangıçta; çubuk 47,5 birim) ve üstünde (y 190) "Q" (turuncu, 30 birim). Çubuk ve değer, kaydırıcı her değiştiğinde anında güncellenir; otomatik geçişlerde tutamak ve çubuk birlikte 800 ms'de (`inOut`) hareket eder.

Anlatım:
1. Üç çarpanı birlikte değiştirebilirsin: kütle, madde, ΔT.
2. Çubuk, gereken ısıyı gösterir.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum; yanıttan sonra kaydırıcılar kendiliğinden 1.000 g · su · 10 °C'a gider): "Kütleyi 1.000 g'a, ΔT'yi 10 °C'a çıkarırsan (madde su) Q kaç katı olur?" **4 katı** / 2 katı / 3 katı. Dayandığı anlatım: sahne 3, 6; sahne 5, 6. Hesap: 2 · 2 = 4; Q = 1.000 · 4,18 · 10 = 41.800 = 4 · 10.450. İpuçları: "Kütle iki katına çıkınca Q iki katı, ΔT de iki katına çıkınca yine iki katı." · "İki etki çarpılır."

Gör: çubuk 47,5 → 190 birim; değer "41.800 J".

Sor (`c.choice`, `tag: 'Sor'`; kaydırıcılar önce 500 g · su · 5 °C'a döner, 600 ms, `inOut`): "Kütleyi yarıya (250 g), ΔT'yi iki katına (10 °C) getirirsen Q ne olur?" **Değişmez** / Artar / Azalır. Dayandığı anlatım: sahne 3, 6; sahne 5, 6. Hesap: Q = 250 · 4,18 · 10 = 10.450 (başlangıçla aynı). İpuçları: "Biri yarıya inip öteki iki katına çıkarsa çarpım aynı kalır." · "Kütle yarısı, ΔT iki katı."

Gör: çubuk 47,5 birimde kalır; değer "10.450 J".

Sor (`c.choice`, `tag: 'Sor'`; kaydırıcılar 500 g · su · 5 °C'a döner): "Maddeyi su yerine A yaparsan (kütle ve ΔT aynı) Q ne olur?" **Azalır** / Artar / Değişmez. Dayandığı anlatım: sahne 4, 4–6. Hesap: Q = 500 · 0,9 · 5 = 2.250 < 10.450. İpuçları: "A'nın öz ısısı suyunkinden küçük." · "Kütle ve ΔT aynıysa Q, öz ısıyla doğru orantılıdır."

Gör: madde tutamağı "A"ya oturur; çubuk 47,5 → 10,2 birim; değer "2.250 J".

Sonra (kaydırıcılar serbest; `c.cont('Devam ›')` ile biter):
3. Şimdi sen dene: üç çarpanı istediğin gibi değiştir.

### Sahne 7 · Hangisi artınca ne artar?

Tahta: üç kutu (`KIT.sinifla`; "Q artar" x 60–340, "Q azalır" x 360–640, "Q değişmez" x 660–940; y 70–230); altta sırayla gelen durum kartı (x 100–900, y 290–420). Kart doğru kutusuna gider (`scale` 1 → 0,6; 400 ms, `in`).

Anlatım:
1. Hesaplardan bir genelleme çıkaralım.
2. Kütle, öz ısı ya da ΔT artınca Q artar.
3. Q, bu üçünün her biriyle doğru orantılıdır.
4. Biri artıp biri azalırsa Q değişmeyebilir.

Dene (`KIT.sinifla`, `tag: 'Dene'`; soru: "Aynı ısı hesabında Q ne olur?"):
1. "Kütle üç katına çıkıyor; madde ve ΔT aynı." → **Q artar**. Neden: "Evet. Q, kütleyle doğru orantılıdır." İpucu: "Kütle artınca Q nasıl değişiyordu?"
2. "Madde B oluyor (öz ısısı daha küçük); kütle ve ΔT aynı." → **Q azalır**. Neden: "Evet. Öz ısı küçülünce Q küçülür." İpucu: "Öz ısı küçülünce Q için ne olmuştu?"
3. "ΔT yarıya iniyor; kütle ve madde aynı." → **Q azalır**. Neden: "Evet. Q, ΔT ile doğru orantılıdır." İpucu: "ΔT küçülünce Q ne olur?"
4. "Kütle iki katına çıkıyor, ΔT yarıya iniyor; madde aynı." → **Q değişmez**. Neden: "Evet. İki ile bir bölü ikinin çarpımı bir eder." İpucu: "İki etkiyi çarp: iki kat ve yarı."
5. "ΔT iki katına çıkıyor, öz ısı yarıya iniyor; kütle aynı." → **Q değişmez**. Neden: "Evet. İki katı ve yarısı birbirini götürür." İpucu: "İki katı ile yarısını çarp."

Sonra:
5. Kütle, madde ve ΔT belliyse ısı hesaplanır.

Defter (`Hesap`): "Kütle, madde, ΔT belliyse ısı hesaplanır."
Defter (`Orantı`): "Q; m, c ve ΔT ile doğru orantılıdır."

### Çıkış soruları

1. (yeni durum) Ela 300 g suyu 20 °C'tan 30 °C'a ısıtıyor. Gereken ısı kaç J'dür? **12.540** / 1.254 / 37.620. Hesap: ΔT = 10; 300 · 4,18 · 10 = 1.254 · 10 = 12.540. Çeldiriciler: 1.254 (ΔT'yi unutmak), 37.620 (ΔT yerine son sıcaklık: 1.254 · 30). (sahne 2, 5)
2. (yeni durum) Ela öz ısısı 0,9 J/g · °C olan A maddesinden 400 g alıp 10 °C ısıtıyor. Gereken ısı kaç J'dür? **3.600** / 360 / 4.000. Hesap: 400 · 0,9 · 10 = 360 · 10 = 3.600. Çeldiriciler: 360 (ΔT'yi unutmak), 4.000 (öz ısıyı unutmak). (sahne 4)
3. (yanılgı) Aynı maddeden iki cismin her birini 10 °C ısıtmak için gereken ısı karşılaştırılıyor; ikincinin kütlesi birincinin iki katı. Hangisi doğrudur? **İkincisi için gereken ısı iki katıdır** / İkisi için gereken ısı aynıdır; ΔT eşit / İkincisi için gereken ısı yarısıdır. (sahne 3)
4. (yeni durum) 500 g su 20.900 J ısı alıyor. ΔT kaç °C'tır? **10** / 5 / 20. Hesap: ΔT = Q / (m · c) = 20.900 / (500 · 4,18) = 20.900 / 2.090 = 10. Çeldiriciler: 5 (10.450 J'lük örneğin sonucu), 20 (iki katı yanlış okuma). (sahne 2, 5)
5. (yeni durum) Kütlesi 2 m, öz ısısı c olan cisme 2 Q ısı verilince sıcaklık değişimi T oluyor. Aynı maddeden m kütleli cisme 8 Q verilirse sıcaklık değişimi kaç T olur? **8 T** / 4 T / 2 T. Hesap: 2 Q = 2 m · c · T → Q = m · c · T; 8 Q = m · c · ΔT′ → ΔT′ = 8 T. Çeldiriciler: 4 T (yalnızca ısı oranı 8 Q / 2 Q), 2 T (kütle oranıyla). (sahne 6, 7)

## B5 · Konu tekrarı: Isının hesabı (`b5-tekrar.html`, 1 sahne + 9 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural 3 × 2 ızgarada sırayla toplanır (hücreler x 40–340, 360–660, 680–980; satırlar y 70–260 ve 290–480), her biri küçük çizimiyle (üstte çizim, altında 24 birimlik etiket) ve deftere düşer. Çizimler: (1) tek sarı sütun ve yanında üç kısa açık gri cetvel, etiket "üç ölçek"; (2) beş küçük termometre simgesi yan yana (B1 sahne 6'daki simgeler), etiket "beş tür"; (3) bir beher, üstünde turuncu ok ve "1 °C", etiket "öz ısı"; (4) bir blok ve yanında iki kat yüksek blok, üstlerinde "C" ve "2 C", etiket "ısı sığası"; (5) renkli "Q = m · c · ΔT" (34 birim; etiket yok); (6) iki sarı çubuk, uzun olanın yanında kısa turkuaz çubuk, etiket "ters orantı". Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner; sahnenin sonunda hepsi yeniden tam görünür olur. Figür yok; yazı toplamı 25 kelimeyi aşmaz (etiketler ve formüller).

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Sıcaklık aynı kalır; ölçek değişince sayı değişir.
3. Termometre türü, ölçülecek ortama göre seçilir.
4. Öz ısı, birim kütlenin 1 °C için istediği ısıdır; maddeye aittir.
5. Isı sığası cisme aittir: C = m · c.
6. Model: Q = m · c · ΔT.
7. Eşit ısıda ΔT, kütleyle ve öz ısıyla ters orantılıdır.

Defter (kural başına, anlatım 2–7 ile birlikte): "Sıcaklık aynı, ölçek farklı." · "Termometre türü ortama göre seçilir." · "Öz ısı maddenin özelliğidir." · "Isı sığası cismin özelliğidir: C = m · c." · "Q = m · c · ΔT" · "Eşit ısıda ΔT, m ve c ile ters orantılıdır."

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Ela'nın termometresi suyun donma sıcaklığında 273 gösteriyor. Termometrenin ölçeği hangisidir? **Kelvin** / Celsius / Fahrenheit. (B1 sahne 4)
2. (yanılgı) Aynı odada bir Celsius ve bir Fahrenheit termometresi farklı sayılar gösteriyor. Hangisi doğrudur? **Sıcaklık aynı, ölçek farklı** / Oda iki ayrı sıcaklıktadır / Termometrelerden biri bozuktur. (B1 sahne 4, 5)
3. (yeni durum) Bir gıda tesisinde ürünlerin sıcaklığı, ürünlere dokunmadan ölçülecek. Hangi termometre uygundur? **Kızılötesi** / Sıvılı / Metal. (B1 sahne 6)
4. (yanılgı) Aynı maddeden 300 g ve 600 g iki cisim için hangisi doğrudur? **Öz ısıları eşit; 600 g'ın ısı sığası iki katıdır** / Isı sığaları eşit; 600 g'ın öz ısısı iki katıdır / Öz ısıları da ısı sığaları da eşittir. (B2 sahne 5)
5. (yeni durum) Ela 400 g suyu 25 °C'tan 35 °C'a ısıtıyor (su 4,18 J/g · °C). Gereken ısı kaç J'dür? **16.720** / 1.672 / 58.520. Hesap: ΔT = 10; 400 · 4,18 = 1.672; 1.672 · 10 = 16.720. Çeldiriciler: 1.672 (ΔT'yi unutmak), 58.520 (ΔT yerine son sıcaklık: 1.672 · 35). (B4 sahne 2, 5)
6. (yeni durum) Öz ısısı 0,45 J/g · °C olan B maddesinden 200 g, 20 °C ısıtılıyor. Gereken ısı kaç J'dür? **1.800** / 90 / 4.000. Hesap: 200 · 0,45 = 90; 90 · 20 = 1.800. Çeldiriciler: 90 (ΔT'yi unutmak), 4.000 (öz ısıyı unutmak: 200 · 20). (B4 sahne 4)
7. (yeni durum) 250 g su 5.225 J ısı alıyor (su 4,18 J/g · °C). Sıcaklığı kaç °C artar? **5** / 10 / 25. Hesap: ΔT = Q / (m · c) = 5.225 / (250 · 4,18) = 5.225 / 1.045 = 5. Çeldiriciler: 10 (iki katı yanlış okuma), 25 (öz ısıdaki ondalığı kaydırmak: 5.225 / 209). (B4 sahne 2, 5)
8. (yeni durum) Aynı ısıtıcıyla aynı süre ısıtılan, aynı maddeden 4 m kütleli cismin ΔT'si m kütleli olanın kaç katıdır? **Dörtte biri** / 4 katı / Aynı. Hesap: Q ve c eşit; m · ΔT sabit; ΔT = ΔT₀ / 4. (B3 sahne 4, 6)
9. (yeni durum) m kütleli, c öz ısılı cisme Q ısı verilince sıcaklık değişimi T oluyor. Kütlesi 3 m, öz ısısı c/2 olan başka bir cisme 6 Q verilirse sıcaklık değişimi kaç T olur? **4 T** / 2 T / 6 T. Hesap: Q = m · c · T; 6 Q = 3 m · (c/2) · ΔT′ = 1,5 · m · c · ΔT′; ΔT′ = 6 · m · c · T / (1,5 · m · c) = 4 T. Çeldiriciler: 2 T (öz ısıyı hesaba katmamak: 6 Q = 3 m · c · ΔT′), 6 T (yalnızca ısı oranı). (B3 sahne 6; B4 sahne 7)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.2 ve uygulama metni) | Karşılığı |
|---|---|
| Kelvin, Celsius ve Fahrenheit ölçekleri; başka ölçek yok | B1 sahne 3, 4, 5 (başka ölçek anılmaz) |
| Termometrelerin ölçeklendirilmesi | B1 sahne 3 (iki sabit nokta, aralık bölmelenir), sahne 4 (üç ölçeğin sayıları) |
| Termometrelerin kullanım amaçları | B1 sahne 5 (ölçeklerin amacı), sahne 6, 7, 8 (beş tür ve kullanım yerleri) |
| Termometre dönüşümleri ile ilgili matematiksel işlemlerden kaçınılır | Hiçbir derste dönüşüm işlemi, formülü ya da sorusu yok; B1 sahne 5'teki "70 °C ≠ 70 °F" karşılaştırması işlem içermez |
| Öz ısı kavramı | B2 sahne 3, 4 (aynı ısı, farklı artış; birim kütle, 1 °C; c) |
| Isı sığası kavramı ("ısı kapasitesi" de denebilir) | B2 sahne 5, 6, 7 (C = m · c, "ısı kapasitesi" adı sahne 5 anlatım 5) |
| Anahtar kavramlar: ısı, öz ısı, ısı sığası, sıcaklık farkı | B2, B3 sahne 2 (ΔT tanımı), B3 sahne 6 |
| Uygulama: deney tasarlama (SDB1.2), gruplar ve takım çalışması (SDB2.1, 2.2) | Siteye taşınmaz; B3 sahne 2 "tek değişken" kuralını verir, B3 sahne 3–5 hazır deneylerdir (destekleme: deney hazır verilir) |
| Uygulama: özdeş ısı kaynaklarıyla farklı kütleli suyu ısıtarak sıcaklığını ölçebilir ("ölçebilir", isteğe bağlı) | Alınmadı; yerine kitabın I. düzeneği (m ve 2 m limonata, soğutma) B3 sahne 4'te; kütle etkisi aynı biçimde görülür |
| Uygulama: alınan ya da verilen ısı miktarı, maddenin cinsi ve kütlesi değiştirilen deneyler | B3 sahne 3 (ısı), sahne 4 (kütle), sahne 5 (madde); sahne 8 (hangi düzenek hangi ilişki) |
| Uygulama: verileri analiz ederek ısı, sıcaklık, öz ısı ve ısı sığası arasındaki modele ulaşma | B3 sahne 3–6 (tablo, çubuk ve grafik; Q = C · ΔT, C = m · c, Q = m · c · ΔT) |
| a) İlişkiyi deney yoluyla keşfederek matematiksel modele ulaşır | B3 (tamamı) |
| Uygulama: model yardımıyla farklı kütle, madde ve sıcaklık değişkenlerine göre yeni durumları hesaplayıp ilişkiyi geneller | B4 sahne 3 (kütle), 4 (madde), 5 (ΔT), 6 (üçü birlikte), 7 (genelleme); B5 |
| b) Modeli farklı durumlar için hesaplamalar yaparak geneller | B4 sahne 2–7; B3 sahne 7 (model sınama) |
| Uygulama: açık uçlu maddelerden oluşan test (öğretmenin değerlendirmesi) | Siteye taşınmaz; çıkış soruları seçeneklidir |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık kavramları | Ayrı ders yok; A konusu ve B1 sahne 1 hatırlatır |

Fazla olan: B1'de beş termometre türü ve kullanım yerleri (karar 11: program "kullanım amaçları" ister, kitap bunu beş tür olarak sayar); B2 sahne 2'deki kum ve deniz örneği (kitapta yok, `PLAN.md` kısa ders listesinden; sayı yok); B2 sahne 4'teki su ve buzun öz ısı değerleri (kitap s. 219, SI yazımı).

Eksik olan: kitabın "Konuya Başlarken" metni (su duvarı, radyatör; s. 215), 5. Alıştırma (öz ısının günlük etkileri), Çalışma Yaprağı soru 2 (etil alkol ve süt; kalori ve ısıtıcı belirsizliği nedeniyle), soru 3 (ateş tuğlası, sıcak su torbası): kitap cevap vermiyor, program bunları istemiyor, ders sayısını artırmamak için alınmadı. 6. Alıştırma'nın (deniz suyu) fikri B2 çıkış sorusu 4'e alındı.
