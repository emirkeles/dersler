# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi (Sayılar)

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `matematik/sayilar/`. Bu tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır. Komutlar proje kökünden (`/Users/emirkeles/matematik-sayilar`) çalıştırılır.

## Bu temanın düzeni

Dersler iki biçimde durur; ikisinde de çıkış soruları bir `quiz: [...]` dizisidir:

- Bölüm dosyasının sonundaki `PARCALAR` tablosu (`a1: { title, hook, scenes, quiz, summary, next }`): `01-uslu-ve-koklu.js` (A1–A8), `02-araliklar-ve-kume-sembolleri.js` (B2–B5), `c-sayi-kumeleri.js` (C1–C5), `04-islem-ozellikleri-cebirsel.js` (D4–D6).
- Kendi dosyasında `window.DERS_EK.<kod> = (K) => ({ … quiz … next })`: `b1-…js`, `b6-…js`, `b7-…js`, `d1-…js`, `d2-…js`, `d3-…js`, `d7-…js`, `d8-…js`.

Bölüm dosyaları 1.700–3.700 satırdır: **baştan sona okunmaz**. `grep -n` ile yer bulunur, `sed -n a,bp` ile yalnızca gereken aralık okunur.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `matematik/sayilar/dersler/01-uslu-ve-koklu.js` içinde `a4:` ve `a6:` parçalarının `quiz` dizileri (`grep -n "^    a4: {\|^    a5: {\|^    a6: {\|^    a7: {" <dosya>` ile satırlarını bul; her dizide son iki soru sonradan eklendi).
- Konu tekrarı dersi: `matematik/sayilar/dersler/a9-tekrar.js` (tamamı) ve `matematik/sayilar/a9-tekrar.html`.
- Motorun API'si: `ortak/API.md` içinde yalnızca "Sahne bağlamı `c`" bölümü.
- `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `plan/KURALLAR.md`, öteki konuların dosyaları okunmaz.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her ders için önce şunlara bak: parçanın `title`, `hook`, `scenes` (başlık ve `goal`), var olan iki soru, `summary`; o dersin sahnelerindeki defter notları ve altyazılar (`grep -n "c\.note(\|c\.say(" <dosya> | cut -c1-240`, dersin sahne işlevlerinin satır aralığında). Sonra `quiz` dizisinin **sonuna** iki soru ekle:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (yeni sayılar, yeni bir gündelik bağlam). Dersin kendi örneğindeki sayılar ve var olan sorular yinelenmez.
- **Biri dersin hedeflediği yanılgıyı sınar** (özetteki kalın cümle, sahne `goal` satırları ve var olan `why` satırları yanılgıyı gösterir). Var olan iki soru zaten aynı yanılgıyı sınıyorsa dersin öteki yanılgısı seçilir.
- Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır. Sonraki derslerin kavramı soruda, şıkta ya da geri bildirimde geçmez.
- Biçim o dersin var olan sorularıyla aynı: `{ q, options, answer, why, scene }`. **Şık sayısı var olan sorulardaki kadar** (A'da dört; öteki konularda dosyaya bak). `why` her şık için neden doğru ya da yanlış olduğunu söyler: yanlış şıkta öğrencinin hangi adımı yanlış attığı, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin o dersteki sırası (0'dan başlar; video sahnesi de sayılır).
- Doğru şıkkın yeri sorudan soruya değişir. Her hesabı elle doğrula: doğru şık gerçekten doğru, ötekiler gerçekten yanlış ve **yalnızca bir şık doğru** olmalı.
- Matematik yazımı dosyanın kendi yardımcılarıyla (var olan sorulara bak: `P(taban, üs)`, `FR(pay, payda)`, `rt(x)`, `M_(…)` gibi; dosyadan dosyaya değişir). Eksi işareti `−` (U+2212), ondalık virgül (0,5), kesme `’`, çarpma `·`; HTML içinde `&lt;` `&gt;`. Öğrenciye "kitap", "sayfa", "sınıf" denmez.
- Var olan iki soruya, sahnelere, `summary`, `hook` alanlarına dokunma.

## 2. Konu tekrarı dersi

Dosyalar: `matematik/sayilar/dersler/<kod>-tekrar.js` ve `matematik/sayilar/<kod>-tekrar.html` (kod, kimlik, renk ve `kicker` görev iletisinde). `a9-tekrar` ile aynı yapı:

- **Kendi başına çalışır:** bölüm dosyası yüklenmez, `DERS_PARCA` yazılmaz; `Ders.start` doğrudan çağrılır. Sayfa `a9-tekrar.html` kopyasıdır: başlık, bölümün stil dosyası (görev iletisinde) ve betik adı değişir. Sayfada `ses/…` satırı **olmaz**.
- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından ve özetlerinden derlenir, 5–8 kural) tahtada tek tek gösterilir: sıra (`3/7`), başlık, en çok üç satır. Her kural bir ile üç altyazı, sonra `c.note(html, 'Başlık', 'sayilar-<kod>-<ad>')`. Sonraki kurala geçmeden önce eski yazı kaldırılır ve altyazı temizlenir (`a9` içindeki `kur`). Bir kural çizimle daha iyi anlaşılıyorsa (sayı doğrusunda aralık, dolu ve boş nokta, iç içe kümeler) satırların yerine `c.S` ile yalın bir çizim konabilir; o da sonraki kuraldan önce kaldırılır.
- Tahtadaki yazının rengi `style: 'fill:…'` ile verilir (`fill` özniteliğini `ders.css` ezer).
- Ardından `quizTitle: 'Karışık sorular'` ile **8–10 soru**: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; konunun her dersine en az bir soru değer. Sorular derslerin çıkış sorularını (eskileri ve yeni eklediklerini) yinelemez. Hepsinde `scene: 0`.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime (sayılar ve işaretler de sayılır: `150 000 000` üç kelimedir); yazı en az 24 birim (1000×562 çizimde).
- `intro`, `goals`, `summary`, `nextLesson` `a9` örneğindeki gibi; `id: 'sayilar-<kod>'`.

## 3. Bağlantı

Konunun son dersindeki `next` tekrar dersine çevrilir (`{ href: '<kod>-tekrar.html', label: 'Sonraki: Konu tekrarı ›' }`); tekrar dersinin `nextLesson` alanı görev iletisinde verilir.

## Kapsam

Yalnızca görev iletisinde sayılan ders dosyaları, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekledi), öteki konuların dosyaları, stil dosyaları, `plan/`, `ortak/`, `araclar/` ve git yasak.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js sayilar/<kod> --goruntu <geçici klasör> 2>&1 | tail -8`. "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. Üç ya da dört görüntüye bak (`s01-NN.png`; çizim olan kurallar ve en kalabalık kural). En çok üç ölç-düzelt turu; üçüncüden sonra temiz değilse kalanı raporla ve dur.
- Soru eklenen derslerden ikisini aynı komutla ölç: "sayfa kayıyor 0", "panel yana taşıyor 0", "konsol temiz" olmalı. **Bu eski derslerin sahnelerinde "üst üste yazı" ve bütçe aşımı önceden de vardı; onlar düzeltilmez, raporlanmaz.**
- Komut çıktısı kısaltılır (`| tail -8`, `grep -n`, `sed -n a,bp`); dosya `cat` ile dökülmez.

## Rapor

Her ders için eklenen iki sorunun metni, doğru şık ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu; tekrar dersinin kuralları ve soru sayısı; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir kavrama dayanma kuşkusu, birden çok doğru şık kuşkusu); görev tanımında cevabını bulamayıp kaynakta aradığın her şey.
