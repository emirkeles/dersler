# Senaryolar — Konu D · Tales, Öklid ve Pisagor teoremleri

Yazıldı: 9 Ekim 2026. Dayanak: `../MUFREDAT.md` MAT.9.4.4 ve "Öğrenme-öğretme uygulamaları" altındaki bölümü, `../PLAN.md` bölüm 3 (D1–D7), bölüm 7 (karar 2, 4, 5, 6) ve bölüm 8 ("D" satırları). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-geometrik-donusumler.md` ile aynıdır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Okunuşlar ders yazılırken `speak` ile verilir: |AB| "A B uzunluğu"; AB ∥ DE "A B, D E'ye paraleldir" (kısaltma "//"); ABC ~ ADE "A B C üçgeni, A D E üçgenine benzerdir"; |AD|/|DB| "A D bölü D B" (iki oranın eşitliği "A D bölü D B, A E bölü E C'ye eşittir"; "uzunluğu" sözü tekrarlanmaz); 21/4 "yirmi bir bölü dört"; 1,8 "bir virgül sekiz"; h² "h kare"; p·k "p çarpı k"; a² + b² "a kare artı b kare"; c² > a² + b² "c kare, a kare artı b kareden büyüktür"; < ve > "küçüktür", "büyüktür"; √34 "kök otuz dört"; ≈ "yaklaşık"; m(ABC) "A B C açısının ölçüsü"; 90° "doksan derece"; A′ "A üssü".
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı hiçbir yerde görmez. Kitapta sayı verilmeyen durumlar (çit, sokaklar, gölge, 4-6-9 üçgeni, 6-8-10 tarlası, 3-4-5 merdiveni) "örnek veri"dir; öğrenciye durumun içinde sunulur.
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" hangi satırlar olduğunu söyler. Kalın şık doğru cevaptır; derste şıkların sırası karıştırılır.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor (`tag: 'Sıra sende'`) → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. İspat bölümlü derslerde "birlikte çöz" ispatın bir adımının gerekçesini ya da eşleşmesini seçtirir.
- **İspatlar.** Her ispat tahtada "Verilen / İstenen" ile açılır; her adım tek satır, gerekçesi yanında soluk yazılır; aynı anda en çok dört adım canlıdır, biten adım soluklaşır (25 kelime ve 12 öğe sınırı). İspat adımlarının sırası ve gerekçesi her derste "İspat" bloğunda tek tek yazılıdır; dersi yazan ajan bu sırayı aynen kullanır. Gerekçeler yalnızca önceki derslerden gelir; ders kodu parantez içinde verilmiştir (öğrenci görmez). Tek ispat yöntemi benzer üçgenlerdir (karar 5); alan ya da kare kesme yoktur.
- Renkler: şekil mavi, benzer küçük üçgen turuncu, paralel doğrular mor (kesikli), kesenler (d1, d2) koyu gri, yükseklik sarı, dik açı küçük kare. Benzerliği gösterilen üçgen çiftlerinde (D1, D2, D4) karşılıklı köşelerin açı yayları aynı renkte ve aynı sayıdadır (tek yay, çift yay); her kenar karşısındaki açının rengini alır. D3–D5'te kenar renkleri role göre sabittir: h sarı, p ve c turuncu, k ve b yeşil, hipotenüs a mavi.
- Çizimler ölçeklidir. Her şeklin köşeleri "(x, y)" ile verilir: sol üst (0, 0), x sağa, y aşağı; ondalıklar nokta ile yazılır; birim tahtada tek birimdir, ölçek ders yazılırken tahtaya sığacak biçimde seçilir. Koordinatlar yalnızca dersi yazan içindir, tahtaya yazılmaz. Uzunluklar şekildeki gerçek uzaklıktır; sorulan uzunluk "?" ile gösterilir ama çizimde gerçek boyunda durur.
- Harfler kitaptaki gibidir. D1: ABC üçgeni, D ∈ [AB], E ∈ [AC]. D2: d3 ∥ d4 ∥ d5 paraleller; d1 ve d2 kesenler; A, B, C ∈ d1 ve D, E, F ∈ d2 (A, D ∈ d3; B, E ∈ d4; C, F ∈ d5). D3–D5: BAC dik üçgeni, A'da dik; AH ⊥ BC, H ∈ [BC]; |BH| = p, |HC| = k, |AH| = h, |BC| = a (hipotenüs), |AC| = b, |AB| = c. D5'in sonunda aynı teorem kitaptaki gösterimiyle yazılır (dik kenarlar a ve b, hipotenüs c); D6 ve D7 bu gösterimi kullanır.
- Bu konuda yazılmayanlar: teoremlerin tersi; orta taban; kenar karelerinden açının türünü bulma (karar 4: D6 yalnızca açıdan kenar karelerine bakar); kosinüs teoremi; üçgen eşitsizliği; alan ve kare kesme ispatları (karar 5).

## D1 · Üçgende paralel doğru kenarları aynı oranda böler

- **Fikir:** Üçgende bir kenara paralel çizilen doğru öbür iki kenarı aynı oranda böler: |AD|/|DB| = |AE|/|EC|.
- **Giriş ekranı sorusu:** Üçgen bir arsayı bir kenarına paralel bir çitle bölersen öbür iki kenar hangi oranda bölünür?
- **Kaynak:** Ders kitabı s. 61 (10. uygulama, adım 6a: ispatlanacak ifade), s. 65 (Kontrol Noktası: "temel orantı teoremi" adı ve ifadesi), s. 58 (Kontrol Noktası: kenara paralel, |AD|/|AB| = |AE|/|AC|; C2 bilgisi), s. 63 (21. örnek), s. 75 (alıştırma 8; "|BD| = |AD| + 0,8" verisi PLAN bölüm 8'de yoktur).
- **Sınır:** Teoremin tersi (orandan paralellik) yok; orta taban adı yok; alan ve çevre oranı yok. Sayısal örnekler bütünün oranından (C2) parçaların oranına geçişi gösterir, yeni kural değildir.
- **Güç kavramlar ve gösterimi:** (1) "Bütünün oranı"ndan "parçaların oranı"na geçiş: AB ve AC beşer eşit çubuğa bölünür; AD ve AE ikişer, DB ve EC üçer çubuktur; sonra aynı akıl harflerle (ispat). (2) İspatta her adımın gerekçesi yanında soluk yazılır. (3) 21. örnekte iki paralel: önce küçük üçgen, sonra büyük üçgen ayrı ayrı vurgulanır.
- **Hedeflenen yanılgı:** |AD|/|DB| = |DE|/|BC| (parça oranını paralel kenarlara taşımak).
- **Akılda kalıcı cümle:** Paralel doğru iki kenarı aynı oranda böler.

Çizim verisi:
- Çit üçgeni (sahne 2–4, 6): A (0.79, 0), B (0, 9.97), C (12, 9.97); |AB| = 10, |AC| = 15, |BC| = 12. D, AB üstünde: (0.48, 3.99), |AD| = 4, |DB| = 6. E, AC üstünde: (5.28, 3.99), |AE| = 6, |EC| = 9. DE yatay, BC'ye paralel, |DE| = 4,8.
- İki paralelli üçgen (sahne 5): A (1.66, 0), B (0, 6.80), C (11.85, 6.80); |AB| = 7, |AC| = 12.25. D, AB üstünde: (0.71, 3.89), |AD| = 4, |DB| = 3. E, AC üstünde: (7.48, 3.89), |AE| = 7, |EC| = 5.25. F, AE üstünde: (4.99, 2.22), |AF| = 4, |FE| = 3. DE ∥ BC (yatay); DF ∥ BE.
- Sıra sende üçgeni (sahne 5): A (0.61, 0), B (0, 2.98), C (2.97, 2.98); |AB| = 3.04, |AC| = 3.8. D, AB üstünde: (0.39, 1.10), |AD| = 1.12, |DB| = 1.92. E, AC üstünde: (1.48, 1.10), |AE| = 1.4, |EC| = 2.4. DE ∥ BC (yatay).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (C2) DE ∥ BC olan ABC üçgeninde (D ∈ AB, E ∈ AC) ADE ile ABC için hangisi doğrudur? **Benzerdir: ortak açı ve yöndeş açılar eşit** / Eştir: kenarları aynıdır / Benzer değildir: DE daha kısadır. Yanlışta: "Kenara paralel çizilen doğru, ortak açı ve yöndeş açılarla benzer üçgen verir."
2. (B3) ABC ~ DEF ise |AB|/|DE| hangi orana eşittir? **|BC|/|EF|** / |BC|/|DF| / |AC|/|EF|. Yanlışta: "Karşılıklı köşeler aynı sırada yazılır: A↔D, B↔E, C↔F; oranlar karşılıklı kenarlar arasındadır."

### Sahne 2 · Çit

Tahta: mavi ABC arsası (çizim verisi: çit üçgeni); köşe harfleri ve |AB| = 10, |AC| = 15. Sıra ile: mor kesikli DE çiti belirir (uçları D ve E); |AD| = 4 ve |AE| = 6 etiketleri; sonra |DB| = 6 ve |EC| = 9. Sağda iki oran alt alta: 4/6 = 2/3 ve 6/9 = 2/3 (ikisi turuncu). Sonra ADE üçgeni turuncuya boyanır, eşit açı yayları belirir. Son bölümde sağda iki yatay çubuk: üstteki AB (10 m), alttaki AC (15 m); her biri beş eşit parçaya bölünür (AB'de parça 2 m, AC'de parça 3 m); AD ve AE'nin ikişer parçası turuncu, DB ve EC'nin parçaları yeşil.

Anlatım:
1. Üçgen biçimli bir arsanın AB kenarı 10 m, AC kenarı 15 m.
2. Arsanın BC kenarına paralel bir çit çekilecek.
3. Çitin uçları D ve E; DE doğrusu BC'ye paralel.
4. D noktası A'dan 4 m, E noktası A'dan 6 m uzakta.
5. Kalan parçalar: |DB| = 6 m ve |EC| = 9 m.
6. AD ile DB'nin oranı 4/6, yani 2/3.
7. AE ile EC'nin oranı 6/9, yani 2/3.
8. Çit iki kenarı da aynı oranda bölmüş.
9. DE, BC'ye paralel olduğu için ADE, ABC'ye benzerdir.
10. Karşılıklı kenarlar orantılı: |AD|/|AB| = |AE|/|AC|.
11. 4/10 ile 6/15: ikisi de 2/5.
12. 2/5 bütüne göre oran; parçaların oranı ise 2/3.
13. AB'yi beş eşit parçaya bölelim: her parça 2 m.
14. AD iki parça, DB üç parça.
15. AC'yi de beş eşit parçaya bölelim: her parça 3 m.

Birlikte çöz (`tag: 'Birlikte çöz'`): AE iki parça (6 m). EC kaç parçadır? **3 parça** / 2 parça / 5 parça. Dayandığı anlatım: 11, 15. İpuçları: "AC beş parçaydı; ikisi AE'ydi." · "Beş parçadan ikisini çıkar."

Sonra:
16. EC üç parça: AE ile EC'nin oranı 2/3.
17. Parçaların oranı iki kenarda da aynı.

### Sahne 3 · İspat: benzerlikten başla

Tahta: sol üstte "Verilen: DE ∥ BC" ve "İstenen: |AD|/|DB| = |AE|/|EC|" (8 öğe); altta harflerle ABC, D, E (ölçüsüz, aynı çizim; mor kesikli DE). Sağda ispat adımları sırayla (her adım tek satır, gerekçesi soluk). Eşit açı yayları: A'da çift yay (ortak), B ve D'de tek yay, C ve E'de üç yay; ADE turuncu.

İspat (adım 1–4; devamı sahne 4):

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | m(ADE) = m(ABC) | DE ∥ BC, AB kesen: yöndeş açılar eşit (C2) |
| 2 | m(DAE) = m(BAC) | A açısı ortaktır |
| 3 | ADE ~ ABC | iki açı eşit: Açı-Açı (B4) |
| 4 | \|AD\|/\|AB\| = \|AE\|/\|AC\| | benzer üçgenlerde karşılıklı kenarlar orantılı; D↔B, E↔C (B3) |

Anlatım:
1. Sayılarla gördük; şimdi bunu her üçgen için gösterelim.
2. Verilen: DE ∥ BC. İstenen: |AD|/|DB| = |AE|/|EC|.
3. DE ∥ BC; AB kesen: yöndeş açılar eşit.
4. A açısı iki üçgende ortak.
5. İki açı eşit: Açı-Açı; ADE ~ ABC.

Birlikte çöz (`tag: 'Birlikte çöz'`): ADE ~ ABC ise |AD| kenarının karşılığı hangisidir? **|AB|** / |AC| / |DB|. Dayandığı anlatım: 5 (köşe sırası D↔B). İpuçları: "Köşeler sırayla eşleşir: A↔A, D↔B, E↔C." · "AD kenarı A ile D arasında; karşılığı A ile B arasında."

Sonra:
6. Karşılıklı kenarlar orantılı: |AD|/|AB| = |AE|/|AC|.

### Sahne 4 · İspat: parçalara geçiş

Tahta: dördüncü adım yukarıda soluk; altına adımlar 5–8. Sağda sayılı karşılığı (turuncu, soluk): 10/4 = 15/6 → 6/4 = 9/6 → 2/3 = 6/9.

İspat (adım 5–8; 1–4 sahne 3'te):

| Adım | İfade | Gerekçe |
|---|---|---|
| 5 | \|AB\|/\|AD\| = \|AC\|/\|AE\| | eşit oranların tersleri de eşittir |
| 6 | \|AB\|/\|AD\| − 1 = \|AC\|/\|AE\| − 1 | iki yandan 1 çıkar |
| 7 | \|DB\|/\|AD\| = \|EC\|/\|AE\| | 1 = \|AD\|/\|AD\| ve \|AB\| − \|AD\| = \|DB\|, \|AC\| − \|AE\| = \|EC\| (D, E kenar üstünde) |
| 8 | \|AD\|/\|DB\| = \|AE\|/\|EC\| | tersleri al ∎ |

Anlatım:
1. İki oran eşitse tersleri de eşittir: |AB|/|AD| = |AC|/|AE|.
2. İki yandan 1 çıkaralım.
3. 1, |AD|/|AD| demektir; |AB| − |AD| farkı |DB|'dir.
4. Sol yan |DB|/|AD|, sağ yan |EC|/|AE| olur.
5. Terslerini alalım: |AD|/|DB| = |AE|/|EC|.
6. İspat tamam: paralel doğru iki kenarı aynı oranda böler.
7. Bu sonuca temel orantı teoremi denir.

Defter ("Temel orantı"): **Temel orantı:** DE ∥ BC ise |AD|/|DB| = |AE|/|EC|.

Sonra (örnekle göster):
8. |AD| = 6, |DB| = 4 ve |AE| = 9 olsun.
9. |AD|/|DB| = 6/4 = 3/2; bu oran |AE|/|EC|'ye eşit.
10. 9/|EC| = 3/2 olduğundan |EC| = 6.

Soru (`tag: 'Sıra sende'`; tahtada çit üçgeni, |AD| = 5, |DB| = 10, |EC| = 8, |AE| = ?): |AD| = 5 m, |DB| = 10 m ve |EC| = 8 m. |AE| kaç metredir? **4 m** / 16 m / 13 m. Dayandığı anlatım: 5–6, 8–10. İpuçları: "|AD|/|DB| = |AE|/|EC|; |AD|/|DB| = 5/10." · "|AE|, |EC|'nin yarısı olmalı."

Gör: 5/10 = 4/8: iki oran yan yana 1/2 olarak belirir.

### Sahne 5 · İki paralel

Tahta: ABC üçgeni (çizim verisi: iki paralelli üçgen), D, E, F. DF mor kesikli (BE'ye paralel), DE mor kesikli (BC'ye paralel); BE çizgisi gri. |AF| = 4, |FE| = 3; |EC| = ?. Önce ABE üçgeni mavi vurgulanır (DF ∥ BE), sonra ABC üçgeni (DE ∥ BC). AD = p, DB = k yazılır.

Anlatım:
1. Bu kez üçgende iki paralel doğru var.
2. DF, BE'ye paralel; DE ise BC'ye paralel.
3. |AF| = 4 ve |FE| = 3; |EC| aranıyor.
4. |AD| = p ve |DB| = k diyelim.
5. ABE üçgeninde DF ∥ BE: |AD|/|DB| = |AF|/|FE|.
6. Yani p/k = 4/3.

Birlikte çöz (`tag: 'Birlikte çöz'`): ABC üçgeninde de DE ∥ BC; |AE| kaç cm? **7 cm** / 4 cm / 3 cm. Dayandığı anlatım: 3. İpuçları: "|AE|, |AF| ile |FE|'nin toplamı." · "4 yalnızca ilk parçaydı."

Sonra:
7. ABC üçgeninde DE ∥ BC: p/k = |AE|/|EC|.
8. p/k = 4/3 olduğundan 4/3 = 7/|EC|.
9. İçler dışlar: 4·|EC| = 21.
10. |EC| = 21/4 cm, yani 5,25 cm.

Defter ("İki paralel"): **İki paralel:** aynı oran iki üçgende: |AD|/|DB| = |AF|/|FE| = |AE|/|EC|.

Soru (`tag: 'Sıra sende'`; tahtada çizim verisi "Sıra sende üçgeni", ev çatısı olarak; |AE| = 1,4 m, |EC| = 2,4 m; DE ∥ BC; |BD| = |AD| + 0,8 m; |AD| = ?): Bir ev çatısında DE ∥ BC; |AE| = 1,4 m ve |EC| = 2,4 m. |BD|, |AD|'den 0,8 m uzun. |AD| kaç metredir? **1,12 m** / 0,8 m / 1,4 m. Dayandığı anlatım: 4–6, sahne 4 (5–6). İpuçları: "|AD| = x dersen |DB| = x + 0,8 olur." · "x/(x + 0,8) = 1,4/2,4 = 7/12; içler dışlar."

Gör: 12x = 7(x + 0,8) → 5x = 5,6 → x = 1,12; |DB| = 1,92 ve 1,12/1,92 = 1,4/2,4 = 7/12.

### Sahne 6 · Dene: çitin yeri

Tahta: ABC (çit üçgeni, çizim verisi: çit üçgeni); çit D ve E uçlarıyla BC'ye paralel kayar. Sağda tablo: |AD|, |DB|, |AE|, |EC|, |AD|/|DB|, |AE|/|EC|, |DE|/|BC|. Kaydırıcı (`c.slider`, "Çitin yeri", |AD| = 2 … 8 birim, adım 1; E, |AE| = 1,5·|AD| olacak biçimde konumlanır; `noWait` yönerge: "Çiti kaydır; üç orana bak."). Tablo değerleri (|AD|: |DB|, |AE|, |EC|, |AD|/|DB| = |AE|/|EC|, |DE|/|BC|): 2: 8, 3, 12, 0,25, 0,2 · 3: 7, 4,5, 10,5, 0,43, 0,3 · 4: 6, 6, 9, 0,67, 0,4 · 5: 5, 7,5, 7,5, 1, 0,5 · 6: 4, 9, 6, 1,5, 0,6 · 7: 3, 10,5, 4,5, 2,33, 0,7 · 8: 2, 12, 3, 4, 0,8. "Devam" ile biter.

Anlatım:
1. Çit nereye giderse gitsin iki oran eşit kalıyor.
2. |DE|/|BC| oranı ise bunlara eşit değil.
3. Parçaların oranı, öbür kenardaki parçaların oranına eşittir.

### Çıkış soruları

1. (yanılgı) DE ∥ BC olan ABC üçgeninde (D ∈ AB, E ∈ AC) hangi eşitlik her zaman doğrudur? **|AD|/|DB| = |AE|/|EC|** / |AD|/|DB| = |DE|/|BC| / |AD|/|AE| = |DB|/|BC|. (sahne 4, 6)
2. (yeni durum) DE ∥ BC; |AD| = 3 cm, |DB| = 5 cm, |AE| = 6 cm. |EC| kaç cm'dir? **10 cm** / 3,6 cm / 9 cm. (sahne 4)
3. (yeni durum) DE ∥ BC; |AD|/|DB| = 3/4 ve |AC| = 14 cm. |AE| kaç cm'dir? **6 cm** / 8 cm / 10,5 cm. (sahne 4)
4. (yeni durum) DF ∥ BE ve DE ∥ BC; |AF| = 6 cm, |FE| = 3 cm. |EC| kaç cm'dir? **4,5 cm** / 18 cm / 3 cm. (sahne 5)
5. (yeni durum) Üçgen bir tarlanın |AB| kenarı 12 m, |AC| kenarı 15 m. BC'ye paralel çitin D ucu A'dan 8 m uzakta. Çitin E ucu A'dan kaç metre uzaktadır? **10 m** / 7,5 m / 12 m. (sahne 2, 4)

Özet: Paralel doğru iki kenarı aynı oranda böler. · Oran, köşeye yakın parçalar arasında kurulur. · Parça oranı, paralel kenarın oranı değildir. · **Paralel doğru iki kenarı aynı oranda böler.**

## D2 · Tales teoremi: paraleller ve kesenler

- **Fikir:** Birbirine paralel en az üç doğru, kendilerini kesen iki doğru üzerinde orantılı parçalar ayırır: |AB|/|BC| = |DE|/|EF|.
- **Giriş ekranı sorusu:** Üç paralel sokağı kesen iki caddede bloklar neden aynı oranda dizilir?
- **Kaynak:** Ders kitabı s. 60 (Tales ve Mısır piramitleri; teoremin ifadesi ve şekli), s. 60–61 (10. uygulama), s. 61–62 (19. örnek: gölet), s. 63–64 (23. örnek: mum alevi), s. 65 (Kontrol Noktası: Tales teoremi), s. 74 (alıştırma 2: yalnızca |AB|/|BC| = 2/3 oranı).
- **Sınır:** "En az üç" paralel; dört paralel yeni durum olarak gösterilir, yeni kural değildir. 1/x = 1/a + 1/b kenar notu (s. 63) ve a/d = b/c = e/f kenar notu (s. 64) alınmaz; mum örneğinde oran benzer üçgenlerden çıkar. Tales'in nasıl hesapladığı kitapta yazılı değildir; yalnızca "gölgelerden yararlandığı" söylenir. Teoremin tersi yok.
- **Güç kavramlar ve gösterimi:** Yardımcı çizgi: bir kesenin ucundan öbür kesenin öbür ucuna köşegen (AF) çizilir; iki üçgen iki renkte ayrılır (ACF mavi, AFD turuncu); ortak köşegendeki oran iki yana taşınır.
- **Hedeflenen yanılgı:** "Karşılıklı parçalar eşittir" ve paralellerin üstündeki parçaları kesen parçalarıyla oranlamak.
- **Akılda kalıcı cümle:** Paraleller kesenleri aynı oranda böler.

Çizim verisi (birim = 10 m; ders kitabındaki gibi d1 ve d2 yukarıda birleşir):
- Ana şekil (sahne 3–5, 10): d3: y = 0; d4: y = 4.8; d5: y = 12 (yatay, mor kesikli). d1: A (6, 0), B (2.4, 4.8), C (−3, 12); d2: D (10, 0), E (12, 4.8), F (15, 12). |AB| = 6, |BC| = 9, |AC| = 15; |DE| = 5.2, |EF| = 7.8, |DF| = 13. Köşegen AF: |AF| = 15; P, AF ile d4'ün kesişimi: (9.6, 4.8), |AP| = 6, |PF| = 9. (x değerleri negatife düşerse çizim sağa kaydırılır.)
- Birlikte çöz şekli (sahne 6): d3: y = 0; d4: y = 3.2; d5: y = 8. d1: A (8, 0), B (5.6, 3.2), C (2, 8); d2: D (14, 0), E (19.08, 3.2), F (26.69, 8). |AB| = 4, |BC| = 6; |DE| = 6, |EF| = 9 (sorulan, "?").
- Sıra sende şekli (sahne 6): d3: y = 0; d4: y = 3.6; d5: y = 9. d1: A (8, 0), B (3.2, 3.6), C (−4, 9); d2: D (14, 0), E (21.14, 3.6), F (31.86, 9). |AB| = 6 ("?"), |BC| = 9; |DE| = 8, |EF| = 12.
- Dört paralel (sahne 7): d3: y = 0; d4: y = 1.2; d5: y = 3; d6: y = 6. d1: A (10, 0), B (8.4, 1.2), C (6, 3), K (2, 6); d2: D (14, 0), E (17.82, 1.2), F (23.54, 3), L (33.08, 6). |AB| = 2, |BC| = 3, |CK| = 5; |DE| = 4, |EF| = 6, |FL| = 10 (birim 10 m: 20, 30, 50 m; 40, 60, 100 m).
- Mum (sahne 8; birim cm): A (0, 0), B (0, 12), H (14.83, 6), D (22.25, 3), C (22.25, 9); AB ve CD dikey, mor kesikli; delik düzlemi EF de dikey ve mor kesikli: x = 14.83. |AB| = 12, |CD| = 6, |BH| = 16, |HD| = 8, |AH| = 16, |HC| = 8.
- Gölet (sahne 9; birim m): A (0, 25), C (12, 25), D (60, 25) yerde; B (12, 20), E (60, 0). |AC| = 12, |CD| = 48 (sorulan), |BC| = 5, |DE| = 25; BC ∥ ED (ikisi de dikey). Gölet C ile D arasındadır (mavi açık elips); A, B, E doğrusal; A, C, D doğrusal.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D1) DE ∥ BC olan ABC üçgeninde |AD| = 2, |DB| = 4 ve |AE| = 3 olsun. |EC| kaçtır? **6** / 1,5 / 5. Yanlışta: "|AD|/|DB| = |AE|/|EC| yazılır: 2/4 = 3/|EC|."
2. (B4) İki üçgenin karşılıklı iki açısı eşitse hangisi doğrudur? **Üçgenler benzerdir; karşılıklı kenarlar orantılıdır** / Üçgenler eştir; karşılıklı kenarlar eşittir / Hiçbir şey söylenemez. Yanlışta: "İki açı eşitse üçüncü açı da eşittir: Açı-Açı benzerliği; kenarlar orantılıdır."

### Sahne 2 · Tales ve gölge

Tahta: yerde mavi piramit (üçgen), yanında kısa dikey bir çubuk; gökten paralel mor ışınlar (kesikli) çubuğun ve piramidin tepesinden yere uzanır; iki gölge yerde kalın çizgi. Çubuk 2 m, gölgesi 3 m; piramit gölgesi 210 m (örnek veri). Küçük üçgen turuncu, büyük mavi; eşit açılar yaylı.

Anlatım:
1. Tales, Mısır'daki piramitlerin yüksekliğini gölgelerden yararlanarak ölçmüştür.
2. Toprağa bir çubuk dikilir; gölgesi ölçülür.
3. Piramidin gölgesi de aynı saatte ölçülür.
4. Çubuk da piramit de yere diktir.
5. Güneş ışınları paraleldir; aynı açıyla gelir.
6. Açı-Açı: iki gölge üçgeni benzerdir.
7. Boyların oranı, gölgelerin oranına eşittir.
8. Çubuk 2 m, gölgesi 3 m; piramidin gölgesi 210 m olsun.
9. 2/3 = yükseklik/210 olduğundan yükseklik 140 m çıkar.
10. Tales teoremi, paralel doğrular ve kesenler arasındaki ilişkiyi açıklar.

### Sahne 3 · Paraleller ve kesenler

Tahta: şehir planı: üç yatay paralel sokak d3, d4, d5 (mor kesikli, soldan adları), iki cadde d1 ve d2 (koyu gri); kesişimler A, B, C (d1) ve D, E, F (d2) harfleriyle (ana şekil). Uzunluklar sırayla belirir: |AB| = 60 m, |BC| = 90 m; |DE| = 52 m, |EF| = 78 m (parçalar iki renkli: AB ve DE turuncu, BC ve EF yeşil). Sağda: 60/90 = 2/3 ve 52/78 = 2/3. Sonunda teorem cümlesi.

Anlatım:
1. Bir kentte üç paralel sokağı iki cadde kesiyor.
2. Sokaklara d3, d4 ve d5; caddelere d1 ve d2 diyelim.
3. Sol cadde sokakları A, B ve C noktalarında kesiyor.
4. Sağ cadde aynı sokakları D, E ve F noktalarında kesiyor.
5. Sol caddede |AB| = 60 m, |BC| = 90 m.
6. Sağ caddede |DE| = 52 m, |EF| = 78 m.
7. Karşılıklı parçalar eşit değil: 60 m ile 52 m.
8. Ama oranlar eşit: 60/90 = 52/78 = 2/3.
9. Bu her üç paralel için doğru: Tales teoremi.
10. Paralel üç doğru kesenlerde orantılı parça ayırır: |AB|/|BC| = |DE|/|EF|.

### Sahne 4 · İspat: yardımcı çizgi

Tahta: sol üstte "Verilen: d3 ∥ d4 ∥ d5" ve "İstenen: |AB|/|BC| = |DE|/|EF|" (ana şekil, ölçüsüz). Sonra A ile F birleştirilir: AF köşegeni açık renkli (beyaz) çizgi; d4'ü P'de keser. ACF üçgeni açık mavi, AFD üçgeni açık turuncu boyanır (ortak kenar AF). Önce ACF: BP ∥ CF işaretlenir (iki ok).

İspat (adım 1–3; devamı sahne 5):

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | AF'yi çiz; AF, d4'ü P'de kessin | yardımcı çizgi (d4, A ile F arasında) |
| 2 | ACF'de BP ∥ CF; B ∈ AC, P ∈ AF | d4 ∥ d5 |
| 3 | \|AB\|/\|BC\| = \|AP\|/\|PF\| | temel orantı (D1), köşe A |

Anlatım:
1. Bunu her üç paralel için göstermek istiyoruz.
2. Elimizde temel orantı teoremi var; ona üçgen gerekir.
3. A ile F'yi birleştirelim: AF köşegeni.
4. AF, d4 doğrusunu P noktasında kesiyor.
5. İki üçgen oluştu: ACF ve AFD.
6. ACF üçgeninde BP, CF'ye paralel; d4 ∥ d5.
7. Temel orantı A köşesinden okunur: yakın parça bölü uzak parça.

Birlikte çöz (`tag: 'Birlikte çöz'`): ACF üçgeninde BP ∥ CF. Temel orantı teoremine göre |AB|/|BC| hangi orana eşittir? **|AP|/|PF|** / |AP|/|AF| / |BP|/|CF|. Dayandığı anlatım: 6–7. İpuçları: "Köşe A; parçalar AB, BC ve AP, PF." · "Yakın parça bölü uzak parça: AB/BC ile AP/PF."

Sonra:
8. Temel orantı: |AB|/|BC| = |AP|/|PF|.

### Sahne 5 · İspat: ikinci üçgen

Tahta: AFD üçgeni öne çıkar (turuncu), ACF soluk. PE ∥ AD işaretlenir (iki ok). F köşesinden okuma oku: FP ve FE kısa parçalar, PA ve ED uzun parçalar. Sağda ispat satırları.

İspat (adım 4–7):

| Adım | İfade | Gerekçe |
|---|---|---|
| 4 | AFD'de PE ∥ AD; P ∈ FA, E ∈ FD | d4 ∥ d3 |
| 5 | \|FP\|/\|PA\| = \|FE\|/\|ED\| | temel orantı (D1), köşe F |
| 6 | \|AP\|/\|PF\| = \|DE\|/\|EF\| | eşit oranların tersleri de eşittir |
| 7 | \|AB\|/\|BC\| = \|AP\|/\|PF\| = \|DE\|/\|EF\| | 3 ve 6'da \|AP\|/\|PF\| ortak ∎ |

Anlatım:
1. AFD üçgenine bu kez F köşesinden bakalım.
2. F'den iki kenar çıkıyor: FA ve FD.
3. PE, AD'ye paralel; FA'yı P'de, FD'yi E'de kesiyor.
4. Temel orantı: |FP|/|PA| = |FE|/|ED|.
5. Terslerini alalım: |AP|/|PF| = |DE|/|EF|.
6. İki eşitlikte de |AP|/|PF| var.
7. Öyleyse |AB|/|BC| = |AP|/|PF| = |DE|/|EF|.
8. İspat tamam: Tales teoremi her üç paralel için doğru.

Defter ("Tales"): **Tales:** paralel üç doğru kesenlerde orantılı parça ayırır: |AB|/|BC| = |DE|/|EF|.

### Sahne 6 · Tales'i kullan

Tahta (birlikte çöz): "Birlikte çöz şekli" (ölçekli). Sol caddede |AB| = 40 m, |BC| = 60 m; sağ caddede |DE| = 60 m, |EF| = ?. Sonra "Sıra sende şekli".

Anlatım:
1. Sol caddede |AB| = 40 m ve |BC| = 60 m.
2. Sağ caddede |DE| = 60 m; |EF| aranıyor.
3. Tales: |AB|/|BC| = |DE|/|EF|.
4. Sayıları yazalım: 40/60 = 60/|EF|.

Birlikte çöz (`tag: 'Birlikte çöz'`): 40/60 = 60/|EF| ise |EF| kaç metredir? **90 m** / 40 m / 100 m. Dayandığı anlatım: 3–4. İpuçları: "İçler dışlar: 40·|EF| = 60·60." · "|EF|, |DE|'den büyük olmalı: 60'ın 3/2 katı."

Sonra:
5. 40·|EF| = 3600; |EF| = 90 m.

Soru (`tag: 'Sıra sende'`; "Sıra sende şekli", |BC| = 9 m, |DE| = 8 m, |EF| = 12 m, |AB| = ? ): Bir caddede |BC| = 9 m. Öbür caddede |DE| = 8 m ve |EF| = 12 m. |AB| kaç metredir? **6 m** / 8 m / 13,5 m. Dayandığı anlatım: sahne 5 (defter), sahne 6 (3). İpuçları: "|AB|/|BC| = |DE|/|EF|; |AB|/9 = 8/12." · "|AB|, |BC|'den küçük olmalı; 8/12 birden küçük."

Gör: 8/12 = 2/3; |AB| = 9·2/3 = 6 m.

### Sahne 7 · Dört paralel

Tahta: dört paralel d3, d4, d5, d6 ve kesenler d1, d2 (çizim verisi: dört paralel); A, B, C, K ve D, E, F, L. Sol: |AB| = 20 m, |BC| = 30 m, |CK| = 50 m. Sağ: |DE| = 40 m; |EF| ve |FL| yazılır (60 ve 100). İlk üç paralel mavi, son üç paralel turuncu çerçeveyle gösterilir.

Anlatım:
1. Paralel doğrular dört olsun: d3, d4, d5 ve d6.
2. Tales teoremi, seçilen her üç paralel için geçerli.
3. d3, d4, d5 için: |AB|/|BC| = |DE|/|EF|.
4. d4, d5, d6 için: |BC|/|CK| = |EF|/|FL|.
5. Sol caddede AB 20 m, BC 30 m, CK 50 m.
6. Sağ caddede |DE| = 40 m olsun.
7. 20/30 = 40/|EF| olduğundan |EF| = 60 m.
8. 30/50 = 60/|FL| olduğundan |FL| = 100 m.

### Sahne 8 · Kesenler paralellerin arasında kesişirse

Tahta: mum şekli (çizim verisi: mum), mor kesikli üç dikey paralel AB, EF, CD; kesenler BD ve AC, H'de kesişir. Küçük mum alevi ve karton kutu şematik. |AB| = 12 cm, |BH| = 16 cm, |HD| = 8 cm; |CD| = ?. Sırayla AHB ve CHD üçgenleri (AHB mavi, CHD turuncu); eşit açı yayları: B ve D tek yay, A ve C çift yay, H'de üç yay.

Anlatım:
1. Saydam olmayan bir kutunun önünde 12 cm'lik bir mum alevi yanıyor.
2. Işık, EF düzlemindeki küçük delikten, H'den geçip karşı yüzeye düşer.
3. Alevin ucu A, tabanı B; görüntünün uçları C ve D.
4. AB, EF ve CD paraleldir; BD ve AC kesenlerdir.
5. H noktası B'ye 16 cm, D'ye 8 cm uzakta.
6. AB ∥ CD, BD kesen: ABD ile BDC iç ters açılar, eşit.
7. AC kesen: BAH ile HCD iç ters açılar, eşit.
8. Açı-Açı: AHB ~ CHD.
9. Karşılıklı kenarlar: |BH|/|HD| = |AB|/|CD|.
10. 16/8 = 12/|CD| olduğundan |CD| = 6 cm.
11. Tales da aynı oranı verir: |BH|/|HD| = |AH|/|HC|.

Soru (`tag: 'Sıra sende'`; mum şekli, ölçekli küçültülmüş: |AB| = 9, |BH| = 12, |HD| = 4, |CD| = ?): Bir başka kutuda alev 9 cm; |BH| = 12 cm ve |HD| = 4 cm. Görüntünün boyu |CD| kaç cm'dir? **3 cm** / 27 cm / 5 cm. Dayandığı anlatım: 8–10. İpuçları: "AHB ~ CHD; |BH|/|HD| = |AB|/|CD|." · "12/4 = 3: AB, CD'nin üç katı."

Gör: 12/4 = 9/|CD| → |CD| = 3 cm.

(Sıra sende şekli, birim cm: A (0, 0), B (0, 9), H (11.12, 4.5), D (14.83, 3), C (14.83, 6); |AB| = 9, |CD| = 3 ("?"), |BH| = 12, |HD| = 4; AB ve CD dikey, mor kesikli.)

### Sahne 9 · Kesenler paralellerin dışında kesişirse

Tahta: gölet şekli (çizim verisi: gölet). Meral A, B ve C noktalarına çubuk diker; Emine A ve B çubuklarıyla aynı hizaya gelip E'yi, A ve C çubuklarıyla aynı hizaya gelip D'yi işaretler. A, B, E doğrusu çizilir (açık renkli); A, C, D yerde. BC ∥ ED mor kesikli. |AC| = 12, |BC| = 5, |DE| = 25; |CD| = ?. ABC (turuncu) ve AED (mavi).

Anlatım:
1. Meral, A, B ve C noktalarına çubuk dikiyor.
2. Emine, A ve B ile aynı hizada E'yi işaretliyor.
3. Aynı şekilde A ve C ile aynı hizada D'yi işaretliyor.
4. BC ∥ ED; BC 5 m, AC 12 m, DE 25 m.
5. Gölün genişliği |CD| aranıyor.
6. BC ∥ ED olduğundan ABC ile AED benzerdir.
7. Karşılıklı kenarlar: |AC|/|AD| = |BC|/|ED|.
8. |AD| = 12 + |CD| olduğundan 12/(12 + |CD|) = 1/5.

Birlikte çöz (`tag: 'Birlikte çöz'`): 12/(12 + |CD|) = 1/5 ise 12 + |CD| kaçtır? **60** / 12 / 17. Dayandığı anlatım: 8. İpuçları: "İçler dışlar: 12·5 = 1·(12 + |CD|)." · "Pay 12 ise payda, 12'nin 5 katıdır."

Sonra:
9. 12 + |CD| = 60 olduğundan |CD| = 48 m.
10. Gölün genişliği 48 m.

### Sahne 10 · Dene: ortadaki sokağın yeri

Tahta: ana şekil; d4 sokağı d3 ile d5 arasında kayar (B ve E kesenler üstünde kayar; AB = 150·s, DE = 130·s; s = 0,2 … 0,8). Sağda tablo: |AB|, |BC|, |DE|, |EF| (m); |AB|/|BC|, |DE|/|EF|. Kaydırıcı (`c.slider`, "Ortadaki sokağın yeri", s = 0,2 … 0,8, adım 0,1; `noWait` yönerge: "Ortadaki sokağı kaydır; iki orana bak."). Değerler (s: |AB|, |BC|, |DE|, |EF|, oran): 0,2: 30, 120, 26, 104, 0,25 · 0,3: 45, 105, 39, 91, 0,43 · 0,4: 60, 90, 52, 78, 0,67 · 0,5: 75, 75, 65, 65, 1 · 0,6: 90, 60, 78, 52, 1,5 · 0,7: 105, 45, 91, 39, 2,33 · 0,8: 120, 30, 104, 26, 4. "Devam" ile biter.

Anlatım:
1. Ortadaki sokak nereye giderse gitsin iki oran eşit kalıyor.
2. |AB| ile |DE| ise hiçbir zaman eşit değil.
3. Eşit olan, karşılıklı parçalar değil, parçaların oranlarıdır.

### Çıkış soruları

1. (yanılgı) Üç paralel sokağı iki cadde kesiyor. Sol caddede |AB| = 6 m ve |BC| = 12 m; sağ caddede |DE| = 5 m. |EF| kaç metredir? **10 m** / 12 m / 6 m. (sahne 3, 10)
2. (yeni durum) d3 ∥ d4 ∥ d5 ∥ d6; sol caddede |AB| = 2, |BC| = 4, |CK| = 6 cm; sağ caddede |DE| = 3 cm. |FL| kaç cm'dir? **9 cm** / 6 cm / 4,5 cm. (sahne 7)
3. (yeni durum) AB ∥ CD; AC ve BD kesenleri H'de kesişiyor. |AB| = 10 cm, |BH| = 15 cm, |HD| = 6 cm. |CD| kaç cm'dir? **4 cm** / 25 cm / 9 cm. (sahne 8)
4. (yeni durum) BC ∥ ED; kesenler A'da kesişiyor, C ve D aynı kesen üzerinde. |AC| = 8 m, |BC| = 3 m, |DE| = 9 m. |CD| kaç metredir? **16 m** / 24 m / 5 m. (sahne 9)
5. Tales teoreminin ispatında A ile F birleştirildi. Bu çizginin amacı nedir? **Temel orantı teoremini uygulayacağımız iki üçgen elde etmek** / Paralel doğruları eş yapmak / Kesenleri paralel yapmak. (sahne 4, 5)

Özet: Paralel üç doğru, kesenlerde orantılı parçalar ayırır. · Karşılıklı parçalar eşit olmaz, oranları eşit olur. · İspat: köşegen çiz, temel orantıyı iki kez kullan. · **Paraleller kesenleri aynı oranda böler.**

## D3 · Öklid teoremi: yüksekliğin karesi

- **Fikir:** Dik üçgende hipotenüse ait yüksekliğin karesi, hipotenüs üzerinde ayırdığı iki parçanın çarpımına eşittir: h² = p·k.
- **Giriş ekranı sorusu:** Dik köşeden karşı kenara inen patika kenarı iki parçaya böler; patikanın boyu bu iki parçadan bulunabilir mi?
- **Kaynak:** Ders kitabı s. 66 (Öklid teoremi: ifadesi, harfler, 11. uygulama), s. 67 (24. örnek a: çatı), s. 73 (Kontrol Noktası: Öklid), s. 81 (32. örnek: göz hizası 1,6 m, uzaklık 8 m, boy 41,6 m), s. 58 (C3 bilgisi).
- **Sınır:** Yalnızca h² = p·k; dik kenar bağıntıları D4'tedir. Öklid, kitabın yazdığı kadar anılır ("Antik Yunan matematikçisi; teoremlerden biri onun ortaya koyduğudur"); daha fazla bilgi yok. Teoremin tersi yok.
- **Güç kavramlar ve gösterimi:** h'nin iki üçgende de kenar olması: iki küçük üçgen kesilip aynı duruşa getirilir (kısa dik kenar yatay, uzun dik kenar dikey); h iki kez sarıdır, bir üçgende kısa, ötekinde uzun dik kenardır. Önce sayılarla (4, 6, 9), sonra harflerle.
- **Hedeflenen yanılgı:** h = p·k ya da h² = p + k yazmak.
- **Akılda kalıcı cümle:** Yüksekliğin karesi, iki parçanın çarpımıdır.

Çizim verisi (BAC dik üçgeni, A'da dik; H yükseklik ayağı; p = |BH|, k = |HC|, h = |AH|, a = |BC|, c = |AB|, b = |AC|):
- Ana üçgen (sahne 2–5): A (4, 0), B (0, 6), H (4, 6), C (13, 6); p = 4, k = 9, h = 6, a = 13, c = √52 ≈ 7.21, b = √117 ≈ 10.82.
- Abide (sahne 6): A (0, 40), B (8, 41.6), H (8, 40), C (8, 0); |AH| = 8, |BH| = 1.6, |HC| = 40 ("?"), |BC| = 41.6; A'da dik. Çizim dar ve uzundur; ölçek tahtanın yüksekliğine göre seçilir (1 m ≈ 6 px).
- Çatı (sahne 7): A (1.8, 0), B (0, 3), H (1.8, 3), C (6.8, 3); p = 1.8, k = 5, h = 3, a = 6.8.
- Sıra sende (sahne 7): A (3, 0), B (0, 6), H (3, 6), C (15, 6); h = 6, p = 3, k = 12 ("?"), a = 15.
- Dene (sahne 8): B (0, 5), C (10, 5), |BC| = a = 10 sabit; H (p, 5); A (p, 5 − √(p·(10 − p))), p = 1 … 9; A'da dik açı.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D2) Üç paralel doğru iki kesen üzerinde |AB| = 4, |BC| = 6 ve |DE| = 6 parçalarını ayırıyor. |EF| kaçtır? **9** / 4 / 10. Yanlışta: "Tales: |AB|/|BC| = |DE|/|EF|; 4/6 = 6/|EF|."
2. (C3) Dik üçgende dik köşeden hipotenüse yükseklik çizilince oluşan iki küçük üçgen ile ilk üçgen için hangisi doğrudur? **Üçü de birbirine benzerdir** / İki küçük üçgen birbirine eştir / Küçük üçgenler ilk üçgene benzemez. Yanlışta: "Üç üçgende de aynı iki dar açı vardır; Açı-Açı ile üçü de benzerdir."

### Sahne 2 · Üç benzer üçgen ve harfler

Tahta: ana üçgen (mavi); A'da dik açı karesi; AH sarı çizgi, H'de dik açı karesi. Harfler sırayla: p = |BH| (turuncu parça), k = |HC| (yeşil parça), h = |AH| (sarı), a = |BC| (mavi, tamamı), c = |AB| (turuncu), b = |AC| (yeşil). Sonra ABH ve CAH üçgenleri ayrı ayrı açık dolguyla vurgulanır.

Anlatım:
1. BAC dik üçgeninde dik açı A köşesinde.
2. A'dan hipotenüs BC'ye inen dikme AH, yüksekliktir.
3. H noktası hipotenüsü iki parçaya ayırır: |BH| = p, |HC| = k.
4. Yüksekliğe h, hipotenüse a diyelim.
5. Dik kenarlar: |AB| = c ve |AC| = b.
6. Yükseklik üçgeni ikiye böldü: ABH ve CAH.
7. Bu üç dik üçgen birbirine benzerdir.
8. Peki h, p ve k arasında bir bağ var mı?

### Sahne 3 · Sayılarla bak

Tahta: sol: ABH, dik açı H'de altta; dik kenarlar |BH| = 4 (yatay, turuncu) ve |AH| = 6 (dikey, sarı). Sağ: CAH, dik açı H'de; dik kenarlar |AH| = 6 ve |HC| = 9; CAH döndürülüp ABH ile aynı duruşa getirilir: kısa dik kenar 6 yatay (sarı), uzun dik kenar 9 dikey (yeşil). İki üçgen yan yana. Altta "4/6 = 2/3" ve "6/9 = 2/3" belirir, sonra p/h = h/k.

Anlatım:
1. Bir üçgende p = 4, k = 9 ve h = 6.
2. ABH'nin dik kenarları 4 ve 6.
3. CAH'nin dik kenarları 6 ve 9.
4. CAH'yi çevirip ABH ile aynı duruşa getirelim.
5. Kısa dik kenarlar 4 ve 6; uzun dik kenarlar 6 ve 9.
6. Kısa bölü uzun: 4/6 ve 6/9.
7. İkisi de 2/3: üçgenler benzer.
8. h, ABH'de uzun; CAH'de kısa dik kenar.
9. Kısa bölü uzun oranı: p/h = h/k.

Birlikte çöz (`tag: 'Birlikte çöz'`): p/h = h/k ise içler dışlar çarpımı hangi eşitliği verir? **h·h = p·k** / h·k = p·h / h + h = p + k. Dayandığı anlatım: 9. İpuçları: "İçler: h ve h. Dışlar: p ve k." · "Çarpraz çarpım: h·h ile p·k."

Sonra:
10. Sayılarla: 6·6 = 4·9; ikisi de 36.

### Sahne 4 · İspat: açılar

Tahta: ana üçgen, harfli (ölçüsüz). Üstte "Verilen: m(BAC) = 90°, AH ⊥ BC" ve "İstenen: h² = p·k". Sağda adım 1–3; B açısı tek yay, CAH açısı tek yay (eşit olduğu adım 3'te gösterilir), C açısı çift yay.

İspat (adım 1–3; devamı sahne 5):

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | m(B) + m(C) = 90° | ABC'de A dik; iç açılar toplamı 180° (C3) |
| 2 | m(CAH) + m(C) = 90° | CAH'de H dik; iç açılar toplamı 180° |
| 3 | m(CAH) = m(B) | 1 ve 2: ikisi de 90° − m(C) |

Anlatım:
1. Verilen: BAC dik üçgeni, A dik; AH ⊥ BC.
2. İstenen: h² = p·k.
3. ABC dik üçgeninde iki dar açının toplamı 90°.
4. Yani m(B) + m(C) = 90°.
5. CAH üçgeninde de H dik: m(CAH) + m(C) = 90°.
6. İkisi de 90° − m(C): m(CAH) = m(B).

### Sahne 5 · İspat: benzerlik ve oran

Tahta: ABH (mavi) ve CAH (turuncu) yan yana, aynı duruşta (sahne 3 gibi); karşılıklı köşeler: A↔C, B↔A, H↔H; eşit açılar aynı sayıda yayla. Sağda adım 4–7; sonra "h² = p·k" çerçevelenir.

İspat (adım 4–7):

| Adım | İfade | Gerekçe |
|---|---|---|
| 4 | ABH ~ CAH | m(AHB) = m(CHA) = 90° ve m(B) = m(CAH): Açı-Açı (B4) |
| 5 | \|BH\|/\|AH\| = \|AH\|/\|CH\| | benzer üçgenlerde karşılıklı kenarlar orantılı; A↔C, B↔A, H↔H (B3) |
| 6 | p/h = h/k | \|BH\| = p, \|AH\| = h, \|CH\| = k |
| 7 | h·h = p·k, yani h² = p·k | içler dışlar çarpımı ∎ |

Anlatım:
1. ABH ve CAH üçgenlerinde H açıları dik.
2. m(B) = m(CAH) olduğundan Açı-Açı: ABH ~ CAH.
3. Köşeler sırayla eşleşir: A↔C, B↔A, H↔H.
4. Karşılıklı kenarlar: |BH| ↔ |AH| ve |AH| ↔ |CH|.
5. Oranlar eşit: |BH|/|AH| = |AH|/|CH|.
6. Yani p/h = h/k.
7. İçler dışlar çarpımı: h·h = p·k.
8. İspat tamam: h² = p·k.
9. Bu bağıntıya Öklid teoremi denir.
10. Öklid, Antik Yunan'da yaşamış önemli bir matematikçidir.
11. Bu, onun ortaya koyduğu teoremlerden biridir.

Defter ("Öklid"): **Öklid:** h² = p·k. Örnek: 4·9 = 36, h = 6.

### Sahne 6 · Abidenin boyu

Tahta: abide şekli (çizim verisi: abide): dar uzun üçgen; A'da dik açı (kitabın köşesi); H noktası göz hizasında. |AH| = 8 m, |BH| = 1,6 m. Adımlar sırayla: h² = p·k, 64 = 1,6·k, k = 40, boy = 1,6 + 40.

Anlatım:
1. Arda, Çanakkale Şehitler Abidesi'nin boyunu ölçmek istiyor.
2. Elindeki kitabın köşesi dik açı; kenarları abidenin tepesine ve tabanına bakıyor.
3. Gözü yerden 1,6 m yüksekte; abideye uzaklığı 8 m.
4. Gözünün hizasındaki abide noktası H olsun: |BH| = 1,6 m.
5. Göz A noktası: |AH| = 8 m.
6. A'da açı dik: BAC dik üçgen, AH yükseklik.
7. Öklid: h² = p·k; burada h = 8 ve p = 1,6.
8. 8² = 1,6·k; yani 64 = 1,6·k.
9. k = 40 m; abidenin boyu p + k = 41,6 m.

### Sahne 7 · Çatı

Tahta: çatı şekli (çizim verisi: çatı); direk AH sarı. p = 1,8 m, k = 5 m; h = ?. Sonra Sıra sende şekli.

Anlatım:
1. Bir evin çatısı dik açılı üçgen: BAC'de A dik.
2. Çatının tepesinden tabana inen direk AH.
3. Direk tabanı böler: |BH| = 1,8 m, |HC| = 5 m.
4. Direğin boyu h aranıyor.
5. Öklid: h² = p·k = 1,8·5.

Birlikte çöz (`tag: 'Birlikte çöz'`): h² = 1,8·5 = 9 ise direk kaç metredir? **3 m** / 9 m / 6,8 m. Dayandığı anlatım: 5. İpuçları: "9, h'nin karesiydi; kendisi değil." · "Kendisiyle çarpınca 9 olan sayı."

Sonra:
6. h = 3 m: direk 3 m boyunda.

Soru (`tag: 'Sıra sende'`; tahtada "Sıra sende" şekli; h = 6, p = 3, k = ?): Bir dik üçgende hipotenüse inen yükseklik 6 cm; hipotenüsün parçalarından biri 3 cm. Öbür parça kaç cm'dir? **12 cm** / 18 cm / 2 cm. Dayandığı anlatım: sahne 5 (7–8), sahne 7 (5). İpuçları: "h² = p·k; 6² = 3·k." · "36 = 3·k; k'yi bul."

Gör: 36 = 3·k → k = 12; hipotenüs 3 + 12 = 15 cm.

### Sahne 8 · Dene: H'nin yeri

Tahta: hipotenüs |BC| = 10 sabit; H kayarken A noktası onunla birlikte yükselir ve alçalır (çizim verisi: dene). Sağda tablo: p, k, h², p·k, h. Kaydırıcı (`c.slider`, "H'nin yeri", p = 1 … 9, adım 1; `noWait` yönerge: "H'yi kaydır; h² ile p·k'ya bak."). Tablo değerleri (p: k, h², p·k, h): 1: 9, 9, 9, 3 · 2: 8, 16, 16, 4 · 3: 7, 21, 21, 4,58 · 4: 6, 24, 24, 4,90 · 5: 5, 25, 25, 5 · 6: 4, 24, 24, 4,90 · 7: 3, 21, 21, 4,58 · 8: 2, 16, 16, 4 · 9: 1, 9, 9, 3. "Devam" ile biter.

Anlatım:
1. H hipotenüs üzerinde kayarken p ve k değişiyor.
2. h² ile p·k her konumda eşit.
3. p = 2, k = 8: h = 4, p·k = 16.
4. Eşit olan h² ile p·k'dir; h ile değil.

### Çıkış soruları

1. (yanılgı) Bir dik üçgende hipotenüse inen yükseklik h; hipotenüsü p ve k parçalarına ayırıyor. Hangisi doğrudur? **h² = p·k** / h = p·k / h² = p + k. (sahne 5, 8)
2. (yeni durum) Hipotenüse inen yükseklik hipotenüsü 5 cm ve 20 cm'lik parçalara ayırıyor. Yüksekliği kaç cm'dir? **10 cm** / 100 cm / 12,5 cm. (sahne 5)
3. (yeni durum) Bir dik üçgende hipotenüse inen yükseklik 12 cm; hipotenüsün parçalarından biri 9 cm. Hipotenüsün tamamı kaç cm'dir? **25 cm** / 16 cm / 21 cm. (sahne 5, 7)
4. (yeni durum) Efe, kitabının dik köşesini gözüne tutup bir kulenin tepesini ve tabanını görüyor. Gözü yerden 1,5 m yüksekte ve kuleye 6 m uzakta. Kulenin boyu kaç metredir? **25,5 m** / 24 m / 9 m. (sahne 6)
5. İspatta ABH ve CAH üçgenlerinin benzer olduğu hangi koşulla gösterildi? **Açı-Açı: H'de dik açılar ve m(B) = m(CAH)** / Kenar-Kenar-Kenar / Kenar-Açı-Kenar. (sahne 4, 5)

Özet: Dik köşeden inen yükseklik hipotenüsü p ve k parçalarına ayırır. · İki küçük üçgenin benzerliğinden p/h = h/k çıkar. · **h² = p·k.** · Bu bağıntı Öklid teoremidir.

## D4 · Öklid teoremi: dik kenarın karesi

- **Fikir:** Dik kenarın karesi, hipotenüs ile o kenarın hipotenüs üzerindeki parçasının çarpımıdır: c² = p·a, b² = k·a.
- **Giriş ekranı sorusu:** Dik üçgen bir tarlanın bir kenarını, karşı kenarı ölçmeden bulabilir misin?
- **Kaynak:** Ders kitabı s. 66 (11. uygulama, adım 6: b² = k·a ve c² = p·a eşitlikleri), s. 67 (24. örnek b ve c: çatı), s. 68 (25. örnek: iki dik üçgen), s. 73 (Kontrol Noktası: Öklid, üç bağıntı).
- **Sınır:** Yalnızca üç Öklid bağıntısı; Pisagor D5'tedir. "Kendi parçası" kitapta bu adla geçmez; D4'ün anlatım sözüdür (kenarla aynı köşeden çıkan hipotenüs parçası).
- **Güç kavramlar ve gösterimi:** "Kendi parçası": c ile p, B köşesinde buluşur ve aynı renktedir (turuncu); b ile k, C köşesinde buluşur (yeşil); hipotenüsün tamamı a mavidir. Şekil döndürülüp yansıtılsa da eşleşme köşeye bakılarak yapılır.
- **Hedeflenen yanılgı:** c² = k·a (kenarı karşı parçayla eşlemek) ve c² = p·k.
- **Akılda kalıcı cümle:** Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.

Çizim verisi (BAC dik üçgeni, A'da dik; p = |BH|, k = |HC|, a = |BC|, c = |AB|, b = |AC|):
- Tarla (sahne 2–5): A (3.6, 0), B (0, 4.8), H (3.6, 4.8), C (10, 4.8); c = 6, b = 8, a = 10, p = 3.6, k = 6.4, h = 4.8.
- Çatı (sahne 6): A (1.8, 0), B (0, 3), H (1.8, 3), C (6.8, 3); p = 1.8, k = 5, a = 6.8, h = 3.
- İki dik üçgen (sahne 7; birim cm): B (0, 10.39), F (3, 10.39), E (18, 10.39), C (24, 10.39) aynı doğru üstünde; A (18, 0); D (3, 17.10). BAC'de A dik, AE ⊥ BC; BDE'de D dik, DF ⊥ BE. |AC| = 12, |CE| = 6, |BF| = 3; |CB| = 24, |BE| = 18, |AE| = √108 ≈ 10.39, |DF| = √45 ≈ 6.71, |DB| = √54 ≈ 7.35 ("?").
- Sıra sende (sahne 7): A (9, 0), B (0, 12), H (9, 12), C (25, 12); p = 9, k = 16, a = 25, c = 15, b = 20, h = 12 ("?").
- Dene (sahne 8): tarla üçgeni üç duruşta: (1) olduğu gibi; (2) yatay yansıtılmış (B sağda, C solda); (3) 180° döndürülmüş (hipotenüs üstte, A aşağıda).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D3) Bir dik üçgende hipotenüse inen yükseklik, hipotenüsü 2 cm ve 18 cm'lik parçalara ayırıyor. Yükseklik kaç cm'dir? **6 cm** / 36 cm / 10 cm. Yanlışta: "h² = p·k: h² = 2·18 = 36; h = 6."
2. (B4) İki dik üçgenin birer dar açısı eşitse hangisi doğrudur? **Üçgenler benzerdir: dik açılar ve bir dar açı eşit** / Üçgenler eştir / Yalnızca hipotenüsler eşitse benzerdir. Yanlışta: "Dik açılar eşit; bir dar açı da eşitse Açı-Açı: üçgenler benzerdir."

### Sahne 2 · Hangi iki üçgen?

Tahta: tarla (çizim verisi: tarla), mavi; AH sarı; parçalar p = 3,6 (turuncu), k = 6,4 (yeşil). Sonra ABC (mavi) ile HBA (turuncu) ayrı ayrı çizilir; ikisinde ortak B açısı tek yay; dik açılar kare. Sağda 6/3,6 ve 10/6 oranları.

Anlatım:
1. Tarla dik üçgen: AB 6, AC 8, BC 10; A dik.
2. Yükseklik, hipotenüsü p = 3,6 ve k = 6,4 diye ayırır.
3. c = 6 kenarıyla aynı köşeden çıkan parça: p = 3,6.
4. ABC ile HBA üçgenlerine bakalım: ikisinde de B açısı var.
5. ABC'de A dik, HBA'da H dik: iki açı eşit.
6. Açı-Açı: ABC ile HBA benzerdir.
7. Karşılıklı kenarlar: |AB|/|HB| = |BC|/|BA|.
8. Sayılarla: 6/3,6 = 10/6.
9. İkisi de 5/3.
10. İçler dışlar: 6·6 = 3,6·10; ikisi de 36.

### Sahne 3 · İspat: c² = p·a

Tahta: BAC ve AH, harfli (ölçüsüz). Üstte "Verilen: m(BAC) = 90°, AH ⊥ BC" ve "İstenen: c² = p·a". ABC mavi, HBA turuncu; ortak B açısı tek yay; kenar renkleri: c ve p turuncu, a mavi.

İspat:

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | m(BAC) = m(BHA) = 90° | A'da dik (verilen); AH ⊥ BC |
| 2 | m(B) iki üçgende ortak | aynı açı |
| 3 | ABC ~ HBA | iki açı eşit: Açı-Açı (B4); A↔H, B↔B, C↔A |
| 4 | \|AB\|/\|HB\| = \|BC\|/\|BA\| | benzer üçgenlerde karşılıklı kenarlar orantılı (B3) |
| 5 | c/p = a/c | \|AB\| = c, \|HB\| = p, \|BC\| = a |
| 6 | c·c = p·a, yani c² = p·a | içler dışlar çarpımı ∎ |

Anlatım:
1. Verilen: BAC dik üçgeni, AH ⊥ BC. İstenen: c² = p·a.
2. ABC ve HBA üçgenlerinde dik açılar var: A ve H.
3. B açısı ikisinde de ortak.
4. Açı-Açı: ABC ~ HBA; köşeler A↔H, B↔B, C↔A.

Birlikte çöz (`tag: 'Birlikte çöz'`): ABC ~ HBA ise |BC| kenarının karşılığı hangisidir? **|BA|** / |HA| / |BH|. Dayandığı anlatım: 4 (A↔H, B↔B, C↔A). İpuçları: "B↔B ve C↔A olduğundan BC, BA'ya karşılık gelir." · "Hipotenüs hipotenüse karşılık gelir."

Sonra:
5. Karşılıklı kenarlar: |AB|/|HB| = |BC|/|BA|; yani c/p = a/c.
6. İçler dışlar çarpımı: c² = p·a.

### Sahne 4 · İspat: b² = k·a

Tahta: BAC; bu kez ABC (mavi) ile HAC (yeşil); ortak C açısı çift yay; kenar renkleri: b ve k yeşil. Adımlar sağda.

İspat:

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | m(BAC) = m(AHC) = 90° | A'da dik (verilen); AH ⊥ BC |
| 2 | m(C) iki üçgende ortak | aynı açı |
| 3 | ABC ~ HAC | Açı-Açı (B4); A↔H, B↔A, C↔C |
| 4 | \|AC\|/\|HC\| = \|BC\|/\|AC\| | benzer üçgenlerde karşılıklı kenarlar orantılı (B3) |
| 5 | b/k = a/b | \|AC\| = b, \|HC\| = k, \|BC\| = a |
| 6 | b·b = k·a, yani b² = k·a | içler dışlar çarpımı ∎ |

Anlatım:
1. Öbür dik kenar için aynı yolu izleyelim.
2. ABC ile HAC'de C açısı ortak; A ve H dik.
3. Açı-Açı: ABC ~ HAC; köşeler A↔H, B↔A, C↔C.
4. Karşılıklı kenarlar: |AC|/|HC| = |BC|/|AC|.
5. Yani b/k = a/b; içler dışlar: b² = k·a.

Defter ("Dik kenar"): **Dik kenar:** c² = p·a, b² = k·a: hipotenüs çarpı kendi parçası.

### Sahne 5 · Kendi parçası

Tahta: tarla; c ve p turuncu çizgi, B köşesi turuncu halkayla; b ve k yeşil, C köşesi yeşil halkayla; a mavi. Altta üç bağıntı alt alta: h² = p·k (sarı), c² = p·a (turuncu), b² = k·a (yeşil).

Anlatım:
1. c ile p, B köşesinde buluşur: p, c'nin kendi parçası.
2. b ile k, C köşesinde buluşur: k, b'nin kendi parçası.
3. Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.
4. Yüksekliğin karesi ise iki parçanın çarpımıdır: h² = p·k.
5. Üç bağıntı: h² = p·k, c² = p·a, b² = k·a.

### Sahne 6 · Çatı

Tahta: çatı şekli (çizim verisi: çatı), p = 1,8 m ve k = 5 m; a = 1,8 + 5 = 6,8 m. Adımlar sırayla.

Anlatım:
1. Dik üçgen çatıda |BH| = 1,8 m, |HC| = 5 m.
2. Hipotenüs a = 1,8 + 5 = 6,8 m.
3. AB kenarı c; kendi parçası p = 1,8.
4. c² = p·a = 1,8·6,8 = 12,24.
5. c yaklaşık 3,5 m.
6. AC kenarı b; kendi parçası k = 5.
7. b² = k·a = 5·6,8 = 34.
8. b = √34 m.

### Sahne 7 · İki dik üçgen

Tahta: iki dik üçgenli şekil (çizim verisi: iki dik üçgen). BAC ve BDE ayrı renkte (mavi, turuncu); AE ve DF sarı. |AC| = 12, |CE| = 6, |BF| = 3; |DB| = ?. Adımlar sırayla.

Anlatım:
1. İki dik üçgenli bir şekle bakalım: BAC ve BDE.
2. A ve D köşelerinde dik açı var.
3. AE ve DF, kendi hipotenüslerine inen yüksekliklerdir.
4. AC 12 cm, CE 6 cm, BF 3 cm; DB aranıyor.
5. BAC'de |AC|'nin kendi parçası |CE|: |AC|² = |CE|·|CB|.
6. 12² = 6·|CB| olduğundan |CB| = 24 cm.
7. |BE| = |CB| − |CE| = 24 − 6 = 18 cm.
8. BDE'de |DB|'nin kendi parçası |BF|: |DB|² = |BF|·|BE|.

Birlikte çöz (`tag: 'Birlikte çöz'`): |DB|² = |BF|·|BE| = 3·18 ise |DB|² kaçtır? **54** / 21 / 15. Dayandığı anlatım: 7–8. İpuçları: "3 ile 18 çarpılır, toplanmaz." · "Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır."

Sonra:
9. |DB|² = 54; |DB| = √54, yaklaşık 7,3 cm.

Soru (`tag: 'Sıra sende'`; tahtada "Sıra sende" şekli; p = 9, k = 16, |AB| = ?): BAC dik üçgeninde A dik, AH ⊥ BC; |BH| = 9 cm ve |HC| = 16 cm. |AB| kaç cm'dir? **15 cm** / 12 cm / 20 cm. Dayandığı anlatım: sahne 5 (1, 3), sahne 3 (6). İpuçları: "AB'nin kendi parçası BH; hipotenüs 9 + 16." · "c² = p·a = 9·25."

Gör: c² = 225; c = 15 (b = 20, h = 12 de aynı şekilde yazılır; 12 yüksekliktir, AB değil).

### Sahne 8 · Dene: kendi parçasını bul

Tahta: tarla üçgeni üç duruşta, sırayla (çizim verisi: dene). Her duruşta bir dik kenar renkli (turuncu); hipotenüsün iki parçası gri ve harfsiz iki şerit olarak kenar boyunca durur. Eşleştirme (sürükle-bırak; `c.on` ile pointer olayları, `touch-action:none`): dik kenarı, kendi parçasının üstüne bırak. Doğru eşleşmede kenar ile parçanın ortak köşesi halkayla gösterilir. Her duruşta bir eşleşme; üç tur; "Devam" ile biter.

- Duruş 1: AB renkli; doğru parça BH (B köşesi).
- Duruş 2 (yatay yansıtılmış; C solda, B sağda): AC renkli; doğru parça HC (C köşesi, şimdi solda).
- Duruş 3 (180° döndürülmüş; hipotenüs üstte): AB renkli; doğru parça BH (B köşesi, şimdi sağ üstte).

Anlatım:
1. Üçgen dönse de kural aynı: kenar ile kendi parçası aynı köşeden çıkar.
2. Kendi parçası, kenarın hipotenüse değdiği köşeden başlar.

### Çıkış soruları

1. (yanılgı) BAC dik üçgeninde A dik, AH ⊥ BC, |BH| = p, |HC| = k, |BC| = a ve |AB| = c. Hangisi doğrudur? **c² = p·a** / c² = k·a / c² = p·k. (sahne 5, 8)
2. (yeni durum) BAC dik üçgeninde A dik, AH ⊥ BC; |BH| = 4 cm ve |BC| = 16 cm. |AB| kaç cm'dir? **8 cm** / 12 cm / 64 cm. (sahne 3, 5)
3. (yeni durum) BAC dik üçgeninde A dik, AH ⊥ BC; |HC| = 5 cm ve |BC| = 20 cm. |AC| kaç cm'dir? **10 cm** / 15 cm / 100 cm. (sahne 4, 5)
4. (yeni durum) BAC dik üçgeninde A dik, AH ⊥ BC; |AC| = 12 cm ve |HC| = 6 cm. |BC| kaç cm'dir? **24 cm** / 18 cm / 2 cm. (sahne 4, 7)
5. (yeni durum) Hipotenüsü 10 cm olan bir dik üçgenin bir dik kenarı 6 cm. Bu dik kenarın hipotenüs üzerindeki parçası kaç cm'dir? **3,6 cm** / 6,4 cm / 4 cm. (sahne 2, 5)

Özet: Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır. · Kendi parçası, kenarla aynı köşeden çıkan parçadır. · Yükseklik için iki parça çarpılır. · **Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.**

## D5 · Pisagor teoreminin ispatı

- **Fikir:** Öklid'in iki dik kenar bağıntısı toplanınca Pisagor teoremi çıkar: dik kenarların kareleri toplamı hipotenüsün karesidir.
- **Giriş ekranı sorusu:** Duvara dayalı bir merdivenin boyu, yüksekliği ve duvara uzaklığı arasında neden hep aynı bağ vardır?
- **Kaynak:** Ders kitabı s. 69 (Pisagor ve Pisagor Okulu; 12. uygulama: teoremin ifadesi ve ispat adımları), s. 70 (26. örnek: yazı tahtası), s. 71–72 (28. örnek: A′C′ = 20), s. 73 (Kontrol Noktası: Pisagor; harfler: dik açı C, |BC| = a, |AC| = b, |AB| = c). Tarih cümleleri kitaptan: MÖ 6. yüzyılda Pisagor ve Pisagor Okulu öğrencilerinin teoremi sistematik olarak çalışıp kanıtladığı; bilinen 300'den fazla kanıtı olduğu; Öklid'in Elemanlar adlı eserinde ele aldığı.
- **Sınır:** Tek ispat yolu (karar 5); alan ve görsel ispatlar yok. Pisagor üçlüleri, özel üçgenler, trigonometri yok. Harf farkı (bilinen sorun, `PLAN.md` D5 "Sınır" ile tek fikir satırı birbirinden ayrışır): ispat D4'teki harflerle yapılır (hipotenüs a; sonuç b² + c² = a²); sahne 6'da aynı teorem kitaptaki gösterimiyle (dik kenarlar a ve b, hipotenüs c: a² + b² = c²) yazılır ve D6–D7 bunu kullanır. PLAN'daki "a·p ve a·k iki dikdörtgen" resmi alan resmi olduğundan alınmadı; yerine hipotenüs çubuğu (p ve k birleşince a) çizilir.
- **Güç kavramlar ve gösterimi:** Toplamın hipotenüsü tamamlaması: hipotenüs bir çubuk olarak ayrılır; p turuncu, k yeşil parça yan yana gelince a mavi tüm çubuk olur. İspatın her adımı benzer üçgenlerden geldiği için sonda "ABC ~ HBA ve ABC ~ HAC" kısaca anılır.
- **Hedeflenen yanılgı:** "Pisagor ölçerek bulunmuş bir kuraldır; ispatı yoktur" ve teoremi dik olmayan üçgende kullanmak.
- **Akılda kalıcı cümle:** İki Öklid bağıntısı toplanınca Pisagor çıkar.

Çizim verisi:
- Merdiven (sahne 2; birim m): duvar (0, 0)–(0, 4) dikey; yer (0, 4)–(3, 4) yatay; merdiven (0, 0)–(3, 4); dik açı (0, 4)'te; boy 5, yükseklik 4, uzaklık 3.
- İspat üçgeni (sahne 3–5): A (1.8, 0), B (0, 2.4), H (1.8, 2.4), C (5, 2.4); c = 3, b = 4, a = 5, p = 1.8, k = 3.2, h = 2.4; A'da dik.
- Kitaptaki gösterim (sahne 6): dik açı C'de; C (0, 4), B (3, 4), A (0, 0): |BC| = a = 3, |AC| = b = 4, |AB| = c = 5.
- Izgara (sahne 7): birim kareli zemin; A′ (0, 0), B′ (16, 0), C′ (16, 12); |A′B′| = 16, |B′C′| = 12, |A′C′| = 20; B′'de dik açı.
- Yazı tahtası (sahne 7; birim cm; tüm şekil 30 birim sağa kaydırılır): ilk konum (mavi): A (0, 120), B (240, 120), C (240, 0), D (0, 0). B çevresinde saat yönünün tersine yaklaşık 22,6° (tan = 5/12) dönmüş konum (turuncu): A′ (18.46, 212.31), C′ (193.85, 9.23), D′ (−27.69, 101.54). E (0, 90): ilk AD kenarı ile yeni C′D′ kenarının kesişimi. |AE| = 30, |AB| = 240, |BC′| = 120 (kısa kenar), |EB|² = 58 500, |EC′| = 210 ("?"). EAB üçgeninde A dik; EC′B üçgeninde C′ dik. B dönme merkezi sarı.
- Dene kartları (sahne 8): (a) dik üçgen, dik kenarlar 3 ve 4, hipotenüs 5 işaretli (mavi kalın): A (0, 0), B (0, 3), C (4, 3). (b) aynı dik üçgen 90° döndürülmüş, hipotenüs işaretli: A (0, 4), B (3, 4), C (3, 0). (c) iki kenarı 4 ve 5, aradaki açısı 60° olan üçgen: P (0, 4), Q (5, 4), R (2, 0.54); QR işaretli. (d) iki kenarı 3 ve 4, aradaki açısı 120° olan üçgen: P (1.5, 2.6), Q (5.5, 2.6), R (0, 0); QR işaretli.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D4) Bir dik üçgende bir dik kenar 6 cm, hipotenüs 12 cm. Bu dik kenarın hipotenüs üzerindeki parçası kaç cm'dir? **3 cm** / 6 cm / 2 cm. Yanlışta: "Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 36 = 12·p."
2. (D3) Bir dik üçgende hipotenüse inen yükseklik 4 cm; hipotenüsün parçalarından biri 2 cm. Öbür parça kaç cm'dir? **8 cm** / 6 cm / 2 cm. Yanlışta: "Yüksekliğin karesi, iki parçanın çarpımıdır: 16 = 2·k."

### Sahne 2 · Pisagor teoremi

Tahta: merdiven şekli (çizim verisi: merdiven): duvar, yer, merdiven; 3, 4, 5 etiketleri sırayla; sağda 3² + 4² = 25 = 5².

Anlatım:
1. Bir merdiven duvara dayalı; boyu 5 m.
2. Ayağı duvardan 3 m uzakta; 4 m yüksekliğe değiyor.
3. 3² + 4² = 9 + 16 = 25; 5² = 25.
4. Dik kenarların kareleri toplamı, hipotenüsün karesine eşit.
5. Bu bağıntı Pisagor teoremi; ortaokuldan biliyoruz.
6. Pisagor ve Pisagor Okulu öğrencileri MÖ 6. yüzyılda bu teoremi kanıtlamıştır.
7. Teoremin bilinen 300'den fazla ispatı vardır.
8. Öklid, Elemanlar adlı eserinde bu teoremi ayrıntılı ele almıştır.
9. Şimdi Öklid bağıntılarına dayanan bir ispatı görelim.
10. 3, 4, 5 için doğru; her dik üçgende neden doğru?

### Sahne 3 · İspat: iki Öklid bağıntısı

Tahta: ispat üçgeni (çizim verisi: ispat üçgeni), harfli (ölçüsüz). Üstte "Verilen: m(BAC) = 90°; |BC| = a, |AC| = b, |AB| = c" ve "İstenen: b² + c² = a²". AH sarı; p turuncu, k yeşil parça; sağda adım 1–3.

İspat (adım 1–3; devamı sahne 4):

| Adım | İfade | Gerekçe |
|---|---|---|
| 1 | A'dan BC'ye AH ⊥ BC çiz; \|BH\| = p, \|HC\| = k | yardımcı çizgi (H, BC üzerinde) |
| 2 | c² = p·a | Öklid, dik kenar bağıntısı (D4) |
| 3 | b² = k·a | Öklid, dik kenar bağıntısı (D4) |

Anlatım:
1. Verilen: BAC dik üçgeni, A dik.
2. Hipotenüs |BC| = a; dik kenarlar b ve c.
3. İstenen: b² + c² = a².
4. Önce yardımcı çizgi: A'dan BC'ye AH dikmesi.
5. Hipotenüs iki parçaya ayrıldı: |BH| = p, |HC| = k.
6. Öklid: c² = p·a.
7. Öklid: b² = k·a.

### Sahne 4 · İspat: topla

Tahta: üstte adım 2 ve 3 soluk; altına adım 4–7. Sağda hipotenüs çubuğu: p (turuncu) ve k (yeşil) yan yana, birleşince a (mavi).

İspat (adım 4–7):

| Adım | İfade | Gerekçe |
|---|---|---|
| 4 | b² + c² = k·a + p·a | 2 ve 3'ü taraf tarafa topla |
| 5 | b² + c² = a·(k + p) | a ortak çarpan |
| 6 | k + p = a | H, BC üzerinde: iki parça hipotenüsü tamamlar |
| 7 | b² + c² = a·a = a² | 5 ve 6 ∎ |

Anlatım:
1. İki eşitliği taraf tarafa toplayalım.
2. b² + c² = k·a + p·a.
3. Sağ yanda a ortak çarpan: a·(k + p).

Birlikte çöz (`tag: 'Birlikte çöz'`): a·(k + p) ifadesindeki k + p hangi uzunluğa eşittir? **|BC| = a: iki parça hipotenüsü tamamlar** / |AH| = h / |AB| = c. Dayandığı anlatım: sahne 3 (5) ve hipotenüs çubuğu. İpuçları: "p ve k hipotenüsün iki parçasıydı." · "İki parça birleşince hipotenüsün tamamı olur."

Sonra:
4. k + p = a: iki parça hipotenüsü tamamlar.
5. Böylece b² + c² = a·a = a².
6. İspat tamam: dik kenarların kareleri toplamı hipotenüsün karesidir.
7. Bu, Pisagor teoremidir.
8. Her adım benzer üçgenlerden geldi: Pisagor da benzerliğin sonucu.

### Sahne 5 · Sayıyla doğrula

Tahta: ispat üçgeni 3-4-5 olarak ölçeklenmiş (çizim verisi: ispat üçgeni). p = 1,8 ve k = 3,2 etiketleri; hesaplar sırayla: c² = 1,8·5 = 9; b² = 3,2·5 = 16; toplam 25 = 5².

Anlatım:
1. 3-4-5 üçgeninde yükseklik hipotenüsü 1,8 ve 3,2 parçaya böler.
2. c² = p·a = 1,8·5 = 9.
3. b² = k·a = 3,2·5 = 16.
4. Toplam: 9 + 16 = 25.
5. Hipotenüsün karesi: a² = 5² = 25.
6. İspat sayıyla da tutuyor.

### Sahne 6 · Aynı teorem, başka harfler

Tahta: solda ispat üçgeni (hipotenüs a, dik kenarlar b ve c): "b² + c² = a²". Sağda kitaptaki gösterim (çizim verisi: kitaptaki gösterim): dik kenarlar a (yatay, turuncu) ve b (dikey, yeşil), hipotenüs c (mavi): "a² + b² = c²". Harfler oklarla eşlenir: b → a, c → b, a → c.

Anlatım:
1. Harfleri değiştirsek de teorem değişmez.
2. Dik kenarlar a, b; hipotenüs c: a² + b² = c².
3. Bundan sonra Pisagor teoremini bu harflerle yazacağız.

Defter ("Pisagor"): **Pisagor:** a² + b² = c²; örnek 3² + 4² = 5².

### Sahne 7 · Pisagor'u kullan

Tahta: ızgara şekli (çizim verisi: ızgara): robot A′'dan B′'ne 16 birim sağa, B′'den C′'ne 12 birim aşağı; sonra yazı tahtası şekli (çizim verisi: yazı tahtası).

Anlatım:
1. Robot, A′ noktasından B′ noktasına 16 birim sağa gidiyor.
2. Sonra C′ noktasına 12 birim aşağı iniyor.
3. B′'de açı dik: A′B′C′ dik üçgen.
4. |A′C′|² = 16² + 12².
5. |A′C′|² = 256 + 144 = 400.
6. |A′C′| = 20 birim.
7. Yazı tahtası dikdörtgen: kısa kenarı 120 cm, uzun kenarı 240 cm.
8. Vidalar kırılınca tahta B köşesi çevresinde dönüyor.
9. E noktası, eski AD kenarı ile yeni C′D′ kenarının kesişimi.
10. |AE| = 30 cm; |EC′| aranıyor.
11. EAB üçgeninde A dik: |EB|² = 30² + 240².

Birlikte çöz (`tag: 'Birlikte çöz'`): |EB|² = 30² + 240² kaçtır? **58 500** / 270 / 72 900. Dayandığı anlatım: 11. İpuçları: "Önce her sayının karesi: 900 ve 57 600." · "Kareler toplanır; sayılar toplanıp karesi alınmaz."

Sonra:
12. |EB|² = 900 + 57 600 = 58 500.
13. EC′B üçgeninde C′ dik: |EB|² = |EC′|² + 120².

Soru (`tag: 'Sıra sende'`; tahtada yazı tahtası şekli): 58 500 = |EC′|² + 120². |EC′| kaç cm'dir? **210 cm** / 270 cm / 44 100 cm. Dayandığı anlatım: 12–13. İpuçları: "120² = 14 400; |EC′|² = 58 500 − 14 400." · "Çıkan sayı |EC′|'nin karesi; kendisini bulmak için karekök al."

Gör: |EC′|² = 44 100; |EC′| = 210 cm.

### Sahne 8 · Dene: Pisagor burada yazılır mı?

Tahta: sırayla dört kart (çizim verisi: dene kartları), her birinde bir kenar kalın mavi işaretli. İki kutu: "Pisagor eşitliği yazılır" ve "Yazılamaz". Sınıflandırma (sürükle-bırak; `c.on` ile pointer olayları): kartı kutuya bırak. Dört kart (her biri `tag: 'Sıra sende'`):

- (a) dik üçgen; hipotenüs işaretli. **Yazılır**. Gör: dik açı karesi ve işaretli kenarın karşısında olduğu gösterilir; 3² + 4² = 5².
- (b) aynı dik üçgen döndürülmüş; hipotenüs işaretli. **Yazılır**. İpucu: "Üçgen dönse de hipotenüs dik açının karşısıdır."
- (c) iki kenarı 4 ve 5, aradaki açı 60°; açının karşısındaki kenar işaretli. **Yazılamaz**. İpucu: "Dik açı yok; ispat dik açıya dayanıyordu."
- (d) iki kenarı 3 ve 4, aradaki açı 120°; açının karşısındaki kenar işaretli. **Yazılamaz**. İpucu: "Bu üçgende de dik açı yok."

Anlatım:
1. İspatta dik açı kullanıldı: AH, dik açıdan hipotenüse indi.
2. Dik açı yoksa bu ispat işlemez.
3. Pisagor eşitliği, dik açının karşısındaki kenar için yazılır.

### Çıkış soruları

1. (yanılgı) Pisagor teoremi için hangisi doğrudur? **Benzer üçgenlerle ispatlanır; her dik üçgende geçerlidir** / Yalnızca ölçülerek bulunmuş bir kuraldır; ispatı yoktur / Her üçgende geçerlidir. (sahne 2, 3, 4)
2. (yeni durum) ABC üçgeninde |AB| = 5 cm, |AC| = 12 cm ve m(A) = 60°. |BC|² = 5² + 12² yazılabilir mi? **Hayır; Pisagor yalnızca dik açının karşısındaki kenar için yazılır** / Evet; Pisagor her üçgende geçerlidir / Evet; ama yalnızca |AC| uzun olduğu için. (sahne 8)
3. (yeni durum) Dik kenarları 9 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir? **15 cm** / 21 cm / 108 cm. (sahne 6, 7)
4. (yeni durum) Hipotenüsü 13 cm, bir dik kenarı 5 cm olan dik üçgenin öbür dik kenarı kaç cm'dir? **12 cm** / 8 cm / 18 cm. (sahne 6, 7)
5. (yeni durum) 10 m'lik bir merdiven duvara dayalı; ayağı duvardan 6 m uzakta. Merdiven duvarın kaç metre yüksekliğine değer? **8 m** / 4 m / 16 m. (sahne 2, 6)

Özet: Öklid: c² = p·a ve b² = k·a. · İkisi toplanınca b² + c² = a·(k + p) = a². · **İki Öklid bağıntısı toplanınca Pisagor çıkar.** · Dik açı yoksa Pisagor eşitliği yazılmaz.

## D6 · Açı dik değilse: dar ve geniş açılı üçgenler

- **Fikir:** İki kenar sabitken aradaki açı dik açıdan büyürse karşı kenarın karesi öbür iki kenarın kareleri toplamını aşar; küçülürse altında kalır.
- **Giriş ekranı sorusu:** Bir makasın kollarını açtıkça uçları arasındaki uzaklık nasıl değişir?
- **Kaynak:** Ders kitabı s. 70 (12. uygulama, adım 6 a–b: geniş ve dar açılı üçgenler), s. 72 (29. örnek: 3 ve 4 birim kenarlı üç üçgen; 15. sıra sizde 1: |AB| = 5, |AC| = 12, açı geniş), s. 73 (Kontrol Noktası: m(BCA) > 90° ⇒ c² > a² + b²; m(BCA) < 90° ⇒ c² < a² + b²).
- **Sınır:** Yorum düzeyi; ispat yok. Ters yön (kenar karelerini karşılaştırıp açının türünü bulma) kural olarak da soru olarak da yok (karar 4): her kural ve soru açıdan kenara gider. Kosinüs teoremi yok. Kitabın 29. örnek ve 15. sıra sizde 1 çözümleri üçgen eşitsizliğini de kullanır (5 < |AC| < 7 ve 13 < |BC| < 17 gibi); üçgen eşitsizliği bu temanın bilgileri arasında olmadığından yalnızca "5'ten büyük", "5'ten küçük", "13'ten büyük" sonuçları alınır. Harfler kitaptaki gibi: c, C açısının karşısındaki kenar; |BC| = a, |AC| = b.
- **Güç kavramlar ve gösterimi:** Menteşeli iki çubuk (3 ve 4 birim): açı kaydırıcıyla açılır, karşı kenar uzar; yanında c² ve a² + b² iki çubuk grafik olarak karşılaştırılır (a² + b² = 25 sabit çizgi).
- **Hedeflenen yanılgı:** "a² + b² = c² her üçgende geçerlidir."
- **Akılda kalıcı cümle:** Açı dikten büyükse kare toplamı aşılır, küçükse altında kalınır.

Çizim verisi (y aşağı; menteşe C köşesinde, |CB| = a = 3, |CA| = b = 4):
- Menteşe (sahne 2, 5): C (0, 0), B (3, 0), A (4·cos θ, −4·sin θ); θ = C açısı. θ = 60°: A (2, −3.46), c² = 13; θ = 90°: A (0, −4), c² = 25; θ = 120°: A (−2, −3.46), c² = 37. Kaydırıcı tablosu (θ: c², uygulamada tek ondalığa yuvarlanır): 30°: 4,2 · 40°: 6,6 · 50°: 9,6 · 60°: 13,0 · 70°: 16,8 · 80°: 20,8 · 90°: 25,0 · 100°: 29,2 · 110°: 33,2 · 120°: 37,0 · 130°: 40,4 · 140°: 43,4 · 150°: 45,8. a² + b² = 25 her açıda.
- Üç üçgen (sahne 4): (1) ABC: B (0, 0), C (4, 0), A (−1.5, −2.6); |AB| = 3, |BC| = 4, m(B) = 120°, |AC|² = 37. (2) DEF: E (0, 0), F (4, 0), D (0, −3); m(E) = 90°, |DF| = 5. (3) KLM: L (0, 0), M (4, 0), K (1.5, −2.6); |KL| = 3, |LM| = 4, m(L) = 60°, |KM|² = 13. Üçü yan yana; açılar sarı yayla.
- Sıra sende (sahne 4): A (0, 0), C (12, 0), B (−2.5, −4.33); |AB| = 5, |AC| = 12, m(A) = 120°, |BC| = √229 ≈ 15.13 ("?"; çizimde gerçek boyunda).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D5) Dik kenarları 5 cm ve 12 cm olan dik üçgenin hipotenüsü kaç cm'dir? **13 cm** / 17 cm / 60 cm. Yanlışta: "Pisagor: a² + b² = c²; 25 + 144 = 169, c = 13."
2. (D4) Bir dik üçgende hipotenüs 20 cm; bir dik kenarın hipotenüs üzerindeki parçası 5 cm. Bu dik kenar kaç cm'dir? **10 cm** / 100 cm / 15 cm. Yanlışta: "Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: 5·20 = 100; kenar 10."

### Sahne 2 · Menteşeli çubuklar

Tahta: menteşe şekli (çizim verisi: menteşe). C'de menteşe; kollar CB = 3 (turuncu) ve CA = 4 (yeşil); açı yayı sarı; AB kesikli mavi uzaklık çizgisi. Sağda iki çubuk: c² (mavi, değişir) ve a² + b² (turuncu, 25'te sabit çizgi). Sırayla θ = 90°, 120°, 60° gösterilir.

Anlatım:
1. İki çubuk C köşesinde bir menteşeyle bağlı: 3 ve 4 birim.
2. Çubukların uçları A ve B; aralarındaki uzaklık |AB| = c.
3. Açı 90° iken Pisagor geçerli: c² = 3² + 4² = 25.
4. Yani uçlar arası c = 5 birim.
5. Açıyı 120°'ye açalım: uçlar uzaklaşıyor.
6. Uçlar arası yaklaşık 6,1 birim; karesi yaklaşık 37.
7. 37, 25'ten büyük: c² > a² + b².
8. Açıyı 60°'ye kapatalım: uçlar yaklaşıyor.
9. Uçlar arası yaklaşık 3,6 birim; karesi yaklaşık 13.
10. 13, 25'ten küçük: c² < a² + b².

### Sahne 3 · Geniş ve dar açı

Tahta: üç satır, her birinin yanında küçük menteşe çizimi (açı yayı sarı): "m(C) > 90° ise c² > a² + b²", "m(C) = 90° ise c² = a² + b²", "m(C) < 90° ise c² < a² + b²". Her satır anlatımla sırayla belirir.

Anlatım:
1. Bu, 3 ve 4 birimlik kollara özgü değil; her üçgende geçerli.
2. Geniş açının karşısındaki kenarın karesi, öbür iki kenarın kareleri toplamından büyüktür.
3. Dar açının karşısındaki kenarın karesi, o toplamdan küçüktür.
4. Dik açıda eşitlik var: Pisagor.

Birlikte çöz (`tag: 'Birlikte çöz'`): Kollar 3 ve 4 birim, aradaki açı 100°. Karşı kenarın karesi 25 ile nasıl karşılaştırılır? **25'ten büyük** / 25'e eşit / 25'ten küçük. Dayandığı anlatım: 2, 4. İpuçları: "100°, 90°'den büyük: geniş açı." · "Geniş açının karşısında kare toplamı aşılır."

Sonra:
5. Açı 90°'yi aşınca karşı kenarın karesi 25'i aşıyor.

Soru (`tag: 'Sıra sende'`): Kollar 3 ve 4 birim, aradaki açı 40°. Karşı kenarın karesi 25 ile nasıl karşılaştırılır? **25'ten küçük** / 25'e eşit / 25'ten büyük. Dayandığı anlatım: 3, 4. İpuçları: "40°, 90°'den küçük: dar açı." · "Dar açının karşısında kare toplamının altında kalınır."

Gör: açı 40°'ye kapanır; c² yaklaşık 6,6; 25'in çok altında.

Defter ("Dik değilse"): **Geniş:** c² > a² + b². **Dar:** c² < a² + b².

### Sahne 4 · Üç üçgen

Tahta: üç üçgen yan yana (çizim verisi: üç üçgen); her birinde 3 ve 4 birimlik iki kenar, aradaki açı sarı yay (120°, 90°, 60°); karşı kenar mavi: AC, DF, KM. Altta |DF|² = 3² + 4² = 25 → |DF| = 5; sonra |AC|² ve |KM|² için karşılaştırmalar belirir.

Anlatım:
1. Üç üçgende de iki kenar 3 ve 4 birim.
2. DEF'de aradaki açı 90°: |DF|² = 3² + 4² = 25.
3. Yani |DF| = 5 birim.
4. ABC'de aradaki B açısı geniş: |AC|² > 25.
5. Yani |AC| > 5 birim.
6. KLM'de aradaki L açısı dar: |KM|² < 25.
7. Yani |KM| < 5 birim.

Soru (`tag: 'Sıra sende'`; tahtada "Sıra sende" üçgeni): ABC üçgeninde |AB| = 5 birim, |AC| = 12 birim ve m(A) geniş. |BC| için hangisi doğrudur? **13'ten uzundur** / 13'tür / 13'ten kısadır. Dayandığı anlatım: 4–5 ve sahne 3 (2). İpuçları: "Geniş açı A; karşısındaki kenar BC." · "5² + 12² = 169; 169'un karekökü 13."

Gör: |BC|² > 169; yani |BC| > 13.

### Sahne 5 · Dene: menteşenin açısı

Tahta: menteşe şekli; C'deki açı kaydırıcıyla değişir. Sağda tablo: açı, c², a² + b² (= 25), ve yanında açının adı (dar / dik / geniş). İki çubuk grafik: c² (mavi), a² + b² (turuncu sabit çizgi). Kaydırıcı (`c.slider`, "Menteşenin açısı", 30° … 150°, adım 10°; `noWait` yönerge: "Açıyı kaydır; çubuğun 25 çizgisine göre yerine bak."). Tablo değerleri sahnenin çizim verisindedir. "Devam" ile biter.

Anlatım:
1. Açı 90°'yi geçince c² çubuğu 25 çizgisinin üstüne çıkıyor.
2. Açı 90°'nin altındayken çubuk 25 çizgisinin altında kalıyor.
3. Tam 90°'de çubuk çizgiye değiyor: Pisagor.

### Çıkış soruları

1. (yanılgı) "a² + b² = c² her üçgende geçerlidir." Bu cümle için hangisi doğrudur? **Yanlıştır; eşitlik yalnızca c dik açının karşısındaysa olur** / Doğrudur / Yanlıştır; hiçbir üçgende geçerli değildir. (sahne 3)
2. (yeni durum) İki kenarı 6 cm ve 8 cm, aralarındaki açı 110° olan üçgende karşı kenarın karesi 100 ile nasıl karşılaştırılır? **100'den büyük** / 100'e eşit / 100'den küçük. (sahne 3)
3. (yeni durum) İki kenarı 5 cm ve 12 cm, aralarındaki açı 45° olan üçgende karşı kenarın karesi 169 ile nasıl karşılaştırılır? **169'dan küçük** / 169'a eşit / 169'dan büyük. (sahne 3)
4. (yeni durum) ABC üçgeninde |AB| = 8 cm, |AC| = 15 cm ve m(A) geniş. |BC| için hangisi doğrudur? **17 cm'den uzundur** / 17 cm'dir / 17 cm'den kısadır. (sahne 3, 4)
5. (yeni durum) Bir makasın kolları 9 cm ve 12 cm. Kollar 90° açıldığında uçlar 15 cm uzakta. Kollar daha çok açılırsa uçlar arası uzaklık için hangisi doğrudur? **15 cm'den fazla olur** / 15 cm olur / 15 cm'den az olur. (sahne 2, 3)

Özet: Aradaki açı dik açıya eşitse c² = a² + b². · Geniş açıda c² daha büyük, dar açıda daha küçüktür. · **Açı dikten büyükse kare toplamı aşılır, küçükse altında kalınır.** · Pisagor eşitliği yalnızca dik açıda olur.

## D7 · Konu tekrarı: Tales, Öklid ve Pisagor teoremleri (`d7-tekrar.html`, 1 sahne + 9 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (BC'ye paralel çitli üçgen · üç paralel ve iki kesen · dik üçgen ve yükseklik h · dik üçgen, c ile p ve b ile k renkli · dik üçgen a, b, c karelerle değil harflerle · menteşeli iki çubuk) ve deftere düşer. Biten kural soluklaşır. Çizimlerin ölçüleri D1–D6'daki şekillerden alınır; harfler kitaptaki gibidir: Pisagor ve D6 için a, b, c; Öklid için p, k, h, a (hipotenüs), b, c.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Paralel doğru, üçgenin iki kenarını aynı oranda böler.
3. Paralel üç doğru, kesenlerde orantılı parçalar ayırır.
4. Dik üçgende yüksekliğin karesi, iki parçanın çarpımıdır.
5. Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır.
6. Dik kenarların kareleri toplamı, hipotenüsün karesidir.
7. Geniş açıda karşı kenarın karesi toplamı aşar; dar açıda altında kalır.
8. Hepsi benzer üçgenlerden çıkar.

Defter ("Teoremler"): **Teoremler:** hepsi benzer üçgenlerden çıkar.

Sorular (`quiz`, karışık sırada):

1. DE ∥ BC olan ABC üçgeninde (D ∈ AB, E ∈ AC) |AD| = 6 cm, |DB| = 3 cm ve |AE| = 8 cm. |EC| kaç cm'dir? **4 cm** / 16 cm / 3 cm. — D1
2. Üç paralel doğru iki kesen üzerinde |AB| = 4 cm, |BC| = 10 cm, |DE| = 6 cm parçalarını ayırıyor. |EF| kaç cm'dir? **15 cm** / 10 cm / 2,4 cm. — D2
3. Bir dik üçgende hipotenüse inen yükseklik, hipotenüsü 3 cm ve 12 cm'lik parçalara ayırıyor. Yüksekliği kaç cm'dir? **6 cm** / 36 cm / 7,5 cm. — D3
4. BAC dik üçgeninde A dik, AH ⊥ BC; |BH| = 2 cm ve |BC| = 18 cm. |AB| kaç cm'dir? **6 cm** / 16 cm / 36 cm. — D4
5. Dik kenarları 8 cm ve 15 cm olan dik üçgenin hipotenüsü kaç cm'dir? **17 cm** / 23 cm / 120 cm. — D5
6. 25 m'lik bir tel, bir direğin tepesinden yerde direğin ayağından 7 m uzaktaki bir noktaya gerilmiştir. Direk yere dik olduğuna göre kaç metre yüksekliktedir? **24 m** / 18 m / 32 m. — D5
7. İki kenarı 5 cm ve 7 cm, aralarındaki açı 95° olan üçgende karşı kenarın karesi 74 ile nasıl karşılaştırılır? **74'ten büyük** / 74'e eşit / 74'ten küçük. — D6
8. AB ∥ CD; AC ve BD kesenleri H'de kesişiyor. |AB| = 8 cm, |BH| = 10 cm, |HD| = 5 cm. |CD| kaç cm'dir? **4 cm** / 16 cm / 3 cm. — D2
9. a² + b² = c² eşitliği hangi durumda yazılabilir? **Dik üçgende, c dik açının karşısındaki kenarsa** / Her üçgende, c en uzun kenarsa / Açısı 60° olan her üçgende. — D5, D6

Akılda kalıcı cümle: Paralel, dik ve karşı kenar: hepsi benzer üçgenlerden çıkar.

## Program metniyle karşılaştırma (9 Ekim 2026)

| Programın istediği (MAT.9.4.4 ve uygulama metni) | Karşılığı |
|---|---|
| Tales ve Öklid teoremleri tanıtılır; ispatın benzer üçgenlerle nasıl yapılabileceği tartışılır (yöntem belirlenir) | D1 sahne 2–3 (benzerlikten başlama); D2 sahne 3–4 (yardımcı çizgi); D3 sahne 3–4 (sayıyla, sonra harflerle) |
| Verilen üçgenin iç bölgesinde paralel doğru parçası (paralel) çizerek benzer üçgen oluşturma | D1 sahne 2–4 (çit: DE ∥ BC) |
| Verilen üçgenin iç bölgesinde dikme çizerek benzer üçgen oluşturma | D3 sahne 2–5; D4 sahne 2–4 |
| 4.4.a Tales teoreminin ispatı | D2 sahne 4–5 (ispat tablosu: AF köşegeni, temel orantı iki kez) |
| 4.4.a Tales teoremine yol açan ara önerme: temel orantı | D1 sahne 3–4 |
| 4.4.a Öklid teoreminin ispatı (yüksekliğin karesi) | D3 sahne 4–5 |
| 4.4.a Öklid teoremi: dik kenar bağıntıları | D4 sahne 3–5 |
| 4.4.a Pisagor teoreminin ispatı (benzer üçgen koşulları ve Öklid'in dik kenar bağıntılarıyla) | D5 sahne 3–4 (ispat tablosu), sahne 5 (sayıyla doğrulama), sahne 6 (kitaptaki gösterim) |
| "Farklı ispatları kullanır" (4.4.a) | Üç teoremin üç ayrı ispatı D2, D3–D4, D5'te; tek yöntem benzer üçgen (karar 5); öbür ispat yolları zenginleştirme |
| İspatlanan teoremlerin değerlendirilmesinde benzer üçgenlerin önemi vurgulanır | D5 sahne 4 (7. satır); D7 sahne 1 (8. satır) |
| 4.4.b İspat yöntemini yeni durumlara uyarlama | D1 sahne 5 (iki paralel, 21. örnek); D2 sahne 6–9 (dört paralel, mum, gölet); D3 sahne 6–7 (abide, çatı); D4 sahne 6–7 (çatı, iki dik üçgen); D5 sahne 7 (ızgara, yazı tahtası) |
| Teoremler ve sonuçlarına ilişkin farklı problem durumları | D1–D5 "Sıra sende" soruları ve çıkış soruları; D7 |
| Pisagor teoreminin dar ve geniş açılı üçgenlerle ilgili sonuçlarını yorumlama | D6 sahne 2–5 |
| Pisagor teoremini ortaokulda tamkare uzunluklu problemlerde kullanma (ön bilgi) | D5 sahne 2 (hatırlatma), sahne 7 (kısa kullanım örnekleri) |
| Adımları sistematik izleyerek ispat yapma (E1.3, E3.6, E3.7) | Tüm ispatlar adım–gerekçe tablosuyla (D1 s. 3–4, D2 s. 4–5, D3 s. 4–5, D4 s. 3–4, D5 s. 3–4) |
| Önceki konuların bilgilerini (benzerlik koşulları, kenara paralel çizim, dik köşeden yükseklik) kullanma | D1–D6 Hatırla soruları ve ispat gerekçeleri (B3, B4, C2, C3) |
| Anahtar kavramlar: Tales, Öklid, Pisagor teoremi | D2, D3–D4, D5 |
| Çalışma kâğıdı (Tales, Öklid, Pisagor, farklı soru türleri) | `site dışı` (dayandığı bilgi D1–D7) |
| Konu tekrarı | D7 |

Fazla olan: D1'deki "bütünün oranı → parçaların oranı" çubuk gösterimi ve D4'teki "kendi parçası" sözü kitapta yoktur; ikisi de programın istediği ispat adımlarının gösterimidir, yeni kural değildir. D2'deki dört paralel örneği (K ve L noktaları) Tales teoremini her üç paralele uygulamaktır, yeni kural değildir; harfler kitapta yok. D5 sahne 8 (Pisagor burada yazılır mı?) ispatın dik açıya dayandığını gösterir; dar ve geniş açı sonuçları D6'dadır. Eksik olan: yok. Kitapta olup alınmayanlar: 20. örnek (katlama, orta taban), 22. örnek ve 13. sıra sizde (1/x = 1/a + 1/b kenar notu), 13. sıra sizde 1 (kamera düzeneği) ve 3 (gölge), 14. sıra sizde, 25. örnekten sonraki 14. sıra sizde 2, 27. örnek (eşkenar üçgen, √7), 15. sıra sizde 2–3, 10. uygulamanın 6b sorusu (a, b, c ilişkisi) ve alıştırma 1, 3–7, 9–11; çoğu programda olmayan konular (orta taban, açıortay, özel üçgenler, üçgen eşitsizliği, dönüşümlerle karışık problemler) ya da E konusunun problem çözme sürecidir.

