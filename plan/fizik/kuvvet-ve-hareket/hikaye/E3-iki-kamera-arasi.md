# Plan — Hikâye: İki kamera arası

**Ders:** 2. tema Kuvvet ve Hareket · E3 Sürat: ortalama ve anlık (son sahne)
**Sıra:** fizik listesinde 2 numara, kademe I (`../../HIKAYE-ANIMASYONLARI.md`)
**Durum (7 Ekim 2026):** on iki kare kurulu ve seslendirildi (12 klip, 794 karakter, 58,9 saniye konuşma); film 71 saniye, zamanlama kliplere göre. `check` geçiyor. Video işlenmedi. Kullanıcı 1–6. kareleri görüp onayladı; 7–12. kareler ve seslendirme onay bekliyor.

Ölçütler ve biçim: `../../../matematik/sayilar/HIKAYE-ANIMASYONLARI.md` bölüm 1 ve 2. Üretim, HyperFrames'in (HeyGen) `general-video` iş akışıyla yürür; eklenti sürümü 0.8.140.

## 1. Doğruluk kaynağı

Senaryo, kare listesi ve niyet artık proje klasöründedir; bu dosya yalnızca müfredat dayanağını, riskleri ve kararları tutar. İkisi çelişirse proje dosyaları geçerlidir.

`fizik/kuvvet-ve-hareket/hikaye/e3-iki-kamera/`

| Dosya | Katman | İçerik |
|---|---|---|
| `BRIEF.md` | neden, kimin için | `workflow: general-video` · `flow: automation` · `storyboard: yes` · mesaj, hedef, boyut, dil, kitle, süre. Gövde: Intent, Customizations, Notes |
| `SCRIPT.md` | kilitli anlatım | 12 satır, 94 kelime, ses ve yönergeler, sayıların sağlaması. `araclar/hikaye-ses.js` bu dosyayı okur |
| `STORYBOARD.md` | ne, kare kare | Kararlar, ölçek, ekrandaki sözcükler, yasaklar, açık sorular; 12 `## Frame` bölümü (hepsi `outline`) |
| `frame.md` | nasıl görünür | Kâğıt kesme üslubu, renk rolleri, yazı, iki plan (genel ve yakın); kullanıcı onayladı |
| `index.html` | kompozisyon | On iki kare, tek dosya (yaklaşık 800 satır); `T` tablosu tahminî |
| `kareler/` | görüntüler | Her karenin `poster` anındaki görüntüsü ve iki özet sayfası |
| `storyboard.html` | eskiz sayfası | Çizilmedi; kullanıcı eskiz yerine kareleri doğrudan kurdurup görüntülerine baktı |

## 2. Hikâyenin işi

| | |
|---|---|
| Tek fikir | Anlık sürat tek bir anı, ortalama sürat bütün yolu anlatır; ikisi aynı sayı olmak zorunda değildir |
| Hedeflenen yanılgı | "Göstergede ne yazıyorsa arabanın sürati odur." |
| Hatırlanacak nesne | Yol kenarındaki kamera direği ve arabanın sürat göstergesi |
| Kapanış cümlesi | "Gösterge anı söyler, ortalama bütün yolu." (E3'ün `PLAN.md` taslağındaki cümlesi) |
| Kapanış kartındaki model | Ortalama sürat = alınan toplam yol ÷ hareket süresi (ders kitabı, s. 106) |

Dayanak: FİZ.9.2.6, kavramların "sürat cezaları ya da trafikteki yeşil dalga ile" ilişkilendirilmesi; "sürat sınırlamalarına uymanın can güvenliği (D16.2, OB6) … açısından önemi". Ders kitabı s. 106: "Sürat göstergesinde anlık olarak okunan 60 km/h aracın anlık süratidir"; "Ortalama sürat: Bir hareketlinin tüm hareketi boyunca aldığı yolun tamamının hareket süresine oranıdır."

Program sınırları (`STORYBOARD.md` "Yasaklar" bölümünde de yazılı): grafik yok ("Hareketin temel kavramlarına yönelik grafiklerden … kaçınılır"); hız, yer değiştirme ve ivme sözcükleri geçmez; fren ve gaz için hesap yapılmaz.

## 3. HyperFrames'e göre değişenler

İlk taslak (7 Ekim 2026, aynı gün) projenin üç perdelik kalıbındaydı. HyperFrames'in kurallarına göre şunlar değişti:

| Konu | İlk taslak | Şimdi | Dayandığı kural |
|---|---|---|---|
| Sıra | Durum → şaşırtan an → demek ki; ceza 5. satırda | Kanca → iddia → kanıt → sağlama → kapanış; ceza 2. satırda, "kameralar saate bakar" 3. satırda | `story-spine.md`: kanca izleyicinin diliyle açılır, iddia ikinci vuruşa kadar söylenir |
| Kare sayısı | 8 kare, en uzunu 20 saniye | 12 kare, satır başına bir kare, 3,5–7 saniye | `storyboard-recipe.md`: vuruş başına tek fikir, tek odak |
| Dünya | Yol, araba içi, akşam ev sahnesi | Tek dünya: iki kamera arasındaki yol şeridi; ev sahnesi yok | "Omurga": her vuruşu bağlayan tek düzenek, baştan adlandırılır |
| Anlatım | 13 satır, 101 kelime, yaklaşık 68 saniye | 12 satır, 94 kelime, yaklaşık 62 saniye | — |
| Onay | Plan dosyasında | İş akışının kendi duraklarında: plan (sohbette), eskiz sayfası, son önizleme | `review-loop.md`, `storyboard: yes` |

Sayılar, karakterler (Deniz ve dayısı), kapanış cümlesi ve ana sahne (ölçekli şerit, sınıra uyan soluk araba) değişmedi.

Sıranın gerekçesi: hikâye dersten sonra oynar ve yeni bilgi öğretmez; öğrenci kavramı görmüş olduğu için cevabı sona saklamak gerekmez. A1 "Çantanın askısı" planı üç perdelik sırayı koruyor (`../../akiskanlar/hikaye/A1-cantanin-askisi.md`); iki hikâyenin aynı sırayı kullanması istenirse karar bölüm 7'dedir.

## 4. HyperFrames yapısı

B7 projesindeki gibi tek dosya, tek kompozisyon, tek duraklatılmış GSAP zaman çizelgesi; alt kompozisyon yok (sert sahne kesmesi yok). Ayrıntılar kompozisyon yazılmadan önce `hyperframes-core` becerisiyle kesinleşir; aşağıdaki, iskeletin ve B7'nin gösterdiği kadardır.

### Katmanlar ve izler

Kök: `<div id="root" data-composition-id="main" data-start="0" data-duration="71" data-width="1920" data-height="1080">`.

| Öğe | Zaman | İçerik |
|---|---|---|
| `.world` (dünya, klip değil) | baştan sona | Yol şeridi, tarlalar, iki kamera direği, tabela, kilometre taşları, iki araba. Kamera bu kabın dönüşümüyle gezer (`viewport-change`) |
| `#olcu` (dünyanın içinde, süzgeçsiz) | baştan sona | Rakam ve birim etiketleri, saat damgaları, ayraçlar. Dünyayla birlikte ölçeklenir, her karede okunur |
| `#gosterge-buyuk` (ekrana sabit) | 4–6. kareler | Büyük analog gösterge; ibre arabanın süratine bağlı |
| `section#kapanis.clip`, iz 1 | 55 – 62 sn | Kart: cümle iki `<span>`, altında model |
| `audio#ses-01` … `#ses-12`, iz 3 | `T` tablosu | `data-start`, `data-duration` (gerçek klip süresi), `data-volume` (B7'de 3,5). Her birinin `id`si vardır |

### Zaman çizelgesi

Tek sözlük bütün hareketi taşır: `const T = { l1, …, l12, son }`, satırların başlangıç saniyeleri. Her zaman çizelgesi çağrısı bir `T` değerine göre konumlanır; `<audio>` öğelerinin `data-start` değerleri aynı sayılardır. Klipler yeniden üretilirse yalnızca `T` ve `<audio>` satırları değişir. Sonunda `window.__timelines["main"] = tl`.

Gerçek `T` (kliplerden ölçüldü, 7 Ekim 2026). Klip başlangıcı kare başlangıcından 0,1–0,9 saniye sonradır; görüntü sesi önce karşılar.

| Kare | Kare başlangıcı – bitişi (sn) | Klip (sn) | `poster` |
|---|---|---|---|
| 1 iki-gosterge | 0 – 6,4 | 0,5 – 6,1 | 5,8 |
| 2 ceza | 6,4 – 9,6 | 6,5 – 9,06 | 9,2 |
| 3 saat | 9,6 – 16,1 | 9,7 – 15,54 | 15,6 |
| 4 ilk-kamera | 16,1 – 21,7 | 16,2 – 21,4 | 21,2 |
| 5 gaz | 21,7 – 26,3 | 21,8 – 25,8 | 25,6 |
| 6 ikinci-kamera | 26,3 – 32,6 | 26,4 – 31,92 | 32,2 |
| 7 damgalar | 32,6 – 39,4 | 32,7 – 38,94 | 38,8 |
| 8 bolme | 39,4 – 44,9 | 39,5 – 44,54 | 44,3 |
| 9 sinira-uyan | 44,9 – 50,3 | 45 – 49,72 | 49,5 |
| 10 anlik | 50,3 – 57,6 | 50,4 – 57,12 | 56,5 |
| 11 ortalama | 57,6 – 62,3 | 57,7 – 61,3 | 61,5 |
| 12 kapanis | 62,3 – 71 | 63,2 – 67,04 | 69 |

Cümle içi işaretler de anlatımdan alındı: fren "frene bastı"da (18,2), gaz "gaza bastı"dan hemen önce (22,9), ikinci fren "Yine fren"de (29,6). Yolculuğun ekran ölçeği bu üç andan çözülür; kliplerin yeri değişirse araba yine tam kameranın altında çakılır.

Karelerin hareket kuralları `STORYBOARD.md` içinde her karenin `rules` satırındadır; adlar `hyperframes-animation/rules-index.md` içindendir (`viewport-change`, `control-target-sync`, `svg-path-draw`, `counting-dynamic-scale`, `scale-swap-transition`, `spring-pop-entrance`, `svg-icon-enrichment`, `coordinate-target-zoom`, `motion-blur-streak`, `waterfall-entry`).

### Kurallar

- Tek zaman çizelgesi, `paused: true`; `window.__timelines` anahtarı kökün `data-composition-id` değeriyle aynı (`main`).
- Her şey zamanın saf fonksiyonu: `fromTo` ve mutlak değerler; `Math.random`, `Date.now` ve ağ isteği yok.
- Yalnızca dönüşüm ve boya özellikleri hareket eder; `width`, `height`, `top`, `left` tween'i yok. Hareketli öğede CSS `transition` yok; tekrarlar sonlu.
- Ölçek sabitleri kodda tek yerde durur: `const KM = 120, SOL = 240, SAG = SOL + 12 * KM`. Arabaların konumu bir "dakika" değerinden hesaplanır; 9. karede sayaç ile iki araba aynı değeri paylaşır.
- Gerçek arabanın konum fonksiyonu uçlarda yavaş, ortada hızlıdır ve 6. dakikada tam `SAG`'da biter; soluk arabanınki doğrusaldır (dakikada 1,5 km).

### Doğrulama

1. `npm run check` (lint, çalışma zamanı, yerleşim, hareket, karşıtlık): temiz.
2. On iki karenin `poster` anında görüntü alınır. 44. saniyede ölçülür: gerçek araba x = 1680, soluk araba x = 1320.
3. Son önizleme (Studio) kullanıcıya açılır; işleme ancak onaydan sonra.
4. Derse bağlandıktan sonra `node araclar/olc.js kuvvet-ve-hareket/e3` ve `node araclar/denetle.js fizik/kuvvet-ve-hareket`.

## 5. Adımlar

| # | Adım (HyperFrames'teki adı) | Çıktı | Durak |
|---|---|---|---|
| 1 | Niyet ve proje iskeleti | `BRIEF.md`, `hyperframes init` | bitti |
| 2 | Plan | `SCRIPT.md`, `STORYBOARD.md` (12 kare, `outline`) | **kullanıcı: onay ya da değişiklik; eskiz istenir mi** |
| 3 | Görsel kimlik | `frame.md` (çizim dili, renk rolleri, yazı tipi) | kullanıcı: çizim dili |
| 4 | Eskiz sayfası | `storyboard.html`; kareler `built` | kullanıcı: yerleşim onayı |
| 5 | Ses | `assets/ses/01–12.mp3` (`node araclar/hikaye-ses.js e3-iki-kamera`), düzeyi eşitlenmiş kopyalar `assets/ses-esit/` | bitti (794 karakter); kullanıcı dinleyecek |
| 6 | Kompozisyon | `index.html`; kareler `animated`; `T` gerçek sürelere çekilir | — |
| 7 | Doğrulama | `npm run check`, kare görüntüleri | — |
| 8 | Son önizleme ve işleme | `renders/e3-iki-kamera.mp4`, `kapak.jpg`, altyazı dosyası | işlendi (8 Ekim 2026, kullanıcı isteğiyle: 1920×1080, 71 sn, 17,6 MB, `--crf 23`); kapak 22. saniyeden (480×270); altyazı dosyası yapılmadı |
| 9 | Derse bağlama | E3'ün son sahnesi; `tema.js` içine `hikayeler` satırı | bitti (8 Ekim 2026): E3'ün 9. sahnesi video sahnesi, tema sayfasında "Hikâyeler" kartı; `olc.js` ve `denetle.js` temiz |

## 6. Bağımlılıklar ve riskler

- **E3 dersi henüz yok.** 1–8. adımlar dersten bağımsız yürür (B7 hikâyesi de dersinden önce üretilmişti); 9. adım temayı bekler. Tema işlenirken kapanış cümlesi ya da terimler değişirse 12. satır ve kapanış kartı yeniden üretilir.
- **Dersin açılışıyla örtüşme.** E3'ün taslak açılış sorusu da gösterge ve ortalama üzerine. Tema işlenirken açılış bu hikâyenin sahnesine göre yeniden yazılabilir (`../../HIKAYE-ANIMASYONLARI.md` bölüm 8, soru 1).
- **Tema klasörü yalnızca hikâyeyi içeriyor.** `fizik/kuvvet-ve-hareket/` bu projeyle açıldı; içinde tema sayfası ve `tema.js` yok. `araclar/hikaye-ses.js e3-iki-kamera --liste` projeyi buluyor (denendi). `denetle.js` tema işlenmeden bu klasörde çalıştırılmaz.
- **Örnek olarak sınırı aşan bir sürücü.** Hikâye dayının yaptığını onaylamaz: ceza gelir ve hile işe yaramaz. Ayrı bir can güvenliği cümlesi yok (tek fikir kuralı); bu bağ E7 dersinde kurulur.
- **Ses sağlayıcısı.** HyperFrames'in kendi seslendirme yolları Kokoro ve HeyGen'dir. Bu proje derslerle aynı sesi (Gamze Özdemir, ElevenLabs) ve depodaki aracı kullanıyor; değiştirilmedi.

## 7. Açık kararlar

1. **Sıra:** kanca başta (bu sürüm) mi, üç perde mi? A1 planıyla aynı olması istenirse biri ötekine uydurulur.
2. **Senaryo:** karakterler (Deniz ve dayısı) ve sayılar (90, 12 km, 6 dakika).
3. **Çizim dili:** kâğıt kesme önerisi mi, başka bir üslup mu?
4. **Eskiz sayfası:** plan onayından sonra `storyboard.html` çizilsin mi, doğrudan yapıma mı geçilsin?
5. **Etiketler:** 10 ve 11. karelerde "anlık" ve "ortalama" sözcükleri ekrana yazılsın mı?
6. **Ses:** Gamze Özdemir (ElevenLabs) kalsın mı, HeyGen sesi mi denensin?

## 8. Doğrulanmayanlar

- Türkiye'de iki nokta arası ortalama hız denetimi uygulanıyor (7 Ekim 2026'da haber ve TR Dizin makalesinde görüldü); resmî bir kaynaktan doğrulanmadı.
- Şehirler arası yolda sınırın 90 km/h olması kurgudur; yasal sınırlara bakılmadı. Hikâye yasaya değil tabelaya dayanır.
- Kapanış kartındaki modelin sembolle yazılışı: kitabın metin dökümünde semboller bozuk çıktı, bu yüzden model sözle yazıldı.
- `hyperframes-core` bu oturumda okunmadı; bölüm 4'teki yapı iskelet dosyasına, proje `CLAUDE.md` dosyasındaki kurallara ve B7'ye dayanıyor.
- `STORYBOARD.md` HyperFrames'in kendi ayrıştırıcısıyla denenmedi; alanları biçim belgesine göre elle denetlendi.
