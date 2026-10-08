# Ortak kurallar

Bütün dersler ve temalar için bağlayıcıdır. Sayılar teması yazılırken alınan kararlardan derlendi (`plan/matematik/sayilar/PLAN.md`); 7 Ekim 2026'da fen ve sosyal dersler eklenince genişletildi (içerik kaynağı, deney ve ürün isteyen çıktılar, formülsüz dersler, görseller, veri); aynı gün bölüm 3 değişti (kısa dersin uzunluğu, önce bilgi sonra soru); 8 Ekim 2026'da bölüm 1, 3, 4 ve 5 yeniden değişti (dersler kısa tutulmaz, doğrudan soruyla açılmaz; ayrıntılı anlatım, örnek, görselleştirme; hatırlatma soruları, yarısı çözülmüş örnek, konu tekrarı). Bir temaya özgü kararlar o temanın `PLAN.md` dosyasında durur.

Adlar bütün derslerde aynıdır: Ders → Tema → Konu → Kısa ders. MEB bazı derslerde (fizik, tarih, coğrafya) "ünite" der; sitede ve plan dosyalarında hepsi "tema"dır, MEB'in adı `MUFREDAT.md` kaynak satırında belirtilir.

## 1. Kime, nerede

Lise öğrencisi, dizüstü bilgisayarda; konuyu bu siteden, başka bir kaynağa bakmadan öğrenir. Tasarım 1366×768 dizüstünün tarayıcı penceresine (≈1366×657) göre yapılır; telefonda yalnızca bozulmaması yeter.

## 2. Müfredat bağlayıcıdır

- Programın istemediği konu derse girmez, istediği konu eksik kalmaz. Dayanak temanın `MUFREDAT.md` dosyasıdır (MEB sayfasından alınan metin).
- Programdaki sınırlamalara ("değinilmez", "girilmez", "ile sınırlı tutulur") uyulur.
- Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez.
- Kafa karıştıran, "merak" türü yan konu olmaz.
- Her temanın `PLAN.md` dosyasında müfredat denetimi tablosu vardır: programın her isteği bir kısa derse bağlanır, tabloda yeri olmayan kısa ders olmaz (konu tekrarı dersleri dışında, 3.4). Ders yazılınca sahne numaraları tabloya işlenir.

### 2.1 İçerik kaynağı

Program **kapsamı** belirler: hangi konu anlatılır, nerede durulur. Fen ve sosyal derslerde program çoğu zaman içeriği adıyla anar ama ayrıntısını yazmaz ("doğadaki dört temel kuvvet", "matematiksel model", "organeller", "Eski Çağ medeniyetleri"). Bu durumda:

- İkinci dayanak dersin **MEB ders kitabıdır** (adresi `plan/<ders>/TEMALAR.md` içinde). Kitap yalnızca programın andığı şeyin içeriğini doldurur: tanım, formül, sembol, birim, liste, sınıflandırma, deney düzeneği, veri, tarih, ad.
- Kitapta olup programın anmadığı konu yine girmez. Kapsam soruları kitaba göre değil programa göre kapanır.
- Kitaptan alınan her bilgi `PLAN.md` içinde kaynağıyla yazılır ("Ders kitabı, s. 84"). Hafızadan tanım, formül, sayı, tarih ya da ad yazılmaz.
- Kitap alınamıyorsa ya da bilgi kitapta da yoksa konu program metninde yazdığı kadarıyla anılır ve `PLAN.md` açık sorularına yazılır.
- İstisna: kitap, programın istediği bir içeriği açılamayan bir e-içeriğe (giriş isteyen EBA videosu, animasyon, karekod) bırakıyorsa konu eksik bırakılmaz ve öğrenciye "eksik" denmez. İçerik programın istediği genellikte, yerleşik ders bilgisinden yazılır: az bilgi verilmez, programın saymadığı ayrıntıya girilmez. Kitap dışından gelen her bilgi `PLAN.md` içinde tek tek, "kitap dışı" diye yazılır. (Kullanıcı kararı, 8 Ekim 2026; ilk uygulama biyoloji Yaşam D6 ve E1.)
- Kitap **yazarın** kaynağıdır, öğrencinin değil. Siteye giren kişi ders kitabını izlemek zorunda değildir; ders kendi başına yeter. Altyazıda, tahtada, soruda, geri bildirimde ve defterde kitaba, sayfaya, "hazır veri"ye ya da sınıfa gönderme olmaz ("kitapta verilmiştir", "kitabın tablosu", "sınıfta yapılır" yazılmaz). Veri bir durumun içinde sunulur: kim ölçtü, neyi, neden. Sayfa numarası yalnızca `PLAN.md` ve senaryoda durur. (Kullanıcı kararı, 7 Ekim 2026; kimya Etkileşim temasını izledikten sonra.)

### 2.2 Deney, gözlem ve ürün isteyen çıktılar

Site sınıfın yerine geçmez; programın bazı isteklerini yalnızca kısmen karşılar. Denetim tablosunda her istek şu üç durumdan biriyle işaretlenir:

| Durum | Ne zaman | Sitede ne olur |
|---|---|---|
| **ders** | İstek bir fikir, ilişki ya da işlemdir | Kısa derste doğrudan anlatılır |
| **benzetim** | İstek bir deney, ölçüm ya da gözlemdir | Etkileşimli benzetim: öğrenci değişkeni seçer, tahmin eder, sonucu görür. Düzenek ve sayılar ders kitabındaki deneyden alınır; uydurma ölçüm olmaz |
| **site dışı** | İstek bir üründür ya da sınıf etkinliğidir (poster, rapor, sunum, drama, tartışma, kurum ziyareti, grup çalışması, gerçek gözlem günlüğü, performans, uygulamalı çalışma) | Derse çevrilmez. Tabloda "site dışı (sınıfta yapılır)" yazar; isteğin dayandığı bilgi varsa o bilgi bir kısa derse bağlanır |

"Önerme kurar", "hipotez oluşturur", "soru sorar" gibi bentler sitede seçenekli tahminle (`c.choice`) ve sınıflandırmayla karşılanır; bu, **benzetim** sayılır. Bir temanın isteklerinin çoğu **site dışı** çıkıyorsa (beden eğitimi, müzik, görsel sanatlar gibi derslerde) tema yazılmaz, `TEMALAR.md` içinde gerekçesiyle not edilir.

### 2.3 Veri

Gerçek veri (ölçüm tablosu, nüfus, biyoçeşitlilik sayısı, tarih, harita bilgisi) kaynağı ve alındığı tarihle `PLAN.md` içine yazılır; site statik olduğu için ders bu tarihli kesiti kullanır. Kaynağı gösterilemeyen sayı gerçekmiş gibi verilmez; alıştırma için uydurulan veri "örnek veri" diye adlandırılır. Gerçek kişi, kurum ve olaylar yalnızca programın ve ders kitabının yazdığı kadarıyla anılır.

## 3. Kısa ders

Bir kısa ders = bir fikir, sonunda 4–5 çıkış sorusu. Adındaki "kısa" bir süre sınırı değildir: dersler kısa tutulmaz. Süre ve sahne sayısı için hedef ya da tavan yoktur; uzunluğu, öğrencinin konuyu programın istediği düzeyde anlaması için gereken anlatım belirler. Konu ayrıntısıyla açıklanır, örneklerle gösterilir, anlaşılması güç yerler görselleştirilir (3.1–3.3). Bilgi sığmıyorsa sahne ya da adım eklenir; bilgi atılmaz, anlatım ve örnek kısaltılmaz. Yazı bütçesi (bölüm 4) uzun derste de aynıdır; uzayan şey sahne ve adım sayısıdır. Bir derste iki fikir varsa ders ayrılır. Tavan yoktur, ama `sure.js` ölçümü 15 dakikayı geçen ders bir kez daha okunur: iki fikir taşıyorsa ayrılır, tek fikirse olduğu gibi kalır; sonuç temanın `DURUM.md` dosyasına yazılır. Öğrenci dersi sahne sahne, kendi hızında izler; uzun anlatım sahnelere bölünür, tek sahnede yığılmaz. (Kullanıcı kararı, 8 Ekim 2026: "dersleri çok kısa tutmayacağız". Önceki "çoğu ders 4–6 dakika ve 3–5 sahne tutar" ölçüsü kalktı.)

### 3.1 Önce anlat, sonra sor

Ders yeni bir soruyla açılmaz ve hiçbir soruya anlatmadan geçilmez. Bu, dersin her sorusu için geçerlidir (birlikte çöz, sor, dene, çıkış soruları), yalnızca ilki için değil. Önce olay ya da bağlam tanıtılır, kavramlar adlandırılır ve tahtada gösterilir, en az bir örnekle açıklanır. Soru, anlatılanı yeni bir duruma uygulatır; cevabı önceden söylenmez, ama cevaplamak için gereken her şey anlatılmıştır.

İki soru türü bu kuralla çelişmez:

- **Hatırlatma soruları** (3.4) önceki derslerde öğretilmiş bilgiyi sorar; dersin başında durur.
- **Tahmin:** durum tanıtıldıktan sonra, öğrencinin gündelik sezgisiyle ya da o ana kadar anlatılanla yapabileceği bir tahmin, açıklamanın tamamından önce sorulabilir (bir büyüklüğü kestirmek, iki şekli karşılaştırmak, bir örüntüyü sürdürmek). Tahmin dersin ilk işi olmaz; bir ada, tanıma, sınıflandırmaya, olaya, kişiye, birime ya da formüle dayanmaz; yanlış tahminin geri bildirimi nedenini söyler.

Tek cümle söyleyip soruya geçmek öğretmek sayılmaz. Sorunun gerektirdiği bilgi sorudan **önce** anlatılır; sorudan sonra yalnızca cevabın nedeni söylenir. Ne kadar anlatılacağını konu belirler: sayı eşiği yoktur. Ayrıntı ve örnek uzatma sayılmaz; aynı şeyi yineleyen, iş görmeyen cümle yazılmaz. (Kullanıcı kararları, 8 Ekim 2026: "gereksiz, uzatmış olmak için uzatmayalım"; "direkt soru sormaya geçmek gibi bir şey yapmayacağız". 7 Ekim'deki "soru sezgiyle cevaplanabiliyorsa ders kancayla, doğrudan soruyla açılabilir" seçeneği kalktı; yerine yukarıdaki dar tahmin kuralı geldi (kullanıcı onayı, 8 Ekim 2026). Kimya Etkileşim 7 Ekim'de cümle eşikleriyle yazılmıştı; o eşikler kural değildir.)

Yazarın çekinceleri öğrenciye söylenmez: "bu çizim gerçek ölçüm vermez", "bu derste deney yapmıyoruz", "kayıt kanıtlamaz" gibi uyarılar ve derse ilişkin üst dil ("bu sahnede … seçeceğiz") altyazıya yazılmaz; `PLAN.md` içinde kalır. Bir deney anlatılıyorsa sonucu da söylenir (kitabın verdiği kadar).

Anlatımın nasıl kurulacağı (hangi durum, hangi örnek, hangi görsel) dersten derse değişir; ders ya da tema düzeyinde tek bir kalıp dayatılmaz. Seçim senaryoda her kısa ders için yazılır.

### 3.2 İskelet

Sıra her derste aynıdır, öğrenci ritmi öğrenir:

1. **Hatırla:** önceki derslerden 1–2 soru (3.4). Temanın ilk dersinde yoktur.
2. **Anlat:** olay ya da bağlam tanıtılır; kavramlar adlandırılır ve tahtada adım adım gösterilir. Bilgi çoksa birden çok sahne olur.
3. **Örnekle göster:** anlatılan şey baştan sona çözülmüş en az bir örnek üzerinde, adım adım gösterilir (3.3).
4. **Birlikte çöz:** yarısı çözülmüş bir örnek. Adımların bir kısmı tahtada verilir, eksik adımı öğrenci tamamlar (`c.choice` ya da sürükle-bırak). İşlem içermeyen derste yarısı doldurulmuş bir tablo, şema ya da sınıflandırma olur.
5. **Sor:** öğrenci anlatılanı yeni bir duruma tek başına uygular (`c.choice`).
6. **Gör:** animasyon cevabı gösterir; bu sırada altyazı en çok bir satır. Ardından cevabın nedeni söylenir.
7. **Adlandır:** kural tek cümle olarak gelir, deftere düşer. Formülü olan derste tek formül eşlik eder; formülü olmayan derste (kavram, sınıflandırma, olay, metin) cümlenin yanında tek örnek, en çok dört satırlık bir tablo ya da etiketli bir şema olur.
8. **Dene:** bir kaydırıcı ya da sürükle-bırak. Sayısı olmayan derslerde sınıflandırma (kartı doğru kutuya), sıralama (zaman şeridi, basamaklar), eşleştirme ya da haritada/şemada yer gösterme. Yalnızca derste öğretilmiş olan sorulur.
9. **Çıkış soruları:** 4–5 soru (3.4).

Fikir birkaç parçadan oluşuyorsa 2–6. adımlar her parça için yinelenir. Giriş ekranındaki açılış sorusu merak uyandırmak içindir: öğrenciden cevap istenmez, cevabını ders verir.

Her ders bir akılda kalıcı cümleyle biter.

### 3.3 Ayrıntı, örnek, görselleştirme

- **Ayrıntı.** Programın anlaşılmasını istediği konu, istediği düzeyde ayrıntısıyla açıklanır: ne olduğu, neden öyle olduğu, nerede geçerli olduğu. Derinleşen şey programın istediği konudur; ayrıntı kapsamı aşmaz, yeni konu eklenmez (bölüm 2).
- **Örnek.** Her yeni kavram, kural ya da işlem en az bir örnekle gösterilir; güç olanlarda birden çok örnek, kolaydan zora verilir. Destek adım adım çekilir: önce baştan sona çözülmüş örnek, sonra yarısı çözülmüş örnek, sonra öğrencinin tek başına çözdüğü soru (3.2, adım 3–5). Yerindeyse bir karşı örnek ya da sık yapılan yanlış da gösterilir. Gerçek veri, olay ve ad içeren örnekler içerik kaynağı kuralına uyar (2.1, 2.3).
- **Görselleştirme.** Anlaşılması güç, soyut ya da gözle görülmeyen her kavram (bir ilişki, bir süreç, bir yapı, bir ölçek) tahtada görselleştirilir: çizim, şema, grafik, animasyon ya da benzetimle. Sıra somuttan soyuta gider: önce tanıdık, somut bir durum; sonra onun şeması; en son simge, formül ya da genel kural. Görsel anlatımla birlikte adım adım kurulur ve programın istediğini gösterir; süs olmaz. Hangi kavramın güç olduğu ve nasıl gösterileceği senaryoda yazılır. Çizim ve resim kuralları bölüm 5'tedir.

(Kullanıcı kararı, 8 Ekim 2026: "müfredata göre anlaşılması gereken konuyu biraz daha detaylı olarak öğrenciye açıklayarak, örneklerle anlamasını sağlayacağız; anlaşılması güç konuları gözünde görselleştireceğiz.")

### 3.4 Hatırlatma ve tekrar

Öğrenilen bilgi, yeniden okunarak değil hatırlanarak kalıcı olur; aralıklı sorulan soru bunu güçlendirir. Bu yüzden her bilgi üç yerde yeniden sorulur:

- **Çıkış soruları (4–5).** Hepsi derste öğretilenle cevaplanır. En az ikisi bilgiyi derste görülmemiş bir duruma uygulatır; en az biri dersin hedeflediği yanılgıyı sınar. Geri bildirim, şıkkın neden doğru ya da yanlış olduğunu söyler.
- **Hatırla (dersin ilk sahnesi, 1–2 soru).** Temanın ilk dersi dışındaki her ders böyle açılır. Sorular önceki derslerdendir: biri bir önceki dersten, biri daha eski bir dersten; seçilebiliyorsa bu dersin dayanacağı bilgi sorulur. Yeni bilgi sorulmaz. Yanlış cevapta kural bir cümleyle hatırlatılır. Sahne `c.choice` ile yazılır.
- **Konu tekrarı (her konunun son dersi).** Yeni bilgi içermez. Tek sahnede konunun kuralları tahtada ve defterde toplanır; ardından 6–10 soru gelir (`quiz`). Sorular derslerin sırasıyla değil karışık dizilir ve çoğu, bilgiyi yeni bir duruma uygulatır. Tekrar dersi denetim tablosunda "tekrar" diye geçer; ders saati oranına ve en az üç sahne kuralına girmez (`ISLEME.md` 3).

Araçların bunları denetleyebilmesi için dört adlandırma sabittir: temanın `tema.js` dosyasında `kural: 2` yazar (şablonda vardır); hatırla sahnesinin başlığı "Hatırla" olur; yarısı çözülmüş örneğin sorusu `tag: 'Birlikte çöz'` etiketini taşır; konu tekrarı dersinin dosya adı `<kod>-tekrar.html` olur (örnek: `a9-tekrar.html`). `denetle.js` çıkış sorusu sayısına, hatırla sahnesine ve konu tekrarına bakar; `sure.js` 15 dakikayı geçen ve ilk sorusunu en çok bir altyazıdan sonra soran dersleri not olarak yazar. 8 Ekim 2026'dan önce yazılan temalarda `kural` alanı yoktur ve bu denetimler yapılmaz.

(Kullanıcı onayı, 8 Ekim 2026. Önceki "2 çıkış sorusu" ölçüsü kalktı.)

## 4. Yazı bütçesi

Bu sınırlar ekranda aynı anda okunacak yazı içindir; dersin ne kadar anlattığını sınırlamaz. Anlatım uzadıkça altyazı, adım ve sahne sayısı artar; tek altyazı ya da tek tahta kalabalıklaşmaz.

| Öğe | Sınır |
|---|---|
| Altyazı | en çok 12 kelime, tek cümle |
| Tahtada aynı anda yazı | en çok ~25 kelime ya da 12 öğe; biten adım soluklaşır |
| Punto | en az 12 px |
| Defter kuralı | formül + tek örnek, en çok 12 kelime |
| Giriş ekranı | açılış sorusu + düğme |
| Çıkış sorusu geri bildirimi | en çok 2 cümle |

Metin ağırlıklı konularda (örnek olay, kaynak inceleme, edebî metin, tarihî belge) bütçe gevşemez: metin kartlara bölünür, her adımda tek kart görünür, okunan kart soluklaşır. Program bir metnin okunmasını istiyorsa (şiir, hikâye, belge) metnin kendisi tahtada parça parça gösterilir; bu parça 25 kelime sınırının dışındadır ama bir seferde en çok dört dize ya da iki cümle görünür.

Satırları yan yana görmek için kurulan, sayı ve kısa etiketten oluşan tablolarda 25 kelime sınırı aşılabilir: tablo bütün satırlarıyla birlikte görünür, öteki sınırlar (punto, üst üste yazı, taşma) geçerlidir ve aşan sahneler temanın `DURUM.md` dosyasına yazılır. (Kullanıcı kararı, 8 Ekim 2026; ilk uygulama fizik Kuvvet ve Hareket.)

Rakam ve sembol cümleden iyidir. Bir altyazıda tek yeni fikir olur. Aynı bilgi iki kanalda tekrar edilmez: sahnede yazıyorsa altyazıda yazmaz. Önce hareket, sonra cümle.

## 5. Görsel dil

Tahta ekrandaki tek renkli yüzeydir; çevresi düz ve sessizdir. Degrade, parlama, sürekli titreşen düğme, emoji ve büyük harfli etiket hapı kullanılmaz. Yazı tipi IBM Plex Sans. Bir kavrama bir renk verilir ve ders boyunca aynı kalır. Ayrıntı: `ortak/API.md`.

Anlaşılması güç kavram yalnızca sözle geçilmez, tahtada gösterilir (3.3).

### 5.1 Çizim mi, resim mi

Varsayılan vektör çizimdir (SVG): şema, grafik, düzenek, harita, zaman şeridi, model. Ölçülebilen, sayı ya da etiket taşıyan ve kesin doğru olması gereken her şey vektörle çizilir.

Program gerçekçi bir görüntü bekliyorsa ve çizim bunu taşıyamıyorsa (mikroskop altında hücre, bir canlının görünüşü, kayaç ya da yer şekli, doku, manzara, günlük hayattan bir sahne) **resim** kullanılır. Resim bir görsel üretim modeliyle (GPT görsel üretimi) üretilebilir. Koşullar:

- Resmin içinde yazı, rakam, ok, etiket olmaz; bunlar modelde bozuk çıkar. Etiketler resmin üstüne SVG katmanıyla konur.
- Resim süs değildir: sahnede bir işi vardır (karşılaştırılır, üzerinde yer gösterilir, sınıflandırılır). İşi olmayan resim konmaz.
- Bilimsel doğruluk ders kitabındaki görselle karşılaştırılarak denetlenir (organel sayısı ve yeri, canlının ayırt edici özellikleri, renk). Yanlış ya da kararsız çıkan resim kullanılmaz, vektöre dönülür.
- **Üretilmez:** gerçek kişilerin portreleri, tarihî eser, belge ve yapıların "fotoğrafı", haritalar, gerçek bir olayın ya da deney sonucunun kanıtı gibi sunulan görüntüler, sanat eserleri. Bunlar ya vektörle şematik çizilir ya da kaynağı ve lisansı belli gerçek görsel kullanılır.
- Üretilmiş resim gerçek fotoğraf gibi sunulmaz; tema sayfasının altında "Bu temadaki resimler yapay zekâ ile üretilmiştir" notu durur.
- Bir temada resimlerin üslubu tektir (aynı ışık, aynı arka plan, aynı kadraj); üslup cümlesi temanın `PLAN.md` dosyasına yazılır ve her istemde aynen kullanılır.
- Dosyalar `<ders>/<tema>/gorsel/` altında durur: WebP, uzun kenar en çok 1600 px, dosya başına en çok 300 KB. Her resmin istemi, modeli, üretim tarihi ve denetleyen `gorsel/KAYNAK.md` içine yazılır. Dışarıdan alınan görselde kaynak ve lisans aynı dosyaya yazılır.

Görsel üretimi ücretli dış servistir; seslendirme gibi işleme almanın dışındadır ve kullanıcı ayrıca ister. Tema işleme alınırken resim gereken sahneler senaryoda işaretlenir, istemleri `plan/<ders>/<tema>/GORSELLER.md` dosyasına yazılır ve ders, resmin yerinde aynı boyutta vektör bir yer tutucuyla yazılır; ölçüm bu hâliyle temiz çıkmalıdır.

## 6. Bir temanın yazım sırası

Müfredat → plan → kararlar → senaryolar → iskelet → kısa dersler → denetim. Adımların tamamı ve her adımda neyin "bitti" sayıldığı `ISLEME.md` dosyasındadır. Kullanıcı "şu temayı işleme al" dediğinde o dosya baştan sona, ara onay beklemeden uygulanır; kullanıcı bitmiş temayı inceler.

Yayın (`ortak/katalog.js` içinde `yayinda: true`), seslendirme, görsel üretimi ve hikâye videoları işleme almanın dışındadır; kullanıcı ayrıca ister. Seslendirme en sonda, tüm içerik bittikten sonra yapılır ve yalnızca tahtada bir şey olurken okunan açıklama altyazılarını kapsar.

## 7. Paralel çalışma

Her tema kendi iki klasöründe yaşar: içerik `<ders>/<tema>/`, plan `plan/<ders>/<tema>/`. Bir tema üzerinde çalışan kişi ya da ajan:

- yalnızca bu iki klasöre yazar;
- `ortak/`, `araclar/`, `index.html` ve başka temaların klasörlerine dokunmaz. Motorda ya da araçlarda bir eksik görürse düzeltmez, raporlar;
- temayı yayına almaz (`ortak/katalog.js` içindeki `yayinda` satırı); tema sayfası yayında olmadan da açılır, önizleme oradan yapılır;
- git'te commit, push ya da dal değiştirme yapmaz; bunlar ana oturumun işidir.

Temanın kendi çizim araçları, stil dosyası ve kısa dersleri kendi `dersler/` klasöründe durur; başka temadan dosya yüklenmez.
