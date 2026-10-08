# Ders motoru (ortak/ders.js + ders.css) — API

Bağımlılık yok, saf JS/SVG. Her ders bir HTML dosyası + bir JS dosyasıdır.

## Sitenin yapısı
```
index.html                      ana sayfa: ders kartları; index.html#fizik dersin sayfası (kaldığın yer, temalar, dersin hikâyeleri); index.html#hikayeler bütün hikâyeler
<ders>/<tema>/index.html       tema sayfası (konular, kısa dersler, hikâyeler)
<ders>/<tema>/tema.js         temanın kısa ders listesi
<ders>/<tema>/a1-….html        kısa dersler; yanında dersler/ ses/ hikaye/
ortak/ders.js ders.css          ders motoru
ortak/katalog.js                dersler ve temaların sırası; hangi temanın yayında olduğu
ortak/site.js site.css          ana sayfa ve tema sayfası
plan/<ders>/<tema>/            müfredat, plan, senaryolar (yalnızca geliştirme)
```
Adlar: Ders (Matematik) → Tema (Sayılar) → Konu (A · Üslü ve köklü gösterimler) → Kısa ders (A1). Kurallar `plan/KURALLAR.md` dosyasında. Örnek tema: `matematik/sayilar/`.

## Tema ekleme
Tema yalnızca kendi klasörüne yazılarak eklenir; ortak dosyalara dokunulmaz (temalar paralel yazılabilsin diye). Çalışan bir şablon `ortak/sablon/` klasöründedir: kopyala, `'sablon'` yazan yerlere temanın klasör adını yaz. Bir temayı baştan sona yazmanın adımları `plan/ISLEME.md` dosyasındadır.

1. `<ders>/<tema>/index.html`: `matematik/sayilar/index.html` dosyasının kopyası; başlık ve `Site.tema('<ders>', '<tema>', { kok: '../../' })` satırı değişir. Sırayla `katalog.js`, kendi `tema.js` dosyası ve `site.js` yüklenir.
2. `<ders>/<tema>/tema.js`: `KATALOG.tema('<ders>', '<tema>', { tanitim, konular, hikayeler })`. Biçim `ortak/katalog.js` dosyasının başında (teması yayında olmayan hikâye de orada, temanın katalog satırına yazılır). Her kısa ders bir satır: `[dosya, başlık, açılış sorusu, sahne sayısı]`; beşinci öğeyi (yaklaşık süre, saniye) `araclar/sure.js` ekler.
3. Kısa dersler: aşağıdaki iskelet. Yeni temalarda her kısa ders kendi dosyasındadır (`a1-ad.html` + `dersler/a1-ad.js`, `Ders.start` doğrudan çağrılır); temanın ortak çizim araçları `dersler/kit.js` içinde `window.KIT` olarak durur ve ders dosyasından önce yüklenir. Aşağıda anlatılan `DERS_PARCA` düzeni yalnızca Sayılar temasına özgüdür (eski uzun derslerin bölünmesinden kaldı). Dersin `id` alanı `<tema>-<kod>` olur (`sayilar-a1`); ana sayfa ilerlemeyi bu kimlikle bulur. `kicker` "Konu A · …" biçimindedir, `back: 'index.html'` tema sayfasına döner.
4. `node araclar/sure.js <ders>/<tema>` süreleri yazar; ardından `node araclar/denetle.js <ders>/<tema>` temiz çıkmalı.
5. Yayın: tema hazır olunca `ortak/katalog.js` içindeki satırına `yayinda: true` eklenir. O zamana kadar dersin sayfasında (`index.html#<ders>`) "Hazırlanan temalar" arasında görünür; tema sayfası doğrudan açılarak önizlenir.

Temanın kimliği klasör adıdır ve `ortak/katalog.js` içinde kayıtlı olmalıdır. Konu renkleri için motorun paleti: `#f5b04c`, `#3ddc97`, `#c792ff`, `#3cc8e8`, `#6ea8ff`, `#ff8a5b`. `ortak/site.css` içindeki sınıf adları `ders.css`'tekilerle çakışmamalı.

## Ders HTML iskeleti (tema klasöründe `a1-ad.html`)
```html
<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="stylesheet" href="../../ortak/ders.css">
<style>/* derse özel ek stil (isteğe bağlı) */</style></head>
<body><div id="app"></div>
<script src="../../ortak/ders.js"></script>
<script src="ses/<ders-id>.js"></script>   <!-- kayıtlı anlatım dizini; araclar/ses-uret.js yazar. Seslendirme üretilene kadar bu satır konmaz -->
<script src="dersler/a1-ad.js"></script></body></html>
```

## Ders tanımı (`dersler/a1-ad.js`)
```js
Ders.start({
  id: 'sayilar-a1', kicker: 'Konu A · Üslü ve köklü gösterimler', title: 'Üs bir sayaçtır',
  accent: '#6ea8ff', back: 'index.html',
  intro: { title, hook: 'merak uyandıran 1-2 cümle (HTML)', button: 'Derse başla ›' },
  goals: ['Kazanım 1', …],                     // giriş ekranında ✓ listesi
  scenes: [ { title, goal, run: async (c) => { … } }, … ],
  quiz: [ { q, options:[…], answer:1, why:['neden bu şık yanlış/doğru',…], scene: 3 } ],  // scene: tekrar önerilecek sahne indeksi (0'dan)
  summary: ['<b>Kural</b> …', …],             // "Bugün ne öğrendik"
  nextLesson: { href: 'a2-….html', label: 'Sonraki ders ›' }
});
```
Video sahnesi: `run` yerine `{ title, goal, video: 'hikaye/…mp4', altyazi: '…vtt' }` verilirse sahne videoyu tahtada oynatır (hikâye animasyonları). Duraklat ve hız düğmeleriyle uyumludur; video bitince ya da “Videoyu geç” ile sahne tamamlanır.

Quiz ve Özet sahneleri otomatik eklenir. İlerleme `localStorage`'a yazılır: `ders:<id>` = `{ done, sahne, score, total }` (biten sahneler, toplam sahne, çıkış sorusu puanı), `ders:son` = en son açılan ders. `back: 'index.html'` tema sayfasına döner.

Kısa dersler: bir bölümün sahneleri tek JS dosyasında durur, her kısa dersin kendi HTML sayfası vardır. Sayfa `<script>window.DERS_PARCA = 'a1';</script>` ile hangi parçayı istediğini söyler; JS dosyası sondaki `PARCALAR` tablosundan o parçanın sahnelerini, 2 çıkış sorusunu (`quizTitle: 'Çıkış soruları'`) ve özetini seçer (örnek: `dersler/01-uslu-ve-koklu.js`, sayfalar `a1-…html` – `a4-…html`). Ders kimliği `sayilar-a1` biçimindedir; araçlar proje kökünden `node araclar/olc.js sayilar/a1` diye çağrılır.

Bölümün çizim araçlarını kullanan yeni bir kısa ders kendi dosyasında da durabilir (örnek: `dersler/b1-kume-dili.js`; Bölüm D'de `dersler/d1-onerme.js`, araçlar `dersler/04-islem-ozellikleri-cebirsel.js` içinde). Dosya `window.DERS_EK.b1 = (K) => ({ title, hook, scenes, quiz, summary, next })` ile kaydolur; `K`, bölüm dosyasının sonundaki `KIT` nesnesidir. Sayfa bu dosyayı bölüm dosyasından **önce** yükler.

## Sahne bağlamı `c` (run içinde `await` ile sırala)
Zaman: `await c.wait(ms)` · `await c.tween(ms, (e,t)=>{…}, ease?)` (e = easing uygulanmış 0→1; `Ders.ease.{linear,in,out,inOut,back,bounce,elastic}`) · `Ders.lerp(a,b,t)`, `Ders.clamp`.
**Tüm zamanlamalar duraklat/hız/sahne değiştirme ile uyumludur; `setTimeout`/`setInterval`/CSS animasyonu/`requestAnimationFrame` ile kendi zamanlayıcını KURMA — her zaman `c.wait`/`c.tween` kullan.** Sahne değişince run otomatik iptal edilir (Cancelled istisnası; yakalama).
Anlatım: `await c.say('altyazı <b>HTML</b>', {speak:'sesli okunacak düz metin (üs/kök sembollerini kelimeyle yaz)', ms, noWait})` — okuma süresi kadar bekler (karakter başına 75 ms; `ms` verilse de 60 ms/karakterin altına inmez). Bu altyazının kayıtlı klibi varsa ve ses açıksa klip bitene kadar bekler. `noWait` ile gösterilen yönergeler seslendirilmez. `c.clearSay()`.
Çizim: `const svg = c.svg(1000, 562)` (viewBox; sahne 16:9) · `c.S(tag, attrs, parent)` SVG öğesi üretir (`text:`, `html:`, `math:` özel anahtarları; `math:'2^{10}'`, `'x_{n}'` üs/indis çizer) · `c.layer()` sahne üstüne HTML katmanı (absolute inset 0) · `c.h(tag, props, ...kids)` HTML üretir · `c.M.frac(a,b)`, `c.M.sqrt(x,n?)`, `c.M.pow(b,e)`, `c.M.sub`, `c.M.m(html)` HTML matematik yazımı.
Defter (yan sütun; yalnızca son kural görünür, tamamı "Tümü" ile açılır; tarayıcıda saklanır): `c.note(html, 'Başlık', id?)`. Bir kural = formül + tek örnek; uzun açıklama yazma.
Etkileşim (`c.act`; dizüstünde tahtanın **yanındaki** sütunda açılır, genişliği 320–550 px — panelleri dar sütuna göre kur):
- `await c.cont('Devam ›')` — tıklanana kadar bekler.
- `const r = await c.choice({tag:'Tahmin et', q, options:[html…], answer:idx, hints:[yanlış şık başına geri bildirim], right:'doğru geri bildirimi', onPick:(i,ok)=>…})` — doğru şık seçilene kadar sürer, `r.tries` döner.
- `const sl = c.slider({label, min, max, step, value, fmt, onInput})` → `{get,set,remove,el}`. (Slider ile "keşfet" sahnesinden sonra `await c.cont()` ile bekle.)
- `c.panel(tag, ...kids)` serbest panel; `c.feedback(box, 'ok'|'no'|'info', html)`.
- `c.on(el, 'pointerdown', fn)` — sahne değişince otomatik temizlenen dinleyici (sürükle-bırak için pointer olayları kullan; mobilde çalışsın: `touch-action:none`).
- `c.clearAct()`.
Sahne kendi sonunda bitince “Sonraki” düğmesi parlar; öğrenci kontrol eder. Sahneyi bitirmeden önce öğrencinin etkileşim yapmasını bekleyen yapıları `await` ile kur (sahne ancak run bitince "tamam" sayılır).

## Yerleşim ve tasarım (ders.css)
Dizüstü ve üstünde (≥1000×540) sayfa kaymaz: üst çubuk (ders adı · sahne adı · araçlar), ilerleme çentikleri, solda tahta + altında 3 satırlık altyazı, sağda yan sütun (sıra sende → defter → Önceki/Sonraki). Tahta her zaman 16:9'dur ve pencere yüksekliğine sığar. Daha dar ekranda tek sütuna düşer.

Görsel dil: tahta ekrandaki tek renkli yüzeydir; çevresi düz ve sessizdir. Degrade, parlama, sürekli titreşen düğme, emoji, büyük harfli etiket hapı kullanma. Yazı tipi IBM Plex Sans (`ortak/fonts/`, çizgisiz sıfır; ∅ ile karışmaz) — tahtadaki SVG yazıları da bu tiple çizilir, yerleşimi buna göre dene.

Renk rolleri: `--c1` mavi, `--c2` turuncu, `--c3` yeşil, `--c4` mor, `--c5` sarı, `--c6` turkuaz; `--good`, `--bad`, `--warn`. SVG içinde `fill="var(--c1)"` çalışır. Bir kavrama bir renk ver ve ders boyunca aynı kalsın (örn. taban = sarı, üs = turkuaz). HTML sınıfları: `.t1…t6` renk, `.good/.bad/.warn/.muted`, `.m` matematik fontu.

Yazı bütçesi (ayrıntı `plan/matematik/sayilar/PLAN.md`): altyazı ≤ 12 kelime, tahtada aynı anda ≤ ~25 kelime, punto ≥ 12 px.

## Araçlar (`araclar/`, yalnızca geliştirme)
İlk kullanımda `cd araclar && npm install`. Komutlar proje kökünden `node araclar/<araç>.js …` diye çalıştırılır. Chrome gerekir; kurulu Chrome ya da HyperFrames'in indirdiği başsız Chrome (`~/.cache/hyperframes/chrome/`) kendiliğinden bulunur, başka bir yol `CHROME_PATH` ile verilir.
- `node araclar/denetle.js <ders>/<tema>` — temanın `tema.js` dosyasını kısa derslerle karşılaştırır: dosyalar, kimlikler, sahne sayıları, konsol hataları, tema sayfasındaki kırık bağlantılar. Sorun varsa çıkış kodu 1.
- `node araclar/olc.js <tema>/<kod> [--boyut 1366x657] [--goruntu klasör]` — dersi baştan sona oynatır (etkileşimleri otomatik geçer); sayfa kayması, taşan/üst üste yazı, punto, yazı bütçesi ve konsol hatalarını raporlar; istenirse her altyazıda ekran görüntüsü alır. Yeni ya da değişen her dersten sonra çalıştır ve görüntülere bak.
- `node araclar/sure.js <ders>/<tema> [--yazma] [--ayrinti]` (ya da `<tema>/<kod>`; hedefsiz: bütün temalar) — kısa derslerin yaklaşık süresini içerikten hesaplar ve `tema.js` satırına saniye olarak yazar. Anlatım, ders sanal bir saatle 1× hızda oynatılarak ölçülür (altyazı okuma süreleri, beklemeler, animasyonlar; klibi olan altyazıda klibin süresi, video sahnesinde videonun süresi). Etkileşim ölçülemez; soru ve şık uzunluğu, düşünme payı ve sahne geçişleri betiğin başındaki `INSAN` değerleriyle hesaplanır. Ana sayfa (ders, tema, konu toplamı), tema sayfası (kısa ders, konu, tema, kalan süre) ve dersin giriş ekranı bu sayıyı gösterir. Dersin anlatımı, sahnesi ya da seslendirmesi değişince yeniden çalıştır; süresi olmayan dersi `denetle.js` sorun sayar.
- `node araclar/ses-uret.js a1 --liste` — seslendirilecek satırları ve karakter sayısını gösterir. `node araclar/ses-uret.js a1 [--sahne 1-3]` ElevenLabs ile eksik klipleri üretir. API anahtarı kökteki `.env` dosyasında (`ELEVENLABS_API_KEY`); anlatıcı sesi ve model betiğin başındaki `VARSAYILAN` içinde. Klipler dersin tema klasöründe `ses/<ders-id>/`, dizin `ses/<ders-id>.js`. Metni değişen altyazının klibi yeniden üretilir; önce metni kesinleştir, sonra seslendir.
