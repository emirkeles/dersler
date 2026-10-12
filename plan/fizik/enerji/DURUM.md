# Durum — Fizik · Enerji

Son güncelleme: 12 Ekim 2026 (ikinci oturumun sonu: işleme alma bitti). Kullanıcı temayı yol haritası sırasının önünde istedi ("enerji temasını işleme al"); Akışkanlar başka bir oturumda sürüyor. Yürütme `../../YURUTME.md` 3. adımdaki düzenle; izometrik figürler `IZOMETRIK.md`.

**Kullanıcı kararı (12 Ekim 2026): "bu plan için token sınırı kuralını boşver."** `YURUTME.md` "Bağlam bütçesi" bölümündeki oturum sınırları ve ajan başına token hedefleri bu temada uygulanmaz. İş bölümü (bir ajan bir ders, kapalı okuma listesi, ana oturumun denetimi) aynen kalır.

| Adım | Durum |
|---|---|
| 1 Müfredat | bitti (7 Ekim 2026) |
| 2 Plan | bitti (kararlardan sonraki ders listesi: 15 kısa ders + 6 konu tekrarı) |
| 2b Ders kitabı | bitti (s. 206–254; `PLAN.md` bölüm 8, 93 satır) |
| 3 Kararlar | bitti (`PLAN.md` bölüm 7, 23 karar) |
| 4 Senaryolar | bitti: A (ana oturum), B, C, D, E, F (beş Sonnet ajanı); hepsi denetlendi, hesapları yeniden yapıldı |
| 5 İskelet | bitti: `index.html`, `tema.js` (`kural: 2`), `dersler/kit.js`, altı konu araç dosyası (`a-` … `f-araclar.js`), altı figür modülü (`*-sekil.js`), `gorev/` (ders, senaryo, figür görev tanımları) |
| 6 Dersler | bitti: 21 / 21 dosya, `olc.js` temiz; her dersin en az bir karesine ana oturum baktı |
| 7 Denetim | bitti (12 Ekim 2026): `sure.js` uyarısız (tema 189:59; tek not E2 15:24), `denetle.js` "21 kısa ders, yayında değil. Sorun yok.", tema sayfası (6 konu, 21 kısa ders, F1 hikâyesi; konsol temiz), `PLAN.md` bölüm 4'te sahne numaraları, `TEMALAR.md` |
| 8 Rapor | verildi (12 Ekim 2026) |

| Kısa ders | Sahne | Süre | olc | Ana oturum denetimi |
|---|---|---|---|---|
| A1 | 6 | 9:13 | temiz | ana oturum yazdı; bütün sahnelere bakıldı |
| A2 | 7 | 8:29 | temiz | üç kare; sahne 5'te çubuk boyları düzeltildi |
| A3 tekrar | 1 + 8 soru | 4:22 | temiz | son kare |
| B1 | 8 | 10:31 | temiz | iki kare; sahne 5 kapanışı düzeltildi ("Önce ölçek, sonra sayı") |
| B2 | 8 | 9:35 | temiz | figür büyütüldü (ajana bir tur); iki kare |
| B3 | 8 | 10:59 | temiz | iki kare |
| B4 | 7 | 8:35 | temiz | iki kare (sahne 2, 6); hesaplar yeniden yapıldı (C = 2.090 J/°C, ΔT = 5 °C, Q = 10.450 J) |
| B5 tekrar | 1 + 9 soru | 4:20 | temiz | son kare |
| C1 | 9 | 10:30 | temiz | figür büyütüldü; iki kare; tencere kartı düzeltildi |
| C2 | 8 | 9:04 | temiz | iki kare; su bitince termometre 100 °C'ta kalacak biçimde düzeltildi |
| C3 | 10 | 10:15 | temiz | iki kare (sahne 4, 9); 300 · 334 = 100.200 J |
| C4 tekrar | 1 + 8 soru | 4:50 | temiz | son kare |
| D1 | 8 | 11:12 | temiz | bir kare; "öz ısı" → "ısı sığası" (sahne 6) |
| D2 | 8 | 12:16 | temiz | beş kare; metin, sayılar, cevaplar ve defter senaryoyla tutuyor; sahne 2'de açıklama satırları sönmeden kart beliriyordu (üst üste yazı 1), sıraya alındı; tablolar altı yerine üç sütunlu (aşağıda) |
| D3 tekrar | 1 + 7 soru | 4:22 | temiz | son kare |
| E1 | 7 | 10:43 | temiz | bir kare |
| E2 | 12 | 15:24 | temiz | yedi kare; metin senaryoyla tutuyor; sahne 9'da figür tahtanın soluna yaslıydı, ortaya alındı; 15 dakikayı geçiyor, bölünmedi (aşağıda) |
| E3 tekrar | 1 + 8 soru | 4:14 | temiz | son kare |
| F1 | 9 | 12:50 | temiz | dört kare; metin ve sayılar senaryoyla tutuyor; formül yok, dört etmen ayrı sahnelerde |
| F2 | 9 | 13:43 | temiz | iki kare; bir soru cümlesi düzeltildi |
| F3 tekrar | 1 + 8 soru | 4:32 | temiz | son kare |

Figürler (hepsi bitti; geometri ve çizgi denetimi iki temada 0, ders motorunda iki boyutta temiz; ana oturum her birini tahtada gördü):

| Figür | Modül | Boyut | Not |
|---|---|---|---|
| Ş1 Üç ölçekli termometre | `TERMO`, `termometre-sekil.js` | 104 KB | pano tam önden; termometre panonun yarığında |
| Ş2 İkiz ısıtma düzeneği | `ISITMA`, `isitma-sekil.js` | 257 KB | iki istasyonun termometreleri ekranda aynı yükseklikte değil: sıcaklık sayıyla yazılır |
| Ş3 Isıl denge düzeneği | `DENGE`, `denge-sekil.js` | 198 KB | iki sütun aynı hizada; erlenmayerin termometresi kabıyla taşınır |
| Ş4 Kesit oda | `ODA`, `oda-sekil.js` | 230 KB | termometre ölçeği 0…50 °C |
| Ş5 Isı iletim düzeneği | `ILETIM`, `iletim-sekil.js` | 279 KB | ölçek 0…100 °C; üç uç aynı hizada; sınıra 21 KB kaldı |
| Ş6 Duvar ve çift cam | `DUVAR`, `duvar-sekil.js` | 155 KB | ölçek –10…50 °C; iki termometre aynı hizada |

## Birinci oturumda öğrenilenler

- **Figür büyük kurulur.** Senaryolar figür çizilmeden yazıldı ve figürü küçük kutuya koyuyordu (h 240–330); o boyda düzenek simge gibi kalıyor. Kural `gorev/ders-gorevi.md` içinde ("Figür büyük kurulur"); B2 ve C1 bir düzeltme turuyla yeniden kuruldu, sonraki dersler baştan böyle yazıldı.
- **Konu renkleri figürde.** Ş2 ilk hâliyle tahtada soluktu; tahta tonları açıldı, termometre sütunu sarı, su mavi, alev ve kızgın yüzey turuncu oldu (`sekil/parcalar.mjs`).
- **Araç dosyası hataları** ders ajanlarınca bulundu ve ana oturumda düzeltildi: `KIT_B.cozumKarti` (dördüncü satır eskisinin üstüne biniyordu), `KIT_C.grafik` (sıfır uzunluklu parça nokta gibi görünüyordu), `KIT_C.sicaklikEtiketi` (eksi işareti). C2, B4 ve C3 kendi yerel sarmalayıcılarını taşıyor; zararsız.
- **İçerik düzeltmeleri:** C1'de "kapağı kapatılan tencerede su daha geç kaynar" kartı düdüklü tencere oldu (senaryo ve ders); E2 senaryosunda havasız odada peteğin eli soğuttuğunu ima eden kare çıkarıldı; D'de "son sıcaklık kütlesi büyük olana yakın" cümlesi "ısı sığası büyük olana yakın" oldu.

## İkinci oturumda verilen kararlar (12 Ekim 2026)

- **E2 15:24, bölünmedi.** Dersin fikri tek: ısının ilerleme biçimi benzeyen durumlar gruplanır, gruplara ad verilir, yeni durumlar bu adlarla sınıflanır. Sahne 4–11 aynı üç adın uygulamasıdır (program uygulama metnindeki sorular ve sera etkisi); ikinci bir kavram yok. Bölünseydi kısa ders sayısı 16 olur, saat başına 0,89 ile 0,85 sınırını aşardı (`ISLEME.md` 3, kural 5 ve 7).
- **D2'de tablolar üç sütunlu.** Senaryo altı sütunlu tek tablo istiyordu (madde, kütle, öz ısı, ilk sıcaklık, son sıcaklık, değişim); tahtadaki 25 kelime sınırına sığmadığı için ders ajanı her deneye değişen şeyi ve son sıcaklığı gösteren üç sütunlu tablo kurdu, kap bilgisi figürün etiketlerinde, öz ısı sahne 2'de "c" ve "c / 2" olarak. Programın istediği dört veri (ilk sıcaklık, son sıcaklık, kütle, öz ısı) üç tabloda ve etiketlerde yer alıyor; olduğu gibi bırakıldı. Sahne 8'de "Devam" düğmesi kapısız (görev tanımındaki kural).
- **F1 sahne 4'te suyun "80 °C" ve "sıcak su" etiketi son karede yok** (25 kelime sınırı; altyazı söylüyor, sahne 7'de görünüyor). Olduğu gibi bırakıldı.
- Senaryo ile ders arasındaki öteki farklar yalnızca ajanların eklediği bağlama altyazılarıdır ("Sıcaklıklar eşitlenene kadar bekliyoruz." gibi); bilgi ya da sayı eklenmemiş.

## Sıradaki

İşleme alma bitti. Kullanıcıyı bekleyenler:

1. **İzleme.** Özellikle bakılacak dersler: E2 (15:24, 12 sahne), D2 (üç sütunlu tablolar; sahne 8 kaydırıcı), F1 (sahne 7'de "kalınlık" etiketleri çubukların ayaklarına yakın), B2–C3 (Ş2'de iki istasyonun termometreleri ekranda aynı yükseklikte değil; karşılaştırma sayıyla).
2. **Push** (istenirse): tema ve kayıtları `main` üzerinde commit edildi (12 Ekim 2026), push edilmedi. `main` canlı siteyi yayınlar; tema katalogda kapalı olduğu için sayfalar listelenmez.
3. **Seslendirme** (ücretli; `plan/SESLENDIRME.md`): 21 ders, 1.003 altyazı (`sure.js` sayımı). Rakam ve simge içeren altyazılarda `speak` yazılı; metin denetimi yapılmadı.
4. **Yayın:** `ortak/katalog.js` içinde `yayinda: true`; F1'in hikâye satırı katalogdan `tema.js` dosyasına taşınır (karar 20).

Açık notlar:

- 750×402 ölçümünde 22 birimlik yazılar 12 px'in altında kalıyor (figürsüz sahnelerde; `ortak/API.md`'deki bilinen telefon sınırı). Figürlü derslerde yazılar 24 birim.
- Figür modülleri büyük (104–279 KB); yalnızca kullanan ders yükler. Ş5 300 KB sınırına yakın.
- Figür kaynakları `plan/fizik/enerji/sekil/` altında; yeniden üretmek için her klasörde `node build.mjs --audit`. Ortak parça önerileri (ajan raporlarından): `O.termometre` için çentiksiz cam ve ölçeğin altından kıskaç, `O.beher` için dünya biriminde çentik, `tabanPlakasi` için dönüklük, `dersModuluYaz` için figür → tahta dönüşümünü `cizimKur`'a verme. Yapılmadı; figürler şu hâliyle çalışıyor.
- Kitap ve dökümler birinci oturumun geçici klasöründe: `/private/tmp/claude-501/-Users-emirkeles-matematik-sayilar/3344e4d8-2ebc-4856-af01-2c428fd1a689/scratchpad/` (`kitap/fizik9.pdf`, `dokum/B.md` … `F.md`, `venv/`). Silinmişse `gorev/dok.py` ve `gorev/png.py` ile yeniden üretilir; `PLAN.md` bölüm 8 özetidir.
- Kitabın tutarsızlıkları `PLAN.md` bölüm 8 satırlarında parantez içinde; bakırın öz ısısı derslere alınmadı (karar 17).
- Commit edildi (12 Ekim 2026, kullanıcı istedi); push edilmedi.
- İkinci oturumun ölçüm kareleri geçici klasörde kaldı; proje klasörüne konmadı.
