# Senaryolar — Konu D · Isıl denge

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.4, `../PLAN.md` bölüm 3 (D1, D2), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 5, 9, 15, 16, 19) ve bölüm 8 ("D" satırları); figür `../IZOMETRIK.md` bölüm 6b (Ş3). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim ve üslup `A-ic-enerji-isi-sicaklik.md` ile aynıdır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge de kelimedir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("60 °C" → "altmış derece", "100 g" → "yüz gram", "c / 2" → "ce bölü iki").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: kapları Ela hazırlar ve ölçer.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Bu konuda "örnekle göster" benzetim ve kitabın örneğidir; "dene" D1'de sınıflama, D2'de kaydırıcıdır.
- Renkler tema boyunca aynıdır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle (madde miktarı) turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir. Tahta koyudur: çizgiler açık renklidir.
- Tahta 1000 × 562 birimdir; yazı en az 22 birim. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız). Sıcaklığın bir değere oturması yavaşlayarak olur: eğri `out`.
- **Hesap yok (karar 5).** Hiçbir sahnede ve soruda denge sıcaklığı hesaplatılmaz, formül gösterilmez. "Verilen ısı = alınan ısı" D1'de ısıl dengenin niteliği olarak sözle ve defter satırı olarak geçer; sayıya dönüşmez. Tahtada yalnızca ölçülen sıcaklıklar, sıcaklık değişimleri ve tablo görünür. Dersin başındaki "Örnek veri" satırı yazara aittir: sayıları senaryo yazarı kitabın modeliyle (m₁ · c₁ · ΔT₁ = m₂ · c₂ · ΔT₂; su 4,18 J/g · °C; zeytinyağının öz ısısı suyunkinin yarısı, 0,5'e 1 oranı, kitap s. 224) hesapladım; ders yazılırken aynı sayılar kullanılır, ölçüm değeri olarak sunulur.
- Isı aktarım yollarının adları (iletim, konveksiyon, ışıma) bu konuda geçmez; hâl değişimiyle birleşik durum (suya buz atma) yoktur. Kalori kullanılmaz; öz ısı sütununda sayı yerine "c" (su) ve "c / 2" (zeytinyağı) yazılır.
- **Figür Ş3 (`DENGE`, `dersler/denge-sekil.js`, oran 0,9):** su dolu bir beherin içinde sıcak su dolu bir erlenmayer; ikisinde birer termometre. Kitabın düzeneğidir (s. 237). Ayarlar: `ic` (erlenmayerdeki termometre, °C), `dis` (beherdeki termometre, °C), `icSeviye`, `disSeviye` (0…1 doluluk), `icIcerik`, `disIcerik` (`'su'` ya da `'yag'`), `icte` (0 erlenmayer beherin yanında tezgâhta, 1 beherin içinde). Noktalar: `ic.termometre`, `dis.termometre` (sütun tepesi), `ic.etiket`, `dis.etiket`, `temas`. Kadraj: `tum`, `kaplar`. Figürde yazı yoktur; aşağıdaki her yazı, ok ve çizgi dersin düz katmanındadır ve noktalara bağlanır. Bu konuda hep erlenmayer sıcak, beher soğuk maddedir; erlenmayer 60 °C'tan başlar (kitap s. 237).
- **Doluluk ile kütle:** her kapta `seviye` 100 g için 0,3; 200 g için 0,5; 300 g için 0,7 (400 g için 0,8; 50 g için 0,2; 150 g için 0,4). Kütle, kabın `etiket` noktasının altında turkuaz yazıyla ("100 g su", "200 g zeytinyağı") gösterilir.
- **Okunan değer:** her termometre noktasının 26 birim üstünde, ortalı, sarı yazı ("60 °C"). Sütunla birlikte hareket eder; `c.tween` sırasında tam sayıya yuvarlanarak güncellenir (37,5 gibi değerde bir ondalık).
- **Değişim oku:** bir deneme bittiğinde her termometre noktasının 28 birim sağında sarı dikey ok: başlangıç yüksekliğinden (`nokta` değeri tween başlamadan kaydedilir; orada 24 birimlik gri kesikli yatay çizgi) bitiş yüksekliğine, 5 birim kalın, 500 ms `out`; yanında okun ortasında "−15 °C" ya da "+15 °C" (sarı). Böylece iki sütunun kat ettiği yol yan yana görülür.
- **Isı oku:** turuncu, 7 birim kalın; `temas` noktasının y'sinde, `ic.termometre` noktasının x'inden `dis.termometre` noktasının x'ine, üstünde "ısı". Erlenmayer beherin içine inince 500 ms `out` ile belirir; ısı akışı bitince 400 ms `in` ile söner.
- **Yalıtım çizgisi:** figürün çevresinde 3 birimlik gri kesikli dikdörtgen; yanında "yalıtılmış" yazısı. Yalıtım, ısının yalnızca iki kap arasında aktarıldığını söyler (kitap s. 239 "termal olarak yalıtılmış").
- **Tanecik penceresi** (D1 sahne 4): 150 birim çaplı daire, kapla iki ince çizgiyle bağlı; içinde 6 tanecik (yarıçap 9, açık mavi), yerinde titreşir. Genlik ve bir salınımın süresi sıcaklığa göre: 20 °C 5 birim, 600 ms; 25 °C 6, 580 ms; 30 °C 6, 560 ms; 45 °C 8, 490 ms; 60 °C 10, 420 ms. Titreşim sahne boyunca tek bir `c.tween` döngüsüyle sürer, her taneciğin başlangıç evresi farklıdır.
- **Düz termometre** (figür dışı çizimlerde): 26 birim genişliğinde, 220 birim yüksekliğinde cam boru, sarı sütun; sütun boyu = (sıcaklık + 20) × 1,57 birim (–20 °C → 0, 120 °C → 220). Bu konuda kullanılan boylar: 22 °C → 66, 30 °C → 79, 45 °C → 102, 70 °C → 141 birim.
- **Tablo** (D2): `KIT.tablo`; kitabın sütunları: Madde · Kütle · Öz ısı · İlk sıcaklık · Son sıcaklık · Sıcaklık değişimi. Birimler başlıkta değil hücrede ("100 g", "60 °C") olduğundan başlık iki satırdır ve sütunlar en uzun hücreye göre yazılır (aşağıda). Tablolu sahnede 25 kelime sınırı tablo dışındaki yazıya uygulanır; tablo hücreleri, A1 sahne 5 ve A2 sahne 6 tabloları gibi ayrı sayılır.

## D1 · Sıcak su nereye kadar soğur?

- **Fikir:** Sıcaklıkları farklı maddeler bir aradayken ısı sıcak olandan soğuk olana aktarılır; sıcaklıklar eşitlenince aktarım biter. Bu duruma ısıl denge, ortak sıcaklığa denge sıcaklığı denir. Denge, ikisinin "ortada buluşması" değil, sıcaklıkların eşitlenmesidir.
- **Giriş ekranı sorusu:** Masada unuttuğun sıcak çay bir saat sonra kaç derece olur; daha da soğur mu?
- **Kaynak:** Ders kitabı s. 236 (Konuya Başlarken; etkinlik başlığı), s. 237 (Tahmin Et–Gözle–Açıkla: beherglas, erlenmayer, her kapta ayrı termometre, erlenmayerdeki su 60 °C, erlenmayer beherin içine konur), s. 239 (denge sıcaklığı ve ısıl denge tanımı, "alınan ısı = verilen ısı", sıcaklıkları baştan eşit maddelerde ısı alışverişi olmaz, Görsel 4.17), s. 240 (termometre ile ölçüm ısıl denge örneğidir; örnek a şıkkı; 9. alıştırma), s. 241 (Kontrol Noktası). Kitap beherdeki suyun ilk sıcaklığını, su miktarını (yalnızca "yarıya kadar"), denge sıcaklığını ve bekleme süresini vermez; sayılar örnek veridir. Çayın ortam sıcaklığına soğuması program uygulamasındadır (MUFREDAT, FİZ.9.4.4 uygulaması), kitapta anlatılmaz.
- **Örnek veri:** Erlenmayer 100 g su, 60 °C (sıcaklık kitaptan); beher 300 g su, 20 °C. Denge sıcaklığı: 100 · 4,18 · (60 − T) = 300 · 4,18 · (T − 20) → 60 − T = 3 (T − 20) → 120 = 4 T → **T = 30 °C**. Kontrol: verilen ısı 100 · 4,18 · 30 = 12.540 J; alınan ısı 300 · 4,18 · 10 = 12.540 J. Yarı yol (sahne 4): erlenmayer 45 °C, beher 25 °C (verilen 100 · 4,18 · 15 = 6.270 J; alınan 300 · 4,18 · 5 = 6.270 J). Çay: 70 °C, oda 22 °C; süt: 4 °C, oda 22 °C (oda çok büyük olduğundan sıcaklığı değişmez; hesap yok).
- **Sınır:** Denge sıcaklığı hesabı, formül ve sayısal denge sorusu yok. Hâl değişimi yok. Sonucun ortada olup olmadığı yalnızca "çay oda sıcaklığında durur" ve "kapların son sıcaklığı 30 °C" olarak görülür; denge sıcaklığının neye göre yer değiştirdiği D2'dedir. Isı sığası yalnızca sahne 5'te, iki satırda ve B2'nin hatırlatmasıyla anılır.
- **Güç kavram ve gösterimi:** (1) Denge ortada buluşmak değildir: çay 70 °C ile 22 °C'ın ortası olan 46 °C'ta durmaz, odanın sıcaklığında durur; iki termometre sütunu birbirine yaklaşır, biri çok, öteki az yol alır (değişim okları farklı boyda). (2) Denge ısının durması demektir, sıcaklıkların yer değiştirmesi değil: ısı oku söner, tanecikler aynı hareketlilikte titreşir.
- **Hedeflenen yanılgı:** Sıcak çay ve oda "ortada buluşur"; dengeye gelince sıcak olan soğuk, soğuk olan sıcak olur; ısıl dengede de ısı akmaya devam eder.
- **Akılda kalıcı cümle:** Sıcaklıklar eşitlenince ısı alışverişi biter.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Soğuk bir kaşık sıcak çorbaya batırılıyor. Isı hangi yönde aktarılır? **Çorbadan kaşığa** / Kaşıktan çorbaya / İki yöne eşit. (A1) Yanlışta: "Isı, sıcaklığı yüksek olandan düşük olana aktarılır."
2. Aynı sıcaklıkta 100 g su ile 300 g su var. Hangisinin ısı sığası daha büyüktür? **300 g suyun; kütle arttıkça ısı sığası artar** / 100 g suyun; sıcaklığı daha çabuk değişir / İkisinin eşit; ikisi de su. (B2) Yanlışta: "Isı sığası kütleyle artar: C = m · c."

Tahta: birinci soruda bir kâse çorba (kap, x 380–620, y 200–340) ve içine inen kaşık (düz çizim); ok yok, cevaptan sonra turuncu ok çorbadan kaşığa belirir (500 ms, `out`). İkinci soruda iki kap yan yana (x 260–410 ve 590–740, y 190–340), solda "100 g", sağda "300 g" (turkuaz); doluluk 0,3 ve 0,7 oranında.

Sonra: "Bugün sıcak ile soğuğun birbirine ne yaptığına bakacağız."

### Sahne 2 · Masada unutulan çay

Tahta: solda bir kupa (düz çizim: 160 × 150, x 150–310, y 200–350; içi su rengiyle, yarı saydam mavi; altında "çay" etiketi, sarı değil beyaz) ve içinde düz termometre (x 230, y 140–360). Sağda büyük bir dikdörtgen çerçeve (x 500–940, y 120–420; açık gri 3 birim çizgi; köşede "oda") ve içinde düz termometre (x 720, y 140–360). Termometre değerleri sarı yazıyla: çay 70 °C (sütun boyu 141 birim), oda 22 °C (sütun boyu 66 birim). Anlatım 4'te çaydan odaya turuncu ısı oku (x 330 → 490, y 275; 500 ms, `out`), üstünde "ısı".

Anlatım:
1. Ela sabah bir kupa sıcak çay koyup masada unutuyor.
2. Çay 70 °C; oda ise 22 °C.
3. Çayın sıcaklığı odadan yüksek, yani sıcaklıkları farklı.
4. Isı, sıcaklığı yüksek olan çaydan odaya aktarılır.
5. Çay ısı verdikçe soğur.

Tahmin (`c.choice`, `tag: 'Tahmin et'`; durum tanıtıldı, sezgiyle): "Bir saat sonra çay kaç derece olur?" **Yaklaşık 22 °C; odayla aynı sıcaklık** / 70 °C; hiç değişmez / Yaklaşık 10 °C; odadan bile soğuk. Dayandığı anlatım: 1–5. İpuçları: "Isı çaydan odaya aktarılıyor; çay soğur. Ne zamana kadar?" · "Çay, ısı verdiği odadan daha soğuk olursa ısı hangi yöne aktarılırdı?"

Gör: çay termometresi 70 → 22 °C (sütun boyu 141 → 66; 4.000 ms, `out`); oda termometresi 22 °C'ta sabit. Tween biterken ısı oku söner (400 ms, `in`).

Sonra:
6. Çay soğudu ve 22 °C'ta durdu.
7. Oda çok büyük olduğu için sıcaklığı değişmedi.
8. İkisinin sıcaklığı eşit olunca ısı aktarımı da durdu.
9. Çay, 70 ile 22'nin ortasında değil, oda sıcaklığında durdu.

Defter (`Oda sıcaklığı`): "Çay soğuyup oda sıcaklığında durur; sıcaklıklar eşit, ısı aktarımı yok."

### Sahne 3 · Erlenmayer beherin içinde

Tahta: Figür: Ş3, `x 60, y 130, h 330` (genişlik 297; x 60–357); kadraj `tum`. Başlangıç ayarları: `ic: 60, dis: 20, icSeviye: 0,3, disSeviye: 0,7, icIcerik: 'su', disIcerik: 'su', icte: 0`. `ic.etiket` noktasının altında "100 g su", `dis.etiket` noktasının altında "300 g su" (turkuaz); termometre noktalarının üstünde sarı "60 °C" ve "20 °C". Figürün çevresine yalıtım çizgisi (x 45–372, y 115–515) anlatım 4'te belirir (400 ms, `out`). Sağ tarafta (x 450–960) anlatımdan sonra belirecek iki tanım satırı için yer ayrılmıştır (y 150 ve y 230; yazı 24).

Anlatım:
1. Ela iki kap hazırlıyor.
2. Erlenmayerdeki 100 g su 60 °C'a kadar ısıtılmış.
3. Beherdeki 300 g su ise 20 °C.
4. Kapların dışı yalıtılmış; ısı yalnızca ikisi arasında aktarılır.
5. Termometreler kapların içinde kalıyor, hiç çıkarılmıyor.

Tahmin (`c.choice`, `tag: 'Tahmin et'`; durum tanıtıldı, doğru şık aranır): "Ela erlenmayeri beherin içine koyacak. Sıcaklıklar nasıl değişir?" **Sıcak olanınki düşer, soğuk olanınki yükselir** / İkisininki de yükselir / İkisininki de aynı kalır. Dayandığı anlatım: sahne 2, 4–5; bu sahne 2–4. İpuçları: "Isı sıcak olandan soğuk olana aktarılır; hangisi ısı verir, hangisi alır?" · "Isı alan maddenin sıcaklığı yükselir, veren maddenin düşer."

Gör: `icte` 0 → 1 (erlenmayer beherin içine iner; 900 ms, `inOut`); ısı oku belirir (500 ms, `out`); sonra 5.000 ms içinde `ic` 60 → 30 ve `dis` 20 → 30 (`out`). Okunan değerler tween ile akar. Bitince ısı oku söner (400 ms, `in`). Süre boyunca sağda "bir süre sonra" yazısı belirir (y 100, x 450; 400 ms, `out`) ve sonuçta kalır.

Sonra:
6. Erlenmayerin sıcaklığı düştü, beherin sıcaklığı yükseldi.
7. Sonunda iki termometre de 30 °C gösteriyor.
8. Sıcaklıkları eşitlenen maddeler ısıl dengeye gelmiştir.
9. Ulaştıkları ortak sıcaklığa denge sıcaklığı denir.

Tahtada: anlatım 8'de sağ üstte (x 450, y 150) "ısıl denge → sıcaklıklar eşit" ("ısıl denge" yeşil değil, beyaz), anlatım 9'da (x 450, y 230) "denge sıcaklığı → ortak son sıcaklık" belirir (her biri 400 ms, `out`).

Defter (`Isıl denge`): "Sıcaklıkları eşitlenen maddeler ısıl dengededir; ortak sıcaklık denge sıcaklığıdır."

### Sahne 4 · Dengede ne olur?

Tahta: Figür: Ş3, `x 40, y 130, h 300` (genişlik 270; x 40–310); kadraj `tum`. Başlangıç: `ic: 60, dis: 20, icSeviye: 0,3, disSeviye: 0,7, icIcerik: 'su', disIcerik: 'su', icte: 1`; etiketler sahne 3'teki gibi. Sağda iki tanecik penceresi (çap 150): erlenmayer penceresi merkez (500, 260), beher penceresi merkez (800, 260); her biri kaba (figüre) iki ince çizgiyle bağlı; altlarında "erlenmayer" ve "beher" (y 370). Pencerelerin arasında (x 590–710, y 260) turuncu ısı oku, üstünde "ısı". Başlangıçta pencerelerde 60 °C ve 20 °C titreşimi.

Anlatım:
1. Erlenmayerdeki tanecikler hızlı, beherdekiler yavaş titreşiyor.
2. Sıcak sudan soğuk suya ısı aktarılıyor.
3. Erlenmayerdeki taneciklerin hareketi yavaşlıyor, beherdekiler hızlanıyor.
4. Termometreler birbirine yaklaşıyor.
5. Sıcaklıklar eşit olunca iki sudaki tanecikler aynı hareketlilikte.
6. Artık ikisi arasında sıcaklık farkı yok; ısı aktarımı bitti.
7. Yani ısıl dengede ısı alışverişi olmaz.
8. Sıcaklıkları baştan eşit olan maddeler zaten ısıl dengededir.

Hareket: anlatım 3'te 2.000 ms, `out`: `ic` 60 → 45, `dis` 20 → 25; pencere genlikleri 10 → 8 ve 5 → 6. Anlatım 4–5'te 2.000 ms, `out`: `ic` 45 → 30, `dis` 25 → 30; iki pencerede genlik 6, salınım 560 ms. Anlatım 6'da ısı oku söner (400 ms, `in`). Anlatım 8'de tahtanın altına (y 440–500) yan yana iki küçük kap çizilir (sol "35 °C", sağ "35 °C", ikisi de sarı yazı; kaplar 90 × 90, x 380–470 ve 530–620, birbirine değiyor; ok yok); 400 ms, `out`.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta temizlenir (`c.clearSay()`); ortada bir bardak (kap 110 × 130, x 270–380, y 190–320, "bardak · 22 °C") ve yanında masa yüzeyi olarak yuvarlatılmış kutu (x 380–680, y 250–320, "masa · 22 °C"); bardak masaya değiyor; ok yok. Soru: "Bardak ve masa uzun süredir yan yana duruyor, ikisi de 22 °C. Aralarında ne olur?" **Isıl dengededirler; aralarında ısı alışverişi olmaz** / Bardak masaya ısı verir / Masa bardağa soğukluk verir. Dayandığı anlatım: 7–8. İpuçları: "Sıcaklıkları eşitse aralarında sıcaklık farkı yoktur; ısı neden aktarılsın?" · "Soğukluk diye bir şey aktarılmaz; ısı yalnızca sıcaklık farkı varken aktarılır."

Gör: her iki termometre 22 °C'ta sabit; aralarında hiçbir ok çıkmaz. Bardağın ve masanın altında tanecik pencereleri belirir (çap 120; ikisinde de 22 °C titreşimi: genlik 5, salınım 600 ms); 600 ms, `out`.

Sonra:
9. Sıcaklıklar eşit, tanecikler aynı hareketlilikte, ısı aktarımı yok.

Defter (`Isıl dengede`): "Sıcaklıklar eşitlenince ısı alışverişi biter."

### Sahne 5 · Verilen ısı, alınan ısıya eşit

Tahta: Figür: Ş3, `x 40, y 130, h 300` (x 40–310); başlangıç ayarları: `ic: 60, dis: 20, icSeviye: 0,3, disSeviye: 0,7, icIcerik: 'su', disIcerik: 'su', icte: 1`; etiketler "100 g su" ve "300 g su" (turkuaz), termometre değerleri sarı. Termometre noktalarının başlangıçtaki yeri kaydedilir. Sağda (x 400–960) iki turuncu çubuk alt alta, ikisi de 240 birim uzun, 22 birim yüksek (x 520–760): üstteki y 150, solunda "verilen ısı" (24); alttaki y 215, solunda "alınan ısı"; ortada (x 770, y 183) "=" işareti. Çubuklar ve "=" başta yoktur.

Anlatım:
1. Dengeye gelene kadar sıcak su ısı verdi, soğuk su ısı aldı.
2. Isı dışarı kaçmadı.
3. Bu yüzden verilen ısı, alınan ısıya eşittir.
4. Ama iki suyun sıcaklık değişimi eşit değil.
5. Erlenmayerin sıcaklığı 30 °C düştü.
6. Beherin sıcaklığı yalnızca 10 °C yükseldi.
7. Beherde üç kat su var; ısı sığası daha büyük.
8. Isı sığası büyük olan cismin sıcaklığı daha az değişir.

Hareket: anlatım 1'de, 2.000 ms, `out`: `ic` 60 → 30, `dis` 20 → 30 (sahne 3'ün özeti; ısı oku sahne 3'teki gibi görünür ve sonda söner). Anlatım 3'te iki turuncu çubuk 0 → 240 birim uzunluğa birlikte büyür (700 ms, `out`), ardından "=" belirir (300 ms, `out`). Anlatım 5'te erlenmayerin değişim oku ("−30 °C"), anlatım 6'da beherin değişim oku ("+10 °C") çizilir (her biri 500 ms, `out`); beherinki belirgin biçimde kısadır. Anlatım 8'de beherin değişim okunun yanına turkuaz bir halka çizilir (300 ms, `out`).

Sor (`c.choice`, `tag: 'Sor'`): tahta değişir (`c.clearSay()`): yalıtılmış çerçevede (x 250–750, y 150–400; gri kesikli) iki küp, A (x 330–430) ve B (x 570–670), ikisi de y 280–380; A'dan B'ye turuncu ısı oku (x 440 → 560, y 330). Termometre yok. Soru: "A cismi ısı verdi, B cismi ısı aldı; ikisi de yalıtılmış. A'nın sıcaklığı çok düştü, B'ninki az yükseldi. Hangisi doğrudur?" **Verilen ısı, alınan ısıya eşittir** / A daha çok ısı verdi; sıcaklığı çok düştü / B daha çok ısı aldı; sıcaklığı yükseldi. Dayandığı anlatım: 2–4. İpuçları: "Isı dışarı kaçmadıysa verilen ısıyla alınan ısı arasında ne ilişki var?" · "Sıcaklık değişimi, ısının miktarını değil, ısı sığasını da hesaba katar."

Gör: iki kübün altında, iki eşit uzunlukta turuncu çubuk (x 330–570 ve 330–570, y 430 ve 470) belirir (500 ms, `out`).

Sonra:
9. Sıcaklık değişimleri farklı olsa da verilen ve alınan ısı eşittir.

Defter (`Verilen ısı = alınan ısı`): "Verilen ısı = alınan ısı; sıcaklık değişimleri eşit olmak zorunda değil."

### Sahne 6 · Termometre de dengeye gelir

Tahta: solda bir kupa sıcak su (kupa 180 × 160, x 150–330, y 230–390; içi su rengi, etiket "su · 45 °C" y 410), sağda boşta düz termometre (x 560, y 150–370; sütun 22 °C'ta, boy 66 birim). Anlatım 2'de termometre kupaya iner (x 560 → 240, 150 → 210 birim aşağı; alt ucu kupanın içinde; 900 ms, `inOut`) ve sütun 22 → 45 °C yükselir (boy 66 → 102; 3.000 ms, `out`). Kupanın üstünde turuncu ısı oku, sudan termometreye (x 300 → 260, y 220; 400 ms, `out`); sütun durunca oku söner.

Anlatım:
1. Termometre de aynı kuralla çalışır.
2. Sıcak suya batırılan termometreye sudan ısı aktarılır.
3. Termometre ile su ısıl dengeye gelince sütun durur.
4. Okuduğumuz değer, bu denge sıcaklığıdır.
5. Bu yüzden ölçerken sütun durana kadar bekleriz.
6. Vücudun ısı sığası termometreninkinden çok büyüktür.
7. Bu yüzden denge sıcaklığı vücut sıcaklığına çok yakın çıkar.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta aynı; termometre kupada, sütun 30 °C'ta durmuş çizilir (boy 79; değer "30 °C" sarı), ısı oku görünür. Soru: "Ela termometreyi sıcak suya batırdı; sütun hâlâ yükseliyor. Değeri ne zaman okumalı?" **Sütun durunca; ısıl denge sağlanmıştır** / Hemen; sıcaklık zaten okunur / Sütun yükselirken; en doğru değer odur. Dayandığı anlatım: 3–5. İpuçları: "Termometre sudan ısı alırken sütun yükselir; ne zaman ısı almayı bırakır?" · "Okunan değer, termometre ile suyun denge sıcaklığıdır; bu değere ulaşılmış mı?"

Gör: sütun 30 → 45 °C (boy 79 → 102; 1.800 ms, `out`); "45 °C" okunur; ısı oku söner (400 ms, `in`).

Sonra:
8. Sütun durdu: termometre ile su ısıl dengeye geldi.

### Sahne 7 · Yalıtılmış kutuda iki cisim

Tahta: yalıtılmış kutu: gri kesikli dikdörtgen (x 150–850, y 120–440), köşesinde "yalıtılmış". İçinde iki küp, A (x 320–420) ve B (x 580–680), ikisi de y 330–430, 100 × 100; kenar açık renk, içi 0,25 saydam; küpün üstünde harfi (A, B; 24). Küplerin üstünde düz termometre (x 370 ve 630; y 160–320): A'nın sütunu 120 birim, B'ninki 50 birim; yanlarında sayı yok. Başta ok yok.

Çözülmüş örnek:
1. Yalıtılmış bir kutuda A ve B cisimleri var.
2. Bir süre sonra A'dan B'ye ısı aktarıldığı görülüyor.
3. Isı, sıcaklığı yüksek olandan düşük olana aktarılır.
4. O hâlde A'nın sıcaklığı B'ninkinden yüksektir.

Hareket: anlatım 2'de A'dan B'ye turuncu ok (x 430 → 570, y 380; 500 ms, `out`); anlatım 4'te iki termometre sütunu sırayla belirir (A, sonra B; 500 ms, `out`), A'nın sütunu uzundur ("A: daha sıcak" yazılmaz).

Birlikte çöz (`tag: 'Birlikte çöz'`; kutuda artık K ve L var, aynı yerler; termometre ve ok yok; kartta: "K ile L'nin sıcaklıkları eşitlenmiş. Bu yüzden aralarında ısı …… ve ikisi …… dengededir."): "Boşluklara hangisi gelir?" **alışverişi olmaz; ısıl** / alışverişi sürer; ısıl / alışverişi olmaz; ısı sığası. Dayandığı anlatım: sahne 4, 5–8; sahne 3, 8. İpuçları: "Sıcaklıklar eşitse sıcaklık farkı yoktur; ısı aktarılmaz." · "Sıcaklıkları eşit olan maddelerin durumuna ne denir?"

Sonra:
5. K ile L ısıl dengede; aralarında ısı alışverişi yok.

Sor (tek başına, `c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): solda süt kutusu (x 180–280, y 250–380, "süt · 4 °C") ve düz termometre; sağda aynı çerçevede oda (x 450–900, y 150–420; "oda · 22 °C"; termometre). Soru: "Ela buzdolabından 4 °C'lık süt çıkarıp 22 °C'lık odada masaya bırakıyor. Uzun süre sonra süt kaç derece olur?" **22 °C; oda sıcaklığı** / 4 °C; hiç değişmez / 13 °C; ikisinin ortası. Dayandığı anlatım: sahne 2, 6–9; sahne 4, 5–7. İpuçları: "Süt, odadan soğuk; ısı hangi yönde aktarılır ve ne zamana kadar?" · "Çay da ortada durmamıştı: ısı aktarımı sıcaklıklar eşit olunca biter."

Gör: oda ile süt arasında turuncu ok odadan süte (x 300 → 440, y 310; 500 ms, `out`); süt termometresi 4 → 22 °C (4.000 ms, `out`); ok söner (400 ms, `in`).

Sonra:
6. Süt ısı aldı, oda sıcaklığına geldi ve orada durdu.

Defter (`Denge ortada değil`): "Isı sıcaktan soğuğa aktarılır; denge ortada buluşmak değil, eşitlenmektir."

### Sahne 8 · Isıl dengede mi?

Tahta: üstte iki kutu (y 70–250): "Isıl dengede" (x 90–480) ve "Isıl dengede değil" (x 520–910). Altta (y 300–420, x 150–850) sırayla gelen cümle kartı. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir.

Anlatım:
1. Şimdi altı duruma bakalım.
2. Her biri için karar ver: ısıl denge var mı?

Kartlar (soru: "Bu iki madde ısıl dengede mi?"; kutudaki kısa ad parantezde):
1. "Masa ve üstündeki bardak: ikisi de 22 °C." (masa, bardak) → **Dengede**. Neden: "Evet. Sıcaklıkları eşit; ısı alışverişi olmaz." İpucu: "Sıcaklıkları aynıysa aralarında ısı aktarılır mı?"
2. "Buzdolabından yeni çıkan süt ve oda." (süt, oda) → **Dengede değil**. Neden: "Evet. Sıcaklıkları farklı; süt ısı alıyor." İpucu: "Süt hâlâ odadan soğuk mu, aynı sıcaklıkta mı?"
3. "Termometre ve su: sütun artık değişmiyor." (termometre, su) → **Dengede**. Neden: "Evet. Sütun durdu; sıcaklıkları eşit." İpucu: "Sütun durduysa termometre suyla aynı sıcaklığa gelmiştir."
4. "Kaynar çaya yeni batırılan kaşık." (kaşık, çay) → **Dengede değil**. Neden: "Evet. Çay daha sıcak; ısı çaydan kaşığa aktarılıyor." İpucu: "Kaşık henüz çaya yeni girdi; sıcaklıkları eşitlenmiş olabilir mi?"
5. "Erlenmayer 30 °C, beher 30 °C." (erlenmayer, beher) → **Dengede**. Neden: "Evet. Sıcaklıkları eşit." İpucu: "İki termometre aynı değeri gösteriyor; sıcaklık farkı var mı?"
6. "A cismi 45 °C, B cismi 40 °C; birbirine değiyorlar." (A, B) → **Dengede değil**. Neden: "Evet. Fark küçük olsa da ısı A'dan B'ye aktarılır." İpucu: "Sıcaklıkları tam eşit mi, yoksa küçük de olsa bir fark var mı?"

Sonra (kutular 0,45'e iner; ortada sahne 3'teki tanım satırları yeniden belirir, 500 ms, `out`):
3. Sıcaklıkları eşit olan maddeler ısıl dengededir.
4. Sıcaklıklar eşitlenince ısı alışverişi biter.

### Çıkış soruları

1. (yeni durum) Fırından çıkan 200 °C'lık tepsi 22 °C'lık mutfakta bekletiliyor. Uzun süre sonra tepsinin sıcaklığı için hangisi doğrudur? **22 °C'a düşer; sonra ısı alışverişi biter** / 22 °C'ın altına düşer; çünkü ısı verir / 200 °C'ta kalır; fırından çıkmıştır. (sahne 2, 4)
2. (yanılgı) Sıcak su ile soğuk su yalıtılmış kapta ısıl dengeye geliyor. Termometrelerde ne görülür? **İkisi de aynı değeri gösterir** / Sıcak olan soğuğun, soğuk olan sıcağın ilk değerini gösterir / Sıcak olan hâlâ daha sıcaktır. (sahne 3, 4)
3. (yanılgı) Yalıtılmış sistemde A'nın sıcaklığı 5 °C düştü, B'ninki 25 °C yükseldi. Hangisi doğrudur? **Verilen ısı alınan ısıya eşittir; A'nın ısı sığası daha büyüktür** / B daha çok ısı aldı; sıcaklığı çok yükseldi / A ile B ısıl dengede olduğu için ısı sığaları eşittir. (sahne 5)
4. (yeni durum) Ela termometreyi sıcak çaya batırıyor ve sütun hâlâ yükselirken okuyor. Okuduğu değer için hangisi doğrudur? **Çayın denge sıcaklığından düşüktür; sütun henüz durmadı** / Çayın sıcaklığını doğru gösterir / Çayın sıcaklığından yüksektir. (sahne 6)
5. (yeni durum) Aynı odada duran iki bardak su 35 °C'tır ve birbirine değiyor. Aralarında ne olur? **Zaten ısıl dengededirler; ısı alışverişi olmaz** / Bir süre ısı aktarılır, sonra durur / Isı sığaları farklıysa ısı aktarılır. (sahne 4, 8)

## D2 · Son sıcaklık nerede durur?

- **Fikir:** Isıl dengeye ulaşan maddelerin son sıcaklığı, ilk sıcaklıkların arasında bir yerdedir; nerede duracağını kütleler ve maddelerin cinsi, yani ısı sığaları belirler. Son sıcaklık, ısı sığası büyük olan maddenin ilk sıcaklığına yakın durur; ısı sığaları eşitse tam ortada durur.
- **Giriş ekranı sorusu:** Bir bardak sıcak suya bir kaşık soğuk su katmakla bir bardak soğuk su katmak aynı sonucu verir mi?
- **Kaynak:** Ders kitabı s. 237 (düzenek), s. 238 (üç deneyin amacı: kütle miktarının, maddenin cinsinin, maddelerin ilk sıcaklıklarının denge sıcaklığına etkisi; veri tablosunun sütunları; "Veriler / Yorumlar" tablosu), s. 239 (9. basamak: veriden son sıcaklıklar hakkında çıkarım), s. 240 (örnek: A'nın ısı sığası B'den büyükse denge sıcaklığı A'nın ilk sıcaklığına daha yakındır; 9. alıştırma), s. 241 (11. alıştırma: 300 g su 40 °C ile 100 g su 80 °C; hangisine yakın), s. 224–225 (zeytinyağının öz ısısı 0,5, suyunki 1; yalnızca oran alınır), s. 219 (C = m · c). Kitap bu üç deney için düzenek, ölçüm ve sonuç vermez; kütle ya da ilk sıcaklığın etkisi için kural da vermez, tek kural s. 240'taki ısı sığası kuralıdır. Sayılar örnek veridir.
- **Örnek veri:** Hep erlenmayerde sıcak, beherde soğuk madde; ilk sıcaklıklar 60 °C ve 30 °C (üçüncü deney hariç). Denge sıcaklığı her satırda m₁ · c₁ · (60 − T) = m₂ · c₂ · (T − 30) ile hesaplandı; su c = 4,18 J/g · °C, zeytinyağı 2,09 J/g · °C.
  - **Deney 1 (kütle; su – su):** (a) 100 g – 100 g: T = 45 °C (verilen = alınan = 100 · 4,18 · 15 = 6.270 J). (b) sıcak 100 g, soğuk 200 g: T = 40 °C (100 · 4,18 · 20 = 8.360 J = 200 · 4,18 · 10). (c) sıcak 200 g, soğuk 100 g: T = 50 °C (200 · 4,18 · 10 = 8.360 J = 100 · 4,18 · 20).
  - **Deney 2 (madde; hepsi 100 g):** (a) su – su: 45 °C. (b) sıcak su, soğuk zeytinyağı: T = 50 °C (100 · 4,18 · 10 = 4.180 J = 100 · 2,09 · 20). (c) sıcak zeytinyağı, soğuk su: T = 40 °C (100 · 2,09 · 20 = 4.180 J = 100 · 4,18 · 10).
  - **Deney 3 (ilk sıcaklık; 100 g su – 100 g su):** (a) 60 °C ve 30 °C: 45 °C. (b) 80 °C ve 30 °C: T = 55 °C (100 · 4,18 · 25 = 10.450 J = 100 · 4,18 · 25). (c) 60 °C ve 10 °C: T = 35 °C (100 · 4,18 · 25 = 10.450 J).
  - **Sahne 7 (ısı sığaları eşit):** sıcak 100 g su 60 °C, soğuk 200 g zeytinyağı 30 °C: T = 45 °C (100 · 4,18 · 15 = 6.270 J = 200 · 2,09 · 15).
  - **Dene (sıcak 100 g su 60 °C; soğuk su m g, 30 °C):** T = 30 + 3.000 / (100 + m): 50 g → 50 °C; 100 g → 45 °C; 150 g → 42 °C; 200 g → 40 °C; 300 g → 37,5 °C; 400 g → 36 °C (her biri m₁ · c · (60 − T) = m · c · (T − 30) ile doğrulandı).
- **Sınır:** Öğrenciye hesap yaptırılmaz; denge sıcaklığı hiçbir yerde formülle bulunmaz. Kitabın modeli yalnızca "ısı sığası büyük olan cismin ilk sıcaklığına yakın" ve sayısız "ısı sığası = kütle ve öz ısı" ilişkisi olarak kullanılır. Hâl değişimi, "buz + su" durumu yok. Isı sığaları eşitken "tam ortada" sonucu veriden çıkarılır (kitapta yok, aşağıdaki rapora bak).
- **Güç kavram ve gösterimi:** Kat edilen yol eşit değildir: iki termometre sütununun değişim okları farklı boydadır; kütlesi ya da öz ısısı büyük olanın oku kısadır. Verilerin hepsi tek sıcaklık çizgisinde toplanır (sahne 6): her satırda iki uç ve aradaki nokta; nokta hep arada, ortada yalnızca ısı sığaları eşitken.
- **Hedeflenen yanılgı:** Denge sıcaklığı her zaman iki sıcaklığın ortasıdır; ya da sıcak olan, ısı verdiği için, daha çok etkiler.
- **Akılda kalıcı cümle:** Son sıcaklık arada kalır; ısı sığası büyük olana yakın durur.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Erlenmayerdeki sıcak su, beherdeki soğuk suyla ısıl dengeye geldi. Termometreler ne gösterir? **İkisi aynı değeri** / Erlenmayerdeki hâlâ daha sıcak / Beherdeki daha sıcak. (D1) Yanlışta: "Isıl dengede sıcaklıklar eşittir; ısı alışverişi biter."
2. Aynı ısıyı alan iki cisimden hangisinin sıcaklığı daha az artar? **Isı sığası büyük olanın** / Isı sığası küçük olanın / İkisininki aynı kadar artar. (B2) Yanlışta: "Isı sığası büyük olan cismin sıcaklığı az değişir."

Tahta: birinci soruda iki kap (Ş3 kullanılmaz; düz çizim: erlenmayer x 300–400, beher x 600–740, y 190–340, termometreler gizli); cevaptan sonra iki termometre belirir (sütun boyu 79; "30 °C" sarı). İkinci soruda iki düz termometre yan yana, ikisinin altında turuncu ısı oku; soldaki sütun uzun, sağdaki kısa, altlarında "A" ve "B".

Sonra: "Bugün denge sıcaklığının nerede duracağına bakacağız."

### Sahne 2 · Üç deney, bir tablo

Tahta: Figür: Ş3, `x 30, y 130, h 300` (genişlik 270; x 30–300); kadraj `tum`; ayarlar: `ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,3, icIcerik: 'su', disIcerik: 'su', icte: 0`. `ic.etiket` ve `dis.etiket` noktalarının altında "100 g su" (turkuaz); termometre noktalarının üstünde sarı "60 °C", "30 °C". Sağda tablo (`KIT.tablo`; x 335, y 110; sütun genişlikleri 150 / 85 / 85 / 110 / 105 / 110 = 645; başlık satırı 64 yüksek, iki satırlı; veri satırı 44; yazı 22). Başlıklar: "Madde" · "Kütle" · "Öz ısı" · "İlk sıcaklık" · "Son sıcaklık" · "Sıcaklık değişimi" (iki satıra bölünür: "İlk / sıcaklık", "Son / sıcaklık", "Sıcaklık / değişimi", "Öz / ısı"). Başlık satırı anlatım 6–7'de sütun sütun belirir (her sütun 300 ms, `out`). Veri satırı yok. Anlatım 4'te tablonun altında (y 400, x 360, 490 ve 620'den başlayarak) üç kısa etiket sırayla belirir: "kütle", "madde", "ilk sıcaklık" (her biri 300 ms, `out`; ilki turkuaz, ikincisi mavi, üçüncüsü sarı).

Anlatım:
1. Geçen derste sıcak ve soğuk su ısıl dengeye geldi.
2. Bugün denge sıcaklığının nerede durduğunu inceleyeceğiz.
3. Ela bunun için üç deney yapıyor.
4. Birinde kütleyi, birinde maddeyi, birinde ilk sıcaklıkları değiştiriyor.
5. Her deneyde yalnızca bir şey değişir; ötekiler sabit kalır.
6. Ölçtüğü her şeyi tek tabloya yazıyor.
7. Tabloda madde, kütle, öz ısı, ilk sıcaklık, son sıcaklık ve değişim var.
8. Suyun öz ısısına c diyelim.
9. Zeytinyağının öz ısısı suyunkinin yarısıdır: c / 2.
10. Hatırlayalım: ısı sığası büyük olan cismin sıcaklığı daha az değişir.
11. Isı sığası, kütle ve öz ısı büyüdükçe büyür.

Sor (`c.choice`, `tag: 'Sor'`): tahta aynı kalır. Soru: "Ela maddenin etkisine bakıyor. Hangilerini sabit tutmalı?" **Kütleleri ve ilk sıcaklıkları** / Yalnızca kütleleri / Hiçbirini; hepsi değişebilir. Dayandığı anlatım: 4–5. İpuçları: "Her deneyde yalnızca bir şey değişir; madde değişiyorsa ötekilere ne olur?" · "İki şeyi birden değiştirirsen sonucu hangisinin yaptığını bilemezsin."

Defter (`Tek değişken`): "Her seferinde yalnızca bir şeyi değiştir; ötekiler sabit kalsın."

### Sahne 3 · Deney 1: kütle

Tahta: Figür: Ş3, `x 30, y 130, h 300` (x 30–300); başlangıç ayarları sahne 2'dekiyle aynı (`ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,3, su, su, icte: 0`); etiketler "100 g su" ve "100 g su" (turkuaz). Sağda tablo (sahne 2'deki yerde ve ölçüde); başlık satırı dolu, veri satırı yok. Her deneme sırasında: tablonun iki yeni satırı denemenin başında madde, kütle, öz ısı ve ilk sıcaklık hücreleriyle belirir (satır başına 400 ms, `out`); denemenin sonunda son sıcaklık (sarı) ve değişim hücreleri dolar (400 ms, `out`). Her denemenin sonunda figürün değişim okları ve gri kesikli başlangıç çizgileri çizilir (kılavuzdaki gibi).

Yeni deneme için düzenek şöyle sıfırlanır: değişim okları ve gri çizgiler söner (300 ms, `in`); `icte` 1 → 0 (700 ms, `inOut`); `ic`, `dis`, `icSeviye`, `disSeviye` yeni ayarlara anında geçer; `icte` 0 → 1 (900 ms, `inOut`).

Anlatım:
1. Önce kütlenin etkisine bakalım.
2. İkisi de su; erlenmayerde 60 °C, beherde 30 °C.
3. Birinci denemede iki kapta da 100 g su var.

Gör (birinci deneme): `icte` 0 → 1 (900 ms, `inOut`); ısı oku belirir; sonra 4.000 ms, `out`: `ic` 60 → 45, `dis` 30 → 45. Tablo: "su · 100 g · c · 60 °C · 45 °C · −15 °C" ve "su · 100 g · c · 30 °C · 45 °C · +15 °C". İki değişim oku aynı boydadır.

Sonra:
4. Erlenmayer 15 °C düştü, beher 15 °C yükseldi.
5. Aynı su miktarında denge sıcaklığı tam ortada, 45 °C.
6. İkinci denemede beherdeki soğuk su 200 g oluyor.

Düzenek sıfırlanır; `disSeviye` 0,3 → 0,5 (anlatım 6 sırasında, 600 ms, `out`); `dis.etiket` altında "200 g su".

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Soğuk su artınca denge sıcaklığı 45 °C'a göre nasıl olur?" **45 °C'tan düşük olur** / 45 °C'tan yüksek olur / 45 °C'ta kalır. Dayandığı anlatım: sahne 2, 10–11; bu sahne 5–6. İpuçları: "Beherdeki suyun kütlesi arttı; ısı sığası ne oldu, sıcaklığı ne kadar değişir?" · "Soğuk kabın sıcaklığı az değişirse denge hangi sıcaklığa yakın kalır?"

Gör (ikinci deneme): `icte` 0 → 1 (900 ms, `inOut`); 4.000 ms, `out`: `ic` 60 → 40, `dis` 30 → 40. Tablo: "su · 100 g · c · 60 °C · 40 °C · −20 °C" ve "su · 200 g · c · 30 °C · 40 °C · +10 °C". Beherin oku, erlenmayerinkinin yarısı kadardır.

Sonra:
7. Erlenmayer 20 °C düştü, beher yalnızca 10 °C yükseldi.
8. Soğuk su çoğalınca denge sıcaklığı soğuk suyun ilk sıcaklığına yaklaştı.
9. Üçüncü denemede sıcak su 200 g, soğuk su 100 g olacak.

Düzenek sıfırlanır; `icSeviye` 0,3 → 0,5, `disSeviye` 0,5 → 0,3; etiketler "200 g su" (erlenmayer) ve "100 g su" (beher).

Sor (`c.choice`, `tag: 'Sor'`): "Sıcak su 200 g, soğuk su 100 g. Denge sıcaklığı 45 °C'a göre nasıl olur?" **45 °C'tan yüksek olur** / 45 °C'tan düşük olur / 45 °C'ta kalır. Dayandığı anlatım: 7–9; sahne 2, 10–11. İpuçları: "İkinci denemede çoğalan soğuk suydu; şimdi çoğalan hangisi?" · "Sıcak kabın sıcaklığı az değişirse denge 60 °C'a yakın kalır."

Gör (üçüncü deneme): `icte` 0 → 1; 4.000 ms, `out`: `ic` 60 → 50, `dis` 30 → 50. Tablo: "su · 200 g · c · 60 °C · 50 °C · −10 °C" ve "su · 100 g · c · 30 °C · 50 °C · +20 °C". Erlenmayerin oku, beherinkinin yarısı kadardır.

Sonra:
10. Sıcak su çoğalınca denge sıcaklığı sıcak suyun ilk sıcaklığına yaklaştı.
11. Kütlesi büyük olan, sıcaklığını daha az değiştirir.
12. Bir kaşık soğuk su, sıcak suyu çok az soğutur.
13. Bir bardak soğuk su ise daha çok soğutur.

Anlatım 12–13'te tablo 0,45 saydamlığa iner; ortada, figürün sağında (x 480–900, y 200–400) iki küçük çizim sırayla belirir: bir bardak sıcak su ve içine damlayan bir kaşık soğuk su (bardak 90 × 110; kaşık küçük), sonra aynı bardak ve yanında dolu bir bardak soğuk su (her biri 500 ms, `out`; sayı yazılmaz).

Defter (`Kütle`): "Kütlesi büyük olanın sıcaklığı az değişir; denge ona yakın durur."

### Sahne 4 · Deney 2: maddenin cinsi

Tahta: Figür: Ş3, `x 30, y 130, h 300`; ayarlar: `ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,3, icIcerik: 'su', disIcerik: 'yag', icte: 0`; `ic.etiket` altında "100 g su", `dis.etiket` altında "100 g zeytinyağı" (turkuaz). Tablo sahne 3'teki gibi, boş. Başta tablonun ilk iki satırı dolu gelir (kütle deneyinin birinci denemesi; "su · 100 g · c · 60 °C · 45 °C · −15 °C" ve "su · 100 g · c · 30 °C · 45 °C · +15 °C"; 400 ms, `out`); figür ikinci denemenin başlangıç durumundadır.

Anlatım:
1. Şimdi maddenin cinsine bakalım.
2. Kütleler 100 g, ilk sıcaklıklar yine 60 °C ve 30 °C.
3. İlk satırı zaten biliyoruz: iki su, 45 °C.
4. Şimdi erlenmayerde sıcak su, beherde soğuk zeytinyağı var.

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Soğuk zeytinyağı denge sıcaklığını 45 °C'a göre nasıl değiştirir?" **45 °C'tan yüksek olur; suyun sıcaklığı daha az düşer** / 45 °C'tan düşük olur / 45 °C'ta kalır. Dayandığı anlatım: sahne 2, 8–11; bu sahne 4. İpuçları: "Hangisinin öz ısısı büyük: sıcak suyunki mi, soğuk yağınki mi?" · "Öz ısısı büyük olan kütle aynıysa ısı sığası büyük olan demektir; sıcaklığı az değişir."

Gör (ikinci deneme): `icte` 0 → 1; 4.000 ms, `out`: `ic` 60 → 50, `dis` 30 → 50. Tablo: "su · 100 g · c · 60 °C · 50 °C · −10 °C" ve "zeytinyağı · 100 g · c / 2 · 30 °C · 50 °C · +20 °C". Zeytinyağının oku suyunkinin iki katı boydadır.

Sonra:
5. Sıcak su 10 °C düştü, zeytinyağı 20 °C yükseldi.
6. Suyun öz ısısı büyük; sıcaklığı daha az değişti.
7. Denge sıcaklığı suyun ilk sıcaklığına yaklaştı.
8. Şimdi yerleri değiştirelim: sıcak olan zeytinyağı, soğuk olan su.

Düzenek sıfırlanır; `icIcerik: 'yag'`, `disIcerik: 'su'`; etiketler "100 g zeytinyağı" ve "100 g su".

Sor (`c.choice`, `tag: 'Sor'`): "Sıcak zeytinyağı 60 °C, soğuk su 30 °C; ikisi 100 g. Denge sıcaklığı 45 °C'a göre nasıl olur?" **45 °C'tan düşük olur** / 45 °C'tan yüksek olur / 45 °C'ta kalır. Dayandığı anlatım: 5–8. İpuçları: "Bu kez su soğuk kaptadır; öz ısısı büyük olan hangisi?" · "Suyun sıcaklığı az değişirse denge, suyun ilk sıcaklığına yakın kalır."

Gör (üçüncü deneme): `icte` 0 → 1; 4.000 ms, `out`: `ic` 60 → 40, `dis` 30 → 40. Tablo: "zeytinyağı · 100 g · c / 2 · 60 °C · 40 °C · −20 °C" ve "su · 100 g · c · 30 °C · 40 °C · +10 °C". Zeytinyağının oku suyunkinin iki katıdır.

Sonra:
9. Denge sıcaklığı yine suyun ilk sıcaklığına yaklaştı.
10. Öz ısısı büyük olan, sıcaklığını daha az değiştirir.

Defter (`Madde`): "Öz ısısı büyük olanın sıcaklığı az değişir; denge ona yakın durur."

### Sahne 5 · Deney 3: ilk sıcaklık

Tahta: Figür: Ş3, `x 30, y 130, h 300`; ayarlar: `ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,3, icIcerik: 'su', disIcerik: 'su', icte: 0`; etiketler "100 g su", "100 g su". Tablo boş başlar; ilk iki satır dolu gelir ("su · 100 g · c · 60 °C · 45 °C · −15 °C" ve "su · 100 g · c · 30 °C · 45 °C · +15 °C").

Anlatım:
1. Son olarak ilk sıcaklıklara bakalım.
2. İki kapta da 100 g su var.
3. İlk satır yine 60 °C ve 30 °C: son sıcaklık 45 °C.
4. İkinci denemede erlenmayerdeki su 80 °C'a ısıtılıyor.

Düzenek sıfırlanır; `ic` 80 (termometre sütunu bu değere anında gider).

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Sıcak su 80 °C olursa denge sıcaklığı 45 °C'a göre nasıl olur?" **45 °C'tan yüksek olur** / 45 °C'tan düşük olur / 45 °C'ta kalır. Dayandığı anlatım: 3–4; sahne 3, 4. İpuçları: "Erlenmayer artık daha sıcak; ısı daha çok mu, daha az mı aktarılır?" · "Soğuk kap aynı; sıcak kabın verdiği ısı artarsa soğuk kabın sıcaklığı ne olur?"

Gör (ikinci deneme): `icte` 0 → 1; 4.000 ms, `out`: `ic` 80 → 55, `dis` 30 → 55. Tablo: "su · 100 g · c · 80 °C · 55 °C · −25 °C" ve "su · 100 g · c · 30 °C · 55 °C · +25 °C". İki değişim oku aynı boydadır.

Sonra:
5. Sıcak su 25 °C düştü, soğuk su 25 °C yükseldi.
6. Kütle ve madde aynı olduğundan denge sıcaklığı yine tam ortada.
7. Üçüncü denemede soğuk su 10 °C; sıcak su 60 °C.

Düzenek sıfırlanır; `ic` 60, `dis` 10.

Sor (`c.choice`, `tag: 'Sor'`): "Soğuk su 10 °C, sıcak su 60 °C; ikisi 100 g su. Denge sıcaklığı nerede olur?" **İki ilk sıcaklığın tam ortasında** / 60 °C'a yakın / 10 °C'a yakın. Dayandığı anlatım: 5–6. İpuçları: "Kütle ve madde aynı; ikinci denemede denge nerede çıkmıştı?" · "Sıcaklıklar değişti, ama iki kap hâlâ aynı su miktarında."

Gör (üçüncü deneme): `icte` 0 → 1; 4.000 ms, `out`: `ic` 60 → 35, `dis` 10 → 35. Tablo: "su · 100 g · c · 60 °C · 35 °C · −25 °C" ve "su · 100 g · c · 10 °C · 35 °C · +25 °C". İki değişim oku aynı boydadır.

Sonra:
8. Aynı su miktarında, sıcaklıklar ne olursa olsun denge tam ortada çıkıyor.

Defter (`İlk sıcaklık`): "Aynı su miktarında denge, ilk sıcaklıkların tam ortasındadır."

### Sahne 6 · Veriler ne diyor?

Tahta: figür yok. Yatay bir sıcaklık çizgisi, yedi satır (her satır tek grup; satır aralığı 55; y 130, 185, 240, 295, 350, 405, 460). Ölçek: x = 120 + (T − 10) × 10 (10 °C → 120, 80 °C → 820). Her satır: iki ilk sıcaklık arasında gri 3 birimlik çizgi; uçlarda sarı halka (yarıçap 8); aradaki son sıcaklık sarı dolu daire (yarıçap 11) ve üstünde (24 birim yukarıda) sarı sayı. Satırlar (uçlar → son sıcaklık): 1 (30, 60 → 45), 2 (30, 60 → 40), 3 (30, 60 → 50), 4 (30, 60 → 50), 5 (30, 60 → 40), 6 (30, 80 → 55), 7 (10, 60 → 35). Satır başında etiket yok. Satırlar anlatım 1–2'de yukarıdan aşağı sırayla çizilir (satır başına 300 ms, `out`; tek ana hareket). Anlatım 6'da ısı sığası büyük olan ucun halkası turkuaz ve büyük (yarıçap 14) olur: satır 2'de 30 °C ucu, satır 3'te 60 °C ucu, satır 4'te 60 °C ucu, satır 5'te 30 °C ucu; satırlar 1, 6, 7'de ikisi de aynı boyda (yarıçap 8, turkuaz değil).

Anlatım:
1. Yedi farklı denemenin sonucunu aynı sıcaklık çizgisinde görelim.
2. Her satırda uçlar ilk sıcaklıkları, nokta son sıcaklığı gösterir.
3. Son sıcaklık her satırda iki ilk sıcaklığın arasında.
4. Hiçbir zaman sıcak olanın üstüne ya da soğuk olanın altına çıkmıyor.
5. Isı sığaları eşit olduğunda nokta tam ortada.
6. Ötekilerde nokta, ısı sığası büyük olan kabın ilk sıcaklığına yakın.
7. Burada kütlesi ya da öz ısısı büyük olanın ısı sığası büyük.

Hareket: anlatım 5'te satır 1, 6, 7'nin noktaları kısa bir süre büyür (`scale` 1 → 1,3 → 1; 600 ms, `inOut`; üç satır birlikte).

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): tek satır (y 280; ölçek x = 120 + (T − 20) × 10, yani 20 °C → 120, 80 °C → 720): uçlar 20 °C ve 80 °C (sarı halka); son sıcaklık noktası 70 °C'ta (x 620), üstünde "70 °C". Soru: "Bir deneyde son sıcaklık 70 °C çıktı. Hangi kabın ısı sığası daha büyük?" **80 °C'taki kabın** / 20 °C'taki kabın / İkisininki eşit. Dayandığı anlatım: 3, 6. İpuçları: "Nokta, ısı sığası büyük olan kabın ilk sıcaklığına yakın durur; hangi uca yakın?" · "Nokta tam ortada olsaydı ısı sığaları eşit olurdu; burada ortada değil."

Gör: 80 °C ucundaki halka turkuaz ve büyük olur (300 ms, `out`).

Sonra:
8. Nokta 80 °C'a yakın; o kabın ısı sığası büyük.

### Sahne 7 · Isı sığası belirler

Tahta: yalıtılmış kutu: gri kesikli dikdörtgen (x 150–850, y 240–450), köşesinde "yalıtılmış". İçinde iki küp, A (x 320–420) ve B (x 580–680), ikisi de y 340–440, 100 × 100; kenar açık renk, içi 0,25 saydam; harfleri küpün üstünde (24). Kutunun üstünde sahne 6'daki gibi tek satır (y 150; ölçek: B ucu x 250, A ucu x 750). Başta satır yok.

Çözülmüş örnek (kitap örneğinin ikinci şıkkı):
1. Yalıtılmış kutuda A ve B cisimleri var.
2. Isı A'dan B'ye aktarılıyor; A daha sıcak.
3. A'nın ısı sığası B'ninkinden büyük.
4. Isı sığası büyük olanın sıcaklığı daha az değişir.
5. O hâlde denge sıcaklığı A'nın ilk sıcaklığına daha yakındır.

Hareket: anlatım 2'de A'dan B'ye turuncu ok (x 430 → 570, y 390; 500 ms, `out`); anlatım 2'nin sonunda çizgi ve iki sarı halka belirir (A sağda x 750, B solda x 250; 400 ms, `out`); anlatım 3'te A'nın halkası turkuaz ve büyük olur (300 ms, `out`); anlatım 5'te denge noktası x 650'de belirir (sarı dolu, yarıçap 11; 500 ms, `out`; sayı yok).

Birlikte çöz (`tag: 'Birlikte çöz'`; küpler K ve L olur; K sağda (daha sıcak uç, x 750), L solda (x 250); çizgi ve halkalar hazır; L'nin halkası turkuaz ve büyük; denge noktası yok; ok K'dan L'ye): "K'den L'ye ısı aktarılıyor ve L'nin ısı sığası daha büyük. Denge sıcaklığı nerede?" **L'nin ilk sıcaklığına yakın** / K'nin ilk sıcaklığına yakın / İkisine eşit uzaklıkta. Dayandığı anlatım: 3–5 (örnek); sahne 6, 6. İpuçları: "Isı sığası büyük olan hangisi ve onun sıcaklığı çok mu, az mı değişir?" · "Sıcaklığı az değişen kap, denge sıcaklığına kendi ilk sıcaklığına yakın bir değerde ulaşır."

Gör: denge noktası x 380'de belirir (500 ms, `out`).

Sonra:
6. Kütle iki katına çıkarsa ısı sığası da iki katına çıkar.
7. Öz ısı yarıya inerse ısı sığası da yarıya iner.

Sor (tek başına, `c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): Figür: Ş3, `x 30, y 130, h 300`; ayarlar: `ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,5, icIcerik: 'su', disIcerik: 'yag', icte: 0`; `ic.etiket` altında "100 g su", `dis.etiket` altında "200 g zeytinyağı". Sağda tablo (sahne 3'teki yer ve ölçü), başlık dolu, veri satırı yok. Soru: "Erlenmayerde 100 g su 60 °C, beherde 200 g zeytinyağı 30 °C. Denge sıcaklığı nerede?" **İki ilk sıcaklığın tam ortasında** / Zeytinyağının ilk sıcaklığına yakın / Suyun ilk sıcaklığına yakın. Dayandığı anlatım: sahne 2, 8–11; bu sahne 6–7; sahne 6, 5. İpuçları: "Yağın kütlesi iki kat, öz ısısı yarı; ısı sığası için ikisi birlikte ne yapar?" · "Isı sığaları eşit olan kaplarda denge tam ortada çıkmıştı."

Gör: `icte` 0 → 1 (900 ms, `inOut`); 4.000 ms, `out`: `ic` 60 → 45, `dis` 30 → 45. Tablo: "su · 100 g · c · 60 °C · 45 °C · −15 °C" ve "zeytinyağı · 200 g · c / 2 · 30 °C · 45 °C · +15 °C". İki değişim oku aynı boydadır.

Sonra:
8. Kütle iki kat, öz ısı yarı; ısı sığaları eşit çıktı.
9. Isı sığaları eşitse denge sıcaklığı tam ortada olur.

Defter (`Isı sığası`): "Son sıcaklık arada kalır; ısı sığası büyük olana yakın durur."

### Sahne 8 · Soğuk su miktarını sen seç

Tahta: Figür: Ş3, `x 30, y 130, h 300` (x 30–300); ayarlar: `ic: 60, dis: 30, icSeviye: 0,3, disSeviye: 0,3, icIcerik: 'su', disIcerik: 'su', icte: 0`; `ic.etiket` altında "100 g su", `dis.etiket` altında seçilen kütle ("100 g su"; kaydırıcıyla değişir). Sağda (x 360–960): üstte hedef kartı (y 100–160): "Hedef: denge sıcaklığı 40 °C"; ortada kaydırıcı (`KIT.kaydirici`; x 380–920, y 260; altı çentikli; çentikler 50, 100, 150, 200, 300, 400; her çentiğin altında rakam, 22; başlık "soğuk su (g)" üstünde, turkuaz). Kaydırıcı bırakılınca deneme başlar. Düzenek sıfırlanır (sahne 3'teki gibi) ve `disSeviye` seçilen kütleye göre ayarlanır (50 g → 0,2; 100 g → 0,3; 150 g → 0,4; 200 g → 0,5; 300 g → 0,65; 400 g → 0,8); sonra `icte` 0 → 1 (900 ms, `inOut`) ve 3.500 ms, `out`: `ic` 60 → T, `dis` 30 → T. Ölçülen değerler: 50 g → 50 °C; 100 g → 45 °C; 150 g → 42 °C; 200 g → 40 °C; 300 g → 37,5 °C; 400 g → 36 °C. Denemeler sırasında kaydırıcı kilitlidir. Hedef bulununca (200 g) hedef kartındaki "40 °C" yeşil olur (300 ms, `out`).

Anlatım:
1. Şimdi sıra sende: beherdeki soğuk suyun miktarını sen seç.
2. Erlenmayerde hep 100 g su var, 60 °C.
3. Beherdeki suyun sıcaklığı 30 °C.
4. Denge sıcaklığı 40 °C olsun; miktarı bul.

Dene (kaydırıcı): öğrenci istediği kadar dener. "Devam ›" düğmesi, hedef bulunduktan ve en az bir deneme 300 g ya da 400 g ile yapıldıktan sonra açılır. Yanlış kütlede (200 g dışında) ek bir şey söylenmez; hedef kartı gri kalır. İpucu (üç yanlış denemeden sonra; tahtaya yazı): "Soğuk suyu artırırsan denge sıcaklığı düşer."

Sonra:
5. Beherde 200 g su olunca denge sıcaklığı 40 °C çıkıyor.
6. Soğuk su çoğaldıkça denge sıcaklığı 30 °C'a yaklaşır, ama ulaşmaz.

### Çıkış soruları

1. (yeni durum, yanılgı) Yalıtılmış kapta 40 °C'taki 300 g su ile 80 °C'taki 100 g su karıştırılıyor. Denge sıcaklığı hangisine daha yakındır? **40 °C'a; kütlesi büyük olan suyun ilk sıcaklığına** / 80 °C'a; sıcak su ısı verdiği için / İkisinin tam ortasına. (sahne 3, 6)
2. (yeni durum) Aynı kütlede 80 °C'lık zeytinyağı ile 20 °C'lık su yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur? **20 °C'a daha yakındır; suyun ısı sığası büyüktür** / 80 °C'a daha yakındır; yağ daha sıcaktır / Tam ortasındadır. (sahne 4, 6)
3. (yeni durum) 70 °C'ta 50 g su ile 20 °C'ta 100 g zeytinyağı yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur? **İki ilk sıcaklığın tam ortasındadır; ısı sığaları eşittir** / Zeytinyağının ilk sıcaklığına yakındır / Suyun ilk sıcaklığına yakındır. (sahne 7)
4. (yanılgı) 20 °C ve 80 °C'taki iki su ısıl dengeye geliyor. Son sıcaklık hangisi olamaz? **85 °C** / 40 °C / 60 °C. (sahne 6)
5. (yeni durum) Bir deneyde erlenmayerdeki sıcak suyun miktarı artırılıyor; ötekiler aynı. Denge sıcaklığı nasıl değişir? **Sıcak suyun ilk sıcaklığına yaklaşır** / Soğuk suyun ilk sıcaklığına yaklaşır / Hiç değişmez. (sahne 3)

## D3 · Konu tekrarı: Isıl denge (`d3-tekrar.html`, 1 sahne + 7 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): Figür: Ş3, hazır poz (denge pozu), `x 40, y 120, h 300` (genişlik 270; x 40–310); ayarlar: `ic: 30, dis: 30, icSeviye: 0,3, disSeviye: 0,7, icIcerik: 'su', disIcerik: 'su', icte: 1`; kadraj `tum`; figür sahne boyunca yerindedir, ayar değişmez ve ok çizilmez. Sağda (x 360–960) altı kural sırayla toplanır; her satır 60 birim yüksek, satır başları y 110, 180, 250, 320, 390, 460. Her satırın solunda küçük bir çizim (x 360–420, 60 × 44), yanında kural kısa yazısı (x 440; yazı 22). Çizimler: (1) iki küçük kutu, soldaki "sıcak" tonunda, ikisinin arasında turuncu ok soldan sağa · (2) iki küçük termometre, sütunları birbirine yaklaşmış (biri 40, öteki 30 birim) · (3) iki küçük termometre, sütunları eşit (35 birim), ok yok · (4) alt alta iki eşit turuncu çubuk (her biri 44 birim) ve aralarında "=" · (5) kısa sıcaklık çizgisi, iki sarı halka ve ortada bir nokta (yakın uca değil, arada) · (6) aynı çizgi, bir ucunda turkuaz büyük halka, nokta ona yakın. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner; sahnenin sonunda hepsi yeniden tam görünür olur (500 ms, `out`).

Kısa yazılar (tahtadaki yazı; toplam 23 kelime): "ısı: sıcaktan soğuğa" · "eşitlenene kadar sürer" · "sıcaklıklar eşit: ısıl denge" · "verilen ısı = alınan ısı" · "son sıcaklık: arada" · "büyük ısı sığası: ona yakın".

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Isı, sıcaklığı yüksek olandan düşük olana aktarılır.
3. Isı aktarımı, sıcaklıklar eşitlenene kadar sürer.
4. Sıcaklıkları eşit olan maddeler ısıl dengededir; ısı alışverişi olmaz.
5. Verilen ısı, alınan ısıya eşittir.
6. Son sıcaklık, ilk sıcaklıkların arasındadır.
7. Isı sığası büyük olana yakın durur; eşitse tam ortadadır.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Buzdolabından çıkan 4 °C'lık limonata, 28 °C'lık odada masada unutuluyor. Uzun süre sonra limonatanın sıcaklığı için hangisi doğrudur? **28 °C olur; sonra ısı alışverişi biter** / 16 °C olur; ikisinin ortasıdır / 4 °C'ta kalır. (D1 sahne 2, 7)
2. (yeni durum) Aynı kütlede 60 °C'lık su ile 20 °C'lık zeytinyağı yalıtılmış kapta karışıyor. Denge sıcaklığı için hangisi doğrudur? **60 °C'a daha yakındır; suyun ısı sığası büyüktür** / 20 °C'a daha yakındır; yağ daha soğuktur / Tam ortasındadır. (D2 sahne 4, 6)
3. (yanılgı) Isıl dengedeki iki madde için hangisi doğrudur? **Sıcaklıkları eşittir; aralarında ısı alışverişi olmaz** / Sıcaklıkları eşittir; ısı bir yönde aktarılmaya devam eder / Isı sığaları eşittir. (D1 sahne 4)
4. (yeni durum) Yalıtılmış sistemde A'nın sıcaklığı 20 °C düştü, B'ninki 4 °C yükseldi. Hangisi doğrudur? **Verilen ısı alınan ısıya eşittir; B'nin ısı sığası daha büyüktür** / A daha çok ısı verdi; B'nin ısı sığası daha küçüktür / A'nın ısı sığası daha büyüktür; verilen ısı alınandan fazladır. (D1 sahne 5, D2 sahne 6)
5. (yanılgı) 10 °C ve 50 °C'taki iki su ısıl dengeye geliyor. Son sıcaklık hangisi olamaz? **55 °C** / 30 °C / 25 °C. (D2 sahne 6)
6. (yeni durum) Termometre ile vücut sıcaklığı ölçülüyor ve sütun duruyor. Okunan değer için hangisi doğrudur? **Vücut sıcaklığına çok yakındır; vücudun öz ısısı çok büyüktür** / Termometrenin ilk sıcaklığına yakındır / İkisinin tam ortasındadır. (D1 sahne 6, D2 sahne 7)
7. (yeni durum) 80 °C'taki 300 g su, 20 °C'taki 100 g suya katılıyor. Denge sıcaklığı hangisine daha yakındır? **80 °C'a; kütlesi büyük olan suyun ilk sıcaklığına** / 20 °C'a; soğuk su ısı alır / İkisinin tam ortasına. (D2 sahne 3, 6)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.4) | Karşılığı |
|---|---|
| a) Isıl dengede olma durumu ile ilgili nitelikleri tanımlar | D1 sahne 3 (ısıl denge, denge sıcaklığı), 4 (nitelikler: ısının yönü, sıcaklıkların eşitlenmesi, ısı alışverişinin bitmesi, baştan eşit sıcaklık), 5 (verilen ısı = alınan ısı), 8 (sınıflama) |
| b) Farklı sıcaklıktaki maddelerin ısıl dengeye ulaşma sürecine ilişkin veri toplayarak kaydeder | D2 sahne 3, 4, 5 (kitabın sütunlarıyla tablo; her deneme benzetimde "tahmin et–gör"); sahne 8 (kaydırıcıyla denemeler) |
| c) Isıl dengeye ulaşma süreci ile ilgili elde ettiği verileri açıklar | D2 sahne 6 (veriler tek çizgide), 7 (ısı sığasıyla açıklama) |
| Uygulama: bir bardak sıcak su ve termometre, suyun sıcaklığının ölçülmesi | D1 sahne 2 (çay ve termometreler), 6 (termometre ile ölçüm) |
| Uygulama: tahmin et–gözle–açıkla; sıcak suyun soğutulması için tahmin | D1 sahne 2 ve 3 ("Tahmin et", "Gör", sonra açıklama satırları); "soğutmak için neler yapılabilir" tartışması site dışı, sahne 2 çayın odaya ısı vererek soğuduğunu gösterir |
| Uygulama: tahminlerinden yola çıkarak ısıl dengeyi ve nitelikleri tanımlar | D1 sahne 3 (tahmin → tanım), 4 |
| Uygulama: madde miktarı, maddenin cinsi ve sıcaklık değişkenleri | D2 sahne 3 (kütle), 4 (madde), 5 (ilk sıcaklık); her deneyde tek değişken (sahne 2); deneyi öğrencinin tasarlaması site dışı (PLAN bölüm 5) |
| Uygulama: ilk sıcaklık, son sıcaklık, kütle ve öz ısı verilerinin tabloya kaydı | D2 sahne 3–5 ve 7 (tablo: madde, kütle, öz ısı, ilk sıcaklık, son sıcaklık, sıcaklık değişimi) |
| Uygulama: verileri tartışarak ısıl denge hakkında yorum | D2 sahne 6 |
| Uygulama: suyun ders sonundaki sıcaklığı ile ortam sıcaklığının karşılaştırılması | D1 sahne 2 (çay 22 °C'ta durur), 7 (süt 22 °C'ta durur) |
| Uygulama: son sıcaklıklar hakkında çıkarım ve açıklama | D2 sahne 6 (arada), 7 (ısı sığası), 8 (soğuk su artınca denge) |
| Uygulama: takım çalışmasıyla kısa rapor | Site dışı (PLAN bölüm 5) |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık | Ayrı ders yok; D1 sahne 1 hatırlatır |

Fazlalık denetimi: D1 sahne 6 (termometre ile ölçümün ısıl denge örneği olması ve vücudun öz ısısı) kitabın s. 240 metni kadardır, sayı yoktur. D1 sahne 5 ısı sığasını iki satırda anar (B2'nin hatırlatması). D2 sahne 7'deki "ısı sığaları eşitse tam ortada" ve sahne 3–5'teki "ilk sıcaklıklar değişince" gözlemleri kitapta yoktur; benzetimin verisinden çıkarılır. Isı aktarım yollarının adları, hâl değişimi, "buz + su" (kitap 10. alıştırma) ve denge sıcaklığı hesabı bu konuda yoktur (karar 5).

Eksiklik denetimi: kitabın 9. alıştırması (K, L, M) D1 sahne 7'de iki cisimle; 11. alıştırması (300 g 40 °C, 100 g 80 °C) D2 çıkış sorusu 1'dedir. Programın "deney tasarlama", "tartışma" ve "kısa rapor" etkinlikleri sınıf içi etkinlik olduğundan siteye alınmaz.
