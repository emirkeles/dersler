# Plan — Hikâye animasyonları · 6. ünite: İstatistiksel Araştırma Süreci

Ölçütler (üç koşul, ek kurallar), biçim, derse yerleşim ve üretim hattı: `../sayilar/HIKAYE-ANIMASYONLARI.md` bölüm 1–3 ve 5. Burada yinelenmedi.

**Durum (7 Ekim 2026): hakem incelemesinden geçti; düzeltmeler işlendi (bölüm 7; rapor: `../HIKAYE-HAKEM.md`).** Ünite henüz işleme alınmadı; ders kodları ve adları `PLAN.md` taslağındaki hâlleridir.

24 dersin 2'sinde hikâye var; kalanlarında yok. Bu ünite baştan sona gerçek yaşam durumu üzerine kurulu: program bağlamın "gerçek yaşam durumlarına uygun olarak" seçilmesini istiyor ve derslerin açılışları zaten öğrencinin kendi soruları (uyku, ekran süresi, otobüs, kantin anketi). Üçüncü koşulu geçen ders az.

## 1. Hikâyesi olan dersler (müfredattaki önem sırasıyla)

| Sıra | Ders | Fikir | Hayatta nerede | Hikâye | Kapanış cümlesi |
|---|---|---|---|---|---|
| 1 | D3 Aracı soru seçtirir | Aynı veride iki soru, iki ayrı özet ister | Sosyal medyada takipçi sayıları | 30 kişilik sınıfta 29 kişinin takipçisi 150 ile 450 arasında; bir kişinin hesabı tutmuş, 90 000. Okul gazetesi "Sınıfın ortalama takipçisi 3290" yazıyor; hesap doğru: 98 700 ÷ 30. Ama sınıfta 3290'a yaklaşan tek kişi yok. "Bu sınıfta sıradan bir öğrencinin kaç takipçisi var?" sorusunun cevabı ortanca: 300. "Bütün takipçiler sınıfa eşit paylaştırılsa kişi başına kaç düşerdi?" diye sorulsaydı cevap ortalama olurdu: 3290. | "Aracı veri değil, soru seçer." |
| 2 | C1 Histogram | Milyonlarca veri tek tek okunmaz; gruplanınca dağılımın yeri ve yayılımı görünür | Bazı fotoğraf düzenleme uygulamalarındaki ve fotoğraf makinelerindeki "dağ" grafiği | Akşam, loş odada çektiğin fotoğraf karanlık çıktı. Bazı düzenleme uygulamalarında ve fotoğraf makinelerinde ekranın köşesinde küçük bir "dağ" grafiği durur; bu fotoğrafta bütün yığın sola yaslanmış. O grafik bir histogram: 4000 × 3000 = 12 milyon pikselin her birinin parlaklığı ölçülmüş, yakın parlaklıktakiler aynı gruba konmuş, her grubun sütunu içindeki piksel sayısı kadar yükselmiş. Yığın soldaysa piksellerin çoğu karanlık; parlaklığı artırınca dağ sağa yürür, kontrastı artırınca yayılır. | "Çok veride tek tek noktalara değil, gruplara bak." |

Üretim sırası tablodaki sıradır. Süre ya da bütçe daralırsa ilk vazgeçilecek olan 2 numaradır (öğrencilerin çoğu o grafiği görmüyor).

## 2. Müfredat dayanağı

| Sıra | Hikâye | Programdaki dayanak | Program gerçek yaşam bağlamı istiyor mu |
|---|---|---|---|
| 1 | Sınıfın ortalama takipçisi | MAT.9.6.1 d: "…özetleme [aritmetik ortalama, ortanca (medyan), tepe değer (mod), açıklık, çeyrekler açıklığı, standart sapma] araçlarından uygun olanı seçer." Uygulama: "Uygun olan araçların belirlenmesinde araştırma sorularına yeniden dönülür" ve "Seçilecek araçların araştırma sorularına cevap verecek ve verileri analiz edecek nitelikte olmasına dikkat edilir." | **Tema düzeyinde evet** (yukarıdaki cümle). Araç seçimi için ayrı bir örnek verilmiyor. Hikâye MAT.9.6.2'ye de değer (başkasının yorumunu sınamak) ama o çıktının terimlerini kullanmaz. |
| 2 | Fotoğrafın altındaki dağ | MAT.9.6.1 d: "…görselleştirme (nokta grafiği, histogram, kutu grafiği) … araçlarından uygun olanı seçer." Köprü kurma: "Bu görselleştirme araçlarının her zaman yeterli olamayacağı fark ettirilebilir." İçerik çerçevesi: sayısal özetler "ilgili dağılımın merkezinin nereye eğilim gösterdiğini ve nasıl yayıldığını belirlemede kullanılır". Anahtar kavram: histogram. | **Tema düzeyinde evet:** "İstatistiksel araştırma problemlerine kaynaklık edecek bağlamlar, gerçek yaşam durumlarına uygun olarak belirlenir." Histogram için ayrı bir gerçek yaşam örneği verilmiyor; program histogramın yazılımla elde edilmesini istiyor ("istatistik yazılımları kullanılır"), hikâyedeki grafik de yazılımın çizdiği hazır bir histogramdır. |

## 3. Üç koşul

| Sıra | Koşul 1 · Gerçekten hayatta var | Koşul 2 · Öğrenci karşılaşacak | Koşul 3 · Konu soyut kalıyor |
|---|---|---|---|
| 1 | Takipçi, gelir, izlenme gibi sayılarda birkaç çok büyük değer ortalamayı çeker; "ortalama" ile "sıradan" ayrışır. | Her gün: kendi hesabı, sınıf arkadaşları, "ortalama şu kadar" diyen haberler. | D3 bir karar dersi (hangi araç); açılışı bir soru. Aracı neden sorunun seçtiği, aynı veride iki özet yan yana görülmeden soyut kalır. |
| 2 | Fotoğraf histogramı gerçek bir histogramdır: tek nicel değişken (parlaklık), milyonlarca veri, gruplar ve sütunlar. Fotoğrafçılar pozlamayı ona bakarak ayarlar. | **Sınırda.** Fotoğraf düzenleyenler için evet; ama iPhone'un Fotoğraflar uygulamasında histogram yok, öğrencilerin çoğu bu grafiği görmedi (bölüm 4). Yedek nesne: bölüm 6, son satır. | Histogram bu ünitede yeni bir araç; dersin açılışı varsayımsal (5000 öğrencinin boyu). Öğrenci gerçek bir histogramı hiç elinde tutmuyor. |

## 4. Doğruluk notları

- **Histogram.** 4000 × 3000 = 12 000 000 piksel; "12 megapiksel" budur. Telefonların çoğu 12 megapiksel ya da daha büyük fotoğraf kaydeder; çözünürlük **örnek değerdir**.
- Fotoğraf histogramında yatay eksen parlaklık (soldan sağa karanlıktan aydınlığa), dikey eksen o parlaklıktaki piksel sayısıdır. Yığının solda olması karanlık fotoğraf demektir; parlaklık artınca sağa kayar, kontrast artınca genişler. (Doğrulandı: fotoğrafçılık kaynakları; Snapseed ve Samsung belgeleri.)
- **Sahne (hakem düzeltmesi).** İlk taslaktaki "gün batımında, ışığa karşı" sahnesi anlatılan grafikle çelişiyordu: öyle bir fotoğrafın histogramı iki tepelidir (karanlık yüzler solda, parlak gökyüzü sağda). "Bütün yığın solda" ancak tümüyle loş bir sahnede olur; sahne akşam, loş oda yapıldı. Kadrajda lamba, ekran ya da pencere gibi parlak bir alan olmamalı.
- Histogram her telefonun yerleşik düzenleyicisinde görünmez: iPhone'un Fotoğraflar uygulamasında yoktur; Snapseed'de düzenleme ekranının sol altında, Lightroom'da ve fotoğraf makinelerinde vardır (doğrulandı). Samsung kamerasının Pro modu ilk taslakta doğrulanmış sayıldı; hakem Samsung Galeri için doğrulayamadı. Anlatım bu yüzden "bazı düzenleme uygulamalarında ve fotoğraf makinelerinde" der; uygulama adı vermez.
- `PLAN.md` histogramın elle çizimini ve sınıf aralığı seçimini ders dışı bırakıyor (bölüm 6, soru 3). Hikâye "gruplar" demekle yetinir; grup genişliğinden söz etmez.
- **Takipçi.** 29 kişinin toplamı 8700 (ortalaması 300); 8700 + 90 000 = 98 700; 98 700 ÷ 30 = 3290. Senaryoda 29 değer 150–450 arasına dağıtılır; toplam 8700 kalmalı ve sıralı veride 15. ile 16. değer 300 olmalıdır (ortanca 300). Sayıların tamamı **kurgudur**.
- İkinci soru değişti (hakem): "toplam kaç?" sorusu ortalamayı gerektirmiyordu (toplam zaten elde). "Eşit paylaştırılsa kişi başına kaç düşerdi?" sorusunun cevabı aritmetik ortalamanın kendisidir.
- "Aykırı değer" terimi `PLAN.md`'de ders dışı; hikâye 90 000 için bu sözü kullanmaz. Ancak hikâyeyi çalıştıran olgu (tek çok büyük değerin ortalamayı çekmesi) D3'ün anlatılacakları arasında yazmıyor. **D3 senaryosuna not:** araç seçimi örneklerinden biri bu olguyu terimsiz göstermeli (ortaokul bilgisi: ortalama uç değerden etkilenir, ortanca etkilenmez); göstermezse hikâye derste olmayan bir şey anlatır ve yeniden değerlendirilir.
- Ortalama ve ortanca ön bilgidir (temel kabul); hikâye bunları öğretmez, yalnızca hangisinin hangi soruya cevap verdiğini gösterir.

## 5. Hikâyesi olmayan dersler ve nedeni

| Dersler | Neden yok |
|---|---|
| A1 Cevabı veride aranan durum · A3 Soru açık olmalı · A4 Soru veriyle cevaplanmalı · B3 Değişken ve araç · B4 Nerede, ne zaman, nasıl; kayıt ve dürüstlük · B5 Veriyi analize hazırlamak | Araştırma sürecinin adımları; kendiliğinden anlaşılır. Dersler öğrencinin kendi sorularıyla açılıyor (yaz sıcaklıkları, uyku, ekran süresi). |
| A2 Veriler neden farklıdır | Dersin kendisi programın dört somut örneğiyle kurulu (boylar, kronometre, güneş alan bitkiler, farklı örneklemler). |
| B1 Evren ve örneklem · B2 Rastgele seçim · E3 Örneklemden evrene | Dersler zaten öğrencinin hayatından durumlarla kurulu (kimi ölçerdin, kantin sırasındaki anket, 30 kişilik iki ayrı ölçüm). Bkz. bölüm 6, ilk aday. |
| C2 Kutu grafiği: beş değer · C3 Kutudan yayılımı okumak | Koşul 2. Öğrenci kutu grafiğiyle okul dışında karşılaşmıyor; hayatta gösterecek bir yer yok. |
| D1 Aynı merkez, farklı yayılım · D2 Standart sapma | Derslerin örnekleri zaten hayattan ve fikri taşıyor (her maç 15 sayı atan oyuncu, bekleme süresi oynayan otobüs hattı). Program standart sapmayı formülsüz, kavram olarak istiyor; ikinci bir örnek tekrar olur. |
| D4 Seçilen araçla analiz | Yazılım kullanımı; işlem tekniği. |
| E1 Verilerin arasını okumak · E2 Verilerin ötesini okumak · E4 Soruya geri dön | Yorumlama adımları; dersler şehir sıcaklıkları, otobüs varış süreleri ve uyku sorusuyla kurulu. |
| F1 Yorum dağılıma dayanmalı · F2 Hata: yorum veriyle çelişiyor · F3 Yanlılık: veri yanlış toplanmış · F4 Kabul et ya da çürüt | Derslerin kendisi haber, anket ve grafik örnekleriyle kurulu (çıktının amacı zaten bu). "Hesap doğru, yorum yanıltıcı" durumunu 1 numaralı hikâye de gösteriyor. |

## 6. Değerlendirip elediğim adaylar

| Aday | Ders | Neden elendi |
|---|---|---|
| "Çorbanın tadına bakmak." Üç litrelik tencereden bir kaşık yeter; yeter ki önce karıştırılmış olsun. | B1, B2 | Koşul 1 ve 3. Akılda kalıcı ama bir benzetme: ortada değişen bir veri ve araştırma sorusu yok. B2 zaten kantin sırasındaki anketle kurulu. |
| Ürün ve uygulama puanları: kimler puan verir? Çok memnun kalanlar ve çok kızanlar. | F3 | Koşul 3. F3'ün açılışı (spor salonunun kapısında yapılan anket) aynı fikir. `PLAN.md` yanlılık türlerinin adlarını ders dışı bırakıyor; hikâye oraya kayardı. Hakem: doğru elendi (7 / 7); ama MAT.9.6.2'nin hiç hikâyesi yok, üçüncü hikâye istenirse aday budur. |
| Oyunda ping dalgalanması ya da hız testindeki "jitter" değeri. | D2 | Koşul 1. Bu ölçü standart sapma değildir; "aynı şey" diye anlatmak yanlış olur. Ders zaten otobüs örneğiyle kurulu. |
| Sınav istatistiklerindeki "standart sapma" satırı (merkezî sınavların sayısal verileri). | D2 | "Yeni bilgi öğretmez". Standart sapmanın orada ne işe yaradığını anlatmak standart puanı gerektirir; `PLAN.md` z puanını ders dışı bırakıyor. |
| İki şehrin yıllık ortalama sıcaklığı aynı, yaz-kış farkı başka. | D1 | Ders iki oyuncu örneğiyle zaten somut; ortalaması eşit iki gerçek şehir için resmî veri doğrulanmadı. |
| Deneme sınavı sonuç karnesindeki puan dağılımı grafiği (C1 için başka nesne). | C1 | **Yedek (hakem önerisi).** Her öğrenci görüyor ve dersin "5000 öğrenci" açılışıyla aynı ölçekte; ama kavram eşlemesi fotoğraftaki kadar zengin değil (orada parlaklık merkezi, kontrast yayılımı gösteriyor). Fotoğraf sahnesi üretimde inandırıcı kurulamazsa C1 hikâyesi bu nesneyle yazılır. |

## 7. Hakem incelemesi (7 Ekim 2026)

Bağımsız hakem raporu: `../HIKAYE-HAKEM.md`. Puanlar 0–10 (9–10: 1. ünitenin en güçlü hikâyeleri düzeyi; 7–8: küçük düzeltmeyle üretilir; 5–6: ciddi zaaf). Hakemin istediği düzeltmeler bu dosyaya işlendi; puanlar düzeltmeden önceki taslağa aittir.

| Hikâye | Müfredat | Katkı | Toplam | Karar |
|---|---|---|---|---|
| D3 Sınıfın ortalama takipçisi | 7 | 9 | 16 | Düzeltilerek kalsın |
| C1 Fotoğrafın altındaki dağ | 8 | 7 | 15 | Düzeltilerek kalsın |

| Değişiklik | Gerekçe |
|---|---|
| Sıra değişti: D3 birinci | Hakem puanı; C1'de öğrencinin karşılaşması sınırda. |
| D3: ikinci soru "toplam kaç?" yerine "eşit paylaştırılsa kişi başına kaç düşerdi?" | Toplamı bulmak için ortalamaya gerek yoktu; yeni soru ortalamayı gerçekten gerektiriyor. |
| D3: 29 kişi tam 300 değil, 150–450 arasında | Sadeleştirme gerçekçi değildi; toplam ve ortanca korunuyor. |
| D3 senaryosuna not düşüldü (bölüm 4) | Hikâyeyi çalıştıran olgu `PLAN.md`'nin ders dışı saydığı "aykırı değer"e komşu ve D3'ün anlatılacaklarında yok. |
| C1: sahne gün batımı yerine akşam, loş oda | Işığa karşı çekimde histogram iki tepelidir; "bütün yığın solda" o sahneye uymuyordu (doğruluk hatası). |
| C1: "düzenleme ekranında" yerine "bazı düzenleme uygulamalarında ve fotoğraf makinelerinde"; yedek nesne eklendi | iPhone'un Fotoğraflar uygulamasında histogram yok. |

Sahne tekrarı: bu ünitenin D3 hikâyesi ile 7. ünitenin B7 hikâyesi aynı sahnedeydi (30 kişilik sınıf, pano, uygulama); B7'nin sahnesi değişti, D3 yerinde kaldı.
