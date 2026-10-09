# Senaryolar — Konu A · Geometrik dönüşümler

Yazıldı: 9 Ekim 2026. Dayanak: `../MUFREDAT.md` MAT.9.4.1, `../PLAN.md` bölüm 3 (A1–A6), bölüm 7 (karar 7, 8, 12, 13) ve bölüm 8 ("A" satırları). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Bu dosya öteki konu senaryolarının örneğidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir (A′ "A üssü", A″ "A iki üssü", d₁ "d bir", 90° "doksan derece", |OA| "O A uzunluğu").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı hiçbir yerde görmez.
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" hangi cümleler olduğunu söyler. Kalın şık doğru cevaptır; derste şıkların sırası karıştırılır.
- Sıra her derste aynıdır: hatırla (temanın ilk dersi dışında) → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor (`tag: 'Sıra sende'`) → gör → adlandır (defter) → dene → 4–5 çıkış sorusu.
- Renkler tema boyunca aynıdır: şekil mavi, görüntüsü turuncu, yansıma doğrusu mor (kesikli), dönme merkezi ve açısı sarı, öteleme oku yeşil. Ara görüntü (iki yansımanın ilki) soluk turuncudur.
- Çizimler birim kareli zemindedir. Aşağıdaki "(sütun, satır)" çiftleri yalnızca dersi yazan içindir (zeminin sol üst köşesi (0, 0), satır aşağı doğru artar); tahtaya koordinat yazılmaz.
- "Ters çevrilme" yansımaya, "baktığı yönün değişmesi" dönmeye aittir; "yön" tek başına bu ikisi için kullanılmaz (`PLAN.md` karar 12). Ters çevrilme, köşeleri A → B → C sırasıyla dolaşan yay biçimli okla gösterilir.
- Motifler şematik çizimdir; gerçek bir eserin adı ya da kopyası kullanılmaz.

## A1 · Yansıma ve öteleme: yer değişir, ölçü değişmez

- **Fikir:** Yansıma ve öteleme şeklin yerini değiştirir; kenar, açı, çevre ve alan değişmez: görüntü şekle eştir.
- **Giriş ekranı sorusu:** Bir kilimde aynı motif hem yan yana hem ayna gibi ters durur; ikisi de aynı motif midir?
- **Kaynak:** Ders kitabı s. 14–17, 19 (yansıma, özellik tablosu, doğru üstündeki nokta), s. 19–22 (öteleme, bileşenleri, yansımayla karşılaştırma). Görüntüyü bulma ön bilgidir (temel kabul); çizim öğretilmez.
- **Sınır:** Koordinat yok. Dönme bu derste geçmez.
- **Güç kavramlar ve gösterimi:** (1) "Değişmez": şekil ile görüntünün ölçüleri sağdaki tabloda yan yana. (2) Ters çevrilme: köşeleri dolaşan ok şekilde saatin tersine, görüntüde saat yönünde döner. (3) Eşlik: kâğıt yansıma doğrusundan katlanır, görüntü şeklin üstüne oturur.
- **Hedeflenen yanılgı:** "Ayna görüntüsü ters döndüğü için başka bir şekildir; eş değildir."
- **Akılda kalıcı cümle:** Yer değişir, ölçü değişmez.

Zemin: 16 sütun, 11 satır; tablo zeminin sağında. Üçgen ABC: A (2, 3), B (2, 7), C (5, 7); |AB| = 4, |BC| = 3, |AC| = 5 birim; dik açı B'de; açılar yaklaşık 37° (A) ve 53° (C).

### Sahne 1 · Yansıma

Tahta: zeminde mavi ABC üçgeni. Sütun 8'de dikey mor d doğrusu. Köşeler sırayla doğrunun öbür yanına geçer (C önce: doğruya 3 birim, uzaklık çizgisi iki yanda sayılır); turuncu A′B′C′ oluşur: A′ (14, 3), B′ (14, 7), C′ (11, 7). Doğrunun üstünde bir P noktası parlar, yerinde kalır. Sonra sağda kenar tablosu satır satır dolar.

Anlatım:
1. Bir kilim ustası motiflerini önce kareli kâğıda çizer.
2. Bu üçgen bir motifin parçası; köşeleri A, B ve C.
3. Usta üçgeni d doğrusuna göre yansıtıyor.
4. Her köşe doğrunun öbür yanına, aynı uzaklığa geçer. (ön bilgi)
5. C köşesi doğruya 3 birim uzakta; görüntüsü C′ de öyle.
6. Üç köşeyi birleştirince üçgenin görüntüsü çıkar: A′B′C′.
7. d doğrusuna yansıma doğrusu denir.
8. Doğrunun üstündeki bir nokta yansıyınca yerinde kalır.
9. Şimdi üçgen ile görüntüsünün kenarlarını karşılaştıralım.
10. AB kenarı 4 birim; görüntüsü A′B′ de 4 birim.
11. BC kenarı 3 birim; B′C′ de 3 birim.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloda iki satır dolu (AB 4 · A′B′ 4; BC 3 · B′C′ 3), üçüncü satır "AC 5 · A′C′ ?". AC kenarı 5 birim. A′C′ kaç birimdir? **5 birim** / 3 birim / 8 birim. Dayandığı anlatım: 10–11. İpuçları: "3 birim B′C′ kenarıydı; A′C′ en uzun kenarın görüntüsü." · "Yansıma kenarı uzatmaz; öteki iki kenar da aynı kalmıştı."

Sonra:
12. Üç kenarın üçü de aynı kaldı.

### Sahne 2 · Ne değişti, ne değişmedi?

Tahta: aynı üçgen ve görüntüsü. Sağdaki tablo: "kenarlar: aynı" satırı hazır; "açılar", "çevre", "alan" satırları sırayla dolar, altına "değişen" başlığıyla "yer" ve "ters çevrilme" gelir. Açı yayları iki üçgende aynı renkte belirir (dik açı işareti, 37°, 53°). Sonda iki üçgenin içinde köşeleri dolaşan yay biçimli oklar.

Anlatım:
1. Kenarlar aynı kaldı; peki açılar?
2. B köşesindeki açı dik; B′ köşesindeki de dik.
3. Öteki iki açı da görüntüde aynı ölçüde.
4. Çevre, kenarların toplamıdır: 4 + 3 + 5 = 12 birim.
5. Görüntünün kenarları aynı; çevresi de 12 birim.
6. Alan dik kenarlardan bulunur: 4 × 3 ÷ 2 = 6 birimkare.

Soru (`tag: 'Sıra sende'`): Görüntünün dik kenarları da 4 ve 3 birim. Alanı kaç birimkaredir? **6** / 12 / 3. Dayandığı anlatım: 6. İpuçları: "12 çevrenin ölçüsüydü; alan dik kenarlardan bulunur." · "Dik kenarlar yine 4 ve 3 birim; alan küçülmez."

Sonra:
7. Kenar, açı, çevre, alan: dördü de değişmedi.
8. Değişen ilk şey üçgenin yeri.
9. Bir şey daha değişti: görüntü ters çevrilmiş.
10. A'dan B'ye, sonra C'ye gidelim: saatin tersi yönünde dönüyoruz.
11. Görüntüde aynı sırayla gidince saat yönünde dönüyoruz.
12. Ayna görüntüsü böyledir: sağ ile sol yer değiştirir.

Defter ("Yansıma"): **Yansıma:** kenar, açı, çevre, alan değişmez; şekil ters çevrilir.

### Sahne 3 · Öteleme

Tahta: temiz zemin. Mavi ABC: A (2, 5), B (2, 9), C (5, 9). 8 birim sağa, 3 birim yukarı kayar; turuncu A′B′C′: A′ (10, 2), B′ (10, 6), C′ (13, 6). Üç köşeden görüntülerine yeşil oklar. Sağda aynı tablo (kenarlar 4, 3, 5).

Anlatım:
1. Usta aynı üçgeni bu kez kaydırıyor: 8 birim sağa, 3 birim yukarı.
2. Bu dönüşümün adı öteleme.
3. Ötelemede her nokta aynı doğrultuda, aynı yönde, aynı uzaklıkta kayar.
4. Üç köşenin okları aynı boyda ve birbirine paralel.
5. Kenarlar yine 4, 3 ve 5 birim.
6. Açılar, çevre ve alan da aynı.

Soru (`tag: 'Sıra sende'`): Yansımada görüntü ters çevrilmişti. Ötelenen üçgen için hangisi doğrudur? **Ters çevrilmedi; yalnızca yeri değişti** / Ters çevrildi; sağı ile solu yer değiştirdi / Yeri de değişmedi. Dayandığı anlatım: sahne 2, 9–12 ve tahtadaki şekil. İpuçları: "Köşeleri dolaş: iki üçgende de aynı yönde dönüyorsun." · "Üçgen 8 birim sağa, 3 birim yukarı gitti."

Gör: iki üçgende de dolaşma okları saatin tersi yönünde belirir.

Sonra:
7. Öteleme şekli ters çevirmez; yalnızca kaydırır.

Defter ("Öteleme"): **Öteleme:** her nokta aynı yönde, aynı uzaklıkta kayar; ölçüler değişmez.

### Sahne 4 · Hangi dönüşüm?

Tahta, birinci bölüm (dene): sahne 1'in üçgeni ve dikey d doğrusu. Tabloda kenarlar (4, 3, 5) ile "C'nin doğruya uzaklığı" ve "C′'nün doğruya uzaklığı". Kaydırıcı (`c.slider`, "Yansıma doğrusunun yeri", sütun 6–9, adım 1; `noWait` yönerge: "Doğruyu kaydır; kenarlara ve uzaklıklara bak."): görüntü doğruyla birlikte yer değiştirir, kenarlar değişmez, iki uzaklık hep eşittir. "Devam" ile biter. Sonra doğru sütun 8'e döner; AA′ (12 birim) ve CC′ (6 birim) çizgileri uzunluklarıyla belirir.

Anlatım:
1. Doğru nereye giderse gitsin kenarlar değişmiyor.
2. Köşe ile görüntüsü, doğruya hep eşit uzaklıkta.
3. Yansımada doğruya yakın köşe az, uzak köşe çok yer değiştirir.
4. Ötelemede ise bütün köşeler aynı uzaklıkta yer değiştirir.

Tahta, ikinci bölüm (sınıflandırma): zemin temizlenir. Bayrak biçimli bir motif (direği ve sağa bakan üçgen ucu olan, simetrik olmayan şekil) ile görüntüsü; doğru ve oklar çizilmez. Üç çift sırayla gelir; her birinde soru (`tag: 'Sıra sende'`): Bu çiftte hangi dönüşüm var? Şıklar: Yansıma / Öteleme.

- Çift 1: görüntü 6 birim sağda, 2 birim aşağıda, aynı duruşta. **Öteleme**. İpucu: "Bayrağın ucu iki şekilde de sağa bakıyor; ters çevrilmemiş." Gör: köşelerden eşit yeşil oklar.
- Çift 2: görüntü dikey bir doğruya göre yansımış (ucu sola bakıyor). **Yansıma**. İpucu: "Bayrağın ucu öbür yana bakıyor: şekil ters çevrilmiş." Gör: mor yansıma doğrusu ortada belirir.
- Çift 3: görüntü yatay bir doğruya göre yansımış (baş aşağı, ucu yine sağa bakıyor). **Yansıma**. İpucu: "Köşeler aynı uzaklıkta kaymamış: direğin tepesi çok, dibi az yer değiştirmiş." Gör: yatay mor doğru belirir.

Sonra:
5. Ters çevrilmişse yansıma, yalnızca kaymışsa öteleme.

### Sahne 5 · Eş şekiller

Tahta: sahne 1'in üçgeni, görüntüsü ve d doğrusu. Görüntü doğrudan katlanır gibi üçgenin üstüne gelir ve çakışır; sonra yerine döner. Küçük bir ikinci örnek: ötelenen üçgen geri kayar, çakışır. Üçüncü örnek: eğik bir doğruya göre yansıtılmış bir dörtgen katlanır, çakışır. Sonda tahtanın üstünde önerme: "Yansıma ya da öteleme altındaki görüntü, şekle eştir."

Anlatım:
1. Kâğıdı yansıma doğrusundan katlayalım.
2. Görüntü üçgenin tam üstüne oturdu: hiçbir yeri taşmıyor.
3. Üst üste tam oturan şekillere eş şekiller denir. (ön bilgi)
4. Ötelenen üçgeni geri kaydırınca o da tam oturur.
5. Başka bir şekille, başka bir doğruyla denesek sonuç değişmez.
6. Bunu bir önerme olarak yazalım.
7. Bir şeklin yansıma ya da öteleme altındaki görüntüsü şekle eştir.

Soru (`tag: 'Sıra sende'`; yeni durum; tahtada kenarları 4 ve 3 birim olan bir dikdörtgen, köşegeni "5", yanında dikey yansıma doğrusu; görüntü cevaptan sonra belirir): Köşegeni 5 birim olan bu dikdörtgen doğruya göre yansıtılıyor. Görüntünün köşegeni kaç birimdir? **5 birim** / 10 birim / Doğrunun yerine bağlıdır. Dayandığı anlatım: 7. İpuçları: "Yansıma uzunluğu iki katına çıkarmaz; görüntü şekle eştir." · "Doğru kayınca görüntünün yeri değişir, ölçüleri değişmez."

Sonra:
8. Görüntü eş olduğuna göre bütün uzunlukları aynıdır: köşegeni de.
9. Yer değişir, ölçü değişmez.

Defter ("Eşlik"): **Yansıma ve öteleme:** görüntü şekle eştir. Yer değişir, ölçü değişmez.

### Çıkış soruları

1. (yanılgı) Bir üçgen bir doğruya göre yansıtıldı; görüntüsü ters çevrilmiş duruyor. Üçgen ile görüntüsü için hangisi doğrudur? **Eştirler; kenarları ve açıları aynıdır** / Eş değildirler; ters çevrilince açılar değişir / Eş değildirler; uzak köşeler çok kaydığı için kenarlar uzar. (sahne 5)
2. (yeni durum) Bir kenarı 5 cm olan kare 7 cm sola ötelendi. Görüntünün çevresi kaç cm'dir? **20 cm** / 27 cm / 13 cm. (sahne 3)
3. Yansımada aşağıdakilerden hangisi değişir? **Şeklin yeri** / Şeklin alanı / Şeklin iç açıları. (sahne 2)
4. (yeni durum) Bir bayrak motifinin direği solda, ucu sağa bakıyor. Görüntüsünde direk sağda, uç sola bakıyor. Hangi dönüşüm uygulanmıştır? **Yansıma** / Öteleme / İkisi de olabilir. (sahne 4)
5. (yeni durum) ABC üçgeninde |AB| = 7 cm. Üçgen önce bir doğruya göre yansıtıldı, sonra ötelendi. Son görüntüde bu kenarın karşılığı kaç cm'dir? **7 cm** / 14 cm / Bilinemez. (sahne 5)

Özet: Yansıma ve öteleme kenarı, açıyı, çevreyi ve alanı değiştirmez. · Yansıma şekli ters çevirir; öteleme yalnızca kaydırır. · **Yer değişir, ölçü değişmez.** · Görüntü şekle eştir.

## A2 · Dönme: merkez ve açı

- **Fikir:** Dönme, şekli bir merkez çevresinde, bir açı kadar, belli bir yönde çevirir; görüntü yine şekle eştir.
- **Giriş ekranı sorusu:** Bir rüzgârgülü dönerken kanatları yer değiştirir; kanadın biçimi bozulur mu?
- **Kaynak:** Ders kitabı s. 27–30 (dönmenin bileşenleri, saat yönü, merkeze uzaklık, eşlik; s. 30 soru 14: dönmeyi öteki dönüşümlerden ayırma).
- **Sınır:** Koordinatla dönme kuralı yok. İki yansımayla ilişki A4'tedir, burada anılmaz.
- **Güç kavramlar ve gösterimi:** (1) Merkez sabit, şekil döner: her köşenin çizdiği yay tahtada iz bırakır. (2) Dönme açısı: bir köşeyi merkeze bağlayan iki doğru parçası arasındaki sarı açı. (3) Yakın ve uzak köşe aynı açıyla döner: iki açı aynı anda açılır, yaylar farklı boydadır.
- **Hedeflenen yanılgı:** "Merkeze uzak köşe daha büyük açıyla döner" ve "dönme açısı şeklin kendi açılarını değiştirir."
- **Akılda kalıcı cümle:** Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.

Zemin: 16 sütun, 11 satır. Merkez O (8, 6). Kanat ABC: A (11, 2), B (8, 2), C (11, 6); |AB| = 3, |AC| = 4, |BC| = 5; dik açı A'da; |OA| = 5, |OB| = 4, |OC| = 3. Saat yönünde 90° dönünce: A′ (12, 9), B′ (12, 6), C′ (8, 9). 180° dönünce: A″ (5, 10), B″ (8, 10), C″ (5, 6).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (A1) Bir üçgen bir doğruya göre yansıtıldı. Görüntüde hangisi değişir? **Üçgenin yeri** / Kenar uzunlukları / İç açıları. Yanlışta: "Yansıma kenarı, açıyı, çevreyi ve alanı değiştirmez; yer değişir."
2. (A1) Bir şekil ötelendi. Köşelerin yer değiştirme uzaklıkları için hangisi doğrudur? **Hepsi aynıdır** / Köşeden köşeye değişir / Yalnızca ikisi aynıdır. Yanlışta: "Ötelemede her nokta aynı yönde, aynı uzaklıkta kayar."

### Sahne 2 · Dönen kanat

Tahta: zeminde sarı O noktası ve mavi ABC kanadı; öteki üç kanat soluk çizgiyle. Kanat O çevresinde saat yönünde 90° döner (köşelerin yayları iz bırakır); turuncu A′B′C′ kalır. O'da 90°'lik sarı açı (OA ile OA′ arasında) ve saat yönünü gösteren yay biçimli ok.

Anlatım:
1. Bir rüzgârgülünün kanadı kareli kâğıda çizilmiş: ABC üçgeni.
2. Kanat, ortadaki O noktasına tutturulmuş.
3. Rüzgâr esince kanat O çevresinde dönüyor.
4. O noktası yerinden oynamaz: buna dönme merkezi denir.
5. Kanat çeyrek tur döndü: dönme açısı 90°.
6. Dönmenin bir de yönü vardır: bu dönme saat yönünde.
7. Kanadın yeni yeri onun görüntüsüdür: A′B′C′.
8. Merkez, açı ve yön: bir dönmeyi bu üçü belirler.

Soru (`tag: 'Sıra sende'`): Kanat aynı merkez çevresinde, saat yönünde bir çeyrek tur daha dönerse toplam dönme açısı kaç derece olur? **180°** / 90° / 360°. Dayandığı anlatım: 5. İpuçları: "90° yalnızca ilk çeyrek turdu; bir çeyrek daha eklenir." · "360° tam turdur; iki çeyrek tur yarım tur eder."

Gör: kanat 180° konumuna (A″B″C″) döner.

Sonra:
9. İki çeyrek tur yarım tur eder: 180°.

### Sahne 3 · Merkeze uzaklık

Tahta: kanat ve 90° görüntüsü. A'dan A′'ne çember yayı; OA ve OA′ sarı çizgi, üzerlerinde "5". Sonra OB, OB′ ("4"). Sağda tablo: |OA| 5 · |OA′| 5; |OB| 4 · |OB′| 4; |OC| 3 · |OC′| ?. İkinci bölümde O'daki açılar: AOA′ 90°, BOB′ 90°, COC′ ?.

Anlatım:
1. A köşesinin dönerken çizdiği yola bakalım.
2. A, merkezi O olan bir çember yayı üzerinde ilerliyor.
3. Çember üzerindeki her nokta merkeze aynı uzaklıktadır.
4. A merkeze 5 birim uzakta; A′ de 5 birim uzakta.
5. B köşesi merkeze 4 birim uzakta; B′ de öyle.

Birlikte çöz (`tag: 'Birlikte çöz'`): C köşesi merkeze 3 birim uzakta. C′ merkeze kaç birim uzaktadır? **3 birim** / 5 birim / 4 birim. Dayandığı anlatım: 3–5. İpuçları: "5 birim A köşesinin uzaklığıydı." · "4 birim B köşesinin uzaklığıydı; C kendi çemberinde döner."

Sonra:
6. Dönmede her nokta merkeze uzaklığını korur.
7. Şimdi açılara bakalım: OA ile OA′ arasındaki açı 90°.
8. OB ile OB′ arasındaki açı da 90°.

Soru (`tag: 'Sıra sende'`): C, merkeze en yakın köşe. OC ile OC′ arasındaki açı için hangisi doğrudur? **90°dir; bütün köşeler aynı açıyla döner** / 90°den küçüktür; yakın köşe az döner / 90°den büyüktür; yakın köşe çok döner. Dayandığı anlatım: 7–8 ve sahne 2, 5. İpuçları: "Kanat tek parça döndü: çeyrek tur." · "Yakın köşenin yayı kısadır, açısı değil."

Gör: COC′ açısı 90° olarak açılır; üç yay yan yana: en kısası C'nin.

Sonra:
9. Yakın ya da uzak, bütün noktalar aynı açı kadar döner.
10. Uzak nokta daha uzun bir yay çizer, ama açısı aynıdır.

Defter ("Dönme"): **Dönme:** merkez, açı, yön. |OA| = |OA′|; her nokta aynı açıyla döner.

### Sahne 4 · Ne değişti, ne değişmedi?

Tahta: kanat ve 90° görüntüsü; sağda tablo: kenarlar 3, 4, 5 · 3, 4, 5; açılar; çevre 12; alan 6; altta "değişen: yer, baktığı yön". İki üçgende köşeleri dolaşan oklar aynı yönde.

Anlatım:
1. Kanat ile görüntüsünü karşılaştıralım.
2. Kenarlar 3, 4 ve 5 birim; görüntüde de aynı.
3. Dik açı yine dik; öteki açılar da aynı.
4. Kenarlar aynı olduğuna göre çevre ve alan da aynı.
5. Değişen, kanadın yeri ve baktığı yön.
6. Kanat ters çevrilmedi: köşeleri dolaşma yönü aynı kaldı.

Dene (`c.slider`, "Dönme açısı (saat yönünde)", 0°–345°, adım 15°; `noWait` yönerge: "Açıyı değiştir; kenarlara ve merkeze uzaklıklara bak."): kanat döner; tablodaki kenarlar ve |OA′|, |OB′|, |OC′| değişmez. "Devam" ile biter.

Sonra:
7. Açı ne olursa olsun kenarlar ve merkeze uzaklıklar değişmiyor.

### Sahne 5 · Üç dönüşüm

Tahta: kanat ve görüntüsü; görüntü geri döner ve kanadın üstüne oturur. Önerme yazılır: "Dönme altındaki görüntü, şekle eştir." Sonra tahta üç bölmeye ayrılır: bayrak motifinin ötelenmişi ("kaydırır"), yansımışı ("ters çevirir"), dönmüşü ("döndürür").

Anlatım:
1. Görüntüyü geri döndürelim: kanadın tam üstüne oturuyor.
2. Üst üste tam oturdular: kanat ile görüntüsü eş.
3. Bir şeklin dönme altındaki görüntüsü şekle eştir.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir kare, köşelerinden biri çevresinde 40° döndürüldü. Görüntü için hangisi doğrudur? **Yine karedir; kenarları aynı uzunluktadır** / Açıları 40° büyür / Kenarları kısalır. Dayandığı anlatım: 3. İpuçları: "40° şeklin açısına eklenmez; şeklin ne kadar çevrildiğini söyler." · "Görüntü şekle eştir: uzunluklar değişmez."

Sonra:
4. Şimdi üç dönüşümü yan yana koyalım.
5. Öteleme kaydırır, yansıma ters çevirir, dönme döndürür.
6. Üçünde de görüntü şekle eştir.

Soru (`tag: 'Sıra sende'`): tahtada bayrak motifi ve saat yönünde 90° dönmüş görüntüsü (merkez ve yay çizilmez). Bu çiftte hangi dönüşüm var? **Dönme** / Yansıma / Öteleme. Dayandığı anlatım: 5; sahne 4, 5–6. İpuçları: "Köşeleri dolaş: yön aynı; şekil ters çevrilmemiş." · "Öteleme yalnızca kaydırır; burada bayrak başka yöne bakıyor."

Sonra:
7. Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.

Defter ("Dönme ve eşlik"): **Dönme:** görüntü şekle eştir; şekil ters çevrilmez.

### Çıkış soruları

1. Bir şekil O noktası çevresinde 70° döndürülüyor. P noktası O'ya 6 cm uzaktaysa görüntüsü P′, O'ya kaç cm uzaktadır? **6 cm** / 12 cm / 3 cm. (sahne 3)
2. (yanılgı) Bir üçgen 60° döndürüldü. Merkeze yakın K köşesi ile uzak L köşesi için hangisi doğrudur? **İkisi de 60° döner** / L daha büyük açıyla döner / K daha büyük açıyla döner. (sahne 3)
3. (yanılgı) İç açıları 50°, 60° ve 70° olan bir üçgen 90° döndürüldü. Görüntünün iç açıları nedir? **50°, 60°, 70°** / 140°, 150°, 160° / Üçü de 90°. (sahne 4)
4. (yeni durum) Bir saatin yelkovanı 12'den 3'e geldi. Bu dönmenin merkezi ve açısı nedir? **Yelkovanın bağlı olduğu nokta; 90°** / Yelkovanın ucu; 90° / Yelkovanın bağlı olduğu nokta; 30°. (sahne 2)
5. (yeni durum) Bir harf motifi ile görüntüsü karşılaştırılıyor: görüntü ters çevrilmemiş ama başka yöne bakıyor. Hangi dönüşüm uygulanmıştır? **Dönme** / Yansıma / Öteleme. (sahne 5)

Özet: Bir dönmeyi merkez, açı ve yön belirler. · Her nokta merkeze uzaklığını korur ve aynı açıyla döner. · **Dönme, merkez çevresinde çevirir; ölçüyü bozmaz.** · Görüntü şekle eştir, ters çevrilmez.

## A3 · Öteleme, iki yansımadır

- **Fikir:** Bir şekil paralel iki doğruya göre art arda yansıtılırsa ötelenmiş olur; öteleme uzaklığı doğrular arasındaki uzaklığın iki katıdır.
- **Giriş ekranı sorusu:** Karşılıklı iki aynanın arasında durunca ikinci görüntün neden sana ters değil, düz bakar?
- **Kaynak:** Ders kitabı s. 22–24 (3. uygulama, Kontrol Noktası: "doğrular arasındaki uzaklığın iki katı kadar uzaklığa ötelenmiş olur"), s. 19 (nokta–görüntü doğru parçaları yansıma doğrusuna diktir), s. 32 (örnek 2b: öteleme deseni iki paralel yansımayla).
- **Sınır:** Doğrular paraleldir; şekil iki doğrunun dışında, d₁'in yanındadır. Yansıma sırasının değişmesi işlenmez. Giriş sorusundaki ayna yalnızca meraktır; ışık ve ayna fiziği anlatılmaz.
- **Güç kavramlar ve gösterimi:** (1) İki adımın tek adıma eşit olması: ara görüntü soluklaşır, ilk üçgenden son görüntüye yeşil öteleme oku çizilir. (2) "İki kat": köşenin yolu doğrulara dik bir çizgi üstünde dört parçaya ayrılır (4, 4, 1, 1); eşit parçalar aynı renktedir.
- **Hedeflenen yanılgı:** "İki yansıma şekli iki kez ters çevirir; son görüntü terstir" ve "öteleme uzaklığı doğrular arasındaki uzaklık kadardır."
- **Akılda kalıcı cümle:** Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.

Zemin: 16 sütun, 11 satır. Üçgen ABC: A (1, 3), B (1, 7), C (4, 7). d₁ sütun 5'te, d₂ sütun 10'da (aralarında 5 birim). İlk görüntü: A′ (9, 3), B′ (9, 7), C′ (6, 7). Son görüntü: A″ (11, 3), B″ (11, 7), C″ (14, 7). A'nın yolu 4 + 4 + 1 + 1, C'nin yolu 1 + 1 + 4 + 4.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (A2) Bir şekil O noktası çevresinde döndürülüyor. P noktası O'ya 5 birim uzaksa görüntüsü P′, O'ya kaç birim uzaktadır? **5 birim** / 10 birim / Dönme açısına bağlıdır. Yanlışta: "Dönmede her nokta merkeze uzaklığını korur."
2. (A1) C noktası yansıma doğrusuna 3 birim uzakta. C ile görüntüsü C′ arasındaki uzaklık kaç birimdir? **6 birim** / 3 birim / 9 birim. Yanlışta: "C′ doğrunun öbür yanında, yine 3 birim uzaktadır: 3 + 3."

### Sahne 2 · İki yansıma art arda

Tahta: mavi ABC, iki dikey mor doğru (d₁, d₂). Üçgen d₁'e göre yansır: soluk turuncu A′B′C′ (dolaşma oku ters). O da d₂'ye göre yansır: turuncu A″B″C″ (dolaşma oku ilk üçgenle aynı). Sonra ara görüntü silinir.

Anlatım:
1. Kilim ustası bir üçgeni art arda iki kez yansıtacak.
2. İki yansıma doğrusu var, d₁ ve d₂; birbirine paraleller.
3. Önce d₁'e göre yansıtıyor: görüntü ters çevrildi.
4. Şimdi bu görüntüyü d₂'ye göre yansıtıyor.
5. Ters çevrilen şekil bir kez daha ters çevrildi: yeniden düz.
6. Aradaki görüntüyü silelim; ilk üçgen ile son görüntü kalsın.

Soru (`tag: 'Sıra sende'`): İlk üçgen ile son görüntüye bak. Son görüntü ilk üçgene göre nasıl duruyor? **Ters çevrilmemiş, dönmemiş; yalnızca kaymış** / Ters çevrilmiş / Başka yöne bakıyor; dönmüş. Dayandığı anlatım: 5 ve tahta; A1 sahne 3, A2 sahne 5. İpuçları: "Köşeleri dolaş: iki üçgende de aynı yönde dönüyorsun." · "Dik kenarlar iki üçgende de aynı doğrultuda duruyor."

Sonra:
7. Yalnızca kaymış bir şekil: bu bir ötelemeye benziyor.
8. Öteleme olması için bütün noktalar aynı uzaklıkta kaymalı.

### Sahne 3 · Ne kadar kaydı?

Tahta: üç üçgen de görünür (ara görüntü soluk). A, A′, A″ satır 3'te yatay bir çizgi üstünde; çizgi dört parçaya ayrılır: A–d₁ "4", d₁–A′ "4" (aynı renk), A′–d₂ "1", d₂–A″ "1" (aynı renk). Altında toplam satırı. Sonra aynı çizim C için satır 7'de: "1, 1, 4, ?". En sonda iki doğru arasına "5" ölçüsü ve üstte "10 = 2 × 5".

Anlatım:
1. A köşesinin yolunu adım adım izleyelim.
2. A, d₁'e 4 birim uzakta; A′ öbür yanda, yine 4 birim.
3. Doğrular arası 5 birim; A′ ile d₂ arasında 1 birim kalıyor.
4. İkinci yansıma: A″, d₂'nin öbür yanında 1 birim ötede.
5. A'nın toplam yolu: 4 + 4 + 1 + 1 = 10 birim.

Birlikte çöz (`tag: 'Birlikte çöz'`): C, d₁'e 1 birim uzakta; C′ ile d₂ arasında 4 birim var. C″, d₂'nin kaç birim ötesindedir ve C toplam kaç birim kaymıştır? **4 birim ötesinde; toplam 10 birim** / 1 birim ötesinde; toplam 7 birim / 4 birim ötesinde; toplam 8 birim. Dayandığı anlatım: 2–5. İpuçları: "C′ d₂'ye 4 birim uzakta; görüntüsü öbür yanda aynı uzaklıktadır." · "Dört parçayı topla: 1 + 1 + 4 + 4."

Sonra:
6. A da C de 10 birim kaydı: aynı yönde, aynı uzaklıkta.
7. Bütün noktalar için sonuç aynı çıkar: bu bir öteleme.
8. 10, doğrular arasındaki 5 birimin tam iki katı.
9. 4 ile 1'in toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.

Defter ("İki yansıma, bir öteleme"): **Paralel iki yansıma = öteleme.** Uzaklık = 2 × doğrular arası uzaklık.

### Sahne 4 · Doğruların arası değişirse

Tahta: ilk üçgen, d₁, d₂ ve son görüntü; yeşil öteleme oku ve üstünde uzunluğu; iki doğru arasında ölçü.

Soru (`tag: 'Sıra sende'`): Doğrular arasındaki uzaklık 6 birim olsaydı üçgen kaç birim ötelenirdi? **12 birim** / 6 birim / 18 birim. Dayandığı anlatım: sahne 3, 8–9. İpuçları: "6 birim doğruların arası; köşenin yolu bunu iki kez geçer." · "Yol üç kat değil, iki kat."

Gör: d₂ sütun 11'e kayar; son görüntü 12 birim ötede belirir.

Anlatım:
1. Doğrular 6 birim aralıklı: üçgen 12 birim ötelendi.

Dene (`c.slider`, "Doğrular arasındaki uzaklık", 4–6 birim, adım 0,5; `noWait` yönerge: "d₂ doğrusunu kaydır; öteleme uzaklığına bak."): d₂ ve son görüntü yer değiştirir; iki ölçü güncellenir. "Devam" ile biter.

Sonra:
2. Ötelemenin doğrultusu doğrulara dik, yönü d₁'den d₂'ye doğrudur.

Soru (`tag: 'Sıra sende'`; yeni durum, tersinden): Usta bir motifi iki yansımayla 14 birim ötelemek istiyor. Paralel doğruları kaç birim aralıkla çizmelidir? **7 birim** / 14 birim / 28 birim. İpuçları: "14 birim aralık 28 birim öteleme verir." · "Aralık, ötelemenin yarısıdır."

Sonra:
3. Her öteleme, paralel iki doğruya yansımayla elde edilebilir.

### Sahne 5 · Son görüntü de eş

Tahta: ilk üçgen, ara görüntü ve son görüntü yan yana; aralarında "eş" işaretleri sırayla belirir.

Anlatım:
1. İlk yansımada görüntü üçgene eşti.
2. İkinci yansıma da ölçüleri değiştirmedi.
3. Öyleyse son görüntü ilk üçgene eştir.

Soru (`tag: 'Sıra sende'`; yeni durum): Kenarları 6, 8 ve 10 cm olan bir üçgen paralel iki doğruya göre art arda yansıtıldı. Son görüntünün çevresi kaç cm'dir? **24 cm** / 48 cm / 12 cm. Dayandığı anlatım: 1–3. İpuçları: "İki yansıma uzunlukları iki katına çıkarmaz." · "Ölçüler küçülmez; son görüntü ilk üçgene eştir."

Sonra:
4. Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.

### Çıkış soruları

1. Aralarında 4 cm olan paralel iki doğruya göre art arda yansıtılan bir şekil kaç cm ötelenmiş olur? **8 cm** / 4 cm / 16 cm. (sahne 3)
2. (yanılgı) Paralel iki doğruya göre art arda iki kez yansıtılan bir şeklin son görüntüsü için hangisi doğrudur? **Ters çevrilmemiştir; ilk şekille aynı duruştadır** / Ters çevrilmiştir / İlk şeklin iki katı büyüklüğündedir. (sahne 2)
3. (yeni durum) Bir şekil iki yansımayla 20 cm ötelenecek. Paralel doğrular kaç cm aralıklı olmalıdır? **10 cm** / 20 cm / 40 cm. (sahne 4)
4. (yeni durum) Bir üçgen, aralarında 9 cm olan paralel iki doğruya göre art arda yansıtılıyor. A köşesi birinci doğruya 2 cm, B köşesi 6 cm uzakta. Köşelerin son görüntülerine uzaklıkları nedir? **İkisi de 18 cm** / A 4 cm, B 12 cm / A 18 cm, B 22 cm. (sahne 3)
5. İki paralel yansımayla elde edilen ötelemenin doğrultusu nasıldır? **Doğrulara diktir** / Doğrulara paraleldir / Doğrularla 45° yapar. (sahne 4)

Özet: Paralel iki doğruya art arda yansıma, şekli ters çevirmeden kaydırır. · Öteleme uzaklığı doğrular arasındaki uzaklığın iki katıdır. · **Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.** · Son görüntü ilk şekle eştir.

## A4 · Dönme, iki yansımadır

- **Fikir:** Bir şekil kesişen iki doğruya göre art arda yansıtılırsa dönmüş olur: merkez doğruların kesim noktasıdır, açı doğrular arasındaki açının iki katıdır.
- **Giriş ekranı sorusu:** Kesişen iki aynadan yapılmış bir kaleydoskopta görüntüler neden bir nokta çevresinde dizilir?
- **Kaynak:** Ders kitabı s. 24–27 (4. uygulama; Kontrol Noktası: noktalar çembersel yol çizer; kesim noktası dönme merkezi, doğrular arasındaki açının iki katı dönme açısı), s. 17 (doğru üstündeki noktanın görüntüsü kendisidir), s. 32 (örnek 2c), s. 33 (dönüşümler uzaklığı ve açıyı korur).
- **Sınır:** Doğrular kesişir; üçgen iki doğrunun dışında, d₁'in yanındadır; ilk görüntü iki doğrunun arasına düşer. Yansıma sırasının değişmesi işlenmez.
- **Güç kavramlar ve gösterimi:** (1) Köşenin O çevresindeki çember üstünde üç konumu ve aradaki dört açı parçası (15°, 15°, 30°, 30°); eşit parçalar aynı renkte. (2) A3 ile koşutluk: son sahnede iki çizim yan yana; solda uzaklıklar, sağda açılar toplanır.
- **Hedeflenen yanılgı:** "Dönme açısı doğrular arasındaki açı kadardır" ve "iki yansıma her zaman öteleme verir."
- **Akılda kalıcı cümle:** Kesişen iki yansıma bir dönme eder; açı iki katıdır.

Çizim (zeminsiz, açıyla): O tahtanın sol alt bölgesinde. d₁ O'dan geçen yatay doğru; d₂ O'dan geçer ve d₁ ile 45° yapar (yukarı doğru). Üçgen d₁'in altında: A köşesi için OA, d₁ ile 15°; B köşesi için OB, d₁ ile 30°; C köşesi ikisinin arasında, merkeze daha yakın. İlk yansımadan sonra üçgen iki doğrunun arasındadır (OA′ d₁'in 15° üstünde), ikinciden sonra d₂'nin ötesinde (OA″, d₂'den 30° ötede). |OB| = 6 birim diye etiketlenir.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (A3) Bir şekil, aralarında 6 birim olan paralel iki doğruya göre art arda yansıtıldı. Kaç birim ötelenmiş olur? **12 birim** / 6 birim / 3 birim. Yanlışta: "Öteleme uzaklığı, doğrular arasındaki uzaklığın iki katıdır."
2. (A2) Bir dönmeyi hangileri belirler? **Merkez, açı ve yön** / Yalnızca açı / Bir doğru ve bir uzaklık. Yanlışta: "Dönme bir merkez çevresinde, bir açı kadar, bir yönde olur."

### Sahne 2 · Doğrular kesişirse

Tahta: O'da kesişen iki mor doğru, aralarında 45° yayı. Mavi üçgen d₁'in altında. d₁'e göre yansır (soluk turuncu, ters), sonra d₂'ye göre (turuncu, düz). Ara görüntü silinir. Köşelerden son görüntülere ince çizgiler: A–A″ uzun, C–C″ kısa.

Anlatım:
1. Geçen derste yansıma doğruları paraleldi; şimdi kesişiyorlar.
2. d₁ ile d₂, O noktasında kesişiyor; aralarındaki açı 45°.
3. Üçgeni önce d₁'e göre yansıtalım: görüntü ters çevrildi.
4. Şimdi bu görüntüyü d₂'ye göre yansıtalım: yeniden düz.
5. Aradaki görüntüyü silip ilk üçgen ile son görüntüye bakalım.
6. Son görüntü ters çevrilmemiş: bu tek bir yansıma olamaz.
7. Köşeler farklı uzaklıklarda yer değiştirmiş: öteleme de değil.

Soru (`tag: 'Sıra sende'`): Şekli ters çevirmeyen ama baktığı yönü değiştiren dönüşüm hangisiydi? **Dönme** / Öteleme / Yansıma. Dayandığı anlatım: 6–7; A2 sahne 5. İpuçları: "Öteleme şeklin baktığı yönü değiştirmez." · "Yansıma şekli ters çevirir; burada çevrilmemiş."

Sonra:
8. Kesişen iki doğruya art arda yansıma bir dönmedir.

### Sahne 3 · Merkez neresi?

Tahta: iki doğru, üç üçgen (ara görüntü soluk). O sarı parlar. O'dan A, A′, A″ noktalarına sarı çizgiler; üçünden geçen çember yayı. Sonra B için aynı çizgi, üstünde "6".

Anlatım:
1. Bir dönmenin merkezi yerinden oynamayan noktadır.
2. Yansımada doğrunun üstündeki nokta yerinde kalıyordu.
3. O noktası iki doğrunun da üstünde: iki yansımada da yerinde kalır.
4. Demek ki dönme merkezi, doğruların kesim noktası O.
5. A, A′ ve A″ noktalarını O'ya birleştirelim.
6. Yansıma uzunluğu değiştirmez: bu üç doğru parçası eşit.
7. Üç nokta da merkezi O olan aynı çember üzerinde.

Soru (`tag: 'Sıra sende'`): B köşesi O'ya 6 birim uzakta. Son görüntüsü B″, O'ya kaç birim uzaktadır? **6 birim** / 12 birim / 3 birim. Dayandığı anlatım: 6–7. İpuçları: "İki yansıma uzunluğu iki katına çıkarmaz." · "B ile B″ aynı çemberin üzerindedir."

Sonra:
8. Her köşe kendi çemberinde, O çevresinde döner.

### Sahne 4 · Açı kaç derece?

Tahta: O, iki doğru, A'nın çemberi. O'da dört açı parçası sırayla boyanır: OA–d₁ "15°", d₁–OA′ "15°" (aynı renk), OA′–d₂ "30°", d₂–OA″ "30°" (aynı renk). Altında toplam satırı. Sonra B için: "30°, 30°, ?, ?". En sonda üstte "90° = 2 × 45°".

Anlatım:
1. Şimdi A'nın O çevresinde kaç derece döndüğünü bulalım.
2. OA, d₁ ile 15° yapıyor; OA′ öbür yanda, yine 15°.
3. Doğrular arası 45°; OA′ ile d₂ arasında 30° kalıyor.
4. İkinci yansıma: OA″, d₂'nin öbür yanında 30° ötede.
5. Toplam: 15 + 15 + 30 + 30 = 90°.

Birlikte çöz (`tag: 'Birlikte çöz'`): OB, d₁ ile 30° yapıyor; OB′ öbür yanda yine 30°. OB′ ile d₂ arasında kaç derece kalır ve B toplam kaç derece döner? **15° kalır; toplam 90°** / 30° kalır; toplam 120° / 15° kalır; toplam 60°. Dayandığı anlatım: 2–5. İpuçları: "Doğrular arası 45°; 30°si geçildi." · "Dört parçayı topla: 30 + 30 + 15 + 15."

Sonra:
6. A da B de 90° döndü: doğrular arasındaki açının iki katı.
7. 15 ile 30'un toplamı doğruların arasıdır; yolda ikisi de iki kez geçer.

Defter ("İki yansıma, bir dönme"): **Kesişen iki yansıma = dönme.** Merkez kesim noktası; açı 2 katı.

### Sahne 5 · Açı değişirse

Tahta: ilk üçgen, iki doğru, son görüntü; O'da doğrular arası açı ve dönme açısı (sarı) ölçüleriyle.

Soru (`tag: 'Sıra sende'`): Doğrular arasındaki açı 60° olsaydı üçgen kaç derece dönerdi? **120°** / 60° / 30°. Dayandığı anlatım: sahne 4, 6–7. İpuçları: "60° doğruların arası; dönme bunun iki katıdır." · "Dönme açısı yarıya inmez, iki katına çıkar."

Gör: d₂ 60°'ye açılır; son görüntü 120° dönmüş olarak belirir.

Anlatım:
1. Doğrular arası 60°: üçgen 120° döndü.

Dene (`c.slider`, "Doğrular arasındaki açı", 30°–60°, adım 5°; `noWait` yönerge: "d₂ doğrusunu çevir; dönme açısına bak."): d₂ ve son görüntü döner; iki açı güncellenir. "Devam" ile biter.

Sonra:
2. Dönmenin yönü d₁'den d₂'ye doğrudur.

Soru (`tag: 'Sıra sende'`; yeni durum, tersinden): Usta bir motifi iki yansımayla 80° döndürmek istiyor. Doğrular arasındaki açı kaç derece olmalıdır? **40°** / 80° / 160°. İpuçları: "80° açılı doğrular 160° döndürür." · "Doğrular arası açı, dönme açısının yarısıdır."

Sonra:
3. Her dönme, merkezde kesişen iki doğruya yansımayla elde edilebilir.

### Sahne 6 · İki yansıma: öteleme mi, dönme mi?

Tahta: iki bölme. Solda A3'ün çizimi küçük: paralel iki doğru, ilk ve son üçgen, "uzaklık: 2 × 5 = 10". Sağda bu dersin çizimi: kesişen iki doğru, ilk ve son üçgen, "açı: 2 × 45° = 90°". Altta ortak satır: "görüntü şekle eş".

Anlatım:
1. İki dersin sonucunu yan yana koyalım.
2. Doğrular paralelse iki yansıma bir öteleme eder.
3. Doğrular kesişiyorsa iki yansıma bir dönme eder.
4. Orada uzaklık iki katına çıkıyordu, burada açı.
5. Her yansıma eşliği korur; son görüntü ilk şekle eştir.

Soru (`tag: 'Sıra sende'`; yeni durum): İki doğruya göre art arda yansıtılan bir şeklin bütün köşeleri aynı yönde 8 cm kaymış. Doğrular için hangisi doğrudur? **Paraleldirler; aralarında 4 cm vardır** / Paraleldirler; aralarında 8 cm vardır / Kesişirler; aralarındaki açı 4°dir. Dayandığı anlatım: 2–4. İpuçları: "8 cm öteleme uzaklığı; doğruların arası bunun yarısıdır." · "Bütün köşeler aynı uzaklıkta kaymış: bu bir öteleme, dönme değil."

Sonra:
6. Kesişen iki yansıma bir dönme eder; açı iki katıdır.

### Çıkış soruları

1. Aralarındaki açı 35° olan kesişen iki doğruya göre art arda yansıtılan bir şekil kaç derece dönmüş olur? **70°** / 35° / 17,5°. (sahne 4)
2. Kesişen iki doğruya göre art arda yansımayla elde edilen dönmenin merkezi neresidir? **Doğruların kesim noktası** / Şeklin ortası / Şeklin doğruya en yakın köşesi. (sahne 3)
3. (yanılgı) "Bir şekil iki doğruya göre art arda yansıtılırsa hep ötelenmiş olur." Bu cümle için hangisi doğrudur? **Yanlıştır; doğrular kesişiyorsa şekil dönmüş olur** / Doğrudur / Yanlıştır; şekil hep dönmüş olur. (sahne 6)
4. (yeni durum) Bir motif iki yansımayla 100° döndürülecek. Doğrular arasındaki açı kaç derece olmalıdır? **50°** / 100° / 200°. (sahne 5)
5. (yeni durum) Bir şekil birbirine dik iki doğruya göre art arda yansıtıldı. Hangi tek dönüşüm aynı sonucu verir? **180° dönme** / 90° dönme / Öteleme. (sahne 4)

Özet: Kesişen iki doğruya art arda yansıma bir dönmedir. · Merkez, doğruların kesim noktasıdır. · **Kesişen iki yansıma bir dönme eder; açı iki katıdır.** · Paralel doğrular öteleme, kesişen doğrular dönme verir.

## A5 · Süslemede dönüşümler

- **Fikir:** Bir süsleme, tek bir motife yansıma, öteleme ve dönme uygulanarak kurulur; hangi dönüşümün kullanıldığı motiflerin dizilişinden okunur.
- **Giriş ekranı sorusu:** Bir kilimin bütün deseni tek bir motiften çıkabilir mi?
- **Kaynak:** Ders kitabı s. 13 (çinide lale deseni; desenler arasında dönüşüm soruları), s. 30 (12 köşeli yıldız çevresinde motifler 30° döndürülerek elde edilir), s. 31 (halı ve kilim), s. 31–32 (2. örnek: süslemenin yansımalarla kurulması; öteleme ve dönmenin iki yansımayla elde edilmesi), s. 33 (bütün dönüşümler eşliği korur).
- **Sınır:** Motif şematik bir bayrak biçimidir (simetrik değildir; ters çevrilmesi görülür); gerçek bir eser kopyalanmaz, adı verilmez. Süsleme tasarlama ve sunma site dışıdır. Simetri türlerinin sayımı yok.
- **Güç kavramlar ve gösterimi:** Süslemenin tek motiften kurulması: motif tahtada adım adım çoğalır; her adımda dönüşümün izi (yeşil ok, mor doğru, sarı yay) görünür, sonra silinir ve süsleme yalın kalır.
- **Hedeflenen yanılgı:** "Yan yana duran her motif ötelemeyle elde edilmiştir."
- **Akılda kalıcı cümle:** Süsleme: tek motif, üç dönüşüm.

Motif: 2 sütun genişliğinde, 3 satır yüksekliğinde bayrak (solda direk, sağa bakan üçgen uç).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (A4) Bir şekil, aralarındaki açı 30° olan kesişen iki doğruya göre art arda yansıtıldı. Hangi dönüşüm uygulanmış olur? **60° dönme** / 30° dönme / 60 birim öteleme. Yanlışta: "Kesişen iki yansıma bir dönme eder; açı iki katıdır."
2. (A1) Bir motif ile görüntüsü yan yana duruyor; görüntü ters çevrilmiş. Hangi dönüşüm uygulanmıştır? **Yansıma** / Öteleme / İkisi de olabilir. Yanlışta: "Öteleme şekli ters çevirmez; ters çeviren yansımadır."

### Sahne 2 · Kilim kenarı

Tahta: yatay bir şerit zemin. Solda mavi tek motif (sütun 0–2). 4 birim sağa ötelenir (yeşil ok, "4"); sonra bir daha, bir daha: dört motif (sütun 0–2, 4–6, 8–10, 12–14). Oklar silinir, şerit kalır. Motifler 1, 2, 3, 4 diye numaralanır.

Anlatım:
1. Kilimlerin kenarında aynı motif yan yana dizilir.
2. Usta önce tek bir motif çiziyor.
3. Motifi 4 birim sağa öteliyor; sonra bir daha, bir daha.
4. Her motif bir öncekinin öteleme görüntüsü.
5. Hepsi aynı duruşta: hiçbiri ters çevrilmemiş.
6. Ötelemenin doğrultusu yatay, yönü sağa, uzaklığı 4 birim.

Soru (`tag: 'Sıra sende'`): Birinci motiften üçüncü motife hangi dönüşümle geçilir? **8 birim sağa öteleme** / 4 birim sağa öteleme / Yansıma. Dayandığı anlatım: 3–6. İpuçları: "4 birim, ikinci motife götürür; üçüncü bir adım daha ötede." · "Üçüncü motif ters çevrilmemiş."

Sonra:
7. Art arda iki öteleme, daha uzun tek bir öteleme eder.

### Sahne 3 · Aynalı şerit

Tahta: yeni şerit. Motif 1 (sütun 0–2); sütun 3'te dikey mor doğru; motif 2 onun yansıması (sütun 4–6, ucu sola bakar). Motif 3, motif 2'nin sütun 7'deki doğruya göre yansıması (sütun 8–10, ucu sağa bakar); ikinci doğru başta çizilmez. Sonda motif 1'den motif 3'e yeşil ok, "8".

Anlatım:
1. Usta bu kez motifi dikey bir doğruya göre yansıtıyor.
2. İkinci motif birincinin ayna görüntüsü: ters çevrilmiş.
3. Sonra onu da bir sonraki doğruya göre yansıtıyor.
4. Şerit böyle sürüyor: düz, ters, düz, ters.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada üç motif; birinci ile ikinci arasındaki doğru çizili, ikinci ile üçüncü arasındaki eksik. İkinci ile üçüncü motif arasındaki yansıma doğrusu nereden geçer? **İki motifin tam ortasından** / İkinci motifin kenarından / Üçüncü motifin kenarından. Dayandığı anlatım: 1–3; A1 sahne 1 (nokta ile görüntüsü doğruya eşit uzaklıkta). İpuçları: "Doğru ikinci motife yapışık olsaydı üçüncü motif de ona yapışık dururdu." · "Motif ile görüntüsü doğruya eşit uzaklıktadır."

Gör: ikinci doğru sütun 7'de belirir.

Sonra:
5. Yansıma doğrusu, motif ile görüntüsünün tam ortasından geçer.

Soru (`tag: 'Sıra sende'`): Birinci ile üçüncü motif aynı duruşta. Birinciden üçüncüye hangi tek dönüşümle geçilir? **Öteleme** / Yansıma / Dönme. Dayandığı anlatım: A3. İpuçları: "Üçüncü motif ters çevrilmemiş." · "Üçüncü motif başka yöne bakmıyor; yalnızca kaymış."

Sonra:
6. Paralel iki yansıma bir öteleme eder.
7. Doğrular 4 birim aralıklı; öteleme 8 birim.

### Sahne 4 · Bir merkez çevresinde

Tahta: ortada sarı O. Bir motif O'nun üstünde durur; O çevresinde saat yönünde 30° döner (sarı yay, "30°"), görüntü kalır; böyle on iki motif bir çember boyunca dizilir. Yaylar silinir. Sonra sağda küçük bir karşılaştırma: "12 motif: 360° ÷ 12 = 30°" ve "8 motif: 360° ÷ 8 = ?".

Anlatım:
1. Tavan ve kubbe süslemelerinde motifler bir merkez çevresinde dizilir.
2. Usta motifi O çevresinde 30° döndürüyor.
3. Görüntüyü yine 30° döndürüyor; böyle sürdürüyor.
4. On iki motif tam turu doldurdu: 12 × 30° = 360°.
5. Tam tur 360°; motif sayısına bölünce dönme açısı çıkar.

Birlikte çöz (`tag: 'Birlikte çöz'`): 12 motifte açı 360° ÷ 12 = 30° idi. Aynı düzen 8 motifle kurulursa her adımın dönme açısı kaç derece olur? **45°** / 30° / 8°. Dayandığı anlatım: 4–5. İpuçları: "30°, on iki motifli düzenin açısıydı." · "Tam turu motif sayısına böl: 360 ÷ 8."

Gör: 8 motifli düzen çizilir.

Sonra:
6. Motif azaldıkça dönme açısı büyür.

Soru (`tag: 'Sıra sende'`): Komşu iki motif arasında 30° dönme var. Usta bu dönmeyi O'dan geçen iki doğruya yansımayla yapacak. Doğrular arasındaki açı kaç derece olmalıdır? **15°** / 30° / 60°. Dayandığı anlatım: A4. İpuçları: "30° açılı doğrular 60° döndürür." · "Doğrular arası açı, dönme açısının yarısıdır."

Sonra:
7. Usta dönmeyi de iki yansımayla elde edebilir.

### Sahne 5 · Hangi dönüşüm?

Tahta: her seferinde 1 ve 2 numaralı iki motif; doğru, ok ve yay çizilmez.

Anlatım:
1. Bir süslemede kullanılan dönüşüm motiflerin duruşundan okunur.
2. Ters çevrilmişse yansıma, yalnızca kaymışsa öteleme, dönmüşse dönme.

Dene (sınıflandırma; dört çift, her biri `tag: 'Sıra sende'`): 1 numaralı motiften 2 numaralıya hangi dönüşümle geçilir? Şıklar: Öteleme / Yansıma / Dönme.

- Çift 1: motif 2, motif 1'in 5 birim sağında, aynı duruşta. **Öteleme**. Gör: yeşil ok.
- Çift 2: motif 2, motif 1'in altında, yatay doğruya göre yansımış (baş aşağı). **Yansıma**. İpucu: "Köşeleri dolaş: yön tersine dönmüş." Gör: yatay mor doğru.
- Çift 3: motif 2, motifin sol alt köşesi çevresinde saat yönünde 90° dönmüş. **Dönme**. İpucu: "Ters çevrilmemiş, ama başka yöne bakıyor." Gör: sarı merkez ve yay.
- Çift 4 (yanılgı): motif 2, motif 1'in yanında, dikey doğruya göre yansımış. **Yansıma**. İpucu: "Yan yana durmaları öteleme demek değil: uç öbür yana bakıyor." Gör: dikey mor doğru.

Sonra:
3. Yan yana duran motif her zaman ötelenmiş değildir; duruşuna bak.

### Sahne 6 · Bütün motifler eş

Tahta: solda aynalı şerit, sağda on iki motifli düzen; altında "tek motif → öteleme, yansıma, dönme". Bir motif yerinden kalkıp başka bir motifin üstüne oturur.

Anlatım:
1. İki süslemeyi yan yana koyalım.
2. İkisi de tek bir motiften, dönüşümlerle kuruldu.
3. Dönüşümler ölçüyü değiştirmez: bütün motifler birbirine eştir.
4. Kilimde, çinide, taş oymada hep bu düzeni görürüz.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir çini pano, alanı 12 cm² olan bir motifin yansıma, öteleme ve dönmeleriyle kurulmuş; panoda 20 motif var. Motiflerin toplam alanı kaç cm²'dir? **240 cm²** / 120 cm² / Hesaplanamaz; motifler farklı büyüklüktedir. Dayandığı anlatım: 3. İpuçları: "Yirmi motifin her biri 12 cm²: 20 × 12." · "Dönüşümler alanı değiştirmez; motiflerin hepsi eştir."

Sonra:
5. Süsleme: tek motif, üç dönüşüm.

Defter ("Süsleme"): **Süsleme:** tek motif + öteleme, yansıma, dönme. Bütün motifler eştir.

### Çıkış soruları

1. Bir şeritte motifler sırayla düz, ters, düz, ters duruyor. Yan yana iki motif arasında hangi dönüşüm vardır? **Yansıma** / Öteleme / Dönme. (sahne 3)
2. (yanılgı) "Yan yana duran motifler hep ötelemeyle elde edilir." Bu cümle için hangisi doğrudur? **Yanlıştır; komşu motif ters çevrilmişse yansımadır** / Doğrudur / Yanlıştır; hep dönmeyle elde edilir. (sahne 5)
3. (yeni durum) Bir merkez çevresinde eşit açılarla dizilmiş 6 motif tam turu dolduruyor. Her adımın dönme açısı kaç derecedir? **60°** / 30° / 6°. (sahne 4)
4. (yeni durum) Aynalı bir şeritte yansıma doğruları 5 cm aralıklı. Birinci motiften üçüncü motife hangi dönüşümle geçilir? **10 cm öteleme** / 5 cm öteleme / 10 cm uzaktaki doğruya göre yansıma. (sahne 3)
5. (yeni durum) Bir süsleme, çevresi 18 cm olan bir motifin dönüşümleriyle kurulmuş. Süslemedeki başka bir motifin çevresi kaç cm'dir? **18 cm** / 36 cm / Dönüşüme göre değişir. (sahne 6)

Özet: Süsleme, tek motife dönüşümler uygulanarak kurulur. · Ters çevrilmiş motif yansıma, kaymış motif öteleme, dönmüş motif dönme gösterir. · **Süsleme: tek motif, üç dönüşüm.** · Bir süslemedeki bütün motifler eştir.

## A6 · Konu tekrarı: Geometrik dönüşümler (`a6-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (üçgen ve yansıması · üçgen ve ötelenmişi · merkez çevresinde dönen üçgen · paralel iki doğru ve 2 × uzaklık · kesişen iki doğru ve 2 × açı · üç motifli şerit) ve deftere düşer. Biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Yansıma şekli ters çevirir; köşe ile görüntüsü doğruya eşit uzaklıktadır.
3. Öteleme her noktayı aynı yönde, aynı uzaklıkta kaydırır.
4. Dönme bir merkez çevresinde, bir açı kadar çevirir.
5. Üç dönüşümde de görüntü şekle eştir.
6. Paralel iki yansıma bir öteleme eder; uzaklık iki katıdır.
7. Kesişen iki yansıma bir dönme eder; açı iki katıdır.

Defter ("Dönüşümler"): **Görüntü şekle eştir.** Paralel iki yansıma: öteleme, 2 × uzaklık. Kesişen iki yansıma: dönme, 2 × açı.

Sorular (`quiz`, karışık sırada):

1. Aralarında 7 cm olan paralel iki doğruya göre art arda yansıtılan bir şekil kaç cm ötelenir? **14 cm** / 7 cm / 21 cm. — A3
2. Çevresi 30 cm olan bir beşgen 120° döndürüldü. Görüntünün çevresi kaç cm'dir? **30 cm** / 120 cm / 150 cm. — A2
3. Bir motif ile görüntüsü aynı duruşta; bütün köşeler aynı uzaklıkta yer değiştirmiş. Hangi dönüşüm uygulanmıştır? **Öteleme** / Yansıma / Dönme. — A1
4. Aralarındaki açı 25° olan kesişen iki doğruya göre art arda yansıtılan bir şekil kaç derece döner? **50°** / 25° / 100°. — A4
5. K noktası yansıma doğrusuna 4 cm uzakta. K ile görüntüsü K′ arasındaki uzaklık kaç cm'dir? **8 cm** / 4 cm / 16 cm. — A1
6. Bir merkez çevresinde eşit açılarla dizilmiş 10 motif tam turu dolduruyor. Her adımın dönme açısı kaç derecedir? **36°** / 10° / 18°. — A5
7. Bir şekil O çevresinde döndürülüyor. O'ya 2 cm uzaktaki M noktası ile 9 cm uzaktaki N noktası için hangisi doğrudur? **İkisi de aynı açıyla döner; N daha uzun yay çizer** / N daha büyük açıyla döner / İkisi de aynı uzunlukta yay çizer. — A2
8. Bir şeritte komşu iki motiften biri ötekinin ters çevrilmiş hâli. Birinci motiften üçüncüye hangi dönüşümle geçilir? **Öteleme** / Yansıma / Dönme. — A3, A5

Akılda kalıcı cümle: Dönüşümler yeri değiştirir, ölçüyü değiştirmez.

## Program metniyle karşılaştırma (9 Ekim 2026)

| Programın istediği (MAT.9.4.1) | Karşılığı |
|---|---|
| Yansıma örnekleri; şekil ile görüntünün karşılaştırılması; değişen ve değişmeyen özellikler | A1 sahne 1–2 |
| "Kenar uzunlukları ve çevre uzunlukları eşit midir?" | A1 sahne 1 (birlikte çöz), sahne 2 |
| Öteleme örnekleri; özelliklerine ilişkin varsayım | A1 sahne 3–4 |
| Varsayım, genelleme, karşılaştırma (a–c) | A1 sahne 2–4 (sorular, kaydırıcı, sınıflandırma); A2 sahne 3–4. Tartışma `site dışı` |
| Önerme: yansıma altındaki görüntü şekle eştir; her dönüşüm için eşlik vurgusu (ç) | A1 sahne 5; A2 sahne 5; A3 sahne 5; A4 sahne 6 |
| Öteleme = paralel iki doğruya göre sırayla iki yansıma | A3 sahne 2–4 |
| Dönme = kesişen iki doğruya göre sırayla iki yansıma | A4 sahne 2–5 |
| Dönme merkezi ve dönme açısının açıklanması | A2 sahne 2–3; A4 sahne 3–4 |
| Dönme uygulanmış şekillerle özelliklere dair çıkarım | A2 sahne 3–5 |
| Önermeleri başka çıkarımlar için kullanma (d) | A1 sahne 5 (köşegen); A3 sahne 4–5; A4 sahne 5–6; A5 sahne 3–4, 6 |
| Motif ve süsleme örnekleri; kilim ve halı; dönüşümlerin sanat ve mimarideki yeri | A5 sahne 2–6 |
| Matematik yazılımıyla karşılaştırma (MAB5) | Kaydırıcılar: A1 sahne 4, A2 sahne 4, A3 sahne 4, A4 sahne 5 |
| Motif tasarlama, kendi süslemesiyle karşılaştırma, poster ve sunum (performans görevi) | `site dışı` |

Fazla olan: yok. "Ters çevrilme" ve köşeleri dolaşma oku, programın "değişen özellikler" isteğinin ve kitabın "yön" sözünün gösterimidir; yeni kavram değildir. A5'teki "360° ÷ motif sayısı" kitabın 12 motif ve 30° örneğinin (s. 30) genellenmesidir. Eksik olan: yok.
