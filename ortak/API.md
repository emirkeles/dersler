# Ders motoru (ortak/ders.js + ders.css) — API

Bağımlılık yok, saf JS/SVG. Her ders bir HTML dosyası + bir JS dosyasıdır.

## Ders HTML iskeleti (kök klasörde `NN-ad.html`)
```html
<!doctype html><html lang="tr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="stylesheet" href="ortak/ders.css">
<style>/* derse özel ek stil (isteğe bağlı) */</style></head>
<body><div id="app"></div>
<script src="ortak/ders.js"></script>
<script src="ses/<ders-id>.js"></script>   <!-- kayıtlı anlatım dizini; araclar/ses-uret.js yazar -->
<script src="dersler/NN-ad.js"></script></body></html>
```

## Ders tanımı (`dersler/NN-ad.js`)
```js
Ders.start({
  id: 'sayilar-01', kicker: '9. Sınıf · Sayılar', title: 'Üslü ve Köklü Gösterimler',
  accent: '#6ea8ff', back: 'index.html',
  intro: { title, hook: 'merak uyandıran 1-2 cümle (HTML)', button: 'Derse başla ›' },
  goals: ['Kazanım 1', …],                     // giriş ekranında ✓ listesi
  scenes: [ { title, goal, run: async (c) => { … } }, … ],
  quiz: [ { q, options:[…], answer:1, why:['neden bu şık yanlış/doğru',…], scene: 3 } ],  // scene: tekrar önerilecek sahne indeksi (0'dan)
  summary: ['<b>Kural</b> …', …],             // "Bugün ne öğrendik"
  nextLesson: { href: '02-….html', label: 'Sonraki ders ›' }
});
```
Video sahnesi: `run` yerine `{ title, goal, video: 'hikaye/…mp4', altyazi: '…vtt' }` verilirse sahne videoyu tahtada oynatır (hikâye animasyonları). Duraklat ve hız düğmeleriyle uyumludur; video bitince ya da “Videoyu geç” ile sahne tamamlanır.

Quiz ve Özet sahneleri otomatik eklenir. İlerleme `localStorage`'a yazılır.

Kısa dersler: bir bölümün sahneleri tek JS dosyasında durur, her kısa dersin kendi HTML sayfası vardır. Sayfa `<script>window.DERS_PARCA = 'a1';</script>` ile hangi parçayı istediğini söyler; JS dosyası sondaki `PARCALAR` tablosundan o parçanın sahnelerini, 2 çıkış sorusunu (`quizTitle: 'Çıkış soruları'`) ve özetini seçer (örnek: `dersler/01-uslu-ve-koklu.js`, sayfalar `a1-…html` – `a4-…html`). Ders kimliği `sayilar-a1` biçimindedir; araçlar `node olc.js a1` diye çağrılır.

Bölümün çizim araçlarını kullanan yeni bir kısa ders kendi dosyasında da durabilir (örnek: `dersler/b1-kume-dili.js`). Dosya `window.DERS_EK.b1 = (K) => ({ title, hook, scenes, quiz, summary, next })` ile kaydolur; `K`, bölüm dosyasının sonundaki `KIT` nesnesidir. Sayfa bu dosyayı bölüm dosyasından **önce** yükler.

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

Yazı bütçesi (ayrıntı `plan/PLAN.md`): altyazı ≤ 12 kelime, tahtada aynı anda ≤ ~25 kelime, punto ≥ 12 px.

## Araçlar (`araclar/`, yalnızca geliştirme)
İlk kullanımda `cd araclar && npm install`. Chrome gerekir (`CHROME_PATH` ile yol verilebilir; HyperFrames'in indirdiği `~/.cache/hyperframes/chrome/…/chrome-headless-shell` de olur).
- `node olc.js 01 [--boyut 1366x657] [--goruntu klasör]` — dersi baştan sona oynatır (etkileşimleri otomatik geçer); sayfa kayması, taşan/üst üste yazı, punto, yazı bütçesi ve konsol hatalarını raporlar; istenirse her altyazıda ekran görüntüsü alır. Yeni ya da değişen her dersten sonra çalıştır ve görüntülere bak.
- `node ses-uret.js 01 --liste` — seslendirilecek satırları ve karakter sayısını gösterir. `node ses-uret.js 01 [--sahne 1-3]` ElevenLabs ile eksik klipleri üretir. API anahtarı kökteki `.env` dosyasında (`ELEVENLABS_API_KEY`); anlatıcı sesi ve model betiğin başındaki `VARSAYILAN` içinde. Klipler `ses/<ders-id>/`, dizin `ses/<ders-id>.js`. Metni değişen altyazının klibi yeniden üretilir; önce metni kesinleştir, sonra seslendir.
