# Görev: bir kısa dersi bitmiş senaryodan yaz (Matematik · Eşlik ve Benzerlik)

Proje kökü: `/Users/emirkeles/matematik-sayilar` (komutlar buradan çalışır). 9. sınıf için bağımlılıksız, etkileşimli kısa dersler (saf HTML/JS/SVG, Türkçe). Tek bir kısa ders yazacaksın: sayfası ve ders dosyası.

## Oku (yalnızca bunlar, sırayla)
1. Senaryo dosyasında baştaki okuma kılavuzu ile kendi dersinin bölümü (satır aralığı görev iletisinde; Read'e `offset` ve `limit` ver). Senaryo bağlayıcıdır: sahneler, anlatım cümleleri (altyazılar), sorular, şıklar, ipuçları, defter satırları, çıkış soruları oradan alınır.
2. Örnek ders (üslup, yapı, kit kullanımı): `matematik/eslik-ve-benzerlik/dersler/a1-yansima-ve-oteleme.js` ve sayfası `matematik/eslik-ve-benzerlik/a1-yansima-ve-oteleme.html`. Konu tekrarı dersi yazıyorsan onun yerine `matematik/geometrik-sekiller/dersler/a6-tekrar.js` (bu temada ilk tekrar dersi yazılana kadar; sonra `matematik/eslik-ve-benzerlik/dersler/a6-tekrar.js`).
3. `matematik/eslik-ve-benzerlik/dersler/kit.js`; konunun araç dosyası varsa `matematik/eslik-ve-benzerlik/dersler/<harf>-araclar.js`.
4. `ortak/API.md` (ders motoru).

Başka dosya okuma. `plan/KURALLAR.md`, `plan/ISLEME.md`, `ortak/ders.js`, `ortak/ders.css`, `araclar/` ve öteki derslerin dosyaları bu listede yok; gereken kurallar aşağıda yazılı. Burada cevabını bulamadığın bir şey için `grep -n` ile tek işleve bak ve raporda "görev tanımında eksik" başlığıyla yaz.

## Yazılacak dosyalar
`matematik/eslik-ve-benzerlik/<kod>-<ad>.html` ve `matematik/eslik-ve-benzerlik/dersler/<kod>-<ad>.js` (adlar görev iletisinde; dosya adlarında yalnızca ASCII harf). Ders kimliği `eslik-ve-benzerlik-<kod>` (örnek: `eslik-ve-benzerlik-a2`); `kicker: 'Konu <HARF> · <konu adı>'`; `accent` görev iletisindeki renk; `back: 'index.html'`; `nextLesson` görev iletisindeki gibi (konu tekrarı dersinde yazılmaz). Sayfaya `ses/…js` satırı konmaz.

Konunun araç dosyası (`<harf>-araclar.js`, `window.KIT_<HARF>`; sayfada `kit.js` satırından sonra, ders dosyasından önce yüklenir): görev iletisi "araç dosyasını sen aç" diyorsa konunun derslerinde ortak kullanılacak çizim araçlarını oraya yaz. Demiyorsa dosyayı oku, değiştirme; eksik aracı kendi ders dosyanda yaz ve raporla. Başka konunun araç dosyasından yükleme.

## Derste bulunması gerekenler
- İlk sahnenin başlığı tam olarak "Hatırla" (konu tekrarı dersi dışında): senaryodaki `c.choice` soruları; açılış cümlesi "Başlamadan önce iki şeyi hatırlayalım." (tek soru varsa "Başlamadan önce bir şeyi hatırlayalım.").
- Yarısı çözülmüş örnek `tag: 'Birlikte çöz'` etiketini taşır.
- Hiçbir soru, gereken bilgi anlatılmadan sorulmaz (senaryodaki sıra korunur).
- `quiz`: senaryodaki çıkış soruları; her şık için `why` (en çok 2 cümle, şıkkın neden doğru ya da yanlış olduğunu söyler); `scene` 0'dan başlayan sahne indeksi; doğru şıkkın yeri sorudan soruya değişir.
- Defter satırları (`c.note`; en çok 12 kelime) ve özetin kalın satırı olarak akılda kalıcı cümle.
- Anlaşılması güç her kavram tahtada çizilir ve anlatımla birlikte adım adım kurulur.
- Tahta ile altyazı her an aynı şeyi anlatır. Yeni bir örneğe ya da soruya geçerken tahtayı değiştirmeden önce `c.clearSay()` çağır. Soru cevaplanınca tahta cevabı gösterirken o örneği anlatan altyazı gelir; senaryoda böyle bir cümle yoksa kısa bir tane ekle ve raporla. Sahnenin son karesinde tahta, son altyazının anlattığı şeyi gösterir. Ölçüm aracı bu uyumsuzluğu yakalamaz.
- Konu tekrarı dersi: tek sahne (kurallar tahtada ve defterde), ardından senaryodaki sorular `quiz` içinde.

## Sınırlar
- Altyazı tek cümle ve en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 öğe (biten adım soluklaşır ya da silinir); punto en az 12 px.
- Rakam, simge ya da formül içeren altyazıda `speak:` ile okunuş kelimeyle yazılır ("25 °C" → "yirmi beş derece", "2+" → "iki artı"). Yönerge yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; derste en çok iki üç tane; `[excited]` yok.
- Öğrenciye kitap, sayfa, sınıf, "veri verildi" denmez. Senaryoda olmayan bilgi eklenmez; senaryodaki "Sınır" satırlarına uyulur.
- Benzetimde gösterilen her sayı senaryodaki değerdir; kaydırıcı yalnızca verisi olan konumlarda durur, ara değer hesaplanmaz.

## Motor ve ölçüm aracı notları
- Motorda sürükle-bırak, eşleştirme ve sıralama çağrısı yok (`c.drag`, `c.match`, `c.sort` yazma). Senaryoda böyle geçen sahneler kart başına seçimle kurulur: kart öne çıkar, öğrenci kutuyu ya da eşini seçer, kart tahtada yerine oturur. Kaydırıcı (`c.slider`), seçenek (`c.choice`) ve `c.cont('Devam ›')` kullanılabilir.
- Ölçüm ve seslendirme araçları sahneyi kendiliğinden geçer: yalnızca motorun düğmelerine ve şıklara basar. `c.h('button')` ile kendi düğmeni koyarsan sahne tamamlanmaz; "Tabloya yaz", "Kartı çevir" gibi düğmeler `c.cont('… ›')` ya da `c.choice` ile kurulur.
- Zamanlama yalnızca `c.wait` / `c.tween` ile; `setTimeout`, `setInterval`, CSS animasyonu, `requestAnimationFrame` yok. Çizim her açılışta aynı görünür: `Math.random` kullanılmaz.
- Bu makinede `timeout` komutu yok; uzun komutta aracın kendi süre sınırını 10 dakika ver.
- Tahtadaki yazı öğesi gizliyken de (`opacity: 0`) ölçüm aracı onu "üst üste yazı" sayabilir: aynı yere gelecek iki yazıdan gizli olanı `gizle(…)` ile tek tek gizle (grubunu değil) ya da işi bitince `remove()` ile sil. Hareket eden şeklin köşe harflerini hareket bitince göster (`gizle(g.adlar)` … `belir(c, g.adlar)`); bir şekli başka bir yere taşırken harfler birbirinin üstünden geçecekse şekli söndür, `koy(…)` ile yerine koy, yeniden belirt.
- Ölçüm aracı tahtadaki rakam ve simgeleri de kelime sayar ("AB 4" iki kelime; "4 × 3 ÷ 2 = 6" yedi kelime). Altyazıda da öyle: işlem içeren altyazıyı kısa tut. Tablo satırını tek `renkli(…)` yazısı olarak kur (bir öğe sayılır); sütun arası boşluk için `'\u00a0\u00a0\u00a0'` kullan (normal boşluk daralır).
- `c.svg(1000, 562)` sahnede bir kez çağrılır. Sahnenin içinde tahtayı değiştirmek için çizimi bir `c.S('g', {}, svg)` grubuna koy, işi bitince grubu `remove()` ile sil; zemin kalır.
- Kaydırıcı: `c.slider({ label, min, max, step, value, fmt: () => '', onInput })`; ardından `await c.cont('Devam ›')`, sonra `sl.remove(); c.clearSay();`. Yönerge `c.say('…', { noWait: true })` ile verilir.
- Sağdaki tablo sütunu x = 706'dan başlar (`hiza: 'start'`, 25 punto); zemin x = 30–670 arasındadır. Zemini kullanmayan sahnede çizim tahtaya ortalanır.

## Temaya özgü
- Kit araçları (`window.KIT`): `zemin(c, svg)` → `{ P(sütun, satır), N(liste), b }` (16 × 11 birim kare, birim 40); `cokgen(c, p, noktalar, renk, { harf: ['A', 'B', 'C'] })` → `{ g, adlar, koy(yeni noktalar), pts() }`; `dogru(c, p, P, Q, { ad: 'd' })` → `{ g, hat, koy(P, Q) }` (mor kesikli yansıma doğrusu); `ok(c, p, P, Q)` (yeşil öteleme oku); `dolasma(c, p, noktalar, renk)` (köşeleri dolaşma yönü; ters çevrilmeyi gösterir); `aciYayi(c, p, V, P, Q, renk, r, { dik })`, `aciIci(V, P, Q, d)`; `bayrak(i, j)` (simetrik olmayan motifin köşeleri, birim kare cinsinden; `z.N(…)` ile tahtaya çevrilir); dönüşümler `yansit(P, U, V)`, `otele(P, [dx, dy])`, `dondur(P, O, derece)` (ekranda saat yönü artıdır), `araHepsi(Ps, Qs, t)` (iki köşe listesi arasında geçiş; `c.tween` içinde); yardımcılar `yazi`, `renkli`, `parcaKoy`, `cizgi`, `koy`, `nokta`, `gizle`, `belir(c, el, ms, hedef)`, `par`, `cevapla`, `ara`, `ileri`, `yon`, `uz`, `rad`, `agirlik`, `icMerkez`, `saatYonunde`. Tahtada koordinat ya da nokta çifti yazılmaz.
- Renkler (`KIT.RENK`): şekil mavi (`sekil`), görüntüsü turuncu (`goruntu`), yansıma doğrusu mor (`dogru`), dönme merkezi ve açısı sarı (`merkez`), öteleme oku yeşil (`ok`); iki yansımanın ara görüntüsü soluk turuncu (`fill-opacity` ve `opacity` düşürülür). B konusundan sonra: karşılıklı açılar ve karşılarındaki kenarlar aynı renkte, paralel doğrular mor, yükseklik sarı. Yeşil ayrıca doğru cevabın rengidir (`cevapla`); kırmızı kullanılmaz.
- Yazım: görüntü köşeleri A′, B′, C′ ve A″ (U+2032, U+2033; kesme işareti değil); doğrular d₁, d₂ (alt simge karakteri); uzunluk |AB|; derece simgesi bitişik (90°); çarpma ×, bölme ÷; ondalık virgülle (0,5). "Ters çevrilme" yansıma içindir, "baktığı yön" dönme içindir; "yön" tek başına bu ikisi için yazılmaz. Soru metninde kesme için ’ kullanılır (A’dan).
- Okunuş (`speak`): A′ "A üssü", A″ "A iki üssü", A′B′ "A üssü B üssü", d₁ "d bir", |OA| "O A uzunluğu", 90° "doksan derece", 4 × 3 ÷ 2 = 6 "dört çarpı üç bölü iki, altı", 2 × 5 "iki çarpı beş", AB "A B". Rakam içeren her altyazıda `speak` yazılır.

## Kapsam
Yalnızca kendi dersinin sayfasına ve ders dosyasına (ve görev iletisi söylüyorsa konunun araç dosyasına) yaz. `tema.js`, `kit.js`, `tema.css`, öteki derslerin dosyaları, `plan/`, `ortak/`, `araclar/`, `TASKS.md` ve git (add, commit, stash, checkout, restore) yasak. Aynı anda başka ajanlar öteki dersleri yazıyor. `tema.js` satırını yazma; raporda ver.

## Doğrulama
    node araclar/olc.js eslik-ve-benzerlik/<kod> --goruntu "$(mktemp -d)" 2>&1 | tail -20

"yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0 ve "konsol temiz" olmalı; tabloda her sahne görünmeli ("sahne otomatik tamamlanamadı" olmamalı).

Görüntüler: her sahnenin son karesine (`sNN-son.png`) ve soru sahnelerinde bir ara kareye Read ile bak: yazılar okunuyor mu, üst üste binen çizim var mı, altyazı ile tahta aynı şeyi anlatıyor mu, çizim senaryodaki fikri gösteriyor mu, içerik doğru mu. Aynı kareye iki kez bakma; düzeltmeden sonra yalnızca değişen sahneyi yeniden gör.

Komut çıktısını kısalt (`| tail -20`, `grep -n`, `sed -n a,bp`); dosyayı `cat` ile dökme, yüz satırı aşan çıktı alma.

En çok üç ölç-düzelt turu. Üçüncüden sonra temiz değilse kalanı raporla ve dur.

## Rapor
Sahne adları ve sayısı; son `olc` çıktısındaki tablo ile "yerleşim", "bütçe", "defter", "konsol" satırları (aynen); `tema.js` satırı (`['<dosya>.html', 'başlık', 'açılış sorusu', sahne sayısı]`). Ayrıca: araç dosyasına ya da ders dosyasına yazdığın araçların listesi; senaryodan her sapma ve nedeni; içerikle ilgili her kuşku; temiz olmayan her şey; görev tanımında eksik bulduğun her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
