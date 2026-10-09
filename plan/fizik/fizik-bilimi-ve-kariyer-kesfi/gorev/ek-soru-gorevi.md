# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Fizik · Fizik Bilimi ve Kariyer Keşfi)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `fizik/fizik-bilimi-ve-kariyer-kesfi/`. Tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır. Aşağıda `G` = `plan/fizik/fizik-bilimi-ve-kariyer-kesfi/gorev`, `T` = `fizik/fizik-bilimi-ve-kariyer-kesfi`.

## Bu temanın düzeni

Dört konu, altı ders: A1; B1, B2; C1; D1, D2. Her kısa ders kendi dosyasındadır: `T/dersler/<kod>-<ad>.js`. **Ders dosyaları okunmaz ve elle düzenlenmez**; iki araç bunun içindir:

- Dersin dökümü: `node G/ders-ozeti.cjs <kod> [<kod> …]` → başlık, giriş sorusu, sahneler, özet, çıkış soruları (cevap yerleriyle) ve sahnelerdeki bütün metinler (altyazı, tahta yazısı, defter notu, sahne içi sorular, şıkları, ipuçları). Çıktıyı bir dosyaya yazıp `Read` ile oku (`… > <geçici klasör>/b1.txt`).
- Konunun bütün çıkış soruları, şıkları ve geri bildirimleri: `node G/ders-ozeti.cjs --sorular <harf>`.
- Soru ekleme: `node G/soru-ekle.cjs <kod> <sorular.json>` (aşağıda).

Çizim araçları `T/dersler/kit.js` içindedir (`window.KIT`). Tekrar dersi için yalnızca 1–90. satırları oku (`yazi`, `kutu`, `cizgi`, `belir`, `paragraf`, `kart`, `etiket`); gerisi derslere özgü çizimlerdir. Kısaca:

- `yazi(c, p, x, y, metin, { size, kalin, renk, hiza })`: tek satır; `hiza` verilmezse ortalı, `'start'` sola dayalı.
- `kart(c, p, x, y, w, h, { baslik, metin, renk, baslikSize, size })`: çerçeve, başlık ve metin; metin kartın enine göre kendiliğinden satıra bölünür.
- `cizgi(c, p, x1, y1, x2, y2, renk)`; `kutu(c, p, x, y, w, h, { renk })`; `belir(c, el, ms)`.
- Renkler `RENK` içinde: `fizik` (sarı), `disiplin` (mavi), `dal` (yeşil), `kisi` (turuncu), `kurum` (mor), `kaynak` (turkuaz), `soluk`, `ince`. Konunun rengi (accent) görev iletisinde.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `node G/ders-ozeti.cjs --sorular a` (A1'de son iki soru sonradan eklendi: üçüncüsü yeni durum, dördüncüsü yanılgı).
- Konu tekrarı dersi: `T/dersler/a2-tekrar.js` (tamamı) ve `T/a2-tekrar.html`.
- Motorun API'si: `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü.
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, öteki konuların dosyaları okunmaz. Önceki konularda bir terimin öğretilip öğretilmediğini `grep -l "<terim>" T/dersler/*.js` ile, gerekiyorsa o dersin dökümüyle kontrol et.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her dersin dökümünü oku. Sonra o derse iki soru yaz:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (yeni bir olay, görsel, kurum işi, meslek ya da gündelik bağlam). Dersin kendi örnekleri, sahne içi sorular ve var olan çıkış soruları yinelenmez; aynı bağlam konunun başka dersinde de kullanılmaz.
- **Biri dersin hedeflediği yanılgıyı sınar** (özet cümlesi, sahne hedefleri ve var olan geri bildirimler yanılgıyı gösterir). İyi kalıp: bir öğrencinin yanlış cümlesi verilir, doğru karşılık sorulur.
- **Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır** (tema sırası: A1, B1, B2, C1, D1, D2). Derste söylenmemiş bir bilgi doğru şıkkın dayanağı olamaz: yeni durumdaki olay, dersteki bir örnekle aynı niteliği açıkça taşımalı ve soru metni gereken ipucunu vermelidir. **Sonraki derslerin terimi soruda, şıkta ya da geri bildirimde geçmez** (örnek: B1 "raf" ve "nitelik" der, alt dal adları B2'de gelir; B1 sorularında "optik", "mekanik" gibi adlar geçmez). Kuşkulu terimi `grep -l` ile doğrula.
- Biçim: `{ "q", "options", "answer", "why", "scene" }`. **Üç şık.** `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin neyi karıştırdığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin dökümdeki sırası (0'dan başlar).
- **Yalnızca bir şık doğru olmalı.** "Hepsi", "hiçbiri" şıkkı yazılmaz. Doğru şık ötekilerden belirgin biçimde uzun olmaz ve biçimiyle ele vermez: "Haklı; … / Haksız; … / Haklı; …" dizilişinde tek kalan şık doğru cevabı gösterir; böyle sorularda doğru şık, aynı yargıyla başlayan iki şıktan biridir (biri doğru gerekçe, biri yanlış gerekçe). Çeldiriciler gerçekten yanlış olmalı: "bir bakıma doğru" olan şık çeldirici yapılmaz (örnek: elektrikli bir aygıt için "enerji dönüşümü" şıkkı; bir olay için birden çok alt dalın savunulabildiği durum).
- **Doğru şıkkın yeri sorudan soruya değişir ve konuda aynı yerde toplanmaz.** Görev iletisi eklenecek soruların cevap yerlerini sayıyla verir. Bir derste eklenen iki sorunun cevabı aynı yerde olmaz; cevabı aynı yerde olan sorular her derste aynı sırada (hep üçüncü ya da hep dördüncü soru) olmaz.
- Yazım: kesme `’`, tırnak `“ ”`, ondalık virgül, eksi `−` (U+2212); soru ve şık HTML olduğundan küçüktür ve büyüktür `&lt;` `&gt;`. Terimler, adlar ve kurum adları derste geçtiği biçimde yazılır (dökümdeki yazım: "Newton’ın", "CERN", "TENMAK"). Öğrenciye "kitap", "sayfa", "sınıf", "derste gördüğün" denmez.
- Soruları bir JSON dosyasına yaz (geçici klasörde, `<kod>.json`: iki soruluk dizi) ve ekle:

  ```
  node G/soru-ekle.cjs b1 <geçici klasör>/b1.json
  ```

  Araç soruları `quiz` dizisinin sonuna ekler, var olan sorulara dokunmaz, sonucu doğrular ve yeni cevap yerlerini yazar. "HATA" verirse dosya değişmemiştir; JSON düzeltilip yeniden çalıştırılır. Bir derse araç yalnızca bir kez çalıştırılır (ikinci çalıştırma yeni soru ekler); eklenmiş bir soruyu düzeltmek gerekirse ders dosyasında `grep -n` ile o sorunun metnini bul ve yalnızca o metni `Edit` ile değiştir. Şıkların sırasını değiştirmek için: `node G/sik-sirala.cjs <kod> <soru no, 1'den> <sıra>` (örnek sıra `2,0,1`: eski üçüncü şık başa gelir).
- `nextLesson` satırlarına dokunma: konunun son dersi tekrar dersine bağlandı.

## 2. Konu tekrarı dersi

Dosyalar: `T/dersler/<kod>-tekrar.js` ve `T/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `a2-tekrar` ile aynı yapı:

- Sayfa `a2-tekrar.html` kopyasıdır: başlık ve betik adı değişir. Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi).
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından, özetlerinden ve anlatımından derlenir; sayısı görev iletisinde) tahtada tek tek gösterilir. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', '<anahtar>')`: derste aynı kural için bir not varsa onun metni, başlığı ve anahtarı kullanılır (`grep -n "c.note(" T/dersler/<kod>-*.js`); yeni notun anahtarı `fizik-<ad>` olur. Sonraki kurala geçmeden önce eski yazı kaldırılır (`a2` içindeki `sil`). Tahta yalın tutulur: başlık ve iki üç satır, yan yana iki üç kart ya da çizgiyle eşleşen satırlar. Yeni resim eklenmez; kitteki `ikon` ve `raf` kullanılmaz.
- Anlatım derslerdeki cümlelere dayanır: kuralı dersteki sözcüklerle söyle, yeni örnek ve yeni terim ekleme.
- Tahtadaki yazının rengi `yazi(..., { renk })` ile verilir (kit `style: 'fill:…'` yazar; `fill` özniteliğini `ders.css` ezer).
- Rakam, kısaltma, yabancı ad ya da simge içeren altyazıya okunuşu `speak` ile yazılır. Temanın okunuş kararları: CERN → "Sörn"; Newton → "Nüvtın" (ilk geçişte "Ayzek Nüvtın"), Galileo Galilei → "Galileyo Galiley", Kepler → "Kepler" ("Johannes Kepler" → "Yuhannes Kepler"), Einstein → "Aynştayn"; LED → "Led"; yıllar ve sayılar yazıyla ("bin dokuz yüz beşte", "yirmi yedi kilometrelik"). Konunun derslerindeki öteki okunuşlar: `grep -n "speak:" T/dersler/<kod>-*.js`. Yönerge gerekirse yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.
- Ardından `quizTitle: 'Karışık sorular'` ile görev iletisindeki sayıda soru, üç şıklı: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; derslere dağılımı görev iletisinde. Sorular derslerin çıkış sorularını (eskileri ve yeni eklenenleri: `--sorular <harf>` ile bak) ve sahne içi soruları yinelemez. Hepsinde `scene: 0`. Doğru şıkkın yerleri görev iletisinde; bölüm 1'deki soru kuralları burada da geçerlidir.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime (sayılar ve işaretler de sayılır) ve 12 yazı öğesi; yazı en az 24 birim (1000×562 çizimde; kart başlığı için `baslikSize: 26`, kart metni için `size: 26`). 300 birimlik kartta 26 birimlik satıra 18–19 harf sığar; uzun metin kendiliğinden alt satıra geçer.
- `intro`, `goals`, `summary` `a2` örneğindeki gibi; `id: 'fizik-bilimi-ve-kariyer-kesfi-<kod>'`; `accent` ve `nextLesson` görev iletisinde.

## Kapsam

Yalnızca görev iletisinde sayılan derslere `soru-ekle.cjs` ile soru ekleme, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekler), `kit.js`, öteki konuların dosyaları, `ses/`, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik çizim aracı tekrar dersinin kendi dosyasında yazılır ve raporlanır. Aynı anda başka ajanlar öteki konularda çalışıyor; onların dosyalarına bakma.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js fizik-bilimi-ve-kariyer-kesfi/<kod> --goruntu <geçici klasör>/olc 2>&1 | tail -8` (kod `b3`, `c2`, `d3`; `b3-tekrar` değil). "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Ölçüm aracı sahneyi kendisi oynatır ve her altyazıda bir görüntü alır (`s01-NN.png`, sonuncusu `s01-son.png`). Her kuraldan bir görüntüye bak (kuralın son altyazısındaki kare); aynı görüntüye iki kez bakma, düzeltmeden sonra yalnızca değişen kuralı gör. En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur. Ölçüm bir iki dakika sürer: komut tek ders için ve en az 300 sn zaman aşımıyla çalıştırılır; boş dönerse (başka ajan da ölçüyor olabilir) bir kez yeniden çalıştır.
- Soru eklenen derslerden birini aynı komutla (görüntüsüz) ölç: "sayfa kayıyor 0", "panel yana taşıyor 0", "konsol temiz" olmalı. **Eski derslerin sahnelerindeki öteki sayaçlar düzeltilmez, raporlanmaz.**
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); ders dosyası `cat` ile dökülmez.

## Rapor

Kısa tut. Her ders için eklenen iki sorunun metni, doğru şıkkı ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu (şıkları ve geri bildirimleri yazma; ana oturum araçla okur); konunun yeni cevap yerleri; tekrar dersinin kuralları (başlıkları) ve sorularının cevap yerleri; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir bilgiye dayanma kuşkusu, birden çok doğru şık kuşkusu, derste belirsiz bulduğun bilgi); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.

## Sık yapılan hatalar (ana oturumun denetiminden)

- Son kural tahtada kalır: son `c.note(...)` ile kapanış altyazısı ("Şimdi … sorularını karışık sırayla çöz.") arasında `sil` çağrılmaz; yoksa ders boş tahtayla biter.
- Doğru şık ötekilerden uzun yazılır; çeldiriciler de aynı uzunlukta ve aynı kalıpta kurulur.
- Bu temada sınıflandırma soruları öznel olabilir: bir olayın rafı, bir işin alt dalı ya da bir davranışın özelliği için yalnızca derste açıkça eşlenmiş nitelikler kullanılır ve çeldirici, sorudaki olayla hiçbir bağı olmayan bir seçenek olur.
- Rapordaki cevap yerleri elle sayılmaz; `node G/ders-ozeti.cjs --sorular <harf>` çıktısındaki "cevap yerleri" satırından kopyalanır (`c2-tekrar` raporunda bir sorunun yeri yanlış yazılmıştı).
- Geri bildirimde de "derste" denmez ("derste görsellerin hepsi aynı boydaydı" gibi); kuralın kendisi söylenir. Kaynak örneği olarak "Ders kitabı, s. …" yazılmaz; kurumun kendi sitesi gibi bir kaynak kullanılır.
- Aynı konunun soruları aynı kişiyle başlamaz ("Bir mühendis…" üç soruda art arda).
