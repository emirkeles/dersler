# Senaryolar — Konu A · Basınç

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.3.1, `../PLAN.md` bölüm 3 (A1, A2), "Kısa ders listesi (kararlardan sonra)", bölüm 7 (karar 2, 5, 19, 24) ve bölüm 8 ("A" satırları). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Bu dosya öteki konu senaryolarının örneğidir.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Rakam, birim ve simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("0,02 m²" → "sıfır virgül sıfır iki metrekare", "Pa" → "pascal", "P = F/A" → "P eşittir F bölü A").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Sayılar bir durumun içinde sunulur: deneyi Ela yapar.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra her derste aynıdır: hatırla (temanın ilk dersi dışında) → anlat → örnekle göster → birlikte çöz (`tag: 'Birlikte çöz'`) → sor → gör → adlandır (defter) → dene → 4–5 çıkış sorusu.
- Renkler tema boyunca aynıdır: kuvvet turuncu, yüzey alanı turkuaz, basınç sarı, sıvı mavi, kaldırma kuvveti mor. Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz. Tahta koyudur: çizgiler açık renklidir.
- Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir. Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren).
- A1'de kuma batma derinliği şematiktir: basınçla orantılı çizilir, tahtaya derinlik sayısı yazılmaz (ölçüm yok; `PLAN.md` karar 19). A2'deki sayılar örnek veridir ve P = F/A ile hesaplanmıştır.
- Kum düzeneği (A1 ve A2 ortak, `dersler/a-araclar.js`): kap x 110–890, kum yüzeyi y = 380, kap tabanı y = 500. Tuğla 140 × 70 birimdir: yatıkken 140 genişlik × 70 yükseklik (geniş yüz), dikken 70 × 140 (dar yüz). Dar yüzün alanı geniş yüzün yarısıdır. Batma: yatık tek tuğla 14, dik tek tuğla 28, dik tuğlanın üstünde bir tuğla daha varsa 56 birim. Tuğla kuma 900 ms'de `inOut` ile iner; kaldırılırken 600 ms'de `inOut` ile 120 birim yukarı çıkar ve çukur görünür.

## A1 · Basınç neye bağlı?

- **Fikir:** Basınç iki şeye bağlıdır: yüzeye etki eden kuvvete ve kuvvetin yayıldığı yüzey alanına.
- **Giriş ekranı sorusu:** Karda botla yürürken batıyorsun, kar ayakkabısıyla batmıyorsun; ağırlığın aynıyken değişen ne?
- **Kaynak:** Ders kitabı s. 134 (kar ayakkabısı), s. 135–137 (kum ve özdeş tuğla deneyi, Şekil I–V; "Neyi değiştirdiniz? · Ne oldu? · Yorumunuz nedir?" tablosu), s. 139 (cisimler kuvveti aynen iletir, çivi; tanım; paletli iş makinesi), s. 140–142 (çadır kazığı, topuk ucu koruma aparatı, traktörün geniş tekerleği, bıçak, raptiye), s. 133 (sırt çantası), s. 143 (basıncı artırmak ve azaltmak). Kitap deneyde ölçüm vermez; batma yalnızca sıralamayla gösterilir.
- **Sınır:** Formül ve birim bu derste yok (A2). Sayı yok. Eğik düzlem, ağırlığın bileşenleri, basınç kuvveti hesabı yok.
- **Güç kavramlar ve gösterimi:** (1) Kuvvet aynı kalırken basıncın değişmesi: aynı ağırlık oku (turuncu, hep aynı boy) dar ve geniş tabanın üstünde durur; tabanın altında aynı sayıda küçük ok dar yüzeyde sıkışır, geniş yüzeyde seyrelir. (2) Etmenleri ayırma: her denemede yalnızca bir şey değişir; değişen etiket renkle vurgulanır, sonuç tabloya düşer. (3) Üst üste konan tuğlanın duruşunun önemsizliği: iki düzenek yan yana kuma iner, çukurlar aynı çizgide biter.
- **Hedeflenen yanılgı:** "Basınç kuvvetle aynı şeydir; ağırlık aynıysa basınç da aynıdır" ve "yüksek ya da büyük görünen cisim daha çok basınç yapar".
- **Akılda kalıcı cümle:** Aynı kuvvet, küçük yüzeyde daha büyük basınç yapar.

### Sahne 1 · Karda iki ayakkabı

Tahta: kar zemini (yüzey y = 400, altı açık gri-beyaz dolgu, x 60–940). Solda bir bot (taban genişliği 80, x 200–280; gövdesi 80 × 110), sağda aynı bot bir kar ayakkabısının üstünde (taban genişliği 260, x 600–860, kalınlık 14). İkisinin üstünde aynı boyda turuncu ok (aşağı, 90 birim) ve "ağırlık" yazısı. Bot 1000 ms'de `inOut` ile kara 64 birim gömülür; kar ayakkabısı 1000 ms'de 10 birim gömülür. 6. cümlede iki tabanın altında sarı küçük oklar belirir (400 ms, `out`): botun altında 8 ok 80 birime sıkışık, kar ayakkabısının altında 8 ok 260 birime seyrek. 7. cümlede altta "basınç" yazısı (sarı) belirir.

Anlatım:
1. Ela karda botlarıyla yürüyor; her adımda ayağı kara gömülüyor.
2. Ayağını kara bastıran kuvvet, Ela'nın ağırlığıdır.
3. Ela kar ayakkabısı takıyor: ayağı artık batmıyor.
4. Ela'nın ağırlığı değişmedi; kara bastıran kuvvet aynı.
5. Değişen tek şey, kara değen yüzeyin büyüklüğü.
6. Aynı kuvvet geniş yüzeye yayılınca her yere daha azı düşer.
7. Yüzeyin her birimine düşen kuvvete basınç denir.

Soru (`tag: 'Sıra sende'`; yeni durum): Ela ince topuklu bir ayakkabı giyip karda duruyor. Topuk kara nasıl batar? **Bottan daha derine batar** / Bot kadar batar / Hiç batmaz. Dayandığı anlatım: 4–7. İpuçları: "Ağırlık aynı; topuğun kara değen yüzeyi bottan da küçük." · "Yüzey küçüldükçe kar daha çok ezilir."

Gör: botun yerine ince topuklu ayakkabı (topuk genişliği 16) belirir, topuk 800 ms'de `inOut` ile 110 birim gömülür.

Sonra:
8. Topuğun ucu küçücük: aynı ağırlık çok küçük bir yüzeye biniyor.

### Sahne 2 · Kumda tuğla: yüzey alanı

Tahta: kum düzeneği (okuma kılavuzu). A tuğlası yatık (x 250–390), B tuğlası dik (x 610–680); üstlerinde harfleri. İkisinin üstünde aynı boyda turuncu ağırlık oku. Tuğlaların kuma değen kenarı turkuaz kalın çizgiyle vurgulanır (A'da 140, B'de 70 birim). Tuğlalar önce kumun 40 birim üstünde durur; tahminden sonra birlikte kuma inerler.

Anlatım:
1. Bunu sınamak için kum dolu bir kap ve özdeş tuğlalar alalım.
2. Özdeş tuğlaların ağırlığı aynıdır: kuma aynı kuvvetle bastırırlar.
3. A tuğlasını geniş yüzünün üstüne yatırıyoruz.
4. B tuğlasını dar yüzünün üstüne dikiyoruz.
5. Kuvvetler eşit; yalnızca kuma değen yüzey alanı farklı.

Tahmin (`tag: 'Tahmin et'`; sezgiyle ve sahne 1'le): Tuğlalar kuma bırakılınca hangisi daha derine batar? **Dik duran B** / Yatık duran A / İkisi aynı derinliğe batar. Dayandığı anlatım: sahne 1, 5–7. İpuçları: "A'nın ağırlığı daha geniş bir yüzeye yayılıyor." · "Kuvvetler eşit ama kuma değen yüzeyler farklı."

Gör: iki tuğla kuma iner (A 14, B 28 birim; 900 ms, `inOut`), sonra kaldırılır; çukurların yanında "sığ" ve "derin" yazar.

Sonra:
6. Tuğlaları kaldırınca çukurlar görünüyor: B'nin çukuru daha derin.
7. Kuvvet aynıyken yüzey alanı küçülürse basınç artar.

Tahtada son satır (y = 70): "yüzey alanı küçüldü → basınç arttı" ("yüzey alanı" turkuaz, "basınç" sarı).

### Sahne 3 · Kumda tuğla: kuvvet

Tahta: kum düzeneği solda daraltılmış (kap x 60–520, kum yüzeyi y = 380). A (x 130–200) ve B (x 360–430) dik durur. Sağda üç sütunlu tablo (x 548–972, y 130; sütunlar "Ne değişti?" 192, "Ne oldu?" 132, "Basınç" 100; iki veri satırı). Önce A ve B kuma iner (ikisi 28 birim), kaldırılır, kum düzelir (çukurlar 400 ms'de `in` ile kaybolur); sonra C, B'nin üstüne konur (C yukarıdan 700 ms'de `inOut` ile iner). Birlikte çöz'den sonra A ve B+C kuma iner: A 28, B+C 56 birim.

Tablonun ilk satırı 3. cümlede dolu gelir: "alan küçüldü · daha derin · arttı" (hücreler dar sütuna sığsın diye kısa). İkinci satır 5. cümlede "kuvvet büyüdü · ? · ?" olarak açılır.

Anlatım:
1. Şimdi yüzey alanını sabit tutup kuvveti değiştirelim.
2. A ve B tuğlaları dik duruyor; ikisi kuma aynı derinlikte batıyor.
3. Az önceki sonucu bir tabloya yazalım: yüzey alanı küçüldü, basınç arttı.
4. Kumu düzeltip B'nin üstüne özdeş bir C tuğlası koyuyoruz.
5. B'nin kuma değen yüzeyi aynı; üstündeki ağırlık iki katına çıktı.

Birlikte çöz (`tag: 'Birlikte çöz'`): tablonun ikinci satırını sen tamamla. Kuvvet büyüyünce tuğla nasıl batar, basınç ne olur? **Daha derin batar; basınç artar** / Aynı derinliğe batar; basınç değişmez / Daha az batar; basınç azalır. Dayandığı anlatım: sahne 1, 7; bu sahne 5. İpuçları: "Aynı yüzeye şimdi iki tuğlanın ağırlığı biniyor." · "Yüzeyin her birimine düşen kuvvet arttı."

Gör: A ve B+C kuma iner; kaldırılınca B'nin çukuru A'nınkinin iki katı derin. Tablonun ikinci satırı dolar: "kuvvet büyüdü · daha derin · arttı".

Sonra:
6. Üst üste iki tuğla, tek tuğladan daha derine battı.
7. Yüzey alanı aynıyken kuvvet büyürse basınç artar.

Not: tablo sahnesidir; tahtadaki kelime sayısı 25'i aşabilir (`KURALLAR.md` 4, tablo istisnası).

### Sahne 4 · Aynı kuvvet, aynı yüzey

Tahta: kum düzeneği tam genişlikte (kap x 110–890). Solda B dik (x 260–330), üstünde A dik (toplam yükseklik 280). Sağda B dik (x 640–710), üstünde A yatık (x 605–745; T biçimi, toplam yükseklik 210). İki düzeneğin altında turkuaz çizgi: ikisinde de 70 birim. Düzenekler kumun 30 birim üstünde bekler; sorudan sonra birlikte iner (ikisi de 56 birim; 900 ms, `inOut`). Sonra kum yüzeyinin altında, iki çukurun dibinden geçen yatay kesikli çizgi belirir (400 ms, `out`): çukurlar aynı derinlikte.

Anlatım:
1. Son deneme: iki tuğlayı iki ayrı biçimde üst üste koyuyoruz.
2. Solda A, dik duran B'nin üstünde dik duruyor.
3. Sağda A, dik duran B'nin üstüne yatırılmış.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Hangi düzenek kuma daha derine batar? **İkisi aynı derinliğe batar** / Soldaki; daha yüksek / Sağdaki; üstü daha geniş. Dayandığı anlatım: sahne 2, 7; sahne 3, 7. İpuçları: "Yükseklik kuma değmez. Toplam ağırlığa ve kuma değen yüzeye bak." · "Üstteki tuğlanın duruşu, kuma değen yüzeyi değiştirmez."

Gör: iki düzenek aynı derinliğe iner; kesikli çizgi iki çukurun dibini birleştirir.

Sonra:
4. İki düzenekte de kuma iki tuğlanın ağırlığı biniyor.
5. İkisinde de kuma değen yüzey, B'nin dar yüzü.
6. Kuvvet ve yüzey alanı aynıysa basınç da aynıdır.
7. Basınç iki şeye bağlıdır: kuvvete ve kuvvetin yayıldığı yüzey alanına.

Tahtada son iki satır (y = 60 ve 100): "kuvvet büyürse basınç artar" · "yüzey alanı büyürse basınç azalır" ("kuvvet" turuncu, "yüzey alanı" turkuaz, "basınç" sarı). Düzenekler 0,35 saydamlığa iner.

Defter ("Basınç"): **Basınç kuvvete ve yüzey alanına bağlıdır.** Örnek: dik tuğla derin batar.

### Sahne 5 · Çivi nasıl çakılır?

Tahta: altta ahşap blok (x 250–750, y 380–520, kahverengi dolgu). Ortada çivi: başı üstte (genişlik 90, kalınlık 12, y 150), gövdesi 14 genişlikte, sivri ucu bloğun yüzeyinde (y 380). Başın üstünde turuncu kuvvet oku (aşağı, 80 birim, "kuvvet"); 2. cümlede uçta aynı boyda turuncu ok belirir. Başın yanında turkuaz "geniş yüzey", ucun yanında turkuaz "dar yüzey". Sorudan sonra çivi 700 ms'de `inOut` ile 90 birim bloğa girer. Baştaki ok ve iki etiketi çiviyle birlikte iner; uçtaki ok çivi girerken 250 ms'de `in` ile kaybolur, uç etiketleri tahtanın yüzeyinde kalır. 6. cümlede sağda ikinci bir çivi belirir (x 620): başı aşağıda, ucu yukarıda, gri; üstüne aynı kuvvet oku gelir, çivi yerinden oynamaz (ok 300 ms'de 12 birim aşağı inip geri çıkar, `inOut`).

Anlatım:
1. Çekiçle çivinin başına vuruyorsun: çivi tahtaya giriyor.
2. Çivi, başına uygulanan kuvveti ucuna aynen iletir.
3. Başta ve uçta kuvvet aynı; yüzey alanları ise çok farklı.
4. Çivinin başı geniştir: orada basınç küçüktür.

Soru (`tag: 'Sıra sende'`): Çivinin sivri ucunda basınç nasıldır? **Baştakinden çok büyüktür** / Baştakiyle aynıdır / Baştakinden küçüktür. Dayandığı anlatım: 2–4; sahne 2, 7. İpuçları: "Kuvvet aynı ama uçtaki yüzey çok daha küçük." · "Küçük yüzeyde basınç artar."

Sonra:
5. Uçtaki büyük basınç tahtayı deler; çivi içeri girer.
6. Çiviyi ters çevirip başından çakmayı dene: girmez.
7. Kuvvet aynı; geniş yüzeydeki basınç tahtayı delmeye yetmez.

Tahtada: başın yanında "küçük basınç", ucun yanında "büyük basınç" (sarı).

### Sahne 6 · Artır mı, azalt mı?

Tahta: üstte iki kutu başlığı (x 80–480 "Basıncı artırır", x 520–920 "Basıncı azaltır"; y 60–110). Ortada (y 150–330) sıradaki kartın şematik çizimi (300 × 180 çerçeve içinde): bıçak ağzı; paletli iş makinesi; raptiye; traktör tekerleği; çadır kazığı; çanta askısı; topuk aparatı. Çizimler yalnızca temas yüzeyini gösterir: cisim gri, zemine değen kenar turkuaz. Yerine oturan kartın adı kutusunun altına yazılır (22 birim, alt alta; kart 500 ms'de `inOut` ile kutusuna küçülerek gider). Önce iki örnek anlatımla yerleştirilir (bıçak sola, iş makinesi sağa), sonra beş kartı öğrenci yerleştirir.

Anlatım:
1. Bazı araçlar basıncı artırmak, bazıları azaltmak için tasarlanır.
2. Kesmek ve delmek için basınç artırılır: yüzey küçültülür.
3. Bıçağın ağzı incedir: az kuvvetle büyük basınç yapar, ekmeği kolay keser.
4. Batmamak ve ezmemek için basınç azaltılır: yüzey büyütülür.
5. Paletli iş makinesi ağırdır; geniş paletleri sayesinde çamura batmaz.

Dene (`tag: 'Dene'`; kart başına seçim, kutular "Basıncı artırır" / "Basıncı azaltır"). Soru kalıbı: "<kart> basıncı artırmak için mi, azaltmak için mi böyle yapılmıştır?" Yanlışta ipucu: "Zemine değen yüzeye bak: küçük mü, büyük mü?"

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Raptiyenin sivri ucu | artırır | Evet. Sivri uç panoya az kuvvetle girer: kolaylık. |
| Traktörün geniş arka tekerleği | azaltır | Evet. Geniş tekerlek yumuşak toprağa batmaz. |
| Çadır kazığının sivri ucu | artırır | Evet. Sivri uç toprağa kolay girer. |
| Sırt çantasının geniş askısı | azaltır | Evet. Geniş askı omzu daha az ezer: konfor. |
| İnce topuğa takılan geniş uç | azaltır | Evet. Topuk çime batmaz, yürümek rahatlar. |

Sonra:
6. Bir aleti kullanışlı yapmak, çoğu zaman yüzey alanını değiştirmektir.
7. Aynı kuvvet, küçük yüzeyde daha büyük basınç yapar.

### Çıkış soruları

1. (yeni durum) Bir çocuk kumsalda önce iki ayağının üstünde, sonra parmak uçlarında duruyor. Kuma yaptığı basınç nasıl değişir? **Artar; aynı ağırlık daha küçük yüzeye biner** / Değişmez; ağırlığı aynıdır / Azalır; kuma daha az yeri değer. (sahne 2)
2. (yanılgı) Özdeş iki tuğladan biri yatık, biri dik duruyor. Hangisi doğrudur? **Yere uyguladıkları kuvvet eşit, basınç farklıdır** / Kuvvetleri de basınçları da eşittir / Dik duran tuğla daha ağırdır. (sahne 2)
3. (yeni durum) Yüklü bir kamyon yumuşak toprağa batıyor; yükü boşaltılınca batmadan ilerliyor. Neden? **Kuvvet azaldı; aynı yüzeyde basınç azaldı** / Tekerleklerin yere değen yüzeyi büyüdü / Kuvvet azaldı ama basınç aynı kaldı. (sahne 3)
4. Raptiyenin başına parmağınla bastırıyorsun; parmağın delinmiyor, pano deliniyor. Neden? **Kuvvet aynı; sivri uçta yüzey küçük, basınç büyük** / Uçtaki kuvvet baştakinden büyük / Baştaki basınç uçtakinden büyük. (sahne 5)
5. (yeni durum) Ağır bir dolabın ince ayakları parkede iz bırakıyor. İzi azaltmak için hangisi işe yarar? **Ayakların altına geniş pullar koymak** / Ayakları daha ince olanlarla değiştirmek / Dolabın içine daha çok eşya koymak. (sahne 6)

Özet: Basınç, yüzeyin her birimine düşen kuvvettir. · Kuvvet büyürse basınç artar; yüzey alanı büyürse basınç azalır. · **Aynı kuvvet, küçük yüzeyde daha büyük basınç yapar.**

## A2 · Ölç, kaydet, modele ulaş

- **Fikir:** Kuvvet, yüzey alanı ve basınç ölçülüp tabloya kaydedilince basıncın matematiksel modeli ortaya çıkar: P = F / A. Model, ölçmeden çıkarım yapmayı sağlar.
- **Giriş ekranı sorusu:** Bir tuğlanın kuma dikken yatıktan daha çok bastırdığını gördün; kaç kat daha çok?
- **Kaynak:** Ders kitabı s. 137 (verilerden matematiksel modele; çıkarım cümleleri), s. 139 (tanım; P = F/A; birimler Pa, N, m²; Pa = N/m²; yatay düzlemde F = G, P = G/A), s. 140 (örnek: dört özdeş küp), s. 144 (altı özdeş küp), s. 143 (özet). Kitap ölçüm vermez ve benzetimi karekoda bırakır: basınçölçerli düzenek kitap dışıdır, sayılar örnek veridir (`PLAN.md` karar 19).
- **Sınır:** Değişkenlerin ilişkisini yorumlama. Tek adımlı bölme dışında hesap yok; m·g açılımı, birim çevirme, basınç kuvveti hesabı yok.
- **Örnek veri (P = F/A ile hesaplandı):** tuğla ağırlığı 20 N; geniş yüz 0,02 m², dar yüz 0,01 m². Tablo 1 (alan 0,02 m²): 20 N → 1.000 Pa, 40 N → 2.000 Pa, 60 N → 3.000 Pa. Tablo 2 (kuvvet 40 N): 0,01 m² → 4.000 Pa, 0,02 m² → 2.000 Pa, 0,04 m² → 1.000 Pa. Kaydırıcı: kuvvet 20, 40, 60 N; alan 0,01, 0,02, 0,04 m²; basınç sırasıyla 2.000, 1.000, 500 · 4.000, 2.000, 1.000 · 6.000, 3.000, 1.500 Pa.
- **Güç kavramlar ve gösterimi:** (1) Ters orantı: alan sütunu büyürken basınç sütunu küçülür; satırlar arasına "× 2" ve "÷ 2" işaretleri konur. (2) Modelin veriden çıkması: her satırda kuvvet alana bölünür, sonuç basınç sütunuyla aynı çıkar; bölme satır satır tahtada görünür. (3) Sayısız çıkarım: küplerde kuvvet G'nin, yüzey A'nın katlarıyla yazılır.
- **Hedeflenen yanılgı:** "Yüzey alanı büyürse basınç da büyür" (doğru ve ters orantının karıştırılması) ve "kuvvetle alan çarpılır".
- **Akılda kalıcı cümle:** Basınç, kuvvetin yüzey alanına bölümüdür.

### Sahne 1 · Hatırla

Açılış cümlesi: "Başlamadan önce iki şeyi hatırlayalım."

1. Özdeş iki tuğladan biri yatık, biri dik kuma konuyor. Hangisi daha derine batar? **Dik duran** / Yatık duran / İkisi aynı derinliğe batar. (A1) Yanlışta: "Kuvvet aynıyken yüzey alanı küçülürse basınç artar."
2. Basınç hangi iki şeye bağlıdır? **Kuvvete ve yüzey alanına** / Yalnızca kuvvete / Cismin yüksekliğine ve biçimine. (A1) Yanlışta: "Basınç, kuvvete ve kuvvetin yayıldığı yüzey alanına bağlıdır."

Tahta: birinci soruda kumda yatık ve dik tuğla (A1 sahne 2'nin son karesi, küçültülmüş); ikinci soruda boş.

Sonra: "Bugün bu iki etmeni ölçüp sayıya dökeceğiz."

### Sahne 2 · Ölçüm düzeneği

Tahta: solda düzenek (x 60–480): yatay bir basınçölçer levhası (x 100–440, y 400–420, gri), altında gösterge kutusu (x 190–350, y 440–500; içinde sarı sayı ve "Pa"). Levhanın üstünde yatık bir tuğla (140 × 70). Tuğlanın üstünde turuncu ok ve "20 N"; tabanında turkuaz çizgi ve "0,02 m²". Sağda tablo 1 (x 540–960, y 120; sütunlar "Kuvvet (N)" 140 turuncu, "Yüzey alanı (m²)" 160 turkuaz, "Basınç (Pa)" 120 sarı; üç veri satırı). Gösterge sayısı 600 ms'de 0'dan 1.000'e sayarak çıkar (`out`).

Anlatım:
1. Kumdaki çukur basıncı karşılaştırır ama sayı vermez.
2. Ela tuğlayı bu kez bir basınçölçerin üstüne koyuyor.
3. Kuvvetin birimi newton, yüzey alanının birimi metrekaredir.
4. Basıncın birimi pascaldır; kısaca Pa yazılır.
5. Tuğlanın ağırlığı 20 newton; geniş yüzünün alanı 0,02 metrekare.
6. Basınçölçer 1.000 pascal gösteriyor.
7. Ölçümü tabloya kaydediyoruz: kuvvet, yüzey alanı, basınç.

Tablonun ilk satırı 7. cümlede açılır: "20 · 0,02 · 1.000".

### Sahne 3 · Kuvveti değiştir

Tahta: sahne 2'nin düzeneği ve tablosu (ilk satır dolu). İkinci yatık tuğla birincinin üstüne iner (700 ms, `inOut`); ok etiketi "40 N" olur, gösterge 2.000'e çıkar; ikinci satır açılır. Birlikte çöz'de üçüncü tuğla iner, etiket "60 N", gösterge "?"; cevaptan sonra 3.000. Satırların sağında, basınç sütununun yanında "× 2" ve "× 3" işaretleri (sarı, 22 birim) belirir.

Anlatım:
1. Yüzey alanını sabit tutup üstüne ikinci tuğlayı koyuyoruz.
2. Kuvvet 40 newton oldu; basınçölçer 2.000 pascal gösteriyor.
3. Kuvvet iki katına çıktı; basınç da iki katına çıktı.

Birlikte çöz (`tag: 'Birlikte çöz'`): üçüncü tuğla da konuyor; kuvvet 60 N, yüzey alanı yine 0,02 m². Üçüncü satırı sen tamamla: basınçölçer kaç pascal gösterir? **3.000 Pa** / 2.500 Pa / 4.000 Pa. Dayandığı anlatım: 2–3. İpuçları: "Her tuğla basıncı aynı miktarda artırıyor: 1.000 Pa." · "Kuvvet ilk ölçümün üç katı; basınç da öyle olmalı."

Sonra:
4. Kuvvet üç katına çıkınca basınç da üç katına çıktı.
5. Yüzey alanı sabitken basınç, kuvvetle doğru orantılıdır.

### Sahne 4 · Yüzey alanını değiştir

Tahta: aynı düzenek; sağda tablo 2 (aynı sütunlar, üç satır). Levhanın üstünde hep iki tuğla; ok etiketi "40 N" sabit. Üç düzen sırayla: (a) iki tuğla yatık, üst üste (taban 140, "0,02 m²") → 2.000; (b) iki tuğla dik, üst üste (taban 70, "0,01 m²") → 4.000; (c) iki tuğla yatık, yan yana (taban 280, "0,04 m²") → soru, sonra 1.000. Tuğlalar düzen değiştirirken 800 ms'de `inOut` ile yerine gider. Basınç sütununun yanında "× 2" ve "÷ 2" işaretleri.

Anlatım:
1. Şimdi kuvveti sabit tutalım: hep iki tuğla, 40 newton.
2. Tuğlalar yatık ve üst üste: 0,02 metrekare, 2.000 pascal.
3. Tuğlaları dikip üst üste koyuyoruz: yüzey alanı 0,01 metrekare.
4. Basınçölçer 4.000 pascal gösteriyor.
5. Yüzey alanı yarıya indi; basınç iki katına çıktı.

Soru (`tag: 'Sıra sende'`; hedeflenen yanılgı): Ela iki tuğlayı yatırıp yan yana koyuyor: yüzey alanı 0,04 m², kuvvet yine 40 N. Basınçölçer ne gösterir? **1.000 Pa** / 4.000 Pa / 2.000 Pa. Dayandığı anlatım: 2–5. İpuçları: "Yüzey büyüdü: aynı kuvvet daha geniş alana yayılıyor, basınç artamaz." · "Yüzey alanı 0,02'den 0,04'e çıktı; basınç aynı kalmaz."

Sonra:
6. Yüzey alanı iki katına çıktı; basınç yarıya indi.
7. Kuvvet sabitken basınç, yüzey alanıyla ters orantılıdır.

Not: tablo sahnesidir; kelime sayısı 25'i aşabilir.

### Sahne 5 · Model: P = F / A

Tahta: solda iki tablodan seçilmiş dört satır tek tabloda (x 60–480, y 110; sütunlar aynı): "20 · 0,02 · 1.000", "60 · 0,02 · 3.000", "40 · 0,01 · 4.000", "40 · 0,04 · 1.000". Sağda (x 540–960) bölme satırları alt alta belirir (y 150, 200): "20 ÷ 0,02 = 1.000", "40 ÷ 0,01 = 4.000"; ilgili tablo satırı sarı zeminle vurgulanır. 4. cümlede bölme satırları 0,3 saydamlığa iner, ortada büyük model belirir (y 330, 52 birim): "P = F / A" (P sarı, F turuncu, A turkuaz). Altında üç küçük açıklama (24 birim): "P: basınç (Pa)", "F: kuvvet (N)", "A: yüzey alanı (m²)". 6. cümlede en altta "1 Pa = 1 N/m²".

Anlatım:
1. İki tablonun satırlarına birlikte bakalım: hepsinde aynı işlem gizli.
2. 20'yi 0,02'ye böl: 1.000 eder.
3. 40'ı 0,01'e böl: 4.000 eder.
4. Her satırda basınç, kuvvetin yüzey alanına bölümüdür.
5. Basıncın matematiksel modeli budur: P eşittir F bölü A.
6. Bir pascal, bir metrekareye düşen bir newtonluk kuvvettir.
7. Yatay zeminde duran cismin uyguladığı kuvvet, kendi ağırlığıdır.

Defter ("Basıncın modeli"): **P = F / A** (Pa = N/m²). Örnek: 40 N, 0,02 m² → 2.000 Pa.

Not: tablo ve formül sahnesidir; kelime sayısı 25'i aşabilir. Açıklamalar gelirken tablo 0,3 saydamlığa iner.

### Sahne 6 · Modelle çıkarım

Tahta: yatay zemin çizgisi (y = 440, x 60–940). Solda dört özdeş küp üst üste (kenar 70; x 150–220, y 160–440). Küplerden birinin içinde "G", tabanda turkuaz çizgi ve "A". Sağda aynı dört küp yan yana (x 520–800, y 370–440), tabanda turkuaz çizgi ve "4A". Her düzeneğin üstünde sonuç satırı (26 birim): solda "P = 4G / A", sağda "P = 4G / 4A = G / A". Küpler soldaki düzenekten sağdakine 5. cümlede 900 ms'de `inOut` ile taşınır (soldaki kopya 0,3 saydamlıkta kalır).

Sorudan önce tahta temizlenir (`c.clearSay()`, öğeler 400 ms'de `in` ile kaybolur): altı küp, üçü yerde üçü üstlerinde (x 150–360; taban "3A"), üstünde "P = 6G / 3A = 2G / A". Yanında (x 600–740) altı küp iki sütun hâlinde (ikisi yerde, üç kat; taban "2A"), üstünde "P = ?".

Anlatım:
1. Model elimizdeyken ölçmeden de çıkarım yapabiliriz.
2. Dört özdeş küp üst üste; her birinin ağırlığı G.
3. Yere binen kuvvet 4G; yere değen yüzey tek küpün yüzü, A.
4. Basınç, 4G bölü A.
5. Küpleri yan yana diziyoruz: kuvvet yine 4G, yüzey 4A.
6. Basınç 4G bölü 4A: yani G bölü A.
7. Kuvvet değişmedi; yüzey dört katına çıktı, basınç dörtte birine indi.
8. Altı küp, üçü yerde: kuvvet 6G, yüzey 3A, basınç 2G bölü A.

Soru (`tag: 'Sıra sende'`): Aynı altı küp iki sütun hâline getiriliyor: yerde iki küp var. Basınç ne olur? **3G / A** / 2G / A / 12G / A. Dayandığı anlatım: 2–8. İpuçları: "Küp sayısı aynı: kuvvet yine 6G. Yere değen yüzey 2A oldu." · "Kuvvet yüzeye bölünür, çarpılmaz."

Sonra:
9. Kuvvet 6G, yüzey 2A: basınç 3G bölü A.

### Sahne 7 · Dene: kuvvet ve yüzey alanı

Tahta: sahne 2'nin düzeneği (levha ve gösterge). Levhanın üstünde tuğlalar seçime göre dizilir: kuvvet 20, 40, 60 N için bir, iki, üç tuğla; yüzey alanı 0,01 için dik tek sütun, 0,02 için yatık tek sütun, 0,04 için yatık iki sütun (60 N ve 0,04 m²'de iki sütuna üç tuğla: solda iki, sağda bir). Sağda büyük gösterge yazısı (x 720, y 240, 44 birim, sarı): "P = 2.000 Pa"; altında iki satır (24 birim): "F = 40 N" (turuncu), "A = 0,02 m²" (turkuaz).

Yönerge (`noWait`): "Kuvveti ve yüzey alanını değiştir; basınca bak."

Dene (iki `c.slider`: "Kuvvet" 20, 40, 60 N; "Yüzey alanı" 0,01, 0,02, 0,04 m²; başlangıç 40 N ve 0,02 m²): basınç örnek veri tablosundaki dokuz değerden biridir. "Devam ›" ile biter.

Sonra:
1. Kuvvet iki katına çıkarsa basınç da iki katına çıkar.
2. Yüzey alanı iki katına çıkarsa basınç yarıya iner.
3. Basınç, kuvvetin yüzey alanına bölümüdür.

### Çıkış soruları

1. 60 N ağırlığındaki bir kutu yere 0,03 m² yüzeyle değiyor. Yere yaptığı basınç kaç pascaldır? **2.000 Pa** / 1,8 Pa / 180 Pa. (sahne 5; 60 ÷ 0,03 = 2.000; 60 · 0,03 = 1,8)
2. (yeni durum) Bir sandık yere P basıncı yapıyor. Üstüne kendi ağırlığında bir sandık daha konuyor; yere değen yüzey değişmiyor. Yeni basınç nedir? **2P** · P · P / 2 (üç şık: "2P", "P", "P / 2"). (sahne 3)
3. (yanılgı) Aynı kuvvet, iki kat büyük bir yüzeye yayılırsa basınç nasıl değişir? **Yarıya iner** / İki katına çıkar / Değişmez. (sahne 4)
4. (yeni durum) Sekiz özdeş küpün dördü yerde, dördü onların üstünde duruyor. Küplerin hepsi yere tek sıra dizilirse basınç nasıl değişir? **2G / A'dan G / A'ya iner** / 2G / A olarak kalır / 2G / A'dan 4G / A'ya çıkar. (sahne 6; 8G ÷ 4A = 2G/A, 8G ÷ 8A = G/A)
5. (yeni durum) Hangi değişiklik basıncı değiştirmez? **Kuvveti de yüzey alanını da iki katına çıkarmak** / Yalnızca kuvveti iki katına çıkarmak / Yalnızca yüzey alanını yarıya indirmek. (sahne 5; 2F ÷ 2A = F ÷ A)

Özet: Kuvvetin birimi newton, yüzey alanının birimi metrekare, basıncın birimi pascaldır. · Basınç kuvvetle doğru, yüzey alanıyla ters orantılıdır. · **Basınç, kuvvetin yüzey alanına bölümüdür: P = F / A.**

## A3 · Konu tekrarı: Basınç (`a3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): beş kural tahtada sırayla toplanır, her biri küçük çizimiyle (dar ve geniş tabanın altında oklar · yatık ve dik tuğla · "P = F / A" · iki küçük tablo satırı "F × 2 → P × 2", "A × 2 → P ÷ 2" · çivi) ve deftere düşer. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner.

Anlatım:
1. Bu konuda öğrendiklerimizi beş kuralda toplayalım.
2. Basınç, yüzeyin her birimine düşen dik kuvvettir.
3. Basınç iki şeye bağlıdır: kuvvete ve yüzey alanına.
4. Modeli: P eşittir F bölü A; birimi pascal.
5. Kuvvet büyürse basınç artar; yüzey alanı büyürse basınç azalır.
6. Cisim, üstündeki kuvveti değdiği yüzeye aynen iletir.

Sorular (`quiz`, karışık sırada):

1. Bir fil ile aynı ağırlıkta ama ayak tabanı daha küçük bir hayvan düşün. Hangisi yere daha büyük basınç yapar? **Ayak tabanı küçük olan** / Fil / İkisi eşit basınç yapar. — A1
2. 100 N büyüklüğünde bir kuvvet 0,5 m² yüzeye dik etki ediyor. Basınç kaç pascaldır? **200 Pa** / 50 Pa / 100,5 Pa. — A2 (100 ÷ 0,5 = 200)
3. Kışın arabaya, yere daha geniş yüzeyle değen kar lastikleri takılıyor. Arabanın yere yaptığı basınç nasıl değişir? **Azalır** / Artar / Değişmez. — A1
4. Üç özdeş küp üst üste duruyor. En üstteki küp alınırsa yere yapılan basınç nasıl değişir? **3G / A'dan 2G / A'ya iner** / Değişmez; yüzey aynı / 3G / A'dan G / A'ya iner. — A2
5. Çekiçle bir çivinin başına vuruluyor. Hangisi doğrudur? **Baştaki ve uçtaki kuvvet eşit, uçtaki basınç büyüktür** / Uçtaki kuvvet baştakinden büyüktür / Baştaki ve uçtaki basınç eşittir. — A1
6. Bir masanın ayaklarının altına daha geniş pullar takılıyor. Masanın yere yaptığı basınç nasıl değişir? **Azalır; ağırlık aynı, yüzey büyüdü** / Artar; yüzey büyüdükçe basınç büyür / Değişmez; basınç yalnızca ağırlığa bağlıdır. — A1
7. Bir cismin yere uyguladığı kuvvet de yere değen yüzeyi de üç katına çıkarılıyor. Basınç nasıl değişir? **Değişmez** / Üç katına çıkar / Dokuz katına çıkar. — A2 (3F ÷ 3A = F ÷ A)
8. Aynı yüzeyde ölçülen basınç 1.000 Pa'dan 3.000 Pa'ya çıktı. Yüzeye etki eden kuvvet nasıl değişti? **Üç katına çıktı** / Üçte birine indi / Değişmedi. — A2

Akılda kalıcı cümle: Basınç kuvvetle büyür, yüzey alanıyla küçülür.

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.3.1) | Karşılığı |
|---|---|
| Basıncın etkili olduğu günlük hayat örnekleri | A1 sahne 1, 5, 6 |
| Örneklerin konfor, kolaylık, işe yararlık açısından değerlendirilmesi | A1 sahne 6 (geri bildirimler) |
| Daha kolay, rahat, işe yarar hâle getirmek için fikir | A1 sahne 6 (topuğa takılan geniş uç), çıkış sorusu 5 |
| Basınçla ilgili sistemlerin işleyişinde basıncın rolü | A1 sahne 5 (çivi), sahne 6 (bıçak, iş makinesi) |
| a) Basınca etki eden etmenleri tanımlar (gösteri deneyi ya da dijital içerik) | A1 sahne 2–4 (kum ve tuğla benzetimi) |
| Köprü kurma: topuklu ayakkabı ve düz ayakkabı | A1 sahne 1 (soru), sahne 6 |
| Basınç, kuvvet ve yüzey alanı verilerinin toplanması | A2 sahne 2–4 |
| b) Verileri kaydeder | A2 sahne 2–4 (tablolar) |
| Verileri yorumlayarak matematiksel modeli oluşturur | A2 sahne 5 |
| c) Modelle basınca ilişkin çıkarım yapar | A2 sahne 6–7 |
| Sınır: değişkenlerin ilişkilerine yönelik yorumlama | A2: orantı yorumları; tek adımlı bölme dışında hesap yok |
| Grup çalışması, tartışma, çalışma yaprağı | `site dışı` |

Fazla olan: yok. Birimler (N, m², Pa) ve "1 Pa = 1 N/m²" kitaptan gelir (s. 139); model birimsiz yazılamaz. Eksik olan: yok. Hesaplanan sorular: A1'de sayı yok; A2 birlikte çöz, sıra sende (iki soru), çıkış 1–5 ve A3'ün 2, 4, 7, 8. soruları hesaplandı.
