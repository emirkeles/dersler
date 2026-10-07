# Plan — Hikâye animasyonları

Karar (5 Ekim 2026): Derslere, kritik bir bilgiyi hayatın içinden bir hikâyeyle anlatan kısa animasyonlar eklenecek. Etkileşim yok; izlenir. Görsel dil hikâyeye göre seçilen 2D çizim (pastel, guaj, suluboya gibi).

Araç: **HyperFrames**. İlk iki hikâye onunla üretildi.

## Durum (6 Ekim 2026)

| Hikâye | Durum | Eksik |
|---|---|---|
| 1 · A8 Tarla ve çit | Seslendirildi; sesli taslak işlendi (`hikaye/a8-tarla-cit/renders/sesli-taslak.mp4`) ve A8 dersinin son sahnesine bağlandı | Son işleme, müzik, efekt, altyazı dosyası |
| 3 · B7 Kombi 22 derecede | Seslendirildi, işlendi (`hikaye/b7-kombi-22/renders/b7-kombi-22.mp4`) ve B7 dersinin son sahnesine bağlandı | Müzik, efekt, altyazı dosyası |
| 2 C4 · 4 C5 · 5 A7 · 6 D3 · 7 B5 · 8 D7 · 9 C3 | Başlanmadı | — |

Motorda video sahnesi türü var (`ortak/API.md`). Tema sayfasında "Hikâyeler" başlığı var (7 Ekim 2026; liste `ortak/katalog.js` içinde). Kapanış kartında her zaman dersin akılda kalıcı cümlesi yazar; tek istisna C5'teki siyah kuğu cümlesidir (`senaryolar/C-sayi-kumeleri.md`).

Liste 6 Ekim 2026'da gözden geçirildi (bölüm 4'ün sonundaki "Gözden geçirme" başlığı): A2 kafein hikâyesi çıktı, yerine A7 geldi; D3'e hikâye eklendi; B5 ve D7 hikâyeleri değişti; C3 hikâyesi kapanış cümlesine göre yeniden kuruldu.

## 1. Hangi konuya hikâye yazılır

Ölçüt (5 Ekim 2026 kararı): **zorlama hikâye yok.** Bir derse hikâye ancak şu üç koşul birlikte sağlanıyorsa eklenir:

1. **Gerçekten hayatta var.** Konu o durumda sahiden kullanılıyor; matematik sonradan giydirilmiş değil.
2. **Öğrenci onunla karşılaşacak.** Kendi gündeminde ya da yakın gelecekte: telefon, alışveriş, sınav, ev, spor.
3. **Konu soyut kalıyor.** Ders zaten hayattan bir örnekle kurulmuşsa ya da konu kendiliğinden anlaşılırsa hikâye eklenmez.

Hikâyenin işi: öğrenci izlerken konuyu tanısın ve "bu, hayatta karşıma burada çıkacak" diyebilsin. Bu yüzden her hikâye öğrencinin bir sonraki karşılaşmada hatırlayacağı somut bir nesneye bağlanır (A4 kâğıdı, alışveriş filtresi, kombi ekranı gibi).

Ek kurallar:

- **Tek fikir, tek cümle.** Hikâye tek bir fikir taşır ve dersin akılda kalıcı cümlesiyle biter.
- **Yeni bilgi öğretmez.** Derste geçmeyen kavram, terim ya da formül hikâyeye girmez.
- **Ekranda yazı yok.** Yalnızca kapanış kartında tek cümle ve gerekiyorsa tek formül. Anlatım sesle.

## 2. Biçim

| | |
|---|---|
| Süre | 45–75 saniye |
| Görüntü | 16:9, 1920×1080, MP4 |
| Ses | Anlatıcı Gamze Özdemir (`eleven_v4`), hafif fon müziği, birkaç efekt |
| Anlatım | 110–150 kelime; üç perde: durum → şaşırtan an → "demek ki" |
| Kapanış | 4–5 saniyelik kart: akılda kalıcı cümle + formül |
| Altyazı | İsteğe bağlı açılır (sessiz izleyen için) |

## 3. Derste nereye girer

Öneri: hikâye, ilgili kısa dersin **son sahnesi** olur; kural adlandırıldıktan sonra, çıkış sorularından önce oynar. Gerekçe: hikâye anlamayı değil hatırlamayı güçlendiriyor; öğrenci fikri önce tahtada kurmuş olmalı. Dersi açan merak sorusu zaten var, başa ikinci bir hikâye koymak dikkati böler.

Ek olarak ana sayfada "Hikâyeler" başlığı altında hepsi tek tek yeniden izlenebilir (sınav öncesi hızlı tekrar).

Motor desteği: yeni sahne türü `{ title, video: 'hikaye/a2-baklava.mp4', altyazi: 'hikaye/a2-baklava.vtt' }`. Tahtada oynar; Duraklat, Baştan ve hız düğmeleriyle uyumludur; bitince "Sonraki" belirir.

## 4. Hikâye listesi

28 dersin 9'unda hikâye var; kalanlarında yok.

### Hikâyesi olan dersler (müfredattaki önem sırasıyla)

Sıralama ölçütü: (1) program o fikir için gerçek yaşam bağlamını açıkça istiyor ya da örneğini kendisi veriyor mu, (2) fikir çıktının kendi içeriği mi yoksa ön bilgi mi, (3) programdaki değer, okuryazarlık ya da disiplinler arası bağlarla ilişkili mi. Kaynak: MEB program metni, 1. Tema: Sayılar.

| Sıra | Ders | Fikir | Hayatta nerede | Hikâye | Kapanış cümlesi |
|---|---|---|---|---|---|
| 1 | A8 Yaklaşık değer | Karekök çoğu zaman tam çıkmaz; yaklaşık değerle iş görülür | Alanı bilinen kare arsanın kenarı, çit ve fayans hesabı | Bir dönümlük (1000 m²) kare tarla çitle çevrilecek. Kenar √1000: tam çıkmaz, 31,6 metre alınır; 4 kenar 126,5 metre çit. Yuvarlamanın faturaya etkisi. | "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz." |
| 2 | C4 Sıralama ve arada olma | İki ondalık sayının arasına hep bir yenisi sığar | 100 metre finali ve fotofiniş | İki koşucu 9,58'de geliyor gibi görünür. Kamera saniyenin binde birine iner: 9,581 ve 9,584. Yetmezse on binde bire. | "Kesirlerde 'bir sonraki sayı' yoktur." |
| 3 | B7 Mutlak değerle aralık | \|x − a\| < r: hedefe uzaklık payın içinde | Kombi ve klima termostatı | Kombi 22 dereceye ayarlı; 1 derecelik payın dışına çıkınca çalışır. 21,4 de 22,8 de "tamam"; 20,9 değil. Önemli olan 22'ye uzaklık. | "Mutlak değer, hedefe uzaklıktır." |
| 4 | C5 İspat mı, karşı örnek mi? | Bin örnek kanıtlamaz, tek karşı örnek çürütür | "Her zaman", "hiçbir zaman" diye başlayan iddialar | Avrupa'da yüzyıllarca "bütün kuğular beyazdır" denir; 1697'de Avustralya'da siyah kuğu görülür. Bugüne bağlanır: "bu uygulama hiç çökmez", "ben hiç geç kalmam". | "Bin beyaz kuğu kanıtlamaz, tek siyah kuğu çürütür." |
| 5 | A7 Bilimsel gösterim | Üs, virgülün kaç basamak kaydığını sayar; çok küçük sayı böyle okunur | Telefon reklamındaki "3 nanometre" | Reklam "3 nanometre işlemci" diyor: metrenin milyarda üçü, dersteki 3 × 10⁻⁹. Ne kadar küçük? Bir saç teli yaklaşık 7 × 10⁻⁵ metre. Üsler −5 ve −9: arada dört basamak var; saç telinin kalınlığına yan yana on binlercesi sığar. | "Virgül kayar, üs sayar." |
| 6 | D3 İse, ancak ve ancak | "p ise q" doğruyken "q ise p" doğru olmayabilir | Reklamlar, "başarılı insanlar şunu yapar" paylaşımları | Reklam: "Şampiyonlar bu ayakkabıyı giyiyor." Doğru olsun: şampiyonsan bu ayakkabıyı giyiyorsun. Öğrenci ayakkabıyı alır, koşuda yine sonuncu gelir: ok tek yönlüydü. Karşılaştırma: konser kapısı. Bileti olan girer, giren herkesin de bileti vardır: iki yön. | "İse tek yön, ancak ve ancak çift yön." |
| 7 | B5 Kesişim ve birleşim | "Ve" listeyi daraltır, "veya" genişletir | Alışveriş uygulamasındaki filtreler | Spor ayakkabı arayan öğrenci marka filtresinde iki kutu işaretler: A **veya** B; liste genişler. Sonra numara filtresini açar: marka **ve** numara 40–42; liste daralır. Aynı filtrenin içindeki işaretler "veya", filtreler arası "ve". Fiyat 1000–2000 TL eklenince kalanlar iki aralığın kesişimi. | "∩ ve, ∪ veya." |
| 8 | D7 Özdeşlikler | (a + b)² = a² + 2ab + b²: kenar biraz büyüyünce alan beklenenden çok büyür | Tepsi, pizza, ekran, halı boyu seçerken | Börekçide 30'luk kare tepsi mi, 40'lık mı? Kenar yalnızca 10 cm büyüyor; ama 30'luk 900 cm², 40'lık 1600 cm²: neredeyse iki katı börek. Aradaki 700 cm² nereden geldi: iki şerit (300 + 300) ve köşedeki küçük kare (100). | "(a + b)² dört parçadır, iki değil." |
| 9 | C3 Sayı doğrusundaki delik | √2 gerçek bir uzunluktur ama ondalığı ne biter ne devreder | A4 kâğıdı ve fotokopideki %141 | A4'ü ikiye katlayınca aynı biçimde A5 çıkar. Bu ancak uzun kenar kısa kenarın √2 katıysa olur. Fotokopi makinesi büyütürken %141 yazar; 1,41 değil 1,414…, o da değil: sayı bitmediği için makine yuvarlamak zorunda. | "Ne biter ne devreder: irrasyonel." |

Müfredat dayanağı:

| Sıra | Hikâye | Programdaki dayanak |
|---|---|---|
| 1 | Bir dönüm tarla, kaç metre çit? | Programın kendi örneği: "1 dönümlük arsasının sınırlarını çitle çevirmek isteyen bir çiftçi için işin maliyeti, yaklaşık değer veya yuvarlama stratejileri kullanılarak hesaplanır." Tasarruf değeri ve finansal okuryazarlıkla da bağlı. |
| 2 | Fotofiniş | Programın kendi örneği: "100 metre koşu yarışlarında koşucuların sıralamalarının belirlenmesinde neden ondalık gösterime ihtiyaç duyulduğu" tartışılır. "Arada olma" çıktıda adıyla geçen üç özellikten biri. |
| 3 | Kombi 22 derecede | Program \|x − 3\| < 1 gösteriminin "gerçek yaşam durumu bağlamları da dikkate alınarak" tartışılmasını istiyor. |
| 4 | Siyah kuğu | Çıktının süreç bileşeni: önermeleri "ispatlamak ya da çürütmek"; program "aksine örnek verebilmenin önemi" üzerinde durulmasını istiyor. |
| 5 | 3 nanometre ne kadar küçük? | Programın gerçek yaşamla en çok ilişkilendirdiği konu: bilimsel gösterimin fizik, kimya ve biyolojideki kullanımına ("atomun büyüklüğü" gibi) örnekler isteniyor. Dersin açılış sayısını (3 × 10⁻⁹) kullanır; yeni bilgi getirmez. |
| 6 | Şampiyonlar bunu giyiyor | "İse" ve "ancak ve ancak" bağlaçlarının anlamlarının tartışılması çıktının içeriğinde. Program önermenin "matematiksel örnekler üzerinde" incelenmesini istiyor; ders öyle kurulu, hikâye yalnızca aktarım. Gerçek yaşam örneği istenmiyor. |
| 7 | Alışveriş filtresi | Aralıklarla kesişim ve birleşim çıktının ana içeriği; "ve / veya" ayrıca dördüncü çıktıda mantık bağlacı olarak geçiyor (D2). Program gerçek yaşam örneği istemiyor. |
| 8 | 30'luk tepsi mi, 40'lık mı? | Özdeşlikler çıktının içeriğinde ve "geometrik modellerle temsil edilir" deniyor. Program gerçek yaşam örneği istemiyor. |
| 9 | A4 kâğıdının sırrı | İrrasyonel sayılar program tarafından ön bilgi sayılıyor ("irrasyonel sayıları bildiği kabul edilmektedir"). |

İlk beşi programın açıkça gerçek yaşam bağlamı istediği ya da örneğini verdiği fikirler; bunlar öncelikli. 6, 7 ve 8 çıktının ana içeriğini destekliyor. 9 programın ön bilgi saydığı bir konu; süre ya da bütçe daralırsa ilk vazgeçilecek olan o.

Üretim sırası tablodaki sıradır: C4, C5, A7, D3, B5, D7, C3 (A8 ve B7 hazır).

Doğruluk notları:

- 1 dönüm 1000 m², √1000 ≈ 31,62.
- 100 metre dünya rekoru 9,58 saniyedir (2009); hikâyedeki iki derece kurgudur.
- Siyah kuğular Avrupalılarca ilk kez 1697'de Batı Avustralya'da görüldü.
- "3 nanometre" çipin üretim kuşağının adıdır; içindeki parçaların gerçek ölçüsü değildir. Hikâye "en küçük parça 3 nanometre" demez; reklamdaki sayının ne kadar küçük bir uzunluk olduğunu anlatır. Saç teli kişiye göre yaklaşık 2 × 10⁻⁵ ile 2 × 10⁻⁴ metre arasındadır; 7 × 10⁻⁵ alınırsa oran yaklaşık 23 000 olur, hikâyede "on binlerce" denir. A7 dersinin açılış sorusundaki "çipin en küçük parçası" ifadesi aynı gerekçeyle gevşek; A bölümü kapalı olduğu için dokunulmadı.
- A serisi kâğıtların kenar oranı √2'dir (297 / 210 ≈ 1,414); A4'ten A3'e büyütme oranı makinelerde %141 olarak yazılır.
- 30² = 900, 40² = 1600; fark 700 = 2 · 30 · 10 + 10².

### Gözden geçirme (6 Ekim 2026, onaylandı)

Bölüm D yazıldıktan sonra liste program metniyle yeniden karşılaştırıldı.

| Değişiklik | Gerekçe |
|---|---|
| A2 kafein hikâyesi çıktı; yerine A7 "3 nanometre" geldi | Program tam sayı üssü ön bilgi sayıyor; gerçek yaşamla en çok ilişkilendirdiği konu olan bilimsel gösterimin ise hikâyesi yoktu. Yeni hikâye negatif üssü de taşıyor. |
| D3'e hikâye eklendi | Bölüm D'nin en soyut fikri; "ise"yi tersinden okumak öğrencinin her gün karşılaştığı bir akıl yürütme hatası. |
| B5'e "veya" eklendi; kapanış kartı dersin cümlesi oldu | Eski hâli yalnızca "ve"yi gösteriyordu. Yeni hâli D2'yi de taşıyor. |
| D7'de tepsiler 20 ve 40 yerine 30 ve 40 | a = b olunca dört parça aynı kare çıkıyor, unutulan iki dikdörtgen (2ab) görünmüyordu; eski hâli özdeşliği değil ölçeklemeyi anlatıyordu. |
| C3 son sırada kaldı; anlatım %141'in yuvarlama olduğuna bağlandı | Eski hâli √2'nin gerçek bir uzunluk olduğunu gösteriyor ama kapanış cümlesindeki "ne biter ne devreder"e değmiyordu. |

### Hikâyesi olmayan dersler ve nedeni

| Dersler | Neden yok |
|---|---|
| A1 Üs bir sayaçtır · B2–B4 Aralıklar · D4–D6 İşlem özellikleri | Dersin kendisi zaten hayattan bir durumla kurulu (video paylaşımı, lunapark boy sınırı, kasiyerin zihinden hesabı). İkinci bir hikâye tekrar olur. |
| A2 Geri sar: negatif üs | Tam sayı üs programda ön bilgi. Negatif üssün hayattaki yeri 5 numaralı hikâyede (3 nanometre) veriliyor. |
| A3 Kök = yarım üs · A4 Köklerle işlem | Köklerin hayattaki yeri 1 numaralı hikâyede (tarla ve çit) veriliyor; toplama tuzağı derste "kestirme yol" ile zaten somut. |
| A5 Rasyonel üs · A6 Eşlenik · D8 Çarpanlara ayırma | İşlem tekniği. Öğrencinin gündelik hayatında doğrudan karşılığı yok; hikâye zorlama olur. |
| B1 Küme dili · B6 Fark ve tümleme · C1 Her kutu bir ihtiyaçtan doğdu · C2 Ondalık açılım | Konu kendiliğinden anlaşılır ve dersteki örnekler (çalma listesi, borç, paylaşma) yeterince somut. |
| D1 Önerme · D2 Ve, veya, ya da | "Her" iddiasının tek istisnayla düşmesini 4 numaralı hikâye (siyah kuğu), "ve / veya" farkını 7 numaralı hikâye (alışveriş filtresi) taşıyor. |

## 5. Üretim hattı (HyperFrames)

HyperFrames videoyu HTML'den üretir: çizimler katmanlara yerleştirilir, hareket kodla verilir, kare kare işlenip MP4 çıkar. Bu, sonucu "hareketli resimli kitap" kalitesine getirir: katmanlı çizim, kamera hareketi, parçalı karakter hareketi, çizilerek beliren çizgiler. Dudak senkronu ve kare kare çizgi film canlandırması bu aracın işi değildir.

Her hikâye altı adımdan geçer:

1. **Senaryo** (110–150 kelime anlatım + kapanış cümlesi) → onayınız.
2. **Resimli taslak** (6–9 kare, her karede ne görünüyor, ne hareket ediyor) → onayınız.
3. **Çizimler** (arka planlar, karakterler, nesneler; katman katman).
4. **Kompozisyon ve hareket** (HyperFrames).
5. **Ses** (anlatım, müzik, efekt) ve altyazı dosyası.
6. **İşleme ve derse ekleme**; ölçüm aracıyla dersin bozulmadığı doğrulanır.

### Çizimlerin kaynağı (karar gerekiyor)

| Seçenek | Görünüm | Artı | Eksi |
|---|---|---|---|
| A. Yapay zekâ ile görsel üretimi | Gerçek pastel/guaj dokusu | En zengin görüntü | Kurulum gerekiyor (bu bilgisayarda yerel FLUX ya da Codex görsel üretimi; ikisi de henüz kurulu değil). Karakterin kareden kareye aynı kalması garanti değil; yazı ve rakam içeren görseller hatalı çıkabilir |
| B. Elle vektör çizim + kâğıt/pastel dokusu | Kâğıt kesme, düz renkli modern çizim | Tam denetim, her karede tutarlı, sayılar kesin doğru, ek kurulum yok | Resimsel derinlik daha az |
| C. Hazır çizim (bir çizerden ya da sizden) | Çizere bağlı | En kişilikli sonuç | Dış bağımlılık, süre |

Önerim: aynı hikâyenin iki karesini A ve B ile hazırlayıp yan yana göstermek, kararı ona göre vermek. Matematiksel olarak kesin olması gereken kareleri (tarla ölçüleri, tepsi alanları, A4 katlama) her durumda vektörle çizmek.

### Dosyalar

`hikaye/<ders>-<ad>/` (HyperFrames projesi: senaryo, taslak, çizimler, kompozisyon) ve `hikaye/<ders>-<ad>.mp4` (derste kullanılan çıktı). İlk iki video 28–36 MB çıktı (ilk tahmin 8–15 MB idi); dokuz hikâye depoyu ~290 MB büyütür. Gerekirse videolar depo dışında tutulur ya da daha düşük bit hızıyla işlenir.

## 6. Sıra ve bağımlılıklar

- **Senaryolar** ilgili bölümün dersleriyle birlikte yazılır (yalnızca metin, ucuz).
- **Pilot:** A bölümü bitince 1 numaralı hikâye (tarla ve çit) baştan sona üretilir; görsel dil, süre ve derse yerleşim onun üzerinde kesinleşir.
- **Kalan hikâyeler** içerik tamamlandıktan sonra, seslendirme aşamasıyla birlikte üretilir; çünkü videonun zamanlaması anlatıma bağlıdır.
- "Ses en sona" kararına tek istisna pilottur: zamanlamayı görebilmek için anlatımı baştan seslendirilmeli (yaklaşık 900 karakter). Onayınıza bağlı.

## 7. Açık kararlar

1. Müzik ve efekt: ilk iki hikâye yalnızca anlatımla işlendi; eklenecek mi?
2. C1 için tarih hikâyesi: program sayı kümelerinin "tarihî bağlamda nasıl ortaya çıkmış olabileceğinin" tartışılmasını istiyor; ders bunu borç ve paylaşma örnekleriyle dolaylı yapıyor. Öğrencinin gündeminden uzak olduğu için eklenmedi; istenirse onuncu hikâye olur.

Kapananlar: hikâye listesi dokuz hikâye olarak onaylandı (6 Ekim 2026); araç HyperFrames; çizimler tamamı vektör (seçenek B; A8 guaj ve kâğıt dokusu, B7 kuru pastel süzgeci); pilotun sesi üretildi; hikâye dersin son sahnesinde oynar (A8 senaryosuyla onaylandı).
