# Plan — 9. Sınıf · 3. Tema: Geometrik Şekiller

Dayanak: `MUFREDAT.md` (MEB sayfasından 7 Ekim 2026'da alındı). Adlandırma ve kural: `../TEMALAR.md`. Kısa ders biçimi: `../sayilar/PLAN.md` (bir fikir, 3–5 sahne, 4–6 dakika, sonunda 2 çıkış sorusu).

Tema 7 Ekim 2026'da işleme alındı (`../../ISLEME.md`). Açık sorular kapatıldı; kararlar bölüm 7'de. Senaryolar `senaryolar/`, ilerleme `DURUM.md` dosyasındadır.

8 Ekim 2026'da tema genişletildi: 9 → 12 kısa ders, 37 → 57 sahne. Gerekçe `ANALIZ.md`; kullanıcı aynı gün onayladı. İkinci dayanak olarak MEB ders kitabı kullanıldı (bölüm 8); 2, 4 ve 5 numaralı kararlar değişti (bölüm 7, karar 10–14).

## 1. Kapsam özeti

Tema 12 ders saati. Tek öğrenme çıktısı var: **MAT.9.3.1**, iki süreç bileşeniyle. Program yalnızca üçgenle ilgilenir; amaç, üçgendeki açı ve kenar özelliklerini **doğrulama ve ispatla** göstermektir. Konu çok değil; ağırlık "bir şeyin neden her zaman doğru olduğunu göstermek"tedir.

| Öğrenme çıktısı | Konu | Kısa dersler |
|---|---|---|
| MAT.9.3.1 a) iç ve dış açıların toplamı | A · Açılar ve ispat | A1–A5 |
| MAT.9.3.1 a) açılara karşılık gelen kenarlar; kenar uzunlukları arasındaki ilişki | B · Kenarlar ve açılar | B1–B4 |
| MAT.9.3.1 b) yeni durumlara uyarlayarak değerlendirme (+ problemlerde kullanma) | C · Doğrulamayı sınamak ve kullanmak | C1–C3 |

Toplam 3 konu, 12 kısa ders, 57 sahne. 7 Ekim'de 9 dersti (37 sahne); 8 Ekim'de B2, B4 ve C2 eklendi, A2–A5, B1 ve C3'e sahne eklendi. 12 ders saatine 12 ders düşüyor (saat başına 1,00): `ISLEME.md` kural 5'teki 0,85 sınırı kullanıcı onayıyla aşıldı (bölüm 7, karar 14).

## 2. Konular

Kural "her öğrenme çıktısı bir konu"dur. Burada tek çıktı var, tek konu yapmak 10 dersi düz bir listeye dizerdi. Üç konuya **şu gerekçeyle** ayırdım: çıktının a) bendi iki ayrı iddia ailesi sayıyor (açılara dair; kenar ve açı–kenar ilişkisine dair), içerik çerçevesi de bunları ayrı maddelerle veriyor; b) bendi ise bu iddialarla değil, onlara nasıl davranıldığıyla (uyarlama, değerlendirme, kullanma) ilgili. Ayırmak istemezseniz A, B, C birleştirilir; ders listesi ve denetim tablosu değişmez.

**A · Açılar ve ispat** (a bendi, açı kısmı). İspata neden ihtiyaç duyulduğu, ispatın neye dayandığı (geometrinin tarihî gelişimi ve programın andığı isimlerle birlikte), iç açıların toplamı (180°), dış açıların toplamı (360°) ve dış açı ile komşu olmayan iç açılar ilişkisi. Programın bu çıktıyı bağladığı "ispat ihtiyacı" ve "köprü kurma" bölümü burada karşılanır.

**B · Kenarlar ve açılar** (a bendi, kenar kısmı). En uzun kenar–en büyük açı ilişkisi; kenarların ve açıların tam sıralaması, eşit kenar–eşit açı; üçgen eşitsizliği, üçgen oluşturabilme koşulu ve üçüncü kenarın aralığı. Program burada **doğrulama** istiyor; dersler doğrulama düzeyindedir (bölüm 7, karar 3).

**C · Doğrulamayı sınamak ve kullanmak** (b bendi). Yapılan doğrulama ve ispatı yeni durumlara (başka türde üçgenlere ve üçgen olmayan yeni şekillere) uyarlayıp değerlendirmek, önermeleri az adımlı ve çok adımlı geometrik ve gerçek yaşam problemlerinde kullanmak.

Ders sırası: A1 → A2 → A3 → A4 → A5 → B1 → B2 → B3 → B4 → C1 → C2 → C3. A5, A3'ün ispatını kullanır; B2, B1'i genişletir; B4, B1'in menteşesini ve B3'ün eşitsizliğini birleştirir; C1, A ve B'den örnekler alır; C2, A5'in ve B3'ün önermelerini yeni şekillere uyarlar.

## 3. Kısa dersler

### Konu A · Açılar ve ispat

#### A1 · Ölçmek ispat değildir

- **Tek fikir:** Birkaç üçgende ölçüp 180° bulmak, bu toplamın bütün üçgenler için doğru olduğunu göstermez; bunun için ispat gerekir.
- **Anlatılacaklar:**
  1. Ortaokuldan bilinen "iç açıların toplamı 180°" bilgisinin bütün üçgenler için doğru olup olmadığı düşünülür.
  2. Bu genelleme ispata muhtaçtır.
  3. Tek bir üçgen çizimiyle yetinilmez; farklı türde üçgenler denenir (dik, geniş açılı, ikizkenar gibi).
  4. Genellemenin tüm durumlarda geçerli olduğunu göstermek için ispat gerekir.
- **Program dayanağı:** MAT.9.3.1. "…iç açıların ölçüleri toplamının 180° olduğuna dair bilgilerinin düzlemde verilen bütün üçgenler için doğru olup olmadığını düşünmeleri beklenir… genellemenin ispata muhtaç olduğunun anlaşılması gerekmektedir." Köprü kurma: "…tüm durumlarda geçerli olduğunu gösterebilmek için öğrencilerin ispata ihtiyaç duyulduğunun farkında olmaları sağlanır." Ön değerlendirme: "…prototip bir üçgen çizimi yerine farklı türde üçgenlerden de yararlanıp yararlanmadıkları…"
- **Açılış sorusu:** Bir mimar çatı kirişini üç maket üçgende ölçüp hepsinde 180° bulduysa, çizeceği bütün üçgenler için emin olabilir mi?
- **Akılda kalıcı cümle:** Ölçmek örnek verir, ispat hepsini kapsar.

#### A2 · İspat doğru bilgilerin üstüne kurulur

- **Tek fikir:** Geometri, zamanla ispatlanmış ve kabul edilmiş temel bilgilerin üstüne kurulan bir yapı oldu; her ispat bu yapıya dayanır.
- **Anlatılacaklar:**
  1. Geometrinin tarihî süreçte ortaya çıkışı: Babil ve eski Mısır'da arazi ölçümü, belli işler için kurallar; Yunan filozofları (Tales, Pisagor Okulu, Platon'un akademisi); Öklid ve 13 ciltlik *Elemanlar* (ders kitabı s. 183; yıl verilmez).
  2. Geometrinin zamanla kuramsal ve aksiyomatik bir yapı kazanması.
  3. Öklid geometrisinin aksiyomatik yapısı, ilişkilerin ispatlanmasının temelidir.
  4. İspat için doğruluğundan emin olunan ön bilgiler gerekir (iç açıların toplamının ispatı hangi bilgilere dayanır sorusu açılır, A3'te cevaplanır).
  5. Türk kültür ve medeniyetinde geometrinin tarihî gelişimine katkı sağlamış bilim insanları: Ebülvefa Buzcani, Kuşyar bin Lebban, Kadızade-i Rumi, Nasirüddin Tusi. Yalnızca adlarıyla anılır: çalışmaları programda da ders kitabında da yok (bölüm 7, karar 10).
  6. Atatürk tarafından 1936–1937 arasında hazırlanan *Geometri* kitabı: Arapça ve Farsça kökenli terimlerin yerine Türkçe terimler; kitaptaki örneklerden dördü eski–yeni eşleştirmesiyle (eşkenar üçgen, ters açı, dik üçgen, iç ters açılar; ders kitabı s. 192).
- **Program dayanağı:** İçerik çerçevesi: "Öklid geometrisinin aksiyomatik yapısı, geometrideki bağıntıların ve ilişkilerin ispatlanmasının temelini oluşturur." MAT.9.3.1: "Geometrinin tarihî süreçte ortaya çıkışı, zamanla kuramsal ve aksiyomatik bir yapı kazanması; öğrencilerin seviyelerine uygun soru, kavram ve açıklamalarla tartışılır." Köprü kurma: "…ispat için doğruluğundan emin olunan ön bilgilerin önemine vurgu yapılabilir." MAT.9.3.1: "Türk kültür ve medeniyetinde geometrinin tarihî gelişim sürecine katkı sağlamış bilim insanlarından (Ebülvefa Buzcani, Kuşyar bin Lebban, Kadızade-i Rumi, Nasirüddin Tusi) ve yaptıkları çalışmalardan bu çıktıya yönelik olanlar tanıtılır ya da öğrencilerden araştırma yapmaları istenir… Mustafa Kemal Atatürk tarafından 1936-1937 yılları arasında hazırlanmış, bazı geometri terimlerinin bugün kullanılan karşılıklarına yer veren Geometri isimli kitaptan bahsedilerek…"
- **Açılış sorusu:** Bir mimar "bu çizim doğru" derken hangi bilgilere güvenir?
- **Akılda kalıcı cümle:** İspat, doğru bilgilerin üstüne taş taş kurulur.

#### A3 · İç açıların toplamı 180°dir

- **Tek fikir:** Üçgenin iç açıları toplamı, paralel doğru ve kesişen doğrularda oluşan açılarla ilgili bilinenlerden yola çıkarak bütün üçgenler için 180° bulunur.
- **Anlatılacaklar:**
  1. İspatın dayanağı: bir doğruya dışındaki bir noktadan yalnızca bir paralel doğru çizilebilir.
  2. Kesişen doğrularda ve paralel doğruların bir kesenle yaptığı açılar (ön bilgi; tek cümlelik hatırlatma).
  3. İspat adımları ve her adımın gerekçesi; bırakılan boşlukların doldurulması.
  4. Sonuç, çizilen tek üçgen için değil, bütün üçgenler için geçerlidir.
  5. Önerme az adımlı sorularda kullanılır: x'li açılar; ispatın şekli (paralel doğru) bir araç olarak (ders kitabı s. 175–176, 179).
- **Program dayanağı:** MAT.9.3.1: "…düzlemde kesişen doğrular ve oluşturdukları açılarla ilgili bilgilerini kullanarak ispat yapmayı denemeleri sağlanır. Öğrencilerden bu ispat için düzlemde bir doğruya dışındaki bir noktadan yalnızca bir paralel doğru çizilebileceğini düşünmeleri beklenir." "Öğrencilere önermenin farklı ispatlarının ispat adımları ve gerekçelerinin yer aldığı çalışma kâğıtları verilerek öğrencilerden bırakılan boşlukları doldurmaları istenebilir."
- **Açılış sorusu:** Bir ressam üç köşeli bir kompozisyon çizerken, üç köşedeki açıların toplamını çizmeden bilebilir mi?
- **Akılda kalıcı cümle:** Üç açı yan yana gelince düz çizgi olur: 180°.

#### A4 · Dış açıların toplamı 360°dir

- **Tek fikir:** Üçgenin dış açılarının toplamı 360°dir; bu önerme farklı yollarla doğrulanır ve ispatlanır, yollar karşılaştırılır.
- **Anlatılacaklar:**
  1. Dış açıların ölçüleri toplamının ne olabileceği üzerine çıkarım yapılır (tahmin).
  2. Toplamın 360° olduğu önermesi.
  3. Önermenin farklı doğrulama ve ispatları yan yana konur, karşılaştırılır.
  4. Farklı yollar arasından uygun olan seçilir ve gerekçesi söylenir.
  5. Önerme az adımlı sorularda kullanılır; bir köşedeki iki dış açının eşit olduğu (ters açılar) ve toplamda birinin sayıldığı gösterilir (ders kitabı s. 177–178).
- **Program dayanağı:** MAT.9.3.1: "Öğrencilerden düzlemde verilen bir üçgenin dış açılarının ölçülerinin toplamının ne olabileceği ile ilgili çıkarımda bulunmaları da istenir. Bu toplamın 360° olduğuna dair önermenin ispatına yönelik farklı doğrulama ve ispatlar üzerine sınıf içi tartışma yapılır… Öğrencilerin verilen önermeye ilişkin yaptıkları farklı ispatları karşılaştırmaları sağlanır."
- **Açılış sorusu:** Üçgen biçimli bir parkın çevresini dolaşıp başladığın yöne dönersen, toplam kaç derece dönmüş olursun?
- **Akılda kalıcı cümle:** Dış açılar bir tam turdur: 360°.

#### A5 · Dış açı, uzaktaki iki iç açının toplamıdır

- **Tek fikir:** Bir dış açının ölçüsü, kendisine komşu olmayan iki iç açının ölçüleri toplamına eşittir; bu, önceki ispattan çıkar.
- **Anlatılacaklar:**
  1. Önermenin söylediği: dış açı ile komşu olmayan iki iç açı arasındaki eşitlik.
  2. İspat, iç açıların toplamının ispatından yararlanılarak kurulur.
  3. İspat adımları ve gerekçeleri (boşluk doldurma).
  4. Aynı önermenin ikinci ispatı: paralel doğru, iç ters ve yöndeş açılarla (ders kitabı s. 184 kontrol noktası: "paralel iki doğrunun bir kesenle yaptığı açılar kullanılarak veya üçgenin iç açılarının ölçüleri toplamından yararlanılarak ispatlanabilir"). İki ispat karşılaştırılır.
- **Program dayanağı:** a) "…farklı doğrulama veya ispatları kullanır." MAT.9.3.1: "Bu ispatlardan yararlanılarak öğrencilerden düzlemde verilen bir üçgende bir dış açının ölçüsünün kendisine komşu olmayan iki iç açının ölçüleri toplamına eşit olduğuna dair önermeyi de ispatlamaları istenir."
- **Açılış sorusu:** Çelik bir köprü kirişinin üçgen kafesinde dışarı bakan bir açıyı ölçersen, içerideki hangi açılarla ilgilidir?
- **Akılda kalıcı cümle:** Dış açı, uzaktaki iki iç açının toplamıdır.

### Konu B · Kenarlar ve açılar

#### B1 · En uzun kenarın karşısı en büyük açıdır

- **Tek fikir:** Üçgende her açının karşısında bir kenar vardır; en uzun kenarın karşısındaki açı en büyüktür.
- **Anlatılacaklar:**
  1. Önerme: "Üçgende en uzun kenarın karşısındaki açının ölçüsü en büyüktür."
  2. Açılara karşılık gelen kenarlar: her açının karşısındaki kenar. Tam sıralama, karşıt yön ve eşit açı–eşit kenar ilişkisi B2'dedir (bölüm 7, karar 11).
  3. Önermenin farklı türde üçgenlerde, araç ya da teknoloji kullanılarak doğrulanması.
  4. Açı büyüdükçe karşı kenar uzar; ama aynı oranda değil (açı iki katına çıkınca kenar iki katına çıkmaz).
- **Program dayanağı:** İçerik çerçevesi: "Üçgende en uzun kenarın karşısındaki açının ölçüsü en büyüktür." MAT.9.3.1: "…üçgende açı ve kenar ilişkilerini ifade eden önermeler ('Üçgende en uzun kenarın karşısındaki açının ölçüsü en büyüktür.' gibi)… doğrulamaları beklenmektedir." "Öğrenciler, doğrulama yaparken matematiksel araç gereç ya da teknoloji kullanmaları hususunda teşvik edilir." a) "…açılara karşılık gelen kenarlarla ilgili özelliklere…"
- **Açılış sorusu:** Bir çatı kirişinin en uzun çubuğunun karşısındaki köşe, sence en dar mı en geniş mi?
- **Akılda kalıcı cümle:** En uzun kenarın karşısı en geniş açıdır.

#### B2 · Açıları sırala, kenarları sırala

- **Tek fikir:** Bir üçgende kenarların büyüklük sırası, karşılarındaki açıların sırasıyla aynıdır; eşit kenarların karşısındaki açılar eşittir.
- **Anlatılacaklar:**
  1. Kenarlar karşı köşenin küçük harfiyle adlandırılır: a, b, c.
  2. En kısa kenarın karşısında en küçük açı bulunur; a > b > c ise m(A) > m(B) > m(C) (ders kitabı s. 184, 4. Uygulama a–b; s. 190 kontrol noktası).
  3. Tersi de doğrudur: açıların sırası biliniyorsa kenarların sırası da bilinir (ders kitabı s. 184, s. 190).
  4. Eşit açıların karşısında eşit kenarlar bulunur: ikizkenar üçgende taban açıları eşittir, eşkenar üçgende her açı 60°dir (ders kitabı s. 184, 4. Uygulama c; s. 181, s. 182 kenar notları).
  5. Sıralama soruları: kenardan açıya, açıdan kenara (önce üçüncü açı bulunur), ortak kenarlı iki üçgen (ders kitabı s. 185, örnek 8–9).
- **Program dayanağı:** a) "…açılara karşılık gelen kenarlarla ilgili özelliklere… dair farklı doğrulama veya ispatları kullanır." MAT.9.3.1: "…üçgende açı ve kenar ilişkilerini ifade eden önermeler ('Üçgende en uzun kenarın karşısındaki açının ölçüsü en büyüktür.' gibi)… doğrulamaları beklenmektedir." Program önermeleri çoğul ve "gibi" ile anıyor, öbürlerini saymıyor; içerik ders kitabından alındı (bölüm 7, karar 11).
- **Açılış sorusu:** Üçgen bir bahçenin yalnızca üç kenarını ölçtün. En dar köşeyi açıölçer kullanmadan söyleyebilir misin?
- **Akılda kalıcı cümle:** Kenarların sırası, karşılarındaki açıların sırasıdır.

#### B3 · Üçgen eşitsizliği: her üç uzunluk üçgen kurmaz

- **Tek fikir:** Üç uzunluğun bir üçgen kurup kurmayacağını, kenar uzunlukları arasındaki ilişki (üçgen eşitsizliği) belirler.
- **Anlatılacaklar:**
  1. Üçgenin kenarlarının uzunlukları arasındaki ilişki olan üçgen eşitsizliği doğrulanır.
  2. Bu ilişki, üçgen oluşturabilme koşullarını belirler.
  3. Farklı doğrulamalar arasından uygun olan seçilir.
- **Program dayanağı:** MAT.9.3.1: "…üçgenin kenarlarının uzunlukları arasındaki ilişkiyi ifade eden üçgen eşitsizliğini doğrulamaları beklenmektedir." İçerik çerçevesi: "Üçgenin temel özellikleri ve geometrik yapısının anlaşılması sayesinde üçgen oluşturabilme koşulları belirlenir." "Farklı doğrulamalar arasından uygun olanı kullanılır."
- **Açılış sorusu:** Bir mühendis 3 m, 4 m ve 8 m'lik üç çelik çubukla üçgen bir destek kurabilir mi?
- **Akılda kalıcı cümle:** Her kenar, öbür ikisinin toplamından kısadır.

#### B4 · Üçüncü kenar hangi aralıkta?

- **Tek fikir:** İki kenarı bilinen bir üçgende üçüncü kenar, öbür ikisinin farkından büyük, toplamından küçüktür.
- **Anlatılacaklar:**
  1. Menteşeli iki çubuk (7 ve 11): açı 180°'ye açılınca üçüncü kenar toplam (18), 0°'ye kapanınca fark (4) olur; iki uçta üçgen yoktur.
  2. Üçüncü kenar bu iki değerin arasındaki her değeri alır: açık aralık.
  3. Genel biçim, üçgen eşitsizliğinin üç kenar için yazılmasından çıkar: |b − c| < a < b + c (ders kitabı s. 187 örnek 10, s. 190 kontrol noktası).
  4. Aralıktaki tam sayı değerleri; ortak kenarlı iki üçgende aralıkların kesişimi (ders kitabı s. 187–188, örnek 10–11).
- **Program dayanağı:** MAT.9.3.1: "…üçgenin kenarlarının uzunlukları arasındaki ilişkiyi ifade eden üçgen eşitsizliğini doğrulamaları beklenmektedir." İçerik çerçevesi: "…üçgen oluşturabilme koşulları belirlenir." Program eşitsizliği adıyla anıyor, biçimini vermiyor; fark biçimi ders kitabından alındı (bölüm 7, karar 12).
- **Açılış sorusu:** Elinde 7 m ve 11 m'lik iki çubuk var. Üçgen kurmak için üçüncü çubuk en kısa ve en uzun ne kadar olabilir?
- **Akılda kalıcı cümle:** Üçüncü kenar, farktan büyük, toplamdan küçüktür.

### Konu C · Doğrulamayı sınamak ve kullanmak

#### C1 · Bu ispat her üçgende çalışır mı?

- **Tek fikir:** Bir doğrulama ya da ispat, farklı üçgenlere uyarlanarak ve adımları gerekçeleriyle okunarak değerlendirilir.
- **Anlatılacaklar:**
  1. Yapılan doğrulama ya da ispat yeni durumlara (farklı türde üçgenlere) uyarlanır.
  2. Önermeler ile bunların ispat veya doğrulamaları değerlendirilir.
  3. Farklı doğrulamalar arasından uygun olan seçilir.
- **Program dayanağı:** MAT.9.3.1 b) "Yapılan doğrulama veya ispatları yeni durumlara uyarlayarak değerlendirir." "Öğrencilerin önermeleri, kullandıkları ispat veya doğrulamaları değerlendirmeleri sağlanır." "Farklı doğrulamalar arasından uygun olanı kullanılır."
- **Açılış sorusu:** Arkadaşın dış açılar toplamını yalnızca dik üçgen çizerek "ispatladı"; bu ispat her üçgen için geçerli mi?
- **Akılda kalıcı cümle:** İspat, çizdiğin üçgene değil her üçgene uymalı.

#### C2 · Önermeyi yeni şekle uyarla

- **Tek fikir:** İspatlanmış ya da doğrulanmış bir önerme, yeni bir şeklin içinde üçgen bulunarak yeni bir sonuca uyarlanır; varılan sonucun ispat mı doğrulama mı olduğu değerlendirilir.
- **Anlatılacaklar:**
  1. İçbükey ABDC dörtgeninde içe dönük köşedeki açı öbür üç açının toplamıdır: x = a + b + c (ders kitabı s. 180, 3. Sıra Sizde).
  2. İspat: bir kenar uzatılır, dış açı önermesi iki üçgende iki kez kullanılır; adımlar ve gerekçeler doldurulur.
  3. Üçgenin içindeki bir D noktası için |DB| + |DC| < |AB| + |AC| (ders kitabı s. 189–190, 6. Uygulama); D gezdirilerek doğrulanır.
  4. Değerlendirme: ilki ispattır, ikincisi doğrulama.
- **Program dayanağı:** MAT.9.3.1 b) "Yapılan doğrulama veya ispatları yeni durumlara uyarlayarak değerlendirir." "Öğrenciler, doğrulama yaparken matematiksel araç gereç ya da teknoloji kullanmaları hususunda teşvik edilir." Hangi yeni durumların alınacağını program saymıyor; ikisi de ders kitabından (bölüm 7, karar 13).
- **Açılış sorusu:** Bumerang biçimli bir dörtgenin içe dönük köşesindeki açıyı, öbür üç köşedeki açılardan bulabilir misin?
- **Akılda kalıcı cümle:** Yeni şekilde tanıdık üçgeni ara.

#### C3 · Doğrulanmış önermeler iş görür

- **Tek fikir:** İç ve dış açı önermeleri, kenar–açı sıralaması ve üçgen eşitsizliği, geometrik ve gerçek yaşam problemlerini çözmekte kullanılır; çok adımlı problemde her adım bir önermedir.
- **Anlatılacaklar:**
  1. Ulaşılan önermeler geometrik problemlerde kullanılır.
  2. Görsel sanatlarda üçgen kullanımı bir problem bağlamıdır.
  3. Mimari ve mühendislikte yapıların üçgen formları bir problem bağlamıdır.
  4. Az adımlı problemlerden sonra çok adımlı problemler: açılan merdiven; ikizkenar iki üçgen (ders kitabı s. 180–181, örnek 4–5).
  5. Tema özeti: beş önerme tek üçgenin üstünde; hangileri ispatlandı, hangileri doğrulandı.
- **Program dayanağı:** MAT.9.3.1: "…ulaşılan önermeleri, önermelerin ispat ve doğrulamasını geometrik problemler ile gerçek yaşam problemleri (görsel sanatlarda üçgen kullanımı, mimari ve mühendislikte yapıların üçgen formları gibi) bağlamında kullanmaları beklenir." Destekleme: "…çok adımlı ve karmaşık problem durumlarının çözümlerine geçmeden önce öğrencilere az adımlı çözümler içeren problem durumları sunulabilir."
- **Açılış sorusu:** Bir mühendis, çelik kafesin hiç ölçmediği bir açısını nasıl bulur?
- **Akılda kalıcı cümle:** İspatlı bilgi, ölçmeden de sonuç verir.

## 4. Müfredat denetimi

Programın her isteği bir satır. Bu dosyadaki her kısa ders tabloda en az bir kez geçer. Durum sütunu `KURALLAR.md` 2.2'ye göredir: **ders** (doğrudan anlatılır), **benzetim** (öğrenci değişkeni seçer, tahmin eder, sonucu görür), **site dışı** (sınıfta yapılır).

| Programın istediği | Durum | Hangi kısa ders ve sahne |
|---|---|---|
| Tema amacı: açı ve kenarlarla ilgili özellikler ile açı–kenar ilişkileri için doğrulama ve ispat | ders | A3 S1–S5, A4 S2–S3, A5 S1–S3, B1 S2–S3, B2 S1–S3, B3 S1–S3, B4 S1–S3 |
| MAT.9.3.1 a) iç ve dış açıların ölçüleri toplamına dair farklı doğrulama veya ispatlar | ders | A3 S1 (doğrulama), S2–S4 (ispat) · A4 S2 (doğrulama), S3 (ispat) · A5 S1 (doğrulama), S2 ve S3 (iki ayrı ispat) |
| MAT.9.3.1 a) açılara karşılık gelen kenarlarla ilgili özellikler | benzetim | B1 S1–S3, B2 S1–S4 |
| MAT.9.3.1 a) kenarların uzunlukları arasındaki ilişkiler | benzetim | B3 S1–S3, B4 S1–S3 |
| MAT.9.3.1 b) doğrulama veya ispatları yeni durumlara uyarlayarak değerlendirme | ders | C1 S1–S4 (başka türde üçgen), C2 S1–S4 (yeni şekil) |
| İçerik çerçevesi: en uzun kenarın karşısındaki açı en büyüktür | benzetim | B1 S3, B2 S1–S2 |
| İçerik çerçevesi: Öklid geometrisinin aksiyomatik yapısı ispatın temelidir | ders | A2 S2, S4 |
| İçerik çerçevesi: üçgen oluşturabilme koşulları | benzetim | B3 S2–S4, B4 S1–S3 |
| Köprü kurma: genellemenin tüm durumlarda geçerli olduğunu göstermek için ispata ihtiyaç | ders | A1 S4, A3 S5 |
| Köprü kurma: iç açıların toplamının ispatı hangi bilgilere dayanır; doğruluğundan emin olunan ön bilgilerin önemi | ders | A2 S1, A3 S2–S4 |
| İç açıların toplamının bütün üçgenler için doğru olup olmadığını düşünme; genellemenin ispata muhtaç olması | ders | A1 S1–S4 |
| Ön değerlendirme: prototip üçgen yerine farklı türde üçgenler | ders | A1 S2, B1 S3, C1 S2–S3 |
| Ön değerlendirme: paralel iki doğrunun bir kesenle yaptığı açılar | ders (hatırlatma) | A3 S3 başı |
| İspat için dışındaki bir noktadan yalnızca bir paralel doğru çizilebilmesi; kesişen doğrularda oluşan açılar | ders | A3 S2 (tek paralel), S3 (iç ters açılar) |
| Dış açıların toplamının ne olabileceğine dair çıkarım; toplamın 360° olduğu önermesi | ders | A4 S1 (tahmin), S2–S3 |
| 360° önermesi için farklı doğrulama ve ispatlar; karşılaştırma; uygun ispatın seçilmesi | ders | A4 S2, S3, S4 |
| İspat adımları ve gerekçeleri; bırakılan boşlukların doldurulması | ders | A3 S3–S4, A4 S3, A5 S2–S3, C2 S2 |
| Bir dış açının, komşu olmayan iki iç açının toplamına eşit olduğunun ispatı (önceki ispatlardan yararlanarak) | ders | A5 S1–S4 |
| Açı ve kenar ilişkisi önermelerinin doğrulanması; "en uzun kenar" örneği | benzetim | B1 S2–S4, B2 S1–S3 |
| Üçgen eşitsizliğinin doğrulanması | benzetim | B3 S1–S4, B4 S1–S2 |
| Doğrulamada matematiksel araç ve teknoloji kullanımı (MAB5) | benzetim | B1 S2, S4 · B2 S2 · B3 S1–S2 · B4 S1–S2 · C2 S3–S4 |
| Farklı doğrulamalar arasından uygun olanı kullanma | ders | A4 S4, B3 S3, C1 S4 |
| Önermeleri, ispat ve doğrulamaları değerlendirme | ders | C1 S1–S4, C2 S4, C3 S6 |
| Önermeleri geometrik problemlerde kullanma (MAB2) | ders | A3 S6, A4 S5, A5 S5, B2 S4–S5, B4 S4–S5, C2 S3, C3 S1–S5 |
| Gerçek yaşam bağlamları: görsel sanatlarda üçgen, mimari ve mühendislikte yapıların üçgen formları | ders | C3 S1 (mühendislik), S2 (mimari), S3 (görsel sanat), S4 (merdiven) · açılış sorularında A1, A3, A5, B1, B3, B4 |
| Destekleme: çok adımlı problemlerden önce az adımlı problemler | ders | C3 S1–S3 (az adımlı), S4 (çok adımlı) |
| Geometrinin tarihî süreçte ortaya çıkışı ve zamanla kuramsal, aksiyomatik yapı kazanması | ders | A2 S3–S4 |
| Türk bilim insanları (Buzcani, Kuşyar bin Lebban, Kadızade-i Rumi, Tusi) | ders (yalnızca adlarıyla; karar 10) | A2 S5 |
| Atatürk'ün 1936–1937 *Geometri* kitabı ve geometri terimlerinin bugünkü karşılıkları | ders | A2 S5 |
| Anahtar kavramlar: açı, iç açı, dış açı | ders | A3 S1–S4, A4 S1, A5 S1 |
| Anahtar kavramlar: kenar, üçgen | ders | A1 S1–S3, B1 S1, B2 S1 |
| Anahtar kavram: üçgen eşitsizliği | ders | B3 S3, B4 S3 |
| Temel kabuller (nokta, doğru, açı çeşitleri, kesişen ve paralel doğrularda açılar, üçgenin elemanları) | ön bilgi | Ayrı ders yok; A3 S3 başında üç açı çifti, B2 S3'te ikizkenar ve eşkenar adı hatırlatılır |
| Performans görevi: önermelerin kullanılabileceği problem durumları bulma ve çözme; çevrim içi sunum | site dışı (sınıfta yapılır) | Dayandığı bilgi: C3 S5 (verilene göre önerme seçme) |
| Sınıf içi tartışma, grup çalışması, araştırma, açık uçlu soru geri bildirimi; dijital içerik tasarlama (OB2) | site dışı (sınıfta yapılır) | Derslerde yok (bölüm 5) |

Sahne sayıları: A1 4 · A2 5 · A3 6 · A4 5 · A5 5 · B1 4 · B2 5 · B3 4 · B4 5 · C1 4 · C2 4 · C3 6 (toplam 57). Her sahnenin tabloda en az bir satırı vardır.

## 5. Bilerek alınmayanlar

**Ön bilgi sayılanlar (ayrı ders yok):**

- Nokta, doğru, doğru parçası, ışın ve açıyı oluşturma; açı çeşitleri.
- Düzlemde iki doğrunun kesişimiyle oluşan açılar (ters açılar, komşu açılar) ve paralel iki doğrunun bir kesenle yaptığı açılar. Ayrı ders yok; A3 sahne 3'ün başında, sorudan önce üç açı çifti (yöndeş, iç ters, ters) hatırlatılır (`KURALLAR.md` 3.1).
- Üçgenin temel elemanları (kenar, açı) ve üçgenle ilgili temel muhakeme.

**Zenginleştirme (derslere girmez):**

- Doğrulanan önerme ve teoremlerin ispatlarının nasıl olabileceğine dair araştırma ödevi.
- Üçgende iç açıların toplamının her durumda 180° olup olmadığı; Öklid dışı geometri. A1 ve A2'de bu yöne kayılmaz.

**Destekleme (zorunlu değil; ders içeriği değil):**

- Kâğıt katlama ya da kesmeyle iç açı toplamını gösterme, farklı uzunluktaki üç çubukla üçgen kurma, sanal manipülatifler, az adımlı problemlerden başlama. Bunlar ders konusu değil; benzer bir aracın sahne tasarımında kullanılıp kullanılmayacağı senaryo aşamasında karara bağlanır.

**Programın sınıf içi etkinlikleri (siteye taşınmaz):**

- Sınıf içi tartışma, grup çalışması, fikir paylaşımı; çalışma kâğıdıyla boşluk doldurma (A3 ve A5'te etkileşimli boşluk doldurma olarak yaşar, kâğıt olarak değil).
- Performans görevi, çevrim içi sunum, analitik dereceli puanlama anahtarı; ön değerlendirme soruları; açık uçlu soru ve öğretmen dönütü; Türk bilim insanları için öğrenci araştırması seçeneği (A2'de tanıtım yolu seçildi).

**Bu konularda geleneksel olarak anlatılan ama programda olmayan başlıklar** (kullanıcı isterse eklesin):

1. Üçgen çeşitlerinin ayrı konu olarak işlenmesi. (İkizkenarda taban açılarının, eşkenarda üç açının eşitliği "eşit kenar–eşit açı" önermesi olarak B2'ye girdi: karar 11.)
2. Pisagor bağıntısı ve dik üçgendeki bağıntılar.
3. Açıortay, kenarortay, yükseklik ve bunların özellikleri; üçgenin merkezleri.
4. Üçgenin çevresi ve alanı.
5. Eşlik ve benzerlik (MEB'de ayrı, 4. tema).
6. Trigonometrik oranlar, sinüs ve kosinüs teoremleri.
7. Çokgenlerin iç ve dış açıları toplamı (dörtgen, beşgen, n-gen).
8. (8 Ekim 2026'da alındı: B4, karar 12.) Alınmayan: iç noktanın köşelere uzaklıkları toplamı ile çevre arasındaki ilişki (ders kitabı s. 190, 9. Sıra Sizde).
9. Dış açıortayların ve iç açıortayların oluşturduğu açılar; açıortay, kenarortay ve yükseklik isteyen problemler. (Çok adımlı açı problemleri 8 Ekim 2026'da alındı: A3 S6, A4 S5, C2, C3 S4; ders kitabında açıortay geçen tek soru, s. 181 4. Sıra Sizde, alınmadı.)
10. Aksiyom, teorem, tanım ayrımının ayrıntılı işlenmesi; dolaylı ispat gibi başka ispat yöntemleri.
11. (8 Ekim 2026'da alındı: B2, karar 11.) Alınmayan: köklü kenar uzunluklarıyla sıralama (ders kitabı s. 185, örnek 8; işlem yükü 1. temanın konusu).

## 6. Açık sorular

Hepsi 7 Ekim 2026'da kapatıldı; kararlar bölüm 7'de. Sorular, kararın neye verildiği görülsün diye olduğu gibi duruyor.

1. **Ders sayısı.** 12 ders saatine 10 kısa ders düştü (saat başına 0,83, 1. temada 0,74). Fazla görünüyorsa C2 (geometrik problem ve gerçek yaşam bağlamı tek derste) ya da C3 en kolay birleştirilir; ben ikisini de içerikten ötürü ayrı tuttum. Tersine, A4'ün iki ispat yolu tek derse sığmazsa A4 ikiye bölünür.
2. **C3 içeriği.** Program dört bilim insanının adını veriyor ama "bu çıktıya yönelik olanlar"ın hangi çalışmaları olduğunu söylemiyor; sayfada çalışmalardan söz edilmiyor. Hafızadan atıf yazmadım. Senaryodan önce bu dört isim için doğrulanmış, çıktıyla bağlantılı bir bilgi kaynağı gerekir. Programda tanıtım ile araştırma ödevi seçenek olarak durduğu için C3'ün "ders" olması da kararınıza bağlı: yalnızca kısa bir tanıtım sahnesi olarak A2'ye de katılabilir.
3. **B'de doğrulama mı, ispat mı.** Çıktı "doğrulayabilme veya ispatlayabilme" diyor; B konusundaki önermeler için program "doğrulamaları beklenmektedir" diyor, ispat istemiyor. B1 ve B2'yi doğrulama düzeyinde tuttum. Resmî ispat isterseniz ders uzar, program dışına çıkma riski doğar.
4. **Açı–kenar ilişkisinin kapsamı.** Programın yazılı örneği tek yönlü ("en uzun kenarın karşısındaki açı en büyük"). a) bendi "açılara karşılık gelen kenarlarla ilgili özellikler" diyor, ama hangileri olduğunu saymıyor. B1'de karşıt yönü ("en büyük açının karşısı en uzun kenar") bu ifadenin içinde kabul ettim; eşit açı–eşit kenar (ikizkenar) ilişkisini almadım. Karar sizde.
5. **Üçgen eşitsizliğinin biçimi.** Program yalnızca "üçgen eşitsizliği" ve "üçgen oluşturabilme koşulları" diyor, ifadesini vermiyor. B2'de "bir kenar öbür ikisinin toplamından uzun olamaz" biçimini ve oluşturabilme testini aldım; |b − c| < a < b + c biçimini ve "üçüncü kenar hangi değerleri alır" sorularını almadım. Eklemek isterseniz B2'ye üçüncü bir sahne ya da B3 gerekir.
6. **İspat yolları.** Program hangi ispatın yapılacağını belirtmiyor (yalnızca paralel doğrudan söz ediyor). A3, paralel doğru yolunu izliyor; A4'ün "farklı doğrulama ve ispatları" için hangi iki yolun karşılaştırılacağı senaryoda seçilecek.
7. **Öklid dışı geometriyle sınır.** Zenginleştirme Öklid dışı geometriyi anıyor, A2 ise "aksiyomatik yapı"yı anlatıyor. A2'nin Öklid dışı geometriye sızmaması için senaryoda dikkat edilmeli; programın kendisi "Öklid geometrisi"nden söz ediyor, "paralel postülatı" terimini anmıyor.
8. **Sayfadaki "Kavramsal Beceriler".** Sayfada "-" yazıyor; kaynakta eksik olabilir. Planı etkilemiyor.
9. **Saat dağılımı.** Program ders saatini temaya veriyor (12), konulara ya da çıktıya bölmüyor; dağılım bizim kararımız.

## 7. Kararlar

7 Ekim 2026. Dayanak `../../ISLEME.md` bölüm 3'teki kurallar (K1–K7). Beğenilmeyen karar sonradan değiştirilir.

| # | Soru | Karar | Kural |
|---|---|---|---|
| 1 | Ders sayısı | Birleştirme zorunlu değil: 10 ders 12 saatte 0,83, sınır 0,85. Karar 2 ile ders sayısı 9'a indi (0,75). A4 bölünmedi: iki yol 4 sahneye sığıyor. | K5 |
| 2 | C3 içeriği | Program dört bilim insanının yalnızca adını, *Geometri* kitabının yalnızca hazırlayanını, yıllarını ve "bazı geometri terimlerinin bugün kullanılan karşılıklarına yer verdiğini" yazıyor. Yalnızca bunlar anılır; çalışmalar ve terim örnekleri hafızadan eklenmez. Kalan içerik 3 sahneyi doldurmadığı için C3 ayrı ders olmaz, A2'ye son sahne olarak katılır (en yakın ders: geometrinin tarihî gelişimi). | K4, K6 |
| 3 | B'de doğrulama mı, ispat mı | Doğrulama. Program B'deki önermeler için "doğrulamaları beklenmektedir" diyor. | K1 |
| 4 | Açı–kenar ilişkisinin kapsamı | Yalnızca programın yazdığı önerme: "En uzun kenarın karşısındaki açının ölçüsü en büyüktür." Karşıt yön ve eşit açı–eşit kenar ilişkisi kural olarak yazılmaz. "Açılara karşılık gelen kenar" her açının karşısındaki kenar olarak tanıtılır. | K1, K2 |
| 5 | Üçgen eşitsizliğinin biçimi | "Her kenar, öbür ikisinin toplamından kısadır" ve üçgen oluşturabilme testi. Eşitlik durumu (uçlar düz çizgide buluşur, üçgen olmaz) koşulun parçası olarak gösterilir. \|b − c\| < a < b + c biçimi ve "üçüncü kenar hangi değerleri alır" soruları alınmaz. Akılda kalıcı cümle buna göre düzeltildi ("uzun olamaz" eşitliği dışlamıyordu). | K2, K7 |
| 6 | İspat yolları | A3: programın andığı paralel doğru yolu. A4: iki yol karşılaştırılır. Yol 1 dolaşma (her köşede dış açı kadar dönülür, sonunda tam tur; doğrulama). Yol 2 hesap (her köşede iç + dış = 180°, üç köşe 540°, iç açılar 180°; ispat). A5: doğru açı ve iç açılar toplamından. | K7 |
| 7 | Öklid dışı geometriyle sınır | A1 ve A2 Öklid dışı geometriye girmez; "paralel postülatı" terimi kullanılmaz. "Aksiyom" tek cümleyle tanıtılır (ispatsız kabul edilen temel bilgi); aksiyom, teorem, tanım ayrımı işlenmez. | K2, K3 |
| 8 | Sayfadaki "Kavramsal Beceriler" boş | Planı etkilemiyor; işlem yok. | — |
| 9 | Saat dağılımı | Program saati temaya veriyor; konulara dağıtılmadı, dağıtım gerektiren bir karar yok. | K7 |

### 8 Ekim 2026: genişletme kararları

Dayanak `ANALIZ.md`; kullanıcı 8 Ekim 2026'da "onaylıyorum, uygula" dedi. 1, 2, 4 ve 5 numaralı kararların yerini aşağıdakiler alır; 3, 6, 7 yürürlüktedir.

| # | Konu | Karar | Dayanak |
|---|---|---|---|
| 10 | A2'de tarih ve *Geometri* kitabı (eski karar 2) | Ders kitabının yazdığı kadar anlatılır: Babil ve Mısır, Tales, Pisagor Okulu, Platon, Öklid ve *Elemanlar* (s. 183); *Geometri* kitabının Türkçe terimleri ve dört terim eşleşmesi (s. 192). Yıl, eser ve kişi hafızadan eklenmez. Dört Türk bilim insanı yalnızca adlarıyla anılır: çalışmaları programda da kitapta da yok. Sabit bin Kurra alınmadı (kitap onu paralel postülatıyla anıyor; karar 7). | `KURALLAR.md` 2.1, 2.3; `ISLEME.md` kural 4'e kullanıcı onayıyla istisna |
| 11 | Açı–kenar ilişkisinin kapsamı (eski karar 4) | Ders kitabındaki üç genelleme ve tersi alınır: en uzun kenar ↔ en büyük açı, en kısa kenar ↔ en küçük açı, eşit açı ↔ eşit kenar; a > b > c ise m(A) > m(B) > m(C). B1 ilk önermeyi, yeni B2 geri kalanını işler. Hepsi doğrulama düzeyindedir. | Program "önermeler … gibi" diyor; içerik kitaptan (s. 184, 190). K1, K4 |
| 12 | Üçgen eşitsizliğinin biçimi (eski karar 5) | B3 toplam biçimini ve kurulur/kurulmaz testini işler (değişmedi). Yeni B4: \|b − c\| < a < b + c, üçüncü kenarın tam sayı değerleri, ortak kenarlı iki üçgen. | Program eşitsizliği anıyor, biçimini vermiyor; kitap s. 187–188, 190. K4 |
| 13 | b bendinin kapsamı | "Yeni durumlara uyarlama" iki anlamda alınır: başka türde üçgen (C1) ve üçgen olmayan yeni şekil (yeni C2: içbükey dörtgen, iç nokta). | b bendi; kitap s. 180, 189–190. K4 |
| 14 | Ders sayısı (eski karar 1) | 12 kısa ders (saat başına 1,00). 0,85 sınırı aşıldı; kullanıcı 12 dersi 10 derslik seçeneğe tercih etti (o seçenekte B1 ve C1 ikişer fikirli olurdu). | Kullanıcı kararı; `KURALLAR.md` 3 ("iki fikir varsa ayrılır") |

Senaryo yazılırken verilenler (8 Ekim): açı ölçüleri sıralamada köşe harfiyle yazılır (A > B > C); C2'de "içbükey dörtgen" adı kullanılmaz, "içe dönük köşe" denir; B4 sahne 4'teki ev bağlamı örnek veridir.

Bu kararların dışında, 7 Ekim'de senaryo yazılırken verilenler:

- **A2'de tarih.** (Karar 10 ile değişti.) 7 Ekim'de yalnızca programın iki cümlesi söyleniyordu; şimdi içerik ders kitabından gelir. Sahne 4 yine dağınık bilgilerin bir yapıya dizilmesini gösterir.
- **Açı adları.** Köşeler A, B, C; açı ölçüleri α, β, γ; kenarlar karşı köşenin küçük harfiyle a, b, c. Tema boyunca A köşesi mavi, B turuncu, C yeşil; dış açı sarıdır.
- **Destekleme araçları.** Program kâğıt kesmeyi ve üç çubukla üçgen kurmayı destekleme bölümünde anıyor. İkisi de sahne aracı olarak kullanıldı (A3 sahne 1, B2 sahne 1–2); ders konusu değil.
- **Hikâye.** `HIKAYE-ANIMASYONLARI.md` 7 Ekim'deki 10 derslik taslağa göre yazılmış; ders kodları 8 Ekim'de kaydı (eski B2 → B3, eski C2 → C3; oradaki "C3" artık başka bir ders). Hikâye videoları işleme almanın dışında olduğu için güncellenmedi.

## 8. Ders kitabından alınanlar

Kaynak: MEB, Matematik 9. Sınıf Ders Kitabı (1. Kitap), 3. Tema, s. 170–195; <https://tymm.meb.gov.tr/kitap/41/matematik-9sinif-ders-kitabi-1kitap> (8 Ekim 2026'da alındı). Kitap yazarın kaynağıdır; derslerde kitaba ya da sayfaya gönderme yoktur (`KURALLAR.md` 2.1).

| Bilgi | Sayfa | Kullanıldığı yer |
|---|---|---|
| Paralel iki doğru ve kesenin açı çiftleri: ters, iç ters, yöndeş | 173 (ön değerlendirme 4) | A3 S3 |
| x'li açı soruları; paralel yardımcı çizgiyle çözüm | 173 (soru 6), 175–176, 179 | A3 S6 |
| Dış açılar toplamının iç açılar toplamından ispatı; oranlı dış açı örneği | 177–178 (2. Uygulama, örnek 2) | A4 S3 (vardı), S5 |
| Dış açı teoreminin iki ispat yolu | 178 (3. Uygulama), 184 (kontrol noktası) | A5 S2, S3 |
| İçbükey dörtgende x = a + b + c ve ispat adımları | 180 (3. Sıra Sizde) | C2 S1–S3 |
| Merdiven; ikizkenar iki üçgen (çok adımlı örnekler) | 180–181 (örnek 4–5) | C3 S4 |
| "İkizkenar üçgenin taban açılarının ölçüleri birbirine eşittir"; "eşkenar üçgenin iç açıları eşit ve 60°dir" | 181, 182 (kenar notları) | B2 S3 |
| Geometrinin tarihçesi: Babil, Mısır, Tales, Pisagor Okulu, Platon, Öklid, *Elemanlar* (13 cilt) | 183 | A2 S3 |
| Açı–kenar genellemeleri (en büyük açı–en uzun kenar, en kısa kenar–en küçük açı, eşit açılar–eşit kenarlar) | 184 (4. Uygulama) | B2 S1–S3 |
| Sıralama örnekleri (kenardan açıya; ortak kenarlı iki üçgen) | 185 (örnek 8–9) | B2 S4–S5 |
| Çubuklarla üçgen kurma | 186–187 (5. Uygulama) | B3 (vardı) |
| Üçüncü kenarın tam sayı değerleri (7 ve 11); ortak kenarlı iki üçgen (6, 8, 8, 13) | 187–188 (örnek 10–11) | B4 S1–S5 |
| İç nokta önermesi: \|DB\| + \|DC\| < \|AB\| + \|AC\| | 189–190 (6. Uygulama) | C2 S4 |
| "Bu ifadenin tersi de doğrudur"; a > b > c ise m(A) > m(B) > m(C); \|b − c\| < a < b + c | 190 (kontrol noktası) | B2 S2, B4 S3 |
| *Geometri* kitabı: Arapça ve Farsça kökenli terimlerin yerine Türkçe terimler; terim örnekleri | 192 | A2 S5 |

Kitapta olup alınmayanlar: Sabit bin Kurra ve paralel postülatı (s. 183); kitabın bölüm ve sayfa sayısı (s. 192); açıortay sorusu (s. 181); köklü uzunlukla sıralama (s. 185); çevre önermesi (s. 190); Kutup Yıldızı, güneş paneli, kâğıt katlama, uçurtma, uçak rotası örnekleri (s. 175–182).
