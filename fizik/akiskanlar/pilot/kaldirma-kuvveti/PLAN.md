# Kaldırma kuvveti figürü: uygulama planı

12 Ekim 2026'da yazıldı. Bu dosya tek başına yeter; önceki oturumun bağlamı gerekmez.

## 1. Amaç ve kapsam

Anatomy skill'iyle (<https://github.com/wheresryan22/anatomy>) Arşimet düzeneğini anlatan **tek başına** bir izometrik figür sayfası üretmek. Skill'in iş akışı (SKILL.md, 1–10. adımlar) olduğu gibi uygulanır.

Kapsam dışı, bilerek:

- Ders motoru bağı yok: `ortak/ders.js`, `c.tween`, tahta renkleri, `dersler/…-sekil.js` üretimi yapılmaz.
- Projenin görsel dili (`ortak/API.md`: degrade ve parlama yasağı, renk rolleri, yazı bütçesi) bu figüre uygulanmaz. Geçerli olan skill'in kendi kurallarıdır: kendi kartı, kendi tonları, önce açık tema.
- `olc.js`, `denetle.js`, `sure.js` çalıştırılmaz; denetim skill'in araçlarıyla yapılır.

Projeden geçerli kalanlar: yalnızca `fizik/akiskanlar/` altına yaz; `ortak/`, `araclar/`, `index.html`, öteki temalara dokunma; commit ve push yapma; ilerlemeyi `TASKS.md` içindeki "Anatomy: kaldırma kuvveti figürü" bölümünde işaretle; işi **Blocked on me / Changed / Found** başlıklarıyla bitir.

Tek oturumda, alt ajan açmadan yapılır.

## 2. Kurulum (ilk iş)

1. Skill kurulu değilse kur: `git clone https://github.com/wheresryan22/anatomy.git ~/.claude/skills/anatomy`. Torricelli pilotu `689dcf9` commit'iyle yapıldı; daha yenisi gelirse `CHANGELOG.md` dosyasına bak. Skill listede görünmüyorsa `/reload-skills`; yine görünmüyorsa `~/.claude/skills/anatomy/SKILL.md` dosyasını doğrudan oku ve uygula.
2. Chrome: bu makinede kurulu Chrome yok. Skill'in betikleri için:
   `export CHROME_PATH="$(find ~/.cache/hyperframes/chrome -type f -name chrome-headless-shell | head -1)"`
3. Kit kopyası: `kit/iso-kit.mjs`, `kit/lathe.mjs`, `kit/tube.mjs`, `kit/audit.mjs` ve `LICENSE` dosyalarını `fizik/akiskanlar/pilot/kaldirma-kuvveti/kit/` altına kopyala (birbirini yalnızca bu dört dosya içe aktarır). `capture.mjs`, `drive.mjs`, `lines.mjs` kopyalanmaz; skill klasöründen çalıştırılır.
4. Okuma sırası (hepsi skill klasöründe; büyük dosyalar bölüm bölüm okunur):
   - `SKILL.md` tamamı.
   - `references/walkthrough.md` tamamı (kısa; tasarımın nasıl yapıldığı).
   - `references/craft.md` bölüm 1–8 ve 10.
   - `references/kit.md` bölüm 1–8 ve 10–12.
   - `references/motion.md` tamamı.
   - `references/verify.md`: Capture, Drive, Line ends, Audit, Close-ups, The review checklist, Common faults.
   - Örnekler: `examples/dial-indicator/build.mjs` (en küçük, iskelet), `examples/test-rig/` (cam, yay, kadranlı gösterge), `examples/arcade-cabinet/build.mjs` (kayıt tutucu ve `--audit`, sayfada aynı modülden yeniden kurulan hareketli parçalar).
   - Okunmaz: `webgl.md`, `3d.md`, `react.md` (bkz. bölüm 9, karar 1).
5. Başvuru olarak bakılabilir, örnek alınmaz: `fizik/akiskanlar/pilot/torricelli/build.mjs`. Kitin Türkçe sayfada nasıl kullanıldığını gösterir, ama skill'in istediği geometri denetimini kurmadı ve tahta renklerine uyarlandı. Bu figürde ikisi de yapılmayacak.

## 3. Doğru sayılar (skill adım 2)

Ders kitabı (MEB 9. sınıf fizik; proje klasöründe durmaz, indirme yolu bellekteki `ders-kitabi-pdf-okuma` notunda):

- s. 170: Arşimet ve Kral Hiero'nun tacı; Arşimet külçeyi ve tacı suya daldırıp **taşan suyun ağırlığını** ölçer.
- s. 173, 175: kaldırma kuvveti cismin **batan hacmi**, **sıvının yoğunluğu** ve **g** ile artar; g ≈ 9,8 m/s².
- s. 180: F_k = (h₂ − h₁) · d_s · g · A = V_batan · d_s · g.
- Kitap hazır bir deney düzeneği ve ölçüm sayısı **vermiyor** (öğrenci tasarlıyor). Aşağıdaki ölçüler bu plandaki seçimlerdir; hepsi modelden hesaplanır.

Model (1 birim = 1 mm; `model.mjs` içinde saf fonksiyonlar):

| Nicelik | Değer |
|---|---|
| Sıvı | su, d = 1000 kg/m³; g = 9,8 m/s² |
| Silindir | alüminyum (2700 kg/m³), yarıçap 20 mm, boy 80 mm → V = 100,5 cm³, G = 2,66 N |
| Tam batınca | F_k = 0,985 N; dinamometre 1,675 N |
| Dinamometre | 0–5 N, 50 mm'de tam ölçek → k = 0,1 N/mm; G'de 26,6 mm uzar, tam batınca 9,85 mm kısalır |
| Taşırma kabı | iç çap 90 mm, ağız (musluk) yüksekliği 120 mm; başta musluğa kadar dolu |
| Toplama kabı | iç çap 60 mm; 100,5 cm³ su 35,5 mm yükselir |
| Terazi | kadranlı, darası alınmış, newton ölçekli: taşan suyun ağırlığı 0–0,985 N; tam tur 2 N |

Durum ve denklemler:

- Girdi: taşıyıcının indirilme miktarı `d` (mm; 0'da silindirin tabanı su yüzeyine değer). Aralık 0–130.
- Yay kısaldıkça silindir yükselir, bu yüzden batma `s` ile `d` aynı değildir: ilk inişte `s = d / 1,12315` (s ≤ 80), sonra `s = d − 9,85`. Katsayı d_s · g · A_silindir / k = 0,12315'ten gelir.
- F_k = d_s · g · A_silindir · min(s, 80). Tam battıktan sonra derinlik artsa da F_k değişmez; figür bunu göstermeli.
- Taşan hacim `V_tasan` geri dönmez: şimdiye kadarki en büyük batan hacimdir. Silindir geri çekilince kaptaki yüzey musluğun altına iner; yüzey, batma ve yay birlikte çözülür (tek bilinmeyenli, parça parça doğrusal; ikiye bölmeyle 30 adım yeter).
- Terazi W = d_s · g · V_tasan. Göstergedeki "azalma" G − T ile "taşan su" W aynı sayıdan türemez, ayrı hesaplanır; en derin konumda eşit çıkmaları modelin doğrulamasıdır.
- Sıfırlama açık bir eylemdir: toplama kabı boşalır, taşırma kabı yeniden dolar (1,2 sn'lik zarfla; aniden değil).

## 4. Nesne (skill adım 3)

Bir laboratuvar tezgâhındaki **Arşimet düzeneği**: kremayerli statife asılı yaylı dinamometre ve ucundaki metal silindir, altında cam taşırma kabı, musluğunun altında kadranlı terazinin üstünde duran toplama kabı.

Tek cümle: *Silindir suya indikçe dinamometrenin göstergesi yukarı kayar, terazinin ibresi döner; dinamometredeki azalma ile terazideki ağırlık hep aynı sayıdır.*

## 5. Boyut ve süre (skill adım 1)

Yaklaşık 75–90 parça, düz SVG, WebGL katmanı yok, boru ve yuvarlak parçalar olduğu için geometri denetimi zorunlu. Figür ile Hero sınırında; tahmin **1,5–2,5 saat**. Skill'in kuralı: ilk saat dolmadan tarayıcıda açılan bir sayfa olsun, sonra derinleştir; her adımda `date` çalıştır, bir adım payının iki katını aşarsa durumu yaz.

## 6. Parça listesi (skill adım 4)

| Grup | Parçalar |
|---|---|
| Taban | plaka, 4 ayak (flanş ve ayak, tırtıllı), oluk, 4 köşe vidası (halka ve nokta), etiket plakası (üç çizgi, iki vida), cetvel şeridi, su terazisi |
| Statif | taban flanşı ve cıvataları, yaka, direk (dikiş halkaları), direk başlığı, direğe bağlı kremayer şeridi (çentikler şeridin kenarına köklü), sürgü gövdesi, pinyon yuvası, tırtıllı çevirme düğmesi ve işaret çizgisi, kilit vidası, yatay kol, kol ucunda askı kancası |
| Dinamometre | üst halka, gövde borusu, önündeki ölçek penceresi (açıklık kuralı: iç duvarlar çizilir, içerik pencereye kırpılır), ölçek çentikleri, pencereden görünen yay (ön ve arka yarım), gösterge diski, alt çubuk (salmastradan çıkan tek çubuk: `G.rodOut`), alt kanca |
| Konu | silindir (yanan tek parça), üstündeki halka vida, iki bant çizgisi |
| Taşırma kabı | yükseltme bloğu, cam kap (arka yarım, ön yarım), ağız halkası, musluk borusu (`kit/tube.mjs`; kapta flanş, serbest ucunda eliptik ağız), su (oyuk ton takımı), su yüzeyi |
| Toplama | cam beher, ölçek çizgileri (kenara köklü), içindeki su ve yüzeyi, musluktan behere akış çizgisi (yalnızca su taşarken) |
| Terazi | gövde, 4 küçük ayak, kefe ve kefe mili, kadran (yukarı bakan disk, çentikler, sıfır işareti), ibre, sıfırlama düğmesi, tek kazınmış yazı ("N") |

Her parça başka bir parçanın üstünde durur. Liste 40'ın çok üstünde; eksik kalan çıplak yüz olursa oraya düzeneğe ait gerçek bir parça eklenir.

## 7. Dünya, kamera, boyama sırası (skill adım 5–7)

- Yerleşim: statif arkada solda, taşırma kabı ortada yükseltme bloğunun üstünde, terazi ve toplama kabı önde sağda musluğun altında. Musluk izleyiciye doğru değil, ekranda yana uzanmalı.
- Kamera: azimut 45–55° arası denenir (kadran ve ölçek penceresi izleyiciye baksın), yükseklik açısı 34–38° (kapların içine bakmak için). `fitProjection` ile; görünüm kutusu 600 × 520 dolayında.
- Tonlar: taban `lo`, statif ve terazi `mid`, dinamometre ve kaplar `hi`, **tek `lit` parça silindir**. Su renk değildir: figürün kendi mürekkebinin bir tonu, oyuk ton takımıyla (`craft.md` bölüm 7).
- Boyama sırası tuzakları:
  - Silindir kabın içine girer: kap arka ve ön yarıma bölünür (arka duvar → su → silindir → ön duvar ve ağız).
  - Silindirin su altındaki kısmı su yüzeyindeki yaya kırpılır ve oyuk tonlarıyla çizilir; kırpma yüzeyle birlikte kayar.
  - Yay pencerenin içinde: arka yarım → çubuk → ön yarım; hepsi pencereye kırpılır.
  - Direkten geçen sürgü: direk altta ve üstte iki parça.
  - Dinamometre çubuğu tek çubuktur (`G.rodOut`, `A.slide`); üst üste kopya yok.
- Kayıt: her çizim yardımcısı şeklini `A.recorder` içine yazar; anahtarlar `A.settle` ile oturur; derleme `A.auditOrExit` ile biter. Göz kararı anahtar ayarı yapılmaz.

## 8. Kart, hareket, etkileşim (skill adım 8–9)

- Kart: "Şekil 2", başlık "Arşimet düzeneği", ipucu, canlı gösterge. Göstergenin biçimi: `dinamometre 1,68 N · azalma 0,98 N · taşan su 0,98 N`; sıfırlanırken `sıfırlanıyor`. Sayılar parçaların o anki yerinden okunur, hedeften değil. Açıklama ve iki üç lejant anahtarı kartın altında; çizimin içinde "N" dışında yazı yok. Sayfa dili Türkçe (`lang="tr"`), ondalık virgülle.
- Döngü: tek `requestAnimationFrame` döngüsü, zaman tabanlı, hedefe üstel yaklaşma; yay gerçek sertliğiyle. Ekran dışında ve oturunca durur; azaltılmış harekette hedefe atlar.
- Boşta tur: 1,4 sn sonra başlar; yavaşça indir (tam batana ve 20 mm daha derine), 2 sn bekle, kaldır, sıfırla, yinele. Dokununca durur, 3,6 sn sonra sürer.
- İşaretçi: sahnedeki düşey konum `d` değerine eşlenir. Klavye: yukarı ve aşağı ok 2 mm (Shift ile 10), Home en üst, End en derin, Enter sıfırlar. `role="slider"`, `aria-valuetext` sözle.
- Akış çizgisi ve sıfırlama zarfla girer ve çıkar; hiçbir şey aniden belirmez.

Dosyalar (`fizik/akiskanlar/pilot/kaldirma-kuvveti/`):

```
model.mjs         saf model; derleme ve sayfa aynı kodu kullanır
build.mjs         geometri, kayıt, kart; --light ve --audit
live.js           sayfadaki döngü (derlemede satır içine alınır)
kit/              kit kopyası ve LICENSE
kaldirma-kuvveti.html, kaldirma-kuvveti-light.html   üretilmiş sayfalar
```

## 9. Verilmiş kararlar

1. **WebGL yok.** Su düz SVG tonlarıyla çizilir. Skill gölgelendiriciyi yalnızca çizginin çizemediği şeyler için ister ve SVG'nin tek başına okunmasını zaten şart koşar. Sayfa bittikten sonra kullanıcı isterse su için tek bir WebGL katmanı ayrı iş olarak eklenir (o zaman `webgl.md` okunur, iş Hero boyutuna çıkar).
2. **Tek kontrol: indirme.** Tuzlu su ya da başka cisim seçimi bu sürümde yok; tek mekanizma kuralı.
3. **Önce açık tema**, koyu tema ikinci derleme.
4. **Kaplar cam.** Silindirin batan kısmı görünmek zorunda. Cam işlenişi için önce `examples/test-rig/` ve `examples/spot-plate/` incelenir.

## 10. Bitiş ölçütleri (skill adım 10)

Hepsi sağlanmadan iş bitmiş sayılmaz; sağlanamayan açıkça raporlanır.

- [x] `node build.mjs --audit` ve `node build.mjs --light --audit`: `audit passed`, her satır 0.
- [x] `node <skill>/scripts/lines.mjs` iki temada ve her dinlenme pozunda `line ends: 0`: üstte, yarı batık, tam batık, derinde, geri çekilmiş, sıfırlanmış.
- [x] Görüntüler (hepsi açılıp bakılır): masaüstü, 390 px, işaretçiyle, turun birkaç anı, azaltılmış hareket; konsol temiz, yana kayma yok.
- [x] Her birleşimin 4× yakın çekimi iki temada: statif ve sürgü, kremayer, kol ve kanca, dinamometre penceresi ve yay, çubuğun salmastradan çıkışı (dinlenmede ve tam strokta), silindirin su yüzeyini kestiği yer, musluğun kaba ve ağza bağlandığı yerler, beher, kadran ve ibre.
- [x] Sayı denetimi: `drive.mjs` ile beş pozda gösterge okunur; en derin pozda "azalma" ile "taşan su" eşit, tam battıktan sonra derinleşince ikisi de değişmiyor, geri çekince dinamometre G'ye dönüyor ama "taşan su" kalıyor.
- [x] `references/verify.md` içindeki gözden geçirme listesi baştan sona işaretlenir.
- [x] `TASKS.md` bölümü güncel; proje dışına ve `fizik/akiskanlar/` dışına yazılmadı.

## 11. Başlangıç cümlesi

Bağlam sıfırlandıktan sonra:

> `fizik/akiskanlar/pilot/kaldirma-kuvveti/PLAN.md` dosyasını uygula.

## 12. Uygulama sonucu (12 Ekim 2026)

Bölüm 10'daki ölçütlerin hepsi sağlandı. Plandan sapmalar:

- **İndirme aralığı 0–125 mm** (plan 0–130). 130'da silindirin tabanı kabın tabanına 0,15 mm giriyordu.
- **Görünüm kutusu 560 × 620** (plan 600 × 520 dolayında). 125 mm iniş, 80 mm silindir ve 132 mm kap üst üste gelince düzenek enine değil boyuna büyüyor. Kamera azimut 48°, yükseklik 36°.
- **Askılar kanca ve halka değil, bilyalı mafsal.** Kol ucunda sap ve bilya, silindirin üstünde pul, sap ve bilya, çubuğun ucunda yüksük. Sapın kenarı bilyanın yüzeyine oturur; kanca ve halkanın boru olarak çizilip denetlenmesi bu ölçekte (yaklaşık 5 px) karşılığını vermezdi.
- **Dinamometre çubuğu `A.slide` ile kaydedilmedi.** `A.slide` salmastrayı sabit sayar; burada salmastra da iniyor. Çubuk gerçek boyuyla, içi boş kaydedilen gövdenin ve somunun içinden geçen düz bir disk olarak kaydedildi. Çizim plandaki gibi tek çubuk ve `G.rodOut`. `A.slide` direkte kullanıldı: sürgünün altında ve üstünde kalan direk, sürgüyle uzayıp kısalan iki çubuk.
- **Kremayer şeridi ayrı kaydedilmedi**; direk öğelerinin çiziminin parçası. `A.slide` yalnızca yuvarlak kesit biliyor.
- **Su kayıtlı katı değil.** Taşırma kabındaki ve toplama kabındaki su ile akış, yerleşik sıranın ayrılmış yuvalarında çizilir. Seviye, tam boy çizilmiş sütunun aşağı kaydırılıp kabın tabanında kırpılmasıyla değişir.
- **Sıfırlama önce silindiri sudan çıkarır**, sonra toplama kabını boşaltıp taşırma kabını doldurur. Model sudayken sıfırlamayı da doğru çözer ama o zaman "azalma" ile "taşan su" ayrılır.
- **Eklenen parçalar:** direkte durdurma bileziği ve vidası, kol ucu bloğu, dinamometrede tırtıllı kapak ve salmastra somunu, kabı tutan iki pim, terazide etiket levhası ve havalandırma yarıkları.
- **Eklenen dosya:** `model-sina.mjs` (modelin sayı denetimi).

### Ders motoru bağı (sonradan, kullanıcı isteğiyle)

Bölüm 1 bunu kapsam dışı bırakmıştı; kullanıcı figürün dersin konusuna eklenmesini istedi. Torricelli pilotundaki yol izlendi:

- `build.mjs` her derlemede `fizik/akiskanlar/dersler/arsimet-sekil.js` dosyasını da yazar (`window.ARSIMET`: `kur`, `poz`, `dur`, `sifir`, `oku`, `nokta`, `bak`, `kadraj`, `sabit`). Kit, model ve çizim kodu modüle gömülür; tonlar tahtanın rengine çekilir, kadrandaki "N" çıkarılır (tahtada 12 px altı yazı olmaz), CSS animasyonu yoktur.
- Çizim kodu `ciz.js` içine ayrıldı; tek başına sayfa (`live.js`) ve ders modülü aynı `cizimKur` fonksiyonunu kullanır.
- Pilot ders: `fizik/akiskanlar/p2-kaldirma-kuvveti-pilot.html` ve `dersler/p2-kaldirma-kuvveti-pilot.js`. Akışkanlar planındaki Konu D, D2'nin (Arşimet İlkesi, FİZ.9.3.6 a ve b) iki sahnelik kesiti. Model ders kitabından (s. 180); ölçüler örnek veri, figürün modelinden.
- Tema işleme alınmadığı için ders `tema.js` içinde değil ve siteden bağlantısı yok; dosyadan açılır.

Yeniden üretme:

```
node model-sina.mjs
node build.mjs --audit && node build.mjs --light --audit
node ~/.claude/skills/anatomy/scripts/lines.mjs kaldirma-kuvveti-light.html
node araclar/olc.js akiskanlar/p2          # proje kökünden
```
