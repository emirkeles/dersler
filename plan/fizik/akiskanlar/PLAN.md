# Plan — 9. Sınıf Fizik · 3. Tema: Akışkanlar

Dayanak: `MUFREDAT.md` (MEB sayfasından 7 Ekim 2026'da alındı; MEB bu bölüme "3. Ünite: Akışkanlar" der). Ortak kurallar: `../../KURALLAR.md` (bir kısa ders = bir fikir; süre ve sahne sınırı yok; önce anlat, sonra sor; 4–5 çıkış sorusu; her konunun sonunda konu tekrarı). Yazım adımları: `../../ISLEME.md`.

Tema 12 Ekim 2026'da işleme alındı (`../../YURUTME.md` 3. adım). Bölüm 6'daki sorular bölüm 7'de kapandı; ders kitabından alınanlar bölüm 8'de. Bölüm 3'teki ders tanımları 7 Ekim taslağıdır: kararlarla değişen her şey "Kısa ders listesi (kararlardan sonra)" tablosunda ve bölüm 7'de yazılıdır; çelişkide onlar geçerlidir.

## 1. Kapsam özeti

Tema 18 ders saati. Yedi öğrenme çıktısı var: **FİZ.9.3.1 – FİZ.9.3.7**. Çıktıların beşi "veriden modele, modelden çıkarıma" kalıbındadır (basınç, durgun sıvı basıncı, açık hava basıncı, kaldırma kuvveti deneyi, kaldırma kuvveti modeli); biri bilgi sorgulama (FİZ.9.3.3), biri gözlemden genelleme (FİZ.9.3.7, Bernoulli İlkesi) ister. Program hiçbir modelin formülünü yazmaz ve her modelde hesabı sınırlar: "değişkenlerin ilişkilerine yönelik yorumlamalarla", "orantısal ilişkilerle sınırlı kalınır"; Bernoulli'de "matematiksel modelden kaçınılır". Bu yüzden dersler hesap değil ilişki dersidir: neyi değiştirince ne değişir.

Programın istediği deney ve gözlemler sitede etkileşimli benzetimle karşılanır: öğrenci değişkeni seçer, ölçümü okur, tabloya kaydeder, ilişkiyi kendisi bulur. Program da bunu açıkça seçenek sayar ("deney düzenekleri, simülasyonlar veya animasyonlar kullanarak", "dijital veya görsel içeriklerden yararlanarak"). Benzetimin yetmediği yerler bölüm 6'da (soru 10).

| Öğrenme çıktısı | Konu | Kısa dersler |
|---|---|---|
| FİZ.9.3.1 Basınca yönelik bilimsel çıkarım | A · Basınç | A1–A2 |
| FİZ.9.3.2 Durgun sıvılarda basınca yönelik bilimsel çıkarım | B · Sıvılarda basınç | B1–B2 |
| FİZ.9.3.3 Sıvılarda basıncın kullanıldığı günlük hayat örneklerini sorgulama | B · Sıvılarda basınç | B3–B4 |
| FİZ.9.3.4 Açık hava basıncına ilişkin çıkarım | C · Açık hava basıncı | C1–C3 |
| FİZ.9.3.5 Kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik deney | D · Kaldırma kuvveti | D1 |
| FİZ.9.3.6 Kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişki | D · Kaldırma kuvveti | D2–D5 |
| FİZ.9.3.7 Kesit alanı, sürat ve basınç arasındaki ilişki (Bernoulli İlkesi) | E · Bernoulli İlkesi | E1–E2 |

Toplam 5 konu, 16 kısa ders ve 5 konu tekrarı dersi (21 dosya; D4 12 Ekim 2026'da ikiye bölündü, karar 25). 18 ders saati için saat başına 0,89 (konu tekrarları sayılmaz); `ISLEME.md` kural 5'teki 0,85 sınırının üstünde (gerekçe karar 25). Bölünmeden önce 15 kısa ders, 0,83. Birleştirme ve bölme yapılmadı (karar 1).

## 2. Konular

Kural "her öğrenme çıktısı bir konu"dur. Yedi çıktıyı beş konuya **şu gerekçeyle** topladım: programın içerik çerçevesi tam beş başlık sayıyor (Basınç, Sıvılarda Basınç, Açık Hava Basıncı, Kaldırma Kuvveti, Bernoulli İlkesi) ve çıktılar bu başlıklara bire bir oturuyor; FİZ.9.3.2 ile FİZ.9.3.3 aynı başlığın (sıvılarda basınç) modeli ve kullanımı, FİZ.9.3.5 ile FİZ.9.3.6 aynı deneyin (kaldırma kuvveti) yapılması ve yorumlanmasıdır. Program FİZ.9.3.6'yı açıkça FİZ.9.3.5'in verisine bağlar ("kaldırma kuvveti ile ilgili yaptıkları deneyden elde ettikleri verileri yorumlayarak").

**A · Basınç** (FİZ.9.3.1). Basınca etki eden etmenler (basınca neden olan kuvvet, yüzey alanı), veriden matematiksel modele, modelden çıkarıma. Günlük hayat örnekleri ve bunların konfor, kolaylık, işe yararlık açısından değerlendirilmesi.

**B · Sıvılarda basınç** (FİZ.9.3.2, FİZ.9.3.3). Durgun sıvıda basınca etki eden etmenler, deney, model ve çıkarım; ardından sıvı basıncıyla çalışan sistemler (su cendereleri, hidrolik sistemler) ve bunlar üzerine sorgulama: merak et, sor, bilgi topla, doğruluğunu değerlendir, çıkarımda bulun.

**C · Açık hava basıncı** (FİZ.9.3.4). Sıvı basıncından yola çıkarak hipotez, sıvı basıncıyla benzerlik ve farklar, Torricelli'nin ölçmesi ve atm birimi, atmosfer basıncının yeryüzünde değişmesi, rüzgâr, günlük durumlar.

**D · Kaldırma kuvveti** (FİZ.9.3.5, FİZ.9.3.6). Deneyle değişkenleri belirleme; kaldırma kuvveti ile yer değiştiren sıvının ağırlığı arasındaki ilişki ve matematiksel model (Arşimet İlkesi); bu modelin sıvı basıncı modeliyle karşılaştırılması; deniz araçları ve plastik atıklar üzerinden değerlendirme.

**E · Bernoulli İlkesi** (FİZ.9.3.7). Borunun kesit alanı, akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkinin gözlenmesi; ilişkinin günlük hayat örnekleriyle genellenmesi. Tamamen kavramsal.

Ders sırası: A1 → A2 → B1 → B2 → B3 → B4 → C1 → C2 → C3 → D1 → D2 → D3 → D4 → D5 → E1 → E2. B2, A2'deki "veriden modele" yolunu yineler; C1 ve C2, B2'nin modeline dayanır; D3, B2 ile D2'nin modellerini karşılaştırır; D5, D1 ve D2'nin verisine döner. E konusu ötekilerden bağımsızdır ama "basınç" kavramını A'dan alır.

## 3. Kısa dersler

### Konu A · Basınç

#### A1 · Basınç neye bağlı?

- **Tek fikir:** Basınç, basınca neden olan kuvvete ve kuvvetin etki ettiği yüzey alanına bağlıdır.
- **Anlatılacaklar:**
  1. Basıncın etkili olduğu günlük hayat durumları (programın köprü kurma örneği: topuklu ayakkabı ve düz ayakkabı).
  2. Bu durumların konfor, kolaylık ve işe yararlık açısından değerlendirilmesi; daha kolay, rahat, işe yarar hâle getirmek için ne yapılabileceği.
  3. Basınca etki eden etmenlerin tanımlanması: basınca neden olan kuvvet ve yüzey alanı. Biri sabitken öteki değiştirilir.
  4. Basınçla ilgili bir sistemin işleyişinde basıncın rolü.
- **Program dayanağı:** FİZ.9.3.1 a) "Basınca etki eden etmenleri tanımlar." Uygulamalar: "Öğrencilerden basıncın etkili olduğu durumlarla ilgili günlük hayattan örnekler vermeleri istenebilir. Öğrencilerin örneklerdeki durumları konfor, kolaylık ve işe yararlık gibi açılardan değerlendirmeleri sağlanabilir. Örnek durumların daha kolay, rahat, işe yarar hâle getirilmesi için yapılabilecekler konusunda öğrencilerden fikir üretmeleri istenebilir… Basınç ile ilgili sistemlerin işleyişinde basıncın rolü öğrencilerle birlikte açıklanabilir. Basınç ile ilgili basit gösteri deneyleri yapılır veya basınca etki eden etmenlerin tanımlanabileceği dijital ve görsel içerik gibi araçlardan biri kullanılarak öğrencilerin bu etmenleri belirlemesi sağlanır." Köprü kurma: "…(topuklu ayakkabı ve düz ayakkabı, baraj duvarları vb.) basınç arasında nedensel ilişki kurması sağlanabilir."
- **Açılış sorusu:** Aynı kişi karlı yolda bir topuklu ayakkabıyla, bir düz ayakkabıyla yürürse hangisi daha çok batar?
- **Akılda kalıcı cümle:** Aynı kuvvet, küçük yüzeyde daha çok bastırır.

#### A2 · Ölç, kaydet, modele ulaş

- **Tek fikir:** Basınç, kuvvet ve yüzey alanı ölçümleri bir tabloya kaydedilince basıncın matematiksel modeli ortaya çıkar; model, ölçmeden çıkarım yapmayı sağlar.
- **Anlatılacaklar:**
  1. Benzetim düzeneğinde basınç, basınca neden olan kuvvet ve yüzey alanı ile ilgili verilerin toplanması.
  2. Verilerin kaydedilmesi (tablo).
  3. Verilerin yorumlanması ve basıncın matematiksel modelinin oluşturulması (modelin yazımı: bölüm 6, soru 2).
  4. Modelden yararlanarak basınca ilişkin çıkarım: kuvvet artarsa, yüzey alanı artarsa basınç nasıl değişir. Örnekler değişkenlerin ilişkisini yorumlamakla sınırlıdır.
- **Program dayanağı:** FİZ.9.3.1 b) "Basınç ile ilgili topladığı verileri kaydeder." c) "Basınç ile ilgili topladığı verilerden ulaştığı matematiksel modeli kullanarak basınca ilişkin çıkarımlar yapar." Uygulamalar: "…deney düzenekleri, simülasyonlar veya animasyonlar kullanarak basınç, basınca neden olan kuvvet ve yüzey alanı ile ilgili verileri toplar. Elde edilen verileri yorumlayarak (OB7) basıncın matematiksel modelini oluştururlar ve matematiksel modelden yararlanarak basınca ilişkin çıkarımda bulunurlar. Matematiksel model ile ilgili örneklerde basıncın bağlı olduğu değişkenlerin ilişkilerine yönelik yorumlamalarla sınırlı kalınır."
- **Açılış sorusu:** Bir tuğlayı süngerin üstüne yatık da koyabilirsin dik de; izi hangisinde derin olur, ne kadar?
- **Akılda kalıcı cümle:** Kuvvet iki katına çıkarsa basınç iki kat, alan iki katına çıkarsa yarı olur.

### Konu B · Sıvılarda basınç

#### B1 · Derine dalmak neden zor?

- **Tek fikir:** Durgun bir sıvının içinde basınç her yerde aynı değildir; nelere bağlı olduğu tek tek ayırt edilebilir.
- **Anlatılacaklar:**
  1. Serbest dalış: suda derine dalmanın zor olmasının nedenleri.
  2. Dalınan derinliğe uygun teknik ve teçhizat gerektiği; uygun olmayan koşullarda dalmanın vücutta oluşturabileceği sorunlar ve vurgun kavramı (programın yazdığı kadarıyla; bölüm 6, soru 11).
  3. Su altı sporlarında sağlıkla ilgili riskler.
  4. Durgun sıvı basıncına etki eden etmenlerin tanımlanması (hangi etmenler: bölüm 6, soru 3).
- **Program dayanağı:** FİZ.9.3.2 a) "Durgun sıvılarda basınca etki eden etmenleri tanımlar." Uygulamalar: "Öğrencilerden Türk millî sporcularının serbest dalışta rekor kırdığı (D19.2) görüntü üzerinden suda derine dalmanın zor olmasının nedenlerini… sorgulamaları (SDB1.1) istenebilir. Öğrencilere dalınan derinliğe uygun teknik ve teçhizat ile dalmak gerektiğini anlatan bir metin verilebilir. Uygun olmayan koşullarda dalmanın vücutta oluşturabileceği sorunlardan ve vurgun kavramından söz edilebilir. Benzer örneklerle konuya ve konu bağlamında su altı sporları yapılırken sağlık ile ilgili risklere (D13.2) dikkat çeker. Öğrenciler, durgun sıvı basıncına etki eden etmenleri dijital veya görsel içeriklerden yararlanarak tanımlar."
- **Açılış sorusu:** Serbest dalışta rekor deneyen bir sporcu indikçe kulaklarındaki baskı neden artar?
- **Akılda kalıcı cümle:** Sıvıda ne kadar derine inersen basınç o kadar büyür.

#### B2 · Deneyle modele: durgun sıvının basıncı

- **Tek fikir:** Değişkenler teker teker değiştirilip ölçümler kaydedilince durgun sıvı basıncının matematiksel modeli bulunur ve bu modelle çıkarım yapılır.
- **Anlatılacaklar:**
  1. Durgun sıvılarda basıncı etkileyen değişkenleri belirlemeye yönelik deneyin tasarlanması: hangi değişken değişecek, hangisi sabit kalacak.
  2. Deneyin (benzetimde) yapılması ve verilerin kaydedilmesi.
  3. Verilerin analiz edilmesi ve durgun sıvı basıncının matematiksel modelinin oluşturulması (yazımı: bölüm 6, soru 2).
  4. Modelden çıkarım: değişkenlerin ilişkisinin yorumu (programın köprü kurma örneği: baraj duvarları).
  5. Sınır: kabın yan yüzeylerine etki eden kuvvet hesaplanmaz.
- **Program dayanağı:** FİZ.9.3.2 b) "Durgun sıvılarda basınç ile ilgili topladığı verileri kaydeder." c) "…verilerden ulaştığı matematiksel modeli kullanarak durgun sıvılarda basınca ilişkin çıkarımlar yapar." Uygulamalar: "…durgun sıvılarda basıncı etkileyen değişkenleri belirlemeye yönelik deney tasarlayıp tasarladıkları deneyi yaparak (SDB1.2) elde ettikleri verileri (OB7) kaydeder. Öğrenciler elde ettikleri verileri analiz ederek durgun sıvı basıncının matematiksel modelini oluşturur ve matematiksel modelden yararlanarak durgun sıvılarda basınca ilişkin çıkarımda bulunur. Matematiksel model ile ilgili örneklerde basıncın bağlı olduğu değişkenlerin ilişkilerine yönelik yorumlamalarla sınırlı kalınır. Örneklerde kabın yan yüzeylerine etki eden basınca neden olan kuvvete ilişkin matematiksel işlemlerden kaçınılır." Köprü kurma: "…baraj duvarları vb."
- **Açılış sorusu:** Baraj duvarları neden aşağıya doğru kalınlaşır?
- **Akılda kalıcı cümle:** Bir değişkeni değiştir, ötekileri sabit tut; ilişki kendini gösterir.

#### B3 · Sıvı basıncıyla çalışan sistemler

- **Tek fikir:** Su cendereleri ve hidrolik sistemler gibi düzenekler işlerini sıvı basıncıyla görür; her birinde sıvı basıncının rolü gösterilebilir.
- **Anlatılacaklar:**
  1. Sıvı basıncı ile çalışan sistemlerin görselleri ve işleyişleri.
  2. Programın saydığı iki örnek: su cendereleri, hidrolik sistemler (işleyişin hangi derinlikte anlatılacağı: bölüm 6, soru 6).
  3. Bu sistemlerde sıvı basıncının rolü.
- **Program dayanağı:** FİZ.9.3.3 uygulamalar: "Sıvı basıncı ile çalışan sistemlerin görselleri sınıfta gösterilir ve öğrencilerle birlikte işleyişleri incelenir (OB4). Öğrencilere dijital veya görsel içeriklerden yararlanılarak günlük hayatta sıvı basıncının kullanıldığı su cendereleri, hidrolik sistemler gibi örnekler sunulur…" "…sıvılarda basıncın kullanıldığı sistemlerde sıvı basıncının rolü hakkında metin oluşturmaları…" Öğrenme kanıtları: "Sıvı basıncından yararlanan sistemlerde sıvı basıncının rolü…"
- **Açılış sorusu:** Oto tamircisi tek eliyle bir kola bastırıp koca bir arabayı nasıl kaldırır?
- **Akılda kalıcı cümle:** Sıvı, bir uçtaki bastırmayı öbür uca taşır.

#### B4 · Merak et, sor, doğrula

- **Tek fikir:** Merak edilen bir sistem hakkında soru sorulur, bilgi toplanır, bilginin doğruluğu sınanır ve ancak ondan sonra çıkarım yapılır.
- **Anlatılacaklar:**
  1. Sunulan örnekler arasından merak edilen konunun belirlenmesi.
  2. Konuyla ilgili soruların sorulması.
  3. Soruya cevap için kullanılacak araçlara karar verilmesi ve sistematik bilgi toplama.
  4. Toplanan bilgilerin doğruluk, güvenilirlik, amaca uygunluk ve açıklık ilkelerine göre kontrol edilmesi.
  5. Doğruluğu teyit edilen bilgiler üzerinden çıkarım; çıkarımın fotoğraf, resim, tablo, şekil ya da grafikle desteklenmesi.
- **Program dayanağı:** FİZ.9.3.3 a) "…merak ettiği konuyu belirler." b) "…sorular sorar." c) "…bilgi toplar." ç) "…topladığı bilgilerin doğru olup olmadığını değerlendirir." d) "…topladığı bilgiler üzerinden çıkarımda bulunur." Uygulamalar: "Öğrenciler, bu sorulara cevap bulmak için kullanılacak araçlara karar vererek (SDB1.2) sistematik bir şekilde (E3.7) bilgi toplar. Öğrenciler, öğretmenlerinin rehberliğinde toplanan bilgileri bilimsel açıdan doğruluk, güvenilirlik, amaca uygunluk ve açıklık ilkelerine göre (D3.3) kontrol eder. Doğruluğunu teyit ettikleri bilgiler üzerinden (D3.3) her grup belirledikleri alanda sıvı basıncının kullanımı ile ilgili çıkarımlarını paylaşabilir…"
- **Açılış sorusu:** İnternette "hidrolik fren asla bozulmaz" diye bir yazı gördün; doğru olduğunu nasıl anlarsın?
- **Akılda kalıcı cümle:** Önce bilgiyi sına, sonra sonuç çıkar.

### Konu C · Açık hava basıncı

#### C1 · Hava da bir akışkandır

- **Tek fikir:** Hava da sıvı gibi bir akışkandır, o da ağırlığıyla basınç yapar; ama sıvıdan farklı olarak yoğunluğu her yerde aynı değildir.
- **Anlatılacaklar:**
  1. Hatırlatma: sıvı içindeki bir yerde basınca neden olan kuvvet sıvının ağırlığından kaynaklanır.
  2. Hava da akışkan olduğundan benzer durum hava için de söz konusudur; öğrenci açık hava basıncına ilişkin hipotez kurar (tahmin).
  3. Sıvı basıncı ile açık hava basıncı arasındaki ilişkilerin listelenmesi: benzerlikler ve farklılıklar. Sıvı homojen dağılır, havanın yoğunluğu homojen değildir.
  4. Sıvıda derinlik ile açık havada yükseklik: yükseklerde üstteki hava daha az olduğu için açık hava basıncı daha azdır.
- **Program dayanağı:** FİZ.9.3.4 a) "Sıvı basıncına ilişkin bilgilerinden yararlanarak açık hava basıncına yönelik mevcut bilgisi dâhilinde hipotez kurar." b) "Sıvı basıncıyla açık hava basıncı arasındaki ilişkileri listeler." Uygulamalar: "Öğrencilere sıvı içindeki bir yerde oluşan basınca neden olan kuvvetin sıvının ağırlığından kaynaklandığı hatırlatılır. Öğrencilerin havanın da sıvı gibi bir akışkan olduğundan sıvı basıncına benzer bir durumun hava için de söz konusu olduğunu farketmeleri sağlanır… Açık havanın etkisiyle meydana gelen basınç ile sıvı basıncı arasındaki benzerlik ve farklılıklar tartışılır. Sıvının homojen dağıldığı ancak havanın yoğunluğunun homojen olmadığı vurgulanır. Sıvılarda derinlik ile açık havadaki yükseklik kavramları basınç kavramı ile ilişkilendirilir. Atmosferin en üst noktasından deniz seviyesine kadar olan mesafe yükseklerde daha az olacağı için açık hava basıncının daha az olması gerektiği vurgulanır."
- **Açılış sorusu:** Dağa çıkan bir otobüste kulakların neden tıkanır?
- **Akılda kalıcı cümle:** Bir hava denizinin dibinde yaşıyoruz.

#### C2 · Torricelli havayı nasıl tarttı?

- **Tek fikir:** Açık hava basıncı, dengelediği cıva sütunuyla ölçülür; bu ölçü atmosfer (atm) biriminin dayanağıdır.
- **Anlatılacaklar:**
  1. Açık hava basıncını ilk kez Torricelli ölçmüştür; ölçme yöntemi (programın yazdığı kadarıyla; bölüm 6, soru 8).
  2. Cıva sütununun ağırlığı ile açık hava basıncına ait basınca neden olan kuvvet birbirini dengeler.
  3. Bu denge üzerinden sıvı basıncı ile açık hava basıncının karşılaştırılması.
  4. Atmosfer (atm) birimi ve temel birimler cinsinden hesaplanması (hesabın biçimi: bölüm 6, soru 5).
- **Program dayanağı:** FİZ.9.3.4 c) "Sıvı basıncıyla açık hava basıncını karşılaştırır." Uygulamalar: "Açık hava basıncının ilk kez Torricelli tarafından ölçüldüğü ve ölçme yöntemi açıklanır. Bu sırada cıva sütununun ağırlığı ile açık hava basıncına ait basınca neden olan kuvvetin birbirini nasıl dengelediği üzerinden sıvı basıncı ve açık hava basıncı karşılaştırılır. Atmosfer (atm) birimi tanıtılarak temel birimler cinsinden hesaplanması sağlanır."
- **Açılış sorusu:** Ağzına kadar dolu bir bardağı suya batırıp ters çevirerek kaldırırsan su neden dökülmez?
- **Akılda kalıcı cümle:** Hava dışarıdan iter, cıva sütunu içeriden tartar; ikisi dengede durur.

#### C3 · Atmosfer basıncı her yerde aynı değil

- **Tek fikir:** Açık hava basıncı yeryüzünde yerden yere değişir; hava yüksek basınçtan alçak basınca yer değiştirir ve rüzgâr oluşur.
- **Anlatılacaklar:**
  1. Açık hava basıncı, sıcaklıkla genleşmeye ve hava yoğunluğunun yerel olarak değişmesine bağlı olarak yeryüzünde değişir; buna atmosfer basıncı denir.
  2. Alçak basınç ve yüksek basınç bölgeleri arasında havanın yer değiştirmesiyle rüzgâr oluşur.
  3. Rüzgâr oluşumu yenilenebilen enerji kaynakları sağlamada önemlidir.
  4. Alçak basınç ve yüksek basınç üzerinden önermeler; günlük hayatta açık hava basıncının etkisinin görüldüğü farklı durumların değerlendirilmesi.
- **Program dayanağı:** FİZ.9.3.4 ç) "Açık hava basıncına ilişkin önermeler sunar." d) "Açık hava basıncına ilişkin bilgilerini farklı durumlarda değerlendirir." Uygulamalar: "Açık hava basıncının sıcaklık ile genleşme ve hava yoğunluğunun yerel olarak değişmesine bağlı olarak yeryüzünde değişiklik gösterebileceği ve buna atmosfer basıncı dendiği vurgulanır. Alçak basınç ve yüksek basınç bölgeleri arasında havanın yer değiştirmesiyle rüzgârın oluştuğu belirtilerek coğrafya disipliniyle ilişki kurulur. Ayrıca rüzgâr oluşumunun yenilenebilen enerji kaynakları sağlamada önemli olduğu belirtilir (OB8). Öğrenciler, alçak basınç ve yüksek basınç üzerinden önermeler sunar. Bu süreçte öğrencilerden günlük hayatta açık hava basıncına yönelik karşılaştığı durumlara eleştirel bakarak örnekler vermesi istenir (E3.10). Öğrenciler, verilen örneklerden yararlanarak günlük hayatta açık hava basıncının etkisini görebilecekleri farklı durumları değerlendirir."
- **Açılış sorusu:** Hava durumu haritasındaki "alçak basınç" yazısı yarın rüzgâr çıkacağını nasıl haber verir?
- **Akılda kalıcı cümle:** Hava, basıncın yüksek olduğu yerden alçak olduğu yere akar.

### Konu D · Kaldırma kuvveti

#### D1 · Kaldırma kuvveti neye bağlı? Deneyi kur

- **Tek fikir:** Kaldırma kuvvetinin hangi değişkenlere bağlı olduğu, her seferinde tek değişkeni değiştiren bir deneyle bulunur.
- **Anlatılacaklar:**
  1. Arşimet ve Kral Hiero'nun Altın Tacı öyküsü (yalnızca programın andığı kadarıyla; bölüm 6, soru 7).
  2. Kaldırma kuvveti ile onu etkileyen değişkenler arasındaki ilişkiyi belirleyecek deneyin tasarlanması: ne ölçülecek, ne değiştirilecek, ne sabit tutulacak.
  3. Tasarlanan deneyle (benzetimde) ölçüm yapılması ve verilerin toplanması.
  4. Verilerle kaldırma kuvvetinin bağlı olduğu değişkenlerin analiz edilmesi (hangi değişkenler: bölüm 6, soru 4).
- **Program dayanağı:** FİZ.9.3.5 a) "Kaldırma kuvveti ile kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik bir deney tasarlar." b) "Kaldırma kuvveti ile ilgili deney düzeneğinden veri toplayarak kaldırma kuvvetinin bağlı olduğu değişkenleri analiz eder." Uygulamalar: "Arşimet ve Kral Hiero’nun Altın Tacı öyküsü görsel içeriklerle desteklenerek ve tarih disiplini ile ilişki kurularak sınıfta anlatılabilir… Öğrenciler, gruplar hâlinde kaldırma kuvveti ile kaldırma kuvvetinin bağlı olduğu değişkenler arasındaki ilişkiyi belirlemek için deney tasarlar (SDB1.2) ve tasarladıkları deney ile ölçümler yapar. Yaptıkları deneyden elde ettikleri verileri (OB7) kullanarak kaldırma kuvvetinin bağlı olduğu değişkenleri analiz eder (E3.6)."
- **Açılış sorusu:** Denizde bir arkadaşını kucağına almak karadakinden neden çok daha kolaydır?
- **Akılda kalıcı cümle:** Tek değişkeni değiştir, kaldırma kuvvetine bak.

#### D2 · Kaldırma kuvveti, taşan sıvının ağırlığı kadardır

- **Tek fikir:** Kaldırma kuvvetinin büyüklüğü, cismin yer değiştirdiği sıvının ağırlığının büyüklüğüne eşittir (Arşimet İlkesi).
- **Anlatılacaklar:**
  1. D1'in verileri yorumlanır; kaldırma kuvvetinin büyüklüğü ile yer değiştiren sıvının ağırlığının büyüklüğü arasındaki ilişkiye dair hipotez kurulur (tahmin).
  2. Deney verisiyle hipotezin sınanması: iki büyüklük yan yana ölçülür.
  3. Kaldırma kuvvetinin matematiksel modeline ulaşılması (yazımı: bölüm 6, soru 2).
  4. Modeldeki nicelikler arasındaki orantısal ilişkiler; bunun ötesinde hesap yok.
- **Program dayanağı:** FİZ.9.3.6 a) "Kaldırma kuvveti ile yer değiştiren sıvının ağırlığı arasındaki ilişkiye dair mevcut bilgisi dâhilinde hipotez kurar." b) "Kaldırma kuvveti ile ilgili yaptığı deneyden elde ettiği verileri kullanarak matematiksel modeli bulur." Uygulamalar: "…kaldırma kuvvetinin büyüklüğü ile yer değiştiren sıvının ağırlığının büyüklüğü arasındaki ilişkiye dair mevcut bilgisi dâhilinde hipotez kurar. Deneyden elde ettikleri verilerle kaldırma kuvvetinin matematiksel modeline ulaşır (OB7). Matematiksel model pekiştirilirken modeldeki nicelikler arasındaki orantısal ilişkilerle sınırlı kalınır."
- **Açılış sorusu:** Ağzına kadar dolu küvete girince taşan su ile hafiflemen arasında bir bağ var mı?
- **Akılda kalıcı cümle:** Cisim ne kadar sıvıyı yerinden ederse o kadar kaldırılır.

#### D3 · Kaldırma kuvveti nereden gelir?

- **Tek fikir:** Kaldırma kuvvetinin modeli ile sıvı basıncının modeli aynı niceliklerden kurulur; kaldırma kuvveti, sıvıdaki basınca neden olan kuvvetle ilişkilidir.
- **Anlatılacaklar:**
  1. Kaldırma kuvveti (D2) ve sıvı basıncı (B2) matematiksel modellerinin yan yana konup karşılaştırılması: ortak ve farklı nicelikler.
  2. Sıvı basıncı ile kaldırma kuvveti arasındaki ilişkinin görsel içerikle fark edilmesi.
  3. Kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair önerme.
  4. Sınır: karşılaştırma yalnızca sıvılardaki kaldırma kuvvetiyle yapılır (gazlar yok).
- **Program dayanağı:** FİZ.9.3.6 c) "Kaldırma kuvveti ve sıvı basıncına ait matematiksel modelleri karşılaştırır." ç) "Kaldırma kuvveti ve sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair önermede bulunur." Uygulamalar: "Öğrenciler, sıvı basıncı ve kaldırma kuvveti arasındaki ilişkiyi fark edebilecekleri görsel veya dijital içeriklerden yararlanarak kaldırma kuvveti ve sıvı basıncına ait matematiksel modelleri karşılaştırır. Bu karşılaştırmada sıvılardaki kaldırma kuvveti ile sınırlı kalınır. Öğrenciler karşılaştırmalardan elde ettikleri bilgiyi kullanarak kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair önermelerde bulunurlar." Tema amacı: "…kaldırma kuvvetinin nedenlerine yönelik çıkarımda bulunmaları…"
- **Açılış sorusu:** Suya batırdığın topu alttan yukarı iten şey nedir?
- **Akılda kalıcı cümle:** Sıvı alttan daha çok bastırır; kaldırma kuvveti bu farktır.

#### D4 · Gemi, denizaltı, çöp adası

- **Tek fikir:** Arşimet İlkesi, deniz araçlarının ve yüzen plastik atıkların davranışını açıklar. (Veri ve önerme değerlendirmesi 12 Ekim 2026'da D5'e ayrıldı; karar 25.)
- **Anlatılacaklar:**
  1. Gemi ve denizaltı gibi deniz araçlarında kaldırma kuvvetinin uygulamaları; Türkiye'nin geliştirdiği deniz araçları (programın yazdığı kadarıyla; bölüm 6, soru 12).
  2. Denizlerdeki plastik atıkların oluşturduğu çöp adaları: bu atıklar suyun yüzeyinde kaldırma kuvvetinden dolayı yüzer.
  3. Atık sorununa kaldırma kuvvetinden yararlanan bir çözüm düşüncesi.
- **Program dayanağı:** FİZ.9.3.6 d) "Kaldırma kuvveti ve sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair değerlendirme yapar." Uygulamalar: "Öğrencilere Arşimet İlkesi’ni pekiştirmeleri için Türkiye’nin millî çıkarları doğrultusunda geliştirdiği (D19.3) gemi, denizaltı gibi deniz araçları üzerinden kaldırma kuvvetinin uygulamaları hakkında bilgilendirici bir metin verilir… Denizlerdeki plastik atıklardan kaynaklanan kirliliğin oluşturduğu çöp adaları hakkında görsel ögeler kullanılarak öğrencilere bilgi verilir. Bu plastik atıkların suyun yüzeyinde kaldırma kuvvetinden dolayı yüzdüğü vurgulanır. Öğrencilerden… bu atık sorununa kaldırma kuvvetinden yararlanarak çözüm üretmeleri… istenir. ÖÖğrenciler, verilen örneklerden yararlanarak kaldırma kuvveti ile ilgili yaptıkları deneyden elde ettikleri verileri Arşimet İlkesi kapsamında değerlendirir." Köprü kurma: "Yoğunluk ve kaldırma kuvveti kavramları günlük hayattan örneklerle (gemiler, denizaltılar, denizlerdeki plastik adaları vb.) ilişkilendirilebilir."
- **Açılış sorusu:** Çelik bir çivi batarken binlerce ton çelikten yapılmış gemi nasıl yüzer?
- **Akılda kalıcı cümle:** Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.

#### D5 · Ölçümü de önermeyi de ilkeyle sına

- **Tek fikir:** Arşimet İlkesi bir ölçüttür: deney verisi ve kaldırma kuvvetiyle ilgili bir önerme, ilkeyle ve F_k = F₂ − F₁ ilişkisiyle karşılaştırılarak değerlendirilir.
- **Anlatılacaklar:**
  1. Bir ölçümün ilkeyle uyumu: kaldırma kuvveti ile taşan sıvının ağırlığı eşit mi (çözülmüş iki örnek: uyumlu, uyumsuz); uyumsuz ölçüm yinelenir.
  2. Ölçümlerin birbiriyle tutarlılığı: modelin orantıları (batan hacim, sıvının yoğunluğu).
  3. Bir önermenin sınanması: "derine indikçe kaldırma kuvveti artar" önermesi silindirin iki derinliğiyle; ardından beş önermenin doğru–yanlış değerlendirmesi.
- **Program dayanağı:** FİZ.9.3.6 d) "Kaldırma kuvveti ve sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair değerlendirme yapar." Uygulamalar: "ÖÖğrenciler, verilen örneklerden yararlanarak kaldırma kuvveti ile ilgili yaptıkları deneyden elde ettikleri verileri Arşimet İlkesi kapsamında değerlendirir."
- **Açılış sorusu:** Bir ölçümün hatalı olduğunu, deneyi yeniden yapmadan anlayabilir misin?
- **Akılda kalıcı cümle:** Ölçümü de önermeyi de ilkeyle sına.

### Konu E · Bernoulli İlkesi

#### E1 · Dar yerde hızlı, hızlı yerde düşük basınç

- **Tek fikir:** Akışkan, borunun daraldığı yerde hızlanır; süratinin arttığı yerde boru çeperlerine yaptığı basınç azalır.
- **Anlatılacaklar:**
  1. Tahmin: borunun kesit alanı azaltılırsa akış sürati nasıl değişir? (Bahçe hortumunun ucunu sıkma örneği.)
  2. Gözlem: akış modelinin benzetimde izlenmesi; tahmin ile gözlemin karşılaştırılması ve gerekçelendirilmesi.
  3. Saç kurutma makinesiyle havada tutulan masa tenisi topu gösterisi (benzetim olarak).
  4. Kesit alanı ile akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkinin belirlenmesi.
  5. Sürat–basınç ilişkisinin genellenmesi: Bernoulli İlkesi. Yalnızca kavramsal; formül yok.
- **Program dayanağı:** FİZ.9.3.7 a) "Akışkanların sürati ile basıncı arasındaki ilişkiyi gözlemleyerek aralarındaki ilişkiyi tespit eder." Uygulamalar: "Öğretmen konunun anlatımında tahmin et-gözle-açıkla tekniğini kullanabilir. Öğrencilerden akışkanların geçtiği borunun kesit alanının azaltılması ile akış süratinde oluşan değişimi tahmin etmelerini isteyebilir… bahçe hortumundan akan suyun hortumun ucu sıkıldığında akış süratinin değiştiği örneği verilebilir. Saç kurutma makinesi ile masa tenisi topunun havada tutulduğu bir gösteri deneyi yapılabilir. Öğrenciler tahmin ve gözlem sonuçlarını karşılaştırarak gerekçelendirebilir… Akışkanın geçtiği borunun kesit alanı ile akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkiyi belirler. Akışkanın sürati ile akışkanın basıncı arasında tespit ettikleri ilişkiyi genelleyerek Bernoulli İlkesi’ne ulaşırlar… Bu ilkeye ilişkin genelleme, kavramsal olarak verilir ve matematiksel modelden kaçınılır."
- **Açılış sorusu:** Bahçe hortumunun ucunu parmağınla sıkınca su neden daha uzağa fışkırır?
- **Akılda kalıcı cümle:** Akışkan hızlandığı yerde daha az bastırır.

#### E2 · Bernoulli her yerde

- **Tek fikir:** Çatının uçmasından spreye, yelkenliden yarış arabasına birçok olay aynı sürat–basınç ilişkisiyle açıklanır; örnekler amaca göre gruplanınca ilke genellenir.
- **Anlatılacaklar:**
  1. Programın saydığı beş örneğin Bernoulli İlkesi ile açıklanması: rüzgârlı havalarda çatıların uçması, sprey püskürtücülerde sıvının yükselmesi, hızla hareket eden araçların yakınındaki nesneleri çekmesi, yelkenlilerin rüzgâra karşı gidebilmesi, yarış arabalarının aerodinamiğe uygun tasarlanması.
  2. Örneklerin amaca göre ortak olan ve olmayan özelliklerinin belirlenmesi: havaya kaldırma, havalanmasını engelleme, yön değiştirme.
  3. Sürat–basınç ilişkisinin bu örnekler üzerinden genellenmesi.
  4. Uçakların havalanması ve uçmasında yalnızca Bernoulli İlkesi etkili değildir.
- **Program dayanağı:** FİZ.9.3.7 b) "Akışkanın sürati ile basıncı arasındaki ilişkiyi günlük hayat örnekleri üzerinden geneller." Uygulamalar: "Öğrencilere; rüzgârlı havalarda çatıların uçması, sprey püskürtücülerde sıvının yükselmesi, hızla hareket eden araçların yakınındaki nesneleri çekmesi, yelkenlilerin rüzgâra karşı gidebilmesi, yarış arabalarının aerodinamiğe uygun olarak tasarlanması gibi olaylar ve durumlar örnek olarak verilir. Öğrenciler Bernoulli İlkesi’ne ilişkin verilen örneklerin amaca göre (havaya kaldırma, havalanmasını engelleme, yön değiştirme vb.) ortak olan ve olmayan özelliklerini… belirler… Akışkanın sürati ile basıncı arasındaki ilişkiyi bu örnekler üzerinden geneller (KB2.9, KB2.15). Uçakların havalanması ve uçmasında yalnızca Bernoulli İlkesi'nin etkili olmadığı vurgulanır."
- **Açılış sorusu:** Fırtınada bir çatı aşağı bastırılmak yerine neden yukarı doğru kalkıp uçar?
- **Akılda kalıcı cümle:** Hava nerede hızlıysa cisim oraya çekilir.

### Kısa ders listesi (kararlardan sonra)

Dosya adı `<kod>-<ad>.html` ve `dersler/<kod>-<ad>.js`; kimlik `akiskanlar-<kod>`. "Kitap" sütunu bölüm 8'deki sayfalardır. Konu renkleri (`tema.js`): A `#f5b04c`, B `#3cc8e8`, C `#6ea8ff`, D `#3ddc97`, E `#c792ff`.

| Kod | Dosya adı | Başlık | Kitap | Örnekler ve güç kavramın gösterimi | Karar |
|---|---|---|---|---|---|
| A1 | `a1-basinc-neye-bagli` | Basınç neye bağlı? | s. 133–143 | Karda bot ve kar ayakkabısı; kumda özdeş tuğlalar (yatık–dik, tek–üst üste, üst üste–T biçimi); çivi; artır–azalt sınıflaması. Güç kavram: kuvvet aynı kalırken basıncın değişmesi; kuma batma derinliğiyle gösterilir, sayı yok | 2, 19 |
| A2 | `a2-olc-kaydet-model` | Ölç, kaydet, modele ulaş | s. 137, 139–140, 143–144 | Basınçölçerli kum düzeneği, iki tablo (alan sabit, kuvvet sabit; örnek veri), P = F/A; çözülmüş örnek dört küp (s. 140), birlikte çöz altı küp (s. 144). Güç kavram: ters orantı; tablo ve kaydırıcı | 2, 5, 19 |
| A3 | `a3-tekrar` | Konu tekrarı: Basınç | | 1 sahne + 8 soru | |
| B1 | `b1-derine-dalmak` | Derine dalmak neden zor? | s. 145, 149–150, 184 | Serbest dalış, kulak, vurgun, basınç odası, dalış teçhizatı; üç etmen: derinlik, yoğunluk, yer çekimi ivmesi. Güç kavram: üstteki sıvının ağırlığı; su sütunu çizimi | 3, 11 |
| B2 | `b2-durgun-sivi-basinci` | Deneyle modele: durgun sıvının basıncı | s. 147–153 | Basınçölçerli kap benzetimi (derinlik, sıvı, kap şekli), P = h·d·g; kabın şekli ve sıvı miktarı etkisiz (Görsel 3.6, 5. Alıştırma); delikli şişe (s. 153); baraj duvarı (s. 152). Güç kavram: şekil etkisiz; yan yana üç kap | 2, 3, 19 |
| B3 | `b3-sivi-basinciyla-calisan-sistemler` | Sıvı basıncıyla çalışan sistemler | s. 146, 154–158, 160 | Pascal Yasası; su cenderesi (küçük piston F, büyük piston G; A₂ > A₁); hidrolik lift, kriko, fren, pres, kepçe, damperli kamyon, itfaiye merdiveni, hastane yatağı, berber koltuğu. Güç kavram: aynı basınç, farklı kuvvet; iki pistonda eşit boylu basınç okları, farklı sayıda | 6 |
| B4 | `b4-merak-et-sor-dogrula` | Merak et, sor, doğrula | s. 154–156 | Hidrolik fren üzerine bir sorgulama: soru seçme, kaynak seçme, beş soruluk kontrol listesi (s. 155), çıkarım. Güç kavram: bilginin sınanması; kaynak kartları ve işaretlenen liste | 10, 16 |
| B5 | `b5-tekrar` | Konu tekrarı: Sıvılarda basınç | | 1 sahne + 8–10 soru | |
| C1 | `c1-hava-da-bir-akiskandir` | Hava da bir akışkandır | s. 161–162, 164, 166 | Dağcılar; açık hava basıncının tanımı; sıvı ile hava: benzerlik (ağırlık), fark (sıkışma, yoğunluk homojen değil); derinlik–yükseklik. Güç kavram: hava sütunu; yükseldikçe seyrelen tanecikler | 16 |
| C2 | `c2-torricelli` | Torricelli havayı nasıl tarttı? | s. 164–165, 167 | Düzenek (1 m boru, cıva kabı, 76 cm, boşluk); P₀ = P cıva; eğik ve kalın boruda aynı yükseklik (Görsel 3.17); 1 atm hesabı. Güç kavram: iki basıncın dengesi; kap yüzeyinde karşılıklı iki ok | 5, 8, 20 |
| C3 | `c3-atmosfer-basinci-degisir` | Atmosfer basıncı her yerde aynı değil | s. 162–163, 165–166 | Sıcaklık ve yoğunluk; alçak ve yüksek basınç alanı; rüzgâr; türbin; dağcı, yükselen balon, Magdeburg yarım küreleri, pipet. Güç kavram: ısınan havanın yükselmesi; iki panelli şema (s. 162) | 9 |
| C4 | `c4-tekrar` | Konu tekrarı: Açık hava basıncı | | 1 sahne + 8 soru | |
| D1 | `d1-kaldirma-kuvveti-deneyi` | Kaldırma kuvveti neye bağlı? Deneyi kur | s. 170–175, 180 | Altın taç öyküsü (s. 170); dinamometreli düzenek (kitap dışı, karar 19): batan hacim, sıvının yoğunluğu, derinlik (etkisiz); yüklü ve boş gemi (s. 173), top ve tuzlu su (s. 174). Güç kavram: görünmeyen yukarı kuvvet; dinamometre göstergesinin azalması | 4, 7, 19, 20 |
| D2 | `d2-arsimet-ilkesi` | Kaldırma kuvveti, yer değiştiren sıvının ağırlığı kadardır | s. 170, 180, 183 | Taşırma kabı ve terazi (kitap dışı düzenek, karar 19): kaldırma kuvveti ile taşan suyun ağırlığı yan yana; Arşimet İlkesi; F_k = V_b·d_s·g; orantı yorumları. Güç kavram: yer değiştiren sıvı; cismin sıvıdaki "boşluğu" kadar su | 2, 4, 19, 20 |
| D3 | `d3-kaldirma-kuvveti-nereden-gelir` | Kaldırma kuvveti nereden gelir? | s. 176–177, 179–180, 183 | Sıvıdaki silindir: üstte F₁, altta F₂, yanlarda dengelenen kuvvetler; F_k = F₂ − F₁; iki modelin yan yana konması; derinlikten bağımsızlık. Güç kavram: basınç farkı; derinlikle uzayan oklar | 2 |
| D4 | `d4-gemi-denizalti-cop-adasi` | Gemi, denizaltı, çöp adası | s. 169, 173, 175, 177–179, 181–183 | Çelik bilye ve gemi (ortalama yoğunluk); yüzme, askıda kalma, batma; denizaltının safra tankları; TCG Anadolu ve öteki adlar; çöp adaları ve yüzeyde toplama. Güç kavram: ortalama yoğunluk; içi boş gövde | 12, 13 |
| D5 | `d5-olcumu-ilkeyle-sina` | Ölçümü de önermeyi de ilkeyle sına | s. 176–177, 179–180, 183 | Ela'nın sekiz ölçümü (örnek veri): ilkeyle uyumlu ve uyumsuz satırlar, modelin orantılarıyla tutarlılık; silindirin iki derinliğiyle bir önermenin sınanması; beş önermenin doğru–yanlış değerlendirmesi (tanılayıcı ağaç, s. 179). Güç kavram: ilkenin ölçüt olması; satırda yan yana iki değer ve "=" / "≠" | 19, 25 |
| D6 | `d6-tekrar` | Konu tekrarı: Kaldırma kuvveti | | 1 sahne + 10 soru | |
| E1 | `e1-dar-yerde-hizli` | Dar yerde hızlı, hızlı yerde düşük basınç | s. 185–186, 188–190, 192, 194 | Bahçe hortumu; Venturi tüpü (A₁ > A₂ > A₃, v₃ > v₂ > v₁, P₁ > P₂ > P₃, h₁ > h₂ > h₃); kâğıda üfleme, asılı iki kâğıt, saç kurutma makinesi ve top. Güç kavram: basıncın düşmesi; düşey borulardaki su yüksekliği | 14, 15, 22 |
| E2 | `e2-bernoulli-her-yerde` | Bernoulli her yerde | s. 187, 189–192, 195 | Çatı, sprey, yan yana araçlar, yelken, yarış arabasının arka kanadı; amaca göre sınıflama; şemsiye; uçak (tek cümle). Güç kavram: görünmeyen hava akışı; akış çizgileri sıklaşır | 15 |
| E3 | `e3-tekrar` | Konu tekrarı: Bernoulli İlkesi | | 1 sahne + 6–8 soru | |

## 4. Müfredat denetimi

Programın her isteği bir satır. Durum: `ders`, `benzetim` ya da `site dışı` (`KURALLAR.md` 2.2). Bu dosyadaki her kısa ders tabloda en az bir kez geçer. Sahne numaraları (S) yazılan dersteki sıradır ("Hatırla" S1; A1'de "Hatırla" yok), 12 Ekim 2026'da işlendi; C ve E senaryolarında "Hatırla" numarasız olduğu için dersteki numara senaryodakinden bir fazladır.

| Programın istediği | Durum | Hangi kısa ders (sahne) |
|---|---|---|
| Tema amacı: basınç ve akışkanların basıncına yönelik çıkarım; sıvı basıncının günlük örneklerini sorgulama; açık hava basıncına ilişkin çıkarım; kaldırma kuvveti deneyi ve nedenlerine yönelik çıkarım; Bernoulli İlkesi'ne yönelik genelleme | ders | A2, B2, B4, C1–C3, D1–D3, E2 (tema geneli) |
| FİZ.9.3.1 a) basınca etki eden etmenleri tanımlama | benzetim | A1 (S2–S4) |
| FİZ.9.3.1 b) basınçla ilgili verileri kaydetme | benzetim | A2 (S2–S4) |
| FİZ.9.3.1 c) verilerden ulaşılan matematiksel modelle basınca ilişkin çıkarım | ders | A2 (S5–S7) |
| Basıncın etkili olduğu günlük hayat örnekleri; konfor, kolaylık, işe yararlık açısından değerlendirme; iyileştirme fikri | ders | A1 (S1, S5, S6) |
| Basınçla ilgili sistemlerin işleyişinde basıncın rolü | ders | A1 (S5, S6) |
| Basınç, basınca neden olan kuvvet ve yüzey alanı verilerinin benzetimle toplanması | benzetim | A2 (S2–S4) |
| Sınır: basınç modelinde değişkenlerin ilişkisini yorumlamakla sınırlı kalma | ders | A2 (S5–S7) |
| Köprü kurma: topuklu ayakkabı ve düz ayakkabı | ders | A1 (S1, S6) |
| FİZ.9.3.2 a) durgun sıvılarda basınca etki eden etmenleri tanımlama | ders | B1 (S3, S4, S7), B2 (S3–S5) |
| FİZ.9.3.2 b) durgun sıvı basıncı verilerini kaydetme | benzetim | B2 (S3–S5) |
| FİZ.9.3.2 c) matematiksel modelle durgun sıvılarda basınca ilişkin çıkarım | ders | B2 (S6–S11) |
| Serbest dalış; derine dalmanın zor olmasının nedenleri; uygun teknik ve teçhizat; vurgun; su altı sporlarında sağlık riskleri | ders | B1 (S2, S3, S5) |
| Durgun sıvılarda basıncı etkileyen değişkenleri belirlemeye yönelik deney tasarlama ve yapma | benzetim | B2 (S2–S5) |
| Sınır: durgun sıvı basıncı modelinde yorumlamayla sınırlı kalma; kabın yan yüzeylerine etki eden kuvvet hesabından kaçınma | ders | B2 (S6–S11; yan yüzeyde yalnızca basınç okları: S5, S9, S10) |
| Köprü kurma: baraj duvarları | ders | B2 (S9) |
| FİZ.9.3.3 a) merak edilen konuyu belirleme | benzetim | B4 (S3); örnekler B3 (S6) |
| FİZ.9.3.3 b) merak edilen konuyla ilgili soru sorma | benzetim | B4 (S3) |
| FİZ.9.3.3 c) bilgi toplama (araç seçimi, sistematik toplama) | benzetim | B4 (S4) |
| FİZ.9.3.3 ç) toplanan bilgilerin doğruluğunu değerlendirme (doğruluk, güvenilirlik, amaca uygunluk, açıklık) | benzetim | B4 (S5–S8) |
| FİZ.9.3.3 d) toplanan bilgiler üzerinden çıkarım | benzetim | B4 (S8, S9) |
| Sıvı basıncıyla çalışan sistemlerin görselleri ve işleyişleri; su cendereleri, hidrolik sistemler | ders | B3 (S2–S6) |
| Sıvı basıncının kullanıldığı sistemlerde sıvı basıncının rolü | ders | B3 (S2, S4, S6, S7) |
| Çıkarımı fotoğraf, resim, tablo, şekil ya da grafikle destekleme | site dışı (metin, afiş, sunum sınıfta yapılır); destek türünü seçme benzetim | B4 (S8) |
| FİZ.9.3.4 a) sıvı basıncı bilgisinden yararlanarak açık hava basıncına yönelik hipotez | benzetim | C1 (S2, S4) |
| FİZ.9.3.4 b) sıvı basıncıyla açık hava basıncı arasındaki ilişkileri listeleme | benzetim | C1 (S7) |
| FİZ.9.3.4 c) sıvı basıncıyla açık hava basıncını karşılaştırma | ders | C2 (S3, S4); benzerlik ve farklar C1 (S7) |
| FİZ.9.3.4 ç) açık hava basıncına ilişkin önermeler | benzetim | C3 (S6, S7) |
| FİZ.9.3.4 d) açık hava basıncı bilgisini farklı durumlarda değerlendirme | ders | C3 (S7–S10) |
| Sıvıda basınca neden olan kuvvetin sıvının ağırlığından kaynaklandığının hatırlatılması; havanın da akışkan olması | ders | C1 (S1, S2) |
| Sıvı homojen, havanın yoğunluğu homojen değil; derinlik ile yükseklik; yükseklerde basıncın daha az olması | ders | C1 (S3–S5) |
| Torricelli'nin ölçmesi ve ölçme yöntemi; cıva sütununun ağırlığı ile açık hava basıncının dengelenmesi | ders | C2 (S2, S3) |
| Atmosfer (atm) birimi ve temel birimler cinsinden hesaplanması | ders | C2 (S5, S6) |
| Açık hava basıncının sıcaklıkla genleşme ve yerel yoğunluk değişimine bağlı olarak değişmesi; "atmosfer basıncı" adı | ders | C3 (S2, S3) |
| Alçak ve yüksek basınç bölgeleri, rüzgârın oluşumu; rüzgâr ve yenilenebilen enerji | ders | C3 (S3–S5) |
| Günlük hayatta açık hava basıncıyla karşılaşılan durumlara örnekler | ders | C3 (S7–S10); açılış sorularında C1, C2 |
| FİZ.9.3.5 a) kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik deney tasarlama | benzetim | D1 (S5–S8) |
| FİZ.9.3.5 b) deney düzeneğinden veri toplayarak değişkenleri analiz etme | benzetim | D1 (S6–S8, S10) |
| Arşimet ve Kral Hiero'nun Altın Tacı öyküsü | ders | D1 (S2) |
| FİZ.9.3.6 a) kaldırma kuvveti ile yer değiştiren sıvının ağırlığı arasındaki ilişkiye dair hipotez | benzetim | D2 (S2–S4) |
| FİZ.9.3.6 b) deney verileriyle matematiksel modeli bulma | benzetim | D2 (S4–S6, S8) |
| Sınır: kaldırma kuvveti modelinde nicelikler arasındaki orantısal ilişkilerle sınırlı kalma | ders | D2 (S7–S10) |
| FİZ.9.3.6 c) kaldırma kuvveti ve sıvı basıncı modellerini karşılaştırma | ders | D3 (S9) |
| FİZ.9.3.6 ç) kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair önerme | benzetim | D3 (S9, S10) |
| Sınır: karşılaştırmada sıvılardaki kaldırma kuvvetiyle sınırlı kalma | ders | D3 (S9) |
| FİZ.9.3.6 d) kaldırma kuvveti ile basınca neden olan kuvvet ilişkisine dair değerlendirme | ders | D5 (S6, S7) |
| Arşimet İlkesi; gemi, denizaltı gibi deniz araçlarında kaldırma kuvvetinin uygulamaları | ders | D2 (S5: ilke), D4 (S2–S4, S6, S8: uygulamalar) |
| Plastik atıkların oluşturduğu çöp adaları; atıkların kaldırma kuvvetinden dolayı yüzmesi; çözüm üretme | ders; çözüm üretme benzetim (seçenekli) | D4 (S9, S10) |
| Deney verilerini Arşimet İlkesi kapsamında değerlendirme | benzetim | D5 (S2–S5) |
| Köprü kurma: yoğunluk ve kaldırma kuvveti (gemiler, denizaltılar, denizlerdeki plastik adaları) | ders | D4 (S2–S9) |
| FİZ.9.3.7 a) sürat ile basınç arasındaki ilişkiyi gözlemleyerek tespit etme | benzetim | E1 (S3–S5, S10) |
| FİZ.9.3.7 b) sürat–basınç ilişkisini günlük hayat örnekleri üzerinden genelleme | ders | E2 (S2–S9) |
| Tahmin et-gözle-açıkla; kesit alanı azalınca akış süratindeki değişimi tahmin etme; tahmin ile gözlemi karşılaştırma | benzetim | E1 (S2, S6–S8) |
| Bahçe hortumu örneği; saç kurutma makinesi ve masa tenisi topu gösterisi | benzetim | E1 (S2, S8) |
| Kesit alanı, sürat ve boru çeperlerine yapılan basınç arasındaki ilişki; Bernoulli İlkesi'ne ulaşma | ders | E1 (S3–S9) |
| Beş örnek: çatıların uçması, sprey püskürtücü, hızlı araçların yakınındaki nesneleri çekmesi, yelkenlinin rüzgâra karşı gitmesi, yarış arabası | ders | E2 (S2, S4–S7) |
| Örneklerin amaca göre ortak olan ve olmayan özellikleri (havaya kaldırma, havalanmasını engelleme, yön değiştirme) | benzetim | E2 (S9, S10) |
| Uçakların havalanması ve uçmasında yalnızca Bernoulli İlkesi'nin etkili olmadığı | ders | E2 (S8) |
| Sınır: Bernoulli İlkesi kavramsal verilir, matematiksel modelden kaçınılır | ders | E1, E2 |
| İçerik çerçevesi: Basınç | ders | A1, A2 |
| İçerik çerçevesi: Sıvılarda Basınç | ders | B1–B4 |
| İçerik çerçevesi: Açık Hava Basıncı | ders | C1–C3 |
| İçerik çerçevesi: Kaldırma Kuvveti | ders | D1–D5 |
| İçerik çerçevesi: Bernoulli İlkesi | ders | E1, E2 |
| Anahtar kavram: basınç | ders | A1 (S2–S4) |
| Anahtar kavram: kaldırma kuvveti | ders | D1 (S3) |
| Temel kabuller (yoğunluk kavramı; katı ve sıvıların özellikleri) | ön bilgi | Ayrı ders yok; ön bilgi |
| Grup çalışması, tartışma, beyin fırtınası; metin, afiş, poster, sunum, araştırma raporu, zihin haritası; çalışma yaprağı, test, performans görevi | site dışı (sınıfta yapılır) | Derslerde yok (bölüm 5) |
| Konu tekrarı (`KURALLAR.md` 3.4): yeni bilgi yok, konunun kuralları ve 6–10 karışık soru | tekrar | A3, B5, C4, D6, E3 |

## 5. Bilerek alınmayanlar

**Ön bilgi sayılanlar (ayrı ders yok):**

- Yoğunluk kavramı. B2, D2 ve D4'te kullanılır, yeniden anlatılmaz.
- Katı ve sıvıların özellikleri.
- Kuvvet ve ağırlık kavramları program metninde tanımlanmadan kullanılıyor; bu temada ayrıca anlatılmaz.

**Programın koyduğu sınırlar (geçilmez):**

- Basınç modeli: "değişkenlerin ilişkilerine yönelik yorumlamalarla sınırlı kalınır". Çok adımlı sayısal problem yok.
- Durgun sıvı basıncı modeli: aynı sınır; ayrıca "kabın yan yüzeylerine etki eden basınca neden olan kuvvete ilişkin matematiksel işlemlerden kaçınılır".
- Kaldırma kuvveti modeli: "modeldeki nicelikler arasındaki orantısal ilişkilerle sınırlı kalınır".
- Kaldırma kuvveti–basınç karşılaştırması: "sıvılardaki kaldırma kuvveti ile sınırlı kalınır". Gazlarda kaldırma kuvveti (balon, zeplin) yok.
- Bernoulli İlkesi: "kavramsal olarak verilir ve matematiksel modelden kaçınılır". Bernoulli denklemi yok.
- Uçak örneği: yalnızca "uçmasında yalnızca Bernoulli İlkesi'nin etkili olmadığı" cümlesi. Öteki etkiler programda sayılmıyor; anlatılmaz.

**Zenginleştirme (derslere girmez):**

- Serum hortumu ve şırıngayla hidrolik sistem tasarımı ve yük kaldırma yarışması.
- Mermer gibi malzemelerin basınçlı suyla kesimi; Bernoulli İlkesi'nin sanayideki kullanımları.
- Uçak, helikopter, insansız hava araçlarının uçuş ve manevralarında Bernoulli İlkesi'nin etkisi. E2 bu yöne kaymaz.
- Torricelli deneyine benzer sistem tasarımı; cıva yerine su gibi başka sıvılarla sıvı yüksekliğinin hesaplanması; yüksek binalarda suyun üst katlara pompayla çıkarılması. C2 yalnızca cıvalı ölçmeyi anlatır.
- Sörf, sal, yelkenli gibi sporlar için alet geliştirme; balıkların hava keseleri; motorsuz model uçak ve Bernoulli oyuncağı tasarımı.

**Destekleme (zorunlu değil; ders içeriği değil):**

- Yüzen plastik bardağa madenî para ekleme gözlemi; asılı iki kâğıdın arasına üfleme gösterisi. İkisi de ders konusu değil; D2, D4 ya da E1'de sahne aracı olarak kullanılıp kullanılmayacağı senaryo aşamasında karara bağlanır.

**Programın sınıf içi etkinlikleri (siteye taşınmaz):**

- Grup oluşturma, takım çalışması, tartışma, beyin fırtınası, düşün-eşleş-paylaş, vızıltı grupları.
- Öğrencinin kendi metnini, afişini, posterini, slaytını, araştırma raporunu, zihin haritasını üretmesi ve sunması (FİZ.9.3.3, FİZ.9.3.5, öğrenme kanıtları).
- Öğretmenin vereceği metinler: dalış tekniği ve teçhizatı metni, Arşimet öyküsünün metni, deniz araçları hakkında bilgilendirici metin.
- Çalışma yaprağı, açık uçlu test, performans görevi, puanlama anahtarı, kontrol listesi, öz ve grup değerlendirmesi; ön değerlendirme soruları.
- Dalış yapan sporcunun yerinde olsa ne hissedeceğini sorgulama (SDB1.1): duygu sorgusu ders içeriği değil.

**Bu konularda geleneksel olarak anlatılan ama programda olmayan başlıklar** (kullanıcı isterse eklesin):

1. Katı basıncında ağırlığın bileşenleri, eğik düzlemde basınç, üst üste konan cisimler; basınç kuvveti hesapları.
2. Pascal Prensibi'nin adı ve F₁/A₁ = F₂/A₂ bağıntısıyla hesap (bölüm 6, soru 6).
3. Bileşik kaplar, U borusu, karışmayan sıvıların denge yükseklikleri.
4. Kabın şeklinin sıvı basıncına etkisi, kap ters çevrilince basınç ve basınç kuvveti soruları.
5. Kapalı kaplardaki gaz basıncı, manometre, altimetre, batimetre; barometre türleri.
6. Açık hava basıncının kanıtı sayılan tarihî deneyler (Magdeburg yarım küreleri gibi); pipet, vantuz, şırınga açıklamaları adıyla programda yok (C3'te "günlük durumlar" olarak hangilerinin alınacağı: bölüm 6, soru 9).
7. Yüzme, askıda kalma, batma koşullarının yoğunluk karşılaştırmasıyla üçlü sınıflaması ve bunlara dair problemler (bölüm 6, soru 13).
8. Kaldırma kuvvetinde ip gerilmesi, kap tabanına tepki, taşırma kabı, karışmayan sıvılarda dengede kalan cisim problemleri.
9. Gazların kaldırma kuvveti (balonlar).
10. Süreklilik denklemi (A·v = sabit) ve debi hesabı (bölüm 6, soru 14); Bernoulli denklemi; venturi borusu, pitot tüpü.
11. Yüzey gerilimi, adezyon, kohezyon, kılcallık. İçerik çerçevesinde ve çıktılarda yok.

## 6. Açık sorular

7 Ekim 2026 taslağındaki sorular. Hepsi 12 Ekim 2026'da bölüm 7'de aynı numarayla kapandı.

1. **Ders sayısı.** 18 ders saatine 15 kısa ders düştü (saat başına 0,83; sınır 0,85). Fazla görünürse en kolay birleşenler: B3 + B4 (sistemler ve sorgulama tek derste; çıktı tek: FİZ.9.3.3), D3'ün D2'ye sahne olarak katılması. Tersine, tek fikre sığmayabilecek üç ders var: A2 (veri, model ve çıkarım tek derste), D1 (öykü, tasarım, ölçüm ve analiz tek derste) ve E1 (kesit–sürat ile sürat–basınç iki ayrı ilişki). Bunlardan biri bile bölünürse 16 ders olur (0,89) ve sınır aşılır; o durumda bir birleştirme zorunludur.
2. **Matematiksel modellerin yazımı.** Program üç model ister (basınç, durgun sıvı basıncı, kaldırma kuvveti) ama hiçbirinin formülünü, sembolünü ya da birimini yazmaz. Geleneksel yazımlar P = F/A, P = h·d·g, F = V·d·g biçimindedir; hangi sembollerin (d mi ρ mu, S mi A mı), g'nin ve "özağırlık"ın kullanılıp kullanılmayacağı kararınıza bağlı. Planda modelleri yalnızca "matematiksel model" diye andım.
3. **Durgun sıvı basıncının etmenleri.** FİZ.9.3.2 "etmenleri tanımlar" diyor ama etmenleri saymıyor. Program metninde derinlik FİZ.9.3.4'te ("Sıvılarda derinlik…") geçiyor, yoğunluk temel kabullerde; yer çekimi ivmesi hiç geçmiyor. Kabın şeklinin ve sıvı miktarının etkisiz olduğunu göstermek geleneksel bir sahnedir ama program anmıyor. B1 ve B2'de hangi değişkenlerin deneneceği belirlenmeli.
4. **Kaldırma kuvvetinin değişkenleri.** FİZ.9.3.5 de değişkenleri saymıyor. Programdan çıkan tek ipucu "yer değiştiren sıvının ağırlığı" ve desteklemedeki "batan hacim". D1'de benzetimde hangi değişkenlerin sunulacağı (batan hacim, sıvının yoğunluğu; etkisiz olanlar: cismin kütlesi, şekli, tamamen batmış cisimde derinlik) kararınıza bağlı.
5. **Birimler ve sayılar.** Program yalnızca "Atmosfer (atm)" birimini anıyor ve "temel birimler cinsinden hesaplanması"nı istiyor. Pascal, N/m², cmHg adları ve 1 atm'nin sayısal değeri sayfada yok; cıva sütununun yüksekliği de verilmiyor. C2'deki hesabın biçimi (hangi sayılarla, hangi birime) ve A2'de basınç birimi olarak ne kullanılacağı açık. Öte yandan her modelde "yorumlamalarla sınırlı kalınır" dendiği için C2'deki atm hesabı temadaki tek sayısal hesap olur; bunun sınırla çelişip çelişmediğine bakılmalı.
6. **Su cendereleri ve hidrolik sistemlerin derinliği.** Program bu iki örneği adıyla sayıyor ve "işleyişleri incelenir" diyor; Pascal Prensibi'ni ve kuvvet–alan bağıntısını anmıyor. B3'ü nitel işleyişle sınırladım (sıvı basıncı iletir, büyük pistonda büyük kuvvet). "Küçük kuvvetle büyük yük" ilişkisini A2'nin modeliyle açıklamak program içinde mi, yoksa Pascal Prensibi'ni dolaylı olarak eklemek mi olur?
7. **Arşimet ve Kral Hiero'nun Altın Tacı öyküsü.** Program öykünün yalnızca adını veriyor, içeriğini vermiyor ("Öğrencilere öykünün metni verilebilir"). Öykünün ayrıntıları hafızadan yazılmadı. D1'de öykü yalnız adıyla mı anılacak, yoksa doğrulanmış bir kaynaktan mı alınacak? "Öyküdekine benzer bir deney düzeneği" ifadesi de öykünün içeriğini bilmeyi gerektiriyor.
8. **Torricelli'nin ölçme yöntemi.** Program "ölçme yöntemi açıklanır" diyor ve yalnızca cıva sütunu ile açık hava basıncının dengelenmesini yazıyor; düzeneğin ayrıntısını (cam boru, cıva çanağı, boşluk) ve sonucu vermiyor. C2'de düzeneğin ne kadar ayrıntıyla çizileceği belirlenmeli.
9. **Açık hava basıncının günlük durumları.** FİZ.9.3.4 d) "farklı durumlarda değerlendirir" diyor, program örnek saymıyor (yalnızca yükseklik ve rüzgâr geçiyor). C3'te hangi durumların kullanılacağı açık; pipet, vantuz gibi geleneksel örnekler programda adıyla yok.
10. **Benzetimin yetmediği yerler.** (a) FİZ.9.3.5 ve FİZ.9.3.2 gerçek deney tasarlayıp yapmayı ister (FBAB7. Deney Yapma); sitedeki benzetim değişken seçme, ölçüm okuma ve kaydetmeyi karşılar ama düzenek kurma ve ölçüm hatasıyla uğraşma deneyimini vermez. (b) FİZ.9.3.3 öğrencinin kendi merak ettiği konuyu seçip kendi kaynaklarından bilgi toplamasını ister; B4 bunu hazır bir soru ve hazır kaynak kartlarıyla canlandırabilir, gerçek araştırmanın yerini tutmaz. (c) Metin, poster, sunum, rapor ve zihin haritası ürünleri site dışında kalır. Bunlar için öğretmene dönük bir not ya da ek etkinlik gerekip gerekmediği kararınıza bağlı.
11. **Serbest dalış ve vurgun.** Program "Türk millî sporcularının serbest dalışta rekor kırdığı görüntü"den söz ediyor; sporcu adı, derinlik ya da tarih vermiyor. Vurgun için de yalnızca "söz edilebilir" diyor, açıklamasını vermiyor. B1'de ad ve sayı kullanılmadı; vurgunun ne kadar açıklanacağı (ya da yalnızca anılacağı) belirlenmeli.
12. **Türkiye'nin deniz araçları.** Program "Türkiye'nin millî çıkarları doğrultusunda geliştirdiği gemi, denizaltı gibi deniz araçları" diyor, hiçbirinin adını vermiyor; "ekonomik kalkınma, tasarruf ve yatırım stratejileri" cümlesi de içerik vermiyor. D4'te belirli bir araç adı kullanılacaksa kaynak gerekir.
13. **Yüzme ve batma.** Program yüzme, askıda kalma, batma koşullarını adıyla saymıyor; gemi, denizaltı ve yüzen plastik atık üzerinden kaldırma kuvvetini "uygulama" olarak istiyor, köprü kurmada da yoğunlukla ilişkilendiriyor. D4'te "yüzen cisimde kaldırma kuvveti ağırlığa eşittir" fikrini aldım (destekleme bölümü de bunu yazıyor ama destekleme zorunlu değil). Denizaltının batıp çıkmasını anlatmak yoğunluk karşılaştırmasını gerektirir; ne kadarının alınacağı açık.
14. **Kesit alanı–sürat ilişkisi.** Program bu ilişkiyi tahmin ve gözlemle istiyor; "matematiksel modelden kaçınılır" cümlesi Bernoulli İlkesi için yazılmış. Kesit–sürat ilişkisinin sayıyla (alan yarıya inince sürat iki katına çıkar) gösterilip gösterilmeyeceği açık; E1'de nitel tuttum.
15. **Hava ve "boru".** Çıktı "borunun kesit alanı" ve "boru çeperlerine yaptığı basınç" diyor; programın örneklerinin çoğu ise borusuz, açık hava akışı (masa tenisi topu, çatı, yelkenli, araçlar). E1'in boru modelinden E2'nin açık akış örneklerine geçiş senaryoda dikkat ister; yelkenlinin rüzgâra karşı gitmesi ve yarış arabası tek sahnede doğru anlatılması zor örneklerdir.
16. **C1'de hipotez.** FİZ.9.3.4 a) öğrencinin hipotez kurmasını ister. Sitede bu, seçenekli bir tahminle karşılanır; öğrencinin kendi cümlesini yazması mümkün değil. Aynı durum FİZ.9.3.6 a) (D2) ve ç) (D3, önerme) için geçerli.
17. **Saat dağılımı.** Program ders saatini temaya veriyor (18), çıktılara bölmüyor; konulara dağılım bizim kararımız.
18. **`plan/fizik/TEMALAR.md` yok.** Fizik dersi için tema listesi ve adlandırma dosyası henüz yazılmadı; bu plan onu varsaymadan yazıldı. Tema kimliği (`akiskanlar`) klasör adından alındı.

## 7. Kararlar

12 Ekim 2026. Dayanak `../../ISLEME.md` bölüm 3'teki kurallar (K1–K7). 1–18 bölüm 6'daki soruların cevabıdır; 19–24 işleme alınırken çıkan kararlardır. Beğenilmeyen karar sonradan değiştirilir.

| # | Soru | Karar | Kural |
|---|---|---|---|
| 1 | Ders sayısı | 15 kısa ders + her konuya bir konu tekrarı (5) = 20 dosya. 15 / 18 = 0,83; sınırın altında, birleştirme yok. A2, D1 ve E1 bölünmedi: her biri tek fikir zinciridir (ölç → kaydet → model; kur → ölç → analiz et; kesit → sürat → basınç). Bilgi sığmazsa sahne eklenir, ders bölünmez. `sure.js` 15 dakikayı aşan ders gösterirse yeniden okunur. | K5 |
| 2 | Modellerin yazımı | Kitabın yazımı: P = F/A (s. 139), P = h·d·g (s. 149), F_k = V_b·d_s·g (s. 180). Semboller P, F, A, G, h, d, g, F_k, V_b, d_s; birimler Pa (= N/m², s. 139), N, m², m, kg/m³, m/s². ρ, S, "özağırlık" yok. A2'de yatay zeminde duran cisim için "kuvvet, cismin ağırlığıdır: P = G/A" yeter; m·g açılımı yazılmaz. B2'de türetme (P = G/A → V = A·h → m = d·V → G = m·g, s. 149) adım adım gösterilir; D3'te F₁ = h₁·d_s·g·A, F₂ = h₂·d_s·g·A, F_k = F₂ − F₁ (s. 180). Tahtada çarpım "·" ile yazılır. | K4 |
| 3 | Durgun sıvı basıncının etmenleri | Kitabın saydığı üç etmen: derinlik (serbest yüzeyden dik uzaklık), sıvının yoğunluğu, yer çekimi ivmesi (s. 149, 152). Kabın şekli, taban alanı ve sıvının miktarı etkisizdir (s. 149 Görsel 3.6, s. 151, 152); B2'de benzetimle gösterilir. Yer çekimi ivmesi kitabın örneğiyle anılır (kutuplar ve Ekvator, s. 150); benzetimde değiştirilmez. | K4 |
| 4 | Kaldırma kuvvetinin değişkenleri | Batan hacim, sıvının yoğunluğu, yer çekimi ivmesi (s. 173, 175, 180, 183). Tamamı batmış cisimde derinlik etkisizdir (s. 180); D1'de sınanır. Cismin kütlesi ve şekli kitapta ayrı etmen olarak sınanmıyor: benzetimde değişken olarak sunulmaz; D2'de "modelde cismin ağırlığı yok" yorumu modelden yapılır. | K4 |
| 5 | Birimler ve sayılar | Basınç birimi pascal (Pa), karşılığı N/m² (s. 139). C2'de kitaptaki tek satırlık hesap: P₀ = h·d·g = 0,76 · 13.600 · 9,8 ≈ 101.300 Pa; "bu değere 1 atmosfer (1 atm) denir"; 1 atm = 76 cmHg = 1,013·10⁵ Pa (s. 164–165). Program bu hesabı ayrıca istediği için "yorumla sınırlı kalınır" sınırıyla çelişmez; temadaki tek sayısal işlemdir. bar, mmHg, torr yok. Benzetim sayıları: karar 19. | K1, K4 |
| 6 | Su cendereleri ve hidrolik sistemler | İşleyiş kitaptaki gibi Pascal Yasası'yla anlatılır (ad ve ifade s. 156, 160): kapalı kaptaki sıvıya uygulanan basınç her noktaya eşit iletilir. Su cenderesi nitel kalır: iki pistonda basınç aynı, alanı büyük pistonda kuvvet büyük (s. 157–158; F = P·A, s. 150). F₁/A₁ = F₂/A₂ bağıntısı ve sayısal örnek yazılmaz (programda da kitapta da yok). Örnek sistemler kitaptan (s. 146, 154–155, 158). Birleşik kaplar, U borusu, su kulesi, patlayan fıçı, arıtma tesisi alınmaz: program anmıyor. | K1, K2, K4 |
| 7 | Altın taç öyküsü | Kitabın anlattığı kadarıyla D1'in açılışıdır (s. 170): Sirakuza Kralı Hiero, külçe altın, kuyumcu, tacı bozmadan sınama görevi, hamamda taşan su, "Eureka", külçe ve taç için taşan suyun ağırlığının farklı çıkması. Gümüş, tarih, sayı, kuyumcunun sonu yazılmaz. | K4 |
| 8 | Torricelli'nin yöntemi | Kitaptaki düzenek (s. 164): deniz seviyesi, 0 °C, 1 m boyunda bir ucu kapalı cam boru, cıva dolu kap, boruda 76 cm cıva, üstte boşluk. Borunun şekli, kesiti ve eğimi seviyeyi değiştirmez (Görsel 3.17). Yıl yazılmaz (kitapta yok). | K4 |
| 9 | Açık hava basıncının günlük durumları | Kitaptakiler: yükseğe çıkan dağcıda kulak tıkanması ve zor nefes (s. 161), yükselen balonun patlaması (s. 163), Magdeburg yarım küreleri (s. 165), pipet (s. 166). Kitap dağcı, balon ve pipeti açıklamasız bırakıyor; açıklamaları C1–C2'de öğretilen ilkeden kurulur (yükseklikle azalan basınç; iki basıncın dengesi). Vantuz, ters bardak, uçak yok; taslaktaki C2 açılış sorusu (ters bardak) değişir. | K2, K4 |
| 10 | Benzetimin yetmediği yerler | Deney ve gözlem isteyen bentler `benzetim`, ürün ve sınıf etkinlikleri `site dışı` (bölüm 4). Öğretmene dönük not ya da ek etkinlik yazılmaz. | K4b |
| 11 | Serbest dalış ve vurgun | Sporcu adı, derinlik, tarih yazılmaz (kitapta da yok). Kitabın cümleleri kadar: tek nefeste dalış, kulakta dolgunluk, çıkışta nefes tutmanın akciğere zararı, vurgun (ani basınç değişikliğinde vücutta gaz kabarcıkları), basınç odası (s. 145). Teçhizat kitabın saydığı üç adla anılır: dalgıç elbisesi, dalış tüpü, ağırlık takımı (s. 184). | K4 |
| 12 | Türkiye'nin deniz araçları | Kitabın adlarıyla (s. 177–178): TCG Anadolu (L-400) çok amaçlı amfibi hücum gemisi, TCG İstanbul (F-515) fırkateyni, ADA sınıfı korvetler, Yeni Tip Denizaltı Projesi (Gölcük Tersanesi). Tonaj, boyut, yıl yazılmaz. | K4 |
| 13 | Yüzme ve batma | Program gemi, denizaltı ve yüzen atığı sayıyor, köprü kurmada yoğunlukla ilişkilendiriyor; içerik kitaptan (s. 175, 181, 183): yüzen ve askıda kalan cisimde F_k = G, batan cisimde F_k < G; cismin (ortalama) yoğunluğu sıvınınkinden küçükse yüzer, eşitse askıda kalır, büyükse batar. Üç durum D4'te adıyla geçer; bunlara dair problem çözülmez. | K1, K4 |
| 14 | Kesit alanı–sürat ilişkisi | Nitel: "kesit alanı daraldıkça sürat artar" (s. 190). Sıralama yazılır (A₁ > A₂ > A₃ ise v₃ > v₂ > v₁); oran, A·v çarpımı, debi yok. | K3 |
| 15 | Boru ve açık akış | E1 boruyla kurulur (hortum, Venturi tüpü s. 190) ve kâğıt örnekleriyle açık akışa geçer (s. 188, 192). E2'nin beş örneği kitabın açıklamalarıyla (s. 187, 189–190, 192, 195). Saç kurutma makinesi ve topu kitap açıklamıyor (gösteriye ve e-içeriğe bırakıyor): hızlı hava sütununun içinde basınç düşük, çevresinde yüksek diye açıklanır (kitap dışı). Yelken kitaptaki cümle kadar (s. 187). Uçak tek cümle: Bernoulli İlkesi'nin yanında ağırlık, kaldırma, sürükleme ve itme kuvvetleri etkilidir (s. 191); kitaptaki "üstten geçen hava daha uzun yol kat eder" gerekçesi alınmaz. Amaca göre sınıflama kitapta işaretli değil; bizim sınıflamamız: çatı ve şemsiye "kaldırma", arka kanat "havalanmayı engelleme", yelken ve yan yana araçlar "yön değiştirme", sprey "sıvıyı yükseltme". | K1, K3, K4, K7 |
| 16 | Hipotez ve önerme | Seçenekli tahmin ve sınıflandırmayla karşılanır (`KURALLAR.md` 2.2); `benzetim` sayılır. | K4b |
| 17 | Saat dağılımı | Karar gerektirmez; program saati çıktılara bölmüyor. | |
| 18 | `TEMALAR.md` | Dosya var (`plan/fizik/TEMALAR.md`, 7 Ekim 2026); soru kapandı. | |
| 19 | Benzetimlerin düzeneği ve sayıları | Kitap dört deneyin hiçbirinde ölçüm vermiyor (s. 135–137, 147, 171, 186) ve benzetimleri açılamayan karekodlara bırakıyor (s. 134, 146, 177, 186). Bu yüzden: (a) A konusunun düzeneği kitaptaki kum–tuğla deneyidir; A1'de batma derinliği sayısız, sıralamayla gösterilir. (b) Öteki benzetimlerin düzeneği yerleşik ders bilgisinden kurulur ve burada "kitap dışı" diye yazılıdır: basınçölçerli kum düzeneği (A2), sıvı içinde gezdirilen basınçölçer (B2), dinamometreye asılı cisim (D1), taşırma kabı ve terazi (D2), kesiti değişen boru (E1, kitapta Görsel 3.30). (c) Sayılar "örnek veri"dir, modelden hesaplanır, ölçülmüş gibi sunulmaz ama bir durumun içinde verilir. A2: tuğla ağırlığı 20 N, dar yüz 0,01 m², geniş yüz 0,02 m²; alan 0,02 m² iken 20, 40, 60 N → 1.000, 2.000, 3.000 Pa; kuvvet 40 N iken 0,01, 0,02, 0,04 m² → 4.000, 2.000, 1.000 Pa. Kitaptaki sabitler: g = 9,8 m/s² (s. 164, 175), suyun yoğunluğu 1.000 kg/m³ (s. 62), cıvanın yoğunluğu 13.600 kg/m³ (s. 164). Başka sıvının yoğunluğu sayıyla yazılmaz; "d, 2d" gibi oranla verilir. B, D konularının sayıları senaryoda bu sabitlerle hesaplanır ve senaryoya yazılır. | K4, `KURALLAR.md` 2.1, 2.3 |
| 20 | İzometrik figür pilotları | `p1-torricelli-pilot` ve `p2-kaldirma-kuvveti-pilot` dosyalarına dokunulmaz, `tema.js` içine alınmaz. C2 ve D2 temanın vektör kitiyle yazılır. Kullanıcı 12 Ekim 2026'da onayladı; pilot dosyaları siteden bağlantısız kalır. | |
| 21 | Hikâyeler | A1'in iki hikâyesi (`hikaye/a1-canta-askisi`, `hikaye/a1-karda-neden-batiyorum`) `ortak/katalog.js` içindeki satırda duruyor. `tema.js` dosyasına taşımak ortak dosyayı değiştirmeyi gerektirir; tema yayına alınırken yapılır. A1'in bağlamı hikâyelerle aynı (kar, çanta askısı); ders videoya gönderme yapmaz. | `KURALLAR.md` 7 |
| 22 | Destekleme etkinlikleri | Asılı iki kâğıdın arasına üfleme kitapta da var (s. 188); E1'de örnek olarak kullanılır. Yüzen bardağa madenî para ekleme alınmaz; aynı fikir kitabın yüklü–boş gemi örneğiyle (s. 173, 175) D4'te verilir. | K2, K7 |
| 23 | Adlar ve sözcükler | Program ve kitap "sürat" der; derslerde "hız" yazılmaz. "Pascal Yasası", "Arşimet İlkesi", "Bernoulli İlkesi", "Venturi tüpü", "safra tankı", "su cenderesi", "açık hava basıncı" (yeryüzündeki değişimi anlatılırken "atmosfer basıncı") kitabın yazımıyla kullanılır. | K4 |
| 24 | Renkler | Kuvvet turuncu, yüzey alanı turkuaz, basınç sarı, sıvı mavi, kaldırma kuvveti mor (`dersler/kit.js`). Yeşil yalnızca doğru cevabın rengidir; kırmızı kullanılmaz. | K7 |
| 25 | D4'ün bölünmesi (12 Ekim 2026) | D4 yazıldıktan sonra `sure.js` 16:50 ölçtü (12 sahne; anlatım 5:40, etkileşim 11:10). Ders iki fikir taşıyordu: (1) ilkenin deniz araçlarını ve yüzen atığı açıklaması, (2) deney verisinin ve önermelerin ilkeyle değerlendirilmesi (FİZ.9.3.6 d). İkincisi ayrı derse alındı: **D5 · Ölçümü de önermeyi de ilkeyle sına** (eski D4 sahne 10 ve 11; önüne çözülmüş örnekler, "Birlikte çöz" ve kendi çıkış soruları kondu; yeni bilgi yok, örnek veri sekiz ölçüme çıktı). D4 on sahneye indi; konu tekrarı D6 oldu. Kısa ders sayısı 16, saat başına 0,89: `ISLEME.md` kural 5'teki 0,85 sınırını aşıyor. Planın saydığı birleştirmeler (B3 + B4, D3'ün D2'ye katılması) uygulanmadı: ikisi de yazılmış derslerdir, birleşince iki fikir taşır ve 20 dakikayı bulur; aynı kural "iki fikir varsa ayrılır" der. Kullanıcıya raporlandı. | `KURALLAR.md` 3, `ISLEME.md` 5 |

## 8. Ders kitabından alınanlar

Kaynak: MEB, Fizik 9. Sınıf Ders Kitabı, 3. Ünite "Akışkanlar", s. 130–195; <https://tymm.meb.gov.tr/kitap/38/fizik-dersi-9sinif-ders-kitabi> (PDF 7 Ekim 2026'da alındı, 12 Ekim 2026'da okundu). Kitap yazarın kaynağıdır; derslerde kitaba ya da sayfaya gönderme yoktur (`KURALLAR.md` 2.1). 3.1 bölümünü (s. 130–144) ana oturum, 3.2–3.5 bölümlerini dört alt ajan okudu; dökümler oturumun geçici klasöründedir (`DURUM.md` "Sıradaki"). Senaryo yazan ajan kendi konusunun sayfalarını yeniden okur.

| Konu | Bilgi | Sayfa |
|---|---|---|
| A | Bağlam: sırt çantalarının tasarımı; meslekler basıncı güvenlik, dayanıklılık, konfor, kolaylık ve işe yararlık ölçütleriyle ele alır | 133 |
| A | Kar ayakkabısı: yüzey alanı büyük, kara uygulanan basınç azalır, ayak batmaz. Katı meyve sıkacağı: doğrudan kuvvet uygulanarak meyve üzerinde basınç oluşturulur | 134 |
| A | Deney: kap içinde üzeri düzeltilmiş kum, özdeş tuğlalar, cetvel. Şekil I: A yatık, B dik (yüzey alanı). Şekil II–III: A ve B dik; B'nin üstüne özdeş C (kuvvet). Şekil IV–V: A, dik duran B'nin üstünde bir kez dik, bir kez yatık (kuvvet ve kuma değen yüzey aynı). Kitap ölçüm vermez | 135–137 |
| A | Tablo kalıbı: "Neyi değiştirdiniz? · Ne oldu? · Yorumunuz nedir?"; örnek satır: yüzey alanı genişledikçe batma azaldı. Çıkarım cümleleri: etmenlerden biri artarken basınç artar, öteki azalırken basınç artar | 137 |
| A | Dokuz görsel (basıncı artırmak ya da azaltmak): raptiye, ceviz kıracağı, tren, tır, balta, paletli kar aracı, buz pateni, iş kamyonu, buz tırmanışı kramponu | 138 |
| A | Cisimler üzerine uygulanan kuvveti yönünü ve büyüklüğünü değiştirmeden iletir; çivide A₁ > A₂ olduğundan P₂ > P₁. Paletli iş makinesi ve geniş lastik: zemine basınç azalır | 139 |
| A | Tanım: "Birim yüzeye etki eden dik kuvvetin büyüklüğüne basınç denir." Skaler; sembol P; birim pascal (Pa), karşılığı N/m². P = F/A. Yatay düzlemde F = G, P = G/A | 139 |
| A | Örnek: dört özdeş küp üst üste (4G, A, 4G/A) ve yan yana (4G, 4A, G/A); temas yüzeyi artınca basınç azalır | 140 |
| A | Alıştırmalar: kepçe dişi, sandalet tabanı, çadır kazığı; topuk ucu koruma aparatı (batmama, yıpranmama, rahat yürüme); traktörün geniş arka tekerleği, bıçak, fil ve gergedanın ayak tabanı, çivi ve raptiye | 140–142 |
| A | Özet: basıncı azaltmak için kuvvet daha büyük yüzeye, artırmak için daha küçük yüzeye uygulanır | 143 |
| A | Çalışma yaprağı: rende, ekmek bıçağı, kar lastiği; altı özdeş küp: Şekil I 6G, 3A, 2P; Şekil II iki küp tabanda, Şekil III dört küp tabanda | 144 |
| B | Serbest dalış: "tek nefeste ip yardımıyla suyun altına dalma sporu"; kulakta dolgunluk; çıkarken nefes tutulursa akciğer zarar görebilir; vurgun: ani basınç değişikliklerinde vücutta gaz kabarcıkları oluşması; tedavi basınç odasında yüksek basınçlı oksijen. Turistik denizaltının pencereleri | 145 |
| B | "Sıvılar, ağırlıkları nedeniyle bulundukları yüzeye basınç uygular"; cisimler yalnızca üzerinde durdukları yüzeye, sıvılar kabın temas ettiği bütün yüzeylere. Türetme: P = G/A, V = A·h, m = d·V, G = m·g → P = h·d·g. Etmenler: d, g, h (serbest yüzeyden dik uzaklık) | 149 |
| B | Kabın şekline ve kesit alanına bağlı değil: tabanları A, 2A, 3A olan farklı biçimli üç kap, aynı h ve d, tabandaki basınç eşit (Görsel 3.6). F = P·A; tabana F = h·d·g·A | 149–150 |
| B | Örnek: tabandaki basıncı artırmak için sıvı eklemek, tuz atmak, kutuplara götürmek; azaltmak için sıvı azaltmak, Ekvator'a götürmek | 150 |
| B | 5. Alıştırma: taban alanı ve yüksekliği aynı, biçimi farklı üç kapta basınç eşit; 1.000 mL sıvı yağ, 500 mL gliserin, 750 mL su özdeş silindirlerde tabana eşit basınç yapar (yoğunluk sıralaması sorulur) | 151 |
| B | Baraj: "Barajların alt duvarları üst duvarlarına göre daha kalındır" (neden öğrenciye sorulur). Özet: sıvı basıncı kabın şekline ve sıvının miktarına bağlı değildir; sıvı yan yüzeylere de basınç uygular | 152 |
| B | Çalışma yaprağı: delikli pet şişe (aynı seviyedeki deliklerden su aynı uzaklığa, düşey dizili deliklerden farklı uzaklığa fışkırır) | 153 |
| B | Hidrolik kriko, forklift; sistem görselleri: hidrolik fren (pedal, ana silindir, fren hidroliği, piston, disk, balata), kepçe, damperli kamyon, hidrolik pres, itfaiye merdiveni, hastane yatağı, berber koltuğu | 146, 154–155 |
| B | Sorgulama etkinliği: soru hazırlama, yöntem ve kaynak belirleme, sistematik bilgi toplama, "doğruluk, güvenilirlik, amaca uygunluk ve açıklık" ilkeleriyle kontrol (ilkelerin tanımı yok). Kontrol listesi: kaynak ihtiyaç duyulan bilgiyi içeriyor mu, bilgiler güvenilir mi, konuyla ilişkili mi, anlaşılır mı, güncel mi; birden çok "hayır" varsa kaynak gözden geçirilir | 155 |
| B | Pascal Yasası: "kapalı bir kaptaki sıvıya dışarıdan bir basınç uygulandığında bu basınç, sıvının her noktasına ve kabın iç yüzeyine eşit büyüklükte ve her yönde iletilir"; sıvılar sıkıştırılamaz kabul edilir. Su cenderesi: boruyla bağlı iki piston; küçük pistona F, büyük pistonda aynı basınç; A₂ > A₁ olduğundan büyük pistondaki kuvvet daha büyük. Sistem listesi: hidrolik fren, pres, direksiyon, lift, vinç, itfaiye merdiveni, kepçe, damperli kamyon | 156–158, 160 |
| C | Yükseklikle hava yoğunluğu azalır; dağcılarda kulak tıkanması, zor nefes, burun kanaması; alışma programı | 161 |
| C | Rüzgâr: alçak ve yüksek basınç alanları arasındaki hava hareketi; alçak basınç sıcak havanın genleşip yükselmesiyle, yüksek basınç soğuk havanın yoğunlaşıp alçalmasıyla oluşur; hava yüksek basınçtan alçak basınca hareket eder; Dünya'nın dönüşü yönü saptırır. Şema: alçak basınç alanında yükselen hava ve bulut, yüksek basınç alanında alçalan hava. Rüzgâr türbini: pervane döner, jeneratör elektrik üretir | 162 |
| C | Önerme örneği: "Gökyüzüne doğru yükselen balon patlar." İzmir'den Palandöken'e giden kişi | 163 |
| C | Tanım: atmosferi oluşturan gazlar ağırlıkları nedeniyle temas ettikleri yüzeylere basınç uygular; buna açık hava basıncı denir (P₀). Sıvıda basınç derinlikle artar; gazlar sıkıştırılabildiği için yoğunlukları yükseklikle değişir, yukarı çıkıldıkça basınç azalır; sıvılar sıkıştırılamaz kabul edilir | 164 |
| C | Torricelli: deniz seviyesi, 0 °C, 1 m boyunda bir ucu kapalı cam boru cıvayla doldurulur, hava almadan ters çevrilip cıva kabına daldırılır; seviye düşer ve 76 cm'de dengelenir; üstte boşluk; P₀ = P cıva; borunun şekli, kesiti, konumu ve duruşu seviyeyi değiştirmez. d = 13.600 kg/m³, g = 9,8 m/s²: P₀ = h·d·g = 0,76 · 13.600 · 9,8 ≈ 101.300 Pa = 1 atm | 164 |
| C | 1 atm = 76 cmHg = 1,013·10⁵ Pa. Açık hava basıncı sıcaklığa, hava yoğunluğuna ve atmosferin bileşimine bağlı değişir; ısınan hava genleşir, yoğunluğu azalır, yükselir (alçak basınç); soğuyan hava yoğunlaşır, alçalır (yüksek basınç). Magdeburg yarım küreleri (Otto von Guericke): havası boşaltılan iki yarım küreyi atlar ayıramaz; dışarıdaki basınç bir arada tutar | 165 |
| C | Örnek: havanın yoğunluğu homojen değildir; açık hava basıncı yükseldikçe azalır, sıvı basıncı derinlikle artar; deniz seviyesindeki basınç her yerde aynı değildir. Pipet (soru) | 166 |
| D | Denizaltı: safra tanklarına su alınınca yoğunluk artar, dalar; su boşaltılıp hava basılınca yoğunluk azalır, yükselir | 169 |
| D | Altın taç öyküsü (karar 7) | 170 |
| D | Tanım: akışkan içindeki cisimleri yukarı doğru iten kuvvete kaldırma kuvveti denir; ilk ispatlayan Arşimet kabul edilir | 172 |
| D | Batan hacim büyüdükçe yeri değişen akışkan artar, kaldırma kuvveti artar; yüzen cisimde akışkanın yoğunluğu arttıkça batan hacim azalır, kaldırma kuvveti ağırlığa eşit kalır. Örnek: tam yüklü gemi boş gemiden daha çok batar, kaldırma kuvveti daha büyüktür | 173 |
| D | Top: suda yüzer; tuzlu suda batan hacmi azalır. Yer çekimi ivmesi arttıkça kaldırma kuvveti artar (g ≈ 9,8 m/s²). Çelik gemi çoğunlukla havayla doludur; ortalama yoğunluğu suyunkinden küçüktür | 174–175 |
| D | Okuma: TCG İstanbul (F-515) İ sınıfı fırkateyn, TCG Anadolu (L-400) çok amaçlı amfibi hücum gemisi, ADA sınıfı korvetler, Yeni Tip Denizaltı Projesi (2011, Gölcük Tersanesi). Çöp adaları: yılda yaklaşık bir trilyon plastik poşet; adalar Türkiye'nin yüz ölçümünden büyük; üç öneri (bilgilendirme, yeniden kullanılabilir ürün, kampanya) | 177–178 |
| D | Türetme: tamamı sıvıda silindir, taban alanı A, yükseklik h; üst yüzey h₁, alt yüzey h₂ derinlikte; F₁ = h₁·d_s·g·A (aşağı), F₂ = h₂·d_s·g·A (yukarı), yan kuvvetler dengelenir; F_k = F₂ − F₁ = h·d_s·g·A; V_b = h·A → F_k = V_b·d_s·g (N). Tamamı batmış cisimde kaldırma kuvveti derinliğe bağlı değildir. Arşimet İlkesi: "Bir kısmı veya tamamı durgun akışkana batan cisme akışkan tarafından uygulanan kaldırma kuvveti, cisim tarafından yeri değiştirilen sıvının ağırlığına eşit büyüklüktedir." | 180 |
| D | Yüzme (d_c < d_s, F_k = G), askıda kalma (d_c = d_s, F_k = G), batma (d_c > d_s, F_k < G). Çelik bilye batar, gemi yüzer: içi boş yapı ortalama yoğunluğu düşürür; su alan gemi batar | 181, 183 |
| D | Turistik denizaltı genellikle 30 m, araştırma denizaltısı 3.000 m derinliğe iner. Dalgıç elbisesi, dalış tüpü, ağırlık takımı | 182, 184 |
| E | Bahçe hortumunun ucu sıkılınca su uzağa gider (açıklama öğrenciye bırakılmış); kesit A, A/2, A/4 için sürat tablosu (boş); saç kurutma makinesi ve masa tenisi topu gösterisi (açıklama yok) | 185–186 |
| E | Beş örnek için boşluk doldurma cümleleri ve üç sütunlu sınıflama tablosu (havaya kaldırma, havalanmasını engelleme, yön değiştirme; işaretsiz) | 187 |
| E | Asılı iki kâğıdın arasına üflenince kâğıtlar yaklaşır. Akışkanın süratinin arttığı bölgelerde basınç azalır | 188 |
| E | Bernoulli İlkesi: "Bir boruda veya kanalda akmakta olan akışkanın basıncı, durgun hâldeki basıncından küçüktür"; sürat artınca basınç azalır (Daniel Bernoulli). Çatı: üstte hızlı hava, düşük basınç; içerideki durgun havanın basıncı büyük; fark çatıyı yukarı iter. Şemsiye: bombeli üst yüzeyde hava hızlanır, basınç düşer, şemsiye ters döner | 189 |
| E | Venturi tüpü: kesiti iki kez daralan yatay boru, her kesitte üstü açık düşey boru; A₁ > A₂ > A₃, v₃ > v₂ > v₁, P₁ > P₂ > P₃, h₁ > h₂ > h₃. Yan yana araçlar: aradaki hava hızlanır, basınç düşer (P₀ > P₁), araçlar birbirine çekilir | 190 |
| E | Uçak: Bernoulli İlkesi'nin yanında ağırlık, kaldırma kuvveti, sürükleme ve itme kuvvetleri etkilidir | 191 |
| E | Kâğıda üfleme: üst yüzeyde basınç azalır, alttaki yüksek basınç kâğıdı kaldırır. Sprey: dar delikten geçen akışkanın sürati artar, basıncı düşer | 187, 192 |
| E | Arka kanat: ters çevrilmiş uçak kanadı; altta hava hızlı, basınç düşük; üstteki basınç aracı yere bastırır, araç havalanmaz | 187, 195 |

Kitap dışı (yerleşik ders bilgisi; `KURALLAR.md` 2.1 istisnası, kitap içeriği açılamayan e-içeriğe bıraktığı için): benzetim düzenekleri ve örnek veriler (karar 19); saç kurutma makinesi ve topun açıklaması (karar 15); dağcı, balon ve pipetin açıklamaları (karar 9, öğretilen ilkeden); B4'te "doğruluk" ilkesinin karşılığı olarak "bilgi ikinci bir kaynakla tutuyor mu" sorusu; D4'te plastiğin yüzeyde toplanması fikri (programın istediği çözüm üretme; öğrenci seçeneklerden seçer).
