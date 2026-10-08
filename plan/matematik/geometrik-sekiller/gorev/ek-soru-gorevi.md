# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Geometrik Şekiller)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `matematik/geometrik-sekiller/`. B ve C konuları seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır.

## Bu temanın düzeni

Her kısa ders kendi dosyasındadır: `matematik/geometrik-sekiller/dersler/<kod>-<ad>.js` (150–280 satır), sonunda `Ders.start({ … scenes, quizTitle: 'Çıkış soruları', quiz: [...], summary, nextLesson })`. Çizim araçları `dersler/kit.js` içindedir (`window.KIT`); sayfa önce kiti, sonra ders dosyasını yükler.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `dersler/b3-ucgen-esitsizligi.js` ve `dersler/b4-ucuncu-kenar-araligi.js` içinde `quiz` dizileri (`grep -n "quizTitle" <dosya>` ile satırını bul, oradan dosya sonuna kadar oku; her dizide son iki soru sonradan eklendi).
- Konu tekrarı dersi: `dersler/b5-tekrar.js` (tamamı) ve `b5-tekrar.html`.
- Kit: `dersler/kit.js` içinde yalnızca kullanacağın işlevlerin başındaki açıklama (`grep -n "^  function \|^  const [a-zA-Z]* = (" dersler/kit.js`, sonra `sed -n a,bp`). Sık kullanılanlar: `yazi(c, p, x, y, metin, { size, kalin, renk })`, `kutu(c, p, x, y, w, h, { renk })`, `cizgi`, `gizle(...els)`, `belir(c, el, ms, hedef)`, `par(...)`, `tepe(B, C, beta, gama)`, `ucgen(c, p, A, B, C, { olcu: [...], renkler })`, `kenarlar(c, p, A, B, C).yaz([...])`, `disAci(c, p, V, onceki, sonraki)`, `RENK`.
- Motorun API'si: `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü.
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, A ve B konularının öteki ders dosyaları okunmaz.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her ders için önce şunlara bak: `Ders.start` içindeki `title`, `hook`, `goals`, `scenes` (başlık ve `goal`), var olan iki soru, `summary`; sahnelerdeki defter notları, altyazılar ve sahne içi sorular (`grep -n "c\.note(\|c\.say(\| q: " <dosya> | cut -c1-260`). Sonra `quiz` dizisinin **sonuna** iki soru ekle:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (yeni sayılar, yeni bir gündelik bağlam). Dersin kendi örneğindeki sayılar, sahne içi sorular ve var olan çıkış soruları yinelenmez.
- **Biri dersin hedeflediği yanılgıyı sınar** (özetteki kalın cümle, sahne `goal` satırları ve var olan `why` satırları yanılgıyı gösterir). Var olan iki soru zaten aynı yanılgıyı sınıyorsa dersin öteki yanılgısı seçilir.
- Yalnızca o derste ve önceki derslerde (A1–A5, B1–B4 ve konunun önceki dersleri) öğretilenle cevaplanır. **Sonraki derslerin terimi soruda, şıkta ya da geri bildirimde geçmez**; kuşkulu bir terimin ilk geçtiği dersi `grep -ln "<terim>" matematik/geometrik-sekiller/dersler/*.js` ile doğrula.
- Biçim var olan sorularla aynı: `{ q, options, answer, why, scene }`. **Üç şık.** `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin hangi adımı yanlış attığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin o dersteki sırası (0'dan başlar).
- **Doğru şıkkın yeri sorudan soruya değişir ve konuda aynı yerde toplanmaz.** C konusunun var olan altı sorusunun beşinde cevap ortadaki şıktır (`answer: 1`); eklenen altı sorunun en çok biri ortada olur, kalanı 0 ile 2 arasında dengeli dağılır.
- Her hesabı elle doğrula: doğru şık gerçekten doğru, ötekiler gerçekten yanlış ve **yalnızca bir şık doğru** olmalı. Kenar uzunlukları verilen üçgen üçgen eşitsizliğini, açıları verilen üçgen 180° toplamını sağlamalı.
- Yazım: derece `35°`, ek kesmeyle (`90°’den`, `60°dir`), eksi `−` (U+2212), ondalık virgül (5,6), kesme `’`, çarpma `·`; şık ve soru HTML olduğundan küçüktür ve büyüktür `&lt;` `&gt;`. Öğrenciye "kitap", "sayfa", "sınıf" denmez.
- Var olan iki soruya, sahnelere, `summary`, `hook` alanlarına dokunma.

## 2. Konu tekrarı dersi

Dosyalar: `matematik/geometrik-sekiller/dersler/<kod>-tekrar.js` ve `matematik/geometrik-sekiller/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `b5-tekrar` ile aynı yapı:

- Sayfa `b5-tekrar.html` kopyasıdır: başlık ve betik adı değişir. Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi).
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından ve özetlerinden derlenir, 4–7 kural) tahtada tek tek gösterilir. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', '<not kimliği>')`: derste aynı kural için bir not varsa onun kimliği ve metni kullanılır (`grep -n "c\.note(" <dosya>`), yoksa yeni `gs-…` kimliği. Sonraki kurala geçmeden önce eski çizim kaldırılır (`b5` içindeki `sil`). Kural bir çizimle daha iyi anlaşılıyorsa kitle yalın bir çizim, değilse iki üç satır yazı.
- Tahtadaki yazının rengi `yazi(..., { renk })` ile verilir (kit `style: 'fill:…'` yazar; `fill` özniteliğini `ders.css` ezer).
- Rakam ya da simge içeren altyazıya okunuşu `speak` ile yazılır (`{ speak: '… altmış derecedir.' }`); yönerge gerekirse yalnızca `[curious]`, `[thoughtful]`, `[short pause]`.
- Ardından `quizTitle: 'Karışık sorular'` ile **8 soru**, üç şıklı: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; konunun her dersine en az iki soru değer. Sorular derslerin çıkış sorularını (eskileri ve yeni eklediklerini) ve sahne içi soruları yinelemez. Hepsinde `scene: 0`. Doğru şık üç yere dengeli dağılır.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime (sayılar ve işaretler de sayılır) ve 12 yazı öğesi; yazı en az 24 birim (1000×562 çizimde).
- `intro`, `goals`, `summary`, `nextLesson` `b5` örneğindeki gibi; `id: 'geometrik-sekiller-<kod>'`.

## 3. Bağlantı

Konunun son dersindeki `nextLesson` tekrar dersine çevrilir ya da yoksa eklenir (`nextLesson: { href: '<kod>-tekrar.html', label: 'Sonraki: Konu tekrarı ›' }`, `summary` dizisinden sonra); tekrar dersinin `nextLesson` alanı görev iletisinde verilir.

## Kapsam

Yalnızca görev iletisinde sayılan ders dosyaları, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekler), `kit.js`, öteki konuların dosyaları, `plan/`, `ortak/`, `araclar/` ve git yasak. Eksik çizim aracı tekrar dersinin kendi dosyasında yazılır ve raporlanır.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js geometrik-sekiller/<kod> --goruntu <geçici klasör> 2>&1 | tail -8`. "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Ölçüm aracı sahneyi kendisi oynatır ve her altyazıda bir görüntü alır (`s01-NN.png`, sonuncusu `s01-son.png`). Her kuraldan bir görüntüye bak; aynı görüntüye iki kez bakma. En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur.
- Soru eklenen derslerden birini aynı komutla (görüntüsüz) ölç: "sayfa kayıyor 0", "panel yana taşıyor 0", "konsol temiz" olmalı.
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); dosya `cat` ile dökülmez.

## Rapor

Her ders için eklenen iki sorunun metni, şıkları, doğru şık ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu; tekrar dersinin kuralları, sekiz sorusu ve cevapları; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir kavrama dayanma kuşkusu, birden çok doğru şık kuşkusu); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.
