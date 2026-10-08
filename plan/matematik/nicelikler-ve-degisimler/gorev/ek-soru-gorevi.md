# Görev: bir konuya ek çıkış soruları ve konu tekrarı dersi

Yürütme planı 2b (`plan/YURUTME.md`). Tema: `matematik/nicelikler-ve-degisimler/`. Bu tema seslendirilmiş ve yayında; **anlatım, altyazı, sahne ve `speak` metinleri değişmez** (klip yeniden üretilmez). Yalnızca çıkış soruları eklenir ve konuya bir tekrar dersi yazılır.

## Örnek (önce bunları oku)

- Ek sorular nasıl yazıldı: `dersler/a11-ax-b-nin-isareti.js` ve `dersler/a15-aralikta-en-buyuk-en-kucuk.js` dosyalarının yalnızca `quiz: [...]` dizisi (son iki soru sonradan eklendi).
- Konu tekrarı dersi: `dersler/a17-tekrar.js` (tamamı) ve `a17-tekrar.html`.
- Çizim araçları: `dersler/kit.js` (başındaki açıklama ve kullandığın işlevlerin imzası; tamamını okuma).
- `ortak/`, `araclar/`, `plan/KURALLAR.md`, öteki konuların ders dosyaları okunmaz.

## 1. Her derse iki çıkış sorusu ekle (2'den 4'e)

Her ders için önce o dersin dosyasından şunlara bak (`grep -n "c\.note(\|goals:\|{ title:\|{ q:\|why:\|soyle(c" <dosya>`): hedefler, sahne başlıkları, defter notları, anlatım cümleleri, var olan iki soru. Sonra `quiz` dizisinin sonuna iki soru ekle:

- **Biri bilgiyi derste görülmemiş bir duruma uygulatır** (yeni sayılar, yeni bir gündelik bağlam). Dersin kendi örneğindeki sayılar ve var olan sorular yinelenmez.
- **Biri dersin hedeflediği yanılgıyı sınar** (özetteki kalın cümle ve var olan `why` satırları yanılgıyı gösterir).
- Yalnızca o derste ve önceki derslerde öğretilenle cevaplanır. Sonraki derslerin kavramı soruda, şıkta ya da geri bildirimde geçmez.
- Biçim var olan sorularla aynı: `{ q, options: [3 şık], answer, why: [3 cümle], scene }`. `why` her şık için neden doğru ya da yanlış olduğunu söyler, en çok iki kısa cümle. `scene`, sorunun dayandığı sahnenin sırası (0'dan başlar).
- Doğru şıkkın yeri sorudan soruya değişir. Her hesabı elle doğrula: doğru şık gerçekten doğru, öteki ikisi gerçekten yanlış ve **yalnızca bir şık doğru** olmalı (örnek tuzak: f(x) = x için "5 sola" ile "5 yukarı" aynı doğrudur).
- Yazım: eksi işareti `−` (U+2212), ondalık virgül (0,5), kesme `’`, çarpma `·`; HTML içinde `&lt;` `&gt;`, alt indis `<sub>1</sub>`. Öğrenciye "kitap", "sayfa", "sınıf" denmez.
- Var olan iki soruya, sahnelere, `summary` ve `goals` alanlarına dokunma.

## 2. Konu tekrarı dersi

Dosyalar: `dersler/<kod>-tekrar.js` ve `<kod>-tekrar.html` (kod ve kimlik görev iletisinde). `a17-tekrar` ile aynı yapı:

- **Yeni bilgi yok.** Tek sahne, başlığı "Konunun kuralları": konunun kuralları (derslerin defter notlarından derlenir, 5–8 kural) solda düzlem, sağda kural yazısıyla tek tek gösterilir; her kural bir ya da iki altyazı, sonra `c.note`. Sonraki kurala geçmeden önce eski yazı ve çizim kaldırılır, altyazı temizlenir (`a17` içindeki `kur` işlevi; öğeler oluşturulur oluşturulmaz gizlenir).
- Ardından `quizTitle: 'Karışık sorular'` ile **8–10 soru**: derslerin sırasıyla değil karışık; çoğu kuralı yeni bir duruma uygulatır; konunun her dersine en az bir soru değmeye çalışır. Sorular derslerin çıkış sorularını yinelemez.
- Sınırlar: altyazı tek cümle, en çok 12 kelime; tahtada aynı anda en çok 25 kelime (eksen sayıları da sayılır; `duzlem` için `xsayi: 2, ysayi: 4`); yazı en az 18 birim.
- Sayfada `ses/…` satırı **olmaz** (ders seslendirilmedi). Altyazılar `soyle(c, …)` ile yazılır.
- `intro`, `goals`, `summary`, `nextLesson` `a17` örneğindeki gibi; `id: 'nicelikler-ve-degisimler-<kod>'`.

## 3. Bağlantı

Konunun son dersindeki `nextLesson` tekrar dersine çevrilir (`{ href: '<kod>-tekrar.html', label: 'Sonraki: Konu tekrarı ›' }`); tekrar dersinin `nextLesson` alanı görev iletisinde verilir.

## Kapsam

Yalnızca görev iletisinde sayılan ders dosyaları, yeni tekrar dersi ve sayfası. `tema.js` (satırı ana oturum ekledi), `kit.js`, `plan/`, `ortak/`, `araclar/` ve git yasak.

## Doğrulama

- Her değişen dosya için `node --check <dosya>`.
- Tekrar dersi: `node araclar/olc.js nicelikler-ve-degisimler/<kod> --goruntu <geçici klasör> 2>&1 | tail -8` (proje kökünden). "yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0, "konsol temiz" olmalı. İki ya da üç görüntüye bak (`s01-NN.png`). En çok üç ölç-düzelt turu.
- Soru eklenen derslerden ikisini aynı komutla ölç (çıkış soruları taşıyor mu).

## Rapor

Her ders için eklenen iki sorunun metni, doğru şık ve hangisinin "yeni durum", hangisinin "yanılgı" olduğu; tekrar dersinin kuralları ve soru sayısı; son `olc` satırları; emin olmadığın her içerik (öğretilmemiş bir kavrama dayanma kuşkusu, birden çok doğru şık kuşkusu).
