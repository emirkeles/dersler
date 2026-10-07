# Plan — 9. Sınıf Fizik · 3. Tema: Akışkanlar

Dayanak: `MUFREDAT.md` (MEB sayfasından 7 Ekim 2026'da alındı; MEB bu bölüme "3. Ünite: Akışkanlar" der). Ortak kurallar: `../../KURALLAR.md` (bir kısa ders = bir fikir, 3–5 sahne, 4–6 dakika, sonunda 2 çıkış sorusu). Yazım adımları: `../../ISLEME.md`.

Tema henüz işleme alınmadı; bölüm 6'daki sorular açıktır.

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
| FİZ.9.3.6 Kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişki | D · Kaldırma kuvveti | D2–D4 |
| FİZ.9.3.7 Kesit alanı, sürat ve basınç arasındaki ilişki (Bernoulli İlkesi) | E · Bernoulli İlkesi | E1–E2 |

Toplam 5 konu, 15 kısa ders. 18 ders saati için saat başına 0,83; `ISLEME.md` kural 5'teki 0,85 sınırının altında (kıyas: matematik 1. tema 0,74, 3. tema 0,75). Sınıra yakın olduğu için birleştirme adayları bölüm 6, soru 1'de.

## 2. Konular

Kural "her öğrenme çıktısı bir konu"dur. Yedi çıktıyı beş konuya **şu gerekçeyle** topladım: programın içerik çerçevesi tam beş başlık sayıyor (Basınç, Sıvılarda Basınç, Açık Hava Basıncı, Kaldırma Kuvveti, Bernoulli İlkesi) ve çıktılar bu başlıklara bire bir oturuyor; FİZ.9.3.2 ile FİZ.9.3.3 aynı başlığın (sıvılarda basınç) modeli ve kullanımı, FİZ.9.3.5 ile FİZ.9.3.6 aynı deneyin (kaldırma kuvveti) yapılması ve yorumlanmasıdır. Program FİZ.9.3.6'yı açıkça FİZ.9.3.5'in verisine bağlar ("kaldırma kuvveti ile ilgili yaptıkları deneyden elde ettikleri verileri yorumlayarak").

**A · Basınç** (FİZ.9.3.1). Basınca etki eden etmenler (basınca neden olan kuvvet, yüzey alanı), veriden matematiksel modele, modelden çıkarıma. Günlük hayat örnekleri ve bunların konfor, kolaylık, işe yararlık açısından değerlendirilmesi.

**B · Sıvılarda basınç** (FİZ.9.3.2, FİZ.9.3.3). Durgun sıvıda basınca etki eden etmenler, deney, model ve çıkarım; ardından sıvı basıncıyla çalışan sistemler (su cendereleri, hidrolik sistemler) ve bunlar üzerine sorgulama: merak et, sor, bilgi topla, doğruluğunu değerlendir, çıkarımda bulun.

**C · Açık hava basıncı** (FİZ.9.3.4). Sıvı basıncından yola çıkarak hipotez, sıvı basıncıyla benzerlik ve farklar, Torricelli'nin ölçmesi ve atm birimi, atmosfer basıncının yeryüzünde değişmesi, rüzgâr, günlük durumlar.

**D · Kaldırma kuvveti** (FİZ.9.3.5, FİZ.9.3.6). Deneyle değişkenleri belirleme; kaldırma kuvveti ile yer değiştiren sıvının ağırlığı arasındaki ilişki ve matematiksel model (Arşimet İlkesi); bu modelin sıvı basıncı modeliyle karşılaştırılması; deniz araçları ve plastik atıklar üzerinden değerlendirme.

**E · Bernoulli İlkesi** (FİZ.9.3.7). Borunun kesit alanı, akışkanın sürati ve boru çeperlerine yaptığı basınç arasındaki ilişkinin gözlenmesi; ilişkinin günlük hayat örnekleriyle genellenmesi. Tamamen kavramsal.

Ders sırası: A1 → A2 → B1 → B2 → B3 → B4 → C1 → C2 → C3 → D1 → D2 → D3 → D4 → E1 → E2. B2, A2'deki "veriden modele" yolunu yineler; C1 ve C2, B2'nin modeline dayanır; D3, B2 ile D2'nin modellerini karşılaştırır; D4, D1'in verisine döner. E konusu ötekilerden bağımsızdır ama "basınç" kavramını A'dan alır.

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

- **Tek fikir:** Arşimet İlkesi, deniz araçlarının ve yüzen plastik atıkların davranışını açıklar; deney verisi bu ilkeyle değerlendirilir.
- **Anlatılacaklar:**
  1. Gemi ve denizaltı gibi deniz araçlarında kaldırma kuvvetinin uygulamaları; Türkiye'nin geliştirdiği deniz araçları (programın yazdığı kadarıyla; bölüm 6, soru 12).
  2. Denizlerdeki plastik atıkların oluşturduğu çöp adaları: bu atıklar suyun yüzeyinde kaldırma kuvvetinden dolayı yüzer.
  3. Atık sorununa kaldırma kuvvetinden yararlanan bir çözüm düşüncesi.
  4. D1'in deney verisinin Arşimet İlkesi kapsamında değerlendirilmesi; kaldırma kuvveti ile basınca neden olan kuvvet ilişkisine dair değerlendirme.
- **Program dayanağı:** FİZ.9.3.6 d) "Kaldırma kuvveti ve sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair değerlendirme yapar." Uygulamalar: "Öğrencilere Arşimet İlkesi’ni pekiştirmeleri için Türkiye’nin millî çıkarları doğrultusunda geliştirdiği (D19.3) gemi, denizaltı gibi deniz araçları üzerinden kaldırma kuvvetinin uygulamaları hakkında bilgilendirici bir metin verilir… Denizlerdeki plastik atıklardan kaynaklanan kirliliğin oluşturduğu çöp adaları hakkında görsel ögeler kullanılarak öğrencilere bilgi verilir. Bu plastik atıkların suyun yüzeyinde kaldırma kuvvetinden dolayı yüzdüğü vurgulanır. Öğrencilerden… bu atık sorununa kaldırma kuvvetinden yararlanarak çözüm üretmeleri… istenir. ÖÖğrenciler, verilen örneklerden yararlanarak kaldırma kuvveti ile ilgili yaptıkları deneyden elde ettikleri verileri Arşimet İlkesi kapsamında değerlendirir." Köprü kurma: "Yoğunluk ve kaldırma kuvveti kavramları günlük hayattan örneklerle (gemiler, denizaltılar, denizlerdeki plastik adaları vb.) ilişkilendirilebilir."
- **Açılış sorusu:** Çelik bir çivi batarken binlerce ton çelikten yapılmış gemi nasıl yüzer?
- **Akılda kalıcı cümle:** Yüzen cisim, kendi ağırlığı kadar sıvıyı yerinden eder.

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

## 4. Müfredat denetimi

Programın her isteği bir satır. Bu dosyadaki her kısa ders tabloda en az bir kez geçer. Sahne numaraları dersler yazılınca işlenir.

| Programın istediği | Hangi kısa ders |
|---|---|
| Tema amacı: basınç ve akışkanların basıncına yönelik çıkarım; sıvı basıncının günlük örneklerini sorgulama; açık hava basıncına ilişkin çıkarım; kaldırma kuvveti deneyi ve nedenlerine yönelik çıkarım; Bernoulli İlkesi'ne yönelik genelleme | A2, B2, B4, C1–C3, D1–D3, E2 (tema geneli) |
| FİZ.9.3.1 a) basınca etki eden etmenleri tanımlama | A1 |
| FİZ.9.3.1 b) basınçla ilgili verileri kaydetme | A2 |
| FİZ.9.3.1 c) verilerden ulaşılan matematiksel modelle basınca ilişkin çıkarım | A2 |
| Basıncın etkili olduğu günlük hayat örnekleri; konfor, kolaylık, işe yararlık açısından değerlendirme; iyileştirme fikri | A1 |
| Basınçla ilgili sistemlerin işleyişinde basıncın rolü | A1 |
| Basınç, basınca neden olan kuvvet ve yüzey alanı verilerinin benzetimle toplanması | A2 |
| Sınır: basınç modelinde değişkenlerin ilişkisini yorumlamakla sınırlı kalma | A2 |
| Köprü kurma: topuklu ayakkabı ve düz ayakkabı | A1 |
| FİZ.9.3.2 a) durgun sıvılarda basınca etki eden etmenleri tanımlama | B1 |
| FİZ.9.3.2 b) durgun sıvı basıncı verilerini kaydetme | B2 |
| FİZ.9.3.2 c) matematiksel modelle durgun sıvılarda basınca ilişkin çıkarım | B2 |
| Serbest dalış; derine dalmanın zor olmasının nedenleri; uygun teknik ve teçhizat; vurgun; su altı sporlarında sağlık riskleri | B1 |
| Durgun sıvılarda basıncı etkileyen değişkenleri belirlemeye yönelik deney tasarlama ve yapma | B2 |
| Sınır: durgun sıvı basıncı modelinde yorumlamayla sınırlı kalma; kabın yan yüzeylerine etki eden kuvvet hesabından kaçınma | B2 |
| Köprü kurma: baraj duvarları | B2 |
| FİZ.9.3.3 a) merak edilen konuyu belirleme | B4 (örnekler B3'te sunulur) |
| FİZ.9.3.3 b) merak edilen konuyla ilgili soru sorma | B4 |
| FİZ.9.3.3 c) bilgi toplama (araç seçimi, sistematik toplama) | B4 |
| FİZ.9.3.3 ç) toplanan bilgilerin doğruluğunu değerlendirme (doğruluk, güvenilirlik, amaca uygunluk, açıklık) | B4 |
| FİZ.9.3.3 d) toplanan bilgiler üzerinden çıkarım | B4 |
| Sıvı basıncıyla çalışan sistemlerin görselleri ve işleyişleri; su cendereleri, hidrolik sistemler | B3 |
| Sıvı basıncının kullanıldığı sistemlerde sıvı basıncının rolü | B3 |
| Çıkarımı fotoğraf, resim, tablo, şekil ya da grafikle destekleme | B4 |
| FİZ.9.3.4 a) sıvı basıncı bilgisinden yararlanarak açık hava basıncına yönelik hipotez | C1 |
| FİZ.9.3.4 b) sıvı basıncıyla açık hava basıncı arasındaki ilişkileri listeleme | C1 |
| FİZ.9.3.4 c) sıvı basıncıyla açık hava basıncını karşılaştırma | C2 (benzerlik ve farklar C1) |
| FİZ.9.3.4 ç) açık hava basıncına ilişkin önermeler | C3 |
| FİZ.9.3.4 d) açık hava basıncı bilgisini farklı durumlarda değerlendirme | C3 |
| Sıvıda basınca neden olan kuvvetin sıvının ağırlığından kaynaklandığının hatırlatılması; havanın da akışkan olması | C1 |
| Sıvı homojen, havanın yoğunluğu homojen değil; derinlik ile yükseklik; yükseklerde basıncın daha az olması | C1 |
| Torricelli'nin ölçmesi ve ölçme yöntemi; cıva sütununun ağırlığı ile açık hava basıncının dengelenmesi | C2 |
| Atmosfer (atm) birimi ve temel birimler cinsinden hesaplanması | C2 |
| Açık hava basıncının sıcaklıkla genleşme ve yerel yoğunluk değişimine bağlı olarak değişmesi; "atmosfer basıncı" adı | C3 |
| Alçak ve yüksek basınç bölgeleri, rüzgârın oluşumu; rüzgâr ve yenilenebilen enerji | C3 |
| Günlük hayatta açık hava basıncıyla karşılaşılan durumlara örnekler | C3 (açılış sorularında C1, C2) |
| FİZ.9.3.5 a) kaldırma kuvvetini etkileyen değişkenleri belirlemeye yönelik deney tasarlama | D1 |
| FİZ.9.3.5 b) deney düzeneğinden veri toplayarak değişkenleri analiz etme | D1 |
| Arşimet ve Kral Hiero'nun Altın Tacı öyküsü | D1 |
| FİZ.9.3.6 a) kaldırma kuvveti ile yer değiştiren sıvının ağırlığı arasındaki ilişkiye dair hipotez | D2 |
| FİZ.9.3.6 b) deney verileriyle matematiksel modeli bulma | D2 |
| Sınır: kaldırma kuvveti modelinde nicelikler arasındaki orantısal ilişkilerle sınırlı kalma | D2 |
| FİZ.9.3.6 c) kaldırma kuvveti ve sıvı basıncı modellerini karşılaştırma | D3 |
| FİZ.9.3.6 ç) kaldırma kuvveti ile sıvılardaki basınca neden olan kuvvet arasındaki ilişkiye dair önerme | D3 |
| Sınır: karşılaştırmada sıvılardaki kaldırma kuvvetiyle sınırlı kalma | D3 |
| FİZ.9.3.6 d) kaldırma kuvveti ile basınca neden olan kuvvet ilişkisine dair değerlendirme | D4 |
| Arşimet İlkesi; gemi, denizaltı gibi deniz araçlarında kaldırma kuvvetinin uygulamaları | D2 (ilke), D4 (uygulamalar) |
| Plastik atıkların oluşturduğu çöp adaları; atıkların kaldırma kuvvetinden dolayı yüzmesi; çözüm üretme | D4 |
| Deney verilerini Arşimet İlkesi kapsamında değerlendirme | D4 |
| Köprü kurma: yoğunluk ve kaldırma kuvveti (gemiler, denizaltılar, denizlerdeki plastik adaları) | D4 |
| FİZ.9.3.7 a) sürat ile basınç arasındaki ilişkiyi gözlemleyerek tespit etme | E1 |
| FİZ.9.3.7 b) sürat–basınç ilişkisini günlük hayat örnekleri üzerinden genelleme | E2 |
| Tahmin et-gözle-açıkla; kesit alanı azalınca akış süratindeki değişimi tahmin etme; tahmin ile gözlemi karşılaştırma | E1 |
| Bahçe hortumu örneği; saç kurutma makinesi ve masa tenisi topu gösterisi | E1 |
| Kesit alanı, sürat ve boru çeperlerine yapılan basınç arasındaki ilişki; Bernoulli İlkesi'ne ulaşma | E1 |
| Beş örnek: çatıların uçması, sprey püskürtücü, hızlı araçların yakınındaki nesneleri çekmesi, yelkenlinin rüzgâra karşı gitmesi, yarış arabası | E2 |
| Örneklerin amaca göre ortak olan ve olmayan özellikleri (havaya kaldırma, havalanmasını engelleme, yön değiştirme) | E2 |
| Uçakların havalanması ve uçmasında yalnızca Bernoulli İlkesi'nin etkili olmadığı | E2 |
| Sınır: Bernoulli İlkesi kavramsal verilir, matematiksel modelden kaçınılır | E1, E2 |
| İçerik çerçevesi: Basınç | A1, A2 |
| İçerik çerçevesi: Sıvılarda Basınç | B1–B4 |
| İçerik çerçevesi: Açık Hava Basıncı | C1–C3 |
| İçerik çerçevesi: Kaldırma Kuvveti | D1–D4 |
| İçerik çerçevesi: Bernoulli İlkesi | E1, E2 |
| Anahtar kavram: basınç | A1 |
| Anahtar kavram: kaldırma kuvveti | D1 |
| Temel kabuller (yoğunluk kavramı; katı ve sıvıların özellikleri) | Ayrı ders yok; ön bilgi |
| Grup çalışması, tartışma, beyin fırtınası; metin, afiş, poster, sunum, araştırma raporu, zihin haritası; çalışma yaprağı, test, performans görevi | Derslerde yok (bölüm 5) |

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
