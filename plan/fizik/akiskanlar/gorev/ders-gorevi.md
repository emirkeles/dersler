# Görev: bir kısa dersi bitmiş senaryodan yaz (Fizik · Akışkanlar)

Proje kökü: `/Users/emirkeles/matematik-sayilar` (komutlar buradan çalışır). 9. sınıf için bağımlılıksız, etkileşimli kısa dersler (saf HTML/JS/SVG, Türkçe). Tek bir kısa ders yazacaksın: sayfası ve ders dosyası.

## Oku (yalnızca bunlar, sırayla)
1. Senaryo dosyasında baştaki okuma kılavuzu ile kendi dersinin bölümü (satır aralığı görev iletisinde; Read'e `offset` ve `limit` ver). Senaryo bağlayıcıdır: sahneler, anlatım cümleleri (altyazılar), sorular, şıklar, ipuçları, defter satırları, çıkış soruları oradan alınır.
2. Örnek ders (üslup, yapı, kit kullanımı): `fizik/akiskanlar/dersler/a1-basinc-neye-bagli.js`. Tamamını okuma; yalnızca şu satır aralıklarını oku (Read'e `offset` ve `limit` ver): 1–26 (baş: kit satırları, yerel yardımcılar) · 86–123 (anlatım, tahmin ve "gör" içeren sahne) · 285–337 (kart sınıflama sahnesi: `sinifla`, kartı gösterme ve kutusuna yerleştirme) · 339–356 (`Ders.start` bloğunun başı, ilk çıkış sorusuna kadar). Sayfası `fizik/akiskanlar/a1-basinc-neye-bagli.html` kısadır, tamamı okunur. A1 temanın ilk dersi olduğu için "Hatırla" sahnesi yoktur; kalıbı aşağıda yazılıdır. Bu parçalarda bulamadığın bir kalıp için aynı dosyada `grep -n 'async function'` ile tek sahne daha seç (en çok 80 satır) ve raporda "görev tanımında eksik" başlığıyla yaz. Konu tekrarı dersi yazıyorsan örnek, görev iletisinde adı verilen tekrar dersidir (kısa; tamamı okunur).
3. `fizik/akiskanlar/dersler/kit.js`; konunun araç dosyası varsa `fizik/akiskanlar/dersler/<harf>-araclar.js`.
4. `ortak/API.md` (ders motoru).

Başka dosya okuma. `plan/KURALLAR.md`, `plan/ISLEME.md`, `ortak/ders.js`, `ortak/ders.css`, `araclar/`, `dersler/` altındaki pilot dosyaları (`p1-…`, `p2-…`, `torricelli-sekil.js`, `arsimet-sekil.js`), `pilot/` klasörü ve öteki derslerin dosyaları bu listede yok; gereken kurallar aşağıda yazılı. Burada cevabını bulamadığın bir şey için `grep -n` ile tek işleve bak ve raporda "görev tanımında eksik" başlığıyla yaz.

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
`fizik/akiskanlar/<kod>-<ad>.html` ve `fizik/akiskanlar/dersler/<kod>-<ad>.js` (adlar görev iletisinde; dosya adlarında yalnızca ASCII harf). Ders kimliği `akiskanlar-<kod>`; `kicker: 'Konu <HARF> · <konu adı>'`; `accent` görev iletisindeki renk; `back: 'index.html'`; `nextLesson` görev iletisindeki gibi (konu tekrarı dersinde yazılmaz). Sayfaya `ses/…js` satırı konmaz. Sayfada yükleme sırası: `../../ortak/ders.js`, `dersler/kit.js`, konunun araç dosyası, ders dosyası.

Konunun araç dosyası (`<harf>-araclar.js`, `window.KIT_<HARF>`): görev iletisi "araç dosyasını sen aç" diyorsa konunun derslerinde ortak kullanılacak çizim araçlarını oraya yaz (örnek: `dersler/a-araclar.js`). Demiyorsa dosyayı oku, değiştirme; eksik aracı kendi ders dosyanda yaz ve raporla. Başka konunun araç dosyasından yükleme.

## Derste bulunması gerekenler
- İlk sahnenin başlığı tam olarak "Hatırla" (konu tekrarı dersi dışında): senaryodaki `c.choice` soruları; açılış cümlesi "Başlamadan önce iki şeyi hatırlayalım." (tek soru varsa "Başlamadan önce bir şeyi hatırlayalım.").
- Yarısı çözülmüş örnek `tag: 'Birlikte çöz'` etiketini taşır.
- Hiçbir soru, gereken bilgi anlatılmadan sorulmaz (senaryodaki sıra korunur).
- `quiz`: senaryodaki çıkış soruları; her şık için `why` (en çok 2 cümle, şıkkın neden doğru ya da yanlış olduğunu söyler); `scene` 0'dan başlayan sahne indeksi; doğru şıkkın yeri sorudan soruya değişir.
- Defter satırları (`c.note`; satırın kendisi en çok 12 kelime; ölçüm aracının "defter" satırı başlığı da sayar, o satır bilgi içindir) ve özetin kalın satırı olarak akılda kalıcı cümle.
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
- `belir` / `gizle` iç içe dizi almaz (`belir(c, [a, dizi])` konsol hatası verir; `[a, ...dizi]` yaz). Ölçüm aracı "en çok 12 öğe" kuralını saymaz; kalabalık sahnede öğeleri kendin say. İlk çalıştırmada "Attempted to use detached Frame" hatası çıkarsa komutu yeniden çalıştır (araçtan gelir, dersten değil).
- Ölçüm aracı kareyi altyazı anında alır: bir kuralın ya da sorunun bittiği andaki tahtayı görmek için geçici bir `c.say` ekle, ölçtükten sonra sil (her sahne türünde, konu tekrarında da).
- Boşlukla yazılan sayı iki kelime sayılır ("58 500"); defter satırının sayımına başlık da girer (iki kelimelik başlıkta satıra 10 kelime kalır).
- Bu makinede `sed -i` boş ek ister (`sed -i '' …`); düzeltmeyi Edit ile yap.
- Hareketin süresi ve eğrisi senaryodan alınır: `c.tween(ms, fn, Ders.ease.<ad>)`. Senaryoda yazmıyorsa: beliren öğe `out`, kaybolan `in`, yer değiştiren `inOut`, sabit hız `linear`; küçük hareket 300–500 ms, sahnenin ana hareketi 600–1200 ms; seçtiğini raporla. Yazı okunurken yer değiştirmez.
- Tahtanın dışında başlayan öğe (yukarıdan inen tuğla gibi) "tahtadan taşan yazı" sayılır: harf taşıyan öğeyi tahtanın içinde, gizli başlat ve kısa yoldan getir (A1 sahne 3'te C tuğlası).
- Dar tablo sütununda hücre yazısı kısa tutulur ("alan küçüldü"); sütun genişliği en uzun hücreden 30 birim fazla seçilir, yoksa yazı tablo kenarına değer.
- Bir öğe hareket eden bir gruba (`yigin`) bağlıysa etiketleri de o grubun içine konur; yerinde kalması gereken etiket `svg` içine konur (A1 sahne 5: baş etiketleri çiviyle iner, uç etiketleri tahtada kalır).
- Konu tekrarı dersinde önceki kurallar soluklaşır (0,45) ama sahnenin sonunda hepsi yeniden tam görünür olur (`await belir(c, onceki, 500, 1)`); örnek `dersler/a3-tekrar.js` (kısa, tamamı okunur).
- Basıncı küçük oklarla gösterirken aynı kuvvet aynı sayıda okla çizilir: dar yüzeyde oklar sıkışır, geniş yüzeyde seyrelir. Ok sayısını yüzeyin genişliğine göre artırma (o zaman basınç eşit görünür).
- Tablo başlığı birim taşıyorsa ("Yüzey alanı (m²)") sütun en az 200 birim olur; A2'de tablo 140 / 200 / 150 sütunla ve 20 birim yazıyla kuruldu.

## Temaya özgü
- Kit araçları (`window.KIT`, imzalar dosyanın yorumlarında): `RENK`; `sayi(v)` ondalığı virgülle yazar; `yazi(c, p, x, y, metin, { hiza, size, kalin, renk, math })`; `renkli(c, p, x, y, ['düz', ['renkli', renk], …], o)` parçaları ayrı renkte tek satır; `parcaKoy(c, t, parcalar)`; `cizgi(c, p, P, Q, renk, w, ekÖznitelik)`; `kutu(c, p, x, y, w, h, { rx, dolgu, renk })`; `gizle(…öğeler)`; `belir(c, öğe ya da dizi, ms, hedefSaydamlık)`; `par(…sözler)`; `ok(c, p, P, Q, renk, w)` → `{ g, ciz(P, Q) }`; `onay(c, p, x, y)`; `cubuk(c, p, x, y, renk)` → `{ boy(w) }`; `tablo(c, p, { x, y, satir, h, size, sutunlar: [{ ad, w, renk }] })` → `{ g, yaz(i, j, metin, renk), goster(i), vurgula(i, açık) }` (veri satırları gizli başlar); `tahminAl(c, { tag, q, options })` doğru şık aramadan seçileni döndürür; `sinifla(c, { tag, soru, kutular, kartlar, sec, yerlestir })` kart başına `c.choice`.
- Konu A araçları (`window.KIT_A`, `dersler/a-araclar.js`): `kumKabi(c, p, { x1, x2, y, dip })` → `{ g, y, cukur(x, w) }`; `tugla(c, p, x, y, { dik, harf, temas })` (sol alt köşe; 140 × 70) → `{ g, koy, git }`; `yigin(c, p, dy)` birlikte hareket eden parçalar → `{ g, koy, git, dy }`; `batir(c, yigin, cukur, d)`, `kaldir(c, yigin, yukarı)`, `duzelt(c, cukur)`; `BATMA = { yatik: 14, dik: 28, cift: 56 }`; `basincOlcer(c, p, { x1, x2, y })` → `{ g, goster(v), say(v, ms), bin(v) }` (üst kenarı `y` olan levha; altında "1.000 Pa" yazan gösterge; `goster('?')` de olur).
- Renkler (`KIT.RENK`): kuvvet turuncu (`kuvvet`), yüzey alanı turkuaz (`alan`), basınç sarı (`basinc`), sıvı mavi (`sivi`), kaldırma kuvveti mor (`kaldirma`), işe yaramayan yol gri (`gri`). Yeşil yalnızca doğru cevabın rengidir; kırmızı (`var(--bad)`) kullanılmaz. Tahta koyudur: çizgi ve yazı açık renklidir; açık renkli dolgunun (kum) üstündeki yazı koyu (`'#10162b'`) yazılır.
- Yazım: çarpım "·" ile, bölme tahtada "/" ya da "÷" ile ("P = F / A", "20 ÷ 0,02 = 1.000"); ondalık virgül, binlik nokta ("0,02 m²", "2.000 Pa", "13.600 kg/m³"); birimle sayı arasında boşluk; üst simge karakteriyle "m²", "m³", "10⁵"; alt indisler alt simge karakteriyle (P₀, A₁, h₂) ya da `math: 'F_{k}'` ile. Kesme işareti altyazıda "’" (U+2019) yazılır. Program ve senaryo "sürat" der; "hız" yazılmaz.
- Okunuş (`speak`): "Pa" → "pascal", "N" → "newton", "m²" → "metrekare", "kg/m³" → "kilogram bölü metreküp", "m/s²" → "metre bölü saniye kare", "0,02" → "sıfır virgül sıfır iki", "2.000" → "iki bin", "P = F / A" → "P eşittir F bölü A", "4G / A" → "dört G bölü A", "h·d·g" → "h çarpı d çarpı g", "P₀" → "P sıfır", "F_k" → "F k", "atm" → "atmosfer", "cmHg" → "santimetre cıva". Harf adları Türkçe okunur (P "pe", F "fe", G "ge", A "a").
- Benzetim sayıları senaryodaki "Örnek veri" satırından alınır; sahnede yeni sayı üretilmez. Sayı bir durumun içinde sunulur (deneyi Ela yapar); öğrenciye "örnek veri", "kitap", "sınıf" denmez.

## Kapsam
Yalnızca kendi dersinin sayfasına ve ders dosyasına (ve görev iletisi söylüyorsa konunun araç dosyasına) yaz. `tema.js`, `kit.js`, `tema.css`, öteki derslerin dosyaları, `plan/`, `ortak/`, `araclar/`, `TASKS.md` ve git (add, commit, stash, checkout, restore) yasak. Aynı anda başka ajanlar öteki dersleri yazıyor. `tema.js` satırını yazma; raporda ver.

## Doğrulama
    node araclar/olc.js akiskanlar/<kod> --goruntu "$(mktemp -d)" 2>&1 | tail -20

"yerleşim" ve "bütçe" satırlarındaki bütün sayaçlar 0 ve "konsol temiz" olmalı; tabloda her sahne görünmeli ("sahne otomatik tamamlanamadı" olmamalı).

Görüntüler: her sahnenin son karesine (`sNN-son.png`) ve soru sahnelerinde bir ara kareye Read ile bak: yazılar okunuyor mu, üst üste binen çizim var mı, altyazı ile tahta aynı şeyi anlatıyor mu, çizim senaryodaki fikri gösteriyor mu, içerik doğru mu. Aynı kareye iki kez bakma; düzeltmeden sonra yalnızca değişen sahneyi yeniden gör.

Komut çıktısını kısalt (`| tail -20`, `grep -n`, `sed -n a,bp`); dosyayı `cat` ile dökme, yüz satırı aşan çıktı alma.

En çok üç ölç-düzelt turu. Üçüncüden sonra temiz değilse kalanı raporla ve dur.

## Rapor
Sahne adları ve sayısı; son `olc` çıktısındaki tablo ile "yerleşim", "bütçe", "defter", "konsol" satırları (aynen); `tema.js` satırı (`['<dosya>.html', 'başlık', 'açılış sorusu', sahne sayısı]`). Ayrıca: araç dosyasına ya da ders dosyasına yazdığın araçların listesi; senaryodan her sapma ve nedeni; içerikle ilgili her kuşku; temiz olmayan her şey; görev tanımında eksik bulduğun her şey. Yapmadığın bir şeyi yapılmış gibi yazma.
