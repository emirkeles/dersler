# 9. sınıf dersleri

Etkileşimli kısa derslerden oluşan, bağımlılıksız statik bir site (saf HTML, CSS, JS, SVG). Derleme adımı yok; sayfalar dosyadan açılır.

## Yapı

```
index.html                    ana sayfa
<ders>/<tema>/               bir temanın içeriği: index.html, tema.js, a1-….html, dersler/, ses/, hikaye/
ortak/                        ders motoru (ders.js, ders.css), katalog.js, site.js, site.css, API.md
ortak/sablon/                 yeni tema için çalışan şablon (tema sayfası, tema.js, kit.js, örnek kısa ders)
araclar/                      olc.js, sure.js, denetle.js, ses-uret.js, hikaye-ses.js (yalnızca geliştirme)
plan/KURALLAR.md              bütün temalar için bağlayıcı kurallar
plan/ISLEME.md                bir temayı baştan sona işleme alma adımları
plan/YOL-HARITASI.md          sıradaki işler ve sıraları
plan/YURUTME.md               bu sıranın yürütülmesi: adımlar, alt ajan modelleri, bitiş ölçütleri
plan/<ders>/TEMALAR.md       dersin temaları ve durumları
plan/<ders>/<tema>/          MUFREDAT.md, PLAN.md, senaryolar/
```

Adlar: Ders (Matematik) → Tema (Sayılar) → Konu (A) → Kısa ders (A1). Örnek tema: `matematik/sayilar/`.

## "Şu temayı işleme al"

Kullanıcı bir temayı işleme almanı isterse (örnek: "geometrik-sekiller temasını işleme al") `plan/ISLEME.md` dosyasını baştan sona uygula: açık soruları oradaki kurallarla kapat, senaryoları yaz, temanın sayfasını ve kısa derslerini yaz, denetle, raporla. Adımlar arasında onay bekleme, soru sorma; kararlarını `PLAN.md` içine yaz ve sür. Kaldığın yeri `plan/<ders>/<tema>/DURUM.md` dosyasında tut; dosya varsa oradan devam et. Tema adı ile klasörü `plan/<ders>/TEMALAR.md` içinde eşleşir.

## Önce oku

- `plan/KURALLAR.md`: müfredat kuralı, içerik kaynağı (ders kitabı), deney ve ürün isteyen çıktılar, kısa ders biçimi, yazı bütçesi, çizim ve resim, paralel çalışma.
- `plan/ISLEME.md`: yazım adımları ve her adımın bitiş ölçütü.
- `ortak/API.md`: ders motorunun API'si, ders ve tema iskeleti, araçlar.
- Üzerinde çalıştığın temanın `plan/<ders>/<tema>/MUFREDAT.md` ve `PLAN.md` dosyaları.
- `plan/YOL-HARITASI.md`: sıradaki işler ve hangi sırayla yapılacakları.
- `plan/YURUTME.md`: bu sıranın nasıl yürütüleceği. Kullanıcı "yürütme planını uygula" derse bu dosya ilk bitmemiş adımdan sürdürülür: ana oturum planlar ve denetler, yazım `model: "sonnet"`, komut ve sayım `model: "haiku"` alt ajanlarıyla yapılır.

## Bir tema üzerinde çalışırken

- Yalnızca `<ders>/<tema>/` ve `plan/<ders>/<tema>/` altına yaz. `ortak/`, `araclar/`, `index.html` ve öteki temalara dokunma; eksik görürsen raporla.
- Müfredat bağlayıcıdır: programda olmayan konu ekleme, olanı atlama.
- Kısa dersin `id` alanı `<tema kimliği>-<kod>` olur ve `tema.js` içindeki satırıyla uyuşur.
- Temayı yayına alma (`ortak/katalog.js` içindeki `yayinda: true`), seslendirme ve görsel üretme, commit ve push yapma; kullanıcı ayrıca ister.

## Denetim

```
cd araclar && npm install                      # ilk kullanımda
node araclar/olc.js <tema>/<kod>              # bir kısa ders: taşma, üst üste yazı, yazı bütçesi
node araclar/sure.js <ders>/<tema>            # tema: kısa derslerin yaklaşık süresini ölçer, tema.js satırına yazar
node araclar/denetle.js <ders>/<tema>         # tema: katalog, kimlikler, sahne sayıları, kırık bağlantı; `kural: 2` temada çıkış sorusu, hatırla, konu tekrarı
node araclar/sure.js <ders>/<tema> --yazma --kural   # yazmadan: anlatım kuralları sayımı (eski temalar için de)
```

Komutlar proje kökünden çalıştırılır. Chrome kendiliğinden bulunur (kurulu Chrome ya da HyperFrames'in başsız Chrome'u); başka bir yol `CHROME_PATH` ile verilir. İş bitti demeden önce `olc.js` ve `denetle.js` temiz olmalı; anlatımı, sahnesi ya da seslendirmesi değişen temada önce `sure.js` yeniden çalıştırılır.

## Working Style

- When a step doesn't need my input, keep going. Stop only when you can't continue without me, or before anything destructive.
- For multi-step work, keep a checklist in `TASKS.md`; tick items as you finish them and add anything new you discover.
- End every long run with three headings: **Blocked on me**, **Changed**, **Found**.
- For research, mark anything you couldn't confirm and say where you looked.
