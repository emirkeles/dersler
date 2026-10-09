# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Fizik · Kuvvet ve Hareket)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `fizik/kuvvet-ve-hareket/`. Tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır. Aşağıda `G` = `plan/fizik/kuvvet-ve-hareket/gorev`, `T` = `fizik/kuvvet-ve-hareket`.

Görev iletisi üç türden birini ister: **yalnızca soru ekleme** (bölüm 1), **yalnızca tekrar dersi** (bölüm 2) ya da ikisi birlikte. İstenmeyen bölüm uygulanmaz.

## Bu temanın düzeni

Altı konu, yirmi dört ders; tema sırası: A1, A2; B1, B2; C1–C9; D1, D2; E1–E7; F1, F2. Her kısa ders kendi dosyasındadır: `T/dersler/<kod>-<ad>.js` (270–850 satır, 24–67 KB). **Ders dosyaları okunmaz ve elle düzenlenmez**; üç araç bunun içindir:

- Dersin dökümü: `node G/ders-ozeti.cjs <kod> [<kod> …]` → başlık, giriş sorusu, sahneler, özet, çıkış soruları (cevap yerleriyle) ve sahnelerdeki bütün metinler (altyazı, tahta yazısı, defter notu, sahne içi sorular, şıkları, ipuçları). Çıktıyı bir dosyaya yazıp `Read` ile oku (`… > <geçici klasör>/b1.txt`; ders başına 150–310 satır). Dökümde `${ad}` gibi parçalar kodda doldurulan yerlerdir; sayısal örneklerin bir bölümü böyle doldurulur, o yüzden bir sayıyı dökümde göremiyorsan derste "öğretildi" sayma.
- Konunun bütün çıkış soruları, şıkları ve geri bildirimleri: `node G/ders-ozeti.cjs --sorular <harf>`.
- Soru ekleme: `node G/soru-ekle.cjs <kod> <sorular.json>` (aşağıda).

Çizim araçları `T/dersler/kit.js` içindedir (`window.KIT`, 264 satır; yalnızca tekrar dersi yazan ajan okur, tamamını). Kısaca:

- `yazi(c, p, x, y, metin, { size, kalin, renk, hiza })`: tek satır; `hiza` verilmezse ortalı, `'start'` sola dayalı. Satır kendiliğinden bölünmez; boy verilmezse 30.
- `kutu(c, p, x, y, w, h, { renk, fill, rx, kalin })`, `cizgi(c, p, x1, y1, x2, y2, { renk, kalin, kesik })`, `daire`, `yol`.
- `ok(c, p, x1, y1, x2, y2, { renk, kalin, uc, kesik })` vektör oku; `okCiz(c, g, ms)` oku çizerek belirtir. `yonGulu(c, p, x, y)`.
- `izgara(c, p, { kare, sutun, satir, x, y, yon, olcek })` kareli düzlem: `iz.vektor(i, j, di, dj, { renk, ad })`, `iz.sayim(v)`, `iz.nokta(i, j)`, `iz.P(i, j)`. `P(i, j)` sol alttan `i` kare sağ, `j` kare yukarıdır.
- `kart(c, p, x, y, w, h, metin, { renk, size })`: çerçeve ve ortalı satırlar (`metin` dizi olabilir). Başlığı yoktur; **başlıklı kart ve iki sütunlu satır için `a3-tekrar.js` içindeki yerel `kart` ve `ikili` yardımcılarına bak** (gerekirse kendi dosyana kopyala).
- `tablo(c, p, { x, y, satir, size, sutunlar: [{ ad, w }] })` → `t.satir([hücreler], { renk })`. `sayiDogrusu(c, p, { x0, x1, y, min, max, adim, birim })`. `gosterge`, `insan`, `araba`, `otobus`.
- `belir(c, el, ms)`, `gizle(...els)`, `sol`, `kaybol`.
- Renkler `RENK` içinde ve tema boyunca sabit: `a` = birinci vektör (mavi), `b` = ikinci vektör (turuncu), `r` = bileşke (yeşil); ayrıca `mor`, `vurgu`, `turkuaz`, `cizgi`, `soluk`, `yazi`. Konunun rengi (accent) görev iletisinde; başlıklarda o kullanılır.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `node G/ders-ozeti.cjs --sorular a` (A1 ve A2'de son iki soru sonradan eklendi: üçüncüsü yeni durum, dördüncüsü yanılgı).
- Konu tekrarı dersi (yalnızca tekrar dersi yazacaksan): `T/dersler/a3-tekrar.js` (tamamı) ve `T/a3-tekrar.html`.
- Motorun API'si (yalnızca tekrar dersi yazacaksan): `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü.
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, öteki konuların dosyaları okunmaz. Önceki konularda bir terimin öğretilip öğretilmediğini `grep -l "<terim>" T/dersler/*.js` ile, gerekiyorsa o dersin dökümüyle kontrol et.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her dersin dökümünü oku. Sonra o derse iki soru yaz:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (derste kullanılmamış bir nicelik, araç, yolculuk, spor, oyun ya da gündelik bağlam; derste kullanılmamış sayılar). Dersin kendi örnekleri, sahne içi sorular ve var olan çıkış soruları yinelenmez; aynı bağlam konunun başka dersinde de kullanılmaz.
- **Biri dersin hedeflediği yanılgıyı sınar** (giriş sorusu, özet cümlesi, sahne hedefleri ve var olan geri bildirimler yanılgıyı gösterir). İyi kalıp: bir öğrencinin yanlış cümlesi verilir, doğru karşılık sorulur.
- **Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır.** Derste söylenmemiş bir bilgi doğru şıkkın dayanağı olamaz; soru metni gereken veriyi verir. **Sonraki derslerin terimi soruda, şıkta ya da geri bildirimde geçmez.** Bu temada sık karışan sıra: "bileşke" C4'te, "uç uca ekleme" C5'te, "paralelkenar" C6'da, "bileşen" C7'de; "konum" ve "referans noktası" E1'de, "yer değiştirme" E2'de, "ortalama ve anlık sürat" E3'te, "hız" (yönlü) E4'te, "ivme" E5'te tanımlanır (B konusu hız, yer değiştirme, kuvvet gibi nicelikleri yalnızca "yön ister" örneği olarak anar; orada bu kadarıyla kullanılır). Kuşkulu terimi `grep -l` ile doğrula.
- **Bu temaya özgü sınırlar:**
  - **Sayı uydurma, yazmadan önce hesapla.** Sayısal soruda verilen sayılarla doğru şıkkı kendin hesapla ve hesabı rapora yaz (tek satır). Sayılar zihinden bölünebilir seçilir (72 km/h → 20 m/s gibi dönüşüm ancak derste dönüşüm öğretildiyse sorulur). Ondalık virgülle yazılır.
  - Soruda **çizim yoktur**; vektör soruları sözle ya da kare sayısıyla kurulur ("3 kare sağ, 2 kare yukarı", "doğuya 4 N, batıya 6 N"). Okuyanın kafasında tek bir resim oluşmalı.
  - Dik iki vektörün bileşkesinin **büyüklüğü** yalnızca derste o hesap yapıldıysa (3-4-5 gibi) ve aynı türden sayılarla sorulur; aksi hâlde yön ya da "kaç sağ, kaç yukarı" sorulur. Açı, sinüs, kosinüs, karekök sorulmaz.
  - Formül yalnızca derste yazıldığı biçimde kullanılır (ortalama sürat = yol ÷ süre gibi). Ders bir niceliği yalnızca nitel anlatıyorsa (hareket türleri, dört temel kuvvet) soru da nitel kalır.
  - Dört temel kuvvette menzil, şiddet sırası, etkilediği parçacık gibi bilgiler yalnızca derste söylendiği kadar kullanılır; sayı (10³⁸ gibi) yalnızca dökümde varsa.
  - Trafik (E7) sorularında gerçek yasa, ceza, sınır değeri uydurulmaz; yalnızca dersteki değerler ya da soruda verilen değerler.
  - Bilim insanı, yıl, kurum adı yalnızca derste geçtiği kadar kullanılır.
- Biçim: `{ "q", "options", "answer", "why", "scene" }`. **Üç şık.** `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin neyi karıştırdığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin dökümdeki sırası (0'dan başlar).
- **Yalnızca bir şık doğru olmalı.** "Hepsi", "hiçbiri" şıkkı yazılmaz. Doğru şık ötekilerden belirgin biçimde uzun olmaz ve biçimiyle ele vermez: "Haklı; … / Haksız; … / Haklı; …" dizilişinde tek kalan şık doğru cevabı gösterir; böyle sorularda doğru şık, aynı yargıyla başlayan iki şıktan biridir (biri doğru gerekçe, biri yanlış gerekçe). Çeldiriciler gerçekten yanlış olmalı: "bir bakıma doğru" olan şık çeldirici yapılmaz.
- **Doğru şıkkın yeri sorudan soruya değişir ve konuda aynı yerde toplanmaz.** Görev iletisi eklenecek soruların cevap yerlerini sayıyla verir (0, 1, 2).
- Yazım: kesme `’`, tırnak `“ ”`, ondalık virgül, eksi `−` (U+2212), çarpı `·` ya da `×` (derste hangisi yazıldıysa); soru ve şık HTML olduğundan küçüktür ve büyüktür `&lt;` `&gt;`. Birimler derste yazıldığı biçimde: "m/s", "km/h", "m/s²", "N", "kg"; sayı ile birim arasında boşluk ("20 m/s"). Vektör adları derste yazıldığı gibi (dökümden bak). Öğrenciye "kitap", "sayfa", "sınıf", "derste gördüğün" denmez; geri bildirimde de "derste" denmez, kuralın kendisi söylenir.
- Aynı konunun soruları aynı kişiyle ya da aynı kalıpla başlamaz.
- Soruları bir JSON dosyasına yaz (geçici klasörde, `<kod>.json`: iki soruluk dizi) ve ekle:

  ```
  node G/soru-ekle.cjs b1 <geçici klasör>/b1.json
  ```

  Araç soruları `quiz` dizisinin sonuna ekler, var olan sorulara dokunmaz, sonucu doğrular ve yeni cevap yerlerini yazar. "HATA" verirse dosya değişmemiştir; JSON düzeltilip yeniden çalıştırılır. Bir derse araç yalnızca bir kez çalıştırılır (ikinci çalıştırma yeni soru ekler); eklenmiş bir soruyu düzeltmek gerekirse ders dosyasında `grep -n` ile o sorunun metnini bul ve yalnızca o metni `Edit` ile değiştir. Şıkların sırasını değiştirmek için: `node G/sik-sirala.cjs <kod> <soru no, 1'den> <sıra>` (örnek sıra `2,0,1`: eski üçüncü şık başa gelir).
- Araç "son sorunun yeri bulunamadı" derse dosya değişmemiştir: iki soruyu `quiz` dizisinin sonuna, dosyadaki öteki sorularla aynı biçimde elle ekle, `node --check` ve `--sorular <harf>` ile doğrula, raporla.
- `nextLesson` satırlarına dokunma: konunun son dersi tekrar dersine bağlandı.

## 2. Konu tekrarı dersi

Dosyalar: `T/dersler/<kod>-tekrar.js` ve `T/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `a3-tekrar` ile aynı yapı:

- Sayfa `a3-tekrar.html` kopyasıdır: başlık ve betik adı değişir. Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi).
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından, özetlerinden ve anlatımından derlenir; sayısı görev iletisinde) tahtada tek tek gösterilir. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', '<anahtar>')`: derste aynı kural için bir not varsa onun metni ve başlığı kullanılır (`grep -n "c.note(" T/dersler/<harf>*.js | cut -c1-400`); anahtar `kuvvet-<ad>` olur (derslerdeki anahtarlar yinelenmez). Sonraki kurala geçmeden önce eski çizim kaldırılır (`a3` içindeki `sil`). Tahta yalın tutulur: başlık ve iki üç satır, yan yana iki kart, iki sütunlu satırlar ya da küçük bir çizim (kareli düzlemde bir iki ok, sayı doğrusu). Çizimde kitteki araçlar kullanılır; değerler dersteki değerlerdir. Yeni resim, yeni örnek, yeni sayı eklenmez.
- Anlatım derslerdeki cümlelere dayanır: kuralı dersteki sözcüklerle söyle, yeni örnek ve yeni terim ekleme.
- Tahtadaki yazının rengi `yazi(..., { renk })` ile verilir (kit `style: 'fill:…'` yazar; `fill` özniteliğini `ders.css` ezer).
- Rakam, kısaltma, simge, formül ya da yabancı ad içeren altyazıya okunuşu `speak` ile yazılır. Temanın okunuş kararları:
  - SI → "se i" ("SI’da" → "Se i sisteminde", "SI birimi" → "se i birimi").
  - Birimler açık okunur: m/s → "metre bölü saniye", km/h → "kilometre bölü saat", m/s² → "metre bölü saniyekare", N → "newton", kg → "kilogram", °C → "derece selsiyus". Sembol harfi tek başına: m "me", kg "ka ge", s "se", N "ne", K "ke".
  - joule → "jul", pascal → "paskal".
  - Sayılar yazıyla ("bin sekiz yüz metre", "üç virgül beş").
  - Vektör adları, kısaltmalar ve konunun öteki okunuşları derslerdeki gibi: `grep -n "speak:" T/dersler/<harf>*.js | cut -c1-240` (önce buna bak; aynı simge için derste ne yazıldıysa o).
  - Yönerge gerekirse yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.
- Ardından `quizTitle: 'Karışık sorular'` ile görev iletisindeki sayıda soru, üç şıklı: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; derslere dağılımı dengeli. Sorular derslerin çıkış sorularını (eskileri ve yeni eklenenleri: `--sorular <harf>` ile bak) ve sahne içi soruları yinelemez. Hepsinde `scene: 0`. Doğru şıkkın yerleri görev iletisinde; bölüm 1'deki soru kuralları burada da geçerlidir.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 yazı öğesi; yazı en az 28 birim (1000×562 çizimde; kitin `sayim`, `yonGulu`, `izgara` ölçek yazısı gibi 22–24 birimlik yazıları tekrar dersinde kullanılmaz ya da `size` verilerek büyütülür). **Tahtada sayılar ve işaretler de kelime sayılır** ("·", "→", "=", "m/s" birer kelimedir): "sürat = yol ÷ süre" beş kelimedir. 1000 birimlik tahtada 32 birimlik satıra yaklaşık 50, 420 birimlik kartta 30 birimlik satıra 22 harf sığar. İki sütunlu satır tek yazı öğesi olsun diye `a3` içindeki `ikili` (bir `text`, iki `tspan`) kullanılır.
- `intro`, `goals`, `summary` `a3` örneğindeki gibi; `id: 'kuvvet-ve-hareket-<kod>'`; `accent` ve `nextLesson` görev iletisinde.

## Kapsam

Yalnızca görev iletisinde sayılan derslere `soru-ekle.cjs` ile soru ekleme ya da yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekler), `kit.js`, öteki konuların dosyaları, `ses/`, `hikaye/`, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik çizim aracı tekrar dersinin kendi dosyasında yazılır ve raporlanır. Aynı anda başka ajanlar öteki konularda (ve aynı konunun öteki derslerinde) çalışıyor; onların dosyalarına bakma, `git status` çıktısındaki öteki değişikliklere dokunma.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js kuvvet-ve-hareket/<kod> --goruntu <geçici klasör>/olc 2>&1 | tail -8` (kod `b3`, `c10`, …; `b3-tekrar` değil). "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Ölçüm aracı sahneyi kendisi oynatır ve her altyazıda bir görüntü alır (`s01-NN.png`, sonuncusu `s01-son.png`). Her kuraldan bir görüntüye bak (kuralın son altyazısındaki kare); aynı görüntüye iki kez bakma, düzeltmeden sonra yalnızca değişen kuralı gör. En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur. Ölçüm bir iki dakika sürer: komut tek ders için ve en az 300 sn zaman aşımıyla çalıştırılır; boş dönerse (başka ajan da ölçüyor olabilir) bir kez yeniden çalıştır.
- Yalnızca soru ekleyen ajan ölçüm yapmaz (ana oturum sonra hepsini ölçer); `node --check` ve `--sorular <harf>` yeter.
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); ders dosyası `cat` ile dökülmez.

## Rapor

Kısa tut. Her ders için eklenen iki sorunun metni, doğru şıkkı ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu (şıkları ve geri bildirimleri yazma; ana oturum araçla okur); sayısal sorularda tek satırlık hesap; konunun yeni cevap yerleri; tekrar dersinin kuralları (başlıkları) ve sorularının cevap yerleri; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir bilgiye dayanma kuşkusu, birden çok doğru şık kuşkusu, uydurma sayı kuşkusu, derste belirsiz bulduğun bilgi); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.

## Sık yapılan hatalar (ana oturumun denetiminden)

- Son kural tahtada kalır: son `c.note(...)` ile kapanış altyazısı ("Şimdi bu konunun sorularını karışık sırayla çöz.") arasında `sil` çağrılmaz; yoksa ders boş tahtayla biter.
- Doğru şık ötekilerden uzun yazılır; çeldiriciler de aynı uzunlukta ve aynı kalıpta kurulur.
- İki kartlı tahtada başlık, kart başlıkları, kart satırları ve alt satır birlikte 25 kelimeyi aşar.
- Rapordaki cevap yerleri elle sayılmaz; `node G/ders-ozeti.cjs --sorular <harf>` çıktısındaki "cevap yerleri" satırından kopyalanır.
- Geri bildirimde "derste" denmez; kuralın kendisi söylenir. Kaynak olarak "Ders kitabı, s. …" yazılmaz.
- Aynı konunun soruları aynı kişiyle başlamaz ("Bir sürücü…" üç soruda art arda).
- Sorudaki veriyle şıklar tutarlı olmalı: yol, süre ve sürat birbirini tutmalı; iki vektörün toplamı kare sayısıyla doğru çıkmalı; yazmadan önce hesapla.
- Soru metni cevabı vermez: gerekçeyi ya da kuralı soru cümlesine yazıp sonra onu sorma.
