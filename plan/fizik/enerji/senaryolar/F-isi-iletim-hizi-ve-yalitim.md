# Senaryolar — Konu F · Isı iletim hızı ve yalıtım

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.4.6, `../PLAN.md` bölüm 3 (F1, F2), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 8, 9, 15, 18, 19, 20) ve bölüm 8 ("F" satırları). Biçim örneği: `A-ic-enerji-isi-sicaklik.md`.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("80 °C" → "seksen derece", "0,039" → "sıfır virgül sıfır otuz dokuz", "W/m · K" → "watt bölü metre kelvin", "J/s" → "joule bölü saniye").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyi Ela yapar, ölçümü o okur.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster (çözülmüş örnek) → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. Benzetimde (F1 sahne 4–7) "tahmin et" (`tag: 'Tahmin et'`) sorusu ile "gör" birlikte çalışır: öğrenci tahmin eder, sonucu figürde görür.
- Renkler tema boyunca aynıdır: ısı (aktarılan enerji) turuncu, sıcaklık sarı, iç enerji mor, kütle turkuaz, soğuk ve su mavi. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz, işe yaramayan yol gridir. Tahta koyudur: çizgiler açık renklidir.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit hız).
- **Figürler.** F1 sahne 4–7'de `ILETIM` (Ş5, oran 1,4), F2 sahne 2–5'te `DUVAR` (Ş6, oran 1,1) kullanılır. Figürlerde yazı yoktur: etiket, sayı, ok ve ölçü çizgisi düz katmandadır ve figürün noktalarına bağlanır. F3 figür kullanmaz.
- Düz vektör çizimler (`dersler/f-araclar.js`):
  - **Isı oku:** turuncu. Kalınlık aktarım hızının sıralamasını gösterir: 4 birim yavaş, 9 birim orta, 14 birim hızlı. Okun yanına sayı yazılmaz; hız sayısı bu konuda yoktur.
  - **El kutusu:** 200 × 90 birimlik yuvarlatılmış kutu, içinde "el · 33 °C" (sıcaklık sarı). El çizilmez.
  - **Uç değeri:** `cubukN.uc` noktasının sağında sarı, 22 birim yazı; değer `c.tween` ile tam sayıya yuvarlanarak sayar.
  - **Süre çizgisi:** x 60 → 500, y 530, 3 birim kalın, açık gri; altında "geçen süre" (22 birim). Sayı yazılmaz.
  - **Kaşık:** 18 birim genişliğinde, 230 birim uzunluğunda çubuk; kepçe ucu 46 × 30 birim elips. Metal kaşık açık gri (`#cfd8e3`), tahta kaşık açık kahve (`#c8a273`).
  - **Isı noktaları:** turuncu daire, yarıçap 7 birim; ısının kaşığın içinden geçişini gösterir. Aralıkları geçiş hızını gösterir.
  - **Tablo:** `KIT.tablo`. Sütun genişlikleri en uzun hücreye göre yazılmıştır.
- Bu konuda formül, sembol ve hesap yoktur. Orantı yönü yalnızca sözle söylenir ("arttıkça artar", "arttıkça azalır"); "iki kat", "yarı yarıya" gibi çarpan yazılmaz. Uç termometrelerinin sayıları örnek veridir; yalnızca sıra ve "daha hızlı, daha yavaş" söylenir, sayıların oranına dayanan bir iddia kurulmaz.
- Isı iletim hızı yalnızca katı maddelerde işlenir. Sıvı ve gazlarda iletim hızı yok (tek istisna: çift camın iki camı arasındaki hava; F2 sahne 5).
- Tabloda ağaç için kitabın verdiği aralık yazılmaz; ağaç "demirden çok küçük" diye ayrı bir kartta anılır.

## F1 · Metal kaşık neden önce ısınır?

- **Fikir:** Katı maddeler ısıyı aynı hızla iletmez; ısı iletim hızı maddenin cinsine, yüzey alanına, sıcaklık farkına ve kalınlığa bağlıdır.
- **Giriş ekranı sorusu:** Aynı tencerede duran tahta kaşığı tutabiliyorsun, metal kaşığı tutamıyorsun; ikisi de aynı yemeğin içinde değil mi?
- **Örnek veri:** (1) Tencere: yemek 90 °C; bir süre sonra sap ucu: metal kaşık 58 °C, tahta kaşık 27 °C; süt örneğinde alüminyum kaşık 49 °C, ahşap kaşık 23 °C. (2) Düzenek (ILETIM): su 80 °C, uçlar 20 °C'tan başlar, "aynı süre sonra": saf alüminyum 62 °C, demir 41 °C, tahta 22 °C. Yüzey alanı: demir kesit 1 → 41 °C, kesit 2 → 55 °C. Sıcaklık farkı: demir, su 50 °C → 30 °C, su 80 °C → 41 °C. Kalınlık: demir boy 1 → 41 °C, boy 2 → 27 °C. Tablo sahnesi (düz vektör): alüminyum 60 °C, cam 33 °C, strafor 21 °C. Bank (sahne 3): el 33 °C → metal bankta 30 °C, ahşap bankta 32 °C. Sıralar Tablo 4.2'deki katsayılara uyar (alüminyum 205 > demir 80 > ağaç; ağaç üst sınırı 0,2); sayıların oranı katsayıların oranına uymaz ve uydurulmaz.
- **Kaynak:** Ders kitabı s. 247 (bank, fayans, halı), s. 248 (6. Etkinlik: tahta ve metal kaşık; üç deneyin amacı), s. 250 (ısı iletim hızı tanımı, birimi, dört etmen, Görsel 4.21), s. 251 (ısıl iletkenlik, ısı iletim katsayısı, iletken ve yalıtkan, Tablo 4.2). Kitap deney düzeneği, ölçüm, formül ve "soğuk hissetmenin nedenini" vermez. Düzenek kitap dışıdır (karar 18); sayılar örnek veridir (karar 15); "soğuk hissetmek sıcaklık değil, elden ısının çekilme hızıdır" açıklaması `PLAN.md` F1 satırından ve kitabın iki tanımından (ısı sıcaktan soğuğa, s. 213; ısı iletim hızı, s. 250) çıkarılmıştır.
- **Sınır:** Formül ve hesap yok; kitap da vermiyor. Sıvı ve gaz yok. Isı iletim katsayısı sembolsüz, yalnızca tablodaki sayı olarak anılır. İletken–yalıtkan için sayısal sınır yok (kitapta da yok). Çelik satırı ve ağaç aralığı kullanılmaz. Isı yalıtımı F2'dedir.
- **Güç kavramlar ve gösterimi:** (1) "Soğuk hissetmek" sıcaklık değildir: sahne 3'te iki bank aynı 20 °C'ta durur, elden banka giden turuncu okun kalınlığı farklıdır (14 ve 4 birim). (2) Dört etmenin her biri ayrı bir sahnedir ve her sahnede yalnızca o etmen değişir; öğrenci tabloda değişen tek şeyi görür. (3) Uçtaki termometre ısının ne kadar çabuk ulaştığını gösterir.
- **Hedeflenen yanılgı:** Metal soğuk hissettirdiği için sıcaklığı ahşaptan düşüktür.
- **Akılda kalıcı cümle:** Her katı ısıyı kendi hızında iletir.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Sıcak tencerede duran metal kaşığın sapına ısı nasıl ulaşır? **İletimle; titreşen tanecikler enerjiyi komşularına aktarır** / Konveksiyonla; ısınan madde yükselir / Işımayla; ısı dalga olarak gelir. (E) Yanlışta: "Katılarda ısı, taneciklerin titreşimi komşuya aktarmasıyla, yani iletimle yayılır."
2. Odada uzun süre bekleyen bir metal ve bir ahşap kaşık için hangisi doğrudur? **İkisinin sıcaklığı da oda sıcaklığıdır** / Metalin sıcaklığı daha düşüktür / Ahşabın sıcaklığı daha yüksektir. (D) Yanlışta: "Isıl dengede sıcaklıklar eşitlenir ve ısı alışverişi biter."

Tahta: birinci soruda tencere (x 90–420, y 330–460) ve içinde duran metal kaşık; kaşığın üstünde yatay bir tanecik dizisi (6 tanecik, yarıçap 9; x 200 → 400, y 280); sol iki tanecik 80 °C titreşiminde, öteki dördü 20 °C titreşiminde. Doğru cevaptan sonra titreşim soldan sağa tanecik tanecik yayılır (her tanecikte genlik 5 → 10; 250 ms aralık, 400 ms, `linear`). İkinci soruda yan yana iki kaşık (metal x 200, tahta x 300; ikisinin yanında sarı "20 °C"); cevaptan sonra aralarında "=" işareti belirir (300 ms, `out`).

Sonra: "Bugün katıların ısıyı hep aynı hızla iletip iletmediğine bakacağız."

### Sahne 2 · Aynı tencere, iki kaşık

Tahta: tencere (x 90–420, y 330–460; içinde açık mavi yarı saydam yemek; etiket "yemek · 90 °C": sıcaklık sarı). İçinde iki kaşık: metal kaşık kepçesi (180, 400) ucundan sap ucuna (150, 170); tahta kaşık kepçesi (330, 400) ucundan sap ucuna (360, 170). Sap uçlarının yanında küçük termometre (26 × 70 birim, sarı sütun) ve altında "metal", "tahta" etiketi (22 birim). Sağda (x 560–940, y 120–330) boş; anlatım 8'de üstte tanım satırı: "ısı iletim hızı → birim zamanda aktarılan ısı" ("ısı" turuncu). Anlatım 6'da metal kaşıkta turuncu ısı noktaları kepçeden sap ucuna 1.600 ms'de gider (`linear`); her 400 ms'de bir nokta çıkar. Tahta kaşıkta aynı yolu her 1.200 ms'de bir nokta gider. Anlatım 5'te sap ucu termometreleri 2.500 ms içinde 20 → 58 (metal) ve 20 → 27 (tahta) `linear`; değerler sarı yazıyla sayılır.

Anlatım:
1. Ela tencerede yemek pişiriyor; yemeğin sıcaklığı 90 °C.
2. Tencereye bir metal kaşık ile bir tahta kaşık koyuyor.
3. İkisinin de sapı dışarıda, oda havasında duruyor.
4. Birkaç dakika sonra sap uçlarının sıcaklığına bakıyor.
5. Metal kaşığın sapı 58 °C’ye, tahta kaşığınki 27 °C’ye çıkmış.
6. Isı yemekten kaşığın içinden geçerek sapa ilerliyor.
7. Metal kaşıkta ısı sapa çok daha hızlı ulaşıyor.
8. Birim zamanda aktarılan ısı miktarına ısı iletim hızı denir.
9. Burada iki ortam, sıcak yemek ile oda havasıdır.
10. Birimi joule bölü saniyedir; buna watt da denir.
11. Metal kaşığın ısı iletim hızı, tahta kaşığınkinden büyüktür.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): bir sürahi (x 90–330, y 330–460) "süt · 70 °C"; içinde alüminyum kaşık (sap ucu x 150) ve ahşap kaşık (sap ucu x 270), sap uçları termometreli, ikisi de 20 °C. Soru: "Ela aynı sıcak süte alüminyum ve ahşap birer kaşık koyuyor. Hangi kaşığın sapı daha çabuk ısınır?" **Alüminyum kaşığın; ısıyı daha hızlı iletir** / Ahşap kaşığın; ısıyı daha çok tutar / İkisinin de aynı; ikisi de aynı sütün içinde. Dayandığı anlatım: 6, 7, 11. İpuçları: "Hangi kaşıkta ısı sapa daha hızlı ulaşıyor? Metal kaşığa bak." · "Aynı sütün içinde olmak, ısının aynı hızla ilerlemesi demek değildir."

Gör: sap uçları 2.000 ms içinde `linear` 20 → 49 (alüminyum) ve 20 → 23 (ahşap); alüminyum kaşıkta ısı noktaları her 400 ms'de, ahşapta her 1.200 ms'de çıkar.

Defter (`Isı iletim hızı`): "Birim zamanda aktarılan ısı. Birimi watt; metal kaşıkta büyük."

### Sahne 3 · Soğuk hissetmek sıcaklık değildir

Tahta: iki bank yan yana. Sol: metal bank (levha 340 × 36, x 90–430, y 330–366, açık gri; iki ayak 24 × 70), altında "metal bank · 20 °C". Sağ: ahşap bank (aynı boyda, x 570–910, açık kahve), altında "ahşap bank · 20 °C". Her bankın üstünde el kutusu (200 × 90; sol x 160–360, sağ x 640–840; y 130–220), başta bankın 90 birim üstünde. Anlatım 3'te iki kutu da 600 ms içinde y 130 → 220'ye iner (`inOut`) ve banka değer (kutunun altı y 310 → ilk temas). Anlatım 4–6'da elden banka turuncu ok çizilir (500 ms, `out`; sol ok kalınlığı 14 birim, sağ ok kalınlığı 4 birim; x 260 ve 740, y 310 → 330). Sorudan sonra sağdaki bankın (anlatım 9) yerine fayans ve halı çizimleri gelir (aşağıda).

Anlatım:
1. Parktaki metal ve ahşap bank aynı havada uzun süre bekliyor.
2. İkisi de ortamla ısıl dengede; sıcaklıkları aynı, 20 °C.
3. Ela eliyle dokunuyor; elinin sıcaklığı 33 °C.
4. Isı sıcaktan soğuğa aktarılır; yani elden banka.
5. Metal bank, elden ısıyı çok hızlı alır.
6. Ahşap bank aynı ısıyı çok daha yavaş alır.

Sor (`c.choice`, `tag: 'Sor'`): "Ela’nın eli hangi bankta daha çok üşür?" **Metal bankta; elinden ısı daha hızlı çekilir** / Ahşap bankta; sıcaklığı daha düşüktür / İkisinde aynı; ikisinin de sıcaklığı 20 °C. Dayandığı anlatım: 2, 4, 5, 6 ve sahne 2, 8–11. İpuçları: "Sıcaklıklar aynı. Eli ne kadar çabuk ısı kaybeder? Oklara bak." · "Elden çıkan ısı ne kadar hızlıysa el o kadar üşür."

Gör: iki el kutusunun sıcaklığı, 2.000 ms içinde `linear`, sol 33 → 30 °C, sağ 33 → 32 °C (sarı yazı).

Sonra:
7. Soğuk hissettiren, bankın sıcaklığı değil; ısının elden çekilme hızıdır.
8. Yazın 40 °C’lik metal bank, ele ısıyı hızla verir.
9. Aynı odadaki fayans ve halı da aynı sıcaklıktadır.
10. Fayans çıplak ayaktan ısıyı hızlı alır; halı yavaş alır.

Tahta anlatım 8'de değişir: bank çizimleri 0,45 saydamlığa iner; üstte sağda küçük kart "yaz: bank 40 °C, el 33 °C", turuncu ok bankdan ele (kalınlık 14 birim, 500 ms, `out`). Anlatım 9–10'da bankların yerine iki kart gelir (x 90–430 ve 570–910, y 300–400): "fayans · 20 °C", "halı · 20 °C"; üstlerinde "ayak · 33 °C" kutusu; oklar ayaktan zemine (fayans 14, halı 5 birim).

Defter (`Soğuk hissetmek`): "Soğuk hissetmek sıcaklık değil, ısı iletim hızıdır."

### Sahne 4 · Birinci etmen: maddenin cinsi

Figür: `ILETIM`, `x 40, y 110, h 380` (genişlik 532). Başlangıç ayarları: `cubuk(0, { cins: 'aluminyum', boy: 1, kesit: 1, uc: 20, gorunur: 0 })`, `cubuk(1, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 0 })`, `cubuk(2, { cins: 'tahta', boy: 1, kesit: 1, uc: 20, gorunur: 0 })`, `su(80)`. Kadraj `tum`. Düz katman: `cubuk0.etiket` noktasının altında "alüminyum", `cubuk1.etiket` altında "demir", `cubuk2.etiket` altında "tahta"; `su.etiket` altında "sıcak su"; `su.termometre` noktasının sağında sarı "80 °C"; her `cubukN.uc` noktasının sağında sarı "20 °C". Figürün altında süre çizgisi (başta 0 boy). Sağda (x 600–960, y 110–470) boş; sonuç kartları orada belirir.

Anlatım 2–3'te çubuklar sırayla belirir (`gorunur` 0 → 1; 400 ms, `out`; 300 ms arayla). Gör: üç `uc` birlikte 3.000 ms `linear` 20 → 62, 20 → 41, 20 → 22; sarı değerler eşzamanlı sayar; süre çizgisi 0 → 440 birim 3.000 ms `linear`. Sonra sağdaki üç satırlık kart belirir (400 ms, `out`): "değişen: madde" · "aynı: boy, yüzey alanı, su" · "sonuç: hız maddeye bağlı" ("madde" turkuaz).

Anlatım:
1. Şimdi ısı iletimini bir düzenekle inceleyelim.
2. Çubukların bir ucu 80 °C’lik sıcak suda duruyor.
3. Öbür uçlarda birer termometre var; üçü de 20 °C gösteriyor.
4. Isı çubuğun içinden geçip serbest ucu ısıtıyor.
5. Uç ne kadar çabuk ısınırsa ısı o kadar hızlı ulaşmıştır.
6. İlk deneyde yalnızca çubukların maddesi farklı: alüminyum, demir, tahta.
7. Boyları ve yüzey alanları aynı; hepsi aynı suda duruyor.

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Aynı süre sonra hangi çubuğun ucu en geç ısınır?" **Tahta çubuğun** / Alüminyum çubuğun / Demir çubuğun. Dayandığı anlatım: 5 ve sahne 2, 11. İpuçları: "Kaşıklarda hangi madde ısıyı yavaş iletiyordu?" · "Ucu en geç ısınan, ısıyı en yavaş ileten çubuktur."

Gör: yukarıdaki hareket.

Sonra (çözülmüş örnek: neyi değiştirdik, neyi sabit tuttuk, ne çıktı):
8. Aynı sürede ısı en çok alüminyumdan geçti.
9. Demir ikinci oldu; tahta çubuğun ucu neredeyse ısınmadı.
10. Yalnızca madde farklı olduğu için sonuç maddeden gelir.
11. Isı iletim hızı maddenin cinsine bağlıdır.

Defter (`Madde`): "Isı iletim hızı maddenin cinsine bağlıdır. Alüminyum tahtadan hızlıdır."

### Sahne 5 · İkinci etmen: yüzey alanı

Figür: `ILETIM`, `x 40, y 110, h 380`. Ayarlar: `cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 1 })`, `cubuk(1, { cins: 'demir', boy: 1, kesit: 2, uc: 20, gorunur: 1 })`, `cubuk(2, { gorunur: 0 })`, `su(80)`. Kadraj `tum`. Etiketler: `cubuk0.etiket` altında "ince", `cubuk1.etiket` altında "geniş"; ikisinin altında (y 500) ortak "demir"; öteki sahne 4'teki gibi (sıcak su, 80 °C, uç değerleri, süre çizgisi). Çubuk 2 yuvası bu sahnede boş. Sahne 4'ten geçişte üç çubuk 400 ms'de kaybolur (`gorunur` 1 → 0, `in`); çubuk 0 ve 1 demir olarak 400 ms'de yeniden belirir (`gorunur` 0 → 1, `out`).

Anlatım:
1. İkinci deneyde Ela iki demir çubuk kullanıyor.
2. İkisi de aynı boyda ve aynı sıcak suda duruyor.
3. Yalnızca ısının geçtiği yüzey alanı farklı.
4. Sağdaki çubuğun yüzey alanı daha büyük.

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Aynı süre sonra hangi çubuğun ucu daha çok ısınır?" **Yüzey alanı büyük olanın** / Yüzey alanı küçük olanın / İkisinin de aynı. Dayandığı anlatım: 1–4 ve sahne 4, 5. İpuçları: "Isının geçtiği yol geniş olunca aynı anda daha çok ısı geçer mi?" · "İki çubuğun aynı olduğu şeyleri say; fark yalnızca yüzey alanı."

Gör: `uc` değerleri birlikte 3.000 ms `linear` 20 → 41 (çubuk 0) ve 20 → 55 (çubuk 1); süre çizgisi 0 → 440, 3.000 ms `linear`.

Sonra:
5. Yüzey alanı büyük çubuğun ucu daha çabuk ısındı.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "Yüzey alanı büyük çubuğun ucu daha çabuk ısındı. Demek ki ısı iletim hızı …… ."; ilk cümle dolu gelir): "Boşluğa hangisi yazılır?" **daha büyüktür** / daha küçüktür / aynıdır. Dayandığı anlatım: sahne 4 anlatım 5; bu sahne 5. İpuçları: "Uç çabuk ısınıyorsa ısı o kadar hızlı ulaşmıştır." · "Hızlı ulaşan ısının iletim hızı büyüktür."

Sonra:
6. Yüzey alanı arttıkça ısı iletim hızı artar.

Defter (`Yüzey alanı`): "Yüzey alanı arttıkça ısı iletim hızı artar."

### Sahne 6 · Üçüncü etmen: sıcaklık farkı

Figür: `ILETIM`, `x 40, y 110, h 380`. Ayarlar: `cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 1 })`, çubuk 1 ve 2 `gorunur: 0` (300 ms, `in`), `su(50)`. Kadraj `tum`. Etiketler: `cubuk0.etiket` altında "demir"; `su.termometre` sağında sarı "50 °C". Sağda (x 600–960, y 110–260) sonuç listesi: her deneme bitince bir satır eklenir (400 ms, `out`; 22 birim): satır 1 "50 °C → 30 °C"; satır 2 "80 °C → 41 °C" (sol sayı su, sağ sayı uç; sarı).

Anlatım:
1. Üçüncü deneyde Ela tek bir demir çubuk kullanıyor.
2. Önce suyu 50 °C yapıyor; aynı sürede uç 30 °C’ye çıkıyor.
3. Çubuğu soğutup bu kez suyu 80 °C yapacak.
4. Su ile oda arasındaki sıcaklık farkı bu kez daha büyük.

Hareket: anlatım 2 sırasında `uc` 20 → 30, 3.000 ms `linear`, süre çizgisi 0 → 440. Anlatım 3'te uç 30 → 20 (500 ms, `inOut`), süre çizgisi 440 → 0 (500 ms, `inOut`), `su` 50 → 80 (800 ms, `inOut`; sarı yazı eşzamanlı).

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Su 80 °C olunca aynı sürede uç …?" **daha çok ısınır** / daha az ısınır / yine 30 °C’ye çıkar. Dayandığı anlatım: 1–4. İpuçları: "Su ile oda arasındaki fark büyüdü; ısı aktarımı hızlanır mı yavaşlar mı?" · "Çubuk, süre ve madde aynı; yalnızca su değişti."

Gör: `uc` 20 → 41, 3.000 ms `linear`; süre çizgisi 0 → 440; satır 2 belirir.

Sonra:
5. Sıcaklık farkı büyüyünce uç daha çabuk ısındı.
6. Sıcaklık farkı arttıkça ısı iletim hızı artar.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): solda kutu (x 90–330, y 160–300) "iç · 22 °C" (sıcaklık sarı); ortada duvar kesiti (x 450–490, y 120–340, açık gri); sağda iki kart (x 640–910): "1. gün · dış 5 °C" (y 130–210) ve "2. gün · dış –5 °C" (y 250–330). Soru: "Evin içi 22 °C. Bir gün dışarısı 5 °C, ertesi gün –5 °C. Evden dışarıya ısı hangi gün daha hızlı gider?" **–5 °C’lik gün; sıcaklık farkı daha büyük** / 5 °C’lik gün; dışarısı daha sıcak / İkisinde de aynı hızda; evin içi aynı. Dayandığı anlatım: 4–6. İpuçları: "İç ile dış arasındaki farkı iki günde karşılaştır." · "Fark büyüyünce ısı iletim hızı artar."

Gör: iç kutudan duvarın içinden her karta turuncu ok (x 330 → 640; 500 ms, `out`): üstteki (5 °C) 9 birim, alttaki (–5 °C) 14 birim kalın; y 170 ve 290.

Defter (`Sıcaklık farkı`): "Sıcaklık farkı arttıkça ısı iletim hızı artar."

### Sahne 7 · Dördüncü etmen: kalınlık

Figür: `ILETIM`, `x 40, y 110, h 380`. Ayarlar: `cubuk(0, { cins: 'demir', boy: 1, kesit: 1, uc: 20, gorunur: 1 })`, `cubuk(1, { cins: 'demir', boy: 2, kesit: 1, uc: 20, gorunur: 1 })`, `cubuk(2, { gorunur: 0 })`, `su(80)`. Kadraj `tum`. Etiketler: `cubuk0.etiket` altında "kısa", `cubuk1.etiket` altında "uzun"; ortak "demir"; `cubuk0.orta` ve `cubuk1.orta` noktalarında açık renkli ölçü çizgisi (ısının geçtiği yol boyunca) ve üzerinde "kalınlık" (22 birim). Anlatım 2'de ölçü çizgileri belirir (400 ms, `out`).

Anlatım:
1. Dördüncü deneyde iki demir çubuğun yalnızca boyu farklı.
2. Boy, ısının geçeceği yolun uzunluğudur; buna kalınlık denir.
3. İkisi de aynı yüzey alanında, aynı sıcak suda duruyor.

Tahmin (`c.choice`, `tag: 'Tahmin et'`): "Aynı süre sonra hangi çubuğun ucu daha çok ısınır?" **Kısa olanın** / Uzun olanın / İkisinin de aynı. Dayandığı anlatım: 1–3. İpuçları: "Isı hangi çubukta daha kısa yol alır?" · "Yol uzadıkça ısının ucu ısıtması zorlaşır."

Gör: `uc` değerleri 3.000 ms `linear` 20 → 41 (kısa) ve 20 → 27 (uzun); süre çizgisi 0 → 440.

Sonra:
4. Yolu uzun olan çubuğun ucu daha geç ısındı.
5. Kalınlık arttıkça ısı iletim hızı azalır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): aynı maddeden iki duvar kesiti yan yana (ince: 40 × 160 birim, x 150–190; kalın: 120 × 160 birim, x 630–750; y 160–320); ikisinin yüzeyi eşit (aynı yükseklik, aynı genişlik), iki yanda sarı "iç 22 °C" ve "dış 5 °C". Soru: "Aynı maddeden, aynı alanda iki duvar var; biri ince, öteki kalın. Hangisinden ısı daha hızlı geçer?" **İnce duvardan** / Kalın duvardan / İkisinden de aynı hızla. Dayandığı anlatım: 2, 4, 5. İpuçları: "Isı hangi duvarda daha kısa yol alıyor?" · "Kalınlık arttıkça ısı iletim hızı azalır."

Gör: ince duvardan kalın (14 birim), kalın duvardan ince (4 birim) turuncu ok (500 ms, `out`).

Defter (`Kalınlık`): "Kalınlık arttıkça ısı iletim hızı azalır."

### Sahne 8 · Isı iletim katsayısı: madde madde karşılaştırma

Tahta: tablo (`KIT.tablo`; x 80, y 100; sütunlar 260 / 340; satır yüksekliği 52; yazı 22). Başlık satırı: "Madde · Isı iletim katsayısı (W/m · K)". Satırlar (büyükten küçüğe, anlatımla tek tek açılır, 400 ms, `out`): "elmas · 2.300" · "saf alüminyum · 205" · "demir · 80" · "cam · 0,8" · "strafor · 0,039". Tablonun altında (x 80–710, y 440–500) ayrı kart: "ağaç · demirden çok küçük". Sağda (x 740–940) iki ayraç; sayısal sınır yoktur, ayraçlar yalnızca büyük ve küçük katsayılı alanı gösterir. Anlatım 8'de üstte ayraç (y 152–308: elmas, alüminyum ve demir satırları) ve yanında "iletken" (22 birim) belirir; anlatım 9'da altta ayraç (y 360–500: strafor satırı ve ağaç kartı) ve yanında "yalıtkan" belirir (400 ms, `out`). Cam satırı (y 308–360) ayraçların dışında kalır.

Anlatım:
1. Maddelerin ısıyı iletme hızı, bir sayıyla karşılaştırılır.
2. Bu sayıya ısı iletim katsayısı denir; tabloda 25 °C için verilir.
3. Elmasın katsayısı en büyük; elmas ısıyı en hızlı iletir.
4. Metallerin katsayıları genellikle büyüktür; alüminyum demirden büyüktür.
5. Deneyde en hızlı alüminyum, sonra demir, en yavaş tahta çıkmıştı.
6. Tablo bu sırayı doğruluyor: ağaç demirden çok küçük.
7. Katsayı ne kadar büyükse madde ısıyı o kadar hızlı iletir.
8. Katsayısı büyük maddelere ısı iletkeni denir.
9. Katsayısı küçük maddeler ısıyı yavaş iletir; bunlar ısı yalıtkanıdır.
10. Strafor bu tabloda çok küçük katsayılı bir yalıtkandır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta tablo kalır, yanına soru kartı gelir: "Ela aynı düzenekte üç çubuk deniyor: alüminyum, cam ve strafor. Uçların ısınma sırası (en çabuktan en geçe) hangisidir?" **Alüminyum, cam, strafor** / Strafor, cam, alüminyum / Cam, alüminyum, strafor. Dayandığı anlatım: 3–7 ve tablo. İpuçları: "Katsayısı büyük olanın ucu daha çabuk ısınır. Tabloda sayılara bak." · "205, 0,8 ve 0,039 sayılarını büyükten küçüğe sırala."

Gör: üç çubuk (ILETIM kullanılmaz; düz vektör, üç yatay çubuk, x 150–600, y 160, 220, 280, kalınlık 22) uçlarındaki sarı değer 3.000 ms `linear` sayar: alüminyum 20 → 60, cam 20 → 33, strafor 20 → 21. Süre çizgisi 0 → 440.

Defter (`Isı iletim katsayısı`): "Katsayısı büyük madde iletken, küçük madde yalıtkandır."

### Sahne 9 · Dört etmeni ayır

Tahta: üstte iki kutu (y 70–250): "Isı iletim hızı artar" (x 90–480) ve "Isı iletim hızı azalır" (x 520–910). Altta (y 300–420, x 150–850) sırayla gelen cümle kartı. `KIT.sinifla` ile kart başına seçim; kart yerinde küçülüp söner (`scale` 1 → 0,6; 400 ms, `in`), kutusunda kısa adı belirir.

Anlatım:
1. Şimdi dört etmeni günlük değişikliklere uygulayalım.
2. Her değişiklik ısı iletim hızını artırıyor mu, azaltıyor mu?

Kartlar (soru: "Bu değişiklikte ısı iletim hızı ne olur?"; kutudaki kısa ad parantezde):
1. "Aynı duvarın yüzey alanı büyür." (yüzey alanı büyür) → **Artar**. Neden: "Evet. Yüzey alanı arttıkça ısı iletim hızı artar." İpucu: "Dört etmenden hangisi değişiyor? Arttıkça ne olduğunu hatırla."
2. "Duvar daha kalın yapılır." (kalınlık artar) → **Azalır**. Neden: "Evet. Kalınlık arttıkça ısı iletim hızı azalır." İpucu: "Isı daha uzun yol alır."
3. "İç ve dış ortam arasındaki sıcaklık farkı küçülür." (fark küçülür) → **Azalır**. Neden: "Evet. Sıcaklık farkı küçülünce ısı iletim hızı da küçülür." İpucu: "Fark arttıkça hız artıyordu; şimdi fark küçülüyor."
4. "Tahta çubuğun yerine alüminyum çubuk konur." (tahta yerine alüminyum) → **Artar**. Neden: "Evet. Alüminyumun katsayısı çok büyüktür." İpucu: "Tablodaki iki katsayıyı karşılaştır."
5. "Isının geçtiği yol kısalır." (kalınlık azalır) → **Artar**. Neden: "Evet. Kalınlık azalınca ısı iletim hızı artar." İpucu: "Kalınlık arttıkça azalıyordu; şimdi kalınlık azalıyor."
6. "Alüminyum yerine strafor kullanılır." (alüminyum yerine strafor) → **Azalır**. Neden: "Evet. Strafor çok küçük katsayılı bir yalıtkandır." İpucu: "İki katsayıyı tablodan karşılaştır."

Sonra (kutular 0,45'e iner; ortada sahne 1'deki tencere ve iki kaşık yeniden belirir, 500 ms, `out`):
3. Tencereye dönelim: metal kaşığın katsayısı tahtanınkinden çok büyük.
4. O yüzden metal kaşığın sapı çabuk ısınır, tahtanınki ısınmaz.
5. Her katı ısıyı kendi hızında iletir.

Defter (`Katılar`): "Her katı ısıyı kendi hızında iletir."

### Çıkış soruları

1. (yeni durum) Kışın parkta metal bank ahşap banktan daha soğuk hissediliyor. Neden? **Metal bank elden ısıyı daha hızlı çeker** / Metal bankın sıcaklığı havanınkinden düşüktür / Ahşap bank ele ısı verir. (sahne 3)
2. (yeni durum) Aynı sıcak suya aynı boyda ve kalınlıkta bir demir ve bir cam çubuk batırılıyor (demir 80, cam 0,8). Hangisinin ucu daha çabuk ısınır? **Demir çubuğun; katsayısı daha büyüktür** / Cam çubuğun; katsayısı daha küçüktür / İkisinin de aynı sürede. (sahne 8)
3. Hangi değişiklik bir duvardan geçen ısı iletim hızını azaltır? **Duvarı daha kalın yapmak** / Duvarın yüzey alanını büyütmek / İç ile dış arasındaki sıcaklık farkını büyütmek. (sahne 5, 6, 7, 9)
4. (yeni durum) Aynı metal levhanın bir yüzünde 90 °C’lik su var. Öbür yüzünde bir kez 20 °C’lik, bir kez 60 °C’lik hava bulunuyor. Hangisinde ısı daha hızlı geçer? **20 °C’lik havada; sıcaklık farkı daha büyük** / 60 °C’lik havada; hava daha sıcak / İkisinde de aynı hızda. (sahne 6)
5. (yanılgı) Ela kışın dışarıda duran bir tahta ve bir demir çubuğu eline alıyor. Hangisi doğrudur? **İkisinin sıcaklığı aynıdır; demir elden ısıyı daha hızlı çeker** / Demirin sıcaklığı tahtadan düşüktür / Tahta ele ısı verdiği için daha sıcaktır. (sahne 3, 4)

## F2 · Yalıtım: ısıyı yavaşlatmak

- **Fikir:** Isı iletim hızına dair çıkarımlar yalıtımda sınanır: ısıyı yavaş ileten malzeme, kalın duvar, küçük pencere ve çift cam ısı alışverişini iki yönde de yavaşlatır; bu da enerji ve para tasarrufu sağlar.
- **Giriş ekranı sorusu:** Mimar olsaydın, yazı çok sıcak geçen bir şehirde faturası düşük gelen bir evi nasıl tasarlardın?
- **Örnek veri:** (1) Duvar (DUVAR), ısıtıcı kapalı bir gece, iç başlangıcı 22 °C, dış 0 °C: yalıtımsız → iç 9 °C, yalıtımlı → iç 17 °C. Yaz günü, iç başlangıcı 25 °C, dış 38 °C: yalıtımsız → iç 33 °C, yalıtımlı → iç 28 °C. (2) Pencere, yalıtımlı duvar, aynı kış gecesi: tek cam → iç 17 °C, çift cam → iç 19 °C. (3) Termos: 70 °C çay, birkaç saat sonra bardakta 40 °C, termosta 62 °C. Sıralar yalıtımın ısıyı yavaşlatması kuralına uyar; sayıların oranı hiçbir yerde iddia edilmez.
- **Kaynak:** Ders kitabı s. 249 (6. Etkinlik 8: altı yapı; 9: mimar sorusu; 10: enerji tasarrufu, kaynakların verimli kullanımı, sürdürülebilirlik), s. 250 (Görsel 4.21: duvar kesiti, A, x, T iç, T dış), s. 251 (yalıtım uygulamaları: motor kapağı, evler, termal kumaş; Tablo 4.2), s. 252 (bina yalıtımı: dıştan strafor, çatıda strafor ya da cam yünü, küçük pencere, iki ya da üç katlı cam, iki cam arasındaki havanın kısmen boşaltılması, kalın duvar; iletimin istendiği uygulamalar; çözümlü örnek: çift cam), s. 253 (15. Alıştırma, termos performans görevi). Kitap "ısı yalıtımı" için tanım cümlesi, altı yapı için hangisinin daha iyi yalıttığı, mimar sorusunun cevabı, termosun kesiti, enerji tasarrufu ve sürdürülebilirlik için ayrı metin vermez; yalıtım tanımı `PLAN.md` F2 satırından ve kitabın "ısı yalıtkanı" tanımından kurulur, termos karar 18 kadardır, tasarruf cümleleri kitabın 10. maddesi ve s. 251'deki "tasarruf ve konfor sağladığı için tercih edilir" cümlesi kadardır.
- **Sınır:** Hesap ve formül yok. Termosun kesiti çizilmez; yalnızca adı ve "çift cidar arasındaki boşluk ısıyı yavaşlatır" cümlesi geçer. Altı yapının hiçbiri "en iyi" ilan edilmez. Projeler, STEM termos tasarımı, öz değerlendirme, "Türkiye ve toplum yararına yalıtım örnekleri oluşturma" ve beyin fırtınası sınıf içi etkinliktir, siteye taşınmaz. İklim değişikliği köprüsü (programın "köprü kurma" cümlesi) alınmadı.
- **Güç kavramlar ve gösterimi:** (1) Yalıtım ısıtmaz ve durdurmaz, yavaşlatır: sahne 2'de ok ince çizilir, tamamen kaybolmaz. (2) Yalıtım iki yöne de çalışır: aynı duvar kışın ve yazın, okun yönü değişir, kalınlığı aynı kalır (sahne 2 ve 3). (3) Mimar sorusu bir tasarım kararıdır; her karar bir gerekçe taşır.
- **Hedeflenen yanılgı:** Yalıtım yalnızca kışın işe yarar ya da ısıyı üretir ve durdurur.
- **Akılda kalıcı cümle:** Yalıtım ısıyı durdurmaz, yavaşlatır.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Isı iletim katsayısı küçük olan bir madde ısıyı nasıl iletir? **Yavaş iletir; ısı yalıtkanıdır** / Hızlı iletir; ısı iletkenidir / Hiç iletmez. (F1) Yanlışta: "Katsayısı küçük madde ısıyı yavaş iletir ve ısı yalıtkanı sayılır."
2. Kışın sıcak bir odanın duvarında ısı hangi yönde aktarılır? **İçeriden dışarıya** / Dışarıdan içeriye / Aktarılmaz. (A1) Yanlışta: "Isı hep sıcaklığı yüksek olandan düşük olana aktarılır."

Tahta: birinci soruda iki kart yan yana (x 90–430 ve 570–910, y 200–300): "strafor · 0,039" ve "demir · 80"; cevaptan sonra strafor kartının altında ince turuncu ok (kalınlık 4 birim), demir kartının altında kalın ok (14 birim) belirir (500 ms, `out`). İkinci soruda duvar kesiti (x 450–490, y 120–340); solunda sarı "iç · 22 °C", sağında sarı "dış · 0 °C"; ok cevaptan sonra belirir.

Sonra: "Bugün bu bilgiyi evlerde, pencerelerde ve termosta kullanacağız."

### Sahne 2 · Kışın aynı duvar

Figür: `DUVAR`, `x 40, y 90, h 400` (genişlik 440). Başlangıç ayarları: `ayar({ yalitim: 0, cam: 1, ic: 22, dis: 0 })`. Kadraj `duvar`. Düz katman: `ic.termometre` noktasının yanında sarı iç değer, `dis.termometre` yanında sarı "0 °C"; `duvar.ic` noktasının altında "iç", `duvar.dis` altında "dış" (22 birim). Sağda (x 560–940, y 110–200) kart "ısıtıcı kapalı" (gri; anlatım 2'de belirir, 400 ms, `out`). Süre çizgisi x 60 → 500, y 530.

Hareket: anlatım 3'te `duvar.ic` → `duvar.dis` turuncu ok (kalınlık 14 birim; 500 ms, `out`). Anlatım 4 sırasında `ic` 22 → 9, 3.000 ms `linear`; süre çizgisi 0 → 440, 3.000 ms `linear`. Anlatım 5'te `ic` 9 → 22 (600 ms, `inOut`), süre çizgisi 440 → 0 (600 ms, `inOut`), ardından `yalitim` 0 → 1 (1.000 ms, `inOut`; `yalitim` noktasının yanında "yalıtım" etiketi); ok kalınlığı 14 → 5 (500 ms, `inOut`). Anlatım 6 sırasında `ic` 22 → 17, 3.000 ms `linear`; süre çizgisi 0 → 440. Anlatım 8'de ok sönmez; ince kalır.

Anlatım:
1. Ela’nın evi kışın ısıtılıyor; içeride 22 °C, dışarıda 0 °C.
2. Duvarda yalıtım yok; bir gece ısıtıcı kapanıyor.
3. Isı sıcaktan soğuğa, yani içeriden dışarıya aktarılıyor.
4. Sabaha kadar iç sıcaklık 9 °C’ye düşüyor.
5. Ertesi gün duvara bir yalıtım katmanı takılıyor.
6. Aynı gece iç sıcaklık yalnızca 17 °C’ye düşüyor.
7. Yalıtım ısıyı yavaş ileten bir katmandır; ev daha geç soğur.
8. Isıyı yavaş ileten malzemeyle ısı geçişini azaltmaya ısı yalıtımı denir.
9. Yalıtım ısıyı üretmez ve durdurmaz; yalnızca yavaşlatır.

Defter (`Yalıtım`): "Yalıtım ısıyı durdurmaz, yavaşlatır. Ev daha geç soğur."

### Sahne 3 · Yazın aynı duvar

Figür: `DUVAR`, `x 40, y 90, h 400`; kadraj `duvar`. Sahne 2'den geçiş: `yalitim` 1 → 0 (1.000 ms, `inOut`), aynı anda `dis` 0 → 38 ve `ic` 17 → 25 (1.000 ms, `inOut`); sarı yazılar eşzamanlı sayar. Düz katman sahne 2'deki gibi. Sağda (x 560–940) boş; sonra soru kartı orada gelir.

Hareket: anlatım 2'de `duvar.dis` → `duvar.ic` turuncu ok (kalınlık 14 birim; 500 ms, `out`; yön sahne 2'nin tersi). Anlatım 3 sırasında `ic` 25 → 33, 3.000 ms `linear`; süre çizgisi 0 → 440. Anlatım 4'te `ic` 33 → 25 (600 ms, `inOut`), `yalitim` 0 → 1 (1.000 ms, `inOut`), ok kalınlığı 14 → 5 (500 ms, `inOut`); sonra `ic` 25 → 28, 3.000 ms `linear`; süre çizgisi 0 → 440.

Anlatım:
1. Yaz geldi; dışarısı 38 °C, evin içi 25 °C.
2. Isı yine sıcaktan soğuğa aktarılır; bu kez dışarıdan içeriye.
3. Yalıtımsız evde öğleden akşama iç sıcaklık 33 °C’ye çıkıyor.
4. Aynı gün yalıtım takılırsa iç sıcaklık yalnızca 28 °C’ye çıkıyor.
5. Aynı katman ısıyı bu kez de yavaşlatıyor.

Birlikte çöz (`tag: 'Birlikte çöz'`; kart: "Yazın ısı dıştan içeriye akar. Yalıtımlı duvarda bu akış …… ."; ilk cümle dolu gelir): "Boşluğa hangisi yazılır?" **yavaşlar** / durur / hızlanır. Dayandığı anlatım: 2, 4, 5 ve sahne 2, 7, 9. İpuçları: "Yalıtım kışın ısıyı yavaşlatıyordu; yazın ne yapar?" · "Yalıtım ısıyı durdurmaz; yalnızca yavaşlatır."

Sonra:
6. Yalıtım ısıyı iki yönde de yavaşlatır.
7. Kışın evi daha geç soğutur; yazın daha geç ısıtır.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): solda iki giysi silueti (kısa kollu üst; 140 × 150 birim; x 150 ve 330, y 150–300; açık gri çizgi), altlarında "kış", "yaz". Soru: "Termal kumaştan yapılmış bir giysi kışın sıcak tutuyor. Yazın aynı giysi ne yapar?" **Dışarıdan vücuda ısı geçişini yavaşlatır** / Vücuda ısı verir / Yalnızca kışın işe yarar; yazın etkisi yoktur. Dayandığı anlatım: 6, 7. İpuçları: "Yalıtım kışın ve yazın aynı işi yapar: ısıyı yavaşlatır." · "Yazın ısı hangi yönde akıyor? Dışarıdan vücuda."

Gör: "kış" giysisinde vücuttan dışarıya, "yaz" giysisinde dışarıdan vücuda ince turuncu ok (4 birim; 500 ms, `out`).

Sonra:
8. Giysilerde de kışın ve yazın ısı iletimi en aza indirilir.

Defter (`İki yön`): "Yalıtım kışın da yazın da ısıyı yavaşlatır."

### Sahne 4 · Duvarda iki yol: kalınlık ve katman

Figür: `DUVAR`, `x 40, y 90, h 400`; kadraj `duvar`. Ayarlar: `ayar({ yalitim: 0, cam: 1, ic: 22, dis: 0 })`. `kalinlik.a` ile `kalinlik.b` noktaları arasında açık renkli ölçü çizgisi, üstünde "kalınlık" (22 birim); anlatım 2'de belirir (400 ms, `out`). Sağda (x 560–940) iki duvar kesiti: ince duvar (40 × 130 birim, x 600–640, y 130–260) ve kalın duvar (110 × 130 birim, x 760–870, y 130–260); altlarında "ince", "kalın"; her duvarın içinden soldan sağa birer turuncu ok (y 195; ince duvarda x 560 → 680, kalın duvarda x 700 → 900): ince duvarda 14 birim, kalın duvarda 4 birim kalın (anlatım 2'de, 500 ms, `out`). Anlatım 4'te `yalitim` 0 → 1 (1.000 ms, `inOut`); `duvar.dis` noktasının dışında "strafor" etiketi. Anlatım 5'te sağ panelde iki kart (y 330–400): "strafor · 0,039", "çimento harcı · 1,6" (400 ms, `out`). Anlatım 6'da sağ panel temizlenir ve çatı kesiti çizilir (x 600–900, y 150–330): üçgen çatı, altında tavan çizgisi, ikisinin arasında 16 birim kalın açık sarı katman ("cam yünü" ya da "strafor" etiketi altında).

Anlatım:
1. Mühendisler ve mimarlar yalıtımda ısı iletim hızının etmenlerinden yararlanır.
2. Birinci yol duvarı kalın yapmaktır; kalınlık arttıkça hız azalır.
3. İkinci yol, duvarı katsayısı küçük bir malzemeyle kaplamaktır.
4. Duvarlar çoğunlukla dıştan strafor ile kaplanır.
5. Strafor 0,039; çimento harcı 1,6: strafor çok daha yavaş iletir.
6. Çatı ile tavanın arasına da strafor ya da cam yünü serilir.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): iki kart (x 90–430 ve 570–910, y 200–300): "cam yünü · 0,04" ve "cam · 0,8". Soru: "Ela çatı katına aynı kalınlıkta bir katman serecek: cam yünü ya da cam. Hangisi evi daha iyi yalıtır?" **Cam yünü; katsayısı çok daha küçüktür** / Cam; katsayısı daha büyüktür, ısıyı iyi tutar / İkisi aynı; ikisi de katmandır. Dayandığı anlatım: 3, 5, 6 ve F1 sahne 8. İpuçları: "Yalıtım için katsayısı küçük olan malzeme seçilir." · "0,04 ile 0,8’i karşılaştır."

Gör: cam yünü kartının altında ince ok (4 birim), cam kartının altında orta kalın ok (9 birim) (500 ms, `out`).

Defter (`Duvar`): "Kalın duvar ve katsayısı küçük kaplama ısıyı yavaşlatır."

### Sahne 5 · Pencere: küçük alan, çift cam

Tahta (anlatım 1–3): sağda (x 560–940, y 110–330) iki pencere yan yana: büyük pencere (120 × 120 birim, x 580–700) ve küçük pencere (60 × 60 birim, x 780–840), duvar parçası içinde; altlarında "büyük", "küçük". Oklar: büyük pencereden 14 birim, küçük pencereden 4 birim (500 ms, `out`). Anlatım 4'ten sonra bu panel 400 ms'de söner (`in`) ve figür belirir. Figür: `DUVAR`, `x 40, y 90, h 400`; kadraj `cam`; ayar `{ yalitim: 1, cam: 1, ic: 22, dis: 0 }`; `cam` noktasının yanında "iki cam arasında hava" etiketi (cam: 2 olunca; 22 birim). Çözülmüş örnek bu sahnenin ikinci yarısıdır (kitabın örneği, sözel).

Hareket: anlatım 5'te `cam` 1 → 2 (600 ms, `inOut`). Karşılaştırma: tek camda `ic` 22 → 17 (3.000 ms, `linear`, süre çizgisi 0 → 440); sonra `ic` 17 → 22 (600 ms, `inOut`), `cam` 2 olur, `ic` 22 → 19 (3.000 ms, `linear`). Ok kalınlığı tek camda 9 birim, çift camda 4 birim.

Anlatım:
1. Pencereler mümkün olduğunca küçük yapılır.
2. Yüzey alanı küçüldükçe ısı iletim hızı azalır.
3. Pencereler ayrıca iki ya da üç katlı camla yapılır.
4. Ela’nın penceresi çift camlı; camların arasında kuru hava var.
5. Aynı gecede tek camlı pencerede iç sıcaklık 17 °C’ye düştü.
6. Çift camlı pencerede iç sıcaklık yalnızca 19 °C’ye düştü.
7. Havanın katsayısı camınkinden küçüktür: hava 0,023; cam 0,8.
8. Camların arasındaki havanın bir bölümü boşaltılır.
9. Böylece konveksiyonla ısı geçişi de engellenir.
10. Sonuçta çift camda ısının aktarım hızı düşer.

Sor (`c.choice`, `tag: 'Sor'`; yeni durum): tahta değişir (`c.clearSay()`): üç pencere kartı yan yana (x 90–310, 390–610, 690–910; y 200–330): "küçük, tek cam" · "büyük, çift cam" · "küçük, çift cam". Soru: "Ela oturma odasına üç pencereden birini seçecek. Isı iletim hızı en küçük olan hangisidir?" **Küçük, çift camlı** / Büyük, çift camlı / Küçük, tek camlı. Dayandığı anlatım: 1–3, 8–10. İpuçları: "Yüzey alanı küçülünce ve cam sayısı artınca hız küçülür." · "İki özelliğin ikisi de hızı azaltıyor mu?"

Gör: üç kartın altında oklar: 9 birim, 14 birim, 4 birim (500 ms, `out`).

Defter (`Pencere`): "Küçük pencere ve çift cam ısı iletim hızını azaltır."

### Sahne 6 · Altı yapıda ne görüyorsun?

Tahta: altı kart, 3 × 2 (her kart 280 × 170; x 50, 360, 670; y 90, 290). Kartın üst yarısında 90 birim yüksekliğinde vektör çizim, altında ad (22 birim): "ahşap ev" · "taş ev" · "tuğla ev" · "kerpiç ev" · "keçe çadır" · "yeşil çatılı bina". Çizimler (yeşil kullanılmaz):
- ahşap ev: koyu kahve gövde (100 × 55), koyu çatı, iki küçük pencere (14 × 14), baca;
- taş ev: iki katlı, alt kat gri taş dokulu, üst kat kahve (100 × 80);
- tuğla ev: iki katlı, yatay ince çizgili tuğla rengi (`#b8774f`) gövde, gri çatı, iki baca;
- kerpiç ev: bej (`#d9c3a0`) yuvarlak gövde, koni çatı;
- keçe çadır: krem yarım küre (120 × 70), koyu kapı;
- yeşil çatılı bina: üç katlı gri gövde; çatıda kahve toprak şeridi (12 birim kalın) ve üstünde açık gri küçük üçgen bitkiler.

Anlatım 1'de kartlar 0,3 saydamlıktan 1'e gelir (her biri 300 ms `out`, 150 ms arayla).

Anlatım:
1. Ela altı farklı yapıya bakıyor.
2. Her yapının ısı iletimini önce malzemesinin cinsi belirler.
3. Keçe çadırın örtüsü keçedir; keçenin katsayısı 0,037’dir.
4. Çatıdaki toprak katmanı, ısının geçeceği yola eklenen bir kalınlıktır.
5. Yapılarda yalıtımı etkileyen görünür özellikler aranabilir.

Dene (`KIT.sinifla`; üç kutu: "madde" (x 90–340), "yüzey alanı" (x 380–630), "kalınlık" (x 670–920); y 70–250; altta kart y 300–420). Kart soru: "Bu özellik dört etmenden hangisiyle ilgili?" Kartlar:
1. "Ahşap evin duvarı ahşaptır." → **madde**. Neden: "Evet. Maddenin cinsi ısı iletim hızını etkiler." İpucu: "Duvar hangi maddeden yapılmış?"
2. "Ahşap evin pencereleri küçüktür." → **yüzey alanı**. Neden: "Evet. Pencere küçüldükçe ısı iletim hızı azalır." İpucu: "Küçülen şey pencerenin alanı."
3. "Keçe çadırın örtüsü keçedir." → **madde**. Neden: "Evet. Keçenin katsayısı küçüktür." İpucu: "Örtü hangi maddeden?"
4. "Çatının üstüne toprak katmanı serilmiştir." → **kalınlık**. Neden: "Evet. Isının geçeceği yol uzar." İpucu: "Katman ısının yolunu uzatıyor."
5. "Taş evin duvarı taştır." → **madde**. Neden: "Evet. Duvarın maddesi ısı iletim hızını etkiler." İpucu: "Duvar hangi maddeden?"

Sonra:
6. Hiçbir yapıyı tek başına en iyi ilan edemeyiz.
7. Karar, bölgeye ve ihtiyaca göre etmenlerin birlikte değerlendirilmesidir.

Defter (`Yapılar`): "Yapının yalıtımı malzemesine, alanına ve kalınlığına bağlıdır."

### Sahne 7 · Mimar sensin

Tahta: ortada ev kesiti (x 300–700, y 110–330; duvar, çatı, tavan, pencere), başlangıçta ince duvarlı (30 birim), çıplak, büyük tek camlı pencereli ve çatı ile tavan arası boş. Üstte (y 60) başlık: "yazı sıcak bölge · düşük fatura". Her karar `c.choice` ile verilir; doğru seçimden sonra ev kesiti değişir.

Anlatım:
1. Ela mimar oldu; yazı çok sıcak geçen bir bölgede ev tasarlıyor.
2. Ev ailenin bütçesine yük olmamalı; serinletme masrafı az olmalı.
3. Kararlarını ısı iletim hızının etmenlerine dayandıracak.

Karar 1 (`c.choice`, `tag: 'Sor'`; yeni durum): "Duvar nasıl olsun?" **Kalın; ısı daha uzun yoldan geçer, hız azalır** / İnce; ısı daha çabuk dışarı çıkar / Kalın; sıcaklık farkını büyütür. Dayandığı anlatım: sahne 4, 2. İpuçları: "Kalınlık arttıkça ısı iletim hızı azalır." · "Duvarın kalınlığı iç ile dış arasındaki sıcaklık farkını değiştirmez." Gör: duvar 30 → 80 birim (800 ms, `inOut`).

Karar 2: "Dış yüzey nasıl kaplansın?" **Strafor; katsayısı çok küçüktür** / Demir levha; katsayısı çok büyüktür / Kaplanmasın; duvar zaten yeter. Dayandığı anlatım: sahne 4, 3–5. İpuçları: "Yalıtım için katsayısı küçük olan malzeme seçilir." · "Demirin katsayısı 80’dir; strafor 0,039." Gör: duvarın dışında 20 birim kalın açık sarı strafor şeridi (800 ms, `out`).

Karar 3: "Pencere nasıl olsun?" **Küçük ve çift camlı; alan küçük, iki cam arasında hava var** / Büyük ve tek camlı; daha çok ışık alır / Büyük ve çift camlı; alan büyüse de cam yeter. Dayandığı anlatım: sahne 5, 1–10. İpuçları: "Hem alanı küçültmek hem cam sayısını artırmak hızı azaltır." · "Yüzey alanı büyüdükçe ısı iletim hızı artar." Gör: pencere 120 × 120 → 60 × 60 ve iki cam çizilir (800 ms, `inOut`).

Karar 4: "Çatı ile tavan arasına ne serilsin?" **Cam yünü ya da strafor** / Çimento harcı / Demir levha. Dayandığı anlatım: sahne 4, 6. İpuçları: "Hangisinin katsayısı küçük?" · "Çimento harcı 1,6; demir 80." Gör: çatı katında açık sarı katman (16 birim kalın; 800 ms, `out`).

Sonra (ev kesitinde yalıtılmış duvar ve çatıdan kalın turuncu ok yerine ince ok, 4 birim, 500 ms, `inOut`):
4. Bu evde yazın ısı dışarıdan içeriye çok yavaş geçer.
5. Ev daha az ısınır; serinletmek için daha az enerji gerekir.
6. Daha az enerji, daha düşük fatura demektir.

Defter (`Mimar`): "Kalın duvar, yalıtım katmanı, küçük çift camlı pencere."

### Sahne 8 · Yalıtım ve tasarruf

Tahta: ortada turuncu daire (merkez 500, 280; yarıçap 70) içinde "daha az enerji"; çevresinde üç kart (x 90–330, y 100–180 · x 380–620, y 400–480 · x 670–910, y 100–180): "aile bütçesi" · "kaynaklar" · "ülke ekonomisi"; daireden kartlara üç çizgi. Kartlar anlatım 2, 3, 4'te sırayla belirir (400 ms, `out`).

Anlatım:
1. Yalıtım malzemesi kullanmak enerji tasarrufu sağlar.
2. Yalıtılmış ev, ısınmak ve serinlemek için daha az enerji ister.
3. Daha az enerji, ailenin bütçesinde daha az harcama demektir.
4. Ülke düzeyinde bu, enerji kaynaklarının verimli kullanılması demektir.
5. Kaynakları verimli kullanmak, sürdürülebilirliğe de katkı sağlar.

Sor (`c.choice`, `tag: 'Sor'`): "Bir mahallede çoğu ev yalıtılıyor. Ülke düzeyinde ne beklenir?" **Daha az enerji harcanır; kaynaklar daha verimli kullanılır** / Daha çok enerji harcanır; yalıtım enerji üretir / Hiçbir şey değişmez; enerji tasarrufu yalnızca aileyi ilgilendirir. Dayandığı anlatım: 1–5. İpuçları: "Yalıtım ısı kaybını azaltır; ısıtmak için gereken enerjiye ne olur?" · "Aile bütçesine katkı veren tasarruf ülke ekonomisine de katkı verir."

Defter (`Tasarruf`): "Yalıtım enerji tasarrufu sağlar; aileye ve ülkeye katkıdır."

### Sahne 9 · Termos ve iletimin istendiği yerler

Tahta: solda bardak (açık ağızlı; 90 × 110 birim, x 150–240, y 200–310; etiket "bardak"), sağda termos (kapalı silüet; 90 × 220 birim, x 380–470, y 100–320; iç yapısı çizilmez; etiket "termos"). İkisinin içinde "çay" ve sarı "70 °C". Hareket: anlatım 4–5 sırasında sarı değerler 3.000 ms `linear` 70 → 40 (bardak) ve 70 → 62 (termos); bardaktan çıkan ok 14 birim, termostan çıkan ok 4 birim (500 ms, `out`). Sağda (x 560–940) anlatım 7'den sonra üç küçük çizim belirir (400 ms, `out`; 80 birim yüksekliğinde): kalorifer peteği, tencere (gövde ve sap), çaydanlık.

Anlatım:
1. Ela’nın bardağında ve termosunda 70 °C’lik çay var.
2. Termos da ısıyı yavaşlatmak için üretilmiş bir üründür.
3. Çift cidar arasındaki boşluk ısıyı yavaşlatır.
4. Birkaç saat sonra bardaktaki çay 40 °C’ye düşüyor.
5. Termostaki çay ise yalnızca 62 °C’ye düşüyor.
6. Termos, çayın ısıyı dışarıya vermesini yavaşlatır.
7. Bazen de ısının hızlı iletilmesi istenir.
8. Kalorifer petekleri, katsayısı büyük malzemelerden yapılır.
9. Çaydanlık ve tencerenin tabanı ile gövdesi metaldendir.
10. Sapları ise ısıyı yavaş iletmek için yalıtkan malzemeden yapılır.

Dene (`KIT.sinifla`; iki kutu: "Isıyı hızlı iletmeli" (x 90–480) ve "Isıyı yavaş iletmeli" (x 520–910); y 70–250; altta kart y 300–420). Kart soru: "Bu parça ısıyı nasıl iletmeli?" Kartlar:
1. "Kalorifer peteği" → **Hızlı**. Neden: "Evet. Sıcak su ısıyı odaya hızlı iletmeli; katsayısı büyük malzeme seçilir." İpucu: "Petek ısıyı odaya mümkün olduğunca çabuk iletmeli."
2. "Tencere sapı" → **Yavaş**. Neden: "Evet. Sap yalıtkan olduğu için elin yanmaz." İpucu: "Sapı tutan el ısınmamalı."
3. "Tencere tabanı" → **Hızlı**. Neden: "Evet. Ocaktaki ısı yemeğe hızlı geçmeli." İpucu: "Isı ocaktan yemeğe ulaşmalı."
4. "Binanın dış duvar kaplaması" → **Yavaş**. Neden: "Evet. Yalıtım için katsayısı küçük malzeme seçilir." İpucu: "Yalıtım ısıyı yavaşlatır."
5. "Çaydanlık gövdesi" → **Hızlı**. Neden: "Evet. Gövde ısıyı suya hızlı iletmeli." İpucu: "Gövde ısıyı suya aktarır."
6. "Otomobil motorunun üstündeki kapak" → **Yavaş**. Neden: "Evet. Motorun ısısı yolcuları doğrudan etkilememeli." İpucu: "Motorun ısısı yolcuya geçmemeli."

Sonra:
11. Malzeme, ısının hızlı mı yavaş mı iletileceğine göre seçilir.
12. Yalıtım ısıyı durdurmaz, yavaşlatır.

Defter (`Seçim`): "Yalıtım ısıyı durdurmaz, yavaşlatır."

### Çıkış soruları

1. (yanılgı) Yalıtımlı bir evin duvarı için hangisi doğrudur? **Isı geçişi yavaşlar; kışın da yazın da işe yarar** / Isı geçişi tamamen durur / Yalnızca kışın işe yarar. (sahne 2, 3)
2. (yeni durum) Mimar dış duvar için üç kaplama düşünüyor: strafor (0,039), çimento harcı (1,6), demir (80). Aynı kalınlıkta hangisi ısıyı en yavaş iletir? **Strafor** / Çimento harcı / Demir. (sahne 4)
3. (yeni durum) Bir odanın penceresi büyük ve tek camlı. Hangi değişiklik ısı iletim hızını azaltır? **Pencereyi küçültüp çift camlı yapmak** / Pencereyi büyütüp tek camlı bırakmak / Camı demir levhayla değiştirmek. (sahne 5)
4. (yeni durum) Termosta sıcak çay saatlerce sıcak kalıyor. Bunun nedeni hangisidir? **Isı dışarıya çok yavaş geçer** / Termos çaya sürekli ısı verir / Termos ısıyı tamamen durdurur. (sahne 9)
5. (yeni durum) Ela’nın ailesi evlerini yalıttırıyor. Hangisi beklenir? **Isıtma ve serinletme için daha az enerji harcanır** / Ev kendiliğinden ısınır / Isı evden hiç dışarı çıkmaz. (sahne 7, 8)

## F3 · Konu tekrarı: Isı iletim hızı ve yalıtım (`f3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (metal ve tahta kaşık, ikisinin sap ucunda farklı kalınlıkta turuncu ok · "watt" yazısı ve bir ok · yüzey alanı büyüyen levha ve sıcaklık farkı büyüyen iki sarı sütun · kalınlaşan duvar, ok incelir · "büyük", "küçük" katsayı kartları ve iletken–yalıtkan ayracı · duvarın iki yanında kış ve yaz okları, ikisi de ince) ve deftere düşer. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner; sahnenin sonunda hepsi yeniden tam görünür olur. Figür kullanılmaz.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Her katı ısıyı kendi hızında iletir.
3. Birim zamanda aktarılan ısı, ısı iletim hızıdır; birimi watt.
4. Yüzey alanı ve sıcaklık farkı arttıkça ısı iletim hızı artar.
5. Kalınlık arttıkça ısı iletim hızı azalır.
6. Katsayısı büyük madde iletken, küçük madde yalıtkandır.
7. Yalıtım ısıyı durdurmaz; iki yönde de yavaşlatır.

Sorular (`quiz`, karışık sırada):

1. (yeni durum) Çıplak ayakla odaya giren Ela, fayansı aynı odadaki ahşap parkeden daha soğuk hissediyor. Hangisi doğrudur? **Fayans ayaktan ısıyı daha hızlı alır; ikisinin sıcaklığı aynıdır** / Fayansın sıcaklığı parkeden düşüktür / Parke ayağa ısı verir. (F1 sahne 3)
2. (yeni durum) Aynı maddeden, aynı alanda iki levha var; biri ince, öteki kalın. İkisi de aynı iki ortamı ayırıyor. Hangisinden ısı daha hızlı geçer? **İnce levhadan** / Kalın levhadan / İkisinden de aynı hızla. (F1 sahne 7)
3. (yeni durum) Aynı düzenekte üç çubuk deneniyor: cam yünü (0,04), saf alüminyum (205), cam (0,8). Uçların ısınma sırası (en çabuktan en geçe) hangisidir? **Alüminyum, cam, cam yünü** / Cam yünü, cam, alüminyum / Cam, alüminyum, cam yünü. (F1 sahne 8)
4. (yeni durum) Klimalı bir odanın içi 24 °C. Dışarısı bir gün 30 °C, ertesi gün 40 °C. Dışarıdan içeriye ısı hangi gün daha hızlı gelir? **40 °C’lik gün; sıcaklık farkı daha büyük** / 30 °C’lik gün; dışarısı daha serin / İkisinde de aynı hızda. (F1 sahne 6)
5. (yanılgı) Yalıtımlı bir evin duvarı için hangisi doğrudur? **Isı geçişi yavaşlar; kışın da yazın da işe yarar** / Isı geçişi tamamen durur / Yalnızca kışın işe yarar. (F2 sahne 2, 3)
6. (yeni durum) Bir odanın penceresi küçültülüp tek camlıdan çift camlıya çevriliyor. Isı iletim hızı nasıl değişir? **Azalır; alan küçülür ve iki cam arasındaki hava yavaşlatır** / Artar; cam sayısı arttı / Değişmez; pencere hâlâ camdır. (F2 sahne 5)
7. (yeni durum) Bir tencerenin gövdesi metal, sapı yalıtkan malzemedendir. Bunun nedeni hangisidir? **Gövde ısıyı yemeğe hızlı iletmeli; sap yavaş iletmeli** / İkisi de ısıyı hızlı iletmeli / İkisi de ısıyı yavaş iletmeli. (F2 sahne 9)
8. Isı iletim hızının birimi hangisidir? **Joule bölü saniye (watt)** / Joule / Derece santigrat. (F1 sahne 2)

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.4.6) | Karşılığı |
|---|---|
| a) Katı maddelerde ısı iletim hızı ile ilgili deneyimlerini gözden geçirir | F1 sahne 2 (tahta ve metal kaşık), sahne 3 (bank, fayans, halı) |
| Uygulama: sınıfta farklı cisimlere dokunma, hissedilenleri ifade etme | F1 sahne 3 (durum olarak anlatılır; dokunmak site dışıdır) |
| Uygulama: tahta kaşık ve metal kaşığın sıcaklık değişim hızını karşılaştırma | F1 sahne 2 |
| Uygulama: deneyimleri arkadaşlarla paylaşma | Site dışı (sınıf içi); F1 sahne 1, 2, 3 deneyimleri durum olarak sunar |
| Uygulama: ısı iletim maşası ya da başka düzenekle deney tasarlama | F1 sahne 4–7 (benzetim; düzenek hazır, öğrenci değişkeni seçmez, tahmin eder); deney tasarlamak site dışıdır (`PLAN.md` bölüm 5, "destekleme") |
| b) Isı iletim hızını etkileyen etmenlere ilişkin çıkarım yapar | F1 sahne 4 (madde), 5 (yüzey alanı), 6 (sıcaklık farkı), 7 (kalınlık); sahne 9 |
| Uygulama: gözlemlerden etmenlere çıkarım | F1 sahne 4–7 ("Sonra" bölümleri ve defter satırları) |
| Uygulama: çıkarımları yalıtım kavramıyla ilişkilendirme | F2 sahne 2, 3 |
| Uygulama: farklı bina fotoğraflarında yalıtımı etkileyen etmenleri bulma | F2 sahne 6 (altı yapı, sınıflama) |
| Uygulama: mimar sorusu, gerekçeli cevap (OB3, E1.6) | F2 sahne 7 (dört tasarım kararı, her biri gerekçeli şıklarla) |
| Uygulama: yalıtım malzemesinin enerji tasarrufuna katkısı (beyin fırtınası) | F2 sahne 8 (tek sahne; beyin fırtınası sınıf içidir) |
| Uygulama: kaynakların verimli kullanımı, Türkiye ekonomisi, sürdürülebilirlik (OB8, SDB3.3) | F2 sahne 8 (kitabın metni kadar) |
| Uygulama: farklı malzemelerle yalıtım örnekleri oluşturma (D5.1, D17.2, D19.4, SDB2.3) | Site dışı (ürün oluşturma); F2 sahne 4–7 örnekleri tek tek gösterir |
| Uygulama: ısı iletim katsayıları tablosunu gösterme, gerekçeyle tartışma | F1 sahne 8 (tablo, 5 satır ve ağaç kartı); F2 sahne 4, 5, 7 (katsayıyla gerekçe) |
| c) Çıkarımlarını değerlendirir | F2 sahne 4, 5, 7, 9 (yalıtım açısından) |
| Uygulama: performans görevi, STEM döngüsüyle termos tasarımı, proje, puanlama anahtarı, öz değerlendirme, yeniden tasarım (KB3.1, SDB1.2, SDB1.3) | Site dışı. Termos F2 sahne 9'da yalnızca adıyla ve "çift cidar arasındaki boşluk ısıyı yavaşlatır" düzeyinde |
| Köprü kurma: ısı yalıtımı, ısı aktarım yolları ve günlük hayat; iklim değişikliği | Isı yalıtımı ve iletim yolu F2'de (çift camda konveksiyon, F2 sahne 5); iklim değişikliği ilişkisi alınmadı |
| Anahtar kavramlar: ısı iletim hızı, ısı iletim katsayısı, iletken, yalıtkan, yalıtım | F1 sahne 2, 8; F2 sahne 2; F3 |
| Temel kabuller: maddenin hâlleri, ısı ve sıcaklık | Ayrı ders yok; F1 sahne 1 hatırlatır |
| Fazla olan | Yok. Elmas ve strafor satırları, ağaç kartı ve termal giysi tablodaki ve kitaptaki örneklerdir; motor kapağı ve giysi kitabın s. 251 örneğidir. |
| Eksik olan | Programın sınıf içi etkinlikleri (dokunma deneyi, deney tasarlama, ürün ve proje); iklim değişikliği köprüsü. |

Fazlalık denetimi: ısı iletim hızı için formül, orantı sabiti, iletim hızı ve katsayı için simge, "iki kat/yarı yarıya" çarpanı yok; sıvı ve gazlarda iletim hızı yok (tek istisna: kitabın çift cam örneğindeki hava); termosun kesiti yok; altı yapıdan hiçbiri "en iyi" ilan edilmez; çelik satırı ve ağaç aralığı kullanılmaz.
