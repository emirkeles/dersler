# Senaryolar — Konu E · Isı aktarım yolları

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.5, `../PLAN.md` bölüm 3 (E1, E2), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 6, 10, 19) ve bölüm 8 ("E" satırları), `../IZOMETRIK.md` bölüm 6b (Ş4). Biçim ve ayrıntı düzeyi `A-ic-enerji-isi-sicaklik.md` örneğini izler.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("0 K" → "sıfır kelvin").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur; deneyi ve durumları Ela yaşar.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Bu konuda "anlat" kısmı durum durum ilerler (E1: kaşık, soba odası, Güneş ile Dünya); her durumun kendi sorusu ve defter satırı vardır.
- Renkler tema boyunca aynıdır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle (madde miktarı) turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gri çizilir. Tahta koyudur: çizgiler açık renklidir; koyu renkli nesne (E2'deki siyah araba) koyu gri dolgu ve açık 3 birimlik çizgiyle çizilir.
- Tahta 1000 × 562 birimdir; yazı en az 22 birim; tahtada aynı anda en çok 25 kelime ve 12 öğe. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız ya da sürekli akış).
- **Adlar:** iletim, konveksiyon, ışıma (PLAN karar 6). "Taşıma" adı yazılmaz; "taşır" fiili yalnızca konveksiyonda sıcak taneciklerin enerjiyi beraberinde götürmesi için kullanılır (kitabın cümlesi). E1 bu adları vermez, durumları ısının geçtiği ortama göre ayırır; E2 gruplar ve adlandırır. "Sürüklenme" ve "yayılma" alt adları kullanılmaz. Kitabın "temas gerektirir / gerektirmez" sütunu alınmaz; sınıflama yalnızca ortamın niteliğine göredir.
- **Ortamın üç niteliği (E1):** akışkan olmayan maddesel ortam (katı), akışkan maddesel ortam (sıvı ve gaz), maddesel olmayan ortam (boşluk). Renk: "maddesel ortam" yazısı turkuaz, "akışkan" mavi, "maddesel olmayan" gri.
- **Figür Ş4 (`ODA`, `dersler/oda-sekil.js`):** kesit oda. Bu temada iki derste de aynı yere konur: `{ x: 40, y: 110, h: 380 }` (genişlik 380 × 1,3 = 494; x 40–534, y 110–490). Sağdaki x 580–960 alanı yazı, kutu ve küçük çizimler içindir; figürle üst üste gelmez. Etiket, sayı ve oklar figürde değil dersin düz katmanındadır. Hava akımı oku: `f.yol('dongu')` noktalarından geçen 6 birim kalın eğri ok, 16 birimlik ok başı; dizinin ilk yarısı yükselen kol (turuncu), ikinci yarısı inen kol (mavi). Işıma oku: `f.yol('isima')` boyunca ilerleyen turuncu dalga çizgisi (4 birim kalın, dalga boyu 40, genlik 8). Termometre sütununun boyu `(°C + 20) / 140` oranındadır; tahtada sayı yazılmaz, yalnızca sütun boyu görünür.
- **Düz vektör araçları** (`dersler/e-araclar.js`):
  - **Tanecik penceresi:** Konu A'dakiyle aynı. 150 birim çaplı daire, içinde yarıçapı 9 birim açık mavi taneciler; yerinde titreşir (genlik / salınım: 10 °C 3 / 700 ms, 20 °C 5 / 600 ms, 60 °C 10 / 420 ms, 80 °C 13 / 350 ms). **Ek:** ısı almış tanecikte 3 birim kalın turuncu halka (yarıçap 13) belirir; halka tanecikle birlikte hareket eder.
  - **Tanecik şeridi (yeni):** aynı tanecik biçiminde yatay dikdörtgen pencere (köşe yuvarlaklığı 14), tek sıra tanecik, aralık 64 birim. "Isı dalgası": i. taneciğin genliği 5 → 13, salınımı 600 → 350 ms olur (400 ms, `out`), başlangıcı i × 420 ms; ısınan taneciğe turuncu halka eklenir. Tanecik yerinden ayrılmaz; yerinin işareti olarak soluk gri bir nokta (yarıçap 3) kalır.
  - **Tanecik kutusu:** 100 × 100 birim, 3 birim açık çizgi, içinde tanecik; "yoğunluk" yalnızca kutudaki tanecik sayısıyla gösterilir (soğuk hava 8 tanecik, sıcak hava 4 tanecik).
  - **Güneş:** turuncu disk. **Dünya:** koyu mavi disk, 3 birim açık mavi çizgi. **Dalga yayı:** turuncu, 4 birim kalın, yatay eksene göre ±28° açılı yay; kaynağın merkezinden büyür, saydamlık 0,9 → 0,2.
  - **Tencere:** 280 × 130 gövde (köşe 12, açık gri 3 birim çizgi), mavi yarı saydam su, sap 300 × 30; alev: turuncu damla 26 × 48. **El:** yuvarlatılmış kutu, içinde "el" (el çizilmez). **Mum:** 40 × 100 krem gövde, alev 24 × 54 turuncu damla. **Kamp ateşi:** üç gri odun çizgisi (6 birim) ve üç turuncu alev. **Kişi:** daire baş (yarıçap 20) ve 70 × 120 yuvarlatılmış gövde. **Araba:** 220 × 60 gövde, üstünde 120 × 40 kabin. **Bank:** 300 × 24 oturak, iki ayak 20 × 60 (metal: açık gri; tahta: kahverengi #a9784a).
  - **Termometre:** 26 birim genişliğinde düz cam boru, sarı sütun (Konu A'daki gibi).
  - **Isı oku:** turuncu, 7 birim kalın.
- Bu konuda hesap yoktur. Sütun boyları "örnek veri"dir (dersin başında yazılıdır); öğrenciye sayı gösterilmez.

## E1 · Isı neyin içinden geçer?

- **Fikir:** Isının geçtiği ortamın niteliği değişir: katı akışkan olmayan bir maddesel ortamdır, sıvı ve gaz akışkan maddesel ortamdır, boşluk maddesel olmayan bir ortamdır; ısı her birinde başka biçimde ilerler.
- **Giriş ekranı sorusu:** Güneş ile Dünya arasında hava yok; Güneş’ten gelen ısı neyin içinden geçiyor? (PLAN'daki "Güneş'in ısısı neyin içinden geliyor?" sorusu A1'deki "maddenin ısısı olmaz" kuralıyla tutarlı olsun diye bu biçimde yazıldı.)
- **Kaynak:** Ders kitabı s. 241 (tuğla ocak, metal kepçe), s. 242 (beş soru, tablo), s. 243 (iletimin tanım cümlesi, katı–sıvı–gaz tanecik uzaklığı), s. 244 (konveksiyon tanımı ve tanecik anlatımı; ışıma: maddesel ortam gerekmez, boşluk), s. 245 (hava tavana doğru yükselir), s. 247 (Kontrol Noktası: "maddesel ortam gereklidir / gerek yoktur"). Kitap soba odası, metal kaşık ve Güneş ile Dünya sorularına doğrudan cevap vermez; cevaplar tanımlardan çıkarılır. "Akışkan olmayan maddesel ortam" ayrımı program metninden gelir; kitap ortamı yalnızca "maddesel ortam gerekir / gerekmez" ve "sıvı veya gaz gibi akışkanlarda" diye ayırır.
- **Örnek veri:** Sahne 3'te termometre sütunları: başlangıçta tavan 18 °C, taban 18 °C (boy oranı 0,271); sonunda tavan 40 °C (0,429), taban 22 °C (0,300).
- **Sınır:** İletim, konveksiyon ve ışıma adları yoktur (E2). Isı iletim hızı, metal ile tahtanın farkı yoktur (F). Sürüklenme ve yayılma adları yoktur. Temas gerektirme niteliği yoktur. Isıl denge ve sıcaklık hesabı yoktur.
- **Güç kavram ve gösterimi:** Isıyı ilerleten şeyin ne olduğu: katıda tanecik yerinde kalır, titreşim ilerler; akışkanda sıcak tanecikler yer değiştirir ve enerjiyi beraberinde taşır; boşlukta tanecik yoktur, dalga ilerler. Sahne 5'te üç ortam yan yana: titreşen sıra, yükselip alçalan tanecikler, boşlukta ilerleyen yay.
- **Hedeflenen yanılgı:** Katıda ısı, sıcak tanecikler yürüyerek ilerler; ısının geçmesi için araya hep madde (hava) gerekir.
- **Akılda kalıcı cümle:** Isının yolunu, geçtiği ortam belirler.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Sıcak su ile soğuk su birbirine ısı veriyor. İki suyun sıcaklıkları eşitlenince ne olur? **Isı alışverişi biter** / Isı soğuktan sıcağa akmaya başlar / Isı alışverişi hızlanır. (D1) Yanlışta: "Sıcaklıklar eşitlenince ısı alışverişi biter."
2. Bir katının tanecikleri eskisinden daha hızlı titreşiyor. Bu katı için ne söylenir? **Sıcaklığı artmıştır** / Tanecik sayısı artmıştır / Isısı artmıştır. (A1) Yanlışta: "Daha hızlı hareket eden tanecik, daha yüksek sıcaklığı gösterir."

Tahta: birinci soruda iki termometre sütunu yan yana (sarı, 26 × 140 birim; x 380 ve 594, y 160–300; sol sütun 100 birim dolu, sağ sütun 40 birim dolu), altlarında "sıcak su", "soğuk su"; cevaptan sonra iki sütun 70 birimde buluşur (sol 100 → 70, sağ 40 → 70; 1.200 ms, `inOut`). İkinci soruda ortada tanecik penceresi (merkez 500, 281) ve içinde 6 tanecik; titreşim 20 °C'tan 60 °C'a geçer (genlik 5 → 10, salınım 600 → 420 ms; 600 ms, `inOut`) ve sütun yerine penceredeki titreşim görünür.

Sonra: "Bugün ısının hangi ortamın içinden geçtiğine bakacağız."

### Sahne 2 · Kaşığın içinden

Tahta: solda ocak üstünde tencere (x 70–250, y 190–300; içinde mavi su, altında iki alev x 130 ve 190, y 305–345). Tencerenin içinden metal kaşık: kepçe elipsi (merkez 135, 245; yarıçap 40 × 22), sap yatay çubuk (x 150–800, y 228–248, açık gri). Sapın ucunda el kutusu (x 800–900, y 200–280, "el"). Altta tanecik şeridi (x 100–900, y 330–470; 12 tanecik, aralık 64, ilk tanecik x 150, y 400); şeridin üst köşelerini sapın uçlarına iki ince (2 birim) çizgi bağlar: (150, 248) → (100, 330) ve (800, 248) → (900, 330); şeridin altında (500, 500) "kaşığın sapı, yakından". Yazı toplamı 6 kelime. Zamanlama: anlatım 1'de tencere ve kaşık belirir (400 ms, `out`); 2'de el kutusu belirir (300 ms, `out`); 3'te sap boyunca turuncu ısı oku çizilir (x 170 → 780, y 238; 1.200 ms, `linear`) ve 4'te söner (400 ms, `in`); 4'te şerit ve bağlantı çizgileri belirir (500 ms, `out`), tanecikler 20 °C titreşimiyle (genlik 5, salınım 600 ms) titreşir; 5'te ilk tanecik ısınır (ısı dalgası başlar); 6–7 sırasında dalga 11 taneciğin hepsine ilerler (11 × 420 = 4.620 ms); 8'de her taneciğin ilk yerinde soluk gri nokta belirir (300 ms, `out`); 9'da sapın üstünde (475, 205) "maddesel ortam" belirir (turkuaz, 300 ms, `out`).

Anlatım:
1. Ela çorbayı metal kaşıkla karıştırıyor.
2. Bir süre sonra kaşığın sapı da ısınıyor.
3. Isı, kaşığın içinden geçerek sapa ulaştı.
4. Katıda tanecikler, sıvı ve gazdakilerden birbirine daha yakındır.
5. Isı alan uçtaki tanecikler daha hızlı titreşmeye başlar.
6. Hızlanan tanecik komşularını etkiler; onlar da hızlanır.
7. Böylece titreşim, tanecikten taneciğe sapa kadar ilerler.
8. Tanecikler yerinde titreşir; yolculuk eden şey titreşimdir.
9. Isının içinden geçtiği madde, maddesel bir ortamdır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta temizlenir (`c.clearSay()`): yatay metal şiş (x 140–860, y 190–214, açık gri), sol ucunda alev (x 100–150, y 175–235, turuncu), sağ ucunda el kutusu (x 860–940, y 175–230). Soru: "Ela metal şişin bir ucunu ateşte tutuyor. Öteki uca ısı nasıl ulaşır?" **Titreşim, tanecikten komşu taneciğe geçer** / Sıcak tanecikler şişin ucuna doğru yürür / Isı şişin içinden değil, yalnızca havadan geçer. Dayandığı anlatım: 5–8. İpuçları: "Katıda tanecikler yerinde titreşir; ilerleyen şeyin ne olduğunu düşün." · "Hızlanan tanecik komşusunu hızlandırır; tanecikler yürümez."

Gör: şişin altında 7 taneciklik tanecik şeridi belirir (x 200–800, y 290–410, aralık 80; 500 ms, `out`); ısı dalgası soldan sağa ilerler (7 × 420 = 2.940 ms); tanecikler yerlerinde kalır.

Sonra:
10. Şişte de kaşıkta da ısı katının içinden geçti.

Defter (`Katı`): "Katıda ısı tanecikten taneciğe geçer. Örnek: metal kaşık."

### Sahne 3 · Soba yanan oda

Figür: `ODA`, `{ x: 40, y: 110, h: 380 }`. Başlangıç ayarları: `soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1`; kadraj `tum`. Sağ alan (x 580–960) çizimler içindir.

Tahta (figürün yanı): üst köşede kart (x 600–940, y 110–160): "akışkan: sıvı ve gaz" (4 kelime, "akışkan" mavi). Altında (y 190–290) iki tanecik kutusu: "soğuk hava" (x 600–700, 8 tanecik, 20 °C titreşimi) ve "sıcak hava" (x 760–860, 4 tanecik, 80 °C titreşimi, turuncu halkalı); etiketler kutuların altında (y 315). Daha altta (y 340–500) tanecik penceresi (merkez 710, 420; çap 150): 4 turuncu halkalı ve 4 halkasız tanecik. Zamanlama: anlatım 1'de `soba` 0 → 1 (anında); 2'de sobanın yanında turuncu yarı saydam elips (yarıçap 50 × 70, `nokta('soba')` merkezli) saydamlık 0 → 0,3 (500 ms, `out`); 3'te kart belirir (300 ms, `out`); 4–5'te iki kutu belirir (400 ms, `out`; 4'te "soğuk", 5'te "sıcak"); 6'da kutular 0,3 saydamlığa iner (300 ms, `in`), pencere belirir (400 ms, `out`) ve 1.600 ms içinde halkalı tanecikler pencerenin altından üstüne (90 birim yukarı), halkasızlar üstünden altına (90 birim aşağı) yer değiştirir (`inOut`); 7–8'de `f.yol('dongu')` okları çizilir: yükselen kol turuncu (1.200 ms, `linear`), inen kol mavi (1.200 ms, `linear`); 9'da oklar yerinde kalır.

Anlatım:
1. Eski köy evinde sobada odun yanıyor.
2. Sobanın yanındaki hava ısı alıyor.
3. Sıvılar ve gazlar akışkandır; tanecikleri yer değiştirebilir.
4. Isınan havada tanecikler hızlanır, aralarındaki mesafe artar.
5. Aynı kapta daha az tanecik kalır; yoğunluk azalır.
6. Yoğunluğu azalan sıcak tanecikler yukarı çıkar.
7. Yoğunluğu fazla olan soğuk tanecikler aşağı iner.
8. Yükselen sıcak tanecikler enerjiyi beraberinde taşır.
9. Sıcak hava tavana yükselirken yerini soğuk hava tabakasına bırakır.

Sor (`c.choice`, `tag: 'Sor'`): sağ alan temizlenir; figür ve oklar kalır, oklar 0,45 saydamlığa iner. Soru: "Soba uzun süre yandı. Tavandaki ve tabandaki termometreler için ne söylenir?" **Tavandaki daha yüksek gösterir** / Tabandaki daha yüksek gösterir / İkisi aynı gösterir. Dayandığı anlatım: 4–9. İpuçları: "Isınan havaya ne olduğunu düşün: yukarı mı çıkar, aşağı mı iner?" · "Sıcak hava yükselir, soğuk hava iner; tavana hangisi toplanır?"

Gör: `tavan` 18 → 40, `taban` 18 → 22 (3.000 ms, `out`, ikisi birlikte); oklar tam saydamlığa döner (400 ms, `out`).

Sonra:
10. Tavan sıcak, taban serin: termometreler farkı gösteriyor.
11. Sıcak hava enerjiyi tavana taşıdı; taban serin kaldı.
12. Sıvı ve gazlar, akışkan maddesel ortamdır.

Defter (`Sıvı ve gaz`): "Akışkanda ısıyı yer değiştiren sıcak tanecikler taşır. Örnek: soba odası."

### Sahne 4 · Güneş ile Dünya

Tahta: solda Güneş (merkez 140, 281; yarıçap 60; "Güneş" yazısı altında, y 365), sağda Dünya (merkez 860, 281; yarıçap 34; "Dünya" altında, y 345). Ortada (500, 250) "boşluk" (gri) ve iki gezegeni birleştiren gri kesikli çizgi (3 birim; x 205–822, y 281). Yazı toplamı 3 kelime (üste anlatım 9'da tanım satırı eklenir: "maddesel olmayan ortam", 3 kelime). Zamanlama: anlatım 1'de Güneş ve Dünya belirir (500 ms, `out`); 2'de "boşluk" ve kesikli çizgi belirir (400 ms, `out`); 4'te Güneş'in kenarından dalga yayları çıkar: her 400 ms'de yeni bir yay (toplam 4 yay), her biri yarıçap 70 → 690 (1.800 ms, `linear`), saydamlık 0,9 → 0,2; 5'te yaylar boşluktan ilerlemeye devam eder; 6'da Dünya'nın Güneş'e dönük yarısı turuncu 0 → 0,35 parlar (400 ms, `out`); 7'de parlama 0,35'te kalır.

Anlatım:
1. Güneş’ten gelen ısı Dünya’yı ısıtıyor.
2. Güneş ile Dünya arasında hava yok; orası boşluktur.
3. Orada ısıyı ilerletecek tanecik yok.
4. Sıcak cisimler, enerji taşıyan elektromanyetik dalgalar yayar.
5. Bu dalgalar boşlukta ışık hızıyla ilerler.
6. Dalga bir cisme çarpınca enerjisinin bir kısmını ya da tamamını aktarır.
7. Dünya bu enerjiyi alınca ısınır.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır, parlama söner. Soru: "Güneş ile Dünya arasındaki boşlukta ısı nasıl ilerler?" **Elektromanyetik dalgalarla** / Havanın taneciklerinin titreşimiyle / Yükselen sıcak havayla. Dayandığı anlatım: 2–6. İpuçları: "Orada hava yok; titreşecek ya da yer değiştirecek tanecik de yok." · "Güneş gibi sıcak cisimlerin yaydığı şeyi düşün."

Gör: kesikli çizgi üstünde 4 yay yeniden geçer (400 ms arayla, her biri 1.800 ms, `linear`); son yay Dünya'ya ulaşınca parlama 0 → 0,35 (400 ms, `out`).

Sonra:
8. Güneş’ten gelen ısı, boşluktan dalgalarla geçti.
9. Boşluk, maddesel olmayan bir ortamdır.

Defter (`Boşluk`): "Boşlukta ısı elektromanyetik dalgalarla geçer. Örnek: Güneş ile Dünya."

### Sahne 5 · Üç ortam yan yana

Tahta: üç sütun (merkezler x 190, 500, 810; her sütun 280 genişliğinde: x 50–330, 360–640, 670–950). Başlıklar y 80: "katı", "sıvı ve gaz", "boşluk". Resimler y 125–325 (260 × 200): (1) tanecik şeridi (x 60–320, y 195–255; 5 tanecik, aralık 50); (2) tanecik penceresi 260 × 200 dikdörtgen (6 tanecik: 3 turuncu halkalı, 3 halkasız); (3) solda küçük turuncu disk (merkez 100, 225; yarıçap 18), sağda küçük mavi disk (merkez 900, 225; yarıçap 12) arasında yaylar. Etiketler y 350–420: iki satırlı; sütun 1 "maddesel ortam" (turkuaz) ve "akışkan olmayan"; sütun 2 "maddesel ortam" (turkuaz) ve "akışkan" (mavi); sütun 3 "maddesel olmayan ortam" (gri). Yazı toplamı 15 kelime, öğe 9. Zamanlama: anlatım 1'de başlıklar ve resimler belirir (400 ms, `out`); 2'de şeritte ısı dalgası (5 × 420 = 2.100 ms); 3'te pencerede yer değiştirme (halkalılar 70 birim yukarı, halkasızlar 70 birim aşağı; 1.600 ms, `inOut`); 4'te yaylar solda çıkıp sağa ilerler (3 yay, 400 ms arayla, her biri 1.400 ms, `linear`); 5'te sütun 1 ve 2'nin "maddesel ortam" etiketleri belirir (300 ms, `out`); 6'da sütun 3'ün etiketi belirir (300 ms, `out`); 7'de sütun 1'in "akışkan olmayan" ve sütun 2'nin "akışkan" satırları belirir (300 ms, `out`).

Anlatım:
1. Üç durumda ısının geçtiği ortamları yan yana koyalım.
2. Katıda titreşim, tanecikten komşu taneciğe geçer.
3. Sıvı ve gazda sıcak tanecikler yükselirken enerjiyi taşır.
4. Boşlukta tanecik yoktur; enerji dalgalarla ilerler.
5. İlk ikisinde ısı maddenin içinden geçer; bunlar maddesel ortamdır.
6. Boşluk ise maddesel olmayan ortamdır.
7. Katı akışkan değildir; sıvı ve gaz akışkandır.
8. Katı, akışkan olmayan maddesel ortamdır.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır, etiketler 0,45 saydamlığa iner. Soru: "Katı ile sıvı ve gaz hangi bakımdan benzer, hangi bakımdan farklıdır?" **İkisi de maddesel ortamdır; yalnızca sıvı ve gaz akışkandır** / İkisi de akışkandır; yalnızca katı maddeseldir / Hiçbiri maddesel değildir; yalnızca boşluk akışkandır. Dayandığı anlatım: 5–8. İpuçları: "Isı ikisinde de maddenin içinden geçiyor; bu bir benzerlik." · "Tanecikleri yer değiştirebilen, yani akışkan olan hangisi?"

Gör: etiketler tam saydamlığa döner (300 ms, `out`); sütun 1 ile 2'nin "maddesel ortam" yazılarının altında turkuaz bir ortak çizgi (x 60–630, y 440; 3 birim) çizilir (700 ms, `linear`).

Sonra:
9. Isının yolunu, geçtiği ortam belirler.

Defter (`Ortam`): "Isının yolunu, geçtiği ortam belirler."

### Sahne 6 · Tencere ve tuğla ocak

Tahta: ortada ocak üstünde tencere (gövde x 220–500, y 200–330; su y 230–330; sap x 500–800, y 255–285; alev: üç damla x 290, 360, 430, y 335–390). Etiketler: "sap" (650, 240), "su" (360, 265). Çözülmüş örnekte sap turuncu 0,35 vurgulanır; birlikte çöz'de su vurgulanır.

Çözülmüş örnek (kart x 560–940, y 360–470: "Isı sapa hangi ortamdan ulaşır?" 6 kelime):
1. Ela ocağın üstüne su dolu bir tencere koyuyor.
2. Önce sapa bakalım; sap metaldir, yani katıdır.
3. Katıda ısı, tanecikten komşu taneciğe geçer.
4. Sapa ısı, akışkan olmayan maddesel ortamdan ulaşır.

Sap vurgusu anlatım 2'de belirir (300 ms, `out`); kartın cevabı anlatım 4'te "akışkan olmayan maddesel ortam" diye yazılır (turkuaz, 300 ms, `out`); kart 0,45'e iner.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "Su bir sıvıdır; sıvı akışkandır. Isı suyun içinde …… ortamdan geçer."; ilk cümle dolu gelir; su vurgusu belirir): "Isı suyun içinde hangi ortamdan geçer?" **Akışkan maddesel ortamdan** / Akışkan olmayan maddesel ortamdan / Maddesel olmayan ortamdan. Dayandığı anlatım: sahne 3, 3 ve 8–12; sahne 5, 3 ve 7. İpuçları: "Sıvıda tanecikler yer değiştirebilir; bu hangi niteliktir?" · "Su maddedir; ortam maddesel mi, değil mi?"

Sonra:
5. Suyun içinde ısıyı, yükselen sıcak tanecikler taşır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): ortada tuğla ocak (duvar x 360–640, y 200–308: 4 sütun × 3 sıra tuğla, her biri 70 × 36, açık gri çizgi; solda üç alev x 300–350, y 230–300; altında "tuğla ocak"). Soru: "Eski bir tuğla ocakta ateş yanıyor. Hangisinde ısı akışkan olmayan maddesel ortamdan geçer?" **Ocağın tuğla duvarında** / Ocaktaki tencerenin suyunda / Güneş ile Dünya arasında. Dayandığı anlatım: sahne 5, 5–8. İpuçları: "Tuğla katıdır; katı akışkan mıdır?" · "Akışkan olmayan, ama madde olan ortamı ara."

Gör: tuğla sütunları soldan sağa turuncu 0,45 dolar (her sütun 450 ms arayla, 400 ms, `out`).

Defter (`Üç ortam`): "Ortam katı, akışkan ya da boşluktur; ısı her birinde farklı ilerler."

### Sahne 7 · Dene: ortamı bul

Tahta: üç kutu (y 80–220; x 40–330, 355–645, 670–960): "Akışkan olmayan maddesel ortam", "Akışkan maddesel ortam", "Maddesel olmayan ortam" (11 kelime). Altta (y 300–420, x 150–850) sırayla gelen kart. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir.

Anlatım:
1. Şimdi altı durumda ısının geçtiği ortamı bulalım.
2. Her biri için üç ortamdan birini seç.

Kartlar (soru: "Isı hangi ortamın içinden geçiyor?"; kutudaki kısa ad parantezde):
1. "Kepçenin metal sapı" (kepçe sapı) → **Akışkan olmayan maddesel ortam**. Neden: "Evet. Metal katıdır; ısı tanecikten taneciğe geçer." İpucu: "Katı akışkan değildir; ama maddedir."
2. "Tencerenin içindeki su" (tencere suyu) → **Akışkan maddesel ortam**. Neden: "Evet. Sıvı akışkandır; sıcak tanecikler yükselir." İpucu: "Sıvıda tanecikler yer değiştirebilir."
3. "Güneş ile Dünya arasındaki boşluk" (boşluk) → **Maddesel olmayan ortam**. Neden: "Evet. Orada madde yoktur; ısı dalgalarla geçer." İpucu: "Hava bile yok; ortam madde mi?"
4. "Soba yanan odanın havası" (oda havası) → **Akışkan maddesel ortam**. Neden: "Evet. Gaz akışkandır; sıcak hava tavana yükselir." İpucu: "Hava bir gazdır; gaz akışkan mıdır?"
5. "Sıcak tuğla duvar" (tuğla duvar) → **Akışkan olmayan maddesel ortam**. Neden: "Evet. Tuğla katıdır; tanecikleri yerinde titreşir." İpucu: "Tuğlanın tanecikleri yer değiştirebilir mi?"
6. "Bir bardaktaki sıcak çay" (çay) → **Akışkan maddesel ortam**. Neden: "Evet. Çay sıvıdır; sıvı akışkandır." İpucu: "Sıvı, gaz gibi akışkanlardan biridir."

Sonra:
3. Isı her durumda bir ortamın içinden geçti.
4. Isının yolunu, geçtiği ortam belirler.

### Çıkış soruları

1. (yeni durum) Uzaydaki bir uydunun Güneş’e dönük yüzü ısınıyor. Isı Güneş ile uydu arasında hangi ortamdan geçer? **Maddesel olmayan ortamdan** / Akışkan maddesel ortamdan / Akışkan olmayan maddesel ortamdan. (sahne 4)
2. (yeni durum) Eski bir köy evinde ocakta odun yanıyor ve odanın havası ısınıyor. Isı odanın içinde hangi ortamdan geçer? **Akışkan maddesel ortamdan** / Akışkan olmayan maddesel ortamdan / Maddesel olmayan ortamdan. (sahne 3, 5)
3. (yanılgı) "Metal kaşığın sapına ısı, sıcak tanecikler yürüyerek ulaşır." Bu cümle için ne söylenir? **Yanlıştır; tanecikler yerinde titreşir, titreşim komşuya geçer** / Doğrudur; katıda tanecikler yer değiştirerek ilerler / Doğrudur; ısı katının içinden geçmez. (sahne 2)
4. (yanılgı) "Güneş ile Dünya arasında hava olmasaydı Güneş’ten ısı gelemezdi." Bu cümle için ne söylenir? **Yanlıştır; ısı maddesel ortam olmadan dalgalarla da geçer** / Doğrudur; ısı yalnızca madde içinden geçer / Doğrudur; ısı yalnızca sıvının içinden geçer. (sahne 4, 5)
5. Hangisinde ısı ilerlerken tanecikler yer değiştirir? **Sıcak havanın odanın tavanına yükselmesinde** / Metal kaşığın sapının ısınmasında / Güneş’ten gelen ısının Dünya’ya ulaşmasında. (sahne 3, 5)

## E2 · Üç yol, üç ad

- **Fikir:** Isının ilerleme biçimi benzeyen durumlar aynı grupta toplanınca üç ısı aktarım yolu çıkar (iletim, konveksiyon, ışıma); her gruba adı verilir, yeni durumlar bu adlarla sınıflanır, sera etkisi ışımayla ilişkilendirilir.
- **Giriş ekranı sorusu:** Havası boşaltılmış bir odada elektrikli ısıtıcı odayı ısıtır mı; kalorifer peteği ısıtır mı?
- **Kaynak:** Ders kitabı s. 243 (üç yolun adı ve tanımları, iletimin sıvı ve gazlarda "zor ama olabilir" cümlesi), s. 244 (konveksiyon; ışıma: kızılötesi, "0 kelvinin üzerindeki tüm maddeler", Güneş'ten üç tür ışın, "koyu renkli nesneler daha fazla soğurur", kamp ateşi; Örnek 1 sorusu), s. 245 (Örnek 1 çözümü: petek zemine yakın konur; Örnek 2: mum alevi), s. 246 (sera etkisi alıntısı ve Güneş–Dünya şeması), s. 247 (Kontrol Noktası: üç tanım, "maddesel ortam gereklidir / gerek yoktur"). Kitap pencere, bank, havası boşaltılmış oda, siyah ve beyaz araç sorularına cevap vermez; cevaplar kitabın tanımlarından ve verdiği örneklerden çıkarılır (ayrıntı rapordadır).
- **Örnek veri:** Termometre sütunları, tahtada sayı yazılmaz; boy oranı `(°C + 20) / 140`. Sahne 4: tavan 18 → 32 °C (0,271 → 0,371), taban 18 → 26 °C (0,271 → 0,329). Sahne 5: üstteki el 20 → 40 °C (0,286 → 0,429), yandaki el 20 → 30 °C (0,286 → 0,357). Sahne 7: koyu araç 20 → 46 °C (0,286 → 0,471), açık araç 20 → 32 °C (0,286 → 0,371). Sahne 8: ısıtıcının karşısındaki el 20 → 34 °C (0,286 → 0,386); odanın tavan ve taban termometreleri 18 °C'ta sabit. Sahne 9: tavan 32 °C (0,371), taban 26 °C (0,329).
- **Sınır:** Isı iletim hızı, metal ile tahtanın farkının nedeni ve iletken–yalıtkan Konu F'dedir. Gazların adları, sayılar ve küresel ısınmanın nedenleri sera sahnesinde yoktur (karar 10). Işımada niceliksel bağıntı, siyah cisim, yansıtma oranı yoktur. Peteğin ışıma yapıp yapmadığı sorulmaz. Kavram haritası çizdirilmez.
- **Güç kavram ve gösterimi:** Sera etkisi: Güneş’ten gelen ışıma atmosferden kesintisiz geçer; yeryüzünden geri dönen ışımanın bir kısmı atmosferde tutulur. Sahne 11'de tek şemada iki ok: gelen ok atmosferi delip geçer, dönen ok atmosferin altında ikiye ayrılır (bir kısmı uzaya gider, bir kısmı bükülüp yeryüzüne döner).
- **Hedeflenen yanılgı:** Havasız ortamda hiçbir ısıtıcı ısıtamaz; petek yukarı konmalıdır çünkü sıcak hava yükselir; ısı yalnızca madde içinde yayılır.
- **Akılda kalıcı cümle:** Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Isının hangi ortamda ilerlemesi için madde gerekmez? **Boşlukta** / Katıda / Sıvıda. (E1) Yanlışta: "Boşlukta tanecik yoktur; ısı dalgalarla ilerler."
2. Sıcak oda havası ile soğuk dış hava birbirine değiyor. Isı hangi yönde aktarılır? **Odadan dışarıya** / Dışarıdan odaya / Hiçbir yöne. (A1) Yanlışta: "Isı, sıcaklığı yüksek olandan düşük olana aktarılır."

Tahta: birinci soruda üç kutu yan yana (x 80, 380, 680; 240 × 120; y 220–340): "katı", "sıvı", "boşluk" (boşluk gri çizgili). İkinci soruda iki kutu birbirine bitişik (sol x 200–490 "oda · sıcak hava", turuncu halkalı 6 tanecik; sağ x 490–780 "dışarı · soğuk hava", 6 halkasız tanecik; y 200–360); cevaptan sonra sıcak kutudan soğuk kutuya turuncu ısı oku (x 420 → 560, y 280; 500 ms, `out`).

Sonra: "Bugün ısı aktarım yollarına ad vereceğiz."

### Sahne 2 · Benzerlere göre gruplayalım

Tahta: üstte beş durum kartı (y 90–150; 170 × 60; x 31, 223, 415, 607, 799): "metal kaşık", "tuğla ocak", "soba odasının havası", "tencerenin suyu", "Güneş ile Dünya". Altta üç grup kutusu (y 230–470; x 40–330, 355–645, 670–960): "titreşim komşuya geçer", "tanecikler yer değiştirir", "dalgalar boşluktan geçer" (başlıklar kutuların üst kenarında, y 255). Yazı toplamı 21 kelime. Zamanlama: anlatım 1'de kartlar belirir (400 ms, `out`); 2'de kutular belirir (400 ms, `out`); 4'te "metal kaşık" kartı bırakılır; 5'te kart birinci kutuya taşınır (kart merkezi x 116, y 120 → kutu merkezi x 185, y 360; 700 ms, `inOut`).

Anlatım:
1. Önceki derste ısının geçtiği beş duruma baktık.
2. Şimdi bunları benzer niteliklerine göre gruplayacağız.
3. Aynı biçimde ilerleyen ısılar aynı grupta toplanır.
4. Metal kaşıkta ısı, titreşimle tanecikten taneciğe ilerliyordu.
5. O hâlde metal kaşık, birinci gruba girer.

Birlikte çöz (`KIT.sinifla`, `tag: 'Birlikte çöz'`; "metal kaşık" birinci kutuda yerleşmiş gelir; dört kart sırayla): "Bu durum hangi gruba girer?"
- "tuğla ocak" → **titreşim komşuya geçer**. Neden: "Evet. Tuğla katıdır; titreşim tanecikten taneciğe geçer." İpucu: "Tuğla da metal kaşık gibi katıdır."
- "soba odasının havası" → **tanecikler yer değiştirir**. Neden: "Evet. Sıcak hava yükselir, soğuk hava iner." İpucu: "Hava akışkandır; tanecikleri yer değiştirir."
- "tencerenin suyu" → **tanecikler yer değiştirir**. Neden: "Evet. Sıcak su yükselir, soğuk su iner." İpucu: "Su da akışkandır."
- "Güneş ile Dünya" → **dalgalar boşluktan geçer**. Neden: "Evet. Aradaki boşlukta ısı dalgalarla geçer." İpucu: "Orada hava yok; ısı neyle geçer?"

Dayandığı anlatım: bu sahne 3–5; E1 sahne 2–5.

Sonra (üç kutu 0,45'e iner, kartlar kutularda kalır):
6. Benzer niteliği olan durumlar aynı grupta toplandı.
7. Her grup, bir ısı aktarım yoludur.
8. Şimdi üç yola birer ad verelim.

### Sahne 3 · Üç yol, üç ad

Tahta: üst kutu (x 380–620, y 70–120): "Isı aktarım yolları". Ondan üç dal çizgisi (2 birim, açık) üç ad kutusuna iner (y 190–250; x 60–320, 370–630, 680–940): "iletim", "konveksiyon", "ışıma" (başlangıçta boş kutular). Kutuların altında (y 270–310) açıklayıcı etiketler: "tanecikten taneciğe", "yer değiştiren tanecikler", "elektromanyetik dalgalar". Altta iki çubuk (y 390–440): "maddesel ortam gerekir" (x 60–630; sütun 1 ve 2'ye bağlı), "maddesel ortam gerekmez" (x 680–940; sütun 3'e bağlı; gri). Yazı toplamı 19 kelime, öğe 9. Kutular E2 sahne 2'deki grupların renklerini taşır (iletim: kutu çizgisi açık, konveksiyon: mavi, ışıma: turuncu). Zamanlama: anlatım 1'de üst kutu belirir (300 ms, `out`); 2'de dal ve "iletim" kutusu (dal 400 ms, `linear`; kutu ve etiket 300 ms, `out`); 4'te konveksiyon; 5'te ışıma; 6'da birinci çubuk, 7'de ikinci çubuk (çubuklar soldan sağa 500 ms, `linear` çizilir); 8'de üç ad kutusu aynı anda turuncu halkayla 0,6 → 0 parlar (500 ms, `out`).

Anlatım:
1. Üç gruptan üç ısı aktarım yolu çıktı.
2. Isının tanecikten taneciğe aktarılarak yayılmasına iletim denir.
3. Sıvı ve gazda tanecikler uzaktır; iletim zordur ama olabilir.
4. Akışkanda taneciklerin yer değiştirmesiyle ısının yayılmasına konveksiyon denir.
5. Isının elektromanyetik dalgalarla yayılmasına ışıma denir.
6. İletim ve konveksiyonda maddesel ortam gerekir.
7. Işımada maddesel ortama gerek yoktur.
8. Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): ortada su dolu kap (150 × 170; x 425–575) ve altında alev; kabın içinde kısa turuncu ok yukarı, kısa mavi ok aşağı (döngü, 6 birim kalın). Soru: "Kaptaki suyun ısınması, yer değiştiren sıcak ve soğuk tanecikler sayesinde oluyor. Bu yolun adı nedir?" **Konveksiyon** / İletim / Işıma. Dayandığı anlatım: 4. İpuçları: "Tanecikler yer değiştiriyor; hangi tanımda böyle deniyor?" · "Işımada tanecik yoktur, dalga vardır; iletimde tanecik yerinde titreşir."

Gör: oklar bir kez döner (turuncu kol 1.200 ms, mavi kol 1.200 ms, `linear`); kabın üstünde (500, 130) "konveksiyon" belirir (açık yazı, 300 ms, `out`).

Defter (`Üç yol`): "Isı üç yolla aktarılır: iletim, konveksiyon, ışıma."

### Sahne 4 · Petek neden aşağıda?

Figür: `ODA`, `{ x: 40, y: 110, h: 380 }`. Başlangıç: `soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1`; kadraj `tum`.

Tahta (figürün yanı, x 580–960): sahne 6'ya kadar boş. Zamanlama: anlatım 1'de `petek` 0 → 1 ve `petek` noktasının sağında "petek" etiketi (300 ms, `out`); 2'de petekten turuncu yarı saydam elips (yarıçap 40 × 60) saydamlık 0 → 0,3 (500 ms, `out`); 3'te `f.yol('petekDongu')` okları çizilir: yükselen kol turuncu (1.200 ms, `linear`), inen kol mavi (1.200 ms, `linear`); 4'te `tavan` 18 → 32, `taban` 18 → 26 (3.000 ms, `out`); 5'te "konveksiyon" yazısı oda üstünde (x 290, y 95) belirir (300 ms, `out`); 6'da sağ alanda ikinci küçük kesit oda: kutu 240 × 190 (x 640–880, y 140–330), sol duvarda tavana yakın petek (turuncu 28 × 60; x 648, y 150–210), üst yarıda (y 140–235) kısa turuncu döngü (daire yarıçap 40), alt yarı (y 235–330) mavi 0,25 dolar (500 ms, `out`); figürün okları 0,45'e iner; kutunun altında (760, 360) "tavana yakın petek"; 7'de kutunun alt yarısına gri "ısınmaz" yazısı (gri, 300 ms, `out`).

Anlatım:
1. Kalorifer peteği odanın zeminine yakın bir yere konur.
2. Peteğe değen havanın sıcaklığı artar, yoğunluğu azalır.
3. Sıcak hava tavana doğru yükselirken yerini soğuk havaya bırakır.
4. Petek çalıştığı sürece bu hareket sürer ve oda ısınır.
5. Bu hareket konveksiyondur; ısı havayı oluşturan taneciklerle yayılır.
6. Petek tavana yakın olsaydı, yalnızca üst hava dolaşırdı.
7. Zemindeki hava ısınmazdı; bu yüzden petek zemine yakın konur.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): ortada su ısıtıcısı kesiti (kap 200 × 240, x 400–600, y 150–390; su y 190–390 mavi 0,4; tabanda turuncu zikzak ısıtıcı tel, x 430–570, y 360–375, 6 birim). Soru: "Bir su ısıtıcısında ısıtıcı tel neden tabana yerleştirilir?" **Alttaki ısınan su yükselir, yerine soğuk su gelir; suyun tamamı ısınır** / Isınan su aşağı çöker; üstteki su hiç ısınmaz / Tel üstte olsaydı su hiç ısınmazdı; ısı yalnızca aşağıya geçer. Dayandığı anlatım: 2–7. İpuçları: "Peteğin neden aşağıda olduğunu düşün: ısınan akışkan nereye gider?" · "Sıcak akışkan yükselir, soğuk akışkan iner."

Gör: kabın solunda turuncu ok yukarı (x 450, y 350 → 200; 1.200 ms, `linear`), sağında mavi ok aşağı (x 550, y 200 → 350; 1.200 ms, `linear`); su 0,4'ten 0,6'ya turuncuya yakın bir tonla ısınır (1.500 ms, `inOut`).

Sonra:
8. Su ısıtıcısında da aynı hareket suyun tamamını ısıtır.

Defter (`Konveksiyon`): "Sıcak akışkan yükselir, soğuk iner. Örnek: zemine yakın petek."

### Sahne 5 · Mum alevine üstten ve yandan

Tahta: ortada mum (gövde x 480–520, y 380–480; alev merkezi 500, 355; 24 × 54). Üstte el kutusu (x 440–560, y 140–200; "el"), altında/yanında "üstten" (500, 120). Sağda ikinci el kutusu (x 625–745, y 330–390; "el"), üstünde "yandan" (685, 310). Her elin yanında termometre: üst el için x 585, y 130–230; yan el için x 765, y 320–420. İki el alevden eşit uzaklıktadır: üstteki elin merkezi alev merkezinin 185 birim üstünde, yandakinin merkezi 185 birim sağındadır. Yazı toplamı 4 kelime. Zamanlama: anlatım 1'de mum ve eller belirir (500 ms, `out`); 2–3'te alevden üst ele üç turuncu ok yükselir (x 480, 500, 520; y 320 → 215; her biri 1.000 ms, `linear`, 300 ms arayla); 4–5'te alev merkezli üç turuncu halka yayılır (yarıçap 40 → 200; her biri 900 ms, `linear`, 300 ms arayla, saydamlık 0,7 → 0,1); 6'da üst elin yanında "konveksiyon + ışıma" (turuncu, 3 kelime), 7'de yan elin yanında "ışıma" belirir (300 ms, `out`).

Anlatım:
1. Ela, güvenli uzaklıkta, elini mum alevine üstten ve yandan yaklaştırıyor.
2. Alevin çevresindeki hava ısınır ve yukarı çıkar.
3. Üstteki el, yükselen sıcak havayla konveksiyon yoluyla ısınır.
4. Alev ayrıca her yöne elektromanyetik dalgalar yayar.
5. Dalgalar iki ele de ulaşır; bu ısı aktarım yolu ışımadır.
6. Üstteki el hem konveksiyonla hem ışımayla ısınır.
7. Yandaki el çoğunlukla ışımayla ısınır.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır. Soru: "Hangi el daha fazla sıcaklık hisseder, neden?" **Üstteki; hem konveksiyonla hem ışımayla ısınır** / Yandaki; yalnızca konveksiyonla ısınır / İkisi eşit; ikisi de yalnızca ışımayla ısınır. Dayandığı anlatım: 2–7. İpuçları: "Yükselen sıcak hava hangi ele ulaşır?" · "Dalgalar iki ele de gelir; ek olarak hangi elde bir yol daha var?"

Gör: iki termometre birlikte yükselir: üstteki 20 → 40 °C, yandaki 20 → 30 °C (3.000 ms, `out`).

Sonra:
8. Bu yüzden üstten yaklaşınca daha fazla sıcaklık hissedilir.

Defter (`Mum alevi`): "Üstteki el konveksiyon ve ışımayla, yandaki çoğunlukla ışımayla ısınır."

### Sahne 6 · Kamp ateşi

Tahta: solda kamp ateşi (üç gri odun çizgisi, 6 birim; üç turuncu alev; merkez 200, 400; "kamp ateşi" altında, y 470), sağda oturan kişi (baş merkezi 640, 270, yarıçap 20; gövde x 605–675, y 295–415; ateşe bakan yüzey gövdenin sol kenarıdır; "Ela" yazısı altında, y 450). Yazı toplamı 3 kelime. Zamanlama: anlatım 1'de ateş ve kişi belirir (500 ms, `out`); 2'de ateşin merkezinden Ela'ya doğru 3 turuncu yay (yarıçap 60 → 400; her biri 1.400 ms, `linear`; 400 ms arayla); 3'te gövdenin sol yarısı turuncu 0 → 0,5 parlar (500 ms, `out`); 4'te sağ yarısının üstüne gri kesikli çizgi ve gri "dalga yok" belirir (300 ms, `out`); 5'te parlama sol yarıdan sağ yarıya yayılır: sağ yarı 0 → 0,3, sol yarı 0,5 → 0,4 (1.500 ms, `inOut`); 6'da "ışıma" yazısı ateş ile Ela arasında (420, 340) belirir (turuncu, 300 ms, `out`).

Anlatım:
1. Ela kamp ateşinin yanında oturuyor.
2. Ateşin yaydığı elektromanyetik dalgalar Ela’ya ulaşıyor.
3. Dalgalar, Ela’nın ateşe dönük yüzeyi tarafından soğuruluyor.
4. Ateşe dönük yüzü ısınıyor; arka yüzüne dalga çarpmıyor.
5. Sonra ısı vücudun içinde yayılıyor ve tüm vücut ısınıyor.
6. Kamp ateşinin ısıtması ışıma yoluyla gerçekleşiyor.
7. Sıcaklığı 0 kelvinin üzerindeki her madde kızılötesi ışınlar yayar.
8. Kızılötesi, elektromanyetik dalgaların bir türüdür.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): kişi sağa bakıp ateşe sırtını döner (kişi gövdesi yatay çevrilir; 500 ms, `inOut`); parlama söner. Soru: "Ela ateşe sırtını dönüp oturuyor. Hangi yüzeyi doğrudan ısınır?" **Sırtı; ateşe dönük olan yüzeyi** / Yüzü; dalgalar yalnızca yüze çarpar / İkisi de aynı ölçüde. Dayandığı anlatım: 3–4. İpuçları: "Dalga hangi yüzeye çarparsa o yüzey ısınır." · "Ateşe dönük olan yüzü bul."

Gör: yaylar yeniden geçer (3 yay, 1.400 ms, `linear`); ateşe dönük sırt kenarı turuncu 0 → 0,5 parlar (500 ms, `out`), öbür yüz parlamaz.

Defter (`Işıma`): "Işıma: ısı elektromanyetik dalgalarla yayılır. Örnek: kamp ateşi."

### Sahne 7 · Koyu renk, açık renk

Tahta: solda koyu renkli araba (gövde x 120–340, y 330–390; kabin x 165–285, y 290–330; koyu gri #2a2a2a dolgu, 3 birim açık çizgi), sağda açık renkli araba (x 660–880; açık gri #e6e6e6 dolgu). Üstte, her arabanın üzerinde 4 turuncu ok (aralık 40; y 150 → 280 aşağı). Üst orta (500, 110) "Güneş’ten gelen ışınlar". Termometreler: koyu araç için x 370, y 280–400; açık araç için x 910, y 280–400. Altlarda "koyu renkli araç" (230, 440), "açık renkli araç" (770, 440). Yazı toplamı 9 kelime. Zamanlama: anlatım 1'de arabalar belirir (500 ms, `out`); 3'te oklar iner (her araba 4 ok; 1.200 ms, `linear`); 4'te her arabanın çatısında turuncu parlama belirir: koyu araçta 0 → 0,8, açık araçta 0 → 0,35 (500 ms, `out`); 5'te iki parlama yerinde kalır; 6'da termometre sütunları sabit.

Anlatım:
1. Ela güneşte aynı süre kalan iki arabayı karşılaştırıyor.
2. Biri koyu renkli, öteki açık renkli.
3. Güneş’ten kızılötesi, görünür ışık ve morötesi ışınlar yayılır.
4. Bu ışınlar soğurulunca maddeye enerji aktarır.
5. Koyu renkli nesneler, açık renkli nesnelere göre bu ışınları daha fazla soğurur.
6. Daha fazla enerji soğuran nesnenin sıcaklığı daha çok artar.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır. Soru: "Güneşte aynı süre kalan koyu ve açık renkli araçtan hangisinin sıcaklığı daha çok artar?" **Koyu renkli; ışınları daha fazla soğurur** / Açık renkli; ışınları daha fazla soğurur / İkisi eşit artar. Dayandığı anlatım: 3–6. İpuçları: "Daha çok enerji soğuran, daha çok ısınır." · "Hangi renk ışınları daha fazla soğuruyor?"

Gör: koyu araç termometresi 20 → 46 °C, açık araç termometresi 20 → 32 °C (3.000 ms, `out`).

Defter (`Renk`): "Koyu renkli nesneler ışımayı daha fazla soğurur. Örnek: siyah araba."

### Sahne 8 · Havası boşaltılmış oda

Figür: `ODA`, `{ x: 40, y: 110, h: 380 }`. Başlangıç: `soba: 0, petek: 0, isitici: 0, pencere: 0, tavan: 18, taban: 18, hava: 1`; kadraj `tum`. Anlatım 1'de `hava` 0'a inerken `termometre` 1 → 0 olur (tavan ve taban termometreleri söner: havasız odada hava sıcaklığı okunmaz).

Tahta (figürün yanı): `nokta('el')` konumunda el kutusu (100 × 60, "el") ve yanında sarı termometre (26 × 100). Sağ alanda (x 600–940) kart. Zamanlama: anlatım 1'de `hava` 1 → 0 (1.200 ms, `inOut`; figür tonu değişir); 3'te `isitici` 0 → 1 (anında); 4–5'te `f.yol('isima')` boyunca üç turuncu dalga çizgisi ilerler (her biri 1.400 ms, `linear`, 500 ms arayla); 6'da el kutusu turuncu 0 → 0,35 parlar (400 ms, `out`); 7'de el termometresi 20 → 34 °C (2.000 ms, `out`).

Çözülmüş örnek (kart x 600–940, y 120–200: "Elektrikli ısıtıcı odayı ısıtır mı?" 5 kelime):
1. Önce odadaki havayı boşaltalım.
2. Odada ısıyı ilerletecek hiç hava kalmadı.
3. Şimdi elektrikli ısıtıcıyı çalıştıralım.
4. Sıcak ısıtıcı, elektromanyetik dalgalar yayar.
5. Işımanın ilerlemesi için maddesel ortam gerekmez.
6. Dalgalar elin yüzeyine çarpar ve enerjisini aktarır.
7. Eli ısınıyor; ısıtıcı, havasız odada ışımayla ısıtır.

Kartın cevabı anlatım 7'de "Isıtır; ışıma." diye yazılır (açık yazı, 300 ms, `out`). Kart 0,45'e iner.

Birlikte çöz (`tag: 'Birlikte çöz'`; `isitici` 1 → 0, `petek` 0 → 1; kart: "Petek odayı konveksiyonla ısıtır. Konveksiyon için akışkan gerekir." iki cümle dolu gelir): "Havası boşaltılmış odada petek odayı konveksiyonla ısıtabilir mi?" **Isıtamaz; hava yoktur, konveksiyon oluşmaz** / Isıtır; konveksiyon boşlukta da oluşur / Isıtır; konveksiyon için akışkan gerekmez. Dayandığı anlatım: sahne 3, 4 ve 6; sahne 4, 1–5. İpuçları: "Konveksiyonda tanecikler yer değiştirir; odada yer değiştirecek tanecik var mı?" · "Odanın havasının boşaltıldığını hatırla."

Gör: `f.yol('petekDongu')` gri kesikli (3 birim) çizilir (800 ms, `linear`) ve yolun ortasında gri çarpı (24 birim) belirir (300 ms, `out`). El kutusu ve termometresi, ısıtıcı kapatılırken (birlikte çöz başında) söner (300 ms, `in`): peteğin eli ısıtıp ısıtmadığı gösterilmez ve söylenmez (peteğin ışıması bu dersin dışındadır).

Sonra:
8. Petek havayı dolaştıramaz; ısıtıcı ise ışımayla ısıtır.

Defter (`Havasız oda`): "Havasız odada ışıma olur, konveksiyon olmaz. Örnek: elektrikli ısıtıcı."

### Sahne 9 · Pencere açılınca

Figür: `ODA`, `{ x: 40, y: 110, h: 380 }`. Başlangıç: `soba: 0, petek: 1, isitici: 0, pencere: 0, tavan: 32, taban: 26, hava: 1`; kadraj `pencere`. Dışarısı pencerenin bulunduğu duvarın öbür yanıdır: `pencere.ust` ile `pencere.alt` noktalarının dış tarafında 80 birim genişliğinde mavi yarı saydam alan (0,18) ve "dışarı" yazısı (mavi, 22 birim) belirir.

Zamanlama: anlatım 1'de dış alan ve yazı belirir (400 ms, `out`), `pencere` 0 → 1 (1.200 ms, `inOut`); 2'de `pencere.ust` noktasında küçük turuncu yukarı ok (40 birim; 400 ms, `out`); 3'te `pencere.alt` noktasında küçük mavi aşağı ok (40 birim; 400 ms, `out`); Gör'de `f.yol('pencereUst')` turuncu ok (içeriden dışarıya; 1.600 ms, `linear`) ve `f.yol('pencereAlt')` mavi ok (dışarıdan içeriye; 1.600 ms, `linear`); iki ok birlikte çizilir.

Anlatım:
1. Dışarısı soğuk, içerisi sıcak; Ela pencereyi açıyor.
2. Sıcak hava yoğunluğu az olduğu için yukarı çıkar.
3. Soğuk hava yoğunluğu fazla olduğu için aşağı iner.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır, küçük oklar kalkar. Soru: "Pencere açılınca sıcak ve soğuk hava nasıl hareket eder?" **Üstten sıcak hava çıkar, alttan soğuk hava girer** / Üstten soğuk hava girer, alttan sıcak hava çıkar / Hava hareket etmez; ısı yalnızca camdan iletimle geçer. Dayandığı anlatım: 2–3; sahne 4, 3–4. İpuçları: "Sıcak hava yükselir; pencerenin hangi yarısından çıkar?" · "Soğuk hava iner; hangi yarıdan içeri girer?"

Gör: iki ok çizilir (yukarıda belirtilen yollar).

Sonra:
4. Pencerenin üst yarısından sıcak hava dışarı çıkar.
5. Alt yarısından soğuk hava içeri girer.
6. Bu hava hareketi de konveksiyondur.

Defter (`Pencere`): "Sıcak hava üstten çıkar, soğuk hava alttan girer: konveksiyon."

### Sahne 10 · Metal ve tahta bank

Tahta: solda metal bank (oturak x 100–400, y 360–384 açık gri; ayaklar x 120 ve 360, 20 × 60), sağda tahta bank (oturak x 600–900, y 360–384 kahverengi; ayaklar x 620 ve 860). Her bankın üstünde oturan kişi (baş yarıçap 20 + gövde 70 × 120; gövde y 240–360). Bankların altında "metal bank" (250, 470), "tahta bank" (750, 470). Yazı toplamı 4 kelime. Zamanlama: anlatım 1'de metal bank ve kişi (400 ms, `out`); 2'de tahta bank ve kişi (400 ms, `out`); 3'te iki kişiden banka birer turuncu ok (kalınlık 7, eşit; y 360 → 400, 500 ms, `out`).

Anlatım:
1. Soğuk bir günde Ela metal bir banka oturuyor.
2. Arkadaşı da tahta bir banka oturuyor.
3. İkisinin vücut ısısı da banka geçiyor.
4. Bank katıdır; ısı bankın içinde tanecikten taneciğe ilerler.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynen kalır. Soru: "Kişiden banka ısı hangi yolla aktarılır?" **İletim** / Konveksiyon / Işıma. Dayandığı anlatım: 3–4; sahne 3, 2. İpuçları: "Bank katıdır; katıda ısı nasıl ilerler?" · "Tanecikler yerinde titreşiyor; yer değiştirmiyor."

Gör: banklarda ayak hizasına kadar iki soluk turuncu şerit (x 100–400 ve 600–900, y 384–400; 0 → 0,5; 700 ms, `out`).

Sonra:
5. Hem metal hem tahta bankta ısı iletimle geçer.
6. Hangi bankın daha çok üşüttüğünü sonraki derste inceleyeceğiz.

Defter (`Bank`): "Katı bankta ısı iletimle geçer. Örnek: metal bank, tahta bank."

### Sahne 11 · Sera etkisi

Tahta: sol üstte Güneş (merkez 110, 100; yarıçap 46). Ortada atmosfer şeridi (x 40–960, y 230–300; açık mavi 0,22 dolgu, 2 birim açık mavi kenar; sağ içinde "atmosfer", 880, 265). Altta yeryüzü şeridi (x 40–960, y 430–500; koyu mavi-gri 0,6 dolgu; sağ içinde "yeryüzü", 880, 465). Ok 1 (Güneş’ten gelen ışıma): (165, 130) → (430, 425), turuncu 7 birim, atmosfer şeridinden kesintisiz geçer; etiketi "Güneş’ten gelen ışıma" (250, 175). Ok 2 (yeryüzünün ışıması): (620, 425) → (620, 305), turuncu 0,75; atmosferin alt kenarında (620, 300) ikiye ayrılır: kol A düz yukarı (620, 300) → (620, 200), kısa ve 0,5 saydam; kol B atmosferden dönen eğri (640, 300) → (760, 420), 0,75. Etiketler: "yeryüzünün ışıması" (330, 360, sağa yaslı), "tutulan kısım" (800, 360). Yazı toplamı 13 kelime, öğe 11. Zamanlama: anlatım 1'de ok 1 çizilir (1.400 ms, `linear`); 2'de yeryüzü şeridinin dolgusu 0,6 → 0,8 turuncuya yakın ısınır (700 ms, `out`); 3–4'te ok 2 çizilir (yukarı kol 900 ms, `linear`); 4'te kol A (600 ms, `linear`) ve ardından kol B (900 ms, `linear`) çizilir; 5'te kol B'nin ucu yeryüzüne ulaşınca yeryüzü şeridi 0,8 → 0,9 (900 ms, `inOut`); 6'da iki kol arasına "sera etkisi" yazısı (880, 365) belirir (açık, 300 ms, `out`).

Anlatım:
1. Güneş’ten gelen ışıma atmosferden geçerek yeryüzüne ulaşır.
2. Yeryüzü bu enerjiyi alır ve ısınır.
3. Her madde gibi yeryüzü de ışıma yapar.
4. Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar.
5. Tutulan enerji, bir sera gibi atmosferde kalır.
6. Buna sera etkisi denir.
7. Bu etki olmasaydı yeryüzü çok daha soğuk olurdu.
8. Boşlukta yalnızca ışıma enerji getirir; iletim ve konveksiyon olmaz.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta aynen kalır, yazılar 0,45'e iner. Soru: "Sera etkisi hangi ısı aktarım yoluyla ilişkilidir?" **Işıma; enerji dalgalarla gelir ve atmosferde tutulur** / İletim; enerji tanecikten taneciğe geçer / Konveksiyon; enerji yükselen havayla taşınır. Dayandığı anlatım: 1–6, 8; sahne 3. İpuçları: "Güneş ile yeryüzü arasında ısı neyle geçiyor?" · "Atmosferin tuttuğu şey bir dalga mı, tanecik mi?"

Gör: ok 1 ve ok 2'nin üstünde "ışıma" yazısı belirir (turuncu, 300 ms, `out`); iki ok turuncu halkayla 0,6 → 0 parlar (500 ms, `out`).

Sonra:
9. Sera etkisi, ışımayla gelen enerjinin atmosferde tutulmasıyla ilgilidir.

Defter (`Sera etkisi`): "Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar: sera etkisi."

### Sahne 12 · Dene: yolu adlandır

Tahta: üç kutu (y 80–220; x 40–330, 355–645, 670–960): "iletim", "konveksiyon", "ışıma". Altta (y 300–420, x 150–850) sırayla gelen kart. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir.

Anlatım:
1. Şimdi sekiz durumda ısı aktarım yolunu adlandıralım.
2. Her biri için üç yoldan birini seç.

Kartlar (soru: "Bu durumda ısı hangi yolla aktarılıyor?"; kutudaki kısa ad parantezde):
1. "Metal kaşığın sapının ısınması" (kaşık) → **İletim**. Neden: "Evet. Katıda ısı tanecikten taneciğe geçer." İpucu: "Kaşık katıdır; tanecikler yerinde titreşir."
2. "Pencere açılınca sıcak havanın üstten çıkması" (pencere) → **Konveksiyon**. Neden: "Evet. Hava akışkandır; sıcak hava yer değiştirir." İpucu: "Hava yer değiştiriyor; hangi yolda böyle?"
3. "Güneş’in Dünya’yı ısıtması" (Güneş) → **Işıma**. Neden: "Evet. Enerji boşlukta dalgalarla gelir." İpucu: "Arada madde yok; ısı neyle geçer?"
4. "Tencerenin içindeki suyun ısınması" (tencere suyu) → **Konveksiyon**. Neden: "Evet. Sıcak su yükselir, soğuk su iner." İpucu: "Su akışkandır; tanecikleri yer değiştirir."
5. "Kamp ateşinin yanındaki kişinin ısınması" (kamp ateşi) → **Işıma**. Neden: "Evet. Ateşin dalgaları ateşe dönük yüzeye çarpar." İpucu: "Ateşten Ela’ya geçen şey ne?"
6. "Sıcak tuğla ocağa dokunan elin yanması" (tuğla ocak) → **İletim**. Neden: "Evet. Tuğla katıdır; ısı tanecikten taneciğe geçer." İpucu: "Tuğla da metal kaşık gibi katıdır."
7. "Soğuk banka oturan kişiden banka ısı geçmesi" (bank) → **İletim**. Neden: "Evet. Bank katıdır; ısı bankın içinde tanecikten taneciğe ilerler." İpucu: "Bank katıdır."
8. "Havası boşaltılmış odada elektrikli ısıtıcının eli ısıtması" (ısıtıcı) → **Işıma**. Neden: "Evet. Havasız odada yalnızca dalgalar ilerler." İpucu: "Odada hava yok; hangi yolun maddesel ortama ihtiyacı yok?"

Sonra:
3. Aynı olay birden çok yolla da gerçekleşebilir; mum alevi böyleydi.
4. Isı üç yolla aktarılır: iletim, konveksiyon, ışıma.

### Çıkış soruları

1. Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını hiç tutmasaydı yeryüzü için ne söylenir? **Bugünkünden çok daha soğuk olurdu** / Bugünkünden çok daha sıcak olurdu / Sıcaklığı hiç değişmezdi. (sahne 11)
2. (yeni durum) Ocaktaki tencerenin metal sapı ısınıyor, içindeki su da ısınıyor. Hangisi doğrudur? **Sap iletimle, su konveksiyonla ısınır** / Sap konveksiyonla, su iletimle ısınır / Sap da su da yalnızca ışımayla ısınır. (sahne 3, 4)
3. (yanılgı) "Petekler tavana yakın konsa oda daha çabuk ısınır, çünkü sıcak hava yukarı çıkar." Bu cümle için ne söylenir? **Yanlıştır; zemine yakın petek, odadaki havanın tamamını dolaştırır** / Doğrudur; tavandaki petek bütün odayı ısıtır / Doğrudur; ısı yalnızca yukarıya doğru yayılır. (sahne 4)
4. (yanılgı) "Havası boşaltılmış odada hiçbir ısıtıcı odayı ısıtamaz, çünkü ısı için hava gerekir." Bu cümle için ne söylenir? **Yanlıştır; ışıma maddesel ortam gerektirmez, elektrikli ısıtıcı ısıtır** / Doğrudur; ısı her yolla yalnızca havada yayılır / Doğrudur; elektrikli ısıtıcı yalnızca konveksiyonla ısıtır. (sahne 8)
5. (yeni durum) Sıcak bir mutfağın kapısı serin balkona açılıyor. Kapı aralığında hava nasıl hareket eder? **Üstten sıcak hava balkona çıkar, alttan serin hava mutfağa girer** / Üstten serin hava mutfağa girer, alttan sıcak hava balkona çıkar / Hava hareket etmez; ısı yalnızca kapıdan iletimle geçer. (sahne 9)

## E3 · Konu tekrarı: Isı aktarım yolları (`e3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle ve kısa etiketiyle (tahtada aynı anda 12 öğe, 20 kelime) deftere düşer. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner; sahnenin sonunda hepsi yeniden tam görünür olur. Düzen: iki satır üç sütun (sütun merkezleri x 190, 500, 810; satır merkezleri y 170 ve 400; her çizim 220 × 140, etiketi çizimin altında). Figür kullanılmaz.

Çizimler ve etiketler:
1. Üç küçük kutu yan yana (katı, sıvı ve gaz, boşluk; boşluk gri çizgili): "ortam yolu belirler".
2. Tanecik şeridi (5 tanecik, ısı dalgası soldan sağa): "iletim: titreşim".
3. Küçük tanecik penceresi (halkalı tanecikler yukarı, halkasızlar aşağı): "konveksiyon: yer değiştirme".
4. Güneş ile Dünya arasında üç yay: "ışıma: dalga, boşlukta da".
5. Koyu ve açık iki araba (koyu 0,8, açık 0,35 turuncu parlama): "koyu renk: çok soğurur".
6. Küçük sera şeması (atmosfer şeridi, gelen ok, dönen ok): "sera etkisi: tutulan ışıma".

Anlatım:
1. Bu konudaki kuralları altı cümlede toplayalım.
2. Isının yolunu, geçtiği ortam belirler.
3. İletim: maddesel ortamda ısı, tanecikten taneciğe geçer.
4. Konveksiyon: akışkanda yer değiştiren tanecikler ısıyı yayar.
5. Işıma: ısı elektromanyetik dalgalarla yayılır; maddesel ortam gerekmez.
6. Koyu renkli nesneler ışımayı daha fazla soğurur.
7. Atmosfer, yeryüzünün ışımasının bir kısmını tutar: sera etkisi.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Kışın güneşe dönük oturan kedinin sırtı ısınıyor. Isı Güneş’ten kediye hangi yolla gelir? **Işıma** / Konveksiyon / İletim. (E1 sahne 4, E2 sahne 3)
2. (yeni durum) Fırından çıkan tepsinin metal kulpunu tutan Ela’nın eli yanıyor. Isı kulpta hangi yolla ilerlemiştir? **İletim** / Konveksiyon / Işıma. (E1 sahne 2, E2 sahne 3)
3. (yeni durum) Bir kazanın tabanındaki ısıtıcı suyu ısıtıyor. Suyun tamamının ısınması hangi yolla olur? **Konveksiyon; sıcak su yükselir, soğuk su iner** / İletim; tanecikler yerinde titreyerek ısıyı yayar / Işıma; ısı yalnızca dalgalarla geçer. (E2 sahne 4)
4. (yanılgı) "Isı yalnızca bir maddenin içinde yayılabilir." Bu cümle için ne söylenir? **Yanlıştır; ışıma boşlukta da yayılır** / Doğrudur; ışıma da madde ister / Doğrudur; boşlukta konveksiyon olur. (E1 sahne 4, E2 sahne 3)
5. (yeni durum) Havası boşaltılmış odada çalışan elektrikli ısıtıcının karşısındaki el ısınıyor. Hangi yol etkilidir? **Işıma** / Konveksiyon / İletim. (E2 sahne 8)
6. (yanılgı) "Petekler tavana yakın konsa oda daha çabuk ısınır." Bu cümle için ne söylenir? **Yanlıştır; zemine yakın petek, odadaki havanın tamamını dolaştırır** / Doğrudur; sıcak hava aşağı iner / Doğrudur; ısı yalnızca yukarıya doğru yayılır. (E2 sahne 4)
7. (yeni durum) Güneşte aynı süre kalan koyu ve açık renkli iki tişörtten hangisi daha çok ısınır? **Koyu renkli; ışımayı daha fazla soğurur** / Açık renkli; ışımayı daha fazla soğurur / İkisi eşit ısınır. (E2 sahne 7)
8. Sera etkisi için hangisi doğrudur? **Atmosfer, yeryüzünün yaydığı ışımanın bir kısmını tutar** / Atmosfer, Güneş’ten gelen ışımayı tamamen geri gönderir / Yeryüzü ışıma yapmaz. (E2 sahne 11)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.5) | Karşılığı |
|---|---|
| a) Isı aktarım yollarının niteliklerini belirler | E1 sahne 2–6 (katı, sıvı ve gaz, boşluk; maddesel ortam, akışkan; tanecik düzeyi) |
| Uygulama: ısı aktarım yollarını tartışma; tahmin | E1 ve E2'de her durumun "Sor" adımı (tahmin, sonra "Gör") |
| Uygulama soru 1: metal kaşıkla karıştıran kişinin eli | E1 sahne 2 |
| Uygulama soru 2: soba yanan odanın tavanı ile tabanı | E1 sahne 3 (Ş4; tavan ve taban termometreleri) |
| Uygulama soru 3: Güneş ile Dünya arasındaki ısı aktarımı | E1 sahne 4; E2 sahne 11 |
| Uygulama soru 4: metal bank, tahta bank | E2 sahne 10 (iletim olarak sınıflanır; üşüme farkının nedeni F1) |
| Uygulama soru 5: havası boşaltılmış odada elektrikli ısıtıcı | E2 sahne 8 (çözülmüş örnek) |
| Uygulama soru 6: havası boşaltılmış odada kalorifer peteği | E2 sahne 8 (birlikte çöz); petek ayrıca E2 sahne 4 |
| Uygulama soru 7: pencere açılınca sıcak–soğuk hava giriş–çıkışı | E2 sahne 9 (Ş4; pencere ayarı) |
| Uygulama: maddesel olan (akışkan olan ve olmayan) ve maddesel olmayan ortam niteliklerini belirler | E1 sahne 2–5 |
| b) Niteliklerine göre benzerlik ve farklılıklarına göre ayrıştırır | E1 sahne 5 (üç ortam yan yana, soru), sahne 7 (sınıflama) |
| c) Benzerliklerine göre gruplandırır | E2 sahne 2 |
| ç) Gruplandırdığı yolları adlandırır | E2 sahne 3 |
| Uygulama: bilimsel makale, sera etkisi ile ışıma arasında ilişki | E2 sahne 11 (makale verilmez; kitabın alıntısı sahne olarak kurulur) |
| Uygulama: kavram haritası oluşturma (istenebilir) | E2 sahne 3 (üç dallı şema hazır verilir); öğrenciye harita çizdirilmez |
| Köprü kurma: ısı aktarım yolları ile günlük hayat | E1 sahne 2–4; E2 sahne 4–10 |
| Köprü kurma: iklim değişikliğine neden olan olgular | E2 sahne 11 (yalnızca sera etkisi; nedenler yok) |
| Köprü kurma: ısı yalıtımı | Konu F |
| Anahtar kavramlar: iletim, konveksiyon, ışıma | E2 sahne 3, 12; E3 |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık | Ayrı ders yok; E1 sahne 1 hatırlatır |

Fazlalık denetimi: Program metninde olmayıp kitaptan ve `PLAN.md` listesinden alınanlar: kalorifer peteğinin zemine yakın konması ve su ısıtıcısı (E2 sahne 4), mum alevine üstten ve yandan yaklaşan el (sahne 5), kamp ateşi ve kızılötesi (sahne 6), koyu ve açık renk (sahne 7). Hepsi ısı aktarım yollarının niteliklerini ve adlarını uygulatır; "0 kelvin" yalnızca kitabın cümlesinde, birim işlemi olmadan geçer. Eksik olan: öğrencinin kavram haritası çizmesi ve makale okuması (sahneyle karşılandı); kitabın "soğuk fincandaki kahve" ve "ıslak mendil" satırları (kahve soğuması iki yolu birden gerektirir, ıslak mendil buharlaşmadır; kitap cevaplamıyor ve program uygulama metninde yok); araç içi sıcaklığı sorusu (Alıştırma 13 a; cevabı kitabın tanımlarından çıkarılamıyor, yalnızca siyah–beyaz araç, E2 sahne 7'dedir); küresel ısınmanın nedenleri (karar 10). Sürüklenme ve yayılma alt adları ile temas gerektirme niteliği alınmadı.
