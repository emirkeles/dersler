# Plan — Hikâye animasyonları

Karar (5 Ekim 2026): Derslere, kritik bir bilgiyi hayatın içinden bir hikâyeyle anlatan kısa animasyonlar eklenecek. Etkileşim yok; izlenir. Görsel dil hikâyeye göre seçilen 2D çizim (pastel, guaj, suluboya gibi).

Araç: **HyperFrames**. İlk iki hikâye onunla üretildi.

## Durum (5 Ekim 2026)

| Hikâye | Durum | Eksik |
|---|---|---|
| 1 · A8 Tarla ve çit | Seslendirildi; sesli taslak işlendi (`hikaye/a8-tarla-cit/renders/sesli-taslak.mp4`) | Son işleme, müzik, efekt, altyazı dosyası |
| 3 · B7 Kombi 22 derecede | Seslendirildi ve işlendi (`hikaye/b7-kombi-22/renders/b7-kombi-22.mp4`) | Müzik, efekt, altyazı dosyası |
| 2 C4 · 4 C5 · 5 B5 · 6 D5 · 7 A2 · 8 C3 | Başlanmadı | — |

Hiçbir hikâye henüz derse bağlı değil: motorda video sahnesi türü ve ana sayfada "Hikâyeler" başlığı yok; A8 ve B7 derslerinin kendisi de yazılmadı.

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

Derslerin 8'ine hikâye öneriyorum; kalanlarına önermiyorum.

### Hikâyesi olan dersler (müfredattaki önem sırasıyla)

Sıralama ölçütü: (1) program o fikir için gerçek yaşam bağlamını açıkça istiyor ya da örneğini kendisi veriyor mu, (2) fikir çıktının kendi içeriği mi yoksa ön bilgi mi, (3) programdaki değer, okuryazarlık ya da disiplinler arası bağlarla ilişkili mi. Kaynak: MEB program metni, 1. Tema: Sayılar.

| Sıra | Ders | Fikir | Hayatta nerede | Hikâye | Kapanış cümlesi |
|---|---|---|---|---|---|
| 1 | A8 Yaklaşık değer | Karekök çoğu zaman tam çıkmaz; yaklaşık değerle iş görülür | Alanı bilinen kare arsanın kenarı, çit ve fayans hesabı | Bir dönümlük (1000 m²) kare tarla çitle çevrilecek. Kenar √1000: tam çıkmaz, 31,6 metre alınır; 4 kenar 126,5 metre çit. Yuvarlamanın faturaya etkisi. | "Kök tam çıkmazsa yaklaşığıyla ölçer, biçeriz." |
| 2 | C4 Sıralama ve arada olma | İki ondalık sayının arasına hep bir yenisi sığar | 100 metre finali ve fotofiniş | İki koşucu 9,58'de geliyor gibi görünür. Kamera saniyenin binde birine iner: 9,581 ve 9,584. Yetmezse on binde bire. | "İki sayının arasında hep bir sayı daha vardır." |
| 3 | B7 Mutlak değerle aralık | \|x − a\| < r: hedefe uzaklık payın içinde | Kombi ve klima termostatı | Kombi 22 dereceye ayarlı; 1 derecelik payın dışına çıkınca çalışır. 21,4 de 22,8 de "tamam"; 20,9 değil. Önemli olan 22'ye uzaklık. | "Mutlak değer, hedefe uzaklıktır." |
| 4 | C5 İspat mı, karşı örnek mi? | Bin örnek kanıtlamaz, tek karşı örnek çürütür | "Her zaman", "hiçbir zaman" diye başlayan iddialar | Avrupa'da yüzyıllarca "bütün kuğular beyazdır" denir; 1697'de Avustralya'da siyah kuğu görülür. Bugüne bağlanır: "bu uygulama hiç çökmez", "ben hiç geç kalmam". | "Bin beyaz kuğu kanıtlamaz, tek siyah kuğu çürütür." |
| 5 | B5 Kesişim ve birleşim | "Ve" iki koşulu birden sağlayanları bırakır | Alışveriş uygulamasındaki filtreler | Spor ayakkabı arayan öğrenci: fiyat 1000–2000 TL **ve** numara 40–42. Her filtrede liste daralır; kalan ürünler iki aralığın kesişimi. | "Ve dediğinde liste daralır, veya dediğinde genişler." |
| 6 | D5 Özdeşlikler | (a + b)² = a² + 2ab + b²: kenar büyüyünce alan beklenenden fazla büyür | Tepsi, pizza, ekran, halı boyu seçerken | Börekçide 40'lık kare tepsi mi, 20'lik iki tepsi mi? 40'lık tepsi 1600 cm², iki küçük 800 cm²: aynı böreğe dört küçük tepsi gerekir. | "Kenar iki katına çıkınca alan dört katına çıkar." |
| 7 | A2 Geri sar: negatif üs | Her adımda yarıya inen şey küçülür ama eksiye düşmez | Kafeinin vücutta yarılanması (yaklaşık 5 saat) | Akşam 5'te içilen kahve: 10'da yarısı, gece 3'te çeyreği hâlâ kanda. Sınav gecesi neden uyuyamadığını anlayan öğrenci. | "Eksi üs negatif yapmaz; böler, böler, bitirmez." |
| 8 | C3 Sayı doğrusundaki delik | √2 gerçek bir uzunluktur ama hiçbir kesre eşit değildir | A4 kâğıdı ve fotokopideki %141 / %71 | A4'ü ikiye katlayınca aynı biçimde A5 çıkar. Bu ancak uzun kenar kısa kenarın √2 katıysa olur. Fotokopi makinesindeki %141 de odur. | "√2 her gün elinde: A4 kâğıdının kenarında." |

Müfredat dayanağı:

| Sıra | Hikâye | Programdaki dayanak |
|---|---|---|
| 1 | Bir dönüm tarla, kaç metre çit? | Programın kendi örneği: "1 dönümlük arsasının sınırlarını çitle çevirmek isteyen bir çiftçi için işin maliyeti, yaklaşık değer veya yuvarlama stratejileri kullanılarak hesaplanır." Tasarruf değeri ve finansal okuryazarlıkla da bağlı. |
| 2 | Fotofiniş | Programın kendi örneği: "100 metre koşu yarışlarında koşucuların sıralamalarının belirlenmesinde neden ondalık gösterime ihtiyaç duyulduğu" tartışılır. "Arada olma" çıktıda adıyla geçen üç özellikten biri. |
| 3 | Kombi 22 derecede | Program \|x − 3\| < 1 gösteriminin "gerçek yaşam durumu bağlamları da dikkate alınarak" tartışılmasını istiyor. |
| 4 | Siyah kuğu | Çıktının süreç bileşeni: önermeleri "ispatlamak ya da çürütmek"; program "aksine örnek verebilmenin önemi" üzerinde durulmasını istiyor. |
| 5 | Alışveriş filtresi | Aralıklarla kesişim ve birleşim çıktının ana içeriği; "ve / veya" ayrıca dördüncü çıktıda mantık bağlacı olarak geçiyor. Program gerçek yaşam örneği istemiyor. |
| 6 | Bir büyük tepsi mi, iki küçük mü? | Özdeşlikler çıktının içeriğinde ve "geometrik modellerle temsil edilir" deniyor. Program gerçek yaşam örneği istemiyor. |
| 7 | Kafeinin yarılanması | Tam sayı kuvvetler program tarafından ön bilgi sayılıyor. Dayanağı: üslü gösterimlere başka disiplinlerden (biyoloji, kimya) örnek bulunması beklentisi. |
| 8 | A4 kâğıdının sırrı | İrrasyonel sayılar program tarafından ön bilgi sayılıyor ("irrasyonel sayıları bildiği kabul edilmektedir"). |

İlk dördü programın açıkça gerçek yaşam bağlamı istediği ya da örneğini verdiği fikirler; bunlar öncelikli. 5 ve 6 çıktının ana içeriğini destekliyor. 7 ve 8 programın ön bilgi saydığı konular; süre ya da bütçe daralırsa ilk vazgeçilecekler.

Programın gerçek yaşamla en çok ilişkilendirdiği konu aslında **bilimsel gösterim** (astronomi, fizik, kimya, biyoloji örnekleri, araştırma ödevi). Ona ayrı hikâye önermedim, çünkü A7 dersinin kendisi bu örneklerle kurulu; bir hikâye daha eklenecekse sıradaki aday odur.

Doğruluk notları: kafeinin yarılanma süresi kişiye göre 3–7 saat arasında değişir, hikâyede "yaklaşık 5 saat" denir. A serisi kâğıtların kenar oranı √2'dir. 1 dönüm 1000 m², √1000 ≈ 31,62. Siyah kuğular Avrupalılarca ilk kez 1697'de Batı Avustralya'da görüldü. 100 metre dünya rekoru 9,58 saniyedir (2009); hikâyedeki iki derece kurgudur.

### Hikâyesi olmayan dersler ve nedeni

| Dersler | Neden yok |
|---|---|
| A1 Üs bir sayaçtır · B2–B4 Aralıklar · D2–D4 İşlem özellikleri | Dersin kendisi zaten hayattan bir durumla kurulu (video paylaşımı, lunapark boy sınırı, kasiyerin zihinden hesabı). İkinci bir hikâye tekrar olur. |
| A3 Kök = yarım üs · A4 Köklerle işlem | Köklerin hayattaki yeri 1 numaralı hikâyede (tarla ve çit) veriliyor; toplama tuzağı derste "kestirme yol" ile zaten somut. |
| A5 Rasyonel üs · A6 Eşlenik · D6 Çarpanlara ayırma | İşlem tekniği. Öğrencinin gündelik hayatında doğrudan karşılığı yok; hikâye zorlama olur. |
| B1 Küme dili · B6 Fark ve tümleme · C1 Her kutu bir ihtiyaçtan doğdu · C2 Ondalık açılım | Konu kendiliğinden anlaşılır ve dersteki örnekler (çalma listesi, borç, paylaşma) yeterince somut. |
| D1 Önerme dili | Sınırda. "Kimlik **ve** giriş belgesi" ile "kimlik **veya** pasaport" farkı gerçek bir durum; ama 5 numaralı hikâye (alışveriş filtresi) aynı fikri taşıyor. Ders yazılırken yeniden bakılır. |

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

`hikaye/<ders>-<ad>/` (HyperFrames projesi: senaryo, taslak, çizimler, kompozisyon) ve `hikaye/<ders>-<ad>.mp4` (derste kullanılan çıktı). İlk iki video 28–36 MB çıktı (ilk tahmin 8–15 MB idi); sekiz hikâye depoyu ~250 MB büyütür. Gerekirse videolar depo dışında tutulur ya da daha düşük bit hızıyla işlenir.

## 6. Sıra ve bağımlılıklar

- **Senaryolar** ilgili bölümün dersleriyle birlikte yazılır (yalnızca metin, ucuz).
- **Pilot:** A bölümü bitince 1 numaralı hikâye (tarla ve çit) baştan sona üretilir; görsel dil, süre ve derse yerleşim onun üzerinde kesinleşir.
- **Kalan hikâyeler** içerik tamamlandıktan sonra, seslendirme aşamasıyla birlikte üretilir; çünkü videonun zamanlaması anlatıma bağlıdır.
- "Ses en sona" kararına tek istisna pilottur: zamanlamayı görebilmek için anlatımı baştan seslendirilmeli (yaklaşık 900 karakter). Onayınıza bağlı.

## 7. Açık kararlar

1. Hikâye listesi: sekiz hikâye ve "hikâyesi olmayan dersler" ayrımı uygun mu?
2. Yerleşim: dersin son sahnesi (öneri) mi, dersler arasında ayrı bir sayfa mı?
3. Müzik ve efekt: ilk iki hikâye yalnızca anlatımla işlendi; eklenecek mi?

Kapananlar: araç HyperFrames; çizimler tamamı vektör (seçenek B; A8 guaj ve kâğıt dokusu, B7 kuru pastel süzgeci); pilotun sesi üretildi.
