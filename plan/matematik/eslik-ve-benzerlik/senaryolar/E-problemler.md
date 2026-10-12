# Senaryolar — Konu E · Eşlik ve benzerlik problemleri

Yazıldı: 9 Ekim 2026; aynı gün E3 iki derse bölündü (karar 14: E3 ve E4, konu tekrarı E5). Dayanak: `../MUFREDAT.md` MAT.9.4.5, `../PLAN.md` bölüm 3 (E1–E5), bölüm 7 (karar 10 ve 14) ve bölüm 8 ("E" satırı). Kurallar: `../../../KURALLAR.md` 3–3.4 ve 4. Biçim `A-geometrik-donusumler.md` ile aynıdır. Bu konu yeni teorem getirmez: B, C ve D'de öğretilen araçlar (eşlik, Açı-Açı benzerliği, oran, Tales, Öklid, Pisagor) problem çözme sürecinde kullanılır; her çözüm adımının yanında hangi dersin aracı olduğu yazılıdır.

Okuma kılavuzu:

- "Anlatım" altındaki numaralı satırlar altyazının kendisidir: tek cümle, en çok 12 kelime (ölçüm aracı rakam ve simgeleri de kelime sayar; işlem içeren satır derste 12 kelimeyi aşıyorsa ikiye bölünür); hepsi seslendirilir. Okunuşlar ders yazılırken `speak` ile verilir: "1,6 m" "bir virgül altı metre", "75 cm" "yetmiş beş santimetre", "TH / KL = HA / LA" "T H bölü K L eşittir H A bölü L A", "THA ~ KLA" "T H A, K L A'ya benzerdir", "|TH|" "T H uzunluğu", "AH²" "A H kare", "·" ve "×" "çarpı", "÷" "bölü", "x" "iks", "22,5°" "yirmi iki virgül beş derece", "1 265 625" "bir milyon iki yüz altmış beş bin altı yüz yirmi beş".
- "Kaynak" satırı yazar içindir. Öğrenci kitabı, sayfayı, sınıfı hiçbir yerde görmez. Problemlerin bağlamı ve sayıları kitaptandır; öğrenciye durumun içinde sunulur (Hakan, Arda, Necati kitaptaki kişilerdir; Çanakkale Şehitler Abidesi kitabın adıyla anılır).
- Her soru kendisinden önceki anlatıma dayanır; "Dayandığı anlatım" hangi cümleler olduğunu söyler. Kalın şık doğru cevaptır; derste şıkların sırası karıştırılır. Köşeli ayraç içindeki "[çeldirici …]" notları yazara ve denetleyene içindir, derste görünmez: her yanlış şıkkın hangi hatadan çıktığını yazar.
- Sıra her derste aynıdır: hatırla → anlat → örnekle göster (baştan sona çözülmüş) → birlikte çöz (`tag: 'Birlikte çöz'`) → sor (`tag: 'Sıra sende'`) → gör → adlandır (defter) → dene → 4–5 çıkış sorusu. E konusunda bu döngü her problem için yinelenir.
- Renkler tema boyunca aynıdır: şekil mavi, görüntüsü turuncu, yansıma doğrusu mor, dönme merkezi ve açısı sarı, öteleme oku yeşil; B'den beri karşılıklı eşit açılar ve karşılarındaki kenarlar aynı renkte (sırayla mavi, turuncu, yeşil), paralel doğrular mor, yükseklik sarı. E konusunda ek olarak: problemin büyük üçgeni mavi, ona benzer küçük üçgen turuncu; **verilen sayılar beyaz, istenen uzunluk sarı çerçeveli "?" ya da harf, hesaplanan ara değerler yeşil**; dik açı küçük kare işaretiyle; çıkmaz yol gri çizgi ve gri çarpıyla biter.
- Problem şekilleri ölçeklidir. Aşağıdaki "(sütun, satır)" çiftleri yalnızca dersi yazan içindir (zeminin sol üst köşesi (0, 0), satır aşağı doğru artar; ondalıklı değerler hesaplanmış köşelerdir); tahtaya koordinat yazılmaz, yalnızca problemin uzunlukları etiket olarak yazılır. Her şeklin ölçeği "1 birim = …" diye verilir. Ölçek dışı tek şey Hakan'ın büyüteç kutusudur (kendi ölçeği yazılıdır).
- Problem metni tahtaya yazılmaz (25 kelime sınırı): durum çizimle ve kısa etiketlerle kurulur, anlatım altyazıdan gelir. Soru metni soru kartındadır, tahtada değildir.
- Her soruda bir doğru, iki çeldirici vardır; çeldiriciler öğretilmemiş bir konuya dayanmaz. "Ara değer", verilenlerden hesaplanan ve şekle yazılan sayıdır (E1'de tanıtılır).
- Ön bilgi olarak kullanılanlar (kitabın çözümleri de kullanıyor): ikizkenar üçgende tabana inen yükseklik tabanı ortalar; üçgenin iç açıları toplamı 180°; tam açı 360°; uzun kenarın karşısındaki açı büyük, kısa kenarın karşısındaki küçüktür. Yeniden anlatılmazlar, kullanıldıkları yerde tek cümleyle anılırlar.

## E1 · Çözmeden önce şekle dök

- **Fikir:** Problemde önce verilenler ve istenen ayrılır, aralarındaki ilişki bulunur; durum şekle ve matematik diline çevrilir.
- **Giriş ekranı sorusu:** Bir tepenin yüksekliğini tırmanmadan, yere koyduğun bir aynayla bulabilir misin?
- **Kaynak:** Ders kitabı s. 79 (31. örnek, tepe ve ayna: verilenler, model, ara değerler |DA| = 525, |BH| = |HD| = 675, |HA| = 1200), s. 82–83 (33. örnek, stor perde: model, |BC| = 135, |BK| = 60, |AB| = 90), s. 76–77 (4.5 başındaki basamaklar: verilen ve istenenin, ilişkilerin belirlenmesi; matematiksel ifade ve kendi cümleleriyle açıklama). 13. uygulama (çantalar) kullanılmadı (rapora bakınız).
- **Sınır:** Bu derste TH hesaplanmaz; strateji ve hesap E2'dedir. Yalnızca modele dökme ve ara değerler. Hakan'ın göz yüksekliği kitapta 150 cm yazılıdır; derste önce 150 cm okunur, şekle 1,5 m yazılır.
- **Güç kavramlar ve gösterimi:** (1) Resimden şemaya: tepe ve Hakan'ın resmi soluklaşır, yerinde noktalar, dikmeler, ışık yolu ve harfler kalır. (2) Verilen ile istenen: iki sütunlu tablo, anlatımla satır satır dolar. (3) Ara değer: verilenlerden hesaplanan sayı yeşil yazılır; verilen sayılar beyaz kalır. (4) Her verilen sayı şemada bir kenara oturur: sayı ile kenar aynı anda parlar.
- **Hedeflenen yanılgı:** Şekil çizmeden, verilen sayıları oranlamaya başlamak.
- **Akılda kalıcı cümle:** Önce ne verildi, ne isteniyor; sonra şekle dök.

Zemin 1 (Hakan'ın tepesi): 22 sütun, 11 satır; 1 birim = 100 m. Yer çizgisi satır 10: B (1, 10), H (7.75, 10), D (14.5, 10), A (19.75, 10); L, A'nın 2 m (0,02 birim) sağında, A'nın hemen yanında (19.77, 10). Zirve T (7.75, 1). Tepe ikizkenar TBD üçgenidir: |TH| = 9 birim (900 m), |BH| = |HD| = 6.75 birim (675 m), |DA| = 5.25 birim (525 m), |HA| = 12 birim (1200 m), |TB| = |TD| = 11.25 birim (1125 m), |TA| = 15 birim. Tepe siluet olarak çizilir (TBD üçgeninin kenarları hafif dalgalı). Büyüteç kutusu zeminin sağ üstünde (16–21, 1–5), kendi ölçeği 1 birim = 0,5 m: A (16.5, 4.5), L (20.5, 4.5), K (20.5, 1.5); |AL| = 4 birim (2 m), |LK| = 3 birim (1,5 m), |AK| = 5 birim; kutudan ana şekildeki A'ya ince çizgi gider. Ana şekilde Hakan ve ayna çok küçük olduğu için yalnızca L'de küçük bir insan işareti ve A'da kısa bir ayna çizgisi vardır.

Zemin 2 (stor perde): 16 sütun, 17 satır; 1 birim = 15 cm; yer çizgisi satır 16. Perde dikey çizgi x = 3, üstte pencere; perdenin ucu C (3, 2) (yerden 14 birim = 210 cm). Masa dikdörtgeni (5, 11)–(11, 16) (yükseklik 5 birim = 75 cm, perdeye uzaklık 2 birim = 30 cm, genişlik 6 birim; genişlik problemde verilmemiştir, etiket yazılmaz). B (3, 11): perdenin masa yüzü hizasındaki noktası; |BC| = 9 birim (135 cm). Birinci ışın C'den A (9, 11)'e: |AB| = 6 birim (90 cm), A masa kenarından 4 birim (60 cm) içeride. Perde 5 birim (75 cm) inince ucu K (3, 7); |BK| = 4 birim (60 cm). İkinci ışın K'den D (5.667, 11)'e: |BD| = 2.667 birim (40 cm); D masa kenarından 0.667 birim (10 cm) içeride (masanın üstünde), yani x = 10 cm, masa kenarı ile D arasındadır (sarı). İki ışın paraleldir (mor kesikli).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (D5) Dik kenarları 9 ve 12 birim olan dik üçgenin hipotenüsü kaç birimdir? **15 birim** / 21 birim / 3 birim. Yanlışta: "Hipotenüsün karesi, dik kenarların kareleri toplamıdır." [hesaplandı: 9² + 12² = 81 + 144 = 225, √225 = 15; çeldirici 21 = 9 + 12, 3 = 12 − 9]
2. (B4) İki üçgenin karşılıklı iki açısı eşit. Bu üçgenler için hangisi söylenir? **Benzerdir; karşılıklı kenarları orantılıdır** / Eştir; karşılıklı kenarları eşittir / Hiçbir şey söylenemez. Yanlışta: "İki açı eşitse üçgenler benzerdir; karşılıklı kenarları orantılıdır."

### Sahne 2 · Hakan'ın tepesi

Tahta: Zemin 1; yalnızca yer çizgisi ve soluk tepe silüeti. Anlatım ilerledikçe noktalar ve etiketler belirir: B ve D (yamaçların yere değdiği yerler) ve aralarına "1350 m"; zirvede T; sağda L'de küçük Hakan, D ile L arasına "527 m"; A'da ayna; büyüteç kutusunda "2 m" ve "150 cm". Son satırda ışık yolu T'den A'ya, A'dan göze (K) çizilir. Tahtada en çok 12 öğe: B, D, T, A, L, K, 1350 m, 527 m, 2 m, 150 cm.

Anlatım:
1. Hakan'ın dağcılık kulübü bir tepeye tırmanacak.
2. Önce tepenin yüksekliğini öğrenmek istiyor.
3. Tepenin iki yamacı yere B ve D noktalarında değiyor.
4. B ile D arası kuş uçuşu 1350 metre.
5. Zirve T, B ve D'ye eşit uzaklıkta.
6. Hakan L noktasında; D'ye 527 metre uzakta.
7. Kendisinden 2 metre ötedeki A noktasına bir ayna koyuyor.
8. Gözü K noktasında; yerden 150 santimetre yukarıda.
9. Aynaya bakınca zirveyi görüyor: ışık T'den A'ya, A'dan göze geliyor.
10. Işık aynaya çarpınca, gelen ve giden ışın aynayla eşit açı yapar.

### Sahne 3 · Verilen ve istenen

Tahta: Hakan'ın şekli solda küçülür; sağda iki sütunlu tablo belirir: "Verilen" ve "İstenen". Satırlar anlatımla dolar. Verilen: |BD| = 1350 m · |DL| = 527 m · |AL| = 2 m · |KL| = 150 cm · iki açı eşit. İstenen: |TH| = ? (şekilde T'den yere inen dikme sarı çizilir, ayağı H).

Anlatım:
1. Probleme girmeden önce verilenleri ve istenen şeyi ayırırız.
2. Verilen, problemin bize söylediği bilgidir.
3. Burada dört uzunluk verilmiş; ışıkla ilgili bir açı bilgisi de var.
4. İstenen, bulmamız gereken şeydir.
5. Zirveden yere inen dikmenin ayağına H diyelim.
6. İstenen: tepenin yüksekliği, yani TH uzunluğu.

Birlikte çöz (`tag: 'Birlikte çöz'`): tabloda "Verilen" sütunu dolu, "İstenen" sütunu boş. Aşağıdakilerden hangisi bu problemde istenendir? **|TH|, tepenin yüksekliği** / |KL|, Hakan'ın göz yüksekliği / |BD|, yamaçlar arası uzaklık. Dayandığı anlatım: 2–6. İpuçları: "Verilen, problemin yazdığı bilgiydi; istenen bulunacak olandır." · "Göz yüksekliği ve BD, tabloda zaten verilen sütununda."

Sonra:
7. Şimdi verilenlerin birbirine nasıl bağlandığına bakalım.

### Sahne 4 · İlişkiler

Tahta: Hakan'ın şekli yeniden büyür. TB ve TD kenarlarına çift çizgi; H'de dik açı kareleri; BD üzerinde H, orta nokta işaretiyle. Sağda "İlişki" sütunu satır satır dolar: "TBD ikizkenar" · "H, BD'nin ortası" · "|DL| = |DA| + |AL|" · "TAD = KAL". DL çubuğu D'den L'ye çizilir, içinde iki renkli parça (DA, AL). Biten satır soluklaşır.

Anlatım:
1. Verilenler arasındaki ilişkileri bulalım.
2. Zirve, B ile D'ye eşit uzaklıkta: TBD ikizkenar.
3. İkizkenar üçgende tabana inen yükseklik tabanı ortalar.
4. Demek ki H, BD'nin orta noktası.

Birlikte çöz (`tag: 'Birlikte çöz'`): H, BD'nin ortası ve |BD| = 1350 m. |HD| kaç metredir? **675 m** / 1350 m / 525 m. Dayandığı anlatım: 2–4. İpuçları: "Orta nokta, BD'yi iki eşit parçaya böler." · "BD'nin tamamı 1350 metre; HD yalnızca yarısı." [hesaplandı: 1350 ÷ 2 = 675; çeldirici 1350 = tamamı, 525 = başka parça]

Sonra:
5. |BH| ve |HD| 675'er metre.
6. Ayna A, D ile L arasında duruyor.
7. Yani |DL| = |DA| + |AL|.
8. Buradan |DA| = 527 − 2 = 525 metre.

Soru (`tag: 'Sıra sende'`): |HA| = |HD| + |DA| ise |HA| kaç metredir? **1200 m** / 1202 m / 150 m. Dayandığı anlatım: 5–8. İpuçları: "HA, HD ile DA'nın birleşimi; HD 675, DA 525." · "527, DL'ydi; HA için DA gerekiyor." [hesaplandı: 675 + 525 = 1200; çeldirici 1202 = 675 + 527 (DL kullanılmış), 150 = 675 − 525]

Gör: HA üzerinde 675 ve 525 uzunluklu iki yeşil parça yan yana, toplam 1200.

Sonra:
9. Aynadaki iki açı eşit: TAD ile KAL.
10. Tepe de Hakan da yere dik: iki dik açı.

### Sahne 5 · Şekle dök

Tahta: Hakan'ın şekli; tepe ve insan resmi soluklaşır, geometrik şema kalır. Sırayla: yer çizgisi ve B, H, D, A, L noktaları; TH ve KL dikmeleri (dik açı kareleriyle); T'den A'ya ve A'dan K'ye ışık yolu; A'daki iki eşit açı mavi; sayılar kendi kenarlarında: 675, 675, 525 (yeşil), büyüteç kutusunda 2 ve 1,5. "150 cm = 1,5 m" küçük bir not olarak belirir ve 150 cm yerini 1,5 m'ye bırakır. En sonda THA mavi, KLA turuncu boyanır.

Anlatım:
1. Şimdi durumu bir şekle dökelim.
2. Önce yer çizgisi ve üzerindeki noktalar: B, H, D, A, L.
3. Tepe ve Hakan yere dik: TH ve KL dikmeleri.
4. Işığın yolu: T'den A'ya, A'dan K'ye.
5. Aynadaki iki eşit açıyı aynı renkle boyayalım.
6. Her verilen sayıyı şekilde kendi kenarına yazalım.
7. Şekilde bütün uzunluklar metre olsun.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "|KL| = 150 cm". Şekil metre kullanıyor; |KL| kaç metredir? **1,5 m** / 15 m / 150 m. Dayandığı anlatım: 7. İpuçları: "1 metre 100 santimetredir." · "150 santimetre, 1 metreden biraz fazla." [hesaplandı: 150 ÷ 100 = 1,5; çeldirici 15 ve 150 birim yanlış kaydırma]

Sonra:
8. Şekilde iki dik üçgen var: THA ve KLA.
9. İkisinde de bir dik açı ve bir eşit açı var.

Soru (`tag: 'Sıra sende'`): THA ve KLA üçgenleri için şekilden hangi açılar eşit okunur? **H ve L'deki dik açılar; A'daki iki açı** / H'deki dik açı ile K'deki açı / A'daki açı ile L'deki dik açı. Dayandığı anlatım: 3, 5, 8–9. İpuçları: "Yere dik duran iki doğru parçası var: iki dik açı." · "Aynada eşit olan açıların köşesi A." [çeldirici: K'deki açı dik değildir (90° − 36,87°); A'daki açı 36,87°, L'deki 90°]

Gör: A'daki iki açı mavi yayla, H ve L'deki dik açılar kare işaretiyle belirir.

Sonra:
10. Küçük dik üçgenin dik kenarları belli: KL ve LA.
11. Büyükte HA belli; TH aranıyor.

### Sahne 6 · Stor perde

Tahta: Zemin 2; yalnızca yer çizgisi, perde çizgisi ve masa. Anlatım ilerledikçe etiketler belirir: 210 (perde ucundan yere), 30 (perde ile masa arası), 75 (masa yüksekliği), 60 (masa kenarından A'ya); sonra perde ucu C'den K'ye iner ve "75" (perdenin inişi) yazılır; ikinci ışın K'den D'ye çizilir ve x sarı belirir. Verilen/İstenen tablosu sağdadır: Verilen: 210 · 75 · 30 · 60 · perde inişi 75; İstenen: x.

Anlatım:
1. Bir pencerede stor perde var; ucu yerden 210 santimetre yüksekte.
2. Perdeden 30 santimetre ileride, 75 santimetre yüksekliğinde bir masa duruyor.
3. Güneş ışığı perdenin altından geçip masaya düşüyor.
4. Işık masanın kenarından en çok 60 santimetre ileriye ulaşıyor.
5. Sonra perde 75 santimetre indiriliyor.
6. Işık şimdi masa kenarından en çok x santimetre ilerliyor.
7. İstenen x; verilenler tabloda.
8. Güneş ışınları paralel: iki ışın aynı eğimde.
9. Perde yere dik, masanın yüzü yere paralel: B'de dik açı.
10. Işık perde ucundan A'ya iniyor: ABC dik üçgeni.
11. Perde inince ışık K'den D'ye iniyor: DBK dik üçgeni.
12. Perde ucu, masanın yüzünden 210 − 75 kadar yukarıda: |BC|.

Birlikte çöz (`tag: 'Birlikte çöz'`): |BC| kaç santimetredir? **135 cm** / 285 cm / 75 cm. Dayandığı anlatım: 1, 2, 12. İpuçları: "Perde ucu yerden 210'du; masa o yüksekliğin 75'ini kaplıyor." · "Masanın yüksekliği eklenmez, çıkarılır." [hesaplandı: 210 − 75 = 135; çeldirici 285 = 210 + 75, 75 = masa]

Sonra:
13. Perde 75 santimetre inince ucu K'ye gelir: |CK| = 75.

Soru (`tag: 'Sıra sende'`): |BK| kaç santimetredir? **60 cm** / 135 cm / 150 cm. Dayandığı anlatım: 12–13. İpuçları: "K, C'den 75 aşağıda; |BC| 135'ti." · "BK, BC'nin bir parçası; BC'den büyük olamaz." [hesaplandı: 135 − 75 = 60; çeldirici 135 = BC'nin kendisi, 150 = 75 + 75]

Gör: |BK| = 60 yeşil yazılır; ışığın masaya düştüğü A, perdeden 30 + 60 = 90 santimetre uzakta: |AB| = 90 yeşil.

Sonra:
14. A, perdeden 30 + 60 = 90 santimetre ötede: |AB| = 90.
15. Şimdi problemi kendi cümlemizle söyleyelim.

Soru (`tag: 'Sıra sende'`): Hangi cümle perde problemini doğru anlatır? **İki dik üçgen var; ışının eğimi aynı; ikincide masa kenarı ile ışığın düştüğü yer arasındaki uzaklık aranıyor** / İki dik üçgen eştir; |BC| ile |BK| eşittir / Tek bir dik üçgen var; x onun hipotenüsüdür. Dayandığı anlatım: 8–14 ve tahtadaki şekil. İpuçları: "Perde indi ama ışının eğimi aynı kaldı." · "BK, BC'den 75 kısa; iki üçgen aynı büyüklükte değil."

### Sahne 7 · Verilen, istenen, ara değer

Tahta: perde şekli solda; sağda üç kutu: "Verilen", "İstenen", "Ara değer". Altı kart sırayla gelir.

Anlatım:
1. Verilenlerden hesapladığımız sayıya ara değer diyelim.
2. Ara değer verilmemiştir; istenen de değildir.
3. Şekle hem verilenleri hem ara değerleri yazarız.

Dene (sınıflandırma; altı kart, her biri `tag: 'Sıra sende'`): Kartı doğru kutuya koy.
- "Masa yüksekliği 75 cm": **Verilen**. Gör: sayı beyaz.
- "Perde ucu yerden 210 cm": **Verilen**.
- "Perdenin inişi 75 cm": **Verilen**.
- "Işığın masada kenardan en uzak noktası (x)": **İstenen**. Gör: x sarı.
- "|BC| = 135 cm": **Ara değer**. İpucu: "Verilmedi, 210 ile 75'ten hesaplandı." Gör: sayı yeşil.
- "|BK| = 60 cm": **Ara değer**. İpucu: "135 ile 75'ten hesaplandı."
Dayandığı anlatım: 1–3, sahne 3, 6.

Sonra:
4. Önce verilen ve istenen, sonra ilişki, sonra şekil.

Defter ("Şekle dök"): **Verilen, istenen, ilişki; sonra şekil.** Örnek: istenen |TH|.

### Çıkış soruları

1. (yanılgı) Bir öğrenci Hakan'ın problemini şekil çizmeden okuyup 1350 / 527 oranını yazıyor. Hangisi doğrudur? **Hangi kenarın hangisine karşılık geldiği şekil olmadan belli olmaz; önce şekle dökmeli** / Oran kurmak her zaman doğrudur / 1350 ve 527 verilen sayı olmadığı için kullanılamaz. (sahne 5)
2. (yeni durum) 13 m boyundaki bir merdiven duvara dayanıyor; duvardaki ucu yerden 12 m yüksekte. Merdivenin yerdeki ucunun duvara uzaklığı sorulursa istenen hangisidir? **Yerdeki ucun duvara uzaklığı** / Merdivenin boyu / Duvardaki ucun yüksekliği. (sahne 3)
3. (yeni durum) Aynı merdiven problemini şekle dökerken hangi dik üçgen çizilir? **Hipotenüsü 13 m, bir dik kenarı 12 m olan** / Dik kenarları 13 m ve 12 m olan / Hipotenüsü 12 m, bir dik kenarı 13 m olan. (sahne 5) [hesaplandı: merdiven hipotenüs; 13² − 12² = 25, istenen dik kenar 5 m]
4. (yeni durum) Hakan'ın problemindeki ayna A, L'den 2 m yerine 3 m ötede olsaydı |DA| kaç metre olurdu? **524 m** / 530 m / 527 m. (sahne 4) [hesaplandı: 527 − 3 = 524; çeldirici 530 = 527 + 3, 527 = DL]
5. (yeni durum) Stor perde problemindeki perde 75 cm yerine 90 cm indirilseydi şekilde |BK| kaç cm olurdu? **45 cm** / 90 cm / 120 cm. (sahne 6) [hesaplandı: 135 − 90 = 45; çeldirici 90 = inişin kendisi, 120 = 210 − 90 (perde ucunun yerden yüksekliği)]

Özet: Önce verilen ve istenen ayrılır. · İlişkiler bulunur, ara değerler hesaplanır. · Durum şekle dökülür: her sayı bir kenara oturur. · **Önce ne verildi, ne isteniyor; sonra şekle dök.**

## E2 · Strateji kur, uygula, kontrol et

- **Fikir:** Şekildeki eş ya da benzer üçgenler ve işe yarayacak araç seçilir, uygulanır, sonuç denetlenir.
- **Giriş ekranı sorusu:** Aynı şekilde hem Pisagor hem benzerlik kullanılabiliyorsa hangisinden başlarsın?
- **Kaynak:** Ders kitabı s. 79–80 (31. örnek çözümü: Açı-Açı benzerliği, oran, |TH| = 900, Pisagor, |TD| = 1125), s. 78 (30. örnek, çiçek deseni: eş üçgenler, 16 · α = 360°, α = 22,5°, m(BAC) = 47,5°), s. 82–83 (33. örnek çözümü: benzerlik oranı 4/9, x = 10), s. 81 (32. örnek a, yapı ve kitap: Öklid, |CH| = 40, |BC| = 41,6), s. 84 (Kontrol Noktası: strateji kurma ve uygulama). Kontrol basamağı kitapta ayrı bir örnek olarak yok; senaryoda kitabın sayılarıyla kurulur.
- **Sınır:** Yeni teorem yok; "ipucu → araç" tablosundaki beş aracın hepsi B–D'de öğretildi. Tales satırı tabloda ve eşleştirmede vardır; bu derste Tales ile çözülen bir problem yoktur (E3'te çıkmaz yol olarak denenir).
- **Güç kavramlar ve gösterimi:** (1) Araç seçimi: şeklin yanında beş satırlı "ipucu → araç" tablosu. (2) Hangi üçgen çifti: büyük üçgen mavi, küçük turuncu; karşılıklı kenarlar aynı renk. (3) Kontrol: üç kutu ("şekle uyuyor mu", "verilenlerle çelişiyor mu", "birim doğru mu"), her biri denetlenince tik alır.
- **Hedeflenen yanılgı:** Sonucu denetlemeden bırakmak.
- **Akılda kalıcı cümle:** Aracı seç, uygula, sonucu denetle.

Zemin 1: E1'deki Hakan'ın tepesi aynen (22 sütun, 11 satır, 1 birim = 100 m); tüm ara değerler yerinde: 675, 675, 525, 1200; büyüteç kutusunda 2 ve 1,5. THA mavi, KLA turuncu. Sonradan |TD| = 11.25 birim (1125 m) sarı çizilir.

Zemin 2 (çiçek deseni): üçgen için 8 sütun, 8 satır; 1 birim = 2 cm. C (2, 6), A (7, 6), B (5.62, 4.50). |AC| = 5 birim (en uzun kenar), |BC| = 3.92 birim, |AB| = 2.04 birim (kısa kenar). Açılar: m(ABC) = 110°, m(BAC) = 47,5°, m(ACB) = α = 22,5°. Eş ikinci üçgen AC üzerinden yansıtılıp yapıştırılır: B′ (5.62, 7.50); dörtgen A, B, C, B′ (uçurtma biçimi): C'de açı 2α = 45°, A'da 95°, B ve B′'de 110°. Çiçek deseni için ayrı zemin: 12 sütun, 12 satır, merkez C (6, 6), sekiz uçurtma 45°'lik aralıkla; her uçurtmanın A'sı merkezden 5 birim, iki B'si merkezden 3.92 birim, eksenden ±22,5°. Merkezde 16 küçük açı α tam açıyı doldurur.

Zemin 3 (stor perde): E1'deki zemin 2 aynen (16 × 17, 1 birim = 15 cm); iki ışın birlikte; ABC mavi, DBK turuncu.

Zemin 4 (yapı ve kitap): 10 sütun, 22 satır; 1 birim = 2 m. Abide dikey kalın çubuk: B (7, 21) yer, C (7, 0.2) tepe, H (7, 20.2) göz hizası; |BH| = 0.8 birim (1,6 m), |CH| = 20 birim (40 m), |BC| = 20.8 birim (41,6 m). Arda A (3, 20.2)'de, elinde dik köşeli kitap; |AH| = 4 birim (8 m). AB ve AC ince çizgiler; A'da dik açı (kitabın köşesi): AB (4, 0.8) ile AC (4, −20) dik. AH, abideye dik (sarı yükseklik).

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (E1) Bir problemi çözmeye başlarken ilk iş hangisidir? **Verilenleri ve istenen şeyi ayırıp şekle dökmek** / Hemen bir oran yazmak / Sonucu tahmin edip yazmak. Yanlışta: "Önce verilen ve istenen ayrılır; sonra ilişkiler bulunur, durum şekle dökülür."
2. (D3) Dik üçgende dik köşeden hipotenüse inen yükseklik, hipotenüsü 4 ve 9 birimlik iki parçaya ayırıyor. Yükseklik kaç birimdir? **6 birim** / 13 birim / 36 birim. Yanlışta: "Yüksekliğin karesi, iki parçanın çarpımıdır: h² = p · k." [hesaplandı: h² = 4 · 9 = 36, h = 6; çeldirici 13 = 4 + 9, 36 = h²]

### Sahne 2 · Araç seçimi

Tahta: sağda beş satırlı tablo, anlatımla satır satır dolar; her satırın başında küçük çizim: (a) iki üçgen, eşit açılar mavi; (b) iki paralel doğru ve iki kesen; (c) dik üçgen ve dik köşeden inen sarı yükseklik; (d) dik üçgen, iki dik kenar; (e) aynı kalıptan iki üçgen. Tablo: "İki açı eşit → Açı-Açı" · "Paralel doğrular → Tales" · "Dik köşeden yükseklik → Öklid" · "Dik üçgenin iki kenarı → Pisagor" · "Eş parçalar → Eşlik".

Anlatım:
1. Çözmeden önce bir strateji kurarız: hangi üçgenler, hangi araç.
2. Şekildeki ipuçları aracı gösterir.
3. İki üçgende iki açı eşitse Açı-Açı benzerliğini kullanırız.
4. Paralel doğrular parçaları orantılı böler: Tales.
5. Dik köşeden hipotenüse yükseklik inmişse Öklid işe yarar.
6. Dik üçgenin iki kenarı biliniyorsa üçüncüsünü Pisagor verir.
7. Aynı kalıptan çıkan parçalar eş üçgendir: eşliği kullanırız.
8. Bir problemde birden çok araç gerekebilir.

### Sahne 3 · Tepe ve ayna: strateji ve uygulama

Tahta: Zemin 1. Her adımda ilgili üçgen ya da hesap belirir, biten adım soluklaşır. Önce THA mavi ve KLA turuncu ayrı ayrı yan yana çizilir (küçük üçgen büyütülmüş, aynı duruşta); eşit açılar aynı renk; karşılıklı kenarlar aynı renk. Sağda hesap: "TH / 1,5 = 1200 / 2" → "TH = 900" (yeşil). Sonra THD üçgeni (T, H, D) ayrı çizilir: "TD² = 900² + 675²".

Anlatım:
1. Hakan'ın şemasına dönelim: iki dik üçgen, THA ve KLA.
2. Tablodaki ipucu: iki açı eşit, yani Açı-Açı.
3. Dik açılar eşit; aynadaki iki açı da eşit.
4. D, H ile A arasında: TAD açısı, TAH açısının aynısı.
5. Açı-Açı: THA ve KLA üçgenleri benzerdir.
6. Karşılıklı kenarlar: TH ile KL, HA ile LA.
7. Benzer üçgenlerde karşılıklı kenarlar orantılıdır.
8. Oran: TH / KL = HA / LA.
9. Sayıları yerine koyalım: TH / 1,5 = 1200 / 2.
10. 1200 bölü 2, 600 eder: TH = 1,5 × 600 = 900.
11. Tepe 900 metre yüksekliğinde.
12. Şimdi zirveden D'ye doğrusal yol: TD.
13. THD dik üçgeninde TH ve HD biliniyor: Pisagor.

Birlikte çöz (`tag: 'Birlikte çöz'`): tahtada "TD² = 900² + 675² = 1 265 625". TD kaç metredir? **1125 m** / 1575 m / 225 m. Dayandığı anlatım: 11, 13; Pisagor D5'te öğretildi. İpuçları: "1125 × 1125 = 1 265 625." · "Pisagor kenarları toplamaz; kareleri toplar." [hesaplandı: 900² = 810 000, 675² = 455 625, toplam 1 265 625 = 1125²; çeldirici 1575 = 900 + 675, 225 = 900 − 675]

Gör: TD sarı çizgi olarak 1125 yazılır.

Sonra:
14. Yürünecek yol 1125 metre.
15. TH önce bulundu; TD onsuz bulunamazdı.

### Sahne 4 · Sonucu denetle

Tahta: Zemin 1 solda; sağda üç kutu: "Şekle uyuyor mu?", "Verilenlerle çelişiyor mu?", "Birim doğru mu?". Her kutu denetlenince tik alır.

Anlatım:
1. Çözümü bitirince sonucu denetleriz.
2. Birincisi: sonuç şekle uyuyor mu?
3. TD hipotenüs: 1125 metre; dik kenarlar 900 ve 675.
4. Hipotenüs en uzun kenar: şekle uyuyor.
5. İkincisi: sonuç verilenlerle çelişiyor mu?
6. Küçük üçgende KL ÷ LA = 1,5 ÷ 2 = 0,75.
7. Büyükte TH ÷ HA = 900 ÷ 1200 = 0,75: aynı.
8. Üçüncüsü: birim. Her uzunluk metre olmalıydı.
9. 150'yi 1,5 yapmasaydık sonuç yüz kat şişerdi.

Soru (`tag: 'Sıra sende'`): Bir öğrenci |KL| yerine 150 yazıp TH = 150 × 600 = 90 000 m buldu. Kontrol ne gösterir? **Tepe 90 000 m olamaz; birim hatası var, 150 cm yerine 1,5 m yazılmalı** / Sonuç doğru; oran doğru kurulmuş / Sonuç yanlış; Açı-Açı kullanılmamalıydı. Dayandığı anlatım: 8–9. İpuçları: "BD yalnızca 1350 m; yükseklik bunun kat kat üstünde olamaz." · "150 santimetre 1,5 metreydi." [hesaplandı: 150 × 600 = 90 000 = 100 × 900]

Sonra:
10. Üç denetimden biri hata yakalayabilir.

### Sahne 5 · Çiçek deseni: eşlik

Tahta: üçgen ABC (Zemin 2) mavi; "110°" B'de; AB kısa kenar, BC uzun kenar işaretli. Sırayla: eş ikinci üçgen yansıtılıp AC üzerine yapışır: dörtgen; sekiz dörtgenle çiçek; merkezde 16 küçük açı α sarı yaylarla tam açıyı doldurur. Sağda: Verilen "m(ABC) = 110°", "|AB| < |BC|"; İstenen "m(BAC) = ?".

Anlatım:
1. Bir nakışçı aynı kartondan eş üçgenler kesiyor.
2. Üçgenin B açısı 110°; AB kenarı BC'den kısa.
3. Eş üçgenleri en uzun kenarları çakışacak biçimde birleştiriyor.
4. Her birleşim bir dörtgen veriyor; sekiz dörtgen çiçeği oluşturuyor.
5. İstenen: BAC açısı.
6. İpucu: aynı kalıptan parçalar; araç eşlik.
7. Bir dörtgende iki üçgen var: sekiz dörtgende 16 üçgen.
8. 110° en büyük açı; karşısındaki AC en uzun kenar.
9. AB kısa kenar: karşısındaki C açısı en küçük.
10. Ortada 16 küçük açı tam açı yapar: 16 × α = 360°.
11. Bölersek α = 22,5° çıkar.
12. Her üçgenin iç açıları toplamı 180°.

Birlikte çöz (`tag: 'Birlikte çöz'`): B = 110°, C = 22,5°. m(BAC) kaç derecedir? **47,5°** / 70° / 22,5°. Dayandığı anlatım: 11–12. İpuçları: "110 ile 22,5'u 180'den çıkar." · "22,5° C açısıydı; A açısı daha büyük çıkmalı." [hesaplandı: 180 − 110 − 22,5 = 47,5; çeldirici 70 = 180 − 110, 22,5 = C]

Gör: üçgenin üç açısı 110°, 47,5° ve 22,5° belirir. Kontrol: 110 + 47,5 + 22,5 = 180.

Sonra:
13. Kontrol: toplam 180°; kısa AB karşısında küçük C.
14. Aynı kalıptan parçalarla kurulan desende eşlik işe yarar.

### Sahne 6 · Stor perde: benzerlik

Tahta: Zemin 3. ABC (mavi) ve DBK (turuncu) çizilir, ardından yan yana, aynı duruşta ayrı gösterilir. Eşit açılar aynı renk; |BC| ile |BK|, |AB| ile |DB| karşılıklı kenarlar aynı renk. Sağda hesap satırları belirir.

Anlatım:
1. Stor perde problemine dönelim: iki ışın paralel.
2. Işın ile yer arasındaki açı iki üçgende de aynı.
3. İkisinde de B'de dik açı var: Açı-Açı, ABC ~ DBK.
4. Karşılıklı kenarlar: BK ile BC, DB ile AB.
5. Oran: BK / BC = DB / AB.
6. |BC| = 135 ve |BK| = 60; |AB| = 90.

Birlikte çöz (`tag: 'Birlikte çöz'`): 60 / 135 = DB / 90. |DB| kaç santimetredir? **40 cm** / 202,5 cm / 60 cm. Dayandığı anlatım: 4–6. İpuçları: "60 / 135 sadeleşince 4 / 9; DB, 90'ın 4 / 9'u." · "Küçük üçgen küçüktür: DB, AB = 90'dan kısa olmalı." [hesaplandı: 60 / 135 = 4 / 9; 90 × 4 / 9 = 40; çeldirici 202,5 = 90 × 135 / 60 (ters oran), 60 = BK]

Sonra:
7. |DB|, masaya 30 ve x'in toplamı: |DB| = 30 + x.
8. 40 = 30 + x; x = 10 santimetre.
9. Denetim: 10, ilk durumdaki 60'tan küçük. [60 = perde açıkken ışığın masa kenarından sonra ulaştığı uzaklık: |AB| − 30 = 90 − 30; şemada masa kenarı ile A arasında ölçü olarak gösterilir, |BK| = 60 ile karıştırılmaz]
10. Perde indikçe ışık masada daha az ilerler: sonuç şekle uyuyor.

Soru (`tag: 'Sıra sende'`): Aynı perde 75 cm yerine 45 cm indirilseydi x kaç cm olurdu? **30 cm** / 60 cm / 90 cm. Dayandığı anlatım: 1–10. İpuçları: "Önce yeni |BK|'yı bul: 135 − 45." · "DB, masa kenarından 30 daha uzun; x onu çıkarır." [hesaplandı: BK = 135 − 45 = 90; oran 90 / 135 = 2 / 3; DB = 90 × 2 / 3 = 60; x = 60 − 30 = 30; çeldirici 60 = DB (30 çıkarılmamış), 90 = BK] Kontrol: 30 cm, 10 cm'den büyük ve 60 cm'den küçük: perde az indi, ışık daha uzağa ulaştı.

### Sahne 7 · Yapı ve kitap: Öklid

Tahta: Zemin 4. Abide kalın dikey çubuk; Arda solda; elinde dik köşeli kitap. Sırayla: AB ve AC doğruları (A'da dik açı); AH (sarı); |BH| = 1,6 ve |AH| = 8 etiketleri; "|BC| = ?" sarı.

Anlatım:
1. Arda, Çanakkale Şehitler Abidesi'nin boyunu ölçmek istiyor.
2. Elindeki dik köşeli kitabı gözüne yaklaştırıyor.
3. Kitabın bir kenarı abidenin tepesine, öbürü dibine bakıyor.
4. Gözden tepeye ve dibe giden iki doğru dik açı yapar.
5. Gözden abideye inen AH, abideye dik.
6. Göz yerden 1,6 metre yüksekte: |BH| = 1,6.
7. Gözün abideye uzaklığı 8 metre: |AH| = 8.
8. İstenen: abidenin boyu, yani |BC|.
9. ABC dik üçgeninde dik köşeden hipotenüse yükseklik var: Öklid.

Soru (`tag: 'Sıra sende'`): Abidenin boyu kaç metredir? **41,6 m** / 40 m / 9,6 m. Dayandığı anlatım: 4–9 ve Hatırla'daki Öklid. İpuçları: "AH² = BH · CH yazılır; önce CH bulunur." · "CH yalnızca üst parça; BC = BH + CH." [hesaplandı: 8² = 1,6 · CH, CH = 64 ÷ 1,6 = 40; BC = 1,6 + 40 = 41,6; çeldirici 40 = yalnız CH, 9,6 = 8 + 1,6]

Gör: |CH| = 40 yeşil, ardından |BC| = 41,6.

Sonra:
10. 8² = 1,6 · |CH|; yani |CH| = 40 metre.
11. Abidenin boyu |BC| = 1,6 + 40 = 41,6 metre.
12. Denetim: 1,6 × 40 = 64 = 8²; sonuç tutuyor.

### Sahne 8 · Hangi araç?

Tahta: solda beş kart sırayla gelir, sağda beş kutu: Açı-Açı, Tales, Öklid, Pisagor, Eşlik.

Anlatım:
1. Her ipucu bir aracı gösterir.
2. Şimdi ipuçlarını araçlarla eşleştirelim.

Dene (eşleştirme; beş kart, her biri `tag: 'Sıra sende'`):
- "Güneş ışınları paralel; iki dik üçgende bir açı ortak": **Açı-Açı** (Gör: eşit açılar mavi yayla).
- "Üç paralel sokağı kesen iki cadde": **Tales** (Gör: paraleller mor).
- "Dik köşeden hipotenüse inen yükseklik ve iki parça": **Öklid** (Gör: sarı yükseklik).
- "Dik üçgenin iki kenarı belli, üçüncüsü aranıyor": **Pisagor** (Gör: hipotenüs).
- "Aynı kalıptan kesilmiş üçgenlerle kurulan desen": **Eşlik** (Gör: üçgenler üst üste oturur).
Dayandığı anlatım: sahne 2.

Sonra:
3. İpucunu bulan, aracı da bulur.

Defter ("Strateji"): **Aracı seç, uygula, denetle:** şekle, verilene, birime bak.

### Çıkış soruları

1. (yanılgı) Bir öğrenci dik kenarları 6 ve 8 olan dik üçgende hipotenüsü 14 buldu ve kontrol etmeden bıraktı. Hangisi hatayı gösterir? **14² = 196, oysa 6² + 8² = 100; hipotenüs 10 olmalı** / 14, 8'den büyük olduğu için sonuç doğru / Hipotenüs hiç denetlenmez. (sahne 4) [hesaplandı: 36 + 64 = 100, √100 = 10; 14² = 196]
2. (yeni durum) Aynı anda 2 m'lik bir sopanın gölgesi 3 m, bir direğin gölgesi 12 m. Direk kaç metredir? **8 m** / 18 m / 9 m. (sahne 3, 6) [hesaplandı: 2 / 3 = h / 12, h = 8; çeldirici 18 = 12 × 3 / 2 (ters oran), 9 = 12 − 3 (fark)]
3. (yeni durum) Eş üçgenlerden kurulan bir desende 12 üçgenin en küçük açıları ortada tam açıyı dolduruyor. En küçük açı kaç derecedir? **30°** / 12° / 60°. (sahne 5) [hesaplandı: 360 ÷ 12 = 30; çeldirici 12 = üçgen sayısı, 60 = 360 ÷ 6]
4. (yeni durum) Arda'nın yöntemiyle bir abide ölçülüyor: göz yerden 1,5 m yüksekte, abideye uzaklık 6 m. Abide kaç metredir? **25,5 m** / 24 m / 9 m. (sahne 7) [hesaplandı: 6² = 1,5 · CH, CH = 24; BC = 25,5; çeldirici 24 = yalnız CH, 9 = 6 × 1,5]
5. Hakan'ın problemindeki iki hesaptan hangisi önce yapılır ve neden? **TH önce: TD'yi bulmak için TH gerekir ve onu benzerlik verir** / TD önce: Pisagor her zaman ilk kullanılır / İkisinin sırası yoktur. (sahne 3)

Özet: İpucuna bakıp aracı seç: Açı-Açı, Tales, Öklid, Pisagor ya da eşlik. · Bir hesap öbürünün girdisi olabilir. · Sonucu şekle, verilenlere ve birime göre denetle. · **Aracı seç, uygula, sonucu denetle.**

## E3 · Kısa yol ve çıkmaz yol

- **Fikir:** Çözdükten sonra yola geri bakılır: aynı problemin iki çözümü yan yana konur, hangi yolun kısa olduğu ve hangi denemenin sonuca götürmediği bulunur.
- **Program dayanağı:** MAT.9.4.5 (g). Dersin bölünmesi: `../PLAN.md` bölüm 7, karar 14.
- **Giriş ekranı sorusu:** Arkadaşın aynı problemi başka yoldan çözdü; hangisi daha kısa, hangi deneme hiç sonuca varmaz?
- **Kaynak:** Ders kitabı s. 81 (17. sıra sizde, gözlem kulesi: |AB| = 6, |BC| = 8, |BH| istenir), s. 84 (Kontrol Noktası: "problem farklı yollarla çözülür ve çözümler karşılaştırılır"), s. 77–78 (soru 7–10: çözümü kontrol etme, başarısız stratejileri belirleme). Kitap bu problemi çözmüyor, iki yol ve çıkmaz yol göstermiyor; ikisi de A–D araçlarıyla senaryoda kurulmuştur ve adım adım denetlenmiştir.
- **Sınır:** Yeni teorem ve yeni formül yok. "h = dik kenarların çarpımı ÷ hipotenüs" kural olarak yazılmaz; iki yol işlem olarak yürütülür. Alan yöntemi kullanılmaz (öğretilmiş araç değildir). Stratejinin hangi tür problemlere uyduğu ve çıkarımın başka problemlerle sınanması (4.5.ğ, h) E4'tedir; bu derste yalnızca gözlem kulesi problemi vardır.
- **Güç kavramlar ve gösterimi:** (1) İki çözüm iki sütunda, adım sayılarıyla; sonuçlar yan yana yeşil. (2) Çıkmaz yol gri kesikli çizgiyle biter; tıkandığı yere gri çarpı konur ve eksik bilgi yazılır. (3) Sınıflandırma: dört kart, iki kutu ("Sonuca varır", "Sonuca varmaz").
- **Hedeflenen yanılgı:** "Sonuca varmayan deneme boşa gitmiştir."
- **Akılda kalıcı cümle:** Kısa yolu seç, tıkanınca eksiği söyle.


Zemin 1 (gözlem kulesi): 14 sütun, 11 satır; 1 birim = 1 m. A (3, 10), B (9, 10), C (9, 2), H (5.16, 7.12). |AB| = 6, |BC| = 8, |AC| = 10; |AH| = 3.6, |HC| = 6.4, |BH| = 4.8. B'de dik açı (kule yere dik); H'de dik açı (BH ⟂ AC). Kule: B'den C'ye kalın dikey çizgi, C'de yatay küçük platform (8, 2)–(11, 2); merdiven A'dan C'ye kalın eğik çizgi; BH sarı (yükseklik ve destek direği). ABC mavi, AHB turuncu.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (E2) Şekilde dik köşeden hipotenüse inen bir yükseklik var. İpucu hangi aracı gösterir? **Öklid** / Tales / Eşlik. Yanlışta: "Dik köşeden hipotenüse yükseklik varsa Öklid işe yarar; paralel doğrular Tales'i, aynı kalıp eşliği gösterir."
2. (D4) Dik üçgende bir dik kenar 3, hipotenüs 5 birim. Bu dik kenarın hipotenüs üzerindeki parçası kaç birimdir? **1,8 birim** / 0,6 birim / 2 birim. Yanlışta: "Dik kenarın karesi, hipotenüs çarpı kendi parçasıdır: c² = p · a." [hesaplandı: 3² = p · 5, p = 9 ÷ 5 = 1,8; çeldirici 0,6 = 3 ÷ 5, 2 = 5 − 3]

### Sahne 2 · Gözlem kulesi

Tahta: Zemin 1; yalnızca kule, merdiven ve yer çizgisi. Etiketler anlatımla belirir: 6, 8; BH sarı; B ve H'de dik açı kareleri.

Anlatım:
1. Bir gözlem kulesine merdivenle çıkılıyor.
2. Merdivenin yere değdiği A, kuleden 6 metre uzakta.
3. Kule yerden 8 metre yüksek: |BC| = 8.
4. Kule yere dik: B'de dik açı.
5. Merdivenin altına, B'den merdivene dik bir destek direği giriyor.
6. Destek direği merdivene H'de dik açı yapıyor.
7. İstenen: destek direğinin boyu, yani |BH|.
8. ABC dik üçgeninde dik köşeden hipotenüse yükseklik var.

### Sahne 3 · Birinci yol: Öklid

Tahta: Zemin 1 solda; sağda "Birinci yol · Öklid" başlığı altında dört adım sırayla belirir, hesaplananlar yeşil. Şeklin üzerinde adımın ilgili parçası vurgulanır.

Anlatım:
1. Dik köşeden inen yükseklik var: Öklid akla gelir.
2. Öklid için önce hipotenüsü bilmeliyiz: |AC|.
3. Adım 1, Pisagor: 36 + 64 = 100, |AC| = 10 metre.
4. Adım 2, Öklid: |AB|² = |AH| · |AC|.
5. 36 = |AH| · 10; yani |AH| = 3,6 metre.
6. Adım 3: |HC| = 10 − 3,6 = 6,4 metre.
7. Adım 4, Öklid: |BH|² = |AH| · |HC|.
8. |BH|² = 3,6 · 6,4 = 23,04.
9. 4,8 × 4,8 = 23,04; yani |BH| = 4,8 metre.
10. Birinci yol dört adımda sonuca vardı.

Hesap denetimi (yazar için): 6² + 8² = 100; √100 = 10; 36 ÷ 10 = 3,6; 10 − 3,6 = 6,4; 3,6 × 6,4 = 23,04; 4,8² = 23,04. [hesaplandı]

### Sahne 4 · İkinci yol: benzerlik

Tahta: Zemin 1 solda; sağda "İkinci yol · benzerlik" başlığı altında üç adım belirir. Şekilde AHB üçgeni (turuncu) kesilip çıkarılır, döndürülür ve ABC (mavi) ile aynı duruşta yan yana dizilir; A'daki ortak açı mavi, dik açılar kare işaretli, kalan açı yeşil; karşılıklı kenarlar aynı renk.

Anlatım:
1. Şimdi aynı problemi benzer üçgenle çözelim.
2. Adım 1 aynı: Pisagor ile |AC| = 10 metre.
3. ABC ve AHB üçgenlerinde A açısı ortak.
4. Birinde B, ötekinde H dik açı: Açı-Açı, ABC ~ AHB.
5. Karşılıklı kenarlar: BC ile BH, AC ile AB.
6. Adım 2, oran: |BC| / |BH| = |AC| / |AB|.
7. 8 / |BH| = 10 / 6.

Birlikte çöz (`tag: 'Birlikte çöz'`): 8 / |BH| = 10 / 6. |BH| kaç metredir? **4,8 m** / 7,5 m / 13,3 m. Dayandığı anlatım: 5–7. İpuçları: "İçler dışlar çarpımı: 8 · 6 = 10 · |BH|." · "BH, BC'den kısa olmalı: 8'den küçük." [hesaplandı: 48 ÷ 10 = 4,8; çeldirici 7,5 = 10 · 6 ÷ 8, 13,3 = 8 · 10 ÷ 6]

Sonra:
8. Adım 3: |BH| = 8 · 6 ÷ 10 = 4,8 metre.
9. İkinci yol üç adımda sonuca vardı.

### Sahne 5 · İki yol yan yana

Tahta: iki sütun: "Birinci yol · Öklid" (4 adım: |AC| = 10 · |AH| = 3,6 · |HC| = 6,4 · |BH| = 4,8) ve "İkinci yol · benzerlik" (3 adım: |AC| = 10 · oran · |BH| = 4,8). İki sütunun altında aynı sonuç, yan yana yeşil: "|BH| = 4,8 m". Kısa yolun sütununa küçük bir yıldız işareti.

Anlatım:
1. İki yol da aynı sonucu verdi: 4,8 metre.
2. Sonuç aynı çıkınca çözümden daha emin oluruz.
3. Benzerlik yolu üç adım, Öklid yolu dört adım.
4. Aynı sonuca daha az adımda varan yol kısa yoldur.
5. Öklid yolu daha uzun, ama işe yaradı.

Soru (`tag: 'Sıra sende'`): İki yolu karşılaştırınca hangi yol "kısa yol" sayılır? **Aynı sonuca daha az adımda varan** / Daha çok formül kullanan / Daha uzun hesap yapan. Dayandığı anlatım: 3–4. İpuçları: "Burada üç adımlı yol hangisiydi?" · "Kısa yol, sonuca daha çabuk ulaşan yoldur."

Sonra:
6. Kısa yol seçilir, uzun yol da sonucu denetler.

### Sahne 6 · Çıkmaz yol

Tahta: Zemin 1 solda; sağda gri başlık "Sonuca götürmeyen deneme". Birinci deneme: ABH üçgeni vurgulanır; "|AH|² + |BH|² = 6²" yazılır; altında "bilinmeyen: |AH|, |BH|" ve gri çarpı. İkinci deneme: şekle paralel doğru aranır; gri çarpı ve "paralel doğru yok".

Anlatım:
1. Her deneme sonuca varmaz.
2. Pisagor'u hemen ABH üçgeninde deneyelim.
3. |AH|² + |BH|² = 6² yazılır.
4. İki bilinmeyen var: |AH| ve |BH|.
5. Tek eşitlikten iki sayı bulunmaz: yol tıkandı.
6. Eksik bilgi: |AH| ya da |BH|'den biri.
7. Birinci yolda |AH| önce bulunmuştu; eksiği o tamamladı.
8. Bir deneme daha: Tales.
9. Tales için paralel doğrular gerekir.
10. Şekilde paralel doğru yok: bu yol da kapalı.

Soru (`tag: 'Sıra sende'`): Kule problemini Tales ile çözmek için hangi bilgi eksiktir? **Paralel doğrular** / Dik açı / Hipotenüsün uzunluğu. Dayandığı anlatım: 8–10. İpuçları: "Tales hangi çizgilerle çalışır?" · "Dik açı şekilde zaten var; hipotenüs Pisagor'la bulunuyor." [çeldirici: dik açı ve hipotenüs bilgisi eksik değil]

Sonra:
11. Eksik bilgiyi bilmek, bir sonraki denemeyi yönlendirir.

### Sahne 7 · Hangi yol sonuca varır?

Tahta: solda dört kart sırayla gelir, sağda iki kutu: "Sonuca varır", "Sonuca varmaz".

Anlatım:
1. Son olarak denemeleri ayıralım.
2. Sonuca varan ve varmayan yolları ayıracağız.

Dene (sınıflandırma; dört kart, her biri `tag: 'Sıra sende'`): Kartı doğru kutuya koy.
- "Kuleyi benzerlikle çözmek": **Sonuca varır** (3 adım).
- "Kuleyi Öklid ile çözmek": **Sonuca varır** (4 adım).
- "Kuleyi yalnızca ABH'de Pisagor ile çözmek": **Sonuca varmaz**. İpucu: "Bilinmeyen iki tane, eşitlik bir tane." Gör: gri çarpı, eksik bilgi |AH|.
- "Kuleyi Tales ile çözmek": **Sonuca varmaz**. İpucu: "Şekilde paralel doğru var mı?" Gör: gri çarpı, eksik bilgi paralel doğru.
Dayandığı anlatım: sahne 3–6.

Defter ("Yola bak"): **Kısa yol az adımda varır; çıkmaz yolda eksik bilgiyi söyle.**

### Çıkış soruları

1. (yanılgı) Bir öğrenci kule problemini Tales ile çözmeyi denedi, şekilde paralel doğru bulamadı ve "Bu deneme boşa gitti" dedi. Hangisi doğrudur? Boşa gitti: sonuca varmayan deneme hiçbir şey kazandırmaz / **Boşa gitmedi: tıkanılan yer ve eksik bilgi (paralel doğru) bulundu; sonraki deneme buna göre seçilir** / Boşa gitmedi: Tales kuleyi de çözer. (sahne 6) [mantık denetimi, sayı yok: sahne 6 satır 8–11; çeldirici 1 sahne 6 satır 11'e, çeldirici 2 satır 10'a ters]
2. (yeni durum) ABC üçgeninde bir doğru parçası çizilmiş; BC'ye paralel olup olmadığı verilmemiş. Bir öğrenci x'i Tales ile bulmaya çalışıp tıkanıyor. Hangi bilgi eksiktir? Üçgenin ikizkenar olması / Üçgenin dik olması / **Doğru parçasının BC'ye paralel olduğu**. (sahne 6) [mantık denetimi, sayı yok: Tales paralel doğru ister (sahne 6 satır 9); ikizkenar ve dik olma Tales'in koşulu değildir]
3. (yeni durum) Gözlem kulesi bu kez başka sayılarla kuruluyor: B'de dik açı var, |AB| = 5 m ve |BC| = 12 m. Destek direği |BH| benzerlik yoluyla bulunacak. Doğru oran hangisidir? **12 / |BH| = 13 / 5** / 12 / |BH| = 5 / 13 / 5 / |BH| = 12 / 13. (sahne 4) [hesaplandı: 5² + 12² = 169, |AC| = 13; ABC ~ AHB, |BC| / |BH| = |AC| / |AB| = 13 / 5 (sahne 4 ile aynı karşılıklar); doğru oranla |BH| = 12 · 5 ÷ 13 ≈ 4,6 < 5; çeldirici 12 / |BH| = 5 / 13 oran ters, |BH| = 31,2 çıkardı (BC'den uzun); çeldirici 5 / |BH| = 12 / 13 AB ile BH karıştırılmış, |BH| = 65 ÷ 12 ≈ 5,4 çıkardı (AB = 5'ten uzun)]
4. (çıkmaz yol) Bir öğrenci dik kenarları 6 ve 8 olan üçgende yüksekliği hemen |BH|² = p · k ile bulmaya çalışıyor ve tıkanıyor. Neden? **p ve k parçaları bilinmiyor; önce onlar bulunmalı** / |BH| bilinmiyor / Öklid dik üçgende kullanılmaz. (sahne 6, 3) [hesaplandı: p = 3,6, k = 6,4 sonra bulunur]
5. İki yolla aynı sonucu bulan öğrenci için hangisi doğrudur? **Sonuca daha çok güvenebilir; iki yol birbirini denetledi** / Biri mutlaka yanlıştır / İki yol aynı sayıda adımdan oluşur. (sahne 5)

Özet: Aynı problemin iki çözümü karşılaştırılır; az adımda varan yol kısa yoldur. · Çıkmaz yolda tıkanılan yer ve eksik bilgi söylenir. · Uzun yol da sonucu denetler. · **Kısa yolu seç, tıkanınca eksiği söyle.**

## E4 · Bu yol başka nerede işe yarar?

- **Fikir:** Çözüme ulaştıran yol başka problemlerde sınanır: hangi tür problemde işe yaradığı, hangisinde yaramadığı bulunur; çıkarım sayılar değiştirilerek ve yeni problemlerle doğrulanır.
- **Program dayanağı:** MAT.9.4.5 (ğ, h). Dersin bölünmesi: `../PLAN.md` bölüm 7, karar 14.
- **Giriş ekranı sorusu:** Bir problemde işe yarayan yol, başka hangi problemlerde de işe yarar?
- **Kaynak:** Ders kitabı s. 83 (18. sıra sizde, iki lamba direği: 6 m, 10 m, 18 m, Necati 2 m; a ve b), s. 81 (17. sıra sizde, gözlem kulesi; derste yalnızca sayıları değiştirilir, 9–12–15 ve 3–4–5 örnek veridir), s. 84 (Kontrol Noktası: stratejinin başka durumlarda kullanılıp kullanılamayacağı), s. 77–78 (soru 7–10: stratejinin başka problemlere uygunluğu). Kitap lamba problemini ve sayıları değişmiş kuleyi çözmüyor; çözümler A–D araçlarıyla senaryoda kurulmuştur ve adım adım denetlenmiştir. Öğrenci gözlem kulesini (iki yol, çıkmaz yol) E3'ten, stor perdeyi E2'den bilir.
- **Sınır:** Yeni teorem ve yeni formül yok. "h = dik kenarların çarpımı ÷ hipotenüs" kural olarak yazılmaz. Alan yöntemi kullanılmaz. Gözlem kulesi bu derste yeniden çözülmez; yalnızca sayıları değişir, E3'ün iki yolu aynen yürütülür.
- **Güç kavramlar ve gösterimi:** (1) Genelleme: üç problem satırlı, iki yol sütunlu tablo; çalışan hücre yeşil tik, çalışmayan gri çarpı. (2) Sayı değişince iki yol iki sütunda yan yana, sonuçlar yeşil. (3) Yol çalışmıyorsa nedeni şekilde gösterilir: dik köşeden inen yükseklik yok (gri çarpı).
- **Hedeflenen yanılgı:** "Bir problemde işe yarayan yol her problemde işe yarar."
- **Akılda kalıcı cümle:** Yolu ipucuna göre seç, birçok örnekle sına.

Zemin 1 (lamba direkleri): 22 sütun, 11 satır; 1 birim = 1 m; yer satır 10. A (2, 10), K (8, 10), B (20, 10); lamba tepeleri P (2, 4) (6 m) ve Q (20, 0) (10 m); Necati K'de, başı N (8, 8) (2 m); L (5, 10), M (11, 10); |KL| = |KM| = 3, |AK| = 6, |KB| = 12, |AM| = 9, |BL| = 15. Işınlar P'den N'ye ve M'ye, Q'dan N'ye ve L'ye; ikisi N'de kesişir. b) için: K′ (14, 10), N′ (14, 8), ışın P'den N′ üzerinden B'ye (20, 10): gölgenin ucu B'nin dibinde.

Zemin 2 (9–12–15 kulesi): 12 sütun, 14 satır; 1 birim = 1 m. A (1, 13), B (10, 13), C (10, 1), H (4.24, 8.68). |AB| = 9, |BC| = 12, |AC| = 15, |AH| = 5.4, |HC| = 9.6, |BH| = 7.2.

Zemin 3 (küçük şemalar, yalnızca sahne 5): tablo satırı yüksekliğinde, etiketsiz. Gözlem kulesi E3'ün Zemin 1'i, stor perde E2'nin Zemin 3'ü, lamba direkleri bu dersin Zemin 1'i küçültülmüş hâlidir.

### Sahne 1 · Hatırla

Anlatım: Başlamadan önce iki şeyi hatırlayalım.

1. (E3) Gözlem kulesinde destek direğinin boyunu hangi iki yol buldu? Tales ve Öklid / **Benzerlik ve Öklid** / ABH'de Pisagor ve Tales. Yanlışta: "Kulede benzerlik ve Öklid sonuca vardı; Tales için paralel doğru, ABH'de Pisagor için ikinci bilgi eksikti."
2. (B4) İki üçgende bir açı ortak ve ikisinde de birer dik açı var. Bu üçgenler için hangisi söylenir? Eştirler / Benzer değildirler, çünkü üçüncü açı verilmemiş / **Benzerdirler: Açı-Açı**. Yanlışta: "İki açı eşitse üçgenler benzerdir (Açı-Açı); üçüncü açı kendiliğinden eşit olur."

### Sahne 2 · Başka problemde sınama: iki lamba direği

Tahta: Zemin 1. Önce yalnızca iki direk, Necati ve ışınlar; anlatımla etiketler belirir: 6, 10, 18, 2; gölge boyları KL ve KM yeşil "s" ile işaretlenir. Sonra PAM (mavi) ve NKM (turuncu) ayrı çizilir.

Anlatım:
1. Bir yolun işe yarayıp yaramadığını başka problemde sınarız.
2. Yolda A ve B'de iki lamba direği var: 6 ve 10 metre.
3. A ile B arası 18 metre.
4. Aralarında 2 metre boyunda Necati duruyor: K noktası.
5. İki lambanın gölgesi, Necati'nin iki yanında eşit uzunlukta.
6. İstenen: bir gölgenin boyu, |KL| = |KM| = s.
7. Önce Öklid'i deneyelim: dik köşeden hipotenüse inen yükseklik gerekir.
8. Şekilde böyle bir yükseklik yok: Öklid burada çıkmaz.
9. Benzerliği deneyelim: direkler ve Necati yere dik.
10. M açısı ortak; A ve K'de dik açı: PAM ~ NKM.
11. Karşılıklı kenarlar: PA ile NK, AM ile KM.
12. Oran: |PA| / |NK| = |AM| / |KM|.
13. Yani 6 / 2 = |AM| / s.

Birlikte çöz (`tag: 'Birlikte çöz'`): 6 / 2 = |AM| / s. |AM|, s'nin kaç katıdır? **3 katı** / 2 katı / 6 katı. Dayandığı anlatım: 10–13. İpuçları: "6 ÷ 2 kaç eder?" · "AM, s ile çarpılınca 6 / 2 oranını verir." [hesaplandı: 6 ÷ 2 = 3; çeldirici 2 = NK, 6 = PA]

Sonra:
14. |AM| = |AK| + s olduğundan |AK| = 3s − s = 2s.
15. B lambası için aynı yol: 10 / 2 = |BL| / s.
16. Yani |BL| = 5s.
17. |BL| = |BK| + s olduğundan |BK| = 4s.
18. |AK| + |KB| = 18: 2s + 4s = 18.
19. 6s = 18; yani s = 3 metre.
20. Denetim: |AK| = 6, |BK| = 12; 6 + 12 = 18.
21. A için 6 / 9 = 2 / 3: Necati'nin oranıyla aynı.
22. B için 10 / 15 = 2 / 3: o da tutuyor.

Hesap denetimi (yazar için): 6 ÷ 2 = 3; AM = 3s; AK = 2s; 10 ÷ 2 = 5; BL = 5s; BK = 4s; 6s = 18, s = 3; AK = 6, BK = 12, AM = 9, BL = 15; 6 / 9 = 2 / 3; NK / KM = 2 / 3; 10 / 15 = 2 / 3. [hesaplandı]

### Sahne 3 · Gölge direği geçmesin

Tahta: Zemin 1'in b) bölümü: K′ ve N′ soluk; ışın P'den B'nin dibine kadar. Sağda "istenen: yürünen mesafe".

Anlatım:
1. Necati B'ye doğru yürüyor.
2. A lambasının gölgesi B direğini geçmesin.
3. En uzak durumda gölgenin ucu tam B'nin dibinde.
4. O zaman |AM| = 18.

Soru (`tag: 'Sıra sende'`): Necati en fazla kaç metre yürüyebilir? **6 m** / 3 m / 12 m. Dayandığı anlatım: sahne 2, 10–13 ve bu sahnenin 1–4. İpuçları: "PAM ~ NK′M: 6 / 2 = 18 / |K′M|; önce |K′M| bulunur." · "Yürüdüğü yol, |AK′| − |AK| farkıdır." [hesaplandı: 6 / 2 = 18 / |K′M| → |K′M| = 6; |AK′| = 18 − 6 = 12; yürünen = 12 − 6 = 6; çeldirici 3 = ilk gölge s, 12 = |AK′| (başlangıç farkı alınmamış)]

Gör: Necati K′'ye yürür; gölgenin ucu B'nin dibine oturur; K′ ile K arası 6 yeşil.

Sonra:
5. Aynı benzerlik yolu bu soruya da yetti.

### Sahne 4 · Sayılar değişince

Tahta: Zemin 2 (kenarları 9 ve 12 olan kule; E3'ün gözlem kulesi, yeni sayılarla). Solda "Benzerlik", sağda "Öklid" sütunu; adımlar sırayla belirir.

Anlatım:
1. Gözlem kulesinde çıkarımı başka sayılarla sınayalım: dik kenarlar 9 ve 12.
2. Pisagor: 81 + 144 = 225; |AC| = 15.
3. Benzerlik: |BC| / |BH| = |AC| / |AB|.
4. Yani 12 / |BH| = 15 / 9.
5. Buradan |BH| = 12 · 9 ÷ 15 = 7,2.
6. Öklid: 81 = |AH| · 15; |AH| = 5,4.
7. |HC| = 15 − 5,4 = 9,6.
8. |BH|² = 5,4 · 9,6 = 51,84.
9. 7,2 × 7,2 = 51,84; iki yol yine aynı: 7,2.
10. Sayılar değişti, yollar değişmedi; sonuçlar yine aynı çıktı.

Soru (`tag: 'Sıra sende'`): Dik kenarları 3 ve 4 olan bir kulede, hipotenüse inen destek direği kaç birimdir? **2,4 birim** / 2,5 birim / 1,8 birim. Dayandığı anlatım: E3 sahne 4 ve bu dersin sahne 4. İpuçları: "Önce hipotenüs: 9 + 16 = 25, yani 5." · "Oran: 4 / |BH| = 5 / 3 (BC = 4, AB = 3)." [hesaplandı: AC = 5; 4 ÷ BH = 5 ÷ 3, BH = 12 ÷ 5 = 2,4; çeldirici 2,5 = AC ÷ 2, 1,8 = 9 ÷ 5 (AH)] Öklid yoluyla denetim: 9 = |AH| · 5, |AH| = 1,8; |HC| = 3,2; 1,8 · 3,2 = 5,76 = 2,4². [hesaplandı]

Sonra:
11. Bir yolun işe yaradığını bir örnekle değil, birçok örnekle sınarız.

### Sahne 5 · Hangi yol hangi probleme?

Tahta: üç satırlı, iki sütunlu tablo (sayı ve kısa etiket): satırlar "Gözlem kulesi", "Lamba direkleri", "Stor perde"; sütunlar "Öklid", "Benzerlik". Hücreler anlatımla dolar: kule ✓ ✓; lamba ✗ ✓; perde ✗ ✓. Satırların yanında küçük şema.

Anlatım:
1. Üç problemi iki yola göre inceleyelim.
2. Benzerlik üçünde de işe yaradı.
3. Öklid yalnızca dik köşeden hipotenüse yükseklik varken çalıştı.
4. Işık, gölge ve paralel ışınlarda benzer üçgen aranır.
5. Yükseklik varsa iki yol da denenebilir.

Soru (`tag: 'Sıra sende'`; yeni durum): Hangi problemde Öklid yolu işe yaramaz? **Bir direğin gölgesinden direğin boyunu bulma** / Dik üçgende hipotenüse inen yüksekliği bulma / Dik kenarın hipotenüs üzerindeki parçasını bulma. Dayandığı anlatım: 3–5. İpuçları: "Gölge probleminde dik köşeden inen yükseklik var mı?" · "Öklid, hipotenüse inen yükseklikle çalışır."

Sonra:
6. Yolu, problemin ipucuna göre seçeriz.

### Sahne 6 · Hangi yol hangi problemde sonuca varır?

Tahta: solda dört kart sırayla gelir, sağda iki kutu: "Sonuca varır", "Sonuca varmaz".

Anlatım:
1. Şimdi yolları problemlere göre ayıralım.

Dene (sınıflandırma; dört kart, her biri `tag: 'Sıra sende'`): Kartı doğru kutuya koy.
- "Lambayı Öklid ile çözmek": **Sonuca varmaz**. İpucu: "Dik köşeden hipotenüse inen yükseklik yok." Gör: gri çarpı.
- "9–12–15 kuleyi Öklid ile çözmek": **Sonuca varır**. İpucu: "Kulede dik köşeden hipotenüse inen yükseklik var." Gör: yeşil tik, 7,2.
- "Lambayı benzerlikle çözmek": **Sonuca varır**. Gör: yeşil tik, s = 3.
- "Stor perdeyi Öklid ile çözmek": **Sonuca varmaz**. İpucu: "Perdede dik köşeden hipotenüse inen yükseklik var mı?" Gör: gri çarpı.
Dayandığı anlatım: sahne 2–5.

Defter ("Yol seçimi"): **Işık ve gölgede benzerlik; yükseklik varsa Öklid de denenir.**

### Çıkış soruları

1. (yanılgı) Bir öğrenci "Kulede Öklid işe yaradı, lamba problemlerinde de işe yarar" diyor. Hangisi doğrudur? **Öklid yalnızca dik köşeden hipotenüse yükseklik varken çalışır; lambada yok** / Doğru, Öklid her problemde çalışır / Yanlış, çünkü Öklid hiçbir problemde çalışmaz. (sahne 5)
2. (yeni durum) Dik kenarları 12 ve 16 olan dik üçgende hipotenüse inen yükseklik kaç birimdir? **9,6 birim** / 7,2 birim / 10 birim. (sahne 4) [hesaplandı: hipotenüs 20; 16 · 12 ÷ 20 = 9,6; Öklid: 144 = p · 20, p = 7,2; q = 12,8; 7,2 · 12,8 = 92,16 = 9,6²; çeldirici 7,2 = p parçası, 10 = hipotenüsün yarısı]
3. (yeni durum) Lamba problemi aynı lambalarla (6 m ve 10 m), ama A ile B arası 24 m olsaydı gölge boyu s kaç metre olurdu? **4 m** / 3 m / 6 m. (sahne 2) [hesaplandı: AK = 2s, BK = 4s; 6s = 24; s = 4; çeldirici 3 = eski cevap, 6 = AK(18 durumunda)]
4. (yeni durum) Lamba problemindeki Necati A lambasından 6 m, B lambasından 12 m uzakta duruyor (lambalar 6 m ve 10 m, Necati 2 m, A ile B arası 18 m). Bu kez B lambasının gölgesi A direğini geçmesin diye Necati A'ya doğru yürüyor. Gölgenin ucu tam A'nın dibine gelene kadar en fazla kaç metre yürüyebilir? 3,6 m / **2,4 m** / 14,4 m. (sahne 2, 3) [hesaplandı: gölge boyu ℓ; B lambası ve Necati yere dik, L ortak açı: 10 / 2 = 18 / ℓ, ℓ = 3,6; B'ye uzaklık 18 − 3,6 = 14,4; yürüdüğü yol 14,4 − 12 = 2,4; çeldirici 3,6 = gölge boyu, 14,4 = |BK′| (başlangıç farkı alınmamış, sahne 3 çeldiricisinin aynısı)]

Özet: Bir yol her probleme uymaz; ipucuna göre seçilir. · Öklid yalnızca dik köşeden inen yükseklik varken çalışır; benzerlik ışık ve gölgede çalışır. · Yol, birçok örnekle sınanır. · **Yolu ipucuna göre seç, birçok örnekle sına.**

## E5 · Konu tekrarı: Eşlik ve benzerlik problemleri (`e5-tekrar.html`, 1 sahne + 8 soru)

Yeni bilgi yok. Tek sahne ("Konunun kuralları"): altı kural tahtada sırayla toplanır, her biri küçük çizimiyle (verilen/istenen tablosu · ipucu → araç tablosu · iki dik üçgen ve oran · üç tikli denetim kutuları · iki sütunlu iki yol · gri çarpılı çıkmaz yol) ve deftere düşer. Biten kural soluklaşır.

Anlatım:
1. Bu konuda öğrendiklerimizi altı kuralda toplayalım.
2. Önce verilen ve istenen, sonra ilişki, sonra şekil.
3. Şekildeki ipucu aracı gösterir: eşit açı, paralel, yükseklik, dik üçgen.
4. Araçları sırayla uygularız; bir sonuç öbürünün girdisi olur.
5. Sonucu şekle, verilenlere ve birime göre denetleriz.
6. İki yol aynı sonucu verirse çözüm sağlamlaşır.
7. Çıkmaz yolda eksik bilgiyi söyleriz; her yol her probleme uymaz.

Defter ("Problem çözme"): **Verilen, istenen, şekil; araç, uygulama, denetim; yola bak.**

Sorular (`quiz`, karışık sırada):

1. Bir merdiven duvara dayalı: 17 m boyunda, duvardaki ucu yerden 15 m yüksekte. Yerdeki ucu duvardan kaç m uzaktadır? **8 m** / 2 m / 64 m. — E1 (şekle dök), Pisagor [hesaplandı: 17² − 15² = 289 − 225 = 64, √64 = 8; çeldirici 2 = 17 − 15, 64 = karesi]
2. Aynı anda 1,5 m boyundaki çocuğun gölgesi 2 m; bir direğin gölgesi 12 m. Direk kaç metredir? **9 m** / 16 m / 10,5 m. — E2 [hesaplandı: 1,5 / 2 = h / 12, h = 9; çeldirici 16 = 12 × 2 / 1,5 (ters oran), 10,5 = 12 − 1,5 (fark)]
3. Gonca'nın evi H'de. Zemine dik 200 cm'lik bir sopanın T ucuna, kenarları dik açı yapan bir cetvelin köşesi takılmış; bir kenar boyunca bakınca yerdeki A noktası (|AH| = 5 cm) görülüyor, öbür kenar boyunca bakınca Halûk'un evi görülüyor. Halûk'un evi Gonca'nın evinden kaç m uzaktadır? **80 m** / 40 m / 8 m. — E2 (Öklid) [hesaplandı: T'de dik açı, TH dik köşeden hipotenüse yükseklik; 200² = 5 · |HX|, |HX| = 40 000 ÷ 5 = 8000 cm = 80 m; çeldirici 40 = 200 ÷ 5 (birimsiz), 8 = 8000 cm'in yanlış çevrilmesi]
4. Stor perde problemi (masa 75 cm, perdeye 30 cm, ışık masada 60 cm ulaşıyor; perde 75 cm iniyor) için bir öğrenci x = 100 cm buldu. Hangi denetim hatayı gösterir? **Perde indikçe ışık daha az ilerler; x, 60'tan küçük olmalıydı** / x her zaman 100 olur / Birim santimetre olduğu için doğrudur. — E2 (kontrol) [hesaplandı: doğru x = 10 < 60; 100 > 60 şekle uymaz]
5. 15 eş üçgenin en küçük açıları ortada tam açıyı dolduruyor. Üçgenin bir açısı 100° ise üçüncü açısı kaç derecedir? **56°** / 24° / 80°. — E2 (eşlik) [hesaplandı: 360 ÷ 15 = 24; 180 − 100 − 24 = 56; çeldirici 24 = en küçük açı, 80 = 180 − 100]
6. Dik kenarları 15 ve 20 olan dik üçgende hipotenüse inen yükseklik kaç birimdir? **12 birim** / 9 birim / 12,5 birim. — E4 (sayılar değişince) [hesaplandı: hipotenüs 25; 15 · 20 ÷ 25 = 12; Öklid: 225 = p · 25, p = 9; q = 16; 9 · 16 = 144 = 12²; çeldirici 9 = p parçası, 12,5 = hipotenüsün yarısı]
7. Bir kulenin gölgesi 40 m, aynı anda 2 m'lik sopanın gölgesi 5 m. Kulenin boyunu bulmak için Öklid denenirse ne olur? **Çıkmaz: dik köşeden hipotenüse inen yükseklik yok; benzerlik kullanılmalı** / İşe yarar: Öklid her problemde çalışır / İşe yarar: gölge, yüksekliktir. — E3 (çıkmaz yol), E4 (yol seçimi) [hesaplandı: benzerlikle 2 / 5 = h / 40, h = 16 m]
8. Arda'nın yöntemiyle bir abide ölçülüyor: göz yerden 2 m yüksekte, abideye uzaklık 6 m. Abide kaç metredir? **20 m** / 18 m / 12 m. — E2 (Öklid) [hesaplandı: 6² = 2 · CH, CH = 18; BC = 2 + 18 = 20; çeldirici 18 = yalnız CH, 12 = 6 × 2]

Akılda kalıcı cümle: Önce şekle dök, aracı seç, denetle, yola bak.

## Program metniyle karşılaştırma (9 Ekim 2026)

| Programın istediği (MAT.9.4.5) | Karşılığı |
|---|---|
| a) Problemin verilen ve istenenlerine ilişkin parçaları belirler | E1 sahne 3 (Hakan), sahne 6–7 (perde; verilen/istenen/ara değer sınıflandırması) |
| b) Verilenler, istenenler ve gerekli işlemler arasındaki ilişkileri belirler | E1 sahne 4 (ikizkenar, orta nokta, |DL| = |DA| + |AL|, eşit açılar), sahne 6 |
| c) Parçalar arasındaki ilişkileri problem bağlamına uygun dönüştürür; gerçek yaşam durumunu matematiksel dile çevirir (MAB3) | E1 sahne 5 (resimden şemaya, birim dönüşümü), sahne 6 (perde modeli) |
| ç) Matematiksel temsile dönüştürdüğü problemi kendi ifadeleriyle açıklar | E1 sahne 5 (son iki satır), sahne 6 ("hangi cümle anlatır" sorusu: seçenekli) |
| d) Çözüm için strateji oluşturur | E2 sahne 2–3 (ipucu → araç tablosu, Açı-Açı + Pisagor), sahne 5–8 |
| e) Stratejiyi uygulayarak problemi çözer | E2 sahne 3, 5, 6, 7 (tepe ve ayna, çiçek deseni, perde, yapı ve kitap); E3 sahne 3–4; E4 sahne 2 |
| f) Problemin çözümünü kontrol eder | E2 sahne 4 (üç denetim), sahne 5–7 (denetim satırları); E4 sahne 2 (denetim) |
| g) Kısa yolları ve çözüme ulaştırmayan stratejileri belirleyerek deneyimini gözden geçirir | E3 sahne 3–6 (iki yol yan yana, kısa yol, çıkmaz yol ve eksik bilgi), sahne 7 (sınıflandırma) |
| ğ) Çözüme ulaştıran stratejilerin hangi tür problemlere uygulanabileceğine ilişkin çıkarım yapar | E4 sahne 5 (yol × problem tablosu), sahne 2 (Öklid lambada çıkmaz), sahne 6 (sınıflandırma) |
| h) Çıkarımların geçerliliğini matematiksel örneklerle değerlendirir | E4 sahne 2–4 (lamba problemi, 9–12–15 ve 3–4–5 ile sayı değiştirme, iki yolun aynı sonucu) |
| Çözümleri arkadaşlarıyla karşılaştırma, farklı yolları inceleme (SDB2.2) | E3 sahne 5 (iki çözüm yan yana, benzetim); arkadaşlarla tartışma `site dışı` |
| Problem durumu araştırma ya da oluşturma, proje ödevi (3 problem, yapı örneği, poster, maket, sunum); çalışma kâğıdı | `site dışı` (dayandığı bilgi E1–E4) |
| Konu tekrarı | E5 |

Fazla olan: yok. Ara değer kavramı ("verilenlerden hesaplanan sayı") kitapta adıyla yok; kitabın |DA| = 525, |BC| = 135 gibi hesaplarının adıdır, yeni kavram değildir. "Kısa yol" ve "çıkmaz yol" 4.5.g'nin sözcükleridir. E2'deki Tales satırı yalnızca araç tablosunda ve eşleştirmede anılır. Eksik olan: yok. Kitapta yer alıp işlenmeyenler (rapora yazıldı): 13. uygulama (çantalar), 16. sıra sizde (tahterevalli), alıştırma 1 ve 3, 32. örnek b (Pelin).