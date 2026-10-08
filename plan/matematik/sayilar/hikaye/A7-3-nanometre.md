# Plan — Hikâye: 3 nanometre ne kadar küçük?

**Ders:** 1. tema Sayılar · A7 Bilimsel gösterim (son sahne)
**Sıra:** hikâye listesinde 5 numara (`../HIKAYE-ANIMASYONLARI.md`)
**Durum (8 Ekim 2026):** on kare kurulu ve seslendirildi (George, 10 klip, 61,7 saniye konuşma); film 73,5 saniye, zamanlama kliplere göre. `check` geçiyor (tek uyarı: dosya uzunluğu). İşlendi ve A7 dersine bağlandı (kullanıcı isteğiyle): `renders/a7-3-nanometre.mp4`, 1920×1080, 26,8 MB.

Ölçütler ve biçim: `../HIKAYE-ANIMASYONLARI.md` bölüm 1 ve 2. Üretim, HyperFrames'in `general-video` iş akışıyla yürür (eklenti 0.8.140); yapı E3 "İki kamera arası" ile aynıdır.

## 1. Doğruluk kaynağı

Senaryo, kare listesi ve görsel kimlik proje klasöründedir; bu dosya yalnızca dayanağı, riskleri ve kararları tutar. İkisi çelişirse proje dosyaları geçerlidir.

`matematik/sayilar/hikaye/a7-3-nanometre/`

| Dosya | İçerik |
|---|---|
| `BRIEF.md` | `workflow: general-video` · `flow: automation` · `storyboard: yes`; niyet, özelleştirmeler, notlar |
| `SCRIPT.md` | 10 satır, 123 kelime, sayıların sağlaması; `araclar/hikaye-ses.js` bu dosyayı okur |
| `STORYBOARD.md` | Kararlar, ölçek, ekrandaki sözcükler, yasaklar, yapımda plandan ayrılanlar; 10 `## Frame` bölümü (hepsi `animated`) |
| `frame.md` | Risograf baskı: dört mürekkep, nokta taraması, yazı, yerleşim |
| `index.html` | Kompozisyon: on kare, tek dosya, tek zaman çizelgesi; `T` tablosu tahminî |
| `kareler/` | On üç kare görüntüsü ve iki özet sayfası (depoya girmez) |

## 2. Hikâyenin işi

| | |
|---|---|
| Tek fikir | 10'un üssü, virgülün kaç basamak kaydığını sayar; çok küçük sayı böyle okunur |
| Hedeflenen yanılgı | 10⁻⁹'u negatif bir sayı sanmak; "nanometre"yi yalnızca bir reklam sözü saymak |
| Hatırlanacak nesne | Telefon reklamındaki "3 nm" ve bir saç teli |
| Kapanış cümlesi | "Virgül kayar, üs sayar." (A7'nin akılda kalıcı cümlesi) |
| Kapanış kartındaki eşitlik | 3 nm = 3 × 10⁻⁹ m |

Dayanak: program, bilimsel gösterimin fizik, kimya ve biyolojideki kullanımına ("atomun büyüklüğü" gibi) örnekler ister (`../HIKAYE-ANIMASYONLARI.md` bölüm 4, 5. satır). Hikâye dersin açılış sayısını (0,000 000 003 m) ve dersin ana görselini (basamak satırı, kayan virgül, sayaç) kullanır; yeni bilgi getirmez.

## 3. Kararlar (8 Ekim 2026)

- **Sıra:** kanca → iddia → kanıt → sağlama → kapanış (E3 ile aynı; HyperFrames'in anlatı kuralı). Listedeki üretim sırası C4, C5, A7 idi; kullanıcı A7'den başlattı.
- **Omurga:** tek resim, kesme yok. Durak → pano → saç teli → telin içi.
- **Yakınlaşma ölçekli:** saç teli planında 200 px = 10⁻⁵ m; dört kez tam 10 kat. "Aralarında dört basamak" sözü gözle görülen dört adıma çevrilir. Düzlemler, ölçek etiketi, işaretler ve sayaç tek bir derinlik değerinden (`d`) hesaplanır.
- **Durak resminden tele iniş ölçekli değil:** Ece 420 px, tel 3,5 px; gerçek oranla tel görünmezdi. Kamera 400 kat yaklaşır ve tel düzlemine erir; ölçek etiketi ancak sonra belirir.
- **Sayaç yazıldı:** 9. kare "≈ 23 000" ile biter (kullanıcı onayı).
- **Kapanış kartı krem:** tel düzleminin koyu zemininde koyu kart görünmüyordu; düzen öteki hikâyelerle aynı.
- **Çizim dili:** risograf baskı (krem kâğıt, koyu, mavi, sarı, mercan mürekkep; nokta taraması; kayık sarı). Gerekçe: kanca basılı bir reklamdır ve baskıya yaklaşınca nokta görünür; dört düz mürekkep rakamları her ölçekte keskin tutar. A8 (guaj), B7 (pastel) ve E3'ten (kâğıt kesme) ayrışır.
- **Karakter:** Ece (kurgu). Yüz ayrıntısı yok; sarı mont, sırt çantası.
- **Mercan `#D8334A`:** ilk seçilen `#E63B4A` kâğıt dişinin altında 2,8:1 karşıtlık verdi; `check` 3:1 istiyor.
- **Nokta taraması elle yazıldı:** kayıt kataloğunda `halftone-field` ve `grain-field` var; ikisi de hareketli ışık alanı, baskı taraması değil. Durağan SVG deseni kullanıldı.

## 4. Adımlar

| # | Adım | Çıktı | Durak |
|---|---|---|---|
| 1 | Niyet ve proje iskeleti | `BRIEF.md`, `hyperframes init` | bitti |
| 2 | Plan | `SCRIPT.md`, `STORYBOARD.md` | bitti (onaylandı, 8 Ekim 2026) |
| 3 | Görsel kimlik | `frame.md`, 1. kare | bitti (onaylandı, 8 Ekim 2026) |
| 4 | Kalan kareler (2–10) | `index.html`, `kareler/` | kuruldu; **kullanıcı: kareleri ve sessiz önizlemeyi görür** |
| 5 | Ses | `assets/ses/01–10.mp3`, eşitlenmiş kopyalar `assets/ses-esit/` | bitti (8 Ekim 2026; George, 852 karakter) |
| 6 | Zamanlama | `T` tablosu gerçek klip sürelerine çekildi; 10 `<audio>` öğesi | bitti |
| 7 | Doğrulama | `check`, kare görüntüleri | — |
| 8 | Son önizleme ve işleme | `renders/a7-3-nanometre.mp4`, `kapak.jpg` | işlendi (8 Ekim 2026, kullanıcı isteğiyle: 73,5 sn, 26,8 MB, `--crf 23`); kapak 8. saniyeden (480×270); altyazı dosyası yapılmadı |
| 9 | Derse bağlama | A7'nin son sahnesi; `tema.js` içine `hikayeler` satırı; `olc.js`, `denetle.js` | bitti (8 Ekim 2026): A7'nin 4. sahnesi video sahnesi; `sure.js` A7'yi 3:15'ten 4:31'e çekti; `olc.js` ve `denetle.js` temiz |

## 5. Riskler

- **"3 nm" gerçek bir ölçü değil.** Çipin üretim kuşağının adıdır. Hikâye "en küçük parça 3 nanometre" demez; çipin içi çizilmez. A7 dersinin açılış sorusu ("çipin en küçük parçası") aynı gerekçeyle gevşek; A konusu kapalı olduğu için dokunulmadı.
- **Saç teli kalınlığı kişiye göre değişir** (yaklaşık 2 × 10⁻⁵ ile 2 × 10⁻⁴ m). 7 × 10⁻⁵ kurgudur; anlatımda "yaklaşık" sözü var.
- **Üslü sayılarla bölme derste yok.** Karşılaştırma bölmeyle değil, virgülün basamak sayısıyla yapılır; ekrana bölme yazılmaz.
- **"Nanometre" sözcüğü derste geçmiyor.** Ders "metrenin milyarda üçü" diyor; hikâye birimin adını reklamdan alır ve aynı cümleyle açıklar. Onaylı listedeki hâli de böyle.

- **Anlatıcı George:** kullanıcı bu hikâyede erkek ses istedi; beş Türkçe ve altı İngilizce örnek arasından George'u seçti. Derslerin anlatıcısı değişmedi. Harcanan karakter: Gamze ile ilk üretim 852 (kullanılmadı, `assets/ses-gamze/`), örnekler 1.177, George ile 743 (1. klip örnekten alındı).
- **Süre 73,5 sn:** hedef aralığın (45–75 sn) üst ucunda. Konuşma 61,7 sn; geri kalan, kare açılışları ve 8. karedeki dört yakınlaşma.

## 6. Açık kararlar

1. Kullanıcı filmi derste sesli izler; yanlış okunan kelime varsa o satır yeniden üretilir ve film yeniden işlenir.
2. Müzik ve efekt (öteki hikâyelerle ortak karar).

Kapananlar (8 Ekim 2026): çizim dili risograf baskı; senaryo (Ece, durak, 10 satır); 9. karede "≈ 23 000" yazılır.

## 7. Doğrulanmayanlar

- Saç teli kalınlığı aralığı ve "3 nm"nin kuşak adı olduğu bilgisi `../HIKAYE-ANIMASYONLARI.md` içindeki doğruluk notlarından alındı; bu oturumda yeniden kaynak aranmadı.
- Klipler dinlenmedi: George İngilizce etiketli bir ses, Türkçe okunuşu ve yönergelerin etkisi kulakla denetlenmedi. Süreler ve duraklamalar ölçüldü.
- Film baştan sona oynatılıp izlenmedi; on üç anın görüntüsüne ve `check` sonucuna bakıldı.
