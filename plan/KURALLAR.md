# Ortak kurallar

Bütün dersler ve temalar için bağlayıcıdır. Sayılar teması yazılırken alınan kararlardan derlendi (`plan/matematik/sayilar/PLAN.md`); 7 Ekim 2026'da fen ve sosyal dersler eklenince genişletildi (içerik kaynağı, deney ve ürün isteyen çıktılar, formülsüz dersler, görseller, veri). Bir temaya özgü kararlar o temanın `PLAN.md` dosyasında durur.

Adlar bütün derslerde aynıdır: Ders → Tema → Konu → Kısa ders. MEB bazı derslerde (fizik, tarih, coğrafya) "ünite" der; sitede ve plan dosyalarında hepsi "tema"dır, MEB'in adı `MUFREDAT.md` kaynak satırında belirtilir.

## 1. Kime, nerede

Lise öğrencisi, dizüstü bilgisayarda, 5 dakikalık parçalarla. Tasarım 1366×768 dizüstünün tarayıcı penceresine (≈1366×657) göre yapılır; telefonda yalnızca bozulmaması yeter.

## 2. Müfredat bağlayıcıdır

- Programın istemediği konu derse girmez, istediği konu eksik kalmaz. Dayanak temanın `MUFREDAT.md` dosyasıdır (MEB sayfasından alınan metin).
- Programdaki sınırlamalara ("değinilmez", "girilmez", "ile sınırlı tutulur") uyulur.
- Ön bilgi sayılanlar yeniden anlatılmaz; zenginleştirme etkinlikleri derslere girmez.
- Kafa karıştıran, "merak" türü yan konu olmaz.
- Her temanın `PLAN.md` dosyasında müfredat denetimi tablosu vardır: programın her isteği bir kısa derse bağlanır, tabloda yeri olmayan kısa ders olmaz. Ders yazılınca sahne numaraları tabloya işlenir.

### 2.1 İçerik kaynağı

Program **kapsamı** belirler: hangi konu anlatılır, nerede durulur. Fen ve sosyal derslerde program çoğu zaman içeriği adıyla anar ama ayrıntısını yazmaz ("doğadaki dört temel kuvvet", "matematiksel model", "organeller", "Eski Çağ medeniyetleri"). Bu durumda:

- İkinci dayanak dersin **MEB ders kitabıdır** (adresi `plan/<ders>/TEMALAR.md` içinde). Kitap yalnızca programın andığı şeyin içeriğini doldurur: tanım, formül, sembol, birim, liste, sınıflandırma, deney düzeneği, veri, tarih, ad.
- Kitapta olup programın anmadığı konu yine girmez. Kapsam soruları kitaba göre değil programa göre kapanır.
- Kitaptan alınan her bilgi `PLAN.md` içinde kaynağıyla yazılır ("Ders kitabı, s. 84"). Hafızadan tanım, formül, sayı, tarih ya da ad yazılmaz.
- Kitap alınamıyorsa ya da bilgi kitapta da yoksa konu program metninde yazdığı kadarıyla anılır ve `PLAN.md` açık sorularına yazılır.

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

Bir kısa ders = bir fikir, 4–6 dakika, 3–5 sahne, sonunda 2 çıkış sorusu. İskelet her derste aynıdır, öğrenci ritmi öğrenir:

1. **Kanca** (≤ 15 sn): hayattan tek soru, tek görsel.
2. **Tahmin et:** öğrenci önce tahmin eder (`c.choice`).
3. **Gör:** animasyon cevabı gösterir; bu sırada altyazı en çok bir satır.
4. **Adlandır:** kural tek cümle olarak gelir, deftere düşer. Formülü olan derste tek formül eşlik eder; formülü olmayan derste (kavram, sınıflandırma, olay, metin) cümlenin yanında tek örnek, en çok dört satırlık bir tablo ya da etiketli bir şema olur.
5. **Dene:** bir kaydırıcı ya da sürükle-bırak. Sayısı olmayan derslerde sınıflandırma (kartı doğru kutuya), sıralama (zaman şeridi, basamaklar), eşleştirme ya da haritada/şemada yer gösterme.
6. **Çıkış soruları:** 2 soru.

Her ders bir akılda kalıcı cümleyle biter.

## 4. Yazı bütçesi

| Öğe | Sınır |
|---|---|
| Altyazı | en çok 12 kelime, tek cümle |
| Tahtada aynı anda yazı | en çok ~25 kelime ya da 12 öğe; biten adım soluklaşır |
| Punto | en az 12 px |
| Defter kuralı | formül + tek örnek, en çok 12 kelime |
| Giriş ekranı | açılış sorusu + düğme |
| Çıkış sorusu geri bildirimi | en çok 2 cümle |

Metin ağırlıklı konularda (örnek olay, kaynak inceleme, edebî metin, tarihî belge) bütçe gevşemez: metin kartlara bölünür, her adımda tek kart görünür, okunan kart soluklaşır. Program bir metnin okunmasını istiyorsa (şiir, hikâye, belge) metnin kendisi tahtada parça parça gösterilir; bu parça 25 kelime sınırının dışındadır ama bir seferde en çok dört dize ya da iki cümle görünür.

Rakam ve sembol cümleden iyidir. Bir altyazıda tek yeni fikir olur. Aynı bilgi iki kanalda tekrar edilmez: sahnede yazıyorsa altyazıda yazmaz. Önce hareket, sonra cümle.

## 5. Görsel dil

Tahta ekrandaki tek renkli yüzeydir; çevresi düz ve sessizdir. Degrade, parlama, sürekli titreşen düğme, emoji ve büyük harfli etiket hapı kullanılmaz. Yazı tipi IBM Plex Sans. Bir kavrama bir renk verilir ve ders boyunca aynı kalır. Ayrıntı: `ortak/API.md`.

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
