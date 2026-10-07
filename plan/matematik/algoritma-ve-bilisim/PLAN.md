# Plan — 9. Sınıf · 5. Tema: Algoritma ve Bilişim

Dayanak: `MUFREDAT.md` (MEB sayfası <https://tymm.meb.gov.tr/matematik-dersi/unite/24>, 7 Ekim 2026'da alındı). Biçim ve kısa ders kuralı: `plan/matematik/sayilar/PLAN.md` (bir kısa ders = tek fikir, 3–5 sahne, 4–6 dakika, sonunda 2 çıkış sorusu). Bu dosya yalnızca konuları ve kısa dersleri planlar; sahne senaryosu, ekran metni ve kod sonra, onayla yazılır.

## 1. Kapsam özeti

Sayfadaki sıra ve ad: **5. Tema: Algoritma ve Bilişim.** Ders saati: **30.** Disiplinler arası ilişki: Bilgisayar Bilimleri.

| Öğrenme çıktısı | Konu | Kısa ders |
|---|---|---|
| MAT.9.5.1 Algoritma temelli yaklaşımlarla problem çözebilme (a, b, c, ç) | A · Algoritma dili ve temsiller | A1–A6 |
| MAT.9.5.1 (a, b, c; "Örneğin" sayılan sayı ve arama görevleri) | B · Sayı ve arama problemlerinde algoritma | B1–B7 |
| MAT.9.5.1 (b, c, ç; şifreleme) | C · Şifreleme | C1–C3 |
| MAT.9.5.1 (b, c, ç; çizge) | D · Çizgeler | D1–D3 |
| MAT.9.5.1 (d, e, f, g, ğ, h) | E · Çözüm stratejisi: kur, uygula, kontrol et, değerlendir | E1–E6 |
| MAT.9.5.2 Algoritmik yapılar içerisindeki mantık bağlaçlarını ve niceleyicileri çözümleyebilme (a, b) | F · Algoritmalarda mantık bağlaçları ve niceleyiciler | F1–F3 |
| MAT.9.5.3 Mantık bağlaçları ve niceleyicilerin... deneyimi farklı matematiksel görev ve problemlere yansıtabilme (a, b, c) | G · Matematikte yansıtma: ispat ve sembolik dil | G1–G3 |

Toplam: 7 konu, 31 kısa ders. Kıyas: 1. ünite 38 ders saati için 28 kısa ders (saat başına 0,74); burada 30 saat için 31 (1,03). Fark içerikten geliyor: program yalnızca sayı ve arama alanında altı görev ve iki problem, ayrıca şifreleme, çizge ve strateji için ayrı ayrı "yer verilir" diyor. Bu sayı kesin değil; birleştirilebilecek yerler "Açık sorular"da.

## 2. Konular

| Konu | Karşıladığı program parçası | Kısa ders sayısı |
|---|---|---|
| A · Algoritma dili ve temsiller | Harizmi ve kökeni; kodların algoritmadan oluşması; temsil seçimi (liste, tablo, çizge, akış şeması, doğal dil, sözde kod); cebirsel ve sözel ifadeyi algoritmaya çevirme; algoritmayı açıklama; algoritma testi | 6 |
| B · Sayı ve arama problemlerinde algoritma | Periyodik durumlar, bölme algoritması, asal çarpanlara ayırma, aralarında asal, Eratosthenes kalburu, bölünebilme kuralları; madenî para ve evet/hayır arama problemleri | 7 |
| C · Şifreleme | Şifreleme ve çözme algoritmaları; sayısal değer ve ikili sistem | 3 |
| D · Çizgeler | Ayrıt ve düğüm; Königsberg; çizgenin başka problemlerde kullanımı; çizge ile algoritma ilişkisi | 3 |
| E · Çözüm stratejisi | Strateji oluşturma ve kullanma; kontrol; olası stratejileri gözden geçirme; çıkarım ve değerlendirme | 6 |
| F · Algoritmalarda mantık bağlaçları ve niceleyiciler | MAT.9.5.2'nin tamamı | 3 |
| G · Matematikte yansıtma: ispat ve sembolik dil | MAT.9.5.3'ün tamamı | 3 |

**Ayırma gerekçesi (kuralın tek istisnası).** Kural "her çıktı bir konu" olduğundan MAT.9.5.2 (F) ve MAT.9.5.3 (G) birer konudur. MAT.9.5.1 ise beş konuya ayrıldı, çünkü: (1) on süreç bileşeni içeriyor (a–h, ğ dahil); (2) program metninde dört ayrı içerik alanı var (algoritma dili ile sayı ve arama görevleri, şifreleme, çizge, strateji) ve içerik çerçevesi şifreleme ile çizgeyi ayrı cümlelerle anıyor; (3) tek konuda 25'in üstünde kısa ders toplanırdı. Bölünme süreç bileşenlerine göre değil, programın "Öğrenme-öğretme uygulamaları" paragraflarına göre yapıldı: A ve B ilk iki paragrafın ve dördüncünün dil ile görev kısmı, C ve D üçüncü paragraf, E dördüncü ve beşinci paragrafın strateji kısmı.

## 3. Kısa dersler

Dayanak alıntıları MAT.9.5.1'de program metninin (MUFREDAT.md) tam cümlelerinden kısaltılmıştır. Parantez içindeki ön bilgi notları "Temel kabuller" bölümüne dayanır; o bilgiler yeniden öğretilmez.

### Konu A · Algoritma dili ve temsiller

#### A1 · Algoritma bir tariftir; adı Harizmi'den gelir
- **Tek fikir:** Algoritma, bir işi adım adım yapma yoludur ve adı Harizmi'nin adının okunuşundan gelir.
- **Anlatılacaklar:**
  - Kelimenin kökeni: Batı dillerine Harizmi'nin isminin okunuşundan geçmiştir.
  - Algoritmik yaklaşımla ele alınabilecek bir işi işlem ve süreçlerine ayırmak.
  - Programlama dilleriyle yazılan kodların tümü algoritmalardan oluşur; basit bir kod öbeği yazılmadan, yalnızca okunarak incelenir.
  - Ortaokulda öğrenilen algoritmik ifade yalnızca tek cümleyle hatırlatılır (temel kabul).
- **Program dayanağı:** MAT.9.5.1 a) "Algoritmik yaklaşımla ele alınabilecek bir problemdeki işlem ve süreçlere yönelik bileşenleri belirler." · "Algoritma kelimesinin kökeni tartışılır ve kelimenin Batı dillerine Harizmi’nin isminin okunuşundan geçtiğine yer verilir." · "...kodların tümünün algoritmalardan oluştuğuna ilişkin basit örnekler incelenir."
- **Açılış sorusu:** Her sabah yaptığın işleri bir arkadaşına telefonda anlatsan, hangi adımı atlarsan iş bozulur?
- **Akılda kalıcı cümle:** "Algoritma, doğru sırayla yazılmış adımlardır."

#### A2 · Aynı algoritma, üç yazılış
- **Tek fikir:** Aynı algoritma doğal dille, akış şemasıyla ya da sözde kodla yazılabilir; probleme uygun olan seçilir.
- **Anlatılacaklar:**
  - Algoritma dilinin üç yapısı: doğal dil, akış şeması, sözde kod (temel kabul: öğrenci bunları ifade edebiliyor, tek cümlelik hatırlatma).
  - Aynı işin üç yazılışı yan yana: hangisi neyi daha iyi gösteriyor.
  - Liste, tablo ve çizge de matematiksel temsil yöntemleridir; probleme göre uygun olan seçilir.
  - Akış şeması ve sözde kod okuma ve yazma.
- **Program dayanağı:** MAT.9.5.1 b) "Problem durumlarında temsillerle (liste, tablo, çizge, akış şeması, algoritmik doğal dil, sözde kod gibi) matematiksel yapılar arasındaki ilişkileri belirler." · "...yöntemlerinden uygun olanlar belirlenir." · "Algoritma diline ait yapıların (doğal dil, akış şeması, sözde kod) problem durumlarında nasıl kullanılacağı belirlenir."
- **Açılış sorusu:** Bir yemek tarifini hem yazıyla hem şemayla görseydin, hangisinde yolunu şaşırmak daha zor olurdu?
- **Akılda kalıcı cümle:** "Aynı adımlar, farklı yazılış."

#### A3 · Cebirsel ifadeyi algoritmaya çevir
- **Tek fikir:** Cebirsel bir ifadeyi çözmek, işlemleri doğru sırayla yazmaktır; doğrusal fonksiyonun sıfırını bulan algoritma bunun örneğidir.
- **Anlatılacaklar:**
  - Doğrusal fonksiyonun sıfırını bulmayı sağlayan algoritma nasıl olabilir (doğrusal fonksiyonlar ön bilgi).
  - İşlem adımları sırayla izlenir; sıra değişince sonucun ne olduğu görülür.
  - Cebirsel ifadeden algoritmik dile geçiş: doğal dil, akış şeması ya da sözde kod.
  - Algoritmanın her adımının cebirsel karşılığı söylenir.
- **Program dayanağı:** MAT.9.5.1 c) "Problem durumlarındaki sözel, görsel veya cebirsel ifadeleri algoritmik dile dönüştürür." · "Örneğin verilen bir doğrusal fonksiyonun sıfırını bulmayı sağlayan algoritmanın nasıl olabileceği tartışılır." · "...işlem adımlarının takip edilmesi üzerinde durulur."
- **Açılış sorusu:** Taksi 20 TL açılış ve kilometre başına 10 TL alıyorsa, 100 TL ile kaç kilometre gidebileceğini hangi adımlarla bulursun?
- **Akılda kalıcı cümle:** "İfadeyi çöz, adımlarını yaz."

#### A4 · Sözel problemi algoritmaya çevir
- **Tek fikir:** Gerçek yaşam problemi, girilen değerlerden sonucu üreten adımlara çevrilir; örnek vücut kitle indeksi.
- **Anlatılacaklar:**
  - Sözel problemde verilenler (kilo, boy) ve istenen (vücut kitle indeksi) ayrılır.
  - Adımlar önce doğal dille, sonra akış şemasıyla yazılır.
  - İşlem adımları sırayla takip edilir.
  - Aritmetik ve cebirsel işlemli problemin algoritmik ifadesi ön bilgidir; yeni olan, problemin gerçek yaşamdan gelmesi ve adımların kontrol edilmesidir.
- **Program dayanağı:** MAT.9.5.1 c) · "Bir gerçek yaşam problemine çözüm getiren basit bazı programların (kilo ve boy bilgileri girildiğinde vücut kitle indeksinin hesaplanması gibi) algoritmasını yazma (doğal dil ya da akış şeması)..."
- **Açılış sorusu:** Sağlık uygulaması kilonu ve boyunu girince sana bir sayı veriyor; bu sayıyı nasıl buluyor?
- **Akılda kalıcı cümle:** "Verilenden istenene giden adımları sırala."

#### A5 · Bu algoritma hangi problemi çözüyor?
- **Tek fikir:** Algoritmanın adımlarını izleyerek ne yaptığını sözel, görsel ya da cebirsel olarak açıklarız.
- **Anlatılacaklar:**
  - Verilen bir algoritma (doğal dil, akış şeması ya da sözde kod) okunur.
  - Birkaç değerle adımlar izlenir ve algoritmanın hangi problemin çözümü olduğu belirlenir.
  - Aynı algoritma üç biçimde açıklanır: sözel, görsel (şema), cebirsel (ifade).
  - Kod öbeği gibi bir temsil ile algoritma arasındaki ilişki kurulur.
- **Program dayanağı:** MAT.9.5.1 ç) "Karşılaşılan problem durumlarında geçen algoritmik dili; sözel, görsel veya cebirsel olarak açıklar." · "...verilen bir algoritmanın hangi problemin çözümü olduğunu belirleme çalışmalarına yer verilir." · "Problem durumlarında verilen çizge, şifrelenmiş metin, kod öbeği gibi temsiller ile algoritma arasında ilişkiler kurulur."
- **Açılış sorusu:** Bir arkadaşın sana yalnızca adımları verse, bunların neyi hesapladığını anlar mıydın?
- **Akılda kalıcı cümle:** "Adımları izle, ne yaptığını söyle."

#### A6 · Algoritma testi
- **Tek fikir:** Algoritmanın doğru çalıştığını, değer deneyip çıktıları tabloya yazarak sınarız.
- **Anlatılacaklar:**
  - Algoritmaya girilen değerlerden çıktılar elde edilir ve tabloya aktarılır.
  - Tablo, beklenen sonuçla karşılaştırılır; algoritmanın geçerliliği değerlendirilir.
  - Yanlış çıktı veren satır, algoritmadaki hatayı gösterir.
  - A3 ve A4'te yazılan algoritmalar bu yöntemle sınanır.
- **Program dayanağı:** MAT.9.5.1 · "Oluşturulan algoritmaların geçerliliği, algoritmaya girilen değerlerden elde edilen çıktıların bir tabloya aktarılarak değerlendirildiği algoritma testiyle sınanır."
- **Açılış sorusu:** Bir uygulama güncellemesi yayımlanmadan önce hatasız çalıştığı nasıl anlaşılıyor?
- **Akılda kalıcı cümle:** "Değer gir, çıktıyı tabloya yaz, beklenenle karşılaştır."

### Konu B · Sayı ve arama problemlerinde algoritma

Bu konudaki doğal sayı bilgileri (asal çarpan, bölme, ortak bölen) ön bilgidir; yeni olan, bunların adımlarının algoritmik dille yazılması ve sınanmasıdır.

#### B1 · Nöbet ve kalan
- **Tek fikir:** Periyodik durumlarda kalan, döngüdeki yeri söyler; bölme algoritması bunun aracıdır.
- **Anlatılacaklar:**
  - Nöbet tutma gibi periyodik bir durum bir doğal sayı problemi olarak kurulur.
  - Bölme algoritması: bölünen, bölen, bölüm, kalan (ön bilgi, tek cümle) ve kalanın anlamı.
  - "47. gün kimin nöbeti" sorusunun çözüm adımları doğal dille ya da akış şemasıyla yazılır.
  - Algoritma birkaç gün numarasıyla sınanır (A6).
- **Program dayanağı:** MAT.9.5.1 · "...periyodik durumlar içeren (nöbet tutma gibi) doğal sayı problemleri..." · "...bölme algoritması..."
- **Açılış sorusu:** Beş kişilik nöbet listesi sırayla dönüyorsa 47. gün kim nöbetçi?
- **Akılda kalıcı cümle:** "Kalan, sıranın neresinde olduğunu söyler."

#### B2 · Asal çarpanlara ayırma algoritması
- **Tek fikir:** Bir sayıyı asal çarpanlarına ayırmak, "böl, bölümle devam et" adımlarıyla yapılır.
- **Anlatılacaklar:**
  - Asal çarpanlara ayırma ön bilgidir; yeni olan adımların algoritmik dille yazılmasıdır.
  - Adımlar: bir asal bölen dene, bölüyorsa böl, bölümle devam et; bölüm 1 olunca dur.
  - Adımlar akış şemasıyla ya da sözde kodla yazılır.
  - Algoritma farklı sayılarla çalıştırılır.
- **Program dayanağı:** MAT.9.5.1 · "Örneğin periyodik durumlar içeren (nöbet tutma gibi) doğal sayı problemleri, asal çarpanlara ayırma,... gibi görevlere yer verilir."
- **Açılış sorusu:** Tahtadaki 360'ı çarpanlarına ayırmanın adımlarını bir bilgisayara nasıl anlatırsın?
- **Akılda kalıcı cümle:** "Böl, bölümle devam et, 1'e kadar."

#### B3 · Aralarında asal mı?
- **Tek fikir:** İki sayının 1'den başka ortak böleni yoksa aralarında asaldır; bunu belirleyen adımlar yazılabilir.
- **Anlatılacaklar:**
  - İki sayının ortak bölenlerini belirlemek ön bilgidir.
  - Algoritma: iki sayıyı asal çarpanlarına ayır (B2), ortak asal çarpan var mı bak.
  - Çıktısı "evet" ya da "hayır" olan bir akış şeması.
  - Sayı çiftleriyle (örneğin 8 ile 15, 12 ile 18) sınanır.
- **Program dayanağı:** MAT.9.5.1 · "...verilen iki sayının aralarında asal olup olmadığını belirleme..."
- **Açılış sorusu:** 12 ve 18 kişilik iki sınıf, aynı büyüklükte ve 1 kişiden büyük gruplara tam bölünebilir mi?
- **Akılda kalıcı cümle:** "Ortak asal çarpan yoksa aralarında asaldır."

#### B4 · Eratosthenes kalburu
- **Tek fikir:** Asalları bulmak için asal olmayanları sırayla eleriz.
- **Anlatılacaklar:**
  - İlk 100 doğal sayı içinden asal olanları tespit etme problemi (asalın tanımı ön bilgi).
  - Adımlar: elenmemiş en küçük sayıyı al, katlarını ele; tekrarla.
  - Algoritmanın ne zaman bittiği sorgulanır.
  - Adımlar akış şemasıyla ya da sözde kodla yazılır.
- **Program dayanağı:** MAT.9.5.1 · "...ilk 100 doğal sayı içinden asal olanları tespit etme (Eratosthenes kalburu)..."
- **Açılış sorusu:** 1'den 100'e kadar numaralı kâğıtlardan asal olanları her birine tek tek bölmeden nasıl ayırırsın?
- **Akılda kalıcı cümle:** "Katları ele, kalanlar asaldır."

#### B5 · Bölünebilme kuralı bir algoritmadır
- **Tek fikir:** Bilinen bir bölünebilme kuralı, sayıyı bölmeden cevap veren kısa bir algoritmadır.
- **Anlatılacaklar:**
  - Öğrencinin bildiği bölünebilme kuralları ve basamak değerlerine göre çözümleme ön bilgidir.
  - Kural adımlar olarak yazılır (örneğin basamakları topla, sonucu kontrol et).
  - Aynı kural akış şemasıyla ifade edilir.
  - Kural birkaç sayıyla sınanır.
- **Program dayanağı:** MAT.9.5.1 · "...bilinen bölünebilme kurallarını algoritmik dille ifade etme gibi görevlere yer verilir."
- **Açılış sorusu:** Bir toplam tutarı 3 kişiye eşit bölüşeceksin; bölmeden bölünüp bölünmediğini nasıl anlarsın?
- **Akılda kalıcı cümle:** "Kural, bölmeden bölünebilirliği söyleyen adımlardır."

#### B6 · Madenî para: en az tartım
- **Tek fikir:** Her tartımın sonucuna göre olasılıkları bölersek, farklı kütleli parayı en az tartımla buluruz.
- **Anlatılacaklar:**
  - Aynı ebattaki n madenî paradan birinin kütlesi farklıdır; terazi tek araçtır.
  - En az deneme yaparak çözüm bulma: bu bir arama algoritmasının uygulamasıdır.
  - Her tartımdan sonra aranan paranın hangi grupta kaldığı tabloya yazılır.
  - Yöntem farklı n değerleri için denenir ve akış şemasıyla yazılır.
- **Program dayanağı:** MAT.9.5.1 · "...en az deneme yaparak çözüm bulmayı gerektiren ve arama algoritmalarının uygulaması olan problemler (aynı ebatlara sahip n tane madenî para içinden kütlesi farklı olan 1 tanesini en az tartımla bulma... gibi) ele alınır."
- **Açılış sorusu:** Aynı görünümlü 9 madenî paranın birinin kütlesi farklı; bir terazide en az kaç tartımla onu bulursun?
- **Akılda kalıcı cümle:** "Her denemede seçenekleri bölüştür."

#### B7 · Akıldan tutulan sayı
- **Tek fikir:** Cevabı evet ya da hayır olan her soru seçenekleri böler; doğru sorularla sayı en az soruda bulunur.
- **Anlatılacaklar:**
  - Oyun: akıldan bir doğal sayı tutulur, yalnızca evet/hayır cevabı verilir.
  - Her sorunun olası sayıları ne kadar azalttığına bakılır; iyi soru seçilir.
  - Algoritma: olasılıkları her soruda yarıya yakın böl, cevaba göre bir tarafı at.
  - Algoritma farklı sayılarla sınanır; soru sayıları tabloya yazılır.
  - B6 ile karşılaştırılır: ikisi de arama problemidir.
- **Program dayanağı:** MAT.9.5.1 · "...akıldan tutulan bir doğal sayıyı cevabı evet/hayır olan en az sayıda soru ile bulma gibi) ele alınır."
- **Açılış sorusu:** Arkadaşın 1 ile 100 arasında bir sayı tuttu ve yalnızca evet ya da hayır diyecek; en az kaç soruda bulursun?
- **Akılda kalıcı cümle:** "Her soru olasılıkları yarıya indirir."

### Konu C · Şifreleme

#### C1 · Şifreleme ve çözme
- **Tek fikir:** Şifreleme mesajı bir kuralla değiştirir; çözme aynı kuralı tersine işletir.
- **Anlatılacaklar:**
  - Mesajları şifrelemek için algoritmaların nasıl kullanılabileceği sorgulanır; kişisel bilgilerin korunması bağlamı.
  - Metindeki harflere sayısal değer verilir.
  - Şifreleme algoritması ile onu geri alan çözme algoritması yan yana yazılır.
  - Şifrelenmiş bir metin ile algoritma arasındaki ilişki kurulur.
- **Program dayanağı:** İçerik çerçevesi "Şifrelemede ve şifre çözmede algoritmalar kullanılır." · MAT.9.5.1 "Bilgi teknolojileri ve iletişimde mesajları şifrelemek için algoritmaların nasıl kullanılabileceği sorgulanır..." · "Problem durumlarında verilen çizge, şifrelenmiş metin, kod öbeği gibi temsiller ile algoritma arasında ilişkiler kurulur."
- **Açılış sorusu:** Mesajlaşma uygulamasında yazdıklarını araya giren biri neden okuyamıyor?
- **Akılda kalıcı cümle:** "Şifrele, kuralı tersine çevir, çöz."

#### C2 · Sayıyı ikili sisteme çevir
- **Tek fikir:** Her doğal sayı 0 ve 1 ile yazılabilir; çevirme adımları bir algoritmadır.
- **Anlatılacaklar:**
  - Sayısal değerlerin ikili sisteme (binary) dönüştürülmesi bir şifreleme örneğidir.
  - İkili sistem temel kabullerde yok; basamak değeri ön bilgisi üzerine sıfırdan kurulur.
  - Dönüştürme algoritması: ikiye böl, kalanları yaz (bölme algoritması, B1).
  - İkili yazılışı çözüp sayıya geri dönmek.
  - Algoritma birkaç sayıyla sınanır.
- **Program dayanağı:** MAT.9.5.1 · "...metinlere, sayılara veya sembollere verilen sayısal değerlerle ikili sisteme (binary) dönüştürülmesi bir şifreleme örneği olarak ele alınır." Destekleme: "...ikili sistemde (binary) kod oluşturmada, bunları çözümlemeyi gerektiren problemlerde..." (zorunlu değil).
- **Açılış sorusu:** Bilgisayar yalnızca açık-kapalı anahtarlardan oluşuyorsa 25 sayısını bu anahtarlarla nasıl yazar?
- **Akılda kalıcı cümle:** "İkiye böl, kalanları ters sırayla yaz."

#### C3 · Mesajı ikili kodla yaz ve çöz
- **Tek fikir:** Harf, sayıya; sayı, sıfır ve bire döner; ters yoldan okuyunca mesaj geri gelir.
- **Anlatılacaklar:**
  - Metin, sayısal değer (C1), ikili sistem (C2): üç adımlı bir şifreleme algoritması.
  - Aynı algoritma akış şemasıyla ya da sözde kodla yazılır.
  - Verilen ikili kodlu bir mesaj çözülür.
  - Kısa bir kelimeyle algoritma testi (A6).
- **Program dayanağı:** MAT.9.5.1 · "Benzer şekilde şifreleme ve çizge içeren problemlerdeki algoritma örnekleri incelenir." · "...ikili sisteme (binary) dönüştürülmesi bir şifreleme örneği olarak ele alınır."
- **Açılış sorusu:** Sana yalnızca sıfır ve birlerden oluşan bir satır gönderildi; içinde saklı kelimeyi nasıl okursun?
- **Akılda kalıcı cümle:** "Harf sayıya, sayı sıfır ve bire döner."

### Konu D · Çizgeler

Üç dersin hepsinde bağlayıcı sınırlama geçerlidir: "(çizge kuramı ile ilgili teoremlere girilmeden ve çizge sınıflandırmaları yapılmadan)". Yani derece, yol türü, yönlü ya da ağırlıklı çizge gibi adlandırmalar ve Königsberg sonucunun nedenini veren kural derse girmez.

#### D1 · Königsberg: bölge nokta, köprü çizgi
- **Tek fikir:** Çizge, bir problemi nokta (düğüm) ve çizgi (ayrıt) ile yalın bir şemaya çevirir.
- **Anlatılacaklar:**
  - Euler ve Königsberg köprüsü problemi, tarihî bağlamıyla tanıtılır.
  - Ayrıt (çizgi) ve düğüm (nokta) kavramları açıklanır.
  - Köprüler ayrıt, bölgeler düğüm kabul edilerek harita çizge şemasına çevirilir.
  - Öğrenci probleme dair fikir üretir; çizgenin problem çözmede etkili bir araç olduğu görülür.
- **Program dayanağı:** MAT.9.5.1 "Çizge kuramının temel kavramları olarak ayrıt (çizgi) ve düğüm (nokta) açıklandıktan sonra (çizge kuramı ile ilgili teoremlere girilmeden ve çizge sınıflandırmaları yapılmadan)..." · "...köprüler ayrıt, bölgeler düğüm kabul edilerek problem; bir çizge şeması ile temsil edilir." · Köprü kurma: "Euler’in (Öyler) Königsberg (Könisberk) köprüsü problemi tarihî bağlamı ile birlikte tanıtılarak öğrencilerin probleme dair fikir üretmeleri beklenebilir."
- **Açılış sorusu:** Yedi köprüsü olan bir şehirde her köprüden yalnızca bir kez geçerek tüm şehri dolaşabilir misin?
- **Akılda kalıcı cümle:** "Çizge, yalnızca bağlantıyı tutar."

#### D2 · Çizge başka sorularda da işe yarar
- **Tek fikir:** Aynı çizge dili, yol ve ilişki sorularında farklı bir çözüm yolu verir.
- **Anlatılacaklar:**
  - El kaldırmadan çizilen şekil bir çizgeye çevrilir.
  - Şehirleri birbirine bağlayan en kısa yol: yol ağı çizgedir, uzaklıklar çizgilerin üstüne yazılır (adlandırma yapılmadan).
  - Tokalaşma sayısı: kişi düğüm, tokalaşma ayrıttır.
  - Sosyal ağlarda bilginin yayılımı: kişi düğüm, bağlantı ayrıttır.
- **Program dayanağı:** MAT.9.5.1 "El kaldırmadan çizilen şekiller, şehirleri birbirine bağlayan en kısa yol, tokalaşma sayısı, sosyal ağlarda bilginin yayılımı gibi problemlerde farklı bir çözüm yolu olarak çizgelerin kullanılabileceği gösterilir." İçerik çerçevesi: "Çizge ve diyagramlar, etkin problem çözme araçlarıdır."
- **Açılış sorusu:** Sosyal ağda bir haber ilk kişiden yüzlerce kişiye nasıl ulaşıyor?
- **Akılda kalıcı cümle:** "Bağlantı sorusu görünce çizge çiz."

#### D3 · Çizgeyi algoritmanın diliyle oku
- **Tek fikir:** Verilen bir çizge ile algoritma birbirine çevrilir: çizgedeki yol adımlara, adımlar çizgedeki yola dönüşür.
- **Anlatılacaklar:**
  - Verilen çizge ile algoritma arasındaki ilişki kurulur.
  - Çizgedeki bir yol doğal dille adımlara yazılır (görsel ifadeden algoritmik dile).
  - Verilen adımlar çizgede izlenir ve hangi problemin çözümü olduğu söylenir.
  - Çizge içeren bir problemdeki algoritma örneği incelenir.
- **Program dayanağı:** MAT.9.5.1 · "Problem durumlarında verilen çizge, şifrelenmiş metin, kod öbeği gibi temsiller ile algoritma arasında ilişkiler kurulur." · "Benzer şekilde şifreleme ve çizge içeren problemlerdeki algoritma örnekleri incelenir."
- **Açılış sorusu:** Navigasyon uygulaması yol ağını "şuradan sağa dön" diyen adımlara nasıl çeviriyor?
- **Akılda kalıcı cümle:** "Çizgedeki yol, adımlara yazılabilir."

### Konu E · Çözüm stratejisi: kur, uygula, kontrol et, değerlendir

#### E1 · Tokalaşma: strateji kur ve uygula
- **Tek fikir:** Problemi algoritmik dile çevirince çözüm stratejisi ortaya çıkar; stratejiyi uygulayınca sonuç gelir.
- **Anlatılacaklar:**
  - Belirli sayıda kişinin herkesle tokalaşması durumunda toplam tokalaşma sayısı sorulur.
  - Problem algoritmik dile çevrilir (her yeni kişi, daha önce gelenlerle tokalaşır).
  - Oluşturulan algoritmanın, problemin nasıl çözüleceğine dair stratejiyi içerdiği görülür.
  - Strateji 4, 5, 6 kişilik gruplara uygulanır.
- **Program dayanağı:** MAT.9.5.1 d) "Karşılaşılan problem durumlarında algoritma temelli bir çözüm stratejisi oluşturur." e) "...seçtiği algoritma temelli çözüm stratejisini kullanır." · "...belirli sayıda kişiden oluşan bir grupta herkesin birbiri ile tokalaşması durumunda toplam tokalaşma sayısını tespit edebilmek için algoritma oluşturulur. Oluşturulan algoritma, problemin nasıl çözülebileceğine dair stratejiyi içerir."
- **Açılış sorusu:** Sınıftaki herkes birbiriyle tokalaşırsa kaç tokalaşma olur?
- **Akılda kalıcı cümle:** "Algoritma, çözümün stratejisidir."

#### E2 · Şifre hangi kuralla yazıldı?
- **Tek fikir:** Kuralı bilinmeyen şifreli bir metnin kuralını bulmak için algoritma kurulur.
- **Anlatılacaklar:**
  - Şifrelenmiş metin verilmiş, kural verilmemiştir.
  - Harfler ile sayısal değerler arasındaki ilişki tabloya yazılır ve kural çıkarılır.
  - Kuralı bulan strateji adımlara yazılır.
  - Bulunan kural yeni bir şifreli metne uygulanır.
- **Program dayanağı:** MAT.9.5.1 d, e) · "Örneğin şifrelenmiş bir metnin hangi kural kullanılarak şifrelendiğini saptayabilmek... için algoritma oluşturulur."
- **Açılış sorusu:** Arkadaşından kuralı belirtilmemiş şifreli bir mesaj geldi; kuralı nereden yakalarsın?
- **Akılda kalıcı cümle:** "Eşleşmeleri tabloya yaz, kuralı yakala."

#### E3 · Çöp arabası: çizgeyi tasarla
- **Tek fikir:** Gerçek bir yol problemini çizgeye çevirmek, çözüm stratejisinin ilk adımıdır.
- **Anlatılacaklar:**
  - Gerçek yaşam durumu: her gün çalışan bir çöp arabasının yakıt tüketimini azaltmak için şehrin sokaklarını en kısa yoldan dolaşması.
  - Sokaklar ve kavşaklar için çizge tasarlanır.
  - Tasarlanan çizgeyle elde edilen sonuçlar tartışılır.
  - Daha temiz bir çevre ve tasarruf, problemin bağlamıdır (D18.3, D17.3).
  - Çizge kuramı teoremleri ve sınıflandırma yoktur; en kısa yolu ya da turu bulan algoritmalar zenginleştirmedir ve derse girmez.
- **Program dayanağı:** MAT.9.5.1 d) · "Bir gerçek yaşam durumundan hareketle [daha temiz bir çevreye sahip olmak amacıyla her gün çalışan bir çöp arabasının yakıt tüketimini azaltmak için şehrin sokaklarını en kısa yoldan dolaşabilmesi gibi] çözüm için bir çizge tasarlanır (D18.3, D17.3). Tasarlanan çizgelerle elde edilen sonuçlar tartışılır."
- **Açılış sorusu:** Çöp arabası her gün aynı sokakları dolaşıyor; yakıtı azaltmak için hangi bilgiye ihtiyacın var?
- **Akılda kalıcı cümle:** "Önce haritayı çizgeye çevir."

#### E4 · Çözümü kontrol et
- **Tek fikir:** Bir çözümün doğruluğu, aynı problemi başka algoritmayla ya da teknolojiyle yeniden çözerek kontrol edilir.
- **Anlatılacaklar:**
  - Çözülmüş bir problem (örneğin E1) başka bir yolla yeniden çözülür.
  - Matematiksel araç ve teknolojiden yararlanılarak aynı sonuç aranır.
  - İki sonuç uyuşmazsa hangi adımın kontrol edileceği belirlenir.
  - Dijital kaynakları belirleme ve kullanma (MAB5, OB2).
- **Program dayanağı:** MAT.9.5.1 f) "...seçtiği algoritma temelli çözüm stratejisini kontrol eder." · "Çözülen problem, başka algoritmalar kullanılarak veya kullanılmadan (örneğin matematiksel araç ve teknolojiden yararlanılarak) tekrar çözülür ve önceki adımda elde edilen çözümün doğruluğu kontrol edilir."
- **Açılış sorusu:** Bir sonucu kendin bulduktan sonra doğru olduğundan nasıl emin olursun?
- **Akılda kalıcı cümle:** "Sonucu başka yoldan da bul."

#### E5 · Aynı problem, iki strateji
- **Tek fikir:** Bir sözel problem hem çizgeyle hem tabloyla çözülebilir; iki strateji problemin farklı yönlerini gösterir.
- **Anlatılacaklar:**
  - İncelenen problemin algoritma temelli olan veya olmayan olası tüm çözüm stratejileri ele alınır.
  - Sözel problem çizge şemasıyla çözülür.
  - Aynı problem tabloyla çözülür.
  - İki çözümün farklı yönleri saptanır.
- **Program dayanağı:** MAT.9.5.1 g) "Algoritma temelli çözülebilen problemlerin olası çözüm stratejilerini gözden geçirir." · "Örneğin sözel bir problemin çözümü, hem çizge şeması oluşturularak hem de tablo kullanılarak yapılır... Bu şekilde algoritma temelli çözümlerin diğer çözümlerden farklı yönleri saptanır."
- **Açılış sorusu:** Bir arkadaş grubunda kim kimi tanıyor sorusunu listeyle de çizimle de cevaplayabilirsin; hangisi seni daha çabuk sonuca götürür?
- **Akılda kalıcı cümle:** "Aynı soru, birden çok yol."

#### E6 · Çıkarım yap, değerlendir
- **Tek fikir:** Çözülmüş problemlerden çıkarımlar yapılır; bu çıkarımların hangi problemde işe yaradığı değerlendirilir.
- **Anlatılacaklar:**
  - Bir problemin algoritma temelli çözümünden çıkarım yapılır.
  - Çıkarım yeni bir problemde kullanılır.
  - Çıkarımın kullanışlılığı değerlendirilir: hangi durumda işe yarar, hangisinde yaramaz.
  - Tablo, çizge ve algoritma stratejileri bu açıdan karşılaştırılır.
- **Program dayanağı:** MAT.9.5.1 ğ) "...çözüme ulaştıran stratejilere yönelik çıkarımlar yapar." h) "...çıkarımları değerlendirir." · "Mevcut problemin algoritma temelli çözümlerinden yararlanılarak çıkarımlar yapılır. Elde edilen bu çıkarımlar, problemlerin çözümündeki kullanışlılığı açısından değerlendirilir."
- **Açılış sorusu:** Daha önce çözdüğün bir problemin çözümü bugünkü başka bir probleme yarasaydı bu neden olurdu?
- **Akılda kalıcı cümle:** "Çözümden çıkarım yap, işe yaradığı yeri söyle."

### Konu F · Algoritmalarda mantık bağlaçları ve niceleyiciler

Mantık bağlaçlarının ve niceleyicilerin anlamları temel kabuldür ("mantık bağlaçları ile niceleyicileri bildiği") ve 1. ünitede MAT.9.1.4 kapsamında işlenir (Sayılar, D1–D3). Bu konuda anlamlar yeniden anlatılmaz; yalnızca tek cümlelik hatırlatma yapılır, işlenen konu bunların algoritmadaki işlevidir. Program bu çıktıda bağlaç olarak yalnızca ve, veya, ya da, ise'yi sayar (ancak ve ancak yok).

#### F1 · Karar adımı: ise, ve, veya, ya da
- **Tek fikir:** Algoritmada bir adımın yapılıp yapılmayacağına karar veren koşul, bağlaçlarla kurulan bir önermedir.
- **Anlatılacaklar:**
  - Koşul adımı: "ise" (akış şemasında karar noktası, sözde kodda koşul).
  - Nesneleri ya da kişileri iki özelliğe göre sınıflandırma: "ve", "veya".
  - Üç özelliğe göre sınıflandırma: "ya da" ile yalnızca biri.
  - Bu bağlaçlar olmadan aynı kuralı yazmanın zorluğu: ihtiyacın sebebi sorgulanır.
  - Kural algoritmik dilde (doğal dil, akış şeması ya da sözde kod) yazılır.
- **Program dayanağı:** MAT.9.5.2 a) "Algoritmik yapılar içerisinde kullanılan mantık bağlaçlarını ve niceleyicileri belirler." · "...(nesneleri/kişileri iki ya da üç özelliğe göre sınıflandırmayı içeren problemler...) geçen önermelerdeki mantık bağlaçları (ve, veya, ya da, ise)... anlamları değerlendirilir." · "Öğrencilerin algoritma temelli problemlerde mantık bağlaçları ve niceleyicilere olan ihtiyacın sebebini sorgulaması sağlanır."
- **Açılış sorusu:** Kütüphane otomasyonunda "roman ve ödünç verilebilir" diye ararken "ve" yerine "veya" yazsan sonuçlar nasıl değişir?
- **Akılda kalıcı cümle:** "Koşul, bağlaçlarla kurulan bir önermedir."

#### F2 · Her ve bazı
- **Tek fikir:** "Her" için algoritma bütün elemanlara bakar; "bazı" için biri bulununca durur.
- **Anlatılacaklar:**
  - "Her" içeren koşul: bütün elemanlar denenir, tek istisna koşulu bozar.
  - "Bazı" içeren koşul: ilk uygun elemanda durulabilir.
  - İki niceleyici algoritmik dilde yazılır (doğal dil, akış şeması ya da sözde kod).
  - Daha önceki algoritmalardan örnek: kalburda "her sayı", aramada "bazı".
- **Program dayanağı:** MAT.9.5.2 b) "Algoritmik yapılar ile mantık bağlaçları ve niceleyiciler arasındaki ilişkileri belirler." · "...niceleyicilerin (her, bazı) anlamları değerlendirilir." · "Bu mantık bağlaçları ve niceleyicilerin algoritma temelli problemlerdeki kullanımı ve işlevi, problem çözümlerine ilişkin algoritmik dil... oluşturularak belirlenir."
- **Açılış sorusu:** Yoklamayı kontrol eden bir program "herkes burada mı" ile "biri eksik mi" sorusunu neden farklı yollarla cevaplar?
- **Akılda kalıcı cümle:** "Her: hepsine bak. Bazı: biri yeter."

#### F3 · Çizge ve şifreleme problemlerinde bağlaç ve niceleyici
- **Tek fikir:** Çizge ve şifre problemlerinin metinlerinde de bağlaç ve niceleyici saklıdır; algoritmaya çevirince görünür olur.
- **Anlatılacaklar:**
  - Çizge içeren bir problem metnindeki önermeler incelenir ("her düğümden... " ya da "bazı ayrıtlar..." türünden cümleler).
  - Şifreleme içeren bir problem metnindeki önermeler incelenir ("ise" ile kurulmuş şifre kuralı gibi).
  - Her cümledeki bağlaç ve niceleyici belirlenir.
  - Algoritma adımı ile bağlaç ya da niceleyici arasındaki karşılık kurulur.
- **Program dayanağı:** MAT.9.5.2 a, b) · "Gerçek yaşam durumlarında ve sözel problem metinlerinde (... çizge veya şifreleme içeren problemler gibi) geçen önermelerdeki mantık bağlaçları... ve niceleyicilerin... anlamları değerlendirilir. Problem durumlarında yer alan bu mantık bağlaçları ve niceleyicilerin anlamları belirlenir."
- **Açılış sorusu:** Bir şifre kuralı "harf ünlü ise 3 ekle, değilse 1 çıkar" diyorsa, algoritmayı iki yola ayıran söz hangisi?
- **Akılda kalıcı cümle:** "Metindeki bağlaç, algoritmadaki yol ayrımıdır."

### Konu G · Matematikte yansıtma: ispat ve sembolik dil

#### G1 · Algoritmalara geri bak
- **Tek fikir:** Gördüğümüz algoritmalarda hangi adımların bağlaç ya da niceleyiciye ihtiyaç duyduğu ve bunların nasıl kullanıldığı gözden geçirilir.
- **Anlatılacaklar:**
  - Kalbur, arama, bölünebilme, şifre kuralı gibi önceki algoritmalarda "ise", "ve", "her", "bazı" aranır.
  - Hangi algoritmada hangisine ihtiyaç olduğu ve nasıl kullanıldığı söylenir.
  - Programın sorduğu iki soru tartışılır: kullanım alanları nelerdir, algoritmalarda ne tür işlevleri vardır.
  - Sonuç: bağlaçlar ve niceleyiciler algoritmaların temel ögelerindendir.
- **Program dayanağı:** MAT.9.5.3 a) "Karşılaştığı algoritmalardaki mantık bağlaçları ve niceleyicilerin kullanımını gözden geçirir." · "İncelenen algoritmalardan hangilerinde mantık bağlaçları ve niceleyicilere ihtiyaç duyulduğu ve bunların nasıl kullanıldığı gözden geçirilir." İçerik çerçevesi: "Mantık bağlaçları ve niceleyiciler, algoritmaların temel ögelerindendir."
- **Açılış sorusu:** Bu ünitede yazdığın hangi algoritmada "her" ya da "ise" olmadan yolu bulamazdın?
- **Akılda kalıcı cümle:** "Algoritmanın karar noktalarında bağlaç ya da niceleyici vardır."

#### G2 · Her tek sayının karesi de tektir
- **Tek fikir:** Aynı önerme algoritmayla denenebilir; cebirsel ispat onu bütün tek sayılar için gösterir.
- **Anlatılacaklar:**
  - "Her tek sayının karesi de tektir." önermesindeki "her" ve "ise" yapısı.
  - Algoritma adımlarıyla doğrulama: bir tek sayı al, karesini al, tek mi bak; birkaç sayıyla yinele.
  - Aynı önermenin cebirsel ispat adımları (tek sayının cebirsel gösterimi ispatın gereğidir).
  - Matematiksel doğrulama ve ispatta bağlaç ve niceleyicilerin nerede devreye girdiğine dair çıkarım.
  - İki yolun karşılaştırılması: bir önerme, iki dil.
- **Program dayanağı:** MAT.9.5.3 b) "Matematiksel problem çözme, doğrulama ve ispat süreçlerinde mantık bağlaçları ve niceleyicilerin kullanımına yönelik çıkarımlar yapar." · "Basit bir önerme (“Her tek sayının karesi de tektir.” gibi) alınarak bu önermenin doğruluğu, hem algoritma hem de cebirsel ispat adımları ile gösterilir." İçerik çerçevesi: "Matematiksel doğrulama ve ispat süreçleri, algoritmik bir yaklaşımla gerçekleştirilebilir."
- **Açılış sorusu:** Bir tek sayının karesinin tek çıktığını yüz sayıda denesen, her tek sayı için doğru olduğundan emin olur muydun?
- **Akılda kalıcı cümle:** "Algoritma dener, ispat hepsini gösterir."

#### G3 · Üç dil, tek önerme
- **Tek fikir:** Sözel, sembolik ve algoritmik dil aynı fikri anlatır; sembolik dil en yalın ve en kesin olanıdır.
- **Anlatılacaklar:**
  - Bir önerme ve çözümü sözel, sembolik ve algoritmik dille birlikte ifade edilir.
  - Sözel anlatımdaki belirsizlik ("bazı", "ya da" gibi sözcüklerin anlam kayması) sembolle giderilir: kesinlik.
  - Aynı kural algoritmik dilde adım adım yazılır.
  - Bağlaç ve niceleyicilerin matematiğin sembolik dilini yalın, kesin ve evrensel kıldığı değerlendirilir.
- **Program dayanağı:** MAT.9.5.3 c) "Mantık bağlaçları ve niceleyicilerin matematiksel dil ve sembolizmin yalınlık ve kesinliğindeki rolünü değerlendirir." · "...sözel, sembolik ve algoritmik dilin birlikte kullanıldığı uygulamalar yapılır." · "...matematiğin sembolik dilinin yalın, kesin ve evrensel bir biçimde oluşumunda önemli bir rolü olduğuna yönelik değerlendirmelerde bulunmaları desteklenir."
- **Açılış sorusu:** Farklı dilleri konuşan iki öğrenci aynı matematik cümlesini sembollerle yazsa anlaşabilir mi?
- **Akılda kalıcı cümle:** "Semboller cümleyi kısaltır, anlamı sabitler."

## 4. Müfredat denetimi

| Programın istediği | Hangi kısa ders |
|---|---|
| Algoritma kelimesinin kökeni; Batı dillerine Harizmi'nin isminin okunuşundan geçmesi | A1 |
| Bilgisayar bilimlerinde yazılan kodların tümünün algoritmalardan oluştuğuna dair basit örnekler | A1 |
| 9.5.1 a) Problemdeki işlem ve süreç bileşenlerini belirleme | A1, A4 |
| 9.5.1 b) Temsiller (liste, tablo, çizge, akış şeması, doğal dil, sözde kod) ve uygun olanı seçme | A2 |
| 9.5.1 b) Çizge, şifrelenmiş metin, kod öbeği ile algoritma arasındaki ilişki | D3 (çizge), C1 ve C3 (şifrelenmiş metin), A5 (kod öbeği) |
| 9.5.1 c) Sözel, görsel, cebirsel ifadeleri algoritmik dile dönüştürme | A4 (sözel), D3 (görsel), A3 (cebirsel) |
| 9.5.1 ç) Algoritmik dili sözel, görsel, cebirsel açıklama; verilen algoritmanın hangi problemin çözümü olduğunu belirleme | A5 |
| Akış şeması ve sözde kod okuma ve yazma | A2, A3, A4, A5 |
| Doğrusal fonksiyonun sıfırını bulan algoritma | A3 |
| Vücut kitle indeksi algoritması (doğal dil ya da akış şeması) | A4 |
| Algoritma testi (girilen değer, çıktı tablosu) | A6 |
| Periyodik durumlar (nöbet tutma) | B1 |
| Bölme algoritması | B1 |
| Asal çarpanlara ayırma | B2 |
| İki sayının aralarında asal olup olmadığını belirleme | B3 |
| İlk 100 doğal sayıda asalları bulma (Eratosthenes kalburu) | B4 |
| Bilinen bölünebilme kurallarını algoritmik dille ifade etme | B5 |
| Madenî para problemi (n madenî para, en az tartım) | B6 |
| Akıldan tutulan sayı, evet/hayır, en az soru | B7 |
| En az deneme yaparak çözüm bulma; arama algoritmalarının uygulaması | B6, B7 |
| Mesajları şifrelemek için algoritmaların nasıl kullanılabileceğinin sorgulanması; şifreleme ve şifre çözme | C1 |
| Metin, sayı ve sembollere sayısal değer verip ikili sisteme (binary) dönüştürme | C1 (sayısal değer), C2 (ikili sistem), C3 (birlikte) |
| Şifreleme içeren problemlerdeki algoritma örnekleri | C3, E2 |
| Ayrıt (çizgi) ve düğüm (nokta) kavramları | D1 |
| Königsberg köprüsü: köprüler ayrıt, bölgeler düğüm; çizge şeması; tarihî bağlam; fikir üretme | D1 |
| Sınırlama: çizge teoremlerine ve sınıflandırmalarına girilmez | D1, D2, D3, E3 |
| El kaldırmadan çizilen şekiller | D2 |
| Şehirleri birbirine bağlayan en kısa yol | D2 |
| Tokalaşma sayısı (çizge) | D2 |
| Tokalaşma sayısı (algoritma ve strateji) | E1 |
| Sosyal ağlarda bilginin yayılımı | D2 |
| Çizge içeren problemlerdeki algoritma örnekleri | D3 |
| 9.5.1 d) Algoritma temelli çözüm stratejisi oluşturma | E1, E2, E3 |
| 9.5.1 e) Seçilen stratejiyi kullanma | E1, E2, E3 |
| Şifrenin hangi kuralla yazıldığını saptama | E2 |
| Çöp arabası: çizge tasarlama, sonuçları tartışma (D17.3, D18.3) | E3 |
| 9.5.1 f) Stratejiyi kontrol etme; başka algoritma ya da teknolojiyle yeniden çözme; dijital kaynaklar (MAB5, OB2) | E4 |
| 9.5.1 g) Olası tüm çözüm stratejileri; çizge ve tabloyla çözme; farklı yönlerin saptanması | E5 |
| 9.5.1 ğ, h) Çıkarım yapma ve çıkarımların kullanışlılığını değerlendirme | E6 |
| 9.5.2 a) Algoritmik yapılardaki bağlaçları (ve, veya, ya da, ise) belirleme | F1 |
| 9.5.2 a) Algoritmik yapılardaki niceleyicileri (her, bazı) belirleme | F2 |
| İki ya da üç özelliğe göre sınıflandırma problemleri | F1 |
| Çizge veya şifreleme içeren problem metinlerinde bağlaç ve niceleyici | F3 |
| Bağlaç ve niceleyicilere olan ihtiyacın sebebini sorgulama | F1, F2 |
| 9.5.2 b) Algoritmik yapılar ile bağlaç ve niceleyiciler arasındaki ilişki; algoritmik dil oluşturarak işlevi belirleme | F2, F3 (F1 bağlaçlar için) |
| 9.5.3 a) Karşılaşılan algoritmalarda bağlaç ve niceleyici kullanımını gözden geçirme; "kullanım alanları" ve "işlevleri" soruları | G1 |
| "Her tek sayının karesi de tektir." önermesi: algoritma ve cebirsel ispat | G2 |
| 9.5.3 b) Problem çözme, doğrulama ve ispatta bağlaç ve niceleyicilerle ilgili çıkarım | G2 |
| Sözel, sembolik ve algoritmik dilin birlikte kullanımı | G3 |
| 9.5.3 c) Bağlaç ve niceleyicilerin sembolik dilin yalınlık, kesinlik ve evrenselliğindeki rolü | G3 |

Tabloda yeri olmayan kısa ders yoktur: A1–A6, B1–B7, C1–C3, D1–D3, E1–E6, F1–F3 ve G1–G3 en az bir satırda geçer.

## 5. Bilerek alınmayanlar

**Ön bilgi sayılanlar (temel kabuller; ayrı ders yapılmadı, gerektiğinde tek cümlelik hatırlatma):** tek, çift ve ardışık tam sayılar; bir doğal sayının asal olup olmadığını ve asal çarpanlarını belirleme (B2'de yalnızca algoritmik yazım yeni); çarpan ve kat; basamak değerlerine göre çözümleme (B5 ve C2'de kullanılır); bölünen, bölen, bölüm, kalan; ortak bölen ve ortak kat; mantık bağlaçları ve niceleyiciler (anlamları 1. ünitede; F ve G'de yalnızca algoritmadaki ve ispattaki rolü); doğrusal fonksiyonlar; aritmetik ve cebirsel işlemli bir problemin aşamalarını doğal dil, akış şeması ya da sözde kodla ifade etme (A2–A4 buna yaslanır).

**Zenginleştirme (zorunlu değil, derslere girmedi):**
- En büyük ortak bölen için algoritma ve Öklid algoritması; öz yinelemeli (rekürsif) algoritmalar.
- Şifreleme algoritmasının tespiti ve metnin ortaya çıkarılmasına yönelik ek çalışmalar (E2'nin sınırı için "Açık sorular"a bakın); kriptolojide kullanılan asal sayı test algoritmaları.
- Sıralama algoritmalarının sağladığı avantajların araştırılması.
- İkili arama ağacı.
- Çizgelerde kenar ve köşe sayıları arasındaki ilişkiler, Euler karakteristiği, platonik cisimler; en kısa yolu ya da tam turu bulan çeşitli algoritmalar; Euler turu, Hamilton turu, gezgin satıcı problemi; algoritmayı bir programlama diline aktarıp çalıştırma.

**Programda "verilebilir" ya da "yaptırılır" diye geçen, ders içeriği olmayan etkinlikler** (sayfa sınıf ortamını varsayıyor; istenirse ayrıca eklenir):
- Araştırma ödevleri: sık kullanılan program ve uygulamaların algoritmalarının incelenmesi; sıralama ve arama algoritmalarının çözümlenmesi; kişisel bilgilerin korunmasıyla ilgili şifreleme algoritmaları (D8.2).
- Performans görevi (programlama dillerindeki kodlamalarda yer alan algoritmaların çözümlenmesi, akış şemalarının oluşturulması), çalışma kâğıtları, öz değerlendirme formu, derecelendirme ölçeği.
- Köprü kurma etkinlikleri: sınıf içi tartışma, öğrenci sunumları, Cezeri'nin sibernetik alanındaki çalışmaları, ulusal güvenlik ve siber güvenlik vurgusu. (Königsberg ve şifrelerle korunma, ilgili derslerin açılışında kullanıldı.)
- Sorumluluk değeri (D16.3: görevi zamanında ve eksiksiz tamamlama): ders içeriği değil, öğretmen beklentisi.
- Destekleme önerileri: tangram, sudoku, kakuro gibi somut materyaller; ek süre; çoklu ortamda geri bildirim.

**Bu konularda geleneksel olarak anlatılan ama programda olmayan başlıklar (kullanıcı isterse eklenir):**
- Programlama dili öğretimi: sözdizimi, değişken, veri türü, kod yazma. (Program kodu yalnızca okunacak "kod öbeği" ve "basit örnek" olarak anıyor.)
- Algoritma terimleri: girdi, çıktı ve karar kutusunun adlandırılması, döngü, değişken, atama. Program "girilen değer" ve "çıktı"dan söz ediyor, "döngü" ve "değişken" demiyor; derslerde sözcük olarak yük getirilmez.
- Algoritma tanımının biçimsel hâli (sonluluk, belirlilik), algoritma karmaşıklığı, O gösterimi, adım sayısını logaritmayla genelleme (B6 ve B7'de en az deneme sayısı genellenmez).
- Sıralama algoritmalarının adım adım işlenişi (kabarcık, seçmeli, ekleme) ve ikili arama adı.
- Kriptografi: Sezar şifresinin adı ve modüler aritmetik, simetrik ve asimetrik anahtar, RSA, özet (hash).
- Sayı sistemleri: ASCII ve Unicode tabloları, bit ve bayt, onaltılık sistem, ikili sistemde işlemler.
- Çizge terimleri ve sonuçları: derece, yol ve devre, bağlantılı çizge, ağaç, yönlü ve yönsüz, ağırlıklı çizge, komşuluk matrisi; Euler yolu için derece koşulu (Königsberg'in neden çözülemediği); el sıkışma lemması; Dijkstra, BFS, DFS.
- Mantık: doğruluk tabloları, mantık kapıları (VE, VEYA, DEĞİL), Boole cebiri, De Morgan kuralı, p ⇒ q'nun denk biçimleri.
- İspat yöntemleri: tümevarım, olmayana ergi (G2 yalnızca doğrudan cebirsel ispat kullanır).
- Akış şeması simgelerinin standart adları ve kuralları (A2'de yalnızca program metnindeki üç yapı).

## 6. Açık sorular

1. **Ders sayısı (31) ve birleştirme.** Saat başına oran 1. üniteden yüksek. İstenirse şu çiftler tek derse indirilebilir, ama her birinde iki ayrı problem tek derse sıkışır: B2 + B3 (asal çarpan, aralarında asal), B6 + B7 (iki arama problemi), A3 + A4 (cebirsel ve sözel dönüşüm), E5 + E6 (strateji karşılaştırma ve çıkarım). Hepsi birleşirse 27 olur. Hangisini istersiniz?
2. **MAT.9.5.1'in beş konuya bölünmesi** kuralın istisnasıdır (bölüm 2). A–D'yi tek "algoritma temelli problemler" konusunda toplayıp E'yi ayrı bırakmak (toplam 4 konu) da mümkün; ders sayısı değişmez, yalnızca konu başlıkları değişir.
3. **1. ünite ile örtüşme.** Önerme, niceleyici ve bağlaçlar 1. ünitede (MAT.9.1.4, D1–D3, "ancak ve ancak" dahil) işleniyor; bu programın temel kabulü de bunları "bildiği" sayıyor. F1–F3 ve G anlamları yeniden öğretmiyor, yalnızca algoritmadaki ve ispattaki rolünü işliyor. Ayrıca G2'nin cebirsel ispatı 1. ünitedeki C5 ("İspat mı, karşı örnek mi?") ve D7–D8 ile komşu; G2'nin açılışında C5'e geri bağlantı verilsin mi?
4. **Temel kabul ile A2–A4 sınırı.** Program, "aritmetik ve cebirsel işlemler içeren bir problem durumunun aşamalarını algoritmik olarak ifade edebildiği"ni ön bilgi sayıyor; MAT.9.5.1 c) ise aynı dönüştürmeyi çıktı olarak istiyor. A2–A4 bu yüzden kısmen tekrar niteliğinde; yeni olan problem türleri (doğrusal fonksiyonun sıfırı, vücut kitle indeksi) ve temsil seçimi. Bu sınır ders yazılırken netleşmeli.
5. **"Bölme algoritması" iki anlama gelebilir:** bölünen = bölen · bölüm + kalan eşitliği ya da uzun bölme işlemi. B1 birinci anlamı (ve ön değerlendirmedeki "bölme algoritması"nı) esas aldı.
6. **"Bilinen bölünebilme kuralları" hangileri?** Program saymıyor. B5 öğrencinin bildiği kurallardan (örneğin 2, 3, 5, 9, 10) birkaçını almayı öneriyor; hangileri sizin kararınız.
7. **E2 ile zenginleştirme sınırı.** Zorunlu metin "şifrelenmiş bir metnin hangi kural kullanılarak şifrelendiğini saptayabilmek" için algoritma oluşturulmasını istiyor; zenginleştirme "şifreleme algoritmasının tespitine ve metnin ortaya çıkarılmasına yönelik çalışmalar"ı sayıyor. E2 yalnızca basit, tek kurallı bir şifreyle sınırlı tutuldu. Program, şifrenin türünü belirtmiyor; C1 ve E2'deki şifre kuralının (örneğin sayısal değere sabit bir sayı eklemek) seçimi onayınıza bağlı.
8. **İkili sistem (C2, C3).** Temel kabullerde yok; program "dönüştürülmesi"ni ve destekleme bölümünde "çözümlemeyi" anıyor. C2 sayıyı ikiliye çevirmeyi ve ikiliden geri dönmeyi sıfırdan öğretiyor. Geri dönüşün (çözme) kapsama girip girmediği program metninden kesin okunmuyor.
9. **Königsberg sonucu (D1).** Programdaki "fikir üretmeleri beklenebilir" ifadesi sonucu söylemeyi gerektirmiyor; sonucu veren kural ise teorem. D1 problemi çizgeye çevirip öğrencinin denemesiyle bitiyor. "Çözülemez" bilgisini nedensiz söylemeyi isteyip istemediğiniz açık.
10. **En kısa yol ve çöp arabası (D2, E3).** Programın zorunlu metni yalnızca çizge tasarlamayı ve "elde edilen sonuçları tartışmayı" istiyor; en kısa yolu ya da turu bulan algoritmalar zenginleştirmede. D2 ve E3 küçük çizgelerde gözle bulunan yollarla sınırlandı; çizgilerin üstüne uzaklık yazmak "ağırlıklı çizge" adlandırması olmadan yapılacak.
11. **Tokalaşma sayısı (E1).** Program, toplam sayıyı bulmak için algoritma istiyor; genel formül (n kişi için) ve çizgede kenar ile köşe sayısı ilişkisi zenginleştirme (çizge kuramı genellemeleri). E1 belirli kişi sayılarında algoritmayı uyguluyor; E6'daki "çıkarım" örüntü sezgisinde kalacak, genel formülü ders olarak vermeyecek. Genel formül istenir mi?
12. **Programda olmayan ama örnek için gerekli olanlar.** Vücut kitle indeksinin formülü (A4), tek sayının cebirsel gösterimi (G2) ve harf-sayı eşleştirmesi (C1) program metninde yok; örnek problemlerin kendisi bunları gerektiriyor. Yalnızca bu örneklerde, tek satırla verilir.
13. **Ders içeriği olmayan etkinlikler.** Araştırma ödevleri, performans görevi, çalışma kâğıdı ve köprü kurma tartışmaları (bölüm 5) sitede ayrı bir bölüm olarak istenir mi, yoksa öğretmene bırakılır mı?
14. **Kayıt.** `plan/matematik/UNITELER.md` bu ünitenin ders saatini "ünite dosyasında" diye bırakıyor; sayfadaki değer 30 ve sıra 5 (UNITELER.md ile uyumlu). O dosyaya dokunulmadı.
