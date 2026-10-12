# Plan — Hikâye: Fotofiniş

**Ders:** 1. tema Sayılar · C4 Sıralama ve arada olma (son sahne)
**Sıra:** hikâye listesinde 2 numara (`../HIKAYE-ANIMASYONLARI.md`); üretim sırasında bekleyenlerin ilki
**Durum (12 Ekim 2026):** on kare kurulu, seslendirildi (Gamze Özdemir, 11 klip, 64,7 sn konuşma) ve işlendi; film 74,6 saniye. `check` geçiyor (tek uyarı: dosya uzunluğu). Kullanıcı kareleri ve filmi henüz görmedi; derse bağlanmadı.

Ölçütler ve biçim: `../HIKAYE-ANIMASYONLARI.md` bölüm 1 ve 2. Üretim HyperFrames'in `general-video` iş akışıyla yürüdü (0.8.149); yapı A7 "3 nanometre" ile aynıdır.

## 1. Neden önce bu

Üretilmemiş hikâyeler üç listede durur: Sayılar (5), matematik 2–7. temalar (15), fizik (17). Bu hikâye üçünün de önündedir:

- Sayılar listesinin kendi üretim sırası "C4, C5, A7, D3, B5, D7, C3"tür; A7 ve D3 üretildi, sırada C4 var.
- Programın kendi örneğidir: "100 metre koşu yarışlarında koşucuların sıralamalarının belirlenmesinde neden ondalık gösterime ihtiyaç duyulduğu" tartışılır. Hakem raporu da onaylı listenin en güçlü üçü arasında sayar.
- Teması yayında ve seslendirilmiş; ders senaryosunda 5. sahne olarak yeri ayrılmış. Öteki listelerin ilk sıraları ya üretilmiş (fizik 1 ve 2) ya da teması yazılmamış ya da yayında değil.

## 2. İnceleme: eski öz ve değişenler

Eski öz (liste, iki cümle): "İki koşucu 9,58'de geliyor gibi görünür. Kamera saniyenin binde birine iner: 9,581 ve 9,584. Yetmezse on binde bire."

| # | Bulgu | Yapılan |
|---|---|---|
| 1 | **Hata:** atletizmde derece yüzde bire yukarı yuvarlanır; 9,581 ve 9,584 tabelada 9,58 değil 9,59 görünür. | Sayılar değişti; tabela ile kamera arasındaki ilişki doğru kuruldu. |
| 2 | 9,58 dünya rekorudur; iki kurgu koşucunun rekorda berabere kalması inandırıcı değil. | Gerçek yarış: Paris 2024 erkekler 100 m finali. İki derece tabelada 9,79; kamerada 9,784 ve 9,789. Birinci koşul ("gerçekten hayatta var") kurgu yerine olguyla sağlanıyor. |
| 3 | Öz, "daha çok basamak gerekir"i gösteriyor ama kapanış cümlesine ("bir sonraki sayı yoktur") varmıyor. | 6. kare eklendi: "9,784'ten sonraki sayı 9,785 mi?" Dersin açılış yanılgısı hikâyenin sayılarıyla sorulur; 7–9. kareler cevaplar. |
| 4 | "Yetmezse on binde bire": kamera sonsuza kadar inemez; öz ölçmeyle sayıyı karıştırıyor. | "Kamera bir yerde durur; sayılar durmaz." Sınır gerçek (saniyede en çok 40 000 kare) ve ayrım dersin fikrinin kendisi. |
| 5 | Dersin ana görseli (sayı doğrusunda sonsuz yakınlaşma) özde yok. | Kahraman nesne sayı doğrusu; yakınlaşma dersteki gibi davranır. |
| 6 | Dersin öbür yarısı ("soldaki küçüktür") kullanılmıyor. | 5. kare: küçük süre solda, önce varan o. İkinci bir fikir değil; arada olmaya giden basamak. |
| 7 | Koşucuların pistteki sırası ile sayı doğrusundaki sırası ters yönlüdür (öndeki sağda, küçük solda). | İkisi aynı karede gösterilmez; kamera şeridinde beden değil, varış anında başlayan iz çizilir. |

Kapanış cümlesi, ders ve senaryo değişmedi. Anlatım 128 kelime (sınır 110–150).

## 3. Doğruluk kaynağı

Senaryo, kare listesi ve görsel kimlik proje klasöründedir; bu dosya incelemeyi, dayanağı, riskleri ve kararları tutar. İkisi çelişirse proje dosyaları geçerlidir.

`matematik/sayilar/hikaye/c4-fotofinis/`

| Dosya | İçerik |
|---|---|
| `BRIEF.md` | `workflow: general-video` · `flow: automation` · `storyboard: yes`; niyet, özelleştirmeler, notlar |
| `SCRIPT.md` | 11 satır, 128 kelime, sayıların sağlaması; `araclar/hikaye-ses.js` bu dosyayı okur |
| `STORYBOARD.md` | Kararlar, ölçek, ekrandaki sözcükler, yasaklar, hareket ilkeleri; 10 `## Frame` bölümü |
| `frame.md` | Gece stadyumu, düz biçimli spor afişi: yedi renk, yazı, yerleşim, hareket |
| `index.html` | Kompozisyon: on kare, tek dosya, tek zaman çizelgesi; stadyum SVG, sayı doğrusu tuval |
| `assets/ses/`, `assets/ses-esit/` | Ham ve düzeyi eşitlenmiş klipler, `olcum.json` |
| `renders/` | `c4-fotofinis.mp4`, `kapak.jpg` |

## 4. Hikâyenin işi

| | |
|---|---|
| Tek fikir | İki farklı ondalık sayının arasında her zaman bir başkası vardır |
| Hedeflenen yanılgı | "9,784'ten sonraki sayı 9,785'tir" (derste: "0,5'ten sonra 0,6 gelir") |
| Hatırlanacak nesne | Tabelada aynı görünen iki derece; fotofiniş |
| Kapanış cümlesi | "Kesirlerde 'bir sonraki sayı' yoktur." (C4'ün akılda kalıcı cümlesi) |
| Kapanış kartındaki eşitsizlik | 9,784 < 9,7845 < 9,785 |

## 5. Kaynaklar

Olgular (12 Ekim 2026'da arandı):

| Olgu | Durum | Kaynak |
|---|---|---|
| Paris 2024 erkekler 100 m finali: birinci 9,784, ikinci 9,789; ikisi de 9,79 olarak yayımlandı; fark binde beş saniye | Doğrulandı (birden çok haber kaynağı aynı sayıları veriyor) | [Sky Sports](https://www.skysports.com/olympics/news/12040/13190898), [Sports Illustrated](https://www.si.com/olympics/olympics-fans-in-awe-of-stunning-photo-finish-in-mens-100m-final), [NBC](https://www.nbclosangeles.com/paris-2024-summer-olympics/see-noah-lyles-win-mens-100m-in-wild-photo-finish-by-just-005-of-a-second/) |
| Derecenin yüzde bire yukarı yuvarlanması | Dolaylı doğrulandı: Sky Sports "rounded-up time of 9.79" diyor; kural metninin kendisi açılmadı | aynı |
| Bitiş kamerası saniyede en çok 40 000 kare çeker; tek piksel genişliğinde dikey şeritleri yan yana dizer | Doğrulandı | [heise](https://heise.de/-9830156), [Xataka](https://www.xataka.com/fotografia-y-video/esta-tecnologia-detras-foto-finish-imposible-camara-omega-que-toma-40-000-imagenes-segundo) |
| Sıralamada gövde sayılır (baş, kol, bacak değil) | Doğrulandı (haberler kuralı aktarıyor) | [The Conversation](https://theconversation.com/despite-cutting-edge-tech-olympic-athletes-are-still-tying-at-the-games-heres-why-235853) |
| Paris 2024 pisti mordur (kulvarlar açık, çevresi koyu mor) | Doğrulandı | [Mondo](https://www.mondoworldwide.com/emea/en/spaziomondo/doyouknow/purple-paris-athletics-track-makes-the-headlines/), [Popular Science](https://www.popsci.com/environment/paris-olympics-purple-track/) |
| Sekiz finalistin dereceleri: 9,79 · 9,79 · 9,81 · 9,82 · 9,85 · 9,86 · 9,88 · 9,91 | Doğrulandı; koşucuların pistteki aralıkları bu farklarla orantılı çizildi | [Yahoo Sports](https://uk.sports.yahoo.com/news/mens-100m-final-results-noah-201035058.html), [Watch Athletics](https://www.watchathletics.com/page/5834/men-s-100m-results-paris-olympic-games-2024-athletics) |

Hareket tasarımı (Opus alt ajanıyla, 12 Ekim 2026; yalnızca açılan sayfalar):

- Yakınlaşma logaritmik ölçekte: [GSAP ExpoScaleEase](https://gsap.com/docs/v3/Eases/ExpoScaleEase/).
- Giriş çıkıştan uzun, yavaşlayarak oturur; doğrusal hareket yapay görünür: [NN/g](https://www.nngroup.com/articles/animation-duration/), [Material](https://m1.material.io/motion/duration-easing.html), [Carbon](https://carbondesignsystem.com/elements/motion/overview/).
- Tek odak, en önemli öğe en son: [Carbon koreografi](https://carbondesignsystem.com/elements/motion/choreography/), [Material koreografi](https://m1.material.io/motion/choreography.html).
- Sıfırdan büyüyerek giriş yok: [Emil Kowalski](https://emilkowal.ski/ui/7-practical-animation-tips).
- Düşünce bitince sessizlik ve durağan ekran: [Jellyvision](https://design.jellyvision.com/?p=40). Zamanlamayı anlatım belirler: [Kurzgesagt](https://kurzgesagt.org/youtube/).
- Tek kamera hareketiyle kurulan film, alt çerçevenin içine girerek geçiş: [Motionographer](https://motionographer.com/2018/02/23/cnn-colorscope-pink/), [School of Motion](https://schoolofmotion.com/blog/six-essential-motion-design-transitions-tutorial).
- Hareket bulanıklığı temas anını siler: [School of Motion](https://www.schoolofmotion.com/blog/motion-blur-after-effects).
- Rakamlar yerinden oynamaz; yazı sesten sonra en az 0,5 sn kalır: [NumberFlow](https://number-flow.barvian.me/), [Netflix zamanlama kılavuzu](https://partnerhelp.netflixstudios.com/hc/en-us/articles/360051554394-Timed-Text-Style-Guide-Subtitle-Timing-Guidelines).
- Bulunamayanlar: film için süre önerisi (bulunan sayılar arayüz içindir), sayaç ve ondalık açılışı üzerine yazı, paralaks ve hız rampası oranları, görüntünün sözcükten önce mi sonra mı ineceği (eşik değerlerinden çıkarım yapıldı). Material 3 ve bazı sayfalar açılmadı.

## 6. Kararlar (12 Ekim 2026)

- **Gerçek yarış, adsız koşucular.** Anlatım yılı, şehri ve yarışı söyler; koşucuların adını, ülkesini, formasını ve kulvarını vermez. Renkler ülke renklerinden bilerek uzak seçildi (turuncu ve nane).
- **Tabela satırlarının sırası derece sırası değil:** ikinci üstte, birinci altta; soru sorulurken sıra cevabı vermesin.
- **Tabelada üçüncü basamağın yeri baştan sönük durur;** 4. karede yanar ve 9,79'un 9'u 8'e döner.
- **Sayılar sesle değil ekranla taşınır:** 7–9. karelerde araya giren sayılar okunmaz ("bir sayı daha var"), ekranda yazar.
- **Sayı doğrusu tuvalde çizilir:** çizgi sayısı yakınlaşmayla değiştiği için; `check` tuvaldeki yazının karşıtlığını ölçmez (krem ve altın, gece zemininde).
- **Ses onaysız üretildi:** kullanıcı filmi istedi ("profesyonel bir iş çıkart"); 871 karakter.

## 7. Riskler

- **Gerçek bir yarış ve gerçek sporcular.** Ad ve görüntü yok; sonuç kamuya açık bir spor sonucudur. Yayın kararı yine de kullanıcıda (D3'teki grup logosu kararıyla aynı türden, daha hafif).
- **Pist dokuz kulvarlıdır;** filmde sekiz kulvar çizildi (sekiz koşucu). Şematik bir sadeleştirme.
- **Gerçekte eş dereceler olur:** kamera sınırına takılan iki koşucu berabere sayılır. Hikâye "her yarış ayrılır" demez; "iki derece ne kadar yakın olursa olsun aralarına bir başkası sığar" sayılar hakkındadır.
- **Kamera şeridi sadeleştirildi:** gerçek görüntüde bedenler uzamış ve ters yönlü çıkar; burada yalnızca varış anında başlayan bir iz var.
- **Süre 74,6 sn:** hedef aralığın (45–75 sn) üst ucunda.

## 8. Açık kararlar

1. Kullanıcı filmi sesli izler; yanlış okunan kelime varsa o satır yeniden üretilir ve film yeniden işlenir.
2. Derse bağlama (C4'ün 5. sahnesi, `tema.js` `hikayeler` satırı, `sure.js`).
3. Müzik ve efekt (öteki hikâyelerle ortak karar).
4. Altyazı dosyası (`.vtt`).
5. `../HIKAYE-ANIMASYONLARI.md` bölüm 4'teki 2. satır ve doğruluk notu eski özle duruyor (9,58 · 9,581 · 9,584); bu dosyayla eşitlenecek.

## 9. Doğrulanmayanlar

- Klipler dinlenmedi: süreler ve duraklamalar ölçüldü, okunuş kulakla denetlenmedi ("dokuz virgül yedi yüz seksen dört" gibi uzun sayılar risklidir).
- Film baştan sona oynatılıp izlenmedi; otuza yakın anın görüntüsüne ve `check` sonucuna bakıldı. Hareketin akıcılığı (koşu döngüsü, hızlı yakınlaşma) durağan karelerden yargılandı.
- Kelime anları yazıya dökümle değil, kliplerdeki sessizliklerden kestirildi; tabelanın yeni basamağı yaktığı iki an (27,0 ve 30,2 sn) ±0,2 sn kayabilir.
