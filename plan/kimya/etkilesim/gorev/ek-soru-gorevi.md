# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Kimya · Etkileşim)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `kimya/etkilesim/`. Tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır. Aşağıda `G` = `plan/kimya/etkilesim/gorev`, `T` = `kimya/etkilesim`.

## Bu temanın düzeni

Sekiz konu, on sekiz ders; tema sırası: A1, A2; B1, B2; C1, C2; D1; E1, E2, E3; F1, F2, F3; G1; H1, H2, H3, H4. Her kısa ders kendi dosyasındadır: `T/dersler/<kod>-<ad>.js` (340–980 satır). **Ders dosyaları okunmaz ve elle düzenlenmez**; üç araç bunun içindir:

- Dersin dökümü: `node G/ders-ozeti.cjs <kod> [<kod> …]` → başlık, giriş sorusu, sahneler, özet, çıkış soruları (cevap yerleriyle) ve sahnelerdeki bütün metinler (altyazı, tahta yazısı, defter notu, sahne içi sorular, şıkları, ipuçları). Çıktıyı bir dosyaya yazıp `Read` ile oku (`… > <geçici klasör>/b1.txt`; ders başına 150–250 satır). Dökümde `${ad}` gibi parçalar kodda doldurulan yerlerdir.
- Konunun bütün çıkış soruları, şıkları ve geri bildirimleri: `node G/ders-ozeti.cjs --sorular <harf>`.
- Soru ekleme: `node G/soru-ekle.cjs <kod> <sorular.json>` (aşağıda).

Çizim araçları `T/dersler/kit.js` içindedir (`window.KIT`, 48 satır; tamamını oku). Kısaca:

- `yazi(c, p, x, y, metin, { size, kalin, renk, hiza })`: tek satır; `hiza` verilmezse ortalı, `'start'` sola dayalı. Satır kendiliğinden bölünmez.
- `kart(c, p, baslik, satirlar, { x, y, w, h, renk, size })`: çerçeve, başlık (36 birim) ve ortalı satırlar (`satirlar` dizi; her satır ayrı yazılır, bölünmez).
- `belir(c, el, ms)`; `orbitalKutusu(c, p, x, y, adet, { renk, ayni })` (80×82 kutu, içinde `adet` ok); `elektronOku(c, p, x, y, yon, { renk })`; `cubuklar(c, p, adlar, degerler, { birim, baslik, kaynak, max, renk })`.
- Çizgi aracı yok: `c.S('line', { x1, y1, x2, y2, stroke: RENK.cizgi, 'stroke-width': 3 }, g)`.
- Renkler `RENK` içinde: `a` (mavi), `b` (turuncu), `vurgu` (sarı), `cizgi`, `soluk`. Konunun rengi (accent) görev iletisinde; başlıklarda o kullanılır.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `node G/ders-ozeti.cjs --sorular a` (A1 ve A2'de son iki soru sonradan eklendi: üçüncüsü yeni durum, dördüncüsü yanılgı).
- Konu tekrarı dersi: `T/dersler/a3-tekrar.js` (tamamı) ve `T/a3-tekrar.html`.
- Motorun API'si: `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü.
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, öteki konuların dosyaları okunmaz. Önceki konularda bir terimin öğretilip öğretilmediğini `grep -l "<terim>" T/dersler/*.js` ile, gerekiyorsa o dersin dökümüyle kontrol et.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her dersin dökümünü oku. Sonra o derse iki soru yaz:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (derste kullanılmamış bir element, dizilim, ürün, etiket ya da gündelik bağlam). Dersin kendi örnekleri, sahne içi sorular ve var olan çıkış soruları yinelenmez; aynı bağlam konunun başka dersinde de kullanılmaz.
- **Biri dersin hedeflediği yanılgıyı sınar** (giriş sorusu, özet cümlesi, sahne hedefleri ve var olan geri bildirimler yanılgıyı gösterir). İyi kalıp: bir öğrencinin yanlış cümlesi verilir, doğru karşılık sorulur.
- **Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır.** Derste söylenmemiş bir bilgi doğru şıkkın dayanağı olamaz; soru metni gereken veriyi verir (atom numarası, dizilim, pH değeri, tablodaki yer). **Sonraki derslerin terimi soruda, şıkta ya da geri bildirimde geçmez.** Kuşkulu terimi `grep -l` ile doğrula.
- **Bu temaya özgü sınırlar:**
  - Yeni elementte dizilim, grup, periyot ya da iyon yükü yalnızca derste öğretilen kuralla bulunabiliyorsa sorulur. Kuralın istisnası olan elementler (örnek: Cr, Cu ve benzerleri) yalnızca derste o istisna öğretildiyse kullanılır.
  - **Sayısal değer uydurulmaz:** yarıçap, iyonlaşma enerjisi, elektronegatiflik, ölçüm sonucu gibi değerler ya dersteki sayılardır ya da soru yalnızca yönü (artar, azalır, hangisi büyük) sorar. Yön soruları, derste öğretilen genel eğilimin istisnasına denk gelmeyecek biçimde seçilir (örnek: aynı periyotta 2A–3A ve 5A–6A arası iyonlaşma enerjisi karşılaştırması ancak derste öğretildiyse; köşegen karşılaştırma yapılmaz: biri hem sağda hem aşağıdaysa eğilim tek cevap vermez).
  - Güvenlik sorularında (B konusu) doğru davranış yalnızca derste söylenen önlemdir; dersin vermediği ilk yardım ya da kimyasal bilgisi eklenmez.
  - Bilim insanı, yıl, kurum adı yalnızca derste geçtiği kadar kullanılır.
- Biçim: `{ "q", "options", "answer", "why", "scene" }`. **Üç şık.** `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin neyi karıştırdığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin dökümdeki sırası (0'dan başlar).
- **Yalnızca bir şık doğru olmalı.** "Hepsi", "hiçbiri" şıkkı yazılmaz. Doğru şık ötekilerden belirgin biçimde uzun olmaz ve biçimiyle ele vermez: "Haklı; … / Haksız; … / Haklı; …" dizilişinde tek kalan şık doğru cevabı gösterir; böyle sorularda doğru şık, aynı yargıyla başlayan iki şıktan biridir (biri doğru gerekçe, biri yanlış gerekçe). Çeldiriciler gerçekten yanlış olmalı: "bir bakıma doğru" olan şık çeldirici yapılmaz (örnek: plastik için hem "organik kimya" hem "polimer kimyası" şıkkı).
- **Doğru şıkkın yeri sorudan soruya değişir ve konuda aynı yerde toplanmaz.** Görev iletisi eklenecek soruların cevap yerlerini sayıyla verir (0, 1, 2).
- Yazım: kesme `’`, tırnak `“ ”`, ondalık virgül, eksi `−` (U+2212); soru ve şık HTML olduğundan küçüktür ve büyüktür `&lt;` `&gt;`. Dizilimler, iyonlar ve simgeler derste yazıldığı biçimde yazılır (dökümdeki yazım: üs ve yük için Unicode üst simge, "1s² 2s² 2p⁶", "Na⁺", "Cl⁻"; grup "1A", "8A"). Öğrenciye "kitap", "sayfa", "sınıf", "derste gördüğün" denmez; geri bildirimde de "derste" denmez, kuralın kendisi söylenir.
- Aynı konunun soruları aynı kişiyle ya da aynı kalıpla başlamaz.
- Soruları bir JSON dosyasına yaz (geçici klasörde, `<kod>.json`: iki soruluk dizi) ve ekle:

  ```
  node G/soru-ekle.cjs b1 <geçici klasör>/b1.json
  ```

  Araç soruları `quiz` dizisinin sonuna ekler, var olan sorulara dokunmaz, sonucu doğrular ve yeni cevap yerlerini yazar. "HATA" verirse dosya değişmemiştir; JSON düzeltilip yeniden çalıştırılır. Bir derse araç yalnızca bir kez çalıştırılır (ikinci çalıştırma yeni soru ekler); eklenmiş bir soruyu düzeltmek gerekirse ders dosyasında `grep -n` ile o sorunun metnini bul ve yalnızca o metni `Edit` ile değiştir. Şıkların sırasını değiştirmek için: `node G/sik-sirala.cjs <kod> <soru no, 1'den> <sıra>` (örnek sıra `2,0,1`: eski üçüncü şık başa gelir).
- E3 ve G1 dosyalarında sorular `ust('…')` sarmalıyla yazılıdır (üst simgeyi `<sup>` yapar); `soru-ekle.cjs` bu iki dosyada "son sorunun yeri bulunamadı" der ve dosyayı değiştirmez. Orada iki soru `quiz` dizisinin sonuna aynı biçimle elle eklenir (üst simge içeren metin `ust(…)` içinde) ve `--sorular <harf>` ile doğrulanır.
- `nextLesson` satırlarına dokunma: konunun son dersi tekrar dersine bağlandı.

## 2. Konu tekrarı dersi

Dosyalar: `T/dersler/<kod>-tekrar.js` ve `T/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `a3-tekrar` ile aynı yapı:

- Sayfa `a3-tekrar.html` kopyasıdır: başlık ve betik adı değişir. Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi).
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından, özetlerinden ve anlatımından derlenir; sayısı görev iletisinde) tahtada tek tek gösterilir. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', '<anahtar>')`: derste aynı kural için bir not varsa onun metni ve başlığı kullanılır (`grep -n "c.note(" T/dersler/<kod>-*.js`; bu temada derslerdeki notların anahtarı yoktur); anahtar `etkilesim-<ad>` olur. Sonraki kurala geçmeden önce eski yazı kaldırılır (`a3` içindeki `sil`). Tahta yalın tutulur: başlık ve iki üç satır, yan yana iki kart ya da iki sütunlu satırlar. Yeni resim eklenmez. Dizilim, orbital kutusu ve çubuk gösterimi için kitteki araçlar kullanılabilir; değerler dersteki değerlerdir.
- Anlatım derslerdeki cümlelere dayanır: kuralı dersteki sözcüklerle söyle, yeni örnek ve yeni terim ekleme.
- Tahtadaki yazının rengi `yazi(..., { renk })` ile verilir (kit `style: 'fill:…'` yazar; `fill` özniteliğini `ders.css` ezer).
- Rakam, kısaltma, simge, formül ya da yabancı ad içeren altyazıya okunuşu `speak` ile yazılır. Temanın okunuş kararları:
  - pH → "pehaş".
  - Orbital harfleri: s "se", p "pe", d "de", f "fe" ("1s²" → "bir se iki"; "s bloğu" → "se bloğu"). Ek alan orbital açılır: "2p’ye" → "iki pe orbitaline".
  - Kuantum sayısı n → "ne" ("en yüksek n" → "en yüksek ne değeri"; "ns" → "ne se").
  - Element simgesi → elementin adı, ek ada göre ("Li’nin" → "lityumun"). İyon: "Na⁺" → "artı bir yüklü sodyum iyonu", "Cl⁻" → "eksi bir yüklü klor iyonu".
  - Bileşik formülü harf harf: NaClO → "ne a ce le o", HCl → "ha ce le".
  - Grup: "1A" → "bir A", ek açılır ("2A’dır" → "iki A grubudur"); "2. gruptur" → "ikinci gruptur".
  - İE₁, İE₂, İE₃ → "birinci, ikinci, üçüncü iyonlaşma enerjisi".
  - Yabancı adlar: Bohr → "Bor", Heisenberg → "Haysenbörg", Thomson → "Tamsın", Rutherford → "Raterford", Pauling → "Poling", IUPAC → "ayupak". Aufbau, Pauli, Hund yazıldığı gibi.
  - Sayılar yazıyla ("iki yüz derecede", "sıfır virgül yüz otuz miligram").
  - Konunun derslerindeki öteki okunuşlar: `grep -n "speak:" T/dersler/<kod>-*.js | cut -c1-240`. Yönerge gerekirse yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.
- Ardından `quizTitle: 'Karışık sorular'` ile görev iletisindeki sayıda soru, üç şıklı: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; derslere dağılımı görev iletisinde. Sorular derslerin çıkış sorularını (eskileri ve yeni eklenenleri: `--sorular <harf>` ile bak) ve sahne içi soruları yinelemez. Hepsinde `scene: 0`. Doğru şıkkın yerleri görev iletisinde; bölüm 1'deki soru kuralları burada da geçerlidir.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 yazı öğesi; yazı en az 28 birim (1000×562 çizimde). **Tahtada sayılar ve işaretler de kelime sayılır** ("·", "→", "°C", "1s²" birer kelimedir): "Sos B · 200 °C" beş kelimedir. 1000 birimlik tahtada 32 birimlik satıra yaklaşık 50, 420 birimlik kartta 30 birimlik satıra 22 harf sığar.
- `intro`, `goals`, `summary` `a3` örneğindeki gibi; `id: 'etkilesim-<kod>'`; `accent` ve `nextLesson` görev iletisinde.

## Kapsam

Yalnızca görev iletisinde sayılan derslere `soru-ekle.cjs` ile soru ekleme, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekler), `kit.js`, `tema.css`, öteki konuların dosyaları, `ses/`, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik çizim aracı tekrar dersinin kendi dosyasında yazılır ve raporlanır. Aynı anda başka ajanlar öteki konularda çalışıyor; onların dosyalarına bakma.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js etkilesim/<kod> --goruntu <geçici klasör>/olc 2>&1 | tail -8` (kod `b3`, `c3`, …; `b3-tekrar` değil). "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Ölçüm aracı sahneyi kendisi oynatır ve her altyazıda bir görüntü alır (`s01-NN.png`, sonuncusu `s01-son.png`). Her kuraldan bir görüntüye bak (kuralın son altyazısındaki kare); aynı görüntüye iki kez bakma, düzeltmeden sonra yalnızca değişen kuralı gör. En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur. Ölçüm bir iki dakika sürer: komut tek ders için ve en az 300 sn zaman aşımıyla çalıştırılır; boş dönerse (başka ajan da ölçüyor olabilir) bir kez yeniden çalıştır.
- Soru eklenen derslerden birini aynı komutla (görüntüsüz) ölç: "sayfa kayıyor 0", "panel yana taşıyor 0", "konsol temiz" olmalı. **Eski derslerin sahnelerindeki öteki sayaçlar düzeltilmez, raporlanmaz.**
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); ders dosyası `cat` ile dökülmez.

## Rapor

Kısa tut. Her ders için eklenen iki sorunun metni, doğru şıkkı ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu (şıkları ve geri bildirimleri yazma; ana oturum araçla okur); konunun yeni cevap yerleri; tekrar dersinin kuralları (başlıkları) ve sorularının cevap yerleri; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir bilgiye dayanma kuşkusu, birden çok doğru şık kuşkusu, uydurma sayı kuşkusu, derste belirsiz bulduğun bilgi); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.

## Sık yapılan hatalar (ana oturumun denetiminden)

- Son kural tahtada kalır: son `c.note(...)` ile kapanış altyazısı ("Şimdi bu konunun sorularını karışık sırayla çöz.") arasında `sil` çağrılmaz; yoksa ders boş tahtayla biter.
- Doğru şık ötekilerden uzun yazılır; çeldiriciler de aynı uzunlukta ve aynı kalıpta kurulur.
- İki kartlı tahtada başlık, kart başlıkları, kart satırları ve alt satır birlikte 25 kelimeyi aşar (`a3` üçüncü kuralda 28 çıktı; alt satır silindi).
- Rapordaki cevap yerleri elle sayılmaz; `node G/ders-ozeti.cjs --sorular <harf>` çıktısındaki "cevap yerleri" satırından kopyalanır.
- Geri bildirimde "derste" denmez; kuralın kendisi söylenir. Kaynak olarak "Ders kitabı, s. …" yazılmaz.
- Aynı konunun soruları aynı kişiyle başlamaz ("Bir kimyager…" üç soruda art arda).
- Sorudaki veriyle şıklar tutarlı olmalı: dizilimdeki elektron sayısı atom numarasına, iyon yükü proton ve elektron sayısına uymalı; yazmadan önce say.
