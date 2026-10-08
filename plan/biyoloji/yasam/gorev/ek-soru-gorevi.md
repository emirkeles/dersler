# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Biyoloji · Yaşam)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `biyoloji/yasam/`. Tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır. Görev iletisi hangi işlerin sende olduğunu söyler (bazı konularda soru ekleme ile tekrar dersi ayrı ajanlardadır).

## Bu temanın düzeni

Her kısa ders kendi dosyasındadır: `biyoloji/yasam/dersler/<kod>-<ad>.js`. Dosyalar üç ayrı biçimde yazılmıştır (çok satırlı, tek satıra küçültülmüş, JSON anahtarlı); bu yüzden **ders dosyaları okunmaz ve elle düzenlenmez**. İki araç bunun içindir:

- Dersin dökümü: `node plan/biyoloji/yasam/gorev/ders-ozeti.cjs <kod> [<kod> …]` → başlık, giriş sorusu, sahneler, özet, çıkış soruları (cevap yerleriyle) ve sahnelerdeki bütün metinler (altyazı, tahta yazısı, defter notu, sahne içi sorular ve şıkları). Uzun çıktıyı bir dosyaya yazıp `Read` ile oku (`… > <geçici klasör>/b1.txt`).
- Konunun bütün çıkış soruları, şıkları ve geri bildirimleri: `node plan/biyoloji/yasam/gorev/ders-ozeti.cjs --sorular <harf>`.
- Soru ekleme: `node plan/biyoloji/yasam/gorev/soru-ekle.cjs <kod> <sorular.json>` (aşağıda).

Çizim araçları `dersler/kit.js` içindedir (`window.KIT`, 27 satır; tekrar dersi yazacaksan oku).

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `node plan/biyoloji/yasam/gorev/ders-ozeti.cjs --sorular a` (her derste son iki soru sonradan eklendi: üçüncüsü yeni durum, dördüncüsü yanılgı).
- Konu tekrarı dersi: `biyoloji/yasam/dersler/a4-tekrar.js` (tamamı) ve `biyoloji/yasam/a4-tekrar.html`.
- Motorun API'si: `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü (tekrar dersi yazacaksan).
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, öteki konuların ders dosyaları okunmaz. Önceki konularda bir terimin öğretilip öğretilmediğini `grep -l "<terim>" biyoloji/yasam/dersler/*.js` ile, gerekiyorsa o dersin dökümüyle kontrol et.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her dersin dökümünü oku. Sonra o derse iki soru yaz:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (yeni bir canlı, besin, deney düzeni ya da gündelik bağlam). Dersin kendi örnekleri, sahne içi sorular ve var olan çıkış soruları yinelenmez; aynı bağlam konunun başka dersinde de kullanılmaz.
- **Biri dersin hedeflediği yanılgıyı sınar** (özet cümlesi, sahne hedefleri ve var olan geri bildirimler yanılgıyı gösterir). Var olan iki soru zaten aynı yanılgıyı sınıyorsa dersin öteki yanılgısı seçilir. İyi kalıp: bir öğrencinin yanlış cümlesi verilir, doğru karşılık sorulur.
- **Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır** (tema sırası: A, B, C, D, E, F, G, H; konu içinde ders numarası). Derste söylenmemiş bir bilgi doğru şıkkın dayanağı olamaz. **Sonraki derslerin terimi soruda, şıkta ya da geri bildirimde geçmez**; kuşkulu bir terimin geçtiği dersleri `grep -l "<terim>" biyoloji/yasam/dersler/*.js` ile doğrula.
- Biçim: `{ "q", "options", "answer", "why", "scene" }`. **Üç şık.** `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin neyi karıştırdığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin dökümdeki sırası (0'dan başlar).
- **Yalnızca bir şık doğru olmalı.** "Hepsi", "hiçbiri" şıkkı yazılmaz. Doğru şık ötekilerden belirgin biçimde uzun olmaz ve biçimiyle ele vermez: "Haklı; … / Haksız; … / Haklı; …" dizilişinde tek kalan şık doğru cevabı gösterir; böyle sorularda iki şık aynı yargıyla başlar ve gerekçeleri ayrılır (biri doğru gerekçe, biri yanlış gerekçe). Çeldiriciler gerçekten yanlış olmalı: biyolojide "bazen doğru" olan şık çeldirici yapılmaz.
- **Doğru şıkkın yeri sorudan soruya değişir ve konuda aynı yerde toplanmaz.** Görev iletisi konunun var olan sorularında cevabın nerede toplandığını söyler; eklenenlerle birlikte üç yer dengelenir. Bir derste eklenen iki sorunun cevabı aynı yerde olmaz.
- Yazım: kesme `’`, tırnak `“ ”`, derece `37 °C` dersteki yazımıyla aynı (dökümde nasıl geçiyorsa), `pH 7`, ondalık virgül (0,5), eksi `−` (U+2212); soru ve şık HTML olduğundan küçüktür ve büyüktür `&lt;` `&gt;`. Terimler derste geçtiği biçimde yazılır (dökümdeki yazım). Öğrenciye "kitap", "sayfa", "sınıf", "derste gördüğün" denmez.
- Soruları bir JSON dosyasına yaz (geçici klasörde, `<kod>.json`: iki soruluk dizi) ve ekle:

  ```
  node plan/biyoloji/yasam/gorev/soru-ekle.cjs b1 <geçici klasör>/b1.json
  ```

  Araç soruları `quiz` dizisinin sonuna ekler, var olan sorulara dokunmaz, sonucu doğrular ve yeni cevap yerlerini yazar. "HATA" verirse dosya değişmemiştir; JSON düzeltilip yeniden çalıştırılır. Bir derse araç yalnızca bir kez çalıştırılır (ikinci çalıştırma soruları yeniden eklemez, yeni soru ekler); eklenmiş bir soruyu düzeltmek gerekirse ders dosyasında `grep -n` ile o sorunun metnini bul ve yalnızca o metni `Edit` ile değiştir.
- `nextLesson` satırlarına dokunma: konunun son dersi tekrar dersine bağlandı.

## 2. Konu tekrarı dersi

Dosyalar: `biyoloji/yasam/dersler/<kod>-tekrar.js` ve `biyoloji/yasam/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `a4-tekrar` ile aynı yapı:

- Sayfa `a4-tekrar.html` kopyasıdır: başlık ve betik adı değişir. Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi).
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından ve özetlerinden derlenir; sayısı görev iletisinde) tahtada tek tek gösterilir. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', 'yasam-<ad>')`: derste aynı kural için bir not varsa onun metni ve başlığı kullanılır (dökümde `<b>…</b>` ile başlayan satırlar defter notlarıdır). Sonraki kurala geçmeden önce eski yazı kaldırılır (`a4` içindeki `sil`). Tahta yalın tutulur: başlık ve iki üç satır, yan yana iki üç kart (`K.kart`) ya da ok ile eşleşen satırlar. Yeni resim eklenmez, `gorsel/` kullanılmaz.
- Anlatım derslerdeki cümlelere dayanır: kuralı dersteki sözcüklerle söyle, yeni örnek ve yeni terim ekleme.
- Tahtadaki yazının rengi `K.yazi(..., { renk })` ile verilir (kit `style: 'fill:…'` yazar; `fill` özniteliğini `ders.css` ezer). Renkler: konunun rengi `K.renkler.<harf>`, `var(--c2)`, `var(--c3)`, `var(--muted)`.
- Rakam, kısaltma ya da simge içeren altyazıya okunuşu `speak` ile yazılır. Temanın okunuş kararları: pH → "pehaş" ("pH’si" → "pehaşı"); DNA → "de ne a", RNA → "re ne a", ATP → "a te pe" (ek kesmeyle: "de ne a’nın"); PZR → "pe ze re"; vitamin harfleri A "a", B "be", C "ce", D "de", E "e", K "ka"; sayılar yazıyla ("otuz yedi derece"); "mavi-mor" → "mavi mor"; "anahtar-kilit" → "anahtar kilit". Yönerge gerekirse yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.
- Ardından `quizTitle: 'Karışık sorular'` ile görev iletisindeki sayıda soru, üç şıklı: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; derslere dağılımı görev iletisinde. Sorular derslerin çıkış sorularını (eskileri ve yeni eklenenleri: `--sorular <harf>` ile bak) ve sahne içi soruları yinelemez. Hepsinde `scene: 0`. Doğru şık üç yere dengeli dağılır; bölüm 1'deki soru kuralları burada da geçerlidir.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime (sayılar ve işaretler de sayılır) ve 12 yazı öğesi; yazı en az 24 birim (1000×562 çizimde). Kart içi satır 300 birimlik kartta en çok 16–17 harf sığar.
- `intro`, `goals`, `summary`, `nextLesson` `a4` örneğindeki gibi; `id: 'yasam-<kod>'`; `nextLesson` görev iletisinde.

## Kapsam

Yalnızca görev iletisinde sayılan derslere `soru-ekle.cjs` ile soru ekleme, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekler), `kit.js`, öteki konuların dosyaları, `gorsel/`, `ses/`, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik çizim aracı tekrar dersinin kendi dosyasında yazılır ve raporlanır. Aynı anda başka ajanlar öteki konularda çalışıyor; onların dosyalarına bakma.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js yasam/<kod> --goruntu <geçici klasör>/olc 2>&1 | tail -8`. "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Ölçüm aracı sahneyi kendisi oynatır ve her altyazıda bir görüntü alır (`s01-NN.png`, sonuncusu `s01-son.png`). Her kuraldan bir görüntüye bak (kuralın son altyazısındaki kare); aynı görüntüye iki kez bakma, düzeltmeden sonra yalnızca değişen kuralı gör. En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur. Ölçüm boş dönerse (başka ajan da ölçüyor olabilir) bir kez yeniden çalıştır.
- Soru eklenen derslerden birini aynı komutla (görüntüsüz) ölç: "sayfa kayıyor 0", "panel yana taşıyor 0", "konsol temiz" olmalı. **Eski derslerin sahnelerindeki öteki sayaçlar düzeltilmez, raporlanmaz.**
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); ders dosyası `cat` ile dökülmez.

## Rapor

Kısa tut. Her ders için eklenen iki sorunun metni, doğru şıkkı ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu (şıkları ve geri bildirimleri yazma; ana oturum araçla okur); konunun yeni cevap yerleri; tekrar dersinin kuralları (başlıkları) ve sorularının cevap yerleri; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir bilgiye dayanma kuşkusu, birden çok doğru şık kuşkusu, derste belirsiz bulduğun bilgi); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.

## Sık yapılan hatalar (ana oturumun denetiminden)

- Son kural tahtada kalır: son `c.note(...)` ile kapanış altyazısı ("Şimdi … dersin sorularını karışık sırayla çöz.") arasında `sil` çağrılmaz; yoksa ders boş tahtayla biter.
- `olc.js` ders kodunu `yasam/<kod>` biçiminde alır (`yasam/b4`; `yasam/b4-tekrar` değil). Bir dersi oynatması bir iki dakika sürer: komut tek ders için ve en az 300 sn zaman aşımıyla çalıştırılır.
