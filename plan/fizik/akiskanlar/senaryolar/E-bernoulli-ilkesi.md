# Senaryolar — Konu E · Bernoulli İlkesi

Yazıldı: 12 Ekim 2026. Dayanak: `../MUFREDAT.md` FİZ.9.3.7 (a, b) ve "Öğrenme-öğretme uygulamaları", `../PLAN.md` bölüm 3 (E1, E2), "Kısa ders listesi (kararlardan sonra)", bölüm 5 (bilerek alınmayanlar), bölüm 7 (karar 14, 15, 22, 23, 24) ve bölüm 8 ("E" satırları). Biçim örneği: `A-basinc.md`.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime; hepsi seslendirilir. Simge içeren satırın okunuşu ders yazılırken `speak` ile verilir ("A₁ > A₂ > A₃" → "A bir büyüktür A iki büyüktür A üç", "v₃ > v₂ > v₁" → "v üç büyüktür v iki büyüktür v bir", "P₁" → "P bir", "h₁" → "h bir").
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı ya da "veri verildi" gibi bir sözü hiçbir yerde görmez. Deneyleri Ela yapar.
- Her soru, kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" satırı hangi cümleler olduğunu söyler. Kalın yazılan şık doğru cevaptır; derste yeri sorudan soruya değişir.
- Sıra: hatırla → anlat → örnekle göster (çözülmüş örnek) → birlikte çöz (`tag: 'Birlikte çöz'`) → sor (`tag: 'Sıra sende'`) → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. E1'in başı ve E2'nin başı ayrıca "tahmin et–gözle–açıkla" düzenindedir: `tag: 'Tahmin et'` sorusu, ardından "Gör" (gözlem), ardından açıklayan "Sonra" cümleleri.
- Adlar: nicelik adı "sürat"tir; "hız" nicelik adı olarak yazılmaz. "Hızlı", "hızla", "hızlanır" gibi günlük sıfat ve zarflar başlıklarda ve altyazılarda kalabilir; nicelik anlatılırken "sürat" ve "sürati artar" yazılır. "Bernoulli İlkesi", "Venturi tüpü", "kesit alanı", "akışkan basıncı" kitabın yazımıyladır.
- Sınır (programın sınırı): tamamen kavramsal. Formül, oran, A·v çarpımı, debi, sayı yok. Kesit–sürat ve sürat–basınç ilişkileri yalnızca sıralamayla yazılır (A₁ > A₂ > A₃ ise v₃ > v₂ > v₁ ve P₁ > P₂ > P₃). Bernoulli denklemi, süreklilik denklemi yok.
- Örnek veri: yok. Hiçbir benzetimde sayı gösterilmez. Sürat ok boyuyla, basınç düşey borudaki su yüksekliğiyle (üç düzey) ya da etiket tonuyla gösterilir. Çizimdeki ölçüler dersi yazan ajan içindir; öğrenciye hiçbir ölçü ya da oran söylenmez.
- Renkler: kuvvet turuncu, yüzey alanı (kesit) turkuaz, basınç sarı, sıvı mavi, kaldırma kuvveti mor (yalnızca uçak çiziminde), hava soluk gri-mavi. Sürat oku beyazdır (tahta koyu). Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz; siyah çizgi yok; işe yaramayan yol gridir. Tahta 1000 × 562 birimdir; ölçüler bu birimle verilir; yazı en az 22 birim.
- Hareket sayıyla yazılır: ne, nereden nereye, kaç ms, hangi eğri (`out` beliren, `in` kaybolan, `inOut` yer değiştiren, `linear` sabit sürat).
- Basınç etiketleri (iki biçim, tahta boyunca aynı): düşük basınç = soluk sarı (yarı saydam sarı dolgu, 0,25; sarı yazı "düşük basınç"); yüksek basınç = dolu sarı (sarı dolgu, koyu yazı "yüksek basınç"). Etiket belirirken 400 ms, `out`.
- Akış çizgileri (görünmeyen hava akışı, E1 sahne 5–7 ve E2 bütün sahneler): soluk gri-mavi, kalınlık 2, 400 ms `out` ile belirir; üzerlerinde 5 birimlik nokta çizgi boyunca sabit süratle akar (`linear`, döngü). Hızlı yerde çizgiler sıkışıktır (aralık 10 birim) ve noktalar 300 birim/s ile akar; yavaş yerde çizgiler seyrektir (aralık 30 birim) ve noktalar 100 birim/s ile akar. Sıklık, hızlı yerin işaretidir; ayrıca yazı gerekmez ama ilk kullanıldığı sahnede bir cümleyle söylenir (E2 sahne 1, 1. cümle).
- Cismi iten net kuvvet turuncu okla çizilir (varsayılan 80 birim, kalınlık 6); ok, basıncın düşük olduğu tarafı gösterir ve "kuvvet" yazısı (turuncu) taşır.
- Ela: sade vektör çizim (baş r = 26, gövde 6 kalınlıkta çizgi, yandan görünüş).

Boru düzeneği (E1 sahne 2, 3, 9 ortak, yandan görünüş; Venturi tüpü ayrı çizilir, sahne 4):

- Depo x 50–150, y 60–390, üstü açık; su mavi, su yüzeyi y = 80 (depo büyüktür: yüzey hiç inmez). Vana x 150–170 (y 250–370); kapalıyken boruyu keser, açıkken kenara çekilir (400 ms, `inOut`, 40 birim yukarı).
- Boru ekseni y = 310. Sol bölüm x 170–420, yükseklik 120 (y 250–370). Geçiş x 420–480 (çeperler doğrusal). Sağ bölüm x 480–890; yüksekliği sürgüyle değişir: geniş 120 (y 250–370), orta 80 (y 270–350), dar 40 (y 290–330). Boru ucu açık (x 890); uçtan 3 su damlası sağa 40 birim düşer. Çeper açık gri, kalınlık 3; iç su mavi, 0,35 saydamlık.
- Düşey borular (üstü açık, genişlik 24, çeper açık gri): sol x 268–292, tabanı y = 250; sağ x 678–702, tabanı sağ bölümün üst kenarında (y 250 / 270 / 290). İkisi de y = 60'a kadar uzar.
- Su düzeyleri (mutlak y; boruda su yüksekliği düzeyi gösterir): vana kapalı: iki boruda da y = 80, ayrıca x 170–890 arasında gri kesikli "durgun düzey" çizgisi y = 80. Vana açık: sol boruda y = 100 (hep); sağ boruda geniş y = 100, orta y = 135, dar y = 195. Düzey değişimi 700 ms, `inOut`. Her su yüzeyinde sarı küçük çubuk (24 × 4) ve yanında "P" (sarı).
- Sürat okları (beyaz, kalınlık 5, y = 310): sol bölümde x 195–255 (60 birim); sağ bölümde x 520'den başlar: geniş 60, orta 90, dar 180 birim. Ok boyu değişimi 700 ms, `inOut`. Üstlerinde "sürat" (beyaz, 22) yalnızca ilk belirdiğinde.
- Akan işaretler: beyaz, r = 5, 0,8 saydamlık; sol bölümde 90 birim/s, sağ bölümde geniş 90, orta 135, dar 270 birim/s (`linear`, döngü). Çizimde sayısal orana bağlı iç tutarlılık vardır (kesit küçüldükçe ok ve işaret uzar), ama öğrenciye oran söylenmez.
- Kesit çizgileri: turkuaz kesikli dik çizgi, sol bölümde x = 230 (y 250–370), sağ bölümde x = 600 (boru yüksekliği kadar). Yalnızca sahne 2'de görünür; "kesit" yazısı (turkuaz) sol çizgide.
- Sürgü: x 300–700, y = 480 yatay yol (gri, kalınlık 6); üç işaret x = 300 "geniş", x = 500 "orta", x = 700 "dar" (yazı y = 530, 22 birim); tutamaç turkuaz daire r = 16; konum değişimi 700 ms, `inOut`; sürgü sağ bölümün yüksekliğini aynı anda değiştirir (700 ms, `inOut`).

## E1 · Dar yerde hızlı, hızlı yerde düşük basınç

- **Fikir:** Akışkan, borunun daraldığı yerde süratlenir; süratinin arttığı yerde boru çeperlerine yaptığı basınç azalır. Bu ilişki hava gibi açık akışlarda da görülür ve Bernoulli İlkesi'dir.
- **Giriş ekranı sorusu:** Bahçe hortumunun ucunu parmağınla sıkınca su neden daha uzağa fışkırır?
- **Kaynak:** Ders kitabı s. 185–186 (bahçe hortumu, tahmin et; sürgülü hortum benzetimi; saç kurutma makinesi ve masa tenisi topu gösterisi), s. 188 (asılı iki kâğıdın arasına üfleme: "kâğıtların birbirine yaklaştığı gözlenir"; "akışkanın süratinin arttığı bölgelerde basınç azalır"), s. 189 (Bernoulli İlkesi cümlesi; Daniel Bernoulli), s. 190 (Venturi tüpü, Görsel 3.30: A₁ > A₂ > A₃, v₃ > v₂ > v₁, P₁ > P₂ > P₃, h₁ > h₂ > h₃; "açık uçlu borulardaki su seviyesi akışkanın basıncıyla doğru orantılıdır"), s. 192 (Ezgi'nin kâğıda üflemesi ve çözümü), s. 193 (12. alıştırma: kesit alanlarının sıralaması ile sürat ve basınç sıralamaları), s. 194 (akışkan basıncı tanımı; Bernoulli İlkesi). Kitap bu bölümde sayı ve birim vermez. Hortum, saç kurutma makinesi ve asılı kâğıtlar için kitapta açıklama yoktur (öğrenciden istenir): sahne 1'deki "sürat arttı" çıkarımı s. 186 ç sorusunun ipucuna ("Su, A/2 kesitinden daha hızlı akmaktadır"), saç kurutma makinesi açıklaması `PLAN.md` karar 15'e (kitap dışı), asılı kâğıtların açıklaması s. 190'daki araçlar açıklamasına dayanır. Benzetim düzeneği kitabın Görsel 3.30'undan kurulmuştur (karar 19, kitap dışı).
- **Sınır:** Formül, oran, A·v, debi, sayı yok. "Kesit alanı"nın tanımı kitapta yazılı değildir; Görsel 3.30'daki kesikli elips gibi çizimle gösterilir. Bernoulli denklemi yok. Gazlarda ve sıvılarda sıkışma yok.
- **Güç kavramlar ve gösterimi:** (1) Basıncın düşmesi: düşey borulardaki su yüksekliği; su alçalırsa basınç azalmıştır; "durgun düzey" kesikli çizgisi başlangıcı gösterir. (2) Sürat–kesit ilişkisi: ok boyu ve akan işaretler; kesit alanı turkuaz çizgiyle gösterilir. (3) Görünmeyen hava akışı: akış çizgileri; çizgilerin sıklaşması, süratin arttığı yerdir.
- **Hedeflenen yanılgı:** "Dar yerde akışkan sıkışır, bu yüzden basıncı artar" ve "hızlı akan akışkan daha çok bastırır".
- **Akılda kalıcı cümle:** Akışkan hızlandığı yerde daha az bastırır.

### Hatırla (`tag: 'Hatırla'`, başlık "Hatırla")

Tahta: iki soru kartı, çizim yok.

1. (D3, bir önceki konu) Sıvıdaki bir cismin alt yüzeyindeki basınç, üst yüzeyindekinden büyüktür. Bu fark cisme ne yapar? **Cismi yukarı iten kaldırma kuvveti doğurur** / Cismi aşağı bastırır / Hiçbir etkisi olmaz.
2. (C3) Hava basıncı iki bölgede farklıysa hava nasıl hareket eder? **Yüksek basınçlı bölgeden alçak basınçlı bölgeye** / Alçak basınçlı bölgeden yüksek basınçlı bölgeye / Yerinde durur.

Geri bildirim: "İki yüzey ya da iki bölge arasındaki basınç farkı, hareketi ve kuvveti doğurur." (bu dersin dayanağı)

### Sahne 1 · Hortumun ucunu sıkınca (tahmin et–gözle)

Tahta: zemin çizgisi y = 480 (x 60–940, gri). Solda Ela (x 110–190, y 280–480) hortumu tutar; hortum Ela'nın elinden (190, 400) çıkıp (330, 330)'a yükselir, sonra x 330–380 arası yatay uzanır; ağız (çıkış deliği) x = 380, y = 330, başta yüksekliği 24. Su fışkırması mavi (kalınlık 12): (380, 330)'dan başlayan parabol y = 330 + 0,002218·(x − 380)², zeminde x = 640'ta biter; su çizgi boyunca 800 ms `linear` akar. Zeminde x = 640'ta gri küçük dikey çentik (20 birim). Ağızda beyaz sürat oku, x 390–450 (60 birim), üstünde "sürat" (beyaz).

Anlatım:
1. Ela bahçeyi hortumla suluyor; su yakına düşüyor.
2. Hortumun ucunu sıkıyor: çıkış deliği küçülüyor.

Tahmin (`tag: 'Tahmin et'`; sezgiyle): Ucu sıkınca çıkan suyun sürati nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: 1–2 (günlük deneyim). İpuçları: "Su yakına mı düşecek, uzağa mı?" · "Uzağa giden suyun sürati nasıldır?"

Gör: ağız 500 ms'de `inOut` ile 24'ten 10 yüksekliğe daralır; fışkırma parabolü y = 330 + 0,0006·(x − 380)² olur ve zeminde x = 880'de biter (800 ms, `inOut`); su kalınlığı 12'den 6'ya iner; ikinci gri çentik x = 880'de belirir (400 ms, `out`); sürat oku x 390–510'a uzar (120 birim; 700 ms, `inOut`).

Sonra:
3. Su çok daha uzağa gidiyor: çıkış sürati arttı.
4. Akışkan daha dar bir yerden geçerken sürati artıyor.
5. Bunu şeffaf bir boruyla yakından inceleyelim.

### Sahne 2 · Kesit alanı küçülünce sürat artar

Tahta: boru düzeneği (okuma kılavuzu), düşey borular ve vana dışında (tahtada yalnızca depo, boru, ok, işaretler, kesit çizgileri, sürgü); vana açık; sürgü "geniş" konumunda başlar. Sürgü "geniş"teyken iki bölge aynı yükseklikte olduğundan işaretler her yerde 90 birim/s ile akar. Turkuaz kesit çizgileri 3. cümlede 400 ms `out` ile belirir.

Anlatım:
1. Ela şeffaf bir boru kuruyor; suyun içinde küçük işaretler akıyor.
2. Borunun akışa dik kesitinin alanına kesit alanı denir.
3. Sol bölümde sürat küçük; sürat okunu kısa çiziyoruz.
4. Ela sürgüyü çevirip sağ bölümün kesit alanını küçültüyor.
5. Sağ bölümde işaretlerin sürati artıyor; sürat oku uzuyor.
6. Kesit alanı daraldıkça akışkanın sürati artar.

Çözülmüş örnek (4–6): sürgü "orta"ya 700 ms'de `inOut` ile gelir; sağ bölüm 120'den 80 yüksekliğe iner, sağ ok 60'tan 90'a uzar, sağ işaretler 90'dan 135 birim/s'ye çıkar; sağdaki turkuaz kesit çizgisi 80'e kısalır. 6. cümlede tahtada "kesit alanı daraldı → sürat arttı" ("kesit alanı" turkuaz).

Birlikte çöz (`tag: 'Birlikte çöz'`): Sürgüyü dar konuma getireceğiz. Sağ bölümde sürat oku, orta konumdakine göre nasıl olur? **Daha uzun** / Aynı boyda / Daha kısa. Dayandığı anlatım: 4–6. İpuçları: "Dar konumda kesit alanı orta konumdakinden de küçük." · "Kesit alanı küçüldükçe sürat artıyor."

Gör: sürgü "dar"a gelir (700 ms, `inOut`); sağ bölüm 80'den 40'a iner, ok 90'dan 180'e uzar, işaretler 135'ten 270 birim/s'ye çıkar.

Sonra:
7. Kesit alanı ne kadar küçülürse, sürat o kadar artıyor.

Soru (`tag: 'Sıra sende'`; yeni durum): Bir dere geniş yatağından dar bir boğaza giriyor. Boğazda suyun sürati nasıl olur? **Geniş yataktakinden büyüktür** / Geniş yataktakiyle aynıdır / Geniş yataktakinden küçüktür. Dayandığı anlatım: 6–7; sahne 1, 3–4. İpuçları: "Boğazda kesit alanı küçüldü." · "Kesit alanı daraldıkça sürat artar."

### Sahne 3 · Sürat artınca basınç azalır

Tahta: boru düzeneğinin tamamı (düşey borular dahil); sürgü "geniş"te, vana kapalı, iki düşey boruda su y = 80, "durgun düzey" çizgisi görünür; sürat okları ve akan işaretler yok (vana kapalı). Anlatım ilerledikçe: 2. cümlede düşey borular 500 ms'de `out` ile yukarıdan belirir; 6. cümlede vana açılır, ok ve işaretler belirir, iki düşey boruda su y = 80'den y = 100'e iner (700 ms, `inOut`). Sarı "P" çubukları su yüzeyleriyle iner. Tahtada yazı: yalnızca "sürat" ve iki "P".

Anlatım:
1. Hareket hâlindeki akışkanın yaptığı basınca akışkan basıncı denir.
2. Borunun üstüne iki düşey boru ekliyoruz: biri solda, biri sağda.
3. Düşey borudaki su yüksekliği, o yerdeki basıncı gösterir.
4. Su yüksekse basınç büyük, su alçaksa basınç küçüktür.
5. Vana kapalıyken akış yok: iki borudaki su da en üstte.
6. Vanayı açıyoruz: su akıyor, düşey borulardaki seviye iniyor.
7. Akan akışkanın basıncı, durgun hâldekinden küçüktür.
8. Sürgüyü orta konuma getiriyoruz: sağ düşey borunun suyu alçalıyor.
9. Sağ bölümde sürat arttı, basınç azaldı.

Çözülmüş örnek (8–9): sürgü "orta"ya gelir (700 ms, `inOut`); sağ bölüm 120'den 80'e iner, sağ ok 60'tan 90'a uzar, sağ düşey boruda su y = 100'den y = 135'e iner (700 ms, `inOut`). Sağ P çubuğu suyla iner. 9. cümlede sağ düşey borunun yanında "sürat arttı → basınç azaldı" ("basınç" sarı).

Birlikte çöz (`tag: 'Birlikte çöz'`): Sürgüyü dar konuma getireceğiz. Sağ düşey borudaki su, orta konumdakine göre nasıl olur? **Daha alçak** / Aynı yükseklikte / Daha yüksek. Dayandığı anlatım: 3–4, 8–9; sahne 2, 6–7. İpuçları: "Dar konumda sürat orta konumdakinden de büyük." · "Sürat arttıkça basınç azalır; su yüksekliği basıncı gösterir."

Gör: sürgü "dar"a gelir (700 ms, `inOut`); sağ bölüm 80'den 40'a iner, ok 90'dan 180'e uzar, sağ boruda su y = 135'ten y = 195'e iner.

Sonra:
10. Kesit alanı daraldıkça sürat arttı, basınç azaldı.
11. Sürati artan akışkan, boru çeperlerine daha az basınç yapıyor.

Soru (`tag: 'Sıra sende'`): Sürgü dar konumdayken hangi bölümde basınç daha büyüktür? **Sol bölümde; düşey borudaki su orada daha yüksek** / Sağ bölümde; akışkan orada sıkışmıştır / İki bölümde de aynıdır. Dayandığı anlatım: 3–4, 9–10. İpuçları: "Düşey borulardaki su yüksekliklerini karşılaştır." · "Daha yüksek su, daha büyük basınçtır."

Tahtada son satır (y = 540): "sürat arttı → basınç azaldı" ("sürat" beyaz, "basınç" sarı).

### Sahne 4 · Venturi tüpü

Tahta: depo ve vana (okuma kılavuzu) solda; Venturi tüpü sabit kesitli üç bölüm: B1 x 170–330, yükseklik 120 (y 250–370); B2 x 390–610, yükseklik 80 (y 270–350); B3 x 670–890, yükseklik 40 (y 290–330); geçişler x 330–390 ve 610–670 (doğrusal). Düşey borular: x = 240, 500, 780 merkezli (genişlik 24), tabanları kendi bölümünün üst kenarında (y 250, 270, 290), y = 60'a uzar. Vana açık; su düzeyleri y = 100, 135, 195; "durgun düzey" çizgisi y = 80 kesikli gri. Sürat okları (beyaz, y = 310): x 210–270 (60), x 455–545 (90), x 690–870 (180). Altlarında satırlar: A (turkuaz, y = 410), v (beyaz, y = 450), P (sarı, y = 490), h (sarı küçük, y = 530; düşey boruların yanında su yüzeyinden bölüm üst kenarına inen sarı kesikli ölçü çizgisi). Satırlar anlatımla sırayla belirir (400 ms, `out`); bir önceki satır 0,45 saydamlığa iner (tahtada aynı anda en çok iki satır tam görünür). Her sütunda üç etiket: "A₁ A₂ A₃", "v₁ v₂ v₃", "P₁ P₂ P₃", "h₁ h₂ h₃".

Anlatım:
1. Kesit alanı iki kez daralan, düşey borulu düzeneğe Venturi tüpü denir.
2. Kesit alanlarının sıralaması: A₁ > A₂ > A₃.
3. Kesit alanı daraldıkça sürat artar: v₃ > v₂ > v₁.
4. Sürati artan yerde basınç azalır: P₁ > P₂ > P₃.
5. Düşey borulardaki su yükseklikleri de aynı sırada: h₁ > h₂ > h₃.

Soru (`tag: 'Sıra sende'`; yeni durum): Kesit alanları A₂ > A₁ > A₃ olan bir Venturi tüpünden su akıyor. Hangi kesitte basınç en küçüktür? **3. kesitte** / 1. kesitte / 2. kesitte. Dayandığı anlatım: 2–5; sahne 3, 10–11. İpuçları: "Önce kesit alanlarını sırala: en küçüğü hangisi?" · "En küçük kesit alanında sürat en büyük, basınç en küçüktür."

Gör: tüp yeniden çizilir (B1 yükseklik 80, B2 yükseklik 120, B3 yükseklik 40; 700 ms, `inOut`); düşey borularda su: B2'de y = 100, B1'de y = 135, B3'te y = 195; 3. kesitteki P etiketi çevrelenir.

Sonra:
6. Kesit alanı en küçük yerde sürat en büyük, basınç en küçüktür.

### Sahne 5 · Kâğıda üfleme

Tahta (yandan görünüş): Ela'nın başı solda (daire r = 45, merkez (160, 230)); ağzı (205, 240). Ela, A4 kâğıdının üst kenarını ağzının önünde tutar; kâğıt (kalın beyaz çizgi, 5) (230, 260)'tan (430, 330)'a aşağı doğru sarkar. Başta akış çizgisi yok.

Anlatım:
1. Hava da bir akışkandır; sürat–basınç ilişkisi havada da geçerlidir.
2. Ela bir A4 kâğıdının üst kenarını dudağına tutuyor; kâğıt aşağı sarkıyor.

Tahmin (`tag: 'Tahmin et'`): Ela kâğıdın üst yüzeyinden üflerse kâğıdın sarkan ucu ne yapar? **Yukarı kalkar** / Aşağı sarkmaya devam eder / Daha çok aşağı iner. Dayandığı anlatım: 1; sahne 3, 10–11 ve Hatırla. İpuçları: "Üflenen havanın sürati artar; üstte basınç ne olur?" · "Kâğıdın iki yüzündeki basıncı karşılaştır."

Gör: Ela'nın ağzından kâğıdın üst yüzeyi boyunca 4 akış çizgisi belirir (çizgi çizgiden 10 birim aralıkla, y = 235, 225, 215, 205; x 215–520, sıkışık, noktalar 300 birim/s); kâğıdın altında 3 seyrek çizgi (y = 350, 380, 410; x 230–470; noktalar 100 birim/s). Kâğıdın serbest ucu (430, 330)'dan (430, 262)'ye 800 ms'de `inOut` yükselir.

Sonra (etiketler 400 ms `out`; üstte soluk sarı "düşük basınç" (x 420, y 170), altta dolu sarı "yüksek basınç" (x 420, y 440); kâğıdın serbest ucuna turuncu kuvvet oku (aşağıdan yukarı, 80 birim; x = 430, y 320 → 240)):
3. Üstteki havanın sürati arttı; üst yüzeyde basınç azaldı.
4. Alttaki hava daha yavaş: orada basınç yüksek kalıyor.
5. Yüksek basınç kâğıdı, düşük basınçlı yüze doğru yukarı itiyor.

Soru (`tag: 'Sıra sende'`): Kâğıdı yukarı kaldıran fark hangisidir? **Alt yüzeydeki basınç, üst yüzeydekinden büyüktür** / Üst yüzeydeki basınç, alt yüzeydekinden büyüktür / İki yüzeydeki basınç eşittir. Dayandığı anlatım: 3–5. İpuçları: "Hangi yüzeyde hava daha yavaş akıyor?" · "Kuvvet, düşük basınçlı yüze doğrudur."

### Sahne 6 · Asılı iki kâğıt

Tahta (önden görünüş): yatay çubuk x 300–700, y = 110 (gri, kalınlık 8). İki kâğıt çubuktan iplerle sarkar: sol kâğıt x = 420, sağ kâğıt x = 580 (kalın beyaz çizgi, genişlik 6, y 110–330; üst uçları sabit). Aralarındaki boşluk 160 birim. Aşağıda Ela'nın başı (daire r = 40, merkez (500, 480)); ağzı (500, 440). Başta akış çizgisi yok.

Anlatım:
1. Ela iki kâğıdı yan yana, aralarında küçük bir boşlukla asıyor.

Tahmin (`tag: 'Tahmin et'`): Ela iki kâğıdın arasına üflerse kâğıtlar ne yapar? **Birbirine yaklaşır** / Birbirinden uzaklaşır / Yerinde kalır. Dayandığı anlatım: 1; sahne 5, 3–5; Hatırla 2. İpuçları: "Kâğıtların arasında hava hızlı akacak; orada basınç ne olur?" · "Kâğıtların dış yüzlerindeki basınçla karşılaştır."

Gör: kâğıtların arasından yukarı 9 sıkışık akış çizgisi (x = 460, 470, … 540; y 430–120; aralık 10 birim; noktalar 300 birim/s) belirir; kâğıtların dış yanlarında seyrek noktalar (x = 330 ve 670; 100 birim/s). Kâğıtların alt uçları birbirine doğru 50'şer birim gelir: sol (420, 330) → (470, 326), sağ (580, 330) → (530, 326); 900 ms, `inOut`.

Sonra (etiketler: arada soluk sarı "düşük basınç" (x 500, y 250); iki dışta dolu sarı "yüksek basınç" (x 330, y 250) ve (x 670, y 250); her kâğıda dıştan içe turuncu kuvvet oku, 60 birim):
2. Kâğıtların arasındaki havanın sürati arttı; orada basınç azaldı.
3. Kâğıtların dış yüzlerindeki hava daha yavaş; orada basınç yüksek.
4. Dış yüzlerdeki yüksek basınç kâğıtları birbirine doğru itiyor.

### Sahne 7 · Saç kurutma makinesi ve top

Tahta (yandan görünüş): zemin y = 520. Saç kurutma makinesi ağzı yukarı bakar: gövde x 460–540, y 430–520; ağız (500, 430), ağız genişliği 60 (x 470–530). Hava sütunu x 470–530 arasında yukarı y = 150'ye çıkar. Top (masa tenisi topu, beyaz daire r = 30), merkez (500, 250). Başta akış çizgisi yok.

Anlatım:
1. Ela, yukarı bakan saç kurutma makinesinin hava akımına masa tenisi topu bırakıyor.

Tahmin (`tag: 'Tahmin et'`): Ela topu hava akımından hafifçe yana iterse top ne yapar? **Akımın içine geri döner** / Akımdan uzaklaşıp düşer / Yana doğru kayıp gider. Dayandığı anlatım: 1; sahne 3, 5–6. İpuçları: "Akımın içinde ve çevresinde hava aynı süratte mi?" · "Basıncı düşük olan tarafa doğru kuvvet etkir."

Gör: akımın içinde 6 sıkışık akış çizgisi (x = 475, 485, … 525; y 430–150; aralık 10 birim; noktalar 300 birim/s); çevrede iki yanda seyrek noktalar (x = 400 ve x = 600; 100 birim/s). Top x = 500'den x = 520'ye 400 ms'de `out` ile kayar, topun sağında turuncu kuvvet oku belirir (sağdan sola, 60 birim: (590, 250) → (530, 250)), sonra top 600 ms'de `inOut` ile x = 500'e döner ve ok kaybolur (300 ms, `in`).

Sonra (etiketler: akımın içinde soluk sarı "düşük basınç" (x 500, y 120); çevrede dolu sarı "yüksek basınç" (x 680, y 300)):
2. Akımın içinde hava hızlı akıyor: orada basınç düşük.
3. Akımın çevresinde hava daha yavaş: orada basınç yüksek.
4. Top kenara kayınca, çevredeki yüksek basınç onu akıma geri itiyor.

Not: açıklama kitap dışıdır (`PLAN.md` karar 15). Yalnızca topun akımın içinde kalmasını açıklar; topun yukarı taşınması anlatılmaz.

### Sahne 8 · Bernoulli İlkesi

Tahta: dört kutucuk (her biri 200 × 190; x 60, 290, 520, 750; y 90–280): "dar boru" (borunun dar yeri, beyaz uzun ok), "kâğıt" (kâğıt çizgisi ve üstünde beyaz ok), "iki kâğıt" (iki çizgi ve aralarında beyaz ok), "top" (daire ve içinden geçen beyaz ok). Her kutucukta, sürat okunun yanında soluk sarı küçük "düşük" etiketi. Kutucuklar anlatımla soldan sağa 400 ms `out` ile belirir. Altta y = 400'de büyük yazı: "sürat arttı → basınç azaldı" (22+ birim; "sürat" beyaz, "basınç" sarı).

Anlatım:
1. Boruda, kâğıtta ve hava akımında aynı ilişkiyi gördük.
2. Sürat arttığı her yerde basınç azalıyor.
3. Bu ilişkiyi ilk kez Daniel Bernoulli ortaya koymuştur.
4. Akışkanın sürati arttığında basıncı azalır; buna Bernoulli İlkesi denir.

Soru (`tag: 'Sıra sende'`): Bir akışkanın sürati azalırsa basıncı nasıl değişir? **Artar** / Azalır / Değişmez. Dayandığı anlatım: 2, 4; sahne 3, 9–10 (geniş bölümde sürat küçük, basınç büyüktü). İpuçları: "Sürat artınca basınç azalıyordu; tersine ne olur?" · "Venturi tüpünün geniş kesitine bak."

Defter ("Bernoulli İlkesi"): **Sürat artarsa basınç azalır.** Örnek: borunun dar yeri.

### Sahne 9 · Sürgüyü sen çevir (`tag: 'Dene'`, kaydırıcı ve sıralama)

Tahta: boru düzeneğinin tamamı (sahne 3'ün sonundaki görünüm: vana açık, düşey borular, oklar, işaretler); sürgü öğrenciye açık: üç konuma sürüklenir ya da dokunulur. Her konumda sağ bölüm, ok, işaretler ve sağ düşey borudaki su sahne 3'teki sayılarla değişir. Üç konum da en az bir kez denenince "Sırala" düğmesi (22 birim, sarı kenarlıklı) belirir.

Anlatım:
1. Sürgüyü üç konuma getir; sürat okuna ve düşey boruya bak.

Sıralama (`tag: 'Dene'`; kartlar "geniş", "orta", "dar"; öğrenci sürükleyerek sıralar):

| Görev | Doğru sıra | Geri bildirimi |
|---|---|---|
| Sağ bölümdeki sürati büyükten küçüğe sırala | dar, orta, geniş | Evet. Kesit alanı küçüldükçe sürat artar. |
| Sağ düşey borudaki su yüksekliğini büyükten küçüğe sırala | geniş, orta, dar | Evet. Sürat arttıkça basınç azalır; su alçalır. |

Yanlışta ipucu: "İlk sırada sürati ya da basıncı en büyük olan konum olacak; ok boyuna ve su yüksekliğine bak."

### Sahne 10 · Basınç düşük mü, yüksek mi? (`tag: 'Dene'`, sınıflandırma)

Tahta: üstte iki kutu başlığı (x 80–480 "Basınç düşük", x 520–920 "Basınç yüksek"; y 60–110). Ortada (y 150–330) sıradaki kartın çizimi (300 × 180 çerçeve içinde; çizim sahne 4–7'deki ilgili kesit ya da akış çizgileri). Yerine oturan kartın adı kutusunun altına yazılır (22 birim, alt alta; kart 500 ms'de `inOut` ile kutusuna küçülerek gider). Soru kalıbı: "<kart> bölgesinde basınç düşük mü, yüksek mi?" Yanlışta ipucu: "Önce o bölgede sürat büyük mü, küçük mü, ona bak."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Venturi tüpünün en dar kesiti | düşük | Evet. En dar kesitte sürat en büyük, basınç en küçük. |
| Venturi tüpünün en geniş kesiti | yüksek | Evet. Burada sürat küçük, basınç büyük. |
| Kâğıdın üstündeki hızlı hava | düşük | Evet. Sürat arttı, basınç azaldı. |
| Kâğıdın altındaki yavaş hava | yüksek | Evet. Hava yavaş, basınç yüksek kaldı. |
| İki kâğıdın arasındaki hava | düşük | Evet. Aradaki havanın sürati büyük. |
| Saç kurutma makinesinin hava akımının çevresi | yüksek | Evet. Çevredeki hava yavaş; basınç yüksek. |

Sonra:
1. Süratin büyük olduğu her yerde basınç düşüktür.
2. Akışkan hızlandığı yerde daha az bastırır.

### Çıkış soruları

1. (hedeflenen yanılgı) Yatay bir borunun bir bölümü daralıyor. Orada akışkanın basıncı, geniş bölümdekine göre nasıl olur? **Daha küçük; sürati arttığı için** / Daha büyük; akışkan sıkıştığı için / Aynı; akışkan değişmediği için. (sahne 3)
2. (yeni durum) Ela çeşme ağzına ince uçlu bir başlık takıyor. Çıkan suyun sürati nasıl değişir? **Artar** / Azalır / Değişmez. (sahne 1–2)
3. (yeni durum) Kesit alanları A₃ > A₁ > A₂ olan bir Venturi tüpünde, hangi kesitin düşey borusunda su en alçaktır? **2. kesitin** / 1. kesitin / 3. kesitin. (sahne 4; en küçük kesit alanı A₂ → en büyük sürat → en küçük basınç → en alçak su)
4. (yeni durum) Ela, saç kurutma makinesinin hava akımındaki topu kenara itiyor; top akıma geri dönüyor. Neden? **Akımın çevresinde basınç yüksek, içinde düşüktür** / Akımın içinde basınç yüksek, çevresinde düşüktür / Akımın içinde ve çevresinde basınç aynıdır. (sahne 7)
5. (yeni durum) Ela, ipten asılı yan yana iki balonun arasına üflüyor. Balonlar ne yapar? **Birbirine yaklaşır; aradaki basınç düşer** / Birbirinden uzaklaşır; aradaki basınç düşer / Birbirinden uzaklaşır; aradaki basınç artar. (sahne 6)

Özet: Kesit alanı daraldıkça akışkanın sürati artar. · Sürati artan yerde basınç azalır: Bernoulli İlkesi. · **Akışkan hızlandığı yerde daha az bastırır.**

## E2 · Bernoulli her yerde

- **Fikir:** Çatının uçmasından spreye, yelkenliden yarış arabasına birçok olay aynı sürat–basınç ilişkisiyle açıklanır; cisim hep düşük basınçlı tarafa itilir, örnekler amaca göre gruplanınca ilke genellenir.
- **Giriş ekranı sorusu:** Fırtınada bir çatı aşağı bastırılmak yerine neden yukarı doğru kalkıp uçar?
- **Kaynak:** Ders kitabı s. 187 (beş örnek için boşluk doldurma cümleleri: çatı, sprey, yan yana araçlar, yelken, yarış arabasının arka kanadı; havaya kaldırma / havalanmasını engelleme / yön değiştirme sütunlu tablo), s. 189 (çatı, Görsel 3.28; şemsiye, Görsel 3.29: bombeli üst yüzeyde hava hızlanır, basınç düşer, şemsiye ters döner), s. 190–191 (yan yana araçlar, Görsel 3.31: P₀ > P₁), s. 191 (uçak cümlesi: "Bernoulli İlkesi'nin yanı sıra ağırlık, kaldırma kuvveti, sürükleme ve itme kuvvetleri etkilidir"), s. 192 (parfüm şişesi: sprey), s. 195 (arka kanat: "Bastırma" oku, bombeli yüzey altta). Kitap hangi örneğin hangi sütuna girdiğini işaretlemez; ders sınıflaması `PLAN.md` karar 15'tendir: çatı ve şemsiye "havaya kaldırma", arka kanat "havalanmasını engelleme", yelken ve yan yana araçlar "yön değiştirme", sprey "sıvıyı yükseltme" (programın "vb." payı). Yelken yalnızca s. 187'deki cümle kadar anlatılır; "rüzgâra karşı gitme"nin ayrıntısı kitapta da yoktur.
- **Sınır:** Kavramsal; sayı, formül, oran yok. Uçak tek cümle: Bernoulli İlkesi'nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri etkilidir; "üstten geçen hava daha uzun yol kat eder" gerekçesi, kanat eğimi ve havanın aşağı saptırılması yazılmaz. Kan akışı ve tansiyon, rüzgâr tüneli, KAAN, su tesisatı ve koşucu alınmaz (program anmıyor).
- **Güç kavramlar ve gösterimi:** (1) Görünmeyen hava akışı: akış çizgileri; hızlı yerde çizgiler sıklaşır (okuma kılavuzu). (2) Basınç farkından doğan net kuvvet: turuncu ok, düşük basınç etiketinin olduğu tarafı gösterir. (3) Ortak olan ve olmayan: altı küçük panelde aynı ilke, farklı yönde oklar (sahne 8).
- **Hedeflenen yanılgı:** "Rüzgâr çatıyı üstten bastırır, o yüzden çatı sağlam kalır" ve "hava hızlı akan yerden cismi iter".
- **Akılda kalıcı cümle:** Hava nerede hızlıysa cisim oraya çekilir.

### Hatırla (`tag: 'Hatırla'`, başlık "Hatırla")

Tahta: iki soru kartı, çizim yok.

1. (E1, bir önceki ders) Bir akışkanın sürati artarsa basıncı nasıl değişir? **Azalır** / Artar / Değişmez.
2. (D3) Bir cismin iki yüzü arasında basınç farkı varsa net kuvvet hangi yöne etkir? **Basıncı büyük yüzden küçük yüze doğru** / Basıncı küçük yüzden büyük yüze doğru / Net kuvvet etkimez.

Geri bildirim: "Akışkan hızlanınca basınç düşer; cisim, basıncı büyük yüzden küçük yüze doğru itilir." (bu dersin dayanağı)

### Sahne 1 · Fırtınada çatı

Tahta (yandan görünüş): zemin y = 500 (x 60–940, gri). Ev: duvarlar x 330–670, y 330–500 (açık gri çerçeve). Çatı: (310, 330) – (500, 220) – (690, 330) üçgeni, açık gri-bej, kalınlık 6. Rüzgâr soldan sağa eser. Akış çizgileri (okuma kılavuzu): çatının hemen üstünde 4 sıkışık çizgi, çatı çizgisini 10, 20, 30 ve 40 birim yukarıdan izler (300 birim/s); daha yukarıda 2 seyrek çizgi y = 60 ve y = 90 (x 60–940; 100 birim/s); evin iki yanında 3'er seyrek çizgi y = 380, 410, 440 (x 60–330 ve x 670–940; 100 birim/s). Etiketler: soluk sarı "düşük basınç" (merkez (500, 130)); dolu sarı "yüksek basınç" (merkez (500, 430), evin içinde). Turuncu kuvvet oku çatının sol yamacında yukarı doğru: (420, 262) → (420, 182); "kuvvet" (turuncu) (455, 210). Çizgiler 1. cümlede belirir; etiketler ve ok 3–6. cümlelerde. Çatı 900 ms'de `inOut` ile 36 birim yukarı kalkar (7. cümle).

Anlatım:
1. Havanın akışını çizgilerle gösteriyoruz; sürat artınca çizgiler sıklaşır.
2. Fırtınada çatının üstünden geçen havanın sürati artar.
3. Çatının üstünde basınç azalır.
4. Kapı ve pencereler kapalıyken evin içindeki hava nispeten durgun kalır.
5. İçerideki basınç, çatının üstündeki basınçtan büyüktür.
6. Basınç farkı çatıyı yukarı iten bir kuvvet doğurur.
7. Kuvvet yeterince büyükse çatı yerinden kopup uçar.

Çözülmüş örnek: soru yok; 2–7. cümleler adım adım zinciri gösterir (sürat → basınç → fark → kuvvet).

### Sahne 2 · Şemsiye

Tahta (yandan görünüş): şemsiye gövdesi (yay) (360, 300) – tepe (500, 210) – (640, 300), açık gri, kalınlık 6; sap (500, 300) → (500, 470). Rüzgâr soldan sağa: şemsiyenin üstünde 4 sıkışık çizgi (yayı 10, 20, 30, 40 birim yukarıdan izler; 300 birim/s), y = 60 ve 90'da 2 seyrek çizgi, altında 3 seyrek çizgi y = 350, 400, 450 (x 60–940; 100 birim/s). Etiketler: soluk sarı "düşük basınç" (merkez (730, 170)); dolu sarı "yüksek basınç" (merkez (730, 400)). Turuncu kuvvet oku: (440, 236) → (440, 156), "kuvvet" (410, 140).

Anlatım:
1. Açık şemsiyenin üst yüzeyi bombedir; rüzgâr onun üstünden geçer.
2. Üstteki havanın sürati artar; alttaki hava daha yavaş akar.

Birlikte çöz (`tag: 'Birlikte çöz'`): Şemsiyenin üst yüzeyindeki basınç, alt yüzeydekine göre nasıl olur? **Daha küçük** / Daha büyük / Aynı. Dayandığı anlatım: 1–2; sahne 1, 3–5; E1 sahne 8. İpuçları: "Hızlı akan havada basınç azalır." · "Üstte sürat büyük."

Gör: çizgiler belirir; üstte düşük basınç, altta yüksek basınç etiketi; ok belirir; şemsiye 500 ms'de `inOut` ile 20 birim yukarı kalkar.

Sonra:
3. Alt yüzeydeki basınç büyük: şemsiyeyi yukarı iten kuvvet doğar.
4. Rüzgârın sürati sınırı aşarsa şemsiye ters dönüyor.

Gör (4. cümle): şemsiye yayı 900 ms'de `inOut` ile tersine döner: uçlar (360, 300) ve (640, 300)'dan y = 250'ye çıkar, tepe (500, 210)'dan (500, 330)'a iner (yay aşağı bombeli olur).

### Sahne 3 · Yan yana araçlar

Tahta (üstten görünüş; araçlar sağa gider): kamyon: kasa x 240–500, y 130–230 (açık gri); kabin x 500–580, y 130–230 (daha koyu gri). Otomobil: gövde x 330–530, y 330–400 (beyaz kenarlı, içi gri-mavi). İkisinin arası 100 birim (y 230–330). Araçlara göre hava sola akar: araçların arasında 9 sıkışık çizgi y = 240, 250, … 320 (x 60–940; noktalar sola 300 birim/s); dışta üstte seyrek çizgiler y = 70 ve 100, altta y = 430, 460, 490 (noktalar sola 100 birim/s). Etiketler: araların sağında soluk sarı "düşük basınç" (merkez (760, 280)) ve yanında "P₁"; üstte ve altta dolu sarı "yüksek basınç" (merkezler (760, 70) ve (760, 450)) ve yanlarında "P₀". Turuncu kuvvet okları araçların arasına doğru: kamyon için (370, 232) → (370, 292), otomobil için (430, 328) → (430, 268); her biri 60 birim, "kuvvet" yazısı yalnızca bir okta.

Anlatım:
1. Yüksek süratle giden iki araç yan yana geliyor.
2. Araçların arasından geçen havanın sürati artıyor; çizgiler sıklaşıyor.
3. Dış taraftaki hava daha yavaş akıyor; çizgiler seyrek.

Soru (`tag: 'Sıra sende'`): Araçların arasındaki basınç, dış taraflardaki basınca göre nasıldır? **Daha küçüktür** / Daha büyüktür / Aynıdır. Dayandığı anlatım: 2–3; sahne 1, 3–5; E1 sahne 8. İpuçları: "Arada hava hızlı akıyor." · "Hızlı akan havada basınç düşer."

Gör: etiketler ve oklar belirir; tahtanın altında y = 530'da "P₀ > P₁" (sarı, 24 birim) yazılır; kamyon 15 birim aşağı, otomobil 15 birim yukarı kayar (800 ms, `inOut`); aradaki çizgi sayısı 6'ya iner (y 245, 255, … 295), aralık 10.

Sonra:
4. Dıştaki yüksek basınç araçları birbirine doğru itiyor.
5. Bu etki, yüksek süratlerde ve dar şeritlerde daha belirgindir.

### Sahne 4 · Sprey

Tahta (yandan kesit): şişe gövdesi x 380–520, y 270–500 (açık gri çerçeve); boyun x 430–470, y 230–270; başlık x 410–490, y 190–230. Sıvı mavi: gövdede y 400–500 (x 382–518). Dip borusu x = 450 (genişlik 10), y 495'ten y 215'e uzanır; içinde mavi su sütunu başta y 495–410. Çıkış borusu başlıktan sağa x 490–560 (yükseklik 10, y 205–215); çıkış deliği x 540–560 (dar). Üstte pompa düğmesi (x 430–470, y 150–190); düğmenin üstünde turuncu ok aşağı (450, 100) → (450, 160), "kuvvet" (turuncu). Şişenin içinde sıvının üstündeki hava (y 270–400) 0,2 sarı dolgulu: "yüksek basınç" dolu sarı etiketi (merkez (250, 330)), şişeye kısa gri çizgiyle bağlı. Çıkıştaki ok ve "düşük basınç" (soluk sarı) etiketi (merkez (730, 150)) 3. cümlede belirir.

Anlatım:
1. Sprey şişesinin pompasına basınca şişenin içindeki basınç artıyor.
2. Yüksek basınç, sıvıyı borudan yukarı, küçük çıkış deliğine itiyor.

Gör (1–2): düğme 300 ms'de `inOut` ile 20 birim iner; dip borusundaki su sütunu 600 ms'de `inOut` ile y = 410'dan y = 215'e yükselir, sonra çıkış borusundan deliğe (x 560) 400 ms'de `linear` ilerler.

Soru (`tag: 'Sıra sende'`): Sıvı küçük delikten geçerken sürati ve basıncı nasıl değişir? **Sürati artar, basıncı azalır** / Sürati azalır, basıncı artar / Sürati artar, basıncı da artar. Dayandığı anlatım: 2; E1 sahne 2 (6–7) ve sahne 3 (10–11) (kesit alanı küçülünce sürat artar; sürat artınca basınç azalır). İpuçları: "Delik küçük: kesit alanı daraldı." · "Sürati artan akışkanın basıncı azalır."

Sonra:
3. Küçük delikten geçen sıvının sürati arttı, basıncı azaldı.
4. Sıvı fışkırıp havada ince bir sise dağılıyor.
5. Sprey, sıvıyı yükselten bir Bernoulli İlkesi örneğidir.

Gör (4): çıkıştan sağa 12 küçük mavi nokta saçılır: x 560–760'a, ±12° açıyla yayılır (800 ms, `out`); ardından 0,3 saydamlığa solar (400 ms, `in`).

### Sahne 5 · Yelken

Tahta (üstten görünüş): tekne gövdesi, merkez (500, 330), yatay yarıçap 45, düşey yarıçap 150 (yaprak biçimli elips; burun yukarıda); açık gri kenar. Yelken: direk (500, 270)'ten bumba ucu (560, 370)'e, sağa doğru hafif bombeli yay (beyaz, kalınlık 6). Rüzgâr soldan sağa eser: yelkenin sağ yüzünde 4 sıkışık çizgi yayı 10, 20, 30, 40 birim dışarıdan izler (300 birim/s); sol yüzünde 3 seyrek çizgi (aralık 30; 100 birim/s) yelkene dayanır ve yüzeyi izler. Etiketler: soluk sarı "düşük basınç" (merkez (740, 300)); dolu sarı "yüksek basınç" (merkez (290, 360)). Turuncu kuvvet oku yelkenin ortasından (530, 320) → (599, 279) (80 birim; yelken yüzeyine dik, düşük basınçlı tarafa doğru), "kuvvet" (turuncu).

Anlatım:
1. Yelkenli teknede rüzgâr yelkenin iki yanından geçiyor.
2. Rüzgârın sürati arttıkça yelkene uygulanan hava basıncı azalıyor.
3. Yelkenin diğer tarafındaki hava basıncı daha yüksektir.
4. Bu fark, yelkenlinin ilerlemesine yardımcı olur.

Gör: çizgiler 1. cümlede; etiketler 2–3. cümlelerde; ok 4. cümlede (400 ms, `out`).

### Sahne 6 · Yarış arabasının arka kanadı

Tahta (yandan görünüş; araç sola gider): zemin y = 492 (x 60–940, gri). Gövde x 260–720, y 380–440 (açık gri; burun solda, (260, 440) – (300, 380) eğik); tekerlekler merkez (350, 460) ve (640, 460), r = 32. Arka kanat: ayaklar x = 660 ve x = 700 (y 316–380); kanat profili x 630–740, üst yüzey düz y = 290, alt yüzey bombeli (en düşük nokta (685, 322)); yani ters çevrilmiş uçak kanadıdır. Araca göre hava soldan sağa akar: kanadın altında 4 sıkışık çizgi y = 332, 342, 352, 362 (300 birim/s), üstünde 2 seyrek çizgi y = 230 ve 260 (100 birim/s). Etiketler: soluk sarı "düşük basınç" (merkez (480, 320)); dolu sarı "yüksek basınç" (merkez (685, 190)). Turuncu kuvvet oku aşağı: (680, 296) → (680, 376), "kuvvet" (turuncu).

Anlatım:
1. Yarış arabalarında yol tutuşu artırmak için arka kanat kullanılır.
2. Arka kanat, ters çevrilmiş bir uçak kanadına benzer.
3. Bombeli yüzey altta olduğundan, alttaki havanın sürati artar.
4. Altta basınç azalır; üstteki basınç daha büyük kalır.

Soru (`tag: 'Sıra sende'`): Kanadın üstündeki basınç, altındakine göre nasıldır? **Daha büyüktür** / Daha küçüktür / Aynıdır. Dayandığı anlatım: 3–4; sahne 1, 3–5. İpuçları: "Hangi tarafta hava daha hızlı akıyor?" · "Sürati artan yerde basınç azalır."

Gör: etiketler ve ok belirir (400 ms, `out`).

Sonra:
5. Fark kanadı aşağı bastırır; araba süratle giderken havalanmaz.

### Sahne 7 · Uçak

Tahta (yandan görünüş): uçak, açık gri ve düşük kontrastlı (0,5 saydamlık), sağa bakar: gövde x 380–620, y 290–330; kanat gövdenin ortasında; kuyruk x 380–410. Ağırlık merkezi (500, 310). Dört ok merkezden çıkar, hepsi 90 birim: ağırlık aşağı (turuncu, (500, 310) → (500, 400)), kaldırma yukarı (mor, (500, 310) → (500, 220)), sürükleme sola (turuncu, (500, 310) → (410, 310)), itme sağa (turuncu, (500, 310) → (590, 310)). Okların yanında adları (22 birim, oklarla aynı renk): "ağırlık", "kaldırma", "sürükleme", "itme". Her ok bu sırayla 400 ms, `out` ile belirir.

Anlatım:
1. Uçakta Bernoulli İlkesi'nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri etkilidir.

Not: akış çizgisi, kanat profili ve "üstten geçen hava daha uzun yol kat eder" gerekçesi yoktur. Oklar eşit boydadır; boylar bir dengeyi ya da kuvvet üstünlüğünü anlatmaz.

### Sahne 8 · Ortak olan, olmayan

Tahta: altı panel (her biri 280 × 190; sütunlar x 40, 360, 680; satırlar y 60 ve y 280); her panelde küçültülmüş çizim (ilgili sahnenin yalnızca cismi ve akış çizgilerinin birkaçı), üstünde başlık (22 birim): "çatı", "şemsiye", "arka kanat", "yelken", "araçlar", "sprey". Her panelde turuncu kuvvet oku (60 birim) ve okun ucunda soluk sarı küçük "düşük" etiketi: çatı ve şemsiye yukarı, arka kanat aşağı, yelken sağ-ileri (yelken sahnesindeki eğimle), araçlar iki küçük ok birbirine doğru, sprey çıkışa doğru (sağa). Paneller anlatımla sırayla 400 ms `out` ile belirir (1. cümlede altısı birden). Altta y = 520'de yazı: "cisim düşük basınca doğru itilir" (24 birim; "basınç" sarı).

Anlatım:
1. Altı örnekte de akışkanın sürati bir yerde artıyor; orada basınç düşüyor.
2. Her örnekte cisim, düşük basınçlı tarafa doğru itiliyor.
3. Ortak olan: basınç farkı. Farklı olan: kuvvetin yönü ve amacı.
4. Çatıda ve şemsiyede kuvvet yukarıdır: cisim havaya kalkıyor.
5. Arka kanatta kuvvet aşağıdır: araba havalanmıyor.
6. Yelkende ve yan yana araçlarda hareketin yönü değişiyor.
7. Spreyde sıvı, düşük basınçlı çıkışa doğru yükseliyor.

Soru (`tag: 'Sıra sende'`): Hangi örnekte basınç farkı cismi aşağı doğru bastırır? **Yarış arabasının arka kanadında** / Fırtınada çatıda / Açık şemsiyede. Dayandığı anlatım: 2, 5. İpuçları: "Kuvvet, düşük basınçlı tarafa doğrudur." · "Arka kanatta düşük basınç altta."

Defter ("Bernoulli İlkesi"): **Sürat artarsa basınç düşer; cisim düşük basınca itilir.** Örnek: çatı.

### Sahne 9 · Amaca göre sınıflandır (`tag: 'Dene'`)

Tahta: üstte dört kutu başlığı (kutular 215 genişlikte, y 50–120; x 40–255, 275–490, 510–725, 745–960; başlık 22 birim, uzun olanlar iki satır): "Havaya kaldırma", "Havalanmasını engelleme", "Yön değiştirme", "Sıvıyı yükseltme". Ortada (y 150–330) sıradaki kartın küçültülmüş çizimi (300 × 180 çerçeve içinde). Yerine oturan kartın adı kutusunun altına yazılır (22 birim, alt alta; kart 500 ms'de `inOut` ile kutusuna küçülerek gider). Soru kalıbı: "<kart>, hangi amaca hizmet eder?" Yanlışta ipucu: "Kuvvet cismi hangi yöne itiyor, ona bak."

| Kart | Kutu | Doğru geri bildirimi |
|---|---|---|
| Fırtınada çatının uçması | havaya kaldırma | Evet. Kuvvet yukarı; çatı havaya kalkıyor. |
| Şemsiyenin rüzgârda ters dönmesi | havaya kaldırma | Evet. Kuvvet yukarı; şemsiye kalkıyor. |
| Yarış arabasının arka kanadı | havalanmasını engelleme | Evet. Kuvvet aşağı; araba havalanmıyor. |
| Yelkenin tekneye etkisi | yön değiştirme | Evet. Kuvvet tekneyi ilerleme yönünde etkiliyor. |
| Yan yana araçların birbirine yaklaşması | yön değiştirme | Evet. Araçlar birbirine doğru çekiliyor. |
| Spreyde sıvının çıkışa gitmesi | sıvıyı yükseltme | Evet. Sıvı, düşük basınçlı çıkışa doğru yükseliyor. |

Sonra:
1. Amaçlar ayrı olsa da hepsinde aynı ilke işliyor.
2. Hava nerede hızlıysa cisim oraya çekilir.

### Çıkış soruları

1. (hedeflenen yanılgı) Fırtınada bir çatı neden yukarı kalkar? **Üstteki hava hızlıdır, basınç düşüktür; içerideki basınç büyüktür** / Rüzgâr çatıyı alttan doğrudan yukarı iter / Çatının üstündeki basınç evin içindekinden büyüktür. (sahne 1)
2. (yeni durum) Pencere açıkken dışarıda rüzgâr esiyor ve perde dışarı doğru çıkıyor. Neden? **Dışarıdaki hızlı havada basınç düşük, içerideki basınç büyüktür** / Dışarıdaki hava durgundur, basıncı düşüktür / Odanın içindeki basınç dışarıdakinden küçüktür. (sahne 1, 8)
3. (yeni durum) Bir yarış arabasında arka kanat, bombeli yüzü üstte kalacak biçimde ters takılıyor. Kanat aracı nasıl etkiler? **Yukarı doğru kuvvet doğurur; araç yere daha az basar** / Aşağı doğru kuvvet doğurur; araç yere daha çok basar / Hiçbir kuvvet doğurmaz; hava akışı değişmez. (sahne 6, 8; bombeli yüz üstte → üstte hava hızlı, basınç düşük → net kuvvet yukarı)
4. Spreyde sıvı küçük delikten geçerken ne olur? **Sürati artar, basıncı azalır** / Sürati azalır, basıncı artar / Sürati ve basıncı değişmez. (sahne 4)
5. Uçaklar için hangisi doğrudur? **Bernoulli İlkesi'nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri de etkilidir** / Uçmayı yalnızca Bernoulli İlkesi açıklar / Bernoulli İlkesi uçmayı hiç etkilemez. (sahne 7)

Özet: Hızlı akan akışkanda basınç düşer; cisim düşük basınca doğru itilir. · Çatı, şemsiye, yan yana araçlar, sprey, yelken ve arka kanat aynı ilkeyle açıklanır. · Uçakta Bernoulli İlkesi'nin yanında başka kuvvetler de etkilidir. · **Hava nerede hızlıysa cisim oraya çekilir.**

## E3 · Konu tekrarı: Bernoulli İlkesi (`e3-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): beş kural tahtada sırayla toplanır, her biri küçük çizimiyle ve deftere düşer: dar bölümlü boru ve sürat oku · "A₁ > A₂ > A₃" üç kutuda sürat ve basınç okları (v₃ > v₂ > v₁, P₁ > P₂ > P₃) · iki asılı kâğıt ve aralarındaki sıkışık akış çizgileri · aynı kâğıtlarda turuncu oklar · uçak ve dört ok. Her kural 400 ms'de `out` ile belirir; bir önceki 0,45 saydamlığa iner (tahtada aynı anda en çok iki kural tam görünür).

Anlatım:
1. Bu konuda öğrendiklerimizi beş kuralda toplayalım.
2. Kesit alanı daraldıkça akışkanın sürati artar.
3. Sürati artan yerde basınç azalır: Bernoulli İlkesi.
4. Kesit alanı en küçük yerde sürat en büyük, basınç en küçüktür.
5. Cisim, hızlı akan akışkanın düşük basınçlı tarafına itilir.
6. Uçakta Bernoulli İlkesi'nin yanında başka kuvvetler de etkilidir.

Sorular (`quiz`, karışık sırada):

1. Yatay bir boru geniş bölümden dar bölüme geçiyor. Dar bölümde sürat ve basınç için hangisi doğrudur? **Sürat büyük, basınç küçüktür** / Sürat küçük, basınç büyüktür / Sürat de basınç da büyüktür. — E1
2. Kesit alanları A₁ > A₃ > A₂ olan bir borudan su akıyor. Süratler arasındaki doğru sıralama hangisidir? **v₂ > v₃ > v₁** / v₁ > v₃ > v₂ / v₃ > v₁ > v₂. — E1 (en küçük A₂ → en büyük v₂; sonra A₃ → v₃; en büyük A₁ → en küçük v₁)
3. Aynı borunun düşey borularındaki su yükseklikleri arasında hangi sıralama vardır? **h₁ > h₃ > h₂** / h₂ > h₃ > h₁ / h₁ > h₂ > h₃. — E1 (basınç kesit alanıyla aynı sırada: P₁ > P₃ > P₂; su yüksekliği basıncı gösterir)
4. Ela, "Dar yerde su sıkışır, bu yüzden basınç artar" diyor. Bu söz için ne söylenir? **Yanlış; dar yerde sürat artar, basınç azalır** / Doğru; dar yerde sürat azalır, basınç artar / Doğru; dar yerde sürat de basınç da artar. — E1
5. Dar bir yolda hızla geçen otobüsün yanında duran bisiklet otobüse doğru çekiliyor. Neden? **Aradaki havanın sürati artar, basıncı azalır** / Aradaki havanın sürati azalır, basıncı artar / Otobüsün ağırlığı bisikleti çeker. — E2
6. Hangisinde basınç farkından doğan kuvvet aşağı yönlüdür? **Yarış arabasının arka kanadında** / Fırtınada çatıda / Rüzgârda açık şemsiyede. — E2
7. Rüzgârlı bir günde bir çatı yerinden sökülüyor. Hangi ifade doğrudur? **İçerideki basınç, çatının üstündeki basınçtan büyüktür** / İçerideki basınç, çatının üstündeki basınçtan küçüktür / İçerideki ve üstteki basınç eşittir. — E2
8. Bir öğrenci, "Uçaklar yalnızca Bernoulli İlkesi sayesinde uçar" diyor. Bu söz için ne söylenir? **Eksik; ağırlık, kaldırma, sürükleme ve itme kuvvetleri de etkilidir** / Doğru; başka etki yoktur / Yanlış; Bernoulli İlkesi uçakta hiç etkili değildir. — E2

Akılda kalıcı cümle: Sürat arttığı yerde basınç azalır.

## Program metniyle karşılaştırma (12 Ekim 2026)

| Programın istediği (FİZ.9.3.7 ve uygulama metni) | Karşılığı |
|---|---|
| Tahmin et–gözle–açıkla tekniği | E1 sahne 1, 5, 6, 7 (`Tahmin et` soruları, "Gör", açıklayan cümleler) |
| Kesit alanı azaltılınca akış süratinde oluşan değişimi tahmin | E1 sahne 1 (hortum), sahne 2 (birlikte çöz) |
| Akış modelinin görsel ya da dijital içerik ve gösteri deneyiyle gözlenmesi | E1 sahne 2–4, 9 (sürgülü boru benzetimi, Venturi tüpü) |
| Bahçe hortumundan akan suyun, ucu sıkılınca akış süratinin değişmesi | E1 sahne 1 |
| Saç kurutma makinesi ile masa tenisi topunun havada tutulduğu gösteri | E1 sahne 7 |
| Tahmin ve gözlem sonuçlarını karşılaştırıp gerekçelendirme (E1.6) | E1 sahne 1, 5–7 (her `Tahmin et` sorusunu "Gör" ve açıklayan "Sonra" cümleleri izler) |
| Düşün–eşleş–paylaş, vızıltı grupları, tartışma (SDB2.1, SDB2.2) | `site dışı` |
| a) Akışkanların sürati ile basıncı arasındaki ilişkiyi gözlemleyerek tespit eder | E1 sahne 2–4, 9 |
| Borunun kesit alanı ile akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkiyi belirleme | E1 sahne 2 (kesit–sürat), sahne 3 (sürat–basınç), sahne 4 (üç kesit sıralaması), sahne 9 (sıralama) |
| Sürat–basınç ilişkisini genelleyerek Bernoulli İlkesi'ne ulaşma (OB7) | E1 sahne 5–8 (kâğıt, iki kâğıt, top, ilkenin adı ve defter) |
| Bu ilkeye ilişkin genelleme kavramsal verilir, matematiksel modelden kaçınılır | Tüm E dersleri: sayı, formül, oran yok; yalnızca sıralama (E1 sahne 4) |
| Öğrencilerin verilen örnekleri Bernoulli İlkesi ile açıklaması (rehberlik) | E2 sahne 1–6 (her örnek aynı zincirle: sürat → basınç → fark → kuvvet) |
| Çatıların uçması | E2 sahne 1 |
| Sprey püskürtücülerde sıvının yükselmesi | E2 sahne 4 |
| Hızla hareket eden araçların yakınındaki nesneleri çekmesi | E2 sahne 3 |
| Yelkenlilerin rüzgâra karşı gidebilmesi | E2 sahne 5 (kitaptaki cümle kadar; "rüzgâra karşı" ayrıntısı kitapta yok) |
| Yarış arabalarının aerodinamiğe uygun tasarlanması | E2 sahne 6 (arka kanat) |
| b) Sürat–basınç ilişkisini günlük hayat örnekleri üzerinden geneller | E2 sahne 1–8, çıkış soruları 2–3 (perde, ters kanat: yeni durum) |
| Örnekleri amaca göre (havaya kaldırma, havalanmasını engelleme, yön değiştirme vb.) ortak ve olmayan özellikleriyle belirleme (SDB2.3, D3.3, E3.10) | E2 sahne 8 (ortak ve farklı), sahne 9 (sınıflandırma) |
| Uçakların havalanması ve uçmasında yalnızca Bernoulli İlkesi'nin etkili olmadığı vurgulanır | E2 sahne 7, çıkış sorusu 5; E3 kural 6, soru 8 |
| Çalışma yaprağı ile değerlendirme | `site dışı` |

Fazla olan: asılı iki kâğıt, kâğıda üfleme (E1 sahne 5–6; programın saydığı örnekler arasında yok, kitapta ve `PLAN.md` karar 22'de var), şemsiye (E2 sahne 2; kitap s. 189), perde ve balonlar (yalnızca çıkış ve tekrar sorularında yeni durum olarak; ilke aynı). Kan akışı ve tansiyon, rüzgâr tüneli, KAAN, su tesisatı, koşucu, mum dumanı alınmadı (program anmıyor). Eksik olan: yok. Hesaplanan sorular: sayı içeren soru yok; sıralama ve yön içeren sorular hesaplandı: E1 sahne 4 (sıra sende), E1 sahne 9 (iki sıralama), E1 çıkış 3, E2 çıkış 3, E3 soru 2 ve 3.
