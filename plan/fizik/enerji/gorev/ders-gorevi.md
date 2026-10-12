# Görev: bir kısa dersi bitmiş senaryodan yaz (Fizik · Enerji)

Proje kökü: `/Users/emirkeles/matematik-sayilar` (komutlar buradan çalışır). 9. sınıf için bağımlılıksız, etkileşimli kısa dersler (saf HTML/JS/SVG, Türkçe). Tek bir kısa ders yazacaksın: sayfası ve ders dosyası.

## Oku (yalnızca bunlar, sırayla)
1. Senaryo dosyasında baştaki okuma kılavuzu ile kendi dersinin bölümü (satır aralığı görev iletisinde; Read'e `offset` ve `limit` ver). Senaryo bağlayıcıdır: sahneler, anlatım cümleleri (altyazılar), sorular, şıklar, ipuçları, defter satırları, çıkış soruları oradan alınır.
2. Örnek ders (üslup, yapı, kit kullanımı): `fizik/enerji/dersler/a1-isi-sicaklik-ic-enerji.js`. Tamamını okuma; yalnızca şu satır aralıklarını oku (Read'e `offset` ve `limit` ver): 1–31 (baş: kit satırları, yerel yardımcılar) · 62–107 (anlatım, kap ve tanecik penceresi, tahtayı değiştirip soru sorma, "gör", defter) · 198–243 (tablo, çözülmüş örnek ve `tag: 'Birlikte çöz'`) · 245–308 (kart sınıflama: `sinifla`, kartı gösterme ve kutusuna yerleştirme) · 310–347 (`Ders.start` bloğu: `id`, `kicker`, `title`, `accent`, `back`, `intro`, `goals`, `scenes`, `quizTitle`, `quiz`, `summary`, `nextLesson`). Sayfası `fizik/enerji/a1-isi-sicaklik-ic-enerji.html` kısadır, tamamı okunur. A1 temanın ilk dersi olduğu için "Hatırla" sahnesi yoktur; kalıbı aşağıda yazılıdır. Bu parçalarda bulamadığın bir kalıp için aynı dosyada `grep -n 'async function'` ile tek sahne daha seç (en çok 80 satır) ve raporda "görev tanımında eksik" başlığıyla yaz. Konu tekrarı dersi yazıyorsan örnek, görev iletisinde adı verilen tekrar dersidir (kısa, tamamı okunur).
3. `fizik/enerji/dersler/kit.js`; konunun araç dosyası varsa `fizik/enerji/dersler/<harf>-araclar.js`. Ders izometrik figür kullanıyorsa figür modülünün **yalnızca baş yorumu** (arayüz): `head -c 4000 fizik/enerji/dersler/<ad>-sekil.js` (modülün gerisi üretilmiş yol verisidir, okunmaz; dosya adı görev iletisinde).
4. `ortak/API.md` (ders motoru).

Başka dosya okuma. `plan/KURALLAR.md`, `plan/ISLEME.md`, `plan/fizik/enerji/IZOMETRIK.md`, `plan/fizik/enerji/sekil/`, `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `*-sekil.js` dosyalarının gövdesi ve öteki derslerin dosyaları bu listede yok; gereken kurallar aşağıda yazılı. Burada cevabını bulamadığın bir şey için `grep -n` ile tek işleve bak ve raporda "görev tanımında eksik" başlığıyla yaz.

"Hatırla" sahnesinin kalıbı:

    async function hatirla(c) {
      const svg = c.svg(1000, 562);
      // Sorunun anlattığı şeyi gösteren küçük bir çizim (senaryo tahta tarifi vermiyorsa sen kur).
      await c.say('Başlamadan önce iki şeyi hatırlayalım.');
      await c.choice({ tag: 'Hatırla', q: '…', options: ['…', '…', '…'], answer: 1,
        hints: ['<yanlışta kuralı hatırlatan cümle>', '', '<aynı cümle>'], right: 'Evet. …' });
      // ikinci soru: tahtayı değiştirmeden önce c.clearSay()
      await c.say('Bugün … bakacağız.');
    }

## Yazılacak dosyalar
`fizik/enerji/<kod>-<ad>.html` ve `fizik/enerji/dersler/<kod>-<ad>.js` (adlar görev iletisinde; dosya adlarında yalnızca ASCII harf). Ders kimliği `enerji-<kod>`; `kicker: 'Konu <HARF> · <konu adı>'`; `accent` görev iletisindeki renk; `back: 'index.html'`; `nextLesson` görev iletisindeki gibi (konu tekrarı dersinde yazılmaz). Sayfaya `ses/…js` satırı konmaz. Sayfada yükleme sırası: `../../ortak/ders.js`, `dersler/kit.js`, figür modülü (kullanılıyorsa `dersler/<ad>-sekil.js`), konunun araç dosyası, ders dosyası.

Konunun araç dosyası (`<harf>-araclar.js`, `window.KIT_<HARF>`): görev iletisi "araç dosyasını sen aç" diyorsa konunun derslerinde ortak kullanılacak çizim araçlarını oraya yaz (örnek: `dersler/a-araclar.js`). Demiyorsa dosyayı oku, değiştirme; eksik aracı kendi ders dosyanda yaz ve raporla. Başka konunun araç dosyasından yükleme.

## Derste bulunması gerekenler
- İlk sahnenin başlığı tam olarak "Hatırla" (konu tekrarı dersi dışında): senaryodaki `c.choice` soruları; açılış cümlesi "Başlamadan önce iki şeyi hatırlayalım." (tek soru varsa "Başlamadan önce bir şeyi hatırlayalım.").
- Yarısı çözülmüş örnek `tag: 'Birlikte çöz'` etiketini taşır.
- Hiçbir soru, gereken bilgi anlatılmadan sorulmaz (senaryodaki sıra korunur).
- `quiz`: senaryodaki çıkış soruları; her şık için `why` (en çok 2 cümle, şıkkın neden doğru ya da yanlış olduğunu söyler); `scene` 0'dan başlayan sahne indeksi; doğru şıkkın yeri sorudan soruya değişir. Senaryoda şıkların ilki hep doğru yazılmıştır: ders içi sorularda da (`c.choice`) doğru şıkkın yerini değiştir, ipuçlarını şıklarla eşle.
- Defter satırları (`c.note`; satırın kendisi en çok 12 kelime; ölçüm aracının "defter" satırı başlığı da sayar, o satır bilgi içindir: başlık senaryodaki gibi yazılır, sayım için değiştirilmez) ve özetin kalın satırı olarak akılda kalıcı cümle.
- Anlaşılması güç her kavram tahtada çizilir ve anlatımla birlikte adım adım kurulur.
- Tahta ile altyazı her an aynı şeyi anlatır. Yeni bir örneğe ya da soruya geçerken tahtayı değiştirmeden önce `c.clearSay()` çağır. Soru cevaplanınca tahta cevabı gösterirken o örneği anlatan altyazı gelir; senaryoda böyle bir cümle yoksa kısa bir tane ekle ve raporla. Sahnenin son karesinde tahta, son altyazının anlattığı şeyi gösterir. Ölçüm aracı bu uyumsuzluğu yakalamaz.
- Konu tekrarı dersi: tek sahne (kurallar tahtada ve defterde), ardından senaryodaki sorular `quiz` içinde.

## Sınırlar
- Altyazı tek cümle ve en çok 12 kelime; tahtada aynı anda en çok 25 kelime ve 12 öğe (biten adım soluklaşır ya da silinir); punto en az 12 px.
- Rakam, simge ya da formül içeren altyazıda `speak:` ile okunuş kelimeyle yazılır ("25 °C" → "yirmi beş derece", "2+" → "iki artı"). Yönerge yalnızca `[curious]`, `[thoughtful]`, `[short pause]`; derste en çok iki üç tane; `[excited]` yok.
- Öğrenciye kitap, sayfa, sınıf, "veri verildi" denmez. Senaryoda olmayan bilgi eklenmez; senaryodaki "Sınır" satırlarına uyulur.
- Benzetimde gösterilen her sayı senaryodaki değerdir; kaydırıcı yalnızca verisi olan konumlarda durur, ara değer hesaplanmaz.

## Motor ve ölçüm aracı notları
- Motorda sürükle-bırak, eşleştirme ve sıralama çağrısı yok (`c.drag`, `c.match`, `c.sort` yazma). Senaryoda böyle geçen sahneler kart başına seçimle kurulur: kart öne çıkar, öğrenci kutuyu ya da eşini seçer, kart tahtada yerine oturur; senaryodaki yönergede "sürükle" yazıyorsa ekranda "seç" yazılır. Kaydırıcı (`c.slider`), seçenek (`c.choice`) ve `c.cont('Devam ›')` kullanılabilir.
- Ölçüm ve seslendirme araçları sahneyi kendiliğinden geçer: yalnızca motorun düğmelerine ve şıklara basar. `c.h('button')` ile kendi düğmeni koyarsan sahne tamamlanmaz; "Tabloya yaz", "Kartı çevir" gibi düğmeler `c.cont('… ›')` ya da `c.choice` ile kurulur.
- Zamanlama yalnızca `c.wait` / `c.tween` ile; `setTimeout`, `setInterval`, CSS animasyonu, `requestAnimationFrame` yok. Çizim her açılışta aynı görünür: `Math.random` kullanılmaz.
- Bu makinede `timeout` komutu yok; uzun komutta aracın kendi süre sınırını 10 dakika ver.
- Tahtadaki yazı öğesi gizliyken de (`opacity: 0`) ölçüm aracı onu "üst üste yazı" sayabilir: aynı yere gelecek iki yazıdan gizli olanı `gizle(…)` ile tek tek gizle (grubunu değil) ya da işi bitince `remove()` ile sil. Hareket eden şeklin köşe harflerini hareket bitince göster (`gizle(g.adlar)` … `belir(c, g.adlar)`); bir şekli başka bir yere taşırken harfler birbirinin üstünden geçecekse şekli söndür, `koy(…)` ile yerine koy, yeniden belirt.
- Ölçüm aracı tahtadaki rakam ve simgeleri de kelime sayar ("AB 4" iki kelime; "4 × 3 ÷ 2 = 6" yedi kelime). Altyazıda da öyle: işlem içeren altyazıyı kısa tut. Tablo satırını tek `renkli(…)` yazısı olarak kur (bir öğe sayılır); sütun arası boşluk için `'\u00a0\u00a0\u00a0'` kullan (normal boşluk daralır).
- `c.svg(1000, 562)` sahnede bir kez çağrılır. Sahnenin içinde tahtayı değiştirmek için çizimi bir `c.S('g', {}, svg)` grubuna koy, işi bitince grubu `remove()` ile sil; zemin kalır.
- Kaydırıcı: `c.slider({ label, min, max, step, value, fmt: () => '', onInput })`; ardından `await c.cont('Devam ›')`, sonra `sl.remove(); c.clearSay();`. Yönerge `c.say('…', { noWait: true })` ile verilir.
- Kaydırıcıda `onInput` kaydırıcı kurulur kurulmaz bir kez çağrılır (durum değişkenlerini önce tanımla) ve değeri metin olarak verebilir (`+v` ile sayıya çevir); `fmt: (v) => v + '°'` değeri panelde gösterir. Ölçüm aracı kaydırıcıyı oynatmaz: uç değerlerde şeklin tahtaya sığdığını hesapla doğrula ve raporla.
- `belir`, `style.opacity` değeri boş olan öğeyi 0'dan başlatır: bir grubu `belir(c, g, 300, 0.35)` ile soluklaştıracaksan önce `belir` ya da `gizle` ile saydamlığını verilmiş yap; yoksa öğe sönüp yeniden belirir.
- `belir` / `gizle` iç içe dizi almaz (`belir(c, [a, dizi])` konsol hatası verir; `[a, ...dizi]` yaz). Ölçüm aracı "en çok 12 öğe" kuralını saymaz; kalabalık sahnede öğeleri kendin say. İlk çalıştırmada "Attempted to use detached Frame" hatası çıkarsa komutu yeniden çalıştır (araçtan gelir, dersten değil).
- Ölçüm aracı kareyi altyazı anında alır: bir kuralın ya da sorunun bittiği andaki tahtayı görmek için geçici bir `c.say` ekle, ölçtükten sonra sil (her sahne türünde, konu tekrarında da).
- Boşlukla yazılan sayı iki kelime sayılır ("58 500"); defter satırının sayımına başlık da girer (iki kelimelik başlıkta satıra 10 kelime kalır).
- Bu makinede `sed -i` boş ek ister (`sed -i '' …`); düzeltmeyi Edit ile yap.
- Hareketin süresi ve eğrisi senaryodan alınır: `c.tween(ms, fn, Ders.ease.<ad>)`. Senaryoda yazmıyorsa: beliren öğe `out`, kaybolan `in`, yer değiştiren `inOut`, sabit hız `linear`; küçük hareket 300–500 ms, sahnenin ana hareketi 600–1200 ms; seçtiğini raporla. Yazı okunurken yer değiştirmez.
- Tahtanın dışında başlayan öğe (yukarıdan inen parça gibi) "tahtadan taşan yazı" sayılır: harf taşıyan öğeyi tahtanın içinde, gizli başlat ve kısa yoldan getir.
- Dar tablo sütununda hücre yazısı kısa tutulur ("alan küçüldü"); sütun genişliği en uzun hücreden 30 birim fazla seçilir, yoksa yazı tablo kenarına değer.
- Bir öğe hareket eden bir gruba bağlıysa etiketleri de o grubun içine konur; yerinde kalması gereken etiket `svg` içine konur.
- Konu tekrarı dersinde önceki kurallar soluklaşır (0,45) ama sahnenin sonunda hepsi yeniden tam görünür olur (`await belir(c, onceki, 500, 1)`); örnek görev iletisinde verilir (kısa, tamamı okunur).
- Tablo başlığı birim taşıyorsa ("Sıcaklık değişimi (°C)") sütun en az 200 birim olur; yazı 20–22 birim.
- Ölçüm aracı "üst üste yazı"yı altyazı anında değil, altyazının bütün süresi boyunca örnekler: kart kutusuna uçarken yazısı kutu başlığının üstünden geçerse sayılır (koşudan koşuya 0 ya da 1 çıkar). Yerleşen kartı yerinde küçültüp söndür (`scale` 1 → 0,6, 400 ms, `in`), adını kutuda belirt; kartı yazıların üstünden geçirme.
- Ölçüm aracı kaydırıcıyı oynatmadığı için "üç konum denenmeden soru açılmaz" gibi kapı konmaz: `c.cont('Devam ›')` her zaman açıktır; denenmemiş konum "Devam"dan sonra tahtada kendiliğinden gösterilebilir.
- Tablo başlığı tek satıra sığmıyorsa iki satıra bölünür (satır yüksekliği 56).
- "Hatırla" sahnesinde senaryo "anlatım yok" dese de açılış cümlesi ve "Bugün … bakacağız." kapanışı yazılır; soruların küçük çizimini sen kurarsın, cevabı ele veren oku cevaptan sonra belirtirsin.
- Sahne boyunca süren hareket (titreşen tanecikler, akan oklar) `KIT_A.motor(c)` gibi tek bir `c.tween` döngüsüyle kurulur (`motor.ekle(dt => …)`, dt saniye); sahne bitince kendiliğinden durur. Beklenmez (`await` edilmez).
- Akış çizgilerinin içine düşen yazı, ok ve etiket çizgilerden sonra eklenir (sonra eklenen üstte durur; önce kurulmuşsa `svg.appendChild(öğe)` ile üste alınır, hareket eden grubun dışına çıkan öğe aynı `kaydir` ile taşınır). Yarı saydam etiketin ("düşük basınç") altına tahta renginde (`'#10162b'`) dolu bir kutu konur; yazıya tahta renginde 10 px kontur verilir (`paintOrder: 'stroke'`). Seyrek çizgi yazının 15 birim yakınından geçmez.
- 30 birimden kısa okta kitin `ok` başı gövdeyi yutar; boya göre küçülen kendi okunu yazarken başın yarı genişliği çizgi kalınlığının 0,9 katından küçük olmaz (yoksa ok nokta gibi görünür). 15 birimden kısa ok gerekiyorsa raporla.
- Senaryoda "Defter (…)" satırı yoksa defter satırı uydurulmaz: yalnızca akılda kalıcı cümle `c.note` ile yazılır. Konu tekrarı dersinde her kural için bir kısa satır yazılır (başlıkla birlikte en çok 12 kelime).
- `c.choice` metinlerinde `<sub>` çalışır (F<sub>k</sub>). Ondalık okunuş: başta sıfır yoksa "3,92" → "üç virgül doksan iki"; varsa basamak basamak ("0,02" → "sıfır virgül sıfır iki").
- "=", "≈", "·", "÷" ve "10⁵" ayrı kelime sayılır; formüllü kartta kelime bütçesi buna göre hesaplanır.
- Rapordaki `olc` tablosu son çıktıdan kopyalanır, ezberden yazılmaz.

## Temaya özgü
- Kit araçları (`window.KIT`, imzalar dosyanın yorumlarında): `RENK`; `sayi(v)` ondalığı virgülle yazar; `yazi(c, p, x, y, metin, { hiza, size, kalin, renk, math })`; `renkli(c, p, x, y, ['düz', ['renkli', renk], …], o)` parçaları ayrı renkte tek satır; `parcaKoy(c, t, parcalar)` aynı yazının içeriğini değiştirir; `cizgi(c, p, P, Q, renk, w, ekÖznitelik)`; `kutu(c, p, x, y, w, h, { rx, dolgu, renk })`; `gizle(…öğeler)`; `belir(c, öğe ya da dizi, ms, hedefSaydamlık)`; `par(…sözler)`; `ok(c, p, P, Q, renk, w)` → `{ g, ciz(P, Q) }`; `onay(c, p, x, y)`; `cubuk(c, p, x, y, renk)` → `{ boy(w) }`; `tablo(c, p, { x, y, satir, h, size, sutunlar: [{ ad, w, renk }] })` → `{ g, yaz(i, j, metin, renk), goster(i), vurgula(i, açık) }` (veri satırları gizli başlar); `tahminAl(c, { tag, q, options })` doğru şık aramadan seçileni döndürür; `sinifla(c, { tag, soru, kutular, kartlar, sec, yerlestir })` kart başına `c.choice`.
- Konu A araçları (`window.KIT_A`, `dersler/a-araclar.js`; imzalar dosyanın baş yorumunda): `motor(c)`; `titresim(T)`; `kap(c, p, { x, y, w, h, su, etiket, harf })` beher; `pencere(c, p, motor, { cx, cy, r, n, T, tohum, bag })` tanecik penceresi → `{ g, kur(T), isin(c, T, ms), say(n) }`; `termometre(c, p, { x, y, h, T, deger })` düz termometre → `{ g, kur(T), git(c, T, ms), yazi }`; `cubuk(c, p, { x, y, boy, etiket })` mor iç enerji çubuğu → `{ g, boy(w), git(c, w, ms) }`; `isiOku(c, p, P, Q)` turuncu ok ve "ısı" (gizli başlar); `tanim(c, p, y, ad, renk, metin)` tanım satırı (gizli başlar). Öteki konular bu dosyayı yükleyebilir (görev iletisi söylerse): tanecik penceresi ve düz termometre başka konularda da geçer.
- İzometrik figür (görev iletisi adını verir; arayüzü modülün baş yorumundadır): `const f = <AD>.kur(c, svg, { x, y, h })`; ayarlar anında uygulanır, hareket `c.tween` içinde ayar çağrılarak verilir (`await c.tween(3000, (e) => f.ayar('sol', { sicaklik: lerp(24, 33, e) }), ease.linear)`); `f.nokta(ad)` → `[x, y]` tahta birimi: etiket, sayı ve ölçü çizgisi buraya bağlanan düz SVG'dir (figürde yazı yoktur); `f.el` kök öğe (`gizle`, `belir`); `f.bak(<AD>.kadraj.<ad>)` yakınlaşma, arası `c.tween` ile. Figür `c.svg(1000, 562)` içine bir kez kurulur; figürün üstüne yazı bindirme, etiketleri figürün dışına ya da `nokta` çevresindeki boş yere koy. Figürün rengine, tonuna ve iç öğelerine dokunma; figürü ders dosyasında yeniden çizme. **Figür büyük kurulur:** senaryolar figür çizilmeden yazıldı ve figürü küçük bir kutuya koyuyor (h 240–330); o boyda düzenek küçük bir simge gibi kalıyor ve tahtanın yarısı boş duruyor. Figürün kutusu senaryodaki değil şudur: bütün düzenek görünürken (`tum`) figür tahtanın boyunu doldurur (`y` 20–40, `h` 420–470; ISITMA için `{ x: 0, y: 30, h: 440 }`, genişlik 638, düzenek x 55–585 arasına düşer); tek istasyon ya da yakın kadraj kullanılan sahnede de `h` en az 400'dür. Yan içerik (çubuklar, tablo, grafik, kartlar, formül) figürün sağında kalan sütuna (x 610–985) senaryodaki sırayla ama bu genişliğe göre yeniden yerleştirilir: tablo sütunları daralır (yazı 22–24), grafik 340 × 260'a iner, uzun satır ikiye bölünür. Sığmayan içerik için figürü küçültme: o adımda figürü soluklaştır (0,35) ve içeriği üstüne değil yanına getir, ya da figürü `gizle` ile kaldırıp içeriği tam tahtaya kur (senaryo figürü yalnızca düzeneği tanıtmak için kullanıyorsa). Sahnenin son karesinde tahtada büyük boş alan kalmamalı; yerleşimi nasıl uyarladığını raporla. Figür kullanan derste tahtadaki bütün yazılar en az 24 birimdir. Figürdeki termometre küçüktür (bütün düzenek görünürken birkaç derecelik fark gözle seçilmez): sıcaklığı her zaman `nokta('….termometre')` yanına sarı sayıyla yaz (`x + 12`, sütun hareket ederken sayı da güncellenir ve noktayı izler) ve sütunun izlenmesi gereken yerde figürün yakın kadrajına geç (`f.bak`). Yakınlaşınca kadraj dışında kalan noktanın etiketi `f.gorunur(ad)` ile gizlenir. Senaryodaki figür tarifi modülün baş yorumuyla çelişirse baş yorum geçerlidir (nokta adı, ölçek aralığı, kadraj); uyarladığın her yeri raporla.
- Renkler (`KIT.RENK`): ısı turuncu (`isi`), sıcaklık sarı (`sicaklik`), iç enerji mor (`icEnerji`), kütle ya da madde miktarı turkuaz (`kutle`), soğuk ve su mavi (`soguk`), işe yaramayan yol gri (`gri`). Yeşil yalnızca doğru cevabın rengidir; kırmızı (`var(--bad)`) kullanılmaz. Tahta koyudur: çizgi ve yazı açık renklidir.
- Yazım: çarpım "·" ile ("Q = m · c · ΔT"); ondalık virgül, binlik nokta ("4,18 J/g · °C", "10.450 J"); birimle sayı arasında boşluk ("20 °C", "500 g"); kesme işareti altyazıda "’" (U+2019); tırnak “ ”. "Hâl", "rüzgâr" gibi sözcüklerde düzeltme işareti korunur.
- Okunuş (`speak`): "20 °C" → "yirmi derece"; "–20 °C" → "eksi yirmi derece"; "°F" → "fahrenhayt derece"; "K" → "kelvin"; "g" → "gram"; "kg" → "kilogram"; "J" → "jul" ("joule" yazısı da "jul" okunur); "kJ" → "kilojul"; "J/g · °C" → "jul bölü gram derece"; "4,18" → "dört virgül on sekiz"; "10.450" → "on bin dört yüz elli"; "Q = m · c · ΔT" → "Q eşittir m çarpı c çarpı delta T"; "Q = m · L" → "Q eşittir m çarpı L"; "C = m · c" → "büyük C eşittir m çarpı küçük c"; "W" → "vat". Harf adları Türkçe okunur (Q "kü", m "me", c "ce", L "le", T "te").
- Benzetim sayıları senaryodaki değerlerdir (kitabın ölçümleri ya da "Örnek veri" satırı); sahnede yeni sayı üretilmez. Sayı bir durumun içinde sunulur (deneyi Ela yapar); öğrenciye "örnek veri", "kitap", "sınıf" denmez. Bakırın öz ısısı sayıyla yazılmaz.

## Kapsam
Yalnızca kendi dersinin sayfasına ve ders dosyasına (ve görev iletisi söylüyorsa konunun araç dosyasına) yaz. `tema.js`, `kit.js`, `tema.css`, öteki derslerin dosyaları, `plan/`, `ortak/`, `araclar/`, `TASKS.md` ve git (add, commit, stash, checkout, restore) yasak. Aynı anda başka ajanlar öteki dersleri yazıyor. `tema.js` satırını yazma; raporda ver.

## Doğrulama
    node araclar/olc.js enerji/<kod> --goruntu "$(mktemp -d)" 2>&1 | tail -20

"yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0 ve "konsol temiz" olmalı; tabloda her sahne görünmeli ("sahne otomatik tamamlanamadı" olmamalı).

Görüntüler: her sahnenin son karesine (`sNN-son.png`) ve soru sahnelerinde bir ara kareye Read ile bak: yazılar okunuyor mu, üst üste binen çizim var mı, altyazı ile tahta aynı şeyi anlatıyor mu, çizim senaryodaki fikri gösteriyor mu, içerik doğru mu. Aynı kareye iki kez bakma; düzeltmeden sonra yalnızca değişen sahneyi yeniden gör.

Komut çıktısını kısalt (`| tail -20`, `grep -n`, `sed -n a,bp`); dosyayı `cat` ile dökme, yüz satırı aşan çıktı alma.

En çok üç ölç-düzelt turu. Üçüncüden sonra temiz değilse kalanı raporla ve dur.

## Rapor
Sahne adları ve sayısı; son `olc` çıktısındaki tablo ile "yerleşim", "bütçe", "defter", "konsol" satırları (aynen); `tema.js` satırı (`['<dosya>.html', 'başlık', 'açılış sorusu', sahne sayısı]`). Ayrıca: araç dosyasına ya da ders dosyasına yazdığın araçların listesi; senaryodan her sapma ve nedeni; içerikle ilgili her kuşku; temiz olmayan her şey; görev tanımında eksik bulduğun her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
